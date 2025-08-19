/**
 * Common type definitions for the Crypto AI Platform
 * Ensures type safety across all modules
 */

import type { SupabaseClient } from '@supabase/supabase-js';
// NOTE: このファイルは共通型を定義する単一ソースです。自身（@/types/common）を再インポートしないでください。
import type { NextRequest } from 'next/server';
// 重複していた自己参照のimportを削除しました。

// ============================================================================
// API Types
// ============================================================================

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
  success?: boolean;
}

export interface ApiError {
  error: string;
  message: string;
  details?: unknown;
  status?: number;
}

export interface PaginatedResponse<T = unknown> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============================================================================
// User & Auth Types
// ============================================================================

export type UserRole = 'user' | 'admin' | 'premium';
export type SubscriptionStatus = 'active' | 'inactive' | 'trial' | 'cancelled';
export type SubscriptionTier = 'basic' | 'pro' | 'enterprise';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: UserRole;
  subscription_status: SubscriptionStatus;
  subscription_tier: SubscriptionTier;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  full_name?: string;
  avatar_url?: string;
  role: UserRole;
  subscription_status: SubscriptionStatus;
  subscription_tier: SubscriptionTier;
  preferences?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// Database Types
// ============================================================================

export interface DatabaseUser {
  id: string;
  email: string;
  email_confirmed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseUserProfile {
  id: string;
  user_id: string;
  full_name?: string;
  avatar_url?: string;
  role: UserRole;
  subscription_status: SubscriptionStatus;
  subscription_tier: SubscriptionTier;
  preferences?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// AI Service Types
// ============================================================================

export interface AIAnalysisRequest {
  userId: string;
  analysisType: 'market' | 'portfolio' | 'trading' | 'risk' | 'comprehensive';
  symbols: string[];
  timeframe: '1h' | '4h' | '1d' | '7d' | '30d';
  preferences: {
    riskTolerance: 'conservative' | 'moderate' | 'aggressive';
    investmentHorizon: 'short' | 'medium' | 'long';
    tradingStrategy?: 'hodl' | 'swing' | 'scalping' | 'arbitrage';
  };
  marketContext?: {
    fearGreedIndex?: number;
    volatilityIndex?: number;
    marketTrend?: 'bull' | 'bear' | 'sideways';
    news?: string[];
  };
  portfolio?: UserPortfolio;
}

export interface AIAnalysisResult {
  userId: string;
  analysisType: string;
  summary: {
    overall_sentiment: 'bullish' | 'bearish' | 'neutral';
    confidence: number;
    key_insights: string[];
    risk_level: 'low' | 'medium' | 'high';
  };
  recommendations: AIRecommendation[];
  technical_analysis?: Record<string, unknown>;
  market_analysis?: Record<string, unknown>;
  risk_analysis?: Record<string, unknown>;
  generated_at: string;
}

export interface AIRecommendation {
  id: string;
  type: 'buy' | 'sell' | 'hold' | 'diversify' | 'risk_management';
  asset?: string;
  confidence: number;
  reasoning: string;
  risk_level: 'low' | 'medium' | 'high';
  time_horizon: 'short' | 'medium' | 'long';
  priority: 'high' | 'medium' | 'low';
  actionable_steps?: string[];
}

export interface AIChatRequest {
  userId: string;
  query: string;
  context?: {
    previousMessages?: Array<{
      role: 'user' | 'assistant';
      content: string;
      timestamp: string;
    }>;
    includePortfolio?: boolean;
    includeMarketData?: boolean;
    portfolio?: UserPortfolio;
    marketData?: Record<string, unknown>;
  };
  maxTokens?: number;
}

export interface AIChatResult {
  response: string;
  confidence: number;
  sources?: string[];
  recommendations?: AIRecommendation[];
  follow_up_questions?: string[];
  generated_at: string;
}

// ============================================================================
// Portfolio Types
// ============================================================================

export interface UserPortfolio {
  id: string;
  user_id: string;
  name: string;
  total_value: number;
  total_invested: number;
  profit_loss: number;
  profit_loss_percentage: number;
  assets: PortfolioAsset[];
  created_at: string;
  updated_at: string;
}

export interface PortfolioAsset {
  id: string;
  portfolio_id: string;
  symbol: string;
  name: string;
  amount: number;
  current_price: number;
  current_value: number;
  invested_value: number;
  profit_loss: number;
  profit_loss_percentage: number;
  allocation_percentage: number;
  last_updated: string;
}

// ============================================================================
// Market Data Types
// ============================================================================

export interface MarketData {
  symbol: string;
  name: string;
  price_usd: number;
  volume_24h: number;
  market_cap: number;
  price_change_percent_1h: number;
  price_change_percent_24h: number;
  price_change_percent_7d: number;
  fear_greed_index?: number;
  last_updated: string;
}

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation?: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply?: number;
  max_supply?: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
}

// ============================================================================
// Notification Types
// ============================================================================

export type NotificationType = 
  | 'price_alert'
  | 'portfolio_update'
  | 'market_news'
  | 'ai_recommendation'
  | 'security_alert'
  | 'system_notification';

export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';

export type NotificationStatus = 'pending' | 'sent' | 'delivered' | 'failed' | 'read';

export interface NotificationData {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  priority: NotificationPriority;
  status: NotificationStatus;
  channels: NotificationChannel[];
  scheduled_for?: string;
  sent_at?: string;
  read_at?: string;
  created_at: string;
  updated_at: string;
}

export interface NotificationChannel {
  type: 'email' | 'sms' | 'push' | 'in_app';
  address?: string;
  enabled: boolean;
  preferences?: Record<string, unknown>;
}

export interface NotificationPreferences {
  user_id: string;
  email_enabled: boolean;
  sms_enabled: boolean;
  push_enabled: boolean;
  in_app_enabled: boolean;
  types: Record<NotificationType, boolean>;
  quiet_hours?: {
    start: string;
    end: string;
    timezone: string;
  };
  preferences?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// Alert Types
// ============================================================================

export type AlertType = 
  | 'price_above'
  | 'price_below'
  | 'price_change_percent'
  | 'volume_spike'
  | 'market_cap_change'
  | 'technical_indicator';

export type AlertStatus = 'active' | 'triggered' | 'disabled' | 'expired';

export interface Alert {
  id: string;
  user_id: string;
  symbol: string;
  type: AlertType;
  condition: {
    operator: '>' | '<' | '>=' | '<=' | '=';
    value: number;
    timeframe?: string;
  };
  status: AlertStatus;
  triggered_at?: string;
  triggered_price?: number;
  message?: string;
  notification_channels: NotificationChannel[];
  created_at: string;
  updated_at: string;
  expires_at?: string;
}

// ============================================================================
// Learning Types
// ============================================================================

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type LessonStatus = 'not_started' | 'in_progress' | 'completed';
export type QuestionType = 'multiple_choice' | 'true_false' | 'fill_blank';

export interface Lesson {
  id: string;
  category_id: string;
  title: string;
  slug: string;
  description?: string;
  content: {
    sections: Array<{
      type: 'text' | 'image' | 'video' | 'code' | 'quiz' | 'warning' | 'tip' | 'example';
      title?: string;
      content?: string;
      metadata?: Record<string, unknown>;
    }>;
    keyPoints?: string[];
    summary?: string;
  };
  difficulty_level: DifficultyLevel;
  estimated_minutes: number;
  order_index: number;
  prerequisites?: string[];
  tags?: string[];
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface LessonCategory {
  id: string;
  name: string;
  description?: string;
  order_index: number;
  icon?: string;
  created_at: string;
  updated_at: string;
}

export interface UserLessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  status: LessonStatus;
  progress_percentage: number;
  started_at?: string;
  completed_at?: string;
  time_spent_seconds: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// Security Types
// ============================================================================

export interface TwoFactorAuth {
  user_id: string;
  secret: string;
  backup_codes: string[];
  enabled: boolean;
  verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface SecurityLog {
  id: string;
  user_id?: string;
  event_type: string;
  description: string;
  ip_address?: string;
  user_agent?: string;
  metadata?: Record<string, unknown>;
  severity: 'info' | 'warning' | 'error' | 'critical';
  created_at: string;
}

// ============================================================================
// API Context Types
// ============================================================================

export interface ApiContext {
  user: AuthenticatedUser;
  supabase: SupabaseClient;
  request?: NextRequest;
  params?: Record<string, string>;
}

export interface ApiHandlerOptions {
  requireAuth?: boolean;
  requireRoles?: UserRole[];
  requireSubscription?: boolean;
  rateLimitKey?: string;
  validateSchema?: unknown; // Will be properly typed when Zod is available
  requireCSRF?: boolean;
}

// ============================================================================
// Utility Types
// ============================================================================

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export interface SortParams {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface FilterParams {
  [key: string]: string | number | boolean | string[] | number[] | boolean[] | undefined;
}

// ============================================================================
// Environment & Config Types
// ============================================================================

export interface AppConfig {
  app: {
    name: string;
    version: string;
    environment: 'development' | 'staging' | 'production';
    url: string;
  };
  supabase: {
    url: string;
    anonKey: string;
    serviceKey?: string;
  };
  ai: {
    openai?: {
      apiKey: string;
      model: string;
    };
    anthropic?: {
      apiKey: string;
      model: string;
    };
  };
  external: {
    coinmarketcap?: {
      apiKey: string;
    };
    coingecko?: {
      apiKey: string;
    };
  };
  notifications: {
    sendgrid?: {
      apiKey: string;
      fromEmail: string;
    };
    twilio?: {
      accountSid: string;
      authToken: string;
      fromNumber: string;
    };
  };
}

// ============================================================================
// Error Types
// ============================================================================

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: unknown;

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = 'INTERNAL_ERROR',
    details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 400, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, 'AUTHENTICATION_ERROR');
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403, 'AUTHORIZATION_ERROR');
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, 'NOT_FOUND_ERROR');
    this.name = 'NotFoundError';
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 429, 'RATE_LIMIT_ERROR');
    this.name = 'RateLimitError';
  }
}

// ============================================================================
// DeFi Platform Specific Types (Additional to existing types)
// ============================================================================

export interface DeFiPortfolioData {
  id: string
  userId: string
  assets: DeFiAssetData[]
  totalValue: number
  allocations: Record<string, number>
  riskLevel: 'low' | 'medium' | 'high'
  lastUpdated: string
}

export interface DeFiAssetData {
  symbol: string
  name: string
  amount: number
  value: number
  price: number
  allocation: number
  yield?: number
  protocol?: string
  chain?: string
}

export interface DeFiProtocolData {
  id: string
  name: string
  chain: string
  tvl: number
  apr: number
  apy: number  // Added for AI service compatibility
  risk: number
  riskScore: number
  category: 'lending' | 'dex' | 'yield_farming' | 'derivatives' | 'insurance' | 'bridge'
  tokens: string[]
  features: string[]
  address?: string  // Added for AI service compatibility
}

export interface DeFiAlertData {
  id: string
  type: 'price' | 'yield' | 'risk' | 'opportunity'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  message: string
  asset?: string
  protocol?: string
  threshold?: number
  currentValue?: number
  timestamp: string
  actionRequired?: boolean
}

export interface DeFiOptimizationData extends Record<string, unknown> {
  currentYield: number
  potentialYield: number
  yieldBoost: number
  recommendations: DeFiRecommendationData[]
  risks: DeFiRiskData[]
  gasCosts: string
  complexity: 'low' | 'medium' | 'high'
  confidence: number
  implementationTime: string
}

export interface DeFiRecommendationData {
  id: string
  type: 'rebalance' | 'migrate' | 'stake' | 'compound'
  protocol: string
  asset: string
  action: string
  expectedReturn: number
  risk: number
  priority: 'low' | 'medium' | 'high'
}

export interface DeFiRiskData {
  type: 'smart_contract' | 'liquidity' | 'impermanent_loss' | 'regulatory'
  level: 'low' | 'medium' | 'high'
  description: string
  mitigation?: string
}

export interface DeFiAnalysisData {
  portfolio: DeFiPortfolioData
  optimization: DeFiOptimizationData
  alerts: DeFiAlertData[]
  sentiment: MarketSentimentData
  riskMetrics: RiskMetricsData
  healthScore: number
}

export interface MarketSentimentData {
  overall: 'bullish' | 'bearish' | 'neutral'
  confidence: number
  indicators: Record<string, number>
  timeframe: string
}

export interface RiskMetricsData {
  volatility: number
  sharpeRatio: number
  maxDrawdown: number
  beta: number
  correlation: Record<string, number>
}

// Function signature types for complete type safety
export type GenericFunction = (...args: unknown[]) => unknown
export type AsyncGenericFunction = (...args: unknown[]) => Promise<unknown>
export type EventHandler<T = Event> = (event: T) => void | Promise<void>
export type ChangeHandler<T = unknown> = (value: T) => void | Promise<void>

// API request/response generics
export interface TypedApiRequest<T = Record<string, unknown>> {
  body: T
  headers: Record<string, string>
  method: string
  url: string
  params?: Record<string, string | number>
}

export interface TypedApiResponse<T = unknown> {
  data: T
  success: boolean
  message?: string
  error?: string
  statusCode: number
}

// React component props helpers
export interface ComponentWithChildren {
  children: React.ReactNode
}

export interface ComponentWithClassName {
  className?: string
}

export interface StandardComponentProps extends ComponentWithChildren, ComponentWithClassName {
  id?: string
  'data-testid'?: string
}

// Form field types
export interface FormFieldValue {
  value: unknown
  error?: string
  touched: boolean
  dirty: boolean
}

export interface FormState {
  values: Record<string, unknown>
  errors: Record<string, string>
  touched: Record<string, boolean>
  dirty: Record<string, boolean>
  isSubmitting: boolean
  isValid: boolean
}

// Database operation types
export interface DatabaseInsert<T = Record<string, unknown>> {
  data: T
  returning?: string[]
}

export interface DatabaseUpdate<T = Record<string, unknown>> {
  data: Partial<T>
  where: Record<string, unknown>
  returning?: string[]
}

export interface DatabaseSelect {
  select?: string | string[]
  where?: Record<string, unknown>
  orderBy?: { column: string; ascending: boolean }[]
  limit?: number
  offset?: number
}

// Error boundary types
export interface ErrorInfo {
  componentStack: string
  errorBoundary?: string
  eventId?: string
}

export interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

// Test utility types
export interface TestMockFunction<TArgs extends readonly unknown[] = unknown[], TReturn = unknown> {
  (...args: TArgs): TReturn
  mockImplementation: (fn: (...args: TArgs) => TReturn) => void
  mockReturnValue: (value: TReturn) => void
  mockResolvedValue: (value: TReturn) => void
  mockRejectedValue: (error: Error) => void
  mockClear: () => void
  mockReset: () => void
}

// ============================================================================
// Export all types
// ============================================================================

// All types are already exported above
