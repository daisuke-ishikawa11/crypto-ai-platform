import { NextRequest, NextResponse } from 'next/server'

type NotifyBody = {
	poolIds: string[]
	days?: number
	thresholds?: { tvlDropPct?: number; apySpikePct?: number }
}

export async function POST(request: NextRequest) {
	const adminToken = process.env.ALERTS_ADMIN_TOKEN || process.env.METRICS_TOKEN || ''
	if (!adminToken) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
	const hdr = request.headers.get('x-alerts-token') || ''
	if (hdr !== adminToken) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
	const discord = process.env.ALERTS_DISCORD_WEBHOOK_URL || ''
	try {
		const body = (await request.json()) as NotifyBody
		const ids = Array.isArray(body.poolIds) ? body.poolIds.slice(0, 50) : []
		const days = typeof body.days === 'number' && body.days > 0 ? Math.min(90, body.days) : 7
		const tvlDropPct = typeof body.thresholds?.tvlDropPct === 'number' ? body.thresholds.tvlDropPct : 30
		const apySpikePct = typeof body.thresholds?.apySpikePct === 'number' ? body.thresholds.apySpikePct : 100
		if (!ids.length) return NextResponse.json({ success: false, error: 'poolIds required' }, { status: 400 })

		const base = new URL(request.url)
		base.search = ''
		base.hash = ''
		const origin = `${base.protocol}//${base.host}`

		const results: Array<{ poolId: string; anomalies?: number; ok: boolean; status?: number; type?: string; timestamp?: number }> = []
		for (const id of ids) {
			try {
				const histRes = await fetch(`${origin}/api/defi/pools/history?id=${encodeURIComponent(id)}&days=${days}`)
				const histJson = await histRes.json().catch(() => ({ data: [] }))
				const points = Array.isArray(histJson?.data) ? histJson.data : []
				const evalRes = await fetch(`${origin}/api/defi/alerts/evaluate`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json', 'x-alerts-token': adminToken },
					body: JSON.stringify({ poolId: id, points, thresholds: { tvlDropPct, apySpikePct }, webhook: discord ? { discord } : undefined })
				})
				const evalJson = await evalRes.json().catch(() => ({}))
				const firstAnom = Array.isArray(evalJson?.anomalies) && evalJson.anomalies.length ? (evalJson.anomalies[0] as { type?: string; ts?: number }) : null
				results.push({
					poolId: id,
					anomalies: Array.isArray(evalJson?.anomalies) ? evalJson.anomalies.length : 0,
					ok: evalRes.ok,
					status: evalRes.status,
					type: firstAnom?.type,
					timestamp: typeof firstAnom?.ts === 'number' ? firstAnom.ts : undefined,
				})
				await new Promise(r => setTimeout(r, 60))
			} catch {
				results.push({ poolId: id, ok: false, status: 0 })
			}
		}
		return NextResponse.json({ success: true, results })
	} catch {
		return NextResponse.json({ success: false, error: 'Invalid body' }, { status: 400 })
	}
}
