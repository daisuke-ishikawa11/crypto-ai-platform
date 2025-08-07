// 🧪 A/Bテストラッパーコンポーネント
// コンポーネントレベルでA/Bテストを実装するためのラッパー

'use client';

import React, { ReactNode, useEffect } from 'react';
import { useABTest, useUIVariation } from '@/lib/ab-testing/hooks';
import { ABTestVariant } from '@/lib/ab-testing/types';

interface ABTestWrapperProps {
  testId: string;
  children: ReactNode;
  fallback?: ReactNode;
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
  const wrapperProps: any = {};
  if (variant.config?.className) {
    wrapperProps.className = `${className || ''} ${variant.config.className}`.trim();
  } else if (className) {
    wrapperProps.className = className;
  }

  if (variant.config?.style) {
    wrapperProps.style = variant.config.style;
  }

  // コンバージョンハンドラー
  const handleConversion = () => {
    convert();
    onConversion?.();
  };

  // 子要素にテスト情報を注入
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...child.props,
        abTestVariant: variant,
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
  variants: Record<string, ReactNode>;
  defaultContent: ReactNode;
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
  children: ReactNode;
  defaultProps?: Record<string, any>;
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
        {...defaultProps} 
        className={className}
        onClick={handleClick}
      >
        {children}
      </button>
    );
  }

  const buttonProps = {
    ...defaultProps,
    ...variant.config?.props,
    className: `${className || ''} ${variant.config?.className || ''}`.trim(),
    style: { ...defaultProps.style, ...variant.config?.style },
    onClick: handleClick
  };

  const buttonText = variant.config?.text || children;

  return (
    <button {...buttonProps}>
      {buttonText}
    </button>
  );
}

// フォームバリエーション
interface FormVariationProps {
  testId: string;
  onSubmit: (data: any) => void;
  children: ReactNode;
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

  const formProps = {
    className: `${className || ''} ${variant.config?.className || ''}`.trim(),
    style: variant.config?.style,
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

  const price = variant?.config?.price ?? defaultPrice;
  const displayCurrency = variant?.config?.currency ?? currency;
  const discount = variant?.config?.discount;
  const originalPrice = discount ? price / (1 - discount / 100) : null;

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
      {originalPrice && discount && (
        <span className="original-price line-through text-gray-500 mr-2">
          {formatPrice(originalPrice)}
        </span>
      )}
      <span className="current-price font-bold">
        {formatPrice(price)}
      </span>
      {discount && (
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
  children: ReactNode;
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

  const layout = variant?.config?.layout ?? defaultLayout;

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
  children: ReactNode;
  fallback?: ReactNode;
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

  const shouldRender = variant.config?.[condition] ?? false;

  return shouldRender ? <>{children}</> : <>{fallback}</>;
}