import type { FastifyInstance } from 'fastify'
import { MediaService } from '../services/media-service'

export async function registerMediaRoutes(app: FastifyInstance, mediaService: MediaService) {
  app.get('/api/admin/object-image', async (request, reply) => {
    const query = request.query as Record<string, unknown>
    const key = typeof query.key === 'string' ? query.key : ''

    if (!key) {
      return reply.status(400).send({ error: 'Image key is required.' })
    }

    const object = await mediaService.getImageObject(key)

    if (!object.body) {
      return reply.status(404).send({ error: 'Image body not found.' })
    }

    const bodyBuffer = Buffer.from(await object.body.transformToByteArray())

    if (object.contentType) {
      reply.header('Content-Type', object.contentType)
    }
    if (typeof object.contentLength === 'number') {
      reply.header('Content-Length', object.contentLength)
    }
    if (object.etag) {
      reply.header('ETag', object.etag)
    }
    if (object.lastModified) {
      reply.header('Last-Modified', object.lastModified.toUTCString())
    }
    reply.header('Cache-Control', object.cacheControl || 'private, max-age=3600')

    return reply.send(bodyBuffer)
  })

  app.post('/api/admin/upload-image', async (request, reply) => {
    const file = await request.file({
      limits: {
        files: 1,
        fileSize: 10 * 1024 * 1024,
      },
    })

    if (!file) {
      return reply.status(400).send({ error: 'No file received.' })
    }

    const fields = file.fields as Record<string, { value: string } | Array<{ value: string }>>
    const projectIdField = fields.projectId
    const sectionIdField = fields.sectionId
    const projectId = Array.isArray(projectIdField) ? projectIdField[0]?.value : projectIdField?.value
    const sectionId = Array.isArray(sectionIdField) ? sectionIdField[0]?.value : sectionIdField?.value

    if (!projectId || !sectionId) {
      return reply.status(400).send({ error: 'Project ID and section ID are required.' })
    }

    const fileBuffer = await file.toBuffer()
    const image = await mediaService.uploadSectionImage({
      fileBuffer,
      mimeType: file.mimetype || 'application/octet-stream',
      filename: file.filename || 'upload',
      projectId,
      sectionId,
    })

    return reply.send(image)
  })

  app.post('/api/admin/upload-resume-profile-image', async (request, reply) => {
    const file = await request.file({
      limits: {
        files: 1,
        fileSize: 10 * 1024 * 1024,
      },
    })

    if (!file) {
      return reply.status(400).send({ error: 'No file received.' })
    }

    const fileBuffer = await file.toBuffer()
    const image = await mediaService.uploadResumeProfileImage({
      fileBuffer,
      mimeType: file.mimetype || 'application/octet-stream',
      filename: file.filename || 'portrait',
    })

    return reply.send(image)
  })

  app.post('/api/admin/upload-resume-ai-project-image', async (request, reply) => {
    const file = await request.file({
      limits: {
        files: 1,
        fileSize: 10 * 1024 * 1024,
      },
    })

    if (!file) {
      return reply.status(400).send({ error: 'No file received.' })
    }

    const fileBuffer = await file.toBuffer()
    const image = await mediaService.uploadResumeAiProjectImage({
      fileBuffer,
      mimeType: file.mimetype || 'application/octet-stream',
      filename: file.filename || 'cover-image',
    })

    return reply.send(image)
  })
}
