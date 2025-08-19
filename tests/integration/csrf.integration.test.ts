/** @jest-environment node */
// CSRFミドルウェアの統合テスト（Alerts API を対象）

import { createMocks } from 'node-mocks-http'
import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// サーバー側実装の利用
import { createCsrfToken, getCsrfCookieName } from '@/lib/security/csrf'

jest.mock('@supabase/supabase-js')

describe('CSRF protection (Alerts API)', () => {
  const mockSupabase = {
    auth: {
      getUser: jest.fn(),
    },
    from: jest.fn(),
    rpc: jest.fn(),
  }

  beforeAll(() => {
    process.env.CSRF_SECRET = 'test-secret'
  })

  beforeEach(() => {
    jest.clearAllMocks()
    ;(createClient as jest.MockedFunction<typeof createClient>).mockReturnValue(mockSupabase as any)
  })

  it('POST without CSRF headers returns 403', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'u1' } }, error: null })

    const { POST } = await import('@/app/api/alerts/route')

    const { req } = createMocks({
      method: 'POST',
      headers: {
        authorization: 'Bearer test-token',
        'content-type': 'application/json',
      },
      body: {
        type: 'price_below',
        symbol: 'BTC',
        threshold: 40000,
      },
    })

    const res = await POST(req as NextRequest)
    expect(res.status).toBe(403)
  })

  it('POST with valid CSRF header+cookie succeeds (not 403)', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'u1' } }, error: null })

    const { POST } = await import('@/app/api/alerts/route')

    const token = createCsrfToken()
    const cookieName = getCsrfCookieName()

    const { req } = createMocks({
      method: 'POST',
      headers: {
        authorization: 'Bearer test-token',
        'content-type': 'application/json',
        'x-csrf-token': token,
        cookie: `${cookieName}=${token}`,
      },
      body: {
        type: 'price_below',
        symbol: 'BTC',
        threshold: 40000,
      },
    })

    const res = await POST(req as NextRequest)
    expect(res.status).not.toBe(403)
  })
})
