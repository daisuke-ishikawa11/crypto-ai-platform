import { NextRequest, NextResponse } from 'next/server'
import { getRedis } from '@/lib/redis/client'
import { computeRiskScoreSummary } from '@/lib/defi/risk-scoring'

export const dynamic = 'force-dynamic'

function tkey(userId: string) { return `risk:tickets:${userId}` }

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({})) as Partial<{ userId: string; q?: string; token?: string; network?: string; includeDexes?: string; includeUniswap?: boolean; limit?: number }>
    const userId = String(body.userId || '').trim()
    if (!userId) return NextResponse.json({ success: false, error: 'userId required' }, { status: 400 })

    const redis = await getRedis()
    if (!redis) return NextResponse.json({ success: false, error: 'tickets store not configured' }, { status: 501 })

    // consume 1 ticket (non-negative)
    const curStr = await redis.get(tkey(userId))
    const cur = curStr ? Number(curStr) : 0
    if (cur <= 0) return NextResponse.json({ success: false, error: 'Insufficient tickets' }, { status: 402 })
    await redis.incrby(tkey(userId), -1)

    // proxy to pools/search (risk summary付与)
    const url = new URL(req.url)
    const origin = url.origin
    const sp = new URLSearchParams()
    if (typeof body.q === 'string') sp.set('q', body.q)
    if (typeof body.token === 'string') sp.set('token', body.token)
    if (typeof body.network === 'string') sp.set('network', body.network!)
    if (typeof body.includeDexes === 'string') sp.set('includeDexes', body.includeDexes!)
    if (typeof body.includeUniswap === 'boolean') sp.set('includeUniswap', String(body.includeUniswap))
    sp.set('includeRisk', 'summary')
    sp.set('limit', String(Math.max(1, Math.min(50, Number(body.limit || 20)))))

    const r = await fetch(`${origin}/api/defi/pools/search?${sp.toString()}`, { cache: 'no-store' })
    const j = await r.json().catch(() => ({}))
    if (!r.ok) return NextResponse.json({ success: false, error: 'downstream error', details: j }, { status: 502 })
    return NextResponse.json(j)
  } catch (e) {
    return NextResponse.json({ success: false, error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
}
