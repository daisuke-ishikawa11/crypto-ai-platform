"use client"

import * as React from "react"
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  Trophy, 
  Star, 
  Zap, 
  Target,
  Award,
  Crown,
  Shield,
  TrendingUp,
  Calendar,
  Gift,
  Sparkles,
  Medal,
  Flame,
  CheckCircle2,
  Lock
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

// Achievement Types
export enum AchievementType {
  EXPLORATION = 'exploration',
  YIELD_FARMING = 'yield_farming', 
  RISK_MANAGEMENT = 'risk_management',
  SOCIAL = 'social',
  LEARNING = 'learning',
  MILESTONE = 'milestone'
}

export enum AchievementRarity {
  COMMON = 'common',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary'
}

export interface Achievement {
  id: string
  title: string
  description: string
  type: AchievementType
  rarity: AchievementRarity
  icon: React.ReactNode
  points: number
  unlockedAt?: Date
  progress?: {
    current: number
    target: number
    unit: string
  }
  requirements: string[]
  rewards: {
    title: string
    description: string
    type: 'badge' | 'points' | 'unlock' | 'discount'
  }[]
  isSecret?: boolean
}

export interface UserProgress {
  totalPoints: number
  level: number
  currentXp: number
  nextLevelXp: number
  streak: {
    current: number
    best: number
    lastActivity: Date
  }
  achievements: Achievement[]
  completedCount: number
  totalCount: number
}

interface AchievementSystemProps {
  userId?: string
  compact?: boolean
}

// Achievement definitions with delightful names and descriptions
const ACHIEVEMENTS: Omit<Achievement, 'unlockedAt'>[] = [
  // Exploration Achievements
  {
    id: 'first_protocol',
    title: '🌱 DeFi Sprout',
    description: 'Connected to your first DeFi protocol! Welcome to the decentralized world!',
    type: AchievementType.EXPLORATION,
    rarity: AchievementRarity.COMMON,
    icon: <Sparkles className="h-6 w-6" />,
    points: 100,
    requirements: ['Connect to any DeFi protocol'],
    rewards: [
      { title: 'Explorer Badge', description: 'Show off your adventurous spirit', type: 'badge' }
    ]
  },
  {
    id: 'protocol_collector',
    title: '🎯 Protocol Hunter',
    description: 'Tried 5 different protocols. You\'re becoming quite the DeFi explorer!',
    type: AchievementType.EXPLORATION,
    rarity: AchievementRarity.RARE,
    icon: <Target className="h-6 w-6" />,
    points: 500,
    progress: { current: 0, target: 5, unit: 'protocols' },
    requirements: ['Connect to 5 different DeFi protocols'],
    rewards: [
      { title: 'Hunter Badge', description: 'A mark of your diverse experience', type: 'badge' },
      { title: '500 XP Bonus', description: 'Level up faster!', type: 'points' }
    ]
  },
  {
    id: 'chain_hopper',
    title: '🌉 Multichain Voyager',
    description: 'Explored protocols across 3 different blockchains! True DeFi citizen.',
    type: AchievementType.EXPLORATION,
    rarity: AchievementRarity.EPIC,
    icon: <Crown className="h-6 w-6" />,
    points: 1000,
    progress: { current: 0, target: 3, unit: 'chains' },
    requirements: ['Use protocols on 3 different blockchains'],
    rewards: [
      { title: 'Voyager Crown', description: 'Royal recognition of your journey', type: 'badge' },
      { title: 'Advanced Features', description: 'Unlock pro analytics', type: 'unlock' }
    ]
  },

  // Yield Farming Achievements
  {
    id: 'first_yield',
    title: '🌾 Harvest Rookie',
    description: 'Earned your first yield! Money doesn\'t grow on trees, but it grows in DeFi!',
    type: AchievementType.YIELD_FARMING,
    rarity: AchievementRarity.COMMON,
    icon: <Gift className="h-6 w-6" />,
    points: 200,
    requirements: ['Earn yield from any protocol'],
    rewards: [
      { title: 'Farmer Badge', description: 'Your first step into yield farming', type: 'badge' }
    ]
  },
  {
    id: 'yield_master',
    title: '🏆 Yield Maestro',
    description: 'Achieved over 20% APY! You\'ve mastered the art of making money work for you.',
    type: AchievementType.YIELD_FARMING,
    rarity: AchievementRarity.LEGENDARY,
    icon: <Trophy className="h-6 w-6" />,
    points: 2000,
    requirements: ['Achieve >20% APY on any position'],
    rewards: [
      { title: 'Golden Shovel', description: 'The ultimate farming tool', type: 'badge' },
      { title: 'VIP Features', description: 'Access to exclusive strategies', type: 'unlock' },
      { title: '25% Fee Discount', description: 'Premium perks for masters', type: 'discount' }
    ]
  },
  {
    id: 'compound_champion',
    title: '⚡ Compounding Wizard',
    description: 'Reinvested yields 10 times. Einstein would be proud of your compound interest game!',
    type: AchievementType.YIELD_FARMING,
    rarity: AchievementRarity.EPIC,
    icon: <Zap className="h-6 w-6" />,
    points: 1500,
    progress: { current: 0, target: 10, unit: 'compounds' },
    requirements: ['Compound yields 10 times'],
    rewards: [
      { title: 'Lightning Badge', description: 'Harness the power of compounding', type: 'badge' },
      { title: 'Auto-Compound Feature', description: 'Set it and forget it!', type: 'unlock' }
    ]
  },

  // Risk Management Achievements
  {
    id: 'risk_aware',
    title: '🛡️ Risk Guardian',
    description: 'Maintained portfolio risk below 30% for 7 days. Safety first, profits second!',
    type: AchievementType.RISK_MANAGEMENT,
    rarity: AchievementRarity.RARE,
    icon: <Shield className="h-6 w-6" />,
    points: 750,
    progress: { current: 0, target: 7, unit: 'days' },
    requirements: ['Keep portfolio risk <30% for 7 consecutive days'],
    rewards: [
      { title: 'Guardian Shield', description: 'Symbol of prudent investing', type: 'badge' },
      { title: 'Risk Alerts', description: 'Get notified before it\'s too late', type: 'unlock' }
    ]
  },
  {
    id: 'diversification_master',
    title: '🌈 Portfolio Rainbow',
    description: 'Spread investments across 8+ protocols. Beautiful diversification!',
    type: AchievementType.RISK_MANAGEMENT,
    rarity: AchievementRarity.EPIC,
    icon: <Star className="h-6 w-6" />,
    points: 1250,
    progress: { current: 0, target: 8, unit: 'protocols' },
    requirements: ['Have active positions in 8+ different protocols'],
    rewards: [
      { title: 'Rainbow Badge', description: 'Celebrate your colorful portfolio', type: 'badge' },
      { title: 'Portfolio Optimizer', description: 'AI-powered rebalancing suggestions', type: 'unlock' }
    ]
  },

  // Social Achievements
  {
    id: 'first_share',
    title: '📣 DeFi Evangelist',
    description: 'Shared your first achievement! Spread the DeFi love!',
    type: AchievementType.SOCIAL,
    rarity: AchievementRarity.COMMON,
    icon: <Sparkles className="h-6 w-6" />,
    points: 150,
    requirements: ['Share any achievement on social media'],
    rewards: [
      { title: 'Megaphone Badge', description: 'Voice of the DeFi community', type: 'badge' }
    ]
  },

  // Learning Achievements
  {
    id: 'knowledge_seeker',
    title: '🧠 DeFi Scholar',
    description: 'Completed 5 educational modules. Knowledge is the best investment!',
    type: AchievementType.LEARNING,
    rarity: AchievementRarity.RARE,
    icon: <Award className="h-6 w-6" />,
    points: 600,
    progress: { current: 0, target: 5, unit: 'modules' },
    requirements: ['Complete 5 educational modules'],
    rewards: [
      { title: 'Scholar Badge', description: 'Wisdom through learning', type: 'badge' },
      { title: 'Advanced Tutorials', description: 'Unlock expert-level content', type: 'unlock' }
    ]
  },

  // Milestone Achievements
  {
    id: 'streak_7',
    title: '🔥 Weekly Warrior',
    description: 'Checked your portfolio 7 days in a row! Consistency is key!',
    type: AchievementType.MILESTONE,
    rarity: AchievementRarity.COMMON,
    icon: <Flame className="h-6 w-6" />,
    points: 300,
    progress: { current: 0, target: 7, unit: 'days' },
    requirements: ['Check portfolio for 7 consecutive days'],
    rewards: [
      { title: 'Flame Badge', description: 'Keep the fire burning!', type: 'badge' }
    ]
  },
  {
    id: 'streak_30',
    title: '💎 Diamond Hands',
    description: '30-day streak! Your dedication shines brighter than diamonds!',
    type: AchievementType.MILESTONE,
    rarity: AchievementRarity.LEGENDARY,
    icon: <Medal className="h-6 w-6" />,
    points: 3000,
    progress: { current: 0, target: 30, unit: 'days' },
    requirements: ['Check portfolio for 30 consecutive days'],
    rewards: [
      { title: 'Diamond Badge', description: 'Unbreakable commitment', type: 'badge' },
      { title: 'Premium Access', description: 'Full platform unlocked', type: 'unlock' },
      { title: '50% Fee Discount', description: 'Legendary rewards for legendary users', type: 'discount' }
    ],
    isSecret: true
  }
]

// Rarity colors and styles
const rarityConfig = {
  [AchievementRarity.COMMON]: {
    border: 'border-slate-300',
    bg: 'bg-slate-50',
    text: 'text-slate-700',
    glow: 'shadow-slate-100',
    accent: 'text-slate-600'
  },
  [AchievementRarity.RARE]: {
    border: 'border-blue-300',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    glow: 'shadow-blue-100',
    accent: 'text-blue-600'
  },
  [AchievementRarity.EPIC]: {
    border: 'border-purple-300',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    glow: 'shadow-purple-100',
    accent: 'text-purple-600'
  },
  [AchievementRarity.LEGENDARY]: {
    border: 'border-amber-300',
    bg: 'bg-gradient-to-br from-amber-50 to-yellow-50',
    text: 'text-amber-700',
    glow: 'shadow-amber-200',
    accent: 'text-amber-600'
  }
}

const typeConfig = {
  [AchievementType.EXPLORATION]: { icon: Target, color: 'text-green-600', label: 'Explorer' },
  [AchievementType.YIELD_FARMING]: { icon: TrendingUp, color: 'text-blue-600', label: 'Farmer' },
  [AchievementType.RISK_MANAGEMENT]: { icon: Shield, color: 'text-red-600', label: 'Guardian' },
  [AchievementType.SOCIAL]: { icon: Sparkles, color: 'text-pink-600', label: 'Social' },
  [AchievementType.LEARNING]: { icon: Award, color: 'text-indigo-600', label: 'Scholar' },
  [AchievementType.MILESTONE]: { icon: Calendar, color: 'text-orange-600', label: 'Milestone' }
}

export const AchievementSystem: React.FC<AchievementSystemProps> = ({ userId, compact = false }) => {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)
  const [newlyUnlocked, setNewlyUnlocked] = useState<Achievement[]>([])
  
  // Fetch user progress
  const { data: userProgress, isLoading } = useQuery<UserProgress>({
    queryKey: ['user-achievements', userId],
    queryFn: async () => {
      const response = await fetch(`/api/achievements/${userId}`)
      if (!response.ok) throw new Error('Failed to fetch achievements')
      return response.json()
    },
    enabled: !!userId
  })

  // Simulate achievement unlocking animation
  useEffect(() => {
    if (newlyUnlocked.length > 0) {
      const timer = setTimeout(() => {
        setNewlyUnlocked([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [newlyUnlocked])

  // Calculate level progress
  const levelProgress = useMemo(() => {
    if (!userProgress) return 0
    return (userProgress.currentXp / userProgress.nextLevelXp) * 100
  }, [userProgress])

  // Group achievements by type
  const achievementsByType = useMemo(() => {
    const grouped: Record<AchievementType, Achievement[]> = {
      [AchievementType.EXPLORATION]: [],
      [AchievementType.YIELD_FARMING]: [],
      [AchievementType.RISK_MANAGEMENT]: [],
      [AchievementType.SOCIAL]: [],
      [AchievementType.LEARNING]: [],
      [AchievementType.MILESTONE]: []
    }
    
    ACHIEVEMENTS.forEach(achievement => {
      const userAchievement = userProgress?.achievements.find(a => a.id === achievement.id)
      grouped[achievement.type].push({
        ...achievement,
        unlockedAt: userAchievement?.unlockedAt,
        progress: userAchievement?.progress || achievement.progress
      })
    })
    
    return grouped
  }, [userProgress])

  if (isLoading) {
    return <AchievementSkeleton compact={compact} />
  }

  if (compact) {
    return (
      <Card className="overflow-hidden border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {userProgress?.level || 1}
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Crown className="h-3 w-3 text-yellow-800" />
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-slate-900">Level {userProgress?.level || 1}</h3>
                <Badge variant="outline" className="text-xs">
                  {userProgress?.totalPoints || 0} XP
                </Badge>
              </div>
              
              <Progress value={levelProgress} className="mb-2" />
              
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>🏆 {userProgress?.completedCount || 0}/{ACHIEVEMENTS.length}</span>
                <span>🔥 {userProgress?.streak.current || 0} day streak</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* User Progress Header */}
      <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Level Circle */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-2xl animate-pulse">
                  {userProgress?.level || 1}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <Crown className="h-4 w-4 text-yellow-800" />
                </div>
                {/* Sparkle effects */}
                <div className="absolute -top-4 -left-4 w-4 h-4 text-yellow-400 animate-bounce">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="absolute -bottom-2 right-8 w-3 h-3 text-purple-400 animate-bounce delay-150">
                  <Star className="h-3 w-3" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Level {userProgress?.level || 1}</h2>
              <p className="text-slate-600">DeFi Adventurer</p>
            </div>
            
            {/* Progress Stats */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Level Progress</span>
                  <span className="text-sm text-slate-500">
                    {userProgress?.currentXp || 0} / {userProgress?.nextLevelXp || 1000} XP
                  </span>
                </div>
                <Progress value={levelProgress} className="h-3" />
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-indigo-600">{userProgress?.totalPoints || 0}</div>
                  <div className="text-xs text-slate-500">Total XP</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">{userProgress?.completedCount || 0}</div>
                  <div className="text-xs text-slate-500">Unlocked</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex items-center justify-center gap-1 text-2xl font-bold text-orange-500">
                    <Flame className="h-6 w-6" />
                    {userProgress?.streak.current || 0}
                  </div>
                  <div className="text-xs text-slate-500">Day Streak</div>
                </div>
              </div>
            </div>
            
            {/* Recent Achievement */}
            <div className="text-center lg:text-right">
              <p className="text-sm text-slate-600 mb-2">Latest Achievement</p>
              {userProgress?.achievements.length ? (
                <div className="inline-flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-slate-900 text-sm">
                      {userProgress.achievements[userProgress.achievements.length - 1]?.title}
                    </div>
                    <div className="text-xs text-slate-500">Just earned!</div>
                  </div>
                </div>
              ) : (
                <div className="text-slate-400 text-sm">No achievements yet</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievement Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-7 lg:grid-cols-7">
          <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
          {Object.entries(typeConfig).map(([type, config]) => {
            const Icon = config.icon
            const count = achievementsByType[type as AchievementType].filter(a => a.unlockedAt).length
            return (
              <TabsTrigger key={type} value={type} className="text-xs flex items-center gap-1">
                <Icon className="h-3 w-3" />
                <span className="hidden sm:inline">{config.label}</span>
                {count > 0 && (
                  <Badge variant="secondary" className="text-xs h-4 px-1">
                    {count}
                  </Badge>
                )}
              </TabsTrigger>
            )
          })}
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <AchievementGrid 
            achievements={ACHIEVEMENTS.map(a => ({
              ...a,
              unlockedAt: userProgress?.achievements.find(ua => ua.id === a.id)?.unlockedAt
            }))}
            onSelect={setSelectedAchievement}
          />
        </TabsContent>
        
        {Object.entries(achievementsByType).map(([type, achievements]) => (
          <TabsContent key={type} value={type} className="mt-6">
            <AchievementGrid 
              achievements={achievements}
              onSelect={setSelectedAchievement}
            />
          </TabsContent>
        ))}
      </Tabs>

      {/* Achievement Detail Dialog */}
      {selectedAchievement && (
        <AchievementDetailDialog 
          achievement={selectedAchievement}
          isOpen={!!selectedAchievement}
          onClose={() => setSelectedAchievement(null)}
        />
      )}
      
      {/* Achievement Unlock Animation */}
      {newlyUnlocked.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <AchievementUnlockAnimation 
            achievement={newlyUnlocked[0]} 
            onComplete={() => setNewlyUnlocked([])} 
          />
        </div>
      )}
    </div>
  )
}

// Achievement Grid Component
interface AchievementGridProps {
  achievements: Achievement[]
  onSelect: (achievement: Achievement) => void
}

const AchievementGrid: React.FC<AchievementGridProps> = ({ achievements, onSelect }) => {
  const unlockedAchievements = achievements.filter(a => a.unlockedAt && !a.isSecret)
  const lockedAchievements = achievements.filter(a => !a.unlockedAt && !a.isSecret)
  const secretAchievements = achievements.filter(a => a.isSecret && !a.unlockedAt)
  const unlockedSecrets = achievements.filter(a => a.isSecret && a.unlockedAt)
  
  return (
    <div className="space-y-6">
      {/* Unlocked Achievements */}
      {unlockedAchievements.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            Unlocked ({unlockedAchievements.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unlockedAchievements.map((achievement) => (
              <AchievementCard 
                key={achievement.id} 
                achievement={achievement} 
                onClick={() => onSelect(achievement)}
                unlocked={true}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Unlocked Secret Achievements */}
      {unlockedSecrets.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            Secret Achievements ({unlockedSecrets.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unlockedSecrets.map((achievement) => (
              <AchievementCard 
                key={achievement.id} 
                achievement={achievement} 
                onClick={() => onSelect(achievement)}
                unlocked={true}
                isSecret={true}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5 text-slate-400" />
            Locked ({lockedAchievements.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lockedAchievements.map((achievement) => (
              <AchievementCard 
                key={achievement.id} 
                achievement={achievement} 
                onClick={() => onSelect(achievement)}
                unlocked={false}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Secret Achievements Teaser */}
      {secretAchievements.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Secret Achievements
          </h3>
          <Card className="p-6 text-center border-2 border-dashed border-slate-300 bg-slate-50">
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">
                  {secretAchievements.length} Secret Achievement{secretAchievements.length !== 1 ? 's' : ''}
                </h4>
                <p className="text-sm text-slate-600">
                  Hidden treasures await those who explore beyond the ordinary...
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

// Achievement Card Component
interface AchievementCardProps {
  achievement: Achievement
  onClick: () => void
  unlocked: boolean
  isSecret?: boolean
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, onClick, unlocked, isSecret }) => {
  const rarity = rarityConfig[achievement.rarity]
  const typeInfo = typeConfig[achievement.type]
  const TypeIcon = typeInfo.icon
  
  return (
    <Card 
      className={cn(
        'cursor-pointer transition-all duration-300 hover:shadow-xl group overflow-hidden border-2',
        unlocked 
          ? `${rarity.border} ${rarity.glow} shadow-lg hover:scale-105` 
          : 'border-slate-200 hover:border-slate-300 opacity-75',
        isSecret && 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'
      )}
      onClick={onClick}
    >
      <CardContent className={cn(
        'p-6 relative',
        unlocked ? rarity.bg : 'bg-slate-50'
      )}>
        {/* Secret Badge */}
        {isSecret && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-purple-500 text-white text-xs">
              Secret
            </Badge>
          </div>
        )}
        
        {/* Achievement Icon */}
        <div className="flex items-start gap-4 mb-4">
          <div className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md',
            unlocked 
              ? 'bg-gradient-to-br from-white to-slate-100' 
              : 'bg-slate-200'
          )}>
            <div className={cn(
              unlocked ? rarity.text : 'text-slate-400',
              'transition-transform group-hover:scale-110'
            )}>
              {unlocked ? achievement.icon : <Lock className="h-6 w-6" />}
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge 
                variant="outline" 
                className={cn('text-xs', typeInfo.color)}
              >
                <TypeIcon className="h-3 w-3 mr-1" />
                {typeInfo.label}
              </Badge>
              <Badge 
                variant="secondary" 
                className={cn(
                  'text-xs capitalize',
                  unlocked ? rarity.accent : 'text-slate-500'
                )}
              >
                {achievement.rarity}
              </Badge>
            </div>
            
            <h3 className={cn(
              'font-bold text-lg mb-1 group-hover:text-slate-900 transition-colors',
              unlocked ? 'text-slate-900' : 'text-slate-500'
            )}>
              {unlocked ? achievement.title : '???'}
            </h3>
            
            <p className={cn(
              'text-sm leading-relaxed',
              unlocked ? 'text-slate-600' : 'text-slate-400'
            )}>
              {unlocked ? achievement.description : 'Complete the requirements to unlock this achievement'}
            </p>
          </div>
        </div>
        
        {/* Progress Bar */}
        {achievement.progress && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-slate-600">Progress</span>
              <span className="text-xs text-slate-500">
                {achievement.progress.current} / {achievement.progress.target} {achievement.progress.unit}
              </span>
            </div>
            <Progress 
              value={(achievement.progress.current / achievement.progress.target) * 100} 
              className="h-2"
            />
          </div>
        )}
        
        {/* Points */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className={cn('h-4 w-4', unlocked ? 'text-yellow-500' : 'text-slate-400')} />
            <span className={cn(
              'text-sm font-semibold',
              unlocked ? 'text-slate-900' : 'text-slate-500'
            )}>
              {achievement.points} XP
            </span>
          </div>
          
          {unlocked && achievement.unlockedAt && (
            <span className="text-xs text-slate-500">
              {new Date(achievement.unlockedAt).toLocaleDateString()}
            </span>
          )}
        </div>
        
        {/* Unlock Animation Effect */}
        {unlocked && (
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
            <div className="absolute bottom-2 left-2 w-1 h-1 bg-purple-400 rounded-full animate-bounce" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Achievement Detail Dialog
interface AchievementDetailDialogProps {
  achievement: Achievement
  isOpen: boolean
  onClose: () => void
}

const AchievementDetailDialog: React.FC<AchievementDetailDialogProps> = ({ 
  achievement, 
  isOpen, 
  onClose 
}) => {
  const rarity = rarityConfig[achievement.rarity]
  const typeInfo = typeConfig[achievement.type]
  const TypeIcon = typeInfo.icon
  const isUnlocked = !!achievement.unlockedAt
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className={cn(
              'w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg',
              isUnlocked 
                ? 'bg-gradient-to-br from-white to-slate-100' 
                : 'bg-slate-200'
            )}>
              <div className={cn(
                isUnlocked ? rarity.text : 'text-slate-400',
                'text-2xl'
              )}>
                {isUnlocked ? achievement.icon : <Lock className="h-8 w-8" />}
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className={cn('text-sm', typeInfo.color)}>
                  <TypeIcon className="h-4 w-4 mr-1" />
                  {typeInfo.label}
                </Badge>
                <Badge variant="secondary" className={cn(
                  'text-sm capitalize',
                  isUnlocked ? rarity.accent : 'text-slate-500'
                )}>
                  {achievement.rarity}
                </Badge>
                {achievement.isSecret && (
                  <Badge className="bg-purple-500 text-white text-sm">
                    Secret
                  </Badge>
                )}
              </div>
              
              <DialogTitle className={cn(
                'text-2xl mb-2',
                isUnlocked ? 'text-slate-900' : 'text-slate-500'
              )}>
                {isUnlocked ? achievement.title : 'Locked Achievement'}
              </DialogTitle>
              
              <DialogDescription className="text-base">
                {isUnlocked ? achievement.description : 'Complete the requirements to unlock this achievement'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          {/* Progress */}
          {achievement.progress && (
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Progress</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Current Progress</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {achievement.progress.current} / {achievement.progress.target} {achievement.progress.unit}
                  </span>
                </div>
                <Progress 
                  value={(achievement.progress.current / achievement.progress.target) * 100} 
                  className="h-3"
                />
              </div>
            </div>
          )}
          
          {/* Requirements */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Requirements</h4>
            <ul className="space-y-2">
              {achievement.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className={cn(
                    'h-4 w-4 mt-0.5 flex-shrink-0',
                    isUnlocked ? 'text-green-500' : 'text-slate-400'
                  )} />
                  {requirement}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Rewards */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Rewards</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {achievement.rewards.map((reward, index) => (
                <div key={index} className="bg-slate-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    {reward.type === 'badge' && <Award className="h-4 w-4 text-yellow-500" />}
                    {reward.type === 'points' && <Star className="h-4 w-4 text-blue-500" />}
                    {reward.type === 'unlock' && <Zap className="h-4 w-4 text-purple-500" />}
                    {reward.type === 'discount' && <Gift className="h-4 w-4 text-green-500" />}
                    <span className="font-medium text-slate-900 text-sm">{reward.title}</span>
                  </div>
                  <p className="text-xs text-slate-600">{reward.description}</p>
                </div>
              ))}
              
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800 text-sm">
                    {achievement.points} XP
                  </span>
                </div>
                <p className="text-xs text-yellow-700">Experience points to level up</p>
              </div>
            </div>
          </div>
          
          {/* Achievement Date */}
          {isUnlocked && achievement.unlockedAt && (
            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Unlocked on</span>
                <span className="font-semibold text-slate-900">
                  {new Date(achievement.unlockedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
        </div>
        
        {/* Share Button */}
        {isUnlocked && (
          <div className="flex justify-end pt-4 border-t border-slate-200">
            <Button 
              onClick={() => {
                // Implement sharing logic
                navigator.share?.({
                  title: `I unlocked: ${achievement.title}`,
                  text: achievement.description,
                  url: window.location.href
                })
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Share Achievement
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

// Achievement Unlock Animation
interface AchievementUnlockAnimationProps {
  achievement: Achievement
  onComplete: () => void
}

const AchievementUnlockAnimation: React.FC<AchievementUnlockAnimationProps> = ({ 
  achievement, 
  onComplete 
}) => {
  const rarity = rarityConfig[achievement.rarity]
  
  useEffect(() => {
    const timer = setTimeout(onComplete, 4000)
    return () => clearTimeout(timer)
  }, [onComplete])
  
  return (
    <Card className="max-w-md mx-auto overflow-hidden border-0 shadow-2xl animate-bounce">
      <CardContent className={cn('p-8 text-center', rarity.bg)}>
        <div className="space-y-6">
          {/* Achievement Icon with Animation */}
          <div className="relative mx-auto w-24 h-24">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping" />
            <div className="relative w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
              <div className="text-white text-3xl animate-pulse">
                {achievement.icon}
              </div>
            </div>
            
            {/* Sparkle Effects */}
            <div className="absolute -top-2 -right-2 text-yellow-400 animate-bounce">
              <Sparkles className="h-6 w-6" />
            </div>
            <div className="absolute -bottom-2 -left-2 text-purple-400 animate-bounce delay-150">
              <Star className="h-6 w-6" />
            </div>
          </div>
          
          {/* Achievement Unlocked Text */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">🎉 Achievement Unlocked!</h2>
            <h3 className={cn('text-xl font-semibold mb-2', rarity.text)}>
              {achievement.title}
            </h3>
            <p className="text-slate-600 text-sm mb-4">{achievement.description}</p>
            
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-semibold">{achievement.points} XP</span>
              </div>
              <Badge className={cn('capitalize', rarity.accent)}>
                {achievement.rarity}
              </Badge>
            </div>
          </div>
          
          {/* Confetti Effect */}
          <div className="text-4xl animate-bounce">
            🎊
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Loading Skeleton
interface AchievementSkeletonProps {
  compact?: boolean
}

const AchievementSkeleton: React.FC<AchievementSkeletonProps> = ({ compact }) => {
  if (compact) {
    return (
      <Card className="overflow-hidden border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-slate-200 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 rounded animate-pulse" />
              <div className="h-2 bg-slate-200 rounded animate-pulse" />
              <div className="h-3 bg-slate-200 rounded w-2/3 animate-pulse" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-slate-200 rounded-full animate-pulse mb-4" />
              <div className="h-6 bg-slate-200 rounded w-20 animate-pulse" />
            </div>
            <div className="space-y-4">
              <div className="h-4 bg-slate-200 rounded animate-pulse" />
              <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-16 bg-slate-200 rounded animate-pulse" />
                ))}
              </div>
            </div>
            <div className="h-20 bg-slate-200 rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-xl animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-200 rounded animate-pulse" />
                    <div className="h-3 bg-slate-200 rounded w-3/4 animate-pulse" />
                  </div>
                </div>
                <div className="h-3 bg-slate-200 rounded animate-pulse" />
                <div className="h-3 bg-slate-200 rounded w-2/3 animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AchievementSystem
