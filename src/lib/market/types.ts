// Market data types for cryptocurrency analysis

export interface MarketData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
  sparkline_in_7d?: {
    price: number[];
  };
  price_change_percentage_1h_in_currency?: number;
  price_change_percentage_7d_in_currency?: number;
  price_change_percentage_30d_in_currency?: number;
}

export interface MarketChart {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface TechnicalIndicators {
  rsi: number;
  macd: {
    value: number;
    signal: number;
    histogram: number;
  };
  bollinger_bands: {
    upper: number;
    middle: number;
    lower: number;
  };
  moving_averages: {
    sma_20: number;
    sma_50: number;
    sma_200: number;
    ema_12: number;
    ema_26: number;
  };
  volume_profile: {
    buy_volume: number;
    sell_volume: number;
    volume_ratio: number;
  };
}

export interface MarketSentiment {
  fear_greed_index: number;
  social_mentions: number;
  social_sentiment: 'bullish' | 'bearish' | 'neutral';
  news_sentiment: number;
  whale_activity: {
    large_transactions: number;
    whale_accumulation: boolean;
  };
}

export interface MarketAnalysis {
  coin_id: string;
  timestamp: Date;
  market_data: MarketData;
  technical_indicators: TechnicalIndicators;
  sentiment: MarketSentiment;
  ai_insights: {
    trend: 'bullish' | 'bearish' | 'neutral';
    confidence: number;
    key_factors: string[];
    risk_level: 'low' | 'medium' | 'high';
    recommendation: string;
  };
}

export interface MarketAlert {
  id: string;
  coin_id: string;
  type: 'price' | 'volume' | 'technical' | 'sentiment';
  condition: string;
  threshold: number;
  current_value: number;
  triggered_at?: Date;
  status: 'active' | 'triggered' | 'cancelled';
}

export interface PortfolioAnalytics {
  total_value: number;
  total_cost: number;
  total_profit_loss: number;
  profit_loss_percentage: number;
  best_performer: {
    coin_id: string;
    profit_percentage: number;
  };
  worst_performer: {
    coin_id: string;
    loss_percentage: number;
  };
  risk_metrics: {
    volatility: number;
    sharpe_ratio: number;
    max_drawdown: number;
  };
} 