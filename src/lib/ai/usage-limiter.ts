import { createClient } from "@/lib/supabase/server"

// プラン別のAI使用制限
export const PLAN_LIMITS = {
  free: { 
    ai_chats: { daily: 5, monthly: 50 },
    ai_predictions: { daily: 3, monthly: 20 },
    portfolio_optimization: { daily: 2, monthly: 10 },
    risk_analysis: { daily: 2, monthly: 10 },
    realtime_subscriptions: { daily: 5, monthly: 50 },
    market_data_requests: { daily: 100, monthly: 1000 }
  },
  mini: { 
    ai_chats: { daily: 20, monthly: 300 },
    ai_predictions: { daily: 10, monthly: 100 },
    portfolio_optimization: { daily: 5, monthly: 50 },
    risk_analysis: { daily: 5, monthly: 50 },
    realtime_subscriptions: { daily: 20, monthly: 200 },
    market_data_requests: { daily: 500, monthly: 5000 }
  },
  basic: { 
    ai_chats: { daily: 50, monthly: 1000 },
    ai_predictions: { daily: 30, monthly: 500 },
    portfolio_optimization: { daily: 15, monthly: 200 },
    risk_analysis: { daily: 15, monthly: 200 },
    realtime_subscriptions: { daily: 50, monthly: 500 },
    market_data_requests: { daily: 1000, monthly: 10000 }
  },
  standard: { 
    ai_chats: { daily: 200, monthly: 5000 },
    ai_predictions: { daily: 100, monthly: 2000 },
    portfolio_optimization: { daily: 50, monthly: 1000 },
    risk_analysis: { daily: 50, monthly: 1000 },
    realtime_subscriptions: { daily: 200, monthly: 2000 },
    market_data_requests: { daily: 5000, monthly: 50000 }
  },
  pro: { 
    ai_chats: { daily: null, monthly: null },
    ai_predictions: { daily: null, monthly: null },
    portfolio_optimization: { daily: null, monthly: null },
    risk_analysis: { daily: null, monthly: null },
    realtime_subscriptions: { daily: null, monthly: null },
    market_data_requests: { daily: null, monthly: null }
  }
} as const

export type UserPlan = keyof typeof PLAN_LIMITS

// 使用量をチェックして制限内かどうかを確認
export async function checkUsageLimit(
  userId: string,
  feature: string = "ai_chats"
): Promise<{
  allowed: boolean
  dailyUsed: number
  dailyLimit: number | null
  monthlyUsed: number
  monthlyLimit: number | null
  plan: UserPlan
}> {
  const supabase = await createClient()
  
  // ユーザー情報を取得
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("plan")
    .eq("id", userId)
    .single()
    
  if (userError || !user) {
    throw new Error("User not found")
  }
  
  const plan = user.plan as UserPlan
  const limits = PLAN_LIMITS[plan][feature as keyof typeof PLAN_LIMITS[UserPlan]]
  
  // 無制限プランの場合は即座に許可
  if (limits.daily === null && limits.monthly === null) {
    return {
      allowed: true,
      dailyUsed: 0,
      dailyLimit: null,
      monthlyUsed: 0,
      monthlyLimit: null,
      plan,
    }
  }
  
  const today = new Date().toISOString().split('T')[0]
  const firstDayOfMonth = new Date()
  firstDayOfMonth.setDate(1)
  firstDayOfMonth.setHours(0, 0, 0, 0)
  
  // 今日の使用量を取得
  const { data: dailyUsage, error: dailyError } = await supabase
    .from("usage_tracking")
    .select("usage_count")
    .eq("user_id", userId)
    .eq("feature", feature)
    .eq("usage_date", today)
    .single()
    
  const dailyUsed = dailyUsage?.usage_count || 0
  
  // 今月の使用量を取得
  const { data: monthlyUsage, error: monthlyError } = await supabase
    .from("usage_tracking")
    .select("usage_count")
    .eq("user_id", userId)
    .eq("feature", feature)
    .gte("usage_date", firstDayOfMonth.toISOString().split('T')[0])
    
  const monthlyUsed = monthlyUsage?.reduce(
    (sum, record) => sum + (record.usage_count || 0), 
    0
  ) || 0
  
  // 制限チェック
  const dailyAllowed = limits.daily === null || dailyUsed < limits.daily
  const monthlyAllowed = limits.monthly === null || monthlyUsed < limits.monthly
  
  return {
    allowed: dailyAllowed && monthlyAllowed,
    dailyUsed,
    dailyLimit: limits.daily,
    monthlyUsed,
    monthlyLimit: limits.monthly,
    plan,
  }
}

// 使用量を記録
export async function recordUsage(
  userId: string,
  feature: string = "ai_chats",
  tokensUsed: number = 0,
  cost: number = 0,
  model?: string
): Promise<void> {
  const supabase = await createClient()
  const today = new Date().toISOString().split('T')[0]
  
  // 既存のレコードを確認
  const { data: existing, error: selectError } = await supabase
    .from("usage_tracking")
    .select("id, usage_count, tokens_used, cost_usd")
    .eq("user_id", userId)
    .eq("feature", feature)
    .eq("usage_date", today)
    .single()
    
  if (existing) {
    // 既存レコードを更新
    const { error: updateError } = await supabase
      .from("usage_tracking")
      .update({ 
        usage_count: existing.usage_count + 1,
        tokens_used: (existing.tokens_used || 0) + tokensUsed,
        cost_usd: (existing.cost_usd || 0) + cost
      })
      .eq("id", existing.id)
      
    if (updateError) {
      console.error("Failed to update usage:", updateError)
      throw new Error("Failed to record usage")
    }
  } else {
    // 新規レコードを作成
    const { error: insertError } = await supabase
      .from("usage_tracking")
      .insert({
        user_id: userId,
        feature,
        usage_count: 1,
        usage_date: today,
        tokens_used: tokensUsed,
        cost_usd: cost,
        model,
      })
      
    if (insertError) {
      console.error("Failed to insert usage:", insertError)
      throw new Error("Failed to record usage")
    }
  }
}

// 残り使用可能回数を取得
export async function getRemainingUsage(
  userId: string,
  feature: string = "ai_chats"
): Promise<{
  dailyRemaining: number | null
  monthlyRemaining: number | null
  isUnlimited: boolean
}> {
  const usage = await checkUsageLimit(userId, feature)
  
  if (usage.dailyLimit === null && usage.monthlyLimit === null) {
    return {
      dailyRemaining: null,
      monthlyRemaining: null,
      isUnlimited: true,
    }
  }
  
  return {
    dailyRemaining: usage.dailyLimit ? usage.dailyLimit - usage.dailyUsed : null,
    monthlyRemaining: usage.monthlyLimit ? usage.monthlyLimit - usage.monthlyUsed : null,
    isUnlimited: false,
  }
} 