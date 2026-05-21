import path from 'node:path'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

function parseForcePathStyle(value: string | undefined) {
  return value === 'true'
}

export function getServerEnv() {
  return {
    port: Number(process.env.PORT || 8001),
    databaseUrl: process.env.DATABASE_URL,
    sessionSecret: process.env.SESSION_SECRET || 'vera-work-dev-session-secret',
    s3Endpoint: process.env.S3_ENDPOINT,
    s3Bucket: process.env.S3_BUCKET,
    s3AccessKeyId: process.env.S3_ACCESS_KEY_ID,
    s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    s3Region: process.env.S3_REGION || 'us-east-1',
    s3ForcePathStyle: parseForcePathStyle(process.env.S3_FORCE_PATH_STYLE),
  }
}
