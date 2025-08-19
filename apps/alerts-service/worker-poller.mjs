// Simple polling worker that triggers the process endpoint periodically.
// Required env: ALERTS_SELF_BASE_URL, INTERNAL_API_KEY
const BASE = process.env.ALERTS_SELF_BASE_URL
const KEY = process.env.INTERNAL_API_KEY
const INTERVAL_MS = Number(process.env.ALERTS_WORKER_INTERVAL_MS ?? '5000')
const BATCH_LIMIT = Number(process.env.ALERTS_WORKER_BATCH_LIMIT ?? '10')

if (!BASE || !KEY) {
  console.error('[alerts-worker] Missing ALERTS_SELF_BASE_URL or INTERNAL_API_KEY')
  process.exit(2)
}

let running = true
process.on('SIGINT', () => { running = false })
process.on('SIGTERM', () => { running = false })

async function tick() {
  const url = `${BASE}/api/notifications/process?limit=${encodeURIComponent(String(BATCH_LIMIT))}`
  try {
    const res = await fetch(url, { method: 'POST', headers: { 'x-internal-key': KEY } })
    const body = await res.json().catch(() => ({}))
    if (!res.ok) {
      console.error(`[alerts-worker] process failed: ${res.status} ${JSON.stringify(body).slice(0,200)}`)
    } else if (body && typeof body === 'object') {
      const processed = body.processed ?? 0
      if (processed > 0) {
        console.log(`[alerts-worker] processed=${processed}`)
      }
    }
  } catch (e) {
    console.error(`[alerts-worker] error: ${String(e instanceof Error ? e.message : e)}`)
  }
}

async function loop() {
  while (running) {
    await tick()
    await new Promise(r => setTimeout(r, INTERVAL_MS))
  }
  console.log('[alerts-worker] stopped')
}

loop()


