export type LightPool = {
  id: string
  project: string
  chain: string
  symbol?: string
  tvlUsd?: number
  apy?: number
}

export type RiskResult = {
  score: number
  severity: 'low' | 'medium' | 'high' | 'critical'
  reasons: string[]
}

const suspiciousPatterns = [
  'elon', 'musk', 'pepe', 'doge', 'baby', 'inu', 'jeju', 'sbf', 'trump', 'wif', 'memecoin'
]

export function assessPoolRiskLight(pool: LightPool): RiskResult {
  let score = 0
  const reasons: string[] = []

  const tvl = pool.tvlUsd ?? 0
  if (tvl > 0 && tvl < 20_000) { score += 2; reasons.push('TVL < $20k') }
  else if (tvl >= 20_000 && tvl < 100_000) { score += 1; reasons.push('TVL < $100k') }

  const apy = pool.apy
  if (typeof apy === 'number') {
    if (apy > 1000) { score += 3; reasons.push('Extremely high APY') }
    else if (apy > 100) { score += 2; reasons.push('Very high APY') }
    else if (apy > 50) { score += 1; reasons.push('High APY') }
  }

  const sym = (pool.symbol || '').toLowerCase()
  if (sym && suspiciousPatterns.some(p => sym.includes(p))) {
    score += 1; reasons.push('Suspicious symbol pattern')
  }

  // Unknown/new project heuristic: no hyphenated known DEX patterns
  const proj = (pool.project || '').toLowerCase()
  if (!proj || proj.length < 3) {
    score += 1; reasons.push('Unknown project')
  }

  const severity: RiskResult['severity'] = score >= 6 ? 'critical' : score >= 4 ? 'high' : score >= 2 ? 'medium' : 'low'
  return { score, severity, reasons }
}
