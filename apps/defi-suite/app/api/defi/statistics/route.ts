import { NextRequest, NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase/server'
import { rateLimit, requireInternalAuth } from '@/lib/security/api-guard'
import { z } from 'zod'
import { withCache } from '@/lib/cache'

interface BusinessMetricRow { total_tvl: number; total_volume_24h: number; protocols_monitored: number; alerts_generated: number; users_active: number; data_quality_score: number; recorded_at: string }

const QuerySchema = z.object({ timeframe: z.enum(['1h', '6h', '24h', '7d', '30d']).default('24h') })

export async function GET(request: NextRequest): Promise<NextResponse> {
  const auth = requireInternalAuth(request); if (auth) return auth
  const limited = rateLimit(request, 'statistics'); if (limited) return limited
  const supabase = getAdminClient()
  const { searchParams } = new URL(request.url)
  const parse = QuerySchema.safeParse({ timeframe: searchParams.get('timeframe') ?? undefined })
  if (!parse.success) return NextResponse.json({ success: false, error: 'Invalid query', details: parse.error.flatten() }, { status: 400 })
  const { timeframe } = parse.data
  const now = Date.now()
  const timeframeMs = getTimeframeMs(timeframe)
  const startIso = new Date(now - timeframeMs).toISOString()
  const { data, error } = await supabase.from('defi_business_metrics').select('*').gte('recorded_at', startIso).order('recorded_at', { ascending: false }).limit(200)
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  const metrics = (data ?? []) as BusinessMetricRow[]
  const latest = metrics[0]
  const oldest = metrics[metrics.length - 1]
  const totals = latest ? { totalTVL: Number(latest.total_tvl), totalVolume24h: Number(latest.total_volume_24h), protocolsMonitored: Number(latest.protocols_monitored), alertsGenerated: Number(latest.alerts_generated), usersActive: Number(latest.users_active), dataQualityScore: Number(latest.data_quality_score) } : { totalTVL: 0, totalVolume24h: 0, protocolsMonitored: 0, alertsGenerated: 0, usersActive: 0, dataQualityScore: 0 }
  const changes = latest && oldest ? { tvlChange: Number(oldest.total_tvl) > 0 ? ((Number(latest.total_tvl) - Number(oldest.total_tvl)) / Number(oldest.total_tvl)) * 100 : 0, volumeChange: Number(oldest.total_volume_24h) > 0 ? ((Number(latest.total_volume_24h) - Number(oldest.total_volume_24h)) / Number(oldest.total_volume_24h)) * 100 : 0 } : { tvlChange: 0, volumeChange: 0 }
  const timeline = metrics.slice().reverse().map(m => ({ timestamp: m.recorded_at, tvl: Number(m.total_tvl), volume24h: Number(m.total_volume_24h), protocolsMonitored: Number(m.protocols_monitored), dataQualityScore: Number(m.data_quality_score) }))
  return NextResponse.json({ success: true, data: { timeframe, totals, changes, timeline }, timestamp: new Date().toISOString() }, withCache({}, 60))
}

function getTimeframeMs(tf: string): number { const map: Record<string, number> = { '1h': 60 * 60 * 1000, '6h': 6 * 60 * 60 * 1000, '24h': 24 * 60 * 60 * 1000, '7d': 7 * 24 * 60 * 60 * 1000, '30d': 30 * 24 * 60 * 60 * 1000 }; return map[tf] ?? map['24h'] }


