import type { Lesson } from '@/types';

export const lesson15: Lesson = {
  id: 'risk-management-stress-testing',
  categoryId: 'risk-management',
  title: 'ストレステストとシナリオ分析',
  slug: 'stress-testing',
  description: 'ストレステストとシナリオ分析を活用した包括的なリスク評価とポートフォリオの耐久性検証手法を学びます',
  difficultyLevel: 'advanced',
  estimatedMinutes: 35,
  orderIndex: 15,
  content: {
    sections: [
      {
        id: 'section-1',
        title: 'ストレステストの基本概念と目的',
        orderIndex: 1,
        type: 'text',
        content: `
<p>ストレステストは、異常な市場環境や極端な状況下でポートフォリオがどのような影響を受けるかを事前に評価する重要なリスク管理手法です。<br/>通常の市場環境では見えないリスクを発見し、危機時の対応策を準備することができます。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ストレステストの定義と意義</h2>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af;">ストレステストとは</h3>
<p style="margin: 0; color: #374151;">極端だが起こりうる市場環境や経済状況を想定し、ポートフォリオや投資戦略への影響を定量的に評価する手法</p>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">主要な目的と効果</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">目的</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">具体的効果</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">実践例</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">潜在リスクの発見</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">通常時には見えない相関関係やリスク集中を特定</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">2008年金融危機時の異常相関検出</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">損失限度の把握</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">最大損失額（Maximum Loss）の事前推定</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">ポートフォリオの最大30%損失を想定</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">資金計画の最適化</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">緊急時の流動性需要予測と資金確保計画</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">現金比率10%から20%への引き上げ</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">投資戦略の改善</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">耐久性の高いポートフォリオ構築</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">ヘッジ資産の組み入れ比率調整</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ストレステストの種類</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">1. 感度分析（Sensitivity Analysis）</h3>
<p style="margin: 0; color: #374151;">単一リスク要因の変化がポートフォリオに与える影響を測定</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">2. シナリオ分析（Scenario Analysis）</h3>
<p style="margin: 0; color: #374151;">複数要因が同時に変化する特定状況での影響評価</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">3. 歴史的シミュレーション</h3>
<p style="margin: 0; color: #374151;">過去の危機的状況を現在のポートフォリオに適用</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">4. モンテカルロ・シミュレーション</h3>
<p style="margin: 0; color: #374151;">確率分布に基づく多数の可能性を統計的に分析</p>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">複数手法の組み合わせが効果的</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">単一手法に依存せず、異なる角度からのストレステストを組み合わせることで、より包括的なリスク評価が可能になります。</p>
</div>
        `
      },
      {
        id: 'section-2',
        title: 'シナリオ分析の設計と実践手法',
        orderIndex: 2,
        type: 'text',
        content: `
<p>効果的なシナリオ分析では、現実性と網羅性を両立した多様なシナリオを設計し、それぞれの影響を定量的に評価することが重要です。<br/>以下の体系的アプローチにより、実践的なシナリオ分析を実施できます。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">シナリオ設計の基本原則</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #dc2626; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">原則</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">重要性</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">実装方法</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">現実性（Plausibility）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">実際に起こりうる状況での検証</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">過去事例の分析と専門家意見の活用</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">網羅性（Comprehensiveness）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">主要リスク要因の包括的考慮</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">マクロ経済・市場・個別企業リスク</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">一貫性（Consistency）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">要因間の論理的整合性確保</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">経済理論に基づく因果関係設定</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">差別性（Distinctiveness）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">各シナリオの明確な特徴</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">楽観・中立・悲観の明確な区分</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">代表的な投資シナリオ例</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">シナリオ1：インフレ急騰・金利上昇</h3>
<p style="margin: 0; color: #374151;"><strong>状況設定：</strong>コアCPI前年比+4%、政策金利3%上昇</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>主な影響：</strong>債券価格大幅下落、成長株売り圧力、REITの減価</p>
</div>
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem; border-radius: 4px;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">シナリオ2：経済成長鈍化・デフレ懸念</h3>
<p style="margin: 0; color: #374151;"><strong>状況設定：</strong>実質GDP成長率-2%、失業率+3%上昇</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>主な影響：</strong>株式全般下落、信用スプレッド拡大、安全資産需要</p>
</div>
<div style="background: #f0fdfa; border-left: 4px solid #059669; padding: 1rem; border-radius: 4px;">
<h3 style="color: #047857; margin: 0 0 0.5rem 0;">シナリオ3：地政学リスク顕在化</h3>
<p style="margin: 0; color: #374151;"><strong>状況設定：</strong>主要国間の貿易摩擦激化、制裁措置拡大</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>主な影響：</strong>商品価格高騰、サプライチェーン混乱、VIX上昇</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">シナリオ影響の定量化手法</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">1. ファクターモデル活用</h3>
<ul style="margin: 0.5rem 0 0 0; color: #374151; padding-left: 1.5rem;">
<li>金利変動→債券価格影響（デュレーション×金利変化幅）</li>
<li>GDP成長率→株式市場影響（ベータ×成長率変化）</li>
<li>為替変動→外国株式影響（通貨エクスポージャー×変動率）</li>
</ul>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">2. 過去データ参照</h3>
<ul style="margin: 0.5rem 0 0 0; color: #374151; padding-left: 1.5rem;">
<li>類似状況での実績パフォーマンス分析</li>
<li>統計的関係性（相関係数・回帰分析）の活用</li>
<li>分散・VaRの履歴的推定</li>
</ul>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">3. 専門家判断統合</h3>
<ul style="margin: 0.5rem 0 0 0; color: #374151; padding-left: 1.5rem;">
<li>エコノミスト・アナリストの定性的評価</li>
<li>デルファイ法による合意形成</li>
<li>確率分布の主観的設定</li>
</ul>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">動的シナリオの活用</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">一度作成したシナリオに固執せず、市場環境の変化に応じて定期的に見直し・更新することが重要です。</p>
</div>
        `
      },
      {
        id: 'section-3',
        title: '歴史的ストレステストと危機事例分析',
        orderIndex: 3,
        type: 'text',
        content: `
<p>過去の金融危機や市場変動の実例を現在のポートフォリオに当てはめることで、実際の危機耐性を検証できます。<br/>歴史的事例から学ぶことで、将来の類似状況への備えを強化することができます。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">主要な歴史的危機イベント</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #dc2626; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">危機事例</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">期間・規模</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">主な特徴</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">学習ポイント</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">リーマンショック</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">2008年9-12月<br/>S&P500: -37%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">信用収縮・流動性危機<br/>相関上昇</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">分散投資の限界<br/>流動性確保の重要性</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">ITバブル崩壊</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">2000-2002年<br/>NASDAQ: -78%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">セクター集中リスク<br/>バリュエーション調整</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">過度な集中投資回避<br/>割安性評価の重要性</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">コロナショック</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">2020年2-3月<br/>日経225: -30%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">短期急落・急回復<br/>構造変化加速</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">パニック売りの危険性<br/>長期視点の重要性</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">欧州債務危機</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">2011-2012年<br/>ユーロ圏株式: -25%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">ソブリンリスク<br/>通貨・信用不安</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">政治リスクの影響<br/>通貨分散の意義</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">歴史的データによる影響分析例</h2>

<div style="background: #fef2f2; border: 2px solid #dc2626; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0; text-align: center;">リーマンショック時の資産別パフォーマンス</h3>
<table style="width: 100%; border-collapse: collapse;">
<thead>
<tr style="background: #dc2626; color: white;">
<th style="padding: 8px; border: 1px solid #ddd; text-align: center;">資産クラス</th>
<th style="padding: 8px; border: 1px solid #ddd; text-align: center;">2008年リターン</th>
<th style="padding: 8px; border: 1px solid #ddd; text-align: center;">最大下落幅</th>
<th style="padding: 8px; border: 1px solid #ddd; text-align: center;">回復期間</th>
</tr>
</thead>
<tbody>
<tr>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; font-weight: 600;">米国株式（S&P500）</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; color: #dc2626;">-37%</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; color: #dc2626;">-57%</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center;">49ヶ月</td>
</tr>
<tr>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; font-weight: 600;">米国国債（10年）</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; color: #059669;">+20%</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; color: #059669;">-</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center;">-</td>
</tr>
<tr>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; font-weight: 600;">金（ゴールド）</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; color: #059669;">+5%</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; color: #dc2626;">-33%</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center;">6ヶ月</td>
</tr>
<tr>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; font-weight: 600;">不動産（REIT）</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; color: #dc2626;">-37%</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; color: #dc2626;">-72%</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center;">78ヶ月</td>
</tr>
</tbody>
</table>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">危機時の特徴的現象</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">1. 相関係数の急上昇</h3>
<p style="margin: 0; color: #374151;"><strong>現象：</strong>平時は低相関だった資産間の相関が0.8-0.9に上昇</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>対策：</strong>真に独立性の高い資産（国債・金・現金）の確保</p>
</div>
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">2. 流動性の枯渇</h3>
<p style="margin: 0; color: #374151;"><strong>現象：</strong>売却希望者激増、買い手不在による価格急落</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>対策：</strong>常時流動性の高い資産比率を一定水準維持</p>
</div>
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">3. ボラティリティの急拡大</h3>
<p style="margin: 0; color: #374151;"><strong>現象：</strong>通常の2-3倍の価格変動、VIX指数40-80へ上昇</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>対策：</strong>ポジションサイズ縮小、ヘッジ戦略の事前準備</p>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">「今回は違う」の危険性</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">各危機は異なる要因で発生しますが、パニック売りや流動性枯渇など共通する特徴があります。過去の教訓を軽視しないことが重要です。</p>
</div>
        `
      },
      {
        id: 'section-4',
        title: 'モンテカルロ・シミュレーションによる確率的分析',
        orderIndex: 4,
        type: 'text',
        content: `
<p>モンテカルロ・シミュレーションは、確率分布に基づいて数千・数万通りの可能性を統計的に分析し、ポートフォリオの将来パフォーマンスを予測する高度な手法です。<br/>不確実性を定量化し、より堅牢な投資戦略を構築することができます。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">モンテカルロ・シミュレーションの仕組み</h2>

<div style="background: #dbeafe; border: 2px solid #2563eb; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0; text-align: center;">シミュレーション実行プロセス</h3>
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">
<div style="background: white; padding: 1rem; border-radius: 4px; text-align: center;">
<div style="color: #2563eb; font-size: 2rem; font-weight: bold;">1</div>
<div style="font-weight: 600; margin: 0.5rem 0;">前提設定</div>
<div style="font-size: 0.9rem; color: #374151;">各資産の期待リターン・リスク・相関</div>
</div>
<div style="background: white; padding: 1rem; border-radius: 4px; text-align: center;">
<div style="color: #2563eb; font-size: 2rem; font-weight: bold;">2</div>
<div style="font-weight: 600; margin: 0.5rem 0;">乱数生成</div>
<div style="font-size: 0.9rem; color: #374151;">確率分布からランダムサンプリング</div>
</div>
<div style="background: white; padding: 1rem; border-radius: 4px; text-align: center;">
<div style="color: #2563eb; font-size: 2rem; font-weight: bold;">3</div>
<div style="font-weight: 600; margin: 0.5rem 0;">大量計算</div>
<div style="font-size: 0.9rem; color: #374151;">10,000回以上の試行実行</div>
</div>
<div style="background: white; padding: 1rem; border-radius: 4px; text-align: center;">
<div style="color: #2563eb; font-size: 2rem; font-weight: bold;">4</div>
<div style="font-weight: 600; margin: 0.5rem 0;">統計分析</div>
<div style="font-size: 0.9rem; color: #374151;">確率分布・信頼区間算出</div>
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">シミュレーション結果の解釈</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #059669; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">評価指標</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">計算方法</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">判断基準</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">平均リターン</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">全試行結果の算術平均</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">目標リターン（年率5-8%）との比較</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">標準偏差</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">リターンのばらつき度合い</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">年率15%以下が望ましい</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">VaR（95%信頼水準）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">下位5%の損失額</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">資産総額の20%以内に制限</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">最大ドローダウン</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">最大下落幅の平均値</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">30%以内が目安</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">実践的なシミュレーション例</h2>

<div style="background: #f0fdfa; border: 2px solid #059669; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">
<h3 style="color: #047857; margin: 0 0 1rem 0; text-align: center;">バランス型ポートフォリオのシミュレーション結果</h3>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
<div>
<h4 style="color: #047857; margin: 0 0 0.5rem 0;">ポートフォリオ構成</h4>
<ul style="margin: 0; padding-left: 1rem; color: #374151;">
<li>国内株式：30%</li>
<li>外国株式：30%</li>
<li>国内債券：25%</li>
<li>外国債券：10%</li>
<li>現金：5%</li>
</ul>
</div>
<div>
<h4 style="color: #047857; margin: 0 0 0.5rem 0;">20年後の結果（10,000回試行）</h4>
<ul style="margin: 0; padding-left: 1rem; color: #374151;">
<li>平均リターン：年率6.2%</li>
<li>標準偏差：12.8%</li>
<li>VaR（95%）：年率-18.3%</li>
<li>成功確率（元本割れなし）：78%</li>
</ul>
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">シミュレーションの限界と注意点</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">1. 前提条件への依存</h3>
<p style="margin: 0; color: #374151;"><strong>問題：</strong>期待リターンや相関係数の設定が結果に大きく影響</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>対策：</strong>複数の前提条件でシミュレーションを実施</p>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">2. 正規分布の仮定</h3>
<p style="margin: 0; color: #374151;"><strong>問題：</strong>実際の市場は極端な事象（ファットテール）が多発</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>対策：</strong>t分布やスキュード正規分布の採用検討</p>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">3. 動的相関の無視</h3>
<p style="margin: 0; color: #374151;"><strong>問題：</strong>危機時に相関が変化する現象を考慮できない</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>対策：</strong>レジーム・スイッチングモデルの併用</p>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">完璧な予測よりも意思決定支援</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">モンテカルロ・シミュレーションは将来を正確に予測するものではなく、リスクの理解と意思決定の質向上が目的です。</p>
</div>
        `
      },
      {
        id: 'section-5',
        title: 'ストレステスト結果の活用と改善策',
        orderIndex: 5,
        type: 'text',
        content: `
<p>ストレステストの真価は、結果をどのように解釈し、実際の投資戦略改善に活用するかにあります。<br/>テスト結果から導かれる具体的な改善アクションを実行することで、より堅牢なポートフォリオを構築できます。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">テスト結果の体系的評価</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">評価項目</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">許容水準</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">警戒水準</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">対応アクション</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">最大損失額</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">総資産の20%以内</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">総資産の30%超</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">リスク資産比率削減</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">流動性不足期間</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">6ヶ月以内</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">12ヶ月超</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">現金・短期債券増加</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">回復所要期間</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">5年以内</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">10年超</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">分散強化・相関軽減</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">集中リスク</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">単一要因20%以内</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">単一要因40%超</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">資産・地域・セクター分散</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">具体的な改善策の実装</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">1. 資産配分の調整</h3>
<p style="margin: 0; color: #374151;"><strong>リスク軽減:</strong> 株式60% → 50%、債券30% → 35%、現金10% → 15%</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>効果:</strong> 最大損失を35% → 25%に軽減、ボラティリティ15% → 12%に低減</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">2. ヘッジ戦略の導入</h3>
<p style="margin: 0; color: #374151;"><strong>手法:</strong> プットオプション購入、VIX連動ETF、金・国債比率向上</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>効果:</strong> 下落相場での損失限定、年間コスト1-2%で保険効果</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">3. 動的リバランシング</h3>
<p style="margin: 0; color: #374151;"><strong>ルール:</strong> 目標配分から±5%乖離時に自動調整実行</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>効果:</strong> 市場変動の機械的活用、感情的判断の排除</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">継続的モニタリング体制</h2>

<div style="background: #dbeafe; border: 2px solid #2563eb; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0; text-align: center;">ストレステスト実施スケジュール</h3>
<table style="width: 100%; border-collapse: collapse;">
<thead>
<tr style="background: #2563eb; color: white;">
<th style="padding: 8px; border: 1px solid #ddd; text-align: center;">頻度</th>
<th style="padding: 8px; border: 1px solid #ddd; text-align: center;">対象</th>
<th style="padding: 8px; border: 1px solid #ddd; text-align: center;">重点項目</th>
</tr>
</thead>
<tbody>
<tr>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; font-weight: 600;">月次</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center;">主要リスク指標</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center;">VaR・相関・集中度</td>
</tr>
<tr>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; font-weight: 600;">四半期</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center;">シナリオ分析</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center;">経済環境変化対応</td>
</tr>
<tr>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; font-weight: 600;">半年</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center;">包括的ストレステスト</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center;">戦略全体の検証</td>
</tr>
<tr>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; font-weight: 600;">年次</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center;">手法・前提の見直し</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center;">新リスク要因追加</td>
</tr>
</tbody>
</table>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">実践的な改善事例</h2>

<div style="background: #f0fdfa; border: 2px solid #059669; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">
<h3 style="color: #047857; margin: 0 0 1rem 0;">ケース：コロナショック対応の改善例</h3>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
<div>
<h4 style="color: #047857; margin: 0 0 0.5rem 0;">改善前の問題点</h4>
<ul style="margin: 0; padding-left: 1rem; color: #374151;">
<li>現金比率が過少（5%）</li>
<li>成長株への過度集中（70%）</li>
<li>地理的分散不足</li>
<li>流動性の低い資産保有</li>
</ul>
</div>
<div>
<h4 style="color: #047857; margin: 0 0 0.5rem 0;">改善後の効果</h4>
<ul style="margin: 0; padding-left: 1rem; color: #374151;">
<li>現金比率15%で機動力向上</li>
<li>バリュー株30%でバランス改善</li>
<li>アジア・欧州投資で分散強化</li>
<li>高流動性ETF中心に変更</li>
</ul>
</div>
</div>
<div style="text-align: center; margin-top: 1rem; padding: 1rem; background: white; border-radius: 4px;">
<strong style="color: #047857;">結果：</strong> 2020年3月の最大損失を-35%から-22%に軽減、回復期間を18ヶ月から8ヶ月に短縮
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">改善は段階的に実施</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">ストレステスト結果に基づく改善は、一度に大幅変更せず、段階的に実施して効果を確認しながら進めることが重要です。</p>
</div>
        `
      }
    ],
    keyPoints: [
      'ストレステストは極端な市場環境でのポートフォリオ耐久性を事前評価する重要な手法',
      'シナリオ分析では現実性・網羅性・一貫性・差別性を満たす多様なシナリオ設計が必要',
      '歴史的危機事例の分析により相関上昇・流動性枯渇・ボラティリティ拡大への備えが可能',
      'モンテカルロ・シミュレーションで確率的な将来予測と意思決定支援を実現',
      'テスト結果から最大損失・回復期間・流動性などを評価し具体的改善策を実装',
      '月次・四半期・年次の継続的モニタリングで市場環境変化に適応',
      '改善策は段階的実施で効果確認しながら堅牢なポートフォリオ構築を目指す'
    ],
    summary: 'ストレステストとシナリオ分析について詳しく学習しました。感度分析・シナリオ分析・歴史的シミュレーション・モンテカルロ法など多様な手法を組み合わせることで、通常時には見えないリスクを発見し、危機耐性の高いポートフォリオを構築できます。テスト結果を基にした資産配分調整、ヘッジ戦略導入、動的リバランシングなどの改善策実装と継続的モニタリングにより、市場の不確実性に対応した堅実な投資運用が可能になります。',
    practicalExamples: [
      '日本の年金基金がリーマンショック想定ストレステストで最大30%損失を予測し現金比率を15%に引き上げた事例',
      '個人投資家がコロナショック後にバランス型から現金比率20%の保守型に変更し次の危機で損失を半減した実例',
      'ヘッジファンドがモンテカルロ・シミュレーションで95%VaRを月次管理し年間シャープレシオ1.8を維持した成功例',
      '機関投資家が四半期毎のシナリオ分析でインフレ急騰リスクを事前発見しTIPS比率を倍増した先見的対応事例',
      '退職金運用でストレステスト結果を基に5段階のリスク調整ルールを設定し安定運用を20年継続した長期実践例'
    ],
    warningNotes: [
      '投資判断は自己責任で行い、本レッスンの内容は教育目的のみで投資勧誘ではありません',
      'ストレステストは将来を正確に予測するものではなく、リスク理解と準備のための手法です',
      '過去のデータに基づく分析のため、前例のない新しいタイプの危機には限界があります',
      'モデルの前提条件や確率分布の設定によって結果が大きく変わる可能性があります',
      '改善策の実装時は段階的に行い、市場環境や個人の状況変化に応じた見直しが必要です'
    ]
  },
  quiz: [
    {
      id: 'risk-management-15-q1',
      question: 'ストレステストの最も重要な目的は何ですか？',
      options: [
        '将来の市場価格を正確に予測する',
        '異常な市場環境での潜在リスクを事前に発見する',
        '投資収益率を最大化する戦略を見つける',
        '最適な資産配分を一意に決定する'
      ],
      correctAnswer: 1,
      explanation: 'ストレステストの最も重要な目的は、極端だが起こりうる市場環境において、通常時には見えない潜在的なリスクを事前に発見し、適切な対応策を準備することです。'
    },
    {
      id: 'risk-management-15-q2',
      question: 'シナリオ分析における「一貫性（Consistency）」の原則とは？',
      options: [
        '全てのシナリオで同じ結果になること',
        '要因間の論理的整合性を確保すること',
        '過去のデータと完全に一致させること',
        '専門家の意見を統一すること'
      ],
      correctAnswer: 1,
      explanation: 'シナリオ分析の一貫性とは、設定する各経済・市場要因間の関係が経済理論に基づいて論理的に整合していることを意味します。例えば、インフレ上昇時には金利も上昇するといった因果関係の整合性が重要です。'
    },
    {
      id: 'risk-management-15-q3',
      question: '歴史的ストレステストで発見される危機時の典型的現象でないものは？',
      options: [
        '異なる資産間の相関係数が急上昇する',
        '市場の流動性が枯渇し売却困難になる',
        '全ての資産価格が安定的に推移する',
        'ボラティリティ（価格変動率）が急拡大する'
      ],
      correctAnswer: 2,
      explanation: '危機時には相関上昇・流動性枯渇・ボラティリティ拡大が典型的現象として発生します。全ての資産が安定推移することは危機時にはあり得ず、むしろ同方向への急激な価格変動が特徴です。'
    },
    {
      id: 'risk-management-15-q4',
      question: 'モンテカルロ・シミュレーションの最大の限界は？',
      options: [
        '計算に時間がかかりすぎること',
        '前提となる確率分布の設定に依存すること',
        '過去のデータが使用できないこと',
        '専門的なソフトウェアが必要なこと'
      ],
      correctAnswer: 1,
      explanation: 'モンテカルロ・シミュレーションの最大の限界は、結果が期待リターン・リスク・相関などの前提条件の設定に大きく依存することです。前提が不適切だと、どれだけ精密な計算をしても意味のない結果となります。'
    }
  ],
  lastUpdated: '2025-01-21',
  factChecked: true
};