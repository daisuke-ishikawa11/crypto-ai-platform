"use client"

import * as React from "react"
import { useEffect, useRef, useState } from 'react'
import { 
  MessageCircle, 
  X, 
  Sparkles, 
  Lightbulb, 
  Shield, 
  Info,
  ChevronUp,
  ChevronDown,
  Zap,
  Heart,
  Trophy,
  Target,
  BookOpen,
  Gift
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface DeFiAssistantProps {
  className?: string
  position?: 'bottom-right' | 'bottom-left' | 'sidebar'
  context?: {
    page: string
    userLevel?: number
    recentActivity?: string[]
    currentProtocol?: string
  }
}

export enum MessageType {
  WELCOME = 'welcome',
  TIP = 'tip',
  WARNING = 'warning',
  CELEBRATION = 'celebration',
  EXPLANATION = 'explanation',
  ENCOURAGEMENT = 'encouragement',
  FUN_FACT = 'fun_fact'
}

export interface AssistantMessage {
  id: string
  type: MessageType
  title: string
  content: string
  icon?: React.ReactNode
  actions?: {
    label: string
    action: () => void
    variant?: 'default' | 'secondary' | 'outline'
  }[]
  dismissible?: boolean
  priority?: number
  condition?: (context: unknown) => boolean
}

// Mascot expressions and animations
const mascotExpressions = {
  happy: '😊',
  excited: '🤩', 
  thinking: '🤔',
  celebrating: '🎉',
  warning: '⚠️',
  sleepy: '😴',
  winking: '😉',
  heart_eyes: '😍',
  cool: '😎',
  surprised: '😲'
}

// Pre-defined messages for different contexts
const ASSISTANT_MESSAGES: AssistantMessage[] = [
  // Welcome Messages
  {
    id: 'welcome_new_user',
    type: MessageType.WELCOME,
    title: 'Welcome to DeFi! 👋',
    content: "Hey there, future DeFi legend! I'm Dexter, your friendly DeFi assistant. I'm here to make your journey smooth and profitable. Ready to explore the decentralized future?",
    icon: <Sparkles className="h-5 w-5" />,
    actions: [
      {
        label: "Let's Go!",
        action: () => console.log('Starting tour'),
        variant: 'default'
      },
      {
        label: 'Maybe Later',
        action: () => console.log('Dismissed welcome'),
        variant: 'outline'
      }
    ],
    dismissible: true,
    priority: 10,
    condition: (context: unknown) => {
      const ctx = context as Record<string, unknown> | null | undefined;
      return typeof ctx?.userLevel === 'number' && ctx.userLevel === 1;
    }
  },
  
  // Tips and Explanations
  {
    id: 'impermanent_loss_tip',
    type: MessageType.TIP,
    title: 'Quick Tip: Impermanent Loss',
    content: "Think of impermanent loss like this: if you're providing liquidity and token prices dance differently, you might end up with fewer tokens than if you just held them. It's called 'impermanent' because it only becomes permanent when you withdraw!",
    icon: <Lightbulb className="h-5 w-5" />,
    dismissible: true,
    priority: 5,
    condition: (context: unknown) => {
      const ctx = context as Record<string, unknown> | null | undefined;
      return typeof ctx?.page === 'string' && ctx.page === 'liquidity-pools';
    }
  },
  
  {
    id: 'gas_optimization',
    type: MessageType.TIP,
    title: 'Gas Fee Ninja Move! ⛽',
    content: "Pro tip: Gas fees are like Uber surge pricing - they change based on network congestion. Try transacting during off-peak hours (weekends, late nights US time) to save some ETH!",
    icon: <Zap className="h-5 w-5" />,
    dismissible: true,
    priority: 6
  },
  
  {
    id: 'diversification_reminder',
    type: MessageType.TIP,
    title: 'Don\'t Put All Eggs in One Basket! 🥚',
    content: "I see you're really into this protocol! That's awesome, but remember: diversification is your best friend in DeFi. Spreading risk across different protocols can help protect your portfolio.",
    icon: <Shield className="h-5 w-5" />,
    dismissible: true,
    priority: 7,
    condition: (context: unknown) => {
      const ctx = context as Record<string, unknown> | null | undefined;
      return Boolean(ctx?.currentProtocol) && 
             Array.isArray(ctx?.recentActivity) && 
             ctx.recentActivity.length === 1;
    }
  },
  
  // Celebrations
  {
    id: 'first_yield',
    type: MessageType.CELEBRATION,
    title: 'First Yield Earned! 🎉',
    content: "Woohoo! You just earned your first DeFi yield! Welcome to the world of making your money work for you. This is just the beginning of your yield farming journey!",
    icon: <Trophy className="h-5 w-5" />,
    dismissible: true,
    priority: 9
  },
  
  {
    id: 'streak_achievement',
    type: MessageType.CELEBRATION,
    title: 'Consistency King! 👑',
    content: "Amazing! You've checked your portfolio every day this week. That's the kind of dedication that builds wealth in DeFi. Keep up the great work!",
    icon: <Trophy className="h-5 w-5" />,
    dismissible: true,
    priority: 8
  },
  
  // Warnings
  {
    id: 'high_risk_warning',
    type: MessageType.WARNING,
    title: 'High Risk Detected! ⚠️',
    content: "I noticed you're looking at a high-risk protocol. While high risk can mean high rewards, make sure you understand the risks and only invest what you can afford to lose!",
    icon: <Shield className="h-5 w-5" />,
    dismissible: true,
    priority: 9
  },
  
  // Fun Facts
  {
    id: 'defi_fun_fact_1',
    type: MessageType.FUN_FACT,
    title: 'DeFi Fun Fact! 🤓',
    content: "Did you know? The term 'HODL' came from a misspelled 'HOLD' in a Bitcoin forum in 2013. It later became a backronym for 'Hold On for Dear Life'. Now you're HODLing knowledge!",
    icon: <BookOpen className="h-5 w-5" />,
    dismissible: true,
    priority: 3
  },
  
  {
    id: 'defi_fun_fact_2',
    type: MessageType.FUN_FACT,
    title: 'DeFi History Tidbit! 📚',
    content: "The first DeFi protocol was arguably MakerDAO, launched in 2017. It introduced the concept of decentralized stablecoins. We've come so far since then - imagine what DeFi will look like in 2030!",
    icon: <BookOpen className="h-5 w-5" />,
    dismissible: true,
    priority: 3
  },
  
  {
    id: 'defi_fun_fact_3',
    type: MessageType.FUN_FACT,
    title: 'Whale Alert! 🐋',
    content: "Fun fact: In crypto, 'whales' are addresses holding massive amounts of tokens. They're called whales because when they move, they can create waves in the market! Don't worry though, small fish can be profitable too!",
    icon: <BookOpen className="h-5 w-5" />,
    dismissible: true,
    priority: 3
  },
  
  // Encouragement
  {
    id: 'learning_encouragement',
    type: MessageType.ENCOURAGEMENT,
    title: 'You\'re Doing Great! 💪',
    content: "Every DeFi expert started exactly where you are now. The fact that you're here, learning and exploring, puts you ahead of 99% of people. Keep going - your future self will thank you!",
    icon: <Heart className="h-5 w-5" />,
    dismissible: true,
    priority: 4
  },
  
  {
    id: 'patience_reminder',
    type: MessageType.ENCOURAGEMENT,
    title: 'Good Things Take Time ⏰',
    content: "Rome wasn't built in a day, and neither are DeFi fortunes! The magic of compound interest and consistent investing will compound your success over time. Stay patient and keep learning!",
    icon: <Target className="h-5 w-5" />,
    dismissible: true,
    priority: 4
  }
]

const messageTypeConfig = {
  [MessageType.WELCOME]: {
    bgColor: 'from-blue-50 to-indigo-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800',
    iconColor: 'text-blue-600',
    mascot: mascotExpressions.excited
  },
  [MessageType.TIP]: {
    bgColor: 'from-yellow-50 to-orange-50',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-800',
    iconColor: 'text-yellow-600',
    mascot: mascotExpressions.thinking
  },
  [MessageType.WARNING]: {
    bgColor: 'from-red-50 to-pink-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-800',
    iconColor: 'text-red-600',
    mascot: mascotExpressions.warning
  },
  [MessageType.CELEBRATION]: {
    bgColor: 'from-green-50 to-emerald-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800',
    iconColor: 'text-green-600',
    mascot: mascotExpressions.celebrating
  },
  [MessageType.EXPLANATION]: {
    bgColor: 'from-purple-50 to-violet-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-800',
    iconColor: 'text-purple-600',
    mascot: mascotExpressions.thinking
  },
  [MessageType.ENCOURAGEMENT]: {
    bgColor: 'from-pink-50 to-rose-50',
    borderColor: 'border-pink-200',
    textColor: 'text-pink-800',
    iconColor: 'text-pink-600',
    mascot: mascotExpressions.heart_eyes
  },
  [MessageType.FUN_FACT]: {
    bgColor: 'from-cyan-50 to-blue-50',
    borderColor: 'border-cyan-200',
    textColor: 'text-cyan-800',
    iconColor: 'text-cyan-600',
    mascot: mascotExpressions.cool
  }
}

export const DeFiAssistant: React.FC<DeFiAssistantProps> = ({ 
  className = '',
  position = 'bottom-right',
  context = { page: 'dashboard' }
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMessage, setCurrentMessage] = useState<AssistantMessage | null>(null)
  const [dismissedMessages, setDismissedMessages] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('defi-assistant-dismissed')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [messageHistory, setMessageHistory] = useState<AssistantMessage[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [mascotExpression, setMascotExpression] = useState(mascotExpressions.happy)
  const messageTimer = useRef<NodeJS.Timeout | null>(null)

  // Find relevant messages based on context
  const getRelevantMessages = React.useCallback(() => {
    return ASSISTANT_MESSAGES
      .filter(msg => {
        // Filter out dismissed messages
        if (dismissedMessages.includes(msg.id)) return false
        // Check condition if it exists
        if (msg.condition && !msg.condition(context)) return false
        return true
      })
      .sort((a, b) => (b.priority || 0) - (a.priority || 0))
  }, [dismissedMessages, context])

  // Cycle through messages automatically
  useEffect(() => {
    const relevantMessages = getRelevantMessages()
    if (relevantMessages.length === 0) return

    // Show a random message every 30 seconds when not open
    if (!isOpen && !currentMessage) {
      messageTimer.current = setTimeout(() => {
        const randomMessage = relevantMessages[Math.floor(Math.random() * relevantMessages.length)]
        setCurrentMessage(randomMessage)
        setMascotExpression(messageTypeConfig[randomMessage.type].mascot)
      }, Math.random() * 30000 + 10000) // 10-40 seconds
    }

    return () => {
      if (messageTimer.current) {
        clearTimeout(messageTimer.current)
      }
    }
  }, [isOpen, currentMessage, getRelevantMessages])

  // Update mascot expression based on current message
  useEffect(() => {
    if (currentMessage) {
      setMascotExpression(messageTypeConfig[currentMessage.type].mascot)
    } else {
      setMascotExpression(mascotExpressions.happy)
    }
  }, [currentMessage])

  const dismissMessage = (messageId: string) => {
    const newDismissed = [...dismissedMessages, messageId]
    setDismissedMessages(newDismissed)
    localStorage.setItem('defi-assistant-dismissed', JSON.stringify(newDismissed))
    
    if (currentMessage?.id === messageId) {
      setCurrentMessage(null)
    }
  }

  const showMessage = (message: AssistantMessage) => {
    setCurrentMessage(message)
    if (!messageHistory.find(m => m.id === message.id)) {
      setMessageHistory(prev => [message, ...prev].slice(0, 10)) // Keep last 10 messages
    }
  }

  const positionClasses = {
    'bottom-right': 'fixed bottom-4 right-4 z-50',
    'bottom-left': 'fixed bottom-4 left-4 z-50',
    'sidebar': 'relative'
  }

  return (
    <div className={cn(positionClasses[position], className)}>
      {/* Floating Assistant Button */}
      {!isOpen && (
        <div className="relative">
          <Button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
          >
            {/* Mascot Expression */}
            <div className="absolute inset-0 flex items-center justify-center text-2xl transition-transform group-hover:scale-110">
              {mascotExpression}
            </div>
            
            {/* Notification Pulse */}
            {currentMessage && (
              <div className="absolute -top-2 -right-2">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce">
                  !
                </div>
                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75" />
              </div>
            )}
            
            {/* Sparkle Effects */}
            <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-75" />
            <div className="absolute bottom-2 left-1 w-1 h-1 bg-purple-300 rounded-full animate-bounce delay-300" />
          </Button>
          
          {/* Preview Message Tooltip */}
          {currentMessage && (
            <Card className="absolute bottom-20 right-0 w-80 shadow-xl border-2 animate-slideIn">
              <CardContent className={cn(
                'p-4 bg-gradient-to-br',
                messageTypeConfig[currentMessage.type].bgColor,
                messageTypeConfig[currentMessage.type].borderColor
              )}>
                <div className="flex items-start gap-3">
                  <div className={cn(
                    'p-2 rounded-lg bg-white/50',
                    messageTypeConfig[currentMessage.type].iconColor
                  )}>
                    {currentMessage.icon || <Info className="h-4 w-4" />}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className={cn(
                      'font-semibold text-sm mb-1',
                      messageTypeConfig[currentMessage.type].textColor
                    )}>
                      {currentMessage.title}
                    </h4>
                    <p className={cn(
                      'text-sm leading-relaxed',
                      messageTypeConfig[currentMessage.type].textColor
                    )}>
                      {currentMessage.content}
                    </p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dismissMessage(currentMessage.id)}
                    className="p-1 h-auto"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                {currentMessage.actions && (
                  <div className="flex gap-2 mt-3">
                    {currentMessage.actions.map((action, index) => (
                      <Button
                        key={index}
                        size="sm"
                        variant={action.variant || 'default'}
                        onClick={action.action}
                        className="text-xs"
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}
      
      {/* Expanded Assistant Panel */}
      {isOpen && (
        <Card className="w-96 h-[600px] shadow-2xl border-0 bg-white overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
                  {mascotExpression}
                </div>
                <div>
                  <h3 className="font-semibold">Dexter</h3>
                  <p className="text-xs opacity-90">Your DeFi Assistant</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHistory(!showHistory)}
                  className="text-white hover:bg-white/20 p-2"
                >
                  {showHistory ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="flex-1 p-4 overflow-y-auto">
            {showHistory ? (
              // Message History
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Recent Tips & Messages
                </h4>
                
                {messageHistory.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No messages yet. I&apos;ll start sharing helpful tips as you explore DeFi!</p>
                  </div>
                ) : (
                  messageHistory.map((message) => (
                    <Card key={message.id} className="border border-slate-200">
                      <CardContent className={cn(
                        'p-3 bg-gradient-to-br',
                        messageTypeConfig[message.type].bgColor
                      )}>
                        <div className="flex items-start gap-2">
                          <div className={cn(
                            'p-1 rounded bg-white/50 flex-shrink-0',
                            messageTypeConfig[message.type].iconColor
                          )}>
                            {message.icon || <Info className="h-3 w-3" />}
                          </div>
                          <div className="flex-1">
                            <h5 className={cn(
                              'font-medium text-sm',
                              messageTypeConfig[message.type].textColor
                            )}>
                              {message.title}
                            </h5>
                            <p className={cn(
                              'text-xs mt-1',
                              messageTypeConfig[message.type].textColor
                            )}>
                              {message.content}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            ) : (
              // Available Messages
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Tips & Insights for You
                </h4>
                
                {getRelevantMessages().slice(0, 5).map((message) => (
                  <Card 
                    key={message.id} 
                    className="border-2 cursor-pointer hover:shadow-md transition-all duration-200"
                    onClick={() => showMessage(message)}
                  >
                    <CardContent className={cn(
                      'p-4 bg-gradient-to-br',
                      messageTypeConfig[message.type].bgColor,
                      messageTypeConfig[message.type].borderColor
                    )}>
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          'p-2 rounded-lg bg-white/50 flex-shrink-0',
                          messageTypeConfig[message.type].iconColor
                        )}>
                          {message.icon || <Info className="h-4 w-4" />}
                        </div>
                        
                        <div className="flex-1">
                          <h5 className={cn(
                            'font-semibold text-sm mb-2',
                            messageTypeConfig[message.type].textColor
                          )}>
                            {message.title}
                          </h5>
                          <p className={cn(
                            'text-sm leading-relaxed',
                            messageTypeConfig[message.type].textColor
                          )}>
                            {message.content.length > 100 
                              ? `${message.content.substring(0, 100)}...` 
                              : message.content
                            }
                          </p>
                          
                          <div className="flex items-center justify-between mt-3">
                            <Badge variant="secondary" className="text-xs">
                              {message.type.replace('_', ' ')}
                            </Badge>
                            
                            {message.dismissible && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  dismissMessage(message.id)
                                }}
                                className="text-xs p-1 h-auto opacity-70 hover:opacity-100"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {getRelevantMessages().length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    <Gift className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="mb-2">All caught up!</p>
                    <p className="text-sm">Keep exploring DeFi and I&apos;ll have more insights for you.</p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="bg-slate-50 p-3 text-center">
            <p className="text-xs text-slate-600">
              💡 <span className="font-medium">Pro Tip:</span> I learn from your activity to give better advice!
            </p>
          </div>
        </Card>
      )}
      
      {/* Custom animations */}
      <style jsx>{`
        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: translateY(10px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(20px) scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  )
}

export default DeFiAssistant
