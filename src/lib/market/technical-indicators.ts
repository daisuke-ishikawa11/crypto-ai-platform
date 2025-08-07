// Technical indicators calculation service
// Real calculations based on market data

import { MarketChart, TechnicalIndicators } from './types';

export class TechnicalAnalysisService {
  // Calculate Simple Moving Average
  private calculateSMA(data: number[], period: number): number {
    if (data.length < period) return 0;
    const sum = data.slice(-period).reduce((a, b) => a + b, 0);
    return sum / period;
  }

  // Calculate Exponential Moving Average
  private calculateEMA(data: number[], period: number): number {
    if (data.length < period) return 0;
    
    const k = 2 / (period + 1);
    let ema = this.calculateSMA(data.slice(0, period), period);
    
    for (let i = period; i < data.length; i++) {
      ema = (data[i] * k) + (ema * (1 - k));
    }
    
    return ema;
  }

  // Calculate Relative Strength Index (RSI)
  private calculateRSI(prices: number[], period: number = 14): number {
    if (prices.length < period + 1) return 50; // Neutral RSI

    const changes = [];
    for (let i = 1; i < prices.length; i++) {
      changes.push(prices[i] - prices[i - 1]);
    }

    const gains = changes.map(c => c > 0 ? c : 0);
    const losses = changes.map(c => c < 0 ? Math.abs(c) : 0);

    const avgGain = gains.slice(-period).reduce((a, b) => a + b, 0) / period;
    const avgLoss = losses.slice(-period).reduce((a, b) => a + b, 0) / period;

    if (avgLoss === 0) return 100;
    
    const rs = avgGain / avgLoss;
    const rsi = 100 - (100 / (1 + rs));
    
    return rsi;
  }

  // Calculate MACD (Moving Average Convergence Divergence)
  private calculateMACD(prices: number[]): { value: number; signal: number; histogram: number } {
    const ema12 = this.calculateEMA(prices, 12);
    const ema26 = this.calculateEMA(prices, 26);
    const macdLine = ema12 - ema26;
    
    // For signal line, we'd need historical MACD values
    // Simplified version using current MACD
    const signal = macdLine * 0.9; // Approximation
    const histogram = macdLine - signal;

    return {
      value: macdLine,
      signal: signal,
      histogram: histogram
    };
  }

  // Calculate Bollinger Bands
  private calculateBollingerBands(
    prices: number[], 
    period: number = 20, 
    stdDev: number = 2
  ): { upper: number; middle: number; lower: number } {
    const sma = this.calculateSMA(prices, period);
    
    if (prices.length < period) {
      return { upper: sma, middle: sma, lower: sma };
    }

    const relevantPrices = prices.slice(-period);
    const variance = relevantPrices.reduce((sum, price) => {
      const diff = price - sma;
      return sum + (diff * diff);
    }, 0) / period;
    
    const standardDeviation = Math.sqrt(variance);
    
    return {
      upper: sma + (stdDev * standardDeviation),
      middle: sma,
      lower: sma - (stdDev * standardDeviation)
    };
  }

  // Calculate volume profile
  private calculateVolumeProfile(
    prices: number[], 
    volumes: number[]
  ): { buy_volume: number; sell_volume: number; volume_ratio: number } {
    if (prices.length < 2 || volumes.length < 2) {
      return { buy_volume: 0, sell_volume: 0, volume_ratio: 0.5 };
    }

    let buyVolume = 0;
    let sellVolume = 0;

    // Simple heuristic: if price goes up, count as buy volume
    for (let i = 1; i < Math.min(prices.length, volumes.length); i++) {
      if (prices[i] > prices[i - 1]) {
        buyVolume += volumes[i];
      } else {
        sellVolume += volumes[i];
      }
    }

    const totalVolume = buyVolume + sellVolume;
    const volumeRatio = totalVolume > 0 ? buyVolume / totalVolume : 0.5;

    return {
      buy_volume: buyVolume,
      sell_volume: sellVolume,
      volume_ratio: volumeRatio
    };
  }

  // Main function to calculate all technical indicators
  calculateIndicators(marketChart: MarketChart): TechnicalIndicators {
    const prices = marketChart.prices.map(p => p[1]);
    const volumes = marketChart.total_volumes.map(v => v[1]);

    // Ensure we have enough data
    if (prices.length < 20) {
      throw new Error('Insufficient data for technical analysis. Need at least 20 data points.');
    }

    const rsi = this.calculateRSI(prices);
    const macd = this.calculateMACD(prices);
    const bollingerBands = this.calculateBollingerBands(prices);
    const volumeProfile = this.calculateVolumeProfile(prices, volumes);

    const movingAverages = {
      sma_20: this.calculateSMA(prices, 20),
      sma_50: this.calculateSMA(prices, 50),
      sma_200: this.calculateSMA(prices, 200),
      ema_12: this.calculateEMA(prices, 12),
      ema_26: this.calculateEMA(prices, 26)
    };

    return {
      rsi,
      macd,
      bollinger_bands: bollingerBands,
      moving_averages: movingAverages,
      volume_profile: volumeProfile
    };
  }

  // Analyze trend based on technical indicators
  analyzeTrend(indicators: TechnicalIndicators): {
    trend: 'bullish' | 'bearish' | 'neutral';
    strength: number;
    signals: string[];
  } {
    const signals: string[] = [];
    let bullishSignals = 0;
    let bearishSignals = 0;

    // RSI analysis
    if (indicators.rsi > 70) {
      bearishSignals++;
      signals.push('RSI overbought (>70)');
    } else if (indicators.rsi < 30) {
      bullishSignals++;
      signals.push('RSI oversold (<30)');
    }

    // MACD analysis
    if (indicators.macd.histogram > 0) {
      bullishSignals++;
      signals.push('MACD histogram positive');
    } else {
      bearishSignals++;
      signals.push('MACD histogram negative');
    }

    // Moving average analysis
    const { sma_20, sma_50, sma_200 } = indicators.moving_averages;
    if (sma_20 > sma_50 && sma_50 > sma_200) {
      bullishSignals++;
      signals.push('Moving averages in bullish alignment');
    } else if (sma_20 < sma_50 && sma_50 < sma_200) {
      bearishSignals++;
      signals.push('Moving averages in bearish alignment');
    }

    // Volume analysis
    if (indicators.volume_profile.volume_ratio > 0.6) {
      bullishSignals++;
      signals.push('Strong buying volume');
    } else if (indicators.volume_profile.volume_ratio < 0.4) {
      bearishSignals++;
      signals.push('Strong selling volume');
    }

    // Determine overall trend
    const totalSignals = bullishSignals + bearishSignals;
    const strength = totalSignals > 0 ? Math.abs(bullishSignals - bearishSignals) / totalSignals : 0;

    let trend: 'bullish' | 'bearish' | 'neutral';
    if (bullishSignals > bearishSignals) {
      trend = 'bullish';
    } else if (bearishSignals > bullishSignals) {
      trend = 'bearish';
    } else {
      trend = 'neutral';
    }

    return { trend, strength, signals };
  }
} 