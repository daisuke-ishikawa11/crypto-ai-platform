import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { NextRequest } from 'next/server';

// Mock dependencies
jest.mock('@/lib/ai/structured-ai-service');
jest.mock('@/lib/auth/middleware');
jest.mock('@/lib/monitoring/logger');

describe('/api/ai/structured', () => {
  let mockStructuredAI: any;
  let mockWithApiHandler: any;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockStructuredAI = {
      analyzeMarket: jest.fn(),
      analyzePortfolio: jest.fn(),
      generateTradingSignals: jest.fn(),
      analyzeRisk: jest.fn(),
      generateChatResponse: jest.fn(),
      generateLearningRecommendations: jest.fn(),
      predictPrice: jest.fn(),
      analyzeDeFi: jest.fn(),
      analyzeNews: jest.fn()
    };

    mockWithApiHandler = jest.fn((handler, options) => handler);

    // Setup mocks
    const structuredAiModule = require('@/lib/ai/structured-ai-service');
    structuredAiModule.structuredAI = mockStructuredAI;

    const middlewareModule = require('@/lib/auth/middleware');
    middlewareModule.withApiHandler = mockWithApiHandler;
  });

  describe('POST /api/ai/structured', () => {
    it('should handle market analysis request', async () => {
      const mockResult = {
        overallSentiment: 'bullish',
        confidenceScore: 85,
        marketTrend: 'uptrend',
        keyInsights: ['Strong institutional adoption'],
        technicalSignals: [{
          symbol: 'BTC',
          signal: 'buy',
          strength: 0.8,
          reasoning: 'Bullish breakout',
          indicators: { rsi: 65 }
        }],
        priceTargets: [],
        riskFactors: ['Volatility'],
        opportunities: ['DeFi growth'],
        recommendations: []
      };

      mockStructuredAI.analyzeMarket.mockResolvedValue(mockResult);

      // Import the handler after mocks are set up
      const { POST } = require('@/app/api/ai/structured/route');

      const mockRequest = {
        json: jest.fn().mockResolvedValue({
          type: 'market',
          data: {
            symbols: ['BTC', 'ETH'],
            timeframe: '1d',
            analysisDepth: 'comprehensive'
          }
        })
      } as NextRequest;

      const mockContext = {
        user: { id: 'user123' },
        supabase: {
          from: jest.fn(() => ({
            upsert: jest.fn().mockResolvedValue({ data: null, error: null })
          }))
        }
      };

      const response = await POST(mockRequest, mockContext);
      const responseData = await response.json();

      expect(mockStructuredAI.analyzeMarket).toHaveBeenCalledWith({
        symbols: ['BTC', 'ETH'],
        timeframe: '1d',
        analysisDepth: 'comprehensive',
        userContext: undefined
      });

      expect(responseData.success).toBe(true);
      expect(responseData.type).toBe('market');
      expect(responseData.result).toEqual(mockResult);
      expect(responseData.structured).toBe(true);
      expect(responseData.meta.structured_outputs).toBe(true);
    });

    it('should handle validation errors', async () => {
      const { POST } = require('@/app/api/ai/structured/route');

      const mockRequest = {
        json: jest.fn().mockResolvedValue({
          type: 'market',
          data: {
            symbols: [], // Invalid: empty array
            timeframe: '1d'
          }
        })
      } as NextRequest;

      const mockContext = {
        user: { id: 'user123' },
        supabase: {}
      };

      const response = await POST(mockRequest, mockContext);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.error).toBe('Validation failed');
      expect(responseData.details).toBeDefined();
    });
  });

  describe('GET /api/ai/structured', () => {
    it('should return available analysis types', async () => {
      const { GET } = require('@/app/api/ai/structured/route');

      const mockRequest = {} as NextRequest;
      const mockContext = {
        user: { id: 'user123' }
      };

      const response = await GET(mockRequest, mockContext);
      const responseData = await response.json();

      expect(responseData.success).toBe(true);
      expect(responseData.analysisTypes).toBeDefined();
      expect(responseData.analysisTypes.market).toBeDefined();
      expect(responseData.analysisTypes.portfolio).toBeDefined();
      expect(responseData.analysisTypes.trading).toBeDefined();
      expect(responseData.analysisTypes.risk).toBeDefined();
      expect(responseData.analysisTypes.chat).toBeDefined();
      expect(responseData.features.structuredOutputs).toBe(true);
      expect(responseData.features.openaiModel).toBe('gpt-4o-2024-08-06');
    });
  });
});