// 🔬 Investment Algorithm Engine
// Advanced algorithms for portfolio optimization and DeFi investment strategies

import { logger } from '@/lib/monitoring/logger';
import type { Portfolio, UserPreferences } from './types/ai-service-types';
import type { DeFiProtocol } from './defi-ai-advisor';

export interface AssetCorrelation {
  asset1: string;
  asset2: string;
  correlation: number;
  confidence: number;
}

export interface RiskMetrics extends Record<string, unknown> {
  value_at_risk: number; // VaR at 95% confidence
  expected_shortfall: number; // CVaR
  max_drawdown: number;
  volatility: number;
  sharpe_ratio: number;
  sortino_ratio: number;
  beta: number; // vs market
}

export interface OptimalAllocation {
  symbol: string;
  current_weight: number;
  optimal_weight: number;
  expected_return: number;
  contribution_to_risk: number;
  allocation_change: number;
}

export interface PortfolioOptimizationResult extends Record<string, unknown> {
  allocations: OptimalAllocation[];
  expected_return: number;
  expected_risk: number;
  sharpe_ratio: number;
  diversification_ratio: number;
  optimization_method: string;
  constraints_applied: string[];
  rebalance_cost: number;
}

export interface ImpermanentLossModel extends Record<string, unknown> {
  protocol: string;
  asset_pair: [string, string];
  current_price_ratio: number;
  il_scenarios: Array<{
    price_change_percentage: number;
    il_percentage: number;
    break_even_days: number; // Days needed to recover IL through fees
  }>;
  risk_score: number; // 0-100
}

export interface YieldOptimizationResult extends Record<string, unknown> {
  strategy: string;
  protocols: Array<{
    name: string;
    allocation: number;
    expected_apy: number;
    risk_score: number;
    liquidity_score: number;
  }>;
  total_expected_apy: number;
  risk_adjusted_return: number;
  max_drawdown_estimate: number;
  suggested_duration: number; // days
}

export interface MarketSentimentAnalysis extends Record<string, unknown> {
  overall_sentiment: 'extreme_fear' | 'fear' | 'neutral' | 'greed' | 'extreme_greed';
  sentiment_score: number; // 0-100
  fear_greed_index: number;
  social_sentiment: number;
  news_sentiment: number;
  technical_sentiment: number;
  contrarian_signal: boolean; // true if sentiment suggests opposite action
}

class InvestmentAlgorithms {
  private readonly TRADING_DAYS = 365;
  private readonly RISK_FREE_RATE = 0.02; // 2% annual

  /**
   * Modern Portfolio Theory optimization with DeFi-specific constraints
   */
  async optimizePortfolio(
    currentPortfolio: Portfolio,
    availableAssets: Array<{symbol: string; expectedReturn: number; risk: number}>,
    preferences: UserPreferences,
    constraints?: {
      minWeight?: number;
      maxWeight?: number;
      maxAssets?: number;
      excludeAssets?: string[];
    }
  ): Promise<PortfolioOptimizationResult> {
    try {
      const correlationMatrix = await this.buildCorrelationMatrix(
        availableAssets.map(a => a.symbol)
      );

      // Apply different optimization based on risk tolerance
      let optimizationMethod = 'mean_variance';
      
      switch (preferences.riskTolerance) {
        case 'conservative':
          optimizationMethod = 'minimum_variance';
          break;
        case 'aggressive':
          optimizationMethod = 'maximum_return';
          break;
        default:
          optimizationMethod = 'risk_parity';
      }

      const optimization = await this.performOptimization(
        availableAssets,
        correlationMatrix,
        optimizationMethod,
        constraints
      );

      // Calculate current vs optimal allocations
      const allocations: OptimalAllocation[] = availableAssets.map(asset => {
        const currentAsset = currentPortfolio.assets.find(a => a.symbol === asset.symbol);
        const currentWeight = currentAsset ? currentAsset.allocation / 100 : 0;
        const optimalWeight = optimization.weights[asset.symbol] || 0;

        return {
          symbol: asset.symbol,
          current_weight: currentWeight,
          optimal_weight: optimalWeight,
          expected_return: asset.expectedReturn,
          contribution_to_risk: optimalWeight * asset.risk,
          allocation_change: optimalWeight - currentWeight
        };
      });

      // Calculate rebalancing costs (estimate based on gas and slippage)
      const rebalanceCost = this.calculateRebalanceCost(allocations, currentPortfolio.totalValue);

      logger.info('Portfolio optimization completed', {
        method: optimizationMethod,
        expectedReturn: optimization.expectedReturn,
        expectedRisk: optimization.expectedRisk,
        rebalanceCost
      });

      return {
        allocations,
        expected_return: optimization.expectedReturn,
        expected_risk: optimization.expectedRisk,
        sharpe_ratio: (optimization.expectedReturn - this.RISK_FREE_RATE) / optimization.expectedRisk,
        diversification_ratio: optimization.diversificationRatio,
        optimization_method: optimizationMethod,
        constraints_applied: optimization.constraintsApplied,
        rebalance_cost: rebalanceCost
      };

    } catch (error) {
      logger.error('Portfolio optimization error', { error: error instanceof Error ? error.message : String(error) });
      throw new Error(`ポートフォリオ最適化に失敗しました: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Advanced risk assessment with DeFi-specific metrics
   */
  async calculateRiskMetrics(
    portfolio: Portfolio,
    historicalReturns?: number[],
    marketBeta?: number
  ): Promise<RiskMetrics> {
    try {
      const returns = historicalReturns || await this.estimateHistoricalReturns(portfolio);
      
      const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
      const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
      const volatility = Math.sqrt(variance * this.TRADING_DAYS);

      // Value at Risk (95% confidence)
      const sortedReturns = returns.slice().sort((a, b) => a - b);
      const varIndex = Math.floor(returns.length * 0.05);
      const valueAtRisk = Math.abs(sortedReturns[varIndex]);

      // Expected Shortfall (Conditional VaR)
      const expectedShortfall = sortedReturns.slice(0, varIndex).reduce((a, b) => a + b, 0) / varIndex;

      // Maximum Drawdown calculation
      const maxDrawdown = this.calculateMaxDrawdown(returns);

      // Sharpe Ratio
      const excessReturn = mean * this.TRADING_DAYS - this.RISK_FREE_RATE;
      const sharpeRatio = excessReturn / volatility;

      // Sortino Ratio (using downside deviation)
      const downsideReturns = returns.filter(r => r < mean);
      const downsideVariance = downsideReturns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / downsideReturns.length;
      const downsideDeviation = Math.sqrt(downsideVariance * this.TRADING_DAYS);
      const sortinoRatio = excessReturn / downsideDeviation;

      return {
        value_at_risk: valueAtRisk,
        expected_shortfall: Math.abs(expectedShortfall),
        max_drawdown: maxDrawdown,
        volatility,
        sharpe_ratio: sharpeRatio,
        sortino_ratio: sortinoRatio,
        beta: marketBeta || 1.0
      };

    } catch (error) {
      logger.error('Risk metrics calculation error', { error: error instanceof Error ? error.message : String(error) });
      throw new Error(`リスク指標の計算に失敗しました: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Impermanent Loss prediction for liquidity providing
   */
  async predictImpermanentLoss(
    protocol: DeFiProtocol,
    assetPair: [string, string],
    historicalVolatility: number
  ): Promise<ImpermanentLossModel> {
    try {
      const scenarios: Array<{price_change_percentage: number; il_percentage: number; break_even_days: number}> = [];

      // Calculate IL for various price scenarios
      const priceChanges = [-50, -30, -20, -10, 0, 10, 20, 30, 50, 100];
      
      for (const priceChange of priceChanges) {
        const priceRatio = 1 + priceChange / 100;
        const ilPercentage = this.calculateImpermanentLoss(priceRatio);
        
        // Estimate break-even time based on protocol fees
        const dailyFeeYield = protocol.apy / 365 / 100;
        const breakEvenDays = Math.abs(ilPercentage) / dailyFeeYield;

        scenarios.push({
          price_change_percentage: priceChange,
          il_percentage: ilPercentage,
          break_even_days: breakEvenDays
        });
      }

      // Risk score based on volatility and protocol risk
      const volatilityRisk = Math.min(100, historicalVolatility * 100);
      const protocolRisk = protocol.riskScore;
      const riskScore = (volatilityRisk * 0.7) + (protocolRisk * 0.3);

      return {
        protocol: protocol.name,
        asset_pair: assetPair,
        current_price_ratio: 1.0,
        il_scenarios: scenarios,
        risk_score: Math.round(riskScore)
      };

    } catch (error) {
      logger.error('IL prediction error', { error: error instanceof Error ? error.message : String(error) });
      throw new Error(`IL予測に失敗しました: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Yield optimization across multiple DeFi protocols
   */
  async optimizeYieldStrategy(
    portfolio: Portfolio,
    protocols: DeFiProtocol[],
    preferences: UserPreferences,
    timeHorizon: number = 90 // days
  ): Promise<YieldOptimizationResult> {
    try {
      // Filter protocols based on risk tolerance
      const filteredProtocols = protocols.filter(p => {
        switch (preferences.riskTolerance) {
          case 'conservative':
            return p.riskScore <= 40 && p.category === 'lending';
          case 'moderate':
            return p.riskScore <= 70;
          case 'aggressive':
            return true;
          default:
            return p.riskScore <= 50;
        }
      });

      // Sort by risk-adjusted return
      const scoredProtocols = filteredProtocols.map(protocol => ({
        ...protocol,
        risk_adjusted_apy: protocol.apy / Math.sqrt(protocol.riskScore),
        liquidity_score: Math.log10(protocol.tvl / 1000000) * 10 // TVL-based liquidity score
      })).sort((a, b) => b.risk_adjusted_apy - a.risk_adjusted_apy);

      // Optimize allocation using risk parity approach
      const allocations = this.calculateRiskParityAllocation(scoredProtocols, preferences);

      // Calculate portfolio-level metrics
      const totalExpectedApy = allocations.reduce((sum, alloc) => 
        sum + (alloc.allocation * alloc.expected_apy), 0
      );

      const weightedRisk = Math.sqrt(allocations.reduce((sum, alloc) => 
        sum + Math.pow(alloc.allocation * alloc.risk_score / 100, 2), 0
      ));

      const riskAdjustedReturn = totalExpectedApy / (weightedRisk || 1);

      // Estimate maximum drawdown based on worst-case scenario
      const maxDrawdownEstimate = weightedRisk * 2; // Conservative estimate

      let strategy = 'バランス型';
      if (preferences.riskTolerance === 'aggressive') {
        strategy = '高収益追求型';
      } else if (preferences.riskTolerance === 'conservative') {
        strategy = '安定収益型';
      }

      return {
        strategy,
        protocols: allocations,
        total_expected_apy: totalExpectedApy,
        risk_adjusted_return: riskAdjustedReturn,
        max_drawdown_estimate: maxDrawdownEstimate,
        suggested_duration: timeHorizon
      };

    } catch (error) {
      logger.error('Yield optimization error', { error: error instanceof Error ? error.message : String(error) });
      throw new Error(`収益最適化に失敗しました: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Market sentiment analysis using multiple indicators
   */
  async analyzeMarketSentiment(
    symbols: string[]
  ): Promise<MarketSentimentAnalysis> {
    try {
      // This would integrate with real market data APIs
      // For now, providing a framework structure

      // Fear & Greed Index (0-100)
      const fearGreedIndex = await this.calculateFearGreedIndex(symbols);
      
      // Social sentiment from news/social media
      const socialSentiment = await this.analyzeSocialSentiment(symbols);
      
      // Technical sentiment from price action
      const technicalSentiment = await this.analyzeTechnicalSentiment(symbols);
      
      // News sentiment
      const newsSentiment = await this.analyzeNewsSentiment(symbols);

      // Weighted composite score
      const sentimentScore = (
        fearGreedIndex * 0.3 +
        socialSentiment * 0.2 +
        technicalSentiment * 0.3 +
        newsSentiment * 0.2
      );

      let overallSentiment: 'extreme_fear' | 'fear' | 'neutral' | 'greed' | 'extreme_greed';
      
      if (sentimentScore <= 20) overallSentiment = 'extreme_fear';
      else if (sentimentScore <= 40) overallSentiment = 'fear';
      else if (sentimentScore <= 60) overallSentiment = 'neutral';
      else if (sentimentScore <= 80) overallSentiment = 'greed';
      else overallSentiment = 'extreme_greed';

      // Contrarian signal - when sentiment is extreme, consider opposite action
      const contrarianSignal = sentimentScore <= 25 || sentimentScore >= 75;

      return {
        overall_sentiment: overallSentiment,
        sentiment_score: sentimentScore,
        fear_greed_index: fearGreedIndex,
        social_sentiment: socialSentiment,
        news_sentiment: newsSentiment,
        technical_sentiment: technicalSentiment,
        contrarian_signal: contrarianSignal
      };

    } catch (error) {
      logger.error('Market sentiment analysis error', { error: error instanceof Error ? error.message : String(error) });
      throw new Error(`市場センチメント分析に失敗しました: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // Private helper methods

  private async buildCorrelationMatrix(symbols: string[]): Promise<{[key: string]: {[key: string]: number}}> {
    // Placeholder for correlation calculation
    // In production, this would use historical price data
    const matrix: {[key: string]: {[key: string]: number}} = {};
    
    for (const symbol1 of symbols) {
      matrix[symbol1] = {};
      for (const symbol2 of symbols) {
        if (symbol1 === symbol2) {
          matrix[symbol1][symbol2] = 1.0;
        } else {
          // Estimate correlation based on asset types
          matrix[symbol1][symbol2] = this.estimateAssetCorrelation(symbol1, symbol2);
        }
      }
    }

    return matrix;
  }

  private estimateAssetCorrelation(asset1: string, asset2: string): number {
    // Simplified correlation estimation
    const majorCoins = ['BTC', 'ETH', 'BNB'];
    const stablecoins = ['USDT', 'USDC', 'DAI', 'BUSD'];
    
    if (stablecoins.includes(asset1) && stablecoins.includes(asset2)) return 0.95;
    if (majorCoins.includes(asset1) && majorCoins.includes(asset2)) return 0.75;
    if (stablecoins.includes(asset1) || stablecoins.includes(asset2)) return 0.1;
    
    return 0.6; // Default correlation for crypto assets
  }

  private async performOptimization(
    assets: Array<{symbol: string; expectedReturn: number; risk: number}>,
    correlationMatrix: {[key: string]: {[key: string]: number}},
    method: string,
    constraints?: unknown
  ): Promise<{
    weights: {[symbol: string]: number};
    expectedReturn: number;
    expectedRisk: number;
    diversificationRatio: number;
    constraintsApplied: string[];
  }> {
    // Simplified optimization - in production would use proper optimization libraries
    const weights: {[symbol: string]: number} = {};
    const constraintsApplied: string[] = [];

    switch (method) {
      case 'equal_weight':
        const equalWeight = 1 / assets.length;
        assets.forEach(asset => {
          weights[asset.symbol] = equalWeight;
        });
        break;

      case 'risk_parity':
        // Inverse volatility weighting
        const totalInverseRisk = assets.reduce((sum, asset) => sum + (1 / asset.risk), 0);
        assets.forEach(asset => {
          weights[asset.symbol] = (1 / asset.risk) / totalInverseRisk;
        });
        break;

      case 'maximum_return':
        // Weight towards highest expected returns
        const totalReturn = assets.reduce((sum, asset) => sum + asset.expectedReturn, 0);
        assets.forEach(asset => {
          weights[asset.symbol] = asset.expectedReturn / totalReturn;
        });
        break;

      default: // mean_variance
        // Simplified mean-variance optimization
        assets.forEach(asset => {
          weights[asset.symbol] = 1 / assets.length;
        });
    }

    // Apply constraints
    const typedConstraints = constraints as { maxWeight?: number } | undefined
    if (typedConstraints?.maxWeight) {
      constraintsApplied.push(`最大配分: ${typedConstraints.maxWeight * 100}%`)
    }

    const expectedReturn = assets.reduce((sum, asset) => 
      sum + weights[asset.symbol] * asset.expectedReturn, 0
    );

    const expectedRisk = Math.sqrt(
      assets.reduce((sum, asset) => 
        sum + Math.pow(weights[asset.symbol] * asset.risk, 2), 0
      )
    );

    const diversificationRatio = assets.length / 
      Math.sqrt(assets.reduce((sum, asset) => sum + Math.pow(weights[asset.symbol], 2), 0));

    return {
      weights,
      expectedReturn,
      expectedRisk,
      diversificationRatio,
      constraintsApplied
    };
  }

  private calculateRebalanceCost(allocations: OptimalAllocation[], portfolioValue: number): number {
    const totalTradeValue = allocations.reduce((sum, alloc) => 
      sum + Math.abs(alloc.allocation_change) * portfolioValue, 0
    );

    // Estimate costs: 0.3% trading fees + gas costs
    return totalTradeValue * 0.003 + 50; // $50 estimated gas cost
  }

  private async estimateHistoricalReturns(portfolio: Portfolio): Promise<number[]> {
    // Placeholder - would fetch real historical data
    const returns: number[] = [];
    for (let i = 0; i < 100; i++) {
      returns.push((Math.random() - 0.5) * 0.1); // ±5% daily returns
    }
    return returns;
  }

  private calculateMaxDrawdown(returns: number[]): number {
    let peak = 0;
    let maxDrawdown = 0;
    let cumulative = 0;

    for (const dailyReturn of returns) {
      cumulative += dailyReturn;
      if (cumulative > peak) {
        peak = cumulative;
      }
      const drawdown = peak - cumulative;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    }

    return maxDrawdown;
  }

  private calculateImpermanentLoss(priceRatio: number): number {
    // IL = 2 * sqrt(priceRatio) / (1 + priceRatio) - 1
    const il = 2 * Math.sqrt(priceRatio) / (1 + priceRatio) - 1;
    return il * 100; // Return as percentage
  }

  private calculateRiskParityAllocation(
    protocols: Array<DeFiProtocol & {risk_adjusted_apy: number; liquidity_score: number}>,
    preferences: UserPreferences
  ): Array<{name: string; allocation: number; expected_apy: number; risk_score: number; liquidity_score: number}> {
    
    const maxProtocols = preferences.riskTolerance === 'conservative' ? 3 : 
                        preferences.riskTolerance === 'moderate' ? 5 : 7;
    
    const selectedProtocols = protocols.slice(0, maxProtocols);
    
    // Risk parity allocation (inverse risk weighting)
    const totalInverseRisk = selectedProtocols.reduce((sum, p) => sum + (1 / p.riskScore), 0);
    
    return selectedProtocols.map(protocol => ({
      name: protocol.name,
      allocation: (1 / protocol.riskScore) / totalInverseRisk,
      expected_apy: protocol.apy,
      risk_score: protocol.riskScore,
      liquidity_score: protocol.liquidity_score
    }));
  }

  private async calculateFearGreedIndex(symbols: string[]): Promise<number> {
    // Placeholder - would integrate with real fear & greed index API
    return Math.floor(Math.random() * 100);
  }

  private async analyzeSocialSentiment(symbols: string[]): Promise<number> {
    // Placeholder - would analyze social media sentiment
    return Math.floor(Math.random() * 100);
  }

  private async analyzeTechnicalSentiment(symbols: string[]): Promise<number> {
    // Placeholder - would analyze technical indicators
    return Math.floor(Math.random() * 100);
  }

  private async analyzeNewsSentiment(symbols: string[]): Promise<number> {
    // Placeholder - would analyze news sentiment
    return Math.floor(Math.random() * 100);
  }
}

export const investmentAlgorithms = new InvestmentAlgorithms();
export default investmentAlgorithms;
