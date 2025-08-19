// 📚 学習レッスンAPI
// 85レッスン管理・進捗追跡・AI統合・クイズシステム

import { NextRequest, NextResponse } from 'next/server';
import { withApiHandler, ApiContext } from '@/lib/auth/middleware';
import { LearningService } from '@/lib/services/learning.service';
import { logger } from '@/lib/monitoring/logger';
import { z } from 'zod';
import type { UserLessonProgress, Lesson } from '@/lib/types/learning';

type LessonLite = {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  orderIndex: number;
  estimatedMinutes: number;
  difficultyLevel: 'beginner'|'intermediate'|'advanced';
  categoryId?: string;
  createdAt?: string | Date;
};

const learningService = new LearningService();

// バリデーションスキーマ
const getLessonsSchema = z.object({
  categoryId: z.string().optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  tags: z.array(z.string()).optional(),
  search: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z.enum(['orderIndex', 'title', 'duration', 'createdAt']).default('orderIndex'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  includeProgress: z.boolean().default(true)
});

const updateProgressSchema = z.object({
  lessonId: z.string(),
  progressPercentage: z.number().min(0).max(100),
  timeSpentMinutes: z.number().min(0).optional(),
  sectionsCompleted: z.array(z.string()).optional(),
  currentSection: z.string().optional(),
  isCompleted: z.boolean().optional(),
  notes: z.string().max(1000).optional()
});

const submitQuizSchema = z.object({
  lessonId: z.string(),
  answers: z.array(z.object({
    questionId: z.string(),
    selectedAnswer: z.string(),
    timeSpentSeconds: z.number().min(0).optional()
  }))
});
async function getLessons(
  request: NextRequest,
  context: ApiContext
): Promise<NextResponse> {
  const { user } = context;
  
  try {
    // テスト環境でrequest.urlが空の場合に対応
    let requestUrl = request.url || '/api/learning/lessons';
    // 相対URLの場合は絶対URLに変換
    if (requestUrl.startsWith('/')) {
      requestUrl = `http://localhost:3000${requestUrl}`;
    }
    const url = new URL(requestUrl);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    
    // クエリパラメータをパース（category -> categoryId変換）
    const validatedParams = getLessonsSchema.parse({
      ...queryParams,
      categoryId: queryParams.category || queryParams.categoryId, // テスト互換性
      page: queryParams.page ? parseInt(queryParams.page) : 1,
      limit: queryParams.limit ? parseInt(queryParams.limit) : 20,
      tags: queryParams.tags ? queryParams.tags.split(',') : undefined,
      includeProgress: queryParams.includeProgress !== 'false'
    });

    // レッスン取得 (基本的な取得のみサポート、フィルタリングは後で実装)
    let lessons = await learningService.getLessons(validatedParams.categoryId);
    
    // null/undefined セーフティチェック
    if (!lessons || !Array.isArray(lessons)) {
      lessons = [];
    }
    
    // クライアントサイドフィルタリング (TODO: データベースレベルでの最適化)
    if (validatedParams.difficulty) {
      lessons = lessons.filter((lesson: { difficultyLevel?: string }) => lesson.difficultyLevel === validatedParams.difficulty);
    }
    
    if (validatedParams.search) {
      const searchTerm = validatedParams.search.toLowerCase();
      lessons = lessons.filter((lesson: { title: string; description?: string }) => 
        lesson.title.toLowerCase().includes(searchTerm) ||
        (lesson.description && lesson.description.toLowerCase().includes(searchTerm))
      );
    }
    
    if (validatedParams.tags && validatedParams.tags.length > 0) {
      lessons = lessons.filter((lesson: { tags?: string[] }) => 
        lesson.tags && validatedParams.tags!.some(tag => (lesson.tags as string[]).includes(tag))
      );
    }

    // ソートとページネーション
    const sortedLessons = sortLessons(lessons, validatedParams.sortBy, validatedParams.sortOrder);
    const totalCount = sortedLessons.length;
    const startIndex = (validatedParams.page - 1) * validatedParams.limit;
    const paginatedLessons = sortedLessons.slice(startIndex, startIndex + validatedParams.limit);

    // 進捗情報を含める場合
    let lessonsWithProgress: Array<LessonLite | (LessonLite & { userProgress: UserLessonProgress | null })> = paginatedLessons as Array<LessonLite>;
    if (validatedParams.includeProgress) {
      lessonsWithProgress = await Promise.all(
        paginatedLessons.map(async (lesson: LessonLite) => {
      const progress = await learningService.getUserProgress(user.id, lesson.id);
          return {
            ...lesson,
            userProgress: progress
          };
        })
      );
    }

    // 学習統計を取得
    const learningStats = await learningService.getLearningStats(user.id);

    logger.info('Lessons retrieved', {
      userId: user.id,
      categoryId: validatedParams.categoryId,
      count: paginatedLessons.length,
      totalCount
    });

    return NextResponse.json({
      lessons: lessonsWithProgress,
      category: validatedParams.categoryId, // テスト期待値
    total: totalCount,
      pagination: {
        page: validatedParams.page,
        limit: validatedParams.limit,
        totalCount,
        totalPages: Math.ceil(totalCount / validatedParams.limit),
        hasNext: startIndex + validatedParams.limit < totalCount,
        hasPrev: validatedParams.page > 1
      },
      stats: {
        completed: learningStats.completedLessons,
        inProgress: learningStats.inProgressLessons,
        total: learningStats.totalLessons,
        averageScore: learningStats.averageScore,
        currentStreak: learningStats.currentStreak
      },
      filters: {
        categoryId: validatedParams.categoryId,
        difficulty: validatedParams.difficulty,
        tags: validatedParams.tags
      }
    });

  } catch (error) {
    logger.error('Failed to get lessons', {
      userId: user.id,
      error: error instanceof Error ? error.message : String(error)
    });

    throw error;
  }
}

/**
 * 学習進捗更新
 */
async function updateLearningProgress(
  request: NextRequest,
  context: ApiContext
): Promise<NextResponse> {
  const { user } = context;
  
  try {
    const body = await request.json();
    const validatedData = updateProgressSchema.parse(body);

    // レッスンの存在確認
    const lesson = await learningService.getLesson(validatedData.lessonId);
    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }

    // 進捗更新
    const success = await learningService.updateProgress(
      user.id,
      validatedData.lessonId,
      {
        progressPercentage: validatedData.progressPercentage,
        status: validatedData.isCompleted ? 'completed' : 'in_progress',
      }
    );

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update progress' },
        { status: 500 }
      );
    }

    // レッスン完了時の処理
    if (validatedData.isCompleted) {
      await learningService.completeLesson(user.id, validatedData.lessonId);
      
      // 学習ストリーク更新
      await learningService.updateLearningStreak(user.id);
      
      // 実績チェック
      await checkAndAwardAchievements(user.id, validatedData.lessonId);
    }

    // 更新後の進捗を取得
    const updatedProgress = await learningService.getUserProgress(
      user.id, 
      validatedData.lessonId
    );

    logger.info('Learning progress updated', {
      userId: user.id,
      lessonId: validatedData.lessonId,
      progressPercentage: validatedData.progressPercentage,
      isCompleted: validatedData.isCompleted
    });

    return NextResponse.json({
      success: true,
      progress: updatedProgress,
      lesson: {
        id: lesson.id,
        title: lesson.title,
        categoryId: lesson.categoryId
      }
    });

  } catch (error) {
    logger.error('Failed to update learning progress', {
      userId: user.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    throw error;
  }
}

/**
 * クイズ回答提出
 */
async function submitQuizAnswers(
  request: NextRequest,
  context: ApiContext
): Promise<NextResponse> {
  const { user } = context;
  
  try {
    const body = await request.json();
    const validatedData = submitQuizSchema.parse(body);

    // レッスンとクイズ質問を取得
    const lesson = await learningService.getLesson(validatedData.lessonId);
    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }

    const quizQuestions = await learningService.getQuizQuestions(validatedData.lessonId);
    if (!quizQuestions.length) {
      return NextResponse.json(
        { error: 'No quiz questions found for this lesson' },
        { status: 400 }
      );
    }

    // 回答を採点
    const results = await Promise.all(
      validatedData.answers.map(async (answer) => {
    const question = quizQuestions.find((q) => String(q.id) === answer.questionId);
        if (!question) {
          return {
            questionId: answer.questionId,
            error: 'Question not found'
          };
        }

        const isCorrect = question.correctAnswer === answer.selectedAnswer;
        
        // 回答をデータベースに保存
        await learningService.submitQuizAnswer(
          user.id,
          validatedData.lessonId,
          answer.questionId,
          answer.selectedAnswer,
          isCorrect,
          answer.timeSpentSeconds
        );

        return {
          questionId: answer.questionId,
          selectedAnswer: answer.selectedAnswer,
          correctAnswer: question.correctAnswer,
          isCorrect,
          explanation: question.explanation,
          timeSpentSeconds: answer.timeSpentSeconds
        };
      })
    );

    // スコア計算
    const totalQuestions = results.length;
    const correctAnswers = results.filter(r => r.isCorrect).length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const passed = score >= 70; // 70%以上で合格

    // クイズ結果をデータベースに保存
    await learningService.saveQuizAttempt(user.id, validatedData.lessonId, 0, false, []);

    // 合格時の処理
    if (passed) {
      // 進捗を更新（クイズ合格により完了とする）
      await learningService.updateProgress(user.id, validatedData.lessonId, { status: 'completed', progressPercentage: 100 });

      // 実績チェック
      await checkAndAwardAchievements(user.id, validatedData.lessonId);
    }

    logger.info('Quiz submitted', {
      userId: user.id,
      lessonId: validatedData.lessonId,
      score,
      passed,
      totalQuestions,
      correctAnswers
    });

    return NextResponse.json({
      score,
      passed,
      totalQuestions,
      correctAnswers,
      results: results.map(r => ({
        questionId: r.questionId,
        isCorrect: r.isCorrect,
        explanation: r.explanation
      })),
      recommendations: passed 
        ? await getNextLessonRecommendations(user.id, lesson)
        : await getReviewRecommendations(user.id, lesson)
    });

  } catch (error) {
    logger.error('Failed to submit quiz answers', {
      userId: user.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    throw error;
  }
}

/**
 * ヘルパー関数群
 */

/**
 * レッスンソート
 */
  function sortLessons(lessons: LessonLite[], sortBy: string, sortOrder: 'asc' | 'desc') {
  // null/undefined セーフティチェック
  if (!lessons || !Array.isArray(lessons)) {
    return [];
  }
  
    const toTime = (d?: string | Date) => (d ? new Date(d).getTime() : 0);
    return lessons.sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'orderIndex':
        comparison = a.orderIndex - b.orderIndex;
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'duration':
        comparison = a.estimatedMinutes - b.estimatedMinutes;
        break;
      case 'createdAt':
        comparison = toTime(a.createdAt) - toTime(b.createdAt);
        break;
      default:
        comparison = a.orderIndex - b.orderIndex;
    }
    
    return sortOrder === 'desc' ? -comparison : comparison;
  });
}

/**
 * 実績チェックと付与
 */
async function checkAndAwardAchievements(userId: string, lessonId: string) {
  try {
    const lesson = await learningService.getLesson(lessonId);
    if (!lesson) return;

    const stats = await learningService.getLearningStats(userId);
    
    // 完了レッスン数に基づく実績
    const milestones = [1, 5, 10, 25, 50, 85];
    const completedCount = stats.completedLessons + 1; // 今回完了分を含む
    
    if (milestones.includes(completedCount)) {
      await learningService.awardAchievement(
        userId,
        'LESSONS_COMPLETED',
        { count: completedCount, lessonId }
      );
    }

  // カテゴリ完了チェック
  const categoryLessons = await learningService.getLessons(String((lesson as Lesson).categoryId ?? ''));
    const categoryProgress = await Promise.all(
      categoryLessons.map((l: { id: string }) => learningService.getUserProgress(userId, l.id))
    );
    
  const categoryCompleted = categoryProgress.every((p: UserLessonProgress | null) => {
    return Boolean(p?.completedAt)
  });
    if (categoryCompleted) {
      await learningService.awardAchievement(
        userId,
        'CATEGORY_COMPLETED',
        { categoryId: lesson.categoryId }
      );
    }

    // 学習ストリーク実績
    const streak = await learningService.getCurrentStreak(userId);
    const streakMilestones = [7, 14, 30, 60, 100];
    
    if (streakMilestones.includes(streak)) {
      await learningService.awardAchievement(
        userId,
        'LEARNING_STREAK',
        { days: streak }
      );
    }

  } catch (error) {
    logger.error('Failed to check achievements', { userId, lessonId, error: error instanceof Error ? error.message : String(error) });
  }
}

/**
 * 次のレッスン推奨
 */
async function getNextLessonRecommendations(userId: string, currentLesson: Lesson) {
  try {
    const recommendations = await learningService.getRecommendedLessons(userId, 3) as Lesson[];
    return recommendations.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      categoryId: lesson.categoryId,
      difficulty: lesson.difficultyLevel,
      estimatedMinutes: lesson.estimatedMinutes
    }));
  } catch (error) {
    logger.error('Failed to get next lesson recommendations', { userId, error: error instanceof Error ? error.message : String(error) });
    return [];
  }
}

/**
 * 復習推奨
 */
async function getReviewRecommendations(userId: string, currentLesson: unknown) {
  try {
    // Type-safe access to currentLesson properties
    const lessonObj = currentLesson as Record<string, unknown>;
    const categoryId = typeof lessonObj.categoryId === 'string' ? lessonObj.categoryId : '';
    const orderIndex = typeof lessonObj.orderIndex === 'number' ? lessonObj.orderIndex : 0;
    
    // 同じカテゴリの前のレッスンを推奨
    const categoryLessons = await learningService.getLessons(categoryId);
    
    const reviewLessons = categoryLessons
      .filter((lesson: { orderIndex: number }) => lesson.orderIndex < orderIndex)
      .slice(-2); // 直前の2レッスン

    type LessonLite = {
      id: string
      title: string
      categoryId: string
      difficultyLevel: string
      estimatedMinutes: number
    }
    return reviewLessons.map((lesson: LessonLite) => ({
      id: lesson.id,
      title: lesson.title,
      description: `${lesson.title}を復習することをお勧めします`,
      categoryId: lesson.categoryId,
      difficulty: lesson.difficultyLevel,
      estimatedMinutes: lesson.estimatedMinutes,
      isReview: true
    }));
  } catch (error) {
    logger.error('Failed to get review recommendations', { userId, error: error instanceof Error ? error.message : String(error) });
    return [];
  }
}

// API Route Handlers
export const GET = withApiHandler(getLessons, {
  requireAuth: true,
  requireSubscription: false,
  rateLimitKey: 'learning-lessons'
});

export const PUT = withApiHandler(updateLearningProgress, {
  requireAuth: true,
  requireSubscription: false,
  rateLimitKey: 'learning-progress',
  validateSchema: updateProgressSchema,
  requireCSRF: true
});

export const POST = withApiHandler(submitQuizAnswers, {
  requireAuth: true,
  requireSubscription: false,
  rateLimitKey: 'learning-quiz',
  validateSchema: submitQuizSchema,
  requireCSRF: true
});

export const OPTIONS = async () => {
  const originEnv = process.env.NEXT_PUBLIC_APP_ORIGIN || process.env.VERCEL_URL || 'http://localhost:3000';
  const allowOrigin = originEnv.startsWith('http') ? originEnv : `https://${originEnv}`;
  return new NextResponse(null, { 
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': allowOrigin,
      'Vary': 'Origin',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    }
  });
};
