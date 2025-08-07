import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ExplainablePredictionService } from '@/lib/explainable-ai/prediction-service';
import { ExplainableMarketAnalyzer } from '@/lib/explainable-ai/market-analyzer';
import { ExplainableAnalysisRequest, PredictionType } from '@/lib/explainable-ai/types';
import { MarketAnalysisService } from '@/lib/market/market-analysis-service';
import { CoinGeckoClient } from '@/lib/market/coingecko';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json() as ExplainableAnalysisRequest;
    
    const predictionService = new ExplainablePredictionService();
    const marketAnalyzer = new ExplainableMarketAnalyzer();
    
    // Use real market analysis service
    const marketService = new MarketAnalysisService(
      process.env.COINGECKO_API_KEY,
      process.env.OPENAI_API_KEY
    );
    const coinGecko = new CoinGeckoClient(process.env.COINGECKO_API_KEY);
    
    // Handle different prediction types
    switch (body.type) {
      case 'market_analysis': {
        if (!body.assetSymbol) {
          return NextResponse.json({ error: 'Asset symbol required' }, { status: 400 });
        }
        
        // Get real market data
        const [marketData] = await coinGecko.getMarketData([body.assetSymbol]);
        if (!marketData) {
          return NextResponse.json({ error: 'Asset not found' }, { status: 404 });
        }
        
        // Get real price history
        const marketChart = await coinGecko.getMarketChart(body.assetSymbol, 'usd', '30');
        const priceHistory = marketChart.prices.map(([_, price]) => price);
        const volumeHistory = marketChart.total_volumes.map(([_, volume]) => volume);
        
        // Analyze with explainable AI using real data
        const { prediction, steps, features } = await marketAnalyzer.analyzeMarket(
          marketData,
          priceHistory,
          volumeHistory
        );
        
        // Save prediction
        const savedPrediction = await predictionService.createPrediction(
          user.id,
          body,
          prediction
        );
        
        // Save reasoning steps
        await predictionService.addReasoningSteps(savedPrediction.id, steps);
        
        // Save feature importance
        await predictionService.addFeatureImportance(savedPrediction.id, features);
        
        return NextResponse.json({
          prediction: savedPrediction,
          steps,
          features
        });
      }
      
      case 'risk_assessment':
      case 'portfolio_optimization':
      case 'trading_signal':
        // TODO: Implement other prediction types with real data
        return NextResponse.json({ 
          error: `${body.type} analysis not yet implemented` 
        }, { status: 501 });
        
      default:
        return NextResponse.json({ error: 'Invalid prediction type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Explainable AI analysis error:', error);
    return NextResponse.json({ 
      error: 'Analysis failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const searchParams = request.nextUrl.searchParams;
    const predictionId = searchParams.get('predictionId');
    const type = searchParams.get('type') as PredictionType | null;
    
    const predictionService = new ExplainablePredictionService();
    
    if (predictionId) {
      // Get specific prediction with details
      const prediction = await predictionService.getPrediction(predictionId);
      if (!prediction) {
        return NextResponse.json({ error: 'Prediction not found' }, { status: 404 });
      }
      
      const steps = await predictionService.getReasoningSteps(predictionId);
      const features = await predictionService.getFeatureImportance(predictionId);
      
      return NextResponse.json({
        prediction,
        steps,
        features
      });
    } else {
      // Get user's predictions
      const predictions = await predictionService.getUserPredictions(
        user.id,
        type || undefined
      );
      
      return NextResponse.json({ predictions });
    }
  } catch (error) {
    console.error('Get predictions error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch predictions',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 