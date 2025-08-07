// 🗄️ Supabase データベース型定義
// 暗号通貨AIプラットフォーム用包括的スキーマ定義

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'user' | 'admin' | 'premium'
          subscription_status: 'active' | 'inactive' | 'trial' | 'cancelled' | 'past_due'
          subscription_tier: 'basic' | 'pro' | 'enterprise'
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          trial_ends_at: string | null
          created_at: string
          updated_at: string
          last_active_at: string | null
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin' | 'premium'
          subscription_status?: 'active' | 'inactive' | 'trial' | 'cancelled' | 'past_due'
          subscription_tier?: 'basic' | 'pro' | 'enterprise'
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_ends_at?: string | null
          created_at?: string
          updated_at?: string
          last_active_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin' | 'premium'
          subscription_status?: 'active' | 'inactive' | 'trial' | 'cancelled' | 'past_due'
          subscription_tier?: 'basic' | 'pro' | 'enterprise'
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_ends_at?: string | null
          created_at?: string
          updated_at?: string
          last_active_at?: string | null
        }
      }
      user_settings: {
        Row: {
          id: string
          user_id: string
          notification_preferences: Json
          trading_preferences: Json
          privacy_settings: Json
          timezone: string | null
          language: string | null
          theme: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          notification_preferences?: Json
          trading_preferences?: Json
          privacy_settings?: Json
          timezone?: string | null
          language?: string | null
          theme?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          notification_preferences?: Json
          trading_preferences?: Json
          privacy_settings?: Json
          timezone?: string | null
          language?: string | null
          theme?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      alert_conditions: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          type: string
          severity: 'critical' | 'warning' | 'info'
          status: 'active' | 'paused' | 'expired'
          symbol: string
          exchange: string | null
          conditions: Json
          notification_methods: string[]
          cooldown_period: number
          created_at: string
          updated_at: string
          last_triggered: string | null
          trigger_count: number
          expires_at: string | null
          timeframe: string | null
          markets: string[] | null
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          type: string
          severity: 'critical' | 'warning' | 'info'
          status?: 'active' | 'paused' | 'expired'
          symbol: string
          exchange?: string | null
          conditions: Json
          notification_methods: string[]
          cooldown_period?: number
          created_at?: string
          updated_at?: string
          last_triggered?: string | null
          trigger_count?: number
          expires_at?: string | null
          timeframe?: string | null
          markets?: string[] | null
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          type?: string
          severity?: 'critical' | 'warning' | 'info'
          status?: 'active' | 'paused' | 'expired'
          symbol?: string
          exchange?: string | null
          conditions?: Json
          notification_methods?: string[]
          cooldown_period?: number
          created_at?: string
          updated_at?: string
          last_triggered?: string | null
          trigger_count?: number
          expires_at?: string | null
          timeframe?: string | null
          markets?: string[] | null
        }
      }
      triggered_alerts: {
        Row: {
          id: string
          alert_condition_id: string
          user_id: string
          type: string
          severity: 'critical' | 'warning' | 'info'
          triggered_at: string
          triggered_price: number | null
          current_value: number | null
          previous_value: number | null
          change_percent: number | null
          title: string
          message: string
          details: Json | null
          acknowledged: boolean
          acknowledged_at: string | null
        }
        Insert: {
          id?: string
          alert_condition_id: string
          user_id: string
          type: string
          severity: 'critical' | 'warning' | 'info'
          triggered_at?: string
          triggered_price?: number | null
          current_value?: number | null
          previous_value?: number | null
          change_percent?: number | null
          title: string
          message: string
          details?: Json | null
          acknowledged?: boolean
          acknowledged_at?: string | null
        }
        Update: {
          id?: string
          alert_condition_id?: string
          user_id?: string
          type?: string
          severity?: 'critical' | 'warning' | 'info'
          triggered_at?: string
          triggered_price?: number | null
          current_value?: number | null
          previous_value?: number | null
          change_percent?: number | null
          title?: string
          message?: string
          details?: Json | null
          acknowledged?: boolean
          acknowledged_at?: string | null
        }
      }
      user_portfolios: {
        Row: {
          id: string
          user_id: string
          name: string
          total_value: number
          change_24h: number
          change_percent_24h: number
          last_updated: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name?: string
          total_value?: number
          change_24h?: number
          change_percent_24h?: number
          last_updated?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          total_value?: number
          change_24h?: number
          change_percent_24h?: number
          last_updated?: string
          created_at?: string
          updated_at?: string
        }
      }
      portfolio_assets: {
        Row: {
          id: string
          user_id: string
          portfolio_id: string
          symbol: string
          amount: number
          current_price: number
          current_value: number
          average_cost: number | null
          total_cost: number | null
          unrealized_pnl: number | null
          change_percent_24h: number | null
          last_updated: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          portfolio_id: string
          symbol: string
          amount: number
          current_price?: number
          current_value?: number
          average_cost?: number | null
          total_cost?: number | null
          unrealized_pnl?: number | null
          change_percent_24h?: number | null
          last_updated?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          portfolio_id?: string
          symbol?: string
          amount?: number
          current_price?: number
          current_value?: number
          average_cost?: number | null
          total_cost?: number | null
          unrealized_pnl?: number | null
          change_percent_24h?: number | null
          last_updated?: string
          created_at?: string
        }
      }
      defi_protocols: {
        Row: {
          id: string
          name: string
          protocol_type: 'lending' | 'dex' | 'yield_farming' | 'staking' | 'derivatives' | 'insurance'
          blockchain: string
          website_url: string | null
          api_endpoint: string | null
          current_tvl: number | null
          tvl_change_24h: number | null
          yield_apr: number | null
          risk_score: number | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          protocol_type: 'lending' | 'dex' | 'yield_farming' | 'staking' | 'derivatives' | 'insurance'
          blockchain: string
          website_url?: string | null
          api_endpoint?: string | null
          current_tvl?: number | null
          tvl_change_24h?: number | null
          yield_apr?: number | null
          risk_score?: number | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          protocol_type?: 'lending' | 'dex' | 'yield_farming' | 'staking' | 'derivatives' | 'insurance'
          blockchain?: string
          website_url?: string | null
          api_endpoint?: string | null
          current_tvl?: number | null
          tvl_change_24h?: number | null
          yield_apr?: number | null
          risk_score?: number | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_defi_monitors: {
        Row: {
          id: string
          user_id: string
          protocol_id: string
          is_active: boolean
          alert_threshold_tvl: number | null
          alert_threshold_yield: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          protocol_id: string
          is_active?: boolean
          alert_threshold_tvl?: number | null
          alert_threshold_yield?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          protocol_id?: string
          is_active?: boolean
          alert_threshold_tvl?: number | null
          alert_threshold_yield?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      defi_tvl_history: {
        Row: {
          id: string
          protocol_id: string
          tvl_usd: number
          tvl_change_24h: number | null
          tvl_change_7d: number | null
          recorded_at: string
        }
        Insert: {
          id?: string
          protocol_id: string
          tvl_usd: number
          tvl_change_24h?: number | null
          tvl_change_7d?: number | null
          recorded_at?: string
        }
        Update: {
          id?: string
          protocol_id?: string
          tvl_usd?: number
          tvl_change_24h?: number | null
          tvl_change_7d?: number | null
          recorded_at?: string
        }
      }
      ai_recommendations: {
        Row: {
          id: string
          user_id: string
          recommendation_type: 'buy' | 'sell' | 'hold' | 'risk_warning' | 'opportunity' | 'portfolio_rebalance'
          symbol: string | null
          title: string
          message: string
          confidence_score: number
          reasoning: Json | null
          action_items: string[] | null
          expires_at: string | null
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          recommendation_type: 'buy' | 'sell' | 'hold' | 'risk_warning' | 'opportunity' | 'portfolio_rebalance'
          symbol?: string | null
          title: string
          message: string
          confidence_score: number
          reasoning?: Json | null
          action_items?: string[] | null
          expires_at?: string | null
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          recommendation_type?: 'buy' | 'sell' | 'hold' | 'risk_warning' | 'opportunity' | 'portfolio_rebalance'
          symbol?: string | null
          title?: string
          message?: string
          confidence_score?: number
          reasoning?: Json | null
          action_items?: string[] | null
          expires_at?: string | null
          is_read?: boolean
          created_at?: string
        }
      }
      ai_market_signals: {
        Row: {
          id: string
          signal_type: 'bullish' | 'bearish' | 'neutral' | 'volatility'
          symbol: string | null
          market: string | null
          confidence_score: number
          signal_strength: 'weak' | 'moderate' | 'strong'
          analysis_data: Json
          created_at: string
        }
        Insert: {
          id?: string
          signal_type: 'bullish' | 'bearish' | 'neutral' | 'volatility'
          symbol?: string | null
          market?: string | null
          confidence_score: number
          signal_strength: 'weak' | 'moderate' | 'strong'
          analysis_data: Json
          created_at?: string
        }
        Update: {
          id?: string
          signal_type?: 'bullish' | 'bearish' | 'neutral' | 'volatility'
          symbol?: string | null
          market?: string | null
          confidence_score?: number
          signal_strength?: 'weak' | 'moderate' | 'strong'
          analysis_data?: Json
          created_at?: string
        }
      }
      market_data: {
        Row: {
          id: string
          symbol: string
          exchange: string | null
          price_usd: number
          volume_24h: number | null
          market_cap: number | null
          price_change_24h: number | null
          price_change_percent_24h: number | null
          fear_greed_index: number | null
          recorded_at: string
        }
        Insert: {
          id?: string
          symbol: string
          exchange?: string | null
          price_usd: number
          volume_24h?: number | null
          market_cap?: number | null
          price_change_24h?: number | null
          price_change_percent_24h?: number | null
          fear_greed_index?: number | null
          recorded_at?: string
        }
        Update: {
          id?: string
          symbol?: string
          exchange?: string | null
          price_usd?: number
          volume_24h?: number | null
          market_cap?: number | null
          price_change_24h?: number | null
          price_change_percent_24h?: number | null
          fear_greed_index?: number | null
          recorded_at?: string
        }
      }
      user_lesson_progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          status: 'not_started' | 'in_progress' | 'completed'
          progress_percentage: number
          time_spent_minutes: number
          started_at: string | null
          completed_at: string | null
          last_accessed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          status?: 'not_started' | 'in_progress' | 'completed'
          progress_percentage?: number
          time_spent_minutes?: number
          started_at?: string | null
          completed_at?: string | null
          last_accessed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          status?: 'not_started' | 'in_progress' | 'completed'
          progress_percentage?: number
          time_spent_minutes?: number
          started_at?: string | null
          completed_at?: string | null
          last_accessed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      subscription_history: {
        Row: {
          id: string
          user_id: string
          stripe_subscription_id: string
          stripe_invoice_id: string | null
          tier: 'basic' | 'pro' | 'enterprise'
          status: 'active' | 'cancelled' | 'past_due' | 'incomplete'
          amount_paid: number | null
          currency: string | null
          billing_period_start: string
          billing_period_end: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_subscription_id: string
          stripe_invoice_id?: string | null
          tier: 'basic' | 'pro' | 'enterprise'
          status: 'active' | 'cancelled' | 'past_due' | 'incomplete'
          amount_paid?: number | null
          currency?: string | null
          billing_period_start: string
          billing_period_end: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          stripe_subscription_id?: string
          stripe_invoice_id?: string | null
          tier?: 'basic' | 'pro' | 'enterprise'
          status?: 'active' | 'cancelled' | 'past_due' | 'incomplete'
          amount_paid?: number | null
          currency?: string | null
          billing_period_start?: string
          billing_period_end?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      handle_new_user: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      user_role: 'user' | 'admin' | 'premium'
      subscription_status: 'active' | 'inactive' | 'trial' | 'cancelled' | 'past_due'
      subscription_tier: 'basic' | 'pro' | 'enterprise'
      alert_severity: 'critical' | 'warning' | 'info'
      alert_status: 'active' | 'paused' | 'expired'
      protocol_type: 'lending' | 'dex' | 'yield_farming' | 'staking' | 'derivatives' | 'insurance'
      lesson_status: 'not_started' | 'in_progress' | 'completed'
      recommendation_type: 'buy' | 'sell' | 'hold' | 'risk_warning' | 'opportunity' | 'portfolio_rebalance'
      signal_type: 'bullish' | 'bearish' | 'neutral' | 'volatility'
      signal_strength: 'weak' | 'moderate' | 'strong'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
} 