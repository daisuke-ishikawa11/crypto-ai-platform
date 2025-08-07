// Asset compatibility analyzer using material science concepts

import { 
  AssetElement, 
  CompatibilityMatrix, 
  ReactivityPrediction 
} from './types';

export class AssetCompatibilityAnalyzer {
  private historicalCorrelations: Map<string, number> = new Map();
  
  /**
   * Analyze compatibility between assets using material science principles
   */
  analyzeCompatibility(
    assets: AssetElement[],
    priceData: Record<string, number[]>,
    marketData?: {
      marketCap: Record<string, number>;
      volume: Record<string, number>;
      sector: Record<string, string>;
    }
  ): CompatibilityMatrix {
    const n = assets.length;
    const matrix: number[][] = Array(n).fill(null).map(() => Array(n).fill(0));
    const assetSymbols = assets.map(a => a.symbol);
    
    // Calculate pairwise compatibility
    for (let i = 0; i < n; i++) {
      for (let j = i; j < n; j++) {
        if (i === j) {
          matrix[i][j] = 1; // Perfect self-compatibility
        } else {
          const compatibility = this.calculatePairwiseCompatibility(
            assets[i],
            assets[j],
            priceData[assets[i].symbol],
            priceData[assets[j].symbol],
            marketData
          );
          matrix[i][j] = compatibility;
          matrix[j][i] = compatibility; // Symmetric
        }
      }
    }
    
    return {
      assets: assetSymbols,
      matrix,
      threshold: 0.5 // Default threshold for compatibility
    };
  }
  
  /**
   * Calculate compatibility between two assets
   */
  private calculatePairwiseCompatibility(
    asset1: AssetElement,
    asset2: AssetElement,
    prices1: number[],
    prices2: number[],
    marketData?: {
      marketCap: Record<string, number>;
      volume: Record<string, number>;
      sector: Record<string, string>;
    }
  ): number {
    // Multiple factors contribute to compatibility
    
    // 1. Correlation factor (negative correlation is good for diversification)
    const correlation = this.calculateCorrelation(prices1, prices2);
    const correlationScore = 1 - Math.abs(correlation); // Best at 0 correlation
    
    // 2. Volatility compatibility (similar volatility levels)
    const vol1 = this.calculateVolatility(prices1);
    const vol2 = this.calculateVolatility(prices2);
    const volRatio = Math.min(vol1, vol2) / Math.max(vol1, vol2);
    const volatilityScore = volRatio; // 1 when equal, lower when different
    
    // 3. Market cap compatibility (Hume-Rothery size rule analog)
    let sizeScore = 0.5; // Default if no market data
    if (marketData?.marketCap) {
      const cap1 = marketData.marketCap[asset1.symbol] || 1;
      const cap2 = marketData.marketCap[asset2.symbol] || 1;
      const capRatio = Math.min(cap1, cap2) / Math.max(cap1, cap2);
      // Prefer some size difference but not extreme
      sizeScore = 0.3 + 0.7 * Math.exp(-Math.pow(Math.log(capRatio) / Math.log(0.5), 2));
    }
    
    // 4. Sector diversity bonus
    let sectorScore = 0.5; // Default
    if (marketData?.sector) {
      const sector1 = marketData.sector[asset1.symbol];
      const sector2 = marketData.sector[asset2.symbol];
      sectorScore = sector1 === sector2 ? 0.3 : 0.8; // Bonus for different sectors
    }
    
    // 5. Liquidity compatibility
    let liquidityScore = 0.5; // Default
    if (marketData?.volume) {
      const vol1 = marketData.volume[asset1.symbol] || 1;
      const vol2 = marketData.volume[asset2.symbol] || 1;
      const volRatio = Math.min(vol1, vol2) / Math.max(vol1, vol2);
      liquidityScore = Math.pow(volRatio, 0.3); // Less sensitive to differences
    }
    
    // Weighted combination
    const weights = {
      correlation: 0.35,
      volatility: 0.25,
      size: 0.15,
      sector: 0.15,
      liquidity: 0.10
    };
    
    const totalScore = 
      weights.correlation * correlationScore +
      weights.volatility * volatilityScore +
      weights.size * sizeScore +
      weights.sector * sectorScore +
      weights.liquidity * liquidityScore;
    
    return Math.max(0, Math.min(1, totalScore));
  }
  
  /**
   * Calculate correlation between two price series
   */
  private calculateCorrelation(prices1: number[], prices2: number[]): number {
    if (prices1.length !== prices2.length || prices1.length < 2) {
      return 0;
    }
    
    // Calculate returns
    const returns1 = this.calculateReturns(prices1);
    const returns2 = this.calculateReturns(prices2);
    
    // Calculate means
    const mean1 = returns1.reduce((a, b) => a + b, 0) / returns1.length;
    const mean2 = returns2.reduce((a, b) => a + b, 0) / returns2.length;
    
    // Calculate correlation
    let numerator = 0;
    let denominator1 = 0;
    let denominator2 = 0;
    
    for (let i = 0; i < returns1.length; i++) {
      const diff1 = returns1[i] - mean1;
      const diff2 = returns2[i] - mean2;
      numerator += diff1 * diff2;
      denominator1 += diff1 * diff1;
      denominator2 += diff2 * diff2;
    }
    
    const denominator = Math.sqrt(denominator1 * denominator2);
    
    return denominator === 0 ? 0 : numerator / denominator;
  }
  
  /**
   * Calculate returns from price series
   */
  private calculateReturns(prices: number[]): number[] {
    const returns: number[] = [];
    for (let i = 1; i < prices.length; i++) {
      returns.push((prices[i] - prices[i - 1]) / prices[i - 1]);
    }
    return returns;
  }
  
  /**
   * Calculate volatility of returns
   */
  private calculateVolatility(prices: number[]): number {
    const returns = this.calculateReturns(prices);
    if (returns.length === 0) return 0;
    
    const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
    
    return Math.sqrt(variance * 252); // Annualized
  }
  
  /**
   * Predict reactivity between asset pairs using ML-inspired approach
   */
  predictReactivity(
    asset1: AssetElement,
    asset2: AssetElement,
    historicalData: {
      compatibility: number;
      performance: number;
      marketCondition: string;
    }[]
  ): ReactivityPrediction {
    // Simple prediction model (in practice, would use actual ML)
    const baseReactivity = 0.5;
    
    // Adjust based on "atomic" properties
    const volatilityDiff = Math.abs((asset1.atomicRadius || 0.5) - (asset2.atomicRadius || 0.5));
    const correlationStrength = (asset1.electronegativity || 0.5) + (asset2.electronegativity || 0.5);
    const liquidityProduct = (asset1.valencElectrons || 0.5) * (asset2.valencElectrons || 0.5);
    
    // Calculate reactivity score
    let reactivityScore = baseReactivity;
    reactivityScore += (1 - volatilityDiff) * 0.2; // Similar volatility is good
    reactivityScore += correlationStrength * 0.1; // Some correlation is acceptable
    reactivityScore += liquidityProduct * 0.2; // High liquidity product is good
    
    // Learn from historical data
    if (historicalData.length > 0) {
      const avgCompatibility = historicalData.reduce((sum, d) => sum + d.compatibility, 0) / historicalData.length;
      const avgPerformance = historicalData.reduce((sum, d) => sum + d.performance, 0) / historicalData.length;
      
      reactivityScore = reactivityScore * 0.6 + avgCompatibility * 0.2 + avgPerformance * 0.2;
    }
    
    // Bound the score
    reactivityScore = Math.max(0, Math.min(1, reactivityScore));
    
    // Predict synergy
    const predictedSynergy = reactivityScore > 0.7 ? reactivityScore * 0.15 : reactivityScore * 0.05;
    
    // Confidence based on data availability
    const confidence = historicalData.length > 10 ? 0.8 : 0.5;
    
    // Generate explanation
    const explanation = this.generateReactivityExplanation(
      asset1,
      asset2,
      reactivityScore,
      volatilityDiff,
      correlationStrength
    );
    
    return {
      assetPair: [asset1.symbol, asset2.symbol],
      reactivityScore,
      predictedSynergy,
      confidence,
      explanation
    };
  }
  
  /**
   * Generate human-readable explanation for reactivity prediction
   */
  private generateReactivityExplanation(
    asset1: AssetElement,
    asset2: AssetElement,
    reactivityScore: number,
    volatilityDiff: number,
    correlationStrength: number
  ): string {
    let explanation = `${asset1.symbol} and ${asset2.symbol} show `;
    
    if (reactivityScore > 0.8) {
      explanation += 'excellent compatibility';
    } else if (reactivityScore > 0.6) {
      explanation += 'good compatibility';
    } else if (reactivityScore > 0.4) {
      explanation += 'moderate compatibility';
    } else {
      explanation += 'limited compatibility';
    }
    
    explanation += '. ';
    
    // Add specific factors
    if (volatilityDiff < 0.1) {
      explanation += 'Similar volatility profiles enhance stability. ';
    } else if (volatilityDiff > 0.3) {
      explanation += 'Different volatility levels may cause portfolio imbalance. ';
    }
    
    if (correlationStrength > 1.5) {
      explanation += 'Strong market correlations suggest co-movement. ';
    } else if (correlationStrength < 0.5) {
      explanation += 'Low correlation provides diversification benefits. ';
    }
    
    return explanation;
  }
  
  /**
   * Find optimal asset combinations based on compatibility
   */
  findOptimalCombinations(
    compatibilityMatrix: CompatibilityMatrix,
    targetSize: number,
    minCompatibility: number = 0.5
  ): string[][] {
    const { assets, matrix } = compatibilityMatrix;
    const n = assets.length;
    const combinations: string[][] = [];
    
    // Generate all possible combinations of targetSize
    const indices = this.generateCombinations(n, targetSize);
    
    // Evaluate each combination
    for (const combo of indices) {
      let totalCompatibility = 0;
      let count = 0;
      
      // Calculate average pairwise compatibility
      for (let i = 0; i < combo.length; i++) {
        for (let j = i + 1; j < combo.length; j++) {
          totalCompatibility += matrix[combo[i]][combo[j]];
          count++;
        }
      }
      
      const avgCompatibility = count > 0 ? totalCompatibility / count : 0;
      
      if (avgCompatibility >= minCompatibility) {
        combinations.push(combo.map(i => assets[i]));
      }
    }
    
    // Sort by average compatibility (descending)
    combinations.sort((a, b) => {
      const scoreA = this.calculateCombinationScore(a, assets, matrix);
      const scoreB = this.calculateCombinationScore(b, assets, matrix);
      return scoreB - scoreA;
    });
    
    return combinations.slice(0, 10); // Return top 10
  }
  
  /**
   * Generate all combinations of k elements from n
   */
  private generateCombinations(n: number, k: number): number[][] {
    const result: number[][] = [];
    const combination: number[] = [];
    
    function backtrack(start: number) {
      if (combination.length === k) {
        result.push([...combination]);
        return;
      }
      
      for (let i = start; i < n; i++) {
        combination.push(i);
        backtrack(i + 1);
        combination.pop();
      }
    }
    
    backtrack(0);
    return result;
  }
  
  /**
   * Calculate score for a combination of assets
   */
  private calculateCombinationScore(
    combination: string[],
    allAssets: string[],
    matrix: number[][]
  ): number {
    let totalScore = 0;
    let count = 0;
    
    for (let i = 0; i < combination.length; i++) {
      for (let j = i + 1; j < combination.length; j++) {
        const idx1 = allAssets.indexOf(combination[i]);
        const idx2 = allAssets.indexOf(combination[j]);
        if (idx1 >= 0 && idx2 >= 0) {
          totalScore += matrix[idx1][idx2];
          count++;
        }
      }
    }
    
    return count > 0 ? totalScore / count : 0;
  }
} 