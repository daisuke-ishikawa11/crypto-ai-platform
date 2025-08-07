// サポート内容の詳細説明
export interface SupportTier {
  planId: string
  tier: 'community' | 'standard' | 'priority' | 'premium'
  channels: SupportChannel[]
  responseTime: ResponseTime
  availability: SupportAvailability
  features: SupportFeature[]
  team: SupportTeam
  escalation: EscalationProcess
  satisfaction: SatisfactionMetrics
  resources: SupportResource[]
}

export interface SupportChannel {
  channel: string
  availability: string
  languages: string[]
  responseTime: string
  limitations?: string[]
  benefits: string[]
}

export interface ResponseTime {
  emergency: string
  urgent: string
  normal: string
  low: string
  average: string
}

export interface SupportAvailability {
  timezone: string
  hours: string
  days: string[]
  holidays: boolean
  afterHours: boolean
}

export interface SupportFeature {
  feature: string
  description: string
  availability: string
  limitations?: string[]
}

export interface SupportTeam {
  structure: string
  expertise: string[]
  certifications: string[]
  experience: string
  languages: string[]
}

export interface EscalationProcess {
  levels: EscalationLevel[]
  triggers: string[]
  timeframes: string[]
  ownership: string[]
}

export interface EscalationLevel {
  level: number
  role: string
  expertise: string[]
  escalationTime: string
  authority: string[]
}

export interface SatisfactionMetrics {
  csat: number // Customer Satisfaction Score
  nps: number // Net Promoter Score
  firstCallResolution: number
  averageHandleTime: string
  escalationRate: number
}

export interface SupportResource {
  type: string
  name: string
  description: string
  availability: string
  languages: string[]
  updateFrequency: string
}

export const SUPPORT_TIERS: Record<string, SupportTier> = {
  free: {
    planId: 'free',
    tier: 'community',
    channels: [
      {
        channel: 'コミュニティフォーラム',
        availability: '24時間365日',
        languages: ['日本語', '英語'],
        responseTime: '48-72時間',
        limitations: ['コミュニティメンバーからの回答', '公式回答は週2回'],
        benefits: ['無料', '多様な視点', '経験共有']
      },
      {
        channel: 'FAQ・ナレッジベース',
        availability: '24時間365日',
        languages: ['日本語', '英語'],
        responseTime: '即時',
        benefits: ['即座に回答', '豊富な情報', '検索可能']
      },
      {
        channel: 'チュートリアル動画',
        availability: '24時間365日',
        languages: ['日本語', '英語'],
        responseTime: '即時',
        benefits: ['視覚的理解', '段階的学習', '繰り返し視聴']
      }
    ],
    responseTime: {
      emergency: '対応なし',
      urgent: '72時間',
      normal: '48-72時間',
      low: '1週間',
      average: '60時間'
    },
    availability: {
      timezone: 'JST',
      hours: 'コミュニティ依存',
      days: ['毎日（コミュニティ）'],
      holidays: false,
      afterHours: false
    },
    features: [
      {
        feature: 'コミュニティ参加',
        description: '活発なユーザーコミュニティでの情報交換',
        availability: '24時間365日'
      },
      {
        feature: 'ナレッジベース',
        description: '200以上のFAQと詳細ガイド',
        availability: '24時間365日'
      },
      {
        feature: 'チュートリアル',
        description: '50以上の動画チュートリアル',
        availability: '24時間365日'
      }
    ],
    team: {
      structure: 'コミュニティモデレーター',
      expertise: ['基本的な投資知識', 'プラットフォーム使用法'],
      certifications: ['投資アドバイザー資格'],
      experience: '平均3年',
      languages: ['日本語', '英語']
    },
    escalation: {
      levels: [
        {
          level: 1,
          role: 'コミュニティモデレーター',
          expertise: ['基本的な質問', 'プラットフォーム使用法'],
          escalationTime: '72時間',
          authority: ['FAQ案内', 'コミュニティガイド']
        },
        {
          level: 2,
          role: 'カスタマーサポート',
          expertise: ['技術的問題', '投資基礎'],
          escalationTime: '1週間',
          authority: ['有料プラン推奨', '技術チーム連携']
        }
      ],
      triggers: ['複雑な技術問題', '投資関連の詳細質問'],
      timeframes: ['72時間', '1週間'],
      ownership: ['コミュニティ', 'サポートチーム']
    },
    satisfaction: {
      csat: 75,
      nps: 45,
      firstCallResolution: 60,
      averageHandleTime: '48時間',
      escalationRate: 25
    },
    resources: [
      {
        type: 'FAQ',
        name: 'よくある質問',
        description: '200以上のFAQと詳細な回答',
        availability: '24時間365日',
        languages: ['日本語', '英語'],
        updateFrequency: '週次'
      },
      {
        type: 'ガイド',
        name: '初心者ガイド',
        description: '投資初心者向けの包括的なガイド',
        availability: '24時間365日',
        languages: ['日本語'],
        updateFrequency: '月次'
      },
      {
        type: '動画',
        name: 'チュートリアル動画',
        description: '50以上の操作説明動画',
        availability: '24時間365日',
        languages: ['日本語', '英語'],
        updateFrequency: '月次'
      }
    ]
  },

  mini: {
    planId: 'mini',
    tier: 'standard',
    channels: [
      {
        channel: 'メールサポート',
        availability: '平日 9:00-18:00',
        languages: ['日本語'],
        responseTime: '24時間以内',
        benefits: ['専門スタッフ対応', '個別カスタマイズ', '詳細な回答']
      },
      {
        channel: 'コミュニティフォーラム',
        availability: '24時間365日',
        languages: ['日本語', '英語'],
        responseTime: '24-48時間',
        benefits: ['コミュニティ交流', '経験共有', '公式回答']
      },
      {
        channel: 'FAQ・ナレッジベース',
        availability: '24時間365日',
        languages: ['日本語', '英語'],
        responseTime: '即時',
        benefits: ['即座に回答', '豊富な情報', '検索可能']
      }
    ],
    responseTime: {
      emergency: '4時間',
      urgent: '24時間',
      normal: '24時間',
      low: '48時間',
      average: '18時間'
    },
    availability: {
      timezone: 'JST',
      hours: '9:00-18:00',
      days: ['月曜日', '火曜日', '水曜日', '木曜日', '金曜日'],
      holidays: false,
      afterHours: false
    },
    features: [
      {
        feature: 'オンボーディング支援',
        description: '初回設定と使い方の個別サポート',
        availability: '平日営業時間内'
      },
      {
        feature: 'メール相談',
        description: '投資に関する基本的な質問対応',
        availability: '平日営業時間内'
      },
      {
        feature: 'アカウント管理',
        description: 'プラン変更やアカウント設定の支援',
        availability: '平日営業時間内'
      }
    ],
    team: {
      structure: '専任カスタマーサポート',
      expertise: ['投資基礎', 'プラットフォーム操作', 'テクニカル分析'],
      certifications: ['投資アドバイザー資格', '証券外務員資格'],
      experience: '平均5年',
      languages: ['日本語']
    },
    escalation: {
      levels: [
        {
          level: 1,
          role: 'カスタマーサポート',
          expertise: ['一般的な質問', 'アカウント管理'],
          escalationTime: '24時間',
          authority: ['基本的な問題解決', 'ガイド案内']
        },
        {
          level: 2,
          role: 'シニアサポート',
          expertise: ['投資アドバイス', '技術的問題'],
          escalationTime: '48時間',
          authority: ['投資相談', '技術チーム連携']
        }
      ],
      triggers: ['投資に関する詳細質問', '技術的問題'],
      timeframes: ['24時間', '48時間'],
      ownership: ['サポートチーム', 'シニアサポート']
    },
    satisfaction: {
      csat: 85,
      nps: 65,
      firstCallResolution: 75,
      averageHandleTime: '18時間',
      escalationRate: 15
    },
    resources: [
      {
        type: 'ガイド',
        name: 'ミニプラン活用ガイド',
        description: 'ミニプラン機能の詳細な使い方',
        availability: '24時間365日',
        languages: ['日本語'],
        updateFrequency: '月次'
      },
      {
        type: 'ウェビナー',
        name: '投資基礎セミナー',
        description: '月次の投資教育ウェビナー',
        availability: '月1回',
        languages: ['日本語'],
        updateFrequency: '月次'
      }
    ]
  },

  basic: {
    planId: 'basic',
    tier: 'priority',
    channels: [
      {
        channel: 'ライブチャット',
        availability: '平日 9:00-21:00',
        languages: ['日本語', '英語'],
        responseTime: '5分以内',
        benefits: ['即座の対応', 'リアルタイム解決', '画面共有']
      },
      {
        channel: 'メールサポート',
        availability: '平日 9:00-21:00',
        languages: ['日本語', '英語'],
        responseTime: '12時間以内',
        benefits: ['詳細な回答', '個別対応', '技術的支援']
      },
      {
        channel: 'コミュニティフォーラム',
        availability: '24時間365日',
        languages: ['日本語', '英語'],
        responseTime: '12-24時間',
        benefits: ['優先回答', '専門家参加', '詳細解説']
      }
    ],
    responseTime: {
      emergency: '2時間',
      urgent: '12時間',
      normal: '12時間',
      low: '24時間',
      average: '8時間'
    },
    availability: {
      timezone: 'JST',
      hours: '9:00-21:00',
      days: ['月曜日', '火曜日', '水曜日', '木曜日', '金曜日'],
      holidays: false,
      afterHours: false
    },
    features: [
      {
        feature: 'オンボーディング支援',
        description: '個別のセットアップと機能説明',
        availability: '平日営業時間内'
      },
      {
        feature: 'トレーニング',
        description: '高度機能の使い方トレーニング',
        availability: '平日営業時間内'
      },
      {
        feature: '投資相談',
        description: 'AI機能を活用した投資アドバイス',
        availability: '平日営業時間内'
      },
      {
        feature: '技術サポート',
        description: 'API連携や技術的な問題の解決',
        availability: '平日営業時間内'
      }
    ],
    team: {
      structure: '専任プライオリティサポート',
      expertise: ['高度な投資戦略', 'AI機能', 'ポートフォリオ最適化'],
      certifications: ['CFA', '証券アナリスト', 'FP1級'],
      experience: '平均8年',
      languages: ['日本語', '英語']
    },
    escalation: {
      levels: [
        {
          level: 1,
          role: 'プライオリティサポート',
          expertise: ['投資戦略', 'AI機能', 'ポートフォリオ'],
          escalationTime: '12時間',
          authority: ['投資アドバイス', '機能カスタマイズ']
        },
        {
          level: 2,
          role: 'シニアアナリスト',
          expertise: ['複雑な投資戦略', '高度な分析'],
          escalationTime: '24時間',
          authority: ['高度な分析', '戦略立案']
        },
        {
          level: 3,
          role: 'テクニカルリード',
          expertise: ['技術的問題', 'システム連携'],
          escalationTime: '48時間',
          authority: ['技術的解決', '開発チーム連携']
        }
      ],
      triggers: ['複雑な投資戦略', '高度な技術問題'],
      timeframes: ['12時間', '24時間', '48時間'],
      ownership: ['サポートチーム', 'アナリスト', 'テクニカルチーム']
    },
    satisfaction: {
      csat: 92,
      nps: 78,
      firstCallResolution: 85,
      averageHandleTime: '8時間',
      escalationRate: 10
    },
    resources: [
      {
        type: 'ガイド',
        name: 'ベーシックプラン完全ガイド',
        description: '全機能の詳細な使い方とベストプラクティス',
        availability: '24時間365日',
        languages: ['日本語', '英語'],
        updateFrequency: '月次'
      },
      {
        type: 'ウェビナー',
        name: '高度な投資戦略セミナー',
        description: '月次の専門的な投資教育',
        availability: '月2回',
        languages: ['日本語'],
        updateFrequency: '月次'
      },
      {
        type: 'レポート',
        name: '市場分析レポート',
        description: '専門アナリストによる市場分析',
        availability: '週次',
        languages: ['日本語'],
        updateFrequency: '週次'
      }
    ]
  },

  standard: {
    planId: 'standard',
    tier: 'premium',
    channels: [
      {
        channel: 'ライブチャット',
        availability: '平日 9:00-21:00、土日祝 10:00-18:00',
        languages: ['日本語', '英語'],
        responseTime: '2分以内',
        benefits: ['即座の対応', '専門家直接対応', '画面共有']
      },
      {
        channel: '電話サポート',
        availability: '平日 9:00-21:00、土日祝 10:00-18:00',
        languages: ['日本語', '英語'],
        responseTime: '即時',
        benefits: ['リアルタイム相談', '複雑な問題解決', '個別指導']
      },
      {
        channel: 'メールサポート',
        availability: '24時間365日',
        languages: ['日本語', '英語'],
        responseTime: '4時間以内',
        benefits: ['詳細な分析', '個別レポート', '戦略提案']
      }
    ],
    responseTime: {
      emergency: '1時間',
      urgent: '4時間',
      normal: '4時間',
      low: '12時間',
      average: '3時間'
    },
    availability: {
      timezone: 'JST',
      hours: '平日 9:00-21:00、土日祝 10:00-18:00',
      days: ['毎日'],
      holidays: true,
      afterHours: false
    },
    features: [
      {
        feature: '専任サポート',
        description: '担当者による継続的なサポート',
        availability: '平日営業時間内'
      },
      {
        feature: '高度な投資相談',
        description: '材料科学アプローチを含む高度な投資戦略',
        availability: '平日営業時間内'
      },
      {
        feature: 'API技術サポート',
        description: 'API連携の設定と最適化支援',
        availability: '平日営業時間内'
      },
      {
        feature: 'カスタマイズ支援',
        description: '個別ニーズに応じたカスタマイズ',
        availability: '平日営業時間内'
      }
    ],
    team: {
      structure: '専任プレミアムサポート',
      expertise: ['材料科学アプローチ', 'API技術', '量子ウォーク理論'],
      certifications: ['CFA', '証券アナリスト', 'FP1級', '量子計算認定'],
      experience: '平均10年',
      languages: ['日本語', '英語']
    },
    escalation: {
      levels: [
        {
          level: 1,
          role: 'プレミアムサポート',
          expertise: ['材料科学', 'API技術', '高度な分析'],
          escalationTime: '4時間',
          authority: ['高度な分析', 'カスタマイズ']
        },
        {
          level: 2,
          role: 'シニアコンサルタント',
          expertise: ['投資戦略', '材料科学理論'],
          escalationTime: '12時間',
          authority: ['戦略コンサルティング', '理論指導']
        },
        {
          level: 3,
          role: 'CTO',
          expertise: ['技術革新', 'システム設計'],
          escalationTime: '24時間',
          authority: ['技術的決定', '開発方針']
        }
      ],
      triggers: ['高度な技術問題', '材料科学理論の質問'],
      timeframes: ['4時間', '12時間', '24時間'],
      ownership: ['サポートチーム', 'コンサルタント', 'CTO']
    },
    satisfaction: {
      csat: 95,
      nps: 85,
      firstCallResolution: 90,
      averageHandleTime: '3時間',
      escalationRate: 5
    },
    resources: [
      {
        type: 'ガイド',
        name: 'スタンダードプラン専門ガイド',
        description: '材料科学アプローチの詳細解説',
        availability: '24時間365日',
        languages: ['日本語', '英語'],
        updateFrequency: '月次'
      },
      {
        type: 'ウェビナー',
        name: '材料科学投資セミナー',
        description: '革新的投資手法の専門セミナー',
        availability: '月4回',
        languages: ['日本語'],
        updateFrequency: '月次'
      },
      {
        type: 'レポート',
        name: '材料科学分析レポート',
        description: '量子ウォーク理論を活用した市場分析',
        availability: '週次',
        languages: ['日本語'],
        updateFrequency: '週次'
      }
    ]
  },

  pro: {
    planId: 'pro',
    tier: 'premium',
    channels: [
      {
        channel: '専任サポート',
        availability: '24時間365日',
        languages: ['日本語', '英語', '中国語', '韓国語'],
        responseTime: '30分以内',
        benefits: ['専任チーム', '最優先対応', '直通連絡先']
      },
      {
        channel: 'ビデオ通話',
        availability: '24時間365日',
        languages: ['日本語', '英語', '中国語', '韓国語'],
        responseTime: '1時間以内',
        benefits: ['face-to-face対応', '画面共有', '個別指導']
      },
      {
        channel: 'オンサイト支援',
        availability: '事前予約制',
        languages: ['日本語', '英語'],
        responseTime: '48時間以内',
        benefits: ['現地訪問', '直接指導', 'システム構築']
      }
    ],
    responseTime: {
      emergency: '30分',
      urgent: '1時間',
      normal: '1時間',
      low: '4時間',
      average: '45分'
    },
    availability: {
      timezone: 'グローバル',
      hours: '24時間365日',
      days: ['毎日'],
      holidays: true,
      afterHours: true
    },
    features: [
      {
        feature: '専任アカウントマネージャー',
        description: '専属の担当者による包括的なサポート',
        availability: '24時間365日'
      },
      {
        feature: '導入支援',
        description: '初期設定から運用開始まで完全サポート',
        availability: '24時間365日'
      },
      {
        feature: 'カスタム開発',
        description: '企業固有の要件に応じた機能開発',
        availability: '24時間365日'
      },
      {
        feature: 'トレーニング',
        description: '社内研修や教育プログラムの提供',
        availability: '24時間365日'
      },
      {
        feature: 'SLA保証',
        description: '99.99%のアップタイムとサービス品質保証',
        availability: '24時間365日'
      }
    ],
    team: {
      structure: '専任エンタープライズチーム',
      expertise: ['全領域の専門知識', 'エンタープライズ経験', 'カスタム開発'],
      certifications: ['CFA', '証券アナリスト', 'PMP', 'AWS認定', 'Azure認定'],
      experience: '平均15年',
      languages: ['日本語', '英語', '中国語', '韓国語']
    },
    escalation: {
      levels: [
        {
          level: 1,
          role: 'アカウントマネージャー',
          expertise: ['全機能', '戦略コンサルティング'],
          escalationTime: '1時間',
          authority: ['サービス調整', '優先対応']
        },
        {
          level: 2,
          role: 'シニアコンサルタント',
          expertise: ['高度な戦略', '技術アーキテクチャ'],
          escalationTime: '4時間',
          authority: ['カスタム開発', '戦略立案']
        },
        {
          level: 3,
          role: 'CTO',
          expertise: ['技術革新', 'システム設計'],
          escalationTime: '12時間',
          authority: ['技術的決定', '開発優先度']
        },
        {
          level: 4,
          role: 'CEO',
          expertise: ['事業戦略', '企業連携'],
          escalationTime: '24時間',
          authority: ['事業的決定', '戦略的提携']
        }
      ],
      triggers: ['緊急事態', '事業クリティカル問題'],
      timeframes: ['1時間', '4時間', '12時間', '24時間'],
      ownership: ['アカウントマネージャー', 'コンサルタント', 'CTO', 'CEO']
    },
    satisfaction: {
      csat: 98,
      nps: 92,
      firstCallResolution: 95,
      averageHandleTime: '45分',
      escalationRate: 2
    },
    resources: [
      {
        type: '専用ポータル',
        name: 'エンタープライズポータル',
        description: '専用のサポートポータルと管理ツール',
        availability: '24時間365日',
        languages: ['日本語', '英語', '中国語', '韓国語'],
        updateFrequency: 'リアルタイム'
      },
      {
        type: 'コンサルティング',
        name: '戦略コンサルティング',
        description: '専門家による投資戦略の個別コンサルティング',
        availability: '24時間365日',
        languages: ['日本語', '英語'],
        updateFrequency: '継続的'
      },
      {
        type: 'レポート',
        name: 'カスタムレポート',
        description: '企業固有の要件に応じたカスタム分析レポート',
        availability: '24時間365日',
        languages: ['日本語', '英語'],
        updateFrequency: '要求に応じて'
      }
    ]
  }
}

export const SUPPORT_METRICS = {
  industryBenchmarks: {
    csat: {
      poor: 60,
      average: 75,
      good: 85,
      excellent: 90
    },
    nps: {
      poor: 0,
      average: 30,
      good: 50,
      excellent: 70
    },
    firstCallResolution: {
      poor: 50,
      average: 70,
      good: 80,
      excellent: 90
    },
    responseTime: {
      poor: '48時間',
      average: '24時間',
      good: '12時間',
      excellent: '4時間'
    }
  },
  ourPerformance: {
    overall: {
      csat: 91,
      nps: 73,
      firstCallResolution: 83,
      averageResponseTime: '12時間'
    },
    byTier: {
      community: { csat: 75, nps: 45, fcr: 60 },
      standard: { csat: 85, nps: 65, fcr: 75 },
      priority: { csat: 92, nps: 78, fcr: 85 },
      premium: { csat: 96, nps: 88, fcr: 92 }
    }
  },
  competitiveAdvantage: {
    responseTime: '業界平均より75%高速',
    satisfaction: '業界平均より21%高い満足度',
    resolution: '業界平均より18%高い解決率',
    availability: '業界最高レベルの24時間365日対応'
  }
}

export function getSupportTier(planId: string): SupportTier | null {
  return SUPPORT_TIERS[planId] || null
}

export function getAllSupportTiers(): SupportTier[] {
  return Object.values(SUPPORT_TIERS)
}

export function compareSupportTiers(planId1: string, planId2: string): {
  channels: string[]
  responseTime: string
  features: string[]
  satisfaction: number
} {
  const tier1 = getSupportTier(planId1)
  const tier2 = getSupportTier(planId2)
  
  if (!tier1 || !tier2) {
    return {
      channels: [],
      responseTime: '',
      features: [],
      satisfaction: 0
    }
  }
  
  return {
    channels: tier2.channels.filter(c => !tier1.channels.some(t => t.channel === c.channel)).map(c => c.channel),
    responseTime: `${tier1.responseTime.average} → ${tier2.responseTime.average}`,
    features: tier2.features.filter(f => !tier1.features.some(t => t.feature === f.feature)).map(f => f.feature),
    satisfaction: tier2.satisfaction.csat - tier1.satisfaction.csat
  }
}

export function calculateSupportValue(planId: string): number {
  const tier = getSupportTier(planId)
  if (!tier) return 0
  
  const channelValue = tier.channels.length * 50000
  const responseValue = tier.responseTime.average === '45分' ? 500000 : 
                       tier.responseTime.average === '3時間' ? 300000 :
                       tier.responseTime.average === '8時間' ? 200000 : 100000
  const satisfactionValue = tier.satisfaction.csat * 5000
  
  return channelValue + responseValue + satisfactionValue
}