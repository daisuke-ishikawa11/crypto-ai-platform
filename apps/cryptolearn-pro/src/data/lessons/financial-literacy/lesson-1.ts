import type { Lesson } from '@/types';

export const lesson1: Lesson = {
  id: 'financial-literacy-investing-basics',
  categoryId: 'financial-literacy', 
  title: '投資とは何か - 基本概念の理解',
  slug: 'what-is-investing',
  description: '投資の基本概念、複利効果、リスクと収益の関係を理解し、将来の資産形成への第一歩を踏み出します',
  difficultyLevel: 'beginner',
  estimatedMinutes: 15,
  orderIndex: 1,
  content: {
    sections: [
      {
        id: 'section-1',
        title: '投資とは何か',
        orderIndex: 1,
        type: 'text',
        content: `
<p>投資とは、現在の資金を将来の価値増大のために使う行為です。<br/>銀行預金だけでは資産は増えにくい時代、投資を理解することが重要です。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">投資の基本原理</h2>

<ol style="margin-left: 2rem; line-height: 1.8;">
<li><strong>元本</strong>（投資するお金）</li>
<li><strong>時間</strong>（投資を続ける期間）</li>
<li><strong>収益率</strong>（年間どれくらい増えるか）</li>
<li><strong>複利効果</strong>（利益が利益を生む力）</li>
</ol>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">実例：同じ給料でも30年後に大きな差</h2>

<p>年収400万円の会社員A・Bさんの比較</p>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">項目</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">Aさん（投資）</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">Bさん（貯蓄のみ）</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">月の投資額</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">3万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">0円</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">月の貯金額</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">2万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">5万円</td>
</tr>
<tr style="background: #dbeafe; font-weight: bold;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">30年後資産</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">約2,100万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">約1,800万円</td>
</tr>
<tr style="background: #dcfce7; font-weight: bold;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">差額</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+300万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">ベース</td>
</tr>
</tbody>
</table>

<p style="font-size: 0.9em; color: #6b7280; margin: 0.5rem 0;">※投資は年利6%、貯蓄は年利0.1%で計算</p>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">投資 = お金を働かせること</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">あなたが寝ている間も、お金が成長します。早く始めるほど効果が大きくなります。</p>
</div>
        `
      },
      {
        id: 'section-2',
        title: '複利効果の威力',
        orderIndex: 2,
        type: 'text',
        content: `
<p>複利効果とは「利益が利益を生む」現象です。<br/>時間が経つほどその効果は強力になり、資産形成の最大の武器となります。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">複利と単利の違い</h2>

<p style="font-weight: 600; color: #374151;">100万円を年利5%で運用した場合</p>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">年数</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">単利</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">複利</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">差額</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">5年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">125万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">128万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">3万円</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">10年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">150万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">163万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">13万円</td>
</tr>
<tr style="background: #fef3c7; font-weight: 600;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">20年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">200万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #d97706;">265万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #d97706;">65万円</td>
</tr>
<tr style="background: #dcfce7; font-weight: bold;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">30年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">250万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">432万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">182万円</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">複利効果の3つの要素</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="border-left: 4px solid #10b981; background: #f0fdf4; padding: 1rem;">
<h3 style="margin: 0 0 0.5rem 0; color: #065f46;">1. 元本の大きさ</h3>
<p style="margin: 0; color: #374151;">毎月の投資額が大きいほど効果UP</p>
</div>
<div style="border-left: 4px solid #10b981; background: #f0fdf4; padding: 1rem;">
<h3 style="margin: 0 0 0.5rem 0; color: #065f46;">2. 運用期間の長さ</h3>
<p style="margin: 0; color: #374151;">早く始めるほど効果が絶大</p>
</div>
<div style="border-left: 4px solid #10b981; background: #f0fdf4; padding: 1rem;">
<h3 style="margin: 0 0 0.5rem 0; color: #065f46;">3. 年間収益率</h3>
<p style="margin: 0; color: #374151;">高すぎるとリスクも高くなる</p>
<p style="margin: 0.5rem 0 0 0; font-weight: 600; color: #059669;">現実的な目標：年利4-7%</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">72の法則で簡単計算</h2>

<div style="background: #f1f5f9; border: 2px solid #94a3b8; padding: 1.5rem; border-radius: 8px; text-align: center; margin: 1rem 0;">
<p style="font-size: 1.1em; font-weight: 600; margin: 0 0 1rem 0; color: #1e40af;">元本が2倍になる期間 = 72 ÷ 年利率</p>
<ul style="list-style: none; padding: 0; margin: 0;">
<li style="padding: 0.5rem 0; font-size: 1.1em;">年利6%なら <strong style="color: #059669;">12年で2倍</strong></li>
<li style="padding: 0.5rem 0; font-size: 1.1em;">年利4%なら <strong style="color: #059669;">18年で2倍</strong></li>
<li style="padding: 0.5rem 0; font-size: 1.1em;">年利8%なら <strong style="color: #059669;">9年で2倍</strong></li>
</ul>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">複利効果は時間の魔法です</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">1年でも早く始めることで、将来の資産に大きな差が生まれます。</p>
</div>
        `
      },
      {
        id: 'section-3',
        title: '投資とギャンブルの違い',
        orderIndex: 3,
        type: 'text',
        content: `
<p>「投資はギャンブル」という誤解を持つ人が多いですが、<br/>両者は全く異なる性質を持っています。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">投資とギャンブルの比較</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #dc2626; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">項目</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">投資</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">ギャンブル</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">期間</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">長期(数年-数十年)</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">短期(数分-数時間)</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">根拠</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">企業の成長・業績</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">運・偶然</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">学習効果</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">知識で成功率UP</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">学習効果なし</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">リスク管理</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">分散投資で軽減</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">オール・オア・ナッシング</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">社会貢献</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">企業成長支援</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">娯楽のみ</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">感情</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">冷静・計画的</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">興奮・刺激追求</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">長期投資の勝率（過去データ）</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #059669; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">保有期間</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">勝率</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">1年間</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">73%</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">5年間</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">88%</td>
</tr>
<tr style="background: #dcfce7; font-weight: 600;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">10年間</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">94%</td>
</tr>
<tr style="background: #22c55e; color: white; font-weight: bold;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">20年間</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">100%</td>
</tr>
</tbody>
</table>

<p style="font-size: 0.9em; color: #6b7280; margin: 0.5rem 0;">※米国S&P500指数（1957-2021年）</p>

<h2 style="color: #dc2626; margin: 2rem 0 1rem 0;">投資をギャンブルにしてしまう危険な行為</h2>

<div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<ul style="list-style: none; margin: 0; padding: 0;">
<li style="color: #dc2626; font-weight: 600; padding: 0.5rem 0; border-bottom: 1px solid #fca5a5;">❌ デイトレード（短期売買）</li>
<li style="color: #dc2626; font-weight: 600; padding: 0.5rem 0; border-bottom: 1px solid #fca5a5;">❌ 借金での投資</li>
<li style="color: #dc2626; font-weight: 600; padding: 0.5rem 0; border-bottom: 1px solid #fca5a5;">❌ 一つの銘柄に全額投資</li>
<li style="color: #dc2626; font-weight: 600; padding: 0.5rem 0; border-bottom: 1px solid #fca5a5;">❌ 感情的な売買</li>
<li style="color: #dc2626; font-weight: 600; padding: 0.5rem 0;">❌ 「すぐに儲けたい」思考</li>
</ul>
</div>

<h2 style="color: #059669; margin: 2rem 0 1rem 0;">正しい投資の特徴</h2>

<div style="background: #f0fdf4; border: 2px solid #a7f3d0; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<ul style="list-style: none; margin: 0; padding: 0;">
<li style="color: #059669; font-weight: 600; padding: 0.5rem 0; border-bottom: 1px solid #a7f3d0;">✅ 長期保有（5年以上）</li>
<li style="color: #059669; font-weight: 600; padding: 0.5rem 0; border-bottom: 1px solid #a7f3d0;">✅ 余裕資金での投資</li>
<li style="color: #059669; font-weight: 600; padding: 0.5rem 0; border-bottom: 1px solid #a7f3d0;">✅ 複数銘柄への分散</li>
<li style="color: #059669; font-weight: 600; padding: 0.5rem 0; border-bottom: 1px solid #a7f3d0;">✅ 計画的な売買</li>
<li style="color: #059669; font-weight: 600; padding: 0.5rem 0;">✅ 着実な資産形成を目指す</li>
</ul>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">投資は「企業と一緒に成長する」こと</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">ギャンブルは「運に頼る」こと。時間をかけて学習すれば成功率が上がります。</p>
</div>
        `
      },
      
      {
        id: 'section-4',
        title: '分散投資でリスクを抑える',
        orderIndex: 4,
        type: 'text',
        content: `
<p>「卵を一つのカゴに盛るな」という投資の格言があります。<br/>分散投資はリスクを抑えながら安定した収益を目指す基本戦略です。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">分散投資の効果</h2>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
<div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0; text-align: center;">1社だけに投資した場合</h3>
<ul style="list-style: none; margin: 0; padding: 0; color: #dc2626;">
<li style="padding: 0.5rem 0; border-bottom: 1px solid #fca5a5;">• その会社が倒産すると全額失う</li>
<li style="padding: 0.5rem 0; border-bottom: 1px solid #fca5a5;">• 株価が半分になると資産も半分</li>
<li style="padding: 0.5rem 0; font-weight: 600;">• リスクが非常に高い</li>
</ul>
</div>
<div style="background: #f0fdf4; border: 2px solid #a7f3d0; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #059669; margin: 0 0 1rem 0; text-align: center;">10社に分散投資した場合</h3>
<ul style="list-style: none; margin: 0; padding: 0; color: #059669;">
<li style="padding: 0.5rem 0; border-bottom: 1px solid #a7f3d0;">• 1社が倒産しても損失は1/10</li>
<li style="padding: 0.5rem 0; border-bottom: 1px solid #a7f3d0;">• 他の会社の好調で損失をカバー可能</li>
<li style="padding: 0.5rem 0; font-weight: 600;">• リスクが大幅に軽減</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">分散投資の4つの方法</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0;">
<div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">1. 銘柄分散</h3>
<p style="margin: 0; color: #374151;">複数の会社の株を買う</p>
</div>
<div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">2. 業界分散</h3>
<p style="margin: 0; color: #374151;">異なる業界に投資する</p>
</div>
<div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">3. 地域分散</h3>
<p style="margin: 0; color: #374151;">日本・米国・欧州など</p>
</div>
<div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">4. 時間分散</h3>
<p style="margin: 0; color: #374151;">毎月決まった日に購入</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">リスクと収益の関係</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">投資商品</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">期待収益</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">リスク</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">特徴</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">預金</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">0.1%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">低</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">元本保証</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">国債</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">0.5%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">低</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">国の保証</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">社債</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">1-3%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">中</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">会社の保証</td>
</tr>
<tr style="background: #dcfce7; font-weight: 600;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">株式</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">4-8%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">高</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">値上がり期待</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">理想的な資産配分例（30代の場合）</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0; display: flex; align-items: center;">📊 株式 60%</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
<li><strong>国内株式：30%</strong></li>
<li><strong>海外株式：30%</strong></li>
<li>特徴：高い成長期待、値動き大</li>
</ul>
</div>
<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #059669; margin: 0 0 1rem 0; display: flex; align-items: center;">🏛️ 債券 30%</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
<li><strong>国内債券：15%</strong></li>
<li><strong>海外債券：15%</strong></li>
<li>特徴：安定収入、値動き小</li>
</ul>
</div>
<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #d97706; margin: 0 0 1rem 0; display: flex; align-items: center;">🏢 その他 10%</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
<li><strong>不動産投資信託：10%</strong></li>
<li>特徴：インフレ対応</li>
</ul>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">分散投資は「守りながら増やす」戦略</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">投資信託なら自動で分散投資可能。年齢が上がるほど安全資産の比率UP。</p>
</div>
        `
      },

      {
        id: 'section-5',
        title: '今すぐ始める投資の第一歩',
        orderIndex: 5,
        type: 'text',
        content: `
<p>理論を学んだら、実際に投資を始めることが大切です。<br/>初心者でも安全に始められる具体的な手順をご紹介します。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">投資を始める前の準備</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0;">
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">1. 緊急資金の確保</h3>
<p style="margin: 0; color: #374151;">生活費の6ヶ月分は普通預金に</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">2. 高金利借金の完済</h3>
<p style="margin: 0; color: #374151;">クレジットカードのリボ払いなど</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">3. 投資目標の明確化</h3>
<p style="margin: 0; color: #374151;">何のために、いつまでに、いくら必要か</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">4. 投資可能額の算出</h3>
<p style="margin: 0; color: #374151;">月収から生活費を引いた余裕資金</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">初心者向け投資スタート方法</h2>

<div style="background: #f8fafc; border: 2px solid #94a3b8; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0;">STEP1：証券口座開設（1-2週間）</h3>
<p style="font-weight: 600; margin: 0 0 1rem 0; color: #374151;">主要ネット証券会社</p>
<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">会社名</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">手数料</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">投資信託数</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">特徴</th>
</tr>
</thead>
<tbody>
<tr style="background: #dbeafe;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">SBI証券</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: bold;">無料</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">2,600本以上</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">業界最大手</td>
</tr>
<tr style="background: #fef3c7;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">楽天証券</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: bold;">無料</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">2,500本以上</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">ポイント還元</td>
</tr>
<tr style="background: #dcfce7;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">マネックス</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: bold;">無料</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">1,200本以上</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">米国株充実</td>
</tr>
</tbody>
</table>
</div>

<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #059669; margin: 0 0 1rem 0;">STEP2：新NISA口座開設</h3>
<p style="font-weight: 600; margin: 0 0 1rem 0; color: #374151;">新NISA制度の特徴（2024年開始）</p>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>年360万円まで投資可能（つみたて投資枠120万円+成長投資枠240万円）</li>
<li><strong style="color: #059669;">無期限で利益が非課税</strong>（恒久化）</li>
<li>生涯投資限度額1,800万円</li>
<li><strong style="color: #059669;">100円から始められる</strong></li>
</ul>
</div>

<div style="background: #fef7ff; border: 2px solid #c084fc; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #7c3aed; margin: 0 0 1rem 0;">STEP3：投資商品の選択</h3>
<p style="font-weight: 600; margin: 0 0 1rem 0; color: #374151;">初心者におすすめの投資信託</p>
<div style="display: grid; gap: 1rem; margin-top: 1rem;">
<div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 1rem;">
<h4 style="color: #0c4a6e; margin: 0 0 0.5rem 0; display: flex; align-items: center;">🌍 全世界株式インデックス</h4>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li>世界中の株式に分散投資</li>
<li>管理費用：年0.1%程度</li>
<li>リスク：中～高</li>
</ul>
</div>
<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem;">
<h4 style="color: #d97706; margin: 0 0 0.5rem 0; display: flex; align-items: center;">🇯🇵 日本株式インデックス</h4>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li>日本の代表的企業に投資</li>
<li>管理費用：年0.1%程度</li>
<li>リスク：中～高</li>
</ul>
</div>
<div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 1rem;">
<h4 style="color: #059669; margin: 0 0 0.5rem 0; display: flex; align-items: center;">⚖️ バランス型ファンド</h4>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li>株式と債券を自動で配分</li>
<li>管理費用：年0.2-0.5%</li>
<li>リスク：中</li>
</ul>
</div>
</div>
</div>

<div style="background: #f1f5f9; border: 2px solid #94a3b8; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0;">STEP4：積立投資の設定</h3>
<p style="font-weight: 600; margin: 0 0 1rem 0; color: #374151;">毎月の投資額目安</p>
<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">年収</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">推奨投資額</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">300万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600; color: #059669;">1-2万円/月</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">400万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600; color: #059669;">2-3万円/月</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">500万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600; color: #059669;">3-4万円/月</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">600万円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600; color: #059669;">4-5万円/月</td>
</tr>
</tbody>
</table>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">完璧なタイミングを待つより行動を</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">小額から始めて慣れることが重要。自動積立で感情的な判断を避けましょう。</p>
</div>
        `
      },




      {
        id: 'section-6',
        title: '投資の注意点とリスク',
        orderIndex: 6,
        type: 'text',
        content: `
<p>投資を始める前に、必ずリスクを理解しておくことが重要です。<br/>正しい知識を持って、賢く投資を活用しましょう。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">投資の主なリスク</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">1. 元本割れリスク</h3>
<p style="margin: 0; color: #374151;">投資した金額より少なくなる可能性があります</p>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">2. 流動性リスク</h3>
<p style="margin: 0; color: #374151;">すぐに現金化できない場合があります</p>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">3. インフレリスク</h3>
<p style="margin: 0; color: #374151;">お金の価値が目減りするリスクがあります</p>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">4. 為替リスク</h3>
<p style="margin: 0; color: #374151;">外国投資での通貨変動リスクがあります</p>
</div>
</div>

<h2 style="color: #dc2626; margin: 2rem 0 1rem 0;">⚠️ 投資詐欺に注意！</h2>

<p style="font-weight: 600; margin: 1rem 0; color: #374151;">危険なキーワード</p>

<div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<ul style="list-style: none; margin: 0; padding: 0;">
<li style="color: #dc2626; font-weight: 600; padding: 0.5rem 0; border-bottom: 1px solid #fca5a5;">❌ 「必ず儲かる」</li>
<li style="color: #dc2626; font-weight: 600; padding: 0.5rem 0; border-bottom: 1px solid #fca5a5;">❌ 「元本保証で高利回り」</li>
<li style="color: #dc2626; font-weight: 600; padding: 0.5rem 0; border-bottom: 1px solid #fca5a5;">❌ 「今だけ特別価格」</li>
<li style="color: #dc2626; font-weight: 600; padding: 0.5rem 0;">❌ 「友人を紹介すれば更にお得」</li>
</ul>
</div>

<h2 style="color: #059669; margin: 2rem 0 1rem 0;">✅ 安全な投資の始め方</h2>

<div style="background: #f0fdf4; border: 2px solid #a7f3d0; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<ul style="list-style: none; margin: 0; padding: 0;">
<li style="color: #059669; font-weight: 600; padding: 0.5rem 0; border-bottom: 1px solid #a7f3d0;">✅ 金融庁登録業者で口座開設</li>
<li style="color: #059669; font-weight: 600; padding: 0.5rem 0; border-bottom: 1px solid #a7f3d0;">✅ 有名で実績のある商品を選ぶ</li>
<li style="color: #059669; font-weight: 600; padding: 0.5rem 0; border-bottom: 1px solid #a7f3d0;">✅ 少額から始める</li>
<li style="color: #059669; font-weight: 600; padding: 0.5rem 0; border-bottom: 1px solid #a7f3d0;">✅ 分散投資を心がける</li>
<li style="color: #059669; font-weight: 600; padding: 0.5rem 0;">✅ 長期保有を前提とする</li>
</ul>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">投資で失敗しない基本ルール</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center; width: 15%;">番号</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: left;">基本ルール</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600; color: #1e40af;">1</td>
<td style="padding: 12px; border: 1px solid #ddd; color: #374151; font-weight: 500;">生活資金には手をつけない</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600; color: #1e40af;">2</td>
<td style="padding: 12px; border: 1px solid #ddd; color: #374151; font-weight: 500;">借金をして投資しない</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600; color: #1e40af;">3</td>
<td style="padding: 12px; border: 1px solid #ddd; color: #374151; font-weight: 500;">一度に大金を投資しない</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600; color: #1e40af;">4</td>
<td style="padding: 12px; border: 1px solid #ddd; color: #374151; font-weight: 500;">感情的な判断をしない</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600; color: #1e40af;">5</td>
<td style="padding: 12px; border: 1px solid #ddd; color: #374151; font-weight: 500;">定期的に見直しをする</td>
</tr>
</tbody>
</table>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">投資は「余裕資金」で行うのが鉄則</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">最初は少額から始めて慣れる。分からないものには投資しない。</p>
</div>

<hr style="border: none; border-top: 2px solid #e5e7eb; margin: 2rem 0;">

<p style="font-style: italic; color: #6b7280; text-align: center; margin: 1rem 0;">※このレッスンは教育目的です。実際の投資判断はご自身の責任で行ってください。</p>
        `
      }
    ],
    keyPoints: [
      '投資とは現在の資金を将来の価値増大のために使う行為',
      '複利効果により時間をかけるほど資産が大きく成長する',
      '投資は企業の成長に参加すること、ギャンブルとは全く異なる',
      '分散投資により一つの会社に依存するリスクを軽減できる',
      '少額から始めて段階的に投資額を増やしていくことが重要',
      '投資にはリスクがあることを理解し、余裕資金で行う'
    ],
    summary: '投資の基本概念から複利効果、ギャンブルとの違い、分散投資の重要性、実際の投資の始め方、そして注意すべきリスクまでを学びました。投資は決してギャンブルではなく、企業の成長に参加し長期的に資産を形成する手法です。少額から始めて、時間をかけて資産を育てることが成功への道です。',
    practicalExamples: [
      '同じ給料でも30年後に300万円の資産差が生まれる実例',
      '100万円を年利5%で30年運用すると432万円に成長',
      '72の法則：年利6%なら12年で元本が2倍になる',
      '月3万円を20年積立投資すると元本720万円が1,180万円に',
      '新NISAで年360万円まで無期限で利益が非課税（つみたて投資枠120万円+成長投資枠240万円）'
    ],
    warningNotes: [
      '投資には元本割れのリスクが必ずあります',
      '生活資金や緊急時の資金は投資に使わないでください',
      '「必ず儲かる」などの謳い文句は詐欺の可能性があります',
      '投資判断は最終的にご自身の責任で行ってください',
      'このレッスンは教育目的であり、特定の投資商品を推奨するものではありません'
    ]
  },
  
  quiz: [
    {
      id: 'financial-literacy-1-q1',
      question: '投資と預金の最も大きな違いは何ですか？',
      options: [
        '投資は元本が保証されている',
        '投資はお金を働かせて増やすこと',
        '投資は短期間で利益が出る', 
        '投資は銀行で行うもの'
      ],
      correctAnswer: 1,
      explanation: '投資と預金の最も大きな違いは、投資が「お金を働かせて増やす」ことです。預金は安全ですが利息が低く、投資は企業の成長に参加して資産を増やします。'
    },
    {
      id: 'financial-literacy-1-q2',
      question: '複利効果とは何ですか？',
      options: [
        '元本だけに利息がつくこと',
        '利益が利益を生み続けること',
        '毎年同じ金額が増えること',
        '銀行の預金金利のこと'
      ],
      correctAnswer: 1,
      explanation: '複利効果とは「利益が利益を生み続ける」現象です。時間が経つほどその効果は強力になり、資産形成の最大の武器となります。'
    },
    {
      id: 'financial-literacy-1-q3',
      question: '分散投資の目的は何ですか？',
      options: [
        'より高いリターンを得るため',
        'リスクを抑えながら安定した収益を目指すため',
        '手数料を安くするため',
        '短期間で利益を出すため'
      ],
      correctAnswer: 1,
      explanation: '分散投資の目的は「リスクを抑えながら安定した収益を目指すこと」です。複数の投資先に分散することで、一つの投資先の損失をカバーできます。'
    },
    {
      id: 'financial-literacy-1-q4',
      question: '投資を始める前に最も重要なことは？',
      options: [
        '最新の投資情報を集めること',
        '緊急資金を確保し余裕資金で行うこと',
        '一番儲かりそうな商品を探すこと',
        '友人の投資アドバイスを聞くこと'
      ],
      correctAnswer: 1,
      explanation: '投資を始める前に最も重要なのは「緊急資金を確保し余裕資金で行うこと」です。生活に必要な資金は投資に回さず、失っても生活に支障のない範囲で投資することが基本です。'
    }
  ],
  
  lastUpdated: '2025-08-15',
  factChecked: true
};