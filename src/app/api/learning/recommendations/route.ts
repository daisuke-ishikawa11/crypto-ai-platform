// 🎯 AI学習推奨API
// チャット統合・個人化レコメンド・学習パス生成

import { NextRequest, NextResponse } from 'next/server';
import { withApiHandler, ApiContext } from '@/lib/auth/middleware';
import { UnifiedAIService } from '@/lib/ai/unified-ai-service';
import { LearningService } from '@/lib/services/learning.service';
import { logger } from '@/lib/monitoring/logger';
import { z } from 'zod';

// バリデーションスキーマ
const aiRecommendationSchema = z.object({
  query: z.string().min(1).max(500),
  chatContext: z.string().optional(),
  currentLessonId: z.string().optional(),
  userGoals: z.array(z.string()).optional(),
  timeAvailable: z.number().min(5).max(180).default(30), // minutes
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  includeReviewSuggestions: z.boolean().default(true)
});

const personalizedRecommendationSchema = z.object({
  baseFilters: z.object({
    categoryId: z.string().optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    maxDuration: z.number().min(5).max(120).optional()
  }).optional(),
  preferences: z.object({
    learningStyle: z.enum(['visual', 'reading', 'practical', 'mixed']).default('mixed'),
    goals: z.array(z.string()).optional(),
    weakAreas: z.array(z.string()).optional()
  }).optional(),
  limit: z.number().min(1).max(20).default(10)
});

const aiService = new UnifiedAIService();
const learningService = new LearningService();

/**
 * AIベース学習推奨生成
 */
async function generateAIRecommendations(
  request: NextRequest,
  context: ApiContext
): Promise<NextResponse> {
  const { user } = context;
  
  try {
    const body = await request.json();
    const validatedData = aiRecommendationSchema.parse(body);

    // AI使用量制限チェック
    const usageLimits = await checkAIRecommendationLimits(user.id);
    if (usageLimits.exceeded) {
      return NextResponse.json(
        { 
          error: 'AI recommendation limit exceeded',
          limits: usageLimits,
          upgradeUrl: '/pricing'
        },
        { status: 429 }
      );
    }

    // ユーザーの学習状況を取得
    const userStats = await learningService.getLearningStats(user.id);
    const recentLessons = await learningService.getRecentLessons(user.id, 5);
    
    // チャットコンテキストを構築
    const chatContext = buildChatContext(
      validatedData.chatContext,
      recentLessons,
      userStats,
      validatedData.currentLessonId
    );

    // AI推奨生成
    const aiRecommendations = await aiService.generateLearningRecommendations(
      user.id,
      chatContext,
      validatedData.query
    );

    // 時間制約を考慮した調整
    const timeAdjustedRecommendations = adjustRecommendationsForTime(
      aiRecommendations.recommendedLessons,
      validatedData.timeAvailable
    );

    // 復習提案を含める場合
    let reviewSuggestions: any[] = [];
    if (validatedData.includeReviewSuggestions) {
      reviewSuggestions = await generateReviewSuggestions(user.id, userStats);
    }

    // 学習効果予測
    const effectivenessScore = calculateLearningEffectiveness(
      timeAdjustedRecommendations,
      userStats,
      validatedData.timeAvailable
    );

    // AI使用量を記録
    await recordAIRecommendationUsage(user.id);

    logger.info('AI learning recommendations generated', {
      userId: user.id,
      query: validatedData.query,
      recommendationsCount: timeAdjustedRecommendations.length,
      effectivenessScore
    });

    return NextResponse.json({
      recommendations: timeAdjustedRecommendations,
      learningPath: aiRecommendations.learningPath,
      nextSteps: aiRecommendations.nextSteps,
      reviewSuggestions,
      metadata: {
        query: validatedData.query,
        effectivenessScore,
        timeAvailable: validatedData.timeAvailable,
        totalEstimatedMinutes: timeAdjustedRecommendations.reduce(
          (sum, lesson) => sum + lesson.estimatedMinutes, 0
        ),
        aiConfidence: calculateAIConfidence(aiRecommendations),
        generatedAt: new Date().toISOString()
      },
      usage: {
        remaining: usageLimits.remaining - 1,
        resetDate: usageLimits.resetDate
      }
    });

  } catch (error) {
    logger.error('Failed to generate AI recommendations', {
      userId: user.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    throw error;
  }
}

/**
 * 個人化推奨生成
 */
async function generatePersonalizedRecommendations(
  request: NextRequest,
  context: ApiContext
): Promise<NextResponse> {
  const { user } = context;
  
  try {
    const body = await request.json();
    const validatedData = personalizedRecommendationSchema.parse(body);

    // ユーザープロファイルを取得
    const userProfile = await learningService.getUserLearningProfile(user.id);
    const userStats = await learningService.getLearningStats(user.id);
    const completedLessons = await learningService.getCompletedLessons(user.id);

    // 基本フィルタリング
    let candidateLessons = await learningService.getLessons(validatedData.baseFilters);

    // 既に完了したレッスンを除外
    candidateLessons = candidateLessons.filter(
      lesson => !completedLessons.some(completed => completed.lessonId === lesson.id)
    );

    // 個人化スコアリング
    const personalizedLessons = candidateLessons.map(lesson => {
      const score = calculatePersonalizationScore(
        lesson,
        userProfile,
        userStats,
        validatedData.preferences
      );

      return {
        ...lesson,
        personalizationScore: score,
        recommendationReasons: generatePersonalizationReasons(
          lesson,
          userProfile,
          validatedData.preferences
        )
      };
    });

    // スコア順でソート
    personalizedLessons.sort((a, b) => b.personalizationScore - a.personalizationScore);

    // 学習順序を調整（前提条件を考慮）
    const orderedRecommendations = adjustLearningOrder(
      personalizedLessons.slice(0, validatedData.limit),
      userStats
    );

    // 学習プランを生成
    const learningPlan = generateLearningPlan(orderedRecommendations, validatedData.preferences);

    logger.info('Personalized recommendations generated', {
      userId: user.id,
      candidateCount: candidateLessons.length,
      recommendationCount: orderedRecommendations.length,
      averageScore: orderedRecommendations.reduce((sum, l) => sum + l.personalizationScore, 0) / orderedRecommendations.length
    });

    return NextResponse.json({
      recommendations: orderedRecommendations,
      learningPlan,
      userProfile: {
        level: userProfile.level,
        strengths: userProfile.strengths,
        weaknesses: userProfile.weaknesses,
        learningStyle: userProfile.learningStyle,
        preferredTopics: userProfile.preferredTopics
      },
      analytics: {
        totalCandidates: candidateLessons.length,
        averagePersonalizationScore: orderedRecommendations.reduce(
          (sum, l) => sum + l.personalizationScore, 0
        ) / orderedRecommendations.length,
        difficultyDistribution: calculateDifficultyDistribution(orderedRecommendations),
        topicDistribution: calculateTopicDistribution(orderedRecommendations)
      }
    });

  } catch (error) {
    logger.error('Failed to generate personalized recommendations', {
      userId: user.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    throw error;
  }
}

/**
 * 学習パフォーマンス分析
 */
async function analyzeLearningPerformance(
  request: NextRequest,
  context: ApiContext
): Promise<NextResponse> {
  const { user } = context;
  
  try {
    const userStats = await learningService.getLearningStats(user.id);
    const completedLessons = await learningService.getCompletedLessons(user.id);
    const quizResults = await learningService.getAllQuizResults(user.id);
    const streakData = await learningService.getCurrentStreak(user.id);

    // パフォーマンス分析
    const performance = {
      overall: {
        completionRate: calculateOverallCompletionRate(userStats),
        averageQuizScore: calculateAverageQuizScore(quizResults),
        learningVelocity: calculateLearningVelocity(completedLessons),
        consistency: calculateConsistency(completedLessons, streakData),
        retentionRate: await calculateRetentionRate(user.id)
      },
      byCategory: await analyzeCategoryPerformance(user.id, completedLessons),
      byDifficulty: analyzeDifficultyPerformance(completedLessons, quizResults),
      timeAnalysis: analyzeTimePatterns(completedLessons),
      strengths: identifyStrengths(completedLessons, quizResults),
      weaknesses: identifyWeaknesses(completedLessons, quizResults),
      recommendations: generatePerformanceRecommendations(userStats, completedLessons, quizResults)
    };

    // 改善提案を生成
    const improvementPlan = generateImprovementPlan(performance, userStats);

    logger.info('Learning performance analyzed', {
      userId: user.id,
      overallScore: performance.overall.completionRate,
      strengths: performance.strengths.length,
      weaknesses: performance.weaknesses.length
    });

    return NextResponse.json({
      performance,
      improvementPlan,
      benchmarks: await getBenchmarkData(userStats),
      insights: generatePerformanceInsights(performance)
    });

  } catch (error) {
    logger.error('Failed to analyze learning performance', {
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
 * チャットコンテキスト構築
 */
function buildChatContext(
  chatContext: string | undefined,
  recentLessons: any[],
  userStats: any,
  currentLessonId?: string
): string {
  let context = chatContext || '';
  
  context += `\nユーザー学習状況: 完了レッスン数 ${userStats.totalCompletedLessons}/85`;
  
  if (recentLessons.length > 0) {
    context += `\n最近の学習: ${recentLessons.map(l => l.title).join(', ')}`;
  }
  
  if (currentLessonId) {
    context += `\n現在のレッスン: ${currentLessonId}`;
  }
  
  return context;
}

/**
 * 時間制約に基づく推奨調整
 */
function adjustRecommendationsForTime(recommendations: any[], timeAvailable: number): any[] {
  // 利用可能時間内で完了できるレッスンを優先
  const adjusted = recommendations.map(lesson => {
    let timeFitScore = 1;
    
    if (lesson.estimatedMinutes <= timeAvailable) {
      timeFitScore = 1.5; // 時間内に完了可能
    } else if (lesson.estimatedMinutes <= timeAvailable * 1.2) {
      timeFitScore = 1.2; // 少し超過
    } else {
      timeFitScore = 0.8; // 大幅超過
    }
    
    return {
      ...lesson,
      timeFitScore,
      adjustedScore: lesson.relevanceScore * timeFitScore
    };
  });

  return adjusted.sort((a, b) => b.adjustedScore - a.adjustedScore);
}

/**
 * 復習提案生成
 */
async function generateReviewSuggestions(userId: string, userStats: any): Promise<any[]> {
  try {
    // 低スコアのクイズがあるレッスンを復習対象とする
    const lowScoreLessons = await learningService.getLowScoreLessons(userId, 70); // 70%未満
    
    return lowScoreLessons.slice(0, 3).map(lesson => ({
      ...lesson,
      reviewReason: 'クイズの理解度を向上させるための復習',
      priority: 'high',
      estimatedReviewTime: Math.ceil(lesson.estimatedMinutes * 0.6) // 復習は60%の時間
    }));
  } catch (error) {
    logger.error('Failed to generate review suggestions', { userId, error: error instanceof Error ? error.message : String(error) });
    return [];
  }
}

/**
 * 学習効果スコア計算
 */
function calculateLearningEffectiveness(
  recommendations: any[],
  userStats: any,
  timeAvailable: number
): number {
  if (recommendations.length === 0) return 0;
  
  let score = 0;
  
  // 推奨品質スコア
  const avgRelevance = recommendations.reduce((sum, r) => sum + r.relevanceScore, 0) / recommendations.length;
  score += avgRelevance * 0.4;
  
  // 時間効率スコア
  const timeEfficiency = Math.min(1, timeAvailable / recommendations.reduce((sum, r) => sum + r.estimatedMinutes, 0));
  score += timeEfficiency * 0.3;
  
  // 難易度適合性スコア
  const levelMatch = recommendations.filter(r => 
    (userStats.averageLevel === 'beginner' && r.difficultyLevel === 'beginner') ||
    (userStats.averageLevel === 'intermediate' && ['beginner', 'intermediate'].includes(r.difficultyLevel)) ||
    (userStats.averageLevel === 'advanced')
  ).length / recommendations.length;
  score += levelMatch * 0.3;
  
  return Math.round(score * 100);
}

/**
 * AI信頼度計算
 */
function calculateAIConfidence(aiRecommendations: any): number {
  const hasRecommendations = aiRecommendations.recommendedLessons.length > 0;
  const hasPath = aiRecommendations.learningPath.length > 10;
  const hasSteps = aiRecommendations.nextSteps.length > 0;
  
  let confidence = 0;
  if (hasRecommendations) confidence += 40;
  if (hasPath) confidence += 30;
  if (hasSteps) confidence += 30;
  
  return confidence;
}

/**
 * 個人化スコア計算
 */
function calculatePersonalizationScore(
  lesson: any,
  userProfile: any,
  userStats: any,
  preferences: any
): number {
  let score = 0;
  
  // 難易度適合性
  if (lesson.difficultyLevel === userProfile.level) {
    score += 3;
  } else if (
    (userProfile.level === 'beginner' && lesson.difficultyLevel === 'intermediate') ||
    (userProfile.level === 'intermediate' && lesson.difficultyLevel === 'advanced')
  ) {
    score += 1;
  }
  
  // 弱点補強
  if (preferences?.weakAreas && lesson.tags) {
    const weaknessMatch = preferences.weakAreas.some(weak => 
      lesson.tags.includes(weak)
    );
    if (weaknessMatch) score += 4;
  }
  
  // 目標一致
  if (preferences?.goals && lesson.tags) {
    const goalMatch = preferences.goals.some(goal => 
      lesson.tags.includes(goal)
    );
    if (goalMatch) score += 3;
  }
  
  // 学習スタイル
  if (preferences?.learningStyle) {
    const styleMatch = matchLearningStyle(lesson, preferences.learningStyle);
    score += styleMatch;
  }
  
  return score;
}

/**
 * 学習スタイルマッチング
 */
function matchLearningStyle(lesson: any, learningStyle: string): number {
  const contentTypes = lesson.content?.sections?.map((s: any) => s.type) || [];
  
  switch (learningStyle) {
    case 'visual':
      return contentTypes.includes('image') || contentTypes.includes('video') ? 2 : 0;
    case 'reading':
      return contentTypes.includes('text') ? 2 : 0;
    case 'practical':
      return contentTypes.includes('example') || contentTypes.includes('code') ? 2 : 0;
    case 'mixed':
      return contentTypes.length > 2 ? 1 : 0;
    default:
      return 0;
  }
}

/**
 * 個人化理由生成
 */
function generatePersonalizationReasons(
  lesson: any,
  userProfile: any,
  preferences: any
): string[] {
  const reasons = [];
  
  if (lesson.difficultyLevel === userProfile.level) {
    reasons.push('現在のレベルに最適です');
  }
  
  if (preferences?.weakAreas && lesson.tags) {
    const matches = preferences.weakAreas.filter(weak => lesson.tags.includes(weak));
    if (matches.length > 0) {
      reasons.push(`${matches.join('、')}の理解を深められます`);
    }
  }
  
  if (preferences?.goals && lesson.tags) {
    const matches = preferences.goals.filter(goal => lesson.tags.includes(goal));
    if (matches.length > 0) {
      reasons.push(`${matches.join('、')}の目標達成に役立ちます`);
    }
  }
  
  return reasons;
}

/**
 * 学習順序調整
 */
function adjustLearningOrder(lessons: any[], userStats: any): any[] {
  // カテゴリ順序と前提条件を考慮して並び替え
  return lessons.sort((a, b) => {
    // カテゴリID順
    if (a.categoryId !== b.categoryId) {
      return parseInt(a.categoryId) - parseInt(b.categoryId);
    }
    
    // 同じカテゴリ内では orderIndex 順
    return a.orderIndex - b.orderIndex;
  });
}

/**
 * 学習プラン生成
 */
function generateLearningPlan(recommendations: any[], preferences: any): any {
  const totalMinutes = recommendations.reduce((sum, lesson) => sum + lesson.estimatedMinutes, 0);
  const averageSessionTime = preferences?.sessionLength || 30;
  const estimatedSessions = Math.ceil(totalMinutes / averageSessionTime);
  
  return {
    totalLessons: recommendations.length,
    estimatedTotalTime: totalMinutes,
    estimatedSessions,
    recommendedPace: `${Math.ceil(recommendations.length / estimatedSessions)}レッスン/セッション`,
    milestones: generatePlanMilestones(recommendations)
  };
}

/**
 * プランマイルストーン生成
 */
function generatePlanMilestones(recommendations: any[]): any[] {
  const milestones = [];
  const quarterSize = Math.ceil(recommendations.length / 4);
  
  for (let i = 1; i <= 4; i++) {
    milestones.push({
      milestone: i,
      lessons: quarterSize,
      title: `第${i}フェーズ完了`,
      description: `${quarterSize * i}レッスンの完了`
    });
  }
  
  return milestones;
}

/**
 * AI推奨使用量制限チェック
 */
async function checkAIRecommendationLimits(userId: string) {
  try {
    // 実装: データベースから使用量をチェック
    const currentUsage = 5; // 仮の値
    const limits = { basic: 10, pro: 50, enterprise: 200 };
    const userLimit = limits.basic;
    
    return {
      exceeded: currentUsage >= userLimit,
      remaining: Math.max(0, userLimit - currentUsage),
      resetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };
  } catch (error) {
    logger.error('Failed to check AI recommendation limits', { userId, error: error instanceof Error ? error.message : String(error) });
    return { exceeded: false, remaining: 10, resetDate: '' };
  }
}

/**
 * AI推奨使用量記録
 */
async function recordAIRecommendationUsage(userId: string) {
  try {
    // 実装: データベースに使用量を記録
    logger.debug('AI recommendation usage recorded', { userId });
  } catch (error) {
    logger.error('Failed to record AI recommendation usage', { userId, error: error instanceof Error ? error.message : String(error) });
  }
}

// 以下、パフォーマンス分析用の関数（簡略化）
function calculateOverallCompletionRate(userStats: any): number {
  return Math.round((userStats.totalCompletedLessons / 85) * 100);
}

function calculateAverageQuizScore(quizResults: any[]): number {
  if (quizResults.length === 0) return 0;
  return quizResults.reduce((sum, result) => sum + result.score, 0) / quizResults.length;
}

function calculateLearningVelocity(completedLessons: any[]): number {
  if (completedLessons.length < 2) return 0;
  
  const sortedLessons = completedLessons.sort((a, b) => 
    new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime()
  );
  
  const firstDate = new Date(sortedLessons[0].completedAt);
  const lastDate = new Date(sortedLessons[sortedLessons.length - 1].completedAt);
  const daysDiff = (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24);
  
  return daysDiff > 0 ? completedLessons.length / daysDiff : 0;
}

function calculateConsistency(completedLessons: any[], streakData: number): number {
  // ストリークデータと完了レッスンの分布から一貫性を計算
  return Math.min(100, streakData * 2);
}

async function calculateRetentionRate(userId: string): Promise<number> {
  // 実装: 復習テストの結果から記憶保持率を計算
  return 75; // 仮の値
}

async function analyzeCategoryPerformance(userId: string, completedLessons: any[]): Promise<any> {
  // カテゴリ別のパフォーマンス分析
  return {};
}

function analyzeDifficultyPerformance(completedLessons: any[], quizResults: any[]): any {
  return {};
}

function analyzeTimePatterns(completedLessons: any[]): any {
  return {};
}

function identifyStrengths(completedLessons: any[], quizResults: any[]): string[] {
  return ['基礎理解', '応用力'];
}

function identifyWeaknesses(completedLessons: any[], quizResults: any[]): string[] {
  return ['計算問題', '専門用語'];
}

function generatePerformanceRecommendations(userStats: any, completedLessons: any[], quizResults: any[]): string[] {
  return ['復習の頻度を増やしましょう', 'より実践的な問題に挑戦してみてください'];
}

function generateImprovementPlan(performance: any, userStats: any): any {
  return {
    shortTerm: ['復習時間の確保', '弱点分野の集中学習'],
    longTerm: ['高度なレッスンへの挑戦', '実践的な投資体験'],
    timeline: '3ヶ月プラン'
  };
}

async function getBenchmarkData(userStats: any): Promise<any> {
  return {
    averageCompletionRate: 65,
    averageQuizScore: 78,
    topPerformers: 85
  };
}

function generatePerformanceInsights(performance: any): string[] {
  return [
    '学習ペースが安定しています',
    'クイズの正答率が高く理解度が深いです',
    '継続的な学習習慣が身についています'
  ];
}

function calculateDifficultyDistribution(recommendations: any[]): any {
  return recommendations.reduce((dist, lesson) => {
    dist[lesson.difficultyLevel] = (dist[lesson.difficultyLevel] || 0) + 1;
    return dist;
  }, {});
}

function calculateTopicDistribution(recommendations: any[]): any {
  return recommendations.reduce((dist, lesson) => {
    dist[lesson.categoryId] = (dist[lesson.categoryId] || 0) + 1;
    return dist;
  }, {});
}

// API Route Handlers
export const POST = withApiHandler(generateAIRecommendations, {
  requireAuth: true,
  requireSubscription: true,
  rateLimitKey: 'learning-ai-recommendations',
  validateSchema: aiRecommendationSchema
});

export const GET = withApiHandler(generatePersonalizedRecommendations, {
  requireAuth: true,
  requireSubscription: false,
  rateLimitKey: 'learning-personalized-recommendations'
});

export const PUT = withApiHandler(analyzeLearningPerformance, {
  requireAuth: true,
  requireSubscription: false,
  rateLimitKey: 'learning-performance-analysis'
});

export const OPTIONS = async () => {
  return new NextResponse(null, { 
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
};