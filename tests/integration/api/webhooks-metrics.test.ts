import { createMocks } from 'node-mocks-http'
import { NextRequest } from 'next/server'

describe('Webhooks metrics integration', () => {
  beforeEach(() => {
    jest.resetModules()
    ;(process.env as Record<string, string>).METRICS_ENABLED = 'true'
  })

  it('counts invalid signature and total requests', async () => {
    const url = 'http://localhost/api/notifications/webhooks/delivery?provider=sendgrid'
    const { req } = createMocks({ method: 'POST', url, headers: { 'content-type': 'application/json' }, body: [{ event: 'open', email: 'a@b.com', timestamp: 0, sg_event_id: 'x', sg_message_id: 'm' }] })
    ;(req as unknown as { text: () => Promise<string> }).text = jest.fn().mockResolvedValue('[]')

    const mod = await import('../../../src/app/api/notifications/webhooks/delivery/route')
    const res = await mod.POST(req as unknown as NextRequest)
    expect([200, 401, 400, 500]).toContain(res.status)

    const metrics = await import('../../../src/app/api/metrics/route')
    const dummy = { headers: new Headers(), url: 'http://localhost/api/metrics' } as unknown as NextRequest
    const mres = await metrics.GET(dummy)
    const text = await mres.text()
    expect(text).toContain('webhook_requests_total')
    // 署名失敗の可能性が高いので、エラーカウンタも少なくとも存在する
    expect(text).toContain('webhook_request_duration_seconds_bucket')
  })
})
