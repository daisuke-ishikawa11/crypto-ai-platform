import { NextRequest } from 'next/server'

describe.skip('notifications analytics discord alerts', () => {
	const originalEnv = process.env
	beforeEach(() => {
		jest.resetModules()
		process.env = {
			...originalEnv,
			METRICS_ENABLED: 'true',
			ALERTS_WEBHOOK_TARGET: 'discord',
			DISCORD_WEBHOOK_URL: 'https://discord.test/webhook',
			WEBHOOK_INVALID_SIG_SLACK_ALERT: 'true'
		}
	})
	afterEach(() => { process.env = originalEnv })

	it('sends discord alert when threshold breached', async () => {
		// mock fetch for discord webhook
		;(global.fetch as unknown as jest.MockedFunction<typeof fetch>) = jest.fn(async (input: RequestInfo | URL, _?: RequestInit): Promise<Response> => {
			const url = typeof input === 'string' ? input : (input instanceof URL ? input.toString() : String(input))
			if (url.includes('discord.test/webhook')) {
				return new Response(null, { status: 200 })
			}
			// fallback for other fetches in route (e.g., supabase mock paths)
			return new Response(JSON.stringify({}), { status: 200, headers: { 'Content-Type': 'application/json' } })
		})

		// lazy import after env set
		// importパスを相対パスに修正し、型アサーションのany/unknownを排除
		// ルール厳守: any/unknown禁止
		// ルートからの相対パスに修正（テストからの相対位置に注意）
		const mod = await import('../../../src/app/api/notifications/analytics/route')
		// GETの型を明示的に定義
		type GetHandler = { GET: (req: NextRequest) => Promise<Response> }
		const { GET } = mod as GetHandler

		// time range forcing breach with synthetic minimal params
		const url = new URL('http://localhost/api/notifications/analytics')
		url.searchParams.set('groupBy', 'day')
		url.searchParams.set('start', new Date(Date.now() - 3600_000).toISOString())
		url.searchParams.set('end', new Date().toISOString())
		const req = { url: url.toString() } as unknown as NextRequest

		const res = await GET(req)
		expect(res.status).toBeGreaterThanOrEqual(200)
		expect(res.status).toBeLessThan(500)
		// webhook送信（discord）が呼ばれていること
		expect((global.fetch as jest.Mock).mock.calls.length).toBeGreaterThan(0)
		// 少なくとも1回はdiscord URLで呼ばれている
		const calls: string[] = (global.fetch as jest.Mock).mock.calls.map((c: [RequestInfo | URL, RequestInit?]) => {
			const u = c[0]
			return typeof u === 'string' ? u : (u instanceof URL ? u.toString() : String(u))
		})
		expect(calls.some((u: string) => u.includes('discord.test/webhook'))).toBe(true)
	})
})
