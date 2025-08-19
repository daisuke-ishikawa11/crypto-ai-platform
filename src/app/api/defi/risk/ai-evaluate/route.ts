import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { assessPoolRiskLight } from '@/lib/defi/risk-heuristics'
import { incCounter, startTimer } from '@/lib/monitoring/metrics'
import { getRedis } from '@/lib/redis/client'
import { structuredAI } from '@/lib/ai/structured-ai-service'

const Body = z.object({
  pool: z.object({
    id: z.string(),
    project: z.string(),
    chain: z.string(),
    symbol: z.string().optional(),
    tvlUsd: z.number().optional(),
    apy: z.number().optional(),
    underlyingTokens: z.array(z.string()).optional(),
    url: z.string().url().optional(),
  }),
  evidence: z.object({
    auditUrls: z.array(z.string().url()).optional(),
    docsUrls: z.array(z.string().url()).optional(),
    communityUrls: z.array(z.string().url()).optional(),
  }).optional(),
  userId: z.string().optional()
})

export async function POST(request: NextRequest) {
  const endTimer = startTimer('defi_api_request_duration_seconds', { endpoint: 'risk_ai_evaluate' })
  incCounter('defi_api_requests_total', { endpoint: 'risk_ai_evaluate', method: 'POST' })
  try {
    const json = await request.json()
    const parsed = Body.safeParse(json)
    if (!parsed.success) {
      incCounter('defi_api_errors_total', { endpoint: 'risk_ai_evaluate', reason: 'bad_request', status: '400' })
      try { incCounter('defi_ai_evaluate_requests_total', { outcome: 'failure', reason: 'bad_request' }) } catch {}
      // 失敗イベント（bad_request）を統計用に保存
      try {
        const redis = await getRedis()
        if (redis) {
          const evt = JSON.stringify({ t: Date.now(), outcome: 'failure', rsn: 'bad_request' })
          await redis.rpush('defi:ai:evaluate:events', evt)
          await redis.ltrim('defi:ai:evaluate:events', -5000, -1)
        }
      } catch {}
      endTimer()
      return NextResponse.json({ success: false, error: 'Invalid body', issues: parsed.error.issues }, { status: 400 })
    }
    const { pool, evidence, userId } = parsed.data

    // Optional rate limiting per user (10 req / 60s)
    try {
      if (userId) {
        const redis = await getRedis()
        if (redis) {
          const rlKey = `defi:ai:eval:rl:${userId}`
          const cnt = await redis.incr(rlKey)
          if (cnt === 1) await redis.expire(rlKey, 60)
          if (cnt > 10) {
            const ttl = await redis.ttl(rlKey)
            incCounter('defi_ai_evaluate_requests_total', { outcome: 'failure', reason: 'rate_limited' })
            // 失敗イベント（rate_limited）を統計用に保存
            try {
              const evt = JSON.stringify({ t: Date.now(), outcome: 'failure', rsn: 'rate_limited' })
              await redis.rpush('defi:ai:evaluate:events', evt)
              await redis.ltrim('defi:ai:evaluate:events', -5000, -1)
            } catch {}
            endTimer()
            const headers = ttl && ttl > 0 ? { 'Retry-After': String(ttl) } : undefined
            return new NextResponse(JSON.stringify({ success: false, error: 'Rate limited', retryAfterSec: ttl && ttl > 0 ? ttl : 60 }), { status: 429, headers: { 'Content-Type': 'application/json', ...(headers || {}) } })
          }
        }
      }
    } catch {}
    const base = assessPoolRiskLight(pool)

    // AIによる補助評価
    let ai = { enabled: true, adjustments: 0, reasons: [] as string[], keyPoints: [] as string[], sources: [] as string[], suggestedSeverity: base.severity as 'low'|'medium'|'high'|'critical' }
    try {
      const parts: string[] = []
      parts.push('以下のDeFiプールのリスクを簡潔に評価してください。')
      parts.push('必ず次の2行を付与してください:')
      parts.push('SEVERITY: low|medium|high|critical')
      parts.push('SCORE_DELTA: -3..+3 (整数)')
      parts.push('--- プール情報 ---')
      parts.push(`Project: ${pool.project}`)
      parts.push(`Chain: ${pool.chain}`)
      if (pool.symbol) parts.push(`Symbol: ${pool.symbol}`)
      if (typeof pool.tvlUsd === 'number') parts.push(`TVL: ${pool.tvlUsd}`)
      if (typeof pool.apy === 'number') parts.push(`APY: ${pool.apy}`)
      parts.push('--- 参考URL ---')
      const urls = [ ...(evidence?.auditUrls || []), ...(evidence?.docsUrls || []), ...(evidence?.communityUrls || []) ]
      if (urls.length) urls.forEach(u => parts.push(u))
      else parts.push('なし')
      parts.push('--- 方針 ---')
      parts.push('・極端な利回り/極小TVL/怪しいネーミング/監査未整備を重視、根拠は箇条書きで短く')

      const chat = await structuredAI.generateChatResponse({ query: parts.join('\n'), context: { previousMessages: [] } })
      ai.keyPoints = Array.isArray(chat.keyPoints) ? chat.keyPoints.slice(0, 6) : []
      ai.sources = Array.isArray(chat.sources) ? chat.sources.slice(0, 5) : []
      ai.reasons = ai.keyPoints
      const text = `${chat.response}\n${ai.keyPoints.join('\n')}`
      const sevMatch = text.match(/SEVERITY:\s*(low|medium|high|critical)/i)
      const deltaMatch = text.match(/SCORE_DELTA:\s*([-+]?\d{1,2})/i)
      if (sevMatch) ai.suggestedSeverity = sevMatch[1].toLowerCase() as typeof ai.suggestedSeverity
      if (deltaMatch) ai.adjustments = Math.max(-3, Math.min(3, Number(deltaMatch[1]) || 0))
    } catch {
      ai = { enabled: false, adjustments: 0, reasons: [], keyPoints: [], sources: [], suggestedSeverity: base.severity }
    }

    const finalScore = Math.max(0, base.score + (ai.enabled ? ai.adjustments : 0))
    const scoreToSeverity = (s: number): 'low'|'medium'|'high'|'critical' => (s >= 6 ? 'critical' : s >= 4 ? 'high' : s >= 2 ? 'medium' : 'low')
    const sevByScore = scoreToSeverity(finalScore)
    const finalSeverity = ai.enabled ? ((): 'low'|'medium'|'high'|'critical' => {
      const order = { low: 0, medium: 1, high: 2, critical: 3 }
      const chosen = Math.max(order[sevByScore], order[ai.suggestedSeverity])
      return (Object.keys(order).find(k => order[k as keyof typeof order] === chosen) as 'low'|'medium'|'high'|'critical')
    })() : sevByScore

    // Metrics: AI adjustments and suggestion
    try {
      const sign = ai.adjustments > 0 ? 'pos' : ai.adjustments < 0 ? 'neg' : 'zero'
      incCounter('defi_ai_evaluate_adjustments_total', { sign })
      incCounter('defi_ai_evaluate_suggested_severity_total', { level: ai.suggestedSeverity })
      incCounter('defi_ai_evaluate_final_severity_total', { level: finalSeverity })
    } catch {}

    const result = {
      success: true,
      data: {
        base,
        ai: { enabled: ai.enabled, adjustments: ai.adjustments, reasons: ai.reasons, keyPoints: ai.keyPoints, sources: ai.sources, suggestedSeverity: ai.suggestedSeverity },
        evidence: evidence || null,
        final: { score: finalScore, severity: finalSeverity, reasons: [...base.reasons, ...ai.reasons].slice(0, 8) },
      }
    }
    try { incCounter('defi_ai_evaluate_requests_total', { outcome: 'success', severity: finalSeverity }) } catch {}

    // Append compact event to Redis for 24h stats (best-effort)
    try {
      const redis = await getRedis()
      if (redis) {
        const evt = JSON.stringify({
          t: Date.now(),
          outcome: 'success',
          adj: ai.adjustments,
          sev: finalSeverity
        })
        await redis.rpush('defi:ai:evaluate:events', evt)
        await redis.ltrim('defi:ai:evaluate:events', -5000, -1)
      }
    } catch {}
    endTimer()
    return NextResponse.json(result)
  } catch {
    incCounter('defi_api_errors_total', { endpoint: 'risk_ai_evaluate', reason: 'exception' })
    try { incCounter('defi_ai_evaluate_requests_total', { outcome: 'failure', reason: 'exception' }) } catch {}
    // 失敗イベント（exception）を統計用に保存
    try {
      const redis = await getRedis()
      if (redis) {
        const evt = JSON.stringify({ t: Date.now(), outcome: 'failure', rsn: 'exception' })
        await redis.rpush('defi:ai:evaluate:events', evt)
        await redis.ltrim('defi:ai:evaluate:events', -5000, -1)
      }
    } catch {}
    endTimer()
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 })
  }
}
