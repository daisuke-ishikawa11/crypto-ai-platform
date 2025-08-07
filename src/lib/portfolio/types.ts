// Material science-inspired portfolio optimization types

// Asset as material element
export interface AssetElement {
  symbol: string;
  atomicNumber?: number; // Priority rank
  atomicRadius?: number; // Volatility
  electronegativity?: number; // Correlation strength
  valencElectrons?: number; // Liquidity
}

// Portfolio phase state
export interface PortfolioPhase {
  phase: 'stable' | 'metastable' | 'unstable' | 'transition';
  composition: Record<string, number>; // Asset weights
  energy: number; // Risk level
  entropy: number; // Diversification measure
  temperature?: number; // Market volatility
}

// Phase diagram point
export interface PhasePoint {
  riskLevel: number;
  returnLevel: number;
  phase: PortfolioPhase;
  stability: number;
}

// Asset compatibility matrix
export interface CompatibilityMatrix {
  assets: string[];
  matrix: number[][]; // Compatibility scores
  threshold: number; // Minimum compatibility
}

// Quantum walk state
export interface QuantumWalkState {
  position: string; // Current asset
  amplitude: Complex; // Quantum amplitude
  probability: number; // |amplitude|^2
}

export interface Complex {
  real: number;
  imaginary: number;
}

// Material optimization parameters
export interface MaterialOptimizationParams {
  // Phase stability parameters
  minStability: number;
  maxRisk: number;
  targetReturn: number;
  
  // Composition rules
  minWeight: number;
  maxWeight: number;
  maxAssets: number;
  
  // Quantum walk parameters
  walkSteps?: number;
  coherenceTime?: number;
  
  // Compatibility parameters
  compatibilityThreshold?: number;
  synergyBonus?: number;
}

// Optimization result
export interface MaterialOptimizationResult {
  portfolio: Portfolio;
  phase: PortfolioPhase;
  phaseDiagram?: PhasePoint[];
  compatibilityScore: number;
  stabilityScore: number;
  predictedTransitions?: PhaseTransition[];
}

export interface PhaseTransition {
  fromPhase: string;
  toPhase: string;
  triggerCondition: string;
  probability: number;
  timeHorizon: number;
}

// Portfolio structure
export interface Portfolio {
  id: string;
  userId: string;
  name: string;
  weights: Record<string, number>;
  totalValue: number;
  createdAt: Date;
  updatedAt: Date;
}

// Enhanced portfolio metrics
export interface PortfolioMetrics {
  // Traditional metrics
  totalReturn: number;
  annualizedReturn: number;
  volatility: number;
  sharpeRatio: number;
  maxDrawdown: number;
  
  // Material science metrics
  phaseStability: number;
  compositionEntropy: number;
  compatibilityIndex: number;
  synergyFactor: number;
  criticalTemperature?: number; // Market stress threshold
}

// Crystal structure analogy
export interface PortfolioCrystalStructure {
  latticeType: 'fcc' | 'bcc' | 'hcp' | 'amorphous'; // Portfolio structure type
  coordinationNumber: number; // Average correlations per asset
  packingFraction: number; // Capital efficiency
  defects: string[]; // Concentration risks
}

// ML-based reactivity prediction
export interface ReactivityPrediction {
  assetPair: [string, string];
  reactivityScore: number; // 0-1
  predictedSynergy: number;
  confidence: number;
  explanation?: string;
}

// Time series phase analysis
export interface PhaseTimeSeries {
  timestamp: Date;
  phase: PortfolioPhase;
  marketConditions: MarketConditions;
  transitionProbabilities: Record<string, number>;
}

export interface MarketConditions {
  volatilityIndex: number;
  trendStrength: number;
  correlationRegime: 'normal' | 'stressed' | 'decorrelated';
  liquidityScore: number;
} 