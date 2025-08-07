// Mock AI Service for development
export interface AIAnalysisResult {
  summary: string;
  recommendations: string[];
  risk_level: 'low' | 'medium' | 'high';
  confidence: number;
  reasoning: string;
  timestamp: string;
}

export interface MarketAnalysis {
  overall_sentiment: 'bullish' | 'bearish' | 'neutral';
  key_insights: string[];
  price_prediction: {
    target_price: number;
    timeframe: string;
    confidence: number;
  };
  risk_factors: string[];
  opportunities: string[];
  technical_indicators: {
    rsi: number;
    moving_averages: {
      ma20: number;
      ma50: number;
      ma200: number;
    };
    trend: 'upward' | 'downward' | 'sideways';
  };
}

export interface PortfolioOptimization {
  current_allocation: Record<string, number>;
  recommended_allocation: Record<string, number>;
  expected_return: number;
  risk_score: number;
  sharpe_ratio: number;
  rebalancing_actions: Array<{
    action: 'buy' | 'sell' | 'hold';
    asset: string;
    amount: number;
    reason: string;
  }>;
}

export interface ChatResponse {
  message: string;
  type: 'text' | 'analysis' | 'recommendation';
  data?: any;
  timestamp: string;
}

// Mock responses database
const mockAnalysisResponses: Record<string, AIAnalysisResult> = {
  'BTC': {
    summary: 'ビットコインは現在強気のトレンドにあり、機関投資家からの流入が継続しています。テクニカル指標も上昇を示唆しており、短期的には更なる上昇が期待されます。',
    recommendations: [
      '現在の価格帯でのエントリーを推奨',
      'ストップロスを38,000ドルに設定',
      'テイクプロフィットを52,000ドルに設定',
      'ポートフォリオの20-30%をBTCに配分'
    ],
    risk_level: 'medium',
    confidence: 0.78,
    reasoning: 'オンチェーン指標、テクニカル分析、マクロ経済要因を総合的に分析した結果、上昇トレンドの継続確率が高いと判断しました。',
    timestamp: new Date().toISOString()
  },
  'ETH': {
    summary: 'イーサリアムは次期アップデートへの期待とDeFi市場の拡大により、ビットコインを上回るパフォーマンスを示しています。2.0への移行完了により、ステーキング需要も増加中です。',
    recommendations: [
      'DeFiエコシステムの成長に注目し、長期保有を推奨',
      'ステーキングによる収益機会を検討',
      'レイヤー2ソリューション関連銘柄との組み合わせを検討',
      'ポートフォリオの15-25%をETHに配分'
    ],
    risk_level: 'medium',
    confidence: 0.82,
    reasoning: 'イーサリアムエコシステムの技術的進歩とDeFi市場の拡大が価格を支えており、中長期的な成長が期待されます。',
    timestamp: new Date().toISOString()
  }
};

const mockChatResponses = [
  {
    question: 'ビットコインの今後の見通し',
    response: '現在のビットコインは複数の強気要因に支えられています。機関投資家の継続的な流入、ETF承認への期待、そして供給の半減サイクルの影響により、中長期的には上昇トレンドが続く可能性が高いです。ただし、短期的には調整も予想されるため、段階的な投資戦略をお勧めします。'
  },
  {
    question: 'DeFiの将来性',
    response: 'DeFi（分散型金融）は金融業界の革新的な技術として急速に成長しています。現在のTVL（Total Value Locked）は750億ドルを超えており、従来の金融サービスをより効率的で透明性の高い形で提供しています。特にイールドファーミング、AMM、レンディングプロトコルは今後も成長が期待されます。'
  },
  {
    question: 'リスク管理の方法',
    response: '暗号通貨投資におけるリスク管理は極めて重要です。推奨される方法として：1）ポートフォリオの分散化（複数の資産に投資）、2）ポジションサイジング（総資産の5-10%以内）、3）ストップロス設定、4）定期的なリバランシング、5）感情的な判断を避ける、などがあります。'
  }
];

export class MockAIService {
  /**
   * Get AI analysis for a specific cryptocurrency
   */
  static async getCryptoAnalysis(symbol: string): Promise<AIAnalysisResult> {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const analysis = mockAnalysisResponses[symbol];
    if (analysis) {
      return {
        ...analysis,
        timestamp: new Date().toISOString()
      };
    }
    
    // Generate generic analysis for unknown symbols
    return {
      summary: `${symbol}の現在の市場状況を分析中です。技術的指標とファンダメンタル分析を基に、投資判断をサポートします。`,
      recommendations: [
        '市場トレンドの詳細分析が必要',
        'ファンダメンタル要因の確認を推奨',
        'ポートフォリオ内での適切な比重を検討',
        'リスク管理策の実装'
      ],
      risk_level: 'medium',
      confidence: 0.65,
      reasoning: '限られた情報に基づく初期分析です。より詳細な調査をお勧めします。',
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Get comprehensive market analysis
   */
  static async getMarketAnalysis(): Promise<MarketAnalysis> {
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2500));
    
    return {
      overall_sentiment: 'bullish',
      key_insights: [
        '機関投資家の暗号通貨への資金流入が加速',
        'DeFi市場のTVLが過去最高を更新',
        'レイヤー2ソリューションの普及が進行',
        '規制環境の明確化により市場の安定性が向上',
        'ESG要件を満たすプルーフオブステーク移行が進む'
      ],
      price_prediction: {
        target_price: 52000,
        timeframe: '3ヶ月',
        confidence: 0.75
      },
      risk_factors: [
        'マクロ経済の不確実性',
        '規制変更のリスク',
        '技術的なスケーラビリティ問題',
        '市場操作の可能性'
      ],
      opportunities: [
        'DeFiプロトコルへの参加',
        'NFTマーケットの成長',
        'Web3インフラの発展',
        'クロスチェーン技術の普及'
      ],
      technical_indicators: {
        rsi: 68.5,
        moving_averages: {
          ma20: 43850,
          ma50: 41200,
          ma200: 38750
        },
        trend: 'upward'
      }
    };
  }

  /**
   * Get portfolio optimization recommendations
   */
  static async getPortfolioOptimization(
    currentHoldings: Record<string, number>
  ): Promise<PortfolioOptimization> {
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
    
    const totalValue = Object.values(currentHoldings).reduce((sum, value) => sum + value, 0);
    const currentAllocation: Record<string, number> = {};
    
    // Calculate current allocation percentages
    Object.entries(currentHoldings).forEach(([asset, value]) => {
      currentAllocation[asset] = (value / totalValue) * 100;
    });
    
    // Recommend optimal allocation
    const recommendedAllocation = {
      'BTC': 35,
      'ETH': 25,
      'SOL': 15,
      'ADA': 10,
      'DOT': 8,
      'LINK': 7
    };
    
    // Generate rebalancing actions
    const rebalancingActions = Object.entries(recommendedAllocation).map(([asset, targetPercent]) => {
      const currentPercent = currentAllocation[asset] || 0;
      const difference = targetPercent - currentPercent;
      
      if (Math.abs(difference) < 2) {
        return {
          action: 'hold' as const,
          asset,
          amount: 0,
          reason: '現在の配分が最適範囲内です'
        };
      } else if (difference > 0) {
        return {
          action: 'buy' as const,
          asset,
          amount: (difference / 100) * totalValue,
          reason: `ポートフォリオバランス改善のため${asset}の比重を増やすことを推奨`
        };
      } else {
        return {
          action: 'sell' as const,
          asset,
          amount: Math.abs(difference / 100) * totalValue,
          reason: `リスク分散のため${asset}の比重を減らすことを推奨`
        };
      }
    });
    
    return {
      current_allocation: currentAllocation,
      recommended_allocation: recommendedAllocation,
      expected_return: 24.5,
      risk_score: 6.2,
      sharpe_ratio: 1.35,
      rebalancing_actions: rebalancingActions
    };
  }

  /**
   * Chat with AI assistant
   */
  static async chat(message: string, context?: any): Promise<ChatResponse> {
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1500));
    
    const lowerMessage = message.toLowerCase();
    
    // Find relevant response
    const relevantResponse = mockChatResponses.find(item => 
      lowerMessage.includes(item.question.toLowerCase().split('').slice(0, 3).join('')) ||
      item.question.toLowerCase().includes(lowerMessage.split(' ')[0])
    );
    
    if (relevantResponse) {
      return {
        message: relevantResponse.response,
        type: 'text',
        timestamp: new Date().toISOString()
      };
    }
    
    // Generate contextual response
    if (lowerMessage.includes('価格') || lowerMessage.includes('予想')) {
      return {
        message: '価格予想には多くの要因が関わります。市場のファンダメンタル分析、テクニカル指標、マクロ経済要因を総合的に考慮する必要があります。現在の市場状況を詳しく分析し、リスクを考慮した投資戦略をご提案いたします。具体的な銘柄についてお聞かせください。',
        type: 'recommendation',
        timestamp: new Date().toISOString()
      };
    }
    
    if (lowerMessage.includes('投資') || lowerMessage.includes('買い')) {
      return {
        message: '投資判断をサポートいたします。まず、あなたの投資目標、リスク許容度、投資期間をお聞かせください。これらの情報を基に、最適なポートフォリオ戦略をご提案いたします。また、分散投資とリスク管理の重要性もお伝えします。',
        type: 'recommendation',
        timestamp: new Date().toISOString()
      };
    }
    
    // Default response
    return {
      message: 'ご質問ありがとうございます。暗号通貨投資に関するあらゆるご質問にお答えします。市場分析、投資戦略、リスク管理、技術的な質問など、お気軽にお聞かせください。より具体的なアドバイスのため、詳細な情報をお教えいただけると幸いです。',
      type: 'text',
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Get educational content recommendation
   */
  static async getEducationalRecommendation(userLevel: string): Promise<{
    recommended_lessons: Array<{
      id: string;
      title: string;
      description: string;
      difficulty: string;
      estimated_minutes: number;
    }>;
    learning_path: string[];
    reason: string;
  }> {
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    const beginnerLessons = [
      {
        id: '1',
        title: 'ビットコインとは何か？',
        description: 'ビットコインの基本概念と仕組みを学びます',
        difficulty: 'beginner',
        estimated_minutes: 15
      },
      {
        id: '2',
        title: 'ブロックチェーン技術の理解',
        description: 'ブロックチェーン技術の基礎を詳しく解説',
        difficulty: 'beginner',
        estimated_minutes: 20
      }
    ];
    
    const intermediateLessons = [
      {
        id: '3',
        title: 'テクニカル分析入門',
        description: 'チャートの読み方とテクニカル指標の基礎',
        difficulty: 'intermediate',
        estimated_minutes: 30
      },
      {
        id: '4',
        title: 'DeFiプロトコルの使い方',
        description: 'UniswapやAaveなどの主要DeFiプロトコルの使用方法',
        difficulty: 'intermediate',
        estimated_minutes: 25
      }
    ];
    
    const advancedLessons = [
      {
        id: '5',
        title: 'ポートフォリオ最適化戦略',
        description: 'リスク管理と最適なポートフォリオ構築方法',
        difficulty: 'advanced',
        estimated_minutes: 40
      }
    ];
    
    switch (userLevel) {
      case 'beginner':
        return {
          recommended_lessons: beginnerLessons,
          learning_path: ['基礎知識', 'ウォレット作成', '最初の購入', 'セキュリティ'],
          reason: '暗号通貨の基本概念から始めて、安全な取引の基礎を身につけることをお勧めします。'
        };
      
      case 'intermediate':
        return {
          recommended_lessons: intermediateLessons,
          learning_path: ['テクニカル分析', 'DeFi入門', 'リスク管理', '高度な取引'],
          reason: '基礎知識をお持ちの方には、実践的な分析手法と新しい金融サービスの学習をお勧めします。'
        };
      
      default:
        return {
          recommended_lessons: advancedLessons,
          learning_path: ['高度な戦略', 'アルゴリズムトレーディング', '機関投資', 'リスク最適化'],
          reason: '高度な投資戦略とポートフォリオ管理技術の習得に焦点を当てることをお勧めします。'
        };
    }
  }
}