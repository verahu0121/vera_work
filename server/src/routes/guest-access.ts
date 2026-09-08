import type { FastifyInstance } from 'fastify';
import type { AccessService } from '../services/access-service';

export async function registerGuestAccessRoutes(app: FastifyInstance, access: AccessService) {
  app.get('/api/admin/guest-passwords', async () => ({codes: await access.list(), serverNow: new Date().toISOString()}));
  app.get<{Params: {id: string}}>('/api/admin/guest-passwords/:id', async request => ({...await access.detail(request.params.id), serverNow: new Date().toISOString()}));
  app.post('/api/admin/guest-passwords', {bodyLimit: 16384}, async (request, reply) => {
    const result = await access.create((request.body ?? {}) as Record<string, unknown>);
    request.log.info({event: 'guest.created', codeId: result.code.id}, 'Guest password created');
    return reply.code(201).send(result);
  });
  app.patch<{Params: {id: string}}>('/api/admin/guest-passwords/:id', {bodyLimit: 16384}, async request => {
    const body = (request.body ?? {}) as Record<string, unknown>;
    const result = await access.update(request.params.id, body);
    request.log.info({event: 'guest.updated', codeId: result.code.id, action: body.action ?? 'edit'}, 'Guest password updated');
    return result;
  });
}
