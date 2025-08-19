import { NextRequest } from 'next/server'

describe('alerts test endpoint', () => {
	it('POST /api/alerts/test sends discord in test env without auth', async () => {
		process.env.METRICS_ENABLED = 'true'
		process.env.NODE_ENV = 'test'
		process.env.ALERTS_WEBHOOK_TARGET = 'discord'
		process.env.DISCORD_WEBHOOK_URL = 'https://discord.test/webhook'
		// @ts-expect-error jest override
		global.fetch = jest.fn(async () => ({ ok: true }))
		const mod = await import('@/app/api/alerts/test/route')
		const { POST } = mod as unknown as { POST: (req: NextRequest) => Promise<Response> }
		const req = new Request('http://localhost/api/alerts/test', { method: 'POST', body: JSON.stringify({ target: 'discord', message: 'hello' }) }) as unknown as NextRequest
		const res = await POST(req)
		expect(res.status).toBe(200)
		// @ts-expect-error jest access
		expect(global.fetch).toHaveBeenCalled()
	})
})
