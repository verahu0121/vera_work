import { createHash, randomBytes } from 'node:crypto';
import type { FastifyInstance, FastifyRequest } from 'fastify';
import { AccessError, type AccessService } from './services/access-service';

export const SESSION_COOKIES = {platform: 'vera_platform_session_v2', admin: 'vera_admin_session_v2'};
export const CLIENT_COOKIE = 'vera_login_client';
export const sessionView = (session: {kind: string; expiresAt: string} | null) => session ? {kind: session.kind, expiresAt: session.expiresAt} : null;

export function registerAccessGuard(app: FastifyInstance, access: AccessService, options: {production: boolean; appOrigin?: string}) {
  const publicRoutes = new Set(['/api/health', '/api/admin/session', '/api/admin/auth-settings', '/api/admin/verify-login', '/api/admin/logout']);
  app.addHook('onRequest', async (request, reply) => {
    const path = request.url.split('?')[0];
    if (!path.startsWith('/api/')) return;
    reply.header('Cache-Control', 'no-store');
    if (!['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
      if (request.headers['x-site-request'] !== '1') throw new AccessError('CSRF_REJECTED', '请求来源验证失败，请刷新页面后重试', 403);
      const origin = request.headers.origin;
      if (origin) {
        let valid = false;
        try {
          const url = new URL(origin);
          valid = origin === (options.appOrigin || `${request.protocol}://${request.host}`) || (!options.production && ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname));
        } catch { /* Invalid origins are rejected. */ }
        if (!valid) throw new AccessError('CSRF_REJECTED', '请求来源验证失败', 403);
      }
    }
    if (path === '/api/admin/auth-settings' && request.method !== 'GET') {
      if (!await access.session(request.cookies[SESSION_COOKIES.admin], 'admin')) throw new AccessError('ADMIN_REQUIRED', '后台登录已失效，请重新登录', 401);
      return;
    }
    if (publicRoutes.has(path)) return;
    const admin = await access.session(request.cookies[SESSION_COOKIES.admin], 'admin');
    const adminOnly = !['GET', 'HEAD'].includes(request.method) || path.startsWith('/api/admin/guest-passwords');
    if (adminOnly && !admin) throw new AccessError('ADMIN_REQUIRED', '请先登录管理后台', 401);
    if (!admin && !await access.session(request.cookies[SESSION_COOKIES.platform], 'platform')) throw new AccessError('SESSION_ENDED', '本次访问已结束，请重新登录', 401);
  });
}

export function getLoginClient(app: FastifyInstance, request: FastifyRequest) {
  const raw = request.cookies[CLIENT_COOKIE];
  if (!raw) return null;
  const result = app.unsignCookie(raw);
  return result.valid && result.value && /^[a-f0-9]{64}$/.test(result.value) ? result.value : null;
}
export const createLoginClient = () => randomBytes(32).toString('hex');

export function createLoginLimiter() {
  const entries = new Map<string, {count: number; reset: number}>();
  return (ip: string, password: string) => {
    const now = Date.now();
    for (const [key, value] of entries) if (value.reset <= now) entries.delete(key);
    if (entries.size >= 10000) throw new AccessError('RATE_LIMITED', '请求过多，请稍后重试', 429);
    const checks = [[`ip:${ip}`, 60], [`credential:${createHash('sha256').update(password).digest('hex')}`, 30]] as const;
    for (const [key, limit] of checks) {
      const entry = entries.get(key) ?? {count: 0, reset: now + 15 * 60 * 1000};
      entries.set(key, entry);
      entry.count++;
      if (entry.count > limit) throw new AccessError('RATE_LIMITED', '尝试次数过多，请 15 分钟后再试', 429);
    }
  };
}
