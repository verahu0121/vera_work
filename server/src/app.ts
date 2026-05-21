import Fastify from 'fastify'
import cookie from '@fastify/cookie'
import multipart from '@fastify/multipart'
import { registerHealthRoutes } from './routes/health'
import { registerAuthSettingsRoutes } from './routes/auth-settings'
import { registerMediaRoutes } from './routes/media'
import { registerPortfolioProjectRoutes } from './routes/portfolio-projects'
import { registerResumeContentRoutes } from './routes/resume-content'
import { createServerDependencies } from './bootstrap'
import { getServerEnv } from './utils/env'

export async function createApp() {
  const env = getServerEnv()
  const app = Fastify({
    logger: true,
  })

  app.register(cookie, {
    secret: env.sessionSecret,
  })
  app.register(multipart)

  const dependencies = await createServerDependencies()

  app.register(registerHealthRoutes)
  app.register((instance) =>
    registerAuthSettingsRoutes(instance, dependencies.authSettingsService),
  )
  app.register((instance) =>
    registerPortfolioProjectRoutes(instance, dependencies.portfolioProjectsService),
  )
  app.register((instance) =>
    registerResumeContentRoutes(instance, dependencies.resumeContentService),
  )
  app.register((instance) => registerMediaRoutes(instance, dependencies.mediaService))

  if (dependencies.close) {
    app.addHook('onClose', async () => {
      await dependencies.close?.()
    })
  }

  return app
}
