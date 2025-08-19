// 💳 サブスクリプション管理API
// 作成・更新・キャンセル・B2B管理の統合エンドポイント

import { NextRequest, NextResponse } from 'next/server';
import { withApiHandler, ApiContext } from '@/lib/auth/middleware';
import { SubscriptionService } from '@/lib/stripe/subscription-service';
import { getStripe, getPlans, formatPrice, TEST_CARDS } from '@/lib/stripe/config';
import { logger } from '@/lib/monitoring/logger';
import { z } from 'zod';
import { toRecord } from '@/lib/types/guards';

// バリデーションスキーマ
const createSubscriptionSchema = z.object({
  priceId: z.string(),
  paymentMethodId: z.string().optional(),
  couponId: z.string().optional(),
  
  // B2B向けフィールド
  seats: z.number().min(1).max(10000).default(1),
  teamName: z.string().optional(),
  billingEmail: z.string().email().optional(),
  purchaseOrderNumber: z.string().optional(),
  
  // 請求先情報
  billingAddress: z.object({
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    state: z.string().optional(),
    postal_code: z.string(),
    country: z.string()
  }).optional(),
  
  // 税務情報
  taxId: z.string().optional(),
  taxExempt: z.enum(['none', 'exempt', 'reverse']).default('none')
});

const updateSubscriptionSchema = z.object({
  priceId: z.string().optional(),
  seats: z.number().min(1).max(10000).optional(),
  couponId: z.string().optional(),
  prorationBehavior: z.enum(['create_prorations', 'none', 'always_invoice']).default('create_prorations')
});

const cancelSubscriptionSchema = z.object({
  cancelAtPeriodEnd: z.boolean().default(true),
  reason: z.string().optional()
});

const subscriptionService = new SubscriptionService();

/**
 * サブスクリプション一覧・詳細取得
 */
async function getSubscriptions(
  request: NextRequest,
  context: ApiContext
): Promise<NextResponse> {
  const { user } = context;
  
  try {
    // ユーザーのサブスクリプション情報を取得
    const userObj = toRecord(user);
    const profileObj = toRecord(userObj.profile);
    
    if (!profileObj.stripe_customer_id) {
      return NextResponse.json({
        subscription: null,
        plans: getPlans(),
        testCards: TEST_CARDS
      });
    }

    let subscriptionDetails = null;
    
    if (profileObj.stripe_subscription_id) {
      try {
        subscriptionDetails = await subscriptionService.getSubscriptionDetails(
          profileObj.stripe_subscription_id as string
        );
      } catch (error) {
        logger.warn('Failed to get subscription details', {
          userId: user.id,
      subscriptionId: (profileObj.stripe_subscription_id as string | undefined) ?? '',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    // 利用可能プランの取得
    const plans = getPlans();

    // テストカード情報（開発環境のみ）
    const includeTestCards = process.env.NODE_ENV === 'development';

    const response = {
      subscription: subscriptionDetails,
      plans: plans.map(plan => ({
        ...plan,
        formattedPrice: formatPrice(plan.price)
      })),
      testCards: includeTestCards ? TEST_CARDS : undefined
    };

    return NextResponse.json(response);

  } catch (error) {
    logger.error('Failed to get subscriptions', {
      userId: user.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    throw error;
  }
}

/**
 * 新しいサブスクリプションを作成
 */
async function createSubscription(
  request: NextRequest,
  context: ApiContext
): Promise<NextResponse> {
  const { user } = context;
  
  try {
    const body = await request.json();
    const validatedData = createSubscriptionSchema.parse(body);

    // 既存のアクティブなサブスクリプションをチェック
    const userObj2 = toRecord(user);
    const profileObj2 = toRecord(userObj2.profile);
    if (profileObj2.stripe_subscription_id && ((userObj2 as { subscription_status?: string }).subscription_status === 'active')) {
      return NextResponse.json(
        { error: 'User already has an active subscription' },
        { status: 400 }
      );
    }

    // 税率を決定（請求先住所から）
    let taxRateId: string | undefined;
    if (validatedData.billingAddress) {
      const taxRate = await determineTaxRate(validatedData.billingAddress.country);
      taxRateId = taxRate;
    }

    // サブスクリプションを作成
    const result = await subscriptionService.createSubscription({
      userId: user.id,
      email: user.email,
      priceId: validatedData.priceId,
      paymentMethodId: validatedData.paymentMethodId,
      couponId: validatedData.couponId,
      taxRateId,
      seats: validatedData.seats,
      teamName: validatedData.teamName,
      billingEmail: validatedData.billingEmail,
      purchaseOrderNumber: validatedData.purchaseOrderNumber,
      metadata: {
        source: 'api',
        user_agent: request.headers.get('user-agent') || 'unknown'
      }
    });

    // 請求先住所を更新（提供されている場合）
    if (validatedData.billingAddress && result.subscription.customer) {
      const stripe = getStripe();
      await stripe.customers.update(result.subscription.customer as string, {
        address: validatedData.billingAddress,
        tax_exempt: validatedData.taxExempt
      });
    }

    logger.info('Subscription created via API', {
      userId: user.id,
      subscriptionId: result.subscription.id,
      priceId: validatedData.priceId,
      seats: validatedData.seats
    });

    return NextResponse.json({
      subscription: result.subscription,
      clientSecret: result.clientSecret,
      setupIntent: result.setupIntent
    }, { status: 201 });

  } catch (error) {
    logger.error('Failed to create subscription', {
      userId: user.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    throw error;
  }
}

/**
 * サブスクリプションを更新
 */
async function updateSubscription(
  request: NextRequest,
  context: ApiContext
): Promise<NextResponse> {
  const { user } = context;
  
  try {
    const userObj6 = toRecord(user);
    const profileObj6 = toRecord(userObj6.profile);
    if (!profileObj6.stripe_subscription_id) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const validatedData = updateSubscriptionSchema.parse(body);

    const updatedSubscription = await subscriptionService.updateSubscription({
      subscriptionId: profileObj6.stripe_subscription_id as string,
      priceId: validatedData.priceId,
      quantity: validatedData.seats,
      couponId: validatedData.couponId,
      prorationBehavior: validatedData.prorationBehavior
    });

    logger.info('Subscription updated via API', {
      userId: user.id,
      subscriptionId: updatedSubscription.id,
      changes: Object.keys(validatedData)
    });

    return NextResponse.json({ subscription: updatedSubscription });

  } catch (error) {
    logger.error('Failed to update subscription', {
      userId: user.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    throw error;
  }
}

/**
 * サブスクリプションをキャンセル
 */
async function cancelSubscription(
  request: NextRequest,
  context: ApiContext
): Promise<NextResponse> {
  const { user } = context;
  
  try {
    const userObj5 = toRecord(user);
    const profileObj5 = toRecord(userObj5.profile);
    if (!profileObj5.stripe_subscription_id) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const validatedData = cancelSubscriptionSchema.parse(body);

    const cancelledSubscription = await subscriptionService.cancelSubscription(
      profileObj5.stripe_subscription_id as string,
      validatedData.cancelAtPeriodEnd,
      validatedData.reason
    );

    logger.info('Subscription cancelled via API', {
      userId: user.id,
      subscriptionId: cancelledSubscription.id,
      cancelAtPeriodEnd: validatedData.cancelAtPeriodEnd,
      reason: validatedData.reason
    });

    return NextResponse.json({ subscription: cancelledSubscription });

  } catch (error) {
    logger.error('Failed to cancel subscription', {
      userId: user.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    throw error;
  }
}

/**
 * 税率を決定
 */
async function determineTaxRate(country: string): Promise<string | undefined> {
  // 国に基づいて税率を決定
  const taxRateMap: Record<string, string> = {
    'JP': process.env.STRIPE_TAX_RATE_JAPAN_ID || '',
    'US': process.env.STRIPE_TAX_RATE_US_ID || '',
    // EU諸国は共通税率を使用
    'DE': process.env.STRIPE_TAX_RATE_EU_ID || '',
    'FR': process.env.STRIPE_TAX_RATE_EU_ID || '',
    'GB': process.env.STRIPE_TAX_RATE_EU_ID || '',
  };

  return taxRateMap[country.toUpperCase()];
}

// API Route Handlers
export const GET = withApiHandler(getSubscriptions, {
  requireAuth: true,
  requireSubscription: false,
  rateLimitKey: 'subscriptions-get'
});

export const POST = withApiHandler(createSubscription, {
  requireAuth: true,
  requireSubscription: false,
  rateLimitKey: 'subscriptions-create',
  validateSchema: createSubscriptionSchema,
  requireCSRF: true
});

export const PUT = withApiHandler(updateSubscription, {
  requireAuth: true,
  requireSubscription: false,
  rateLimitKey: 'subscriptions-update',
  validateSchema: updateSubscriptionSchema,
  requireCSRF: true
});
export const DELETE = withApiHandler(cancelSubscription, {
  requireAuth: true,
  requireSubscription: false,
  rateLimitKey: 'subscriptions-cancel',
  validateSchema: cancelSubscriptionSchema,
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
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    }
  });
};
