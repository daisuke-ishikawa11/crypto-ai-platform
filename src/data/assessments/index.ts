// カテゴリ別総合テスト統合インデックス

import { CategoryAssessment } from '@/lib/types/learning';

// 各カテゴリのテストをインポート
import { financialLiteracyAssessment } from './assessment-financial-literacy';
import { cryptoBasicsAssessment } from './assessment-crypto-basics';
import { tradingBasicsAssessment } from './assessment-trading-basics';
import { defiNftAssessment } from './assessment-defi-nft';
import { advancedInvestmentAssessment } from './assessment-advanced-investment';
import { riskManagementAssessment } from './assessment-risk-management';
import { regulationComplianceAssessment } from './assessment-regulation-compliance';
import { blockchainTechAssessment } from './assessment-blockchain-tech';

// 全カテゴリテストの配列
export const categoryAssessments: CategoryAssessment[] = [
  financialLiteracyAssessment,
  cryptoBasicsAssessment,
  tradingBasicsAssessment,
  defiNftAssessment,
  advancedInvestmentAssessment,
  riskManagementAssessment,
  regulationComplianceAssessment,
  blockchainTechAssessment,
];

// カテゴリIDでテストを取得
export const getAssessmentByCategory = (categoryId: string): CategoryAssessment | undefined => {
  return categoryAssessments.find(assessment => assessment.categoryId === categoryId);
};

// 難易度別テスト取得
export const getAssessmentsByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): CategoryAssessment[] => {
  return categoryAssessments.filter(assessment => assessment.difficultyLevel === difficulty);
};

// 公開済みテストのみ取得
export const getPublishedAssessments = (): CategoryAssessment[] => {
  return categoryAssessments.filter(assessment => assessment.isPublished);
};

// テスト統計情報
export const assessmentStatistics = {
  totalAssessments: categoryAssessments.length,
  totalQuestions: categoryAssessments.reduce((total, assessment) => total + assessment.questions.length, 0),
  totalPoints: categoryAssessments.reduce((total, assessment) => total + assessment.totalPoints, 0),
  averagePassingScore: Math.round(
    categoryAssessments.reduce((total, assessment) => total + assessment.passingScore, 0) / categoryAssessments.length
  ),
  difficultyDistribution: {
    beginner: categoryAssessments.filter(a => a.difficultyLevel === 'beginner').length,
    intermediate: categoryAssessments.filter(a => a.difficultyLevel === 'intermediate').length,
    advanced: categoryAssessments.filter(a => a.difficultyLevel === 'advanced').length,
  },
  estimatedTotalMinutes: categoryAssessments.reduce((total, assessment) => total + assessment.estimatedMinutes, 0),
};

// カテゴリ別テスト情報サマリー
export const assessmentSummary = categoryAssessments.map(assessment => ({
  id: assessment.id,
  categoryId: assessment.categoryId,
  title: assessment.title,
  questionCount: assessment.questions.length,
  totalPoints: assessment.totalPoints,
  passingScore: assessment.passingScore,
  estimatedMinutes: assessment.estimatedMinutes,
  difficultyLevel: assessment.difficultyLevel,
  isPublished: assessment.isPublished,
}));

// エクスポート用の個別テスト
export {
  financialLiteracyAssessment,
  cryptoBasicsAssessment,
  tradingBasicsAssessment,
  defiNftAssessment,
  advancedInvestmentAssessment,
  riskManagementAssessment,
  regulationComplianceAssessment,
  blockchainTechAssessment,
};