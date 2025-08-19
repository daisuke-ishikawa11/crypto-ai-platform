// 🧪 A/Bテストラッパーコンポーネント
// コンポーネントレベルでA/Bテストを実装するためのラッパー

'use client';

import * as React from "react"
import { useEffect } from 'react'
import { useABTest } from '@/lib/ab-testing/hooks';
import { ABTestVariant } from '@/lib/ab-testing/types';

type VariantConfig = {
  className?: string
  style?: React.CSSProperties
  text?: string
  props?: Record<string, unknown>
  layout?: 'grid' | 'list' | 'cards' | 'horizontal' | 'vertical' | 'tabs'
  showIcons?: boolean
  [key: string]: unknown
}

interface ABTestWrapperProps {
  testId: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onVariantAssigned?: (variant: ABTestVariant) => void;
  onConversion?: () => void;
  trackImpressions?: boolean;
  className?: string;
}

// 基本的なA/Bテストラッパー
export function ABTestWrapper({
  testId,
  children,
  fallback,
  onVariantAssigned,
  onConversion,
  trackImpressions = true,
  className
}: ABTestWrapperProps) {
  const { variant, isLoading, isParticipating, track, convert } = useABTest(testId);

  useEffect(() => {
    if (variant && onVariantAssigned) {
      onVariantAssigned(variant);
    }
  }, [variant, onVariantAssigned]);

  useEffect(() => {
    if (trackImpressions && isParticipating) {
      track('component_impression');
    }
  }, [trackImpressions, isParticipating, track]);

  // ローディング中はフォールバック表示
  if (isLoading) {
    return <>{fallback || children}</>;
  }

  // テストに参加していない場合はデフォルト表示
  if (!isParticipating || !variant) {
    return <>{children}</>;
  }

  // バリアント設定を適用
  const wrapperProps: Record<string, unknown> = {};
  const cfg = (variant.config ?? {}) as VariantConfig;
  const classNameFromVariant = cfg.className;
  if (typeof classNameFromVariant === 'string' && classNameFromVariant.length > 0) {
    wrapperProps.className = `${className || ''} ${classNameFromVariant}`.trim();
  } else if (className) {
    wrapperProps.className = className;
  }

  const styleFromVariant = cfg.style;
  if (styleFromVariant && typeof styleFromVariant === 'object') {
    wrapperProps.style = styleFromVariant as React.CSSProperties;
  }

  // コンバージョンハンドラー
  const handleConversion = () => {
    convert();
    onConversion?.();
  };

  // 子要素にテスト情報を注入
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      interface ABTestProps {
        abTestVariant?: string
        abTestConvert?: () => void
        abTestTrack?: (event: string, properties?: Record<string, unknown>) => void
      }
      
      return React.cloneElement(child as React.ReactElement<ABTestProps>, {
        ...child.props,
        abTestVariant: variant.id,
        abTestConvert: handleConversion,
        abTestTrack: track
      });
    }
    return child;
  });

  return <div {...wrapperProps}>{childrenWithProps}</div>;
}

// コンテンツバリエーションラッパー
interface ContentVariationProps {
  testId: string;
  variants: Record<string, React.ReactNode>;
  defaultContent: React.ReactNode;
  trackImpressions?: boolean;
}

export function ContentVariation({
  testId,
  variants,
  defaultContent,
  trackImpressions = true
}: ContentVariationProps) {
  const { variant, isLoading, isParticipating, track } = useABTest(testId);

  useEffect(() => {
    if (trackImpressions && isParticipating && variant) {
      track('content_impression', { variantId: variant.id });
    }
  }, [trackImpressions, isParticipating, variant, track]);

  if (isLoading || !isParticipating || !variant) {
    return <>{defaultContent}</>;
  }

  return <>{variants[variant.id] || defaultContent}</>;
}

// ボタンバリエーション
interface ButtonVariationProps {
  testId: string;
  onClick: () => void;
  children: React.ReactNode;
  defaultProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  className?: string;
}

export function ButtonVariation({
  testId,
  onClick,
  children,
  defaultProps = {},
  className
}: ButtonVariationProps) {
  const { variant, isLoading, isParticipating, track, convert } = useABTest(testId);

  const handleClick = () => {
    if (isParticipating) {
      track('button_click');
    }
    onClick();
  };

  const handleConversion = () => {
    if (isParticipating) {
      convert();
    }
  };

  if (isLoading || !isParticipating || !variant) {
    return (
      <button 
        {...(defaultProps || {})}
        className={className}
        onClick={handleClick}
      >
        {children}
      </button>
    );
  }

  const cfg = (variant.config ?? {}) as VariantConfig;
  const buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    ...(defaultProps || {}),
    ...((cfg.props as Record<string, unknown>) || {}),
    className: `${className || ''} ${(cfg.className || '')}`.trim(),
    style: { ...((defaultProps?.style as React.CSSProperties) || {}), ...((cfg.style as React.CSSProperties) || {}) },
    onClick: handleClick
  };

  const buttonText = (cfg.text ?? children) as React.ReactNode;

  return (
    <button {...buttonProps}>
      {buttonText}
    </button>
  );
}

// フォームバリエーション
interface FormVariationProps {
  testId: string;
  onSubmit: (data: Record<string, FormDataEntryValue>) => void;
  children: React.ReactNode;
  className?: string;
}

export function FormVariation({
  testId,
  onSubmit,
  children,
  className
}: FormVariationProps) {
  const { variant, isLoading, isParticipating, track, convert } = useABTest(testId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isParticipating) {
      track('form_submit_attempt');
    }

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    try {
      onSubmit(data);
      
      if (isParticipating) {
        track('form_submit_success');
        convert();
      }
    } catch (error) {
      if (isParticipating) {
        track('form_submit_error', { error: error instanceof Error ? error.message : 'Unknown error' });
      }
    }
  };

  if (isLoading || !isParticipating || !variant) {
    return (
      <form className={className} onSubmit={handleSubmit}>
        {children}
      </form>
    );
  }

  const cfg = (variant.config ?? {}) as VariantConfig;
  const formProps: React.FormHTMLAttributes<HTMLFormElement> = {
    className: `${className || ''} ${(cfg.className || '')}`.trim(),
    style: (cfg.style as React.CSSProperties | undefined),
    onSubmit: handleSubmit
  };

  return <form {...formProps}>{children}</form>;
}

// 価格表示バリエーション
interface PriceVariationProps {
  testId: string;
  defaultPrice: number;
  currency?: string;
  onPriceClick?: (price: number) => void;
  className?: string;
}

export function PriceVariation({
  testId,
  defaultPrice,
  currency = 'JPY',
  onPriceClick,
  className
}: PriceVariationProps) {
  const { variant, isLoading, isParticipating, track, convert } = useABTest(testId);

  const cfg = (variant?.config ?? {}) as { price?: number | string; currency?: string; discount?: number | string };
  const parsedPrice = Number(cfg.price);
  const price = Number.isFinite(parsedPrice) ? parsedPrice : defaultPrice;
  const displayCurrency = typeof cfg.currency === 'string' ? cfg.currency : currency;
  const parsedDiscount = Number(cfg.discount);
  const discount: number | undefined = Number.isFinite(parsedDiscount) ? parsedDiscount : undefined;
  const originalPrice = typeof discount === 'number' ? price / (1 - discount / 100) : null;

  const handlePriceClick = () => {
    if (isParticipating) {
      track('price_click', { price, discount });
    }
    onPriceClick?.(price);
  };

  useEffect(() => {
    if (isParticipating && variant) {
      track('price_impression', { price, discount });
    }
  }, [isParticipating, variant, price, discount, track]);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: displayCurrency
    }).format(amount);
  };

  const priceElement = (
    <div className={`price-variation ${className || ''}`} onClick={handlePriceClick}>
      {typeof originalPrice === 'number' && typeof discount === 'number' && (
        <span className="original-price line-through text-gray-500 mr-2">
          {formatPrice(originalPrice)}
        </span>
      )}
      <span className="current-price font-bold">
        {formatPrice(price)}
      </span>
      {typeof discount === 'number' && (
        <span className="discount-badge ml-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
          {discount}% OFF
        </span>
      )}
    </div>
  );

  return priceElement;
}

// レイアウトバリエーション
interface LayoutVariationProps {
  testId: string;
  children: React.ReactNode;
  defaultLayout: 'grid' | 'list' | 'cards';
  className?: string;
}

export function LayoutVariation({
  testId,
  children,
  defaultLayout,
  className
}: LayoutVariationProps) {
  const { variant, isLoading, isParticipating, track } = useABTest(testId);

  const layout = ((variant?.config as VariantConfig)?.layout) ?? defaultLayout;

  useEffect(() => {
    if (isParticipating && variant) {
      track('layout_impression', { layout });
    }
  }, [isParticipating, variant, layout, track]);

  const getLayoutClass = () => {
    switch (layout) {
      case 'grid':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
      case 'list':
        return 'space-y-4';
      case 'cards':
        return 'flex flex-wrap gap-4';
      default:
        return '';
    }
  };

  const layoutClass = `${getLayoutClass()} ${className || ''}`.trim();

  return <div className={layoutClass}>{children}</div>;
}

// ナビゲーションバリエーション
interface NavigationVariationProps {
  testId: string;
  items: Array<{ id: string; label: string; href: string }>;
  onItemClick?: (itemId: string) => void;
  className?: string;
}

export function NavigationVariation({
  testId,
  items,
  onItemClick,
  className
}: NavigationVariationProps) {
  const { variant, isLoading, isParticipating, track } = useABTest(testId);

  const navStyle = variant?.config?.style ?? 'horizontal';
  const showIcons = variant?.config?.showIcons ?? false;

  const handleItemClick = (itemId: string) => {
    if (isParticipating) {
      track('nav_item_click', { itemId, navStyle });
    }
    onItemClick?.(itemId);
  };

  const getNavClass = () => {
    switch (navStyle) {
      case 'vertical':
        return 'flex flex-col space-y-2';
      case 'horizontal':
        return 'flex space-x-4';
      case 'tabs':
        return 'flex border-b';
      default:
        return 'flex space-x-4';
    }
  };

  const navClass = `${getNavClass()} ${className || ''}`.trim();

  return (
    <nav className={navClass}>
      {items.map(item => (
        <a
          key={item.id}
          href={item.href}
          className={`nav-item ${navStyle === 'tabs' ? 'px-4 py-2 border-b-2 border-transparent hover:border-blue-500' : 'hover:underline'}`}
          onClick={(e) => {
            e.preventDefault();
            handleItemClick(item.id);
          }}
        >
          {showIcons && <span className="icon mr-2">📋</span>}
          {item.label}
        </a>
      ))}
    </nav>
  );
}

// 条件付きレンダリング
interface ConditionalRenderProps {
  testId: string;
  condition: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ConditionalRender({
  testId,
  condition,
  children,
  fallback
}: ConditionalRenderProps) {
  const { variant, isLoading, isParticipating } = useABTest(testId);

  if (isLoading || !isParticipating || !variant) {
    return <>{fallback}</>;
  }

  const flag = (variant.config as Record<string, unknown>)[condition];
  const shouldRender = typeof flag === 'boolean' ? flag : Boolean(flag);

  return shouldRender ? <>{children}</> : <>{fallback}</>;
}
