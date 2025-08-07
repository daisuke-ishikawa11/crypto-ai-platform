import { createLogger } from "@/lib/monitoring/logger"

const logger = createLogger("portfolio-optimization")

export interface AssetData {
  symbol: string
  price: number
  historicalReturns: number[]
  weight?: number
  minWeight?: number
  maxWeight?: number
}

export interface PortfolioConstraints {
  minWeight: number
  maxWeight: number
  maxAssets?: number
  riskFreeRate: number
  targetReturn?: number
  maxRisk?: number
  rebalanceFrequency?: 'daily' | 'weekly' | 'monthly' | 'quarterly'
}

export interface OptimizationResult {
  weights: Record<string, number>
  expectedReturn: number
  volatility: number
  sharpeRatio: number
  metrics: {
    totalAllocation: number
    diversificationRatio: number
    maxDrawdown: number
    valueAtRisk: number
  }
  allocations: Array<{
    symbol: string
    weight: number
    expectedReturn: number
    volatility: number
    allocation: number
  }>
}

export interface RiskMetrics {
  volatility: number
  sharpeRatio: number
  maxDrawdown: number
  valueAtRisk: number
  expectedShortfall: number
  beta: number
  alpha: number
  informationRatio: number
}

export class PortfolioOptimizer {
  private riskFreeRate: number = 0.02 // 2%のリスクフリーレート

  constructor(riskFreeRate: number = 0.02) {
    this.riskFreeRate = riskFreeRate
  }

  // 共分散行列の計算
  private calculateCovarianceMatrix(assets: AssetData[]): number[][] {
    const n = assets.length
    const covariance: number[][] = Array(n).fill(0).map(() => Array(n).fill(0))

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        covariance[i][j] = this.calculateCovariance(
          assets[i].historicalReturns,
          assets[j].historicalReturns
        )
      }
    }

    return covariance
  }

  // 共分散の計算
  private calculateCovariance(returns1: number[], returns2: number[]): number {
    const n = Math.min(returns1.length, returns2.length)
    if (n === 0) return 0

    const mean1 = returns1.slice(0, n).reduce((sum, r) => sum + r, 0) / n
    const mean2 = returns2.slice(0, n).reduce((sum, r) => sum + r, 0) / n

    let covariance = 0
    for (let i = 0; i < n; i++) {
      covariance += (returns1[i] - mean1) * (returns2[i] - mean2)
    }

    return covariance / (n - 1)
  }

  // 期待リターンの計算
  private calculateExpectedReturn(returns: number[]): number {
    if (returns.length === 0) return 0
    return returns.reduce((sum, r) => sum + r, 0) / returns.length
  }

  // ボラティリティ（標準偏差）の計算
  private calculateVolatility(returns: number[]): number {
    if (returns.length === 0) return 0
    
    const mean = this.calculateExpectedReturn(returns)
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / (returns.length - 1)
    return Math.sqrt(variance)
  }

  // ポートフォリオの期待リターンを計算
  private calculatePortfolioReturn(weights: number[], expectedReturns: number[]): number {
    return weights.reduce((sum, w, i) => sum + w * expectedReturns[i], 0)
  }

  // ポートフォリオのボラティリティを計算
  private calculatePortfolioVolatility(weights: number[], covarianceMatrix: number[][]): number {
    let variance = 0
    const n = weights.length

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        variance += weights[i] * weights[j] * covarianceMatrix[i][j]
      }
    }

    return Math.sqrt(variance)
  }

  // シャープレシオの計算
  private calculateSharpeRatio(portfolioReturn: number, volatility: number): number {
    if (volatility === 0) return 0
    return (portfolioReturn - this.riskFreeRate) / volatility
  }

  // 最小分散ポートフォリオの計算
  private optimizeMinVariance(
    assets: AssetData[],
    constraints: PortfolioConstraints
  ): number[] {
    const n = assets.length
    const covarianceMatrix = this.calculateCovarianceMatrix(assets)
    
    // 簡易的な最小分散最適化（実際の実装では数値最適化ライブラリを使用）
    const weights = Array(n).fill(1 / n)
    
    // 制約条件を適用
    for (let i = 0; i < n; i++) {
      const asset = assets[i]
      const minWeight = asset.minWeight || constraints.minWeight
      const maxWeight = asset.maxWeight || constraints.maxWeight
      
      weights[i] = Math.max(minWeight, Math.min(maxWeight, weights[i]))
    }

    // 重みを正規化
    const totalWeight = weights.reduce((sum, w) => sum + w, 0)
    return weights.map(w => w / totalWeight)
  }

  // 最大シャープレシオポートフォリオの計算
  private optimizeMaxSharpe(
    assets: AssetData[],
    constraints: PortfolioConstraints
  ): number[] {
    const n = assets.length
    const expectedReturns = assets.map(a => this.calculateExpectedReturn(a.historicalReturns))
    const covarianceMatrix = this.calculateCovarianceMatrix(assets)
    
    // 簡易的な最大シャープレシオ最適化
    let bestWeights = Array(n).fill(1 / n)
    let bestSharpe = -Infinity
    
    // グリッドサーチによる近似最適化
    const iterations = 1000
    for (let iter = 0; iter < iterations; iter++) {
      const weights = this.generateRandomWeights(n, constraints)
      
      const portfolioReturn = this.calculatePortfolioReturn(weights, expectedReturns)
      const portfolioVolatility = this.calculatePortfolioVolatility(weights, covarianceMatrix)
      const sharpeRatio = this.calculateSharpeRatio(portfolioReturn, portfolioVolatility)
      
      if (sharpeRatio > bestSharpe) {
        bestSharpe = sharpeRatio
        bestWeights = [...weights]
      }
    }
    
    return bestWeights
  }

  // ランダムな重みを生成（制約条件を満たす）
  private generateRandomWeights(n: number, constraints: PortfolioConstraints): number[] {
    const weights = Array(n).fill(0)
    
    // ランダムな重みを生成
    for (let i = 0; i < n; i++) {
      weights[i] = Math.random()
    }
    
    // 正規化
    let totalWeight = weights.reduce((sum, w) => sum + w, 0)
    for (let i = 0; i < n; i++) {
      weights[i] = weights[i] / totalWeight
    }
    
    // 制約条件を適用
    for (let i = 0; i < n; i++) {
      weights[i] = Math.max(constraints.minWeight, Math.min(constraints.maxWeight, weights[i]))
    }
    
    // 再正規化
    totalWeight = weights.reduce((sum, w) => sum + w, 0)
    return weights.map(w => w / totalWeight)
  }

  // リスクパリティポートフォリオの計算
  private optimizeRiskParity(assets: AssetData[]): number[] {
    const n = assets.length
    const volatilities = assets.map(a => this.calculateVolatility(a.historicalReturns))
    
    // 各資産の逆ボラティリティで重み付け
    const inverseVolatilities = volatilities.map(v => v === 0 ? 0 : 1 / v)
    const totalInverseVolatility = inverseVolatilities.reduce((sum, iv) => sum + iv, 0)
    
    return inverseVolatilities.map(iv => iv / totalInverseVolatility)
  }

  // 等価重みポートフォリオの計算
  private optimizeEqualWeight(assets: AssetData[]): number[] {
    const n = assets.length
    return Array(n).fill(1 / n)
  }

  // メインの最適化関数
  async optimize(
    assets: AssetData[],
    constraints: PortfolioConstraints,
    method: 'min_variance' | 'max_sharpe' | 'risk_parity' | 'equal_weight' = 'max_sharpe'
  ): Promise<OptimizationResult> {
    if (assets.length === 0) {
      throw new Error('No assets provided for optimization')
    }

    logger.info('Starting portfolio optimization', {
      assetsCount: assets.length,
      method,
      constraints
    })

    let weights: number[]

    switch (method) {
      case 'min_variance':
        weights = this.optimizeMinVariance(assets, constraints)
        break
      case 'max_sharpe':
        weights = this.optimizeMaxSharpe(assets, constraints)
        break
      case 'risk_parity':
        weights = this.optimizeRiskParity(assets)
        break
      case 'equal_weight':
        weights = this.optimizeEqualWeight(assets)
        break
      default:
        throw new Error(`Unknown optimization method: ${method}`)
    }

    // 最適化結果を計算
    const result = this.calculateOptimizationResult(assets, weights, constraints)
    
    logger.info('Portfolio optimization completed', {
      method,
      expectedReturn: result.expectedReturn,
      volatility: result.volatility,
      sharpeRatio: result.sharpeRatio,
      totalAllocation: result.metrics.totalAllocation
    })

    return result
  }

  // 最適化結果を計算
  private calculateOptimizationResult(
    assets: AssetData[],
    weights: number[],
    constraints: PortfolioConstraints
  ): OptimizationResult {
    const expectedReturns = assets.map(a => this.calculateExpectedReturn(a.historicalReturns))
    const volatilities = assets.map(a => this.calculateVolatility(a.historicalReturns))
    const covarianceMatrix = this.calculateCovarianceMatrix(assets)

    const portfolioReturn = this.calculatePortfolioReturn(weights, expectedReturns)
    const portfolioVolatility = this.calculatePortfolioVolatility(weights, covarianceMatrix)
    const sharpeRatio = this.calculateSharpeRatio(portfolioReturn, portfolioVolatility)

    // 重みをオブジェクト形式に変換
    const weightMap: Record<string, number> = {}
    assets.forEach((asset, i) => {
      weightMap[asset.symbol] = weights[i]
    })

    // 各資産の配分情報を計算
    const allocations = assets.map((asset, i) => ({
      symbol: asset.symbol,
      weight: weights[i],
      expectedReturn: expectedReturns[i],
      volatility: volatilities[i],
      allocation: weights[i] * 100 // パーセンテージ
    }))

    // 追加メトリクスを計算
    const metrics = {
      totalAllocation: weights.reduce((sum, w) => sum + w, 0),
      diversificationRatio: this.calculateDiversificationRatio(weights, volatilities, portfolioVolatility),
      maxDrawdown: this.calculateMaxDrawdown(assets, weights),
      valueAtRisk: this.calculateValueAtRisk(assets, weights, 0.05)
    }

    return {
      weights: weightMap,
      expectedReturn: portfolioReturn,
      volatility: portfolioVolatility,
      sharpeRatio,
      metrics,
      allocations
    }
  }

  // 分散化比率の計算
  private calculateDiversificationRatio(
    weights: number[],
    volatilities: number[],
    portfolioVolatility: number
  ): number {
    const weightedAvgVolatility = weights.reduce((sum, w, i) => sum + w * volatilities[i], 0)
    return portfolioVolatility === 0 ? 0 : weightedAvgVolatility / portfolioVolatility
  }

  // 最大ドローダウンの計算
  private calculateMaxDrawdown(assets: AssetData[], weights: number[]): number {
    if (assets.length === 0 || assets[0].historicalReturns.length === 0) {
      return 0
    }

    const returns = assets[0].historicalReturns.map((_, i) => {
      return weights.reduce((sum, w, j) => sum + w * assets[j].historicalReturns[i], 0)
    })

    let maxDrawdown = 0
    let peak = 0
    let cumulative = 0

    for (const ret of returns) {
      cumulative += ret
      if (cumulative > peak) {
        peak = cumulative
      }
      const drawdown = (peak - cumulative) / peak
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown
      }
    }

    return maxDrawdown
  }

  // Value at Risk (VaR) の計算
  private calculateValueAtRisk(assets: AssetData[], weights: number[], confidence: number): number {
    if (assets.length === 0 || assets[0].historicalReturns.length === 0) {
      return 0
    }

    const returns = assets[0].historicalReturns.map((_, i) => {
      return weights.reduce((sum, w, j) => sum + w * assets[j].historicalReturns[i], 0)
    })

    returns.sort((a, b) => a - b)
    const index = Math.floor(returns.length * confidence)
    return returns[index] || 0
  }

  // リスクメトリクスの計算
  calculateRiskMetrics(assets: AssetData[], weights: number[]): RiskMetrics {
    const expectedReturns = assets.map(a => this.calculateExpectedReturn(a.historicalReturns))
    const volatilities = assets.map(a => this.calculateVolatility(a.historicalReturns))
    const covarianceMatrix = this.calculateCovarianceMatrix(assets)

    const portfolioReturn = this.calculatePortfolioReturn(weights, expectedReturns)
    const portfolioVolatility = this.calculatePortfolioVolatility(weights, covarianceMatrix)
    const sharpeRatio = this.calculateSharpeRatio(portfolioReturn, portfolioVolatility)
    const maxDrawdown = this.calculateMaxDrawdown(assets, weights)
    const valueAtRisk = this.calculateValueAtRisk(assets, weights, 0.05)
    const expectedShortfall = this.calculateValueAtRisk(assets, weights, 0.025)

    return {
      volatility: portfolioVolatility,
      sharpeRatio,
      maxDrawdown,
      valueAtRisk,
      expectedShortfall,
      beta: 1.0, // 市場ベータ（簡易計算）
      alpha: portfolioReturn - this.riskFreeRate, // 超過リターン
      informationRatio: sharpeRatio, // 情報比率（簡易計算）
    }
  }

  // ポートフォリオのリバランス提案
  async suggestRebalancing(
    currentWeights: Record<string, number>,
    targetWeights: Record<string, number>,
    threshold: number = 0.05
  ): Promise<{
    needsRebalancing: boolean
    rebalanceActions: Array<{
      symbol: string
      currentWeight: number
      targetWeight: number
      action: 'buy' | 'sell' | 'hold'
      amount: number
    }>
  }> {
    const rebalanceActions = []
    let needsRebalancing = false

    for (const [symbol, targetWeight] of Object.entries(targetWeights)) {
      const currentWeight = currentWeights[symbol] || 0
      const deviation = Math.abs(currentWeight - targetWeight)

      if (deviation > threshold) {
        needsRebalancing = true
      }

      rebalanceActions.push({
        symbol,
        currentWeight,
        targetWeight,
        action: currentWeight < targetWeight ? 'buy' as const : 
                currentWeight > targetWeight ? 'sell' as const : 'hold' as const,
        amount: Math.abs(currentWeight - targetWeight)
      })
    }

    return {
      needsRebalancing,
      rebalanceActions
    }
  }
}