import { LoggerPort, UserTierPersistencePort } from './ports'
import { 
  UserExperienceLevel, 
  SubscriptionTier, 
  DeFiUserProfile, 
  FeatureLimitations,
  BeginnerProtocolInfo 
} from './types'

export class DeFiUserTierManager {
  private featureLimitations: Map<SubscriptionTier, FeatureLimitations> = new Map()
  private beginnerProtocols: Map<string, BeginnerProtocolInfo> = new Map()

  constructor(
    private readonly logger: LoggerPort,
    private readonly persistence: UserTierPersistencePort
  ) {
    this.initializeFeatureLimitations()
    this.initializeBeginnerProtocols()
  }

  private initializeFeatureLimitations(): void {
    this.featureLimitations.set(SubscriptionTier.FREE, {
      tier: SubscriptionTier.FREE,
      limitations: {
        protocolAccess: ['uniswap_v3', 'aave', 'compound'],
        advancedAnalytics: false,
        customAlerts: 3,
        portfolioSize: 5,
        historicalData: 7,
        riskAnalysis: 'basic',
        yieldPredictions: false,
        aiRecommendations: false,
        prioritySupport: false,
      },
    })
    this.featureLimitations.set(SubscriptionTier.PREMIUM, {
      tier: SubscriptionTier.PREMIUM,
      limitations: {
        protocolAccess: [],
        advancedAnalytics: true,
        customAlerts: 25,
        portfolioSize: 50,
        historicalData: 90,
        riskAnalysis: 'detailed',
        yieldPredictions: true,
        aiRecommendations: true,
        prioritySupport: false,
      },
    })
    this.featureLimitations.set(SubscriptionTier.PROFESSIONAL, {
      tier: SubscriptionTier.PROFESSIONAL,
      limitations: {
        protocolAccess: [],
        advancedAnalytics: true,
        customAlerts: -1,
        portfolioSize: -1,
        historicalData: 365,
        riskAnalysis: 'comprehensive',
        yieldPredictions: true,
        aiRecommendations: true,
        prioritySupport: true,
      },
    })
  }

  private initializeBeginnerProtocols(): void {
    this.beginnerProtocols.set('compound', {
      protocolId: 'compound',
      simpleName: 'Compound（レンディング）',
      description: 'あなたの暗号通貨を貸し出して、安定した利息を獲得できるサービスです',
      category: 'lending',
      riskLevel: 'low',
      minimumInvestment: 10,
      expectedReturn: '3-6% 年利',
      timeCommitment: 'ロックアップなし（いつでも引き出し可能）',
      easeOfUse: 2,
      pros: ['安定した利息収入', 'いつでも資金を引き出せる', '実績のあるプロトコル', '複数の通貨に対応'],
      cons: ['高収益は期待できない', 'ガス代がかかる', 'スマートコントラクトリスク'],
      whoItsFor: 'DeFi初心者で、安全に資産を運用したい方',
      howItWorks: ['ウォレットを接続する', '貸し出したい通貨と金額を選択', 'トランザクションを承認', '利息が自動的に蓄積される'],
      risks: [
        { type: 'スマートコントラクトリスク', explanation: 'プログラムのバグや脆弱性により資金を失う可能性', likelihood: 'low', impact: '投資金額の全額', mitigation: '小額から始めて、複数のプロトコルに分散投資' },
        { type: '市場リスク', explanation: '暗号通貨の価格変動により元本が減る可能性', likelihood: 'medium', impact: '市場状況により変動', mitigation: 'ステーブルコインの利用を検討' },
      ],
      gettingStarted: [
        { stepNumber: 1, title: 'ウォレットの準備', description: 'MetaMaskなどのウォレットを準備し、ETHとUSDCを用意', actionRequired: 'ウォレットアプリをダウンロード・設定', timeEstimate: '10-15分', tips: ['少額のETH（ガス代用）も必要', '最初は$50-100程度で始めることを推奨'] },
        { stepNumber: 2, title: 'Compound接続', description: 'Compound公式サイトでウォレットを接続', actionRequired: 'ウォレット接続の承認', timeEstimate: '2-3分', tips: ['必ず公式URLを確認', 'フィッシングサイトに注意'] },
        { stepNumber: 3, title: '資産の供給', description: 'USDCなどのステーブルコインから始める', actionRequired: '供給量を入力してトランザクション実行', timeEstimate: '5分', tips: ['最初は少額で試す', 'ガス代を考慮して金額を決定'] },
      ],
    })
    this.beginnerProtocols.set('aave', {
      protocolId: 'aave',
      simpleName: 'Aave（高機能レンディング）',
      description: '貸出・借入の両方ができる、より高機能なレンディングプロトコルです',
      category: 'lending',
      riskLevel: 'low',
      minimumInvestment: 25,
      expectedReturn: '2-7% 年利',
      timeCommitment: 'ロックアップなし',
      easeOfUse: 3,
      pros: ['多様な通貨に対応', '借入も可能', '業界最大手の安心感', 'フラッシュローン機能'],
      cons: ['機能が複雑', 'ガス代が高い', '借入時は清算リスク'],
      whoItsFor: 'DeFiにやや慣れ、より多様な戦略を試したい方',
      howItWorks: ['ウォレット接続', '資産を供給して利息獲得', '必要に応じて他の資産を借入', 'フラッシュローンで高度な戦略実行'],
      risks: [
        { type: '清算リスク（借入時）', explanation: '担保の価値が下がると強制的に清算される', likelihood: 'medium', impact: '担保資産の一部', mitigation: '健康率を常に監視、余裕のある担保比率を維持' },
      ],
      gettingStarted: [
        { stepNumber: 1, title: 'Compound経験後に', description: 'Compoundで基本を学んだ後にAaveを試すことを推奨', actionRequired: 'Compoundでの経験を積む', timeEstimate: '1-2週間', tips: ['無理せず段階的にステップアップ'] },
      ],
    })
  }

  async createOrUpdateUserProfile(userId: string, profileData: Partial<DeFiUserProfile>): Promise<DeFiUserProfile> {
    const defaultProfile: DeFiUserProfile = {
      userId,
      experienceLevel: UserExperienceLevel.BEGINNER,
      subscriptionTier: SubscriptionTier.FREE,
      riskTolerance: 'conservative',
      investmentGoals: [],
      preferredNetworks: ['ethereum' as unknown as import('./types').BlockchainNetwork],
      maxInvestmentAmount: 1000,
      completedTutorials: [],
      achievedBadges: [],
      preferences: {
        showEducationalContent: true,
        enableRiskWarnings: true,
        preferSimplifiedUI: true,
        notificationSettings: { tvlChanges: false, riskAlerts: true, yieldOpportunities: true, educationalContent: true, weeklyReports: true, email: true, push: false, frequency: 'weekly' },
      },
      onboardingProgress: { step: 1, completed: false },
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const finalProfile = { ...defaultProfile, ...profileData, updatedAt: new Date() }
    const saved = await this.persistence.upsertUserProfile(userId, finalProfile as unknown as Record<string, unknown>)
    this.logger.info('DeFi user profile created/updated', { userId, experienceLevel: finalProfile.experienceLevel, subscriptionTier: finalProfile.subscriptionTier })
    return saved as unknown as DeFiUserProfile
  }

  getFeatureLimitations(tier: SubscriptionTier): FeatureLimitations {
    return this.featureLimitations.get(tier) || this.featureLimitations.get(SubscriptionTier.FREE)!
  }

  checkFeatureAccess(
    userProfile: DeFiUserProfile,
    featureType: keyof FeatureLimitations['limitations'],
    requestedValue?: unknown,
  ): { allowed: boolean; reason?: string; upgradeRequired?: boolean } {
    const limitations = this.getFeatureLimitations(userProfile.subscriptionTier)
    const limit = limitations.limitations[featureType]
    switch (featureType) {
      case 'protocolAccess': {
        if (Array.isArray(limit) && limit.length > 0) {
          const hasAccess = (limit as string[]).includes(String(requestedValue))
          return { allowed: hasAccess, reason: hasAccess ? undefined : 'このプロトコルはプレミアム機能です', upgradeRequired: !hasAccess }
        }
        return { allowed: true }
      }
      case 'customAlerts': {
        if (typeof limit === 'number' && limit > 0) {
          const currentAlerts = Number(requestedValue ?? 0)
          const allowed = currentAlerts < limit
          return { allowed, reason: allowed ? undefined : `アラート設定上限（${limit}個）に達しています`, upgradeRequired: !allowed }
        }
        return { allowed: true }
      }
      case 'historicalData': {
        if (typeof limit === 'number') {
          const requestedDays = Number(requestedValue ?? 0)
          const allowed = requestedDays <= limit
          return { allowed, reason: allowed ? undefined : `履歴データは${limit}日間のみアクセス可能です`, upgradeRequired: !allowed }
        }
        return { allowed: true }
      }
      case 'advancedAnalytics':
      case 'yieldPredictions':
      case 'aiRecommendations':
        return { allowed: Boolean(limit), reason: limit ? undefined : 'プレミアム機能です', upgradeRequired: !limit }
      default:
        return { allowed: true }
    }
  }

  getBeginnerProtocolInfo(protocolId: string): BeginnerProtocolInfo | undefined {
    return this.beginnerProtocols.get(protocolId)
  }

  getRecommendedProtocols(experienceLevel: UserExperienceLevel): string[] {
    switch (experienceLevel) {
      case UserExperienceLevel.BEGINNER: return ['compound', 'aave']
      case UserExperienceLevel.INTERMEDIATE: return ['compound', 'aave', 'uniswap_v3', 'curve']
      case UserExperienceLevel.ADVANCED: return []
      default: return ['compound']
    }
  }

  async progressOnboarding(userId: string, completedStep: number): Promise<{ nextStep: number; isComplete: boolean; reward?: string }> {
    const profile = await this.persistence.getUserProfileByUserId(userId)
    if (!profile) throw new Error('User profile not found')
    const maxSteps = 5
    const nextStep = Math.min(completedStep + 1, maxSteps)
    const isComplete = nextStep >= maxSteps
    await this.persistence.updateOnboarding(userId, { step: nextStep, completed: isComplete, completedAt: isComplete ? new Date() : undefined })
    let reward: string | undefined
    if (isComplete) {
      reward = '🎉 オンボーディング完了！初心者バッジを獲得しました'
      const achieved = Array.isArray(profile.achieved_badges) ? (profile.achieved_badges as string[]) : []
      await this.persistence.updateCompletedTutorials(userId, [...achieved, 'onboarding_complete'])
    }
    this.logger.info('Onboarding progress updated', { userId, completedStep, nextStep, isComplete })
    return { nextStep, isComplete, reward }
  }

  async trackLearningProgress(userId: string, contentId: string, completed = false): Promise<void> {
    await this.persistence.updateCompletedTutorials(userId, completed ? [contentId] : [])
    this.logger.info('Learning progress tracked', { userId, contentId, completed })
  }

  async upgradeSubscription(userId: string, newTier: SubscriptionTier): Promise<{ success: boolean; message: string }> {
    try {
      await this.persistence.updateSubscriptionTier(userId, newTier)
      this.logger.info('Subscription upgraded', { userId, newTier })
      return { success: true, message: `プランが ${newTier} にアップグレードされました！` }
    } catch (error) {
      this.logger.error('Error upgrading subscription', { userId, newTier, error: error instanceof Error ? error.message : String(error) })
      return { success: false, message: 'アップグレードに失敗しました。サポートにお問い合わせください。' }
    }
  }

  async getUsageStatistics(userId: string): Promise<{ protocolsAccessed: number; alertsSet: number; analyticsViewed: number; upgradeRecommended: boolean; conversionScore: number; }> {
    try {
      const usage = await this.persistence.getUserUsage(userId)
      const protocolsAccessed = usage.length
      const alertsSet = usage.filter(u => u.feature_type === 'alert').length
      const analyticsViewed = usage.filter(u => u.feature_type === 'analytics').length
      let conversionScore = 0
      conversionScore += Math.min(protocolsAccessed * 20, 60)
      conversionScore += Math.min(alertsSet * 15, 30)
      conversionScore += Math.min(analyticsViewed * 2, 10)
      const upgradeRecommended = conversionScore >= 70
      return { protocolsAccessed, alertsSet, analyticsViewed, upgradeRecommended, conversionScore }
    } catch (error) {
      this.logger.error('Error getting usage statistics', { userId, error: error instanceof Error ? error.message : String(error) })
      return { protocolsAccessed: 0, alertsSet: 0, analyticsViewed: 0, upgradeRecommended: false, conversionScore: 0 }
    }
  }
}
