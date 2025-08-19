'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useLearning } from '@/lib/stores/learning-store'
import { lessonCategories } from '@/data/lessons/categories'
import { lessonRegistry } from '@/data/lessons/lesson-registry'
import Link from 'next/link'
import { 
  BookOpen, 
  Trophy, 
  Target, 
  TrendingUp,
  Clock,
  Award,
  Crown,
  Zap
} from 'lucide-react'

export default function DashboardPage() {
  const { 
    getCompletedLessons, 
    getTotalLessons, 
    getOverallProgress,
    currentUser,
    canAccessLesson
  } = useLearning()

  const completedLessons = getCompletedLessons()
  const totalLessons = getTotalLessons()
  const overallProgress = getOverallProgress()
  const isFreeMember = currentUser?.subscription === 'free'
  
  // 最新レッスン（無料ユーザーは最初の20レッスンから）
  const availableLessons = lessonRegistry.filter((_, index) => canAccessLesson(index))
  const recentLessons = availableLessons.slice(0, 6)

  // カテゴリ別進捗
  const categoryStats = lessonCategories.map(category => {
    const categoryLessons = lessonRegistry.filter(lesson => lesson.categoryId === category.id)
    const categoryCompletedLessons = categoryLessons.filter(lesson => 
      completedLessons > 0 // 簡略化された進捗計算
    )
    
    return {
      ...category,
      totalLessons: categoryLessons.length,
      completedLessons: categoryCompletedLessons.length,
      progress: categoryLessons.length > 0 
        ? Math.round((categoryCompletedLessons.length / categoryLessons.length) * 100) 
        : 0
    }
  })

  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">ダッシュボード</h1>
          <p className="text-muted-foreground">
            270レッスンで暗号通貨投資を体系的に学習
          </p>
        </div>
        
        {isFreeMember && (
          <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
            <Crown className="h-5 w-5 text-yellow-500" />
            <div className="flex-1">
              <p className="text-sm font-medium">無料プランをお使いです</p>
              <p className="text-xs text-muted-foreground">20レッスンまでアクセス可能</p>
            </div>
            <Button size="sm" className="ml-2">
              プレミアムにアップグレード
            </Button>
          </div>
        )}
      </div>

      {/* 学習統計 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">完了レッスン</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedLessons}</div>
            <p className="text-xs text-muted-foreground">
              / {isFreeMember ? 20 : totalLessons} レッスン
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">進捗率</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress}%</div>
            <Progress value={overallProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">学習時間</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">時間</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">実績</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">個獲得</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* カテゴリ別進捗 */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>カテゴリ別進捗</span>
              </CardTitle>
              <CardDescription>
                8つのカテゴリーの学習状況
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {categoryStats.map((category) => (
                <div key={category.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {category.completedLessons}/{category.totalLessons}
                    </span>
                  </div>
                  <Progress value={category.progress} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* 最近のレッスン */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>おすすめレッスン</span>
              </CardTitle>
              <CardDescription>
                {isFreeMember ? '無料で学習できるレッスン' : '最近追加されたレッスン'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentLessons.map((lesson) => (
                <Link 
                  key={lesson.id} 
                  href={`/lessons/${lesson.slug}`}
                  className="block p-3 rounded-lg border hover:bg-accent transition-colors"
                >
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm leading-tight">
                      {lesson.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {lesson.estimatedMinutes}分 • {lesson.difficultyLevel === 'beginner' ? '初級' : lesson.difficultyLevel === 'intermediate' ? '中級' : '上級'}
                    </p>
                  </div>
                </Link>
              ))}
              
              <Link href="/lessons">
                <Button className="w-full mt-4" variant="outline">
                  すべてのレッスンを見る
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* 最近の実績 */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>最近の実績</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3 p-2 rounded-lg bg-green-50">
                <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Trophy className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">初回レッスン完了</p>
                  <p className="text-xs text-muted-foreground">2日前</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-2 rounded-lg bg-blue-50">
                <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">学習ストリーク3日</p>
                  <p className="text-xs text-muted-foreground">1日前</p>
                </div>
              </div>
              
              <Link href="/achievements">
                <Button className="w-full" variant="outline" size="sm">
                  すべての実績を見る
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}