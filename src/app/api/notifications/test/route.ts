import { NextRequest, NextResponse } from 'next/server'
import { NotificationService } from '@/lib/notifications/notification-service'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { type = 'test', title, message } = body

    if (!title || !message) {
      return NextResponse.json(
        { error: 'タイトルとメッセージが必要です' },
        { status: 400 }
      )
    }

    // 通知サービスのインスタンスを作成
    const notificationService = new NotificationService({
      email: {
        provider: 'resend',
        apiKey: process.env.RESEND_API_KEY || '',
        fromEmail: 'noreply@crypto-ai-platform.com',
        fromName: 'Crypto AI Platform',
        templates: {
          alertTemplate: 'alert',
          welcomeTemplate: 'welcome',
          reportTemplate: 'report'
        }
      },
      push: {
        provider: 'firebase',
        apiKey: process.env.FIREBASE_SERVER_KEY || '',
        appId: process.env.FIREBASE_PROJECT_ID || ''
      },
      sms: {
        provider: 'twilio',
        accountSid: process.env.TWILIO_ACCOUNT_SID || '',
        authToken: process.env.TWILIO_AUTH_TOKEN || '',
        fromNumber: process.env.TWILIO_PHONE_NUMBER || ''
      },
      webhook: {
        timeout: 10000,
        retryAttempts: 3,
        retryDelay: 1000,
        maxPayloadSize: 1024 * 64
      },
      enabledMethods: ['email', 'push', 'sms', 'webhook'] as import('@/lib/alerts/types').NotificationMethod[],
      rateLimits: {
        perUser: 100,
        perHour: 1000,
        perDay: 5000
      },
      templates: {
        enablePersonalization: true,
        defaultLanguage: 'en',
        supportedLanguages: ['en', 'ja']
      }
    })

    // テスト通知データを作成
    const testAlert = {
      id: crypto.randomUUID(),
      alertConditionId: crypto.randomUUID(),
      userId: user.id,
      type: 'price_above',
      severity: 'info',
      triggeredAt: new Date(),
      currentValue: 100,
      title,
      message,
      acknowledged: false,
      notificationsSent: []
    } as import('@/lib/alerts/types').TriggeredAlert

    const alertCondition = {
      id: crypto.randomUUID(),
      userId: user.id,
      name: 'テスト通知',
      description: 'システム通知のテスト',
      type: 'price_above',
      severity: 'info',
      status: 'active',
      symbol: 'TEST',
      conditions: {},
      notificationMethods: ['email', 'push', 'in_app'],
      cooldownPeriod: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      triggerCount: 0
    } as import('@/lib/alerts/types').AlertCondition

    // 通知を送信
    await notificationService.sendAlertNotification(testAlert, alertCondition)

    return NextResponse.json({
      success: true,
      message: 'テスト通知が送信されました',
      data: {
        alertId: testAlert.id,
        userId: user.id,
        type: type,
        title: title,
        sentAt: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Test notification error:', error)
    return NextResponse.json(
      { 
        error: 'テスト通知の送信に失敗しました',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
