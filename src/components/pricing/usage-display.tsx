'use client'

import * as React from "react"
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertCircle, TrendingUp, MessageSquare, BarChart3, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getPlanDefinition } from '@/lib/pricing/plan-definitions'
import type { Database } from '@/lib/supabase/types'

// DB上は user_profiles を利用
type UserPlan = Database['public']['Tables']['user_profiles']['Row']['role'] extends infer R
  ? R extends 'user' | 'admin' | 'premium' ? 'free' | 'mini' | 'basic' | 'standard' | 'pro' : 'free'
  : 'free'

interface UsageData {
  feature: string
  used: number
  limit: number | null
  remaining: number | null
  percentage: number
}

interface UsageDisplayProps {
  userId: string
  currentPlan: UserPlan
  onUpgradeClick?: () => void
  className?: string
}

const featureIcons = {
  ai_chats: MessageSquare,
  portfolio_analysis: BarChart3,
  market_insights: TrendingUp
}

const featureNames = {
  ai_chats: 'AIチャット',
  portfolio_analysis: 'ポートフォリオ分析',
  market_insights: '市場分析'
}

export default function UsageDisplay({
  userId,
  currentPlan,
  onUpgradeClick,
  className
}: UsageDisplayProps) {
  const [usageData, setUsageData] = React.useState<UsageData[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  
  const planDefinition = getPlanDefinition(currentPlan)

  React.useEffect(() => {
    fetchUsageData()
  }, [userId, currentPlan])

  const fetchUsageData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch(`/api/usage/${userId}`)
      if (!response.ok) {
        throw new Error('使用量データの取得に失敗しました')
      }
      
      const data = await response.json()
      
      // Transform data for display
      interface Usage { today: { used: number; limit: number | null; remaining?: number | null } }
      
      const transformedData: UsageData[] = Object.entries((data.usage as Record<string, Usage>) || {}).map(([feature, usage]: [string, Usage]) => {
        const todayUsed = usage.today.used
        const todayLimit = usage.today.limit
        const percentage = todayLimit ? (todayUsed / todayLimit) * 100 : 0
        
        return {
          feature,
          used: todayUsed,
          limit: todayLimit,
          remaining: usage.today.remaining ?? (todayLimit !== null ? Math.max(0, todayLimit - todayUsed) : null),
          percentage
        }
      })
      
      setUsageData(transformedData)
    } catch (err) {
      setError(err instanceof Error ? err.message : '使用量データの取得に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (percentage: number): string => {
    if (percentage >= 90) return 'text-red-500'
    if (percentage >= 70) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getProgressColor = (percentage: number): string => {
    if (percentage >= 90) return 'bg-red-500'
    if (percentage >= 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const hasLimitWarning = usageData.some(item => item.percentage >= 80)
  const hasLimitExceeded = usageData.some(item => item.percentage >= 100)

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            <CardTitle>使用量</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-2 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <CardTitle>エラー</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-600">{error}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchUsageData}
            className="mt-2"
          >
            再試行
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            <CardTitle>本日の使用量</CardTitle>
          </div>
          <Badge variant="outline" className={cn(
            'text-xs',
            planDefinition.color === 'gold' && 'border-yellow-500 text-yellow-700',
            planDefinition.color === 'purple' && 'border-purple-500 text-purple-700',
            planDefinition.color === 'green' && 'border-green-500 text-green-700',
            planDefinition.color === 'blue' && 'border-blue-500 text-blue-700',
            planDefinition.color === 'gray' && 'border-gray-500 text-gray-700'
          )}>
            {planDefinition.displayName}
          </Badge>
        </div>
        <CardDescription>
          プランの制限内での使用状況
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {usageData.map((item) => {
            const IconComponent = featureIcons[item.feature as keyof typeof featureIcons]
            const featureName = featureNames[item.feature as keyof typeof featureNames]
            
            return (
              <div key={item.feature} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4" />
                    <span className="text-sm font-medium">{featureName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      'text-xs font-medium',
                      getStatusColor(item.percentage)
                    )}>
                      {item.limit === null ? (
                        '無制限'
                      ) : (
                        `${item.used}/${item.limit}`
                      )}
                    </span>
                    {item.limit !== null && (
                      <span className="text-xs text-muted-foreground">
                        ({item.percentage.toFixed(0)}%)
                      </span>
                    )}
                  </div>
                </div>
                
                {item.limit !== null && (
                  <div className="space-y-1">
                    <Progress
                      value={item.percentage}
                      className="h-2"
                    />
                    {item.remaining !== null && item.remaining <= 2 && (
                      <div className="flex items-center gap-1 text-xs text-yellow-600">
                        <AlertCircle className="w-3 h-3" />
                        <span>残り{item.remaining}回</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        
        {/* Upgrade suggestion */}
        {(hasLimitWarning || hasLimitExceeded) && onUpgradeClick && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">
                {hasLimitExceeded ? '制限に達しました' : '制限に近づいています'}
              </span>
            </div>
            <p className="text-xs text-yellow-700 mb-3">
              より多くの機能を利用するには、プランのアップグレードを検討してください。
            </p>
            <Button
              size="sm"
              onClick={onUpgradeClick}
              className="w-full"
            >
              プランをアップグレード
            </Button>
          </div>
        )}
        
        {/* Reset info */}
        <div className="mt-4 text-xs text-muted-foreground text-center">
          使用量は毎日00:00（JST）にリセットされます
        </div>
      </CardContent>
    </Card>
  )
}
