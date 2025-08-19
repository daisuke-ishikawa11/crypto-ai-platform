// 🔐 Two-Factor Authentication Management Component
// Manage existing 2FA methods and settings

'use client';

import * as React from "react"
import { useCallback, useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  Smartphone, 
  Mail, 
  Key, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Trash2,
  Plus,
  Settings,
  Download,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { TwoFASetupDialog } from './2fa-setup-dialog';

interface TwoFAMethod {
  id: string;
  type: 'totp' | 'sms' | 'email';
  enabled: boolean;
  verified: boolean;
  primary: boolean;
  lastUsed?: string;
  destination?: string; // Masked phone/email
  createdAt: string;
}

interface TwoFAStatus {
  isEnabled: boolean;
  methods: TwoFAMethod[];
  backupCodesCount: number;
  trustedDevicesCount: number;
  lastActivity?: string;
}

export function TwoFAManagement() {
  const { toast } = useToast();
  const [status, setStatus] = useState<TwoFAStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [setupDialogOpen, setSetupDialogOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/2fa/status');
      
      if (!response.ok) {
        throw new Error('Failed to fetch 2FA status');
      }

      const data = await response.json();
      setStatus(data);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to Load 2FA Status',
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  const handleDisableMethod = useCallback(async (methodId: string, methodType: string) => {
    setActionLoading(methodId);

    try {
      const response = await fetch('/api/auth/2fa/disable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ methodId }),
      });

      if (!response.ok) {
        throw new Error('Failed to disable 2FA method');
      }

      toast({
        title: '2FA Method Disabled',
        description: `${methodType.toUpperCase()} authentication has been disabled`,
      });

      await fetchStatus(); // Refresh status
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Disable Failed',
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setActionLoading(null);
    }
  }, [toast, fetchStatus]);

  const handleRegenerateBackupCodes = useCallback(async () => {
    setActionLoading('backup-codes');

    try {
      const response = await fetch('/api/auth/2fa/backup-codes/regenerate', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to regenerate backup codes');
      }

      const { backupCodes } = await response.json();

      // Download new backup codes
      const codesText = [
        'Crypto AI Platform - New Backup Codes',
        '====================================',
        '',
        'IMPORTANT: Your old backup codes are now invalid.',
        'Save these new codes in a secure location.',
        '',
        'Backup Codes:',
        ...backupCodes.map((code: string, index: number) => `${index + 1}. ${code}`)
      ].join('\n');

      const blob = new Blob([codesText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `crypto-ai-platform-new-backup-codes-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: 'Backup Codes Regenerated',
        description: 'New backup codes have been downloaded. Old codes are now invalid.',
      });

      await fetchStatus(); // Refresh status
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Regeneration Failed',
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setActionLoading(null);
    }
  }, [toast, fetchStatus]);

  const getMethodIcon = (type: string) => {
    switch (type) {
      case 'totp': return Key;
      case 'sms': return Smartphone;
      case 'email': return Mail;
      default: return Shield;
    }
  };

  const getMethodName = (type: string) => {
    switch (type) {
      case 'totp': return 'Authenticator App';
      case 'sms': return 'SMS';
      case 'email': return 'Email';
      default: return 'Unknown';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading 2FA settings...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!status) {
    return (
      <Card>
        <CardContent className="p-6">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Failed to load 2FA settings. Please refresh the page and try again.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Two-Factor Authentication
            {status.isEnabled ? (
              <Badge variant="default" className="bg-green-500">
                <CheckCircle className="h-3 w-3 mr-1" />
                Enabled
              </Badge>
            ) : (
              <Badge variant="destructive">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Disabled
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            {status.isEnabled
              ? 'Your account is protected with two-factor authentication'
              : 'Enable 2FA to add an extra layer of security to your account'
            }
          </CardDescription>
        </CardHeader>

        {!status.isEnabled && (
          <CardContent>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="mb-4">
                Your account is not protected with two-factor authentication. 
                We strongly recommend enabling 2FA to secure your account.
              </AlertDescription>
            </Alert>
            
            <Button onClick={() => setSetupDialogOpen(true)} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Enable Two-Factor Authentication
            </Button>
          </CardContent>
        )}
      </Card>

      {status.isEnabled && (
        <>
          {/* Active Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Active Methods</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSetupDialogOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Method
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {status.methods.length === 0 ? (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    No 2FA methods are configured. Add at least one method to secure your account.
                  </AlertDescription>
                </Alert>
              ) : (
                status.methods.map((method) => {
                  const IconComponent = getMethodIcon(method.type);
                  const isActionLoading = actionLoading === method.id;

                  return (
                    <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <IconComponent className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{getMethodName(method.type)}</span>
                            {method.primary && (
                              <Badge variant="outline" className="text-xs">
                                Primary
                              </Badge>
                            )}
                            {method.verified ? (
                              <Badge variant="default" className="bg-green-500 text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            ) : (
                              <Badge variant="destructive" className="text-xs">
                                Unverified
                              </Badge>
                            )}
                          </div>
                          {method.destination && (
                            <p className="text-sm text-muted-foreground">
                              {method.destination}
                            </p>
                          )}
                          {method.lastUsed && (
                            <p className="text-xs text-muted-foreground">
                              Last used: {new Date(method.lastUsed).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDisableMethod(method.id, method.type)}
                        disabled={isActionLoading}
                      >
                        {isActionLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>

          {/* Backup Codes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Backup Codes
              </CardTitle>
              <CardDescription>
                Emergency codes for account recovery when you can&apos;t use your primary 2FA method
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">
                    {status.backupCodesCount} backup codes available
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Each code can only be used once
                  </p>
                </div>
                
                <Button
                  variant="outline"
                  onClick={handleRegenerateBackupCodes}
                  disabled={actionLoading === 'backup-codes'}
                >
                  {actionLoading === 'backup-codes' ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4 mr-2" />
                  )}
                  Regenerate Codes
                </Button>
              </div>

              {status.backupCodesCount <= 2 && (
                <Alert className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    You&apos;re running low on backup codes. Consider regenerating them soon.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Trusted Devices */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Trusted Devices</p>
                  <p className="text-xs text-muted-foreground">
                    {status.trustedDevicesCount} devices trusted
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Manage Devices
                </Button>
              </div>
              
              <Separator />
              
              {status.lastActivity && (
                <div>
                  <p className="text-sm font-medium">Last Activity</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(status.lastActivity).toLocaleString()}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* Setup Dialog */}
      <TwoFASetupDialog
        isOpen={setupDialogOpen}
        onClose={() => setSetupDialogOpen(false)}
        onSuccess={() => {
          setSetupDialogOpen(false);
          fetchStatus(); // Refresh status after successful setup
        }}
        existingMethods={status.methods.map(m => m.type)}
      />
    </div>
  );
}