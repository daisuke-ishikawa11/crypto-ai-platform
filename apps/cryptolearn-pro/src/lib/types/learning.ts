// Re-export types from the main types file for backward compatibility
export type {
  Lesson,
  LessonSection,
  QuizQuestion,
  CategoryTest,
  TestQuestion,
  LessonProgress,
  UserQuizAttempt
} from '@/types'

// Additional learning-specific types if needed
export interface LearningProgress {
  userId: string
  categoryProgress: Record<string, number>
  completedLessons: string[]
  certificates: string[]
}

export interface LearningStats {
  totalLessons: number
  completedLessons: number
  averageScore: number
  streak: number
}