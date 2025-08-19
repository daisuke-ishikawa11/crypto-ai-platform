// Node 20+ required (built-in fetch)
const BASE = process.env.DEFISUITE_BASE_URL
const KEY = process.env.DEFISUITE_INTERNAL_API_KEY

if (!BASE || !KEY) {
  console.error('Missing DEFISUITE_BASE_URL or DEFISUITE_INTERNAL_API_KEY')
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
    await check('/api/defi/engine')
    await check('/api/defi/monitoring/status?timeframe=24h')
    await check('/api/defi/protocols?limit=1')
    await check('/api/defi/pools?limit=1')
    await check('/api/defi/statistics?timeframe=24h')
    await check('/api/defi/tvl/overview?timeframe=7d')
    console.log('All checks passed')
  } catch (e) {
    console.error(String(e instanceof Error ? e.message : e))
    process.exit(1)
  }
})()
