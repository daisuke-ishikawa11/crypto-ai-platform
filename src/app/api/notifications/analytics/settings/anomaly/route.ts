import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { safeAwait } from '@/lib/supabase/helpers'
import { logger } from '@/lib/monitoring/logger'

const anomalySchema = z.object({
  sigma: z.number().min(0),
  minSamples: z.number().min(1)
})

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: profile } = await safeAwait<{ role?: string }>(
      supabase.from('profiles').select('role').eq('id', user.id).single()
    )
    if (!profile || !['admin', 'analyst', 'system'].includes((profile.role ?? ''))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Load DB override
    const { data: row } = await safeAwait<{ value?: unknown } | null>(
      supabase
        .from('notification_settings')
        .select('value')
        .eq('key', 'webhook_invalid_sig_anomaly')
        .single()
    )

    const envSigma = Number(process.env.WEBHOOK_INVALID_SIG_ANOMALY_SIGMA || '3')
    const envMinSamples = Number(process.env.WEBHOOK_INVALID_SIG_ANOMALY_MIN_SAMPLES || '5')

    let sigma = Number.isFinite(envSigma) && envSigma >= 0 ? envSigma : 3
    let minSamples = Number.isFinite(envMinSamples) && envMinSamples >= 1 ? envMinSamples : 5

    if (row && row.value && typeof row.value === 'object') {
      const v = row.value as Record<string, unknown>
      const s = Number(v.sigma)
      const m = Number(v.minSamples)
      if (Number.isFinite(s) && s >= 0) sigma = s
      if (Number.isFinite(m) && m >= 1) minSamples = m
    }

    return NextResponse.json({ anomaly: { sigma, minSamples } })
  } catch (error) {
    logger.error('GET /api/notifications/analytics/settings/anomaly failed', { error: error instanceof Error ? error.message : String(error) })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: profile } = await safeAwait<{ role?: string }>(
      supabase.from('profiles').select('role').eq('id', user.id).single()
    )
    if (!profile || !['admin', 'analyst', 'system'].includes((profile.role ?? ''))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const parsed = anomalySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload', details: parsed.error.issues }, { status: 400 })
    }

    // Load current for audit
    const { data: currentRow } = await safeAwait<{ value?: unknown } | null>(
      supabase
        .from('notification_settings')
        .select('value')
        .eq('key', 'webhook_invalid_sig_anomaly')
        .single()
    )

    const { error: upsertError } = await safeAwait(
      supabase
        .from('notification_settings')
        .upsert({ key: 'webhook_invalid_sig_anomaly', value: parsed.data, updated_at: new Date().toISOString() }, { onConflict: 'key' })
    )
    if (upsertError) {
      logger.error('Failed to save anomaly settings', { error: upsertError.message })
      return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
    }

    // Audit (best-effort)
    try {
      await safeAwait(
        supabase
          .from('notification_settings_audit')
          .insert({
            id: crypto.randomUUID(),
            key: 'webhook_invalid_sig_anomaly',
            before: currentRow?.value ?? null,
            after: parsed.data,
            changed_by: user.id,
            changed_at: new Date().toISOString()
          })
      )
    } catch {}

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('PUT /api/notifications/analytics/settings/anomaly failed', { error: error instanceof Error ? error.message : String(error) })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
