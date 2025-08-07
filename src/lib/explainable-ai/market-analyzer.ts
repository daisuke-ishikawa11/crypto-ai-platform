// Explainable Market Analysis

import { 
  AIPrediction, 
  ReasoningStep, 
  FeatureImportance,
  VisualizationConfig,
  StepType,
  FeatureCategory 
} from './types';
import { MarketData } from '@/lib/market/types';
import { calculateRSI, calculateMACD, calculateBollingerBands } from '@/lib/market/indicators';

interface BollingerBands {
  upper: number[];
  middle: number[];
  lower: number[];
}

export class ExplainableMarketAnalyzer {
  /**
   * Analyze market with explainable AI
   */
  async analyzeMarket(
    marketData: MarketData,
    priceHistory: number[],
    volumeHistory: number[]
  ): Promise<{
    prediction: Omit<AIPrediction, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;
    steps: Omit<ReasoningStep, 'id' | 'predictionId' | 'createdAt'>[];
    features: Omit<FeatureImportance, 'id' | 'predictionId' | 'createdAt'>[];
  }> {
    const steps: Omit<ReasoningStep, 'id' | 'predictionId' | 'createdAt'>[] = [];
    const features: Omit<FeatureImportance, 'id' | 'predictionId' | 'createdAt'>[] = [];
    
    // Step 1: Data Collection
    steps.push({
      stepOrder: 1,
      stepType: 'data_collection' as StepType,
      description: 'Collecting market data and price history',
      inputData: {
        dataPoints: priceHistory.length,
        latestPrice: marketData.current_price,
        timeRange: '30 days'
      },
      outputData: {
        priceData: 'collected',
        volumeData: 'collected',
        marketCapData: 'collected'
      },
      confidence: 1.0,
      impactWeight: 0.1
    });
    
    // Step 2: Feature Extraction
    const rsi = calculateRSI(priceHistory);
    const macd = calculateMACD(priceHistory);
    const bb = calculateBollingerBands(priceHistory);
    
    steps.push({
      stepOrder: 2,
      stepType: 'feature_extraction' as StepType,
      description: 'Calculating technical indicators',
      inputData: {
        priceHistory: priceHistory.length + ' data points'
      },
      outputData: {
        rsi: rsi[rsi.length - 1],
        macd: macd.histogram[macd.histogram.length - 1],
        bollingerBands: {
          upper: bb.upper[bb.upper.length - 1],
          middle: bb.middle[bb.middle.length - 1],
          lower: bb.lower[bb.lower.length - 1]
        }
      },
      confidence: 0.95,
      impactWeight: 0.3
    });
    
    // Step 3: Analysis
    const currentRSI = rsi[rsi.length - 1];
    const currentMACD = macd.histogram[macd.histogram.length - 1];
    const pricePosition = (marketData.current_price - bb.lower[bb.lower.length - 1]) / 
                        (bb.upper[bb.upper.length - 1] - bb.lower[bb.lower.length - 1]);
    
    const trendScore = this.calculateTrendScore(currentRSI, currentMACD, pricePosition);
    
    steps.push({
      stepOrder: 3,
      stepType: 'analysis' as StepType,
      description: 'Analyzing market conditions and trends',
      inputData: {
        rsi: currentRSI,
        macd: currentMACD,
        pricePosition: pricePosition
      },
      outputData: {
        trendScore: trendScore,
        marketCondition: this.getMarketCondition(trendScore)
      },
      confidence: 0.85,
      impactWeight: 0.4
    });
    
    // Feature importance
    features.push(
      {
        featureName: 'RSI (Relative Strength Index)',
        featureCategory: 'technical' as FeatureCategory,
        importanceScore: 0.35,
        contributionDirection: currentRSI > 70 ? 'negative' : currentRSI < 30 ? 'positive' : 'neutral',
        currentValue: currentRSI,
        historicalValues: rsi.slice(-10),
        thresholdValues: { min: 30, max: 70, optimal: 50 },
        explanation: `RSI is ${currentRSI.toFixed(2)}, indicating ${currentRSI > 70 ? 'overbought' : currentRSI < 30 ? 'oversold' : 'neutral'} conditions`
      },
      {
        featureName: 'MACD Histogram',
        featureCategory: 'technical' as FeatureCategory,
        importanceScore: 0.30,
        contributionDirection: currentMACD > 0 ? 'positive' : 'negative',
        currentValue: currentMACD,
        historicalValues: macd.histogram.slice(-10),
        explanation: `MACD histogram is ${currentMACD > 0 ? 'positive' : 'negative'}, suggesting ${currentMACD > 0 ? 'bullish' : 'bearish'} momentum`
      },
      {
        featureName: 'Price Position in Bollinger Bands',
        featureCategory: 'technical' as FeatureCategory,
        importanceScore: 0.25,
        contributionDirection: pricePosition > 0.8 ? 'negative' : pricePosition < 0.2 ? 'positive' : 'neutral',
        currentValue: pricePosition,
        thresholdValues: { min: 0.2, max: 0.8, optimal: 0.5 },
        explanation: `Price is at ${(pricePosition * 100).toFixed(1)}% of the Bollinger Band range`
      },
      {
        featureName: '24h Price Change',
        featureCategory: 'fundamental' as FeatureCategory,
        importanceScore: 0.10,
        contributionDirection: marketData.price_change_24h > 0 ? 'positive' : 'negative',
        currentValue: marketData.price_change_24h,
        explanation: `24-hour price change of ${marketData.price_change_24h.toFixed(2)}%`
      }
    );
    
    // Build prediction
    const prediction: Omit<AIPrediction, 'id' | 'userId' | 'createdAt' | 'updatedAt'> = {
      predictionType: 'market_analysis',
      assetSymbol: marketData.symbol,
      prediction: {
        value: trendScore,
        label: this.getMarketCondition(trendScore),
        metadata: {
          direction: trendScore > 0.6 ? 'bullish' : trendScore < 0.4 ? 'bearish' : 'neutral',
          strength: Math.abs(trendScore - 0.5) * 2
        }
      },
      confidence: 0.75,
      timeHorizon: '24h',
      reasoning: {
        summary: this.generateReasoning(trendScore, currentRSI, currentMACD, pricePosition),
        mainFactors: [
          `RSI at ${currentRSI.toFixed(2)}`,
          `MACD ${currentMACD > 0 ? 'positive' : 'negative'}`,
          `Price position: ${(pricePosition * 100).toFixed(1)}%`
        ],
        confidenceBreakdown: {
          'Technical Analysis': 0.8,
          'Market Momentum': 0.7,
          'Price Action': 0.75
        }
      },
      keyFactors: features.slice(0, 3).map(f => ({
        factor: f.featureName,
        impact: f.importanceScore,
        description: f.explanation || ''
      })),
      supportingData: {
        rsi: currentRSI,
        macd: currentMACD,
        bollingerBands: {
          upper: bb.upper[bb.upper.length - 1],
          lower: bb.lower[bb.lower.length - 1]
        },
        priceChange24h: marketData.price_change_24h
      },
      modelName: 'Technical Analysis Engine',
      modelVersion: '1.0',
      visualizationData: {
        charts: [
          {
            type: 'line',
            data: this.createPriceChart(priceHistory, bb).data,
            config: this.createPriceChart(priceHistory, bb).options || {}
          },
          {
            type: 'multi-axis',
            data: this.createIndicatorChart(rsi, macd.histogram).data,
            config: this.createIndicatorChart(rsi, macd.histogram).options || {}
          }
        ],
        insights: [
          `Market is showing ${this.getMarketCondition(trendScore)} signals`,
          `Technical indicators suggest ${trendScore > 0.6 ? 'buying' : trendScore < 0.4 ? 'selling' : 'holding'} opportunity`
        ]
      }
    };
    
    return { prediction, steps, features };
  }
  
  private calculateTrendScore(rsi: number, macd: number, pricePosition: number): number {
    // Normalize RSI (0-100 to 0-1)
    const rsiScore = rsi / 100;
    
    // Normalize MACD (-1 to 1 assumed range to 0-1)
    const macdScore = (macd + 1) / 2;
    
    // Price position is already 0-1
    
    // Weighted average
    const score = (rsiScore * 0.4 + macdScore * 0.4 + pricePosition * 0.2);
    
    // Clamp between 0 and 1
    return Math.max(0, Math.min(1, score));
  }
  
  private getMarketCondition(score: number): string {
    if (score > 0.7) return 'Strong Bullish';
    if (score > 0.6) return 'Bullish';
    if (score > 0.4) return 'Neutral';
    if (score > 0.3) return 'Bearish';
    return 'Strong Bearish';
  }
  
  private generateReasoning(
    trendScore: number,
    rsi: number,
    macd: number,
    pricePosition: number
  ): string {
    const condition = this.getMarketCondition(trendScore);
    const rsiCondition = rsi > 70 ? 'overbought' : rsi < 30 ? 'oversold' : 'neutral';
    const macdCondition = macd > 0 ? 'positive' : 'negative';
    
    return `The market is showing ${condition} signals based on technical analysis. ` +
           `The RSI indicates ${rsiCondition} conditions at ${rsi.toFixed(2)}, ` +
           `while the MACD histogram is ${macdCondition}, suggesting ${macd > 0 ? 'bullish' : 'bearish'} momentum. ` +
           `The price is positioned at ${(pricePosition * 100).toFixed(1)}% within the Bollinger Bands range.`;
  }
  
  private createPriceChart(
    prices: number[], 
    bb: BollingerBands
  ): VisualizationConfig {
    return {
      type: 'line' as const,
      title: 'Price Movement with Bollinger Bands',
      description: 'Historical price with volatility bands',
      data: {
        labels: prices.map((_, i) => `Day ${i + 1}`),
        datasets: [
          {
            label: 'Price',
            data: prices,
            borderColor: 'rgb(75, 192, 192)',
            fill: false
          },
          {
            label: 'Upper Band',
            data: bb.upper,
            borderColor: 'rgb(255, 99, 132)',
            fill: false,
            borderDash: [5, 5]
          },
          {
            label: 'Lower Band',
            data: bb.lower,
            borderColor: 'rgb(255, 99, 132)',
            fill: false,
            borderDash: [5, 5]
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          title: { display: true, text: 'Price Movement Analysis' }
        }
      }
    };
  }
  
  private createIndicatorChart(rsi: number[], macdHist: number[]): VisualizationConfig {
    return {
      type: 'line',
      title: 'Technical Indicators',
      description: 'RSI and MACD histogram trends',
      data: {
        labels: Array.from({ length: rsi.length }, (_, i) => i),
        datasets: [
          {
            label: 'RSI',
            data: rsi,
            borderColor: 'rgb(153, 102, 255)',
            yAxisID: 'y-rsi'
          },
          {
            label: 'MACD Histogram',
            data: macdHist,
            type: 'bar' as const,
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
            yAxisID: 'y-macd'
          }
        ]
      },
      options: {
        scales: {
          'y-rsi': {
            type: 'linear',
            position: 'left',
            min: 0,
            max: 100
          },
          'y-macd': {
            type: 'linear',
            position: 'right'
          }
        }
      }
    };
  }
} 