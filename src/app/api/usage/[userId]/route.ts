import { NextRequest, NextResponse } from 'next/server'
import { getServerUser } from '@/lib/supabase/server'
import { getUserUsageSummary } from '@/lib/auth/permissions'
import { apiLogger } from '@/lib/monitoring/logger'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const requestId = crypto.randomUUID()
  
  try {
    // Await params
    const { userId } = await params
    
    // Get authenticated user
    const user = await getServerUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Check if user can access this usage data
    if (user.id !== userId) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }
    
    // Get usage summary
    const usageSummary = await getUserUsageSummary(userId)
    
    if (!usageSummary) {
      return NextResponse.json(
        { error: 'Usage data not found' },
        { status: 404 }
      )
    }
    
    apiLogger.info('Usage data retrieved', {
      userId: userId,
      plan: usageSummary.plan,
      requestId,
      action: 'get_usage_api'
    })
    
    return NextResponse.json(usageSummary)
    
  } catch (error) {
    const { userId } = await params
    apiLogger.error('Usage API error', {
      userId: userId,
      error: error instanceof Error ? error.message : 'Unknown error',
      requestId,
      action: 'get_usage_api'
    })
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}