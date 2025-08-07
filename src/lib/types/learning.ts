// 学習コンテンツシステムの型定義

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type LessonStatus = 'not_started' | 'in_progress' | 'completed';
export type QuestionType = 'multiple_choice' | 'true_false' | 'fill_blank';
export type AchievementType = 'lesson_complete' | 'category_complete' | 'streak' | 'quiz_perfect' | 'first_lesson' | 'milestone';

// レッスンカテゴリ
export interface LessonCategory {
  id: string;
  name: string;
  description?: string;
  orderIndex: number;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

// レッスン内のクイズ質問（簡易版）
export interface LessonQuizQuestion {
  id: string;
  questionType: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

// レッスンコンテンツの構造
export interface LessonSection {
  type: 'text' | 'image' | 'video' | 'code' | 'quiz' | 'warning' | 'tip' | 'example';
  title?: string;
  content?: string;
  questions?: LessonQuizQuestion[];
  metadata?: unknown;
}

export interface LessonContent {
  sections: LessonSection[];
  keyPoints?: string[];
  summary?: string;
}

// レッスン
export interface Lesson {
  id: string;
  categoryId: string;
  title: string;
  slug: string;
  description?: string;
  content: LessonContent;
  difficultyLevel: DifficultyLevel;
  estimatedMinutes: number;
  orderIndex: number;
  prerequisites?: string[]; // レッスンのslug配列
  tags?: string[];
  isPublished?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  category?: LessonCategory; // 結合時に含まれる
}

// ユーザーの学習進捗
export interface UserLessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  status: LessonStatus;
  progressPercentage: number;
  startedAt?: Date;
  completedAt?: Date;
  timeSpentSeconds: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  lesson?: Lesson; // 結合時に含まれる
}

// クイズ質問
export interface QuizQuestion {
  id: string;
  lessonId: string;
  question: string;
  questionType: QuestionType;
  options?: string[]; // multiple_choiceの場合
  correctAnswer: string;
  explanation?: string;
  points: number;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

// クイズ回答
export interface UserQuizAttempt {
  id: string;
  userId: string;
  lessonId: string;
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  pointsEarned: number;
  attemptedAt: Date;
  question?: QuizQuestion; // 結合時に含まれる
}

// ユーザーの実績
export interface UserAchievement {
  id: string;
  userId: string;
  achievementType: AchievementType;
  achievementName: string;
  achievementData?: Record<string, unknown>;
  earnedAt: Date;
}

// 学習ストリーク
export interface UserLearningStreak {
  id: string;
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// 学習統計
export interface LearningStats {
  totalLessons: number;
  completedLessons: number;
  inProgressLessons: number;
  totalTimeSpent: number; // 秒
  averageScore: number;
  currentStreak: number;
  achievements: UserAchievement[];
}

// 学習パス推奨
export interface LearningPathRecommendation {
  nextLesson?: Lesson;
  suggestedLessons: Lesson[];
  reason: string;
} 