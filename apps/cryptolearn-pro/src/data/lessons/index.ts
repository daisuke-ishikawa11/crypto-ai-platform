import { financialLiteracyLessons, financialLiteracyTest, financialLiteracyTests } from './financial-literacy'
import { cryptoBasicsLessons, cryptoBasicsCategoryTest, cryptoBasicsTests } from './crypto-basics'
import { tradingBasicsLessons, tradingBasicsCategoryTest, tradingBasicsTests } from './trading-basics'
import { defiNftLessons, defiNftCategoryTest, defiNftTests } from './defi-nft'
import { advancedInvestmentLessons, advancedInvestmentCategoryTest, advancedInvestmentTests } from './advanced-investment'
import { riskManagementLessons, riskManagementTests } from './risk-management'
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
  cryptoBasicsCategoryTest,
  tradingBasicsCategoryTest,
  defiNftCategoryTest,
  advancedInvestmentCategoryTest,
  riskManagementTests[5] // riskManagementCategoryTest
]

export const getCategoryTest = (categoryId: string): CategoryTest | undefined => {
  return allCategoryTests.find(test => test.categoryId === categoryId)
}

// 5レッスンごとの確認テスト (5-lesson tests)
export const allLessonTests: CategoryTest[] = [
  ...financialLiteracyTests,
  ...cryptoBasicsTests,
  ...tradingBasicsTests,
  ...defiNftTests,
  ...advancedInvestmentTests,
  ...riskManagementTests.slice(0, 5) // riskManagementTest1-5
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
