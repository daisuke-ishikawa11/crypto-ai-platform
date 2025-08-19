'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getCategoryTest } from '@/data/lessons'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { AlertCircle, CheckCircle, Clock, Trophy, ArrowLeft } from 'lucide-react'
import { grantCategoryTestTickets } from '@/lib/rewards'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'
import { ToastAction } from '@/components/ui/toast'
import type { CategoryTest, TestQuestion } from '@/lib/types/learning'

interface TestState {
  currentQuestionIndex: number
  answers: { [questionId: string]: string }
  startTime: Date
  isCompleted: boolean
  score: number
  timeTaken: number
}

interface TestResult {
  score: number
  passed: boolean
  timeTaken: number
  incorrectQuestions: TestQuestion[]
  analysis: {
    basicQuestions: { correct: number; total: number }
    intermediateQuestions: { correct: number; total: number }
    advancedQuestions: { correct: number; total: number }
  }
}

export default function CategoryTestPage() {
  const params = useParams()
  const router = useRouter()
  const categoryId = params.categoryId as string
  const { success, warning } = useToast()
  const [userId, setUserId] = useState<string>('')
  
  const [test, setTest] = useState<CategoryTest | null>(null)
  const [testState, setTestState] = useState<TestState>({
    currentQuestionIndex: 0,
    answers: {},
    startTime: new Date(),
    isCompleted: false,
    score: 0,
    timeTaken: 0
  })
  const [testResult, setTestResult] = useState<TestResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const categoryTest = getCategoryTest(categoryId)
    if (categoryTest) {
      setTest(categoryTest)
    }
    setIsLoading(false)
  }, [categoryId])

  useEffect(() => {
    (async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user?.id) setUserId(user.id)
      } catch {}
    })()
  }, [])

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setTestState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer
      }
    }))
  }

  const handleNextQuestion = () => {
    if (test && testState.currentQuestionIndex < test.questions.length - 1) {
      setTestState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }))
    }
  }

  const handlePreviousQuestion = () => {
    if (testState.currentQuestionIndex > 0) {
      setTestState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1
      }))
    }
  }

  const calculateScore = (): TestResult => {
    if (!test) return {
      score: 0,
      passed: false,
      timeTaken: 0,
      incorrectQuestions: [],
      analysis: {
        basicQuestions: { correct: 0, total: 0 },
        intermediateQuestions: { correct: 0, total: 0 },
        advancedQuestions: { correct: 0, total: 0 }
      }
    }

    const endTime = new Date()
    const timeTaken = Math.round((endTime.getTime() - testState.startTime.getTime()) / 1000 / 60)
    
    let correctAnswers = 0
    const incorrectQuestions: TestQuestion[] = []
    const analysis = {
      basicQuestions: { correct: 0, total: 0 },
      intermediateQuestions: { correct: 0, total: 0 },
      advancedQuestions: { correct: 0, total: 0 }
    }

    test.questions.forEach(question => {
      const userAnswer = testState.answers[question.id]
      const isCorrect = userAnswer === question.correctAnswer

      if (isCorrect) {
        correctAnswers++
      } else {
        incorrectQuestions.push(question)
      }

      // 難易度別の分析
      if (question.difficulty === 'basic') {
        analysis.basicQuestions.total++
        if (isCorrect) analysis.basicQuestions.correct++
      } else if (question.difficulty === 'intermediate') {
        analysis.intermediateQuestions.total++
        if (isCorrect) analysis.intermediateQuestions.correct++
      } else if (question.difficulty === 'advanced') {
        analysis.advancedQuestions.total++
        if (isCorrect) analysis.advancedQuestions.correct++
      }
    })

    const score = Math.round((correctAnswers / test.questions.length) * 100)
    const passed = score >= test.passingScore

    return {
      score,
      passed,
      timeTaken,
      incorrectQuestions,
      analysis
    }
  }

  const handleSubmitTest = () => {
    const result = calculateScore()
    setTestResult(result)
    setTestState(prev => ({
      ...prev,
      isCompleted: true,
      score: result.score,
      timeTaken: result.timeTaken
    }))

    // 合格時にチケット配布（本番接続）。未合格はスキップ
    if (result.passed) {
      try {
        const uid = userId || 'guest'
        grantCategoryTestTickets({ userId: uid, categoryId, testId: `category-${categoryId}`, score: result.score }, { token: process.env.NEXT_PUBLIC_LEARNING_TOKEN })
          .then(r => {
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
          .catch(() => {})
      } catch {}
    }
  }

  const handleRetakeTest = () => {
    setTestState({
      currentQuestionIndex: 0,
      answers: {},
      startTime: new Date(),
      isCompleted: false,
      score: 0,
      timeTaken: 0
    })
    setTestResult(null)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!test) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">テストが見つかりません</h3>
              <p className="text-muted-foreground mt-2">
                このカテゴリーのテストは現在利用できません。
              </p>
              <Button onClick={() => router.back()} className="mt-4">
                戻る
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // テスト結果画面
  if (testState.isCompleted && testResult) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* ヘッダー */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">{test.title} - 結果</h1>
            <div className="flex justify-center mb-6">
              {testResult.passed ? (
                <Trophy className="h-16 w-16 text-yellow-500" />
              ) : (
                <AlertCircle className="h-16 w-16 text-red-500" />
              )}
            </div>
          </div>

          {/* 結果サマリー */}
          <Card className={`${testResult.passed ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            <CardHeader>
              <CardTitle className="text-center">
                {testResult.passed ? '✅ テスト合格！' : '❌ テスト不合格'}
              </CardTitle>
              <CardDescription className="text-center">
                {testResult.passed 
                  ? `素晴らしい！${test.passingScore}%以上の正答率を達成しました。`
                  : `残念！合格には${test.passingScore}%以上の正答率が必要です。`
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{testResult.score}%</div>
                  <div className="text-sm text-muted-foreground">総合スコア</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{testResult.timeTaken}分</div>
                  <div className="text-sm text-muted-foreground">回答時間</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {test.questions.length - testResult.incorrectQuestions.length}/{test.questions.length}
                  </div>
                  <div className="text-sm text-muted-foreground">正解数</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 詳細分析 */}
          <Card>
            <CardHeader>
              <CardTitle>詳細分析</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>基本問題</span>
                    <span>{testResult.analysis.basicQuestions.correct}/{testResult.analysis.basicQuestions.total}</span>
                  </div>
                  <Progress 
                    value={testResult.analysis.basicQuestions.total > 0 
                      ? (testResult.analysis.basicQuestions.correct / testResult.analysis.basicQuestions.total) * 100 
                      : 0
                    } 
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>中級問題</span>
                    <span>{testResult.analysis.intermediateQuestions.correct}/{testResult.analysis.intermediateQuestions.total}</span>
                  </div>
                  <Progress 
                    value={testResult.analysis.intermediateQuestions.total > 0 
                      ? (testResult.analysis.intermediateQuestions.correct / testResult.analysis.intermediateQuestions.total) * 100 
                      : 0
                    } 
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>上級問題</span>
                    <span>{testResult.analysis.advancedQuestions.correct}/{testResult.analysis.advancedQuestions.total}</span>
                  </div>
                  <Progress 
                    value={testResult.analysis.advancedQuestions.total > 0 
                      ? (testResult.analysis.advancedQuestions.correct / testResult.analysis.advancedQuestions.total) * 100 
                      : 0
                    } 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 修了証発行 */}
          {testResult.passed && test.certificateEligible && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-yellow-800">修了証の発行</h3>
                  <p className="text-yellow-700 mt-2">
                    おめでとうございます！このテストに合格したため、修了証を発行できます。
                  </p>
                  <Button className="mt-4 bg-yellow-600 hover:bg-yellow-700">
                    修了証を発行
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* アクション */}
          <div className="flex justify-center space-x-4">
            <Button onClick={handleRetakeTest} variant="outline">
              テストを再受験
            </Button>
            <Button onClick={() => router.push('/lessons')}>
              レッスン一覧に戻る
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // テスト実施画面
  const currentQuestion = test.questions[testState.currentQuestionIndex]
  const progress = ((testState.currentQuestionIndex + 1) / test.questions.length) * 100
  const answeredQuestions = Object.keys(testState.answers).length
  const allQuestionsAnswered = answeredQuestions === test.questions.length

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        {/* ヘッダー */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            戻る
          </Button>
          <h1 className="text-2xl font-bold">{test.title}</h1>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{Math.floor((new Date().getTime() - testState.startTime.getTime()) / 1000 / 60)}分</span>
          </div>
        </div>

        {/* 進捗 */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>問題 {testState.currentQuestionIndex + 1} / {test.questions.length}</span>
                <span>回答済み: {answeredQuestions} / {test.questions.length}</span>
              </div>
              <Progress value={progress} />
            </div>
          </CardContent>
        </Card>

        {/* 現在の問題 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant={currentQuestion.difficulty === 'basic' ? 'default' : 
                              currentQuestion.difficulty === 'intermediate' ? 'secondary' : 'destructive'}>
                {currentQuestion.difficulty === 'basic' ? '基本' : 
                 currentQuestion.difficulty === 'intermediate' ? '中級' : '上級'}
              </Badge>
              <span className="text-sm text-muted-foreground">
                問題 {testState.currentQuestionIndex + 1}
              </span>
            </div>
            <CardTitle className="text-lg leading-relaxed">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentQuestion.options?.map((option, index) => (
                <label 
                  key={index}
                  className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors
                    ${testState.answers[currentQuestion.id] === option 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 hover:bg-gray-50'
                    }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={option}
                    checked={testState.answers[currentQuestion.id] === option}
                    onChange={() => handleAnswerSelect(currentQuestion.id, option)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                    ${testState.answers[currentQuestion.id] === option 
                      ? 'border-primary' 
                      : 'border-gray-300'
                    }`}>
                    {testState.answers[currentQuestion.id] === option && (
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    )}
                  </div>
                  <span className="flex-1">{option}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ナビゲーション */}
        <div className="flex justify-between">
          <Button 
            onClick={handlePreviousQuestion}
            disabled={testState.currentQuestionIndex === 0}
            variant="outline"
          >
            前の問題
          </Button>
          
          <div className="space-x-2">
            {testState.currentQuestionIndex < test.questions.length - 1 ? (
              <Button 
                onClick={handleNextQuestion}
                disabled={!testState.answers[currentQuestion.id]}
              >
                次の問題
              </Button>
            ) : (
              <Button 
                onClick={handleSubmitTest}
                disabled={!allQuestionsAnswered}
                className="bg-green-600 hover:bg-green-700"
              >
                {allQuestionsAnswered ? 'テストを提出' : `残り${test.questions.length - answeredQuestions}問`}
              </Button>
            )}
          </div>
        </div>

        {/* 問題一覧 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">問題一覧</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {test.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTestState(prev => ({ ...prev, currentQuestionIndex: index }))}
                  className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center text-sm font-medium transition-colors
                    ${index === testState.currentQuestionIndex 
                      ? 'border-primary bg-primary text-white' 
                      : testState.answers[test.questions[index].id]
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
