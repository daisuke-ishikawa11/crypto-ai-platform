// 🏦 DeFiダッシュボードシステム - 包括的型定義
// プロトコルダッシュボード、TVL、流動性、ガバナンス、リスク評価の統合システム

export enum DeFiProtocol {
  // DEX
  UNISWAP_V2 = 'uniswap_v2',
  UNISWAP_V3 = 'uniswap_v3',
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
  STANDARD = 'standard',           // 標準的な50/50プール
  WEIGHTED = 'weighted',           // 重み付きプール
  STABLE = 'stable',               // ステーブルコインプール
  CONCENTRATED = 'concentrated',    // 集中流動性（Uniswap V3）
  META = 'meta',                   // メタプール（Curve）
  EXOTIC = 'exotic'                // その他特殊プール
}

// プロトコル基本情報
export interface ProtocolInfo {
  id: string;
  name: string;
  protocol: DeFiProtocol;
  network: BlockchainNetwork;
  contractAddress: string;
  website: string;
  documentation: string;
  auditReports: AuditReport[];
  
  // メタデータ
  category: string[];
  tags: string[];
  description: string;
  logoUrl: string;
  
  // 統計情報
  tvl: number;
  volume24h: number;
  users24h: number;
  transactions24h: number;
  
  // リスク情報
  riskScore: number;
  riskLevel: DeFiRiskLevel;
  riskFactors: RiskFactor[];
  
  // 更新情報
  lastUpdated: Date;
  dataSource: string;
}

// 監査報告書
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

// リスクファクター
export interface RiskFactor {
  type: 'smart_contract' | 'liquidity' | 'market' | 'governance' | 'regulatory' | 'technical';
  severity: DeFiRiskLevel;
  description: string;
  impact: number; // 1-10
  likelihood: number; // 1-10
  mitigation?: string;
}

// TVL（Total Value Locked）データ
export interface TVLData {
  protocolId: string;
  protocol: DeFiProtocol;
  network: BlockchainNetwork;
  
  // TVL詳細
  totalTVL: number;
  tvlUSD: number;
  tvlETH: number;
  tvlBTC: number;
  
  // 時系列データ
  tvlHistory: TVLHistoryPoint[];
  
  // トークン別内訳
  tokenBreakdown: TokenTVL[];
  
  // プール別内訳
  poolBreakdown: PoolTVL[];
  
  // 変動情報
  change24h: number;
  change7d: number;
  change30d: number;
  changePercent24h: number;
  changePercent7d: number;
  changePercent30d: number;
  
  // メタデータ
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

// 流動性プール情報
export interface LiquidityPool {
  id: string;
  protocol: DeFiProtocol;
  network: BlockchainNetwork;
  address: string;
  
  // プール詳細
  name: string;
  type: LiquidityPoolType;
  tokens: PoolToken[];
  
  // 流動性情報
  totalLiquidity: number;
  liquidityUSD: number;
  
  // 取引情報
  volume24h: number;
  volume7d: number;
  volume30d: number;
  trades24h: number;
  
  // 収益情報
  apy: number;
  apr: number;
  rewards: RewardInfo[];
  fees: FeeStructure;
  
  // リスク情報
  impermanentLoss: number;
  liquidityRisk: DeFiRiskLevel;
  smartContractRisk: DeFiRiskLevel;
  
  // 価格情報
  tokenPrices: Record<string, number>;
  priceImpact: PriceImpact[];
  
  // 流動性プロバイダー情報
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
  weight: number; // プール内でのウェイト（%）
  reserveUSD: number;
}

export interface RewardInfo {
  tokenAddress: string;
  symbol: string;
  rewardRate: number; // 年間利率
  rewardPerDay: number;
  rewardValueUSD: number;
  distributionEnd?: Date;
}

export interface FeeStructure {
  tradingFee: number; // %
  withdrawalFee: number; // %
  performanceFee: number; // %
  managementFee: number; // %
  totalFee: number; // %
}

export interface PriceImpact {
  tradeSize: number; // USD
  priceImpact: number; // %
  slippage: number; // %
}

// ステーキング情報
export interface StakingInfo {
  id: string;
  protocol: DeFiProtocol;
  network: BlockchainNetwork;
  
  // ステーキング詳細
  stakingToken: string;
  rewardToken: string;
  contractAddress: string;
  
  // ステーキング統計
  totalStaked: number;
  totalStakedUSD: number;
  stakerCount: number;
  
  // 報酬情報
  apy: number;
  apr: number;
  dailyRewards: number;
  rewardRate: number;
  
  // ロックアップ情報
  lockPeriod: number; // 日数
  unstakingPeriod: number; // 日数
  penalty: number; // 早期解約ペナルティ%
  
  // リスク情報
  slashingRisk: boolean;
  slashingRate?: number;
  
  timestamp: Date;
}

// ガバナンス情報
export interface GovernanceInfo {
  protocolId: string;
  protocol: DeFiProtocol;
  governanceTokenAddress: string;
  governanceTokenSymbol: string;
  
  // ガバナンス統計
  totalSupply: number;
  circulatingSupply: number;
  marketCap: number;
  price: number;
  
  // 投票情報
  votingPower: {
    minRequired: number; // 最小投票権
    quorum: number; // 定足数
    threshold: number; // 可決閾値
  };
  
  // 提案情報
  activeProposals: Proposal[];
  proposalHistory: ProposalHistory[];
  
  // 参加者情報
  voterCount: number;
  delegateCount: number;
  averageParticipation: number; // %
  
  timestamp: Date;
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  
  // 状態
  status: 'pending' | 'active' | 'succeeded' | 'defeated' | 'queued' | 'executed' | 'cancelled';
  
  // 投票情報
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  totalVotes: number;
  quorumReached: boolean;
  
  // 時間情報
  startTime: Date;
  endTime: Date;
  eta?: Date; // 実行予定時刻
  
  // メタデータ
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

// イールドファーミング情報
export interface YieldFarmInfo {
  id: string;
  protocol: DeFiProtocol;
  network: BlockchainNetwork;
  
  // ファーム詳細
  name: string;
  farmAddress: string;
  stakingToken: string;
  rewardTokens: string[];
  
  // 利回り情報
  apy: number;
  apr: number;
  baseApy: number; // ベース利回り
  rewardApy: number; // 報酬利回り
  
  // ファーム統計
  totalStaked: number;
  totalStakedUSD: number;
  participantCount: number;
  
  // 報酬情報
  dailyRewards: RewardInfo[];
  rewardMultiplier: number;
  boostMultiplier?: number;
  
  // 複利情報
  autoCompound: boolean;
  compoundFrequency?: number; // 日単位
  compoundingFee?: number; // %
  
  // リスク・制約
  lockPeriod: number; // 日数
  withdrawalFee: number; // %
  impermanentLossRisk: DeFiRiskLevel;
  
  timestamp: Date;
}

// ガス料金情報
export interface GasInfo {
  network: BlockchainNetwork;
  
  // 現在のガス価格
  gasPrice: number; // Gwei
  gasPriceUSD: number;
  
  // 速度別価格
  slow: {
    gasPrice: number;
    estimatedTime: number; // 分
  };
  standard: {
    gasPrice: number;
    estimatedTime: number;
  };
  fast: {
    gasPrice: number;
    estimatedTime: number;
  };
  
  // 履歴データ
  priceHistory: GasPriceHistory[];
  
  // ネットワーク状況
  networkCongestion: 'low' | 'medium' | 'high' | 'critical';
  pendingTransactions: number;
  blockUtilization: number; // %
  
  timestamp: Date;
}

export interface GasPriceHistory {
  timestamp: Date;
  gasPrice: number;
  networkCongestion: string;
  blockUtilization: number;
}

// DeFi全体の市場情報
export interface DeFiMarketOverview {
  // 全体統計
  totalTVL: number;
  totalVolume24h: number;
  totalUsers: number;
  totalTransactions: number;
  
  // プロトコル別統計
  protocolCount: number;
  protocolsByCategory: Record<string, number>;
  topProtocols: ProtocolRanking[];
  
  // ネットワーク別統計
  networkDistribution: NetworkStats[];
  crossChainVolume: number;
  
  // トレンド情報
  tvlChange24h: number;
  tvlChange7d: number;
  tvlChange30d: number;
  dominanceIndex: number; // 上位プロトコルの支配度
  
  // イノベーション指標
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

// リスク評価結果
export interface DeFiRiskAssessment {
  protocolId: string;
  protocol: DeFiProtocol;
  
  // 総合リスクスコア
  overallScore: number; // 0-100
  riskLevel: DeFiRiskLevel;
  
  // カテゴリ別リスク
  smartContractRisk: RiskCategory;
  liquidityRisk: RiskCategory;
  marketRisk: RiskCategory;
  governanceRisk: RiskCategory;
  regulatoryRisk: RiskCategory;
  operationalRisk: RiskCategory;
  
  // リスク要因詳細
  riskFactors: DetailedRiskFactor[];
  
  // 推奨事項
  recommendations: string[];
  
  // 比較情報
  peerComparison: PeerRiskComparison[];
  
  // 時系列リスクデータ
  riskHistory: RiskHistoryPoint[];
  
  timestamp: Date;
}

export interface RiskCategory {
  score: number; // 0-100
  level: DeFiRiskLevel;
  weight: number; // 総合スコアへの重み
  factors: string[];
  mitigation: string[];
}

export interface DetailedRiskFactor {
  id: string;
  category: string;
  name: string;
  description: string;
  impact: number; // 1-10
  likelihood: number; // 1-10
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
  events?: string[]; // その時点での重要なイベント
}

// DeFi監視アラート設定
export interface DeFiAlertCondition {
  id: string;
  userId: string;
  name: string;
  
  // 監視対象
  protocolId?: string;
  poolId?: string;
  network?: BlockchainNetwork;
  
  // アラート条件
  type: 'tvl_change' | 'apy_change' | 'liquidity_drop' | 'risk_increase' | 'gas_spike' | 'governance_proposal';
  
  // 閾値設定
  thresholds: {
    tvlChangePercent?: number;
    apyChangePercent?: number;
    liquidityDropPercent?: number;
    riskScoreIncrease?: number;
    gasPriceGwei?: number;
  };
  
  // 通知設定
  notifications: {
    email: boolean;
    push: boolean;
    webhook?: string;
  };
  
  // 状態
  enabled: boolean;
  lastTriggered?: Date;
  triggerCount: number;
  
  createdAt: Date;
  updatedAt: Date;
}

// DeFi分析レポート
export interface DeFiAnalysisReport {
  id: string;
  type: 'protocol' | 'pool' | 'market' | 'risk';
  title: string;
  
  // 対象
  targetId: string; // プロトコル、プール等のID
  targetName: string;
  
  // 分析期間
  period: {
    start: Date;
    end: Date;
  };
  
  // 分析結果
  summary: string;
  keyFindings: string[];
  
  // メトリクス
  metrics: {
    performance: PerformanceMetrics;
    risk: RiskMetrics;
    efficiency: EfficiencyMetrics;
  };
  
  // 推奨事項
  recommendations: Recommendation[];
  
  // 予測
  predictions: Prediction[];
  
  // 比較分析
  benchmarkComparison?: BenchmarkComparison;
  
  // メタデータ
  generatedAt: Date;
  validUntil: Date;
  confidence: number; // 0-100
  dataQuality: number; // 0-100
}

export interface PerformanceMetrics {
  roi: number;
  volatility: number;
  sharpeRatio: number;
  maxDrawdown: number;
  winRate: number;
}

export interface RiskMetrics {
  var95: number; // Value at Risk 95%
  var99: number; // Value at Risk 99%
  beta: number;
  correlation: number;
  liquidityRisk: number;
}

export interface EfficiencyMetrics {
  capitalEfficiency: number;
  liquidityUtilization: number;
  gasCostEfficiency: number;
  yieldEfficiency: number;
}

export interface Recommendation {
  category: 'optimization' | 'risk_management' | 'opportunity' | 'warning';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  expectedImpact: string;
  implementation: string[];
}

export interface Prediction {
  metric: string;
  timeframe: string; // '7d', '30d', '90d'
  predictedValue: number;
  confidence: number; // 0-100
  scenario: 'conservative' | 'base' | 'optimistic';
  assumptions: string[];
}

export interface BenchmarkComparison {
  benchmarkType: 'category_average' | 'top_performers' | 'market_index';
  benchmarkName: string;
  
  performance: {
    relative: number; // %
    rank: number;
    percentile: number;
  };
  
  risk: {
    relative: number; // %
    rank: number;
    percentile: number;
  };
}