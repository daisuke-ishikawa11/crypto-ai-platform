'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useLearning } from '@/lib/stores/learning-store'
import { lessonCategories } from '@/data/lessons/categories'
import { allLessons } from '@/data/lessons'
import { 
  Award, 
  Download, 
  Share2, 
  Calendar,
  Crown,
  Lock
} from 'lucide-react'

export default function CertificatesPage() {
  const { currentUser, getCompletedLessons } = useLearning()
  const isFreeMember = currentUser?.subscription === 'free'

  // カテゴリ別修了状況を計算
  const categoryProgress = lessonCategories.map(category => {
    const categoryLessons = allLessons.filter(lesson => lesson.categoryId === category.id)
    const completed = 0 // TODO: 実際の完了数を計算
    const progress = categoryLessons.length > 0 ? (completed / categoryLessons.length) * 100 : 0
    const canIssue = progress >= 80 // 80%以上で修了証発行可能
    
    return {
      ...category,
      totalLessons: categoryLessons.length,
      completedLessons: completed,
      progress,
      canIssue,
      issued: false // TODO: 実際の発行状況を確認
    }
  })

  const overallProgress = (getCompletedLessons() / 270) * 100
  const canIssueOverall = overallProgress >= 80

  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">修了証</h1>
          <p className="text-muted-foreground">
            学習の成果を証明する修了証を取得しましょう
          </p>
        </div>
      </div>

      {/* 全体修了証 */}
      <Card className="border-2 border-dashed border-yellow-300 bg-gradient-to-r from-yellow-50 to-amber-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">CryptoLearn Pro 全コース修了証</CardTitle>
                <CardDescription>
                  270レッスン全てを修了すると発行されます
                </CardDescription>
              </div>
            </div>
            {isFreeMember ? (
              <div className="flex items-center space-x-2 text-amber-600">
                <Crown className="h-5 w-5" />
                <span className="text-sm font-medium">プレミアム限定</span>
              </div>
            ) : (
              <Button 
                disabled={!canIssueOverall}
                className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700"
              >
                {canIssueOverall ? (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    修了証を取得
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    80%以上で取得可能
                  </>
                )}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>全体進捗</span>
              <span>{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            <p className="text-xs text-muted-foreground">
              {getCompletedLessons()} / 270 レッスン完了
            </p>
          </div>
        </CardContent>
      </Card>

      {/* カテゴリ別修了証 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categoryProgress.map((category) => (
          <Card key={category.id} className="relative">
            {isFreeMember && (
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-amber-100 text-amber-800 p-1 rounded-full">
                  <Crown className="h-4 w-4" />
                </div>
              </div>
            )}
            
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-xl">{category.icon}</span>
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {category.totalLessons}レッスン
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>進捗</span>
                  <span>{Math.round(category.progress)}%</span>
                </div>
                <Progress value={category.progress} />
                <p className="text-xs text-muted-foreground">
                  {category.completedLessons} / {category.totalLessons} レッスン完了
                </p>
              </div>
              
              <div className="flex space-x-2">
                {category.issued ? (
                  <>
                    <Button className="flex-1" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      ダウンロード
                    </Button>
                    <Button size="icon" variant="outline">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </>
                ) : category.canIssue && !isFreeMember ? (
                  <Button className="flex-1">
                    <Award className="h-4 w-4 mr-2" />
                    修了証を取得
                  </Button>
                ) : (
                  <Button className="flex-1" disabled>
                    <Lock className="h-4 w-4 mr-2" />
                    {isFreeMember ? 'プレミアム限定' : `${Math.round(80 - category.progress)}%で取得可能`}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 修了証の特典 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>修了証の特典</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium">公式認定</h3>
              <p className="text-sm text-muted-foreground">
                CryptoLearn Proの公式認定修了証として履歴書やポートフォリオに記載可能
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                <Share2 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium">SNS共有</h3>
              <p className="text-sm text-muted-foreground">
                LinkedInやTwitterで学習成果をアピール。専門性をアピールできます
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium">永続保存</h3>
              <p className="text-sm text-muted-foreground">
                発行日付入りのPDF形式で、いつでもダウンロード・印刷が可能
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* プレミアム案内 */}
      {isFreeMember && (
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-700">
              <Crown className="h-5 w-5" />
              <span>プレミアムで修了証を取得</span>
            </CardTitle>
            <CardDescription>
              プレミアムプランにアップグレードして、すべての修了証機能をお楽しみください
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">全カテゴリーの修了証取得</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Download className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">高品質PDF形式でダウンロード</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Share2 className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">SNS共有機能</span>
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