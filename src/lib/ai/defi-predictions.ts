// 🔮 DeFi Predictive Analytics Service
// Advanced prediction models for APY trends, TVL forecasts, and risk events

import { logger } from '@/lib/monitoring/logger';
import { createOpenAIClient, generateChatResponse } from './openai';
import { createAnthropicClient, generateClaudeResponse } from './anthropic';
import type { DeFiProtocol } from './defi-ai-advisor';

export interface TimeSeries {
  timestamp: Date;
  value: number;
  metadata?: Record<string, any>;
}

export interface PredictionModel {
  model_id: string;
  name: string;
  accuracy: number; // Historical accuracy (0-1)
  confidence: number; // Current prediction confidence (0-1)
  last_trained: Date;
  features_used: string[];
}

export interface APYPrediction {
  protocol: string;
  current_apy: number;
  predictions: Array<{
    timeframe: '24h' | '7d' | '30d' | '90d';
    predicted_apy: number;
    confidence_interval: [number, number]; // [lower_bound, upper_bound]
    confidence: number;
    factors: Array<{
      factor: string;
      impact: number; // -1 to 1
      description: string;
    }>;
  }>;
  risk_factors: string[];
  recommendation: 'buy' | 'hold' | 'sell' | 'monitor';
}

export interface TVLForecast {
  protocol: string;
  current_tvl: number;
  forecasts: Array<{
    timeframe: '7d' | '30d' | '90d' | '180d';
    predicted_tvl: number;
    change_percentage: number;
    confidence: number;
    key_drivers: string[];
  }>;
  growth_category: 'declining' | 'stable' | 'growing' | 'explosive';
  sustainability_score: number; // 0-100
}

export interface RiskEvent {
  event_type: 'rug_pull' | 'exploit' | 'depeg' | 'governance_attack' | 'liquidity_crisis';
  protocol: string;
  probability: number; // 0-1
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  indicators: Array<{
    indicator: string;
    current_value: number;
    threshold: number;
    status: 'normal' | 'warning' | 'critical';
  }>;
  mitigation_strategies: string[];
  timeline: string; // e.g., "within 7 days"
}

export interface MarketCyclePrediction {
  current_phase: 'accumulation' | 'markup' | 'distribution' | 'decline';
  confidence: number;
  duration_estimate: number; // days remaining in current phase
  next_phase: string;
  signals: Array<{
    signal: string;
    strength: number;
    description: string;
  }>;
  recommended_strategy: string;
}

export interface GasOptimizationForecast {
  current_gas_price: number;
  predictions: Array<{
    timeframe: '1h' | '6h' | '24h';
    predicted_gas_price: number;
    confidence: number;
    network_congestion: 'low' | 'medium' | 'high';
  }>;
  optimal_transaction_windows: Array<{
    start_time: Date;
    end_time: Date;
    estimated_gas_price: number;
    confidence: number;
  }>;
}

class DeFiPredictiveAnalytics {
  private openai = createOpenAIClient();
  private anthropic = createAnthropicClient();
  private predictionCache = new Map<string, { data: any; timestamp: Date; ttl: number }>();

  async predictAPYTrends(
    protocol: DeFiProtocol,
    historicalData: TimeSeries[],
    marketContext?: Record<string, any>
  ): Promise<APYPrediction> {
    const cacheKey = `apy_${protocol.id}_${Date.now()}`;
    
    try {
      // Check cache first
      if (this.predictionCache.has(cacheKey)) {
        const cached = this.predictionCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp.getTime() < cached.ttl) {
          return cached.data;
        }
      }

      const prompt = this.buildAPYPredictionPrompt(protocol, historicalData, marketContext);

      const response = await generateClaudeResponse({
        model: 'claude-3-sonnet-20241022',
        system: `あなたはDeFi収益予測の専門家です。時系列分析、市場動向、プロトコル固有の要因を考慮してAPY予測を行います。
        以下の構造化されたJSON形式で回答してください：
        {
          "protocol": "プロトコル名",
          "current_apy": 現在APY,
          "predictions": [
            {
              "timeframe": "期間",
              "predicted_apy": 予測APY,
              "confidence_interval": [下限, 上限],
              "confidence": 信頼度,
              "factors": [{"factor": "要因", "impact": 影響度, "description": "説明"}]
            }
          ],
          "risk_factors": ["リスク要因"],
          "recommendation": "推奨アクション"
        }`,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2000,
        temperature: 0.2
      });

      const prediction: APYPrediction = JSON.parse(response.content);

      // Cache the result for 1 hour
      this.predictionCache.set(cacheKey, {
        data: prediction,
        timestamp: new Date(),
        ttl: 3600000 // 1 hour
      });

      logger.info('APY prediction generated', {
        protocol: protocol.name,
        currentAPY: prediction.current_apy,
        predictionsCount: prediction.predictions.length
      });

      return prediction;

    } catch (error) {
      logger.error('APY prediction error', { error, protocol: protocol.name });
      throw new Error(`APY予測の生成に失敗しました: ${error.message}`);
    }
  }

  async forecastTVL(
    protocol: DeFiProtocol,
    historicalTVL: TimeSeries[],
    competitorData?: Array<{ protocol: string; tvl: number; growth_rate: number }>
  ): Promise<TVLForecast> {
    try {
      const prompt = this.buildTVLForecastPrompt(protocol, historicalTVL, competitorData);

      const response = await generateClaudeResponse({
        model: 'claude-3-sonnet-20241022',
        system: `あなたはDeFi TVL予測の専門家です。流動性トレンド、市場サイクル、競合分析を組み合わせてTVL予測を行います。`,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1500,
        temperature: 0.25
      });

      const forecast: TVLForecast = JSON.parse(response.content);

      logger.info('TVL forecast generated', {
        protocol: protocol.name,
        currentTVL: forecast.current_tvl,
        growthCategory: forecast.growth_category
      });

      return forecast;

    } catch (error) {
      logger.error('TVL forecast error', { error, protocol: protocol.name });
      throw new Error(`TVL予測の生成に失敗しました: ${error.message}`);
    }
  }

  async detectRiskEvents(
    protocols: DeFiProtocol[],
    onChainMetrics: Record<string, any>
  ): Promise<RiskEvent[]> {
    try {
      const riskEvents: RiskEvent[] = [];

      for (const protocol of protocols) {
        const indicators = this.calculateRiskIndicators(protocol, onChainMetrics);
        
        // Check each risk type
        const rugPullRisk = this.assessRugPullRisk(protocol, indicators);
        const exploitRisk = this.assessExploitRisk(protocol, indicators);
        const depegRisk = this.assessDepegRisk(protocol, indicators);
        const liquidityRisk = this.assessLiquidityRisk(protocol, indicators);

        // Add significant risks to the list
        [rugPullRisk, exploitRisk, depegRisk, liquidityRisk]
          .filter(risk => risk.probability > 0.3) // Only include risks with >30% probability
          .forEach(risk => riskEvents.push(risk));
      }

      // Sort by risk probability and severity
      riskEvents.sort((a, b) => {
        const scoreA = a.probability * this.getSeverityWeight(a.severity);
        const scoreB = b.probability * this.getSeverityWeight(b.severity);
        return scoreB - scoreA;
      });

      logger.info('Risk events detected', {
        totalEvents: riskEvents.length,
        highRisk: riskEvents.filter(r => r.severity === 'critical' || r.severity === 'high').length
      });

      return riskEvents;

    } catch (error) {
      logger.error('Risk detection error', { error });
      throw new Error(`リスクイベント検出に失敗しました: ${error.message}`);
    }
  }

  async predictMarketCycle(
    marketData: {
      prices: TimeSeries[];
      volume: TimeSeries[];
      sentiment: TimeSeries[];
      macro_indicators?: Record<string, number>;
    }
  ): Promise<MarketCyclePrediction> {
    try {
      const prompt = this.buildMarketCyclePredictionPrompt(marketData);

      const response = await generateChatResponse({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `あなたは暗号通貨市場サイクルの専門アナリストです。価格、出来高、センチメント、マクロ経済指標を分析して現在の市場フェーズと次の動きを予測します。`
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1000,
        temperature: 0.3
      });

      const prediction: MarketCyclePrediction = JSON.parse(response.content);

      logger.info('Market cycle prediction generated', {
        currentPhase: prediction.current_phase,
        confidence: prediction.confidence
      });

      return prediction;

    } catch (error) {
      logger.error('Market cycle prediction error', { error });
      throw new Error(`市場サイクル予測の生成に失敗しました: ${error.message}`);
    }
  }

  async optimizeGasUsage(
    networkData: {
      historical_gas: TimeSeries[];
      pending_transactions: number;
      network_utilization: number;
    }
  ): Promise<GasOptimizationForecast> {
    try {
      // Analyze gas price patterns
      const gasPatterns = this.analyzeGasPatterns(networkData.historical_gas);
      
      // Generate predictions for different timeframes
      const predictions = [
        {
          timeframe: '1h' as const,
          predicted_gas_price: this.predictGasPrice(networkData, 1),
          confidence: 0.8,
          network_congestion: this.assessNetworkCongestion(networkData.network_utilization)
        },
        {
          timeframe: '6h' as const,
          predicted_gas_price: this.predictGasPrice(networkData, 6),
          confidence: 0.6,
          network_congestion: this.assessNetworkCongestion(networkData.network_utilization)
        },
        {
          timeframe: '24h' as const,
          predicted_gas_price: this.predictGasPrice(networkData, 24),
          confidence: 0.4,
          network_congestion: this.assessNetworkCongestion(networkData.network_utilization)
        }
      ];

      // Find optimal transaction windows
      const optimalWindows = this.findOptimalTransactionWindows(gasPatterns, predictions);

      const forecast: GasOptimizationForecast = {
        current_gas_price: networkData.historical_gas[networkData.historical_gas.length - 1]?.value || 0,
        predictions,
        optimal_transaction_windows: optimalWindows
      };

      logger.info('Gas optimization forecast generated', {
        currentGasPrice: forecast.current_gas_price,
        optimalWindows: optimalWindows.length
      });

      return forecast;

    } catch (error) {
      logger.error('Gas optimization forecast error', { error });
      throw new Error(`ガス最適化予測の生成に失敗しました: ${error.message}`);
    }
  }

  // Private helper methods

  private buildAPYPredictionPrompt(
    protocol: DeFiProtocol,
    historicalData: TimeSeries[],
    marketContext?: Record<string, any>
  ): string {
    return `以下のDeFiプロトコルのAPY予測を行ってください：

プロトコル情報:
- 名前: ${protocol.name}
- カテゴリ: ${protocol.category}
- 現在APY: ${protocol.apy}%
- TVL: $${(protocol.tvl / 1000000).toFixed(1)}M
- リスクスコア: ${protocol.riskScore}/100

過去30日間のAPYデータ:
${historicalData.slice(-30).map(d => `${d.timestamp.toISOString().split('T')[0]}: ${d.value}%`).join('\n')}

${marketContext ? `
市場コンテキスト:
${Object.entries(marketContext).map(([key, value]) => `- ${key}: ${value}`).join('\n')}
` : ''}

以下の期間でAPY予測を提供してください：24時間、7日間、30日間、90日間

各予測には以下を含めてください：
- 予測APY値と信頼区間
- 主要な影響要因とそのインパクト
- 信頼度スコア
- 推奨アクション`;
  }

  private buildTVLForecastPrompt(
    protocol: DeFiProtocol,
    historicalTVL: TimeSeries[],
    competitorData?: Array<{ protocol: string; tvl: number; growth_rate: number }>
  ): string {
    return `以下のプロトコルのTVL予測を行ってください：

プロトコル: ${protocol.name}
現在TVL: $${(protocol.tvl / 1000000).toFixed(1)}M
カテゴリ: ${protocol.category}

TVL履歴（過去60日）:
${historicalTVL.slice(-60).map(d => `${d.timestamp.toISOString().split('T')[0]}: $${(d.value / 1000000).toFixed(1)}M`).join('\n')}

${competitorData ? `
競合分析:
${competitorData.map(c => `- ${c.protocol}: $${(c.tvl / 1000000).toFixed(1)}M (成長率: ${c.growth_rate.toFixed(1)}%)`).join('\n')}
` : ''}

以下のJSON形式でTVL予測を提供してください：
{
  "protocol": "${protocol.name}",
  "current_tvl": ${protocol.tvl},
  "forecasts": [
    {"timeframe": "7d", "predicted_tvl": 0, "change_percentage": 0, "confidence": 0, "key_drivers": []},
    {"timeframe": "30d", "predicted_tvl": 0, "change_percentage": 0, "confidence": 0, "key_drivers": []},
    {"timeframe": "90d", "predicted_tvl": 0, "change_percentage": 0, "confidence": 0, "key_drivers": []},
    {"timeframe": "180d", "predicted_tvl": 0, "change_percentage": 0, "confidence": 0, "key_drivers": []}
  ],
  "growth_category": "stable",
  "sustainability_score": 75
}`;
  }

  private buildMarketCyclePredictionPrompt(marketData: any): string {
    const recentPrices = marketData.prices.slice(-30);
    const recentVolume = marketData.volume.slice(-30);
    
    return `現在の市場サイクルフェーズを分析し、次の動きを予測してください：

価格データ（過去30日）:
${recentPrices.map((p: TimeSeries) => `${p.timestamp.toISOString().split('T')[0]}: $${p.value.toFixed(2)}`).join('\n')}

出来高データ（過去30日）:
${recentVolume.map((v: TimeSeries) => `${v.timestamp.toISOString().split('T')[0]}: $${(v.value / 1000000).toFixed(1)}M`).join('\n')}

以下のJSON形式で予測を提供してください：
{
  "current_phase": "accumulation|markup|distribution|decline",
  "confidence": 0.0-1.0,
  "duration_estimate": 日数,
  "next_phase": "次のフェーズ",
  "signals": [{"signal": "シグナル", "strength": 0.0-1.0, "description": "説明"}],
  "recommended_strategy": "推奨戦略"
}`;
  }

  private calculateRiskIndicators(protocol: DeFiProtocol, metrics: Record<string, any>): Record<string, number> {
    return {
      tvl_change_24h: metrics[`${protocol.id}_tvl_change_24h`] || 0,
      active_users_change: metrics[`${protocol.id}_users_change`] || 0,
      transaction_volume_change: metrics[`${protocol.id}_volume_change`] || 0,
      token_price_volatility: metrics[`${protocol.id}_token_volatility`] || 0,
      liquidity_depth: metrics[`${protocol.id}_liquidity_depth`] || 100,
      governance_activity: metrics[`${protocol.id}_governance_activity`] || 50,
      audit_score: metrics[`${protocol.id}_audit_score`] || protocol.riskScore
    };
  }

  private assessRugPullRisk(protocol: DeFiProtocol, indicators: Record<string, number>): RiskEvent {
    const probability = Math.max(0, Math.min(1,
      (100 - protocol.riskScore) / 100 * 0.3 +
      Math.abs(indicators.tvl_change_24h) / 50 * 0.3 +
      (100 - indicators.audit_score) / 100 * 0.4
    ));

    return {
      event_type: 'rug_pull',
      protocol: protocol.name,
      probability,
      severity: probability > 0.7 ? 'critical' : probability > 0.5 ? 'high' : 'medium',
      confidence: 0.7,
      indicators: [
        {
          indicator: 'TVL変化率',
          current_value: indicators.tvl_change_24h,
          threshold: -30,
          status: indicators.tvl_change_24h < -30 ? 'critical' : indicators.tvl_change_24h < -10 ? 'warning' : 'normal'
        }
      ],
      mitigation_strategies: [
        '少額での投資テスト',
        '開発チームの身元確認',
        'コントラクトの監査レポート確認',
        '流動性のロック期間確認'
      ],
      timeline: 'within 30 days'
    };
  }

  private assessExploitRisk(protocol: DeFiProtocol, indicators: Record<string, number>): RiskEvent {
    const probability = Math.max(0, Math.min(1,
      (100 - indicators.audit_score) / 100 * 0.6 +
      indicators.token_price_volatility / 100 * 0.2 +
      (100 - indicators.governance_activity) / 100 * 0.2
    ));

    return {
      event_type: 'exploit',
      protocol: protocol.name,
      probability,
      severity: 'high',
      confidence: 0.6,
      indicators: [
        {
          indicator: '監査スコア',
          current_value: indicators.audit_score,
          threshold: 70,
          status: indicators.audit_score < 70 ? 'warning' : 'normal'
        }
      ],
      mitigation_strategies: [
        '最新の監査レポートの確認',
        'バグバウンティプログラムの有無確認',
        '保険プロトコルの利用検討',
        '資金の分散投資'
      ],
      timeline: 'within 90 days'
    };
  }

  private assessDepegRisk(protocol: DeFiProtocol, indicators: Record<string, number>): RiskEvent {
    // Only relevant for stablecoin or pegged assets
    if (!['stablecoin', 'bridge', 'derivatives'].includes(protocol.category)) {
      return this.createMinimalRiskEvent('depeg', protocol.name);
    }

    const probability = Math.max(0, Math.min(1,
      indicators.token_price_volatility / 20 * 0.5 +
      Math.abs(indicators.liquidity_depth - 100) / 100 * 0.3 +
      Math.abs(indicators.tvl_change_24h) / 30 * 0.2
    ));

    return {
      event_type: 'depeg',
      protocol: protocol.name,
      probability,
      severity: probability > 0.6 ? 'high' : 'medium',
      confidence: 0.8,
      indicators: [
        {
          indicator: '価格ボラティリティ',
          current_value: indicators.token_price_volatility,
          threshold: 5,
          status: indicators.token_price_volatility > 5 ? 'warning' : 'normal'
        }
      ],
      mitigation_strategies: [
        '複数のペッグメカニズムの確認',
        '担保比率の監視',
        '流動性プールの深さ確認',
        'アービトラージ機会の監視'
      ],
      timeline: 'within 14 days'
    };
  }

  private assessLiquidityRisk(protocol: DeFiProtocol, indicators: Record<string, number>): RiskEvent {
    const probability = Math.max(0, Math.min(1,
      Math.abs(indicators.tvl_change_24h) / 40 * 0.4 +
      Math.abs(indicators.transaction_volume_change) / 50 * 0.3 +
      (100 - indicators.liquidity_depth) / 100 * 0.3
    ));

    return {
      event_type: 'liquidity_crisis',
      protocol: protocol.name,
      probability,
      severity: probability > 0.7 ? 'high' : 'medium',
      confidence: 0.7,
      indicators: [
        {
          indicator: '流動性深度',
          current_value: indicators.liquidity_depth,
          threshold: 50,
          status: indicators.liquidity_depth < 50 ? 'warning' : 'normal'
        }
      ],
      mitigation_strategies: [
        '複数のDEXでの流動性確認',
        '大口取引時のスリッページ確認',
        'ステーブルコインペアの利用',
        '段階的な出金計画'
      ],
      timeline: 'within 7 days'
    };
  }

  private createMinimalRiskEvent(eventType: RiskEvent['event_type'], protocol: string): RiskEvent {
    return {
      event_type: eventType,
      protocol,
      probability: 0.1,
      severity: 'low',
      confidence: 0.3,
      indicators: [],
      mitigation_strategies: [],
      timeline: 'low probability'
    };
  }

  private getSeverityWeight(severity: RiskEvent['severity']): number {
    switch (severity) {
      case 'critical': return 4;
      case 'high': return 3;
      case 'medium': return 2;
      case 'low': return 1;
      default: return 1;
    }
  }

  private analyzeGasPatterns(historicalGas: TimeSeries[]): {
    hourlyAverage: number[];
    dailyPattern: Record<string, number>;
    volatilityIndex: number;
  } {
    const hourlyData = new Array(24).fill(0).map(() => [] as number[]);
    
    historicalGas.forEach(data => {
      const hour = data.timestamp.getHours();
      hourlyData[hour].push(data.value);
    });

    const hourlyAverage = hourlyData.map(hourData => 
      hourData.length > 0 ? hourData.reduce((a, b) => a + b, 0) / hourData.length : 0
    );

    const values = historicalGas.map(d => d.value);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    const volatilityIndex = Math.sqrt(variance) / mean;

    return {
      hourlyAverage,
      dailyPattern: {
        'weekday': mean * 1.2,
        'weekend': mean * 0.8
      },
      volatilityIndex
    };
  }

  private predictGasPrice(networkData: any, hoursAhead: number): number {
    const currentGas = networkData.historical_gas[networkData.historical_gas.length - 1]?.value || 20;
    const congestionMultiplier = networkData.network_utilization > 0.8 ? 1.5 : 
                                 networkData.network_utilization > 0.6 ? 1.2 : 1.0;
    
    // Simple prediction based on current conditions and time patterns
    const timeDecay = Math.max(0.5, 1 - hoursAhead * 0.05);
    return Math.round(currentGas * congestionMultiplier * timeDecay);
  }

  private assessNetworkCongestion(utilization: number): 'low' | 'medium' | 'high' {
    if (utilization > 0.8) return 'high';
    if (utilization > 0.5) return 'medium';
    return 'low';
  }

  private findOptimalTransactionWindows(gasPatterns: any, predictions: any[]): Array<{
    start_time: Date;
    end_time: Date;
    estimated_gas_price: number;
    confidence: number;
  }> {
    // Find hours with historically low gas prices
    const lowGasHours = gasPatterns.hourlyAverage
      .map((avg: number, hour: number) => ({ hour, avg }))
      .sort((a: any, b: any) => a.avg - b.avg)
      .slice(0, 6) // Top 6 cheapest hours
      .map((item: any) => item.hour);

    const now = new Date();
    const windows = [];

    // Generate windows for the next 24 hours
    for (let i = 0; i < 24; i++) {
      const hour = (now.getHours() + i) % 24;
      if (lowGasHours.includes(hour)) {
        const startTime = new Date(now);
        startTime.setHours(now.getHours() + i, 0, 0, 0);
        const endTime = new Date(startTime);
        endTime.setHours(endTime.getHours() + 1);

        windows.push({
          start_time: startTime,
          end_time: endTime,
          estimated_gas_price: gasPatterns.hourlyAverage[hour],
          confidence: 0.7
        });
      }
    }

    return windows.slice(0, 3); // Return top 3 windows
  }
}

export const defiPredictiveAnalytics = new DeFiPredictiveAnalytics();
export default defiPredictiveAnalytics;