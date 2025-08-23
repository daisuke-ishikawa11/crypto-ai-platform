import type { Lesson } from '@/types';

export const lesson2: Lesson = {
  id: 'financial-literacy-compound-interest',
  categoryId: 'financial-literacy',
  title: '複利効果の威力と計算方法',
  slug: 'compound-interest-power',
  description: '複利がもたらす資産成長の驚異的な力を学び、具体的な計算方法と活用方法を理解します',
  difficultyLevel: 'beginner',
  estimatedMinutes: 20,
  orderIndex: 2,
  content: {
    sections: [
      {
        id: 'section-1',
        title: '複利とは何か',
        orderIndex: 1,
        type: 'text',
        content: `
<p>複利とは「利息が利息を生む」仕組みです。<br/>単純に見えますが、時間が経つにつれて驚異的な威力を発揮します。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">複利の基本概念</h2>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #d97706; margin: 0 0 1rem 0; text-align: center;">単利の仕組み</h3>
<p style="margin: 0 0 1rem 0; text-align: center; font-size: 1.1em; color: #374151;">元本にのみ利息がつく</p>
<div style="text-align: center; font-size: 1.2em; font-weight: bold; color: #d97706;">100万円 → 105万円 → 110万円</div>
<p style="margin: 1rem 0 0 0; text-align: center; font-size: 0.9em; color: #6b7280;">毎年5万円ずつ増加</p>
</div>
<div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0; text-align: center;">複利の仕組み</h3>
<p style="margin: 0 0 1rem 0; text-align: center; font-size: 1.1em; color: #374151;">元本＋利息に利息がつく</p>
<div style="text-align: center; font-size: 1.2em; font-weight: bold; color: #1e40af;">100万円 → 105万円 → 110.25万円</div>
<p style="margin: 1rem 0 0 0; text-align: center; font-size: 0.9em; color: #6b7280;">2年目は5.25万円増加</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">アインシュタインの言葉</h2>

<div style="background: #f1f5f9; border: 2px solid #94a3b8; border-radius: 8px; padding: 2rem; text-align: center; margin: 1rem 0;">
<p style="font-size: 1.3em; font-weight: 600; margin: 0 0 1rem 0; color: #1e40af;">"複利は人類最大の発明だ"</p>
<p style="font-size: 1.1em; margin: 0; color: #374151;">- アルベルト・アインシュタイン</p>
<p style="font-size: 0.9em; margin: 1rem 0 0 0; color: #6b7280;">複利を理解している人は利益を得て、理解しない人は利息を払う</p>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">複利効果の3つの要素</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">要素</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">内容</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">効果</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">元本（P）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">投資する金額</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">大きいほど効果大</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">利率（R）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">年間の利回り</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">高いほど効果大</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">期間（T）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">投資を続ける年数</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #d97706; font-weight: 600;">最も重要な要素</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">複利の計算式</h2>

<div style="background: #f8fafc; border: 2px solid #94a3b8; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0; text-align: center;">複利の基本公式</h3>
<div style="text-align: center; font-size: 1.3em; font-weight: bold; color: #1e40af; margin: 1rem 0;">
将来価値 = 元本 × (1 + 利率)^年数
</div>
<div style="text-align: center; font-size: 1.1em; color: #374151;">
FV = P × (1 + r)^t
</div>
<div style="margin: 1rem 0; padding: 1rem; background: white; border-radius: 4px;">
<p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1e40af;">計算例：100万円を年利5%で10年運用</p>
<p style="margin: 0; color: #374151;">FV = 100万円 × (1.05)^10 = 162.9万円</p>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">時間こそが複利効果の最大の武器</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">若いうちから始めることで、少額でも大きな資産を築くことができます。</p>
</div>
        `
      },
      {
        id: 'section-2',
        title: '複利と単利の具体的な違い',
        orderIndex: 2,
        type: 'text',
        content: `
<p>具体的な数字で複利と単利の違いを見てみましょう。<br/>時間が経つほど、その差は劇的に大きくなります。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">100万円を年利5%で運用した場合</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">年数</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">単利</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">複利</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">差額</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">差額率</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">1年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">105万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">105万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">0円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">0%</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">5年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">125万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">128万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">3万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">2.4%</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">10年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">150万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">163万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">13万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">8.7%</td>
</tr>
<tr style="background: #fef3c7;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">20年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">200万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #d97706;">265万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #d97706;">65万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #d97706;">32.5%</td>
</tr>
<tr style="background: #dcfce7;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">30年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">250万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: 600;">432万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: 600;">182万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: 600;">72.8%</td>
</tr>
<tr style="background: #e0f2fe;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">40年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">300万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #0284c7; font-weight: 600;">704万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #0284c7; font-weight: 600;">404万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #0284c7; font-weight: 600;">134.7%</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">毎月3万円積立の場合（年利6%）</h2>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1.5rem 0;">
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem; text-align: center;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">10年後</h3>
<p style="margin: 0 0 0.5rem 0; font-size: 0.9em; color: #6b7280;">元本：360万円</p>
<p style="margin: 0; font-size: 1.3em; font-weight: bold; color: #0284c7;">490万円</p>
<p style="margin: 0.5rem 0 0 0; font-size: 0.9em; color: #059669;">+130万円（36%増）</p>
</div>
<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem; text-align: center;">
<h3 style="color: #d97706; margin: 0 0 0.5rem 0;">20年後</h3>
<p style="margin: 0 0 0.5rem 0; font-size: 0.9em; color: #6b7280;">元本：720万円</p>
<p style="margin: 0; font-size: 1.3em; font-weight: bold; color: #f59e0b;">1,380万円</p>
<p style="margin: 0.5rem 0 0 0; font-size: 0.9em; color: #059669;">+660万円（92%増）</p>
</div>
<div style="background: #dcfce7; border-left: 4px solid #22c55e; padding: 1rem; text-align: center;">
<h3 style="color: #059669; margin: 0 0 0.5rem 0;">30年後</h3>
<p style="margin: 0 0 0.5rem 0; font-size: 0.9em; color: #6b7280;">元本：1,080万円</p>
<p style="margin: 0; font-size: 1.3em; font-weight: bold; color: #059669;">3,010万円</p>
<p style="margin: 0.5rem 0 0 0; font-size: 0.9em; color: #059669;">+1,930万円（179%増）</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">異なる利率での成長比較（100万円投資）</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #059669; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">年利</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">10年後</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">20年後</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">30年後</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">3%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">134万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">181万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">243万円</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">5%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">163万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">265万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">432万円</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">7%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">197万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">387万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">761万円</td>
</tr>
<tr style="background: #dcfce7;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">10%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: 600;">259万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: 600;">673万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: 600;">1,745万円</td>
</tr>
</tbody>
</table>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">複利は雪だるま式に成長する</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">最初は小さな差でも、時間とともに爆発的な違いになります。20年を過ぎると加速度的に差が開きます。</p>
</div>
        `
      },
      {
        id: 'section-3',
        title: '72の法則と115の法則',
        orderIndex: 3,
        type: 'text',
        content: `
<p>複利効果を簡単に計算できる便利な法則があります。<br/>これらの法則を使えば、電卓なしでも瞬時に計算できます。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">72の法則（元本が2倍になる期間）</h2>

<div style="background: #f8fafc; border: 2px solid #94a3b8; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0; text-align: center;">72の法則の公式</h3>
<div style="text-align: center; font-size: 1.3em; font-weight: bold; color: #1e40af; margin: 1rem 0;">
元本が2倍になる年数 = 72 ÷ 年利率(%)
</div>
</div>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">年利率</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">2倍になる期間</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">実例（100万円→200万円）</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">1%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">72年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #6b7280;">銀行定期預金レベル</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">3%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">24年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">国債・社債レベル</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">5%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">14.4年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">バランス型投信</td>
</tr>
<tr style="background: #dcfce7;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">6%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: 600;">12年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">株式投資の平均</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">8%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">9年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">成長株投資</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">10%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #d97706;">7.2年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #d97706;">ハイリスク投資</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">12%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">6年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">非常にハイリスク</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">115の法則（元本が3倍になる期間）</h2>

<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #059669; margin: 0 0 1rem 0; text-align: center;">115の法則の公式</h3>
<div style="text-align: center; font-size: 1.3em; font-weight: bold; color: #059669; margin: 1rem 0;">
元本が3倍になる年数 = 115 ÷ 年利率(%)
</div>
</div>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #059669; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">年利率</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">3倍になる期間</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">実例（100万円→300万円）</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">5%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">23年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">退職金運用など</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">6%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">19.2年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">長期株式投資</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">7%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">16.4年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">積極運用</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">10%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #d97706;">11.5年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #d97706;">成長株ポートフォリオ</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">複利計算の実用例</h2>

<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #d97706; margin: 0 0 1rem 0;">🎯 目標設定の例</h3>
<p style="margin: 0 0 1rem 0; font-weight: 600; color: #374151;">「60歳までに3,000万円を作りたい」</p>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
<li style="margin: 0.5rem 0;">現在30歳、投資期間30年</li>
<li style="margin: 0.5rem 0;">年利6%で運用する場合</li>
<li style="margin: 0.5rem 0;"><strong style="color: #d97706;">必要な毎月積立額：約3万円</strong></li>
<li style="margin: 0.5rem 0;">元本総額：1,080万円 → 3,010万円に成長</li>
</ul>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">72の法則は暗算の強い味方</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">投資判断をする際、瞬時に「何年で倍になるか」を計算できると、適切な投資商品を選べます。</p>
</div>
        `
      },
      {
        id: 'section-4',
        title: '積立投資と複利効果',
        orderIndex: 4,
        type: 'text',
        content: `
<p>毎月コツコツと積み立てる投資は、複利効果と相性抜群です。<br/>少額でも継続することで、驚くほどの資産を築けます。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">積立投資のシミュレーション</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">毎月積立額</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">10年後</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">20年後</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">30年後</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">1万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">163万円<br/><span style="font-size: 0.9em; color: #6b7280;">(元本120万円)</span></td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">460万円<br/><span style="font-size: 0.9em; color: #6b7280;">(元本240万円)</span></td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">1,004万円<br/><span style="font-size: 0.9em; color: #6b7280;">(元本360万円)</span></td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">2万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">327万円<br/><span style="font-size: 0.9em; color: #6b7280;">(元本240万円)</span></td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">920万円<br/><span style="font-size: 0.9em; color: #6b7280;">(元本480万円)</span></td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">2,007万円<br/><span style="font-size: 0.9em; color: #6b7280;">(元本720万円)</span></td>
</tr>
<tr style="background: #dcfce7;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">3万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">490万円<br/><span style="font-size: 0.9em; color: #6b7280;">(元本360万円)</span></td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">1,380万円<br/><span style="font-size: 0.9em; color: #6b7280;">(元本720万円)</span></td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: 600;">3,010万円<br/><span style="font-size: 0.9em; color: #6b7280;">(元本1,080万円)</span></td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">5万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">817万円<br/><span style="font-size: 0.9em; color: #6b7280;">(元本600万円)</span></td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #d97706;">2,301万円<br/><span style="font-size: 0.9em; color: #6b7280;">(元本1,200万円)</span></td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #d97706; font-weight: 600;">5,017万円<br/><span style="font-size: 0.9em; color: #6b7280;">(元本1,800万円)</span></td>
</tr>
</tbody>
</table>
<p style="font-size: 0.9em; color: #6b7280; margin: 0.5rem 0;">※年利6%で計算</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ドルコスト平均法の効果</h2>

<div style="background: #f8fafc; border: 2px solid #94a3b8; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0;">定額積立のメリット</h3>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0;">
<div style="background: white; border-radius: 4px; padding: 1rem;">
<h4 style="color: #059669; margin: 0 0 0.5rem 0;">📈 価格が高い時</h4>
<p style="margin: 0; color: #374151;">購入口数が少なくなる<br/>→ 高値掴みを防げる</p>
</div>
<div style="background: white; border-radius: 4px; padding: 1rem;">
<h4 style="color: #0284c7; margin: 0 0 0.5rem 0;">📉 価格が安い時</h4>
<p style="margin: 0; color: #374151;">購入口数が多くなる<br/>→ 安値で多く買える</p>
</div>
</div>
<p style="margin: 1rem 0 0 0; text-align: center; font-weight: 600; color: #1e40af;">結果：平均購入単価を抑えられる</p>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">年齢別・積立投資の目安</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #059669; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">年齢</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">目標</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">推奨積立額</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">60歳時の予想資産</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">25歳</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">老後資金</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">月2万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: 600;">3,280万円</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">30歳</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">老後資金</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">月3万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: 600;">3,010万円</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">35歳</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">老後資金</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">月4万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">2,740万円</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">40歳</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">老後資金</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">月5万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #d97706;">2,301万円</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">45歳</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">老後資金</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">月7万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #d97706;">2,058万円</td>
</tr>
</tbody>
</table>
<p style="font-size: 0.9em; color: #6b7280; margin: 0.5rem 0;">※年利6%で計算、60歳まで継続した場合</p>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">積立投資は「時間」が最大の味方</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">早く始めるほど、少ない金額で大きな資産を築けます。25歳から月2万円は、40歳から月5万円より効果的です。</p>
</div>
        `
      },
      {
        id: 'section-5',
        title: '複利効果を最大化する方法',
        orderIndex: 5,
        type: 'text',
        content: `
<p>複利効果を最大限に活用するための実践的な方法を学びましょう。<br/>正しい戦略で、あなたの資産形成を加速させることができます。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">複利効果を高める5つの戦略</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; border-radius: 4px;">
<h3 style="color: #1e40af; margin: 0 0 0.5rem 0;">1. 早期スタート戦略</h3>
<p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1e40af;">1年でも早く始める</p>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
<li>25歳から始めれば35歳からの2倍の効果</li>
<li>最初の10年の複利効果は最後の10年と同等の価値</li>
<li>少額でも構わないので今すぐ始める</li>
</ul>
</div>

<div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 1rem; border-radius: 4px;">
<h3 style="color: #059669; margin: 0 0 0.5rem 0;">2. 再投資戦略</h3>
<p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #059669;">配当・利息をすべて再投資</p>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
<li>配当金は使わず再投資に回す</li>
<li>利息も元本に組み入れる</li>
<li>自動再投資設定を活用する</li>
</ul>
</div>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem; border-radius: 4px;">
<h3 style="color: #d97706; margin: 0 0 0.5rem 0;">3. 増額戦略</h3>
<p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #d97706;">収入増加に合わせて積立額を増やす</p>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
<li>昇給分の50%を投資に回す</li>
<li>ボーナスの一部を追加投資</li>
<li>年1回は積立額を見直す</li>
</ul>
</div>

<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">4. 手数料削減戦略</h3>
<p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #dc2626;">コストを最小限に抑える</p>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
<li>手数料の低いインデックスファンドを選ぶ</li>
<li>売買頻度を減らして手数料を節約</li>
<li>NISA・iDeCoなど税制優遇制度を活用</li>
</ul>
</div>

<div style="background: #f3e8ff; border-left: 4px solid #9333ea; padding: 1rem; border-radius: 4px;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">5. 継続戦略</h3>
<p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #7c3aed;">市場変動に動じず継続する</p>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
<li>下落時も積立を継続（むしろチャンス）</li>
<li>感情的な売買を避ける</li>
<li>長期視点を忘れない</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">税制優遇制度の活用</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">制度名</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">年間上限</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">税制メリット</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">複利効果への影響</th>
</tr>
</thead>
<tbody>
<tr style="background: #dcfce7;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">新NISA<br/>(つみたて枠)</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">120万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">利益非課税<br/><strong>(恒久化)</strong></td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: 600;">税引後利回り<br/>25%向上</td>
</tr>
<tr style="background: #f0f9ff;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">新NISA<br/>(成長投資枠)</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #0284c7;">240万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #0284c7;">利益非課税<br/><strong>(恒久化)</strong></td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #0284c7; font-weight: 600;">両枠併用で<br/>更なる効果</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">iDeCo</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">14.4-81.6万円<br/>(職業による)</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">掛金所得控除<br/>利益非課税</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #d97706; font-weight: 600;">実質利回り<br/>30%向上</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">複利効果を妨げるNG行動</h2>

<div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0;">❌ 避けるべき5つの行動</h3>
<ol style="margin: 0; padding-left: 1.5rem; color: #dc2626; font-weight: 600;">
<li style="margin: 0.5rem 0;">途中で資金を引き出す（複利の連鎖が断たれる）</li>
<li style="margin: 0.5rem 0;">頻繁な売買（手数料で利回り低下）</li>
<li style="margin: 0.5rem 0;">高コスト商品の選択（実質利回りが下がる）</li>
<li style="margin: 0.5rem 0;">市場タイミングを計る（機会損失）</li>
<li style="margin: 0.5rem 0;">短期的な値動きに一喜一憂（継続できない）</li>
</ol>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">複利効果の実例：ウォーレン・バフェット</h2>

<div style="background: #f1f5f9; border: 2px solid #94a3b8; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0; text-align: center;">投資の神様の複利活用</h3>
<table style="width: 100%; margin: 1rem 0;">
<tbody>
<tr>
<td style="padding: 8px; font-weight: 600; color: #1e40af;">11歳</td>
<td style="padding: 8px;">初めて株式投資を開始</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 8px; font-weight: 600; color: #1e40af;">30歳</td>
<td style="padding: 8px;">資産100万ドル達成</td>
</tr>
<tr>
<td style="padding: 8px; font-weight: 600; color: #1e40af;">56歳</td>
<td style="padding: 8px;">資産10億ドル突破</td>
</tr>
<tr style="background: #dcfce7;">
<td style="padding: 8px; font-weight: 600; color: #059669;">93歳</td>
<td style="padding: 8px; color: #059669; font-weight: 600;">資産1,300億ドル以上</td>
</tr>
</tbody>
</table>
<p style="margin: 1rem 0 0 0; text-align: center; font-weight: 600; color: #1e40af;">
"私の富の99%は50歳以降に築かれた"<br/>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>ウォーレン・バフェット</li>
</ul>
</p>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">複利は「時間×継続×再投資」の掛け算</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">どれか一つでも欠けると効果は半減します。焦らず、着実に、長期視点で資産を育てましょう。</p>
</div>
        `
      },
      {
        id: 'section-6',
        title: '複利効果の注意点とまとめ',
        orderIndex: 6,
        type: 'text',
        content: `
<p>複利効果は強力な資産形成ツールですが、正しく理解して活用することが重要です。<br/>最後に注意点と本レッスンのまとめを確認しましょう。</p>

<h2 style="color: #dc2626; margin: 2rem 0 1rem 0;">⚠️ 複利効果の注意点</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">1. インフレの影響</h3>
<p style="margin: 0; color: #374151;">物価上昇により実質的な価値が目減りする可能性があります。<br/>年2%のインフレは30年で購買力を約45%減少させます。</p>
</div>

<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">2. 税金の考慮</h3>
<p style="margin: 0; color: #374151;">投資利益には約20%の税金がかかります。<br/>NISA・iDeCoなど税制優遇制度の活用が重要です。</p>
</div>

<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">3. リスクとリターンの関係</h3>
<p style="margin: 0; color: #374151;">高い利回りには高いリスクが伴います。<br/>現実的な期待リターンは年4-7%程度です。</p>
</div>

<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">4. 市場の変動性</h3>
<p style="margin: 0; color: #374151;">短期的には元本割れの可能性があります。<br/>長期投資により変動リスクを軽減できます。</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">複利効果を活かした資産形成プラン</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #059669; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">ライフステージ</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">投資方針</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">推奨商品</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">20-30代</td>
<td style="padding: 12px; border: 1px solid #ddd;">積極運用<br/>リスク許容度：高</td>
<td style="padding: 12px; border: 1px solid #ddd;">株式中心<br/>つみたてNISA活用</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">40-50代</td>
<td style="padding: 12px; border: 1px solid #ddd;">バランス運用<br/>リスク許容度：中</td>
<td style="padding: 12px; border: 1px solid #ddd;">株式60%・債券40%<br/>iDeCo併用</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">60代以降</td>
<td style="padding: 12px; border: 1px solid #ddd;">安定運用<br/>リスク許容度：低</td>
<td style="padding: 12px; border: 1px solid #ddd;">債券中心<br/>定期取崩し</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">本レッスンのまとめ</h2>

<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #059669; margin: 0 0 1rem 0;">✅ 複利効果の重要ポイント</h3>
<ol style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>複利は「利息が利息を生む」</strong>雪だるま式の成長</li>
<li><strong>3つの要素</strong>：元本・利率・期間（期間が最重要）</li>
<li><strong>72の法則</strong>：72÷利率で2倍になる年数を計算</li>
<li><strong>積立投資との相性抜群</strong>：ドルコスト平均法で効率UP</li>
<li><strong>早期スタートが鍵</strong>：1年でも早く始める価値は絶大</li>
<li><strong>継続と再投資</strong>：途中で止めない・引き出さない</li>
<li><strong>税制優遇制度の活用</strong>：NISA・iDeCoで効果最大化</li>
</ol>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">今日から始める3つのアクション</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 8px; padding: 1rem; text-align: center;">
<h3 style="color: #1e40af; margin: 0; font-size: 1.2em;">STEP 1</h3>
<p style="margin: 0.5rem 0 0 0; font-weight: 600; color: #1e40af;">証券口座・NISA口座を開設する</p>
</div>
<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 1rem; text-align: center;">
<h3 style="color: #d97706; margin: 0; font-size: 1.2em;">STEP 2</h3>
<p style="margin: 0.5rem 0 0 0; font-weight: 600; color: #d97706;">月1万円から積立投資を始める</p>
</div>
<div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 8px; padding: 1rem; text-align: center;">
<h3 style="color: #059669; margin: 0; font-size: 1.2em;">STEP 3</h3>
<p style="margin: 0.5rem 0 0 0; font-weight: 600; color: #059669;">配当・利息は全て再投資に回す</p>
</div>
</div>

<div style="background: #f1f5f9; border: 2px solid #94a3b8; border-radius: 8px; padding: 2rem; text-align: center; margin: 2rem 0;">
<p style="font-size: 1.2em; font-weight: 600; margin: 0 0 1rem 0; color: #1e40af;">
"複利は世界の第8番目の不思議だ。<br/>
理解している者は利益を得て、<br/>
理解しない者は利息を払う。"
</p>
<p style="font-size: 1em; margin: 0; color: #374151;">- アルベルト・アインシュタイン</p>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 最後のアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">複利効果は「今日」から始まる</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">明日より今日、来月より今月、来年より今年。早く始めるほど、複利の魔法があなたの味方になります。小さな一歩から始めましょう。</p>
</div>

<hr style="border: none; border-top: 2px solid #e5e7eb; margin: 2rem 0;">

<p style="font-style: italic; color: #6b7280; text-align: center; margin: 1rem 0;">
※このレッスンは教育目的です。実際の投資判断はご自身の責任で行ってください。<br/>
※計算例は理論値であり、実際の運用成績を保証するものではありません。
</p>
        `
      }
    ],
    keyPoints: [
      '複利は「利息が利息を生む」仕組みで、時間とともに加速度的に成長する',
      '複利効果の3つの要素：元本・利率・期間のうち、期間が最も重要',
      '72の法則：72÷年利率で元本が2倍になる期間を簡単計算',
      '月3万円積立を年利6%で30年続けると3,010万円に到達',
      'アインシュタインが「人類最大の発明」と呼んだ強力な資産形成手法',
      '早期スタート・継続・再投資が複利効果を最大化する鍵'
    ],
    summary: '複利効果は投資における最も強力な武器です。「利息が利息を生む」仕組みにより、時間をかけるほど爆発的な成長を実現します。特に期間が最も重要な要素であり、早く始めることで少額でも大きな資産を築けることを学びました。72の法則で簡単に計算でき、積立投資と組み合わせることで効果が最大化されます。',
    practicalExamples: [
      '100万円を年利5%で30年運用すると432万円に成長（+182万円）',
      '月3万円積立を年利6%で30年続けると3,010万円に到達（元本1,080万円）',
      '72の法則：年利6%なら12年で元本が2倍に',
      '単利と複利の30年後の差は182万円（約73%の差）',
      '25歳から月2万円積立は40歳から月5万円積立より効果的',
      'ウォーレン・バフェットの資産の99%は50歳以降に築かれた'
    ],
    warningNotes: [
      '複利効果は短期では実感しにくく、長期継続が必要です',
      '継続的な投資が前提となるため、余裕資金で行うことが重要です',
      '市場の変動により実際の利回りは変動します',
      '複利計算は理論値であり、税金や手数料は考慮されていません',
      'インフレにより実質的な価値が目減りする可能性があります',
      'このレッスンは教育目的であり、特定の投資商品を推奨するものではありません'
    ]
  },

  quiz: [
    {
      id: 'financial-literacy-2-q1',
      question: '複利効果の3つの要素のうち、最も重要なものは何ですか？',
      options: [
        '元本の大きさ',
        '年間の利率',
        '投資を続ける期間',
        '投資商品の種類'
      ],
      correctAnswer: 2,
      explanation: '複利効果の3つの要素のうち、最も重要なのは「期間」です。早く始めるほど複利の威力が大きくなるため、時間こそが複利効果の最大の武器となります。'
    },
    {
      id: 'financial-literacy-2-q2',
      question: '72の法則で、年利6%の場合、元本が2倍になるのは何年後ですか？',
      options: [
        '8年後',
        '10年後',
        '12年後',
        '15年後'
      ],
      correctAnswer: 2,
      explanation: '72の法則では「72÷年利率=元本が2倍になる年数」で計算します。72÷6=12年となるため、年利6%なら12年で元本が2倍になります。'
    },
    {
      id: 'financial-literacy-2-q3',
      question: '100万円を年利5%で複利運用した場合、30年後はいくらになりますか？',
      options: [
        '250万円',
        '350万円',
        '432万円',
        '500万円'
      ],
      correctAnswer: 2,
      explanation: '100万円を年利5%で30年間複利運用すると432万円になります。単利の場合は250万円なので、複利効果により182万円の差が生まれます。'
    },
    {
      id: 'financial-literacy-2-q4',
      question: '複利と単利の最も大きな違いは何ですか？',
      options: [
        '単利の方が儲かる',
        '複利は利息にも利息がつく',
        '複利は短期投資に向いている',
        '単利の方が計算が複雑'
      ],
      correctAnswer: 1,
      explanation: '複利と単利の最も大きな違いは、複利では「利息にも利息がつく」ことです。これにより時間の経過とともに資産の成長が加速していきます。'
    }
  ],

  lastUpdated: '2025-08-15',
  factChecked: true
};