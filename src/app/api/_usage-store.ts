// Optional usage counter backed by Redis. If no Redis URL is configured, this becomes a no-op.
// Low-cost: counts per day per endpoint to track free-tier usage without DB writes.

type ServiceName = 'defi' | 'alerts'

let initialized = false
let getClient: (() => Promise<{ incrDayCount: (service: ServiceName, endpoint: string) => Promise<number> }>) | null = null

function getDateKeyUTC(): string {
  const now = new Date()
  const y = now.getUTCFullYear()
  const m = String(now.getUTCMonth() + 1).padStart(2, '0')
  const d = String(now.getUTCDate()).padStart(2, '0')
  return `${y}${m}${d}`
}

async function init(): Promise<void> {
  if (initialized) return
  initialized = true
  const redisUrl = process.env.USAGE_REDIS_URL || process.env.REDIS_URL
  if (!redisUrl) {
    // No-op client
    getClient = async () => ({ incrDayCount: async () => 0 })
    return
  }
  getClient = async () => {
    const Redis = (await import('ioredis')).default
    const redis = new Redis(redisUrl)
    return {
      incrDayCount: async (service: ServiceName, endpoint: string) => {
        const day = getDateKeyUTC()
        const key = `usage:${service}:${endpoint}:${day}`
        const count = await redis.incr(key)
        await redis.expire(key, 60 * 60 * 24 * 45) // keep ~45 days
        return typeof count === 'number' ? count : Number(count)
      },
    }
  }
}

export async function incrementUsageAndGetCount(service: ServiceName, endpoint: string): Promise<number | null> {
  try {
    await init()
    if (!getClient) return null
    const client = await getClient()
    const count = await client.incrDayCount(service, endpoint)
    return count
  } catch {
    // ignore errors to avoid impacting request path
    return null
  }
}

export async function incrementUsage(service: ServiceName, endpoint: string): Promise<void> {
  void incrementUsageAndGetCount(service, endpoint)
}
