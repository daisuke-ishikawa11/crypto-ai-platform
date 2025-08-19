-- ユーザー通知設定テーブル
CREATE TABLE IF NOT EXISTS user_notification_preferences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email_preferences JSONB DEFAULT '{"enabled": true, "types": ["achievement", "alert", "system"]}'::jsonb,
    push_preferences JSONB DEFAULT '{"enabled": false, "types": ["achievement", "alert"]}'::jsonb,
    sms_preferences JSONB DEFAULT '{"enabled": false, "types": ["alert"]}'::jsonb,
    webhook_preferences JSONB DEFAULT '{"enabled": false, "url": null, "secret": null}'::jsonb,
    in_app_preferences JSONB DEFAULT '{"enabled": true, "types": ["achievement", "alert", "system"]}'::jsonb,
    timezone VARCHAR(50) DEFAULT 'UTC',
    quiet_hours JSONB DEFAULT '{"enabled": false, "start": "22:00", "end": "08:00"}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- ユーザー通知履歴テーブル
CREATE TABLE IF NOT EXISTS user_notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    data JSONB DEFAULT '{}'::jsonb,
    read BOOLEAN DEFAULT FALSE,
    method VARCHAR(20), -- 'email', 'push', 'sms', 'in_app'
    status VARCHAR(20) DEFAULT 'sent', -- 'sent', 'delivered', 'failed', 'read'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read_at TIMESTAMP WITH TIME ZONE,
    INDEX ON (user_id),
    INDEX ON (created_at DESC),
    INDEX ON (read),
    INDEX ON (type)
);

-- プッシュ通知トークンテーブル
CREATE TABLE IF NOT EXISTS user_push_tokens (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    token VARCHAR(255) NOT NULL,
    platform VARCHAR(20) NOT NULL, -- 'web', 'ios', 'android'
    device_info JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, token),
    INDEX ON (user_id),
    INDEX ON (is_active)
);

-- 通知配信統計テーブル
CREATE TABLE IF NOT EXISTS notification_delivery_stats (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    date DATE NOT NULL,
    method VARCHAR(20) NOT NULL, -- 'email', 'push', 'sms', 'in_app'
    type VARCHAR(50) NOT NULL, -- 'achievement', 'alert', 'system'
    sent_count INTEGER DEFAULT 0,
    delivered_count INTEGER DEFAULT 0,
    failed_count INTEGER DEFAULT 0,
    opened_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(date, method, type)
);

-- RLS (Row Level Security) を有効化
ALTER TABLE user_notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_push_tokens ENABLE ROW LEVEL SECURITY;

-- RLS ポリシー
CREATE POLICY "Users can manage their own notification preferences" ON user_notification_preferences
FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own notifications" ON user_notifications
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their notification read status" ON user_notifications
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own push tokens" ON user_push_tokens
FOR ALL USING (auth.uid() = user_id);

-- 通知設定更新時の自動タイムスタンプ更新
CREATE OR REPLACE FUNCTION update_notification_preferences_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_notification_preferences_updated_at
    BEFORE UPDATE ON user_notification_preferences
    FOR EACH ROW
    EXECUTE FUNCTION update_notification_preferences_updated_at();

-- 統計テーブル更新時の自動タイムスタンプ更新
CREATE OR REPLACE FUNCTION update_notification_stats_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_notification_stats_updated_at
    BEFORE UPDATE ON notification_delivery_stats
    FOR EACH ROW
    EXECUTE FUNCTION update_notification_stats_updated_at();

-- プッシュトークンの最終使用日更新関数
CREATE OR REPLACE FUNCTION update_push_token_last_used()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_used_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- デフォルト通知設定を作成する関数
CREATE OR REPLACE FUNCTION create_default_notification_preferences()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_notification_preferences (user_id) VALUES (NEW.id)
    ON CONFLICT (user_id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ユーザー作成時に自動的にデフォルト通知設定を作成するトリガー
CREATE TRIGGER trigger_create_default_notification_preferences
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION create_default_notification_preferences();