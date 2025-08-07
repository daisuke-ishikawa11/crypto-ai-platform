// Risk calculation engine
// Real calculations based on portfolio and market data

import { MarketData, MarketChart } from '../market/types';
import { 
  AssetRiskScore, 
  RiskFactor,
  PortfolioRiskMetrics,
  StopLossRecommendation 
} from './types';

export class RiskCalculator {
  
  // Calculate volatility (standard deviation of returns)
  calculateVolatility(prices: number[], periods: number = 30): number {
    if (prices.length < 2) return 0;
    
    const returns: number[] = [];
    for (let i = 1; i < prices.length; i++) {
      const dailyReturn = (prices[i] - prices[i - 1]) / prices[i - 1];
      returns.push(dailyReturn);
    }
    
    const relevantReturns = returns.slice(-periods);
    const avgReturn = relevantReturns.reduce((a, b) => a + b, 0) / relevantReturns.length;
    
    const squaredDiffs = relevantReturns.map(r => Math.pow(r - avgReturn, 2));
    const variance = squaredDiffs.reduce((a, b) => a + b, 0) / relevantReturns.length;
    
    // Annualized volatility
    return Math.sqrt(variance) * Math.sqrt(252) * 100;
  }
  
  // Calculate Sharpe Ratio
  calculateSharpeRatio(returns: number[], riskFreeRate: number = 0.02): number {
    if (returns.length === 0) return 0;
    
    const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
    const annualizedReturn = avgReturn * 252;
    
    const volatility = this.calculateVolatility(returns.map((_, i) => i), returns.length);
    if (volatility === 0) return 0;
    
    return (annualizedReturn - riskFreeRate) / (volatility / 100);
  }
  
  // Calculate Maximum Drawdown
  calculateMaxDrawdown(prices: number[]): number {
    if (prices.length < 2) return 0;
    
    let maxDrawdown = 0;
    let peak = prices[0];
    
    for (const price of prices) {
      if (price > peak) {
        peak = price;
      }
      const drawdown = (peak - price) / peak;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    }
    
    return maxDrawdown * 100;
  }
  
  // Calculate Value at Risk (VaR) at 95% confidence
  calculateVaR(returns: number[], confidence: number = 0.95): number {
    if (returns.length === 0) return 0;
    
    const sortedReturns = [...returns].sort((a, b) => a - b);
    const index = Math.floor((1 - confidence) * sortedReturns.length);
    
    return Math.abs(sortedReturns[index] || 0) * 100;
  }
  
  // Calculate Conditional Value at Risk (CVaR)
  calculateCVaR(returns: number[], confidence: number = 0.95): number {
    if (returns.length === 0) return 0;
    
    const sortedReturns = [...returns].sort((a, b) => a - b);
    const varIndex = Math.floor((1 - confidence) * sortedReturns.length);
    
    const tailReturns = sortedReturns.slice(0, varIndex + 1);
    if (tailReturns.length === 0) return 0;
    
    const avgTailReturn = tailReturns.reduce((a, b) => a + b, 0) / tailReturns.length;
    return Math.abs(avgTailReturn) * 100;
  }
  
  // Calculate Beta (correlation with market)
  calculateBeta(assetReturns: number[], marketReturns: number[]): number {
    if (assetReturns.length !== marketReturns.length || assetReturns.length < 2) {
      return 1; // Default beta
    }
    
    const assetAvg = assetReturns.reduce((a, b) => a + b, 0) / assetReturns.length;
    const marketAvg = marketReturns.reduce((a, b) => a + b, 0) / marketReturns.length;
    
    let covariance = 0;
    let marketVariance = 0;
    
    for (let i = 0; i < assetReturns.length; i++) {
      covariance += (assetReturns[i] - assetAvg) * (marketReturns[i] - marketAvg);
      marketVariance += Math.pow(marketReturns[i] - marketAvg, 2);
    }
    
    if (marketVariance === 0) return 1;
    
    return covariance / marketVariance;
  }
  
  // Calculate correlation between two assets
  calculateCorrelation(returns1: number[], returns2: number[]): number {
    if (returns1.length !== returns2.length || returns1.length < 2) return 0;
    
    const avg1 = returns1.reduce((a, b) => a + b, 0) / returns1.length;
    const avg2 = returns2.reduce((a, b) => a + b, 0) / returns2.length;
    
    let covariance = 0;
    let variance1 = 0;
    let variance2 = 0;
    
    for (let i = 0; i < returns1.length; i++) {
      const diff1 = returns1[i] - avg1;
      const diff2 = returns2[i] - avg2;
      covariance += diff1 * diff2;
      variance1 += diff1 * diff1;
      variance2 += diff2 * diff2;
    }
    
    const denominator = Math.sqrt(variance1 * variance2);
    if (denominator === 0) return 0;
    
    return covariance / denominator;
  }
  
  // Calculate concentration risk (Herfindahl Index)
  calculateConcentrationRisk(weights: number[]): number {
    return weights.reduce((sum, weight) => sum + Math.pow(weight, 2), 0);
  }
  
  // Calculate liquidity score based on volume and market cap
  calculateLiquidityScore(volume24h: number, marketCap: number): number {
    if (marketCap === 0) return 0;
    
    const volumeToMarketCap = volume24h / marketCap;
    
    // Higher ratio = better liquidity
    // Normalize to 0-100 scale
    if (volumeToMarketCap >= 0.5) return 100;
    if (volumeToMarketCap >= 0.3) return 90;
    if (volumeToMarketCap >= 0.2) return 80;
    if (volumeToMarketCap >= 0.1) return 70;
    if (volumeToMarketCap >= 0.05) return 60;
    if (volumeToMarketCap >= 0.02) return 50;
    if (volumeToMarketCap >= 0.01) return 40;
    if (volumeToMarketCap >= 0.005) return 30;
    if (volumeToMarketCap >= 0.002) return 20;
    return 10;
  }
  
  // Calculate asset risk score
  calculateAssetRiskScore(
    marketData: MarketData,
    historicalPrices: number[]
  ): AssetRiskScore {
    const volatility30d = this.calculateVolatility(historicalPrices.slice(-30));
    const volatility90d = this.calculateVolatility(historicalPrices.slice(-90));
    const liquidityScore = this.calculateLiquidityScore(
      marketData.total_volume,
      marketData.market_cap
    );
    
    const riskFactors: RiskFactor[] = [];
    
    // Volatility risk
    if (volatility30d > 100) {
      riskFactors.push({
        type: 'volatility',
        severity: 'critical',
        description: 'Extreme volatility detected',
        impact_score: 90,
        mitigation_advice: 'Consider reducing position size or setting tight stop losses'
      });
    } else if (volatility30d > 70) {
      riskFactors.push({
        type: 'volatility',
        severity: 'high',
        description: 'High volatility',
        impact_score: 70,
        mitigation_advice: 'Monitor position closely and consider partial profit taking'
      });
    }
    
    // Liquidity risk
    if (liquidityScore < 30) {
      riskFactors.push({
        type: 'liquidity',
        severity: 'high',
        description: 'Low liquidity may result in high slippage',
        impact_score: 80,
        mitigation_advice: 'Use limit orders and avoid large market orders'
      });
    }
    
    // Market cap risk
    if (marketData.market_cap_rank > 100) {
      riskFactors.push({
        type: 'market',
        severity: 'medium',
        description: 'Small cap asset with higher risk',
        impact_score: 60,
        mitigation_advice: 'Limit exposure to small percentage of portfolio'
      });
    }
    
    // Calculate overall risk score
    let riskScore = 0;
    riskScore += Math.min(volatility30d, 100) * 0.4; // 40% weight
    riskScore += (100 - liquidityScore) * 0.3; // 30% weight
    riskScore += Math.min(marketData.market_cap_rank / 10, 30); // 30% weight
    
    return {
      asset_id: marketData.id,
      symbol: marketData.symbol,
      risk_score: Math.min(Math.round(riskScore), 100),
      volatility_30d: volatility30d,
      volatility_90d: volatility90d,
      liquidity_score: liquidityScore,
      market_cap_rank: marketData.market_cap_rank,
      correlation_with_btc: 0, // Would need BTC data to calculate
      downside_risk: this.calculateVaR(historicalPrices.map((p, i) => 
        i > 0 ? (p - historicalPrices[i-1]) / historicalPrices[i-1] : 0
      ).slice(1)),
      risk_factors: riskFactors
    };
  }
  
  // Calculate stop loss based on ATR
  calculateATRStopLoss(
    prices: number[],
    highs: number[],
    lows: number[],
    multiplier: number = 2
  ): number {
    if (prices.length < 14) return prices[prices.length - 1] * 0.95; // Default 5% stop
    
    const atrPeriod = 14;
    const trueRanges: number[] = [];
    
    for (let i = 1; i < prices.length; i++) {
      const highLow = highs[i] - lows[i];
      const highClose = Math.abs(highs[i] - prices[i - 1]);
      const lowClose = Math.abs(lows[i] - prices[i - 1]);
      
      trueRanges.push(Math.max(highLow, highClose, lowClose));
    }
    
    const recentTR = trueRanges.slice(-atrPeriod);
    const atr = recentTR.reduce((a, b) => a + b, 0) / atrPeriod;
    
    const currentPrice = prices[prices.length - 1];
    return currentPrice - (atr * multiplier);
  }
  
  // Calculate position size using Kelly Criterion
  calculateKellyCriterion(
    winProbability: number,
    avgWin: number,
    avgLoss: number
  ): number {
    if (avgLoss === 0) return 0;
    
    const b = avgWin / avgLoss;
    const p = winProbability;
    const q = 1 - p;
    
    const kelly = (p * b - q) / b;
    
    // Apply Kelly fraction (typically 0.25 for crypto due to high volatility)
    return Math.max(0, Math.min(kelly * 0.25, 0.25));
  }
} 