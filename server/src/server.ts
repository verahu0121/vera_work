import { createApp } from './app'
import { getServerEnv } from './utils/env'

async function start() {
  const env = getServerEnv()
  const app = await createApp()

  try {
    await app.listen({
      host: '127.0.0.1',
      port: env.port,
    })
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

start()
