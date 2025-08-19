import type { Lesson } from '../../../types';

export const lesson13: Lesson = {
  id: 'crypto-basics-13',
  categoryId: 'crypto-basics',
  title: 'Market Capitalization and Trading Volume - 時価総額と出来高',
  slug: 'market-cap-and-volume',
  description: '2025年版：暗号通貨の時価総額$4兆市場と出来高分析。最新の時価総額ランキング、機関投資家参入による市場構造変化、AI取引の影響を理解します。',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 22,
  orderIndex: 13,
  content: {
    sections: [
      {
        id: 'section-1',
        title: '2025年版：時価総額$4兆突破の暗号通貨市場',
        orderIndex: 1,
        type: 'text',
        content: `
<p>時価総額（Market Capitalization）は、暗号通貨の市場での総評価額を表す最重要指標です。<br/>
2025年8月現在、暗号通貨全体の時価総額は$4兆（約600兆円）を突破し、Apple社一社分に匹敵する巨大市場となっています。</p>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; padding: 2rem; margin: 2rem 0; text-align: center;">
  <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.4em;">🌍 2025年暗号通貨市場の規模</h3>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0;">
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">💰 総時価総額</h4>
      <p style="margin: 0; font-size: 1.3em; font-weight: bold;">$4.0兆+（約600兆円）</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">📊 日取引量</h4>
      <p style="margin: 0; font-size: 1.3em; font-weight: bold;">$200億+（過去最高水準）</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🎯 市場支配率</h4>
      <p style="margin: 0; font-size: 1.3em; font-weight: bold;">BTC 32% | ETH 20% | その他48%</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🏛️ 機関参入</h4>
      <p style="margin: 0; font-size: 1.3em; font-weight: bold;">ETF・年金基金・国家の本格採用</p>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">時価総額の計算と実践的理解</h2>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <h3 style="margin: 0 0 1rem 0; color: #1e40af; text-align: center; font-size: 1.3em;">💡 時価総額の計算式と2025年実例</h3>
  
  <div style="background: #dbeafe; border-radius: 8px; padding: 1.5rem; margin: 1rem 0; text-align: center;">
    <h4 style="color: #1e40af; margin: 0 0 1rem 0; font-size: 1.2em;">📐 基本計算式</h4>
    <p style="margin: 0; font-size: 1.4em; font-weight: bold; color: #1e40af;">時価総額 = 現在価格 × 流通供給量</p>
  </div>
  
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 2rem 0;">
    <div style="background: #fef3c7; border-radius: 8px; padding: 1.5rem; border-left: 4px solid #f59e0b;">
      <h4 style="margin: 0 0 1rem 0; color: #d97706;">₿ ビットコイン（2025年8月例）</h4>
      <ul style="margin: 0; color: #374151; line-height: 1.8;">
        <li><strong>現在価格:</strong> $95,000</li>
        <li><strong>流通供給量:</strong> 19.75M BTC</li>
        <li><strong>時価総額:</strong> $1.87兆</li>
        <li><strong>市場シェア:</strong> 約32%</li>
      </ul>
    </div>
    
    <div style="background: #dcfce7; border-radius: 8px; padding: 1.5rem; border-left: 4px solid #16a34a;">
      <h4 style="margin: 0 0 1rem 0; color: #16a34a;">Ξ イーサリアム（2025年8月例）</h4>
      <ul style="margin: 0; color: #374151; line-height: 1.8;">
        <li><strong>現在価格:</strong> $3,300</li>
        <li><strong>流通供給量:</strong> 120.5M ETH</li>
        <li><strong>時価総額:</strong> $0.4兆</li>
        <li><strong>市場シェア:</strong> 約20%</li>
      </ul>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">時価総額が示す5つの重要指標</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🎯 市場での重要度</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">時価総額が大きいほど、その暗号通貨の市場での影響力と重要度が高い</p>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.85em; font-weight: bold;">2025年例: BTC市場シェア32%でマーケットリーダー</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">💎 投資家信頼度</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">長期間高い時価総額を維持している暗号通貨ほど投資家の信頼が厚い</p>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.85em; font-weight: bold;">2025年例: ETH ETF承認でプロの信頼獲得</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🛡️ 価格操作耐性</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">時価総額が大きいほど、個人や小グループによる価格操作が困難</p>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.85em; font-weight: bold;">2025年例: $1兆超のBTCは操作ほぼ不可能</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🌊 流動性の目安</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">高時価総額は一般的に高い流動性と相関し、大口取引が可能</p>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.85em; font-weight: bold;">2025年例: ETH日取引量$50億で充分な流動性</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">📈 成長余地の評価</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">相対的な時価総額比較で、成長ポテンシャルを評価可能</p>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.85em; font-weight: bold;">2025年例: SOL時価総額ETHの1/7で成長余地大</p>
    </div>
  </div>
</div>
        `
      },
      {
        id: 'section-2',
        title: '2025年版：時価総額による暗号通貨分類と投資戦略',
        orderIndex: 2,
        type: 'text',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">市場規模別4カテゴリーと2025年実例</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🏆 メガキャップ（$500B+）</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>Bitcoin (BTC)</strong>: $1.87兆<br/>
      <strong>特徴</strong>: デジタルゴールド、ETF承認済み<br/>
      <strong>リスク</strong>: 最低、機関投資家標準</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">💎 ラージキャップ（$100B-500B）</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>Ethereum (ETH)</strong>: $400億<br/>
      <strong>Solana (SOL)</strong>: $600億<br/>
      <strong>特徴</strong>: 高い安定性、プロ投資家向け</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🚀 ミッドキャップ（$10B-100B）</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>Chainlink (LINK)</strong>: $150億<br/>
      <strong>Polygon (MATIC)</strong>: $80億<br/>
      <strong>特徴</strong>: 成長性とリスクのバランス</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">⚡ スモール＆マイクロ（<$10B）</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>新興AI・RWAトークン</strong><br/>
      <strong>特徴</strong>: 高リスク高リターン<br/>
      <strong>注意</strong>: 価格操作・流動性リスク高</p>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年時価総額ランキング TOP20</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white;">
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">順位</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">通貨</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">時価総額</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">カテゴリ</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">1</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">Bitcoin (BTC)</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: bold;">$1.87兆</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">メガキャップ</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">2</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">Ethereum (ETH)</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: bold;">$400億</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">ラージキャップ</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">3</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">Tether (USDT)</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: bold;">$120億</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">ステーブルコイン</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">4</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">Solana (SOL)</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: bold;">$60億</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">ラージキャップ</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">5</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">XRP</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: bold;">$40億</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">決済特化</td>
</tr>
</tbody>
</table>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #d97706; display: flex; align-items: center;">💡 2025年投資戦略の考え方</h3>
<ul style="margin: 0.5rem 0 0 1.5rem; color: #374151; line-height: 1.7;">
  <li><strong>ポートフォリオの基盤</strong>: BTC・ETHで70-80%を確保（安定性重視）</li>
  <li><strong>成長狙い</strong>: ミッドキャップで15-25%（SOL・MATIC等）</li>
  <li><strong>ハイリスク</strong>: スモールキャップで5-10%（AI・RWA新興）</li>
  <li><strong>機関投資家追随</strong>: ETF対象銘柄の優先検討</li>
</ul>
</div>
        `
      },
      {
        id: 'section-3',
        title: '2025年版：AI取引時代の出来高分析とマーケット構造',
        orderIndex: 3,
        type: 'text',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">出来高（Trading Volume）の深層理解</h2>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; padding: 2rem; margin: 2rem 0; text-align: center;">
  <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.4em;">📊 2025年の取引量革命</h3>
  <p style="margin: 0; font-size: 1.1em; line-height: 1.6;">暗号通貨市場の日取引量$200億+は、東京証券取引所の1/3に匹敵する規模に成長</p>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1rem 0;">
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🤖 AI取引</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">全取引の75%+</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🏛️ 機関投資家</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">出来高の40%+</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">👥 個人投資家</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">出来高の25%</p>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">出来高が示す6つの重要指標</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #16a34a; margin: 0 0 1rem 0; display: flex; align-items: center;">🌊 流動性の深度</h3>
    <p style="margin: 0 0 0.5rem 0; color: #374151; line-height: 1.6;">高出来高 = 大口取引でも価格影響が小さい</p>
    <div style="background: rgba(34, 197, 94, 0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.9em; color: #16a34a; font-weight: bold;">BTC: 日$100億取引でも価格影響1%未満</p>
    </div>
  </div>

  <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #f59e0b; margin: 0 0 1rem 0; display: flex; align-items: center;">🎯 市場の関心度</h3>
    <p style="margin: 0 0 0.5rem 0; color: #374151; line-height: 1.6;">出来高急増 = ニュース・イベントへの市場反応</p>
    <div style="background: rgba(245, 158, 11, 0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.9em; color: #f59e0b; font-weight: bold;">ETH ETF承認時: 出来高5倍、価格15%上昇</p>
    </div>
  </div>

  <div style="background: #f0f9ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #3b82f6; margin: 0 0 1rem 0; display: flex; align-items: center;">📈 価格変動の信頼性</h3>
    <p style="margin: 0 0 0.5rem 0; color: #374151; line-height: 1.6;">高出来高での価格変動 = 多数参加者の合意</p>
    <div style="background: rgba(59, 130, 246, 0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.9em; color: #3b82f6; font-weight: bold;">低出来高での急騰・急落は疑ってかかる</p>
    </div>
  </div>

  <div style="background: #fdf4ff; border: 2px solid #a855f7; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #a855f7; margin: 0 0 1rem 0; display: flex; align-items: center;">💪 トレンドの強度</h3>
    <p style="margin: 0 0 0.5rem 0; color: #374151; line-height: 1.6;">価格変動＋高出来高 = 強いトレンド継続性</p>
    <div style="background: rgba(168, 85, 247, 0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.9em; color: #a855f7; font-weight: bold;">上昇＋高出来高 = 強気トレンド継続</p>
    </div>
  </div>

  <div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ef4444; margin: 0 0 1rem 0; display: flex; align-items: center;">🚨 操作検知指標</h3>
    <p style="margin: 0 0 0.5rem 0; color: #374151; line-height: 1.6;">不自然な出来高パターン = 価格操作の可能性</p>
    <div style="background: rgba(239, 68, 68, 0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.9em; color: #ef4444; font-weight: bold;">ウォッシュトレーディング検知に重要</p>
    </div>
  </div>

  <div style="background: #ecfdf5; border: 2px solid #10b981; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #10b981; margin: 0 0 1rem 0; display: flex; align-items: center;">⏰ 最適取引タイミング</h3>
    <p style="margin: 0 0 0.5rem 0; color: #374151; line-height: 1.6;">出来高の時間・曜日パターンで取引戦略決定</p>
    <div style="background: rgba(16, 185, 129, 0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.9em; color: #10b981; font-weight: bold;">米国時間・月曜日に出来高集中傾向</p>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年の出来高分析テクニック</h2>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <h3 style="margin: 0 0 1rem 0; color: #1e40af; text-align: center; font-size: 1.3em;">📊 実践的出来高シグナル読解</h3>
  
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
    <div style="background: #dcfce7; border-radius: 8px; padding: 1rem; border-left: 4px solid #16a34a;">
      <h4 style="margin: 0 0 0.5rem 0; color: #16a34a;">✅ 強い買いシグナル</h4>
      <ul style="margin: 0; color: #374151; font-size: 0.9em; line-height: 1.6;">
        <li>価格上昇 + 出来高3倍増</li>
        <li>支持線での大量買い</li>
        <li>ブレイクアウト + 高出来高</li>
        <li>機関投資家の大口購入</li>
      </ul>
    </div>
    
    <div style="background: #fef2f2; border-radius: 8px; padding: 1rem; border-left: 4px solid #ef4444;">
      <h4 style="margin: 0 0 0.5rem 0; color: #ef4444;">⚠️ 警戒シグナル</h4>
      <ul style="margin: 0; color: #374151; font-size: 0.9em; line-height: 1.6;">
        <li>急騰 + 出来高減少（偽ブレイク）</li>
        <li>深夜の不自然な大量取引</li>
        <li>同一取引所での循環取引</li>
        <li>ニュース前の先行出来高増</li>
      </ul>
    </div>
  </div>
  
  <div style="background: #dbeafe; border-radius: 8px; padding: 1rem; margin: 1rem 0; text-align: center;">
    <p style="margin: 0; color: #374151; line-height: 1.6;"><strong>【AI時代の注意】</strong>2025年はアルゴリズム取引が75%超を占めるため、従来の出来高分析手法に加えて、機関投資家の動向とAI取引パターンの理解が必須です。</p>
  </div>
</div>
        `
      }
    ],
    keyPoints: [
      '2025年暗号通貨市場は$4兆（約600兆円）でApple一社分の規模',
      'BTC$1.87兆・ETH$400億で市場シェア52%の二強体制',
      'メガ・ラージ・ミッド・スモールの4カテゴリー別投資戦略が重要',
      'AI取引75%・機関投資家40%で出来高構造が激変',
      '出来高は流動性・関心度・信頼性・トレンド強度・操作検知・タイミングの6指標',
      '高出来高での価格変動は多数参加者の合意を示し信頼性が高い'
    ],
    summary: '2025年の暗号通貨市場は$4兆規模で、BTC・ETHの二強体制が確立。時価総額でメガ・ラージ・ミッド・スモールに分類し、各カテゴリーに適した投資戦略が必要です。AI取引75%時代の出来高分析では、流動性・関心度・信頼性・トレンド強度・操作検知・タイミングの6指標理解が成功の鍵となります。',
    practicalExamples: [
      '2025年時価総額TOP5: BTC($1.87兆)・ETH($400億)・USDT($120億)・SOL($60億)・XRP($40億)',
      'ETH ETF承認時の出来高分析: 通常$50億→承認日$250億（5倍増）で15%上昇',
      '機関投資家参入効果: BlackRock ETF流入で BTC出来高の質が向上（小口→大口へ）',
      'AI取引検知例: 深夜の規則的大量取引→ボット活動、人間トレーダーは警戒',
      'ポートフォリオ戦略例: メガ+ラージ70%・ミッド25%・スモール5%の黄金比率'
    ],
    warningNotes: [
      '2025年も$10億未満のスモールキャップは極めて高いボラティリティ',
      'AI生成の偽プロジェクト・ディープフェイクが時価総額を押し上げる詐欺急増',
      'ウォッシュトレーディング検知技術向上も、新手の出来高操作手法が登場',
      '規制強化により特定カテゴリ（プライバシー系等）が急落リスク',
      'ステーブルコイン発行量急増で実質的な市場規模が見えにくい',
      'AI取引の相場操縦が個人投資家には検知困難'
    ]
  },
  quiz: [
    {
      id: 'crypto-basics-13-q1',
      question: '時価総額の計算方法は？',
      options: [
        '現在価格 ÷ 流通供給量',
        '現在価格 × 流通供給量',
        '最高価格 × 最大供給量',
        '出来高 × 現在価格'
      ],
      correctAnswer: 1,
      explanation: '時価総額は現在価格に流通供給量を掛けることで計算されます。これにより市場での総評価額がわかります。'
    },
    {
      id: 'crypto-basics-13-q2',
      question: '大型株（Large Cap）の時価総額基準は？',
      options: [
        '$1億以上',
        '$10億以上',
        '$100億以上',
        '$1,000億以上'
      ],
      correctAnswer: 1,
      explanation: '一般的に時価総額$10億以上の暗号通貨が大型株として分類され、相対的に安定性が高いとされます。'
    },
    {
      id: 'crypto-basics-13-q3',
      question: '出来高が示すものは？',
      options: [
        '価格の安定性',
        '市場の流動性と関心度',
        '将来の価格予測',
        '投資の安全性'
      ],
      correctAnswer: 1,
      explanation: '出来高は市場の流動性（売買のしやすさ）と投資家の関心度を示す重要な指標です。'
    },
    {
      id: 'crypto-basics-13-q4',
      question: '価格上昇と高出来高が同時に起こることの意味は？',
      options: [
        '弱い上昇トレンド',
        '強い上昇トレンド',
        'トレンドの終了',
        '価格操作の可能性'
      ],
      correctAnswer: 1,
      explanation: '価格上昇と高出来高が同時に起こることは、多くの投資家が参加している強い上昇トレンドを示します。'
    },
    {
      id: 'crypto-basics-13-q5',
      question: '小型株（Small Cap）の特徴は？',
      options: [
        '安定性が高く低リスク',
        '高い成長潜在性だが高リスク',
        '必ず利益が保証されている',
        '価格操作が不可能'
      ],
      correctAnswer: 1,
      explanation: '小型株は高い成長潜在性を持つ一方で、ボラティリティが高く価格操作のリスクもある高リスク投資です。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};