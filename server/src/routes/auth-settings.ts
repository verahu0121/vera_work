import type { FastifyInstance } from 'fastify'
import { AuthSettingsService } from '../services/auth-settings-service'

const ONE_DAY_MS = 24 * 60 * 60 * 1000
const PLATFORM_SESSION_COOKIE = 'vera_platform_session'
const ADMIN_SESSION_COOKIE = 'vera_admin_session'

function getSessionCookieName(target: 'platform' | 'admin') {
  return target === 'platform' ? PLATFORM_SESSION_COOKIE : ADMIN_SESSION_COOKIE
}

function hasValidSessionCookie(
  app: FastifyInstance,
  rawCookieValue: string | undefined,
) {
  if (!rawCookieValue) return false

  const decoded = decodeURIComponent(rawCookieValue)
  return app.unsignCookie(decoded).valid
}

export async function registerAuthSettingsRoutes(
  app: FastifyInstance,
  authSettingsService: AuthSettingsService,
) {
  app.get('/api/admin/session', async (request, reply) => {
    const platformAuthenticated = hasValidSessionCookie(
      app,
      request.cookies[PLATFORM_SESSION_COOKIE],
    )
    const adminAuthenticated = hasValidSessionCookie(
      app,
      request.cookies[ADMIN_SESSION_COOKIE],
    )

    return reply.send({
      platformAuthenticated,
      adminAuthenticated,
    })
  })

  app.get('/api/admin/auth-settings', async (_request, reply) => {
    const settings = await authSettingsService.getPublicSettings()
    return reply.send(settings)
  })

  app.put('/api/admin/auth-settings', async (request, reply) => {
    const body = (request.body ?? {}) as Record<string, unknown>
    const target =
      body.target === 'platform' ? 'platform' : body.target === 'admin' ? 'admin' : null
    const field =
      body.field === 'welcomeText' ? 'welcomeText' : body.field === 'password' ? 'password' : null

    if (!target || !field) {
      return reply.status(400).send({ error: 'Target and field are required.' })
    }

    if (field === 'welcomeText') {
      const welcomeText = typeof body.welcomeText === 'string' ? body.welcomeText.trim() : ''
      if (!welcomeText) {
        return reply.status(400).send({ error: 'Welcome text is required.' })
      }

      const settings = await authSettingsService.updateWelcomeText(target, welcomeText)
      return reply.send(settings)
    }

    const originalPassword =
      typeof body.originalPassword === 'string' ? body.originalPassword : ''
    const newPassword = typeof body.newPassword === 'string' ? body.newPassword.trim() : ''

    if (!newPassword) {
      return reply.status(400).send({ error: 'New password is required.' })
    }

    try {
      const settings = await authSettingsService.updatePassword(
        target,
        originalPassword,
        newPassword,
      )
      return reply.send(settings)
    } catch (error) {
      return reply.status(401).send({
        error: error instanceof Error ? error.message : 'Password update failed.',
      })
    }
  })

  app.post('/api/admin/verify-login', async (request, reply) => {
    const body = (request.body ?? {}) as Record<string, unknown>
    const target =
      body.target === 'platform' ? 'platform' : body.target === 'admin' ? 'admin' : null
    const password = typeof body.password === 'string' ? body.password : ''

    if (!target || !password) {
      return reply.status(400).send({ error: 'Target and password are required.' })
    }

    const isValid = await authSettingsService.verifyLogin(target, password)

    if (!isValid) {
      return reply.status(401).send({ error: 'Password is incorrect.' })
    }

    reply.setCookie(getSessionCookieName(target), '1', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      signed: true,
      path: '/',
      maxAge: ONE_DAY_MS / 1000,
    })

    return reply.send({ ok: true })
  })

  app.post('/api/admin/logout', async (request, reply) => {
    const body = (request.body ?? {}) as Record<string, unknown>
    const target =
      body.target === 'platform' ? 'platform' : body.target === 'admin' ? 'admin' : null

    if (!target) {
      return reply.status(400).send({ error: 'Target is required.' })
    }

    reply.clearCookie(getSessionCookieName(target), {
      path: '/',
    })

    return reply.send({ ok: true })
  })
}
