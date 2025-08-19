// 🧪 パフォーマンス統合テスト
// 応答時間・スループット・リソース使用量の検証

import { createMocks } from 'node-mocks-http';
import { NextRequest } from 'next/server';
import { performance } from 'perf_hooks';

describe('Performance Integration Tests', () => {
  // パフォーマンスメトリクス収集
  const performanceMetrics: Record<string, number[]> = {};

  const measurePerformance = async (
    name: string,
    fn: () => Promise<any>
  ): Promise<{ result: any; duration: number }> => {
    const start = performance.now();
    const result = await fn();
    const duration = performance.now() - start;

    if (!performanceMetrics[name]) {
      performanceMetrics[name] = [];
    }
    performanceMetrics[name].push(duration);

    return { result, duration };
  };

  afterAll(() => {
    // パフォーマンスレポート出力
    console.log('\n=== Performance Report ===');
    Object.entries(performanceMetrics).forEach(([name, durations]) => {
      const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
      const max = Math.max(...durations);
      const min = Math.min(...durations);
      const p95 = durations.sort((a, b) => a - b)[Math.floor(durations.length * 0.95)];

      console.log(`\n${name}:`);
      console.log(`  Average: ${avg.toFixed(2)}ms`);
      console.log(`  Min: ${min.toFixed(2)}ms`);
      console.log(`  Max: ${max.toFixed(2)}ms`);
      console.log(`  P95: ${p95.toFixed(2)}ms`);
    });
  });

  describe('API Response Time Tests', () => {
    it('ダッシュボードAPIが100ms以内に応答', async () => {
      const { GET } = await import('@/app/api/dashboard/route');
      
      const { result, duration } = await measurePerformance('Dashboard API', async () => {
        const { req } = createMocks({
          method: 'GET',
          headers: {
            authorization: 'Bearer test-token'
          }
        });

        return GET(req as NextRequest);
      });

      expect(result.status).toBe(200);
      expect(duration).toBeLessThan(100);
    });

    it('市場価格APIが50ms以内に応答', async () => {
      const { GET } = await import('@/app/api/market/prices/route');
      
      const { result, duration } = await measurePerformance('Market Prices API', async () => {
        const { req } = createMocks({
          method: 'GET',
          headers: {
            authorization: 'Bearer test-token'
          },
          query: {
            symbols: 'BTC,ETH,BNB'
          }
        });

        return GET(req as NextRequest);
      });

      expect(result.status).toBe(200);
      expect(duration).toBeLessThan(50);
    });

    it('学習レッスン一覧APIが150ms以内に応答', async () => {
      const { GET } = await import('@/app/api/learning/lessons/route');
      
      const { result, duration } = await measurePerformance('Learning Lessons API', async () => {
        const { req } = createMocks({
          method: 'GET',
          headers: {
            authorization: 'Bearer test-token'
          }
        });

        return GET(req as NextRequest);
      });

      expect(result.status).toBe(200);
      expect(duration).toBeLessThan(150);
    });

    it('AI分析APIが3秒以内に応答', async () => {
      const { POST } = await import('@/app/api/ai/analysis/route');
      
      const { result, duration } = await measurePerformance('AI Analysis API', async () => {
        const { req } = createMocks({
          method: 'POST',
          headers: {
            authorization: 'Bearer test-token',
            'content-type': 'application/json'
          },
          body: {
            query: 'BTCの今後の価格動向を分析してください',
            context: {
              currentPrice: 45000,
              trend: 'bullish'
            }
          }
        });

        return POST(req as NextRequest);
      });

      expect(result.status).toBe(200);
      expect(duration).toBeLessThan(3000);
    });
  });

  describe('Concurrent Request Handling', () => {
    it('100件の同時リクエストを2秒以内に処理', async () => {
      const { GET } = await import('@/app/api/market/prices/route');
      
      const { duration } = await measurePerformance('100 Concurrent Requests', async () => {
        const requests = Array.from({ length: 100 }, () => {
          const { req } = createMocks({
            method: 'GET',
            headers: {
              authorization: 'Bearer test-token'
            },
            query: {
              symbols: 'BTC'
            }
          });

          return GET(req as NextRequest);
        });

        return Promise.all(requests);
      });

      expect(duration).toBeLessThan(2000);
    });

    it('混合ワークロード（読み書き）の並列処理', async () => {
      const { duration } = await measurePerformance('Mixed Workload', async () => {
        const readRequests = Array.from({ length: 50 }, async () => {
          const { GET } = await import('@/app/api/dashboard/route');
          const { req } = createMocks({
            method: 'GET',
            headers: { authorization: 'Bearer test-token' }
          });
          return GET(req as NextRequest);
        });

        const writeRequests = Array.from({ length: 25 }, async () => {
          const { POST } = await import('@/app/api/alerts/route');
          const { req } = createMocks({
            method: 'POST',
            headers: {
              authorization: 'Bearer test-token',
              'content-type': 'application/json'
            },
            body: {
              type: 'price_above',
              symbol: 'BTC',
              threshold: 50000
            }
          });
          return POST(req as NextRequest);
        });

        const aiRequests = Array.from({ length: 10 }, async () => {
          const { POST } = await import('@/app/api/ai/chat/route');
          const { req } = createMocks({
            method: 'POST',
            headers: {
              authorization: 'Bearer test-token',
              'content-type': 'application/json'
            },
            body: {
              message: 'ビットコインの基本を教えて'
            }
          });
          return POST(req as NextRequest);
        });

        return Promise.all([...readRequests, ...writeRequests, ...aiRequests]);
      });

      expect(duration).toBeLessThan(5000);
    });
  });

  describe('Data Loading Performance', () => {
    it('1000件のアラート読み込みが500ms以内', async () => {
      const { GET } = await import('@/app/api/alerts/route');
      
      const { result, duration } = await measurePerformance('Load 1000 Alerts', async () => {
        const { req } = createMocks({
          method: 'GET',
          headers: {
            authorization: 'Bearer test-token'
          },
          query: {
            limit: '1000'
          }
        });

        return GET(req as NextRequest);
      });

      expect(result.status).toBe(200);
      expect(duration).toBeLessThan(500);
    });

    it('30日分の市場データ取得が1秒以内', async () => {
      const { GET } = await import('@/app/api/market/history/route');
      
      const { result, duration } = await measurePerformance('30 Days Market Data', async () => {
        const { req } = createMocks({
          method: 'GET',
          headers: {
            authorization: 'Bearer test-token'
          },
          query: {
            symbol: 'BTC',
            period: '30d'
          }
        });

        return GET(req as NextRequest);
      });

      expect(result.status).toBe(200);
      expect(duration).toBeLessThan(1000);
    });
  });

  describe('Cache Performance', () => {
    it('キャッシュヒット時の応答が10ms以内', async () => {
      const { GET } = await import('@/app/api/market/prices/route');
      
      // 初回リクエスト（キャッシュミス）
      const { req: firstReq } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token'
        },
        query: {
          symbols: 'BTC,ETH'
        }
      });
      await GET(firstReq as NextRequest);

      // 2回目リクエスト（キャッシュヒット）
      const { result, duration } = await measurePerformance('Cache Hit', async () => {
        const { req } = createMocks({
          method: 'GET',
          headers: {
            authorization: 'Bearer test-token'
          },
          query: {
            symbols: 'BTC,ETH'
          }
        });

        return GET(req as NextRequest);
      });

      expect(result.status).toBe(200);
      expect(duration).toBeLessThan(10);
    });

    it('キャッシュウォームアップの効果測定', async () => {
      const symbols = ['BTC', 'ETH', 'BNB', 'ADA', 'DOT', 'LINK', 'UNI', 'MATIC'];
      
      // ウォームアップ前
      const coldStartDurations: number[] = [];
      for (const symbol of symbols) {
        const { duration } = await measurePerformance(`Cold Start - ${symbol}`, async () => {
          const { GET } = await import('@/app/api/market/prices/route');
          const { req } = createMocks({
            method: 'GET',
            headers: { authorization: 'Bearer test-token' },
            query: { symbols: symbol }
          });
          return GET(req as NextRequest);
        });
        coldStartDurations.push(duration);
      }

      // ウォームアップ後
      const warmStartDurations: number[] = [];
      for (const symbol of symbols) {
        const { duration } = await measurePerformance(`Warm Start - ${symbol}`, async () => {
          const { GET } = await import('@/app/api/market/prices/route');
          const { req } = createMocks({
            method: 'GET',
            headers: { authorization: 'Bearer test-token' },
            query: { symbols: symbol }
          });
          return GET(req as NextRequest);
        });
        warmStartDurations.push(duration);
      }

      const avgCold = coldStartDurations.reduce((a, b) => a + b, 0) / coldStartDurations.length;
      const avgWarm = warmStartDurations.reduce((a, b) => a + b, 0) / warmStartDurations.length;

      // ウォームスタートが50%以上高速
      expect(avgWarm).toBeLessThan(avgCold * 0.5);
    });
  });

  describe('Database Query Performance', () => {
    it('複雑なJOINクエリが200ms以内', async () => {
      const { GET } = await import('@/app/api/portfolio/analysis/route');
      
      const { result, duration } = await measurePerformance('Complex JOIN Query', async () => {
        const { req } = createMocks({
          method: 'GET',
          headers: {
            authorization: 'Bearer test-token'
          },
          query: {
            includeHistory: 'true',
            includeAlerts: 'true',
            includeLearning: 'true'
          }
        });

        return GET(req as NextRequest);
      });

      expect(result.status).toBe(200);
      expect(duration).toBeLessThan(200);
    });

    it('バッチ挿入（100件）が300ms以内', async () => {
      const { POST } = await import('@/app/api/alerts/batch/route');
      
      const alerts = Array.from({ length: 100 }, (_, i) => ({
        type: 'price_above',
        symbol: 'BTC',
        threshold: 40000 + i * 100,
        notification_methods: ['email']
      }));

      const { result, duration } = await measurePerformance('Batch Insert 100', async () => {
        const { req } = createMocks({
          method: 'POST',
          headers: {
            authorization: 'Bearer test-token',
            'content-type': 'application/json'
          },
          body: { alerts }
        });

        return POST(req as NextRequest);
      });

      expect(result.status).toBe(201);
      expect(duration).toBeLessThan(300);
    });
  });

  describe('Memory Usage Tests', () => {
    it('大量データ処理時のメモリ効率', async () => {
      const initialMemory = process.memoryUsage().heapUsed;

      // 10000件のレコード処理
      const { GET } = await import('@/app/api/export/transactions/route');
      const { req } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token'
        },
        query: {
          limit: '10000',
          format: 'json'
        }
      });

      await GET(req as NextRequest);

      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = (finalMemory - initialMemory) / 1024 / 1024; // MB

      // メモリ増加が100MB以内
      expect(memoryIncrease).toBeLessThan(100);

      // ガベージコレクション後のメモリ解放確認
      if (global.gc) {
        global.gc();
        const afterGCMemory = process.memoryUsage().heapUsed;
        const memoryAfterGC = (afterGCMemory - initialMemory) / 1024 / 1024;
        
        // GC後は50MB以内に戻る
        expect(memoryAfterGC).toBeLessThan(50);
      }
    });
  });

  describe('Edge Function Optimization', () => {
    it('Edge Runtime制約内での実行', async () => {
      const { GET } = await import('@/app/api/edge/status/route');
      
      const { result, duration } = await measurePerformance('Edge Function', async () => {
        const { req } = createMocks({
          method: 'GET',
          headers: {
            authorization: 'Bearer test-token'
          }
        });

        return GET(req as NextRequest);
      });

      expect(result.status).toBe(200);
      expect(duration).toBeLessThan(50); // Edge Functionは特に高速
    });

    it('ストリーミング応答のパフォーマンス', async () => {
      const { GET } = await import('@/app/api/stream/market-updates/route');
      
      const startTime = performance.now();
      const { req } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token'
        }
      });

      const response = await GET(req as NextRequest);
      const firstByteTime = performance.now() - startTime;

      // 最初のバイトまでが50ms以内
      expect(firstByteTime).toBeLessThan(50);
      expect(response.headers.get('content-type')).toBe('text/event-stream');
    });
  });
});