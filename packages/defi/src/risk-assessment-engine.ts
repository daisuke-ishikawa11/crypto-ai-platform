// 🔍 DeFiリスク評価エンジン（パッケージ版）
import {
  DeFiProtocol,
  BlockchainNetwork,
  TVLData,
  LiquidityPool,
  DeFiRiskAssessment,
  DeFiRiskLevel,
  RiskCategory,
  DetailedRiskFactor,
  PeerRiskComparison,
  RiskHistoryPoint
} from './types';
import { DeFiProtocolEnum } from './types';
import { logger } from './logger';

export interface RiskAssessmentConfig {
  enableMLModels: boolean;
  historicalDataPeriod: number;
  confidenceThreshold: number;
  riskWeights: {
    smartContract: number;
    liquidity: number;
    market: number;
    governance: number;
    regulatory: number;
    operational: number;
  };
  benchmarkProtocols: DeFiProtocol[];
  updateInterval: number;
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
  overallScore: number;
  findings: { critical: number; high: number; medium: number; low: number };
  codeComplexity: number;
  testCoverage: number;
  formalVerification: boolean;
}

export interface GovernanceRiskMetrics {
  tokenDistribution: { topHolders: number; whaleConcentration: number; communityDistribution: number };
  votingParticipation: { averageParticipation: number; quorumRequirement: number; proposalPassRate: number };
  governanceStructure: { multisigRequired: boolean; timelocksImplemented: boolean; emergencyPause: boolean; upgradeability: 'immutable' | 'upgradeable' | 'proxy' };
}

export interface MarketRiskMetrics {
  volatilityMetrics: { priceVolatility: number; tvlVolatility: number; volumeVolatility: number };
  liquidityMetrics: { depthScore: number; concentrationRisk: number; withdrawalCapacity: number };
  correlationMetrics: { btcCorrelation: number; ethCorrelation: number; marketCorrelation: number; protocolCorrelation: number };
}

export interface TechnicalRiskMetrics {
  codeMetrics: { linesOfCode: number; complexity: number; dependencies: number; testCoverage: number };
  securityMetrics: { lastAuditAge: number; vulnerabilityScore: number; bugBountyProgram: boolean; multisigScore: number };
  upgradeMetrics: { upgradeFrequency: number; breakingChanges: number; deploymentRisk: number };
}

export interface SecurityIncident {
  date: Date;
  type: 'exploit' | 'bug' | 'governance_attack' | 'oracle_manipulation' | 'front_running';
  severity: 'low' | 'medium' | 'high' | 'critical';
  impact: { financialLoss: number; usersAffected: number; downtime: number };
  resolution: { resolved: boolean; resolutionTime: number; compensation: number };
}

export interface CompetitorRiskData {
  protocolId: string;
  marketShare: number;
  riskScore: number;
  performanceMetrics: { apy: number; tvl: number; growth: number };
}

export interface MLRiskSignals {
  anomalyScore: number;
  trendSignal: 'bullish' | 'bearish' | 'neutral';
  volatilitySignal: 'low' | 'medium' | 'high' | 'extreme';
  liquiditySignal: 'healthy' | 'stressed' | 'critical';
  technicalSignal: 'strong' | 'moderate' | 'weak' | 'failing';
}

export class DeFiRiskAssessmentEngine {
  private riskDataCache: Map<string, ProtocolRiskData> = new Map();
  private riskAssessmentCache: Map<string, DeFiRiskAssessment> = new Map();
  private mlModels: Map<string, unknown> = new Map();
  private benchmarkData: Map<string, number> = new Map();

  constructor(
    private readonly config: RiskAssessmentConfig = {
      enableMLModels: true,
      historicalDataPeriod: 90,
      confidenceThreshold: 0.7,
      riskWeights: { smartContract: 0.25, liquidity: 0.2, market: 0.2, governance: 0.15, regulatory: 0.1, operational: 0.1 },
      benchmarkProtocols: [DeFiProtocolEnum.UNISWAP_V3, DeFiProtocolEnum.AAVE, DeFiProtocolEnum.COMPOUND, DeFiProtocolEnum.CURVE],
      updateInterval: 3600
    }
  ) {
    this.initializeMLModels();
  }

  async assessProtocolRisk(protocolId: string): Promise<DeFiRiskAssessment> {
    try {
      const cached = this.riskAssessmentCache.get(protocolId);
      if (cached && this.isCacheValid(cached.timestamp)) return cached;

      const riskData = await this.getRiskData(protocolId);
      if (!riskData) throw new Error(`Risk data not available for protocol: ${protocolId}`);

      const smartContractRisk = await this.assessSmartContractRisk(riskData);
      const liquidityRisk = await this.assessLiquidityRisk(riskData);
      const marketRisk = await this.assessMarketRisk(riskData);
      const governanceRisk = await this.assessGovernanceRisk(riskData);
      const regulatoryRisk = await this.assessRegulatoryRisk(riskData);
      const operationalRisk = await this.assessOperationalRisk(riskData);

      const mlSignals = this.config.enableMLModels ? await this.generateMLRiskSignals(riskData) : null;

      const overallScore = this.calculateOverallRiskScore({ smartContractRisk, liquidityRisk, marketRisk, governanceRisk, regulatoryRisk, operationalRisk }, mlSignals);
      const riskLevel = this.categorizeRiskLevel(overallScore);
      const riskFactors = await this.generateDetailedRiskFactors(riskData, { smartContractRisk, liquidityRisk, marketRisk, governanceRisk, regulatoryRisk, operationalRisk });
      const recommendations = this.generateRecommendations(overallScore, riskFactors, mlSignals);
      const peerComparison = await this.performPeerComparison(riskData, overallScore);
      const riskHistory = await this.updateRiskHistory(protocolId, overallScore);

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

      this.riskAssessmentCache.set(protocolId, assessment);
      logger.info('DeFi risk assessment completed', { protocolId, overallScore, riskLevel });
      return assessment;
    } catch (error) {
      logger.error('Error assessing protocol risk', { protocolId, wsError: error as unknown });
      throw error;
    }
  }

  private async assessSmartContractRisk(riskData: ProtocolRiskData): Promise<RiskCategory> {
    const factors: string[] = [];
    let totalScore = 100;

    if (riskData.auditHistory.length === 0) {
      totalScore -= 30;
      factors.push('No audit history available');
    } else {
      const latestAudit = riskData.auditHistory[0];
      const auditAge = (Date.now() - latestAudit.date.getTime()) / (1000 * 60 * 60 * 24);
      if (auditAge > 365) { totalScore -= 20; factors.push('Audit is more than 1 year old'); }
      if (latestAudit.findings.critical > 0) { totalScore -= 25; factors.push(`${latestAudit.findings.critical} critical findings in audit`); }
      if (latestAudit.findings.high > 0) { totalScore -= 15; factors.push(`${latestAudit.findings.high} high severity findings`); }
      if (latestAudit.testCoverage < 80) { totalScore -= 10; factors.push('Low test coverage'); }
    }

    if (riskData.technicalMetrics.codeMetrics.complexity > 10) { totalScore -= 10; factors.push('High code complexity'); }
    if (riskData.technicalMetrics.securityMetrics.vulnerabilityScore > 50) { totalScore -= 15; factors.push('High vulnerability score'); }
    if (!riskData.technicalMetrics.securityMetrics.bugBountyProgram) { totalScore -= 5; factors.push('No bug bounty program'); }

    const recentIncidents = riskData.incidentHistory.filter(i => Date.now() - i.date.getTime() < 365 * 24 * 60 * 60 * 1000);
    for (const incident of recentIncidents) {
      if (incident.severity === 'critical') { totalScore -= 20; factors.push(`Critical security incident: ${incident.type}`); }
      else if (incident.severity === 'high') { totalScore -= 10; factors.push(`High severity incident: ${incident.type}`); }
      else if (incident.severity === 'medium') { totalScore -= 5; factors.push(`Medium severity incident: ${incident.type}`); }
    }

    const finalScore = Math.max(0, Math.min(100, totalScore));
    const riskLevel = this.scoreToRiskLevel(finalScore);
    return { score: finalScore, level: riskLevel, weight: this.config.riskWeights.smartContract, factors, mitigation: this.generateSmartContractMitigation(factors) };
  }

  private async assessLiquidityRisk(riskData: ProtocolRiskData): Promise<RiskCategory> {
    const factors: string[] = [];
    let totalScore = 100;
    const totalTVL = riskData.tvlHistory[riskData.tvlHistory.length - 1]?.totalTVL || 0;
    if (totalTVL < 1_000_000) { totalScore -= 30; factors.push('Very low TVL (< $1M)'); }
    else if (totalTVL < 10_000_000) { totalScore -= 15; factors.push('Low TVL (< $10M)'); }
    if (riskData.marketMetrics.volatilityMetrics.tvlVolatility > 0.5) { totalScore -= 20; factors.push('High TVL volatility'); }

    let poolRiskScore = 0;
    let poolCount = 0;
    for (const pool of riskData.liquidityPools) {
      poolCount++;
      if (pool.liquidityRisk === DeFiRiskLevel.HIGH || pool.liquidityRisk === DeFiRiskLevel.VERY_HIGH) poolRiskScore += 20;
      else if (pool.liquidityRisk === DeFiRiskLevel.MEDIUM) poolRiskScore += 10;
      if (pool.impermanentLoss > 0.1) poolRiskScore += 5;
    }
    if (poolCount > 0) {
      const avgPoolRisk = poolRiskScore / poolCount;
      totalScore -= avgPoolRisk;
      if (avgPoolRisk > 15) factors.push('High average pool risk');
    }
    if (riskData.marketMetrics.liquidityMetrics.concentrationRisk > 70) { totalScore -= 15; factors.push('High liquidity concentration'); }
    if (riskData.marketMetrics.liquidityMetrics.withdrawalCapacity < 50) { totalScore -= 10; factors.push('Limited withdrawal capacity'); }

    const finalScore = Math.max(0, Math.min(100, totalScore));
    const riskLevel = this.scoreToRiskLevel(finalScore);
    return { score: finalScore, level: riskLevel, weight: this.config.riskWeights.liquidity, factors, mitigation: this.generateLiquidityMitigation(factors) };
  }

  private async assessMarketRisk(riskData: ProtocolRiskData): Promise<RiskCategory> {
    const factors: string[] = [];
    let totalScore = 100;
    if (riskData.marketMetrics.volatilityMetrics.priceVolatility > 0.8) { totalScore -= 25; factors.push('Extremely high price volatility'); }
    else if (riskData.marketMetrics.volatilityMetrics.priceVolatility > 0.5) { totalScore -= 15; factors.push('High price volatility'); }
    const btcCorr = Math.abs(riskData.marketMetrics.correlationMetrics.btcCorrelation);
    const ethCorr = Math.abs(riskData.marketMetrics.correlationMetrics.ethCorrelation);
    if (btcCorr > 0.8 || ethCorr > 0.8) { totalScore -= 10; factors.push('High correlation with major crypto assets'); }
    if (riskData.marketMetrics.correlationMetrics.protocolCorrelation > 0.9) { totalScore -= 15; factors.push('Very high correlation with similar protocols'); }
    if (riskData.marketMetrics.liquidityMetrics.depthScore < 30) { totalScore -= 20; factors.push('Poor liquidity depth'); }

    const competitorRisks = riskData.competitorAnalysis.map(c => c.riskScore);
    const avgCompetitorRisk = competitorRisks.length ? competitorRisks.reduce((s, r) => s + r, 0) / competitorRisks.length : 0;
    if (riskData.protocolId && avgCompetitorRisk > 0) {
      const relativeRisk = (100 - avgCompetitorRisk) / 100;
      if (relativeRisk < 0.8) { totalScore -= 10; factors.push('Higher risk than competitors'); }
    }

    const finalScore = Math.max(0, Math.min(100, totalScore));
    const riskLevel = this.scoreToRiskLevel(finalScore);
    return { score: finalScore, level: riskLevel, weight: this.config.riskWeights.market, factors, mitigation: this.generateMarketMitigation(factors) };
  }

  private async assessGovernanceRisk(riskData: ProtocolRiskData): Promise<RiskCategory> {
    const factors: string[] = [];
    let totalScore = 100;
    const g = riskData.governanceMetrics;
    if (g.tokenDistribution.topHolders > 50) { totalScore -= 25; factors.push('High token concentration in top holders'); }
    else if (g.tokenDistribution.topHolders > 30) { totalScore -= 15; factors.push('Moderate token concentration'); }
    if (g.tokenDistribution.whaleConcentration > 40) { totalScore -= 20; factors.push('High whale concentration'); }
    if (g.votingParticipation.averageParticipation < 10) { totalScore -= 15; factors.push('Very low voting participation'); }
    else if (g.votingParticipation.averageParticipation < 20) { totalScore -= 10; factors.push('Low voting participation'); }
    if (!g.governanceStructure.multisigRequired) { totalScore -= 15; factors.push('No multisig requirement'); }
    if (!g.governanceStructure.timelocksImplemented) { totalScore -= 10; factors.push('No timelocks implemented'); }
    if (g.governanceStructure.upgradeability === 'upgradeable') { totalScore -= 5; factors.push('Protocol is upgradeable'); }
    if (g.votingParticipation.proposalPassRate > 90) { totalScore -= 10; factors.push('Very high proposal pass rate (potential rubber stamping)'); }
    const finalScore = Math.max(0, Math.min(100, totalScore));
    const riskLevel = this.scoreToRiskLevel(finalScore);
    return { score: finalScore, level: riskLevel, weight: this.config.riskWeights.governance, factors, mitigation: this.generateGovernanceMitigation(factors) };
  }

  private async assessRegulatoryRisk(riskData: ProtocolRiskData): Promise<RiskCategory> {
    const factors: string[] = [];
    let totalScore = 100;
    switch (riskData.network) {
      case BlockchainNetwork.ETHEREUM: totalScore -= 5; break;
      case BlockchainNetwork.BSC: totalScore -= 15; factors.push('Operating on BSC with higher regulatory uncertainty'); break;
      default: totalScore -= 10; break;
    }
    switch (riskData.protocol) {
      case DeFiProtocolEnum.COMPOUND:
      case DeFiProtocolEnum.AAVE:
        totalScore -= 10; factors.push('Lending protocol subject to financial regulations');
        break;
      case DeFiProtocolEnum.UNISWAP_V3:
        totalScore -= 5; factors.push('DEX protocol with moderate regulatory risk');
        break;
    }
    const finalScore = Math.max(0, Math.min(100, totalScore));
    const riskLevel = this.scoreToRiskLevel(finalScore);
    return { score: finalScore, level: riskLevel, weight: this.config.riskWeights.regulatory, factors, mitigation: this.generateRegulatoryMitigation(factors) };
  }

  private async assessOperationalRisk(riskData: ProtocolRiskData): Promise<RiskCategory> {
    const factors: string[] = [];
    let totalScore = 100;
    const upgradeFreq = riskData.technicalMetrics.upgradeMetrics.upgradeFrequency;
    if (upgradeFreq > 2) { totalScore -= 15; factors.push('Very frequent upgrades indicate instability'); }
    else if (upgradeFreq === 0) { totalScore -= 10; factors.push('No upgrades may indicate stagnation'); }
    if (riskData.technicalMetrics.upgradeMetrics.breakingChanges > 2) { totalScore -= 10; factors.push('Multiple breaking changes in the last year'); }
    if (riskData.technicalMetrics.upgradeMetrics.deploymentRisk > 70) { totalScore -= 15; factors.push('High deployment risk score'); }
    if (riskData.technicalMetrics.codeMetrics.dependencies > 20) { totalScore -= 10; factors.push('High number of external dependencies'); }
    const recentIncidents = riskData.incidentHistory.filter(i => Date.now() - i.date.getTime() < 365 * 24 * 60 * 60 * 1000);
    if (recentIncidents.length > 0) {
      const avgResolutionTime = recentIncidents.reduce((sum, i) => sum + i.resolution.resolutionTime, 0) / recentIncidents.length;
      if (avgResolutionTime > 48) { totalScore -= 10; factors.push('Slow incident response time'); }
      const resolvedCount = recentIncidents.filter(i => i.resolution.resolved).length;
      const resolutionRate = resolvedCount / recentIncidents.length;
      if (resolutionRate < 0.8) { totalScore -= 15; factors.push('Poor incident resolution rate'); }
    }
    const finalScore = Math.max(0, Math.min(100, totalScore));
    const riskLevel = this.scoreToRiskLevel(finalScore);
    return { score: finalScore, level: riskLevel, weight: this.config.riskWeights.operational, factors, mitigation: this.generateOperationalMitigation(factors) };
  }

  private async generateMLRiskSignals(riskData: ProtocolRiskData): Promise<MLRiskSignals> {
    const signals: MLRiskSignals = { anomalyScore: Math.random() * 0.3, trendSignal: 'neutral', volatilitySignal: 'medium', liquiditySignal: 'healthy', technicalSignal: 'moderate' };
    if (riskData.tvlHistory.length > 7) {
      const recentTVL = riskData.tvlHistory.slice(-7);
      const tvlValues = recentTVL.map(t => t.totalTVL);
      const tvlTrend = this.calculateTrend(tvlValues);
      if (tvlTrend > 0.1) signals.trendSignal = 'bullish';
      else if (tvlTrend < -0.1) signals.trendSignal = 'bearish';
    }
    const vol = riskData.marketMetrics.volatilityMetrics;
    if (vol.priceVolatility > 0.8) signals.volatilitySignal = 'extreme';
    else if (vol.priceVolatility > 0.5) signals.volatilitySignal = 'high';
    else if (vol.priceVolatility < 0.2) signals.volatilitySignal = 'low';
    const liq = riskData.marketMetrics.liquidityMetrics;
    if (liq.concentrationRisk > 80) signals.liquiditySignal = 'critical';
    else if (liq.concentrationRisk > 60) signals.liquiditySignal = 'stressed';
    const tech = riskData.technicalMetrics;
    if (tech.securityMetrics.vulnerabilityScore > 70) signals.technicalSignal = 'failing';
    else if (tech.securityMetrics.vulnerabilityScore > 50) signals.technicalSignal = 'weak';
    else if (tech.securityMetrics.vulnerabilityScore < 20) signals.technicalSignal = 'strong';
    return signals;
  }

  private calculateOverallRiskScore(
    riskCategories: { smartContractRisk: RiskCategory; liquidityRisk: RiskCategory; marketRisk: RiskCategory; governanceRisk: RiskCategory; regulatoryRisk: RiskCategory; operationalRisk: RiskCategory },
    mlSignals?: MLRiskSignals | null
  ): number {
    let weightedScore = 0;
    weightedScore += riskCategories.smartContractRisk.score * this.config.riskWeights.smartContract;
    weightedScore += riskCategories.liquidityRisk.score * this.config.riskWeights.liquidity;
    weightedScore += riskCategories.marketRisk.score * this.config.riskWeights.market;
    weightedScore += riskCategories.governanceRisk.score * this.config.riskWeights.governance;
    weightedScore += riskCategories.regulatoryRisk.score * this.config.riskWeights.regulatory;
    weightedScore += riskCategories.operationalRisk.score * this.config.riskWeights.operational;
    if (mlSignals) {
      const anomalyAdjustment = mlSignals.anomalyScore * 20;
      weightedScore -= anomalyAdjustment;
      if (mlSignals.trendSignal === 'bearish') weightedScore -= 5;
      else if (mlSignals.trendSignal === 'bullish') weightedScore += 2;
      if (mlSignals.volatilitySignal === 'extreme') weightedScore -= 10;
      else if (mlSignals.volatilitySignal === 'high') weightedScore -= 5;
      if (mlSignals.liquiditySignal === 'critical') weightedScore -= 15;
      else if (mlSignals.liquiditySignal === 'stressed') weightedScore -= 7;
      if (mlSignals.technicalSignal === 'failing') weightedScore -= 10;
      else if (mlSignals.technicalSignal === 'weak') weightedScore -= 5;
      else if (mlSignals.technicalSignal === 'strong') weightedScore += 3;
    }
    return Math.max(0, Math.min(100, Math.round(weightedScore)));
  }

  private categorizeRiskLevel(score: number): DeFiRiskLevel {
    if (score >= 90) return DeFiRiskLevel.VERY_LOW;
    if (score >= 70) return DeFiRiskLevel.LOW;
    if (score >= 50) return DeFiRiskLevel.MEDIUM;
    if (score >= 30) return DeFiRiskLevel.HIGH;
    if (score >= 10) return DeFiRiskLevel.VERY_HIGH;
    return DeFiRiskLevel.CRITICAL;
  }

  private scoreToRiskLevel(score: number): DeFiRiskLevel { return this.categorizeRiskLevel(score); }

  private isCacheValid(timestamp: Date): boolean { return Date.now() - timestamp.getTime() < this.config.updateInterval * 1000; }

  private calculateTrend(values: number[]): number {
    if (values.length < 2) return 0;
    const firstHalf = values.slice(0, Math.floor(values.length / 2));
    const secondHalf = values.slice(Math.floor(values.length / 2));
    const firstAvg = firstHalf.reduce((s, v) => s + v, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((s, v) => s + v, 0) / secondHalf.length;
    return (secondAvg - firstAvg) / (firstAvg || 1);
  }

  private generateSmartContractMitigation(factors: string[]): string[] {
    const m: string[] = [];
    if (factors.some(f => f.includes('audit'))) { m.push('Conduct comprehensive security audit', 'Implement formal verification'); }
    if (factors.some(f => f.includes('complexity'))) { m.push('Refactor code to reduce complexity', 'Improve code documentation'); }
    if (factors.some(f => f.includes('incident'))) { m.push('Implement emergency pause mechanism', 'Establish incident response plan'); }
    return m;
  }

  private generateLiquidityMitigation(factors: string[]): string[] {
    const m: string[] = [];
    if (factors.some(f => f.includes('TVL'))) { m.push('Incentivize liquidity provision', 'Implement gradual withdrawal limits'); }
    if (factors.some(f => f.includes('concentration'))) { m.push('Diversify liquidity sources', 'Implement whale withdrawal limits'); }
    return m;
  }

  private generateMarketMitigation(factors: string[]): string[] {
    const m: string[] = [];
    if (factors.some(f => f.includes('volatility'))) { m.push('Implement volatility dampening mechanisms', 'Consider stablecoin integration'); }
    if (factors.some(f => f.includes('correlation'))) { m.push('Diversify asset exposure', 'Implement correlation monitoring'); }
    return m;
  }

  private generateGovernanceMitigation(factors: string[]): string[] {
    const m: string[] = [];
    if (factors.some(f => f.includes('concentration'))) { m.push('Implement delegation mechanisms', 'Improve token distribution'); }
    if (factors.some(f => f.includes('participation'))) { m.push('Incentivize voting participation', 'Improve governance UI/UX'); }
    return m;
  }

  private generateRegulatoryMitigation(_factors: string[]): string[] {
    return ['Monitor regulatory developments', 'Engage with regulatory bodies', 'Implement compliance framework', 'Consider geographic decentralization'];
  }

  private generateOperationalMitigation(factors: string[]): string[] {
    const m: string[] = [];
    if (factors.some(f => f.includes('upgrade'))) { m.push('Establish upgrade governance process', 'Implement gradual rollout strategy'); }
    if (factors.some(f => f.includes('response'))) { m.push('Improve incident response procedures', 'Establish 24/7 monitoring'); }
    return m;
  }

  private initializeMLModels(): void {
    if (!this.config.enableMLModels) return;
    logger.info('ML models initialized for risk assessment');
  }

  private generateRecommendations(
    score: number,
    _factors: DetailedRiskFactor[],
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

    if (mlSignals && mlSignals.anomalyScore > 0.2) {
      recommendations.push('ML anomaly detected: Increase observation window and alert thresholds');
    }
    return recommendations;
  }

  // データ取得のプレースホルダー（アプリ側で差し替え可能）
  // 実運用ではAdapterを注入して取得する設計に拡張予定
  // eslint-disable-next-line @typescript-eslint/require-await
  private async getRiskData(_protocolId: string): Promise<ProtocolRiskData | null> { return null; }
  // eslint-disable-next-line @typescript-eslint/require-await
  private async generateDetailedRiskFactors(_riskData: ProtocolRiskData, _categories: unknown): Promise<DetailedRiskFactor[]> { return []; }
  // eslint-disable-next-line @typescript-eslint/require-await
  private async performPeerComparison(_riskData: ProtocolRiskData, _score: number): Promise<PeerRiskComparison[]> { return []; }
  // eslint-disable-next-line @typescript-eslint/require-await
  private async updateRiskHistory(_protocolId: string, _score: number): Promise<RiskHistoryPoint[]> { return []; }

  cleanup(): void {
    this.riskDataCache.clear();
    this.riskAssessmentCache.clear();
    this.mlModels.clear();
    logger.debug('DeFi risk assessment engine cleanup completed');
  }
}
