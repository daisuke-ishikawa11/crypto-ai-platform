// 🧪 APIエンドポイント包括テスト
// 主要なAPIエンドポイントの動作確認

import { createMocks } from 'node-mocks-http';
import { NextRequest } from 'next/server';

describe('API Endpoints Comprehensive Tests', () => {
  const mockUser = {
    id: 'test-user-id',
    email: 'test@example.com'
  };

  beforeEach(() => {
    // 環境変数設定
    process.env.NODE_ENV = 'test';
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';
  });

  describe('Learning API Endpoints', () => {
    it('GET /api/learning/lessons - should return lesson list', async () => {
      const { GET } = await import('@/app/api/learning/lessons/route');
      const request = new NextRequest(new URL('http://localhost:3000/api/learning/lessons'), {
        method: 'GET',
        headers: { authorization: 'Bearer test-token' }
      });

      const response = await GET(request);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data).toHaveProperty('lessons');
      expect(Array.isArray(data.lessons)).toBe(true);
      expect(data).toHaveProperty('total');
      expect(typeof data.total).toBe('number');
    });

    it('GET /api/learning/categories - should return category list', async () => {
      const { GET } = await import('@/app/api/learning/categories/route');
      const request = new NextRequest(new URL('http://localhost:3000/api/learning/categories'), {
        method: 'GET',
        headers: { authorization: 'Bearer test-token' }
      });

      const response = await GET(request);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(8); // 8カテゴリー
      
      data.forEach(category => {
        expect(category).toHaveProperty('id');
        expect(category).toHaveProperty('name');
        expect(category).toHaveProperty('description');
        expect(category).toHaveProperty('orderIndex');
        expect(category).toHaveProperty('icon');
      });
    });

    it('GET /api/learning/lessons/[slug] - should return specific lesson', async () => {
      const { GET } = await import('@/app/api/learning/lessons/[slug]/route');
      
      const request = new NextRequest(new URL('http://localhost:3000/api/learning/lessons/test-lesson-slug'), {
        method: 'GET',
        headers: { authorization: 'Bearer test-token' }
      });

      const response = await GET(request, { params: { slug: 'test-lesson-slug' } });
      
      // レッスンが見つからない場合は404、見つかった場合は200
      expect([200, 404]).toContain(response.status);
    });
  });

  describe('Alert API Endpoints', () => {
    it('GET /api/alerts - should return user alerts', async () => {
      const { GET } = await import('@/app/api/alerts/route');
      const request = new NextRequest(new URL('http://localhost:3000/api/alerts'), {
        method: 'GET',
        headers: { authorization: 'Bearer test-token' }
      });

      const response = await GET(request);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data).toHaveProperty('alerts');
      expect(data).toHaveProperty('total');
      expect(data).toHaveProperty('stats');
      expect(Array.isArray(data.alerts)).toBe(true);
    });

    it('POST /api/alerts - should create new alert with validation', async () => {
      const { POST } = await import('@/app/api/alerts/route');
      
      const validAlertData = {
        type: 'price_above',
        symbol: 'BTC',
        targetValue: 50000,
        notificationMethods: ['email'],
        cooldownPeriod: 15
      };

      const request = new NextRequest(new URL('http://localhost:3000/api/alerts'), {
        method: 'POST',
        headers: { 
          authorization: 'Bearer test-token',
          'content-type': 'application/json'
        },
        body: JSON.stringify(validAlertData)
      });

      const response = await POST(request);
      
      // 成功またはバリデーションエラー
      expect([201, 400]).toContain(response.status);
      
      const data = await response.json();
      if (response.status === 201) {
        expect(data).toHaveProperty('alert');
        expect(data.alert).toHaveProperty('id');
      } else {
        expect(data).toHaveProperty('error');
      }
    });
  });

  describe('Market API Endpoints', () => {
    it('GET /api/market/global - should return market data', async () => {
      const { GET } = await import('@/app/api/market/global/route');
      const request = new NextRequest(new URL('http://localhost:3000/api/market/global'), {
        method: 'GET',
        headers: { authorization: 'Bearer test-token' }
      });

      const response = await GET(request);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data).toHaveProperty('totalMarketCap');
      expect(data).toHaveProperty('volume24h');
      expect(data).toHaveProperty('dominance');
      expect(data).toHaveProperty('fearGreedIndex');
    });
  });

  describe('AI API Endpoints', () => {
    it('POST /api/ai/analyze - should analyze market data', async () => {
      const { POST } = await import('@/app/api/ai/analyze/route');
      
      const analysisRequest = {
        symbols: ['BTC', 'ETH'],
        timeframe: '1d',
        analysisType: 'comprehensive'
      };

      const request = new NextRequest(new URL('http://localhost:3000/api/ai/analyze'), {
        method: 'POST',
        headers: { 
          authorization: 'Bearer test-token',
          'content-type': 'application/json'
        },
        body: JSON.stringify(analysisRequest)
      });

      const response = await POST(request);
      expect([200, 400, 503]).toContain(response.status);
      
      const data = await response.json();
      if (response.status === 200) {
        expect(data).toHaveProperty('analysis');
        expect(data).toHaveProperty('recommendations');
        expect(data).toHaveProperty('confidence');
      }
    });
  });

  describe('Health and Monitoring Endpoints', () => {
    it('GET /api/health - should return service health', async () => {
      const { GET } = await import('@/app/api/health/route');
      const request = new NextRequest(new URL('http://localhost:3000/api/health'), {
        method: 'GET'
      });

      const response = await GET(request);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data).toHaveProperty('status');
      expect(data).toHaveProperty('timestamp');
      expect(data).toHaveProperty('services');
      expect(['healthy', 'degraded', 'unhealthy']).toContain(data.status);
    });

    it('GET /api/monitoring/performance - should return performance metrics', async () => {
      const { GET } = await import('@/app/api/monitoring/performance/route');
      const request = new NextRequest(new URL('http://localhost:3000/api/monitoring/performance'), {
        method: 'GET',
        headers: { authorization: 'Bearer admin-token' }
      });

      const response = await GET(request);
      expect([200, 401, 403]).toContain(response.status);
    });
  });

  describe('Security and Validation', () => {
    it('should handle CSRF protection', async () => {
      const { GET } = await import('@/app/api/csrf/route');
      const request = new NextRequest(new URL('http://localhost:3000/api/csrf'), {
        method: 'GET'
      });

      const response = await GET(request);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data).toHaveProperty('csrfToken');
      expect(typeof data.csrfToken).toBe('string');
      expect(data.csrfToken.length).toBeGreaterThan(10);
    });

    it('should validate API rate limiting', async () => {
      // 連続リクエストでレート制限をテスト
      const { GET } = await import('@/app/api/market/global/route');
      
      const promises = Array.from({ length: 5 }, () => {
        const request = new NextRequest(new URL('http://localhost:3000/api/market/global'), {
          method: 'GET',
          headers: { 
            authorization: 'Bearer test-token',
            'x-forwarded-for': '192.168.1.1'
          }
        });
        return GET(request);
      });

      const responses = await Promise.all(promises);
      
      // 少なくとも最初の数回は成功するべき
      const successfulResponses = responses.filter(r => r.status === 200);
      expect(successfulResponses.length).toBeGreaterThan(0);
    });
  });

  describe('Error Handling', () => {
    it('should handle malformed JSON gracefully', async () => {
      const { POST } = await import('@/app/api/alerts/route');
      
      const request = new NextRequest(new URL('http://localhost:3000/api/alerts'), {
        method: 'POST',
        headers: { 
          authorization: 'Bearer test-token',
          'content-type': 'application/json'
        },
        body: 'invalid-json'
      });

      const response = await POST(request);
      expect(response.status).toBe(400);
      
      const data = await response.json();
      expect(data).toHaveProperty('error');
    });

    it('should handle missing required fields', async () => {
      const { POST } = await import('@/app/api/alerts/route');
      
      const incompleteData = {
        type: 'price_above'
        // missing symbol, targetValue, etc.
      };

      const request = new NextRequest(new URL('http://localhost:3000/api/alerts'), {
        method: 'POST',
        headers: { 
          authorization: 'Bearer test-token',
          'content-type': 'application/json'
        },
        body: JSON.stringify(incompleteData)
      });

      const response = await POST(request);
      expect(response.status).toBe(400);
      
      const data = await response.json();
      expect(data).toHaveProperty('error');
      expect(data.error).toContain('required');
    });
  });

  describe('Performance Requirements', () => {
    it('should respond to health check within 100ms', async () => {
      const start = Date.now();
      
      const { GET } = await import('@/app/api/health/route');
      const request = new NextRequest(new URL('http://localhost:3000/api/health'), {
        method: 'GET'
      });
      
      const response = await GET(request);
      const duration = Date.now() - start;
      
      expect(response.status).toBe(200);
      expect(duration).toBeLessThan(100);
    });

    it('should handle concurrent requests efficiently', async () => {
      const { GET } = await import('@/app/api/learning/categories/route');
      
      const start = Date.now();
      const concurrentRequests = Array.from({ length: 10 }, () => {
        const request = new NextRequest(new URL('http://localhost:3000/api/learning/categories'), {
          method: 'GET',
          headers: { authorization: 'Bearer test-token' }
        });
        return GET(request);
      });
      
      const responses = await Promise.all(concurrentRequests);
      const duration = Date.now() - start;
      
      expect(responses.every(r => r.status === 200)).toBe(true);
      expect(duration).toBeLessThan(1000); // 10並列リクエストが1秒以内
    });
  });
});