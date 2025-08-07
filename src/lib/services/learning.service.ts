import { createClient } from '@/lib/supabase/client'
import { 
  Lesson, 
  LessonCategory, 
  UserLessonProgress, 
  UserAchievement,
  AchievementType,
  LearningStats
} from '@/lib/types/learning'
import { allLessons, getLessonBySlug, getLessonsByCategory } from '@/data/lessons'
import { lessonCategories } from '@/data/lessons/categories'

const supabase = createClient()

export class LearningService {
  // カテゴリ関連
  async getCategories(): Promise<LessonCategory[]> {
    return lessonCategories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      description: cat.description,
      orderIndex: cat.orderIndex,
      icon: cat.icon,
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }))
  }

  async getCategoryById(categoryId: string): Promise<LessonCategory | null> {
    const categories = await this.getCategories()
    return categories.find(cat => cat.id === categoryId) || null
  }

  // レッスン関連
  async getLessons(categoryId?: string): Promise<Lesson[]> {
    if (categoryId) {
      return getLessonsByCategory(categoryId)
    }
    return allLessons
  }

  async getLesson(lessonId: string): Promise<Lesson | null> {
    return allLessons.find(lesson => lesson.id === lessonId) || null
  }

  async getLessonBySlug(slug: string): Promise<Lesson | null> {
    return getLessonBySlug(slug) ?? null
  }

  // 進捗管理
  async getUserProgress(userId: string, lessonId: string): Promise<UserLessonProgress | null> {
    try {
      const { data, error } = await supabase
        .from('user_lesson_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('lesson_id', lessonId)
        .single()

      if (error || !data) return null
      
      // データベースフィールドからTypeScript型への変換
      return {
        id: data.id,
        userId: data.user_id,
        lessonId: data.lesson_id,
        status: data.status,
        progressPercentage: data.progress_percentage || 0,
        startedAt: data.started_at ? new Date(data.started_at) : undefined,
        completedAt: data.completed_at ? new Date(data.completed_at) : undefined,
        timeSpentSeconds: data.time_spent_seconds || 0,
        notes: data.notes,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      } as UserLessonProgress
    } catch {
      return null
    }
  }

  async updateProgress(userId: string, lessonId: string, progress: Partial<UserLessonProgress>): Promise<boolean> {
    try {
      // TypeScript型定義からデータベースフィールド名への変換
      const dbProgress: Partial<{
        status: string;
        progress_percentage: number;
        completed_at: string;
        started_at: string;
        time_spent_seconds: number;
        notes: string;
      }> = {};
      
      if (progress.status) dbProgress.status = progress.status;
      if (progress.progressPercentage !== undefined) dbProgress.progress_percentage = progress.progressPercentage;
      if (progress.completedAt) dbProgress.completed_at = progress.completedAt.toISOString();
      if (progress.startedAt) dbProgress.started_at = progress.startedAt.toISOString();
      if (progress.timeSpentSeconds !== undefined) dbProgress.time_spent_seconds = progress.timeSpentSeconds;
      if (progress.notes) dbProgress.notes = progress.notes;

      const { error } = await supabase
        .from('user_lesson_progress')
        .upsert({
          user_id: userId,
          lesson_id: lessonId,
          ...dbProgress,
          updated_at: new Date().toISOString()
        })

      return !error
    } catch {
      return false
    }
  }

  async completeLesson(userId: string, lessonId: string): Promise<boolean> {
    return this.updateProgress(userId, lessonId, {
      status: 'completed',
      completedAt: new Date(),
      progressPercentage: 100
    })
  }

  // クイズ機能
  async submitQuizAnswer(
    userId: string, 
    lessonId: string, 
    questionId: string, 
    answer: string
  ): Promise<boolean> {
    try {
      const lesson = await this.getLesson(lessonId)
      if (!lesson) return false

      // クイズセクションを見つける
      const quizSection = lesson.content.sections.find(section => section.type === 'quiz')
      if (!quizSection || !Array.isArray(quizSection.questions)) return false

      // 型定義: クイズの質問型
      type QuizQuestion = {
        id: string
        correctAnswer: string
        // 他のプロパティがある場合はここに明示的に追加してください
      }

      const question = (quizSection.questions as QuizQuestion[]).find((q) => q.id === questionId)
      if (!question) return false

      const isCorrect = question.correctAnswer === answer

      const { error } = await supabase
        .from('user_quiz_attempts')
        .insert({
          user_id: userId,
          lesson_id: lessonId,
          question_id: questionId,
          user_answer: answer,
          is_correct: isCorrect,
          created_at: new Date().toISOString()
        })

      return !error
    } catch {
      return false
    }
  }

  // クイズ結果取得
  async getQuizResults(
    userId: string,
    lessonId: string
  ): Promise<
    {
      id: string
      user_id: string
      lesson_id: string
      question_id: string
      user_answer: string
      is_correct: boolean
      created_at: string
    }[]
  > {
    try {
      const { data, error } = await supabase
        .from('user_quiz_attempts')
        .select('*')
        .eq('user_id', userId)
        .eq('lesson_id', lessonId)
        .order('created_at', { ascending: false })

      if (error || !data) return []
      return data
    } catch {
      return []
    }
  }

  // 実績・アチーブメント
  async getUserAchievements(userId: string): Promise<UserAchievement[]> {
    try {
      const { data, error } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', userId)
        .order('earned_at', { ascending: false })

      if (error || !data) return []
      return data as UserAchievement[]
    } catch {
      return []
    }
  }

  async awardAchievement(
    userId: string, 
    achievementType: AchievementType, 
    metadata?: Record<string, unknown>
  ): Promise<boolean> {
    try {
      // 既に獲得済みかチェック
      const existing = await supabase
        .from('user_achievements')
        .select('id')
        .eq('user_id', userId)
        .eq('achievement_type', achievementType)
        .single()

      if (existing.data) return true // 既に獲得済み

      const { error } = await supabase
        .from('user_achievements')
        .insert({
          user_id: userId,
          achievement_type: achievementType,
          metadata: metadata || {},
          earned_at: new Date().toISOString()
        })

      return !error
    } catch {
      return false
    }
  }

  // タイムトラッキング
  async recordTimeSpent(userId: string, lessonId: string, timeSpentSeconds: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_lesson_progress')
        .update({
          time_spent_seconds: timeSpentSeconds,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .eq('lesson_id', lessonId)

      return !error
    } catch {
      return false
    }
  }

  // 統計情報取得
  async getLearningStats(userId: string): Promise<LearningStats> {
    try {
      const { data: progressData } = await supabase
        .from('user_lesson_progress')
        .select('*')
        .eq('user_id', userId)

      const completedLessons = progressData?.filter(p => p.status === 'completed').length || 0
      const inProgressLessons = progressData?.filter(p => p.status === 'in_progress').length || 0
      const totalTimeSpent = progressData?.reduce((sum, p) => sum + (p.time_spent_seconds || 0), 0) || 0
      const averageProgress = progressData?.reduce((sum, p) => sum + (p.progress_percentage || 0), 0) / (progressData?.length || 1) || 0

      return {
        completedLessons,
        inProgressLessons,
        totalLessons: allLessons.length,
        totalTimeSpent,
        averageScore: averageProgress,
        currentStreak: 0, // TODO: 実装する
        achievements: [] // TODO: 実装する
      }
    } catch {
      return {
        completedLessons: 0,
        inProgressLessons: 0,
        totalLessons: allLessons.length,
        totalTimeSpent: 0,
        averageScore: 0,
        currentStreak: 0,
        achievements: []
      }
    }
  }

  // ストリーク管理
  async updateLearningStreak(userId: string): Promise<boolean> {
    try {
      const today = new Date().toISOString().split('T')[0]
      
      const { data: existing } = await supabase
        .from('user_learning_streaks')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (!existing) {
        // 新規作成
        const { error } = await supabase
          .from('user_learning_streaks')
          .insert({
            user_id: userId,
            current_streak: 1,
            longest_streak: 1,
            last_activity_date: today
          })
        return !error
      }

      const lastDate = new Date(existing.last_activity_date)
      const todayDate = new Date(today)
      const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))

      let newStreak = existing.current_streak
      if (diffDays === 1) {
        // 連続学習
        newStreak += 1
      } else if (diffDays > 1) {
        // ストリーク中断
        newStreak = 1
      }
      // diffDays === 0 の場合（同日）はストリークそのまま

      const { error } = await supabase
        .from('user_learning_streaks')
        .update({
          current_streak: newStreak,
          longest_streak: Math.max(existing.longest_streak, newStreak),
          last_activity_date: today,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)

      return !error
    } catch {
      return false
    }
  }

  // レコメンデーション
  async getRecommendedLessons(userId: string, limit = 5): Promise<Lesson[]> {
    try {
      // 完了済みレッスンを取得
      const { data: completedProgress } = await supabase
        .from('user_lesson_progress')
        .select('lesson_id')
        .eq('user_id', userId)
        .eq('is_completed', true)

      // completedProgressの型を明示
      const completedLessonIds = completedProgress?.map((p: { lesson_id: string }) => p.lesson_id) || []

      // 未完了のレッスンから推奨を選択
      const uncompletedLessons = allLessons.filter((l: Lesson) => !completedLessonIds.includes(l.id))
      // 難易度順でソートして推奨
      const sortedLessons = uncompletedLessons.sort((a: Lesson, b: Lesson) => {
        const difficultyOrder: Record<string, number> = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 }
        return (difficultyOrder[a.difficultyLevel] || 1) - (difficultyOrder[b.difficultyLevel] || 1)
      })

      return sortedLessons.slice(0, limit)
    } catch {
      return allLessons.slice(0, limit)
    }
  }

  // 学習経路の提案
  async getLearningPath(userId: string): Promise<Lesson[]> {
    try {
      // ユーザーの現在のレベルを判定
      const stats = await this.getLearningStats(userId)
      const completionRate = (stats.completedLessons / stats.totalLessons) * 100

      // 完了率に基づいて次の学習経路を提案
      if (completionRate < 20) {
        // 初心者向け基礎レッスン
        return allLessons
          .filter((l: Lesson) => l.difficultyLevel === 'beginner')
          .sort((a: Lesson, b: Lesson) => a.orderIndex - b.orderIndex)
          .slice(0, 5)
      } else if (completionRate < 60) {
        // 中級レッスン
        return allLessons
          .filter((l: Lesson) => l.difficultyLevel === 'intermediate')
          .sort((a: Lesson, b: Lesson) => a.orderIndex - b.orderIndex)
          .slice(0, 5)
      } else {
        // 上級レッスン
        return allLessons
          .filter((l: Lesson) => l.difficultyLevel === 'advanced')
          .sort((a: Lesson, b: Lesson) => a.orderIndex - b.orderIndex)
          .slice(0, 5)
      }
    } catch {
      return []
    }
  }
}

// インスタンスをエクスポート
export const learningService = new LearningService(); 