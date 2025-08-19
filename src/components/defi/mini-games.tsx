"use client"

import * as React from "react"
import { useEffect, useRef, useState } from 'react'
import { 
  Gamepad2, 
  Trophy, 
  Target,
  TrendingUp,
  TrendingDown,
  Zap,
  Shield,
  Timer,
  Star,
  RefreshCw,
  Play,
  Award,
  AlertTriangle,
  CheckCircle2,
  Heart,
  X
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface MiniGamesProps {
  className?: string
  onScoreUpdate?: (gameId: string, score: number) => void
}

export enum GameType {
  IMPERMANENT_LOSS_SIMULATOR = 'impermanent_loss_simulator',
  APY_HUNTER = 'apy_hunter',
  RISK_BALANCER = 'risk_balancer',
  DEFI_TRIVIA = 'defi_trivia'
}

// Protocol 型をモジュールスコープで定義
type Protocol = { isScam: boolean; apy: number; risk: 'low'|'medium'|'high'; name: string }

// 各ゲームで利用する状態を網羅する型
interface GameState {
  initialPrice?: number
  currentPrice?: number
  lpTokens?: number
  impermanentLoss?: number
  round?: number
  maxRounds?: number
  // APY Hunter
  protocols?: Protocol[]
  selections?: Array<{ protocol: Protocol; isScam: boolean }>
  lives?: number
  // Trivia
  currentQuestion?: number
  questions?: Array<{ question: string; options: string[]; correct: number; explanation: string }>
  correctAnswers?: number
  streak?: number
  // Risk Balancer
  portfolio?: { safe: number; medium: number; risky: number }
  target?: { safe: number; medium: number; risky: number }
  balance?: number
}

export interface GameScore {
  score: number
  level: number
  bestScore: number
  gamesPlayed: number
  achievements: string[]
}

export interface MiniGame {
  id: GameType
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  icon: React.ReactNode
  category: 'simulation' | 'strategy' | 'knowledge' | 'reflex'
  estimatedTime: number
  rewards: {
    xp: number
    badges: string[]
  }
}

// Game definitions
const MINI_GAMES: MiniGame[] = [
  {
    id: GameType.IMPERMANENT_LOSS_SIMULATOR,
    title: 'Impermanent Loss Adventure',
    description: 'Navigate price changes and learn about impermanent loss in liquidity pools!',
    difficulty: 'medium',
    icon: <TrendingDown className="h-6 w-6" />,
    category: 'simulation',
    estimatedTime: 5,
    rewards: {
      xp: 200,
      badges: ['IL Survivor', 'Risk Aware']
    }
  },
  {
    id: GameType.APY_HUNTER,
    title: 'APY Hunter',
    description: 'Hunt for the highest yields while avoiding rug pulls and scams!',
    difficulty: 'hard',
    icon: <Target className="h-6 w-6" />,
    category: 'strategy',
    estimatedTime: 3,
    rewards: {
      xp: 300,
      badges: ['Yield Hunter', 'Sharp Eye']
    }
  },
  {
    id: GameType.RISK_BALANCER,
    title: 'Risk vs Reward Master',
    description: 'Balance your portfolio between safe and risky investments!',
    difficulty: 'medium',
    icon: <Shield className="h-6 w-6" />,
    category: 'strategy',
    estimatedTime: 4,
    rewards: {
      xp: 250,
      badges: ['Risk Master', 'Balance Keeper']
    }
  },
  {
    id: GameType.DEFI_TRIVIA,
    title: 'DeFi Knowledge Quiz',
    description: 'Test your DeFi knowledge with rapid-fire questions!',
    difficulty: 'easy',
    icon: <Zap className="h-6 w-6" />,
    category: 'knowledge',
    estimatedTime: 2,
    rewards: {
      xp: 150,
      badges: ['DeFi Scholar', 'Quick Thinker']
    }
  }
]

// Trivia Questions
const TRIVIA_QUESTIONS: Array<{ question: string; options: string[]; correct: number; explanation: string }> = [
  {
    question: "What does 'HODL' originally come from?",
    options: ['Hold On for Dear Life', 'A misspelled HOLD', 'High Output Digital Ledger', 'Holding Over Daily Losses'],
    correct: 1,
    explanation: "HODL came from a drunk Bitcoin forum post in 2013 where someone misspelled 'HOLD'!"
  },
  {
    question: "What's the main risk in liquidity provision?",
    options: ['High fees', 'Impermanent loss', 'Slow transactions', 'Complex interface'],
    correct: 1,
    explanation: "Impermanent loss occurs when token prices change after you provide liquidity."
  },
  {
    question: "What does TVL stand for?",
    options: ['Total Value Locked', 'Token Value List', 'Trading Volume Limit', 'Time Value Logic'],
    correct: 0,
    explanation: "TVL (Total Value Locked) measures the total value of assets locked in DeFi protocols."
  },
  {
    question: "Which was the first major DeFi protocol?",
    options: ['Uniswap', 'Compound', 'MakerDAO', 'Aave'],
    correct: 2,
    explanation: "MakerDAO launched in 2017 and is considered the first major DeFi protocol with DAI stablecoin."
  },
  {
    question: "What's the difference between APR and APY?",
    options: ['No difference', 'APY includes compounding', 'APR is annual, APY is monthly', 'APY is riskier'],
    correct: 1,
    explanation: "APY (Annual Percentage Yield) includes the effect of compounding, while APR doesn't."
  }
]

const difficultyConfig = {
  easy: { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
  medium: { color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  hard: { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' }
}

const categoryConfig = {
  simulation: { color: 'text-blue-600', label: 'Simulation' },
  strategy: { color: 'text-purple-600', label: 'Strategy' },
  knowledge: { color: 'text-green-600', label: 'Knowledge' },
  reflex: { color: 'text-orange-600', label: 'Reflex' }
}

export const MiniGames: React.FC<MiniGamesProps> = ({ className = '', onScoreUpdate }) => {
  const [selectedGame, setSelectedGame] = useState<MiniGame | null>(null)
  const [gameState, setGameState] = useState<GameState>({})
  const [score, setScore] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isGameComplete, setIsGameComplete] = useState(false)
  const [gameScores, setGameScores] = useState<Record<string, GameScore>>({})
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const startGame = (game: MiniGame) => {
    setSelectedGame(game)
    setScore(0)
    setIsGameComplete(false)
    setIsPlaying(true)
    
    // Initialize game-specific state
    switch (game.id) {
      case GameType.IMPERMANENT_LOSS_SIMULATOR:
        setGameState({
          initialPrice: 100,
          currentPrice: 100,
          lpTokens: 100,
          impermanentLoss: 0,
          round: 1,
          maxRounds: 10
        })
        break
      case GameType.APY_HUNTER:
        setGameState({
          protocols: generateProtocols(),
          selections: [],
          round: 1,
          maxRounds: 5,
          lives: 3
        })
        break
      case GameType.RISK_BALANCER:
        setGameState({
          portfolio: { safe: 0, medium: 0, risky: 0 },
          target: { safe: 40, medium: 40, risky: 20 },
          balance: 100,
          round: 1,
          maxRounds: 8
        })
        break
      case GameType.DEFI_TRIVIA:
        setGameState({
          currentQuestion: 0,
          questions: shuffleArray([...TRIVIA_QUESTIONS]),
          correctAnswers: 0,
          streak: 0
        })
        setTimeRemaining(60) // 60 seconds for trivia
        break
    }
  }

  const endGame = () => {
    setIsPlaying(false)
    setIsGameComplete(true)
    
    if (selectedGame) {
      // Update scores
      const currentScores = gameScores[selectedGame.id] || {
        score: 0,
        level: 1,
        bestScore: 0,
        gamesPlayed: 0,
        achievements: []
      }
      
      const newScores = {
        ...currentScores,
        score,
        bestScore: Math.max(currentScores.bestScore, score),
        gamesPlayed: currentScores.gamesPlayed + 1
      }
      
      setGameScores(prev => ({ ...prev, [selectedGame.id]: newScores }))
      onScoreUpdate?.(selectedGame.id, score)
    }
  }

  // Timer for timed games
  useEffect(() => {
    if (isPlaying && timeRemaining > 0) {
      timerRef.current = setTimeout(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            endGame()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isPlaying, timeRemaining])

  const generateProtocols = (): Protocol[] => {
    const protocols: Protocol[] = [
      { name: 'SafeYield', apy: 5, risk: 'low', isScam: false },
      { name: 'MegaGains', apy: 500, risk: 'high', isScam: true },
      { name: 'SteadyEarn', apy: 12, risk: 'medium', isScam: false },
      { name: 'MoonFarm', apy: 1000, risk: 'high', isScam: true },
      { name: 'BlueChip', apy: 8, risk: 'low', isScam: false },
      { name: 'QuickCash', apy: 200, risk: 'high', isScam: true }
    ]
    return shuffleArray(protocols).slice(0, 4)
  }

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  return (
    <div className={cn('max-w-6xl mx-auto', className)}>
      {!selectedGame ? (
        // Game Selection
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
              <Gamepad2 className="h-10 w-10 text-purple-600" />
              DeFi Mini-Games Arcade
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Learn DeFi concepts through fun, interactive games! 🎮
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MINI_GAMES.map(game => {
              const difficulty = difficultyConfig[game.difficulty]
              const category = categoryConfig[game.category]
              const scores = gameScores[game.id]
              
              return (
                <Card key={game.id} className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-0 shadow-lg group">
                  <CardHeader className={cn('pb-4', difficulty.bg)}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={cn('capitalize', difficulty.color, difficulty.border)}>
                          {game.difficulty}
                        </Badge>
                        <Badge variant="secondary" className={cn('text-xs', category.color)}>
                          {category.label}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Timer className="h-4 w-4" />
                        {game.estimatedTime}m
                      </div>
                    </div>
                    
                    <CardTitle className="flex items-center gap-4">
                      <div className={cn(
                        'w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform',
                        game.difficulty === 'easy' && 'bg-gradient-to-br from-green-500 to-emerald-600',
                        game.difficulty === 'medium' && 'bg-gradient-to-br from-yellow-500 to-orange-600',
                        game.difficulty === 'hard' && 'bg-gradient-to-br from-red-500 to-pink-600'
                      )}>
                        {game.icon}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{game.title}</h3>
                        <p className="text-sm text-slate-600">{game.description}</p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {/* Game Stats */}
                      {scores && (
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="bg-slate-50 p-3 rounded-lg">
                            <div className="text-lg font-bold text-slate-900">{scores.bestScore}</div>
                            <div className="text-xs text-slate-500">Best Score</div>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-lg">
                            <div className="text-lg font-bold text-slate-900">{scores.gamesPlayed}</div>
                            <div className="text-xs text-slate-500">Played</div>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-lg">
                            <div className="text-lg font-bold text-slate-900">{scores.achievements.length}</div>
                            <div className="text-xs text-slate-500">Badges</div>
                          </div>
                        </div>
                      )}
                      
                      {/* Rewards */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-yellow-600">
                            <Star className="h-4 w-4" />
                            <span>{game.rewards.xp} XP</span>
                          </div>
                          <div className="flex items-center gap-1 text-purple-600">
                            <Award className="h-4 w-4" />
                            <span>{game.rewards.badges.length} badges</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => startGame(game)}
                        className={cn(
                          'w-full font-semibold group-hover:shadow-lg transition-all',
                          game.difficulty === 'easy' && 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700',
                          game.difficulty === 'medium' && 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700',
                          game.difficulty === 'hard' && 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700'
                        )}
                      >
                        Play Game
                        <Play className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      ) : (
        // Active Game
        <Card className="overflow-hidden border-0 shadow-2xl">
          {/* Game Header */}
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl mb-2 flex items-center gap-3">
                  {selectedGame.icon}
                  {selectedGame.title}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm opacity-90">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    <span>Score: {score}</span>
                  </div>
                  {timeRemaining > 0 && (
                    <div className="flex items-center gap-2">
                      <Timer className="h-4 w-4" />
                      <span className="font-mono">{Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</span>
                    </div>
                  )}
                  {typeof gameState.round === 'number' && typeof gameState.maxRounds === 'number' && (
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      <span>{`Round ${gameState.round}/${gameState.maxRounds}`}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedGame(null)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            {/* Game Content */}
            {selectedGame.id === GameType.DEFI_TRIVIA && (
              <DeFiTriviaGame 
                gameState={gameState}
                setGameState={setGameState}
                score={score}
                setScore={setScore}
                endGame={endGame}
              />
            )}
            
            {selectedGame.id === GameType.APY_HUNTER && (
              <APYHunterGame 
                gameState={gameState}
                setGameState={setGameState}
                score={score}
                setScore={setScore}
                endGame={endGame}
              />
            )}
            
            {selectedGame.id === GameType.IMPERMANENT_LOSS_SIMULATOR && (
              <ImpermanentLossGame 
                gameState={gameState}
                setGameState={setGameState}
                score={score}
                setScore={setScore}
                endGame={endGame}
              />
            )}
            
            {selectedGame.id === GameType.RISK_BALANCER && (
              <RiskBalancerGame 
                gameState={gameState}
                setGameState={setGameState}
                score={score}
                setScore={setScore}
                endGame={endGame}
              />
            )}
          </CardContent>
        </Card>
      )}
      
      {/* Game Complete Dialog */}
      <Dialog open={isGameComplete} onOpenChange={setIsGameComplete}>
        <DialogContent className="max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <DialogTitle className="text-2xl">Game Complete! 🎉</DialogTitle>
            <DialogDescription>
              Great job on {selectedGame?.title}!
            </DialogDescription>
          </DialogHeader>
          
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-slate-900">{score}</div>
            <div className="text-slate-600">Final Score</div>
            
            <div className="flex justify-center gap-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-yellow-600">
                  +{selectedGame?.rewards.xp}
                </div>
                <div className="text-xs text-slate-500">XP Earned</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-purple-600">
                  {selectedGame?.rewards.badges.length}
                </div>
                <div className="text-xs text-slate-500">New Badges</div>
              </div>
            </div>
            
            <div className="flex gap-2 justify-center">
              <Button 
                onClick={() => selectedGame && startGame(selectedGame)}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Play Again
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  setSelectedGame(null)
                  setIsGameComplete(false)
                }}
              >
                Back to Games
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Individual Game Components
// legacy alias removed (no longer used)
interface GameComponentProps {
  gameState: GameState
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
  score: number
  setScore: React.Dispatch<React.SetStateAction<number>>
  endGame: () => void
}

const DeFiTriviaGame: React.FC<GameComponentProps> = ({ gameState, setGameState, score: _score, setScore, endGame }) => {
  const questions = (gameState.questions ?? []) as NonNullable<GameState['questions']>
  const currentIndex = typeof gameState.currentQuestion === 'number' ? gameState.currentQuestion : 0
  const currentQ = questions[currentIndex]
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  
  if (!currentQ) {
    endGame()
    return null
  }
  
  const submitAnswer = () => {
    if (selectedAnswer === null) return
    
    const isCorrect = selectedAnswer === currentQ.correct
    if (isCorrect) {
      const streak = gameState.streak ?? 0
      setScore(prev => prev + 10 + streak * 2)
      setGameState(prev => ({
        ...prev,
        correctAnswers: (prev.correctAnswers ?? 0) + 1,
        streak: (prev.streak ?? 0) + 1
      }))
    } else {
      setGameState(prev => ({ ...prev, streak: 0 }))
    }
    
    setShowResult(true)
    
    setTimeout(() => {
      if (currentIndex >= questions.length - 1) {
        endGame()
      } else {
        setGameState(prev => ({ ...prev, currentQuestion: (prev.currentQuestion ?? 0) + 1 }))
        setSelectedAnswer(null)
        setShowResult(false)
      }
    }, 2000)
  }
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          {`Question ${currentIndex + 1} of ${questions.length}`}
        </h3>
        <div className="flex items-center justify-center gap-4 text-sm text-slate-600">
          <span>Streak: {(gameState.streak ?? 0)} 🔥</span>
          <span>Correct: {(gameState.correctAnswers ?? 0)}</span>
        </div>
      </div>
      
      <Card className="border-2 border-blue-200">
        <CardContent className="p-6">
          <h4 className="text-xl font-semibold text-slate-900 mb-6">{currentQ.question}</h4>
          
          <div className="space-y-3">
            {(currentQ.options as string[]).map((option: string, index: number) => (
              <Button
                key={index}
                variant={selectedAnswer === index ? 'default' : 'outline'}
                className="w-full text-left justify-start p-4 h-auto"
                onClick={() => setSelectedAnswer(index)}
                disabled={showResult}
              >
                <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}</span>
                {option}
              </Button>
            ))}
          </div>
          
          {!showResult ? (
            <Button 
              onClick={submitAnswer}
              disabled={selectedAnswer === null}
              className="w-full mt-6 bg-blue-500 hover:bg-blue-600"
            >
              Submit Answer
            </Button>
          ) : (
            <div className={cn(
              'mt-6 p-4 rounded-lg',
              selectedAnswer === currentQ.correct 
                ? 'bg-green-100 border border-green-300' 
                : 'bg-red-100 border border-red-300'
            )}>
              <div className="flex items-center gap-2 mb-2">
                {selectedAnswer === currentQ.correct ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                )}
                <span className={cn(
                  'font-semibold',
                  selectedAnswer === currentQ.correct ? 'text-green-800' : 'text-red-800'
                )}>
                  {selectedAnswer === currentQ.correct ? 'Correct! 🎉' : 'Not quite right 🤔'}
                </span>
              </div>
              <p className={cn(
                'text-sm',
                selectedAnswer === currentQ.correct ? 'text-green-700' : 'text-red-700'
              )}>
                {currentQ.explanation}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

const APYHunterGame: React.FC<GameComponentProps> = ({ gameState, setGameState, score: _score, setScore, endGame }) => {
  const selectProtocol = (protocol: Protocol, _index: number) => {
    if (protocol.isScam) {
      setGameState(prev => ({ ...prev, lives: Math.max(0, (prev.lives ?? 0) - 1) }))
      if ((gameState.lives ?? 0) <= 1) {
        endGame()
        return
      }
    } else {
      setScore(prev => prev + Math.floor(protocol.apy / 2))
    }
    
    setGameState(prev => ({
      ...prev,
      selections: [ ...(prev.selections ?? []), { protocol, isScam: protocol.isScam } ],
      round: (prev.round ?? 0) + 1
    }))
    
    if ((gameState.round ?? 0) >= (gameState.maxRounds ?? Number.MAX_SAFE_INTEGER)) {
      endGame()
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          Hunt for Legitimate High Yields!
        </h3>
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            <span>Lives: {gameState.lives}</span>
          </div>
          <span className="text-slate-400">|</span>
          <span>Round {gameState.round}/{gameState.maxRounds}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {((gameState.protocols ?? []) as Protocol[]).map((protocol: Protocol, index: number) => (
          <Card 
            key={index} 
            className={cn(
              'cursor-pointer transition-all duration-200 hover:shadow-lg border-2',
              protocol.risk === 'low' && 'border-green-200 hover:border-green-300',
              protocol.risk === 'medium' && 'border-yellow-200 hover:border-yellow-300',
              protocol.risk === 'high' && 'border-red-200 hover:border-red-300'
            )}
            onClick={() => selectProtocol(protocol, index)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-slate-900">{protocol.name}</h4>
                <Badge 
                  variant="outline"
                  className={cn(
                    protocol.risk === 'low' && 'text-green-600 border-green-300',
                    protocol.risk === 'medium' && 'text-yellow-600 border-yellow-300',
                    protocol.risk === 'high' && 'text-red-600 border-red-300'
                  )}
                >
                  {protocol.risk} risk
                </Badge>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  {protocol.apy}%
                </div>
                <div className="text-sm text-slate-600">APY</div>
              </div>
              
              <div className="mt-4 text-xs text-slate-500 text-center">
                {protocol.apy > 100 ? 'Seems too good to be true?' : 'Looks reasonable'}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-amber-800">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-semibold">Remember:</span>
          </div>
          <p className="text-sm text-amber-700 mt-2">
            If it seems too good to be true, it probably is! Look for reasonable APYs and established protocols.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

const ImpermanentLossGame: React.FC<GameComponentProps> = ({ gameState, setGameState, score: _score, setScore, endGame }) => {
  const changePrice = (direction: 'up' | 'down') => {
    const change = direction === 'up' ? 1.2 : 0.8
    const newPrice = (gameState.currentPrice as number) * change
    
    // Calculate impermanent loss
    const priceRatio = newPrice / (gameState.initialPrice as number)
    const impermanentLoss = ((2 * Math.sqrt(priceRatio)) / (1 + priceRatio) - 1) * 100
    
    setGameState(prev => ({
      ...prev,
      currentPrice: newPrice,
      impermanentLoss,
      round: (prev.round ?? 0) + 1
    }))
    
    // Score based on understanding (lower IL is better)
    const points = Math.max(0, 20 - Math.abs(impermanentLoss))
    setScore(prev => prev + Math.floor(points))
    
    if ((gameState.round ?? 0) >= (gameState.maxRounds ?? Number.MAX_SAFE_INTEGER)) {
      endGame()
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          Navigate Price Changes
        </h3>
        <p className="text-slate-600">Watch how price changes affect your liquidity position</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              ${gameState.initialPrice}
            </div>
            <div className="text-sm text-slate-600">Initial Price</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-slate-900">
              ${typeof gameState.currentPrice === 'number' ? gameState.currentPrice.toFixed(2) : 0}
            </div>
            <div className="text-sm text-slate-600">Current Price</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className={cn(
              'text-2xl font-bold',
              (typeof gameState.impermanentLoss === 'number' && gameState.impermanentLoss < 0) ? 'text-red-600' : 'text-green-600'
            )}>
              {typeof gameState.impermanentLoss === 'number' ? gameState.impermanentLoss.toFixed(2) : '0.00'}%
            </div>
            <div className="text-sm text-slate-600">Impermanent Loss</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-center gap-4">
        <Button
          onClick={() => changePrice('up')}
          className="bg-green-500 hover:bg-green-600 flex items-center gap-2"
          disabled={(gameState.round ?? 0) >= (gameState.maxRounds ?? Number.MAX_SAFE_INTEGER)}
        >
          <TrendingUp className="h-4 w-4" />
          Price Up 20%
        </Button>
        
        <Button
          onClick={() => changePrice('down')}
          className="bg-red-500 hover:bg-red-600 flex items-center gap-2"
          disabled={(gameState.round ?? 0) >= (gameState.maxRounds ?? Number.MAX_SAFE_INTEGER)}
        >
          <TrendingDown className="h-4 w-4" />
          Price Down 20%
        </Button>
      </div>
      
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-sm text-blue-800 font-medium mb-2">
              {`Round ${gameState.round ?? 0} of ${gameState.maxRounds ?? 0}`}
            </div>
            <Progress 
              value={((gameState.round ?? 0) / Math.max(1, (gameState.maxRounds ?? 1))) * 100} 
              className="mb-2" 
            />
            <p className="text-xs text-blue-700">
              Impermanent loss occurs when token prices change after providing liquidity
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const RiskBalancerGame: React.FC<GameComponentProps> = ({ gameState, setGameState, score: _score, setScore, endGame }) => {
  const allocate = (category: 'safe' | 'medium' | 'risky', amount: number) => {
    const balance = gameState.balance ?? 0
    if (balance >= amount) {
      setGameState(prev => ({
        ...prev,
        portfolio: {
          ...(prev.portfolio ?? { safe: 0, medium: 0, risky: 0 }),
          [category]: ((prev.portfolio ?? { safe: 0, medium: 0, risky: 0 })[category] ?? 0) + amount
        },
        balance: (prev.balance ?? 0) - amount
      }))
    }
  }
  
  const checkBalance = () => {
    const portfolio = gameState.portfolio ?? { safe: 0, medium: 0, risky: 0 }
    const portfolioValues = Object.values(portfolio) as number[]
    const total = portfolioValues.reduce((sum: number, val: number) => sum + Number(val), 0)
    const target = gameState.target ?? { safe: 0, medium: 0, risky: 0 }
    
    const safePercentage = (portfolio.safe / total) * 100
    const mediumPercentage = (portfolio.medium / total) * 100
    const riskyPercentage = (portfolio.risky / total) * 100
    
    const safeDeviation = Math.abs(safePercentage - target.safe)
    const mediumDeviation = Math.abs(mediumPercentage - target.medium)
    const riskyDeviation = Math.abs(riskyPercentage - target.risky)
    
    const totalDeviation = safeDeviation + mediumDeviation + riskyDeviation
    const points = Math.max(0, 100 - totalDeviation * 2)
    
    setScore(prev => prev + Math.floor(points))
    
    setGameState(prev => ({
      ...prev,
      round: (prev.round ?? 0) + 1,
      balance: 100 // Reset balance for next round
    }))
    
    if ((gameState.round ?? 0) >= (gameState.maxRounds ?? Number.MAX_SAFE_INTEGER)) {
      endGame()
    }
  }
  
  const total = (Object.values((gameState.portfolio ?? { safe: 0, medium: 0, risky: 0 })) as number[]).reduce((sum: number, val: number) => sum + Number(val), 0)
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          Balance Your Portfolio
        </h3>
        <p className="text-slate-600">
          Target: {(gameState.target?.safe ?? 0)}% Safe, {(gameState.target?.medium ?? 0)}% Medium, {(gameState.target?.risky ?? 0)}% Risky
        </p>
        <div className="mt-2">
          <span className="text-lg font-semibold">Available: ${gameState.balance}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-green-700 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Safe Assets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 mb-2">
              ${(gameState.portfolio?.safe ?? 0)}
            </div>
            <div className="text-sm text-slate-600 mb-4">
              {total > 0 ? (((gameState.portfolio?.safe ?? 0) / total) * 100).toFixed(1) : 0}%
            </div>
            <div className="space-y-2">
              <Button size="sm" onClick={() => allocate('safe', 10)} className="w-full">
                +$10
              </Button>
              <Button size="sm" onClick={() => allocate('safe', 25)} className="w-full">
                +$25
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-yellow-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-yellow-700 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Medium Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 mb-2">
              ${(gameState.portfolio?.medium ?? 0)}
            </div>
            <div className="text-sm text-slate-600 mb-4">
              {(Number(total) > 0 ? (((gameState.portfolio?.medium ?? 0) / Number(total)) * 100) : 0).toFixed(1)}%
            </div>
            <div className="space-y-2">
              <Button size="sm" onClick={() => allocate('medium', 10)} className="w-full">
                +$10
              </Button>
              <Button size="sm" onClick={() => allocate('medium', 25)} className="w-full">
                +$25
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-red-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-red-700 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              High Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 mb-2">
              ${(gameState.portfolio?.risky ?? 0)}
            </div>
            <div className="text-sm text-slate-600 mb-4">
              {(Number(total) > 0 ? (((gameState.portfolio?.risky ?? 0) / Number(total)) * 100) : 0).toFixed(1)}%
            </div>
            <div className="space-y-2">
              <Button size="sm" onClick={() => allocate('risky', 10)} className="w-full">
                +$10
              </Button>
              <Button size="sm" onClick={() => allocate('risky', 25)} className="w-full">
                +$25
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center">
        <Button 
          onClick={checkBalance}
          disabled={total === 0}
          className="bg-purple-500 hover:bg-purple-600 px-8"
        >
          Check Balance & Continue
        </Button>
      </div>
      
      <Card className="bg-slate-50">
        <CardContent className="p-4 text-center">
          <div className="text-sm text-slate-600 mb-2">
            Round {gameState.round} of {gameState.maxRounds}
          </div>
           <Progress value={((gameState.round ?? 0) / Math.max(1, (gameState.maxRounds ?? 1))) * 100} />
        </CardContent>
      </Card>
    </div>
  )
}

export default MiniGames
