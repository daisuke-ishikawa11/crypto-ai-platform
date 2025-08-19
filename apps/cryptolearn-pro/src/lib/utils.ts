import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 学習進捗関連のユーティリティ
export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}

// 難易度レベルの日本語変換
export function getDifficultyLabel(level: 'beginner' | 'intermediate' | 'advanced'): string {
  const labels = {
    beginner: '初級',
    intermediate: '中級',
    advanced: '上級'
  }
  return labels[level]
}

// 学習時間のフォーマット
export function formatLearningTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}分`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return remainingMinutes > 0 ? `${hours}時間${remainingMinutes}分` : `${hours}時間`
}

// 日付フォーマット
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

// スコアの評価
export function getScoreGrade(score: number): {
  grade: string
  color: string
  message: string
} {
  if (score >= 90) {
    return {
      grade: 'S',
      color: 'text-yellow-600',
      message: '素晴らしい！'
    }
  } else if (score >= 80) {
    return {
      grade: 'A',
      color: 'text-green-600',
      message: '優秀です！'
    }
  } else if (score >= 70) {
    return {
      grade: 'B',
      color: 'text-blue-600',
      message: '良好です'
    }
  } else if (score >= 60) {
    return {
      grade: 'C',
      color: 'text-orange-600',
      message: '合格です'
    }
  } else {
    return {
      grade: 'D',
      color: 'text-red-600',
      message: '復習が必要です'
    }
  }
}

// レッスンの推定完了時間計算
interface LessonSection {
  content: string
  [key: string]: unknown
}

interface QuizQuestion {
  [key: string]: unknown
}

export function calculateEstimatedTime(sections: LessonSection[], quizQuestions: QuizQuestion[]): number {
  const baseTime = sections.reduce((total, section) => {
    // コンテンツの文字数から読書時間を推定（200文字/分）
    const wordCount = section.content.length
    return total + Math.ceil(wordCount / 200)
  }, 0)
  
  // クイズ時間を追加（1問あたり1分）
  const quizTime = quizQuestions.length
  
  return Math.max(baseTime + quizTime, 5) // 最低5分
}