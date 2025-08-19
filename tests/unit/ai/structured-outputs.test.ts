import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { z } from 'zod';
import { StructuredOutputsService, StructuredOutputError } from '../../../src/lib/ai/structured-outputs';

// OpenAIとOpenAIクライアントのモック
jest.mock('openai');
jest.mock('@/lib/ai/openai', () => ({
  createOpenAIClient: jest.fn(() => ({
    chat: {
      completions: {
        create: jest.fn()
      }
    }
  }))
}));

// Mock logger
jest.mock('@/lib/monitoring/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  }
}))

type JestUnknownMock = jest.Mock;

type CreateFn = (...args: unknown[]) => Promise<unknown>;

describe('StructuredOutputsService', () => {
  let service: StructuredOutputsService;
  let mockOpenAIClient: { chat: { completions: { create: JestUnknownMock } } };
  let createMock: jest.MockedFunction<CreateFn>;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new StructuredOutputsService({
      model: 'gpt-4o-2024-08-06'
    });
    
    // Use the same OpenAI client instance used inside the service to avoid mismatched mocks
    mockOpenAIClient = (service as unknown as { openai: { chat: { completions: { create: JestUnknownMock } } } }).openai;
    createMock = mockOpenAIClient.chat.completions.create as unknown as jest.MockedFunction<CreateFn>;
  })

  describe('generateWithSchema', () => {
    it('should generate valid structured output', async () => {
      // Test schema
      const TestSchema = z.object({
        analysis: z.string(),
        confidence: z.number().min(0).max(100),
        recommendations: z.array(z.string())
      })

      // Mock OpenAI response
      createMock.mockResolvedValue({
        choices: [{
          message: {
            content: JSON.stringify({
              analysis: 'Market is showing bullish signals',
              confidence: 85,
              recommendations: ['Buy BTC', 'Hold ETH', 'Consider DCA strategy']
            })
          },
          finish_reason: 'stop'
        }],
        usage: {
          total_tokens: 150
        }
      })

      const result = await service.generateWithSchema(
        'Analyze the current crypto market',
        TestSchema
      )

      expect(result.data).toEqual({
        analysis: 'Market is showing bullish signals',
        confidence: 85,
        recommendations: ['Buy BTC', 'Hold ETH', 'Consider DCA strategy']
      })
      expect(result.tokensUsed).toBe(150)
      expect(result.model).toBe('gpt-4o-2024-08-06')
      expect(result.timestamp).toBeDefined()
    })

    it('should handle schema validation errors', async () => {
      const TestSchema = z.object({
        confidence: z.number().min(0).max(100)
      })

      // Mock invalid response
      createMock.mockResolvedValue({
        choices: [{
          message: {
            content: JSON.stringify({
              confidence: 150 // Invalid: exceeds max
            })
          },
          finish_reason: 'stop'
        }],
        usage: { total_tokens: 50 }
      })

      await expect(
        service.generateWithSchema('Test prompt', TestSchema)
      ).rejects.toThrow(StructuredOutputError)
    })

    it('should handle content filter responses', async () => {
      const TestSchema = z.object({
        result: z.string()
      })

      createMock.mockResolvedValue({
        choices: [{
          message: { content: null },
          finish_reason: 'content_filter'
        }],
        usage: { total_tokens: 10 }
      })

      await expect(
        service.generateWithSchema('Test prompt', TestSchema)
      ).rejects.toThrow(StructuredOutputError)
    })

    it('should handle refusal responses', async () => {
      const TestSchema = z.object({
        result: z.string()
      })

      createMock.mockResolvedValue({
        choices: [{
          message: {
            content: null,
            refusal: 'I cannot provide investment advice'
          },
          finish_reason: 'stop'
        }],
        usage: { total_tokens: 20 }
      })

      const result = await service.generateWithSchema('Give investment advice', TestSchema)
      
      expect(result.refusal).toBe('I cannot provide investment advice')
      expect(result.data).toEqual({})
    })

    it('should handle invalid JSON responses', async () => {
      const TestSchema = z.object({
        result: z.string()
      })

      createMock.mockResolvedValue({
        choices: [{
          message: {
            content: 'Invalid JSON response'
          },
          finish_reason: 'stop'
        }],
        usage: { total_tokens: 25 }
      })

      await expect(
        service.generateWithSchema('Test prompt', TestSchema)
      ).rejects.toThrow(StructuredOutputError)
    })
  })

  describe('generateWithJsonSchema', () => {
    it('should generate output with raw JSON schema', async () => {
      const jsonSchema = {
        name: 'test_response',
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            score: { type: 'number' }
          },
          required: ['message', 'score'],
          additionalProperties: false
        }
      }

      createMock.mockResolvedValue({
        choices: [{
          message: {
            content: JSON.stringify({
              message: 'Test successful',
              score: 42
            })
          },
          finish_reason: 'stop'
        }],
        usage: { total_tokens: 75 }
      })

      const result = await service.generateWithJsonSchema<{
        message: string
        score: number
      }>('Test prompt', jsonSchema)

      expect(result.data).toEqual({
        message: 'Test successful',
        score: 42
      })
      expect(result.tokensUsed).toBe(75)
    })
  })

  describe('generateWithRetry', () => {
    it('should retry on failure and eventually succeed', async () => {
      const TestSchema = z.object({
        result: z.string()
      })

      // First call fails, second succeeds
      createMock
        .mockRejectedValueOnce(new Error('Rate limit exceeded'))
        .mockResolvedValueOnce({
          choices: [{
            message: {
              content: JSON.stringify({ result: 'Success after retry' })
            },
            finish_reason: 'stop'
          }],
          usage: { total_tokens: 30 }
        })

      const result = await service.generateWithRetry(
        'Test prompt',
        TestSchema,
        {},
        2
      )

      expect(result.data.result).toBe('Success after retry')
      expect(mockOpenAIClient.chat.completions.create).toHaveBeenCalledTimes(2)
    })

    it('should fail after max retries', async () => {
      const TestSchema = z.object({
        result: z.string()
      })

      createMock
        .mockRejectedValue(new Error('Persistent error'))

      await expect(
        service.generateWithRetry('Test prompt', TestSchema, {}, 2)
      ).rejects.toThrow('Persistent error')

      expect(mockOpenAIClient.chat.completions.create).toHaveBeenCalledTimes(2)
    })
  })

  describe('zodToJsonSchema', () => {
    it('should convert basic Zod schema to JSON schema', () => {
      const TestSchema = z.object({
        name: z.string(),
        age: z.number(),
        active: z.boolean(),
        tags: z.array(z.string()),
        role: z.enum(['admin', 'user']),
        metadata: z.object({
          created: z.string(),
          updated: z.string()
        }).optional()
      })

      // Access private method for testing
      const jsonSchema = (service as unknown as { zodToJsonSchema: (s: z.ZodTypeAny) => { name: string; schema: Record<string, unknown> } }).zodToJsonSchema(TestSchema)

      expect(jsonSchema.name).toBeDefined()
      expect(jsonSchema.schema.type).toBe('object')
      expect(jsonSchema.schema.properties).toBeDefined()
      expect(jsonSchema.schema.additionalProperties).toBe(false)
    })
  })

  describe('error handling', () => {
    it('should create StructuredOutputError with proper code', () => {
      const error = new StructuredOutputError('Test error', 'TEST_CODE', { detail: 'test' })
      
      expect(error.message).toBe('Test error')
      expect(error.code).toBe('TEST_CODE')
      expect(error.details).toEqual({ detail: 'test' })
      expect(error.name).toBe('StructuredOutputError')
    })

    it('should handle OpenAI API errors', async () => {
      const TestSchema = z.object({ result: z.string() })

      createMock.mockRejectedValue(
        new Error('OpenAI API error')
      )

      await expect(
        service.generateWithSchema('Test prompt', TestSchema)
      ).rejects.toThrow(StructuredOutputError)
    })
  })

  describe('configuration', () => {
    it('should use custom configuration', () => {
      const customService = new StructuredOutputsService({
        model: 'gpt-4-turbo',
        temperature: 0.5,
        max_tokens: 2000,
        timeout: 60000
      })

      expect(customService).toBeDefined()
    })

    it('should use default configuration when not provided', () => {
      const defaultService = new StructuredOutputsService()
      expect(defaultService).toBeDefined()
    })
  })
})
