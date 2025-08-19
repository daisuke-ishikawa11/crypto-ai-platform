import type { AlertsPersistencePort, MetricsPersistencePort, UserTierPersistencePort } from '@crypto/defi'
import { getAdminClient } from '@/lib/supabase/server'

// NOTE: ここでは最小のモック実装を提供。将来的にSupabaseへ差し替え。
export const metricsPersistence: MetricsPersistencePort = {
  async saveProtocolHealthMetrics(rows) {
    const supabase = getAdminClient()
    if (rows.length === 0) return
    const { error } = await supabase.from('defi_protocol_health_metrics').upsert(rows.map(r => ({
      protocol_name: r.protocol_name,
      availability: r.availability,
      average_response_time: r.average_response_time,
      error_rate: r.error_rate,
      total_requests: r.total_requests,
      successful_requests: r.successful_requests,
      failed_requests: r.failed_requests,
      last_successful_call: r.last_successful_call ?? null,
      last_failed_call: r.last_failed_call ?? null,
      recorded_at: r.recorded_at.toISOString(),
    })))
    if (error) throw error
  },
  async insertBusinessMetric(row) {
    const supabase = getAdminClient()
    const { error } = await supabase.from('defi_business_metrics').insert({
      total_tvl: row.total_tvl,
      total_volume_24h: row.total_volume_24h,
      protocols_monitored: row.protocols_monitored,
      alerts_generated: row.alerts_generated,
      users_active: row.users_active,
      data_quality_score: row.data_quality_score,
      recorded_at: row.recorded_at.toISOString(),
    })
    if (error) throw error
  },
}

export const alertsPersistence: AlertsPersistencePort = {
  async loadAlertConditions() {
    const supabase = getAdminClient()
    const { data, error } = await supabase
      .from('defi_alert_conditions')
      .select('*')
      .eq('enabled', true)
    if (error) throw error
    return (data ?? []) as Array<Record<string, unknown>>
  },
  async insertDefiAlert(payload) {
    const supabase = getAdminClient()
    const { error } = await supabase.from('defi_alerts').insert({
      ...payload,
      triggered_at: (payload.triggered_at as Date)?.toISOString?.() ?? payload.triggered_at,
    })
    if (error) throw error
  },
  async insertSystemAlert(payload) {
    const supabase = getAdminClient()
    const { error } = await supabase.from('system_alerts').insert(payload)
    if (error) throw error
  },
  async upsertProtocolData(payload) {
    const supabase = getAdminClient()
    const { error } = await supabase.from('defi_protocol_data').upsert(payload)
    if (error) throw error
  },
  async upsertRiskAssessment(payload) {
    const supabase = getAdminClient()
    const { error } = await supabase.from('defi_risk_assessments').upsert(payload)
    if (error) throw error
  },
}

export const userTierPersistence: UserTierPersistencePort = {
  async upsertUserProfile(userId, profile) {
    const supabase = getAdminClient()
    const { data, error } = await supabase
      .from('defi_user_profiles')
      .upsert({ ...profile, user_id: userId, updated_at: new Date().toISOString() }, { onConflict: 'user_id' })
      .select()
      .single()
    if (error) throw error
    return (data as unknown) as Record<string, unknown>
  },
  async getUserProfileByUserId(userId) {
    const supabase = getAdminClient()
    const { data, error } = await supabase
      .from('defi_user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()
    if (error) return null
    return (data as unknown) as Record<string, unknown>
  },
  async updateOnboarding(userId, onboarding) {
    const supabase = getAdminClient()
    const { error } = await supabase
      .from('defi_user_profiles')
      .update({ onboarding_progress: onboarding, updated_at: new Date().toISOString() })
      .eq('user_id', userId)
    if (error) throw error
  },
  async updateCompletedTutorials(userId, completed) {
    const supabase = getAdminClient()
    const { error } = await supabase
      .from('defi_user_profiles')
      .update({ completed_tutorials: completed, updated_at: new Date().toISOString() })
      .eq('user_id', userId)
    if (error) throw error
  },
  async updateSubscriptionTier(userId, tier) {
    const supabase = getAdminClient()
    const { error } = await supabase
      .from('defi_user_profiles')
      .update({ subscription_tier: tier, updated_at: new Date().toISOString() })
      .eq('user_id', userId)
    if (error) throw error
  },
  async getUserUsage(userId) {
    const supabase = getAdminClient()
    const { data, error } = await supabase
      .from('defi_user_usage')
      .select('*')
      .eq('user_id', userId)
    if (error) throw error
    return (data ?? []) as Array<Record<string, unknown>>
  },
}
