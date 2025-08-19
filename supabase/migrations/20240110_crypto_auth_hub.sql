-- 🔐 Crypto Auth Hub Database Schema
-- Unified authentication system for 4 independent apps

-- ========================= User Profiles Extension =========================

-- Add app-specific settings to user_profiles
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS app_settings JSONB DEFAULT '{}';
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS trusted_devices JSONB DEFAULT '[]';
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS last_password_change TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS password_expires_at TIMESTAMP WITH TIME ZONE;

-- ========================= SSO Sessions =========================

CREATE TABLE IF NOT EXISTS sso_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'premium', 'admin')),
  subscription_status TEXT NOT NULL CHECK (subscription_status IN ('active', 'inactive', 'trial', 'cancelled')),
  subscription_tier TEXT NOT NULL CHECK (subscription_tier IN ('basic', 'pro', 'enterprise')),
  apps TEXT[] NOT NULL DEFAULT '{}',
  mfa_verified BOOLEAN DEFAULT FALSE,
  ip_address INET,
  user_agent TEXT,
  device_fingerprint TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  revoked_at TIMESTAMP WITH TIME ZONE,
  
  -- Indexes
  INDEX idx_sso_sessions_user_id (user_id),
  INDEX idx_sso_sessions_session_id (session_id),
  INDEX idx_sso_sessions_expires_at (expires_at)
);

-- ========================= App Access Control =========================

CREATE TABLE IF NOT EXISTS app_access (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  app_id TEXT NOT NULL,
  app_name TEXT NOT NULL,
  has_access BOOLEAN DEFAULT FALSE,
  first_accessed_at TIMESTAMP WITH TIME ZONE,
  last_accessed_at TIMESTAMP WITH TIME ZONE,
  access_count INTEGER DEFAULT 0,
  permissions TEXT[] DEFAULT '{}',
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Unique constraint
  UNIQUE(user_id, app_id),
  
  -- Indexes
  INDEX idx_app_access_user_id (user_id),
  INDEX idx_app_access_app_id (app_id)
);

-- ========================= Two-Factor Authentication =========================

CREATE TABLE IF NOT EXISTS user_two_factor_auth (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  method_type TEXT NOT NULL CHECK (method_type IN ('totp', 'sms', 'email', 'backup_codes')),
  secret_key TEXT, -- Encrypted
  phone_number TEXT, -- For SMS, encrypted
  email_address TEXT, -- For email method
  enabled BOOLEAN DEFAULT FALSE,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified_at TIMESTAMP WITH TIME ZONE,
  last_used_at TIMESTAMP WITH TIME ZONE,
  disabled_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}',
  
  -- Unique constraint
  UNIQUE(user_id, method_type),
  
  -- Indexes
  INDEX idx_2fa_user_id (user_id),
  INDEX idx_2fa_method_type (method_type)
);

-- ========================= Backup Codes =========================

CREATE TABLE IF NOT EXISTS user_backup_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  code TEXT NOT NULL, -- Hashed
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  used_at TIMESTAMP WITH TIME ZONE,
  
  -- Unique constraint
  UNIQUE(user_id, code),
  
  -- Indexes
  INDEX idx_backup_codes_user_id (user_id)
);

-- ========================= MFA Sessions =========================

CREATE TABLE IF NOT EXISTS two_factor_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  method TEXT NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified_at TIMESTAMP WITH TIME ZONE,
  
  -- Indexes
  INDEX idx_2fa_sessions_session_id (session_id),
  INDEX idx_2fa_sessions_user_id (user_id)
);

-- ========================= Verification Codes =========================

CREATE TABLE IF NOT EXISTS verification_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT REFERENCES two_factor_sessions(session_id) ON DELETE CASCADE,
  code_hash TEXT NOT NULL, -- Hashed verification code
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '10 minutes',
  
  -- Indexes
  INDEX idx_verification_codes_session_id (session_id)
);

-- ========================= Audit Logs =========================

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id TEXT NOT NULL, -- Can be email for failed logins
  action TEXT NOT NULL,
  app_id TEXT,
  ip_address INET,
  user_agent TEXT,
  result TEXT CHECK (result IN ('success', 'failure')),
  metadata JSONB DEFAULT '{}',
  risk_score INTEGER,
  
  -- Indexes
  INDEX idx_audit_logs_user_id (user_id),
  INDEX idx_audit_logs_timestamp (timestamp),
  INDEX idx_audit_logs_action (action),
  INDEX idx_audit_logs_result (result)
);

-- ========================= Trusted Devices =========================

CREATE TABLE IF NOT EXISTS trusted_devices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  device_id TEXT NOT NULL,
  device_name TEXT,
  device_type TEXT,
  device_fingerprint TEXT,
  trusted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '30 days',
  revoked_at TIMESTAMP WITH TIME ZONE,
  
  -- Unique constraint
  UNIQUE(user_id, device_id),
  
  -- Indexes
  INDEX idx_trusted_devices_user_id (user_id),
  INDEX idx_trusted_devices_device_id (device_id)
);

-- ========================= API Keys =========================

CREATE TABLE IF NOT EXISTS api_keys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  key_hash TEXT NOT NULL, -- Hashed API key
  name TEXT NOT NULL,
  permissions TEXT[] DEFAULT '{}',
  apps TEXT[] DEFAULT '{}',
  last_used_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  revoked_at TIMESTAMP WITH TIME ZONE,
  
  -- Indexes
  INDEX idx_api_keys_user_id (user_id),
  INDEX idx_api_keys_key_hash (key_hash)
);

-- ========================= Row Level Security =========================

-- Enable RLS on all tables
ALTER TABLE sso_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_two_factor_auth ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_backup_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE two_factor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE trusted_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- SSO Sessions policies
CREATE POLICY "Users can view their own sessions"
  ON sso_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all sessions"
  ON sso_sessions FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- App Access policies
CREATE POLICY "Users can view their own app access"
  ON app_access FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own app settings"
  ON app_access FOR UPDATE
  USING (auth.uid() = user_id);

-- 2FA policies
CREATE POLICY "Users can manage their own 2FA settings"
  ON user_two_factor_auth FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own backup codes"
  ON user_backup_codes FOR SELECT
  USING (auth.uid() = user_id);

-- Audit logs policies
CREATE POLICY "Users can view their own audit logs"
  ON audit_logs FOR SELECT
  USING (auth.uid()::text = user_id OR auth.jwt() ->> 'email' = user_id);

CREATE POLICY "Service role can insert audit logs"
  ON audit_logs FOR INSERT
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Trusted devices policies
CREATE POLICY "Users can manage their own trusted devices"
  ON trusted_devices FOR ALL
  USING (auth.uid() = user_id);

-- API keys policies
CREATE POLICY "Users can manage their own API keys"
  ON api_keys FOR ALL
  USING (auth.uid() = user_id);

-- ========================= Functions =========================

-- Function to increment 2FA attempts
CREATE OR REPLACE FUNCTION increment_2fa_attempts(session_id TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE two_factor_sessions
  SET attempts = attempts + 1
  WHERE two_factor_sessions.session_id = increment_2fa_attempts.session_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to clean up expired sessions
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS VOID AS $$
BEGIN
  -- Delete expired SSO sessions
  DELETE FROM sso_sessions WHERE expires_at < NOW();
  
  -- Delete expired 2FA sessions
  DELETE FROM two_factor_sessions WHERE expires_at < NOW();
  
  -- Delete expired verification codes
  DELETE FROM verification_codes WHERE expires_at < NOW();
  
  -- Delete expired trusted devices
  DELETE FROM trusted_devices WHERE expires_at < NOW() AND revoked_at IS NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check app access
CREATE OR REPLACE FUNCTION check_app_access(
  p_user_id UUID,
  p_app_id TEXT,
  p_required_role TEXT DEFAULT NULL,
  p_require_subscription BOOLEAN DEFAULT FALSE
)
RETURNS BOOLEAN AS $$
DECLARE
  v_user_role TEXT;
  v_subscription_status TEXT;
  v_has_access BOOLEAN;
BEGIN
  -- Get user profile
  SELECT role, subscription_status
  INTO v_user_role, v_subscription_status
  FROM user_profiles
  WHERE id = p_user_id;
  
  -- Check role requirement
  IF p_required_role IS NOT NULL THEN
    IF p_required_role = 'admin' AND v_user_role != 'admin' THEN
      RETURN FALSE;
    END IF;
    
    IF p_required_role = 'premium' AND v_user_role NOT IN ('premium', 'admin') THEN
      RETURN FALSE;
    END IF;
  END IF;
  
  -- Check subscription requirement
  IF p_require_subscription AND v_subscription_status NOT IN ('active', 'trial') THEN
    RETURN FALSE;
  END IF;
  
  -- Check app-specific access
  SELECT has_access INTO v_has_access
  FROM app_access
  WHERE user_id = p_user_id AND app_id = p_app_id;
  
  -- Default to true if no specific restriction
  RETURN COALESCE(v_has_access, TRUE);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================= Triggers =========================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_app_access_updated_at
  BEFORE UPDATE ON app_access
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Track last activity for sessions
CREATE OR REPLACE FUNCTION update_session_activity()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE sso_sessions
  SET last_activity_at = NOW()
  WHERE session_id = NEW.session_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ========================= Scheduled Jobs =========================

-- Schedule cleanup job to run every hour
-- Note: This would be set up using pg_cron or external scheduler
-- Example: SELECT cron.schedule('cleanup-sessions', '0 * * * *', 'SELECT cleanup_expired_sessions();');

-- ========================= Initial Data =========================

-- Insert default app configurations
INSERT INTO app_access (user_id, app_id, app_name, has_access, permissions)
SELECT 
  id,
  app.app_id,
  app.app_name,
  TRUE,
  app.default_permissions
FROM auth.users
CROSS JOIN (
  VALUES 
    ('cryptolearn-pro', 'CryptoLearn Pro', ARRAY['learning:read', 'learning:write', 'progress:manage']),
    ('cryptotrader-ai', 'CryptoTrader AI', ARRAY['trading:read', 'trading:write', 'portfolio:manage']),
    ('defi-navigator', 'DeFi Navigator', ARRAY['defi:read', 'defi:write', 'liquidity:manage']),
    ('portfolio-guardian', 'Portfolio Guardian', ARRAY['portfolio:read', 'portfolio:write', 'risk:analyze'])
) AS app(app_id, app_name, default_permissions)
ON CONFLICT (user_id, app_id) DO NOTHING;

-- ========================= Indexes for Performance =========================

CREATE INDEX IF NOT EXISTS idx_audit_logs_user_action ON audit_logs(user_id, action, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_sso_sessions_active ON sso_sessions(user_id, expires_at) WHERE revoked_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_trusted_devices_active ON trusted_devices(user_id, expires_at) WHERE revoked_at IS NULL;