// 💳 Stripe設定・統合システム
// Webhook・リカーリング収益・toB対応の包括的実装

import Stripe from 'stripe';

// Stripe設定
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

// 環境変数が未設定でもビルドを阻害しないよう、遅延初期化に変更
let _stripeInstance: Stripe | null = null
export function getStripe(): Stripe {
  if (_stripeInstance) return _stripeInstance
  if (!stripeSecretKey) {
    throw new Error('Stripe is not configured: STRIPE_SECRET_KEY is missing')
  }
  _stripeInstance = new Stripe(stripeSecretKey, {
    apiVersion: '2025-07-30.basil',
    appInfo: { name: 'Crypto AI Platform', version: '1.0.0', url: 'https://your-domain.com' }
  })
  return _stripeInstance
}

// Stripeクライアントインスタンス
// stripeインスタンスは getStripe() で取得

// 設定定数
export const STRIPE_CONFIG = {
  publishableKey: stripePublishableKey || '',
  webhookSecret: stripeWebhookSecret || '',
  currency: 'usd' as const,
  
  // サブスクリプションプランID
  plans: {
    basic: {
      monthly: process.env.STRIPE_BASIC_MONTHLY_PRICE_ID!,
      yearly: process.env.STRIPE_BASIC_YEARLY_PRICE_ID!,
      name: 'Basic',
      features: [
        '基本的なアラート機能',
        '5つまでのポートフォリオ',
        'DeFi基本監視',
        'AI分析（月10回）',
        'メールサポート'
      ] as string[]
    },
    pro: {
      monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID!,
      yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID!,
      name: 'Pro',
      features: [
        '高度なアラート機能',
        '無制限ポートフォリオ',
        'DeFi完全監視',
        'AI分析（月100回）',
        'リアルタイム通知',
        'チャットサポート'
      ] as string[]
    },
    enterprise: {
      monthly: process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID!,
      yearly: process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID!,
      name: 'Enterprise',
      features: [
        'エンタープライズ級アラート',
        '完全カスタマイズ',
        '専用API',
        'AI分析（無制限）',
        'ホワイトラベル',
        '専任サポート',
        'SLA保証'
      ] as string[]
    }
  },
  
  // プラン料金（セント単位）
  pricing: {
    basic: {
      monthly: 2900, // $29.00/month
      yearly: 29000  // $290.00/year (2ヶ月分お得)
    },
    pro: {
      monthly: 9900, // $99.00/month
      yearly: 99000  // $990.00/year (2ヶ月分お得)
    },
    enterprise: {
      monthly: 49900, // $499.00/month
      yearly: 499000  // $4,990.00/year (2ヶ月分お得)
    }
  },
  
  // 試用期間
  trialPeriodDays: 7,
  
  // 税率設定
  taxRates: {
    japan: process.env.STRIPE_TAX_RATE_JAPAN_ID, // 10%
    us: process.env.STRIPE_TAX_RATE_US_ID,       // varies by state
    eu: process.env.STRIPE_TAX_RATE_EU_ID        // varies by country
  }
} as const;

// プラン定義型
export interface StripePlan {
  id: string;
  name: string;
  tier: 'basic' | 'pro' | 'enterprise';
  interval: 'month' | 'year';
  price: number;
  currency: string;
  features: string[];
  stripePriceId: string;
  trialPeriodDays?: number;
}

// プラン一覧を取得
export function getPlans(): StripePlan[] {
  return [
    // Basic Plans
    {
      id: 'basic-monthly',
      name: 'Basic Monthly',
      tier: 'basic',
      interval: 'month',
      price: STRIPE_CONFIG.pricing.basic.monthly,
      currency: STRIPE_CONFIG.currency,
      features: STRIPE_CONFIG.plans.basic.features,
      stripePriceId: STRIPE_CONFIG.plans.basic.monthly,
      trialPeriodDays: STRIPE_CONFIG.trialPeriodDays
    },
    {
      id: 'basic-yearly',
      name: 'Basic Yearly',
      tier: 'basic',
      interval: 'year',
      price: STRIPE_CONFIG.pricing.basic.yearly,
      currency: STRIPE_CONFIG.currency,
      features: STRIPE_CONFIG.plans.basic.features,
      stripePriceId: STRIPE_CONFIG.plans.basic.yearly,
      trialPeriodDays: STRIPE_CONFIG.trialPeriodDays
    },
    
    // Pro Plans
    {
      id: 'pro-monthly',
      name: 'Pro Monthly',
      tier: 'pro',
      interval: 'month',
      price: STRIPE_CONFIG.pricing.pro.monthly,
      currency: STRIPE_CONFIG.currency,
      features: STRIPE_CONFIG.plans.pro.features,
      stripePriceId: STRIPE_CONFIG.plans.pro.monthly,
      trialPeriodDays: STRIPE_CONFIG.trialPeriodDays
    },
    {
      id: 'pro-yearly',
      name: 'Pro Yearly',
      tier: 'pro',
      interval: 'year',
      price: STRIPE_CONFIG.pricing.pro.yearly,
      currency: STRIPE_CONFIG.currency,
      features: STRIPE_CONFIG.plans.pro.features,
      stripePriceId: STRIPE_CONFIG.plans.pro.yearly,
      trialPeriodDays: STRIPE_CONFIG.trialPeriodDays
    },
    
    // Enterprise Plans
    {
      id: 'enterprise-monthly',
      name: 'Enterprise Monthly',
      tier: 'enterprise',
      interval: 'month',
      price: STRIPE_CONFIG.pricing.enterprise.monthly,
      currency: STRIPE_CONFIG.currency,
      features: STRIPE_CONFIG.plans.enterprise.features,
      stripePriceId: STRIPE_CONFIG.plans.enterprise.monthly
    },
    {
      id: 'enterprise-yearly',
      name: 'Enterprise Yearly',
      tier: 'enterprise',
      interval: 'year',
      price: STRIPE_CONFIG.pricing.enterprise.yearly,
      currency: STRIPE_CONFIG.currency,
      features: STRIPE_CONFIG.plans.enterprise.features,
      stripePriceId: STRIPE_CONFIG.plans.enterprise.yearly
    }
  ];
}

// プランをIDで取得
export function getPlanById(planId: string): StripePlan | undefined {
  return getPlans().find(plan => plan.id === planId);
}

// プランをStripePriceIdで取得
export function getPlanByStripePriceId(stripePriceId: string): StripePlan | undefined {
  return getPlans().find(plan => plan.stripePriceId === stripePriceId);
}

// 価格をフォーマット
export function formatPrice(price: number, currency: string = 'usd'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0
  }).format(price / 100);
}

// 年間割引を計算
export function calculateYearlyDiscount(tier: 'basic' | 'pro' | 'enterprise'): number {
  const monthly = STRIPE_CONFIG.pricing[tier].monthly * 12;
  const yearly = STRIPE_CONFIG.pricing[tier].yearly;
  return Math.round(((monthly - yearly) / monthly) * 100);
}

// 顧客の地域に基づく税率IDを取得
export function getTaxRateId(country: string): string | undefined {
  switch (country.toLowerCase()) {
    case 'jp':
    case 'japan':
      return STRIPE_CONFIG.taxRates.japan;
    case 'us':
    case 'usa':
    case 'united states':
      return STRIPE_CONFIG.taxRates.us;
    default:
      // EU諸国などのその他
      return STRIPE_CONFIG.taxRates.eu;
  }
}

// テストカード情報
export const TEST_CARDS = {
  visa: {
    number: '4242424242424242',
    exp_month: 12,
    exp_year: 2025,
    cvc: '123',
    description: 'Visa - 成功'
  },
  visa_debit: {
    number: '4000056655665556',
    exp_month: 12,
    exp_year: 2025,
    cvc: '123',
    description: 'Visa Debit - 成功'
  },
  mastercard: {
    number: '5555555555554444',
    exp_month: 12,
    exp_year: 2025,
    cvc: '123',
    description: 'Mastercard - 成功'
  },
  american_express: {
    number: '378282246310005',
    exp_month: 12,
    exp_year: 2025,
    cvc: '1234',
    description: 'American Express - 成功'
  },
  declined_card: {
    number: '4000000000000002',
    exp_month: 12,
    exp_year: 2025,
    cvc: '123',
    description: 'カード拒否'
  },
  insufficient_funds: {
    number: '4000000000009995',
    exp_month: 12,
    exp_year: 2025,
    cvc: '123',
    description: '残高不足'
  },
  expired_card: {
    number: '4000000000000069',
    exp_month: 12,
    exp_year: 2025,
    cvc: '123',
    description: '期限切れカード'
  },
  processing_error: {
    number: '4000000000000119',
    exp_month: 12,
    exp_year: 2025,
    cvc: '123',
    description: '処理エラー'
  }
} as const;

// B2B向け設定
export const B2B_CONFIG = {
  // 最小シート数
  minimumSeats: 5,
  
  // チーム向けディスカウント
  teamDiscounts: [
    { minSeats: 5, discount: 0.10 },    // 10% off for 5+ seats
    { minSeats: 25, discount: 0.15 },   // 15% off for 25+ seats
    { minSeats: 100, discount: 0.20 },  // 20% off for 100+ seats
    { minSeats: 500, discount: 0.25 }   // 25% off for 500+ seats
  ],
  
  // カスタムプラン設定
  customPlanThreshold: 1000, // 1000席以上はカスタムプラン
  
  // 請求期限
  invoiceTerms: 30, // 30日
  
  // サポートされる支払い方法
  paymentMethods: ['card', 'ach_credit_transfer', 'wire_transfer'],
  
  // 請求書設定
  invoiceSettings: {
    autoSend: false,
    allowCustomFooter: true,
    requiredFields: ['company_name', 'tax_id'],
    defaultCurrency: 'usd',
    supportedCurrencies: ['usd', 'jpy', 'eur'],
    paymentTermsOptions: [7, 14, 30, 60, 90]
  },
  
  // 企業プラン特典
  enterpriseFeatures: {
    customBranding: true,
    dedicatedSupport: true,
    priorityProcessing: true,
    bulkInvoicing: true,
    advancedReporting: true,
    apiAccess: true
  }
} as const;

// 請求書テンプレート設定
export const INVOICE_CONFIG = {
  // デフォルト設定
  defaults: {
    currency: 'usd',
    paymentTerms: 30,
    autoSend: false,
    includePdf: true,
    sendReminders: true
  },
  
  // 言語設定
  languages: ['ja', 'en'],
  defaultLanguage: 'ja',
  
  // メール設定
  emailSettings: {
    fromName: 'Crypto AI Platform',
    fromEmail: 'billing@your-domain.com',
    replyTo: 'support@your-domain.com',
    subjectTemplate: '請求書 #{invoice_number} - {company_name}',
    footerText: 'ご質問がある場合は、support@your-domain.com までお問い合わせください。'
  },
  
  // リマインダー設定
  reminders: {
    enabled: true,
    schedule: [
      { days: 3, type: 'before_due' },
      { days: 1, type: 'before_due' },
      { days: 7, type: 'after_due' },
      { days: 14, type: 'after_due' },
      { days: 30, type: 'after_due' }
    ]
  }
} as const;
