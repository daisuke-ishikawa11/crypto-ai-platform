-- 🏦 DeFi System Enhancements Database Schema
-- Advanced DeFi protocol monitoring, risk assessment, and performance tracking

-- ===================================
-- 1. Enhanced DeFi Protocol Management
-- ===================================

-- Add new columns to existing defi_protocols table
ALTER TABLE defi_protocols ADD COLUMN IF NOT EXISTS 
  contract_address TEXT,
  audit_score INTEGER CHECK (audit_score >= 0 AND audit_score <= 100),
  governance_token TEXT,
  total_volume_24h DECIMAL DEFAULT 0,
  user_count INTEGER DEFAULT 0,
  transaction_count INTEGER DEFAULT 0,
  fee_structure JSONB DEFAULT '{}',
  supported_networks TEXT[] DEFAULT '{}',
  integration_status TEXT DEFAULT 'active',
  last_audit_date TIMESTAMPTZ,
  community_score INTEGER CHECK (community_score >= 0 AND community_score <= 100),
  liquidity_score INTEGER CHECK (liquidity_score >= 0 AND liquidity_score <= 100),
  security_incidents INTEGER DEFAULT 0,
  uptime_percentage DECIMAL DEFAULT 100.0,
  api_response_time INTEGER DEFAULT 0;

-- Add constraint for integration_status
ALTER TABLE defi_protocols ADD CONSTRAINT IF NOT EXISTS 
  valid_integration_status CHECK (integration_status IN ('active', 'maintenance', 'deprecated', 'disabled'));

-- ===================================
-- 2. DeFi Protocol Health Metrics
-- ===================================

CREATE TABLE IF NOT EXISTS defi_protocol_health_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  protocol_name TEXT NOT NULL,
  availability DECIMAL NOT NULL CHECK (availability >= 0 AND availability <= 100),
  average_response_time INTEGER NOT NULL,
  error_rate DECIMAL NOT NULL CHECK (error_rate >= 0 AND error_rate <= 100),
  total_requests INTEGER NOT NULL DEFAULT 0,
  successful_requests INTEGER NOT NULL DEFAULT 0,
  failed_requests INTEGER NOT NULL DEFAULT 0,
  last_successful_call TIMESTAMPTZ,
  last_failed_call TIMESTAMPTZ,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_request_counts CHECK (
    total_requests = successful_requests + failed_requests
  )
);

-- Create unique constraint for protocol health metrics
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_protocol_health 
ON defi_protocol_health_metrics(protocol_name);

-- ===================================
-- 3. DeFi Business Metrics
-- ===================================

CREATE TABLE IF NOT EXISTS defi_business_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  total_tvl DECIMAL NOT NULL DEFAULT 0,
  total_volume_24h DECIMAL NOT NULL DEFAULT 0,
  protocols_monitored INTEGER NOT NULL DEFAULT 0,
  alerts_generated INTEGER NOT NULL DEFAULT 0,
  users_active INTEGER NOT NULL DEFAULT 0,
  data_quality_score INTEGER NOT NULL DEFAULT 100 CHECK (data_quality_score >= 0 AND data_quality_score <= 100),
  market_volatility DECIMAL DEFAULT 0,
  cross_chain_volume DECIMAL DEFAULT 0,
  defi_dominance_index DECIMAL DEFAULT 0,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ===================================
-- 4. Liquidity Pool Tracking
-- ===================================

CREATE TABLE IF NOT EXISTS defi_liquidity_pools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  protocol_id UUID REFERENCES defi_protocols(id) ON DELETE CASCADE,
  pool_address TEXT NOT NULL,
  pool_name TEXT NOT NULL,
  pool_type TEXT NOT NULL,
  token_0_address TEXT NOT NULL,
  token_0_symbol TEXT NOT NULL,
  token_0_name TEXT NOT NULL,
  token_1_address TEXT NOT NULL,
  token_1_symbol TEXT NOT NULL,
  token_1_name TEXT NOT NULL,
  total_liquidity_usd DECIMAL NOT NULL DEFAULT 0,
  volume_24h_usd DECIMAL NOT NULL DEFAULT 0,
  volume_7d_usd DECIMAL NOT NULL DEFAULT 0,
  fees_24h_usd DECIMAL NOT NULL DEFAULT 0,
  apy DECIMAL DEFAULT 0,
  apr DECIMAL DEFAULT 0,
  fee_tier DECIMAL NOT NULL DEFAULT 0,
  liquidity_utilization DECIMAL DEFAULT 0,
  impermanent_loss_risk TEXT DEFAULT 'medium',
  last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_pool_type CHECK (pool_type IN ('standard', 'weighted', 'stable', 'concentrated', 'meta', 'exotic')),
  CONSTRAINT valid_impermanent_loss_risk CHECK (impermanent_loss_risk IN ('very_low', 'low', 'medium', 'high', 'very_high')),
  CONSTRAINT valid_liquidity CHECK (total_liquidity_usd >= 0),
  CONSTRAINT valid_apy CHECK (apy IS NULL OR apy >= 0),
  
  -- Unique constraint
  UNIQUE(protocol_id, pool_address)
);

-- ===================================
-- 5. Yield Farming Opportunities
-- ===================================

CREATE TABLE IF NOT EXISTS defi_yield_farms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  protocol_id UUID REFERENCES defi_protocols(id) ON DELETE CASCADE,
  farm_name TEXT NOT NULL,
  farm_address TEXT NOT NULL,
  staking_token TEXT NOT NULL,
  reward_tokens TEXT[] NOT NULL,
  total_staked_usd DECIMAL NOT NULL DEFAULT 0,
  apy DECIMAL NOT NULL DEFAULT 0,
  apr DECIMAL NOT NULL DEFAULT 0,
  base_apy DECIMAL DEFAULT 0,
  reward_apy DECIMAL DEFAULT 0,
  lock_period_days INTEGER DEFAULT 0,
  withdrawal_fee_percent DECIMAL DEFAULT 0,
  deposit_fee_percent DECIMAL DEFAULT 0,
  auto_compound BOOLEAN DEFAULT FALSE,
  compound_frequency_hours INTEGER,
  risk_level TEXT DEFAULT 'medium',
  participant_count INTEGER DEFAULT 0,
  daily_rewards_usd DECIMAL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  started_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_risk_level CHECK (risk_level IN ('very_low', 'low', 'medium', 'high', 'very_high')),
  CONSTRAINT valid_apy CHECK (apy >= 0),
  CONSTRAINT valid_fees CHECK (
    withdrawal_fee_percent >= 0 AND withdrawal_fee_percent <= 100 AND
    deposit_fee_percent >= 0 AND deposit_fee_percent <= 100
  ),
  CONSTRAINT valid_lock_period CHECK (lock_period_days >= 0),
  CONSTRAINT valid_compound_frequency CHECK (
    (auto_compound = FALSE AND compound_frequency_hours IS NULL) OR
    (auto_compound = TRUE AND compound_frequency_hours IS NOT NULL AND compound_frequency_hours > 0)
  ),
  
  -- Unique constraint
  UNIQUE(protocol_id, farm_address)
);

-- ===================================
-- 6. DeFi Risk Assessments
-- ===================================

CREATE TABLE IF NOT EXISTS defi_risk_assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  protocol_id UUID REFERENCES defi_protocols(id) ON DELETE CASCADE,
  overall_score INTEGER NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
  risk_level TEXT NOT NULL,
  smart_contract_score INTEGER CHECK (smart_contract_score >= 0 AND smart_contract_score <= 100),
  liquidity_score INTEGER CHECK (liquidity_score >= 0 AND liquidity_score <= 100),
  market_score INTEGER CHECK (market_score >= 0 AND market_score <= 100),
  governance_score INTEGER CHECK (governance_score >= 0 AND governance_score <= 100),
  regulatory_score INTEGER CHECK (regulatory_score >= 0 AND regulatory_score <= 100),
  operational_score INTEGER CHECK (operational_score >= 0 AND operational_score <= 100),
  risk_factors JSONB DEFAULT '[]',
  recommendations TEXT[] DEFAULT '{}',
  peer_comparison JSONB DEFAULT '[]',
  confidence_level DECIMAL DEFAULT 0.0 CHECK (confidence_level >= 0.0 AND confidence_level <= 1.0),
  assessment_version TEXT DEFAULT '1.0',
  assessed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_risk_level CHECK (risk_level IN ('very_low', 'low', 'medium', 'high', 'very_high', 'critical')),
  CONSTRAINT valid_expires_at CHECK (expires_at IS NULL OR expires_at > assessed_at),
  
  -- Unique constraint for latest assessment per protocol
  UNIQUE(protocol_id)
);

-- ===================================
-- 7. Gas Price Tracking
-- ===================================

CREATE TABLE IF NOT EXISTS gas_price_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  network TEXT NOT NULL,
  gas_price_gwei DECIMAL NOT NULL,
  gas_price_usd DECIMAL NOT NULL DEFAULT 0,
  slow_gas_price DECIMAL,
  standard_gas_price DECIMAL,
  fast_gas_price DECIMAL,
  network_congestion TEXT DEFAULT 'medium',
  pending_transactions INTEGER DEFAULT 0,
  block_utilization DECIMAL DEFAULT 0,
  base_fee DECIMAL,
  priority_fee DECIMAL,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_network CHECK (network IN ('ethereum', 'polygon', 'bsc', 'arbitrum', 'optimism', 'avalanche')),
  CONSTRAINT valid_congestion CHECK (network_congestion IN ('low', 'medium', 'high', 'critical')),
  CONSTRAINT valid_gas_prices CHECK (
    gas_price_gwei >= 0 AND
    (slow_gas_price IS NULL OR slow_gas_price >= 0) AND
    (standard_gas_price IS NULL OR standard_gas_price >= 0) AND
    (fast_gas_price IS NULL OR fast_gas_price >= 0)
  ),
  CONSTRAINT valid_utilization CHECK (block_utilization >= 0 AND block_utilization <= 100)
);

-- ===================================
-- 8. DeFi Alert Conditions (Enhanced)
-- ===================================

CREATE TABLE IF NOT EXISTS defi_alert_conditions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  protocol_id UUID REFERENCES defi_protocols(id) ON DELETE CASCADE,
  pool_id UUID REFERENCES defi_liquidity_pools(id) ON DELETE CASCADE,
  network TEXT,
  type TEXT NOT NULL,
  thresholds JSONB NOT NULL DEFAULT '{}',
  notifications JSONB NOT NULL DEFAULT '{}',
  enabled BOOLEAN NOT NULL DEFAULT TRUE,
  last_triggered TIMESTAMPTZ,
  trigger_count INTEGER NOT NULL DEFAULT 0,
  cooldown_minutes INTEGER NOT NULL DEFAULT 60,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_alert_type CHECK (type IN (
    'tvl_change', 'apy_change', 'liquidity_drop', 'risk_increase', 
    'gas_spike', 'governance_proposal', 'pool_imbalance', 'yield_opportunity'
  )),
  CONSTRAINT valid_name_length CHECK (LENGTH(name) BETWEEN 1 AND 100),
  CONSTRAINT valid_cooldown CHECK (cooldown_minutes >= 0),
  CONSTRAINT valid_trigger_count CHECK (trigger_count >= 0)
);

-- ===================================
-- 9. DeFi Alerts History
-- ===================================

CREATE TABLE IF NOT EXISTS defi_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  condition_id UUID NOT NULL REFERENCES defi_alert_conditions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  protocol_id UUID REFERENCES defi_protocols(id) ON DELETE SET NULL,
  network TEXT,
  type TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'info',
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  details JSONB DEFAULT '{}',
  current_value DECIMAL,
  threshold_value DECIMAL,
  change_percent DECIMAL,
  triggered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  acknowledged BOOLEAN NOT NULL DEFAULT FALSE,
  acknowledged_at TIMESTAMPTZ,
  resolved BOOLEAN NOT NULL DEFAULT FALSE,
  resolved_at TIMESTAMPTZ,
  
  -- Constraints
  CONSTRAINT valid_severity CHECK (severity IN ('info', 'warning', 'critical')),
  CONSTRAINT valid_title_length CHECK (LENGTH(title) BETWEEN 1 AND 200),
  CONSTRAINT valid_message_length CHECK (LENGTH(message) > 0),
  CONSTRAINT valid_acknowledgment CHECK (
    (acknowledged = FALSE AND acknowledged_at IS NULL) OR
    (acknowledged = TRUE AND acknowledged_at IS NOT NULL)
  ),
  CONSTRAINT valid_resolution CHECK (
    (resolved = FALSE AND resolved_at IS NULL) OR
    (resolved = TRUE AND resolved_at IS NOT NULL)
  )
);

-- ===================================
-- 10. Protocol Governance Tracking
-- ===================================

CREATE TABLE IF NOT EXISTS defi_governance_proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  protocol_id UUID REFERENCES defi_protocols(id) ON DELETE CASCADE,
  proposal_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  proposer_address TEXT,
  status TEXT NOT NULL,
  voting_start TIMESTAMPTZ,
  voting_end TIMESTAMPTZ,
  execution_eta TIMESTAMPTZ,
  votes_for DECIMAL DEFAULT 0,
  votes_against DECIMAL DEFAULT 0,
  votes_abstain DECIMAL DEFAULT 0,
  total_votes DECIMAL DEFAULT 0,
  quorum_required DECIMAL,
  quorum_reached BOOLEAN DEFAULT FALSE,
  proposal_type TEXT,
  impact_level TEXT DEFAULT 'medium',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_status CHECK (status IN ('pending', 'active', 'succeeded', 'defeated', 'queued', 'executed', 'cancelled')),
  CONSTRAINT valid_impact_level CHECK (impact_level IN ('low', 'medium', 'high', 'critical')),
  CONSTRAINT valid_voting_period CHECK (
    voting_start IS NULL OR voting_end IS NULL OR voting_end > voting_start
  ),
  
  -- Unique constraint
  UNIQUE(protocol_id, proposal_id)
);

-- ===================================
-- 11. Cross-Chain Bridge Tracking
-- ===================================

CREATE TABLE IF NOT EXISTS defi_bridge_transfers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bridge_protocol TEXT NOT NULL,
  source_network TEXT NOT NULL,
  destination_network TEXT NOT NULL,
  token_address TEXT NOT NULL,
  token_symbol TEXT NOT NULL,
  amount DECIMAL NOT NULL,
  amount_usd DECIMAL NOT NULL,
  fee_amount DECIMAL DEFAULT 0,
  fee_usd DECIMAL DEFAULT 0,
  transaction_hash TEXT NOT NULL,
  source_transaction_hash TEXT,
  destination_transaction_hash TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  processing_time_minutes INTEGER,
  user_address TEXT,
  initiated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  failed_at TIMESTAMPTZ,
  
  -- Constraints
  CONSTRAINT valid_status CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
  CONSTRAINT valid_amount CHECK (amount > 0 AND amount_usd > 0),
  CONSTRAINT valid_fee CHECK (fee_amount >= 0 AND fee_usd >= 0),
  CONSTRAINT valid_completion CHECK (
    (status = 'completed' AND completed_at IS NOT NULL) OR
    (status = 'failed' AND failed_at IS NOT NULL) OR
    (status NOT IN ('completed', 'failed'))
  )
);

-- ===================================
-- 12. Indexes for Performance
-- ===================================

-- Protocol health metrics indexes
CREATE INDEX IF NOT EXISTS idx_protocol_health_recorded_at 
ON defi_protocol_health_metrics(recorded_at);

CREATE INDEX IF NOT EXISTS idx_protocol_health_availability 
ON defi_protocol_health_metrics(availability);

-- Business metrics indexes
CREATE INDEX IF NOT EXISTS idx_business_metrics_recorded_at 
ON defi_business_metrics(recorded_at);

-- Liquidity pools indexes
CREATE INDEX IF NOT EXISTS idx_liquidity_pools_protocol_id 
ON defi_liquidity_pools(protocol_id);

CREATE INDEX IF NOT EXISTS idx_liquidity_pools_liquidity_usd 
ON defi_liquidity_pools(total_liquidity_usd DESC);

CREATE INDEX IF NOT EXISTS idx_liquidity_pools_apy 
ON defi_liquidity_pools(apy DESC);

CREATE INDEX IF NOT EXISTS idx_liquidity_pools_updated 
ON defi_liquidity_pools(last_updated);

-- Yield farms indexes
CREATE INDEX IF NOT EXISTS idx_yield_farms_protocol_id 
ON defi_yield_farms(protocol_id);

CREATE INDEX IF NOT EXISTS idx_yield_farms_apy 
ON defi_yield_farms(apy DESC);

CREATE INDEX IF NOT EXISTS idx_yield_farms_active 
ON defi_yield_farms(is_active) WHERE is_active = TRUE;

CREATE INDEX IF NOT EXISTS idx_yield_farms_updated 
ON defi_yield_farms(last_updated);

-- Risk assessments indexes
CREATE INDEX IF NOT EXISTS idx_risk_assessments_protocol_id 
ON defi_risk_assessments(protocol_id);

CREATE INDEX IF NOT EXISTS idx_risk_assessments_overall_score 
ON defi_risk_assessments(overall_score);

CREATE INDEX IF NOT EXISTS idx_risk_assessments_risk_level 
ON defi_risk_assessments(risk_level);

-- Gas price indexes
CREATE INDEX IF NOT EXISTS idx_gas_price_network_recorded 
ON gas_price_history(network, recorded_at DESC);

CREATE INDEX IF NOT EXISTS idx_gas_price_recorded_at 
ON gas_price_history(recorded_at);

-- DeFi alerts indexes
CREATE INDEX IF NOT EXISTS idx_defi_alert_conditions_user_id 
ON defi_alert_conditions(user_id);

CREATE INDEX IF NOT EXISTS idx_defi_alert_conditions_protocol_id 
ON defi_alert_conditions(protocol_id);

CREATE INDEX IF NOT EXISTS idx_defi_alert_conditions_enabled 
ON defi_alert_conditions(enabled) WHERE enabled = TRUE;

CREATE INDEX IF NOT EXISTS idx_defi_alerts_user_id 
ON defi_alerts(user_id);

CREATE INDEX IF NOT EXISTS idx_defi_alerts_triggered_at 
ON defi_alerts(triggered_at DESC);

CREATE INDEX IF NOT EXISTS idx_defi_alerts_severity 
ON defi_alerts(severity);

CREATE INDEX IF NOT EXISTS idx_defi_alerts_acknowledged 
ON defi_alerts(acknowledged);

-- Governance proposals indexes
CREATE INDEX IF NOT EXISTS idx_governance_proposals_protocol_id 
ON defi_governance_proposals(protocol_id);

CREATE INDEX IF NOT EXISTS idx_governance_proposals_status 
ON defi_governance_proposals(status);

CREATE INDEX IF NOT EXISTS idx_governance_proposals_voting_end 
ON defi_governance_proposals(voting_end);

-- Bridge transfers indexes
CREATE INDEX IF NOT EXISTS idx_bridge_transfers_status 
ON defi_bridge_transfers(status);

CREATE INDEX IF NOT EXISTS idx_bridge_transfers_networks 
ON defi_bridge_transfers(source_network, destination_network);

CREATE INDEX IF NOT EXISTS idx_bridge_transfers_initiated_at 
ON defi_bridge_transfers(initiated_at DESC);

CREATE INDEX IF NOT EXISTS idx_bridge_transfers_user_address 
ON defi_bridge_transfers(user_address);

-- ===================================
-- 13. Row Level Security (RLS)
-- ===================================

-- Enable RLS on user-specific tables
ALTER TABLE defi_alert_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE defi_alerts ENABLE ROW LEVEL SECURITY;

-- DeFi alert conditions RLS
CREATE POLICY "Users can manage their own DeFi alert conditions"
ON defi_alert_conditions FOR ALL
TO authenticated
USING (auth.uid() = user_id);

-- DeFi alerts RLS  
CREATE POLICY "Users can view their own DeFi alerts"
ON defi_alerts FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "System can insert DeFi alerts"
ON defi_alerts FOR INSERT
TO authenticated
WITH CHECK (true); -- System service can insert alerts

-- ===================================
-- 14. Triggers for Data Integrity
-- ===================================

-- Update timestamp trigger for various tables
CREATE TRIGGER update_defi_alert_conditions_updated_at
    BEFORE UPDATE ON defi_alert_conditions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_liquidity_pools_updated_at
    BEFORE UPDATE ON defi_liquidity_pools
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_yield_farms_updated_at
    BEFORE UPDATE ON defi_yield_farms
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_governance_proposals_updated_at
    BEFORE UPDATE ON defi_governance_proposals
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ===================================
-- 15. Views for Common Queries
-- ===================================

-- Top performing liquidity pools
CREATE OR REPLACE VIEW top_liquidity_pools AS
SELECT 
  lp.*,
  p.name as protocol_name,
  p.blockchain,
  CASE 
    WHEN lp.apy > 50 THEN 'high'
    WHEN lp.apy > 20 THEN 'medium'
    ELSE 'low'
  END as yield_category
FROM defi_liquidity_pools lp
JOIN defi_protocols p ON p.id = lp.protocol_id
WHERE lp.total_liquidity_usd > 100000 -- Min $100k liquidity
  AND p.is_active = TRUE
ORDER BY lp.apy DESC, lp.total_liquidity_usd DESC;

-- Active yield farming opportunities
CREATE OR REPLACE VIEW active_yield_farms AS
SELECT 
  yf.*,
  p.name as protocol_name,
  p.blockchain,
  CASE 
    WHEN yf.apy > 100 THEN 'very_high'
    WHEN yf.apy > 50 THEN 'high'
    WHEN yf.apy > 20 THEN 'medium'
    ELSE 'low'
  END as yield_tier
FROM defi_yield_farms yf
JOIN defi_protocols p ON p.id = yf.protocol_id
WHERE yf.is_active = TRUE
  AND (yf.ends_at IS NULL OR yf.ends_at > NOW())
  AND yf.total_staked_usd > 50000 -- Min $50k staked
ORDER BY yf.apy DESC;

-- Protocol risk overview
CREATE OR REPLACE VIEW protocol_risk_overview AS
SELECT 
  p.name,
  p.protocol_type,
  p.blockchain,
  p.current_tvl,
  ra.overall_score,
  ra.risk_level,
  ra.smart_contract_score,
  ra.liquidity_score,
  ra.governance_score,
  ra.assessed_at,
  phm.availability,
  phm.error_rate
FROM defi_protocols p
LEFT JOIN defi_risk_assessments ra ON ra.protocol_id = p.id
LEFT JOIN defi_protocol_health_metrics phm ON phm.protocol_name = p.name
WHERE p.is_active = TRUE
ORDER BY ra.overall_score DESC NULLS LAST, p.current_tvl DESC;

-- Recent DeFi alerts summary
CREATE OR REPLACE VIEW recent_defi_alerts_summary AS
SELECT 
  DATE_TRUNC('day', triggered_at) as alert_date,
  severity,
  COUNT(*) as alert_count,
  COUNT(CASE WHEN acknowledged THEN 1 END) as acknowledged_count,
  AVG(CASE WHEN acknowledged_at IS NOT NULL 
      THEN EXTRACT(EPOCH FROM (acknowledged_at - triggered_at))/60 
      END) as avg_response_time_minutes
FROM defi_alerts
WHERE triggered_at >= NOW() - INTERVAL '7 days'
GROUP BY DATE_TRUNC('day', triggered_at), severity
ORDER BY alert_date DESC, severity;

-- ===================================
-- 16. Stored Procedures
-- ===================================

-- Calculate protocol health score
CREATE OR REPLACE FUNCTION calculate_protocol_health_score(protocol_name_param TEXT)
RETURNS TABLE(
  protocol_name TEXT,
  health_score INTEGER,
  availability DECIMAL,
  error_rate DECIMAL,
  response_time INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    phm.protocol_name,
    CASE 
      WHEN phm.availability >= 99 AND phm.error_rate <= 1 THEN 95
      WHEN phm.availability >= 95 AND phm.error_rate <= 5 THEN 80
      WHEN phm.availability >= 90 AND phm.error_rate <= 10 THEN 65
      WHEN phm.availability >= 80 AND phm.error_rate <= 20 THEN 50
      ELSE 30
    END::INTEGER as health_score,
    phm.availability,
    phm.error_rate,
    phm.average_response_time
  FROM defi_protocol_health_metrics phm
  WHERE phm.protocol_name = protocol_name_param;
END;
$$ LANGUAGE plpgsql;

-- Get top yield opportunities with risk assessment
CREATE OR REPLACE FUNCTION get_yield_opportunities_with_risk(
  min_apy DECIMAL DEFAULT 10.0,
  max_risk_level TEXT DEFAULT 'high'
)
RETURNS TABLE(
  farm_name TEXT,
  protocol_name TEXT,
  apy DECIMAL,
  risk_level TEXT,
  total_staked_usd DECIMAL,
  lock_period_days INTEGER,
  overall_score INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    yf.farm_name,
    p.name as protocol_name,
    yf.apy,
    yf.risk_level,
    yf.total_staked_usd,
    yf.lock_period_days,
    COALESCE(ra.overall_score, 50) as overall_score
  FROM defi_yield_farms yf
  JOIN defi_protocols p ON p.id = yf.protocol_id
  LEFT JOIN defi_risk_assessments ra ON ra.protocol_id = yf.protocol_id
  WHERE yf.is_active = TRUE
    AND yf.apy >= min_apy
    AND yf.risk_level IN (
      CASE max_risk_level
        WHEN 'very_low' THEN ARRAY['very_low']::TEXT[]
        WHEN 'low' THEN ARRAY['very_low', 'low']::TEXT[]
        WHEN 'medium' THEN ARRAY['very_low', 'low', 'medium']::TEXT[]
        WHEN 'high' THEN ARRAY['very_low', 'low', 'medium', 'high']::TEXT[]
        ELSE ARRAY['very_low', 'low', 'medium', 'high', 'very_high']::TEXT[]
      END
    )
  ORDER BY yf.apy DESC, COALESCE(ra.overall_score, 50) DESC;
END;
$$ LANGUAGE plpgsql;