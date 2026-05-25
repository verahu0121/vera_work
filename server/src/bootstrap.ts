import type { Pool } from 'pg'
import { BootstrapAuthSettingsRepository } from './db/adapters/bootstrap-auth-settings-repo'
import { BootstrapPortfolioProjectsRepository } from './db/adapters/bootstrap-portfolio-projects-repo'
import { BootstrapResumeContentRepository } from './db/adapters/bootstrap-resume-content-repo'
import { PgAuthSettingsRepository } from './db/adapters/pg-auth-settings-repo'
import { PgPortfolioProjectsRepository } from './db/adapters/pg-portfolio-projects-repo'
import { PgResumeContentRepository } from './db/adapters/pg-resume-content-repo'
import { createPostgresPool, ensurePostgresSchema } from './db/postgres'
import { AuthSettingsService } from './services/auth-settings-service'
import { MediaService } from './services/media-service'
import { PortfolioProjectsService } from './services/portfolio-projects-service'
import { ResumeContentService } from './services/resume-content-service'
import { getServerEnv } from './utils/env'

type ServerDependencies = {
  authSettingsService: AuthSettingsService
  portfolioProjectsService: PortfolioProjectsService
  resumeContentService: ResumeContentService
  mediaService: MediaService
  close?: () => Promise<void>
}

async function createPostgresDependencies(databaseUrl: string): Promise<ServerDependencies> {
  const pool = createPostgresPool(databaseUrl)
  await ensurePostgresSchema(pool)

  const authSettingsRepository = new PgAuthSettingsRepository(pool)
  const portfolioProjectsRepository = new PgPortfolioProjectsRepository(pool)
  const resumeContentRepository = new PgResumeContentRepository(pool)
  const bootstrapAuthSettingsRepository = new BootstrapAuthSettingsRepository()
  const bootstrapPortfolioProjectsRepository = new BootstrapPortfolioProjectsRepository()
  const bootstrapResumeContentRepository = new BootstrapResumeContentRepository()

  if (await authSettingsRepository.isEmpty()) {
    const record = await bootstrapAuthSettingsRepository.getRecord()
    await authSettingsRepository.saveRecord(record)
  }

  if (await portfolioProjectsRepository.isEmpty()) {
    const projects = await bootstrapPortfolioProjectsRepository.getProjects()
    await portfolioProjectsRepository.saveProjects(projects)
  }

  if (await resumeContentRepository.isEmpty()) {
    const content = await bootstrapResumeContentRepository.getContent()
    await resumeContentRepository.saveContent(content)
  }

  await portfolioProjectsRepository.migrateLegacyGalleryImagesToSections()

  return {
    authSettingsService: new AuthSettingsService(authSettingsRepository),
    portfolioProjectsService: new PortfolioProjectsService(portfolioProjectsRepository),
    resumeContentService: new ResumeContentService(resumeContentRepository),
    mediaService: new MediaService(),
    close: async () => {
      await pool.end()
    },
  }
}

function createBootstrapDependencies(): ServerDependencies {
  const authSettingsRepository = new BootstrapAuthSettingsRepository()
  const portfolioProjectsRepository = new BootstrapPortfolioProjectsRepository()
  const resumeContentRepository = new BootstrapResumeContentRepository()

  return {
    authSettingsService: new AuthSettingsService(authSettingsRepository),
    portfolioProjectsService: new PortfolioProjectsService(portfolioProjectsRepository),
    resumeContentService: new ResumeContentService(resumeContentRepository),
    mediaService: new MediaService(),
  }
}

export async function createServerDependencies(): Promise<ServerDependencies> {
  const env = getServerEnv()

  if (env.databaseUrl) {
    try {
      return await createPostgresDependencies(env.databaseUrl)
    } catch (error) {
      console.warn(
        '[server] Failed to connect to Postgres, falling back to local bootstrap data.',
        error,
      )
    }
  }

  return createBootstrapDependencies()
}
