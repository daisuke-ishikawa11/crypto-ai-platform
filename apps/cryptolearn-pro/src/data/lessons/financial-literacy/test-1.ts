import { CategoryTest } from '@/lib/types/learning';

export const financialLiteracyTest1: CategoryTest = {
  id: 'financial-literacy-test-1',
  categoryId: 'financial-literacy',
  title: 'レッスン1-5：投資基礎・リスク管理',
  description: '投資の基本概念、リスクとリターン、複利効果、分散投資、リスク許容度について学習内容を確認します。',
  lessonRange: '1-5',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'fl-t1-q1',
      type: 'multiple-choice',
      difficulty: 'beginner',
      category: 'financial-literacy',
      points: 20,
      question: '投資における「リスク」の最も適切な定義はどれですか？',
      options: [
        'A) 必ず損失が発生すること',
        'B) 投資元本が減少すること',
        'C) 期待収益からの振れ幅（不確実性）',
        'D) 高いリターンを得ること'
      ],
      correctAnswer: 2,
      explanation: 'リスクとは期待収益からの振れ幅、つまり不確実性を意味します。リスクが高いほどリターンの変動が大きくなります。',
      lessonId: 'what-is-investment'
    },
    {
      id: 'fl-t1-q2',
      type: 'multiple-choice',
      difficulty: 'beginner',
      category: 'financial-literacy',
      points: 20,
      question: '複利効果について正しい説明はどれですか？',
      options: [
        'A) 元本のみに利息がつくこと',
        'B) 利息にも利息がつくこと',
        'C) 投資期間に関係なく効果は同じ',
        'D) リスクが高いほど複利効果が大きい'
      ],
      correctAnswer: 1,
      explanation: '複利効果とは利息にも利息がつくことで、時間が経つほど効果が大きくなります。長期投資の重要な要素です。',
      lessonId: 'compound-interest'
    },
    {
      id: 'fl-t1-q3',
      type: 'multiple-choice',
      difficulty: 'intermediate',
      category: 'financial-literacy',
      points: 20,
      question: '分散投資の主な目的は何ですか？',
      options: [
        'A) リターンを最大化すること',
        'B) リスクを軽減すること',
        'C) 手数料を削減すること',
        'D) 投資期間を短縮すること'
      ],
      correctAnswer: 1,
      explanation: '分散投資の主な目的はリスクの軽減です。異なる資産に投資することで、特定の資産の下落リスクを軽減できます。',
      lessonId: 'diversification'
    },
    {
      id: 'fl-t1-q4',
      type: 'multiple-choice',
      difficulty: 'beginner',
      category: 'financial-literacy',
      points: 20,
      question: 'リスク許容度を決定する際に考慮すべき要因として適切でないものはどれですか？',
      options: [
        'A) 年齢',
        'B) 投資期間',
        'C) 収入の安定性',
        'D) 友人の投資成功談'
      ],
      correctAnswer: 3,
      explanation: 'リスク許容度は個人の年齢、投資期間、収入状況などの客観的要因で決定すべきです。他人の成功談は参考程度に留めるべきです。',
      lessonId: 'risk-tolerance'
    },
    {
      id: 'fl-t1-q5',
      type: 'multiple-choice',
      difficulty: 'intermediate',
      category: 'financial-literacy',
      points: 20,
      question: '年率6%で複利運用した場合、72の法則によると元本が2倍になるのは約何年後ですか？',
      options: [
        'A) 10年',
        'B) 12年',
        'C) 14年',
        'D) 16年'
      ],
      correctAnswer: 1,
      explanation: '72の法則では、72÷年利率で元本が2倍になる年数がわかります。72÷6=12年となります。',
      lessonId: 'compound-interest'
    }
  ]
};