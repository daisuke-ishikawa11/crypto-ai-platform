import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navigation } from '@/components/navigation'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CryptoLearn Pro - 273コンテンツで学ぶ暗号通貨投資',
  description: '包括的暗号通貨教育プラットフォーム。初心者から上級者まで、273の学習コンテンツで暗号通貨投資を体系的に学習できます。',
  keywords: ['暗号通貨', 'ビットコイン', 'ブロックチェーン', '投資教育', 'DeFi', 'NFT'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-background">
            <Navigation />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
