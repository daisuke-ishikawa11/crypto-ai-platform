// Portfolio risk analysis service
// Analyzes risk at portfolio level

import { 
  PortfolioRiskMetrics, 
  AssetRiskScore, 
  RiskAlert,
  PortfolioHolding,
  RiskProfile,
  RiskMitigation,
  MitigationRecommendation,
  SpecificAction
} from './types';
import { MarketData } from '@/lib/market/types';
import { CoinGeckoClient } from '@/lib/market/coingecko';
import { RiskCalculator } from './risk-calculator';

export class PortfolioRiskService {
  private coinGeckoClient: CoinGeckoClient;
  private riskCalculator: RiskCalculator;
  
  constructor() {
    this.coinGeckoClient = new CoinGeckoClient();
    this.riskCalculator = new RiskCalculator();
  }
  
  // Calculate comprehensive portfolio risk metrics
  async calculatePortfolioRisk(
    portfolioId: string,
    holdings: PortfolioHolding[],
    userRiskProfile: RiskProfile
  ): Promise<PortfolioRiskMetrics> {
    // Get market data for all assets
    const assetIds = holdings.map(h => h.asset_id);
    const marketDataArray = await this.coinGeckoClient.getMarketData(assetIds);
    
    // Calculate individual asset risks
    const assetRisks: AssetRiskScore[] = [];
    const returns: Record<string, number[]> = {};
    
    for (const holding of holdings) {
      const marketData = marketDataArray.find(m => m.id === holding.asset_id);
      if (!marketData) continue;
      
      // Get historical data
      const historicalData = await this.coinGeckoClient.getMarketChart(holding.asset_id, 'usd', '90');
      const prices = historicalData.prices.map(p => p[1]);
      
      // Calculate returns
      const assetReturns: number[] = [];
      for (let i = 1; i < prices.length; i++) {
        assetReturns.push((prices[i] - prices[i-1]) / prices[i-1]);
      }
      returns[holding.asset_id] = assetReturns;
      
      // Calculate asset risk
      const assetRisk = this.riskCalculator.calculateAssetRiskScore(marketData, prices);
      assetRisks.push(assetRisk);
    }
    
    // Calculate portfolio-level metrics
    const weights = holdings.map(h => h.weight);
    const portfolioReturns = this.calculatePortfolioReturns(holdings, returns);
    
    const volatility = this.riskCalculator.calculateVolatility(portfolioReturns);
    const sharpeRatio = this.riskCalculator.calculateSharpeRatio(portfolioReturns);
    const maxDrawdown = this.riskCalculator.calculateMaxDrawdown(
      this.reconstructPortfolioValues(holdings, returns)
    );
    const valueAtRisk = this.riskCalculator.calculateVaR(portfolioReturns);
    const cvar = this.riskCalculator.calculateCVaR(portfolioReturns);
    
    // Calculate correlation matrix
    const correlationMatrix = this.calculateCorrelationMatrix(holdings, returns);
    
    // Calculate concentration risk
    const concentrationRisk = this.riskCalculator.calculateConcentrationRisk(weights);
    
    // Calculate overall risk score
    const totalRiskScore = this.calculateTotalRiskScore(
      volatility,
      maxDrawdown,
      concentrationRisk,
      assetRisks,
      weights
    );
    
    return {
      portfolio_id: portfolioId,
      total_risk_score: Math.min(Math.round(totalRiskScore), 100),
      volatility,
      sharpe_ratio: sharpeRatio,
      sortino_ratio: this.calculateSortinoRatio(portfolioReturns),
      max_drawdown: maxDrawdown,
      value_at_risk: valueAtRisk,
      conditional_value_at_risk: cvar,
      beta: 1, // Would need market index data
      concentration_risk: concentrationRisk,
      correlation_matrix: correlationMatrix,
      updated_at: new Date()
    };
  }

  // Generate risk mitigation recommendations
  async generateMitigationRecommendations(
    portfolioMetrics: PortfolioRiskMetrics,
    holdings: PortfolioHolding[],
    userRiskProfile: RiskProfile
  ): Promise<RiskMitigation> {
    const recommendations: MitigationRecommendation[] = [];
    
    // Check if risk exceeds user tolerance
    if (portfolioMetrics.total_risk_score > userRiskProfile.max_portfolio_risk) {
      recommendations.push({
        id: `risk_reduction_${Date.now()}`,
        type: 'reduce_position',
        risk_type: 'portfolio_risk',
        priority: 'high',
        title: 'Reduce Portfolio Risk',
        description: 'Portfolio risk exceeds your risk tolerance',
        specific_actions: this.generatePositionReductionActions(
          holdings,
          portfolioMetrics,
          userRiskProfile
        ),
        risk_reduction: 15,
        estimated_cost: 0,
        implementation_time: '1-2 hours',
        success_probability: 0.85
      });
    }
    
    // Check concentration risk
    if (portfolioMetrics.concentration_risk > 0.3) {
      recommendations.push({
        id: `diversify_${Date.now()}`,
        type: 'diversify',
        risk_type: 'concentration_risk',
        priority: 'medium',
        title: 'Diversify Portfolio',
        description: 'Portfolio is too concentrated in few assets',
        specific_actions: this.generateDiversificationActions(holdings),
        risk_reduction: 10,
        estimated_cost: 50,
        implementation_time: '30 minutes',
        success_probability: 0.75
      });
    }
    
    // Check drawdown
    if (portfolioMetrics.max_drawdown > 25) {
      recommendations.push({
        id: `stop_loss_${Date.now()}`,
        type: 'set_stop_loss',
        risk_type: 'drawdown_risk',
        priority: 'high',
        title: 'Set Stop Loss Orders',
        description: 'High drawdown risk detected',
        specific_actions: [],
        risk_reduction: 20,
        estimated_cost: 0,
        implementation_time: '15 minutes',
        success_probability: 0.90
      });
    }
    
    // Calculate projected risk score after recommendations
    const totalRiskReduction = recommendations.reduce((sum, r) => sum + r.risk_reduction, 0);
    const projectedRiskScore = Math.max(
      portfolioMetrics.total_risk_score - totalRiskReduction,
      0
    );
    
    return {
      portfolio_id: portfolioMetrics.portfolio_id,
      recommendations,
      current_risk_score: portfolioMetrics.total_risk_score,
      projected_risk_score: projectedRiskScore,
      generated_at: new Date()
    };
  }

  // Private helper methods
  
  private calculatePortfolioReturns(
    holdings: PortfolioHolding[],
    returns: Record<string, number[]>
  ): number[] {
    const numPeriods = Math.min(...Object.values(returns).map(r => r.length));
    const portfolioReturns: number[] = [];
    
    for (let i = 0; i < numPeriods; i++) {
      let portfolioReturn = 0;
      for (const holding of holdings) {
        const assetReturns = returns[holding.asset_id];
        if (assetReturns && assetReturns[i] !== undefined) {
          portfolioReturn += assetReturns[i] * holding.weight;
        }
      }
      portfolioReturns.push(portfolioReturn);
    }
    
    return portfolioReturns;
  }
  
  private reconstructPortfolioValues(
    holdings: PortfolioHolding[],
    returns: Record<string, number[]>
  ): number[] {
    const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
    const values = [totalValue];
    
    const portfolioReturns = this.calculatePortfolioReturns(holdings, returns);
    
    for (const ret of portfolioReturns) {
      values.push(values[values.length - 1] * (1 + ret));
    }
    
    return values;
  }
  
  private calculateCorrelationMatrix(
    holdings: PortfolioHolding[],
    returns: Record<string, number[]>
  ): Record<string, Record<string, number>> {
    const matrix: Record<string, Record<string, number>> = {};
    
    for (const holding1 of holdings) {
      matrix[holding1.asset_id] = {};
      for (const holding2 of holdings) {
        if (holding1.asset_id === holding2.asset_id) {
          matrix[holding1.asset_id][holding2.asset_id] = 1;
        } else {
          const returns1 = returns[holding1.asset_id] || [];
          const returns2 = returns[holding2.asset_id] || [];
          const correlation = this.riskCalculator.calculateCorrelation(returns1, returns2);
          matrix[holding1.asset_id][holding2.asset_id] = correlation;
        }
      }
    }
    
    return matrix;
  }
  
  private calculateSortinoRatio(returns: number[], targetReturn: number = 0): number {
    if (returns.length === 0) return 0;
    
    const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
    const annualizedReturn = avgReturn * 252;
    
    // Calculate downside deviation
    const downsideReturns = returns.filter(r => r < targetReturn);
    if (downsideReturns.length === 0) return 10; // Max sortino if no downside
    
    const downsideSquared = downsideReturns.map(r => Math.pow(r - targetReturn, 2));
    const downsideVariance = downsideSquared.reduce((a, b) => a + b, 0) / downsideReturns.length;
    const downsideDeviation = Math.sqrt(downsideVariance) * Math.sqrt(252);
    
    if (downsideDeviation === 0) return 10;
    
    return (annualizedReturn - targetReturn) / downsideDeviation;
  }
  
  private calculateTotalRiskScore(
    volatility: number,
    maxDrawdown: number,
    concentrationRisk: number,
    assetRisks: AssetRiskScore[],
    weights: number[]
  ): number {
    // Weighted average of asset risks
    let weightedAssetRisk = 0;
    for (let i = 0; i < assetRisks.length && i < weights.length; i++) {
      weightedAssetRisk += assetRisks[i].risk_score * weights[i];
    }
    
    // Combine different risk metrics
    const volatilityScore = Math.min(volatility, 100) * 0.3;
    const drawdownScore = Math.min(maxDrawdown * 2, 100) * 0.3;
    const concentrationScore = concentrationRisk * 100 * 0.2;
    const assetScore = weightedAssetRisk * 0.2;
    
    return volatilityScore + drawdownScore + concentrationScore + assetScore;
  }
  
  private generatePositionReductionActions(
    holdings: PortfolioHolding[],
    metrics: PortfolioRiskMetrics,
    profile: RiskProfile
  ): SpecificAction[] {
    const actions: SpecificAction[] = [];
    
    // Sort holdings by risk contribution
    const sortedHoldings = [...holdings].sort((a, b) => b.weight - a.weight);
    
    for (const holding of sortedHoldings) {
      if (holding.weight > profile.max_position_size / 100) {
        actions.push({
          id: `reduce_${holding.asset_id}_${Date.now()}`,
          action: 'Reduce position size',
          action_type: 'position_reduction',
          description: `Reduce ${holding.symbol} position to ${profile.max_position_size}%`,
          target_value: profile.max_position_size,
          current_value: holding.weight * 100,
          recommended_value: profile.max_position_size,
          reason: 'Position exceeds maximum allowed size',
          status: 'pending'
        });
      }
    }
    
    return actions;
  }
  
  private generateDiversificationActions(holdings: PortfolioHolding[]): SpecificAction[] {
    const actions: SpecificAction[] = [];
    const topHoldings = [...holdings].sort((a, b) => b.weight - a.weight).slice(0, 3);
    
    for (const holding of topHoldings) {
      if (holding.weight > 0.25) {
        actions.push({
          id: `diversify_${holding.asset_id}_${Date.now()}`,
          action: 'Reduce concentration',
          action_type: 'diversification',
          description: `Reduce ${holding.symbol} concentration to 20%`,
          target_value: 20,
          current_value: holding.weight * 100,
          recommended_value: 20,
          reason: 'High concentration in single asset',
          status: 'pending'
        });
      }
    }
    
    actions.push({
      id: `add_assets_${Date.now()}`,
      action: 'Add new assets',
      action_type: 'diversification',
      description: 'Increase portfolio diversification by adding 2-3 uncorrelated assets',
      target_value: 100,
      current_value: 100,
      reason: 'Increase portfolio diversification by adding 2-3 uncorrelated assets',
      status: 'pending'
    });
    
    return actions;
  }
  
  private generateStopLossActions(
    holdings: PortfolioHolding[],
    profile: RiskProfile
  ): SpecificAction[] {
    return holdings.map(holding => ({
      id: `stop_loss_${holding.asset_id}_${Date.now()}`,
      action: 'Set stop loss',
      action_type: 'risk_management',
      description: `Set stop loss at ${(profile.stop_loss_percentage)}% below current price`,
      target_value: holding.current_price * (1 - profile.stop_loss_percentage / 100),
      current_value: holding.current_price,
      recommended_value: holding.current_price * (1 - profile.stop_loss_percentage / 100),
      reason: 'Protect against large drawdowns',
      status: 'pending'
    }));
  }
} 