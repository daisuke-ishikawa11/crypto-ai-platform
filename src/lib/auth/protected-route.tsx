'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { getUserProfile } from './user-creation'
import { hasAccessToFeature } from './permissions'
import type { Database } from '@/lib/supabase/types'

type UserPlan = Database['public']['Tables']['users']['Row']['plan']

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredFeature?: string
  fallbackPath?: string
  loadingComponent?: React.ComponentType
}

export default function ProtectedRoute({
  children,
  requiredFeature,
  fallbackPath = '/auth/login',
  loadingComponent: LoadingComponent
}: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasFeatureAccess, setHasFeatureAccess] = useState(false)
  const [userPlan, setUserPlan] = useState<UserPlan>('free')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          setIsAuthenticated(false)
          setIsLoading(false)
          router.push(fallbackPath)
          return
        }

        setIsAuthenticated(true)

        // Check feature access if required
        if (requiredFeature) {
          const userProfile = await getUserProfile(session.user.id)
          if (userProfile) {
            setUserPlan(userProfile.plan)
            const hasAccess = hasAccessToFeature(userProfile.plan, requiredFeature)
            setHasFeatureAccess(hasAccess)
            
            if (!hasAccess) {
              router.push('/dashboard?upgrade=true')
              return
            }
          }
        } else {
          setHasFeatureAccess(true)
        }

        setIsLoading(false)
      } catch (error) {
        console.error('Auth check failed:', error)
        setIsAuthenticated(false)
        setIsLoading(false)
        router.push(fallbackPath)
      }
    }

    checkAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        setIsAuthenticated(false)
        setHasFeatureAccess(false)
        router.push(fallbackPath)
      } else if (event === 'SIGNED_IN' && session) {
        setIsAuthenticated(true)
        await checkAuth()
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase, router, fallbackPath, requiredFeature])

  if (isLoading) {
    if (LoadingComponent) {
      return <LoadingComponent />
    }
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (requiredFeature && !hasFeatureAccess) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">アップグレードが必要です</h2>
          <p className="text-muted-foreground mb-4">
            この機能をご利用いただくには、プランのアップグレードが必要です。
          </p>
          <p className="text-sm text-muted-foreground">
            現在のプラン: {userPlan}
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

// HOC version
export function withAuth<T extends object>(
  Component: React.ComponentType<T>,
  requiredFeature?: string
) {
  return function AuthenticatedComponent(props: T) {
    return (
      <ProtectedRoute requiredFeature={requiredFeature}>
        <Component {...props} />
      </ProtectedRoute>
    )
  }
}