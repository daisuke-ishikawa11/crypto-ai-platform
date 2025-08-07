// Material science-inspired portfolio optimizer

import { 
  MaterialOptimizationParams,
  MaterialOptimizationResult,
  Portfolio,
  AssetElement,
  PortfolioMetrics,
  MarketConditions
} from './types';
import { PortfolioPhaseAnalyzer } from './phase-analyzer';
import { AssetCompatibilityAnalyzer } from './compatibility-analyzer';
import { QuantumWalkOptimizer } from './quantum-walk-optimizer';

export class MaterialSciencePortfolioOptimizer {
  private phaseAnalyzer: PortfolioPhaseAnalyzer;
  private compatibilityAnalyzer: AssetCompatibilityAnalyzer;
  private quantumOptimizer: QuantumWalkOptimizer;
  
  constructor() {
    this.phaseAnalyzer = new PortfolioPhaseAnalyzer();
    this.compatibilityAnalyzer = new AssetCompatibilityAnalyzer();
    this.quantumOptimizer = new QuantumWalkOptimizer();
  }
  
  /**
   * Optimize portfolio using material science concepts
   */
  async optimize(
    availableAssets: AssetElement[],
    priceHistory: Record<string, number[]>,
    marketData: {
      marketCap: Record<string, number>;
      volume: Record<string, number>;
      sector: Record<string, string>;
    },
    params: MaterialOptimizationParams,
    currentMarketConditions: MarketConditions
  ): Promise<MaterialOptimizationResult> {
    // 1. Analyze asset compatibility matrix
    const compatibilityMatrix = this.compatibilityAnalyzer.analyzeCompatibility(
      availableAssets,
      priceHistory,
      marketData
    );
    
    // 2. Filter compatible asset combinations
    const minAssets = Math.max(3, params.maxAssets - 2);
    const compatibleCombinations = this.compatibilityAnalyzer.findOptimalCombinations(
      compatibilityMatrix,
      minAssets,
      params.compatibilityThreshold || 0.5
    );
    
    if (compatibleCombinations.length === 0) {
      throw new Error('No compatible asset combinations found');
    }
    
    // 3. Evaluate each combination for phase stability
    let bestPortfolio: Portfolio | null = null;
    let bestScore = -Infinity;
    let bestPhase = null;
    let bestCompatibility = 0;
    
    for (const combination of compatibleCombinations.slice(0, 5)) { // Top 5 combinations
      // Use quantum walk to find optimal weights
      const weights = await this.quantumOptimizer.optimizeWeights(
        combination,
        priceHistory,
        {
          walkSteps: params.walkSteps || 100,
          coherenceTime: params.coherenceTime || 50,
          targetReturn: params.targetReturn,
          maxRisk: params.maxRisk
        }
      );
      
      // Create portfolio candidate
      const portfolio: Portfolio = {
        id: `material-opt-${Date.now()}`,
        userId: 'system',
        name: 'Material-Optimized Portfolio',
        weights: weights,
        totalValue: 1000000, // Default value
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      // Calculate metrics
      const metrics = this.calculateMetrics(portfolio, priceHistory, combination);
      
      // Analyze phase
      const phase = this.phaseAnalyzer.analyzePhase(
        portfolio,
        this.getPortfolioReturns(portfolio, priceHistory),
        metrics.volatility,
        metrics.sharpeRatio,
        currentMarketConditions
      );
      
      // Calculate overall score
      const score = this.calculateOptimizationScore(
        metrics,
        phase.phase === 'stable' ? 1 : phase.phase === 'metastable' ? 0.7 : 0.3,
        this.calculateCombinationCompatibility(combination, compatibilityMatrix),
        params
      );
      
      if (score > bestScore) {
        bestScore = score;
        bestPortfolio = portfolio;
        bestPhase = phase;
        bestCompatibility = this.calculateCombinationCompatibility(combination, compatibilityMatrix);
      }
    }
    
    if (!bestPortfolio || !bestPhase) {
      throw new Error('Optimization failed');
    }
    
    // 4. Generate phase diagram
    const phaseDiagram = this.phaseAnalyzer.generatePhaseDiagram(
      bestPortfolio,
      currentMarketConditions
    );
    
    // 5. Predict phase transitions
    const predictedTransitions = this.phaseAnalyzer.predictPhaseTransitions(
      bestPhase,
      currentMarketConditions,
      [], // Historical phases would come from database
      30
    );
    
    // 6. Calculate stability score
    const stabilityScore = this.calculateStabilityScore(
      bestPhase,
      bestCompatibility,
      currentMarketConditions
    );
    
    return {
      portfolio: bestPortfolio,
      phase: bestPhase,
      phaseDiagram,
      compatibilityScore: bestCompatibility,
      stabilityScore,
      predictedTransitions
    };
  }
  
  /**
   * Calculate portfolio metrics
   */
  private calculateMetrics(
    portfolio: Portfolio,
    priceHistory: Record<string, number[]>,
    assets: string[]
  ): PortfolioMetrics {
    const returns = this.getPortfolioReturns(portfolio, priceHistory);
    
    // Traditional metrics
    const totalReturn = this.calculateTotalReturn(returns);
    const annualizedReturn = totalReturn * (252 / returns.length);
    const volatility = this.calculateVolatility(returns);
    const sharpeRatio = volatility > 0 ? (annualizedReturn - 0.02) / volatility : 0;
    const maxDrawdown = this.calculateMaxDrawdown(returns);
    
    // Material science metrics
    const phaseStability = this.calculatePhaseStability(portfolio, volatility, sharpeRatio);
    const compositionEntropy = this.calculateCompositionEntropy(portfolio.weights);
    const compatibilityIndex = 0.7; // Placeholder - would calculate from matrix
    const synergyFactor = this.calculateSynergyFactor(portfolio, assets);
    
    return {
      totalReturn,
      annualizedReturn,
      volatility,
      sharpeRatio,
      maxDrawdown,
      phaseStability,
      compositionEntropy,
      compatibilityIndex,
      synergyFactor
    };
  }
  
  /**
   * Get portfolio returns time series
   */
  private getPortfolioReturns(
    portfolio: Portfolio,
    priceHistory: Record<string, number[]>
  ): number[] {
    const assets = Object.keys(portfolio.weights);
    const firstAssetPrices = priceHistory[assets[0]];
    const numPeriods = firstAssetPrices.length - 1;
    const returns: number[] = [];
    
    for (let i = 1; i < firstAssetPrices.length; i++) {
      let portfolioReturn = 0;
      
      for (const asset of assets) {
        const prices = priceHistory[asset];
        if (prices && prices[i] && prices[i - 1]) {
          const assetReturn = (prices[i] - prices[i - 1]) / prices[i - 1];
          portfolioReturn += portfolio.weights[asset] * assetReturn;
        }
      }
      
      returns.push(portfolioReturn);
    }
    
    return returns;
  }
  
  /**
   * Calculate total return
   */
  private calculateTotalReturn(returns: number[]): number {
    return returns.reduce((total, r) => total * (1 + r), 1) - 1;
  }
  
  /**
   * Calculate volatility
   */
  private calculateVolatility(returns: number[]): number {
    if (returns.length === 0) return 0;
    
    const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
    
    return Math.sqrt(variance * 252); // Annualized
  }
  
  /**
   * Calculate maximum drawdown
   */
  private calculateMaxDrawdown(returns: number[]): number {
    let peak = 1;
    let maxDrawdown = 0;
    let value = 1;
    
    for (const r of returns) {
      value *= (1 + r);
      if (value > peak) {
        peak = value;
      }
      const drawdown = (peak - value) / peak;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    }
    
    return maxDrawdown;
  }
  
  /**
   * Calculate phase stability metric
   */
  private calculatePhaseStability(
    portfolio: Portfolio,
    volatility: number,
    sharpeRatio: number
  ): number {
    // Base stability on Sharpe ratio and volatility
    const sharpeComponent = Math.min(1, sharpeRatio / 2);
    const volComponent = Math.max(0, 1 - volatility / 0.3);
    
    // Entropy component (diversification)
    const entropy = this.calculateCompositionEntropy(portfolio.weights);
    const entropyComponent = entropy;
    
    return (sharpeComponent * 0.4 + volComponent * 0.4 + entropyComponent * 0.2);
  }
  
  /**
   * Calculate composition entropy
   */
  private calculateCompositionEntropy(weights: Record<string, number>): number {
    const weightArray = Object.values(weights);
    
    const entropy = -weightArray.reduce((sum, w) => {
      if (w > 0) {
        return sum + w * Math.log(w);
      }
      return sum;
    }, 0);
    
    const maxEntropy = Math.log(weightArray.length);
    
    return maxEntropy > 0 ? entropy / maxEntropy : 0;
  }
  
  /**
   * Calculate synergy factor
   */
  private calculateSynergyFactor(portfolio: Portfolio, assets: string[]): number {
    // Simplified synergy calculation
    // In practice, would use historical performance data
    
    const numAssets = assets.length;
    const avgWeight = 1 / numAssets;
    
    // Measure deviation from equal weight
    let deviation = 0;
    for (const asset of assets) {
      const weight = portfolio.weights[asset] || 0;
      deviation += Math.abs(weight - avgWeight);
    }
    
    // Lower deviation with good diversification = higher synergy
    const synergyBase = 1 - deviation / 2;
    
    // Bonus for having 4-8 assets (optimal range)
    const countBonus = numAssets >= 4 && numAssets <= 8 ? 0.1 : 0;
    
    return Math.min(1, synergyBase + countBonus);
  }
  
  /**
   * Calculate optimization score
   */
  private calculateOptimizationScore(
    metrics: PortfolioMetrics,
    phaseStabilityMultiplier: number,
    compatibilityScore: number,
    params: MaterialOptimizationParams
  ): number {
    // Check if metrics meet minimum requirements
    if (metrics.volatility > params.maxRisk) return -Infinity;
    if (metrics.annualizedReturn < params.targetReturn * 0.7) return -Infinity;
    
    // Weighted score calculation
    const weights = {
      sharpe: 0.3,
      stability: 0.25,
      compatibility: 0.2,
      synergy: 0.15,
      entropy: 0.1
    };
    
    const score = 
      weights.sharpe * Math.min(2, metrics.sharpeRatio) / 2 +
      weights.stability * metrics.phaseStability * phaseStabilityMultiplier +
      weights.compatibility * compatibilityScore +
      weights.synergy * metrics.synergyFactor +
      weights.entropy * metrics.compositionEntropy;
    
    return score;
  }
  
  /**
   * Calculate combination compatibility score
   */
  private calculateCombinationCompatibility(
    combination: string[],
    compatibilityMatrix: { assets: string[]; matrix: number[][] }
  ): number {
    const { assets, matrix } = compatibilityMatrix;
    let totalScore = 0;
    let count = 0;
    
    for (let i = 0; i < combination.length; i++) {
      for (let j = i + 1; j < combination.length; j++) {
        const idx1 = assets.indexOf(combination[i]);
        const idx2 = assets.indexOf(combination[j]);
        if (idx1 >= 0 && idx2 >= 0) {
          totalScore += matrix[idx1][idx2];
          count++;
        }
      }
    }
    
    return count > 0 ? totalScore / count : 0;
  }
  
  /**
   * Calculate overall stability score
   */
  private calculateStabilityScore(
    phase: { phase: 'stable' | 'metastable' | 'transition' | 'unstable' },
    compatibilityScore: number,
    marketConditions: MarketConditions
  ): number {
    // Phase contribution
    const phaseScore = phase.phase === 'stable' ? 0.9 : 
                      phase.phase === 'metastable' ? 0.6 :
                      phase.phase === 'transition' ? 0.4 : 0.2;
    
    // Market condition adjustment
    let marketAdjustment = 0;
    if (marketConditions.volatilityIndex < 20) marketAdjustment += 0.1;
    if (marketConditions.correlationRegime === 'normal') marketAdjustment += 0.1;
    if (marketConditions.liquidityScore > 0.7) marketAdjustment += 0.05;
    
    // Compatibility contribution
    const compatibilityContribution = compatibilityScore * 0.2;
    
    return Math.min(1, phaseScore + marketAdjustment + compatibilityContribution);
  }
} 