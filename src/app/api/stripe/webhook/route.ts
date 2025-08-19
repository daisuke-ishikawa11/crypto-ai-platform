// 🔌 Stripe Webhookハンドラー
// サブスクリプション、支払い、請求書イベントを処理

import { NextRequest, NextResponse } from 'next/server';
import { toRecord } from '@/lib/types/guards';
import { headers } from 'next/headers';
import { getStripe } from '@/lib/stripe/config';
import { SubscriptionService } from '@/lib/stripe/subscription-service';
import { logger } from '@/lib/monitoring/logger';
import Stripe from 'stripe';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    let body: string;
    let signature: string;
    
    // テスト環境で request.text が存在しない場合のフォールバック
    const reqObj = toRecord(request)
    if (typeof (reqObj as { text?: () => Promise<string> }).text === 'function') {
      body = await (reqObj as { text: () => Promise<string> }).text();
    } else {
      // テストモック用の処理
      body = (reqObj.body as string) || '';
    }

    // テスト環境では headers() が使えないので、直接request.headersから取得
    if (process.env.NODE_ENV === 'test') {
      signature = request.headers.get('stripe-signature') || '';
    } else {
      const headersList = await headers();
      signature = headersList.get('stripe-signature') || '';
    }

    let event: Stripe.Event;

    try {
      const stripe = getStripe();
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch (error) {
      logger.error('Webhook signature verification failed', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    const subscriptionService = new SubscriptionService();

    // イベント処理
    switch (event.type) {
      case 'customer.subscription.created':
        {
          const subscription = event.data.object as Stripe.Subscription;
          await subscriptionService.handleSubscriptionCreated(subscription);
          logger.info('Subscription created', {
            subscriptionId: subscription.id,
            customerId: subscription.customer as string,
            status: subscription.status
          });
        }
        break;

      case 'customer.subscription.updated':
        {
          const subscription = event.data.object as Stripe.Subscription;
          await subscriptionService.handleSubscriptionUpdated(subscription);
          logger.info('Subscription updated', {
            subscriptionId: subscription.id,
            customerId: subscription.customer as string,
            status: subscription.status
          });
        }
        break;

      case 'customer.subscription.deleted':
        {
          const subscription = event.data.object as Stripe.Subscription;
          await subscriptionService.handleSubscriptionDeleted(subscription);
          logger.info('Subscription deleted', {
            subscriptionId: subscription.id,
            customerId: subscription.customer as string
          });
        }
        break;

      case 'payment_intent.succeeded':
        {
          const paymentIntent = event.data.object as Stripe.PaymentIntent;
          await subscriptionService.handlePaymentSucceeded(paymentIntent);
          logger.info('Payment succeeded', {
            paymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency
          });
        }
        break;

      case 'payment_intent.payment_failed':
        {
          const paymentIntent = event.data.object as Stripe.PaymentIntent;
          await subscriptionService.handlePaymentFailed(paymentIntent);
          logger.error('Payment failed', {
            paymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
            lastPaymentError: paymentIntent.last_payment_error?.message
          });
        }
        break;

      case 'invoice.payment_succeeded':
        {
          const invoice = event.data.object as Stripe.Invoice;
          type InvoiceWithMaybeSubscription = Stripe.Invoice & { subscription?: string | Stripe.Subscription | null };
          await subscriptionService.handleInvoicePaymentSucceeded(invoice);
          logger.info('Invoice payment succeeded', {
            invoiceId: invoice.id,
            subscriptionId: ((invoice as InvoiceWithMaybeSubscription).subscription as string | null) || undefined,
            amount: invoice.amount_paid
          });
        }
        break;

      case 'invoice.payment_failed':
        {
          const invoice = event.data.object as Stripe.Invoice;
          type InvoiceWithMaybeSubscription = Stripe.Invoice & { subscription?: string | Stripe.Subscription | null };
          await subscriptionService.handleInvoicePaymentFailed(invoice);
          logger.error('Invoice payment failed', {
            invoiceId: invoice.id,
            subscriptionId: ((invoice as InvoiceWithMaybeSubscription).subscription as string | null) || undefined,
            amount: invoice.amount_due
          });
        }
        break;

      default:
        logger.warn('Unhandled webhook event type', {
          eventType: event.type,
          eventId: event.id
        });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    logger.error('Webhook processing error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
