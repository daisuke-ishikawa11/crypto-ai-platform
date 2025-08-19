import { NextRequest, NextResponse } from 'next/server'
import { renderPrometheus } from '@/lib/monitoring/metrics'
import { updateBusinessMetricsGauges } from '@/lib/monitoring/business-metrics'

export async function GET(request: NextRequest) {
	// Optional auth: protect metrics in production via bearer token
	const requireToken = (process.env.METRICS_REQUIRE_TOKEN || '').toLowerCase() === 'true'
	if (requireToken) {
		const authHeader = request.headers.get('authorization') || ''
		let presentedToken = ''
		if (authHeader.toLowerCase().startsWith('bearer ')) {
			presentedToken = authHeader.slice(7).trim()
		}
		if (!presentedToken) {
			const url = new URL(request.url)
			presentedToken = url.searchParams.get('token') || ''
		}
		const expectedToken = process.env.METRICS_TOKEN || ''
		if (!expectedToken || presentedToken !== expectedToken) {
			return new NextResponse('unauthorized', { status: 401 })
		}
	}

	// Refresh business gauges (lightweight, rate-limited inside)
	await updateBusinessMetricsGauges()
	const body = renderPrometheus()
	return new NextResponse(body, {
		status: 200,
		headers: {
			'Content-Type': 'text/plain; version=0.0.4; charset=utf-8'
		}
	})
}
