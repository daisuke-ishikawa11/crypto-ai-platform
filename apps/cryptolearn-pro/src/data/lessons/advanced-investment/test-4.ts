import type { CategoryTest } from '@/types';

export const advancedInvestmentTest4: CategoryTest = {
  id: 'advanced-investment-test-4',
  categoryId: 'advanced-investment',
  title: '高度な投資戦略確認テスト4（レッスン16-20）',
  description: '複雑なオプション戦略、スワップ取引、構造化商品、リスク管理技術、暗号デリバティブの知識を確認する包括的テストです。',
  lessonRange: '16-20',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'advanced-investment-test-4-q1',
      question: 'ストラドル戦略が最も効果的な市場環境はどれですか？',
      options: [
        '強い上昇トレンド',
        '強い下降トレンド',
        '高いボラティリティ',
        '低いボラティリティ'
      ],
      correctAnswer: 2,
      explanation: 'ストラドル戦略は同じ行使価格のコールとプットを同時に買う戦略で、方向性に関係なく価格が大きく動く（高ボラティリティ）環境で最も効果的です。',
      difficulty: 'advanced',
      category: 'option-strategies'
    },
    {
      id: 'advanced-investment-test-4-q2',
      question: 'スワップ取引の基本的な仕組みは何ですか？',
      options: [
        '現物資産の交換',
        '将来のキャッシュフローの交換',
        '株式の売買',
        '債券の発行'
      ],
      correctAnswer: 1,
      explanation: 'スワップ取引は、当事者間で将来の一定期間にわたってキャッシュフローを交換する契約です。金利スワップや通貨スワップなどがあり、リスク管理に使用されます。',
      difficulty: 'advanced',
      category: 'swaps'
    },
    {
      id: 'advanced-investment-test-4-q3',
      question: '構造化商品の特徴として正しいものはどれですか？',
      options: [
        '単純な投資商品',
        '複数の金融商品を組み合わせた複合商品',
        'リスクフリーの投資',
        '流動性が非常に高い'
      ],
      correctAnswer: 1,
      explanation: '構造化商品は、債券、株式、デリバティブなど複数の金融商品を組み合わせて作られる複合商品で、特定の投資目標やリスク特性を実現するために設計されます。',
      difficulty: 'advanced',
      category: 'structured-products'
    },
    {
      id: 'advanced-investment-test-4-q4',
      question: 'VaR（Value at Risk）の計算で使用される主要パラメータに含まれないものはどれですか？',
      options: [
        '信頼水準',
        '保有期間',
        'ポートフォリオ価値',
        '会社の設立年'
      ],
      correctAnswer: 3,
      explanation: 'VaR計算では信頼水準（例：95%、99%）、保有期間（例：1日、10日）、ポートフォリオの構成と価値が必要ですが、会社の設立年は統計的リスク計算に無関係です。',
      difficulty: 'advanced',
      category: 'risk-management'
    },
    {
      id: 'advanced-investment-test-4-q5',
      question: '暗号通貨の永続先物契約（パーペチュアルスワップ）の特徴は何ですか？',
      options: [
        '決済期限がある',
        '決済期限がなく資金調達率で価格調整',
        '現物受渡しが必要',
        '証拠金が不要'
      ],
      correctAnswer: 1,
      explanation: '暗号通貨の永続先物契約は決済期限がなく、資金調達率（funding rate）メカニズムにより先物価格を現物価格に近づける仕組みを持っています。',
      difficulty: 'advanced',
      category: 'crypto-derivatives'
    }
  ],
  lastUpdated: '2025-08-20',
  factChecked: true
};