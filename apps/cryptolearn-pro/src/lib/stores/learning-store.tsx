'use client'

import React, { createContext, useContext } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UserLessonProgress, QuizAttempt, UserCategoryProgress } from '@/types'
import { lessonRegistry } from '@/data/lessons/lesson-registry'

interface LearningState {
  // 学習進捗
  lessonProgress: UserLessonProgress[]
  categoryProgress: UserCategoryProgress[]
  quizAttempts: QuizAttempt[]
  
  // ユーザー設定
  currentUser: {
    id: string
    subscription: 'free' | 'premium'
  } | null
  
  // アクション
  updateLessonProgress: (lessonId: string, progress: Partial<UserLessonProgress>) => void
  completeLesson: (lessonId: string, quizScore?: number) => void
  recordQuizAttempt: (attempt: Omit<QuizAttempt, 'id'>) => void
  updateCategoryProgress: (categoryId: string, progress: Partial<UserCategoryProgress>) => void
  
  // 学習統計
  getCompletedLessons: () => number
  getTotalLessons: () => number
  getOverallProgress: () => number
  getCategoryProgress: (categoryId: string) => UserCategoryProgress | undefined
  
  // フリーミアム制限
  canAccessLesson: (lessonIndex: number) => boolean
}

const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      lessonProgress: [],
      categoryProgress: [],
      quizAttempts: [],
      currentUser: {
        id: 'demo-user',
        subscription: 'free'
      },
      
      updateLessonProgress: (lessonId, progress) => {
        set(state => ({
          lessonProgress: state.lessonProgress.map(p =>
            p.lessonId === lessonId ? { ...p, ...progress } : p
          ).concat(
            state.lessonProgress.find(p => p.lessonId === lessonId) 
              ? [] 
              : [{
                  userId: state.currentUser?.id || 'demo-user',
                  lessonId,
                  status: 'in_progress' as const,
                  progressPercentage: 0,
                  ...progress
                }]
          )
        }))
      },
      
      completeLesson: (lessonId, quizScore) => {
        set(state => ({
          lessonProgress: state.lessonProgress.map(p =>
            p.lessonId === lessonId 
              ? { 
                  ...p, 
                  status: 'completed' as const,
                  progressPercentage: 100,
                  completedAt: new Date(),
                  quizScore
                } 
              : p
          ).concat(
            state.lessonProgress.find(p => p.lessonId === lessonId) 
              ? [] 
              : [{
                  userId: state.currentUser?.id || 'demo-user',
                  lessonId,
                  status: 'completed' as const,
                  progressPercentage: 100,
                  completedAt: new Date(),
                  quizScore
                }]
          )
        }))
      },
      
      recordQuizAttempt: (attempt) => {
        const id = `quiz-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        set(state => ({
          quizAttempts: [...state.quizAttempts, { ...attempt, id }]
        }))
      },
      
      updateCategoryProgress: (categoryId, progress) => {
        set(state => ({
          categoryProgress: state.categoryProgress.map(p =>
            p.categoryId === categoryId ? { ...p, ...progress } : p
          ).concat(
            state.categoryProgress.find(p => p.categoryId === categoryId)
              ? []
              : [{
                  userId: state.currentUser?.id || 'demo-user',
                  categoryId,
                  completedLessons: 0,
                  totalLessons: 0,
                  certificateIssued: false,
                  ...progress
                }]
          )
        }))
      },
      
      getCompletedLessons: () => {
        return get().lessonProgress.filter(p => p.status === 'completed').length
      },
      
      getTotalLessons: () => {
        // 実際のレッスン数を返す（全レッスンから動的取得）
        return lessonRegistry.length
      },
      
      getOverallProgress: () => {
        const { getCompletedLessons, getTotalLessons } = get()
        const completed = getCompletedLessons()
        const total = getTotalLessons()
        return total > 0 ? Math.round((completed / total) * 100) : 0
      },
      
      getCategoryProgress: (categoryId) => {
        return get().categoryProgress.find(p => p.categoryId === categoryId)
      },
      
      canAccessLesson: (lessonIndex) => {
        // 一時的にすべてのレッスンにアクセス可能にする
        return true
      }
    }),
    {
      name: 'cryptolearn-storage',
      version: 1,
    }
  )
)

// Zustandストアを直接エクスポート
export function useLearning() {
  return useLearningStore()
}

// 互換性のためのプロバイダー（実際には何もしない）
export function LearningProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}