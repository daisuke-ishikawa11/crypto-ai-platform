'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useLearning } from '@/lib/stores/learning-store'
import { lessonCategories } from '@/data/lessons/categories'
import { allContentRegistry, getContentByCategory, getContentStats } from '@/data/lessons/all-content-registry'
import { getDifficultyLabel, formatLearningTime } from '@/lib/utils'
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  Lock,
  Star,
  Filter,
  Search,
  Crown
} from 'lucide-react'

export default function LessonsPage() {
  const { canAccessLesson, currentUser } = useLearning()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const isFreeMember = currentUser?.subscription === 'free'
  
  // デバッグ: レジストリの状態を確認
  const contentStats = getContentStats()
  console.log('Content Registry Stats:', contentStats)
  console.log('Total content items:', allContentRegistry.length)
  console.log('Sample categories:', allContentRegistry.slice(0, 5).map(l => l.categoryId))

  // コンテンツをフィルタリングして、orderIndexでソート（メモ化で最適化）
  const filteredContent = useMemo(() => {
    const searchLower = searchQuery.toLowerCase()
    
    return allContentRegistry
      .filter(content => {
        const matchesCategory = selectedCategory === 'all' || content.categoryId === selectedCategory
        const matchesDifficulty = difficultyFilter === 'all' || content.difficultyLevel === difficultyFilter
        const matchesSearch = searchQuery === '' || 
          content.title.toLowerCase().includes(searchLower) ||
          content.description.toLowerCase().includes(searchLower)
        
        return matchesCategory && matchesDifficulty && matchesSearch
      })
      .sort((a, b) => {
        // 同じカテゴリ内ではorderIndexでソート
        if (a.categoryId === b.categoryId) {
          return a.orderIndex - b.orderIndex;
        }
        // 異なるカテゴリの場合はカテゴリの順序でソート
        const categoryOrder = ['financial-literacy', 'crypto-basics', 'trading-basics', 'defi-nft', 'advanced-investment', 'risk-management', 'regulation-compliance', 'blockchain-tech'];
        return categoryOrder.indexOf(a.categoryId) - categoryOrder.indexOf(b.categoryId);
      })
  }, [selectedCategory, difficultyFilter, searchQuery])

  // カテゴリ別統計（メモ化で最適化）
  const categoryStats = useMemo(() => {
    return lessonCategories.map(category => {
      const categoryContent = getContentByCategory(category.id)
      // canAccessLessonは常にtrueを返すため、すべてのコンテンツが利用可能
      const availableContent = categoryContent
      
      return {
        ...category,
        totalLessons: categoryContent.length,
        availableLessons: availableContent.length,
        progress: 0 // TODO: 実際の進捗を計算
      }
    })
  }, [])

  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">学習コンテンツ一覧</h1>
          <p className="text-muted-foreground">
            {contentStats.totalContent}コンテンツで暗号通貨投資を体系的に学習（レッスン・確認テスト・カテゴリーテスト含む）
          </p>
        </div>
        
        {isFreeMember && (
          <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-lg">
            <Crown className="h-4 w-4" />
            <span className="text-sm font-medium">
              無料プランでは20レッスンまでアクセス可能
            </span>
          </div>
        )}
      </div>

      {/* フィルター */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* 検索 */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="レッスンを検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>

        {/* カテゴリフィルター */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-input rounded-md focus:ring-2 focus:ring-ring"
        >
          <option value="all">すべてのカテゴリ</option>
          {lessonCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.icon} {category.name}
            </option>
          ))}
        </select>

        {/* 難易度フィルター */}
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="px-3 py-2 border border-input rounded-md focus:ring-2 focus:ring-ring"
        >
          <option value="all">すべての難易度</option>
          <option value="beginner">初級</option>
          <option value="intermediate">中級</option>
          <option value="advanced">上級</option>
        </select>
      </div>

      {/* カテゴリ別概要 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categoryStats.map((category) => (
          <Card 
            key={category.id}
            className={`cursor-pointer transition-colors ${
              selectedCategory === category.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedCategory(selectedCategory === category.id ? 'all' : category.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{category.icon}</span>
                <span className="text-sm text-muted-foreground">
                  {category.availableLessons}/{category.totalLessons}
                </span>
              </div>
              <CardTitle className="text-sm">{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={(category.availableLessons / category.totalLessons) * 100} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* コンテンツ一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map((content) => {
          const isAccessible = true // 開発モードではすべて表示
          const category = lessonCategories.find(c => c.id === content.categoryId)
          const isTest = content.contentType === 'test' || content.contentType === 'category-test'
          
          return (
            <Card 
              key={content.id} 
              className={`relative ${isAccessible ? 'hover:shadow-lg transition-shadow' : 'opacity-60'}`}
            >
              {!isAccessible && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-amber-100 text-amber-800 p-2 rounded-full">
                    <Lock className="h-4 w-4" />
                  </div>
                </div>
              )}
              
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{isTest ? '📝' : category?.icon}</span>
                    <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                      {isTest ? (content.contentType === 'category-test' ? 'カテゴリテスト' : '確認テスト') : getDifficultyLabel(content.difficultyLevel)}
                    </span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{formatLearningTime(content.estimatedMinutes)}</span>
                  </div>
                </div>
                
                <CardTitle className="text-lg leading-tight">
                  {content.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {content.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {isTest ? `${content.quizCount}問のテスト` : `${content.quizCount || 0}問のクイズ`}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>4.8</span>
                    </div>
                  </div>
                  
                  {isAccessible ? (
                    <Link href={isTest ? `/learning/categories/${content.categoryId}/test/${content.id}` : `/lessons/${content.slug}`}>
                      <Button className="w-full">
                        {isTest ? 'テストを開始' : 'レッスンを開始'}
                      </Button>
                    </Link>
                  ) : (
                    <div className="space-y-2">
                      <Button className="w-full" disabled>
                        <Lock className="h-4 w-4 mr-2" />
                        プレミアムで解放
                      </Button>
                      <Button className="w-full" variant="outline" size="sm">
                        プレミアムにアップグレード
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">コンテンツが見つかりません</h3>
          <p className="text-muted-foreground mb-4">
            検索条件を変更して再度お試しください
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSelectedCategory('all')
              setDifficultyFilter('all')
              setSearchQuery('')
            }}
          >
            フィルターをクリア
          </Button>
        </div>
      )}
    </div>
  )
}