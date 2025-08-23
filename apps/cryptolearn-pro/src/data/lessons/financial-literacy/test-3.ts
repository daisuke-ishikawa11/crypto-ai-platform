import { CategoryTest } from '@/lib/types/learning';

export const financialLiteracyTest3: CategoryTest = {
  id: 'financial-literacy-test-3',
  categoryId: 'financial-literacy',
  title: 'レッスン11-15：市場分析・投資戦略',
  description: '市場サイクル、バリュエーション、投資戦略、ドルコスト平均法、リバランスについて学習内容を確認します。',
  lessonRange: '11-15',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'fl-t3-q1',
      type: 'multiple-choice',
      difficulty: 'intermediate',
      category: 'financial-literacy',
      points: 20,
      question: '市場サイクルの一般的な順序として正しいものはどれですか？',
      options: [
        'A) 回復期 → 拡張期 → 後退期 → 収縮期',
        'B) 拡張期 → 回復期 → 収縮期 → 後退期',
        'C) 収縮期 → 回復期 → 拡張期 → 後退期',
        'D) 後退期 → 拡張期 → 回復期 → 収縮期'
      ],
      correctAnswer: 2,
      explanation: '市場サイクルは一般的に収縮期（底）→ 回復期 → 拡張期（ピーク）→ 後退期の順序で繰り返されます。',
      lessonId: 'market-cycles'
    },
    {
      id: 'fl-t3-q2',
      type: 'multiple-choice',
      difficulty: 'intermediate',
      category: 'financial-literacy',
      points: 20,
      question: 'PER（株価収益率）について正しい説明はどれですか？',
      options: [
        'A) 株価 ÷ 1株当たり純資産',
        'B) 株価 ÷ 1株当たり純利益',
        'C) 1株当たり純利益 ÷ 株価',
        'D) 配当金 ÷ 株価'
      ],
      correctAnswer: 1,
      explanation: 'PER（Price Earnings Ratio）は株価を1株当たり純利益で割った値で、株価の割安・割高を判断する指標です。',
      lessonId: 'valuation-methods'
    },
    {
      id: 'fl-t3-q3',
      type: 'multiple-choice',
      difficulty: 'beginner',
      category: 'financial-literacy',
      points: 20,
      question: 'バリュー投資の基本的な考え方はどれですか？',
      options: [
        'A) 高成長企業への投資',
        'B) 短期的な価格変動を利用',
        'C) 割安な株式への長期投資',
        'D) テクニカル分析による売買'
      ],
      correctAnswer: 2,
      explanation: 'バリュー投資は、企業の本来の価値に比べて株価が割安な銘柄を見つけて長期投資する戦略です。',
      lessonId: 'investment-strategies'
    },
    {
      id: 'fl-t3-q4',
      type: 'multiple-choice',
      difficulty: 'beginner',
      category: 'financial-literacy',
      points: 20,
      question: 'ドルコスト平均法の主なメリットはどれですか？',
      options: [
        'A) 必ずリターンが向上する',
        'B) 価格変動リスクを軽減する',
        'C) 手数料が安くなる',
        'D) 短期間で利益が出る'
      ],
      correctAnswer: 1,
      explanation: 'ドルコスト平均法は定期的に同じ金額で投資することで、価格変動による影響を平準化し、リスクを軽減する効果があります。',
      lessonId: 'dollar-cost-averaging'
    },
    {
      id: 'fl-t3-q5',
      type: 'multiple-choice',
      difficulty: 'intermediate',
      category: 'financial-literacy',
      points: 20,
      question: 'ポートフォリオのリバランスを行う理由として適切でないものはどれですか？',
      options: [
        'A) 目標とする資産配分を維持するため',
        'B) リスクレベルを一定に保つため',
        'C) 短期的な利益を確定するため',
        'D) 長期的な投資目標を達成するため'
      ],
      correctAnswer: 2,
      explanation: 'リバランスの目的は短期利益の確定ではなく、目標とする資産配分を維持し、長期的な投資目標を達成することです。',
      lessonId: 'rebalancing'
    }
  ]
};