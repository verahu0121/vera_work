import type { FastifyInstance } from 'fastify';
import type { AuthSettingsService } from '../services/auth-settings-service';
import { AccessError, type AccessService } from '../services/access-service';
import { CLIENT_COOKIE, SESSION_COOKIES, createLoginClient, createLoginLimiter, getLoginClient, sessionView } from '../auth-http';

export async function registerAuthSettingsRoutes(app: FastifyInstance, auth: AuthSettingsService, access: AccessService, secure = false) {
  const cookieOptions = {httpOnly: true, sameSite: 'lax' as const, secure, path: '/'};
  const limit = createLoginLimiter();

  app.get('/api/admin/session', async (request, reply) => {
    if (!getLoginClient(app, request)) reply.setCookie(CLIENT_COOKIE, createLoginClient(), {...cookieOptions, signed: true, maxAge: 30 * 86400});
    const [platform, admin] = await Promise.all([
      access.session(request.cookies[SESSION_COOKIES.platform], 'platform'),
      access.session(request.cookies[SESSION_COOKIES.admin], 'admin'),
    ]);
    return {platformAuthenticated: !!platform, adminAuthenticated: !!admin, platformSession: sessionView(platform), adminSession: sessionView(admin), serverNow: new Date().toISOString()};
  });

  app.get('/api/admin/auth-settings', async () => auth.getPublicSettings());
  app.put('/api/admin/auth-settings', {bodyLimit: 16384}, async (request) => {
    const body = (request.body ?? {}) as Record<string, unknown>;
    const target = body.target;
    if (target !== 'platform' && target !== 'admin') throw new AccessError('INVALID_TARGET', '无效的配置目标');
    if (body.field === 'welcomeText') {
      const text = typeof body.welcomeText === 'string' ? body.welcomeText.trim() : '';
      if (!text || text.length > 300) throw new AccessError('INVALID_CONFIG', '欢迎语须为 1–300 个字符');
      return auth.updateWelcomeText(target, text);
    }
    if (body.field !== 'password') throw new AccessError('INVALID_CONFIG', '无效的配置项');
    return access.changePassword(target, String(body.originalPassword ?? ''), String(body.newPassword ?? ''));
  });

  app.post('/api/admin/verify-login', {bodyLimit: 16384}, async (request, reply) => {
    const body = (request.body ?? {}) as Record<string, unknown>;
    const target = body.target;
    if (target !== 'platform' && target !== 'admin') throw new AccessError('INVALID_TARGET', '无效的登录目标');
    const password = typeof body.password === 'string' ? body.password : '';
    limit(request.ip, password);
    const clientId = getLoginClient(app, request);
    if (!clientId) throw new AccessError('SESSION_INIT_REQUIRED', '请启用浏览器 Cookie 并刷新后重试', 409);
    const result = await access.login({target, password, attemptId: String(body.attemptId ?? ''), clientId, currentToken: request.cookies[SESSION_COOKIES[target]], browser: request.headers['user-agent'] ?? 'Unknown browser'});
    reply.setCookie(SESSION_COOKIES[target], result.token, {...cookieOptions, maxAge: Math.max(1, Math.floor((Date.parse(result.session.expiresAt) - Date.now()) / 1000))});
    request.log.info({event: 'access.login', kind: result.session.kind, sessionId: result.session.id}, 'Access session established');
    return {ok: true, session: sessionView(result.session), serverNow: new Date().toISOString()};
  });

  app.post('/api/admin/logout', async (request, reply) => {
    const target = ((request.body ?? {}) as Record<string, unknown>).target;
    if (target !== 'platform' && target !== 'admin') throw new AccessError('INVALID_TARGET', '无效的退出目标');
    await access.logout(request.cookies[SESSION_COOKIES[target]]);
    reply.clearCookie(SESSION_COOKIES[target], cookieOptions);
    if (target === 'platform') {
      await access.logout(request.cookies[SESSION_COOKIES.admin]);
      reply.clearCookie(SESSION_COOKIES.admin, cookieOptions);
    }
    return {ok: true};
  });
}
