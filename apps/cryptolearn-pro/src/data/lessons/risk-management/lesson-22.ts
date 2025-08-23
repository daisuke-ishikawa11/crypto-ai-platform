import type { Lesson } from '@/types';

export const lesson22: Lesson = {
  id: 'risk-management-esg-sustainable-investment',
  categoryId: 'risk-management',
  title: 'ESGと持続可能投資のリスク管理',
  slug: 'esg-sustainable-investment-risk',
  description: '環境・社会・ガバナンス（ESG）要因が投資リスクに与える影響を理解し、持続可能な投資戦略のリスク管理手法を習得します',
  difficultyLevel: 'advanced',
  estimatedMinutes: 25,
  orderIndex: 22,
  content: {
    sections: [
      {
        id: 'section-1',
        title: 'ESGリスクの本質と分類',
        orderIndex: 1,
        type: 'text',
        content: `
<p>ESG（Environmental, Social, Governance）要因は、従来の財務指標では捉えきれないリスクを含み、長期的な投資パフォーマンスに大きな影響を与えます。<br/>これらのリスクを理解し、適切に管理することで、持続可能で収益性の高い投資が可能になります。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ESGリスクの3つの柱</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">分野</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">主要リスク</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">影響例</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">環境（E）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">気候変動・環境汚染・資源枯渇</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">炭素税・規制強化・座礁資産</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">社会（S）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">労働問題・人権・地域社会</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">ストライキ・ボイコット・訴訟</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">ガバナンス（G）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">企業統治・役員報酬・透明性</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">不祥事・株主訴訟・信頼失墜</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ESGリスクの時間軸別分類</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">短期リスク（1-3年）</h3>
<p style="margin: 0; color: #374151;">規制変更・ESG評価低下・消費者行動変化による即座の影響</p>
</div>
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">中期リスク（3-10年）</h3>
<p style="margin: 0; color: #374151;">技術革新・業界構造変化・サプライチェーン再編</p>
</div>
<div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 1rem;">
<h3 style="color: #047857; margin: 0 0 0.5rem 0;">長期リスク（10年以上）</h3>
<p style="margin: 0; color: #374151;">気候変動・人口動態変化・社会構造の根本的変化</p>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">マテリアリティ分析の重要性</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">業界や企業の特性に応じて、最も重要なESG要因を特定することが効果的なリスク管理の出発点です。</p>
</div>
        `
      },
      {
        id: 'section-2',
        title: '持続可能投資のリスク評価手法',
        orderIndex: 2,
        type: 'text',
        content: `
<p>持続可能投資におけるリスク評価には、従来の財務分析に加えて、ESG要因を統合した包括的なアプローチが必要です。<br/>定量化が困難な要因も多いため、多面的な評価手法を組み合わせることが重要です。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">統合的リスク評価フレームワーク</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">1. ESGスコアリング</h3>
<p style="margin: 0; color: #374151;">第三者機関のESG評価や独自指標による定量化</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">2. シナリオ分析</h3>
<p style="margin: 0; color: #374151;">気候変動・社会変化シナリオ下での影響分析</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">3. ステークホルダー分析</h3>
<p style="margin: 0; color: #374151;">顧客・従業員・地域社会・規制当局への影響評価</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">4. 座礁資産リスク評価</h3>
<p style="margin: 0; color: #374151;">技術進歩や規制変化で価値を失う資産の特定</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">主要なESG指標と測定方法</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #059669; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">分野</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">主要指標</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">測定方法</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">環境</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">CO2排出量・水使用量・廃棄物</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">データ収集・第三者検証</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">社会</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">従業員満足度・人権・地域貢献</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">調査・監査・レポート分析</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">ガバナンス</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">取締役独立性・透明性・コンプライアンス</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">公開情報・アンケート</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">座礁資産の特定と評価</h2>

<div style="background: #fffbeb; border: 1px solid #fbbf24; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="margin: 0 0 1rem 0; color: #d97706;">座礁資産の典型例</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
<li><strong>石炭火力発電所：</strong>再生可能エネルギーへの転換により稼働率低下</li>
<li><strong>内燃機関技術：</strong>電動化の進展により市場縮小</li>
<li><strong>化石燃料関連インフラ：</strong>脱炭素化により需要減少</li>
<li><strong>プラスチック製造業：</strong>循環経済への移行により需要構造変化</li>
</ul>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">動的なリスク評価</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">ESGリスクは急速に変化するため、定期的な見直しと更新が不可欠です。</p>
</div>
        `
      },
      {
        id: 'section-3',
        title: 'ESG統合投資戦略とリスク管理',
        orderIndex: 3,
        type: 'text',
        content: `
<p>ESG要因を投資プロセスに統合する際は、リスク管理の観点から体系的なアプローチが必要です。<br/>単なるスクリーニングを超えて、ESG要因を投資判断とリスク管理の中核に据えることが重要です。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ESG統合のアプローチ</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">手法</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">特徴</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">リスク管理効果</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">ネガティブスクリーニング</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">問題企業・業界の除外</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">レピュテーションリスク回避</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">ポジティブスクリーニング</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">優良企業・業界の選択</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">長期持続性向上</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">ESG統合</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">ESG要因の投資分析組込み</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">包括的リスク評価</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">エンゲージメント</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">投資先との対話・改善要求</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">能動的リスク低減</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">セクター別ESGリスク管理</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">エネルギーセクター</h3>
<p style="margin: 0; color: #374151;"><strong>重点リスク：</strong>炭素価格・規制・技術変革・座礁資産</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>管理手法：</strong>炭素集約度分析・移行戦略評価・ヘッジ戦略</p>
</div>
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">金融セクター</h3>
<p style="margin: 0; color: #374151;"><strong>重点リスク：</strong>信用リスク・気候変動・規制・ガバナンス</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>管理手法：</strong>ESGクレジット分析・ストレステスト・統治評価</p>
</div>
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">テクノロジーセクター</h3>
<p style="margin: 0; color: #374151;"><strong>重点リスク：</strong>データプライバシー・AI倫理・労働問題</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>管理手法：</strong>規制対応評価・人材リスク分析・技術倫理監査</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ESGリスクモニタリングシステム</h2>

<div style="background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="margin: 0 0 1rem 0; color: #047857;">効果的なモニタリング体制</h3>
<ol style="margin: 0; padding-left: 1.5rem; color: #374151;">
<li><strong>データ収集システム：</strong>ESG関連データの自動収集・整理</li>
<li><strong>早期警戒システム：</strong>ESG評価悪化の兆候を検知</li>
<li><strong>ダッシュボード：</strong>リアルタイムでのESGリスク可視化</li>
<li><strong>定期レポート：</strong>ポートフォリオ全体のESGリスク評価</li>
<li><strong>エスカレーション：</strong>重要なリスクの経営陣への報告</li>
</ol>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">ESGとリターンの関係理解</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">ESG投資は単なるリスク回避ではなく、長期的価値創造の機会として捉えることが重要です。</p>
</div>
        `
      },
      {
        id: 'section-4',
        title: 'グリーンウォッシング対策と透明性確保',
        orderIndex: 4,
        type: 'text',
        content: `
<p>ESG投資の拡大に伴い、グリーンウォッシング（見せかけの環境配慮）リスクが深刻化しています。<br/>真の持続可能性を見極め、透明性を確保することで、ESG投資の信頼性と効果を高めることができます。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">グリーンウォッシングの手口と特徴</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">1. 曖昧な表現</h3>
<p style="margin: 0; color: #374151;">「環境に優しい」「持続可能」など具体性に欠ける宣伝文句</p>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">2. 部分的開示</h3>
<p style="margin: 0; color: #374151;">有利な情報のみを強調し、不利な情報を隠蔽</p>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">3. 偽の認証</h3>
<p style="margin: 0; color: #374151;">存在しないか信頼性の低い認証制度の利用</p>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">4. 代替効果無視</h3>
<p style="margin: 0; color: #374151;">一部の改善により全体への悪影響を相殺できると誤解させる</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">グリーンウォッシング防止のためのデューデリジェンス</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #059669; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">検証項目</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">確認方法</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">警戒すべき兆候</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">目標設定</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">具体的数値・期限の確認</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">曖昧な表現・非現実的目標</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">進捗報告</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">第三者検証・定期更新</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">検証なし・報告遅延</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">事業戦略</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">コア事業との整合性</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">表面的取組・矛盾する事業</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">ガバナンス</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">責任体制・インセンティブ</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">責任者不明・評価未連動</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">透明性確保のベストプラクティス</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fffbeb; border: 1px solid #fbbf24; border-radius: 8px; padding: 1rem;">
<h3 style="margin: 0 0 0.5rem 0; color: #d97706;">📈 投資家サイド</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151;">
<li>独立した第三者評価の活用</li>
<li>複数データソースでの検証</li>
<li>定期的な現地調査・面談</li>
<li>パフォーマンス追跡・報告</li>
</ul>
</div>
<div style="background: #f0f9ff; border: 1px solid #60a5fa; border-radius: 8px; padding: 1rem;">
<h3 style="margin: 0 0 0.5rem 0; color: #2563eb;">🏢 投資先サイド</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151;">
<li>国際基準に基づく開示</li>
<li>外部監査・認証取得</li>
<li>ステークホルダー対話</li>
<li>包括的統合報告書</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">規制動向とコンプライアンス</h2>

<div style="background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="margin: 0 0 1rem 0; color: #047857;">主要な規制・ガイドライン</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
<li><strong>EU分類規則（タクソノミー）：</strong>持続可能な経済活動の定義</li>
<li><strong>SFDR：</strong>金融商品のサステナビリティ開示規則</li>
<li><strong>TCFD：</strong>気候関連財務情報開示タスクフォース</li>
<li><strong>SASB：</strong>サステナビリティ会計基準審議会</li>
<li><strong>国内ESG開示制度：</strong>各国の規制要求事項</li>
</ul>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">継続的な情報更新</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">ESG規制や基準は急速に発展しているため、常に最新情報を把握し対応することが重要です。</p>
</div>
        `
      }
    ],
    keyPoints: [
      'ESGリスクは環境・社会・ガバナンスの3分野で時間軸別に分類し包括的に評価',
      '持続可能投資では従来の財務分析にESG要因を統合した多面的リスク評価が必要',
      'セクター別の重点リスクを特定し適切な管理手法を適用することが効果的',
      'グリーンウォッシング防止には具体的検証と第三者評価が不可欠',
      '透明性確保により投資家・投資先双方でのベストプラクティス実践が重要',
      'ESGモニタリングシステムによりリアルタイムでのリスク管理が可能',
      '規制動向を把握しコンプライアンス体制を整備することが持続可能投資の基盤'
    ],
    summary: 'ESGと持続可能投資のリスク管理について詳しく学習しました。ESGリスクは環境・社会・ガバナンスの3分野に分類され、短期から長期まで様々な時間軸で影響を与えます。効果的なリスク管理には統合的評価フレームワーク、セクター別アプローチ、グリーンウォッシング対策が重要です。透明性を確保し、規制要求に適切に対応することで、真の持続可能投資によるリスク管理と長期価値創造が実現できます。',
    practicalExamples: [
      '石炭火力発電企業の座礁資産リスクを炭素価格シナリオで評価し投資判断に反映',
      'テクノロジー企業のデータプライバシーリスクをGDPR等規制対応状況で評価',
      '金融機関のESG統合クレジット分析で気候変動リスクを融資判断に組込み',
      '第三者ESG評価機関のスコア比較により企業の真の持続可能性を検証',
      'TCFD開示要求に基づき気候関連リスクの定量化とポートフォリオ影響分析を実施'
    ],
    warningNotes: [
      'ESG投資は必ずしも短期的な高リターンを保証するものではありません',
      'グリーンウォッシングリスクがあるため表面的な評価に頼らず詳細な検証が必要です',
      'ESGスコアや評価は提供機関により大きく異なる可能性があります',
      '規制環境は急速に変化するため継続的な情報更新と対応が必要です',
      'ESG要因の定量化は困難な場合があり主観的判断も含まれることを理解してください'
    ]
  },
  quiz: [
    {
      id: 'risk-management-22-q1',
      question: 'ESGリスクの分類として正しくないのは？',
      options: [
        '環境リスクには気候変動や環境汚染が含まれる',
        '社会リスクには労働問題や人権問題が含まれる',
        'ガバナンスリスクには企業統治や透明性が含まれる',
        'ESGリスクはすべて長期的影響のみを持つ'
      ],
      correctAnswer: 3,
      explanation: 'ESGリスクは短期（1-3年）・中期（3-10年）・長期（10年以上）の様々な時間軸で影響を与えます。例えば規制変更やESG評価低下は短期的な影響をもたらす可能性があります。'
    },
    {
      id: 'risk-management-22-q2',
      question: '座礁資産として最も典型的なのは？',
      options: [
        '最新のデジタル技術を活用した設備',
        '脱炭素化により需要が減少する化石燃料関連資産',
        '人口増加により需要拡大が見込まれる住宅',
        '技術革新により効率が向上した製造設備'
      ],
      correctAnswer: 1,
      explanation: '座礁資産とは、技術進歩や規制変化により価値を失う資産のことです。脱炭素化の進展により、石炭火力発電所や化石燃料関連インフラなどが座礁資産のリスクにさらされています。'
    },
    {
      id: 'risk-management-22-q3',
      question: 'グリーンウォッシングを防ぐために最も重要なのは？',
      options: [
        '企業の宣伝文句をそのまま信用する',
        '具体的データと第三者検証による確認',
        'ESGスコアのみに依存した評価',
        '短期的な株価パフォーマンスでの判断'
      ],
      correctAnswer: 1,
      explanation: 'グリーンウォッシングを防ぐには、曖昧な表現ではなく具体的な数値目標・進捗データを確認し、独立した第三者による検証を重視することが重要です。複数のデータソースで検証し、現地調査なども組み合わせることが効果的です。'
    },
    {
      id: 'risk-management-22-q4',
      question: 'ESG統合投資で最も効果的なリスク管理アプローチは？',
      options: [
        '問題企業を単純に除外するネガティブスクリーニングのみ',
        'ESG要因を投資分析に組み込んだ包括的評価',
        'ESG評価の高い企業のみに投資するポジティブスクリーニング',
        '短期的なESGトレンドに基づく投資判断'
      ],
      correctAnswer: 1,
      explanation: 'ESG統合投資では、単純なスクリーニングを超えて、ESG要因を従来の財務分析に組み込んだ包括的評価が最も効果的です。これにより財務リスクと非財務リスクの両方を統合的に評価できます。'
    }
  ],
  lastUpdated: '2025-01-21',
  factChecked: true
};