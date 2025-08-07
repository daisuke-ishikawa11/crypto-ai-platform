-- Risk management tables

-- Risk profiles
CREATE TABLE IF NOT EXISTS risk_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  risk_tolerance TEXT NOT NULL CHECK (risk_tolerance IN ('conservative', 'moderate', 'aggressive')),
  max_portfolio_risk DECIMAL NOT NULL DEFAULT 60,
  max_position_size DECIMAL NOT NULL DEFAULT 25,
  stop_loss_percentage DECIMAL NOT NULL DEFAULT 10,
  take_profit_percentage DECIMAL NOT NULL DEFAULT 30,
  preferred_assets TEXT[] DEFAULT '{}',
  excluded_assets TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Portfolio risk metrics history
CREATE TABLE IF NOT EXISTS portfolio_risk_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
  metrics_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Risk alerts
CREATE TABLE IF NOT EXISTS risk_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
  asset_id TEXT,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('portfolio_risk', 'asset_risk', 'market_risk', 'concentration', 'drawdown')),
  severity TEXT NOT NULL CHECK (severity IN ('info', 'warning', 'critical')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  triggered_at TIMESTAMPTZ DEFAULT NOW(),
  acknowledged BOOLEAN DEFAULT FALSE,
  action_taken TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Risk reports
CREATE TABLE IF NOT EXISTS risk_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id TEXT NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
  period_start TIMESTAMPTZ NOT NULL,
  period_end TIMESTAMPTZ NOT NULL,
  report_data JSONB NOT NULL,
  generated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_risk_profiles_user_id ON risk_profiles(user_id);
CREATE INDEX idx_portfolio_risk_metrics_portfolio_id ON portfolio_risk_metrics(portfolio_id);
CREATE INDEX idx_portfolio_risk_metrics_created_at ON portfolio_risk_metrics(created_at DESC);
CREATE INDEX idx_risk_alerts_user_id ON risk_alerts(user_id);
CREATE INDEX idx_risk_alerts_portfolio_id ON risk_alerts(portfolio_id);
CREATE INDEX idx_risk_alerts_acknowledged ON risk_alerts(acknowledged);
CREATE INDEX idx_risk_reports_user_id ON risk_reports(user_id);
CREATE INDEX idx_risk_reports_portfolio_id ON risk_reports(portfolio_id);

-- RLS policies
ALTER TABLE risk_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_risk_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_reports ENABLE ROW LEVEL SECURITY;

-- Risk profiles policies
CREATE POLICY "Users can view own risk profile" 
  ON risk_profiles FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own risk profile" 
  ON risk_profiles FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own risk profile" 
  ON risk_profiles FOR UPDATE 
  USING (auth.uid() = user_id);

-- Portfolio risk metrics policies
CREATE POLICY "Users can view own portfolio metrics" 
  ON portfolio_risk_metrics FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM portfolios 
      WHERE portfolios.id = portfolio_risk_metrics.portfolio_id 
      AND portfolios.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create metrics for own portfolios" 
  ON portfolio_risk_metrics FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM portfolios 
      WHERE portfolios.id = portfolio_id 
      AND portfolios.user_id = auth.uid()
    )
  );

-- Risk alerts policies
CREATE POLICY "Users can view own alerts" 
  ON risk_alerts FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own alerts" 
  ON risk_alerts FOR UPDATE 
  USING (auth.uid() = user_id);

-- Risk reports policies
CREATE POLICY "Users can view own reports" 
  ON risk_reports FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own reports" 
  ON risk_reports FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Trigger to update risk_profiles updated_at
CREATE OR REPLACE FUNCTION update_risk_profile_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_risk_profile_updated_at
  BEFORE UPDATE ON risk_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_risk_profile_updated_at(); 