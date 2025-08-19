// Hyperliquid read-only adapter
// 環境変数が未設定の場合は null を返し、呼び出し側でフォールバックします。

export type HyperliquidMarket = {
  symbol: string
  fundingRate?: number
  openInterestUsd?: number
  indexPrice?: number
}

export async function fetchHyperliquidMarkets(): Promise<HyperliquidMarket[] | null> {
  try {
    const base = process.env.HYPERLIQUID_BASE_URL || 'https://api.hyperliquid.xyz'
    if (!base) return null
    const timeoutMs = (() => { const v = Number(process.env.HYPERLIQUID_HTTP_TIMEOUT_MS); return Number.isFinite(v) && v > 0 ? v : 8000 })()
    const res = await fetch(`${base}/info`, { method: 'GET', headers: { 'accept': 'application/json' } })
    if (!res.ok) return null
    const j = await res.json().catch(() => null) as unknown
    if (!j || typeof j !== 'object') return null
    // TODO: 公式のマーケット一覧エンドポイントに置換
    // ひとまず空配列でフォールバック
    void timeoutMs
    return []
  } catch {
    return null
  }
}

// レジストリ登録（SDK/HTTP導入後は runner 経由で利用可能）
import { registerAdapter } from '@/lib/sdk/registry'
registerAdapter('hyperliquid.markets', async () => {
  return await fetchHyperliquidMarkets()
})
