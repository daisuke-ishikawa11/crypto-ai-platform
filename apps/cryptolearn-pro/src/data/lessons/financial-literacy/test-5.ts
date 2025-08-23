import { CategoryTest } from '@/lib/types/learning';

export const financialLiteracyTest5: CategoryTest = {
  id: 'financial-literacy-test-5',
  categoryId: 'financial-literacy',
  title: 'レッスン21-25：ライフプラン・退職運用',
  description: 'ライフプランニング、教育資金、住宅ローン、退職後資産運用、リスク管理について学習内容を確認します。',
  lessonRange: '21-25',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'fl-t5-q1',
      type: 'multiple-choice',
      difficulty: 'beginner',
      category: 'financial-literacy',
      points: 20,
      question: 'ライフプランニングで最初に行うべきことはどれですか？',
      options: [
        'A) 投資商品の選定',
        'B) 現状の家計把握',
        'C) 保険の見直し',
        'D) 住宅購入の検討'
      ],
      correctAnswer: 1,
      explanation: 'ライフプランニングでは、まず現在の収入・支出・資産・負債を正確に把握することが重要です。',
      lessonId: 'life-planning'
    },
    {
      id: 'fl-t5-q2',
      type: 'multiple-choice',
      difficulty: 'intermediate',
      category: 'financial-literacy',
      points: 20,
      question: '教育資金準備で適切でない考え方はどれですか？',
      options: [
        'A) 早期からの計画的な積立',
        'B) 学資保険の活用',
        'C) 高リスク商品での短期運用',
        'D) NISAの活用'
      ],
      correctAnswer: 2,
      explanation: '教育資金は必要な時期が決まっているため、高リスクな短期運用は適さず、安定的な積立が重要です。',
      lessonId: 'education-funding'
    },
    {
      id: 'fl-t5-q3',
      type: 'multiple-choice',
      difficulty: 'intermediate',
      category: 'financial-literacy',
      points: 20,
      question: '住宅ローンの金利タイプで、金利上昇リスクが最も低いものはどれですか？',
      options: [
        'A) 変動金利',
        'B) 当初固定金利（3年）',
        'C) 全期間固定金利',
        'D) 段階金利'
      ],
      correctAnswer: 2,
      explanation: '全期間固定金利は借入期間中の金利が変わらないため、金利上昇リスクから完全に保護されます。',
      lessonId: 'housing-loans'
    },
    {
      id: 'fl-t5-q4',
      type: 'multiple-choice',
      difficulty: 'intermediate',
      category: 'financial-literacy',
      points: 20,
      question: '退職後の資産運用で重要な考え方はどれですか？',
      options: [
        'A) 高リターンを追求する',
        'B) 安定性を重視する',
        'C) 短期売買を繰り返す',
        'D) 全額を現金で保有する'
      ],
      correctAnswer: 1,
      explanation: '退職後は定期収入がないため、安定性を重視し、リスクを抑えた運用が重要です。',
      lessonId: 'retirement-planning'
    },
    {
      id: 'fl-t5-q5',
      type: 'multiple-choice',
      difficulty: 'beginner',
      category: 'financial-literacy',
      points: 20,
      question: '個人のリスク管理で最も基本的なものはどれですか？',
      options: [
        'A) 投資の分散',
        'B) 緊急時資金の確保',
        'C) 保険の加入',
        'D) 副業の開始'
      ],
      correctAnswer: 1,
      explanation: '緊急時資金（生活費の3-6ヶ月分）の確保は、あらゆるリスクに対する最も基本的な備えです。',
      lessonId: 'personal-risk-management'
    }
  ]
};