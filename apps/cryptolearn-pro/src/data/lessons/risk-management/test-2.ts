import type { CategoryTest } from '@/types';

export const riskManagementTest2: CategoryTest = {
  id: 'risk-management-test-2',
  categoryId: 'risk-management',
  title: 'リスク管理・投資心理学確認テスト2（レッスン6-10）',
  description: 'ポートフォリオリスク管理、分散投資、相関係数、リバランスの確認テストです。',
  lessonRange: '6-10',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'risk-test-2-q1',
      question: '分散投資におけるリスク削減の理論的根拠は何ですか？',
      options: [
        '投資金額の分散により元本保証される',
        '相関の低い資産の組み合わせでポートフォリオリスクを削減',
        '手数料が安くなるため',
        'すべての投資が同じ値動きをする'
      ],
      correctAnswer: 1,
      explanation: '分散投資では相関の低い資産を組み合わせることで、個別資産のリスクが互いに相殺され、ポートフォリオ全体のリスクが個別資産の平均リスクより低くなります。',
      difficulty: 'intermediate',
      category: 'portfolio-theory'
    },
    {
      id: 'risk-test-2-q2',
      question: 'ポートフォリオの相関係数が1.0に近い場合の問題点は？',
      options: [
        '分散効果が得られず、リスク削減効果が限定的',
        '取引手数料が高くなる',
        '税金が多くかかる',
        '特に問題はない'
      ],
      correctAnswer: 0,
      explanation: '相関係数が1.0に近いということは資産が同じような値動きをすることを意味し、分散投資の効果が得られません。真の分散には相関の低い資産の組み合わせが必要です。',
      difficulty: 'intermediate',
      category: 'correlation-analysis'
    },
    {
      id: 'risk-test-2-q3',
      question: 'ポートフォリオの「最適化」において重視すべき指標は？',
      options: [
        '期待利益のみ',
        'シャープレシオ（リスクあたりリターン）',
        '投資銘柄数のみ',
        '手数料の安さのみ'
      ],
      correctAnswer: 1,
      explanation: 'シャープレシオ（期待リターン-リスクフリーレート）÷標準偏差は、取るリスクに対してどれだけ効率的にリターンを得られるかを示す重要な指標です。',
      difficulty: 'intermediate',
      category: 'portfolio-optimization'
    },
    {
      id: 'risk-test-2-q4',
      question: '分散投資において「真の分散」を実現するためには？',
      options: [
        '同じ業界の株を複数購入',
        '地域・業界・資産クラス・時間を分散',
        '1つの暗号通貨のみ',
        '知人の推薦銘柄のみ'
      ],
      correctAnswer: 1,
      explanation: '真の分散投資には、地理的分散（先進国・新興国）、業界分散、資産クラス分散（株・債券・暗号通貨・商品）、時間分散が必要です。',
      difficulty: 'intermediate',
      category: 'diversification-strategy'
    },
    {
      id: 'risk-test-2-q5',
      question: 'ポートフォリオの「リバランス」の主な目的は？',
      options: [
        '取引手数料を増やす',
        '目標資産配分を維持し、リスクレベルを適切に保つ',
        '税金を多く払う',
        '短期的な利益追求'
      ],
      correctAnswer: 1,
      explanation: 'リバランスは、価格変動により変化した資産配分を当初の目標配分に戻し、意図しないリスクの増大を防ぎ、「利益確定・損切り」を機械的に実行する効果もあります。',
      difficulty: 'intermediate',
      category: 'rebalancing'
    },
    {
      id: 'risk-test-2-q6',
      question: '現代ポートフォリオ理論における「効率的フロンティア」とは？',
      options: [
        '最も手数料が安い投資の組み合わせ',
        '同じリスクレベルで最大リターンを得られる資産配分の組み合わせ',
        '最も人気のある投資商品',
        '政府推奨の投資方法'
      ],
      correctAnswer: 1,
      explanation: '効率的フロンティアは、同じリスクレベルで最大のリターンを得られる、または同じリターンレベルで最小のリスクとなる最適な資産配分の組み合わせを示します。',
      difficulty: 'advanced',
      category: 'modern-portfolio-theory'
    },
    {
      id: 'risk-test-2-q7',
      question: '暗号通貨を含むポートフォリオでの推奨配分割合は？',
      options: [
        '100% 暗号通貨',
        '全体の5-10%程度（リスク許容度により調整）',
        '50%以上',
        '0%（投資すべきでない）'
      ],
      correctAnswer: 1,
      explanation: '暗号通貨は高いリターン可能性がある一方でボラティリティも高いため、一般的には全体ポートフォリオの5-10%程度の配分が推奨されます（個人のリスク許容度により調整）。',
      difficulty: 'intermediate',
      category: 'crypto-allocation'
    },
    {
      id: 'risk-test-2-q8',
      question: 'ポートフォリオにおける「ホームカントリーバイアス」のリスクは？',
      options: [
        'リスクはない',
        '自国の経済・政治・通貨リスクに過度に集中',
        '税制が有利になる',
        '情報収集が楽になる'
      ],
      correctAnswer: 1,
      explanation: '自国投資への偏重（ホームカントリーバイアス）により、自国の経済危機、政治不安、通貨安などの同時発生リスクに過度に晒される危険性があります。',
      difficulty: 'intermediate',
      category: 'geographic-diversification'
    },
    {
      id: 'risk-test-2-q9',
      question: 'ポートフォリオの「標準偏差」が示すものは？',
      options: [
        '期待リターンの大きさ',
        'リターンの変動幅（リスク）の大きさ',
        '投資期間の長さ',
        '手数料の高さ'
      ],
      correctAnswer: 1,
      explanation: '標準偏差は、ポートフォリオのリターンが期待値からどれだけばらつくかを示し、数値が大きいほどリスク（価格変動の大きさ）が高いことを意味します。',
      difficulty: 'intermediate',
      category: 'risk-metrics'
    },
    {
      id: 'risk-test-2-q10',
      question: '「コア・サテライト戦略」における「コア部分」の特徴は？',
      options: [
        '高リスク・高リターンの積極投資',
        '低コスト・分散投資での安定的な長期運用',
        '短期トレーディング',
        '1つの株式への集中投資'
      ],
      correctAnswer: 1,
      explanation: 'コア・サテライト戦略のコア部分は、低コストなインデックスファンドなどを使用した分散投資で、ポートフォリオの70-80%を占め、安定的な長期リターンを狙います。',
      difficulty: 'intermediate',
      category: 'core-satellite-strategy'
    }
  ],
  lastUpdated: '2025-08-21',
  factChecked: true
};