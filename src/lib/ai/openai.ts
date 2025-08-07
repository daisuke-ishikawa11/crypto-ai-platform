import OpenAI from "openai"

// OpenAIクライアントの初期化
export function createOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY
  
  if (!apiKey) {
    throw new Error("OpenAI API key is not configured")
  }
  
  return new OpenAI({
    apiKey,
  })
}

// チャット完了リクエストの型定義
export interface ChatCompletionRequest {
  model: string
  messages: Array<{
    role: "user" | "assistant" | "system"
    content: string
  }>
  temperature?: number
  max_tokens?: number
}

// チャット応答を生成
export async function generateChatResponse(
  request: ChatCompletionRequest
): Promise<{
  content: string
  tokensUsed: number
  model: string
}> {
  const openai = createOpenAIClient()
  
  try {
    const completion = await openai.chat.completions.create({
      model: request.model,
      messages: request.messages,
      temperature: request.temperature ?? 0.7,
      max_tokens: request.max_tokens ?? 1000,
    })
    
    const response = completion.choices[0]?.message?.content || ""
    const tokensUsed = completion.usage?.total_tokens || 0
    
    return {
      content: response,
      tokensUsed,
      model: request.model,
    }
  } catch (error) {
    const { handleOpenAIError } = await import("@/lib/ai/error-handler")
    const aiError = handleOpenAIError(error)
    throw aiError
  }
}

// 市場分析用のプロンプトテンプレート
export const MARKET_ANALYSIS_PROMPT = `あなたは暗号通貨市場の専門アナリストです。
最新の市場データと技術的指標を分析し、実用的なインサイトを提供してください。
分析には以下を含めてください：
- 現在の市場トレンド
- 主要な支持線と抵抗線
- 推奨される取引戦略
- リスク評価`

// 価格予測用のプロンプトテンプレート
export const PRICE_PREDICTION_PROMPT = `あなたは機械学習を活用した暗号通貨価格予測の専門家です。
過去のデータパターンと市場指標を分析し、価格予測を提供してください。
予測には以下を含めてください：
- 短期予測（24時間、7日間）
- 中期予測（30日間）
- 予測の信頼度
- 主要な影響要因`

// ポートフォリオ最適化用のプロンプトテンプレート
export const PORTFOLIO_OPTIMIZATION_PROMPT = `あなたは投資ポートフォリオ最適化の専門家です。
ユーザーのリスク許容度と投資目標に基づいて、最適な資産配分を提案してください。
提案には以下を含めてください：
- 推奨される資産配分
- リスク分散戦略
- リバランスのタイミング
- 期待リターンとリスク評価` 