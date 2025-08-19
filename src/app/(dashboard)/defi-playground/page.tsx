"use client"

import * as React from "react"
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Calculator, 
  BarChart3, 
 
  Target,
  Gift,
  Crown,
  Zap,
  TrendingUp,
} from 'lucide-react'

// Import our free-tier focused components
import FreeCalculatorHub from '@/components/defi/free-calculator-hub'
import AdvancedFreeTools from '@/components/defi/advanced-free-tools'
import InteractiveTutorial from '@/components/defi/interactive-tutorial'

export default function DeFiPlaygroundPage() {
  const [activeFeature, setActiveFeature] = useState<string>('calculators')

  const features = [
    {
      id: 'calculators',
      title: '計算機ツール',
      description: '高精度DeFi計算機 - 他社有料機能レベル',
      icon: <Calculator className="h-5 w-5" />,
      badge: 'FREE',
      badgeColor: 'bg-green-500',
      component: <FreeCalculatorHub />
    },
    {
      id: 'advanced-tools',
      title: '高度分析ツール',
      description: 'プロレベルの分析機能を無料提供',
      icon: <BarChart3 className="h-5 w-5" />,
      badge: 'FREE',
      badgeColor: 'bg-green-500',
      component: <AdvancedFreeTools />
    },
    {
      id: 'tutorials',
      title: '教育コンテンツ',
      description: '実践的なDeFi学習コンテンツ',
      icon: <Target className="h-5 w-5" />,
      badge: 'FREE',
      badgeColor: 'bg-green-500',
      component: (
        <InteractiveTutorial 
          onComplete={(tutorialId) => {
            console.log('Tutorial completed:', tutorialId)
          }}
        />
      )
    },
    {
      id: 'dashboard',
      title: 'プレミアム機能',
      description: 'リアルタイム通知・AI予測・履歴保存',
      icon: <Crown className="h-5 w-5" />,
      badge: 'PREMIUM',
      badgeColor: 'bg-yellow-500',
      component: (
        <div className="min-h-screen flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="p-8 text-center">
              <Crown className="h-16 w-16 mx-auto mb-4 text-yellow-500" />
              <h3 className="text-2xl font-bold mb-4">プレミアム機能</h3>
              <p className="text-slate-600 mb-6">
                リアルタイム通知、AI予測分析、履歴保存などの付加価値機能
              </p>
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500">
                プレミアムにアップグレード
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    }
  ]

  const activeFeatureData = features.find(f => f.id === activeFeature)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🚀 DeFi無料ツールプラットフォーム
          </h1>
          <p className="text-xl text-slate-600 mb-6">
            他社有料機能レベルの計算ツール・分析機能を完全無料で提供！
          </p>
          
          {/* Value Proposition */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-4 flex items-center gap-3">
                <Gift className="h-6 w-6 text-green-600" />
                <div className="text-left">
                  <p className="font-bold text-green-800">通常$50-100/月相当</p>
                  <p className="text-sm text-green-600">完全無料で利用</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
              <CardContent className="p-4 flex items-center gap-3">
                <Zap className="h-6 w-6 text-blue-600" />
                <div className="text-left">
                  <p className="font-bold text-blue-800">登録不要</p>
                  <p className="text-sm text-blue-600">制限なし使用</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Feature Navigation */}
        <Card className="border-0 shadow-xl overflow-hidden mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-3">
              <Target className="h-8 w-8" />
              機能を選択してください
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((feature) => (
                <Card 
                  key={feature.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 ${
                    activeFeature === feature.id 
                      ? 'border-blue-500 bg-blue-50 shadow-lg' 
                      : 'border-slate-200 hover:border-blue-300'
                  }`}
                  onClick={() => setActiveFeature(feature.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                      activeFeature === feature.id 
                        ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {feature.icon}
                    </div>
                    <h3 className="font-bold text-sm mb-2 text-slate-900">{feature.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-2">{feature.description}</p>
                    
                    <Badge 
                      className={`${feature.badgeColor} text-white`}
                    >
                      {feature.badge}
                    </Badge>
                    
                    {activeFeature === feature.id && (
                      <Badge className="mt-2 bg-blue-100 text-blue-800 block">
                        アクティブ
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Feature Display */}
        <div className="relative">
          {activeFeatureData && (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              {activeFeatureData.component}
            </div>
          )}
        </div>
      </div>
      
      {/* Value Proposition Footer */}
      <Card className="fixed bottom-4 left-4 max-w-sm border-0 shadow-xl bg-gradient-to-br from-emerald-50 to-green-100 border-l-4 border-green-500">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="h-5 w-5 text-green-600" />
            <h4 className="font-bold text-green-900">無料提供中</h4>
          </div>
          <p className="text-sm text-green-700 mb-3">
            通常月額$50-100相当の高度な計算・分析機能を完全無料で提供しています。
          </p>
          <div className="flex items-center justify-between text-xs text-green-600">
            <span>現在の機能:</span>
            <Badge variant="outline" className="text-green-700 border-green-300">
              {activeFeatureData?.title}
            </Badge>
          </div>
        </CardContent>
      </Card>
      
      {/* Competitive Advantage Highlight */}
      <div className="fixed bottom-4 right-4 max-w-xs">
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-0 shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5" />
              <h4 className="font-bold">差別化ポイント</h4>
            </div>
            <ul className="text-sm space-y-1">
              <li>• 完全日本語対応</li>
              <li>• 教育コンテンツ統合</li>
              <li>• モバイル完全対応</li>
              <li>• 初心者向けUI/UX</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}