-- 二要素認証システムのデータベーマイグレーション

-- ユーザーの2FA設定テーブル
CREATE TABLE IF NOT EXISTS user_two_factor_auth (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    method_type VARCHAR(20) NOT NULL, -- 'totp', 'sms', 'email'
    secret_key TEXT, -- TOTP用の秘密鍵（暗号化）
    phone_number VARCHAR(20), -- SMS用電話番号
    email VARCHAR(255), -- Email用アドレス
    enabled BOOLEAN DEFAULT false,
    verified BOOLEAN DEFAULT false,
    backup_codes_generated BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_used_at TIMESTAMP WITH TIME ZONE,
    disabled_at TIMESTAMP WITH TIME ZONE,
    verification_attempts INTEGER DEFAULT 0,
    metadata JSONB DEFAULT '{}'::jsonb,
    
    UNIQUE(user_id, method_type),
    CHECK (method_type IN ('totp', 'sms', 'email')),
    CHECK (
        (method_type = 'totp' AND secret_key IS NOT NULL) OR
        (method_type = 'sms' AND phone_number IS NOT NULL) OR
        (method_type = 'email' AND email IS NOT NULL)
    )
);

-- バックアップコードテーブル
CREATE TABLE IF NOT EXISTS user_backup_codes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    code VARCHAR(16) NOT NULL,
    used BOOLEAN DEFAULT false,
    used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, code),
    INDEX ON (user_id),
    INDEX ON (used)
);

-- 2FAセッションテーブル
CREATE TABLE IF NOT EXISTS two_factor_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    session_id VARCHAR(128) NOT NULL UNIQUE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    method VARCHAR(20) NOT NULL,
    verified BOOLEAN DEFAULT false,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    attempts INTEGER DEFAULT 0,
    max_attempts INTEGER DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    verified_at TIMESTAMP WITH TIME ZONE,
    ip_address INET,
    user_agent TEXT,
    
    INDEX ON (session_id),
    INDEX ON (user_id),
    INDEX ON (expires_at)
);

-- 認証コードテーブル（SMS/Email用）
CREATE TABLE IF NOT EXISTS verification_codes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    session_id VARCHAR(128) REFERENCES two_factor_sessions(session_id) ON DELETE CASCADE,
    code_hash VARCHAR(256) NOT NULL, -- ハッシュ化された認証コード
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    INDEX ON (session_id)
);

-- 2FA認証ログテーブル
CREATE TABLE IF NOT EXISTS two_factor_auth_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    method VARCHAR(20) NOT NULL,
    action VARCHAR(50) NOT NULL, -- 'enabled', 'disabled', 'verified', 'failed'
    success BOOLEAN NOT NULL,
    ip_address INET,
    user_agent TEXT,
    session_id VARCHAR(128),
    error_details TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    INDEX ON (user_id),
    INDEX ON (created_at DESC),
    INDEX ON (action),
    INDEX ON (success)
);

-- 信頼できるデバイステーブル
CREATE TABLE IF NOT EXISTS trusted_devices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    device_fingerprint VARCHAR(256) NOT NULL,
    device_name VARCHAR(255),
    device_type VARCHAR(50), -- 'desktop', 'mobile', 'tablet'
    browser VARCHAR(100),
    os VARCHAR(100),
    ip_address INET,
    location_country VARCHAR(2),
    location_city VARCHAR(100),
    trusted BOOLEAN DEFAULT false,
    trust_expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, device_fingerprint),
    INDEX ON (user_id),
    INDEX ON (device_fingerprint),
    INDEX ON (trusted),
    INDEX ON (trust_expires_at)
);

-- RLS (Row Level Security) を有効化
ALTER TABLE user_two_factor_auth ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_backup_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE two_factor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE two_factor_auth_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE trusted_devices ENABLE ROW LEVEL SECURITY;

-- RLS ポリシー

-- user_two_factor_auth のポリシー
CREATE POLICY "Users can manage their own 2FA settings" ON user_two_factor_auth
FOR ALL USING (auth.uid() = user_id);

-- user_backup_codes のポリシー
CREATE POLICY "Users can access their own backup codes" ON user_backup_codes
FOR ALL USING (auth.uid() = user_id);

-- two_factor_sessions のポリシー
CREATE POLICY "Users can access their own 2FA sessions" ON two_factor_sessions
FOR ALL USING (auth.uid() = user_id);

-- verification_codes のポリシー（セッション経由でのアクセス）
CREATE POLICY "Users can access verification codes for their sessions" ON verification_codes
FOR ALL USING (
    session_id IN (
        SELECT session_id FROM two_factor_sessions 
        WHERE user_id = auth.uid()
    )
);

-- two_factor_auth_logs のポリシー
CREATE POLICY "Users can view their own 2FA logs" ON two_factor_auth_logs
FOR SELECT USING (auth.uid() = user_id);

-- trusted_devices のポリシー
CREATE POLICY "Users can manage their own trusted devices" ON trusted_devices
FOR ALL USING (auth.uid() = user_id);

-- トリガー関数: 更新時刻の自動更新
CREATE OR REPLACE FUNCTION update_two_factor_auth_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- トリガー: user_two_factor_auth の更新時刻自動更新
CREATE TRIGGER trigger_update_two_factor_auth_updated_at
    BEFORE UPDATE ON user_two_factor_auth
    FOR EACH ROW
    EXECUTE FUNCTION update_two_factor_auth_updated_at();

-- トリガー関数: 2FA認証ログの自動作成
CREATE OR REPLACE FUNCTION log_two_factor_auth_activity()
RETURNS TRIGGER AS $$
BEGIN
    -- 2FA設定の有効化/無効化をログ
    IF TG_OP = 'UPDATE' THEN
        IF OLD.enabled = false AND NEW.enabled = true THEN
            INSERT INTO two_factor_auth_logs (
                user_id, method, action, success, metadata
            ) VALUES (
                NEW.user_id, NEW.method_type, 'enabled', true, 
                jsonb_build_object('previous_state', 'disabled', 'new_state', 'enabled')
            );
        ELSIF OLD.enabled = true AND NEW.enabled = false THEN
            INSERT INTO two_factor_auth_logs (
                user_id, method, action, success, metadata
            ) VALUES (
                NEW.user_id, NEW.method_type, 'disabled', true,
                jsonb_build_object('previous_state', 'enabled', 'new_state', 'disabled')
            );
        END IF;
        
        IF OLD.verified = false AND NEW.verified = true THEN
            INSERT INTO two_factor_auth_logs (
                user_id, method, action, success, metadata
            ) VALUES (
                NEW.user_id, NEW.method_type, 'verified', true,
                jsonb_build_object('verification_completed', true)
            );
        END IF;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- トリガー: 2FA設定変更時のログ記録
CREATE TRIGGER trigger_log_two_factor_auth_activity
    AFTER INSERT OR UPDATE ON user_two_factor_auth
    FOR EACH ROW
    EXECUTE FUNCTION log_two_factor_auth_activity();

-- トリガー関数: 期限切れセッションのクリーンアップ
CREATE OR REPLACE FUNCTION cleanup_expired_two_factor_sessions()
RETURNS void AS $$
BEGIN
    -- 期限切れの2FAセッションを削除
    DELETE FROM two_factor_sessions 
    WHERE expires_at < NOW() - INTERVAL '1 hour';
    
    -- 関連する認証コードも削除される（CASCADE）
END;
$$ LANGUAGE plpgsql;

-- トリガー関数: セキュリティ制約の強化
CREATE OR REPLACE FUNCTION enforce_two_factor_security_constraints()
RETURNS TRIGGER AS $$
BEGIN
    -- ユーザーあたりの2FA方法数制限（最大3つ）
    IF TG_OP = 'INSERT' THEN
        IF (SELECT COUNT(*) FROM user_two_factor_auth WHERE user_id = NEW.user_id) >= 3 THEN
            RAISE EXCEPTION '一人のユーザーが設定できる2FA方法は最大3つまでです';
        END IF;
    END IF;
    
    -- バックアップコード数制限（最大10個）
    IF TG_TABLE_NAME = 'user_backup_codes' AND TG_OP = 'INSERT' THEN
        IF (SELECT COUNT(*) FROM user_backup_codes WHERE user_id = NEW.user_id AND used = false) >= 10 THEN
            RAISE EXCEPTION 'アクティブなバックアップコードは最大10個までです';
        END IF;
    END IF;
    
    -- 同時アクティブセッション数制限（最大5個）
    IF TG_TABLE_NAME = 'two_factor_sessions' AND TG_OP = 'INSERT' THEN
        IF (SELECT COUNT(*) FROM two_factor_sessions 
            WHERE user_id = NEW.user_id 
            AND expires_at > NOW()
            AND verified = false) >= 5 THEN
            RAISE EXCEPTION 'アクティブな2FAセッションが上限に達しています';
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- セキュリティ制約トリガー
CREATE TRIGGER trigger_enforce_two_factor_security_constraints
    BEFORE INSERT ON user_two_factor_auth
    FOR EACH ROW
    EXECUTE FUNCTION enforce_two_factor_security_constraints();

CREATE TRIGGER trigger_enforce_backup_codes_constraints
    BEFORE INSERT ON user_backup_codes
    FOR EACH ROW
    EXECUTE FUNCTION enforce_two_factor_security_constraints();

CREATE TRIGGER trigger_enforce_sessions_constraints
    BEFORE INSERT ON two_factor_sessions
    FOR EACH ROW
    EXECUTE FUNCTION enforce_two_factor_security_constraints();

-- 便利関数: 2FA試行回数の増加
CREATE OR REPLACE FUNCTION increment_2fa_attempts(session_id VARCHAR(128))
RETURNS void AS $$
BEGIN
    UPDATE two_factor_sessions 
    SET attempts = attempts + 1
    WHERE two_factor_sessions.session_id = increment_2fa_attempts.session_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 便利関数: ユーザーの2FA設定確認
CREATE OR REPLACE FUNCTION user_has_two_factor_enabled(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS(
        SELECT 1 FROM user_two_factor_auth 
        WHERE user_two_factor_auth.user_id = user_has_two_factor_enabled.user_id 
        AND enabled = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 便利関数: 信頼できるデバイスの確認
CREATE OR REPLACE FUNCTION is_trusted_device(
    user_id UUID, 
    device_fingerprint VARCHAR(256)
) RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS(
        SELECT 1 FROM trusted_devices 
        WHERE trusted_devices.user_id = is_trusted_device.user_id
        AND trusted_devices.device_fingerprint = is_trusted_device.device_fingerprint
        AND trusted = true
        AND (trust_expires_at IS NULL OR trust_expires_at > NOW())
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- インデックスの最適化
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_two_factor_auth_user_method 
ON user_two_factor_auth (user_id, method_type) WHERE enabled = true;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_two_factor_sessions_expires 
ON two_factor_sessions (expires_at) WHERE verified = false;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_backup_codes_unused 
ON user_backup_codes (user_id) WHERE used = false;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_two_factor_logs_recent 
ON two_factor_auth_logs (user_id, created_at DESC) WHERE created_at > NOW() - INTERVAL '30 days';

-- 定期クリーンアップジョブ用のSQL関数
CREATE OR REPLACE FUNCTION cleanup_two_factor_data()
RETURNS void AS $$
BEGIN
    -- 期限切れセッション削除
    DELETE FROM two_factor_sessions 
    WHERE expires_at < NOW() - INTERVAL '1 hour';
    
    -- 古い認証ログ削除（90日より古い）
    DELETE FROM two_factor_auth_logs 
    WHERE created_at < NOW() - INTERVAL '90 days';
    
    -- 期限切れ信頼デバイス削除
    DELETE FROM trusted_devices 
    WHERE trust_expires_at IS NOT NULL 
    AND trust_expires_at < NOW();
    
    -- 未使用の古いバックアップコード警告ログ
    INSERT INTO two_factor_auth_logs (user_id, method, action, success, metadata)
    SELECT 
        user_id, 
        'backup_codes', 
        'old_unused_codes_warning', 
        true,
        jsonb_build_object(
            'unused_codes_count', COUNT(*),
            'oldest_code_age_days', EXTRACT(days FROM NOW() - MIN(created_at))
        )
    FROM user_backup_codes 
    WHERE used = false 
    AND created_at < NOW() - INTERVAL '180 days'
    GROUP BY user_id
    HAVING COUNT(*) > 0;
END;
$$ LANGUAGE plpgsql;

-- コメント追加
COMMENT ON TABLE user_two_factor_auth IS '二要素認証設定テーブル - TOTP、SMS、Email認証の設定を管理';
COMMENT ON TABLE user_backup_codes IS 'バックアップコードテーブル - 2FA復旧用のワンタイムコード';
COMMENT ON TABLE two_factor_sessions IS '2FAセッションテーブル - 認証プロセス中の一時的セッション';
COMMENT ON TABLE verification_codes IS '認証コードテーブル - SMS/Email送信コードのハッシュを保存';
COMMENT ON TABLE two_factor_auth_logs IS '2FA認証ログテーブル - セキュリティ監査用のアクティビティログ';
COMMENT ON TABLE trusted_devices IS '信頼できるデバイステーブル - 2FAをスキップできるデバイス管理';

COMMENT ON FUNCTION cleanup_two_factor_data() IS '定期実行用: 期限切れデータの自動クリーンアップ';
COMMENT ON FUNCTION user_has_two_factor_enabled(UUID) IS 'ユーザーが2FAを有効にしているかチェック';
COMMENT ON FUNCTION is_trusted_device(UUID, VARCHAR) IS 'デバイスが信頼済みかチェック';