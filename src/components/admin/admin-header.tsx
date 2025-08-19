'use client';

import * as React from "react"
import { useState } from 'react'
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  Bell, 
  Settings, 
  LogOut, 
  User as UserIcon,
  Shield,
  Activity,
  Database,
  AlertTriangle,
  CheckCircle,
  Home
} from 'lucide-react';
import Link from 'next/link';

interface AdminHeaderProps {
  user: User;
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // システム状態のモック データ（実際のデータは API から取得）
  const systemStatus = {
    overall: 'healthy',
    database: 'healthy',
    apis: 'healthy',
    alerts: 2,
    activeUsers: 1247
  };

  const handleLogout = async () => {
    // ログアウト処理
    window.location.href = '/auth/login';
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* 左側: 検索バー */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="ユーザー、ログ、設定を検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          
          {/* クイックアクション */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard">
                <Home className="h-4 w-4 mr-2" />
                ユーザー画面
              </Link>
            </Button>
          </div>
        </div>

        {/* 右側: システム状態、通知、ユーザーメニュー */}
        <div className="flex items-center space-x-4">
          {/* システム状態インジケーター */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Activity className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {systemStatus.activeUsers} アクティブユーザー
              </span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Database className="h-4 w-4 text-green-500" />
              <Badge variant="secondary" className="text-xs">
                DB: 正常
              </Badge>
            </div>
            
            <div className="flex items-center space-x-1">
              {systemStatus.overall === 'healthy' ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              )}
              <Badge 
                variant={systemStatus.overall === 'healthy' ? 'default' : 'destructive'}
                className="text-xs"
              >
                システム: {systemStatus.overall === 'healthy' ? '正常' : '注意'}
              </Badge>
            </div>
          </div>

          {/* 通知ベル */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {systemStatus.alerts > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center">
                    {systemStatus.alerts}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>システム通知</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-start space-x-2 p-3">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">高負荷アラート</p>
                  <p className="text-xs text-gray-500">
                    API エンドポイントのレスポンス時間が閾値を超えました
                  </p>
                  <p className="text-xs text-gray-400 mt-1">5分前</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-start space-x-2 p-3">
                <Shield className="h-4 w-4 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">セキュリティログ</p>
                  <p className="text-xs text-gray-500">
                    不審なログイン試行が検出されました
                  </p>
                  <p className="text-xs text-gray-400 mt-1">15分前</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/admin/alerts" className="w-full">
                  すべての通知を表示
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* ユーザーメニュー */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <UserIcon className="h-4 w-4" />
                <span className="text-sm">
                  {user.email?.split('@')[0] || '管理者'}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div>
                  <p className="font-medium">{user.email}</p>
                  <p className="text-xs text-gray-500 font-normal">システム管理者</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/admin/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>設定</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="flex items-center">
                  <Home className="mr-2 h-4 w-4" />
                  <span>ユーザー画面に戻る</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>ログアウト</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}