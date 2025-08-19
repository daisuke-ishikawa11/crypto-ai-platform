// Dependency inversion ports for the @crypto/defi package
// No external runtime dependencies; host apps can implement these interfaces.

export interface LoggerPort {
  info(message: string, context?: Record<string, unknown>): void;
  warn(message: string, context?: Record<string, unknown>): void;
  error(message: string, context?: Record<string, unknown>): void;
  debug(message: string, context?: Record<string, unknown>): void;
}

export interface ProtocolHealthPersistenceRow {
  protocol_name: string;
  availability: number;
  average_response_time: number;
  error_rate: number;
  total_requests: number;
  successful_requests: number;
  failed_requests: number;
  last_successful_call?: Date;
  last_failed_call?: Date;
  recorded_at: Date;
}

export interface BusinessMetricPersistenceRow {
  total_tvl: number;
  total_volume_24h: number;
  protocols_monitored: number;
  alerts_generated: number;
  users_active: number;
  data_quality_score: number;
  recorded_at: Date;
}

export interface MetricsPersistencePort {
  saveProtocolHealthMetrics(rows: ProtocolHealthPersistenceRow[]): Promise<void>;
  insertBusinessMetric(row: BusinessMetricPersistenceRow): Promise<void>;
}

// These mirror the needs of MonitoringEngine; concrete implementations live in the host app
export interface AlertsPersistencePort {
  // Alert conditions are domain-level; return already-shaped objects consumed by the engine
  loadAlertConditions(): Promise<Array<Record<string, unknown>>>; // domain mapping is done in host or engine depending on types

  insertDefiAlert(payload: Record<string, unknown>): Promise<void>;
  insertSystemAlert(payload: Record<string, unknown>): Promise<void>;

  upsertProtocolData(payload: Record<string, unknown>): Promise<void>;
  upsertRiskAssessment(payload: Record<string, unknown>): Promise<void>;
}

// Minimal persistence for user tier manager, intentionally generic to avoid leaking DB specifics
export interface UserTierPersistencePort {
  upsertUserProfile(userId: string, profile: Record<string, unknown>): Promise<Record<string, unknown>>;
  getUserProfileByUserId(userId: string): Promise<Record<string, unknown> | null>;
  updateOnboarding(userId: string, onboarding: Record<string, unknown>): Promise<void>;
  updateCompletedTutorials(userId: string, completed: string[]): Promise<void>;
  updateSubscriptionTier(userId: string, tier: string): Promise<void>;
  getUserUsage(userId: string): Promise<Array<Record<string, unknown>>>;
}
