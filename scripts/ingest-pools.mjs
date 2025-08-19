#!/usr/bin/env node

const BASE = process.env.BASE_URL || 'http://localhost:3000'
const TOKEN = process.env.ALERTS_ADMIN_TOKEN || process.env.METRICS_TOKEN || ''
if (!TOKEN) {
  console.error('ALERTS_ADMIN_TOKEN (or METRICS_TOKEN) is required')
  process.exit(1)
}

async function getMeta() {
  const r = await fetch(`${BASE}/api/defi/metadata`)
  if (!r.ok) throw new Error(`metadata ${r.status}`)
  const j = await r.json()
  return { chains: j?.data?.poolChains || [], projects: j?.data?.poolProjects || [] }
}

async function ingest(chain, project) {
  const params = new URLSearchParams()
  if (chain) params.set('chain', chain)
  if (project) params.set('project', project)
  params.set('limit', '200')
  const r = await fetch(`${BASE}/api/defi/pools/history/ingest?${params}`, { method: 'POST', headers: { 'x-alerts-token': TOKEN } })
  const j = await r.json().catch(()=>({}))
  const ok = r.ok && j?.success
  console.log(`[ingest] ${chain||'all'} / ${project||'all'} -> ${ok?'ok':'fail'} ${ok?j.written:''}`)
}

async function main() {
  const { chains, projects } = await getMeta()
  const sampleChains = chains.slice(0, 8)
  const sampleProjects = projects.slice(0, 12)
  for (const c of [''].concat(sampleChains)) {
    for (const p of [''].concat(sampleProjects)) {
      // basic throttling
      await ingest(c, p)
      await new Promise(r=>setTimeout(r, 400))
    }
  }
}

main().catch(e=>{ console.error(e); process.exit(1) })
