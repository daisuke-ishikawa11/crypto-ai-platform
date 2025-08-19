'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useLearning } from '@/lib/stores/learning-store'
import { loadLesson, getLessonMeta, lessonRegistry } from '@/data/lessons/lesson-registry'
import { lessonCategories } from '@/data/lessons/categories'
import { getDifficultyLabel, formatLearningTime, getScoreGrade } from '@/lib/utils'
import { Lesson } from '@/types'
import { grantCategoryTestTickets } from '@/lib/rewards'
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Trophy,
  RotateCcw,
  Loader2
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'
import Link from 'next/link'

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const { completeLesson, recordQuizAttempt, canAccessLesson } = useLearning()
  const { success, warning } = useToast()
  
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<number[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizScore, setQuizScore] = useState<number | null>(null)
  const [showExplanations, setShowExplanations] = useState(false)

  const lessonMeta = getLessonMeta(params.slug as string)
  const lessonIndex = lessonRegistry.findIndex(l => l.slug === params.slug)
  const isAccessible = canAccessLesson(lessonIndex)

  useEffect(() => {
    async function loadLessonData() {
      if (!lessonMeta || !isAccessible) {
        router.push('/lessons')
        return
      }

      try {
        setLoading(true)
        const lessonData = await loadLesson(params.slug as string)
        setLesson(lessonData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load lesson')
      } finally {
        setLoading(false)
      }
    }

    loadLessonData()
  }, [params.slug, lessonMeta, isAccessible, router])

  // ローディング中
  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="h-12 w-12 mx-auto animate-spin text-blue-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">レッスンを読み込み中...</h2>
        <p className="text-muted-foreground">
          しばらくお待ちください
        </p>
      </div>
    )
  }

  // エラー状態
  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">エラーが発生しました</h2>
        <p className="text-muted-foreground mb-4">
          {error}
        </p>
        <Button onClick={() => router.push('/lessons')}>
          レッスン一覧に戻る
        </Button>
      </div>
    )
  }

  // アクセス権限がない
  if (!lessonMeta || !isAccessible) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">アクセスできません</h2>
        <p className="text-muted-foreground mb-4">
          このレッスンにはプレミアムプランが必要です
        </p>
        <Button onClick={() => router.push('/lessons')}>
          レッスン一覧に戻る
        </Button>
      </div>
    )
  }

  // レッスンデータがない
  if (!lesson) {
    return null
  }

  const category = lessonCategories.find(c => c.id === lesson.categoryId)
  const totalSections = lesson.content?.sections?.length || 0
  const progress = showQuiz ? 100 : totalSections > 0 ? Math.round(((currentSection + 1) / totalSections) * 100) : 0

  const handleNextSection = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1)
    } else {
      setShowQuiz(true)
    }
  }

  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers]
    newAnswers[questionIndex] = answerIndex
    setQuizAnswers(newAnswers)
  }

  const handleQuizSubmit = () => {
    if (!lesson.quiz || lesson.quiz.length === 0) {
      console.error('Quiz data not available')
      return
    }

    const correctAnswers = lesson.quiz.reduce((count, question, index) => {
      return count + (quizAnswers[index] === question.correctAnswer ? 1 : 0)
    }, 0)

    const score = Math.round((correctAnswers / lesson.quiz.length) * 100)
    setQuizScore(score)
    setQuizCompleted(true)
    setShowExplanations(true)

    // 学習進捗を記録
    completeLesson(lesson.id, score)
    recordQuizAttempt({
      userId: 'demo-user',
      lessonId: lesson.id,
      score,
      answers: quizAnswers,
      submittedAt: new Date()
    })

    // 準備コード（デモ用）: 環境変数で有効化時のみ呼び出し
    try {
      // クライアント環境変数（未設定/falseで無効）
      const enabled = typeof window !== 'undefined' && (process.env.NEXT_PUBLIC_ENABLE_LESSON_REWARD_DEMO === '1')
      if (enabled) {
        const uid = 'demo-user'
        grantCategoryTestTickets({ userId: uid, categoryId: lesson.categoryId, testId: `lesson-${lesson.orderIndex}`, score }, { token: process.env.NEXT_PUBLIC_LEARNING_TOKEN })
          .then((r) => { 
            if (r?.success && (r.granted ?? 0) > 0) {
              success('チケットを付与しました。', {
                description: `+${r.granted} / 残高: ${r.balance ?? '-'}`,
                action: (
                  <ToastAction altText="DeFiへ">
                    <Link href={'/defi?tab=dashboard#risk-inspector'}>DeFiで確認</Link>
                  </ToastAction>
                )
              })
            } else if (r?.success) {
              warning('チケット条件を満たしていません。', { description: '基準スコア未達か、既に付与済みです。' })
            }
          })
          .catch(() => { warning('カテゴリ確認テストのチケット獲得に失敗しました。') })
      }
    } catch {}
  }

  const resetQuiz = () => {
    setQuizAnswers([])
    setQuizCompleted(false)
    setQuizScore(null)
    setShowExplanations(false)
  }

  const currentSectionData = lesson.content?.sections?.[currentSection]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.push('/lessons')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          レッスン一覧に戻る
        </Button>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>{category?.icon}</span>
          <span>{category?.name}</span>
        </div>
      </div>

      {/* レッスン情報 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl">{lesson.title}</CardTitle>
              <CardDescription className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatLearningTime(lesson.estimatedMinutes)}
                </span>
                <span className="px-2 py-1 bg-secondary rounded-full text-xs">
                  {getDifficultyLabel(lesson.difficultyLevel)}
                </span>
              </CardDescription>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>進捗</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
        </CardHeader>
      </Card>

      {!showQuiz ? (
        /* レッスンコンテンツ */
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">
                {currentSectionData?.title || 'レッスン準備中'}
              </CardTitle>
              <span className="text-sm text-muted-foreground">
                {currentSection + 1} / {totalSections}
              </span>
            </div>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none lesson-content">
            <div dangerouslySetInnerHTML={{ __html: currentSectionData?.content || '<p>コンテンツを準備中です...</p>' }} />
          </CardContent>
        </Card>
      ) : (
        /* クイズセクション */
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5" />
              <span>理解度クイズ</span>
            </CardTitle>
            <CardDescription>
              {quizCompleted 
                ? `${lesson.quiz?.length || 0}問中${lesson.quiz?.reduce((count, _, index) => count + (quizAnswers[index] === lesson.quiz[index].correctAnswer ? 1 : 0), 0) || 0}問正解`
                : `${lesson.quiz?.length || 0}問のクイズで理解度をチェックしましょう`
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {(lesson.quiz || []).map((question, questionIndex) => (
              <div key={question.id} className="space-y-3">
                <h3 className="font-medium">
                  問{questionIndex + 1}: {question.question}
                </h3>
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => {
                    const isSelected = quizAnswers[questionIndex] === optionIndex
                    const isCorrect = optionIndex === question.correctAnswer
                    const isIncorrect = showExplanations && isSelected && !isCorrect
                    
                    return (
                      <button
                        key={optionIndex}
                        onClick={() => !quizCompleted && handleQuizAnswer(questionIndex, optionIndex)}
                        disabled={quizCompleted}
                        className={`w-full p-3 text-left rounded-lg border transition-colors quiz-option ${
                          isSelected && !showExplanations ? 'selected' : ''
                        } ${showExplanations && isCorrect ? 'correct' : ''} ${
                          showExplanations && isIncorrect ? 'incorrect' : ''
                        }`}
                      >
                        <span className="flex items-center">
                          <span className="w-6 h-6 border rounded-full mr-3 flex items-center justify-center text-sm">
                            {String.fromCharCode(65 + optionIndex)}
                          </span>
                          {option}
                          {showExplanations && isCorrect && (
                            <CheckCircle className="h-4 w-4 ml-auto text-green-600" />
                          )}
                        </span>
                      </button>
                    )
                  })}
                </div>
                
                {showExplanations && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>解説:</strong> {question.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}

            <div className="flex justify-between items-center pt-4 border-t">
              {!quizCompleted ? (
                <div className="flex space-x-3">
                  <Button
                    onClick={handleQuizSubmit}
                    disabled={quizAnswers.length !== (lesson.quiz?.length || 0)}
                  >
                    回答を送信
                  </Button>
                  <Button variant="outline" onClick={() => setShowQuiz(false)}>
                    レッスンに戻る
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-4">
                    {quizScore !== null && (
                      <div className="flex items-center space-x-2">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        <span className="font-medium">
                          スコア: {quizScore}点
                        </span>
                        <span className={`font-bold ${getScoreGrade(quizScore).color}`}>
                          ({getScoreGrade(quizScore).grade}評価)
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button variant="outline" onClick={resetQuiz}>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      再挑戦
                    </Button>
                    <Button onClick={() => router.push('/lessons')}>
                      次のレッスンへ
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ナビゲーション */}
      {!showQuiz && (
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevSection}
            disabled={currentSection === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            前のセクション
          </Button>
          
          <Button onClick={handleNextSection}>
            {currentSection < totalSections - 1 ? (
              <>
                次のセクション
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            ) : (
              <>
                クイズに挑戦
                <Trophy className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      )}

      {/* 重要なポイント */}
      {!showQuiz && (lesson.content?.keyPoints?.length || 0) > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">重要なポイント</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {(lesson.content?.keyPoints || []).map((point, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-green-600 flex-shrink-0" />
                  <span className="text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
