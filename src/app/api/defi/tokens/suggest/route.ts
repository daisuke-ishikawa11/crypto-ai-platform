import { NextRequest, NextResponse } from 'next/server'
import { createApiHandler } from '@/lib/utils/api-error-middleware'

export const dynamic = 'force-dynamic'

type Suggestion = { symbol: string; chain?: string; score?: number }

// 簡易サジェスト辞書（アドレスは未掲載：誤情報回避のため）
const TOKENS: Record<string, string[]> = {
  all: ['USDC','USDT','DAI','WBTC','WETH','ETH','BTC','SOL','BNB','MATIC','AVAX','ARB','OP'],
  ethereum: ['USDC','USDT','DAI','WETH','WBTC','ETH'],
  bsc: ['USDT','USDC','BNB','ETH'],
  polygon: ['USDC','USDT','MATIC','DAI'],
  arbitrum: ['USDC','USDT','ARB','ETH'],
  optimism: ['USDC','USDT','OP','ETH'],
  base: ['USDC','ETH'],
  avalanche: ['USDC','USDT','AVAX'],
  solana: ['USDC','USDT','SOL'],
}

async function handler(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get('q') || '').trim().toLowerCase()
  const chain = (searchParams.get('chain') || 'all').toLowerCase()
  const limit = Math.min(20, Math.max(1, Number(searchParams.get('limit') || '10')))

  const pool = [...new Set([...(TOKENS[chain] || []), ...TOKENS.all])]
  const ranked: Array<{ symbol: string; score: number }> = pool.map(sym => {
    // 簡易スコア: チェーン一致を優遇 + 代表トークンを加点 + クエリ一致度
    let score = 0
    if ((TOKENS[chain] || []).includes(sym)) score += 2
    if (['USDC','USDT','DAI','WETH','WBTC','ETH','SOL','BNB','MATIC','AVAX','ARB','OP'].includes(sym)) score += 3
    if (q) {
      const s = sym.toLowerCase()
      if (s === q) score += 5
      else if (s.startsWith(q)) score += 2
      else if (s.includes(q)) score += 1
    }
    return { symbol: sym, score }
  })
  const filtered = ranked
    .filter(r => !q || r.symbol.toLowerCase().includes(q))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
  const items: Suggestion[] = filtered.map(r => ({ symbol: r.symbol, chain, score: r.score }))
  return NextResponse.json({ success: true, data: { items } })
}

export const GET = createApiHandler({ handler, rateLimit: { limit: 60, window: 60_000 } })
