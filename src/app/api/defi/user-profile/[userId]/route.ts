import { NextRequest, NextResponse } from 'next/server'
import { DeFiUserTierManager } from '@/lib/defi/user-tier-manager'
import { createClient } from '@/lib/supabase/server'
import { createApiHandler } from '@/lib/utils/api-error-middleware'

// DeFiUserTierManagerのインスタンス作成
const mockLogger = { info: () => {}, error: () => {}, warn: () => {}, debug: () => {} }
const mockPersistence = {
  async upsertUserProfile(userId: string, profile: Record<string, unknown>): Promise<Record<string, unknown>> { 
    return { user_id: userId, ...profile }
  },
  async getUserProfileByUserId(userId: string): Promise<Record<string, unknown> | null> { 
    return null 
  },
  async updateOnboarding(_userId: string, _onboarding: Record<string, unknown>): Promise<void> { return },
  async updateCompletedTutorials(_userId: string, _completed: string[]): Promise<void> { return },
  async updateSubscriptionTier(_userId: string, _tier: string): Promise<void> { return },
  async getUserUsage(_userId: string): Promise<Array<Record<string, unknown>>> { return [] }
}
const deFiUserTierManager = new DeFiUserTierManager(mockLogger, mockPersistence)

function extractUserIdFromUrl(url: string): string | null {
  try {
    const pathname = new URL(url).pathname
    // 例: /api/defi/user-profile/<userId>
    const match = pathname.match(/\/api\/defi\/user-profile\/([^/]+)/)
    return match?.[1] ?? null
  } catch {
    return null
  }
}

async function handler(request: NextRequest): Promise<NextResponse> {
  const userId = extractUserIdFromUrl(request.url)
  if (!userId) {
    return NextResponse.json({ error: 'Invalid or missing userId' }, { status: 400 })
  }

  const supabase = await createClient()

  // 認証チェック
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 本人確認
  if (user.id !== userId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    switch (request.method) {
      case 'GET':
        return await handleGetProfile(userId)
      case 'PUT':
      case 'PATCH': {
        const body = (await request.json()) as Record<string, unknown>
        return await handleUpdateProfile(userId, body)
      }
      default:
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
    }
  } catch (error) {
    console.error('Error in user profile API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function handleGetProfile(userId: string): Promise<NextResponse> {
  const supabase = await createClient()
  const { data: profile, error } = await supabase
    .from('defi_user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') {
    throw error
  }

  // プロファイルが存在しない場合は作成
  if (!profile) {
    const newProfile = await deFiUserTierManager.createOrUpdateUserProfile(userId, {})
    return NextResponse.json({ success: true, data: newProfile, meta: { created: true } })
  }

  // 機能制限情報を追加
  const featureLimitations = deFiUserTierManager.getFeatureLimitations(profile.subscription_tier)
  // 使用統計を取得
  const usageStats = await deFiUserTierManager.getUsageStatistics(userId)

  return NextResponse.json({ success: true, data: { ...profile, featureLimitations, usageStats } })
}

async function handleUpdateProfile(userId: string, updateData: Record<string, unknown>): Promise<NextResponse> {
  const allowedFields = [
    'experience_level',
    'risk_tolerance',
    'investment_goals',
    'preferred_networks',
    'max_investment_amount',
    'preferences'
  ] as const

  type AllowedKey = typeof allowedFields[number]
  const validatedData: Partial<Record<AllowedKey, unknown>> = {}

  for (const [key, value] of Object.entries(updateData)) {
    if ((allowedFields as readonly string[]).includes(key)) {
      validatedData[key as AllowedKey] = value
    }
  }

  const updatedProfile = await deFiUserTierManager.createOrUpdateUserProfile(userId, validatedData as Record<string, unknown>)

  return NextResponse.json({ success: true, data: updatedProfile, message: 'プロファイルが更新されました' })
}

export const GET = createApiHandler({
  handler,
  rateLimit: { limit: 60, window: 60000 },
  errorOptions: {
    enableLogging: true,
    customErrorMessages: {
      AUTH_ERROR: '認証に失敗しました',
      FORBIDDEN: 'アクセス権限がありません',
      NOT_FOUND: 'ユーザープロファイルが見つかりません'
    }
  }
})

export const PUT = GET
export const PATCH = GET
