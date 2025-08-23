import type { Lesson } from '@/types';

export const lesson16: Lesson = {
  id: 'risk-management-quantitative-risk-models',
  categoryId: 'risk-management',
  title: '定量的リスクモデルと予測手法',
  slug: 'quantitative-risk-models',
  description: 'VaR、CVaR、GARCH、ファクターモデルなどの定量的リスク評価手法と実践的な予測モデルの構築・運用について学びます',
  difficultyLevel: 'advanced',
  estimatedMinutes: 40,
  orderIndex: 16,
  content: {
    sections: [
      {
        id: 'section-1',
        title: 'VaR（バリューアットリスク）の理論と実践',
        orderIndex: 1,
        type: 'text',
        content: `
<p>VaR（Value at Risk）は、一定の信頼水準で一定期間内に発生し得る最大損失額を統計的に推定する代表的なリスク管理手法です。<br/>金融機関だけでなく、個人投資家にとっても重要なリスク評価ツールとして活用できます。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">VaRの基本概念と定義</h2>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af;">VaRの定義</h3>
<p style="margin: 0; color: #374151;">「X%の信頼水準で、Y日間に発生し得る最大損失額はZ円である」<br/>例：95%の信頼水準で1日間に発生し得る最大損失額は100万円</p>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">VaR算出の3つの主要手法</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">手法</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">原理</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">メリット</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">デメリット</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">パラメトリック法</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">正規分布仮定<br/>標準偏差×係数</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">計算簡単・高速<br/>理解しやすい</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">分布仮定の限界<br/>極端事象を軽視</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">ヒストリカル法</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">過去データの<br/>分位点を使用</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">分布仮定不要<br/>実データ使用</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">大量データ必要<br/>過去依存性</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">モンテカルロ法</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">確率分布から<br/>シミュレーション</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">柔軟な分布対応<br/>複雑モデル可能</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">計算時間大<br/>パラメータ依存</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">VaR計算の実践例</h2>

<div style="background: #f0f9ff; border: 2px solid #0ea5e9; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">
<h3 style="color: #0c4a6e; margin: 0 0 1rem 0; text-align: center;">パラメトリック法による1日VaR計算</h3>
<div style="background: white; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<p style="margin: 0; color: #374151; font-family: monospace;">前提条件：</p>
<ul style="margin: 0.5rem 0 0 0; color: #374151; padding-left: 1rem;">
<li>ポートフォリオ価値：1,000万円</li>
<li>年率ボラティリティ：20%</li>
<li>信頼水準：95%（1.645標準偏差）</li>
<li>取引日数：250日/年</li>
</ul>
<p style="margin: 1rem 0 0 0; color: #374151; font-family: monospace;"><strong>計算：</strong><br/>
1日ボラティリティ = 20% ÷ √250 = 1.26%<br/>
95% VaR = 1,000万円 × 1.26% × 1.645 = <span style="color: #dc2626; font-weight: bold;">20.7万円</span></p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">VaRの限界と注意点</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">1. テールリスクの軽視</h3>
<p style="margin: 0; color: #374151;"><strong>問題：</strong>VaRを超える損失（テールリスク）の大きさを示さない</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>対策：</strong>CVaR（Conditional VaR）による補完</p>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">2. モデルリスク</h3>
<p style="margin: 0; color: #374151;"><strong>問題：</strong>分布仮定や過去データの代表性に依存</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>対策：</strong>複数手法の併用・定期的な妥当性検証</p>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">3. 静的な評価</h3>
<p style="margin: 0; color: #374151;"><strong>問題：</strong>市場環境の動的変化を反映できない</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>対策：</strong>GARCH等の時変ボラティリティモデル活用</p>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">VaRは目安として活用</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">VaRは絶対的な基準ではなく、リスク管理の一つの指標として他の手法と組み合わせて活用することが重要です。</p>
</div>
        `
      },
      {
        id: 'section-2',
        title: 'CVaRと極値理論によるテールリスク管理',
        orderIndex: 2,
        type: 'text',
        content: `
<p>CVaR（Conditional VaR）と極値理論は、VaRでは捉えきれない極端な損失（テールリスク）を適切に評価・管理するための高度な手法です。<br/>「ブラック・スワン」的な稀な事象への備えとして、現代のリスク管理では必須の概念となっています。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">CVaR（条件付VaR）の概念と計算</h2>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af;">CVaRの定義</h3>
<p style="margin: 0; color: #374151;">VaRを超える損失が発生した場合の平均損失額<br/>「VaRを上回る損失の期待値」として計算される</p>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">VaRとCVaRの比較</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #dc2626; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">指標</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">意味</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">95%値の例</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">特徴</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">VaR</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">95%の確率で損失はこの額以下</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">100万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">閾値のみ示す</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">CVaR</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">100万円を超える損失の平均値</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">150万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">テールリスクの規模</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">極値理論（EVT）の活用</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">1. POT法（Peak Over Threshold）</h3>
<p style="margin: 0; color: #374151;"><strong>原理：</strong>一定閾値を超える極値のみをGPD（一般化パレート分布）で近似</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>活用：</strong>99%、99.9%などの高信頼水準でのVaR・CVaR推定</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">2. BM法（Block Maxima）</h3>
<p style="margin: 0; color: #374151;"><strong>原理：</strong>一定期間の最大損失をGEV（一般化極値分布）で近似</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>活用：</strong>年間最大損失の予測・リスク限度額設定</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">実践的なCVaR計算例</h2>

<div style="background: #fef2f2; border: 2px solid #dc2626; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0; text-align: center;">ヒストリカル法によるCVaR計算</h3>
<div style="background: white; padding: 1rem; border-radius: 4px;">
<p style="margin: 0; color: #374151; font-weight: 600;">過去1年間の日次損失データ（250営業日）</p>
<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; font-size: 0.9rem;">
<thead>
<tr style="background: #dc2626; color: white;">
<th style="padding: 8px; border: 1px solid #ddd;">損失ランク</th>
<th style="padding: 8px; border: 1px solid #ddd;">損失額</th>
<th style="padding: 8px; border: 1px solid #ddd;">累積確率</th>
</tr>
</thead>
<tbody>
<tr><td style="padding: 8px; border: 1px solid #ddd;">1位（最大）</td><td style="padding: 8px; border: 1px solid #ddd;">200万円</td><td style="padding: 8px; border: 1px solid #ddd;">99.6%</td></tr>
<tr><td style="padding: 8px; border: 1px solid #ddd;">⋮</td><td style="padding: 8px; border: 1px solid #ddd;">⋮</td><td style="padding: 8px; border: 1px solid #ddd;">⋮</td></tr>
<tr style="background: #fef2f2;"><td style="padding: 8px; border: 1px solid #ddd;">13位</td><td style="padding: 8px; border: 1px solid #ddd; font-weight: 600;">80万円</td><td style="padding: 8px; border: 1px solid #ddd; font-weight: 600;">95.0%</td></tr>
</tbody>
</table>
<p style="margin: 1rem 0 0 0; color: #374151;"><strong>95% VaR = 80万円</strong><br/><strong>95% CVaR = (200万 + 180万 + ... + 80万) ÷ 13 = 130万円</strong></p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">テールリスク管理の実践戦略</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #059669; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">戦略</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">具体的手法</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">効果</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">コスト</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">テールヘッジ</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">アウトオブザマネープットオプション</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">極端下落時の損失限定</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">年率0.5-2%のプレミアム</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">分散強化</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">低相関・逆相関資産の組入れ</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">危機時相関上昇の軽減</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">機会コストのみ</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">動的調整</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">ボラティリティ連動ポジション縮小</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">市況悪化時のリスク自動削減</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">取引コスト・機会損失</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">流動性確保</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">高流動性資産の一定比率維持</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">危機時の資金調達能力維持</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">低リターン資産保有</td>
</tr>
</tbody>
</table>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">コストと効果のバランス</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">テールリスク対策は保険的性格が強いため、コストと効果を慎重に検討し、自身のリスク許容度に応じて適切な水準を設定することが重要です。</p>
</div>
        `
      },
      {
        id: 'section-3',
        title: 'GARCHモデルによる時変ボラティリティ予測',
        orderIndex: 3,
        type: 'text',
        content: `
<p>GARCH（Generalized AutoRegressive Conditional Heteroskedasticity）モデルは、時間とともに変化するボラティリティを予測する代表的な計量経済学手法です。<br/>市場の不安定期には高く、安定期には低くなるボラティリティの動的変化を捉え、より精度の高いリスク予測を可能にします。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">時変ボラティリティの重要性</h2>

<div style="background: #dbeafe; border: 2px solid #2563eb; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0; text-align: center;">ボラティリティ・クラスタリング現象</h3>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
<div style="background: white; padding: 1rem; border-radius: 4px;">
<h4 style="color: #1e40af; margin: 0 0 0.5rem 0;">高ボラティリティ期</h4>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9rem;">
<li>金融危機・パンデミック時期</li>
<li>政治的不安定・選挙前後</li>
<li>中央銀行政策変更時期</li>
<li>四半期決算発表シーズン</li>
</ul>
</div>
<div style="background: white; padding: 1rem; border-radius: 4px;">
<h4 style="color: #1e40af; margin: 0 0 0.5rem 0;">低ボラティリティ期</h4>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9rem;">
<li>経済安定成長期</li>
<li>金融政策の明確性が高い期間</li>
<li>市場流動性が豊富な時期</li>
<li>地政学的安定期</li>
</ul>
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">GARCH(1,1)モデルの基本構造</h2>

<div style="background: #f0f9ff; border: 2px solid #0ea5e9; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">
<h3 style="color: #0c4a6e; margin: 0 0 1rem 0; text-align: center;">GARCH(1,1)の数式</h3>
<div style="background: white; padding: 1rem; border-radius: 4px; text-align: center; font-family: monospace; color: #374151;">
<p style="margin: 0; font-size: 1.1rem;"><strong>σ²ₜ = ω + α·ε²ₜ₋₁ + β·σ²ₜ₋₁</strong></p>
<div style="margin: 1rem 0; font-size: 0.9rem;">
<p style="margin: 0;">σ²ₜ：時点tの条件付分散（ボラティリティ²）</p>
<p style="margin: 0;">ω：定数項（長期分散）</p>
<p style="margin: 0;">α：前期残差の影響度（ショック効果）</p>
<p style="margin: 0;">β：前期分散の影響度（持続性）</p>
<p style="margin: 0;">ε²ₜ₋₁：前期の残差²（予期しない変動）</p>
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">GARCHパラメータの解釈</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">パラメータ</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">意味</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">典型的な値</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">解釈</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">α</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">ショック効果</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">0.05-0.15</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">大きいほど短期的変動に敏感</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">β</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">持続性</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">0.80-0.90</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">大きいほどボラティリティが持続</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">α+β</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">総持続性</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #374151;">0.90-0.99</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">1に近いほど長期記憶性が強い</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">実践的なGARCH予測例</h2>

<div style="background: #f0fdfa; border: 2px solid #059669; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">
<h3 style="color: #047857; margin: 0 0 1rem 0; text-align: center;">日経225のGARCH(1,1)推定結果例</h3>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
<div style="background: white; padding: 1rem; border-radius: 4px;">
<h4 style="color: #047857; margin: 0 0 0.5rem 0;">推定パラメータ</h4>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9rem;">
<li>ω = 0.0001（年率4%²）</li>
<li>α = 0.08（ショック効果）</li>
<li>β = 0.90（持続性）</li>
<li>α+β = 0.98（高持続性）</li>
</ul>
</div>
<div style="background: white; padding: 1rem; border-radius: 4px;">
<h4 style="color: #047857; margin: 0 0 0.5rem 0;">予測結果（t+1日）</h4>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9rem;">
<li>前日リターン：-3%（大幅下落）</li>
<li>前日ボラティリティ：2.5%</li>
<li>予測ボラティリティ：2.8%</li>
<li>95%VaR：69万円（↑増大）</li>
</ul>
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">GARCHモデルの拡張と応用</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">1. EGARCH（指数GARCH）</h3>
<p style="margin: 0; color: #374151;"><strong>特徴：</strong>負のショック（下落）がより大きなボラティリティ増加をもたらすレバレッジ効果を捉える</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>活用：</strong>株式市場の非対称性（下落時の方がボラティリティが上がりやすい）の分析</p>
</div>
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">2. GJR-GARCH</h3>
<p style="margin: 0; color: #374151;"><strong>特徴：</strong>正・負のショックを分けてモデル化し、より柔軟な非対称性を表現</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>活用：</strong>ボラティリティの非対称性がより顕著な個別株式やセクターETFの分析</p>
</div>
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">3. 多変量GARCH</h3>
<p style="margin: 0; color: #374151;"><strong>特徴：</strong>複数資産間のボラティリティと相関の同時変化を捉える</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>活用：</strong>ポートフォリオ全体の動的リスク管理・最適ヘッジ比率の算出</p>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">リアルタイム更新の重要性</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">GARCHモデルの予測精度を維持するには、新しいデータが得られるたびにパラメータを更新し続けることが重要です。</p>
</div>
        `
      },
      {
        id: 'section-4',
        title: 'ファクターモデルによるリスク分解と要因分析',
        orderIndex: 4,
        type: 'text',
        content: `
<p>ファクターモデルは、ポートフォリオのリターンとリスクを複数の共通要因（ファクター）に分解し、各要因の寄与度を定量的に分析する手法です。<br/>市場リスク、業種リスク、スタイルリスクなど、リスクの源泉を明確にすることで、より効果的なリスク管理が可能になります。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ファクターモデルの基本構造</h2>

<div style="background: #dbeafe; border: 2px solid #2563eb; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0; text-align: center;">多因子モデルの一般形</h3>
<div style="background: white; padding: 1rem; border-radius: 4px; text-align: center; font-family: monospace; color: #374151;">
<p style="margin: 0; font-size: 1.1rem;"><strong>rᵢ = αᵢ + β₁F₁ + β₂F₂ + ... + βₖFₖ + εᵢ</strong></p>
<div style="margin: 1rem 0; font-size: 0.9rem; text-align: left;">
<p style="margin: 0;">rᵢ：資産iのリターン</p>
<p style="margin: 0;">αᵢ：資産i固有のリターン（アルファ）</p>
<p style="margin: 0;">βⱼ：資産iのファクターjに対する感応度</p>
<p style="margin: 0;">Fⱼ：ファクターjのリターン</p>
<p style="margin: 0;">εᵢ：資産i固有の誤差項</p>
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">主要なファクター分類</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">ファクター分類</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">具体例</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">代理変数</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">リスク寄与度</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">マクロ経済</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">金利・GDP・インフレ</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">10年債・景況指数・CPI</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">40-60%</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">市場ファクター</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">市場ベータ・規模効果</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">TOPIX・時価総額</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">20-30%</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">セクター</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">業種・産業別リスク</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">33業種指数</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">10-20%</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">スタイル</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">バリュー・グロース・品質</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">PBR・ROE・財務健全性</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">10-15%</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">リスク分解の実践例</h2>

<div style="background: #f0fdfa; border: 2px solid #059669; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">
<h3 style="color: #047857; margin: 0 0 1rem 0; text-align: center;">ポートフォリオのリスク分解結果</h3>
<div style="display: grid; gap: 1rem;">
<div style="background: white; padding: 1rem; border-radius: 4px;">
<h4 style="color: #047857; margin: 0 0 0.5rem 0;">ポートフォリオ構成（100億円）</h4>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9rem;">
<li>大型株：60%（テック30%、金融20%、消費財10%）</li>
<li>中小型株：30%（成長株中心）</li>
<li>海外株式：10%（米国テック株）</li>
</ul>
</div>
<div style="background: white; padding: 1rem; border-radius: 4px;">
<h4 style="color: #047857; margin: 0 0 0.5rem 0;">リスク分解結果（年率標準偏差：18%）</h4>
<table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
<tbody>
<tr><td style="padding: 4px; border-bottom: 1px solid #ddd;">市場リスク</td><td style="padding: 4px; border-bottom: 1px solid #ddd; text-align: right; color: #dc2626;">10.8% (60%)</td></tr>
<tr><td style="padding: 4px; border-bottom: 1px solid #ddd;">セクターリスク</td><td style="padding: 4px; border-bottom: 1px solid #ddd; text-align: right; color: #dc2626;">4.3% (24%)</td></tr>
<tr><td style="padding: 4px; border-bottom: 1px solid #ddd;">スタイルリスク</td><td style="padding: 4px; border-bottom: 1px solid #ddd; text-align: right; color: #dc2626;">1.8% (10%)</td></tr>
<tr><td style="padding: 4px; border-bottom: 1px solid #ddd;">個別株リスク</td><td style="padding: 4px; border-bottom: 1px solid #ddd; text-align: right; color: #dc2626;">1.1% (6%)</td></tr>
</tbody>
</table>
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">リスク要因別管理戦略</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">1. 市場リスク管理</h3>
<p style="margin: 0; color: #374151;"><strong>手法：</strong>市場ベータの調整・指数先物でのヘッジ</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>目標：</strong>ポートフォリオベータを0.8-1.2の範囲内に維持</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">2. セクター集中リスク管理</h3>
<p style="margin: 0; color: #374151;"><strong>手法：</strong>セクター分散の強化・業種ローテーション</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>目標：</strong>単一セクターへの集中度を30%以下に制限</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">3. スタイル偏重リスク管理</h3>
<p style="margin: 0; color: #374151;"><strong>手法：</strong>バリュー・グロースのバランス調整</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>目標：</strong>極端なスタイル偏重を回避し中立的ポジション維持</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ファクター投資との連携</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #059669; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">活用シーン</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">具体的方法</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">期待効果</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">ファクターティルト</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">低ボラティリティ・高配当ファクターの選択的オーバーウェイト</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">リスク調整後リターンの向上</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">スマートベータ</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">時価総額加重から等ウェイト・最小分散への変更</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">分散効率性の改善</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">タクティカル配分</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">マクロ環境に応じたファクターローテーション</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">市場サイクルに応じた収益機会の捕捉</td>
</tr>
</tbody>
</table>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">定期的なファクター見直し</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">ファクターの有効性は時間とともに変化するため、定期的にファクター構造を見直し、新しいファクターの追加や既存ファクターの除去を検討することが重要です。</p>
</div>
        `
      },
      {
        id: 'section-5',
        title: 'AIとビッグデータを活用した次世代リスク管理',
        orderIndex: 5,
        type: 'text',
        content: `
<p>機械学習、深層学習、ビッグデータ解析技術の発展により、従来の統計手法では捉えきれない複雑なリスクパターンの発見と予測が可能になりました。<br/>AIを活用した次世代リスク管理により、より精度の高いリスク評価と迅速な対応が実現できます。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">AI活用リスク管理の主要技術</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">技術分野</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">具体的手法</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">適用領域</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">精度向上効果</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">機械学習</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">ランダムフォレスト・XGBoost</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">非線形リスクファクター発見</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+15-25%</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">深層学習</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">LSTM・Transformer</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">時系列パターン認識</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+20-35%</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">自然言語処理</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">BERT・GPT活用</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">ニュース・SNS感情分析</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+10-20%</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">ネットワーク分析</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">グラフニューラルネット</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">システミックリスク伝播</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+25-40%</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">オルタナティブデータの活用</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">1. 衛星データ分析</h3>
<p style="margin: 0; color: #374151;"><strong>データ源：</strong>工場稼働状況・交通量・農作物生育状況</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>活用：</strong>経済活動のリアルタイム把握・サプライチェーンリスク予測</p>
</div>
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">2. ソーシャルメディア分析</h3>
<p style="margin: 0; color: #374151;"><strong>データ源：</strong>Twitter・Reddit・ニュースコメント</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>活用：</strong>市場センチメント・ミーム株バブル・炎上リスクの早期発見</p>
</div>
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">3. クレジットカード・POSデータ</h3>
<p style="margin: 0; color: #374151;"><strong>データ源：</strong>消費行動・業界別売上・地域別経済活動</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>活用：</strong>小売・消費関連企業の業績予測・景気転換点の先行把握</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">AI予測モデルの実装例</h2>

<div style="background: #f0fdfa; border: 2px solid #059669; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">
<h3 style="color: #047857; margin: 0 0 1rem 0; text-align: center;">LSTMによる株価ボラティリティ予測システム</h3>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
<div style="background: white; padding: 1rem; border-radius: 4px;">
<h4 style="color: #047857; margin: 0 0 0.5rem 0;">入力データ</h4>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9rem;">
<li>過去60日の価格・出来高</li>
<li>マクロ経済指標</li>
<li>ニュース感情スコア</li>
<li>オプション市場データ</li>
</ul>
</div>
<div style="background: white; padding: 1rem; border-radius: 4px;">
<h4 style="color: #047857; margin: 0 0 0.5rem 0;">モデル構造</h4>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9rem;">
<li>LSTM層×3（隠れ層128ユニット）</li>
<li>Attention機構</li>
<li>Dropout（0.3）</li>
<li>Dense層→ボラティリティ予測</li>
</ul>
</div>
<div style="background: white; padding: 1rem; border-radius: 4px;">
<h4 style="color: #047857; margin: 0 0 0.5rem 0;">予測精度</h4>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9rem;">
<li>RMSE：0.023（従来比-30%）</li>
<li>方向的中率：67%（+12%）</li>
<li>レジーム変化検知率：78%</li>
<li>更新頻度：日次自動実行</li>
</ul>
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">リアルタイムリスク監視システム</h2>

<div style="background: #dbeafe; border: 2px solid #2563eb; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0; text-align: center;">統合リスク監視ダッシュボード</h3>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
<div style="background: white; padding: 1rem; border-radius: 4px;">
<h4 style="color: #1e40af; margin: 0 0 0.5rem 0;">監視項目</h4>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9rem;">
<li>ポートフォリオVaR・CVaR</li>
<li>個別銘柄異常値検知</li>
<li>相関構造変化アラート</li>
<li>流動性リスク指標</li>
<li>マクロリスク要因変化</li>
</ul>
</div>
<div style="background: white; padding: 1rem; border-radius: 4px;">
<h4 style="color: #1e40af; margin: 0 0 0.5rem 0;">アラート設定</h4>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9rem;">
<li>VaR閾値突破：即座通知</li>
<li>急激なボラティリティ上昇</li>
<li>異常な価格乖離発生</li>
<li>ニュースリスク検知</li>
<li>システミックリスク兆候</li>
</ul>
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">AI活用の注意点と限界</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">1. ブラックボックス問題</h3>
<p style="margin: 0; color: #374151;"><strong>課題：</strong>AIの判断根拠が不明確で説明責任が困難</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>対策：</strong>SHAP・LIME等の説明可能AI技術の併用</p>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">2. データ品質依存性</h3>
<p style="margin: 0; color: #374151;"><strong>課題：</strong>バイアスのあるデータでの学習により誤った予測</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>対策：</strong>データクリーニング・バリデーション・複数データ源の活用</p>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">3. 過学習・ゴースティング</h3>
<p style="margin: 0; color: #374151;"><strong>課題：</strong>訓練データへの過適応により汎化性能が低下</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>対策：</strong>交差検証・正則化・アンサンブル手法の採用</p>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">AIと従来手法の最適な組み合わせ</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">AIは従来手法を完全に置き換えるものではなく、補完的に活用することで最大の効果を発揮します。人間の判断と組み合わせた「Human-in-the-loop」アプローチが重要です。</p>
</div>
        `
      }
    ],
    keyPoints: [
      'VaRは統計的な最大損失額推定の基本手法だが、テールリスクは捉えられない限界がある',
      'CVaRと極値理論によりVaRを超える極端な損失リスクを適切に評価・管理できる',
      'GARCHモデルで時変するボラティリティを予測し動的なリスク管理が可能',
      'ファクターモデルによりリスク要因を分解し各要因への対策が立てやすくなる',
      'AI・ビッグデータ活用で従来手法では発見困難な複雑なリスクパターンを検出',
      'オルタナティブデータの活用でリアルタイムのリスク情報収集と早期警戒が実現',
      'AI活用時はブラックボックス問題・データ品質・過学習リスクへの注意が必要'
    ],
    summary: '定量的リスクモデルと予測手法について包括的に学習しました。VaRによる基本的リスク測定からCVaR・極値理論による高度な分析、GARCHモデルによる時変ボラティリティ予測、ファクターモデルによるリスク要因分解まで、段階的にスキルアップできます。さらにAI・機械学習・ビッグデータ技術を活用した次世代リスク管理により、従来手法では不可能だった精密なリスク評価と予測が可能になります。これらの手法を適切に組み合わせることで、市場の不確実性に対してより堅牢で効果的なリスク管理体制を構築できます。',
    practicalExamples: [
      '大手証券会社がGARCH-VaRモデルで個人顧客のリスク限度額を動的調整し信用リスクを30%削減した事例',
      'ヘッジファンドがLSTM深層学習モデルで暗号通貨ボラティリティ予測精度を40%向上させた成功例',
      '年金基金がファクターモデルでESG投資のリスク・リターン寄与度を定量分析し最適配分を実現した実例',
      'AI企業が衛星データとNLPでサプライチェーン混乱を2週間前に予測し投資判断に活用した先進事例',
      '個人投資家がオープンソースのリスクモデルツールで月次リバランシングルールを最適化した実践例'
    ],
    warningNotes: [
      '投資判断は自己責任で行い、本レッスンの内容は教育目的のみで投資勧誘ではありません',
      '定量的モデルは過去データに基づくため、前例のない新しい危機には限界があります',
      'AIモデルのブラックボックス性により予期しない結果が生じる可能性があります',
      'データ品質やモデル前提の妥当性を定期的に検証することが不可欠です',
      '高度な手法ほど複雑性が増すため、理解できる範囲での活用が重要です'
    ]
  },
  quiz: [
    {
      id: 'risk-management-16-q1',
      question: 'VaRの95%信頼水準での値が100万円の場合、これが意味することは？',
      options: [
        '95%の確率で損失は100万円になる',
        '95%の確率で損失は100万円以下になる',
        '95%の確率で利益は100万円以上になる',
        '100万円の損失が95%の確率で回復する'
      ],
      correctAnswer: 1,
      explanation: 'VaR（Value at Risk）の95%信頼水準で100万円とは、「95%の確率で損失は100万円以下に収まる」ことを意味します。言い換えると、5%の確率で100万円を超える損失が発生する可能性があります。'
    },
    {
      id: 'risk-management-16-q2',
      question: 'CVaR（条件付VaR）がVaRよりも優れている点は？',
      options: [
        '計算が簡単で理解しやすい',
        'テールリスク（極端な損失）の大きさがわかる',
        '過去データが不要である',
        '将来の利益を正確に予測できる'
      ],
      correctAnswer: 1,
      explanation: 'CVaRの最大の利点は、VaRを超える極端な損失（テールリスク）の平均的な大きさを示すことです。VaRは「閾値」のみを示しますが、CVaRは「その閾値を超えた場合の期待損失額」まで教えてくれます。'
    },
    {
      id: 'risk-management-16-q3',
      question: 'GARCHモデルの主な目的は？',
      options: [
        '株価の正確な予測',
        '時間変動するボラティリティの予測',
        '最適な売買タイミングの決定',
        '企業の財務分析'
      ],
      correctAnswer: 1,
      explanation: 'GARCHモデルの主目的は、時間とともに変化するボラティリティ（価格変動の大きさ）を予測することです。市場が不安定な時期は高く、安定期は低くなるボラティリティの動的な変化を捉えます。'
    },
    {
      id: 'risk-management-16-q4',
      question: 'AI活用リスク管理の最大の注意点は？',
      options: [
        '計算コストが高すぎること',
        '人間より必ず優秀になること',
        'ブラックボックス化で判断根拠が不明になること',
        '過去のデータが全く使えないこと'
      ],
      correctAnswer: 2,
      explanation: 'AI活用リスク管理の最大の注意点は「ブラックボックス問題」です。AIがなぜその判断に至ったかの根拠が不明確になり、説明責任や妥当性の検証が困難になる可能性があります。'
    }
  ],
  lastUpdated: '2025-01-21',
  factChecked: true
};