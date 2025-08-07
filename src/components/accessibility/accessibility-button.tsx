// ♿ アクセシビリティボタン
// 浮遊するアクセシビリティ設定開閉ボタン

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Universal, Settings, Eye, Keyboard, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AccessibilityPanel } from './accessibility-panel';
import { useAccessibilitySettings, useKeyboardNavigation } from '@/lib/accessibility/a11y-utils';

export function AccessibilityButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { settings } = useAccessibilitySettings();
  const isKeyboardUser = useKeyboardNavigation();

  // アクティブな設定の数を計算
  const activeSettingsCount = Object.values(settings).filter(
    (value, index, arr) => {
      // デフォルト値と比較して変更されているかチェック
      const defaults = [false, false, 'medium', true, false, true]; // DEFAULT_SETTINGS の値
      return value !== defaults[index];
    }
  ).length;

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setShowTooltip(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* 浮遊ボタン */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: 'spring', 
          stiffness: 500, 
          damping: 30, 
          delay: 1 // ページロード後1秒で表示
        }}
        className="fixed bottom-6 right-6 z-40"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
      >
        {/* ツールチップ */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg"
            >
              アクセシビリティ設定
              {activeSettingsCount > 0 && (
                <span className="ml-2 px-1.5 py-0.5 bg-blue-500 rounded text-xs">
                  {activeSettingsCount}個有効
                </span>
              )}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* メインボタン */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <Button
            onClick={handleToggle}
            size="lg"
            className={`
              w-14 h-14 rounded-full shadow-xl border-2 transition-all duration-300
              ${isKeyboardUser ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
              ${settings.highContrast 
                ? 'bg-black text-white border-white hover:bg-gray-800' 
                : 'bg-blue-600 text-white border-blue-500 hover:bg-blue-700'
              }
            `}
            aria-label={`アクセシビリティ設定${isOpen ? 'を閉じる' : 'を開く'}${
              activeSettingsCount > 0 ? ` (${activeSettingsCount}個の設定が有効)` : ''
            }`}
            aria-expanded={isOpen}
            aria-haspopup="dialog"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Universal className="w-6 h-6" />
            </motion.div>
          </Button>

          {/* アクティブ設定インジケーター */}
          {activeSettingsCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold"
            >
              {activeSettingsCount}
            </motion.div>
          )}

          {/* 設定状態インジケーター */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {settings.highContrast && (
              <div className="w-2 h-2 bg-yellow-400 rounded-full" title="高コントラスト有効" />
            )}
            {settings.reducedMotion && (
              <div className="w-2 h-2 bg-green-400 rounded-full" title="アニメーション軽減有効" />
            )}
            {settings.fontSize !== 'medium' && (
              <div className="w-2 h-2 bg-purple-400 rounded-full" title="フォントサイズ変更" />
            )}
          </div>
        </motion.div>

        {/* クイックアクション（ホバー時に表示） */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="absolute bottom-16 right-0 flex flex-col gap-2"
            >
              {/* 高コントラスト クイックトグル */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  w-10 h-10 rounded-full shadow-lg transition-all
                  ${settings.highContrast 
                    ? 'bg-yellow-500 text-black' 
                    : 'bg-white text-gray-600 hover:bg-yellow-50'
                  }
                `}
                onClick={(e) => {
                  e.stopPropagation();
                  // ここで高コントラストをトグル
                }}
                aria-label="高コントラストのクイック切り替え"
                title="高コントラスト"
              >
                <Eye className="w-5 h-5 mx-auto" />
              </motion.button>

              {/* アニメーション軽減 クイックトグル */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  w-10 h-10 rounded-full shadow-lg transition-all
                  ${settings.reducedMotion 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-green-50'
                  }
                `}
                onClick={(e) => {
                  e.stopPropagation();
                  // ここでアニメーション軽減をトグル
                }}
                aria-label="アニメーション軽減のクイック切り替え"
                title="アニメーション軽減"
              >
                <Volume2 className="w-5 h-5 mx-auto" />
              </motion.button>

              {/* キーボードナビゲーション クイックトグル */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  w-10 h-10 rounded-full shadow-lg transition-all
                  ${settings.keyboardNavigation 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-purple-50'
                  }
                `}
                onClick={(e) => {
                  e.stopPropagation();
                  // ここでキーボードナビゲーションをトグル
                }}
                aria-label="キーボードナビゲーションのクイック切り替え"
                title="キーボードナビゲーション"
              >
                <Keyboard className="w-5 h-5 mx-auto" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* アクセシビリティパネル */}
      <AccessibilityPanel isOpen={isOpen} onClose={handleClose} />

      {/* キーボードショートカット（Ctrl+Alt+A） */}
      <div className="sr-only">
        <p>
          アクセシビリティ設定を開くには、Ctrl+Alt+Aを押すか、画面右下のアクセシビリティボタンをクリックしてください。
        </p>
      </div>

      {/* カスタムスタイル（動的CSS） */}
      <style jsx global>{`
        ${settings.highContrast ? `
          .high-contrast {
            filter: contrast(150%) brightness(110%);
          }
          
          .high-contrast * {
            border-color: currentColor !important;
          }
          
          .high-contrast button:focus,
          .high-contrast input:focus,
          .high-contrast textarea:focus,
          .high-contrast select:focus {
            outline: 3px solid #ffff00 !important;
            outline-offset: 2px !important;
          }
        ` : ''}
        
        ${settings.reducedMotion ? `
          .reduced-motion,
          .reduced-motion *,
          .reduced-motion *::before,
          .reduced-motion *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            transition-delay: 0ms !important;
          }
        ` : ''}
        
        ${settings.fontSize !== 'medium' ? `
          .font-size-${settings.fontSize} {
            font-size: ${
              settings.fontSize === 'small' ? '14px' :
              settings.fontSize === 'large' ? '18px' :
              settings.fontSize === 'extra-large' ? '20px' :
              '16px'
            } !important;
          }
          
          .font-size-${settings.fontSize} h1 { font-size: ${
              settings.fontSize === 'small' ? '1.75rem' :
              settings.fontSize === 'large' ? '2.5rem' :
              settings.fontSize === 'extra-large' ? '3rem' :
              '2.25rem'
            } !important; }
          
          .font-size-${settings.fontSize} h2 { font-size: ${
              settings.fontSize === 'small' ? '1.5rem' :
              settings.fontSize === 'large' ? '2rem' :
              settings.fontSize === 'extra-large' ? '2.25rem' :
              '1.875rem'
            } !important; }
          
          .font-size-${settings.fontSize} h3 { font-size: ${
              settings.fontSize === 'small' ? '1.25rem' :
              settings.fontSize === 'large' ? '1.5rem' :
              settings.fontSize === 'extra-large' ? '1.75rem' :
              '1.5rem'
            } !important; }
        ` : ''}
        
        ${settings.focusVisible ? `
          .focus-visible *:focus {
            outline: 2px solid #2563eb !important;
            outline-offset: 2px !important;
            box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.2) !important;
          }
        ` : ''}
      `}</style>
    </>
  );
}

// キーボードショートカットをグローバルに設定
if (typeof window !== 'undefined') {
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.altKey && e.key === 'a') {
      e.preventDefault();
      // アクセシビリティパネルを開く
      const event = new CustomEvent('open-accessibility-panel');
      window.dispatchEvent(event);
    }
  });
}