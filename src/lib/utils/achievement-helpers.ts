import { AchievementType, UserAchievement } from '@/lib/types/learning';

// 実績メタデータの定義
export interface AchievementMetadata {
  title: string;
  description: string;
  icon: string;
  category: 'learning' | 'streak' | 'milestone' | 'mastery';
  difficulty: 'bronze' | 'silver' | 'gold' | 'platinum';
  points: number;
}

// 実績タイプごとのメタデータ
export const ACHIEVEMENT_METADATA: Record<AchievementType, AchievementMetadata> = {
  first_lesson: {
    title: '初心者',
    description: '最初のレッスンを完了しました',
    icon: '🎯',
    category: 'learning',
    difficulty: 'bronze',
    points: 10
  },
  lesson_complete: {
    title: 'レッスン修了',
    description: 'レッスンを完了しました',
    icon: '✅',
    category: 'learning',
    difficulty: 'bronze',
    points: 5
  },
  lesson_5: {
    title: '学習者',
    description: '5つのレッスンを完了しました',
    icon: '📚',
    category: 'learning',
    difficulty: 'bronze',
    points: 25
  },
  lesson_10: {
    title: '熱心な学習者',
    description: '10のレッスンを完了しました',
    icon: '🎓',
    category: 'learning',
    difficulty: 'silver',
    points: 50
  },
  lesson_25: {
    title: '学習マスター',
    description: '25のレッスンを完了しました',
    icon: '🏆',
    category: 'learning',
    difficulty: 'gold',
    points: 100
  },
  lesson_50: {
    title: '学習エキスパート',
    description: '50のレッスンを完了しました',
    icon: '💎',
    category: 'learning',
    difficulty: 'gold',
    points: 200
  },
  all_lessons_complete: {
    title: '完璧主義者',
    description: '全85レッスンを完了しました',
    icon: '👑',
    category: 'milestone',
    difficulty: 'platinum',
    points: 500
  },
  category_complete: {
    title: 'カテゴリーマスター',
    description: 'カテゴリーを完了しました',
    icon: '🏅',
    category: 'mastery',
    difficulty: 'silver',
    points: 75
  },
  streak: {
    title: 'ストリーク達成',
    description: '連続学習を達成しました',
    icon: '🔥',
    category: 'streak',
    difficulty: 'bronze',
    points: 15
  },
  streak_3_days: {
    title: '3日連続',
    description: '3日連続で学習しました',
    icon: '🔥',
    category: 'streak',
    difficulty: 'bronze',
    points: 30
  },
  streak_1_week: {
    title: '1週間ストリーク',
    description: '7日連続で学習しました',
    icon: '🚀',
    category: 'streak',
    difficulty: 'silver',
    points: 70
  },
  streak_2_weeks: {
    title: '2週間ストリーク',
    description: '14日連続で学習しました',
    icon: '⭐',
    category: 'streak',
    difficulty: 'silver',
    points: 140
  },
  streak_1_month: {
    title: '1ヶ月ストリーク',
    description: '30日連続で学習しました',
    icon: '🌟',
    category: 'streak',
    difficulty: 'gold',
    points: 300
  },
  streak_100_days: {
    title: '百日の計',
    description: '100日連続で学習しました',
    icon: '💫',
    category: 'streak',
    difficulty: 'platinum',
    points: 1000
  },
  quiz_perfect: {
    title: 'パーフェクト',
    description: 'クイズで満点を獲得しました',
    icon: '💯',
    category: 'mastery',
    difficulty: 'silver',
    points: 40
  },
  milestone: {
    title: 'マイルストーン',
    description: '重要な節目を達成しました',
    icon: '🎖️',
    category: 'milestone',
    difficulty: 'gold',
    points: 100
  }
};

// 実績メタデータを取得する関数
export function getAchievementMetadata(achievementType: AchievementType): AchievementMetadata {
  return ACHIEVEMENT_METADATA[achievementType];
}

// 実績を難易度別にソートする関数
export function sortAchievementsByDifficulty(achievements: UserAchievement[]): UserAchievement[] {
  const difficultyOrder = { 'platinum': 4, 'gold': 3, 'silver': 2, 'bronze': 1 };
  
  return achievements.sort((a, b) => {
    const metaA = getAchievementMetadata(a.achievementType);
    const metaB = getAchievementMetadata(b.achievementType);
    
    // 難易度でソート、同じ難易度なら獲得日時でソート
    const difficultyDiff = difficultyOrder[metaB.difficulty] - difficultyOrder[metaA.difficulty];
    if (difficultyDiff !== 0) return difficultyDiff;
    
    return new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime();
  });
}

// カテゴリー別に実績をグループ化する関数
export function groupAchievementsByCategory(achievements: UserAchievement[]): Record<string, UserAchievement[]> {
  const grouped: Record<string, UserAchievement[]> = {
    learning: [],
    streak: [],
    milestone: [],
    mastery: []
  };

  achievements.forEach(achievement => {
    const metadata = getAchievementMetadata(achievement.achievementType);
    if (metadata && metadata.category && grouped[metadata.category]) {
      grouped[metadata.category]!.push(achievement);
    }
  });

  return grouped;
}

// 実績の総ポイントを計算する関数
export function calculateTotalPoints(achievements: UserAchievement[]): number {
  return achievements.reduce((total, achievement) => {
    const metadata = getAchievementMetadata(achievement.achievementType);
    return total + metadata.points;
  }, 0);
}

// 実績の進捗率を計算する関数
export function calculateAchievementProgress(userAchievements: UserAchievement[]): {
  totalEarned: number;
  totalAvailable: number;
  progressPercentage: number;
  pointsEarned: number;
  maxPoints: number;
} {
  const allAchievementTypes = Object.keys(ACHIEVEMENT_METADATA) as AchievementType[];
  const totalAvailable = allAchievementTypes.length;
  const totalEarned = userAchievements.length;
  const progressPercentage = Math.round((totalEarned / totalAvailable) * 100);
  
  const pointsEarned = calculateTotalPoints(userAchievements);
  const maxPoints = allAchievementTypes.reduce((total, type) => {
    return total + ACHIEVEMENT_METADATA[type].points;
  }, 0);

  return {
    totalEarned,
    totalAvailable,
    progressPercentage,
    pointsEarned,
    maxPoints
  };
}

// レベルシステム：ポイントに基づいてユーザーレベルを計算
export function calculateUserLevel(totalPoints: number): {
  level: number;
  pointsToNextLevel: number;
  levelProgress: number;
  levelTitle: string;
} {
  const levelThresholds = [
    { level: 1, points: 0, title: '初心者' },
    { level: 2, points: 100, title: '学習者' },
    { level: 3, points: 300, title: '熱心な学習者' },
    { level: 4, points: 600, title: '学習マスター' },
    { level: 5, points: 1000, title: '学習エキスパート' },
    { level: 6, points: 1500, title: '学習の達人' },
    { level: 7, points: 2500, title: '暗号通貨マスター' },
    { level: 8, points: 4000, title: '投資エキスパート' },
    { level: 9, points: 6000, title: '投資の賢者' },
    { level: 10, points: 10000, title: '投資の神' }
  ];

  let currentLevel = levelThresholds[0]!;
  let nextLevel: (typeof levelThresholds)[number] | null = levelThresholds[1] || null;

  for (let i = 0; i < levelThresholds.length - 1; i++) {
    if (totalPoints >= levelThresholds[i]!.points && totalPoints < levelThresholds[i + 1]!.points) {
      currentLevel = levelThresholds[i]!;
      nextLevel = levelThresholds[i + 1] || null;
      break;
    } else if (totalPoints >= levelThresholds[levelThresholds.length - 1]!.points) {
      currentLevel = levelThresholds[levelThresholds.length - 1]!;
      nextLevel = null; // MAX レベル
      break;
    }
  }

  // nextLevelがnullの場合はMAXレベルとして扱う

  const pointsToNextLevel = nextLevel ? nextLevel.points - totalPoints : 0;
  const levelProgress = nextLevel
    ? Math.round(
        ((totalPoints - currentLevel.points) / (nextLevel.points - currentLevel.points)) * 100
      )
    : 100;

  return {
    level: currentLevel.level,
    pointsToNextLevel: Math.max(0, pointsToNextLevel),
    levelProgress: Math.max(0, Math.min(100, levelProgress)),
    levelTitle: currentLevel.title
  };
}

// 次に獲得可能な実績を提案する関数
export function suggestNextAchievements(
  userAchievements: UserAchievement[],
  completedLessons: number,
  currentStreak: number
): AchievementType[] {
  const earnedTypes = new Set(userAchievements.map(a => a.achievementType));
  const suggestions: AchievementType[] = [];

  // レッスン数ベースの提案
  const lessonMilestones = [
    { count: 1, type: 'first_lesson' as AchievementType },
    { count: 5, type: 'lesson_5' as AchievementType },
    { count: 10, type: 'lesson_10' as AchievementType },
    { count: 25, type: 'lesson_25' as AchievementType },
    { count: 50, type: 'lesson_50' as AchievementType },
    { count: 85, type: 'all_lessons_complete' as AchievementType }
  ];

  for (const milestone of lessonMilestones) {
    if (!earnedTypes.has(milestone.type) && completedLessons < milestone.count) {
      suggestions.push(milestone.type);
      break; // 次の目標のみ提案
    }
  }

  // ストリークベースの提案
  const streakMilestones = [
    { days: 3, type: 'streak_3_days' as AchievementType },
    { days: 7, type: 'streak_1_week' as AchievementType },
    { days: 14, type: 'streak_2_weeks' as AchievementType },
    { days: 30, type: 'streak_1_month' as AchievementType },
    { days: 100, type: 'streak_100_days' as AchievementType }
  ];

  for (const milestone of streakMilestones) {
    if (!earnedTypes.has(milestone.type) && currentStreak < milestone.days) {
      suggestions.push(milestone.type);
      break; // 次の目標のみ提案
    }
  }

  return suggestions;
}
