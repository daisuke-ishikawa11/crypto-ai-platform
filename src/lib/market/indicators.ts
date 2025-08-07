// Export technical indicators for use in explainable AI

export function calculateRSI(prices: number[], period: number = 14): number[] {
  if (prices.length < period + 1) {
    return Array(prices.length).fill(50); // Neutral RSI
  }

  const rsiValues: number[] = [];
  
  // Fill initial values with neutral RSI
  for (let i = 0; i < period; i++) {
    rsiValues.push(50);
  }

  // Calculate RSI for each point
  for (let i = period; i < prices.length; i++) {
    const gains: number[] = [];
    const losses: number[] = [];
    
    for (let j = i - period + 1; j <= i; j++) {
      const change = prices[j] - prices[j - 1];
      if (change > 0) {
        gains.push(change);
        losses.push(0);
      } else {
        gains.push(0);
        losses.push(Math.abs(change));
      }
    }
    
    const avgGain = gains.reduce((a, b) => a + b, 0) / period;
    const avgLoss = losses.reduce((a, b) => a + b, 0) / period;
    
    if (avgLoss === 0) {
      rsiValues.push(100);
    } else {
      const rs = avgGain / avgLoss;
      const rsi = 100 - (100 / (1 + rs));
      rsiValues.push(rsi);
    }
  }
  
  return rsiValues;
}

export function calculateMACD(prices: number[], fastPeriod: number = 12, slowPeriod: number = 26, signalPeriod: number = 9) {
  const calculateEMA = (data: number[], period: number): number[] => {
    const ema: number[] = [];
    const k = 2 / (period + 1);
    
    // Start with SMA
    if (data.length >= period) {
      const sma = data.slice(0, period).reduce((a, b) => a + b, 0) / period;
      ema.push(sma);
      
      // Calculate EMA for rest
      for (let i = period; i < data.length; i++) {
        ema.push((data[i] * k) + (ema[ema.length - 1] * (1 - k)));
      }
    }
    
    return ema;
  };
  
  const emaFast = calculateEMA(prices, fastPeriod);
  const emaSlow = calculateEMA(prices, slowPeriod);
  
  // Calculate MACD line
  const macdLine: number[] = [];
  const startIdx = slowPeriod - 1;
  
  for (let i = 0; i < emaFast.length; i++) {
    if (i + startIdx < prices.length && i < emaSlow.length) {
      macdLine.push(emaFast[i] - emaSlow[i]);
    }
  }
  
  // Calculate signal line
  const signalLine = calculateEMA(macdLine, signalPeriod);
  
  // Calculate histogram
  const histogram: number[] = [];
  for (let i = 0; i < signalLine.length; i++) {
    if (i + signalPeriod - 1 < macdLine.length) {
      histogram.push(macdLine[i + signalPeriod - 1] - signalLine[i]);
    }
  }
  
  // Pad arrays to match original length
  const padding = prices.length - histogram.length;
  const paddedHistogram = Array(padding).fill(0).concat(histogram);
  const paddedMACD = Array(prices.length - macdLine.length).fill(0).concat(macdLine);
  const paddedSignal = Array(prices.length - signalLine.length).fill(0).concat(signalLine);
  
  return {
    macd: paddedMACD,
    signal: paddedSignal,
    histogram: paddedHistogram
  };
}

export function calculateBollingerBands(prices: number[], period: number = 20, stdDev: number = 2) {
  const upper: number[] = [];
  const middle: number[] = [];
  const lower: number[] = [];
  
  for (let i = 0; i < prices.length; i++) {
    if (i < period - 1) {
      // Not enough data, use current price
      upper.push(prices[i]);
      middle.push(prices[i]);
      lower.push(prices[i]);
    } else {
      // Calculate SMA
      const slice = prices.slice(i - period + 1, i + 1);
      const sma = slice.reduce((a, b) => a + b, 0) / period;
      
      // Calculate standard deviation
      const squaredDiffs = slice.map(price => Math.pow(price - sma, 2));
      const variance = squaredDiffs.reduce((a, b) => a + b, 0) / period;
      const std = Math.sqrt(variance);
      
      upper.push(sma + (stdDev * std));
      middle.push(sma);
      lower.push(sma - (stdDev * std));
    }
  }
  
  return { upper, middle, lower };
} 