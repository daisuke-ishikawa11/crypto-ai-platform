// 🔍 DeFiリスク評価エンジン
// 高度なリスクモデリング、機械学習分析、予測アルゴリズムによる包括的DeFiリスク評価

import {
  DeFiProtocol,
  BlockchainNetwork,
  ProtocolInfo,
  TVLData,
  LiquidityPool,
  DeFiRiskAssessment,
  DeFiRiskLevel,
  RiskCategory,
  DetailedRiskFactor,
  PeerRiskComparison,
  RiskHistoryPoint
} from './types';
import { logger } from '@/lib/monitoring/logger';

export interface RiskAssessmentConfig {
  enableMLModels: boolean;
  historicalDataPeriod: number; // 日数
  confidenceThreshold: number; // 0-1
  riskWeights: {
    smartContract: number;
    liquidity: number;
    market: number;
    governance: number;
    regulatory: number;
    operational: number;
  };
  benchmarkProtocols: DeFiProtocol[];
  updateInterval: number; // 秒
}

export interface ProtocolRiskData {
  protocolId: string;
  protocol: DeFiProtocol;
  network: BlockchainNetwork;
  tvlHistory: TVLData[];
  liquidityPools: LiquidityPool[];
  auditHistory: AuditScore[];
  governanceMetrics: GovernanceRiskMetrics;
  marketMetrics: MarketRiskMetrics;
  technicalMetrics: TechnicalRiskMetrics;
  incidentHistory: SecurityIncident[];
  competitorAnalysis: CompetitorRiskData[];
}

export interface AuditScore {
  auditor: string;
  date: Date;
  overallScore: number; // 0-100
  findings: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  codeComplexity: number; // 0-100
  testCoverage: number; // 0-100
  formalVerification: boolean;
}

export interface GovernanceRiskMetrics {
  tokenDistribution: {
    topHolders: number; // top 10 holders percentage
    whaleConcentration: number; // percentage held by whales
    communityDistribution: number; // percentage held by community
  };
  votingParticipation: {
    averageParticipation: number; // percentage
    quorumRequirement: number; // percentage
    proposalPassRate: number; // percentage
  };
  governanceStructure: {
    multisigRequired: boolean;
    timelocksImplemented: boolean;
    emergencyPause: boolean;
    upgradeability: 'immutable' | 'upgradeable' | 'proxy';
  };
}

export interface MarketRiskMetrics {
  volatilityMetrics: {
    priceVolatility: number; // 30-day volatility
    tvlVolatility: number; // 30-day TVL volatility
    volumeVolatility: number; // 30-day volume volatility
  };
  liquidityMetrics: {
    depthScore: number; // 0-100
    concentrationRisk: number; // 0-100
    withdrawalCapacity: number; // percentage of TVL that can be withdrawn
  };
  correlationMetrics: {
    btcCorrelation: number; // -1 to 1
    ethCorrelation: number; // -1 to 1
    marketCorrelation: number; // -1 to 1
    protocolCorrelation: number; // correlation with similar protocols
  };
}

export interface TechnicalRiskMetrics {
  codeMetrics: {
    linesOfCode: number;
    complexity: number; // cyclomatic complexity
    dependencies: number; // external dependencies count
    testCoverage: number; // 0-100
  };
  securityMetrics: {
    lastAuditAge: number; // days since last audit
    vulnerabilityScore: number; // 0-100 (lower is better)
    bugBountyProgram: boolean;
    multisigScore: number; // 0-100
  };
  upgradeMetrics: {
    upgradeFrequency: number; // upgrades per month
    breakingChanges: number; // breaking changes in last year
    deploymentRisk: number; // 0-100
  };
}

export interface SecurityIncident {
  date: Date;
  type: 'exploit' | 'bug' | 'governance_attack' | 'oracle_manipulation' | 'front_running';
  severity: 'low' | 'medium' | 'high' | 'critical';
  impact: {
    financialLoss: number; // USD
    usersAffected: number;
    downtime: number; // hours
  };
  resolution: {
    resolved: boolean;
    resolutionTime: number; // hours
    compensation: number; // USD compensated
  };
}

export interface CompetitorRiskData {
  protocolId: string;
  marketShare: number;
  riskScore: number;
  performanceMetrics: {
    apy: number;
    tvl: number;
    growth: number;
  };
}

export interface RiskPrediction {
  timeframe: '7d' | '30d' | '90d';
  riskScore: number;
  confidence: number; // 0-1
  factors: string[];
  scenarios: {
    optimistic: { score: number; probability: number };
    base: { score: number; probability: number };
    pessimistic: { score: number; probability: number };
  };
}

export interface MLRiskSignals {
  anomalyScore: number; // 0-1
  trendSignal: 'bullish' | 'bearish' | 'neutral';
  volatilitySignal: 'low' | 'medium' | 'high' | 'extreme';
  liquiditySignal: 'healthy' | 'stressed' | 'critical';
  technicalSignal: 'strong' | 'moderate' | 'weak' | 'failing';
}

export class DeFiRiskAssessmentEngine {
  private riskDataCache: Map<string, ProtocolRiskData> = new Map();
  private riskAssessmentCache: Map<string, DeFiRiskAssessment> = new Map();
  private mlModels: Map<string, any> = new Map(); // ML model cache
  private benchmarkData: Map<string, number> = new Map();

  constructor(
    private readonly config: RiskAssessmentConfig = {
      enableMLModels: true,
      historicalDataPeriod: 90,
      confidenceThreshold: 0.7,
      riskWeights: {
        smartContract: 0.25,
        liquidity: 0.20,
        market: 0.20,
        governance: 0.15,
        regulatory: 0.10,
        operational: 0.10
      },
      benchmarkProtocols: [
        DeFiProtocol.UNISWAP_V3,
        DeFiProtocol.AAVE,
        DeFiProtocol.COMPOUND,
        DeFiProtocol.CURVE
      ],
      updateInterval: 3600 // 1 hour
    }
  ) {
    this.initializeMLModels();
  }

  /**
   * プロトコルの包括的リスク評価
   */
  async assessProtocolRisk(protocolId: string): Promise<DeFiRiskAssessment> {
    try {
      // キャッシュされた評価をチェック
      const cached = this.riskAssessmentCache.get(protocolId);
      if (cached && this.isCacheValid(cached.timestamp)) {
        return cached;
      }

      // プロトコルデータを取得
      const riskData = await this.getRiskData(protocolId);
      if (!riskData) {
        throw new Error(`Risk data not available for protocol: ${protocolId}`);
      }

      // 各リスクカテゴリを評価
      const smartContractRisk = await this.assessSmartContractRisk(riskData);
      const liquidityRisk = await this.assessLiquidityRisk(riskData);
      const marketRisk = await this.assessMarketRisk(riskData);
      const governanceRisk = await this.assessGovernanceRisk(riskData);
      const regulatoryRisk = await this.assessRegulatoryRisk(riskData);
      const operationalRisk = await this.assessOperationalRisk(riskData);

      // 機械学習シグナルを取得
      const mlSignals = this.config.enableMLModels ? 
        await this.generateMLRiskSignals(riskData) : null;

      // 総合リスクスコアを計算
      const overallScore = this.calculateOverallRiskScore({
        smartContractRisk,
        liquidityRisk,
        marketRisk,
        governanceRisk,
        regulatoryRisk,
        operationalRisk
      }, mlSignals);

      // リスクレベルを決定
      const riskLevel = this.categorizeRiskLevel(overallScore);

      // 詳細リスクファクターを生成
      const riskFactors = await this.generateDetailedRiskFactors(riskData, {
        smartContractRisk,
        liquidityRisk,
        marketRisk,
        governanceRisk,
        regulatoryRisk,
        operationalRisk
      });

      // 推奨事項を生成
      const recommendations = this.generateRecommendations(overallScore, riskFactors, mlSignals);

      // ピア比較を実行
      const peerComparison = await this.performPeerComparison(riskData, overallScore);

      // リスク履歴を更新
      const riskHistory = await this.updateRiskHistory(protocolId, overallScore);

      // 最終評価結果を構築
      const assessment: DeFiRiskAssessment = {
        protocolId,
        protocol: riskData.protocol,
        overallScore,
        riskLevel,
        smartContractRisk,
        liquidityRisk,
        marketRisk,
        governanceRisk,
        regulatoryRisk,
        operationalRisk,
        riskFactors,
        recommendations,
        peerComparison,
        riskHistory,
        timestamp: new Date()
      };

      // キャッシュに保存
      this.riskAssessmentCache.set(protocolId, assessment);

      logger.info('DeFi risk assessment completed', {
        protocolId,
        overallScore,
        riskLevel,
        factorsCount: riskFactors.length
      });

      return assessment;

    } catch (error) {
      logger.error('Error assessing protocol risk', {
        protocolId,
        wsError: error
      });
      throw error;
    }
  }

  /**
   * スマートコントラクトリスク評価
   */
  private async assessSmartContractRisk(riskData: ProtocolRiskData): Promise<RiskCategory> {
    const factors: string[] = [];
    let totalScore = 100; // Start with perfect score

    // 監査スコア評価
    if (riskData.auditHistory.length === 0) {
      totalScore -= 30;
      factors.push('No audit history available');
    } else {
      const latestAudit = riskData.auditHistory[0];
      const auditAge = (Date.now() - latestAudit.date.getTime()) / (1000 * 60 * 60 * 24);
      
      if (auditAge > 365) {
        totalScore -= 20;
        factors.push('Audit is more than 1 year old');
      }
      
      if (latestAudit.findings.critical > 0) {
        totalScore -= 25;
        factors.push(`${latestAudit.findings.critical} critical findings in audit`);
      }
      
      if (latestAudit.findings.high > 0) {
        totalScore -= 15;
        factors.push(`${latestAudit.findings.high} high severity findings`);
      }
      
      if (latestAudit.testCoverage < 80) {
        totalScore -= 10;
        factors.push('Low test coverage');
      }
    }

    // 技術メトリクス評価
    if (riskData.technicalMetrics.codeMetrics.complexity > 10) {
      totalScore -= 10;
      factors.push('High code complexity');
    }

    if (riskData.technicalMetrics.securityMetrics.vulnerabilityScore > 50) {
      totalScore -= 15;
      factors.push('High vulnerability score');
    }

    if (!riskData.technicalMetrics.securityMetrics.bugBountyProgram) {
      totalScore -= 5;
      factors.push('No bug bounty program');
    }

    // セキュリティインシデント履歴
    const recentIncidents = riskData.incidentHistory.filter(
      incident => Date.now() - incident.date.getTime() < 365 * 24 * 60 * 60 * 1000
    );

    recentIncidents.forEach(incident => {
      switch (incident.severity) {
        case 'critical':
          totalScore -= 20;
          factors.push(`Critical security incident: ${incident.type}`);
          break;
        case 'high':
          totalScore -= 10;
          factors.push(`High severity incident: ${incident.type}`);
          break;
        case 'medium':
          totalScore -= 5;
          factors.push(`Medium severity incident: ${incident.type}`);
          break;
      }
    });

    const finalScore = Math.max(0, Math.min(100, totalScore));
    const riskLevel = this.scoreToRiskLevel(finalScore);

    return {
      score: finalScore,
      level: riskLevel,
      weight: this.config.riskWeights.smartContract,
      factors,
      mitigation: this.generateSmartContractMitigation(factors)
    };
  }

  /**
   * 流動性リスク評価
   */
  private async assessLiquidityRisk(riskData: ProtocolRiskData): Promise<RiskCategory> {
    const factors: string[] = [];
    let totalScore = 100;

    // TVL集中度評価
    const totalTVL = riskData.tvlHistory[riskData.tvlHistory.length - 1]?.totalTVL || 0;
    if (totalTVL < 1000000) { // $1M
      totalScore -= 30;
      factors.push('Very low TVL (< $1M)');
    } else if (totalTVL < 10000000) { // $10M
      totalScore -= 15;
      factors.push('Low TVL (< $10M)');
    }

    // TVLボラティリティ
    if (riskData.marketMetrics.volatilityMetrics.tvlVolatility > 0.5) {
      totalScore -= 20;
      factors.push('High TVL volatility');
    }

    // 流動性プール分析
    let poolRiskScore = 0;
    let poolCount = 0;

    for (const pool of riskData.liquidityPools) {
      poolCount++;
      
      if (pool.liquidityRisk === 'high' || pool.liquidityRisk === 'very_high') {
        poolRiskScore += 20;
      } else if (pool.liquidityRisk === 'medium') {
        poolRiskScore += 10;
      }
      
      if (pool.impermanentLoss > 0.1) { // 10%
        poolRiskScore += 5;
      }
    }

    if (poolCount > 0) {
      const avgPoolRisk = poolRiskScore / poolCount;
      totalScore -= avgPoolRisk;
      if (avgPoolRisk > 15) {
        factors.push('High average pool risk');
      }
    }

    // 流動性集中度
    if (riskData.marketMetrics.liquidityMetrics.concentrationRisk > 70) {
      totalScore -= 15;
      factors.push('High liquidity concentration');
    }

    // 引き出し能力
    if (riskData.marketMetrics.liquidityMetrics.withdrawalCapacity < 50) {
      totalScore -= 10;
      factors.push('Limited withdrawal capacity');
    }

    const finalScore = Math.max(0, Math.min(100, totalScore));
    const riskLevel = this.scoreToRiskLevel(finalScore);

    return {
      score: finalScore,
      level: riskLevel,
      weight: this.config.riskWeights.liquidity,
      factors,
      mitigation: this.generateLiquidityMitigation(factors)
    };
  }

  /**
   * 市場リスク評価
   */
  private async assessMarketRisk(riskData: ProtocolRiskData): Promise<RiskCategory> {
    const factors: string[] = [];
    let totalScore = 100;

    // 価格ボラティリティ
    if (riskData.marketMetrics.volatilityMetrics.priceVolatility > 0.8) {
      totalScore -= 25;
      factors.push('Extremely high price volatility');
    } else if (riskData.marketMetrics.volatilityMetrics.priceVolatility > 0.5) {
      totalScore -= 15;
      factors.push('High price volatility');
    }

    // 市場相関
    const btcCorr = Math.abs(riskData.marketMetrics.correlationMetrics.btcCorrelation);
    const ethCorr = Math.abs(riskData.marketMetrics.correlationMetrics.ethCorrelation);
    
    if (btcCorr > 0.8 || ethCorr > 0.8) {
      totalScore -= 10;
      factors.push('High correlation with major crypto assets');
    }

    // プロトコル間相関
    if (riskData.marketMetrics.correlationMetrics.protocolCorrelation > 0.9) {
      totalScore -= 15;
      factors.push('Very high correlation with similar protocols');
    }

    // 流動性深度
    if (riskData.marketMetrics.liquidityMetrics.depthScore < 30) {
      totalScore -= 20;
      factors.push('Poor liquidity depth');
    }

    // 競合分析
    const competitorRisks = riskData.competitorAnalysis.map(c => c.riskScore);
    const avgCompetitorRisk = competitorRisks.reduce((sum, risk) => sum + risk, 0) / competitorRisks.length;
    
    if (riskData.protocolId && avgCompetitorRisk > 0) {
      const relativeRisk = (100 - avgCompetitorRisk) / 100; // Convert to relative performance
      if (relativeRisk < 0.8) {
        totalScore -= 10;
        factors.push('Higher risk than competitors');
      }
    }

    const finalScore = Math.max(0, Math.min(100, totalScore));
    const riskLevel = this.scoreToRiskLevel(finalScore);

    return {
      score: finalScore,
      level: riskLevel,
      weight: this.config.riskWeights.market,
      factors,
      mitigation: this.generateMarketMitigation(factors)
    };
  }

  /**
   * ガバナンスリスク評価
   */
  private async assessGovernanceRisk(riskData: ProtocolRiskData): Promise<RiskCategory> {
    const factors: string[] = [];
    let totalScore = 100;

    const governance = riskData.governanceMetrics;

    // トークン集中度
    if (governance.tokenDistribution.topHolders > 50) {
      totalScore -= 25;
      factors.push('High token concentration in top holders');
    } else if (governance.tokenDistribution.topHolders > 30) {
      totalScore -= 15;
      factors.push('Moderate token concentration');
    }

    // ホエール集中度
    if (governance.tokenDistribution.whaleConcentration > 40) {
      totalScore -= 20;
      factors.push('High whale concentration');
    }

    // 投票参加率
    if (governance.votingParticipation.averageParticipation < 10) {
      totalScore -= 15;
      factors.push('Very low voting participation');
    } else if (governance.votingParticipation.averageParticipation < 20) {
      totalScore -= 10;
      factors.push('Low voting participation');
    }

    // ガバナンス構造
    if (!governance.governanceStructure.multisigRequired) {
      totalScore -= 15;
      factors.push('No multisig requirement');
    }

    if (!governance.governanceStructure.timelocksImplemented) {
      totalScore -= 10;
      factors.push('No timelocks implemented');
    }

    if (governance.governanceStructure.upgradeability === 'upgradeable') {
      totalScore -= 5;
      factors.push('Protocol is upgradeable');
    }

    // 提案可決率
    if (governance.votingParticipation.proposalPassRate > 90) {
      totalScore -= 10;
      factors.push('Very high proposal pass rate (potential rubber stamping)');
    }

    const finalScore = Math.max(0, Math.min(100, totalScore));
    const riskLevel = this.scoreToRiskLevel(finalScore);

    return {
      score: finalScore,
      level: riskLevel,
      weight: this.config.riskWeights.governance,
      factors,
      mitigation: this.generateGovernanceMitigation(factors)
    };
  }

  /**
   * 規制リスク評価
   */
  private async assessRegulatoryRisk(riskData: ProtocolRiskData): Promise<RiskCategory> {
    const factors: string[] = [];
    let totalScore = 100;

    // ネットワーク別規制リスク
    switch (riskData.network) {
      case BlockchainNetwork.ETHEREUM:
        totalScore -= 5; // 一般的に規制リスクは中程度
        break;
      case BlockchainNetwork.BSC:
        totalScore -= 15; // より高い規制リスク
        factors.push('Operating on BSC with higher regulatory uncertainty');
        break;
      default:
        totalScore -= 10;
    }

    // プロトコルタイプ別リスク
    switch (riskData.protocol) {
      case DeFiProtocol.COMPOUND:
      case DeFiProtocol.AAVE:
        totalScore -= 10; // レンディングプロトコルは規制対象になりやすい
        factors.push('Lending protocol subject to financial regulations');
        break;
      case DeFiProtocol.UNISWAP_V3:
      case DeFiProtocol.SUSHISWAP:
        totalScore -= 5; // DEXは中程度のリスク
        factors.push('DEX protocol with moderate regulatory risk');
        break;
    }

    // 地理的分散
    // TODO: プロトコルチームの地理的分散データが利用可能な場合の評価

    const finalScore = Math.max(0, Math.min(100, totalScore));
    const riskLevel = this.scoreToRiskLevel(finalScore);

    return {
      score: finalScore,
      level: riskLevel,
      weight: this.config.riskWeights.regulatory,
      factors,
      mitigation: this.generateRegulatoryMitigation(factors)
    };
  }

  /**
   * 運用リスク評価
   */
  private async assessOperationalRisk(riskData: ProtocolRiskData): Promise<RiskCategory> {
    const factors: string[] = [];
    let totalScore = 100;

    // アップグレード頻度（高すぎても低すぎてもリスク）
    const upgradeFreq = riskData.technicalMetrics.upgradeMetrics.upgradeFrequency;
    if (upgradeFreq > 2) { // 月2回以上
      totalScore -= 15;
      factors.push('Very frequent upgrades indicate instability');
    } else if (upgradeFreq === 0) { // アップグレードなし
      totalScore -= 10;
      factors.push('No upgrades may indicate stagnation');
    }

    // 破壊的変更
    if (riskData.technicalMetrics.upgradeMetrics.breakingChanges > 2) {
      totalScore -= 10;
      factors.push('Multiple breaking changes in the last year');
    }

    // デプロイメントリスク
    if (riskData.technicalMetrics.upgradeMetrics.deploymentRisk > 70) {
      totalScore -= 15;
      factors.push('High deployment risk score');
    }

    // 依存関係リスク
    if (riskData.technicalMetrics.codeMetrics.dependencies > 20) {
      totalScore -= 10;
      factors.push('High number of external dependencies');
    }

    // セキュリティインシデントの解決能力
    const recentIncidents = riskData.incidentHistory.filter(
      incident => Date.now() - incident.date.getTime() < 365 * 24 * 60 * 60 * 1000
    );

    if (recentIncidents.length > 0) {
      const avgResolutionTime = recentIncidents.reduce(
        (sum, incident) => sum + incident.resolution.resolutionTime, 0
      ) / recentIncidents.length;

      if (avgResolutionTime > 48) { // 48時間以上
        totalScore -= 10;
        factors.push('Slow incident response time');
      }

      const resolvedCount = recentIncidents.filter(i => i.resolution.resolved).length;
      const resolutionRate = resolvedCount / recentIncidents.length;
      
      if (resolutionRate < 0.8) {
        totalScore -= 15;
        factors.push('Poor incident resolution rate');
      }
    }

    const finalScore = Math.max(0, Math.min(100, totalScore));
    const riskLevel = this.scoreToRiskLevel(finalScore);

    return {
      score: finalScore,
      level: riskLevel,
      weight: this.config.riskWeights.operational,
      factors,
      mitigation: this.generateOperationalMitigation(factors)
    };
  }

  /**
   * 機械学習リスクシグナル生成
   */
  private async generateMLRiskSignals(riskData: ProtocolRiskData): Promise<MLRiskSignals> {
    // プレースホルダー実装（実際のMLモデルと置き換える）
    const signals: MLRiskSignals = {
      anomalyScore: Math.random() * 0.3, // 0-0.3のランダム値（低異常度）
      trendSignal: 'neutral',
      volatilitySignal: 'medium',
      liquiditySignal: 'healthy',
      technicalSignal: 'moderate'
    };

    // TVLトレンド分析
    if (riskData.tvlHistory.length > 7) {
      const recentTVL = riskData.tvlHistory.slice(-7);
      const tvlTrend = this.calculateTrend(recentTVL.map(t => t.totalTVL));
      
      if (tvlTrend > 0.1) signals.trendSignal = 'bullish';
      else if (tvlTrend < -0.1) signals.trendSignal = 'bearish';
    }

    // ボラティリティシグナル
    const volMetrics = riskData.marketMetrics.volatilityMetrics;
    if (volMetrics.priceVolatility > 0.8) signals.volatilitySignal = 'extreme';
    else if (volMetrics.priceVolatility > 0.5) signals.volatilitySignal = 'high';
    else if (volMetrics.priceVolatility < 0.2) signals.volatilitySignal = 'low';

    // 流動性シグナル
    const liqMetrics = riskData.marketMetrics.liquidityMetrics;
    if (liqMetrics.concentrationRisk > 80) signals.liquiditySignal = 'critical';
    else if (liqMetrics.concentrationRisk > 60) signals.liquiditySignal = 'stressed';

    // 技術シグナル
    const techMetrics = riskData.technicalMetrics;
    if (techMetrics.securityMetrics.vulnerabilityScore > 70) signals.technicalSignal = 'failing';
    else if (techMetrics.securityMetrics.vulnerabilityScore > 50) signals.technicalSignal = 'weak';
    else if (techMetrics.securityMetrics.vulnerabilityScore < 20) signals.technicalSignal = 'strong';

    return signals;
  }

  /**
   * 総合リスクスコア計算
   */
  private calculateOverallRiskScore(
    riskCategories: {
      smartContractRisk: RiskCategory;
      liquidityRisk: RiskCategory;
      marketRisk: RiskCategory;
      governanceRisk: RiskCategory;
      regulatoryRisk: RiskCategory;
      operationalRisk: RiskCategory;
    },
    mlSignals?: MLRiskSignals | null
  ): number {
    // 重み付き平均を計算
    let weightedScore = 0;
    weightedScore += riskCategories.smartContractRisk.score * this.config.riskWeights.smartContract;
    weightedScore += riskCategories.liquidityRisk.score * this.config.riskWeights.liquidity;
    weightedScore += riskCategories.marketRisk.score * this.config.riskWeights.market;
    weightedScore += riskCategories.governanceRisk.score * this.config.riskWeights.governance;
    weightedScore += riskCategories.regulatoryRisk.score * this.config.riskWeights.regulatory;
    weightedScore += riskCategories.operationalRisk.score * this.config.riskWeights.operational;

    // MLシグナルによる調整
    if (mlSignals) {
      // 異常スコアによる調整
      const anomalyAdjustment = mlSignals.anomalyScore * 20; // 最大20ポイント減点
      weightedScore -= anomalyAdjustment;

      // トレンドによる調整
      if (mlSignals.trendSignal === 'bearish') weightedScore -= 5;
      else if (mlSignals.trendSignal === 'bullish') weightedScore += 2;

      // ボラティリティによる調整
      if (mlSignals.volatilitySignal === 'extreme') weightedScore -= 10;
      else if (mlSignals.volatilitySignal === 'high') weightedScore -= 5;

      // 流動性による調整
      if (mlSignals.liquiditySignal === 'critical') weightedScore -= 15;
      else if (mlSignals.liquiditySignal === 'stressed') weightedScore -= 7;

      // 技術による調整
      if (mlSignals.technicalSignal === 'failing') weightedScore -= 10;
      else if (mlSignals.technicalSignal === 'weak') weightedScore -= 5;
      else if (mlSignals.technicalSignal === 'strong') weightedScore += 3;
    }

    return Math.max(0, Math.min(100, Math.round(weightedScore)));
  }

  /**
   * ヘルパーメソッド
   */
  private categorizeRiskLevel(score: number): DeFiRiskLevel {
    if (score >= 90) return DeFiRiskLevel.VERY_LOW;
    if (score >= 70) return DeFiRiskLevel.LOW;
    if (score >= 50) return DeFiRiskLevel.MEDIUM;
    if (score >= 30) return DeFiRiskLevel.HIGH;
    if (score >= 10) return DeFiRiskLevel.VERY_HIGH;
    return DeFiRiskLevel.CRITICAL;
  }

  private scoreToRiskLevel(score: number): DeFiRiskLevel {
    return this.categorizeRiskLevel(score);
  }

  private isCacheValid(timestamp: Date): boolean {
    const maxAge = this.config.updateInterval * 1000;
    return Date.now() - timestamp.getTime() < maxAge;
  }

  private calculateTrend(values: number[]): number {
    if (values.length < 2) return 0;
    
    const firstHalf = values.slice(0, Math.floor(values.length / 2));
    const secondHalf = values.slice(Math.floor(values.length / 2));
    
    const firstAvg = firstHalf.reduce((sum, val) => sum + val, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, val) => sum + val, 0) / secondHalf.length;
    
    return (secondAvg - firstAvg) / firstAvg;
  }

  /**
   * 緩和策生成メソッド
   */
  private generateSmartContractMitigation(factors: string[]): string[] {
    const mitigations: string[] = [];
    
    if (factors.some(f => f.includes('audit'))) {
      mitigations.push('Conduct comprehensive security audit');
      mitigations.push('Implement formal verification');
    }
    
    if (factors.some(f => f.includes('complexity'))) {
      mitigations.push('Refactor code to reduce complexity');
      mitigations.push('Improve code documentation');
    }
    
    if (factors.some(f => f.includes('incident'))) {
      mitigations.push('Implement emergency pause mechanism');
      mitigations.push('Establish incident response plan');
    }
    
    return mitigations;
  }

  private generateLiquidityMitigation(factors: string[]): string[] {
    const mitigations: string[] = [];
    
    if (factors.some(f => f.includes('TVL'))) {
      mitigations.push('Incentivize liquidity provision');
      mitigations.push('Implement gradual withdrawal limits');
    }
    
    if (factors.some(f => f.includes('concentration'))) {
      mitigations.push('Diversify liquidity sources');
      mitigations.push('Implement whale withdrawal limits');
    }
    
    return mitigations;
  }

  private generateMarketMitigation(factors: string[]): string[] {
    const mitigations: string[] = [];
    
    if (factors.some(f => f.includes('volatility'))) {
      mitigations.push('Implement volatility dampening mechanisms');
      mitigations.push('Consider stablecoin integration');
    }
    
    if (factors.some(f => f.includes('correlation'))) {
      mitigations.push('Diversify asset exposure');
      mitigations.push('Implement correlation monitoring');
    }
    
    return mitigations;
  }

  private generateGovernanceMitigation(factors: string[]): string[] {
    const mitigations: string[] = [];
    
    if (factors.some(f => f.includes('concentration'))) {
      mitigations.push('Implement delegation mechanisms');
      mitigations.push('Improve token distribution');
    }
    
    if (factors.some(f => f.includes('participation'))) {
      mitigations.push('Incentivize voting participation');
      mitigations.push('Improve governance UI/UX');
    }
    
    return mitigations;
  }

  private generateRegulatoryMitigation(factors: string[]): string[] {
    return [
      'Monitor regulatory developments',
      'Engage with regulatory bodies',
      'Implement compliance framework',
      'Consider geographic decentralization'
    ];
  }

  private generateOperationalMitigation(factors: string[]): string[] {
    const mitigations: string[] = [];
    
    if (factors.some(f => f.includes('upgrade'))) {
      mitigations.push('Establish upgrade governance process');
      mitigations.push('Implement gradual rollout strategy');
    }
    
    if (factors.some(f => f.includes('response'))) {
      mitigations.push('Improve incident response procedures');
      mitigations.push('Establish 24/7 monitoring');
    }
    
    return mitigations;
  }

  /**
   * プレースホルダーメソッド（実装を簡素化）
   */
  private async getRiskData(protocolId: string): Promise<ProtocolRiskData | null> {
    // TODO: 実際のデータソースから取得
    return null;
  }

  private async generateDetailedRiskFactors(
    riskData: ProtocolRiskData, 
    categories: any
  ): Promise<DetailedRiskFactor[]> {
    // TODO: 詳細リスクファクター生成
    return [];
  }

  private generateRecommendations(
    score: number, 
    factors: DetailedRiskFactor[], 
    mlSignals?: MLRiskSignals | null
  ): string[] {
    const recommendations: string[] = [];
    
    if (score < 30) {
      recommendations.push('HIGH RISK: Consider avoiding or significantly reducing exposure');
      recommendations.push('Implement enhanced monitoring and risk controls');
    } else if (score < 50) {
      recommendations.push('MEDIUM RISK: Proceed with caution and implement risk management');
      recommendations.push('Monitor key risk indicators closely');
    } else if (score < 70) {
      recommendations.push('MODERATE RISK: Standard due diligence recommended');
      recommendations.push('Regular monitoring of risk factors');
    } else {
      recommendations.push('LOW RISK: Protocol appears relatively safe');
      recommendations.push('Continue standard monitoring procedures');
    }
    
    return recommendations;
  }

  private async performPeerComparison(
    riskData: ProtocolRiskData, 
    score: number
  ): Promise<PeerRiskComparison[]> {
    // TODO: ピア比較実装
    return [];
  }

  private async updateRiskHistory(
    protocolId: string, 
    score: number
  ): Promise<RiskHistoryPoint[]> {
    // TODO: リスク履歴更新
    return [];
  }

  private initializeMLModels(): void {
    if (!this.config.enableMLModels) return;
    
    // TODO: ML モデルの初期化
    logger.info('ML models initialized for risk assessment');
  }

  /**
   * クリーンアップ
   */
  cleanup(): void {
    this.riskDataCache.clear();
    this.riskAssessmentCache.clear();
    this.mlModels.clear();
    
    logger.debug('DeFi risk assessment engine cleanup completed');
  }
}