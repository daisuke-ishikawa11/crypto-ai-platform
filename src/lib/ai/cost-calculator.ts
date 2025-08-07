// AI APIコスト計算とトークン消費量管理

// モデル別のコスト設定 (USD per 1K tokens)
export const MODEL_COSTS = {
  "gpt-3.5-turbo": {
    input: 0.0015,
    output: 0.002,
  },
  "gpt-4": {
    input: 0.03,
    output: 0.06,
  },
  "claude-3-sonnet-20240229": {
    input: 0.003,
    output: 0.015,
  },
  "claude-3-haiku-20240307": {
    input: 0.00025,
    output: 0.00125,
  },
} as const

export type ModelType = keyof typeof MODEL_COSTS

// コスト計算
export function calculateCost(
  model: ModelType,
  inputTokens: number,
  outputTokens: number
): number {
  const costs = MODEL_COSTS[model]
  if (!costs) {
    throw new Error(`Unknown model: ${model}`)
  }

  const inputCost = (inputTokens / 1000) * costs.input
  const outputCost = (outputTokens / 1000) * costs.output
  
  return inputCost + outputCost
}

// トークン数の推定（簡易版）
export function estimateTokens(text: string): number {
  // 簡易推定: 1トークン ≈ 4文字
  return Math.ceil(text.length / 4)
}

// 月次コスト制限チェック
export function checkCostLimit(
  totalCost: number,
  plan: "free" | "mini" | "basic" | "standard" | "pro"
): {
  withinLimit: boolean
  limit: number | null
  percentage: number
} {
  const limits = {
    free: 0, // 無料プランはコスト制限なし（使用回数制限のみ）
    mini: 5, // $5/月
    basic: 20, // $20/月
    standard: 100, // $100/月
    pro: null, // 無制限
  }

  const limit = limits[plan]
  
  if (limit === null) {
    return {
      withinLimit: true,
      limit: null,
      percentage: 0,
    }
  }

  if (limit === 0) {
    return {
      withinLimit: true,
      limit: 0,
      percentage: 0,
    }
  }

  const percentage = (totalCost / limit) * 100
  
  return {
    withinLimit: totalCost <= limit,
    limit,
    percentage,
  }
}

// 使用統計の集計
export interface UsageStats {
  totalCost: number
  totalTokens: number
  requestCount: number
  averageCostPerRequest: number
  averageTokensPerRequest: number
  modelBreakdown: Record<string, {
    cost: number
    tokens: number
    requests: number
  }>
}

export function calculateUsageStats(
  usageRecords: Array<{
    model: string
    inputTokens: number
    outputTokens: number
    cost: number
  }>
): UsageStats {
  const stats: UsageStats = {
    totalCost: 0,
    totalTokens: 0,
    requestCount: usageRecords.length,
    averageCostPerRequest: 0,
    averageTokensPerRequest: 0,
    modelBreakdown: {},
  }

  for (const record of usageRecords) {
    const totalTokens = record.inputTokens + record.outputTokens
    
    stats.totalCost += record.cost
    stats.totalTokens += totalTokens
    
    if (!stats.modelBreakdown[record.model]) {
      stats.modelBreakdown[record.model] = {
        cost: 0,
        tokens: 0,
        requests: 0,
      }
    }
    
    stats.modelBreakdown[record.model].cost += record.cost
    stats.modelBreakdown[record.model].tokens += totalTokens
    stats.modelBreakdown[record.model].requests += 1
  }

  if (stats.requestCount > 0) {
    stats.averageCostPerRequest = stats.totalCost / stats.requestCount
    stats.averageTokensPerRequest = stats.totalTokens / stats.requestCount
  }

  return stats
}

// コスト最適化の提案
export function getOptimizationSuggestions(
  stats: UsageStats,
  plan: string
): string[] {
  const suggestions: string[] = []

  // 高コストモデルの使用が多い場合
  if (stats.modelBreakdown["gpt-4"]) {
    const gpt4Usage = stats.modelBreakdown["gpt-4"]
    const gpt4Percentage = (gpt4Usage.cost / stats.totalCost) * 100
    
    if (gpt4Percentage > 50) {
      suggestions.push(
        "GPT-4の使用頻度が高いです。簡単な質問にはGPT-3.5-turboを使用することでコストを削減できます。"
      )
    }
  }

  // 平均トークン数が多い場合
  if (stats.averageTokensPerRequest > 2000) {
    suggestions.push(
      "リクエストあたりのトークン数が多いです。質問をより簡潔にすることでコストを削減できます。"
    )
  }

  // プラン別の提案
  if (plan === "free" && stats.requestCount > 100) {
    suggestions.push(
      "使用量が多いようです。より多くのAI機能を利用するには有料プランへのアップグレードをご検討ください。"
    )
  }

  return suggestions
}