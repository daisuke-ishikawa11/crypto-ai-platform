import { createLogger } from "@/lib/monitoring/logger"

const logger = createLogger("risk-management")

export interface RiskParameters {
  confidenceLevel: number // 0.95 for 95% VaR
  timeHorizon: number // days
  simulationRuns: number // Monte Carlo runs
  lookbackPeriod: number // historical data period in days
}

export interface AssetRiskProfile {
  symbol: string
  currentPrice: number
  volatility: number
  returns: number[]
  beta: number
  correlation: Record<string, number>
  liquidityScore: number
  concentration: number
}

export interface PortfolioRiskMetrics {
  // Value at Risk
  var95: number
  var99: number
  
  // Expected Shortfall (Conditional VaR)
  es95: number
  es99: number
  
  // Drawdown measures
  maxDrawdown: number
  averageDrawdown: number
  drawdownDuration: number
  
  // Volatility measures
  portfolioVolatility: number
  volatilityContribution: Record<string, number>
  
  // Concentration risk
  concentrationRisk: number
  diversificationRatio: number
  
  // Liquidity risk
  liquidityRisk: number
  liquidityAdjustedVaR: number
  
  // Stress testing
  stressTestResults: StressTestResult[]
  
  // Risk attribution
  riskAttribution: Record<string, number>
}

export interface StressTestResult {
  scenario: string
  description: string
  portfolioLoss: number
  impactByAsset: Record<string, number>
  probability: number
}

export interface RiskAlert {
  id: string
  type: 'var_breach' | 'concentration' | 'liquidity' | 'correlation' | 'drawdown'
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
  value: number
  threshold: number
  recommendation: string
  timestamp: Date
}

export class RiskManager {
  private readonly riskParams: RiskParameters

  constructor(riskParams: Partial<RiskParameters> = {}) {
    this.riskParams = {
      confidenceLevel: 0.95,
      timeHorizon: 1,
      simulationRuns: 10000,
      lookbackPeriod: 252, // 1 year
      ...riskParams
    }
  }

  // Value at Risk (VaR) の計算
  calculateVaR(
    returns: number[],
    confidenceLevel: number = 0.95,
    timeHorizon: number = 1
  ): number {
    if (returns.length === 0) return 0

    const sortedReturns = [...returns].sort((a, b) => a - b)
    const index = Math.floor((1 - confidenceLevel) * sortedReturns.length)
    const var1Day = sortedReturns[index] || 0
    
    // 時間調整（平方根規則）
    return var1Day * Math.sqrt(timeHorizon)
  }

  // Expected Shortfall (ES) の計算
  calculateExpectedShortfall(
    returns: number[],
    confidenceLevel: number = 0.95
  ): number {
    if (returns.length === 0) return 0

    const sortedReturns = [...returns].sort((a, b) => a - b)
    const index = Math.floor((1 - confidenceLevel) * sortedReturns.length)
    const tailReturns = sortedReturns.slice(0, index)
    
    if (tailReturns.length === 0) return 0
    
    return tailReturns.reduce((sum, ret) => sum + ret, 0) / tailReturns.length
  }

  // 最大ドローダウンの計算
  calculateMaxDrawdown(prices: number[]): {
    maxDrawdown: number
    averageDrawdown: number
    drawdownDuration: number
  } {
    if (prices.length === 0) {
      return { maxDrawdown: 0, averageDrawdown: 0, drawdownDuration: 0 }
    }

    let maxDrawdown = 0
    let peak = prices[0]
    let peakIndex = 0
    let maxDuration = 0
    let currentDuration = 0
    const drawdowns: number[] = []

    for (let i = 1; i < prices.length; i++) {
      if (prices[i] > peak) {
        peak = prices[i]
        peakIndex = i
        if (currentDuration > maxDuration) {
          maxDuration = currentDuration
        }
        currentDuration = 0
      } else {
        currentDuration = i - peakIndex
        const drawdown = (peak - prices[i]) / peak
        drawdowns.push(drawdown)
        if (drawdown > maxDrawdown) {
          maxDrawdown = drawdown
        }
      }
    }

    const averageDrawdown = drawdowns.length > 0 
      ? drawdowns.reduce((sum, dd) => sum + dd, 0) / drawdowns.length 
      : 0

    return {
      maxDrawdown,
      averageDrawdown,
      drawdownDuration: maxDuration
    }
  }

  // モンテカルロシミュレーション
  private monteCarloSimulation(
    assetProfiles: AssetRiskProfile[],
    weights: number[],
    timeHorizon: number,
    runs: number
  ): number[] {
    const portfolioReturns: number[] = []
    
    for (let run = 0; run < runs; run++) {
      let portfolioReturn = 0
      
      // 各資産の収益率をシミュレート
      for (let i = 0; i < assetProfiles.length; i++) {
        const asset = assetProfiles[i]
        const weight = weights[i]
        
        // 正規分布からのランダムサンプリング
        const randomReturn = this.generateNormalRandom() * asset.volatility * Math.sqrt(timeHorizon)
        portfolioReturn += weight * randomReturn
      }
      
      portfolioReturns.push(portfolioReturn)
    }
    
    return portfolioReturns
  }

  // 正規分布の乱数生成（Box-Muller法）
  private generateNormalRandom(): number {
    const u1 = Math.random()
    const u2 = Math.random()
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
  }

  // ポートフォリオリスク分析
  async analyzePortfolioRisk(
    assetProfiles: AssetRiskProfile[],
    weights: number[],
    portfolioPrices: number[]
  ): Promise<PortfolioRiskMetrics> {
    logger.info('Starting portfolio risk analysis', {
      assetsCount: assetProfiles.length,
      timeHorizon: this.riskParams.timeHorizon,
      confidenceLevel: this.riskParams.confidenceLevel
    })

    // ポートフォリオ収益率の計算
    const portfolioReturns = this.calculatePortfolioReturns(assetProfiles, weights)
    
    // モンテカルロシミュレーション
    const mcReturns = this.monteCarloSimulation(
      assetProfiles,
      weights,
      this.riskParams.timeHorizon,
      this.riskParams.simulationRuns
    )

    // VaR計算
    const var95 = this.calculateVaR(mcReturns, 0.95, this.riskParams.timeHorizon)
    const var99 = this.calculateVaR(mcReturns, 0.99, this.riskParams.timeHorizon)

    // Expected Shortfall計算
    const es95 = this.calculateExpectedShortfall(mcReturns, 0.95)
    const es99 = this.calculateExpectedShortfall(mcReturns, 0.99)

    // ドローダウン分析
    const drawdownMetrics = this.calculateMaxDrawdown(portfolioPrices)

    // ポートフォリオボラティリティ
    const portfolioVolatility = this.calculatePortfolioVolatility(assetProfiles, weights)

    // リスク寄与度
    const riskAttribution = this.calculateRiskAttribution(assetProfiles, weights)

    // 流動性リスク
    const liquidityRisk = this.calculateLiquidityRisk(assetProfiles, weights)

    // 集中リスク
    const concentrationRisk = this.calculateConcentrationRisk(weights)

    // 分散化比率
    const diversificationRatio = this.calculateDiversificationRatio(assetProfiles, weights)

    // ストレステスト
    const stressTestResults = await this.performStressTests(assetProfiles, weights)

    // ボラティリティ寄与度
    const volatilityContribution = this.calculateVolatilityContribution(assetProfiles, weights)

    // 流動性調整VaR
    const liquidityAdjustedVaR = var95 * (1 + liquidityRisk)

    const metrics: PortfolioRiskMetrics = {
      var95: Math.abs(var95),
      var99: Math.abs(var99),
      es95: Math.abs(es95),
      es99: Math.abs(es99),
      maxDrawdown: drawdownMetrics.maxDrawdown,
      averageDrawdown: drawdownMetrics.averageDrawdown,
      drawdownDuration: drawdownMetrics.drawdownDuration,
      portfolioVolatility,
      volatilityContribution,
      concentrationRisk,
      diversificationRatio,
      liquidityRisk,
      liquidityAdjustedVaR: Math.abs(liquidityAdjustedVaR),
      stressTestResults,
      riskAttribution
    }

    logger.info('Portfolio risk analysis completed', {
      var95: metrics.var95,
      var99: metrics.var99,
      maxDrawdown: metrics.maxDrawdown,
      concentrationRisk: metrics.concentrationRisk
    })

    return metrics
  }

  // ポートフォリオ収益率の計算
  private calculatePortfolioReturns(
    assetProfiles: AssetRiskProfile[],
    weights: number[]
  ): number[] {
    const maxLength = Math.max(...assetProfiles.map(a => a.returns.length))
    const portfolioReturns: number[] = []

    for (let i = 0; i < maxLength; i++) {
      let portfolioReturn = 0
      let totalWeight = 0

      for (let j = 0; j < assetProfiles.length; j++) {
        const asset = assetProfiles[j]
        const weight = weights[j]
        
        if (i < asset.returns.length) {
          portfolioReturn += weight * asset.returns[i]
          totalWeight += weight
        }
      }

      if (totalWeight > 0) {
        portfolioReturns.push(portfolioReturn / totalWeight)
      }
    }

    return portfolioReturns
  }

  // ポートフォリオボラティリティの計算
  private calculatePortfolioVolatility(
    assetProfiles: AssetRiskProfile[],
    weights: number[]
  ): number {
    let variance = 0

    for (let i = 0; i < assetProfiles.length; i++) {
      for (let j = 0; j < assetProfiles.length; j++) {
        const correlation = i === j ? 1 : (assetProfiles[i].correlation[assetProfiles[j].symbol] || 0)
        variance += weights[i] * weights[j] * assetProfiles[i].volatility * assetProfiles[j].volatility * correlation
      }
    }

    return Math.sqrt(variance)
  }

  // リスク寄与度の計算
  private calculateRiskAttribution(
    assetProfiles: AssetRiskProfile[],
    weights: number[]
  ): Record<string, number> {
    const portfolioVolatility = this.calculatePortfolioVolatility(assetProfiles, weights)
    const attribution: Record<string, number> = {}

    for (let i = 0; i < assetProfiles.length; i++) {
      const asset = assetProfiles[i]
      let marginalContribution = 0

      for (let j = 0; j < assetProfiles.length; j++) {
        const correlation = i === j ? 1 : (asset.correlation[assetProfiles[j].symbol] || 0)
        marginalContribution += weights[j] * assetProfiles[j].volatility * correlation
      }

      const riskContribution = weights[i] * asset.volatility * marginalContribution / portfolioVolatility
      attribution[asset.symbol] = riskContribution
    }

    return attribution
  }

  // 流動性リスクの計算
  private calculateLiquidityRisk(
    assetProfiles: AssetRiskProfile[],
    weights: number[]
  ): number {
    let liquidityRisk = 0

    for (let i = 0; i < assetProfiles.length; i++) {
      const asset = assetProfiles[i]
      const weight = weights[i]
      liquidityRisk += weight * (1 - asset.liquidityScore)
    }

    return liquidityRisk
  }

  // 集中リスクの計算（ハーフィンダール指数）
  private calculateConcentrationRisk(weights: number[]): number {
    return weights.reduce((sum, weight) => sum + weight * weight, 0)
  }

  // 分散化比率の計算
  private calculateDiversificationRatio(
    assetProfiles: AssetRiskProfile[],
    weights: number[]
  ): number {
    const weightedAvgVolatility = weights.reduce((sum, weight, i) => sum + weight * assetProfiles[i].volatility, 0)
    const portfolioVolatility = this.calculatePortfolioVolatility(assetProfiles, weights)
    
    return portfolioVolatility === 0 ? 0 : weightedAvgVolatility / portfolioVolatility
  }

  // ボラティリティ寄与度の計算
  private calculateVolatilityContribution(
    assetProfiles: AssetRiskProfile[],
    weights: number[]
  ): Record<string, number> {
    const portfolioVolatility = this.calculatePortfolioVolatility(assetProfiles, weights)
    const contribution: Record<string, number> = {}

    for (let i = 0; i < assetProfiles.length; i++) {
      const asset = assetProfiles[i]
      contribution[asset.symbol] = (weights[i] * asset.volatility) / portfolioVolatility
    }

    return contribution
  }

  // ストレステストの実行
  private async performStressTests(
    assetProfiles: AssetRiskProfile[],
    weights: number[]
  ): Promise<StressTestResult[]> {
    const scenarios = [
      {
        name: 'market_crash',
        description: '市場暴落シナリオ（全資産-30%）',
        shocks: assetProfiles.map(() => -0.30),
        probability: 0.05
      },
      {
        name: 'crypto_winter',
        description: 'クリプトウィンター（暗号通貨-50%）',
        shocks: assetProfiles.map(() => -0.50),
        probability: 0.10
      },
      {
        name: 'liquidity_crisis',
        description: '流動性危機（流動性低下）',
        shocks: assetProfiles.map(asset => -0.20 * (1 - asset.liquidityScore)),
        probability: 0.15
      },
      {
        name: 'high_volatility',
        description: '高ボラティリティ環境',
        shocks: assetProfiles.map(asset => -asset.volatility * 2),
        probability: 0.20
      }
    ]

    const results: StressTestResult[] = []

    for (const scenario of scenarios) {
      let portfolioLoss = 0
      const impactByAsset: Record<string, number> = {}

      for (let i = 0; i < assetProfiles.length; i++) {
        const asset = assetProfiles[i]
        const weight = weights[i]
        const shock = scenario.shocks[i]
        const assetLoss = weight * shock * asset.currentPrice
        
        portfolioLoss += assetLoss
        impactByAsset[asset.symbol] = assetLoss
      }

      results.push({
        scenario: scenario.name,
        description: scenario.description,
        portfolioLoss,
        impactByAsset,
        probability: scenario.probability
      })
    }

    return results
  }

  // リスクアラートの生成
  generateRiskAlerts(
    metrics: PortfolioRiskMetrics,
    thresholds: {
      var95: number
      concentrationRisk: number
      liquidityRisk: number
      maxDrawdown: number
    }
  ): RiskAlert[] {
    const alerts: RiskAlert[] = []

    // VaR閾値チェック
    if (metrics.var95 > thresholds.var95) {
      alerts.push({
        id: `var_breach_${Date.now()}`,
        type: 'var_breach',
        severity: metrics.var95 > thresholds.var95 * 2 ? 'critical' : 'high',
        message: `VaR95が閾値を超過しています`,
        value: metrics.var95,
        threshold: thresholds.var95,
        recommendation: 'ポジションサイズを縮小し、リスク分散を検討してください',
        timestamp: new Date()
      })
    }

    // 集中リスクチェック
    if (metrics.concentrationRisk > thresholds.concentrationRisk) {
      alerts.push({
        id: `concentration_${Date.now()}`,
        type: 'concentration',
        severity: metrics.concentrationRisk > 0.5 ? 'high' : 'medium',
        message: `ポートフォリオの集中リスクが高すぎます`,
        value: metrics.concentrationRisk,
        threshold: thresholds.concentrationRisk,
        recommendation: 'より多くの資産に分散投資することを検討してください',
        timestamp: new Date()
      })
    }

    // 流動性リスクチェック
    if (metrics.liquidityRisk > thresholds.liquidityRisk) {
      alerts.push({
        id: `liquidity_${Date.now()}`,
        type: 'liquidity',
        severity: metrics.liquidityRisk > 0.7 ? 'high' : 'medium',
        message: `流動性リスクが高すぎます`,
        value: metrics.liquidityRisk,
        threshold: thresholds.liquidityRisk,
        recommendation: 'より流動性の高い資産の比重を増やすことを検討してください',
        timestamp: new Date()
      })
    }

    // ドローダウンチェック
    if (metrics.maxDrawdown > thresholds.maxDrawdown) {
      alerts.push({
        id: `drawdown_${Date.now()}`,
        type: 'drawdown',
        severity: metrics.maxDrawdown > 0.5 ? 'critical' : 'high',
        message: `最大ドローダウンが許容範囲を超えています`,
        value: metrics.maxDrawdown,
        threshold: thresholds.maxDrawdown,
        recommendation: 'ポジションサイズを縮小し、ストップロスの設定を検討してください',
        timestamp: new Date()
      })
    }

    return alerts
  }

  // リスク調整後リターンの計算
  calculateRiskAdjustedReturns(
    returns: number[],
    riskFreeRate: number = 0.02
  ): {
    sharpeRatio: number
    sortinoRatio: number
    calmarRatio: number
    informationRatio: number
  } {
    const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length
    const excessReturn = avgReturn - riskFreeRate
    const volatility = Math.sqrt(
      returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length
    )

    // 下方偏差の計算
    const downside = returns.filter(r => r < riskFreeRate)
    const downsideDeviation = downside.length > 0 
      ? Math.sqrt(downside.reduce((sum, r) => sum + Math.pow(r - riskFreeRate, 2), 0) / downside.length)
      : 0

    // 最大ドローダウン
    const { maxDrawdown } = this.calculateMaxDrawdown(returns)

    return {
      sharpeRatio: volatility > 0 ? excessReturn / volatility : 0,
      sortinoRatio: downsideDeviation > 0 ? excessReturn / downsideDeviation : 0,
      calmarRatio: maxDrawdown > 0 ? avgReturn / maxDrawdown : 0,
      informationRatio: volatility > 0 ? excessReturn / volatility : 0 // 簡易計算
    }
  }
}