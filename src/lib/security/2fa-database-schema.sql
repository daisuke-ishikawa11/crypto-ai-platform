-- 🔐 Enterprise-Grade Two-Factor Authentication (2FA) Database Schema
-- Comprehensive security implementation with audit logging and advanced features
-- Version: 2.0.0 - Production Ready

-- =====================================================
-- 2FA CONFIGURATION TABLES
-- =====================================================

-- 1. User 2FA configuration
CREATE TABLE IF NOT EXISTS user_two_factor_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  is_enabled BOOLEAN DEFAULT false,
  is_mandatory BOOLEAN DEFAULT false, -- For enterprise accounts
  grace_period_end TIMESTAMP WITH TIME ZONE, -- Grace period for mandatory 2FA
  primary_method TEXT CHECK (primary_method IN ('totp', 'sms', 'email', 'webauthn', 'backup_codes')),
  backup_method TEXT CHECK (backup_method IN ('totp', 'sms', 'email', 'webauthn', 'backup_codes')),
  recovery_email TEXT,
  recovery_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- 2. TOTP configuration
CREATE TABLE IF NOT EXISTS user_totp_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  secret_encrypted TEXT NOT NULL, -- AES-256 encrypted
  secret_iv TEXT NOT NULL, -- Initialization vector for encryption
  algorithm TEXT DEFAULT 'SHA1' CHECK (algorithm IN ('SHA1', 'SHA256', 'SHA512')),
  digits INTEGER DEFAULT 6 CHECK (digits IN (6, 8)),
  period INTEGER DEFAULT 30 CHECK (period IN (30, 60)),
  is_verified BOOLEAN DEFAULT false,
  is_enabled BOOLEAN DEFAULT false,
  verified_at TIMESTAMP WITH TIME ZONE,
  last_used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- 3. SMS/Email 2FA configuration
CREATE TABLE IF NOT EXISTS user_contact_2fa_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  method TEXT NOT NULL CHECK (method IN ('sms', 'email')),
  contact_value_encrypted TEXT NOT NULL, -- Encrypted phone/email
  contact_value_hash TEXT NOT NULL, -- For lookups
  contact_iv TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT false,
  is_enabled BOOLEAN DEFAULT false,
  verified_at TIMESTAMP WITH TIME ZONE,
  last_code_sent_at TIMESTAMP WITH TIME ZONE,
  code_send_count INTEGER DEFAULT 0,
  daily_send_limit INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, method)
);

-- 4. WebAuthn/FIDO2 credentials
CREATE TABLE IF NOT EXISTS user_webauthn_credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  credential_id TEXT NOT NULL UNIQUE,
  public_key TEXT NOT NULL,
  counter BIGINT DEFAULT 0,
  device_name TEXT,
  device_type TEXT CHECK (device_type IN ('platform', 'cross-platform')),
  transports TEXT[], -- ['usb', 'nfc', 'ble', 'internal']
  is_enabled BOOLEAN DEFAULT true,
  last_used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 5. Backup codes
CREATE TABLE IF NOT EXISTS user_backup_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  code_hash TEXT NOT NULL, -- bcrypt/argon2 hashed
  code_salt TEXT NOT NULL,
  is_used BOOLEAN DEFAULT false,
  used_at TIMESTAMP WITH TIME ZONE,
  used_ip INET,
  used_user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + INTERVAL '1 year')
);

-- =====================================================
-- SESSION MANAGEMENT TABLES
-- =====================================================

-- 6. 2FA verification sessions
CREATE TABLE IF NOT EXISTS two_factor_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  method TEXT NOT NULL CHECK (method IN ('totp', 'sms', 'email', 'webauthn', 'backup_codes')),
  challenge TEXT, -- For WebAuthn or verification codes
  challenge_hash TEXT, -- Hashed version for verification
  is_verified BOOLEAN DEFAULT false,
  verified_at TIMESTAMP WITH TIME ZONE,
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 5,
  ip_address INET,
  user_agent TEXT,
  device_fingerprint TEXT,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + INTERVAL '10 minutes'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 7. Trusted devices
CREATE TABLE IF NOT EXISTS user_trusted_devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  device_id TEXT NOT NULL,
  device_name TEXT,
  device_type TEXT CHECK (device_type IN ('desktop', 'mobile', 'tablet', 'other')),
  browser TEXT,
  os TEXT,
  ip_address INET,
  device_fingerprint TEXT NOT NULL,
  trust_token_hash TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  last_used_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + INTERVAL '30 days'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, device_fingerprint)
);

-- =====================================================
-- SECURITY & AUDIT TABLES
-- =====================================================

-- 8. 2FA audit logs
CREATE TABLE IF NOT EXISTS two_factor_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN (
    'enable_2fa', 'disable_2fa', 'verify_success', 'verify_failure',
    'backup_code_generated', 'backup_code_used', 'trusted_device_added',
    'trusted_device_removed', 'recovery_initiated', 'recovery_completed',
    'suspicious_activity', 'account_locked', 'method_changed'
  )),
  method TEXT,
  details JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  device_fingerprint TEXT,
  geolocation JSONB, -- {country, city, region, lat, lon}
  risk_score INTEGER DEFAULT 0 CHECK (risk_score >= 0 AND risk_score <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 9. Account lockout tracking
CREATE TABLE IF NOT EXISTS account_lockouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lockout_reason TEXT NOT NULL CHECK (lockout_reason IN (
    'too_many_attempts', 'suspicious_activity', 'manual_lock',
    'security_breach', 'account_recovery'
  )),
  failed_attempts INTEGER DEFAULT 0,
  lockout_start TIMESTAMP WITH TIME ZONE DEFAULT now(),
  lockout_end TIMESTAMP WITH TIME ZONE,
  unlock_token TEXT,
  unlock_token_expires TIMESTAMP WITH TIME ZONE,
  ip_addresses INET[],
  is_active BOOLEAN DEFAULT true,
  unlocked_by UUID REFERENCES users(id),
  unlocked_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 10. Suspicious activity tracking
CREATE TABLE IF NOT EXISTS suspicious_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL CHECK (activity_type IN (
    'unusual_location', 'multiple_failed_attempts', 'rapid_attempts',
    'device_mismatch', 'time_anomaly', 'pattern_anomaly'
  )),
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  details JSONB NOT NULL,
  ip_address INET,
  user_agent TEXT,
  device_fingerprint TEXT,
  action_taken TEXT CHECK (action_taken IN (
    'none', 'notification_sent', 'account_locked', 'admin_alerted'
  )),
  is_resolved BOOLEAN DEFAULT false,
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolved_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 11. Recovery attempts
CREATE TABLE IF NOT EXISTS account_recovery_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recovery_method TEXT NOT NULL CHECK (recovery_method IN (
    'email', 'sms', 'security_questions', 'support_ticket'
  )),
  recovery_token_hash TEXT,
  recovery_code_hash TEXT,
  is_successful BOOLEAN DEFAULT false,
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3,
  ip_address INET,
  user_agent TEXT,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + INTERVAL '1 hour'),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =====================================================
-- RATE LIMITING & THROTTLING
-- =====================================================

-- 12. Rate limiting for 2FA operations
CREATE TABLE IF NOT EXISTS two_factor_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier TEXT NOT NULL, -- Can be user_id, ip_address, or combination
  action TEXT NOT NULL CHECK (action IN (
    'verify_totp', 'send_sms', 'send_email', 'verify_backup',
    'generate_backup', 'add_device', 'recovery_attempt'
  )),
  attempts INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT now(),
  window_end TIMESTAMP WITH TIME ZONE DEFAULT (now() + INTERVAL '15 minutes'),
  is_blocked BOOLEAN DEFAULT false,
  blocked_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(identifier, action, window_start)
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Config indexes
CREATE INDEX idx_2fa_config_user_id ON user_two_factor_config(user_id);
CREATE INDEX idx_2fa_config_enabled ON user_two_factor_config(is_enabled) WHERE is_enabled = true;
CREATE INDEX idx_totp_user_id ON user_totp_config(user_id);
CREATE INDEX idx_contact_2fa_user_method ON user_contact_2fa_config(user_id, method);
CREATE INDEX idx_webauthn_user_id ON user_webauthn_credentials(user_id);
CREATE INDEX idx_webauthn_credential_id ON user_webauthn_credentials(credential_id);

-- Session indexes
CREATE INDEX idx_2fa_sessions_session_id ON two_factor_sessions(session_id);
CREATE INDEX idx_2fa_sessions_user_id ON two_factor_sessions(user_id);
CREATE INDEX idx_2fa_sessions_expires ON two_factor_sessions(expires_at) WHERE is_verified = false;
CREATE INDEX idx_trusted_devices_user_id ON user_trusted_devices(user_id);
CREATE INDEX idx_trusted_devices_fingerprint ON user_trusted_devices(device_fingerprint);

-- Security indexes
CREATE INDEX idx_audit_logs_user_id ON two_factor_audit_logs(user_id);
CREATE INDEX idx_audit_logs_event_type ON two_factor_audit_logs(event_type);
CREATE INDEX idx_audit_logs_created_at ON two_factor_audit_logs(created_at);
CREATE INDEX idx_lockouts_user_id ON account_lockouts(user_id) WHERE is_active = true;
CREATE INDEX idx_suspicious_user_id ON suspicious_activities(user_id);
CREATE INDEX idx_suspicious_unresolved ON suspicious_activities(is_resolved) WHERE is_resolved = false;

-- Backup codes indexes
CREATE INDEX idx_backup_codes_user_id ON user_backup_codes(user_id);
CREATE INDEX idx_backup_codes_unused ON user_backup_codes(user_id, is_used) WHERE is_used = false;

-- Rate limiting indexes
CREATE INDEX idx_rate_limits_identifier ON two_factor_rate_limits(identifier, action);
CREATE INDEX idx_rate_limits_window ON two_factor_rate_limits(window_end) WHERE is_blocked = false;

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE user_two_factor_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_totp_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_contact_2fa_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_webauthn_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_backup_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE two_factor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_trusted_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE two_factor_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE account_lockouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE suspicious_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE account_recovery_attempts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage own 2FA config" ON user_two_factor_config 
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own TOTP" ON user_totp_config 
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own contact 2FA" ON user_contact_2fa_config 
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own WebAuthn" ON user_webauthn_credentials 
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own backup codes" ON user_backup_codes 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own sessions" ON two_factor_sessions 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own trusted devices" ON user_trusted_devices 
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own audit logs" ON two_factor_audit_logs 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own lockouts" ON account_lockouts 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own recovery attempts" ON account_recovery_attempts 
  FOR SELECT USING (auth.uid() = user_id);

-- =====================================================
-- FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to clean up expired sessions
CREATE OR REPLACE FUNCTION cleanup_expired_2fa_sessions()
RETURNS void AS $$
BEGIN
  DELETE FROM two_factor_sessions 
  WHERE expires_at < now() AND is_verified = false;
  
  DELETE FROM account_recovery_attempts
  WHERE expires_at < now() AND is_successful = false;
  
  DELETE FROM two_factor_rate_limits
  WHERE window_end < now() AND is_blocked = false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment 2FA attempts
CREATE OR REPLACE FUNCTION increment_2fa_attempts(p_session_id TEXT)
RETURNS INTEGER AS $$
DECLARE
  v_attempts INTEGER;
  v_max_attempts INTEGER;
BEGIN
  UPDATE two_factor_sessions
  SET attempts = attempts + 1
  WHERE session_id = p_session_id
  RETURNING attempts, max_attempts INTO v_attempts, v_max_attempts;
  
  IF v_attempts >= v_max_attempts THEN
    -- Log suspicious activity
    INSERT INTO suspicious_activities (
      user_id, activity_type, severity, details
    )
    SELECT 
      user_id, 
      'multiple_failed_attempts',
      'high',
      jsonb_build_object(
        'session_id', session_id,
        'attempts', v_attempts,
        'method', method
      )
    FROM two_factor_sessions
    WHERE session_id = p_session_id;
  END IF;
  
  RETURN v_attempts;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check rate limits
CREATE OR REPLACE FUNCTION check_2fa_rate_limit(
  p_identifier TEXT,
  p_action TEXT,
  p_max_attempts INTEGER DEFAULT 5
)
RETURNS BOOLEAN AS $$
DECLARE
  v_attempts INTEGER;
  v_is_blocked BOOLEAN;
BEGIN
  -- Get current attempts
  SELECT attempts, is_blocked
  INTO v_attempts, v_is_blocked
  FROM two_factor_rate_limits
  WHERE identifier = p_identifier
    AND action = p_action
    AND window_end > now()
  ORDER BY created_at DESC
  LIMIT 1;
  
  IF v_is_blocked THEN
    RETURN FALSE;
  END IF;
  
  IF v_attempts IS NULL THEN
    -- First attempt in window
    INSERT INTO two_factor_rate_limits (identifier, action, attempts)
    VALUES (p_identifier, p_action, 1);
    RETURN TRUE;
  ELSIF v_attempts < p_max_attempts THEN
    -- Increment attempts
    UPDATE two_factor_rate_limits
    SET attempts = attempts + 1
    WHERE identifier = p_identifier
      AND action = p_action
      AND window_end > now();
    RETURN TRUE;
  ELSE
    -- Block further attempts
    UPDATE two_factor_rate_limits
    SET is_blocked = true,
        blocked_until = now() + INTERVAL '30 minutes'
    WHERE identifier = p_identifier
      AND action = p_action
      AND window_end > now();
    RETURN FALSE;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for audit logging
CREATE OR REPLACE FUNCTION log_2fa_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    INSERT INTO two_factor_audit_logs (
      user_id,
      event_type,
      method,
      details
    ) VALUES (
      NEW.user_id,
      CASE 
        WHEN TG_OP = 'INSERT' THEN 'enable_2fa'
        WHEN OLD.is_enabled = false AND NEW.is_enabled = true THEN 'enable_2fa'
        WHEN OLD.is_enabled = true AND NEW.is_enabled = false THEN 'disable_2fa'
        ELSE 'method_changed'
      END,
      TG_ARGV[0],
      jsonb_build_object(
        'table', TG_TABLE_NAME,
        'operation', TG_OP,
        'old_values', to_jsonb(OLD),
        'new_values', to_jsonb(NEW)
      )
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply audit triggers
CREATE TRIGGER audit_2fa_config_changes
  AFTER INSERT OR UPDATE ON user_two_factor_config
  FOR EACH ROW EXECUTE FUNCTION log_2fa_changes('config');

CREATE TRIGGER audit_totp_changes
  AFTER INSERT OR UPDATE ON user_totp_config
  FOR EACH ROW EXECUTE FUNCTION log_2fa_changes('totp');

CREATE TRIGGER audit_contact_2fa_changes
  AFTER INSERT OR UPDATE ON user_contact_2fa_config
  FOR EACH ROW EXECUTE FUNCTION log_2fa_changes('contact');

-- =====================================================
-- SCHEDULED JOBS (using pg_cron or similar)
-- =====================================================

-- Schedule cleanup of expired data (run every hour)
-- SELECT cron.schedule('cleanup-2fa-sessions', '0 * * * *', 'SELECT cleanup_expired_2fa_sessions();');

-- =====================================================
-- SECURITY VIEWS
-- =====================================================

-- View for active 2FA methods per user
CREATE OR REPLACE VIEW user_active_2fa_methods AS
SELECT 
  u.id as user_id,
  u.email,
  c.is_enabled as config_enabled,
  c.primary_method,
  c.backup_method,
  COALESCE(t.is_enabled, false) as totp_enabled,
  COALESCE(s.is_enabled, false) as sms_enabled,
  COALESCE(e.is_enabled, false) as email_enabled,
  COUNT(DISTINCT w.id) as webauthn_devices,
  COUNT(DISTINCT b.id) FILTER (WHERE b.is_used = false) as unused_backup_codes
FROM users u
LEFT JOIN user_two_factor_config c ON u.id = c.user_id
LEFT JOIN user_totp_config t ON u.id = t.user_id
LEFT JOIN user_contact_2fa_config s ON u.id = s.user_id AND s.method = 'sms'
LEFT JOIN user_contact_2fa_config e ON u.id = e.user_id AND e.method = 'email'
LEFT JOIN user_webauthn_credentials w ON u.id = w.user_id AND w.is_enabled = true
LEFT JOIN user_backup_codes b ON u.id = b.user_id AND b.expires_at > now()
GROUP BY u.id, u.email, c.is_enabled, c.primary_method, c.backup_method, 
         t.is_enabled, s.is_enabled, e.is_enabled;

-- View for security dashboard
CREATE OR REPLACE VIEW security_dashboard AS
SELECT 
  COUNT(DISTINCT u.id) as total_users,
  COUNT(DISTINCT c.user_id) FILTER (WHERE c.is_enabled = true) as users_with_2fa,
  COUNT(DISTINCT t.user_id) FILTER (WHERE t.is_enabled = true) as users_with_totp,
  COUNT(DISTINCT s.user_id) FILTER (WHERE s.is_enabled = true) as users_with_sms,
  COUNT(DISTINCT w.user_id) as users_with_webauthn,
  COUNT(DISTINCT l.user_id) FILTER (WHERE l.is_active = true) as locked_accounts,
  COUNT(DISTINCT sa.user_id) FILTER (WHERE sa.is_resolved = false) as users_with_suspicious_activity
FROM users u
LEFT JOIN user_two_factor_config c ON u.id = c.user_id
LEFT JOIN user_totp_config t ON u.id = t.user_id
LEFT JOIN user_contact_2fa_config s ON u.id = s.user_id AND s.method = 'sms'
LEFT JOIN user_webauthn_credentials w ON u.id = w.user_id
LEFT JOIN account_lockouts l ON u.id = l.user_id
LEFT JOIN suspicious_activities sa ON u.id = sa.user_id;

-- =====================================================
-- DATA MIGRATION (if upgrading from existing system)
-- =====================================================

-- Migrate existing 2FA data if tables exist
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_two_factor_auth') THEN
    INSERT INTO user_two_factor_config (user_id, is_enabled, primary_method, created_at)
    SELECT DISTINCT user_id, enabled, method_type, created_at
    FROM user_two_factor_auth
    WHERE NOT EXISTS (
      SELECT 1 FROM user_two_factor_config WHERE user_id = user_two_factor_auth.user_id
    );
  END IF;
END $$;

-- =====================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================

COMMENT ON TABLE user_two_factor_config IS 'Main 2FA configuration for users';
COMMENT ON TABLE user_totp_config IS 'TOTP/Authenticator app configuration';
COMMENT ON TABLE user_contact_2fa_config IS 'SMS and Email 2FA configuration';
COMMENT ON TABLE user_webauthn_credentials IS 'WebAuthn/FIDO2 security keys';
COMMENT ON TABLE user_backup_codes IS 'Emergency backup codes for account recovery';
COMMENT ON TABLE two_factor_sessions IS 'Active 2FA verification sessions';
COMMENT ON TABLE user_trusted_devices IS 'Trusted devices that bypass 2FA for a period';
COMMENT ON TABLE two_factor_audit_logs IS 'Comprehensive audit trail for all 2FA activities';
COMMENT ON TABLE account_lockouts IS 'Account lockout tracking for security';
COMMENT ON TABLE suspicious_activities IS 'Suspicious activity detection and tracking';
COMMENT ON TABLE account_recovery_attempts IS 'Account recovery process tracking';
COMMENT ON TABLE two_factor_rate_limits IS 'Rate limiting for 2FA operations';

COMMENT ON COLUMN user_totp_config.secret_encrypted IS 'AES-256 encrypted TOTP secret';
COMMENT ON COLUMN user_contact_2fa_config.contact_value_encrypted IS 'AES-256 encrypted contact information';
COMMENT ON COLUMN user_backup_codes.code_hash IS 'Argon2 or bcrypt hashed backup code';
COMMENT ON COLUMN two_factor_audit_logs.risk_score IS 'Risk score 0-100, higher means more risky';
COMMENT ON COLUMN suspicious_activities.severity IS 'Severity level of suspicious activity';