import type { Lesson } from '@/types';

export const lesson5: Lesson = {
  id: 'financial-literacy-risk-management',
  categoryId: 'financial-literacy',
  title: 'リスク管理の基本原則',
  slug: 'risk-management-fundamentals',
  description: 'リスクとリターンの関係を理解し、適切なリスク管理手法を学んで安全な投資を実践する方法を習得します',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 30,
  orderIndex: 5,
  content: {
    sections: [
      {
        id: 'section-1',
        title: 'リスクとは何か',
        orderIndex: 1,
        type: 'text',
        content: `
<p>投資におけるリスクとは、期待したリターンが得られない可能性のことです。<br/>
リスクを正しく理解し、適切に管理することが、長期的な投資成功の鍵となります。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">リスクの本質</h2>

<div style="background: linear-gradient(135deg, #f87171 0%, #dc2626 100%); color: white; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<h3 style="font-size: 1.5em; margin: 0 0 1rem 0; text-align: center;">リスク ≠ 危険</h3>
<p style="text-align: center; font-size: 1.2em;">リスクは「不確実性」であり、上振れも下振れも含む</p>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 1.5rem;">
<div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem; text-align: center;">
<div style="font-size: 1.5em;">⬆️ 上振れリスク</div>
<p style="margin: 0.5rem 0 0 0;">期待以上の利益</p>
</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem; text-align: center;">
<div style="font-size: 1.5em;">⬇️ 下振れリスク</div>
<p style="margin: 0.5rem 0 0 0;">期待以下の損失</p>
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">主要なリスクの種類</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #3b82f6; color: white;">
<th style="padding: 1rem; text-align: left; border: 1px solid #2563eb;">リスクの種類</th>
<th style="padding: 1rem; text-align: left; border: 1px solid #2563eb;">説明</th>
<th style="padding: 1rem; text-align: left; border: 1px solid #2563eb;">具体例</th>
</tr>
</thead>
<tbody>
<tr style="background: white;">
<td style="padding: 1rem; border: 1px solid #e5e7eb; font-weight: bold; color: #dc2626;">市場リスク</td>
<td style="padding: 1rem; border: 1px solid #e5e7eb;">市場全体の変動による損失</td>
<td style="padding: 1rem; border: 1px solid #e5e7eb;">株式市場の暴落、金利上昇</td>
</tr>
<tr style="background: #f9fafb;">
<td style="padding: 1rem; border: 1px solid #e5e7eb; font-weight: bold; color: #d97706;">信用リスク</td>
<td style="padding: 1rem; border: 1px solid #e5e7eb;">相手方の債務不履行</td>
<td style="padding: 1rem; border: 1px solid #e5e7eb;">企業倒産、債券デフォルト</td>
</tr>
<tr style="background: white;">
<td style="padding: 1rem; border: 1px solid #e5e7eb; font-weight: bold; color: #16a34a;">流動性リスク</td>
<td style="padding: 1rem; border: 1px solid #e5e7eb;">売買が困難になる</td>
<td style="padding: 1rem; border: 1px solid #e5e7eb;">出来高の少ない銘柄、不動産</td>
</tr>
<tr style="background: #f9fafb;">
<td style="padding: 1rem; border: 1px solid #e5e7eb; font-weight: bold; color: #2563eb;">為替リスク</td>
<td style="padding: 1rem; border: 1px solid #e5e7eb;">為替変動による損失</td>
<td style="padding: 1rem; border: 1px solid #e5e7eb;">外国株式、外貨建て債券</td>
</tr>
<tr style="background: white;">
<td style="padding: 1rem; border: 1px solid #e5e7eb; font-weight: bold; color: #7c3aed;">インフレリスク</td>
<td style="padding: 1rem; border: 1px solid #e5e7eb;">物価上昇で実質価値減少</td>
<td style="padding: 1rem; border: 1px solid #e5e7eb;">現金、低金利の預金</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">リスクとリターンの関係</h2>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<h3 style="color: #1f2937; margin: 0 0 1rem 0; text-align: center;">リスクとリターンの基本法則</h3>
<div style="background: linear-gradient(90deg, #dcfce7 0%, #fee2e2 100%); border-radius: 8px; padding: 2rem; margin: 1rem 0;">
<p style="text-align: center; font-size: 1.3em; font-weight: bold; margin: 0;">
ハイリスク・ハイリターン ⇔ ローリスク・ローリターン
</p>
<p style="text-align: center; margin: 1rem 0 0 0; color: #6b7280;">
高いリターンを求めるなら、相応のリスクを取る必要がある
</p>
</div>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1.5rem;">
<div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 8px; padding: 1rem; text-align: center;">
<h4 style="color: #16a34a; margin: 0;">低リスク</h4>
<p style="font-size: 2em; margin: 0.5rem 0; color: #16a34a;">1-3%</p>
<p style="margin: 0; font-size: 0.9em;">預金・国債</p>
</div>
<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 1rem; text-align: center;">
<h4 style="color: #d97706; margin: 0;">中リスク</h4>
<p style="font-size: 2em; margin: 0.5rem 0; color: #d97706;">5-10%</p>
<p style="margin: 0; font-size: 0.9em;">株式・投資信託</p>
</div>
<div style="background: #fee2e2; border: 2px solid #ef4444; border-radius: 8px; padding: 1rem; text-align: center;">
<h4 style="color: #dc2626; margin: 0;">高リスク</h4>
<p style="font-size: 2em; margin: 0.5rem 0; color: #dc2626;">15%+</p>
<p style="margin: 0; font-size: 0.9em;">暗号資産・レバレッジ</p>
</div>
</div>
</div>
        `
      },
      {
        id: 'section-2',
        title: 'リスク許容度の把握',
        orderIndex: 2,
        type: 'text',
        content: `
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">あなたのリスク許容度を知る</h2>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<h3 style="font-size: 1.5em; margin: 0 0 1rem 0; text-align: center;">リスク許容度を決める3要素</h3>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1.5rem;">
<div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem;">
<h4 style="margin: 0 0 0.5rem 0; text-align: center;">💰 財務的余裕</h4>
<p style="margin: 0; font-size: 0.9em;">資産・収入・支出</p>
</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem;">
<h4 style="margin: 0 0 0.5rem 0; text-align: center;">⏰ 投資期間</h4>
<p style="margin: 0; font-size: 0.9em;">短期・中期・長期</p>
</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem;">
<h4 style="margin: 0 0 0.5rem 0; text-align: center;">🧠 心理的耐性</h4>
<p style="margin: 0; font-size: 0.9em;">ストレス耐性</p>
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">年代別リスク許容度の目安</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">

<div style="background: white; border: 2px solid #10b981; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #16a34a; margin: 0 0 1rem 0;">20-30代</h3>
<div style="background: #dcfce7; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<p style="margin: 0; font-weight: bold;">リスク許容度：高</p>
</div>
<ul style="margin: 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;">回復時間が長い</li>
<li style="margin: 0.5rem 0;">株式70-80%推奨</li>
<li style="margin: 0.5rem 0;">積極的な成長投資</li>
</ul>
</div>

<div style="background: white; border: 2px solid #f59e0b; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #d97706; margin: 0 0 1rem 0;">40-50代</h3>
<div style="background: #fef3c7; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<p style="margin: 0; font-weight: bold;">リスク許容度：中</p>
</div>
<ul style="margin: 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;">バランス重視</li>
<li style="margin: 0.5rem 0;">株式50-60%推奨</li>
<li style="margin: 0.5rem 0;">分散投資を徹底</li>
</ul>
</div>

<div style="background: white; border: 2px solid #6366f1; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #4f46e5; margin: 0 0 1rem 0;">60代以上</h3>
<div style="background: #e0e7ff; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<p style="margin: 0; font-weight: bold;">リスク許容度：低</p>
</div>
<ul style="margin: 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;">資産保全重視</li>
<li style="margin: 0.5rem 0;">株式30-40%推奨</li>
<li style="margin: 0.5rem 0;">安定収入確保</li>
</ul>
</div>

<div style="background: white; border: 2px solid #ef4444; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0;">例外ケース</h3>
<div style="background: #fee2e2; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<p style="margin: 0; font-weight: bold;">個別事情を考慮</p>
</div>
<ul style="margin: 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;">多額の資産保有者</li>
<li style="margin: 0.5rem 0;">安定収入のない方</li>
<li style="margin: 0.5rem 0;">扶養家族が多い方</li>
</ul>
</div>

</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">リスク許容度診断テスト</h2>

<div style="background: #f8fafc; border: 2px solid #cbd5e1; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<h3 style="color: #475569; margin: 0 0 1.5rem 0;">以下の質問に答えて、あなたのタイプを診断</h3>
<table style="width: 100%; border-collapse: collapse;">
<thead>
<tr style="background: #e2e8f0;">
<th style="padding: 0.75rem; text-align: left;">質問</th>
<th style="padding: 0.75rem; text-align: center;">A（1点）</th>
<th style="padding: 0.75rem; text-align: center;">B（2点）</th>
<th style="padding: 0.75rem; text-align: center;">C（3点）</th>
</tr>
</thead>
<tbody>
<tr>
<td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0;">投資で20%損失した場合</td>
<td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e2e8f0;">即売却</td>
<td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e2e8f0;">様子見</td>
<td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e2e8f0;">買い増し</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0;">投資期間の想定</td>
<td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e2e8f0;">1年以内</td>
<td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e2e8f0;">3-5年</td>
<td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e2e8f0;">10年以上</td>
</tr>
<tr>
<td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0;">値動きの激しい投資</td>
<td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e2e8f0;">避ける</td>
<td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e2e8f0;">少し含む</td>
<td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e2e8f0;">積極的に</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 0.75rem;">緊急資金の確保</td>
<td style="padding: 0.75rem; text-align: center;">12ヶ月分</td>
<td style="padding: 0.75rem; text-align: center;">6ヶ月分</td>
<td style="padding: 0.75rem; text-align: center;">3ヶ月分</td>
</tr>
</tbody>
</table>
<div style="background: #dbeafe; border-radius: 8px; padding: 1rem; margin-top: 1.5rem;">
<p style="margin: 0;"><strong>診断結果：</strong> 4-6点＝保守的 / 7-9点＝バランス型 / 10-12点＝積極的</p>
</div>
</div>
        `
      },
      {
        id: 'section-3',
        title: '分散投資の実践',
        orderIndex: 3,
        type: 'text',
        content: `
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">分散投資の重要性</h2>

<div style="background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%); color: white; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<h3 style="font-size: 1.5em; margin: 0 0 1rem 0; text-align: center;">"Don't put all your eggs in one basket"</h3>
<p style="text-align: center; font-size: 1.1em;">すべての卵を一つのカゴに入れるな</p>
<p style="text-align: center; margin: 1rem 0 0 0;">分散投資はリスクを減らしながら、安定したリターンを目指す基本戦略</p>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">4つの分散方法</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">

<div style="background: white; border: 2px solid #3b82f6; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #2563eb; margin: 0 0 1rem 0;">1. 資産クラスの分散</h3>
<div style="background: #eff6ff; border-radius: 8px; padding: 1rem;">
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem;">
<div style="background: #3b82f6; color: white; padding: 0.5rem; border-radius: 4px; text-align: center;">株式 40%</div>
<div style="background: #10b981; color: white; padding: 0.5rem; border-radius: 4px; text-align: center;">債券 30%</div>
<div style="background: #f59e0b; color: white; padding: 0.5rem; border-radius: 4px; text-align: center;">不動産 20%</div>
<div style="background: #ef4444; color: white; padding: 0.5rem; border-radius: 4px; text-align: center;">金・商品 10%</div>
</div>
</div>
<p style="margin: 1rem 0 0 0; font-size: 0.9em;">異なる値動きの資産を組み合わせる</p>
</div>

<div style="background: white; border: 2px solid #10b981; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #16a34a; margin: 0 0 1rem 0;">2. 地域の分散</h3>
<div style="background: #dcfce7; border-radius: 8px; padding: 1rem;">
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem;">
<div style="background: #dc2626; color: white; padding: 0.5rem; border-radius: 4px; text-align: center;">日本 30%</div>
<div style="background: #2563eb; color: white; padding: 0.5rem; border-radius: 4px; text-align: center;">米国 40%</div>
<div style="background: #16a34a; color: white; padding: 0.5rem; border-radius: 4px; text-align: center;">欧州 20%</div>
<div style="background: #f59e0b; color: white; padding: 0.5rem; border-radius: 4px; text-align: center;">新興国 10%</div>
</div>
</div>
<p style="margin: 1rem 0 0 0; font-size: 0.9em;">カントリーリスクを分散</p>
</div>

<div style="background: white; border: 2px solid #f59e0b; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #d97706; margin: 0 0 1rem 0;">3. セクターの分散</h3>
<div style="background: #fef3c7; border-radius: 8px; padding: 1rem;">
<ul style="margin: 0; padding-left: 1.5rem;">
<li style="margin: 0.3rem 0;">テクノロジー 25%</li>
<li style="margin: 0.3rem 0;">ヘルスケア 20%</li>
<li style="margin: 0.3rem 0;">金融 15%</li>
<li style="margin: 0.3rem 0;">消費財 15%</li>
<li style="margin: 0.3rem 0;">その他 25%</li>
</ul>
</div>
<p style="margin: 1rem 0 0 0; font-size: 0.9em;">業種別リスクを軽減</p>
</div>

<div style="background: white; border: 2px solid #7c3aed; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #7c3aed; margin: 0 0 1rem 0;">4. 時間の分散</h3>
<div style="background: #f3e8ff; border-radius: 8px; padding: 1rem;">
<p style="margin: 0; text-align: center; font-weight: bold;">ドルコスト平均法</p>
<p style="margin: 0.5rem 0 0 0; text-align: center;">毎月定額購入</p>
</div>
<p style="margin: 1rem 0 0 0; font-size: 0.9em;">購入タイミングのリスクを分散</p>
</div>

</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">効果的なポートフォリオ例</h2>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<h3 style="color: #1f2937; margin: 0 0 1.5rem 0;">リスク許容度別の推奨配分</h3>

<table style="width: 100%; border-collapse: collapse;">
<thead>
<tr style="background: #4f46e5; color: white;">
<th style="padding: 1rem; text-align: left;">資産クラス</th>
<th style="padding: 1rem; text-align: center;">保守的</th>
<th style="padding: 1rem; text-align: center;">バランス</th>
<th style="padding: 1rem; text-align: center;">積極的</th>
</tr>
</thead>
<tbody>
<tr style="background: white;">
<td style="padding: 0.75rem; border: 1px solid #e5e7eb;">国内株式</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb;">10%</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb;">20%</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb;">30%</td>
</tr>
<tr style="background: #f9fafb;">
<td style="padding: 0.75rem; border: 1px solid #e5e7eb;">先進国株式</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb;">10%</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb;">25%</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb;">40%</td>
</tr>
<tr style="background: white;">
<td style="padding: 0.75rem; border: 1px solid #e5e7eb;">新興国株式</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb;">0%</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb;">5%</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb;">10%</td>
</tr>
<tr style="background: #f9fafb;">
<td style="padding: 0.75rem; border: 1px solid #e5e7eb;">国内債券</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb;">40%</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb;">25%</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb;">10%</td>
</tr>
<tr style="background: white;">
<td style="padding: 0.75rem; border: 1px solid #e5e7eb;">先進国債券</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb;">20%</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb;">15%</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb;">5%</td>
</tr>
<tr style="background: #f9fafb;">
<td style="padding: 0.75rem; border: 1px solid #e5e7eb;">REIT・その他</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb;">5%</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb;">10%</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb;">5%</td>
</tr>
<tr style="background: white;">
<td style="padding: 0.75rem; border: 1px solid #e5e7eb;">現金・預金</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb;">15%</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb;">0%</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb;">0%</td>
</tr>
<tr style="background: #dbeafe;">
<td style="padding: 0.75rem; border: 1px solid #e5e7eb; font-weight: bold;">期待リターン</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb; font-weight: bold;">3-5%</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb; font-weight: bold;">5-8%</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb; font-weight: bold;">8-12%</td>
</tr>
</tbody>
</table>
</div>
        `
      },
      {
        id: 'section-4',
        title: '損切りと利確の戦略',
        orderIndex: 4,
        type: 'text',
        content: `
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">損切りの重要性</h2>

<div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<h3 style="font-size: 1.5em; margin: 0 0 1rem 0; text-align: center;">損小利大の原則</h3>
<p style="text-align: center; font-size: 1.2em;">損失は小さく抑え、利益は大きく伸ばす</p>
<div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem; margin: 1.5rem 0;">
<p style="text-align: center; margin: 0; font-size: 1.1em;">
勝率40%でも、損切り1:利確2.5なら利益が出る
</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">損切りルールの設定</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">

<div style="background: white; border: 2px solid #ef4444; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0;">パーセンテージ法</h3>
<div style="background: #fee2e2; border-radius: 8px; padding: 1rem;">
<p style="margin: 0; text-align: center; font-weight: bold; font-size: 1.2em;">-7%ルール</p>
</div>
<ul style="margin: 1rem 0 0 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;">購入価格から7%下落で売却</li>
<li style="margin: 0.5rem 0;">機械的に実行</li>
<li style="margin: 0.5rem 0;">感情を排除</li>
</ul>
</div>

<div style="background: white; border: 2px solid #f59e0b; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #d97706; margin: 0 0 1rem 0;">サポートライン法</h3>
<div style="background: #fef3c7; border-radius: 8px; padding: 1rem;">
<p style="margin: 0; text-align: center; font-weight: bold; font-size: 1.2em;">重要な価格帯</p>
</div>
<ul style="margin: 1rem 0 0 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;">チャート分析で判断</li>
<li style="margin: 0.5rem 0;">サポート割れで売却</li>
<li style="margin: 0.5rem 0;">テクニカル重視</li>
</ul>
</div>

<div style="background: white; border: 2px solid #3b82f6; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #2563eb; margin: 0 0 1rem 0;">時間的損切り</h3>
<div style="background: #eff6ff; border-radius: 8px; padding: 1rem;">
<p style="margin: 0; text-align: center; font-weight: bold; font-size: 1.2em;">30日ルール</p>
</div>
<ul style="margin: 1rem 0 0 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;">一定期間で判断</li>
<li style="margin: 0.5rem 0;">機会損失を防ぐ</li>
<li style="margin: 0.5rem 0;">資金効率重視</li>
</ul>
</div>

<div style="background: white; border: 2px solid #10b981; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #16a34a; margin: 0 0 1rem 0;">ATR法</h3>
<div style="background: #dcfce7; border-radius: 8px; padding: 1rem;">
<p style="margin: 0; text-align: center; font-weight: bold; font-size: 1.2em;">ボラティリティ考慮</p>
</div>
<ul style="margin: 1rem 0 0 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;">銘柄の値動きに応じて</li>
<li style="margin: 0.5rem 0;">ATR×2で損切り</li>
<li style="margin: 0.5rem 0;">柔軟な対応</li>
</ul>
</div>

</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">利益確定の戦略</h2>

<div style="background: white; border: 2px solid #10b981; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<h3 style="color: #16a34a; margin: 0 0 1.5rem 0;">段階的利確のすすめ</h3>

<table style="width: 100%; border-collapse: collapse;">
<thead>
<tr style="background: #16a34a; color: white;">
<th style="padding: 0.75rem; text-align: center;">利益率</th>
<th style="padding: 0.75rem; text-align: center;">売却割合</th>
<th style="padding: 0.75rem; text-align: left;">理由</th>
</tr>
</thead>
<tbody>
<tr style="background: #f0fdf4;">
<td style="padding: 0.75rem; text-align: center; border: 1px solid #dcfce7; font-weight: bold;">+20%</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #dcfce7;">25%売却</td>
<td style="padding: 0.75rem; border: 1px solid #dcfce7;">元本の一部回収</td>
</tr>
<tr style="background: white;">
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb; font-weight: bold;">+50%</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb;">25%売却</td>
<td style="padding: 0.75rem; border: 1px solid #e5e7eb;">利益の確保</td>
</tr>
<tr style="background: #f0fdf4;">
<td style="padding: 0.75rem; text-align: center; border: 1px solid #dcfce7; font-weight: bold;">+100%</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #dcfce7;">25%売却</td>
<td style="padding: 0.75rem; border: 1px solid #dcfce7;">大幅利益の実現</td>
</tr>
<tr style="background: white;">
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb; font-weight: bold;">残り25%</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb;">長期保有</td>
<td style="padding: 0.75rem; border: 1px solid #e5e7eb;">さらなる上昇に期待</td>
</tr>
</tbody>
</table>

<div style="background: #dcfce7; border-radius: 8px; padding: 1rem; margin-top: 1.5rem;">
<p style="margin: 0;"><strong>メリット：</strong>利益を確保しながら、上昇余地も残せる</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">トレーリングストップの活用</h2>

<div style="background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%); color: white; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<h3 style="margin: 0 0 1rem 0;">利益を守りながら伸ばす手法</h3>
<div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<p style="margin: 0;"><strong>例：</strong>最高値から10%下落で自動売却</p>
</div>
<ul style="margin: 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;">100円→120円（最高値）→108円で売却</li>
<li style="margin: 0.5rem 0;">利益を守りながら上昇を狙える</li>
<li style="margin: 0.5rem 0;">感情に左右されない</li>
</ul>
</div>
        `
      },
      {
        id: 'section-5',
        title: 'ポジションサイジング',
        orderIndex: 5,
        type: 'text',
        content: `
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ポジションサイズの決め方</h2>

<div style="background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); color: white; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<h3 style="font-size: 1.5em; margin: 0 0 1rem 0; text-align: center;">ケリーの公式</h3>
<div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<p style="text-align: center; margin: 0; font-size: 1.2em;">
f = (p × b - q) / b
</p>
<p style="text-align: center; margin: 0.5rem 0 0 0; font-size: 0.9em;">
f: 投資割合 / p: 勝率 / b: 利益率 / q: 敗率
</p>
</div>
<p style="text-align: center; margin: 1rem 0 0 0;">最適な投資額を数学的に算出</p>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">実践的なポジションサイズ管理</h2>

<div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin: 2rem 0;">

<div style="background: white; border: 2px solid #3b82f6; border-radius: 12px; padding: 2rem;">
<h3 style="color: #2563eb; margin: 0 0 1.5rem 0;">2%ルール</h3>
<div style="background: #eff6ff; border-radius: 8px; padding: 1.5rem;">
<p style="margin: 0; font-weight: bold; text-align: center; font-size: 1.2em;">1回の取引で失ってよい金額は総資産の2%まで</p>
</div>
<div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 1rem; margin: 1.5rem 0;">
<h4 style="color: #475569; margin: 0 0 0.5rem 0;">計算例：総資産500万円の場合</h4>
<ul style="margin: 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;">許容損失額：10万円（500万円×2%）</li>
<li style="margin: 0.5rem 0;">7%損切りルール適用時</li>
<li style="margin: 0.5rem 0;">最大投資額：約142万円（10万円÷7%）</li>
</ul>
</div>
</div>

<div style="background: white; border: 2px solid #10b981; border-radius: 12px; padding: 2rem;">
<h3 style="color: #16a34a; margin: 0 0 1.5rem 0;">リスクレベル別配分</h3>
<table style="width: 100%; border-collapse: collapse;">
<thead>
<tr style="background: #16a34a; color: white;">
<th style="padding: 0.75rem; text-align: left;">投資対象</th>
<th style="padding: 0.75rem; text-align: center;">リスクレベル</th>
<th style="padding: 0.75rem; text-align: center;">最大配分</th>
</tr>
</thead>
<tbody>
<tr style="background: #dcfce7;">
<td style="padding: 0.75rem; border: 1px solid #bbf7d0;">大型優良株</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #bbf7d0;">低</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #bbf7d0; font-weight: bold;">10-15%</td>
</tr>
<tr style="background: white;">
<td style="padding: 0.75rem; border: 1px solid #e5e7eb;">成長株</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb;">中</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #e5e7eb; font-weight: bold;">5-10%</td>
</tr>
<tr style="background: #fef3c7;">
<td style="padding: 0.75rem; border: 1px solid #fde68a;">小型株</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #fde68a;">高</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #fde68a; font-weight: bold;">3-5%</td>
</tr>
<tr style="background: #fee2e2;">
<td style="padding: 0.75rem; border: 1px solid #fecaca;">暗号資産・レバレッジ</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #fecaca;">超高</td>
<td style="padding: 0.75rem; text-align: center; border: 1px solid #fecaca; font-weight: bold;">1-3%</td>
</tr>
</tbody>
</table>
</div>

<div style="background: white; border: 2px solid #7c3aed; border-radius: 12px; padding: 2rem;">
<h3 style="color: #7c3aed; margin: 0 0 1.5rem 0;">ピラミッティング戦略</h3>
<div style="background: linear-gradient(180deg, #f3e8ff 0%, #e9d5ff 100%); border-radius: 8px; padding: 1.5rem;">
<div style="text-align: center;">
<div style="width: 0; height: 0; border-left: 150px solid transparent; border-right: 150px solid transparent; border-bottom: 100px solid #7c3aed; margin: 0 auto;"></div>
<div style="margin-top: 1rem;">
<p style="margin: 0.5rem 0;"><strong>初回：</strong>50%投入</p>
<p style="margin: 0.5rem 0;"><strong>+10%上昇：</strong>30%追加</p>
<p style="margin: 0.5rem 0;"><strong>+20%上昇：</strong>20%追加</p>
</div>
</div>
</div>
<p style="margin: 1rem 0 0 0;">利益が出ている時に買い増し、リスクを抑えながら利益を拡大</p>
</div>

</div>
        `
      },
      {
        id: 'section-6',
        title: 'リスク管理の実践とまとめ',
        orderIndex: 6,
        type: 'text',
        content: `
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">リスク管理チェックリスト</h2>

<div style="background: white; border: 2px solid #3b82f6; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<h3 style="color: #2563eb; margin: 0 0 1.5rem 0;">投資前の確認事項</h3>
<div style="display: grid; grid-template-columns: 1fr; gap: 0.75rem;">
<label style="display: flex; align-items: center; padding: 0.75rem; background: #f8fafc; border-radius: 4px; cursor: pointer;">
<input type="checkbox" style="margin-right: 0.75rem;"/>
<span>緊急資金（生活費3-6ヶ月分）は確保されているか</span>
</label>
<label style="display: flex; align-items: center; padding: 0.75rem; background: #f8fafc; border-radius: 4px; cursor: pointer;">
<input type="checkbox" style="margin-right: 0.75rem;"/>
<span>投資額は余裕資金の範囲内か</span>
</label>
<label style="display: flex; align-items: center; padding: 0.75rem; background: #f8fafc; border-radius: 4px; cursor: pointer;">
<input type="checkbox" style="margin-right: 0.75rem;"/>
<span>損切りラインを決めているか</span>
</label>
<label style="display: flex; align-items: center; padding: 0.75rem; background: #f8fafc; border-radius: 4px; cursor: pointer;">
<input type="checkbox" style="margin-right: 0.75rem;"/>
<span>ポジションサイズは適切か（1銘柄5%以下）</span>
</label>
<label style="display: flex; align-items: center; padding: 0.75rem; background: #f8fafc; border-radius: 4px; cursor: pointer;">
<input type="checkbox" style="margin-right: 0.75rem;"/>
<span>分散投資を行っているか</span>
</label>
<label style="display: flex; align-items: center; padding: 0.75rem; background: #f8fafc; border-radius: 4px; cursor: pointer;">
<input type="checkbox" style="margin-right: 0.75rem;"/>
<span>投資の目的と期間が明確か</span>
</label>
</div>
<div style="background: #fef3c7; border-radius: 8px; padding: 1rem; margin-top: 1.5rem;">
<p style="margin: 0; color: #92400e;"><strong>すべてにチェックがつくまで投資を開始しない</strong></p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">よくある失敗パターンと対策</h2>

<div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin: 2rem 0;">

<div style="background: #fee2e2; border: 2px solid #ef4444; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0;">❌ 失敗例1：集中投資の罠</h3>
<div style="background: white; border-radius: 8px; padding: 1rem;">
<p style="margin: 0;"><strong>状況：</strong>「絶対上がる」と確信した1銘柄に全額投資</p>
<p style="margin: 0.5rem 0;"><strong>結果：</strong>予想外の悪材料で-50%の大損失</p>
</div>
<p style="margin: 1rem 0 0 0; color: #7f1d1d;"><strong>教訓：</strong>どんなに確信があっても分散投資を徹底する</p>
</div>

<div style="background: #fee2e2; border: 2px solid #ef4444; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0;">❌ 失敗例2：損切りできない心理</h3>
<div style="background: white; border-radius: 8px; padding: 1rem;">
<p style="margin: 0;"><strong>状況：</strong>「いつか戻る」と信じて塩漬け</p>
<p style="margin: 0.5rem 0;"><strong>結果：</strong>資金が固定化し、機会損失が拡大</p>
</div>
<p style="margin: 1rem 0 0 0; color: #7f1d1d;"><strong>教訓：</strong>事前に決めた損切りルールを必ず実行</p>
</div>

<div style="background: #fee2e2; border: 2px solid #ef4444; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0;">❌ 失敗例3：レバレッジの誘惑</h3>
<div style="background: white; border-radius: 8px; padding: 1rem;">
<p style="margin: 0;"><strong>状況：</strong>早く儲けたくてレバレッジ3倍</p>
<p style="margin: 0.5rem 0;"><strong>結果：</strong>わずかな下落で強制ロスカット</p>
</div>
<p style="margin: 1rem 0 0 0; color: #7f1d1d;"><strong>教訓：</strong>初心者はレバレッジを使わない</p>
</div>

</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">成功する投資家のリスク管理</h2>

<div style="background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%); color: white; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<h3 style="font-size: 1.3em; margin: 0 0 1.5rem 0; text-align: center;">プロ投資家の鉄則</h3>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
<div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem;">
<h4 style="margin: 0 0 0.5rem 0;">📊 ルール1</h4>
<p style="margin: 0;">資金管理が最優先</p>
</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem;">
<h4 style="margin: 0 0 0.5rem 0;">🛡️ ルール2</h4>
<p style="margin: 0;">守りを固めてから攻める</p>
</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem;">
<h4 style="margin: 0 0 0.5rem 0;">⚖️ ルール3</h4>
<p style="margin: 0;">リスクとリターンのバランス</p>
</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem;">
<h4 style="margin: 0 0 0.5rem 0;">📝 ルール4</h4>
<p style="margin: 0;">記録と検証の継続</p>
</div>
</div>
</div>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0;">
<h3 style="color: #d97706; margin: 0 0 1rem 0;">⚠️ 重要な注意事項</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
<li style="margin: 0.5rem 0;">本レッスンは一般的なリスク管理の知識提供であり、個別の投資アドバイスではありません</li>
<li style="margin: 0.5rem 0;">投資は必ず自己責任で行い、損失の可能性を十分理解してください</li>
<li style="margin: 0.5rem 0;">必要に応じて、ファイナンシャルプランナー等の専門家にご相談ください</li>
<li style="margin: 0.5rem 0;">借金をしての投資は絶対に避けてください</li>
</ul>
</div>

<div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<h3 style="color: #2563eb; margin: 0 0 1rem 0;">📚 まとめ</h3>
<p style="margin: 0.5rem 0;">リスク管理は投資成功の最重要要素です。以下を実践しましょう：</p>
<ul style="margin: 1rem 0 0 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;"><strong>リスクの理解：</strong>リスクは不確実性であり、適切に管理可能</li>
<li style="margin: 0.5rem 0;"><strong>分散投資：</strong>資産・地域・セクター・時間の4つの分散</li>
<li style="margin: 0.5rem 0;"><strong>損切りルール：</strong>-7%で機械的に実行</li>
<li style="margin: 0.5rem 0;"><strong>ポジションサイズ：</strong>1銘柄最大5%、2%ルールの徹底</li>
<li style="margin: 0.5rem 0;"><strong>継続的な管理：</strong>定期的な見直しと調整</li>
</ul>
<p style="margin: 1rem 0 0 0; font-weight: bold; color: #1e40af;">「リスクを制する者が、市場を制する」</p>
</div>
        `
      }
    ],
    keyPoints: [
      'リスクは「不確実性」であり、上振れも下振れも含む概念',
      'リスクとリターンは比例関係にある（ハイリスク・ハイリターン）',
      '分散投資により、リスクを減らしながら安定リターンを目指す',
      '損切りは小さく（-7%）、利益は大きく伸ばす「損小利大」',
      'ポジションサイズは1銘柄最大5%、総資産の2%ルールを守る'
    ],
    summary: 'リスク管理は投資成功の土台です。リスクの本質を理解し、自分のリスク許容度を把握した上で、分散投資、適切な損切り、ポジションサイジングを実践することで、長期的に安定した投資成果を目指せます。',
    practicalExamples: [
      '分散投資例：株式40%、債券30%、不動産20%、金10%',
      '損切り例：購入価格から7%下落で機械的に売却',
      '段階的利確：+20%で25%売却、+50%で25%売却、+100%で25%売却',
      '2%ルール：総資産500万円なら1取引の最大損失10万円',
      'ピラミッティング：利益が出たら段階的に買い増し'
    ],
    warningNotes: [
      '本レッスンは一般的なリスク管理の知識提供であり、個別の投資アドバイスではありません',
      '投資は必ず自己責任で行ってください',
      '必要に応じて専門家にご相談ください',
      '借金をしての投資は絶対に避けてください'
    ]
  },
  quiz: [
    {
      id: 'q1',
      question: 'リスクとリターンの関係として正しいものは？',
      options: [
        'リスクが高いほどリターンも高い傾向がある',
        'リスクとリターンは無関係',
        'リスクが低いほどリターンが高い',
        'リスクを取らなくても高リターンが得られる'
      ],
      correctAnswer: 0,
      explanation: 'リスクとリターンは比例関係にあり、高いリターンを求めるなら相応のリスクを取る必要があります。'
    },
    {
      id: 'q2',
      question: '2%ルールとは何を指しますか？',
      options: [
        '利益が2%出たら売却する',
        '1回の取引で失ってよい金額は総資産の2%まで',
        '毎月2%ずつ投資額を増やす',
        'ポートフォリオの2%を現金で持つ'
      ],
      correctAnswer: 1,
      explanation: '2%ルールは、1回の取引で失ってもよい金額を総資産の2%までに制限するリスク管理手法です。'
    },
    {
      id: 'q3',
      question: '分散投資の方法として含まれないものは？',
      options: [
        '資産クラスの分散',
        '地域の分散',
        'レバレッジの分散',
        '時間の分散'
      ],
      correctAnswer: 2,
      explanation: '分散投資の基本は、資産クラス・地域・セクター・時間の4つの分散です。レバレッジは分散投資の方法ではありません。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};