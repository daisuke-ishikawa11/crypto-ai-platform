import { z } from 'zod'

// Base schemas for common data types
export const CryptocurrencySymbolSchema = z.enum([
  'BTC', 'ETH', 'ADA', 'DOT', 'LINK', 'UNI', 'AAVE', 'SOL', 'AVAX', 'MATIC',
  'ATOM', 'ALGO', 'XRP', 'LTC', 'BCH', 'EOS', 'TRX', 'XLM', 'DOGE', 'SHIB'
])

export const TradingSignalSchema = z.enum(['buy', 'sell', 'hold'])
export const RiskLevelSchema = z.enum(['low', 'medium', 'high'])
export const ConfidenceScoreSchema = z.number().min(0).max(100)
export const SentimentSchema = z.enum(['bullish', 'bearish', 'neutral'])
export const DifficultyLevelSchema = z.enum(['beginner', 'intermediate', 'advanced'])

// Market Analysis Schema
export const MarketAnalysisSchema = z.object({
  overallSentiment: SentimentSchema,
  confidenceScore: ConfidenceScoreSchema,
  marketTrend: z.enum(['uptrend', 'downtrend', 'sideways']),
  keyInsights: z.array(z.string()).min(1).max(5),
  technicalSignals: z.array(z.object({
    symbol: CryptocurrencySymbolSchema,
    signal: TradingSignalSchema,
    strength: z.number().min(0).max(1),
    reasoning: z.string(),
    indicators: z.object({
      rsi: z.number().min(0).max(100).optional(),
      macd: z.string().optional(),
      bollinger: z.string().optional(),
      support: z.number().positive().optional(),
      resistance: z.number().positive().optional()
    })
  })),
  priceTargets: z.array(z.object({
    symbol: CryptocurrencySymbolSchema,
    shortTerm: z.object({
      target: z.number().positive(),
      timeframe: z.string(),
      confidence: ConfidenceScoreSchema
    }),
    mediumTerm: z.object({
      target: z.number().positive(),
      timeframe: z.string(),
      confidence: ConfidenceScoreSchema
    }),
    longTerm: z.object({
      target: z.number().positive(),
      timeframe: z.string(),
      confidence: ConfidenceScoreSchema
    })
  })),
  riskFactors: z.array(z.string()).max(3),
  opportunities: z.array(z.string()).max(3),
  recommendations: z.array(z.object({
    action: z.string(),
    reasoning: z.string(),
    priority: z.enum(['high', 'medium', 'low']),
    timeframe: z.string()
  }))
})

// Portfolio Analysis Schema
export const PortfolioAnalysisSchema = z.object({
  overallRisk: RiskLevelSchema,
  diversificationScore: z.number().min(0).max(100),
  performanceRating: z.enum(['excellent', 'good', 'fair', 'poor']),
  keyMetrics: z.object({
    totalValue: z.number().positive(),
    dailyChange: z.number(),
    weeklyChange: z.number(),
    monthlyChange: z.number(),
    volatility: z.number().min(0).max(1),
    sharpeRatio: z.number().optional()
  }),
  assetAllocation: z.array(z.object({
    symbol: CryptocurrencySymbolSchema,
    currentAllocation: z.number().min(0).max(100),
    recommendedAllocation: z.number().min(0).max(100),
    reasoning: z.string()
  })),
  rebalancingRecommendations: z.array(z.object({
    symbol: CryptocurrencySymbolSchema,
    action: z.enum(['buy', 'sell', 'hold', 'reduce', 'increase']),
    targetAmount: z.number().positive().optional(),
    reasoning: z.string(),
    priority: z.enum(['high', 'medium', 'low'])
  })),
  riskAssessment: z.object({
    portfolioVaR: z.number().min(0).max(1),
    maxDrawdown: z.number().min(0).max(1),
    correlationRisk: z.number().min(0).max(1),
    concentrationRisk: RiskLevelSchema
  }),
  optimizationSuggestions: z.array(z.object({
    category: z.string(),
    suggestion: z.string(),
    expectedImprovement: z.string(),
    implementation: z.string()
  }))
})

// Trading Signal Schema
export const TradingSignalsSchema = z.object({
  signals: z.array(z.object({
    symbol: CryptocurrencySymbolSchema,
    action: TradingSignalSchema,
    confidence: ConfidenceScoreSchema,
    entryPrice: z.number().positive(),
    stopLoss: z.number().positive(),
    takeProfitTargets: z.array(z.number().positive()).min(1).max(3),
    timeframe: z.enum(['5m', '15m', '1h', '4h', '1d', '1w']),
    strategy: z.string(),
    reasoning: z.string(),
    riskReward: z.number().positive()
  })),
  marketConditions: z.object({
    volatility: RiskLevelSchema,
    liquidity: z.enum(['excellent', 'good', 'fair', 'poor']),
    trend: z.enum(['strong_bull', 'bull', 'neutral', 'bear', 'strong_bear']),
    sentiment: SentimentSchema
  }),
  overallRecommendation: z.string(),
  cautionaryNotes: z.array(z.string()).max(3)
})

// Risk Analysis Schema
export const RiskAnalysisSchema = z.object({
  overallRiskScore: z.number().min(0).max(100),
  riskLevel: RiskLevelSchema,
  riskFactors: z.array(z.object({
    category: z.enum(['market', 'liquidity', 'concentration', 'volatility', 'regulatory', 'technical']),
    description: z.string(),
    severity: RiskLevelSchema,
    mitigation: z.string(),
    probability: z.number().min(0).max(1)
  })),
  stressTestResults: z.object({
    bearMarketScenario: z.object({
      expectedLoss: z.number(),
      probability: z.number().min(0).max(1),
      recoveryTime: z.string()
    }),
    blackSwanScenario: z.object({
      expectedLoss: z.number(),
      probability: z.number().min(0).max(1),
      recoveryTime: z.string()
    })
  }),
  recommendations: z.array(z.object({
    action: z.string(),
    reasoning: z.string(),
    priority: z.enum(['critical', 'high', 'medium', 'low']),
    timeline: z.string()
  })),
  hedgingStrategies: z.array(z.object({
    strategy: z.string(),
    description: z.string(),
    effectiveness: ConfidenceScoreSchema,
    cost: RiskLevelSchema
  }))
})

// AI Chat Response Schema
export const AIChatResponseSchema = z.object({
  response: z.string(),
  confidence: ConfidenceScoreSchema,
  category: z.enum(['market_analysis', 'portfolio_advice', 'educational', 'risk_management', 'technical_analysis']),
  keyPoints: z.array(z.string()).min(1).max(5),
  sources: z.array(z.string()).max(3),
  followUpQuestions: z.array(z.string()).max(3),
  relatedActions: z.array(z.object({
    action: z.string(),
    description: z.string(),
    category: z.enum(['trading', 'research', 'learning', 'risk_management']),
    urgency: z.enum(['immediate', 'this_week', 'this_month', 'long_term'])
  })),
  disclaimer: z.string().default('この情報は教育目的であり、投資助言ではありません。投資判断は自己責任でお願いします。')
})

// Alert Summary Schema (for user notifications)
export const AlertSummarySchema = z.object({
  summary: z.string(),
  keyPoints: z.array(z.string()).min(1).max(8),
  relatedActions: z.array(z.object({
    action: z.string().optional(),
    description: z.string(),
    category: z.enum(['trading', 'research', 'learning', 'risk_management']).optional(),
    urgency: z.enum(['immediate', 'this_week', 'this_month', 'long_term']).optional()
  })).max(10),
  sources: z.array(z.string()).max(10),
  followUpQuestions: z.array(z.string()).max(5)
})

// Learning Recommendation Schema
export const LearningRecommendationSchema = z.object({
  knowledgeLevel: DifficultyLevelSchema,
  learningGaps: z.array(z.string()).max(5),
  recommendedLessons: z.array(z.object({
    lessonId: z.string(),
    title: z.string(),
    category: z.string(),
    difficulty: DifficultyLevelSchema,
    priority: z.enum(['high', 'medium', 'low']),
    relevanceScore: z.number().min(0).max(100),
    estimatedTime: z.number().positive(),
    reasoning: z.string()
  })),
  learningPath: z.string(),
  nextSteps: z.array(z.string()).min(1).max(5),
  motivation: z.string()
})

// Price Prediction Schema
export const PricePredictionSchema = z.object({
  symbol: CryptocurrencySymbolSchema,
  predictions: z.object({
    shortTerm: z.object({
      price: z.number().positive(),
      change: z.number(),
      timeframe: z.string(),
      confidence: ConfidenceScoreSchema
    }),
    mediumTerm: z.object({
      price: z.number().positive(),
      change: z.number(),
      timeframe: z.string(),
      confidence: ConfidenceScoreSchema
    }),
    longTerm: z.object({
      price: z.number().positive(),
      change: z.number(),
      timeframe: z.string(),
      confidence: ConfidenceScoreSchema
    })
  }),
  keyDrivers: z.array(z.string()).min(1).max(5),
  scenarios: z.object({
    bullish: z.object({
      price: z.number().positive(),
      probability: z.number().min(0).max(1),
      triggers: z.array(z.string()).max(3)
    }),
    bearish: z.object({
      price: z.number().positive(),
      probability: z.number().min(0).max(1),
      triggers: z.array(z.string()).max(3)
    }),
    neutral: z.object({
      price: z.number().positive(),
      probability: z.number().min(0).max(1),
      triggers: z.array(z.string()).max(3)
    })
  }),
  technicalAnalysis: z.object({
    support: z.number().positive(),
    resistance: z.number().positive(),
    trendDirection: z.enum(['up', 'down', 'sideways']),
    momentum: z.enum(['strong', 'moderate', 'weak'])
  }),
  risks: z.array(z.string()).max(3)
})

// DeFi Analysis Schema
export const DeFiAnalysisSchema = z.object({
  protocol: z.string(),
  analysis: z.object({
    tvl: z.number().positive(),
    apr: z.number().min(0),
    risk: RiskLevelSchema,
    liquidity: z.enum(['excellent', 'good', 'fair', 'poor'])
  }),
  opportunities: z.array(z.object({
    strategy: z.string(),
    expectedReturn: z.number(),
    risk: RiskLevelSchema,
    requirements: z.array(z.string()),
    timeCommitment: z.string()
  })),
  risks: z.array(z.object({
    type: z.enum(['smart_contract', 'liquidity', 'impermanent_loss', 'regulatory', 'market']),
    description: z.string(),
    severity: RiskLevelSchema,
    mitigation: z.string()
  })),
  recommendations: z.array(z.object({
    action: z.string(),
    reasoning: z.string(),
    priority: z.enum(['high', 'medium', 'low'])
  })),
  monitoring: z.object({
    keyMetrics: z.array(z.string()),
    alertConditions: z.array(z.string()),
    reviewFrequency: z.string()
  })
})

// News Analysis Schema
export const NewsAnalysisSchema = z.object({
  sentiment: SentimentSchema,
  impact: z.enum(['high', 'medium', 'low']),
  relevantAssets: z.array(CryptocurrencySymbolSchema),
  keyPoints: z.array(z.string()).min(1).max(5),
  marketImplications: z.array(z.object({
    implication: z.string(),
    timeframe: z.enum(['immediate', 'short_term', 'medium_term', 'long_term']),
    confidence: ConfidenceScoreSchema
  })),
  tradingOpportunities: z.array(z.object({
    opportunity: z.string(),
    assets: z.array(CryptocurrencySymbolSchema),
    strategy: z.string(),
    risk: RiskLevelSchema
  })),
  followUpActions: z.array(z.string()).max(3)
})

// Export type inference helpers
export type MarketAnalysis = z.infer<typeof MarketAnalysisSchema>
export type PortfolioAnalysis = z.infer<typeof PortfolioAnalysisSchema>
export type TradingSignals = z.infer<typeof TradingSignalsSchema>
export type RiskAnalysis = z.infer<typeof RiskAnalysisSchema>
export type AIChatResponse = z.infer<typeof AIChatResponseSchema>
export type AlertSummary = z.infer<typeof AlertSummarySchema>
export type LearningRecommendation = z.infer<typeof LearningRecommendationSchema>
export type PricePrediction = z.infer<typeof PricePredictionSchema>
export type DeFiAnalysis = z.infer<typeof DeFiAnalysisSchema>
export type NewsAnalysis = z.infer<typeof NewsAnalysisSchema>

// Common schema combinations
export const ComprehensiveAnalysisSchema = z.object({
  marketAnalysis: MarketAnalysisSchema,
  portfolioAnalysis: PortfolioAnalysisSchema.optional(),
  tradingSignals: TradingSignalsSchema.optional(),
  riskAnalysis: RiskAnalysisSchema,
  timestamp: z.string(),
  disclaimer: z.string().default('この分析は教育目的であり、投資助言ではありません。投資判断は自己責任でお願いします。')
})

export type ComprehensiveAnalysis = z.infer<typeof ComprehensiveAnalysisSchema>

// Schema validation helpers
export function validateSchema<T>(data: unknown, schema: z.ZodSchema<T>): T {
  return schema.parse(data)
}

export function safeValidateSchema<T>(data: unknown, schema: z.ZodSchema<T>): {
  success: boolean
  data?: T
  error?: z.ZodError
} {
  const result = schema.safeParse(data)
  if (result.success) {
    return { success: true, data: result.data }
  } else {
    return { success: false, error: result.error }
  }
}
