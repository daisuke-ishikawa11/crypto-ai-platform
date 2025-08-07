// Market analysis API endpoint
// Real-time cryptocurrency market analysis with AI insights

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { MarketAnalysisService } from '@/lib/market/market-analysis-service';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { coin_id } = body;

    if (!coin_id) {
      return NextResponse.json(
        { error: 'coin_id is required' },
        { status: 400 }
      );
    }

    // Check rate limits
    const { data: usageData, error: usageError } = await supabase
      .from('usage_tracking')
      .select('api_calls_count, last_reset_at')
      .eq('user_id', user.id)
      .eq('date', new Date().toISOString().split('T')[0])
      .single();

    // Get user's plan limits
    const { data: userData } = await supabase
      .from('users')
      .select('plan_id')
      .eq('id', user.id)
      .single();

    const { data: planLimits } = await supabase
      .from('plan_limits')
      .select('market_analysis_limit')
      .eq('plan_id', userData?.plan_id || 'free')
      .single();

    const limit = planLimits?.market_analysis_limit || 10;

    if (usageData && usageData.api_calls_count >= limit) {
      return NextResponse.json(
        { error: 'Daily market analysis limit reached' },
        { status: 429 }
      );
    }

    // Initialize market analysis service
    const marketService = new MarketAnalysisService(
      process.env.COINGECKO_API_KEY,
      process.env.OPENAI_API_KEY
    );

    // Perform market analysis
    const analysis = await marketService.analyzeCoin(coin_id);

    // Store analysis in database
    const { error: insertError } = await supabase
      .from('market_analysis')
      .insert({
        user_id: user.id,
        coin_id: coin_id,
        analysis_data: analysis,
        created_at: new Date().toISOString()
      });

    if (insertError) {
      console.error('Failed to store analysis:', insertError);
    }

    // Update usage tracking
    await supabase.rpc('increment_usage', {
      user_id_param: user.id,
      date_param: new Date().toISOString().split('T')[0]
    });

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Market analysis error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to analyze market' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    // Initialize market analysis service
    const marketService = new MarketAnalysisService(
      process.env.COINGECKO_API_KEY,
      process.env.OPENAI_API_KEY
    );

    switch (action) {
      case 'top-movers': {
        const limit = parseInt(searchParams.get('limit') || '10');
        const topMovers = await marketService.getTopMovers(limit);
        return NextResponse.json({ data: topMovers });
      }

      case 'trending': {
        const trending = await marketService.getTrendingCoins();
        return NextResponse.json({ data: trending });
      }

      case 'search': {
        const query = searchParams.get('q');
        if (!query) {
          return NextResponse.json(
            { error: 'Search query is required' },
            { status: 400 }
          );
        }
        const results = await marketService.searchCoins(query);
        return NextResponse.json({ data: results });
      }

      case 'history': {
        // Get user's analysis history
        const { data: history, error } = await supabase
          .from('market_analysis')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(20);

        if (error) {
          throw error;
        }

        return NextResponse.json({ data: history });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action parameter' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Market API error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch market data' },
      { status: 500 }
    );
  }
} 