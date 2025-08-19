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

// Proper typing for HTTP error responses
interface HttpErrorResponse {
  status: number;
  data?: {
    error?: {
      message?: string;
    };
  };
}

interface HttpError {
  response: HttpErrorResponse;
}

interface CodeError {
  code: string;
}

interface MessageError {
  message: string;
}

function isHttpError(e: unknown): e is HttpError {
  if (typeof e !== 'object' || e === null) return false
  const resp = (e as Record<string, unknown>).response as Record<string, unknown> | undefined
  return typeof (resp as { status?: unknown })?.status === 'number'
}

function isCodeError(e: unknown): e is CodeError {
  return typeof e === "object" && e !== null && "code" in e && typeof (e as Record<string, unknown>).code === "string"
}

function getErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message
  if (typeof e === "string") return e
  const m = (e as Record<string, unknown>)?.message
  return typeof m === "string" ? m : String(e)
}

function asOriginalError(e: unknown): Error | undefined {
  return e instanceof Error ? e : undefined
}

export function handleOpenAIError(error: unknown): AIError {
  if (isHttpError(error)) {
    const status = error.response.status
    const errorData = error.response.data?.error ?? {}

    switch (status) {
      case 401:
        return new AIError(
          AIErrorType.API_KEY_INVALID,
          "OpenAI API key is invalid or expired",
          asOriginalError(error),
          false
        )
      case 429:
        return new AIError(
          AIErrorType.RATE_LIMIT_EXCEEDED,
          "OpenAI API rate limit exceeded",
          asOriginalError(error),
          true
        )
      case 400:
        return new AIError(
          AIErrorType.INVALID_REQUEST,
          errorData.message || "Invalid request to OpenAI API",
          asOriginalError(error),
          false
        )
      case 503:
      case 502:
        return new AIError(
          AIErrorType.SERVICE_UNAVAILABLE,
          "OpenAI API is temporarily unavailable",
          asOriginalError(error),
          true
        )
      default:
        return new AIError(
          AIErrorType.UNKNOWN_ERROR,
          `OpenAI API error: ${errorData.message || "Unknown error"}`,
          asOriginalError(error),
          false
        )
    }
  }

  if (isCodeError(error)) {
    const code = error.code
    if (code === "ECONNREFUSED" || code === "ENOTFOUND") {
      return new AIError(
        AIErrorType.NETWORK_ERROR,
        "Network error connecting to OpenAI API",
        asOriginalError(error),
        true
      )
    }

    if (code === "ETIMEDOUT") {
      return new AIError(
        AIErrorType.TIMEOUT,
        "Request to OpenAI API timed out",
        asOriginalError(error),
        true
      )
    }
  }

  if (getErrorMessage(error).includes("API key")) {
    return new AIError(
      AIErrorType.API_KEY_MISSING,
      "OpenAI API key is not configured",
      asOriginalError(error),
      false
    )
  }

  return new AIError(
    AIErrorType.UNKNOWN_ERROR,
    getErrorMessage(error) || "Unknown OpenAI error",
    asOriginalError(error),
    false
  )
}

export function handleAnthropicError(error: unknown): AIError {
  if (isHttpError(error)) {
    const status = error.response.status
    const errorData = error.response.data?.error ?? {}

    switch (status) {
      case 401:
        return new AIError(
          AIErrorType.API_KEY_INVALID,
          "Anthropic API key is invalid or expired",
          asOriginalError(error),
          false
        )
      case 429:
        return new AIError(
          AIErrorType.RATE_LIMIT_EXCEEDED,
          "Anthropic API rate limit exceeded",
          asOriginalError(error),
          true
        )
      case 400:
        return new AIError(
          AIErrorType.INVALID_REQUEST,
          errorData.message || "Invalid request to Anthropic API",
          asOriginalError(error),
          false
        )
      case 503:
      case 502:
        return new AIError(
          AIErrorType.SERVICE_UNAVAILABLE,
          "Anthropic API is temporarily unavailable",
          asOriginalError(error),
          true
        )
      default:
        return new AIError(
          AIErrorType.UNKNOWN_ERROR,
          `Anthropic API error: ${errorData.message || "Unknown error"}`,
          asOriginalError(error),
          false
        )
    }
  }

  if (getErrorMessage(error).includes("API key")) {
    return new AIError(
      AIErrorType.API_KEY_MISSING,
      "Anthropic API key is not configured",
      asOriginalError(error),
      false
    )
  }

  return new AIError(
    AIErrorType.UNKNOWN_ERROR,
    getErrorMessage(error) || "Unknown Anthropic error",
    asOriginalError(error),
    false
  )
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error = new Error("Unknown error")

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = (error instanceof Error) ? error : new Error(getErrorMessage(error))

      if (error instanceof AIError && !error.retryable) {
        throw error
      }

      if (attempt === maxRetries) {
        break
      }

      const delay = baseDelay * Math.pow(2, attempt)
      await new Promise(resolve => setTimeout(resolve, delay))

      logger.warn(`Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms`, {
        error: getErrorMessage(error),
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
  fallback?: unknown
} {
  let fallbackMessage = ""
  let fallback: unknown = null

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
