import type { Lesson } from '@/types';

export const lesson1: Lesson = {
  id: 'crypto-basics-1',
  categoryId: 'crypto-basics',
  title: 'What is Cryptocurrency? - 暗号通貨の基本概念',
  slug: 'what-is-cryptocurrency',
  description: '暗号通貨の基本概念、特徴、従来の通貨との違いを理解し、デジタル通貨革命の基盤を学びます。',
  difficultyLevel: 'beginner',
  estimatedMinutes: 20,
  orderIndex: 1,
  content: {
    sections: [
      {
        id: 'section-1',
        title: '暗号通貨とは何か',
        orderIndex: 1,
        type: 'text',
        content: `
<p>暗号通貨（Cryptocurrency）は、暗号技術を使用してセキュリティを確保し、取引を検証するデジタル通貨です。<br/>
2008年にビットコインが登場して以降、金融革命を起こし続けている画期的な技術です。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">暗号通貨の5つの革新的特徴</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🌐 分散型システム</h3>
    <p style="margin: 0; line-height: 1.6;">中央銀行や政府による管理を受けない、世界中のコンピューターで運営される分散型ネットワーク</p>
  </div>
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🔐 暗号技術</h3>
    <p style="margin: 0; line-height: 1.6;">高度な暗号技術でセキュリティを保護し、偽造や改ざんを防止</p>
  </div>
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🔍 完全透明性</h3>
    <p style="margin: 0; line-height: 1.6;">全取引がブロックチェーン上で記録・公開され、誰でも検証可能</p>
  </div>
  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">⏱️ 24時間稼働</h3>
    <p style="margin: 0; line-height: 1.6;">24時間365日、世界中で即座に取引可能</p>
  </div>
  <div style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🚫 検閲耐性</h3>
    <p style="margin: 0; line-height: 1.6;">政府や金融機関による取引の制限や凍結を受けない自由な価値移転</p>
  </div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 なぜ暗号通貨が生まれたのか？</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">2008年金融危機の教訓</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">銀行システムへの不信から、中央管理者に依存しない新しい通貨システムが求められました。</p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">暗号通貨市場の成長</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #667eea; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">年</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">市場規模</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">通貨数</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">主な出来事</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">2009</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">0円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">1</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">ビットコイン誕生</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">2015</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">約1兆円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">500</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">イーサリアム登場</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">2021</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">約300兆円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">10,000+</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">NFT・DeFiブーム</td>
</tr>
<tr style="background: #dcfce7; font-weight: bold;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">2025</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">約617兆円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">25,000+</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">BTC史上最高値・ETF拡大</td>
</tr>
</tbody>
</table>

<p style="font-size: 0.9em; color: #6b7280; margin: 0.5rem 0;">※市場規模は時価総額ベース</p>
        `
      },
      {
        id: 'section-2',
        title: '従来の通貨との違い',
        orderIndex: 2,
        type: 'text',
        content: `
<p>暗号通貨は従来の法定通貨とは根本的に異なる仕組みで動作します。<br/>
この違いを理解することが、暗号通貨の価値と可能性を理解する鍵となります。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">法定通貨 vs 暗号通貨 徹底比較</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white;">
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">特徴</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">🏛️ 法定通貨</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">₿ 暗号通貨</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">発行主体</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">中央銀行・政府</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">分散型ネットワーク</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">管理方法</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">中央集権型</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">分散型</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">取引時間</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">営業時間内のみ</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">24時間365日</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">国際送金</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">2-5営業日</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">数分〜1時間</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">送金手数料</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">13.4%（国際平均）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">2-5%</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">透明性</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">限定的</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">完全透明</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">インフレ耐性</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">低い</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">高い（有限供給）</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">検閲耐性</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">低い</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">高い</td>
</tr>
</tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">実例：国際送金の革命</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin: 2rem 0;">
  <div style="background: #fee2e2; border: 2px solid #ef4444; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #dc2626; margin: 0 0 1rem 0; text-align: center;">🏛️ 従来の銀行送金</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li>日本→アメリカ：10万円送金</li>
      <li><strong>手数料：</strong> 13,400円（13.4%平均）</li>
      <li><strong>時間：</strong> 1-3営業日</li>
      <li><strong>為替レート：</strong> 銀行の不利なレート</li>
      <li><strong>書類：</strong> 多数の手続き必要</li>
    </ul>
    <div style="background: #fca5a5; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
      <strong style="color: #991b1b;">総コスト：約13,400円（2025年平均）</strong>
    </div>
  </div>
  
  <div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #16a34a; margin: 0 0 1rem 0; text-align: center;">₿ 暗号通貨送金</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li>日本→アメリカ：10万円相当</li>
      <li><strong>手数料：</strong> 2,000-5,000円（2-5%）</li>
      <li><strong>時間：</strong> 数分〜数時間</li>
      <li><strong>為替レート：</strong> 市場の透明レート</li>
      <li><strong>書類：</strong> 不要</li>
    </ul>
    <div style="background: #86efac; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
      <strong style="color: #14532d;">総コスト：約3,500円（2025年平均）</strong>
    </div>
  </div>
</div>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #d97706; display: flex; align-items: center;">⚠️ 重要な注意点</h3>
<p style="margin: 0; font-weight: 500; color: #d97706;">価格変動リスク</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">暗号通貨は価格変動が激しく、送金中に価値が変わる可能性があります。少額での練習から始めましょう。</p>
</div>
        `
      },
      {
        id: 'section-3',
        title: '暗号通貨の仕組み',
        orderIndex: 3,
        type: 'text',
        content: `
<p>暗号通貨は革新的な技術の組み合わせによって動作します。<br/>
これらの技術を理解することで、なぜ暗号通貨が画期的なのかが分かります。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">4つの核心技術</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem; position: relative;">
    <div style="position: absolute; top: -10px; right: -10px; background: #fbbf24; color: #92400e; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</div>
    <h3 style="color: #ffffff; margin: 0 0 1rem 0;">🔗 ブロックチェーン</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">分散型台帳技術。全取引を暗号化してチェーン状に記録し、改ざん不可能にする</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem; position: relative;">
    <div style="position: absolute; top: -10px; right: -10px; background: #fbbf24; color: #92400e; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</div>
    <h3 style="color: #ffffff; margin: 0 0 1rem 0;">⛏️ マイニング/検証</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">ネットワーク参加者が計算競争で取引を検証し、新しいブロックを作成する</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem; position: relative;">
    <div style="position: absolute; top: -10px; right: -10px; background: #fbbf24; color: #92400e; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold;">3</div>
    <h3 style="color: #ffffff; margin: 0 0 1rem 0;">🔐 デジタル署名</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">公開鍵暗号技術で取引の正当性を証明し、本人確認を確実に行う</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 12px; padding: 1.5rem; position: relative;">
    <div style="position: absolute; top: -10px; right: -10px; background: #fbbf24; color: #92400e; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold;">4</div>
    <h3 style="color: #ffffff; margin: 0 0 1rem 0;">🤝 コンセンサス</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">ネットワーク全体が分散的に合意形成し、中央管理者なしで運営</p>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">暗号通貨が解決する5つの問題</h2>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem;">
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #fef2f2; border-radius: 8px; border-left: 4px solid #ef4444;">
      <div style="background: #ef4444; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">1</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #dc2626;">二重支払い問題</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">デジタル資産を同時に複数の場所で使用する問題を、ブロックチェーンで解決</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
      <div style="background: #f59e0b; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">2</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #d97706;">中央集権リスク</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">中央銀行や政府の政策による価値変動リスクを分散化で軽減</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
      <div style="background: #3b82f6; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">3</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #2563eb;">高額送金手数料</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">特に国際送金の高額な手数料を、P2Pネットワークで大幅削減</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #16a34a;">
      <div style="background: #16a34a; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">4</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #16a34a;">金融排除問題</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">銀行口座を持てない14億人に金融サービスへのアクセスを提供</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #fdf4ff; border-radius: 8px; border-left: 4px solid #a855f7;">
      <div style="background: #a855f7; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">5</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #9333ea;">インフレーション</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">法定通貨の価値減少に対し、供給量が決まっている暗号通貨で対抗</p>
      </div>
    </div>
    
  </div>
</div>

<div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">🔬 技術革新の意義</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">インターネット以来の革命</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">暗号通貨は「価値のインターネット」と呼ばれ、情報だけでなく価値そのものを瞬時に世界中に送信可能にしました。</p>
</div>
        `
      }
    ],
    keyPoints: [
      '暗号通貨は分散型ネットワークで運営される革新的なデジタル通貨システム',
      'ブロックチェーン技術により改ざん不可能で透明性の高い取引記録を実現',
      '24時間365日の即座な国際送金を低コストで可能にする',
      '中央管理者への依存を排除し、個人の金融主権を確立',
      '2008年金融危機を背景に、既存金融システムの課題解決を目指す',
      '14億人の金融排除された人々に金融サービスへのアクセスを提供'
    ],
    summary: '暗号通貨は、暗号技術とブロックチェーンを組み合わせた革命的な分散型デジタル通貨システムです。中央銀行や政府に依存せず、世界中のコンピューターネットワークで運営され、従来の金融システムの限界を技術的に突破しています。24時間365日の即座な価値転送、極低コストの国際送金、完全な透明性、検閲耐性を実現し、「価値のインターネット」として新たな経済圏を構築しています。',
    practicalExamples: [
      'ビットコイン（2009年〜）: 世界初の暗号通貨、デジタルゴールドとして機能',
      'イーサリアム（2015年〜）: スマートコントラクト機能を実装した革新的プラットフォーム',
      'ステーブルコイン: 米ドルに連動し価格安定を実現した実用的暗号通貨',
      'フィリピン出稼ぎ労働者: 暗号通貨で本国送金コスト90%削減を実現',
      'エルサルバドル: 2021-2025年1月まで法定通貨運用、現在は任意利用に変更（IMF融資条件）',
      'ナイジェリア: 銀行システム未発達地域で暗号通貨が主要決済手段に',
      'アルゼンチン: インフレ対策として市民がビットコインでの資産保全を実践',
      'ウクライナ紛争: 国際的な人道支援で暗号通貨が重要な役割を果たす'
    ],
    warningNotes: [
      '価格変動リスク: 1日で10-30%変動することがあり、投資は余剰資金で行う',
      '規制不確実性: 各国の規制方針変更により価値や利用可能性に影響',
      '秘密鍵管理: 紛失・盗難により資産へのアクセスが永久に不可能となる',
      '詐欺・偽プロジェクト: 投資詐欺、ポンジスキーム、偽取引所に注意',
      '技術的リスク: スマートコントラクトのバグ、ハッキング、フォーク分裂',
      '税務複雑性: 暗号通貨取引は雑所得として申告義務、計算が複雑',
      '環境負荷: ビットコインマイニングの高い電力消費が環境問題となる',
      '流動性リスク: 市場規模の小さい通貨は売買が困難になる可能性'
    ]
  },
  quiz: [
    {
      id: 'crypto-basics-1-q1',
      question: '2008年金融危機の教訓から生まれた暗号通貨の最も革新的な特徴は何ですか？',
      options: [
        '中央銀行による厳格な管理と価格統制',
        '分散型ネットワークによる中央管理者不要の運用',
        '政府が発行する物理的なデジタルコインの存在',
        '固定された価格で変動しない安定した価値'
      ],
      correctAnswer: 1,
      explanation: '暗号通貨の革命的特徴は分散型ネットワークです。2008年金融危機で露呈した中央管理システムの脆弱性を受け、中央管理者なしで信頼性の高い取引を実現する技術として開発されました。世界中のコンピューターがネットワークを維持し、単一障害点を排除しています。'
    },
    {
      id: 'crypto-basics-1-q2',
      question: '日本からアメリカに10万円を送金する場合、従来の銀行送金と暗号通貨送金の最大の違いは何ですか？',
      options: [
        '銀行：即座、暗号通貨：1週間かかる',
        '銀行：約13,400円コスト、暗号通貨：約3,500円コスト',
        '銀行：24時間対応、暗号通貨：営業時間のみ',
        '銀行：書類不要、暗号通貨：複雑な書類必要'
      ],
      correctAnswer: 1,
      explanation: '2025年の世界銀行データによると、従来の銀行送金は平均13.4%（10万円なら13,400円）のコストと1-3営業日が必要です。暗号通貨は2-5%（2,000-5,000円）で数分〜数時間で完了します。P2Pネットワークで仲介者を排除しているため、銀行より大幅に低コストを実現しています。'
    },
    {
      id: 'crypto-basics-1-q3',
      question: 'ブロックチェーン技術が解決する「二重支払い問題」とは何ですか？',
      options: [
        '同じお金を2回に分けて支払うこと',
        'デジタル資産を同時に複数の場所で使用してしまう問題',
        '支払いを2重に請求される問題',
        '2つの通貨を同時に使用する問題'
      ],
      correctAnswer: 1,
      explanation: '二重支払い問題は、デジタルデータの複製可能性により同じデジタル資産を複数の場所で同時に使用できてしまう問題です。ブロックチェーンは全取引を時系列で記録し、ネットワーク全体で検証することで、この問題を技術的に解決した画期的なシステムです。'
    },
    {
      id: 'crypto-basics-1-q4',
      question: '暗号通貨が世界の20億人の「金融排除」問題をどのように解決していますか？',
      options: [
        '銀行口座開設の手続きを簡素化している',
        'インターネット接続があれば銀行口座なしでも金融サービス利用可能',
        '政府が全国民に銀行口座を強制的に開設させている',
        '現金のみの取引を推奨している'
      ],
      correctAnswer: 1,
      explanation: '暗号通貨はインターネット接続とスマートフォンさえあれば、銀行口座、信用履歴、身分証明書なしでも金融サービスにアクセス可能です。世界銀行によると14億人が金融排除されており、特にアフリカ、東南アジア、南米の銀行システムが未発達な地域で、送金、貯蓄、決済などの金融サービスが利用できるようになっています。'
    },
    {
      id: 'crypto-basics-1-q5',
      question: '暗号通貨投資における最も重要なリスク管理原則は何ですか？',
      options: [
        '全資産を最も有名な暗号通貨に集中投資する',
        '秘密鍵の安全な管理と余剰資金での投資',
        '価格が下がったら即座に全て売却する',
        '政府の推奨する暗号通貨のみに投資する'
      ],
      correctAnswer: 1,
      explanation: '暗号通貨では「Not your keys, not your coins」（秘密鍵を持たなければあなたのコインではない）が鉄則です。秘密鍵を紛失すると資産に永久にアクセス不可となります。また、価格変動が激しいため、失っても生活に支障のない余剰資金での投資が必須です。'
    },
    {
      id: 'crypto-basics-1-q6',
      question: '暗号通貨が「価値のインターネット」と呼ばれる理由は何ですか？',
      options: [
        'インターネット上でのみ価値を持つから',
        '情報だけでなく価値そのものを瞬時に世界中に送信できるから',
        'インターネット料金の支払いにのみ使用できるから',
        'インターネット企業が発行しているから'
      ],
      correctAnswer: 1,
      explanation: 'インターネットが情報の送信を革命化したように、暗号通貨は価値（お金）の送信を革命化しました。メールを送るように、24時間365日、国境を越えて即座に価値を転送できるため「価値のインターネット」と呼ばれています。これにより新たなデジタル経済圏が形成されています。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};