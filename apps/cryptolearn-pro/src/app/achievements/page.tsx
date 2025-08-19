'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useLearning } from '@/lib/stores/learning-store'
import { 
  Trophy, 
  Star, 
  Target, 
  Flame, 
  BookOpen,
  Calendar,
  Award,
  Crown,
  Lock,
  CheckCircle
} from 'lucide-react'

// 実績データの定義
const achievements = [
  {
    id: 'first-lesson',
    name: '学習の第一歩',
    description: '初めてのレッスンを完了する',
    icon: BookOpen,
    category: 'learning',
    rarity: 'common',
    requirements: { type: 'lessons_completed', value: 1 },
    reward: '10ポイント',
    earned: true,
    earnedAt: '2024-01-15'
  },
  {
    id: 'quiz-master',
    name: 'クイズマスター',
    description: '10個のクイズで満点を取る',
    icon: Star,
    category: 'testing',
    rarity: 'rare',
    requirements: { type: 'perfect_quiz', value: 10 },
    reward: '100ポイント',
    earned: false,
    progress: 3
  },
  {
    id: 'streak-week',
    name: '週間ストリーク',
    description: '7日連続で学習する',
    icon: Flame,
    category: 'streak',
    rarity: 'uncommon',
    requirements: { type: 'streak_days', value: 7 },
    reward: '50ポイント',
    earned: true,
    earnedAt: '2024-01-20'
  },
  {
    id: 'crypto-basics',
    name: '暗号通貨の基礎マスター',
    description: '暗号通貨の基礎カテゴリを完了する',
    icon: Target,
    category: 'completion',
    rarity: 'rare',
    requirements: { type: 'category_completed', value: 1 },
    reward: '200ポイント + 修了証',
    earned: false,
    progress: 15,
    total: 50
  },
  {
    id: 'early-bird',
    name: '早起きの鳥',
    description: '朝6時-8時の間に10レッスン完了',
    icon: Award,
    category: 'special',
    rarity: 'epic',
    requirements: { type: 'morning_lessons', value: 10 },
    reward: '300ポイント + 特別バッジ',
    earned: false,
    progress: 2
  },
  {
    id: 'perfectionist',
    name: '完璧主義者',
    description: '50個のクイズで90点以上を取る',
    icon: Crown,
    category: 'testing',
    rarity: 'legendary',
    requirements: { type: 'high_score_quiz', value: 50 },
    reward: '500ポイント + プレミアム特典',
    earned: false,
    progress: 12
  }
]

const rarityColors = {
  common: 'text-gray-600 bg-gray-100',
  uncommon: 'text-green-600 bg-green-100',
  rare: 'text-blue-600 bg-blue-100',
  epic: 'text-purple-600 bg-purple-100',
  legendary: 'text-yellow-600 bg-yellow-100'
}

const categoryIcons = {
  learning: BookOpen,
  testing: Star,
  streak: Flame,
  completion: Target,
  special: Award
}

export default function AchievementsPage() {
  const { getCompletedLessons, currentUser } = useLearning()
  const isFreeMember = currentUser?.subscription === 'free'

  const earnedAchievements = achievements.filter(a => a.earned)
  const availableAchievements = achievements.filter(a => !a.earned)
  const totalPoints = earnedAchievements.reduce((sum) => sum + 100, 0) // 簡略化されたポイント計算

  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">実績・バッジ</h1>
          <p className="text-muted-foreground">
            学習の成果を実績として記録・表示しましょう
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{totalPoints}</div>
            <div className="text-sm text-muted-foreground">獲得ポイント</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{earnedAchievements.length}</div>
            <div className="text-sm text-muted-foreground">獲得実績</div>
          </div>
        </div>
      </div>

      {/* 統計 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">獲得実績</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{earnedAchievements.length}</div>
            <p className="text-xs text-muted-foreground">/ {achievements.length} 個</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">実績率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((earnedAchievements.length / achievements.length) * 100)}%
            </div>
            <Progress 
              value={(earnedAchievements.length / achievements.length) * 100} 
              className="mt-2" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">レア実績</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {earnedAchievements.filter(a => ['rare', 'epic', 'legendary'].includes(a.rarity)).length}
            </div>
            <p className="text-xs text-muted-foreground">個獲得</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">今月の実績</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">3</div>
            <p className="text-xs text-muted-foreground">個獲得</p>
          </CardContent>
        </Card>
      </div>

      {/* 獲得済み実績 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span>獲得済み実績</span>
          </CardTitle>
          <CardDescription>
            おめでとうございます！これまでに獲得した実績です
          </CardDescription>
        </CardHeader>
        <CardContent>
          {earnedAchievements.length === 0 ? (
            <div className="text-center py-8">
              <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">まだ実績がありません</p>
              <p className="text-sm text-muted-foreground">レッスンを完了して最初の実績を獲得しましょう！</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {earnedAchievements.map((achievement) => {
                const IconComponent = achievement.icon
                return (
                  <div 
                    key={achievement.id} 
                    className="p-4 border rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="h-10 w-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-green-800">{achievement.name}</h3>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${rarityColors[achievement.rarity]}`}>
                          {achievement.rarity}
                        </span>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-sm text-green-700 mb-2">{achievement.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-green-600">報酬: {achievement.reward}</span>
                      <span className="text-green-600">
                        {achievement.earnedAt && new Date(achievement.earnedAt).toLocaleDateString('ja-JP')}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 未獲得実績 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>挑戦可能な実績</span>
          </CardTitle>
          <CardDescription>
            これらの実績を目標に学習を続けましょう
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableAchievements.map((achievement) => {
              const IconComponent = achievement.icon
              const isLocked = isFreeMember && ['epic', 'legendary'].includes(achievement.rarity)
              const progress = achievement.progress || 0
              const total = achievement.total || achievement.requirements.value
              const progressPercentage = Math.min((progress / total) * 100, 100)
              
              return (
                <div 
                  key={achievement.id} 
                  className={`p-4 border rounded-lg ${isLocked ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center">
                      {isLocked ? (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <IconComponent className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{achievement.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${rarityColors[achievement.rarity]}`}>
                          {achievement.rarity}
                        </span>
                        {isLocked && (
                          <span className="inline-block px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-600">
                            <Crown className="h-3 w-3 inline mr-1" />
                            プレミアム
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                  
                  {!isLocked && progress > 0 && (
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-xs">
                        <span>進捗</span>
                        <span>{progress} / {total}</span>
                      </div>
                      <Progress value={progressPercentage} />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">報酬: {achievement.reward}</span>
                    {isLocked && (
                      <Button size="sm" variant="outline" className="text-xs">
                        プレミアムで解放
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* プレミアム案内 */}
      {isFreeMember && (
        <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-purple-700">
              <Crown className="h-5 w-5" />
              <span>プレミアム実績を解放</span>
            </CardTitle>
            <CardDescription>
              プレミアムプランで、より多くの実績と報酬にアクセスしましょう
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-purple-600" />
                  <span>エピック・レジェンダリー実績</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="h-4 w-4 text-purple-600" />
                  <span>特別バッジとポイント</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-purple-600" />
                  <span>実績限定特典</span>
                </div>
              </div>
              <Button className="w-full md:w-auto">
                プレミアムにアップグレード - 月額¥980
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}