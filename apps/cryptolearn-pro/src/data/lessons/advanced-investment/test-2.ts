import type { CategoryTest } from '@/types';

export const advancedInvestmentTest2: CategoryTest = {
  id: 'advanced-investment-test-2',
  categoryId: 'advanced-investment',
  title: '高度な投資戦略確認テスト2（レッスン6-10）',
  description: 'リバランシング、コア・サテライト戦略、戦略的・戦術的資産配分、パフォーマンス測定の知識を確認する包括的テストです。',
  lessonRange: '6-10',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'advanced-investment-test-2-q1',
      question: 'ポートフォリオのリバランシングを行う主な目的は何ですか？',
      options: [
        '取引回数を増やすため',
        '目標とする資産配分を維持するため',
        '税金を最大化するため',
        '全資産を現金化するため'
      ],
      correctAnswer: 1,
      explanation: 'リバランシングの主な目的は、市場の動きによって変化した資産配分を当初設定した目標配分に戻すことです。これにより、意図したリスクレベルを維持し、規律ある投資を継続できます。',
      difficulty: 'advanced',
      category: 'rebalancing'
    },
    {
      id: 'advanced-investment-test-2-q2',
      question: 'コア・サテライト戦略における「コア」部分の特徴は何ですか？',
      options: [
        '高リスク・高リターンの投資',
        '安定した、低コストのインデックス投資',
        '短期的な投機的投資',
        '単一銘柄への集中投資'
      ],
      correctAnswer: 1,
      explanation: 'コア・サテライト戦略の「コア」部分は、ポートフォリオの基盤となる安定した、低コストのインデックスファンドや ETF で構成され、長期的な市場リターンの獲得を目指します。',
      difficulty: 'advanced',
      category: 'core-satellite'
    },
    {
      id: 'advanced-investment-test-2-q3',
      question: '戦略的資産配分（SAA）と戦術的資産配分（TAA）の主な違いは何ですか？',
      options: [
        'SAAは短期、TAAは長期',
        'SAAは長期基本配分、TAAは短期的調整',
        'SAAとTAAは同じ意味',
        'SAAは株式のみ、TAAは債券のみ'
      ],
      correctAnswer: 1,
      explanation: '戦略的資産配分（SAA）は長期的な基本資産配分を決定し、戦術的資産配分（TAA）は市場環境に応じて短期的に配分を調整する手法です。SAAは投資の基盤、TAAは機動的な調整を担います。',
      difficulty: 'advanced',
      category: 'asset-allocation'
    },
    {
      id: 'advanced-investment-test-2-q4',
      question: 'シャープレシオを高めるために最も効果的な方法は何ですか？',
      options: [
        'リターンのみを最大化する',
        'リスクのみを最小化する',
        'リスク調整後リターンを最大化する',
        '投資期間を短縮する'
      ],
      correctAnswer: 2,
      explanation: 'シャープレシオは（ポートフォリオリターン - リスクフリーレート）/ 標準偏差で計算されるため、リスク1単位あたりの超過リターン、つまりリスク調整後リターンを最大化することで改善されます。',
      difficulty: 'advanced',
      category: 'performance-measurement'
    },
    {
      id: 'advanced-investment-test-2-q5',
      question: '暗号通貨のコア・サテライト戦略における「サテライト」部分に適した投資対象はどれですか？',
      options: [
        'ビットコインETF',
        '草コインへの投機的投資',
        '安定したステーキング',
        '分散型インデックス'
      ],
      correctAnswer: 1,
      explanation: 'サテライト部分は、コア部分を補完する高リスク・高リターンの投資で構成されます。草コインへの投機的投資は、少額でポートフォリオのリターンを向上させる可能性がある一方で、高いリスクを伴います。',
      difficulty: 'advanced',
      category: 'crypto-strategy'
    }
  ],
  lastUpdated: '2025-08-20',
  factChecked: true
};