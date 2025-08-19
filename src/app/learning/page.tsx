'use client';

import * as React from "react"
import { useEffect, useMemo, useRef, useState, useTransition } from 'react'
// import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { buildLessonPath } from '@/lib/learning/route-utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GraduationCap, 
  Clock, 
  Trophy, 
  Flame, 
  BookOpen, 
  CheckCircle2,
  Star,
  TrendingUp,
  Award,
  Zap,
  Target,
  Play,
  Book
} from 'lucide-react';
// import { learningService } from '@/lib/services/learning.service';
import { createClient } from '@/lib/supabase/client';
import type { Lesson, LessonCategory, UserLessonProgress, LearningStats } from '@/lib/types/learning';
import AchievementsPanel from '@/components/learning/achievements-panel';

// アニメーション用カウンターコンポーネント
function AnimatedCounter({ end, duration = 2, suffix = "" }: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (startTime === undefined) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
}

// ローディングスケルトンコンポーネント
function LearningPageSkeleton() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
      
      <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}

export default function LearningCenterPage() {
  const [categories, setCategories] = useState<LessonCategory[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [userProgress] = useState<UserLessonProgress[]>([]);
  const [stats, setStats] = useState<LearningStats | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedView, setSelectedView] = useState<'lessons' | 'achievements'>('lessons');
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [recentRewards, setRecentRewards] = useState<Array<{ at?: number; type: string; tickets?: number }>>([])
  const initialPageSize = (() => {
    const env = process.env.NEXT_PUBLIC_LEARNING_PAGE_SIZE;
    const n = env ? parseInt(env, 10) : 12;
    return Number.isFinite(n) && n > 0 && n <= 60 ? n : 12;
  })();
  const [visibleCount, setVisibleCount] = useState(initialPageSize);
  const pageStep = (() => {
    const env = process.env.NEXT_PUBLIC_LEARNING_PAGE_STEP;
    const n = env ? parseInt(env, 10) : initialPageSize;
    return Number.isFinite(n) && n > 0 && n <= 60 ? n : initialPageSize;
  })();
  const enableHoverPrefetch = (() => {
    const env = process.env.NEXT_PUBLIC_LEARNING_PREFETCH;
    if (env === 'false') return false;
    return true;
  })();

  const prefetchControllers = useRef<Map<string, AbortController>>(new Map());
  const prefetchedSlugs = useRef<Set<string>>(new Set());
  // const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  // 最近のリワード（認証時のみ取得可能）
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/learning/rewards/me?limit=10', { method: 'GET' })
        if (!res.ok) return
        const json = await res.json()
        if (json?.success && Array.isArray(json.data)) {
          type Reward = { at?: number; type?: string; tickets?: number }
          const rewards: Reward[] = json.data
            .filter((e: unknown): e is Reward => !!e && typeof e === 'object')
            .map((e: Reward) => ({ at: e.at, type: e.type ?? 'unknown', tickets: e.tickets }))
          setRecentRewards(rewards as Array<{ at?: number; type: string; tickets?: number }>)
        }
      } catch {
        // ignore
      }
    })()
  }, [])

  const loadData = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      const { data: session } = await supabase.auth.getSession();

      if (user) {
        const controller = new AbortController();
        try {
          const headers: HeadersInit = session?.session?.access_token
            ? { authorization: `Bearer ${session.session.access_token}` }
            : {};
          const [catRes, lessonRes] = await Promise.all([
            fetch('/api/learning/categories', { headers, signal: controller.signal }),
            fetch('/api/learning/lessons?limit=500', { headers, signal: controller.signal })
          ]);

          const cats = await catRes.json();
          const lessonsJson = await lessonRes.json();
          const fetchedCategories: LessonCategory[] = Array.isArray(cats)
            ? cats
            : Array.isArray(cats.categories) ? cats.categories : [];
          const fetchedLessons: Lesson[] = Array.isArray(lessonsJson.lessons)
            ? lessonsJson.lessons
            : Array.isArray(lessonsJson) ? lessonsJson : [];

          setCategories(fetchedCategories);
          setLessons(fetchedLessons);
          // 簡易統計（サーバ統計が無い場合のフォールバック）
          setStats(prev => prev ?? {
            completedLessons: 0,
            totalLessons: fetchedLessons.length,
            totalCompletedLessons: 0,
            inProgressLessons: 0,
            totalTimeSpent: 0,
            averageScore: 0,
            currentStreak: 0,
            achievements: []
          });
        } finally {
          // no-op: AbortControllerはアンマウント時に自動解放
        }
      } else {
        // 未ログイン時は軽量モック（初期表示を軽く）
        const now = new Date();
        setCategories([
          { id: 'crypto-basics', name: '暗号通貨基礎', icon: '₿', description: '暗号通貨の基本概念', orderIndex: 1, createdAt: now, updatedAt: now },
          { id: 'trading', name: 'トレーディング', icon: '📈', description: 'トレーディング戦略', orderIndex: 2, createdAt: now, updatedAt: now },
          { id: 'defi', name: 'DeFi', icon: '🏦', description: '分散型金融', orderIndex: 3, createdAt: now, updatedAt: now },
        ]);
        setLessons([
          { id: '1', categoryId: 'crypto-basics', title: 'ビットコインとは何か？', slug: 'what-is-bitcoin', description: 'ビットコインの基本概念と仕組みを学びます', difficultyLevel: 'beginner', estimatedMinutes: 15, orderIndex: 1, content: { sections: [], keyPoints: [], summary: '' } },
          { id: '3', categoryId: 'trading', title: 'テクニカル分析入門', slug: 'technical-analysis-basics', description: 'チャートの読み方とテクニカル指標の基礎', difficultyLevel: 'intermediate', estimatedMinutes: 30, orderIndex: 1, content: { sections: [], keyPoints: [], summary: '' } },
          { id: '4', categoryId: 'defi', title: 'DeFiプロトコルの使い方', slug: 'defi-protocols-guide', description: '主要DeFiプロトコルの使用方法', difficultyLevel: 'intermediate', estimatedMinutes: 25, orderIndex: 1, content: { sections: [], keyPoints: [], summary: '' } },
        ] as Lesson[]);
      }
    } catch (error) {
      console.error('Failed to load learning data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProgressForLesson = (lessonId: string) => {
    return userProgress.find(p => p.lessonId === lessonId);
  };

  const filteredLessons = useMemo(() => {
    const base = selectedCategory === 'all' ? lessons : lessons.filter(lesson => lesson.categoryId === selectedCategory);
    return base.slice(0, visibleCount);
  }, [lessons, selectedCategory, visibleCount]);

  useEffect(() => {
    const mapSnapshot = new Map(prefetchControllers.current);
    return () => {
      mapSnapshot.forEach((controller) => {
        try { controller.abort(); } catch {}
      });
      mapSnapshot.clear();
    };
  }, []);

  const handleHoverPrefetch = (slug: string) => {
    if (!enableHoverPrefetch || !slug || prefetchedSlugs.current.has(slug)) return;
    if (prefetchControllers.current.has(slug)) return;
    try {
      const controller = new AbortController();
      prefetchControllers.current.set(slug, controller);
      // 軽量プリフェッチ（結果は破棄するがHTTPキャッシュに乗る）
      fetch(`/api/learning/lessons/${encodeURIComponent(slug)}`, { signal: controller.signal })
        .then(() => {
          prefetchedSlugs.current.add(slug);
        })
        .catch(() => {})
        .finally(() => {
          prefetchControllers.current.delete(slug);
        });
    } catch {
      // ignore
    }
  };

  if (loading) {
    return <LearningPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* 背景装飾 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* ヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div>
            <motion.h1 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-2 sm:p-3 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex-shrink-0">
                <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              </div>
              <span className="break-words">学習センター</span>
            </motion.h1>
            <motion.p 
              className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg leading-relaxed"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="hidden sm:inline">暗号通貨投資の基礎から応用まで、体系的に学べる包括的学習プラットフォーム</span>
              <span className="sm:hidden">暗号通貨投資を体系的に学べる学習プラットフォーム</span>
            </motion.p>
          </div>
        </motion.div>

        {/* 学習統計 */}
        {stats && (
          <motion.div 
            className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* 完了レッスン */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative p-4 sm:p-6">
                  <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">完了レッスン</CardTitle>
                  <div className="p-1.5 sm:p-2 rounded-full bg-green-100">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  </div>
                </CardHeader>
                <CardContent className="relative p-4 sm:p-6 pt-0">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                    <AnimatedCounter end={stats.completedLessons} />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                    <span className="hidden sm:inline">全{stats.totalLessons}レッスン中</span>
                    <span className="sm:hidden">/{stats.totalLessons}</span>
                  </p>
                  <Progress value={(stats.completedLessons / 85) * 100} className="h-1.5 sm:h-2" />
                </CardContent>
              </Card>
            </motion.div>

            {/* 学習時間 */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative p-4 sm:p-6">
                  <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">学習時間</CardTitle>
                  <div className="p-1.5 sm:p-2 rounded-full bg-blue-100">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent className="relative p-4 sm:p-6 pt-0">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                    <AnimatedCounter end={Math.floor(stats.totalTimeSpent / 3600)} /><span className="text-lg sm:text-2xl">時間</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {Math.floor((stats.totalTimeSpent % 3600) / 60)}分
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* 連続学習 */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative p-4 sm:p-6">
                  <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">連続学習</CardTitle>
                  <div className="p-1.5 sm:p-2 rounded-full bg-orange-100">
                    <Flame className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                  </div>
                </CardHeader>
                <CardContent className="relative p-4 sm:p-6 pt-0">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                    <AnimatedCounter end={stats.currentStreak} /><span className="text-lg sm:text-2xl">日</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    <span className="hidden sm:inline">現在のストリーク 🔥</span>
                    <span className="sm:hidden">ストリーク 🔥</span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* 実績 */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all relative overflow-hidden sm:col-span-2 lg:col-span-1">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative p-4 sm:p-6">
                  <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">実績</CardTitle>
                  <div className="p-1.5 sm:p-2 rounded-full bg-purple-100">
                    <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                  </div>
                </CardHeader>
                <CardContent className="relative p-4 sm:p-6 pt-0">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                    <AnimatedCounter end={stats.achievements.length} />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    <span className="hidden sm:inline">獲得バッジ ⭐</span>
                    <span className="sm:hidden">バッジ ⭐</span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {/* モチベーション向上メッセージ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg sm:rounded-xl p-4 sm:p-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold mb-2">今日も学習を続けましょう！</h2>
              <p className="text-purple-100 text-sm sm:text-base leading-relaxed">
                <span className="hidden sm:inline">継続は力なり。毎日少しずつでも知識を積み重ねることで、投資スキルが飛躍的に向上します。</span>
                <span className="sm:hidden">継続は力なり。毎日の学習で投資スキルが向上します。</span>
              </p>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4 self-end sm:self-auto">
              <Star className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-300 animate-pulse" />
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-green-300" />
            </div>
          </div>
        </motion.div>

        {/* 最近のリワード */}
        {recentRewards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white/80 rounded-lg p-4 shadow-sm border"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold">最近のリワード</h3>
              <a href="/defi?tab=dashboard#risk-inspector" className="text-sm text-blue-600 hover:underline">DeFiで確認</a>
            </div>
            <ul className="text-sm text-gray-700 space-y-1">
              {recentRewards.slice(0,5).map((e, i) => (
                <li key={i} className="flex items-center justify-between">
                  <span>{e.type === 'category_test_grant' ? 'カテゴリ合格' : 'レッスン完了'}</span>
                  <span className="font-medium">+{typeof e.tickets === 'number' ? e.tickets : 0}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* メインビュー選択 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Tabs value={selectedView} onValueChange={(value) => setSelectedView(value as 'lessons' | 'achievements')}>
            <TabsList className="grid w-full grid-cols-2 bg-white/60 backdrop-blur-sm border-0 shadow-md h-12 sm:h-14 gap-1 p-1">
              <TabsTrigger 
                value="lessons" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-sm font-medium"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                レッスン
              </TabsTrigger>
              <TabsTrigger 
                value="achievements" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-sm font-medium"
              >
                <Trophy className="w-4 h-4 mr-2" />
                実績
              </TabsTrigger>
            </TabsList>

            {/* レッスンタブ */}
            <TabsContent value="lessons" className="mt-8">
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 bg-white/60 backdrop-blur-sm border-0 shadow-md h-12 sm:h-14 gap-1 p-1">
                  <TabsTrigger 
                    value="all" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-xs sm:text-sm font-medium px-2 sm:px-4"
                  >
                    <Book className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="hidden sm:inline">すべて</span>
                    <span className="sm:hidden">全部</span>
                  </TabsTrigger>
                  {categories.map((category, index) => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className={`data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-xs sm:text-sm font-medium px-1 sm:px-4 ${index >= 2 ? 'hidden sm:flex' : ''}`}
                    >
                      <span className="mr-1 text-sm sm:text-base">{category.icon}</span>
                      <span className="hidden md:inline">{category.name}</span>
                      <span className="md:hidden sm:inline text-xs">{category.name.slice(0, 3)}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                <AnimatePresence mode="wait">
                  <TabsContent value={selectedCategory} className="mt-8">
                    <motion.div 
                      className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {filteredLessons.map((lesson, index) => {
                        const progress = getProgressForLesson(lesson.id);
                        const isCompleted = progress?.status === 'completed';
                        const isInProgress = progress?.status === 'in_progress';

                        return (
                          <motion.div
                            key={lesson.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                          >
                            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all h-full group relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white/50 group-hover:from-purple-50/50 group-hover:to-blue-50/50 transition-all"></div>
                              
                              <CardHeader className="relative p-4 sm:p-6">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1 min-w-0">
                                    <CardTitle className="text-base sm:text-lg text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                                      {lesson.title}
                                    </CardTitle>
                                    <CardDescription className="mt-2 text-sm sm:text-base text-gray-600 line-clamp-2">
                                      {lesson.description}
                                    </CardDescription>
                                  </div>
                                  {isCompleted && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ type: "spring", stiffness: 500 }}
                                    >
                                      <Badge variant="default" className="ml-2 bg-green-100 text-green-700 hover:bg-green-200 text-xs sm:text-sm flex-shrink-0">
                                        <CheckCircle2 className="w-3 h-3 mr-1" />
                                        完了
                                      </Badge>
                                    </motion.div>
                                  )}
                                  {isInProgress && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ type: "spring", stiffness: 500 }}
                                    >
                                      <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700 text-xs sm:text-sm flex-shrink-0">
                                        <Zap className="w-3 h-3 mr-1" />
                                        進行中
                                      </Badge>
                                    </motion.div>
                                  )}
                                </div>
                              </CardHeader>
                              
                              <CardContent className="relative p-4 sm:p-6 pt-0">
                                <div className="space-y-3 sm:space-y-4">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                                      <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                        {lesson.estimatedMinutes}分
                                      </div>
                                      <Badge 
                                        variant="outline" 
                                        className={`border text-xs ${
                                          lesson.difficultyLevel === 'beginner' ? 'border-green-200 text-green-700 bg-green-50' :
                                          lesson.difficultyLevel === 'intermediate' ? 'border-yellow-200 text-yellow-700 bg-yellow-50' :
                                          'border-red-200 text-red-700 bg-red-50'
                                        }`}
                                      >
                                        {lesson.difficultyLevel === 'beginner' && '初級'}
                                        {lesson.difficultyLevel === 'intermediate' && '中級'}
                                        {lesson.difficultyLevel === 'advanced' && '上級'}
                                      </Badge>
                                    </div>
                                  </div>

                                  {progress && progress.progressPercentage > 0 && (
                                    <div className="space-y-2">
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">進捗</span>
                                        <span className="font-medium">{progress.progressPercentage}%</span>
                                      </div>
                                      <Progress value={progress.progressPercentage} className="h-2" />
                                    </div>
                                  )}

                                  <Link href={buildLessonPath(lesson.slug)} onMouseEnter={() => handleHoverPrefetch(lesson.slug)}>
                                    <Button 
                                      size="sm"
                                      className={`w-full transition-all text-xs sm:text-sm h-9 sm:h-10 ${
                                        isCompleted 
                                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600' 
                                          : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
                                      }`}
                                    >
                                      {isCompleted ? (
                                        <>
                                          <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                          <span className="hidden sm:inline">復習する</span>
                                          <span className="sm:hidden">復習</span>
                                        </>
                                      ) : isInProgress ? (
                                        <>
                                          <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                          <span className="hidden sm:inline">続きから学習</span>
                                          <span className="sm:hidden">続きから</span>
                                        </>
                                      ) : (
                                        <>
                                          <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                          <span className="hidden sm:inline">学習を開始</span>
                                          <span className="sm:hidden">開始</span>
                                        </>
                                      )}
                                    </Button>
                                  </Link>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                    {/* もっと見る */}
                    {filteredLessons.length < lessons.filter(l => selectedCategory === 'all' || l.categoryId === selectedCategory).length && (
                      <div className="mt-6 flex justify-center">
                        <Button variant="outline" onClick={() => startTransition(() => setVisibleCount(c => c + pageStep))} disabled={isPending}>
                          もっと表示
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </AnimatePresence>
              </Tabs>
            </TabsContent>

            {/* 実績タブ */}
            <TabsContent value="achievements" className="mt-8">
              {stats && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <AchievementsPanel
                    achievements={stats.achievements}
                    learningStats={stats}
                    className=""
                  />
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* 学習ガイド */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border-0"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center gap-2">
            <Target className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 flex-shrink-0" />
            <span>効果的な学習のコツ</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">継続的学習</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                <span className="hidden sm:inline">毎日少しずつでも継続することで、確実に知識が身に付きます</span>
                <span className="sm:hidden">毎日継続で知識が身に付きます</span>
              </p>
            </div>
            <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">実践的応用</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                <span className="hidden sm:inline">学んだ知識を実際の投資判断に活かしてみましょう</span>
                <span className="sm:hidden">学んだ知識を投資判断に活用</span>
              </p>
            </div>
            <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">復習の重要性</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                <span className="hidden sm:inline">完了したレッスンも定期的に復習することで理解が深まります</span>
                <span className="sm:hidden">完了レッスンの定期復習で理解が深まる</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
