import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireInternalAuth, rateLimit } from '@/lib/security/api-guard'
import { getAdminClient } from '@/lib/supabase/server'
import { captureError } from '@/lib/monitoring/sentry'
import { config } from '@/lib/config'
import { NodemailerProvider } from '@crypto/alerts'

const QuerySchema = z.object({ limit: z.coerce.number().int().min(1).max(50).default(10) })

type NotificationStatus = 'queued' | 'processing' | 'sent' | 'failed'

interface NotificationRow {
  id: string
  channel: 'email'
  to: string
  subject: string
  text: string | null
  html: string | null
  tags: string[] | null
  status: NotificationStatus
  error_message: string | null
  created_at: string
  scheduled_at: string | null
  sent_at: string | null
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const auth = requireInternalAuth(request)
  if (auth) return auth
  const limited = rateLimit(request, 'notifications-process')
  if (limited) return limited

  const { searchParams } = new URL(request.url)
  const parse = QuerySchema.safeParse({ limit: searchParams.get('limit') ?? undefined })
  if (!parse.success) return NextResponse.json({ success: false, error: 'Invalid query', details: parse.error.flatten() }, { status: 400 })
  const { limit } = parse.data

  const supabase = getAdminClient()

  // SMTP未設定なら何もしない（将来BullMQに置換可能）
  if (!config.smtp) {
    return NextResponse.json({ success: true, processed: 0, message: 'SMTP not configured' })
  }

  const provider = new NodemailerProvider({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure,
    user: config.smtp.user,
    pass: config.smtp.pass,
  })

  // 1) queuedを取得（スケジュール時刻が過去のもの優先）
  const { data: queued, error: listErr } = await supabase
    .from('notifications')
    .select('*')
    .eq('status', 'queued')
    .lte('scheduled_at', new Date().toISOString())
    .order('created_at', { ascending: true })
    .limit(limit)

  if (listErr) {
    captureError(listErr, { scope: 'alerts-process-list' })
    return NextResponse.json({ success: false, error: listErr.message }, { status: 500 })
  }

  const items = (queued ?? []) as NotificationRow[]
  let processed = 0
  const results: Array<{ id: string; status: NotificationStatus; error?: string }> = []

  for (const item of items) {
    // 2) 楽観ロック: status=queued のときのみ processing に更新
    const { data: updated, error: updErr } = await supabase
      .from('notifications')
      .update({ status: 'processing' as const })
      .eq('id', item.id)
      .eq('status', 'queued')
      .select('id, status')
      .single()

    if (updErr || !updated) {
      // 既に他のワーカーが取得
      continue
    }

    try {
      const send = await provider.sendEmail({
        to: item.to,
        subject: item.subject,
        text: item.text ?? undefined,
        html: item.html ?? undefined,
        tags: item.tags ?? undefined,
      })
      const sentAt = new Date().toISOString()
      await supabase
        .from('notifications')
        .update({ status: send.status, sent_at: sentAt, error_message: send.errorMessage ?? null })
        .eq('id', item.id)
      processed += 1
      results.push({ id: item.id, status: send.status })
    } catch (e) {
      const msg = String(e instanceof Error ? e.message : e)
      captureError(e, { scope: 'alerts-process-send' })
      await supabase
        .from('notifications')
        .update({ status: 'failed', error_message: msg })
        .eq('id', item.id)
      results.push({ id: item.id, status: 'failed', error: msg })
    }
  }

  return NextResponse.json({ success: true, processed, results })
}


