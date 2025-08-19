import { logger } from '@/lib/monitoring/logger'
import { webcrypto as nodeWebCrypto } from 'crypto'

function getSubtle(): SubtleCrypto {
	// Prefer global Web Crypto if available (e.g., Edge Runtime, modern Node with global crypto)
	if (typeof globalThis.crypto !== 'undefined' && typeof globalThis.crypto.subtle !== 'undefined') {
		return globalThis.crypto.subtle
	}
	// Node.js の webcrypto.subtle は SubtleCrypto 型と完全な互換性がない場合があるため、最小互換の型で扱う
	return (nodeWebCrypto.subtle as unknown) as SubtleCrypto
}

export async function verifyProviderSignature(
	headers: Headers,
	rawBody: string,
	url: string,
	provider: string
): Promise<boolean> {
	const signature =
		headers.get('x-signature')
		|| headers.get('x-twilio-signature')
		|| headers.get('x-sendgrid-signature')
		|| headers.get('x-twilio-email-event-webhook-signature')

	if (!signature) return false

	try {
		switch (provider.toLowerCase()) {
			case 'resend':
				return await verifyResendSignature(headers, rawBody, signature)
			case 'sendgrid':
				return await verifySendGridSignature(headers, rawBody, signature)
			case 'twilio':
				return await verifyTwilioSignature(headers, url, signature)
			default:
				return false
		}
	} catch (error) {
		logger.error('Signature verification failed', { provider, error })
		return false
	}
}

export async function verifyResendSignature(headers: Headers, rawBody: string, signature: string): Promise<boolean> {
	const secret = process.env.RESEND_WEBHOOK_SECRET
	if (!secret) return false

	const timestamp = headers.get('x-timestamp') || ''
	const payload = `${timestamp}.${rawBody}`

	const encoder = new TextEncoder()
	const subtle = getSubtle()
	const key = await subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
	const signatureBytes = await subtle.sign('HMAC', key, encoder.encode(payload))
	const expectedSignature = Array.from(new Uint8Array(signatureBytes)).map(b => b.toString(16).padStart(2, '0')).join('')
	return signature === expectedSignature
}

export async function verifySendGridSignature(headers: Headers, rawBody: string, signature: string): Promise<boolean> {
	try {
		const timestamp = headers.get('x-twilio-email-event-webhook-timestamp')
			|| headers.get('x-sendgrid-timestamp')
			|| headers.get('x-timestamp')
		// Support multiple keys: SENDGRID_WEBHOOK_PUBLIC_KEYS (comma-separated) > SENDGRID_WEBHOOK_PUBLIC_KEY
		const keysEnv = (process.env.SENDGRID_WEBHOOK_PUBLIC_KEYS || process.env.SENDGRID_WEBHOOK_PUBLIC_KEY || '').trim()
		if (!keysEnv || !timestamp) return false
		const publicKeys = keysEnv.split(',').map(k => k.trim()).filter(k => k.length > 0)
		const strict = String(process.env.SENDGRID_WEBHOOK_STRICT || '').toLowerCase() === 'true'

		try {
			type EventWebhookVerifier = new () => { verifySignature: (publicKey: string, payload: string, signature: string, timestamp: string) => boolean }
			const mod = await import('@sendgrid/eventwebhook')
			const ctor = (mod as { EventWebhook?: EventWebhookVerifier }).EventWebhook
			if (!ctor) return false
			const verifier = new ctor()
			for (const key of publicKeys) {
				const ok = verifier.verifySignature(key, rawBody, signature, timestamp)
				if (ok) return true
			}
			return false
		} catch {
			// In strict mode, do NOT allow fallback
			if (strict) return false
			// Fallback: HMAC(simple) using publicKey as secret (not equivalent to Ed25519)
			const encoder = new TextEncoder()
			const subtle = getSubtle()
			for (const keyStr of publicKeys) {
				const key = await subtle.importKey('raw', encoder.encode(keyStr), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
				const expected = await subtle.sign('HMAC', key, encoder.encode(`${timestamp}.${rawBody}`))
				const expectedB64 = Buffer.from(new Uint8Array(expected)).toString('base64')
				if (expectedB64 === signature) return true
			}
			return false
		}
	} catch (e) {
		logger.error('SendGrid signature verification error', { error: e instanceof Error ? e.message : String(e) })
		return false
	}
}

export async function verifyTwilioSignature(_headers: Headers, url: string, signature: string): Promise<boolean> {
	const authToken = process.env.TWILIO_AUTH_TOKEN
	if (!authToken) return false
	const body: Record<string, unknown> = {}
	const twilio = await import('twilio')
	return twilio.validateRequest(authToken, signature, url, body)
}
