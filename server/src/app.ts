import Fastify from 'fastify'
import cookie from '@fastify/cookie'
import multipart from '@fastify/multipart'
import { registerHealthRoutes } from './routes/health'
import { registerAuthSettingsRoutes } from './routes/auth-settings'
import { registerMediaRoutes } from './routes/media'
import { registerPortfolioProjectRoutes } from './routes/portfolio-projects'
import { registerResumeContentRoutes } from './routes/resume-content'
import { createServerDependencies, type ServerDependencies } from './bootstrap'
import { getServerEnv } from './utils/env'
import { registerAccessGuard } from './auth-http'
import { registerGuestAccessRoutes } from './routes/guest-access'
import { AccessError } from './services/access-service'

export async function createApp(options: {dependencies?: ServerDependencies; logger?: boolean} = {}) {
  const env = getServerEnv()
  const app = Fastify({
    logger: options.logger ?? true,
    trustProxy: env.trustedProxies.length ? env.trustedProxies : false,
  })

  await app.register(cookie, {
    secret: env.sessionSecret,
  })
  app.register(multipart)

  const dependencies = options.dependencies ?? await createServerDependencies()
  app.setErrorHandler((error, request, reply) => {
    if (error instanceof AccessError) {
      if (error.status === 429) reply.header('Retry-After', '900')
      return reply.status(error.status).send({code: error.code, error: error.message})
    }
    request.log.error({err: error}, 'Request failed')
    const status = (error as {statusCode?: number}).statusCode
    return reply.status(status && status < 500 ? status : 503).send({code: 'SERVICE_UNAVAILABLE', error: '暂时无法完成请求，请稍后重试'})
  })
  registerAccessGuard(app, dependencies.accessService, env)

  app.register(registerHealthRoutes)
  app.register((instance) =>
    registerAuthSettingsRoutes(instance, dependencies.authSettingsService, dependencies.accessService, env.production),
  )
  app.register(instance => registerGuestAccessRoutes(instance, dependencies.accessService))
  app.register((instance) =>
    registerPortfolioProjectRoutes(instance, dependencies.portfolioProjectsService, dependencies.accessService),
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
