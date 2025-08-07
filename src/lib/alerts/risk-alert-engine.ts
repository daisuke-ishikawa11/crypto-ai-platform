import { AlertType, AlertSeverity } from './types';
import { logger } from '@/lib/monitoring/logger';

// Risk metrics interfaces
export interface RiskMetrics {
  symbol: string;
  price: number;
  priceChange24h: number;
  volatility: number;
  var95: number;
  var99: number;
  expectedShortfall: number;
  sharpeRatio: number;
  beta: number;
  correlation: number;
  maxDrawdown: number;
  currentDrawdown: number;
  riskScore: number;
  timestamp: Date;
}

export interface PortfolioRiskMetrics {
  totalValue: number;
  volatility: number;
  var95: number;
  var99: number;
  sharpeRatio: number;
  diversificationRatio: number;
  concentrationRisk: number;
  correlationRisk: number;
  liquidityRisk: number;
  riskContributions: Map<string, number>;
  timestamp: Date;
}

// Risk data structure
interface PriceData {
  price: number;
  volume: number;
  timestamp: Date;
}

// Risk alert engine
export class RiskAlertEngine {
  private priceCache = new Map<string, PriceData[]>();
  private metricsCache = new Map<string, RiskMetrics[]>();
  private benchmarkData = new Map<string, number[]>();
  private readonly CACHE_SIZE = 500;

  /**
   * Main analysis method
   */
  async analyzeRisk(
    symbol: string,
    currentPrice: number,
    volume: number,
    benchmark: string = 'BTC'
  ): Promise<RiskMetrics> {
    try {
      // Update price cache
      this.updatePriceCache(symbol, currentPrice, volume);
      
      // Get price history
      const priceHistory = this.priceCache.get(symbol) || [];
      if (priceHistory.length < 30) {
        throw new Error(`Insufficient price data for ${symbol}`);
      }

      // Calculate basic metrics
      const prices = priceHistory.map(p => p.price);
      const returns = this.calculateReturns(prices);
      
      // Calculate risk metrics
      const volatility = this.calculateVolatility(returns);
      const var95 = this.calculateVaR(returns, 0.95);
      const var99 = this.calculateVaR(returns, 0.99);
      const expectedShortfall = this.calculateExpectedShortfall(returns, 0.95);
      const sharpeRatio = this.calculateSharpeRatio(returns, volatility);
      const beta = await this.calculateBeta(returns, benchmark);
      const correlation = await this.calculateCorrelation(returns, benchmark);
      const maxDrawdown = this.calculateMaxDrawdown(prices);
      const currentDrawdown = this.calculateCurrentDrawdown(prices);
      
      // Calculate risk score
      const riskScore = this.calculateRiskScore({
        volatility,
        var95: Math.abs(var95),
        sharpeRatio,
        maxDrawdown: Math.abs(maxDrawdown),
        currentDrawdown: Math.abs(currentDrawdown)
      });

      const priceChange24h = priceHistory.length >= 24 
        ? (currentPrice - priceHistory[priceHistory.length - 24].price) / priceHistory[priceHistory.length - 24].price
        : 0;

      const metrics: RiskMetrics = {
        symbol,
        price: currentPrice,
        priceChange24h,
        volatility,
        var95,
        var99,
        expectedShortfall,
        sharpeRatio,
        beta,
        correlation,
        maxDrawdown,
        currentDrawdown,
        riskScore,
        timestamp: new Date()
      };

      // Update metrics cache
      this.updateMetricsCache(symbol, metrics);

      logger.info('Risk metrics calculated', {
        symbol,
        riskScore,
        volatility,
        var95,
        action: 'risk_analysis_completed'
      });

      return metrics;

    } catch (error) {
      logger.error('Risk analysis failed', {
        symbol,
        error: error instanceof Error ? error.message : 'Unknown error',
        action: 'risk_analysis_error'
      });
      throw error;
    }
  }

  /**
   * Portfolio risk analysis
   */
  async analyzePortfolioRisk(
    holdings: Array<{ symbol: string; amount: number; value: number }>
  ): Promise<PortfolioRiskMetrics> {
    try {
      const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
      
      // Calculate portfolio returns
      const portfolioReturns = await this.calculatePortfolioReturns(holdings);
      
      // Calculate portfolio metrics
      const volatility = this.calculateVolatility(portfolioReturns);
      const var95 = this.calculateVaR(portfolioReturns, 0.95);
      const var99 = this.calculateVaR(portfolioReturns, 0.99);
      const sharpeRatio = this.calculateSharpeRatio(portfolioReturns, volatility);
      
      // Calculate diversification metrics
      const diversificationRatio = await this.calculateDiversificationRatio(holdings);
      const concentrationRisk = this.calculateConcentrationRisk(holdings);
      const correlationRisk = await this.calculateCorrelationRisk(holdings);
      const liquidityRisk = await this.calculateLiquidityRisk(holdings);
      
      // Calculate risk contributions
      const riskContributions = await this.calculateRiskContributions(holdings);

      const portfolioMetrics: PortfolioRiskMetrics = {
        totalValue,
        volatility,
        var95,
        var99,
        sharpeRatio,
        diversificationRatio,
        concentrationRisk,
        correlationRisk,
        liquidityRisk,
        riskContributions,
        timestamp: new Date()
      };

      logger.info('Portfolio risk analysis completed', {
        totalValue,
        volatility,
        var95,
        diversificationRatio,
        action: 'portfolio_risk_analysis'
      });

      return portfolioMetrics;

    } catch (error) {
      logger.error('Portfolio risk analysis failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
        action: 'portfolio_risk_analysis_error'
      });
      throw error;
    }
  }

  /**
   * Helper methods
   */
  private updatePriceCache(symbol: string, price: number, volume: number): void {
    const key = symbol.toUpperCase();
    
    if (!this.priceCache.has(key)) {
      this.priceCache.set(key, []);
    }
    
    const priceData: PriceData = {
      price,
      volume,
      timestamp: new Date()
    };
    
    const history = this.priceCache.get(key)!;
    history.push(priceData);
    
    // Keep cache size manageable
    if (history.length > this.CACHE_SIZE) {
      history.splice(0, history.length - this.CACHE_SIZE);
    }
  }

  private calculateReturns(prices: number[]): number[] {
    const returns = [];
    for (let i = 1; i < prices.length; i++) {
      returns.push(Math.log(prices[i] / prices[i - 1]));
    }
    return returns;
  }

  private calculateVaR(returns: number[], confidence: number): number {
    const sorted = [...returns].sort((a, b) => a - b);
    const index = Math.floor((1 - confidence) * sorted.length);
    return sorted[index] || 0;
  }

  private calculateExpectedShortfall(returns: number[], confidence: number): number {
    const valueAtRisk = this.calculateVaR(returns, confidence);
    const tail = returns.filter(r => r <= valueAtRisk);
    return tail.length > 0 ? tail.reduce((sum, r) => sum + r, 0) / tail.length : 0;
  }

  private calculateVolatility(returns: number[]): number {
    const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / (returns.length - 1);
    return Math.sqrt(variance * 252); // Annualized
  }

  private calculateSharpeRatio(returns: number[], volatility: number): number {
    const meanReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length * 252; // Annualized
    const riskFreeRate = 0.02; // Assume 2% risk-free rate
    return volatility > 0 ? (meanReturn - riskFreeRate) / volatility : 0;
  }

  private async calculateBeta(returns: number[], benchmark: string): Promise<number> {
    const benchmarkReturns = this.getBenchmarkReturns(benchmark);
    if (!benchmarkReturns || benchmarkReturns.length !== returns.length) {
      return 1; // Default beta
    }

    const n = returns.length;
    const meanReturns = returns.reduce((sum, r) => sum + r, 0) / n;
    const meanBenchmark = benchmarkReturns.reduce((sum, r) => sum + r, 0) / n;

    let covariance = 0;
    let benchmarkVariance = 0;

    for (let i = 0; i < n; i++) {
      const returnDiff = returns[i] - meanReturns;
      const benchmarkDiff = benchmarkReturns[i] - meanBenchmark;
      
      covariance += returnDiff * benchmarkDiff;
      benchmarkVariance += benchmarkDiff * benchmarkDiff;
    }

    return benchmarkVariance > 0 ? covariance / benchmarkVariance : 1;
  }

  private async calculateCorrelation(returns: number[], benchmark: string): Promise<number> {
    const benchmarkReturns = this.getBenchmarkReturns(benchmark);
    if (!benchmarkReturns || benchmarkReturns.length !== returns.length) {
      return 0;
    }

    const n = returns.length;
    const meanReturns = returns.reduce((sum, r) => sum + r, 0) / n;
    const meanBenchmark = benchmarkReturns.reduce((sum, r) => sum + r, 0) / n;

    let numerator = 0;
    let sumSquaredReturns = 0;
    let sumSquaredBenchmark = 0;

    for (let i = 0; i < n; i++) {
      const returnDiff = returns[i] - meanReturns;
      const benchmarkDiff = benchmarkReturns[i] - meanBenchmark;
      
      numerator += returnDiff * benchmarkDiff;
      sumSquaredReturns += returnDiff * returnDiff;
      sumSquaredBenchmark += benchmarkDiff * benchmarkDiff;
    }

    const denominator = Math.sqrt(sumSquaredReturns * sumSquaredBenchmark);
    return denominator > 0 ? numerator / denominator : 0;
  }

  private calculateMaxDrawdown(prices: number[]): number {
    let peak = prices[0];
    let maxDrawdown = 0;

    for (const price of prices) {
      if (price > peak) {
        peak = price;
      }
      
      const drawdown = (peak - price) / peak;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    }

    return -maxDrawdown;
  }

  private calculateCurrentDrawdown(prices: number[]): number {
    if (prices.length < 2) return 0;
    
    const peak = Math.max(...prices);
    const currentPrice = prices[prices.length - 1];
    
    return -(peak - currentPrice) / peak;
  }

  private calculateRiskScore(metrics: {
    volatility: number;
    var95: number;
    sharpeRatio: number;
    maxDrawdown: number;
    currentDrawdown: number;
  }): number {
    let score = 50; // Base score

    // Volatility component (0-30 points)
    if (metrics.volatility > 1.0) score += 20;
    else if (metrics.volatility > 0.5) score += 10;
    else if (metrics.volatility > 0.3) score += 5;

    // VaR component (0-25 points)
    if (metrics.var95 > 0.2) score += 25;
    else if (metrics.var95 > 0.1) score += 15;
    else if (metrics.var95 > 0.05) score += 10;

    // Sharpe ratio component (-10 to +0 points)
    if (metrics.sharpeRatio < 0) score += 10;
    else if (metrics.sharpeRatio < 0.5) score += 5;

    // Drawdown component (0-15 points)
    if (metrics.maxDrawdown < -0.5) score += 15;
    else if (metrics.maxDrawdown < -0.3) score += 10;
    else if (metrics.maxDrawdown < -0.2) score += 5;

    // Current drawdown component (0-10 points)
    if (metrics.currentDrawdown < -0.2) score += 10;
    else if (metrics.currentDrawdown < -0.1) score += 5;

    return Math.min(100, Math.max(0, score));
  }

  // Portfolio calculation methods
  private async calculatePortfolioReturns(
    holdings: Array<{ symbol: string; amount: number; value: number }>
  ): Promise<number[]> {
    const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
    const weights = holdings.map(h => h.value / totalValue);
    
    // Get returns for each asset
    const assetReturns = await Promise.all(
      holdings.map(async h => {
        const priceHistory = this.priceCache.get(h.symbol.toUpperCase()) || [];
        if (priceHistory.length < 30) return [];
        
        const prices = priceHistory.map(p => p.price);
        return this.calculateReturns(prices);
      })
    );

    // Calculate portfolio returns
    const minLength = Math.min(...assetReturns.map(r => r.length));
    const portfolioReturns = [];

    for (let i = 0; i < minLength; i++) {
      let portfolioReturn = 0;
      for (let j = 0; j < holdings.length; j++) {
        if (assetReturns[j].length > i) {
          portfolioReturn += weights[j] * assetReturns[j][i];
        }
      }
      portfolioReturns.push(portfolioReturn);
    }

    return portfolioReturns;
  }

  private async calculateDiversificationRatio(
    holdings: Array<{ symbol: string; amount: number; value: number }>
  ): Promise<number> {
    // Simplified diversification ratio calculation
    const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
    const weights = holdings.map(h => h.value / totalValue);
    
    // Calculate weighted average volatility
    let weightedVolatility = 0;
    for (let i = 0; i < holdings.length; i++) {
      const priceHistory = this.priceCache.get(holdings[i].symbol.toUpperCase()) || [];
      if (priceHistory.length >= 30) {
        const prices = priceHistory.map(p => p.price);
        const returns = this.calculateReturns(prices);
        const volatility = this.calculateVolatility(returns);
        weightedVolatility += weights[i] * volatility;
      }
    }

    // Calculate portfolio volatility
    const portfolioReturns = await this.calculatePortfolioReturns(holdings);
    const portfolioVolatility = this.calculateVolatility(portfolioReturns);

    return portfolioVolatility > 0 ? weightedVolatility / portfolioVolatility : 1;
  }

  private calculateConcentrationRisk(
    holdings: Array<{ symbol: string; amount: number; value: number }>
  ): number {
    const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
    const weights = holdings.map(h => h.value / totalValue);
    
    // Calculate Herfindahl-Hirschman Index
    const hhi = weights.reduce((sum, w) => sum + w * w, 0);
    
    // Convert to risk score (0-100)
    return Math.min(100, hhi * 100 * holdings.length);
  }

  private async calculateCorrelationRisk(
    holdings: Array<{ symbol: string; amount: number; value: number }>
  ): Promise<number> {
    let totalCorrelation = 0;
    let pairCount = 0;

    for (let i = 0; i < holdings.length; i++) {
      for (let j = i + 1; j < holdings.length; j++) {
        const correlation = await this.calculatePairCorrelation(
          holdings[i].symbol,
          holdings[j].symbol
        );
        totalCorrelation += Math.abs(correlation);
        pairCount++;
      }
    }

    return pairCount > 0 ? (totalCorrelation / pairCount) * 100 : 0;
  }

  private async calculateLiquidityRisk(
    holdings: Array<{ symbol: string; amount: number; value: number }>
  ): Promise<number> {
    // Simplified liquidity risk calculation based on volume
    let weightedLiquidityRisk = 0;
    const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);

    for (const holding of holdings) {
      const weight = holding.value / totalValue;
      const priceHistory = this.priceCache.get(holding.symbol.toUpperCase()) || [];
      
      if (priceHistory.length > 0) {
        const avgVolume = priceHistory.reduce((sum, p) => sum + p.volume, 0) / priceHistory.length;
        const liquidityScore = Math.min(100, Math.max(0, 100 - (holding.amount / avgVolume) * 100));
        weightedLiquidityRisk += weight * (100 - liquidityScore);
      } else {
        weightedLiquidityRisk += weight * 50; // Default moderate risk
      }
    }

    return weightedLiquidityRisk;
  }

  private async calculateRiskContributions(
    holdings: Array<{ symbol: string; amount: number; value: number }>
  ): Promise<Map<string, number>> {
    const riskContributions = new Map<string, number>();
    const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);

    for (const holding of holdings) {
      const weight = holding.value / totalValue;
      const priceHistory = this.priceCache.get(holding.symbol.toUpperCase()) || [];
      
      if (priceHistory.length >= 30) {
        const prices = priceHistory.map(p => p.price);
        const returns = this.calculateReturns(prices);
        const volatility = this.calculateVolatility(returns);
        const contribution = weight * volatility;
        riskContributions.set(holding.symbol, contribution);
      } else {
        riskContributions.set(holding.symbol, 0);
      }
    }

    return riskContributions;
  }

  private async calculatePairCorrelation(symbol1: string, symbol2: string): Promise<number> {
    const history1 = this.priceCache.get(symbol1.toUpperCase()) || [];
    const history2 = this.priceCache.get(symbol2.toUpperCase()) || [];
    
    if (history1.length < 30 || history2.length < 30) return 0;

    const prices1 = history1.map(p => p.price);
    const prices2 = history2.map(p => p.price);
    const returns1 = this.calculateReturns(prices1);
    const returns2 = this.calculateReturns(prices2);

    const minLength = Math.min(returns1.length, returns2.length);
    if (minLength < 20) return 0;

    // Calculate correlation
    const n = minLength;
    const mean1 = returns1.slice(-n).reduce((sum, r) => sum + r, 0) / n;
    const mean2 = returns2.slice(-n).reduce((sum, r) => sum + r, 0) / n;

    let numerator = 0;
    let sum1Squared = 0;
    let sum2Squared = 0;

    for (let i = 0; i < n; i++) {
      const diff1 = returns1[returns1.length - n + i] - mean1;
      const diff2 = returns2[returns2.length - n + i] - mean2;
      
      numerator += diff1 * diff2;
      sum1Squared += diff1 * diff1;
      sum2Squared += diff2 * diff2;
    }

    const denominator = Math.sqrt(sum1Squared * sum2Squared);
    return denominator > 0 ? numerator / denominator : 0;
  }

  // Utility methods
  private getBenchmarkReturns(benchmark: string): number[] | null {
    const data = this.benchmarkData.get(benchmark);
    if (!data || data.length < 2) return null;
    
    const returns = [];
    for (let i = 1; i < data.length; i++) {
      returns.push((data[i] - data[i - 1]) / data[i - 1]);
    }
    return returns;
  }

  private updateMetricsCache(symbol: string, metrics: RiskMetrics): void {
    const key = symbol.toUpperCase();
    
    if (!this.metricsCache.has(key)) {
      this.metricsCache.set(key, []);
    }
    
    const history = this.metricsCache.get(key)!;
    history.push(metrics);
    
    if (history.length > 100) {
      history.splice(0, history.length - 100);
    }
  }

  // Public API methods
  getLatestMetrics(symbol: string): RiskMetrics | null {
    const history = this.metricsCache.get(symbol.toUpperCase());
    return history && history.length > 0 ? history[history.length - 1] : null;
  }

  getMetricsHistory(symbol: string, limit?: number): RiskMetrics[] {
    const history = this.metricsCache.get(symbol.toUpperCase()) || [];
    return limit ? history.slice(-limit) : history;
  }

  setBenchmarkData(benchmark: string, data: number[]): void {
    this.benchmarkData.set(benchmark, data);
  }

  cleanup(): void {
    const now = Date.now();
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days

    for (const [symbol, history] of this.priceCache.entries()) {
      const filteredHistory = history.filter(
        data => now - data.timestamp.getTime() < maxAge
      );
      
      if (filteredHistory.length === 0) {
        this.priceCache.delete(symbol);
      } else {
        this.priceCache.set(symbol, filteredHistory);
      }
    }

    for (const [symbol, history] of this.metricsCache.entries()) {
      const filteredHistory = history.filter(
        metrics => now - metrics.timestamp.getTime() < maxAge
      );
      
      if (filteredHistory.length === 0) {
        this.metricsCache.delete(symbol);
      } else {
        this.metricsCache.set(symbol, filteredHistory);
      }
    }
  }
}