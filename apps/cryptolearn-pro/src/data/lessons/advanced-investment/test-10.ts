import type { CategoryTest } from '@/types';

export const advancedInvestmentTest10: CategoryTest = {
  id: 'advanced-investment-test-10',
  categoryId: 'advanced-investment',
  title: '高度な投資戦略確認テスト10（レッスン46-50）',
  description: 'クレジットリスク管理、流動性リスク、オペレーショナルリスク、規制資本、暗号リスクの知識を確認する包括的テストです。',
  lessonRange: '46-50',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'advanced-investment-test-10-q1',
      question: 'クレジットスプレッドが拡大する主な要因は何ですか？',
      options: [
        '金利の低下',
        '信用リスクの増加',
        '流動性の向上',
        '経済成長の加速'
      ],
      correctAnswer: 1,
      explanation: 'クレジットスプレッドは、発行体の信用リスクを反映した国債との利回り差です。信用リスクが増加すると、投資家はより高いリスクプレミアムを要求するため、クレジットスプレッドが拡大します。',
      difficulty: 'advanced',
      category: 'credit-risk'
    },
    {
      id: 'advanced-investment-test-10-q2',
      question: '流動性リスクの管理で最も重要な要素は何ですか？',
      options: [
        '高い利回りの確保',
        'ビッド・アスク・スプレッドと市場深度の監視',
        '配当収入の最大化',
        '税務上の優遇措置'
      ],
      correctAnswer: 1,
      explanation: '流動性リスク管理では、ビッド・アスク・スプレッド（売買価格差）と市場深度（取引可能量）の監視が重要です。これらが悪化すると、必要時に適切な価格で売却できないリスクが高まります。',
      difficulty: 'advanced',
      category: 'liquidity-risk'
    },
    {
      id: 'advanced-investment-test-10-q3',
      question: 'オペレーショナルリスクの典型例に含まれないものはどれですか？',
      options: [
        'システム障害',
        '人的ミス',
        '不正取引',
        '市場価格の変動'
      ],
      correctAnswer: 3,
      explanation: 'オペレーショナルリスクは、不適切または機能しない内部プロセス、人材、システム、または外部事象による損失のリスクです。市場価格の変動は市場リスクに分類され、オペレーショナルリスクには含まれません。',
      difficulty: 'advanced',
      category: 'operational-risk'
    },
    {
      id: 'advanced-investment-test-10-q4',
      question: 'バーゼル III規制における自己資本比率の最低基準は何%ですか？',
      options: [
        '6%',
        '8%',
        '10%',
        '12%'
      ],
      correctAnswer: 1,
      explanation: 'バーゼル III規制では、銀行の自己資本比率（普通株式等Tier1資本比率）の最低基準を8%と定めています。これは金融システムの安定性を確保するための国際的な基準です。',
      difficulty: 'advanced',
      category: 'regulatory-capital'
    },
    {
      id: 'advanced-investment-test-10-q5',
      question: '暗号通貨投資における特有のリスクとして正しくないものはどれですか？',
      options: [
        'ハッキング・盗難リスク',
        '規制変更リスク',
        '技術的リスク',
        '配当停止リスク'
      ],
      correctAnswer: 3,
      explanation: '暗号通貨は配当を支払わないため、配当停止リスクは存在しません。暗号通貨特有のリスクには、ハッキング・盗難、規制変更、技術的障害、秘密鍵紛失などがあります。',
      difficulty: 'advanced',
      category: 'crypto-risk'
    }
  ],
  lastUpdated: '2025-08-20',
  factChecked: true
};