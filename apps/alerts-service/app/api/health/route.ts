import { NextResponse, NextRequest } from 'next/server'
import { getAdminClient } from '@/lib/supabase/server'
import { requireInternalAuth } from '@/lib/security/api-guard'
import { captureError } from '@/lib/monitoring/sentry'

export const GET = async (request: NextRequest) => {
  const auth = requireInternalAuth(request)
  if (auth) return auth

  const supabase = getAdminClient()
  let db: 'up' | 'down' = 'up'
  try {
    const { error } = await supabase.from('notifications').select('id').limit(1)
    if (error) {
      db = 'down'
      captureError(error, { scope: 'alerts-health' })
    }
  } catch (e) {
    db = 'down'
    captureError(e, { scope: 'alerts-health' })
  }
  return new Response(JSON.stringify({ success: true, data: { status: 'ok', db } }), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'Cache-Control': 'public, s-maxage=15, stale-while-revalidate=60',
    },
  })
}


