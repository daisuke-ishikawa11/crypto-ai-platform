import { createClient } from '@/lib/supabase/server'

interface LineWebhookEvent {
  type: string
  source?: {
    userId?: string
  }
  postback?: {
    data: string
  }
  message?: {
    text: string
  }
}

interface LineTemplate {
  type: string
  text?: string
  actions?: LineAction[]
}

interface LineAction {
  type: string
  label?: string
  uri?: string
  data?: string
}

interface LineFlexContent {
  type: string
  size?: string
  header?: Record<string, unknown>
  body?: Record<string, unknown>
  footer?: Record<string, unknown>
  [key: string]: unknown
}

interface LineMessage {
  type: 'text' | 'template' | 'flex'
  text?: string
  template?: LineTemplate
  flex?: LineFlexContent
  altText?: string
}


export class LineIntegrationService {
  private accessToken: string
  private channelSecret: string
  private supabase = createClient()

  constructor() {
    this.accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN!
    this.channelSecret = process.env.LINE_CHANNEL_SECRET!
    
    if (!this.accessToken || !this.channelSecret) {
      throw new Error('LINE API credentials are not configured')
    }
  }

  /**
   * LINEアカウントとアプリユーザーを連携
   */
  async linkUserAccount(appUserId: string, lineUserId: string): Promise<void> {
    try {
      // 既存の連携確認
      const supabase = this.supabase;
      if (!supabase || !('from' in supabase) || typeof supabase.from !== 'function') {
        throw new Error('Supabase client not available');
      }
      const { data: existingLink } = await supabase
        .from('user_line_connections')
        .select('*')
        .eq('user_id', appUserId)
        .single()

      if (existingLink) {
        // 既存連携を更新
        await supabase
          .from('user_line_connections')
          .update({
            line_user_id: lineUserId,
            status: 'active',
            updated_at: new Date().toISOString()
          })
          .eq('user_id', appUserId)
      } else {
        // 新規連携作成
        await supabase
          .from('user_line_connections')
          .insert({
            user_id: appUserId,
            line_user_id: lineUserId,
            status: 'active',
            linked_at: new Date().toISOString()
          })
      }

      // ウェルカムメッセージ送信
      await this.sendWelcomeMessage(lineUserId)

      console.log(`LINE account linked: ${appUserId} <-> ${lineUserId}`)
    } catch (error) {
      console.error('Failed to link LINE account:', error)
      throw error
    }
  }

  /**
   * LINE連携を解除
   */
  async unlinkUserAccount(appUserId: string): Promise<void> {
    try {
      const supabase = this.supabase;
      if (supabase && 'from' in supabase && typeof supabase.from === 'function') {
        await supabase
          .from('user_line_connections')
          .update({
            status: 'inactive',
            updated_at: new Date().toISOString()
          })
          .eq('user_id', appUserId)
      }

      console.log(`LINE account unlinked: ${appUserId}`)
    } catch (error) {
      console.error('Failed to unlink LINE account:', error)
      throw error
    }
  }

  /**
   * LINEメッセージ送信（確実な配信保証付き）
   */
  async sendMessage(lineUserId: string, message: LineMessage): Promise<boolean> {
    try {
      // アクセストークンの有効性確認
      await this.validateAccessToken()

      const response = await fetch('https://api.line.me/v2/bot/message/push', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: lineUserId,
          messages: [message]
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`LINE API Error: ${errorData.message} (${response.status})`)
      }

      // 配信成功をログに記録
      await this.logMessageDelivery(lineUserId, message, 'success')
      return true

    } catch (error) {
      console.error('LINE message delivery failed:', error)
      
      // エラーをログに記録
      await this.logMessageDelivery(lineUserId, message, 'failed', error as Error)
      
      // 代替手段の実行（Email フォールバック）
      await this.executeFailoverNotification(lineUserId, message)
      return false
    }
  }

  /**
   * リッチメッセージ（テンプレート）送信
   */
  async sendRichMessage(lineUserId: string, title: string, description: string, actions: LineAction[]): Promise<boolean> {
    const message: LineMessage = {
      type: 'template',
      altText: title,
      template: {
        type: 'buttons',
        text: description,
        actions: actions
      }
    }

    return await this.sendMessage(lineUserId, message)
  }

  /**
   * Flex Message（高度なレイアウト）送信
   */
  async sendFlexMessage(lineUserId: string, flexContent: LineFlexContent): Promise<boolean> {
    const message: LineMessage = {
      type: 'flex',
      altText: 'Crypto AI Platform 通知',
      flex: flexContent
    }

    return await this.sendMessage(lineUserId, message)
  }

  /**
   * ウェルカムメッセージ送信
   */
  private async sendWelcomeMessage(lineUserId: string): Promise<void> {
    const welcomeMessage = this.createWelcomeFlexMessage()
    await this.sendFlexMessage(lineUserId, welcomeMessage)
  }

  /**
   * ウェルカムメッセージのFlex Message作成
   */
  private createWelcomeFlexMessage(): LineFlexContent {
    return {
      type: "bubble",
      size: "kilo",
      header: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "🚀 連携完了！",
            weight: "bold",
            size: "xl",
            color: "#ffffff"
          },
          {
            type: "text",
            text: "Crypto AI Platform",
            size: "sm",
            color: "#ffffff"
          }
        ],
        backgroundColor: "#667eea",
        paddingAll: "20px"
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "LINE連携が完了しました！",
            weight: "bold",
            size: "md",
            margin: "sm"
          },
          {
            type: "text",
            text: "これで重要な市場情報をLINEで受け取れます。",
            size: "sm",
            color: "#666666",
            wrap: true,
            margin: "md"
          },
          {
            type: "separator",
            margin: "lg"
          },
          {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "📊 大幅な価格変動",
                size: "sm",
                margin: "md"
              },
              {
                type: "text", 
                text: "📚 学習内容に関連する市場動向",
                size: "sm",
                margin: "sm"
              },
              {
                type: "text",
                text: "💡 AI分析による投資アドバイス",
                size: "sm",
                margin: "sm",
                color: "#999999"
              }
            ],
            margin: "lg"
          }
        ],
        paddingAll: "20px"
      },
      footer: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "button",
            action: {
              type: "uri",
              label: "アラート設定",
              uri: `${process.env.NEXT_PUBLIC_APP_URL}/alerts/settings`
            },
            style: "primary"
          },
          {
            type: "button",
            action: {
              type: "postback",
              label: "テスト通知を送信",
              data: "action=test_notification"
            },
            style: "secondary"
          }
        ],
        paddingAll: "15px"
      }
    }
  }

  /**
   * アクセストークンの有効性確認
   */
  private async validateAccessToken(): Promise<void> {
    try {
      const response = await fetch('https://api.line.me/v2/bot/info', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      })

      if (!response.ok) {
        throw new Error(`Invalid LINE access token: ${response.status}`)
      }
    } catch (error) {
      console.error('LINE access token validation failed:', error)
      throw error
    }
  }

  /**
   * メッセージ配信ログの記録
   */
  private async logMessageDelivery(
    lineUserId: string, 
    message: LineMessage, 
    status: 'success' | 'failed',
    error?: Error
  ): Promise<void> {
    try {
      const supabase = this.supabase;
      if (supabase && 'from' in supabase && typeof supabase.from === 'function') {
        await supabase
          .from('line_message_logs')
          .insert({
          line_user_id: lineUserId,
          message_type: message.type,
          message_content: JSON.stringify(message),
          delivery_status: status,
          error_message: error?.message || null,
          sent_at: new Date().toISOString()
        })
      }
    } catch (logError) {
      console.error('Failed to log LINE message delivery:', logError)
      // ログ失敗は主処理に影響しない
    }
  }

  /**
   * 配信失敗時の代替手段実行
   */
  private async executeFailoverNotification(lineUserId: string, originalMessage: LineMessage): Promise<void> {
    try {
      // LINE User IDからアプリUser IDを取得
      const supabase = await this.supabase;
      if (!supabase || !('from' in supabase) || typeof supabase.from !== 'function') {
        return;
      }
      const { data: connection } = await supabase
        .from('user_line_connections')
        .select(`
          user_id,
          users!inner(email, notification_preferences)
        `)
        .eq('line_user_id', lineUserId)
        .eq('status', 'active')
        .single()

      const connectionObj = connection && typeof connection === 'object' ? connection as Record<string, unknown> : undefined
      const users = connectionObj && typeof connectionObj.users === 'object' ? (connectionObj.users as { email?: string | null }) : undefined
      if (!users?.email) {
        console.warn('No fallback email found for LINE user:', lineUserId)
        return
      }

      // Email代替送信
      const emailContent = this.convertLineMessageToEmail(originalMessage)
      await this.sendFallbackEmail(users.email, emailContent)

      console.log(`Fallback email sent for LINE user: ${lineUserId}`)
    } catch (error) {
      console.error('Fallback notification failed:', error)
    }
  }

  /**
   * LINE メッセージをEmail形式に変換
   */
  private convertLineMessageToEmail(lineMessage: LineMessage): { subject: string; html: string } {
    switch (lineMessage.type) {
      case 'text':
        return {
          subject: '[Crypto AI Platform] 重要な通知',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #667eea; padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">Crypto AI Platform</h1>
                <p style="color: white; margin: 10px 0 0 0;">重要な市場情報</p>
              </div>
              <div style="padding: 20px; background: #f8f9fa;">
                <div style="background: white; padding: 20px; border-radius: 8px;">
                  <p style="color: #333; line-height: 1.6;">${lineMessage.text}</p>
                  <hr style="margin: 20px 0;">
                  <p style="color: #666; font-size: 12px;">
                    ※ この通知はLINE配信に失敗したため、代替でEmailにお送りしています。
                    LINE設定を確認するか、サポートにお問い合わせください。
                  </p>
                </div>
              </div>
            </div>
          `
        }

      case 'template':
        return {
          subject: `[Crypto AI Platform] ${lineMessage.altText}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #667eea; padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">Crypto AI Platform</h1>
              </div>
              <div style="padding: 20px; background: #f8f9fa;">
                <div style="background: white; padding: 20px; border-radius: 8px;">
                  <h3 style="color: #333; margin-top: 0;">${lineMessage.altText}</h3>
                  <p style="color: #666; line-height: 1.6;">${lineMessage.template?.text || ''}</p>
                </div>
              </div>
            </div>
          `
        }

      default:
        return {
          subject: '[Crypto AI Platform] 通知',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <p>Crypto AI Platform からの重要な通知があります。</p>
              <p>詳細はアプリでご確認ください。</p>
            </div>
          `
        }
    }
  }

  /**
   * フォールバックEmail送信
   */
  private async sendFallbackEmail(email: string, content: { subject: string; html: string }): Promise<void> {
    try {
      const response = await fetch('/api/notifications/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          subject: content.subject,
          html: content.html,
          isFallback: true
        })
      })

      if (!response.ok) {
        throw new Error(`Fallback email failed: ${response.status}`)
      }
    } catch (error) {
      console.error('Fallback email sending failed:', error)
    }
  }

  /**
   * Webhook受信処理（LINE側からのイベント）
   */
  async handleWebhook(events: LineWebhookEvent[]): Promise<void> {
    for (const event of events) {
      try {
        switch (event.type) {
          case 'follow':
            await this.handleFollowEvent(event)
            break
          case 'unfollow':
            await this.handleUnfollowEvent(event)
            break
          case 'postback':
            await this.handlePostbackEvent(event)
            break
          case 'message':
            await this.handleMessageEvent(event)
            break
        }
      } catch (error) {
        console.error('Webhook event handling failed:', error)
      }
    }
  }

  private async handleFollowEvent(event: LineWebhookEvent): Promise<void> {
    const lineUserId = event.source?.userId
    if (!lineUserId) return
    
    // フォローログを記録
    const supabase = await this.supabase;
    if (supabase && 'from' in supabase && typeof supabase.from === 'function') {
      await supabase
        .from('line_user_activities')
        .insert({
          line_user_id: lineUserId,
          activity_type: 'follow',
          timestamp: new Date().toISOString()
        })
    }
  }

  private async handleUnfollowEvent(event: LineWebhookEvent): Promise<void> {
    const lineUserId = event.source?.userId
    if (!lineUserId) return
    
    // アンフォロー時に連携を非アクティブ化
    const supabase = await this.supabase;
    if (supabase && 'from' in supabase && typeof supabase.from === 'function') {
      await supabase
        .from('user_line_connections')
        .update({
          status: 'inactive',
          unfollowed_at: new Date().toISOString()
        })
        .eq('line_user_id', lineUserId)
    }
  }

  private async handlePostbackEvent(event: LineWebhookEvent): Promise<void> {
    const lineUserId = event.source?.userId
    if (!lineUserId || !event.postback?.data) return
    
    const data = new URLSearchParams(event.postback.data)
    const action = data.get('action')

    switch (action) {
      case 'test_notification':
        await this.sendTestNotification(lineUserId)
        break
      default:
        console.log('Unknown postback action:', action)
    }
  }

  private async handleMessageEvent(event: LineWebhookEvent): Promise<void> {
    // メッセージイベントの処理（将来的にAIチャット機能に拡張可能）
    const lineUserId = event.source?.userId
    if (!lineUserId || !event.message?.text) return
    
    const messageText = event.message.text

    // 簡単な自動応答
    if (messageText === 'ヘルプ' || messageText === 'help') {
      await this.sendMessage(lineUserId, {
        type: 'text',
        text: `🤖 Crypto AI Platform ヘルプ\n\n利用可能なコマンド:\n• "設定" - アラート設定画面を開く\n• "ステータス" - 現在の設定状況を確認\n• "テスト" - テスト通知を送信`
      })
    }
  }

  private async sendTestNotification(lineUserId: string): Promise<void> {
    const testMessage: LineMessage = {
      type: 'text',
      text: `🧪 テスト通知\n\nこれはLINE通知のテストメッセージです。\n\n📈 ビットコイン: ¥5,000,000\n📊 変動: +2.5%\n⏰ ${new Date().toLocaleString('ja-JP')}\n\n✅ 通知が正常に届いています！`
    }

    await this.sendMessage(lineUserId, testMessage)
  }
}
