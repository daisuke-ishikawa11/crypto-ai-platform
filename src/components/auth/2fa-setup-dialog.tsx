// 🔐 Two-Factor Authentication Setup Dialog
// Comprehensive 2FA setup UI with TOTP, SMS, and Email options

'use client';

import * as React from "react"
import { useCallback, useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
// import { Separator } from '@/components/ui/separator';
import { Smartphone, Mail, Key, Shield, Copy, Download, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { logger } from '@/lib/monitoring/logger';

// WebGLフィンガープリント取得ユーティリティ（コンポーネント外に定義して依存安定化）
interface WebGLDebugRendererInfo {
  UNMASKED_VENDOR_WEBGL: number;
  UNMASKED_RENDERER_WEBGL: number;
}

function getWebGLFingerprint(): string {
  try {
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return '';
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info') as WebGLDebugRendererInfo | null;
    if (!debugInfo) return '';
    const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) as string;
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string;
    return `${vendor}~${renderer}`;
  } catch {
    return '';
  }
}

export interface TwoFASetupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  existingMethods?: string[];
}

type SetupMethod = 'totp' | 'sms' | 'email';
type SetupStep = 'select' | 'configure' | 'verify' | 'complete';

type NavigatorWithDeviceMemory = Navigator & { deviceMemory?: number };

interface SetupState {
  method: SetupMethod | null;
  step: SetupStep;
  sessionId: string | null;
  qrCode?: string;
  secret?: string;
  backupCodes?: string[];
  maskedDestination?: string;
  expiresAt?: Date;
  loading: boolean;
  error: string | null;
  verificationCode: string;
  destination: string; // For SMS/Email
  trustDevice: boolean;
}

export function TwoFASetupDialog({ 
  isOpen, 
  onClose, 
  onSuccess,
  existingMethods = []
}: TwoFASetupDialogProps) {
  const { toast } = useToast();
  const [state, setState] = useState<SetupState>({
    method: null,
    step: 'select',
    sessionId: null,
    loading: false,
    error: null,
    verificationCode: '',
    destination: '',
    trustDevice: false
  });

  const updateState = useCallback((updates: Partial<SetupState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const resetState = useCallback(() => {
    setState({
      method: null,
      step: 'select',
      sessionId: null,
      loading: false,
      error: null,
      verificationCode: '',
      destination: '',
      trustDevice: false
    });
  }, []);

  const handleClose = useCallback(() => {
    resetState();
    onClose();
  }, [resetState, onClose]);

  const getWebGLFingerprintRef = useCallback((): string => getWebGLFingerprint(), []);

  // Start 2FA setup process
  const initiateSetup = useCallback(async (method: SetupMethod, destination?: string) => {
    updateState({ loading: true, error: null });

    try {
      // Get CSRF token
      const csrfResponse = await fetch('/api/csrf');
      const { token: csrfToken } = await csrfResponse.json();

      // Collect device fingerprint
      const deviceFingerprint = {
        userAgent: navigator.userAgent,
        screenResolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        platform: navigator.platform,
        hardwareConcurrency: navigator.hardwareConcurrency || 4,
        deviceMemory: (navigator as NavigatorWithDeviceMemory).deviceMemory,
        touchSupport: 'ontouchstart' in window,
        webGLFingerprint: getWebGLFingerprintRef()
      };

      const payload = {
        method,
        deviceFingerprint,
        ...(destination ? { destination } : {})
      };

      const response = await fetch('/api/auth/2fa/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Setup failed');
      }

      updateState({
        method,
        step: 'verify',
        sessionId: data.sessionId,
        qrCode: data.qrCode,
        secret: data.secret,
        backupCodes: data.backupCodes,
        maskedDestination: data.maskedDestination,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
        loading: false
      });

      toast({
        title: '2FA Setup Started',
        description: data.message || 'Please complete verification to enable 2FA',
      });

    } catch (error) {
      const message = error instanceof Error ? error.message : 'Setup failed';
      updateState({ error: message, loading: false });
      
      toast({
        variant: 'destructive',
        title: 'Setup Failed',
        description: message,
      });

      logger.error('2FA setup failed', { method, error: message });
    }
  }, [updateState, toast, getWebGLFingerprintRef]);

  // Verify 2FA code
  const verifyCode = useCallback(async () => {
    if (!state.method || !state.sessionId) return;

    updateState({ loading: true, error: null });

    try {
      // Get CSRF token
      const csrfResponse = await fetch('/api/csrf');
      const { token: csrfToken } = await csrfResponse.json();

      const deviceFingerprint = {
        userAgent: navigator.userAgent,
        screenResolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        platform: navigator.platform,
        hardwareConcurrency: navigator.hardwareConcurrency || 4,
        deviceMemory: (navigator as NavigatorWithDeviceMemory).deviceMemory,
        touchSupport: 'ontouchstart' in window,
        webGLFingerprint: getWebGLFingerprintRef()
      };

      const verifyPayload = {
        method: state.method,
        sessionId: state.sessionId,
        trustDevice: state.trustDevice,
        deviceFingerprint,
        ...(state.method === 'totp'
          ? { token: state.verificationCode }
          : { code: state.verificationCode })
      };

      const response = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify(verifyPayload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Verification failed');
      }

      if (data.success) {
        updateState({ 
          step: 'complete', 
          loading: false,
          error: null 
        });

        toast({
          title: '2FA Enabled Successfully',
          description: `${state.method?.toUpperCase()} authentication is now active`,
        });

        onSuccess?.();
      } else {
        updateState({ 
          error: data.message || 'Invalid verification code',
          loading: false 
        });
      }

    } catch (error) {
      const message = error instanceof Error ? error.message : 'Verification failed';
      updateState({ error: message, loading: false });
      
      toast({
        variant: 'destructive',
        title: 'Verification Failed',
        description: message,
      });
    }
  }, [state.method, state.sessionId, state.verificationCode, state.trustDevice, updateState, toast, onSuccess, getWebGLFingerprintRef]);

  // Copy backup codes to clipboard
  const copyBackupCodes = useCallback(async () => {
    if (!state.backupCodes) return;

    try {
      const codesText = state.backupCodes.join('\n');
      await navigator.clipboard.writeText(codesText);
      
      toast({
        title: 'Backup Codes Copied',
        description: 'Backup codes have been copied to your clipboard',
      });
    } catch {
      toast({
        variant: 'destructive',
        title: 'Copy Failed',
        description: 'Failed to copy backup codes',
      });
    }
  }, [state.backupCodes, toast]);

  // Download backup codes as file
  const downloadBackupCodes = useCallback(() => {
    if (!state.backupCodes) return;

    const codesText = [
      'Crypto AI Platform - Two Factor Authentication Backup Codes',
      '==========================================================',
      '',
      'IMPORTANT: Keep these codes secure and accessible.',
      'Each code can only be used once for account recovery.',
      '',
      'Backup Codes:',
      ...state.backupCodes.map((code, index) => `${index + 1}. ${code}`)
    ].join('\n');

    const blob = new Blob([codesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `crypto-ai-platform-backup-codes-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: 'Backup Codes Downloaded',
      description: 'Store the file in a secure location',
    });
  }, [state.backupCodes, toast]);

  // getWebGLFingerprint は上部で定義済み

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Enable Two-Factor Authentication
          </DialogTitle>
          <DialogDescription>
            Add an extra layer of security to protect your account
          </DialogDescription>
        </DialogHeader>

        {state.step === 'select' && (
          <div className="space-y-6">
            <Tabs defaultValue="totp" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="totp" disabled={existingMethods.includes('totp')}>
                  <Key className="h-4 w-4 mr-2" />
                  Authenticator
                </TabsTrigger>
                <TabsTrigger value="sms" disabled={existingMethods.includes('sms')}>
                  <Smartphone className="h-4 w-4 mr-2" />
                  SMS
                </TabsTrigger>
                <TabsTrigger value="email" disabled={existingMethods.includes('email')}>
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </TabsTrigger>
              </TabsList>

              <TabsContent value="totp" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Authenticator App</CardTitle>
                    <CardDescription>
                      Use apps like Google Authenticator, Authy, or 1Password
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {existingMethods.includes('totp') ? (
                      <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                          TOTP authentication is already enabled for your account.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <Button 
                        onClick={() => initiateSetup('totp')}
                        disabled={state.loading}
                        className="w-full"
                      >
                        {state.loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                        Setup Authenticator App
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sms" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">SMS Verification</CardTitle>
                    <CardDescription>
                      Receive verification codes via text message
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {existingMethods.includes('sms') ? (
                      <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                          SMS authentication is already enabled for your account.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            value={state.destination}
                            onChange={(e) => updateState({ destination: e.target.value })}
                          />
                        </div>
                        <Button 
                          onClick={() => initiateSetup('sms', state.destination)}
                          disabled={state.loading || !state.destination.trim()}
                          className="w-full"
                        >
                          {state.loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                          Setup SMS Verification
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="email" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Email Verification</CardTitle>
                    <CardDescription>
                      Receive verification codes via email
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {existingMethods.includes('email') ? (
                      <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                          Email authentication is already enabled for your account.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <>
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={state.destination}
                            onChange={(e) => updateState({ destination: e.target.value })}
                          />
                        </div>
                        <Button 
                          onClick={() => initiateSetup('email', state.destination)}
                          disabled={state.loading || !state.destination.trim()}
                          className="w-full"
                        >
                          {state.loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                          Setup Email Verification
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {state.error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {state.step === 'verify' && state.method && (
          <div className="space-y-6">
            {state.method === 'totp' && state.qrCode && (
              <Card>
                <CardHeader>
                  <CardTitle>Scan QR Code</CardTitle>
                  <CardDescription>
                    Open your authenticator app and scan this QR code
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <Image
                      src={state.qrCode}
                      alt="2FA QR Code"
                      width={200}
                      height={200}
                      className="border rounded-lg"
                      unoptimized
                    />
                  </div>
                  
                  {state.secret && (
                    <div className="space-y-2">
                      <Label>Manual Entry Key</Label>
                      <div className="flex gap-2">
                        <Input 
                          value={state.secret} 
                          readOnly 
                          className="font-mono text-sm"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => navigator.clipboard.writeText(state.secret!)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {(state.method === 'sms' || state.method === 'email') && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Verification code sent to {state.maskedDestination}
                </AlertDescription>
              </Alert>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Enter Verification Code</CardTitle>
                <CardDescription>
                  {state.method === 'totp' 
                    ? 'Enter the 6-digit code from your authenticator app'
                    : `Enter the 6-digit code sent to ${state.maskedDestination}`
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="code">Verification Code</Label>
                  <Input
                    id="code"
                    name="otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="\\d{6}"
                    placeholder="000000"
                    value={state.verificationCode}
                    onChange={(e) => updateState({ verificationCode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                    onPaste={(e) => { const t = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, 6); if (t) { e.preventDefault(); updateState({ verificationCode: t }); } }}
                    onKeyDown={(e) => { const k = e.key; const allowed = ['Backspace','Tab','ArrowLeft','ArrowRight','Delete','Home','End']; if (allowed.includes(k)) return; if (!/^[0-9]$/.test(k)) { e.preventDefault(); } }}
                    aria-invalid={state.verificationCode.length !== 6}
                    aria-describedby="codeHelp"
                    spellCheck={false}
                    className="text-center text-2xl font-mono tracking-wider"
                    maxLength={6}
                  />
                  <p id="codeHelp" className="text-xs text-muted-foreground mt-1">Enter the 6-digit code</p>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="trustDevice"
                    aria-label="Trust this device for 30 days"
                    checked={state.trustDevice}
                    onChange={(e) => updateState({ trustDevice: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="trustDevice" className="text-sm">
                    Trust this device for 30 days
                  </Label>
                </div>

                <Button 
                  onClick={verifyCode}
                  disabled={state.loading || state.verificationCode.length !== 6}
                  className="w-full"
                >
                  {state.loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Verify & Enable 2FA
                </Button>
              </CardContent>
            </Card>

            {state.error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {state.step === 'complete' && (
          <div className="space-y-6">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Two-factor authentication has been successfully enabled!
              </AlertDescription>
            </Alert>

            {state.backupCodes && state.backupCodes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Backup Codes
                    <Badge variant="secondary">Important</Badge>
                  </CardTitle>
                  <CardDescription>
                    Save these codes in a secure location. Each can only be used once.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 p-4 bg-muted rounded-lg font-mono text-sm">
                    {state.backupCodes.map((code, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span>{code}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={copyBackupCodes} className="flex-1">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Codes
                    </Button>
                    <Button variant="outline" onClick={downloadBackupCodes} className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-end">
              <Button onClick={handleClose}>
                Complete Setup
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
