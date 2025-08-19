import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { RiskManager, AssetRiskProfile, RiskParameters } from "@/lib/risk/risk-management"
import { CoinGeckoClient } from "@/lib/market/coingecko"
import { createLogger } from "@/lib/monitoring/logger"

const logger = createLogger("risk-analysis-api")

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
    const usageCheck = await checkUsageLimit(user.id, "risk_analysis")
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
      portfolio, 
      riskParameters,
      alertThresholds 
    } = body

    if (!portfolio || !portfolio.assets || portfolio.assets.length === 0) {
      return NextResponse.json(
        { error: "Portfolio with assets is required" },
        { status: 400 }
      )
    }

    // デフォルトのリスクパラメータ
    const defaultRiskParams: RiskParameters = {
      confidenceLevel: 0.95,
      timeHorizon: 1,
      simulationRuns: 10000,
      lookbackPeriod: 252,
      ...riskParameters
    }

    // デフォルトのアラート閾値
    const defaultAlertThresholds = {
      var95: 0.05, // 5%
      concentrationRisk: 0.30, // 30%
      liquidityRisk: 0.40, // 40%
      maxDrawdown: 0.25, // 25%
      ...alertThresholds
    }

    // 市場データを取得してリスクプロファイルを作成
    const coinGecko = new CoinGeckoClient()
    const assetProfiles: AssetRiskProfile[] = []
    const portfolioPrices: number[] = []

    logger.info("Fetching market data for risk analysis", {
      assetsCount: portfolio.assets.length,
      lookbackPeriod: defaultRiskParams.lookbackPeriod
    })

    for (const asset of portfolio.assets) {
      try {
        const { symbol, weight } = asset
        
        // 現在価格を取得
        const simple = await coinGecko.getSimplePrice([symbol], ['usd'])
        const priceData = { usd: simple?.[symbol]?.usd ?? 0 }
        
        // 履歴データを取得
        const marketChart = await coinGecko.getMarketChart(symbol, 'usd', String(defaultRiskParams.lookbackPeriod))
        const historicalData = (marketChart.prices || []).map(([_, price]) => ({ price }))
        
        if (historicalData.length < 30) {
          logger.warn(`Insufficient historical data for ${symbol}`, {
            dataPoints: historicalData.length
          })
          continue
        }

        // 価格データとリターンを計算
        const prices = historicalData.map((d: { price: number }) => d.price)
        const returns = []
        for (let i = 1; i < prices.length; i++) {
          returns.push((prices[i] - prices[i-1]) / prices[i-1])
        }

        // ボラティリティを計算
        const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length
        const volatility = Math.sqrt(
          returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length
        )

        // 他の資産との相関を計算（簡易版）
        const correlations: Record<string, number> = {}
        for (const otherAsset of portfolio.assets) {
          if (otherAsset.symbol !== symbol) {
            // 実装簡易化のため固定値を使用
            // 実際の実装では全資産の価格データから相関を計算
            correlations[otherAsset.symbol] = 0.5
          }
        }

        // 流動性スコアを計算（出来高と時価総額から）
        const coinDetails = await coinGecko.getCoinDetails(symbol)
        const marketData = { market_data: { total_volume: { usd: coinDetails?.market_data?.total_volume?.usd || 0 } } }
        const liquidityScore = Math.min(1, 
          Math.log(marketData.market_data.total_volume.usd || 1) / Math.log(1000000000) // 10億USDで正規化
        )

        // ベータ値を計算（市場との相関、簡易版）
        const beta = volatility / 0.04 // 仮想的な市場ボラティリティ4%で正規化

        const assetProfile: AssetRiskProfile = {
          symbol,
          currentPrice: priceData.usd,
          volatility,
          returns,
          beta,
          correlation: correlations,
          liquidityScore: Math.max(0, liquidityScore),
          concentration: weight
        }

        assetProfiles.push(assetProfile)
        
        // ポートフォリオ価格の重み付け平均を計算
        const weightedPrices = prices.map((p: number) => p * (weight as number))
        if (portfolioPrices.length === 0) {
          portfolioPrices.push(...weightedPrices)
        } else {
          for (let i = 0; i < Math.min(portfolioPrices.length, weightedPrices.length); i++) {
            portfolioPrices[i] += weightedPrices[i]
          }
        }

      } catch (error) {
        logger.error(`Failed to fetch data for ${asset.symbol}`, { error })
        continue
      }
    }

    if (assetProfiles.length === 0) {
      return NextResponse.json(
        { error: "No valid asset data found for risk analysis" },
        { status: 400 }
      )
    }

    // 重みを抽出
    const weights = portfolio.assets.map((asset: { weight: number }) => asset.weight)

    // リスク分析を実行
    const riskManager = new RiskManager(defaultRiskParams)
    const riskMetrics = await riskManager.analyzePortfolioRisk(
      assetProfiles,
      weights,
      portfolioPrices
    )

    // リスクアラートを生成
    const alerts = riskManager.generateRiskAlerts(riskMetrics, defaultAlertThresholds)

    // リスク調整後リターンを計算
    const portfolioReturns = riskManager['calculatePortfolioReturns'](assetProfiles, weights)
    const riskAdjustedReturns = riskManager.calculateRiskAdjustedReturns(portfolioReturns)

    // 結果をデータベースに保存
    const { error: saveError } = await supabase
      .from("risk_analyses")
      .insert({
        user_id: user.id,
        portfolio_id: portfolio.id,
        risk_metrics: riskMetrics,
        risk_parameters: defaultRiskParams,
        alert_thresholds: defaultAlertThresholds,
        alerts: alerts,
        risk_adjusted_returns: riskAdjustedReturns,
        asset_profiles: assetProfiles.map(profile => ({
          symbol: profile.symbol,
          volatility: profile.volatility,
          beta: profile.beta,
          liquidityScore: profile.liquidityScore,
          concentration: profile.concentration
        })),
        created_at: new Date().toISOString()
      })

    if (saveError) {
      logger.error("Failed to save risk analysis", { error: saveError })
      // 保存エラーでも結果は返す
    }

    // 使用量を記録
    const { recordUsage } = await import("@/lib/ai/usage-limiter")
    await recordUsage(user.id, "risk_analysis", 0, 0, "risk_analysis")

    // 残り使用可能回数を取得
    const updatedUsage = await checkUsageLimit(user.id, "risk_analysis")

    const response = {
      success: true,
      riskMetrics,
      alerts,
      riskAdjustedReturns,
      assetProfiles: assetProfiles.map(profile => ({
        symbol: profile.symbol,
        volatility: profile.volatility,
        beta: profile.beta,
        liquidityScore: profile.liquidityScore,
        concentration: profile.concentration,
        currentPrice: profile.currentPrice
      })),
      parameters: defaultRiskParams,
      thresholds: defaultAlertThresholds,
      metadata: {
        timestamp: new Date().toISOString(),
        assetsAnalyzed: assetProfiles.length,
        dataSource: "CoinGecko",
        riskModel: "Monte Carlo Simulation"
      },
      usage: {
        dailyUsed: updatedUsage.dailyUsed,
        dailyLimit: updatedUsage.dailyLimit,
        monthlyUsed: updatedUsage.monthlyUsed,
        monthlyLimit: updatedUsage.monthlyLimit,
      }
    }

    logger.info("Risk analysis completed", {
      userId: user.id,
      assetsAnalyzed: assetProfiles.length,
      var95: riskMetrics.var95,
      alertsCount: alerts.length,
      maxDrawdown: riskMetrics.maxDrawdown
    })

    return NextResponse.json(response)

  } catch (error) {
    logger.error("Risk analysis failed", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    })

    // エラーレスポンス
    if (error instanceof Error) {
      if (error.message.includes("API key") || error.message.includes("rate limit")) {
        return NextResponse.json(
          { error: "Market data service temporarily unavailable" },
          { status: 503 }
        )
      }
      if (error.message.includes("Insufficient")) {
        return NextResponse.json(
          { error: "Insufficient historical data for analysis" },
          { status: 400 }
        )
      }
    }

    return NextResponse.json(
      { error: "Risk analysis failed" },
      { status: 500 }
    )
  }
}

// リスク分析履歴を取得
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
    const portfolioId = searchParams.get("portfolio_id")

    let query = supabase
      .from("risk_analyses")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (portfolioId) {
      query = query.eq("portfolio_id", portfolioId)
    }

    const { data: analyses, error } = await query

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      analyses: analyses || [],
      pagination: {
        limit,
        offset,
        total: analyses?.length || 0
      }
    })

  } catch (error) {
    logger.error("Failed to fetch risk analysis history", {
      error: error instanceof Error ? error.message : String(error)
    })

    return NextResponse.json(
      { error: "Failed to fetch risk analysis history" },
      { status: 500 }
    )
  }
}
