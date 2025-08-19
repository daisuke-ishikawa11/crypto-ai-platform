// 🧪 完全フロー統合テスト
// ユーザー登録から学習・取引・決済までの全体フロー検証

import { createMocks } from 'node-mocks-http';
import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { stripe } from '@/lib/stripe/config';
import { UnifiedAIService } from '@/lib/ai/unified-service';
import { AlertManager } from '@/lib/alerts/alert-manager';

jest.mock('@supabase/supabase-js');
jest.mock('@/lib/stripe/config');
jest.mock('@/lib/ai/unified-service');
jest.mock('@/lib/alerts/alert-manager');

describe('Full User Journey Integration Tests', () => {
  const mockSupabase = {
    auth: {
      signUp: jest.fn(),
      getUser: jest.fn(),
      getSession: jest.fn(),
    },
    from: jest.fn(),
    rpc: jest.fn(),
  };

  const mockStripe = {
    customers: {
      create: jest.fn(),
      list: jest.fn(),
    },
    subscriptions: {
      create: jest.fn(),
    },
    paymentMethods: {
      attach: jest.fn(),
    },
  };

  const mockAIService = {
    performChatAnalysis: jest.fn(),
    generateLearningRecommendations: jest.fn(),
    analyzeMarketConditions: jest.fn(),
  };

  const mockAlertManager = {
    createAlert: jest.fn(),
    processAlerts: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (createClient as jest.MockedFunction<typeof createClient>).mockReturnValue(mockSupabase as any);
    jest.mocked(stripe).mockReturnValue(mockStripe as any);
    (UnifiedAIService.getInstance as jest.Mock).mockReturnValue(mockAIService);
    (AlertManager as jest.Mock).mockImplementation(() => mockAlertManager);
  });

  describe('新規ユーザー完全フロー', () => {
    const testUser = {
      id: 'new-user-123',
      email: 'newuser@example.com',
      user_metadata: {
        full_name: '新規 太郎'
      }
    };

    it('1. ユーザー登録 → プロファイル作成 → 無料プラン開始', async () => {
      // Step 1: ユーザー登録
      mockSupabase.auth.signUp.mockResolvedValue({
        data: {
          user: testUser,
          session: { access_token: 'test-token' }
        },
        error: null
      });

      // Step 2: Stripe顧客作成
      mockStripe.customers.create.mockResolvedValue({
        id: 'cus_new123',
        email: testUser.email
      });

      // Step 3: ユーザープロファイル作成
      mockSupabase.from.mockImplementation((table: string) => {
        if (table === 'user_profiles') {
          return {
            insert: jest.fn().mockResolvedValue({
              data: {
                user_id: testUser.id,
                full_name: testUser.user_metadata.full_name,
                onboarding_completed: false
              },
              error: null
            })
          };
        }
        return mockSupabase.from(table);
      });

      // 登録APIコール
      const { POST: signUp } = await import('@/app/api/auth/signup/route');
      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: {
          email: testUser.email,
          password: 'SecurePassword123!',
          fullName: testUser.user_metadata.full_name
        }
      });

      const response = await signUp(req as NextRequest);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.user.email).toBe(testUser.email);
      expect(mockStripe.customers.create).toHaveBeenCalled();
    });

    it('2. オンボーディング → 学習開始 → 最初のレッスン完了', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: testUser },
        error: null
      });

      // オンボーディング完了
      mockSupabase.from.mockImplementation((table: string) => {
        if (table === 'user_profiles') {
          return {
            update: jest.fn().mockReturnThis(),
            eq: jest.fn().mockResolvedValue({
              data: { onboarding_completed: true },
              error: null
            })
          };
        }
        if (table === 'user_preferences') {
          return {
            insert: jest.fn().mockResolvedValue({
              data: {
                user_id: testUser.id,
                learning_pace: 'moderate',
                interested_topics: ['financial-literacy', 'trading-basics'],
                risk_tolerance: 'conservative'
              },
              error: null
            })
          };
        }
        return mockSupabase.from(table);
      });

      // AI推奨学習パス生成
      mockAIService.generateLearningRecommendations.mockResolvedValue({
        recommendedLessons: [
          { lessonId: 'what-is-cryptocurrency', reason: '暗号通貨の基礎から始めましょう' },
          { lessonId: 'blockchain-basics', reason: 'ブロックチェーン技術の理解が重要です' }
        ],
        learningPath: ['what-is-cryptocurrency', 'blockchain-basics', 'bitcoin-overview']
      });

      // オンボーディングAPI
      const { POST: completeOnboarding } = await import('@/app/api/onboarding/complete/route');
      const { req: onboardingReq } = createMocks({
        method: 'POST',
        headers: {
          authorization: 'Bearer test-token',
          'content-type': 'application/json'
        },
        body: {
          preferences: {
            learningPace: 'moderate',
            interestedTopics: ['financial-literacy', 'trading-basics'],
            riskTolerance: 'conservative'
          }
        }
      });

      const onboardingResponse = await completeOnboarding(onboardingReq as NextRequest);
      expect(onboardingResponse.status).toBe(200);

      // 最初のレッスン開始
      const { POST: startLesson } = await import('@/app/api/learning/lessons/[slug]/progress/route');
      const { req: lessonReq } = createMocks({
        method: 'POST',
        headers: {
          authorization: 'Bearer test-token',
          'content-type': 'application/json'
        },
        body: {
          action: 'start',
          timeSpent: 0
        }
      });

      const lessonResponse = await startLesson(
        lessonReq as NextRequest,
        { params: { slug: 'what-is-cryptocurrency' } }
      );
      expect(lessonResponse.status).toBe(200);
    });

    it('3. 有料プランアップグレード → 高度な機能解除', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: testUser },
        error: null
      });

      // Stripeサブスクリプション作成
      mockStripe.subscriptions.create.mockResolvedValue({
        id: 'sub_pro123',
        customer: 'cus_new123',
        status: 'active',
        items: {
          data: [{
            price: {
              id: 'price_pro_monthly',
              unit_amount: 9900
            }
          }]
        },
        current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60
      });

      // データベース更新
      mockSupabase.from.mockImplementation((table: string) => {
        if (table === 'user_subscriptions') {
          return {
            upsert: jest.fn().mockResolvedValue({
              data: {
                user_id: testUser.id,
                stripe_subscription_id: 'sub_pro123',
                status: 'active',
                plan_type: 'pro'
              },
              error: null
            })
          };
        }
        if (table === 'user_features') {
          return {
            update: jest.fn().mockReturnThis(),
            eq: jest.fn().mockResolvedValue({
              data: {
                premium_features_enabled: true,
                ai_analysis_limit: 100,
                alert_limit: 50
              },
              error: null
            })
          };
        }
        return mockSupabase.from(table);
      });

      // アップグレードAPI
      const { POST: createSubscription } = await import('@/app/api/stripe/subscriptions/route');
      const { req } = createMocks({
        method: 'POST',
        headers: {
          authorization: 'Bearer test-token',
          'content-type': 'application/json'
        },
        body: {
          priceId: 'price_pro_monthly',
          paymentMethodId: 'pm_test123'
        }
      });

      const response = await createSubscription(req as NextRequest);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.subscription.status).toBe('active');
    });

    it('4. アラート設定 → AI分析 → 取引シグナル受信', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: testUser },
        error: null
      });

      // アラート作成
      const alertConfig = {
        type: 'smart_composite',
        name: 'BTC投資機会アラート',
        conditions: [
          { type: 'price_below', symbol: 'BTC', threshold: 40000 },
          { type: 'rsi_oversold', symbol: 'BTC', threshold: 30 },
          { type: 'ai_signal', symbol: 'BTC', signalType: 'buy_opportunity' }
        ],
        logic: 'AND',
        notification_methods: ['email', 'push', 'in_app']
      };

      mockAlertManager.createAlert.mockResolvedValue({
        id: 'alert-smart-123',
        ...alertConfig,
        user_id: testUser.id,
        status: 'active'
      });

      // AI市場分析
      mockAIService.analyzeMarketConditions.mockResolvedValue({
        symbol: 'BTC',
        signal: 'buy_opportunity',
        confidence: 0.85,
        analysis: {
          technical: 'RSI oversold, strong support at $39,500',
          fundamental: 'Positive on-chain metrics, accumulation phase',
          sentiment: 'Fear index showing extreme fear - contrarian buy signal'
        },
        recommendations: [
          'Consider DCA entry between $39,500-$40,500',
          'Set stop loss at $38,000',
          'Target profit zones: $45,000, $48,000'
        ]
      });

      // アラート作成API
      const { POST: createAlert } = await import('@/app/api/alerts/route');
      const { req: alertReq } = createMocks({
        method: 'POST',
        headers: {
          authorization: 'Bearer test-token',
          'content-type': 'application/json'
        },
        body: alertConfig
      });

      const alertResponse = await createAlert(alertReq as NextRequest);
      expect(alertResponse.status).toBe(201);

      // アラート処理（トリガー）
      await mockAlertManager.processAlerts();

      // 通知確認
      mockSupabase.from.mockImplementation((table: string) => {
        if (table === 'user_notifications') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockReturnThis(),
            order: jest.fn().mockReturnThis(),
            limit: jest.fn().mockResolvedValue({
              data: [{
                id: 'notif-123',
                type: 'alert_triggered',
                title: 'BTC投資機会アラート',
                message: 'BTCが買いシグナルを発生しました',
                data: {
                  alertId: 'alert-smart-123',
                  analysis: mockAIService.analyzeMarketConditions()
                }
              }],
              error: null
            })
          };
        }
        return mockSupabase.from(table);
      });

      // 通知取得API
      const { GET: getNotifications } = await import('@/app/api/notifications/route');
      const { req: notifReq } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token'
        }
      });

      const notifResponse = await getNotifications(notifReq as NextRequest);
      const notifData = await notifResponse.json();

      expect(notifResponse.status).toBe(200);
      expect(notifData.notifications).toHaveLength(1);
      expect(notifData.notifications[0].type).toBe('alert_triggered');
    });

    it('5. DeFi監視 → リスクアラート → ポートフォリオ調整', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: testUser },
        error: null
      });

      // DeFiポジション
      const defiPositions = [
        {
          protocol: 'Uniswap',
          pool: 'ETH-USDC',
          value_usd: 10000,
          apy: 15.5,
          impermanent_loss: -2.3
        },
        {
          protocol: 'Aave',
          asset: 'USDC',
          value_usd: 5000,
          apy: 8.2,
          health_factor: 2.5
        }
      ];

      // リスクアラート
      const riskAlert = {
        type: 'defi_risk',
        severity: 'medium',
        protocol: 'Aave',
        message: 'Health factorが2.5に低下しました',
        recommendations: [
          '追加担保の預入を検討してください',
          '借入額の一部返済を推奨します'
        ]
      };

      mockSupabase.from.mockImplementation((table: string) => {
        if (table === 'user_defi_positions') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockResolvedValue({
              data: defiPositions,
              error: null
            })
          };
        }
        if (table === 'defi_risk_alerts') {
          return {
            insert: jest.fn().mockResolvedValue({
              data: riskAlert,
              error: null
            })
          };
        }
        return mockSupabase.from(table);
      });

      // DeFi監視API
      const { GET: getDefiStatus } = await import('@/app/api/defi/status/route');
      const { req } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token'
        }
      });

      const response = await getDefiStatus(req as NextRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.positions).toHaveLength(2);
      expect(data.totalValue).toBe(15000);
      expect(data.riskAlerts).toHaveLength(1);
    });
  });

  describe('エラーリカバリーとフォールバック', () => {
    it('部分的なサービス障害時の優雅な劣化', async () => {
      const testUser = {
        id: 'user-456',
        email: 'test@example.com'
      };

      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: testUser },
        error: null
      });

      // Stripeサービス停止をシミュレート
      mockStripe.customers.list.mockRejectedValue(new Error('Service unavailable'));

      // AI サービス部分障害
      mockAIService.analyzeMarketConditions.mockRejectedValue(new Error('AI service error'));
      mockAIService.generateLearningRecommendations.mockResolvedValue({
        recommendedLessons: [], // フォールバック：空の推奨
        learningPath: []
      });

      // ダッシュボードAPI（フォールバック処理）
      const { GET: getDashboard } = await import('@/app/api/dashboard/route');
      const { req } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token'
        }
      });

      const response = await getDashboard(req as NextRequest);
      const data = await response.json();

      // 部分的なエラーでも200を返し、利用可能なデータを提供
      expect(response.status).toBe(200);
      expect(data).toHaveProperty('portfolio');
      expect(data).toHaveProperty('learning');
      expect(data.subscription).toBeNull(); // Stripeエラーのためnull
      expect(data.marketAnalysis).toBeNull(); // AIエラーのためnull
    });

    it('同時大量リクエストの処理', async () => {
      const testUser = {
        id: 'user-789',
        email: 'load@example.com'
      };

      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: testUser },
        error: null
      });

      // 100個の同時リクエストをシミュレート
      const { GET } = await import('@/app/api/market/prices/route');
      const requests = Array.from({ length: 100 }, (_, i) => {
        const { req } = createMocks({
          method: 'GET',
          headers: {
            authorization: 'Bearer test-token'
          },
          query: {
            symbols: 'BTC,ETH',
            requestId: `req-${i}`
          }
        });

        return GET(req as NextRequest);
      });

      const startTime = Date.now();
      const responses = await Promise.all(requests);
      const endTime = Date.now();
      const totalTime = endTime - startTime;

      // すべてのリクエストが成功
      responses.forEach(response => {
        expect(response.status).toBe(200);
      });

      // 並列処理により妥当な時間内に完了
      expect(totalTime).toBeLessThan(5000); // 5秒以内
    });
  });

  describe('セキュリティとコンプライアンス', () => {
    it('不正なアクセス試行の検出とブロック', async () => {
      // 無効なトークン
      const { GET } = await import('@/app/api/dashboard/route');
      const { req: invalidReq } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer invalid-token'
        }
      });

      const invalidResponse = await GET(invalidReq as NextRequest);
      expect(invalidResponse.status).toBe(401);

      // SQLインジェクション試行
      const { POST } = await import('@/app/api/alerts/route');
      const { req: sqlReq } = createMocks({
        method: 'POST',
        headers: {
          authorization: 'Bearer test-token',
          'content-type': 'application/json'
        },
        body: {
          type: "'; DROP TABLE users; --",
          symbol: 'BTC',
          threshold: 50000
        }
      });

      const sqlResponse = await POST(sqlReq as NextRequest);
      expect(sqlResponse.status).toBe(400); // バリデーションエラー

      // レート制限チェック
      const rateLimitRequests = Array.from({ length: 150 }, () => {
        const { req } = createMocks({
          method: 'GET',
          headers: {
            authorization: 'Bearer test-token'
          }
        });
        return GET(req as NextRequest);
      });

      // 最初の100リクエストは成功、その後はレート制限
      const rateLimitResponses = await Promise.all(rateLimitRequests);
      const successCount = rateLimitResponses.filter(r => r.status === 200).length;
      const rateLimitedCount = rateLimitResponses.filter(r => r.status === 429).length;

      expect(successCount).toBeLessThanOrEqual(100);
      expect(rateLimitedCount).toBeGreaterThan(0);
    });
  });
});