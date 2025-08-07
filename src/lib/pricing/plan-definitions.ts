import type { Database } from '@/lib/supabase/types'

type UserPlan = Database['public']['Tables']['users']['Row']['plan']

export interface PlanFeatures {
  ai_chats: {
    daily: number | null
    monthly: number | null
    description: string
  }
  portfolio_analysis: {
    daily: number | null
    monthly: number | null
    description: string
  }
  market_insights: {
    daily: number | null
    monthly: number | null
    description: string
  }
  advanced_features: string[]
  ai_models: string[]
  support_level: 'community' | 'standard' | 'priority' | 'premium'
  api_access: boolean
  custom_indicators: boolean
  real_time_data: boolean
  risk_management: boolean
  portfolio_optimization: boolean
  educational_content: boolean
  mobile_app: boolean
  data_export: boolean
  white_label: boolean
}

export interface PlanDefinition {
  id: UserPlan
  name: string
  displayName: string
  description: string
  price: {
    monthly: number
    yearly: number
    yearlyDiscount: number
  }
  features: PlanFeatures
  popular: boolean
  recommended: boolean
  color: string
  gradient: string
  icon: string
  maxUsers?: number
  badge?: string
  limitations?: string[]
  highlights: string[]
}

export const PLAN_DEFINITIONS: Record<UserPlan, PlanDefinition> = {
  free: {
    id: 'free',
    name: 'Free',
    displayName: 'フリープラン',
    description: '暗号通貨投資を始めるための基本機能',
    price: {
      monthly: 0,
      yearly: 0,
      yearlyDiscount: 0
    },
    features: {
      ai_chats: {
        daily: 5,
        monthly: 50,
        description: '基本的なAI相談'
      },
      portfolio_analysis: {
        daily: 1,
        monthly: 10,
        description: '簡単なポートフォリオ分析'
      },
      market_insights: {
        daily: 3,
        monthly: 30,
        description: '基本的な市場データ'
      },
      advanced_features: [],
      ai_models: ['GPT-3.5 Turbo'],
      support_level: 'community',
      api_access: false,
      custom_indicators: false,
      real_time_data: false,
      risk_management: false,
      portfolio_optimization: false,
      educational_content: true,
      mobile_app: true,
      data_export: false,
      white_label: false
    },
    popular: false,
    recommended: false,
    color: 'gray',
    gradient: 'from-gray-500 to-gray-600',
    icon: 'Gift',
    highlights: [
      '85レッスンの学習コンテンツ',
      'モバイルアプリ対応',
      'コミュニティサポート'
    ]
  },
  mini: {
    id: 'mini',
    name: 'Mini',
    displayName: 'ミニプラン',
    description: '個人投資家向けのエントリーレベル',
    price: {
      monthly: 980,
      yearly: 9800,
      yearlyDiscount: 17
    },
    features: {
      ai_chats: {
        daily: 20,
        monthly: 300,
        description: '充実したAI相談'
      },
      portfolio_analysis: {
        daily: 5,
        monthly: 50,
        description: '詳細なポートフォリオ分析'
      },
      market_insights: {
        daily: 10,
        monthly: 150,
        description: '拡張市場データ'
      },
      advanced_features: ['基本的な価格予測', '簡単なテクニカル分析'],
      ai_models: ['GPT-3.5 Turbo', 'Claude 3 Haiku'],
      support_level: 'standard',
      api_access: false,
      custom_indicators: false,
      real_time_data: true,
      risk_management: true,
      portfolio_optimization: false,
      educational_content: true,
      mobile_app: true,
      data_export: false,
      white_label: false
    },
    popular: false,
    recommended: false,
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600',
    icon: 'Zap',
    highlights: [
      'リアルタイム市場データ',
      'リスク管理機能',
      'メールサポート'
    ]
  },
  basic: {
    id: 'basic',
    name: 'Basic',
    displayName: 'ベーシックプラン',
    description: '積極的な投資家向けの充実機能',
    price: {
      monthly: 1980,
      yearly: 19800,
      yearlyDiscount: 17
    },
    features: {
      ai_chats: {
        daily: 50,
        monthly: 1000,
        description: '高度なAI相談'
      },
      portfolio_analysis: {
        daily: 10,
        monthly: 200,
        description: '高度なポートフォリオ最適化'
      },
      market_insights: {
        daily: 30,
        monthly: 500,
        description: '包括的な市場分析'
      },
      advanced_features: [
        '高度な価格予測',
        'テクニカル分析',
        '基本的なポートフォリオ最適化',
        '説明可能なAI'
      ],
      ai_models: ['GPT-4 Turbo', 'Claude 3 Sonnet'],
      support_level: 'priority',
      api_access: false,
      custom_indicators: true,
      real_time_data: true,
      risk_management: true,
      portfolio_optimization: true,
      educational_content: true,
      mobile_app: true,
      data_export: true,
      white_label: false
    },
    popular: true,
    recommended: true,
    color: 'green',
    gradient: 'from-green-500 to-green-600',
    icon: 'TrendingUp',
    badge: '人気No.1',
    highlights: [
      'ポートフォリオ最適化',
      '説明可能なAI',
      'データエクスポート',
      '優先サポート'
    ]
  },
  standard: {
    id: 'standard',
    name: 'Standard',
    displayName: 'スタンダードプラン',
    description: '本格的なトレーダー向けの高度機能',
    price: {
      monthly: 2980,
      yearly: 29800,
      yearlyDiscount: 17
    },
    features: {
      ai_chats: {
        daily: 200,
        monthly: 5000,
        description: '専門的なAI相談'
      },
      portfolio_analysis: {
        daily: 50,
        monthly: 1000,
        description: '材料科学アプローチ最適化'
      },
      market_insights: {
        daily: 100,
        monthly: 2000,
        description: '深層市場分析'
      },
      advanced_features: [
        '材料科学ポートフォリオ最適化',
        '量子ウォーク理論',
        '相構造分析',
        '高度なリスク管理',
        'カスタムインジケーター'
      ],
      ai_models: ['GPT-4 Turbo', 'Claude 3 Opus', 'カスタムモデル'],
      support_level: 'premium',
      api_access: true,
      custom_indicators: true,
      real_time_data: true,
      risk_management: true,
      portfolio_optimization: true,
      educational_content: true,
      mobile_app: true,
      data_export: true,
      white_label: false
    },
    popular: false,
    recommended: false,
    color: 'purple',
    gradient: 'from-purple-500 to-purple-600',
    icon: 'Crown',
    highlights: [
      '材料科学アプローチ',
      'API アクセス',
      'カスタムインジケーター',
      'プレミアムサポート'
    ]
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    displayName: 'プロプラン',
    description: 'プロフェッショナル・機関投資家向け',
    price: {
      monthly: 9800,
      yearly: 98000,
      yearlyDiscount: 17
    },
    features: {
      ai_chats: {
        daily: null,
        monthly: null,
        description: '無制限のAI相談'
      },
      portfolio_analysis: {
        daily: null,
        monthly: null,
        description: '無制限の高度分析'
      },
      market_insights: {
        daily: null,
        monthly: null,
        description: '無制限の市場データ'
      },
      advanced_features: [
        '全機能無制限',
        'カスタムAIモデル',
        'ホワイトラベル',
        'マルチアカウント管理',
        'APIフル機能'
      ],
      ai_models: ['全AIモデル', 'カスタムモデル', 'ファインチューニング'],
      support_level: 'premium',
      api_access: true,
      custom_indicators: true,
      real_time_data: true,
      risk_management: true,
      portfolio_optimization: true,
      educational_content: true,
      mobile_app: true,
      data_export: true,
      white_label: true
    },
    popular: false,
    recommended: false,
    color: 'gold',
    gradient: 'from-yellow-500 to-yellow-600',
    icon: 'Sparkles',
    maxUsers: 10,
    badge: 'エンタープライズ',
    highlights: [
      '無制限利用',
      'ホワイトラベル',
      'カスタムAIモデル',
      '専任サポート'
    ]
  }
}

export const PLAN_ORDER: UserPlan[] = ['free', 'mini', 'basic', 'standard', 'pro']

export function getPlanDefinition(planId: UserPlan): PlanDefinition {
  return PLAN_DEFINITIONS[planId]
}

export function getAllPlans(): PlanDefinition[] {
  return PLAN_ORDER.map(planId => PLAN_DEFINITIONS[planId])
}

export function getNextPlan(currentPlan: UserPlan): PlanDefinition | null {
  const currentIndex = PLAN_ORDER.indexOf(currentPlan)
  const nextIndex = currentIndex + 1
  
  if (nextIndex >= PLAN_ORDER.length) {
    return null
  }
  
  return PLAN_DEFINITIONS[PLAN_ORDER[nextIndex]]
}

export function getPreviousPlan(currentPlan: UserPlan): PlanDefinition | null {
  const currentIndex = PLAN_ORDER.indexOf(currentPlan)
  const prevIndex = currentIndex - 1
  
  if (prevIndex < 0) {
    return null
  }
  
  return PLAN_DEFINITIONS[PLAN_ORDER[prevIndex]]
}

export function isPlanUpgrade(fromPlan: UserPlan, toPlan: UserPlan): boolean {
  const fromIndex = PLAN_ORDER.indexOf(fromPlan)
  const toIndex = PLAN_ORDER.indexOf(toPlan)
  
  return toIndex > fromIndex
}

export function calculateYearlySavings(plan: PlanDefinition): number {
  const monthlyTotal = plan.price.monthly * 12
  const yearlyPrice = plan.price.yearly
  
  return monthlyTotal - yearlyPrice
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    minimumFractionDigits: 0
  }).format(amount)
}

export function getPlanColor(planId: UserPlan): string {
  return PLAN_DEFINITIONS[planId].color
}

export function getPlanGradient(planId: UserPlan): string {
  return PLAN_DEFINITIONS[planId].gradient
}