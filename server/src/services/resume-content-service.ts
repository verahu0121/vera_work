import {
  DEFAULT_RESUME_CONTENT,
  type ResumeContentData,
} from '../../../src/app/data/resumeContent'
import type { ResumeContentRepository } from '../repositories/resume-content-repository'

export class ResumeContentService {
  constructor(private readonly repository: ResumeContentRepository) {}

  async getContent(): Promise<ResumeContentData> {
    const content = await this.repository.getContent()
    return {
      ...DEFAULT_RESUME_CONTENT,
      ...content,
      profile: {
        ...DEFAULT_RESUME_CONTENT.profile,
        ...(content.profile ?? {}),
      },
      experienceGrid: {
        ...DEFAULT_RESUME_CONTENT.experienceGrid,
        ...(content.experienceGrid ?? {}),
        experiences:
          content.experienceGrid?.experiences ?? DEFAULT_RESUME_CONTENT.experienceGrid.experiences,
        projectSets:
          content.experienceGrid?.projectSets ?? DEFAULT_RESUME_CONTENT.experienceGrid.projectSets,
      },
      education: {
        ...DEFAULT_RESUME_CONTENT.education,
        ...(content.education ?? {}),
        awards: content.education?.awards ?? DEFAULT_RESUME_CONTENT.education.awards,
      },
      aiProducts: {
        ...DEFAULT_RESUME_CONTENT.aiProducts,
        ...(content.aiProducts ?? {}),
        projectCards:
          content.aiProducts?.projectCards ?? DEFAULT_RESUME_CONTENT.aiProducts.projectCards,
        roleCards:
          content.aiProducts?.roleCards ?? DEFAULT_RESUME_CONTENT.aiProducts.roleCards,
        contactCard: {
          ...DEFAULT_RESUME_CONTENT.aiProducts.contactCard,
          ...(content.aiProducts?.contactCard ?? {}),
        },
      },
      uxCase: {
        ...DEFAULT_RESUME_CONTENT.uxCase,
        ...(content.uxCase ?? {}),
        largeCards: content.uxCase?.largeCards ?? DEFAULT_RESUME_CONTENT.uxCase.largeCards,
        mediumCards: content.uxCase?.mediumCards ?? DEFAULT_RESUME_CONTENT.uxCase.mediumCards,
      },
    }
  }

  async saveContent(content: ResumeContentData): Promise<ResumeContentData> {
    return this.repository.saveContent(content)
  }
}
