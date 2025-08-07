import { generateChatResponse } from "@/lib/ai/openai"
import { PRICE_PREDICTION_PROMPT } from "@/lib/ai/openai"

export async function getPricePrediction(
  symbol: string,
  timeframe: "1h" | "24h" | "7d" | "30d" = "24h",
  userId?: string
): Promise<{
  prediction: number
  confidence: number
  reasoning: string
  supportingData: any
}> {
  try {
    // 実際の市場データを取得（簡易実装）
    const marketData = await getMarketData(symbol, timeframe)
    
    // AI予測プロンプトを構築
    const prompt = `${PRICE_PREDICTION_PROMPT}
    
暗号通貨: ${symbol}
時間枠: ${timeframe}
現在価格: $${marketData.currentPrice.toLocaleString()}
24時間変動率: ${marketData.change24h.toFixed(2)}%
取引量: $${marketData.volume.toLocaleString()}
RSI: ${marketData.technicalIndicators.rsi.toFixed(2)}
MACD: ${marketData.technicalIndicators.macd.toFixed(4)}
移動平均: $${marketData.technicalIndicators.movingAverage.toLocaleString()}

この情報を基に、以下の形式で価格予測を提供してください：
- 予測価格: [数値]USD
- 信頼度: [0-1の数値]
- 予測理由: [詳細な説明]
- 主要な影響要因: [要因のリスト]`

    const response = await generateChatResponse({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 800,
    })
    
    // AIレスポンスをパース
    const aiPrediction = parseAIPrediction(response.content)
    
    return {
      prediction: aiPrediction.prediction,
      confidence: aiPrediction.confidence,
      reasoning: aiPrediction.reasoning,
      supportingData: {
        ...marketData,
        model: "gpt-3.5-turbo",
        tokensUsed: response.tokensUsed,
        factors: aiPrediction.factors,
        timestamp: new Date().toISOString()
      }
    }
    
  } catch (error) {
    console.error("Price prediction error:", error)
    throw new Error("Failed to generate price prediction")
  }
}

async function getMarketData(symbol: string, timeframe: string) {
  // 市場データ取得の実装
  // 実際の実装では CoinGecko API などを使用
  const basePrice = symbol === "BTC" ? 45000 : 
                   symbol === "ETH" ? 2800 : 
                   symbol === "SOL" ? 100 : 1
  
  return {
    currentPrice: basePrice + (Math.random() - 0.5) * basePrice * 0.1,
    change24h: (Math.random() - 0.5) * 20,
    volume: Math.random() * 1000000000,
    technicalIndicators: {
      rsi: 30 + Math.random() * 40, // 30-70の範囲
      macd: (Math.random() - 0.5) * 2,
      movingAverage: basePrice + (Math.random() - 0.5) * basePrice * 0.05
    }
  }
}

function parseAIPrediction(aiResponse: string) {
  // AIレスポンスから構造化データを抽出
  try {
    const predictionMatch = aiResponse.match(/予測価格[:\s]*(?:\$)?(\d+(?:,\d+)*(?:\.\d+)?)/i)
    const confidenceMatch = aiResponse.match(/信頼度[:\s]*(\d*\.?\d+)/i)
    
    return {
      prediction: predictionMatch ? parseFloat(predictionMatch[1].replace(/,/g, '')) : 45000,
      confidence: confidenceMatch ? Math.min(1, parseFloat(confidenceMatch[1])) : 0.7,
      reasoning: extractReasoning(aiResponse),
      factors: extractFactors(aiResponse)
    }
  } catch (error) {
    console.error("Failed to parse AI prediction:", error)
    return {
      prediction: 45000,
      confidence: 0.7,
      reasoning: "AI prediction parsing failed",
      factors: []
    }
  }
}

function extractReasoning(text: string): string {
  const reasoningMatch = text.match(/予測理由[:\s]*([^]*?)(?=主要な影響要因|$)/i)
  return reasoningMatch ? reasoningMatch[1].trim() : text.substring(0, 200)
}

function extractFactors(text: string): string[] {
  const factorsMatch = text.match(/主要な影響要因[:\s]*([^]*?)$/i)
  if (!factorsMatch) return []
  
  return factorsMatch[1]
    .split(/[,\n\-•]/)
    .map(f => f.trim())
    .filter(f => f.length > 0)
    .slice(0, 5)
}