import fs from 'node:fs/promises'
import path from 'node:path'
import {
  DEFAULT_RESUME_CONTENT,
  type ResumeContentData,
} from '../../../../src/app/data/resumeContent'
import type { ResumeContentRepository } from '../../repositories/resume-content-repository'

const DATA_DIR = path.resolve(process.cwd(), '.data')
const RESUME_CONTENT_PATH = path.join(DATA_DIR, 'resume-content.json')

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true })
}

function isResumeContentData(value: unknown): value is ResumeContentData {
  if (!value || typeof value !== 'object') return false
  const target = value as Record<string, unknown>
  return (
    target.profile != null &&
    typeof target.profile === 'object' &&
    target.experienceGrid != null &&
    typeof target.experienceGrid === 'object' &&
    target.education != null &&
    typeof target.education === 'object'
  )
}

export class BootstrapResumeContentRepository implements ResumeContentRepository {
  async isEmpty(): Promise<boolean> {
    await ensureDataDir()

    try {
      const file = await fs.readFile(RESUME_CONTENT_PATH, 'utf8')
      return !isResumeContentData(JSON.parse(file))
    } catch {
      return true
    }
  }

  async getContent(): Promise<ResumeContentData> {
    await ensureDataDir()

    try {
      const file = await fs.readFile(RESUME_CONTENT_PATH, 'utf8')
      const parsed = JSON.parse(file)
      if (isResumeContentData(parsed)) {
        return parsed
      }
    } catch {
      // fall through to seed
    }

    await this.saveContent(DEFAULT_RESUME_CONTENT)
    return DEFAULT_RESUME_CONTENT
  }

  async saveContent(content: ResumeContentData): Promise<ResumeContentData> {
    await ensureDataDir()
    await fs.writeFile(RESUME_CONTENT_PATH, JSON.stringify(content, null, 2), 'utf8')
    return content
  }
}
