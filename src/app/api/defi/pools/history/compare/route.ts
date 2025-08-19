import { NextRequest, NextResponse } from 'next/server'
import { getRedis } from '@/lib/redis/client'
import { performanceMonitor } from '@/lib/monitoring/performance-monitor'

type SnapshotPoint = { t: number; tvlUsd?: number; apy?: number }

function k(id: string) { return `defi:pools:hist:${id}` }

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id') || ''
  const tolApy = Number(searchParams.get('tolerance_apy') || process.env.SNAPSHOT_TOL_APY_PCT || '5')
  const tolTvl = Number(searchParams.get('tolerance_tvl') || process.env.SNAPSHOT_TOL_TVL_PCT || '5')
  if (!id) return NextResponse.json({ success: false, error: 'id is required' }, { status: 400 })
  const redis = await getRedis()
  if (!redis) return NextResponse.json({ success: false, error: 'redis not configured' }, { status: 501 })
  const raw = await redis.lrange(k(id), 0, 1)
  const [latestRaw, prevRaw] = raw
  const latest = latestRaw ? safeParse(latestRaw) : null
  const prev = prevRaw ? safeParse(prevRaw) : null
  const diff = computeDiff(prev, latest)
  const withinTolerance = checkTolerance(diff, tolApy, tolTvl)
  void performanceMonitor.track('defi.snapshot.compare', {
    endpoint: 'defi.snapshot.compare',
    method: 'GET',
    responseTime: 1,
    statusCode: withinTolerance ? 200 : 500,
    id,
  })
  return NextResponse.json({ success: true, data: { latest, prev, diff, withinTolerance, tolApy, tolTvl } })
}

function safeParse(s: string): SnapshotPoint | null { try { return JSON.parse(s) as SnapshotPoint } catch { return null } }

function computeDiff(a: SnapshotPoint | null, b: SnapshotPoint | null) {
  const tvlA = a?.tvlUsd ?? null
  const tvlB = b?.tvlUsd ?? null
  const apyA = a?.apy ?? null
  const apyB = b?.apy ?? null
  return {
    tvlDelta: (tvlA !== null && tvlB !== null) ? (tvlB - tvlA) : null,
    tvlDeltaPct: (tvlA !== null && tvlB !== null && tvlA !== 0) ? ((tvlB - tvlA) / tvlA) * 100 : null,
    apyDelta: (apyA !== null && apyB !== null) ? (apyB - apyA) : null,
    apyDeltaPct: (apyA !== null && apyB !== null && apyA !== 0) ? ((apyB - apyA) / apyA) * 100 : null,
  }
}

function checkTolerance(diff: { tvlDeltaPct: number | null; apyDeltaPct: number | null }, tolApy: number, tolTvl: number) {
  const ta = Math.max(0, tolApy)
  const tt = Math.max(0, tolTvl)
  const tvlOk = diff.tvlDeltaPct === null || Math.abs(diff.tvlDeltaPct) <= tt
  const apyOk = diff.apyDeltaPct === null || Math.abs(diff.apyDeltaPct) <= ta
  return tvlOk && apyOk
}
