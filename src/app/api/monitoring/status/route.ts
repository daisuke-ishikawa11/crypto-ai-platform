import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      service: 'crypto-ai-platform',
      time: new Date().toISOString(),
      checks: {
        search: '/api/defi/pools/search',
        ai: '/api/ai/defi/search',
        metrics: '/api/monitoring/metrics',
      }
    })
  } catch (e) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
