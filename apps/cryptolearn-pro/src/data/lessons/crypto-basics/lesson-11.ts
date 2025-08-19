import type { Lesson } from '../../../types';

export const lesson11: Lesson = {
  id: 'crypto-basics-11',
  categoryId: 'crypto-basics',
  title: 'Introduction to Ethereum - イーサリアムの基礎',
  slug: 'introduction-to-ethereum',
  description: '2025年版：イーサリアムの革新的機能と最新アップグレード。スマートコントラクト、DeFi、NFT、Layer2ソリューションまで包括的に理解します。',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 26,
  orderIndex: 11,
  content: {
    sections: [
      {
        id: 'section-1',
        title: 'イーサリアムとは何か',
        orderIndex: 1,
        type: 'text',
        content: `
<p>イーサリアム（Ethereum）は、2015年にローンチされた分散型ブロックチェーンプラットフォームです。<br/>
2025年現在、「世界のコンピュータ」として約$4,000億の時価総額で世界第2位の暗号通貨となり、DeFiエコシステムのTVLの80%以上を支えています。</p>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; padding: 2rem; margin: 2rem 0; text-align: center;">
  <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.4em;">🔮 2025年のイーサリアムの現状</h3>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0;">
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">💰 時価総額</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">$4,000億+ (BTCの約60%)</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🏛️ DeFi TVL</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">$800億+ (全体の80%)</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🔥 日次取引数</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">120万件+ (安定運用)</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🌎 Layer2成長</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">Arbitrum・Polygon等が急成長</p>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年版：イーサリアムの革新的特徴と最新アップグレード</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">📜 スマートコントラクト</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">自動実行される契約プログラム</p>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.9em; font-style: italic;">条件が満たされると自動で実行</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.85em; font-weight: bold;">2025年: 1,000万+のコントラクトが稼働中</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🌐 分散型アプリ（DApps）</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">中央管理者なしで動作するアプリ</p>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.9em; font-style: italic;">検閲耐性と透明性を実現</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.85em; font-weight: bold;">2025年: 5,000+ DAppsがアクティブ</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">⚙️ プログラマブル</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">開発者が独自のアプリを構築可能</p>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.9em; font-style: italic;">Solidityプログラミング言語使用</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.85em; font-weight: bold;">2025年: 50万+開発者がエコシステムに参加</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">💎 イーサ（ETH）</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">プラットフォーム内の基軸通貨</p>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.9em; font-style: italic;">ガス料金の支払いに使用</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.85em; font-weight: bold;">2025年: PoS移行でステーキング報酬も可能</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🖥️ EVM（仮想マシン）</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">スマートコントラクト実行環境</p>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.9em; font-style: italic;">世界中で一貫した実行を保証</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.85em; font-weight: bold;">2025年: EVM互換チェーンが100+で拡大</p>
    </div>
  </div>
</div>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <h3 style="margin: 0 0 1rem 0; color: #1e40af; text-align: center; font-size: 1.3em;">💡 2025年のイーサリアムが「世界のコンピュータ」である理由</h3>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
    <div style="background: #f0f9ff; border-radius: 8px; padding: 1rem; border-left: 4px solid #3b82f6;">
      <h4 style="margin: 0 0 0.5rem 0; color: #1e40af;">🌐 グローバルな分散処理</h4>
      <p style="margin: 0; color: #374151; font-size: 0.9em;">世界中の10万+ノードが同じコードを実行し、一貫した結果を保証</p>
    </div>
    <div style="background: #dcfce7; border-radius: 8px; padding: 1rem; border-left: 4px solid #16a34a;">
      <h4 style="margin: 0 0 0.5rem 0; color: #16a34a;">🖥️ 仮想マシン</h4>
      <p style="margin: 0; color: #374151; font-size: 0.9em;">EVMが世界中で同じ実行環境を提供、コードのポータビリティを実現</p>
    </div>
  </div>
  <div style="background: #dbeafe; border-radius: 8px; padding: 1rem; margin: 1rem 0; text-align: center;">
    <p style="margin: 0; color: #374151; line-height: 1.6;">【重要】誰でもこの「世界のコンピュータ」上でアプリケーションを実行でき、それが分散型アプリケーション（DApps）となっています。</p>
  </div>
</div>
        `
      },
      {
        id: 'section-2',
        title: 'ビットコインとの違い',
        orderIndex: 2,
        type: 'text',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年版：ビットコイン vs イーサリアム 徹底比較</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white;">
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">特徴</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">₿ ビットコイン</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">Ξ イーサリアム</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">主な目的</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">デジタル通貨・価値保存</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">プログラマブルプラットフォーム</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">主要機能</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">送金・価値保存</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">スマートコントラクト・DApps</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">ブロック時間</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">約10分</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">約12秒</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">プログラミング</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">限定的なスクリプト</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">完全にプログラマブル</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">コンセンサス</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">Proof of Work (PoW)</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">Proof of Stake (PoS) 2022年移行完了</td>
</tr>
<tr style="background: #dcfce7; font-weight: bold;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">現在の役割</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">デジタルゴールド</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">分散型アプリプラットフォーム</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">エネルギー効率</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">高消費 (150TWh/年)</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">99.95%削減 (2.6MWh/年)</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">開発者エコシステム</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">限定的 (5,000人程度)</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">50万+開発者 (世界最大)</td>
</tr>
</tbody>
</table>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin: 2rem 0;">
  <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 16px; padding: 2rem; text-align: center;">
    <h3 style="color: #d97706; margin: 0 0 1rem 0; font-size: 1.4em;">₿ ビットコインの強み (2025年)</h3>
    <ul style="margin: 0; padding-left: 1rem; color: #374151; text-align: left; line-height: 1.8;">
      <li>最も安全で実績のあるネットワーク（15年無事故）</li>
      <li>「デジタルゴールド」としての価値保存性</li>
      <li>シンプルで理解しやすい構造</li>
      <li>機関投資家・ETFの本格参入</li>
      <li>「デジタルゴールド」の位置付け確立</li>
    </ul>
  </div>
  
  <div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 16px; padding: 2rem; text-align: center;">
    <h3 style="color: #16a34a; margin: 0 0 1rem 0; font-size: 1.4em;">Ξ イーサリアムの強み (2025年)</h3>
    <ul style="margin: 0; padding-left: 1rem; color: #374151; text-align: left; line-height: 1.8;">
      <li>DeFi ($800億TVL)・NFT・DAOの中心地</li>
      <li>世界最大の開発者エコシステム (50万+)</li>
      <li>年間数百件のアップグレードと改善</li>
      <li>無限のユースケースとイノベーション</li>
      <li>Layer2スケーリングソリューションの成熟</li>
    </ul>
  </div>
</div>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #d97706; display: flex; align-items: center;">💡 投資判断のポイント</h3>
<p style="margin: 0.5rem 0 0 0; color: #374151; line-height: 1.6;">ビットコインは「デジタルゴールド」、イーサリアムは「デジタル石油」と例えられます。価値保存を重視するならビットコイン、技術革新とエコシステムの成長性を重視するならイーサリアムという選択肢があります。</p>
</div>
        `
      },
      {
        id: 'section-3',
        title: 'スマートコントラクトの基本',
        orderIndex: 3,
        type: 'text',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">スマートコントラクトとは</h2>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; padding: 2rem; margin: 2rem 0; text-align: center;">
  <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.4em;">📜 スマートコントラクト = 自動実行される契約</h3>
  <p style="margin: 0; font-size: 1.1em; line-height: 1.6;">プログラムコードで書かれた契約条件が、条件が満たされると自動的に実行される革新的なシステム</p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">スマートコントラクトの4つの特徴</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #16a34a; margin: 0 0 1rem 0; display: flex; align-items: center;">⚡ 自動実行</h3>
    <p style="margin: 0 0 0.5rem 0; color: #374151; line-height: 1.6;">条件が満たされると自動的に実行される契約</p>
    <div style="background: rgba(34, 197, 94, 0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.9em; color: #16a34a; font-weight: bold;">例: 保険金の自動支払い</p>
    </div>
  </div>

  <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #f59e0b; margin: 0 0 1rem 0; display: flex; align-items: center;">💻 コード化</h3>
    <p style="margin: 0 0 0.5rem 0; color: #374151; line-height: 1.6;">契約条件がプログラムコードで記述</p>
    <div style="background: rgba(245, 158, 11, 0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.9em; color: #f59e0b; font-weight: bold;">例: Solidityプログラミング言語</p>
    </div>
  </div>

  <div style="background: #f0f9ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #3b82f6; margin: 0 0 1rem 0; display: flex; align-items: center;">🔒 信頼性</h3>
    <p style="margin: 0 0 0.5rem 0; color: #374151; line-height: 1.6;">第三者を必要とせず、透明で改ざん不可能</p>
    <div style="background: rgba(59, 130, 246, 0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.9em; color: #3b82f6; font-weight: bold;">例: ブロックチェーン上で実行</p>
    </div>
  </div>

  <div style="background: #fdf4ff; border: 2px solid #a855f7; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #a855f7; margin: 0 0 1rem 0; display: flex; align-items: center;">⚡ 効率性</h3>
    <p style="margin: 0 0 0.5rem 0; color: #374151; line-height: 1.6;">手数料削減と処理時間短縮</p>
    <div style="background: rgba(168, 85, 247, 0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.9em; color: #a855f7; font-weight: bold;">例: 仲介者を排除したコスト削減</p>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">実用例とユースケース</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; border-radius: 12px; padding: 1.5rem; text-align: center;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0;">🏥 保険の自動支払い</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">航空便の遅延が確認されると、自動的に保険金を支払う</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; border-radius: 12px; padding: 1.5rem; text-align: center;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0;">🆔 デジタル身分証明</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">改ざん不可能なデジタルIDで本人確認を効率化</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; border-radius: 12px; padding: 1.5rem; text-align: center;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0;">🗳️ 投票システム</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">透明で改ざん不可能な電子投票を実現</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); color: white; border-radius: 12px; padding: 1.5rem; text-align: center;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0;">🏦 分散型金融（DeFi）</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">銀行を介さない貸借・取引・投資サービス</p>
  </div>
</div>

<div style="background: #f0fdf4; border: 2px solid #16a34a; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
  <h3 style="color: #16a34a; margin: 0 0 1rem 0; text-align: center; font-size: 1.3em;">🌟 2025年の代表的なスマートコントラクト事例</h3>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
    <div style="background: white; border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #16a34a;">Uniswap V4</h4>
      <p style="margin: 0; font-size: 0.9em; color: #374151;">自動マーケットメーカー（AMM）による分散型取引所</p>
    </div>
    <div style="background: white; border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #16a34a;">Aave V3</h4>
      <p style="margin: 0; font-size: 0.9em; color: #374151;">分散型レンディング・借用プロトコル</p>
    </div>
  </div>
</div>

<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #dc2626; display: flex; align-items: center;">⚠️ スマートコントラクトのリスク</h3>
<ul style="margin: 0.5rem 0 0 1.5rem; color: #7f1d1d; line-height: 1.7;">
  <li>コードのバグによる資金流出リスク</li>
  <li>一度デプロイすると修正が困難</li>
  <li>ガス料金の変動によるコスト増加</li>
  <li>技術的知識が必要で理解が困難</li>
</ul>
</div>
        `
      }
    ],
    keyPoints: [
      'イーサリアムはスマートコントラクトを実行できるブロックチェーンプラットフォーム',
      'ビットコインとは異なり、プログラマブルな機能を提供',
      'DApps（分散型アプリケーション）の基盤として機能',
      'ETH（イーサ）はガス料金の支払いに使用される',
      '2022年にProof of Stakeに移行し、エネルギー効率が向上'
    ],
    summary: 'イーサリアムは、スマートコントラクトとDAppsを実行できる分散型プラットフォームです。ビットコインが「デジタル通貨」なら、イーサリアムは「世界のコンピュータ」として機能し、様々な分散型アプリケーションの基盤となっています。',
    practicalExamples: [
      'Uniswap: 分散型取引所(DEX)のスマートコントラクト',
      'OpenSea: NFTマーケットプレイス',
      'Compound: 分散型レンディングプロトコル',
      'ENS: イーサリアムネームサービス(.ethドメイン)'
    ],
    warningNotes: [
      'ガス料金（手数料）が高額になる場合がある',
      'ネットワーク混雑時は処理が遅くなる',
      'スマートコントラクトのバグリスクが存在',
      '規制の変化が価格に大きな影響を与える',
      '技術的理解が必要で初心者には複雑'
    ]
  },
  quiz: [
    {
      id: 'crypto-basics-11-q1',
      question: 'イーサリアムの最大の特徴は何ですか？',
      options: [
        '送金速度が最速',
        'スマートコントラクトの実行',
        '価格が最も安定している',
        '政府による完全な規制'
      ],
      correctAnswer: 1,
      explanation: 'イーサリアムの最大の特徴はスマートコントラクトの実行機能です。これにより、自動実行される契約やDAppsが可能になります。'
    },
    {
      id: 'crypto-basics-11-q2',
      question: 'イーサリアムで使用される暗号通貨の名前は？',
      options: [
        'Bitcoin (BTC)',
        'Ether (ETH)',
        'Litecoin (LTC)',
        'Ripple (XRP)'
      ],
      correctAnswer: 1,
      explanation: 'イーサリアムプラットフォームで使用される暗号通貨はEther（ETH、イーサ）です。'
    },
    {
      id: 'crypto-basics-11-q3',
      question: 'DAppsとは何の略ですか？',
      options: [
        'Digital Applications',
        'Decentralized Applications',
        'Direct Applications',
        'Dynamic Applications'
      ],
      correctAnswer: 1,
      explanation: 'DAppsは「Decentralized Applications（分散型アプリケーション）」の略です。中央管理者なしで動作するアプリケーションです。'
    },
    {
      id: 'crypto-basics-11-q4',
      question: 'イーサリアムが2022年に移行したコンセンサスアルゴリズムは？',
      options: [
        'Proof of Work',
        'Proof of Stake',
        'Proof of Authority',
        'Proof of History'
      ],
      correctAnswer: 1,
      explanation: 'イーサリアムは2022年9月にProof of Work（PoW）からProof of Stake（PoS）に移行し、エネルギー効率が大幅に改善されました。'
    },
    {
      id: 'crypto-basics-11-q5',
      question: 'イーサリアムでスマートコントラクトを実行する際に必要な手数料は？',
      options: [
        'マイニング料金',
        'ガス料金',
        'ステーキング料金',
        '手数料は無料'
      ],
      correctAnswer: 1,
      explanation: 'イーサリアムでスマートコントラクトを実行する際には、計算リソースの使用量に応じて「ガス料金」と呼ばれる手数料を支払う必要があります。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};