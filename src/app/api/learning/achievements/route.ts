// 🏆 学習実績・バッジAPI
// 実績管理・バッジシステム・学習ストリーク・レベルアップ

import { NextRequest, NextResponse } from 'next/server';
import { withApiHandler, ApiContext } from '@/lib/auth/middleware';
import { LearningService } from '@/lib/services/learning.service';
import { logger } from '@/lib/monitoring/logger';
import { z } from 'zod';

// バリデーションスキーマ
const getAchievementsSchema = z.object({
  category: z.enum(['all', 'lessons', 'streaks', 'quizzes', 'time', 'special']).default('all'),
  status: z.enum(['all', 'earned', 'available', 'locked']).default('all'),
  sortBy: z.enum(['earnedAt', 'rarity', 'category', 'difficulty']).default('earnedAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

const learningService = new LearningService();

// 軽量型
type AchievementReq = { type: 'lessons_completed' | 'streak' | 'study_time_hours' | 'quiz_correct'; count: number }
type AchievementBase = { id: string; category: string; title: string; description: string; icon: string; rarity: 'common'|'uncommon'|'rare'|'epic'|'legendary'; difficulty: 'easy'|'medium'|'hard'|'expert'; points: number; requirement: AchievementReq }
type AchievementWithStatus = AchievementBase & { status: 'earned'|'available'|'locked'; earnedAt?: string; progress: { current: number; required: number; progressPercentage: number; canEarn: boolean; remaining: number }; metadata?: Record<string, unknown> }
type UserStatsLite = { totalCompletedLessons: number; totalTimeSpent: number; totalCorrectAnswers?: number }

/**
 * ユーザー実績取得
 */
async function getUserAchievements(
  request: NextRequest,
  context: ApiContext
): Promise<NextResponse> {
  const { user } = context;
  
  try {
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    const validatedParams = getAchievementsSchema.parse(queryParams);

    // ユーザーの実績を取得
    const userAchievements = await learningService.getUserAchievements(user.id);
    
    // 全ての利用可能な実績を取得
    const allAchievements = await getAllAvailableAchievements();
    
    // ユーザーの進捗状況を取得
    const userStats = await learningService.getLearningStats(user.id);
    const currentStreak = await learningService.getCurrentStreak(user.id);
    
    // 実績の詳細情報を構築
    const normalizeRarity = (v: unknown): AchievementBase['rarity'] => {
      return v === 'common' || v === 'uncommon' || v === 'rare' || v === 'epic' || v === 'legendary' ? v : 'common'
    }
    const normalizeDifficulty = (v: unknown): AchievementBase['difficulty'] => {
      return v === 'easy' || v === 'medium' || v === 'hard' || v === 'expert' ? v : 'easy'
    }
    const normalizeRequirement = (r: unknown): AchievementReq => {
      const obj = (r as Record<string, unknown>) || {}
      const type = obj.type
      const count = obj.count
      const nt = (type === 'lessons_completed' || type === 'streak' || type === 'study_time_hours' || type === 'quiz_correct') ? type : 'lessons_completed'
      const nc = typeof count === 'number' ? count : 1
      return { type: nt, count: nc }
    }

    const achievementsArray: Array<unknown> = Array.isArray(allAchievements) ? allAchievements : []
    const achievementsWithStatus: AchievementWithStatus[] = achievementsArray.map((a) => {
      const achievement: AchievementBase = {
        id: String((a as Record<string, unknown>).id || ''),
        category: String((a as Record<string, unknown>).category || ''),
        title: String((a as Record<string, unknown>).title || ''),
        description: String((a as Record<string, unknown>).description || ''),
        icon: String((a as Record<string, unknown>).icon || ''),
        rarity: normalizeRarity((a as Record<string, unknown>).rarity),
        difficulty: normalizeDifficulty((a as Record<string, unknown>).difficulty),
        points: Number((a as Record<string, unknown>).points || 0),
        requirement: normalizeRequirement((a as Record<string, unknown>).requirement)
      }
      const userAchievement = userAchievements.find((ua: { achievementType: string; earnedAt?: string; metadata?: Record<string, unknown> }) => ua.achievementType === achievement.id);
      const progress = calculateAchievementProgress(achievement, userStats as UserStatsLite, currentStreak);
      return {
        ...achievement,
        status: userAchievement ? 'earned' : (progress.canEarn ? 'available' : 'locked'),
        earnedAt: userAchievement?.earnedAt,
        progress,
        metadata: userAchievement?.metadata
      }
    });

    // フィルタリング
    let filteredAchievements = achievementsWithStatus;
    
    if (validatedParams.category !== 'all') {
      filteredAchievements = filteredAchievements.filter((a: AchievementWithStatus) => a.category === validatedParams.category);
    }
    
    if (validatedParams.status !== 'all') {
      filteredAchievements = filteredAchievements.filter((a: AchievementWithStatus) => a.status === validatedParams.status);
    }

    // ソート
    filteredAchievements.sort((a, b) => {
      let comparison = 0;
      
      switch (validatedParams.sortBy) {
        case 'earnedAt':
          const aTime = a.earnedAt ? new Date(a.earnedAt).getTime() : 0;
          const bTime = b.earnedAt ? new Date(b.earnedAt).getTime() : 0;
          comparison = aTime - bTime;
          break;
        case 'rarity':
          comparison = getRarityScore(a.rarity) - getRarityScore(b.rarity);
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'difficulty':
          comparison = getDifficultyScore(a.difficulty) - getDifficultyScore(b.difficulty);
          break;
      }
      
      return validatedParams.sortOrder === 'desc' ? -comparison : comparison;
    });

    // 統計情報
  const stats = {
      total: allAchievements.length,
      earned: achievementsWithStatus.filter(a => a.status === 'earned').length,
      available: achievementsWithStatus.filter(a => a.status === 'available').length,
      locked: achievementsWithStatus.filter(a => a.status === 'locked').length,
      byCategory: groupAchievementsByCategory(achievementsWithStatus),
      byRarity: groupAchievementsByRarity(achievementsWithStatus),
      totalPoints: calculateTotalAchievementPoints(userAchievements),
      rank: await calculateUserRank(user.id),
      nextMilestone: findNextMilestone(userStats, achievementsWithStatus)
    };

    logger.info('User achievements retrieved', {
      userId: user.id,
      totalAchievements: allAchievements.length,
      earnedAchievements: stats.earned,
      category: validatedParams.category
    });

    return NextResponse.json({
      achievements: filteredAchievements,
      stats,
      user: {
        id: user.id,
        level: calculateUserLevel(userStats),
        experiencePoints: stats.totalPoints,
        currentStreak,
        totalLessonsCompleted: userStats.totalCompletedLessons
      }
    });

  } catch (error) {
    logger.error('Failed to get user achievements', {
      userId: user.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    throw error;
  }
}

/**
 * 学習ストリーク取得
 */
async function getLearningStreak(
  request: NextRequest,
  context: ApiContext
): Promise<NextResponse> {
  const { user } = context;
  
  try {
    const currentStreak = await learningService.getCurrentStreak(user.id);
  const longestStreak = await learningService.getLongestStreak(user.id);
  const streakHistory = await learningService.getStreakHistory(user.id);
    
    // ストリーク統計
    const streakStats = {
      current: currentStreak,
      longest: longestStreak,
      lastActiveDate: await learningService.getLastActiveDate(user.id),
      weeklyAverage: calculateWeeklyAverage(streakHistory),
      monthlyTotal: streakHistory.length,
      streakFreezesUsed: await getStreakFreezesUsed(user.id),
      streakFreezesAvailable: await getStreakFreezesAvailable(user.id)
    };

    // ストリーク関連の実績
    const streakAchievements = await getStreakAchievements(user.id, currentStreak, longestStreak);

    // ストリーク維持のヒント
  const tips = generateStreakTips(currentStreak, streakStats);

    logger.info('Learning streak retrieved', {
      userId: user.id,
      currentStreak,
      longestStreak
    });

    return NextResponse.json({
      streak: streakStats,
      history: streakHistory,
      achievements: streakAchievements,
      tips,
      calendar: generateStreakCalendar(streakHistory)
    });

  } catch (error) {
    logger.error('Failed to get learning streak', {
      userId: user.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    throw error;
  }
}

/**
 * リーダーボード取得
 */
async function getLeaderboard(
  request: NextRequest,
  context: ApiContext
): Promise<NextResponse> {
  const { user } = context;
  
  try {
    const url = new URL(request.url);
    const period = url.searchParams.get('period') || 'all_time'; // 'all_time', 'monthly', 'weekly'
    const category = url.searchParams.get('category') || 'achievements'; // 'achievements', 'lessons', 'streaks'
    
    // リーダーボードデータ取得
    const leaderboard = await generateLeaderboard(period, category);
    
    // ユーザーの順位取得
    const userRank = await getUserRankInLeaderboard(user.id, period, category);
    
    // 周辺の順位（前後5位）
    const nearbyRanks = await getNearbyRanks(user.id, period, category, 5);

    logger.info('Leaderboard retrieved', {
      userId: user.id,
      period,
      category,
      userRank: userRank?.rank
    });

    return NextResponse.json({
      leaderboard: leaderboard.slice(0, 100), // トップ100
      userRank,
      nearbyRanks,
      metadata: {
        period,
        category,
        totalParticipants: leaderboard.length,
        lastUpdated: new Date().toISOString()
      }
    });

  } catch (error) {
    logger.error('Failed to get leaderboard', {
      userId: user.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    throw error;
  }
}

/**
 * ヘルパー関数群
 */

/**
 * 利用可能な全実績取得
 */
async function getAllAvailableAchievements() {
  return [
    // レッスン完了実績
    {
      id: 'FIRST_LESSON',
      category: 'lessons',
      title: '学習開始',
      description: '最初のレッスンを完了する',
      icon: '🎯',
      rarity: 'common',
      difficulty: 'easy',
      points: 50,
      requirement: { type: 'lessons_completed', count: 1 }
    },
    {
      id: 'LESSONS_5',
      category: 'lessons',
      title: '基礎固め',
      description: '5つのレッスンを完了する',
      icon: '📚',
      rarity: 'common',
      difficulty: 'easy',
      points: 100,
      requirement: { type: 'lessons_completed', count: 5 }
    },
    {
      id: 'LESSONS_25',
      category: 'lessons',
      title: '学習者',
      description: '25のレッスンを完了する',
      icon: '🎓',
      rarity: 'uncommon',
      difficulty: 'medium',
      points: 250,
      requirement: { type: 'lessons_completed', count: 25 }
    },
    {
      id: 'LESSONS_50',
      category: 'lessons',
      title: '上級学習者',
      description: '50のレッスンを完了する',
      icon: '👨‍🎓',
      rarity: 'rare',
      difficulty: 'hard',
      points: 500,
      requirement: { type: 'lessons_completed', count: 50 }
    },
    {
      id: 'ALL_LESSONS',
      category: 'lessons',
      title: 'マスター',
      description: '全85レッスンを完了する',
      icon: '🏆',
      rarity: 'legendary',
      difficulty: 'expert',
      points: 1000,
      requirement: { type: 'lessons_completed', count: 85 }
    },

    // ストリーク実績
    {
      id: 'STREAK_7',
      category: 'streaks',
      title: '1週間継続',
      description: '7日連続で学習する',
      icon: '🔥',
      rarity: 'common',
      difficulty: 'medium',
      points: 150,
      requirement: { type: 'streak', count: 7 }
    },
    {
      id: 'STREAK_30',
      category: 'streaks',
      title: '1ヶ月継続',
      description: '30日連続で学習する',
      icon: '🌟',
      rarity: 'rare',
      difficulty: 'hard',
      points: 500,
      requirement: { type: 'streak', count: 30 }
    },
    {
      id: 'STREAK_100',
      category: 'streaks',
      title: '習慣マスター',
      description: '100日連続で学習する',
      icon: '💎',
      rarity: 'legendary',
      difficulty: 'expert',
      points: 1500,
      requirement: { type: 'streak', count: 100 }
    },

    // クイズ実績
    {
      id: 'QUIZ_PERFECT',
      category: 'quizzes',
      title: '完璧主義者',
      description: 'クイズで10回連続満点を取る',
      icon: '💯',
      rarity: 'uncommon',
      difficulty: 'medium',
      points: 300,
      requirement: { type: 'perfect_quizzes', count: 10 }
    },
    {
      id: 'QUIZ_MASTER',
      category: 'quizzes',
      title: 'クイズマスター',
      description: '100個のクイズに正解する',
      icon: '🧠',
      rarity: 'rare',
      difficulty: 'hard',
      points: 600,
      requirement: { type: 'quiz_correct', count: 100 }
    },

    // 時間関連実績
    {
      id: 'STUDY_TIME_10H',
      category: 'time',
      title: '学習時間10時間',
      description: '累計10時間の学習時間を達成',
      icon: '⏰',
      rarity: 'common',
      difficulty: 'easy',
      points: 200,
      requirement: { type: 'study_time_hours', count: 10 }
    },
    {
      id: 'STUDY_TIME_100H',
      category: 'time',
      title: '学習時間100時間',
      description: '累計100時間の学習時間を達成',
      icon: '🕰️',
      rarity: 'rare',
      difficulty: 'hard',
      points: 800,
      requirement: { type: 'study_time_hours', count: 100 }
    },

    // 特別実績
    {
      id: 'EARLY_BIRD',
      category: 'special',
      title: '早起き学習者',
      description: '朝6時前に10回学習する',
      icon: '🌅',
      rarity: 'uncommon',
      difficulty: 'medium',
      points: 250,
      requirement: { type: 'early_morning_sessions', count: 10 }
    },
    {
      id: 'NIGHT_OWL',
      category: 'special',
      title: '夜型学習者',
      description: '夜10時以降に20回学習する',
      icon: '🦉',
      rarity: 'uncommon',
      difficulty: 'medium',
      points: 250,
      requirement: { type: 'late_night_sessions', count: 20 }
    },
    {
      id: 'WEEKEND_WARRIOR',
      category: 'special',
      title: '週末戦士',
      description: '週末に10週連続で学習する',
      icon: '⚔️',
      rarity: 'rare',
      difficulty: 'hard',
      points: 400,
      requirement: { type: 'weekend_streak', count: 10 }
    }
  ];
}

/**
 * 実績進捗計算
 */
function calculateAchievementProgress(achievement: AchievementBase, userStats: UserStatsLite, currentStreak: number) {
  const requirement = achievement.requirement;
  let currentValue = 0;
  let canEarn = false;

  switch (requirement.type) {
    case 'lessons_completed':
      currentValue = userStats.totalCompletedLessons;
      break;
    case 'streak':
      currentValue = currentStreak;
      break;
    case 'study_time_hours':
      currentValue = Math.floor(userStats.totalTimeSpent / 60);
      break;
    case 'quiz_correct':
      currentValue = userStats.totalCorrectAnswers || 0;
      break;
    default:
      currentValue = 0;
  }

  canEarn = currentValue >= requirement.count;
  const progressPercentage = Math.min(100, Math.round((currentValue / requirement.count) * 100));

  return {
    current: currentValue,
    required: requirement.count,
    progressPercentage,
    canEarn,
    remaining: Math.max(0, requirement.count - currentValue)
  };
}

/**
 * レアリティスコア取得
 */
function getRarityScore(rarity: string): number {
  const scores = { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 };
  return scores[rarity as keyof typeof scores] || 1;
}

/**
 * 難易度スコア取得
 */
function getDifficultyScore(difficulty: string): number {
  const scores = { easy: 1, medium: 2, hard: 3, expert: 4 };
  return scores[difficulty as keyof typeof scores] || 1;
}

/**
 * カテゴリ別実績グループ化
 */
function groupAchievementsByCategory(achievements: AchievementWithStatus[]) {
  return achievements.reduce<Record<string, { total: number; earned: number }>>((groups, achievement) => {
    const category = achievement.category;
    if (!groups[category]) {
      groups[category] = { total: 0, earned: 0 };
    }
    groups[category].total++;
    if (achievement.status === 'earned') {
      groups[category].earned++;
    }
    return groups;
  }, {});
}

/**
 * レアリティ別実績グループ化
 */
function groupAchievementsByRarity(achievements: AchievementWithStatus[]) {
  return achievements.reduce<Record<string, { total: number; earned: number }>>((groups, achievement) => {
    const rarity = achievement.rarity;
    if (!groups[rarity]) {
      groups[rarity] = { total: 0, earned: 0 };
    }
    groups[rarity].total++;
    if (achievement.status === 'earned') {
      groups[rarity].earned++;
    }
    return groups;
  }, {});
}

/**
 * 実績ポイント合計計算
 */
function calculateTotalAchievementPoints(userAchievements: Array<{ points?: number }>): number {
  return userAchievements.reduce<number>((total, achievement) => {
    return total + (achievement.points || 0);
  }, 0);
}

/**
 * ユーザーランク計算
 */
async function calculateUserRank(userId: string): Promise<number> {
  // 実際の実装では、全ユーザーの実績ポイントを比較
  return Math.floor(Math.random() * 1000) + 1; // 仮の実装
}

/**
 * 次のマイルストーン検索
 */
function findNextMilestone(_userStats: UserStatsLite, achievements: AchievementWithStatus[]) {
  const availableAchievements = achievements.filter((a: AchievementWithStatus) => a.status === 'available');
  if (availableAchievements.length === 0) return null;

  // 進捗が最も高い実績を返す
  return availableAchievements.reduce<AchievementWithStatus>((best, current) => {
    return current.progress.progressPercentage > best.progress.progressPercentage ? current : best;
  }, availableAchievements[0]);
}

/**
 * ユーザーレベル計算
 */
function calculateUserLevel(userStats: UserStatsLite): number {
  const completedLessons = userStats.totalCompletedLessons;
  
  if (completedLessons < 5) return 1;
  if (completedLessons < 15) return 2;
  if (completedLessons < 35) return 3;
  if (completedLessons < 60) return 4;
  if (completedLessons >= 85) return 6;
  return 5;
}

/**
 * 週平均計算
 */
function calculateWeeklyAverage(streakHistory: unknown[]): number {
  if (streakHistory.length === 0) return 0;
  
  const weeks = Math.ceil(streakHistory.length / 7);
  return Math.round((streakHistory.length / weeks) * 10) / 10;
}

/**
 * ストリーク関連実績取得
 */
async function getStreakAchievements(userId: string, currentStreak: number, longestStreak: number) {
  const achievements = await getAllAvailableAchievements();
  return achievements
    .filter(a => a.category === 'streaks')
    .map(a => ({
      ...a,
      earned: longestStreak >= a.requirement.count,
      progress: Math.min(100, Math.round((currentStreak / a.requirement.count) * 100))
    }));
}

/**
 * ストリークティップス生成
 */
function generateStreakTips(currentStreak: number, streakStats: unknown): string[] {
  const tips = [];
  
  if (currentStreak === 0) {
    tips.push("今日から学習を始めて、ストリークを構築しましょう！");
  } else if (currentStreak < 7) {
    tips.push("1週間継続まであと少しです。頑張りましょう！");
  } else if (currentStreak < 30) {
    tips.push("素晴らしいペースです。1ヶ月継続を目指しましょう！");
  }
  
  tips.push("毎日同じ時間に学習することで習慣化しやすくなります");
  tips.push("短時間でも継続することが重要です");
  
  return tips;
}

/**
 * ストリークカレンダー生成
 */
function generateStreakCalendar(streakHistory: Array<{ date?: string } | unknown>) {
  const calendar = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const dateStr = date.toISOString().split('T')[0];
  const hasActivity = streakHistory.some((h) => typeof (h as Record<string, unknown>)?.date === 'string' && (h as Record<string, unknown>).date === dateStr);
    
    calendar.push({
      date: dateStr,
      hasActivity,
      dayOfWeek: date.getDay()
    });
  }
  
  return calendar;
}

/**
 * リーダーボード生成
 */
async function generateLeaderboard(period: string, category: string) {
  // 実際の実装では、データベースから集計
  return Array.from({ length: 100 }, (_, i) => ({
    rank: i + 1,
    userId: `user_${i + 1}`,
    username: `学習者${i + 1}`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
    score: 1000 - i * 10,
    category,
    period
  }));
}

/**
 * ユーザーランク取得
 */
async function getUserRankInLeaderboard(userId: string, period: string, category: string) {
  // 実際の実装では、データベースから取得
  return {
    rank: Math.floor(Math.random() * 500) + 1,
    score: Math.floor(Math.random() * 1000),
    percentile: Math.floor(Math.random() * 100)
  };
}

/**
 * 周辺ランク取得
 */
async function getNearbyRanks(userId: string, period: string, category: string, range: number) {
  // 実際の実装では、ユーザーの周辺ランクを取得
  return Array.from({ length: range * 2 + 1 }, (_, i) => ({
    rank: 100 + i - range,
    userId: i === range ? userId : `user_${100 + i - range}`,
    username: i === range ? 'あなた' : `学習者${100 + i - range}`,
    score: 500 - i * 5,
    isCurrentUser: i === range
  }));
}

// ストリーク凍結関連（仮実装）
async function getStreakFreezesUsed(userId: string): Promise<number> {
  return 0; // 実際の実装では、データベースから取得
}

async function getStreakFreezesAvailable(userId: string): Promise<number> {
  return 3; // 実際の実装では、ユーザープランに基づいて計算
}

// API Route Handlers
export const GET = withApiHandler(getUserAchievements, {
  requireAuth: true,
  requireSubscription: false,
  rateLimitKey: 'learning-achievements'
});

export const OPTIONS = async () => {
  const originEnv = process.env.NEXT_PUBLIC_APP_ORIGIN || process.env.VERCEL_URL || 'http://localhost:3000';
  const allowOrigin = originEnv.startsWith('http') ? originEnv : `https://${originEnv}`;
  return new NextResponse(null, { 
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': allowOrigin,
      'Vary': 'Origin',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    }
  });
};

// ストリーク専用エンドポイント
export { getLearningStreak as getLearningStreakHandler };
export { getLeaderboard as getLeaderboardHandler };
