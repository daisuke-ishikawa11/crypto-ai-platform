// Node 20+ required
const BASE = process.env.ALERTS_BASE_URL
const KEY = process.env.ALERTS_INTERNAL_API_KEY
const TO = process.argv[2]

if (!BASE || !KEY) {
  console.error('Missing ALERTS_BASE_URL or ALERTS_INTERNAL_API_KEY')
  process.exit(2)
}
if (!TO) {
  console.error('Usage: node scripts/smoke/alerts-service-send-and-process.mjs "recipient@example.com"')
  process.exit(2)
}

const headers = { 'x-internal-key': KEY, 'content-type': 'application/json' }

async function post(path, body) {
  const url = `${BASE}${path}`
  const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`${path} failed: ${res.status} ${JSON.stringify(data)}`)
  return data
}

;(async () => {
  try {
    const send = await post('/api/notifications/send', {
      channel: 'email',
      to: TO,
      subject: 'Smoke Test',
      text: 'This is a smoke test',
      tags: ['smoke'],
    })
    console.log('Queued:', send)

    const proc = await post('/api/notifications/process?limit=1')
    console.log('Processed:', proc)
    console.log('Smoke OK')
  } catch (e) {
    console.error(String(e instanceof Error ? e.message : e))
    process.exit(1)
  }
})()


