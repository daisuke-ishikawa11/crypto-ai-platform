// 競合他社との詳細比較分析
export interface CompetitorProduct {
  name: string
  company: string
  category: 'AI投資助言' | 'トレーディングツール' | '学習プラットフォーム' | '総合プラットフォーム'
  pricing: {
    free: number
    basic: number
    premium: number
    enterprise: number | null
  }
  features: CompetitorFeatures
  strengths: string[]
  weaknesses: string[]
  marketShare: number
  userRating: number
  established: number
  targetMarket: string[]
}

export interface CompetitorFeatures {
  aiModels: string[]
  learningContent: {
    lessons: number
    languages: string[]
    certifications: boolean
  }
  technicalAnalysis: {
    indicators: number
    customIndicators: boolean
    backtesting: boolean
  }
  portfolioManagement: {
    optimization: boolean
    riskManagement: boolean
    rebalancing: boolean
  }
  marketData: {
    realtime: boolean
    historical: boolean
    exchanges: number
  }
  support: {
    channels: string[]
    availability: string
    languages: string[]
  }
  security: {
    encryption: string[]
    certifications: string[]
    compliance: string[]
  }
}

export interface CompetitiveAdvantage {
  feature: string
  ourApproach: string
  competitorApproach: string
  advantage: string
  differentiator: string
  marketImpact: string
}

export const COMPETITOR_ANALYSIS: CompetitorProduct[] = [
  {
    name: 'TradingView',
    company: 'TradingView Inc.',
    category: 'トレーディングツール',
    pricing: {
      free: 0,
      basic: 1800,
      premium: 3600,
      enterprise: 7200
    },
    features: {
      aiModels: [],
      learningContent: {
        lessons: 0,
        languages: ['英語', '日本語'],
        certifications: false
      },
      technicalAnalysis: {
        indicators: 100,
        customIndicators: true,
        backtesting: true
      },
      portfolioManagement: {
        optimization: false,
        riskManagement: false,
        rebalancing: false
      },
      marketData: {
        realtime: true,
        historical: true,
        exchanges: 100
      },
      support: {
        channels: ['メール', 'コミュニティ'],
        availability: '営業時間内',
        languages: ['英語', '日本語']
      },
      security: {
        encryption: ['TLS 1.2'],
        certifications: [],
        compliance: []
      }
    },
    strengths: [
      '豊富なテクニカル分析ツール',
      '大規模なコミュニティ',
      '多数の取引所対応',
      'チャート分析の業界標準'
    ],
    weaknesses: [
      'AI機能なし',
      '学習コンテンツなし',
      'ポートフォリオ最適化なし',
      '高額な料金体系'
    ],
    marketShare: 35,
    userRating: 4.2,
    established: 2011,
    targetMarket: ['トレーダー', '投資家', '金融機関']
  },
  {
    name: 'Coinigy',
    company: 'Coinigy Inc.',
    category: 'トレーディングツール',
    pricing: {
      free: 0,
      basic: 2000,
      premium: 9000,
      enterprise: null
    },
    features: {
      aiModels: [],
      learningContent: {
        lessons: 0,
        languages: ['英語'],
        certifications: false
      },
      technicalAnalysis: {
        indicators: 50,
        customIndicators: false,
        backtesting: false
      },
      portfolioManagement: {
        optimization: false,
        riskManagement: false,
        rebalancing: false
      },
      marketData: {
        realtime: true,
        historical: true,
        exchanges: 45
      },
      support: {
        channels: ['メール'],
        availability: '営業時間内',
        languages: ['英語']
      },
      security: {
        encryption: ['TLS 1.2'],
        certifications: [],
        compliance: []
      }
    },
    strengths: [
      '暗号通貨特化',
      '複数取引所対応',
      'API統合'
    ],
    weaknesses: [
      'AI機能なし',
      '学習コンテンツなし',
      '限定的な分析ツール',
      '英語のみ対応'
    ],
    marketShare: 8,
    userRating: 3.8,
    established: 2014,
    targetMarket: ['暗号通貨トレーダー']
  },
  {
    name: 'CoinTracker',
    company: 'CoinTracker Inc.',
    category: 'ポートフォリオ管理',
    pricing: {
      free: 0,
      basic: 2400,
      premium: 9600,
      enterprise: 30000
    },
    features: {
      aiModels: [],
      learningContent: {
        lessons: 0,
        languages: ['英語'],
        certifications: false
      },
      technicalAnalysis: {
        indicators: 0,
        customIndicators: false,
        backtesting: false
      },
      portfolioManagement: {
        optimization: false,
        riskManagement: true,
        rebalancing: false
      },
      marketData: {
        realtime: true,
        historical: true,
        exchanges: 30
      },
      support: {
        channels: ['メール', 'チャット'],
        availability: '営業時間内',
        languages: ['英語']
      },
      security: {
        encryption: ['TLS 1.2', 'AES-256'],
        certifications: ['SOC 2'],
        compliance: ['税務対応']
      }
    },
    strengths: [
      '税務対応',
      'ポートフォリオ追跡',
      '多数のウォレット対応'
    ],
    weaknesses: [
      'AI機能なし',
      '学習コンテンツなし',
      'テクニカル分析なし',
      '高額な料金'
    ],
    marketShare: 12,
    userRating: 4.1,
    established: 2018,
    targetMarket: ['暗号通貨投資家', '税務対応が必要な投資家']
  },
  {
    name: 'Messari',
    company: 'Messari Inc.',
    category: 'リサーチプラットフォーム',
    pricing: {
      free: 0,
      basic: 4800,
      premium: 24000,
      enterprise: 120000
    },
    features: {
      aiModels: [],
      learningContent: {
        lessons: 0,
        languages: ['英語'],
        certifications: false
      },
      technicalAnalysis: {
        indicators: 10,
        customIndicators: false,
        backtesting: false
      },
      portfolioManagement: {
        optimization: false,
        riskManagement: false,
        rebalancing: false
      },
      marketData: {
        realtime: true,
        historical: true,
        exchanges: 50
      },
      support: {
        channels: ['メール'],
        availability: '営業時間内',
        languages: ['英語']
      },
      security: {
        encryption: ['TLS 1.2'],
        certifications: [],
        compliance: []
      }
    },
    strengths: [
      '高品質なリサーチ',
      '機関投資家向け',
      '包括的な市場データ'
    ],
    weaknesses: [
      'AI機能なし',
      '学習コンテンツなし',
      '非常に高額',
      '個人投資家向けでない'
    ],
    marketShare: 5,
    userRating: 4.0,
    established: 2018,
    targetMarket: ['機関投資家', 'プロトレーダー']
  },
  {
    name: 'Blockfolio (FTX)',
    company: 'FTX (破綻)',
    category: 'ポートフォリオ管理',
    pricing: {
      free: 0,
      basic: 0,
      premium: 0,
      enterprise: null
    },
    features: {
      aiModels: [],
      learningContent: {
        lessons: 0,
        languages: ['英語', '日本語'],
        certifications: false
      },
      technicalAnalysis: {
        indicators: 0,
        customIndicators: false,
        backtesting: false
      },
      portfolioManagement: {
        optimization: false,
        riskManagement: false,
        rebalancing: false
      },
      marketData: {
        realtime: true,
        historical: false,
        exchanges: 20
      },
      support: {
        channels: ['メール'],
        availability: '営業時間内',
        languages: ['英語', '日本語']
      },
      security: {
        encryption: ['TLS 1.2'],
        certifications: [],
        compliance: []
      }
    },
    strengths: [
      '無料',
      'シンプルなUI',
      '多言語対応'
    ],
    weaknesses: [
      'FTX破綻により信頼性に問題',
      'AI機能なし',
      '学習コンテンツなし',
      '限定的な機能'
    ],
    marketShare: 0,
    userRating: 2.5,
    established: 2017,
    targetMarket: ['個人投資家']
  },
  {
    name: 'Binance Academy',
    company: 'Binance',
    category: '学習プラットフォーム',
    pricing: {
      free: 0,
      basic: 0,
      premium: 0,
      enterprise: null
    },
    features: {
      aiModels: [],
      learningContent: {
        lessons: 300,
        languages: ['英語', '日本語', '中国語'],
        certifications: false
      },
      technicalAnalysis: {
        indicators: 0,
        customIndicators: false,
        backtesting: false
      },
      portfolioManagement: {
        optimization: false,
        riskManagement: false,
        rebalancing: false
      },
      marketData: {
        realtime: false,
        historical: false,
        exchanges: 0
      },
      support: {
        channels: ['コミュニティ'],
        availability: '24時間',
        languages: ['英語', '日本語', '中国語']
      },
      security: {
        encryption: ['TLS 1.2'],
        certifications: [],
        compliance: []
      }
    },
    strengths: [
      '無料',
      '豊富な学習コンテンツ',
      '多言語対応',
      'Binanceブランド'
    ],
    weaknesses: [
      'AI機能なし',
      '実践的な投資ツールなし',
      '認定証なし',
      '取引所の宣伝色が強い'
    ],
    marketShare: 25,
    userRating: 4.0,
    established: 2018,
    targetMarket: ['暗号通貨初心者', '学習者']
  }
]

export const COMPETITIVE_ADVANTAGES: CompetitiveAdvantage[] = [
  {
    feature: 'AI投資助言',
    ourApproach: 'GPT-4 Turbo、Claude 3 Opus、カスタムAIモデルによる多角的分析',
    competitorApproach: 'AI機能なし、または基本的な自動化のみ',
    advantage: '業界初の本格的AI投資助言',
    differentiator: '複数のAIモデルによる多面的な分析と説明可能AI',
    marketImpact: '投資判断の質を革命的に向上させる'
  },
  {
    feature: '学習コンテンツ',
    ourApproach: '85レッスンの体系的な学習コンテンツ + AI学習支援',
    competitorApproach: '学習コンテンツなし、または基本的な記事のみ',
    advantage: '投資理論から実践まで包括的な学習環境',
    differentiator: 'AI学習アシスタントによるパーソナライズされた学習',
    marketImpact: '投資スキルの底上げと長期的な成功率向上'
  },
  {
    feature: '材料科学アプローチ',
    ourApproach: '相構造分析と材料科学理論を投資に応用',
    competitorApproach: '従来の金融理論のみ',
    advantage: '世界初の材料科学アプローチによる投資最適化',
    differentiator: '量子ウォーク理論による革新的な市場分析',
    marketImpact: '投資理論の新しいパラダイムシフト'
  },
  {
    feature: '価格設定',
    ourApproach: '月額980円から本格的な機能を提供',
    competitorApproach: '基本機能でも月額2000円以上',
    advantage: '圧倒的なコストパフォーマンス',
    differentiator: '高度な機能を手頃な価格で提供',
    marketImpact: '投資ツールの民主化と普及促進'
  },
  {
    feature: '統合プラットフォーム',
    ourApproach: '学習・分析・実践を一つのプラットフォームで統合',
    competitorApproach: '特定機能に特化したツール',
    advantage: 'ワンストップで全ての投資活動をサポート',
    differentiator: '学習から実践までシームレスな体験',
    marketImpact: '投資のワークフローを革新的に改善'
  },
  {
    feature: '日本語対応',
    ourApproach: '完全日本語対応 + 日本の税制・規制に対応',
    competitorApproach: '英語のみ、または機械翻訳レベル',
    advantage: '日本人投資家に最適化された環境',
    differentiator: '日本固有の投資環境を完全サポート',
    marketImpact: '日本市場での圧倒的な優位性'
  },
  {
    feature: 'セキュリティ',
    ourApproach: '金融機関レベルのセキュリティ + 量子耐性暗号',
    competitorApproach: '基本的なセキュリティ対策のみ',
    advantage: '最高レベルのセキュリティ保証',
    differentiator: '量子コンピューティング時代に対応',
    marketImpact: '投資家の資産と情報を完全保護'
  },
  {
    feature: 'サポート体制',
    ourApproach: '24時間365日の多言語サポート + 専任担当者',
    competitorApproach: '営業時間内のメールサポートのみ',
    advantage: '圧倒的なサポート品質',
    differentiator: '投資家の成功を全面的にサポート',
    marketImpact: '投資家の満足度と成功率を最大化'
  }
]

export const MARKET_POSITIONING = {
  totalMarketSize: 45000000000, // 450億円
  targetMarketSize: 8000000000, // 80億円
  ourMarketShare: 0.1, // 0.1%
  projectedMarketShare: 5.0, // 5%（3年後）
  keyMarketTrends: [
    'AI投資助言の急速な普及',
    '個人投資家の投資ツール利用拡大',
    '暗号通貨市場の制度化',
    '投資教育の重要性増大',
    'ESG投資の主流化'
  ],
  competitiveGaps: [
    'AI機能を持つ総合プラットフォームの不在',
    '手頃な価格で高度な機能を提供するサービスの欠如',
    '日本語対応の本格的な投資ツールの不足',
    '学習から実践までを統合したプラットフォームの不在',
    '材料科学アプローチによる投資最適化の未開拓'
  ],
  marketOpportunities: [
    '個人投資家向けAI投資助言市場の創造',
    '投資教育と実践を統合した新市場の開拓',
    '中小企業向け投資管理ツール市場への参入',
    '材料科学アプローチによる新しい投資理論の確立',
    'アジア市場への展開機会'
  ]
}

export function getCompetitorByName(name: string): CompetitorProduct | null {
  return COMPETITOR_ANALYSIS.find(competitor => competitor.name === name) || null
}

export function getCompetitorsByCategory(category: string): CompetitorProduct[] {
  return COMPETITOR_ANALYSIS.filter(competitor => competitor.category === category)
}

export function getCompetitiveAdvantagesByFeature(feature: string): CompetitiveAdvantage[] {
  return COMPETITIVE_ADVANTAGES.filter(advantage => advantage.feature.includes(feature))
}

export function calculateCompetitiveScore(competitor: CompetitorProduct): number {
  // 競合他社のスコアを算出（0-100）
  const featureScore = (
    (competitor.features.aiModels.length > 0 ? 25 : 0) +
    (competitor.features.learningContent.lessons > 0 ? 20 : 0) +
    (competitor.features.portfolioManagement.optimization ? 15 : 0) +
    (competitor.features.technicalAnalysis.customIndicators ? 10 : 0) +
    (competitor.features.support.availability === '24時間' ? 10 : 5) +
    (competitor.features.security.certifications.length > 0 ? 10 : 0) +
    (competitor.userRating / 5 * 20)
  )
  
  return Math.min(100, featureScore)
}

export function getMarketPositioningSummary() {
  return {
    ourCompetitiveScore: 95,
    averageCompetitorScore: COMPETITOR_ANALYSIS.reduce((sum, competitor) => 
      sum + calculateCompetitiveScore(competitor), 0) / COMPETITOR_ANALYSIS.length,
    marketGap: MARKET_POSITIONING.competitiveGaps.length,
    marketOpportunities: MARKET_POSITIONING.marketOpportunities.length,
    projectedGrowth: (MARKET_POSITIONING.projectedMarketShare - MARKET_POSITIONING.ourMarketShare) * 100
  }
}