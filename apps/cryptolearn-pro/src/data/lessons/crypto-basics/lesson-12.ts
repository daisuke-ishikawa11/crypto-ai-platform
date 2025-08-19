import type { Lesson } from '../../../types';

export const lesson12: Lesson = {
  id: 'crypto-basics-12',
  categoryId: 'crypto-basics',
  title: 'Understanding Altcoins - アルトコインの理解',
  slug: 'understanding-altcoins',
  description: 'ビットコイン以外の暗号通貨（アルトコイン）の特徴、種類、投資戦略を学び、多様化する暗号通貨市場を理解します。',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 18,
  orderIndex: 12,
  content: {
    sections: [
      {
        id: 'section-1',
        title: 'アルトコインとは',
        orderIndex: 1,
        type: 'text',
        content: `
<p>アルトコイン（Altcoin）は「Alternative Coin」の略で、ビットコイン以外の全ての暗号通貨を指します。<br/>
2025年8月現在、27,000種類以上が存在し、総時価総額は$1.8兆（約270兆円）を超える巨大な暗号通貨エコシステムを形成しています。</p>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; padding: 2rem; margin: 2rem 0; text-align: center;">
  <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.4em;">🌍 2025年アルトコイン市場の概況</h3>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0;">
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">📊 市場規模</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">$1.8兆（暗号通貨全体の68%）</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🔢 銘柄数</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">27,000+ 種類（毎月500+新規上場）</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🏆 主要カテゴリ</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">Layer1・DeFi・AI・RWA・Meme</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">⚡ 最新トレンド</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">RWAトークン・AIエージェント急成長</p>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">アルトコインの5つの特徴</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🌈 多様性</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">異なる技術やコンセンサスアルゴリズムで開発され、多様なソリューションを提供</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🚀 革新性</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">新しい機能や改良点を導入し、暗号通貨技術の進歩を牽引</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🎯 専門性</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">特定の用途や業界に特化した機能を持つ</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🔬 実験性</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">新しいコンセンサスアルゴリズムや技術の実験場として機能</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">⚔️ 競争性</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">ビットコインの改良版や競合を目指し、市場の進化を促進</p>
  </div>
</div>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <h3 style="margin: 0 0 1rem 0; color: #1e40af; text-align: center; font-size: 1.3em;">💡 2025年のアルトコイン市場成熟度指標</h3>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
    <div style="background: #f0f9ff; border-radius: 8px; padding: 1rem; border-left: 4px solid #3b82f6;">
      <h4 style="margin: 0 0 0.5rem 0; color: #1e40af;">🏛️ 機関投資家参入</h4>
      <p style="margin: 0; color: #374151; font-size: 0.9em;">BlackRock・Fidelity等がETHや主要アルトコインのETF申請済み</p>
    </div>
    <div style="background: #dcfce7; border-radius: 8px; padding: 1rem; border-left: 4px solid #16a34a;">
      <h4 style="margin: 0 0 0.5rem 0; color: #16a34a;">📈 市場支配力</h4>
      <p style="margin: 0; color: #374151; font-size: 0.9em;">アルトコイン合計がBTC時価総額を上回る「フリッピング」状態継続</p>
    </div>
  </div>
  <div style="background: #dbeafe; border-radius: 8px; padding: 1rem; margin: 1rem 0; text-align: center;">
    <p style="margin: 0; color: #374151; line-height: 1.6;">【重要】2025年8月時点で、アルトコイン合計が暗号通貨市場全体の68%を占める歴史的水準に到達。これは技術革新とユースケース拡大の成果です。</p>
  </div>
</div>
        `
      },
      {
        id: 'section-2',
        title: '2025年版：主要アルトコイン分類と最新動向',
        orderIndex: 2,
        type: 'text',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年のアルトコイン8大カテゴリー</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🌐 Layer 1ブロックチェーン</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>Ethereum (ETH)</strong>: $4,000億・DeFi王者<br/>
      <strong>Solana (SOL)</strong>: $600億・高速処理<br/>
      <strong>Cardano (ADA)</strong>: $250億・学術アプローチ</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">⚡ Layer 2スケーリング</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>Polygon (MATIC)</strong>: $80億・ETH拡張<br/>
      <strong>Arbitrum (ARB)</strong>: $25億・オプティミスティック<br/>
      <strong>Optimism (OP)</strong>: $20億・ロールアップ技術</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🏦 DeFi プロトコル</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>Uniswap (UNI)</strong>: $80億・DEX王者<br/>
      <strong>Aave (AAVE)</strong>: $25億・レンディング<br/>
      <strong>Maker (MKR)</strong>: $15億・DAI発行</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🤖 AI・機械学習</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>Fetch.ai (FET)</strong>: $30億・AIエージェント<br/>
      <strong>SingularityNET (AGIX)</strong>: $8億・AI市場<br/>
      <strong>Bittensor (TAO)</strong>: $50億・分散AI</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🏠 RWA（実物資産）</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>Chainlink (LINK)</strong>: $150億・オラクル<br/>
      <strong>Ondo Finance (ONDO)</strong>: $25億・債券トークン<br/>
      <strong>Centrifuge (CFG)</strong>: $5億・資産担保</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🎮 GameFi・メタバース</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>Axie Infinity (AXS)</strong>: $15億・P2E先駆<br/>
      <strong>The Sandbox (SAND)</strong>: $12億・メタバース<br/>
      <strong>Immutable X (IMX)</strong>: $8億・NFTゲーム</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #ec4899 0%, #be185d 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">😸 ミームコイン</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>Dogecoin (DOGE)</strong>: $200億・元祖ミーム<br/>
      <strong>Shiba Inu (SHIB)</strong>: $150億・DOGEキラー<br/>
      <strong>Pepe (PEPE)</strong>: $80億・2023年ブーム</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">💰 ステーブルコイン</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>Tether (USDT)</strong>: $1,200億・最大手<br/>
      <strong>USD Coin (USDC)</strong>: $400億・規制準拠<br/>
      <strong>DAI</strong>: $50億・分散型</p>
    </div>
  </div>
</div>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #d97706; display: flex; align-items: center;">🔥 2025年の注目トレンド</h3>
<ul style="margin: 0.5rem 0 0 1.5rem; color: #374151; line-height: 1.7;">
  <li><strong>RWAトークン化</strong>：不動産・債券・株式のオンチェーン化が本格化</li>
  <li><strong>AIエージェントトークン</strong>：自律的AI経済の基盤として急成長</li>
  <li><strong>Layer2エコシステム</strong>：Arbitrum・Optimism・Polygonが独自経済圏形成</li>
  <li><strong>機関投資家ETF</strong>：ETH ETF承認後、SOL・ADA等のETF申請ラッシュ</li>
</ul>
</div>
        `
      },
      {
        id: 'section-3',
        title: '2025年版：アルトコイン投資の包括的評価フレームワーク',
        orderIndex: 3,
        type: 'text',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">アルトコイン投資の6つの評価軸</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #16a34a; margin: 0 0 1rem 0; display: flex; align-items: center;">🔬 技術・イノベーション</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.6;">
      <li><strong>技術的優位性</strong>：競合との差別化要因</li>
      <li><strong>開発活動</strong>：GitHubコミット数・開発者数</li>
      <li><strong>ロードマップ</strong>：実現可能性と進捗状況</li>
      <li><strong>監査実績</strong>：セキュリティ監査の実施</li>
    </ul>
    <div style="background: rgba(34, 197, 94, 0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.9em; color: #16a34a; font-weight: bold;">2025年例: Ethereum 2.0完成度・Solana TPS実績</p>
    </div>
  </div>

  <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #f59e0b; margin: 0 0 1rem 0; display: flex; align-items: center;">📊 市場ポジション</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.6;">
      <li><strong>時価総額ランキング</strong>：市場での位置づけ</li>
      <li><strong>取引量</strong>：流動性と関心度</li>
      <li><strong>取引所上場数</strong>：アクセシビリティ</li>
      <li><strong>機関投資家保有</strong>：プロの評価</li>
    </ul>
    <div style="background: rgba(245, 158, 11, 0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.9em; color: #f59e0b; font-weight: bold;">2025年例: ETH ETF承認・Solana機関投資家流入</p>
    </div>
  </div>

  <div style="background: #f0f9ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #3b82f6; margin: 0 0 1rem 0; display: flex; align-items: center;">💼 実用性・採用</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.6;">
      <li><strong>実際のユースケース</strong>：具体的な利用例</li>
      <li><strong>企業パートナーシップ</strong>：大手企業との提携</li>
      <li><strong>ユーザー数</strong>：アクティブユーザー数</li>
      <li><strong>トランザクション数</strong>：実際の利用度</li>
    </ul>
    <div style="background: rgba(59, 130, 246, 0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.9em; color: #3b82f6; font-weight: bold;">2025年例: Chainlink 1000+統合・MATIC Netflix連携</p>
    </div>
  </div>

  <div style="background: #fdf4ff; border: 2px solid #a855f7; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #a855f7; margin: 0 0 1rem 0; display: flex; align-items: center;">⚙️ トークノミクス</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.6;">
      <li><strong>発行上限</strong>：インフレ・デフレ設計</li>
      <li><strong>用途・ユーティリティ</strong>：トークンの機能</li>
      <li><strong>ステーキング報酬</strong>：保有インセンティブ</li>
      <li><strong>バーン機能</strong>：供給量調整メカニズム</li>
    </ul>
    <div style="background: rgba(168, 85, 247, 0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.9em; color: #a855f7; font-weight: bold;">2025年例: ETHバーン・BNBクォータリーバーン</p>
    </div>
  </div>

  <div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ef4444; margin: 0 0 1rem 0; display: flex; align-items: center;">⚠️ リスク評価</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.6;">
      <li><strong>規制リスク</strong>：各国政府の対応</li>
      <li><strong>技術リスク</strong>：スマートコントラクトバグ</li>
      <li><strong>競合リスク</strong>：代替技術の登場</li>
      <li><strong>流動性リスク</strong>：売却時の価格影響</li>
    </ul>
    <div style="background: rgba(239, 68, 68, 0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.9em; color: #ef4444; font-weight: bold;">2025年例: SEC規制・Terra Luna崩壊の教訓</p>
    </div>
  </div>

  <div style="background: #ecfdf5; border: 2px solid #10b981; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #10b981; margin: 0 0 1rem 0; display: flex; align-items: center;">🌍 マクロ環境</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.6;">
      <li><strong>金融政策</strong>：金利環境の影響</li>
      <li><strong>ビットコイン相関</strong>：BTC価格との連動性</li>
      <li><strong>機関投資家動向</strong>：大口資金の流入</li>
      <li><strong>地政学リスク</strong>：国際情勢の影響</li>
    </ul>
    <div style="background: rgba(16, 185, 129, 0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.9em; color: #10b981; font-weight: bold;">2025年例: 米利下げ局面・中国規制緩和期待</p>
    </div>
  </div>
</div>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; padding: 2rem; margin: 2rem 0; text-align: center;">
  <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.4em;">📈 2025年アルトコイン投資戦略</h3>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1rem 0;">
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🥇 大型株戦略</h4>
      <p style="margin: 0; font-size: 0.9em;">ETH・SOL・ADA等<br/>時価総額TOP20</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">⚡ テーマ投資</h4>
      <p style="margin: 0; font-size: 0.9em;">AI・RWA・Layer2<br/>特定セクター集中</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🎯 成長株発掘</h4>
      <p style="margin: 0; font-size: 0.9em;">時価総額100-1000位<br/>高リスク高リターン</p>
    </div>
  </div>
</div>
        `
      }
    ],
    keyPoints: [
      '2025年8月現在、27,000種類以上・$1.8兆の巨大市場',
      'Layer1・DeFi・AI・RWA・ミーム等8大カテゴリーに分類',
      '技術・市場性・トークノミクス・リスクの総合評価が重要',
      'ETH ETF承認など機関投資家参入で市場成熟化進行',
      'RWAトークン・AIエージェントが2025年の注目トレンド',
      '投資には6つの評価軸による総合的分析が成功の鍵'
    ],
    summary: '2025年のアルトコイン市場は27,000種類・$1.8兆規模で、Layer1・DeFi・AI・RWA等8大カテゴリーに分類されます。ETH ETF承認など機関投資家参入により市場が成熟化し、RWAトークンやAIエージェントが注目トレンドです。投資には技術・市場性・トークノミクス・リスク・実用性・マクロ環境の6軸評価が重要です。',
    practicalExamples: [
      '2025年8月時価総額ランキング: ETH($4,000億)・SOL($600億)・ADA($250億)・MATIC($80億)',
      'AI分野急成長例: Bittensor(TAO) $50億・Fetch.ai(FET) $30億・SingularityNET(AGIX) $8億',
      'RWA市場拡大例: Chainlink($150億)・Ondo Finance($25億)・不動産トークン化プロジェクト続々',
      'Layer2エコシステム: Arbitrum・Optimism・Polygonが独自DEX・DeFi経済圏を構築',
      'ミームコイン市場: DOGE($200億)・SHIB($150億)・PEPE($80億)で計$430億の巨大セクター'
    ],
    warningNotes: [
      '2025年も年間変動率200-500%のアルトコインが多数存在',
      '毎月500+新規トークンの大半が詐欺・ラグプルの可能性',
      '時価総額1000位以下は流動性枯渇で売却困難リスク',
      'SEC規制強化により特定カテゴリの大幅下落リスク',
      'スマートコントラクトバグで$100M+損失事例が頻発',
      'AI生成の偽プロジェクト・ディープフェイク詐欺が急増中'
    ]
  },
  quiz: [
    {
      id: 'crypto-basics-12-q1',
      question: 'アルトコインの定義として正しいのは？',
      options: [
        'ビットコインの改良版のみ',
        'ビットコイン以外の全ての暗号通貨',
        'イーサリアム系の暗号通貨のみ',
        'ステーブルコインのみ'
      ],
      correctAnswer: 1,
      explanation: 'アルトコインは「Alternative Coin」の略で、ビットコイン以外の全ての暗号通貨を指します。'
    },
    {
      id: 'crypto-basics-12-q2',
      question: 'プライバシー系暗号通貨の特徴は？',
      options: [
        '高速な処理速度',
        '匿名性の高い取引',
        'スマートコントラクト機能',
        '価格が安定している'
      ],
      correctAnswer: 1,
      explanation: 'プライバシー系暗号通貨（Monero、Zcashなど）は、取引の匿名性を高める技術を特徴としています。'
    },
    {
      id: 'crypto-basics-12-q3',
      question: 'ステーブルコインの主な目的は？',
      options: [
        '価格変動を最小化する',
        '取引速度を最大化する',
        'プライバシーを保護する',
        'マイニング報酬を増やす'
      ],
      correctAnswer: 0,
      explanation: 'ステーブルコインは法定通貨や他の安定した資産に連動することで価格変動を最小化することを目的としています。'
    },
    {
      id: 'crypto-basics-12-q4',
      question: 'アルトコイン投資で最も重要な評価ポイントは？',
      options: [
        '価格の安さ',
        '技術的優位性と実用性',
        '取引量の多さ',
        '有名人の推薦'
      ],
      correctAnswer: 1,
      explanation: 'アルトコイン投資では、その暗号通貨の技術的優位性、実用性、将来性を詳しく調査することが最も重要です。'
    },
    {
      id: 'crypto-basics-12-q5',
      question: 'アルトコインの一般的なリスクは？',
      options: [
        'ビットコインより価格変動が小さい',
        'すべてが政府に保護されている',
        '価格変動が激しく流動性リスクがある',
        '必ず利益が保証されている'
      ],
      correctAnswer: 2,
      explanation: 'アルトコインは一般的にビットコインより価格変動が激しく、流動性が低い場合があるため、投資リスクが高くなります。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};