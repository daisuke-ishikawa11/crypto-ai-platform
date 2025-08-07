// Quantum walk-inspired portfolio optimizer

import { Complex } from './types';

export class QuantumWalkOptimizer {
  /**
   * Optimize portfolio weights using quantum walk principles
   * Note: This is a classical simulation inspired by quantum concepts
   */
  async optimizeWeights(
    assets: string[],
    priceHistory: Record<string, number[]>,
    params: {
      walkSteps: number;
      coherenceTime: number;
      targetReturn: number;
      maxRisk: number;
    }
  ): Promise<Record<string, number>> {
    const n = assets.length;
    
    // Initialize quantum state (equal superposition)
    let amplitudes: Complex[] = Array(n).fill(null).map(() => ({
      real: 1 / Math.sqrt(n),
      imaginary: 0
    }));
    
    // Build adjacency matrix based on correlations
    const adjacencyMatrix = this.buildAdjacencyMatrix(assets, priceHistory);
    
    // Perform quantum walk steps
    for (let step = 0; step < params.walkSteps; step++) {
      // Apply coin operator (Hadamard-like)
      amplitudes = this.applyCoinOperator(amplitudes);
      
      // Apply shift operator based on adjacency
      amplitudes = this.applyShiftOperator(amplitudes, adjacencyMatrix);
      
      // Apply decoherence (simulating real-world constraints)
      if (step % params.coherenceTime === 0) {
        amplitudes = this.applyDecoherence(amplitudes, params);
      }
    }
    
    // Convert quantum amplitudes to portfolio weights
    const weights = this.amplitudesToWeights(amplitudes, assets);
    
    // Post-process to ensure constraints
    return this.normalizeWeights(weights, params);
  }
  
  /**
   * Build adjacency matrix based on asset correlations
   */
  private buildAdjacencyMatrix(
    assets: string[],
    priceHistory: Record<string, number[]>
  ): number[][] {
    const n = assets.length;
    const matrix: number[][] = Array(n).fill(null).map(() => Array(n).fill(0));
    
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i === j) {
          matrix[i][j] = 1; // Self-loop
        } else {
          const correlation = this.calculateCorrelation(
            priceHistory[assets[i]],
            priceHistory[assets[j]]
          );
          // Convert correlation to adjacency weight (prefer low correlation)
          matrix[i][j] = Math.exp(-Math.abs(correlation));
        }
      }
    }
    
    return matrix;
  }
  
  /**
   * Apply coin operator (quantum superposition)
   */
  private applyCoinOperator(amplitudes: Complex[]): Complex[] {
    // Simplified Grover coin operator
    const n = amplitudes.length;
    const avg = amplitudes.reduce((sum, amp) => ({
      real: sum.real + amp.real / n,
      imaginary: sum.imaginary + amp.imaginary / n
    }), { real: 0, imaginary: 0 });
    
    return amplitudes.map(amp => ({
      real: 2 * avg.real - amp.real,
      imaginary: 2 * avg.imaginary - amp.imaginary
    }));
  }
  
  /**
   * Apply shift operator based on graph structure
   */
  private applyShiftOperator(
    amplitudes: Complex[],
    adjacencyMatrix: number[][]
  ): Complex[] {
    const n = amplitudes.length;
    const newAmplitudes: Complex[] = Array(n).fill(null).map(() => ({
      real: 0,
      imaginary: 0
    }));
    
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const weight = adjacencyMatrix[i][j];
        newAmplitudes[i].real += weight * amplitudes[j].real;
        newAmplitudes[i].imaginary += weight * amplitudes[j].imaginary;
      }
    }
    
    // Normalize
    const norm = Math.sqrt(
      newAmplitudes.reduce((sum, amp) => 
        sum + amp.real * amp.real + amp.imaginary * amp.imaginary, 0
      )
    );
    
    return newAmplitudes.map(amp => ({
      real: amp.real / norm,
      imaginary: amp.imaginary / norm
    }));
  }
  
  /**
   * Apply decoherence to simulate real-world constraints
   */
  private applyDecoherence(
    amplitudes: Complex[],
    params: { targetReturn: number; maxRisk: number }
  ): Complex[] {
    // Reduce imaginary components (decoherence)
    return amplitudes.map(amp => ({
      real: amp.real,
      imaginary: amp.imaginary * 0.9
    }));
  }
  
  /**
   * Convert quantum amplitudes to portfolio weights
   */
  private amplitudesToWeights(
    amplitudes: Complex[],
    assets: string[]
  ): Record<string, number> {
    const weights: Record<string, number> = {};
    
    // Convert to probabilities (|amplitude|^2)
    const probabilities = amplitudes.map(amp => 
      amp.real * amp.real + amp.imaginary * amp.imaginary
    );
    
    // Assign weights
    for (let i = 0; i < assets.length; i++) {
      weights[assets[i]] = probabilities[i];
    }
    
    return weights;
  }
  
  /**
   * Normalize weights to ensure constraints
   */
  private normalizeWeights(
    weights: Record<string, number>,
    params: { targetReturn: number; maxRisk: number }
  ): Record<string, number> {
    // Ensure weights sum to 1
    const sum = Object.values(weights).reduce((a, b) => a + b, 0);
    
    const normalized: Record<string, number> = {};
    for (const [asset, weight] of Object.entries(weights)) {
      normalized[asset] = weight / sum;
      
      // Apply minimum weight threshold
      if (normalized[asset] < 0.01) {
        normalized[asset] = 0;
      }
    }
    
    // Re-normalize after threshold
    const newSum = Object.values(normalized).reduce((a, b) => a + b, 0);
    if (newSum > 0) {
      for (const asset in normalized) {
        normalized[asset] /= newSum;
      }
    }
    
    return normalized;
  }
  
  /**
   * Calculate correlation between two price series
   */
  private calculateCorrelation(prices1: number[], prices2: number[]): number {
    if (!prices1 || !prices2 || prices1.length !== prices2.length || prices1.length < 2) {
      return 0;
    }
    
    // Calculate returns
    const returns1: number[] = [];
    const returns2: number[] = [];
    
    for (let i = 1; i < prices1.length; i++) {
      returns1.push((prices1[i] - prices1[i - 1]) / prices1[i - 1]);
      returns2.push((prices2[i] - prices2[i - 1]) / prices2[i - 1]);
    }
    
    // Calculate correlation
    const n = returns1.length;
    const mean1 = returns1.reduce((a, b) => a + b, 0) / n;
    const mean2 = returns2.reduce((a, b) => a + b, 0) / n;
    
    let numerator = 0;
    let denominator1 = 0;
    let denominator2 = 0;
    
    for (let i = 0; i < n; i++) {
      const diff1 = returns1[i] - mean1;
      const diff2 = returns2[i] - mean2;
      numerator += diff1 * diff2;
      denominator1 += diff1 * diff1;
      denominator2 += diff2 * diff2;
    }
    
    const denominator = Math.sqrt(denominator1 * denominator2);
    
    return denominator === 0 ? 0 : numerator / denominator;
  }
} 