import type { CategoryTest } from '@/types';

export const advancedInvestmentTest7: CategoryTest = {
  id: 'advanced-investment-test-7',
  categoryId: 'advanced-investment',
  title: '高度な投資戦略確認テスト7（レッスン31-35）',
  description: '定量分析、統計的裁定、バックテスト、データマイニング、機械学習投資の知識を確認する包括的テストです。',
  lessonRange: '31-35',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'advanced-investment-test-7-q1',
      question: 'バックテストにおける「ルックアヘッドバイアス」とは何ですか？',
      options: [
        '将来情報を過去の意思決定に使用する誤り',
        '過去のデータが不足している状態',
        '統計的有意性の問題',
        '取引コストを考慮しない誤り'
      ],
      correctAnswer: 0,
      explanation: 'ルックアヘッドバイアスは、実際には入手不可能だった将来の情報を過去の投資判断に使用してしまう誤りです。これにより実際よりも良い成果が出るように見えてしまいます。',
      difficulty: 'advanced',
      category: 'backtesting'
    },
    {
      id: 'advanced-investment-test-7-q2',
      question: '統計的裁定の基本原理は何ですか？',
      options: [
        '価格の一時的な歪みを統計的手法で特定し利益を得る',
        '必ず利益が出る取引を行う',
        '政府統計を利用した投資',
        '統計学者の助言に従う投資'
      ],
      correctAnswer: 0,
      explanation: '統計的裁定は、統計的手法を用いて通常の価格関係からの一時的な逸脱を特定し、その収束を期待して利益を得る戦略です。完全なリスクフリーではありませんが、統計的に有利な取引を狙います。',
      difficulty: 'advanced',
      category: 'statistical-arbitrage'
    },
    {
      id: 'advanced-investment-test-7-q3',
      question: 'データマイニングにおける「過学習」の問題とは何ですか？',
      options: [
        'データが多すぎる問題',
        '過去データに過度に適応し、未来予測力が低下する問題',
        '学習時間が長すぎる問題',
        'データの質が低い問題'
      ],
      correctAnswer: 1,
      explanation: '過学習は、モデルが訓練データの特殊性やノイズまで学習してしまい、新しいデータに対する汎化性能が低下する問題です。投資では過去のパターンに過度に依存した戦略が実際の市場で機能しない原因となります。',
      difficulty: 'advanced',
      category: 'data-mining'
    },
    {
      id: 'advanced-investment-test-7-q4',
      question: '機械学習を投資戦略に応用する際の主な利点は何ですか？',
      options: [
        '100%の勝率を保証する',
        '大量データから複雑なパターンを発見する能力',
        '取引コストを完全に無くす',
        '市場リスクを完全に排除する'
      ],
      correctAnswer: 1,
      explanation: '機械学習の主な利点は、人間では処理困難な大量のデータから複雑な非線形パターンを発見し、予測モデルを構築できることです。ただし、勝率の保証やリスクの完全排除はできません。',
      difficulty: 'advanced',
      category: 'machine-learning'
    },
    {
      id: 'advanced-investment-test-7-q5',
      question: 'シャープレシオを最大化するクォンツ戦略の設計で最も重要な要素は何ですか？',
      options: [
        'リターンのみの最大化',
        'リスクのみの最小化',
        'リスク調整後リターンの最適化',
        '取引回数の最大化'
      ],
      correctAnswer: 2,
      explanation: 'シャープレシオ最大化には、リターンとリスクのバランスを考慮したリスク調整後リターンの最適化が重要です。単純にリターンを最大化するだけでは、リスクも増大してシャープレシオは改善されません。',
      difficulty: 'advanced',
      category: 'quantitative-strategies'
    }
  ],
  lastUpdated: '2025-08-20',
  factChecked: true
};