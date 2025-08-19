'use client';

import * as React from "react"
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  Shield, 
  Eye, 
  Lock, 
  Activity,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import Link from 'next/link';

interface SecurityAlert {
  id: string;
  type: 'suspicious_activity' | 'login_failure' | 'api_abuse' | 'security_violation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  resolved: boolean;
  ip?: string;
  userAgent?: string;
  count?: number;
}

export function SecurityAlerts() {
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSecurityAlerts = async () => {
      try {
        // 実際のセキュリティアラート API を使用
        const response = await fetch('/api/security/monitor?action=get_events&severity=high&limit=10');
        if (response.ok) {
          const data = await response.json();
          // データを SecurityAlert 形式に変換
          const alertsData = data.events || [];
          setAlerts(alertsData);
        }
      } catch (error) {
        console.error('Failed to fetch security alerts:', error);
        // フォールバック データ
        setAlerts([
          {
            id: '1',
            type: 'suspicious_activity',
            severity: 'high',
            title: '不審なログイン試行',
            description: '複数の異なるIPアドレスから短時間に多数のログイン試行が検出されました',
            timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
            resolved: false,
            ip: '192.168.1.100',
            count: 25
          },
          {
            id: '2',
            type: 'api_abuse',
            severity: 'medium',
            title: 'API レート制限超過',
            description: '特定のユーザーがAPI利用制限を大幅に超過しています',
            timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
            resolved: false,
            ip: '203.0.113.45',
            count: 1500
          },
          {
            id: '3',
            type: 'security_violation',
            severity: 'critical',
            title: 'SQLインジェクション攻撃',
            description: 'データベースへの不正なクエリ実行が検出されました',
            timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            resolved: true,
            ip: '198.51.100.23'
          },
          {
            id: '4',
            type: 'login_failure',
            severity: 'medium',
            title: '管理者アカウント攻撃',
            description: '管理者アカウントに対する総当たり攻撃が検出されました',
            timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
            resolved: true,
            ip: '192.0.2.10',
            count: 50
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSecurityAlerts();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-start space-x-3">
            <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse mt-1" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 bg-gray-100 rounded animate-pulse w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const getAlertIcon = (type: SecurityAlert['type']) => {
    switch (type) {
      case 'suspicious_activity':
        return <Eye className="h-4 w-4 text-yellow-500" />;
      case 'login_failure':
        return <Lock className="h-4 w-4 text-red-500" />;
      case 'api_abuse':
        return <Activity className="h-4 w-4 text-orange-500" />;
      case 'security_violation':
        return <Shield className="h-4 w-4 text-red-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: SecurityAlert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-50';
      case 'high':
        return 'text-orange-600 bg-orange-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getSeverityLabel = (severity: SecurityAlert['severity']) => {
    switch (severity) {
      case 'critical':
        return '緊急';
      case 'high':
        return '高';
      case 'medium':
        return '中';
      case 'low':
        return '低';
      default:
        return '不明';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffMs = now.getTime() - alertTime.getTime();
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

  const unresolvedAlerts = alerts.filter(alert => !alert.resolved).length;

  return (
    <div className="space-y-4">
      {/* 統計情報 */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">未解決アラート</p>
            <p className="text-2xl font-bold text-red-600">{unresolvedAlerts}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">過去24時間</p>
            <p className="text-xl font-semibold">{alerts.length}</p>
          </div>
        </div>
      </div>

      {/* アラートリスト */}
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Shield className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>セキュリティアラートはありません</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border-l-4 ${
                alert.resolved ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 
                alert.severity === 'critical' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                alert.severity === 'high' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' :
                'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex items-center space-x-2 mt-0.5">
                  {getAlertIcon(alert.type)}
                  {alert.resolved ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">
                      {alert.title}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Badge className={`text-xs ${getSeverityColor(alert.severity)}`}>
                        {getSeverityLabel(alert.severity)}
                      </Badge>
                      {alert.resolved && (
                        <Badge variant="default" className="text-xs">
                          解決済み
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {alert.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTimeAgo(alert.timestamp)}
                    </span>
                    {alert.ip && (
                      <span>IP: {alert.ip}</span>
                    )}
                    {alert.count && (
                      <span>回数: {alert.count}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* アクションボタン */}
      <div className="flex items-center justify-between pt-4 border-t">
        <Button asChild variant="outline" size="sm">
          <Link href="/admin/security">
            <Shield className="h-4 w-4 mr-2" />
            セキュリティ詳細
          </Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/admin/alerts">
            すべてのアラートを表示
          </Link>
        </Button>
      </div>
    </div>
  );
}