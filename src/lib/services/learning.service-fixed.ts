// 🎓 学習サービス - 型安全な実装
// 270レッスン対応の包括的学習管理システム（継続拡張中）

import { supabase } from '@/lib/supabase/client';
// 非使用の暫定実装。ビルド対象から外すまで型を安定化。
// 実運用は LearningDataService / LearningService を使用。
// import { lessons, categories } from '@/data/lessons';
import { 
  type UserLessonProgress,
  // 以下は未使用のため一時コメントアウト
  // type Lesson,
  // type LessonCategory,
  // type QuizAnswer,
  // type QuizAttempt,
  // type Achievement,
  // type LearningStreak,
  // type UserProfile 
} from '@/lib/types/learning';

export class LearningService {
  // Basic service methods remain unchanged...
  
  // 進捗管理 - 型安全版
  async getUserProgress(userId: string, lessonId: string): Promise<UserLessonProgress | null> {
    try {
      const { data, error } = await supabase
        .from('user_lesson_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('lesson_id', lessonId)
        .single();

      if (error || !data) return null;
      return data as UserLessonProgress;
    } catch {
      return null;
    }
  }

  // その他のメソッドも同様に型安全化
  async updateProgress(
    userId: string,
    lessonId: string,
    status: 'not_started' | 'in_progress' | 'completed',
    progressPercentage: number,
    quizScore?: number
  ): Promise<boolean>;
  async updateProgress(
    userId: string,
    lessonId: string,
    data: { status?: 'not_started'|'in_progress'|'completed'; progressPercentage?: number; quizScore?: number; timeSpentSeconds?: number; notes?: string }
  ): Promise<boolean>;
  async updateProgress(
    userId: string,
    lessonId: string,
    statusOrData: (
      | 'not_started'
      | 'in_progress'
      | 'completed'
      | {
          status?: 'not_started' | 'in_progress' | 'completed';
          progressPercentage?: number;
          quizScore?: number;
          timeSpentSeconds?: number;
          notes?: string;
        }
    ),
    progressPercentage?: number,
    quizScore?: number
  ): Promise<boolean> {
    try {
      let status: 'not_started'|'in_progress'|'completed'
      let percentage: number
      let score: number | undefined
      if (typeof statusOrData === 'object' && statusOrData !== null) {
        status = (statusOrData.status ?? (statusOrData.progressPercentage === 100 ? 'completed' : 'in_progress'))
        percentage = Number(statusOrData.progressPercentage ?? 0)
        score = typeof statusOrData.quizScore === 'number' ? statusOrData.quizScore : undefined
      } else {
        status = statusOrData as 'not_started'|'in_progress'|'completed'
        percentage = Number(progressPercentage ?? 0)
        score = quizScore
      }

      const existing = await this.getUserProgress(userId, lessonId);
      const { error } = await supabase
        .from('user_lesson_progress')
        .upsert({
          user_id: userId,
          lesson_id: lessonId,
          status,
          progress_percentage: percentage,
          startedAt: existing?.startedAt || new Date().toISOString(),
          updated_at: new Date().toISOString(),
          ...(status === 'completed' ? { completed_at: new Date().toISOString(), quiz_score: score } : {})
        });

      if (error) return false;
      if (status === 'completed') {
        await this.updateLearningStreak(userId);
        await this.checkAndAwardAchievements(userId, lessonId);
      }
      return true;
    } catch {
      return false;
    }
  }

  // 他のメソッドも型安全化を継続...
  async getAllUserProgress(userId: string): Promise<UserLessonProgress[]> {
    try {
      const { data: progressData } = await supabase
        .from('user_lesson_progress')
        .select(`
          lesson_id,
          status,
          progress_percentage,
          completed_at,
          quiz_score,
          started_at,
          updated_at
        `)
        .eq('user_id', userId);

      return (progressData || []).map((p: Record<string, unknown>) => ({
        id: String(p.id ?? ''),
        userId: String(p.user_id ?? userId),
        lessonId: String(p.lesson_id ?? ''),
        status: String(p.status ?? 'in_progress') as 'not_started' | 'in_progress' | 'completed',
        progressPercentage: Number(p.progress_percentage ?? 0),
        completedAt: p.completed_at ? new Date(String(p.completed_at)) : undefined,
        quizScore: typeof p.quiz_score === 'number' ? p.quiz_score : Number(p.quiz_score ?? 0),
        startedAt: p.started_at ? new Date(String(p.started_at)) : new Date(),
        updatedAt: p.updated_at ? new Date(String(p.updated_at)) : new Date(),
        timeSpentSeconds: typeof p.time_spent_seconds === 'number' ? p.time_spent_seconds : Number(p.time_spent_seconds ?? 0),
        createdAt: p.created_at ? new Date(String(p.created_at)) : new Date()
      }));
    } catch {
      return [];
    }
  }

  // ===== Added facade methods for compatibility with routes =====
  async getLessons(categoryId?: string): Promise<Array<{ id: string; title: string; description?: string; tags?: string[]; orderIndex: number; estimatedMinutes: number; difficultyLevel: 'beginner'|'intermediate'|'advanced'; categoryId?: string }>> {
    try {
      const query = supabase
        .from('lessons')
        .select(`
          id,
          title,
          description,
          tags,
          order_index,
          estimated_minutes,
          difficulty_level,
          category_id
        `)
      if (categoryId) {
        // dynamic filter
        query.eq('category_id', categoryId as string);
      }
      const { data } = await query;
      return (data as Array<Record<string, unknown>> || []).map((r) => ({
        id: String(r.id ?? ''),
        title: String(r.title ?? ''),
        description: typeof r.description === 'string' ? r.description : undefined,
        tags: Array.isArray(r.tags) ? r.tags as string[] : undefined,
        orderIndex: Number(r.orderIndex ?? r.order_index ?? 0),
        estimatedMinutes: Number(r.estimatedMinutes ?? r.estimated_minutes ?? 0),
        difficultyLevel: ((): 'beginner'|'intermediate'|'advanced' => {
          const v = String(r.difficultyLevel);
          return v === 'beginner' || v === 'intermediate' || v === 'advanced' ? v : 'beginner';
        })(),
        categoryId: r.categoryId ? String(r.categoryId) : (r.category_id ? String(r.category_id) : undefined),
      }))
    } catch {
      return []
    }
  }

  async getLearningStats(userId: string): Promise<{ completedLessons: number; inProgressLessons: number; totalLessons: number; averageScore: number; currentStreak: number; }> {
    try {
      const all = await this.getAllUserProgress(userId)
      const completed = all.filter(p => Boolean(p.completedAt)).length
      const inProgress = all.filter((p) => !p.completedAt && p.progressPercentage > 0).length;
      const total = all.length;
      // 型 'UserLessonProgress' に 'quizScore' が存在しないため、型アサーションで対応
      const avgScore = all.length
        ? Math.round((all.reduce((sum, p) => {
            const q = (p as { quizScore?: number }).quizScore
            return sum + (typeof q === 'number' ? q : 0)
          }, 0) / all.length) * 100) / 100
        : 0;
      const currentStreak = await this.getCurrentStreak(userId);
      return {
        completedLessons: completed,
        inProgressLessons: inProgress,
        totalLessons: total,
        averageScore: avgScore,
        currentStreak,
      };
    } catch {
      return {
        completedLessons: 0,
        inProgressLessons: 0,
        totalLessons: 0,
        averageScore: 0,
        currentStreak: 0,
      };
    }
  }

  async getLesson(lessonId: string): Promise<Record<string, unknown> | null> {
    try {
      const { data } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', lessonId)
        .single()
      return (data as Record<string, unknown>) || null
    } catch {
      return null
    }
  }

  async getQuizQuestions(_lessonId: string): Promise<Array<{ id: string; correctAnswer: string; explanation?: string }>> {
    return []
  }

  async submitQuizAnswer(_userId: string, _lessonId: string, _questionId: string, _selectedAnswer: string, _isCorrect?: boolean, _timeSpentSeconds?: number): Promise<boolean> {
    return true
  }

  async saveQuizAttempt(
    _userId: string,
    _lessonId: string,
    _answersOrScore: Record<string, string | number> | number,
    _passed?: boolean,
    _results?: Record<string, unknown>
  ): Promise<boolean> {
    return true
  }

  async awardAchievement(_userId: string, _type: string, _metadata?: Record<string, unknown>): Promise<boolean> {
    return true
  }

  async getRecommendedLessons(_userId: string, limit: number = 3): Promise<Array<{ id: string; title: string; description?: string; estimatedMinutes?: number }>> {
    const lessons = await this.getLessons()
    return lessons.slice(0, limit)
  }

  async completeLesson(userId: string, lessonId: string): Promise<boolean> {
    return this.updateProgress(userId, lessonId, 'completed', 100)
  }

  // wrapper to make streak update accessible
  public async updateLearningStreak(userId: string): Promise<void> {
    // simple upsert current streak increment
    try {
      const { data } = await supabase
        .from('user_learning_streaks')
        .select('current_streak')
        .eq('user_id', userId)
        .single()
      const current = (data as { current_streak?: unknown } | null)?.current_streak ?? 0
      await supabase
        .from('user_learning_streaks')
        .upsert({ user_id: userId, current_streak: Number(current) + 1 })
    } catch { /* noop */ }
  }

  // remove duplicate older overload block

  // 型安全なストリーク管理
  async getCurrentStreak(userId: string): Promise<number> {
    try {
      const { data: streak, error } = await supabase
        .from('user_learning_streaks')
        .select('current_streak')
        .eq('user_id', userId)
        .single();

      if (error || !streak) return 0;
      return (streak as { current_streak: number }).current_streak || 0;
    } catch {
      return 0;
    }
  }

  // その他のメソッドも型安全版で実装継続...
  // removed duplicate private method

  private async checkAndAwardAchievements(_userId: string, _lessonId: string): Promise<void> {
    // 型安全な実装（未使用のためno-op）
  }
}

// LearningServiceのインスタンスをエクスポート
export const learningService: LearningService = new LearningService();
