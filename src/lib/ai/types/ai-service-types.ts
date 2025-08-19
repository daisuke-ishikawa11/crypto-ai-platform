// AI Service共通型定義

export interface Portfolio {
  assets: Array<{
    symbol: string;
    amount: number;
    currentPrice: number;
    value: number;
    allocation: number;
  }>;
  totalValue: number;
}

export interface UserPreferences {
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  investmentHorizon: 'short' | 'medium' | 'long';
  tradingStrategy?: 'hodl' | 'swing' | 'scalping' | 'arbitrage';
}

export interface MarketContext {
  fearGreedIndex?: number;
  volatilityIndex?: number;
  marketTrend?: 'bull' | 'bear' | 'sideways';
  news?: string[];
}

export interface TechnicalSignal {
  symbol: string;
  signal: 'buy' | 'sell' | 'hold';
  strength: number;
  indicators: Record<string, number | string>;
}

export interface TradingSignal {
  symbol: string;
  action: 'buy' | 'sell' | 'hold';
  confidence: number;
  entryPrice: number;
  exitTargets: number[];
  stopLoss: number;
  timeframe: string;
  reasoning: string;
}

export interface PriceTarget {
  short: number;
  medium: number;
  long: number;
  confidence: number;
}

export interface RiskMetrics {
  portfolioVar: number;
  maxDrawdown: number;
  correlationRisk: number;
  liquidityRisk: number;
}

export interface OptimizationSuggestion {
  action: string;
  symbol: string;
  reasoning: string;
  priority: number;
}

export interface RebalanceRecommendation {
  symbol: string;
  currentAllocation: number;
  recommendedAllocation: number;
  action: 'buy' | 'sell' | 'hold';
  amount: number;
}

export interface BaseAnalysisRequest {
  userId: string;
  symbols: string[];
  timeframe: '1h' | '4h' | '1d' | '7d' | '30d';
  preferences: UserPreferences;
  marketContext: MarketContext;
}

export interface MarketAnalysisRequest extends BaseAnalysisRequest {
  analysisDepth?: 'basic' | 'detailed' | 'comprehensive';
}

export interface PortfolioAnalysisRequest extends BaseAnalysisRequest {
  portfolio: Portfolio;
}

export interface TradingSignalRequest extends BaseAnalysisRequest {
  tradingStrategy: 'hodl' | 'swing' | 'scalping' | 'arbitrage';
  riskBudget: number;
}

export interface RiskAnalysisRequest extends BaseAnalysisRequest {
  portfolio?: Portfolio;
  riskParameters?: {
    confidenceLevel?: number;
    timeHorizon?: number;
  };
}