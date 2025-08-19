import { NextRequest, NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase/server'
import { rateLimit, requireInternalAuth } from '@/lib/security/api-guard'
import { z } from 'zod'
import { withCache } from '@/lib/cache'

interface TvlRow { protocol_id: string; tvl_usd: number; recorded_at: string }
const QuerySchema = z.object({ timeframe: z.enum(['1h', '6h', '24h', '7d', '30d']).default('24h') })

export async function GET(request: NextRequest): Promise<NextResponse> {
  const auth = requireInternalAuth(request); if (auth) return auth
  const limited = rateLimit(request, 'tvl-overview'); if (limited) return limited
  const supabase = getAdminClient()
  const { searchParams } = new URL(request.url)
  const parse = QuerySchema.safeParse({ timeframe: searchParams.get('timeframe') ?? undefined })
  if (!parse.success) return NextResponse.json({ success: false, error: 'Invalid query', details: parse.error.flatten() }, { status: 400 })
  const { timeframe } = parse.data
  const now = Date.now()
  const startIso = new Date(now - getTimeframeMs(timeframe)).toISOString()
  const { data, error } = await supabase.from('defi_tvl_history').select('protocol_id, tvl_usd, recorded_at').gte('recorded_at', startIso).order('recorded_at', { ascending: false }).limit(1000)
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  const rows = (data ?? []) as TvlRow[]
  const latestByProtocol = new Map<string, number>()
  const timelineBuckets = new Map<string, number>()
  for (const row of rows) {
    if (!latestByProtocol.has(row.protocol_id)) latestByProtocol.set(row.protocol_id, Number(row.tvl_usd))
    const day = row.recorded_at.slice(0, 10)
    timelineBuckets.set(day, (timelineBuckets.get(day) ?? 0) + Number(row.tvl_usd))
  }
  const totalTVL = Array.from(latestByProtocol.values()).reduce((s, v) => s + v, 0)
  const protocolCount = latestByProtocol.size
  const timeline = Array.from(timelineBuckets.entries()).sort((a, b) => a[0].localeCompare(b[0])).map(([date, tvl]) => ({ date, tvl }))
  return NextResponse.json({ success: true, data: { timeframe, totalTVL, protocolCount, timeline }, timestamp: new Date().toISOString() }, withCache({}, 60))
}

function getTimeframeMs(tf: string): number { const map: Record<string, number> = { '1h': 60 * 60 * 1000, '6h': 6 * 60 * 60 * 1000, '24h': 24 * 60 * 60 * 1000, '7d': 7 * 24 * 60 * 60 * 1000, '30d': 30 * 24 * 60 * 60 * 1000 }; return map[tf] ?? map['24h'] }


