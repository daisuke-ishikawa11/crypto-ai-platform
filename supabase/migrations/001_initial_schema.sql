-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create user plans enum
CREATE TYPE user_plan AS ENUM ('free', 'mini', 'basic', 'standard', 'pro');

-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  plan user_plan DEFAULT 'free' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create AI chats table
CREATE TABLE ai_chats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  model TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create AI messages table
CREATE TABLE ai_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chat_id UUID NOT NULL REFERENCES ai_chats(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('user', 'assistant', 'system')) NOT NULL,
  content TEXT NOT NULL,
  tokens_used INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create market data table
CREATE TABLE market_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  symbol TEXT NOT NULL,
  price DECIMAL(20, 8) NOT NULL,
  volume_24h DECIMAL(20, 8) NOT NULL,
  market_cap DECIMAL(20, 8) NOT NULL,
  price_change_24h DECIMAL(10, 4) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create portfolios table
CREATE TABLE portfolios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  total_value DECIMAL(20, 8) DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create portfolio holdings table
CREATE TABLE portfolio_holdings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  amount DECIMAL(20, 8) NOT NULL,
  average_price DECIMAL(20, 8) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(portfolio_id, symbol)
);

-- Create usage tracking table
CREATE TABLE usage_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  feature TEXT NOT NULL,
  usage_count INTEGER DEFAULT 0 NOT NULL,
  usage_date DATE DEFAULT CURRENT_DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, feature, usage_date)
);

-- Create AI models configuration table
CREATE TABLE ai_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  provider TEXT NOT NULL,
  model_id TEXT NOT NULL,
  description TEXT,
  cost_per_1k_tokens DECIMAL(10, 6),
  max_tokens INTEGER,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create plan limits table
CREATE TABLE plan_limits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  plan user_plan NOT NULL,
  feature TEXT NOT NULL,
  daily_limit INTEGER,
  monthly_limit INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(plan, feature)
);

-- Create indexes for performance
CREATE INDEX idx_ai_chats_user_id ON ai_chats(user_id);
CREATE INDEX idx_ai_messages_chat_id ON ai_messages(chat_id);
CREATE INDEX idx_market_data_symbol ON market_data(symbol);
CREATE INDEX idx_market_data_created_at ON market_data(created_at DESC);
CREATE INDEX idx_portfolios_user_id ON portfolios(user_id);
CREATE INDEX idx_portfolio_holdings_portfolio_id ON portfolio_holdings(portfolio_id);
CREATE INDEX idx_usage_tracking_user_date ON usage_tracking(user_id, usage_date);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_chats_updated_at BEFORE UPDATE ON ai_chats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolios_updated_at BEFORE UPDATE ON portfolios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_holdings_updated_at BEFORE UPDATE ON portfolio_holdings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_models_updated_at BEFORE UPDATE ON ai_models
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default AI models
INSERT INTO ai_models (name, provider, model_id, description, cost_per_1k_tokens, max_tokens) VALUES
  ('GPT-4 Turbo', 'openai', 'gpt-4-turbo-preview', 'Advanced reasoning and analysis', 0.01, 128000),
  ('GPT-3.5 Turbo', 'openai', 'gpt-3.5-turbo', 'Fast and cost-effective', 0.0005, 16385),
  ('Claude 3 Opus', 'anthropic', 'claude-3-opus-20240229', 'Best Claude model for complex tasks', 0.015, 200000),
  ('Claude 3 Sonnet', 'anthropic', 'claude-3-sonnet-20240229', 'Balanced performance and cost', 0.003, 200000),
  ('Claude 3 Haiku', 'anthropic', 'claude-3-haiku-20240307', 'Fast and affordable', 0.00025, 200000);

-- Insert default plan limits
INSERT INTO plan_limits (plan, feature, daily_limit, monthly_limit) VALUES
  -- Free plan
  ('free', 'ai_chats', 5, 50),
  ('free', 'portfolio_analysis', 1, 10),
  ('free', 'market_insights', 3, 30),
  -- Mini plan
  ('mini', 'ai_chats', 20, 300),
  ('mini', 'portfolio_analysis', 5, 50),
  ('mini', 'market_insights', 10, 150),
  -- Basic plan
  ('basic', 'ai_chats', 50, 1000),
  ('basic', 'portfolio_analysis', 10, 200),
  ('basic', 'market_insights', 30, 500),
  -- Standard plan
  ('standard', 'ai_chats', 200, 5000),
  ('standard', 'portfolio_analysis', 50, 1000),
  ('standard', 'market_insights', 100, 2000),
  -- Pro plan (unlimited = NULL)
  ('pro', 'ai_chats', NULL, NULL),
  ('pro', 'portfolio_analysis', NULL, NULL),
  ('pro', 'market_insights', NULL, NULL);

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_tracking ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- AI chats policies
CREATE POLICY "Users can view own chats" ON ai_chats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own chats" ON ai_chats
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own chats" ON ai_chats
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own chats" ON ai_chats
  FOR DELETE USING (auth.uid() = user_id);

-- AI messages policies
CREATE POLICY "Users can view messages from own chats" ON ai_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM ai_chats
      WHERE ai_chats.id = ai_messages.chat_id
      AND ai_chats.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create messages in own chats" ON ai_messages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM ai_chats
      WHERE ai_chats.id = ai_messages.chat_id
      AND ai_chats.user_id = auth.uid()
    )
  );

-- Portfolios policies
CREATE POLICY "Users can view own portfolios" ON portfolios
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own portfolios" ON portfolios
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own portfolios" ON portfolios
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own portfolios" ON portfolios
  FOR DELETE USING (auth.uid() = user_id);

-- Portfolio holdings policies
CREATE POLICY "Users can view holdings from own portfolios" ON portfolio_holdings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = portfolio_holdings.portfolio_id
      AND portfolios.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage holdings in own portfolios" ON portfolio_holdings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = portfolio_holdings.portfolio_id
      AND portfolios.user_id = auth.uid()
    )
  );

-- Usage tracking policies
CREATE POLICY "Users can view own usage" ON usage_tracking
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage usage tracking" ON usage_tracking
  FOR ALL USING (true);

-- Public read access for certain tables
CREATE POLICY "Anyone can view market data" ON market_data
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view AI models" ON ai_models
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view plan limits" ON plan_limits
  FOR SELECT USING (true); 