import type { Pool, PoolClient } from 'pg';
import type { AccessCodeRecord, AccessRecords, AccessRepository, AccessSessionRecord } from '../../repositories/access-repository';

// Identity/index columns are relational; the versioned policy and session snapshots
// live in JSONB. All mutations share a short transaction lock (low-volume portfolio).
export async function ensureAccessSchema(pool: Pool) {
  await pool.query(`CREATE TABLE IF NOT EXISTS temporary_access_codes (
    id TEXT PRIMARY KEY, password_lookup TEXT UNIQUE NOT NULL, data JSONB NOT NULL
  )`);
  await pool.query(`CREATE TABLE IF NOT EXISTS access_sessions (
    token_hash TEXT PRIMARY KEY, attempt_key TEXT UNIQUE NOT NULL,
    code_id TEXT REFERENCES temporary_access_codes(id), data JSONB NOT NULL
  )`);
  await pool.query('CREATE INDEX IF NOT EXISTS access_sessions_code_idx ON access_sessions(code_id)');
  await pool.query("CREATE INDEX IF NOT EXISTS access_sessions_expiry_idx ON access_sessions ((data->>'expiresAt'))");
}

class PgAccessRecords implements AccessRecords {
  constructor(private db: Pool | PoolClient) {}
  async codes() { return (await this.db.query<{data: AccessCodeRecord}>('SELECT data FROM temporary_access_codes ORDER BY data->>\'createdAt\' DESC')).rows.map(row => row.data); }
  async code(id: string) { return (await this.db.query('SELECT data FROM temporary_access_codes WHERE id=$1', [id])).rows[0]?.data ?? null; }
  async codeByPassword(lookup: string) { return (await this.db.query('SELECT data FROM temporary_access_codes WHERE password_lookup=$1', [lookup])).rows[0]?.data ?? null; }
  async saveCode(code: AccessCodeRecord) {
    await this.db.query(`INSERT INTO temporary_access_codes(id,password_lookup,data) VALUES($1,$2,$3::jsonb)
      ON CONFLICT(id) DO UPDATE SET password_lookup=EXCLUDED.password_lookup,data=EXCLUDED.data`, [code.id, code.passwordLookup, JSON.stringify(code)]);
  }
  async session(hash: string) { return (await this.db.query('SELECT data FROM access_sessions WHERE token_hash=$1', [hash])).rows[0]?.data ?? null; }
  async attempt(key: string) { return (await this.db.query('SELECT data FROM access_sessions WHERE attempt_key=$1', [key])).rows[0]?.data ?? null; }
  async sessions(codeId?: string): Promise<AccessSessionRecord[]> {
    return (await this.db.query(codeId ? 'SELECT data FROM access_sessions WHERE code_id=$1 ORDER BY data->>\'createdAt\' DESC' : 'SELECT data FROM access_sessions', codeId ? [codeId] : [])).rows.map(row => row.data);
  }
  async saveSession(session: AccessSessionRecord) {
    await this.db.query(`INSERT INTO access_sessions(token_hash,attempt_key,code_id,data) VALUES($1,$2,$3,$4::jsonb)
      ON CONFLICT(token_hash) DO UPDATE SET data=EXCLUDED.data`, [session.tokenHash, session.attemptKey, session.codeId, JSON.stringify(session)]);
  }
}

export class PgAccessRepository implements AccessRepository {
  constructor(private pool: Pool) {}
  read<T>(fn: (records: AccessRecords) => Promise<T>) { return fn(new PgAccessRecords(this.pool)); }
  async transaction<T>(fn: (records: AccessRecords) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      await client.query('SELECT pg_advisory_xact_lock(72841, 1)');
      const result = await fn(new PgAccessRecords(client));
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally { client.release(); }
  }
}
