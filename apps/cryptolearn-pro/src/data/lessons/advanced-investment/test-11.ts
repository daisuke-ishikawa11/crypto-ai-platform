import type { CategoryTest } from '@/types';

export const advancedInvestmentTest11: CategoryTest = {
  id: 'advanced-investment-test-11',
  categoryId: 'advanced-investment',
  title: '高度な投資戦略確認テスト11（レッスン51-55）',
  description: '機関投資家戦略、年金ファンド運用、エンダウメント投資、ソブリンファンド、ファミリーオフィスの知識を確認する包括的テストです。',
  lessonRange: '51-55',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'advanced-investment-test-11-q1',
      question: '機関投資家の投資行動が個人投資家と最も異なる点は何ですか？',
      options: [
        '感情的な判断',
        '長期投資視点と規模の経済',
        '短期的な利益追求',
        '情報の不足'
      ],
      correctAnswer: 1,
      explanation: '機関投資家は長期投資視点、大規模な運用資産、専門的知識、規模の経済によるコスト優位性を持ち、感情に左右されにくい系統的な投資判断を行います。',
      difficulty: 'advanced',
      category: 'institutional-investing'
    },
    {
      id: 'advanced-investment-test-11-q2',
      question: '年金ファンドの資産・負債管理（ALM）の主な目的は何ですか？',
      options: [
        '短期利益の最大化',
        '資産と負債のキャッシュフロー・デュレーションをマッチング',
        '投機的取引による高収益',
        '税務上の優遇措置活用'
      ],
      correctAnswer: 1,
      explanation: 'ALM（Asset Liability Management）は、将来の年金給付負債と運用資産のキャッシュフロー、金利感応度（デュレーション）をマッチングさせ、長期的な支払能力を確保することが主目的です。',
      difficulty: 'advanced',
      category: 'pension-funds'
    },
    {
      id: 'advanced-investment-test-11-q3',
      question: '大学エンダウメントファンドの「イェール・モデル」の特徴は何ですか？',
      options: [
        '債券中心の保守的運用',
        'オルタナティブ投資への高い配分',
        '短期取引による利益追求',
        '現金保有の最大化'
      ],
      correctAnswer: 1,
      explanation: 'イェール・モデルは、イェール大学エンダウメントが確立した投資手法で、プライベートエクイティ、ヘッジファンド、不動産などオルタナティブ投資への高い配分により、長期的な高収益を追求します。',
      difficulty: 'advanced',
      category: 'endowment-investing'
    },
    {
      id: 'advanced-investment-test-11-q4',
      question: 'ソブリンウェルスファンド（政府系ファンド）の主な投資目的は何ですか？',
      options: [
        '短期的な為替操作',
        '国家の長期的な財政安定と世代間富の移転',
        '国内企業への優遇投資のみ',
        '他国への政治的圧力'
      ],
      correctAnswer: 1,
      explanation: 'ソブリンウェルスファンドは、天然資源収入や外貨準備などの国家資産を原資とし、長期的な財政安定と将来世代への富の移転を目的として、グローバルに分散投資を行います。',
      difficulty: 'advanced',
      category: 'sovereign-funds'
    },
    {
      id: 'advanced-investment-test-11-q5',
      question: 'シングルファミリーオフィスの投資戦略の特徴は何ですか？',
      options: [
        '規制による制約が多い',
        '流動性を最優先する',
        '長期投資視点と柔軟な投資基準',
        '公的な情報開示義務がある'
      ],
      correctAnswer: 2,
      explanation: 'シングルファミリーオフィスは、超富裕層の資産管理を行う組織で、長期投資視点、高いリスク許容度、柔軟な投資基準を持ち、従来の投資制約に縛られない独自の戦略を採用できます。',
      difficulty: 'advanced',
      category: 'family-offices'
    }
  ],
  lastUpdated: '2025-08-20',
  factChecked: true
};