import bcrypt from 'bcrypt'
import type { AuthSettingsRepository } from '../repositories/auth-settings-repository'
import type { PublicAuthSettings } from '../db/types'

const BCRYPT_ROUNDS = 10

export class AuthSettingsService {
  constructor(private readonly repository: AuthSettingsRepository) {}

  async getPublicSettings(): Promise<PublicAuthSettings> {
    const record = await this.repository.getRecord()
    return {
      platformWelcomeText: record.platformWelcomeText,
      adminWelcomeText: record.adminWelcomeText,
    }
  }

  async verifyLogin(target: 'platform' | 'admin', password: string) {
    const record = await this.repository.getRecord()
    const passwordHash =
      target === 'platform' ? record.platformPasswordHash : record.adminPasswordHash

    return bcrypt.compare(password, passwordHash)
  }

  async updateWelcomeText(target: 'platform' | 'admin', welcomeText: string) {
    const record = await this.repository.getRecord()
    const nextRecord = {
      ...record,
      ...(target === 'platform'
        ? { platformWelcomeText: welcomeText }
        : { adminWelcomeText: welcomeText }),
      updatedAt: new Date().toISOString(),
    }

    await this.repository.saveRecord(nextRecord)
    return this.getPublicSettings()
  }

  async updatePassword(target: 'platform' | 'admin', originalPassword: string, newPassword: string) {
    const record = await this.repository.getRecord()
    const currentHash = target === 'platform' ? record.platformPasswordHash : record.adminPasswordHash
    const isValid = await bcrypt.compare(originalPassword, currentHash)

    if (!isValid) {
      throw new Error('Original password is incorrect.')
    }

    const nextHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS)
    const nextRecord = {
      ...record,
      ...(target === 'platform'
        ? { platformPasswordHash: nextHash }
        : { adminPasswordHash: nextHash }),
      updatedAt: new Date().toISOString(),
    }

    await this.repository.saveRecord(nextRecord)
    return this.getPublicSettings()
  }
}
