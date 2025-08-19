import { createClient } from '@/lib/supabase/client'
import { updateUserProfile } from '@/lib/auth/user-creation'
import { apiLogger } from '@/lib/monitoring/logger'
import type { Database } from '@/lib/supabase/types'
import { getPlanDefinition, isPlanUpgrade } from './plan-definitions'

// UIのプラン名（課金商品）とDBの subscription_status は別概念
type UserPlan = 'free' | 'mini' | 'basic' | 'standard' | 'pro'

export interface PlanChangeResult {
  success: boolean
  error?: string
  message?: string
}

export interface PlanChangeData {
  userId: string
  fromPlan: UserPlan
  toPlan: UserPlan
  changeType: 'upgrade' | 'downgrade' | 'same'
  billingCycle: 'monthly' | 'yearly'
  amount: number
  currency: 'JPY'
  timestamp: string
}

export async function changePlan(
  userId: string,
  newPlan: UserPlan,
  billingCycle: 'monthly' | 'yearly' = 'monthly'
): Promise<PlanChangeResult> {
  try {
    const supabase = createClient()
    
    // Get current user plan
    const { data: currentUser, error: userError } = await supabase
      .from('user_profiles')
      .select('plan, subscription_status')
      .eq('id', userId)
      .single()
    
    if (userError) {
      apiLogger.error('Failed to get current user plan', {
        userId,
        error: userError.message,
        action: 'change_plan'
      })
      return { success: false, error: 'ユーザー情報の取得に失敗しました' }
    }
    
    const currentPlan = (currentUser?.plan as UserPlan | null) ?? 'free'
    
    // Check if plan change is valid
    if (currentPlan === newPlan) {
      return { success: false, error: '同じプランが選択されています' }
    }
    
    // Validate new plan
    const newPlanDef = getPlanDefinition(newPlan)
    if (!newPlanDef) {
      return { success: false, error: '無効なプランが選択されました' }
    }
    
    const changeType = isPlanUpgrade(currentPlan, newPlan) ? 'upgrade' : 'downgrade'
    const amount = billingCycle === 'yearly' ? newPlanDef.price.yearly : newPlanDef.price.monthly
    
    // For free plan, immediate change
    if (newPlan === 'free') {
      const updateResult = await updateUserProfile(userId, { subscription_status: 'inactive' as Database['public']['Tables']['user_profiles']['Row']['subscription_status'] })
      if (!updateResult.success) {
        return { success: false, error: updateResult.error }
      }
      
      await logPlanChange({
        userId,
        fromPlan: currentPlan,
        toPlan: newPlan,
        changeType,
        billingCycle,
        amount: 0,
        currency: 'JPY',
        timestamp: new Date().toISOString()
      })
      
      return { 
        success: true, 
        message: 'フリープランに変更しました' 
      }
    }
    
    // For paid plans, would integrate with payment system
    // This is a placeholder for payment processing
    const paymentResult = await processPayment({
      userId,
      planId: newPlan,
      amount,
      currency: 'JPY',
      billingCycle
    })
    
    if (!paymentResult.success) {
      return { success: false, error: paymentResult.error }
    }
    
    // 有料プラン支払い完了後は subscription_status を active に
    const updateResult = await updateUserProfile(userId, { subscription_status: 'active' as Database['public']['Tables']['user_profiles']['Row']['subscription_status'] })
    if (!updateResult.success) {
      return { success: false, error: updateResult.error }
    }
    
    // Log plan change
    await logPlanChange({
      userId,
      fromPlan: currentPlan,
      toPlan: newPlan,
      changeType,
      billingCycle,
      amount,
      currency: 'JPY',
      timestamp: new Date().toISOString()
    })
    
    // Reset usage for upgraded plans
    if (changeType === 'upgrade') {
      await resetUsageForUpgrade(userId)
    }
    
    apiLogger.info('Plan changed successfully', {
      userId,
      fromPlan: currentPlan,
      toPlan: newPlan,
      changeType,
      action: 'change_plan'
    })
    
    return { 
      success: true, 
      message: `${newPlanDef.displayName}にアップグレードしました` 
    }
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    apiLogger.error('Plan change failed', {
      userId,
      error: errorMessage,
      action: 'change_plan'
    })
    return { success: false, error: 'プラン変更に失敗しました' }
  }
}

async function processPayment(data: {
  userId: string
  planId: UserPlan
  amount: number
  currency: string
  billingCycle: string
}): Promise<{ success: boolean; error?: string }> {
  // This is a placeholder for payment processing
  // In a real implementation, this would integrate with Stripe, PayPal, etc.
  
  try {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // For demo purposes, always succeed for non-zero amounts
    if (data.amount > 0) {
      apiLogger.info('Payment processed successfully', {
        userId: data.userId,
        planId: data.planId,
        amount: data.amount,
        action: 'process_payment'
      })
      return { success: true }
    }
    
    return { success: true }
  } catch (error) {
    apiLogger.error('Payment processing failed', {
      userId: data.userId,
      planId: data.planId,
      error: error instanceof Error ? error.message : 'Unknown error',
      action: 'process_payment'
    })
    return { success: false, error: '決済処理に失敗しました' }
  }
}

async function logPlanChange(data: PlanChangeData): Promise<void> {
  try {
    const supabase = createClient()
    
    // In a real implementation, this would log to a plan_changes table
    // For now, we'll use the existing logging system
    apiLogger.info('Plan change logged', {
      userId: data.userId,
      fromPlan: data.fromPlan,
      toPlan: data.toPlan,
      changeType: data.changeType,
      amount: data.amount,
      action: 'log_plan_change'
    })
    
  } catch (error) {
    apiLogger.error('Failed to log plan change', {
      userId: data.userId,
      error: error instanceof Error ? error.message : 'Unknown error',
      action: 'log_plan_change'
    })
  }
}

async function resetUsageForUpgrade(userId: string): Promise<void> {
  try {
    const supabase = createClient()
    const today = new Date().toISOString().split('T')[0]
    
    // Reset today's usage to 0 for all features
    const features = ['ai_chats', 'portfolio_analysis', 'market_insights']
    
    for (const feature of features) {
      await supabase
        .from('usage_tracking')
        .upsert({
          user_id: userId,
          feature,
          usage_date: today,
          usage_count: 0
        })
    }
    
    apiLogger.info('Usage reset for plan upgrade', {
      userId,
      action: 'reset_usage_for_upgrade'
    })
    
  } catch (error) {
    apiLogger.error('Failed to reset usage for upgrade', {
      userId,
      error: error instanceof Error ? error.message : 'Unknown error',
      action: 'reset_usage_for_upgrade'
    })
  }
}

export async function getPlanChangeHistory(userId: string): Promise<PlanChangeData[]> {
  try {
    // In a real implementation, this would fetch from a plan_changes table
    // For now, return empty array
    return []
  } catch (error) {
    apiLogger.error('Failed to get plan change history', {
      userId,
      error: error instanceof Error ? error.message : 'Unknown error',
      action: 'get_plan_change_history'
    })
    return []
  }
}

export async function canChangePlan(
  userId: string,
  newPlan: UserPlan
): Promise<{ canChange: boolean; reason?: string }> {
  try {
    const supabase = createClient()
    
    // Get current user plan
    const { data: currentUser, error: userError } = await supabase
      .from('users')
      .select('plan, created_at')
      .eq('id', userId)
      .single()
    
    if (userError) {
      return { canChange: false, reason: 'ユーザー情報の取得に失敗しました' }
    }
    
    // Check if trying to change to same plan
    if (currentUser.plan === newPlan) {
      return { canChange: false, reason: '同じプランが選択されています' }
    }
    
    // Check if user is downgrading too frequently
    const userAge = new Date().getTime() - new Date(currentUser.created_at).getTime()
    const daysSinceCreation = Math.floor(userAge / (1000 * 60 * 60 * 24))
    
    if (daysSinceCreation < 1 && newPlan === 'free') {
      return { canChange: false, reason: 'アカウント作成から24時間以内はダウングレードできません' }
    }
    
    return { canChange: true }
    
  } catch (error) {
    apiLogger.error('Failed to check plan change eligibility', {
      userId,
      error: error instanceof Error ? error.message : 'Unknown error',
      action: 'can_change_plan'
    })
    return { canChange: false, reason: 'プラン変更可能性の確認に失敗しました' }
  }
}
