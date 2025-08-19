"use client"

import * as React from "react"
import { useEffect, useRef, useState } from 'react'
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useAnalytics } from "@/lib/analytics/use-analytics"
import { apiFetch } from '@/lib/api/fetcher';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { ScrollArea } from "@/components/ui/scroll-area" // 存在しないため一時的にコメントアウト

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  created_at: string
  tokens_used?: number
}

interface Chat {
  id: string
  title: string
  model: string
  created_at: string
  updated_at: string
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [chats, setChats] = useState<Chat[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [usage, setUsage] = useState<{
    dailyUsed: number
    dailyLimit: number | null
    monthlyUsed: number
    monthlyLimit: number | null
  } | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const supabase = createClient()
  const { track } = useAnalytics()

  // 認証チェック
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth/login")
      }
    }
    checkAuth()
  }, [router, supabase])

  // チャット履歴を読み込み
  useEffect(() => {
    loadChats()
  }, [])

  // メッセージスクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const loadChats = async () => {
    try {
      const response = await fetch("/api/ai/chat")
      if (!response.ok) throw new Error("Failed to load chats")
      
      const data = await response.json()
      setChats(data.chats || [])
    } catch (error) {
      console.error("Failed to load chats:", error)
    }
  }

  const loadMessages = async (chatId: string) => {
    try {
      const response = await fetch(`/api/ai/chat?chatId=${chatId}`)
      if (!response.ok) throw new Error("Failed to load messages")
      
      const data = await response.json()
      setMessages(data.messages || [])
      setCurrentChatId(chatId)
    } catch (error) {
      console.error("Failed to load messages:", error)
      setError("メッセージの読み込みに失敗しました")
    }
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!inputMessage.trim() || isLoading) return
    
    setError(null)
    setIsLoading(true)
    
    // UIに即座にユーザーメッセージを追加
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      created_at: new Date().toISOString(),
    }
    setMessages(prev => [...prev, userMessage])
    const messageContent = inputMessage // 送信前に保存
    setInputMessage("")
    
    const startTime = Date.now()
    
    try {
      const response = await apiFetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          message: messageContent,
          model: "gpt-3.5-turbo",
          chatId: currentChatId,
        },
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        if (response.status === 429) {
          // 使用制限エラーをトラッキング
          track('ai_limit_reached', {
            feature: 'ai_chat',
            limit: data.dailyLimit || 0
          })
          setError(`使用制限に達しました。日次制限: ${data.dailyUsed}/${data.dailyLimit || "∞"}`)
        } else if (response.status === 503) {
          track('ai_chat_error', {
            model: 'gpt-3.5-turbo',
            error: 'service_unavailable'
          })
          setError("AIサービスが利用できません。管理者にお問い合わせください。")
        } else {
          track('ai_chat_error', {
            model: 'gpt-3.5-turbo',
            error: data.error || 'unknown_error'
          })
          setError(data.error || "エラーが発生しました")
        }
        // エラー時はユーザーメッセージを削除
        setMessages(prev => prev.filter(m => m.id !== userMessage.id))
        return
      }
      
      // AI応答をUIに追加
      const aiMessage: Message = {
        id: Date.now().toString() + "-ai",
        role: "assistant",
        content: data.message,
        created_at: new Date().toISOString(),
        tokens_used: data.tokensUsed,
      }
      setMessages(prev => [...prev, aiMessage])
      
      // 使用状況を更新
      if (data.usage) {
        setUsage(data.usage)
      }
      
      // 新規チャットの場合はチャットIDを更新
      if (!currentChatId && data.chatId) {
        setCurrentChatId(data.chatId)
        loadChats() // チャットリストを更新
      }
      
      // 成功したチャットをトラッキング
      const duration = Date.now() - startTime
      track('ai_chat_sent', {
        model: data.model || 'gpt-3.5-turbo',
        tokensUsed: data.tokensUsed || 0
      })
      
      // パフォーマンスメトリクスもトラッキング
      track('feature_used', {
        feature: 'ai_chat',
        details: {
          response_time_ms: duration,
          tokens: data.tokensUsed
        }
      })
      
    } catch (error) {
      console.error("Failed to send message:", error)
      track('ai_chat_error', {
        model: 'gpt-3.5-turbo',
        error: 'network_error'
      })
      setError("メッセージの送信に失敗しました")
      // エラー時はユーザーメッセージを削除
      setMessages(prev => prev.filter(m => m.id !== userMessage.id))
    } finally {
      setIsLoading(false)
    }
  }

  const startNewChat = () => {
    setCurrentChatId(null)
    setMessages([])
    setError(null)
  }

  return (
    <div className="container mx-auto p-4 h-screen flex gap-4">
      {/* チャット履歴サイドバー */}
      <Card className="w-80 flex-shrink-0">
        <CardHeader>
          <CardTitle>チャット履歴</CardTitle>
          <Button onClick={startNewChat} className="w-full">
            新規チャット
          </Button>
        </CardHeader>
        <CardContent className="space-y-2">
          {chats.map(chat => (
            <Button
              key={chat.id}
              variant={currentChatId === chat.id ? "default" : "outline"}
              className="w-full justify-start truncate"
              onClick={() => loadMessages(chat.id)}
            >
              {chat.title}
            </Button>
          ))}
          {chats.length === 0 && (
            <p className="text-sm text-muted-foreground text-center">
              チャット履歴はありません
            </p>
          )}
        </CardContent>
      </Card>

      {/* メインチャットエリア */}
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle>AIチャット</CardTitle>
          <CardDescription>
            暗号通貨に関する質問や分析をAIに相談できます
            {usage && (
              <span className="ml-2">
                | 今日の使用: {usage.dailyUsed}/{usage.dailyLimit || "∞"}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          {/* メッセージエリア */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <p>AIに質問してみましょう！</p>
                <p className="text-sm mt-2">
                  例: 「ビットコインの今後の価格動向は？」
                </p>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-4 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  {message.tokens_used && (
                    <p className="text-xs opacity-70 mt-2">
                      トークン使用: {message.tokens_used}
                    </p>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-4">
                  <p>考え中...</p>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* エラー表示 */}
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg">
              {error}
            </div>
          )}
          
          {/* 入力フォーム */}
          <form onSubmit={sendMessage} className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="メッセージを入力..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !inputMessage.trim()}>
              送信
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 
