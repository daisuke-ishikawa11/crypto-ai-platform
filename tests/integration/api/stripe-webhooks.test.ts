// 🧪 Stripe Webhook統合テスト
// 支払い・サブスクリプション・請求書の完全フロー検証

import { createMocks } from 'node-mocks-http';
import { NextRequest } from 'next/server';
import { stripe } from '@/lib/stripe/config';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

jest.mock('@/lib/stripe/config');
jest.mock('@supabase/supabase-js');

describe('Stripe Webhooks Integration Tests', () => {
  const mockSupabase = {
    from: jest.fn(),
  };

  const mockStripe = {
    webhooks: {
      constructEvent: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (createClient as jest.MockedFunction<typeof createClient>).mockReturnValue(mockSupabase as any);
    (stripe.webhooks as any) = mockStripe.webhooks;
  });

  describe('POST /api/stripe/webhook', () => {
    const createWebhookRequest = (event: any, signature: string) => {
      const { req } = createMocks({
        method: 'POST',
        headers: {
          'stripe-signature': signature,
          'content-type': 'application/json'
        },
        body: JSON.stringify(event)
      });

      // Mock the text() method for NextRequest compatibility
      (req as any).text = jest.fn().mockResolvedValue(JSON.stringify(event));
      
      return { req };
    };

    describe('Subscription Events', () => {
      it('customer.subscription.created - 新規サブスクリプション作成', async () => {
        const event: Stripe.Event = {
          id: 'evt_test_subscription_created',
          object: 'event',
          type: 'customer.subscription.created',
          created: Date.now() / 1000,
          data: {
            object: {
              id: 'sub_test123',
              customer: 'cus_test456',
              status: 'active',
              items: {
                data: [{
                  price: {
                    id: 'price_pro_monthly',
                    product: 'prod_pro',
                    unit_amount: 9900,
                    currency: 'usd',
                    recurring: { interval: 'month' }
                  }
                }]
              },
              current_period_start: Date.now() / 1000,
              current_period_end: (Date.now() + 30 * 24 * 60 * 60 * 1000) / 1000,
              metadata: {
                user_id: 'user-123',
                plan_type: 'pro'
              }
            } as any
          },
          api_version: '2024-06-20',
          pending_webhooks: 1,
          request: null,
          livemode: false
        };

        mockStripe.webhooks.constructEvent.mockReturnValue(event);

        // Supabase更新をモック
        mockSupabase.from.mockImplementation((table: string) => {
          if (table === 'user_profiles') {
            return {
              update: jest.fn().mockReturnThis(),
              eq: jest.fn().mockResolvedValue({
                data: {
                  user_id: 'user-123',
                  stripe_subscription_id: 'sub_test123',
                  subscription_status: 'active',
                  subscription_tier: 'pro'
                },
                error: null
              })
            };
          }
          if (table === 'subscription_history') {
            return {
              insert: jest.fn().mockResolvedValue({
                data: { event_type: 'subscription_created' },
                error: null
              })
            };
          }
          return mockSupabase.from(table);
        });

        const { POST } = await import('@/app/api/stripe/webhook/route');
        const { req } = createWebhookRequest(event, 'test_signature');

        const response = await POST(req as NextRequest);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.received).toBe(true);
        expect(mockSupabase.from).toHaveBeenCalledWith('user_profiles');
        expect(mockSupabase.from).toHaveBeenCalledWith('subscription_history');
      });

      it('customer.subscription.updated - サブスクリプション更新（アップグレード）', async () => {
        const event: Stripe.Event = {
          id: 'evt_test_subscription_updated',
          object: 'event',
          type: 'customer.subscription.updated',
          created: Date.now() / 1000,
          data: {
            object: {
              id: 'sub_test123',
              customer: 'cus_test456',
              status: 'active',
              items: {
                data: [{
                  price: {
                    id: 'price_enterprise_monthly',
                    product: 'prod_enterprise',
                    unit_amount: 49900,
                    currency: 'usd'
                  }
                }]
              },
              metadata: {
                user_id: 'user-123',
                plan_type: 'enterprise',
                previous_plan: 'pro'
              }
            } as any,
            previous_attributes: {
              items: {
                data: [{
                  price: {
                    id: 'price_pro_monthly',
                    unit_amount: 9900
                  }
                }]
              }
            }
          },
          api_version: '2024-06-20',
          pending_webhooks: 1,
          request: null,
          livemode: false
        };

        mockStripe.webhooks.constructEvent.mockReturnValue(event);

        mockSupabase.from.mockImplementation((table: string) => {
          if (table === 'user_profiles') {
            return {
              update: jest.fn().mockReturnThis(),
              eq: jest.fn().mockResolvedValue({
                data: { subscription_tier: 'enterprise' },
                error: null
              })
            };
          }
          return mockSupabase.from(table);
        });

        const { POST } = await import('@/app/api/stripe/webhook/route');
        const { req } = createWebhookRequest(event, 'test_signature');

        const response = await POST(req as NextRequest);

        expect(response.status).toBe(200);
        expect(mockSupabase.from).toHaveBeenCalledWith('user_profiles');
      });

      it('customer.subscription.deleted - サブスクリプションキャンセル', async () => {
        const event: Stripe.Event = {
          id: 'evt_test_subscription_deleted',
          object: 'event',
          type: 'customer.subscription.deleted',
          created: Date.now() / 1000,
          data: {
            object: {
              id: 'sub_test123',
              customer: 'cus_test456',
              status: 'canceled',
              canceled_at: Date.now() / 1000,
              metadata: {
                user_id: 'user-123',
                cancellation_reason: 'too_expensive'
              }
            } as any
          },
          api_version: '2024-06-20',
          pending_webhooks: 1,
          request: null,
          livemode: false
        };

        mockStripe.webhooks.constructEvent.mockReturnValue(event);

        mockSupabase.from.mockImplementation((table: string) => {
          if (table === 'user_profiles') {
            return {
              update: jest.fn().mockReturnThis(),
              eq: jest.fn().mockResolvedValue({
                data: { subscription_status: 'inactive', subscription_tier: 'basic' },
                error: null
              })
            };
          }
          return mockSupabase.from(table);
        });

        const { POST } = await import('@/app/api/stripe/webhook/route');
        const { req } = createWebhookRequest(event, 'test_signature');

        const response = await POST(req as NextRequest);

        expect(response.status).toBe(200);
        expect(mockSupabase.from).toHaveBeenCalledWith('user_profiles');
      });
    });

    describe('Payment Events', () => {
      it('payment_intent.succeeded - 支払い成功', async () => {
        const event: Stripe.Event = {
          id: 'evt_test_payment_succeeded',
          object: 'event',
          type: 'payment_intent.succeeded',
          created: Date.now() / 1000,
          data: {
            object: {
              id: 'pi_test123',
              amount: 9900,
              currency: 'usd',
              customer: 'cus_test456',
              payment_method: 'pm_test789',
              metadata: {
                user_id: 'user-123',
                order_type: 'subscription_payment'
              }
            } as any
          },
          api_version: '2024-06-20',
          pending_webhooks: 1,
          request: null,
          livemode: false
        };

        mockStripe.webhooks.constructEvent.mockReturnValue(event);

        mockSupabase.from.mockImplementation((table: string) => {
          if (table === 'payment_history') {
            return {
              insert: jest.fn().mockResolvedValue({
                data: {
                  payment_intent_id: 'pi_test123',
                  amount: 9900,
                  status: 'succeeded'
                },
                error: null
              })
            };
          }
          return mockSupabase.from(table);
        });

        const { POST } = await import('@/app/api/stripe/webhook/route');
        const { req } = createWebhookRequest(event, 'test_signature');

        const response = await POST(req as NextRequest);

        expect(response.status).toBe(200);
        expect(mockSupabase.from).toHaveBeenCalledWith('payment_history');
      });

      it('payment_intent.payment_failed - 支払い失敗', async () => {
        const event: Stripe.Event = {
          id: 'evt_test_payment_failed',
          object: 'event',
          type: 'payment_intent.payment_failed',
          created: Date.now() / 1000,
          data: {
            object: {
              id: 'pi_test123',
              amount: 9900,
              currency: 'usd',
              customer: 'cus_test456',
              last_payment_error: {
                code: 'card_declined',
                message: 'Your card was declined.'
              },
              metadata: {
                user_id: 'user-123'
              }
            } as any
          },
          api_version: '2024-06-20',
          pending_webhooks: 1,
          request: null,
          livemode: false
        };

        mockStripe.webhooks.constructEvent.mockReturnValue(event);

        mockSupabase.from.mockImplementation((table: string) => {
          if (table === 'payment_history') {
            return {
              insert: jest.fn().mockResolvedValue({
                data: {
                  payment_intent_id: 'pi_test123',
                  status: 'failed'
                },
                error: null
              })
            };
          }
          return mockSupabase.from(table);
        });

        const { POST } = await import('@/app/api/stripe/webhook/route');
        const { req } = createWebhookRequest(event, 'test_signature');

        const response = await POST(req as NextRequest);

        expect(response.status).toBe(200);
        expect(mockSupabase.from).toHaveBeenCalledWith('payment_history');
      });
    });

    describe('Invoice Events', () => {
      it('invoice.payment_succeeded - 請求書支払い成功', async () => {
        const event: Stripe.Event = {
          id: 'evt_test_invoice_paid',
          object: 'event',
          type: 'invoice.payment_succeeded',
          created: Date.now() / 1000,
          data: {
            object: {
              id: 'in_test123',
              customer: 'cus_test456',
              subscription: 'sub_test789',
              amount_paid: 9900,
              amount_due: 9900,
              number: 'INV-2024-001',
              metadata: {
                user_id: 'user-123'
              }
            } as any
          },
          api_version: '2024-06-20',
          pending_webhooks: 1,
          request: null,
          livemode: false
        };

        mockStripe.webhooks.constructEvent.mockReturnValue(event);

        mockSupabase.from.mockImplementation((table: string) => {
          if (table === 'invoice_history') {
            return {
              insert: jest.fn().mockResolvedValue({
                data: {
                  invoice_id: 'in_test123',
                  status: 'paid',
                  amount_paid: 9900
                },
                error: null
              })
            };
          }
          return mockSupabase.from(table);
        });

        const { POST } = await import('@/app/api/stripe/webhook/route');
        const { req } = createWebhookRequest(event, 'test_signature');

        const response = await POST(req as NextRequest);

        expect(response.status).toBe(200);
      });
    });

    describe('Error Handling', () => {
      it('無効な署名の場合400エラーを返す', async () => {
        mockStripe.webhooks.constructEvent.mockImplementation(() => {
          throw new Error('Invalid signature');
        });

        const { POST } = await import('@/app/api/stripe/webhook/route');
        const { req } = createWebhookRequest({}, 'invalid_signature');

        const response = await POST(req as NextRequest);

        expect(response.status).toBe(400);
      });

      it('処理中のエラーをハンドリング', async () => {
        const event: Stripe.Event = {
          id: 'evt_test_error',
          object: 'event',
          type: 'customer.subscription.created',
          created: Date.now() / 1000,
          data: {
            object: { id: 'sub_test123' } as any
          },
          api_version: '2024-06-20',
          pending_webhooks: 1,
          request: null,
          livemode: false
        };

        mockStripe.webhooks.constructEvent.mockReturnValue(event);
        
        mockSupabase.from.mockImplementation(() => {
          throw new Error('Database connection failed');
        });

        const { POST } = await import('@/app/api/stripe/webhook/route');
        const { req } = createWebhookRequest(event, 'test_signature');

        const response = await POST(req as NextRequest);

        // Webhookは常に200を返すが、エラーログは記録される
        expect(response.status).toBe(200);
      });
    });

    describe('Webhook Idempotency', () => {
      it('同じイベントIDの重複処理を防ぐ', async () => {
        const event: Stripe.Event = {
          id: 'evt_duplicate_test',
          object: 'event',
          type: 'customer.subscription.created',
          created: Date.now() / 1000,
          data: {
            object: { id: 'sub_test123' } as any
          },
          api_version: '2024-06-20',
          pending_webhooks: 1,
          request: null,
          livemode: false
        };

        mockStripe.webhooks.constructEvent.mockReturnValue(event);

        // 初回はエラーなし、2回目は重複エラー
        let callCount = 0;
        mockSupabase.from.mockImplementation((table: string) => {
          if (table === 'webhook_events') {
            callCount++;
            return {
              insert: jest.fn().mockResolvedValue({
                data: callCount === 1 ? { event_id: 'evt_duplicate_test' } : null,
                error: callCount === 2 ? new Error('Duplicate event') : null
              })
            };
          }
          return mockSupabase.from(table);
        });

        const { POST } = await import('@/app/api/stripe/webhook/route');
        
        // 同じイベントを2回送信
        const { req: req1 } = createWebhookRequest(event, 'test_signature');
        const response1 = await POST(req1 as NextRequest);
        
        const { req: req2 } = createWebhookRequest(event, 'test_signature');
        const response2 = await POST(req2 as NextRequest);

        expect(response1.status).toBe(200);
        expect(response2.status).toBe(200); // 重複でも200を返す
      });
    });
  });
});