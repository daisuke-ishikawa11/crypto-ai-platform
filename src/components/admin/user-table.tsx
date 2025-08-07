'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Users, 
  MoreHorizontal,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Mail,
  Eye,
  Crown,
  Shield,
  Activity,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'suspended';
  plan: 'free' | 'standard' | 'premium';
  role: 'user' | 'admin';
  verified: boolean;
  lastLogin: string;
  createdAt: string;
  totalRevenue: number;
  apiUsage: number;
}

interface SortConfig {
  key: keyof User;
  direction: 'asc' | 'desc';
}

export function UserTable() {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'createdAt', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  // 実際のデータは API から取得する
  const mockUsers: User[] = [
    {
      id: '1',
      name: '田中太郎',
      email: 'tanaka@example.com',
      avatar: '/avatars/tanaka.jpg',
      status: 'active',
      plan: 'premium',
      role: 'user',
      verified: true,
      lastLogin: '2024-01-15T10:30:00Z',
      createdAt: '2023-12-01T09:00:00Z',
      totalRevenue: 9800,
      apiUsage: 1250
    },
    {
      id: '2',
      name: '佐藤花子',
      email: 'sato@example.com',
      status: 'active',
      plan: 'standard',
      role: 'user',
      verified: true,
      lastLogin: '2024-01-15T08:15:00Z',
      createdAt: '2023-11-15T14:30:00Z',
      totalRevenue: 2980,
      apiUsage: 850
    },
    {
      id: '3',
      name: '山田次郎',
      email: 'yamada@example.com',
      status: 'inactive',
      plan: 'free',
      role: 'user',
      verified: false,
      lastLogin: '2024-01-10T16:45:00Z',
      createdAt: '2023-10-20T11:20:00Z',
      totalRevenue: 0,
      apiUsage: 120
    },
    {
      id: '4',
      name: '管理者',
      email: 'admin@example.com',
      status: 'active',
      plan: 'premium',
      role: 'admin',
      verified: true,
      lastLogin: '2024-01-15T12:00:00Z',
      createdAt: '2023-01-01T00:00:00Z',
      totalRevenue: 0,
      apiUsage: 5000
    },
    {
      id: '5',
      name: '高橋三郎',
      email: 'takahashi@example.com',
      status: 'suspended',
      plan: 'free',
      role: 'user',
      verified: true,
      lastLogin: '2024-01-05T09:30:00Z',
      createdAt: '2023-09-10T13:45:00Z',
      totalRevenue: 0,
      apiUsage: 0
    }
  ];

  const handleSort = (key: keyof User) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedUsers = [...mockUsers].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(sortedUsers.length / pageSize);

  const getStatusBadge = (status: User['status']) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      suspended: 'bg-red-100 text-red-800'
    };
    
    const labels = {
      active: 'アクティブ',
      inactive: '非アクティブ',
      suspended: '停止中'
    };

    return (
      <Badge className={styles[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const getPlanBadge = (plan: User['plan']) => {
    const styles = {
      free: 'bg-gray-100 text-gray-800',
      standard: 'bg-blue-100 text-blue-800',
      premium: 'bg-purple-100 text-purple-800'
    };
    
    const labels = {
      free: '無料',
      standard: 'スタンダード',
      premium: 'プレミアム'
    };

    return (
      <Badge className={styles[plan]}>
        {plan === 'premium' && <Crown className="h-3 w-3 mr-1" />}
        {labels[plan]}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSortIcon = (key: keyof User) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />;
  };

  const handleUserAction = async (action: string, userId: string) => {
    setLoading(true);
    try {
      // 実際のAPI呼び出し
      console.log(`${action} user ${userId}`);
      // await userAPI.action(userId, action);
    } catch (error) {
      console.error('Failed to perform user action:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* テーブル */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">
                <Button 
                  variant="ghost" 
                  className="h-auto p-0 font-semibold"
                  onClick={() => handleSort('name')}
                >
                  ユーザー
                  {getSortIcon('name')}
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  className="h-auto p-0 font-semibold"
                  onClick={() => handleSort('status')}
                >
                  ステータス
                  {getSortIcon('status')}
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  className="h-auto p-0 font-semibold"
                  onClick={() => handleSort('plan')}
                >
                  プラン
                  {getSortIcon('plan')}
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  className="h-auto p-0 font-semibold"
                  onClick={() => handleSort('totalRevenue')}
                >
                  収益
                  {getSortIcon('totalRevenue')}
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  className="h-auto p-0 font-semibold"
                  onClick={() => handleSort('lastLogin')}
                >
                  最終ログイン
                  {getSortIcon('lastLogin')}
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  className="h-auto p-0 font-semibold"
                  onClick={() => handleSort('createdAt')}
                >
                  登録日
                  {getSortIcon('createdAt')}
                </Button>
              </TableHead>
              <TableHead className="text-right">アクション</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {user.email}
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        {user.role === 'admin' && (
                          <Shield className="h-3 w-3 text-purple-600" />
                        )}
                        {user.verified ? (
                          <Mail className="h-3 w-3 text-green-600" />
                        ) : (
                          <Mail className="h-3 w-3 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(user.status)}
                </TableCell>
                <TableCell>
                  {getPlanBadge(user.plan)}
                </TableCell>
                <TableCell>
                  <div className="font-medium">
                    ¥{user.totalRevenue.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    API: {user.apiUsage.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {formatDateTime(user.lastLogin)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {formatDate(user.createdAt)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>アクション</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/users/${user.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          詳細を表示
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/users/${user.id}/edit`}>
                          <Edit className="h-4 w-4 mr-2" />
                          編集
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {user.status === 'suspended' ? (
                        <DropdownMenuItem 
                          onClick={() => handleUserAction('unsuspend', user.id)}
                        >
                          <Unlock className="h-4 w-4 mr-2" />
                          停止解除
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem 
                          onClick={() => handleUserAction('suspend', user.id)}
                        >
                          <Lock className="h-4 w-4 mr-2" />
                          停止
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleUserAction('delete', user.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        削除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ページネーション */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">
            {sortedUsers.length} ユーザー中 {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, sortedUsers.length)} を表示
          </p>
          <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
            <SelectTrigger className="w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">件/ページ</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            前へ
          </Button>
          <div className="text-sm text-muted-foreground">
            ページ {currentPage} / {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            次へ
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}