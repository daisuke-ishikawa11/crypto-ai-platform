"use client"

import * as React from "react"
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  Lock, 
  Crown, 
  Zap, 
  Star,
  ArrowRight,
  Check,
  X,
  Info,
  TrendingUp
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { SubscriptionTier } from '@crypto/defi'
import { DeFiUserTierManager } from '@/lib/defi/user-tier-manager'

// 型安全に DeFiUserTierManager の必要メソッドだけを取り出すヘルパー
type DeFiManagerLike = {
  checkFeatureAccess?: (profile: unknown, featureType: string, requestedValue?: unknown) => { allowed: boolean; reason?: string }
  getFeatureLimitations?: (tier: SubscriptionTier) => { limitations: { portfolioSize: number; customAlerts: number; advancedAnalytics: boolean; yieldPredictions: boolean; aiRecommendations: boolean } }
}

function pickDeFiManager(obj: unknown): DeFiManagerLike {
  const result: DeFiManagerLike = {}
  if (obj && typeof obj === 'object') {
    const rec = obj as Record<string, unknown>
    const cfa = rec.checkFeatureAccess
    if (typeof cfa === 'function') {
      result.checkFeatureAccess = cfa as DeFiManagerLike['checkFeatureAccess']
    }
    const gfl = rec.getFeatureLimitations
    if (typeof gfl === 'function') {
      result.getFeatureLimitations = gfl as DeFiManagerLike['getFeatureLimitations']
    }
  }
  return result
}

interface FreemiumAccessControlProps {
  userId: string
  featureType: 'protocolAccess' | 'advancedAnalytics' | 'customAlerts' | 'portfolioSize' | 'historicalData' | 'yieldPredictions' | 'aiRecommendations'
  requestedValue?: unknown
  children: React.ReactNode
  fallbackContent?: React.ReactNode
  showUpgradePrompt?: boolean
}

interface UpgradePromptProps {
  currentTier: SubscriptionTier
  featureType: string
  onUpgrade: (tier: SubscriptionTier) => void
}

interface UsageStatsProps {
  userId: string
}

export default function FreemiumAccessControl({
  userId,
  featureType,
  requestedValue,
  children,
  fallbackContent,
  showUpgradePrompt = true
}: FreemiumAccessControlProps) {
  const { data: userProfile, isLoading } = useQuery({
    queryKey: ['defi-user-profile', userId],
    queryFn: async () => {
      const response = await fetch(`/api/defi/user-profile/${userId}`)
      if (!response.ok) throw new Error('Failed to fetch user profile')
      return response.json()
    }
  })

  const { data: usageStats } = useQuery({
    queryKey: ['defi-usage-stats', userId],
    queryFn: async () => {
      const response = await fetch(`/api/defi/usage-stats/${userId}`)
      if (!response.ok) throw new Error('Failed to fetch usage stats')
      return response.json()
    }
  })

  if (isLoading) {
    return <div className="animate-pulse bg-gray-200 rounded-lg h-32" />
  }

  if (!userProfile) {
    return fallbackContent || <div>プロファイル情報を読み込めませんでした</div>
  }

  const manager = pickDeFiManager(DeFiUserTierManager)

  const accessCheck = typeof manager.checkFeatureAccess === 'function'
    ? manager.checkFeatureAccess(userProfile, featureType, requestedValue)
    : { allowed: false, reason: 'アクセスが制限されています' };

  // アクセス許可の場合は通常のコンテンツを表示
  if (accessCheck.allowed) {
    return <>{children}</>
  }

  // アクセス拒否の場合はアップグレードプロンプトを表示
  return (
    <div className="relative">
      {/* オーバーレイ */}
      <div className="relative opacity-30 pointer-events-none">
        {children}
      </div>
      
      {/* アップグレードプロンプト */}
      <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-lg">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <Crown className="h-12 w-12 text-yellow-500" />
            </div>
            <CardTitle className="text-xl">プレミアム機能</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Lock className="h-4 w-4" />
              <AlertDescription>{'reason' in accessCheck ? (accessCheck as { reason?: string }).reason ?? 'アクセスが制限されています' : 'アクセスが制限されています'}</AlertDescription>
            </Alert>

            {showUpgradePrompt && (
              <UpgradePrompt
                currentTier={userProfile.subscriptionTier}
                featureType={featureType}
                onUpgrade={(tier) => {
                  // アップグレード処理
                  window.location.href = `/upgrade?tier=${tier}&feature=${featureType}`
                }}
              />
            )}

            {usageStats?.upgradeRecommended && (
              <Alert className="border-yellow-300 bg-yellow-50">
                <TrendingUp className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  あなたの使用パターンからプレミアムプランがおすすめです！
                  <br />
                  <span className="text-sm">転換スコア: {usageStats.conversionScore}/100</span>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function UpgradePrompt({ featureType, onUpgrade }: UpgradePromptProps) {
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier>(SubscriptionTier.PREMIUM)

  const tiers = [
    {
      tier: SubscriptionTier.PREMIUM,
      name: 'プレミアム',
      price: '¥2,980/月',
      icon: <Star className="h-5 w-5" />,
      color: 'bg-blue-500',
      features: [
        '全プロトコルアクセス',
        '詳細リスク分析',
        'AI予測機能',
        'カスタムアラート25個',
        '90日間の履歴データ'
      ]
    },
    {
      tier: SubscriptionTier.PROFESSIONAL,
      name: 'プロフェッショナル',
      price: '¥5,980/月',
      icon: <Zap className="h-5 w-5" />,
      color: 'bg-purple-500',
      features: [
        'プレミアムの全機能',
        '無制限アラート',
        '365日間の履歴データ',
        '包括的リスク分析',
        '優先サポート',
        'API アクセス'
      ]
    }
  ]

  const getFeatureBenefit = (featureType: string): string => {
    const benefits: Record<string, string> = {
      protocolAccess: '全DeFiプロトコルへの無制限アクセス',
      advancedAnalytics: '高度な分析ツールとAI予測',
      customAlerts: '詳細なカスタムアラート設定',
      portfolioSize: '大規模ポートフォリオ管理',
      historicalData: '長期間の履歴データ分析',
      yieldPredictions: 'AI による収益予測',
      aiRecommendations: 'パーソナライズされたAI推奨'
    }
    return benefits[featureType] || '高度な機能'
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">
          {getFeatureBenefit(featureType)}を解放
        </h3>
        <p className="text-sm text-gray-600">
          プランをアップグレードして、より高度なDeFi投資機能をお楽しみください
        </p>
      </div>

      <div className="space-y-3">
        {tiers.map((tier) => (
          <Card 
            key={tier.tier}
            className={`cursor-pointer border-2 transition-all ${
              selectedTier === tier.tier 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedTier(tier.tier)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-full text-white ${tier.color}`}>
                    {tier.icon}
                  </div>
                  <div>
                    <div className="font-semibold">{tier.name}</div>
                    <div className="text-sm text-gray-600">{tier.price}</div>
                  </div>
                </div>
                {selectedTier === tier.tier && (
                  <Check className="h-5 w-5 text-blue-500" />
                )}
              </div>

              <div className="space-y-1">
                {tier.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <Check className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
                {tier.features.length > 3 && (
                  <div className="text-xs text-gray-500">
                    +{tier.features.length - 3}個の追加機能
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button 
        onClick={() => onUpgrade(selectedTier)}
        className="w-full"
        size="lg"
      >
        {selectedTier === SubscriptionTier.PREMIUM ? 'プレミアムに' : 'プロフェッショナルに'}アップグレード
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

      <div className="text-center">
        <p className="text-xs text-gray-500">
          いつでもキャンセル可能 • 30日間返金保証
        </p>
      </div>
    </div>
  )
}

export function UsageStats({ userId }: UsageStatsProps) {
  const { data: stats } = useQuery({
    queryKey: ['defi-usage-stats', userId],
    queryFn: async () => {
      const response = await fetch(`/api/defi/usage-stats/${userId}`)
      if (!response.ok) throw new Error('Failed to fetch usage stats')
      return response.json()
    }
  })

  const { data: userProfile } = useQuery({
    queryKey: ['defi-user-profile', userId],
    queryFn: async () => {
      const response = await fetch(`/api/defi/user-profile/${userId}`)
      if (!response.ok) throw new Error('Failed to fetch user profile')
      return response.json()
    }
  })

  if (!stats || !userProfile) return null

  const deFiManager = pickDeFiManager(DeFiUserTierManager)
  const limitations = typeof deFiManager.getFeatureLimitations === 'function'
    ? deFiManager.getFeatureLimitations(userProfile.subscriptionTier)
    : { limitations: { portfolioSize: -1, customAlerts: -1, advancedAnalytics: false, yieldPredictions: false, aiRecommendations: false } }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Info className="mr-2 h-5 w-5" />
          あなたの使用状況
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* プロトコルアクセス */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>プロトコルアクセス</span>
            <span>{stats.protocolsAccessed}/{limitations.limitations.portfolioSize === -1 ? '無制限' : limitations.limitations.portfolioSize}</span>
          </div>
          {limitations.limitations.portfolioSize !== -1 && (
            <Progress 
              value={(stats.protocolsAccessed / limitations.limitations.portfolioSize) * 100} 
              className="h-2"
            />
          )}
        </div>

        {/* カスタムアラート */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>カスタムアラート</span>
            <span>{stats.alertsSet}/{limitations.limitations.customAlerts === -1 ? '無制限' : limitations.limitations.customAlerts}</span>
          </div>
          {limitations.limitations.customAlerts !== -1 && (
            <Progress 
              value={(stats.alertsSet / limitations.limitations.customAlerts) * 100} 
              className="h-2"
            />
          )}
        </div>

        {/* 転換スコア */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>活用度スコア</span>
            <span>{stats.conversionScore}/100</span>
          </div>
          <Progress value={stats.conversionScore} className="h-2" />
          {stats.upgradeRecommended && (
            <p className="text-xs text-blue-600">
              プレミアムプランでさらに活用できます！
            </p>
          )}
        </div>

        {/* プランの機能制限表示 */}
        <div className="pt-4 border-t">
          <h4 className="font-semibold text-sm mb-2">現在のプラン制限</h4>
          <div className="space-y-1 text-xs text-gray-600">
            <div className="flex items-center">
              {limitations.limitations.advancedAnalytics ? <Check className="h-3 w-3 text-green-500" /> : <X className="h-3 w-3 text-red-500" />}
              <span className="ml-2">高度な分析</span>
            </div>
            <div className="flex items-center">
              {limitations.limitations.yieldPredictions ? <Check className="h-3 w-3 text-green-500" /> : <X className="h-3 w-3 text-red-500" />}
              <span className="ml-2">収益予測</span>
            </div>
            <div className="flex items-center">
              {limitations.limitations.aiRecommendations ? <Check className="h-3 w-3 text-green-500" /> : <X className="h-3 w-3 text-red-500" />}
              <span className="ml-2">AI推奨</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// 機能別アクセスコントロール用コンポーネント
export const ProtocolAccessControl = ({ userId, protocolId, children }: { 
  userId: string 
  protocolId: string 
  children: React.ReactNode 
}) => (
  <FreemiumAccessControl
    userId={userId}
    featureType="protocolAccess"
    requestedValue={protocolId}
  >
    {children}
  </FreemiumAccessControl>
)

export const AdvancedAnalyticsControl = ({ userId, children }: { 
  userId: string 
  children: React.ReactNode 
}) => (
  <FreemiumAccessControl
    userId={userId}
    featureType="advancedAnalytics"
  >
    {children}
  </FreemiumAccessControl>
)

export const YieldPredictionControl = ({ userId, children }: { 
  userId: string 
  children: React.ReactNode 
}) => (
  <FreemiumAccessControl
    userId={userId}
    featureType="yieldPredictions"
  >
    {children}
  </FreemiumAccessControl>
)
