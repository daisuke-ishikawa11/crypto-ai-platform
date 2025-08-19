'use client'

import * as React from "react"
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AlertTriangle, Bell, Check, Settings, Smartphone, Mail, MessageCircle } from 'lucide-react'
import { 
  AlertConfig, 
  PlanType, 
  PLAN_CONFIGS, 
  ALERT_TYPE_LABELS,
  NOTIFICATION_DEVICE_LABELS,
  AlertType,
  NotificationDeviceType
} from '@/lib/types/alerts'
// Mock components for missing submodules
const AlertThresholdManager: React.FC<{ config: AlertConfig; onUpdate?: (thresholds: AlertConfig['thresholds']) => void }> = ({ config, onUpdate }) => (
  <div className="p-4 border rounded">
    <div className="text-sm text-gray-600">閾値マネージャー未実装のためスタブを表示中</div>
    <pre className="text-xs mt-2">{JSON.stringify(config, null, 2)}</pre>
    <button className="mt-2 text-blue-600 underline" onClick={() => onUpdate?.(config?.thresholds)}>更新</button>
  </div>
)

const NotificationDeviceManager: React.FC<{ config: AlertConfig; onUpdate?: (devices: AlertConfig['notificationDevices']) => void }> = ({ config, onUpdate }) => (
  <div className="p-4 border rounded">
    <div className="text-sm text-gray-600">通知デバイスマネージャー未実装のためスタブを表示中</div>
    <pre className="text-xs mt-2">{JSON.stringify(config?.notificationDevices, null, 2)}</pre>
    <button className="mt-2 text-blue-600 underline" onClick={() => onUpdate?.(config?.notificationDevices || [])}>更新</button>
  </div>
)

const TimeSlotManager: React.FC<{ config: AlertConfig; onUpdate?: (frequency: AlertConfig['frequency']) => void }> = ({ config, onUpdate }) => (
  <div className="p-4 border rounded">
    <div className="text-sm text-gray-600">タイムスロットマネージャー未実装のためスタブを表示中</div>
    <pre className="text-xs mt-2">{JSON.stringify(config?.frequency, null, 2)}</pre>
    <button className="mt-2 text-blue-600 underline" onClick={() => onUpdate?.(config?.frequency)}>更新</button>
  </div>
)

const AlertHistory: React.FC<{ userId: string }> = ({ userId }) => (
  <div className="p-4 border rounded text-sm text-gray-600">履歴スタブ（userId: {userId}）</div>
)

const AlertStats: React.FC<{ userId: string }> = ({ userId }) => (
  <div className="p-4 border rounded text-sm text-gray-600">統計スタブ（userId: {userId}）</div>
)

import { useToast } from '@/hooks/use-toast'

interface AlertSettingsProps {
  userId: string
  initialConfig?: AlertConfig
  planType: PlanType
}

export function AlertSettings({ userId, initialConfig, planType }: AlertSettingsProps) {
  const [config, setConfig] = useState<AlertConfig | null>(initialConfig || null)
  const [isLoading, setIsLoading] = useState(!initialConfig)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const { toast } = useToast()

  const planConfig = PLAN_CONFIGS[planType]

  useEffect(() => {
    if (!initialConfig) {
      loadConfig()
    }
  }, [initialConfig])

  const loadConfig = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/alerts/config')
      const data = await response.json()
      
      if (data.config) {
        setConfig(data.config)
      }
    } catch (error) {
      toast({
        title: 'エラー',
        description: 'アラート設定の読み込みに失敗しました',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const saveConfig = async (updates: Partial<AlertConfig>) => {
    try {
      setIsSaving(true)
      
      const response = await fetch('/api/alerts/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })

      const data = await response.json()
      
      if (data.success) {
        setConfig(data.config)
        toast({
          title: '保存完了',
          description: 'アラート設定を更新しました',
        })
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: 'エラー',
        description: error instanceof Error ? error.message : '設定の保存に失敗しました',
        variant: 'destructive'
      })
    } finally {
      setIsSaving(false)
    }
  }

  const resetConfig = async () => {
    if (!confirm('アラート設定をリセットしますか？この操作は元に戻せません。')) {
      return
    }

    try {
      setIsLoading(true)
      
      const response = await fetch('/api/alerts/config', {
        method: 'DELETE'
      })

      const data = await response.json()
      
      if (data.success) {
        setConfig(data.config)
        toast({
          title: 'リセット完了',
          description: 'アラート設定をデフォルトに戻しました',
        })
      }
    } catch (error) {
      toast({
        title: 'エラー',
        description: '設定のリセットに失敗しました',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleAlertType = async (alertType: AlertType) => {
    if (!config) return

    const currentTypes = config.alertTypes
    const newTypes = currentTypes.includes(alertType)
      ? currentTypes.filter(t => t !== alertType)
      : [...currentTypes, alertType]

    await saveConfig({ alertTypes: newTypes })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!config) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">アラート設定が見つかりません</h3>
            <p className="text-gray-600 mb-4">
              アラート機能を使用するには、まず設定を初期化してください。
            </p>
            <Button onClick={loadConfig}>
              設定を初期化
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* プランステータス */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            アラート設定
            <Badge variant={planType === 'free' ? 'secondary' : planType === 'basic' ? 'default' : 'secondary'}>
              {planType === 'free' ? '無料プラン' : 
               planType === 'basic' ? 'ベーシックプラン' : 'プレミアムプラン'}
            </Badge>
          </CardTitle>
          <CardDescription>
            {planType === 'free' && '無料プランでは基本的なアラート機能をご利用いただけます'}
            {planType === 'basic' && 'ベーシックプランでは充実したアラート機能をご利用いただけます'}
            {planType === 'premium' && 'プレミアムプランでは全てのアラート機能をご利用いただけます'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {planConfig.maxDailyAlerts === -1 ? '無制限' : planConfig.maxDailyAlerts}
              </div>
              <div className="text-sm text-gray-600">1日のアラート制限</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {config.frequency.currentDaily}
              </div>
              <div className="text-sm text-gray-600">本日の配信数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {planConfig.allowedAlertTypes.length}
              </div>
              <div className="text-sm text-gray-600">利用可能アラート種類</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {planConfig.allowedDevices.length}
              </div>
              <div className="text-sm text-gray-600">対応デバイス数</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* タブメニュー */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">概要</TabsTrigger>
          <TabsTrigger value="alerts">アラート種類</TabsTrigger>
          <TabsTrigger value="devices">通知デバイス</TabsTrigger>
          <TabsTrigger value="timing">タイミング</TabsTrigger>
          <TabsTrigger value="history">履歴・統計</TabsTrigger>
        </TabsList>

        {/* 概要タブ */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>現在の設定状況</CardTitle>
              <CardDescription>
                アラート機能の現在の設定状況を確認できます
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">有効なアラート種類</h4>
                  <div className="space-y-2">
                    {config.alertTypes.map(type => (
                      <div key={type} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{ALERT_TYPE_LABELS[type]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">通知デバイス</h4>
                  <div className="space-y-2">
                    {config.notificationDevices
                      .filter(device => device.enabled)
                      .map(device => (
                        <div key={device.type} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{NOTIFICATION_DEVICE_LABELS[device.type]}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex gap-2">
                  <Button 
                    onClick={resetConfig}
                    variant="outline"
                    disabled={isSaving}
                  >
                    設定をリセット
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('alerts')}
                    disabled={isSaving}
                  >
                    アラートを設定
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* アラート種類タブ */}
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>アラート種類の設定</CardTitle>
              <CardDescription>
                受信したいアラートの種類を選択してください
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                {planConfig.allowedAlertTypes.map(alertType => {
                  const isEnabled = config.alertTypes.includes(alertType)
                  return (
                    <div key={alertType} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{ALERT_TYPE_LABELS[alertType]}</h4>
                        <p className="text-sm text-gray-600">
                          {getAlertDescription(alertType)}
                        </p>
                      </div>
                      <Switch
                        checked={isEnabled}
                        onCheckedChange={() => toggleAlertType(alertType)}
                        disabled={isSaving}
                      />
                    </div>
                  )
                })}
              </div>
              
              {/* プラン制限外のアラート */}
              {Object.keys(ALERT_TYPE_LABELS).some(type => 
                !planConfig.allowedAlertTypes.includes(type as AlertType)
              ) && (
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">プレミアム機能</h4>
                  <div className="grid gap-3">
                    {(Object.keys(ALERT_TYPE_LABELS) as AlertType[])
                      .filter(type => !planConfig.allowedAlertTypes.includes(type))
                      .map(alertType => (
                        <div key={alertType} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                          <div>
                            <h4 className="font-medium text-gray-600">{ALERT_TYPE_LABELS[alertType]}</h4>
                            <p className="text-sm text-gray-500">
                              {getAlertDescription(alertType)}
                            </p>
                          </div>
                          <Badge variant="secondary">
                            {alertType.includes('ai_') || alertType.includes('portfolio_') ? 'プレミアム' : 'ベーシック+'}
                          </Badge>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 閾値管理 */}
          <AlertThresholdManager
            config={config as AlertConfig}
            onUpdate={(thresholds: AlertConfig['thresholds']) => saveConfig({ thresholds })}
          />
        </TabsContent>

        {/* 通知デバイスタブ */}
        <TabsContent value="devices">
          <NotificationDeviceManager
            config={config as AlertConfig}
            onUpdate={(devices: AlertConfig['notificationDevices']) => saveConfig({ notificationDevices: devices })}
          />
        </TabsContent>

        {/* タイミング設定タブ */}
        <TabsContent value="timing">
          <TimeSlotManager
            config={config as AlertConfig}
            onUpdate={(frequency: AlertConfig['frequency']) => saveConfig({ frequency })}
          />
        </TabsContent>

        {/* 履歴・統計タブ */}
        <TabsContent value="history" className="space-y-4">
          <AlertStats userId={userId} />
          <AlertHistory userId={userId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function getAlertDescription(alertType: AlertType): string {
  const descriptions = {
    price_alert: '指定した価格に到達した時にお知らせします',
    volatility_alert: '24時間で大きな価格変動があった時にお知らせします',
    trend_change: 'テクニカル分析でトレンドの変化を検出した時にお知らせします',
    volume_spike: '取引量が急激に増加した時にお知らせします',
    resistance_support: '重要なサポート・レジスタンスライン付近の動きをお知らせします',
    learning_related: '受講中のレッスンに関連する市場動向をお知らせします',
    ai_prediction: 'AI分析による価格予測に基づいた投資機会をお知らせします',
    portfolio_optimization: 'ポートフォリオの最適化提案をお知らせします',
    news_impact: '重要ニュースの市場への影響度分析をお知らせします',
    arbitrage_opportunity: 'アービトラージ機会を検出した時にお知らせします',
    defi_yield: '高利回りのDeFi機会を発見した時にお知らせします',
    risk_management: 'ポートフォリオリスクが高まった時にお知らせします'
  }
  
  return descriptions[alertType] || ''
}
