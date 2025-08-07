import { createLogger } from "@/lib/monitoring/logger"

const logger = createLogger("ai-error-handler")

export enum AIErrorType {
  API_KEY_MISSING = "API_KEY_MISSING",
  API_KEY_INVALID = "API_KEY_INVALID",
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
  USAGE_LIMIT_EXCEEDED = "USAGE_LIMIT_EXCEEDED",
  INVALID_REQUEST = "INVALID_REQUEST",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
  NETWORK_ERROR = "NETWORK_ERROR",
  TIMEOUT = "TIMEOUT",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

export class AIError extends Error {
  constructor(
    public type: AIErrorType,
    public message: string,
    public originalError?: Error,
    public retryable: boolean = false
  ) {
    super(message)
    this.name = "AIError"
  }
}

export function handleOpenAIError(error: any): AIError {
  // OpenAI API エラーハンドリング
  if (error?.response?.status) {
    const status = error.response.status
    const errorData = error.response.data?.error || {}
    
    switch (status) {
      case 401:
        return new AIError(
          AIErrorType.API_KEY_INVALID,
          "OpenAI API key is invalid or expired",
          error,
          false
        )
      case 429:
        return new AIError(
          AIErrorType.RATE_LIMIT_EXCEEDED,
          "OpenAI API rate limit exceeded",
          error,
          true
        )
      case 400:
        return new AIError(
          AIErrorType.INVALID_REQUEST,
          errorData.message || "Invalid request to OpenAI API",
          error,
          false
        )
      case 503:
      case 502:
        return new AIError(
          AIErrorType.SERVICE_UNAVAILABLE,
          "OpenAI API is temporarily unavailable",
          error,
          true
        )
      default:
        return new AIError(
          AIErrorType.UNKNOWN_ERROR,
          `OpenAI API error: ${errorData.message || "Unknown error"}`,
          error,
          false
        )
    }
  }

  // ネットワークエラー
  if (error?.code === "ECONNREFUSED" || error?.code === "ENOTFOUND") {
    return new AIError(
      AIErrorType.NETWORK_ERROR,
      "Network error connecting to OpenAI API",
      error,
      true
    )
  }

  // タイムアウト
  if (error?.code === "ETIMEDOUT") {
    return new AIError(
      AIErrorType.TIMEOUT,
      "Request to OpenAI API timed out",
      error,
      true
    )
  }

  // APIキーが見つからない
  if (error?.message?.includes("API key")) {
    return new AIError(
      AIErrorType.API_KEY_MISSING,
      "OpenAI API key is not configured",
      error,
      false
    )
  }

  return new AIError(
    AIErrorType.UNKNOWN_ERROR,
    error?.message || "Unknown OpenAI error",
    error,
    false
  )
}

export function handleAnthropicError(error: any): AIError {
  // Anthropic API エラーハンドリング
  if (error?.response?.status) {
    const status = error.response.status
    const errorData = error.response.data?.error || {}
    
    switch (status) {
      case 401:
        return new AIError(
          AIErrorType.API_KEY_INVALID,
          "Anthropic API key is invalid or expired",
          error,
          false
        )
      case 429:
        return new AIError(
          AIErrorType.RATE_LIMIT_EXCEEDED,
          "Anthropic API rate limit exceeded",
          error,
          true
        )
      case 400:
        return new AIError(
          AIErrorType.INVALID_REQUEST,
          errorData.message || "Invalid request to Anthropic API",
          error,
          false
        )
      case 503:
      case 502:
        return new AIError(
          AIErrorType.SERVICE_UNAVAILABLE,
          "Anthropic API is temporarily unavailable",
          error,
          true
        )
      default:
        return new AIError(
          AIErrorType.UNKNOWN_ERROR,
          `Anthropic API error: ${errorData.message || "Unknown error"}`,
          error,
          false
        )
    }
  }

  // APIキーが見つからない
  if (error?.message?.includes("API key")) {
    return new AIError(
      AIErrorType.API_KEY_MISSING,
      "Anthropic API key is not configured",
      error,
      false
    )
  }

  return new AIError(
    AIErrorType.UNKNOWN_ERROR,
    error?.message || "Unknown Anthropic error",
    error,
    false
  )
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      
      // AIErrorの場合、リトライ可能かチェック
      if (error instanceof AIError && !error.retryable) {
        throw error
      }
      
      // 最後の試行の場合は例外を投げる
      if (attempt === maxRetries) {
        break
      }
      
      // 指数バックオフで待機
      const delay = baseDelay * Math.pow(2, attempt)
      await new Promise(resolve => setTimeout(resolve, delay))
      
      logger.warn(`Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms`, {
        error: error instanceof Error ? error.message : String(error),
        attempt: attempt + 1,
        maxRetries,
        delay
      })
    }
  }

  throw lastError
}

export function createFallbackResponse(
  feature: string,
  error: AIError
): {
  success: false
  error: string
  fallback?: any
} {
  let fallbackMessage = ""
  let fallback: any = null

  switch (feature) {
    case "chat":
      fallbackMessage = "AI chatbot is temporarily unavailable. Please try again later."
      fallback = {
        message: "申し訳ございません。AIチャットボットは現在利用できません。しばらくしてから再度お試しください。",
        isError: true,
      }
      break
    case "prediction":
      fallbackMessage = "AI price prediction is temporarily unavailable."
      fallback = {
        prediction: null,
        confidence: 0,
        reasoning: "価格予測サービスは現在利用できません。しばらくしてから再度お試しください。",
        isError: true,
      }
      break
    default:
      fallbackMessage = "AI service is temporarily unavailable."
  }

  // エラーログ
  logger.error(`AI service error in ${feature}`, {
    errorType: error.type,
    message: error.message,
    retryable: error.retryable,
    originalError: error.originalError?.message,
  })

  return {
    success: false,
    error: fallbackMessage,
    fallback,
  }
}

export function getUserFriendlyMessage(error: AIError): string {
  switch (error.type) {
    case AIErrorType.API_KEY_MISSING:
    case AIErrorType.API_KEY_INVALID:
      return "AIサービスの設定に問題があります。管理者にお問い合わせください。"
    case AIErrorType.RATE_LIMIT_EXCEEDED:
      return "リクエストが多すぎます。しばらくしてから再度お試しください。"
    case AIErrorType.USAGE_LIMIT_EXCEEDED:
      return "使用制限に達しました。プランをアップグレードするか、明日再度お試しください。"
    case AIErrorType.INVALID_REQUEST:
      return "リクエストの内容に問題があります。入力内容を確認してください。"
    case AIErrorType.SERVICE_UNAVAILABLE:
      return "AIサービスが一時的に利用できません。しばらくしてから再度お試しください。"
    case AIErrorType.NETWORK_ERROR:
      return "ネットワークエラーが発生しました。インターネット接続を確認してください。"
    case AIErrorType.TIMEOUT:
      return "リクエストがタイムアウトしました。しばらくしてから再度お試しください。"
    default:
      return "予期しないエラーが発生しました。しばらくしてから再度お試しください。"
  }
}