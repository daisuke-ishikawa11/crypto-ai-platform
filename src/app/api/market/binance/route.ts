import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { BinanceClient } from "@/lib/market/binance"
import { createLogger } from "@/lib/monitoring/logger"

const logger = createLogger("binance-api")

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const binanceClient = new BinanceClient()
    
    // 認証チェック（オプション）
    const { data: { user } } = await supabase.auth.getUser()
    
    // URLパラメータを取得
    const { searchParams } = new URL(request.url)
    const action = searchParams.get("action") || "prices"
    const symbol = searchParams.get("symbol")
    const symbols = searchParams.get("symbols")?.split(",").filter(Boolean)
    const interval = searchParams.get("interval") as any || "1d"
    const limit = parseInt(searchParams.get("limit") || "100")
    
    let responseData: any
    
    // 接続テスト
    const isConnected = await binanceClient.testConnection()
    if (!isConnected) {
      return NextResponse.json(
        { error: "Binance API connection failed" },
        { status: 503 }
      )
    }
    
    switch (action) {
      case "prices":
        if (symbols && symbols.length > 0) {
          // 複数シンボルの価格取得
          responseData = await binanceClient.getMultiplePrices(symbols)
        } else if (symbol) {
          // 単一シンボルの価格取得
          responseData = await binanceClient.getNormalizedPrice(symbol)
        } else {
          // 全ての価格取得
          responseData = await binanceClient.getPrice()
        }
        break
        
      case "ticker":
        // 24時間価格統計
        responseData = await binanceClient.getTicker24hr(symbol || undefined)
        break
        
      case "klines":
        if (!symbol) {
          return NextResponse.json(
            { error: "Symbol is required for klines data" },
            { status: 400 }
          )
        }
        // Klineデータ（ローソク足）
        responseData = await binanceClient.getKlines(symbol, interval, limit)
        break
        
      case "orderbook":
        if (!symbol) {
          return NextResponse.json(
            { error: "Symbol is required for orderbook data" },
            { status: 400 }
          )
        }
        // オーダーブック
        responseData = await binanceClient.getOrderBook(symbol, limit)
        break
        
      case "avgprice":
        if (!symbol) {
          return NextResponse.json(
            { error: "Symbol is required for average price data" },
            { status: 400 }
          )
        }
        // 平均価格
        responseData = await binanceClient.getAvgPrice(symbol)
        break
        
      case "exchangeinfo":
        // 取引所情報
        responseData = await binanceClient.getExchangeInfo()
        break
        
      default:
        return NextResponse.json(
          { error: "Invalid action. Supported actions: prices, ticker, klines, orderbook, avgprice, exchangeinfo" },
          { status: 400 }
        )
    }
    
    // レスポンス構築
    const response = {
      success: true,
      data: responseData,
      metadata: {
        source: "Binance API",
        action,
        symbol,
        symbols,
        timestamp: new Date().toISOString(),
        authenticated: !!user,
        hasApiKey: binanceClient.hasApiKey(),
      }
    }
    
    // 使用量ログ（認証済みユーザーのみ）
    if (user) {
      try {
        const { recordUsage } = await import("@/lib/ai/usage-limiter")
        await recordUsage(user.id, "market_data_requests", 0, 0, "binance")
      } catch (error) {
        logger.warn("Failed to record usage", { error: error instanceof Error ? error.message : String(error) })
      }
    }
    
    logger.info("Binance API request completed", {
      action
    })
    
    return NextResponse.json(response)
    
  } catch (error) {
    logger.error("Binance API request failed", {
      error: error instanceof Error ? error.message : String(error)
    })
    
    // エラーレスポンス
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return NextResponse.json(
          { error: "Binance API key configuration error" },
          { status: 503 }
        )
      }
      if (error.message.includes("rate limit")) {
        return NextResponse.json(
          { error: "Binance API rate limit exceeded" },
          { status: 429 }
        )
      }
      if (error.message.includes("timeout")) {
        return NextResponse.json(
          { error: "Binance API request timeout" },
          { status: 408 }
        )
      }
      if (error.message.includes("Invalid symbol")) {
        return NextResponse.json(
          { error: "Invalid cryptocurrency symbol" },
          { status: 400 }
        )
      }
    }
    
    return NextResponse.json(
      { 
        error: "Failed to fetch Binance market data",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

// キャッシュ設定
export const dynamic = 'force-dynamic'
export const revalidate = 30 // 30秒キャッシュ