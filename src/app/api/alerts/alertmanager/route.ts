import { NextRequest, NextResponse } from 'next/server'
import { incCounter, startTimer, isMetricsEnabled } from '@/lib/monitoring/metrics'
import { sendDiscordWebhook, sendSlackWebhook } from '@/lib/monitoring/alerting'

interface AlertmanagerAlert {
  status?: string
  labels?: Record<string, string>
  annotations?: Record<string, string>
  startsAt?: string
  endsAt?: string
  generatorURL?: string
  fingerprint?: string
}

interface AlertmanagerPayload {
  version?: string
  groupKey?: string
  status?: 'firing' | 'resolved'
  receiver?: string
  groupLabels?: Record<string, string>
  commonLabels?: Record<string, string>
  commonAnnotations?: Record<string, string>
  externalURL?: string
  alerts?: AlertmanagerAlert[]
}

function extractSeverity(labels?: Record<string, string>): 'critical' | 'high' | 'normal' | 'low' {
  const sev = (labels?.severity || '').toLowerCase()
  if (sev === 'critical') return 'critical'
  if (sev === 'warning' || sev === 'warn' || sev === 'high') return 'high'
  if (sev === 'info' || sev === 'informational' || sev === 'low') return 'low'
  return 'normal'
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const stopTimer = startTimer('alerts_am_ingest_duration_seconds', { route: 'alerts_alertmanager' })
  if (isMetricsEnabled()) incCounter('alerts_am_ingest_requests_total', { route: 'alerts_alertmanager' })

  try {
    const sharedSecret = process.env.ALERTMANAGER_SHARED_SECRET || ''
    if (sharedSecret) {
      const token = request.headers.get('x-alertmanager-token') || ''
      if (!token || token !== sharedSecret) {
        if (isMetricsEnabled()) incCounter('alerts_am_ingest_errors_total', { route: 'alerts_alertmanager', reason: 'auth' })
        stopTimer()
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    const payload: AlertmanagerPayload = await request.json()
    const status = payload.status || 'firing'
    const alerts = payload.alerts || []

    const first = alerts[0]
    const severity = extractSeverity(first?.labels)
    const bypassDnd = severity === 'critical'
    const channelTarget = (process.env.ALERTS_WEBHOOK_TARGET || 'discord') as 'slack' | 'discord' | 'both'
    const slackUrl = process.env.SLACK_WEBHOOK_URL || ''
    const discordUrl = process.env.DISCORD_WEBHOOK_URL || ''

    // Build message
    const lines: string[] = []
    lines.push(`🔔 Alertmanager: ${status.toUpperCase()} (${alerts.length})`)
    if (payload.groupLabels && Object.keys(payload.groupLabels).length > 0) {
      lines.push(`Group: ${Object.entries(payload.groupLabels).map(([k, v]) => `${k}=${v}`).join(', ')}`)
    }
    const preview = alerts.slice(0, 3)
    preview.forEach((a, idx) => {
      const name = a.labels?.alertname || 'alert'
      const sum = a.annotations?.summary || a.annotations?.description || ''
      const lab = a.labels ? Object.entries(a.labels).map(([k, v]) => `${k}=${v}`).join(', ') : ''
      lines.push(`${idx + 1}. ${name} ${sum ? `- ${sum}` : ''}${lab ? ` [${lab}]` : ''}`)
    })
    if (alerts.length > preview.length) {
      lines.push(`…and ${alerts.length - preview.length} more`)
    }
    const msg = lines.join('\n')

    // Send
    if ((channelTarget === 'slack' || channelTarget === 'both') && slackUrl) {
      await sendSlackWebhook(slackUrl, msg, { route: 'alerts_alertmanager' }, { severity, bypassDnd })
    }
    if ((channelTarget === 'discord' || channelTarget === 'both') && discordUrl) {
      await sendDiscordWebhook(discordUrl, msg, { route: 'alerts_alertmanager' }, { severity, bypassDnd })
    }

    if (isMetricsEnabled()) incCounter('alerts_am_ingest_success_total', { route: 'alerts_alertmanager' })
    stopTimer()
    return NextResponse.json({ ok: true })
  } catch {
    if (isMetricsEnabled()) incCounter('alerts_am_ingest_errors_total', { route: 'alerts_alertmanager', reason: 'exception' })
    stopTimer()
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }
}
