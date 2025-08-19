import { NextRequest, NextResponse } from 'next/server'
import { incCounter, startTimer } from '@/lib/monitoring/metrics'
import { sendDiscordWebhook } from '@/lib/monitoring/alerting'

type EvalBody = {
	poolId: string
	project?: string
	chain?: string
	points: { t: number; tvlUsd?: number; apy?: number }[]
	thresholds?: { tvlDropPct?: number; apySpikePct?: number }
	webhook?: { discord?: string }
}

export async function POST(request: NextRequest) {
	const endTimer = startTimer('defi_api_request_duration_seconds', { endpoint: 'defi_alerts_evaluate' })
	incCounter('defi_api_requests_total', { endpoint: 'defi_alerts_evaluate', method: 'POST' })
	const adminToken = process.env.ALERTS_ADMIN_TOKEN || process.env.METRICS_TOKEN || ''
	if (!adminToken) {
		endTimer(); return NextResponse.json({ success: false, error: 'Alerts not configured' }, { status: 501 })
	}
	const token = request.headers.get('x-alerts-token') || ''
	if (token !== adminToken) {
		incCounter('defi_api_errors_total', { endpoint: 'defi_alerts_evaluate', reason: 'unauthorized', status: '401' })
		endTimer(); return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
	}
	try {
		const body = await request.json() as EvalBody
		if (!body || !body.poolId || !Array.isArray(body.points)) {
			incCounter('defi_api_errors_total', { endpoint: 'defi_alerts_evaluate', reason: 'bad_request', status: '400' })
			endTimer(); return NextResponse.json({ success: false, error: 'Invalid body' }, { status: 400 })
		}
		const { detectAnomalies } = await import('@/lib/defi/anomaly')
		const anomalies = detectAnomalies(body.points, body.thresholds)
		// Metrics: count anomalies by type/severity
		try {
			for (const a of anomalies) {
				incCounter('defi_anomalies_detected_total', { type: a.type, level: a.severity })
			}
		} catch {}
		if (anomalies.length && body.webhook?.discord) {
			const title = `DeFi anomaly: ${body.project || body.poolId}`
			const lines = anomalies.map(a => {
				const pct = typeof a.meta?.pct === 'number' ? String(a.meta.pct) : ''
				const when = typeof a.ts === 'number' ? new Date(a.ts * 1000).toISOString() : ''
				return `• ${a.type} [${a.severity}] ${a.message}${pct ? ` (${pct}%)` : ''}${when ? ` at ${when}` : ''}`
			})
			await sendDiscordWebhook(body.webhook.discord, `${title}\n${lines.join('\n')}`, { component: 'defi', endpoint: 'alerts_evaluate' }, { severity: anomalies.some(a => a.severity === 'critical') ? 'critical' : 'high' })
		}
		endTimer(); return NextResponse.json({ success: true, anomalies, meta: { count: anomalies.length } })
	} catch {
		incCounter('defi_api_errors_total', { endpoint: 'defi_alerts_evaluate', reason: 'exception' })
		endTimer(); return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 })
	}
}
