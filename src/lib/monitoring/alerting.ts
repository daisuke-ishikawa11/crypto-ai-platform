import { logger } from '@/lib/monitoring/logger'
import { incCounter, isMetricsEnabled, startTimer } from '@/lib/monitoring/metrics'

type LabelRecord = Record<string, string>

interface SlackSendOptions {
	maxRetries?: number
	retryDelayMs?: number
	severity?: 'critical' | 'high' | 'normal' | 'low'
	bypassDnd?: boolean
}

// Simple in-process rate limiting and cooldown to avoid alert floods
const rateWindowMs = 60_000
const rateMap: Map<string, number[]> = new Map()
const lastSentAtMap: Map<string, number> = new Map()

function stableKey(labels: LabelRecord): string {
	const entries = Object.entries(labels).sort(([a], [b]) => a.localeCompare(b))
	return entries.map(([k, v]) => `${k}=${v}`).join(',')
}

function shouldSendAlert(channel: 'slack' | 'discord', labels: LabelRecord): { allow: boolean; reason?: 'rate_limit' | 'cooldown' } {
	const maxPerMinute = Number(process.env.ALERTS_RATE_LIMIT_MAX_PER_MINUTE ?? 0)
	const cooldownSec = Number(process.env.ALERTS_GLOBAL_COOLDOWN_SEC ?? 0)
	if (!Number.isFinite(maxPerMinute) || maxPerMinute <= 0) {
		// no rate limit configured
		if (!Number.isFinite(cooldownSec) || cooldownSec <= 0) return { allow: true }
	}
	const baseLabels: LabelRecord = { channel, ...(labels || {}) }
	const key = stableKey(baseLabels)
	const now = Date.now()
	// cooldown check
	if (Number.isFinite(cooldownSec) && cooldownSec > 0) {
		const last = lastSentAtMap.get(key) || 0
		if (now - last < cooldownSec * 1000) return { allow: false, reason: 'cooldown' }
	}
	// rate limit check per minute
	if (Number.isFinite(maxPerMinute) && maxPerMinute > 0) {
		const arr = rateMap.get(key) || []
		const cutoff = now - rateWindowMs
		const pruned = arr.filter((t) => t >= cutoff)
		if (pruned.length >= maxPerMinute) return { allow: false, reason: 'rate_limit' }
	}
	return { allow: true }
}

function recordSendTimestamp(channel: 'slack' | 'discord', labels: LabelRecord): void {
	const baseLabels: LabelRecord = { channel, ...(labels || {}) }
	const key = stableKey(baseLabels)
	const now = Date.now()
	const arr = rateMap.get(key) || []
	const cutoff = now - rateWindowMs
	const pruned = arr.filter((t) => t >= cutoff)
	pruned.push(now)
	rateMap.set(key, pruned)
	lastSentAtMap.set(key, now)
}

// For tests: reset internal limiter state
export function __resetAlertingLimiterForTests(): void {
	rateMap.clear()
	lastSentAtMap.clear()
}

function isWithinQuietHours(): boolean {
	const win = (process.env.ALERTS_DND_WINDOW || '').trim()
	if (!win) return false
	const m = win.match(/^([0-2]\d):([0-5]\d)\s*-\s*([0-2]\d):([0-5]\d)$/)
	if (!m) return false
	const now = new Date()
	const cur = now.getHours() * 60 + now.getMinutes()
	const start = Number(m[1]) * 60 + Number(m[2])
	const end = Number(m[3]) * 60 + Number(m[4])
	if (start === end) return true
	if (start < end) {
		return cur >= start && cur < end
	}
	// overnight window
	return cur >= start || cur < end
}

function enforceLength(channel: 'slack'|'discord', rawText: string): { text: string; truncated: boolean } {
	const defaultMax = channel === 'discord' ? 1800 : 3000
	const max = Number((channel === 'discord' ? process.env.ALERTS_DISCORD_MAX_LENGTH : process.env.ALERTS_SLACK_MAX_LENGTH) ?? defaultMax)
	if (!Number.isFinite(max) || max <= 0) return { text: rawText, truncated: false }
	if (rawText.length <= max) return { text: rawText, truncated: false }
	return { text: rawText.slice(0, max - 3) + '...', truncated: true }
}

export async function sendSlackWebhook(
	webhookUrl: string,
	text: string,
	labels?: LabelRecord,
	options?: SlackSendOptions
): Promise<void> {
	const severity = options?.severity || 'normal'
	const mergedLabels: LabelRecord = { channel: 'slack', severity, ...(labels || {}) }
	const stopTimer = startTimer('alerts_send_duration_seconds', mergedLabels)
	const maxRetries = Number(options?.maxRetries ?? process.env.ALERTS_SLACK_MAX_RETRIES ?? 0)
	const baseDelay = Number(options?.retryDelayMs ?? process.env.ALERTS_SLACK_RETRY_DELAY_MS ?? 300)

	if (!webhookUrl) {
		try { if (isMetricsEnabled()) incCounter('alerts_send_total', { ...mergedLabels, outcome: 'skipped' }) } catch {}
		stopTimer()
		return
	}

	// quiet hours (bypass on critical or explicit bypass)
	if (!options?.bypassDnd && severity !== 'critical' && isWithinQuietHours()) {
		try { if (isMetricsEnabled()) incCounter('alerts_dropped_total', { ...mergedLabels, reason: 'quiet_hours' }) } catch {}
		stopTimer()
		return
	}

	// Rate limit / cooldown preflight
	const pre = shouldSendAlert('slack', mergedLabels)
	if (!pre.allow) {
		try { if (isMetricsEnabled()) incCounter('alerts_dropped_total', { ...mergedLabels, reason: pre.reason || 'rate_limit' }) } catch {}
		stopTimer()
		return
	}

	// message length enforcement
	const enforced = enforceLength('slack', text)
	if (enforced.truncated) {
		try { if (isMetricsEnabled()) incCounter('alerts_message_truncated_total', { channel: 'slack' }) } catch {}
	}

	let attempt = 0
	let lastError: unknown = null

	while (attempt <= maxRetries) {
		attempt++
		try {
			const resp = await fetch(webhookUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ text: enforced.text })
			})
			if (resp.ok) {
				try { if (isMetricsEnabled()) incCounter('alerts_send_total', { ...mergedLabels, outcome: 'success' }) } catch {}
				recordSendTimestamp('slack', mergedLabels)
				stopTimer()
				return
			}
			// Slack 429 with Retry-After support
			if (resp.status === 429 && attempt <= maxRetries) {
				try { if (isMetricsEnabled()) incCounter('alerts_send_retry_attempts_total', { ...mergedLabels, reason: 'http', status: '429' }) } catch {}
				const retryAfterHeader = (resp.headers && typeof resp.headers.get === 'function') ? resp.headers.get('retry-after') : null
				const retryAfter = Number(retryAfterHeader || 0)
				const delay = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : baseDelay * Math.pow(2, attempt - 1)
				await new Promise((r) => setTimeout(r, delay))
				continue
			}
			lastError = new Error(`HTTP ${resp.status}`)
			if (attempt <= maxRetries) {
				try { if (isMetricsEnabled()) incCounter('alerts_send_retry_attempts_total', { ...mergedLabels, reason: 'http', status: String(resp.status) }) } catch {}
				const delay = baseDelay * Math.pow(2, attempt - 1)
				await new Promise((r) => setTimeout(r, delay))
				continue
			}
			try {
				if (isMetricsEnabled()) {
					incCounter('alerts_send_total', { ...mergedLabels, outcome: 'error' })
					incCounter('alerts_send_errors_total', { ...mergedLabels, reason: 'http', status: String(resp.status) })
				}
			} catch {}
			stopTimer()
			return
		} catch (error) {
			lastError = error
			if (attempt <= maxRetries) {
				try { if (isMetricsEnabled()) incCounter('alerts_send_retry_attempts_total', { ...mergedLabels, reason: 'exception' }) } catch {}
				const delay = baseDelay * Math.pow(2, attempt - 1)
				await new Promise((r) => setTimeout(r, delay))
				continue
			}
			try {
				if (isMetricsEnabled()) {
					incCounter('alerts_send_total', { ...mergedLabels, outcome: 'error' })
					incCounter('alerts_send_errors_total', { ...mergedLabels, reason: 'exception' })
				}
			} catch {}
			logger.error('Failed to send Slack webhook', {
				error: error instanceof Error ? error.message : String(error)
			})
			stopTimer()
			return
		}
	}

	// Fallback
	try {
		if (isMetricsEnabled()) {
			incCounter('alerts_send_total', { ...mergedLabels, outcome: 'error' })
			incCounter('alerts_send_errors_total', { ...mergedLabels, reason: 'unknown' })
		}
	} catch {}
	if (lastError) {
		logger.error('Failed to send Slack webhook', {
			error: lastError instanceof Error ? lastError.message : String(lastError)
		})
	}
	stopTimer()
}

export async function sendDiscordWebhook(
	webhookUrl: string,
	content: string,
	labels?: LabelRecord,
	options?: SlackSendOptions
): Promise<void> {
	const severity = options?.severity || 'normal'
	const mergedLabels: LabelRecord = { channel: 'discord', severity, ...(labels || {}) }
	const stopTimer = startTimer('alerts_send_duration_seconds', mergedLabels)
	const maxRetries = Number(options?.maxRetries ?? process.env.ALERTS_DISCORD_MAX_RETRIES ?? process.env.ALERTS_SLACK_MAX_RETRIES ?? 0)
	const baseDelay = Number(options?.retryDelayMs ?? process.env.ALERTS_DISCORD_RETRY_DELAY_MS ?? process.env.ALERTS_SLACK_RETRY_DELAY_MS ?? 300)

	if (!webhookUrl) {
		try { if (isMetricsEnabled()) incCounter('alerts_send_total', { ...mergedLabels, outcome: 'skipped' }) } catch {}
		stopTimer()
		return
	}

	// quiet hours
	if (!options?.bypassDnd && severity !== 'critical' && isWithinQuietHours()) {
		try { if (isMetricsEnabled()) incCounter('alerts_dropped_total', { ...mergedLabels, reason: 'quiet_hours' }) } catch {}
		stopTimer()
		return
	}

	// Rate limit / cooldown preflight
	const pre = shouldSendAlert('discord', mergedLabels)
	if (!pre.allow) {
		try { if (isMetricsEnabled()) incCounter('alerts_dropped_total', { ...mergedLabels, reason: pre.reason || 'rate_limit' }) } catch {}
		stopTimer()
		return
	}

	// message length enforcement
	const enforced = enforceLength('discord', content)
	if (enforced.truncated) {
		try { if (isMetricsEnabled()) incCounter('alerts_message_truncated_total', { channel: 'discord' }) } catch {}
	}

	let attempt = 0
	let lastError: unknown = null

	while (attempt <= maxRetries) {
		attempt++
		try {
			const resp = await fetch(webhookUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ content: enforced.text })
			})
			if (resp.ok) {
				try { if (isMetricsEnabled()) incCounter('alerts_send_total', { ...mergedLabels, outcome: 'success' }) } catch {}
				recordSendTimestamp('discord', mergedLabels)
				stopTimer()
				return
			}
			// レート制限 (429) 対応: Retry-After 優先
			if (resp.status === 429 && attempt <= maxRetries) {
				try { if (isMetricsEnabled()) incCounter('alerts_send_retry_attempts_total', { ...mergedLabels, reason: 'http', status: '429' }) } catch {}
				const retryAfterHeader = (resp.headers && typeof resp.headers.get === 'function') ? resp.headers.get('retry-after') : null
				const retryAfter = Number(retryAfterHeader || 0)
				const delay = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : baseDelay * Math.pow(2, attempt - 1)
				await new Promise((r) => setTimeout(r, delay))
				continue
			}
			lastError = new Error(`HTTP ${resp.status}`)
			if (attempt <= maxRetries) {
				try { if (isMetricsEnabled()) incCounter('alerts_send_retry_attempts_total', { ...mergedLabels, reason: 'http', status: String(resp.status) }) } catch {}
				const delay = baseDelay * Math.pow(2, attempt - 1)
				await new Promise((r) => setTimeout(r, delay))
				continue
			}
			try {
				if (isMetricsEnabled()) {
					incCounter('alerts_send_total', { ...mergedLabels, outcome: 'error' })
					incCounter('alerts_send_errors_total', { ...mergedLabels, reason: 'http', status: String(resp.status) })
				}
			} catch {}
			stopTimer()
			return
		} catch (error) {
			lastError = error
			if (attempt <= maxRetries) {
				try { if (isMetricsEnabled()) incCounter('alerts_send_retry_attempts_total', { ...mergedLabels, reason: 'exception' }) } catch {}
				const delay = baseDelay * Math.pow(2, attempt - 1)
				await new Promise((r) => setTimeout(r, delay))
				continue
			}
			try {
				if (isMetricsEnabled()) {
					incCounter('alerts_send_total', { ...mergedLabels, outcome: 'error' })
					incCounter('alerts_send_errors_total', { ...mergedLabels, reason: 'exception' })
				}
			} catch {}
			logger.error('Failed to send Discord webhook', {
				error: error instanceof Error ? error.message : String(error)
			})
			stopTimer()
			return
		}
	}

	try {
		if (isMetricsEnabled()) {
			incCounter('alerts_send_total', { ...mergedLabels, outcome: 'error' })
			incCounter('alerts_send_errors_total', { ...mergedLabels, reason: 'unknown' })
		}
	} catch {}
	if (lastError) {
		logger.error('Failed to send Discord webhook', {
			error: lastError instanceof Error ? lastError.message : String(lastError)
		})
	}
	stopTimer()
}
