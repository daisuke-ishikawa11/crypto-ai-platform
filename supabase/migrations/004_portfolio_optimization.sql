-- Portfolio optimization tables

-- Portfolios table
CREATE TABLE IF NOT EXISTS portfolios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  assets TEXT[] NOT NULL,
  weights JSONB NOT NULL,
  optimization_method TEXT,
  phase TEXT,
  stability_score DECIMAL,
  compatibility_score DECIMAL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio performance tracking
CREATE TABLE IF NOT EXISTS portfolio_performance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  total_value DECIMAL NOT NULL,
  daily_return DECIMAL,
  volatility DECIMAL,
  sharpe_ratio DECIMAL,
  phase TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Asset compatibility cache
CREATE TABLE IF NOT EXISTS asset_compatibility (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  asset1 TEXT NOT NULL,
  asset2 TEXT NOT NULL,
  compatibility_score DECIMAL NOT NULL,
  correlation DECIMAL,
  synergy_factor DECIMAL,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(asset1, asset2)
);

-- Phase transition history
CREATE TABLE IF NOT EXISTS phase_transitions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
  from_phase TEXT NOT NULL,
  to_phase TEXT NOT NULL,
  trigger_condition TEXT,
  market_conditions JSONB,
  occurred_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Optimization history
CREATE TABLE IF NOT EXISTS optimization_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  input_assets TEXT[] NOT NULL,
  parameters JSONB NOT NULL,
  result_portfolio_id UUID REFERENCES portfolios(id),
  optimization_score DECIMAL,
  execution_time_ms INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_portfolios_user_id ON portfolios(user_id);
CREATE INDEX idx_portfolios_created_at ON portfolios(created_at DESC);
CREATE INDEX idx_portfolio_performance_portfolio_id ON portfolio_performance(portfolio_id);
CREATE INDEX idx_portfolio_performance_timestamp ON portfolio_performance(timestamp DESC);
CREATE INDEX idx_asset_compatibility_assets ON asset_compatibility(asset1, asset2);
CREATE INDEX idx_phase_transitions_portfolio_id ON phase_transitions(portfolio_id);
CREATE INDEX idx_optimization_history_user_id ON optimization_history(user_id);

-- Row Level Security
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE phase_transitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE optimization_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own portfolios" ON portfolios
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own portfolios" ON portfolios
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own portfolios" ON portfolios
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own portfolios" ON portfolios
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view performance of own portfolios" ON portfolio_performance
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM portfolios 
      WHERE portfolios.id = portfolio_performance.portfolio_id 
      AND portfolios.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view transitions of own portfolios" ON phase_transitions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM portfolios 
      WHERE portfolios.id = phase_transitions.portfolio_id 
      AND portfolios.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own optimization history" ON optimization_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create optimization history" ON optimization_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to update portfolio timestamp
CREATE OR REPLACE FUNCTION update_portfolio_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for portfolio updates
CREATE TRIGGER update_portfolios_timestamp
  BEFORE UPDATE ON portfolios
  FOR EACH ROW
  EXECUTE PROCEDURE update_portfolio_timestamp(); 