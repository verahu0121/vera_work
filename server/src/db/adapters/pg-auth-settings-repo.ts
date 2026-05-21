import type { Pool } from 'pg'
import type { AuthSettingsRecord } from '../types'
import type { AuthSettingsRepository } from '../../repositories/auth-settings-repository'

const DEFAULT_ROW_ID = 'default'

export class PgAuthSettingsRepository implements AuthSettingsRepository {
  constructor(private readonly pool: Pool) {}

  async isEmpty() {
    const result = await this.pool.query<{ count: number }>(
      'SELECT COUNT(*)::int AS count FROM app_auth_settings',
    )
    return (result.rows[0]?.count ?? 0) === 0
  }

  async getRecord(): Promise<AuthSettingsRecord> {
    const result = await this.pool.query<{
      platform_welcome_text: string
      platform_password_hash: string
      admin_welcome_text: string
      admin_password_hash: string
      updated_at: string | Date
    }>(
      `
        SELECT
          platform_welcome_text,
          platform_password_hash,
          admin_welcome_text,
          admin_password_hash,
          updated_at
        FROM app_auth_settings
        WHERE id = $1
        LIMIT 1
      `,
      [DEFAULT_ROW_ID],
    )

    const row = result.rows[0]

    if (!row) {
      throw new Error('PostgreSQL auth settings row is missing.')
    }

    return {
      platformWelcomeText: row.platform_welcome_text,
      platformPasswordHash: row.platform_password_hash,
      adminWelcomeText: row.admin_welcome_text,
      adminPasswordHash: row.admin_password_hash,
      updatedAt: new Date(row.updated_at).toISOString(),
    }
  }

  async saveRecord(record: AuthSettingsRecord): Promise<AuthSettingsRecord> {
    const result = await this.pool.query<{
      platform_welcome_text: string
      platform_password_hash: string
      admin_welcome_text: string
      admin_password_hash: string
      updated_at: string | Date
    }>(
      `
        INSERT INTO app_auth_settings (
          id,
          platform_welcome_text,
          platform_password_hash,
          admin_welcome_text,
          admin_password_hash,
          updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6::timestamptz)
        ON CONFLICT (id)
        DO UPDATE SET
          platform_welcome_text = EXCLUDED.platform_welcome_text,
          platform_password_hash = EXCLUDED.platform_password_hash,
          admin_welcome_text = EXCLUDED.admin_welcome_text,
          admin_password_hash = EXCLUDED.admin_password_hash,
          updated_at = EXCLUDED.updated_at
        RETURNING
          platform_welcome_text,
          platform_password_hash,
          admin_welcome_text,
          admin_password_hash,
          updated_at
      `,
      [
        DEFAULT_ROW_ID,
        record.platformWelcomeText,
        record.platformPasswordHash,
        record.adminWelcomeText,
        record.adminPasswordHash,
        record.updatedAt,
      ],
    )

    const row = result.rows[0]

    return {
      platformWelcomeText: row.platform_welcome_text,
      platformPasswordHash: row.platform_password_hash,
      adminWelcomeText: row.admin_welcome_text,
      adminPasswordHash: row.admin_password_hash,
      updatedAt: new Date(row.updated_at).toISOString(),
    }
  }
}
