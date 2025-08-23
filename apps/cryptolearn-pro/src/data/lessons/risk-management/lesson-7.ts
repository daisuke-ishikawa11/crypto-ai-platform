import type { Lesson } from '@/types';

export const lesson7: Lesson = {
  id: 'risk-management-risk-tolerance-assessment',
  categoryId: 'risk-management',
  title: 'リスク許容度の決定：個人のリスクプロファイル設定と管理手法',
  slug: 'risk-tolerance-assessment',
  description: '投資家の個人的状況に基づくリスク許容度の測定方法と、それに応じた投資戦略の構築方法を学習します',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 30,
  orderIndex: 7,
  content: {
    sections: [
      {
        id: 'section-1',
        title: 'リスク許容度とは何か',
        orderIndex: 1,
        type: 'text',
        content: `
<p>リスク許容度とは、<strong>投資家が受け入れることのできる損失の程度</strong>を指します。これは投資の成功において最も重要な要素の一つです。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">リスク許容度の3つの側面</h2>

<div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
<div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 1.5rem; border-radius: 4px;">
<h3 style="color: #0c4a6e; margin: 0 0 1rem 0;">💰 財務的キャパシティ</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>損失を吸収できる財務的余力</li>
<li>年収、貯蓄、負債の状況</li>
<li>投資目標までの期間</li>
<li>緊急資金の有無</li>
</ul>
</div>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1.5rem; border-radius: 4px;">
<h3 style="color: #d97706; margin: 0 0 1rem 0;">🧠 心理的許容度</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>損失に対する感情的反応</li>
<li>価格変動に対するストレス耐性</li>
<li>投資経験とリスクに対する理解</li>
<li>睡眠を失わずに投資を続けられる範囲</li>
</ul>
</div>

<div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 1.5rem; border-radius: 4px;">
<h3 style="color: #059669; margin: 0 0 1rem 0;">⏰ 時間的許容度</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>投資期間の長さ</li>
<li>資金が必要になる時期</li>
<li>短期的な価格変動を無視できる期間</li>
<li>市場回復を待つ時間的余裕</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">年代別リスク許容度の一般的傾向</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">年代</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">リスク許容度</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">推奨株式比率</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">主な考慮事項</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">20-30代</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: 600;">高</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">80-90%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">長期投資期間</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">30-40代</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: 600;">高-中</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">70-80%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">家族責任の増加</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">40-50代</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b; font-weight: 600;">中</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">60-70%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">教育費・住宅ローン</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">50-60代</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b; font-weight: 600;">中-低</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">40-60%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">退職準備</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">60代以上</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626; font-weight: 600;">低</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">20-40%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">資産保全重視</td>
</tr>
</tbody>
</table>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">リスク許容度は個人差が大きい</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">年代だけでなく、個人の財務状況、投資経験、性格も考慮することが重要です。</p>
</div>
        `
      },
      {
        id: 'section-2',
        title: 'リスク許容度の測定方法',
        orderIndex: 2,
        type: 'text',
        content: `
<p>適切なリスク許容度を測定するには、<strong>定量的分析と定性的評価</strong>を組み合わせたアプローチが効果的です。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">1. 財務状況の定量分析</h2>

<div style="background: #f8fafc; border: 2px solid #94a3b8; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0;">基本財務指標の計算</h3>
<table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 10px; border: 1px solid #ddd; text-align: left;">指標</th>
<th style="padding: 10px; border: 1px solid #ddd; text-align: left;">計算式</th>
<th style="padding: 10px; border: 1px solid #ddd; text-align: left;">理想的な水準</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 10px; border: 1px solid #ddd;">緊急資金比率</td>
<td style="padding: 10px; border: 1px solid #ddd; color: #059669; font-weight: 600;">緊急資金 ÷ 月間生活費</td>
<td style="padding: 10px; border: 1px solid #ddd;">6-12ヶ月分</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #ddd;">投資可能資金比率</td>
<td style="padding: 10px; border: 1px solid #ddd; color: #059669; font-weight: 600;">投資可能額 ÷ 総資産</td>
<td style="padding: 10px; border: 1px solid #ddd;">10-50%</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 10px; border: 1px solid #ddd;">債務返済比率</td>
<td style="padding: 10px; border: 1px solid #ddd; color: #059669; font-weight: 600;">月間債務返済 ÷ 月収</td>
<td style="padding: 10px; border: 1px solid #ddd;">30%以下</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #ddd;">投資期間</td>
<td style="padding: 10px; border: 1px solid #ddd; color: #059669; font-weight: 600;">目標達成年 - 現在年</td>
<td style="padding: 10px; border: 1px solid #ddd;">5年以上</td>
</tr>
</tbody>
</table>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">2. 心理的リスク許容度テスト</h2>

<div style="background: #f0f9ff; border: 2px solid #0ea5e9; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #0c4a6e; margin: 0 0 1rem 0;">標準的な質問例</h3>

<div style="margin: 1.5rem 0;">
<h4 style="color: #1e40af; margin: 1rem 0 0.5rem 0;">Q1. 投資した資産が1年間で30%下落した場合、あなたの対応は？</h4>
<ul style="list-style: none; padding: 0; margin: 0;">
<li style="padding: 0.5rem; background: #fef2f2; margin: 0.5rem 0; border-radius: 4px; border-left: 4px solid #dc2626;"><strong>A:</strong> すぐに売却して損失を確定する</li>
<li style="padding: 0.5rem; background: #fef3c7; margin: 0.5rem 0; border-radius: 4px; border-left: 4px solid #f59e0b;"><strong>B:</strong> 一部を売却して損失を抑える</li>
<li style="padding: 0.5rem; background: #f0fdf4; margin: 0.5rem 0; border-radius: 4px; border-left: 4px solid #22c55e;"><strong>C:</strong> そのまま保有し続ける</li>
<li style="padding: 0.5rem; background: #e0f2fe; margin: 0.5rem 0; border-radius: 4px; border-left: 4px solid #0284c7;"><strong>D:</strong> 追加で買い増しする</li>
</ul>
</div>

<div style="margin: 1.5rem 0;">
<h4 style="color: #1e40af; margin: 1rem 0 0.5rem 0;">Q2. あなたの投資目標は何ですか？</h4>
<ul style="list-style: none; padding: 0; margin: 0;">
<li style="padding: 0.5rem; background: #fef2f2; margin: 0.5rem 0; border-radius: 4px; border-left: 4px solid #dc2626;"><strong>A:</strong> 元本を絶対に失いたくない</li>
<li style="padding: 0.5rem; background: #fef3c7; margin: 0.5rem 0; border-radius: 4px; border-left: 4px solid #f59e0b;"><strong>B:</strong> インフレに負けない程度の利回り</li>
<li style="padding: 0.5rem; background: #f0fdf4; margin: 0.5rem 0; border-radius: 4px; border-left: 4px solid #22c55e;"><strong>C:</strong> 市場平均程度の成長を期待</li>
<li style="padding: 0.5rem; background: #e0f2fe; margin: 0.5rem 0; border-radius: 4px; border-left: 4px solid #0284c7;"><strong>D:</strong> 高いリターンを積極的に追求</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">3. 総合リスクスコア算出</h2>

<div style="background: #f1f5f9; border: 2px solid #94a3b8; border-radius: 8px; padding: 1.5rem; margin: 1rem 0; text-align: center;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0;">リスク許容度スコア計算式</h3>
<p style="font-size: 1.2em; font-weight: 600; margin: 1rem 0; color: #059669;">
総合スコア = (財務スコア × 0.4) + (心理スコア × 0.4) + (時間スコア × 0.2)
</p>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1.5rem;">
<div style="background: #dbeafe; padding: 1rem; border-radius: 4px;">
<h4 style="margin: 0; color: #1e40af;">保守的</h4>
<p style="margin: 0.5rem 0; color: #374151; font-weight: 600;">0-40点</p>
</div>
<div style="background: #fef3c7; padding: 1rem; border-radius: 4px;">
<h4 style="margin: 0; color: #d97706;">バランス</h4>
<p style="margin: 0.5rem 0; color: #374151; font-weight: 600;">40-70点</p>
</div>
<div style="background: #f0fdf4; padding: 1rem; border-radius: 4px;">
<h4 style="margin: 0; color: #059669;">積極的</h4>
<p style="margin: 0.5rem 0; color: #374151; font-weight: 600;">70-100点</p>
</div>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">定期的な見直しが重要</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">ライフステージの変化に応じて、年1回程度はリスク許容度を見直しましょう。</p>
</div>
        `
      },
      {
        id: 'section-3',
        title: 'リスクプロファイル別投資戦略',
        orderIndex: 3,
        type: 'text',
        content: `
<p>測定されたリスク許容度に基づいて、<strong>適切な資産配分と投資戦略</strong>を構築することが重要です。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">3つのリスクプロファイル別戦略</h2>

<div style="display: grid; gap: 2rem; margin: 2rem 0;">

<div style="background: #e0f2fe; border: 3px solid #0284c7; border-radius: 12px; padding: 2rem;">
<h3 style="color: #0c4a6e; margin: 0 0 1.5rem 0; text-align: center; font-size: 1.3em;">🛡️ 保守的投資家 (リスクスコア 0-40)</h3>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
<div>
<h4 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">推奨資産配分</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>株式：20-30%</li>
<li>債券：50-60%</li>
<li>現金・預金：20-30%</li>
<li>暗号通貨：0-5%</li>
</ul>
</div>
<div>
<h4 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">投資商品例</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>国債・社債ETF</li>
<li>バランス型投信</li>
<li>高配当株ETF</li>
<li>定期預金</li>
</ul>
</div>
</div>

<div style="background: #f0f9ff; border: 1px solid #0ea5e9; padding: 1rem; border-radius: 6px;">
<p style="margin: 0; color: #0c4a6e; font-weight: 500;">特徴：安定性重視、年3-5%の着実な成長を目指す</p>
</div>
</div>

<div style="background: #fef3c7; border: 3px solid #f59e0b; border-radius: 12px; padding: 2rem;">
<h3 style="color: #d97706; margin: 0 0 1.5rem 0; text-align: center; font-size: 1.3em;">⚖️ バランス型投資家 (リスクスコア 40-70)</h3>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
<div>
<h4 style="color: #d97706; margin: 0 0 0.5rem 0;">推奨資産配分</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>株式：50-60%</li>
<li>債券：20-30%</li>
<li>現金・預金：10-20%</li>
<li>暗号通貨：5-10%</li>
</ul>
</div>
<div>
<h4 style="color: #d97706; margin: 0 0 0.5rem 0;">投資商品例</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>全世界株式インデックス</li>
<li>国内外の株式ETF</li>
<li>一部成長株・個別銘柄</li>
<li>主要暗号通貨（BTC/ETH）</li>
</ul>
</div>
</div>

<div style="background: #fef7e0; border: 1px solid #f59e0b; padding: 1rem; border-radius: 6px;">
<p style="margin: 0; color: #d97706; font-weight: 500;">特徴：成長と安定のバランス、年5-8%の成長を目指す</p>
</div>
</div>

<div style="background: #f0fdf4; border: 3px solid #22c55e; border-radius: 12px; padding: 2rem;">
<h3 style="color: #059669; margin: 0 0 1.5rem 0; text-align: center; font-size: 1.3em;">🚀 積極的投資家 (リスクスコア 70-100)</h3>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
<div>
<h4 style="color: #059669; margin: 0 0 0.5rem 0;">推奨資産配分</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>株式：70-80%</li>
<li>債券：0-10%</li>
<li>現金・預金：5-10%</li>
<li>暗号通貨：10-20%</li>
</ul>
</div>
<div>
<h4 style="color: #059669; margin: 0 0 0.5rem 0;">投資商品例</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>成長株・テーマ株ETF</li>
<li>新興国株式</li>
<li>個別成長株</li>
<li>アルトコイン分散投資</li>
</ul>
</div>
</div>

<div style="background: #e8f5e8; border: 1px solid #22c55e; padding: 1rem; border-radius: 6px;">
<p style="margin: 0; color: #059669; font-weight: 500;">特徴：高成長重視、年8-15%の高リターンを目指す</p>
</div>
</div>

</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">暗号通貨におけるリスク許容度の考慮</h2>

<div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0; display: flex; align-items: center;">⚠️ 暗号通貨特有のリスク</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>極端な価格変動</strong>：1日で20-50%の値動き</li>
<li><strong>24時間市場</strong>：休日なしの継続的なストレス</li>
<li><strong>規制リスク</strong>：政府規制による急激な市場変化</li>
<li><strong>技術リスク</strong>：ハッキング、システム障害</li>
<li><strong>流動性リスク</strong>：アルトコインの急激な流動性低下</li>
</ul>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">リスクレベル別暗号通貨投資額の目安</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">リスクタイプ</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">総資産に対する暗号通貨比率</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">推奨銘柄</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">投資スタンス</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">保守的</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">0-5%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">BTC, ETHのみ</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">長期保有のみ</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">バランス</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">5-10%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">主要通貨中心</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">積立+一部売買</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">積極的</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">10-20%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">アルトコイン含む</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">アクティブ取引</td>
</tr>
</tbody>
</table>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">「失っても生活に支障のない金額」が鉄則</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">暗号通貨は最もリスクの高い投資の一つです。どんなにリスク許容度が高くても、全資産の20%を超えない範囲で投資しましょう。</p>
</div>
        `
      },
      {
        id: 'section-4',
        title: 'リスク許容度の定期的な見直し',
        orderIndex: 4,
        type: 'text',
        content: `
<p>リスク許容度は固定的なものではありません。<strong>ライフステージや市場環境の変化</strong>に応じて定期的に見直すことが重要です。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">見直しが必要なライフイベント</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 1rem; border-radius: 4px;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0; display: flex; align-items: center;">💒 家族構成の変化</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>結婚・離婚</li>
<li>子どもの誕生</li>
<li>親の介護開始</li>
<li>家族の独立</li>
</ul>
</div>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem; border-radius: 4px;">
<h3 style="color: #d97706; margin: 0 0 0.5rem 0; display: flex; align-items: center;">💼 キャリア・収入の変化</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>転職・昇進</li>
<li>起業・独立</li>
<li>退職・定年</li>
<li>大幅な収入増減</li>
</ul>
</div>

<div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 1rem; border-radius: 4px;">
<h3 style="color: #059669; margin: 0 0 0.5rem 0; display: flex; align-items: center;">🏠 資産・負債の変化</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>住宅購入・売却</li>
<li>相続・贈与</li>
<li>大きな借金の完済</li>
<li>予期せぬ大きな支出</li>
</ul>
</div>

<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0; display: flex; align-items: center;">📊 市場環境の変化</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>大幅な市場下落の経験</li>
<li>予想以上の投資成果</li>
<li>新たな金融商品の理解</li>
<li>投資経験の蓄積</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">年次リスク許容度チェックリスト</h2>

<div style="background: #f8fafc; border: 2px solid #94a3b8; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0;">🔍 毎年確認すべき項目</h3>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
<div>
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">財務状況</h4>
<ul style="list-style: none; margin: 0; padding: 0;">
<li style="padding: 0.3rem 0; border-bottom: 1px solid #e5e7eb;">□ 年収の変化</li>
<li style="padding: 0.3rem 0; border-bottom: 1px solid #e5e7eb;">□ 貯蓄額の変化</li>
<li style="padding: 0.3rem 0; border-bottom: 1px solid #e5e7eb;">□ 債務残高の変化</li>
<li style="padding: 0.3rem 0; border-bottom: 1px solid #e5e7eb;">□ 緊急資金の充実度</li>
<li style="padding: 0.3rem 0;">□ 保険加入状況</li>
</ul>
</div>

<div>
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">投資環境</h4>
<ul style="list-style: none; margin: 0; padding: 0;">
<li style="padding: 0.3rem 0; border-bottom: 1px solid #e5e7eb;">□ 投資目標の変化</li>
<li style="padding: 0.3rem 0; border-bottom: 1px solid #e5e7eb;">□ 投資期間の残存年数</li>
<li style="padding: 0.3rem 0; border-bottom: 1px solid #e5e7eb;">□ 投資経験の蓄積</li>
<li style="padding: 0.3rem 0; border-bottom: 1px solid #e5e7eb;">□ 市場下落への心理的反応</li>
<li style="padding: 0.3rem 0;">□ 新しい投資知識の習得</li>
</ul>
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">リスク許容度変化への対応</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">変化の方向</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">主な要因</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">推奨対応</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">調整期間</th>
</tr>
</thead>
<tbody>
<tr style="background: #dcfce7;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600; color: #059669;">許容度上昇</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">
• 収入増加<br/>
• 投資経験蓄積<br/>
• 投資期間延長
</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">
• 株式比率を徐々に増加<br/>
• 成長投資への配分拡大<br/>
• 新しい投資商品検討
</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">3-6ヶ月</td>
</tr>
<tr style="background: #fef2f2;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600; color: #dc2626;">許容度低下</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">
• 退職近接<br/>
• 家族責任増加<br/>
• 大きな損失経験
</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">
• 債券・現金比率増加<br/>
• リスク資産の段階的売却<br/>
• 安定収入型投資へシフト
</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">6-12ヶ月</td>
</tr>
</tbody>
</table>

<h2 style="color: #dc2626; margin: 2rem 0 1rem 0;">⚠️ 暗号通貨投資での注意点</h2>

<div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong style="color: #dc2626;">感情的な判断を避ける</strong>：価格急騰時にリスク許容度を過大評価しがち</li>
<li><strong style="color: #dc2626;">段階的な調整</strong>：暗号通貨比率の急激な変更は避ける</li>
<li><strong style="color: #dc2626;">長期視点を維持</strong>：短期的な価格変動に一喜一憂しない</li>
<li><strong style="color: #dc2626;">定期的な利益確定</strong>：リスク許容度を超えた含み益は部分的に利確</li>
</ul>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">リスク許容度は「守るべき基準」</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">市場の好調時でもリスク許容度を超えた投資は控え、調整が必要な場合は段階的に行いましょう。</p>
</div>
        `
      }
    ],
    keyPoints: [
      'リスク許容度は財務的キャパシティ、心理的許容度、時間的許容度の3つの側面から構成される',
      '年代、収入、家族構成、投資経験などを総合的に評価してリスクプロファイルを設定する',
      '保守的、バランス、積極的の3つのタイプに応じた適切な資産配分を構築する',
      '暗号通貨投資では特に慎重なリスク管理が必要で、総資産の20%を上限とする',
      'ライフイベントや市場環境の変化に応じて定期的にリスク許容度を見直す',
      'リスク許容度を超えた投資は長期的な投資成功を阻害するため厳格に管理する',
      'リスク許容度の変更は段階的に行い、感情的な判断を避けることが重要'
    ],
    summary: 'リスク許容度の適切な測定と管理は投資成功の基礎となります。財務状況、心理的特性、投資期間を総合的に評価し、個人に最適なリスクプロファイルを設定することで、持続可能な投資戦略を構築できます。特に暗号通貨投資では高いボラティリティを考慮した慎重なリスク管理が不可欠です。',
    practicalExamples: [
      '30代会社員：年収500万円、貯蓄200万円の場合→バランス型で株式60%、暗号通貨5-10%の配分',
      '50代管理職：年収800万円、子どもの教育費控える場合→保守的寄りで株式40%、暗号通貨3%以下',
      'リスクスコア75の積極投資家：株式80%、暗号通貨15%、定期的なリバランスで利益確定',
      '投資経験豊富な投資家が大損失を経験→リスク許容度を再評価し、安全資産比率を20%増加',
      '年次見直しで子どもが独立→空いた教育費分でリスク資産への配分を10%増加'
    ],
    warningNotes: [
      'リスク許容度を超えた投資は精神的ストレスと判断力の低下を招く可能性があります',
      '市場好調時にリスク許容度を過大評価し、調整時に大きな損失を被るリスクがあります',
      '暗号通貨の極端なボラティリティは従来のリスク測定手法では捕捉しきれない場合があります',
      'ライフステージの変化を無視したリスク管理は将来の資金需要に対応できない可能性があります',
      'このレッスンの情報は教育目的であり、個人の投資判断は専門家との相談を推奨します'
    ]
  },
  
  quiz: [
    {
      id: 'risk-management-7-q1',
      question: 'リスク許容度の3つの側面として正しいものはどれですか？',
      options: [
        '財務的キャパシティ、心理的許容度、市場動向',
        '財務的キャパシティ、心理的許容度、時間的許容度',
        '収入水準、投資経験、年齢',
        '資産額、家族構成、職業'
      ],
      correctAnswer: 1,
      explanation: 'リスク許容度は財務的キャパシティ（損失を吸収できる財務的余力）、心理的許容度（損失に対する感情的反応）、時間的許容度（投資期間と回復を待つ時間的余裕）の3つの側面から構成されます。'
    },
    {
      id: 'risk-management-7-q2',
      question: 'バランス型投資家の推奨資産配分として最も適切なものはどれですか？',
      options: [
        '株式30%、債券50%、現金20%',
        '株式55%、債券25%、現金15%、暗号通貨5%',
        '株式80%、債券5%、現金5%、暗号通貨10%',
        '株式20%、債券60%、現金20%'
      ],
      correctAnswer: 1,
      explanation: 'バランス型投資家（リスクスコア40-70）には、株式50-60%、債券20-30%、現金・預金10-20%、暗号通貨5-10%の配分が推奨されます。成長と安定のバランスを取った構成です。'
    },
    {
      id: 'risk-management-7-q3',
      question: '暗号通貨投資における総資産に対する推奨上限は？',
      options: [
        '30%',
        '25%',
        '20%',
        '15%'
      ],
      correctAnswer: 2,
      explanation: '暗号通貨は極めて高いボラティリティを持つため、どんなにリスク許容度が高い投資家でも総資産の20%を超えない範囲での投資が推奨されます。'
    },
    {
      id: 'risk-management-7-q4',
      question: 'リスク許容度の見直しが特に必要なタイミングはいつですか？',
      options: [
        '市場が好調な時のみ',
        '年1回の定期的な見直し',
        'ライフイベントや市場環境の大きな変化時',
        '投資成績が悪い時のみ'
      ],
      correctAnswer: 2,
      explanation: 'リスク許容度は結婚・出産・転職・退職などのライフイベントや、大きな市場変動を経験した時に見直しが必要です。年1回の定期チェックに加えて、大きな変化があった時は随時見直しましょう。'
    }
  ],
  
  lastUpdated: '2025-08-21',
  factChecked: true
この章を修了することで、以下のスキルを身につけることができます：
- 高度なリスク管理手法の理解
- 実践的な応用方法の習得  
- リスク要因の特定と対策
- 具体的な実装戦略の策定
<h3>重要性</h3>
現代の投資環境において、高度なリスク管理は投資成功にとって不可欠な要素です。適切な知識と実践により、投資リスクを効果的に管理し、長期的な資産形成を実現することができます。`
      },
      
      {
        type: 'text',
        title: '基本概念',
        content: `<h3>定義と特徴</h3>
現代の投資管理において重要な概念について学習します。
<h4>主要な特徴</h4>
1. <strong>リスク管理との統合</strong>
   - 包括的なリスク評価
   - 多角的な分析手法
   - 継続的なモニタリング
2. <strong>実践的応用</strong>
   - 具体的な実装方法
   - 測定可能な指標
   - 検証可能な結果
3. <strong>長期的視点</strong>
   - 持続可能な戦略
   - 適応的なアプローチ
   - 継続的な改善`
      },
      {
        type: 'quiz',
        title: '理解度チェック',
        questions: [
          {
            id: 'q1',
            questionType: 'multiple_choice',
            question: 'リスク管理において最も重要な要素は何ですか？',
            options: [
              '短期的な利益の追求',
              '包括的なリスク評価',
              '投資額の最大化',
              '市場タイミングの予測'
            ],
            correctAnswer: '包括的なリスク評価',
            explanation: 'リスク管理では、包括的な評価が最も重要です。'
          }
        ]
      }
    ],
    keyPoints: [
      '高度なリスク管理手法の基本概念を理解',
      '実践的な応用方法を習得',
      'リスク要因の適切な特定方法を学習',
      '継続的なモニタリングの重要性を認識'
    ],
    summary: 'このレッスンでは、高度なリスク管理手法について学習しました。適切な知識と実践により、投資リスクを効果的に管理できます。'
  },

  quiz: [
    {
      id: 'risk-management-7-q1',
      question: 'このレッスンの主要なポイントは何ですか？',
      options: [
        'オプション1',
        'オプション2', 
        'オプション3',
        'オプション4'
      ],
      correctAnswer: 1,
      explanation: '詳細な説明がここに入ります。'
    }
  ],
  lastUpdated: '2024-12-09',
  factChecked: true

};