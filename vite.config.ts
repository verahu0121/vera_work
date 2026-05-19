import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import Busboy from 'busboy'
import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

function sanitizePathSegment(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'item'
}

function buildObjectKey(projectId: string, sectionId: string, filename: string) {
  const timestamp = Date.now()
  const extension = path.extname(filename || '').toLowerCase()
  const baseName = path.basename(filename || 'upload', extension)
  const safeName = sanitizePathSegment(baseName)
  return `projects/${sanitizePathSegment(projectId)}/${sanitizePathSegment(sectionId)}/${timestamp}-${safeName}${extension || '.jpg'}`
}

function encodeObjectKey(key: string) {
  return key
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')
}

function parseForcePathStyle(value: string | undefined) {
  return value === 'true'
}

function buildProxyImageUrl(key: string) {
  return `/api/admin/object-image?key=${encodeURIComponent(key)}`
}

function adminUploadApi(mode: string) {
  const env = loadEnv(mode, process.cwd(), '')
  const endpoint = env.S3_ENDPOINT
  const bucket = env.S3_BUCKET
  const accessKeyId = env.S3_ACCESS_KEY_ID
  const secretAccessKey = env.S3_SECRET_ACCESS_KEY
  const region = env.S3_REGION || 'us-east-1'
  const forcePathStyle = parseForcePathStyle(env.S3_FORCE_PATH_STYLE)

  const isConfigured = Boolean(endpoint && bucket && accessKeyId && secretAccessKey)

  return {
    name: 'admin-upload-api',
    configureServer(server) {
      server.middlewares.use('/api/admin/object-image', async (req, res, next) => {
        if (req.method !== 'GET') {
          return next()
        }

        if (!isConfigured) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Object storage is not configured.' }))
          return
        }

        try {
          const requestUrl = new URL(req.url || '', 'http://127.0.0.1')
          const key = requestUrl.searchParams.get('key')

          if (!key) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Image key is required.' }))
            return
          }

          const client = new S3Client({
            region,
            endpoint,
            forcePathStyle,
            credentials: {
              accessKeyId,
              secretAccessKey,
            },
          })

          const signedUrl = await getSignedUrl(
            client,
            new GetObjectCommand({
              Bucket: bucket,
              Key: key,
            }),
            { expiresIn: 60 * 60 },
          )

          res.statusCode = 302
          res.setHeader('Cache-Control', 'no-store')
          res.setHeader('Location', signedUrl)
          res.end()
        } catch (error) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              error: error instanceof Error ? error.message : 'Signed URL generation failed.',
            }),
          )
        }
      })

      server.middlewares.use('/api/admin/upload-image', async (req, res, next) => {
        if (req.method !== 'POST') {
          return next()
        }

        if (!isConfigured) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Object storage is not configured.' }))
          return
        }

        try {
          const result = await new Promise<{
            fileBuffer: Buffer
            mimeType: string
            filename: string
            projectId: string
            sectionId: string
          }>((resolve, reject) => {
            const fields: Record<string, string> = {}
            const fileChunks: Buffer[] = []
            let filename = ''
            let mimeType = ''
            let fileReceived = false

            const busboy = Busboy({
              headers: req.headers,
              limits: {
                files: 1,
                fileSize: 10 * 1024 * 1024,
              },
            })

            busboy.on('field', (name, value) => {
              fields[name] = value
            })

            busboy.on('file', (_fieldName, file, info) => {
              fileReceived = true
              filename = info.filename || 'upload'
              mimeType = info.mimeType || 'application/octet-stream'

              file.on('data', (chunk) => {
                fileChunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
              })

              file.on('limit', () => {
                reject(new Error('Image must be 10MB or smaller.'))
              })
            })

            busboy.on('error', reject)

            busboy.on('finish', () => {
              if (!fileReceived) {
                reject(new Error('No file received.'))
                return
              }

              if (!fields.projectId || !fields.sectionId) {
                reject(new Error('Project ID and section ID are required.'))
                return
              }

              resolve({
                fileBuffer: Buffer.concat(fileChunks),
                mimeType,
                filename,
                projectId: fields.projectId,
                sectionId: fields.sectionId,
              })
            })

            req.pipe(busboy)
          })

          const objectKey = buildObjectKey(result.projectId, result.sectionId, result.filename)
          const client = new S3Client({
            region,
            endpoint,
            forcePathStyle,
            credentials: {
              accessKeyId,
              secretAccessKey,
            },
          })

          await client.send(
            new PutObjectCommand({
              Bucket: bucket,
              Key: objectKey,
              Body: result.fileBuffer,
              ContentType: result.mimeType,
            }),
          )
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              id: `img-${Date.now()}`,
              key: objectKey,
              src: buildProxyImageUrl(objectKey),
              alt: '',
            }),
          )
        } catch (error) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              error: error instanceof Error ? error.message : 'Upload failed.',
            }),
          )
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [
    figmaAssetResolver(),
    adminUploadApi(mode),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
}))
