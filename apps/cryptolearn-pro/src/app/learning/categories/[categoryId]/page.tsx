'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getLessonsByCategory, getCategoryTest } from '@/data/lessons'
import { lessonCategories } from '@/data/lessons/categories'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, Clock, Star, Trophy, CheckCircle } from 'lucide-react'
import type { Lesson, CategoryTest } from '@/lib/types/learning'

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const categoryId = params.categoryId as string
  
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [categoryTest, setCategoryTest] = useState<CategoryTest | null>(null)
  const [category, setCategory] = useState<typeof lessonCategories[0] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const categoryLessons = getLessonsByCategory(categoryId)
    const test = getCategoryTest(categoryId)
    const categoryInfo = lessonCategories.find(cat => cat.id === categoryId)
    
    setLessons(categoryLessons)
    setCategoryTest(test)
    setCategory(categoryInfo)
    setIsLoading(false)
  }, [categoryId])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold">カテゴリーが見つかりません</h3>
              <p className="text-muted-foreground mt-2">
                指定されたカテゴリーは存在しません。
              </p>
              <Button onClick={() => router.push('/lessons')} className="mt-4">
                レッスン一覧に戻る
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const completedLessons = 0 // TODO: ユーザーの進捗データから取得
  const progress = lessons.length > 0 ? (completedLessons / lessons.length) * 100 : 0

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-8">
        {/* ヘッダー */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.push('/lessons')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            レッスン一覧に戻る
          </Button>
        </div>

        {/* カテゴリー情報 */}
        <div className="text-center space-y-4">
          <div className="text-6xl">{category.icon}</div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{category.title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {category.description}
            </p>
          </div>
          
          {/* 進捗情報 */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm mb-2">
              <span>学習進捗</span>
              <span>{completedLessons} / {lessons.length} レッスン完了</span>
            </div>
            <Progress value={progress} />
          </div>
        </div>

        {/* カテゴリー統計 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{lessons.length}</div>
                <div className="text-sm text-muted-foreground">総レッスン数</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{Math.round(progress)}%</div>
                <div className="text-sm text-muted-foreground">完了率</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {lessons.reduce((total, lesson) => total + lesson.estimatedMinutes, 0)}分
                </div>
                <div className="text-sm text-muted-foreground">総学習時間</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {lessons.filter(lesson => lesson.quiz && lesson.quiz.length > 0).length}
                </div>
                <div className="text-sm text-muted-foreground">クイズ付きレッスン</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* カテゴリーテスト */}
        {categoryTest && (
          <Card className="border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Trophy className="h-6 w-6 text-yellow-600" />
                <CardTitle className="text-yellow-800">カテゴリー確認テスト</CardTitle>
              </div>
              <CardDescription className="text-yellow-700">
                このカテゴリーの理解度を確認する総合テストです。
                {categoryTest.passingScore}%以上で合格となり、修了証を発行できます。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div className="space-y-2">
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                      {categoryTest.questions.length}問
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-blue-600" />
                      約{Math.ceil(categoryTest.questions.length * 1.5)}分
                    </span>
                    <Badge variant="secondary">
                      合格基準: {categoryTest.passingScore}%
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ・基本問題、中級問題、上級問題を含む包括的なテスト<br/>
                    ・合格者には修了証を発行します<br/>
                    ・何度でも受験可能です
                  </div>
                </div>
                <Button 
                  onClick={() => router.push(`/learning/categories/${categoryId}/test`)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                  size="lg"
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  確認テストを受ける
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* レッスン一覧 */}
        <div>
          <h2 className="text-2xl font-bold mb-6">レッスン一覧</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson, index) => (
              <Card key={lesson.id} className="relative hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{category.icon}</span>
                      <Badge variant={
                        lesson.difficultyLevel === 'beginner' ? 'default' :
                        lesson.difficultyLevel === 'intermediate' ? 'secondary' :
                        'destructive'
                      }>
                        {lesson.difficultyLevel === 'beginner' ? '初級' :
                         lesson.difficultyLevel === 'intermediate' ? '中級' : '上級'}
                      </Badge>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">{lesson.estimatedMinutes}分</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {lesson.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {lesson.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {lesson.quiz?.length || 0}問のクイズ
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>4.8</span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => router.push(`/lessons/${lesson.slug}`)}
                      className="w-full"
                    >
                      レッスンを開始
                    </Button>
                  </div>
                </CardContent>
                {/* レッスン番号 */}
                <div className="absolute top-2 left-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* フッター情報 */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-blue-800">
                {category.title}カテゴリーについて
              </h3>
              <p className="text-blue-700 max-w-3xl mx-auto">
                このカテゴリーでは、{category.description}
                全{lessons.length}レッスンを通じて、体系的に学習を進めることができます。
                最後に確認テストを受けて、学習の成果を確認しましょう。
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}