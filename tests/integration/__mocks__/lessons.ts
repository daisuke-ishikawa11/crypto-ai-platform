// Integration-safe mock for lessons data
export type Lesson = {
  id: string
  categoryId: string
  title: string
  slug: string
  description: string
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced'
  estimatedMinutes: number
  orderIndex: number
  isPublished: boolean
  tags: string[]
  content: {
    sections: Array<{
      type: 'text' | 'quiz' | 'practice'
      title: string
      content: string
      options?: string[]
      correctAnswer?: number
      explanation?: string
    }>
    keyPoints: string[]
    summary: string
  }
}

export const allLessons: Lesson[] = [
  {
    id: 'intro-to-crypto',
    categoryId: '1',
    title: '暗号資産の基礎',
    slug: 'intro-to-crypto',
    description: '暗号資産の基本概念を学ぶ',
    difficultyLevel: 'beginner',
    estimatedMinutes: 15,
    orderIndex: 1,
    isPublished: true,
    tags: ['基礎'],
    content: {
      sections: [
        { type: 'text', title: '概要', content: '暗号資産の概要を学びます。' },
        { type: 'quiz', title: 'クイズ', content: '代表的な暗号資産は？', options: ['BTC', 'ABC', 'XYZ', '123'], correctAnswer: 0, explanation: 'BTCが代表例です。' }
      ],
      keyPoints: ['基礎概念', '代表例'],
      summary: '基礎を理解しました。'
    }
  },
  {
    id: 'portfolio-basics',
    categoryId: '1',
    title: 'ポートフォリオの基礎',
    slug: 'portfolio-basics',
    description: '分散投資の考え方を学ぶ',
    difficultyLevel: 'beginner',
    estimatedMinutes: 10,
    orderIndex: 2,
    isPublished: true,
    tags: ['ポートフォリオ'],
    content: {
      sections: [
        { type: 'text', title: '分散の重要性', content: '分散投資はリスクを下げる助けになります。' }
      ],
      keyPoints: ['分散'],
      summary: '分散の重要性を理解しました。'
    }
  },
  {
    id: 'risk-management-basics',
    categoryId: '2',
    title: 'リスク管理の基礎',
    slug: 'risk-management-basics',
    description: 'リスク管理の基本原則を学ぶ',
    difficultyLevel: 'intermediate',
    estimatedMinutes: 20,
    orderIndex: 3,
    isPublished: true,
    tags: ['リスク'],
    content: {
      sections: [
        { type: 'text', title: '原則', content: 'ポジションサイズや損切りを計画しましょう。' }
      ],
      keyPoints: ['ポジションサイズ', '損切り'],
      summary: '基本的なリスク管理を理解しました。'
    }
  }
]

export function getLessonBySlug(slug: string): Lesson | undefined {
  return allLessons.find(l => l.slug === slug)
}

export function getLessonsByCategory(categoryId: string): Lesson[] {
  return allLessons.filter(l => l.categoryId === categoryId)
}
