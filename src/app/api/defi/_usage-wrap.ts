import { NextRequest, NextResponse } from 'next/server'
import { recordApiUsage } from '@/app/api/_usage'

export function wrapWithUsage(
  handler: (req: NextRequest) => Promise<NextResponse>,
  params: { service: 'defi'; endpoint: string; method?: 'GET' | 'POST' },
): (req: NextRequest) => Promise<NextResponse> {
  return async (req: NextRequest) => {
    const start = Date.now()
    try {
      const res = await handler(req)
      recordApiUsage({ service: 'defi', endpoint: params.endpoint, method: params.method ?? 'GET', status: res.status, durationMs: Date.now() - start, request: req })
      return res
    } catch (e) {
      const res = NextResponse.json({ success: false, error: 'Proxy error', details: e instanceof Error ? e.message : String(e) }, { status: 500 })
      recordApiUsage({ service: 'defi', endpoint: params.endpoint, method: params.method ?? 'GET', status: 500, durationMs: Date.now() - start, request: req })
      return res
    }
  }
}


