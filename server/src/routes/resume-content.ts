import type { FastifyInstance } from 'fastify'
import type { ResumeContentData } from '../../../src/app/data/resumeContent'
import { ResumeContentService } from '../services/resume-content-service'

export async function registerResumeContentRoutes(
  app: FastifyInstance,
  resumeContentService: ResumeContentService,
) {
  app.get('/api/admin/resume', async (_request, reply) => {
    const content = await resumeContentService.getContent()
    return reply.send(content)
  })

  app.put('/api/admin/resume', async (request, reply) => {
    const body = (request.body ?? {}) as { content?: unknown }

    if (!body.content || typeof body.content !== 'object') {
      return reply.status(400).send({ error: 'Resume content is required.' })
    }

    const savedContent = await resumeContentService.saveContent(
      body.content as ResumeContentData,
    )

    return reply.send(savedContent)
  })
}
