/**
 * 📝 Notification Templates API
 * Manage notification templates with versioning and localization
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { NotificationChannel, NotificationType } from '@/lib/notifications/types'
import { safeAwait } from '@/lib/supabase/helpers'
import { logger } from '@/lib/monitoring/logger'
import type { TemplateRow } from '@/lib/notifications/db-types'

const createTemplateSchema = z.object({
  name: z.string().min(1).max(255),
  type: z.nativeEnum(NotificationType),
  channel: z.nativeEnum(NotificationChannel),
  subject: z.string().optional(),
  title: z.string().min(1),
  body: z.string().min(1),
  htmlBody: z.string().optional(),
  variables: z.record(z.string(), z.string()).optional().default({}),
  locale: z.string().min(2).max(10).optional().default('en'),
  isActive: z.boolean().optional().default(true)
})

const updateTemplateSchema = createTemplateSchema.partial()

const templateQuerySchema = z.object({
  type: z.nativeEnum(NotificationType).optional(),
  channel: z.nativeEnum(NotificationChannel).optional(),
  locale: z.string().optional(),
  isActive: z.boolean().optional(),
  search: z.string().optional(),
  limit: z.number().min(1).max(100).optional().default(50),
  offset: z.number().min(0).optional().default(0)
})

// GET - Retrieve notification templates
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse query parameters
    const url = new URL(request.url)
    const queryParams = Object.fromEntries(url.searchParams)
    
    // Convert boolean and number parameters
    const parsedQuery = {
      ...queryParams,
      isActive: queryParams.isActive ? queryParams.isActive === 'true' : undefined,
      limit: queryParams.limit ? parseInt(queryParams.limit) : 50,
      offset: queryParams.offset ? parseInt(queryParams.offset) : 0
    }

    const validatedQuery = templateQuerySchema.parse(parsedQuery)

    // Build query
    let query = supabase
      .from('notification_templates')
      .select(`
        id,
        name,
        type,
        channel,
        subject,
        title,
        body,
        html_body,
        variables,
        locale,
        is_active,
        version,
        created_at,
        updated_at,
        created_by
      `)

    // Apply filters
    if (validatedQuery.type) {
      query = query.eq('type', validatedQuery.type)
    }
    if (validatedQuery.channel) {
      query = query.eq('channel', validatedQuery.channel)
    }
    if (validatedQuery.locale) {
      query = query.eq('locale', validatedQuery.locale)
    }
    if (validatedQuery.isActive !== undefined) {
      query = query.eq('is_active', validatedQuery.isActive)
    }
    if (validatedQuery.search) {
      query = query.or(`name.ilike.%${validatedQuery.search}%,title.ilike.%${validatedQuery.search}%`)
    }

    // Apply pagination and ordering
    query = query
      .order('created_at', { ascending: false })
      .range(validatedQuery.offset, validatedQuery.offset + validatedQuery.limit - 1)

    const { data: templates, error } = await safeAwait<TemplateRow[] | null>(query)

    if (error) {
      logger.error('Failed to fetch notification templates', {
        userId: user.id,
        error: error.message
      })
      return NextResponse.json(
        { error: 'Failed to fetch templates' },
        { status: 500 }
      )
    }

    // Get total count for pagination
    const { count: totalCount } = await supabase
      .from('notification_templates')
      .select('id', { count: 'exact', head: true })

    return NextResponse.json({
      success: true,
      templates: templates?.map(template => ({
        id: template.id,
        name: template.name,
        type: template.type,
        channel: template.channel,
        subject: template.subject,
        title: template.title,
        body: template.body,
        htmlBody: template.html_body,
        variables: (template.variables as Record<string, string> | Record<string, unknown> | null) || {},
        locale: template.locale,
        isActive: template.is_active,
        version: template.version,
        createdAt: template.created_at,
        updatedAt: template.updated_at || null,
        createdBy: template.created_by || null
      })) || [],
      pagination: {
        total: totalCount || 0,
        limit: validatedQuery.limit,
        offset: validatedQuery.offset,
        hasMore: (totalCount || 0) > validatedQuery.offset + validatedQuery.limit
      }
    })

  } catch (error) {
    logger.error('Error in GET /api/notifications/templates', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: (error as z.ZodError).issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new notification template
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user has permission to create templates
    const { data: profile } = await safeAwait<{ role?: string } | null>(
      supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()
    )

    if (!profile || !['admin', 'editor', 'system'].includes((profile.role ?? ''))) {
      return NextResponse.json(
        { error: 'Insufficient permissions to create templates' },
        { status: 403 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = createTemplateSchema.parse(body)

    // Check if template with same name already exists
    const { data: existingTemplate } = await safeAwait<{ id: string } | null>(
      supabase
        .from('notification_templates')
        .select('id')
        .eq('name', validatedData.name)
        .eq('locale', validatedData.locale)
        .single()
    )

    if (existingTemplate) {
      return NextResponse.json(
        { error: 'Template with this name and locale already exists' },
        { status: 409 }
      )
    }

    // Validate template variables
    const validationResult = validateTemplateVariables(validatedData.body, validatedData.variables)
    if (!validationResult.isValid) {
      return NextResponse.json(
        { 
          error: 'Template validation failed', 
          details: validationResult.errors 
        },
        { status: 400 }
      )
    }

    // Create template
    const templateId = crypto.randomUUID()
    const { error } = await safeAwait(
      supabase
        .from('notification_templates')
        .insert({
        id: templateId,
        name: validatedData.name,
        type: validatedData.type,
        channel: validatedData.channel,
        subject: validatedData.subject,
        title: validatedData.title,
        body: validatedData.body,
        html_body: validatedData.htmlBody,
        variables: validatedData.variables,
        locale: validatedData.locale,
        is_active: validatedData.isActive,
        version: 1,
        created_by: user.id,
        created_at: new Date(),
        updated_at: new Date()
        })
    )

    if (error) {
      logger.error('Failed to create notification template', {
        userId: user.id,
        templateName: validatedData.name,
        error: error.message
      })
      return NextResponse.json(
        { error: 'Failed to create template' },
        { status: 500 }
      )
    }

    logger.info('Notification template created', {
      templateId,
      name: validatedData.name,
      type: validatedData.type,
      channel: validatedData.channel,
      createdBy: user.id
    })

    return NextResponse.json({
      success: true,
      templateId,
      message: 'Template created successfully'
    }, { status: 201 })

  } catch (error) {
    logger.error('Error in POST /api/notifications/templates', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: (error as z.ZodError).issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update notification template
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check permissions
    const { data: profile } = await safeAwait<{ role?: string } | null>(
      supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()
    )

    if (!profile || !['admin', 'editor', 'system'].includes((profile.role ?? ''))) {
      return NextResponse.json(
        { error: 'Insufficient permissions to update templates' },
        { status: 403 }
      )
    }

    // Get template ID from URL
    const url = new URL(request.url)
    const templateId = url.searchParams.get('id')

    if (!templateId) {
      return NextResponse.json(
        { error: 'Template ID is required' },
        { status: 400 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = updateTemplateSchema.parse(body)

    // Get existing template
    type TemplateRow = {
      id: string
      name: string
      type: string
      channel: string
      subject?: string | null
      title: string
      body: string
      html_body?: string | null
      variables?: Record<string, string> | null
      locale: string
      is_active: boolean
      version: number
      updated_at?: string
    }
    const { data: existingTemplate, error: fetchError } = await safeAwait<TemplateRow | null>(
      supabase
        .from('notification_templates')
        .select('*')
        .eq('id', templateId)
        .single()
    )

    if (fetchError || !existingTemplate) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      )
    }

    // Validate template variables if body is being updated
    if (validatedData.body) {
      const variables = validatedData.variables || existingTemplate.variables || {}
      const validationResult = validateTemplateVariables(validatedData.body, variables)
      if (!validationResult.isValid) {
        return NextResponse.json(
          { 
            error: 'Template validation failed', 
            details: validationResult.errors 
          },
          { status: 400 }
        )
      }
    }

    // Create new version by copying existing template and updating
    const newVersion = existingTemplate.version + 1
    const updatedTemplate = {
      ...existingTemplate,
      ...validatedData,
      version: newVersion,
      updated_at: new Date()
    }

    // Update template
    const { error: updateError } = await safeAwait(
      supabase
        .from('notification_templates')
        .update({
          name: updatedTemplate.name,
          type: updatedTemplate.type,
          channel: updatedTemplate.channel,
          subject: updatedTemplate.subject,
          title: updatedTemplate.title,
          body: updatedTemplate.body,
          html_body: updatedTemplate.htmlBody || updatedTemplate.html_body,
          variables: updatedTemplate.variables,
          locale: updatedTemplate.locale,
          is_active: updatedTemplate.isActive ?? updatedTemplate.is_active,
          version: newVersion,
          updated_at: new Date()
        })
        .eq('id', templateId)
    )

    if (updateError) {
      logger.error('Failed to update notification template', {
        templateId,
        userId: user.id,
        error: updateError.message
      })
      return NextResponse.json(
        { error: 'Failed to update template' },
        { status: 500 }
      )
    }

    logger.info('Notification template updated', {
      templateId,
      newVersion,
      updatedBy: user.id,
      updatedFields: Object.keys(validatedData)
    })

    return NextResponse.json({
      success: true,
      templateId,
      newVersion,
      message: 'Template updated successfully'
    })

  } catch (error) {
    logger.error('Error in PUT /api/notifications/templates', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: (error as z.ZodError).issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete notification template
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check permissions
    const { data: profile } = await safeAwait<{ role?: string } | null>(
      supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()
    )

    if (!profile || !['admin', 'system'].includes((profile.role ?? ''))) {
      return NextResponse.json(
        { error: 'Insufficient permissions to delete templates' },
        { status: 403 }
      )
    }

    // Get template ID from URL
    const url = new URL(request.url)
    const templateId = url.searchParams.get('id')

    if (!templateId) {
      return NextResponse.json(
        { error: 'Template ID is required' },
        { status: 400 }
      )
    }

    // Check if template exists
    const { data: existingTemplate } = await safeAwait<{ id: string; name: string } | null>(
      supabase
        .from('notification_templates')
        .select('id, name')
        .eq('id', templateId)
        .single()
    )

    if (!existingTemplate) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      )
    }

    // Check if template is being used by active notifications
    const { count: activeUsageCount } = await supabase
      .from('notifications')
      .select('id', { count: 'exact', head: true })
      .eq('template_id', templateId)
      .in('status', ['pending', 'queued', 'sending'])

    if (activeUsageCount && activeUsageCount > 0) {
      return NextResponse.json(
        { 
          error: 'Cannot delete template that is being used by active notifications',
          activeUsage: activeUsageCount
        },
        { status: 409 }
      )
    }

    // Soft delete by setting is_active to false instead of hard delete
    const { error: updateError } = await safeAwait(
      supabase
        .from('notification_templates')
        .update({
          is_active: false,
          updated_at: new Date()
        })
        .eq('id', templateId)
    )

    if (updateError) {
      logger.error('Failed to delete notification template', {
        templateId,
        userId: user.id,
        error: updateError.message
      })
      return NextResponse.json(
        { error: 'Failed to delete template' },
        { status: 500 }
      )
    }

    logger.info('Notification template deleted', {
      templateId,
      templateName: existingTemplate.name,
      deletedBy: user.id
    })

    return NextResponse.json({
      success: true,
      message: 'Template deleted successfully'
    })

  } catch (error) {
    logger.error('Error in DELETE /api/notifications/templates', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper function to validate template variables
function validateTemplateVariables(body: string, variables: Record<string, string>) {
  const errors: string[] = []
  
  // Find all variables in the template body ({{variable}} format)
  const templateVariables = body.match(/\{\{([^}]+)\}\}/g) || []
  const requiredVariables = templateVariables.map(v => v.slice(2, -2).trim())
  
  // Check for undefined variables
  const undefinedVariables = requiredVariables.filter(v => !(v in variables))
  if (undefinedVariables.length > 0) {
    errors.push(`Undefined variables: ${undefinedVariables.join(', ')}`)
  }
  
  // Check for unused variables
  const unusedVariables = Object.keys(variables).filter(v => !requiredVariables.includes(v))
  if (unusedVariables.length > 0) {
    errors.push(`Unused variables: ${unusedVariables.join(', ')}`)
  }

  // Validate variable names (should be alphanumeric with underscores)
  const invalidVariables = requiredVariables.filter(v => !/^[a-zA-Z0-9_]+$/.test(v))
  if (invalidVariables.length > 0) {
    errors.push(`Invalid variable names: ${invalidVariables.join(', ')}`)
  }

  return {
    isValid: errors.length === 0,
    errors,
    requiredVariables,
    unusedVariables
  }
}
