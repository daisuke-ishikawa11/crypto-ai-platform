import type { Lesson } from '../../../types';

export const lesson17: Lesson = {
  id: 'crypto-basics-17',
  categoryId: 'crypto-basics',
  title: 'Introduction to DeFi - 分散型金融の基礎',
  slug: 'introduction-to-defi',
  description: '2025年版：$800億TVLのDeFi生態系完全ガイド。Uniswap V4・Aave V3・Layer2統合など最新プロトコルと実践的運用戦略',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 28,
  orderIndex: 17,
  content: {
    sections: [
      {
        id: 'section-1',
        title: '2025年のDeFiエコシステム概要',
        orderIndex: 1,
        type: 'text',
        content: `
<p>分散型金融（DeFi：Decentralized Finance）は、ブロックチェーン技術を基盤とした金融システムです。<br/>
2025年8月現在、$800億のTVL（Total Value Locked）と300万ユーザーを抱える巨大な金融インフラに成長しました。</p>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; padding: 2rem; margin: 2rem 0; text-align: center;">
  <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.4em;">🌍 2025年DeFi市場の現状</h3>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0;">
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">💰 総価値ロック</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">$800億+ (前年比+180%)</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">👥 アクティブユーザー</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">300万人+ (週間100万取引)</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🏭 プロトコル数</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">2,800+ (メインネット稼働)</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🌐 マルチチェーン</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">Ethereum(60%)・L2(25%)・Solana(15%)</p>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">DeFiの5つのコア原則</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🌐 非中央集権</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">銀行や政府などの中央管理者が存在しない</p>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.85em; font-weight: bold;">2025年例: 世界185ヵ国からアクセス可能</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🔓 オープンソース</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">プロトコルのコードが公開されている</p>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.85em; font-weight: bold;">GitHubで全コード検証・監査可能</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🔍 完全な透明性</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">全ての取引がブロックチェーン上で確認可能</p>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.85em; font-weight: bold;">リアルタイムで数兆ドルの取引監視</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🌍 24/7グローバル</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">地域や国境に関係なく年中無休で利用可能</p>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.85em; font-weight: bold;">銀行休業日でも金融サービス利用</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">⚙️ プログラマブル</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">スマートコントラクトによる高度な自動化</p>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.85em; font-weight: bold;">複雑な金融商品をコードで作成</p>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">2025年版：従来金融 vs DeFi 徹底比較</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white;">
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">特徴</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">🏦 従来の金融</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">🌐 DeFi</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">管理者</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">銀行・政府・金融機関</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">なし（スマートコントラクト）</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">アクセス条件</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">KYC・審査・クレジットスコア</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">ウォレットのみ（誰でも）</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">営業時間</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">平日昼間のみ（休日・夜間停止）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">24時間365日（年中無休）</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">手数料</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">2-5%（中間業者マージン）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">0.05-0.3%（ガス代+プロトコル料）</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">透明性</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">限定的（月次レポート）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">リアルタイム完全公開</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">新サービス開発</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">数年単位（規制批准必要）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">数週間（コードデプロイのみ）</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">2025年実績</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">平均年利0.1%（普通預金）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">3-15%（ステーブルコインファーミング）</td>
</tr>
</tbody>
</table>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <h3 style="margin: 0 0 1rem 0; color: #1e40af; text-align: center; font-size: 1.3em;">💡 2025年DeFiのメガトレンド</h3>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
    <div style="background: #f0f9ff; border-radius: 8px; padding: 1rem; border-left: 4px solid #3b82f6;">
      <h4 style="margin: 0 0 0.5rem 0; color: #1e40af;">🎆 機関参入加速</h4>
      <p style="margin: 0; color: #374151; font-size: 0.9em;">BlackRock・J.P.Morgan等が$100億+をDeFiプロトコルに配置</p>
    </div>
    <div style="background: #dcfce7; border-radius: 8px; padding: 1rem; border-left: 4px solid #16a34a;">
      <h4 style="margin: 0 0 0.5rem 0; color: #16a34a;">🚀 Layer2革命</h4>
      <p style="margin: 0; color: #374151; font-size: 0.9em;">ガス料$0.01で高速取引・Arbitrum・Optimism・Polygonが主流</p>
    </div>
  </div>
  <div style="background: #dbeafe; border-radius: 8px; padding: 1rem; margin: 1rem 0; text-align: center;">
    <p style="margin: 0; color: #374151; line-height: 1.6;">【重要】DeFiは単なる投機ではなく、金融システムの民主化と効率化を目指す技術革命です。</p>
  </div>
</div>
        `
      },
      {
        id: 'section-2',
        title: '2025年版：主要DeFiプロトコルの最新動向',
        orderIndex: 2,
        type: 'text',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🏆 2025年トップDEX（分散型取引所）ランキング</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🦄 Uniswap V4</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>TVL:</strong> $45億（DEX王者・シェア60%）<br/>
      <strong>日次取引量:</strong> $1-3億<br/>
      <strong>2025年新機能:</strong> カスタムフック・動的手数料</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🍣 SushiSwap</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>TVL:</strong> $3.5億（マルチチェーン展開）<br/>
      <strong>特徴:</strong> 13チェーン対応・Kashi貸付<br/>
      <strong>SUSHI価格:</strong> $2.5（2025年8月）</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">⚡ PancakeSwap V3</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>TVL:</strong> $15億（BSC最大・Ethereum進出）<br/>
      <strong>日次取引量:</strong> $5億+<br/>
      <strong>独自機能:</strong> 宝くじ・NFT・予測市場</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🌀 Curve V2</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>TVL:</strong> $25億（ステーブル特化）<br/>
      <strong>強み:</strong> 最小スリッページ・高効率<br/>
      <strong>2025年:</strong> RWAプール・LST特化戦略</p>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">🏦 2025年レンディング・プロトコル最新状況</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white;">
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">プロトコル</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">TVL</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">主要特徴</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">2025年新機能</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">🏛️ Aave V3</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">$180億</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">フラッシュローン・可変金利</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">クロスチェーン・GHO拡張</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">🧮 Compound V3</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">$25億</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">cToken・自動複利</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">単一借入資産設計</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">📘 MakerDAO</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">$80億</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">DAI発行・CDP</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">Spark Protocol統合</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">🌟 Morpho</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">$35億</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">P2P最適化</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">Blue・Yellow統合</td>
</tr>
</tbody>
</table>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; padding: 2rem; margin: 2rem 0; text-align: center;">
  <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.4em;">📊 2025年DeFiプロトコル収益ランキング</h3>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1rem 0;">
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🥇 Uniswap</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">年間手数料 $15億</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🥈 Aave</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">年間収益 $2.5億</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🥉 MakerDAO</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">年間収益 $2億</p>
    </div>
  </div>
</div>

<div style="background: #f0fdf4; border: 2px solid #16a34a; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
  <h3 style="color: #16a34a; margin: 0 0 1rem 0; text-align: center; font-size: 1.3em;">🌟 2025年DeFi革新プロトコル</h3>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
    <div style="background: white; border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #16a34a;">🌊 1inch V6</h4>
      <p style="margin: 0; font-size: 0.9em; color: #374151;">DEXアグリゲーター・最適ルーティング・Fusion技術で部分約定を実現</p>
    </div>
    <div style="background: white; border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #16a34a;">🏴‍☠️ Pendle V2</h4>
      <p style="margin: 0; font-size: 0.9em; color: #374151;">イールドトレーディング・利回りトークン化で複利投資戦略の多様化</p>
    </div>
  </div>
</div>
        `
      },
      {
        id: 'section-3',
        title: '2025年版：DeFi運用戦略と最新収益機会',
        orderIndex: 3,
        type: 'text',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🌾 2025年イールドファーミング完全ガイド</h2>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; padding: 2rem; margin: 2rem 0; text-align: center;">
  <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.4em;">💰 2025年8月イールドファーミングランキング</h3>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1rem 0;">
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🥇 高収益</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">15-45% APY</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9em;">AIトークン・新コイン</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🥈 中収益</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">5-15% APY</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9em;">ETHステーキング</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🥉 安定収益</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">1-5% APY</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9em;">ステーブルコイン</p>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">🔥 2025年最新イールドファーミング戦略</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🌟 Layer2ファーミング</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>Arbitrum:</strong> ARBステーキング 5-12% APY<br/>
      <strong>Optimism:</strong> OP流動性ファーミング 8-18%<br/>
      <strong>Polygon:</strong> MATICバリデーター 3-15%</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🤖 AIトークンファーミング</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>Bittensor (TAO):</strong> 15-25% ステーキング<br/>
      <strong>Fetch.ai (FET):</strong> 8-15% 流動性プール<br/>
      <strong>AGIX:</strong> 10-20% SingularityNETエコシステム</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🏠 RWAトークン投資</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>Ondo (ONDO):</strong> 米国債トークン 4-6%<br/>
      <strong>Centrifuge:</strong> 不動産担保 6-12%<br/>
      <strong>MakerDAO:</strong> PSM債券投資 3-8%</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">⚙️ イールドトレーディング</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>Pendle:</strong> LSTイールドトレーディング<br/>
      <strong>Element:</strong> 固定・変動金利分離<br/>
      <strong>Sense:</strong> ゼロクーポンボンド</p>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">📊 2025年レンディング・ボローイング戦略</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white;">
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">プラットフォーム</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">貸付APY</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">借入APR</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">特徴</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">Aave V3</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">USDC: 2.5%・ETH: 1.8%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">USDC: 3.2%・ETH: 2.1%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">クロスチェーン・GHO借入</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">Compound V3</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">USDC: 2.8%・WETH: 2.1%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">USDC: 3.5%・WETH: 2.4%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">単一資産プール</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">Morpho Blue</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">USDC: 3.1%・ETH: 2.3%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">USDC: 3.8%・ETH: 2.6%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">P2P最適化</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">Euler V2</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">USDC: 2.9%・ETH: 2.0%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">USDC: 3.6%・ETH: 2.3%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">リスク管理高度化</td>
</tr>
</tbody>
</table>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <h3 style="margin: 0 0 1rem 0; color: #1e40af; text-align: center; font-size: 1.3em;">💹 2025年高度なDeFi戦略例</h3>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;">
    <div style="background: #f0f9ff; border-radius: 8px; padding: 1rem; border-left: 4px solid #3b82f6;">
      <h4 style="margin: 0 0 0.5rem 0; color: #1e40af;">🔄 ループ戦略</h4>
      <p style="margin: 0; color: #374151; font-size: 0.9em;">①ETHをAaveに預入 ②aETHを担保にUSDC借入 ③USDCでETH購入 ④繰り返しでレバレッジ2-3倍</p>
    </div>
    <div style="background: #dcfce7; border-radius: 8px; padding: 1rem; border-left: 4px solid #16a34a;">
      <h4 style="margin: 0 0 0.5rem 0; color: #16a34a;">💰 キャリートレード</h4>
      <p style="margin: 0; color: #374151; font-size: 0.9em;">USDC(2.5%)を貸出し、DAI(3.5%)で借入。差額1%を無リスクで獲得し、スケールで利益増大</p>
    </div>
  </div>
  <div style="background: #dbeafe; border-radius: 8px; padding: 1rem; margin: 1rem 0; text-align: center;">
    <p style="margin: 0; color: #374151; line-height: 1.6;">【重要】高度な戦略は高リスクです。少額からテストし、リスク管理を徹底してください。</p>
  </div>
</div>
        `
      },
      {
        id: 'section-4',
        title: '2025年版：DeFiリスク管理とセキュリティ対策',
        orderIndex: 4,
        type: 'text',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">⚠️ 2025年DeFiセキュリテイ・インシデント統計</h2>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; padding: 2rem; margin: 2rem 0; text-align: center;">
  <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.4em;">📊 2025年8月までのハッキング被害統計</h3>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0;">
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">💰 総被害額</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">$8.5億 (前年比+180%)</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🔥 事件数</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">485件 (月平均60件)</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🏆 最大被害</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">Euler Finance $1.9億</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🔍 主要原因</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">フラッシュローン攻撃(40%)</p>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">📜 2025年DeFiリスクカテゴリー完全ガイド</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ef4444; margin: 0 0 1rem 0; display: flex; align-items: center;">🐛 スマートコントラクトリスク</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.6;">
      <li><strong>再入攻撃:</strong> フラッシュローン悪用(40%の被害)</li>
      <li><strong>コードバグ:</strong> 設計ミス・ロジックエラー</li>
      <li><strong>アップグレードリスク:</strong> プロキシ悪用</li>
      <li><strong>監査不備:</strong> コードレビューの不備</li>
    </ul>
    <div style="background: rgba(239, 68, 68, 0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.9em; color: #ef4444; font-weight: bold;">2025年事例: Euler($1.9億)・Bonq($1.2億)・dForce($3,600万)</p>
    </div>
  </div>

  <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #f59e0b; margin: 0 0 1rem 0; display: flex; align-items: center;">📊 無常損失(IL)リスク</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.6;">
      <li><strong>価格乖離:</strong> ペア価格の大幅変動</li>
      <li><strong>計算式:</strong> IL = 2√(a*b)/(a+b) - 1</li>
      <li><strong>高リスクペア:</strong> メムコイン/ETH等</li>
      <li><strong>低リスクペア:</strong> USDC/USDT等ステーブル</li>
    </ul>
    <div style="background: rgba(245, 158, 11, 0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.9em; color: #f59e0b; font-weight: bold;">2025年実例: PEPE/ETHペアで200%の無常損失発生</p>
    </div>
  </div>

  <div style="background: #f0f9ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #3b82f6; margin: 0 0 1rem 0; display: flex; align-items: center;">🌐 オラクル攻撃</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.6;">
      <li><strong>価格操作:</strong> DEX価格の人為的操作</li>
      <li><strong>フラッシュローン:</strong> 瞬時価格操作攻撃</li>
      <li><strong>サンドウィッチ攻撃:</strong> MEVで取引を囲む</li>
      <li><strong>オラクル停止:</strong> 価格フィードの中断</li>
    </ul>
    <div style="background: rgba(59, 130, 246, 0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.9em; color: #3b82f6; font-weight: bold;">2025年対策: Chainlink・UMA等分散オラクル採用</p>
    </div>
  </div>

  <div style="background: #fdf4ff; border: 2px solid #a855f7; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #a855f7; margin: 0 0 1rem 0; display: flex; align-items: center;">📜 ガバナンスリスク</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.6;">
      <li><strong>トークン集中:</strong> 大口保有者の支配力</li>
      <li><strong>提案操作:</strong> 悪意あるアップグレード</li>
      <li><strong>投票率低下:</strong> 一般ユーザーの無関心</li>
      <li><strong>Admin Key:</strong> マルチシグの不備</li>
    </ul>
    <div style="background: rgba(168, 85, 247, 0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.9em; color: #a855f7; font-weight: bold;">2025年改善: 委任投票・タイムロック機能導入</p>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">🛡️ 2025年DeFiセキュリティベストプラクティス</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🔍 プロトコル調査</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>監査状況:</strong> CertiK・Trail of Bits等の監査済み<br/>
      <strong>TVL闾値:</strong> $500万未満は要注意<br/>
      <strong>コード公開:</strong> GitHubでコードを確認</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">💰 資金管理戦略</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>ポートフォリオ割合:</strong> DeFiは全資産の10-20%<br/>
      <strong>プラットフォーム分散:</strong> 3-5プロトコルに分散<br/>
      <strong>ステーブルコイン比率:</strong> 50%以上を推奨</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">⚙️ テクニカル対策</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>スリッページ設定:</strong> 取引時に0.5-1%に設定<br/>
      <strong>ガス料金:</strong> 最高設定でMEV回避<br/>
      <strong>アプルーバル:</strong> 必要最小限に制限</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">📱 情報収集</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>コミュニティ:</strong> Discord・Telegramで情報収集<br/>
      <strong>産業メディア:</strong> The Block・DeFiLlama等<br/>
      <strong>アラート:</strong> Forta・PeckShieldでリアルタイム監視</p>
    </div>
  </div>
</div>

<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #dc2626; display: flex; align-items: center;">😨 2025年重大インシデントからの教訓</h3>
<ul style="margin: 0.5rem 0 0 1.5rem; color: #7f1d1d; line-height: 1.7;">
  <li><strong>Euler Finance($1.9億):</strong> ドネーション攻撃で貸出プールが空に</li>
  <li><strong>BonqDAO($1.2億):</strong> オラクル操作でAllianceBlock価格が操作された</li>
  <li><strong>Platypus($8,500万):</strong> フラッシュローンでUSPステーブルコインがデペッグ</li>
  <li><strong>教訓:</strong> 新しいプロトコルは数ヶ月の実績を見てから参入</li>
</ul>
</div>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <h3 style="margin: 0 0 1rem 0; color: #1e40af; text-align: center; font-size: 1.3em;">🎯 2025年DeFi安全運用の黄金ルール</h3>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;">
    <div style="background: #f0f9ff; border-radius: 8px; padding: 1rem; border-left: 4px solid #3b82f6;">
      <h4 style="margin: 0 0 0.5rem 0; color: #1e40af;">✓ 始める前</h4>
      <p style="margin: 0; color: #374151; font-size: 0.9em;">テストネットで練習・少額からスタート・監査されたDAppのみ使用</p>
    </div>
    <div style="background: #dcfce7; border-radius: 8px; padding: 1rem; border-left: 4px solid #16a34a;">
      <h4 style="margin: 0 0 0.5rem 0; color: #16a34a;">✓ 運用中</h4>
      <p style="margin: 0; color: #374151; font-size: 0.9em;">定期監視・利益確定・分散投資・リスク管理の徹底</p>
    </div>
  </div>
  <div style="background: #dbeafe; border-radius: 8px; padding: 1rem; margin: 1rem 0; text-align: center;">
    <p style="margin: 0; color: #374151; line-height: 1.6;">【絶対原則】理解できないプロトコルは使わない。高すぎるAPYは要注意。自分でリサーチできない金額は投資しない。</p>
  </div>
</div>
        `
      }
    ],
    keyPoints: [
      'DeFiは中央管理者なしで動作する分散型金融システム',
      '主要カテゴリはDEX、レンディング、ステーブルコイン、保険等',
      'イールドファーミングで従来より高い利回りが期待可能',
      'スマートコントラクトリスクや無常損失など特有のリスク存在',
      '24時間365日、世界中の誰でもアクセス可能な金融インフラ'
    ],
    summary: 'DeFiは分散型金融の略で、ブロックチェーン上に構築された金融システムです。中央管理者なしで貸付、交換、保険などの金融サービスを提供し、従来の金融システムより高い透明性とアクセシビリティを実現しています。高い収益機会がある一方で、技術的リスクや市場リスクも存在するため、十分な理解と適切なリスク管理が重要です。',
    practicalExamples: [
      'Uniswap V3: 日間取引量$1-2億、手数料APR 3-30%の流動性提供',
      'Compound: USDC貸付で年利2-8%、ETH担保で資金借入',
      'Curve 3pool: USDC/USDT/DAI で年利1-3%の安定収益',
      'MakerDAO: ETH担保でDAI借入、担保率150%以上維持'
    ],
    warningNotes: [
      'スマートコントラクトのバグで資金を失うリスクがある',
      '無常損失により流動性提供で損失を被る可能性',
      '高いAPYを謳うプロジェクトには詐欺が多い',
      'ガス料金（手数料）が高額になる場合がある',
      '規制変更により突然利用できなくなる可能性'
    ]
  },
  quiz: [
    {
      id: 'crypto-basics-17-q1',
      question: 'DeFiの最も重要な特徴は何ですか？',
      options: [
        '政府による強い管理',
        '中央管理者なしで動作する分散型システム',
        '取引手数料が完全に無料',
        '価格が常に安定している'
      ],
      correctAnswer: 1,
      explanation: 'DeFiの最も重要な特徴は、銀行や政府などの中央管理者なしで動作する分散型システムであることです。これにより透明性とアクセシビリティが向上します。'
    },
    {
      id: 'crypto-basics-17-q2',
      question: 'AMM（自動マーケットメイカー）の仕組みを採用しているDEXは？',
      options: [
        'Coinbase',
        'Binance',
        'Uniswap',
        'Kraken'
      ],
      correctAnswer: 2,
      explanation: 'UniswapはAMM（自動マーケットメイカー）モデルを採用した代表的な分散型取引所（DEX）です。流動性プールを活用して自動的に価格を決定します。'
    },
    {
      id: 'crypto-basics-17-q3',
      question: 'イールドファーミングで得られる収益の主な源泉は？',
      options: [
        '政府からの補助金',
        '取引手数料の分配と報酬トークン',
        '銀行利息',
        '株式の配当'
      ],
      correctAnswer: 1,
      explanation: 'イールドファーミングでは、主に取引手数料の分配と追加の報酬トークンによって収益を得ます。流動性を提供することでこれらの報酬を獲得できます。'
    },
    {
      id: 'crypto-basics-17-q4',
      question: '無常損失（Impermanent Loss）が発生する条件は？',
      options: [
        '流動性プールでトークン価格が変動した時',
        '取引手数料が高くなった時',
        'ガス料金が上昇した時',
        'ネットワークが混雑した時'
      ],
      correctAnswer: 0,
      explanation: '無常損失は流動性プールに預けたトークンペアの価格が変動した時に発生します。預けた時の価格比率から乖離するほど損失が大きくなります。'
    },
    {
      id: 'crypto-basics-17-q5',
      question: 'DeFiプロトコル利用時の主要なリスクでないものは？',
      options: [
        'スマートコントラクトのバグ',
        '無常損失',
        '中央銀行による金利変更',
        'オラクル攻撃'
      ],
      correctAnswer: 2,
      explanation: 'DeFiは分散型システムなので、中央銀行による金利変更の直接的な影響は受けません。主なリスクはスマートコントラクトのバグ、無常損失、オラクル攻撃などです。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};