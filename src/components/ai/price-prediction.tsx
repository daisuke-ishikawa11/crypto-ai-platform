"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, TrendingUp, Target, Clock, DollarSign, AlertCircle } from "lucide-react"

interface PredictionResult {
  prediction: number
  confidence: number
  reasoning: string
  supportingData: {
    currentPrice: number
    change24h: number
    volume: number
    technicalIndicators: {
      rsi: number
      macd: number
      movingAverage: number
    }
    model: string
    tokensUsed: number
    factors: string[]
    timestamp: string
  }
}

export default function PricePrediction() {
  const [symbol, setSymbol] = useState("BTC")
  const [timeframe, setTimeframe] = useState("24h")
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [usage, setUsage] = useState<{
    dailyUsed: number
    dailyLimit: number | null
    monthlyUsed: number
    monthlyLimit: number | null
  } | null>(null)

  const handlePredict = async () => {
    if (!symbol || isLoading) return
    
    setError(null)
    setIsLoading(true)
    setPrediction(null)
    
    try {
      const response = await fetch("/api/ai/prediction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbol,
          timeframe,
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        if (response.status === 429) {
          setError(`使用制限に達しました。日次制限: ${data.dailyUsed}/${data.dailyLimit || "∞"}`)
        } else {
          setError(data.error || "予測の生成に失敗しました")
        }
        return
      }
      
      setPrediction(data)
      setUsage(data.usage)
      
    } catch (error) {
      console.error("Prediction error:", error)
      setError("予測の生成に失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "bg-green-500"
    if (confidence >= 0.6) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-6">
      {/* 予測入力 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            AI価格予測
          </CardTitle>
          <CardDescription>
            AI技術を使用した暗号通貨価格予測
            {usage && (
              <span className="ml-2 text-sm">
                | 今日の使用: {usage.dailyUsed}/{usage.dailyLimit || "∞"}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">暗号通貨</label>
              <Select value={symbol} onValueChange={setSymbol}>
                <SelectTrigger>
                  <SelectValue placeholder="暗号通貨を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                  <SelectItem value="SOL">Solana (SOL)</SelectItem>
                  <SelectItem value="ADA">Cardano (ADA)</SelectItem>
                  <SelectItem value="DOT">Polkadot (DOT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">時間枠</label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger>
                  <SelectValue placeholder="時間枠を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1時間</SelectItem>
                  <SelectItem value="24h">24時間</SelectItem>
                  <SelectItem value="7d">7日間</SelectItem>
                  <SelectItem value="30d">30日間</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handlePredict} 
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    予測中...
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    予測する
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* エラー表示 */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* 予測結果 */}
      {prediction && (
        <div className="space-y-4">
          {/* 予測メイン */}
          <Card>
            <CardHeader>
              <CardTitle>予測結果</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {new Date(prediction.supportingData.timestamp).toLocaleString('ja-JP')}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium">予測価格</span>
                  </div>
                  <div className="text-3xl font-bold text-green-500">
                    {formatCurrency(prediction.prediction)}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium">信頼度</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-3xl font-bold">
                      {Math.round(prediction.confidence * 100)}%
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`${getConfidenceColor(prediction.confidence)} text-white`}
                    >
                      {prediction.confidence >= 0.8 ? "高" : 
                       prediction.confidence >= 0.6 ? "中" : "低"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 市場データ */}
          <Card>
            <CardHeader>
              <CardTitle>現在の市場データ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">現在価格</p>
                  <p className="text-lg font-semibold">
                    {formatCurrency(prediction.supportingData.currentPrice)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">24時間変動</p>
                  <p className={`text-lg font-semibold ${
                    prediction.supportingData.change24h >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {formatPercentage(prediction.supportingData.change24h)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">RSI</p>
                  <p className="text-lg font-semibold">
                    {prediction.supportingData.technicalIndicators.rsi.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">取引量</p>
                  <p className="text-lg font-semibold">
                    {formatCurrency(prediction.supportingData.volume)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 予測理由 */}
          <Card>
            <CardHeader>
              <CardTitle>予測の根拠</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="prose max-w-none">
                  <p className="text-sm leading-relaxed">
                    {prediction.reasoning}
                  </p>
                </div>
                {prediction.supportingData.factors.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">主要な影響要因:</p>
                    <div className="flex flex-wrap gap-2">
                      {prediction.supportingData.factors.map((factor, index) => (
                        <Badge key={index} variant="outline">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}