'use client'

import * as React from "react"
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Monitor,
  Smartphone,
  Tablet,
  ChevronLeft,
  ChevronRight,
  Star,
  Lock,
  Check
} from 'lucide-react'

interface FeatureDemo {
  id: string
  title: string
  description: string
  preview: string
  interactive: boolean
  premium: boolean
}

interface FeatureShowcaseProps {
  feature: {
    id: string
    title: string
    demos: FeatureDemo[]
  }
}

export function FeatureShowcase({ feature }: FeatureShowcaseProps) {
  const [currentDemo, setCurrentDemo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  const nextDemo = () => {
    setCurrentDemo((prev) => (prev + 1) % feature.demos.length)
  }

  const prevDemo = () => {
    setCurrentDemo((prev) => (prev - 1 + feature.demos.length) % feature.demos.length)
  }

  const currentDemoData = feature.demos[currentDemo]

  return (
    <Card className="p-8 bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-gray-700 backdrop-blur-xl relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">{feature.title} デモ</h3>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="border-blue-500 text-blue-400">
                インタラクティブデモ
              </Badge>
              {currentDemoData.premium && (
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">
                  <Star className="w-3 h-3 mr-1" />
                  プレミアム
                </Badge>
              )}
            </div>
          </div>

          {/* View Mode Selector */}
          <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-1">
            {[
              { mode: 'desktop' as const, icon: Monitor, label: 'デスクトップ' },
              { mode: 'tablet' as const, icon: Tablet, label: 'タブレット' },
              { mode: 'mobile' as const, icon: Smartphone, label: 'モバイル' }
            ].map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`p-2 rounded-md transition-all ${
                  viewMode === mode 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
                title={label}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Demo Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={prevDemo}
              disabled={feature.demos.length <= 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="text-sm text-gray-400">
              {currentDemo + 1} / {feature.demos.length}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={nextDemo}
              disabled={feature.demos.length <= 1}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Demo Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={!currentDemoData.interactive}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPlaying(false)}
              disabled={!currentDemoData.interactive}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Demo Content */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2">{currentDemoData.title}</h4>
          <p className="text-gray-400 mb-4">{currentDemoData.description}</p>
        </div>

        {/* Demo Preview */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDemo}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`relative bg-gray-900/50 rounded-lg overflow-hidden ${
              viewMode === 'desktop' ? 'aspect-video' :
              viewMode === 'tablet' ? 'aspect-[4/3] max-w-md mx-auto' :
              'aspect-[9/19] max-w-xs mx-auto'
            }`}
          >
            {/* プレビューコンテンツ */}
            <div className="absolute inset-0 flex items-center justify-center">
              {currentDemoData.premium && !isPlaying ? (
                <div className="text-center">
                  <Lock className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                  <p className="text-gray-400 mb-4">
                    この機能はプレミアムプランでご利用いただけます
                  </p>
                  <Button 
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                  >
                    プレミアムにアップグレード
                  </Button>
                </div>
              ) : (
                <div className="w-full h-full p-4">
                  {/* 実際のデモコンテンツをここに配置 */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded flex items-center justify-center">
                    <p className="text-white/80">{currentDemoData.preview}</p>
                  </div>
                </div>
              )}
            </div>

            {/* 再生インジケーター */}
            {isPlaying && (
              <div className="absolute top-4 left-4">
                <div className="flex items-center gap-2 bg-red-500 px-3 py-1 rounded-full text-sm">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  LIVE
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Demo Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {feature.demos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentDemo(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentDemo 
                  ? 'bg-blue-500 w-6' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8 pt-6 border-t border-gray-700">
          <p className="text-gray-400 mb-4">
            この機能を今すぐ体験してみませんか？
          </p>
          <Button 
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            <Check className="w-4 h-4 mr-2" />
            無料で試してみる
          </Button>
        </div>
      </div>
    </Card>
  )
}