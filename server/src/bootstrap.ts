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
import { ensureAccessSchema, PgAccessRepository } from './db/adapters/pg-access-repo'
import { AccessService } from './services/access-service'

export type ServerDependencies = {
  authSettingsService: AuthSettingsService
  portfolioProjectsService: PortfolioProjectsService
  resumeContentService: ResumeContentService
  mediaService: MediaService
  accessService: AccessService
  close?: () => Promise<void>
}

async function syncPostgresDataToBootstrapCache(
  authSettingsRepository: PgAuthSettingsRepository,
  portfolioProjectsRepository: PgPortfolioProjectsRepository,
  resumeContentRepository: PgResumeContentRepository,
  bootstrapAuthSettingsRepository: BootstrapAuthSettingsRepository,
  bootstrapPortfolioProjectsRepository: BootstrapPortfolioProjectsRepository,
  bootstrapResumeContentRepository: BootstrapResumeContentRepository,
) {
  try {
    const [authSettings, projects, resumeContent] = await Promise.all([
      authSettingsRepository.getRecord(),
      portfolioProjectsRepository.getProjects(),
      resumeContentRepository.getContent(),
    ])

    await Promise.all([
      bootstrapAuthSettingsRepository.saveRecord(authSettings),
      bootstrapPortfolioProjectsRepository.saveProjects(projects),
      bootstrapResumeContentRepository.saveContent(resumeContent),
    ])
  } catch (error) {
    console.warn('[server] Failed to sync Postgres data to local bootstrap cache.', error)
  }
}

async function createPostgresDependencies(databaseUrl: string): Promise<ServerDependencies> {
  const pool = createPostgresPool(databaseUrl)
  await ensurePostgresSchema(pool)
  await ensureAccessSchema(pool)

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
  await syncPostgresDataToBootstrapCache(
    authSettingsRepository,
    portfolioProjectsRepository,
    resumeContentRepository,
    bootstrapAuthSettingsRepository,
    bootstrapPortfolioProjectsRepository,
    bootstrapResumeContentRepository,
  )

  return {
    authSettingsService: new AuthSettingsService(authSettingsRepository),
    portfolioProjectsService: new PortfolioProjectsService(portfolioProjectsRepository),
    resumeContentService: new ResumeContentService(resumeContentRepository),
    mediaService: new MediaService(),
    accessService: new AccessService(new PgAccessRepository(pool), new AuthSettingsService(authSettingsRepository), getServerEnv().sessionSecret),
    close: async () => {
      await pool.end()
    },
  }
}

export async function createServerDependencies(): Promise<ServerDependencies> {
  const env = getServerEnv()

  if (!env.databaseUrl) throw new Error('DATABASE_URL is required for access sessions. Local content caches cannot authorize access.')
  // Guest password lookups must survive restarts. Never persist them with an
  // ephemeral development secret (the fallback is only for isolated tests).
  if (!process.env.SESSION_SECRET) throw new Error('A stable SESSION_SECRET is required for persistent guest passwords.')
  return createPostgresDependencies(env.databaseUrl)
}
