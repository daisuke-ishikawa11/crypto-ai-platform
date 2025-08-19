'use client'

import * as React from "react"
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Sparkles, Crown, TrendingUp, Gift, Zap, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PlanDefinition } from '@/lib/pricing/plan-definitions'
import { formatPrice } from '@/lib/pricing/plan-definitions'

interface PlanCardProps {
  plan: PlanDefinition
  currentPlan?: string
  isYearly?: boolean
  onSelectPlan?: (planId: string) => void
  isLoading?: boolean
  className?: string
}

const iconMap = {
  Gift,
  Zap,
  TrendingUp,
  Crown,
  Sparkles
}

export default function PlanCard({
  plan,
  currentPlan,
  isYearly = false,
  onSelectPlan,
  isLoading = false,
  className
}: PlanCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  
  const IconComponent = iconMap[plan.icon as keyof typeof iconMap] || Sparkles
  const isCurrentPlan = currentPlan === plan.id
  const price = isYearly ? plan.price.yearly : plan.price.monthly
  const displayPrice = isYearly ? price / 12 : price
  
  const handleSelect = () => {
    if (onSelectPlan && !isCurrentPlan) {
      onSelectPlan(plan.id)
    }
  }

  return (
    <Card
      className={cn(
        'relative transition-all duration-300 cursor-pointer group',
        'hover:shadow-lg hover:scale-105',
        plan.popular && 'ring-2 ring-primary shadow-lg',
        isCurrentPlan && 'ring-2 ring-green-500 bg-green-50/50',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleSelect}
    >
      {/* Badge */}
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <Badge className={cn(
            'px-3 py-1 text-xs font-medium',
            plan.popular ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
          )}>
            {plan.badge}
          </Badge>
        </div>
      )}
      
      {/* Current Plan Badge */}
      {isCurrentPlan && (
        <div className="absolute -top-3 right-4 z-10">
          <Badge className="bg-green-500 text-white px-3 py-1 text-xs">
            現在のプラン
          </Badge>
        </div>
      )}

      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <div className={cn(
            'p-2 rounded-lg transition-all duration-300',
            `bg-gradient-to-r ${plan.gradient} bg-opacity-10`,
            isHovered && 'scale-110'
          )}>
            <IconComponent className={cn(
              'w-6 h-6 transition-colors duration-300',
              `text-${plan.color}-500`
            )} />
          </div>
          {plan.popular && (
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          )}
        </div>
        
        <CardTitle className="text-xl font-bold">
          {plan.displayName}
        </CardTitle>
        
        <CardDescription className="text-sm text-muted-foreground">
          {plan.description}
        </CardDescription>
        
        <div className="mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">
              {formatPrice(displayPrice)}
            </span>
            {price > 0 && (
              <span className="text-sm text-muted-foreground">
                /{isYearly ? '月' : '月'}
              </span>
            )}
          </div>
          
          {isYearly && price > 0 && plan.price.yearlyDiscount > 0 && (
            <div className="mt-1">
              <span className="text-sm text-green-600 font-medium">
                年間プランで{plan.price.yearlyDiscount}%お得
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* AI機能 */}
        <div className="mb-4">
          <h4 className="font-semibold text-sm mb-2">AI機能</h4>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span>
                AIチャット: {plan.features.ai_chats.daily === null ? '無制限' : `${plan.features.ai_chats.daily}回/日`}
              </span>
            </div>
            <div className="flex items-center text-sm">
              <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span>
                ポートフォリオ分析: {plan.features.portfolio_analysis.daily === null ? '無制限' : `${plan.features.portfolio_analysis.daily}回/日`}
              </span>
            </div>
            <div className="flex items-center text-sm">
              <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span>
                市場分析: {plan.features.market_insights.daily === null ? '無制限' : `${plan.features.market_insights.daily}回/日`}
              </span>
            </div>
          </div>
        </div>

        {/* 主要機能 */}
        <div className="mb-4">
          <h4 className="font-semibold text-sm mb-2">主要機能</h4>
          <div className="space-y-2">
            {plan.highlights.map((highlight, index) => (
              <div key={index} className="flex items-center text-sm">
                <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 高度な機能 */}
        {plan.features.advanced_features.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-sm mb-2">高度な機能</h4>
            <div className="space-y-2">
              {plan.features.advanced_features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-center text-sm">
                  <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
              {plan.features.advanced_features.length > 3 && (
                <div className="text-sm text-muted-foreground">
                  +{plan.features.advanced_features.length - 3}個の追加機能
                </div>
              )}
            </div>
          </div>
        )}

        {/* AIモデル */}
        <div className="mb-6">
          <h4 className="font-semibold text-sm mb-2">利用可能なAIモデル</h4>
          <div className="flex flex-wrap gap-1">
            {plan.features.ai_models.map((model, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {model}
              </Badge>
            ))}
          </div>
        </div>

        {/* サポートレベル */}
        <div className="mb-6">
          <div className="flex items-center text-sm">
            <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
            <span>
              {plan.features.support_level === 'community' && 'コミュニティサポート'}
              {plan.features.support_level === 'standard' && 'メールサポート'}
              {plan.features.support_level === 'priority' && '優先サポート'}
              {plan.features.support_level === 'premium' && 'プレミアムサポート'}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          className={cn(
            'w-full transition-all duration-300',
            isCurrentPlan && 'bg-green-500 hover:bg-green-600',
            plan.popular && !isCurrentPlan && 'bg-primary hover:bg-primary/90',
            !plan.popular && !isCurrentPlan && 'bg-secondary hover:bg-secondary/80'
          )}
          disabled={isLoading || isCurrentPlan}
          onClick={(e) => {
            e.stopPropagation()
            handleSelect()
          }}
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              処理中...
            </div>
          ) : isCurrentPlan ? (
            '現在のプラン'
          ) : (
            plan.id === 'free' ? '無料で始める' : 'プランを選択'
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
