import type { CategoryTest } from '@/types';

export const advancedInvestmentTest3: CategoryTest = {
  id: 'advanced-investment-test-3',
  categoryId: 'advanced-investment',
  title: '高度な投資戦略確認テスト3（レッスン11-15）',
  description: 'オプション取引、先物・デリバティブ、ヘッジ戦略、レバレッジ効果、複雑な金融商品の知識を確認する包括的テストです。',
  lessonRange: '11-15',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'advanced-investment-test-3-q1',
      question: 'コールオプションの買い手が持つ権利は何ですか？',
      options: [
        '株式を売る権利',
        '株式を買う権利',
        '株式を買う義務',
        '株式を売る義務'
      ],
      correctAnswer: 1,
      explanation: 'コールオプションの買い手は、特定の期日までに決められた価格（行使価格）で原資産を買う権利を持ちます。これは義務ではなく権利なので、不利な場合は行使しないことを選択できます。',
      difficulty: 'advanced',
      category: 'options'
    },
    {
      id: 'advanced-investment-test-3-q2',
      question: '先物取引と現物取引の主な違いは何ですか？',
      options: [
        '価格決定方法',
        '決済時期と証拠金制度',
        '取引量の上限',
        '税制上の扱い'
      ],
      correctAnswer: 1,
      explanation: '先物取引は将来の決済を前提とした取引で、証拠金制度により実際の資金より大きな取引が可能です。現物取引は即時決済で実物資産の移転を伴います。',
      difficulty: 'advanced',
      category: 'futures'
    },
    {
      id: 'advanced-investment-test-3-q3',
      question: 'ヘッジ戦略の主な目的は何ですか？',
      options: [
        '利益の最大化',
        'リスクの軽減・回避',
        '取引回数の増加',
        '手数料の削減'
      ],
      correctAnswer: 1,
      explanation: 'ヘッジ戦略の主な目的は、既存のポジションから発生する潜在的な損失リスクを軽減または回避することです。利益の最大化よりもリスク管理に重点を置いた戦略です。',
      difficulty: 'advanced',
      category: 'hedging'
    },
    {
      id: 'advanced-investment-test-3-q4',
      question: 'レバレッジが2倍の投資で原資産が10%下落した場合、投資家の損失は何%になりますか？',
      options: [
        '10%',
        '20%',
        '5%',
        '15%'
      ],
      correctAnswer: 1,
      explanation: 'レバレッジ2倍の場合、原資産の価格変動が2倍に拡大されます。原資産が10%下落すると、投資家の損失は 10% × 2 = 20% となります。',
      difficulty: 'advanced',
      category: 'leverage'
    },
    {
      id: 'advanced-investment-test-3-q5',
      question: 'デリバティブ商品の特徴として正しくないものはどれですか？',
      options: [
        '原資産の価値に基づく',
        'レバレッジ効果がある',
        'リスク管理に使用される',
        '元本保証がある'
      ],
      correctAnswer: 3,
      explanation: 'デリバティブ商品は元本保証がなく、むしろ高いリスクを伴う投資商品です。原資産の価値に基づき、レバレッジ効果があり、適切に使用すればリスク管理に有効ですが、元本割れのリスクがあります。',
      difficulty: 'advanced',
      category: 'derivatives'
    }
  ],
  lastUpdated: '2025-08-20',
  factChecked: true
};