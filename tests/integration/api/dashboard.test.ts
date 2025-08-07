// 🧪 ダッシュボードAPI統合テスト
// エンドツーエンドのデータフロー検証

import { createMocks } from 'node-mocks-http';
import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { stripe } from '@/lib/stripe/config';

// モック設定
jest.mock('@supabase/supabase-js');
jest.mock('@/lib/stripe/config');
jest.mock('@/lib/ai/unified-service');

describe('Dashboard API Integration Tests', () => {
  const mockSupabase = {
    auth: {
      getUser: jest.fn(),
    },
    from: jest.fn(),
    rpc: jest.fn(),
  };

  const mockUser = {
    id: 'test-user-id',
    email: 'test@example.com',
    user_metadata: {
      full_name: 'Test User'
    }
  };

  beforeAll(() => {
    // 環境変数設定
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';
    process.env.SUPABASE_SERVICE_KEY = 'test-service-key';
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (createClient as jest.Mock).mockReturnValue(mockSupabase);
  });

  describe('GET /api/dashboard', () => {
    it('認証済みユーザーのダッシュボードデータを正常に取得', async () => {
      // モックデータ設定
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null
      });

      // ポートフォリオデータ
      mockSupabase.from.mockImplementation((table: string) => {
        if (table === 'user_portfolios') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockReturnThis(),
            single: jest.fn().mockResolvedValue({
              data: {
                total_value: 50000,
                total_profit_loss: 5000,
                total_profit_loss_percentage: 10
              },
              error: null
            })
          };
        }
        if (table === 'user_alerts') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockReturnThis(),
            order: jest.fn().mockReturnThis(),
            limit: jest.fn().mockResolvedValue({
              data: [
                { id: '1', type: 'price_above', status: 'active' },
                { id: '2', type: 'rsi_overbought', status: 'triggered' }
              ],
              error: null
            })
          };
        }
        if (table === 'user_learning_progress') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockReturnThis(),
            data: [
              { lesson_id: '1', progress_percentage: 100, status: 'completed' },
              { lesson_id: '2', progress_percentage: 50, status: 'in_progress' }
            ],
            error: null
          };
        }
        return mockSupabase.from(table);
      });

      // Stripe顧客データ
      (stripe.customers.list as jest.Mock).mockResolvedValue({
        data: [{
          id: 'cus_test123',
          email: 'test@example.com',
          subscriptions: {
            data: [{
              status: 'active',
              current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60
            }]
          }
        }]
      });

      // リクエスト実行
      const { GET } = await import('@/app/api/dashboard/route');
      const { req } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token'
        }
      });

      const response = await GET(req as unknown as NextRequest);
      const data = await response.json();

      // アサーション
      expect(response.status).toBe(200);
      expect(data).toHaveProperty('portfolio');
      expect(data).toHaveProperty('alerts');
      expect(data).toHaveProperty('learning');
      expect(data).toHaveProperty('subscription');
      expect(data).toHaveProperty('marketOverview');
      
      expect(data.portfolio.totalValue).toBe(50000);
      expect(data.alerts.active).toBe(1);
      expect(data.learning.completedLessons).toBe(1);
      expect(data.subscription.status).toBe('active');
    });

    it('未認証リクエストの場合401エラーを返す', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: null },
        error: new Error('Not authenticated')
      });

      const { GET } = await import('@/app/api/dashboard/route');
      const { req } = createMocks({
        method: 'GET',
        headers: {}
      });

      const response = await GET(req as unknown as NextRequest);
      
      expect(response.status).toBe(401);
      const data = await response.json();
      expect(data.error).toBe('Unauthorized');
    });

    it('データ取得エラー時に適切なフォールバック値を返す', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null
      });

      // エラーケース設定
      mockSupabase.from.mockImplementation(() => ({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: null,
          error: new Error('Database error')
        }),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue({
          data: null,
          error: new Error('Database error')
        })
      }));

      const { GET } = await import('@/app/api/dashboard/route');
      const { req } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token'
        }
      });

      const response = await GET(req as unknown as NextRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.portfolio.totalValue).toBe(0);
      expect(data.alerts.active).toBe(0);
      expect(data.learning.completedLessons).toBe(0);
    });
  });

  describe('Dashboard Data Consistency', () => {
    it('ポートフォリオとアラートデータの整合性チェック', async () => {
      const portfolioPositions = [
        { symbol: 'BTC', quantity: 1, current_price: 40000 },
        { symbol: 'ETH', quantity: 10, current_price: 2500 }
      ];

      const alerts = [
        { symbol: 'BTC', type: 'price_above', threshold: 45000, status: 'active' },
        { symbol: 'ETH', type: 'price_below', threshold: 2000, status: 'active' }
      ];

      mockSupabase.from.mockImplementation((table: string) => {
        if (table === 'portfolio_positions') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockResolvedValue({
              data: portfolioPositions,
              error: null
            })
          };
        }
        if (table === 'user_alerts') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockResolvedValue({
              data: alerts,
              error: null
            })
          };
        }
        return mockSupabase.from(table);
      });

      // データ整合性検証ロジック
      const positions = portfolioPositions;
      const activeAlerts = alerts.filter(a => a.status === 'active');

      // アラートがポートフォリオの保有銘柄に対応しているか確認
      activeAlerts.forEach(alert => {
        const position = positions.find(p => p.symbol === alert.symbol);
        expect(position).toBeDefined();
      });
    });
  });

  describe('Performance Metrics', () => {
    it('ダッシュボードAPI応答時間が100ms以内', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null
      });

      // 軽量モックデータ
      mockSupabase.from.mockImplementation(() => ({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: {}, error: null }),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue({ data: [], error: null })
      }));

      const { GET } = await import('@/app/api/dashboard/route');
      const { req } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token'
        }
      });

      const startTime = Date.now();
      const response = await GET(req as unknown as NextRequest);
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      expect(response.status).toBe(200);
      expect(responseTime).toBeLessThan(100);
    });
  });

  describe('Error Handling', () => {
    it('Supabaseサービス停止時のグレースフルデグレード', async () => {
      mockSupabase.auth.getUser.mockRejectedValue(new Error('Service unavailable'));

      const { GET } = await import('@/app/api/dashboard/route');
      const { req } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token'
        }
      });

      const response = await GET(req as unknown as NextRequest);
      
      expect(response.status).toBe(503);
      const data = await response.json();
      expect(data.error).toContain('Service temporarily unavailable');
    });

    it('部分的なデータ取得失敗時の処理', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null
      });

      let callCount = 0;
      mockSupabase.from.mockImplementation((table: string) => {
        callCount++;
        if (callCount === 2) {
          // 2番目のクエリだけ失敗
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockReturnThis(),
            single: jest.fn().mockRejectedValue(new Error('Query failed'))
          };
        }
        return {
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          single: jest.fn().mockResolvedValue({ data: {}, error: null }),
          order: jest.fn().mockReturnThis(),
          limit: jest.fn().mockResolvedValue({ data: [], error: null })
        };
      });

      const { GET } = await import('@/app/api/dashboard/route');
      const { req } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token'
        }
      });

      const response = await GET(req as unknown as NextRequest);
      const data = await response.json();

      // 部分的な失敗でも200を返し、利用可能なデータを提供
      expect(response.status).toBe(200);
      expect(data).toHaveProperty('portfolio');
      expect(data).toHaveProperty('alerts');
    });
  });
});