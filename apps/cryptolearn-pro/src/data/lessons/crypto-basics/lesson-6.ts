import type { Lesson } from '../../../types';

export const lesson6: Lesson = {
  id: 'crypto-basics-6',
  categoryId: 'crypto-basics',
  title: 'Cryptocurrency Wallets - ウォレットの種類と選び方',
  slug: 'cryptocurrency-wallets',
  description: '暗号通貨ウォレットの種類、それぞれの特徴、用途に応じた適切な選択方法を詳しく学びます。',
  difficultyLevel: 'beginner',
  estimatedMinutes: 20,
  orderIndex: 6,
  content: {
    sections: [
      {
        id: 'section-1',
        title: 'ウォレットの基本概念',
        orderIndex: 1,
        type: 'text',
        content: `
<p>暗号通貨ウォレットは、秘密鍵と公開鍵を管理し、暗号通貨の送受信を可能にするソフトウェアまたはハードウェアです。<br/>
ウォレットを理解することは、暗号通貨を安全に管理するための第一歩です。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">ウォレットとは何か？</h2>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">🔑 重要な理解</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">ウォレットは「鍵束」の役割</p>
<ul style="margin: 0.5rem 0 0 1.5rem; color: #374151;">
  <li>ウォレット自体に暗号通貨は保存されない</li>
  <li>暗号通貨はブロックチェーン上に存在</li>
  <li>ウォレットは秘密鍵へのアクセス手段を提供</li>
  <li>銀行の「キャッシュカード」のような役割</li>
</ul>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">ウォレットの5つの主要機能</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🔐 鍵の管理</h3>
    <p style="margin: 0; line-height: 1.6;">秘密鍵・公開鍵の生成と安全な管理</p>
  </div>
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">💸 送受金</h3>
    <p style="margin: 0; line-height: 1.6;">暗号通貨の送金・受金の実行</p>
  </div>
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">📊 残高確認</h3>
    <p style="margin: 0; line-height: 1.6;">リアルタイム残高と資産価値の表示</p>
  </div>
  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">📋 履歴管理</h3>
    <p style="margin: 0; line-height: 1.6;">取引履歴の記録と確認</p>
  </div>
  <div style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🪙 マルチアセット</h3>
    <p style="margin: 0; line-height: 1.6;">複数の暗号通貨対応</p>
  </div>
</div>
        `
      },
      {
        id: 'section-2',
        title: 'ウォレットの種類別分類',
        orderIndex: 2,
        type: 'text',
        content: `
<p>暗号通貨ウォレットには様々な種類があり、それぞれ異なる特徴とセキュリティレベルを持ちます。<br/>
用途と保有額に応じて適切なウォレットを選択することが重要です。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">1. ネット接続による分類</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin: 2rem 0;">
  <div style="background: #fee2e2; border: 2px solid #ef4444; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #dc2626; margin: 0 0 1rem 0; text-align: center;">🔥 ホットウォレット</h3>
    <p style="color: #374151; margin: 0 0 1rem 0; text-align: center; font-weight: 500;">インターネット接続あり</p>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li>ソフトウェアウォレット</li>
      <li>ウェブウォレット</li>
      <li>モバイルウォレット</li>
      <li>取引所ウォレット</li>
    </ul>
    <div style="background: #fca5a5; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
      <strong style="color: #991b1b;">利便性重視・ハッキングリスクあり</strong>
    </div>
  </div>
  
  <div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #16a34a; margin: 0 0 1rem 0; text-align: center;">❄️ コールドウォレット</h3>
    <p style="color: #374151; margin: 0 0 1rem 0; text-align: center; font-weight: 500;">オフライン状態</p>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li>ハードウェアウォレット</li>
      <li>ペーパーウォレット</li>
      <li>エアギャップコンピュータ</li>
    </ul>
    <div style="background: #86efac; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
      <strong style="color: #14532d;">セキュリティ最優先・使いやすさに課題</strong>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2. 管理方式による分類</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin: 2rem 0;">
  <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #d97706; margin: 0 0 1rem 0; text-align: center;">🏢 カストディアルウォレット</h3>
    <p style="color: #374151; margin: 0 0 1rem 0; text-align: center; font-weight: 500;">第三者が秘密鍵を管理</p>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li>取引所のウォレット</li>
      <li>使いやすい</li>
      <li>パスワード忘れでも復旧可能</li>
      <li>自己管理ではない</li>
    </ul>
    <div style="background: #fbbf24; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
      <strong style="color: #92400e;">"Not your keys, not your coins"</strong>
    </div>
  </div>
  
  <div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #2563eb; margin: 0 0 1rem 0; text-align: center;">👤 ノンカストディアルウォレット</h3>
    <p style="color: #374151; margin: 0 0 1rem 0; text-align: center; font-weight: 500;">ユーザーが秘密鍵を完全管理</p>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li>真の所有権を持つ</li>
      <li>自己責任でのセキュリティ管理</li>
      <li>検閲耐性</li>
      <li>紛失リスクは自己責任</li>
    </ul>
    <div style="background: #93c5fd; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
      <strong style="color: #1e3a8a;">真の暗号通貨の理念に基づく</strong>
    </div>
  </div>
</div>

<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #dc2626; display: flex; align-items: center;">⚠️ 重要な原則</h3>
<p style="margin: 0; font-weight: 500; color: #dc2626;">"Not your keys, not your coins"</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">暗号通貨の世界では、秘密鍵を持たない場合、その資産は真の意味であなたのものではありません。</p>
</div>
        `
      },
      {
        id: 'section-3',
        title: '各ウォレット種類の詳細',
        orderIndex: 3,
        type: 'text',
        content: `
<p>それぞれのウォレット種類の具体的な特徴、メリット・デメリット、推奨用途を詳しく見ていきましょう。<br/>
各ウォレットには適した使用場面があります。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">ウォレット種類別詳細比較</h2>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <div style="display: grid; grid-template-columns: 1fr; gap: 2rem;">
    
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
      <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.3em;">💻 デスクトップウォレット</h3>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1rem 0;">
        <div>
          <h4 style="color: #ffffff; margin: 0 0 0.5rem 0; font-size: 1em;">例</h4>
          <p style="margin: 0; font-size: 0.9em;">Electrum, Exodus, Atomic Wallet</p>
        </div>
        <div>
          <h4 style="color: #ffffff; margin: 0 0 0.5rem 0; font-size: 1em;">メリット</h4>
          <p style="margin: 0; font-size: 0.9em;">フル機能、プライバシー保護</p>
        </div>
        <div>
          <h4 style="color: #ffffff; margin: 0 0 0.5rem 0; font-size: 1em;">デメリット</h4>
          <p style="margin: 0; font-size: 0.9em;">マルウェアリスク、PC依存</p>
        </div>
      </div>
    </div>
    
    <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem;">
      <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.3em;">📱 モバイルウォレット</h3>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1rem 0;">
        <div>
          <h4 style="color: #ffffff; margin: 0 0 0.5rem 0; font-size: 1em;">例</h4>
          <p style="margin: 0; font-size: 0.9em;">Trust Wallet, Coinbase Wallet, MetaMask</p>
        </div>
        <div>
          <h4 style="color: #ffffff; margin: 0 0 0.5rem 0; font-size: 1em;">メリット</h4>
          <p style="margin: 0; font-size: 0.9em;">利便性、外出先利用可能</p>
        </div>
        <div>
          <h4 style="color: #ffffff; margin: 0 0 0.5rem 0; font-size: 1em;">デメリット</h4>
          <p style="margin: 0; font-size: 0.9em;">紛失リスク、セキュリティ</p>
        </div>
      </div>
    </div>
    
    <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem;">
      <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.3em;">🔒 ハードウェアウォレット</h3>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1rem 0;">
        <div>
          <h4 style="color: #ffffff; margin: 0 0 0.5rem 0; font-size: 1em;">例</h4>
          <p style="margin: 0; font-size: 0.9em;">Ledger Nano S/X, Trezor, KeepKey</p>
        </div>
        <div>
          <h4 style="color: #ffffff; margin: 0 0 0.5rem 0; font-size: 1em;">メリット</h4>
          <p style="margin: 0; font-size: 0.9em;">最高レベルのセキュリティ</p>
        </div>
        <div>
          <h4 style="color: #ffffff; margin: 0 0 0.5rem 0; font-size: 1em;">デメリット</h4>
          <p style="margin: 0; font-size: 0.9em;">コスト、使いやすさ</p>
        </div>
      </div>
    </div>
    
    <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 12px; padding: 1.5rem;">
      <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.3em;">🌐 ウェブウォレット</h3>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1rem 0;">
        <div>
          <h4 style="color: #ffffff; margin: 0 0 0.5rem 0; font-size: 1em;">例</h4>
          <p style="margin: 0; font-size: 0.9em;">MyEtherWallet, MyCrypto</p>
        </div>
        <div>
          <h4 style="color: #ffffff; margin: 0 0 0.5rem 0; font-size: 1em;">メリット</h4>
          <p style="margin: 0; font-size: 0.9em;">どこからでもアクセス</p>
        </div>
        <div>
          <h4 style="color: #ffffff; margin: 0 0 0.5rem 0; font-size: 1em;">デメリット</h4>
          <p style="margin: 0; font-size: 0.9em;">フィッシングリスク</p>
        </div>
      </div>
    </div>
    
    <div style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); color: white; border-radius: 12px; padding: 1.5rem;">
      <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.3em;">📄 ペーパーウォレット</h3>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1rem 0;">
        <div>
          <h4 style="color: #ffffff; margin: 0 0 0.5rem 0; font-size: 1em;">特徴</h4>
          <p style="margin: 0; font-size: 0.9em;">完全オフライン保存</p>
        </div>
        <div>
          <h4 style="color: #ffffff; margin: 0 0 0.5rem 0; font-size: 1em;">適用</h4>
          <p style="margin: 0; font-size: 0.9em;">長期保有(HODL)</p>
        </div>
        <div>
          <h4 style="color: #ffffff; margin: 0 0 0.5rem 0; font-size: 1em;">注意</h4>
          <p style="margin: 0; font-size: 0.9em;">専門知識が必要</p>
        </div>
      </div>
    </div>
    
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">セキュリティレベル比較</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white;">
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">ウォレット種類</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">🔒 セキュリティ</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">⚡ 利便性</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">💰 推奨金額</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">ハードウェア</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">★★★★★</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #d97706;">★★☆☆☆</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">100万円以上</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">デスクトップ</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">★★★★☆</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">★★★★☆</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">10-100万円</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">モバイル</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #d97706;">★★★☆☆</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">★★★★★</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">〜10万円</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">ウェブ</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #ef4444;">★★☆☆☆</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">★★★★☆</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">〜5万円</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">取引所</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #ef4444;">★☆☆☆☆</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">★★★★★</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">取引用のみ</td>
</tr>
</tbody>
</table>
        `
      },
      {
        id: 'section-4',
        title: 'ウォレット選択の指針',
        orderIndex: 4,
        type: 'text',
        content: `
<p>用途、保有額、技術レベルに応じて最適なウォレットを選択することが重要です。<br/>
セキュリティと利便性のバランスを考慮した戦略的な選択を行いましょう。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">用途別推奨ウォレット戦略</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin: 2rem 0;">
  <div style="background: #f0f9ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #2563eb; margin: 0 0 1rem 0; text-align: center;">💳 日常的な少額利用</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>推奨：</strong> モバイルウォレット</li>
      <li>Trust Wallet, Coinbase Wallet</li>
      <li><strong>金額：</strong> 数万円程度まで</li>
      <li><strong>理由：</strong> 利便性重視</li>
    </ul>
    <div style="background: #dbeafe; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
      <strong style="color: #1e40af;">財布の現金と同じ感覚で</strong>
    </div>
  </div>
  
  <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #d97706; margin: 0 0 1rem 0; text-align: center;">💰 中程度の投資額</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>推奨：</strong> デスクトップ + モバイル</li>
      <li>Exodus + Trust Wallet</li>
      <li><strong>金額：</strong> 10-100万円程度</li>
      <li><strong>理由：</strong> バランス重視</li>
    </ul>
    <div style="background: #fde68a; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
      <strong style="color: #92400e;">デスクトップで保管、モバイルで少額利用</strong>
    </div>
  </div>
  
  <div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #16a34a; margin: 0 0 1rem 0; text-align: center;">🏦 大口投資・長期保有</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>推奨：</strong> ハードウェアウォレット</li>
      <li>Ledger Nano X + Trezor (バックアップ)</li>
      <li><strong>金額：</strong> 100万円以上</li>
      <li><strong>理由：</strong> セキュリティ最優先</li>
    </ul>
    <div style="background: #bbf7d0; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
      <strong style="color: #14532d;">複数のバックアップ戦略必須</strong>
    </div>
  </div>
  
  <div style="background: #fdf4ff; border: 2px solid #a855f7; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #9333ea; margin: 0 0 1rem 0; text-align: center;">🔄 DeFi利用</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>推奨：</strong> ブラウザ統合ウォレット</li>
      <li>MetaMask, WalletConnect対応</li>
      <li><strong>特徴：</strong> dApps連携</li>
      <li><strong>注意：</strong> スマートコントラクトリスク</li>
    </ul>
    <div style="background: #f3e8ff; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
      <strong style="color: #7c3aed;">DeFiプロトコルとの連携性重視</strong>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">セキュリティ重視の選択基準</h2>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem;">
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #16a34a;">
      <div style="background: #16a34a; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">1</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #16a34a;">オープンソースであること</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">コードが公開され、第三者による監査が可能</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
      <div style="background: #3b82f6; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">2</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #2563eb;">秘密鍵の完全な自己管理</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">ノンカストディアルで真の所有権を確保</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
      <div style="background: #f59e0b; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">3</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #d97706;">定期的なセキュリティ監査</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">信頼できる監査会社による定期チェック</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #fdf4ff; border-radius: 8px; border-left: 4px solid #a855f7;">
      <div style="background: #a855f7; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">4</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #9333ea;">多要素認証対応</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">PIN、生体認証、ハードウェアキー対応</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #fef2f2; border-radius: 8px; border-left: 4px solid #ef4444;">
      <div style="background: #ef4444; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">5</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #dc2626;">バックアップ・復旧機能</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">シードフレーズによる確実な復旧メカニズム</p>
      </div>
    </div>
    
  </div>
</div>

<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #dc2626; display: flex; align-items: center;">🚫 避けるべきウォレット</h3>
<p style="margin: 0; font-weight: 500; color: #dc2626;">リスクが高い危険なウォレット</p>
<ul style="margin: 0.5rem 0 0 1.5rem; color: #374151;">
  <li>開発が停止しているもの</li>
  <li>クローズドソース</li>
  <li>評判の悪い開発者</li>
  <li>セキュリティ事故の履歴</li>
  <li>怪しい広告で宣伝されているもの</li>
</ul>
</div>

<div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 プロのアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">複数ウォレット戦略</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">用途に応じて複数のウォレットを使い分けることで、セキュリティと利便性の両方を確保できます。</p>
</div>
        `
      }
    ],
    keyPoints: [
      'ウォレットは暗号通貨を保存するのではなく、鍵を管理するツール',
      'ホットウォレットは利便性、コールドウォレットはセキュリティ重視',
      '用途と保有額に応じて適切なウォレットタイプを選択',
      'ハードウェアウォレットは大口保有者には必須',
      'ノンカストディアルウォレットで真の所有権を確保',
      '定期的なバックアップと復旧テストが重要'
    ],
    summary: '暗号通貨ウォレットは秘密鍵管理の中核ツールです。ホット/コールド、カストディアル/ノンカストディアルの特徴を理解し、用途と保有額に応じて適切に選択することが重要です。セキュリティと利便性のバランスを考慮した選択が必要です。',
    practicalExamples: [
      '初心者推奨: Trust Wallet(モバイル)+ Exodus(デスクトップ)',
      'DeFi利用: MetaMask(ブラウザ)+ WalletConnect対応',
      '大口保有: Ledger Nano X(メイン)+ Trezor(バックアップ)',
      '企業利用: マルチシグウォレット(Gnosis Safe等)'
    ],
    warningNotes: [
      'ウォレットアプリの偽物やフィッシングサイトが多数存在',
      'シードフレーズを紛失すると資産回復不可能',
      'ホットウォレットにはハッキングリスクが常に存在',
      '取引所ウォレットは真の自己管理ではない',
      '無料Wi-Fiでの秘密鍵操作は危険',
      'ウォレットソフトは必ず公式サイトからダウンロード'
    ]
  },
  quiz: [
    {
      id: 'crypto-basics-6-q1',
      question: '暗号通貨ウォレットは実際に何を保存していますか？',
      options: [
        '暗号通貨そのもの',
        '秘密鍵と公開鍵',
        'ブロックチェーンデータ',
        '取引履歴のみ'
      ],
      correctAnswer: 1,
      explanation: 'ウォレットは暗号通貨を保存するのではなく、ブロックチェーン上の資産にアクセスするための秘密鍵と公開鍵を管理します。'
    },
    {
      id: 'crypto-basics-6-q2',
      question: '大量の暗号通貨を長期保有する場合の最適なウォレットは？',
      options: [
        'ウェブウォレット',
        'モバイルウォレット',
        'ハードウェアウォレット',
        '取引所ウォレット'
      ],
      correctAnswer: 2,
      explanation: 'ハードウェアウォレットはオフラインで秘密鍵を保管するため、大量の暗号通貨を長期保有する場合に最も安全です。'
    },
    {
      id: 'crypto-basics-6-q3',
      question: 'ノンカストディアルウォレットの特徴は？',
      options: [
        '取引所が秘密鍵を管理',
        'ユーザーが秘密鍵を完全管理',
        '政府が管理している',
        'マイナーが管理している'
      ],
      correctAnswer: 1,
      explanation: 'ノンカストディアルウォレットでは、ユーザーが秘密鍵を完全に自己管理し、真の所有権を持ちます。'
    },
    {
      id: 'crypto-basics-6-q4',
      question: 'DeFiプロトコルを利用する場合に適したウォレットは？',
      options: [
        'ペーパーウォレット',
        'ハードウェアウォレットのみ',
        'ブラウザ統合ウォレット(MetaMask等)',
        '取引所ウォレット'
      ],
      correctAnswer: 2,
      explanation: 'DeFi利用にはブラウザ統合ウォレット(MetaMask等)が適しており、WalletConnect等のプロトコルでdAppsと連携できます。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};