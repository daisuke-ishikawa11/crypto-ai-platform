-- 🚀 暗号通貨AIプラットフォーム データベーススキーマ
-- 最新版 2025-07-19

-- 1. ユーザーテーブル
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'basic', 'pro', 'enterprise', 'startup')),
  stripe_customer_id TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  last_login TIMESTAMP WITH TIME ZONE,
  preferences JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected'))
);

-- 2. ユーザープロファイル
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  timezone TEXT DEFAULT 'Asia/Tokyo',
  language TEXT DEFAULT 'ja',
  investment_experience TEXT CHECK (investment_experience IN ('beginner', 'intermediate', 'advanced', 'expert')),
  risk_tolerance TEXT CHECK (risk_tolerance IN ('conservative', 'moderate', 'aggressive')),
  investment_goals TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. サブスクリプション
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'trialing', 'unpaid')),
  plan_id TEXT NOT NULL,
  current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 4. 請求書
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_invoice_id TEXT UNIQUE NOT NULL,
  amount_paid INTEGER NOT NULL,
  currency TEXT DEFAULT 'jpy',
  status TEXT NOT NULL CHECK (status IN ('draft', 'open', 'paid', 'uncollectible', 'void')),
  invoice_pdf TEXT,
  hosted_invoice_url TEXT,
  invoice_date TIMESTAMP WITH TIME ZONE NOT NULL,
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 5. 使用量統計
CREATE TABLE IF NOT EXISTS usage_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  feature_type TEXT NOT NULL,
  usage_count INTEGER DEFAULT 0,
  usage_date DATE DEFAULT CURRENT_DATE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, feature_type, usage_date)
);

-- 6. アラート
CREATE TABLE IF NOT EXISTS user_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('price_above', 'price_below', 'volume_spike', 'rsi_overbought', 'rsi_oversold', 'macd_bullish', 'macd_bearish', 'custom')),
  threshold_value DECIMAL,
  current_value DECIMAL,
  is_active BOOLEAN DEFAULT true,
  is_triggered BOOLEAN DEFAULT false,
  triggered_at TIMESTAMP WITH TIME ZONE,
  message TEXT,
  severity TEXT DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'critical')),
  notification_methods TEXT[] DEFAULT ARRAY['in_app'],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 7. アラート履歴
CREATE TABLE IF NOT EXISTS alert_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_id UUID REFERENCES user_alerts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  alert_type TEXT NOT NULL,
  threshold_value DECIMAL,
  triggered_value DECIMAL,
  message TEXT,
  severity TEXT NOT NULL,
  acknowledged BOOLEAN DEFAULT false,
  acknowledged_at TIMESTAMP WITH TIME ZONE,
  triggered_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 8. 学習進捗
CREATE TABLE IF NOT EXISTS user_lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  time_spent INTEGER DEFAULT 0, -- seconds
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- 9. クイズ回答履歴
CREATE TABLE IF NOT EXISTS user_quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  quiz_id TEXT NOT NULL,
  answers JSONB NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  is_passed BOOLEAN NOT NULL,
  attempt_number INTEGER DEFAULT 1,
  time_taken INTEGER, -- seconds
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 10. 実績・バッジ
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_type TEXT NOT NULL,
  achievement_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  badge_icon TEXT,
  points INTEGER DEFAULT 0,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- 11. 学習ストリーク
CREATE TABLE IF NOT EXISTS user_learning_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE DEFAULT CURRENT_DATE,
  streak_start_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- 12. ポートフォリオ
CREATE TABLE IF NOT EXISTS user_portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT DEFAULT 'メインポートフォリオ',
  is_default BOOLEAN DEFAULT true,
  total_value DECIMAL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 13. ポートフォリオ資産
CREATE TABLE IF NOT EXISTS portfolio_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES user_portfolios(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  amount DECIMAL NOT NULL CHECK (amount >= 0),
  average_cost DECIMAL DEFAULT 0,
  current_price DECIMAL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(portfolio_id, symbol)
);

-- 14. 市場データキャッシュ
CREATE TABLE IF NOT EXISTS market_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol TEXT NOT NULL,
  price DECIMAL NOT NULL,
  change_24h DECIMAL DEFAULT 0,
  change_percentage_24h DECIMAL DEFAULT 0,
  volume_24h DECIMAL DEFAULT 0,
  market_cap DECIMAL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(symbol)
);

-- 15. DeFiプロトコルダッシュボード
CREATE TABLE IF NOT EXISTS defi_protocols (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  protocol_name TEXT NOT NULL UNIQUE,
  protocol_type TEXT NOT NULL,
  chain TEXT NOT NULL,
  tvl DECIMAL DEFAULT 0,
  apr DECIMAL DEFAULT 0,
  risk_score INTEGER DEFAULT 50 CHECK (risk_score >= 0 AND risk_score <= 100),
  is_monitored BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 16. ユーザーDeFi監視設定
CREATE TABLE IF NOT EXISTS user_defi_monitoring (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  protocol_id UUID REFERENCES defi_protocols(id) ON DELETE CASCADE,
  alert_on_tvl_change BOOLEAN DEFAULT false,
  alert_on_apr_change BOOLEAN DEFAULT false,
  alert_on_risk_change BOOLEAN DEFAULT true,
  tvl_threshold_percentage DECIMAL DEFAULT 10,
  apr_threshold_percentage DECIMAL DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, protocol_id)
);

-- 17. AI分析履歴
CREATE TABLE IF NOT EXISTS ai_analysis_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  analysis_type TEXT NOT NULL,
  query TEXT NOT NULL,
  response_data JSONB NOT NULL,
  confidence_score DECIMAL DEFAULT 0,
  processing_time INTEGER DEFAULT 0, -- milliseconds
  model_used TEXT,
  tokens_used INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 18. リスクプロファイル
CREATE TABLE IF NOT EXISTS user_risk_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  risk_score INTEGER DEFAULT 50 CHECK (risk_score >= 0 AND risk_score <= 100),
  var_1d DECIMAL DEFAULT 0, -- Value at Risk 1日
  var_7d DECIMAL DEFAULT 0, -- Value at Risk 7日
  max_drawdown DECIMAL DEFAULT 0,
  sharpe_ratio DECIMAL DEFAULT 0,
  volatility DECIMAL DEFAULT 0,
  beta DECIMAL DEFAULT 1,
  calculated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- 19. 通知設定
CREATE TABLE IF NOT EXISTS user_notification_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  email_alerts BOOLEAN DEFAULT true,
  push_notifications BOOLEAN DEFAULT true,
  sms_alerts BOOLEAN DEFAULT false,
  in_app_notifications BOOLEAN DEFAULT true,
  webhook_url TEXT,
  alert_frequency TEXT DEFAULT 'immediate' CHECK (alert_frequency IN ('immediate', 'hourly', 'daily', 'weekly')),
  quiet_hours_start TIME,
  quiet_hours_end TIME,
  timezone TEXT DEFAULT 'Asia/Tokyo',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- 20. APIキー管理
CREATE TABLE IF NOT EXISTS user_api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  key_name TEXT NOT NULL,
  api_key_hash TEXT NOT NULL,
  permissions TEXT[] DEFAULT ARRAY['read'],
  is_active BOOLEAN DEFAULT true,
  last_used_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, key_name)
);

-- Row Level Security (RLS) ポリシー

-- ユーザーテーブルのRLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- ユーザープロファイルのRLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON user_profiles FOR ALL USING (auth.uid() = user_id);

-- サブスクリプションのRLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own subscriptions" ON subscriptions FOR SELECT USING (auth.uid() = user_id);

-- 請求書のRLS
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own invoices" ON invoices FOR SELECT USING (auth.uid() = user_id);

-- 使用量統計のRLS
ALTER TABLE usage_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own usage stats" ON usage_stats FOR ALL USING (auth.uid() = user_id);

-- アラートのRLS
ALTER TABLE user_alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own alerts" ON user_alerts FOR ALL USING (auth.uid() = user_id);

-- アラート履歴のRLS
ALTER TABLE alert_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own alert history" ON alert_history FOR SELECT USING (auth.uid() = user_id);

-- 学習進捗のRLS
ALTER TABLE user_lesson_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own progress" ON user_lesson_progress FOR ALL USING (auth.uid() = user_id);

-- クイズ回答履歴のRLS
ALTER TABLE user_quiz_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own quiz attempts" ON user_quiz_attempts FOR ALL USING (auth.uid() = user_id);

-- 実績・バッジのRLS
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own achievements" ON user_achievements FOR ALL USING (auth.uid() = user_id);

-- 学習ストリークのRLS
ALTER TABLE user_learning_streaks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own streaks" ON user_learning_streaks FOR ALL USING (auth.uid() = user_id);

-- ポートフォリオのRLS
ALTER TABLE user_portfolios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own portfolios" ON user_portfolios FOR ALL USING (auth.uid() = user_id);

-- ポートフォリオ資産のRLS
ALTER TABLE portfolio_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own portfolio assets" ON portfolio_assets FOR ALL USING (auth.uid() = user_id);

-- 市場データは全ユーザーが読み取り可能
ALTER TABLE market_data ENABLE ROW LEVEL SECURITY;
CREATE POLICY "All users can read market data" ON market_data FOR SELECT TO authenticated USING (true);

-- DeFiプロトコルは全ユーザーが読み取り可能
ALTER TABLE defi_protocols ENABLE ROW LEVEL SECURITY;
CREATE POLICY "All users can read defi protocols" ON defi_protocols FOR SELECT TO authenticated USING (true);

-- ユーザーDeFi監視設定のRLS
ALTER TABLE user_defi_monitoring ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own defi monitoring" ON user_defi_monitoring FOR ALL USING (auth.uid() = user_id);

-- AI分析履歴のRLS
ALTER TABLE ai_analysis_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own ai analysis" ON ai_analysis_history FOR ALL USING (auth.uid() = user_id);

-- リスクプロファイルのRLS
ALTER TABLE user_risk_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own risk profile" ON user_risk_profiles FOR ALL USING (auth.uid() = user_id);

-- 通知設定のRLS
ALTER TABLE user_notification_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own notification settings" ON user_notification_settings FOR ALL USING (auth.uid() = user_id);

-- APIキー管理のRLS
ALTER TABLE user_api_keys ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own api keys" ON user_api_keys FOR ALL USING (auth.uid() = user_id);

-- インデックス作成
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer_id ON users(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_user_alerts_user_id ON user_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_alerts_symbol ON user_alerts(symbol);
CREATE INDEX IF NOT EXISTS idx_user_alerts_is_active ON user_alerts(is_active);
CREATE INDEX IF NOT EXISTS idx_alert_history_user_id ON alert_history(user_id);
CREATE INDEX IF NOT EXISTS idx_alert_history_triggered_at ON alert_history(triggered_at);
CREATE INDEX IF NOT EXISTS idx_user_lesson_progress_user_id ON user_lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_lesson_progress_lesson_id ON user_lesson_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_assets_portfolio_id ON portfolio_assets(portfolio_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_assets_symbol ON portfolio_assets(symbol);
CREATE INDEX IF NOT EXISTS idx_market_data_symbol ON market_data(symbol);
CREATE INDEX IF NOT EXISTS idx_market_data_updated_at ON market_data(updated_at);
CREATE INDEX IF NOT EXISTS idx_defi_protocols_protocol_name ON defi_protocols(protocol_name);
CREATE INDEX IF NOT EXISTS idx_ai_analysis_history_user_id ON ai_analysis_history(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_analysis_history_created_at ON ai_analysis_history(created_at);

-- 関数: ユーザー作成時の初期データ作成
CREATE OR REPLACE FUNCTION initialize_user_data()
RETURNS TRIGGER AS $$
BEGIN
  -- ユーザープロファイル作成
  INSERT INTO user_profiles (user_id, display_name)
  VALUES (NEW.id, NEW.name);
  
  -- デフォルトポートフォリオ作成
  INSERT INTO user_portfolios (user_id, name, is_default)
  VALUES (NEW.id, 'メインポートフォリオ', true);
  
  -- 学習ストリーク初期化
  INSERT INTO user_learning_streaks (user_id)
  VALUES (NEW.id);
  
  -- 通知設定初期化
  INSERT INTO user_notification_settings (user_id)
  VALUES (NEW.id);
  
  -- リスクプロファイル初期化
  INSERT INTO user_risk_profiles (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- トリガー: ユーザー作成時の初期データ作成
CREATE OR REPLACE TRIGGER on_user_created
  AFTER INSERT ON users
  FOR EACH ROW EXECUTE FUNCTION initialize_user_data();

-- 関数: 更新日時自動更新
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 更新日時自動更新トリガー
CREATE OR REPLACE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE OR REPLACE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE OR REPLACE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE OR REPLACE TRIGGER update_user_alerts_updated_at BEFORE UPDATE ON user_alerts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE OR REPLACE TRIGGER update_user_lesson_progress_updated_at BEFORE UPDATE ON user_lesson_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE OR REPLACE TRIGGER update_user_portfolios_updated_at BEFORE UPDATE ON user_portfolios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE OR REPLACE TRIGGER update_portfolio_assets_updated_at BEFORE UPDATE ON portfolio_assets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE OR REPLACE TRIGGER update_defi_protocols_updated_at BEFORE UPDATE ON defi_protocols FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE OR REPLACE TRIGGER update_user_learning_streaks_updated_at BEFORE UPDATE ON user_learning_streaks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE OR REPLACE TRIGGER update_user_notification_settings_updated_at BEFORE UPDATE ON user_notification_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- データベースのコメント
COMMENT ON TABLE users IS 'ユーザー基本情報';
COMMENT ON TABLE user_profiles IS 'ユーザープロファイル詳細';
COMMENT ON TABLE subscriptions IS 'サブスクリプション管理';
COMMENT ON TABLE invoices IS '請求書・決済履歴';
COMMENT ON TABLE usage_stats IS '機能使用量統計';
COMMENT ON TABLE user_alerts IS 'ユーザーアラート設定';
COMMENT ON TABLE alert_history IS 'アラート発火履歴';
COMMENT ON TABLE user_lesson_progress IS '学習進捗管理';
COMMENT ON TABLE user_quiz_attempts IS 'クイズ回答履歴';
COMMENT ON TABLE user_achievements IS '実績・バッジ管理';
COMMENT ON TABLE user_learning_streaks IS '学習ストリーク管理';
COMMENT ON TABLE user_portfolios IS 'ポートフォリオ管理';
COMMENT ON TABLE portfolio_assets IS 'ポートフォリオ資産構成';
COMMENT ON TABLE market_data IS '市場データキャッシュ';
COMMENT ON TABLE defi_protocols IS 'DeFiプロトコル情報';
COMMENT ON TABLE user_defi_monitoring IS 'ユーザーDeFi監視設定';
COMMENT ON TABLE ai_analysis_history IS 'AI分析履歴';
COMMENT ON TABLE user_risk_profiles IS 'ユーザーリスクプロファイル';
COMMENT ON TABLE user_notification_settings IS '通知設定';
COMMENT ON TABLE user_api_keys IS 'APIキー管理';