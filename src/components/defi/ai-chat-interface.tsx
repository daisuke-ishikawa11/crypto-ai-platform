'use client';

// 🤖 AI Chat Interface - Advanced DeFi Assistant UI
// Real-time DeFi assistant with voice input and conversation history

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Send,
  Mic,
  MicOff,
  Download,
  Search,
  Bookmark,
  RefreshCw,
  AlertTriangle,
  TrendingUp,
  Shield,
  Zap,
  MessageSquare,
  History,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    confidence?: number;
    riskLevel?: 'low' | 'medium' | 'high';
    protocols?: string[];
    actionableInsights?: Array<{
      action: string;
      protocol?: string;
      reasoning: string;
      priority: number;
    }>;
  };
}

interface SuggestedQuestion {
  id: string;
  question: string;
  category: 'yield' | 'risk' | 'protocol' | 'strategy';
  icon: React.ReactNode;
}

interface AIChatInterfaceProps {
  initialPortfolio?: any;
  userPreferences?: any;
  onAdviceReceived?: (advice: any) => void;
  className?: string;
}

const SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  {
    id: '1',
    question: 'Aaveとcompoundを比較して、どちらが良い投資先でしょうか？',
    category: 'protocol',
    icon: <Shield className="w-4 h-4" />
  },
  {
    id: '2',
    question: '現在のポートフォリオのリスクレベルを評価してください',
    category: 'risk',
    icon: <AlertTriangle className="w-4 h-4" />
  },
  {
    id: '3',
    question: '最適な利回り獲得戦略を教えてください',
    category: 'yield',
    icon: <TrendingUp className="w-4 h-4" />
  },
  {
    id: '4',
    question: 'インパーマネントロスのリスクが低いプロトコルは？',
    category: 'strategy',
    icon: <Zap className="w-4 h-4" />
  }
];

export function AIChatInterface({
  initialPortfolio,
  userPreferences,
  onAdviceReceived,
  className
}: AIChatInterfaceProps) {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognition = useRef<SpeechRecognition | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      recognition.current = new (window as any).webkitSpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'ja-JP';

      recognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognition.current.onerror = () => {
        setIsListening(false);
        toast({
          title: "音声認識エラー",
          description: "音声入力に失敗しました。再度お試しください。",
          variant: "destructive"
        });
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [toast]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = useCallback(async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/defi/advisor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: text,
          context: {
            portfolio: initialPortfolio,
            preferences: userPreferences
          },
          conversationHistory: messages.slice(-5)
        })
      });

      if (!response.ok) {
        throw new Error('AI応答の取得に失敗しました');
      }

      const advice = await response.json();

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: advice.response,
        timestamp: new Date(),
        metadata: {
          confidence: advice.confidence,
          riskLevel: advice.riskLevel,
          protocols: advice.protocols_mentioned,
          actionableInsights: advice.actionable_insights
        }
      };

      setMessages(prev => [...prev, assistantMessage]);
      onAdviceReceived?.(advice);

    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "エラー",
        description: "AI応答の取得に失敗しました。後ほどお試しください。",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, initialPortfolio, userPreferences, onAdviceReceived, toast]);

  const handleVoiceInput = () => {
    if (!recognition.current) {
      toast({
        title: "音声入力未対応",
        description: "お使いのブラウザは音声入力に対応していません。",
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      recognition.current.stop();
      setIsListening(false);
    } else {
      recognition.current.start();
      setIsListening(true);
    }
  };

  const handleExportConversation = () => {
    const conversationText = messages
      .map(msg => `${msg.role === 'user' ? 'ユーザー' : 'AI'}: ${msg.content}`)
      .join('\n\n');

    const blob = new Blob([conversationText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `defi-ai-conversation-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "エクスポート完了",
      description: "会話履歴をテキストファイルでダウンロードしました。"
    });
  };

  const filteredMessages = messages.filter(msg =>
    searchTerm === '' || 
    msg.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'yield': return 'bg-green-100 text-green-800';
      case 'risk': return 'bg-red-100 text-red-800';
      case 'protocol': return 'bg-blue-100 text-blue-800';
      case 'strategy': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskLevelColor = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card className={cn("w-full h-[600px] flex flex-col", className)}>
      <CardHeader className="flex-shrink-0 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            DeFi AIアドバイザー
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportConversation}
              disabled={messages.length === 0}
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat">チャット</TabsTrigger>
            <TabsTrigger value="history">履歴</TabsTrigger>
            <TabsTrigger value="suggestions">提案</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-4 space-y-4 overflow-hidden">
        <TabsContent value="chat" className="flex-1 flex flex-col space-y-4 mt-0">
          {/* Chat Messages */}
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium mb-2">DeFi AIアドバイザーへようこそ</p>
                  <p className="text-sm">投資戦略、プロトコル分析、リスク評価について何でもお聞きください。</p>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.role === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-4 py-2",
                      message.role === 'user'
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    )}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    
                    {message.metadata && (
                      <div className="mt-2 pt-2 border-t border-gray-300 space-y-2">
                        <div className="flex items-center gap-2 text-xs">
                          {message.metadata.confidence && (
                            <Badge variant="outline">
                              確信度: {Math.round(message.metadata.confidence * 100)}%
                            </Badge>
                          )}
                          {message.metadata.riskLevel && (
                            <Badge className={getRiskLevelColor(message.metadata.riskLevel)}>
                              {message.metadata.riskLevel === 'low' ? '低リスク' :
                               message.metadata.riskLevel === 'medium' ? '中リスク' : '高リスク'}
                            </Badge>
                          )}
                        </div>
                        
                        {message.metadata.protocols && message.metadata.protocols.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {message.metadata.protocols.map((protocol, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {protocol}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-500 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span className="text-sm">AI が考えています...</span>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Suggested Questions */}
          <div className="grid grid-cols-2 gap-2">
            {SUGGESTED_QUESTIONS.slice(0, 4).map((question) => (
              <Button
                key={question.id}
                variant="outline"
                size="sm"
                className="text-xs h-auto py-2 px-3"
                onClick={() => handleSubmit(question.question)}
                disabled={isLoading}
              >
                <div className="flex items-center gap-2">
                  {question.icon}
                  <span className="truncate">{question.question}</span>
                </div>
              </Button>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="DeFiについて質問してください..."
                disabled={isLoading}
                className="pr-12"
              />
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "absolute right-1 top-1 h-8 w-8 p-0",
                  isListening && "text-red-500"
                )}
                onClick={handleVoiceInput}
                disabled={isLoading}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
            </div>
            <Button
              onClick={() => handleSubmit()}
              disabled={!input.trim() || isLoading}
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="history" className="flex-1 flex flex-col space-y-4 mt-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="会話履歴を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <ScrollArea className="flex-1">
            <div className="space-y-2">
              {filteredMessages.map((message) => (
                <Card key={message.id} className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={message.role === 'user' ? 'default' : 'secondary'}>
                      {message.role === 'user' ? 'ユーザー' : 'AI'}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {message.timestamp.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm line-clamp-3">{message.content}</p>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="suggestions" className="flex-1 flex flex-col space-y-4 mt-0">
          <div className="space-y-4">
            <h3 className="font-medium">推奨される質問</h3>
            
            {Object.entries(
              SUGGESTED_QUESTIONS.reduce((acc, q) => {
                if (!acc[q.category]) acc[q.category] = [];
                acc[q.category].push(q);
                return acc;
              }, {} as Record<string, SuggestedQuestion[]>)
            ).map(([category, questions]) => (
              <div key={category} className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700 capitalize flex items-center gap-2">
                  {category === 'yield' && <TrendingUp className="w-4 h-4" />}
                  {category === 'risk' && <Shield className="w-4 h-4" />}
                  {category === 'protocol' && <Zap className="w-4 h-4" />}
                  {category === 'strategy' && <MessageSquare className="w-4 h-4" />}
                  {category === 'yield' ? '利回り最適化' :
                   category === 'risk' ? 'リスク管理' :
                   category === 'protocol' ? 'プロトコル分析' : '戦略策定'}
                </h4>
                <div className="space-y-1">
                  {questions.map((question) => (
                    <Button
                      key={question.id}
                      variant="outline"
                      className="w-full justify-start text-sm h-auto py-3 px-4"
                      onClick={() => {
                        setActiveTab('chat');
                        handleSubmit(question.question);
                      }}
                      disabled={isLoading}
                    >
                      <div className="flex items-center gap-3">
                        {question.icon}
                        <span className="text-left">{question.question}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Disclaimer */}
        <Alert className="flex-shrink-0">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            本AIアドバイザーは教育目的のみです。実際の投資決定前には必ず専門家にご相談ください。
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}

export default AIChatInterface;