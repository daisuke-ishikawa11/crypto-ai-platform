'use client';

import * as React from "react"
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  LogIn, 
  LogOut, 
  Settings, 
  Shield, 
  Database, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  CreditCard,
  FileText
} from 'lucide-react';
import Link from 'next/link';

interface ActivityLog {
  id: string;
  type: 'user_login' | 'user_logout' | 'user_register' | 'admin_action' | 'system_event' | 'security_event' | 'payment' | 'api_call';
  severity: 'info' | 'warning' | 'error' | 'success';
  title: string;
  description: string;
  timestamp: string;
  userId?: string;
  userEmail?: string;
  ip?: string;
  metadata?: Record<string, unknown>;
}

export function RecentActivities() {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // 実際のアクティビティログ API を使用
        const response = await fetch('/api/admin/activities?limit=20');
        if (response.ok) {
          const data = await response.json();
          setActivities(data.activities || []);
        }
      } catch (error) {
        console.error('Failed to fetch activities:', error);
        // フォールバック データ
        setActivities([
          {
            id: '1',
            type: 'user_login',
            severity: 'success',
            title: 'ユーザーログイン',
            description: 'ユーザーがシステムにログインしました',
            timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
            userId: 'user123',
            userEmail: 'user@example.com',
            ip: '192.168.1.100'
          },
          {
            id: '2',
            type: 'admin_action',
            severity: 'info',
            title: 'システム設定変更',
            description: 'API レート制限の設定が更新されました',
            timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
            userId: 'admin456',
            userEmail: 'admin@example.com',
            metadata: { setting: 'rate_limit', oldValue: '100', newValue: '150' }
          },
          {
            id: '3',
            type: 'security_event',
            severity: 'warning',
            title: 'セキュリティアラート',
            description: '複数の失敗したログイン試行が検出されました',
            timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
            ip: '203.0.113.45',
            metadata: { attempts: 5, blocked: true }
          },
          {
            id: '4',
            type: 'payment',
            severity: 'success',
            title: 'プラン変更',
            description: 'ユーザーがStandardプランにアップグレードしました',
            timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
            userId: 'user789',
            userEmail: 'user2@example.com',
            metadata: { plan: 'standard', amount: '2980' }
          },
          {
            id: '5',
            type: 'system_event',
            severity: 'info',
            title: 'システム再起動',
            description: 'メンテナンスのためシステムが再起動されました',
            timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            metadata: { reason: 'maintenance', duration: '2min' }
          },
          {
            id: '6',
            type: 'user_register',
            severity: 'success',
            title: '新規ユーザー登録',
            description: '新しいユーザーが登録されました',
            timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
            userId: 'user101',
            userEmail: 'newuser@example.com',
            ip: '198.51.100.123'
          },
          {
            id: '7',
            type: 'api_call',
            severity: 'error',
            title: 'API エラー',
            description: '外部API (CoinGecko) からの応答エラーが発生しました',
            timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
            metadata: { api: 'coingecko', error: 'timeout', retries: 3 }
          },
          {
            id: '8',
            type: 'user_logout',
            severity: 'info',
            title: 'ユーザーログアウト',
            description: 'ユーザーがシステムからログアウトしました',
            timestamp: new Date(Date.now() - 75 * 60 * 1000).toISOString(),
            userId: 'user456',
            userEmail: 'user3@example.com',
            ip: '192.168.1.200'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
    const interval = setInterval(fetchActivities, 60000); // 1分ごとに更新
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 bg-gray-100 rounded animate-pulse w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const getActivityIcon = (type: ActivityLog['type']) => {
    switch (type) {
      case 'user_login':
        return <LogIn className="h-4 w-4 text-green-500" />;
      case 'user_logout':
        return <LogOut className="h-4 w-4 text-gray-500" />;
      case 'user_register':
        return <Users className="h-4 w-4 text-blue-500" />;
      case 'admin_action':
        return <Settings className="h-4 w-4 text-purple-500" />;
      case 'system_event':
        return <Database className="h-4 w-4 text-indigo-500" />;
      case 'security_event':
        return <Shield className="h-4 w-4 text-red-500" />;
      case 'payment':
        return <CreditCard className="h-4 w-4 text-green-600" />;
      case 'api_call':
        return <Activity className="h-4 w-4 text-orange-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: ActivityLog['severity']) => {
    switch (severity) {
      case 'success':
        return 'text-green-600 bg-green-50';
      case 'info':
        return 'text-blue-600 bg-blue-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'error':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getSeverityLabel = (severity: ActivityLog['severity']) => {
    switch (severity) {
      case 'success':
        return '成功';
      case 'info':
        return '情報';
      case 'warning':
        return '警告';
      case 'error':
        return 'エラー';
      default:
        return '不明';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffMs = now.getTime() - activityTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays}日前`;
    } else if (diffHours > 0) {
      return `${diffHours}時間前`;
    } else if (diffMins > 0) {
      return `${diffMins}分前`;
    } else {
      return '今すぐ';
    }
  };

  return (
    <div className="space-y-4">
      {/* 統計情報 */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">過去1時間</p>
            <p className="text-2xl font-bold">{activities.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">エラー/警告</p>
            <p className="text-2xl font-bold text-red-600">
              {activities.filter(a => a.severity === 'error' || a.severity === 'warning').length}
            </p>
          </div>
        </div>
      </div>

      {/* アクティビティリスト */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Activity className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>最近のアクティビティはありません</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 border"
            >
              <div className="mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate">
                    {activity.title}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Badge className={`text-xs ${getSeverityColor(activity.severity)}`}>
                      {getSeverityLabel(activity.severity)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {activity.description}
                </p>
                {(activity.userEmail || activity.ip) && (
                  <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
                    {activity.userEmail && (
                      <span>ユーザー: {activity.userEmail}</span>
                    )}
                    {activity.ip && (
                      <span>IP: {activity.ip}</span>
                    )}
                  </div>
                )}
                {activity.metadata && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    {Object.entries(activity.metadata).map(([key, value]) => (
                      <span key={key} className="mr-3">
                        {key}: {String(value)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* アクションボタン */}
      <div className="flex items-center justify-between pt-4 border-t">
        <Button asChild variant="outline" size="sm">
          <Link href="/admin/logs">
            <FileText className="h-4 w-4 mr-2" />
            詳細ログ
          </Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/admin/activities">
            すべてのアクティビティ
          </Link>
        </Button>
      </div>
    </div>
  );
}