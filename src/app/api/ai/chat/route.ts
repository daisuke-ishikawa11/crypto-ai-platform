// 💬 AI チャットAPI
// リアルタイム投資相談・Gemini/VoltAgent統合・コンテキスト連携

import { NextResponse } from 'next/server';
import { UnifiedAIService } from '@/lib/ai/unified-ai-service';
import { generateChatResponse } from "@/lib/ai/openai"
import { generateClaudeResponse } from "@/lib/ai/anthropic"
import { checkUsageLimit, recordUsage } from "@/lib/ai/usage-limiter"
import { logger } from '@/lib/monitoring/logger';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';
import type { Portfolio } from '@/lib/ai/types/ai-service-types';

// バリデーションスキーマ
const chatRequestSchema = z.object({
  message: z.string().min(1).max(2000),
  model: z.enum(['gpt-3.5-turbo', 'gpt-4', 'claude-3-sonnet', 'gemini-unified']).default('gemini-unified'),
  chatId: z.string().optional(),
  systemPrompt: z.string().optional(),
  context: z.object({
    includePortfolio: z.boolean().default(true),
    includeMarketData: z.boolean().default(true),
    includeAlerts: z.boolean().default(false),
    language: z.enum(['ja', 'en']).default('ja')
  }).optional(),
  maxTokens: z.number().min(100).max(4000).default(1000),
  temperature: z.number().min(0).max(1).default(0.7)
});

const aiService = new UnifiedAIService();

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    
    // 認証チェック
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    // リクエストボディを解析・バリデーション
    const body = await request.json()
    const validatedData = chatRequestSchema.parse(body)
    const { 
      message, 
      model,
      chatId,
      systemPrompt,
      context,
      maxTokens,
      temperature
    } = validatedData
    
    // 使用制限チェック
    const usageCheck = await checkUsageLimit(user.id, "ai_chats")
    if (!usageCheck.allowed) {
      return NextResponse.json(
        { 
          error: "Usage limit exceeded",
          dailyUsed: usageCheck.dailyUsed,
          dailyLimit: usageCheck.dailyLimit,
          monthlyUsed: usageCheck.monthlyUsed,
          monthlyLimit: usageCheck.monthlyLimit,
          plan: usageCheck.plan,
        },
        { status: 429 }
      )
    }
    
    // チャットIDがない場合は新規作成
    let currentChatId = chatId
    if (!currentChatId) {
      const { data: newChat, error: chatError } = await supabase
        .from("ai_chats")
        .insert({
          user_id: user.id,
          title: message.substring(0, 50) + "...",
          model: model,
        })
        .select()
        .single()
        
      if (chatError || !newChat) {
        throw new Error("Failed to create chat")
      }
      
      currentChatId = newChat.id
    }
    
    // ユーザーメッセージを保存
    const { error: userMessageError } = await supabase
      .from("ai_messages")
      .insert({
        chat_id: currentChatId,
        role: "user",
        content: message,
      })
      
    if (userMessageError) {
      throw new Error("Failed to save user message")
    }
    
    // 過去のメッセージを取得（コンテキスト用）
    const { data: previousMessages } = await supabase
      .from("ai_messages")
      .select("role, content")
      .eq("chat_id", currentChatId)
      .order("created_at", { ascending: true })
      .limit(10) // 最新10件のメッセージ
    
    // AI応答を生成
    let aiResponse
    let tokensUsed = 0
    
    if (model === "gemini-unified") {
      // 統合AIサービス（Gemini + VoltAgent）
      
      // コンテキストデータを準備
      const contextData: {
        previousMessages: Array<{ role: 'user' | 'assistant'; content: string; timestamp: string }>;
        portfolio?: Portfolio | null;
        marketData?: Record<string, unknown>;
        activeAlerts?: Array<Record<string, unknown>>;
      } = {
        previousMessages: (previousMessages || []).map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
          timestamp: new Date().toISOString()
        }))
      };
      
      if (context?.includePortfolio) {
        const userPortfolio = await getUserPortfolio(user.id, supabase);
        if (userPortfolio) {
          contextData.portfolio = userPortfolio;
        }
      }
      
      if (context?.includeMarketData) {
        contextData.marketData = await getLatestMarketData(supabase);
      }

      if (context?.includeAlerts) {
        contextData.activeAlerts = await getUserActiveAlerts(user.id, supabase);
      }

      const chatResult = await aiService.performChatAnalysis({
        userId: user.id,
        query: message,
        context: contextData,
        maxTokens: maxTokens
      });

      aiResponse = {
        content: chatResult.response,
        model: 'gemini-unified',
        tokensUsed: Math.ceil(chatResult.response.length / 4) // 概算
      };
      
      tokensUsed = aiResponse.tokensUsed;
      
    } else if (model.startsWith("gpt")) {
      // OpenAI モデル
      const messages = [
        ...(systemPrompt ? [{ role: "system" as const, content: systemPrompt }] : []),
        ...(previousMessages || []).map(msg => ({
          role: msg.role as "user" | "assistant" | "system",
          content: msg.content,
        })),
      ]
      
      aiResponse = await generateChatResponse({
        model,
        messages,
        temperature: temperature,
        max_tokens: maxTokens,
      })
      
      tokensUsed = aiResponse.tokensUsed
    } else if (model.startsWith("claude")) {
      // Anthropic Claude モデル
      const messages = (previousMessages || [])
        .filter(msg => msg.role !== "system")
        .map(msg => ({
          role: msg.role as "user" | "assistant",
          content: msg.content,
        }))
      
      aiResponse = await generateClaudeResponse({
        model,
        messages,
        ...(systemPrompt && { system: systemPrompt }),
        temperature: temperature,
        max_tokens: maxTokens,
      })
      
      tokensUsed = aiResponse.tokensUsed
    } else {
      return NextResponse.json(
        { error: "Unsupported model" },
        { status: 400 }
      )
    }
    
    // AI応答をデータベースに保存
    const { error: aiMessageError } = await supabase
      .from("ai_messages")
      .insert({
        chat_id: currentChatId,
        role: "assistant",
        content: aiResponse.content,
        tokens_used: tokensUsed,
      })
      
    if (aiMessageError) {
      throw new Error("Failed to save AI response")
    }
    
    // コスト計算
    const { calculateCost, estimateTokens } = await import("@/lib/ai/cost-calculator")
    const estimatedInputTokens = estimateTokens(
      (previousMessages || []).map(m => m.content).join(" ") + (systemPrompt || "")
    )
    const cost = calculateCost(
      aiResponse.model as "gpt-3.5-turbo" | "gpt-4",
      estimatedInputTokens,
      tokensUsed
    )
    
    // 使用量を記録（コスト情報を含む）
    await recordUsage(user.id, "ai_chats", tokensUsed, cost, aiResponse.model)
    
    // 残り使用可能回数を取得
    const updatedUsage = await checkUsageLimit(user.id, "ai_chats")
    
    return NextResponse.json({
      chatId: currentChatId,
      message: aiResponse.content,
      model: aiResponse.model,
      tokensUsed,
      usage: {
        dailyUsed: updatedUsage.dailyUsed,
        dailyLimit: updatedUsage.dailyLimit,
        monthlyUsed: updatedUsage.monthlyUsed,
        monthlyLimit: updatedUsage.monthlyLimit,
      },
    })
    
  } catch (error) {
    const { AIError, getUserFriendlyMessage, createFallbackResponse } = await import("@/lib/ai/error-handler")
    
    if (error instanceof AIError) {
      const userMessage = getUserFriendlyMessage(error)
      const fallback = createFallbackResponse("chat", error)
      
      const statusCode = error.type === "API_KEY_MISSING" || error.type === "API_KEY_INVALID" ? 503 :
                        error.type === "RATE_LIMIT_EXCEEDED" ? 429 :
                        error.type === "USAGE_LIMIT_EXCEEDED" ? 429 :
                        error.type === "INVALID_REQUEST" ? 400 : 500
      
      return NextResponse.json(
        { 
          error: userMessage,
          fallback: fallback.fallback,
          errorType: error.type,
          retryable: error.retryable
        },
        { status: statusCode }
      )
    }
    
    // 予期しないエラー
    console.error("Unexpected AI chat error:", error)
    return NextResponse.json(
      { error: "予期しないエラーが発生しました。しばらくしてから再度お試しください。" },
      { status: 500 }
    )
  }
}

// チャット履歴を取得
export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    
    // 認証チェック
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    // URLパラメータを取得
    const { searchParams } = new URL(request.url)
    const chatId = searchParams.get("chatId")
    
    if (chatId) {
      // 特定のチャットのメッセージを取得
      const { data: messages, error } = await supabase
        .from("ai_messages")
        .select("*")
        .eq("chat_id", chatId)
        .order("created_at", { ascending: true })
        
      if (error) {
        throw error
      }
      
      // チャットがユーザーのものか確認
      const { data: chat } = await supabase
        .from("ai_chats")
        .select("user_id")
        .eq("id", chatId)
        .single()
        
      if (!chat || chat.user_id !== user.id) {
        return NextResponse.json(
          { error: "Chat not found" },
          { status: 404 }
        )
      }
      
      return NextResponse.json({ messages })
    } else {
      // ユーザーの全チャットを取得
      const { data: chats, error } = await supabase
        .from("ai_chats")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(20)
        
      if (error) {
        throw error
      }
      
      return NextResponse.json({ chats })
    }
    
  } catch (error) {
    console.error("Failed to fetch chat history:", error)
    return NextResponse.json(
      { error: "Failed to fetch chat history" },
      { status: 500 }
    )
  }
}

/**
 * ヘルパー関数群
 */

/**
 * ユーザーポートフォリオ取得
 */
async function getUserPortfolio(userId: string, supabase: Awaited<ReturnType<typeof createClient>>): Promise<Portfolio | null> {
  try {
    const { data: portfolio } = await supabase
      .from('user_portfolios')
      .select(`
        *,
        portfolio_assets (
          symbol,
          amount,
          current_price,
          current_value,
          change_percent_24h
        )
      `)
      .eq('user_id', userId)
      .single();

    if (!portfolio) return null;

    return {
      totalValue: portfolio.total_value,
      assets: portfolio.portfolio_assets.map((asset: {
        symbol: string;
        amount: number;
        current_price: number;
        current_value: number;
      }) => ({
        symbol: asset.symbol,
        amount: asset.amount,
        currentPrice: asset.current_price,
        value: asset.current_value,
        allocation: (asset.current_value / portfolio.total_value) * 100
      }))
    };

  } catch (error) {
    logger.error('Failed to get user portfolio', { 
      userId, 
      error: error instanceof Error ? error.message : String(error) 
    });
    return null;
  }
}

/**
 * 最新市場データ取得
 */
async function getLatestMarketData(supabase: Awaited<ReturnType<typeof createClient>>) {
  try {
    const { data: marketData } = await supabase
      .from('market_data')
      .select('symbol, price_usd, volume_24h, price_change_percent_24h, fear_greed_index')
      .order('recorded_at', { ascending: false })
      .limit(20);

    if (!marketData) return {};

    return {
      prices: marketData.reduce((acc: Record<string, number>, item: {
        symbol: string;
        price_usd: number;
        volume_24h: number;
        price_change_percent_24h: number;
      }) => ({
        ...acc,
        [item.symbol]: item.price_usd
      }), {}),
      volumes: marketData.reduce((acc: Record<string, number>, item: {
        symbol: string;
        price_usd: number;
        volume_24h: number;
        price_change_percent_24h: number;
      }) => ({
        ...acc,
        [item.symbol]: item.volume_24h
      }), {}),
      priceChanges: marketData.reduce((acc: Record<string, number>, item: {
        symbol: string;
        price_usd: number;
        volume_24h: number;
        price_change_percent_24h: number;
      }) => ({
        ...acc,
        [item.symbol]: item.price_change_percent_24h
      }), {}),
      fearGreedIndex: marketData[0]?.fear_greed_index
    };

  } catch (error) {
    logger.error('Failed to get market data', { 
      error: error instanceof Error ? error.message : String(error) 
    });
    return {};
  }
}

/**
 * ユーザーアクティブアラート取得
 */
async function getUserActiveAlerts(userId: string, supabase: Awaited<ReturnType<typeof createClient>>) {
  try {
    const { data: alerts } = await supabase
      .from('alert_conditions')
      .select('id, alert_type, symbol, conditions, created_at')
      .eq('user_id', userId)
      .eq('status', 'active')
      .limit(10);

    return alerts || [];

  } catch (error) {
    logger.error('Failed to get user active alerts', { 
      userId, 
      error: error instanceof Error ? error.message : String(error) 
    });
    return [];
  }
} 