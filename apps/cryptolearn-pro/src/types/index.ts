// 学習コンテンツの型定義
export interface LessonSection {
  id?: string
  title: string
  content: string
  orderIndex?: number
  type?: 'text' | 'warning' | 'tip' | 'quiz' | 'info' | 'example'
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface Lesson {
  id: string
  categoryId: string
  title: string
  slug: string
  description: string
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced'
  estimatedMinutes: number
  orderIndex: number
  isPublished?: boolean
  content: {
    sections: LessonSection[]
    keyPoints: string[]
    summary: string
    practicalExamples: string[]
    warningNotes: string[]
  }
  quiz: QuizQuestion[]
  lastUpdated: string
  factChecked: boolean
}

export interface LessonCategory {
  id: string
  name: string
  description: string
  orderIndex: number
  icon: string
}

// ユーザー学習進捗
export interface UserLessonProgress {
  userId: string
  lessonId: string
  status: 'not_started' | 'in_progress' | 'completed'
  progressPercentage: number
  completedAt?: Date
  quizScore?: number
}

export interface UserCategoryProgress {
  userId: string
  categoryId: string
  completedLessons: number
  totalLessons: number
  testScore?: number
  certificateIssued: boolean
}

// クイズ・テスト関連
export interface QuizAttempt {
  id: string
  userId: string
  lessonId: string
  score: number
  answers: number[]
  submittedAt: Date
}

export interface CategoryTest {
  id: string
  categoryId: string
  title: string
  description: string
  lessonRange: string
  passingScore: number
  timeLimit: number
  questions: TestQuestion[]
  lastUpdated: string
  factChecked: boolean
}

export interface TestQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
}

// ユーザープロファイル
export interface UserProfile {
  id: string
  email: string
  name: string
  avatar?: string
  subscription: 'free' | 'premium'
  joinedAt: Date
  lastActiveAt: Date
}

// サブスクリプション
export interface Subscription {
  id: string
  userId: string
  plan: 'free' | 'premium'
  status: 'active' | 'inactive' | 'cancelled'
  startDate: Date
  endDate?: Date
  price: number
}

// アチーブメント・実績
export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  category: 'learning' | 'testing' | 'streak' | 'completion'
  requirements: {
    type: 'lessons_completed' | 'test_score' | 'streak_days' | 'category_completed'
    value: number
  }
}

export interface UserAchievement {
  userId: string
  achievementId: string
  earnedAt: Date
}