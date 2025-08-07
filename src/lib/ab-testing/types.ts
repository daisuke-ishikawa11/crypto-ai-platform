// 🧪 A/Bテスト - 型定義
// A/Bテストシステムの完全な型定義とインターフェース

export interface ABTestVariant {
  id: string;
  name: string;
  description: string;
  weight: number; // 0-100 の重み（100で均等分割）
  config: Record<string, any>; // バリアント固有の設定
  isControl?: boolean; // コントロール群（元のバージョン）かどうか
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ABTest {
  id: string;
  name: string;
  description: string;
  type: 'component' | 'feature' | 'content' | 'design' | 'flow';
  status: 'draft' | 'running' | 'paused' | 'completed' | 'archived';
  
  // テスト対象とターゲティング
  targetComponent?: string; // テスト対象コンポーネント
  targetAudience: {
    percentage: number; // 対象ユーザーの割合（0-100）
    criteria?: {
      userType?: ('new' | 'returning' | 'premium')[];
      location?: string[];
      device?: ('mobile' | 'tablet' | 'desktop')[];
      browser?: string[];
      customAttributes?: Record<string, any>;
    };
  };
  
  // バリアント設定
  variants: ABTestVariant[];
  
  // 統計設定
  statistical: {
    confidenceLevel: number; // 信頼度レベル（通常95%）
    minimumDetectableEffect: number; // 最小検出可能効果
    minimumSampleSize: number; // 最小サンプルサイズ
    maxDuration: number; // 最大実行期間（日数）
    expectedConversionRate: number; // 期待コンバージョン率
  };
  
  // 目標とメトリクス
  primaryGoal: {
    metric: string; // 'conversion' | 'ctr' | 'engagement' | 'revenue' | 'custom'
    name: string;
    description: string;
    target?: number; // 目標値
  };
  
  secondaryGoals?: {
    metric: string;
    name: string;
    description: string;
    target?: number;
  }[];
  
  // スケジュール
  schedule: {
    startDate: string;
    endDate?: string;
    timezone: string;
  };
  
  // メタデータ
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  
  // 結果データ（テスト完了後）
  results?: ABTestResults;
}

export interface ABTestResults {
  status: 'running' | 'completed' | 'inconclusive';
  startDate: string;
  endDate?: string;
  duration: number; // 実行日数
  
  // 全体統計
  totalParticipants: number;
  totalConversions: number;
  overallConversionRate: number;
  
  // バリアント別結果
  variantResults: {
    [variantId: string]: {
      participants: number;
      conversions: number;
      conversionRate: number;
      confidence: number;
      statisticalSignificance: boolean;
      lift: number; // コントロール群に対する改善率
      pValue: number;
      
      // セカンダリメトリクス
      secondaryMetrics?: {
        [metric: string]: {
          value: number;
          improvement: number;
          significance: boolean;
        };
      };
    };
  };
  
  // 統計的有意性
  winner?: {
    variantId: string;
    confidence: number;
    expectedLift: number;
    recommendation: 'implement' | 'continue_testing' | 'stop_test';
  };
  
  // セグメント分析
  segmentAnalysis?: {
    [segment: string]: {
      [variantId: string]: {
        participants: number;
        conversionRate: number;
        significance: boolean;
      };
    };
  };
}

export interface ABTestParticipant {
  id: string;
  testId: string;
  variantId: string;
  userId?: string;
  sessionId: string;
  
  // ユーザー属性
  userAttributes: {
    isNewUser: boolean;
    userType: 'anonymous' | 'registered' | 'premium';
    location?: string;
    device: 'mobile' | 'tablet' | 'desktop';
    browser: string;
    customAttributes?: Record<string, any>;
  };
  
  // タイムスタンプ
  assignedAt: string;
  firstExposure: string;
  lastActivity: string;
  
  // イベント履歴
  events: ABTestEvent[];
}

export interface ABTestEvent {
  id: string;
  type: 'exposure' | 'interaction' | 'conversion' | 'custom';
  eventName: string;
  properties?: Record<string, any>;
  value?: number; // 収益など数値データ
  timestamp: string;
}

export interface ABTestConfiguration {
  // システム設定
  enabledEnvironments: ('development' | 'staging' | 'production')[];
  defaultSampleSize: number;
  defaultConfidenceLevel: number;
  maxConcurrentTests: number;
  
  // データ保持期間
  dataRetentionDays: number;
  
  // 通知設定
  notifications: {
    enabled: boolean;
    channels: ('email' | 'slack' | 'webhook')[];
    triggers: ('test_start' | 'significance_reached' | 'test_end' | 'error')[];
  };
  
  // セキュリティ設定
  allowedRoles: string[];
  requireApproval: boolean;
}

// フック用の型
export interface UseABTestResult {
  variant: ABTestVariant | null;
  isLoading: boolean;
  isParticipating: boolean;
  track: (eventName: string, properties?: Record<string, any>) => void;
  convert: (value?: number) => void;
}

// 統計計算用
export interface StatisticalAnalysis {
  sampleSize: number;
  conversions: number;
  conversionRate: number;
  standardError: number;
  zScore: number;
  pValue: number;
  confidenceInterval: {
    lower: number;
    upper: number;
  };
  isSignificant: boolean;
}

// バリアント比較
export interface VariantComparison {
  controlVariant: ABTestVariant;
  testVariant: ABTestVariant;
  lift: number;
  liftConfidenceInterval: {
    lower: number;
    upper: number;
  };
  relativeLift: number;
  significance: boolean;
  confidence: number;
  recommendedAction: 'implement' | 'continue' | 'stop';
}

// レポート用
export interface ABTestReport {
  test: ABTest;
  results: ABTestResults;
  analysis: {
    summary: string;
    keyFindings: string[];
    recommendations: string[];
    nextSteps: string[];
  };
  charts: {
    conversionRates: ChartData;
    participantFlow: ChartData;
    segmentAnalysis: ChartData;
    timeline: ChartData;
  };
  exportData: {
    csv: string;
    json: string;
  };
}

export interface ChartData {
  type: 'line' | 'bar' | 'pie' | 'funnel';
  data: any[];
  labels: string[];
  title: string;
  description?: string;
}

// エラー型
export type ABTestError =
  | 'INSUFFICIENT_SAMPLE_SIZE'
  | 'INVALID_CONFIGURATION'
  | 'TEST_NOT_FOUND'
  | 'VARIANT_NOT_FOUND'
  | 'STATISTICAL_ERROR'
  | 'PERMISSION_DENIED'
  | 'QUOTA_EXCEEDED';