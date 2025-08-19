import { createClient as createClientClient } from '@/lib/supabase/client'
import { getUserProfile } from './user-creation'
import { apiLogger } from '@/lib/monitoring/logger'
import type { Database } from '@/lib/supabase/types'

type SubscriptionStatus = Database['public']['Tables']['user_profiles']['Row']['subscription_status']

export interface PlanLimits {
  ai_chats: { daily: number | null; monthly: number | null }
  portfolio_analysis: { daily: number | null; monthly: number | null }
  market_insights: { daily: number | null; monthly: number | null }
}

// subscription_status ベースの利用制限
export const PLAN_LIMITS: Record<SubscriptionStatus, PlanLimits> = {
  inactive: { ai_chats: { daily: 5, monthly: 50 }, portfolio_analysis: { daily: 1, monthly: 10 }, market_insights: { daily: 3, monthly: 30 } },
  trial:    { ai_chats: { daily: 20, monthly: 300 }, portfolio_analysis: { daily: 5, monthly: 50 }, market_insights: { daily: 10, monthly: 150 } },
  past_due: { ai_chats: { daily: 5, monthly: 50 }, portfolio_analysis: { daily: 1, monthly: 10 }, market_insights: { daily: 3, monthly: 30 } },
  cancelled:{ ai_chats: { daily: 0, monthly: 0 }, portfolio_analysis: { daily: 0, monthly: 0 }, market_insights: { daily: 0, monthly: 0 } },
  active:   { ai_chats: { daily: null, monthly: null }, portfolio_analysis: { daily: null, monthly: null }, market_insights: { daily: null, monthly: null } },
}

export async function checkFeatureAccess(
  userId: string,
  feature: keyof PlanLimits
): Promise<{ hasAccess: boolean; remainingToday: number | null; remainingMonth: number | null; plan: SubscriptionStatus }> {
  try {
    const supabase = createClientClient()
    
    // Get user profile
    const userProfile = await getUserProfile(userId)
    if (!userProfile) {
      apiLogger.error('User profile not found for permission check', {
        userId,
        feature,
        action: 'check_feature_access'
      })
      return { hasAccess: false, remainingToday: 0, remainingMonth: 0, plan: 'inactive' }
    }

    const planLimits = PLAN_LIMITS[userProfile.subscription_status as SubscriptionStatus]
    const featureLimits = planLimits[feature]

    // Unlimited access for pro plan
    if (featureLimits.daily === null && featureLimits.monthly === null) {
      return { hasAccess: true, remainingToday: null, remainingMonth: null, plan: userProfile.subscription_status as SubscriptionStatus }
    }

    // Get usage data
    const today = new Date().toISOString().split('T')[0]
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]
    
    // Get today's usage
    const { data: todayUsage } = await supabase
      .from('usage_tracking')
      .select('usage_count')
      .eq('user_id', userId)
      .eq('feature', feature)
      .eq('usage_date', today)
      .single()

    // Get month's usage
    const { data: monthUsage } = await supabase
      .from('usage_tracking')
      .select('usage_count')
      .eq('user_id', userId)
      .eq('feature', feature)
      .gte('usage_date', monthStart)

    const todayCount = todayUsage?.usage_count || 0
    const monthCount = monthUsage?.reduce((sum, record) => sum + record.usage_count, 0) || 0

    // Check limits
    const dailyRemaining = featureLimits.daily ? Math.max(0, featureLimits.daily - todayCount) : null
    const monthlyRemaining = featureLimits.monthly ? Math.max(0, featureLimits.monthly - monthCount) : null

    const hasAccess = 
      (featureLimits.daily === null || todayCount < featureLimits.daily) &&
      (featureLimits.monthly === null || monthCount < featureLimits.monthly)

    return {
      hasAccess,
      remainingToday: dailyRemaining,
      remainingMonth: monthlyRemaining,
      plan: userProfile.subscription_status as SubscriptionStatus
    }
  } catch (error) {
    apiLogger.error('Error checking feature access', {
      userId,
      feature,
      error: error instanceof Error ? error.message : 'Unknown error',
      action: 'check_feature_access'
    })
    return { hasAccess: false, remainingToday: 0, remainingMonth: 0, plan: 'inactive' }
  }
}

export async function incrementUsage(
  userId: string,
  feature: keyof PlanLimits,
  count: number = 1
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClientClient()
    const today = new Date().toISOString().split('T')[0]

    const { error } = await supabase
      .from('usage_tracking')
      .upsert({
        user_id: userId,
        feature,
        usage_date: today,
        usage_count: count
      }, {
        onConflict: 'user_id,feature,usage_date'
      })

    if (error) {
      apiLogger.error('Failed to increment usage', {
        userId,
        feature,
        count,
        error: error.message,
        action: 'increment_usage'
      })
      return { success: false, error: error.message }
    }

    apiLogger.info('Usage incremented successfully', {
      userId,
      feature,
      count,
      action: 'increment_usage'
    })

    return { success: true }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    apiLogger.error('Unexpected error incrementing usage', {
      userId,
      feature,
      count,
      error: errorMessage,
      action: 'increment_usage'
    })
    return { success: false, error: errorMessage }
  }
}

export async function getUserUsageSummary(userId: string) {
  try {
    const supabase = createClientClient()
    const userProfile = await getUserProfile(userId)
    
    if (!userProfile) {
      return null
    }

    const today = new Date().toISOString().split('T')[0]
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]

    // Get usage data for current month
    const { data: monthUsage } = await supabase
      .from('usage_tracking')
      .select('feature, usage_count, usage_date')
      .eq('user_id', userId)
      .gte('usage_date', monthStart)

    // Get today's usage
    const { data: todayUsage } = await supabase
      .from('usage_tracking')
      .select('feature, usage_count')
      .eq('user_id', userId)
      .eq('usage_date', today)

    const planLimits = PLAN_LIMITS[userProfile.subscription_status as SubscriptionStatus]
    const summary: Record<string, {
      today: { used: number; limit: number | null; remaining: number | null };
      month: { used: number; limit: number | null; remaining: number | null };
    }> = {}

    for (const feature of Object.keys(planLimits) as Array<keyof PlanLimits>) {
      const todayCount = todayUsage?.find(u => u.feature === feature)?.usage_count || 0
      const monthCount = monthUsage?.filter(u => u.feature === feature)
        .reduce((sum, record) => sum + record.usage_count, 0) || 0

      const featureLimits = planLimits[feature]
      
      summary[feature] = {
        today: {
          used: todayCount,
          limit: featureLimits.daily,
          remaining: featureLimits.daily ? Math.max(0, featureLimits.daily - todayCount) : null
        },
        month: {
          used: monthCount,
          limit: featureLimits.monthly,
          remaining: featureLimits.monthly ? Math.max(0, featureLimits.monthly - monthCount) : null
        }
      }
    }

    return { plan: userProfile.subscription_status as SubscriptionStatus, usage: summary }
  } catch (error) {
    apiLogger.error('Error getting usage summary', {
      userId,
      error: error instanceof Error ? error.message : 'Unknown error',
      action: 'get_usage_summary'
    })
    return null
  }
}

export function hasAccessToFeature(userPlan: SubscriptionStatus, feature: string): boolean {
  // inactive < trial < active (cancelled/past_dueは最低)
  const planHierarchy: Record<SubscriptionStatus, number> = {
    cancelled: 0,
    inactive: 0,
    past_due: 0,
    trial: 1,
    active: 2,
  }

  const featureRequirements: Record<string, number> = {
    'ai_chats': 0,
    'portfolio_analysis': 0,
    'market_insights': 0,
    'advanced_analytics': 1,
    'custom_indicators': 2,
    'api_access': 3,
    'white_label': 4,
    'priority_support': 2
  }

  const requiredLevel = featureRequirements[feature]
  const userLevel = planHierarchy[userPlan]

  return userLevel >= (requiredLevel || 0)
}
