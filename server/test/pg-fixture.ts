import { randomUUID } from 'node:crypto';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import { createPostgresPool } from '../src/db/postgres';
import { ensureAccessSchema, PgAccessRepository } from '../src/db/adapters/pg-access-repo';
import { AuthSettingsService } from '../src/services/auth-settings-service';
import { AccessService } from '../src/services/access-service';
import { getServerEnv } from '../src/utils/env';

export async function pgFixture() {
  const url = getServerEnv().databaseUrl;
  if (!url) throw new Error('DATABASE_URL is required for PostgreSQL integration tests');
  const schema = `guest_access_test_${randomUUID().replaceAll('-', '')}`;
  if (!/^guest_access_test_[a-f0-9]{32}$/.test(schema)) throw new Error('Invalid test schema');
  const control = createPostgresPool(url);
  await control.query(`CREATE SCHEMA "${schema}"`);
  const pool = new Pool({...control.options, options: `-c search_path=${schema}`});
  const close = async () => {
    await pool.end();
    // Only this newly created, random test namespace is removed; no application
    // table or existing schema is ever used by this fixture.
    try {await control.query(`DROP SCHEMA "${schema}" CASCADE`);} finally {await control.end();}
  };
  try {
    await ensureAccessSchema(pool);
    let record = {platformWelcomeText: 'Welcome to Vera’s Libertisle !', adminWelcomeText: 'Admin Preview', platformPasswordHash: await bcrypt.hash('qa-platform-preview',4), adminPasswordHash: await bcrypt.hash('qa-admin-preview',4), updatedAt: new Date().toISOString()};
    const auth = new AuthSettingsService({getRecord: async () => ({...record}), saveRecord: async value => {record = {...value}; return record;}});
    const repo = new PgAccessRepository(pool);
    let now = Date.now();
    const access = new AccessService(repo, auth, 'pg-integration-tests-only-secret', () => now);
    return {pool, repo, auth, access, close, now: () => now, advance: (ms: number) => {now += ms;}, setRealClock: () => {now = Date.now();}};
  } catch (error) {await close(); throw error;}
}
