/**
 * ⚙️ User Notification Preferences API
 * Manage user notification preferences and settings
 */

import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { NotificationChannel, NotificationPriority, NotificationType } from '@/lib/notifications/types'
import { logger } from '@/lib/monitoring/logger'
import { safeAwait } from '@/lib/supabase/helpers'
import type { PreferencesRow } from '@/lib/notifications/db-types'

const channelPreferenceSchema = z.object({
  enabled: z.boolean(),
  minPriority: z.nativeEnum(NotificationPriority),
  allowedTypes: z.array(z.nativeEnum(NotificationType)),
  rateLimits: z.object({
    perMinute: z.number().min(0),
    perHour: z.number().min(0),
    perDay: z.number().min(0)
  }).optional(),
  deliveryOptions: z.record(z.string(), z.unknown()).optional().default({})
})

const updatePreferencesSchema = z.object({
  channels: z.object({
    [NotificationChannel.EMAIL]: channelPreferenceSchema.optional(),
    [NotificationChannel.PUSH]: channelPreferenceSchema.optional(),
    [NotificationChannel.SMS]: channelPreferenceSchema.optional(),
    [NotificationChannel.WEBHOOK]: channelPreferenceSchema.optional(),
    [NotificationChannel.IN_APP]: channelPreferenceSchema.optional(),
    [NotificationChannel.SLACK]: channelPreferenceSchema.optional(),
    [NotificationChannel.DISCORD]: channelPreferenceSchema.optional(),
    [NotificationChannel.TELEGRAM]: channelPreferenceSchema.optional()
  }).optional(),
  frequency: z.object({
    immediate: z.array(z.nativeEnum(NotificationType)).optional(),
    batched: z.array(z.nativeEnum(NotificationType)).optional(),
    disabled: z.array(z.nativeEnum(NotificationType)).optional()
  }).optional(),
  quietHours: z.object({
    enabled: z.boolean(),
    start: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/), // HH:mm format
    end: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),   // HH:mm format
    timezone: z.string()
  }).optional(),
  digestSettings: z.object({
    enabled: z.boolean(),
    frequency: z.enum(['daily', 'weekly', 'monthly']),
    time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/) // HH:mm format
  }).optional(),
  language: z.string().optional(),
  globalOptOut: z.boolean().optional(),
  contactInfo: z.object({
    email: z.string().email().optional(),
    phoneNumber: z.string().optional(),
    pushTokens: z.array(z.string()).optional(),
    webhookUrl: z.string().url().optional(),
    slackChannelId: z.string().optional(),
    discordChannelId: z.string().optional(),
    telegramChatId: z.string().optional()
  }).optional()
})

// GET - Retrieve user notification preferences
export async function GET() {
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

    // Get user preferences
    const { data: preferences, error } = await safeAwait<PreferencesRow | null>(
      supabase
        .from('user_notification_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single()
    )

    // safeAwaitのエラーは簡易形のため、レコード未存在（preferencesがnull/undefined）の場合は許容
    if (error && preferences) {
      logger.error('Failed to fetch user notification preferences', {
        userId: user.id,
        error: error.message
      })
      return NextResponse.json(
        { error: 'Failed to fetch preferences' },
        { status: 500 }
      )
    }

    // Return default preferences if none exist
    if (!preferences) {
      const defaultPreferences = {
        userId: user.id,
        channels: {
          [NotificationChannel.EMAIL]: {
            enabled: true,
            minPriority: NotificationPriority.NORMAL,
            allowedTypes: Object.values(NotificationType),
            rateLimits: { perMinute: 1, perHour: 20, perDay: 100 },
            deliveryOptions: {}
          },
          [NotificationChannel.PUSH]: {
            enabled: true,
            minPriority: NotificationPriority.NORMAL,
            allowedTypes: Object.values(NotificationType),
            rateLimits: { perMinute: 5, perHour: 50, perDay: 200 },
            deliveryOptions: {}
          },
          [NotificationChannel.SMS]: {
            enabled: false,
            minPriority: NotificationPriority.CRITICAL,
             allowedTypes: [NotificationType.RISK_WARNING],
            rateLimits: { perMinute: 1, perHour: 5, perDay: 10 },
            deliveryOptions: {}
          },
          [NotificationChannel.WEBHOOK]: {
            enabled: false,
            minPriority: NotificationPriority.NORMAL,
            allowedTypes: [],
            rateLimits: { perMinute: 10, perHour: 100, perDay: 1000 },
            deliveryOptions: {}
          },
          [NotificationChannel.IN_APP]: {
            enabled: true,
            minPriority: NotificationPriority.LOW,
            allowedTypes: Object.values(NotificationType),
            rateLimits: { perMinute: 10, perHour: 100, perDay: 500 },
            deliveryOptions: {}
          },
          [NotificationChannel.SLACK]: {
            enabled: false,
            minPriority: NotificationPriority.NORMAL,
            allowedTypes: [],
            rateLimits: { perMinute: 5, perHour: 50, perDay: 200 },
            deliveryOptions: {}
          },
          [NotificationChannel.DISCORD]: {
            enabled: false,
            minPriority: NotificationPriority.NORMAL,
            allowedTypes: [],
            rateLimits: { perMinute: 5, perHour: 50, perDay: 200 },
            deliveryOptions: {}
          },
          [NotificationChannel.TELEGRAM]: {
            enabled: false,
            minPriority: NotificationPriority.NORMAL,
            allowedTypes: [],
            rateLimits: { perMinute: 5, perHour: 50, perDay: 200 },
            deliveryOptions: {}
          }
        },
        frequency: {
          immediate: [
            NotificationType.RISK_WARNING,
            NotificationType.RISK_WARNING,
            NotificationType.PRICE_ALERT
          ],
          batched: [
            NotificationType.LESSON_COMPLETED,
            NotificationType.PORTFOLIO_UPDATE,
            NotificationType.MARKET_ANALYSIS
          ],
          disabled: []
        },
        quietHours: {
          enabled: false,
          start: '22:00',
          end: '08:00',
          timezone: 'UTC'
        },
        digestSettings: {
          enabled: false,
          frequency: 'daily',
          time: '09:00'
        },
        language: 'en',
        globalOptOut: false
      }

      return NextResponse.json({
        success: true,
        preferences: defaultPreferences
      })
    }

    // Return existing preferences
    return NextResponse.json({
      success: true,
      preferences: {
        userId: preferences.user_id,
        ...preferences.preferences,
        contactInfo: {
          email: preferences.email,
          phoneNumber: preferences.phone_number,
          pushTokens: preferences.push_tokens || [],
          webhookUrl: preferences.webhook_url,
          slackChannelId: preferences.slack_channel_id,
          discordChannelId: preferences.discord_channel_id,
          telegramChatId: preferences.telegram_chat_id
        },
        createdAt: preferences.created_at,
        updatedAt: preferences.updated_at
      }
    })

  } catch (error) {
    logger.error('Error in GET /api/notifications/preferences', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update user notification preferences
export async function PUT(request: Request) {
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

    // Parse and validate request body
    const body = await request.json()
    const validatedData = updatePreferencesSchema.parse(body)

    // Get existing preferences
    const { data: existingPreferences } = await safeAwait<{ preferences?: Record<string, unknown> } | null>(
      supabase
        .from('user_notification_preferences')
        .select('preferences')
        .eq('user_id', user.id)
        .single()
    )

    // Merge with existing preferences
    const updatedPreferences = {
      ...existingPreferences?.preferences || {},
      ...validatedData,
      channels: {
        ...existingPreferences?.preferences?.channels || {},
        ...validatedData.channels || {}
      },
      frequency: {
        ...existingPreferences?.preferences?.frequency || {},
        ...validatedData.frequency || {}
      }
    }

    // Extract contact info
    const contactInfo = validatedData.contactInfo || {}

    // Update or insert preferences
    const { error } = await safeAwait(
      supabase
        .from('user_notification_preferences')
        .upsert({
          user_id: user.id,
          preferences: updatedPreferences,
          email: contactInfo.email,
          phone_number: contactInfo.phoneNumber,
          push_tokens: contactInfo.pushTokens,
          webhook_url: contactInfo.webhookUrl,
          slack_channel_id: contactInfo.slackChannelId,
          discord_channel_id: contactInfo.discordChannelId,
          telegram_chat_id: contactInfo.telegramChatId,
          updated_at: new Date()
        })
    )

    if (error) {
      logger.error('Failed to update user notification preferences', {
        userId: user.id,
        error: error.message
      })
      return NextResponse.json(
        { error: 'Failed to update preferences' },
        { status: 500 }
      )
    }

    logger.info('User notification preferences updated', {
      userId: user.id,
      updatedFields: Object.keys(validatedData)
    })

    return NextResponse.json({
      success: true,
      message: 'Preferences updated successfully'
    })

  } catch (error) {
    logger.error('Error in PUT /api/notifications/preferences', {
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

// DELETE - Reset preferences to default
export async function DELETE() {
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

    // Delete user preferences (will trigger default behavior)
    const { error } = await safeAwait(
      supabase
        .from('user_notification_preferences')
        .delete()
        .eq('user_id', user.id)
    )

    if (error) {
      logger.error('Failed to reset user notification preferences', {
        userId: user.id,
        error: error.message
      })
      return NextResponse.json(
        { error: 'Failed to reset preferences' },
        { status: 500 }
      )
    }

    logger.info('User notification preferences reset to default', {
      userId: user.id
    })

    return NextResponse.json({
      success: true,
      message: 'Preferences reset to default successfully'
    })

  } catch (error) {
    logger.error('Error in DELETE /api/notifications/preferences', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
