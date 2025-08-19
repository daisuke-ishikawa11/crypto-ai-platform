// Copied from src/lib/defi/types.ts for package export
// Keep in sync during extraction phase
// 🏦 DeFiダッシュボードシステム - 包括的型定義
// プロトコルダッシュボード、TVL、流動性、ガバナンス、リスク評価の統合システム

// DeFi Protocol identifier as union type for maximum compatibility
export type DeFiProtocol = 
  // DEX protocols
  | 'uniswap_v2' | 'uniswap_v3' | 'uniswap' 
  | 'sushiswap' | 'pancakeswap' | 'curve' | 'balancer'
  
  // Lending protocols  
  | 'compound' | 'aave' | 'maker' | 'cream'
  
  // Yield Farming protocols
  | 'yearn' | 'harvest' | 'convex'
  
  // Derivatives protocols
  | 'synthetix' | 'perpetual'
  
  // Insurance protocols
  | 'nexus_mutual' | 'cover'
  
  // Cross-chain protocols
  | 'polygon' | 'arbitrum' | 'optimism' | 'avalanche'

// Legacy enum for backward compatibility
export enum DeFiProtocolEnum {
  // DEX
  UNISWAP_V2 = 'uniswap_v2',
  UNISWAP_V3 = 'uniswap_v3',
  UNISWAP = 'uniswap',
  SUSHISWAP = 'sushiswap',
  PANCAKESWAP = 'pancakeswap',
  CURVE = 'curve',
  BALANCER = 'balancer',
  
  // Lending
  COMPOUND = 'compound',
  AAVE = 'aave',
  MAKER = 'maker',
  CREAM = 'cream',
  
  // Yield Farming
  YEARN = 'yearn',
  HARVEST = 'harvest',
  CONVEX = 'convex',
  
  // Derivatives
  SYNTHETIX = 'synthetix',
  PERPETUAL = 'perpetual',
  
  // Insurance
  NEXUS_MUTUAL = 'nexus_mutual',
  COVER = 'cover',
  
  // Cross-chain
  POLYGON = 'polygon',
  ARBITRUM = 'arbitrum',
  OPTIMISM = 'optimism',
  AVALANCHE = 'avalanche'
}

export enum BlockchainNetwork {
  ETHEREUM = 'ethereum',
  POLYGON = 'polygon',
  BSC = 'bsc',
  ARBITRUM = 'arbitrum',
  OPTIMISM = 'optimism',
  AVALANCHE = 'avalanche',
  FANTOM = 'fantom',
  SOLANA = 'solana'
}

export enum DeFiRiskLevel {
  VERY_LOW = 'very_low',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very_high',
  CRITICAL = 'critical'
}

export enum LiquidityPoolType {
  STANDARD = 'standard',
  WEIGHTED = 'weighted',
  STABLE = 'stable',
  CONCENTRATED = 'concentrated',
  META = 'meta',
  EXOTIC = 'exotic'
}

export interface ProtocolInfo {
  id: string;
  name: string;
  protocol: DeFiProtocol;
  network: BlockchainNetwork;
  contractAddress: string;
  website: string;
  documentation: string;
  auditReports: AuditReport[];
  category: string[];
  tags: string[];
  description: string;
  logoUrl: string;
  tvl: number;
  volume24h: number;
  users24h: number;
  transactions24h: number;
  riskScore: number;
  riskLevel: DeFiRiskLevel;
  riskFactors: RiskFactor[];
  lastUpdated: Date;
  dataSource: string;
}

export interface AuditReport {
  id: string;
  auditor: string;
  reportUrl: string;
  auditDate: Date;
  score: number;
  findings: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  status: 'passed' | 'failed' | 'partial';
}

export interface RiskFactor {
  type: 'smart_contract' | 'liquidity' | 'market' | 'governance' | 'regulatory' | 'technical';
  severity: DeFiRiskLevel;
  description: string;
  impact: number;
  likelihood: number;
  mitigation?: string;
}

export interface TVLData {
  protocolId: string;
  protocol: DeFiProtocol;
  network: BlockchainNetwork;
  totalTVL: number;
  tvlUSD: number;
  tvlETH: number;
  tvlBTC: number;
  tvlHistory: TVLHistoryPoint[];
  tokenBreakdown: TokenTVL[];
  poolBreakdown: PoolTVL[];
  change24h: number;
  change7d: number;
  change30d: number;
  changePercent24h: number;
  changePercent7d: number;
  changePercent30d: number;
  rank: number;
  marketShare: number;
  timestamp: Date;
}

export interface TVLHistoryPoint {
  timestamp: Date;
  tvl: number;
  tvlUSD: number;
  volume: number;
  transactions: number;
}

export interface TokenTVL {
  tokenAddress: string;
  symbol: string;
  name: string;
  amount: number;
  valueUSD: number;
  percentage: number;
  price: number;
}

export interface PoolTVL {
  poolId: string;
  poolAddress: string;
  name: string;
  type: LiquidityPoolType;
  tvl: number;
  tvlUSD: number;
  volume24h: number;
  apy: number;
  tokens: TokenTVL[];
  fees: {
    fee24h: number;
    feeRate: number;
  };
}

export interface LiquidityPool {
  id: string;
  protocol: DeFiProtocol;
  network: BlockchainNetwork;
  address: string;
  name: string;
  type: LiquidityPoolType;
  tokens: PoolToken[];
  totalLiquidity: number;
  liquidityUSD: number;
  volume24h: number;
  volume7d: number;
  volume30d: number;
  trades24h: number;
  apy: number;
  apr: number;
  rewards: RewardInfo[];
  fees: FeeStructure;
  impermanentLoss: number;
  liquidityRisk: DeFiRiskLevel;
  smartContractRisk: DeFiRiskLevel;
  tokenPrices: Record<string, number>;
  priceImpact: PriceImpact[];
  lpTokens: {
    totalSupply: number;
    price: number;
    symbol: string;
  };
  timestamp: Date;
}

export interface PoolToken {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  balance: number;
  weight: number;
  reserveUSD: number;
}

export interface RewardInfo {
  tokenAddress: string;
  symbol: string;
  rewardRate: number;
  rewardPerDay: number;
  rewardValueUSD: number;
  distributionEnd?: Date;
}

export interface FeeStructure {
  tradingFee: number;
  withdrawalFee: number;
  performanceFee: number;
  managementFee: number;
  totalFee: number;
}

export interface PriceImpact {
  tradeSize: number;
  priceImpact: number;
  slippage: number;
}

export interface StakingInfo {
  id: string;
  protocol: DeFiProtocol;
  network: BlockchainNetwork;
  stakingToken: string;
  rewardToken: string;
  contractAddress: string;
  totalStaked: number;
  totalStakedUSD: number;
  stakerCount: number;
  apy: number;
  apr: number;
  dailyRewards: number;
  rewardRate: number;
  lockPeriod: number;
  unstakingPeriod: number;
  penalty: number;
  slashingRisk: boolean;
  slashingRate?: number;
  timestamp: Date;
}

export interface GovernanceInfo {
  protocolId: string;
  protocol: DeFiProtocol;
  governanceTokenAddress: string;
  governanceTokenSymbol: string;
  totalSupply: number;
  circulatingSupply: number;
  marketCap: number;
  price: number;
  votingPower: { minRequired: number; quorum: number; threshold: number };
  activeProposals: Proposal[];
  proposalHistory: ProposalHistory[];
  voterCount: number;
  delegateCount: number;
  averageParticipation: number;
  timestamp: Date;
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  status: 'pending' | 'active' | 'succeeded' | 'defeated' | 'queued' | 'executed' | 'cancelled';
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  totalVotes: number;
  quorumReached: boolean;
  startTime: Date;
  endTime: Date;
  eta?: Date;
  category: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  tags: string[];
}

export interface ProposalHistory {
  id: string;
  title: string;
  status: string;
  votesFor: number;
  votesAgainst: number;
  executedAt?: Date;
  impact: string;
}

export interface YieldFarmInfo {
  id: string;
  protocol: DeFiProtocol;
  network: BlockchainNetwork;
  name: string;
  farmAddress: string;
  stakingToken: string;
  rewardTokens: string[];
  apy: number;
  apr: number;
  baseApy: number;
  rewardApy: number;
  totalStaked: number;
  totalStakedUSD: number;
  participantCount: number;
  dailyRewards: RewardInfo[];
  rewardMultiplier: number;
  boostMultiplier?: number;
  autoCompound: boolean;
  compoundFrequency?: number;
  compoundingFee?: number;
  lockPeriod: number;
  withdrawalFee: number;
  impermanentLossRisk: DeFiRiskLevel;
  timestamp: Date;
}

export interface GasInfo {
  network: BlockchainNetwork;
  gasPrice: number;
  gasPriceUSD: number;
  slow: { gasPrice: number; estimatedTime: number };
  standard: { gasPrice: number; estimatedTime: number };
  fast: { gasPrice: number; estimatedTime: number };
  priceHistory: GasPriceHistory[];
  networkCongestion: 'low' | 'medium' | 'high' | 'critical';
  pendingTransactions: number;
  blockUtilization: number;
  timestamp: Date;
}

export interface GasPriceHistory {
  timestamp: Date;
  gasPrice: number;
  networkCongestion: string;
  blockUtilization: number;
}

export interface DeFiMarketOverview {
  totalTVL: number;
  totalVolume24h: number;
  totalUsers: number;
  totalTransactions: number;
  protocolCount: number;
  protocolsByCategory: Record<string, number>;
  topProtocols: ProtocolRanking[];
  networkDistribution: NetworkStats[];
  crossChainVolume: number;
  tvlChange24h: number;
  tvlChange7d: number;
  tvlChange30d: number;
  dominanceIndex: number;
  newProtocols30d: number;
  activeGovernance: number;
  avgAPY: number;
  timestamp: Date;
}

export interface ProtocolRanking {
  rank: number;
  protocolId: string;
  name: string;
  tvl: number;
  change24h: number;
  marketShare: number;
}

export interface NetworkStats {
  network: BlockchainNetwork;
  tvl: number;
  protocolCount: number;
  volume24h: number;
  marketShare: number;
}

export interface DeFiRiskAssessment {
  protocolId: string;
  protocol: DeFiProtocol;
  overallScore: number;
  riskLevel: DeFiRiskLevel;
  smartContractRisk: RiskCategory;
  liquidityRisk: RiskCategory;
  marketRisk: RiskCategory;
  governanceRisk: RiskCategory;
  regulatoryRisk: RiskCategory;
  operationalRisk: RiskCategory;
  riskFactors: DetailedRiskFactor[];
  recommendations: string[];
  peerComparison: PeerRiskComparison[];
  riskHistory: RiskHistoryPoint[];
  timestamp: Date;
}

export interface RiskCategory {
  score: number;
  level: DeFiRiskLevel;
  weight: number;
  factors: string[];
  mitigation: string[];
}

export interface DetailedRiskFactor {
  id: string;
  category: string;
  name: string;
  description: string;
  impact: number;
  likelihood: number;
  severity: DeFiRiskLevel;
  mitigation?: string;
  references: string[];
}

export interface PeerRiskComparison {
  protocolId: string;
  protocolName: string;
  riskScore: number;
  riskLevel: DeFiRiskLevel;
  category: string;
}

export interface RiskHistoryPoint {
  timestamp: Date;
  overallScore: number;
  smartContractScore: number;
  liquidityScore: number;
  marketScore: number;
  events?: string[];
}

export enum UserExperienceLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced'
}

export enum SubscriptionTier {
  FREE = 'free',
  PREMIUM = 'premium',
  PROFESSIONAL = 'professional'
}

export interface DeFiUserProfile {
  userId: string
  experienceLevel: UserExperienceLevel
  subscriptionTier: SubscriptionTier
  riskTolerance: 'conservative' | 'moderate' | 'aggressive'
  investmentGoals: string[]
  preferredNetworks: BlockchainNetwork[]
  maxInvestmentAmount: number
  completedTutorials: string[]
  achievedBadges: string[]
  preferences: {
    showEducationalContent: boolean
    enableRiskWarnings: boolean
    preferSimplifiedUI: boolean
    notificationSettings: NotificationPreferences
  }
  onboardingProgress: {
    step: number
    completed: boolean
    completedAt?: Date
  }
  createdAt: Date
  updatedAt: Date
}

export interface NotificationPreferences {
  tvlChanges: boolean
  riskAlerts: boolean
  yieldOpportunities: boolean
  educationalContent: boolean
  weeklyReports: boolean
  email: boolean
  push: boolean
  frequency: 'immediate' | 'daily' | 'weekly'
}

export interface FeatureLimitations {
  tier: SubscriptionTier
  limitations: {
    protocolAccess: string[]
    advancedAnalytics: boolean
    customAlerts: number
    portfolioSize: number
    historicalData: number
    riskAnalysis: 'basic' | 'detailed' | 'comprehensive'
    yieldPredictions: boolean
    aiRecommendations: boolean
    prioritySupport: boolean
  }
}

export interface DeFiAlertCondition {
  id: string;
  userId: string;
  name: string;
  protocolId?: string;
  poolId?: string;
  network?: BlockchainNetwork;
  type: 'tvl_change' | 'apy_change' | 'liquidity_drop' | 'risk_increase' | 'gas_spike' | 'governance_proposal';
  thresholds: {
    tvlChangePercent?: number;
    apyChangePercent?: number;
    liquidityDropPercent?: number;
    riskScoreIncrease?: number;
    gasPriceGwei?: number;
  };
  notifications: { email: boolean; push: boolean; webhook?: string };
  enabled: boolean;
  lastTriggered?: Date;
  triggerCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface EducationalContent { id: string; title: string; description: string; targetLevel: UserExperienceLevel; category: 'basics' | 'risk_management' | 'yield_strategies' | 'advanced_topics'; format: 'article' | 'video' | 'interactive' | 'quiz'; estimatedMinutes: number; prerequisites: string[]; learningObjectives: string[]; content: { sections: ContentSection[]; examples: PracticalExample[]; warnings: RiskWarning[]; quizzes: QuizQuestion[] }; metrics: { completionRate: number; averageRating: number; timeSpent: number }; isFreemium: boolean; createdAt: Date; updatedAt: Date }
export interface ContentSection { id: string; title: string; content: string; visualAids: string[]; keyTerms: TermDefinition[] }
export interface PracticalExample { scenario: string; setup: string; execution: string[]; outcome: string; riskFactors: string[]; alternatives: string[] }
export interface RiskWarning { severity: 'low' | 'medium' | 'high' | 'critical'; message: string; mitigation: string[]; relevantTo: UserExperienceLevel[] }
export interface TermDefinition { term: string; definition: string; examples: string[]; relatedTerms: string[] }
export interface QuizQuestion { id: string; question: string; type: 'multiple_choice' | 'true_false' | 'drag_drop' | 'scenario'; options?: string[]; correctAnswer: string | string[]; explanation: string; difficulty: 'easy' | 'medium' | 'hard' }

export interface BeginnerProtocolInfo { protocolId: string; simpleName: string; description: string; category: 'savings' | 'trading' | 'lending' | 'staking'; riskLevel: 'very_low' | 'low' | 'medium' | 'high'; minimumInvestment: number; expectedReturn: string; timeCommitment: string; easeOfUse: 1 | 2 | 3 | 4 | 5; pros: string[]; cons: string[]; whoItsFor: string; howItWorks: string[]; risks: RiskExplanation[]; gettingStarted: OnboardingStep[] }
export interface RiskExplanation { type: string; explanation: string; likelihood: 'very_low' | 'low' | 'medium' | 'high'; impact: string; mitigation: string }
export interface OnboardingStep { stepNumber: number; title: string; description: string; actionRequired: string; timeEstimate: string; tips: string[] }

export interface DeFiAnalysisReport { id: string; type: 'protocol' | 'pool' | 'market' | 'risk'; title: string; targetId: string; targetName: string; period: { start: Date; end: Date }; summary: string; keyFindings: string[]; metrics: { performance: PerformanceMetrics; risk: RiskMetrics; efficiency: EfficiencyMetrics }; recommendations: Recommendation[]; predictions: Prediction[]; benchmarkComparison?: BenchmarkComparison; generatedAt: Date; validUntil: Date; confidence: number; dataQuality: number }
export interface PerformanceMetrics { roi: number; volatility: number; sharpeRatio: number; maxDrawdown: number; winRate: number }
export interface RiskMetrics { var95: number; var99: number; beta: number; correlation: number; liquidityRisk: number }
export interface EfficiencyMetrics { capitalEfficiency: number; liquidityUtilization: number; gasCostEfficiency: number; yieldEfficiency: number }
export interface Recommendation { category: 'optimization' | 'risk_management' | 'opportunity' | 'warning'; priority: 'low' | 'medium' | 'high' | 'critical'; title: string; description: string; expectedImpact: string; implementation: string[] }
export interface Prediction { metric: string; timeframe: string; predictedValue: number; confidence: number; scenario: 'conservative' | 'base' | 'optimistic'; assumptions: string[] }
export interface BenchmarkComparison { benchmarkType: 'category_average' | 'top_performers' | 'market_index'; benchmarkName: string; performance: { relative: number; rank: number; percentile: number }; risk: { relative: number; rank: number; percentile: number } }
