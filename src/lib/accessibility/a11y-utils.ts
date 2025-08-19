'use client';

import * as React from "react"

// アクセシビリティ設定の型定義
export interface AccessibilitySettings {
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  focusVisible: boolean;
  screenReaderOptimized: boolean;
  keyboardNavigation: boolean;
}

// デフォルト設定
const DEFAULT_SETTINGS: AccessibilitySettings = {
  highContrast: false,
  reducedMotion: false,
  fontSize: 'medium',
  focusVisible: true,
  screenReaderOptimized: false,
  keyboardNavigation: true,
};

// ローカルストレージキー
const A11Y_STORAGE_KEY = 'crypto-ai-a11y-settings';

// アクセシビリティ設定フック
export function useAccessibilitySettings() {
  const [settings, setSettings] = React.useState<AccessibilitySettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = React.useState(false);

  // 設定を読み込み
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(A11Y_STORAGE_KEY);
        if (saved) {
          const parsedSettings = JSON.parse(saved);
          setSettings({ ...DEFAULT_SETTINGS, ...parsedSettings });
        }
        
        // システム設定を検出
        const systemPreferences = detectSystemPreferences();
        setSettings(prev => ({ ...prev, ...systemPreferences }));
        
      } catch (error) {
        console.error('アクセシビリティ設定の読み込みに失敗:', error);
      } finally {
        setIsLoaded(true);
      }
    }
  }, []);

  // 設定を保存
  const updateSettings = React.useCallback((updates: Partial<AccessibilitySettings>) => {
    setSettings(prev => {
      const newSettings = { ...prev, ...updates };
      
      try {
        localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(newSettings));
      } catch (error) {
        console.error('アクセシビリティ設定の保存に失敗:', error);
      }
      
      return newSettings;
    });
  }, []);

  // 設定をリセット
  const resetSettings = React.useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    try {
      localStorage.removeItem(A11Y_STORAGE_KEY);
    } catch (error) {
      console.error('アクセシビリティ設定のリセットに失敗:', error);
    }
  }, []);

  return {
    settings,
    updateSettings,
    resetSettings,
    isLoaded,
  };
}

// システムの設定を検出
export function detectSystemPreferences(): Partial<AccessibilitySettings> {
  if (typeof window === 'undefined') return {};

  const preferences: Partial<AccessibilitySettings> = {};

  // 動きの軽減設定を検出
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    preferences.reducedMotion = true;
  }

  // 高コントラスト設定を検出
  if (window.matchMedia('(prefers-contrast: high)').matches) {
    preferences.highContrast = true;
  }

  return preferences;
}

// フォーカス管理フック
export function useFocusManagement() {
  const [focusedElement, setFocusedElement] = React.useState<Element | null>(null);
  const previousFocusRef = React.useRef<Element | null>(null);

  // フォーカストラップ
  const trapFocus = React.useCallback((container: Element) => {
    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown: EventListener = (evt) => {
      const e = evt as KeyboardEvent
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    (container as HTMLElement).addEventListener('keydown', handleKeyDown);
    
    return () => {
      (container as HTMLElement).removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // フォーカスを保存
  const saveFocus = React.useCallback(() => {
    previousFocusRef.current = document.activeElement;
  }, []);

  // フォーカスを復元
  const restoreFocus = React.useCallback(() => {
    if (previousFocusRef.current && 'focus' in previousFocusRef.current) {
      (previousFocusRef.current as HTMLElement).focus();
    }
  }, []);

  // フォーカスを移動
  const moveFocus = React.useCallback((selector: string) => {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      element.focus();
      setFocusedElement(element);
    }
  }, []);

  return {
    focusedElement,
    trapFocus,
    saveFocus,
    restoreFocus,
    moveFocus,
  };
}

// キーボードナビゲーションフック
export function useKeyboardNavigation() {
  const [isKeyboardUser, setIsKeyboardUser] = React.useState(false);

  React.useEffect(() => {
    let keyboardTimeout: NodeJS.Timeout;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' || e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        setIsKeyboardUser(true);
        clearTimeout(keyboardTimeout);
        
        keyboardTimeout = setTimeout(() => {
          setIsKeyboardUser(false);
        }, 1000);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardUser(false);
      clearTimeout(keyboardTimeout);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
      clearTimeout(keyboardTimeout);
    };
  }, []);

  return isKeyboardUser;
}

// スクリーンリーダー検出フック
export function useScreenReaderDetection() {
  const [isScreenReader, setIsScreenReader] = React.useState(false);

  React.useEffect(() => {
    // スクリーンリーダーの存在を検出
    const detectScreenReader = () => {
      // アクセシビリティAPIの存在を確認
      if ('speechSynthesis' in window) {
        return window.speechSynthesis.getVoices().length > 0;
      }
      
      // その他のヒューリスティック検出
      const userAgent = navigator.userAgent.toLowerCase();
      const screenReaderPatterns = [
        'nvda', 'jaws', 'windoweyes', 'voiceover', 'talkback'
      ];
      
      return screenReaderPatterns.some(pattern => userAgent.includes(pattern));
    };

    setIsScreenReader(detectScreenReader());
  }, []);

  return isScreenReader;
}

// 色コントラスト計算
export function calculateContrast(color1: string, color2: string): number {
  const getLuminance = (color: string) => {
    const rgb = color.match(/\d+/g);
    if (!rgb) return 0;
    
    const [r, g, b] = rgb.map(c => {
      const sRGB = parseInt(c) / 255;
      return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

// WCAG 準拠チェック
export function checkWCAGCompliance(color1: string, color2: string, level: 'AA' | 'AAA' = 'AA'): boolean {
  const contrast = calculateContrast(color1, color2);
  const threshold = level === 'AAA' ? 7 : 4.5;
  return contrast >= threshold;
}

// ARIAラベル生成
export function generateAriaLabel(context: string, value?: string | number): string {
  if (value !== undefined) {
    return `${context}: ${value}`;
  }
  return context;
}

// ライブリージョン通知
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  if (typeof document === 'undefined') return;

  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// タッチターゲットサイズチェック
export function checkTouchTargetSize(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  const minSize = 44; // 44px は WCAG の最小推奨サイズ
  return rect.width >= minSize && rect.height >= minSize;
}

// フォント読みやすさスコア
export function calculateReadabilityScore(text: string): number {
  // 簡易的な可読性スコア計算（Flesch Reading Ease の簡易版）
  const sentences = text.split(/[.!?]+/).length;
  const words = text.split(/\s+/).length;
  const syllables = text.split(/[aeiouAEIOU]/).length - 1;
  
  if (sentences === 0 || words === 0) return 0;
  
  const averageWordsPerSentence = words / sentences;
  const averageSyllablesPerWord = syllables / words;
  
  const score = 206.835 - (1.015 * averageWordsPerSentence) - (84.6 * averageSyllablesPerWord);
  return Math.max(0, Math.min(100, score));
}

// アクセシビリティテスト
export function runAccessibilityTests(container?: Element): AccessibilityIssue[] {
  const issues: AccessibilityIssue[] = [];
  const root = container || document.body;

  // 画像のalt属性チェック
  const images = root.querySelectorAll('img');
  images.forEach(img => {
    if (!img.hasAttribute('alt')) {
      issues.push({
        type: 'missing-alt',
        element: img,
        severity: 'error',
        message: '画像にalt属性がありません',
      });
    }
  });

  // フォーム要素のラベルチェック
  const inputs = root.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    const id = input.getAttribute('id');
    const ariaLabel = input.getAttribute('aria-label');
    const ariaLabelledBy = input.getAttribute('aria-labelledby');
    
    if (!id || (!document.querySelector(`label[for="${id}"]`) && !ariaLabel && !ariaLabelledBy)) {
      issues.push({
        type: 'missing-label',
        element: input,
        severity: 'error',
        message: 'フォーム要素にラベルがありません',
      });
    }
  });

  // 見出し構造チェック
  const headings = Array.from(root.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  let previousLevel = 0;
  
  headings.forEach(heading => {
    const currentLevel = parseInt(heading.tagName.charAt(1));
    
    if (currentLevel - previousLevel > 1) {
      issues.push({
        type: 'heading-skip',
        element: heading,
        severity: 'warning',
        message: '見出しレベルがスキップされています',
      });
    }
    
    previousLevel = currentLevel;
  });

  return issues;
}

// アクセシビリティ問題の型定義
export interface AccessibilityIssue {
  type: string;
  element: Element;
  severity: 'error' | 'warning' | 'info';
  message: string;
}

// CSS クラス生成
export function getAccessibilityClasses(settings: AccessibilitySettings): string {
  const classes: string[] = [];
  
  if (settings.highContrast) {
    classes.push('high-contrast');
  }
  
  if (settings.reducedMotion) {
    classes.push('reduced-motion');
  }
  
  if (settings.focusVisible) {
    classes.push('focus-visible');
  }
  
  classes.push(`font-size-${settings.fontSize}`);
  
  return classes.join(' ');
}
