"use client"

import * as React from "react"
 
import { 
  Share2, 
  Trophy, 
  Users,
  Crown,
  Medal,
  Star,
  TrendingUp,
  Zap,
  Gift,
  Heart,
  MessageCircle,
  Copy,
  CheckCircle2,
  Sparkles,
  Target,
  Award,
  ExternalLink,
  Upload,
  Download,
  Smile,
  PartyPopper
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface SocialFeaturesProps {
  className?: string
  userId?: string
  currentAchievements?: string[]
  userStats?: {
    level: number
    totalXP: number
    streak: number
    completedChallenges: number
  }
}

export interface LeaderboardEntry {
  id: string
  username: string
  avatar?: string
  level: number
  totalXP: number
  streak: number
  achievements: string[]
  rank: number
  weeklyXP?: number
  monthlyXP?: number
}

export interface CommunityMilestone {
  id: string
  title: string
  description: string
  target: number
  current: number
  type: 'users' | 'tvl' | 'transactions' | 'achievements'
  reward: {
    title: string
    description: string
    type: 'badge' | 'discount' | 'unlock' | 'nft'
  }
  endDate: Date
  participants?: number
}

export interface ShareableContent {
  type: 'achievement' | 'milestone' | 'score' | 'streak' | 'level_up'
  title: string
  description: string
  image?: string
  stats?: Record<string, unknown>
  hashtags?: string[]
}

// Mock data for demonstration
const SAMPLE_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: '1',
    username: 'DeFiMaster2024',
    level: 15,
    totalXP: 12500,
    streak: 45,
    achievements: ['Yield Farmer', 'Risk Master', 'Diamond Hands'],
    rank: 1,
    weeklyXP: 1200
  },
  {
    id: '2', 
    username: 'CryptoNinja',
    level: 14,
    totalXP: 11800,
    streak: 32,
    achievements: ['Protocol Explorer', 'Compound King'],
    rank: 2,
    weeklyXP: 980
  },
  {
    id: '3',
    username: 'YieldSeeker',
    level: 13,
    totalXP: 10200,
    streak: 28,
    achievements: ['First Steps', 'Week Warrior'],
    rank: 3,
    weeklyXP: 850
  }
]

const COMMUNITY_MILESTONES: CommunityMilestone[] = [
  {
    id: '1',
    title: 'Community TVL Challenge',
    description: 'Help our community reach $100M in total value locked across all protocols!',
    target: 100000000,
    current: 75000000,
    type: 'tvl',
    reward: {
      title: 'Golden Bull NFT',
      description: 'Exclusive commemorative NFT for all participants',
      type: 'nft'
    },
    endDate: new Date('2024-03-01'),
    participants: 1250
  },
  {
    id: '2',
    title: '10,000 DeFi Graduates',
    description: 'Complete tutorial series and help 10,000 users graduate from DeFi Academy!',
    target: 10000,
    current: 7500,
    type: 'achievements',
    reward: {
      title: 'Academy Founder Badge',
      description: 'Special recognition for education contributors',
      type: 'badge'
    },
    endDate: new Date('2024-02-15'),
    participants: 2800
  },
  {
    id: '3',
    title: 'Million Transaction Milestone',
    description: 'Reach 1 million successful DeFi transactions as a community!',
    target: 1000000,
    current: 850000,
    type: 'transactions',
    reward: {
      title: '50% Platform Fee Discount',
      description: 'All users get reduced fees for 1 month',
      type: 'discount'
    },
    endDate: new Date('2024-04-01'),
    participants: 5600
  }
]

const REFERRAL_REWARDS = [
  { referrals: 1, reward: 'Welcome Bonus: 100 XP', unlocked: true },
  { referrals: 3, reward: 'Connector Badge + 500 XP', unlocked: true },
  { referrals: 5, reward: 'Ambassador Status + 1000 XP', unlocked: false },
  { referrals: 10, reward: 'Golden Referrer Crown + 2500 XP', unlocked: false },
  { referrals: 25, reward: 'VIP Access + Custom Badge', unlocked: false },
  { referrals: 50, reward: 'Founder Status + Special NFT', unlocked: false }
]

export const SocialFeatures: React.FC<SocialFeaturesProps> = ({
  className = '',
  userId,
  currentAchievements = [],
  userStats = { level: 1, totalXP: 0, streak: 0, completedChallenges: 0 }
}) => {
  const [activeTab, setActiveTab] = React.useState('leaderboard')
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)
  const [selectedShareContent, setSelectedShareContent] = React.useState<ShareableContent | null>(null)
  const [referralCode, setReferralCode] = React.useState('DEFI2024-USER123')
  const [copied, setCopied] = React.useState(false)
  const [referralCount, setReferralCount] = React.useState(3)

  const copyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const shareToSocial = async (platform: string, content: ShareableContent) => {
    const text = `${content.title} ${content.description} #DeFi #Web3 ${content.hashtags?.join(' ') || ''}`
    const url = window.location.href
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`
    }
    
    if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400')
    } else if (navigator.share) {
      try {
        await navigator.share({ title: content.title, text: content.description, url })
      } catch (err) {
        console.log('Share cancelled or failed')
      }
    }
  }

  const generateShareableContent = (type: ShareableContent['type']) => {
    const baseHashtags = ['#DeFiJourney', '#CryptoLearning', '#Web3Education']
    
    switch (type) {
      case 'level_up':
        return {
          type,
          title: `🎆 Level Up Achievement!`,
          description: `Just reached Level ${userStats.level} in DeFi Academy! 💪 The journey to financial freedom continues!`,
          stats: { level: userStats.level, totalXP: userStats.totalXP },
          hashtags: [...baseHashtags, '#LevelUp', '#DeFiMastery']
        }
      case 'streak':
        return {
          type,
          title: `🔥 ${userStats.streak} Day Streak!`,
          description: `Consistency is key! ${userStats.streak} days of DeFi learning and growing. Who else is building their financial future daily?`,
          stats: { streak: userStats.streak },
          hashtags: [...baseHashtags, '#ConsistencyWins', '#DeFiStreak']
        }
      case 'achievement':
        return {
          type,
          title: `🏆 New Achievement Unlocked!`,
          description: `Just earned '${currentAchievements[currentAchievements.length - 1] || 'DeFi Explorer'}' badge! Every step forward in DeFi is a win!`,
          stats: { achievements: currentAchievements.length },
          hashtags: [...baseHashtags, '#Achievement', '#DeFiMilestone']
        }
      default:
        return {
          type: 'milestone' as const,
          title: `🚀 DeFi Progress Update!`,
          description: `Making solid progress in my DeFi journey! Level ${userStats.level} and counting. The future is decentralized!`,
          stats: userStats,
          hashtags: baseHashtags
        }
    }
  }

  const userRank = SAMPLE_LEADERBOARD.findIndex(entry => entry.id === userId) + 1 || 99

  return (
    <div className={cn('max-w-6xl mx-auto space-y-6', className)}>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
          <Users className="h-10 w-10 text-purple-600" />
          DeFi Community Hub
        </h1>
        <p className="text-xl text-slate-600">
          Connect, compete, and celebrate your DeFi journey with fellow learners! 🎉
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-700 mb-1">#{userRank}</div>
            <div className="text-sm text-blue-600">Your Rank</div>
          </CardContent>
        </Card>
        
        <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-700 mb-1">{userStats.totalXP.toLocaleString()}</div>
            <div className="text-sm text-green-600">Total XP</div>
          </CardContent>
        </Card>
        
        <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-700 mb-1 flex items-center justify-center gap-1">
              <Zap className="h-6 w-6" />
              {userStats.streak}
            </div>
            <div className="text-sm text-orange-600">Day Streak</div>
          </CardContent>
        </Card>
        
        <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-700 mb-1">{referralCount}</div>
            <div className="text-sm text-purple-600">Referrals</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="leaderboard" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Leaderboard
          </TabsTrigger>
          <TabsTrigger value="milestones" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Milestones
          </TabsTrigger>
          <TabsTrigger value="share" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share & Earn
          </TabsTrigger>
          <TabsTrigger value="referrals" className="flex items-center gap-2">
            <Gift className="h-4 w-4" />
            Referrals
          </TabsTrigger>
        </TabsList>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard" className="space-y-6">
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <CardTitle className="text-2xl flex items-center gap-3">
                <Trophy className="h-8 w-8" />
                DeFi Champions Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {SAMPLE_LEADERBOARD.map((entry, index) => (
                  <div 
                    key={entry.id} 
                    className={cn(
                      'flex items-center gap-4 p-6 transition-colors hover:bg-slate-50',
                      entry.id === userId && 'bg-blue-50 border-l-4 border-blue-500'
                    )}
                  >
                    {/* Rank */}
                    <div className="flex-shrink-0">
                      {entry.rank <= 3 ? (
                        <div className={cn(
                          'w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg',
                          entry.rank === 1 && 'bg-gradient-to-br from-yellow-400 to-yellow-600',
                          entry.rank === 2 && 'bg-gradient-to-br from-gray-400 to-gray-600',
                          entry.rank === 3 && 'bg-gradient-to-br from-amber-600 to-amber-800'
                        )}>
                          {entry.rank === 1 && <Crown className="h-6 w-6" />}
                          {entry.rank === 2 && <Medal className="h-6 w-6" />}
                          {entry.rank === 3 && <Award className="h-6 w-6" />}
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                          #{entry.rank}
                        </div>
                      )}
                    </div>
                    
                    {/* User Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg text-slate-900">{entry.username}</h3>
                        {entry.id === userId && (
                          <Badge className="bg-blue-500 text-white">You!</Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          Level {entry.level}
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="h-4 w-4 text-orange-500" />
                          {entry.streak} day streak
                        </div>
                        <div className="flex items-center gap-1">
                          <Trophy className="h-4 w-4 text-purple-500" />
                          {entry.achievements.length} achievements
                        </div>
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900">
                        {entry.totalXP.toLocaleString()}
                      </div>
                      <div className="text-sm text-slate-600">Total XP</div>
                      {entry.weeklyXP && (
                        <div className="text-xs text-green-600 mt-1">
                          +{entry.weeklyXP} this week
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="h-8 w-8 text-purple-600" />
                <h3 className="text-xl font-bold text-purple-900">Climb the Ranks!</h3>
              </div>
              <p className="text-purple-700 mb-4">
                Complete more tutorials, maintain your streak, and engage with the community to rise up the leaderboard!
              </p>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                View All Rankings
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Community Milestones Tab */}
        <TabsContent value="milestones" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {COMMUNITY_MILESTONES.map(milestone => {
              const progress = (milestone.current / milestone.target) * 100
              const isCompleted = milestone.current >= milestone.target
              const daysLeft = Math.ceil((milestone.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
              
              return (
                <Card key={milestone.id} className="overflow-hidden border-0 shadow-xl">
                  <CardHeader className={cn(
                    'pb-4',
                    isCompleted 
                      ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' 
                      : 'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
                  )}>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2 flex items-center gap-3">
                          {isCompleted ? (
                            <CheckCircle2 className="h-6 w-6" />
                          ) : (
                            <Target className="h-6 w-6" />
                          )}
                          {milestone.title}
                          {isCompleted && <PartyPopper className="h-6 w-6" />}
                        </CardTitle>
                        <p className="opacity-90">{milestone.description}</p>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          {isCompleted ? '✓' : `${daysLeft}d`}
                        </div>
                        <div className="text-sm opacity-75">
                          {isCompleted ? 'Complete!' : 'remaining'}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Progress */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700">Progress</span>
                          <span className="text-sm text-slate-600">
                            {milestone.type === 'tvl' 
                              ? `$${(milestone.current / 1000000).toFixed(1)}M / $${(milestone.target / 1000000).toFixed(0)}M`
                              : `${milestone.current.toLocaleString()} / ${milestone.target.toLocaleString()}`
                            }
                          </span>
                        </div>
                        <Progress value={Math.min(progress, 100)} className="h-3" />
                        <div className="text-xs text-slate-500 mt-1">
                          {progress.toFixed(1)}% complete
                        </div>
                      </div>
                      
                      {/* Reward */}
                      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                              {milestone.reward.type === 'nft' && <Award className="h-6 w-6 text-white" />}
                              {milestone.reward.type === 'badge' && <Medal className="h-6 w-6 text-white" />}
                              {milestone.reward.type === 'discount' && <Gift className="h-6 w-6 text-white" />}
                            </div>
                            
                            <div className="flex-1">
                              <h4 className="font-semibold text-slate-900">{milestone.reward.title}</h4>
                              <p className="text-sm text-slate-600">{milestone.reward.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Participants */}
                      <div className="flex items-center justify-between text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{milestone.participants?.toLocaleString()} participants</span>
                        </div>
                        
                        <Badge variant="outline" className="capitalize">
                          {milestone.type.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Share & Earn Tab */}
        <TabsContent value="share" className="space-y-6">
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-pink-400 to-rose-500 text-white">
              <CardTitle className="text-2xl flex items-center gap-3">
                <Share2 className="h-8 w-8" />
                Share Your DeFi Journey
              </CardTitle>
              <p className="opacity-90">
                Inspire others and earn rewards by sharing your achievements!
              </p>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Quick Share Options */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900 mb-4">Quick Share</h3>
                  
                  <Button
                    onClick={() => {
                      setSelectedShareContent(generateShareableContent('level_up'))
                      setShareDialogOpen(true)
                    }}
                    className="w-full justify-start bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 hover:from-blue-100 hover:to-blue-200 border border-blue-200"
                    variant="outline"
                  >
                    <TrendingUp className="h-5 w-5 mr-3" />
                    Share Level Progress
                  </Button>
                  
                  <Button
                    onClick={() => {
                      setSelectedShareContent(generateShareableContent('streak'))
                      setShareDialogOpen(true)
                    }}
                    className="w-full justify-start bg-gradient-to-r from-orange-50 to-orange-100 text-orange-800 hover:from-orange-100 hover:to-orange-200 border border-orange-200"
                    variant="outline"
                  >
                    <Zap className="h-5 w-5 mr-3" />
                    Share Daily Streak
                  </Button>
                  
                  <Button
                    onClick={() => {
                      setSelectedShareContent(generateShareableContent('achievement'))
                      setShareDialogOpen(true)
                    }}
                    className="w-full justify-start bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 hover:from-purple-100 hover:to-purple-200 border border-purple-200"
                    variant="outline"
                  >
                    <Trophy className="h-5 w-5 mr-3" />
                    Share Latest Achievement
                  </Button>
                  
                  <Button
                    onClick={() => {
                      setSelectedShareContent(generateShareableContent('milestone'))
                      setShareDialogOpen(true)
                    }}
                    className="w-full justify-start bg-gradient-to-r from-green-50 to-green-100 text-green-800 hover:from-green-100 hover:to-green-200 border border-green-200"
                    variant="outline"
                  >
                    <Star className="h-5 w-5 mr-3" />
                    Share Overall Progress
                  </Button>
                </div>
                
                {/* Share Rewards */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900 mb-4">Sharing Rewards</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium text-green-800">First Share</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">+50 XP</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">Weekly Shares</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">+25 XP each</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center gap-2">
                        <Smile className="h-5 w-5 text-purple-600" />
                        <span className="text-sm font-medium text-purple-800">Engagement Bonus</span>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">+10 XP per like/comment</Badge>
                    </div>
                  </div>
                  
                  <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-5 w-5 text-yellow-600" />
                        <span className="font-semibold text-yellow-800">Pro Tip!</span>
                      </div>
                      <p className="text-sm text-yellow-700">
                        Tag 3 friends in your DeFi posts to earn double XP and help grow our community!
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Referrals Tab */}
        <TabsContent value="referrals" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Referral Code */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-emerald-400 to-green-500 text-white">
                <CardTitle className="text-xl flex items-center gap-3">
                  <Gift className="h-6 w-6" />
                  Your Referral Code
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Input 
                      value={referralCode} 
                      readOnly 
                      className="font-mono text-center text-lg font-bold"
                    />
                    <Button 
                      onClick={copyReferralCode}
                      variant="outline"
                      size="sm"
                      className={cn(
                        'transition-all',
                        copied && 'bg-green-100 text-green-700 border-green-300'
                      )}
                    >
                      {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  <div className="text-center text-sm text-slate-600">
                    Share this code with friends to earn rewards together!
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-slate-900">{referralCount}</div>
                      <div className="text-xs text-slate-500">Successful Referrals</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">1,750</div>
                      <div className="text-xs text-slate-500">XP Earned</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Referral Rewards */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-400 to-pink-500 text-white">
                <CardTitle className="text-xl flex items-center gap-3">
                  <Award className="h-6 w-6" />
                  Referral Rewards
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-3">
                  {REFERRAL_REWARDS.map((reward, index) => (
                    <div 
                      key={index}
                      className={cn(
                        'flex items-center justify-between p-3 rounded-lg border',
                        reward.unlocked 
                          ? 'bg-green-50 border-green-200' 
                          : referralCount >= reward.referrals
                          ? 'bg-yellow-50 border-yellow-200'
                          : 'bg-slate-50 border-slate-200'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                          reward.unlocked
                            ? 'bg-green-500 text-white'
                            : referralCount >= reward.referrals
                            ? 'bg-yellow-500 text-white'
                            : 'bg-slate-300 text-slate-600'
                        )}>
                          {reward.unlocked ? '✓' : reward.referrals}
                        </div>
                        
                        <div>
                          <div className="font-medium text-slate-900 text-sm">
                            {reward.reward}
                          </div>
                          <div className="text-xs text-slate-500">
                            {reward.referrals} referral{reward.referrals !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-xs">
                        {reward.unlocked ? (
                          <Badge className="bg-green-500 text-white">Unlocked</Badge>
                        ) : referralCount >= reward.referrals ? (
                          <Badge className="bg-yellow-500 text-white">Ready!</Badge>
                        ) : (
                          <Badge variant="outline">{reward.referrals - referralCount} more</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Users className="h-8 w-8 text-blue-600" />
                <h3 className="text-xl font-bold text-blue-900">Grow the DeFi Community!</h3>
              </div>
              <p className="text-blue-700 mb-6">
                Help your friends discover the power of DeFi education. Every successful referral makes our community stronger and earns you amazing rewards!
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Share on Social Media
                </Button>
                <Button variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Direct Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Share Your Achievement
            </DialogTitle>
            <DialogDescription>
              Choose how you&apos;d like to share your DeFi progress with the world!
            </DialogDescription>
          </DialogHeader>
          
          {selectedShareContent && (
            <div className="space-y-6">
              {/* Preview */}
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {selectedShareContent.title}
                  </h3>
                  <p className="text-slate-700 mb-4">
                    {selectedShareContent.description}
                  </p>
                  
                  {selectedShareContent.stats && (
                    <div className="flex flex-wrap gap-4 text-sm">
                      {Object.entries(selectedShareContent.stats).map(([key, value]) => (
                        <div key={key} className="bg-white/50 px-3 py-1 rounded-full">
                          <span className="font-medium text-slate-700">
                          {key}: {typeof value === 'number' ? value.toLocaleString() : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {selectedShareContent.hashtags && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedShareContent.hashtags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-purple-600">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Share Options */}
              <div className="grid grid-cols-3 gap-4">
                <Button 
                  onClick={() => shareToSocial('twitter', selectedShareContent)}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Share on Twitter
                </Button>
                
                <Button 
                  onClick={() => shareToSocial('linkedin', selectedShareContent)}
                  className="bg-blue-700 hover:bg-blue-800 text-white"
                >
                  Share on LinkedIn
                </Button>
                
                <Button 
                  onClick={() => shareToSocial('facebook', selectedShareContent)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Share on Facebook
                </Button>
              </div>
              
              {/* Custom Message */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Customize your message:</label>
                <Textarea 
                  placeholder="Add your personal touch to this share..."
                  className="resize-none"
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                  Share & Earn +50 XP
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SocialFeatures
