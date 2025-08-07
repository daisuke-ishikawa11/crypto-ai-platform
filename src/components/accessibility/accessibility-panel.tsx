// ♿ アクセシビリティ設定パネル
// ユーザーがアクセシビリティ設定をカスタマイズできるコンポーネント

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Eye,
  EyeOff,
  Type,
  Navigation,
  Volume2,
  Contrast,
  MousePointer,
  Keyboard,
  X,
  Check,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAccessibilitySettings, announceToScreenReader } from '@/lib/accessibility/a11y-utils';

interface AccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccessibilityPanel({ isOpen, onClose }: AccessibilityPanelProps) {
  const { settings, updateSettings, resetSettings } = useAccessibilitySettings();
  const [activeTab, setActiveTab] = useState<'visual' | 'motor' | 'cognitive'>('visual');

  const handleSettingChange = (key: string, value: any) => {
    updateSettings({ [key]: value });
    announceToScreenReader(`${key}を${value ? '有効' : '無効'}にしました`);
  };

  const handleReset = () => {
    resetSettings();
    announceToScreenReader('アクセシビリティ設定をリセットしました');
  };

  const tabs = [
    {
      id: 'visual' as const,
      label: '視覚的サポート',
      icon: Eye,
      description: 'コントラスト、フォント、色の設定',
    },
    {
      id: 'motor' as const,
      label: '操作サポート',
      icon: MousePointer,
      description: 'キーボード、マウス、タッチの設定',
    },
    {
      id: 'cognitive' as const,
      label: '認知サポート',
      icon: Volume2,
      description: 'アニメーション、音声、集中の設定',
    },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-md">
            <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-blue-100">
                    <Settings className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">アクセシビリティ設定</CardTitle>
                    <CardDescription>すべてのユーザーが使いやすい環境をカスタマイズ</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    リセット
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="p-2"
                    aria-label="アクセシビリティ設定を閉じる"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <div className="flex h-[60vh]">
              {/* タブナビゲーション */}
              <div className="w-64 border-r bg-gray-50/50 p-4">
                <nav className="space-y-2" role="tablist">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        aria-controls={`panel-${tab.id}`}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          activeTab === tab.id
                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <div className="flex items-start gap-3">
                          <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium">{tab.label}</div>
                            <div className="text-sm opacity-75 mt-1">{tab.description}</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* タブコンテンツ */}
              <div className="flex-1 p-6 overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    role="tabpanel"
                    id={`panel-${activeTab}`}
                  >
                    {activeTab === 'visual' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Contrast className="w-5 h-5" />
                            視覚的アクセシビリティ
                          </h3>
                          
                          <div className="space-y-4">
                            {/* 高コントラスト */}
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label htmlFor="high-contrast" className="text-sm font-medium">
                                  高コントラストモード
                                </Label>
                                <p className="text-sm text-gray-600">
                                  テキストと背景のコントラストを強化します
                                </p>
                              </div>
                              <Switch
                                id="high-contrast"
                                checked={settings.highContrast}
                                onCheckedChange={(checked) => handleSettingChange('highContrast', checked)}
                              />
                            </div>

                            {/* フォントサイズ */}
                            <div className="space-y-3">
                              <Label className="text-sm font-medium">フォントサイズ</Label>
                              <Select
                                value={settings.fontSize}
                                onValueChange={(value) => handleSettingChange('fontSize', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="small">小 (14px)</SelectItem>
                                  <SelectItem value="medium">中 (16px)</SelectItem>
                                  <SelectItem value="large">大 (18px)</SelectItem>
                                  <SelectItem value="extra-large">特大 (20px)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            {/* フォーカス表示 */}
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label htmlFor="focus-visible" className="text-sm font-medium">
                                  フォーカス表示の強化
                                </Label>
                                <p className="text-sm text-gray-600">
                                  キーボード操作時のフォーカスを分かりやすく表示
                                </p>
                              </div>
                              <Switch
                                id="focus-visible"
                                checked={settings.focusVisible}
                                onCheckedChange={(checked) => handleSettingChange('focusVisible', checked)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'motor' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Keyboard className="w-5 h-5" />
                            操作性アクセシビリティ
                          </h3>
                          
                          <div className="space-y-4">
                            {/* キーボードナビゲーション */}
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label htmlFor="keyboard-nav" className="text-sm font-medium">
                                  キーボードナビゲーション
                                </Label>
                                <p className="text-sm text-gray-600">
                                  キーボードのみでの操作を最適化
                                </p>
                              </div>
                              <Switch
                                id="keyboard-nav"
                                checked={settings.keyboardNavigation}
                                onCheckedChange={(checked) => handleSettingChange('keyboardNavigation', checked)}
                              />
                            </div>

                            {/* タッチターゲットサイズ */}
                            <div className="space-y-3">
                              <Label className="text-sm font-medium">タッチターゲットの推奨事項</Label>
                              <div className="p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-700">
                                  すべてのボタンとリンクは44px以上のサイズで設計されています
                                </p>
                              </div>
                            </div>

                            {/* マウス操作の支援 */}
                            <div className="space-y-3">
                              <Label className="text-sm font-medium">マウス操作の支援</Label>
                              <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <Check className="w-4 h-4 text-green-600" />
                                  <span>ホバー効果の最適化</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Check className="w-4 h-4 text-green-600" />
                                  <span>ドラッグ&ドロップの代替手段</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Check className="w-4 h-4 text-green-600" />
                                  <span>右クリックメニューの代替手段</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'cognitive' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Volume2 className="w-5 h-5" />
                            認知的アクセシビリティ
                          </h3>
                          
                          <div className="space-y-4">
                            {/* アニメーション軽減 */}
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label htmlFor="reduced-motion" className="text-sm font-medium">
                                  アニメーション軽減
                                </Label>
                                <p className="text-sm text-gray-600">
                                  動きのあるアニメーションを軽減します
                                </p>
                              </div>
                              <Switch
                                id="reduced-motion"
                                checked={settings.reducedMotion}
                                onCheckedChange={(checked) => handleSettingChange('reducedMotion', checked)}
                              />
                            </div>

                            {/* スクリーンリーダー最適化 */}
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label htmlFor="screen-reader" className="text-sm font-medium">
                                  スクリーンリーダー最適化
                                </Label>
                                <p className="text-sm text-gray-600">
                                  音声読み上げソフトウェア向けの最適化
                                </p>
                              </div>
                              <Switch
                                id="screen-reader"
                                checked={settings.screenReaderOptimized}
                                onCheckedChange={(checked) => handleSettingChange('screenReaderOptimized', checked)}
                              />
                            </div>

                            {/* 言語と理解の支援 */}
                            <div className="space-y-3">
                              <Label className="text-sm font-medium">理解の支援機能</Label>
                              <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <Check className="w-4 h-4 text-green-600" />
                                  <span>簡潔でわかりやすいラベル</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Check className="w-4 h-4 text-green-600" />
                                  <span>エラーメッセージの明確な説明</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Check className="w-4 h-4 text-green-600" />
                                  <span>一貫したナビゲーション</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Check className="w-4 h-4 text-green-600" />
                                  <span>複雑な操作の代替手段</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* フッター */}
            <div className="border-t p-4 bg-gray-50/50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  設定は自動的に保存されます
                </p>
                <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
                  完了
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}