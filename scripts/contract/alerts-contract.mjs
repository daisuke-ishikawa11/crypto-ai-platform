// Contract test for alerts-service (with cache header assertions)
// Requires: ALERTS_BASE_URL, ALERTS_INTERNAL_API_KEY
import { setTimeout as delay } from 'timers/promises'

const BASE = process.env.ALERTS_BASE_URL
const KEY = process.env.ALERTS_INTERNAL_API_KEY
if (!BASE || !KEY) {
  console.error('Missing ALERTS_BASE_URL or ALERTS_INTERNAL_API_KEY')
  process.exit(2)
}
const headers = { 'x-internal-key': KEY, 'content-type': 'application/json' }

function assert(cond, msg) { if (!cond) throw new Error(`Contract failed: ${msg}`) }
async function json(res) { const body = await res.json().catch(async () => ({ raw: await res.text() })); return body }
function getSMaxage(res) { const h = res.headers.get('cache-control') || ''; const m = /s-maxage=(\d+)/i.exec(h); return m ? parseInt(m[1], 10) : null }

async function run() {
  // health (min 15s)
  {
    const res = await fetch(`${BASE}/api/health`, { headers })
    const body = await json(res)
    assert(res.ok, `health status ${res.status}`)
    assert(body && typeof body === 'object' && body.success === true, 'health success flag')
    const smax = getSMaxage(res)
    assert(smax !== null && smax >= 15, `health cache s-maxage ${smax}`)
  }

  // send -> process -> get (not cached; no header assert for send/process)
  let id
  {
    const res = await fetch(`${BASE}/api/notifications/send`, { method: 'POST', headers, body: JSON.stringify({ channel: 'email', to: 'contract@example.com', subject: 'Contract', text: 'test' }) })
    const body = await json(res)
    assert(res.ok, `send status ${res.status}`)
    assert(body && body.success === true && body.data && typeof body.data.id === 'string', 'send response id')
    id = body.data.id
  }

  await delay(200)
  {
    const res = await fetch(`${BASE}/api/notifications/process?limit=1`, { method: 'POST', headers: { 'x-internal-key': KEY } })
    const body = await json(res)
    assert(res.ok, `process status ${res.status}`)
    assert(body && typeof body.processed === 'number', 'process processed number')
  }

  // get (could be cached by service proxy later; here just OK status)
  {
    const res = await fetch(`${BASE}/api/notifications/${encodeURIComponent(id)}`, { headers: { 'x-internal-key': KEY } })
    const body = await json(res)
    assert(res.ok, `get status ${res.status}`)
    assert(body && body.success === true && body.data && body.data.id === id, 'get returns same id')
  }

  console.log('alerts contract: OK')
}

run().catch((e) => { console.error(String(e instanceof Error ? e.message : e)); process.exit(1) })


