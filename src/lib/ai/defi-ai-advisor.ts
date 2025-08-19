// 🧠 DeFi AI Advisor Service
// Specialized AI advisor for DeFi investment decisions and protocol analysis

import { createOpenAIClient, generateChatResponse } from './openai';
import { createAnthropicClient, generateClaudeResponse } from './anthropic';
import { logger } from '@/lib/monitoring/logger';
import type { Portfolio, UserPreferences } from './types/ai-service-types';

export interface DeFiProtocol {
  id: string;
  name: string;
  category: 'lending' | 'dex' | 'yield_farming' | 'derivatives' | 'insurance' | 'bridge';
  tvl: number;
  apy: number;
  riskScore: number;
  chain: string;
  address?: string;
}

export interface DeFiQuery {
  userId: string;
  message: string;
  context?: {
    portfolio?: Portfolio;
    preferences?: UserPreferences;
    protocols?: DeFiProtocol[];
    marketConditions?: {
      gasPrice?: number;
      networkCongestion?: 'low' | 'medium' | 'high';
      marketSentiment?: 'bullish' | 'bearish' | 'neutral';
    };
  };
  conversationHistory?: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }>;
}

export interface DeFiAdvice {
  response: string;
  confidence: number;
  riskLevel: 'low' | 'medium' | 'high';
  actionable_insights: Array<{
    action: string;
    protocol?: string;
    reasoning: string;
    priority: number;
    estimated_returns?: number;
    risks?: string[];
  }>;
  protocols_mentioned: string[];
  follow_up_questions: string[];
  disclaimer: string;
}

export interface ProtocolAnalysis {
  protocol: DeFiProtocol;
  analysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  risk_assessment: {
    smart_contract_risk: number;
    liquidity_risk: number;
    impermanent_loss_risk: number;
    regulatory_risk: number;
    overall_score: number;
  };
  yield_breakdown: {
    base_apy: number;
    reward_tokens: Array<{
      token: string;
      apy: number;
      volatility: number;
    }>;
    fees: number;
    net_apy: number;
  };
  recommendations: {
    suitable_for: string[];
    min_investment: number;
    optimal_allocation: number;
    exit_strategy: string;
  };
}

class DeFiAIAdvisor {
  private openai = createOpenAIClient();
  private anthropic = createAnthropicClient();

  async processQuery(query: DeFiQuery): Promise<DeFiAdvice> {
    try {
      const systemPrompt = this.buildSystemPrompt(query);
      const userPrompt = this.buildUserPrompt(query);

      // Use Claude for complex analysis, GPT for quick responses
      const useAnthropic = query.message.length > 200 || 
        query.context?.portfolio || 
        query.message.toLowerCase().includes('analyze');

      let response: { content: string; tokensUsed: number };

      if (useAnthropic) {
        response = await generateClaudeResponse({
          model: 'claude-3-sonnet-20241022',
          system: systemPrompt,
          messages: [
            ...this.formatConversationHistory(query.conversationHistory || []),
            { role: 'user', content: userPrompt }
          ],
          max_tokens: 2000,
          temperature: 0.3
        });
      } else {
        response = await generateChatResponse({
          model: 'gpt-4-turbo-preview',
          messages: [
            { role: 'system', content: systemPrompt },
            ...this.formatConversationHistory(query.conversationHistory || []),
            { role: 'user', content: userPrompt }
          ],
          max_tokens: 1500,
          temperature: 0.3
        });
      }

      const advice = this.parseResponse(response.content);

      // Log for analytics and improvement
      logger.info('DeFi AI query processed', {
        userId: query.userId,
        queryLength: query.message.length,
        tokensUsed: response.tokensUsed,
        confidence: advice.confidence
      });

      return advice;

    } catch (error) {
      logger.error('DeFi AI advisor error', { error, userId: query.userId });
      
      return {
        response: "申し訳ございませんが、現在AIアドバイザーに技術的な問題が発生しています。後ほどお試しください。",
        confidence: 0,
        riskLevel: 'high',
        actionable_insights: [],
        protocols_mentioned: [],
        follow_up_questions: [],
        disclaimer: "この情報は教育目的のみです。投資決定前に必ず専門家にご相談ください。"
      };
    }
  }

  async analyzeProtocol(protocol: DeFiProtocol, userContext?: {
    portfolio?: Portfolio;
    preferences?: UserPreferences;
  }): Promise<ProtocolAnalysis> {
    try {
      const prompt = this.buildProtocolAnalysisPrompt(protocol, userContext);

      const response = await generateClaudeResponse({
        model: 'claude-3-sonnet-20241022',
        system: `あなたはDeFiプロトコルの専門分析家です。スマートコントラクト監査、収益構造、リスク評価の経験が豊富です。
        以下のJSON形式で構造化された分析を提供してください：
        {
          "analysis": { "strengths": [], "weaknesses": [], "opportunities": [], "threats": [] },
          "risk_assessment": { "smart_contract_risk": 0-100, "liquidity_risk": 0-100, "impermanent_loss_risk": 0-100, "regulatory_risk": 0-100, "overall_score": 0-100 },
          "yield_breakdown": { "base_apy": 0, "reward_tokens": [], "fees": 0, "net_apy": 0 },
          "recommendations": { "suitable_for": [], "min_investment": 0, "optimal_allocation": 0, "exit_strategy": "" }
        }`,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2000,
        temperature: 0.2
      });

      const analysisData = JSON.parse(response.content) as Omit<ProtocolAnalysis, 'protocol'>;

      return {
        protocol,
        ...analysisData
      };

    } catch (error) {
      logger.error('Protocol analysis error', { error: error instanceof Error ? error.message : String(error), protocol: protocol.name });
      throw new Error(`プロトコル分析に失敗しました: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async optimizeYieldStrategy(
    portfolio: Portfolio,
    preferences: UserPreferences,
    availableProtocols: DeFiProtocol[]
  ): Promise<{
    strategy: string;
    allocations: Array<{
      protocol: string;
      allocation: number;
      expectedApy: number;
      risk: number;
    }>;
    totalExpectedReturn: number;
    riskScore: number;
    rebalanceFrequency: string;
  }> {
    try {
      const prompt = this.buildYieldOptimizationPrompt(portfolio, preferences, availableProtocols);

      const response = await generateClaudeResponse({
        model: 'claude-3-sonnet-20241022',
        system: `あなたはDeFi収益最適化の専門家です。現代ポートフォリオ理論とDeFi特有のリスク要因を組み合わせて最適な戦略を提案してください。`,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1500,
        temperature: 0.2
      });

      return JSON.parse(response.content);

    } catch (error) {
      logger.error('Yield optimization error', { error: error instanceof Error ? error.message : String(error) });
      throw new Error(`収益最適化に失敗しました: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private buildSystemPrompt(query: DeFiQuery): string {
    const basePrompt = `あなたは経験豊富なDeFi投資アドバイザーです。以下の専門知識を持っています：

- スマートコントラクト分析とリスク評価
- 利回り農業とステーキング戦略
- DEXの流動性提供とインパーマネントロス
- レンディングプロトコルの運用
- クロスチェーンDeFi戦略
- ガス最適化とトランザクション戦略

重要な原則：
1. 常にリスクを最初に説明する
2. 具体的で実行可能なアドバイスを提供
3. 不確実性がある場合は明確に述べる
4. 規制リスクと税務への影響を考慮
5. 詐欺プロジェクトやラグプルの可能性を警告
6. 投資額は失っても良い範囲内に限定することを強調

回答は以下の構造で提供してください：
- 直接的な回答
- リスク評価（低/中/高）
- 具体的な行動指針
- 関連プロトコルの言及
- フォローアップの質問提案
- 必須免責事項`;

    if (query.context?.preferences) {
      const { riskTolerance, investmentHorizon } = query.context.preferences;
      return `${basePrompt}\n\nユーザープロファイル：
- リスク許容度: ${riskTolerance}
- 投資期間: ${investmentHorizon}`;
    }

    return basePrompt;
  }

  private buildUserPrompt(query: DeFiQuery): string {
    let prompt = `質問: ${query.message}`;

    if (query.context?.portfolio) {
      const portfolio = query.context.portfolio;
      prompt += `\n\n現在のポートフォリオ:
総資産価値: $${portfolio.totalValue.toLocaleString()}
保有資産:
${portfolio.assets.map(asset => 
  `- ${asset.symbol}: ${asset.amount} ($${asset.value.toLocaleString()}, ${asset.allocation.toFixed(1)}%)`
).join('\n')}`;
    }

    if (query.context?.protocols) {
      prompt += `\n\n検討中のプロトコル:
${query.context.protocols.map(p => 
  `- ${p.name} (${p.category}): TVL $${(p.tvl/1000000).toFixed(1)}M, APY ${p.apy.toFixed(2)}%, Risk ${p.riskScore}/100`
).join('\n')}`;
    }

    if (query.context?.marketConditions) {
      const conditions = query.context.marketConditions;
      prompt += `\n\n現在の市場状況:
- ガス価格: ${conditions.gasPrice || 'N/A'} gwei
- ネットワーク混雑度: ${conditions.networkCongestion || 'unknown'}
- 市場センチメント: ${conditions.marketSentiment || 'neutral'}`;
    }

    return prompt;
  }

  private buildProtocolAnalysisPrompt(protocol: DeFiProtocol, userContext?: { portfolio?: Portfolio; preferences?: UserPreferences } | undefined): string {
    return `以下のDeFiプロトコルの詳細分析を行ってください：

プロトコル情報:
- 名前: ${protocol.name}
- カテゴリ: ${protocol.category}
- TVL: $${(protocol.tvl/1000000).toFixed(1)}M
- 表示APY: ${protocol.apy.toFixed(2)}%
- チェーン: ${protocol.chain}
- リスクスコア: ${protocol.riskScore}/100

分析項目:
1. SWOT分析（強み、弱み、機会、脅威）
2. リスク評価（スマートコントラクト、流動性、IL、規制）
3. 収益構造の詳細分析
4. 投資推奨事項

    ${userContext && userContext.portfolio ? `
ユーザーのポートフォリオ状況も考慮してパーソナライズした分析を含めてください。
` : ''}`;
  }

  private buildYieldOptimizationPrompt(
    portfolio: Portfolio,
    preferences: UserPreferences,
    protocols: DeFiProtocol[]
  ): string {
    return `以下の条件で最適なDeFi収益戦略を提案してください：

ポートフォリオ:
総価値: $${portfolio.totalValue.toLocaleString()}
${portfolio.assets.map(a => `- ${a.symbol}: $${a.value.toLocaleString()}`).join('\n')}

投資家プロファイル:
- リスク許容度: ${preferences.riskTolerance}
- 投資期間: ${preferences.investmentHorizon}

利用可能プロトコル:
${protocols.map(p => 
  `- ${p.name}: ${p.apy.toFixed(2)}% APY, Risk ${p.riskScore}/100, TVL $${(p.tvl/1000000).toFixed(1)}M`
).join('\n')}

以下のJSON形式で戦略を提案してください：
{
  "strategy": "戦略の説明",
  "allocations": [{"protocol": "プロトコル名", "allocation": %, "expectedApy": %, "risk": 0-100}],
  "totalExpectedReturn": %,
  "riskScore": 0-100,
  "rebalanceFrequency": "頻度"
}`;
  }

  private formatConversationHistory(history: Array<{role: 'user' | 'assistant'; content: string; timestamp: Date}>): Array<{role: 'user' | 'assistant'; content: string}> {
    return history.slice(-5).map(msg => ({ role: msg.role, content: msg.content }));
  }

  private parseResponse(response: string): DeFiAdvice {
    try {
      // Try to extract structured data from response
      const lines = response.split('\n');
      const protocols: string[] = [];
      const insights: Array<{action: string; protocol?: string; reasoning: string; priority: number}> = [];
      const followUps: string[] = [];

      // Extract protocol mentions
      const protocolRegex = /(?:^|\s)(Uniswap|Aave|Compound|MakerDAO|Curve|Balancer|SushiSwap|PancakeSwap|Yearn|Convex)/gi;
      const matches = response.match(protocolRegex);
      if (matches) {
        protocols.push(...[...new Set(matches.map(m => m.trim()))]);
      }

      // Determine risk level
      let riskLevel: 'low' | 'medium' | 'high' = 'medium';
      if (response.toLowerCase().includes('高リスク') || response.toLowerCase().includes('危険')) {
        riskLevel = 'high';
      } else if (response.toLowerCase().includes('低リスク') || response.toLowerCase().includes('安全')) {
        riskLevel = 'low';
      }

      // Calculate confidence based on response quality
      const confidence = Math.min(95, Math.max(60, 
        response.length / 20 + 
        protocols.length * 5 + 
        (response.includes('%') ? 10 : 0) +
        (response.includes('$') ? 5 : 0)
      )) / 100;

      return {
        response: response,
        confidence,
        riskLevel,
        actionable_insights: insights,
        protocols_mentioned: protocols,
        follow_up_questions: followUps,
        disclaimer: "本情報は教育目的のみであり、金融アドバイスではありません。投資決定前に必ず独自の調査を行い、専門家にご相談ください。DeFi投資には高いリスクが伴い、資金を失う可能性があります。"
      };

    } catch (error) {
      logger.error('Response parsing error', { error });
      return {
        response,
        confidence: 0.6,
        riskLevel: 'medium',
        actionable_insights: [],
        protocols_mentioned: [],
        follow_up_questions: [],
        disclaimer: "本情報は教育目的のみであり、金融アドバイスではありません。投資決定前に必ず独自の調査を行い、専門家にご相談ください。"
      };
    }
  }
}

export const defiAIAdvisor = new DeFiAIAdvisor();
export default defiAIAdvisor;
