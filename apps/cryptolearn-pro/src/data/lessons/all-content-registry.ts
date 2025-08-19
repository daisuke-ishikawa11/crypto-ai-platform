import type { LessonMeta } from './lesson-registry'
import { lessonRegistry } from './lesson-registry'
import { allTests } from './index'

// テスト用のメタデータ型拡張
export interface ContentMeta extends LessonMeta {
  contentType: 'lesson' | 'test' | 'category-test'
}

// レッスンをContentMetaに変換
const lessonContent: ContentMeta[] = lessonRegistry.map(lesson => ({
  ...lesson,
  contentType: 'lesson' as const
}))

// テストをContentMetaに変換
const testContent: ContentMeta[] = allTests.map(test => {
  // テストの種類を判定
  const isLessonTest = test.id.includes('test-')
  const isCategoryTest = test.id.includes('category-test')
  
  return {
    id: test.id,
    categoryId: test.categoryId,
    title: test.title,
    slug: `test-${test.id}`, // テスト用のスラッグ
    description: test.description,
    difficultyLevel: 'intermediate' as const, // テストは中級レベルとして設定
    estimatedMinutes: test.timeLimit,
    orderIndex: isLessonTest 
      ? parseInt(test.lessonRange.split('-')[0]) * 1000 // レッスンテストは該当レッスンの後に配置
      : 999999, // カテゴリテストは最後に配置
    isPublished: true,
    quizCount: test.questions.length,
    lastUpdated: test.lastUpdated,
    factChecked: test.factChecked,
    contentType: isCategoryTest ? 'category-test' as const : 'test' as const
  }
})

// 全コンテンツを統合してソート
export const allContentRegistry: ContentMeta[] = [
  ...lessonContent,
  ...testContent
].sort((a, b) => {
  // カテゴリー順でソート
  const categoryOrder = [
    'financial-literacy', 
    'crypto-basics', 
    'trading-basics', 
    'defi-nft', 
    'advanced-investment', 
    'risk-management', 
    'regulation-compliance', 
    'blockchain-tech'
  ]
  
  const categoryComparison = categoryOrder.indexOf(a.categoryId) - categoryOrder.indexOf(b.categoryId)
  if (categoryComparison !== 0) return categoryComparison
  
  // 同じカテゴリ内ではorderIndexでソート
  return a.orderIndex - b.orderIndex
})

// カテゴリ別にコンテンツを取得
export const getContentByCategory = (categoryId: string): ContentMeta[] => {
  return allContentRegistry.filter(content => content.categoryId === categoryId)
}

// コンテンツ統計
export const getContentStats = () => {
  const totalContent = allContentRegistry.length
  const lessons = allContentRegistry.filter(c => c.contentType === 'lesson').length
  const tests = allContentRegistry.filter(c => c.contentType === 'test').length
  const categoryTests = allContentRegistry.filter(c => c.contentType === 'category-test').length
  
  return {
    totalContent,
    lessons,
    tests,
    categoryTests
  }
}

// デバッグ用: 統計を出力
console.log('Content Registry Stats:', getContentStats())
console.log('Total Content Items:', allContentRegistry.length)