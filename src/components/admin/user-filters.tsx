'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Users, 
  UserCheck, 
  Crown,
  UserX,
  Mail,
  Shield,
  Activity,
  Calendar,
  X
} from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  value: string;
  count?: number;
  icon?: React.ComponentType<{ className?: string }>;
}

export function UserFilters() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [planFilter, setPlanFilter] = useState<string>('all');
  const [verificationFilter, setVerificationFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');

  const statusOptions: FilterOption[] = [
    { id: 'all', label: 'すべて', value: 'all', count: 1247 },
    { id: 'active', label: 'アクティブ', value: 'active', count: 834, icon: UserCheck },
    { id: 'inactive', label: '非アクティブ', value: 'inactive', count: 413, icon: Users },
    { id: 'suspended', label: '停止中', value: 'suspended', count: 3, icon: UserX },
  ];

  const planOptions: FilterOption[] = [
    { id: 'all', label: 'すべて', value: 'all', count: 1247 },
    { id: 'free', label: '無料プラン', value: 'free', count: 1124 },
    { id: 'standard', label: 'スタンダード', value: 'standard', count: 98, icon: Crown },
    { id: 'premium', label: 'プレミアム', value: 'premium', count: 25, icon: Crown },
  ];

  const verificationOptions: FilterOption[] = [
    { id: 'all', label: 'すべて', value: 'all', count: 1247 },
    { id: 'verified', label: '認証済み', value: 'verified', count: 1156, icon: Mail },
    { id: 'unverified', label: '未認証', value: 'unverified', count: 91, icon: Mail },
  ];

  const dateOptions: FilterOption[] = [
    { id: 'all', label: 'すべて', value: 'all' },
    { id: 'today', label: '今日', value: 'today' },
    { id: 'week', label: '過去1週間', value: 'week' },
    { id: 'month', label: '過去1ヶ月', value: 'month' },
    { id: 'year', label: '過去1年', value: 'year' },
  ];

  const quickFilters = [
    {
      id: 'new-users',
      label: '新規ユーザー',
      description: '過去7日間',
      icon: Users,
      count: 45,
      color: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
    },
    {
      id: 'premium-users',
      label: 'プレミアムユーザー',
      description: '有料プラン',
      icon: Crown,
      count: 123,
      color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
    },
    {
      id: 'unverified-users',
      label: '未認証ユーザー',
      description: 'メール未認証',
      icon: Mail,
      count: 91,
      color: 'bg-orange-100 text-orange-700 hover:bg-orange-200'
    },
    {
      id: 'suspended-users',
      label: '停止ユーザー',
      description: 'アカウント停止',
      icon: UserX,
      count: 3,
      color: 'bg-red-100 text-red-700 hover:bg-red-200'
    },
    {
      id: 'high-activity',
      label: 'アクティブユーザー',
      description: '過去30日間',
      icon: Activity,
      count: 834,
      color: 'bg-green-100 text-green-700 hover:bg-green-200'
    },
    {
      id: 'admin-users',
      label: '管理者ユーザー',
      description: '管理者権限',
      icon: Shield,
      count: 5,
      color: 'bg-purple-100 text-purple-700 hover:bg-purple-200'
    }
  ];

  const handleQuickFilter = (filterId: string) => {
    if (activeFilters.includes(filterId)) {
      setActiveFilters(activeFilters.filter(id => id !== filterId));
    } else {
      setActiveFilters([...activeFilters, filterId]);
    }
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setStatusFilter('all');
    setPlanFilter('all');
    setVerificationFilter('all');
    setDateFilter('all');
  };

  const getFilterCount = () => {
    let count = 0;
    if (statusFilter !== 'all') count++;
    if (planFilter !== 'all') count++;
    if (verificationFilter !== 'all') count++;
    if (dateFilter !== 'all') count++;
    return count + activeFilters.length;
  };

  return (
    <div className="space-y-6 mt-6">
      {/* クイックフィルター */}
      <div>
        <h3 className="text-sm font-medium mb-3">クイックフィルター</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickFilters.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilters.includes(filter.id);
            return (
              <Button
                key={filter.id}
                variant="outline"
                size="sm"
                className={`h-auto p-3 flex flex-col items-start space-y-1 ${
                  isActive ? filter.color : 'hover:bg-gray-50'
                }`}
                onClick={() => handleQuickFilter(filter.id)}
              >
                <div className="flex items-center space-x-2 w-full">
                  <Icon className="h-4 w-4" />
                  <Badge variant="secondary" className="text-xs">
                    {filter.count}
                  </Badge>
                </div>
                <div className="text-xs font-medium">{filter.label}</div>
                <div className="text-xs text-muted-foreground">
                  {filter.description}
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      {/* 詳細フィルター */}
      <div>
        <h3 className="text-sm font-medium mb-3">詳細フィルター</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              ステータス
            </label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.id} value={option.value}>
                    <div className="flex items-center space-x-2">
                      {option.icon && <option.icon className="h-4 w-4" />}
                      <span>{option.label}</span>
                      {option.count && (
                        <Badge variant="secondary" className="text-xs">
                          {option.count}
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              プラン
            </label>
            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {planOptions.map((option) => (
                  <SelectItem key={option.id} value={option.value}>
                    <div className="flex items-center space-x-2">
                      {option.icon && <option.icon className="h-4 w-4" />}
                      <span>{option.label}</span>
                      {option.count && (
                        <Badge variant="secondary" className="text-xs">
                          {option.count}
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              認証状況
            </label>
            <Select value={verificationFilter} onValueChange={setVerificationFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {verificationOptions.map((option) => (
                  <SelectItem key={option.id} value={option.value}>
                    <div className="flex items-center space-x-2">
                      {option.icon && <option.icon className="h-4 w-4" />}
                      <span>{option.label}</span>
                      {option.count && (
                        <Badge variant="secondary" className="text-xs">
                          {option.count}
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              登録日
            </label>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dateOptions.map((option) => (
                  <SelectItem key={option.id} value={option.value}>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* アクティブフィルター表示 */}
      {getFilterCount() > 0 && (
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">
              {getFilterCount()} 個のフィルターが適用中
            </span>
            <div className="flex items-center space-x-1">
              {activeFilters.map((filterId) => {
                const filter = quickFilters.find(f => f.id === filterId);
                return filter ? (
                  <Badge key={filterId} variant="default" className="text-xs">
                    {filter.label}
                    <button
                      onClick={() => handleQuickFilter(filterId)}
                      className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ) : null;
              })}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs"
          >
            すべてクリア
          </Button>
        </div>
      )}

      {/* フィルター結果統計 */}
      <div className="text-xs text-muted-foreground text-center">
        フィルター結果: 1,247 ユーザー中 1,247 ユーザーを表示
      </div>
    </div>
  );
}