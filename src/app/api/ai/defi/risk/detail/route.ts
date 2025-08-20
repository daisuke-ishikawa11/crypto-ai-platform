import { NextRequest, NextResponse } from 'next/server'
import { getRedis } from '@/lib/redis/client'
import { computeRiskScoreFull } from '@/lib/defi/risk-scoring'

export const dynamic = 'force-dynamic'

function tkey(userId: string) { return `risk:tickets:${userId}` }

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({})) as Partial<{ userId: string; protocol?: string; network?: string; tvl?: number; apy?: number; volume24h?: number; graphSourceUrl?: string; feeTier?: number }>
    const userId = String(body.userId || '').trim()
    if (!userId) return NextResponse.json({ success: false, error: 'userId required' }, { status: 400 })

    const redis = await getRedis()
    if (!redis) return NextResponse.json({ success: false, error: 'tickets store not configured' }, { status: 501 })

    // consume 1 ticket (detail)
    const curStr = await redis.get(tkey(userId))
    const cur = curStr ? Number(curStr) : 0
    if (cur <= 0) return NextResponse.json({ success: false, error: 'Insufficient tickets' }, { status: 402 })
    await redis.incrby(tkey(userId), -1)

    const full = computeRiskScoreFull({
      protocol: body.protocol,
      network: body.network,
      tvl: typeof body.tvl === 'number' ? body.tvl : undefined,
      apy: typeof body.apy === 'number' ? body.apy : undefined,
      volume24h: typeof body.volume24h === 'number' ? body.volume24h : undefined,
      graphSourceUrl: typeof body.graphSourceUrl === 'string' ? body.graphSourceUrl : undefined,
      feeTier: typeof body.feeTier === 'number' ? body.feeTier : undefined,
    })
    return NextResponse.json({ success: true, data: full })
  } catch (e) {
    return NextResponse.json({ success: false, error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
}


