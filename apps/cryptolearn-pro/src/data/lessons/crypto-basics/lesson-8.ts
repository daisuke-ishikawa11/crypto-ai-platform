import type { Lesson } from '../../../types';

export const lesson8: Lesson = {
  id: 'crypto-basics-8',
  categoryId: 'crypto-basics',
  title: 'Understanding Exchanges - 取引所の基本',
  slug: 'understanding-exchanges',
  description: '暗号通貨取引所の種類、機能、選び方、および取引所利用時のセキュリティ対策を詳しく学習します。',
  difficultyLevel: 'beginner',
  estimatedMinutes: 24,
  orderIndex: 8,
  content: {
    sections: [
      {
        id: 'section-1',
        title: '暗号通貨取引所とは',
        orderIndex: 1,
        type: 'text',
        content: `
<p>暗号通貨取引所は、ユーザーが暗号通貨を売買・交換できるプラットフォームです。<br/>
従来の証券取引所のデジタル版と考えることができ、暗号通貨エコシステムへの重要な入口となっています。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">取引所の5つの主要機能</h2>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em; display: flex; align-items: center;">💱 売買取引</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">暗号通貨と法定通貨、または暗号通貨同士の交換を仲介</p>
  </div>
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em; display: flex; align-items: center;">📈 価格発見</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">需要と供給によるリアルタイム価格形成メカニズム</p>
  </div>
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em; display: flex; align-items: center;">🌊 流動性提供</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">大量の買い手と売り手をマッチングし、取引を円滑化</p>
  </div>
  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em; display: flex; align-items: center;">🏛️ 保管サービス</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">取引用ウォレットの提供と資産管理</p>
  </div>
  <div style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); color: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em; display: flex; align-items: center;">💳 入出金</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">銀行口座やクレジットカードとの連携サービス</p>
  </div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">🎯 取引所の4つの重要な役割</h3>
<ul style="margin: 0.5rem 0 0 1.5rem; color: #374151;">
  <li>暗号通貨エコシステムへの入口</li>
  <li>価格の透明性確保</li>
  <li>機関投資家の参入促進</li>
  <li>規制準拠のフレームワーク提供</li>
</ul>
</div>
        `
      },
      {
        id: 'section-2',
        title: '取引所の種類と特徴',
        orderIndex: 2,
        type: 'text',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">中央集権型取引所 vs 分散型取引所</h2>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; padding: 2rem;">
    <h3 style="color: #ffffff; margin: 0 0 1.5rem 0; font-size: 1.4em; text-align: center;">🏢 中央集権型取引所 (CEX)</h3>
    
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="color: #ffffff; margin: 0 0 0.5rem 0;">主要な特徴</h4>
      <ul style="margin: 0; padding-left: 1.2rem; color: #f0f0f0;">
        <li>企業が運営・管理</li>
        <li>法定通貨対応が豊富</li>
        <li>高い流動性</li>
        <li>KYC(本人確認)必須</li>
      </ul>
    </div>

    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="color: #ffffff; margin: 0 0 0.5rem 0;">代表例</h4>
      <ul style="margin: 0; padding-left: 1.2rem; color: #f0f0f0;">
        <li><strong>Coinbase</strong>: 米国最大、初心者向け</li>
        <li><strong>Binance</strong>: 世界最大の取引量</li>
        <li><strong>Kraken</strong>: セキュリティ重視</li>
        <li><strong>bitFlyer</strong>: 日本の大手</li>
      </ul>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 16px; padding: 2rem;">
    <h3 style="color: #ffffff; margin: 0 0 1.5rem 0; font-size: 1.4em; text-align: center;">🌐 分散型取引所 (DEX)</h3>
    
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="color: #ffffff; margin: 0 0 0.5rem 0;">主要な特徴</h4>
      <ul style="margin: 0; padding-left: 1.2rem; color: #f0f0f0;">
        <li>スマートコントラクトで動作</li>
        <li>中央管理者不在</li>
        <li>ノンカストディアル</li>
        <li>検閲耐性</li>
      </ul>
    </div>

    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="color: #ffffff; margin: 0 0 0.5rem 0;">代表例</h4>
      <ul style="margin: 0; padding-left: 1.2rem; color: #f0f0f0;">
        <li><strong>Uniswap</strong>: イーサリアム最大</li>
        <li><strong>PancakeSwap</strong>: BSCの主要DEX</li>
        <li><strong>SushiSwap</strong>: 流動性マイニング</li>
        <li><strong>dYdX</strong>: デリバティブ特化</li>
      </ul>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">メリット・デメリット比較</h2>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 2rem 0;">
  <div style="border: 2px solid #667eea; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #667eea; margin: 0 0 1rem 0; text-align: center;">✅ CEXのメリット</h3>
    <ul style="margin: 0; color: #374151;">
      <li>使いやすいインターface</li>
      <li>高速取引</li>
      <li>カスタマーサポート</li>
      <li>法定通貨での直接購入</li>
      <li>保険による保護(一部)</li>
    </ul>
  </div>
  <div style="border: 2px solid #f093fb; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #f093fb; margin: 0 0 1rem 0; text-align: center;">❌ CEXのデメリット</h3>
    <ul style="margin: 0; color: #374151;">
      <li>カウンターパーティリスク</li>
      <li>政府規制による制限</li>
      <li>プライバシーの制約</li>
      <li>ハッキング標的</li>
    </ul>
  </div>
  <div style="border: 2px solid #4facfe; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #4facfe; margin: 0 0 1rem 0; text-align: center;">✅ DEXのメリット</h3>
    <ul style="margin: 0; color: #374151;">
      <li>完全な自己管理</li>
      <li>プライバシー保護</li>
      <li>24/7稼働(ダウンタイムなし)</li>
      <li>新トークンへの早期アクセス</li>
      <li>検閲耐性</li>
    </ul>
  </div>
  <div style="border: 2px solid #ff9a9e; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ff9a9e; margin: 0 0 1rem 0; text-align: center;">❌ DEXのデメリット</h3>
    <ul style="margin: 0; color: #374151;">
      <li>使いにくいインターface</li>
      <li>ガス手数料の変動</li>
      <li>流動性の制限</li>
      <li>法定通貨対応なし</li>
      <li>セルフサポート</li>
    </ul>
  </div>
</div>
        `
      },
      {
        id: 'section-3',
        title: '取引所選択の重要な基準',
        orderIndex: 3,
        type: 'text',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">取引所選択の4つの重要基準</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🔒 セキュリティ評価</h3>
    <ul style="margin: 0; line-height: 1.6; color: #f0f0f0;">
      <li>規制ライセンス取得</li>
      <li>保険カバー範囲</li>
      <li>コールドストレージ率</li>
      <li>セキュリティ監査実績</li>
      <li>二要素認証の実装</li>
    </ul>
  </div>
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">💰 手数料構造</h3>
    <ul style="margin: 0; line-height: 1.6; color: #f0f0f0;">
      <li>取引手数料率</li>
      <li>入出金手数料</li>
      <li>通貨換算手数料</li>
      <li>隠れたコスト</li>
      <li>VIP割引制度</li>
    </ul>
  </div>
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🌊 流動性・取引量</h3>
    <ul style="margin: 0; line-height: 1.6; color: #f0f0f0;">
      <li>日次取引量</li>
      <li>スプレッドの狭さ</li>
      <li>約定速度</li>
      <li>大口取引への影響</li>
      <li>市場の深度</li>
    </ul>
  </div>
  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🎯 対応資産・ペア</h3>
    <ul style="margin: 0; line-height: 1.6; color: #f0f0f0;">
      <li>主要暗号通貨対応</li>
      <li>法定通貨ペア</li>
      <li>アルトコインの豊富さ</li>
      <li>新規上場頻度</li>
      <li>DeFiトークン対応</li>
    </ul>
  </div>
</div>

<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #dc2626; display: flex; align-items: center;">⚠️ 過去のセキュリティ事故例</h3>
<ul style="margin: 0.5rem 0 0 1.5rem; color: #7f1d1d;">
  <li><strong>Mt. Gox (2014)</strong>: 85万BTC盗難（当時価値$450M、2025年価値$105B+）</li>
  <li><strong>Coincheck (2018)</strong>: 580億円相当のNEM盗難</li>
  <li><strong>FTX (2022)</strong>: $8B+ 顧客資金流用、業界最大級の破綻</li>
  <li><strong>教訓:</strong> 2025年も「Not your keys, not your crypto」は鉄則</li>
</ul>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">主要取引所の手数料比較</h2>

<table style="width: 100%; border-collapse: collapse; margin: 2rem 0; border: 1px solid #e5e7eb;">
  <thead>
    <tr style="background: #f3f4f6;">
      <th style="border: 1px solid #e5e7eb; padding: 1rem; text-align: left; color: #374151;">取引所</th>
      <th style="border: 1px solid #e5e7eb; padding: 1rem; text-align: left; color: #374151;">Maker手数料</th>
      <th style="border: 1px solid #e5e7eb; padding: 1rem; text-align: left; color: #374151;">Taker手数料</th>
      <th style="border: 1px solid #e5e7eb; padding: 1rem; text-align: left; color: #374151;">特徴</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #e5e7eb; padding: 1rem; font-weight: 600;">Binance</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem;">0.1%</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem;">0.1%</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem; color: #059669;">2025年世界最大日量$50B+</td>
    </tr>
    <tr style="background: #f9fafb;">
      <td style="border: 1px solid #e5e7eb; padding: 1rem; font-weight: 600;">Coinbase Advanced</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem;">0.6%</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem;">0.6%</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem; color: #059669;">米国最大、規制完全対応</td>
    </tr>
    <tr>
      <td style="border: 1px solid #e5e7eb; padding: 1rem; font-weight: 600;">Kraken</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem;">0.16%</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem;">0.26%</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem; color: #059669;">セキュリティ最優先</td>
    </tr>
    <tr style="background: #f9fafb;">
      <td style="border: 1px solid #e5e7eb; padding: 1rem; font-weight: 600;">bitFlyer</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem;">0.1%</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem;">0.15%</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem; color: #059669;">日本最大、金融庁認可</td>
    </tr>
  </tbody>
</table>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="border: 2px solid #4facfe; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #4facfe; margin: 0 0 1rem 0;">💡 手数料以外のコスト</h3>
    <ul style="margin: 0; color: #374151;">
      <li>入金手数料: 無料〜3%</li>
      <li>出金手数料: ネットワーク手数料+マージン</li>
      <li>通貨換算手数料: 0.5%〜2%</li>
      <li>スプレッド（実質的な取引コスト）</li>
    </ul>
  </div>
  <div style="border: 2px solid #43e97b; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #43e97b; margin: 0 0 1rem 0;">📊 流動性チェックポイント</h3>
    <ul style="margin: 0; color: #374151;">
      <li>高い流動性 = より良い価格での約定</li>
      <li>スプレッドの狭さ</li>
      <li>大口取引での価格影響の小ささ</li>
      <li>オーダーブックの深度</li>
    </ul>
  </div>
</div>
        `
      },
      {
        id: 'section-4',
        title: '取引所利用時のセキュリティ対策',
        orderIndex: 4,
        type: 'text',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">必須のセキュリティ設定</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🔐 二要素認証(2FA)</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6;"><strong>推奨:</strong> 認証アプリ<br/>
      (Google Authenticator, Authy)</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6;"><strong>非推奨:</strong> SMS認証<br/>
      (SIMスワップ攻撃リスク)</p>
    </div>
  </div>
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🔑 強固なパスワード</h3>
    <ul style="margin: 0; line-height: 1.6; color: #f0f0f0;">
      <li>最低12文字以上</li>
      <li>英数字記号の組み合わせ</li>
      <li>他サービスとは別の独自パスワード</li>
      <li>パスワード管理ツール使用</li>
    </ul>
  </div>
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">📋 ホワイトリスト設定</h3>
    <ul style="margin: 0; line-height: 1.6; color: #f0f0f0;">
      <li>出金アドレスの事前登録</li>
      <li>IP制限（固定IPの場合）</li>
      <li>デバイス登録</li>
      <li>API制限設定</li>
    </ul>
  </div>
  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">⚖️ 最小保有原則</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0; text-align: center;">
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">取引所 = 銀行の窓口</p>
      <p style="margin: 0.5rem 0 0 0;">長期保管には使わない</p>
    </div>
  </div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">✅ ベストプラクティス</h3>
<ul style="margin: 0.5rem 0 0 1.5rem; color: #374151;">
  <li>取引後は速やかに自己管理ウォレットへ移動</li>
  <li>取引所残高は月収の1〜3ヶ月分以下に制限</li>
  <li>複数の取引所に分散してリスク軽減</li>
  <li>定期的なセキュリティ設定の見直し</li>
</ul>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">フィッシング詐欺対策</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="border: 2px solid #f093fb; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #f093fb; margin: 0 0 1rem 0;">🚫 フィッシング対策</h3>
    <ul style="margin: 0; color: #374151;">
      <li>ブックマークからのみアクセス</li>
      <li>URLの完全確認（typo-squatting注意）</li>
      <li>SSL証明書の確認</li>
      <li>公式アプリのみ使用</li>
    </ul>
  </div>
  <div style="border: 2px solid #ef4444; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ef4444; margin: 0 0 1rem 0;">⚠️ 疑わしい活動の兆候</h3>
    <ul style="margin: 0; color: #374151;">
      <li>身に覚えのないログイン通知</li>
      <li>残高の予期しない変動</li>
      <li>設定変更の通知</li>
      <li>新しいデバイスからのアクセス通知</li>
    </ul>
  </div>
</div>

<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #dc2626; display: flex; align-items: center;">🔥 緊急時の対応手順</h3>
<ol style="margin: 0.5rem 0 0 1.5rem; color: #7f1d1d;">
  <li>即座にパスワード変更</li>
  <li>全てのセッションをログアウト</li>
  <li>2FAの再設定</li>
  <li>残高・取引履歴の確認</li>
  <li>取引所サポートへの緊急連絡</li>
</ol>
</div>
        `
      }
    ],
    keyPoints: [
      '取引所は暗号通貨売買の重要なインフラだが、カウンターパーティリスクあり',
      'CEXは利便性、DEXは自己主権を重視',
      'セキュリティ、手数料、流動性、対応資産で選択',
      '2FAとホワイトリスト設定は必須',
      '取引所は一時利用に留め、長期保管は避ける',
      '複数取引所の分散利用でリスク軽減'
    ],
    summary: '暗号通貨取引所は売買の重要なゲートウェイですが、適切な選択とセキュリティ対策が不可欠です。CEXとDEXの特徴を理解し、用途に応じて使い分け、常に自己管理ウォレットでの保管を心がけることが重要です。',
    practicalExamples: [
      '初心者推奨ルート: Coinbase(使いやすさ重視) → 慣れたらBinance(機能性重視) → DEX体験',
      '2025年8月手数料比較例: ¥100,000取引時 Coinbase ¥1,500 vs Binance ¥100 vs DEX ¥500-5,000(ガス次第)',
      'DEX利用実例: MetaMask + Uniswap でETH(¥761,000)→USDC交換',
      'リスク分散事例: 5取引所に資産分散で1社破綻時の損失を20%以下に制限',
      '2025年取引量ランキング: Binance(日量$50B+) > Coinbase(日量$3-5B) > Kraken(日量$1-2B)'
    ],
    warningNotes: [
      '取引所の破綻により顧客資金が失われる可能性(FTXの例)',
      'KYC情報の提供によりプライバシーが制限される',
      '政府規制により突然サービス停止の可能性',
      'フィッシングサイトが多数存在し、詐欺被害が頻発',
      '高頻度取引により手数料が想定以上に高額になる',
      'DEX利用時はスマートコントラクトのバグリスクもある'
    ]
  },
  quiz: [
    {
      id: 'crypto-basics-8-q1',
      question: '中央集権型取引所(CEX)の最大のリスクは？',
      options: [
        '手数料が高い',
        '取引速度が遅い',
        'カウンターパーティリスク',
        '対応通貨が少ない'
      ],
      correctAnswer: 2,
      explanation: 'CEXでは取引所が顧客資金を管理するため、取引所の破綻やハッキングにより資金を失うカウンターパーティリスクが最大の懸念です。'
    },
    {
      id: 'crypto-basics-8-q2',
      question: '分散型取引所(DEX)の主な利点は？',
      options: [
        '使いやすいインターface',
        '法定通貨での直接購入',
        '完全な自己管理と検閲耐性',
        'カスタマーサポート'
      ],
      correctAnswer: 2,
      explanation: 'DEXでは中央管理者がいないため、完全に自分で資金を管理でき、政府や企業による検閲を受けない特徴があります。'
    },
    {
      id: 'crypto-basics-8-q3',
      question: '取引所利用時の推奨セキュリティ対策は？',
      options: [
        'SMS認証のみで十分',
        '2FA + ホワイトリスト + 最小保有',
        'パスワードは簡単なものを使用',
        'すべての資産を取引所で保管'
      ],
      correctAnswer: 1,
      explanation: '2FA(認証アプリ)、出金アドレスのホワイトリスト、最小保有原則の組み合わせが効果的なセキュリティ対策です。'
    },
    {
      id: 'crypto-basics-8-q4',
      question: 'なぜ取引所での長期保管は推奨されないのか？',
      options: [
        '手数料がかかるから',
        '取引所破綻やハッキングのリスク',
        '価格変動が激しいから',
        '政府が禁止しているから'
      ],
      correctAnswer: 1,
      explanation: '過去多数の取引所がハッキングや破綻により顧客資金を失っているため、「Not your keys, not your crypto」の原則に従い自己管理が重要です。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};