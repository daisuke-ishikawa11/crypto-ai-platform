import { createClient as createClientClient } from '@/lib/supabase/client'
import { apiLogger } from '@/lib/monitoring/logger'
import type { Database } from '@/lib/supabase/types'

type UserProfileRow = Database['public']['Tables']['user_profiles']['Row']
type UserProfileInsert = Database['public']['Tables']['user_profiles']['Insert']

export async function createUserProfile(
  userId: string,
  email: string,
  name?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClientClient()
    
    // 既存ユーザー確認（user_profiles）
    const { data: existingUser } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('id', userId)
      .maybeSingle()

    if (existingUser) {
      return { success: true }
    }

    // プロファイル作成（subscription_status はスキーマ準拠）
    const userProfile: UserProfileInsert = {
      id: userId,
      email,
      full_name: name || null,
      avatar_url: null,
      role: 'user',
      subscription_status: 'inactive',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      last_active_at: null
    }

    const { error } = await supabase
      .from('user_profiles')
      .insert([userProfile])

    if (error) {
      apiLogger.error('Failed to create user profile', {
        userId,
        error: error.message,
        action: 'create_user_profile'
      })
      return { success: false, error: error.message }
    }

    // 初期利用状況を作成
    await initializeUsageTracking(userId)

    apiLogger.info('User profile created successfully', {
      userId,
      email,
      action: 'create_user_profile'
    })

    return { success: true }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    apiLogger.error('Unexpected error creating user profile', {
      userId,
      error: errorMessage,
      action: 'create_user_profile'
    })
    return { success: false, error: errorMessage }
  }
}

async function initializeUsageTracking(userId: string): Promise<void> {
  try {
    const supabase = createClientClient()
    const today = new Date().toISOString().split('T')[0]
    const features = ['ai_chats', 'portfolio_analysis', 'market_insights']
    for (const feature of features) {
      await supabase
        .from('usage_tracking')
        .upsert({
          user_id: userId,
          feature,
          usage_count: 0,
          usage_date: today
        })
    }
  } catch (error) {
    apiLogger.warn('Failed to initialize usage tracking', {
      userId,
      error: error instanceof Error ? error.message : 'Unknown error',
      action: 'initialize_usage_tracking'
    })
  }
}

export async function getUserProfile(userId: string): Promise<UserProfileRow | null> {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      apiLogger.error('Failed to fetch user profile', {
        userId,
        error: error.message,
        action: 'get_user_profile'
      })
      return null
    }

    return data as UserProfileRow
  } catch (error) {
    apiLogger.error('Unexpected error fetching user profile', {
      userId,
      error: error instanceof Error ? error.message : 'Unknown error',
      action: 'get_user_profile'
    })
    return null
  }
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<UserProfileInsert>
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClientClient()
    
    const { error } = await supabase
      .from('user_profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)

    if (error) {
      apiLogger.error('Failed to update user profile', {
        userId,
        error: error.message,
        action: 'update_user_profile'
      })
      return { success: false, error: error.message }
    }

    apiLogger.info('User profile updated successfully', {
      userId,
      action: 'update_user_profile'
    })

    return { success: true }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    apiLogger.error('Unexpected error updating user profile', {
      userId,
      error: errorMessage,
      action: 'update_user_profile'
    })
    return { success: false, error: errorMessage }
  }
}
