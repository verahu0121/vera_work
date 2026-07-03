import { spawn } from 'node:child_process'
import fs from 'node:fs'
import net from 'node:net'
import path from 'node:path'

const root = process.cwd()
const logDir = path.join(root, '.data', 'logs')
const pollMs = 5_000

fs.mkdirSync(logDir, { recursive: true })

const services = [
  {
    name: 'frontend',
    port: 5173,
    command: 'npm',
    args: ['run', 'dev'],
  },
  {
    name: 'backend',
    port: 8001,
    command: 'npm',
    args: ['run', 'dev:server'],
  },
]

const children = new Map()

function log(message) {
  const line = `[${new Date().toISOString()}] ${message}\n`
  fs.appendFileSync(path.join(logDir, 'dev-keepalive.log'), line)
}

function isPortOpen(port) {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host: '127.0.0.1', port })

    socket.once('connect', () => {
      socket.destroy()
      resolve(true)
    })

    socket.once('error', () => {
      socket.destroy()
      resolve(false)
    })

    socket.setTimeout(1_000, () => {
      socket.destroy()
      resolve(false)
    })
  })
}

function startService(service) {
  if (children.has(service.name)) return

  const out = fs.openSync(path.join(logDir, `${service.name}.log`), 'a')
  const child = spawn(service.command, service.args, {
    cwd: root,
    env: process.env,
    stdio: ['ignore', out, out],
    detached: false,
  })

  children.set(service.name, child)
  log(`started ${service.name} pid=${child.pid} port=${service.port}`)

  child.once('exit', (code, signal) => {
    children.delete(service.name)
    log(`${service.name} exited code=${code ?? 'null'} signal=${signal ?? 'null'}`)
  })
}

async function tick() {
  for (const service of services) {
    const portOpen = await isPortOpen(service.port)
    if (!portOpen) {
      log(`${service.name} port ${service.port} is down; starting service`)
      startService(service)
    }
  }
}

process.on('SIGTERM', () => {
  log('received SIGTERM; stopping children')
  for (const child of children.values()) child.kill('SIGTERM')
  process.exit(0)
})

process.on('SIGINT', () => {
  log('received SIGINT; stopping children')
  for (const child of children.values()) child.kill('SIGINT')
  process.exit(0)
})

log(`watchdog started pid=${process.pid}`)
await tick()
setInterval(() => {
  void tick()
}, pollMs)
