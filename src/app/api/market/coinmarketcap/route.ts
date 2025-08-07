import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { CoinMarketCapClient } from "@/lib/market/coinmarketcap"
import { createLogger } from "@/lib/monitoring/logger"

const logger = createLogger("coinmarketcap-api")

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const cmcClient = new CoinMarketCapClient()
    
    // 認証チェック（オプション）
    const { data: { user } } = await supabase.auth.getUser()
    
    // URLパラメータを取得
    const { searchParams } = new URL(request.url)
    const action = searchParams.get("action") || "quotes"
    const symbols = searchParams.get("symbols")?.split(",").filter(Boolean)
    const ids = searchParams.get("ids")?.split(",").map(Number).filter(Boolean)
    const convert = searchParams.get("convert") || "USD"
    const limit = parseInt(searchParams.get("limit") || "100")
    const start = parseInt(searchParams.get("start") || "1")
    const sort = searchParams.get("sort") || "market_cap"
    const sortDir = searchParams.get("sort_dir") as "asc" | "desc" || "desc"
    
    // APIキーチェック
    if (!cmcClient.hasApiKey()) {
      return NextResponse.json(
        { error: "CoinMarketCap API key is not configured" },
        { status: 503 }
      )
    }
    
    // 接続テスト
    const isConnected = await cmcClient.testConnection()
    if (!isConnected) {
      return NextResponse.json(
        { error: "CoinMarketCap API connection failed" },
        { status: 503 }
      )
    }
    
    let responseData: any
    
    switch (action) {
      case "quotes":
        // 暗号通貨の最新価格取得
        if (!symbols && !ids) {
          return NextResponse.json(
            { error: "Either symbols or ids parameter is required for quotes" },
            { status: 400 }
          )
        }
        responseData = await cmcClient.getLatestQuotes(symbols, ids, convert)
        break
        
      case "listings":
        // 暗号通貨リスト取得
        responseData = await cmcClient.getListings(start, limit, convert, sort, sortDir)
        break
        
      case "global":
        // グローバル市場メトリクス取得
        responseData = await cmcClient.getGlobalMetrics(convert)
        break
        
      case "info":
        // 暗号通貨詳細情報取得
        if (!symbols && !ids) {
          return NextResponse.json(
            { error: "Either symbols or ids parameter is required for info" },
            { status: 400 }
          )
        }
        responseData = await cmcClient.getCryptocurrencyInfo(symbols, ids)
        break
        
      case "historical":
        // 価格履歴取得
        const symbol = searchParams.get("symbol")
        if (!symbol) {
          return NextResponse.json(
            { error: "Symbol parameter is required for historical data" },
            { status: 400 }
          )
        }
        const timeStart = searchParams.get("time_start")
        const timeEnd = searchParams.get("time_end")
        const count = searchParams.get("count") ? parseInt(searchParams.get("count")!) : undefined
        const interval = searchParams.get("interval") as any
        
        responseData = await cmcClient.getHistoricalQuotes(
          symbol,
          timeStart || undefined,
          timeEnd || undefined,
          count,
          interval,
          convert
        )
        break
        
      case "exchanges":
        // 取引所リスト取得
        responseData = await cmcClient.getExchangeListings(start, limit, sort, sortDir, convert)
        break
        
      case "simple":
        // 簡単な価格取得
        if (!symbols) {
          return NextResponse.json(
            { error: "Symbols parameter is required for simple price data" },
            { status: 400 }
          )
        }
        responseData = await cmcClient.getSimplePrice(symbols)
        break
        
      default:
        return NextResponse.json(
          { error: "Invalid action. Supported actions: quotes, listings, global, info, historical, exchanges, simple" },
          { status: 400 }
        )
    }
    
    // レスポンス構築
    const response = {
      success: true,
      data: responseData,
      metadata: {
        source: "CoinMarketCap API",
        action,
        symbols,
        ids,
        convert,
        timestamp: new Date().toISOString(),
        authenticated: !!user,
        hasApiKey: cmcClient.hasApiKey(),
      }
    }
    
    // 使用量ログ（認証済みユーザーのみ）
    if (user) {
      try {
        const { recordUsage } = await import("@/lib/ai/usage-limiter")
        await recordUsage(user.id, "market_data_requests", 0, 0, "coinmarketcap")
      } catch (error) {
        logger.warn("Failed to record usage", { error: error instanceof Error ? error.message : String(error) })
      }
    }
    
    logger.info("CoinMarketCap API request completed", {
      action,
      symbols: symbols?.length || 0,
      ids: ids?.length || 0,
      convert,
      authenticated: !!user,
      hasApiKey: cmcClient.hasApiKey()
    })
    
    return NextResponse.json(response)
    
  } catch (error) {
    logger.error("CoinMarketCap API request failed", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    })
    
    // エラーレスポンス
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return NextResponse.json(
          { error: "CoinMarketCap API key configuration error" },
          { status: 503 }
        )
      }
      if (error.message.includes("rate limit") || error.message.includes("429")) {
        return NextResponse.json(
          { error: "CoinMarketCap API rate limit exceeded" },
          { status: 429 }
        )
      }
      if (error.message.includes("timeout")) {
        return NextResponse.json(
          { error: "CoinMarketCap API request timeout" },
          { status: 408 }
        )
      }
      if (error.message.includes("Invalid symbol")) {
        return NextResponse.json(
          { error: "Invalid cryptocurrency symbol" },
          { status: 400 }
        )
      }
      if (error.message.includes("402")) {
        return NextResponse.json(
          { error: "CoinMarketCap API plan limit exceeded" },
          { status: 402 }
        )
      }
    }
    
    return NextResponse.json(
      { 
        error: "Failed to fetch CoinMarketCap data",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

// キャッシュ設定
export const dynamic = 'force-dynamic'
export const revalidate = 60 // 60秒キャッシュ