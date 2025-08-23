import type { CategoryTest } from '@/types';

export const advancedInvestmentTest9: CategoryTest = {
  id: 'advanced-investment-test-9',
  categoryId: 'advanced-investment',
  title: '高度な投資戦略確認テスト9（レッスン41-45）',
  description: 'VaRモデル、ストレステスト、シナリオ分析、リスクバジェッティング、動的ヘッジの知識を確認する包括的テストです。',
  lessonRange: '41-45',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'advanced-investment-test-9-q1',
      question: 'VaR（Value at Risk）の1%、1日VaRが1000万円の意味は何ですか？',
      options: [
        '1日で1000万円の利益が1%の確率で得られる',
        '1日で1000万円以上の損失が発生する確率が1%',
        '1000万円の投資元本が保証される',
        '1日の取引量が1000万円に制限される'
      ],
      correctAnswer: 1,
      explanation: '1%、1日VaRが1000万円とは、統計的に1%の確率（100日に1日）で1000万円以上の損失が発生することを意味します。言い換えると、99%の確率で損失は1000万円以内に収まるということです。',
      difficulty: 'advanced',
      category: 'var-models'
    },
    {
      id: 'advanced-investment-test-9-q2',
      question: 'ストレステストの主な目的は何ですか？',
      options: [
        '通常の市場条件での性能測定',
        '極端な市場条件下での潜在的損失評価',
        '過去のリターン分析',
        '取引コストの計算'
      ],
      correctAnswer: 1,
      explanation: 'ストレステストは、金融危機、市場暴落、政治的危機などの極端で稀な市場条件下で、ポートフォリオがどの程度の損失を被る可能性があるかを評価し、潜在的な脆弱性を特定する手法です。',
      difficulty: 'advanced',
      category: 'stress-testing'
    },
    {
      id: 'advanced-investment-test-9-q3',
      question: 'モンテカルロシミュレーションの投資分析における主な用途は何ですか？',
      options: [
        '過去データの正確な再現',
        '確実な将来予測',
        '多様な確率的シナリオでの性能評価',
        '単一最適解の発見'
      ],
      correctAnswer: 2,
      explanation: 'モンテカルロシミュレーションは、確率的な変数を用いて数千通りの可能な市場シナリオを生成し、各シナリオでのポートフォリオ性能を評価することで、リスク評価と投資意思決定を支援します。',
      difficulty: 'advanced',
      category: 'scenario-analysis'
    },
    {
      id: 'advanced-investment-test-9-q4',
      question: 'リスクバジェッティングとは何ですか？',
      options: [
        '投資予算の配分',
        '各資産クラスへのリスク配分決定',
        '取引コストの予算化',
        '税務計画の策定'
      ],
      correctAnswer: 1,
      explanation: 'リスクバジェッティングは、ポートフォリオ全体のリスク予算を各資産クラス、戦略、またはファンドマネージャーにどのように配分するかを決定するプロセスです。リターンではなくリスクベースの配分手法です。',
      difficulty: 'advanced',
      category: 'risk-budgeting'
    },
    {
      id: 'advanced-investment-test-9-q5',
      question: '動的ヘッジの特徴は何ですか？',
      options: [
        '一度設定したら変更しない',
        '市場条件に応じてヘッジ比率を継続的に調整',
        '完全にリスクを排除する',
        '政府承認が必要'
      ],
      correctAnswer: 1,
      explanation: '動的ヘッジは、市場条件、ポートフォリオ価値、時間経過に応じてヘッジ比率を継続的に調整する手法です。オプションのデルタヘッジなどが代表例で、静的ヘッジより精密ですが取引コストが高くなります。',
      difficulty: 'advanced',
      category: 'dynamic-hedging'
    }
  ],
  lastUpdated: '2025-08-20',
  factChecked: true
};