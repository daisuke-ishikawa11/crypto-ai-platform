import { NextRequest } from 'next/server'
import * as redisClient from '@/lib/redis/client'

// Mock Redis client
const list: string[] = []
jest.spyOn(redisClient, 'getRedis').mockResolvedValue({
  lrange: async (_k: string, _s: number, _e: number) => list,
  rpush: async (_k: string, v: string) => { list.push(v) },
  ltrim: async () => {},
} as unknown as any)

describe('ai-stats routes', () => {
  beforeEach(() => { list.length = 0 })

  test('aggregates 24h stats success/failure', async () => {
    const now = Date.now()
    // success
    list.push(JSON.stringify({ t: now - 1000, outcome: 'success', adj: 1, sev: 'high' }))
    // failure
    list.push(JSON.stringify({ t: now - 2000, outcome: 'failure', rsn: 'rate_limited' }))

    const mod = await import('@/app/api/defi/risk/ai-stats/route')
    const res = await mod.GET({} as NextRequest)
    const j = await res.json()
    expect(j.success).toBe(true)
    expect(j.data.total).toBeGreaterThanOrEqual(2)
    expect(j.data.success).toBeGreaterThanOrEqual(1)
    expect(j.data.failuresByReason.rate_limited).toBeGreaterThanOrEqual(1)
  })

  test('timeseries buckets successRate', async () => {
    const now = Date.now()
    list.push(JSON.stringify({ t: now - 60_000, outcome: 'success', adj: 0, sev: 'low' }))
    list.push(JSON.stringify({ t: now - 60_000, outcome: 'failure', rsn: 'bad_request' }))

    const mod = await import('@/app/api/defi/risk/ai-stats/timeseries/route')
    const req = { url: 'http://test/ai?windowSec=600&bucketSec=300' } as unknown as NextRequest
    const res = await mod.GET(req)
    const j = await res.json()
    expect(j.success).toBe(true)
    expect(Array.isArray(j.data.successRate)).toBe(true)
    expect(j.data.successRate.length).toBeGreaterThan(0)
  })
})
