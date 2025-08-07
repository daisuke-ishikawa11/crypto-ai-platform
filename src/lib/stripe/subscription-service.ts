// 💳 Stripeサブスクリプション管理サービス
// リカーリング収益・B2B対応・チーム管理の包括的実装

import Stripe from 'stripe';
import { stripe, STRIPE_CONFIG, getPlanByStripePriceId, getTaxRateId, B2B_CONFIG } from './config';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/monitoring/logger';

export interface CreateSubscriptionParams {
  userId: string;
  email: string;
  priceId: string;
  paymentMethodId?: string;
  couponId?: string;
  taxRateId?: string;
  metadata?: Record<string, string>;
  
  // B2B向けパラメータ
  seats?: number;
  teamName?: string;
  billingEmail?: string;
  purchaseOrderNumber?: string;
}

export interface UpdateSubscriptionParams {
  subscriptionId: string;
  priceId?: string;
  quantity?: number;
  couponId?: string;
  metadata?: Record<string, string>;
  prorationBehavior?: 'create_prorations' | 'none' | 'always_invoice';
}

export interface SubscriptionDetails {
  id: string;
  customerId: string;
  status: string;
  priceId: string;
  planName: string;
  planTier: string;
  interval: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  trialEnd?: Date;
  quantity: number;
  unitAmount: number;
  totalAmount: number;
  currency: string;
  cancelAtPeriodEnd: boolean;
  metadata: Record<string, string>;
  
  // B2B情報
  seats?: number;
  teamName?: string;
  billingEmail?: string;
  purchaseOrderNumber?: string;
}

export class SubscriptionService {
  /**
   * 新しいサブスクリプションを作成
   */
  async createSubscription(params: CreateSubscriptionParams): Promise<{
    subscription: Stripe.Subscription;
    clientSecret?: string;
    setupIntent?: Stripe.SetupIntent;
  }> {
    try {
      const {
        userId,
        email,
        priceId,
        paymentMethodId,
        couponId,
        taxRateId,
        metadata = {},
        seats = 1,
        teamName,
        billingEmail,
        purchaseOrderNumber
      } = params;

      // プラン情報を取得
      const plan = getPlanByStripePriceId(priceId);
      if (!plan) {
        throw new Error(`Invalid price ID: ${priceId}`);
      }

      // B2Bプランの場合の検証
      if (plan.tier === 'enterprise' && seats < B2B_CONFIG.minimumSeats) {
        throw new Error(`Enterprise plan requires minimum ${B2B_CONFIG.minimumSeats} seats`);
      }

      // 顧客を作成または取得
      const customer = await this.createOrGetCustomer({
        userId,
        email,
        teamName,
        billingEmail,
        metadata: {
          user_id: userId,
          ...metadata
        }
      });

      // B2B向けディスカウント適用
      let discount = 0;
      if (seats >= B2B_CONFIG.minimumSeats) {
        const applicableDiscount = B2B_CONFIG.teamDiscounts
          .filter(d => seats >= d.minSeats)
          .sort((a, b) => b.discount - a.discount)[0];
        
        if (applicableDiscount) {
          discount = applicableDiscount.discount;
        }
      }

      // サブスクリプション作成パラメータ
      const subscriptionParams: Stripe.SubscriptionCreateParams = {
        customer: customer.id,
        items: [
          {
            price: priceId,
            quantity: seats
          }
        ],
        metadata: {
          user_id: userId,
          plan_tier: plan.tier,
          seats: seats.toString(),
          team_name: teamName || '',
          billing_email: billingEmail || email,
          purchase_order_number: purchaseOrderNumber || '',
          ...metadata
        },
        expand: ['latest_invoice.payment_intent'],
        trial_period_days: plan.trialPeriodDays,
        collection_method: 'charge_automatically',
        payment_behavior: 'default_incomplete'
      };

      // 支払い方法の設定
      if (paymentMethodId) {
        subscriptionParams.default_payment_method = paymentMethodId;
      }

      // クーポンの適用
      if (couponId) {
        subscriptionParams.coupon = couponId;
      } else if (discount > 0) {
        // B2Bディスカウントクーポンを作成
        const discountCoupon = await this.createDiscountCoupon(discount, `B2B ${seats} seats discount`);
        subscriptionParams.coupon = discountCoupon.id;
      }

      // 税率の適用
      if (taxRateId) {
        subscriptionParams.default_tax_rates = [taxRateId];
      }

      // Enterprise向けのカスタム設定
      if (plan.tier === 'enterprise') {
        subscriptionParams.billing_cycle_anchor_config = {
          day_of_month: 1 // 月初請求
        };
        
        // 請求書の自動送信設定
        subscriptionParams.invoice_settings = {
          issuer: {
            type: 'self'
          }
        };
      }

      // サブスクリプションを作成
      const subscription = await stripe.subscriptions.create(subscriptionParams);

      // データベースに記録
      await this.saveSubscriptionToDatabase(subscription, userId);

      // レスポンスを準備
      const response: {
        subscription: Stripe.Subscription;
        clientSecret?: string;
        setupIntent?: Stripe.SetupIntent;
      } = { subscription };

      // 支払いが必要な場合
      const latestInvoice = subscription.latest_invoice as Stripe.Invoice;
      if (latestInvoice?.payment_intent) {
        const paymentIntent = latestInvoice.payment_intent as Stripe.PaymentIntent;
        response.clientSecret = paymentIntent.client_secret || undefined;
      }

      // 支払い方法が設定されていない場合はSetupIntentを作成
      if (!paymentMethodId && !subscription.trial_end) {
        const setupIntent = await stripe.setupIntents.create({
          customer: customer.id,
          usage: 'off_session',
          metadata: {
            subscription_id: subscription.id,
            user_id: userId
          }
        });
        response.setupIntent = setupIntent;
      }

      logger.info('Subscription created successfully', {
        userId,
        subscriptionId: subscription.id,
        customerId: customer.id,
        planTier: plan.tier,
        seats
      });

      return response;

    } catch (error) {
      logger.error('Failed to create subscription', {
        userId: params.userId,
        priceId: params.priceId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * サブスクリプションを更新
   */
  async updateSubscription(params: UpdateSubscriptionParams): Promise<Stripe.Subscription> {
    try {
      const {
        subscriptionId,
        priceId,
        quantity,
        couponId,
        metadata,
        prorationBehavior = 'create_prorations'
      } = params;

      const updateParams: Stripe.SubscriptionUpdateParams = {
        proration_behavior: prorationBehavior,
        metadata
      };

      // プランの変更
      if (priceId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const currentItem = subscription.items.data[0];
        
        updateParams.items = [
          {
            id: currentItem.id,
            price: priceId,
            quantity: quantity || currentItem.quantity
          }
        ];
      } else if (quantity) {
        // 数量のみの変更
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const currentItem = subscription.items.data[0];
        
        updateParams.items = [
          {
            id: currentItem.id,
            quantity
          }
        ];
      }

      // クーポンの適用
      if (couponId) {
        updateParams.coupon = couponId;
      }

      const updatedSubscription = await stripe.subscriptions.update(subscriptionId, updateParams);

      // データベースを更新
      await this.updateSubscriptionInDatabase(updatedSubscription);

      logger.info('Subscription updated successfully', {
        subscriptionId,
        priceId,
        quantity
      });

      return updatedSubscription;

    } catch (error) {
      logger.error('Failed to update subscription', {
        subscriptionId: params.subscriptionId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * サブスクリプションをキャンセル
   */
  async cancelSubscription(
    subscriptionId: string, 
    cancelAtPeriodEnd: boolean = true,
    reason?: string
  ): Promise<Stripe.Subscription> {
    try {
      const updateParams: Stripe.SubscriptionUpdateParams = {
        cancel_at_period_end: cancelAtPeriodEnd,
        metadata: {
          cancellation_reason: reason || 'User requested'
        }
      };

      const subscription = await stripe.subscriptions.update(subscriptionId, updateParams);

      // データベースを更新
      await this.updateSubscriptionInDatabase(subscription);

      logger.info('Subscription cancelled', {
        subscriptionId,
        cancelAtPeriodEnd,
        reason
      });

      return subscription;

    } catch (error) {
      logger.error('Failed to cancel subscription', {
        subscriptionId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * サブスクリプションを再開
   */
  async resumeSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    try {
      const subscription = await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: false
      });

      await this.updateSubscriptionInDatabase(subscription);

      logger.info('Subscription resumed', { subscriptionId });
      return subscription;

    } catch (error) {
      logger.error('Failed to resume subscription', {
        subscriptionId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * サブスクリプション詳細を取得
   */
  async getSubscriptionDetails(subscriptionId: string): Promise<SubscriptionDetails> {
    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
        expand: ['default_payment_method', 'items.data.price']
      });

      const item = subscription.items.data[0];
      const price = item.price;
      const plan = getPlanByStripePriceId(price.id);

      return {
        id: subscription.id,
        customerId: subscription.customer as string,
        status: subscription.status,
        priceId: price.id,
        planName: plan?.name || 'Unknown Plan',
        planTier: plan?.tier || 'unknown',
        interval: price.recurring?.interval || 'month',
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        trialEnd: subscription.trial_end ? new Date(subscription.trial_end * 1000) : undefined,
        quantity: item.quantity || 1,
        unitAmount: price.unit_amount || 0,
        totalAmount: (price.unit_amount || 0) * (item.quantity || 1),
        currency: price.currency,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        metadata: subscription.metadata,
        
        // B2B情報
        seats: parseInt(subscription.metadata.seats || '1'),
        teamName: subscription.metadata.team_name || undefined,
        billingEmail: subscription.metadata.billing_email || undefined,
        purchaseOrderNumber: subscription.metadata.purchase_order_number || undefined
      };

    } catch (error) {
      logger.error('Failed to get subscription details', {
        subscriptionId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * 顧客を作成または取得
   */
  private async createOrGetCustomer(params: {
    userId: string;
    email: string;
    teamName?: string;
    billingEmail?: string;
    metadata?: Record<string, string>;
  }): Promise<Stripe.Customer> {
    const { userId, email, teamName, billingEmail, metadata = {} } = params;

    // 既存の顧客を検索
    const existingCustomers = await stripe.customers.list({
      email,
      limit: 1
    });

    if (existingCustomers.data.length > 0) {
      return existingCustomers.data[0];
    }

    // 新しい顧客を作成
    const customerParams: Stripe.CustomerCreateParams = {
      email,
      metadata: {
        user_id: userId,
        ...metadata
      }
    };

    // B2B向け情報
    if (teamName) {
      customerParams.name = teamName;
      customerParams.description = `Team: ${teamName}`;
    }

    if (billingEmail && billingEmail !== email) {
      customerParams.metadata.billing_email = billingEmail;
    }

    return await stripe.customers.create(customerParams);
  }

  /**
   * B2Bディスカウントクーポンを作成
   */
  private async createDiscountCoupon(discount: number, name: string): Promise<Stripe.Coupon> {
    const couponId = `b2b-discount-${Math.round(discount * 100)}-${Date.now()}`;
    
    return await stripe.coupons.create({
      id: couponId,
      name,
      percent_off: Math.round(discount * 100),
      duration: 'repeating',
      duration_in_months: 12,
      metadata: {
        type: 'b2b_volume_discount',
        discount_percent: discount.toString()
      }
    });
  }

  /**
   * サブスクリプションをデータベースに保存
   */
  private async saveSubscriptionToDatabase(subscription: Stripe.Subscription, userId: string): Promise<void> {
    try {
      const supabase = createClient();
      
      const item = subscription.items.data[0];
      const plan = getPlanByStripePriceId(item.price.id);

      // ユーザープロファイルを更新
      await supabase
        .from('user_profiles')
        .update({
          stripe_customer_id: subscription.customer as string,
          stripe_subscription_id: subscription.id,
          subscription_status: subscription.status === 'active' ? 'active' : 
                              subscription.status === 'trialing' ? 'trial' : 'inactive',
          subscription_tier: plan?.tier || 'basic',
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      // サブスクリプション履歴に記録
      await supabase
        .from('subscription_history')
        .insert({
          user_id: userId,
          stripe_subscription_id: subscription.id,
          tier: plan?.tier || 'basic',
          status: subscription.status === 'active' ? 'active' : 
                 subscription.status === 'trialing' ? 'active' : 'inactive',
          billing_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          billing_period_end: new Date(subscription.current_period_end * 1000).toISOString()
        });

    } catch (error) {
      logger.error('Failed to save subscription to database', {
        subscriptionId: subscription.id,
        userId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * データベースのサブスクリプション情報を更新
   */
  private async updateSubscriptionInDatabase(subscription: Stripe.Subscription): Promise<void> {
    try {
      const supabase = createClient();
      const customerId = subscription.customer as string;
      
      const item = subscription.items.data[0];
      const plan = getPlanByStripePriceId(item.price.id);

      // 顧客からユーザーIDを取得
      const customer = await stripe.customers.retrieve(customerId);
      if (!customer || customer.deleted) {
        throw new Error('Customer not found');
      }

      const userId = customer.metadata.user_id;
      if (!userId) {
        throw new Error('User ID not found in customer metadata');
      }

      // ユーザープロファイルを更新
      await supabase
        .from('user_profiles')
        .update({
          subscription_status: subscription.status === 'active' ? 'active' : 
                              subscription.status === 'trialing' ? 'trial' :
                              subscription.cancel_at_period_end ? 'cancelled' : 'inactive',
          subscription_tier: plan?.tier || 'basic',
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

    } catch (error) {
      logger.error('Failed to update subscription in database', {
        subscriptionId: subscription.id,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}