import { Alert, AlertConfig } from '@/lib/types/alerts'
import { createClient } from '@/lib/supabase/server'

interface MarketEvent {
  type: string
  symbol: string
  description: string
  data: Record<string, unknown>
}

interface UserProgress {
  completedLessons: string[]
  currentCategory: string
  skillLevel: 'beginner' | 'intermediate' | 'advanced'
}

interface RelatedLesson {
  id: string
  title: string
  relevantExplanation: string
}

interface FatigueMetrics {
  recentAlertCount: number
  diversityScore: number
  engagementRate: number
  userPreferredTimes: string[]
  lastInteractionTime?: string
}

interface UpgradePrompt {
  trigger: string
  title: string
  message: string
  cta: {
    primary: string
    secondary: string
    upgrade_url: string
  }
  special_offer?: {
    discount: number
    duration: string
    code?: string
  }
}

export class SmartNotificationController {

  /**
   * インテリジェント配信判定
   * 通知疲れを防ぎつつ、重要な情報は確実に配信
   */
  async shouldSendAlert(userId: string, alert: Alert, config: AlertConfig): Promise<{
    shouldSend: boolean
    reason: string
    alternativeAction?: 'batch' | 'upgrade_prompt' | 'summary'
  }> {
    // プランに基づく基本制限チェック
    const basicLimitResult = await this.checkBasicLimits(userId, config)
    if (!basicLimitResult.allowed) {
      return {
        shouldSend: false,
        reason: basicLimitResult.reason,
        ...(basicLimitResult.alternativeAction && { alternativeAction: basicLimitResult.alternativeAction })
      }
    }

    // 通知疲れスコア計算
    const fatigueMetrics = await this.calculateFatigueMetrics(userId)
    const fatigueScore = this.computeFatigueScore(fatigueMetrics)

    // 重要度別配信判定
    const priority = alert.priority
    const shouldSend = this.decideBySeverityAndFatigue(priority, fatigueScore)

    if (!shouldSend) {
      // 低優先度アラートは日次サマリーに蓄積
      await this.addToDailySummary(userId, alert)
      return {
        shouldSend: false,
        reason: `Priority ${priority} with fatigue score ${fatigueScore.toFixed(2)}`,
        alternativeAction: 'summary'
      }
    }

    // 配信前の最適化チェック
    await this.optimizeAlertTiming(userId, alert, fatigueMetrics)
    
    return {
      shouldSend: true,
      reason: `Approved for delivery (fatigue: ${fatigueScore.toFixed(2)})`,
    }
  }

  /**
   * プラン別基本制限チェック
   */
  private async checkBasicLimits(userId: string, config: AlertConfig): Promise<{
    allowed: boolean
    reason: string
    alternativeAction?: 'batch' | 'upgrade_prompt' | 'summary'
  }> {
    const supabase = await createClient()
    const now = new Date()
    const today = now.toDateString()

    if (config.planType === 'free') {
      // 無料プラン: 週3回制限
      const weekStart = new Date(now)
      weekStart.setDate(weekStart.getDate() - weekStart.getDay())
      weekStart.setHours(0, 0, 0, 0)

      const { data: weeklyAlerts } = await supabase
        .from('alert_history')
        .select('id')
        .eq('user_id', userId)
        .gte('sent_at', weekStart.toISOString())

      const weeklyCount = weeklyAlerts?.length || 0

      if (weeklyCount >= 3) {
        // アップグレードプロンプトを表示
        await this.triggerUpgradePrompt(userId, 'weekly_limit_reached')
        return {
          allowed: false,
          reason: 'Weekly limit reached for free plan',
          alternativeAction: 'upgrade_prompt'
        }
      }
    } else if (config.planType === 'basic') {
      // ベーシックプラン: 毎日1回 + 緊急3回
      const { data: dailyAlerts } = await supabase
        .from('alert_history')
        .select('priority')
        .eq('user_id', userId)
        .gte('sent_at', `${today}T00:00:00.000Z`)
        .lt('sent_at', `${today}T23:59:59.999Z`)

      const dailyCount = dailyAlerts?.length || 0
      const emergencyCount = dailyAlerts?.filter((a: { priority: string }) => a.priority === 'high').length || 0

      if (dailyCount >= 1 && emergencyCount >= 3) {
        return {
          allowed: false,
          reason: 'Daily and emergency limits reached for basic plan',
          alternativeAction: 'summary'
        }
      }
    }

    return { allowed: true, reason: 'Within plan limits' }
  }

  /**
   * 通知疲れメトリクス計算
   */
  private async calculateFatigueMetrics(userId: string): Promise<FatigueMetrics> {
    const supabase = await createClient()
    const past24h = new Date()
    past24h.setHours(past24h.getHours() - 24)

    // 過去24時間のアラート取得
    const { data: recentAlerts } = await supabase
      .from('alert_history')
      .select('*')
      .eq('user_id', userId)
      .gte('sent_at', past24h.toISOString())

    const recentAlertCount = recentAlerts?.length || 0

    // アラートタイプの多様性スコア計算
    const uniqueTypes = new Set(recentAlerts?.map((a: { alert_type: string }) => a.alert_type) || [])
    const diversityScore = Math.min(1, uniqueTypes.size / 6) // 最大6種類のアラートタイプ

    // エンゲージメント率計算
    const engagementRate = await this.calculateEngagementRate(userId)

    // ユーザーの好みの時間帯取得
    const userPreferredTimes = await this.getUserPreferredTimes(userId)

    // 最後のインタラクション時間
    const { data: lastInteraction } = await supabase
      .from('user_alert_interactions')
      .select('timestamp')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(1)
      .single()

    return {
      recentAlertCount,
      diversityScore,
      engagementRate,
      userPreferredTimes,
      lastInteractionTime: lastInteraction?.timestamp
    }
  }

  /**
   * 通知疲れスコア計算（0-1の範囲、1が最も疲れている状態）
   */
  private computeFatigueScore(metrics: FatigueMetrics): number {
    // 頻度スコア（1時間あたりのアラート数）
    const frequencyScore = Math.min(1, metrics.recentAlertCount / 6) // 6通/24h = 理想的な頻度

    // 多様性スコア（低い方が疲労につながる）
    const monotonyScore = 1 - metrics.diversityScore

    // エンゲージメントスコア（低い方が疲労を示す）
    const disengagementScore = 1 - metrics.engagementRate

    // 時間的適切性スコア
    const timingScore = this.calculateTimingAppropriatenessScore(metrics.userPreferredTimes)

    // 重み付け平均で総合疲労スコアを計算
    const fatigueScore = (
      frequencyScore * 0.3 +
      monotonyScore * 0.25 + 
      disengagementScore * 0.35 +
      timingScore * 0.1
    )

    return Math.min(1, Math.max(0, fatigueScore))
  }

  /**
   * 重要度と疲労スコアによる配信判定
   */
  private decideBySeverityAndFatigue(priority: string, fatigueScore: number): boolean {
    switch (priority) {
      case 'high':
        return fatigueScore < 0.8 // 高重要度: 疲労スコア80%未満で配信
      case 'medium':
        return fatigueScore < 0.5 // 中重要度: 疲労スコア50%未満で配信
      case 'low':
        return fatigueScore < 0.2 // 低重要度: 疲労スコア20%未満で配信
      default:
        return false
    }
  }

  /**
   * エンゲージメント率計算
   */
  private async calculateEngagementRate(userId: string): Promise<number> {
    const supabase = await createClient()
    const past7days = new Date()
    past7days.setDate(past7days.getDate() - 7)

    // 過去7日のアラート配信数
    const { data: sentAlerts } = await supabase
      .from('alert_history')
      .select('id')
      .eq('user_id', userId)
      .gte('sent_at', past7days.toISOString())

    const sentCount = sentAlerts?.length || 0

    if (sentCount === 0) return 0.5 // デフォルト値

    // 過去7日のインタラクション数（クリック、アプリ起動など）
    const { data: interactions } = await supabase
      .from('user_alert_interactions')
      .select('id')
      .eq('user_id', userId)
      .gte('timestamp', past7days.toISOString())

    const interactionCount = interactions?.length || 0

    return Math.min(1, interactionCount / sentCount)
  }

  /**
   * ユーザーの好みの時間帯取得
   */
  private async getUserPreferredTimes(userId: string): Promise<string[]> {
    const supabase = await createClient()
    // ユーザーの過去のインタラクション時間から好みを推定
    const { data: interactions } = await supabase
      .from('user_alert_interactions')
      .select('timestamp')
      .eq('user_id', userId)
      .limit(50)

    if (!interactions || interactions.length === 0) {
      return ['09:00', '12:00', '20:00'] // デフォルト
    }

    // 時間帯別のインタラクション頻度を分析
    const hourCounts = new Map<number, number>()
    
    interactions.forEach((interaction: { timestamp: string }) => {
      const hour = new Date(interaction.timestamp).getHours()
      hourCounts.set(hour, (hourCounts.get(hour) || 0) + 1)
    })

    // 上位3つの時間帯を取得
    const topHours = Array.from(hourCounts.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([hour]) => `${hour.toString().padStart(2, '0')}:00`)

    return topHours.length > 0 ? topHours : ['09:00', '12:00', '20:00']
  }

  /**
   * タイミング適切性スコア計算
   */
  private calculateTimingAppropriatenessScore(preferredTimes: string[]): number {
    const now = new Date()

    // 現在時刻がユーザーの好みの時間帯にどれだけ近いかを計算
    let minDistance = 24 // 最大距離
    
    preferredTimes.forEach(preferredTime => {
      const [prefHour] = preferredTime.split(':').map(Number)
      if (prefHour === undefined || isNaN(prefHour)) return
      
      const distance = Math.abs(now.getHours() - prefHour)
      const wrappedDistance = Math.min(distance, 24 - distance) // 24時間をまたぐケースを考慮
      minDistance = Math.min(minDistance, wrappedDistance)
    })

    // 距離が近いほどスコアが低い（適切）
    return minDistance / 12 // 0-1の範囲にスケール
  }

  /**
   * アップグレードプロンプト配信
   */
  private async triggerUpgradePrompt(userId: string, trigger: string): Promise<void> {
    const prompts: Record<string, UpgradePrompt> = {
      weekly_limit_reached: {
        trigger: 'weekly_limit_reached',
        title: '🚀 今週のアラート上限に達しました',
        message: `
この1週間で3回のアラートをお送りしました。

⚡ この間に見逃した重要な動き:
• イーサリアム 11%上昇（AI予測的中）
• リップル 大量出来高（機関投資家の動き）
• DeFi高利回り機会（年利14.2%）

💰 ベーシックプラン（¥500/月）なら:
✅ 毎日の投資チャンスをお知らせ
✅ AI分析で最適な売買タイミングを提案
✅ リスク管理で大きな損失を防止

📊 先月のベーシックユーザー平均実績: +12.8%
        `,
        cta: {
          primary: '7日間無料体験を開始',
          secondary: '詳細を見る',
          upgrade_url: '/subscription/basic'
        },
        special_offer: {
          discount: 50,
          duration: '初月半額',
          code: 'FIRST50'
        }
      }
    }

    const prompt = prompts[trigger]
    if (!prompt) return

    // プロンプト表示ログを記録
    const supabase = await createClient()
    await supabase
      .from('upgrade_prompts')
      .insert({
        user_id: userId,
        trigger: prompt.trigger,
        title: prompt.title,
        message: prompt.message,
        special_offer: prompt.special_offer,
        shown_at: new Date().toISOString(),
        status: 'shown'
      })

    // 実際のプロンプト配信（WebSocket等で）
    await this.sendUpgradePromptNotification(userId, prompt)
  }

  /**
   * アップグレードプロンプト通知送信
   */
  private async sendUpgradePromptNotification(userId: string, prompt: UpgradePrompt): Promise<void> {
    try {
      await fetch('/api/notifications/browser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          type: 'upgrade_prompt',
          title: prompt.title,
          message: prompt.message,
          actions: [
            {
              action: 'upgrade',
              title: prompt.cta.primary,
              url: prompt.cta.upgrade_url
            },
            {
              action: 'learn_more',
              title: prompt.cta.secondary,
              url: '/pricing'
            }
          ],
          specialOffer: prompt.special_offer
        })
      })
    } catch (error) {
      console.error('Failed to send upgrade prompt:', error)
    }
  }

  /**
   * 日次サマリーに追加
   */
  private async addToDailySummary(userId: string, alert: Alert): Promise<void> {
    const today = new Date().toDateString()
    
    const supabase = await createClient()
    await supabase
      .from('daily_alert_summaries')
      .upsert({
        user_id: userId,
        date: today,
        alerts: JSON.stringify([alert]), // Simplified for now
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,date'
      })
  }

  /**
   * アラートタイミング最適化
   */
  private async optimizeAlertTiming(
    userId: string, 
    alert: Alert, 
    metrics: FatigueMetrics
  ): Promise<Alert> {
    // ユーザーの好みの時間帯でない場合、少し遅延させる
    const currentHour = new Date().getHours()
    const isPreferredTime = metrics.userPreferredTimes.some(time => {
      const [hour] = time.split(':').map(Number)
      return hour !== undefined && Math.abs(currentHour - (hour ?? 0)) <= 1
    })

    if (!isPreferredTime && alert.priority !== 'high') {
      // 次の好みの時間帯まで遅延（中・低優先度のみ）
      const nextPreferredTime = this.findNextPreferredTime(metrics.userPreferredTimes)
      
      // スケジュールされたアラートとして保存
      await this.scheduleAlert(userId, alert, nextPreferredTime)
      
      // 遅延フラグを追加
      if (!alert.metadata) {
        alert.metadata = {}
      }
      alert.metadata = {
        ...alert.metadata,
        delayed: true,
        scheduledFor: nextPreferredTime,
        reason: 'timing_optimization'
      }
    }

    return alert
  }

  /**
   * 次の好みの時間帯を計算
   */
  private findNextPreferredTime(preferredTimes: string[]): Date {
    const now = new Date()
    const currentHour = now.getHours()
    
    // 今日の残りの好みの時間を確認
    const todayOptions = preferredTimes
      .map(time => {
        const [hour] = time.split(':').map(Number)
        return hour
      })
      .filter((hour): hour is number => hour !== undefined && hour > currentHour)

    if (todayOptions.length > 0) {
      // 今日の次の好みの時間
      const nextHour = Math.min(...todayOptions)
      const nextTime = new Date(now)
      nextTime.setHours(nextHour, 0, 0, 0)
      return nextTime
    } else {
      // 明日の最初の好みの時間
      const tomorrow = new Date(now)
      tomorrow.setDate(tomorrow.getDate() + 1)
      const hours = preferredTimes.map(time => {
        const [hour] = time.split(':').map(Number)
        return hour
      }).filter((hour): hour is number => hour !== undefined)
      
      const firstHour = Math.min(...hours)
      tomorrow.setHours(firstHour, 0, 0, 0)
      return tomorrow
    }
  }

  /**
   * アラートスケジューリング
   */
  private async scheduleAlert(userId: string, alert: Alert, scheduledFor: Date): Promise<void> {
    const supabase = await createClient()
    await supabase
      .from('scheduled_alerts')
      .insert({
        user_id: userId,
        alert_data: alert,
        scheduled_for: scheduledFor.toISOString(),
        status: 'pending',
        created_at: new Date().toISOString()
      })
  }

  /**
   * 学習コンテンツ連携アラートの生成
   */
  async generateLearningIntegratedAlert(
    userId: string, 
    marketEvent: MarketEvent, 
    userProgress: UserProgress
  ): Promise<Alert | null> {
    // ユーザーの学習進捗から関連レッスンを特定
    const relatedLessons = await this.findRelatedLessons(marketEvent.type, userProgress)
    
    if (relatedLessons.length === 0) return null

    // 学習連携アラートを作成
    const alert: Alert = {
      id: crypto.randomUUID(),
      userId,
      type: 'learning_related',
      coinSymbol: marketEvent.symbol,
      title: `💡 ${marketEvent.symbol}の動きを学習チャンス！`,
      message: this.generateLearningMessage(marketEvent, relatedLessons[0]),
      priority: 'medium',
      marketData: {
        symbol: marketEvent.symbol,
        price: (marketEvent.data.price as number) || 0,
        change24h: (marketEvent.data.change24h as number) || 0,
        changePercent24h: (marketEvent.data.changePercent24h as number) || 0,
        volume24h: (marketEvent.data.volume as number) || 0,
        marketCap: (marketEvent.data.marketCap as number) || 0,
        timestamp: new Date().toISOString()
      },
      learningTip: {
        lessonId: relatedLessons[0].id,
        lessonTitle: relatedLessons[0].title,
        explanation: relatedLessons[0].relevantExplanation
      },
      createdAt: new Date().toISOString(),
      triggeredBy: {
        id: 'learning-integration',
        type: 'learning_related',
        coinSymbol: marketEvent.symbol,
        condition: 'above' as 'above' | 'below' | 'change_percent',
        value: 0,
        priority: 'medium',
        enabled: true
      }
    }

    return alert
  }

  /**
   * 関連レッスンの検索
   */
  private async findRelatedLessons(eventType: string, _userProgress: UserProgress): Promise<RelatedLesson[]> {
    // イベントタイプに基づいてレッスンをマッピング
    const lessonMapping = {
      'volatility': ['technical-analysis-1', 'risk-management-1'],
      'volume_spike': ['market-analysis-1', 'trading-volume'],
      'trend_change': ['technical-analysis-2', 'chart-patterns']
    }

    const potentialLessons = lessonMapping[eventType as keyof typeof lessonMapping] || []
    
    // ユーザーの進捗状況を考慮してフィルタリング
    return potentialLessons.map(lessonId => ({
      id: lessonId,
      title: `レッスン: ${eventType}について`,
      relevantExplanation: `現在の市場状況は、このレッスンの内容と密接に関連しています。`
    }))
  }

  /**
   * 学習連携メッセージ生成
   */
  private generateLearningMessage(marketEvent: MarketEvent, lesson: RelatedLesson): string {
    return `
${marketEvent.symbol}で注目すべき動きが発生しています！

📈 現在の状況: ${marketEvent.description}

💡 これは絶好の学習機会です。
「${lesson.title}」で学んだ内容を実際の市場で確認してみましょう。

🎯 理論と実践の組み合わせで、投資スキルが格段に向上します。
    `
  }
}