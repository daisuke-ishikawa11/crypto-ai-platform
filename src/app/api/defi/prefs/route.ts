import { NextRequest, NextResponse } from 'next/server'
import { getRedis } from '@/lib/redis/client'
import { incCounter, startTimer } from '@/lib/monitoring/metrics'
import { createClient as createSupabaseServerClient } from '@/lib/supabase/server'

type DefiPrefs = {
	favProtocols?: Record<string, true>
	favPools?: Record<string, true>
	filters?: Record<string, unknown>
	presets?: Record<string, unknown>
	inspectHistory?: Array<Record<string, unknown>>
	defaults?: { protocols?: string; pools?: string }
	settings?: {
		anomalies?: {
			tvlDropPct?: number
			apySpikePct?: number
			rangeDays?: number
			sevFilter?: 'all' | 'critical' | 'high' | 'medium' | 'low'
			sortBy?: 'severity' | 'recent'
			typeFilter?: 'all' | 'tvl_drop' | 'apy_spike'
		}
		aiEvaluate?: {
			warnSuccessRate?: number // 0..1
			warnOnRateLimited?: boolean
		}
		notifications?: {
			inApp?: boolean
			email?: boolean
			discordWebhook?: string
			quietHours?: string // "HH:MM-HH:MM"
			dnd?: boolean
		}
	}
}

function k(userId: string): string { return `defi:prefs:${userId}` }

async function resolveUserId(request: NextRequest): Promise<string | null> {
	// Allow admin token override for backend jobs
	const adminToken = process.env.ALERTS_ADMIN_TOKEN || process.env.METRICS_TOKEN || ''
	const hdr = request.headers.get('x-alerts-token') || ''
	if (adminToken && hdr && hdr === adminToken) {
		const userId = request.headers.get('x-user-id') || null
		return userId
	}
	// Normal path: Supabase session cookie
	try {
		const supabase = await createSupabaseServerClient()
		const { data: { user } } = await supabase.auth.getUser()
		return user?.id ?? null
	} catch {
		return null
	}
}

export async function GET(request: NextRequest) {
	const endTimer = startTimer('defi_api_request_duration_seconds', { endpoint: 'defi_prefs', method: 'GET' })
	incCounter('defi_api_requests_total', { endpoint: 'defi_prefs', method: 'GET' })
	try {
		const userId = await resolveUserId(request)
		if (!userId) {
			incCounter('defi_api_errors_total', { endpoint: 'defi_prefs', reason: 'unauthorized', status: '401' })
			endTimer(); return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
		}
		const redis = await getRedis()
		if (!redis) { endTimer(); return NextResponse.json({ success: true, data: {} as DefiPrefs, meta: { source: 'redis:disabled' } }) }
		const raw = await redis.get(k(userId))
		const data: DefiPrefs = raw ? JSON.parse(raw) as DefiPrefs : {}
		endTimer(); return NextResponse.json({ success: true, data })
	} catch {
		incCounter('defi_api_errors_total', { endpoint: 'defi_prefs', reason: 'exception' })
		endTimer(); return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 })
	}
}

export async function POST(request: NextRequest) {
	const endTimer = startTimer('defi_api_request_duration_seconds', { endpoint: 'defi_prefs', method: 'POST' })
	incCounter('defi_api_requests_total', { endpoint: 'defi_prefs', method: 'POST' })
	try {
		const userId = await resolveUserId(request)
		if (!userId) {
			incCounter('defi_api_errors_total', { endpoint: 'defi_prefs', reason: 'unauthorized', status: '401' })
			endTimer(); return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
		}
		const body = await request.json() as Partial<DefiPrefs> & { deletePresets?: string[] }
		const redis = await getRedis()
		if (!redis) { endTimer(); return NextResponse.json({ success: false, error: 'Prefs store not configured' }, { status: 501 }) }
		const raw = await redis.get(k(userId))
		const current: DefiPrefs = raw ? JSON.parse(raw) as DefiPrefs : {}
		const next: DefiPrefs = { ...current }
		if (body.favProtocols) next.favProtocols = { ...(current.favProtocols || {}), ...body.favProtocols }
		if (body.favPools) next.favPools = { ...(current.favPools || {}), ...body.favPools }
		if (body.filters) next.filters = { ...(current.filters || {}), ...body.filters }
		if (body.presets) next.presets = { ...(current.presets || {}), ...body.presets }
		if (Array.isArray(body.deletePresets) && body.deletePresets.length) {
			next.presets = next.presets || {}
			for (const k of body.deletePresets) { if (k && Object.prototype.hasOwnProperty.call(next.presets, k)) { delete (next.presets as Record<string, unknown>)[k] } }
		}
		if (body.defaults) {
			next.defaults = { ...(current.defaults || {}), ...body.defaults }
		}
		if (body.settings) {
			next.settings = next.settings || {}
			if (body.settings.anomalies) {
				next.settings.anomalies = { ...(current.settings?.anomalies || {}), ...body.settings.anomalies }
			}
			if (body.settings.aiEvaluate) {
				next.settings.aiEvaluate = { ...(current.settings?.aiEvaluate || {}), ...body.settings.aiEvaluate }
			}
		}
		if (Array.isArray(body.inspectHistory)) {
			next.inspectHistory = [ ...(current.inspectHistory || []), ...body.inspectHistory ].slice(-100)
		}
		await redis.set(k(userId), JSON.stringify(next))
		endTimer(); return NextResponse.json({ success: true, data: next })
	} catch {
		incCounter('defi_api_errors_total', { endpoint: 'defi_prefs', reason: 'exception' })
		endTimer(); return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 })
	}
}
