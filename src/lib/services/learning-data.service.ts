// Learning Data Service - integrates lesson data with mock database
import { createClient } from '@/lib/supabase/client';
import { allLessons, getLessonBySlug, getLessonsByCategory } from '@/data/lessons';
import { categories } from '@/data/lessons/categories';
import type { Lesson, LessonCategory, UserLessonProgress, LearningStats } from '@/lib/types/learning';

export class LearningDataService {
  private static supabase = createClient();

  /**
   * Get all lesson categories
   */
  static async getCategories(): Promise<LessonCategory[]> {
    try {
      // In development, return static data
      if (process.env.NODE_ENV === 'development') {
        return categories;
      }

      const { data, error } = await this.supabase
        .from('lesson_categories')
        .select('*')
        .order('order_index');

      if (error) throw error;
      return data || categories;
    } catch (error) {
      console.warn('Failed to fetch categories from database, using static data:', error);
      return categories;
    }
  }

  /**
   * Get all lessons
   */
  static async getLessons(): Promise<Lesson[]> {
    try {
      // In development, return static data
      if (process.env.NODE_ENV === 'development') {
        return allLessons;
      }

      const { data, error } = await this.supabase
        .from('lessons')
        .select('*')
        .order('category_id, order_index');

      if (error) throw error;
      return data || allLessons;
    } catch (error) {
      console.warn('Failed to fetch lessons from database, using static data:', error);
      return allLessons;
    }
  }

  /**
   * Get lesson by slug
   */
  static async getLessonBySlug(slug: string): Promise<Lesson | null> {
    try {
      // In development, use static data
      if (process.env.NODE_ENV === 'development') {
        return getLessonBySlug(slug) || null;
      }

      const { data, error } = await this.supabase
        .from('lessons')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.warn('Failed to fetch lesson from database, using static data:', error);
      return getLessonBySlug(slug) || null;
    }
  }

  /**
   * Get lessons by category
   */
  static async getLessonsByCategory(categoryId: string): Promise<Lesson[]> {
    try {
      // In development, use static data
      if (process.env.NODE_ENV === 'development') {
        return getLessonsByCategory(categoryId);
      }

      const { data, error } = await this.supabase
        .from('lessons')
        .select('*')
        .eq('category_id', categoryId)
        .order('order_index');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.warn('Failed to fetch lessons by category from database, using static data:', error);
      return getLessonsByCategory(categoryId);
    }
  }

  /**
   * Get user's lesson progress
   */
  static async getUserProgress(userId?: string): Promise<UserLessonProgress[]> {
    if (!userId) return [];

    try {
      const { data, error } = await this.supabase
        .from('user_lesson_progress')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.warn('Failed to fetch user progress:', error);
      // Return mock progress data
      return [
        {
          id: '1',
          userId,
          lessonId: 'lesson-1',
          status: 'completed',
          progressPercentage: 100,
          startedAt: new Date(Date.now() - 86400000).toISOString(),
          completedAt: new Date(Date.now() - 82800000).toISOString(),
          timeSpent: 900,
          lastAccessedAt: new Date(Date.now() - 82800000).toISOString()
        },
        {
          id: '2',
          userId,
          lessonId: 'lesson-2',
          status: 'in_progress',
          progressPercentage: 65,
          startedAt: new Date(Date.now() - 7200000).toISOString(),
          timeSpent: 1200,
          lastAccessedAt: new Date(Date.now() - 3600000).toISOString()
        }
      ];
    }
  }

  /**
   * Get user's learning statistics
   */
  static async getLearningStats(userId?: string): Promise<LearningStats | null> {
    if (!userId) return null;

    try {
      const progress = await this.getUserProgress(userId);
      const allLessonsData = await this.getLessons();
      
      const completedLessons = progress.filter(p => p.status === 'completed').length;
      const totalLessons = allLessonsData.length;
      const totalTimeSpent = progress.reduce((sum, p) => sum + (p.timeSpent || 0), 0);
      
      // Calculate learning streak
      const currentStreak = this.calculateLearningStreak(progress);
      
      // Mock achievements
      const achievements = this.calculateAchievements(completedLessons, currentStreak, totalTimeSpent);

      return {
        completedLessons,
        totalLessons,
        totalTimeSpent,
        currentStreak,
        achievements
      };
    } catch (error) {
      console.warn('Failed to fetch learning stats:', error);
      // Return mock stats
      return {
        completedLessons: 12,
        totalLessons: 85,
        totalTimeSpent: 7200,
        currentStreak: 5,
        achievements: ['first-lesson', 'week-streak', 'category-master']
      };
    }
  }

  /**
   * Update user's lesson progress
   */
  static async updateProgress(
    userId: string,
    lessonId: string,
    updates: Partial<UserLessonProgress>
  ): Promise<boolean> {
    try {
      // Check if progress exists
      const { data: existing } = await this.supabase
        .from('user_lesson_progress')
        .select('id')
        .eq('user_id', userId)
        .eq('lesson_id', lessonId)
        .single();

      if (existing) {
        // Update existing progress
        const { error } = await this.supabase
          .from('user_lesson_progress')
          .update({
            ...updates,
            last_accessed_at: new Date().toISOString()
          })
          .eq('user_id', userId)
          .eq('lesson_id', lessonId);

        if (error) throw error;
      } else {
        // Create new progress record
        const { error } = await this.supabase
          .from('user_lesson_progress')
          .insert({
            user_id: userId,
            lesson_id: lessonId,
            ...updates,
            started_at: new Date().toISOString(),
            last_accessed_at: new Date().toISOString()
          });

        if (error) throw error;
      }

      return true;
    } catch (error) {
      console.warn('Failed to update progress:', error);
      return false;
    }
  }

  /**
   * Start a lesson for a user
   */
  static async startLesson(userId: string, lessonId: string): Promise<boolean> {
    return this.updateProgress(userId, lessonId, {
      status: 'in_progress',
      progressPercentage: 0,
      startedAt: new Date().toISOString()
    });
  }

  /**
   * Complete a lesson for a user
   */
  static async completeLesson(userId: string, lessonId: string, timeSpent?: number): Promise<boolean> {
    return this.updateProgress(userId, lessonId, {
      status: 'completed',
      progressPercentage: 100,
      completedAt: new Date().toISOString(),
      timeSpent
    });
  }

  /**
   * Get recommended lessons for a user
   */
  static async getRecommendedLessons(userId?: string): Promise<Lesson[]> {
    try {
      const allLessonsData = await this.getLessons();
      
      if (!userId) {
        // Return beginner lessons for anonymous users
        return allLessonsData
          .filter(lesson => lesson.difficultyLevel === 'beginner')
          .slice(0, 5);
      }

      const progress = await this.getUserProgress(userId);
      const completedLessonIds = progress
        .filter(p => p.status === 'completed')
        .map(p => p.lessonId);

      // Get lessons not yet completed
      const availableLessons = allLessonsData.filter(
        lesson => !completedLessonIds.includes(lesson.id)
      );

      // Prioritize by difficulty and category progression
      return availableLessons
        .sort((a, b) => {
          // Sort by difficulty first, then by order
          const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
          const aDifficulty = difficultyOrder[a.difficultyLevel];
          const bDifficulty = difficultyOrder[b.difficultyLevel];
          
          if (aDifficulty !== bDifficulty) {
            return aDifficulty - bDifficulty;
          }
          
          return a.orderIndex - b.orderIndex;
        })
        .slice(0, 10);
    } catch (error) {
      console.warn('Failed to get recommended lessons:', error);
      return [];
    }
  }

  /**
   * Calculate learning streak
   */
  private static calculateLearningStreak(progress: UserLessonProgress[]): number {
    const completedProgress = progress
      .filter(p => p.status === 'completed' && p.completedAt)
      .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime());

    if (completedProgress.length === 0) return 0;

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check each day going backwards
    for (let i = 0; i < 30; i++) { // Check up to 30 days
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      
      const hasLessonOnDate = completedProgress.some(p => {
        const completedDate = new Date(p.completedAt!);
        completedDate.setHours(0, 0, 0, 0);
        return completedDate.getTime() === checkDate.getTime();
      });

      if (hasLessonOnDate) {
        streak++;
      } else if (i > 0) { // Allow for today to be empty
        break;
      }
    }

    return streak;
  }

  /**
   * Calculate user achievements
   */
  private static calculateAchievements(
    completedLessons: number,
    streak: number,
    timeSpent: number
  ): string[] {
    const achievements: string[] = [];

    if (completedLessons >= 1) achievements.push('first-lesson');
    if (completedLessons >= 10) achievements.push('ten-lessons');
    if (completedLessons >= 25) achievements.push('quarter-complete');
    if (completedLessons >= 50) achievements.push('half-complete');
    if (completedLessons >= 85) achievements.push('all-complete');

    if (streak >= 3) achievements.push('three-day-streak');
    if (streak >= 7) achievements.push('week-streak');
    if (streak >= 30) achievements.push('month-streak');

    if (timeSpent >= 3600) achievements.push('one-hour');
    if (timeSpent >= 36000) achievements.push('ten-hours');
    if (timeSpent >= 180000) achievements.push('fifty-hours');

    return achievements;
  }

  /**
   * Search lessons
   */
  static async searchLessons(query: string): Promise<Lesson[]> {
    try {
      const allLessonsData = await this.getLessons();
      const searchTerm = query.toLowerCase().trim();
      
      if (!searchTerm) return [];

      return allLessonsData.filter(lesson => 
        lesson.title.toLowerCase().includes(searchTerm) ||
        lesson.description.toLowerCase().includes(searchTerm) ||
        lesson.content.summary.toLowerCase().includes(searchTerm) ||
        lesson.content.keyPoints.some(point => point.toLowerCase().includes(searchTerm))
      );
    } catch (error) {
      console.warn('Failed to search lessons:', error);
      return [];
    }
  }
}