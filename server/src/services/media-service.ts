import path from 'node:path'
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { createS3Client, getS3Bucket } from '../storage/s3-client'

function sanitizePathSegment(value: string) {
  return (
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-_]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'item'
  )
}

function buildObjectKey(projectId: string, sectionId: string, filename: string) {
  const timestamp = Date.now()
  const extension = path.extname(filename || '').toLowerCase()
  const baseName = path.basename(filename || 'upload', extension)
  const safeName = sanitizePathSegment(baseName)
  return `projects/${sanitizePathSegment(projectId)}/${sanitizePathSegment(sectionId)}/${timestamp}-${safeName}${extension || '.jpg'}`
}

function buildResumeProfileObjectKey(filename: string) {
  const timestamp = Date.now()
  const extension = path.extname(filename || '').toLowerCase()
  const baseName = path.basename(filename || 'portrait', extension)
  const safeName = sanitizePathSegment(baseName)
  return `resume/profile/${timestamp}-${safeName}${extension || '.jpg'}`
}

function buildProxyImageUrl(key: string) {
  return `/api/admin/object-image?key=${encodeURIComponent(key)}`
}

export class MediaService {
  async getImageObject(key: string) {
    const client = createS3Client()
    const bucket = getS3Bucket()

    const response = await client.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    )

    return {
      body: response.Body,
      contentType: response.ContentType,
      contentLength: response.ContentLength,
      etag: response.ETag,
      lastModified: response.LastModified,
      cacheControl: response.CacheControl,
    }
  }

  async uploadSectionImage(input: {
    fileBuffer: Buffer
    mimeType: string
    filename: string
    projectId: string
    sectionId: string
  }) {
    const client = createS3Client()
    const bucket = getS3Bucket()
    const objectKey = buildObjectKey(input.projectId, input.sectionId, input.filename)

    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: objectKey,
        Body: input.fileBuffer,
        ContentType: input.mimeType,
      }),
    )

    return {
      id: `img-${Date.now()}`,
      key: objectKey,
      src: buildProxyImageUrl(objectKey),
      alt: '',
    }
  }

  async uploadResumeProfileImage(input: {
    fileBuffer: Buffer
    mimeType: string
    filename: string
  }) {
    const client = createS3Client()
    const bucket = getS3Bucket()
    const objectKey = buildResumeProfileObjectKey(input.filename)

    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: objectKey,
        Body: input.fileBuffer,
        ContentType: input.mimeType,
      }),
    )

    return {
      key: objectKey,
      src: buildProxyImageUrl(objectKey),
    }
  }
}
