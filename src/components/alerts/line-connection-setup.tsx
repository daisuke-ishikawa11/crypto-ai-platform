'use client'

import * as React from "react"
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { MessageCircle, QrCode, Check, AlertTriangle, Loader2 } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useToast } from '@/hooks/use-toast'

interface LineConnectionSetupProps {
  onConnectionComplete?: () => void
}

export function LineConnectionSetup({ onConnectionComplete }: LineConnectionSetupProps) {
  const [step, setStep] = useState<'init' | 'generating' | 'qr' | 'waiting' | 'completed' | 'error'>('init')
  interface ConnectionData {
    success: boolean
    message?: string
    expiresIn?: number
    lineAddFriendUrl: string
    qrCodeUrl?: string
    token?: string
  }
  
  const [connectionData, setConnectionData] = useState<ConnectionData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const { toast } = useToast()

  // 連携状況確認
  useEffect(() => {
    checkConnectionStatus()
  }, [])

  // タイマー管理
  useEffect(() => {
    if (step === 'waiting' && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (step === 'waiting' && timeRemaining === 0) {
      setStep('error')
      setError('連携がタイムアウトしました。もう一度お試しください。')
    }
  }, [step, timeRemaining])

  // 連携状況ポーリング
  useEffect(() => {
    let pollInterval: NodeJS.Timeout

    if (step === 'waiting') {
      pollInterval = setInterval(async () => {
        const status = await checkConnectionStatus()
        if (status) {
          setStep('completed')
          setIsConnected(true)
          clearInterval(pollInterval)
          onConnectionComplete?.()
          toast({
            title: '連携完了',
            description: 'LINEアカウントの連携が完了しました！',
          })
        }
      }, 2000)
    }

    return () => {
      if (pollInterval) clearInterval(pollInterval)
    }
  }, [step])

  const checkConnectionStatus = async (): Promise<boolean> => {
    try {
      const response = await fetch('/api/line/connect', {
        method: 'GET',
        headers: { 'X-Check-Status': 'true' }
      })
      const data = await response.json()
      
      if (data.connected) {
        setIsConnected(true)
        setStep('completed')
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to check connection status:', error)
      return false
    }
  }

  const startConnection = async () => {
    try {
      setStep('generating')
      setError(null)

      const response = await fetch('/api/line/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })

      const data = await response.json()

      if (data.success) {
        setConnectionData(data)
        setTimeRemaining(data.expiresIn || 900) // 15分
        setStep('qr')
      } else {
        throw new Error(data.message || '連携の開始に失敗しました')
      }
    } catch (error) {
      setStep('error')
      setError(error instanceof Error ? error.message : '未知のエラーが発生しました')
    }
  }

  const proceedToLineApp = () => {
    setStep('waiting')
    // LINEアプリでBotを開く
    if (connectionData?.lineAddFriendUrl) {
      window.open(connectionData.lineAddFriendUrl, '_blank')
    }
  }

  const sendTestMessage = async () => {
    try {
      const response = await fetch('/api/alerts/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deviceType: 'line',
          testMessage: 'LINE連携のテスト通知です。正常に設定されています！ 🎉'
        })
      })

      const data = await response.json()
      
      if (data.success) {
        toast({
          title: 'テスト送信完了',
          description: 'LINEにテストメッセージを送信しました',
        })
      } else {
        throw new Error('テストメッセージの送信に失敗しました')
      }
    } catch (error) {
      toast({
        title: 'エラー',
        description: error instanceof Error ? error.message : 'テスト送信に失敗しました',
        variant: 'destructive'
      })
    }
  }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  if (isConnected && step === 'completed') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-green-600" />
            LINE通知設定
            <Badge variant="default" className="bg-green-600">
              連携済み
            </Badge>
          </CardTitle>
          <CardDescription>
            LINEでアラート通知を受け取る設定が完了しています
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Check className="h-4 w-4" />
            <AlertDescription>
              LINEアカウントとの連携が完了しました。重要な市場情報をLINEで受け取れます。
            </AlertDescription>
          </Alert>

          <div className="flex gap-2">
            <Button onClick={sendTestMessage} variant="outline">
              テスト通知を送信
            </Button>
            <Button 
              onClick={() => {
                setStep('init')
                setIsConnected(false)
              }}
              variant="ghost"
              size="sm"
            >
              再設定
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-green-600" />
          LINE通知設定
          {isConnected && (
            <Badge variant="default" className="bg-green-600">
              連携済み
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          LINEで重要な市場アラートを受け取る設定を行います
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* ステップインジケーター */}
        <div className="flex items-center justify-between text-sm">
          <div className={`flex items-center gap-2 ${step === 'init' ? 'text-blue-600 font-medium' : step === 'completed' ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              step === 'init' ? 'bg-blue-100 text-blue-600' : 
              step === 'completed' ? 'bg-green-100 text-green-600' : 
              'bg-gray-100 text-gray-400'
            }`}>1</div>
            連携開始
          </div>
          <div className={`flex items-center gap-2 ${step === 'qr' || step === 'waiting' ? 'text-blue-600 font-medium' : step === 'completed' ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              step === 'qr' || step === 'waiting' ? 'bg-blue-100 text-blue-600' :
              step === 'completed' ? 'bg-green-100 text-green-600' : 
              'bg-gray-100 text-gray-400'
            }`}>2</div>
            QRコード読み取り
          </div>
          <div className={`flex items-center gap-2 ${step === 'completed' ? 'text-green-600 font-medium' : 'text-gray-400'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              step === 'completed' ? 'bg-green-100 text-green-600' : 
              'bg-gray-100 text-gray-400'
            }`}>3</div>
            完了
          </div>
        </div>

        {/* コンテンツ */}
        {step === 'init' && (
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">LINE通知の利点</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>📱 スマートフォンにプッシュ通知</li>
                <li>🔔 見逃しにくいリアルタイム配信</li>
                <li>📊 リッチメッセージでグラフも表示</li>
                <li>💬 日本人に最も親しみやすい通知方法</li>
              </ul>
            </div>
            <Button onClick={startConnection} className="bg-green-600 hover:bg-green-700">
              <MessageCircle className="w-4 h-4 mr-2" />
              LINE連携を開始
            </Button>
          </div>
        )}

        {step === 'generating' && (
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
            <p className="text-gray-600">連携コードを生成中...</p>
          </div>
        )}

        {step === 'qr' && connectionData && (
          <div className="space-y-6">
            <Alert>
              <QrCode className="h-4 w-4" />
              <AlertDescription>
                下記のQRコードをLINEアプリでスキャンし、友達追加してください。
              </AlertDescription>
            </Alert>

            <div className="text-center space-y-4">
              <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg">
                <QRCodeSVG 
                  value={connectionData?.qrCodeUrl ?? ''} 
                  size={200}
                  level="M"
                  includeMargin={true}
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  QRコードが読み取れない場合
                </p>
                <Button 
                  onClick={proceedToLineApp}
                  variant="outline"
                  className="text-green-600 border-green-600 hover:bg-green-50"
                >
                  LINEアプリで開く
                </Button>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                手順: LINEアプリ → QRコードリーダー → 上記コードをスキャン → 友達追加
              </p>
            </div>
          </div>
        )}

        {step === 'waiting' && (
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
            <div className="space-y-2">
              <h3 className="font-medium">連携確認中...</h3>
              <p className="text-sm text-gray-600">
                LINEで友達追加が完了すると、自動的に連携されます
              </p>
              <div className="text-sm text-orange-600">
                残り時間: {formatTime(timeRemaining)}
              </div>
            </div>
            
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                友達追加後、しばらくお待ちください。自動的に連携が完了します。
              </AlertDescription>
            </Alert>
          </div>
        )}

        {step === 'error' && (
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
            
            <div className="text-center">
              <Button 
                onClick={() => {
                  setStep('init')
                  setError(null)
                }}
                variant="outline"
              >
                もう一度試す
              </Button>
            </div>
          </div>
        )}

        {/* ヘルプ情報 */}
        <div className="border-t pt-4">
          <details className="text-sm">
            <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
              うまく連携できない場合
            </summary>
            <div className="mt-2 space-y-2 text-gray-600">
              <p>• LINEアプリが最新バージョンであることを確認</p>
              <p>• QRコードが正しくスキャンされているか確認</p>
              <p>• ブラウザのプライベートモードを無効にする</p>
              <p>• しばらく時間をおいてから再試行する</p>
              <p>• それでも解決しない場合は、サポートまでお問い合わせください</p>
            </div>
          </details>
        </div>
      </CardContent>
    </Card>
  )
}
