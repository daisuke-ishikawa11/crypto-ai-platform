import { sendSlackWebhook, sendDiscordWebhook, __resetAlertingLimiterForTests } from '@/lib/monitoring/alerting'
import { renderPrometheus } from '@/lib/monitoring/metrics'

describe('alerting metrics (slack)', () => {
	const originalEnv = process.env
	beforeEach(() => {
		jest.resetModules()
		process.env = { ...originalEnv, METRICS_ENABLED: 'true' }
		// @ts-expect-error jest override
		global.fetch = jest.fn(async () => ({ ok: true }))
		__resetAlertingLimiterForTests()
	})

	afterEach(() => {
		process.env = originalEnv
	})

	it('counts success and duration', async () => {
		await sendSlackWebhook('https://hooks.slack.test/xxx', 'hello', { test: 'ok' }, { maxRetries: 0 })
		const out = renderPrometheus()
		expect(out).toMatch(/alerts_send_total\{.*channel=slack.*outcome=success.*\} 1/)
		expect(out).toMatch(/alerts_send_duration_seconds_bucket/)
	})

	it('counts errors and retries', async () => {
		// fail twice then succeed
		let call = 0
		// @ts-expect-error jest override
		global.fetch = jest.fn(async () => {
			call++
			if (call < 3) return { ok: false, status: 500 }
			return { ok: true }
		})
		await sendSlackWebhook('https://hooks.slack.test/xxx', 'hello', { flow: 'retry' }, { maxRetries: 2, retryDelayMs: 0 })
		const out = renderPrometheus()
		expect(out).toMatch(/alerts_send_retry_attempts_total\{.*reason=http.*status=500.*\} 2/)
		expect(out).toMatch(/alerts_send_total\{.*outcome=success.*\} 1/)
	})

	it('discord: success and retry with 429 handling', async () => {
		let call = 0
		// @ts-expect-error jest override
		global.fetch = jest.fn(async () => {
			call++
			if (call === 1) return { ok: false, status: 429, headers: { get: () => '0' } }
			if (call === 2) return { ok: false, status: 500 }
			return { ok: true }
		})
		await sendDiscordWebhook('https://discord.test/xxx', 'hello', { test: 'discord' }, { maxRetries: 2, retryDelayMs: 0 })
		const out = renderPrometheus()
		expect(out).toMatch(/alerts_send_retry_attempts_total\{.*channel=discord.*status=429.*\} 1/)
		expect(out).toMatch(/alerts_send_retry_attempts_total\{.*channel=discord.*status=500.*\} 1/)
		expect(out).toMatch(/alerts_send_total\{.*channel=discord.*outcome=success.*\} 1/)
	})

	it('enforces message length and counts truncation', async () => {
		process.env.METRICS_ENABLED = 'true'
		process.env.ALERTS_DISCORD_MAX_LENGTH = '10'
		// @ts-expect-error jest override
		global.fetch = jest.fn(async (url: string, init: any) => {
			const body = JSON.parse(init.body)
			expect(body.content.length).toBeLessThanOrEqual(10)
			return { ok: true }
		})
		await sendDiscordWebhook('https://discord.test/xxx', '123456789012345', { t: 'len' }, { maxRetries: 0 })
		const out = renderPrometheus()
		expect(out).toMatch(/alerts_message_truncated_total\{.*channel=discord.*\} 1/)
	})

	it('drops by rate limit and cooldown', async () => {
		process.env.ALERTS_RATE_LIMIT_MAX_PER_MINUTE = '1'
		process.env.ALERTS_GLOBAL_COOLDOWN_SEC = '60'
		await sendDiscordWebhook('https://discord.test/xxx', 'm1', { k: 'v' }, { maxRetries: 0 })
		await sendDiscordWebhook('https://discord.test/xxx', 'm2', { k: 'v' }, { maxRetries: 0 })
		const out = renderPrometheus()
		expect(out).toMatch(/alerts_send_total\{.*channel=discord.*outcome=success.*\} 1/)
		expect(out).toMatch(/alerts_dropped_total\{.*channel=discord.*reason=(rate_limit|cooldown).*\} 1/)
	})

	it('drops by quiet hours', async () => {
		process.env.ALERTS_RATE_LIMIT_MAX_PER_MINUTE = ''
		process.env.ALERTS_GLOBAL_COOLDOWN_SEC = ''
		process.env.ALERTS_DND_WINDOW = '00:00-23:59'
		await sendSlackWebhook('https://slack.test/xxx', 'm', { t: 'quiet' }, { maxRetries: 0 })
		const out = renderPrometheus()
		expect(out).toMatch(/alerts_dropped_total\{.*channel=slack.*reason=quiet_hours.*\} 1/)
	})

	it('critical bypasses DND', async () => {
		process.env.ALERTS_DND_WINDOW = '00:00-23:59'
		// @ts-expect-error jest override
		global.fetch = jest.fn(async () => ({ ok: true }))
		await sendSlackWebhook('https://slack.test/xxx', 'critical', { t: 'crit' }, { maxRetries: 0, severity: 'critical' })
		const out = renderPrometheus()
		expect(out).toMatch(/alerts_send_total\{.*channel=slack.*outcome=success.*\} 1/)
	})

	it('skips when url empty', async () => {
		await sendSlackWebhook('', 'hello')
		const out = renderPrometheus()
		expect(out).toMatch(/alerts_send_total\{.*outcome=skipped.*\} 1/)
	})
})
