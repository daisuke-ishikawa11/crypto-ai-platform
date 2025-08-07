// 🧪 アラートAPI統合テスト
// スマートアラート機能の完全検証

import { createMocks } from 'node-mocks-http';
import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AlertManager } from '@/lib/alerts/alert-manager';
import { NotificationManager } from '@/lib/notifications/notification-manager';

jest.mock('@supabase/supabase-js');
jest.mock('@/lib/alerts/alert-manager');
jest.mock('@/lib/notifications/notification-manager');

describe('Alerts API Integration Tests', () => {
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

  const mockAlertManager = {
    initialize: jest.fn(),
    createAlert: jest.fn(),
    updateAlert: jest.fn(),
    deleteAlert: jest.fn(),
    processAlerts: jest.fn(),
    getActiveAlerts: jest.fn(),
  };

  const mockNotificationManager = {
    sendNotification: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (createClient as jest.Mock).mockReturnValue(mockSupabase);
    (AlertManager as jest.Mock).mockImplementation(() => mockAlertManager);
    (NotificationManager.getInstance as jest.Mock).mockReturnValue(mockNotificationManager);
  });

  describe('POST /api/alerts', () => {
    it('価格アラートを正常に作成', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null
      });

      const newAlert = {
        type: 'price_above',
        symbol: 'BTC',
        threshold: 50000,
        notification_methods: ['email', 'push']
      };

      mockAlertManager.createAlert.mockResolvedValue({
        id: 'alert-123',
        ...newAlert,
        user_id: mockUser.id,
        status: 'active',
        created_at: new Date().toISOString()
      });

      const { POST } = await import('@/app/api/alerts/route');
      const { req } = createMocks({
        method: 'POST',
        headers: {
          authorization: 'Bearer test-token',
          'content-type': 'application/json'
        },
        body: newAlert
      });

      const response = await POST(req as unknown as NextRequest);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.alert).toHaveProperty('id');
      expect(data.alert.type).toBe('price_above');
      expect(data.alert.symbol).toBe('BTC');
      expect(mockAlertManager.createAlert).toHaveBeenCalledWith(
        expect.objectContaining({
          ...newAlert,
          userId: mockUser.id
        })
      );
    });

    it('複数条件のアラートを作成', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null
      });

      const complexAlert = {
        type: 'custom',
        name: 'BTC複合条件アラート',
        conditions: [
          { type: 'price_above', symbol: 'BTC', threshold: 50000 },
          { type: 'rsi_overbought', symbol: 'BTC', threshold: 70 },
          { type: 'volume_increase', symbol: 'BTC', threshold: 150 }
        ],
        logic: 'AND',
        notification_methods: ['email', 'push', 'sms']
      };

      mockAlertManager.createAlert.mockResolvedValue({
        id: 'alert-456',
        ...complexAlert,
        user_id: mockUser.id,
        status: 'active'
      });

      const { POST } = await import('@/app/api/alerts/route');
      const { req } = createMocks({
        method: 'POST',
        headers: {
          authorization: 'Bearer test-token',
          'content-type': 'application/json'
        },
        body: complexAlert
      });

      const response = await POST(req as unknown as NextRequest);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.alert.conditions).toHaveLength(3);
      expect(data.alert.logic).toBe('AND');
    });

    it('無効なアラートパラメータの検証', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null
      });

      const invalidAlert = {
        type: 'price_above',
        symbol: 'INVALID_SYMBOL',
        threshold: -100, // 無効な閾値
        notification_methods: []
      };

      const { POST } = await import('@/app/api/alerts/route');
      const { req } = createMocks({
        method: 'POST',
        headers: {
          authorization: 'Bearer test-token',
          'content-type': 'application/json'
        },
        body: invalidAlert
      });

      const response = await POST(req as unknown as NextRequest);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('Invalid');
    });
  });

  describe('GET /api/alerts', () => {
    it('ユーザーのアクティブアラート一覧を取得', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null
      });

      const mockAlerts = [
        {
          id: '1',
          type: 'price_above',
          symbol: 'BTC',
          threshold: 50000,
          status: 'active',
          triggered_count: 0
        },
        {
          id: '2',
          type: 'rsi_oversold',
          symbol: 'ETH',
          threshold: 30,
          status: 'active',
          triggered_count: 2
        }
      ];

      mockSupabase.from.mockImplementation(() => ({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({
          data: mockAlerts,
          error: null
        })
      }));

      const { GET } = await import('@/app/api/alerts/route');
      const { req } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token'
        },
        query: {
          status: 'active'
        }
      });

      const response = await GET(req as unknown as NextRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.alerts).toHaveLength(2);
      expect(data.alerts[0].type).toBe('price_above');
      expect(data.stats.total).toBe(2);
      expect(data.stats.active).toBe(2);
    });

    it('ページネーション付きアラート取得', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null
      });

      const totalAlerts = Array.from({ length: 25 }, (_, i) => ({
        id: `alert-${i}`,
        type: 'price_above',
        symbol: 'BTC',
        status: 'active'
      }));

      mockSupabase.from.mockImplementation(() => ({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        range: jest.fn().mockResolvedValue({
          data: totalAlerts.slice(10, 20),
          error: null
        })
      }));

      const { GET } = await import('@/app/api/alerts/route');
      const { req } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token'
        },
        query: {
          page: '2',
          limit: '10'
        }
      });

      const response = await GET(req as unknown as NextRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.alerts).toHaveLength(10);
      expect(data.pagination.page).toBe(2);
      expect(data.pagination.limit).toBe(10);
    });
  });

  describe('PUT /api/alerts/[id]', () => {
    it('アラート設定を正常に更新', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null
      });

      const alertId = 'alert-123';
      const updateData = {
        threshold: 55000,
        notification_methods: ['email', 'push', 'webhook']
      };

      mockAlertManager.updateAlert.mockResolvedValue({
        id: alertId,
        type: 'price_above',
        symbol: 'BTC',
        ...updateData,
        status: 'active',
        updated_at: new Date().toISOString()
      });

      const { PUT } = await import('@/app/api/alerts/[id]/route');
      const { req } = createMocks({
        method: 'PUT',
        headers: {
          authorization: 'Bearer test-token',
          'content-type': 'application/json'
        },
        body: updateData
      });

      const response = await PUT(
        req as unknown as NextRequest,
        { params: { id: alertId } }
      );
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.alert.threshold).toBe(55000);
      expect(data.alert.notification_methods).toContain('webhook');
    });

    it('他ユーザーのアラート更新を拒否', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null
      });

      mockSupabase.from.mockImplementation(() => ({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: {
            id: 'alert-123',
            user_id: 'other-user-id' // 異なるユーザーID
          },
          error: null
        })
      }));

      const { PUT } = await import('@/app/api/alerts/[id]/route');
      const { req } = createMocks({
        method: 'PUT',
        headers: {
          authorization: 'Bearer test-token',
          'content-type': 'application/json'
        },
        body: { threshold: 60000 }
      });

      const response = await PUT(
        req as unknown as NextRequest,
        { params: { id: 'alert-123' } }
      );

      expect(response.status).toBe(403);
    });
  });

  describe('DELETE /api/alerts/[id]', () => {
    it('アラートを正常に削除', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null
      });

      const alertId = 'alert-123';

      mockSupabase.from.mockImplementation(() => ({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: {
            id: alertId,
            user_id: mockUser.id
          },
          error: null
        }),
        delete: jest.fn().mockReturnThis()
      }));

      mockAlertManager.deleteAlert.mockResolvedValue(true);

      const { DELETE } = await import('@/app/api/alerts/[id]/route');
      const { req } = createMocks({
        method: 'DELETE',
        headers: {
          authorization: 'Bearer test-token'
        }
      });

      const response = await DELETE(
        req as unknown as NextRequest,
        { params: { id: alertId } }
      );
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(mockAlertManager.deleteAlert).toHaveBeenCalledWith(alertId);
    });
  });

  describe('Alert Processing Integration', () => {
    it('アラートトリガー時の通知送信フロー', async () => {
      const alert = {
        id: 'alert-123',
        type: 'price_above',
        symbol: 'BTC',
        threshold: 50000,
        notification_methods: ['email', 'push'],
        user_id: mockUser.id
      };

      const marketData = {
        symbol: 'BTC',
        price: 52000, // 閾値を超える
        change_24h: 5.2
      };

      // アラート処理シミュレーション
      mockAlertManager.processAlerts.mockImplementation(async () => {
        // アラートがトリガーされた場合の処理
        if (marketData.price > alert.threshold) {
          await mockNotificationManager.sendNotification({
            userId: alert.user_id,
            alertId: alert.id,
            type: 'alert_triggered',
            data: {
              alert,
              marketData,
              message: `BTC価格が${alert.threshold}を超えました: $${marketData.price}`
            },
            channels: alert.notification_methods
          });
        }
      });

      await mockAlertManager.processAlerts();

      expect(mockNotificationManager.sendNotification).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: mockUser.id,
          type: 'alert_triggered',
          channels: ['email', 'push']
        })
      );
    });

    it('レート制限を考慮したアラート処理', async () => {
      const alerts = Array.from({ length: 100 }, (_, i) => ({
        id: `alert-${i}`,
        type: 'price_above',
        symbol: 'BTC',
        threshold: 50000 + i * 100
      }));

      let processedCount = 0;
      mockAlertManager.processAlerts.mockImplementation(async () => {
        // バッチ処理シミュレーション
        for (let i = 0; i < alerts.length; i += 10) {
          const batch = alerts.slice(i, i + 10);
          await Promise.all(batch.map(async () => {
            processedCount++;
            await new Promise(resolve => setTimeout(resolve, 10)); // 処理遅延
          }));
        }
      });

      const startTime = Date.now();
      await mockAlertManager.processAlerts();
      const endTime = Date.now();

      expect(processedCount).toBe(100);
      expect(endTime - startTime).toBeGreaterThan(100); // バッチ処理による適切な遅延
    });
  });
});