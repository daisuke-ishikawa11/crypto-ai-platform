// 詳細なプラン説明・機能詳細・ユースケース
export interface PlanDetails {
  id: string
  detailedDescription: string
  targetAudience: string[]
  keyBenefits: string[]
  useCases: PlanUseCase[]
  learningContentAccess: LearningContentAccess
  aiCapabilities: AICapabilities
  technicalSpecs: TechnicalSpecs
  supportDetails: SupportDetails
  successStories: SuccessStory[]
  roi: ROICalculation
  limitations: string[]
  upgradeIncentives: string[]
  securityFeatures: SecurityFeature[]
  complianceFeatures: ComplianceFeature[]
}

export interface PlanUseCase {
  title: string
  description: string
  scenario: string
  expectedOutcome: string
  timeToValue: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
}

export interface LearningContentAccess {
  totalLessons: number
  accessibleCategories: string[]
  restrictedCategories: string[]
  advancedFeatures: string[]
  customizationOptions: string[]
  progressTracking: boolean
  certificateEligible: boolean
  offlineAccess: boolean
  mobileSyncEnabled: boolean
}

export interface AICapabilities {
  models: AIModel[]
  customModelTraining: boolean
  apiAccess: boolean
  batchProcessing: boolean
  realTimeAnalysis: boolean
  predictiveAnalytics: boolean
  explanatoryAI: boolean
  multiLanguageSupport: boolean
  voiceInteraction: boolean
  imageAnalysis: boolean
  documentAnalysis: boolean
  sentimentAnalysis: boolean
  riskAssessment: boolean
  portfolioOptimization: boolean
  marketPrediction: boolean
  technicalIndicators: string[]
}

export interface AIModel {
  name: string
  provider: string
  version: string
  capabilities: string[]
  usageLimit: number | null
  costPerQuery: number
  responseTime: string
  accuracy: number
  specializations: string[]
}

export interface TechnicalSpecs {
  apiRateLimit: number | null
  dataRetention: string
  backupFrequency: string
  uptimeGuarantee: string
  responseTime: string
  maxConcurrentUsers: number
  dataExportFormats: string[]
  integrations: string[]
  webhookSupport: boolean
  ssoSupport: boolean
  mobileAppFeatures: string[]
  webAppFeatures: string[]
}

export interface SupportDetails {
  channels: string[]
  responseTime: string
  availability: string
  languages: string[]
  dedicatedManager: boolean
  onboardingSupport: boolean
  trainingIncluded: boolean
  communityAccess: boolean
  knowledgeBase: boolean
  videoTutorials: boolean
  liveChat: boolean
  phoneSupport: boolean
  emailSupport: boolean
  priorityLevel: number
  escalationProcess: string
}

export interface SuccessStory {
  customerName: string
  industry: string
  challenge: string
  solution: string
  results: {
    roi: string
    timeToValue: string
    keyMetrics: { [key: string]: string }
  }
  testimonial: string
  customerLogo?: string
}

export interface ROICalculation {
  timeToBreakeven: string
  projectedAnnualSavings: number
  efficiencyGains: string
  riskReduction: string
  revenueIncrease: string
  costAvoidance: string
  productivityBoost: string
  complianceSavings: string
}

export interface SecurityFeature {
  feature: string
  description: string
  standards: string[]
  certifications: string[]
}

export interface ComplianceFeature {
  regulation: string
  description: string
  coverage: string
  documentation: string
}

export const PLAN_DETAILS: Record<string, PlanDetails> = {
  free: {
    id: 'free',
    detailedDescription: `
      フリープランは、暗号通貨投資の世界への入り口として設計されています。
      投資初心者から経験者まで、基本的な知識を身につけ、市場の動向を理解するための
      必要最小限の機能を提供します。無料でありながら、プロレベルの学習コンテンツと
      基本的なAI機能を体験できます。
    `,
    targetAudience: [
      '暗号通貨投資の初心者',
      '基本的な投資知識を学びたい方',
      'プラットフォームを試してみたい方',
      '予算を抑えて学習したい学生',
      '投資リテラシーを向上させたい方'
    ],
    keyBenefits: [
      '85レッスン全ての学習コンテンツにアクセス可能',
      '基本的なAI相談機能で投資判断をサポート',
      '市場データの基本分析機能',
      'モバイルアプリで場所を選ばず学習',
      'コミュニティでの情報交換',
      '無期限利用可能（機能制限あり）'
    ],
    useCases: [
      {
        title: '投資初心者の基礎学習',
        description: '投資の基本概念から暗号通貨の仕組みまでを体系的に学習',
        scenario: '投資経験ゼロの会社員が副業投資を始めたいと考えている',
        expectedOutcome: '3ヶ月で基本的な投資知識を習得し、小額投資を開始',
        timeToValue: '2-4週間',
        difficulty: 'beginner',
        tags: ['基礎学習', '初心者', '投資入門']
      },
      {
        title: '市場トレンドの基本理解',
        description: '日々の市場動向と基本的な分析手法を学習',
        scenario: '暗号通貨ニュースが理解できず、投資判断に迷っている',
        expectedOutcome: '市場ニュースを理解し、基本的な投資判断ができるようになる',
        timeToValue: '1-2週間',
        difficulty: 'beginner',
        tags: ['市場分析', 'ニュース理解', 'トレンド']
      },
      {
        title: 'プラットフォーム機能の体験',
        description: '有料プランへのアップグレード前の機能確認',
        scenario: '投資顧問サービスを検討中で、機能を試したい',
        expectedOutcome: 'プラットフォームの価値を理解し、適切なプランを選択',
        timeToValue: '3-7日',
        difficulty: 'intermediate',
        tags: ['機能体験', 'プラン選択', '評価']
      }
    ],
    learningContentAccess: {
      totalLessons: 85,
      accessibleCategories: ['投資基礎・金融リテラシー', '暗号通貨の基礎', 'トレーディング基礎', 'DeFi・NFT入門', '高度な投資戦略'],
      restrictedCategories: [],
      advancedFeatures: [],
      customizationOptions: ['学習ペース設定', 'お気に入り機能'],
      progressTracking: true,
      certificateEligible: false,
      offlineAccess: false,
      mobileSyncEnabled: true
    },
    aiCapabilities: {
      models: [
        {
          name: 'GPT-3.5 Turbo',
          provider: 'OpenAI',
          version: '3.5-turbo',
          capabilities: ['基本的な質問応答', '投資用語説明', '簡単な分析'],
          usageLimit: 5,
          costPerQuery: 0.002,
          responseTime: '2-5秒',
          accuracy: 85,
          specializations: ['投資基礎', '用語解説', '概念説明']
        }
      ],
      customModelTraining: false,
      apiAccess: false,
      batchProcessing: false,
      realTimeAnalysis: false,
      predictiveAnalytics: false,
      explanatoryAI: false,
      multiLanguageSupport: false,
      voiceInteraction: false,
      imageAnalysis: false,
      documentAnalysis: false,
      sentimentAnalysis: false,
      riskAssessment: false,
      portfolioOptimization: false,
      marketPrediction: false,
      technicalIndicators: []
    },
    technicalSpecs: {
      apiRateLimit: null,
      dataRetention: '30日',
      backupFrequency: '週1回',
      uptimeGuarantee: '99.0%',
      responseTime: '< 5秒',
      maxConcurrentUsers: 1,
      dataExportFormats: [],
      integrations: [],
      webhookSupport: false,
      ssoSupport: false,
      mobileAppFeatures: ['基本学習', '進捗確認', '簡単なAI相談'],
      webAppFeatures: ['フル学習コンテンツ', '基本分析', 'コミュニティ']
    },
    supportDetails: {
      channels: ['コミュニティフォーラム', 'FAQ', 'ナレッジベース'],
      responseTime: '48-72時間',
      availability: '営業時間内',
      languages: ['日本語'],
      dedicatedManager: false,
      onboardingSupport: false,
      trainingIncluded: false,
      communityAccess: true,
      knowledgeBase: true,
      videoTutorials: true,
      liveChat: false,
      phoneSupport: false,
      emailSupport: false,
      priorityLevel: 4,
      escalationProcess: 'コミュニティ → FAQ → 有料プラン推奨'
    },
    successStories: [
      {
        customerName: '田中様（仮名）',
        industry: '会社員',
        challenge: '投資知識ゼロから暗号通貨投資を始めたい',
        solution: 'フリープランで3ヶ月間学習し、基礎知識を習得',
        results: {
          roi: '学習コスト0円',
          timeToValue: '2ヶ月',
          keyMetrics: {
            'レッスン完了率': '85%',
            'AI相談利用': '月30回',
            '投資開始までの期間': '3ヶ月'
          }
        },
        testimonial: '完全無料で本格的な投資知識が学べるのは驚きです。基礎をしっかり身につけてから投資を始めることができました。'
      }
    ],
    roi: {
      timeToBreakeven: '即時（無料）',
      projectedAnnualSavings: 120000,
      efficiencyGains: '学習時間の短縮',
      riskReduction: '基礎知識習得による投資リスク軽減',
      revenueIncrease: '投資スキル向上による収益機会の増加',
      costAvoidance: '投資スクール費用の回避',
      productivityBoost: '効率的な学習による時間節約',
      complianceSavings: '規制理解による法的リスク回避'
    },
    limitations: [
      'AI相談回数制限（5回/日）',
      'ポートフォリオ分析制限（1回/日）',
      'リアルタイムデータなし',
      'カスタムインジケーター使用不可',
      'データエクスポート不可',
      'API利用不可',
      'プレミアムサポートなし'
    ],
    upgradeIncentives: [
      'より多くのAI相談が必要な場合はミニプランへ',
      'リアルタイムデータが必要な場合は有料プランへ',
      'ポートフォリオ最適化が必要な場合はベーシックプランへ',
      'プロフェッショナルな分析が必要な場合は上位プランへ'
    ],
    securityFeatures: [
      {
        feature: '基本的なデータ暗号化',
        description: 'ユーザーデータの基本的な暗号化保護',
        standards: ['TLS 1.3', 'AES-256'],
        certifications: []
      },
      {
        feature: '基本認証',
        description: 'メールアドレスとパスワードによる基本認証',
        standards: ['bcrypt', 'JWT'],
        certifications: []
      }
    ],
    complianceFeatures: [
      {
        regulation: '個人情報保護法',
        description: '基本的な個人情報保護対応',
        coverage: '最小限の個人情報の適切な取り扱い',
        documentation: 'プライバシーポリシー'
      }
    ]
  },

  mini: {
    id: 'mini',
    detailedDescription: `
      ミニプランは、本格的な暗号通貨投資を始めたい個人投資家向けの
      エントリーレベルプランです。フリープランの機能を大幅に拡張し、
      リアルタイムデータとリスク管理機能を追加。月々980円という
      手頃な価格で、プロレベルの投資支援を受けることができます。
    `,
    targetAudience: [
      '個人投資家（投資額10-100万円程度）',
      'リアルタイム情報が必要な方',
      'リスク管理を重視する方',
      '副業投資家',
      'セミリタイアを目指す方'
    ],
    keyBenefits: [
      'リアルタイム市場データによる即座の投資判断',
      '高度なリスク管理機能で損失を最小限に抑制',
      'AI相談回数大幅増加（20回/日）',
      'メールサポートによる安心感',
      'Claude 3 Haikuによる多角的な分析',
      '月額980円という圧倒的コストパフォーマンス'
    ],
    useCases: [
      {
        title: '副業投資での資産形成',
        description: '本業の合間にリアルタイム情報を活用した効率的な投資',
        scenario: '会社員が副業で月10万円の投資を行い、資産形成を図る',
        expectedOutcome: '年間15-20%のリターンを目指し、5年で資産倍増',
        timeToValue: '1-2ヶ月',
        difficulty: 'intermediate',
        tags: ['副業投資', '資産形成', 'リアルタイム']
      },
      {
        title: 'リスク管理重視の投資',
        description: '損失を最小限に抑えながら安定的な収益を追求',
        scenario: '退職金を安全に運用したい50代の方',
        expectedOutcome: '年間8-12%の安定リターンと最大ドローダウン15%以下',
        timeToValue: '2-3ヶ月',
        difficulty: 'intermediate',
        tags: ['リスク管理', '安定運用', '退職金運用']
      },
      {
        title: '効率的な学習と実践',
        description: 'AI相談を活用した実践的な投資スキル向上',
        scenario: '投資知識はあるが実践経験が少ない方',
        expectedOutcome: '理論と実践のギャップを埋め、投資スキルを向上',
        timeToValue: '3-4週間',
        difficulty: 'beginner',
        tags: ['スキル向上', '実践', 'AI相談']
      }
    ],
    learningContentAccess: {
      totalLessons: 85,
      accessibleCategories: ['投資基礎・金融リテラシー', '暗号通貨の基礎', 'トレーディング基礎', 'DeFi・NFT入門', '高度な投資戦略'],
      restrictedCategories: [],
      advancedFeatures: ['進捗詳細分析', '学習推奨機能', 'パーソナライズド学習'],
      customizationOptions: ['学習ペース設定', 'お気に入り機能', '通知設定', 'レッスン順序カスタマイズ'],
      progressTracking: true,
      certificateEligible: true,
      offlineAccess: false,
      mobileSyncEnabled: true
    },
    aiCapabilities: {
      models: [
        {
          name: 'GPT-3.5 Turbo',
          provider: 'OpenAI',
          version: '3.5-turbo',
          capabilities: ['質問応答', '投資分析', '市場解説', 'ポートフォリオ提案'],
          usageLimit: 20,
          costPerQuery: 0.002,
          responseTime: '2-5秒',
          accuracy: 85,
          specializations: ['投資分析', '市場動向', 'リスク評価']
        },
        {
          name: 'Claude 3 Haiku',
          provider: 'Anthropic',
          version: '3.0',
          capabilities: ['詳細分析', '多角的視点', '論理的推論', '文書要約'],
          usageLimit: 10,
          costPerQuery: 0.0015,
          responseTime: '1-3秒',
          accuracy: 88,
          specializations: ['複雑な分析', '論理的思考', 'リサーチ']
        }
      ],
      customModelTraining: false,
      apiAccess: false,
      batchProcessing: false,
      realTimeAnalysis: true,
      predictiveAnalytics: false,
      explanatoryAI: false,
      multiLanguageSupport: false,
      voiceInteraction: false,
      imageAnalysis: false,
      documentAnalysis: false,
      sentimentAnalysis: false,
      riskAssessment: true,
      portfolioOptimization: false,
      marketPrediction: false,
      technicalIndicators: ['SMA', 'EMA', 'RSI', 'MACD', 'ボリンジャーバンド']
    },
    technicalSpecs: {
      apiRateLimit: null,
      dataRetention: '90日',
      backupFrequency: '毎日',
      uptimeGuarantee: '99.5%',
      responseTime: '< 3秒',
      maxConcurrentUsers: 2,
      dataExportFormats: [],
      integrations: ['基本的なウォレット連携'],
      webhookSupport: false,
      ssoSupport: false,
      mobileAppFeatures: ['フル学習機能', 'リアルタイムデータ', 'AI相談', 'プッシュ通知'],
      webAppFeatures: ['フル学習コンテンツ', 'リアルタイム分析', 'リスク管理', 'ポートフォリオ表示']
    },
    supportDetails: {
      channels: ['メール', 'コミュニティフォーラム', 'FAQ', 'ナレッジベース'],
      responseTime: '24時間以内',
      availability: '平日 9:00-18:00',
      languages: ['日本語'],
      dedicatedManager: false,
      onboardingSupport: true,
      trainingIncluded: false,
      communityAccess: true,
      knowledgeBase: true,
      videoTutorials: true,
      liveChat: false,
      phoneSupport: false,
      emailSupport: true,
      priorityLevel: 3,
      escalationProcess: 'メール → チケット → 上位プラン推奨'
    },
    successStories: [
      {
        customerName: '佐藤様（仮名）',
        industry: '会社員・副業投資家',
        challenge: '本業の合間に効率的な投資を行いたい',
        solution: 'ミニプランでリアルタイムデータとAI相談を活用',
        results: {
          roi: '月額980円 → 年間収益180万円',
          timeToValue: '2ヶ月',
          keyMetrics: {
            '年間リターン': '18%',
            '最大ドローダウン': '12%',
            '投資効率': '大幅向上'
          }
        },
        testimonial: 'リアルタイムデータのおかげで、相場の変動を逃すことなく投資できています。AI相談も的確で、投資判断に迷うことが減りました。'
      }
    ],
    roi: {
      timeToBreakeven: '2-3ヶ月',
      projectedAnnualSavings: 250000,
      efficiencyGains: '投資判断時間の50%短縮',
      riskReduction: 'リスク管理機能による損失20%削減',
      revenueIncrease: 'リアルタイムデータによる収益機会15%増加',
      costAvoidance: '投資顧問費用の削減',
      productivityBoost: 'AI相談による効率的な投資',
      complianceSavings: '規制対応コストの軽減'
    },
    limitations: [
      'AI相談回数制限（20回/日）',
      'ポートフォリオ分析制限（5回/日）',
      'カスタムインジケーター使用不可',
      'データエクスポート不可',
      'API利用不可',
      'ポートフォリオ最適化機能なし'
    ],
    upgradeIncentives: [
      'より多くのAI相談が必要な場合はベーシックプランへ',
      'ポートフォリオ最適化が必要な場合はベーシックプランへ',
      'カスタムインジケーターが必要な場合はベーシックプランへ',
      'データエクスポートが必要な場合はベーシックプランへ'
    ],
    securityFeatures: [
      {
        feature: '強化されたデータ暗号化',
        description: 'ユーザーデータの高度な暗号化保護',
        standards: ['TLS 1.3', 'AES-256', 'RSA-2048'],
        certifications: []
      },
      {
        feature: '2段階認証',
        description: '2FA対応による強化されたアカウント保護',
        standards: ['TOTP', 'SMS'],
        certifications: []
      }
    ],
    complianceFeatures: [
      {
        regulation: '個人情報保護法',
        description: '個人情報の適切な取り扱いと管理',
        coverage: '個人情報の収集・利用・保管の適切な管理',
        documentation: 'プライバシーポリシー、データ取り扱い規約'
      },
      {
        regulation: '金融商品取引法',
        description: '投資助言に関する基本的な規制対応',
        coverage: '一般的な投資情報の提供',
        documentation: '投資助言の免責事項'
      }
    ]
  },

  basic: {
    id: 'basic',
    detailedDescription: `
      ベーシックプランは、積極的な投資家向けの充実機能を提供する
      人気No.1プランです。ポートフォリオ最適化機能と説明可能AIを搭載し、
      投資判断の根拠を明確に示します。GPT-4 TurboとClaude 3 Sonnetの
      高度なAI機能により、プロレベルの投資分析を実現します。
    `,
    targetAudience: [
      '積極的な個人投資家（投資額100-500万円程度）',
      'ポートフォリオ最適化を求める方',
      'AI投資助言を重視する方',
      '投資効率を最大化したい方',
      'データドリブンな投資を行いたい方'
    ],
    keyBenefits: [
      'GPT-4 TurboとClaude 3 Sonnetによる高度な分析',
      'ポートフォリオ最適化機能で投資効率を最大化',
      '説明可能AIによる透明性の高い投資判断',
      'AI相談回数大幅増加（50回/日）',
      'データエクスポート機能でカスタム分析も可能',
      '優先サポートによる迅速な問題解決'
    ],
    useCases: [
      {
        title: '本格的な資産運用',
        description: 'ポートフォリオ最適化を活用した効率的な資産配分',
        scenario: '500万円の資産を効率的に運用したい投資家',
        expectedOutcome: '年間20-25%のリターンとシャープレシオ1.5以上',
        timeToValue: '1-2ヶ月',
        difficulty: 'intermediate',
        tags: ['資産運用', 'ポートフォリオ最適化', '効率化']
      },
      {
        title: 'データドリブン投資',
        description: '説明可能AIによる論理的な投資判断',
        scenario: '感情に左右されない合理的な投資を行いたい方',
        expectedOutcome: '投資判断の精度向上と感情的な失敗の削減',
        timeToValue: '2-3週間',
        difficulty: 'advanced',
        tags: ['データ分析', '合理的判断', 'AI活用']
      },
      {
        title: 'プロレベル分析',
        description: 'GPT-4とClaude 3 Sonnetによる多角的な市場分析',
        scenario: '機関投資家レベルの分析を個人で行いたい方',
        expectedOutcome: '市場分析の質向上と投資機会の発見',
        timeToValue: '3-4週間',
        difficulty: 'advanced',
        tags: ['プロレベル', '多角的分析', 'AI活用']
      }
    ],
    learningContentAccess: {
      totalLessons: 85,
      accessibleCategories: ['投資基礎・金融リテラシー', '暗号通貨の基礎', 'トレーディング基礎', 'DeFi・NFT入門', '高度な投資戦略'],
      restrictedCategories: [],
      advancedFeatures: ['進捗詳細分析', '学習推奨機能', 'パーソナライズド学習', 'カスタム学習プラン', 'AI学習アシスタント'],
      customizationOptions: ['学習ペース設定', 'お気に入り機能', '通知設定', 'レッスン順序カスタマイズ', 'スキルベース推奨'],
      progressTracking: true,
      certificateEligible: true,
      offlineAccess: true,
      mobileSyncEnabled: true
    },
    aiCapabilities: {
      models: [
        {
          name: 'GPT-4 Turbo',
          provider: 'OpenAI',
          version: '4-turbo',
          capabilities: ['高度な分析', '複雑な質問応答', '戦略立案', 'ポートフォリオ最適化'],
          usageLimit: 50,
          costPerQuery: 0.01,
          responseTime: '3-8秒',
          accuracy: 94,
          specializations: ['複雑な分析', 'マルチモーダル理解', '戦略立案']
        },
        {
          name: 'Claude 3 Sonnet',
          provider: 'Anthropic',
          version: '3.0',
          capabilities: ['論理的推論', '詳細分析', '文書作成', 'リスク評価'],
          usageLimit: 30,
          costPerQuery: 0.008,
          responseTime: '2-6秒',
          accuracy: 92,
          specializations: ['論理的思考', '詳細分析', 'リスク評価']
        }
      ],
      customModelTraining: false,
      apiAccess: false,
      batchProcessing: false,
      realTimeAnalysis: true,
      predictiveAnalytics: true,
      explanatoryAI: true,
      multiLanguageSupport: false,
      voiceInteraction: false,
      imageAnalysis: false,
      documentAnalysis: false,
      sentimentAnalysis: true,
      riskAssessment: true,
      portfolioOptimization: true,
      marketPrediction: true,
      technicalIndicators: ['SMA', 'EMA', 'RSI', 'MACD', 'ボリンジャーバンド', 'フィボナッチ', 'ストキャスティクス', 'ATR']
    },
    technicalSpecs: {
      apiRateLimit: null,
      dataRetention: '180日',
      backupFrequency: '毎日',
      uptimeGuarantee: '99.8%',
      responseTime: '< 2秒',
      maxConcurrentUsers: 3,
      dataExportFormats: ['CSV', 'JSON', 'PDF'],
      integrations: ['主要ウォレット連携', 'MetaMask', 'TradingView'],
      webhookSupport: false,
      ssoSupport: false,
      mobileAppFeatures: ['フル学習機能', 'リアルタイムデータ', 'AI相談', 'ポートフォリオ最適化', 'プッシュ通知'],
      webAppFeatures: ['フル学習コンテンツ', 'ポートフォリオ最適化', '説明可能AI', 'データエクスポート', 'カスタムダッシュボード']
    },
    supportDetails: {
      channels: ['メール', 'ライブチャット', 'コミュニティフォーラム', 'FAQ', 'ナレッジベース'],
      responseTime: '12時間以内',
      availability: '平日 9:00-21:00',
      languages: ['日本語', '英語（基本）'],
      dedicatedManager: false,
      onboardingSupport: true,
      trainingIncluded: true,
      communityAccess: true,
      knowledgeBase: true,
      videoTutorials: true,
      liveChat: true,
      phoneSupport: false,
      emailSupport: true,
      priorityLevel: 2,
      escalationProcess: 'ライブチャット → メール → 技術サポート'
    },
    successStories: [
      {
        customerName: '山田様（仮名）',
        industry: '個人投資家',
        challenge: '感情的な投資判断による損失を改善したい',
        solution: 'ベーシックプランの説明可能AIとポートフォリオ最適化を活用',
        results: {
          roi: '月額1980円 → 年間収益420万円',
          timeToValue: '1.5ヶ月',
          keyMetrics: {
            '年間リターン': '24%',
            'シャープレシオ': '1.6',
            '最大ドローダウン': '8%'
          }
        },
        testimonial: '説明可能AIのおかげで、投資判断の根拠が明確になりました。感情に左右されることなく、合理的な投資ができるようになりました。'
      }
    ],
    roi: {
      timeToBreakeven: '1-2ヶ月',
      projectedAnnualSavings: 580000,
      efficiencyGains: '投資判断時間の70%短縮',
      riskReduction: 'ポートフォリオ最適化による損失30%削減',
      revenueIncrease: 'AI分析による収益機会25%増加',
      costAvoidance: '投資顧問・分析ツール費用の削減',
      productivityBoost: 'AIアシスタントによる効率化',
      complianceSavings: '規制対応の自動化'
    },
    limitations: [
      'AI相談回数制限（50回/日）',
      'ポートフォリオ分析制限（10回/日）',
      'API利用不可',
      '高度なカスタマイゼーション制限',
      'ホワイトラベル機能なし'
    ],
    upgradeIncentives: [
      'より多くのAI相談が必要な場合はスタンダードプランへ',
      'API利用が必要な場合はスタンダードプランへ',
      'カスタムインジケーターが必要な場合はスタンダードプランへ',
      '材料科学アプローチが必要な場合はスタンダードプランへ'
    ],
    securityFeatures: [
      {
        feature: 'エンタープライズ級暗号化',
        description: 'エンタープライズレベルのデータ保護',
        standards: ['TLS 1.3', 'AES-256', 'RSA-4096'],
        certifications: ['ISO 27001 準拠']
      },
      {
        feature: '多要素認証',
        description: '2FA/MFA対応による強化されたセキュリティ',
        standards: ['TOTP', 'SMS', 'Email'],
        certifications: []
      },
      {
        feature: 'セキュリティログ',
        description: '詳細なアクセスログと異常検知',
        standards: ['SIEM連携', 'リアルタイム監視'],
        certifications: []
      }
    ],
    complianceFeatures: [
      {
        regulation: '個人情報保護法',
        description: '厳格な個人情報管理と保護',
        coverage: '包括的な個人情報保護と管理',
        documentation: 'プライバシーポリシー、データ管理規約'
      },
      {
        regulation: '金融商品取引法',
        description: '投資助言業務に関する規制対応',
        coverage: '投資助言の適切な提供と免責',
        documentation: '投資助言業務規約'
      },
      {
        regulation: 'GDPR準拠',
        description: 'EU一般データ保護規則への対応',
        coverage: 'データ処理の透明性とユーザー権利の保護',
        documentation: 'GDPR対応文書'
      }
    ]
  },

  standard: {
    id: 'standard',
    detailedDescription: `
      スタンダードプランは、本格的なトレーダー向けの高度機能を提供する
      プロフェッショナルプランです。独自の材料科学アプローチと量子ウォーク理論を
      活用したポートフォリオ最適化により、従来の投資手法を超越した
      革新的な投資戦略を実現します。API アクセスも提供し、
      自動化された投資戦略の構築が可能です。
    `,
    targetAudience: [
      '本格的なトレーダー（投資額500-2000万円程度）',
      'API を活用した自動化投資を行いたい方',
      '材料科学アプローチに興味のある方',
      '量子ウォーク理論を活用したい方',
      'プロフェッショナルな投資環境を求める方'
    ],
    keyBenefits: [
      '材料科学アプローチによる革新的なポートフォリオ最適化',
      '量子ウォーク理論を活用した高度な分析',
      'API アクセスによる投資の自動化',
      'カスタムインジケーターでオリジナル分析',
      'プレミアムサポートによる専門的なサポート',
      'Claude 3 Opusによる最高レベルの分析'
    ],
    useCases: [
      {
        title: '材料科学アプローチでの投資',
        description: '相構造分析と材料科学の概念を投資に応用',
        scenario: '1000万円の資産を科学的アプローチで運用したい投資家',
        expectedOutcome: '年間25-30%のリターンとボラティリティの最小化',
        timeToValue: '2-3ヶ月',
        difficulty: 'advanced',
        tags: ['材料科学', '科学的アプローチ', '高度分析']
      },
      {
        title: 'API を活用した自動化投資',
        description: 'プログラムによる自動化された投資戦略',
        scenario: 'システムトレーダーが自動売買システムを構築',
        expectedOutcome: '24時間稼働の自動化投資システムの構築',
        timeToValue: '1-2ヶ月',
        difficulty: 'advanced',
        tags: ['API活用', '自動化', 'システムトレード']
      },
      {
        title: '量子ウォーク理論による分析',
        description: '量子力学の概念を活用した市場分析',
        scenario: '理論物理学の知識を投資に活用したい方',
        expectedOutcome: '従来手法では発見できない投資機会の発見',
        timeToValue: '3-4ヶ月',
        difficulty: 'advanced',
        tags: ['量子理論', '理論物理学', '革新的分析']
      }
    ],
    learningContentAccess: {
      totalLessons: 85,
      accessibleCategories: ['投資基礎・金融リテラシー', '暗号通貨の基礎', 'トレーディング基礎', 'DeFi・NFT入門', '高度な投資戦略'],
      restrictedCategories: [],
      advancedFeatures: ['進捗詳細分析', '学習推奨機能', 'パーソナライズド学習', 'カスタム学習プラン', 'AI学習アシスタント', '材料科学特別コンテンツ'],
      customizationOptions: ['学習ペース設定', 'お気に入り機能', '通知設定', 'レッスン順序カスタマイズ', 'スキルベース推奨', 'カスタムコンテンツ'],
      progressTracking: true,
      certificateEligible: true,
      offlineAccess: true,
      mobileSyncEnabled: true
    },
    aiCapabilities: {
      models: [
        {
          name: 'GPT-4 Turbo',
          provider: 'OpenAI',
          version: '4-turbo',
          capabilities: ['高度な分析', '複雑な質問応答', '戦略立案', 'ポートフォリオ最適化', 'API連携'],
          usageLimit: 200,
          costPerQuery: 0.01,
          responseTime: '3-8秒',
          accuracy: 94,
          specializations: ['複雑な分析', 'マルチモーダル理解', '戦略立案']
        },
        {
          name: 'Claude 3 Opus',
          provider: 'Anthropic',
          version: '3.0',
          capabilities: ['最高レベル分析', '論理的推論', '文書作成', 'リスク評価', '材料科学応用'],
          usageLimit: 100,
          costPerQuery: 0.015,
          responseTime: '3-10秒',
          accuracy: 96,
          specializations: ['最高レベル分析', '材料科学応用', '量子理論']
        },
        {
          name: 'カスタムモデル',
          provider: '自社開発',
          version: '1.0',
          capabilities: ['材料科学最適化', '量子ウォーク分析', '相構造分析'],
          usageLimit: 50,
          costPerQuery: 0.02,
          responseTime: '5-15秒',
          accuracy: 98,
          specializations: ['材料科学', '量子理論', '相構造分析']
        }
      ],
      customModelTraining: false,
      apiAccess: true,
      batchProcessing: true,
      realTimeAnalysis: true,
      predictiveAnalytics: true,
      explanatoryAI: true,
      multiLanguageSupport: true,
      voiceInteraction: false,
      imageAnalysis: false,
      documentAnalysis: true,
      sentimentAnalysis: true,
      riskAssessment: true,
      portfolioOptimization: true,
      marketPrediction: true,
      technicalIndicators: ['全標準指標', 'カスタムインジケーター', '材料科学指標', '量子ウォーク指標']
    },
    technicalSpecs: {
      apiRateLimit: 10000,
      dataRetention: '365日',
      backupFrequency: '毎日（冗長化）',
      uptimeGuarantee: '99.9%',
      responseTime: '< 1秒',
      maxConcurrentUsers: 5,
      dataExportFormats: ['CSV', 'JSON', 'PDF', 'Excel', 'API'],
      integrations: ['全ウォレット連携', 'MetaMask', 'TradingView', 'API連携', 'Webhook'],
      webhookSupport: true,
      ssoSupport: true,
      mobileAppFeatures: ['フル機能', 'API連携', 'カスタムインジケーター', 'リアルタイム分析'],
      webAppFeatures: ['フル機能', 'API管理', 'カスタムダッシュボード', '材料科学分析', '量子ウォーク分析']
    },
    supportDetails: {
      channels: ['メール', 'ライブチャット', '電話', 'コミュニティフォーラム', 'FAQ', 'ナレッジベース'],
      responseTime: '4時間以内',
      availability: '平日 9:00-21:00、土日祝 10:00-18:00',
      languages: ['日本語', '英語'],
      dedicatedManager: false,
      onboardingSupport: true,
      trainingIncluded: true,
      communityAccess: true,
      knowledgeBase: true,
      videoTutorials: true,
      liveChat: true,
      phoneSupport: true,
      emailSupport: true,
      priorityLevel: 1,
      escalationProcess: 'ライブチャット → 電話 → 技術サポート → 開発チーム'
    },
    successStories: [
      {
        customerName: '鈴木様（仮名）',
        industry: '専業トレーダー',
        challenge: '従来の投資手法では限界を感じていた',
        solution: '材料科学アプローチとAPI活用による自動化投資',
        results: {
          roi: '月額2980円 → 年間収益1200万円',
          timeToValue: '2ヶ月',
          keyMetrics: {
            '年間リターン': '32%',
            'シャープレシオ': '2.1',
            '最大ドローダウン': '5%'
          }
        },
        testimonial: '材料科学アプローチは目からウロコでした。相構造分析により、市場の構造変化を早期に発見できるようになりました。'
      }
    ],
    roi: {
      timeToBreakeven: '1ヶ月',
      projectedAnnualSavings: 1200000,
      efficiencyGains: '投資判断時間の80%短縮',
      riskReduction: '材料科学アプローチによる損失50%削減',
      revenueIncrease: 'API自動化による収益機会40%増加',
      costAvoidance: '高額な投資ツール・サービス費用の削減',
      productivityBoost: 'API自動化による24時間稼働',
      complianceSavings: '規制対応の完全自動化'
    },
    limitations: [
      'AI相談回数制限（200回/日）',
      'ポートフォリオ分析制限（50回/日）',
      'API利用制限（10,000回/日）',
      'ホワイトラベル機能なし',
      'マルチアカウント管理制限'
    ],
    upgradeIncentives: [
      '無制限利用が必要な場合はプロプランへ',
      'ホワイトラベル機能が必要な場合はプロプランへ',
      'マルチアカウント管理が必要な場合はプロプランへ',
      'カスタムAIモデルが必要な場合はプロプランへ'
    ],
    securityFeatures: [
      {
        feature: '金融機関レベルのセキュリティ',
        description: '銀行レベルのセキュリティ対策',
        standards: ['TLS 1.3', 'AES-256', 'RSA-4096', 'FIDO2'],
        certifications: ['ISO 27001', 'SOC 2 Type II']
      },
      {
        feature: '高度な認証システム',
        description: '生体認証を含む多要素認証',
        standards: ['TOTP', 'SMS', 'Email', 'Biometric'],
        certifications: ['FIDO Alliance']
      },
      {
        feature: 'リアルタイム脅威検知',
        description: '24時間体制の脅威監視',
        standards: ['AI異常検知', 'リアルタイム監視', 'インシデント対応'],
        certifications: []
      }
    ],
    complianceFeatures: [
      {
        regulation: '個人情報保護法',
        description: '最高レベルの個人情報保護',
        coverage: '完全な個人情報保護と管理',
        documentation: '包括的プライバシーポリシー'
      },
      {
        regulation: '金融商品取引法',
        description: '投資助言業務の完全規制対応',
        coverage: '投資助言業務の適切な提供',
        documentation: '投資助言業務規約、リスク説明書'
      },
      {
        regulation: 'GDPR完全準拠',
        description: 'EU一般データ保護規則への完全対応',
        coverage: 'データ処理の完全な透明性',
        documentation: 'GDPR完全対応文書'
      },
      {
        regulation: 'PCI DSS',
        description: 'カード業界データセキュリティ標準',
        coverage: '決済データの完全保護',
        documentation: 'PCI DSS準拠証明書'
      }
    ]
  },

  pro: {
    id: 'pro',
    detailedDescription: `
      プロプランは、プロフェッショナル・機関投資家向けの最高峰プランです。
      すべての機能が無制限で利用でき、カスタムAIモデルのトレーニングと
      ホワイトラベル機能を提供します。専任サポートチームが24時間体制で
      サポートし、完全にカスタマイズされた投資環境を構築できます。
      企業レベルのセキュリティと法的コンプライアンスを完全に満たします。
    `,
    targetAudience: [
      '機関投資家・ファンド',
      '企業の財務部門',
      '投資助言業者',
      '大口個人投資家（投資額2000万円以上）',
      'フィンテック企業',
      'ホワイトラベル利用希望者'
    ],
    keyBenefits: [
      '全機能無制限利用で投資の可能性を最大化',
      'カスタムAIモデルによる独自の投資戦略',
      'ホワイトラベル機能で自社ブランドとして展開',
      'マルチアカウント管理でチーム運用',
      '24時間専任サポートで完全サポート',
      'エンタープライズレベルのセキュリティ'
    ],
    useCases: [
      {
        title: '機関投資家の本格運用',
        description: '数億円規模の資産を効率的に運用',
        scenario: '投資ファンドが顧客資産を最適化したい',
        expectedOutcome: '年間30-40%のリターンとリスクの最小化',
        timeToValue: '1-2ヶ月',
        difficulty: 'advanced',
        tags: ['機関投資家', '大規模運用', '最適化']
      },
      {
        title: 'フィンテック企業の投資プラットフォーム',
        description: 'ホワイトラベル機能で自社サービスを構築',
        scenario: 'フィンテック企業が投資助言サービスを提供',
        expectedOutcome: '独自ブランドでの投資サービス展開',
        timeToValue: '2-3ヶ月',
        difficulty: 'advanced',
        tags: ['ホワイトラベル', 'フィンテック', 'サービス展開']
      },
      {
        title: '企業財務部門の資産管理',
        description: '企業の余剰資金を効率的に運用',
        scenario: '上場企業が余剰資金を最適化したい',
        expectedOutcome: '企業価値の向上と株主価値の最大化',
        timeToValue: '1-2ヶ月',
        difficulty: 'advanced',
        tags: ['企業財務', '資金運用', '価値最大化']
      }
    ],
    learningContentAccess: {
      totalLessons: 85,
      accessibleCategories: ['投資基礎・金融リテラシー', '暗号通貨の基礎', 'トレーディング基礎', 'DeFi・NFT入門', '高度な投資戦略'],
      restrictedCategories: [],
      advancedFeatures: ['全機能無制限', 'カスタムコンテンツ', 'AI学習アシスタント', '材料科学特別コンテンツ', 'プロ向け特別コンテンツ'],
      customizationOptions: ['完全カスタマイズ', 'カスタムUIテーマ', 'ブランドカスタマイズ', '機能カスタマイズ'],
      progressTracking: true,
      certificateEligible: true,
      offlineAccess: true,
      mobileSyncEnabled: true
    },
    aiCapabilities: {
      models: [
        {
          name: '全AIモデル',
          provider: '複数プロバイダー',
          version: '最新版',
          capabilities: ['あらゆる分析', '戦略立案', '予測', '最適化', 'カスタマイズ'],
          usageLimit: null,
          costPerQuery: 0,
          responseTime: '< 1秒',
          accuracy: 99,
          specializations: ['全領域']
        },
        {
          name: 'カスタムモデル',
          provider: '自社開発',
          version: 'カスタム',
          capabilities: ['独自分析', '特殊最適化', '企業固有分析'],
          usageLimit: null,
          costPerQuery: 0,
          responseTime: '< 1秒',
          accuracy: 99,
          specializations: ['カスタム分析']
        },
        {
          name: 'ファインチューニング',
          provider: '自社開発',
          version: 'カスタム',
          capabilities: ['専用学習', '特化分析', '企業データ学習'],
          usageLimit: null,
          costPerQuery: 0,
          responseTime: '< 1秒',
          accuracy: 99,
          specializations: ['企業特化']
        }
      ],
      customModelTraining: true,
      apiAccess: true,
      batchProcessing: true,
      realTimeAnalysis: true,
      predictiveAnalytics: true,
      explanatoryAI: true,
      multiLanguageSupport: true,
      voiceInteraction: true,
      imageAnalysis: true,
      documentAnalysis: true,
      sentimentAnalysis: true,
      riskAssessment: true,
      portfolioOptimization: true,
      marketPrediction: true,
      technicalIndicators: ['無制限', '全カスタム指標']
    },
    technicalSpecs: {
      apiRateLimit: null,
      dataRetention: '無制限',
      backupFrequency: 'リアルタイム',
      uptimeGuarantee: '99.99%',
      responseTime: '< 0.5秒',
      maxConcurrentUsers: 10,
      dataExportFormats: ['全形式', 'カスタム形式'],
      integrations: ['全ての連携', 'カスタム連携'],
      webhookSupport: true,
      ssoSupport: true,
      mobileAppFeatures: ['無制限機能', 'カスタム機能'],
      webAppFeatures: ['無制限機能', 'ホワイトラベル', 'カスタムUI']
    },
    supportDetails: {
      channels: ['専任サポート', 'メール', 'ライブチャット', '電話', 'ビデオ通話', 'オンサイト'],
      responseTime: '1時間以内',
      availability: '24時間365日',
      languages: ['日本語', '英語', '中国語', '韓国語'],
      dedicatedManager: true,
      onboardingSupport: true,
      trainingIncluded: true,
      communityAccess: true,
      knowledgeBase: true,
      videoTutorials: true,
      liveChat: true,
      phoneSupport: true,
      emailSupport: true,
      priorityLevel: 0,
      escalationProcess: '専任サポート → CTO → CEO'
    },
    successStories: [
      {
        customerName: 'A投資ファンド（仮名）',
        industry: '投資ファンド',
        challenge: '大規模資産の効率的な運用と顧客満足度の向上',
        solution: 'プロプランによる無制限機能とカスタムAIモデル',
        results: {
          roi: '月額9800円 → 年間収益5億円',
          timeToValue: '1ヶ月',
          keyMetrics: {
            '年間リターン': '38%',
            'シャープレシオ': '2.5',
            '顧客満足度': '95%'
          }
        },
        testimonial: '無制限の機能とカスタムAIモデルにより、競合他社にない独自の価値を顧客に提供できています。ROIは想像を超えていました。'
      },
      {
        customerName: 'B フィンテック企業（仮名）',
        industry: 'フィンテック',
        challenge: '独自の投資助言サービスを短期間で立ち上げたい',
        solution: 'ホワイトラベル機能による自社ブランドでのサービス展開',
        results: {
          roi: '月額9800円 → 年間収益2億円',
          timeToValue: '2ヶ月',
          keyMetrics: {
            'サービス立ち上げ期間': '2ヶ月',
            '顧客獲得数': '10,000人',
            '月間収益': '1,500万円'
          }
        },
        testimonial: 'ホワイトラベル機能により、自社開発では数年かかる機能を2ヶ月で展開できました。投資対効果は圧倒的です。'
      }
    ],
    roi: {
      timeToBreakeven: '1ヶ月以内',
      projectedAnnualSavings: 50000000,
      efficiencyGains: '投資判断時間の95%短縮',
      riskReduction: 'カスタムAIによる損失80%削減',
      revenueIncrease: '無制限機能による収益機会200%増加',
      costAvoidance: '開発コスト・ライセンス費用の完全削減',
      productivityBoost: 'AI自動化による生産性10倍向上',
      complianceSavings: 'コンプライアンス対応の完全自動化'
    },
    limitations: [],
    upgradeIncentives: [],
    securityFeatures: [
      {
        feature: '最高峰のセキュリティ',
        description: '軍事レベルのセキュリティ対策',
        standards: ['TLS 1.3', 'AES-256', 'RSA-4096', 'FIDO2', 'Quantum-Safe'],
        certifications: ['ISO 27001', 'SOC 2 Type II', 'FedRAMP', 'Common Criteria']
      },
      {
        feature: '完全な認証システム',
        description: '全ての認証方式に対応',
        standards: ['TOTP', 'SMS', 'Email', 'Biometric', 'Hardware Token'],
        certifications: ['FIDO Alliance', 'W3C WebAuthn']
      },
      {
        feature: '24時間セキュリティ監視',
        description: '専門チームによる24時間監視',
        standards: ['AI異常検知', 'リアルタイム監視', '即時対応'],
        certifications: ['SOC 2 Type II']
      }
    ],
    complianceFeatures: [
      {
        regulation: '全ての規制対応',
        description: '国内外の全ての規制に対応',
        coverage: '完全なコンプライアンス対応',
        documentation: '包括的コンプライアンス文書'
      },
      {
        regulation: '金融機関レベルのコンプライアンス',
        description: '銀行レベルのコンプライアンス',
        coverage: '金融機関基準の完全準拠',
        documentation: '金融機関向けコンプライアンス文書'
      },
      {
        regulation: '国際基準準拠',
        description: 'ISO、SOC、FedRAMP等の国際基準',
        coverage: '全ての国際基準への準拠',
        documentation: '国際基準準拠証明書'
      }
    ]
  }
}

export function getPlanDetails(planId: string): PlanDetails | null {
  return PLAN_DETAILS[planId] || null
}

export function getAllPlanDetails(): PlanDetails[] {
  return Object.values(PLAN_DETAILS)
}

export function getPlanUseCases(planId: string): PlanUseCase[] {
  const planDetails = getPlanDetails(planId)
  return planDetails?.useCases || []
}

export function getPlanSuccessStories(planId: string): SuccessStory[] {
  const planDetails = getPlanDetails(planId)
  return planDetails?.successStories || []
}

export function getPlanROI(planId: string): ROICalculation | null {
  const planDetails = getPlanDetails(planId)
  return planDetails?.roi || null
}

export function getPlanSecurityFeatures(planId: string): SecurityFeature[] {
  const planDetails = getPlanDetails(planId)
  return planDetails?.securityFeatures || []
}

export function getPlanComplianceFeatures(planId: string): ComplianceFeature[] {
  const planDetails = getPlanDetails(planId)
  return planDetails?.complianceFeatures || []
}