// ♿ スキップリンクコンポーネント
// ページ内の主要なセクションにすばやく移動できるナビゲーション

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SkipLink {
  href: string;
  label: string;
  description?: string;
}

const defaultSkipLinks: SkipLink[] = [
  {
    href: '#main-content',
    label: 'メインコンテンツへスキップ',
    description: 'ページの主要なコンテンツに移動',
  },
  {
    href: '#navigation',
    label: 'ナビゲーションへスキップ',
    description: 'サイトナビゲーションに移動',
  },
  {
    href: '#footer',
    label: 'フッターへスキップ',
    description: 'ページフッターに移動',
  },
  {
    href: '#search',
    label: '検索へスキップ',
    description: '検索機能に移動',
  },
];

interface SkipLinksProps {
  links?: SkipLink[];
  className?: string;
}

export function SkipLinks({ links = defaultSkipLinks, className = '' }: SkipLinksProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Tab キーでスキップリンクを表示
      if (e.key === 'Tab' && !e.shiftKey) {
        const activeElement = document.activeElement;
        if (activeElement === document.body || activeElement === document.documentElement) {
          setIsVisible(true);
        }
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      // スキップリンクエリア外にフォーカスが移動したら非表示
      const skipLinksContainer = document.getElementById('skip-links');
      if (skipLinksContainer && !skipLinksContainer.contains(e.relatedTarget as Node)) {
        setIsVisible(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  const handleSkipLinkClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      // スムーズスクロールを無効にして即座に移動
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
      
      // フォーカスを移動
      if (target instanceof HTMLElement) {
        target.focus();
        // タブインデックスが-1の場合は一時的に0に設定
        const originalTabIndex = target.getAttribute('tabindex');
        if (originalTabIndex === null || originalTabIndex === '-1') {
          target.setAttribute('tabindex', '0');
          target.addEventListener('blur', () => {
            if (originalTabIndex === null) {
              target.removeAttribute('tabindex');
            } else {
              target.setAttribute('tabindex', originalTabIndex);
            }
          }, { once: true });
        }
      }
    }
    setIsVisible(false);
    setFocusedIndex(-1);
  };

  if (!isVisible && focusedIndex === -1) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.nav
        id="skip-links"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-[9999] bg-gray-900 text-white shadow-lg ${className}`}
        role="navigation"
        aria-label="スキップリンク"
      >
        <div className="container mx-auto px-4 py-2">
          <p className="text-sm mb-2 text-gray-300">
            キーボードナビゲーション: Tab で次へ、Shift+Tab で前へ、Enter で移動
          </p>
          <ul className="flex flex-wrap gap-2">
            {links.map((link, index) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`
                    inline-block px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium
                    hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300
                    transition-colors duration-200
                    ${focusedIndex === index ? 'ring-2 ring-blue-300' : ''}
                  `}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSkipLinkClick(link.href);
                  }}
                  onFocus={() => setFocusedIndex(index)}
                  aria-describedby={link.description ? `skip-desc-${index}` : undefined}
                >
                  {link.label}
                </a>
                {link.description && (
                  <span
                    id={`skip-desc-${index}`}
                    className="sr-only"
                  >
                    {link.description}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
}

// ページ構造を自動検出してスキップリンクを生成
export function AutoSkipLinks() {
  const [detectedLinks, setDetectedLinks] = useState<SkipLink[]>([]);

  useEffect(() => {
    const detectPageStructure = () => {
      const links: SkipLink[] = [];

      // メインコンテンツを検出
      const main = document.querySelector('main, [role="main"], #main, #main-content');
      if (main) {
        links.push({
          href: `#${main.id || 'main-content'}`,
          label: 'メインコンテンツへスキップ',
        });
      }

      // ナビゲーションを検出
      const nav = document.querySelector('nav, [role="navigation"], #navigation, .navigation');
      if (nav && nav.id) {
        links.push({
          href: `#${nav.id}`,
          label: 'ナビゲーションへスキップ',
        });
      }

      // 検索を検出
      const search = document.querySelector(
        '[role="search"], #search, .search, input[type="search"]'
      );
      if (search) {
        const searchContainer = search.closest('[id]') || search;
        if (searchContainer.id) {
          links.push({
            href: `#${searchContainer.id}`,
            label: '検索へスキップ',
          });
        }
      }

      // 見出しを検出
      const headings = document.querySelectorAll('h1, h2[id], h3[id]');
      headings.forEach((heading, index) => {
        if (heading.id && index < 3) { // 最初の3つの見出しのみ
          links.push({
            href: `#${heading.id}`,
            label: `${heading.textContent?.slice(0, 30)}...へスキップ`,
          });
        }
      });

      // フッターを検出
      const footer = document.querySelector('footer, [role="contentinfo"], #footer');
      if (footer) {
        links.push({
          href: `#${footer.id || 'footer'}`,
          label: 'フッターへスキップ',
        });
      }

      setDetectedLinks(links);
    };

    // DOMが読み込まれた後に実行
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', detectPageStructure);
    } else {
      detectPageStructure();
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', detectPageStructure);
    };
  }, []);

  return <SkipLinks links={detectedLinks} />;
}

// ランドマーク要素の自動ID設定
export function ensureLandmarkIds() {
  useEffect(() => {
    const ensureId = (selector: string, defaultId: string) => {
      const element = document.querySelector(selector);
      if (element && !element.id) {
        element.id = defaultId;
      }
    };

    ensureId('main, [role="main"]', 'main-content');
    ensureId('nav, [role="navigation"]', 'navigation');
    ensureId('footer, [role="contentinfo"]', 'footer');
    ensureId('[role="search"], #search, .search', 'search');
    ensureId('aside, [role="complementary"]', 'sidebar');
  }, []);

  return null;
}