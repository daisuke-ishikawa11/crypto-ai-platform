import { NextResponse, NextRequest } from 'next/server'
import { DeFiMonitoringEngine, MetricsCollector } from '@crypto/defi'
import { appLogger } from '@/lib/adapters/logger'
import { alertsPersistence, metricsPersistence } from '@/lib/adapters/persistence'
import { rateLimit, requireInternalAuth } from '@/lib/security/api-guard'
import { withCache } from '@/lib/cache'

// シンプルなシングルトン
let engine: DeFiMonitoringEngine | null = null
let collector: MetricsCollector | null = null

function ensureEngine() {
  if (!engine) engine = new DeFiMonitoringEngine(appLogger, alertsPersistence)
  if (!collector) collector = new MetricsCollector(appLogger, metricsPersistence, true, 7)
}

export const GET = async (request: NextRequest) => {
  const auth = requireInternalAuth(request)
  if (auth) return auth
  const limited = rateLimit(request, 'engine-status')
  if (limited) return limited
  ensureEngine()
  return NextResponse.json(
    { success: true, engine: engine!.getMetrics(), metricsSummary: collector!.getMetricsSummary() },
    withCache({}, 15),
  )
}

export const POST = async (request: NextRequest) => {
  const auth = requireInternalAuth(request)
  if (auth) return auth
  const limited = rateLimit(request, 'engine-start')
  if (limited) return limited
  ensureEngine()
  await engine!.start()
  return NextResponse.json({ success: true, started: true })
}


