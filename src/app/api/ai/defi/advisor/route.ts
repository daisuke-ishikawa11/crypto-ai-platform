// API Route: DeFi AI Advisor
import { NextRequest, NextResponse } from 'next/server';
import { defiAIAdvisor } from '@/lib/ai/defi-ai-advisor';
import { aiCacheService } from '@/lib/ai/ai-cache';
import { logger } from '@/lib/monitoring/logger';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers();
    const userId = headersList.get('x-user-id') || 'anonymous';
    
    const body = await request.json();
    const { message, context, conversationHistory } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Check rate limiting
    const rateLimit = await aiCacheService.checkRateLimit(userId, '/api/ai/defi/advisor');
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          resetTime: rateLimit.resetTime 
        },
        { status: 429 }
      );
    }

    // Check cache first
    const cacheKey = `defi_advisor:${userId}:${message}`;
    const cached = await aiCacheService.get(cacheKey);
    
    if (cached) {
      logger.info('DeFi advisor cache hit', { userId, message: message.substring(0, 50) });
      return NextResponse.json(cached);
    }

    // Process the query
    const query = {
      userId,
      message,
      context,
      conversationHistory
    };

    const advice = await defiAIAdvisor.processQuery(query);

    // Cache the response
    await aiCacheService.set(
      cacheKey,
      advice,
      5 * 60 * 1000, // 5 minutes cache
      {
        model: 'defi-advisor',
        tokens_used: message.length / 4, // Rough estimate
        user_id: userId
      },
      ['defi', 'advisor', userId]
    );

    // Log usage
    await aiCacheService.logAPIUsage(
      userId,
      '/api/ai/defi/advisor',
      'claude-3-sonnet',
      message.length / 4,
      0.002 // Estimated cost
    );

    logger.info('DeFi advisor query processed', {
      userId,
      messageLength: message.length,
      confidence: advice.confidence,
      riskLevel: advice.riskLevel
    });

    return NextResponse.json(advice);

  } catch (error: unknown) {
    logger.error('DeFi advisor API error', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    
    // Try to return a fallback response
    const fallback = await aiCacheService.get('fallback:defi_advisor');
    if (fallback) {
      return NextResponse.json({
        ...fallback,
        is_fallback: true
      });
    }

    return NextResponse.json(
      { 
        error: 'AI advisor temporarily unavailable',
        response: 'AI アドバイザーは現在利用できません。しばらくしてからもう一度お試しください。',
        confidence: 0,
        riskLevel: 'high',
        actionable_insights: [],
        protocols_mentioned: [],
        follow_up_questions: [],
        disclaimer: 'このメッセージは技術的な問題によるフォールバック応答です。'
      },
      { status: 503 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'status';

    if (type === 'status') {
      const stats = aiCacheService.getCacheStats();
      return NextResponse.json({
        status: 'operational',
        cache_stats: stats,
        supported_features: [
          'natural_language_query',
          'portfolio_analysis',
          'protocol_comparison',
          'risk_assessment',
          'yield_optimization'
        ]
      });
    }

    return NextResponse.json({ error: 'Invalid request type' }, { status: 400 });

  } catch (error: unknown) {
    logger.error('DeFi advisor GET error', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}