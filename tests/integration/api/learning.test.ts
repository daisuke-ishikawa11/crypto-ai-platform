// 🧪 学習システムAPI統合テスト
// 85レッスン・進捗管理・AI統合の検証

import { createMocks } from 'node-mocks-http';
import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { UnifiedAIService } from '@/lib/ai/unified-service';
import { learningLessons } from '@/data/lessons';

jest.mock('@supabase/supabase-js');
jest.mock('@/lib/ai/unified-service');

describe('Learning System Integration Tests', () => {
  const mockSupabase = {
    auth: {
      getUser: jest.fn(),
    },
    from: jest.fn(),
  };

  const mockUser = {
    id: 'test-user-id',
    email: 'test@example.com'
  };

  const mockAIService = {
    generateLearningRecommendations: jest.fn(),
    explainLesson: jest.fn(),
    evaluateQuizAnswer: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (createClient as jest.Mock).mockReturnValue(mockSupabase);
    (UnifiedAIService.getInstance as jest.Mock).mockReturnValue(mockAIService);
  });

  describe('GET /api/learning/lessons', () => {
    it('カテゴリ別レッスン一覧を正常に取得', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null
      });

      const mockProgress = [
        { lesson_id: 'what-is-cryptocurrency', status: 'completed', progress_percentage: 100 },
        { lesson_id: 'blockchain-basics', status: 'in_progress', progress_percentage: 50 }
      ];

      mockSupabase.from.mockImplementation((table: string) => {
        if (table === 'user_lesson_progress') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockResolvedValue({
              data: mockProgress,
              error: null
            })
          };
        }
        return mockSupabase.from(table);
      });

      const { GET } = await import('@/app/api/learning/lessons/route');
      const { req } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token'
        },
        query: {
          category: 'crypto-basics'
        }
      });

      const response = await GET(req as unknown as NextRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.lessons).toBeDefined();
      expect(data.lessons.length).toBeGreaterThan(0);
      expect(data.category).toBe('crypto-basics');
      expect(data.stats.completed).toBe(1);
      expect(data.stats.inProgress).toBe(1);
    });

    it('AI推奨学習パスを含むレッスン取得', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null
      });

      mockAIService.generateLearningRecommendations.mockResolvedValue({
        recommendedLessons: [
          { lessonId: 'technical-analysis-basics', reason: 'あなたの学習履歴から、次はテクニカル分析の基礎がおすすめです' },
          { lessonId: 'risk-management-intro', reason: 'ポートフォリオ管理の知識を深めるために推奨' }
        ],
        learningPath: [
          'technical-analysis-basics',
          'chart-patterns',
          'risk-management-intro'
        ]
      });

      const { GET } = await import('@/app/api/learning/lessons/route');
      const { req } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token'
        },
        query: {
          includeRecommendations: 'true'
        }
      });

      const response = await GET(req as unknown as NextRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.recommendations).toBeDefined();
      expect(data.recommendations.recommendedLessons).toHaveLength(2);
      expect(data.recommendations.learningPath).toHaveLength(3);
    });
  });

  describe('GET /api/learning/lessons/[slug]', () => {
    it('個別レッスンの詳細を正常に取得', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null
      });

      const lessonSlug = 'what-is-cryptocurrency';
      const mockProgress = {
        lesson_id: lessonSlug,
        status: 'in_progress',
        progress_percentage: 30,
        last_accessed_at: new Date().toISOString(),
        completed_sections: ['introduction']
      };

      mockSupabase.from.mockImplementation((table: string) => {
        if (table === 'user_lesson_progress') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockReturnThis(),
            single: jest.fn().mockResolvedValue({
              data: mockProgress,
              error: null
            })
          };
        }
        return mockSupabase.from(table);
      });

      const { GET } = await import('@/app/api/learning/lessons/[slug]/route');
      const { req } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token'
        }
      });

      const response = await GET(
        req as unknown as NextRequest,
        { params: { slug: lessonSlug } }
      );
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.lesson.slug).toBe(lessonSlug);
      expect(data.lesson.content).toBeDefined();
      expect(data.progress.progressPercentage).toBe(30);
      expect(data.progress.completedSections).toContain('introduction');
    });

    it('AI説明付きレッスン取得', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null
      });

      const lessonSlug = 'blockchain-basics';
      
      mockAIService.explainLesson.mockResolvedValue({
        simplifiedExplanation: 'ブロックチェーンは、改ざんが困難なデジタル台帳技術です...',
        realWorldExamples: [
          '銀行の取引記録のような台帳を、みんなで共有・監視する仕組み',
          'チェーンのように連なったブロックにデータを記録'
        ],
        keyTakeaways: [
          '分散型で中央管理者が不要',
          '透明性が高く、履歴の追跡が可能',
          '暗号技術により高いセキュリティを実現'
        ]
      });

      const { GET } = await import('@/app/api/learning/lessons/[slug]/route');
      const { req } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token'
        },
        query: {
          includeAIExplanation: 'true'
        }
      });

      const response = await GET(
        req as unknown as NextRequest,
        { params: { slug: lessonSlug } }
      );
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.aiExplanation).toBeDefined();
      expect(data.aiExplanation.simplifiedExplanation).toBeDefined();
      expect(data.aiExplanation.realWorldExamples).toHaveLength(2);
    });
  });

  describe('POST /api/learning/lessons/[slug]/progress', () => {
    it('レッスン進捗を正常に更新', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null
      });

      const lessonSlug = 'what-is-cryptocurrency';
      const progressUpdate = {
        sectionCompleted: 'history-of-crypto',
        timeSpent: 300, // 5分
        progressPercentage: 60
      };

      mockSupabase.from.mockImplementation((table: string) => {
        if (table === 'user_lesson_progress') {
          return {
            upsert: jest.fn().mockResolvedValue({
              data: {
                lesson_id: lessonSlug,
                user_id: mockUser.id,
                progress_percentage: 60,
                status: 'in_progress',
                completed_sections: ['introduction', 'history-of-crypto']
              },
              error: null
            })
          };
        }
        return mockSupabase.from(table);
      });

      const { POST } = await import('@/app/api/learning/lessons/[slug]/progress/route');
      const { req } = createMocks({
        method: 'POST',
        headers: {
          authorization: 'Bearer test-token',
          'content-type': 'application/json'
        },
        body: progressUpdate
      });

      const response = await POST(
        req as unknown as NextRequest,
        { params: { slug: lessonSlug } }
      );
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.progress.progressPercentage).toBe(60);
      expect(data.progress.completedSections).toContain('history-of-crypto');
    });

    it('レッスン完了時の実績解除', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null
      });

      const lessonSlug = 'what-is-cryptocurrency';
      const completionUpdate = {
        sectionCompleted: 'summary',
        progressPercentage: 100
      };

      // 進捗更新
      mockSupabase.from.mockImplementation((table: string) => {
        if (table === 'user_lesson_progress') {
          return {
            upsert: jest.fn().mockResolvedValue({
              data: {
                lesson_id: lessonSlug,
                progress_percentage: 100,
                status: 'completed',
                completed_at: new Date().toISOString()
              },
              error: null
            })
          };
        }
        if (table === 'user_achievements') {
          return {
            insert: jest.fn().mockResolvedValue({
              data: {
                achievement_id: 'first_lesson_completed',
                user_id: mockUser.id,
                unlocked_at: new Date().toISOString()
              },
              error: null
            })
          };
        }
        return mockSupabase.from(table);
      });

      const { POST } = await import('@/app/api/learning/lessons/[slug]/progress/route');
      const { req } = createMocks({
        method: 'POST',
        headers: {
          authorization: 'Bearer test-token',
          'content-type': 'application/json'
        },
        body: completionUpdate
      });

      const response = await POST(
        req as unknown as NextRequest,
        { params: { slug: lessonSlug } }
      );
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.progress.status).toBe('completed');
      expect(data.achievementsUnlocked).toContain('first_lesson_completed');
    });
  });

  describe('POST /api/learning/lessons/[slug]/quiz', () => {
    it('クイズ回答を正常に処理', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null
      });

      const lessonSlug = 'what-is-cryptocurrency';
      const quizSubmission = {
        answers: [
          { questionId: 'q1', answer: 'a' },
          { questionId: 'q2', answer: 'b' },
          { questionId: 'q3', answer: 'c' }
        ]
      };

      // AI採点
      mockAIService.evaluateQuizAnswer.mockResolvedValue({
        score: 80,
        correctAnswers: 2,
        totalQuestions: 3,
        feedback: {
          q1: { correct: true, explanation: '正解です！' },
          q2: { correct: true, explanation: '素晴らしい理解です！' },
          q3: { correct: false, explanation: 'ブロックチェーンの特徴をもう一度確認しましょう' }
        }
      });

      mockSupabase.from.mockImplementation((table: string) => {
        if (table === 'user_quiz_attempts') {
          return {
            insert: jest.fn().mockResolvedValue({
              data: {
                id: 'attempt-123',
                lesson_id: lessonSlug,
                score: 80,
                passed: true
              },
              error: null
            })
          };
        }
        return mockSupabase.from(table);
      });

      const { POST } = await import('@/app/api/learning/lessons/[slug]/quiz/route');
      const { req } = createMocks({
        method: 'POST',
        headers: {
          authorization: 'Bearer test-token',
          'content-type': 'application/json'
        },
        body: quizSubmission
      });

      const response = await POST(
        req as unknown as NextRequest,
        { params: { slug: lessonSlug } }
      );
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.result.score).toBe(80);
      expect(data.result.passed).toBe(true);
      expect(data.result.feedback).toBeDefined();
    });
  });

  describe('Learning System Performance', () => {
    it('85レッスンの一括読み込みパフォーマンス', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null
      });

      // 全レッスンの進捗データをモック
      const allProgress = learningLessons.map(lesson => ({
        lesson_id: lesson.id,
        status: Math.random() > 0.5 ? 'completed' : 'not_started',
        progress_percentage: Math.random() > 0.5 ? 100 : 0
      }));

      mockSupabase.from.mockImplementation(() => ({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({
          data: allProgress,
          error: null
        })
      }));

      const startTime = Date.now();
      
      const { GET } = await import('@/app/api/learning/lessons/route');
      const { req } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token'
        }
      });

      const response = await GET(req as unknown as NextRequest);
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      expect(response.status).toBe(200);
      expect(responseTime).toBeLessThan(200); // 200ms以内
    });

    it('同時学習セッションの処理', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null
      });

      // 複数レッスンの同時進捗更新
      const simultaneousUpdates = [
        { lessonId: 'lesson-1', progress: 30 },
        { lessonId: 'lesson-2', progress: 50 },
        { lessonId: 'lesson-3', progress: 70 }
      ];

      const updatePromises = simultaneousUpdates.map(async (update) => {
        mockSupabase.from.mockImplementation(() => ({
          upsert: jest.fn().mockResolvedValue({
            data: { lesson_id: update.lessonId, progress_percentage: update.progress },
            error: null
          })
        }));

        const { POST } = await import('@/app/api/learning/lessons/[slug]/progress/route');
        const { req } = createMocks({
          method: 'POST',
          headers: {
            authorization: 'Bearer test-token',
            'content-type': 'application/json'
          },
          body: { progressPercentage: update.progress }
        });

        return POST(
          req as unknown as NextRequest,
          { params: { slug: update.lessonId } }
        );
      });

      const responses = await Promise.all(updatePromises);
      
      responses.forEach(response => {
        expect(response.status).toBe(200);
      });
    });
  });
});