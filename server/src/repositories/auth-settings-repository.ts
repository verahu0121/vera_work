import type { AuthSettingsRecord } from '../db/types'

export interface AuthSettingsRepository {
  getRecord(): Promise<AuthSettingsRecord>
  saveRecord(record: AuthSettingsRecord): Promise<AuthSettingsRecord>
}
