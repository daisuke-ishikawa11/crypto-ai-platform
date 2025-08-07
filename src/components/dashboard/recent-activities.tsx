'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  MessageSquare, 
  BookOpen, 
  Shield, 
  Zap,
  CheckCircle,
  AlertTriangle,
  Info,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

interface ActivityItem {
  id: string;
  type: 'trade' | 'ai_chat' | 'learning' | 'alert' | 'analysis';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'warning' | 'info' | 'error';
  value?: number;
  change?: number;
  link?: string;
}

export function RecentActivities() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // 実際のAPI呼び出しに置き換える
        const response = await fetch('/api/dashboard/activities');
        if (response.ok) {
          const data = await response.json();
          setActivities(data.activities || []);
        }
      } catch (error) {
        console.error('Failed to fetch activities:', error);
        // フォールバックデータ
        setActivities([
          {
            id: '1',
            type: 'trade',
            title: 'BTC購入',
            description: '0.05 BTC を ¥325,000 で購入',
            timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
            status: 'success',
            value: 325000,
            change: 2.5
          },
          {
            id: '2',
            type: 'ai_chat',
            title: 'AI投資相談',
            description: 'ポートフォリオの最適化について相談',
            timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
            status: 'info',
            link: '/ai/chat'
          },
          {
            id: '3',
            type: 'alert',
            title: '価格アラート',
            description: 'ETHが¥280,000を突破しました',
            timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            status: 'warning',
            value: 280000,
            change: 3.2
          },
          {
            id: '4',
            type: 'learning',
            title: 'レッスン完了',
            description: 'DeFiの基礎 - 第3章を完了',
            timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
            status: 'success',
            link: '/learning'
          },
          {
            id: '5',
            type: 'analysis',
            title: 'リスク分析',
            description: 'ポートフォリオのリスク評価が完了',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            status: 'info',
            link: '/risk/analysis'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-start space-x-3 animate-pulse">
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'trade':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'ai_chat':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'learning':
        return <BookOpen className="h-4 w-4 text-purple-500" />;
      case 'alert':
        return <Zap className="h-4 w-4 text-yellow-500" />;
      case 'analysis':
        return <Shield className="h-4 w-4 text-indigo-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: ActivityItem['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-3 w-3 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-3 w-3 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="h-3 w-3 text-red-500" />;
      default:
        return <Info className="h-3 w-3 text-blue-500" />;
    }
  };

  const getStatusColor = (status: ActivityItem['status']) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'error':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-blue-600 bg-blue-50';
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-4">
      {activities.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Activity className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>最近のアクティビティはありません</p>
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0 mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                      {getStatusIcon(activity.status)}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {activity.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2">
                    {activity.value && (
                      <span className="text-sm font-medium">
                        {formatCurrency(activity.value)}
                      </span>
                    )}
                    {activity.change && (
                      <div className="flex items-center">
                        {activity.change >= 0 ? (
                          <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                        )}
                        <span className={`text-xs ${
                          activity.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {activity.change >= 0 ? '+' : ''}{activity.change}%
                        </span>
                      </div>
                    )}
                  </div>
                  {activity.link && (
                    <Button asChild variant="ghost" size="sm" className="h-auto p-1">
                      <Link href={activity.link}>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="text-center pt-4 border-t">
        <Button asChild variant="outline" size="sm">
          <Link href="/activities">
            すべてのアクティビティを表示
          </Link>
        </Button>
      </div>
    </div>
  );
}