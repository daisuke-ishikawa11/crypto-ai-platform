import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { checkUsageLimit, recordUsage } from "@/lib/ai/usage-limiter"
import { getPricePrediction } from "@/lib/ai/price-prediction"

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
    
    // リクエストボディを解析
    const body = await request.json()
    const { symbol, timeframe = "24h" } = body
    
    if (!symbol) {
      return NextResponse.json(
        { error: "Symbol is required" },
        { status: 400 }
      )
    }
    
    // 使用制限チェック
    const usageCheck = await checkUsageLimit(user.id, "ai_predictions")
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
    
    // 価格予測を生成
    const prediction = await getPricePrediction(symbol, timeframe, user.id)
    
    // 予測結果をデータベースに保存
    const { error: saveError } = await supabase
      .from("ai_predictions")
      .insert({
        user_id: user.id,
        symbol,
        timeframe,
        predicted_price: prediction.prediction,
        confidence: prediction.confidence,
        reasoning: prediction.reasoning,
        supporting_data: prediction.supportingData,
        model: prediction.supportingData.model,
        tokens_used: prediction.supportingData.tokensUsed,
      })
      
    if (saveError) {
      console.error("Failed to save prediction:", saveError)
      // 保存エラーでも予測結果は返す
    }
    
    // コスト計算
    const { calculateCost, estimateTokens } = await import("@/lib/ai/cost-calculator")
    const estimatedInputTokens = estimateTokens(`${symbol} ${timeframe} price prediction`)
    const cost = calculateCost(
      "gpt-3.5-turbo",
      estimatedInputTokens,
      prediction.supportingData.tokensUsed
    )
    
    // 使用量を記録（コスト情報を含む）
    await recordUsage(user.id, "ai_predictions", prediction.supportingData.tokensUsed, cost, "gpt-3.5-turbo")
    
    // 残り使用可能回数を取得
    const updatedUsage = await checkUsageLimit(user.id, "ai_predictions")
    
    return NextResponse.json({
      prediction: prediction.prediction,
      confidence: prediction.confidence,
      reasoning: prediction.reasoning,
      supportingData: prediction.supportingData,
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
      const fallback = createFallbackResponse("prediction", error)
      
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
    console.error("Unexpected AI prediction error:", error)
    return NextResponse.json(
      { error: "予期しないエラーが発生しました。しばらくしてから再度お試しください。" },
      { status: 500 }
    )
  }
}

// 予測履歴を取得
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
    const symbol = searchParams.get("symbol")
    const limit = parseInt(searchParams.get("limit") || "10")
    
    let query = supabase
      .from("ai_predictions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(limit)
    
    if (symbol) {
      query = query.eq("symbol", symbol)
    }
    
    const { data: predictions, error } = await query
    
    if (error) {
      throw error
    }
    
    return NextResponse.json({ predictions })
    
  } catch (error) {
    console.error("Failed to fetch predictions:", error)
    return NextResponse.json(
      { error: "Failed to fetch prediction history" },
      { status: 500 }
    )
  }
}