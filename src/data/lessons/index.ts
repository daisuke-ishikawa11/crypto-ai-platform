import { lesson1 } from './financial-literacy/lesson-1'
import { lesson2 } from './financial-literacy/lesson-2'
import { cryptoBasicsLessons } from './crypto-basics'
import { tradingBasicsLessons } from './trading-basics'
import { defiNftLessons } from './defi-nft'
import { advancedInvestmentLessons } from './advanced-investment'
import { Lesson } from '@/lib/types/learning'

export const allLessons: Lesson[] = [
  lesson1,
  lesson2,
  ...cryptoBasicsLessons,
  ...tradingBasicsLessons,
  ...defiNftLessons,
  ...advancedInvestmentLessons
]

export const getLessonBySlug = (slug: string): Lesson | undefined => {
  return allLessons.find(lesson => lesson.slug === slug)
}

export const getLessonsByCategory = (categoryId: string): Lesson[] => {
  return allLessons.filter(lesson => lesson.categoryId === categoryId)
} 