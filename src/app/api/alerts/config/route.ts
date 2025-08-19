import { NextRequest, NextResponse } from 'next/server'
import { 
  AlertConfig, 
  AlertThreshold, 
  NotificationDevice, 
  // TimeSlot,
  PLAN_CONFIGS,
  DEFAULT_TIME_SLOTS,
  PlanType,
  AlertType,
  // NotificationDeviceType
} from '@/lib/types/alerts'
import { createClient } from '@/lib/supabase/server'
// import { validateInput } from '@/lib/security/input-validation'
import { z } from 'zod'

// バリデーションスキーマ
const alertThresholdSchema = z.object({
  id: z.string().optional(),
  type: z.enum([
    'price_alert', 'volatility_alert', 'trend_change', 'volume_spike',
    'resistance_support', 'learning_related', 'ai_prediction', 'portfolio_optimization',
    'news_impact', 'arbitrage_opportunity', 'defi_yield', 'risk_management'
  ]),
  coinSymbol: z.string().min(1).max(10),
  condition: z.enum(['above', 'below', 'change_percent']),
  value: z.number().min(0),
  priority: z.enum(['low', 'medium', 'high']),
  enabled: z.boolean()
})

const notificationDeviceSchema = z.object({
  type: z.enum([
    'browser', 'email', 'line', 'discord', 'slack', 
    'telegram', 'sms', 'push', 'webhook'
  ]),
  identifier: z.string().min(1),
  enabled: z.boolean()
})

const timeSlotSchema = z.object({
  id: z.string(),
  name: z.string(),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  enabled: z.boolean()
})

const alertConfigSchema = z.object({
  alertTypes: z.array(z.string()).optional(),
  thresholds: z.array(alertThresholdSchema).optional(),
  notificationDevices: z.array(notificationDeviceSchema).optional(),
  timeSlots: z.array(timeSlotSchema).optional(),
  customTimes: z.array(z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/)).optional(),
  preferences: z.object({
    includeAnalysis: z.boolean().optional(),
    includeLearningTips: z.boolean().optional(),
    language: z.enum(['ja', 'en']).optional()
  }).optional()
})

/**
 * ユーザーのアラート設定を取得
 */
export async function GET(_request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // ユーザープランの取得
    const { data: userData } = await supabase
      .from('users')
      .select('plan_type, created_at')
      .eq('id', user.id)
      .single()

    const planType = userData?.plan_type as PlanType || 'free'

    // アラート設定の取得
    const { data: configData, error } = await supabase
      .from('user_alert_configs')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error && error.code !== 'PGRST116') { // Row not found以外のエラー
      throw error
    }

    // 設定が存在しない場合はデフォルト設定を作成
    if (!configData) {
      const defaultConfig = await createDefaultConfig(user.id, planType)
      return NextResponse.json({
        config: defaultConfig,
        planLimits: PLAN_CONFIGS[planType],
        isNewUser: true
      })
    }

    const config: AlertConfig = {
      id: configData.id,
      userId: configData.user_id,
      planType: configData.plan_type,
      alertTypes: configData.alert_types,
      frequency: configData.frequency,
      notificationDevices: configData.notification_devices,
      thresholds: configData.thresholds,
      preferences: configData.preferences,
      createdAt: configData.created_at,
      updatedAt: configData.updated_at
    }

    return NextResponse.json({
      config,
      planLimits: PLAN_CONFIGS[planType],
      isNewUser: false
    })

  } catch (error) {
    console.error('Failed to get alert config:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve alert configuration' },
      { status: 500 }
    )
  }
}

/**
 * アラート設定を更新
 */
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // リクエストボディの検証
    const body = await request.json()
    // const validationResult = validateInput(alertConfigSchema, body)
    const validationResult = alertConfigSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid input', 
          details: validationResult.error?.issues 
        },
        { status: 400 }
      )
    }

    // ユーザープランの確認
    const { data: userData } = await supabase
      .from('users')
      .select('plan_type')
      .eq('id', user.id)
      .single()

    const planType = userData?.plan_type as PlanType || 'free'
    const planConfig = PLAN_CONFIGS[planType]

    // 既存設定の取得
    const { data: existingConfig } = await supabase
      .from('user_alert_configs')
      .select('*')
      .eq('user_id', user.id)
      .single()

    // プラン制限の検証
    const validationErrors = validatePlanLimits(body, planConfig)
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { 
          error: 'Plan limit exceeded',
          details: validationErrors
        },
        { status: 400 }
      )
    }

    // 更新データの準備
    const updateData = await prepareUpdateData(
      body, 
      existingConfig, 
      planType
    )

    let updatedConfig

    if (existingConfig) {
      // 既存設定の更新
      const { data, error } = await supabase
        .from('user_alert_configs')
        .update(updateData)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) throw error
      updatedConfig = data
    } else {
      // 新規設定の作成
      const { data, error } = await supabase
        .from('user_alert_configs')
        .insert({
          ...updateData,
          user_id: user.id
        })
        .select()
        .single()

      if (error) throw error
      updatedConfig = data
    }

    // アクティビティログの記録
    await logConfigurationChange(user.id, 'update', body)

    return NextResponse.json({
      success: true,
      config: {
        id: updatedConfig.id,
        userId: updatedConfig.user_id,
        planType: updatedConfig.plan_type,
        alertTypes: updatedConfig.alert_types,
        frequency: updatedConfig.frequency,
        notificationDevices: updatedConfig.notification_devices,
        thresholds: updatedConfig.thresholds,
        preferences: updatedConfig.preferences,
        createdAt: updatedConfig.created_at,
        updatedAt: updatedConfig.updated_at
      },
      message: 'アラート設定を更新しました'
    })

  } catch (error) {
    console.error('Failed to update alert config:', error)
    return NextResponse.json(
      { error: 'Failed to update alert configuration' },
      { status: 500 }
    )
  }
}

/**
 * アラート設定をリセット（デフォルトに戻す）
 */
export async function DELETE(_request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // ユーザープランの取得
    const { data: userData } = await supabase
      .from('users')
      .select('plan_type')
      .eq('id', user.id)
      .single()

    const planType = userData?.plan_type as PlanType || 'free'

    // 既存設定を削除
    await supabase
      .from('user_alert_configs')
      .delete()
      .eq('user_id', user.id)

    // デフォルト設定を作成
    const defaultConfig = await createDefaultConfig(user.id, planType)

    // アクティビティログの記録
    await logConfigurationChange(user.id, 'reset', {})

    return NextResponse.json({
      success: true,
      config: defaultConfig,
      message: 'アラート設定をリセットしました'
    })

  } catch (error) {
    console.error('Failed to reset alert config:', error)
    return NextResponse.json(
      { error: 'Failed to reset alert configuration' },
      { status: 500 }
    )
  }
}

/**
 * デフォルト設定の作成
 */
async function createDefaultConfig(
  userId: string, 
  planType: PlanType
): Promise<AlertConfig> {
  const supabaseClient = await createClient()
  const planConfig = PLAN_CONFIGS[planType]

  const defaultConfig = {
    user_id: userId,
    plan_type: planType,
    alert_types: planConfig.allowedAlertTypes,
    frequency: {
      maxDaily: ('maxDailyAlerts' in planConfig) ? planConfig.maxDailyAlerts : 1,
      currentDaily: 0,
      timeSlots: planType === 'free' 
        ? [{ id: 'morning', name: '朝の市場確認', startTime: '09:00', endTime: '09:00', enabled: true }]
        : DEFAULT_TIME_SLOTS.slice(0, ('timeSlotCount' in planConfig) ? planConfig.timeSlotCount : 3),
      customTimes: []
    },
    notification_devices: [
      {
        type: 'browser',
        identifier: 'default',
        enabled: true
      }
    ],
    thresholds: [],
    preferences: {
      includeAnalysis: planConfig.aiAnalysis,
      includeLearningTips: planConfig.learningTips,
      language: 'ja'
    }
  }

  const { data, error } = await supabaseClient
    .from('user_alert_configs')
    .insert(defaultConfig)
    .select()
    .single()

  if (error) throw error

  return {
    id: data.id,
    userId: data.user_id,
    planType: data.plan_type,
    alertTypes: data.alert_types,
    frequency: data.frequency,
    notificationDevices: data.notification_devices,
    thresholds: data.thresholds,
    preferences: data.preferences,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  }
}

/**
 * プラン制限の検証
 */
function validatePlanLimits(
  input: unknown, 
  planConfig: typeof PLAN_CONFIGS[keyof typeof PLAN_CONFIGS]
): string[] {
  const errors: string[] = []

  // Type guard for input validation
  const inputObj = typeof input === 'object' && input !== null ? input as Record<string, unknown> : {};

  // アラート種類の制限チェック
  if (inputObj.alertTypes && Array.isArray(inputObj.alertTypes)) {
    const invalidTypes = inputObj.alertTypes.filter(
      (type: unknown) => typeof type === 'string' && !planConfig.allowedAlertTypes.includes(type as AlertType)
    )
    if (invalidTypes.length > 0) {
      errors.push(`この機能は現在のプランでは利用できません: ${invalidTypes.join(', ')}`)
    }
  }

  // 通知デバイスの制限チェック
  if (inputObj.notificationDevices && Array.isArray(inputObj.notificationDevices)) {
    const invalidDevices = inputObj.notificationDevices.filter(
      (device: unknown) => typeof device === 'object' && device !== null && 
        'type' in device && typeof (device as NotificationDevice).type === 'string' &&
        !planConfig.allowedDevices.includes((device as NotificationDevice).type)
    )
    if (invalidDevices.length > 0) {
      errors.push(`このデバイスは現在のプランでは利用できません: ${invalidDevices.map((d: unknown) => 
        typeof d === 'object' && d !== null && 'type' in d ? (d as NotificationDevice).type : 'unknown'
      ).join(', ')}`)
    }
  }

  // カスタムタイミングの制限チェック
  if (inputObj.customTimes && !('customTiming' in planConfig && planConfig.customTiming)) {
    errors.push('カスタムタイミング設定はプレミアムプランで利用可能です')
  }

  if (inputObj.customTimes && Array.isArray(inputObj.customTimes) && 
      ('maxCustomTimes' in planConfig) && planConfig.maxCustomTimes && 
      inputObj.customTimes.length > planConfig.maxCustomTimes) {
    errors.push(`カスタムタイミングは最大${('maxCustomTimes' in planConfig) ? planConfig.maxCustomTimes : 0}個まで設定可能です`)
  }

  return errors
}

/**
 * 更新データの準備
 */
async function prepareUpdateData(
  input: unknown,
  existingConfig: unknown,
  planType: PlanType
): Promise<Record<string, unknown>> {
  // Type guards for input validation
  const inputObj = typeof input === 'object' && input !== null ? input as Record<string, unknown> : {};
  const existingObj = typeof existingConfig === 'object' && existingConfig !== null ? 
    existingConfig as Record<string, unknown> : {};

  const updateData: Record<string, unknown> = {
    plan_type: planType,
    updated_at: new Date().toISOString()
  }

  if (inputObj.alertTypes !== undefined) {
    updateData.alert_types = inputObj.alertTypes
  }

  if (inputObj.thresholds !== undefined && Array.isArray(inputObj.thresholds)) {
    // 新しい閾値にはIDを自動生成
    updateData.thresholds = inputObj.thresholds.map((threshold: unknown) => {
      const thresholdObj = typeof threshold === 'object' && threshold !== null ? 
        threshold as AlertThreshold : {} as AlertThreshold;
      return {
        ...thresholdObj,
        id: thresholdObj.id || crypto.randomUUID()
      };
    })
  }

  if (inputObj.notificationDevices !== undefined) {
    updateData.notification_devices = inputObj.notificationDevices
  }

  if (inputObj.timeSlots !== undefined || inputObj.customTimes !== undefined) {
    const existingFrequency = typeof existingObj?.frequency === 'object' && existingObj.frequency !== null ? 
      existingObj.frequency as Record<string, unknown> : {};
    const frequency = {
      maxDaily: PLAN_CONFIGS[planType].maxDailyAlerts,
      currentDaily: 0,
      ...existingFrequency
    }

    if (inputObj.timeSlots !== undefined) {
      (frequency as Record<string, unknown>).timeSlots = inputObj.timeSlots
    }

    if (inputObj.customTimes !== undefined) {
      (frequency as Record<string, unknown>).customTimes = inputObj.customTimes
    }

    updateData.frequency = frequency
  }

  if (inputObj.preferences !== undefined) {
    const existingPreferences = typeof existingObj?.preferences === 'object' && existingObj.preferences !== null ? 
      existingObj.preferences as Record<string, unknown> : {};
    updateData.preferences = {
      ...existingPreferences,
      ...(typeof inputObj.preferences === 'object' && inputObj.preferences !== null ? inputObj.preferences as Record<string, unknown> : {})
    }
  }

  return updateData
}

/**
 * 設定変更のログ記録
 */
async function logConfigurationChange(
  userId: string,
  action: 'create' | 'update' | 'reset',
  changes: unknown
): Promise<void> {
  try {
    const supabase = await createClient()
    
    await supabase
      .from('user_activity_logs')
      .insert({
        user_id: userId,
        action: `alert_config_${action}`,
        details: changes,
        timestamp: new Date().toISOString(),
        ip_address: '', // リクエストから取得可能
        user_agent: '' // リクエストから取得可能
      })
  } catch (error) {
    console.error('Failed to log configuration change:', error)
    // ログ失敗はメイン処理に影響しない
  }
}

/**
 * アラート設定のテスト配信
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { deviceType, testMessage } = await request.json()

    if (!deviceType) {
      return NextResponse.json(
        { error: 'Device type is required' },
        { status: 400 }
      )
    }

    // テスト用のダミーアラート作成
    const testAlert = {
      id: 'test-' + crypto.randomUUID(),
      userId: user.id,
      type: 'price_alert' as AlertType,
      coinSymbol: 'BTC',
      title: 'テストアラート',
      message: testMessage || 'これはアラート設定のテスト配信です。',
      priority: 'medium' as const,
      marketData: {
        symbol: 'BTC',
        price: 5000000,
        change24h: 250000,
        changePercent24h: 5.26,
        volume24h: 1000000000,
        marketCap: 95000000000000,
        timestamp: new Date().toISOString()
      },
      createdAt: new Date().toISOString(),
      triggeredBy: {
        id: 'test',
        type: 'price_alert' as AlertType,
        coinSymbol: 'BTC',
        condition: 'above' as const,
        value: 5000000,
        priority: 'medium' as const,
        enabled: true
      }
    }

    // NotificationDispatcher での配信テスト
    const { NotificationDispatcher } = await import('@/lib/services/notification-dispatcher')
    const dispatcher = new NotificationDispatcher()

    // テスト用の設定
    const testConfig = {
      id: 'test-config',
      userId: user.id,
      planType: 'basic' as PlanType,
      alertTypes: ['price_alert'] as AlertType[],
      frequency: { maxDaily: 5, currentDaily: 0, timeSlots: [], customTimes: [] },
      notificationDevices: [{ type: deviceType, identifier: 'test', enabled: true }],
      thresholds: [],
      preferences: { includeAnalysis: true, includeLearningTips: true, language: 'ja' as const },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const result = await dispatcher.dispatch(testAlert, testConfig)

    return NextResponse.json({
      success: result.successfulDeliveries > 0,
      result: {
        deviceType,
        delivered: result.successfulDeliveries > 0,
        totalDevices: result.totalDevices,
        successfulDeliveries: result.successfulDeliveries,
        errors: result.results.filter(r => !r.success).map(r => r.error)
      },
      message: result.successfulDeliveries > 0 
        ? 'テスト配信が成功しました' 
        : 'テスト配信に失敗しました'
    })

  } catch (error) {
    console.error('Test notification failed:', error)
    return NextResponse.json(
      { error: 'Test notification failed' },
      { status: 500 }
    )
  }
}