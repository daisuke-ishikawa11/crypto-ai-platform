// Risk management types

export interface PortfolioHolding {
  asset_id: string;
  symbol: string;
  amount: number;
  current_price: number;
  value_usd: number;
  percentage: number;
  weight: number;    // Portfolio weight (0-1)
  value: number;     // Current value
  entry_price?: number;
  entry_date?: Date;
}

export interface RiskProfile {
  user_id: string;
  risk_tolerance: 'conservative' | 'moderate' | 'aggressive';
  max_portfolio_risk: number; // Percentage (0-100)
  max_position_size: number; // Percentage of portfolio
  stop_loss_percentage: number; // Default stop loss %
  take_profit_percentage: number; // Default take profit %
  preferred_assets: string[]; // List of preferred coin IDs
  excluded_assets: string[]; // List of excluded coin IDs
  created_at: Date;
  updated_at: Date;
}

export interface PortfolioRiskMetrics {
  portfolio_id: string;
  total_risk_score: number; // 0-100
  volatility: number; // Standard deviation
  sharpe_ratio: number;
  sortino_ratio: number;
  max_drawdown: number;
  value_at_risk: number; // VaR at 95% confidence
  conditional_value_at_risk: number; // CVaR
  beta: number; // Market correlation
  concentration_risk: number; // Herfindahl index
  correlation_matrix: Record<string, Record<string, number>>;
  updated_at: Date;
}

export interface AssetRiskScore {
  asset_id: string;
  symbol: string;
  risk_score: number; // 0-100
  volatility_30d: number;
  volatility_90d: number;
  liquidity_score: number; // 0-100
  market_cap_rank: number;
  correlation_with_btc: number;
  downside_risk: number;
  risk_factors: RiskFactor[];
}

export interface RiskFactor {
  type: 'volatility' | 'liquidity' | 'regulatory' | 'technical' | 'market' | 'concentration';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  impact_score: number; // 0-100
  mitigation_advice?: string;
}

export interface RiskAlert {
  id: string;
  user_id: string;
  portfolio_id?: string;
  asset_id?: string;
  alert_type: 'portfolio_risk' | 'asset_risk' | 'market_risk' | 'concentration' | 'drawdown';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  triggered_at: Date;
  acknowledged: boolean;
  action_taken?: string;
}

export interface RiskMitigation {
  portfolio_id: string;
  recommendations: MitigationRecommendation[];
  current_risk_score: number;
  projected_risk_score: number;
  generated_at: Date;
}

export interface MitigationRecommendation {
  id: string;
  type: string;  // Risk typeプロパティを追加
  risk_type: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  risk_reduction: number;
  specific_actions: SpecificAction[];
  estimated_cost: number;
  implementation_time: string;
  success_probability: number;
}

export interface SpecificAction {
  id: string;
  action: string;  // actionプロパティを追加
  action_type: string;
  description: string;
  target_value: number;
  current_value: number;
  recommended_value?: number;  // recommended_valueプロパティを追加
  reason?: string;  // reasonプロパティを追加
  deadline?: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface MarketRiskIndicators {
  timestamp: Date;
  overall_market_risk: 'low' | 'medium' | 'high' | 'extreme';
  volatility_index: number; // Crypto VIX equivalent
  fear_greed_index: number;
  correlation_breakdown: boolean; // Are correlations breaking down?
  liquidity_concerns: boolean;
  macro_risk_factors: MacroRiskFactor[];
}

export interface MacroRiskFactor {
  name: string;
  category: 'regulatory' | 'economic' | 'geopolitical' | 'technological';
  impact: 'positive' | 'negative' | 'neutral';
  severity: number; // 0-100
  description: string;
}

export interface PositionSizing {
  asset_id: string;
  current_position: number;
  recommended_position: number;
  max_position: number;
  kelly_criterion: number; // Kelly criterion suggestion
  risk_adjusted_size: number;
  reasoning: string[];
}

export interface StopLossRecommendation {
  asset_id: string;
  current_price: number;
  stop_loss_price: number;
  stop_loss_percentage: number;
  atr_based_stop: number; // Based on Average True Range
  support_level_stop: number; // Based on technical support
  risk_amount: number; // Amount at risk
  probability_of_hit: number; // Probability of hitting stop loss
}

export interface RiskReport {
  report_id: string;
  user_id: string;
  portfolio_id: string;
  period_start: Date;
  period_end: Date;
  summary: {
    average_risk_score: number;
    max_risk_score: number;
    min_risk_score: number;
    risk_adjusted_return: number;
    total_alerts: number;
    actions_taken: number;
  };
  detailed_analysis: {
    risk_evolution: Array<{ date: Date; risk_score: number }>;
    major_risk_events: RiskAlert[];
    mitigation_effectiveness: number;
    recommendations_followed: number;
  };
  generated_at: Date;
}