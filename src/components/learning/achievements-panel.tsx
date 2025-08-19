'use client'

import * as React from "react"
import { useCallback, useMemo, useState } from 'react'
import { UserAchievement, LearningStats } from '@/lib/types/learning';
// Mock achievement helpers
const groupAchievementsByCategory = (achievements: UserAchievement[]) => {
  const groups: Record<string, UserAchievement[]> = {
    learning: [],
    streak: [],
    milestone: [],
    mastery: []
  }
  
  achievements.forEach(achievement => {
    const category = achievement.achievementType.includes('lesson') ? 'learning' :
                    achievement.achievementType.includes('streak') ? 'streak' :
                    achievement.achievementType.includes('milestone') ? 'milestone' : 'mastery'
    groups[category].push(achievement)
  })
  
  return groups
}

const calculateAchievementProgress = (achievements: UserAchievement[]) => ({
  totalEarned: achievements.length,
  totalAvailable: 20,
  progressPercentage: Math.round((achievements.length / 20) * 100),
  pointsEarned: achievements.length * 100
})

const calculateUserLevel = (points: number) => ({
  level: Math.floor(points / 500) + 1,
  levelTitle: points > 1000 ? 'エキスパート' : points > 500 ? '中級者' : '初心者',
  levelProgress: (points % 500) / 5,
  pointsToNextLevel: 500 - (points % 500)
})

const suggestNextAchievements = (achievements: UserAchievement[], completedLessons: number, streak: number): string[] => {
  const suggestions = []
  if (completedLessons < 10) suggestions.push('lesson_10')
  if (streak < 7) suggestions.push('streak_7_days')
  return suggestions
}

const getAchievementMetadata = (type: string) => ({
  title: type === 'lesson_10' ? '10レッスン達成' : '7日連続学習',
  description: type === 'lesson_10' ? '10個のレッスンを完了する' : '7日間連続で学習する',
  icon: type === 'lesson_10' ? '📚' : '🔥',
  points: 100
})

// Mock achievement badge component
const AchievementBadge: React.FC<{
  achievement: UserAchievement
  size?: string
  showDetails?: boolean
}> = ({ achievement }) => (
  <div className="p-3 border rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 text-center">
    <div className="text-2xl mb-2">🏆</div>
    <div className="text-sm font-medium">{achievement.achievementName}</div>
    <div className="text-xs text-gray-500 mt-1">
      {achievement.earnedAt.toLocaleDateString()}
    </div>
  </div>
)
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Target, Zap, Award, Star } from 'lucide-react';

interface AchievementsPanelProps {
  achievements: UserAchievement[];
  learningStats: LearningStats;
  className?: string;
}

const AchievementsPanel: React.FC<AchievementsPanelProps> = ({
  achievements,
  learningStats,
  className = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // 実績をカテゴリー別にグループ化（メモ化）
  const groupedAchievements = useMemo(() => 
    groupAchievementsByCategory(achievements), 
    [achievements]
  );
  
  // 実績の進捗情報を計算（メモ化）
  const progress = useMemo(() => 
    calculateAchievementProgress(achievements), 
    [achievements]
  );
  
  // ユーザーレベル情報を計算（メモ化）
  const userLevel = useMemo(() => 
    calculateUserLevel(progress.pointsEarned), 
    [progress.pointsEarned]
  );
  
  // 次の目標実績を取得（メモ化）
  const nextAchievements = useMemo(() => 
    suggestNextAchievements(
      achievements,
      learningStats.completedLessons,
      learningStats.currentStreak
    ), 
    [achievements, learningStats.completedLessons, learningStats.currentStreak]
  );

  // カテゴリーアイコンのメモ化
  const categoryIcons = useMemo(() => ({
    learning: <Award className="w-4 h-4" />,
    streak: <Zap className="w-4 h-4" />,
    milestone: <Trophy className="w-4 h-4" />,
    mastery: <Star className="w-4 h-4" />
  }), []);

  // カテゴリー名のメモ化
  const categoryNames = useMemo(() => ({
    learning: '学習',
    streak: 'ストリーク',
    milestone: 'マイルストーン',
    mastery: '熟練度'
  }), []);

  // 実績グリッドレンダリング関数のメモ化
  const renderAchievementGrid = useCallback((categoryAchievements: UserAchievement[]) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {categoryAchievements.map((achievement) => (
        <AchievementBadge
          key={achievement.id}
          achievement={achievement}
          size="md"
          showDetails={false}
        />
      ))}
    </div>
  ), []);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* ユーザーレベルと総合情報 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                レベル {userLevel.level} - {userLevel.levelTitle}
              </CardTitle>
              <CardDescription>
                {progress.totalEarned} / {progress.totalAvailable} 実績獲得 ({progress.progressPercentage}%)
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                {progress.pointsEarned.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">ポイント</div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* レベル進捗バー */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>次のレベルまで</span>
              <span>{userLevel.pointsToNextLevel.toLocaleString()} pts</span>
            </div>
            <Progress value={userLevel.levelProgress} className="h-2" />
          </div>

          {/* 統計情報 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-blue-600">
                {learningStats.completedLessons}
              </div>
              <div className="text-xs text-gray-500">完了レッスン</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-orange-600">
                {learningStats.currentStreak}
              </div>
              <div className="text-xs text-gray-500">連続学習日</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-purple-600">
                {progress.totalEarned}
              </div>
              <div className="text-xs text-gray-500">獲得実績</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-green-600">
                {userLevel.level}
              </div>
              <div className="text-xs text-gray-500">現在レベル</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 次の目標 */}
      {nextAchievements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" />
              次の目標
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {nextAchievements.slice(0, 2).map((achievementType) => {
                const metadata = getAchievementMetadata(achievementType);
                return (
                  <div 
                    key={achievementType}
                    className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-lg">
                      {metadata.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{metadata.title}</div>
                      <div className="text-xs text-gray-500">{metadata.description}</div>
                      <div className="text-xs text-green-600 mt-1">
                        +{metadata.points} ポイント
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 実績一覧 */}
      <Card>
        <CardHeader>
          <CardTitle>獲得実績</CardTitle>
          <CardDescription>
            これまでに獲得した実績の一覧です
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all" className="text-xs">
                すべて
              </TabsTrigger>
              {Object.entries(categoryNames).map(([key, name]) => (
                <TabsTrigger key={key} value={key} className="text-xs">
                  <div className="flex items-center gap-1">
                    {categoryIcons[key as keyof typeof categoryIcons]}
                    <span className="hidden sm:inline">{name}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="mt-4">
              {achievements.length > 0 ? (
                renderAchievementGrid(achievements)
              ) : (
                <div className="text-center py-8 text-gray-500">
                  まだ実績がありません。学習を続けて実績を獲得しましょう！
                </div>
              )}
            </TabsContent>

            {Object.entries(groupedAchievements).map(([category, categoryAchievements]) => (
              <TabsContent key={category} value={category} className="mt-4">
                {categoryAchievements.length > 0 ? (
                  renderAchievementGrid(categoryAchievements)
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    この カテゴリーの実績はまだありません。
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AchievementsPanel;
