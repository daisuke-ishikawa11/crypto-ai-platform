'use client'

import * as React from "react"
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import PlanCard from './plan-card'
import { getAllPlans, calculateYearlySavings, formatPrice } from '@/lib/pricing/plan-definitions'
import type { Database } from '@/lib/supabase/types'
import { cn } from '@/lib/utils'

type UserPlan = Database['public']['Tables']['user_profiles']['Row']['role']

interface PricingSectionProps {
  currentPlan?: UserPlan
  onSelectPlan?: (planId: string) => void
  isLoading?: boolean
  className?: string
  showTitle?: boolean
  showToggle?: boolean
}

export default function PricingSection({
  currentPlan,
  onSelectPlan,
  isLoading = false,
  className,
  showTitle = true,
  showToggle = true
}: PricingSectionProps) {
  const [isYearly, setIsYearly] = React.useState(false)
  const plans = getAllPlans()
  
  const handleToggle = (checked: boolean) => {
    setIsYearly(checked)
  }

  return (
    <section className={cn('py-16 md:py-20 px-4', className)}>
      <div className="container mx-auto">
        {/* Header */}
        {showTitle && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              あなたに最適なプランを選択
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              無料プランから始めて、必要に応じてアップグレード
            </p>
          </div>
        )}

        {/* Billing Toggle */}
        {showToggle && (
          <div className="flex items-center justify-center mb-8">
            <Card className="p-4">
              <CardContent className="p-0">
                <div className="flex items-center space-x-4">
                  <Label htmlFor="billing-toggle" className="text-sm font-medium">
                    月額プラン
                  </Label>
                  <Switch
                    id="billing-toggle"
                    checked={isYearly}
                    onCheckedChange={handleToggle}
                  />
                  <Label htmlFor="billing-toggle" className="text-sm font-medium">
                    年額プラン
                  </Label>
                  {isYearly && (
                    <Badge variant="secondary" className="ml-2">
                      最大17%お得
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-5 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              currentPlan={currentPlan}
              isYearly={isYearly}
              onSelectPlan={onSelectPlan}
              isLoading={isLoading}
              className={cn(
                'transition-all duration-300',
                plan.popular && 'lg:scale-105 z-10'
              )}
            />
          ))}
        </div>

        {/* Savings Calculator */}
        {isYearly && (
          <div className="mt-12 text-center">
            <div className="inline-block bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">年間プランの節約額</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                {plans.filter(p => p.price.monthly > 0).map((plan) => {
                  const savings = calculateYearlySavings(plan)
                  return (
                    <div key={plan.id} className="text-center">
                      <div className="font-medium text-green-700">{plan.displayName}</div>
                      <div className="text-green-600">{formatPrice(savings)}/年</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Feature Comparison Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            すべてのプランで85レッスンの学習コンテンツとモバイルアプリが利用可能
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            <span>• 30日間返金保証</span>
            <span>• いつでもプラン変更可能</span>
            <span>• 自動更新はありません</span>
          </div>
        </div>

        {/* Enterprise Note */}
        <div className="mt-8 text-center">
          <Card className="inline-block bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-blue-800 mb-2">
                企業・機関投資家向けプラン
              </h3>
              <p className="text-sm text-blue-700 mb-3">
                カスタマイズされたソリューションをご提供いたします
              </p>
              <div className="text-sm text-blue-600">
                お問い合わせ: enterprise@crypto-ai-platform.com
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
