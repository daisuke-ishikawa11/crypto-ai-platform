-- DeFi Suite API performance indexes

-- Protocol health metrics
CREATE INDEX IF NOT EXISTS idx_defi_protocol_health_metrics_recorded_at
  ON defi_protocol_health_metrics(recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_defi_protocol_health_metrics_protocol
  ON defi_protocol_health_metrics(protocol_name);

-- Alerts
CREATE INDEX IF NOT EXISTS idx_defi_alerts_triggered_at
  ON defi_alerts(triggered_at DESC);
CREATE INDEX IF NOT EXISTS idx_defi_alerts_severity
  ON defi_alerts(severity);
CREATE INDEX IF NOT EXISTS idx_defi_alerts_acknowledged
  ON defi_alerts(acknowledged);
CREATE INDEX IF NOT EXISTS idx_defi_alerts_protocol
  ON defi_alerts(protocol_id);

-- Business metrics
CREATE INDEX IF NOT EXISTS idx_defi_business_metrics_recorded_at
  ON defi_business_metrics(recorded_at DESC);

-- Gas price history (if present)
DO $$ BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'gas_price_history'
  ) THEN
    EXECUTE 'CREATE INDEX IF NOT EXISTS idx_gas_price_history_recorded_at ON gas_price_history(recorded_at DESC)';
  END IF;
END $$;

-- Protocols
CREATE INDEX IF NOT EXISTS idx_defi_protocols_current_tvl
  ON defi_protocols(current_tvl DESC);
CREATE INDEX IF NOT EXISTS idx_defi_protocols_is_active
  ON defi_protocols(is_active);

-- Liquidity pools
CREATE INDEX IF NOT EXISTS idx_defi_liquidity_pools_total_liquidity
  ON defi_liquidity_pools(total_liquidity_usd DESC);
CREATE INDEX IF NOT EXISTS idx_defi_liquidity_pools_apy
  ON defi_liquidity_pools(apy DESC);
CREATE INDEX IF NOT EXISTS idx_defi_liquidity_pools_risk
  ON defi_liquidity_pools(impermanent_loss_risk);
CREATE INDEX IF NOT EXISTS idx_defi_liquidity_pools_protocol
  ON defi_liquidity_pools(protocol_id);
CREATE INDEX IF NOT EXISTS idx_defi_liquidity_pools_last_updated
  ON defi_liquidity_pools(last_updated DESC);

-- Liquidity pool history
CREATE INDEX IF NOT EXISTS idx_defi_liquidity_pool_history_pool
  ON defi_liquidity_pool_history(pool_id);
CREATE INDEX IF NOT EXISTS idx_defi_liquidity_pool_history_recorded_at
  ON defi_liquidity_pool_history(recorded_at DESC);
