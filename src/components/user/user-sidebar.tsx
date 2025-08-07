'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard,
  MessageSquare,
  TrendingUp,
  BookOpen,
  PieChart,
  Shield,
  Settings,
  BarChart3,
  Zap,
  Target,
  Brain,
  Star,
  ChevronRight,
  TrendingDown,
  Activity
} from 'lucide-react';

interface UserSidebarProps {
  className?: string;
}

export function UserSidebar({ className }: UserSidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    {
      title: 'ダッシュボード',
      href: '/dashboard',
      icon: LayoutDashboard,
      description: 'メインダッシュボード',
      active: pathname === '/dashboard'
    },
    {
      title: 'AIチャット',
      href: '/ai/chat',
      icon: MessageSquare,
      description: 'AI投資アシスタント',
      active: pathname.startsWith('/ai/chat'),
      badge: '2/5'
    },
    {
      title: '価格予測',
      href: '/prediction',
      icon: TrendingUp,
      description: 'AI価格予測システム',
      active: pathname.startsWith('/prediction')
    },
    {
      title: 'ポートフォリオ',
      href: '/portfolio',
      icon: PieChart,
      description: '資産管理と最適化',
      active: pathname.startsWith('/portfolio')
    },
    {
      title: '市場分析',
      href: '/market',
      icon: BarChart3,
      description: 'リアルタイム市場データ',
      active: pathname.startsWith('/market')
    },
    {
      title: 'リスク管理',
      href: '/risk',
      icon: Shield,
      description: '適応的リスク評価',
      active: pathname.startsWith('/risk')
    },
    {
      title: '学習センター',
      href: '/learning',
      icon: BookOpen,
      description: '教育コンテンツ',
      active: pathname.startsWith('/learning'),
      badge: '新着'
    },
    {
      title: 'アラート',
      href: '/alerts',
      icon: Zap,
      description: '価格アラート設定',
      active: pathname.startsWith('/alerts')
    },
    {
      title: 'パフォーマンス',
      href: '/performance',
      icon: Target,
      description: '投資パフォーマンス',
      active: pathname.startsWith('/performance')
    },
    {
      title: '設定',
      href: '/settings',
      icon: Settings,
      description: 'アカウント設定',
      active: pathname.startsWith('/settings')
    }
  ];

  const quickStats = {
    totalGain: 12.5,
    todayGain: 2.3,
    learningProgress: 45,
    aiUsage: 40
  };

  return (
    <div className={cn('fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 bg-background border-r', className)}>
      <div className="flex flex-col h-full">
        {/* Quick Stats */}
        <div className="p-4 border-b">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">今日の概要</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">総利益</span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-sm font-medium text-green-600">
                    +{quickStats.totalGain}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">今日の変動</span>
                <div className="flex items-center space-x-1">
                  <Activity className="h-3 w-3 text-blue-500" />
                  <span className="text-sm font-medium text-blue-600">
                    +{quickStats.todayGain}%
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">学習進捗</span>
                  <span className="text-xs text-muted-foreground">
                    {quickStats.learningProgress}%
                  </span>
                </div>
                <Progress value={quickStats.learningProgress} className="h-1" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={item.active ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start h-auto p-3 text-left",
                    item.active && "bg-primary text-primary-foreground"
                  )}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium truncate">
                          {item.title}
                        </span>
                        {item.badge && (
                          <Badge variant="secondary" className="text-xs ml-2">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {item.description}
                      </p>
                    </div>
                    {item.active && (
                      <ChevronRight className="h-3 w-3 flex-shrink-0" />
                    )}
                  </div>
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Upgrade Banner */}
        <div className="p-4 border-t">
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-4 w-4" />
                <span className="text-sm font-medium">プランをアップグレード</span>
              </div>
              <p className="text-xs opacity-90 mb-3">
                無制限のAI利用とプレミアム機能を利用
              </p>
              <Button asChild size="sm" className="w-full bg-white text-purple-600 hover:bg-gray-100">
                <Link href="/billing">
                  アップグレード
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}