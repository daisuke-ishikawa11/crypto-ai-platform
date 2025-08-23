import { NextRequest, NextResponse } from 'next/server'
import { SubscriptionTier } from '@/lib/defi/types'
// import { deFiUserTierManager } from '@/lib/defi/user-tier-manager'
import { createClient } from '@/lib/supabase/server'
import { createApiHandler } from '@/lib/utils/api-error-middleware'
import Stripe from 'stripe'
import { getStripe } from '@/lib/stripe/config'
import { isRecord } from '@/lib/types/guards'

// Stripeはビルド時に未設定でも落ちないよう遅延取得する

async function handler(request: NextRequest): Promise<NextResponse> {
  const { method } = request

  const supabase = await createClient()
  
  // 認証チェック
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    switch (method) {
      case 'POST':
        const upgradeData = await request.json()
        return await handleUpgrade(user.id, upgradeData)
      
      case 'GET':
        return await handleGetPricing()
      
      default:
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
    }
  } catch (error) {
    console.error('Error in upgrade API:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}

async function handleUpgrade(
  userId: string, 
  { tier }: { tier: SubscriptionTier }
): Promise<NextResponse> {
  // 現在のプロファイル取得
  const supabase = await createClient()
  const { data: profile } = await supabase
    .from('defi_user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (!profile) {
    return NextResponse.json({ error: 'プロファイルが見つかりません' }, { status: 404 })
  }

  // 価格設定
  const pricing = getPricing()
  const targetTierPricing = pricing.find(p => p.tier === tier)
  
  if (!targetTierPricing) {
    return NextResponse.json({ error: '無効なプランです' }, { status: 400 })
  }

  // 既に同じ以上のプランの場合
  const currentTierLevel = getTierLevel(profile.subscription_tier)
  const targetTierLevel = getTierLevel(tier)
  
  if (currentTierLevel >= targetTierLevel) {
    return NextResponse.json({ 
      error: '既に同じ以上のプランをご利用中です',
      currentTier: profile.subscription_tier 
    }, { status: 400 })
  }

  try {
    // Stripe顧客作成または取得
    const stripe = getStripe()
    let customerId = profile.stripe_customer_id
    
    if (!customerId) {
      const customer = await stripe.customers.create({
        metadata: { userId }
      })
      customerId = customer.id

      // 顧客IDを保存
      await supabase
        .from('defi_user_profiles')
        .update({ stripe_customer_id: customerId })
        .eq('user_id', userId)
    }

    // サブスクリプション作成
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{
        price: targetTierPricing.stripePriceId || undefined
      }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        userId,
        tier,
        previousTier: profile.subscription_tier
      }
    })

    // サブスクリプション履歴を記録
    await supabase.from('defi_subscription_history').insert({
      user_id: userId,
      from_tier: profile.subscription_tier,
      to_tier: tier,
      amount: targetTierPricing.price,
      currency: 'USD',
      payment_provider: 'stripe',
      payment_id: subscription.id,
      status: 'pending',
      starts_at: new Date()
    })

    const invoice = (subscription.latest_invoice as Stripe.Invoice | null) ?? null
    let paymentIntent: Stripe.PaymentIntent | null = null
    const invObj: unknown = invoice
    if (invObj && isRecord(invObj)) {
      const pi = invObj.payment_intent
      if (pi && typeof pi !== 'string') {
        paymentIntent = pi as Stripe.PaymentIntent
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        subscriptionId: subscription.id,
        clientSecret: paymentIntent && typeof paymentIntent.client_secret === 'string' ? paymentIntent.client_secret : undefined,
        status: subscription.status
      },
      message: `${targetTierPricing.name}プランへのアップグレードを開始しました`
    })

  } catch (stripeError: unknown) {
    console.error('Stripe error:', stripeError)
    return NextResponse.json({
      error: '決済処理でエラーが発生しました',
      details: stripeError instanceof Error ? stripeError.message : String(stripeError)
    }, { status: 500 })
  }
}

async function handleGetPricing(): Promise<NextResponse> {
  const pricing = getPricing()
  
  return NextResponse.json({
    success: true,
    data: {
      tiers: pricing,
      features: getFeatureComparison()
    }
  })
}

function getPricing() {
  return [
    {
      tier: SubscriptionTier.FREE,
      name: 'フリー',
      price: 0,
      currency: 'USD',
      interval: 'month',
      stripePriceId: null,
      features: [
        '基本プロトコル（3つ）',
        '基本TVL情報',
        '教育コンテンツ',
        '基本リスク分析',
        'カスタムアラート（3個）',
        '7日間の履歴データ'
      ],
      limitations: [
        'プロトコル制限あり',
        'AI予測なし',
        '詳細分析なし'
      ]
    },
    {
      tier: SubscriptionTier.PREMIUM,
      name: 'プレミアム',
      price: 29.99,
      currency: 'USD', 
      interval: 'month',
      stripePriceId: process.env.STRIPE_PREMIUM_PRICE_ID,
      popular: true,
      features: [
        '全プロトコルアクセス',
        '詳細分析・AI予測',
        'カスタムアラート（25個）',
        '90日間の履歴データ',
        '収益予測機能',
        'AI推奨システム',
        'メールサポート'
      ],
      benefits: [
        '制限なしプロトコルアクセス',
        'AI駆動の投資推奨',
        '高度なリスク分析'
      ]
    },
    {
      tier: SubscriptionTier.PROFESSIONAL,
      name: 'プロフェッショナル',
      price: 59.99,
      currency: 'USD',
      interval: 'month', 
      stripePriceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID,
      features: [
        'プレミアムの全機能',
        '無制限アラート',
        '365日間の履歴データ',
        '包括的リスク分析',
        'API アクセス',
        '優先サポート',
        '専用アカウントマネージャー'
      ],
      benefits: [
        '機関投資家レベルの分析',
        'API統合サポート',
        '24/7優先サポート'
      ]
    }
  ]
}

function getFeatureComparison() {
  return {
    protocolAccess: {
      free: '3プロトコル',
      premium: '全プロトコル',
      professional: '全プロトコル + 早期アクセス'
    },
    analytics: {
      free: '基本分析のみ',
      premium: '詳細分析 + AI予測',
      professional: '包括的分析 + カスタムレポート'
    },
    alerts: {
      free: '3個まで',
      premium: '25個まで',
      professional: '無制限'
    },
    historicalData: {
      free: '7日間',
      premium: '90日間',
      professional: '365日間'
    },
    support: {
      free: 'コミュニティサポート',
      premium: 'メールサポート',
      professional: '優先サポート + 電話'
    }
  }
}

function getTierLevel(tier: SubscriptionTier): number {
  switch (tier) {
    case SubscriptionTier.FREE: return 1
    case SubscriptionTier.PREMIUM: return 2
    case SubscriptionTier.PROFESSIONAL: return 3
    default: return 0
  }
}

// Export with enhanced error handling
export const GET = createApiHandler({
  handler,
  rateLimit: { limit: 20, window: 60000 },
  errorOptions: {
    enableLogging: true,
    customErrorMessages: {
      'STRIPE_ERROR': '決済処理でエラーが発生しました',
      'INVALID_TIER': '無効なプランが指定されました',
      'ALREADY_SUBSCRIBED': '既に同じ以上のプランをご利用中です'
    }
  }
})

export const POST = GET
