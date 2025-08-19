import {
  DeFiProtocol,
  BlockchainNetwork,
  ProtocolInfo,
  TVLData,
  // DeFiMarketOverview,
  DeFiRiskAssessment,
  DeFiAlertCondition,
  GasInfo,
  DeFiRiskLevel,
} from './types'
import { DeFiProtocolConnector } from './protocol-connector'
import type { AlertsPersistencePort, LoggerPort } from './ports'

export interface MonitoringConfig {
  updateInterval: number
  enabledProtocols: DeFiProtocol[]
  enabledNetworks: BlockchainNetwork[]
  riskThresholds: {
    tvlDropPercent: number
    liquidityDropPercent: number
    gasSpike: number
    riskScoreThreshold: number
  }
  alertingEnabled: boolean
  dataRetentionDays: number
}

export interface MonitoringMetrics {
  protocolsMonitored: number
  totalTVL: number
  alertsGenerated: number
  dataPointsCollected: number
  lastUpdateTime: Date
  errorRate: number
  averageResponseTime: number
}

export class DeFiMonitoringEngine {
  private readonly connector: DeFiProtocolConnector
  private monitoringTimer: ReturnType<typeof setInterval> | null = null
  private isRunning = false
  private metrics: MonitoringMetrics
  private protocolData: Map<string, ProtocolInfo> = new Map()
  private tvlHistory: Map<string, TVLData[]> = new Map()
  private riskAssessments: Map<string, DeFiRiskAssessment> = new Map()
  private alertConditions: Map<string, DeFiAlertCondition[]> = new Map()

  constructor(
    private readonly logger: LoggerPort,
    private readonly persistence: AlertsPersistencePort,
    private readonly config: MonitoringConfig = {
      updateInterval: 300,
      enabledProtocols: [
        'uniswap_v3',
        'aave',
        'compound',
        'curve',
        'yearn',
      ],
      enabledNetworks: [
        BlockchainNetwork.ETHEREUM,
        BlockchainNetwork.POLYGON,
        BlockchainNetwork.ARBITRUM,
      ],
      riskThresholds: {
        tvlDropPercent: 10,
        liquidityDropPercent: 15,
        gasSpike: 100,
        riskScoreThreshold: 30,
      },
      alertingEnabled: true,
      dataRetentionDays: 30,
    },
  ) {
    this.connector = new DeFiProtocolConnector()
    this.metrics = {
      protocolsMonitored: 0,
      totalTVL: 0,
      alertsGenerated: 0,
      dataPointsCollected: 0,
      lastUpdateTime: new Date(),
      errorRate: 0,
      averageResponseTime: 0,
    }
  }

  async start(): Promise<void> {
    if (this.isRunning) {
      this.logger.warn('DeFi monitoring engine is already running')
      return
    }
    try {
      this.isRunning = true
      await this.performInitialDataCollection()
      await this.loadAlertConditions()
      this.startPeriodicMonitoring()
      this.logger.info('DeFi monitoring engine started', {
        updateInterval: this.config.updateInterval,
        protocolsEnabled: this.config.enabledProtocols.length,
        networksEnabled: this.config.enabledNetworks.length,
      })
    } catch (error) {
      this.isRunning = false
      this.logger.error('Failed to start DeFi monitoring engine', {
        error: error instanceof Error ? error.message : String(error),
      })
      throw error
    }
  }

  async stop(): Promise<void> {
    if (!this.isRunning) return
    this.isRunning = false
    if (this.monitoringTimer) {
      clearInterval(this.monitoringTimer)
      this.monitoringTimer = null
    }
    await this.saveCurrentState()
    this.logger.info('DeFi monitoring engine stopped')
  }

  private async performInitialDataCollection(): Promise<void> {
    const startTime = Date.now()
    let successCount = 0
    let errorCount = 0
    this.logger.info('Starting initial DeFi data collection')
    for (const protocol of this.config.enabledProtocols) {
      try {
        const protocolInfo = await this.connector.getProtocolInfo(protocol)
        if (protocolInfo) {
          this.protocolData.set(protocolInfo.id, protocolInfo)
          successCount++
          for (const network of this.config.enabledNetworks) {
            const tvlData = await this.connector.getTVLData(protocol, { network })
            if (tvlData) {
              const key = `${protocol}_${network}`
              if (!this.tvlHistory.has(key)) this.tvlHistory.set(key, [])
              this.tvlHistory.get(key)!.push(tvlData)
            }
          }
          const riskAssessment = await this.assessProtocolRisk(protocolInfo)
          if (riskAssessment) this.riskAssessments.set(protocolInfo.id, riskAssessment)
        }
      } catch (error) {
        errorCount++
        this.logger.error('Error collecting initial data for protocol', {
          protocol,
          error: error instanceof Error ? error.message : String(error),
        })
      }
    }
    const duration = Date.now() - startTime
    this.metrics.protocolsMonitored = successCount
    this.metrics.dataPointsCollected = successCount
    this.metrics.errorRate = successCount + errorCount > 0 ? errorCount / (successCount + errorCount) : 0
    this.metrics.averageResponseTime = successCount + errorCount > 0 ? duration / (successCount + errorCount) : 0
    this.metrics.lastUpdateTime = new Date()
    this.logger.info('Initial DeFi data collection completed', {
      successCount,
      errorCount,
      duration: `${duration}ms`,
      errorRate: `${(this.metrics.errorRate * 100).toFixed(2)}%`,
    })
  }

  private startPeriodicMonitoring(): void {
    this.monitoringTimer = setInterval(async () => {
      if (!this.isRunning) return
      try {
        await this.performMonitoringCycle()
      } catch (error) {
        this.logger.error('Error in monitoring cycle', {
          error: error instanceof Error ? error.message : String(error),
        })
      }
    }, this.config.updateInterval * 1000)
  }

  private async performMonitoringCycle(): Promise<void> {
    const startTime = Date.now()
    const cycleMetrics = { protocolsUpdated: 0, alertsGenerated: 0, errors: 0 }
    this.logger.debug('Starting DeFi monitoring cycle')
    for (const protocol of this.config.enabledProtocols) {
      try {
        await this.updateProtocolData(protocol)
        cycleMetrics.protocolsUpdated++
      } catch (error) {
        cycleMetrics.errors++
        this.logger.error('Error updating protocol data', {
          protocol,
          error: error instanceof Error ? error.message : String(error),
        })
      }
    }
    for (const network of this.config.enabledNetworks) {
      try {
        await this.monitorGasPrices(network)
      } catch (error) {
        this.logger.error('Error monitoring gas prices', {
          network,
          error: error instanceof Error ? error.message : String(error),
        })
      }
    }
    if (this.config.alertingEnabled) {
      try {
        const alerts = await this.checkAlertConditions()
        cycleMetrics.alertsGenerated = alerts
      } catch (error) {
        this.logger.error('Error checking alert conditions', {
          error: error instanceof Error ? error.message : String(error),
        })
      }
    }
    try {
      await this.updateRiskAssessments()
    } catch (error) {
      this.logger.error('Error updating risk assessments', {
        error: error instanceof Error ? error.message : String(error),
      })
    }
    await this.cleanupOldData()
    const duration = Date.now() - startTime
    this.metrics.dataPointsCollected += cycleMetrics.protocolsUpdated
    this.metrics.alertsGenerated += cycleMetrics.alertsGenerated
    this.metrics.errorRate = cycleMetrics.protocolsUpdated > 0 ? cycleMetrics.errors / cycleMetrics.protocolsUpdated : 0
    this.metrics.averageResponseTime = cycleMetrics.protocolsUpdated > 0 ? duration / cycleMetrics.protocolsUpdated : 0
    this.metrics.lastUpdateTime = new Date()
    this.metrics.totalTVL = Array.from(this.protocolData.values()).reduce((sum, p) => sum + p.tvl, 0)
    this.logger.debug('DeFi monitoring cycle completed', { ...cycleMetrics, duration: `${duration}ms`, totalTVL: this.metrics.totalTVL })
  }

  private async updateProtocolData(protocol: DeFiProtocol): Promise<void> {
    const protocolInfo = await this.connector.getProtocolInfo(protocol, { forceRefresh: true })
    if (protocolInfo) this.protocolData.set(protocolInfo.id, protocolInfo)
    for (const network of this.config.enabledNetworks) {
      const tvlData = await this.connector.getTVLData(protocol, { network, forceRefresh: true })
      if (tvlData) {
        const key = `${protocol}_${network}`
        if (!this.tvlHistory.has(key)) this.tvlHistory.set(key, [])
        const history = this.tvlHistory.get(key)!
        history.push(tvlData)
        if (history.length > 1000) history.splice(0, history.length - 1000)
      }
    }
  }

  private async monitorGasPrices(network: BlockchainNetwork): Promise<void> {
    const gasInfo = await this.connector.getGasInfo(network, { forceRefresh: true })
    if (gasInfo && gasInfo.gasPrice > this.config.riskThresholds.gasSpike) {
      await this.generateGasSpikeAlert(network, gasInfo)
    }
  }

  private async checkAlertConditions(): Promise<number> {
    let alertCount = 0
    for (const [userId, conditions] of this.alertConditions) {
      for (const condition of conditions) {
        if (!condition.enabled) continue
        try {
          const shouldTrigger = await this.evaluateAlertCondition(condition)
          if (shouldTrigger) {
            await this.triggerAlert(condition)
            alertCount++
          }
        } catch (error) {
          this.logger.error('Error evaluating alert condition', {
            alertId: condition.id,
            userId,
            error: error instanceof Error ? error.message : String(error),
          })
        }
      }
    }
    return alertCount
  }

  private async evaluateAlertCondition(condition: DeFiAlertCondition): Promise<boolean> {
    if (condition.lastTriggered) {
      const timeSinceLastTrigger = Date.now() - condition.lastTriggered.getTime()
      const cooldownMs = 60 * 60 * 1000
      if (timeSinceLastTrigger < cooldownMs) return false
    }
    switch (condition.type) {
      case 'tvl_change':
        return this.checkTVLChangeCondition(condition)
      case 'liquidity_drop':
        return this.checkLiquidityDropCondition(condition)
      case 'risk_increase':
        return this.checkRiskIncreaseCondition(condition)
      case 'gas_spike':
        return this.checkGasSpikeCondition(condition)
      case 'governance_proposal':
        return this.checkGovernanceProposalCondition(condition)
      default:
        return false
    }
  }

  private checkTVLChangeCondition(condition: DeFiAlertCondition): boolean {
    if (!condition.protocolId || !condition.thresholds.tvlChangePercent) return false
    const protocolData = this.protocolData.get(condition.protocolId)
    if (!protocolData) return false
    const key = `${protocolData.protocol}_${condition.network || BlockchainNetwork.ETHEREUM}`
    const tvlHistory = this.tvlHistory.get(key)
    if (!tvlHistory || tvlHistory.length < 2) return false
    const current = tvlHistory[tvlHistory.length - 1]
    const previous = tvlHistory[tvlHistory.length - 2]
    const changePercent = ((current.totalTVL - previous.totalTVL) / previous.totalTVL) * 100
    return Math.abs(changePercent) >= condition.thresholds.tvlChangePercent
  }

  private checkLiquidityDropCondition(_condition: DeFiAlertCondition): boolean { void _condition; return false }
  private checkRiskIncreaseCondition(condition: DeFiAlertCondition): boolean {
    if (!condition.protocolId || !condition.thresholds.riskScoreIncrease) return false
    const riskAssessment = this.riskAssessments.get(condition.protocolId)
    if (!riskAssessment) return false
    const baselineScore = 70
    const currentScore = riskAssessment.overallScore
    return (baselineScore - currentScore) >= condition.thresholds.riskScoreIncrease
  }
  private checkGasSpikeCondition(_condition: DeFiAlertCondition): boolean { void _condition; return false }
  private checkGovernanceProposalCondition(_condition: DeFiAlertCondition): boolean { void _condition; return false }

  private async triggerAlert(condition: DeFiAlertCondition): Promise<void> {
    try {
      await this.persistence.insertDefiAlert({
        condition_id: condition.id,
        user_id: condition.userId,
        protocol_id: condition.protocolId,
        network: condition.network,
        type: condition.type,
        triggered_at: new Date(),
        details: { thresholds: condition.thresholds },
      })
      condition.lastTriggered = new Date()
      condition.triggerCount++
      this.logger.info('DeFi alert triggered', {
        alertId: condition.id,
        type: condition.type,
        userId: condition.userId,
        protocolId: condition.protocolId,
      })
    } catch (error) {
      this.logger.error('Error triggering DeFi alert', { alertId: condition.id, error: error instanceof Error ? error.message : String(error) })
    }
  }

  private async generateGasSpikeAlert(network: BlockchainNetwork, gasInfo: GasInfo): Promise<void> {
    this.logger.warn('Gas spike detected', { network, gasPrice: gasInfo.gasPrice, threshold: this.config.riskThresholds.gasSpike })
    await this.persistence.insertSystemAlert({
      type: 'gas_spike',
      network,
      severity: 'warning',
      details: { gasPrice: gasInfo.gasPrice, threshold: this.config.riskThresholds.gasSpike, networkCongestion: gasInfo.networkCongestion },
      created_at: new Date(),
    })
  }

  private async updateRiskAssessments(): Promise<void> {
    for (const [protocolId, protocolInfo] of this.protocolData) {
      try {
        const riskAssessment = await this.assessProtocolRisk(protocolInfo)
        if (riskAssessment) this.riskAssessments.set(protocolId, riskAssessment)
      } catch (error) {
        this.logger.error('Error updating risk assessment', { protocolId, error: error instanceof Error ? error.message : String(error) })
      }
    }
  }

  private async cleanupOldData(): Promise<void> {
    const cutoffDate = new Date(Date.now() - this.config.dataRetentionDays * 24 * 60 * 60 * 1000)
    for (const [key, history] of this.tvlHistory) {
      const filtered = history.filter(d => d.timestamp > cutoffDate)
      this.tvlHistory.set(key, filtered)
    }
  }

  private async saveCurrentState(): Promise<void> {
    try {
      for (const [protocolId, protocolInfo] of this.protocolData) {
        await this.persistence.upsertProtocolData({
          protocol_id: protocolId,
          protocol_name: protocolInfo.name,
          protocol_type: protocolInfo.protocol,
          network: protocolInfo.network,
          tvl: protocolInfo.tvl,
          volume_24h: protocolInfo.volume24h,
          risk_score: protocolInfo.riskScore,
          risk_level: protocolInfo.riskLevel,
          updated_at: new Date(),
        })
      }
      for (const [protocolId, assessment] of this.riskAssessments) {
        await this.persistence.upsertRiskAssessment({
          protocol_id: protocolId,
          overall_score: assessment.overallScore,
          risk_level: assessment.riskLevel,
          smart_contract_risk: assessment.smartContractRisk,
          liquidity_risk: assessment.liquidityRisk,
          market_risk: assessment.marketRisk,
          recommendations: assessment.recommendations,
          updated_at: new Date(),
        })
      }
      this.logger.debug('DeFi monitoring state saved')
    } catch (error) {
      this.logger.error('Error saving DeFi monitoring state', { error: error instanceof Error ? error.message : String(error) })
    }
  }

  private async loadAlertConditions(): Promise<void> {
    try {
      const rows = await this.persistence.loadAlertConditions()
      this.alertConditions.clear()
      for (const condition of rows) {
        const userId = String(condition.user_id ?? '')
        if (!userId) continue
        if (!this.alertConditions.has(userId)) this.alertConditions.set(userId, [])
        this.alertConditions.get(userId)!.push({
          id: String(condition.id),
          userId,
          name: String(condition.name ?? ''),
          protocolId: condition.protocol_id ? String(condition.protocol_id) : undefined,
          poolId: condition.pool_id ? String(condition.pool_id) : undefined,
          network: condition.network ? (String(condition.network) as BlockchainNetwork) : undefined,
          type: String(condition.type) as DeFiAlertCondition['type'],
          thresholds: (condition.thresholds as Record<string, number | undefined>) ?? {},
          notifications: (condition.notifications as DeFiAlertCondition['notifications']) ?? { email: false, push: false, webhook: false },
          enabled: Boolean(condition.enabled),
          lastTriggered: condition.last_triggered ? new Date(String(condition.last_triggered)) : undefined,
          triggerCount: Number(condition.trigger_count ?? 0),
          createdAt: new Date(String(condition.created_at ?? new Date().toISOString())),
          updatedAt: new Date(String(condition.updated_at ?? new Date().toISOString())),
        })
      }
      this.logger.info('DeFi alert conditions loaded', { conditionsCount: rows.length, usersCount: this.alertConditions.size })
    } catch (error) {
      this.logger.error('Error loading DeFi alert conditions', { error: error instanceof Error ? error.message : String(error) })
    }
  }

  private async assessProtocolRisk(protocolInfo: ProtocolInfo): Promise<DeFiRiskAssessment> {
    const overallScore = protocolInfo.riskScore
    const riskLevel = this.categorizeRiskLevel(overallScore)
    return {
      protocolId: protocolInfo.id,
      protocol: protocolInfo.protocol,
      overallScore,
      riskLevel,
      smartContractRisk: { score: overallScore, level: riskLevel, weight: 0.3, factors: [], mitigation: [] },
      liquidityRisk: { score: Math.max(0, overallScore - 10), level: this.categorizeRiskLevel(Math.max(0, overallScore - 10)), weight: 0.25, factors: [], mitigation: [] },
      marketRisk: { score: Math.max(0, overallScore - 5), level: this.categorizeRiskLevel(Math.max(0, overallScore - 5)), weight: 0.2, factors: [], mitigation: [] },
      governanceRisk: { score: overallScore, level: riskLevel, weight: 0.15, factors: [], mitigation: [] },
      regulatoryRisk: { score: 60, level: DeFiRiskLevel.MEDIUM, weight: 0.05, factors: [], mitigation: [] },
      operationalRisk: { score: overallScore, level: riskLevel, weight: 0.05, factors: [], mitigation: [] },
      riskFactors: [],
      recommendations: this.generateRiskRecommendations(overallScore),
      peerComparison: [],
      riskHistory: [],
      timestamp: new Date(),
    }
  }

  private categorizeRiskLevel(score: number): DeFiRiskLevel {
    if (score >= 90) return DeFiRiskLevel.VERY_LOW
    if (score >= 70) return DeFiRiskLevel.LOW
    if (score >= 50) return DeFiRiskLevel.MEDIUM
    if (score >= 30) return DeFiRiskLevel.HIGH
    if (score >= 10) return DeFiRiskLevel.VERY_HIGH
    return DeFiRiskLevel.CRITICAL
  }

  private generateRiskRecommendations(score: number): string[] {
    const r: string[] = []
    if (score < 30) r.push('Consider reducing exposure to this protocol', 'Monitor protocol developments closely', 'Implement additional risk controls')
    else if (score < 50) r.push('Maintain cautious approach', 'Review risk tolerance settings')
    else if (score < 70) r.push('Standard monitoring recommended', 'Consider diversification benefits')
    else r.push('Protocol appears relatively safe', 'Continue regular monitoring')
    return r
  }

  async cleanup(): Promise<void> {
    await this.stop()
    this.connector.cleanup()
    this.logger.info('DeFi monitoring engine cleanup completed')
  }

  getMetrics(): MonitoringMetrics { return { ...this.metrics } }
  getProtocolData(protocolId: string): ProtocolInfo | undefined { return this.protocolData.get(protocolId) }
  getTVLHistory(protocol: DeFiProtocol, network?: BlockchainNetwork): TVLData[] {
    const key = `${protocol}_${network || BlockchainNetwork.ETHEREUM}`
    return this.tvlHistory.get(key) || []
  }
  getRiskAssessment(protocolId: string): DeFiRiskAssessment | undefined { return this.riskAssessments.get(protocolId) }
}
