import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireInternalAuth, rateLimit } from '@/lib/security/api-guard'
import { getAdminClient } from '@/lib/supabase/server'
import { captureError } from '@/lib/monitoring/sentry'
import { createSendQueue } from '@/lib/queue'
import { createEmailProvider } from '@/lib/providers'

const BodySchema = z.object({
  channel: z.literal('email'),
  to: z.string().email(),
  subject: z.string().min(1),
  text: z.string().optional(),
  html: z.string().optional(),
  tags: z.array(z.string()).optional(),
  scheduledAt: z.string().datetime().optional(),
})

interface NotificationInsert {
  channel: 'email'
  to: string
  subject: string
  text?: string
  html?: string
  tags?: string[] | null
  status: 'queued' | 'processing' | 'sent' | 'failed'
  error_message?: string | null
  created_at: string
  scheduled_at?: string | null
  sent_at?: string | null
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const auth = requireInternalAuth(request)
  if (auth) return auth
  const limited = rateLimit(request, 'notifications-send')
  if (limited) return limited

  const supabase = getAdminClient()

  let body: unknown
  try { body = await request.json() } catch { return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 }) }

  const parsed = BodySchema.safeParse(body)
  if (!parsed.success) { return NextResponse.json({ success: false, error: 'Invalid payload', details: parsed.error.flatten() }, { status: 400 }) }
  const payload = parsed.data

  const row: NotificationInsert = {
    channel: 'email', to: payload.to, subject: payload.subject, text: payload.text, html: payload.html,
    tags: payload.tags ?? null, status: 'queued', created_at: new Date().toISOString(), scheduled_at: payload.scheduledAt ?? null,
  }
  const { data: inserted, error: insertErr } = await supabase.from('notifications').insert([row]).select('*').single()
  if (insertErr) { captureError(insertErr, { scope: 'alerts-send-insert' }); return NextResponse.json({ success: false, error: insertErr.message }, { status: 500 }) }

  const id = (inserted as { id: string }).id

  const queue = createSendQueue()
  if (queue) {
    await queue.add('send', { id })
  } else {
    const provider = createEmailProvider()
    if (provider) {
      try {
        const result = await provider.sendEmail({ to: payload.to, subject: payload.subject, text: payload.text, html: payload.html, tags: payload.tags })
        await supabase.from('notifications').update({ status: result.status, sent_at: new Date().toISOString(), error_message: result.errorMessage ?? null }).eq('id', id)
      } catch (e) {
        captureError(e, { scope: 'alerts-send-direct' })
        await supabase.from('notifications').update({ status: 'failed', error_message: String(e instanceof Error ? e.message : e) }).eq('id', id)
      }
    }
  }

  return NextResponse.json({ success: true, data: { id } })
}


