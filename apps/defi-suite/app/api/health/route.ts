import { NextResponse, NextRequest } from 'next/server'
import { getAdminClient } from '@/lib/supabase/server'
import { requireInternalAuth } from '@/lib/security/api-guard'
import { captureError } from '@/lib/monitoring/sentry'
import { withCache } from '@/lib/cache'

export const GET = async (request: NextRequest) => {
  const auth = requireInternalAuth(request)
  if (auth) return auth

  const supabase = getAdminClient()
  let db: 'up' | 'down' = 'up'
  try {
    const { error } = await supabase.from('defi_protocols').select('id').limit(1)
    if (error) {
      db = 'down'
      captureError(error, { scope: 'health-check' })
    }
  } catch (e) {
    db = 'down'
    captureError(e, { scope: 'health-check' })
  }
  return NextResponse.json({ success: true, data: { status: 'ok', db } }, withCache({}, 15))
}


