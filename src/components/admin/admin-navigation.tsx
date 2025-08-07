'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Shield, 
  BarChart3, 
  Database, 
  FileText, 
  MessageSquare,
  CreditCard,
  Activity,
  AlertTriangle,
  BookOpen,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const navigationItems = [
  {
    title: 'ダッシュボード',
    href: '/admin',
    icon: LayoutDashboard,
    description: 'システム概要'
  },
  {
    title: 'ユーザー管理',
    href: '/admin/users',
    icon: Users,
    description: 'ユーザー・権限管理'
  },
  {
    title: 'システム監視',
    href: '/admin/monitoring',
    icon: Activity,
    description: 'パフォーマンス・ヘルス監視'
  },
  {
    title: 'セキュリティ',
    href: '/admin/security',
    icon: Shield,
    description: 'セキュリティ監査・アラート'
  },
  {
    title: 'アナリティクス',
    href: '/admin/analytics',
    icon: BarChart3,
    description: '利用統計・レポート'
  },
  {
    title: 'データベース',
    href: '/admin/database',
    icon: Database,
    description: 'データベース管理'
  },
  {
    title: 'コンテンツ管理',
    href: '/admin/content',
    icon: BookOpen,
    description: '学習コンテンツ・記事管理'
  },
  {
    title: 'プラン管理',
    href: '/admin/plans',
    icon: CreditCard,
    description: '料金プラン・請求管理'
  },
  {
    title: 'API管理',
    href: '/admin/api',
    icon: TrendingUp,
    description: 'API利用状況・制限管理'
  },
  {
    title: 'ログ管理',
    href: '/admin/logs',
    icon: FileText,
    description: 'システム・エラーログ'
  },
  {
    title: 'アラート',
    href: '/admin/alerts',
    icon: AlertTriangle,
    description: 'システムアラート・通知'
  },
  {
    title: 'サポート',
    href: '/admin/support',
    icon: MessageSquare,
    description: 'ユーザーサポート・問い合わせ'
  },
  {
    title: 'システム設定',
    href: '/admin/settings',
    icon: Settings,
    description: 'システム設定・環境変数'
  }
];

export function AdminNavigation() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className={cn(
      "relative bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* ロゴ・タイトル */}
      <div className="flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        {!collapsed && (
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                管理者ダッシュボード
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                システム管理
              </p>
            </div>
          </div>
        )}
        
        {/* 折りたたみボタン */}
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "absolute -right-3 top-6 h-6 w-6 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800",
            collapsed && "left-2"
          )}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </Button>
      </div>

      {/* ナビゲーションメニュー */}
      <ScrollArea className="flex-1">
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start h-auto p-3 text-left",
                    collapsed && "justify-center px-2",
                    isActive && "bg-primary text-primary-foreground",
                    !isActive && "hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                  title={collapsed ? item.title : undefined}
                >
                  <Icon className={cn("h-4 w-4", !collapsed && "mr-3")} />
                  {!collapsed && (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {item.description}
                      </p>
                    </div>
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* フッター情報 */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
            <p className="text-xs font-medium text-blue-900 dark:text-blue-100">
              システム状態
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              すべてのサービスが正常に動作中
            </p>
          </div>
        </div>
      )}
    </div>
  );
}