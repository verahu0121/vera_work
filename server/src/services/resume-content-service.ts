import {
  normalizeResumeContent,
  type ResumeContentData,
} from '../../../src/app/data/resumeContent'
import type { ResumeContentRepository } from '../repositories/resume-content-repository'

export class ResumeContentService {
  constructor(private readonly repository: ResumeContentRepository) {}

  async getContent(): Promise<ResumeContentData> {
    const content = await this.repository.getContent()
    return normalizeResumeContent(content)
  }

  async saveContent(content: ResumeContentData): Promise<ResumeContentData> {
    return this.repository.saveContent(normalizeResumeContent(content))
  }
}
