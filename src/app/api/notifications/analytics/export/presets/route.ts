import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { safeAwait } from '@/lib/supabase/helpers'
import { logger } from '@/lib/monitoring/logger'

const presetSchema = z.object({
  columns: z.object({
    total: z.boolean().optional(),
    invalid: z.boolean().optional(),
    invalidRate: z.boolean().optional(),
    prevInvalidRate: z.boolean().optional(),
    deltaPp: z.boolean().optional(),
    providerInvalid: z.boolean().optional(),
    providerInvalidRate: z.boolean().optional(),
    providerPrevRate: z.boolean().optional(),
    providerDeltaPp: z.boolean().optional(),
  }).optional(),
  precision: z.number().int().min(0).max(6).optional(),
  compress: z.enum(['none','gzip']).optional(),
})

const settingsKeyForUser = (userId: string) => `export_presets_user_${userId}`

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // 権限: 既存のアナリティクス系に合わせる
    const { data: profile } = await safeAwait<{ role?: string }>(
      supabase.from('profiles').select('role').eq('id', user.id).single()
    )
    if (!profile || !['admin', 'analyst', 'system'].includes((profile.role ?? ''))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const key = settingsKeyForUser(user.id)
    const { data: row } = await safeAwait<{ value?: unknown } | null>(
      supabase
        .from('notification_settings')
        .select('value')
        .eq('key', key)
        .single()
    )
    const value = (row?.value && typeof row.value === 'object') ? row.value as Record<string, unknown> : {}
    return NextResponse.json({ preset: value })
  } catch (error) {
    logger.error('GET /api/notifications/analytics/export/presets failed', { error: error instanceof Error ? error.message : String(error) })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // 権限: 既存のアナリティクス系に合わせる
    const { data: profile } = await safeAwait<{ role?: string }>(
      supabase.from('profiles').select('role').eq('id', user.id).single()
    )
    if (!profile || !['admin', 'analyst', 'system'].includes((profile.role ?? ''))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json().catch(() => ({}))
    const parsed = presetSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload', details: parsed.error.issues }, { status: 400 })
    }
    const payload = parsed.data

    const key = settingsKeyForUser(user.id)

    // 監査用: 現在値を取得
    const { data: currentRow } = await safeAwait<{ value?: unknown } | null>(
      supabase
        .from('notification_settings')
        .select('value')
        .eq('key', key)
        .single()
    )

    // 保存
    const { error: upsertError } = await safeAwait(
      supabase
        .from('notification_settings')
        .upsert({ key, value: payload, updated_at: new Date().toISOString() }, { onConflict: 'key' })
    )
    if (upsertError) {
      logger.error('Failed to save export preset', { error: upsertError.message })
      return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
    }

    // 監査ログ（ベストエフォート）
    try {
      await safeAwait(
        supabase
          .from('notification_settings_audit')
          .insert({
            id: crypto.randomUUID(),
            key,
            before: currentRow?.value ?? null,
            after: payload,
            changed_by: user.id,
            changed_at: new Date().toISOString(),
          })
      )
    } catch {}

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('PUT /api/notifications/analytics/export/presets failed', { error: error instanceof Error ? error.message : String(error) })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
