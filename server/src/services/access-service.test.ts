import assert from 'node:assert/strict';
import test from 'node:test';
import { randomUUID } from 'node:crypto';
import bcrypt from 'bcrypt';
import type { AccessCodeRecord, AccessRecords, AccessRepository, AccessSessionRecord } from '../repositories/access-repository';
import { AccessService } from './access-service';
import { AuthSettingsService } from './auth-settings-service';
import { createApp } from '../app';
import { SESSION_COOKIES } from '../auth-http';
import type { ServerDependencies } from '../bootstrap';

// Test-only store: copy-on-write transactions model commit/rollback and serialize
// concurrent requests. Production uses PostgreSQL, never this implementation.
export class MemoryAccessRepository implements AccessRepository {
  private codes = new Map<string, AccessCodeRecord>();
  private sessions = new Map<string, AccessSessionRecord>();
  private queue = Promise.resolve();
  private records(codes = this.codes, sessions = this.sessions): AccessRecords {
    return {
      codes: async () => [...codes.values()], code: async id => codes.get(id) ?? null,
      codeByPassword: async lookup => [...codes.values()].find(c => c.passwordLookup === lookup) ?? null,
      saveCode: async code => {codes.set(code.id, code);},
      session: async hash => sessions.get(hash) ?? null,
      attempt: async key => [...sessions.values()].find(s => s.attemptKey === key) ?? null,
      sessions: async codeId => [...sessions.values()].filter(s => !codeId || s.codeId === codeId),
      saveSession: async session => {sessions.set(session.tokenHash, session);},
    };
  }
  read<T>(fn: (records: AccessRecords) => Promise<T>) {return fn(this.records(structuredClone(this.codes), structuredClone(this.sessions)));}
  async transaction<T>(fn: (records: AccessRecords) => Promise<T>): Promise<T> {
    const before = this.queue;
    let release!: () => void;
    this.queue = new Promise<void>(resolve => {release = resolve;});
    await before;
    const codes = structuredClone(this.codes), sessions = structuredClone(this.sessions);
    try {const result = await fn(this.records(codes, sessions)); this.codes = codes; this.sessions = sessions; return result;}
    finally {release();}
  }
}

const platformPassword = 'test-platform-73!';
const adminPassword = 'test-admin-95!';
export async function fixture(repo: AccessRepository = new MemoryAccessRepository()) {
  let now = Date.now();
  let settings = {platformWelcomeText: 'Welcome', adminWelcomeText: 'Admin', updatedAt: new Date(now).toISOString(), platformPasswordHash: await bcrypt.hash(platformPassword, 4), adminPasswordHash: await bcrypt.hash(adminPassword, 4)};
  const auth = new AuthSettingsService({getRecord: async () => ({...settings}), saveRecord: async record => {settings = {...record}; return settings;}});
  const access = new AccessService(repo, auth, 'test-only-random-secret-0123456789', () => now);
  const create = (extra: Record<string, unknown> = {}) => access.create({label: 'Test guest', password: 'visitor-42-secret', durationHours: 4, maxLogins: 1, loginDeadline: new Date(now + 7 * 86400000).toISOString(), hardDeadline: null, ...extra});
  const login = (password = 'visitor-42-secret', extra: Record<string, unknown> = {}) => access.login({target: 'platform', password, attemptId: randomUUID(), clientId: randomUUID(), browser: 'Test browser', ...extra});
  return {access, auth, create, login, now: () => now, advance: (milliseconds: number) => {now += milliseconds;}};
}

test('last allowance is atomic; successful session survives exhausted code', async () => {
  const f = await fixture(); const {code} = await f.create();
  const attempts = await Promise.allSettled(Array.from({length: 8}, () => f.login()));
  assert.equal(attempts.filter(r => r.status === 'fulfilled').length, 1);
  const success = attempts.find(r => r.status === 'fulfilled') as PromiseFulfilledResult<Awaited<ReturnType<typeof f.login>>>;
  assert.ok(await f.access.session(success.value.token, 'platform'));
  const detail = await f.access.detail(code.id);
  assert.equal(detail.code.usedLogins, 1); assert.equal(detail.code.status, 'exhausted'); assert.equal(detail.code.activeSessions, 1);
  assert.equal(detail.sessions.length, 1);
});

test('retry reuses a session; cookie reuse does not consume quota; logout invalidates replay', async () => {
  const f = await fixture(); await f.create({maxLogins: 2});
  const attempt = {clientId: randomUUID(), attemptId: randomUUID()};
  const [first, retry] = await Promise.all([f.login(undefined, attempt), f.login(undefined, attempt)]);
  assert.equal(first.token, retry.token);
  assert.equal((await f.access.list())[0].usedLogins, 1);
  assert.equal((await f.login(undefined, {currentToken: first.token})).token, first.token);
  await f.access.logout(first.token);
  assert.equal(await f.access.session(first.token, 'platform'), null);
  await assert.rejects(f.login(undefined, attempt), {code: 'SESSION_ENDED'});
  assert.ok((await f.login()).session);
  assert.equal((await f.access.list())[0].usedLogins, 2);
});

test('wrong password does not count; admin and platform roles cannot be exchanged', async () => {
  const f = await fixture(); await f.create();
  await assert.rejects(f.login('wrong-password'), {code: 'INVALID_PASSWORD'});
  await assert.rejects(f.login(undefined, {target: 'admin'}), {code: 'INVALID_PASSWORD'});
  assert.equal((await f.access.list())[0].usedLogins, 0);
  const guest = await f.login();
  assert.equal(await f.access.session(guest.token, 'admin'), null);
  const admin = await f.login(adminPassword, {target: 'admin'});
  assert.equal(await f.access.session(admin.token, 'platform'), null);
  assert.ok(await f.access.session(admin.token, 'admin'));
});

test('login deadline blocks only new sessions; session length is absolute', async () => {
  const f = await fixture(); await f.create({maxLogins: 3, loginDeadline: new Date(f.now() + 3600000).toISOString()});
  const first = await f.login(); f.advance(2 * 3600000);
  assert.ok(await f.access.session(first.token, 'platform'));
  await assert.rejects(f.login(), {code: 'GUEST_EXPIRED'});
  f.advance(2 * 3600000);
  assert.equal(await f.access.session(first.token, 'platform'), null);
});

test('policy edits affect later logins; hard end can only shorten existing sessions', async () => {
  const f = await fixture(); const {code} = await f.create({maxLogins: 5});
  const first = await f.login();
  let latest = (await f.access.detail(code.id)).code;
  latest = (await f.access.update(code.id, {version: latest.version, durationHours: 8})).code;
  assert.equal((await f.access.session(first.token,'platform'))?.expiresAt, first.session.expiresAt);
  const second = await f.login();
  assert.equal(Date.parse(second.session.expiresAt) - f.now(), 8 * 3600000);
  latest = (await f.access.detail(code.id)).code;
  const hardDeadline = new Date(f.now() + 3600000).toISOString();
  await assert.rejects(f.access.update(code.id, {version: latest.version, hardDeadline}), {code: 'CONFIRM_HARD_DEADLINE'});
  latest = (await f.access.update(code.id, {version: latest.version, hardDeadline, confirmHardDeadline: true})).code;
  assert.equal((await f.access.session(first.token,'platform'))?.expiresAt, hardDeadline);
  latest = (await f.access.update(code.id, {version: latest.version, hardDeadline: null})).code;
  assert.equal((await f.access.session(second.token,'platform'))?.expiresAt, hardDeadline);
  f.advance(3600001);
  assert.equal(await f.access.session(second.token,'platform'), null);
});

test('used passwords cannot change; exhausted/expired need explicit reopen; counts never reset', async () => {
  const f = await fixture(); const {code} = await f.create(); await f.login();
  let latest = (await f.access.detail(code.id)).code;
  await assert.rejects(f.access.update(code.id,{version: latest.version,password:'replacement-secret'}), {code:'PASSWORD_LOCKED'});
  await assert.rejects(f.access.update(code.id,{version: latest.version,maxLogins:2}), {code:'REOPEN_REQUIRED'});
  latest = (await f.access.update(code.id,{version:latest.version,action:'add-uses',amount:2})).code;
  assert.equal(latest.usedLogins,1); assert.equal(latest.maxLogins,3); assert.equal(latest.status,'active');
  await f.login(); latest = (await f.access.detail(code.id)).code;
  await assert.rejects(f.access.update(code.id,{version:latest.version,maxLogins:1}), {code:'INVALID_CONFIG'});
  f.advance(8 * 86400000);
  latest = (await f.access.update(code.id,{version:latest.version,action:'reopen',loginDeadline:new Date(f.now()+86400000).toISOString()})).code;
  assert.equal(latest.usedLogins,2); assert.equal(latest.activeSessions,0);
  assert.ok((await f.login()).session);
});

test('unused password replacement, duplicate detection, version conflicts, and scoped irreversible revocation', async () => {
  const f = await fixture(); const {code} = await f.create({maxLogins: 3});
  await assert.rejects(f.create(), {code:'PASSWORD_CONFLICT'});
  await assert.rejects(f.create({password:platformPassword}), {code:'PASSWORD_CONFLICT'});
  let latest = (await f.access.update(code.id,{version:code.version,password:'new-visitor-password'})).code;
  await assert.rejects(f.login(),{code:'INVALID_PASSWORD'});
  const first = await f.login('new-visitor-password');
  await assert.rejects(f.access.update(code.id,{version:latest.version,label:'Stale'}),{code:'VERSION_CONFLICT'});
  latest = (await f.access.detail(code.id)).code;
  await f.create({password:'independent-password'}); const other = await f.login('independent-password');
  latest = (await f.access.update(code.id,{version:latest.version,action:'revoke'})).code;
  assert.equal(await f.access.session(first.token,'platform'),null);
  assert.ok(await f.access.session(other.token,'platform'));
  await assert.rejects(f.login('new-visitor-password'),{code:'GUEST_REVOKED'});
  await assert.rejects(f.access.update(code.id,{version:latest.version,action:'add-uses',amount:1}),{code:'REVOKED'});
  assert.equal((await f.access.update(code.id,{version:latest.version,label:'Archived note'})).code.label,'Archived note');
  const details = JSON.stringify(await f.access.detail(code.id));
  for(const secret of ['passwordHash','passwordLookup','tokenHash','credentialKey','attemptKey','new-visitor-password']) assert.equal(details.includes(secret),false);
});

test('HTTP guard denies anonymous writes, cookie role swapping, and cross-origin mutations', async () => {
  const f = await fixture();
  const dependencies = {
    accessService:f.access, authSettingsService:f.auth,
    portfolioProjectsService:{getProjects:async()=>[{id:'published',status:'published',sections:[]},{id:'draft',status:'draft',sections:[]}], saveProjects:async()=>{throw new Error('Unauthorized mutation reached service');}},
    resumeContentService:{getContent:async()=>({hello:'private'})}, mediaService:{},
  } as unknown as ServerDependencies;
  const app = await createApp({dependencies,logger:false});
  try {
    const anonymous = await app.inject({url:'/api/admin/projects'}); assert.equal(anonymous.statusCode,401);
    assert.equal((await app.inject({method:'PUT',url:'/api/admin/projects',headers:{'x-site-request':'1'},payload:{projects:[]}})).statusCode,401);
    const handshake = await app.inject({url:'/api/admin/session'});
    const clientCookie = String(handshake.headers['set-cookie']).split(';')[0];
    const headers = {cookie:clientCookie,'x-site-request':'1'};
    const visitor = await app.inject({method:'POST',url:'/api/admin/verify-login',headers,payload:{target:'platform',password:platformPassword,attemptId:randomUUID()}});
    assert.equal(visitor.statusCode,200);
    const pair = String(visitor.headers['set-cookie']).split(';')[0];
    const renamed = pair.replace(SESSION_COOKIES.platform,SESSION_COOKIES.admin);
    assert.equal((await app.inject({url:'/api/admin/session',headers:{cookie:renamed}})).json().adminAuthenticated,false);
    const read = await app.inject({url:'/api/admin/projects',headers:{cookie:pair}});
    assert.equal(read.statusCode,200); assert.equal(read.json().length,1); assert.equal(read.json()[0].id,'published');
    assert.equal((await app.inject({url:'/api/admin/guest-passwords',headers:{cookie:pair}})).statusCode,401);
    const administrator = await app.inject({method:'POST',url:'/api/admin/verify-login',headers,payload:{target:'admin',password:adminPassword,attemptId:randomUUID()}});
    assert.equal(administrator.statusCode,200);
    const adminCookie = String(administrator.headers['set-cookie']).split(';')[0];
    assert.equal((await app.inject({url:'/api/admin/guest-passwords',headers:{cookie:adminCookie}})).statusCode,200);
    assert.equal((await app.inject({method:'POST',url:'/api/admin/guest-passwords',headers:{cookie:adminCookie},payload:{}})).statusCode,403);
    assert.equal((await app.inject({method:'POST',url:'/api/admin/guest-passwords',headers:{cookie:adminCookie,'x-site-request':'1',origin:'https://untrusted.example'},payload:{}})).statusCode,403);
    assert.match(String(administrator.headers['set-cookie']),/HttpOnly/);
    assert.equal(read.headers['cache-control'],'no-store');
  } finally {await app.close();}
});

test('changing permanent password revokes existing same-role sessions, not guest sessions', async () => {
  const f = await fixture(); await f.create();
  const guest = await f.login(), platform = await f.login(platformPassword), admin = await f.login(adminPassword,{target:'admin'});
  await f.access.changePassword('platform',platformPassword,'replacement-platform-password');
  assert.equal(await f.access.session(platform.token,'platform'),null);
  assert.ok(await f.access.session(guest.token,'platform'));
  assert.ok(await f.access.session(admin.token,'admin'));
});
