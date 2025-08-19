"use client"

import * as React from "react"
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  BookOpen, 
  Shield, 
  HelpCircle,
  Lightbulb,
  PlayCircle,
  CheckCircle2,
  Star,
  ArrowRight,
  DollarSign,
  Clock
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
 
// Mock types and utilities
 

// Mock DeFi User Tier Manager
const DeFiUserTierManager = {
  getBeginnerProtocolInfo: (protocolId: string) => {
    const mockProtocols: Record<string, Record<string, unknown>> = {
      compound: {
        protocolId: 'compound',
        simpleName: 'Compound',
        description: '安定した貸出・借入プラットフォーム',
        riskLevel: 'low',
        easeOfUse: 2,
        expectedReturn: '3-8%',
        minimumInvestment: 50,
        pros: ['実績豊富', '高い流動性'],
        cons: ['手数料高め', 'ガス代必要'],
        category: 'lending'
      },
      aave: {
        protocolId: 'aave',
        simpleName: 'Aave',
        description: 'フラッシュローン対応の貸出プロトコル',
        riskLevel: 'low',
        easeOfUse: 3,
        expectedReturn: '2-10%',
        minimumInvestment: 25,
        pros: ['多様な機能', '高い収益性'],
        cons: ['複雑な機能', 'リスク管理必要'],
        category: 'lending'
      }
    }
    return mockProtocols[protocolId]
  }
}

interface BeginnerDashboardProps {
  userId: string
  className?: string
}

interface LearningPath {
  id: string
  title: string
  description: string
  estimatedMinutes: number
  difficulty: 1 | 2 | 3
  completed: boolean
  progress: number
  icon: React.ReactNode
  tags: string[]
}

 

export default function BeginnerDashboard({ userId, className = "" }: BeginnerDashboardProps) {
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null)

  const { data: userProfile } = useQuery({
    queryKey: ['defi-user-profile', userId],
    queryFn: async () => {
      const response = await fetch(`/api/defi/user-profile/${userId}`)
      if (!response.ok) throw new Error('Failed to fetch user profile')
      return response.json()
    }
  })

  const { data: learningPaths } = useQuery({
    queryKey: ['beginner-learning-paths', userId],
    queryFn: async () => {
      const response = await fetch(`/api/defi/learning-paths?level=beginner&userId=${userId}`)
      if (!response.ok) throw new Error('Failed to fetch learning paths')
      return response.json()
    }
  })

  const { data: safeProtocols } = useQuery({
    queryKey: ['safe-protocols', userId],
    queryFn: async () => {
      const protocols = (['compound', 'aave'] as string[])
        .map(id => {
          const manager = DeFiUserTierManager as Record<string, unknown> & { getBeginnerProtocolInfo?: (id: string) => unknown };
          return manager.getBeginnerProtocolInfo && typeof manager.getBeginnerProtocolInfo === 'function' 
            ? manager.getBeginnerProtocolInfo(id) 
            : null;
        })
        .filter((p: unknown): p is { protocolId: string; simpleName: string; description: string; riskLevel: string; easeOfUse: number; expectedReturn: string; minimumInvestment: number; pros: string[]; cons: string[]; category?: string } => Boolean(p))
      return protocols
    }
  })

  // 学習進捗の計算
  const completedLessons = learningPaths?.filter((path: LearningPath) => path.completed).length || 0
  const totalLessons = learningPaths?.length || 0
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

  return (
    <div className={`space-y-6 ${className}`}>
      {/* ヘッダー：歓迎メッセージ */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-500 text-white rounded-full">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl text-blue-900">
                DeFiの世界へようこそ！
              </CardTitle>
              <p className="text-blue-700 text-sm">
                安全で着実な投資の第一歩を始めましょう
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 mb-2">学習進捗</p>
              <Progress value={overallProgress} className="w-48 h-2" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-900">{Math.round(overallProgress)}%</div>
              <div className="text-sm text-blue-600">完了</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 重要な安全注意事項 */}
      <Alert className="border-amber-300 bg-amber-50">
        <Shield className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          <strong>投資を始める前に：</strong> DeFiには技術的リスクがあります。
          必ず少額から始めて、十分に理解してから投資額を増やしてください。
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 学習パス */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
              あなたの学習ロードマップ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {learningPaths?.slice(0, 4).map((path: LearningPath) => (
                <LearningPathCard key={path.id} path={path} />
              ))}
              
              {totalLessons > 4 && (
                <Button variant="ghost" className="w-full mt-4">
                  すべての学習コンテンツを見る ({totalLessons - 4}個の追加コンテンツ)
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 初心者におすすめのプロトコル */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-green-500" />
              安全なプロトコル
            </CardTitle>
            <p className="text-sm text-gray-600">
              初心者でも安心して使える、実績のあるプロトコルです
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
      {safeProtocols?.map((protocol: { protocolId: string; simpleName: string; description: string; riskLevel: string; easeOfUse: number; expectedReturn: string; minimumInvestment: number; pros: string[]; cons: string[]; category?: string }) => (
                <SafeProtocolCard 
          key={protocol.protocolId} 
                  protocol={protocol}
          isSelected={selectedProtocol === protocol.protocolId}
          onSelect={() => setSelectedProtocol(protocol.protocolId)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 今日のアクション */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center text-green-900">
            <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />
            今日のおすすめアクション
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RecommendedActions userProfile={userProfile} />
        </CardContent>
      </Card>

      {/* FAQ・ヘルプセクション */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="mr-2 h-5 w-5" />
            よくある質問
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BeginnerFAQ />
        </CardContent>
      </Card>
    </div>
  )
}

function LearningPathCard({ path }: { path: LearningPath }) {
  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'bg-green-100 text-green-800'
      case 2: return 'bg-yellow-100 text-yellow-800'
      case 3: return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyText = (difficulty: number) => {
    switch (difficulty) {
      case 1: return '初級'
      case 2: return '中級'
      case 3: return '上級'
      default: return '不明'
    }
  }

  return (
    <div className={`border rounded-lg p-4 transition-colors ${
      path.completed ? 'bg-green-50 border-green-200' : 'hover:bg-gray-50'
    }`}>
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-full ${path.completed ? 'bg-green-500' : 'bg-blue-500'} text-white`}>
          {path.completed ? <CheckCircle2 className="h-4 w-4" /> : path.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm">{path.title}</h3>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className={getDifficultyColor(path.difficulty)}>
                {getDifficultyText(path.difficulty)}
              </Badge>
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                {path.estimatedMinutes}分
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-2">{path.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              {path.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <Button 
              size="sm" 
              variant={path.completed ? "secondary" : "default"}
              className="text-xs"
            >
              {path.completed ? (
                <>
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  完了済み
                </>
              ) : (
                <>
                  <PlayCircle className="mr-1 h-3 w-3" />
                  開始
                </>
              )}
            </Button>
          </div>
          
          {!path.completed && path.progress > 0 && (
            <div className="mt-2">
              <Progress value={path.progress} className="h-1" />
              <p className="text-xs text-gray-500 mt-1">{Math.round(path.progress)}% 完了</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function SafeProtocolCard({ 
  protocol, 
  isSelected, 
  onSelect 
}: { 
  protocol: { protocolId: string; simpleName: string; description: string; riskLevel: string; easeOfUse: number; expectedReturn: string; minimumInvestment: number; pros: string[]; cons: string[]; category?: string }
  isSelected: boolean
  onSelect: () => void 
}) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'very_low': return 'bg-green-100 text-green-800'
      case 'low': return 'bg-blue-100 text-blue-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskText = (risk: string) => {
    switch (risk) {
      case 'very_low': return '非常に低リスク'
      case 'low': return '低リスク'
      case 'medium': return '中リスク'
      default: return 'リスク不明'
    }
  }

  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        isSelected ? 'border-blue-300 bg-blue-50' : 'hover:bg-gray-50'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-sm">{protocol.simpleName}</h3>
          <p className="text-xs text-gray-500">{protocol.category === 'lending' ? '貸出・借入' : protocol.category}</p>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <Badge className={getRiskColor(protocol.riskLevel)}>
            {getRiskText(protocol.riskLevel)}
          </Badge>
          <div className="flex items-center text-xs text-gray-500">
            <Star className={`h-3 w-3 mr-1 ${protocol.easeOfUse <= 2 ? 'text-green-500' : 'text-yellow-500'}`} />
            簡単度 {protocol.easeOfUse}/5
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-3">{protocol.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <p className="text-xs text-gray-500">予想リターン</p>
          <p className="text-sm font-semibold text-green-600">{protocol.expectedReturn}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">最小投資額</p>
          <p className="text-sm font-semibold">${protocol.minimumInvestment}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <p className="text-xs text-gray-500 mb-1">メリット</p>
          <div className="flex flex-wrap gap-1">
            {protocol.pros.slice(0, 2).map((pro: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs text-green-700">
                {pro}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-1">注意点</p>
          <div className="flex flex-wrap gap-1">
            {protocol.cons.slice(0, 2).map((con: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs text-orange-700">
                {con}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <Button size="sm" className="w-full mt-3">
        詳細を見る・始める
        <ArrowRight className="ml-2 h-3 w-3" />
      </Button>
    </div>
  )
}

type UserProfileShape = { onboarding_progress?: { completed?: boolean }; completed_tutorials?: unknown[] }
function RecommendedActions({ userProfile }: { userProfile: UserProfileShape | null }) {
  const getNextAction = () => {
    if (!userProfile) return null
    
    const { onboarding_progress } = userProfile
    
    if (!onboarding_progress?.completed) {
      return {
        title: 'オンボーディングを完了する',
        description: 'DeFiの基本を学んでバッジを獲得しましょう',
        action: 'オンボーディングを続ける',
        icon: <BookOpen className="h-4 w-4" />,
        color: 'bg-blue-500'
      }
    }
    
    if ((userProfile.completed_tutorials?.length ?? 0) < 3) {
      return {
        title: '基礎学習を進める',
        description: '安全な投資のための基礎知識を身につけましょう',
        action: '学習を開始',
        icon: <Lightbulb className="h-4 w-4" />,
        color: 'bg-yellow-500'
      }
    }
    
    return {
      title: '初回投資の準備',
      description: 'ウォレットの設定と少額投資の準備をしましょう',
      action: '投資ガイドを見る',
      icon: <DollarSign className="h-4 w-4" />,
      color: 'bg-green-500'
    }
  }

  const action = getNextAction()
  if (!action) return <div>すべてのアクションが完了しています！</div>

  return (
    <div className="flex items-center space-x-4">
      <div className={`p-3 rounded-full text-white ${action.color}`}>
        {action.icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-green-900">{action.title}</h3>
        <p className="text-sm text-green-700">{action.description}</p>
      </div>
      <Button>{action.action}</Button>
    </div>
  )
}

function BeginnerFAQ() {
  const faqs = [
    {
      question: "DeFiって何ですか？",
      answer: "DeFi（Decentralized Finance）は分散型金融のことで、銀行などの仲介者なしに金融サービスを利用できる仕組みです。"
    },
    {
      question: "どのくらいの金額から始められますか？",
      answer: "プロトコルによりますが、$10-50程度から始められます。ただし、ガス代（手数料）も考慮して、最初は$100程度を推奨します。"
    },
    {
      question: "リスクはありますか？",
      answer: "はい。スマートコントラクトのバグ、市場価格の変動、清算リスクなどがあります。必ず少額から始めて、リスクを理解してから投資額を増やしてください。"
    },
    {
      question: "ウォレットは何が必要ですか？",
      answer: "MetaMaskが最も一般的です。初心者にも使いやすく、多くのDeFiプロトコルに対応しています。"
    }
  ]

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border-b pb-3">
          <h4 className="font-semibold text-sm mb-2">{faq.question}</h4>
          <p className="text-sm text-gray-600">{faq.answer}</p>
        </div>
      ))}
      <Button variant="ghost" className="text-blue-600">
        もっと見る <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
