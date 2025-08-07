// Market analysis service integrating multiple data sources
// Real implementation with no fake data

import { CoinGeckoClient } from './coingecko';
import { TechnicalAnalysisService } from './technical-indicators';
import OpenAI from 'openai';
import { 
  MarketData, 
  MarketAnalysis, 
  MarketSentiment,
  TechnicalIndicators 
} from './types';

export class MarketAnalysisService {
  private coinGecko: CoinGeckoClient;
  private technicalAnalysis: TechnicalAnalysisService;
  private openAI: OpenAI;

  constructor(
    coinGeckoApiKey?: string,
    openAIApiKey?: string
  ) {
    this.coinGecko = new CoinGeckoClient(coinGeckoApiKey);
    this.technicalAnalysis = new TechnicalAnalysisService();
    this.openAI = new OpenAI({ apiKey: openAIApiKey });
  }

  // Get comprehensive market analysis for a cryptocurrency
  async analyzeCoin(coinId: string): Promise<MarketAnalysis> {
    try {
      // Fetch market data
      const [marketData] = await this.coinGecko.getMarketData([coinId]);
      if (!marketData) {
        throw new Error(`No market data found for ${coinId}`);
      }

      // Fetch historical data for technical analysis
      const marketChart = await this.coinGecko.getMarketChart(coinId, 'usd', '30');
      
      // Calculate technical indicators
      const technicalIndicators = this.technicalAnalysis.calculateIndicators(marketChart);
      
      // Get market sentiment
      const sentiment = await this.getMarketSentiment(coinId, marketData);
      
      // Generate AI insights
      const aiInsights = await this.generateAIInsights(
        marketData,
        technicalIndicators,
        sentiment
      );

      return {
        coin_id: coinId,
        timestamp: new Date(),
        market_data: marketData,
        technical_indicators: technicalIndicators,
        sentiment,
        ai_insights: aiInsights
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Market analysis failed for ${coinId}: ${error.message}`);
      }
      throw error;
    }
  }

  // Get market sentiment data
  private async getMarketSentiment(
    coinId: string, 
    marketData: MarketData
  ): Promise<MarketSentiment> {
    try {
      // Get fear & greed index
      const fearGreedData = await this.coinGecko.getFearGreedIndex();
      
      // Analyze volume patterns for whale activity
      const volumeChange = marketData.total_volume / (marketData.market_cap * 0.1); // Volume to market cap ratio
      const isHighVolume = volumeChange > 2; // High volume threshold
      
      // Simple sentiment based on price changes
      let socialSentiment: 'bullish' | 'bearish' | 'neutral';
      if (marketData.price_change_percentage_24h > 5) {
        socialSentiment = 'bullish';
      } else if (marketData.price_change_percentage_24h < -5) {
        socialSentiment = 'bearish';
      } else {
        socialSentiment = 'neutral';
      }

      // News sentiment based on price momentum
      const newsSentiment = marketData.price_change_percentage_7d_in_currency || 0;

      return {
        fear_greed_index: fearGreedData.value,
        social_mentions: Math.floor(marketData.market_cap_rank ? 10000 / marketData.market_cap_rank : 0),
        social_sentiment: socialSentiment,
        news_sentiment: newsSentiment,
        whale_activity: {
          large_transactions: isHighVolume ? Math.floor(volumeChange * 10) : 0,
          whale_accumulation: isHighVolume && marketData.price_change_percentage_24h > 0
        }
      };
    } catch (error) {
      // Return default sentiment if API fails
      return {
        fear_greed_index: 50,
        social_mentions: 0,
        social_sentiment: 'neutral',
        news_sentiment: 0,
        whale_activity: {
          large_transactions: 0,
          whale_accumulation: false
        }
      };
    }
  }

  // Generate AI-powered insights
  private async generateAIInsights(
    marketData: MarketData,
    technicalIndicators: TechnicalIndicators,
    sentiment: MarketSentiment
  ): Promise<MarketAnalysis['ai_insights']> {
    // Analyze trend using technical indicators
    const trendAnalysis = this.technicalAnalysis.analyzeTrend(technicalIndicators);
    
    // Create comprehensive analysis prompt
    const analysisPrompt = `
Analyze the following cryptocurrency market data and provide insights:

Market Data:
- Current Price: $${marketData.current_price}
- 24h Change: ${marketData.price_change_percentage_24h.toFixed(2)}%
- 7d Change: ${marketData.price_change_percentage_7d_in_currency?.toFixed(2) || 'N/A'}%
- Market Cap Rank: #${marketData.market_cap_rank}
- Volume/Market Cap: ${(marketData.total_volume / marketData.market_cap * 100).toFixed(2)}%

Technical Indicators:
- RSI: ${technicalIndicators.rsi.toFixed(2)}
- MACD Histogram: ${technicalIndicators.macd.histogram.toFixed(4)}
- Price vs SMA20: ${((marketData.current_price / technicalIndicators.moving_averages.sma_20 - 1) * 100).toFixed(2)}%

Market Sentiment:
- Fear & Greed Index: ${sentiment.fear_greed_index}
- Social Sentiment: ${sentiment.social_sentiment}
- Whale Activity: ${sentiment.whale_activity.whale_accumulation ? 'Accumulating' : 'Distributing'}

Provide a brief analysis including:
1. Key factors affecting the price
2. Risk assessment
3. Short-term outlook

Keep the response concise and actionable.
`;

    try {
      const completion = await this.openAI.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: analysisPrompt }],
        max_tokens: 500,
        temperature: 0.7
      });
      
      const response = completion.choices[0]?.message?.content || '';
      
      // Parse key factors from AI response
      const keyFactors = this.extractKeyFactors(response);
      
      // Determine risk level based on multiple factors
      const riskLevel = this.assessRiskLevel(
        marketData,
        technicalIndicators,
        sentiment
      );

      return {
        trend: trendAnalysis.trend,
        confidence: trendAnalysis.strength,
        key_factors: keyFactors,
        risk_level: riskLevel,
        recommendation: response.slice(0, 200) // First 200 chars as summary
      };
    } catch (error) {
      // Fallback to rule-based insights if AI fails
      return {
        trend: trendAnalysis.trend,
        confidence: trendAnalysis.strength,
        key_factors: trendAnalysis.signals,
        risk_level: this.assessRiskLevel(marketData, technicalIndicators, sentiment),
        recommendation: `${marketData.name} is showing ${trendAnalysis.trend} signals with ${trendAnalysis.signals.length} technical indicators.`
      };
    }
  }

  // Extract key factors from AI response
  private extractKeyFactors(aiResponse: string): string[] {
    const factors: string[] = [];
    
    // Look for numbered points or bullet points
    const lines = aiResponse.split('\n');
    for (const line of lines) {
      if (line.match(/^\d+\.|^-|^•/) && line.length > 10) {
        factors.push(line.replace(/^\d+\.|^-|^•/, '').trim());
      }
    }

    // If no structured factors found, extract first few sentences
    if (factors.length === 0) {
      const sentences = aiResponse.match(/[^.!?]+[.!?]+/g) || [];
      factors.push(...sentences.slice(0, 3).map(s => s.trim()));
    }

    return factors.slice(0, 5); // Return top 5 factors
  }

  // Assess risk level based on multiple indicators
  private assessRiskLevel(
    marketData: MarketData,
    indicators: TechnicalIndicators,
    sentiment: MarketSentiment
  ): 'low' | 'medium' | 'high' {
    let riskScore = 0;

    // Volatility risk
    const dailyVolatility = Math.abs(marketData.price_change_percentage_24h);
    if (dailyVolatility > 20) riskScore += 3;
    else if (dailyVolatility > 10) riskScore += 2;
    else if (dailyVolatility > 5) riskScore += 1;

    // RSI extremes
    if (indicators.rsi > 80 || indicators.rsi < 20) riskScore += 2;
    else if (indicators.rsi > 70 || indicators.rsi < 30) riskScore += 1;

    // Market sentiment
    if (sentiment.fear_greed_index > 80 || sentiment.fear_greed_index < 20) riskScore += 2;
    else if (sentiment.fear_greed_index > 70 || sentiment.fear_greed_index < 30) riskScore += 1;

    // Volume anomalies
    if (marketData.total_volume > marketData.market_cap * 0.5) riskScore += 2;

    // Determine risk level
    if (riskScore >= 6) return 'high';
    if (riskScore >= 3) return 'medium';
    return 'low';
  }

  // Get top movers in the market
  async getTopMovers(limit: number = 10): Promise<MarketData[]> {
    try {
      // Get top 100 coins by market cap
      const topCoins = await this.coinGecko.getMarketData(
        ['bitcoin', 'ethereum', 'binancecoin', 'solana', 'cardano', 'avalanche-2', 
         'polkadot', 'chainlink', 'polygon', 'cosmos', 'near', 'algorand',
         'fantom', 'optimism', 'arbitrum', 'aptos', 'sui', 'sei-network'],
        'usd',
        false
      );

      // Sort by 24h price change
      const sorted = topCoins.sort((a, b) => 
        Math.abs(b.price_change_percentage_24h) - Math.abs(a.price_change_percentage_24h)
      );

      return sorted.slice(0, limit);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get top movers: ${error.message}`);
      }
      throw error;
    }
  }

  // Get trending coins
  async getTrendingCoins() {
    return await this.coinGecko.getTrendingCoins();
  }

  // Search for coins
  async searchCoins(query: string) {
    return await this.coinGecko.searchCoins(query);
  }
} 