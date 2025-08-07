import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { CoinGeckoClient } from "@/lib/market/coingecko"
import { createLogger } from "@/lib/monitoring/logger"

const logger = createLogger("market-global-api")

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const coinGecko = new CoinGeckoClient()
    
    // 認証チェック（オプション - パブリックデータのため）
    const { data: { user } } = await supabase.auth.getUser()
    
    // URLパラメータを取得
    const { searchParams } = new URL(request.url)
    const includeFearGreed = searchParams.get("includeFearGreed") === "true"
    
    // グローバル市場データを取得
    const globalData = await coinGecko.getGlobalData()
    
    // 追加データを取得
    const [trendingCoins, fearGreedIndex] = await Promise.all([
      coinGecko.getTrendingCoins(),
      includeFearGreed ? coinGecko.getFearGreedIndex() : null
    ])
    
    // レスポンスデータを構築
    const response = {
      global: {
        // 基本市場データ
        totalMarketCap: globalData.data.total_market_cap,
        totalVolume: globalData.data.total_volume,
        marketCapPercentage: globalData.data.market_cap_percentage,
        
        // 市場統計
        activeCryptocurrencies: globalData.data.active_cryptocurrencies,
        upcomingIcos: globalData.data.upcoming_icos,
        ongoingIcos: globalData.data.ongoing_icos,
        endedIcos: globalData.data.ended_icos,
        markets: globalData.data.markets,
        
        // 市場センチメント
        marketCapChange24h: globalData.data.market_cap_change_percentage_24h_usd,
        
        // 最終更新時刻
        updatedAt: globalData.data.updated_at,
      },
      
      // トレンドコイン
      trending: trendingCoins ? {
        coins: trendingCoins.coins?.map(item => ({
          id: item.item.id,
          name: item.item.name,
          symbol: item.item.symbol,
          thumb: item.item.thumb,
          marketCapRank: item.item.market_cap_rank,
          priceBtc: item.item.price_btc,
          score: item.item.score,
        })) || [],
      } : null,
      
      // Fear & Greed指数
      fearGreed: fearGreedIndex ? {
        value: fearGreedIndex.value,
        valueClassification: fearGreedIndex.value_classification,
      } : null,
      
      // メタデータ
      metadata: {
        source: "CoinGecko API",
        timestamp: new Date().toISOString(),
        cached: false,
        authenticated: !!user,
      }
    }
    
    // 使用量ログ（認証済みユーザーのみ）
    if (user) {
      try {
        const { recordUsage } = await import("@/lib/ai/usage-limiter")
        await recordUsage(user.id, "market_data_requests", 0, 0, "coingecko")
      } catch (error) {
        logger.warn("Failed to record usage", { error: error instanceof Error ? error.message : String(error) })
      }
    }
    
    logger.info("Global market data fetched successfully", {
      authenticated: !!user,
      includeFearGreed,
      trendingCoinsCount: trendingCoins?.coins?.length || 0,
      fearGreedValue: fearGreedIndex?.value
    })
    
    return NextResponse.json(response)
    
  } catch (error) {
    logger.error("Failed to fetch global market data", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    })
    
    // エラーレスポンス
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return NextResponse.json(
          { error: "Market data service configuration error" },
          { status: 503 }
        )
      }
      if (error.message.includes("rate limit")) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again later." },
          { status: 429 }
        )
      }
      if (error.message.includes("timeout")) {
        return NextResponse.json(
          { error: "Request timeout. Please try again." },
          { status: 408 }
        )
      }
    }
    
    return NextResponse.json(
      { error: "Failed to fetch global market data" },
      { status: 500 }
    )
  }
}

// キャッシュ設定のためのヘッダー
export const dynamic = 'force-dynamic'
export const revalidate = 60 // 60秒キャッシュ