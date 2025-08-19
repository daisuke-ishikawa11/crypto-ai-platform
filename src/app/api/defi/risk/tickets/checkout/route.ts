import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getStripe } from '@/lib/stripe/config'
import { incCounter, isMetricsEnabled, startTimer } from '@/lib/monitoring/metrics'
import { createClient as createSupabaseServerClient } from '@/lib/supabase/server'

const BodySchema = z.object({
	tickets: z.number().int().min(1).max(50),
	currency: z.enum(['jpy']).optional(),
})

async function resolveUserId(request: NextRequest): Promise<string | null> {
	// 管理トークン経由のバックエンド実行も許容
	const adminToken = process.env.ALERTS_ADMIN_TOKEN || process.env.METRICS_TOKEN || ''
	const hdr = request.headers.get('x-alerts-token') || ''
	if (adminToken && hdr && hdr === adminToken) {
		const userId = request.headers.get('x-user-id') || null
		return userId
	}
	// Supabase セッション（クッキー）で解決
	try {
		const supabase = await createSupabaseServerClient()
		const { data: { user } } = await supabase.auth.getUser()
		return user?.id ?? null
	} catch {
		return null
	}
}

export async function POST(request: NextRequest) {
	const stop = startTimer('defi_api_request_duration_seconds', { endpoint: 'risk_tickets_checkout', method: 'POST' })
	try {
		const userId = await resolveUserId(request)
		if (!userId) {
			if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'risk_tickets_checkout', reason: 'unauthorized', status: '401' })
			const end = stop; end();
			return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
		}

		const json = await request.json().catch(() => ({}))
		const parsed = BodySchema.safeParse(json)
		if (!parsed.success) {
			if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'risk_tickets_checkout', reason: 'bad_request', status: '400' })
			const end = stop; end();
			return NextResponse.json({ success: false, error: 'Invalid body', issues: parsed.error.issues }, { status: 400 })
		}
		const { tickets, currency = 'jpy' } = parsed.data

		const pricePerTicketJPY = Number(process.env.TICKET_PRICE_JPY || '100')
		if (!Number.isFinite(pricePerTicketJPY) || pricePerTicketJPY <= 0) {
			if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'risk_tickets_checkout', reason: 'config_error', status: '500' })
			const end = stop; end();
			return NextResponse.json({ success: false, error: 'Ticket price misconfigured' }, { status: 500 })
		}

		// Stripe Checkout Session を作成（動的 price_data を使用）
		const stripe = getStripe()
		const session = await stripe.checkout.sessions.create({
			mode: 'payment',
			success_url: `${process.env.NEXT_PUBLIC_APP_ORIGIN || process.env.NEXT_PUBLIC_APP_URL}/defi?purchase=success`,
			cancel_url: `${process.env.NEXT_PUBLIC_APP_ORIGIN || process.env.NEXT_PUBLIC_APP_URL}/defi?purchase=cancel`,
			line_items: [
				{
					price_data: {
						currency,
						product_data: { name: 'DeFi Risk Tickets' },
						unit_amount: pricePerTicketJPY, // JPY: 最小単位（1円）
					},
					quantity: tickets,
				},
			],
			metadata: {
				purchase_type: 'ticket_pack',
				user_id: userId,
				tickets: String(tickets),
			},
			payment_intent_data: {
				metadata: {
					purchase_type: 'ticket_pack',
					user_id: userId,
					tickets: String(tickets),
				},
			},
		})

		if (isMetricsEnabled()) incCounter('defi_api_requests_total', { endpoint: 'risk_tickets_checkout', method: 'POST' })
		const end = stop; end();
		return NextResponse.json({ success: true, url: session.url })
	} catch (error) {
		if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'risk_tickets_checkout', reason: 'exception' })
		const end = stop; end();
		return NextResponse.json({ success: false, error: 'Internal error', details: error instanceof Error ? error.message : String(error) }, { status: 500 })
	}
}
