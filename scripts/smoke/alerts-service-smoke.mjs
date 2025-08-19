// Node 20+ required (built-in fetch)
const BASE = process.env.ALERTS_BASE_URL
const KEY = process.env.ALERTS_INTERNAL_API_KEY

if (!BASE || !KEY) {
  console.error('Missing ALERTS_BASE_URL or ALERTS_INTERNAL_API_KEY')
  process.exit(2)
}

const headers = { 'x-internal-key': KEY }

async function check(path) {
  const url = `${BASE}${path}`
  const res = await fetch(url, { headers })
  let body
  try { body = await res.json() } catch { body = await res.text() }
  if (!res.ok) {
    throw new Error(`FAILED ${path} -> ${res.status} ${String(typeof body === 'string' ? body : JSON.stringify(body)).slice(0,200)}`)
  }
  if (typeof body === 'object' && body !== null && body.success === false) {
    throw new Error(`FAILED ${path} -> ${JSON.stringify(body).slice(0,200)}`)
  }
  console.log(`OK ${path}`)
}

;(async () => {
  try {
    await check('/api/health')
    console.log('All checks passed')
  } catch (e) {
    console.error(String(e instanceof Error ? e.message : e))
    process.exit(1)
  }
})()


