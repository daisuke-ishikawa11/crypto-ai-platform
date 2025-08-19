import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { createClient } from '@/lib/supabase/server'
import { createApiHandler } from '@/lib/utils/api-error-middleware'

async function handler(_req: NextRequest): Promise<NextResponse> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from('defi_protocols').select('id').limit(1)
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    return NextResponse.json({ success: true, rows: Array.isArray(data) ? data.length : 0 })
  } catch (e) {
    return NextResponse.json({ success: false, error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
}

export const GET = createApiHandler({ handler, rateLimit: { limit: 30, window: 60_000 } })
