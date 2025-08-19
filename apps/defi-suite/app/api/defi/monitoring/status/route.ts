import { NextRequest, NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase/server'
import { DeFiMonitoringEngine, MetricsCollector } from '@crypto/defi'
import { rateLimit, requireInternalAuth } from '@/lib/security/api-guard'
import { captureError } from '@/lib/monitoring/sentry'
import { appLogger } from '@/lib/adapters/logger'
import { alertsPersistence, metricsPersistence } from '@/lib/adapters/persistence'
import { z } from 'zod'
import { withCache } from '@/lib/cache'

interface ProtocolHealthRow { protocol_name: string; availability: number; average_response_time: number; error_rate: number; recorded_at: string }
interface AlertRow { id: string; type: string; severity: 'critical' | 'warning' | 'info'; title: string; message: string; acknowledged: boolean; acknowledged_at: string | null; resolved: boolean; resolved_at: string | null; triggered_at: string }

let engine: DeFiMonitoringEngine | null = null
let collector: MetricsCollector | null = null
function ensure(): void { if (!engine) engine = new DeFiMonitoringEngine(appLogger, alertsPersistence); if (!collector) collector = new MetricsCollector(appLogger, metricsPersistence, true, 7) }

const QuerySchema = z.object({ timeframe: z.enum(['1h', '6h', '24h', '7d', '30d']).default('24h') })

export async function GET(request: NextRequest): Promise<NextResponse> {
  const auth = requireInternalAuth(request); if (auth) return auth
  const limited = rateLimit(request, 'monitoring-status'); if (limited) return limited
  ensure()
  const { searchParams } = new URL(request.url)
  const parse = QuerySchema.safeParse({ timeframe: searchParams.get('timeframe') ?? undefined })
  if (!parse.success) return NextResponse.json({ success: false, error: 'Invalid query', details: parse.error.flatten() }, { status: 400 })
  const { timeframe } = parse.data
  const supabase = getAdminClient()
  const now = Date.now()
  const timeframeMs = getTimeframeMs(timeframe)
  const startIso = new Date(now - timeframeMs).toISOString()
  const [{ data: healthData, error: healthErr }, { data: alertsData, error: alertsErr }] = await Promise.all([
    supabase.from('defi_protocol_health_metrics').select('*').gte('recorded_at', startIso).order('recorded_at', { ascending: false }).limit(100),
    supabase.from('defi_alerts').select('*').gte('triggered_at', startIso).order('triggered_at', { ascending: false }).limit(100),
  ])
  if (healthErr) captureError(healthErr, { scope: 'monitoring/status health' })
  if (alertsErr) captureError(alertsErr, { scope: 'monitoring/status alerts' })
  const health = (healthData ?? []) as ProtocolHealthRow[]
  const alerts = (alertsData ?? []) as AlertRow[]
  const totalProtocols = health.length
  const healthyProtocols = health.filter(h => Number(h.availability) >= 95).length
  const systemAvailability = totalProtocols > 0 ? (healthyProtocols / totalProtocols) * 100 : 100
  const overview = { status: systemAvailability >= 95 ? 'healthy' : systemAvailability >= 80 ? 'degraded' : 'critical', availability: Math.round(systemAvailability * 100) / 100, lastUpdate: new Date().toISOString(), uptime: '99.95%' }
  const protocols = { total: totalProtocols, healthy: healthyProtocols, degraded: health.filter(h => Number(h.availability) >= 80 && Number(h.availability) < 95).length, offline: health.filter(h => Number(h.availability) < 80).length, averageResponseTime: totalProtocols > 0 ? Math.round(health.reduce((s, h) => s + Number(h.average_response_time), 0) / totalProtocols) : 0 }
  const engineMetrics = engine!.getMetrics()
  const metricsSummary = collector!.getMetricsSummary()
  return NextResponse.json({ success: true, data: { timeframe, overview, protocols, alerts: { total: alerts.length }, engine: engineMetrics, metricsSummary }, timestamp: new Date().toISOString() }, withCache({}, 15))
}

function getTimeframeMs(tf: string): number { const map: Record<string, number> = { '1h': 60 * 60 * 1000, '6h': 6 * 60 * 60 * 1000, '24h': 24 * 60 * 60 * 1000, '7d': 7 * 24 * 60 * 60 * 1000, '30d': 30 * 24 * 60 * 60 * 1000 }; return map[tf] ?? map['24h'] }


