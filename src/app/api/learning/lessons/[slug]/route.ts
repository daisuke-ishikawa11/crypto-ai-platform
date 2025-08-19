// 📖 個別レッスンAPI
// スラッグベースアクセス・詳細コンテンツ・AI説明・関連推奨

import { NextRequest, NextResponse } from 'next/server';
import { withApiHandler, ApiContext } from '@/lib/auth/middleware';
import { learningService } from '@/lib/services/learning.service';
import { UnifiedAIService } from '@/lib/ai/unified-ai-service';
import { logger } from '@/lib/monitoring/logger';
import { z } from 'zod';

// バリデーションスキーマ
const aiExplanationSchema = z.object({
  topic: z.string().min(1).max(200),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
  language: z.enum(['ja', 'en']).default('ja'),
  includeExamples: z.boolean().default(true),
  maxTokens: z.number().min(100).max(2000).default(500)
});

const aiService = new UnifiedAIService();

/**
 * 個別レッスン取得
 */
async function getLesson(
  request: NextRequest,
  context: ApiContext,
  params?: Record<string, unknown>
): Promise<NextResponse> {
  const { user } = context;
  
  // Extract and validate slug parameter
  const slug = params?.slug as string;
  if (!slug) {
    return NextResponse.json(
      { success: false, error: 'Slug parameter is required' },
      { status: 400 }
    );
  }
  
  try {
    // レッスンを取得
    const lesson = await learningService.getLessonBySlug(slug);
    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }

    // ユーザーの進捗を取得
    const userProgress = await learningService.getUserProgress(user.id, lesson.id);
    
    // レッスンコンテンツからクイズ質問を抽出
    const quizQuestions = lesson.content.sections
      .filter(section => section.type === 'quiz' && section.questions)
      .flatMap(section => section.questions || []);
    
    // ユーザーのクイズ履歴を取得
    const quizHistory = await learningService.getQuizResults(user.id, lesson.id);
    
    // 前後のレッスンを取得
    const categoryLessons = await learningService.getLessons(lesson.categoryId);
    
    const currentIndex = categoryLessons.findIndex(l => l.id === lesson.id);
    const previousLesson = currentIndex > 0 ? categoryLessons[currentIndex - 1] : null;
    const nextLesson = currentIndex < categoryLessons.length - 1 ? categoryLessons[currentIndex + 1] : null;
    
    // 関連レッスン推奨
    const relatedLessons = await getRelatedLessons(lesson, user.id);
    
    // レッスンアクセス記録 (getUserProgress で既に進捗追跡済み)

    logger.info('Lesson accessed', {
      userId: user.id,
      lessonId: lesson.id,
      slug: lesson.slug,
      categoryId: lesson.categoryId
    });

    return NextResponse.json({
      lesson: {
        ...lesson,
        userProgress
      },
      quiz: {
        questions: quizQuestions,
        history: quizHistory
      },
      navigation: {
        previous: previousLesson ? {
          id: previousLesson.id,
          title: previousLesson.title,
          slug: previousLesson.slug
        } : null,
        next: nextLesson ? {
          id: nextLesson.id,
          title: nextLesson.title,
          slug: nextLesson.slug
        } : null
      },
      relatedLessons,
      metadata: {
        estimatedReadingTime: calculateReadingTime(lesson.content),
        difficultyScore: calculateDifficultyScore(lesson),
        completionRate: await getCompletionRate(lesson.id)
      }
    });

  } catch (error) {
    logger.error('Failed to get lesson', {
      userId: user.id,
      slug,
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    throw error;
  }
}

/**
 * AI説明生成
 */
async function generateAIExplanation(
  request: NextRequest,
  context: ApiContext,
  params?: Record<string, unknown>
): Promise<NextResponse> {
  const { user } = context;
  
  // Extract and validate slug parameter
  const slug = params?.slug as string;
  if (!slug) {
    return NextResponse.json(
      { success: false, error: 'Slug parameter is required' },
      { status: 400 }
    );
  }
  
  try {
    // レッスンを取得
    const lesson = await learningService.getLessonBySlug(slug);
    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const validatedData = aiExplanationSchema.parse(body);

    // AI使用量制限チェック
    const usageLimits = await checkAIUsageLimits(user.id);
    if (usageLimits.exceeded) {
      return NextResponse.json(
        { 
          error: 'AI usage limit exceeded',
          limits: usageLimits,
          upgradeUrl: '/pricing'
        },
        { status: 429 }
      );
    }

    // AIに説明生成を依頼
    const explanation = await generateTopicExplanation(
      lesson,
      validatedData.topic,
      validatedData.difficulty,
      validatedData.language,
      validatedData.includeExamples
    );

    // 使用量を記録
    await recordAIUsage(user.id, 'explanation');

    logger.info('AI explanation generated', {
      userId: user.id,
      lessonId: lesson.id,
      topic: validatedData.topic,
      difficulty: validatedData.difficulty
    });

    return NextResponse.json({
      explanation,
      topic: validatedData.topic,
      difficulty: validatedData.difficulty,
      language: validatedData.language,
      lessonContext: {
        id: lesson.id,
        title: lesson.title,
        categoryId: lesson.categoryId
      },
      usage: {
        remaining: usageLimits.remaining - 1,
        resetDate: usageLimits.resetDate
      }
    });

  } catch (error) {
    logger.error('Failed to generate AI explanation', {
      userId: user.id,
      slug,
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    throw error;
  }
}

/**
 * レッスンブックマーク
 */
async function toggleBookmark(
  request: NextRequest,
  context: ApiContext,
  params?: Record<string, unknown>
): Promise<NextResponse> {
  const { user } = context;
  
  // Extract and validate slug parameter
  const slug = params?.slug as string;
  if (!slug) {
    return NextResponse.json(
      { success: false, error: 'Slug parameter is required' },
      { status: 400 }
    );
  }
  
  try {
    const lesson = await learningService.getLessonBySlug(slug);
    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }

    // TODO: Implement bookmark functionality
    const isBookmarked = false;

    logger.info('Lesson bookmark toggled', {
      userId: user.id,
      lessonId: lesson.id,
      isBookmarked
    });

    return NextResponse.json({
      success: true,
      isBookmarked,
      lesson: {
        id: lesson.id,
        title: lesson.title,
        slug: lesson.slug
      }
    });

  } catch (error) {
    logger.error('Failed to toggle bookmark', {
      userId: user.id,
      slug,
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    throw error;
  }
}

/**
 * ヘルパー関数群
 */

/**
 * 関連レッスン取得
 */
type LessonLite = { id: string; title: string; slug: string; description?: string; categoryId: string; orderIndex: number; difficultyLevel: string; estimatedMinutes: number }
async function getRelatedLessons(lesson: LessonLite, userId: string) {
  try {
    // 同じカテゴリの他のレッスン
    const categoryLessons = await learningService.getLessons(lesson.categoryId);
    
    // 同じタグを持つレッスン (TODO: タグベースの検索を実装)
    const tagBasedLessons: LessonLite[] = [];
    
    // ユーザーの学習パターンに基づく推奨
    const recommendedLessons = await learningService.getRecommendedLessons(userId, 5);
    
    // 重複除去とスコア計算
    const relatedLessonsMap = new Map<string, LessonLite & { score: number }>();
    
    // 同じカテゴリのレッスン（重み: 0.6）
    categoryLessons.forEach((l: LessonLite) => {
      if (l.id !== lesson.id) {
        relatedLessonsMap.set(l.id, { ...l, score: 0.6 });
      }
    });
    
    // タグベースのレッスン（重み: 0.8）
    tagBasedLessons.forEach((l: LessonLite) => {
      if (l.id !== lesson.id) {
        const existing = relatedLessonsMap.get(l.id);
        relatedLessonsMap.set(l.id, { 
          ...l, 
          score: existing ? existing.score + 0.8 : 0.8 
        });
      }
    });
    
    // AI推奨レッスン（重み: 1.0）
    recommendedLessons.forEach((l: LessonLite) => {
      if (l.id !== lesson.id) {
        const existing = relatedLessonsMap.get(l.id);
        relatedLessonsMap.set(l.id, { 
          ...l, 
          score: existing ? existing.score + 1.0 : 1.0 
        });
      }
    });
    
    // スコア順でソートして上位5件を返す
    return Array.from(relatedLessonsMap.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(({ score, ...l }) => l);

  } catch (error) {
    logger.error('Failed to get related lessons', { lessonId: lesson.id, error: error instanceof Error ? error.message : String(error) });
    return [];
  }
}

/**
 * 読了時間計算
 */
type LessonContentLite = { sections?: Array<{ type?: string; content?: string }> }
function calculateReadingTime(content: LessonContentLite): number {
  if (!content || !content.sections) return 0;
  
  const wordsPerMinute = 200; // 平均読了速度（日本語）
  let totalWords = 0;
  
  content.sections.forEach((section) => {
    if (section.type === 'text' && section.content) {
      // 日本語テキストの場合、文字数を単語数として概算
      totalWords += section.content.length;
    }
  });
  
  return Math.ceil(totalWords / wordsPerMinute);
}

/**
 * 難易度スコア計算
 */
function calculateDifficultyScore(lesson: LessonLite & { content: LessonContentLite }): number {
  const difficultyScores = {
    'beginner': 1,
    'intermediate': 2,
    'advanced': 3
  } as Record<string, number>;
  const baseScore = difficultyScores[lesson.difficultyLevel as string] || 1;
  
  // コンテンツの複雑さも考慮
  const contentComplexity = (lesson.content.sections?.length || 0) / 10;
  const durationComplexity = lesson.estimatedMinutes / 30;
  
  return Math.min(5, baseScore + contentComplexity + durationComplexity);
}

/**
 * 完了率取得
 */
async function getCompletionRate(lessonId: string): Promise<number> {
  try {
    // TODO: Implement lesson-specific completion rate statistics
    // For now, return a placeholder value
    return 0.75; // 75% completion rate placeholder
  } catch (error) {
    logger.error('Failed to get completion rate', { lessonId, error: error instanceof Error ? error.message : String(error) });
    return 0;
  }
}

/**
 * AI説明生成
 */
async function generateTopicExplanation(
  lesson: unknown,
  topic: string,
  difficulty: string,
  language: string,
  includeExamples: boolean
): Promise<string> {
  try {
    // Type-safe access to lesson properties
    const lessonObj = lesson as Record<string, unknown>;
    const lessonTitle = typeof lessonObj.title === 'string' ? lessonObj.title : 'Unknown';
    const lessonCategoryId = typeof lessonObj.categoryId === 'string' ? lessonObj.categoryId : 'Unknown';
    const lessonDifficulty = typeof lessonObj.difficultyLevel === 'string' ? lessonObj.difficultyLevel : 'beginner';
    const lessonDescription = typeof lessonObj.description === 'string' ? lessonObj.description : '';

    const prompt = `
${language === 'ja' ? '日本語で' : 'In English,'}以下のトピックについて${difficulty}レベルで説明してください。

レッスン情報:
- タイトル: ${lessonTitle}
- カテゴリ: ${lessonCategoryId}
- 難易度: ${lessonDifficulty}

説明したいトピック: ${topic}

要求:
- ${difficulty}レベルに適した説明
- ${language === 'ja' ? '分かりやすい日本語' : 'Clear English'}
- ${includeExamples ? '具体例を含める' : '理論的な説明に集中'}
- 投資・暗号通貨の文脈に関連させる
- 安全性とリスクについても言及

形式:
1. 概要
2. 詳細説明
3. ${includeExamples ? '具体例' : '重要ポイント'}
4. 注意事項
`;

    const chatResult = await aiService.performChatAnalysis({
      userId: 'system',
      query: prompt,
      context: { 
        marketData: { 
          lesson: {
            title: lessonTitle,
            description: lessonDescription,
            categoryId: lessonCategoryId
          }
        }
      },
      maxTokens: 1000
    });

    return chatResult.response;

  } catch (error) {
    logger.error('Failed to generate topic explanation', { topic, error: error instanceof Error ? error.message : String(error) });
    throw new Error('AI explanation generation failed');
  }
}

/**
 * AI使用量制限チェック
 */
async function checkAIUsageLimits(userId: string) {
  try {
    const currentMonth = new Date().toISOString().slice(0, 7);
    
    // 今月の使用量を取得（仮の実装）
    const currentUsage = 10; // 実際はDBから取得
    const limits = { basic: 20, pro: 100, enterprise: 500 };
    const userLimit = limits.basic; // 実際はユーザーのプランから取得
    
    return {
      exceeded: currentUsage >= userLimit,
      remaining: Math.max(0, userLimit - currentUsage),
      resetDate: getUsageResetDate()
    };
  } catch (error) {
    logger.error('Failed to check AI usage limits', { userId, error: error instanceof Error ? error.message : String(error) });
    return { exceeded: false, remaining: 20, resetDate: getUsageResetDate() };
  }
}

/**
 * AI使用量記録
 */
async function recordAIUsage(userId: string, type: string) {
  try {
    // 実際の実装では、AI使用量をデータベースに記録
    logger.debug('AI usage recorded', { userId, type });
  } catch (error) {
    logger.error('Failed to record AI usage', { userId, type, error: error instanceof Error ? error.message : String(error) });
  }
}

/**
 * 使用量リセット日取得
 */
function getUsageResetDate(): string {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return nextMonth.toISOString();
}

// API Route Handlers
export const GET = withApiHandler(getLesson, {
  requireAuth: true,
  requireSubscription: false,
  rateLimitKey: 'learning-lesson-detail'
});

export const POST = withApiHandler(generateAIExplanation, {
  requireAuth: true,
  requireSubscription: true,
  rateLimitKey: 'learning-ai-explanation',
  validateSchema: aiExplanationSchema,
  requireCSRF: true
});

export const PATCH = withApiHandler(toggleBookmark, {
  requireAuth: true,
  requireSubscription: false,
  rateLimitKey: 'learning-bookmark',
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
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    }
  });
};
