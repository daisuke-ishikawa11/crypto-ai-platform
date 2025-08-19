import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { safeAwait } from '@/lib/supabase/helpers'
import { logger } from '@/lib/monitoring/logger'

const thresholdsSchema = z.record(z.string(), z.number().min(0))

export async function GET() {
  try {
    const supabase = await createClient()

    // AuthZ
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { data: profile } = await safeAwait<{ role?: string }>(
      supabase.from('profiles').select('role').eq('id', user.id).single()
    )
    if (!profile || !['admin', 'analyst', 'system'].includes((profile.role ?? ''))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Load DB override if present
    const { data: settingsRow } = await safeAwait<{ value?: unknown } | null>(
      supabase
        .from('notification_settings')
        .select('value')
        .eq('key', 'webhook_invalid_sig_thresholds')
        .single()
    )

    // Merge with environment defaults
    const envDefaultPct = Number(process.env.WEBHOOK_INVALID_SIG_ALERT_PCT || '5')
    const envMap: Record<string, number> = {}
    // Common providers to check env per-provider keys
    const providers = ['sendgrid', 'twilio', 'resend']
    for (const p of providers) {
      const val = Number(process.env[`WEBHOOK_INVALID_SIG_ALERT_PCT_${p.toUpperCase()}`] || '')
      if (Number.isFinite(val) && val >= 0) envMap[p] = val
    }

    const dbMap: Record<string, number> = {}
    if (settingsRow && settingsRow.value && typeof settingsRow.value === 'object') {
      for (const [k, v] of Object.entries(settingsRow.value as Record<string, unknown>)) {
        const num = Number(v)
        if (Number.isFinite(num) && num >= 0) dbMap[k.toLowerCase()] = num
      }
    }

    // Response combines: dbMap > envMap > default
    const allKeys = new Set([...Object.keys(envMap), ...Object.keys(dbMap), ...providers])
    const combined: Record<string, number> = {}
    for (const k of allKeys) {
      combined[k] = (k in dbMap) ? dbMap[k] : (k in envMap ? envMap[k] : envDefaultPct)
    }

    return NextResponse.json({ thresholds: combined, defaultPct: envDefaultPct })
  } catch (error) {
    logger.error('GET /api/notifications/analytics/settings failed', { error: error instanceof Error ? error.message : String(error) })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient()

    // AuthZ
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { data: profile } = await safeAwait<{ role?: string }>(
      supabase.from('profiles').select('role').eq('id', user.id).single()
    )
    if (!profile || !['admin', 'analyst', 'system'].includes((profile.role ?? ''))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Validate payload
    const body = await request.json()
    const parsed = thresholdsSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload', details: parsed.error.issues }, { status: 400 })
    }

    // Normalize keys to lowercase
    const normalized: Record<string, number> = {}
    for (const [k, v] of Object.entries(parsed.data)) {
      normalized[k.toLowerCase()] = v
    }

    // Load current (for audit)
    const { data: currentRow } = await safeAwait<{ value?: unknown } | null>(
      supabase
        .from('notification_settings')
        .select('value')
        .eq('key', 'webhook_invalid_sig_thresholds')
        .single()
    )

    // Upsert settings
    const { error: upsertError } = await safeAwait(
      supabase
        .from('notification_settings')
        .upsert({ key: 'webhook_invalid_sig_thresholds', value: normalized, updated_at: new Date().toISOString() }, { onConflict: 'key' })
    )
    if (upsertError) {
      logger.error('Failed to upsert webhook thresholds', { error: upsertError.message })
      return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
    }

    // Audit (best-effort)
    try {
      await safeAwait(
        supabase
          .from('notification_settings_audit')
          .insert({
            id: crypto.randomUUID(),
            key: 'webhook_invalid_sig_thresholds',
            before: currentRow?.value ?? null,
            after: normalized,
            changed_by: user.id,
            changed_at: new Date().toISOString()
          })
      )
    } catch {}

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('PUT /api/notifications/analytics/settings failed', { error: error instanceof Error ? error.message : String(error) })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
