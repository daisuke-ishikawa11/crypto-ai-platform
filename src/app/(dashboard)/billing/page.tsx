// 💳 請求書・決済管理ダッシュボード
// テストカード・インボイス・支払い履歴・B2B機能

'use client';

// 請求・決済管理は認証が必要なため動的レンダリング
export const dynamic = 'force-dynamic';

import * as React from "react"
import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { apiFetch } from '@/lib/api/fetcher';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// Dialog imports removed as not used
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  FileText, 
  Download, 
  Send, 
  Eye, 
  Trash2, 
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Building
} from 'lucide-react';
import { formatPrice } from '@/lib/stripe/config';

interface Invoice {
  id: string;
  number: string;
  status: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible';
  amount_due: number;
  amount_paid: number;
  amount_remaining: number;
  currency: string;
  created: number;
  due_date?: number;
  description?: string;
  hosted_invoice_url?: string;
  invoice_pdf?: string;
  customer: {
    id: string;
    name?: string;
    email?: string;
  };
}

interface TestCard {
  id: string;
  type: string;
  number: string;
  exp_month: number;
  exp_year: number;
  cvc: string;
  description: string;
  displayNumber: string;
  scenario: string;
  expectedResult: string;
}

export default function BillingPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('invoices');
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [testCards, setTestCards] = useState<TestCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invoiceStats, setInvoiceStats] = useState<{
    total: number;
    paid: number;
    pending: number;
    failed: number;
    amounts: {
      paid: number;
      outstanding: number;
    };
    overdue: {
      count: number;
    };
  } | null>(null);

  // 請求書フィルター
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // テスト決済状態
  const [testPaymentResult, setTestPaymentResult] = useState<{
    success: boolean;
    message: string;
    paymentIntentId?: string;
    cardUsed?: {
      description: string;
    };
    paymentIntent?: {
      id: string;
      amount: number;
      status: string;
      client_secret?: string;
    };
    error?: {
      message: string;
      code?: string;
    };
    logs?: {
      stripeUrl?: string;
    };
  } | null>(null);

  const loadInvoices = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      
      const response = await fetch(`/api/stripe/invoices?${params}`);
      const data = await response.json();
      
      if (response.ok) {
        setInvoices(data.invoices);
        setInvoiceStats(data.stats);
      } else {
        setError(data.error || 'Failed to load invoices');
      }
    } catch (error) {
      console.error('Failed to load invoices:', error);
      setError('Failed to load invoices');
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  const loadTestCards = useCallback(async () => {
    try {
      const response = await fetch('/api/stripe/test-cards');
      const data = await response.json();
      
      if (response.ok) {
        setTestCards(data.testCards);
      }
    } catch (error) {
      console.error('Failed to load test cards:', error);
    }
  }, []);

  const executeTestPayment = async (cardType: string, amount: number = 2900) => {
    try {
      setLoading(true);
      setTestPaymentResult(null);
      
      const response = await apiFetch('/api/stripe/test-cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardType,
          amount,
          currency: 'usd',
          description: `Test payment with ${cardType}`,
          simulateWebhook: true
        })
      });
      
      const result = await response.json();
      setTestPaymentResult(result);
    } catch (error) {
      console.error('Test payment failed:', error);
      setError('Test payment failed');
    } finally {
      setLoading(false);
    }
  };

  const downloadInvoicePDF = async (invoiceId: string) => {
    try {
      const response = await fetch(`/api/stripe/invoices/${invoiceId}/pdf`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice-${invoiceId}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Failed to download PDF:', error);
      setError('Failed to download PDF');
    }
  };

  const sendInvoice = async (invoiceId: string) => {
    try {
      const response = await fetch(`/api/stripe/invoices/${invoiceId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send' })
      });
      
      if (response.ok) {
        loadInvoices(); // Reload to get updated status
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to send invoice');
      }
    } catch (error) {
      console.error('Failed to send invoice:', error);
      setError('Failed to send invoice');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }> = {
      draft: { variant: 'secondary', icon: Clock },
      open: { variant: 'outline', icon: AlertCircle },
      paid: { variant: 'default', icon: CheckCircle },
      void: { variant: 'destructive', icon: Trash2 },
      uncollectible: { variant: 'destructive', icon: AlertCircle }
    };
    
    const config = variants[status] || variants.draft;
    const Icon = config?.icon || Clock;
    
    return (
      <Badge variant={config?.variant || 'secondary'} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  // useEffect to load data when component mounts or statusFilter changes
  useEffect(() => {
    if (user) {
      loadInvoices();
      loadTestCards();
    }
  }, [user, loadInvoices, loadTestCards]);

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = !searchTerm || 
      invoice.number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">請求書・決済管理</h1>
        <p className="text-gray-600 mt-2">
          請求書の管理、テスト決済、支払い履歴の確認
        </p>
      </div>

      {error && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="invoices" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            請求書
          </TabsTrigger>
          <TabsTrigger value="test-payments" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            テスト決済
          </TabsTrigger>
          <TabsTrigger value="billing-settings" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            請求設定
          </TabsTrigger>
        </TabsList>

        {/* 請求書タブ */}
        <TabsContent value="invoices" className="space-y-6">
          {/* 統計カード */}
          {invoiceStats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">総請求書数</p>
                      <p className="text-xl font-bold">{invoiceStats.total}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">支払済み</p>
                      <p className="text-xl font-bold">{formatPrice(invoiceStats.amounts.paid)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-sm text-gray-600">未払い</p>
                      <p className="text-xl font-bold">{formatPrice(invoiceStats.amounts.outstanding)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="text-sm text-gray-600">延滞</p>
                      <p className="text-xl font-bold">{invoiceStats.overdue.count}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* フィルター・検索 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4 items-center">
                <div className="flex-1">
                  <Label htmlFor="search">検索</Label>
                  <Input
                    placeholder="請求書番号、説明、顧客メールで検索..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <Label>ステータス</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="draft">下書き</SelectItem>
                      <SelectItem value="open">未払い</SelectItem>
                      <SelectItem value="paid">支払済み</SelectItem>
                      <SelectItem value="void">無効</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={loadInvoices} disabled={loading}>
                  更新
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 請求書テーブル */}
          <Card>
            <CardHeader>
              <CardTitle>請求書一覧</CardTitle>
              <CardDescription>
                すべての請求書を管理できます
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>請求書番号</TableHead>
                    <TableHead>顧客</TableHead>
                    <TableHead>金額</TableHead>
                    <TableHead>ステータス</TableHead>
                    <TableHead>期日</TableHead>
                    <TableHead>アクション</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.number || invoice.id.slice(-8)}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{invoice.customer.name || invoice.customer.email}</p>
                          {invoice.customer.name && (
                            <p className="text-sm text-gray-500">{invoice.customer.email}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{formatPrice(invoice.amount_due, invoice.currency)}</p>
                          {invoice.amount_remaining > 0 && invoice.amount_remaining !== invoice.amount_due && (
                            <p className="text-sm text-gray-500">
                              残り: {formatPrice(invoice.amount_remaining, invoice.currency)}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(invoice.status)}
                      </TableCell>
                      <TableCell>
                        {invoice.due_date ? (
                          <div>
                            <p>{new Date(invoice.due_date * 1000).toLocaleDateString('ja-JP')}</p>
                            {invoice.status === 'open' && invoice.due_date < Date.now() / 1000 && (
                              <p className="text-sm text-red-600">延滞</p>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400">期日なし</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {invoice.hosted_invoice_url && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(invoice.hosted_invoice_url, '_blank')}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                          
                          {invoice.invoice_pdf && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => downloadInvoicePDF(invoice.id)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                          
                          {invoice.status === 'open' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => sendInvoice(invoice.id)}
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredInvoices.length === 0 && !loading && (
                <div className="text-center py-8 text-gray-500">
                  請求書が見つかりません
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* テスト決済タブ */}
        <TabsContent value="test-payments" className="space-y-6">
          {process.env.NODE_ENV !== 'development' ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                テスト決済機能は開発環境でのみ利用できます
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>テストカード</CardTitle>
                  <CardDescription>
                    Stripeのテストカードを使用して決済をテストできます
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {testCards.map((card) => (
                      <Card key={card.id} className="border-dashed">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-medium">{card.description}</h4>
                              <p className="text-sm text-gray-600">{card.scenario}</p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {card.type.toUpperCase()}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>カード番号:</span>
                              <code className="text-xs">{card.displayNumber}</code>
                            </div>
                            <div className="flex justify-between">
                              <span>有効期限:</span>
                              <code className="text-xs">{card.exp_month}/{card.exp_year}</code>
                            </div>
                            <div className="flex justify-between">
                              <span>CVC:</span>
                              <code className="text-xs">{card.cvc}</code>
                            </div>
                            <div className="text-xs text-gray-500">
                              期待結果: {card.expectedResult}
                            </div>
                          </div>
                          
                          <Separator className="my-3" />
                          
                          <Button
                            size="sm"
                            onClick={() => executeTestPayment(card.id)}
                            disabled={loading}
                            className="w-full"
                          >
                            テスト決済実行 ($29.00)
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* テスト結果表示 */}
              {testPaymentResult && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {testPaymentResult.success ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      )}
                      テスト結果
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>ステータス</Label>
                          <p className={testPaymentResult.success ? 'text-green-600' : 'text-red-600'}>
                            {testPaymentResult.success ? '成功' : '失敗'}
                          </p>
                        </div>
                        <div>
                          <Label>使用カード</Label>
                          <p>{testPaymentResult.cardUsed?.description}</p>
                        </div>
                      </div>
                      
                      {testPaymentResult.paymentIntent && (
                        <div>
                          <Label>Payment Intent詳細</Label>
                          <pre className="bg-gray-50 p-3 rounded text-xs overflow-auto">
                            {JSON.stringify(testPaymentResult.paymentIntent, null, 2)}
                          </pre>
                        </div>
                      )}
                      
                      {testPaymentResult.error && (
                        <Alert className="border-red-200 bg-red-50">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <AlertDescription>
                            <strong>エラー:</strong> {testPaymentResult.error.message}
                            {testPaymentResult.error.code && (
                              <div className="mt-1">
                                <strong>コード:</strong> {testPaymentResult.error.code}
                              </div>
                            )}
                          </AlertDescription>
                        </Alert>
                      )}
                      
                      {testPaymentResult.logs?.stripeUrl && (
                        <div>
                          <Button
                            variant="outline"
                            onClick={() => window.open(testPaymentResult.logs?.stripeUrl, '_blank')}
                          >
                            Stripeダッシュボードで確認
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </TabsContent>

        {/* 請求設定タブ */}
        <TabsContent value="billing-settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>請求設定</CardTitle>
              <CardDescription>
                請求書の設定と企業情報を管理します
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">企業情報</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company-name">会社名</Label>
                      <Input id="company-name" placeholder="株式会社サンプル" />
                    </div>
                    <div>
                      <Label htmlFor="tax-id">税務ID</Label>
                      <Input id="tax-id" placeholder="T1234567890123" />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">住所</Label>
                      <Input id="address" placeholder="東京都渋谷区..." />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-4">請求書設定</h4>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="payment-terms">支払い期限</Label>
                      <Select defaultValue="30">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7日</SelectItem>
                          <SelectItem value="14">14日</SelectItem>
                          <SelectItem value="30">30日</SelectItem>
                          <SelectItem value="60">60日</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="invoice-footer">請求書フッター</Label>
                      <Input 
                        id="invoice-footer" 
                        placeholder="ご質問がある場合は、billing@example.com までお問い合わせください"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>設定を保存</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}