import { NextRequest, NextResponse } from 'next/server'
import { LineIntegrationService } from '@/lib/services/line-integration'
import { createHmac } from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('x-line-signature')
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      )
    }

    const body = await request.text()
    
    // LINE署名検証
    const isValidSignature = validateLineSignature(body, signature)
    if (!isValidSignature) {
      console.warn('Invalid LINE webhook signature')
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }

    const data = JSON.parse(body)
    const events = data.events || []

    if (events.length === 0) {
      return NextResponse.json({ message: 'No events to process' })
    }

    // LINE Integration Serviceでイベント処理
    const lineService = new LineIntegrationService()
    await lineService.handleWebhook(events)

    return NextResponse.json({
      success: true,
      processedEvents: events.length,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('LINE webhook processing failed:', error)
    return NextResponse.json(
      { 
        error: 'Webhook processing failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * LINE署名検証
 */
function validateLineSignature(body: string, signature: string): boolean {
  const channelSecret = process.env.LINE_CHANNEL_SECRET
  if (!channelSecret) {
    console.error('LINE_CHANNEL_SECRET is not configured')
    return false
  }

  const hash = createHmac('sha256', channelSecret)
    .update(body)
    .digest('base64')

  return signature === hash
}