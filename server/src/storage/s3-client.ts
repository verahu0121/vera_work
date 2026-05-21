import { S3Client } from '@aws-sdk/client-s3'
import { getServerEnv } from '../utils/env'

export function createS3Client() {
  const env = getServerEnv()

  if (!env.s3Endpoint || !env.s3Bucket || !env.s3AccessKeyId || !env.s3SecretAccessKey) {
    throw new Error('Object storage is not configured.')
  }

  return new S3Client({
    region: env.s3Region,
    endpoint: env.s3Endpoint,
    forcePathStyle: env.s3ForcePathStyle,
    credentials: {
      accessKeyId: env.s3AccessKeyId,
      secretAccessKey: env.s3SecretAccessKey,
    },
  })
}

export function getS3Bucket() {
  const env = getServerEnv()

  if (!env.s3Bucket) {
    throw new Error('Object storage bucket is not configured.')
  }

  return env.s3Bucket
}
