-- Market analysis tables

-- Market analysis history
CREATE TABLE IF NOT EXISTS market_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  coin_id TEXT NOT NULL,
  analysis_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_market_analysis_user_id ON market_analysis(user_id);
CREATE INDEX idx_market_analysis_coin_id ON market_analysis(coin_id);
CREATE INDEX idx_market_analysis_created_at ON market_analysis(created_at DESC);

-- RLS policies
ALTER TABLE market_analysis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own market analysis" 
  ON market_analysis FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own market analysis" 
  ON market_analysis FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Market alerts
CREATE TABLE IF NOT EXISTS market_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  coin_id TEXT NOT NULL,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('price', 'volume', 'technical', 'sentiment')),
  condition TEXT NOT NULL,
  threshold DECIMAL NOT NULL,
  current_value DECIMAL,
  triggered_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'triggered', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_market_alerts_user_id ON market_alerts(user_id);
CREATE INDEX idx_market_alerts_status ON market_alerts(status);
CREATE INDEX idx_market_alerts_coin_id ON market_alerts(coin_id);

-- RLS policies for market alerts
ALTER TABLE market_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own alerts" 
  ON market_alerts FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own alerts" 
  ON market_alerts FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own alerts" 
  ON market_alerts FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own alerts" 
  ON market_alerts FOR DELETE 
  USING (auth.uid() = user_id);

-- Add market analysis limit to plan_limits
ALTER TABLE plan_limits ADD COLUMN IF NOT EXISTS market_analysis_limit INTEGER DEFAULT 10;

-- Update plan limits
UPDATE plan_limits SET market_analysis_limit = 10 WHERE plan_id = 'free';
UPDATE plan_limits SET market_analysis_limit = 100 WHERE plan_id = 'pro';
UPDATE plan_limits SET market_analysis_limit = -1 WHERE plan_id = 'enterprise'; -- -1 means unlimited

-- Function to increment usage for market analysis
CREATE OR REPLACE FUNCTION increment_usage(user_id_param UUID, date_param DATE)
RETURNS VOID AS $$
BEGIN
  INSERT INTO usage_tracking (user_id, date, api_calls_count)
  VALUES (user_id_param, date_param, 1)
  ON CONFLICT (user_id, date)
  DO UPDATE SET api_calls_count = usage_tracking.api_calls_count + 1;
END;
$$ LANGUAGE plpgsql; 