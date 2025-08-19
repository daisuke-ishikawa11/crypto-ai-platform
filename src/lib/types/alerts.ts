export type PlanType = 'free' | 'basic' | 'premium'

export type AlertType = 
  | 'price_alert'
  | 'volatility_alert'
  | 'trend_change'
  | 'volume_spike'
  | 'resistance_support'
  | 'learning_related'
  | 'ai_prediction'
  | 'portfolio_optimization'
  | 'news_impact'
  | 'arbitrage_opportunity'
  | 'defi_yield'
  | 'risk_management'

export type NotificationDeviceType = 
  | 'browser'
  | 'email'
  | 'line'
  | 'discord'
  | 'slack'
  | 'telegram'
  | 'sms'
  | 'push'
  | 'webhook'

export interface TimeSlot {
  id: string
  name: string
  startTime: string // HH:mm format
  endTime: string
  enabled: boolean
}

export interface NotificationDevice {
  type: NotificationDeviceType
  identifier: string // email address, webhook URL, etc.
  enabled: boolean
}

export interface AlertThreshold {
  id: string
  type: AlertType
  coinSymbol: string
  condition: 'above' | 'below' | 'change_percent'
  value: number
  priority: 'low' | 'medium' | 'high'
  enabled: boolean
}

export interface AlertConfig {
  id: string
  userId: string
  planType: PlanType
  alertTypes: AlertType[]
  frequency: {
    maxDaily: number
    currentDaily: number
    timeSlots: TimeSlot[]
    customTimes?: string[]
  }
  notificationDevices: NotificationDevice[]
  thresholds: AlertThreshold[]
  preferences: {
    includeAnalysis: boolean
    includeLearningTips: boolean
    language: 'ja' | 'en'
  }
  createdAt: string
  updatedAt: string
}

export interface MarketData {
  symbol: string
  price: number
  change24h: number
  changePercent24h: number
  volume24h: number
  marketCap: number
  timestamp: string
  technicalIndicators?: {
    rsi: number
    macd: number
    bb_upper: number
    bb_lower: number
    support: number
    resistance: number
  }
}

export interface AIAnalysis {
  confidence: number // 0-1
  prediction: 'bullish' | 'bearish' | 'neutral'
  timeframe: '1h' | '4h' | '1d' | '1w'
  reasoning: string
  riskLevel: 'low' | 'medium' | 'high'
  suggestedAction?: string
}

export interface Alert {
  id: string
  userId: string
  type: AlertType
  coinSymbol: string
  title: string
  message: string
  priority: 'low' | 'medium' | 'high'
  marketData: MarketData
  aiAnalysis?: AIAnalysis
  learningTip?: {
    lessonId: string
    lessonTitle: string
    explanation: string
  }
  actionSuggestion?: string
  metadata?: Record<string, unknown>
  createdAt: string
  triggeredBy: AlertThreshold
}

export interface DeliveryResult {
  deviceType: NotificationDeviceType
  success: boolean
  error?: string
  deliveredAt?: string
}

export interface AlertDelivery {
  alertId: string
  userId: string
  planType: PlanType
  results: DeliveryResult[]
  totalDevices: number
  successfulDeliveries: number
  deliveredAt: string
}

// Plan configurations - 戦略的再設計版
export const PLAN_CONFIGS = {
  free: {
    maxWeeklyAlerts: 3, // 週3回制限（通知疲れ防止）
    maxDailyAlerts: 1, // 日1回制限
    timeSlotCount: 1, // タイムスロット1個のみ
    allowedAlertTypes: ['volatility_alert', 'learning_related'] as AlertType[],
    allowedDevices: ['browser', 'email', 'line', 'discord'] as NotificationDeviceType[], // 4つから1つ選択
    maxSelectedDevices: 1, // 1つのデバイスのみ選択可能
    customTiming: false, // カスタムタイミング不可
    maxCustomTimes: 0, // カスタムタイミング0個
    aiAnalysis: false,
    learningTips: true,
    upgradePrompts: true, // アップグレード提案表示
    intelligentFiltering: true // 重要度による自動フィルタリング
  },
  basic: {
    maxDailyAlerts: 1, // 毎日1回
    maxEmergencyAlerts: 3, // 緊急時追加3回
    timeSlotCount: 2, // タイムスロット2個まで
    allowedAlertTypes: [
      'volatility_alert',
      'learning_related', 
      'trend_change', 
      'volume_spike', 
      'ai_prediction', // AI売買タイミング
      'risk_management' // 損切り・利確警告
    ] as AlertType[],
    allowedDevices: ['browser', 'email', 'line', 'discord', 'slack', 'telegram'] as NotificationDeviceType[],
    maxSelectedDevices: 2, // 2つのデバイス選択可能
    customTiming: false, // カスタムタイミング不可
    maxCustomTimes: 0, // カスタムタイミング0個
    aiAnalysis: true,
    learningTips: true,
    riskAlerts: true,
    intelligentFiltering: true,
    successMetrics: true // 投資成果追跡
  },
  premium: {
    maxDailyAlerts: -1, // 無制限（ただし品質重視配信）
    timeSlotCount: -1, // タイムスロット無制限
    allowedAlertTypes: [
      'volatility_alert',
      'learning_related',
      'trend_change', 
      'volume_spike', 
      'ai_prediction',
      'risk_management',
      'portfolio_optimization', 
      'arbitrage_opportunity', 
      'defi_yield',
      'news_impact'
    ] as AlertType[],
    allowedDevices: [
      'browser', 
      'email', 
      'line', 
      'discord', 
      'slack', 
      'telegram', 
      'sms', 
      'push', 
      'webhook'
    ] as NotificationDeviceType[],
    maxSelectedDevices: -1, // 無制限
    customTiming: true,
    maxCustomTimes: 8,
    aiAnalysis: true,
    advancedAI: true, // 高度AI分析
    learningTips: true,
    riskManagement: true,
    portfolioOptimization: true,
    arbitrageDetection: true,
    successMetrics: true,
    prioritySupport: true
  }
} as const

export const DEFAULT_TIME_SLOTS: TimeSlot[] = [
  {
    id: 'morning',
    name: '朝の市場確認',
    startTime: '08:00',
    endTime: '10:00',
    enabled: true
  },
  {
    id: 'afternoon', 
    name: '昼の動向チェック',
    startTime: '12:00',
    endTime: '14:00', 
    enabled: false
  },
  {
    id: 'evening',
    name: '夜の総括',
    startTime: '20:00',
    endTime: '22:00',
    enabled: false
  }
]

export const ALERT_TYPE_LABELS: Record<AlertType, string> = {
  price_alert: '価格アラート',
  volatility_alert: '大幅変動アラート',
  trend_change: 'トレンド転換アラート',
  volume_spike: '取引量急増アラート', 
  resistance_support: 'レジスタンス・サポートアラート',
  learning_related: '学習連携アラート',
  ai_prediction: 'AI予測アラート',
  portfolio_optimization: 'ポートフォリオ最適化アラート',
  news_impact: 'ニュース影響度アラート',
  arbitrage_opportunity: 'クロスチェーン機会アラート',
  defi_yield: 'DeFi利回りアラート',
  risk_management: 'リスク管理アラート'
}

export const NOTIFICATION_DEVICE_LABELS: Record<NotificationDeviceType, string> = {
  browser: 'ブラウザ通知',
  email: 'Email',
  line: 'LINE',
  discord: 'Discord',
  slack: 'Slack', 
  telegram: 'Telegram',
  sms: 'SMS',
  push: 'Push通知',
  webhook: 'Webhook'
}