import { NextRequest, NextResponse } from 'next/server'
import { fetchJsonWithRetry } from '@/lib/utils/http'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get('mode') || 'ok' // ok|fail_once|fail_twice
  const retries = Number(searchParams.get('retries') || '2')
  const backoffMs = Number(searchParams.get('backoffMs') || '200')
  const timeoutMs = Number(searchParams.get('timeoutMs') || '500')

  const target = `${request.nextUrl.origin}/api/testing/retry/echo?mode=${encodeURIComponent(mode)}`
  const res = await (async () => {
    return await fetchJsonWithRetry<{ ok: boolean; attempt?: number }>(
      target,
      { method: 'GET' },
      { retries, backoffMs, timeoutMs }
    )
  })()
  return NextResponse.json({ success: true, data: res })
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  // エコー用下位エンドポイント（内部呼び出し）
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get('mode') || 'ok'
  ;(global as unknown as Record<string, number>).__retry_echo_attempt = ((global as unknown as Record<string, number>).__retry_echo_attempt || 0) + 1
  const n = (global as unknown as Record<string, number>).__retry_echo_attempt
  if ((mode === 'fail_once' && n === 1) || (mode === 'fail_twice' && (n === 1 || n === 2))) {
    return NextResponse.json({ ok: false, attempt: n }, { status: 500 })
  }
  return NextResponse.json({ ok: true, attempt: n })
}

export const runtime = 'nodejs'
