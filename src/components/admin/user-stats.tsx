'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  UserCheck, 
  UserPlus, 
  Crown,
  UserX,
  Mail,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';

interface UserStatsProps {
  stats: {
    totalUsers: number;
    activeUsers: number;
    newUsers: number;
    premiumUsers: number;
    suspendedUsers: number;
    verifiedUsers: number;
    unverifiedUsers: number;
    revenue: number;
  };
}

export function UserStats({ stats }: UserStatsProps) {
  const verificationRate = Math.round((stats.verifiedUsers / stats.totalUsers) * 100);
  const activeRate = Math.round((stats.activeUsers / stats.totalUsers) * 100);
  const premiumRate = Math.round((stats.premiumUsers / stats.totalUsers) * 100);

  const statItems = [
    {
      title: '総ユーザー数',
      value: stats.totalUsers.toLocaleString(),
      description: '登録済みユーザー',
      icon: Users,
      color: 'text-blue-600',
      trend: '+12.5%',
      trendDirection: 'up'
    },
    {
      title: 'アクティブユーザー',
      value: stats.activeUsers.toLocaleString(),
      description: `${activeRate}% のユーザーがアクティブ`,
      icon: UserCheck,
      color: 'text-green-600',
      trend: '+8.3%',
      trendDirection: 'up'
    },
    {
      title: '新規ユーザー',
      value: stats.newUsers.toLocaleString(),
      description: '今月の新規登録',
      icon: UserPlus,
      color: 'text-purple-600',
      trend: '+24.7%',
      trendDirection: 'up'
    },
    {
      title: 'プレミアムユーザー',
      value: stats.premiumUsers.toLocaleString(),
      description: `${premiumRate}% がプレミアム`,
      icon: Crown,
      color: 'text-yellow-600',
      trend: '+15.2%',
      trendDirection: 'up'
    },
    {
      title: '停止ユーザー',
      value: stats.suspendedUsers.toLocaleString(),
      description: 'アカウント停止中',
      icon: UserX,
      color: 'text-red-600',
      trend: '-2.1%',
      trendDirection: 'down'
    },
    {
      title: '月間収益',
      value: `¥${stats.revenue.toLocaleString()}`,
      description: 'ユーザー課金収益',
      icon: DollarSign,
      color: 'text-emerald-600',
      trend: '+18.4%',
      trendDirection: 'up'
    }
  ];

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-3 w-3 text-red-600" />;
      default:
        return <Minus className="h-3 w-3 text-gray-400" />;
    }
  };

  const getTrendColor = (direction: string) => {
    switch (direction) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${item.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.description}
                </p>
                <div className="flex items-center mt-2">
                  {getTrendIcon(item.trendDirection)}
                  <span className={`text-xs ml-1 ${getTrendColor(item.trendDirection)}`}>
                    {item.trend}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 詳細統計 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 認証状況 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>メール認証状況</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">認証完了</span>
              <div className="flex items-center space-x-2">
                <Badge variant="default" className="text-xs">
                  {stats.verifiedUsers.toLocaleString()}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {verificationRate}%
                </span>
              </div>
            </div>
            <Progress value={verificationRate} className="h-2" />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>認証済み: {stats.verifiedUsers.toLocaleString()}</span>
              <span>未認証: {stats.unverifiedUsers.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* アクティビティ状況 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserCheck className="h-5 w-5" />
              <span>アクティビティ状況</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">アクティブ率</span>
              <div className="flex items-center space-x-2">
                <Badge variant="default" className="text-xs">
                  {stats.activeUsers.toLocaleString()}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {activeRate}%
                </span>
              </div>
            </div>
            <Progress value={activeRate} className="h-2" />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>アクティブ: {stats.activeUsers.toLocaleString()}</span>
              <span>非アクティブ: {(stats.totalUsers - stats.activeUsers).toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 最終更新時刻 */}
      <div className="text-xs text-muted-foreground text-center">
        最終更新: {new Date().toLocaleString('ja-JP')}
      </div>
    </div>
  );
}