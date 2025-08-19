import { NextRequest, NextResponse } from 'next/server'
import { getRedis } from '@/lib/redis/client'

export const dynamic = 'force-dynamic'

type SnapshotPoint = { t: number; tvlUsd?: number; apy?: number }

function k(id: string) { return `defi:pools:hist:${id}` }

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null) as { id?: string; tvlUsd?: number; apy?: number; keep?: number } | null
    if (!body || !body.id) return NextResponse.json({ success: false, error: 'id required' }, { status: 400 })
    const keep = Math.max(2, Math.min(200, Number(body.keep || 50)))
    const redis = await getRedis()
    if (!redis) return NextResponse.json({ success: false, error: 'redis not configured' }, { status: 501 })
    const point: SnapshotPoint = { t: Date.now(), tvlUsd: Number(body.tvlUsd ?? 0), apy: Number(body.apy ?? 0) }
    await redis.lpush(k(body.id), JSON.stringify(point))
    await redis.ltrim(k(body.id), 0, keep - 1)
    return NextResponse.json({ success: true, data: { kept: keep } })
  } catch (e) {
    return NextResponse.json({ success: false, error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
}

// Cron トリガ用の簡易GET。?id=POOL_ID&tvl=X&apy=Y&keep=50 などで定期投入可能
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id') || ''
  if (!id) return NextResponse.json({ success: false, error: 'id required' }, { status: 400 })
  const tvlUsd = Number(searchParams.get('tvl') || '0')
  const apy = Number(searchParams.get('apy') || '0')
  const keep = Number(searchParams.get('keep') || '50')
  const redis = await getRedis()
  if (!redis) return NextResponse.json({ success: false, error: 'redis not configured' }, { status: 501 })
  const point: SnapshotPoint = { t: Date.now(), tvlUsd, apy }
  await redis.lpush(k(id), JSON.stringify(point))
  await redis.ltrim(k(id), 0, Math.max(2, Math.min(200, keep)) - 1)
  return NextResponse.json({ success: true, data: { kept: Math.max(2, Math.min(200, keep)), id, tvlUsd, apy } })
}
