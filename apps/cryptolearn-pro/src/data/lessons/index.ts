import { financialLiteracyLessons, financialLiteracyTest } from './financial-literacy'
import { cryptoBasicsLessons, cryptoBasicsCategoryTest, cryptoBasicsTests } from './crypto-basics'
import { tradingBasicsLessons } from './trading-basics'
import { defiNftLessons } from './defi-nft'
import { advancedInvestmentLessons } from './advanced-investment'
import { riskManagementLessons } from './risk-management'
import { regulationComplianceLessons } from './regulation-compliance'
import { blockchainTechLessons } from './blockchain-tech'
import { Lesson, CategoryTest } from '@/lib/types/learning'

export const allLessons: Lesson[] = [
  ...financialLiteracyLessons,
  ...cryptoBasicsLessons,
  ...tradingBasicsLessons,
  ...defiNftLessons,
  ...advancedInvestmentLessons,
  ...riskManagementLessons,
  ...regulationComplianceLessons,
  ...blockchainTechLessons
]

export const getLessonBySlug = (slug: string): Lesson | undefined => {
  return allLessons.find(lesson => lesson.slug === slug)
}

export const getLessonsByCategory = (categoryId: string): Lesson[] => {
  return allLessons.filter(lesson => lesson.categoryId === categoryId)
}

export const allCategoryTests: CategoryTest[] = [
  financialLiteracyTest,
  cryptoBasicsCategoryTest
]

export const getCategoryTest = (categoryId: string): CategoryTest | undefined => {
  return allCategoryTests.find(test => test.categoryId === categoryId)
}

// 5レッスンごとの確認テスト (5-lesson tests)
export const allLessonTests: CategoryTest[] = [
  ...cryptoBasicsTests
]

// 全テスト統合 (All tests combined)
export const allTests: CategoryTest[] = [
  ...allCategoryTests,
  ...allLessonTests
]

export const getLessonTests = (categoryId: string): CategoryTest[] => {
  return allLessonTests.filter(test => test.categoryId === categoryId)
}

export const getTestById = (testId: string): CategoryTest | undefined => {
  return allTests.find(test => test.id === testId)
}
