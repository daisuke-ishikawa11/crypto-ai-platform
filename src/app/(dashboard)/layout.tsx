// ダッシュボードレイアウト - 認証プロバイダー付き

'use client';

import { AuthProvider } from '@/lib/auth/hooks';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}