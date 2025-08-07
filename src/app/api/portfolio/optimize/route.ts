import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { PortfolioOptimizer, AssetData, PortfolioConstraints } from "@/lib/portfolio/optimization"
import { CoinGeckoClient } from "@/lib/market/coingecko"
import { createLogger } from "@/lib/monitoring/logger"

const logger = createLogger("portfolio-optimize-api")

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    
    // 認証チェック
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // 使用制限チェック
    const { checkUsageLimit } = await import("@/lib/ai/usage-limiter")
    const usageCheck = await checkUsageLimit(user.id, "portfolio_optimization")
    if (!usageCheck.allowed) {
      return NextResponse.json(
        { 
          error: "Usage limit exceeded",
          dailyUsed: usageCheck.dailyUsed,
          dailyLimit: usageCheck.dailyLimit,
          monthlyUsed: usageCheck.monthlyUsed,
          monthlyLimit: usageCheck.monthlyLimit,
          plan: usageCheck.plan,
        },
        { status: 429 }
      )
    }

    // リクエストボディを解析
    const body = await request.json()
    const { 
      symbols, 
      method = 'max_sharpe', 
      constraints,
      investmentAmount = 10000,
      historicalPeriod = 365
    } = body

    if (!symbols || !Array.isArray(symbols) || symbols.length === 0) {
      return NextResponse.json(
        { error: "Symbols array is required" },
        { status: 400 }
      )
    }

    if (symbols.length > 20) {
      return NextResponse.json(
        { error: "Maximum 20 symbols allowed" },
        { status: 400 }
      )
    }

    // デフォルトの制約条件
    const defaultConstraints: PortfolioConstraints = {
      minWeight: 0.05,
      maxWeight: 0.40,
      maxAssets: 10,
      riskFreeRate: 0.02,
      rebalanceFrequency: 'monthly',
      ...constraints
    }

    // 市場データを取得
    const coinGecko = new CoinGeckoClient()
    const assetDataPromises = symbols.map(async (symbol: string) => {
      try {
        // 現在の価格を取得
        const priceData = await coinGecko.getCoinPrice(symbol)
        
        // 履歴データを取得
        const historicalData = await coinGecko.getCoinHistory(symbol, historicalPeriod)
        
        // 日次リターンを計算
        const prices = historicalData.map(d => d.price)
        const returns = []
        for (let i = 1; i < prices.length; i++) {
          returns.push((prices[i] - prices[i-1]) / prices[i-1])
        }

        return {
          symbol,
          price: priceData.usd,
          historicalReturns: returns,
          minWeight: defaultConstraints.minWeight,
          maxWeight: defaultConstraints.maxWeight
        } as AssetData
      } catch (error) {
        logger.error(`Failed to fetch data for ${symbol}`, { error })
        return null
      }
    })

    const assetDataResults = await Promise.all(assetDataPromises)
    const assets = assetDataResults.filter(Boolean) as AssetData[]

    if (assets.length === 0) {
      return NextResponse.json(
        { error: "No valid asset data found" },
        { status: 400 }
      )
    }

    // ポートフォリオ最適化を実行
    const optimizer = new PortfolioOptimizer(defaultConstraints.riskFreeRate)
    const optimizationResult = await optimizer.optimize(assets, defaultConstraints, method)

    // 投資額を基に実際の配分を計算
    const investmentAllocations = optimizationResult.allocations.map(allocation => ({
      ...allocation,
      investmentAmount: investmentAmount * allocation.weight,
      shares: Math.floor((investmentAmount * allocation.weight) / assets.find(a => a.symbol === allocation.symbol)!.price)
    }))

    // リスクメトリクスを計算
    const weights = assets.map(asset => optimizationResult.weights[asset.symbol])
    const riskMetrics = optimizer.calculateRiskMetrics(assets, weights)

    // 結果をデータベースに保存
    const { error: saveError } = await supabase
      .from("portfolio_optimizations")
      .insert({
        user_id: user.id,
        symbols: symbols,
        method,
        constraints: defaultConstraints,
        investment_amount: investmentAmount,
        optimization_result: optimizationResult,
        risk_metrics: riskMetrics,
        allocations: investmentAllocations,
        created_at: new Date().toISOString()
      })

    if (saveError) {
      logger.error("Failed to save optimization result", { error: saveError })
      // 保存エラーでも結果は返す
    }

    // 使用量を記録
    const { recordUsage } = await import("@/lib/ai/usage-limiter")
    await recordUsage(user.id, "portfolio_optimization", 0, 0, method)

    // 残り使用可能回数を取得
    const updatedUsage = await checkUsageLimit(user.id, "portfolio_optimization")

    const response = {
      success: true,
      optimization: optimizationResult,
      riskMetrics,
      allocations: investmentAllocations,
      investmentAmount,
      totalAssets: assets.length,
      method,
      constraints: defaultConstraints,
      metadata: {
        timestamp: new Date().toISOString(),
        historicalPeriod,
        dataSource: "CoinGecko",
        optimizer: "Modern Portfolio Theory"
      },
      usage: {
        dailyUsed: updatedUsage.dailyUsed,
        dailyLimit: updatedUsage.dailyLimit,
        monthlyUsed: updatedUsage.monthlyUsed,
        monthlyLimit: updatedUsage.monthlyLimit,
      }
    }

    logger.info("Portfolio optimization completed", {
      userId: user.id,
      assetsCount: assets.length,
      method,
      expectedReturn: optimizationResult.expectedReturn,
      volatility: optimizationResult.volatility,
      sharpeRatio: optimizationResult.sharpeRatio
    })

    return NextResponse.json(response)

  } catch (error) {
    logger.error("Portfolio optimization failed", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    })

    // エラーレスポンス
    if (error instanceof Error) {
      if (error.message.includes("No assets provided")) {
        return NextResponse.json(
          { error: "No valid assets found for optimization" },
          { status: 400 }
        )
      }
      if (error.message.includes("API key") || error.message.includes("rate limit")) {
        return NextResponse.json(
          { error: "Market data service temporarily unavailable" },
          { status: 503 }
        )
      }
    }

    return NextResponse.json(
      { error: "Portfolio optimization failed" },
      { status: 500 }
    )
  }
}

// 最適化履歴を取得
export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    
    // 認証チェック
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // URLパラメータを取得
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get("limit") || "10")
    const offset = parseInt(searchParams.get("offset") || "0")
    const method = searchParams.get("method")

    let query = supabase
      .from("portfolio_optimizations")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (method) {
      query = query.eq("method", method)
    }

    const { data: optimizations, error } = await query

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      optimizations: optimizations || [],
      pagination: {
        limit,
        offset,
        total: optimizations?.length || 0
      }
    })

  } catch (error) {
    logger.error("Failed to fetch optimization history", {
      error: error instanceof Error ? error.message : String(error)
    })

    return NextResponse.json(
      { error: "Failed to fetch optimization history" },
      { status: 500 }
    )
  }
} 