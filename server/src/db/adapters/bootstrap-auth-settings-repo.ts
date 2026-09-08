import fs from 'node:fs/promises'
import path from 'node:path'
import bcrypt from 'bcrypt'
import type { AuthSettingsRecord } from '../types'
import type { AuthSettingsRepository } from '../../repositories/auth-settings-repository'
import { DEFAULT_AUTH_SETTINGS } from '../../../../src/app/data/authSettings'

const DATA_DIR = path.resolve(process.cwd(), '.data')
const AUTH_SETTINGS_PATH = path.join(DATA_DIR, 'auth-settings.json')
const LEGACY_SQLITE_PATH = path.join(DATA_DIR, 'admin-settings.sqlite')
const BCRYPT_ROUNDS = 10

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true })
}

function buildDefaultRecord(platformPasswordHash: string, adminPasswordHash: string): AuthSettingsRecord {
  return {
    ...DEFAULT_AUTH_SETTINGS,
    platformPasswordHash,
    adminPasswordHash,
    updatedAt: new Date().toISOString(),
  }
}

function isAuthSettingsRecord(value: unknown): value is AuthSettingsRecord {
  if (!value || typeof value !== 'object') return false
  const target = value as Record<string, unknown>

  return (
    typeof target.platformWelcomeText === 'string' &&
    typeof target.adminWelcomeText === 'string' &&
    typeof target.platformPasswordHash === 'string' &&
    typeof target.adminPasswordHash === 'string' &&
    typeof target.updatedAt === 'string'
  )
}

async function readLegacySqliteSettings() {
  try {
    await fs.access(LEGACY_SQLITE_PATH)
  } catch {
    return null
  }

  try {
    const sqlite = await import('node:sqlite')
    const database = new sqlite.DatabaseSync(LEGACY_SQLITE_PATH)
    const rows = database
      .prepare('SELECT key, value FROM app_settings')
      .all() as Array<{ key: string; value: string }>

    database.close()

    const map = rows.reduce<Record<string, string>>((acc, row) => {
      acc[row.key] = row.value
      return acc
    }, {})

    return {
      platformWelcomeText: map.platformWelcomeText ?? DEFAULT_AUTH_SETTINGS.platformWelcomeText,
      adminWelcomeText: map.adminWelcomeText ?? DEFAULT_AUTH_SETTINGS.adminWelcomeText,
      platformPassword: map.platformPassword ?? process.env.INITIAL_PLATFORM_PASSWORD,
      adminPassword: map.adminPassword ?? process.env.INITIAL_ADMIN_PASSWORD,
    }
  } catch {
    return null
  }
}

async function seedRecord() {
  const legacySettings = await readLegacySqliteSettings()
  const platformPassword = legacySettings?.platformPassword ?? process.env.INITIAL_PLATFORM_PASSWORD
  const adminPassword = legacySettings?.adminPassword ?? process.env.INITIAL_ADMIN_PASSWORD
  if (!platformPassword || !adminPassword) throw new Error('New installations require INITIAL_PLATFORM_PASSWORD and INITIAL_ADMIN_PASSWORD. Existing password hashes are never reset.')
  const platformPasswordHash = await bcrypt.hash(platformPassword, BCRYPT_ROUNDS)
  const adminPasswordHash = await bcrypt.hash(adminPassword, BCRYPT_ROUNDS)

  return {
    platformWelcomeText: legacySettings?.platformWelcomeText ?? DEFAULT_AUTH_SETTINGS.platformWelcomeText,
    adminWelcomeText: legacySettings?.adminWelcomeText ?? DEFAULT_AUTH_SETTINGS.adminWelcomeText,
    platformPasswordHash,
    adminPasswordHash,
    updatedAt: new Date().toISOString(),
  } satisfies AuthSettingsRecord
}

export class BootstrapAuthSettingsRepository implements AuthSettingsRepository {
  async getRecord(): Promise<AuthSettingsRecord> {
    await ensureDataDir()

    try {
      const file = await fs.readFile(AUTH_SETTINGS_PATH, 'utf8')
      const parsed = JSON.parse(file)

      if (isAuthSettingsRecord(parsed)) {
        return parsed
      }
    } catch {
      // Fall through to seed path.
    }

    const record = await seedRecord()
    await this.saveRecord(record)
    return record
  }

  async saveRecord(record: AuthSettingsRecord): Promise<AuthSettingsRecord> {
    await ensureDataDir()
    await fs.writeFile(AUTH_SETTINGS_PATH, JSON.stringify(record, null, 2), 'utf8')
    return record
  }
}
