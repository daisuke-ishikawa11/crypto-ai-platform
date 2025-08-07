// Explainable AI types

export type PredictionType = 
  | 'market_analysis' 
  | 'risk_assessment' 
  | 'portfolio_optimization' 
  | 'trading_signal';

export type StepType = 
  | 'data_collection' 
  | 'preprocessing' 
  | 'feature_extraction' 
  | 'analysis' 
  | 'inference' 
  | 'validation';

export type FeatureCategory = 
  | 'technical' 
  | 'fundamental' 
  | 'sentiment' 
  | 'macro' 
  | 'portfolio' 
  | 'risk';

export type ContributionDirection = 'positive' | 'negative' | 'neutral';

// Data types for various features
export type FeatureValue = string | number | boolean | Record<string, unknown> | unknown[];
// Chart types for visualizations
export interface ChartData {
  labels: string[] | number[];
  datasets: Array<{
    label: string;
    data: number[];
    type?: string;
    borderColor?: string;
    backgroundColor?: string | string[];
    fill?: boolean;
    borderDash?: number[];
    yAxisID?: string;
    [key: string]: ChartValue;
  }>;
}

export type ChartValue = string | number | boolean | number[] | string[] | undefined;

export interface VisualizationOptions {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  plugins?: {
    legend?: { display: boolean };
    title?: { display: boolean; text: string };
  };
  scales?: Record<string, {
    type?: string;
    position?: string;
    min?: number;
    max?: number;
  }>;
  [key: string]: unknown;
}

export interface AIPrediction {
  id: string;
  userId: string;
  predictionType: PredictionType;
  assetSymbol?: string;
  portfolioId?: string;
  
  // Prediction details
  prediction: {
    value: number | string | boolean;
    label?: string;
    metadata?: Record<string, FeatureValue>;
  };
  confidence: number;
  timeHorizon?: string;
  
  // Reasoning and explanation
  reasoning: {
    summary: string;
    mainFactors: string[];
    confidenceBreakdown: Record<string, number>;
  };
  keyFactors: Array<{
    factor: string;
    impact: number;
    description: string;
  }>;
  supportingData: Record<string, FeatureValue>;
  
  // Model information
  modelName: string;
  modelVersion?: string;
  modelParameters?: Record<string, string | number | boolean>;
  
  // Visualization data
  visualizationData?: {
    charts?: Array<{
      type: string;
      data: ChartData;
      config: VisualizationOptions;
    }>;
    insights?: string[];
  };
  
  createdAt: string;
  updatedAt: string;
}

export interface ReasoningStep {
  id: string;
  predictionId: string;
  stepOrder: number;
  stepType: StepType;
  
  description: string;
  inputData?: Record<string, FeatureValue>;
  outputData?: Record<string, FeatureValue>;
  confidence?: number;
  impactWeight?: number;
  
  explanation?: string;
  visualizationType?: string;
  visualizationConfig?: VisualizationOptions;
  
  createdAt: string;
}

export interface FeatureImportance {
  id: string;
  predictionId: string;
  featureName: string;
  featureCategory?: FeatureCategory;
  
  importanceScore: number;
  contributionDirection?: ContributionDirection;
  
  currentValue?: FeatureValue;
  historicalValues?: FeatureValue[];
  thresholdValues?: {
    min?: number;
    max?: number;
    optimal?: number;
  };
  
  explanation?: string;
  createdAt: string;
}

export interface Counterfactual {
  id: string;
  predictionId: string;
  
  scenarioDescription: string;
  changedFeatures: Record<string, {
    from: FeatureValue;
    to: FeatureValue;
    changeRequired: string;
  }>;
  
  alternativePrediction: {
    value: FeatureValue;
    confidence: number;
    improvement?: number;
  };
  confidenceChange?: number;
  
  feasibilityScore?: number;
  requiredActions?: Array<{
    action: string;
    difficulty: 'easy' | 'medium' | 'hard';
    timeframe?: string;
  }>;
  
  createdAt: string;
}

export interface PredictionFeedback {
  id: string;
  predictionId: string;
  userId: string;
  
  accuracyRating?: number;
  explanationClarity?: number;
  usefulnessRating?: number;
  
  feedbackText?: string;
  confusionPoints?: string[];
  helpfulAspects?: string[];
  
  actualOutcome?: FeatureValue;
  outcomeMatched?: boolean;
  
  createdAt: string;
}

// Analysis request types
export interface ExplainableAnalysisRequest {
  type: PredictionType;
  assetSymbol?: string;
  portfolioId?: string;
  timeHorizon?: string;
  parameters?: Record<string, string | number | boolean>;
}

// Visualization types
export interface VisualizationConfig {
  type: 'line' | 'bar' | 'pie' | 'scatter' | 'heatmap' | 'treemap' | 'sankey';
  title?: string;
  description?: string;
  data: ChartData;
  options?: VisualizationOptions;
  config?: VisualizationOptions; // Make config optional for compatibility
}

// Helper types for feature analysis
export interface FeatureAnalysis {
  features: FeatureImportance[];
  topFactors: string[];
  visualizations: VisualizationConfig[];
}

// Explanation quality metrics
export interface ExplanationQuality {
  completeness: number; // 0-1
  clarity: number; // 0-1
  accuracy: number; // 0-1
  usefulness: number; // 0-1
} 