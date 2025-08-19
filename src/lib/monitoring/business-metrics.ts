import { createClient } from '@/lib/supabase/server'
import { setGauge, isMetricsEnabled } from '@/lib/monitoring/metrics'

type CurrencyTotals = Record<string, number>

let lastRefreshedAt = 0
let isRefreshing = false

function startOfTodayISO(): string {
	const d = new Date()
	d.setHours(0, 0, 0, 0)
	return d.toISOString()
}

function daysAgoISO(days: number): string {
	const d = new Date()
	d.setDate(d.getDate() - days)
	return d.toISOString()
}

export async function updateBusinessMetricsGauges(): Promise<void> {
	if (!isMetricsEnabled()) return
	if ((process.env.BUSINESS_METRICS_ENABLED || 'true') !== 'true') return
	const ttlMs = Number(process.env.BUSINESS_METRICS_TTL_MS || 60000)
	const now = Date.now()
	if (now - lastRefreshedAt < ttlMs || isRefreshing) return
	isRefreshing = true

	try {
		const supabase = await createClient()

		// Active subscribers
		const { count: activeCount } = await supabase
			.from('user_profiles')
			.select('*', { count: 'exact', head: true })
			.eq('subscription_status', 'active')
		// Trial subscribers
		const { count: trialCount } = await supabase
			.from('user_profiles')
			.select('*', { count: 'exact', head: true })
			.eq('subscription_status', 'trial')

		setGauge('business_active_subscribers_total', Number(activeCount || 0))
		setGauge('business_trial_subscribers_total', Number(trialCount || 0))

		// Revenue today (payments)
		const todayIso = startOfTodayISO()
		const { data: paymentsToday } = await supabase
			.from('payment_history')
			.select('amount,currency,status,created_at')
			.eq('status', 'succeeded')
			.gte('created_at', todayIso)
		const revTodayByCurrency: CurrencyTotals = {}
		for (const row of (paymentsToday || [])) {
			const cur = (typeof row.currency === 'string' && row.currency) ? row.currency.toLowerCase() : 'unknown'
			const amt = typeof row.amount === 'number' ? row.amount : 0
			revTodayByCurrency[cur] = (revTodayByCurrency[cur] || 0) + amt
		}
		for (const [currency, amount] of Object.entries(revTodayByCurrency)) {
			setGauge('business_revenue_today_total', amount, { currency })
		}

		// Revenue last 30d (invoices paid)
		const since30d = daysAgoISO(30)
		const { data: invoices30d } = await supabase
			.from('invoice_history')
			.select('amount_paid,currency,status,created_at')
			.eq('status', 'paid')
			.gte('created_at', since30d)
		const rev30dByCurrency: CurrencyTotals = {}
		for (const row of (invoices30d || [])) {
			const cur = (typeof row.currency === 'string' && row.currency) ? row.currency.toLowerCase() : 'unknown'
			const amt = typeof row.amount_paid === 'number' ? row.amount_paid : 0
			rev30dByCurrency[cur] = (rev30dByCurrency[cur] || 0) + amt
		}
		for (const [currency, amount] of Object.entries(rev30dByCurrency)) {
			setGauge('business_revenue_30d_total', amount, { currency })
		}

		lastRefreshedAt = now
	} catch {
		// fail-closed: 例外時は更新しない（既存値維持）
	} finally {
		isRefreshing = false
	}
}
