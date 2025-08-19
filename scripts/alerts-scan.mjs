#!/usr/bin/env node
import fetch from 'node-fetch'

const BASE = process.env.BASE_URL || 'http://localhost:3000'
const TOKEN = process.env.ALERTS_ADMIN_TOKEN || process.env.METRICS_TOKEN || ''
const DISCORD = process.env.ALERTS_DISCORD_WEBHOOK_URL || ''
if (!TOKEN) { console.error('ALERTS_ADMIN_TOKEN (or METRICS_TOKEN) is required'); process.exit(1) }

async function fetchTopPools(limit = 50) {
  const r = await fetch(`${BASE}/api/defi/pools?limit=${limit}`)
  if (!r.ok) throw new Error(`pools ${r.status}`)
  const j = await r.json()
  return j?.data || []
}

async function fetchHistory(id, days=7) {
  const r = await fetch(`${BASE}/api/defi/pools/history?id=${encodeURIComponent(id)}&days=${days}`)
  if (!r.ok) return []
  const j = await r.json()
  return j?.data || []
}

async function evaluate(pool) {
  const points = await fetchHistory(pool.id, 7)
  if (!points.length) return null
  const body = { poolId: pool.id, project: pool.project, chain: pool.chain, points, thresholds: { tvlDropPct: 30, apySpikePct: 100 }, webhook: DISCORD ? { discord: DISCORD } : undefined }
  const r = await fetch(`${BASE}/api/defi/alerts/evaluate`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-alerts-token': TOKEN }, body: JSON.stringify(body) })
  if (!r.ok) return null
  return r.json()
}

async function main() {
  const pools = await fetchTopPools(60)
  for (const p of pools) {
    const res = await evaluate(p)
    if (res?.anomalies?.length) {
      console.log(`[alert] ${p.project} ${p.chain} -> ${res.anomalies.length}`)
    }
    await new Promise(r=>setTimeout(r, 200))
  }
}

main().catch(e=>{ console.error(e); process.exit(1) })
