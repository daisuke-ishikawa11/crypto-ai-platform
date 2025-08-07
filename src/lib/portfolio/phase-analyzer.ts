// Portfolio phase analyzer using material science concepts

import { 
  PortfolioPhase, 
  PhasePoint, 
  MarketConditions,
  Portfolio,
  PhaseTransition,
  PhaseTimeSeries
} from './types';

export class PortfolioPhaseAnalyzer {
  // Phase stability thresholds
  private readonly STABLE_SHARPE_THRESHOLD = 1.5;
  private readonly STABLE_VOLATILITY_THRESHOLD = 0.15;
  private readonly ENTROPY_THRESHOLD = 0.6;
  
  /**
   * Analyze current portfolio phase based on risk-return characteristics
   */
  analyzePhase(
    portfolio: Portfolio,
    returns: number[],
    volatility: number,
    sharpeRatio: number,
    marketConditions: MarketConditions
  ): PortfolioPhase {
    // Calculate phase metrics
    const energy = this.calculateEnergy(volatility, sharpeRatio);
    const entropy = this.calculateEntropy(portfolio.weights);
    const temperature = marketConditions.volatilityIndex;
    
    // Determine phase
    let phase: PortfolioPhase['phase'];
    
    if (sharpeRatio >= this.STABLE_SHARPE_THRESHOLD && 
        volatility <= this.STABLE_VOLATILITY_THRESHOLD &&
        entropy >= this.ENTROPY_THRESHOLD) {
      phase = 'stable';
    } else if (sharpeRatio >= 1.0 && volatility <= 0.25) {
      phase = 'metastable';
    } else if (marketConditions.correlationRegime === 'stressed' ||
               volatility > 0.35) {
      phase = 'unstable';
    } else {
      phase = 'transition';
    }
    
    return {
      phase,
      composition: portfolio.weights,
      energy,
      entropy,
      temperature
    };
  }
  
  /**
   * Calculate portfolio energy (risk-adjusted metric)
   */
  private calculateEnergy(volatility: number, sharpeRatio: number): number {
    // Energy inversely related to Sharpe and directly to volatility
    const riskComponent = volatility * volatility;
    const returnComponent = Math.max(0.1, sharpeRatio);
    
    return riskComponent / returnComponent;
  }
  
  /**
   * Calculate portfolio entropy (diversification measure)
   */
  private calculateEntropy(weights: Record<string, number>): number {
    const weightArray = Object.values(weights);
    
    // Shannon entropy
    const entropy = -weightArray.reduce((sum, w) => {
      if (w > 0) {
        return sum + w * Math.log(w);
      }
      return sum;
    }, 0);
    
    // Normalize by maximum possible entropy
    const maxEntropy = Math.log(weightArray.length);
    
    return maxEntropy > 0 ? entropy / maxEntropy : 0;
  }
  
  /**
   * Generate phase diagram for different risk-return combinations
   */
  generatePhaseDiagram(
    portfolio: Portfolio,
    marketConditions: MarketConditions,
    riskRange: [number, number] = [0, 0.5],
    returnRange: [number, number] = [-0.2, 0.5],
    resolution: number = 20
  ): PhasePoint[] {
    const points: PhasePoint[] = [];
    
    const riskStep = (riskRange[1] - riskRange[0]) / resolution;
    const returnStep = (returnRange[1] - returnRange[0]) / resolution;
    
    for (let i = 0; i <= resolution; i++) {
      for (let j = 0; j <= resolution; j++) {
        const risk = riskRange[0] + i * riskStep;
        const expectedReturn = returnRange[0] + j * returnStep;
        
        // Calculate Sharpe ratio
        const riskFreeRate = 0.02;
        const sharpeRatio = risk > 0 ? (expectedReturn - riskFreeRate) / risk : 0;
        
        // Analyze phase at this point
        const phase = this.analyzePhase(
          portfolio,
          [], // Historical returns not needed for phase diagram
          risk,
          sharpeRatio,
          marketConditions
        );
        
        // Calculate stability score
        const stability = this.calculateStability(phase, sharpeRatio, risk);
        
        points.push({
          riskLevel: risk,
          returnLevel: expectedReturn,
          phase,
          stability
        });
      }
    }
    
    return points;
  }
  
  /**
   * Calculate phase stability score
   */
  private calculateStability(
    phase: PortfolioPhase,
    sharpeRatio: number,
    volatility: number
  ): number {
    let baseStability = 0;
    
    switch (phase.phase) {
      case 'stable':
        baseStability = 0.9;
        break;
      case 'metastable':
        baseStability = 0.6;
        break;
      case 'transition':
        baseStability = 0.4;
        break;
      case 'unstable':
        baseStability = 0.2;
        break;
    }
    
    // Adjust for Sharpe ratio
    const sharpeAdjustment = Math.min(0.1, sharpeRatio / 20);
    
    // Adjust for volatility (negative impact)
    const volatilityPenalty = Math.min(0.2, volatility);
    
    // Adjust for entropy (positive impact)
    const entropyBonus = phase.entropy * 0.1;
    
    return Math.max(0, Math.min(1, 
      baseStability + sharpeAdjustment - volatilityPenalty + entropyBonus
    ));
  }

  /**
   * Predict phase transitions based on market conditions
   */
  predictPhaseTransitions(
    currentPhase: PortfolioPhase,
    marketConditions: MarketConditions,
    historicalPhases: PhaseTimeSeries[],
    timeHorizon: number = 30 // days
  ): PhaseTransition[] {
    const transitions: PhaseTransition[] = [];
    const possiblePhases: PortfolioPhase['phase'][] = ['stable', 'metastable', 'unstable', 'transition'];
    
    // Analyze historical transition patterns
    const transitionPatterns = this.analyzeTransitionPatterns(historicalPhases);
    
    // Calculate transition probabilities
    for (const targetPhase of possiblePhases) {
      if (targetPhase === currentPhase.phase) continue;
      
      const probability = this.calculateTransitionProbability(
        currentPhase,
        targetPhase,
        marketConditions,
        transitionPatterns
      );
      
      if (probability > 0.1) { // Only include significant probabilities
        const triggerCondition = this.identifyTriggerCondition(
          currentPhase.phase,
          targetPhase,
          marketConditions
        );
        
        transitions.push({
          fromPhase: currentPhase.phase,
          toPhase: targetPhase,
          triggerCondition,
          probability,
          timeHorizon
        });
      }
    }
    
    // Sort by probability
    return transitions.sort((a, b) => b.probability - a.probability);
  }
  
  /**
   * Analyze historical phase transition patterns
   */
  private analyzeTransitionPatterns(
    historicalPhases: PhaseTimeSeries[]
  ): Map<string, number> {
    const patterns = new Map<string, number>();
    
    for (let i = 1; i < historicalPhases.length; i++) {
      const fromPhase = historicalPhases[i - 1].phase.phase;
      const toPhase = historicalPhases[i].phase.phase;
      const key = `${fromPhase}->${toPhase}`;
      
      patterns.set(key, (patterns.get(key) || 0) + 1);
    }
    
    // Normalize counts to probabilities
    const total = historicalPhases.length - 1;
    for (const [key, count] of patterns.entries()) {
      patterns.set(key, count / total);
    }
    
    return patterns;
  }
  
  /**
   * Calculate probability of phase transition
   */
  private calculateTransitionProbability(
    currentPhase: PortfolioPhase,
    targetPhase: PortfolioPhase['phase'],
    marketConditions: MarketConditions,
    historicalPatterns: Map<string, number>
  ): number {
    const key = `${currentPhase.phase}->${targetPhase}`;
    const historicalProb = historicalPatterns.get(key) || 0;
    
    // Market condition adjustments
    let marketAdjustment = 0;
    
    // Stress conditions increase probability of unstable transitions
    if (marketConditions.correlationRegime === 'stressed') {
      if (targetPhase === 'unstable') {
        marketAdjustment += 0.3;
      } else if (targetPhase === 'stable') {
        marketAdjustment -= 0.2;
      }
    }
    
    // High volatility increases transition probability
    if (marketConditions.volatilityIndex > 25) {
      if (currentPhase.phase === 'stable' && targetPhase === 'metastable') {
        marketAdjustment += 0.2;
      }
    }
    
    // Low liquidity increases instability
    if (marketConditions.liquidityScore < 0.3) {
      if (targetPhase === 'unstable' || targetPhase === 'transition') {
        marketAdjustment += 0.15;
      }
    }
    
    // Energy considerations
    const energyDiff = this.estimateEnergyDifference(currentPhase, targetPhase);
    const energyProb = Math.exp(-Math.abs(energyDiff) / (currentPhase.temperature || 1));
    
    // Combine probabilities
    const baseProbability = historicalProb * 0.4 + energyProb * 0.3;
    const adjustedProbability = Math.max(0, Math.min(1, baseProbability + marketAdjustment));
    
    return adjustedProbability;
  }
  
  /**
   * Estimate energy difference between phases
   */
  private estimateEnergyDifference(
    currentPhase: PortfolioPhase,
    targetPhase: PortfolioPhase['phase']
  ): number {
    const phaseEnergies = {
      'stable': 0.2,
      'metastable': 0.5,
      'transition': 0.7,
      'unstable': 1.0
    };
    
    return phaseEnergies[targetPhase] - currentPhase.energy;
  }
  
  /**
   * Identify trigger conditions for phase transitions
   */
  private identifyTriggerCondition(
    fromPhase: PortfolioPhase['phase'],
    toPhase: PortfolioPhase['phase'],
    marketConditions: MarketConditions
  ): string {
    const triggers: Record<string, string> = {
      'stable->metastable': 'Increasing market volatility or correlation breakdown',
      'stable->unstable': 'Market stress event or liquidity crisis',
      'stable->transition': 'Gradual deterioration in risk-return profile',
      'metastable->stable': 'Market normalization and volatility reduction',
      'metastable->unstable': 'Sharp market shock or systemic risk event',
      'metastable->transition': 'Continued market uncertainty',
      'unstable->transition': 'Initial market recovery signs',
      'unstable->metastable': 'Partial market stabilization',
      'transition->stable': 'Complete market recovery and optimization',
      'transition->metastable': 'Partial portfolio rebalancing',
      'transition->unstable': 'Failed recovery or new crisis'
    };
    
    const key = `${fromPhase}->${toPhase}`;
    let trigger = triggers[key] || 'Market regime change';
    
    // Add specific current conditions
    if (marketConditions.volatilityIndex > 30) {
      trigger += ' (High VIX: ' + marketConditions.volatilityIndex.toFixed(1) + ')';
    }
    if (marketConditions.correlationRegime === 'stressed') {
      trigger += ' (Stressed correlations)';
    }
    
    return trigger;
  }
  
  /**
   * Optimize portfolio composition for phase stability
   */
  optimizeForPhaseStability(
    currentPortfolio: Portfolio,
    targetPhase: PortfolioPhase['phase'],
    availableAssets: string[],
    constraints: {
      minWeight: number;
      maxWeight: number;
      maxAssets: number;
    }
  ): Record<string, number> {
    // This is a simplified optimization
    // In practice, would use more sophisticated optimization algorithms
    
    const targetEntropy = targetPhase === 'stable' ? 0.8 : 0.6;
    const numAssets = Math.min(constraints.maxAssets, availableAssets.length);
    
    // Equal weight as starting point
    const equalWeight = 1 / numAssets;
    const weights: Record<string, number> = {};
    
    // Select top assets by some criteria (simplified)
    const selectedAssets = availableAssets.slice(0, numAssets);
    
    // Distribute weights to achieve target entropy
    for (let i = 0; i < selectedAssets.length; i++) {
      const asset = selectedAssets[i];
      
      // Adjust weights based on target phase
      let weight = equalWeight;
      
      if (targetPhase === 'stable') {
        // Prefer more equal distribution
        const variation = (Math.random() - 0.5) * 0.1;
        weight = equalWeight + variation;
      } else if (targetPhase === 'metastable') {
        // Allow more concentration
        const variation = (Math.random() - 0.5) * 0.2;
        weight = equalWeight + variation;
      }
      
      // Apply constraints
      weight = Math.max(constraints.minWeight, Math.min(constraints.maxWeight, weight));
      weights[asset] = weight;
    }
    
    // Normalize weights
    const sum = Object.values(weights).reduce((a, b) => a + b, 0);
    for (const asset in weights) {
      weights[asset] /= sum;
    }
    
    return weights;
  }
} 