import { NextRequest } from 'next/server'
import { createHmac } from 'node:crypto'

// CSRF token format: base64(payload).hex(hmac)
// payload = JSON.stringify({ ts, nonce })

const CSRF_HEADER = 'x-csrf-token'
const CSRF_COOKIE = 'csrf_token'
const MAX_AGE_MS = 2 * 60 * 60 * 1000 // 2 hours

function getSecret(): string {
  const secret = process.env.CSRF_SECRET
  if (!secret) {
    throw new Error('CSRF_SECRET is required')
  }
  return secret
}

function hmacSha256Hex(data: string, secret: string): string {
  // 同期HMAC生成（テスト互換のため非async化）
  return createHmac('sha256', Buffer.from(secret)).update(data).digest('hex')
}

export function createCsrfToken(): string {
  const payload = {
    ts: Date.now(),
    nonce: Math.random().toString(36).slice(2),
  }
  const payloadB64 = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64')
  const sig = hmacSha256Hex(payloadB64, getSecret())
  return `${payloadB64}.${sig}`
}

export function verifyCsrfToken(token: string): boolean {
  if (!token || typeof token !== 'string' || !token.includes('.')) return false
  const [payloadB64, sig] = token.split('.')
  const expected = hmacSha256Hex(payloadB64, getSecret())
  if (sig !== expected) return false
  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64').toString('utf8'))
    if (typeof payload.ts !== 'number') return false
    if (Date.now() - payload.ts > MAX_AGE_MS) return false
    return true
  } catch {
    return false
  }
}

export function getRequestCsrfPair(req: NextRequest): { cookieToken?: string; headerToken?: string } {
  // header (case-insensitive)
  const headerToken = req.headers.get(CSRF_HEADER) || req.headers.get(CSRF_HEADER.toUpperCase()) || undefined

  // cookie from NextRequest.cookies or raw Cookie header
  let cookieToken: string | undefined = undefined
  try {
    cookieToken = req.cookies.get(CSRF_COOKIE)?.value
  } catch {}

  if (!cookieToken) {
    const rawCookie = req.headers.get('cookie') || req.headers.get('Cookie')
    if (rawCookie) {
      const parts = rawCookie.split(';').map((s) => s.trim())
      for (const part of parts) {
        const idx = part.indexOf('=')
        if (idx > 0) {
          const name = part.slice(0, idx)
          const val = part.slice(idx + 1)
          if (name === CSRF_COOKIE) {
            cookieToken = val
            break
          }
        }
      }
    }
  }

  return { cookieToken, headerToken }
}

export function validateRequestCsrf(req: NextRequest): Promise<boolean> | boolean {
  const method = req.method.toUpperCase()
  if (['GET', 'HEAD', 'OPTIONS'].includes(method)) return true
  try {
    const { cookieToken, headerToken } = getRequestCsrfPair(req)
    if (!cookieToken || !headerToken) return false
    if (cookieToken !== headerToken) return false
    return verifyCsrfToken(headerToken)
  } catch {
    return false
  }
}

export function getCsrfCookieName(): string {
  return CSRF_COOKIE
}

// Additional exports for compatibility
export function generateCsrfToken(): { token: string; cookie: string } {
  const token = createCsrfToken();
  const cookie = `${CSRF_COOKIE}=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${Math.floor(MAX_AGE_MS / 1000)}`;
  return { token, cookie };
}

export const CSRF_HEADERS = {
  TOKEN_HEADER: CSRF_HEADER,
  COOKIE_NAME: CSRF_COOKIE
};
