// 🧪 A/Bテスト - React フック
// A/Bテストを簡単に利用するためのReact hooks

'use client';

import * as React from "react"
import { abTestEngine } from './core';
import { ABTest, ABTestVariant, UseABTestResult } from './types';

// Variant config typing and helpers
type VariantConfig = {
  enabled?: boolean
  content?: unknown
  styles?: Record<string, unknown>
  className?: string
  props?: Record<string, unknown>
  // price test
  price?: number | string
  currency?: string
  discount?: number | string
  // form
  form?: {
    type?: string
    fields?: unknown[]
    layout?: string
    buttonText?: string
    validation?: Record<string, unknown>
  }
  // flow
  flow?: string[]
  // recommendations
  algorithm?: string
  count?: number
}

function getConfig(variant?: ABTestVariant | null): VariantConfig {
  const cfg = (variant && typeof variant === 'object' ? (variant as ABTestVariant).config : undefined)
  return (cfg && typeof cfg === 'object') ? (cfg as VariantConfig) : {}
}

// A/Bテスト参加フック
export function useABTest(testId: string): UseABTestResult {
  const [variant, setVariant] = React.useState<ABTestVariant | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isParticipating, setIsParticipating] = React.useState(false);
  const hasAssigned = React.useRef(false);

  React.useEffect(() => {
    if (hasAssigned.current) return;
    
    const assignVariant = async () => {
      try {
        setIsLoading(true);
        
        // 既存参加状況をチェック
        const existingParticipant = abTestEngine.getParticipant(testId);
        if (existingParticipant) {
          // テスト設定を取得してバリアント情報を復元
          const response = await fetch(`/api/ab-testing/tests/${testId}`);
          if (response.ok) {
            const test: ABTest = await response.json();
            const assignedVariant = test.variants.find(v => v.id === existingParticipant.variantId);
            if (assignedVariant) {
              setVariant(assignedVariant);
              setIsParticipating(true);
            }
          }
        } else {
          // 新規バリアント割り当て
          const assignedVariant = abTestEngine.assignVariant(testId);
          if (assignedVariant) {
            setVariant(assignedVariant);
            setIsParticipating(true);
          }
        }
      } catch (error) {
        console.error(`Failed to assign variant for test ${testId}:`, error);
      } finally {
        setIsLoading(false);
        hasAssigned.current = true;
      }
    };

    assignVariant();
  }, [testId]);

  // イベント追跡
  const track = React.useCallback((eventName: string, properties?: Record<string, unknown>) => {
    if (isParticipating) {
      abTestEngine.interact(testId, eventName, properties);
    }
  }, [testId, isParticipating]);

  // コンバージョン記録
  const convert = React.useCallback((value?: number) => {
    if (isParticipating) {
      abTestEngine.convert(testId, value);
    }
  }, [testId, isParticipating]);

  return {
    variant,
    isLoading,
    isParticipating,
    track,
    convert
  };
}

// 複数テスト同時参加フック
export function useMultipleABTests(testIds: string[]) {
  const [tests, setTests] = React.useState<Record<string, UseABTestResult>>({});
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadTests = async () => {
      setIsLoading(true);
      const testResults: Record<string, UseABTestResult> = {};

      for (const testId of testIds) {
        try {
          const existingParticipant = abTestEngine.getParticipant(testId);
          let variant = null;
          let isParticipating = false;

          if (existingParticipant) {
            const response = await fetch(`/api/ab-testing/tests/${testId}`);
            if (response.ok) {
              const test: ABTest = await response.json();
              variant = test.variants.find(v => v.id === existingParticipant.variantId) || null;
              isParticipating = !!variant;
            }
          } else {
            variant = abTestEngine.assignVariant(testId);
            isParticipating = !!variant;
          }

          testResults[testId] = {
            variant,
            isLoading: false,
            isParticipating,
            track: (eventName: string, properties?: Record<string, unknown>) => {
              if (isParticipating) {
                abTestEngine.interact(testId, eventName, properties);
              }
            },
            convert: (value?: number) => {
              if (isParticipating) {
                abTestEngine.convert(testId, value);
              }
            }
          };
        } catch (error) {
          console.error(`Failed to load test ${testId}:`, error);
          testResults[testId] = {
            variant: null,
            isLoading: false,
            isParticipating: false,
            track: () => {},
            convert: () => {}
          };
        }
      }

      setTests(testResults);
      setIsLoading(false);
    };

    loadTests();
  }, [testIds]);

  return { tests, isLoading };
}

// 機能フラグ的な使用
export function useFeatureFlag(flagName: string, defaultValue: boolean = false): boolean {
  const { variant, isLoading } = useABTest(`feature_${flagName}`);
  
  if (isLoading) return defaultValue;
  
  // バリアントの設定から機能の有効/無効を判定
  const cfg = getConfig(variant)
  return Boolean(cfg.enabled ?? defaultValue);
}

// コンテンツバリエーション
export function useContentVariation<T>(testId: string, defaultContent: T): T {
  const { variant, isLoading } = useABTest(testId);
  
  if (isLoading || !variant) return defaultContent;
  
  const cfg = getConfig(variant)
  return (cfg.content ?? defaultContent) as T;
}

// UIバリエーション
export function useUIVariation(testId: string, defaultStyles: Record<string, unknown> = {}) {
  const { variant, isLoading } = useABTest(testId);
  
  if (isLoading || !variant) return { styles: defaultStyles, className: '', props: {} as Record<string, unknown> };
  
  const cfg = getConfig(variant)
  return {
    styles: { ...defaultStyles, ...(cfg.styles || {}) },
    className: cfg.className || '',
    props: cfg.props || {}
  };
}

// 価格テスト用
export function usePriceTest(testId: string, defaultPrice: number): {
  price: number;
  currency: string;
  discount?: number;
  track: (action: 'view' | 'click' | 'purchase') => void;
} {
  const { variant, track } = useABTest(testId);
  
  const cfg = getConfig(variant)
  const parsedPrice = Number(cfg.price as number | string | undefined);
  const price = Number.isFinite(parsedPrice) ? parsedPrice : defaultPrice;
  const currency = typeof cfg.currency === 'string' ? cfg.currency : 'JPY';
  const parsedDiscount = Number(cfg.discount as number | string | undefined);
  const discount: number | undefined = Number.isFinite(parsedDiscount) ? parsedDiscount : undefined;

  const trackPriceAction = React.useCallback((action: 'view' | 'click' | 'purchase') => {
    track(`price_${action}`, {
      price,
      currency,
      discount,
      originalPrice: defaultPrice
    });
  }, [track, price, currency, discount, defaultPrice]);

  return {
    price,
    currency,
    discount,
    track: trackPriceAction
  };
}

// フォームバリエーション
export function useFormVariation(testId: string) {
  const { variant, track, convert } = useABTest(testId);
  
  const formConfig = getConfig(variant).form || {};
  
  const trackFormEvent = React.useCallback((eventType: string, fieldName?: string) => {
    track(`form_${eventType}`, {
      fieldName,
      formType: formConfig.type,
      variant: variant?.name
    });
  }, [track, formConfig.type, variant?.name]);

  const trackFormSubmission = React.useCallback((success: boolean, data?: unknown) => {
    if (success) {
      convert();
    }
    track('form_submission', {
      success,
      formType: formConfig.type,
      data
    });
  }, [convert, track, formConfig.type]);

  return {
    fields: (formConfig.fields || []),
    layout: (formConfig.layout || 'vertical'),
    buttonText: (formConfig.buttonText || 'Submit'),
    validation: (formConfig.validation || {}),
    trackEvent: trackFormEvent,
    trackSubmission: trackFormSubmission
  };
}

// ナビゲーション/フローテスト
export function useFlowTest(testId: string, defaultFlow: string[]) {
  const { variant, track } = useABTest(testId);
  
  const flow = (getConfig(variant).flow ?? defaultFlow);
  const [currentStep, setCurrentStep] = React.useState(0);

  const goToStep = React.useCallback((step: number) => {
    setCurrentStep(step);
    track('flow_step_change', {
      from: currentStep,
      to: step,
      stepName: flow[step]
    });
  }, [currentStep, flow, track]);

  const nextStep = React.useCallback(() => {
    if (currentStep < flow.length - 1) {
      goToStep(currentStep + 1);
    }
  }, [currentStep, flow.length, goToStep]);

  const prevStep = React.useCallback(() => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  }, [currentStep, goToStep]);

  return {
    flow,
    currentStep,
    currentStepName: flow[currentStep],
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === flow.length - 1,
    goToStep,
    nextStep,
    prevStep,
    trackStep: (action: string) => track(`step_${action}`, { step: currentStep, stepName: flow[currentStep] })
  };
}

// レコメンデーションテスト
export function useRecommendationTest(testId: string, userId?: string) {
  const { variant, track } = useABTest(testId);
  const [recommendations, setRecommendations] = React.useState<Array<Record<string, unknown>>>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (!variant) return;

    const loadRecommendations = async () => {
      try {
        setIsLoading(true);
        const algorithm = variant.config?.algorithm || 'default';
        const count = variant.config?.count || 5;
        
        const response = await fetch('/api/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            algorithm,
            count,
            testId,
            variantId: variant.id
          })
        });

        if (response.ok) {
          const data = await response.json();
          setRecommendations(data.recommendations);
    track('recommendations_loaded', {
            algorithm,
            count: data.recommendations.length
          });
        }
      } catch (error) {
        console.error('Failed to load recommendations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecommendations();
  }, [variant, userId, track]);

  const trackRecommendationClick = React.useCallback((itemId: string, position: number) => {
    track('recommendation_click', {
      itemId,
      position,
      algorithm: getConfig(variant).algorithm
    });
  }, [track, variant?.config]);

  return {
    recommendations,
    isLoading,
    algorithm: getConfig(variant).algorithm,
    trackClick: trackRecommendationClick
  };
}

// セグメント固有テスト
export function useSegmentedABTest(testId: string, segment: string) {
  const segmentedTestId = `${testId}_${segment}`;
  return useABTest(segmentedTestId);
}

// テスト状態監視フック
export function useABTestStatus(testId: string) {
  const [status, setStatus] = React.useState<'loading' | 'active' | 'inactive' | 'error'>('loading');
  const [testInfo, setTestInfo] = React.useState<ABTest | null>(null);

  React.useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/ab-testing/tests/${testId}/status`);
        if (response.ok) {
          const data = await response.json();
          setTestInfo(data.test);
          setStatus(data.test.status === 'running' ? 'active' : 'inactive');
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Failed to check test status:', error);
        setStatus('error');
      }
    };

    checkStatus();
  }, [testId]);

  return { status, testInfo };
}
