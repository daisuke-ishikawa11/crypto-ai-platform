-- 🗄️ Enterprise Notification System Database Schema
-- Comprehensive database schema for multi-channel notification system

-- Notification Templates
CREATE TABLE IF NOT EXISTS notification_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  channel VARCHAR(50) NOT NULL,
  subject TEXT,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  html_body TEXT,
  variables JSONB DEFAULT '{}',
  locale VARCHAR(10) DEFAULT 'en',
  is_active BOOLEAN DEFAULT true,
  version INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Notification Providers
CREATE TABLE IF NOT EXISTS notification_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 0,
  rate_limits JSONB DEFAULT '{"per_second": 10, "per_minute": 600, "per_hour": 36000, "per_day": 864000}',
  configuration JSONB NOT NULL,
  health_check JSONB DEFAULT '{"url": null, "interval": 300000, "timeout": 30000, "is_healthy": true}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notification Queues
CREATE TABLE IF NOT EXISTS notification_queues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  channel VARCHAR(50) NOT NULL,
  priority VARCHAR(20) DEFAULT 'normal',
  max_retries INTEGER DEFAULT 3,
  retry_backoff INTEGER DEFAULT 60, -- seconds
  batch_size INTEGER DEFAULT 10,
  processing_delay INTEGER DEFAULT 30000, -- milliseconds
  dead_letter_queue UUID REFERENCES notification_queues(id),
  is_active BOOLEAN DEFAULT true,
  metrics JSONB DEFAULT '{"pending": 0, "processing": 0, "completed": 0, "failed": 0, "retrying": 0}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Notification Preferences
CREATE TABLE IF NOT EXISTS user_notification_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  preferences JSONB NOT NULL DEFAULT '{
    "channels": {
      "email": {"enabled": true, "min_priority": "normal", "allowed_types": []},
      "push": {"enabled": true, "min_priority": "normal", "allowed_types": []},
      "sms": {"enabled": false, "min_priority": "critical", "allowed_types": []},
      "webhook": {"enabled": false, "min_priority": "normal", "allowed_types": []},
      "in_app": {"enabled": true, "min_priority": "low", "allowed_types": []},
      "slack": {"enabled": false, "min_priority": "normal", "allowed_types": []},
      "discord": {"enabled": false, "min_priority": "normal", "allowed_types": []},
      "telegram": {"enabled": false, "min_priority": "normal", "allowed_types": []}
    },
    "frequency": {
      "immediate": [],
      "batched": [],
      "disabled": []
    },
    "quiet_hours": {
      "enabled": false,
      "start": "22:00",
      "end": "08:00",
      "timezone": "UTC"
    },
    "digest_settings": {
      "enabled": false,
      "frequency": "daily",
      "time": "09:00"
    },
    "language": "en",
    "global_opt_out": false
  }',
  email VARCHAR(255),
  phone_number VARCHAR(20),
  push_tokens JSONB DEFAULT '[]',
  webhook_url TEXT,
  slack_channel_id VARCHAR(100),
  discord_channel_id VARCHAR(100),
  telegram_chat_id VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id)
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(100) NOT NULL,
  channel VARCHAR(50) NOT NULL,
  priority VARCHAR(20) DEFAULT 'normal',
  recipient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  template_id UUID REFERENCES notification_templates(id) ON DELETE SET NULL,
  
  -- Content (either from template or custom)
  subject TEXT,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  html_body TEXT,
  
  -- Data and metadata
  data JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{"source": "system", "tags": []}',
  
  -- Scheduling
  send_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expire_at TIMESTAMP WITH TIME ZONE,
  timezone VARCHAR(50) DEFAULT 'UTC',
  
  -- Retry policy
  retry_policy JSONB DEFAULT '{"max_retries": 3, "backoff_multiplier": 2, "max_backoff_delay": 300}',
  
  -- Status tracking
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sent_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  failed_at TIMESTAMP WITH TIME ZONE,
  
  -- Indexes
  INDEX(recipient_id),
  INDEX(type),
  INDEX(status),
  INDEX(send_at),
  INDEX(created_at)
);

-- Notification Delivery Logs
CREATE TABLE IF NOT EXISTS notification_delivery_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_id UUID NOT NULL REFERENCES notifications(id) ON DELETE CASCADE,
  channel VARCHAR(50) NOT NULL,
  provider VARCHAR(100),
  status VARCHAR(20) NOT NULL,
  attempt INTEGER DEFAULT 1,
  
  -- Timing
  sent_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  failed_at TIMESTAMP WITH TIME ZONE,
  delivery_time INTEGER, -- milliseconds
  
  -- Provider response
  message_id VARCHAR(255),
  provider_response JSONB,
  error TEXT,
  cost_cents INTEGER,
  
  -- Engagement metrics
  opened_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Indexes
  INDEX(notification_id),
  INDEX(channel),
  INDEX(status),
  INDEX(created_at),
  INDEX(sent_at)
);

-- Notification Queue (Runtime queue management)
CREATE TABLE IF NOT EXISTS notification_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  queue_id UUID NOT NULL REFERENCES notification_queues(id) ON DELETE CASCADE,
  notification_payload JSONB NOT NULL,
  priority VARCHAR(20) DEFAULT 'normal',
  status VARCHAR(20) DEFAULT 'pending',
  retry_count INTEGER DEFAULT 0,
  max_retries INTEGER DEFAULT 3,
  next_retry_at TIMESTAMP WITH TIME ZONE,
  result JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE,
  
  -- Indexes
  INDEX(queue_id),
  INDEX(status),
  INDEX(priority),
  INDEX(created_at),
  INDEX(next_retry_at)
);

-- Notification Batches
CREATE TABLE IF NOT EXISTS notification_batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel VARCHAR(50) NOT NULL,
  priority VARCHAR(20) DEFAULT 'normal',
  status VARCHAR(20) DEFAULT 'pending',
  total_count INTEGER DEFAULT 0,
  success_count INTEGER DEFAULT 0,
  failure_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  
  -- Indexes
  INDEX(status),
  INDEX(created_at)
);

-- Notification Rules
CREATE TABLE IF NOT EXISTS notification_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 0,
  
  -- Conditions
  conditions JSONB DEFAULT '{}',
  
  -- Actions
  actions JSONB DEFAULT '{}',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Notification Campaigns
CREATE TABLE IF NOT EXISTS notification_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50) DEFAULT 'targeted', -- broadcast, targeted, triggered
  status VARCHAR(20) DEFAULT 'draft',
  
  template_id UUID NOT NULL REFERENCES notification_templates(id) ON DELETE CASCADE,
  
  -- Audience configuration
  audience JSONB DEFAULT '{}',
  channels JSONB DEFAULT '["email"]',
  
  -- Scheduling
  scheduling JSONB DEFAULT '{}',
  
  -- A/B Testing
  ab_testing JSONB,
  
  -- Metrics
  metrics JSONB DEFAULT '{
    "sent": 0,
    "delivered": 0,
    "failed": 0,
    "opened": 0,
    "clicked": 0,
    "unsubscribed": 0
  }',
  
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  
  -- Indexes
  INDEX(status),
  INDEX(type),
  INDEX(created_by),
  INDEX(created_at)
);

-- Notification Analytics (for aggregated metrics)
CREATE TABLE IF NOT EXISTS notification_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_id UUID REFERENCES notifications(id) ON DELETE CASCADE,
  type VARCHAR(100) NOT NULL,
  channel VARCHAR(50) NOT NULL,
  priority VARCHAR(20) NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}',
  
  -- Partitioned by date for better performance
  created_date DATE DEFAULT CURRENT_DATE,
  
  -- Indexes
  INDEX(type),
  INDEX(channel),
  INDEX(user_id),
  INDEX(created_date),
  INDEX(timestamp)
);

-- Notification Digests
CREATE TABLE IF NOT EXISTS notification_digests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL, -- daily, weekly, monthly
  period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  notifications JSONB DEFAULT '[]',
  status VARCHAR(20) DEFAULT 'pending',
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Indexes
  INDEX(user_id),
  INDEX(type),
  INDEX(status),
  INDEX(period_start)
);

-- Notification Personalization
CREATE TABLE IF NOT EXISTS notification_personalization (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  preferences JSONB DEFAULT '{
    "content_style": "formal",
    "frequency": "moderate",
    "timing": "anytime",
    "topics": []
  }',
  engagement JSONB DEFAULT '{
    "open_rate": 0,
    "click_rate": 0,
    "unsubscribe_rate": 0,
    "last_engagement": null
  }',
  ai_model JSONB DEFAULT '{
    "version": "1.0",
    "personalization_score": 0.5,
    "last_training_date": null
  }',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id)
);

-- Webhook Events (for external systems)
CREATE TABLE IF NOT EXISTS notification_webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL,
  notification_id UUID REFERENCES notifications(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  data JSONB DEFAULT '{}',
  signature VARCHAR(255),
  processed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Indexes
  INDEX(type),
  INDEX(notification_id),
  INDEX(processed),
  INDEX(created_at)
);

-- Audit Log for Notifications
CREATE TABLE IF NOT EXISTS notification_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action VARCHAR(50) NOT NULL,
  notification_id UUID REFERENCES notifications(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  details JSONB DEFAULT '{}',
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  
  -- Indexes
  INDEX(action),
  INDEX(notification_id),
  INDEX(user_id),
  INDEX(timestamp)
);

-- Notification Rate Limits (runtime tracking)
CREATE TABLE IF NOT EXISTS notification_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  channel VARCHAR(50) NOT NULL,
  period VARCHAR(20) NOT NULL, -- minute, hour, day
  count INTEGER DEFAULT 0,
  reset_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, channel, period),
  INDEX(reset_at)
);

-- In-App Notifications (separate table for better performance)
CREATE TABLE IF NOT EXISTS in_app_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  notification_id UUID REFERENCES notifications(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(100) NOT NULL,
  severity VARCHAR(20) DEFAULT 'normal',
  data JSONB DEFAULT '{}',
  read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  action_url TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Indexes
  INDEX(user_id),
  INDEX(read),
  INDEX(type),
  INDEX(created_at),
  INDEX(expires_at)
);

-- Functions and Triggers

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_notification_templates_updated_at BEFORE UPDATE ON notification_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notification_providers_updated_at BEFORE UPDATE ON notification_providers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notification_queues_updated_at BEFORE UPDATE ON notification_queues FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_notification_preferences_updated_at BEFORE UPDATE ON user_notification_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON notifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notification_rules_updated_at BEFORE UPDATE ON notification_rules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notification_campaigns_updated_at BEFORE UPDATE ON notification_campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notification_personalization_updated_at BEFORE UPDATE ON notification_personalization FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notification_rate_limits_updated_at BEFORE UPDATE ON notification_rate_limits FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE user_notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_delivery_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_digests ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_personalization ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE in_app_notifications ENABLE ROW LEVEL SECURITY;

-- User can only access their own notification preferences
CREATE POLICY "Users can access own notification preferences" ON user_notification_preferences
    FOR ALL USING (auth.uid() = user_id);

-- User can only see their own notifications
CREATE POLICY "Users can access own notifications" ON notifications
    FOR ALL USING (auth.uid() = recipient_id);

-- User can only see their own delivery logs
CREATE POLICY "Users can access own delivery logs" ON notification_delivery_logs
    FOR ALL USING (
        auth.uid() IN (
            SELECT recipient_id FROM notifications WHERE id = notification_delivery_logs.notification_id
        )
    );

-- User can only access their own digests
CREATE POLICY "Users can access own digests" ON notification_digests
    FOR ALL USING (auth.uid() = user_id);

-- User can only access their own personalization
CREATE POLICY "Users can access own personalization" ON notification_personalization
    FOR ALL USING (auth.uid() = user_id);

-- User can only access their own rate limits
CREATE POLICY "Users can access own rate limits" ON notification_rate_limits
    FOR ALL USING (auth.uid() = user_id);

-- User can only access their own in-app notifications
CREATE POLICY "Users can access own in-app notifications" ON in_app_notifications
    FOR ALL USING (auth.uid() = user_id);

-- Indexes for performance optimization

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_notifications_recipient_status ON notifications(recipient_id, status);
CREATE INDEX IF NOT EXISTS idx_notifications_type_priority ON notifications(type, priority);
CREATE INDEX IF NOT EXISTS idx_delivery_logs_status_channel ON notification_delivery_logs(status, channel);
CREATE INDEX IF NOT EXISTS idx_in_app_notifications_user_unread ON in_app_notifications(user_id, read) WHERE read = false;
CREATE INDEX IF NOT EXISTS idx_notification_queue_status_priority ON notification_queue(status, priority) WHERE status = 'pending';

-- Partial indexes for active records
CREATE INDEX IF NOT EXISTS idx_notification_templates_active ON notification_templates(type, channel) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_notification_providers_active ON notification_providers(type, priority) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_notification_rules_active ON notification_rules(priority) WHERE is_active = true;

-- Time-based partitioning for analytics table (PostgreSQL 12+)
-- This would be implemented based on data volume and retention requirements

-- Views for common queries

-- Active notification summary
CREATE OR REPLACE VIEW notification_summary AS
SELECT 
    n.id,
    n.type,
    n.channel,
    n.priority,
    n.title,
    n.status,
    n.created_at,
    n.sent_at,
    n.delivered_at,
    u.email as recipient_email,
    dl.delivery_time,
    dl.opened_at,
    dl.clicked_at
FROM notifications n
JOIN auth.users u ON n.recipient_id = u.id
LEFT JOIN notification_delivery_logs dl ON n.id = dl.notification_id
WHERE n.created_at >= NOW() - INTERVAL '30 days';

-- User engagement metrics
CREATE OR REPLACE VIEW user_engagement_metrics AS
SELECT 
    n.recipient_id as user_id,
    COUNT(*) as total_notifications,
    COUNT(CASE WHEN dl.status = 'delivered' THEN 1 END) as delivered_count,
    COUNT(CASE WHEN dl.opened_at IS NOT NULL THEN 1 END) as opened_count,
    COUNT(CASE WHEN dl.clicked_at IS NOT NULL THEN 1 END) as clicked_count,
    COUNT(CASE WHEN dl.unsubscribed_at IS NOT NULL THEN 1 END) as unsubscribed_count,
    COALESCE(AVG(dl.delivery_time), 0) as avg_delivery_time,
    CASE 
        WHEN COUNT(*) > 0 THEN COUNT(CASE WHEN dl.status = 'delivered' THEN 1 END)::FLOAT / COUNT(*)
        ELSE 0 
    END as delivery_rate,
    CASE 
        WHEN COUNT(CASE WHEN dl.status = 'delivered' THEN 1 END) > 0 
        THEN COUNT(CASE WHEN dl.opened_at IS NOT NULL THEN 1 END)::FLOAT / COUNT(CASE WHEN dl.status = 'delivered' THEN 1 END)
        ELSE 0 
    END as open_rate,
    CASE 
        WHEN COUNT(CASE WHEN dl.opened_at IS NOT NULL THEN 1 END) > 0 
        THEN COUNT(CASE WHEN dl.clicked_at IS NOT NULL THEN 1 END)::FLOAT / COUNT(CASE WHEN dl.opened_at IS NOT NULL THEN 1 END)
        ELSE 0 
    END as click_rate
FROM notifications n
LEFT JOIN notification_delivery_logs dl ON n.id = dl.notification_id
WHERE n.created_at >= NOW() - INTERVAL '90 days'
GROUP BY n.recipient_id;

-- System health metrics
CREATE OR REPLACE VIEW notification_system_health AS
SELECT 
    'overall' as metric_type,
    COUNT(*) as total_notifications,
    COUNT(CASE WHEN status = 'delivered' THEN 1 END) as delivered_count,
    COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed_count,
    AVG(CASE WHEN status = 'delivered' THEN delivery_time END) as avg_delivery_time,
    DATE_TRUNC('hour', created_at) as time_bucket
FROM notification_delivery_logs 
WHERE created_at >= NOW() - INTERVAL '24 hours'
GROUP BY DATE_TRUNC('hour', created_at)
ORDER BY time_bucket;

COMMENT ON TABLE notifications IS 'Main notification records with content and scheduling information';
COMMENT ON TABLE notification_templates IS 'Reusable notification templates with variable substitution';
COMMENT ON TABLE notification_providers IS 'External service providers for notification delivery';
COMMENT ON TABLE notification_delivery_logs IS 'Detailed logs of notification delivery attempts and results';
COMMENT ON TABLE user_notification_preferences IS 'User preferences for notification channels and frequency';
COMMENT ON TABLE notification_campaigns IS 'Bulk notification campaigns with targeting and analytics';
COMMENT ON TABLE notification_analytics IS 'Aggregated analytics data for reporting and insights';
COMMENT ON TABLE in_app_notifications IS 'In-application notifications separate from external channels';

-- Grant appropriate permissions
GRANT SELECT, INSERT, UPDATE ON notification_templates TO authenticated;
GRANT SELECT ON notification_providers TO authenticated;
GRANT ALL ON user_notification_preferences TO authenticated;
GRANT SELECT, INSERT, UPDATE ON notifications TO authenticated;
GRANT SELECT ON notification_delivery_logs TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON in_app_notifications TO authenticated;