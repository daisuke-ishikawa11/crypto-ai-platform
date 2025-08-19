// 🔐 Two-Factor Authentication Setup Component
// Secure UI for setting up 2FA with multiple methods

'use client';

import * as React from "react"
import { useCallback, useState } from 'react'
import { QrCode, Smartphone, Mail, Key, Shield, AlertCircle, Check, Copy, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image'
import { z } from 'zod';
import { apiFetch } from '@/lib/api/fetcher';




interface TwoFactorSetupProps {
  onComplete?: () => void;
  onCancel?: () => void;
}

interface SetupResponse {
  success: boolean;
  method: string;
  sessionId: string;
  qrCode?: string;
  secret?: string;
  backupCodes?: string[];
  maskedDestination?: string;
  message: string;
}

interface DeviceFingerprint {
  userAgent: string;
  screenResolution: string;
  timezone: string;
  language: string;
  platform: string;
  hardwareConcurrency: number;
  deviceMemory?: number;
  touchSupport: boolean;
  webGLFingerprint?: string;
}

const TwoFactorSetup: React.FC<TwoFactorSetupProps> = ({ onComplete, onCancel }) => {
  const [selectedMethod, setSelectedMethod] = useState<'totp' | 'sms' | 'email'>('totp');
  const [setupStep, setSetupStep] = useState<'select' | 'setup' | 'verify' | 'complete'>('select');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [setupData, setSetupData] = useState<SetupResponse | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [backupCodesSaved, setBackupCodesSaved] = useState(false);
  const [trustDevice, setTrustDevice] = useState(true);
  const { toast } = useToast();

  // Generate device fingerprint
  const getDeviceFingerprint = useCallback((): DeviceFingerprint => {
      const nav = navigator as Navigator & { hardwareConcurrency?: number; deviceMemory?: number };
      return {
        userAgent: nav.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: nav.language,
        platform: nav.platform,
        hardwareConcurrency: typeof nav.hardwareConcurrency === 'number' ? nav.hardwareConcurrency : 4,
        deviceMemory: nav.deviceMemory,
        touchSupport: 'ontouchstart' in window,
        webGLFingerprint: getWebGLFingerprint()
      };
  }, []);

  // Get WebGL fingerprint for additional security
  const getWebGLFingerprint = (): string => {
    try {
      const canvas = document.createElement('canvas');
      const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
      if (!gl) return 'unavailable';
      
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info') as { UNMASKED_VENDOR_WEBGL: number; UNMASKED_RENDERER_WEBGL: number } | null;
      if (!debugInfo) return 'unavailable';
      
      const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) as string;
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string;
      
      return `${vendor}::${renderer}`;
    } catch {
      return 'unavailable';
    }
  };

  // Input validation schemas
  const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format');
  const emailSchema = z.string().email('Invalid email format');
  const codeSchema = z.string().regex(/^\d{6}$/, 'Code must be 6 digits');
  const totpSchema = z.string().regex(/^\d{6,8}$/, 'Code must be 6-8 digits');

  // Setup 2FA method
  const handleSetup = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate input based on method
      if (selectedMethod === 'sms') {
        const result = phoneSchema.safeParse(phoneNumber);
        if (!result.success) {
          setError('Please enter a valid phone number');
          setIsLoading(false);
          return;
        }
      } else if (selectedMethod === 'email') {
        const result = emailSchema.safeParse(email);
        if (!result.success) {
          setError('Please enter a valid email address');
          setIsLoading(false);
          return;
        }
      }

      const requestBody = {
        method: selectedMethod,
        destination: selectedMethod === 'sms' ? phoneNumber : selectedMethod === 'email' ? email : undefined,
        deviceFingerprint: getDeviceFingerprint()
      };

            const response = await apiFetch('/api/auth/2fa/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: requestBody,
      });



      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Setup failed');
      }

      setSetupData(data);
      setSetupStep('setup');

      toast({
        title: 'Setup Initiated',
        description: data.message || 'Please follow the instructions to complete setup.'
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Setup failed. Please try again.');
      toast({
        title: 'Setup Failed',
        description: err instanceof Error ? err.message : 'An error occurred',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Verify 2FA code
  const handleVerify = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate verification code
      const schema = selectedMethod === 'totp' ? totpSchema : codeSchema;
      const result = schema.safeParse(verificationCode);
      
      if (!result.success) {
        setError(`Invalid code format for ${selectedMethod.toUpperCase()}`);
        setIsLoading(false);
        return;
      }

      const requestBody = {
        method: selectedMethod,
        [selectedMethod === 'totp' ? 'token' : 'code']: verificationCode,
        sessionId: setupData?.sessionId,
        trustDevice,
        deviceFingerprint: getDeviceFingerprint()
      };

            const response = await apiFetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: requestBody,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Verification failed');
      }

      setSetupStep('complete');
      
      toast({
        title: '2FA Enabled Successfully',
        description: `${selectedMethod.toUpperCase()} authentication has been enabled for your account.`
      });

      // Call completion callback after a short delay
      setTimeout(() => {
        onComplete?.();
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed. Please try again.');
      toast({
        title: 'Verification Failed',
        description: err instanceof Error ? err.message : 'Invalid code',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Copy text to clipboard
  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Copied',
        description: `${label} copied to clipboard`
      });
    } catch {
      toast({
        title: 'Copy Failed',
        description: 'Please copy manually',
        variant: 'destructive'
      });
    }
  };

  // Download backup codes
  const downloadBackupCodes = () => {
    if (!setupData?.backupCodes) return;

    const content = `Crypto AI Platform - Backup Codes
Generated: ${new Date().toISOString()}

IMPORTANT: Store these codes in a safe place. Each code can only be used once.

${setupData.backupCodes.map((code, i) => `${i + 1}. ${code}`).join('\n')}

Keep these codes secure and do not share them with anyone.`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'crypto-ai-platform-backup-codes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setBackupCodesSaved(true);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-green-600" />
          Two-Factor Authentication Setup
        </CardTitle>
        <CardDescription>
          Add an extra layer of security to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <AnimatePresence mode="wait">
          {setupStep === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Tabs value={selectedMethod} onValueChange={(v) => setSelectedMethod(v as 'totp' | 'sms' | 'email')}>
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="totp">
                    <QrCode className="h-4 w-4 mr-2" />
                    Authenticator
                  </TabsTrigger>
                  <TabsTrigger value="sms">
                    <Smartphone className="h-4 w-4 mr-2" />
                    SMS
                  </TabsTrigger>
                  <TabsTrigger value="email">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="totp" className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Use an authenticator app like Google Authenticator, Authy, or 1Password.
                      This is the most secure method.
                    </AlertDescription>
                  </Alert>
                  <div className="text-sm text-muted-foreground">
                    <p>Benefits:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Works offline</li>
                      <li>Most secure option</li>
                      <li>No phone number required</li>
                      <li>Instant verification</li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="sms" className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Receive verification codes via SMS. Less secure than authenticator apps.
                    </AlertDescription>
                  </Alert>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1234567890"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Include country code (e.g., +1 for US)
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="email" className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Receive verification codes via email. Convenient but less secure.
                    </AlertDescription>
                  </Alert>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      We&apos;ll send verification codes to this email
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={handleSetup}
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? 'Setting up...' : 'Continue Setup'}
                </Button>
                <Button
                  variant="outline"
                  onClick={onCancel}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}

          {setupStep === 'setup' && setupData && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {selectedMethod === 'totp' && setupData.qrCode && (
                <>
                  <div className="text-center space-y-4">
                    <h3 className="font-semibold">Scan QR Code</h3>
                    <div className="bg-white p-4 rounded-lg inline-block">
                      <Image src={setupData.qrCode} alt="2FA QR Code" width={256} height={256} unoptimized />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Scan this QR code with your authenticator app
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Manual Entry Key</Label>
                    <div className="flex gap-2">
                      <Input
                        value={setupData.secret || ''}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => copyToClipboard(setupData.secret || '', 'Secret key')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Can&apos;t scan? Enter this key manually in your app
                    </p>
                  </div>
                </>
              )}

              {(selectedMethod === 'sms' || selectedMethod === 'email') && (
                <Alert>
                  <Mail className="h-4 w-4" />
                  <AlertDescription>
                    Verification code sent to {setupData.maskedDestination}
                  </AlertDescription>
                </Alert>
              )}

              {setupData.backupCodes && (
                <div className="space-y-2">
                  <Label>Backup Codes</Label>
                  <Alert variant={backupCodesSaved ? 'default' : 'destructive'}>
                    <Key className="h-4 w-4" />
                    <AlertDescription>
                      Save these backup codes in a secure location. You can use them to access your account if you lose your 2FA device.
                    </AlertDescription>
                  </Alert>
                  <div className="grid grid-cols-2 gap-2 p-4 bg-muted rounded-lg">
                    {setupData.backupCodes.map((code, i) => (
                      <div key={i} className="font-mono text-sm">
                        {i + 1}. {code}
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={downloadBackupCodes}
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Backup Codes
                  </Button>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="verify">Enter Verification Code</Label>
                <Input
                  id="verify"
                  type="text"
                  placeholder={selectedMethod === 'totp' ? '000000' : '000000'}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                  maxLength={selectedMethod === 'totp' ? 8 : 6}
                  className="font-mono text-center text-2xl tracking-widest"
                />
                <p className="text-xs text-muted-foreground">
                  Enter the {selectedMethod === 'totp' ? 'code from your authenticator app' : 'code we sent you'}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                                  <input
                    type="checkbox"
                    id="trust"
                    aria-label="Trust this device for 30 days"
                    title="Trust this device for 30 days"
                    checked={trustDevice}
                    onChange={(e) => setTrustDevice(e.target.checked)}
                    className="rounded"
                  />

                <Label htmlFor="trust" className="text-sm">
                  Trust this device for 30 days
                </Label>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={handleVerify}
                  disabled={isLoading || !verificationCode || (setupData.backupCodes && !backupCodesSaved)}
                  className="flex-1"
                >
                  {isLoading ? 'Verifying...' : 'Verify & Enable 2FA'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSetupStep('select')}
                  disabled={isLoading}
                >
                  Back
                </Button>
              </div>
            </motion.div>
          )}

          {setupStep === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center space-y-4 py-8"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">2FA Enabled Successfully!</h3>
              <p className="text-muted-foreground">
                Your account is now protected with two-factor authentication.
              </p>
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  You&apos;ll be asked for a verification code each time you sign in from a new device.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default TwoFactorSetup;
