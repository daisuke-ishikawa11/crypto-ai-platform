// 🚨 Smart Alerts Engine
// AI-driven intelligent alerting system for DeFi opportunities and risks

import { logger } from '@/lib/monitoring/logger';
import { createClient } from '@/lib/supabase/server';
import { generateChatResponse } from './openai';
import { generateClaudeResponse } from './anthropic';
import type { Portfolio, UserPreferences } from './types/ai-service-types';
import type { DeFiProtocol } from './defi-ai-advisor';
import type { RiskEvent } from './defi-predictions';

export interface SmartAlert {
  id: string;
  user_id: string;
  type: 'opportunity' | 'risk' | 'portfolio_health' | 'market_event' | 'custom';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  description: string;
  conditions_met: Array<{
    condition: string;
    value: number;
    threshold: number;
    operator: 'gt' | 'lt' | 'eq' | 'gte' | 'lte';
  }>;
  metadata: {
    protocol?: string;
    asset?: string;
    action_required?: boolean;
    estimated_impact?: number; // USD value
    time_sensitivity?: 'immediate' | 'hours' | 'days' | 'weeks';
    confidence?: number;
    related_alerts?: string[];
  };
  created_at: Date;
  expires_at?: Date;
  is_read: boolean;
  is_dismissed: boolean;
  user_feedback?: {
    helpful: boolean;
    acted_upon: boolean;
    comment?: string;
  };
}

export interface AlertCondition {
  id: string;
  user_id: string;
  name: string;
  description: string;
  type: 'price_movement' | 'apy_change' | 'tvl_change' | 'risk_score_change' | 'custom_ai';
  parameters: {
    asset?: string;
    protocol?: string;
    threshold?: number;
    operator?: 'gt' | 'lt' | 'eq' | 'gte' | 'lte';
    timeframe?: '1m' | '5m' | '15m' | '1h' | '4h' | '24h';
    custom_logic?: string; // AI-interpreted natural language condition
  };
  is_active: boolean;
  created_at: Date;
  last_triggered?: Date;
  trigger_count: number;
}

export interface PortfolioHealthScore {
  overall_score: number; // 0-100
  risk_score: number; // 0-100
  diversification_score: number; // 0-100
  yield_optimization_score: number; // 0-100
  security_score: number; // 0-100
  factors: Array<{
    factor: string;
    score: number;
    impact: 'positive' | 'negative' | 'neutral';
    recommendation?: string;
  }>;
  trends: {
    score_change_24h: number;
    score_change_7d: number;
    score_change_30d: number;
  };
}

export interface OpportunityAlert {
  protocol: string;
  opportunity_type: 'high_yield' | 'arbitrage' | 'new_pool' | 'liquidation' | 'governance';
  estimated_apy?: number;
  estimated_profit?: number;
  risk_level: 'low' | 'medium' | 'high';
  time_window: number; // minutes
  requirements: string[];
  instructions: string[];
  confidence: number;
}

class SmartAlertsEngine {
  private supabase = createClient();
  private alertHistory = new Map<string, SmartAlert[]>();
  private userPreferencesCache = new Map<string, { preferences: any; lastUpdated: Date }>();

  async processMarketData(marketData: Record<string, any>): Promise<SmartAlert[]> {
    try {
      const alerts: SmartAlert[] = [];
      
      // Get all active users with alert conditions
      const { data: alertConditions, error } = await this.supabase
        .from('alert_conditions')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;

      // Group by user for batch processing
      const userConditions = this.groupConditionsByUser(alertConditions || []);

      for (const [userId, conditions] of Object.entries(userConditions)) {
        const userAlerts = await this.evaluateUserConditions(userId, conditions, marketData);
        alerts.push(...userAlerts);
      }

      // Process AI-driven anomaly detection
      const anomalies = await this.detectAnomalies(marketData);
      alerts.push(...anomalies);

      // Save alerts to database
      if (alerts.length > 0) {
        await this.saveAlerts(alerts);
      }

      logger.info('Smart alerts processed', {
        totalAlerts: alerts.length,
        criticalAlerts: alerts.filter(a => a.severity === 'critical').length
      });

      return alerts;

    } catch (error) {
      logger.error('Market data processing error', { error });
      throw new Error(`市場データ処理に失敗しました: ${error.message}`);
    }
  }

  async evaluatePortfolioHealth(
    userId: string,
    portfolio: Portfolio,
    protocols: DeFiProtocol[]
  ): Promise<{ score: PortfolioHealthScore; alerts: SmartAlert[] }> {
    try {
      const userPrefs = await this.getUserPreferences(userId);
      
      // Calculate portfolio health metrics
      const riskScore = this.calculateRiskScore(portfolio, protocols);
      const diversificationScore = this.calculateDiversificationScore(portfolio);
      const yieldOptimizationScore = await this.calculateYieldOptimizationScore(portfolio, protocols);
      const securityScore = this.calculateSecurityScore(portfolio, protocols);

      const overallScore = Math.round(
        riskScore * 0.3 +
        diversificationScore * 0.25 +
        yieldOptimizationScore * 0.25 +
        securityScore * 0.2
      );

      // Get historical scores for trend analysis
      const trends = await this.getPortfolioTrends(userId);

      const score: PortfolioHealthScore = {
        overall_score: overallScore,
        risk_score: riskScore,
        diversification_score: diversificationScore,
        yield_optimization_score: yieldOptimizationScore,
        security_score: securityScore,
        factors: this.identifyHealthFactors(portfolio, protocols, userPrefs),
        trends
      };

      // Generate alerts based on health score
      const alerts = await this.generateHealthAlerts(userId, score, userPrefs);

      return { score, alerts };

    } catch (error) {
      logger.error('Portfolio health evaluation error', { error, userId });
      throw new Error(`ポートフォリオ健全性評価に失敗しました: ${error.message}`);
    }
  }

  async discoverOpportunities(
    userId: string,
    portfolio: Portfolio,
    availableProtocols: DeFiProtocol[]
  ): Promise<OpportunityAlert[]> {
    try {
      const userPrefs = await this.getUserPreferences(userId);
      const opportunities: OpportunityAlert[] = [];

      // High yield opportunities
      const highYieldOpps = this.findHighYieldOpportunities(availableProtocols, userPrefs);
      opportunities.push(...highYieldOpps);

      // Arbitrage opportunities
      const arbOpps = await this.findArbitrageOpportunities(portfolio);
      opportunities.push(...arbOpps);

      // New liquidity pools
      const newPoolOpps = await this.findNewPoolOpportunities(userPrefs);
      opportunities.push(...newPoolOpps);

      // Liquidation opportunities (for advanced users)
      if (userPrefs?.riskTolerance === 'aggressive') {
        const liqOpps = await this.findLiquidationOpportunities();
        opportunities.push(...liqOpps);
      }

      // Governance participation opportunities
      const govOpps = await this.findGovernanceOpportunities(portfolio);
      opportunities.push(...govOpps);

      // Sort by estimated profit and confidence
      opportunities.sort((a, b) => {
        const scoreA = (a.estimated_profit || 0) * a.confidence;
        const scoreB = (b.estimated_profit || 0) * b.confidence;
        return scoreB - scoreA;
      });

      logger.info('Opportunities discovered', {
        userId,
        totalOpportunities: opportunities.length,
        highConfidence: opportunities.filter(o => o.confidence > 0.8).length
      });

      return opportunities.slice(0, 10); // Return top 10 opportunities

    } catch (error) {
      logger.error('Opportunity discovery error', { error, userId });
      throw new Error(`機会発見に失敗しました: ${error.message}`);
    }
  }

  async createCustomAlert(
    userId: string,
    naturalLanguageCondition: string
  ): Promise<AlertCondition> {
    try {
      // Use AI to interpret natural language condition
      const parsedCondition = await this.parseNaturalLanguageCondition(naturalLanguageCondition);

      const alertCondition: AlertCondition = {
        id: `custom_${Date.now()}`,
        user_id: userId,
        name: parsedCondition.name,
        description: naturalLanguageCondition,
        type: 'custom_ai',
        parameters: {
          custom_logic: naturalLanguageCondition,
          ...parsedCondition.parameters
        },
        is_active: true,
        created_at: new Date(),
        trigger_count: 0
      };

      // Save to database
      const { error } = await this.supabase
        .from('alert_conditions')
        .insert([alertCondition]);

      if (error) throw error;

      logger.info('Custom alert created', {
        userId,
        condition: naturalLanguageCondition
      });

      return alertCondition;

    } catch (error) {
      logger.error('Custom alert creation error', { error, userId });
      throw new Error(`カスタムアラート作成に失敗しました: ${error.message}`);
    }
  }

  async learnFromUserFeedback(alertId: string, feedback: SmartAlert['user_feedback']): Promise<void> {
    try {
      // Update alert with feedback
      const { error } = await this.supabase
        .from('smart_alerts')
        .update({ user_feedback: feedback })
        .eq('id', alertId);

      if (error) throw error;

      // Use feedback to improve future alerts
      await this.updateAlertModel(alertId, feedback);

      logger.info('Alert feedback processed', {
        alertId,
        helpful: feedback?.helpful,
        actedUpon: feedback?.acted_upon
      });

    } catch (error) {
      logger.error('Feedback processing error', { error, alertId });
    }
  }

  // Private helper methods

  private groupConditionsByUser(conditions: AlertCondition[]): Record<string, AlertCondition[]> {
    return conditions.reduce((acc, condition) => {
      if (!acc[condition.user_id]) {
        acc[condition.user_id] = [];
      }
      acc[condition.user_id].push(condition);
      return acc;
    }, {} as Record<string, AlertCondition[]>);
  }

  private async evaluateUserConditions(
    userId: string,
    conditions: AlertCondition[],
    marketData: Record<string, any>
  ): Promise<SmartAlert[]> {
    const alerts: SmartAlert[] = [];

    for (const condition of conditions) {
      const conditionMet = this.evaluateCondition(condition, marketData);
      
      if (conditionMet) {
        const alert: SmartAlert = {
          id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          user_id: userId,
          type: this.mapConditionTypeToAlertType(condition.type),
          severity: this.determineSeverity(condition, marketData),
          title: `${condition.name} 条件が満たされました`,
          description: await this.generateAlertDescription(condition, marketData),
          conditions_met: this.getMetConditions(condition, marketData),
          metadata: {
            protocol: condition.parameters.protocol,
            asset: condition.parameters.asset,
            action_required: true,
            time_sensitivity: this.determineTimeSensitivity(condition),
            confidence: 0.8
          },
          created_at: new Date(),
          is_read: false,
          is_dismissed: false
        };

        alerts.push(alert);
      }
    }

    return alerts;
  }

  private evaluateCondition(condition: AlertCondition, marketData: Record<string, any>): boolean {
    const { parameters } = condition;
    
    switch (condition.type) {
      case 'price_movement':
        return this.evaluatePriceMovement(parameters, marketData);
      case 'apy_change':
        return this.evaluateAPYChange(parameters, marketData);
      case 'tvl_change':
        return this.evaluateTVLChange(parameters, marketData);
      case 'risk_score_change':
        return this.evaluateRiskScoreChange(parameters, marketData);
      case 'custom_ai':
        return this.evaluateCustomCondition(parameters, marketData);
      default:
        return false;
    }
  }

  private evaluatePriceMovement(parameters: any, marketData: Record<string, any>): boolean {
    const asset = parameters.asset;
    const threshold = parameters.threshold;
    const operator = parameters.operator;
    const currentPrice = marketData[`${asset}_price`];
    const previousPrice = marketData[`${asset}_previous_price`];

    if (!currentPrice || !previousPrice) return false;

    const changePercentage = ((currentPrice - previousPrice) / previousPrice) * 100;

    switch (operator) {
      case 'gt': return changePercentage > threshold;
      case 'lt': return changePercentage < threshold;
      case 'gte': return changePercentage >= threshold;
      case 'lte': return changePercentage <= threshold;
      default: return false;
    }
  }

  private evaluateAPYChange(parameters: any, marketData: Record<string, any>): boolean {
    const protocol = parameters.protocol;
    const threshold = parameters.threshold;
    const currentAPY = marketData[`${protocol}_apy`];
    const previousAPY = marketData[`${protocol}_previous_apy`];

    if (!currentAPY || !previousAPY) return false;

    const changePercentage = ((currentAPY - previousAPY) / previousAPY) * 100;
    return Math.abs(changePercentage) > threshold;
  }

  private evaluateTVLChange(parameters: any, marketData: Record<string, any>): boolean {
    const protocol = parameters.protocol;
    const threshold = parameters.threshold;
    const currentTVL = marketData[`${protocol}_tvl`];
    const previousTVL = marketData[`${protocol}_previous_tvl`];

    if (!currentTVL || !previousTVL) return false;

    const changePercentage = ((currentTVL - previousTVL) / previousTVL) * 100;
    return Math.abs(changePercentage) > threshold;
  }

  private evaluateRiskScoreChange(parameters: any, marketData: Record<string, any>): boolean {
    const protocol = parameters.protocol;
    const threshold = parameters.threshold;
    const currentRisk = marketData[`${protocol}_risk_score`];
    const previousRisk = marketData[`${protocol}_previous_risk_score`];

    if (!currentRisk || !previousRisk) return false;

    return Math.abs(currentRisk - previousRisk) > threshold;
  }

  private async evaluateCustomCondition(parameters: any, marketData: Record<string, any>): Promise<boolean> {
    try {
      const customLogic = parameters.custom_logic;
      
      // Use AI to evaluate the custom condition
      const response = await generateChatResponse({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'あなたは市場データを分析して条件が満たされているかを判定するAIです。trueまたはfalseでのみ回答してください。'
          },
          {
            role: 'user',
            content: `条件: ${customLogic}\n現在の市場データ: ${JSON.stringify(marketData, null, 2)}\n\nこの条件は満たされていますか？`
          }
        ],
        max_tokens: 10,
        temperature: 0.1
      });

      return response.content.toLowerCase().includes('true');

    } catch (error) {
      logger.error('Custom condition evaluation error', { error });
      return false;
    }
  }

  private async detectAnomalies(marketData: Record<string, any>): Promise<SmartAlert[]> {
    const alerts: SmartAlert[] = [];

    try {
      // Use AI to detect market anomalies
      const response = await generateClaudeResponse({
        model: 'claude-3-sonnet-20241022',
        system: `あなたは市場異常を検出するAI専門家です。与えられた市場データから異常なパターンや機会を特定し、JSON形式でアラートを生成してください。`,
        messages: [{
          role: 'user',
          content: `以下の市場データを分析し、異常や注目すべき機会を特定してください：\n${JSON.stringify(marketData, null, 2)}`
        }],
        max_tokens: 1000,
        temperature: 0.3
      });

      const detectedAnomalies = JSON.parse(response.content);
      
      // Convert AI detections to SmartAlert format
      for (const anomaly of detectedAnomalies.alerts || []) {
        const alert: SmartAlert = {
          id: `anomaly_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          user_id: 'system', // System-generated alert
          type: 'market_event',
          severity: anomaly.severity || 'info',
          title: anomaly.title,
          description: anomaly.description,
          conditions_met: [],
          metadata: {
            action_required: anomaly.action_required || false,
            confidence: anomaly.confidence || 0.7,
            time_sensitivity: anomaly.time_sensitivity || 'hours'
          },
          created_at: new Date(),
          is_read: false,
          is_dismissed: false
        };

        alerts.push(alert);
      }

    } catch (error) {
      logger.error('Anomaly detection error', { error });
    }

    return alerts;
  }

  private async saveAlerts(alerts: SmartAlert[]): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('smart_alerts')
        .insert(alerts);

      if (error) throw error;

      // Send notifications for critical alerts
      const criticalAlerts = alerts.filter(a => a.severity === 'critical');
      for (const alert of criticalAlerts) {
        await this.sendImmediateNotification(alert);
      }

    } catch (error) {
      logger.error('Alert saving error', { error });
    }
  }

  private async getUserPreferences(userId: string): Promise<UserPreferences | null> {
    const cached = this.userPreferencesCache.get(userId);
    if (cached && Date.now() - cached.lastUpdated.getTime() < 300000) { // 5 minutes
      return cached.preferences;
    }

    try {
      const { data, error } = await this.supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      const preferences = data || null;
      this.userPreferencesCache.set(userId, {
        preferences,
        lastUpdated: new Date()
      });

      return preferences;

    } catch (error) {
      logger.error('User preferences fetch error', { error, userId });
      return null;
    }
  }

  // Additional helper methods would be implemented here...
  // Due to length constraints, I'm showing the core structure

  private calculateRiskScore(portfolio: Portfolio, protocols: DeFiProtocol[]): number {
    // Implement risk score calculation
    return 75; // Placeholder
  }

  private calculateDiversificationScore(portfolio: Portfolio): number {
    // Implement diversification calculation
    return 80; // Placeholder
  }

  private async calculateYieldOptimizationScore(portfolio: Portfolio, protocols: DeFiProtocol[]): Promise<number> {
    // Implement yield optimization score
    return 70; // Placeholder
  }

  private calculateSecurityScore(portfolio: Portfolio, protocols: DeFiProtocol[]): number {
    // Implement security score calculation
    return 85; // Placeholder
  }

  private identifyHealthFactors(portfolio: Portfolio, protocols: DeFiProtocol[], userPrefs: any): any[] {
    // Implement health factors identification
    return [];
  }

  private async getPortfolioTrends(userId: string): Promise<any> {
    // Implement trend calculation
    return {
      score_change_24h: 2,
      score_change_7d: -1,
      score_change_30d: 5
    };
  }

  private async generateHealthAlerts(userId: string, score: PortfolioHealthScore, userPrefs: any): Promise<SmartAlert[]> {
    // Generate health-based alerts
    return [];
  }

  private findHighYieldOpportunities(protocols: DeFiProtocol[], userPrefs: any): OpportunityAlert[] {
    return protocols
      .filter(p => p.apy > 15 && p.riskScore < 60)
      .slice(0, 3)
      .map(p => ({
        protocol: p.name,
        opportunity_type: 'high_yield' as const,
        estimated_apy: p.apy,
        risk_level: p.riskScore < 30 ? 'low' as const : p.riskScore < 60 ? 'medium' as const : 'high' as const,
        time_window: 60,
        requirements: ['Minimum deposit of $100'],
        instructions: ['Connect wallet', 'Approve token', 'Deposit funds'],
        confidence: 0.8
      }));
  }

  private async findArbitrageOpportunities(portfolio: Portfolio): Promise<OpportunityAlert[]> {
    // Implement arbitrage detection
    return [];
  }

  private async findNewPoolOpportunities(userPrefs: any): Promise<OpportunityAlert[]> {
    // Implement new pool detection
    return [];
  }

  private async findLiquidationOpportunities(): Promise<OpportunityAlert[]> {
    // Implement liquidation opportunity detection
    return [];
  }

  private async findGovernanceOpportunities(portfolio: Portfolio): Promise<OpportunityAlert[]> {
    // Implement governance opportunity detection
    return [];
  }

  private async parseNaturalLanguageCondition(condition: string): Promise<any> {
    // Use AI to parse natural language conditions
    return {
      name: 'Custom Condition',
      parameters: {}
    };
  }

  private mapConditionTypeToAlertType(type: string): SmartAlert['type'] {
    return 'custom';
  }

  private determineSeverity(condition: AlertCondition, marketData: Record<string, any>): SmartAlert['severity'] {
    return 'warning';
  }

  private async generateAlertDescription(condition: AlertCondition, marketData: Record<string, any>): Promise<string> {
    return condition.description;
  }

  private getMetConditions(condition: AlertCondition, marketData: Record<string, any>): any[] {
    return [];
  }

  private determineTimeSensitivity(condition: AlertCondition): 'immediate' | 'hours' | 'days' | 'weeks' {
    return 'hours';
  }

  private async sendImmediateNotification(alert: SmartAlert): Promise<void> {
    // Implement immediate notification sending
  }

  private async updateAlertModel(alertId: string, feedback: SmartAlert['user_feedback']): Promise<void> {
    // Implement model updating based on feedback
  }
}

export const smartAlertsEngine = new SmartAlertsEngine();
export default smartAlertsEngine;