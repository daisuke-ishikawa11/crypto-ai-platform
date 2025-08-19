-- 🏦 DeFi フリーミアムモデル データベース設計
-- ユーザーレベル管理・サブスクリプション・学習進捗・使用統計

-- ユーザーエクスペリエンスレベル
CREATE TYPE user_experience_level AS ENUM ('beginner', 'intermediate', 'advanced');

-- サブスクリプションティア
CREATE TYPE subscription_tier AS ENUM ('free', 'premium', 'professional');

-- 通知頻度
CREATE TYPE notification_frequency AS ENUM ('immediate', 'daily', 'weekly');

-- DeFiユーザープロファイル
CREATE TABLE defi_user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  
  -- 基本プロファイル
  experience_level user_experience_level DEFAULT 'beginner' NOT NULL,
  subscription_tier subscription_tier DEFAULT 'free' NOT NULL,
  risk_tolerance TEXT CHECK (risk_tolerance IN ('conservative', 'moderate', 'aggressive')) DEFAULT 'conservative',
  
  -- 投資プロファイル
  investment_goals TEXT[] DEFAULT '{}',
  preferred_networks TEXT[] DEFAULT '{"ethereum"}',
  max_investment_amount DECIMAL(15,2) DEFAULT 1000.00,
  
  -- 学習・実績
  completed_tutorials TEXT[] DEFAULT '{}',
  achieved_badges TEXT[] DEFAULT '{}',
  
  -- 設定
  preferences JSONB DEFAULT '{
    "showEducationalContent": true,
    "enableRiskWarnings": true,
    "preferSimplifiedUI": true,
    "notificationSettings": {
      "tvlChanges": false,
      "riskAlerts": true,
      "yieldOpportunities": true,
      "educationalContent": true,
      "weeklyReports": true,
      "email": true,
      "push": false,
      "frequency": "weekly"
    }
  }',
  
  -- オンボーディング
  onboarding_progress JSONB DEFAULT '{
    "step": 1,
    "completed": false
  }',
  
  -- タイムスタンプ
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- インデックス
CREATE INDEX idx_defi_user_profiles_user_id ON defi_user_profiles(user_id);
CREATE INDEX idx_defi_user_profiles_experience_level ON defi_user_profiles(experience_level);
CREATE INDEX idx_defi_user_profiles_subscription_tier ON defi_user_profiles(subscription_tier);
CREATE INDEX idx_defi_user_profiles_updated_at ON defi_user_profiles(updated_at);

-- RLS (Row Level Security)
ALTER TABLE defi_user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own DeFi profile"
ON defi_user_profiles FOR ALL
USING (auth.uid() = user_id);

-- 教育コンテンツ
CREATE TABLE defi_educational_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  target_level user_experience_level NOT NULL,
  category TEXT CHECK (category IN ('basics', 'risk_management', 'yield_strategies', 'advanced_topics')) NOT NULL,
  format TEXT CHECK (format IN ('article', 'video', 'interactive', 'quiz')) DEFAULT 'article',
  estimated_minutes INTEGER DEFAULT 10,
  
  -- 前提条件・学習目標
  prerequisites TEXT[] DEFAULT '{}',
  learning_objectives TEXT[] DEFAULT '{}',
  
  -- コンテンツ詳細
  content JSONB NOT NULL DEFAULT '{}',
  
  -- メトリクス
  metrics JSONB DEFAULT '{
    "completionRate": 0,
    "averageRating": 0,
    "timeSpent": 0
  }',
  
  -- フリーミアム
  is_freemium BOOLEAN DEFAULT true NOT NULL,
  
  -- メタデータ
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- インデックス
CREATE INDEX idx_defi_educational_content_target_level ON defi_educational_content(target_level);
CREATE INDEX idx_defi_educational_content_category ON defi_educational_content(category);
CREATE INDEX idx_defi_educational_content_is_freemium ON defi_educational_content(is_freemium);

-- 学習進捗追跡
CREATE TABLE defi_learning_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  content_id UUID REFERENCES defi_educational_content(id) ON DELETE CASCADE NOT NULL,
  
  -- 進捗状況
  started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  progress_percentage DECIMAL(5,2) DEFAULT 0.00 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  time_spent_minutes INTEGER DEFAULT 0,
  
  -- 評価・フィードバック
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  
  -- クイズ結果
  quiz_attempts INTEGER DEFAULT 0,
  best_quiz_score DECIMAL(5,2) DEFAULT 0.00,
  last_quiz_attempt TIMESTAMP WITH TIME ZONE,
  
  -- タイムスタンプ
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  
  UNIQUE(user_id, content_id)
);

-- インデックス
CREATE INDEX idx_defi_learning_progress_user_id ON defi_learning_progress(user_id);
CREATE INDEX idx_defi_learning_progress_content_id ON defi_learning_progress(content_id);
CREATE INDEX idx_defi_learning_progress_completed_at ON defi_learning_progress(completed_at);

-- RLS
ALTER TABLE defi_learning_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own learning progress"
ON defi_learning_progress FOR ALL
USING (auth.uid() = user_id);

-- ユーザー使用統計（フリーミアム転換率分析用）
CREATE TABLE defi_user_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  
  -- 使用タイプ
  feature_type TEXT CHECK (feature_type IN (
    'protocol_access', 'advanced_analytics', 'custom_alert', 
    'portfolio_view', 'historical_data', 'yield_prediction', 
    'ai_recommendation', 'risk_analysis'
  )) NOT NULL,
  
  -- 使用詳細
  feature_id TEXT, -- プロトコルID、アラートID等
  action TEXT, -- 'view', 'create', 'update', 'delete'
  
  -- メタデータ
  metadata JSONB DEFAULT '{}',
  
  -- セッション情報
  session_id TEXT,
  user_agent TEXT,
  ip_address INET,
  
  -- タイムスタンプ
  used_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- インデックス
CREATE INDEX idx_defi_user_usage_user_id ON defi_user_usage(user_id);
CREATE INDEX idx_defi_user_usage_feature_type ON defi_user_usage(feature_type);
CREATE INDEX idx_defi_user_usage_used_at ON defi_user_usage(used_at);

-- RLS
ALTER TABLE defi_user_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own usage statistics"
ON defi_user_usage FOR SELECT
USING (auth.uid() = user_id);

-- サブスクリプション履歴
CREATE TABLE defi_subscription_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  
  -- サブスクリプション情報
  from_tier subscription_tier,
  to_tier subscription_tier NOT NULL,
  
  -- 支払い情報
  amount DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  payment_provider TEXT, -- 'stripe', 'paypal', etc.
  payment_id TEXT,
  
  -- 期間
  starts_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  ends_at TIMESTAMP WITH TIME ZONE,
  
  -- ステータス
  status TEXT CHECK (status IN ('active', 'cancelled', 'expired', 'failed')) DEFAULT 'active',
  
  -- タイムスタンプ
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- インデックス
CREATE INDEX idx_defi_subscription_history_user_id ON defi_subscription_history(user_id);
CREATE INDEX idx_defi_subscription_history_status ON defi_subscription_history(status);
CREATE INDEX idx_defi_subscription_history_ends_at ON defi_subscription_history(ends_at);

-- RLS
ALTER TABLE defi_subscription_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own subscription history"
ON defi_subscription_history FOR SELECT
USING (auth.uid() = user_id);

-- フリーミアム転換率分析用ビュー
CREATE VIEW defi_conversion_analytics AS
SELECT 
  dup.user_id,
  dup.experience_level,
  dup.subscription_tier,
  dup.created_at as profile_created_at,
  
  -- 使用統計
  COUNT(DISTINCT CASE WHEN duu.feature_type = 'protocol_access' THEN duu.feature_id END) as protocols_accessed,
  COUNT(DISTINCT CASE WHEN duu.feature_type = 'custom_alert' THEN duu.id END) as alerts_created,
  COUNT(DISTINCT CASE WHEN duu.feature_type = 'advanced_analytics' THEN duu.id END) as analytics_viewed,
  COUNT(DISTINCT CASE WHEN duu.feature_type = 'yield_prediction' THEN duu.id END) as predictions_viewed,
  
  -- 学習進捗
  COUNT(DISTINCT dlp.content_id) as contents_started,
  COUNT(DISTINCT CASE WHEN dlp.completed_at IS NOT NULL THEN dlp.content_id END) as contents_completed,
  AVG(dlp.progress_percentage) as avg_progress,
  
  -- アクティビティ
  COUNT(DISTINCT DATE(duu.used_at)) as active_days,
  MAX(duu.used_at) as last_activity,
  
  -- 転換スコア（0-100）
  LEAST(100, 
    COALESCE(COUNT(DISTINCT CASE WHEN duu.feature_type = 'protocol_access' THEN duu.feature_id END) * 20, 0) +
    COALESCE(COUNT(DISTINCT CASE WHEN duu.feature_type = 'custom_alert' THEN duu.id END) * 15, 0) +
    COALESCE(COUNT(DISTINCT CASE WHEN duu.feature_type = 'advanced_analytics' THEN duu.id END) * 2, 0) +
    COALESCE(COUNT(DISTINCT CASE WHEN dlp.completed_at IS NOT NULL THEN dlp.content_id END) * 10, 0)
  ) as conversion_score

FROM defi_user_profiles dup
LEFT JOIN defi_user_usage duu ON dup.user_id = duu.user_id
LEFT JOIN defi_learning_progress dlp ON dup.user_id = dlp.user_id
WHERE dup.created_at >= now() - INTERVAL '6 months'
GROUP BY dup.user_id, dup.experience_level, dup.subscription_tier, dup.created_at;

-- プロトコル詳細情報（初心者向け）
CREATE TABLE defi_beginner_protocol_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  protocol_id TEXT UNIQUE NOT NULL,
  simple_name TEXT NOT NULL,
  description TEXT NOT NULL,
  
  -- 分類・リスク
  category TEXT CHECK (category IN ('savings', 'trading', 'lending', 'staking')) NOT NULL,
  risk_level TEXT CHECK (risk_level IN ('very_low', 'low', 'medium', 'high')) NOT NULL,
  ease_of_use INTEGER CHECK (ease_of_use >= 1 AND ease_of_use <= 5) DEFAULT 3,
  
  -- 投資情報
  minimum_investment DECIMAL(10,2) DEFAULT 10.00,
  expected_return TEXT,
  time_commitment TEXT,
  
  -- 詳細情報
  pros TEXT[] DEFAULT '{}',
  cons TEXT[] DEFAULT '{}',
  who_its_for TEXT,
  how_it_works TEXT[] DEFAULT '{}',
  
  -- リスク説明
  risks JSONB DEFAULT '[]',
  
  -- オンボーディング
  getting_started JSONB DEFAULT '[]',
  
  -- メタデータ
  is_recommended BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- インデックス
CREATE INDEX idx_defi_beginner_protocol_info_category ON defi_beginner_protocol_info(category);
CREATE INDEX idx_defi_beginner_protocol_info_risk_level ON defi_beginner_protocol_info(risk_level);
CREATE INDEX idx_defi_beginner_protocol_info_is_recommended ON defi_beginner_protocol_info(is_recommended);

-- 機能制限追跡テーブル
CREATE TABLE defi_feature_limitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  feature_type TEXT NOT NULL,
  current_usage INTEGER DEFAULT 0,
  limit_reached BOOLEAN DEFAULT false,
  last_limit_check TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  
  UNIQUE(user_id, feature_type)
);

-- インデックス
CREATE INDEX idx_defi_feature_limitations_user_id ON defi_feature_limitations(user_id);
CREATE INDEX idx_defi_feature_limitations_limit_reached ON defi_feature_limitations(limit_reached);

-- RLS
ALTER TABLE defi_feature_limitations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own feature limitations"
ON defi_feature_limitations FOR SELECT
USING (auth.uid() = user_id);

-- 自動更新トリガー関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- トリガー設定
CREATE TRIGGER update_defi_user_profiles_updated_at 
  BEFORE UPDATE ON defi_user_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_defi_educational_content_updated_at 
  BEFORE UPDATE ON defi_educational_content 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_defi_learning_progress_updated_at 
  BEFORE UPDATE ON defi_learning_progress 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_defi_subscription_history_updated_at 
  BEFORE UPDATE ON defi_subscription_history 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_defi_beginner_protocol_info_updated_at 
  BEFORE UPDATE ON defi_beginner_protocol_info 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_defi_feature_limitations_updated_at 
  BEFORE UPDATE ON defi_feature_limitations 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 初期データ挿入
INSERT INTO defi_beginner_protocol_info (
  protocol_id, simple_name, description, category, risk_level, 
  ease_of_use, minimum_investment, expected_return, time_commitment,
  pros, cons, who_its_for, how_it_works, is_recommended, display_order
) VALUES 
(
  'compound',
  'Compound（レンディング）',
  'あなたの暗号通貨を貸し出して、安定した利息を獲得できるサービスです',
  'lending',
  'low',
  2,
  10.00,
  '3-6% 年利',
  'ロックアップなし（いつでも引き出し可能）',
  '{"安定した利息収入","いつでも資金を引き出せる","実績のあるプロトコル","複数の通貨に対応"}',
  '{"高収益は期待できない","ガス代がかかる","スマートコントラクトリスク"}',
  'DeFi初心者で、安全に資産を運用したい方',
  '{"ウォレットを接続する","貸し出したい通貨と金額を選択","トランザクションを承認","利息が自動的に蓄積される"}',
  true,
  1
),
(
  'aave',
  'Aave（高機能レンディング）',
  '貸出・借入の両方ができる、より高機能なレンディングプロトコルです',
  'lending',
  'low',
  3,
  25.00,
  '2-7% 年利',
  'ロックアップなし',
  '{"多様な通貨に対応","借入も可能","業界最大手の安心感","フラッシュローン機能"}',
  '{"機能が複雑","ガス代が高い","借入時は清算リスク"}',
  'DeFiにやや慣れ、より多様な戦略を試したい方',
  '{"ウォレット接続","資産を供給して利息獲得","必要に応じて他の資産を借入","フラッシュローンで高度な戦略実行"}',
  true,
  2
);

-- 初期教育コンテンツ
INSERT INTO defi_educational_content (
  title, description, target_level, category, format, estimated_minutes,
  prerequisites, learning_objectives, content, is_freemium, tags
) VALUES 
(
  'DeFiとは何か？',
  'DeFi（分散型金融）の基本概念と従来の金融との違いを学びます',
  'beginner',
  'basics',
  'article',
  15,
  '{}',
  '{"DeFiの定義を理解する","従来の金融との違いを説明できる","主要なDeFiサービスを知る"}',
  '{
    "sections": [
      {
        "title": "DeFiの定義",
        "content": "DeFi（Decentralized Finance）は、ブロックチェーン上で動作する金融サービスの総称です..."
      }
    ]
  }',
  true,
  '{"初心者","基礎知識","DeFi入門"}'
),
(
  '高度なイールドファーミング戦略',
  '複雑なイールドファーミング戦略とリスク管理手法を学びます',
  'advanced',
  'yield_strategies',
  'interactive',
  45,
  '{"基本的なDeFi知識","ウォレット操作経験"}',
  '{"複雑なファーミング戦略を理解する","リスクを適切に評価できる","ポートフォリオを最適化できる"}',
  '{
    "sections": [
      {
        "title": "高度なファーミング手法",
        "content": "レバレッジファーミングやマルチプール戦略について..."
      }
    ]
  }',
  false,
  '{"上級者","イールドファーミング","リスク管理"}'
);

-- 関数：フリーミアム転換スコア計算
CREATE OR REPLACE FUNCTION calculate_conversion_score(user_id_param UUID)
RETURNS INTEGER AS $$
DECLARE
  score INTEGER := 0;
  protocols_count INTEGER;
  alerts_count INTEGER;
  analytics_count INTEGER;
  completed_lessons INTEGER;
BEGIN
  -- プロトコルアクセス（最大60点）
  SELECT COUNT(DISTINCT feature_id) INTO protocols_count
  FROM defi_user_usage 
  WHERE user_id = user_id_param AND feature_type = 'protocol_access';
  score := score + LEAST(60, protocols_count * 20);
  
  -- アラート作成（最大30点）
  SELECT COUNT(*) INTO alerts_count
  FROM defi_user_usage 
  WHERE user_id = user_id_param AND feature_type = 'custom_alert';
  score := score + LEAST(30, alerts_count * 15);
  
  -- 分析機能使用（最大10点）
  SELECT COUNT(*) INTO analytics_count
  FROM defi_user_usage 
  WHERE user_id = user_id_param AND feature_type = 'advanced_analytics';
  score := score + LEAST(10, analytics_count * 2);
  
  RETURN LEAST(100, score);
END;
$$ LANGUAGE plpgsql;

-- 関数：機能制限チェック
CREATE OR REPLACE FUNCTION check_feature_limit(
  user_id_param UUID,
  feature_type_param TEXT,
  tier_param subscription_tier
) RETURNS BOOLEAN AS $$
DECLARE
  current_count INTEGER;
  limit_value INTEGER;
BEGIN
  -- 現在の使用量を取得
  SELECT COUNT(*) INTO current_count
  FROM defi_user_usage
  WHERE user_id = user_id_param AND feature_type = feature_type_param;
  
  -- ティア別制限を設定
  CASE tier_param
    WHEN 'free' THEN
      CASE feature_type_param
        WHEN 'custom_alert' THEN limit_value := 3;
        WHEN 'protocol_access' THEN limit_value := 3;
        ELSE limit_value := -1; -- 無制限
      END CASE;
    WHEN 'premium' THEN
      CASE feature_type_param
        WHEN 'custom_alert' THEN limit_value := 25;
        ELSE limit_value := -1; -- 無制限
      END CASE;
    ELSE
      limit_value := -1; -- プロフェッショナルは無制限
  END CASE;
  
  -- 制限チェック
  RETURN (limit_value = -1 OR current_count < limit_value);
END;
$$ LANGUAGE plpgsql;