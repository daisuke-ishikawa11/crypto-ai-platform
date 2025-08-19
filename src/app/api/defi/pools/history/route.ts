import { NextRequest, NextResponse } from 'next/server'
import { getRedis } from '@/lib/redis/client'
import { incCounter, startTimer } from '@/lib/monitoring/metrics'

type SnapshotPoint = { t: number; tvlUsd?: number; apy?: number }

function keyForPool(id: string): string { return `defi:pools:hist:${id}` }

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id') || undefined
  const days = Number(searchParams.get('days') || '90')
  const endTimer = startTimer('defi_api_request_duration_seconds', { endpoint: 'pools_history' })
  if (!id) {
    incCounter('defi_api_errors_total', { endpoint: 'pools_history', reason: 'bad_request', status: '400' })
    endTimer()
    return NextResponse.json({ success: false, error: 'id is required' }, { status: 400 })
  }
  try {
    const redis = await getRedis()
    if (!redis) {
      endTimer()
      return NextResponse.json({ data: [], meta: { count: 0, source: 'redis:disabled' } }, { headers: { 'Cache-Control': 'public, s-maxage=5' } })
    }
    const raw = await redis.lrange(keyForPool(id), 0, -1)
    const nowSec = Math.floor(Date.now() / 1000)
    const cutoff = nowSec - Math.max(1, days) * 86400
    const parsed: SnapshotPoint[] = raw.map(s => {
      try { return JSON.parse(s) as SnapshotPoint } catch { return { t: 0 } }
    }).filter(p => p.t >= cutoff)
    endTimer()
    return NextResponse.json({ data: parsed, meta: { count: parsed.length, source: 'redis' } }, { headers: { 'Cache-Control': 'public, s-maxage=10' } })
  } catch (_e) {
    incCounter('defi_api_errors_total', { endpoint: 'pools_history', reason: 'exception' })
    endTimer()
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 })
  }
}
