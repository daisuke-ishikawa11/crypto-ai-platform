'use client'

import * as React from "react"
import { UserAchievement } from '@/lib/types/learning';
import { getAchievementMetadata } from '@/lib/utils/achievement-helpers';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface AchievementBadgeProps {
  achievement: UserAchievement;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  achievement,
  size = 'md',
  showDetails = false
}) => {
  const metadata = getAchievementMetadata(achievement.achievementType);
  
  const sizeClasses = {
    sm: 'w-12 h-12 text-lg',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-20 h-20 text-3xl'
  };

  const difficultyColors = {
    bronze: 'from-amber-600 to-amber-800',
    silver: 'from-gray-400 to-gray-600',
    gold: 'from-yellow-400 to-yellow-600',
    platinum: 'from-purple-400 to-purple-600'
  };

  if (!showDetails) {
    return (
      <div
        className={`
          ${sizeClasses[size]} 
          rounded-full 
          bg-gradient-to-br ${difficultyColors[metadata.difficulty]}
          flex items-center justify-center
          shadow-lg
          border-2 border-white/20
          relative
          group
          cursor-pointer
        `}
        title={`${metadata.title} - ${metadata.description}`}
      >
        <span className="drop-shadow-sm">{metadata.icon}</span>
        
        {/* ツールチップ */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
          <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap">
            <div className="font-semibold">{metadata.title}</div>
            <div className="text-gray-300">{metadata.description}</div>
            <div className="text-yellow-400">+{metadata.points} pts</div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="transition-transform hover:scale-105 cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div
            className={`
              w-12 h-12 rounded-full 
              bg-gradient-to-br ${difficultyColors[metadata.difficulty]}
              flex items-center justify-center
              text-xl
              border-2 border-white/20
            `}
          >
            {metadata.icon}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm">{metadata.title}</h3>
              <Badge 
                variant="outline" 
                className={`
                  text-xs border-current
                  ${metadata.difficulty === 'bronze' ? 'text-amber-600 border-amber-600' : ''}
                  ${metadata.difficulty === 'silver' ? 'text-gray-500 border-gray-500' : ''}
                  ${metadata.difficulty === 'gold' ? 'text-yellow-500 border-yellow-500' : ''}
                  ${metadata.difficulty === 'platinum' ? 'text-purple-500 border-purple-500' : ''}
                `}
              >
                {metadata.difficulty}
              </Badge>
            </div>
            
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {metadata.description}
            </p>
            
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">
                {achievement.earnedAt.toLocaleDateString('ja-JP')}
              </span>
              <span className="text-xs font-semibold text-green-600">
                +{metadata.points} pts
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementBadge;