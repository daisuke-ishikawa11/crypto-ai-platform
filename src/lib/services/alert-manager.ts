import { 
  AlertConfig, 
  Alert, 
  AlertThreshold, 
  MarketData, 
  PlanType, 
  PLAN_CONFIGS,
  AIAnalysis,
  AlertType
} from '@/lib/types/alerts'
import { createClient } from '@/lib/supabase/client'

interface TimeSlot {
  id: string
  name: string
  enabled: boolean
  startTime: string
  endTime: string
}

interface LocalNotificationDevice {
  type: 'email' | 'sms' | 'push' | 'webhook'
  identifier: string
  enabled: boolean
  config?: Record<string, unknown>
}

interface DatabaseAlertConfig {
  id: string
  user_id: string
  plan_type: PlanType
  alert_types: AlertType[]
  frequency: unknown
  notification_devices: string[]
  thresholds: AlertThreshold[]
  preferences: Record<string, unknown>
  created_at: string
  updated_at: string
}

export class AlertManager {
  private supabase = createClient()

  /**
   * ユーザーのアラート設定を取得
   */
  async getUserAlertConfig(userId: string): Promise<AlertConfig | null> {
    const { data, error } = await this.supabase
      .from('user_alert_configs')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error || !data) return null

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
   * プラン制限をチェック
   */
  private checkPlanLimits(config: AlertConfig): boolean {
    const planConfig = PLAN_CONFIGS[config.planType]
    
    // 日次制限チェック
    if (planConfig.maxDailyAlerts > 0 && 
        config.frequency.currentDaily >= planConfig.maxDailyAlerts) {
      return false
    }

    return true
  }

  /**
   * アラート閾値をチェックして、トリガーされるアラートを判定
   */
  async checkThresholds(marketData: MarketData): Promise<Alert[]> {
    const triggeredAlerts: Alert[] = []

    // 全ユーザーのアクティブな閾値を取得
    const { data: activeThresholds } = await this.supabase
      .from('user_alert_configs')
      .select(`
        *,
        users!inner(
          id,
          plan_type
        )
      `)

    if (!activeThresholds) return []

    for (const userConfig of activeThresholds) {
      const config = this.parseAlertConfig(userConfig)
      
      // プラン制限チェック
      if (!this.checkPlanLimits(config)) continue

      // 各閾値をチェック
      for (const threshold of config.thresholds) {
        if (!threshold.enabled) continue
        if (threshold.coinSymbol !== marketData.symbol) continue

        const isTriggered = this.evaluateThreshold(threshold, marketData)
        
        if (isTriggered) {
          const alert = await this.createAlert(
            config, 
            threshold, 
            marketData
          )
          triggeredAlerts.push(alert)
        }
      }
    }

    return triggeredAlerts
  }

  /**
   * 閾値評価ロジック
   */
  private evaluateThreshold(
    threshold: AlertThreshold, 
    marketData: MarketData
  ): boolean {
    switch (threshold.condition) {
      case 'above':
        return marketData.price > threshold.value
      case 'below':
        return marketData.price < threshold.value
      case 'change_percent':
        return Math.abs(marketData.changePercent24h) >= threshold.value
      default:
        return false
    }
  }

  /**
   * アラートオブジェクトの作成
   */
  private async createAlert(
    config: AlertConfig,
    threshold: AlertThreshold,
    marketData: MarketData
  ): Promise<Alert> {
    const planConfig = PLAN_CONFIGS[config.planType]
    
    // AI分析の実行（プランに応じて）
    let aiAnalysis: AIAnalysis | undefined
    if (planConfig.aiAnalysis) {
      aiAnalysis = await this.generateAIAnalysis(
        config.planType,
        marketData
      )
    }

    // 学習コンテンツとの連携
    let learningTip
    if (planConfig.learningTips) {
      learningTip = await this.findRelevantLearning(
        threshold.type,
        marketData.symbol
      )
    }

    const alert: Alert = {
      id: crypto.randomUUID(),
      userId: config.userId,
      type: threshold.type,
      coinSymbol: marketData.symbol,
      title: this.generateAlertTitle(threshold.type, marketData),
      message: this.generateAlertMessage(
        config.planType,
        threshold.type, 
        marketData
      ),
      priority: threshold.priority,
      marketData,
      aiAnalysis,
      learningTip,
      actionSuggestion: this.generateActionSuggestion(
        config.planType,
        threshold.type,
        marketData,
        aiAnalysis
      ),
      createdAt: new Date().toISOString(),
      triggeredBy: threshold
    }

    // アラート履歴に保存
    await this.saveAlertToHistory(alert)

    return alert
  }

  /**
   * プラン別AI分析生成
   */
  private async generateAIAnalysis(
    planType: PlanType,
    marketData: MarketData
  ): Promise<AIAnalysis> {
    switch (planType) {
      case 'free':
        // 無料プランはAI分析なし
        throw new Error('Free plan does not include AI analysis')

      case 'basic':
        return this.basicAIAnalysis(marketData)

      case 'premium':
        return this.advancedAIAnalysis(marketData)

      default:
        throw new Error(`Unknown plan type: ${planType}`)
    }
  }

  /**
   * ベーシックプラン向けAI分析
   */
  private async basicAIAnalysis(marketData: MarketData): Promise<AIAnalysis> {
    // シンプルな技術的分析
    let prediction: 'bullish' | 'bearish' | 'neutral' = 'neutral'
    let riskLevel: 'low' | 'medium' | 'high' = 'medium'

    if (marketData.changePercent24h > 10) {
      prediction = 'bullish'
      riskLevel = 'high'
    } else if (marketData.changePercent24h < -10) {
      prediction = 'bearish'
      riskLevel = 'high'
    }

    return {
      confidence: 0.6,
      prediction,
      timeframe: '1d',
      reasoning: `24時間の価格変動（${marketData.changePercent24h.toFixed(2)}%）に基づく基本分析`,
      riskLevel,
      suggestedAction: prediction === 'bullish' ? '利益確定の検討' : 
                      prediction === 'bearish' ? '損切りラインの確認' : 
                      '様子見を推奨'
    }
  }

  /**
   * プレミアムプラン向け高度なAI分析
   */
  private async advancedAIAnalysis(marketData: MarketData): Promise<AIAnalysis> {
    try {
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          marketData,
          analysisType: 'advanced_prediction',
          timeframes: ['1h', '4h', '1d', '1w']
        })
      })

      const analysis = await response.json()
      return analysis
    } catch (error) {
      console.error('Advanced AI analysis failed:', error)
      // フォールバックとしてベーシック分析
      return this.basicAIAnalysis(marketData)
    }
  }

  /**
   * 関連する学習コンテンツの検索
   */
  private async findRelevantLearning(
    alertType: AlertType,
    coinSymbol: string
  ) {
    // アラートタイプに基づいて関連レッスンを検索
    const lessonMapping = {
      price_alert: 'basic-trading-1',
      trend_change: 'technical-analysis-1',
      volume_spike: 'market-analysis-1',
      resistance_support: 'technical-analysis-2'
    }

    const lessonId = lessonMapping[alertType as keyof typeof lessonMapping]
    if (!lessonId) return undefined

    // レッスン情報を取得（実際の実装では lesson service を使用）
    return {
      lessonId,
      lessonTitle: 'テクニカル分析の基礎',
      explanation: 'このアラートに関連する投資概念をレッスンで学習できます'
    }
  }

  /**
   * アラートタイトルの生成
   */
  private generateAlertTitle(
    alertType: AlertType, 
    marketData: MarketData
  ): string {
    switch (alertType) {
      case 'price_alert':
        return `${marketData.symbol} 価格アラート`
      case 'volatility_alert':
        return `${marketData.symbol} 大幅変動検出`
      case 'trend_change':
        return `${marketData.symbol} トレンド転換`
      case 'volume_spike':
        return `${marketData.symbol} 取引量急増`
      default:
        return `${marketData.symbol} アラート`
    }
  }

  /**
   * プラン別アラートメッセージ生成
   */
  private generateAlertMessage(
    planType: PlanType,
    alertType: AlertType,
    marketData: MarketData
  ): string {
    const baseMessage = this.getBaseMessage(alertType, marketData)
    
    switch (planType) {
      case 'free':
        return `${baseMessage}\n\n現在価格: ¥${marketData.price.toLocaleString()}`
        
      case 'basic':
        return `${baseMessage}\n\n` +
               `現在価格: ¥${marketData.price.toLocaleString()}\n` +
               `24時間変動: ${marketData.changePercent24h.toFixed(2)}%\n` +
               `取引量: ¥${(marketData.volume24h / 1000000).toFixed(0)}M`
               
      case 'premium':
        return `${baseMessage}\n\n` +
               `📊 詳細情報:\n` +
               `現在価格: ¥${marketData.price.toLocaleString()}\n` +
               `24時間変動: ${marketData.changePercent24h.toFixed(2)}%\n` +
               `取引量: ¥${(marketData.volume24h / 1000000).toFixed(0)}M\n` +
               `時価総額: ¥${(marketData.marketCap / 1000000000).toFixed(1)}B`
               
      default:
        return baseMessage
    }
  }

  /**
   * 基本メッセージの生成
   */
  private getBaseMessage(alertType: AlertType, marketData: MarketData): string {
    switch (alertType) {
      case 'price_alert':
        return `${marketData.symbol}が指定価格に到達しました。`
      case 'volatility_alert':
        return `${marketData.symbol}で大きな価格変動が発生しています。`
      case 'trend_change':
        return `${marketData.symbol}のトレンドに変化の兆候が見られます。`
      case 'volume_spike':
        return `${marketData.symbol}の取引量が急増しています。`
      default:
        return `${marketData.symbol}に注目すべき動きがあります。`
    }
  }

  /**
   * アクション提案の生成
   */
  private generateActionSuggestion(
    planType: PlanType,
    alertType: AlertType,
    marketData: MarketData,
    aiAnalysis?: AIAnalysis
  ): string {
    if (planType === 'free') {
      return '詳しい分析とアクション提案はベーシックプラン以上で利用可能です。'
    }

    if (aiAnalysis?.suggestedAction) {
      return aiAnalysis.suggestedAction
    }

    // フォールバック提案
    switch (alertType) {
      case 'price_alert':
        return '目標価格に到達しました。利益確定や追加購入を検討してください。'
      case 'volatility_alert':
        return '市場が不安定です。リスク管理を確認し、慎重に行動してください。'
      default:
        return '市場状況を確認し、投資戦略を見直すタイミングかもしれません。'
    }
  }

  /**
   * アラート履歴の保存
   */
  private async saveAlertToHistory(alert: Alert): Promise<void> {
    await this.supabase
      .from('alert_history')
      .insert({
        id: alert.id,
        user_id: alert.userId,
        alert_type: alert.type,
        coin_symbol: alert.coinSymbol,
        title: alert.title,
        message: alert.message,
        priority: alert.priority,
        market_data: alert.marketData,
        ai_analysis: alert.aiAnalysis,
        learning_tip: alert.learningTip,
        action_suggestion: alert.actionSuggestion,
        created_at: alert.createdAt,
        triggered_by: alert.triggeredBy
      })
  }

  /**
   * データベースレコードをAlertConfigにパース
   */
  private parseAlertConfig(record: DatabaseAlertConfig): AlertConfig {
    return {
      id: record.id,
      userId: record.user_id,
      planType: record.plan_type,
      alertTypes: record.alert_types,
      frequency: {
        maxDaily: (record.frequency as Record<string, unknown> | null | undefined)?.maxDaily as number || 10,
        currentDaily: (record.frequency as Record<string, unknown> | null | undefined)?.currentDaily as number || 0,
        timeSlots: (((record.frequency as Record<string, unknown> | null | undefined)?.timeSlots as Array<Record<string, unknown>> | undefined) || []).map((slot: Record<string, unknown>) => ({
          id: slot?.id || `slot_${Date.now()}`,
          name: slot?.name || 'Default',
          enabled: slot?.enabled !== false,
          startTime: slot?.startTime || '09:00',
          endTime: slot?.endTime || '18:00'
        })) as TimeSlot[],
        customTimes: ((record.frequency as Record<string, unknown> | null | undefined)?.customTimes as string[] | undefined)
      },
      notificationDevices: (record.notification_devices as string[]).map(d => ({
        type: d as 'email' | 'sms' | 'push' | 'webhook',
        identifier: '',
        enabled: true
      })) as LocalNotificationDevice[],
      thresholds: Array.isArray(record.thresholds) ? record.thresholds as AlertThreshold[] : [],
      preferences: record.preferences as { includeAnalysis: boolean; includeLearningTips: boolean; language: "ja" | "en" },
      createdAt: record.created_at,
      updatedAt: record.updated_at
    }
  }

  /**
   * 日次アラートカウンターをリセット（スケジュールジョブで実行）
   */
  async resetDailyCounters(): Promise<void> {
    // Use RPC call instead of raw SQL for better compatibility
    await this.supabase.rpc('reset_daily_alert_counters');
  }

  /**
   * アラート配信数を増加
   */
  async incrementDailyCounter(userId: string): Promise<void> {
    // Use RPC call for incrementing counters
    await this.supabase.rpc('increment_daily_alert_counter', { 
      user_id: userId 
    });
  }
}
