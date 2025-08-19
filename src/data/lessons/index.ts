import { financialLiteracyLessons } from './financial-literacy'
import { cryptoBasicsLessons } from './crypto-basics'
import { tradingBasicsLessons } from './trading-basics'
import { defiNftLessons } from './defi-nft'
import { advancedInvestmentLessons } from './advanced-investment'
import { riskManagementLessons } from './risk-management'
import { regulationComplianceLessons } from './regulation-compliance'
import { blockchainTechLessons } from './blockchain-tech'
import { Lesson } from '@/lib/types/learning'

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
