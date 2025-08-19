import { describe, it, expect } from '@jest/globals';
import {
  MarketAnalysisSchema,
  PortfolioAnalysisSchema,
  TradingSignalsSchema,
  RiskAnalysisSchema,
  AIChatResponseSchema,
  LearningRecommendationSchema,
  PricePredictionSchema,
  DeFiAnalysisSchema,
  NewsAnalysisSchema,
  ComprehensiveAnalysisSchema,
  validateSchema,
  safeValidateSchema
} from '@/lib/ai/schemas/structured-schemas';

describe('Structured Schemas', () => {
  describe('MarketAnalysisSchema', () => {
    it('should validate valid market analysis data', () => {
      const validData = {
        overallSentiment: 'bullish',
        confidenceScore: 85,
        marketTrend: 'uptrend',
        keyInsights: ['Strong institutional adoption', 'Positive regulatory sentiment'],
        technicalSignals: [{
          symbol: 'BTC',
          signal: 'buy',
          strength: 0.8,
          reasoning: 'RSI oversold, MACD bullish crossover',
          indicators: {
            rsi: 35,
            macd: 'bullish',
            support: 45000,
            resistance: 50000
          }
        }],
        priceTargets: [{
          symbol: 'BTC',
          shortTerm: { target: 48000, timeframe: '1w', confidence: 80 },
          mediumTerm: { target: 55000, timeframe: '1m', confidence: 70 },
          longTerm: { target: 75000, timeframe: '6m', confidence: 60 }
        }],
        riskFactors: ['Market volatility', 'Regulatory uncertainty'],
        opportunities: ['DeFi growth', 'Institutional adoption'],
        recommendations: [{
          action: 'Accumulate on dips',
          reasoning: 'Strong fundamentals support higher prices',
          priority: 'high',
          timeframe: '1-3 months'
        }]
      }

      expect(() => MarketAnalysisSchema.parse(validData)).not.toThrow()
    })

    it('should reject invalid sentiment values', () => {
      const invalidData = {
        overallSentiment: 'extremely_bullish', // Invalid enum value
        confidenceScore: 85,
        marketTrend: 'uptrend',
        keyInsights: ['Test insight'],
        technicalSignals: [],
        priceTargets: [],
        riskFactors: [],
        opportunities: [],
        recommendations: []
      }

      expect(() => MarketAnalysisSchema.parse(invalidData)).toThrow()
    })

    it('should reject confidence scores outside valid range', () => {
      const invalidData = {
        overallSentiment: 'bullish',
        confidenceScore: 150, // Invalid: exceeds 100
        marketTrend: 'uptrend',
        keyInsights: ['Test insight'],
        technicalSignals: [],
        priceTargets: [],
        riskFactors: [],
        opportunities: [],
        recommendations: []
      }

      expect(() => MarketAnalysisSchema.parse(invalidData)).toThrow()
    })
  })

  describe('PortfolioAnalysisSchema', () => {
    it('should validate valid portfolio analysis data', () => {
      const validData = {
        overallRisk: 'medium',
        diversificationScore: 75,
        performanceRating: 'good',
        keyMetrics: {
          totalValue: 100000,
          dailyChange: 2.5,
          weeklyChange: -1.2,
          monthlyChange: 8.7,
          volatility: 0.15,
          sharpeRatio: 1.8
        },
        assetAllocation: [{
          symbol: 'BTC',
          currentAllocation: 40,
          recommendedAllocation: 35,
          reasoning: 'Reduce concentration risk'
        }],
        rebalancingRecommendations: [{
          symbol: 'ETH',
          action: 'increase',
          targetAmount: 15000,
          reasoning: 'Underweight in ETH',
          priority: 'medium'
        }],
        riskAssessment: {
          portfolioVaR: 0.05,
          maxDrawdown: 0.20,
          correlationRisk: 0.65,
          concentrationRisk: 'medium'
        },
        optimizationSuggestions: [{
          category: 'Diversification',
          suggestion: 'Add altcoins for better diversification',
          expectedImprovement: '5-10% risk reduction',
          implementation: 'Gradually allocate 15% to altcoins'
        }]
      }

      expect(() => PortfolioAnalysisSchema.parse(validData)).not.toThrow()
    })

    it('should reject invalid allocation percentages', () => {
      const invalidData = {
        overallRisk: 'medium',
        diversificationScore: 75,
        performanceRating: 'good',
        keyMetrics: {
          totalValue: 100000,
          dailyChange: 2.5,
          weeklyChange: -1.2,
          monthlyChange: 8.7,
          volatility: 0.15
        },
        assetAllocation: [{
          symbol: 'BTC',
          currentAllocation: 150, // Invalid: exceeds 100%
          recommendedAllocation: 35,
          reasoning: 'Test'
        }],
        rebalancingRecommendations: [],
        riskAssessment: {
          portfolioVaR: 0.05,
          maxDrawdown: 0.20,
          correlationRisk: 0.65,
          concentrationRisk: 'medium'
        },
        optimizationSuggestions: []
      }

      expect(() => PortfolioAnalysisSchema.parse(invalidData)).toThrow()
    })
  })

  describe('TradingSignalsSchema', () => {
    it('should validate valid trading signals data', () => {
      const validData = {
        signals: [{
          symbol: 'BTC',
          action: 'buy',
          confidence: 85,
          entryPrice: 45000,
          stopLoss: 42000,
          takeProfitTargets: [48000, 52000, 58000],
          timeframe: '1d',
          strategy: 'Breakout strategy',
          reasoning: 'Breaking above resistance with volume',
          riskReward: 2.5
        }],
        marketConditions: {
          volatility: 'medium',
          liquidity: 'good',
          trend: 'bull',
          sentiment: 'bullish'
        },
        overallRecommendation: 'Cautiously optimistic - good entry opportunities',
        cautionaryNotes: ['Monitor news for regulatory changes', 'Set strict stop losses']
      }

      expect(() => TradingSignalsSchema.parse(validData)).not.toThrow()
    })

    it('should require at least one take profit target', () => {
      const invalidData = {
        signals: [{
          symbol: 'BTC',
          action: 'buy',
          confidence: 85,
          entryPrice: 45000,
          stopLoss: 42000,
          takeProfitTargets: [], // Invalid: must have at least one
          timeframe: '1d',
          strategy: 'Test strategy',
          reasoning: 'Test reasoning',
          riskReward: 2.5
        }],
        marketConditions: {
          volatility: 'medium',
          liquidity: 'good',
          trend: 'bull',
          sentiment: 'bullish'
        },
        overallRecommendation: 'Test recommendation',
        cautionaryNotes: []
      }

      expect(() => TradingSignalsSchema.parse(invalidData)).toThrow()
    })
  })

  describe('AIChatResponseSchema', () => {
    it('should validate valid chat response data', () => {
      const validData = {
        response: 'Based on current market conditions, Bitcoin shows strong momentum...',
        confidence: 80,
        category: 'market_analysis',
        keyPoints: [
          'Bitcoin breaking key resistance',
          'Institutional buying continues',
          'Technical indicators remain bullish'
        ],
        sources: ['CoinMarketCap', 'TradingView', 'On-chain metrics'],
        followUpQuestions: [
          'What is your risk tolerance?',
          'Are you looking for short or long term gains?'
        ],
        relatedActions: [{
          action: 'Set up price alerts',
          description: 'Monitor key support and resistance levels',
          category: 'research',
          urgency: 'this_week'
        }]
      }

      expect(() => AIChatResponseSchema.parse(validData)).not.toThrow()
    })

    it('should apply default disclaimer', () => {
      const minimalData = {
        response: 'Test response',
        confidence: 75,
        category: 'educational',
        keyPoints: ['Test point'],
        sources: ['Test source'],
        followUpQuestions: ['Test question'],
        relatedActions: []
      }

      const parsed = AIChatResponseSchema.parse(minimalData)
      expect(parsed.disclaimer).toBe('この情報は教育目的であり、投資助言ではありません。投資判断は自己責任でお願いします。')
    })
  })

  describe('PricePredictionSchema', () => {
    it('should validate valid price prediction data', () => {
      const validData = {
        symbol: 'BTC',
        predictions: {
          shortTerm: { price: 48000, change: 6.7, timeframe: '24h', confidence: 75 },
          mediumTerm: { price: 55000, change: 22.2, timeframe: '30d', confidence: 60 },
          longTerm: { price: 75000, change: 66.7, timeframe: '1y', confidence: 40 }
        },
        keyDrivers: ['Institutional adoption', 'Regulatory clarity', 'Technical breakout'],
        scenarios: {
          bullish: {
            price: 85000,
            probability: 0.3,
            triggers: ['ETF approval', 'Corporate adoption']
          },
          bearish: {
            price: 35000,
            probability: 0.2,
            triggers: ['Regulatory crackdown', 'Market crash']
          },
          neutral: {
            price: 45000,
            probability: 0.5,
            triggers: ['Sideways consolidation']
          }
        },
        technicalAnalysis: {
          support: 42000,
          resistance: 50000,
          trendDirection: 'up',
          momentum: 'strong'
        },
        risks: ['High volatility', 'Regulatory uncertainty']
      }

      expect(() => PricePredictionSchema.parse(validData)).not.toThrow()
    })

    it('should require positive prices', () => {
      const invalidData = {
        symbol: 'BTC',
        predictions: {
          shortTerm: { price: -1000, change: 6.7, timeframe: '24h', confidence: 75 },
          mediumTerm: { price: 55000, change: 22.2, timeframe: '30d', confidence: 60 },
          longTerm: { price: 75000, change: 66.7, timeframe: '1y', confidence: 40 }
        },
        keyDrivers: ['Test driver'],
        scenarios: {
          bullish: { price: 85000, probability: 0.3, triggers: ['Test'] },
          bearish: { price: 35000, probability: 0.2, triggers: ['Test'] },
          neutral: { price: 45000, probability: 0.5, triggers: ['Test'] }
        },
        technicalAnalysis: {
          support: 42000,
          resistance: 50000,
          trendDirection: 'up',
          momentum: 'strong'
        },
        risks: ['Test risk']
      }

      expect(() => PricePredictionSchema.parse(invalidData)).toThrow()
    })
  })

  describe('Helper Functions', () => {
    describe('validateSchema', () => {
      it('should validate and return parsed data', () => {
        const schema = MarketAnalysisSchema.pick({ 
          overallSentiment: true, 
          confidenceScore: true 
        })
        const data = { overallSentiment: 'bullish', confidenceScore: 80 }
        
        const result = validateSchema(data, schema)
        expect(result).toEqual(data)
      })

      it('should throw on invalid data', () => {
        const schema = MarketAnalysisSchema.pick({ confidenceScore: true })
        const data = { confidenceScore: 150 }
        
        expect(() => validateSchema(data, schema)).toThrow()
      })
    })

    describe('safeValidateSchema', () => {
      it('should return success result for valid data', () => {
        const schema = MarketAnalysisSchema.pick({ 
          overallSentiment: true, 
          confidenceScore: true 
        })
        const data = { overallSentiment: 'bullish', confidenceScore: 80 }
        
        const result = safeValidateSchema(data, schema)
        expect(result.success).toBe(true)
        expect(result.data).toEqual(data)
        expect(result.error).toBeUndefined()
      })

      it('should return error result for invalid data', () => {
        const schema = MarketAnalysisSchema.pick({ confidenceScore: true })
        const data = { confidenceScore: 150 }
        
        const result = safeValidateSchema(data, schema)
        expect(result.success).toBe(false)
        expect(result.data).toBeUndefined()
        expect(result.error).toBeDefined()
      })
    })
  })

  describe('ComprehensiveAnalysisSchema', () => {
    it('should validate comprehensive analysis with all components', () => {
      const validData = {
        marketAnalysis: {
          overallSentiment: 'bullish',
          confidenceScore: 85,
          marketTrend: 'uptrend',
          keyInsights: ['Strong momentum'],
          technicalSignals: [],
          priceTargets: [],
          riskFactors: [],
          opportunities: [],
          recommendations: []
        },
        riskAnalysis: {
          overallRiskScore: 65,
          riskLevel: 'medium',
          riskFactors: [],
          stressTestResults: {
            bearMarketScenario: {
              expectedLoss: -0.3,
              probability: 0.2,
              recoveryTime: '6-12 months'
            },
            blackSwanScenario: {
              expectedLoss: -0.6,
              probability: 0.05,
              recoveryTime: '1-2 years'
            }
          },
          recommendations: [],
          hedgingStrategies: []
        },
        timestamp: new Date().toISOString()
      }

      expect(() => ComprehensiveAnalysisSchema.parse(validData)).not.toThrow()
    })

    it('should apply default disclaimer', () => {
      const minimalData = {
        marketAnalysis: {
          overallSentiment: 'neutral',
          confidenceScore: 50,
          marketTrend: 'sideways',
          keyInsights: ['Market consolidating'],
          technicalSignals: [],
          priceTargets: [],
          riskFactors: [],
          opportunities: [],
          recommendations: []
        },
        riskAnalysis: {
          overallRiskScore: 50,
          riskLevel: 'medium',
          riskFactors: [],
          stressTestResults: {
            bearMarketScenario: {
              expectedLoss: -0.2,
              probability: 0.3,
              recoveryTime: '3-6 months'
            },
            blackSwanScenario: {
              expectedLoss: -0.5,
              probability: 0.1,
              recoveryTime: '1-2 years'
            }
          },
          recommendations: [],
          hedgingStrategies: []
        },
        timestamp: new Date().toISOString()
      }

      const parsed = ComprehensiveAnalysisSchema.parse(minimalData)
      expect(parsed.disclaimer).toBe('この分析は教育目的であり、投資助言ではありません。投資判断は自己責任でお願いします。')
    })
  })
})