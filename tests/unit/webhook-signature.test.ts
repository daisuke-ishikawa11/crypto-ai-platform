import { verifyProviderSignature, verifyResendSignature, verifySendGridSignature, verifyTwilioSignature } from '../../src/lib/notifications/webhook-signature'
import { webcrypto as nodeWebCrypto } from 'crypto'

function headers(init: Record<string, string>): Headers {
	const h = new Headers()
	Object.entries(init).forEach(([k, v]) => h.set(k, v))
	return h
}

describe('notifications/webhook-signature', () => {
	const ORIGINAL_ENV = process.env
	beforeEach(() => {
		process.env = { ...ORIGINAL_ENV }
	})
	beforeAll(() => {
		// Polyfill Web Crypto for Jest environment
		if (!globalThis.crypto || !globalThis.crypto.subtle) {
			// @ts-expect-error assign webcrypto
			globalThis.crypto = nodeWebCrypto
		}
	})
	afterAll(() => {
		process.env = ORIGINAL_ENV
	})

	it('returns false when signature header missing', async () => {
		const result = await verifyProviderSignature(headers({}), 'body', 'http://localhost', 'resend')
		expect(result).toBe(false)
	})

	it('verifies Resend HMAC signature', async () => {
		process.env.RESEND_WEBHOOK_SECRET = 'secret123'
		const ts = '1723590000'
		const rawBody = '{"ok":true}'
		const payload = `${ts}.${rawBody}`
		const encoder = new TextEncoder()
		const key = await nodeWebCrypto.subtle.importKey('raw', encoder.encode('secret123'), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
		const sigBytes = await nodeWebCrypto.subtle.sign('HMAC', key, encoder.encode(payload))
		const expected = Array.from(new Uint8Array(sigBytes)).map(b => b.toString(16).padStart(2, '0')).join('')
		const ok = await verifyResendSignature(headers({ 'x-timestamp': ts }), rawBody, expected)
		expect(ok).toBe(true)
	})

	it('verifies SendGrid signature (fallback HMAC path)', async () => {
		process.env.SENDGRID_WEBHOOK_PUBLIC_KEYS = 'pubkey,otherkey'
		const ts = '1723590000'
		const rawBody = '[{"event":"open"}]'
		const encoder = new TextEncoder()
		const key = await nodeWebCrypto.subtle.importKey('raw', encoder.encode('pubkey'), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
		const sig = await nodeWebCrypto.subtle.sign('HMAC', key, encoder.encode(`${ts}.${rawBody}`))
		const expectedB64 = Buffer.from(new Uint8Array(sig)).toString('base64')
		const ok = await verifySendGridSignature(headers({ 'x-sendgrid-timestamp': ts }), rawBody, expectedB64)
		expect(ok).toBe(true)
	})

	it('SendGrid strict mode: does not fallback when official lib missing', async () => {
		jest.resetModules()
		process.env.SENDGRID_WEBHOOK_PUBLIC_KEYS = 'pubkey'
		process.env.SENDGRID_WEBHOOK_STRICT = 'true'
		const ts = '1723590000'
		const rawBody = '[{"event":"open"}]'
		const encoder = new TextEncoder()
		const key = await nodeWebCrypto.subtle.importKey('raw', encoder.encode('pubkey'), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
		const sig = await nodeWebCrypto.subtle.sign('HMAC', key, encoder.encode(`${ts}.${rawBody}`))
		const expectedB64 = Buffer.from(new Uint8Array(sig)).toString('base64')
		const ok = await verifySendGridSignature(headers({ 'x-sendgrid-timestamp': ts }), rawBody, expectedB64)
		expect(ok).toBe(false)
	})

	it('verifies Twilio signature using library', async () => {
		jest.resetModules()
		jest.doMock('twilio', () => ({ validateRequest: () => true }))
		process.env.TWILIO_AUTH_TOKEN = 'token'
		const ok = await verifyTwilioSignature(headers({}), 'http://localhost', 'sig')
		expect(ok).toBe(true)
	})
})
