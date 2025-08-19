import type { NextRequest } from 'next/server'
import { incrementUsage, incrementUsageAndGetCount } from '@/app/api/_usage-store'

type ServiceName = 'defi' | 'alerts'

function getClientIp(request: NextRequest): string {
  const fwd = request.headers.get('x-forwarded-for')
  if (fwd && fwd.length > 0) return fwd.split(',')[0].trim()
  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp
  return '127.0.0.1'
}

function parsePositiveInt(value: string | undefined): number | null {
  if (!value) return null
  const n = Number(value)
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : null
}

function getThreshold(service: ServiceName): number | null {
  const def = parsePositiveInt(process.env.USAGE_THRESHOLD_DEFAULT)
  if (service === 'defi') return parsePositiveInt(process.env.USAGE_THRESHOLD_DEFI) ?? def
  if (service === 'alerts') return parsePositiveInt(process.env.USAGE_THRESHOLD_ALERTS) ?? def
  return def
}

export function recordApiUsage(params: {
  service: ServiceName
  endpoint: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  status: number
  durationMs: number
  request: NextRequest
}): void {
  const { service, endpoint, method, status, durationMs, request } = params
  const ip = getClientIp(request)
  const nowIso = new Date().toISOString()
  const logEntry = {
    ts: nowIso,
    kind: 'api_usage',
    service,
    endpoint,
    method,
    status,
    duration_ms: durationMs,
    ip,
  }
  // 構造化ログ（低コストのため標準出力に出す。外部集約は環境に依存）
  console.log(JSON.stringify(logEntry))

  // 軽量な日次カウンタとしきい値検知（非同期・失敗は無視）
  const threshold = getThreshold(service)
  if (threshold == null) {
    void incrementUsage(service, endpoint)
    return
  }
  void (async () => {
    const count = await incrementUsageAndGetCount(service, endpoint)
    if (count !== null && count >= threshold) {
      const warnEntry = {
        ts: new Date().toISOString(),
        kind: 'api_usage_threshold',
        service,
        endpoint,
        threshold,
        count,
      }
      console.warn(JSON.stringify(warnEntry))
    }
  })()
}


