/** @jest-environment jsdom */
import { apiFetch } from '../../src/lib/api/fetcher'
import * as csrfClient from '../../src/lib/api/csrf-client'

describe('apiFetch CSRF integration', () => {
  const originalFetch = global.fetch as unknown as typeof fetch;

  beforeEach(() => {
    jest.resetAllMocks();
  })

  afterAll(() => {
    global.fetch = originalFetch
  })

  it('attaches x-csrf-token header for POST requests', async () => {
    jest.spyOn(csrfClient, 'withCsrfHeaders').mockResolvedValue({ 'x-csrf-token': 'test-token' })
    global.fetch = jest.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }))

    const res = await apiFetch('/api/test', { method: 'POST', body: { a: 1 } })
    expect(res.status).toBe(200)
    const call = (global.fetch as jest.Mock).mock.calls[0]
    const init = call[1] as RequestInit
    const headers = init.headers as Record<string, string>
    expect(headers['x-csrf-token']).toBe('test-token')
    const sentBody = (init as { body?: unknown }).body
    if (typeof sentBody === 'string') {
      expect(sentBody).toBe(JSON.stringify({ a: 1 }))
    } else {
      expect(sentBody).toEqual({ a: 1 })
    }
  })

  it('retries once on 403 with refreshed token', async () => {
    const withCsrfSpy = jest.spyOn(csrfClient, 'withCsrfHeaders')
    withCsrfSpy.mockResolvedValueOnce({ 'x-csrf-token': 'expired' })
    withCsrfSpy.mockResolvedValueOnce({ 'x-csrf-token': 'refreshed' })

    const first = new Response(JSON.stringify({ error: 'forbidden' }), { status: 403 })
    const second = new Response(JSON.stringify({ ok: true }), { status: 200 })
    global.fetch = jest.fn()
      .mockResolvedValueOnce(first)
      .mockResolvedValueOnce(second)

    const res = await apiFetch('/api/test', { method: 'POST', body: { b: 2 } })
    expect(res.status).toBe(200)
    expect((global.fetch as jest.Mock).mock.calls.length).toBe(2)
  })
})
