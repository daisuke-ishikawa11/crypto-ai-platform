import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireInternalAuth, rateLimit } from '@/lib/security/api-guard'
import { getAdminClient } from '@/lib/supabase/server'
import { captureError } from '@/lib/monitoring/sentry'

const ParamsSchema = z.object({ id: z.string().uuid() })

export async function GET(request: NextRequest, context: { params: { id: string } }): Promise<NextResponse> {
  const auth = requireInternalAuth(request)
  if (auth) return auth
  const limited = rateLimit(request, 'notifications-get')
  if (limited) return limited

  const parsed = ParamsSchema.safeParse(context.params)
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: 'Invalid id' }, { status: 400 })
  }

  const supabase = getAdminClient()
  const { data, error } = await supabase.from('notifications').select('*').eq('id', parsed.data.id).single()
  if (error) {
    captureError(error, { scope: 'alerts-notification-get' })
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
  if (!data) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json({ success: true, data })
}


