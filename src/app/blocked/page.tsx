export const dynamic = 'force-dynamic'

export default function BlockedPage() {
  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-4">アクセス制限中</h1>
      <p className="text-sm text-muted-foreground mb-2">現在、このルートは独立系アプリ開発スコープ外として制限されています。</p>
      <p className="text-sm text-muted-foreground">必要な場合は管理者に連絡し、`APP_ACCESS_SCOPE` の設定を見直してください。</p>
    </div>
  )
}
