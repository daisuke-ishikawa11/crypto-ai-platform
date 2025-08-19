import { NextRequest, NextResponse } from 'next/server'
import { AlertManager } from '@/lib/services/alert-manager'
import { NotificationDispatcher } from '@/lib/services/notification-dispatcher'
import { MarketData } from '@/lib/types/alerts'
import { createClient } from '@/lib/supabase/server'
import { rateLimit } from '@/lib/security/rate-limiter'

export async function POST(request: NextRequest) {
  try {
    // API認証チェック（内部システムまたは認証されたサードパーティ）
    const apiKey = request.headers.get('x-api-key')

    // レート制限チェック
    const rateLimitResult = await rateLimit(apiKey || 'anonymous', 100, 60000)

    if (rateLimitResult.blocked) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }
    const validApiKeys = [
      process.env.INTERNAL_API_KEY,
      process.env.COINMARKETCAP_WEBHOOK_KEY,
      process.env.BINANCE_WEBHOOK_KEY
    ].filter(Boolean)

    if (!apiKey || !validApiKeys.includes(apiKey)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // マーケットデータの検証
    const marketData = validateMarketData(body)
    if (!marketData) {
      return NextResponse.json(
        { error: 'Invalid market data format' },
        { status: 400 }
      )
    }

    // アラートマネージャーとディスパッチャーの初期化
    const alertManager = new AlertManager()
    const dispatcher = new NotificationDispatcher()

    // 閾値チェックとアラート生成
    const triggeredAlerts = await alertManager.checkThresholds(marketData)
    
    if (triggeredAlerts.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No alerts triggered',
        marketData,
        processedAt: new Date().toISOString()
      })
    }

    // 各アラートの配信処理
    const deliveryResults = []
    
    for (const alert of triggeredAlerts) {
      try {
        // ユーザーのアラート設定を取得
        const userConfig = await alertManager.getUserAlertConfig(alert.userId)
        if (!userConfig) {
          console.warn(`No alert config found for user: ${alert.userId}`)
          continue
        }

        // アラート配信
        const delivery = await dispatcher.dispatch(alert, userConfig)
        deliveryResults.push(delivery)

        // 日次カウンターを増加
        await alertManager.incrementDailyCounter(alert.userId)
        
        console.log(`Alert delivered: ${alert.id} to user ${alert.userId}`, {
          successRate: delivery.successfulDeliveries / delivery.totalDevices,
          devices: delivery.totalDevices
        })

      } catch (error) {
        console.error(`Failed to process alert ${alert.id}:`, error)
        deliveryResults.push({
          alertId: alert.id,
          userId: alert.userId,
          error: error instanceof Error ? error.message : 'Unknown error',
          success: false
        })
      }
    }

    // 統計情報の更新
    await updateAlertStatistics(marketData, triggeredAlerts.length)

    return NextResponse.json({
      success: true,
      message: `Processed ${triggeredAlerts.length} alerts`,
      marketData,
      alertsTriggered: triggeredAlerts.length,
      deliveryResults: deliveryResults.map(r => ({
        alertId: r.alertId,
        userId: r.userId,
        successRate: 'successfulDeliveries' in r 
          ? r.successfulDeliveries / r.totalDevices 
          : 0,
        success: 'successfulDeliveries' in r ? r.successfulDeliveries > 0 : false
      })),
      processedAt: new Date().toISOString()
    })

  } catch (error) {
    console.error('Alert processing error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
        processedAt: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

/**
 * WebSocket接続経由のリアルタイムアラート処理（GET）
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const action = searchParams.get('action')

  if (!userId) {
    return NextResponse.json(
      { error: 'User ID required' },
      { status: 400 }
    )
  }

  try {
    const supabase = createClient()
    
    // ユーザー認証確認
    const { data: { user } } = await (await supabase).auth.getUser()
    if (!user || user.id !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    switch (action) {
      case 'status':
        return await getAlertStatus(userId)
      
      case 'history':
        return await getRecentAlerts(userId)
        
      case 'stats':
        return await getAlertStats(userId)
      
      case 'ack': {
        const id = searchParams.get('id')
        const all = searchParams.get('all') === '1'
        return await ackAlerts(userId, { id: id || undefined, all })
      }
        
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('Alert status error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * マーケットデータの検証
 */
function validateMarketData(data: unknown): MarketData | null {
  if (!data || typeof data !== 'object') return null

  const dataObj = data as Record<string, unknown>;
  const required = ['symbol', 'price', 'change24h', 'changePercent24h', 'volume24h']
  
  for (const field of required) {
    if (!(field in dataObj) || (field === 'symbol' ? typeof dataObj[field] !== 'string' : typeof dataObj[field] !== 'number')) {
      console.warn(`Invalid market data: missing or invalid ${field}`)
      return null
    }
  }

  return {
    symbol: typeof dataObj.symbol === 'string' ? dataObj.symbol.toUpperCase() : '',
    price: Number(dataObj.price),
    change24h: Number(dataObj.change24h),
    changePercent24h: Number(dataObj.changePercent24h),
    volume24h: Number(dataObj.volume24h),
    marketCap: Number(dataObj.marketCap || 0),
    timestamp: typeof dataObj.timestamp === 'string' ? dataObj.timestamp : new Date().toISOString(),
    technicalIndicators: typeof dataObj.technicalIndicators === 'object' && 
      dataObj.technicalIndicators !== null && 
      'rsi' in dataObj.technicalIndicators &&
      'macd' in dataObj.technicalIndicators &&
      'bb_upper' in dataObj.technicalIndicators &&
      'bb_lower' in dataObj.technicalIndicators &&
      'support' in dataObj.technicalIndicators &&
      'resistance' in dataObj.technicalIndicators
      ? dataObj.technicalIndicators as { rsi: number; macd: number; bb_upper: number; bb_lower: number; support: number; resistance: number; }
      : undefined
  }
}

/**
 * アラートの統計情報を更新
 */
async function updateAlertStatistics(
  marketData: MarketData, 
  alertCount: number
): Promise<void> {
  try {
    const supabase = createClient()
    
    await (await supabase)
      .from('alert_statistics')
      .insert({
        symbol: marketData.symbol,
        price: marketData.price,
        change_percent: marketData.changePercent24h,
        alerts_triggered: alertCount,
        processed_at: new Date().toISOString(),
        market_data: marketData
      })
  } catch (error) {
    console.error('Failed to update alert statistics:', error)
    // 統計更新の失敗はメイン処理に影響しない
  }
}

/**
 * ユーザーのアラート状況を取得
 */
async function getAlertStatus(userId: string): Promise<NextResponse> {
  const supabase = createClient()
  const alertManager = new AlertManager()
  
  try {
    const config = await alertManager.getUserAlertConfig(userId)
    if (!config) {
      return NextResponse.json({ 
        alertsEnabled: false,
        message: 'アラート設定が見つかりません' 
      })
    }

    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)

    const { data: todayAlerts } = await (await supabase)
      .from('alert_history')
      .select('id, acknowledged')
      .eq('user_id', userId)
      .gte('sent_at', todayStart.toISOString())

    return NextResponse.json({
      alertsEnabled: true,
      planType: config.planType,
      dailyLimit: config.frequency.maxDaily,
      dailyUsed: config.frequency.currentDaily,
      remainingToday: config.frequency.maxDaily > 0 
        ? Math.max(0, config.frequency.maxDaily - config.frequency.currentDaily)
        : -1, // unlimited
      todayAlertsCount: todayAlerts?.length || 0,
      unreadCount: (todayAlerts || []).filter((a: { acknowledged?: boolean }) => !a.acknowledged).length,
      activeThresholds: config.thresholds.filter(t => t.enabled).length,
      notificationDevices: config.notificationDevices.filter(d => d.enabled).length
    })

  } catch (error) {
    console.error('Failed to get alert status:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve alert status' },
      { status: 500 }
    )
  }
}

/**
 * 最近のアラート履歴を取得
 */
async function getRecentAlerts(userId: string): Promise<NextResponse> {
  const supabase = createClient()
  
  try {
    const { data: alerts, error } = await (await supabase)
      .from('alert_history')
      .select(`
        id,
        alert_type as type,
        coin_symbol as symbol,
        title,
        message,
        priority as severity,
        sent_at as createdAt,
        ai_analysis,
        action_suggestion
      `)
      .eq('user_id', userId)
      .order('sent_at', { ascending: false })
      .limit(20)

    if (error) throw error

    return NextResponse.json({ data: alerts || [], count: alerts?.length || 0 })

  } catch (error) {
    console.error('Failed to get recent alerts:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve alert history' },
      { status: 500 }
    )
  }
}

/**
 * アラート統計を取得
 */
async function getAlertStats(userId: string): Promise<NextResponse> {
  const dispatcher = new NotificationDispatcher()
  
  try {
    const stats = await dispatcher.getDeliveryStats(userId, 30) // 過去30日
    
    return NextResponse.json(stats)

  } catch (error) {
    console.error('Failed to get alert stats:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve alert statistics' },
      { status: 500 }
    )
  }
}

async function ackAlerts(userId: string, opts: { id?: string; all?: boolean }): Promise<NextResponse> {
  const supabase = createClient()
  try {
    if (opts.all) {
      const { error } = await (await supabase)
        .from('alert_history')
        .update({ acknowledged: true, acknowledged_at: new Date().toISOString() })
        .eq('user_id', userId)
        .eq('acknowledged', false)
      if (error) throw error
      return NextResponse.json({ success: true, updated: 'all' })
    }
    if (!opts.id) return NextResponse.json({ success: false, error: 'id required' }, { status: 400 })
    const { error } = await (await supabase)
      .from('alert_history')
      .update({ acknowledged: true, acknowledged_at: new Date().toISOString() })
      .eq('user_id', userId)
      .eq('id', opts.id)
    if (error) throw error
    return NextResponse.json({ success: true, updated: opts.id })
  } catch (e) {
    return NextResponse.json({ success: false, error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
}
