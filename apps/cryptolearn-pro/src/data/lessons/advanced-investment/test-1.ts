import type { CategoryTest } from '@/types';

export const advancedInvestmentTest1: CategoryTest = {
  id: 'advanced-investment-test-1',
  categoryId: 'advanced-investment',
  title: '高度な投資戦略確認テスト1（レッスン1-5）',
  description: 'ポートフォリオ理論、資産配分、分散投資、効率的フロンティア、相関性分析の基礎知識を確認する包括的テストです。',
  lessonRange: '1-5',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'advanced-investment-test-1-q1',
      question: 'ハリー・マーコウィッツの現代ポートフォリオ理論（MPT）が提唱されたのは何年ですか？',
      options: [
        '1950年',
        '1952年',
        '1955年',
        '1960年'
      ],
      correctAnswer: 1,
      explanation: '現代ポートフォリオ理論（MPT）は、1952年にハリー・マーコウィッツによって提唱されました。この理論は投資理論の礎となり、マーコウィッツは後にノーベル経済学賞を受賞しています。',
      difficulty: 'advanced',
      category: 'portfolio-theory'
    },
    {
      id: 'advanced-investment-test-1-q2',
      question: '効率的フロンティアの正しい説明はどれですか？',
      options: [
        '最小リスクのポートフォリオを表す',
        '最大リターンのポートフォリオを表す',
        '各リスクレベルにおいて最大リターンを提供する投資組合せ',
        'リスクフリー資産のみの組合せ'
      ],
      correctAnswer: 2,
      explanation: '効率的フロンティアは、各リスクレベルにおいて最大のリターンを提供する投資組合せを示す曲線です。これらの組合せは数学的に最適化されており、同じリスクでより高いリターンを得ることはできません。',
      difficulty: 'advanced',
      category: 'portfolio-optimization'
    },
    {
      id: 'advanced-investment-test-1-q3',
      question: '分散投資の効果が最大となるのは、資産間の相関係数がどのような場合ですか？',
      options: [
        '+1.0（完全正の相関）',
        '0（無相関）',
        '-1.0（完全負の相関）',
        '+0.5（中程度の正の相関）'
      ],
      correctAnswer: 2,
      explanation: '資産間の相関係数が-1.0（完全負の相関）の場合、一方の資産の価格が上がると他方が下がるため、分散効果が最大となります。理論的には完全にリスクを相殺することも可能です。',
      difficulty: 'advanced',
      category: 'diversification'
    },
    {
      id: 'advanced-investment-test-1-q4',
      question: '暗号通貨ポートフォリオにおける主要な考慮事項として正しくないものはどれですか？',
      options: [
        '高いボラティリティ',
        '相関性の変化',
        '24時間取引の影響',
        '完全にリスクフリーであること'
      ],
      correctAnswer: 3,
      explanation: '暗号通貨投資は高リスク・高リターンの投資であり、完全にリスクフリーではありません。むしろ高いボラティリティ、相関性の変化、24時間取引による価格変動などのリスク要因を慎重に考慮する必要があります。',
      difficulty: 'advanced',
      category: 'crypto-portfolio'
    },
    {
      id: 'advanced-investment-test-1-q5',
      question: 'ポートフォリオのリスクを表す指標として最も適切なものはどれですか？',
      options: [
        '平均リターン',
        '標準偏差',
        '最大リターン',
        '投資期間'
      ],
      correctAnswer: 1,
      explanation: 'ポートフォリオのリスクは通常、標準偏差で測定されます。標準偏差はリターンのばらつき（変動性）を示し、値が大きいほどリスクが高いことを表します。',
      difficulty: 'advanced',
      category: 'risk-measurement'
    }
  ],
  lastUpdated: '2025-08-20',
  factChecked: true
};