import { NextRequest, NextResponse } from 'next/server'
import { getServerUser } from '@/lib/supabase/server'
import { changePlan, canChangePlan } from '@/lib/pricing/plan-management'
import { apiLogger } from '@/lib/monitoring/logger'
import type { Database } from '@/lib/supabase/types'

type UserPlan = Database['public']['Tables']['users']['Row']['plan']

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID()
  
  try {
    // Get authenticated user
    const user = await getServerUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Parse request body
    const body = await request.json()
    const { planId, billingCycle = 'monthly' } = body
    
    if (!planId) {
      return NextResponse.json(
        { error: 'Plan ID is required' },
        { status: 400 }
      )
    }
    
    // Validate plan ID
    const validPlans: UserPlan[] = ['free', 'mini', 'basic', 'standard', 'pro']
    if (!validPlans.includes(planId)) {
      return NextResponse.json(
        { error: 'Invalid plan ID' },
        { status: 400 }
      )
    }
    
    // Check if plan change is allowed
    const canChange = await canChangePlan(user.id, planId)
    if (!canChange.canChange) {
      return NextResponse.json(
        { error: canChange.reason || 'Plan change not allowed' },
        { status: 400 }
      )
    }
    
    // Process plan change
    const result = await changePlan(user.id, planId, billingCycle)
    
    if (!result.success) {
      apiLogger.error('Plan change failed', {
        userId: user.id,
        planId,
        error: result.error,
        requestId,
        action: 'change_plan_api'
      })
      
      return NextResponse.json(
        { error: result.error || 'Plan change failed' },
        { status: 500 }
      )
    }
    
    apiLogger.info('Plan change successful', {
      userId: user.id,
      planId,
      requestId,
      action: 'change_plan_api'
    })
    
    return NextResponse.json({
      success: true,
      message: result.message
    })
    
  } catch (error) {
    apiLogger.error('Plan change API error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      requestId,
      action: 'change_plan_api'
    })
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}