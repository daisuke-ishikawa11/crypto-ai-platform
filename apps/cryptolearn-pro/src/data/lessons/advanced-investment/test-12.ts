import type { CategoryTest } from '@/types';

export const advancedInvestmentTest12: CategoryTest = {
  id: 'advanced-investment-test-12',
  categoryId: 'advanced-investment',
  title: '高度な投資戦略確認テスト12（レッスン56-60）',
  description: 'パフォーマンス評価、帰属分析、ベンチマーク構築、投資委員会運営、プロフェッショナルスタンダードの知識を確認する包括的テストです。',
  lessonRange: '56-60',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'advanced-investment-test-12-q1',
      question: 'アルファとベータの違いを正しく説明したものはどれですか？',
      options: [
        'アルファは市場リスク、ベータは個別リスク',
        'アルファは市場超過リターン、ベータは市場感応度',
        'アルファとベータは同じ概念',
        'アルファは債券、ベータは株式のリターン'
      ],
      correctAnswer: 1,
      explanation: 'アルファは市場（ベンチマーク）を上回る超過リターンを示し、運用能力を表します。ベータは市場全体の動きに対する感応度を表し、1より大きいと市場より大きく変動します。',
      difficulty: 'advanced',
      category: 'performance-analysis'
    },
    {
      id: 'advanced-investment-test-12-q2',
      question: 'パフォーマンス帰属分析の主な目的は何ですか？',
      options: [
        '税務申告の準備',
        'リターンの源泉を資産配分効果と銘柄選択効果に分解',
        '取引コストの計算',
        'リスクの測定'
      ],
      correctAnswer: 1,
      explanation: 'パフォーマンス帰属分析は、ポートフォリオのリターンがどの要因（資産配分、銘柄選択、タイミング等）によって生み出されたかを定量的に分解し、運用戦略の有効性を評価します。',
      difficulty: 'advanced',
      category: 'attribution-analysis'
    },
    {
      id: 'advanced-investment-test-12-q3',
      question: '適切なベンチマークの条件として正しくないものはどれですか？',
      options: [
        '投資可能性',
        '透明性',
        'リターンの最大化',
        '代表性'
      ],
      correctAnswer: 2,
      explanation: '適切なベンチマークの条件は、投資可能性（実際に投資できる）、透明性（構成が明確）、代表性（投資戦略を適切に反映）です。リターンの最大化はベンチマークの条件ではありません。',
      difficulty: 'advanced',
      category: 'benchmark-construction'
    },
    {
      id: 'advanced-investment-test-12-q4',
      question: '投資委員会の主要な役割として適切でないものはどれですか？',
      options: [
        '投資方針の策定',
        'リスク管理の監督',
        '日々の売買判断',
        'パフォーマンスの評価'
      ],
      correctAnswer: 2,
      explanation: '投資委員会は戦略的な意思決定機関で、投資方針策定、リスク管理監督、パフォーマンス評価を行いますが、日々の個別売買判断は運用担当者の職務であり、委員会の役割ではありません。',
      difficulty: 'advanced',
      category: 'investment-committee'
    },
    {
      id: 'advanced-investment-test-12-q5',
      question: 'CFA（Chartered Financial Analyst）の倫理基準で最も重視される原則は何ですか？',
      options: [
        '利益の最大化',
        '顧客利益の最優先（Fiduciary Duty）',
        '会社利益の確保',
        '個人キャリアの発展'
      ],
      correctAnswer: 1,
      explanation: 'CFA倫理基準では、投資専門家が顧客や雇用者の利益を自身の利益より優先する受託者責任（Fiduciary Duty）が最も重要な原則とされています。',
      difficulty: 'advanced',
      category: 'professional-standards'
    }
  ],
  lastUpdated: '2025-08-20',
  factChecked: true
};