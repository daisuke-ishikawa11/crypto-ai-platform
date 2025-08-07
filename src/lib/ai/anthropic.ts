import Anthropic from "@anthropic-ai/sdk"

// Anthropicクライアントの初期化
export function createAnthropicClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY
  
  if (!apiKey) {
    throw new Error("Anthropic API key is not configured")
  }
  
  return new Anthropic({
    apiKey,
  })
}

// メッセージリクエストの型定義
export interface AnthropicMessageRequest {
  model: string
  messages: Array<{
    role: "user" | "assistant"
    content: string
  }>
  system?: string
  max_tokens?: number
  temperature?: number
}

// Claude応答を生成
export async function generateClaudeResponse(
  request: AnthropicMessageRequest
): Promise<{
  content: string
  tokensUsed: number
  model: string
}> {
  const anthropic = createAnthropicClient()
  
  try {
    const message = await anthropic.messages.create({
      model: request.model,
      max_tokens: request.max_tokens ?? 1000,
      temperature: request.temperature ?? 0.7,
      system: request.system,
      messages: request.messages,
    })
    
    const content = message.content[0]?.type === 'text' 
      ? message.content[0].text 
      : ""
    
    // Anthropic APIは使用トークン数を返さないため、推定値を計算
    const estimatedTokens = Math.ceil((content.length + 
      request.messages.reduce((acc, msg) => acc + msg.content.length, 0)) / 4)
    
    return {
      content,
      tokensUsed: estimatedTokens,
      model: request.model,
    }
  } catch (error) {
    const { handleAnthropicError } = await import("@/lib/ai/error-handler")
    const aiError = handleAnthropicError(error)
    throw aiError
  }
}

// 高度な分析用のシステムプロンプト
export const ADVANCED_ANALYSIS_SYSTEM = `あなたは暗号通貨市場の高度な分析を行う専門家AIアシスタントです。
以下の原則に従って分析を提供してください：

1. データ駆動型の分析を行う
2. 複数の視点から市場を評価する
3. リスクと機会の両方を明確に示す
4. 実行可能な提案を含める
5. 不確実性がある場合は明確に述べる

ユーザーの投資経験レベルに合わせて説明を調整し、
専門用語を使用する際は必要に応じて説明を加えてください。`

// リスク評価用のシステムプロンプト
export const RISK_ASSESSMENT_SYSTEM = `あなたは暗号通貨投資のリスク管理専門家です。
以下の観点からリスク評価を行ってください：

1. 市場リスク（ボラティリティ、流動性）
2. 技術的リスク（セキュリティ、スケーラビリティ）
3. 規制リスク（法的環境の変化）
4. プロジェクト固有のリスク（開発状況、採用率）

リスクレベルを1-10のスケールで評価し、
各リスクに対する具体的な対策を提案してください。`

// 教育コンテンツ生成用のシステムプロンプト
export const EDUCATIONAL_CONTENT_SYSTEM = `あなたは暗号通貨教育の専門家です。
ユーザーの知識レベルに応じて、以下の形式で教育コンテンツを提供してください：

1. 概念の明確な説明
2. 実例を用いた解説
3. 重要なポイントの要約
4. さらなる学習のための推奨リソース

技術的な概念を分かりやすく説明し、
実践的な知識として活用できるようにしてください。` 