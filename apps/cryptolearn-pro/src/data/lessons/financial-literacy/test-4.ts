import { CategoryTest } from '@/lib/types/learning';

export const financialLiteracyTest4: CategoryTest = {
  id: 'financial-literacy-test-4',
  categoryId: 'financial-literacy',
  title: 'レッスン16-20：税務・制度・心理学',
  description: '投資の税務、NISA、iDeCo、行動経済学、投資心理について学習内容を確認します。',
  lessonRange: '16-20',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'fl-t4-q1',
      type: 'multiple-choice',
      difficulty: 'intermediate',
      category: 'financial-literacy',
      points: 20,
      question: '日本の株式投資における譲渡所得税率（復興特別所得税含む）はどれですか？',
      options: [
        'A) 10.21%',
        'B) 15.315%',
        'C) 20.315%',
        'D) 25.42%'
      ],
      correctAnswer: 2,
      explanation: '株式等の譲渡所得に対する税率は20.315%（所得税15%、住民税5%、復興特別所得税0.315%）です。',
      lessonId: 'investment-taxation'
    },
    {
      id: 'fl-t4-q2',
      type: 'multiple-choice',
      difficulty: 'beginner',
      category: 'financial-literacy',
      points: 20,
      question: 'つみたてNISAの年間投資枠はいくらですか？',
      options: [
        'A) 40万円',
        'B) 120万円',
        'C) 800万円',
        'D) 1800万円'
      ],
      correctAnswer: 0,
      explanation: 'つみたてNISAの年間投資枠は40万円です（2024年からの新NISAでは成長投資枠240万円＋つみたて投資枠120万円）。',
      lessonId: 'nisa-system'
    },
    {
      id: 'fl-t4-q3',
      type: 'multiple-choice',
      difficulty: 'intermediate',
      category: 'financial-literacy',
      points: 20,
      question: 'iDeCo（個人型確定拠出年金）の主なメリットとして適切でないものはどれですか？',
      options: [
        'A) 掛金の所得控除',
        'B) 運用益の非課税',
        'C) いつでも自由に引き出し可能',
        'D) 受取時の税制優遇'
      ],
      correctAnswer: 2,
      explanation: 'iDeCoは原則60歳まで引き出しができません。長期的な老後資金形成を目的とした制度です。',
      lessonId: 'ideco-system'
    },
    {
      id: 'fl-t4-q4',
      type: 'multiple-choice',
      difficulty: 'intermediate',
      category: 'financial-literacy',
      points: 20,
      question: '行動経済学における「プロスペクト理論」で説明される現象はどれですか？',
      options: [
        'A) 利益確定は早く、損切りは遅くなる傾向',
        'B) 高リターンを追求する傾向',
        'C) 分散投資を好む傾向',
        'D) 長期投資を選好する傾向'
      ],
      correctAnswer: 0,
      explanation: 'プロスペクト理論では、人は利益に対しては確実性を求め（利益確定）、損失に対してはリスクを取る（塩漬け）傾向があります。',
      lessonId: 'behavioral-economics'
    },
    {
      id: 'fl-t4-q5',
      type: 'multiple-choice',
      difficulty: 'beginner',
      category: 'financial-literacy',
      points: 20,
      question: '投資における「損失回避バイアス」とは何ですか？',
      options: [
        'A) 損失を恐れて投資しない心理',
        'B) 利益より損失を重く感じる心理',
        'C) 損失を隠したがる心理',
        'D) 損失を他人のせいにする心理'
      ],
      correctAnswer: 1,
      explanation: '損失回避バイアスとは、同じ金額でも利益より損失の方を重く感じる心理的傾向のことです。',
      lessonId: 'investment-psychology'
    }
  ]
};