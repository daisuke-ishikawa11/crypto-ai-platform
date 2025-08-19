'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { 
  BookOpen, 
  BarChart3, 
  Trophy, 
  User,
  GraduationCap
} from 'lucide-react'

const navigation = [
  {
    name: 'ダッシュボード',
    href: '/',
    icon: BarChart3,
  },
  {
    name: 'レッスン',
    href: '/lessons',
    icon: BookOpen,
  },
  {
    name: '修了証',
    href: '/certificates',
    icon: GraduationCap,
  },
  {
    name: '実績',
    href: '/achievements',
    icon: Trophy,
  },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* ロゴ */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CL</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold">CryptoLearn Pro</span>
              <span className="text-xs text-muted-foreground">273コンテンツで学ぶ暗号通貨投資</span>
            </div>
          </Link>

          {/* ナビゲーションメニュー */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "flex items-center space-x-2",
                      isActive && "bg-primary text-primary-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* ユーザーメニュー */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">無料ユーザー</span>
            </Button>
            <Button size="sm">
              Proにアップグレード
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
