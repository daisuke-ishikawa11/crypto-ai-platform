import OpenAI from 'openai'
import { z, ZodSchema } from 'zod'
import { logger } from '@/lib/monitoring/logger'
import { createOpenAIClient } from './openai'

// Type definitions for Zod schema internals
interface ZodDef {
  typeName: string;
  shape?: () => Record<string, ZodSchema<unknown>>;
  type?: ZodSchema<unknown>;
  innerType?: ZodSchema<unknown>;
  values?: unknown[];
  value?: unknown;
}

interface ZodWithDef {
  _def: ZodDef;
}

// Type guard to check if object has _def property with typeName
function hasZodDef(obj: unknown): obj is ZodWithDef {
  if (typeof obj !== 'object' || obj === null) return false
  const o = obj as Record<string, unknown>
  const def = (o as { _def?: unknown })._def
  return typeof def === 'object' && def !== null && 'typeName' in (def as Record<string, unknown>)
}

// OpenAI Structured Outputs configuration
export interface StructuredOutputConfig {
  model?: string
  temperature?: number
  max_tokens?: number
  timeout?: number
}

// Result type for structured outputs
export interface StructuredOutputResult<T> {
  data: T
  refusal?: string
  tokensUsed: number
  model: string
  timestamp: string
}

// Error types for structured outputs
export class StructuredOutputError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: unknown
  ) {
    super(message)
    this.name = 'StructuredOutputError'
  }
}

// Schema conversion utilities
export class StructuredOutputsService {
  private openai: OpenAI
  private defaultConfig: StructuredOutputConfig

  constructor(config: StructuredOutputConfig = {}) {
    this.openai = createOpenAIClient()
    this.defaultConfig = {
      model: 'gpt-4o-2024-08-06',
      temperature: 0.1,
      max_tokens: 4000,
      timeout: 30000,
      ...config
    }
  }

  /**
   * Generate structured output using Zod schema
   */
  async generateWithSchema<T>(
    prompt: string,
    schema: ZodSchema<T>,
    config: StructuredOutputConfig = {}
  ): Promise<StructuredOutputResult<T>> {
    const finalConfig = { ...this.defaultConfig, ...config }
    
    let jsonSchema: { name: string; schema: Record<string, unknown> } | undefined
    try {
      // Convert Zod schema to JSON Schema
      jsonSchema = this.zodToJsonSchema(schema)
      
      logger.info('Generating structured output', {
        model: finalConfig.model,
        schemaName: jsonSchema.name,
        promptLength: prompt.length
      })

      const completion = await this.openai.chat.completions.create({
        model: finalConfig.model!,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: jsonSchema.name,
            schema: jsonSchema.schema,
            strict: true
          }
        },
        temperature: finalConfig.temperature,
        max_tokens: finalConfig.max_tokens
      })

      const response = completion.choices[0]
      
      if (response.finish_reason === 'content_filter') {
        throw new StructuredOutputError(
          'Content was filtered by OpenAI',
          'CONTENT_FILTERED'
        )
      }

      if (response.message.refusal) {
        return {
          data: {} as T,
          refusal: response.message.refusal,
          tokensUsed: completion.usage?.total_tokens || 0,
          model: finalConfig.model!,
          timestamp: new Date().toISOString()
        }
      }

      if (!response.message.content) {
        throw new StructuredOutputError(
          'No content returned from OpenAI',
          'NO_CONTENT'
        )
      }

      // Parse and validate the JSON response
      let parsedData: unknown
      try {
        parsedData = JSON.parse(response.message.content)
      } catch (parseError) {
        throw new StructuredOutputError(
          'Failed to parse JSON response',
          'INVALID_JSON',
          parseError
        )
      }

      // Validate against Zod schema
      const validatedData = schema.parse(parsedData)

      logger.info('Structured output generated successfully', {
        model: finalConfig.model,
        tokensUsed: completion.usage?.total_tokens,
        schemaName: jsonSchema.name
      })

      return {
        data: validatedData,
        tokensUsed: completion.usage?.total_tokens || 0,
        model: finalConfig.model!,
        timestamp: new Date().toISOString()
      }

    } catch (error) {
      logger.error('Structured output generation failed', {
          error: error instanceof Error ? error.message : 'Unknown error',
          model: finalConfig.model,
          schemaName: jsonSchema?.name
      })

      if (error instanceof z.ZodError) {
        throw new StructuredOutputError(
          'Schema validation failed',
          'VALIDATION_ERROR',
          (error as z.ZodError).issues
        )
      }

      if (error instanceof StructuredOutputError) {
        throw error
      }

      throw new StructuredOutputError(
        'OpenAI API error',
        'API_ERROR',
        error
      )
    }
  }

  /**
   * Generate structured output using raw JSON schema
   */
  async generateWithJsonSchema<T>(
    prompt: string,
    jsonSchema: {
      name: string
      schema: Record<string, unknown>
    },
    config: StructuredOutputConfig = {}
  ): Promise<StructuredOutputResult<T>> {
    const finalConfig = { ...this.defaultConfig, ...config }
    
    try {
      logger.info('Generating structured output with JSON schema', {
        model: finalConfig.model,
        schemaName: jsonSchema.name,
        promptLength: prompt.length
      })

      const completion = await this.openai.chat.completions.create({
        model: finalConfig.model!,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: jsonSchema.name,
            schema: jsonSchema.schema,
            strict: true
          }
        },
        temperature: finalConfig.temperature,
        max_tokens: finalConfig.max_tokens
      })

      const response = completion.choices[0]
      
      if (response.finish_reason === 'content_filter') {
        throw new StructuredOutputError(
          'Content was filtered by OpenAI',
          'CONTENT_FILTERED'
        )
      }

      if (response.message.refusal) {
        return {
          data: {} as T,
          refusal: response.message.refusal,
          tokensUsed: completion.usage?.total_tokens || 0,
          model: finalConfig.model!,
          timestamp: new Date().toISOString()
        }
      }

      if (!response.message.content) {
        throw new StructuredOutputError(
          'No content returned from OpenAI',
          'NO_CONTENT'
        )
      }

      // Parse the JSON response
      let parsedData: T
      try {
        parsedData = JSON.parse(response.message.content)
      } catch (parseError) {
        throw new StructuredOutputError(
          'Failed to parse JSON response',
          'INVALID_JSON',
          parseError
        )
      }

      logger.info('Structured output generated successfully', {
        model: finalConfig.model,
        tokensUsed: completion.usage?.total_tokens,
        schemaName: jsonSchema.name
      })

      return {
        data: parsedData,
        tokensUsed: completion.usage?.total_tokens || 0,
        model: finalConfig.model!,
        timestamp: new Date().toISOString()
      }

    } catch (error) {
      logger.error('Structured output generation failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
        model: finalConfig.model,
        schemaName: jsonSchema.name
      })

      if (error instanceof StructuredOutputError) {
        throw error
      }

      throw new StructuredOutputError(
        'OpenAI API error',
        'API_ERROR',
        error
      )
    }
  }

  /**
   * Convert Zod schema to JSON Schema
   */
  private zodToJsonSchema<T>(schema: ZodSchema<T>): {
    name: string
    schema: Record<string, unknown>
  } {
    // This is a simplified conversion - in production you might want to use
    // a library like zod-to-json-schema for more comprehensive conversion
    
    const schemaName = this.generateSchemaName(schema)
    
    try {
      // Attempt to infer basic JSON schema structure from Zod
      const jsonSchema = this.inferJsonSchemaFromZod(schema)
      
      return {
        name: schemaName,
        schema: {
          type: 'object',
          properties: jsonSchema.properties || {},
          required: jsonSchema.required || [],
          additionalProperties: false
        }
      }
    } catch (error) {
      logger.warn('Failed to convert Zod schema, using fallback', { error })
      
      // Fallback to a generic object schema
      return {
        name: schemaName,
        schema: {
          type: 'object',
          additionalProperties: true
        }
      }
    }
  }

  /**
   * Generate schema name from Zod schema
   */
  private generateSchemaName<T>(schema: ZodSchema<T>): string {
    // Extract type information if available
    const def = (schema as { _def?: unknown })._def
    if (typeof def === 'object' && def !== null && 'typeName' in (def as Record<string, unknown>)) {
      const tn = (def as Record<string, unknown>).typeName as string
      return `${tn}_response`
    }
    
    return `structured_response_${Date.now()}`
  }

  /**
   * Infer JSON Schema structure from Zod schema
   */
  private inferJsonSchemaFromZod<T>(schema: ZodSchema<T>): {
    properties: Record<string, unknown>
    required: string[]
  } {
    // This is a basic implementation - you might want to use zod-to-json-schema
    // for more comprehensive schema conversion
    
    if (hasZodDef(schema)) {
      const def = schema._def
      
      if (def.typeName === 'ZodObject' && def.shape) {
        const properties: Record<string, unknown> = {}
        const required: string[] = []
        
        for (const [key, value] of Object.entries(def.shape())) {
          properties[key] = this.zodTypeToJsonSchema(value as ZodSchema<unknown>)
          
          // Check if field is required (not optional)
          if (hasZodDef(value) && value._def.typeName !== 'ZodOptional') {
            required.push(key)
          }
        }
        
        return { properties, required }
      }
    }
    
    return { properties: {}, required: [] }
  }

  /**
   * Convert individual Zod type to JSON Schema property
   */
  private zodTypeToJsonSchema(zodType: ZodSchema<unknown>): Record<string, unknown> {
    if (!hasZodDef(zodType)) {
      return { type: 'string' }
    }
    
    const def = zodType._def
    
    if (!def || !def.typeName) {
      return { type: 'string' }
    }
    
    switch (def.typeName) {
      case 'ZodString':
        return { type: 'string' }
      case 'ZodNumber':
        return { type: 'number' }
      case 'ZodBoolean':
        return { type: 'boolean' }
      case 'ZodArray':
        return { 
          type: 'array', 
          items: def.type ? this.zodTypeToJsonSchema(def.type) : { type: 'string' }
        }
      case 'ZodEnum':
        return { 
          type: 'string', 
          enum: def.values || []
        }
      case 'ZodLiteral':
        return { 
          type: typeof def.value,
          const: def.value
        }
      case 'ZodOptional':
        return def.innerType ? this.zodTypeToJsonSchema(def.innerType) : { type: 'string' }
      case 'ZodObject':
        const nested = this.inferJsonSchemaFromZod(zodType)
        return {
          type: 'object',
          properties: nested.properties,
          required: nested.required,
          additionalProperties: false
        }
      default:
        return { type: 'string' }
    }
  }

  /**
   * Retry mechanism for structured outputs
   */
  async generateWithRetry<T>(
    prompt: string,
    schema: ZodSchema<T>,
    config: StructuredOutputConfig = {},
    maxRetries: number = 3
  ): Promise<StructuredOutputResult<T>> {
    let lastError: Error | null = null
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await this.generateWithSchema(prompt, schema, config)
      } catch (error) {
        lastError = error as Error
        
        logger.warn('Structured output generation failed, retrying', {
          attempt,
          maxRetries,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
        
        if (attempt < maxRetries) {
          // Exponential backoff
          await new Promise(resolve => {
            const ms = 1000 * Math.pow(2, attempt - 1)
            if (process.env.NODE_ENV === 'test') return resolve(undefined)
            const t = setTimeout(resolve, ms)
            ;(t as { unref?: () => void }).unref?.()
          })
        }
      }
    }
    
    if (lastError) {
      throw new StructuredOutputError(
        'Persistent error',
        'PERSISTENT_ERROR',
        lastError
      )
    }
    throw new StructuredOutputError(
      'Persistent error',
      'PERSISTENT_ERROR'
    )
  }
}

// Export singleton instance
export const structuredOutputs = new StructuredOutputsService()

// Helper function for common use cases
export async function generateStructuredOutput<T>(
  prompt: string,
  schema: ZodSchema<T>,
  config?: StructuredOutputConfig
): Promise<StructuredOutputResult<T>> {
  return structuredOutputs.generateWithSchema(prompt, schema, config)
}
