// 🚨 高度なスマートアラートシステム型定義
// 価格、技術指標、ボリューム、リスクなど包括的なアラート機能

export enum AlertType {
  // 価格アラート
  PRICE_ABOVE = 'price_above',
  PRICE_BELOW = 'price_below',
  PRICE_CHANGE = 'price_change',
  PRICE_BREAKOUT = 'price_breakout',
  
  // 技術指標アラート
  RSI_OVERBOUGHT = 'rsi_overbought',
  RSI_OVERSOLD = 'rsi_oversold',
  MACD_CROSSOVER = 'macd_crossover',
  BOLLINGER_BREAKOUT = 'bollinger_breakout',
  MA_CROSSOVER = 'ma_crossover',
  
  // ボリュームアラート
  VOLUME_SPIKE = 'volume_spike',
  VOLUME_DROP = 'volume_drop',
  VOLUME_ABNORMAL = 'volume_abnormal',
  
  // 高度なリスクアラート
  VAR_EXCEEDED = 'var_exceeded',
  SHARPE_DECLINE = 'sharpe_decline',
  CORRELATION_BREAKDOWN = 'correlation_breakdown',
  BETA_SHIFT = 'beta_shift',
  DRAWDOWN_ALERT = 'drawdown_alert',
  
  // DeFiアラート
  TVL_CHANGE = 'tvl_change',
  LIQUIDITY_DROP = 'liquidity_drop',
  GAS_SPIKE = 'gas_spike',
  YIELD_CHANGE = 'yield_change',
  
  // システムアラート
  API_ERROR = 'api_error',
  DATA_STALE = 'data_stale',
  SYSTEM_OVERLOAD = 'system_overload'
}

export enum AlertSeverity {
  INFO = 'info',
  WARNING = 'warning',
  CRITICAL = 'critical',
  EMERGENCY = 'emergency'
}

export enum AlertStatus {
  ACTIVE = 'active',
  TRIGGERED = 'triggered',
  ACKNOWLEDGED = 'acknowledged',
  RESOLVED = 'resolved',
  DISABLED = 'disabled'
}

export enum NotificationMethod {
  EMAIL = 'email',
  PUSH = 'push',
  SMS = 'sms',
  WEBHOOK = 'webhook',
  IN_APP = 'in_app'
}

// 基本アラート設定
export interface AlertCondition {
  id: string;
  userId: string;
  name: string;
  description?: string;
  type: AlertType;
  severity: AlertSeverity;
  status: AlertStatus;
  
  // 対象アセット
  symbol: string;
  exchange?: string;
  
  // 条件設定
  conditions: AlertParameters;
  
  // 通知設定
  notificationMethods: NotificationMethod[];
  cooldownPeriod: number; // 分単位
  
  // メタデータ
  createdAt: Date;
  updatedAt: Date;
  lastTriggered?: Date;
  triggerCount: number;
  
  // 有効期限
  expiresAt?: Date;
  
  // 高度な設定
  timeframe?: string; // '1m', '5m', '1h', '1d'
  markets?: string[]; // 複数市場での監視
}

// アラート条件パラメータ（型に応じて異なる）
export type AlertParameters = 
  | PriceAlertParams
  | TechnicalIndicatorParams
  | VolumeAlertParams
  | RiskAlertParams
  | DeFiAlertParams
  | Record<string, unknown>; // 柔軟な型サポートのため

// 価格アラートパラメータ
export interface PriceAlertParams {
  targetPrice?: number;
  changePercent?: number;
  changeAmount?: number;
  timeframe?: string;
  basePrice?: number; // ブレイクアウト用
  resistanceLevel?: number;
  supportLevel?: number;
}

// 技術指標アラートパラメータ
export interface TechnicalIndicatorParams {
  rsi?: {
    overboughtThreshold: number; // デフォルト70
    oversoldThreshold: number;   // デフォルト30
    period: number;              // デフォルト14
  };
  macd?: {
    fastPeriod: number;          // デフォルト12
    slowPeriod: number;          // デフォルト26
    signalPeriod: number;        // デフォルト9
    crossoverDirection: 'bullish' | 'bearish' | 'both';
  };
  bollinger?: {
    period: number;              // デフォルト20
    stdDev: number;              // デフォルト2
    breakoutDirection: 'upper' | 'lower' | 'both';
  };
  movingAverage?: {
    fastPeriod: number;
    slowPeriod: number;
    type: 'sma' | 'ema' | 'wma';
    crossoverDirection: 'bullish' | 'bearish' | 'both';
  };
}

// ボリュームアラートパラメータ
export interface VolumeAlertParams {
  spikeMultiplier?: number;      // 平均ボリュームの何倍か
  dropThreshold?: number;        // ボリューム減少の閾値（%）
  averagePeriod?: number;        // 平均計算期間（日数）
  minimumVolume?: number;        // 最小ボリューム閾値
  timeframe?: string;
}

// リスクアラートパラメータ
export interface RiskAlertParams {
  var?: {
    threshold: number;           // VaRの閾値（%）
    confidence: number;          // 信頼度（95%, 99%等）
    horizon: number;             // 時間軸（日数）
  };
  sharpeRatio?: {
    threshold: number;           // シャープレシオの最小値
    period: number;              // 計算期間（日数）
  };
  correlation?: {
    threshold: number;           // 相関係数の閾値
    referenceAsset: string;      // 基準アセット
    period: number;              // 計算期間
  };
  beta?: {
    threshold: number;           // ベータ値の閾値
    referenceIndex: string;      // 基準インデックス
    period: number;              // 計算期間
  };
  drawdown?: {
    threshold: number;           // ドローダウンの閾値（%）
    period: number;              // 監視期間
  };
}

// DeFiアラートパラメータ
export interface DeFiAlertParams {
  tvl?: {
    changeThreshold: number;     // TVL変動の閾値（%）
    protocol: string;            // 対象プロトコル
    timeframe: string;           // 監視期間
  };
  liquidity?: {
    dropThreshold: number;       // 流動性減少の閾値（%）
    poolAddress: string;         // 対象プール
    network: string;             // ブロックチェーン
  };
  gasPrice?: {
    threshold: number;           // ガス価格の閾値（Gwei）
    network: string;             // ネットワーク
  };
  yield?: {
    changeThreshold: number;     // 利回り変動の閾値（%）
    protocol: string;            // 対象プロトコル
    poolId: string;              // プールID
  };
}

// トリガーされたアラート
export interface TriggeredAlert {
  id: string;
  alertConditionId: string;
  userId: string;
  type: AlertType;
  severity: AlertSeverity;
  
  // トリガー情報
  triggeredAt: Date;
  triggeredPrice?: number;
  currentValue: number;
  previousValue?: number;
  changePercent?: number;
  
  // メッセージ
  title: string;
  message: string;
  details?: Record<string, unknown>;
  
  // アクション
  acknowledged: boolean;
  acknowledgedAt?: Date;
  acknowledgedBy?: string;
  
  // 通知状況
  notificationsSent: NotificationStatus[];
}

// 通知状況
export interface NotificationStatus {
  method: NotificationMethod;
  sentAt: Date;
  success: boolean;
  error?: string;
  retryCount: number;
}

// アラート統計
export interface AlertStatistics {
  totalAlerts: number;
  activeAlerts: number;
  triggeredToday: number;
  triggeredThisWeek: number;
  triggeredThisMonth: number;
  
  // タイプ別統計
  byType: Record<AlertType, number>;
  bySeverity: Record<AlertSeverity, number>;
  
  // パフォーマンス
  averageResponseTime: number;
  falsePositiveRate: number;
  acknowledgeRate: number;
}

// アラート設定プリセット
export interface AlertPreset {
  id: string;
  name: string;
  description: string;
  category: string;
  template: Omit<AlertCondition, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;
  tags: string[];
  popularity: number;
}

// アラートバックテスト結果
export interface BacktestResult {
  alertConditionId: string;
  period: {
    start: Date;
    end: Date;
  };
  performance: {
    totalSignals: number;
    truePositives: number;
    falsePositives: number;
    precision: number;
    recall: number;
    f1Score: number;
  };
  profitability?: {
    totalReturn: number;
    winRate: number;
    averageWin: number;
    averageLoss: number;
    sharpeRatio: number;
  };
}

// アラートエンジン設定
export interface AlertEngineConfig {
  maxAlertsPerUser: number;
  maxTriggersPerHour: number;
  defaultCooldownPeriod: number;
  dataRefreshInterval: number;
  notificationRetryAttempts: number;
  
  // パフォーマンス設定
  batchSize: number;
  parallelProcessing: boolean;
  cacheEnabled: boolean;
  
  // フィルタリング
  spamPrevention: boolean;
  duplicateDetection: boolean;
  noiseReduction: boolean;
}