'use client';
export const dynamic = 'force-dynamic'

import * as React from "react"
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
// removed unused Alert components
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Shield, 
  User, 
  Key, 
  CreditCard, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Smartphone,
  Mail,
  LogOut,
  ExternalLink,
  Globe,
  BookOpen,
  TrendingUp,
  Wallet,
  BarChart
} from 'lucide-react';
import { toast } from 'sonner';

// ========================= Type Definitions =========================

interface UserProfile {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role: 'user' | 'premium' | 'admin';
  subscriptionStatus: 'active' | 'inactive' | 'trial' | 'cancelled';
  subscriptionTier: 'basic' | 'pro' | 'enterprise';
  createdAt: string;
  lastLogin: string;
}

interface AppAccess {
  id: string;
  name: string;
  icon: unknown;
  url: string;
  hasAccess: boolean;
  lastAccessed?: string;
  requiresSubscription: boolean;
  requiredRole: string;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  twoFactorMethods: Array<{
    type: 'totp' | 'sms' | 'email';
    enabled: boolean;
    verified: boolean;
    lastUsed?: string;
  }>;
  trustedDevices: Array<{
    id: string;
    name: string;
    lastUsed: string;
    current: boolean;
  }>;
  sessions: Array<{
    id: string;
    device: string;
    location: string;
    lastActive: string;
    current: boolean;
  }>;
}

interface AuditLog {
  id: string;
  action: string;
  timestamp: string;
  ipAddress: string;
  result: 'success' | 'failure';
  appId?: string;
  metadata?: Record<string, unknown>;
}

// ========================= Unified User Dashboard Component =========================

export default function UnifiedUserDashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [_appAccess, setAppAccess] = useState<AppAccess[]>([]);
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  // App configurations
  const apps: AppAccess[] = [
    {
      id: 'cryptolearn-pro',
      name: 'CryptoLearn Pro',
      icon: BookOpen,
      url: 'https://learn.crypto-ai-platform.com',
      hasAccess: true,
      requiresSubscription: false,
      requiredRole: 'user'
    },
    {
      id: 'cryptotrader-ai',
      name: 'CryptoTrader AI',
      icon: TrendingUp,
      url: 'https://trade.crypto-ai-platform.com',
      hasAccess: false,
      requiresSubscription: true,
      requiredRole: 'user'
    },
    {
      id: 'defi-navigator',
      name: 'DeFi Navigator',
      icon: Wallet,
      url: 'https://defi.crypto-ai-platform.com',
      hasAccess: false,
      requiresSubscription: true,
      requiredRole: 'premium'
    },
    {
      id: 'portfolio-guardian',
      name: 'Portfolio Guardian',
      icon: BarChart,
      url: 'https://portfolio.crypto-ai-platform.com',
      hasAccess: true,
      requiresSubscription: false,
      requiredRole: 'user'
    }
  ];

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // Load user profile
      const profileRes = await fetch('/api/auth/profile');
      const profileData = await profileRes.json();
      setProfile(profileData);

      // Load app access
      const accessRes = await fetch('/api/auth/app-access');
      const accessData = await accessRes.json();
      setAppAccess(accessData);

      // Load security settings
      const securityRes = await fetch('/api/auth/security');
      const securityData = await securityRes.json();
      setSecuritySettings(securityData);

      // Load audit logs
      const auditRes = await fetch('/api/auth/audit-logs');
      const auditData = await auditRes.json();
      setAuditLogs(auditData);

    } catch (_error) {
      console.error('Failed to load user data:', _error);
      toast.error('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (updates: Partial<UserProfile>) => {
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });

      if (response.ok) {
        const updated = await response.json();
        setProfile(updated);
        toast.success('Profile updated successfully');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleEnable2FA = async (method: 'totp' | 'sms' | 'email') => {
    try {
      const response = await fetch('/api/auth/2fa/enable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Show QR code for TOTP or success message for SMS/Email
        if (method === 'totp' && data.qrCode) {
          // Show QR code modal
          toast.success('Scan the QR code with your authenticator app');
        } else {
          toast.success(`${method.toUpperCase()} authentication enabled`);
        }
        
        // Reload security settings
        const securityRes = await fetch('/api/auth/security');
        const securityData = await securityRes.json();
        setSecuritySettings(securityData);
      }
    } catch (_error) {
      toast.error(`Failed to enable ${method} authentication`);
    }
  };

  const handleLogoutAllDevices = async () => {
    try {
      const response = await fetch('/api/auth/logout-all', {
        method: 'POST'
      });

      if (response.ok) {
        toast.success('Logged out from all devices');
        // Redirect to login
        window.location.href = '/auth/login';
      }
    } catch (_error) {
      toast.error('Failed to logout from all devices');
    }
  };

  const handleRevokeDevice = async (deviceId: string) => {
    try {
      const response = await fetch(`/api/auth/devices/${deviceId}/revoke`, {
        method: 'POST'
      });

      if (response.ok) {
        toast.success('Device access revoked');
        // Reload security settings
        const securityRes = await fetch('/api/auth/security');
        const securityData = await securityRes.json();
        setSecuritySettings(securityData);
      }
    } catch (_error) {
      toast.error('Failed to revoke device access');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Unified Account Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your profile, security settings, and app access from one place
        </p>
      </div>

      {/* User Overview Card */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile?.avatar} />
              <AvatarFallback>
                {profile?.name?.charAt(0) || profile?.email?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">{profile?.name || 'User'}</h2>
              <p className="text-muted-foreground">{profile?.email}</p>
              <div className="flex items-center space-x-4 mt-2">
                <Badge variant={profile?.role === 'admin' ? 'destructive' : profile?.role === 'premium' ? 'default' : 'secondary'}>
                  {profile?.role?.toUpperCase()}
                </Badge>
                <Badge variant={profile?.subscriptionStatus === 'active' ? 'default' : 'outline'}>
                  {profile?.subscriptionTier?.toUpperCase()} - {profile?.subscriptionStatus}
                </Badge>
                {securitySettings?.twoFactorEnabled && (
                  <Badge variant="default" className="bg-green-500">
                    <Shield className="h-3 w-3 mr-1" />
                    2FA Enabled
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <p>Member since: {new Date(profile?.createdAt || '').toLocaleDateString()}</p>
              <p>Last login: {new Date(profile?.lastLogin || '').toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="apps">
            <Globe className="h-4 w-4 mr-2" />
            Apps
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="activity">
            <Activity className="h-4 w-4 mr-2" />
            Activity
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input 
                    id="name" 
                    value={profile?.name || ''} 
                    onChange={(e) => setProfile(prev => prev ? {...prev, name: e.target.value} : null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={profile?.email || ''} 
                    disabled
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Subscription Plan</Label>
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{profile?.subscriptionTier?.toUpperCase()} Plan</p>
                        <p className="text-sm text-muted-foreground">
                          Status: {profile?.subscriptionStatus}
                        </p>
                      </div>
                      <Button variant="outline">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Manage Subscription
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleProfileUpdate({ name: profile?.name })}>
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Apps Tab */}
        <TabsContent value="apps">
          <Card>
            <CardHeader>
              <CardTitle>App Access Management</CardTitle>
              <CardDescription>Manage your access to different applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {apps.map((app) => {
                  const Icon = app.icon as React.ComponentType<{ className?: string }>;
                  const hasAccess = profile && 
                    (!app.requiresSubscription || profile.subscriptionStatus === 'active') &&
                    (app.requiredRole === 'user' || 
                     (app.requiredRole === 'premium' && ['premium', 'admin'].includes(profile.role)) ||
                     (app.requiredRole === 'admin' && profile.role === 'admin'));
                  
                  return (
                    <Card key={app.id} className={!hasAccess ? 'opacity-60' : ''}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${hasAccess ? 'bg-primary/10' : 'bg-muted'}`}>
                              <Icon className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{app.name}</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {app.requiresSubscription && (
                                  <Badge variant="outline" className="mr-2">
                                    Subscription Required
                                  </Badge>
                                )}
                                {app.requiredRole !== 'user' && (
                                  <Badge variant="outline">
                                    {app.requiredRole} Role
                                  </Badge>
                                )}
                              </p>
                              {app.lastAccessed && (
                                <p className="text-xs text-muted-foreground mt-2">
                                  Last accessed: {new Date(app.lastAccessed).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {hasAccess ? (
                              <>
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => window.open(app.url, '_blank')}
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </>
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="space-y-6">
            {/* Two-Factor Authentication */}
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Authenticator App (TOTP)</p>
                      <p className="text-sm text-muted-foreground">
                        Use an app like Google Authenticator or Authy
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={securitySettings?.twoFactorMethods.find(m => m.type === 'totp')?.enabled || false}
                    onCheckedChange={() => handleEnable2FA('totp')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Email Authentication</p>
                      <p className="text-sm text-muted-foreground">
                        Receive codes via email
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={securitySettings?.twoFactorMethods.find(m => m.type === 'email')?.enabled || false}
                    onCheckedChange={() => handleEnable2FA('email')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-5 w-5" />
                    <div>
                      <p className="font-medium">SMS Authentication</p>
                      <p className="text-sm text-muted-foreground">
                        Receive codes via SMS
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={securitySettings?.twoFactorMethods.find(m => m.type === 'sms')?.enabled || false}
                    onCheckedChange={() => handleEnable2FA('sms')}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Active Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>Manage your active sessions across devices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {securitySettings?.sessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">
                          {session.device}
                          {session.current && (
                            <Badge variant="default" className="ml-2">Current</Badge>
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {session.location} • Last active: {new Date(session.lastActive).toLocaleString()}
                        </p>
                      </div>
                      {!session.current && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRevokeDevice(session.id)}
                        >
                          Revoke
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="destructive" onClick={handleLogoutAllDevices}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout All Devices
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security Keys */}
            <Card>
              <CardHeader>
                <CardTitle>Security Keys</CardTitle>
                <CardDescription>Manage API keys and access tokens</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline">
                  <Key className="h-4 w-4 mr-2" />
                  Generate API Key
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent account activity and security events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {auditLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {log.result === 'success' ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      )}
                      <div>
                        <p className="font-medium">{log.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(log.timestamp).toLocaleString()} • IP: {log.ipAddress}
                        </p>
                      </div>
                    </div>
                    {log.appId && (
                      <Badge variant="outline">{log.appId}</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
