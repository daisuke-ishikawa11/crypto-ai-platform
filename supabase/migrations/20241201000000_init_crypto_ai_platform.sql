-- 🚀 暗号通貨AIプラットフォーム - 初期データベーススキーマ
-- CHECK制約・RLS・認証システムの包括的実装

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ===================================
-- 1. ユーザープロファイル管理
-- ===================================

-- ユーザープロファイルテーブル
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'user',
    subscription_status TEXT NOT NULL DEFAULT 'trial',
    subscription_tier TEXT NOT NULL DEFAULT 'basic',
    stripe_customer_id TEXT UNIQUE,
    stripe_subscription_id TEXT UNIQUE,
    trial_ends_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_active_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- CHECK制約
    CONSTRAINT valid_role CHECK (role IN ('user', 'admin', 'premium')),
    CONSTRAINT valid_subscription_status CHECK (subscription_status IN ('active', 'inactive', 'trial', 'cancelled', 'past_due')),
    CONSTRAINT valid_subscription_tier CHECK (subscription_tier IN ('basic', 'pro', 'enterprise')),
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT trial_ends_at_future CHECK (trial_ends_at > created_at)
);

-- ユーザー設定テーブル
CREATE TABLE IF NOT EXISTS user_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    notification_preferences JSONB NOT NULL DEFAULT '{}',
    trading_preferences JSONB NOT NULL DEFAULT '{}',
    privacy_settings JSONB NOT NULL DEFAULT '{}',
    timezone TEXT DEFAULT 'UTC',
    language TEXT DEFAULT 'ja',
    theme TEXT DEFAULT 'light',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- CHECK制約
    CONSTRAINT valid_timezone CHECK (timezone IS NOT NULL AND LENGTH(timezone) > 0),
    CONSTRAINT valid_language CHECK (language IN ('ja', 'en')),
    CONSTRAINT valid_theme CHECK (theme IN ('light', 'dark', 'auto')),
    
    -- ユニーク制約
    UNIQUE(user_id)
);

-- ===================================
-- 2. アラート管理システム
-- ===================================

-- アラート条件テーブル
CREATE TABLE IF NOT EXISTS alert_conditions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL,
    severity TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    symbol TEXT NOT NULL,
    exchange TEXT,
    conditions JSONB NOT NULL,
    notification_methods TEXT[] NOT NULL DEFAULT '{}',
    cooldown_period INTEGER NOT NULL DEFAULT 15,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_triggered TIMESTAMPTZ,
    trigger_count INTEGER NOT NULL DEFAULT 0,
    expires_at TIMESTAMPTZ,
    timeframe TEXT,
    markets TEXT[],
    
    -- CHECK制約
    CONSTRAINT valid_alert_type CHECK (type IN (
        'PRICE_ABOVE', 'PRICE_BELOW', 'PRICE_CHANGE', 'PRICE_BREAKOUT',
        'RSI_OVERBOUGHT', 'RSI_OVERSOLD', 'MACD_CROSSOVER', 'BOLLINGER_BREAKOUT', 'MA_CROSSOVER',
        'VOLUME_SPIKE', 'VOLUME_DROP', 'VOLUME_ABNORMAL',
        'VAR_EXCEEDED', 'SHARPE_DECLINE', 'CORRELATION_BREAKDOWN', 'BETA_SHIFT', 'DRAWDOWN_ALERT',
        'DEFI_TVL_CHANGE', 'DEFI_YIELD_CHANGE', 'DEFI_RISK_CHANGE'
    )),
    CONSTRAINT valid_severity CHECK (severity IN ('critical', 'warning', 'info')),
    CONSTRAINT valid_status CHECK (status IN ('active', 'paused', 'expired')),
    CONSTRAINT valid_symbol CHECK (LENGTH(symbol) BETWEEN 1 AND 20),
    CONSTRAINT valid_name CHECK (LENGTH(name) BETWEEN 1 AND 100),
    CONSTRAINT valid_cooldown CHECK (cooldown_period >= 0 AND cooldown_period <= 1440),
    CONSTRAINT valid_trigger_count CHECK (trigger_count >= 0),
    CONSTRAINT valid_expires_at CHECK (expires_at IS NULL OR expires_at > created_at)
);

-- トリガーされたアラートテーブル
CREATE TABLE IF NOT EXISTS triggered_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    alert_condition_id UUID NOT NULL REFERENCES alert_conditions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    severity TEXT NOT NULL,
    triggered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    triggered_price DECIMAL,
    current_value DECIMAL,
    previous_value DECIMAL,
    change_percent DECIMAL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    details JSONB,
    acknowledged BOOLEAN NOT NULL DEFAULT FALSE,
    acknowledged_at TIMESTAMPTZ,
    
    -- CHECK制約
    CONSTRAINT valid_severity CHECK (severity IN ('critical', 'warning', 'info')),
    CONSTRAINT valid_title CHECK (LENGTH(title) BETWEEN 1 AND 200),
    CONSTRAINT valid_message CHECK (LENGTH(message) > 0),
    CONSTRAINT valid_acknowledged_at CHECK (acknowledged_at IS NULL OR acknowledged_at >= triggered_at)
);

-- ===================================
-- 3. ポートフォリオ管理
-- ===================================

-- ユーザーポートフォリオテーブル
CREATE TABLE IF NOT EXISTS user_portfolios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL DEFAULT 'メインポートフォリオ',
    total_value DECIMAL NOT NULL DEFAULT 0,
    change_24h DECIMAL NOT NULL DEFAULT 0,
    change_percent_24h DECIMAL NOT NULL DEFAULT 0,
    last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- CHECK制約
    CONSTRAINT valid_name CHECK (LENGTH(name) BETWEEN 1 AND 100),
    CONSTRAINT valid_total_value CHECK (total_value >= 0)
);

-- ポートフォリオ資産テーブル
CREATE TABLE IF NOT EXISTS portfolio_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    portfolio_id UUID NOT NULL REFERENCES user_portfolios(id) ON DELETE CASCADE,
    symbol TEXT NOT NULL,
    amount DECIMAL NOT NULL,
    current_price DECIMAL NOT NULL DEFAULT 0,
    current_value DECIMAL NOT NULL DEFAULT 0,
    average_cost DECIMAL,
    total_cost DECIMAL,
    unrealized_pnl DECIMAL,
    change_percent_24h DECIMAL,
    last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- CHECK制約
    CONSTRAINT valid_symbol CHECK (LENGTH(symbol) BETWEEN 1 AND 20),
    CONSTRAINT valid_amount CHECK (amount >= 0),
    CONSTRAINT valid_current_price CHECK (current_price >= 0),
    CONSTRAINT valid_current_value CHECK (current_value >= 0),
    
    -- ユニーク制約
    UNIQUE(portfolio_id, symbol)
);

-- ===================================
-- 4. DeFiダッシュボードシステム
-- ===================================

-- DeFiプロトコルテーブル
CREATE TABLE IF NOT EXISTS defi_protocols (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    protocol_type TEXT NOT NULL,
    blockchain TEXT NOT NULL,
    website_url TEXT,
    api_endpoint TEXT,
    current_tvl DECIMAL,
    tvl_change_24h DECIMAL,
    yield_apr DECIMAL,
    risk_score INTEGER,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- CHECK制約
    CONSTRAINT valid_protocol_name CHECK (LENGTH(name) BETWEEN 1 AND 100),
    CONSTRAINT valid_protocol_type CHECK (protocol_type IN ('lending', 'dex', 'yield_farming', 'staking', 'derivatives', 'insurance')),
    CONSTRAINT valid_blockchain CHECK (LENGTH(blockchain) BETWEEN 1 AND 50),
    CONSTRAINT valid_current_tvl CHECK (current_tvl IS NULL OR current_tvl >= 0),
    CONSTRAINT valid_yield_apr CHECK (yield_apr IS NULL OR yield_apr >= 0),
    CONSTRAINT valid_risk_score CHECK (risk_score IS NULL OR (risk_score >= 0 AND risk_score <= 10))
);

-- ユーザーDeFi監視テーブル
CREATE TABLE IF NOT EXISTS user_defi_monitors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    protocol_id UUID NOT NULL REFERENCES defi_protocols(id) ON DELETE CASCADE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    alert_threshold_tvl DECIMAL,
    alert_threshold_yield DECIMAL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- CHECK制約
    CONSTRAINT valid_alert_threshold_tvl CHECK (alert_threshold_tvl IS NULL OR alert_threshold_tvl > 0),
    CONSTRAINT valid_alert_threshold_yield CHECK (alert_threshold_yield IS NULL OR alert_threshold_yield > 0),
    
    -- ユニーク制約
    UNIQUE(user_id, protocol_id)
);

-- DeFi TVL履歴テーブル
CREATE TABLE IF NOT EXISTS defi_tvl_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    protocol_id UUID NOT NULL REFERENCES defi_protocols(id) ON DELETE CASCADE,
    tvl_usd DECIMAL NOT NULL,
    tvl_change_24h DECIMAL,
    tvl_change_7d DECIMAL,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- CHECK制約
    CONSTRAINT valid_tvl_usd CHECK (tvl_usd >= 0)
);

-- ===================================
-- 5. AI分析・推奨システム
-- ===================================

-- AI推奨事項テーブル
CREATE TABLE IF NOT EXISTS ai_recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    recommendation_type TEXT NOT NULL,
    symbol TEXT,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    confidence_score INTEGER NOT NULL,
    reasoning JSONB,
    action_items TEXT[],
    expires_at TIMESTAMPTZ,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- CHECK制約
    CONSTRAINT valid_recommendation_type CHECK (recommendation_type IN ('buy', 'sell', 'hold', 'risk_warning', 'opportunity', 'portfolio_rebalance')),
    CONSTRAINT valid_confidence_score CHECK (confidence_score >= 0 AND confidence_score <= 100),
    CONSTRAINT valid_title CHECK (LENGTH(title) BETWEEN 1 AND 200),
    CONSTRAINT valid_message CHECK (LENGTH(message) > 0),
    CONSTRAINT valid_expires_at CHECK (expires_at IS NULL OR expires_at > created_at)
);

-- AI市場シグナルテーブル
CREATE TABLE IF NOT EXISTS ai_market_signals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    signal_type TEXT NOT NULL,
    symbol TEXT,
    market TEXT,
    confidence_score INTEGER NOT NULL,
    signal_strength TEXT NOT NULL,
    analysis_data JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- CHECK制約
    CONSTRAINT valid_signal_type CHECK (signal_type IN ('bullish', 'bearish', 'neutral', 'volatility')),
    CONSTRAINT valid_confidence_score CHECK (confidence_score >= 0 AND confidence_score <= 100),
    CONSTRAINT valid_signal_strength CHECK (signal_strength IN ('weak', 'moderate', 'strong'))
);

-- ===================================
-- 6. 市場データ管理
-- ===================================

-- 市場データテーブル
CREATE TABLE IF NOT EXISTS market_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    symbol TEXT NOT NULL,
    exchange TEXT,
    price_usd DECIMAL NOT NULL,
    volume_24h DECIMAL,
    market_cap DECIMAL,
    price_change_24h DECIMAL,
    price_change_percent_24h DECIMAL,
    fear_greed_index INTEGER,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- CHECK制約
    CONSTRAINT valid_symbol CHECK (LENGTH(symbol) BETWEEN 1 AND 20),
    CONSTRAINT valid_price_usd CHECK (price_usd > 0),
    CONSTRAINT valid_volume_24h CHECK (volume_24h IS NULL OR volume_24h >= 0),
    CONSTRAINT valid_market_cap CHECK (market_cap IS NULL OR market_cap >= 0),
    CONSTRAINT valid_fear_greed_index CHECK (fear_greed_index IS NULL OR (fear_greed_index >= 0 AND fear_greed_index <= 100))
);

-- ===================================
-- 7. 学習進捗管理
-- ===================================

-- ユーザー学習進捗テーブル
CREATE TABLE IF NOT EXISTS user_lesson_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'not_started',
    progress_percentage INTEGER NOT NULL DEFAULT 0,
    time_spent_minutes INTEGER NOT NULL DEFAULT 0,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- CHECK制約
    CONSTRAINT valid_status CHECK (status IN ('not_started', 'in_progress', 'completed')),
    CONSTRAINT valid_progress_percentage CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    CONSTRAINT valid_time_spent CHECK (time_spent_minutes >= 0),
    CONSTRAINT valid_completion_order CHECK (
        (status = 'not_started' AND started_at IS NULL AND completed_at IS NULL) OR
        (status = 'in_progress' AND started_at IS NOT NULL AND completed_at IS NULL) OR
        (status = 'completed' AND started_at IS NOT NULL AND completed_at IS NOT NULL)
    ),
    
    -- ユニーク制約
    UNIQUE(user_id, lesson_id)
);

-- ===================================
-- 8. サブスクリプション・決済管理
-- ===================================

-- サブスクリプション履歴テーブル
CREATE TABLE IF NOT EXISTS subscription_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    stripe_subscription_id TEXT NOT NULL,
    stripe_invoice_id TEXT,
    tier TEXT NOT NULL,
    status TEXT NOT NULL,
    amount_paid DECIMAL,
    currency TEXT DEFAULT 'usd',
    billing_period_start TIMESTAMPTZ NOT NULL,
    billing_period_end TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- CHECK制約
    CONSTRAINT valid_tier CHECK (tier IN ('basic', 'pro', 'enterprise')),
    CONSTRAINT valid_status CHECK (status IN ('active', 'cancelled', 'past_due', 'incomplete')),
    CONSTRAINT valid_amount_paid CHECK (amount_paid IS NULL OR amount_paid >= 0),
    CONSTRAINT valid_currency CHECK (currency IN ('usd', 'eur', 'jpy')),
    CONSTRAINT valid_billing_period CHECK (billing_period_end > billing_period_start)
);

-- ===================================
-- 9. インデックス作成
-- ===================================

-- ユーザープロファイル関連
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_subscription_status ON user_profiles(subscription_status);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);

-- アラート関連
CREATE INDEX IF NOT EXISTS idx_alert_conditions_user_id ON alert_conditions(user_id);
CREATE INDEX IF NOT EXISTS idx_alert_conditions_status ON alert_conditions(status);
CREATE INDEX IF NOT EXISTS idx_alert_conditions_symbol ON alert_conditions(symbol);
CREATE INDEX IF NOT EXISTS idx_alert_conditions_type ON alert_conditions(type);
CREATE INDEX IF NOT EXISTS idx_triggered_alerts_user_id ON triggered_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_triggered_alerts_condition_id ON triggered_alerts(alert_condition_id);
CREATE INDEX IF NOT EXISTS idx_triggered_alerts_triggered_at ON triggered_alerts(triggered_at);

-- ポートフォリオ関連
CREATE INDEX IF NOT EXISTS idx_user_portfolios_user_id ON user_portfolios(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_assets_user_id ON portfolio_assets(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_assets_portfolio_id ON portfolio_assets(portfolio_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_assets_symbol ON portfolio_assets(symbol);

-- DeFi関連
CREATE INDEX IF NOT EXISTS idx_defi_protocols_name ON defi_protocols(name);
CREATE INDEX IF NOT EXISTS idx_defi_protocols_type ON defi_protocols(protocol_type);
CREATE INDEX IF NOT EXISTS idx_defi_protocols_blockchain ON defi_protocols(blockchain);
CREATE INDEX IF NOT EXISTS idx_user_defi_monitors_user_id ON user_defi_monitors(user_id);
CREATE INDEX IF NOT EXISTS idx_defi_tvl_history_protocol_id ON defi_tvl_history(protocol_id);
CREATE INDEX IF NOT EXISTS idx_defi_tvl_history_recorded_at ON defi_tvl_history(recorded_at);

-- AI関連
CREATE INDEX IF NOT EXISTS idx_ai_recommendations_user_id ON ai_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_recommendations_created_at ON ai_recommendations(created_at);
CREATE INDEX IF NOT EXISTS idx_ai_market_signals_symbol ON ai_market_signals(symbol);
CREATE INDEX IF NOT EXISTS idx_ai_market_signals_created_at ON ai_market_signals(created_at);

-- 市場データ関連
CREATE INDEX IF NOT EXISTS idx_market_data_symbol ON market_data(symbol);
CREATE INDEX IF NOT EXISTS idx_market_data_recorded_at ON market_data(recorded_at);

-- 学習関連
CREATE INDEX IF NOT EXISTS idx_user_lesson_progress_user_id ON user_lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_lesson_progress_lesson_id ON user_lesson_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_user_lesson_progress_status ON user_lesson_progress(status);

-- サブスクリプション関連
CREATE INDEX IF NOT EXISTS idx_subscription_history_user_id ON subscription_history(user_id);
CREATE INDEX IF NOT EXISTS idx_subscription_history_stripe_subscription_id ON subscription_history(stripe_subscription_id);

-- ===================================
-- 10. Row Level Security (RLS) ポリシー
-- ===================================

-- RLSを有効化
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE alert_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE triggered_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_defi_monitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_history ENABLE ROW LEVEL SECURITY;

-- ユーザープロファイル RLS
CREATE POLICY "Users can only access their own profile"
ON user_profiles FOR ALL
TO authenticated
USING (auth.uid() = id);

-- ユーザー設定 RLS
CREATE POLICY "Users can only access their own settings"
ON user_settings FOR ALL
TO authenticated
USING (auth.uid() = user_id);

-- アラート条件 RLS
CREATE POLICY "Users can only access their own alert conditions"
ON alert_conditions FOR ALL
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own alert conditions"
ON alert_conditions FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- トリガーされたアラート RLS
CREATE POLICY "Users can only access their own triggered alerts"
ON triggered_alerts FOR ALL
TO authenticated
USING (auth.uid() = user_id);

-- ポートフォリオ RLS
CREATE POLICY "Users can only access their own portfolios"
ON user_portfolios FOR ALL
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own portfolio assets"
ON portfolio_assets FOR ALL
TO authenticated
USING (auth.uid() = user_id);

-- DeFi監視 RLS
CREATE POLICY "Users can only access their own DeFi monitors"
ON user_defi_monitors FOR ALL
TO authenticated
USING (auth.uid() = user_id);

-- AI推奨事項 RLS
CREATE POLICY "Users can only access their own AI recommendations"
ON ai_recommendations FOR ALL
TO authenticated
USING (auth.uid() = user_id);

-- 学習進捗 RLS
CREATE POLICY "Users can only access their own lesson progress"
ON user_lesson_progress FOR ALL
TO authenticated
USING (auth.uid() = user_id);

-- サブスクリプション履歴 RLS
CREATE POLICY "Users can only access their own subscription history"
ON subscription_history FOR ALL
TO authenticated
USING (auth.uid() = user_id);

-- 管理者ポリシー
CREATE POLICY "Admins can access all data"
ON user_profiles FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- ===================================
-- 11. トリガー関数
-- ===================================

-- updated_atカラムを自動更新する関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- updated_atトリガーを追加
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at
    BEFORE UPDATE ON user_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_alert_conditions_updated_at
    BEFORE UPDATE ON alert_conditions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_portfolios_updated_at
    BEFORE UPDATE ON user_portfolios
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_defi_protocols_updated_at
    BEFORE UPDATE ON defi_protocols
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_defi_monitors_updated_at
    BEFORE UPDATE ON user_defi_monitors
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_lesson_progress_updated_at
    BEFORE UPDATE ON user_lesson_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ===================================
-- 12. 関数とプロシージャ
-- ===================================

-- ユーザー作成時にプロファイルとデフォルト設定を作成
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_profiles (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
    );
    
    INSERT INTO user_settings (user_id)
    VALUES (NEW.id);
    
    INSERT INTO user_portfolios (user_id, name)
    VALUES (NEW.id, 'メインポートフォリオ');
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ユーザー作成トリガー
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- ===================================
-- 13. 初期データ
-- ===================================

-- DeFiプロトコルの初期データ
INSERT INTO defi_protocols (name, protocol_type, blockchain, website_url, is_active) VALUES
('Uniswap V3', 'dex', 'Ethereum', 'https://uniswap.org', true),
('Aave V3', 'lending', 'Ethereum', 'https://aave.com', true),
('Compound V3', 'lending', 'Ethereum', 'https://compound.finance', true),
('Curve Finance', 'dex', 'Ethereum', 'https://curve.fi', true),
('Yearn Finance', 'yield_farming', 'Ethereum', 'https://yearn.finance', true),
('PancakeSwap', 'dex', 'BSC', 'https://pancakeswap.finance', true)
ON CONFLICT (name) DO NOTHING;