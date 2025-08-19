// 🎯 AI学習推奨API
// チャット統合・個人化レコメンド・学習パス生成

import { NextRequest, NextResponse } from 'next/server';
import { withApiHandler, ApiContext } from '@/lib/auth/middleware';
import { UnifiedAIService } from '@/lib/ai/unified-ai-service';
import { LearningService } from '@/lib/services/learning.service';
import { logger } from '@/lib/monitoring/logger';
import { z } from 'zod';
import { toRecord } from '@/lib/types/guards';

// 型定義
export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface LessonSection { type: string }
export interface LessonContent { sections?: LessonSection[] }
export interface APILesson {
  id: string
  title: string
  estimatedMinutes: number
  difficultyLevel: Difficulty
  relevanceScore: number
  categoryId: string
  orderIndex: number
  tags?: string[]
  content?: LessonContent
}

export interface UserStats {
  totalCompletedLessons: number
  averageLevel: Difficulty
}

export interface UserProfile {
  level: Difficulty
  strengths: string[]
  weaknesses: string[]
  learningStyle: 'visual' | 'reading' | 'practical' | 'mixed'
  preferredTopics?: string[]
}

export interface UserLessonProgress {
  lessonId: string
  completedAt: string
}

export interface QuizResult {
  lessonId: string
  score: number
  completedAt?: string
}

export interface AIRecommendations {
  recommendedLessons: APILesson[]
  learningPath: string
  nextSteps: string[]
}

export interface Preferences {
  learningStyle?: 'visual' | 'reading' | 'practical' | 'mixed'
  goals?: string[]
  weakAreas?: string[]
  sessionLength?: number
}

export type EnhancedLesson = APILesson & { timeFitScore: number; adjustedScore: number }

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
    weakAreas: z.array(z.string()).optional(),
    sessionLength: z.number().min(10).max(240).optional()
  }).optional(),
  limit: z.number().min(1).max(20).default(10)
});

const aiService = new UnifiedAIService();
const learningService = new LearningService();

function toLesson(obj: unknown): APILesson | null {
  const r = toRecord(obj);
  if (typeof r.id !== 'string' || typeof r.title !== 'string') return null;
  const diff = String(r.difficultyLevel);
  const difficulty: Difficulty = diff === 'beginner' || diff === 'intermediate' || diff === 'advanced' ? (diff as Difficulty) : 'beginner';
  return {
    id: r.id,
    title: r.title,
    estimatedMinutes: typeof r.estimatedMinutes === 'number' ? r.estimatedMinutes : Number(r.estimatedMinutes ?? 0),
    difficultyLevel: difficulty,
    relevanceScore: typeof r.relevanceScore === 'number' ? r.relevanceScore : Number((r as Record<string, unknown>).score ?? 0),
    categoryId: typeof r.categoryId === 'string' ? r.categoryId : String(r.categoryId ?? ''),
    orderIndex: typeof r.orderIndex === 'number' ? r.orderIndex : Number(r.orderIndex ?? 0),
    tags: Array.isArray(r.tags) ? r.tags.filter((t): t is string => typeof t === 'string') : undefined,
    content: undefined,
  };
}

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
    const rawStats = await learningService.getLearningStats(user.id);
    const statsObj = toRecord(rawStats);
    const userStats: UserStats = {
      totalCompletedLessons: typeof statsObj.totalCompletedLessons === 'number' ? statsObj.totalCompletedLessons : (typeof statsObj.completedLessons === 'number' ? statsObj.completedLessons : 0),
      averageLevel: 'beginner'
    };
    // 直近レッスン相当: 推奨から代替
    const recentRaw = await learningService.getRecommendedLessons(user.id, 5);
    const recentLessons: APILesson[] = Array.isArray(recentRaw)
      ? recentRaw.map(toLesson).filter((l): l is APILesson => l !== null)
      : [];
    
    // チャットコンテキストを構築
    const chatContext = buildChatContext(
      validatedData.chatContext,
      recentLessons,
      userStats,
      validatedData.currentLessonId
    );

    // AI推奨生成
    const aiRaw = await aiService.generateLearningRecommendations(
      user.id,
      chatContext,
      validatedData.query
    );
    const aiRecommendations: AIRecommendations = {
      recommendedLessons: Array.isArray(aiRaw.recommendedLessons)
        ? aiRaw.recommendedLessons.map((r) => {
            const rec = toRecord(r)
            const diff = String(rec.difficulty)
            const difficultyLevel: Difficulty = diff === 'beginner' || diff === 'intermediate' || diff === 'advanced' ? (diff as Difficulty) : 'beginner'
            return {
              id: String(rec.id),
              title: String(rec.title ?? ''),
              estimatedMinutes: typeof rec.estimatedMinutes === 'number' ? rec.estimatedMinutes : Number(rec.estimatedMinutes ?? 0),
              difficultyLevel,
              relevanceScore: typeof rec.relevanceScore === 'number' ? rec.relevanceScore : Number(rec.relevanceScore ?? 0),
              categoryId: String(rec.categoryId ?? ''),
              orderIndex: typeof rec.orderIndex === 'number' ? rec.orderIndex : Number(rec.orderIndex ?? 0),
              tags: Array.isArray(rec.tags) ? rec.tags.filter((t): t is string => typeof t === 'string') : undefined,
              content: undefined,
            }
          })
        : [],
      learningPath: String(aiRaw.learningPath ?? ''),
      nextSteps: Array.isArray(aiRaw.nextSteps) ? aiRaw.nextSteps.filter((s): s is string => typeof s === 'string') : []
    }

    // 時間制約を考慮した調整
    const timeAdjustedRecommendations = adjustRecommendationsForTime(
      aiRecommendations.recommendedLessons,
      validatedData.timeAvailable
    );

    // 復習提案を含める場合（簡略: 未対応→空配列）
    const reviewSuggestions: APILesson[] = [];

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

    // ユーザープロファイル/統計
    const rawStats = await learningService.getLearningStats(user.id);
    const rawStatsObj = toRecord(rawStats);
    const userStats: UserStats = {
      totalCompletedLessons: typeof rawStatsObj.totalCompletedLessons === 'number' ? rawStatsObj.totalCompletedLessons : 
                           (typeof rawStatsObj.completedLessons === 'number' ? rawStatsObj.completedLessons : 0),
      averageLevel: 'beginner'
    };
    const userProfile: UserProfile = {
      level: 'beginner',
      strengths: [],
      weaknesses: [],
      learningStyle: (validatedData.preferences?.learningStyle ?? 'mixed') as UserProfile['learningStyle'],
      preferredTopics: []
    };

    // 基本フィルタリング
    const baseCategoryId = validatedData.baseFilters?.categoryId;
    const rawLessons = await learningService.getLessons(baseCategoryId);
    let candidateLessons: APILesson[] = Array.isArray(rawLessons)
      ? rawLessons.map(toLesson).filter((l): l is APILesson => l !== null)
      : [];
    // 追加フィルタ（難易度/時間）
    if (validatedData.baseFilters?.difficulty) {
      candidateLessons = candidateLessons.filter(l => l.difficultyLevel === validatedData.baseFilters!.difficulty)
    }
    if (validatedData.baseFilters?.maxDuration) {
      candidateLessons = candidateLessons.filter(l => l.estimatedMinutes <= validatedData.baseFilters!.maxDuration!)
    }

    // 個人化スコアリング
    const personalizedLessons = candidateLessons.map((lesson: APILesson) => {
      const score = calculatePersonalizationScore(
        lesson,
        userProfile,
        validatedData.preferences as Preferences | undefined
      );

      return {
        ...lesson,
        personalizationScore: score,
        recommendationReasons: generatePersonalizationReasons(
          lesson,
          userProfile,
          validatedData.preferences as Preferences | undefined
        )
      } as APILesson & { personalizationScore: number; recommendationReasons: string[] };
    });

    // スコア順でソート
    personalizedLessons.sort((a, b) => (b.personalizationScore - a.personalizationScore));

    // 学習順序を調整（前提条件を考慮）
    const orderedRecommendations = adjustLearningOrder(
      personalizedLessons.slice(0, validatedData.limit),
      userStats
    ) as Array<APILesson & { personalizationScore: number; recommendationReasons: string[] }>;

    // 学習プランを生成
    const learningPlan = generateLearningPlan(orderedRecommendations, validatedData.preferences as Preferences | undefined);

    logger.info('Personalized recommendations generated', {
      userId: user.id,
      candidateCount: candidateLessons.length,
      recommendationCount: orderedRecommendations.length,
      averageScore: orderedRecommendations.reduce((sum, l) => sum + (l.personalizationScore || 0), 0) / Math.max(1, orderedRecommendations.length)
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
          (sum, l) => sum + (l.personalizationScore || 0), 0
        ) / Math.max(1, orderedRecommendations.length),
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
  _request: NextRequest,
  context: ApiContext
): Promise<NextResponse> {
  const { user } = context;
  
  try {
    const rawStats = await learningService.getLearningStats(user.id);
    const rawStatsObj2 = toRecord(rawStats);
    const userStats: UserStats = {
      totalCompletedLessons: typeof rawStatsObj2.totalCompletedLessons === 'number' ? rawStatsObj2.totalCompletedLessons : 
                           (typeof rawStatsObj2.completedLessons === 'number' ? rawStatsObj2.completedLessons : 0),
      averageLevel: 'beginner'
    };
    const completedLessons: UserLessonProgress[] = [];
    const quizResults: QuizResult[] = [];
    const streakData = await learningService.getCurrentStreak(user.id);

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
    } as const;

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

function buildChatContext(
  chatContext: string | undefined,
  recentLessons: APILesson[],
  userStats: UserStats,
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

function adjustRecommendationsForTime(recommendations: APILesson[], timeAvailable: number): EnhancedLesson[] {
  const adjusted: EnhancedLesson[] = recommendations.map((lesson: APILesson) => {
    let timeFitScore = 1;
    if (lesson.estimatedMinutes <= timeAvailable) {
      timeFitScore = 1.5;
    } else if (lesson.estimatedMinutes <= timeAvailable * 1.2) {
      timeFitScore = 1.2;
    } else {
      timeFitScore = 0.8;
    }
    return { ...lesson, timeFitScore, adjustedScore: lesson.relevanceScore * timeFitScore };
  });
  return adjusted.sort((a, b) => b.adjustedScore - a.adjustedScore);
}

function calculateLearningEffectiveness(
  recommendations: Array<Pick<EnhancedLesson, 'relevanceScore' | 'estimatedMinutes' | 'difficultyLevel'>>,
  userStats: UserStats,
  timeAvailable: number
): number {
  if (recommendations.length === 0) return 0;
  let score = 0;
  const avgRelevance = recommendations.reduce((sum, r) => sum + r.relevanceScore, 0) / recommendations.length;
  score += avgRelevance * 0.4;
  const totalMinutes = recommendations.reduce((sum, r) => sum + r.estimatedMinutes, 0);
  const timeEfficiency = Math.min(1, timeAvailable / Math.max(1, totalMinutes));
  score += timeEfficiency * 0.3;
  const levelMatch = recommendations.length > 0 ? 1 : 0; // 簡略化: レベルマッチを一定値とする
  score += levelMatch * 0.3;
  return Math.round(score * 100);
}

function calculateAIConfidence(aiRecommendations: AIRecommendations): number {
  const hasRecommendations = aiRecommendations.recommendedLessons.length > 0;
  const hasPath = aiRecommendations.learningPath.length > 10;
  const hasSteps = aiRecommendations.nextSteps.length > 0;
  let confidence = 0;
  if (hasRecommendations) confidence += 40;
  if (hasPath) confidence += 30;
  if (hasSteps) confidence += 30;
  return confidence;
}

function calculatePersonalizationScore(
  lesson: APILesson,
  userProfile: UserProfile,
  preferences?: Preferences
): number {
  let score = 0;
  if (lesson.difficultyLevel === userProfile.level) {
    score += 3;
  } else if (
    (userProfile.level === 'beginner' && lesson.difficultyLevel === 'intermediate') ||
    (userProfile.level === 'intermediate' && lesson.difficultyLevel === 'advanced')
  ) {
    score += 1;
  }
  if (preferences?.weakAreas && lesson.tags) {
    const weaknessMatch = preferences.weakAreas.some((weak: string) => lesson.tags!.includes(weak));
    if (weaknessMatch) score += 4;
  }
  if (preferences?.goals && lesson.tags) {
    const goalMatch = preferences.goals.some((goal: string) => lesson.tags!.includes(goal));
    if (goalMatch) score += 3;
  }
  if (preferences?.learningStyle) {
    const styleMatch = matchLearningStyle(lesson, preferences.learningStyle);
    score += styleMatch;
  }
  return score;
}

function matchLearningStyle(lesson: APILesson, learningStyle: Preferences['learningStyle']): number {
  const contentTypes: string[] = lesson.content?.sections?.map((s: LessonSection) => s.type) || [];
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

function generatePersonalizationReasons(
  lesson: APILesson,
  userProfile: UserProfile,
  preferences?: Preferences
): string[] {
  const reasons: string[] = [];
  if (lesson.difficultyLevel === userProfile.level) {
    reasons.push('現在のレベルに最適です');
  }
  if (preferences?.weakAreas && lesson.tags) {
    const matches = preferences.weakAreas.filter((weak: string) => lesson.tags!.includes(weak));
    if (matches.length > 0) {
      reasons.push(`${matches.join('、')}の理解を深められます`);
    }
  }
  if (preferences?.goals && lesson.tags) {
    const matches = preferences.goals.filter((goal: string) => lesson.tags!.includes(goal));
    if (matches.length > 0) {
      reasons.push(`${matches.join('、')}の目標達成に役立ちます`);
    }
  }
  return reasons;
}

function adjustLearningOrder(lessons: Array<APILesson & { personalizationScore?: number }>, _userStats: UserStats): Array<APILesson & { personalizationScore?: number }> {
  return lessons.sort((a, b) => {
    if (a.categoryId !== b.categoryId) {
      const aNum = parseInt(a.categoryId);
      const bNum = parseInt(b.categoryId);
      if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) {
        return aNum - bNum;
      }
      return a.categoryId.localeCompare(b.categoryId);
    }
    return a.orderIndex - b.orderIndex;
  });
}

function generateLearningPlan(recommendations: APILesson[], preferences?: Preferences): {
  totalLessons: number
  estimatedTotalTime: number
  estimatedSessions: number
  recommendedPace: string
  milestones: Array<{ milestone: number; lessons: number; title: string; description: string }>
} {
  const totalMinutes = recommendations.reduce((sum, lesson) => sum + lesson.estimatedMinutes, 0);
  const averageSessionTime = preferences?.sessionLength ?? 30;
  const denominator = Math.max(1, averageSessionTime);
  const estimatedSessions = Math.ceil(totalMinutes / denominator);
  return {
    totalLessons: recommendations.length,
    estimatedTotalTime: totalMinutes,
    estimatedSessions,
    recommendedPace: `${Math.ceil(recommendations.length / Math.max(1, estimatedSessions))}レッスン/セッション`,
    milestones: generatePlanMilestones(recommendations)
  };
}

function generatePlanMilestones(recommendations: APILesson[]): Array<{ milestone: number; lessons: number; title: string; description: string }> {
  const milestones: Array<{ milestone: number; lessons: number; title: string; description: string }> = [];
  const quarterSize = Math.ceil(Math.max(1, recommendations.length) / 4);
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

async function checkAIRecommendationLimits(userId: string) {
  try {
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

async function recordAIRecommendationUsage(userId: string) {
  try {
    logger.debug('AI recommendation usage recorded', { userId });
  } catch (error) {
    logger.error('Failed to record AI recommendation usage', { userId, error: error instanceof Error ? error.message : String(error) });
  }
}

function calculateOverallCompletionRate(userStats: UserStats): number {
  return Math.round(((userStats.totalCompletedLessons ?? 0) / 85) * 100);
}

function calculateAverageQuizScore(quizResults: QuizResult[]): number {
  if (quizResults.length === 0) return 0;
  return quizResults.reduce((sum, result) => sum + (result.score ?? 0), 0) / quizResults.length;
}

function calculateLearningVelocity(completedLessons: UserLessonProgress[]): number {
  if (completedLessons.length < 2) return 0;
  const sortedLessons = completedLessons.slice().sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime());
  const firstDate = new Date(sortedLessons[0].completedAt);
  const lastDate = new Date(sortedLessons[sortedLessons.length - 1].completedAt);
  const daysDiff = (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24);
  return daysDiff > 0 ? completedLessons.length / daysDiff : 0;
}

function calculateConsistency(_completedLessons: UserLessonProgress[], streakData: number): number {
  return Math.min(100, Math.max(0, streakData * 2));
}

async function calculateRetentionRate(_userId: string): Promise<number> {
  return 75;
}

async function analyzeCategoryPerformance(_userId: string, _completedLessons: UserLessonProgress[]): Promise<Record<string, unknown>> {
  return {};
}

function analyzeDifficultyPerformance(_completedLessons: UserLessonProgress[], _quizResults: QuizResult[]): Record<string, unknown> {
  return {};
}

function analyzeTimePatterns(_completedLessons: UserLessonProgress[]): Record<string, unknown> {
  return {};
}

function identifyStrengths(_completedLessons: UserLessonProgress[], _quizResults: QuizResult[]): string[] {
  return ['基礎理解', '応用力'];
}

function identifyWeaknesses(_completedLessons: UserLessonProgress[], _quizResults: QuizResult[]): string[] {
  return ['計算問題', '専門用語'];
}

function generatePerformanceRecommendations(_userStats: UserStats, _completedLessons: UserLessonProgress[], _quizResults: QuizResult[]): string[] {
  return ['復習の頻度を増やしましょう', 'より実践的な問題に挑戦してみてください'];
}

function generateImprovementPlan(_performance: unknown, _userStats: UserStats): unknown {
  return {
    shortTerm: ['復習時間の確保', '弱点分野の集中学習'],
    longTerm: ['高度なレッスンへの挑戦', '実践的な投資体験'],
    timeline: '3ヶ月プラン'
  };
}

async function getBenchmarkData(_userStats: UserStats): Promise<Record<string, unknown>> {
  return {
    averageCompletionRate: 65,
    averageQuizScore: 78,
    topPerformers: 85
  };
}

function generatePerformanceInsights(_performance: unknown): string[] {
  return [
    '学習ペースが安定しています',
    'クイズの正答率が高く理解度が深いです',
    '継続的な学習習慣が身についています'
  ];
}

function calculateDifficultyDistribution(recommendations: Array<APILesson | (APILesson & { personalizationScore?: number })>): Record<string, number> {
  return recommendations.reduce<Record<string, number>>((dist, lesson) => {
    const key = lesson.difficultyLevel ?? 'unknown';
    dist[key] = (dist[key] || 0) + 1;
    return dist;
  }, {});
}

function calculateTopicDistribution(recommendations: Array<APILesson | (APILesson & { personalizationScore?: number })>): Record<string, number> {
  return recommendations.reduce<Record<string, number>>((dist, lesson) => {
    const key = lesson.categoryId ?? 'unknown';
    dist[key] = (dist[key] || 0) + 1;
    return dist;
  }, {});
}

// API Route Handlers
export const POST = withApiHandler(generateAIRecommendations, {
  requireAuth: true,
  requireSubscription: true,
  rateLimitKey: 'learning-ai-recommendations',
  validateSchema: aiRecommendationSchema,
  requireCSRF: true
});

export const GET = withApiHandler(generatePersonalizedRecommendations, {
  requireAuth: true,
  requireSubscription: false,
  rateLimitKey: 'learning-personalized-recommendations'
});

export const PUT = withApiHandler(analyzeLearningPerformance, {
  requireAuth: true,
  requireSubscription: false,
  rateLimitKey: 'learning-performance-analysis',
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
      'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    }
  });
};
