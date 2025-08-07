import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import { apiLogger } from '@/lib/monitoring/logger'

export async function createMiddlewareClient(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  return { supabase, response }
}

export async function getUserFromRequest(request: NextRequest) {
  const { supabase } = await createMiddlewareClient(request)
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      apiLogger.warn('Failed to get user from request', {
        error: error.message,
        path: request.nextUrl.pathname,
        action: 'get_user_from_request'
      })
      return null
    }
    
    return user
  } catch (error) {
    apiLogger.error('Unexpected error getting user from request', {
      error: error instanceof Error ? error.message : 'Unknown error',
      path: request.nextUrl.pathname,
      action: 'get_user_from_request'
    })
    return null
  }
}

export interface RouteConfig {
  path: string
  requireAuth: boolean
  requiredFeature?: string
  allowedPlans?: string[]
  redirectTo?: string
}

export const ROUTE_CONFIGS: RouteConfig[] = [
  // Public routes
  { path: '/', requireAuth: false },
  { path: '/auth/login', requireAuth: false },
  { path: '/auth/register', requireAuth: false },
  
  // Public API routes
  { path: '/api/health', requireAuth: false },
  { path: '/api/market/global', requireAuth: false },
  { path: '/api/market/binance', requireAuth: false },
  { path: '/api/market/coinmarketcap', requireAuth: false },
  
  // Protected API routes
  { path: '/api/market/analysis', requireAuth: true, requiredFeature: 'market_insights' },
  { path: '/api/market/realtime', requireAuth: true },
  { path: '/api/portfolio/optimize', requireAuth: true, requiredFeature: 'portfolio_analysis' },
  { path: '/api/risk/analysis', requireAuth: true, requiredFeature: 'market_insights' },
  { path: '/api/ai/chat', requireAuth: true, requiredFeature: 'ai_chats' },
  { path: '/api/ai/prediction', requireAuth: true, requiredFeature: 'ai_chats' },
  { path: '/api/explainable-ai/analyze', requireAuth: true, requiredFeature: 'ai_chats' },
  
  // Protected routes
  { path: '/dashboard', requireAuth: true },
  { path: '/ai/chat', requireAuth: true, requiredFeature: 'ai_chats' },
  { path: '/market/analysis', requireAuth: true, requiredFeature: 'market_insights' },
  { path: '/portfolio/optimize', requireAuth: true, requiredFeature: 'portfolio_analysis' },
  { path: '/risk/dashboard', requireAuth: true, requiredFeature: 'market_insights' },
  { path: '/explainable-ai', requireAuth: true, requiredFeature: 'ai_chats' },
  { path: '/learning', requireAuth: true },
  
  // Premium features
  { path: '/api/premium', requireAuth: true, allowedPlans: ['standard', 'pro'] },
]

export function getRouteConfig(pathname: string): RouteConfig | null {
  // Find exact match first
  const exactMatch = ROUTE_CONFIGS.find(config => config.path === pathname)
  if (exactMatch) return exactMatch
  
  // Find prefix match
  const prefixMatch = ROUTE_CONFIGS.find(config => 
    pathname.startsWith(config.path) && config.path !== '/'
  )
  
  return prefixMatch || null
}

export function isProtectedRoute(pathname: string): boolean {
  const config = getRouteConfig(pathname)
  return config?.requireAuth ?? false
}

export function getRedirectPath(pathname: string, isAuthenticated: boolean): string | null {
  const config = getRouteConfig(pathname)
  
  if (!config) return null
  
  if (config.requireAuth && !isAuthenticated) {
    return config.redirectTo || '/auth/login'
  }
  
  return null
}

export function shouldRedirect(
  pathname: string,
  isAuthenticated: boolean,
  userPlan?: string
): { shouldRedirect: boolean; redirectTo?: string; reason?: string } {
  const config = getRouteConfig(pathname)
  
  if (!config) {
    return { shouldRedirect: false }
  }
  
  // Check authentication
  if (config.requireAuth && !isAuthenticated) {
    return {
      shouldRedirect: true,
      redirectTo: config.redirectTo || '/auth/login',
      reason: 'authentication_required'
    }
  }
  
  // Check plan requirements
  if (config.allowedPlans && userPlan && !config.allowedPlans.includes(userPlan)) {
    return {
      shouldRedirect: true,
      redirectTo: '/dashboard?upgrade=true',
      reason: 'plan_upgrade_required'
    }
  }
  
  return { shouldRedirect: false }
}

export function logAuthEvent(
  type: 'redirect' | 'access_granted' | 'access_denied',
  details: {
    pathname: string
    userId?: string
    userPlan?: string
    reason?: string
    requestId?: string
  }
) {
  const { pathname, userId, userPlan, reason, requestId } = details
  
  if (type === 'redirect') {
    apiLogger.warn('Auth redirect required', {
      requestId,
      pathname,
      userId,
      userPlan,
      reason,
      action: 'auth_redirect'
    })
  } else if (type === 'access_denied') {
    apiLogger.warn('Access denied', {
      requestId,
      pathname,
      userId,
      userPlan,
      reason,
      action: 'access_denied'
    })
  } else {
    apiLogger.info('Access granted', {
      requestId,
      pathname,
      userId,
      userPlan,
      action: 'access_granted'
    })
  }
}