// Contract test for defi-suite (with cache header assertions)
// Requires: DEFISUITE_BASE_URL, DEFISUITE_INTERNAL_API_KEY
import { setTimeout as delay } from 'timers/promises'

const BASE = process.env.DEFISUITE_BASE_URL
const KEY = process.env.DEFISUITE_INTERNAL_API_KEY
if (!BASE || !KEY) {
  console.error('Missing DEFISUITE_BASE_URL or DEFISUITE_INTERNAL_API_KEY')
  process.exit(2)
}
const headers = { 'x-internal-key': KEY }

function assert(cond, msg) { if (!cond) throw new Error(`Contract failed: ${msg}`) }
async function json(res) { const body = await res.json().catch(async () => ({ raw: await res.text() })); return body }

function getSMaxage(res) {
  const h = res.headers.get('cache-control') || ''
  const m = /s-maxage=(\d+)/i.exec(h)
  return m ? parseInt(m[1], 10) : null
}

async function run() {
  // health (min 15s)
  {
    const res = await fetch(`${BASE}/api/health`, { headers })
    const body = await json(res)
    assert(res.ok, `health status ${res.status}`)
    assert(body && body.success === true, 'health success flag')
    const smax = getSMaxage(res)
    assert(smax !== null && smax >= 15, `health cache s-maxage ${smax}`)
  }

  // engine (min 15s)
  {
    const res = await fetch(`${BASE}/api/defi/engine`, { headers })
    assert(res.ok, `engine status ${res.status}`)
    const smax = getSMaxage(res)
    assert(smax !== null && smax >= 15, `engine cache s-maxage ${smax}`)
  }

  // monitoring/status (min 15s)
  {
    const res = await fetch(`${BASE}/api/defi/monitoring/status?timeframe=24h`, { headers })
    assert(res.ok, `monitoring status ${res.status}`)
    const smax = getSMaxage(res)
    assert(smax !== null && smax >= 15, `monitoring cache s-maxage ${smax}`)
  }

  // protocols (min 60s)
  {
    const res = await fetch(`${BASE}/api/defi/protocols?limit=1`, { headers })
    assert(res.ok, `protocols status ${res.status}`)
    const smax = getSMaxage(res)
    assert(smax !== null && smax >= 60, `protocols cache s-maxage ${smax}`)
  }

  // pools (min 30s)
  {
    const res = await fetch(`${BASE}/api/defi/pools?limit=1`, { headers })
    assert(res.ok, `pools status ${res.status}`)
    const smax = getSMaxage(res)
    assert(smax !== null && smax >= 30, `pools cache s-maxage ${smax}`)
  }

  // statistics (min 60s)
  {
    const res = await fetch(`${BASE}/api/defi/statistics?timeframe=24h`, { headers })
    assert(res.ok, `statistics status ${res.status}`)
    const smax = getSMaxage(res)
    assert(smax !== null && smax >= 60, `statistics cache s-maxage ${smax}`)
  }

  // tvl/overview (min 60s)
  {
    const res = await fetch(`${BASE}/api/defi/tvl/overview?timeframe=7d`, { headers })
    assert(res.ok, `tvl status ${res.status}`)
    const smax = getSMaxage(res)
    assert(smax !== null && smax >= 60, `tvl cache s-maxage ${smax}`)
  }

  await delay(100)
  console.log('defi contract: OK')
}

run().catch((e) => { console.error(String(e instanceof Error ? e.message : e)); process.exit(1) })


