import { createHash, createHmac, randomInt, randomUUID } from 'node:crypto';
import bcrypt from 'bcrypt';
import { guestStatus, normalizeAccessPassword, type GuestCode } from '../../../src/app/data/guestAccess';
import type { AccessCodeRecord, AccessRecords, AccessRepository, AccessSessionRecord } from '../repositories/access-repository';
import type { AuthSettingsService } from './auth-settings-service';

export class AccessError extends Error {
  constructor(public code: string, message: string, public status = 400) { super(message); }
}
const fail = (code: string, message: string, status = 400): never => { throw new AccessError(code, message, status); };
const digest = (value: string) => createHash('sha256').update(value).digest('hex');
const iso = (time: number) => new Date(time).toISOString();

export function generateGuestPassword() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
  return Array.from({length: 16}, () => alphabet[randomInt(alphabet.length)]).join('');
}

export class AccessService {
  constructor(private repo: AccessRepository, private auth: AuthSettingsService, private secret: string, private now = () => Date.now()) {}
  private keyed(value: string) { return createHmac('sha256', this.secret).update(value).digest('hex'); }
  private lookup(password: string) { return this.keyed(`password:${password}`); }
  private live(session: AccessSessionRecord | null) { return !!session && !session.revokedAt && Date.parse(session.expiresAt) > this.now(); }
  private publicCode(code: AccessCodeRecord, sessions: AccessSessionRecord[]): GuestCode {
    const {passwordHash: _hash, passwordLookup: _lookup, ...safe} = code;
    return {...safe, status: guestStatus(code, this.now()), activeSessions: sessions.filter(s => s.codeId === code.id && this.live(s)).length};
  }
  private deadline(value: unknown, name: string, nullable = false): string | null {
    if (nullable && (value === null || value === '')) return null;
    if (typeof value !== 'string' || !/^\d{4}-\d\d-\d\dT.*(?:Z|[+-]\d\d:\d\d)$/.test(value) || !Number.isFinite(Date.parse(value))) return fail('INVALID_CONFIG', `${name}格式不正确`);
    return new Date(value).toISOString();
  }
  private policy(body: Record<string, unknown>) {
    const label = typeof body.label === 'string' ? body.label.trim() : '';
    if (!label || label.length > 80) return fail('INVALID_CONFIG', '请输入 1–80 字的访客备注');
    const durationHours = body.durationHours;
    if (typeof durationHours !== 'number' || !Number.isFinite(durationHours) || durationHours < 0.25 || durationHours > 168) return fail('INVALID_CONFIG', '访问时长须为 0.25–168 小时');
    const maxLogins = body.maxLogins;
    if (typeof maxLogins !== 'number' || !Number.isInteger(maxLogins) || maxLogins < 1 || maxLogins > 10000) return fail('INVALID_CONFIG', '登录次数须为 1–10000 的整数');
    return {label, durationHours, maxLogins, loginDeadline: this.deadline(body.loginDeadline, '允许登录时间')!, hardDeadline: this.deadline(body.hardDeadline ?? null, '统一结束时间', true)};
  }
  private async passwordRecord(password: string, records: AccessRecords, ownId?: string) {
    if (password.length < 8 || password.length > 64 || Buffer.byteLength(password) > 72) return fail('INVALID_PASSWORD_FORMAT', '游客密码须为 8–64 个字符（不超过 72 字节）');
    const lookup = this.lookup(password);
    const existing = await records.codeByPassword(lookup);
    if ((existing && existing.id !== ownId) || await this.auth.verifyLogin('platform', password) || await this.auth.verifyLogin('admin', password)) return fail('PASSWORD_CONFLICT', '该密码已被使用，请换一个密码', 409);
    return {passwordHash: await bcrypt.hash(password, 10), passwordLookup: lookup};
  }
  async list() {
    return this.repo.read(async records => {
      const [codes, sessions] = await Promise.all([records.codes(), records.sessions()]);
      return codes.map(c => this.publicCode(c, sessions)).sort((a,b) => b.createdAt.localeCompare(a.createdAt));
    });
  }
  async detail(id: string) {
    return this.repo.read(async records => {
      const code = await records.code(id);
      if (!code) return fail('NOT_FOUND', '访客密码不存在', 404);
      const sessions = await records.sessions(id);
      return {code: this.publicCode(code, sessions), sessions: sessions.map(({id, createdAt, expiresAt, revokedAt, browser}) => ({id, createdAt, expiresAt, revokedAt, browser})).sort((a,b) => b.createdAt.localeCompare(a.createdAt))};
    });
  }
  async create(body: Record<string, unknown>) {
    const policy = this.policy(body);
    if (Date.parse(policy.loginDeadline) <= this.now() || (policy.hardDeadline && Date.parse(policy.hardDeadline) <= this.now())) return fail('INVALID_CONFIG', '创建时的截止时间必须晚于当前时间');
    const password = body.password ? normalizeAccessPassword(String(body.password)) : generateGuestPassword();
    return this.repo.transaction(async records => {
      const credentials = await this.passwordRecord(password, records);
      const code: AccessCodeRecord = {id: randomUUID(), ...policy, ...credentials, usedLogins: 0, revokedAt: null, lastUsedAt: null, version: 1, createdAt: iso(this.now()), updatedAt: iso(this.now())};
      await records.saveCode(code);
      return {code: this.publicCode(code, []), password};
    });
  }
  async update(id: string, body: Record<string, unknown>) {
    return this.repo.transaction(async records => {
      const current = await records.code(id);
      if (!current) return fail('NOT_FOUND', '访客密码不存在', 404);
      if (body.version !== current.version) return fail('VERSION_CONFLICT', '该密码的配置或使用次数已更新，请刷新后重试', 409);
      const action = body.action ?? 'edit';
      let next = {...current};
      let password: string | undefined;
      if (action === 'revoke') {
        if (!next.revokedAt) next.revokedAt = iso(this.now());
      } else if (action === 'add-uses') {
        if (next.revokedAt) return fail('REVOKED', '已撤销的密码不可恢复');
        if (!Number.isInteger(body.amount) || Number(body.amount) < 1 || next.maxLogins + Number(body.amount) > 10000) return fail('INVALID_CONFIG', '追加次数不正确');
        next.maxLogins += Number(body.amount);
      } else if (action === 'edit' || action === 'reopen') {
        const policy = this.policy({...current, ...body});
        if (policy.maxLogins < current.usedLogins) return fail('INVALID_CONFIG', '次数上限不能小于已用次数');
        const changed = (Object.keys(policy) as (keyof typeof policy)[]).filter(k => policy[k] !== current[k]);
        if (current.revokedAt && (changed.some(k => k !== 'label') || body.password)) return fail('REVOKED', '已撤销的密码只能修改备注');
        if (current.usedLogins > 0 && body.password) return fail('PASSWORD_LOCKED', '已使用的密码不能替换，请复制配置并新建');
        if (action === 'edit' && guestStatus(current, this.now()) !== 'active' && changed.some(k => k !== 'label')) return fail('REOPEN_REQUIRED', '请使用追加次数或延长期限操作重新开放');
        if (action === 'reopen' && (Date.parse(policy.loginDeadline) <= this.now() || (policy.hardDeadline && Date.parse(policy.hardDeadline) <= this.now()) || policy.maxLogins <= current.usedLogins)) return fail('INVALID_CONFIG', '重新开放需要有效的登录期限、统一结束时间和剩余额度');
        const earlierHardEnd = policy.hardDeadline && (!current.hardDeadline || Date.parse(policy.hardDeadline) < Date.parse(current.hardDeadline));
        if (earlierHardEnd && current.usedLogins > 0 && body.confirmHardDeadline !== true) return fail('CONFIRM_HARD_DEADLINE', '前移统一结束时间可能提前结束已有访问，请确认', 409);
        next = {...next, ...policy};
        if (body.password) {
          password = normalizeAccessPassword(String(body.password));
          Object.assign(next, await this.passwordRecord(password, records, id));
        }
      } else return fail('INVALID_ACTION', '不支持的操作');
      next.version++;
      next.updatedAt = iso(this.now());
      await records.saveCode(next);
      const sessions = await records.sessions(id);
      for (const session of sessions) {
        if (next.revokedAt && !session.revokedAt) session.revokedAt = next.revokedAt;
        if (next.hardDeadline && Date.parse(next.hardDeadline) < Date.parse(session.expiresAt)) session.expiresAt = next.hardDeadline;
        await records.saveSession(session);
      }
      return {code: this.publicCode(next, sessions), ...(password ? {password} : {})};
    });
  }
  private checkGuest(code: AccessCodeRecord) {
    const messages = {
      revoked: ['GUEST_REVOKED', '该游客密码已被撤销'], ended: ['GUEST_ENDED', '该游客密码的全部访问已结束'],
      expired: ['GUEST_EXPIRED', '该游客密码允许登录的期限已过'], exhausted: ['GUEST_EXHAUSTED', '该游客密码的登录次数已用完，已作废'],
    };
    const status = guestStatus(code, this.now());
    if (status !== 'active') return fail(messages[status][0], messages[status][1], 401);
  }
  async login(input: {target: 'platform' | 'admin'; password: string; attemptId: string; clientId: string; currentToken?: string; browser: string}) {
    const password = normalizeAccessPassword(input.password);
    if (!password || password.length > 128 || Buffer.byteLength(password) > 72) return fail('INVALID_PASSWORD', '密码不正确，请重试', 401);
    if (!/^[a-zA-Z0-9-]{16,80}$/.test(input.attemptId)) return fail('INVALID_ATTEMPT', '登录请求无效，请重试');
    const credentialKey = this.lookup(password);
    const attemptKey = this.keyed(`attempt:${input.clientId}:${input.target}:${input.attemptId}`);
    const token = this.keyed(`session:${attemptKey}`);
    return this.repo.transaction(async records => {
      const previous = await records.attempt(attemptKey);
      if (previous) {
        if (previous.credentialKey !== credentialKey) return fail('ATTEMPT_CONFLICT', '请重新提交登录', 409);
        if (!this.live(previous)) return fail('SESSION_ENDED', '本次访问已结束，请重新登录', 401);
        return {token, session: previous};
      }
      const current = input.currentToken ? await records.session(digest(input.currentToken)) : null;
      if (current && this.live(current) && current.credentialKey === credentialKey && (input.target === 'admin' ? current.kind === 'admin' : current.kind !== 'admin')) return {token: input.currentToken!, session: current};
      let kind: AccessSessionRecord['kind'] = input.target;
      let code: AccessCodeRecord | null = null;
      let expiresAt = this.now() + 24 * 60 * 60 * 1000;
      if (!await this.auth.verifyLogin(input.target, password)) {
        if (input.target === 'admin') return fail('INVALID_PASSWORD', '密码不正确，请重试', 401);
        code = await records.codeByPassword(credentialKey);
        if (!code || !await bcrypt.compare(password, code.passwordHash)) return fail('INVALID_PASSWORD', '密码不正确，请重试', 401);
        this.checkGuest(code);
        kind = 'guest';
        expiresAt = this.now() + code.durationHours * 3600000;
        if (code.hardDeadline) expiresAt = Math.min(expiresAt, Date.parse(code.hardDeadline));
        code.usedLogins++;
        code.version++;
        code.lastUsedAt = iso(this.now());
        await records.saveCode(code);
      }
      const session: AccessSessionRecord = {id: randomUUID(), tokenHash: digest(token), attemptKey, credentialKey, kind, codeId: code?.id ?? null, createdAt: iso(this.now()), expiresAt: iso(expiresAt), revokedAt: null, browser: input.browser.slice(0, 180)};
      await records.saveSession(session);
      if (current && this.live(current)) { current.revokedAt = iso(this.now()); await records.saveSession(current); }
      return {token, session};
    });
  }
  async session(token: string | undefined, scope: 'platform' | 'admin') {
    if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
    return this.repo.read(async records => {
      const session = await records.session(digest(token));
      if (!this.live(session) || !session || (scope === 'admin' ? session.kind !== 'admin' : session.kind === 'admin')) return null;
      return session;
    });
  }
  async logout(token?: string) {
    if (!token) return;
    await this.repo.transaction(async records => {
      const session = await records.session(digest(token));
      if (session && !session.revokedAt) { session.revokedAt = iso(this.now()); await records.saveSession(session); }
    });
  }
  async changePassword(target: 'platform' | 'admin', original: string, password: string) {
    const normalized = normalizeAccessPassword(password);
    if (!normalized || Buffer.byteLength(normalized) > 72) return fail('INVALID_PASSWORD_FORMAT', '密码不能为空或超过 72 字节');
    return this.repo.transaction(async records => {
      if (await records.codeByPassword(this.lookup(normalized))) return fail('PASSWORD_CONFLICT', '该密码与已有游客密码重复', 409);
      if (!await this.auth.verifyLogin(target, normalizeAccessPassword(original))) return fail('INVALID_PASSWORD', '原密码不正确', 401);
      const result = await this.auth.updatePassword(target, normalizeAccessPassword(original), normalized);
      for (const session of await records.sessions()) if (session.kind === target && !session.revokedAt) { session.revokedAt = iso(this.now()); await records.saveSession(session); }
      return result;
    });
  }
}
