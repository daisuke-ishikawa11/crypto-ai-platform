import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { safeAwait } from '@/lib/supabase/helpers'
import { sendSlackWebhook, sendDiscordWebhook } from '@/lib/monitoring/alerting'
import { incCounter, isMetricsEnabled, startTimer } from '@/lib/monitoring/metrics'

const schema = z.object({
	target: z.enum(['slack', 'discord', 'both']).optional().default((process.env.ALERTS_WEBHOOK_TARGET || 'slack') as 'slack'|'discord'|'both'),
	message: z.string().min(1).max(1500).optional(),
	labels: z.record(z.string(), z.string()).optional()
})

async function ensureAuthorized(): Promise<{ ok: boolean; status: number }> {
	// 許可: テスト環境ではスキップ
	if ((process.env.NODE_ENV || '').toLowerCase() === 'test') return { ok: true, status: 200 }
	const supabase = await createClient()
	const { data: { user }, error: authError } = await supabase.auth.getUser()
	if (authError || !user) return { ok: false, status: 401 }
	const { data: profile } = await safeAwait<{ role?: string }>(
		supabase.from('profiles').select('role').eq('id', user.id).single()
	)
	if (!profile || !['admin', 'analyst', 'system'].includes((profile.role ?? ''))) {
		return { ok: false, status: 403 }
	}
	return { ok: true, status: 200 }
}

// simple per-identity rate limiter (in-process)
const windowMs = 60_000
const reqTimestamps: Map<string, number[]> = new Map()
function shouldAllow(identity: string): boolean {
	const maxPerMin = Number(process.env.ALERTS_TEST_MAX_PER_MINUTE ?? 0)
	if (!Number.isFinite(maxPerMin) || maxPerMin <= 0) return true
	const now = Date.now()
	const cutoff = now - windowMs
	const arr = reqTimestamps.get(identity) || []
	const kept = arr.filter(t => t >= cutoff)
	if (kept.length >= maxPerMin) return false
	kept.push(now)
	reqTimestamps.set(identity, kept)
	return true
}

export async function POST(request: NextRequest): Promise<NextResponse> {
	const stopTimer = startTimer('alerts_test_request_duration_seconds', { route: 'alerts_test' })
	try { if (isMetricsEnabled()) incCounter('alerts_test_requests_total', { route: 'alerts_test' }) } catch {}
	const authz = await ensureAuthorized()
	if (!authz.ok) return NextResponse.json({ error: authz.status === 401 ? 'Unauthorized' : 'Forbidden' }, { status: authz.status })

	const body = await request.json().catch(() => ({}))
	const parsed = schema.safeParse(body)
	if (!parsed.success) return NextResponse.json({ error: 'Invalid payload', details: parsed.error.issues }, { status: 400 })

	const target = parsed.data.target
	const message = parsed.data.message || `🔔 Test alert @ ${new Date().toISOString()}`
	const labels = { route: 'alerts_test', ...(parsed.data.labels || {}) }

	const slackUrl = process.env.SLACK_WEBHOOK_URL || ''
	const discordUrl = process.env.DISCORD_WEBHOOK_URL || ''

	if ((target === 'slack' || target === 'both') && !slackUrl && (process.env.NODE_ENV || '') !== 'test') {
		return NextResponse.json({ error: 'Slack webhook not configured' }, { status: 400 })
	}
	if ((target === 'discord' || target === 'both') && !discordUrl && (process.env.NODE_ENV || '') !== 'test') {
		return NextResponse.json({ error: 'Discord webhook not configured' }, { status: 400 })
	}

	// rate limit per identity (userId if available, else global)
	let identity = 'global'
	try {
		const supabase = await createClient()
		const { data: { user } } = await supabase.auth.getUser()
		if (user?.id) identity = user.id
	} catch {}
	if (!shouldAllow(identity)) {
		try { if (isMetricsEnabled()) incCounter('alerts_test_dropped_total', { route: 'alerts_test', reason: 'rate_limit' }) } catch {}
		return NextResponse.json({ error: 'Rate limited' }, { status: 429 })
	}

	// 送信
	if (target === 'slack' || target === 'both') {
		await sendSlackWebhook(slackUrl, message, labels)
	}
	if (target === 'discord' || target === 'both') {
		await sendDiscordWebhook(discordUrl, message, labels)
	}

	const res = NextResponse.json({ ok: true, target }, { status: 200 })
	try { stopTimer() } catch {}
	return res
}
