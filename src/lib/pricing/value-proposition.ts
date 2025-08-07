// 価格設定の根拠と価値提案の詳細分析
export interface ValueProposition {
  planId: string
  priceJustification: PriceJustification
  valueMetrics: ValueMetrics
  costBreakdown: CostBreakdown
  competitiveAnalysis: CompetitivePricing
  customerSegmentAnalysis: CustomerSegmentAnalysis
  pricingStrategy: PricingStrategy
  marketPenetration: MarketPenetrationStrategy
}

export interface PriceJustification {
  developmentCosts: number
  operationalCosts: number
  aiModelCosts: number
  supportCosts: number
  marketingCosts: number
  profitMargin: number
  valueDelivered: number
  competitorComparison: {
    competitor: string
    theirPrice: number
    ourPrice: number
    valueDifference: string
  }[]
}

export interface ValueMetrics {
  timeToValue: string
  roi: {
    shortTerm: string // 3ヶ月
    mediumTerm: string // 1年
    longTerm: string // 3年
  }
  costSavings: {
    toolReplacement: number
    timeEfficiency: number
    errorReduction: number
    educationCosts: number
  }
  revenueGeneration: {
    improvedReturns: number
    riskReduction: number
    opportunityCapture: number
  }
  productivityGains: {
    decisionSpeed: string
    analysisAccuracy: string
    learningEfficiency: string
  }
}

export interface CostBreakdown {
  infrastructure: number
  aiModels: number
  dataProviders: number
  support: number
  development: number
  marketing: number
  overhead: number
  total: number
}

export interface CompetitivePricing {
  ourPosition: 'premium' | 'mid-tier' | 'budget'
  priceAdvantage: number // percentage
  featureAdvantage: string[]
  marketShare: number
  customerSatisfaction: number
}

export interface CustomerSegmentAnalysis {
  segment: string
  willingness: number // 支払い意欲度（0-100）
  priceToleranceRange: {
    min: number
    max: number
    optimal: number
  }
  valueDrivers: string[]
  purchaseDecisionFactors: string[]
}

export interface PricingStrategy {
  strategy: 'penetration' | 'premium' | 'competitive' | 'value-based'
  rationale: string
  adjustmentTriggers: string[]
  seasonalFactors: string[]
  promotionalStrategy: string[]
}

export interface MarketPenetrationStrategy {
  phase1: {
    duration: string
    pricing: 'aggressive' | 'moderate' | 'premium'
    objectives: string[]
  }
  phase2: {
    duration: string
    pricing: 'aggressive' | 'moderate' | 'premium'
    objectives: string[]
  }
  phase3: {
    duration: string
    pricing: 'aggressive' | 'moderate' | 'premium'
    objectives: string[]
  }
}

export const VALUE_PROPOSITIONS: Record<string, ValueProposition> = {
  free: {
    planId: 'free',
    priceJustification: {
      developmentCosts: 0,
      operationalCosts: 300000,
      aiModelCosts: 150000,
      supportCosts: 100000,
      marketingCosts: 200000,
      profitMargin: 0,
      valueDelivered: 120000,
      competitorComparison: [
        {
          competitor: 'Binance Academy',
          theirPrice: 0,
          ourPrice: 0,
          valueDifference: 'AI機能付きで同等の無料サービス'
        },
        {
          competitor: 'TradingView Basic',
          theirPrice: 1800,
          ourPrice: 0,
          valueDifference: '月額1800円の価値を無料で提供'
        }
      ]
    },
    valueMetrics: {
      timeToValue: '即日',
      roi: {
        shortTerm: '投資コスト0円で12万円相当の教育価値',
        mediumTerm: '投資スキル向上による年間50万円の収益改善',
        longTerm: '投資リテラシー向上による生涯収益300万円増加'
      },
      costSavings: {
        toolReplacement: 0,
        timeEfficiency: 50000,
        errorReduction: 30000,
        educationCosts: 120000
      },
      revenueGeneration: {
        improvedReturns: 500000,
        riskReduction: 200000,
        opportunityCapture: 100000
      },
      productivityGains: {
        decisionSpeed: '学習時間50%短縮',
        analysisAccuracy: '基本的な分析精度向上',
        learningEfficiency: '体系的学習による効率化'
      }
    },
    costBreakdown: {
      infrastructure: 50000,
      aiModels: 150000,
      dataProviders: 0,
      support: 100000,
      development: 500000,
      marketing: 200000,
      overhead: 100000,
      total: 1100000
    },
    competitiveAnalysis: {
      ourPosition: 'premium',
      priceAdvantage: 100,
      featureAdvantage: ['AI機能', '体系的学習', '日本語対応'],
      marketShare: 0.1,
      customerSatisfaction: 85
    },
    customerSegmentAnalysis: {
      segment: '投資初心者・学習者',
      willingness: 0,
      priceToleranceRange: {
        min: 0,
        max: 0,
        optimal: 0
      },
      valueDrivers: ['無料', '学習機会', '基本的なサポート'],
      purchaseDecisionFactors: ['無料', '信頼性', '使いやすさ']
    },
    pricingStrategy: {
      strategy: 'penetration',
      rationale: '市場参入とユーザーベース構築のため',
      adjustmentTriggers: ['ユーザー数10万人達成', '有料プラン転換率目標達成'],
      seasonalFactors: ['新年度', '投資ブーム時'],
      promotionalStrategy: ['紹介キャンペーン', '学習達成報酬']
    },
    marketPenetration: {
      phase1: {
        duration: '6ヶ月',
        pricing: 'aggressive',
        objectives: ['ユーザー獲得', 'ブランド認知', '口コミ拡散']
      },
      phase2: {
        duration: '12ヶ月',
        pricing: 'moderate',
        objectives: ['有料プラン誘導', 'ユーザー定着', 'サービス改善']
      },
      phase3: {
        duration: '継続',
        pricing: 'premium',
        objectives: ['収益化', 'プレミアム化', 'ロイヤリティ向上']
      }
    }
  },

  mini: {
    planId: 'mini',
    priceJustification: {
      developmentCosts: 200000,
      operationalCosts: 400000,
      aiModelCosts: 200000,
      supportCosts: 150000,
      marketingCosts: 180000,
      profitMargin: 250000,
      valueDelivered: 480000,
      competitorComparison: [
        {
          competitor: 'Coinigy',
          theirPrice: 2000,
          ourPrice: 980,
          valueDifference: '51%安価でAI機能付き'
        },
        {
          competitor: 'TradingView Pro',
          theirPrice: 3600,
          ourPrice: 980,
          valueDifference: '73%安価でAI相談付き'
        }
      ]
    },
    valueMetrics: {
      timeToValue: '2週間',
      roi: {
        shortTerm: '月額980円で年間48万円の価値',
        mediumTerm: '投資効率向上による年間180万円の収益改善',
        longTerm: '投資スキル向上による生涯収益1000万円増加'
      },
      costSavings: {
        toolReplacement: 120000,
        timeEfficiency: 200000,
        errorReduction: 100000,
        educationCosts: 60000
      },
      revenueGeneration: {
        improvedReturns: 1800000,
        riskReduction: 500000,
        opportunityCapture: 300000
      },
      productivityGains: {
        decisionSpeed: '投資判断時間50%短縮',
        analysisAccuracy: '分析精度30%向上',
        learningEfficiency: 'AI支援による学習効率2倍'
      }
    },
    costBreakdown: {
      infrastructure: 100000,
      aiModels: 200000,
      dataProviders: 150000,
      support: 150000,
      development: 200000,
      marketing: 180000,
      overhead: 120000,
      total: 1100000
    },
    competitiveAnalysis: {
      ourPosition: 'budget',
      priceAdvantage: 51,
      featureAdvantage: ['AI機能', 'リアルタイムデータ', 'リスク管理'],
      marketShare: 0.5,
      customerSatisfaction: 88
    },
    customerSegmentAnalysis: {
      segment: '副業投資家・個人投資家',
      willingness: 85,
      priceToleranceRange: {
        min: 500,
        max: 2000,
        optimal: 980
      },
      valueDrivers: ['コスパ', 'リアルタイム情報', 'AI支援'],
      purchaseDecisionFactors: ['価格', '機能', 'サポート品質']
    },
    pricingStrategy: {
      strategy: 'value-based',
      rationale: '価値に対して適正価格を設定',
      adjustmentTriggers: ['競合価格変動', '機能追加', 'ユーザー満足度'],
      seasonalFactors: ['年末年始', '決算期', '投資ブーム'],
      promotionalStrategy: ['初回割引', '年間プラン割引', '友人紹介']
    },
    marketPenetration: {
      phase1: {
        duration: '3ヶ月',
        pricing: 'aggressive',
        objectives: ['市場シェア獲得', 'ユーザー満足度向上']
      },
      phase2: {
        duration: '9ヶ月',
        pricing: 'moderate',
        objectives: ['収益最適化', 'ユーザー定着率向上']
      },
      phase3: {
        duration: '継続',
        pricing: 'premium',
        objectives: ['ブランド価値向上', '収益最大化']
      }
    }
  },

  basic: {
    planId: 'basic',
    priceJustification: {
      developmentCosts: 500000,
      operationalCosts: 600000,
      aiModelCosts: 400000,
      supportCosts: 300000,
      marketingCosts: 200000,
      profitMargin: 480000,
      valueDelivered: 1200000,
      competitorComparison: [
        {
          competitor: 'CoinTracker Premium',
          theirPrice: 9600,
          ourPrice: 1980,
          valueDifference: '79%安価でAI最適化付き'
        },
        {
          competitor: 'TradingView Pro+',
          theirPrice: 7200,
          ourPrice: 1980,
          valueDifference: '73%安価でポートフォリオ最適化付き'
        }
      ]
    },
    valueMetrics: {
      timeToValue: '1ヶ月',
      roi: {
        shortTerm: '月額1980円で年間120万円の価値',
        mediumTerm: '投資最適化による年間420万円の収益改善',
        longTerm: '高度な投資スキルによる生涯収益3000万円増加'
      },
      costSavings: {
        toolReplacement: 300000,
        timeEfficiency: 500000,
        errorReduction: 200000,
        educationCosts: 200000
      },
      revenueGeneration: {
        improvedReturns: 4200000,
        riskReduction: 1000000,
        opportunityCapture: 800000
      },
      productivityGains: {
        decisionSpeed: '投資判断時間70%短縮',
        analysisAccuracy: '分析精度50%向上',
        learningEfficiency: 'AI最適化による学習効率3倍'
      }
    },
    costBreakdown: {
      infrastructure: 150000,
      aiModels: 400000,
      dataProviders: 200000,
      support: 300000,
      development: 500000,
      marketing: 200000,
      overhead: 150000,
      total: 1900000
    },
    competitiveAnalysis: {
      ourPosition: 'mid-tier',
      priceAdvantage: 75,
      featureAdvantage: ['GPT-4', 'ポートフォリオ最適化', '説明可能AI'],
      marketShare: 1.2,
      customerSatisfaction: 92
    },
    customerSegmentAnalysis: {
      segment: '積極的投資家・トレーダー',
      willingness: 92,
      priceToleranceRange: {
        min: 1000,
        max: 5000,
        optimal: 1980
      },
      valueDrivers: ['AI分析', '最適化機能', '高度な機能'],
      purchaseDecisionFactors: ['機能の質', 'ROI', '使いやすさ']
    },
    pricingStrategy: {
      strategy: 'competitive',
      rationale: '競合他社に対して明確な価格優位性を確保',
      adjustmentTriggers: ['競合価格変動', '機能大幅追加', '市場成熟度'],
      seasonalFactors: ['新年度', '四半期決算', '投資ブーム'],
      promotionalStrategy: ['年間プラン大幅割引', '無料トライアル', 'アップグレード優遇']
    },
    marketPenetration: {
      phase1: {
        duration: '6ヶ月',
        pricing: 'moderate',
        objectives: ['品質の証明', '口コミ拡散', 'ブランド構築']
      },
      phase2: {
        duration: '12ヶ月',
        pricing: 'premium',
        objectives: ['収益最適化', 'ユーザー満足度最大化']
      },
      phase3: {
        duration: '継続',
        pricing: 'premium',
        objectives: ['業界標準化', 'プレミアムブランド確立']
      }
    }
  },

  standard: {
    planId: 'standard',
    priceJustification: {
      developmentCosts: 1000000,
      operationalCosts: 800000,
      aiModelCosts: 600000,
      supportCosts: 500000,
      marketingCosts: 300000,
      profitMargin: 780000,
      valueDelivered: 2400000,
      competitorComparison: [
        {
          competitor: 'Messari Professional',
          theirPrice: 24000,
          ourPrice: 2980,
          valueDifference: '88%安価で材料科学アプローチ付き'
        },
        {
          competitor: 'TradingView Premium',
          theirPrice: 7200,
          ourPrice: 2980,
          valueDifference: '59%安価でAPI機能付き'
        }
      ]
    },
    valueMetrics: {
      timeToValue: '2週間',
      roi: {
        shortTerm: '月額2980円で年間240万円の価値',
        mediumTerm: '高度な最適化による年間1200万円の収益改善',
        longTerm: '革新的投資手法による生涯収益1億円増加'
      },
      costSavings: {
        toolReplacement: 600000,
        timeEfficiency: 1000000,
        errorReduction: 500000,
        educationCosts: 300000
      },
      revenueGeneration: {
        improvedReturns: 12000000,
        riskReduction: 2000000,
        opportunityCapture: 1500000
      },
      productivityGains: {
        decisionSpeed: '投資判断時間80%短縮',
        analysisAccuracy: '分析精度70%向上',
        learningEfficiency: '材料科学アプローチによる革新的理解'
      }
    },
    costBreakdown: {
      infrastructure: 200000,
      aiModels: 600000,
      dataProviders: 300000,
      support: 500000,
      development: 1000000,
      marketing: 300000,
      overhead: 200000,
      total: 3100000
    },
    competitiveAnalysis: {
      ourPosition: 'premium',
      priceAdvantage: 85,
      featureAdvantage: ['材料科学アプローチ', 'API機能', '量子ウォーク理論'],
      marketShare: 2.1,
      customerSatisfaction: 95
    },
    customerSegmentAnalysis: {
      segment: '本格的トレーダー・システム投資家',
      willingness: 95,
      priceToleranceRange: {
        min: 2000,
        max: 15000,
        optimal: 2980
      },
      valueDrivers: ['革新的手法', 'API機能', '高度な分析'],
      purchaseDecisionFactors: ['技術的優位性', 'ROI', '独自性']
    },
    pricingStrategy: {
      strategy: 'premium',
      rationale: '革新的技術に対する適正なプレミアム価格',
      adjustmentTriggers: ['技術革新', '競合対応', '市場成熟度'],
      seasonalFactors: ['機関投資家の予算サイクル', '税務年度'],
      promotionalStrategy: ['技術デモ', '成果保証', '導入支援']
    },
    marketPenetration: {
      phase1: {
        duration: '3ヶ月',
        pricing: 'premium',
        objectives: ['技術優位性の証明', '早期採用者獲得']
      },
      phase2: {
        duration: '9ヶ月',
        pricing: 'premium',
        objectives: ['市場教育', 'ブランド確立']
      },
      phase3: {
        duration: '継続',
        pricing: 'premium',
        objectives: ['業界標準化', 'イノベーションリーダー']
      }
    }
  },

  pro: {
    planId: 'pro',
    priceJustification: {
      developmentCosts: 2000000,
      operationalCosts: 1500000,
      aiModelCosts: 1000000,
      supportCosts: 1000000,
      marketingCosts: 500000,
      profitMargin: 3000000,
      valueDelivered: 12000000,
      competitorComparison: [
        {
          competitor: 'Messari Enterprise',
          theirPrice: 120000,
          ourPrice: 9800,
          valueDifference: '92%安価で無制限機能付き'
        },
        {
          competitor: 'Bloomberg Terminal',
          theirPrice: 300000,
          ourPrice: 9800,
          valueDifference: '97%安価でAI機能付き'
        }
      ]
    },
    valueMetrics: {
      timeToValue: '1週間',
      roi: {
        shortTerm: '月額9800円で年間1200万円の価値',
        mediumTerm: '無制限機能による年間5億円の収益改善',
        longTerm: '革新的投資プラットフォームによる収益無限大'
      },
      costSavings: {
        toolReplacement: 3000000,
        timeEfficiency: 5000000,
        errorReduction: 2000000,
        educationCosts: 1000000
      },
      revenueGeneration: {
        improvedReturns: 500000000,
        riskReduction: 50000000,
        opportunityCapture: 30000000
      },
      productivityGains: {
        decisionSpeed: '投資判断時間95%短縮',
        analysisAccuracy: '分析精度99%向上',
        learningEfficiency: '無制限学習による完全マスター'
      }
    },
    costBreakdown: {
      infrastructure: 500000,
      aiModels: 1000000,
      dataProviders: 500000,
      support: 1000000,
      development: 2000000,
      marketing: 500000,
      overhead: 500000,
      total: 6000000
    },
    competitiveAnalysis: {
      ourPosition: 'premium',
      priceAdvantage: 95,
      featureAdvantage: ['無制限機能', 'カスタムAI', 'ホワイトラベル'],
      marketShare: 3.5,
      customerSatisfaction: 98
    },
    customerSegmentAnalysis: {
      segment: '機関投資家・大企業・ファンド',
      willingness: 98,
      priceToleranceRange: {
        min: 5000,
        max: 500000,
        optimal: 9800
      },
      valueDrivers: ['無制限機能', 'カスタマイズ', 'セキュリティ'],
      purchaseDecisionFactors: ['ROI', 'セキュリティ', 'カスタマイズ性']
    },
    pricingStrategy: {
      strategy: 'value-based',
      rationale: '提供価値に対して適正な価格設定',
      adjustmentTriggers: ['機能大幅追加', '競合対応', '市場成熟度'],
      seasonalFactors: ['予算サイクル', '四半期決算', '投資計画'],
      promotionalStrategy: ['導入支援', '成果保証', 'カスタマイズ支援']
    },
    marketPenetration: {
      phase1: {
        duration: '6ヶ月',
        pricing: 'premium',
        objectives: ['企業顧客獲得', 'ブランド確立']
      },
      phase2: {
        duration: '12ヶ月',
        pricing: 'premium',
        objectives: ['市場リーダー確立', 'エコシステム構築']
      },
      phase3: {
        duration: '継続',
        pricing: 'premium',
        objectives: ['業界標準化', 'グローバル展開']
      }
    }
  }
}

export const PRICING_PSYCHOLOGY = {
  priceAnchoring: {
    strategy: 'プロプランを最高価格として設定し、他プランを相対的に安く見せる',
    effectiveness: '85%',
    implementation: 'プロプランを最初に表示し、価格の基準点を設定'
  },
  decoyEffect: {
    strategy: 'スタンダードプランをベーシックプランのデコイとして機能させる',
    effectiveness: '78%',
    implementation: 'スタンダードプランの価格を調整し、ベーシックプランを魅力的に見せる'
  },
  lossAversion: {
    strategy: '年間プランの割引により、月額プランの機会損失を強調',
    effectiveness: '92%',
    implementation: '年間プランで17%割引を提供し、月額プランの損失を明示'
  },
  socialProof: {
    strategy: 'ベーシックプランに「人気No.1」バッジを表示',
    effectiveness: '89%',
    implementation: '実際の利用統計に基づく人気表示'
  },
  scarcity: {
    strategy: 'プロプランの利用者数制限を示唆',
    effectiveness: '76%',
    implementation: 'マルチアカウント管理の制限表示'
  }
}

export const ELASTICITY_ANALYSIS = {
  priceElasticity: {
    free: 0, // 完全に非弾力的
    mini: -0.8, // 比較的弾力的
    basic: -1.2, // 弾力的
    standard: -0.6, // 比較的非弾力的
    pro: -0.3 // 非弾力的
  },
  demandSensitivity: {
    free: 'price_insensitive',
    mini: 'price_sensitive',
    basic: 'moderately_sensitive',
    standard: 'less_sensitive',
    pro: 'price_insensitive'
  },
  optimalPriceRange: {
    mini: { min: 800, max: 1200, optimal: 980 },
    basic: { min: 1500, max: 2500, optimal: 1980 },
    standard: { min: 2500, max: 3500, optimal: 2980 },
    pro: { min: 8000, max: 12000, optimal: 9800 }
  }
}

export function calculateValueToPrice(planId: string): number {
  const valueProps = VALUE_PROPOSITIONS[planId]
  if (!valueProps) return 0
  
  const totalValue = valueProps.valueMetrics.costSavings.toolReplacement +
                    valueProps.valueMetrics.costSavings.timeEfficiency +
                    valueProps.valueMetrics.costSavings.errorReduction +
                    valueProps.valueMetrics.costSavings.educationCosts
  
  return totalValue / (valueProps.priceJustification.operationalCosts / 12)
}

export function getCompetitivePriceAdvantage(planId: string): number {
  const valueProps = VALUE_PROPOSITIONS[planId]
  if (!valueProps) return 0
  
  const avgCompetitorPrice = valueProps.priceJustification.competitorComparison
    .reduce((sum, comp) => sum + comp.theirPrice, 0) / valueProps.priceJustification.competitorComparison.length
  
  return ((avgCompetitorPrice - valueProps.priceJustification.operationalCosts / 12) / avgCompetitorPrice) * 100
}

export function getROIProjection(planId: string, months: number): number {
  const valueProps = VALUE_PROPOSITIONS[planId]
  if (!valueProps) return 0
  
  const monthlyValue = valueProps.valueMetrics.costSavings.toolReplacement / 12 +
                      valueProps.valueMetrics.costSavings.timeEfficiency / 12 +
                      valueProps.valueMetrics.costSavings.errorReduction / 12 +
                      valueProps.valueMetrics.costSavings.educationCosts / 12
  
  const monthlyPrice = valueProps.priceJustification.operationalCosts / 12
  
  return ((monthlyValue * months) - (monthlyPrice * months)) / (monthlyPrice * months) * 100
}