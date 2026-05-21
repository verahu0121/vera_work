import type { ResumeContentData } from '../../../src/app/data/resumeContent'

export interface ResumeContentRepository {
  getContent(): Promise<ResumeContentData>
  saveContent(content: ResumeContentData): Promise<ResumeContentData>
  isEmpty(): Promise<boolean>
}
