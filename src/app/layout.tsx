import type { Metadata, Viewport } from "next";
import "./global.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
// import { PerformanceMonitor } from "@/lib/performance/web-vitals";
// import { AccessibilityButton } from "@/components/accessibility/accessibility-button";
// import { AutoSkipLinks, ensureLandmarkIds } from "@/components/accessibility/skip-links";

export const metadata: Metadata = {
  title: "暗号通貨AIプラットフォーム",
  description: "AIを活用した暗号通貨投資分析・ポートフォリオ最適化プラットフォーム",
  keywords: ["暗号通貨", "AI", "投資", "ポートフォリオ", "最適化", "分析"],
  authors: [{ name: "Crypto AI Platform" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: "暗号通貨AIプラットフォーム",
    description: "AIを活用した暗号通貨投資分析・ポートフォリオ最適化プラットフォーム",
    type: "website",
    locale: "ja_JP",
    siteName: "暗号通貨AIプラットフォーム",
  },
  twitter: {
    card: "summary_large_image",
    title: "暗号通貨AIプラットフォーム",
    description: "AIを活用した暗号通貨投資分析・ポートフォリオ最適化プラットフォーム",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  colorScheme: 'light dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        
        {/* DNS プリフェッチ */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//api.openai.com" />
        <link rel="dns-prefetch" href="//api.anthropic.com" />
        
        {/* パフォーマンスヒント */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="hero-bg text-white overflow-x-hidden">
        {children}
        
        {/* Vercel Speed Insights */}
        <SpeedInsights />
      </body>
    </html>
  );
}