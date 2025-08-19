'use client';

import * as React from "react"
import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Smartphone, 
  Mail, 
  Key, 
  Copy, 
  CheckCircle, 
  AlertCircle,
  Download,
  QrCode,
  Phone,
  RefreshCw
} from 'lucide-react';
import { twoFactorAuthManager } from '@/lib/auth/two-factor-auth';
import { useErrorHandler } from '@/lib/errors/error-handler';
import { useMemoryOptimizer } from '@/lib/optimization/memory-optimizer';

interface TwoFactorSetupProps {
  userId: string;
  userEmail: string;
  onSetupComplete?: (method: string) => void;
}

interface TOTPSetup {
  secret: string;
  qrCodeUrl: string;
  manualEntryKey: string;
  backupCodes: string[];
}

interface TwoFactorMethod {
  id: string;
  type: 'totp' | 'sms' | 'email';
  enabled: boolean;
  verified: boolean;
  createdAt: Date;
  lastUsedAt?: Date;
}

export function TwoFactorSetup({ userId, userEmail, onSetupComplete }: TwoFactorSetupProps) {
  const [methods, setMethods] = useState<TwoFactorMethod[]>([]);
  const [totpSetup, setTotpSetup] = useState<TOTPSetup | null>(null);
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [activeTab, setActiveTab] = useState('totp');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  
  const { handleError } = useErrorHandler();
  const memoryOptimizer = useMemoryOptimizer();

  // メモ化された計算
  const hasEnabledMethods = useMemo(() => 
    methods.some(method => method.enabled), 
    [methods]
  );

  const totpMethod = useMemo(() => 
    methods.find(method => method.type === 'totp'), 
    [methods]
  );

  const smsMethod = useMemo(() => 
    methods.find(method => method.type === 'sms'), 
    [methods]
  );

  const emailMethod = useMemo(() => 
    methods.find(method => method.type === 'email'), 
    [methods]
  );

  // 既存の2FA設定を取得
  const fetchTwoFactorMethods = useCallback(async () => {
    try {
      const userMethods = await twoFactorAuthManager.getUserTwoFactorMethods(userId);
      setMethods(userMethods as TwoFactorMethod[]);
    } catch (error) {
      await handleError(error instanceof Error ? error : new Error('Failed to fetch 2FA methods'));
      setError('2FA設定の取得に失敗しました');
    }
  }, [userId, handleError]);

  // TOTP設定の生成
  const generateTOTPSetup = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const setup = await twoFactorAuthManager.generateTOTPSecret(userId, userEmail);
      setTotpSetup(setup);
      setSuccess('TOTP認証の設定が生成されました');
      
      // メモリ最適化（存在する場合のみ）
      if (memoryOptimizer && typeof memoryOptimizer === 'object' && 'performCleanup' in memoryOptimizer) {
        const optimizer = memoryOptimizer as Record<string, unknown> & { performCleanup: () => void };
        if (typeof optimizer.performCleanup === 'function') {
          optimizer.performCleanup();
        }
      }
    } catch (error) {
      await handleError(error instanceof Error ? error : new Error('TOTP setup failed'));
      setError('TOTP設定の生成に失敗しました');
    } finally {
      setLoading(false);
    }
  }, [userId, userEmail, handleError, memoryOptimizer]);

  // TOTP検証
  const verifyTOTP = useCallback(async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setError('6桁の認証コードを入力してください');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await twoFactorAuthManager.verifyTOTP(userId, verificationCode);
      
      if (result.isValid) {
        setSuccess('TOTP認証の設定が完了しました！');
        await fetchTwoFactorMethods();
        setVerificationCode('');
        onSetupComplete?.('totp');
      } else {
        setError('認証コードが正しくありません');
      }
    } catch (error) {
      await handleError(error instanceof Error ? error : new Error('TOTP verification failed'));
      setError('TOTP認証の確認に失敗しました');
    } finally {
      setLoading(false);
    }
  }, [userId, verificationCode, handleError, fetchTwoFactorMethods, onSetupComplete]);

  // SMS設定
  const setupSMS = useCallback(async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setError('有効な電話番号を入力してください');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await twoFactorAuthManager.sendTwoFactorCode(userId, 'sms', phoneNumber);
      setSuccess('認証コードをSMSで送信しました');
    } catch (error) {
      await handleError(error instanceof Error ? error : new Error('SMS setup failed'));
      setError('SMS認証の設定に失敗しました');
    } finally {
      setLoading(false);
    }
  }, [userId, phoneNumber, handleError]);

  // Email設定
  const setupEmail = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await twoFactorAuthManager.sendTwoFactorCode(userId, 'email', userEmail);
      setSuccess('認証コードをメールで送信しました');
    } catch (error) {
      await handleError(error instanceof Error ? error : new Error('Email setup failed'));
      setError('Email認証の設定に失敗しました');
    } finally {
      setLoading(false);
    }
  }, [userId, userEmail, handleError]);

  // 2FA方法の無効化
  const disableMethod = useCallback(async (methodType: string) => {
    setLoading(true);
    setError(null);

    try {
      await twoFactorAuthManager.disableTwoFactorMethod(userId, methodType);
      setSuccess(`${methodType.toUpperCase()}認証を無効化しました`);
      await fetchTwoFactorMethods();
    } catch (error) {
      await handleError(error instanceof Error ? error : new Error('Disable method failed'));
      setError('認証方法の無効化に失敗しました');
    } finally {
      setLoading(false);
    }
  }, [userId, handleError, fetchTwoFactorMethods]);

  // バックアップコードの再生成
  const regenerateBackupCodes = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const newCodes = await twoFactorAuthManager.regenerateBackupCodes(userId);
      setTotpSetup(prev => prev ? { ...prev, backupCodes: newCodes } : null);
      setSuccess('バックアップコードを再生成しました');
      setShowBackupCodes(true);
    } catch (error) {
      await handleError(error instanceof Error ? error : new Error('Backup codes regeneration failed'));
      setError('バックアップコードの再生成に失敗しました');
    } finally {
      setLoading(false);
    }
  }, [userId, handleError]);

  // バックアップコードをクリップボードにコピー
  const copyBackupCodes = useCallback(async () => {
    if (!totpSetup?.backupCodes) return;

    try {
      await navigator.clipboard.writeText(totpSetup.backupCodes.join('\n'));
      setSuccess('バックアップコードをクリップボードにコピーしました');
    } catch (error) {
      setError('クリップボードへのコピーに失敗しました');
    }
  }, [totpSetup?.backupCodes]);

  // 初期データ取得
  useEffect(() => {
    fetchTwoFactorMethods();
  }, [fetchTwoFactorMethods]);

  // エラー・成功メッセージの自動クリア
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  return (
    <div className="space-y-6">
      {/* ステータス表示 */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* 現在の設定状況 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            二要素認証の状況
          </CardTitle>
          <CardDescription>
            アカウントのセキュリティを強化するために、複数の認証方法を設定できます
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {methods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {method.type === 'totp' && <Smartphone className="w-5 h-5" />}
                  {method.type === 'sms' && <Phone className="w-5 h-5" />}
                  {method.type === 'email' && <Mail className="w-5 h-5" />}
                  
                  <div>
                    <div className="font-medium">
                      {method.type === 'totp' && 'アプリ認証 (TOTP)'}
                      {method.type === 'sms' && 'SMS認証'}
                      {method.type === 'email' && 'Email認証'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {method.lastUsedAt 
                        ? `最終使用: ${method.lastUsedAt.toLocaleDateString()}`
                        : '未使用'
                      }
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant={method.enabled ? "default" : "secondary"}>
                    {method.enabled ? '有効' : '無効'}
                  </Badge>
                  
                  {method.verified && (
                    <Badge variant="outline">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      認証済み
                    </Badge>
                  )}
                  
                  {method.enabled && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => disableMethod(method.type)}
                      disabled={loading}
                    >
                      無効化
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 新しい認証方法の設定 */}
      <Card>
        <CardHeader>
          <CardTitle>新しい認証方法を追加</CardTitle>
          <CardDescription>
            追加のセキュリティ層として、別の認証方法を設定できます
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="totp" disabled={totpMethod?.enabled}>
                <Smartphone className="w-4 h-4 mr-2" />
                アプリ認証
              </TabsTrigger>
              <TabsTrigger value="sms" disabled={smsMethod?.enabled}>
                <Phone className="w-4 h-4 mr-2" />
                SMS認証
              </TabsTrigger>
              <TabsTrigger value="email" disabled={emailMethod?.enabled}>
                <Mail className="w-4 h-4 mr-2" />
                Email認証
              </TabsTrigger>
            </TabsList>

            {/* TOTP設定 */}
            <TabsContent value="totp" className="space-y-4">
              <div className="text-sm text-gray-600">
                Google AuthenticatorやAuthyなどのTOTPアプリを使用した認証方法です。
              </div>
              
              {!totpSetup ? (
                <Button onClick={generateTOTPSetup} disabled={loading}>
                  <QrCode className="w-4 h-4 mr-2" />
                  TOTP設定を開始
                </Button>
              ) : (
                <div className="space-y-4">
                  {/* QRコード */}
                  <div className="text-center">
                    <Image 
                      src={totpSetup.qrCodeUrl} 
                      alt="TOTP QR Code" 
                      width={256}
                      height={256}
                      className="mx-auto border rounded-lg"
                      unoptimized
                    />
                    <p className="mt-2 text-sm text-gray-600">
                      認証アプリでQRコードをスキャンしてください
                    </p>
                  </div>

                  {/* 手動入力用キー */}
                  <div>
                    <Label>手動入力用キー</Label>
                    <div className="flex gap-2 mt-1">
                      <Input 
                        value={totpSetup.manualEntryKey} 
                        readOnly 
                        className="font-mono"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigator.clipboard.writeText(totpSetup.manualEntryKey)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* 認証コード確認 */}
                  <div>
                    <Label>認証アプリに表示される6桁のコードを入力</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="000000"
                        maxLength={6}
                        className="font-mono text-center text-lg"
                      />
                      <Button onClick={verifyTOTP} disabled={loading || verificationCode.length !== 6}>
                        確認
                      </Button>
                    </div>
                  </div>

                  {/* バックアップコード */}
                  {totpSetup.backupCodes.length > 0 && (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">バックアップコード</h4>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={copyBackupCodes}
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            コピー
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowBackupCodes(!showBackupCodes)}
                          >
                            {showBackupCodes ? '隠す' : '表示'}
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-yellow-800 mb-3">
                        デバイスを紛失した場合のために、これらのコードを安全な場所に保存してください。
                      </p>
                      
                      {showBackupCodes && (
                        <div className="grid grid-cols-2 gap-1 font-mono text-sm">
                          {totpSetup.backupCodes.map((code, index) => (
                            <div key={index} className="p-2 bg-white border rounded">
                              {code}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            {/* SMS設定 */}
            <TabsContent value="sms" className="space-y-4">
              <div className="text-sm text-gray-600">
                携帯電話のSMSに送信される認証コードを使用した認証方法です。
              </div>
              
              <div>
                <Label>電話番号</Label>
                <Input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+81 90-1234-5678"
                  type="tel"
                />
              </div>
              
              <Button onClick={setupSMS} disabled={loading || !phoneNumber}>
                <Phone className="w-4 h-4 mr-2" />
                SMS認証を設定
              </Button>
            </TabsContent>

            {/* Email設定 */}
            <TabsContent value="email" className="space-y-4">
              <div className="text-sm text-gray-600">
                登録されたメールアドレスに送信される認証コードを使用した認証方法です。
              </div>
              
              <div>
                <Label>メールアドレス</Label>
                <Input value={userEmail} readOnly className="bg-gray-50" />
              </div>
              
              <Button onClick={setupEmail} disabled={loading}>
                <Mail className="w-4 h-4 mr-2" />
                Email認証を設定
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* バックアップコード管理 */}
      {hasEnabledMethods && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              バックアップコード管理
            </CardTitle>
            <CardDescription>
              デバイスにアクセスできない場合のための復旧コードを管理できます
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button variant="outline" onClick={regenerateBackupCodes} disabled={loading}>
                <RefreshCw className="w-4 h-4 mr-2" />
                新しいコードを生成
              </Button>
              
              {totpSetup?.backupCodes && (
                <Button variant="outline" onClick={copyBackupCodes}>
                  <Download className="w-4 h-4 mr-2" />
                  コードをダウンロード
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
