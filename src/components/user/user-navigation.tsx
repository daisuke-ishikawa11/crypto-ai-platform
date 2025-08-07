'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard,
  MessageSquare,
  TrendingUp,
  BookOpen,
  PieChart,
  BarChart3
} from 'lucide-react';

interface UserNavigationProps {
  className?: string;
}

export function UserNavigation({ className }: UserNavigationProps) {
  const pathname = usePathname();

  const navigationItems = [
    {
      title: 'ダッシュボード',
      href: '/dashboard',
      icon: LayoutDashboard,
      active: pathname === '/dashboard'
    },
    {
      title: 'AIチャット',
      href: '/ai/chat',
      icon: MessageSquare,
      active: pathname.startsWith('/ai/chat'),
      badge: '2/5'
    },
    {
      title: '予測',
      href: '/prediction',
      icon: TrendingUp,
      active: pathname.startsWith('/prediction')
    },
    {
      title: '市場',
      href: '/market',
      icon: BarChart3,
      active: pathname.startsWith('/market')
    },
    {
      title: '資産',
      href: '/portfolio',
      icon: PieChart,
      active: pathname.startsWith('/portfolio')
    },
    {
      title: '学習',
      href: '/learning',
      icon: BookOpen,
      active: pathname.startsWith('/learning'),
      badge: '新着'
    }
  ];

  return (
    <div className={cn('fixed bottom-0 left-0 right-0 z-50 bg-background border-t', className)}>
      <div className="grid grid-cols-6 h-16">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "h-full w-full rounded-none flex-col space-y-1 relative",
                  item.active && "bg-primary/10 text-primary"
                )}
              >
                <div className="relative">
                  <Icon className="h-4 w-4" />
                  {item.badge && (
                    <Badge className="absolute -top-2 -right-2 h-4 w-4 rounded-full text-xs p-0 flex items-center justify-center">
                      {item.badge === '新着' ? '!' : item.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-xs">{item.title}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}