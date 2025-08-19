import 'server-only'
import { Queue } from 'bullmq'
import type { RedisOptions } from 'ioredis'
import { config } from '@/lib/config'

export interface SendJobData {
  id: string
}

export function parseRedisUrl(urlString: string): RedisOptions {
  const u = new URL(urlString)
  const isTls = u.protocol === 'rediss:'
  const dbPath = u.pathname?.replace(/^\//, '') ?? ''
  const db = dbPath ? Number(dbPath) : undefined
  return {
    host: u.hostname,
    port: u.port ? Number(u.port) : undefined,
    username: u.username || undefined,
    password: u.password || undefined,
    db,
    tls: isTls ? {} : undefined,
  }
}

export function createSendQueue(): Queue<SendJobData> | null {
  if (!config.redisUrl) return null
  const connection: RedisOptions = parseRedisUrl(config.redisUrl)
  return new Queue<SendJobData>('alerts-send-email', { connection })
}
