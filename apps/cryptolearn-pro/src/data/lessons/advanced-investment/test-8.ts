import type { CategoryTest } from '@/types';

export const advancedInvestmentTest8: CategoryTest = {
  id: 'advanced-investment-test-8',
  categoryId: 'advanced-investment',
  title: '高度な投資戦略確認テスト8（レッスン36-40）',
  description: 'アルゴリズム取引、高頻度取引、AI投資、ロボアドバイザー、暗号クォンツの知識を確認する包括的テストです。',
  lessonRange: '36-40',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'advanced-investment-test-8-q1',
      question: 'アルゴリズム取引の主な利点は何ですか？',
      options: [
        '感情に左右されない系統的な取引',
        '100%の勝率保証',
        '取引コストの完全な無料化',
        '政府規制の回避'
      ],
      correctAnswer: 0,
      explanation: 'アルゴリズム取引の主な利点は、予め設定されたルールに基づく系統的な取引により、人間の感情や主観的判断による誤りを排除できることです。ただし、勝率の保証はありません。',
      difficulty: 'advanced',
      category: 'algorithmic-trading'
    },
    {
      id: 'advanced-investment-test-8-q2',
      question: '高頻度取引（HFT）の特徴として正しいものはどれですか？',
      options: [
        '長期保有戦略',
        'ミリ秒単位の超高速取引',
        '個人投資家向けサービス',
        '低コスト・低技術要求'
      ],
      correctAnswer: 1,
      explanation: '高頻度取引（HFT）は、ミリ秒やマイクロ秒単位の超高速で大量の取引を行う戦略で、高度な技術インフラと莫大な投資が必要な機関投資家向けの手法です。',
      difficulty: 'advanced',
      category: 'high-frequency-trading'
    },
    {
      id: 'advanced-investment-test-8-q3',
      question: 'AI投資システムにおける「リインフォースメント学習」とは何ですか？',
      options: [
        '教師データによる学習',
        '試行錯誤による報酬最大化学習',
        '過去データの丸暗記',
        '人間専門家の模倣学習'
      ],
      correctAnswer: 1,
      explanation: 'リインフォースメント学習（強化学習）は、AIが環境との相互作用を通じて試行錯誤し、報酬を最大化するような行動を学習する手法です。投資では市場環境での最適な売買判断を学習します。',
      difficulty: 'advanced',
      category: 'ai-investing'
    },
    {
      id: 'advanced-investment-test-8-q4',
      question: 'ロボアドバイザーの主な機能として含まれないものはどれですか？',
      options: [
        '自動リバランシング',
        'リスク許容度に応じた資産配分',
        '税務最適化',
        '個別株式の詳細分析'
      ],
      correctAnswer: 3,
      explanation: 'ロボアドバイザーは自動リバランシング、リスクベース資産配分、税務最適化などの機能を提供しますが、一般的に個別株式の詳細なファンダメンタル分析は行わず、ETFを使った分散投資に焦点を当てます。',
      difficulty: 'advanced',
      category: 'robo-advisors'
    },
    {
      id: 'advanced-investment-test-8-q5',
      question: '暗号通貨のクォンツ取引で重要な考慮事項は何ですか？',
      options: [
        '24時間取引と高ボラティリティ',
        '政府承認の必要性',
        '物理的保管の問題',
        '配当収入の確保'
      ],
      correctAnswer: 0,
      explanation: '暗号通貨のクォンツ取引では、24時間365日の取引時間と従来の金融商品より高いボラティリティが重要な特徴です。これらはアルゴリズムの設計と リスク管理において重要な考慮事項となります。',
      difficulty: 'advanced',
      category: 'crypto-quant'
    }
  ],
  lastUpdated: '2025-08-20',
  factChecked: true
};