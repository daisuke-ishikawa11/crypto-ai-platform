// リスクスコア（減点方式）: 初期100点から減点 → 低スコアほど要警戒
// 返却はsummaryのみ（重い計算や外部参照は行わない）

export type RiskReason = {
  id: string
  points: number // 減点（0以上）。合計減点 = reasons.map(p).sum()
  label: string // 人間向け説明
}

export type RiskSummary = {
  riskScore: number // 0–100（低いほど要警戒）
  riskLevel: 'safe' | 'caution' | 'alert'
  reasonsSummary: RiskReason[]
  confidence: number // 0–1（入力の充足度/一貫性）
  disclaimers: string[]
}

export type RiskInput = {
  protocol?: string
  network?: string
  tvl?: number
  apy?: number
  volume24h?: number
  graphSourceUrl?: string | undefined
  feeTier?: number | undefined
  // 将来: on-chain補完との乖離・履歴変動などを受け取る
}

function getEnvJson<T>(key: string, fallback: T): T {
  try {
    const raw = (process.env as Record<string, string | undefined>)[key]
    if (!raw) return fallback
    const parsed = JSON.parse(raw) as unknown
    return (parsed as T) ?? fallback
  } catch {
    return fallback
  }
}

const DEFAULT_WEIGHTS = {
  source: 25,
  tvl: 20,
  apy: 20,
  volatility: 15,
  divergence: 10,
  age: 10,
  missing: 10,
}

// 閾値（単純ヒューリスティック）。ENVで微調整可能
const DEFAULT_THRESHOLDS = {
  tvl: { low: 100_000, mid: 1_000_000 }, // USD
  apy: { high: 0.5, mid: 0.2 }, // 50%/20%
  volumeToTvl: { high: 2.0, mid: 1.0 },
}

export function computeRiskScoreSummary(input: RiskInput): RiskSummary {
  const W = getEnvJson<typeof DEFAULT_WEIGHTS>('RISK_SCORE_WEIGHTS_JSON', DEFAULT_WEIGHTS)
  const T = getEnvJson<typeof DEFAULT_THRESHOLDS>('RISK_SCORE_THRESHOLDS_JSON', DEFAULT_THRESHOLDS)

  const reasons: RiskReason[] = []
  let missing = 0

  const tvl = Number.isFinite(input.tvl) ? (input.tvl as number) : undefined
  const apy = Number.isFinite(input.apy) ? (input.apy as number) : undefined
  const vol = Number.isFinite(input.volume24h) ? (input.volume24h as number) : undefined
  const source = (input.graphSourceUrl || '').toLowerCase()

  // 出典（source）
  if (!source) {
    reasons.push({ id: 'source.none', points: Math.min(W.source, 25), label: '出典URLが不明（要警戒）' })
  } else if (source.includes('uniswap') || source.includes('thegraph') || source.includes('graph') || source.includes('aave')) {
    // 公式系は減点なし
  } else if (source.includes('defillama')) {
    reasons.push({ id: 'source.llama', points: Math.min(15, W.source), label: 'DefiLlama由来（第二情報源）' })
  }

  // TVL（低いほど減点）
  if (typeof tvl === 'number') {
    if (tvl < T.tvl.low) reasons.push({ id: 'tvl.low', points: Math.min(20, W.tvl), label: `TVLが低水準（< $${T.tvl.low.toLocaleString()}）` })
    else if (tvl < T.tvl.mid) reasons.push({ id: 'tvl.mid', points: Math.min(10, W.tvl), label: `TVLが中位未満（< $${T.tvl.mid.toLocaleString()}）` })
  } else {
    missing += 1
  }

  // APY異常度（高いほど減点）
  if (typeof apy === 'number') {
    const apyFrac = apy > 1 ? apy / 100 : apy // 100=100% も考慮
    if (apyFrac >= T.apy.high) reasons.push({ id: 'apy.high', points: Math.min(20, W.apy), label: `APYが極端（≥ ${(T.apy.high * 100)}%）` })
    else if (apyFrac >= T.apy.mid) reasons.push({ id: 'apy.mid', points: Math.min(10, W.apy), label: `APYが高め（≥ ${(T.apy.mid * 100)}%）` })
  } else {
    missing += 1
  }

  // 簡易変動性（volume/tvl）: 極端に高い場合は不安定とみなす
  if (typeof tvl === 'number' && typeof vol === 'number' && tvl > 0) {
    const ratio = vol / tvl
    if (ratio >= T.volumeToTvl.high) reasons.push({ id: 'volatility.high', points: Math.min(15, W.volatility), label: '短期取引比率が高い（不安定）' })
    else if (ratio >= T.volumeToTvl.mid) reasons.push({ id: 'volatility.mid', points: Math.min(8, W.volatility), label: '取引比率がやや高い' })
  } else {
    missing += 1
  }

  // on-chain補完との乖離/年齢は今回はsummaryでは未評価 → 将来拡張

  if (missing > 0) {
    reasons.push({ id: 'missing.data', points: Math.min(W.missing, 5 + (missing - 1) * 2), label: '一部データが不足（保守的に減点）' })
  }

  const totalPenalty = reasons.reduce((s, r) => s + Math.max(0, r.points), 0)
  const rawScore = Math.max(0, 100 - totalPenalty)

  const level: 'safe' | 'caution' | 'alert' = rawScore >= 60 ? 'safe' : rawScore >= 40 ? 'caution' : 'alert'
  const confidence = Math.max(0.3, 1 - missing * 0.15)

  return {
    riskScore: Math.round(rawScore),
    riskLevel: level,
    reasonsSummary: reasons.sort((a, b) => b.points - a.points).slice(0, 5),
    confidence,
    disclaimers: [
      '本スコアは参考指標であり、投資助言ではありません。',
      '出典・TVL・APYなどの客観指標に基づく減点方式です。',
    ],
  }
}

export type RiskReasonFull = RiskReason & {
  method?: string
  params?: Record<string, unknown>
  thresholds?: Record<string, unknown>
}

export function computeRiskScoreFull(input: RiskInput): { summary: RiskSummary; reasonsFull: RiskReasonFull[] } {
  const sum = computeRiskScoreSummary(input)
  const T = getEnvJson<typeof DEFAULT_THRESHOLDS>('RISK_SCORE_THRESHOLDS_JSON', DEFAULT_THRESHOLDS)
  const reasonsFull: RiskReasonFull[] = sum.reasonsSummary.map(r => {
    const rf: RiskReasonFull = { ...r }
    if (r.id.startsWith('source')) {
      rf.method = 'source_evidence'
      rf.params = { graphSourceUrl: input.graphSourceUrl }
      rf.thresholds = { trustedKeywords: ['uniswap','aave','thegraph','graph'] }
    } else if (r.id.startsWith('tvl')) {
      rf.method = 'tvl_level'
      rf.params = { tvl: input.tvl }
      rf.thresholds = { low: T.tvl.low, mid: T.tvl.mid }
    } else if (r.id.startsWith('apy')) {
      rf.method = 'apy_outlier'
      rf.params = { apy: input.apy }
      rf.thresholds = { mid: T.apy.mid, high: T.apy.high }
    } else if (r.id.startsWith('volatility')) {
      rf.method = 'volume_to_tvl_ratio'
      rf.params = { volume24h: input.volume24h, tvl: input.tvl }
      rf.thresholds = { mid: T.volumeToTvl.mid, high: T.volumeToTvl.high }
    } else if (r.id === 'missing.data') {
      rf.method = 'missing_fields'
      rf.params = { fields: { tvl: input.tvl, apy: input.apy, volume24h: input.volume24h, source: input.graphSourceUrl } }
    }
    return rf
  })
  return { summary: sum, reasonsFull }
}
