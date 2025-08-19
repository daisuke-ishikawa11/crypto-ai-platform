import {
  Alert,
  AlertConfig,
  NotificationDeviceType,
  DeliveryResult,
  AlertDelivery,
  PLAN_CONFIGS
} from '@/lib/types/alerts'
import { createClient } from '@/lib/supabase/client'
import { getRedis } from '@/lib/redis/client'
import { toRecord } from '@/lib/types/guards'

interface NotificationChannel {
  send(alert: Alert, device: Record<string, unknown>, planType: string): Promise<boolean>
}

export class NotificationDispatcher {
  private supabase = createClient()
  private channels: Map<NotificationDeviceType, NotificationChannel>

  constructor() {
    this.channels = new Map([
      ['browser', new BrowserNotificationChannel()],
      ['email', new EmailNotificationChannel()],
      ['line', new LineNotificationChannel()],
      ['discord', new DiscordNotificationChannel()],
      ['slack', new SlackNotificationChannel()],
      ['telegram', new TelegramNotificationChannel()],
      ['sms', new SmsNotificationChannel()],
      ['push', new PushNotificationChannel()],
      ['webhook', new WebhookNotificationChannel()]
    ])
  }

  /**
   * アラートを配信
   */
  async dispatch(alert: Alert, config: AlertConfig): Promise<AlertDelivery> {
    const planConfig = PLAN_CONFIGS[config.planType]
    // ユーザー通知設定の反映（DND/QuietHours/個人Discord）
    const prefs = await this.loadUserNotificationSettings(alert.userId)
    if (prefs?.dnd) {
      return { alertId: alert.id, userId: alert.userId, planType: config.planType, results: [], totalDevices: 0, successfulDeliveries: 0, deliveredAt: new Date().toISOString() }
    }
    if (prefs?.quietHours && this.isWithinQuietHours(prefs.quietHours) && alert.priority !== 'high') {
      return { alertId: alert.id, userId: alert.userId, planType: config.planType, results: [], totalDevices: 0, successfulDeliveries: 0, deliveredAt: new Date().toISOString() }
    }
    const allowedDevices = config.notificationDevices.filter(
      device => planConfig.allowedDevices.includes(device.type) && device.enabled
    )

    const results: DeliveryResult[] = []
    
    // 各デバイスに並列配信
    const deliveryPromises = allowedDevices.map(async (device) => {
      try {
        const channel = this.channels.get(device.type)
        if (!channel) {
          throw new Error(`Unsupported notification channel: ${device.type}`)
        }

        const deviceObj = ((): Record<string, unknown> => {
          if (device && typeof device === 'object') {
            const base = { ...toRecord(device) }
            if (device.type === 'discord' && prefs?.discordWebhook) {
              return { ...base, identifier: prefs.discordWebhook }
            }
            return base
          }
          return {}
        })()
        const success = await channel.send(alert, deviceObj, config.planType)
        
        return {
          deviceType: device.type,
          success,
          deliveredAt: new Date().toISOString()
        } as DeliveryResult
      } catch (error) {
        return {
          deviceType: device.type,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        } as DeliveryResult
      }
    })

    const deliveryResults = await Promise.allSettled(deliveryPromises)
    
    deliveryResults.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        results.push(result.value)
      } else {
        results.push({
          deviceType: (allowedDevices[index]?.type as NotificationDeviceType) || 'email',
          success: false,
          error: (result as PromiseRejectedResult).reason?.message || 'Promise rejected'
        })
      }
    })

    const delivery: AlertDelivery = {
      alertId: alert.id,
      userId: alert.userId,
      planType: config.planType,
      results,
      totalDevices: allowedDevices.length,
      successfulDeliveries: results.filter(r => r.success).length,
      deliveredAt: new Date().toISOString()
    }

    // 配信結果を保存
    await this.saveDeliveryResult(delivery)

    return delivery
  }

  /**
   * 配信結果をデータベースに保存
   */
  private async saveDeliveryResult(delivery: AlertDelivery): Promise<void> {
    const supabase = this.supabase;
    if (supabase && typeof supabase === 'object' && 'from' in supabase && typeof (supabase as { from?: unknown }).from === 'function') {
      try {
        const table = (supabase as { from: (table: string) => unknown }).from('alert_deliveries')
        if (table && typeof table === 'object' && 'insert' in table && typeof (table as { insert?: unknown }).insert === 'function') {
          await (table as { insert: (data: Record<string, unknown>) => unknown }).insert({
            alert_id: delivery.alertId,
            user_id: delivery.userId,
            plan_type: delivery.planType,
            results: delivery.results,
            total_devices: delivery.totalDevices,
            successful_deliveries: delivery.successfulDeliveries,
            delivered_at: delivery.deliveredAt
          })
        }
      } catch (error) {
        // 失敗はログに留めて続行
        console.error('Failed to save delivery result', error)
      }
    }
  }

  /**
   * 配信統計を取得
   */
  async getDeliveryStats(userId: string, days = 7): Promise<{
    totalAlerts: number
    successRate: number
    deviceBreakdown: Record<NotificationDeviceType, number>
  }> {
    const supabase = this.supabase;
    if (!supabase || !('from' in supabase) || typeof supabase.from !== 'function') {
      return {
        totalAlerts: 0,
        successRate: 0,
        deviceBreakdown: {} as Record<NotificationDeviceType, number>
      };
    }

    const fromCapable = (obj: unknown): obj is { from: (table: string) => unknown } => {
      return !!obj && typeof obj === 'object' && 'from' in obj && typeof (obj as { from?: unknown }).from === 'function'
    }
    const selectCapable = (obj: unknown): obj is { select: (cols: string) => unknown } => {
      return !!obj && typeof obj === 'object' && 'select' in obj && typeof (obj as { select?: unknown }).select === 'function'
    }
    const eqCapable = (obj: unknown): obj is { eq: (col: string, val: string) => unknown } => {
      return !!obj && typeof obj === 'object' && 'eq' in obj && typeof (obj as { eq?: unknown }).eq === 'function'
    }
    const gteCapable = (obj: unknown): obj is { gte: (col: string, val: string) => Promise<{ data?: Array<Record<string, unknown>> | null }> } => {
      return !!obj && typeof obj === 'object' && 'gte' in obj && typeof (obj as { gte?: unknown }).gte === 'function'
    }

    let data: Array<Record<string, unknown>> = []
    try {
      if (fromCapable(supabase)) {
        const t = supabase.from('alert_deliveries')
        if (selectCapable(t)) {
          const s = t.select('*')
          if (eqCapable(s)) {
            const e = s.eq('user_id', userId)
            if (gteCapable(e)) {
              const res = await e.gte('delivered_at', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
              data = res.data || []
            }
          }
        }
      }
    } catch {
      data = []
    }

    if (!data || data.length === 0) {
      return {
        totalAlerts: 0,
        successRate: 0,
        deviceBreakdown: {} as Record<NotificationDeviceType, number>
      }
    }

    const totalAlerts = data.length
    const totalDeliveries = data.reduce((sum: number, d: Record<string, unknown>) => sum + (Number(d.total_devices) || 0), 0)
    const successfulDeliveries = data.reduce((sum: number, d: Record<string, unknown>) => sum + (Number(d.successful_deliveries) || 0), 0)
    
    const deviceBreakdown: Record<string, number> = {}
    data.forEach((delivery: Record<string, unknown>) => {
      const results = (delivery.results as DeliveryResult[]) || []
      results.forEach((result: DeliveryResult) => {
        if (result.success) {
          deviceBreakdown[result.deviceType] = (deviceBreakdown[result.deviceType] || 0) + 1
        }
      })
    })

    return {
      totalAlerts,
      successRate: totalDeliveries > 0 ? successfulDeliveries / totalDeliveries : 0,
      deviceBreakdown: deviceBreakdown as Record<NotificationDeviceType, number>
    }
  }

  private async loadUserNotificationSettings(userId: string): Promise<{ inApp?: boolean; email?: boolean; discordWebhook?: string; quietHours?: string; dnd?: boolean } | null> {
    try {
      const redis = await getRedis()
      if (!redis) return null
      const raw = await redis.get(`defi:prefs:${userId}`)
      if (!raw) return null
      const json = JSON.parse(raw) as { settings?: { notifications?: { inApp?: boolean; email?: boolean; discordWebhook?: string; quietHours?: string; dnd?: boolean } } }
      return json?.settings?.notifications || null
    } catch {
      return null
    }
  }

  private isWithinQuietHours(win: string): boolean {
    const m = win.trim().match(/^([0-2]\d):([0-5]\d)\s*-\s*([0-2]\d):([0-5]\d)$/)
    if (!m) return false
    const now = new Date()
    const cur = now.getHours() * 60 + now.getMinutes()
    const start = Number(m[1]) * 60 + Number(m[2])
    const end = Number(m[3]) * 60 + Number(m[4])
    if (start === end) return true
    if (start < end) return cur >= start && cur < end
    return cur >= start || cur < end
  }
}

// 以下の通知チャンネル実装は元ファイルのまま（型注釈は維持）
class BrowserNotificationChannel implements NotificationChannel {
  async send(alert: Alert, _device: Record<string, unknown>, planType: string): Promise<boolean> {
    try {
      const response = await fetch('/api/notifications/browser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: alert.userId,
          title: alert.title,
          message: this.formatMessageForPlan(alert, planType),
          icon: this.getIconForAlert(alert.type),
          url: `/dashboard?alert=${alert.id}`,
          timestamp: alert.createdAt
        })
      })
      return response.ok
    } catch (error) {
      console.error('Browser notification failed:', error)
      return false
    }
  }
  private formatMessageForPlan(alert: Alert, planType: string): string {
    switch (planType) {
      case 'free':
        return alert.message?.split('\n')[0] || ''
      case 'basic':
        return alert.message || ''
      case 'premium':
        return alert.aiAnalysis?.reasoning ? `${alert.message || ''}\n\nAI分析: ${alert.aiAnalysis.reasoning}` : alert.message || ''
      default:
        return alert.message || ''
    }
  }
  private getIconForAlert(alertType: string): string {
    const iconMap = { price_alert: '💰', volatility_alert: '📈', trend_change: '🔄', volume_spike: '📊', ai_prediction: '🤖', risk_management: '⚠️' }
    return iconMap[alertType as keyof typeof iconMap] || '🔔'
  }
}

class EmailNotificationChannel implements NotificationChannel {
  async send(alert: Alert, device: Record<string, unknown>, planType: string): Promise<boolean> {
    try {
      const response = await fetch('/api/notifications/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: (device as { identifier?: string }).identifier,
          subject: `[Crypto AI Platform] ${alert.title}`,
          html: this.generateEmailTemplate(alert, planType),
          planType
        })
      })
      return response.ok
    } catch (error) {
      console.error('Email notification failed:', error)
      return false
    }
  }
  private generateEmailTemplate(alert: Alert, planType: string): string {
    const baseTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Crypto AI Platform</h1>
          <h2 style="color: white; margin: 10px 0 0 0;">${alert.title}</h2>
        </div>
        
        <div style="padding: 20px; background: #f8f9fa;">
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">📊 アラート詳細</h3>
            <p style="color: #666; line-height: 1.6;">${(alert.message || '').replace(/\n/g, '<br>')}</p>
          </div>
    `
    if (planType !== 'free' && alert.aiAnalysis) {
      return baseTemplate + `
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #4CAF50;">
            <h3 style="color: #333; margin-top: 0;">🤖 AI分析</h3>
            <p style="color: #666;"><strong>予測:</strong> ${this.translatePrediction(alert.aiAnalysis.prediction)}</p>
            <p style="color: #666;"><strong>信頼度:</strong> ${(alert.aiAnalysis.confidence * 100).toFixed(0)}%</p>
            <p style="color: #666;"><strong>推奨アクション:</strong> ${alert.actionSuggestion}</p>
          </div>
        </div>
      </div>
      `
    }
    return baseTemplate + `
        </div>
      </div>
    `
  }
  private translatePrediction(prediction: string): string {
    const translations = { bullish: '上昇傾向', bearish: '下降傾向', neutral: '中立' }
    return translations[prediction as keyof typeof translations] || prediction
  }
}

// 他チャンネルは元ファイルと同一（省略）
class LineNotificationChannel implements NotificationChannel {
  async send(alert: Alert, device: Record<string, unknown>, planType: string): Promise<boolean> {
    try {
      const response = await fetch('/api/notifications/line', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: (device as { identifier?: string }).identifier, message: this.formatLineMessage(alert, planType), flexMessage: planType === 'premium' ? this.createFlexMessage(alert) : null })
      })
      return response.ok
    } catch (error) { console.error('LINE notification failed:', error); return false }
  }
  private formatLineMessage(alert: Alert, planType: string): string { let message = `🔔 ${alert.title}\n\n${alert.message}`; if (planType !== 'free' && alert.aiAnalysis) { message += `\n\n🤖 AI分析: ${alert.aiAnalysis.reasoning}` } if (alert.learningTip) { message += `\n\n📚 関連レッスン: ${alert.learningTip.lessonTitle}` } return message }
  private createFlexMessage(alert: Alert) { return { type: 'bubble', header: { type: 'box', layout: 'vertical', contents: [{ type: 'text', text: alert.title, weight: 'bold', color: '#ffffff' }], backgroundColor: '#667eea' }, body: { type: 'box', layout: 'vertical', contents: [{ type: 'text', text: alert.message, wrap: true }] } } }
}
class DiscordNotificationChannel implements NotificationChannel { async send(alert: Alert, device: Record<string, unknown>, planType: string): Promise<boolean> { if (planType !== 'premium') return false; try { const webhook = (device as { identifier?: string }).identifier as string; const response = await fetch(webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: 'Crypto AI Platform', avatar_url: 'https://crypto-ai-platform.com/logo.png', embeds: [{ title: alert.title, description: alert.message, color: this.getColorForAlert(alert.type), timestamp: alert.createdAt, fields: alert.aiAnalysis ? [{ name: '🤖 AI予測', value: this.translatePrediction(alert.aiAnalysis.prediction), inline: true }, { name: '📊 信頼度', value: `${(alert.aiAnalysis.confidence * 100).toFixed(0)}%`, inline: true }] : [], footer: { text: `${alert.coinSymbol} • Crypto AI Platform`, icon_url: 'https://crypto-ai-platform.com/icon.png' } }] }) }); return response.ok } catch (error) { console.error('Discord notification failed:', error); return false } } private getColorForAlert(alertType: string): number { const colorMap = { price_alert: 0x4CAF50, volatility_alert: 0xFF9800, trend_change: 0x2196F3, volume_spike: 0x9C27B0, ai_prediction: 0x00BCD4, risk_management: 0xF44336 }; return colorMap[alertType as keyof typeof colorMap] || 0x607D8B } private translatePrediction(prediction: string): string { const translations = { bullish: '📈 上昇傾向', bearish: '📉 下降傾向', neutral: '➡️ 中立' }; return translations[prediction as keyof typeof translations] || prediction } }
class SlackNotificationChannel implements NotificationChannel { async send(alert: Alert, device: Record<string, unknown>, planType: string): Promise<boolean> { if (planType !== 'premium') return false; try { const webhook = (device as { identifier?: string }).identifier as string; const response = await fetch(webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: alert.title, blocks: [{ type: 'header', text: { type: 'plain_text', text: `🔔 ${alert.title}` } }, { type: 'section', text: { type: 'mrkdwn', text: alert.message } }, ...(alert.aiAnalysis ? [{ type: 'section', fields: [{ type: 'mrkdwn', text: `*🤖 AI予測:*\n${this.translatePrediction(alert.aiAnalysis.prediction)}` }, { type: 'mrkdwn', text: `*📊 信頼度:*\n${(alert.aiAnalysis.confidence * 100).toFixed(0)}%` }] }] : []), { type: 'context', elements: [{ type: 'mrkdwn', text: `${alert.coinSymbol} • ${new Date(alert.createdAt).toLocaleString('ja-JP')}` }] }] }) }); return response.ok } catch (error) { console.error('Slack notification failed:', error); return false } } private translatePrediction(prediction: string): string { const translations = { bullish: '📈 上昇傾向', bearish: '📉 下降傾向', neutral: '➡️ 中立' }; return translations[prediction as keyof typeof translations] || prediction } }
class TelegramNotificationChannel implements NotificationChannel { async send(alert: Alert, device: Record<string, unknown>, planType: string): Promise<boolean> { if (planType !== 'premium') return false; try { const { botToken, chatId } = JSON.parse((device as { identifier?: string }).identifier as string); const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: chatId, text: this.formatTelegramMessage(alert), parse_mode: 'Markdown', disable_web_page_preview: true }) }); return response.ok } catch (error) { console.error('Telegram notification failed:', error); return false } } private formatTelegramMessage(alert: Alert): string { let message = `🔔 *${alert.title}*\n\n${alert.message}`; if (alert.aiAnalysis) { message += `\n\n🤖 *AI分析:*\n${alert.aiAnalysis.reasoning}`; message += `\n📊 信頼度: ${(alert.aiAnalysis.confidence * 100).toFixed(0)}%` } if (alert.actionSuggestion) { message += `\n\n💡 *推奨アクション:*\n${alert.actionSuggestion}` } message += `\n\n⏰ ${new Date(alert.createdAt).toLocaleString('ja-JP')}`; return message } }
class SmsNotificationChannel implements NotificationChannel { async send(alert: Alert, device: Record<string, unknown>, planType: string): Promise<boolean> { if (planType !== 'premium' || alert.priority !== 'high') return false; try { const response = await fetch('/api/notifications/sms', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ to: (device as { identifier?: string }).identifier, body: this.formatSmsMessage(alert) }) }); return response.ok } catch (error) { console.error('SMS notification failed:', error); return false } } private formatSmsMessage(alert: Alert): string { return `[Crypto AI] ${alert.coinSymbol || ''}: ${alert.message?.split('\n')[0]?.substring(0, 100) || ''}...` } }
class PushNotificationChannel implements NotificationChannel { async send(alert: Alert, device: Record<string, unknown>, planType: string): Promise<boolean> { if (planType !== 'premium') return false; try { const response = await fetch('/api/notifications/push', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ deviceToken: (device as { identifier?: string }).identifier, title: alert.title, body: alert.message.split('\n')[0], data: { alertId: alert.id, coinSymbol: alert.coinSymbol, type: alert.type } }) }); return response.ok } catch (error) { console.error('Push notification failed:', error); return false } } }
class WebhookNotificationChannel implements NotificationChannel { async send(alert: Alert, device: Record<string, unknown>, planType: string): Promise<boolean> { if (planType !== 'premium') return false; try { const response = await fetch((device as { identifier?: string }).identifier as string, { method: 'POST', headers: { 'Content-Type': 'application/json', 'User-Agent': 'Crypto-AI-Platform-Webhook/1.0' }, body: JSON.stringify({ alert, timestamp: new Date().toISOString(), source: 'crypto-ai-platform' }) }); return response.ok } catch (error) { console.error('Webhook notification failed:', error); return false } } }
