import { CategoryTest } from '@/lib/types/learning';

export const financialLiteracyTest2: CategoryTest = {
  id: 'financial-literacy-test-2',
  categoryId: 'financial-literacy',
  title: 'レッスン6-10：金融商品・ポートフォリオ',
  description: '株式、債券、投資信託、ETF、ポートフォリオ構築について学習内容を確認します。',
  lessonRange: '6-10',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'fl-t2-q1',
      type: 'multiple-choice',
      difficulty: 'beginner',
      category: 'financial-literacy',
      points: 20,
      question: '株式投資の主なリターンの源泉として正しくないものはどれですか？',
      options: [
        'A) 配当金',
        'B) 株価上昇による値上がり益',
        'C) 元本保証',
        'D) 株主優待'
      ],
      correctAnswer: 2,
      explanation: '株式投資には元本保証はありません。株価は市場の状況により変動し、損失が生じる可能性があります。',
      lessonId: 'stocks-bonds'
    },
    {
      id: 'fl-t2-q2',
      type: 'multiple-choice',
      difficulty: 'intermediate',
      category: 'financial-literacy',
      points: 20,
      question: '債券投資における主なリスクはどれですか？',
      options: [
        'A) 金利リスク',
        'B) 流動性リスク',
        'C) 信用リスク',
        'D) すべて正しい'
      ],
      correctAnswer: 3,
      explanation: '債券投資には金利リスク（金利変動による価格変動）、流動性リスク（売買の困難性）、信用リスク（発行体の破綻リスク）があります。',
      lessonId: 'stocks-bonds'
    },
    {
      id: 'fl-t2-q3',
      type: 'multiple-choice',
      difficulty: 'beginner',
      category: 'financial-literacy',
      points: 20,
      question: '投資信託の主なメリットとして適切でないものはどれですか？',
      options: [
        'A) 少額から投資可能',
        'B) 専門的な運用',
        'C) 分散投資効果',
        'D) 元本保証'
      ],
      correctAnswer: 3,
      explanation: '投資信託は元本保証商品ではありません。基準価額は運用成果により変動し、損失が生じる可能性があります。',
      lessonId: 'mutual-funds'
    },
    {
      id: 'fl-t2-q4',
      type: 'multiple-choice',
      difficulty: 'intermediate',
      category: 'financial-literacy',
      points: 20,
      question: 'ETF（上場投資信託）の特徴として正しいものはどれですか？',
      options: [
        'A) 投資信託より手数料が高い',
        'B) 市場で自由に売買できる',
        'C) 1日1回しか取引できない',
        'D) 個別銘柄選択が必要'
      ],
      correctAnswer: 1,
      explanation: 'ETFは証券取引所に上場しているため、株式と同様に市場で自由に売買することができます。',
      lessonId: 'etf-reit'
    },
    {
      id: 'fl-t2-q5',
      type: 'multiple-choice',
      difficulty: 'intermediate',
      category: 'financial-literacy',
      points: 20,
      question: 'ポートフォリオ構築で重要な考え方はどれですか？',
      options: [
        'A) 高リターン商品のみに集中投資',
        'B) 資産配分の多様化',
        'C) 短期売買による利益確定',
        'D) 人気商品への追随投資'
      ],
      correctAnswer: 1,
      explanation: 'ポートフォリオ構築では、リスクを抑制するために異なる特性を持つ資産への分散投資（資産配分の多様化）が重要です。',
      lessonId: 'portfolio-building'
    }
  ]
};