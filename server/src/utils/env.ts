import path from 'node:path'
import dotenv from 'dotenv'
import { randomBytes } from 'node:crypto'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
const developmentSecret = randomBytes(32).toString('hex')

function parseForcePathStyle(value: string | undefined) {
  return value === 'true'
}

export function getServerEnv() {
  const production = process.env.NODE_ENV === 'production'
  if (production && (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32)) throw new Error('Production SESSION_SECRET must contain at least 32 characters.')
  return {
    production,
    appOrigin: process.env.APP_ORIGIN,
    trustedProxies: process.env.TRUST_PROXY?.split(',').map(value => value.trim()).filter(Boolean) ?? [],
    port: Number(process.env.PORT || 8001),
    databaseUrl: process.env.DATABASE_URL,
    sessionSecret: process.env.SESSION_SECRET || developmentSecret,
    s3Endpoint: process.env.S3_ENDPOINT,
    s3Bucket: process.env.S3_BUCKET,
    s3AccessKeyId: process.env.S3_ACCESS_KEY_ID,
    s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    s3Region: process.env.S3_REGION || 'us-east-1',
    s3ForcePathStyle: parseForcePathStyle(process.env.S3_FORCE_PATH_STYLE),
  }
}
