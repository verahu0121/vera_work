import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { pgFixture } from './pg-fixture';
import { AccessService } from '../src/services/access-service';
import { PgAccessRepository } from '../src/db/adapters/pg-access-repo';

test('PostgreSQL: atomic quota, persistence across services, transaction rollback and expiry', {skip: process.env.ACCESS_PG_TEST !== '1'}, async () => {
  const f = await pgFixture();
  try {
    const password = 'integration-guest-password';
    const {code} = await f.access.create({label:'Postgres integration', password, durationHours:4, maxLogins:1, loginDeadline:new Date(f.now()+86400000).toISOString(),hardDeadline:null});
    const login = () => f.access.login({target:'platform',password,clientId:randomUUID(),attemptId:randomUUID(),browser:'PG integration'});
    const results = await Promise.allSettled(Array.from({length:12},login));
    assert.equal(results.filter(r => r.status === 'fulfilled').length,1);
    const success = results.find(r => r.status === 'fulfilled') as PromiseFulfilledResult<Awaited<ReturnType<typeof login>>>;
    const anotherService = new AccessService(new PgAccessRepository(f.pool),f.auth,'pg-integration-tests-only-secret',f.now);
    assert.ok(await anotherService.session(success.value.token,'platform'));
    assert.equal((await anotherService.detail(code.id)).code.usedLogins,1);
    await assert.rejects(f.repo.transaction(async records => {
      const value = (await records.code(code.id))!; value.usedLogins = 99; await records.saveCode(value); throw new Error('rollback test');
    }),/rollback test/);
    assert.equal((await f.access.detail(code.id)).code.usedLogins,1);
    f.advance(4*3600000);
    assert.equal(await anotherService.session(success.value.token,'platform'),null);
    const current = (await f.access.detail(code.id)).code;
    await f.access.update(code.id,{version:current.version,action:'add-uses',amount:1});
    assert.ok((await login()).session);
  } finally {await f.close();}
});
