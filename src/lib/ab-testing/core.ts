// 🧪 A/Bテスト - コア機能
// A/Bテストエンジンのコア実装と統計計算

'use client';

import { 
  ABTest, 
  ABTestVariant, 
  ABTestParticipant, 
  ABTestEvent,
  ABTestResults,
  StatisticalAnalysis,
  VariantComparison
} from './types';

// A/Bテストエンジンクラス
export class ABTestEngine {
  private participants = new Map<string, ABTestParticipant>();
  private tests = new Map<string, ABTest>();
  private sessionId: string;
  private userId?: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.loadUserSession();
  }

  // セッションID生成
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // ユーザーセッション読み込み
  private loadUserSession() {
    if (typeof window !== 'undefined') {
      // localStorage からユーザーID取得
      this.userId = localStorage.getItem('crypto-ai-user-id') || undefined;
      
      // 既存のテスト参加状況を復元
      const savedParticipants = localStorage.getItem('ab-test-participants');
      if (savedParticipants) {
        try {
          const parsed = JSON.parse(savedParticipants);
          for (const [key, value] of Object.entries(parsed)) {
            this.participants.set(key, value as ABTestParticipant);
          }
        } catch (error) {
          console.error('Failed to load AB test participants:', error);
        }
      }
    }
  }

  // 参加状況保存
  private saveParticipants() {
    if (typeof window !== 'undefined') {
      const participantsObj = Object.fromEntries(this.participants);
      localStorage.setItem('ab-test-participants', JSON.stringify(participantsObj));
    }
  }

  // テスト登録
  registerTest(test: ABTest): void {
    // バリアントの重み合計が100になるよう正規化
    const totalWeight = test.variants.reduce((sum, variant) => sum + variant.weight, 0);
    if (totalWeight !== 100) {
      test.variants = test.variants.map(variant => ({
        ...variant,
        weight: (variant.weight / totalWeight) * 100
      }));
    }

    this.tests.set(test.id, test);
  }

  // バリアント割り当て
  assignVariant(testId: string): ABTestVariant | null {
    const test = this.tests.get(testId);
    if (!test || test.status !== 'running') {
      return null;
    }

    // 既に参加している場合は同じバリアントを返す
    const existingParticipant = this.participants.get(testId);
    if (existingParticipant) {
      const variant = test.variants.find(v => v.id === existingParticipant.variantId);
      return variant || null;
    }

    // ターゲティング条件チェック
    if (!this.matchesTargeting(test)) {
      return null;
    }

    // サンプリング率チェック
    const randomSample = Math.random() * 100;
    if (randomSample > test.targetAudience.percentage) {
      return null;
    }

    // バリアント選択（重み付きランダム）
    const selectedVariant = this.selectVariantByWeight(test.variants);
    if (!selectedVariant) {
      return null;
    }

    // 参加者登録
    const participant: ABTestParticipant = {
      id: `${testId}_${this.sessionId}`,
      testId,
      variantId: selectedVariant.id,
      userId: this.userId,
      sessionId: this.sessionId,
      userAttributes: this.getUserAttributes(),
      assignedAt: new Date().toISOString(),
      firstExposure: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      events: []
    };

    this.participants.set(testId, participant);
    this.saveParticipants();

    // 露出イベント記録
    this.trackEvent(testId, {
      id: `exposure_${Date.now()}`,
      type: 'exposure',
      eventName: 'variant_exposed',
      properties: {
        variantId: selectedVariant.id,
        variantName: selectedVariant.name
      },
      timestamp: new Date().toISOString()
    });

    return selectedVariant;
  }

  // ターゲティング条件マッチング
  private matchesTargeting(test: ABTest): boolean {
    const criteria = test.targetAudience.criteria;
    if (!criteria) return true;

    const userAttrs = this.getUserAttributes();

    // デバイスタイプチェック
    if (criteria.device && !criteria.device.includes(userAttrs.device)) {
      return false;
    }

    // ユーザータイプチェック
    if (criteria.userType && !criteria.userType.includes(userAttrs.userType)) {
      return false;
    }

    // 地域チェック
    if (criteria.location && userAttrs.location && !criteria.location.includes(userAttrs.location)) {
      return false;
    }

    // ブラウザチェック
    if (criteria.browser && !criteria.browser.includes(userAttrs.browser)) {
      return false;
    }

    // カスタム属性チェック
    if (criteria.customAttributes) {
      for (const [key, value] of Object.entries(criteria.customAttributes)) {
        if (userAttrs.customAttributes?.[key] !== value) {
          return false;
        }
      }
    }

    return true;
  }

  // 重み付きバリアント選択
  private selectVariantByWeight(variants: ABTestVariant[]): ABTestVariant | null {
    const activeVariants = variants.filter(v => v.isActive);
    if (activeVariants.length === 0) return null;

    const random = Math.random() * 100;
    let cumulative = 0;

    for (const variant of activeVariants) {
      cumulative += variant.weight;
      if (random <= cumulative) {
        return variant;
      }
    }

    return activeVariants[activeVariants.length - 1];
  }

  // ユーザー属性取得
  private getUserAttributes() {
    const isNewUser = !this.userId || this.isFirstVisit();
    const userType = this.userId ? 
      (this.isPremiumUser() ? 'premium' : 'registered') : 
      'anonymous';

    return {
      isNewUser,
      userType: userType as 'anonymous' | 'registered' | 'premium',
      location: this.getLocation(),
      device: this.getDeviceType(),
      browser: this.getBrowser(),
      customAttributes: this.getCustomAttributes()
    };
  }

  // デバイスタイプ検出
  private getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    if (typeof window === 'undefined') return 'desktop';
    
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  // ブラウザ検出
  private getBrowser(): string {
    if (typeof navigator === 'undefined') return 'unknown';
    
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'chrome';
    if (userAgent.includes('Firefox')) return 'firefox';
    if (userAgent.includes('Safari')) return 'safari';
    if (userAgent.includes('Edge')) return 'edge';
    return 'other';
  }

  // 地域情報取得（簡易版）
  private getLocation(): string {
    // 実装: IPベースの地域検出や、事前に取得した地域情報
    return 'JP'; // デフォルト
  }

  // 初回訪問判定
  private isFirstVisit(): boolean {
    if (typeof localStorage === 'undefined') return true;
    return !localStorage.getItem('crypto-ai-returning-user');
  }

  // プレミアムユーザー判定
  private isPremiumUser(): boolean {
    if (typeof localStorage === 'undefined') return false;
    return localStorage.getItem('crypto-ai-user-tier') === 'premium';
  }

  // カスタム属性取得
  private getCustomAttributes(): Record<string, any> {
    if (typeof localStorage === 'undefined') return {};
    
    try {
      const attrs = localStorage.getItem('crypto-ai-user-attributes');
      return attrs ? JSON.parse(attrs) : {};
    } catch {
      return {};
    }
  }

  // イベント追跡
  trackEvent(testId: string, event: Omit<ABTestEvent, 'id'>) {
    const participant = this.participants.get(testId);
    if (!participant) return;

    const fullEvent: ABTestEvent = {
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      ...event
    };

    participant.events.push(fullEvent);
    participant.lastActivity = new Date().toISOString();
    
    this.saveParticipants();

    // 分析サーバーに送信（非同期）
    this.sendEventToAnalytics(testId, fullEvent);
  }

  // コンバージョン記録
  convert(testId: string, value?: number) {
    this.trackEvent(testId, {
      type: 'conversion',
      eventName: 'primary_goal_conversion',
      value,
      timestamp: new Date().toISOString()
    });
  }

  // インタラクション記録
  interact(testId: string, interaction: string, properties?: Record<string, any>) {
    this.trackEvent(testId, {
      type: 'interaction',
      eventName: interaction,
      properties,
      timestamp: new Date().toISOString()
    });
  }

  // 分析サーバーへの送信
  private async sendEventToAnalytics(testId: string, event: ABTestEvent) {
    try {
      await fetch('/api/ab-testing/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          testId,
          participantId: this.participants.get(testId)?.id,
          event,
          sessionId: this.sessionId,
          userId: this.userId,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Failed to send AB test event:', error);
    }
  }

  // 参加状況取得
  getParticipant(testId: string): ABTestParticipant | null {
    return this.participants.get(testId) || null;
  }

  // 全参加テスト取得
  getAllParticipations(): ABTestParticipant[] {
    return Array.from(this.participants.values());
  }
}

// 統計計算ユーティリティ
export class ABTestStatistics {
  // Z検定
  static zTest(
    controlConversions: number,
    controlSample: number,
    testConversions: number,
    testSample: number
  ): StatisticalAnalysis {
    const controlRate = controlConversions / controlSample;
    const testRate = testConversions / testSample;
    
    const pooledRate = (controlConversions + testConversions) / (controlSample + testSample);
    const standardError = Math.sqrt(
      pooledRate * (1 - pooledRate) * (1 / controlSample + 1 / testSample)
    );
    
    const zScore = (testRate - controlRate) / standardError;
    const pValue = 2 * (1 - this.normalCDF(Math.abs(zScore)));
    
    const confidenceInterval = this.calculateConfidenceInterval(
      testRate,
      testSample,
      0.95
    );

    return {
      sampleSize: testSample,
      conversions: testConversions,
      conversionRate: testRate,
      standardError,
      zScore,
      pValue,
      confidenceInterval,
      isSignificant: pValue < 0.05
    };
  }

  // 信頼区間計算
  static calculateConfidenceInterval(
    rate: number,
    sampleSize: number,
    confidence: number
  ): { lower: number; upper: number } {
    const zScore = this.getZScore(confidence);
    const margin = zScore * Math.sqrt((rate * (1 - rate)) / sampleSize);
    
    return {
      lower: Math.max(0, rate - margin),
      upper: Math.min(1, rate + margin)
    };
  }

  // バリアント比較
  static compareVariants(
    control: { conversions: number; sampleSize: number },
    test: { conversions: number; sampleSize: number }
  ): VariantComparison {
    const controlRate = control.conversions / control.sampleSize;
    const testRate = test.conversions / test.sampleSize;
    
    const lift = testRate - controlRate;
    const relativeLift = controlRate > 0 ? (lift / controlRate) * 100 : 0;
    
    const analysis = this.zTest(
      control.conversions,
      control.sampleSize,
      test.conversions,
      test.sampleSize
    );

    const liftConfidenceInterval = this.calculateLiftConfidenceInterval(
      controlRate,
      testRate,
      control.sampleSize,
      test.sampleSize
    );

    let recommendedAction: 'implement' | 'continue' | 'stop';
    if (analysis.isSignificant && relativeLift > 5) {
      recommendedAction = 'implement';
    } else if (analysis.pValue < 0.2) {
      recommendedAction = 'continue';
    } else {
      recommendedAction = 'stop';
    }

    return {
      controlVariant: {} as ABTestVariant, // 実際の実装では適切なバリアントを設定
      testVariant: {} as ABTestVariant,
      lift,
      liftConfidenceInterval,
      relativeLift,
      significance: analysis.isSignificant,
      confidence: (1 - analysis.pValue) * 100,
      recommendedAction
    };
  }

  // リフトの信頼区間
  private static calculateLiftConfidenceInterval(
    controlRate: number,
    testRate: number,
    controlSample: number,
    testSample: number
  ): { lower: number; upper: number } {
    const controlSE = Math.sqrt((controlRate * (1 - controlRate)) / controlSample);
    const testSE = Math.sqrt((testRate * (1 - testRate)) / testSample);
    const combinedSE = Math.sqrt(controlSE ** 2 + testSE ** 2);
    
    const lift = testRate - controlRate;
    const margin = 1.96 * combinedSE; // 95% 信頼区間
    
    return {
      lower: lift - margin,
      upper: lift + margin
    };
  }

  // 必要サンプルサイズ計算
  static calculateSampleSize(
    baseline: number,
    minimumDetectableEffect: number,
    alpha: number = 0.05,
    power: number = 0.8
  ): number {
    const zAlpha = this.getZScore(1 - alpha / 2);
    const zBeta = this.getZScore(power);
    
    const p1 = baseline;
    const p2 = baseline + minimumDetectableEffect;
    const pBar = (p1 + p2) / 2;
    
    const numerator = Math.pow(zAlpha + zBeta, 2) * 2 * pBar * (1 - pBar);
    const denominator = Math.pow(p2 - p1, 2);
    
    return Math.ceil(numerator / denominator);
  }

  // 正規分布累積密度関数
  private static normalCDF(x: number): number {
    return 0.5 * (1 + this.erf(x / Math.sqrt(2)));
  }

  // 誤差関数
  private static erf(x: number): number {
    // Abramowitz and Stegun 近似
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;

    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);

    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
  }

  // Z値取得
  private static getZScore(confidence: number): number {
    // 一般的な信頼度のZ値
    const zScores: Record<number, number> = {
      0.90: 1.645,
      0.95: 1.96,
      0.975: 2.24,
      0.99: 2.576,
      0.995: 2.807
    };

    return zScores[confidence] || 1.96;
  }
}

// グローバルA/Bテストエンジンインスタンス
export const abTestEngine = new ABTestEngine();