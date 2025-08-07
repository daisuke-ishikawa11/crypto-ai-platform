// 📂 学習カテゴリAPI
// カテゴリ管理・統計・進捗集計・学習パス生成

import { NextRequest, NextResponse } from 'next/server';
import { withApiHandler, ApiContext } from '@/lib/auth/middleware';
import { LearningService } from '@/lib/services/learning.service';
import { logger } from '@/lib/monitoring/logger';
import { z } from 'zod';

// バリデーションスキーマ
const getCategoriesSchema = z.object({
  includeStats: z.boolean().default(true),
  includeProgress: z.boolean().default(true),
  includeRecommendations: z.boolean().default(false)
});

const learningService = new LearningService();

/**
 * カテゴリ一覧取得
 */
async function getCategories(
  request: NextRequest,
  context: ApiContext
): Promise<NextResponse> {
  const { user } = context;
  
  try {
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    
    const validatedParams = getCategoriesSchema.parse({
      includeStats: queryParams.includeStats !== 'false',
      includeProgress: queryParams.includeProgress !== 'false',
      includeRecommendations: queryParams.includeRecommendations === 'true'
    });

    // カテゴリ基本情報を取得
    const categories = await learningService.getCategories();

    // 各カテゴリの詳細情報を並列取得
    const categoriesWithDetails = await Promise.all(
      categories.map(async (category) => {
        const categoryData: any = { ...category };

        // レッスン一覧取得
        const lessons = await learningService.getLessons({ categoryId: category.id });
        categoryData.lessonCount = lessons.length;
        categoryData.totalDuration = lessons.reduce((sum, lesson) => sum + lesson.estimatedMinutes, 0);

        // 統計情報を含める場合
        if (validatedParams.includeStats) {
          const stats = await getCategoryStats(category.id);
          categoryData.stats = stats;
        }

        // ユーザー進捗を含める場合
        if (validatedParams.includeProgress) {
          const progress = await getUserCategoryProgress(user.id, category.id, lessons);
          categoryData.userProgress = progress;
        }

        // 推奨情報を含める場合
        if (validatedParams.includeRecommendations) {
          const recommendations = await getCategoryRecommendations(user.id, category, lessons);
          categoryData.recommendations = recommendations;
        }

        return categoryData;
      })
    );

    // 全体統計
    const overallStats = validatedParams.includeStats ? 
      await getOverallLearningStats(user.id) : null;

    logger.info('Categories retrieved', {
      userId: user.id,
      categoriesCount: categories.length,
      includeStats: validatedParams.includeStats,
      includeProgress: validatedParams.includeProgress
    });

    return NextResponse.json({
      categories: categoriesWithDetails,
      overallStats,
      metadata: {
        totalCategories: categories.length,
        totalLessons: categoriesWithDetails.reduce((sum, cat) => sum + cat.lessonCount, 0),
        totalDuration: categoriesWithDetails.reduce((sum, cat) => sum + cat.totalDuration, 0),
        lastUpdated: new Date().toISOString()
      }
    });

  } catch (error) {
    logger.error('Failed to get categories', {
      userId: user.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    throw error;
  }
}

/**
 * 学習パス生成
 */
async function generateLearningPath(
  request: NextRequest,
  context: ApiContext
): Promise<NextResponse> {
  const { user } = context;
  
  try {
    const body = await request.json();
    const { 
      userLevel = 'beginner',
      interests = [],
      timeAvailable = 30, // minutes per day
      goalType = 'comprehensive' // 'comprehensive' | 'focused' | 'practical'
    } = body;

    // ユーザーの現在の進捗を取得
    const userStats = await learningService.getLearningStats(user.id);
    
    // カテゴリとレッスンを取得
    const categories = await learningService.getCategories();
    const allLessons = await learningService.getLessons();

    // 学習パス生成アルゴリズム
    const learningPath = generateOptimalLearningPath(
      allLessons,
      categories,
      userStats,
      {
        userLevel,
        interests,
        timeAvailable,
        goalType
      }
    );

    // 推定完了時間を計算
    const estimatedWeeks = Math.ceil(
      learningPath.reduce((sum, lesson) => sum + lesson.estimatedMinutes, 0) / 
      (timeAvailable * 7)
    );

    logger.info('Learning path generated', {
      userId: user.id,
      pathLength: learningPath.length,
      estimatedWeeks,
      userLevel,
      goalType
    });

    return NextResponse.json({
      learningPath: learningPath.map((lesson, index) => ({
        ...lesson,
        pathOrder: index + 1,
        estimatedStartWeek: Math.floor((learningPath.slice(0, index).reduce((sum, l) => sum + l.estimatedMinutes, 0)) / (timeAvailable * 7)) + 1
      })),
      metadata: {
        totalLessons: learningPath.length,
        estimatedWeeks,
        totalHours: Math.round(learningPath.reduce((sum, lesson) => sum + lesson.estimatedMinutes, 0) / 60),
        dailyTimeRequired: timeAvailable,
        goalType,
        userLevel
      },
      milestones: generateMilestones(learningPath, timeAvailable),
      tips: generateLearningTips(userLevel, goalType, timeAvailable)
    });

  } catch (error) {
    logger.error('Failed to generate learning path', {
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
 * カテゴリ統計取得
 */
async function getCategoryStats(categoryId: string) {
  try {
    // 実際の実装では、データベースから統計を取得
    return {
      averageCompletionRate: 75,
      averageRating: 4.2,
      totalEnrollments: 1250,
      popularityRank: 2,
      difficultyDistribution: {
        beginner: 40,
        intermediate: 45,
        advanced: 15
      }
    };
  } catch (error) {
    logger.error('Failed to get category stats', { categoryId, error: error instanceof Error ? error.message : String(error) });
    return null;
  }
}

/**
 * ユーザーカテゴリ進捗取得
 */
async function getUserCategoryProgress(userId: string, categoryId: string, lessons: any[]) {
  try {
    const progressList = await Promise.all(
      lessons.map(lesson => learningService.getUserProgress(userId, lesson.id))
    );

    const completedLessons = progressList.filter(p => p?.isCompleted).length;
    const inProgressLessons = progressList.filter(p => p && !p.isCompleted && p.progressPercentage > 0).length;
    const totalTimeSpent = progressList.reduce((sum, p) => sum + (p?.timeSpentMinutes || 0), 0);
    
    const overallProgress = lessons.length > 0 ? 
      Math.round((completedLessons / lessons.length) * 100) : 0;

    return {
      totalLessons: lessons.length,
      completedLessons,
      inProgressLessons,
      notStartedLessons: lessons.length - completedLessons - inProgressLessons,
      overallProgress,
      totalTimeSpent,
      averageTimePerLesson: completedLessons > 0 ? Math.round(totalTimeSpent / completedLessons) : 0,
      lastAccessedAt: progressList
        .filter(p => p?.lastAccessedAt)
        .sort((a, b) => new Date(b!.lastAccessedAt!).getTime() - new Date(a!.lastAccessedAt!).getTime())[0]?.lastAccessedAt
    };

  } catch (error) {
    logger.error('Failed to get user category progress', { userId, categoryId, error: error instanceof Error ? error.message : String(error) });
    return null;
  }
}

/**
 * カテゴリ推奨情報取得
 */
async function getCategoryRecommendations(userId: string, category: any, lessons: any[]) {
  try {
    const userStats = await learningService.getLearningStats(userId);
    
    // 推奨理由を生成
    const reasons = [];
    
    if (userStats.totalCompletedLessons === 0) {
      reasons.push("初心者に最適な基礎的な内容から始められます");
    }
    
    if (category.id === '1') { // 投資基礎
      reasons.push("すべての投資活動の基盤となる重要な知識です");
    }
    
    if (lessons.some(l => l.difficultyLevel === 'beginner')) {
      reasons.push("段階的に学べる初級レッスンが豊富です");
    }

    // 次に学ぶべきレッスン
    const nextLesson = lessons.find(lesson => 
      lessons.every(l => l.orderIndex >= lesson.orderIndex)
    );

    // 推定完了時間
    const totalMinutes = lessons.reduce((sum, lesson) => sum + lesson.estimatedMinutes, 0);
    const estimatedDays = Math.ceil(totalMinutes / 30); // 1日30分として計算

    return {
      priority: calculateCategoryPriority(category, userStats),
      reasons,
      nextLesson: nextLesson ? {
        id: nextLesson.id,
        title: nextLesson.title,
        slug: nextLesson.slug,
        estimatedMinutes: nextLesson.estimatedMinutes
      } : null,
      estimatedDays,
      difficulty: category.defaultDifficulty || 'beginner',
      prerequisites: category.prerequisites || []
    };

  } catch (error) {
    logger.error('Failed to get category recommendations', { userId, categoryId: category.id, error: error instanceof Error ? error.message : String(error) });
    return null;
  }
}

/**
 * 全体学習統計取得
 */
async function getOverallLearningStats(userId: string) {
  try {
    const stats = await learningService.getLearningStats(userId);
    const achievements = await learningService.getUserAchievements(userId);
    const currentStreak = await learningService.getCurrentStreak(userId);

    return {
      ...stats,
      achievements: achievements.length,
      currentStreak,
      learningVelocity: calculateLearningVelocity(stats),
      skillLevel: determineSkillLevel(stats),
      nextMilestone: calculateNextMilestone(stats)
    };

  } catch (error) {
    logger.error('Failed to get overall learning stats', { userId, error: error instanceof Error ? error.message : String(error) });
    return null;
  }
}

/**
 * 最適学習パス生成
 */
function generateOptimalLearningPath(
  allLessons: any[],
  categories: any[],
  userStats: any,
  preferences: any
) {
  const { userLevel, interests, goalType } = preferences;
  
  // 難易度に基づくフィルタリング
  const suitableLessons = allLessons.filter(lesson => {
    if (userLevel === 'beginner') {
      return lesson.difficultyLevel === 'beginner' || 
             (lesson.difficultyLevel === 'intermediate' && lesson.orderIndex <= 3);
    } else if (userLevel === 'intermediate') {
      return lesson.difficultyLevel !== 'advanced' || lesson.orderIndex <= 2;
    }
    return true; // advanced users can access all
  });

  // 目標タイプに基づく優先度設定
  const prioritizedLessons = suitableLessons.map(lesson => ({
    ...lesson,
    priority: calculateLessonPriority(lesson, goalType, interests, userStats)
  }));

  // 優先度でソート
  prioritizedLessons.sort((a, b) => b.priority - a.priority);

  // 学習順序を調整（前提条件を考慮）
  const orderedPath = adjustLearningOrder(prioritizedLessons, categories);

  return orderedPath.slice(0, 50); // 最大50レッスン
}

/**
 * レッスン優先度計算
 */
function calculateLessonPriority(lesson: any, goalType: string, interests: string[], userStats: any): number {
  let priority = lesson.orderIndex * 0.1; // 基本順序

  // 目標タイプに基づく重み付け
  if (goalType === 'practical' && lesson.tags?.includes('practical')) {
    priority += 2.0;
  } else if (goalType === 'comprehensive') {
    priority += 1.0;
  }

  // 興味に基づく重み付け
  if (interests.some(interest => lesson.tags?.includes(interest))) {
    priority += 1.5;
  }

  // カテゴリ重要度
  const categoryWeights: Record<string, number> = {
    '1': 3.0, // 投資基礎・金融リテラシー
    '2': 2.5, // 暗号通貨の基礎
    '3': 2.0, // トレーディング基礎
    '4': 1.5, // DeFi・NFT入門
    '5': 1.0  // 高度な投資戦略
  };

  priority += categoryWeights[lesson.categoryId] || 1.0;

  return priority;
}

/**
 * 学習順序調整
 */
function adjustLearningOrder(lessons: any[], categories: any[]) {
  // カテゴリ順序を保持しつつ、各カテゴリ内ではorderIndexに従う
  const categoryOrder = ['1', '2', '3', '4', '5'];
  
  return categoryOrder.flatMap(categoryId => 
    lessons
      .filter(lesson => lesson.categoryId === categoryId)
      .sort((a, b) => a.orderIndex - b.orderIndex)
  );
}

/**
 * マイルストーン生成
 */
function generateMilestones(learningPath: any[], dailyTime: number) {
  const milestones = [];
  const cumulativeMinutes = 0;
  
  const milestonePoints = [25, 50, 75]; // パーセンテージ
  
  milestonePoints.forEach(percent => {
    const targetMinutes = (learningPath.reduce((sum, l) => sum + l.estimatedMinutes, 0) * percent) / 100;
    const targetWeek = Math.ceil(targetMinutes / (dailyTime * 7));
    
    milestones.push({
      percentage: percent,
      week: targetWeek,
      title: `学習進捗 ${percent}% 達成`,
      description: `約${targetWeek}週間で達成予定`,
      reward: percent === 100 ? "全コース修了証明書" : `${percent}%完了バッジ`
    });
  });
  
  return milestones;
}

/**
 * 学習ティップス生成
 */
function generateLearningTips(userLevel: string, goalType: string, dailyTime: number) {
  const tips = [
    "毎日同じ時間に学習することで習慣化しやすくなります",
    "理解できない部分は飛ばさずに、AI説明機能を活用してください",
    "クイズで理解度をチェックし、不正解の場合は復習を心がけてください"
  ];

  if (dailyTime < 20) {
    tips.push("短時間でも継続が重要です。隙間時間を有効活用しましょう");
  }

  if (userLevel === 'beginner') {
    tips.push("基礎をしっかり固めることが、後の理解に大きく影響します");
  }

  return tips;
}

/**
 * カテゴリ優先度計算
 */
function calculateCategoryPriority(category: any, userStats: any): number {
  // 基本優先度
  const basePriority = 6 - parseInt(category.id); // id 1が最高優先度
  
  // ユーザーレベルに応じた調整
  if (userStats.totalCompletedLessons === 0 && category.id === '1') {
    return 5; // 初心者は投資基礎から
  }
  
  return basePriority;
}

/**
 * 学習速度計算
 */
function calculateLearningVelocity(stats: any): string {
  if (!stats.averageTimePerLesson || stats.totalCompletedLessons < 3) {
    return 'unknown';
  }
  
  const avgMinutes = stats.averageTimePerLesson;
  if (avgMinutes < 15) return 'fast';
  if (avgMinutes < 25) return 'normal';
  return 'careful';
}

/**
 * スキルレベル判定
 */
function determineSkillLevel(stats: any): string {
  const completed = stats.totalCompletedLessons;
  if (completed < 5) return 'beginner';
  if (completed < 25) return 'intermediate';
  if (completed < 60) return 'advanced';
  return 'expert';
}

/**
 * 次のマイルストーン計算
 */
function calculateNextMilestone(stats: any): any {
  const milestones = [
    { lessons: 5, title: "学習開始", badge: "スターター" },
    { lessons: 15, title: "基礎習得", badge: "基礎マスター" },
    { lessons: 35, title: "中級到達", badge: "中級者" },
    { lessons: 60, title: "上級到達", badge: "上級者" },
    { lessons: 85, title: "全課程修了", badge: "エキスパート" }
  ];
  
  const completed = stats.totalCompletedLessons;
  const nextMilestone = milestones.find(m => m.lessons > completed);
  
  return nextMilestone || milestones[milestones.length - 1];
}

// API Route Handlers
export const GET = withApiHandler(getCategories, {
  requireAuth: true,
  requireSubscription: false,
  rateLimitKey: 'learning-categories'
});

export const POST = withApiHandler(generateLearningPath, {
  requireAuth: true,
  requireSubscription: false,
  rateLimitKey: 'learning-path'
});

export const OPTIONS = async () => {
  return new NextResponse(null, { 
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
};