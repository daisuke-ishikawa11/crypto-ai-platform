"use client"

import * as React from "react"
import { useEffect, useRef, useState } from 'react'
import { 
  Play, 
  Pause,
  CheckCircle2,
  Lightbulb,
  Target,
  Zap,
  Shield,
  Trophy,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  PiggyBank,
  TrendingUp,
  AlertTriangle,
  Gift,
  Sparkles
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

// Interface definitions
interface SimulationState {
  farmTokens?: number
  stakedTokens?: number
  rewards?: number
  days?: number
  apy?: number
  status?: string
  ethBalance?: number
  usdcBalance?: number
  poolShares?: number
  feesEarned?: number
  [key: string]: unknown
}
 
import { cn } from '@/lib/utils'

interface InteractiveTutorialProps {
  className?: string
  autoStart?: boolean
  onComplete?: (tutorialId: string) => void
}

export enum TutorialType {
  BASIC_DEFI = 'basic_defi',
  YIELD_FARMING = 'yield_farming',
  LIQUIDITY_PROVIDING = 'liquidity_providing',
  RISK_MANAGEMENT = 'risk_management',
  ADVANCED_STRATEGIES = 'advanced_strategies'
}

export enum StepType {
  EXPLANATION = 'explanation',
  SIMULATION = 'simulation',
  QUIZ = 'quiz',
  PRACTICE = 'practice',
  CHECKPOINT = 'checkpoint'
}

export interface TutorialStep {
  id: string
  title: string
  type: StepType
  content: string
  visualAid?: {
    type: 'animation' | 'chart' | 'diagram' | 'interactive'
    data: unknown
  }
  quiz?: {
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
  }
  simulation?: {
    scenario: string
    initialState: SimulationState
    actions: TutorialAction[]
    expectedOutcome: string
  }
  tips?: string[]
  duration?: number // in seconds
}

export interface TutorialAction {
  id: string
  label: string
  description: string
  effect: (state: SimulationState) => SimulationState
  cost?: number
  risk?: 'low' | 'medium' | 'high'
}

export interface Tutorial {
  id: TutorialType
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: number
  prerequisites?: TutorialType[]
  steps: TutorialStep[]
  rewards: {
    xp: number
    badges: string[]
    unlocks?: string[]
  }
}

// Tutorial definitions
const TUTORIALS: Tutorial[] = [
  {
    id: TutorialType.BASIC_DEFI,
    title: 'DeFi Fundamentals',
    description: 'Learn the basics of decentralized finance in a fun, interactive way!',
    difficulty: 'beginner',
    estimatedTime: 15,
    steps: [
      {
        id: 'what_is_defi',
        title: 'What is DeFi?',
        type: StepType.EXPLANATION,
        content: 'DeFi stands for Decentralized Finance. Imagine traditional banking, but without the bank! Instead of trusting a big institution, you trust code and smart contracts running on blockchain networks.',
        visualAid: {
          type: 'diagram',
          data: {
            traditional: ['You', 'Bank', 'Recipient'],
            defi: ['You', 'Smart Contract', 'Recipient']
          }
        },
        tips: [
          'DeFi applications run 24/7 without holidays!',
          'You maintain full control of your assets',
          'Transactions are transparent and verifiable'
        ],
        duration: 120
      },
      {
        id: 'defi_quiz_1',
        title: 'Quick Check!',
        type: StepType.QUIZ,
        content: 'Let\'s see if you got it!',
        quiz: {
          question: 'What\'s the main difference between DeFi and traditional banking?',
          options: [
            'DeFi is faster',
            'DeFi doesn\'t require intermediaries',
            'DeFi is cheaper',
            'DeFi is more complex'
          ],
          correctAnswer: 1,
          explanation: 'Correct! DeFi eliminates intermediaries like banks, allowing peer-to-peer transactions through smart contracts.'
        },
        duration: 60
      },
      {
        id: 'liquidity_pools_intro',
        title: 'Liquidity Pools Magic',
        type: StepType.EXPLANATION,
        content: 'Think of liquidity pools as magical pots of money that help people trade cryptocurrencies instantly. Instead of waiting for someone to want exactly what you\'re selling, you trade against the pool!',
        visualAid: {
          type: 'animation',
          data: {
            type: 'liquidity_pool',
            tokens: ['ETH', 'USDC'],
            amounts: [100, 200000]
          }
        },
        tips: [
          'Liquidity providers earn fees from trades',
          'Bigger pools mean less price slippage',
          'You can provide liquidity and earn rewards!'
        ],
        duration: 150
      },
      {
        id: 'pool_simulation',
        title: 'Try It Yourself!',
        type: StepType.SIMULATION,
        content: 'Let\'s simulate providing liquidity to a pool. Don\'t worry - this is just practice with fake money!',
        simulation: {
          scenario: 'You have 1 ETH ($2000) and 2000 USDC. You want to provide liquidity to an ETH/USDC pool.',
          initialState: {
            ethBalance: 1,
            usdcBalance: 2000,
            ethPrice: 2000,
            poolShares: 0,
            feesEarned: 0
          },
          actions: [
            {
              id: 'provide_liquidity',
              label: 'Provide Liquidity',
              description: 'Add your ETH and USDC to the pool',
              effect: (state: SimulationState) => ({
                ...state,
                ethBalance: 0,
                usdcBalance: 0,
                poolShares: 100,
                status: 'Liquidity provided! You now own part of the pool.'
              }),
              risk: 'low' as const
            },
            {
              id: 'wait_day',
              label: 'Wait 1 Day',
              description: 'Let trading fees accumulate',
              effect: (state: SimulationState) => ({
                ...state,
                feesEarned: (state.feesEarned || 0) + 5,
                status: 'You earned $5 in trading fees! Ka-ching!'
              }),
              risk: 'low' as const
            },
            {
              id: 'remove_liquidity',
              label: 'Remove Liquidity',
              description: 'Take your share out of the pool',
              effect: (state: SimulationState) => ({
                ...state,
                ethBalance: 1,
                usdcBalance: 2005, // original + fees
                poolShares: 0,
                status: 'Welcome back your tokens + fees!'
              }),
              risk: 'low' as const
            }
          ],
          expectedOutcome: 'You should earn trading fees while providing liquidity!'
        },
        duration: 300
      },
      {
        id: 'defi_benefits',
        title: 'Why DeFi Rocks!',
        type: StepType.EXPLANATION,
        content: 'DeFi gives you superpowers: earn interest on your crypto, trade without middlemen, and access financial services from anywhere in the world!',
        visualAid: {
          type: 'chart',
          data: {
            benefits: [
              { name: 'Traditional Savings', value: 0.5, color: '#ef4444' },
              { name: 'DeFi Yield', value: 8.5, color: '#10b981' }
            ]
          }
        },
        tips: [
          'Your crypto can earn yield 24/7',
          'No bank holidays in DeFi!',
          'You\'re in full control of your assets'
        ],
        duration: 120
      }
    ],
    rewards: {
      xp: 500,
      badges: ['DeFi Explorer', 'First Steps'],
      unlocks: ['Intermediate Tutorials']
    }
  },
  
  {
    id: TutorialType.YIELD_FARMING,
    title: 'Yield Farming Mastery',
    description: 'Learn to make your crypto work harder than a coffee shop barista!',
    difficulty: 'intermediate',
    estimatedTime: 25,
    prerequisites: [TutorialType.BASIC_DEFI],
    steps: [
      {
        id: 'farming_intro',
        title: 'Welcome to the Farm!',
        type: StepType.EXPLANATION,
        content: 'Yield farming is like being a digital farmer, but instead of growing corn, you\'re growing money! You provide liquidity or stake tokens to earn rewards.',
        visualAid: {
          type: 'animation',
          data: {
            type: 'farming_cycle',
            steps: ['Deposit', 'Earn', 'Compound', 'Harvest']
          }
        },
        tips: [
          'Higher yields often come with higher risks',
          'Compounding can accelerate your earnings',
          'Don\'t farm more than you can afford to lose'
        ],
        duration: 180
      },
      {
        id: 'apy_vs_apr',
        title: 'APY vs APR: The Plot Twist',
        type: StepType.EXPLANATION,
        content: 'APR is the yearly interest rate. APY includes the magic of compounding - it\'s like APR on steroids! Always look for the APY when comparing farms.',
        quiz: {
          question: 'If a farm offers 100% APR, what would be the APY with daily compounding?',
          options: ['100%', '171%', '200%', '365%'],
          correctAnswer: 1,
          explanation: 'With daily compounding, 100% APR becomes about 171% APY. The power of compounding!'
        },
        duration: 120
      },
      {
        id: 'farm_simulation',
        title: 'Farm Simulator 2024',
        type: StepType.SIMULATION,
        content: 'Time to get your hands dirty! Manage a yield farm and see your tokens grow.',
        simulation: {
          scenario: 'You have 1000 FARM tokens. Choose your farming strategy!',
          initialState: {
            farmTokens: 1000,
            stakedTokens: 0,
            rewards: 0,
            days: 0,
            apy: 150
          },
          actions: [
            {
              id: 'stake_all',
              label: 'Stake All Tokens',
              description: 'Put all your tokens to work',
               effect: (state: SimulationState) => ({
                ...state,
                farmTokens: 0,
                stakedTokens: 1000,
                status: 'All tokens are now farming! Let the magic begin! 🌱'
              }),
              risk: 'medium' as const
            },
            {
              id: 'wait_week',
              label: 'Wait 1 Week',
              description: 'Let your farm grow',
               effect: (state: SimulationState) => {
                const stakedTokens = state.stakedTokens || 0;
                const apy = state.apy || 0;
                const weeklyReward = (stakedTokens * apy / 100) / 52
                const currentRewards = state.rewards || 0;
                const currentDays = state.days || 0;
                return {
                  ...state,
                  rewards: currentRewards + weeklyReward,
                  days: currentDays + 7,
                  status: `Week ${Math.floor(currentDays / 7) + 1}: Earned ${weeklyReward.toFixed(2)} tokens! 🌾`
                }
              },
              risk: 'low' as const
            },
            {
              id: 'compound',
              label: 'Compound Rewards',
              description: 'Reinvest your rewards for exponential growth',
               effect: (state: SimulationState) => {
                const currentStaked = state.stakedTokens || 0;
                const currentRewards = state.rewards || 0;
                const newStakedAmount = currentStaked + currentRewards;
                return {
                  ...state,
                  stakedTokens: newStakedAmount,
                  rewards: 0,
                  status: `Compounded! Now farming with ${newStakedAmount.toFixed(2)} tokens! ⚡`
                };
              },
              risk: 'low' as const
            }
          ],
          expectedOutcome: 'Watch your tokens multiply through the power of yield farming!'
        },
        duration: 400
      }
    ],
    rewards: {
      xp: 750,
      badges: ['Yield Farmer', 'Compound Interest Master'],
      unlocks: ['Advanced Strategies']
    }
  }
]

export const InteractiveTutorial: React.FC<InteractiveTutorialProps> = ({
  className = '',
  autoStart: _autoStart = false,
  onComplete
}) => {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [, setCompletedSteps] = useState<string[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [simulationState, setSimulationState] = useState<SimulationState>({})
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null)
  const [showQuizResult, setShowQuizResult] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const currentStep = selectedTutorial?.steps[currentStepIndex]
  const progress = selectedTutorial ? ((currentStepIndex + 1) / selectedTutorial.steps.length) * 100 : 0

  // Timer management
  useEffect(() => {
    if (isPlaying && currentStep?.duration) {
      setTimeRemaining(currentStep.duration)
      
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev && prev <= 1) {
            setIsPlaying(false)
            return null
          }
          return prev ? prev - 1 : null
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPlaying, currentStep])

  const startTutorial = (tutorial: Tutorial) => {
    setSelectedTutorial(tutorial)
    setCurrentStepIndex(0)
    setCompletedSteps([])
    setSimulationState(((tutorial.steps[0]?.simulation?.initialState ?? {}) as SimulationState))
    setQuizAnswer(null)
    setShowQuizResult(false)
    setIsPlaying(true)
  }

  const nextStep = () => {
    if (!selectedTutorial || currentStepIndex >= selectedTutorial.steps.length - 1) return
    
    if (currentStep) {
      setCompletedSteps(prev => [...prev, currentStep.id])
    }
    
    const nextIndex = currentStepIndex + 1
    setCurrentStepIndex(nextIndex)
    
    const nextStep = selectedTutorial.steps[nextIndex]
    if (nextStep?.simulation?.initialState) {
      setSimulationState(nextStep.simulation.initialState as SimulationState)
    }
    
    setQuizAnswer(null)
    setShowQuizResult(false)
    setIsPlaying(true)
  }

  const previousStep = () => {
    if (currentStepIndex <= 0) return
    setCurrentStepIndex(currentStepIndex - 1)
    setIsPlaying(false)
  }

  const completeTutorial = () => {
    if (!selectedTutorial) return
    
    onComplete?.(selectedTutorial.id)
    setSelectedTutorial(null)
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }

  const executeAction = (action: TutorialAction) => {
    const newState = action.effect(simulationState)
    setSimulationState(newState)
  }

  const submitQuizAnswer = () => {
    if (!currentStep?.quiz || quizAnswer === null) return
    setShowQuizResult(true)
    setIsPlaying(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className={cn('max-w-4xl mx-auto', className)}>
      {!selectedTutorial ? (
        // Tutorial Selection
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              DeFi Interactive Academy 🎓
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Learn DeFi through fun, interactive tutorials that make complex concepts simple!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TUTORIALS.map(tutorial => {
              const isLocked = tutorial.prerequisites?.some(req => 
                !TUTORIALS.find(t => t.id === req) // Simple lock check
              )
              
              return (
                <Card key={tutorial.id} className={cn(
                  'overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl border-0 shadow-lg',
                  isLocked ? 'opacity-50' : 'hover:scale-105'
                )}>
                  <CardHeader className={cn(
                    'pb-4',
                    tutorial.difficulty === 'beginner' && 'bg-gradient-to-r from-green-50 to-emerald-50',
                    tutorial.difficulty === 'intermediate' && 'bg-gradient-to-r from-blue-50 to-cyan-50',
                    tutorial.difficulty === 'advanced' && 'bg-gradient-to-r from-purple-50 to-pink-50'
                  )}>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className={cn(
                        'capitalize',
                        tutorial.difficulty === 'beginner' && 'text-green-700 border-green-300',
                        tutorial.difficulty === 'intermediate' && 'text-blue-700 border-blue-300',
                        tutorial.difficulty === 'advanced' && 'text-purple-700 border-purple-300'
                      )}>
                        {tutorial.difficulty}
                      </Badge>
                      
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <BookOpen className="h-4 w-4" />
                        {tutorial.estimatedTime}m
                      </div>
                    </div>
                    
                    <CardTitle className="flex items-center gap-3">
                      <div className={cn(
                        'w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl shadow-lg',
                        tutorial.difficulty === 'beginner' && 'bg-gradient-to-br from-green-500 to-emerald-600',
                        tutorial.difficulty === 'intermediate' && 'bg-gradient-to-br from-blue-500 to-cyan-600',
                        tutorial.difficulty === 'advanced' && 'bg-gradient-to-br from-purple-500 to-pink-600'
                      )}>
                        {tutorial.id === TutorialType.BASIC_DEFI && <Target />}
                        {tutorial.id === TutorialType.YIELD_FARMING && <PiggyBank />}
                        {tutorial.id === TutorialType.LIQUIDITY_PROVIDING && <TrendingUp />}
                        {tutorial.id === TutorialType.RISK_MANAGEMENT && <Shield />}
                        {tutorial.id === TutorialType.ADVANCED_STRATEGIES && <Zap />}
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{tutorial.title}</h3>
                        <p className="text-sm text-slate-600 mt-1">{tutorial.description}</p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">{tutorial.steps.length} steps</span>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-yellow-600">
                            <Trophy className="h-4 w-4" />
                            <span>{tutorial.rewards.xp} XP</span>
                          </div>
                          <div className="flex items-center gap-1 text-purple-600">
                            <Gift className="h-4 w-4" />
                            <span>{tutorial.rewards.badges.length} badges</span>
                          </div>
                        </div>
                      </div>
                      
                      {tutorial.prerequisites && tutorial.prerequisites.length > 0 && (
                        <div className="text-sm text-slate-600">
                          <span className="font-medium">Prerequisites:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {tutorial.prerequisites.map(prereq => (
                              <Badge key={prereq} variant="secondary" className="text-xs">
                                {TUTORIALS.find(t => t.id === prereq)?.title}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <Button 
                        onClick={() => startTutorial(tutorial)}
                        disabled={isLocked}
                        className={cn(
                          'w-full font-semibold',
                          tutorial.difficulty === 'beginner' && 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700',
                          tutorial.difficulty === 'intermediate' && 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700',
                          tutorial.difficulty === 'advanced' && 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700'
                        )}
                      >
                        {isLocked ? 'Locked' : 'Start Tutorial'}
                        {!isLocked && <Play className="h-4 w-4 ml-2" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      ) : (
        // Active Tutorial
        <Card className="overflow-hidden border-0 shadow-2xl">
          {/* Tutorial Header */}
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{selectedTutorial.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm opacity-90">
                  <span>Step {currentStepIndex + 1} of {selectedTutorial.steps.length}</span>
                  <span>•</span>
                  <span>{currentStep?.title}</span>
                  {timeRemaining && (
                    <>
                      <span>•</span>
                      <span className="font-mono">{formatTime(timeRemaining)}</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTutorial(null)}
                  className="text-white hover:bg-white/20"
                >
                  Exit
                </Button>
              </div>
            </div>
            
            <Progress value={progress} className="mt-4 bg-white/20" />
          </CardHeader>
          
          <CardContent className="p-8">
            {currentStep && (
              <div className="space-y-6">
                {/* Step Content */}
                <div className="space-y-4">
                  <div className={cn(
                    'p-6 rounded-xl border-l-4',
                    currentStep.type === StepType.EXPLANATION && 'bg-blue-50 border-blue-500',
                    currentStep.type === StepType.QUIZ && 'bg-yellow-50 border-yellow-500',
                    currentStep.type === StepType.SIMULATION && 'bg-green-50 border-green-500',
                    currentStep.type === StepType.PRACTICE && 'bg-purple-50 border-purple-500'
                  )}>
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        'p-3 rounded-xl text-white',
                        currentStep.type === StepType.EXPLANATION && 'bg-blue-500',
                        currentStep.type === StepType.QUIZ && 'bg-yellow-500',
                        currentStep.type === StepType.SIMULATION && 'bg-green-500',
                        currentStep.type === StepType.PRACTICE && 'bg-purple-500'
                      )}>
                        {currentStep.type === StepType.EXPLANATION && <BookOpen className="h-6 w-6" />}
                        {currentStep.type === StepType.QUIZ && <Target className="h-6 w-6" />}
                        {currentStep.type === StepType.SIMULATION && <Play className="h-6 w-6" />}
                        {currentStep.type === StepType.PRACTICE && <Zap className="h-6 w-6" />}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">{currentStep.title}</h3>
                        <p className="text-lg text-slate-700 leading-relaxed">{currentStep.content}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tips */}
                  {currentStep.tips && currentStep.tips.length > 0 && (
                    <Card className="bg-amber-50 border-amber-200">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4" />
                          Pro Tips
                        </h4>
                        <ul className="space-y-2">
                          {currentStep.tips.map((tip, index) => (
                            <li key={index} className="text-amber-700 text-sm flex items-start gap-2">
                              <Sparkles className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>
                
                {/* Interactive Elements */}
                {currentStep.type === StepType.QUIZ && currentStep.quiz && (
                  <Card className="border-2 border-yellow-200">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-semibold text-slate-900 mb-4">
                        {currentStep.quiz.question}
                      </h4>
                      
                      <div className="space-y-3 mb-6">
                        {currentStep.quiz.options.map((option, index) => (
                          <Button
                            key={index}
                            variant={quizAnswer === index ? 'default' : 'outline'}
                            className="w-full text-left justify-start p-4 h-auto"
                            onClick={() => setQuizAnswer(index)}
                            disabled={showQuizResult}
                          >
                            <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}</span>
                            {option}
                          </Button>
                        ))}
                      </div>
                      
                      {!showQuizResult ? (
                        <Button 
                          onClick={submitQuizAnswer}
                          disabled={quizAnswer === null}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white"
                        >
                          Submit Answer
                        </Button>
                      ) : (
                        <div className={cn(
                          'p-4 rounded-lg',
                          quizAnswer === currentStep.quiz.correctAnswer 
                            ? 'bg-green-100 border border-green-300' 
                            : 'bg-red-100 border border-red-300'
                        )}>
                          <div className="flex items-center gap-2 mb-2">
                            {quizAnswer === currentStep.quiz.correctAnswer ? (
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                            ) : (
                              <AlertTriangle className="h-5 w-5 text-red-600" />
                            )}
                            <span className={cn(
                              'font-semibold',
                              quizAnswer === currentStep.quiz.correctAnswer 
                                ? 'text-green-800' 
                                : 'text-red-800'
                            )}>
                              {quizAnswer === currentStep.quiz.correctAnswer ? 'Correct!' : 'Not quite right'}
                            </span>
                          </div>
                          <p className={cn(
                            'text-sm',
                            quizAnswer === currentStep.quiz.correctAnswer 
                              ? 'text-green-700' 
                              : 'text-red-700'
                          )}>
                            {currentStep.quiz.explanation}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
                
                {currentStep.type === StepType.SIMULATION && currentStep.simulation && (
                  <Card className="border-2 border-green-200">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Simulation State */}
                        <div>
                          <h4 className="text-lg font-semibold text-slate-900 mb-4">Current State</h4>
                          <Card className="bg-slate-50">
                            <CardContent className="p-4">
                              <div className="space-y-3">
                                {Object.entries(simulationState).map(([key, value]) => (
                                  <div key={key} className="flex justify-between">
                                    <span className="text-sm text-slate-600 capitalize">
                                      {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </span>
                                    <span className="font-semibold text-slate-900">
                                      {typeof value === 'number' ? value.toLocaleString() : String(value)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              
                              {simulationState.status && (
                                <div className="mt-4 p-3 bg-blue-100 rounded-lg border border-blue-200">
                                  <p className="text-sm text-blue-800 font-medium">
                                    {String(simulationState.status)}
                                  </p>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                        
                        {/* Available Actions */}
                        <div>
                          <h4 className="text-lg font-semibold text-slate-900 mb-4">Available Actions</h4>
                          <div className="space-y-3">
                            {currentStep.simulation.actions.map(action => (
                              <Card key={action.id} className="border border-slate-200 hover:border-slate-300 transition-colors">
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <h5 className="font-semibold text-slate-900">{action.label}</h5>
                                    {action.risk && (
                                      <Badge 
                                        variant="outline"
                                        className={cn(
                                          action.risk === 'low' && 'text-green-600 border-green-300',
                                          action.risk === 'medium' && 'text-yellow-600 border-yellow-300',
                                          action.risk === 'high' && 'text-red-600 border-red-300'
                                        )}
                                      >
                                        {action.risk} risk
                                      </Badge>
                                    )}
                                  </div>
                                  
                                  <p className="text-sm text-slate-600 mb-3">{action.description}</p>
                                  
                                  <Button
                                    onClick={() => executeAction(action)}
                                    size="sm"
                                    className="w-full"
                                  >
                                    {action.label}
                                  </Button>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </CardContent>
          
          {/* Navigation */}
          <div className="bg-slate-50 px-8 py-4 flex items-center justify-between border-t">
            <Button
              variant="outline"
              onClick={previousStep}
              disabled={currentStepIndex === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <div className="flex items-center gap-2">
              {selectedTutorial.steps.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'w-3 h-3 rounded-full transition-colors',
                    index < currentStepIndex ? 'bg-green-500' : 
                    index === currentStepIndex ? 'bg-blue-500' : 'bg-slate-300'
                  )}
                />
              ))}
            </div>
            
            {currentStepIndex < selectedTutorial.steps.length - 1 ? (
              <Button
                onClick={nextStep}
                disabled={currentStep?.type === StepType.QUIZ && !showQuizResult}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={completeTutorial}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Complete Tutorial
                <Trophy className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}

export default InteractiveTutorial
