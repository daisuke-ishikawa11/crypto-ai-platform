import type { Lesson } from '@/types';

export const lesson5: Lesson = {
  id: 'crypto-basics-5',
  categoryId: 'crypto-basics',
  title: 'Public vs Private Keys - キー管理の基礎',
  slug: 'public-private-keys',
  description: '暗号通貨のセキュリティの根幹である公開鍵・秘密鍵システムの仕組みと安全な管理方法を学びます。',
  difficultyLevel: 'beginner',
  estimatedMinutes: 22,
  orderIndex: 5,
  content: {
    sections: [
      {
        id: 'section-1',
        title: '公開鍵暗号の基本概念',
        orderIndex: 1,
        type: 'text',
        content: `
<p>暗号通貨のセキュリティは公開鍵暗号システムに基づいています。<br/>
1976年に発明された革新的な暗号技術で、数学的に関連する2つの鍵を使用します。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">公開鍵暗号システムの構成</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🔑 秘密鍵（Private Key）</h3>
    <p style="margin: 0; line-height: 1.6;">絶対に秘匿すべき鍵。資産への完全なアクセス権を持つ最重要データ</p>
  </div>
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🌐 公開鍵（Public Key）</h3>
    <p style="margin: 0; line-height: 1.6;">誰にでも公開可能な鍵。アドレス生成と署名検証に使用</p>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">基本原理と数学的関係</h2>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem;">
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #fef2f2; border-radius: 8px; border-left: 4px solid #ef4444;">
      <div style="background: #ef4444; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">1</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #dc2626;">一方向関数</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">秘密鍵から公開鍵は生成可能、公開鍵から秘密鍵の逆算は計算上不可能</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
      <div style="background: #3b82f6; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">2</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #2563eb;">デジタル署名</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">秘密鍵で署名作成 → 公開鍵で署名検証。本人確認の仕組み</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #16a34a;">
      <div style="background: #16a34a; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">3</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #16a34a;">楕円曲線暗号（ECC）</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">ビットコインで使用されるsecp256k1曲線による高度なセキュリティ</p>
      </div>
    </div>
    
  </div>
</div>

<div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 日常生活での例え</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">銀行システムとの類似</p>
<ul style="margin: 0.5rem 0 0 1.5rem; color: #374151;">
  <li><strong>秘密鍵 =</strong> 銀行口座の暗証番号（絶対秘匿）</li>
  <li><strong>公開鍵 =</strong> 銀行口座番号（公開可能）</li>
  <li><strong>デジタル署名 =</strong> 取引への署名・承認</li>
</ul>
</div>
        `
      },
      {
        id: 'section-2',
        title: '暗号通貨における鍵の役割',
        orderIndex: 2,
        type: 'text',
        content: `
<p>暗号通貨システムでは、秘密鍵と公開鍵がそれぞれ重要な役割を果たします。<br/>
この理解が安全な暗号通貨管理の第一歩です。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">秘密鍵の3つの重要機能</h2>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem; position: relative;">
    <div style="position: absolute; top: -10px; right: -10px; background: #fbbf24; color: #92400e; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</div>
    <h3 style="color: #ffffff; margin: 0 0 1rem 0;">🏆 所有権証明</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">暗号通貨の真の所有者であることを数学的に証明</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem; position: relative;">
    <div style="position: absolute; top: -10px; right: -10px; background: #fbbf24; color: #92400e; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</div>
    <h3 style="color: #ffffff; margin: 0 0 1rem 0;">✍️ 取引署名</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">送金取引にデジタル署名を追加し、正当性を保証</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem; position: relative;">
    <div style="position: absolute; top: -10px; right: -10px; background: #fbbf24; color: #92400e; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold;">3</div>
    <h3 style="color: #ffffff; margin: 0 0 1rem 0;">💎 資産管理</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">秘密鍵 = 資産への完全なアクセス権とコントロール</p>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">公開鍵の機能と用途</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white;">
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">機能</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">説明</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">具体例</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">アドレス生成</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">受信用ウォレットアドレスの基礎</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">署名検証</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">取引が正当な所有者からか確認</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">ネットワーク全体で自動検証</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">暗号化通信</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">安全な通信の暗号化（一部用途）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">メッセージ暗号化</td>
</tr>
</tbody>
</table>

<div style="background: #fee2e2; border-left: 4px solid #ef4444; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #dc2626; display: flex; align-items: center;">🚨 重要な原則</h3>
<p style="margin: 0; font-weight: 700; color: #dc2626; font-size: 1.1em;">"Not your keys, not your crypto"</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">あなたの鍵でなければ、あなたの暗号通貨ではない</p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">鍵の生成プロセス（技術詳解）</h2>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <div style="display: flex; flex-direction: column; gap: 1.5rem;">
    
    <div style="display: flex; align-items: center; gap: 1rem;">
      <div style="background: #ef4444; color: white; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2em; flex-shrink: 0;">1</div>
      <div style="flex: 1;">
        <h4 style="margin: 0 0 0.5rem 0; color: #dc2626;">乱数生成</h4>
        <p style="margin: 0; color: #374151;">256ビット（32バイト）の安全な乱数を生成 → 秘密鍵</p>
        <code style="background: #f3f4f6; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.85em;">2^256 = 約10^77通りの組み合わせ</code>
      </div>
    </div>
    
    <div style="border-left: 3px solid #d1d5db; margin-left: 25px; padding-left: 2rem;">
      <div style="color: #6b7280;">↓</div>
    </div>
    
    <div style="display: flex; align-items: center; gap: 1rem;">
      <div style="background: #3b82f6; color: white; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2em; flex-shrink: 0;">2</div>
      <div style="flex: 1;">
        <h4 style="margin: 0 0 0.5rem 0; color: #2563eb;">楕円曲線暗号計算</h4>
        <p style="margin: 0; color: #374151;">secp256k1曲線で秘密鍵から公開鍵を生成</p>
        <code style="background: #f3f4f6; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.85em;">公開鍵 = 秘密鍵 × G（ジェネレータポイント）</code>
      </div>
    </div>
    
    <div style="border-left: 3px solid #d1d5db; margin-left: 25px; padding-left: 2rem;">
      <div style="color: #6b7280;">↓</div>
    </div>
    
    <div style="display: flex; align-items: center; gap: 1rem;">
      <div style="background: #16a34a; color: white; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2em; flex-shrink: 0;">3</div>
      <div style="flex: 1;">
        <h4 style="margin: 0 0 0.5rem 0; color: #16a34a;">アドレス生成</h4>
        <p style="margin: 0; color: #374151;">ハッシュ関数（SHA-256、RIPEMD-160）でウォレットアドレス作成</p>
        <code style="background: #f3f4f6; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.85em;">アドレス = Hash160(公開鍵) + チェックサム</code>
      </div>
    </div>
    
  </div>
</div>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #d97706; display: flex; align-items: center;">🔢 数学的安全性</h3>
<p style="margin: 0; font-weight: 500; color: #d97706;">量子コンピュータ時代への備え</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">現在の楕円曲線暗号は、最新のスーパーコンピュータでも解読に宇宙の年齢より長い時間が必要です。ただし、将来の量子コンピュータに備えた新しい暗号技術の研究も進んでいます。</p>
</div>
        `
      },
      {
        id: 'section-3',
        title: '鍵の形式と表現方法',
        orderIndex: 3,
        type: 'text',
        content: `
<p>秘密鍵は用途に応じて様々な形式で表現されます。<br/>
各形式の特徴を理解して、適切な管理方法を選択しましょう。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">秘密鍵の3つの主要表現形式</h2>

<div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin: 2rem 0;">
  
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #fbbf24; color: #92400e; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.9em;">1</span>
      16進数形式（Hex）
    </h3>
    <p style="margin: 0 0 1rem 0; line-height: 1.6;">最も基本的な形式。64文字の16進数文字列</p>
    <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; font-family: monospace; font-size: 0.8em; word-break: break-all;">
      E9873D79C6D87DC0FB6A5778633389F4453213303DA61F20BD67FC233AA33262
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #fbbf24; color: #92400e; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.9em;">2</span>
      WIF（Wallet Import Format）
    </h3>
    <p style="margin: 0 0 1rem 0; line-height: 1.6;">ウォレット間での秘密鍵インポート用。チェックサム付き</p>
    <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; font-family: monospace; font-size: 0.8em; word-break: break-all;">
      5Kb8kLf9zgWQnogidDA76MzPL6TsZZY36hWXMssSzNydYXYB9KF
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #fbbf24; color: #92400e; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.9em;">3</span>
      ニーモニックフレーズ（BIP39）
    </h3>
    <p style="margin: 0 0 1rem 0; line-height: 1.6;">人間が記憶・管理しやすい12-24の英単語</p>
    <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; font-family: monospace; font-size: 0.8em; line-height: 1.5;">
      abandon ability able about above absent<br/>
      absorb abstract absurd abuse access accident
    </div>
  </div>
  
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年の主要アドレス形式</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white;">
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">通貨</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">アドレス形式</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">プレフィックス</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">特徴</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">Bitcoin</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">Legacy</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">1...</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">最初期形式、高手数料</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">Bitcoin</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">SegWit</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #d97706;">3...</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">中程度手数料</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">Bitcoin</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">Bech32</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">bc1...</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">最低手数料、推奨</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">Ethereum</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">標準</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #7c3aed;">0x...</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">42文字、全て小文字</td>
</tr>
</tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">実際のアドレス例（2025年最新）</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin: 2rem 0;">
  <div style="background: #fee2e2; border: 2px solid #ef4444; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #dc2626; margin: 0 0 1rem 0; text-align: center;">₿ Bitcoin（Bech32）</h3>
    <div style="background: #fca5a5; padding: 1rem; border-radius: 8px; margin: 1rem 0; font-family: monospace; font-size: 0.8em; word-break: break-all; text-align: center;">
      bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
    </div>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151; font-size: 0.9em;">
      <li>最新形式（2025年推奨）</li>
      <li>取引手数料最安</li>
      <li>エラー検出機能付き</li>
    </ul>
  </div>
  
  <div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #16a34a; margin: 0 0 1rem 0; text-align: center;">Ξ Ethereum</h3>
    <div style="background: #86efac; padding: 1rem; border-radius: 8px; margin: 1rem 0; font-family: monospace; font-size: 0.8em; word-break: break-all; text-align: center;">
      0x742d35Cc6604C532532C3C435028C95D33FE2B6F
    </div>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151; font-size: 0.9em;">
      <li>42文字の16進数</li>
      <li>大文字小文字で追加チェック</li>
      <li>スマートコントラクト対応</li>
    </ul>
  </div>
</div>

<div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ニーモニックフレーズの利点</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">BIP39標準による革新</p>
<ul style="margin: 0.5rem 0 0 1.5rem; color: #374151;">
  <li><strong>人間が記憶可能：</strong> 英単語なので覚えやすい</li>
  <li><strong>複数通貨対応：</strong> 1つのフレーズで複数の暗号通貨を管理</li>
  <li><strong>復元可能：</strong> ウォレット破損時も完全復元可能</li>
  <li><strong>国際標準：</strong> 異なるウォレット間で互換性</li>
</ul>
</div>
        `
      },
      {
        id: 'section-4',
        title: '安全な鍵管理のベストプラクティス',
        orderIndex: 4,
        type: 'text',
        content: `
<p>秘密鍵の管理は、暗号通貨投資における最重要課題です。<br/>
2025年現在、ハッキング被害の80%が不適切な鍵管理に起因しています。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">4つの鉄則（絶対に守るべき原則）</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; border-radius: 12px; padding: 1.5rem; position: relative;">
    <div style="position: absolute; top: -10px; right: -10px; background: #fbbf24; color: #92400e; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</div>
    <h3 style="color: #ffffff; margin: 0 0 1rem 0;">🚫 絶対に共有しない</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">家族・友人・サポートを含め誰にも教えない。正当なサポートが秘密鍵を聞くことは絶対にない</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; border-radius: 12px; padding: 1.5rem; position: relative;">
    <div style="position: absolute; top: -10px; right: -10px; background: #fbbf24; color: #92400e; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</div>
    <h3 style="color: #ffffff; margin: 0 0 1rem 0;">🔒 オフライン保管</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">インターネットに接続していない環境で保管。ハッキングリスクを完全に排除</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; border-radius: 12px; padding: 1.5rem; position: relative;">
    <div style="position: absolute; top: -10px; right: -10px; background: #fbbf24; color: #92400e; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold;">3</div>
    <h3 style="color: #ffffff; margin: 0 0 1rem 0;">💾 複数バックアップ</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">3箇所以上の物理的に離れた場所で保管。火災・地震・盗難に備える</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); color: white; border-radius: 12px; padding: 1.5rem; position: relative;">
    <div style="position: absolute; top: -10px; right: -10px; background: #fbbf24; color: #92400e; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold;">4</div>
    <h3 style="color: #ffffff; margin: 0 0 1rem 0;">🧪 定期テスト</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">少額で復元テスト実施。緊急時に確実にアクセスできることを確認</p>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">推奨保存方法（セキュリティレベル別）</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white;">
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">方法</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">セキュリティ</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">利便性</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">コスト</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">推奨度</th>
</tr>
</thead>
<tbody>
<tr style="background: #dcfce7;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">ハードウェアウォレット</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #16a34a;">★★★★★</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #16a34a;">★★★★☆</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">$50-200</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #16a34a; font-weight: bold;">最高</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">メタル製バックアップ</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #16a34a;">★★★★★</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">★★☆☆☆</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">$30-100</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #16a34a; font-weight: bold;">高</td>
</tr>
<tr style="background: #fef3c7;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">ペーパーウォレット</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">★★★☆☆</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">★★☆☆☆</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">無料</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">中</td>
</tr>
<tr style="background: #fee2e2;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">スマホ・PC保存</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #ef4444;">★★☆☆☆</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #16a34a;">★★★★★</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">無料</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #ef4444;">低</td>
</tr>
<tr style="background: #fef2f2;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">クラウド保存</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #ef4444;">★☆☆☆☆</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #16a34a;">★★★★★</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">無料-$10/月</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #ef4444; font-weight: bold;">非推奨</td>
</tr>
</tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年の最新セキュリティ脅威</h2>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem;">
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #fef2f2; border-radius: 8px; border-left: 4px solid #ef4444;">
      <div style="background: #ef4444; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">🎯</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #dc2626;">AI生成フィッシング</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">ChatGPTなどAIで作られた非常に精巧な偽サイト・偽メール。URLを必ず確認</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
      <div style="background: #f59e0b; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">📱</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #d97706;">SIMスワップ攻撃</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">電話番号を乗っ取り2FAを突破。SMS認証より認証アプリを使用</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
      <div style="background: #3b82f6; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">🦠</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #2563eb;">高度マルウェア</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">クリップボード監視、キーロガー、画面キャプチャ。定期的なセキュリティスキャン必須</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #fdf4ff; border-radius: 8px; border-left: 4px solid #a855f7;">
      <div style="background: #a855f7; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">🧠</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #9333ea;">ソーシャルエンジニアリング</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">偽のカスタマーサポート、投資詐欺、恋愛詐欺。「急いで」は詐欺のサイン</p>
      </div>
    </div>
    
  </div>
</div>

<div style="background: #fee2e2; border-left: 4px solid #ef4444; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #dc2626; display: flex; align-items: center;">⚠️ 絶対にやってはいけないこと</h3>
<ul style="margin: 0.5rem 0 0 1.5rem; color: #374151;">
  <li><strong>スクリーンショット保存：</strong> クラウド同期・ハッキングリスク</li>
  <li><strong>メール・メッセージ送信：</strong> 通信が盗聴される可能性</li>
  <li><strong>音声入力：</strong> 録音・盗聴される危険性</li>
  <li><strong>公共Wi-Fi使用：</strong> 中間者攻撃の危険性</li>
  <li><strong>ブラウザ保存：</strong> ハッキング・マルウェアリスク</li>
</ul>
</div>

<div style="background: #dcfce7; border-left: 4px solid #16a34a; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #16a34a; display: flex; align-items: center;">✅ 推奨セキュリティ対策チェックリスト</h3>
<ul style="margin: 0.5rem 0 0 1.5rem; color: #374151;">
  <li><strong>ハードウェアウォレット使用</strong> （Ledger、Trezor等）</li>
  <li><strong>認証アプリでの2FA</strong> （Google Authenticator、Authy）</li>
  <li><strong>定期的なセキュリティ監査</strong> （月1回の脆弱性チェック）</li>
  <li><strong>複数箇所でのバックアップ</strong> （物理的に離れた場所）</li>
  <li><strong>定期的な復元テスト</strong> （少額での動作確認）</li>
</ul>
</div>
        `
      }
    ],
    keyPoints: [
      '秘密鍵は暗号通貨資産への完全なアクセス権を意味し、最重要データ',
      '公開鍵は秘密鍵から生成されるが、逆は数学的に不可能な一方向関数',
      '「Not your keys, not your crypto」が暗号通貨の基本原則',
      'ニーモニックフレーズは12-24単語で秘密鍵を人間が管理しやすい形式で表現',
      'ハードウェアウォレットとオフライン保管が最も安全な管理方法',
      '2025年現在、AI生成フィッシングやSIMスワップ等の新しい脅威に注意が必要'
    ],
    summary: '公開鍵暗号システムは暗号通貨のセキュリティの基盤となる技術です。秘密鍵が資産への完全なコントロール権を持つため、その安全な管理が極めて重要です。2025年現在、ハードウェアウォレットの使用、複数箇所でのオフラインバックアップ、AI生成フィッシング等の新しい脅威への対策が必須となっています。適切なセキュリティ対策により、長期的に安全に資産を保護できます。',
    practicalExamples: [
      'サトシ・ナカモトのビットコインアドレス: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa（ジェネシスブロック取引、現在も使用可能）',
      'イーサリアム創設者Vitalik Buterinの公開アドレス: 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      'James Howells氏の悲劇: 7,500BTC（2025年8月価値で約$849M）をハードドライブ廃棄で永久紛失',
      '2025年最新統計: 全ビットコインの約20%（400万BTC）が秘密鍵紛失により永久にアクセス不可',
      'Mt.Gox事件の教訓: 取引所破綻により85万BTC紛失、「Not your keys, not your crypto」の重要性を証明',
      'Ledger Nano X: 2025年最も普及しているハードウェアウォレット、2,000万台以上出荷'
    ],
    warningNotes: [
      '秘密鍵を紛失すると資産を永久に失う（技術的に復旧不可能）',
      '秘密鍵が第三者に知られると資産が瞬時に盗まれる',
      '2025年急増中のAI生成フィッシングサイトで秘密鍵を入力する危険',
      'SIMスワップ攻撃によるSMS 2FA突破事例が急増中',
      'クラウドストレージに暗号化せずに保存すると大量流出の危険',
      'ソーシャルエンジニアリング攻撃で「緊急性」を演出する詐欺手法に注意',
      '量子コンピュータの実用化により現在の暗号技術が将来無効化される可能性',
      'ハードウェアウォレットでも物理的盗難・破損・ファームウェア脆弱性に注意'
    ]
  },
  quiz: [
    {
      id: 'crypto-basics-5-q1',
      question: '「Not your keys, not your crypto」の本当の意味と、2025年でも重要である理由は何ですか？',
      options: [
        '鍵を持たないと暗号通貨を購入できない',
        '秘密鍵を自分で管理していないと真の所有者ではない',
        '公開鍵がないと取引に参加できない',
        '物理的な鍵がないと暗号通貨ウォレットが開けない'
      ],
      correctAnswer: 1,
      explanation: '秘密鍵を自分で管理していない限り、その暗号通貨の真の所有者とは言えません。取引所等に預けている場合、実質的にはその企業が管理しており、破綻・ハッキング・規制により資産を失うリスクがあります。2025年でもこの原則は変わらず、多くの取引所ハッキング事例が発生しています。'
    },
    {
      id: 'crypto-basics-5-q2',
      question: '公開鍵と秘密鍵の数学的関係で正しいものはどれですか？',
      options: [
        '公開鍵から秘密鍵を計算できる双方向の関係',
        '秘密鍵から公開鍵を生成できるが、逆は計算上不可能',
        '両方とも毎回ランダムに生成される独立した値',
        '公開鍵と秘密鍵は常に同じ値で表現される'
      ],
      correctAnswer: 1,
      explanation: '楕円曲線暗号（ECC）の一方向関数により、秘密鍵から公開鍵は数学的に生成できますが、公開鍵から秘密鍵を逆算することは現在のコンピュータ技術では実質的に不可能です。この非可逆性が暗号通貨のセキュリティの基盤となっています。'
    },
    {
      id: 'crypto-basics-5-q3',
      question: '2025年現在、最も安全な秘密鍵の保存方法はどれですか？',
      options: [
        'Google Driveやクラウドストレージに暗号化して保存',
        'スマートフォンのメモアプリに保存',
        'ハードウェアウォレット + 複数箇所でのオフラインバックアップ',
        'メールで自分宛に送信して保存'
      ],
      correctAnswer: 2,
      explanation: 'ハードウェアウォレット（Ledger、Trezor等）は秘密鍵がデバイス内で生成・保管され、インターネットに晒されません。さらに複数箇所でのオフラインバックアップ（メタル製推奨）により、デバイス破損や紛失にも対応できます。2025年現在、これが最も安全な方法とされています。'
    },
    {
      id: 'crypto-basics-5-q4',
      question: 'ニーモニックフレーズ（BIP39）の特徴として正しいものはどれですか？',
      options: [
        '暗号通貨の種類ごとに異なるフレーズが必要',
        '12-24の英単語で秘密鍵を人間が管理しやすい形式で表現',
        '公開鍵と同じ内容を単語で表現したもの',
        '毎月変更する必要がある動的なパスワード'
      ],
      correctAnswer: 1,
      explanation: 'ニーモニックフレーズ（BIP39標準）は12-24個の英単語で構成され、人間が記憶・管理しやすい形式で秘密鍵を表現します。1つのフレーズから複数の暗号通貨の鍵を生成でき、異なるウォレット間でも互換性があります。順序と正確性が重要で、1単語でも間違うと資産にアクセスできません。'
    },
    {
      id: 'crypto-basics-5-q5',
      question: '2025年に急増している「AI生成フィッシング攻撃」の対策として最も有効なものは？',
      options: [
        'すべてのメールを信用しない',
        '公式URLを必ず確認し、ブックマークからアクセスする',
        'AIアンチウイルスソフトを使用する',
        'メールの内容が正しければ秘密鍵を入力してよい'
      ],
      correctAnswer: 1,
      explanation: '2025年現在、ChatGPT等のAIで作られた非常に精巧な偽サイト・偽メールが急増しています。最も有効な対策は、URLを必ず確認し、事前に保存したブックマークからのみアクセスすることです。どんなに本物そっくりでも、わずかなURL の違いで詐欺を見抜けます。'
    },
    {
      id: 'crypto-basics-5-q6',
      question: '秘密鍵を紛失した場合の結果として正しいものはどれですか？',
      options: [
        'サポートに連絡すれば復旧してもらえる',
        '政府機関が新しい鍵を発行してくれる',
        '資産に永久にアクセスできなくなる（技術的に復旧不可能）',
        '30日以内なら自動的に復旧される'
      ],
      correctAnswer: 2,
      explanation: '暗号通貨は分散型システムのため、中央管理者が存在せず、秘密鍵を紛失すると技術的に復旧不可能です。2025年現在、全ビットコインの約20%（400万BTC）が秘密鍵紛失により永久にアクセス不可となっています。これが適切なバックアップ戦略が極めて重要な理由です。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};