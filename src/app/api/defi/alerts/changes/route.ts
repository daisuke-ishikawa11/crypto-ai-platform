import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { fetchProtocolTvlHistory } from '@/lib/defi/defillama-history'
import { incCounter, startTimer } from '@/lib/monitoring/metrics'
import { sendDiscordWebhook } from '@/lib/monitoring/alerting'

const BodySchema = z.object({
  slugs: z.array(z.string()).min(1).max(50).or(z.string().min(1)).transform((v) => Array.isArray(v) ? v : [v]),
  thresholdPct: z.number().min(0).max(100).optional(),
  minIncreasePct: z.number().min(0).max(100).optional(),
  minDecreasePct: z.number().min(0).max(100).optional(),
  severity: z.enum(['critical','high','normal','low']).optional(),
  bypassDnd: z.boolean().optional(),
  dryRun: z.boolean().optional(),
})

function pctChange(latest: number, base: number): number | undefined {
  if (!Number.isFinite(latest) || !Number.isFinite(base) || base === 0) return undefined
  return ((latest - base) / Math.abs(base)) * 100
}

export async function POST(request: NextRequest) {
  const adminToken = process.env.ALERTS_ADMIN_TOKEN || process.env.METRICS_TOKEN || ''
  const provided = request.headers.get('x-alerts-token') || ''
  if (!adminToken || provided !== adminToken) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const endTimer = startTimer('defi_alerts_eval_duration_seconds', { endpoint: 'defi-changes' })
  try {
    const json = await request.json()
    const body = BodySchema.safeParse(json)
    if (!body.success) return NextResponse.json({ success: false, error: 'Invalid body', issues: body.error.issues }, { status: 400 })
    const { slugs, thresholdPct, minIncreasePct, minDecreasePct, severity, bypassDnd, dryRun } = body.data

    const results: Array<{ slug: string; pct24h?: number; latest?: number; base24h?: number; alerted: boolean; reason?: string }> = []
    const nowSec = Math.floor(Date.now() / 1000)

    const webhook = process.env.ALERTS_DISCORD_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL || ''
    const canSend = Boolean(webhook) && (process.env.ALERTS_WEBHOOK_TARGET?.includes('discord') || !process.env.ALERTS_WEBHOOK_TARGET)

    for (const slug of slugs) {
      incCounter('defi_alerts_evaluations_total', { slug })
      const series = await fetchProtocolTvlHistory(slug, 45)
      const latest = series.at(-1)?.tvlUsd
      // find closest <= now-86400
      const cutoff = nowSec - 86400
      let base: number | undefined
      for (let i = series.length - 1; i >= 0; i--) {
        if (series[i].date <= cutoff) { base = series[i].tvlUsd; break }
      }
      const pct = (typeof latest === 'number' && typeof base === 'number') ? pctChange(latest, base) : undefined
      const incThresh = typeof minIncreasePct === 'number' ? minIncreasePct : (typeof thresholdPct === 'number' ? thresholdPct : 0)
      const decThresh = typeof minDecreasePct === 'number' ? minDecreasePct : (typeof thresholdPct === 'number' ? thresholdPct : 0)
      const trigger = typeof pct === 'number' && ((pct >= 0 && Math.abs(pct) >= incThresh) || (pct < 0 && Math.abs(pct) >= decThresh))
      if (trigger) {
        const msg = `DeFi Alert: ${slug} TVL ${pct >= 0 ? 'increased' : 'decreased'} ${pct.toFixed(2)}% in 24h (latest ${Math.round(latest!).toLocaleString()} USD)`
        if (!dryRun && canSend) {
          try {
            await sendDiscordWebhook(webhook, msg, { feature: 'defi', kind: 'tvl', slug }, { severity: severity || 'high', bypassDnd: Boolean(bypassDnd) })
            incCounter('defi_alerts_emitted_total', { slug, channel: 'discord' })
            results.push({ slug, pct24h: pct, latest, base24h: base, alerted: true })
          } catch (_e) {
            incCounter('defi_alerts_dropped_total', { slug, reason: 'send_failed' })
            results.push({ slug, pct24h: pct, latest, base24h: base, alerted: false, reason: 'send_failed' })
          }
        } else {
          incCounter('defi_alerts_dropped_total', { slug, reason: dryRun ? 'dry_run' : 'no_webhook' })
          results.push({ slug, pct24h: pct, latest, base24h: base, alerted: false, reason: dryRun ? 'dry_run' : 'no_webhook' })
        }
      } else {
        results.push({ slug, pct24h: pct, latest, base24h: base, alerted: false, reason: 'below_threshold' })
      }
    }

    endTimer()
    return NextResponse.json({ success: true, data: results })
  } catch (_e) {
    endTimer()
    incCounter('defi_api_errors_total', { endpoint: 'defi-changes', reason: 'exception' })
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 })
  }
}
