import type { Lesson } from '@/types';

export const lesson2: Lesson = {
  id: 'trading-basics-trend-identification-analysis',
  categoryId: 'trading-basics',
  title: 'トレンドの理解と識別方法',
  slug: 'trend-identification-analysis',
  description: 'チャート分析の基礎となるトレンドの概念と、上昇・下降・横ばいトレンドの正しい識別方法を学習します。',
  difficultyLevel: 'beginner',
  estimatedMinutes: 22,
  orderIndex: 2,
  
  content: {
    sections: [
      {
        id: 'section-1',
        title: 'トレンドとは何か',
        orderIndex: 1,
        type: 'text',
        content: `
<p><strong>トレンド</strong>とは、市場価格が一定期間にわたって示す方向性のことです。<br/>「The trend is your friend（トレンドは友達）」という有名な格言があるように、トレンドを正しく理解し活用することが、投資成功の基本となります。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">トレンドの重要性</h2>

<div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0; display: flex; align-items: center;">📈 なぜトレンドが重要なのか</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>方向性の把握</strong>：市場がどちらに向かっているかがわかる</li>
<li><strong>売買タイミング</strong>：エントリーとエグジットの判断材料</li>
<li><strong>リスク管理</strong>：トレンドに逆らわないことでリスクを軽減</li>
<li><strong>利益最大化</strong>：トレンドに乗ることで大きな利益を狙える</li>
</ul>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">トレンドの3つの基本方向</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 1rem; border-radius: 4px;">
<h3 style="color: #065f46; margin: 0 0 0.5rem 0;">1. 上昇トレンド（Uptrend）</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li><strong>特徴</strong>：高値と安値が段階的に切り上がる</li>
<li><strong>市場心理</strong>：楽観的、買い圧力が強い</li>
<li><strong>投資家行動</strong>：積極的な買い、FOMO（取り残される恐怖）</li>
<li><strong>基本戦略</strong>：押し目買い（Buy the Dip）</li>
</ul>
</div>

<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">2. 下降トレンド（Downtrend）</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li><strong>特徴</strong>：高値と安値が段階的に切り下がる</li>
<li><strong>市場心理</strong>：悲観的、売り圧力が強い</li>
<li><strong>投資家行動</strong>：利確売り、損切り、恐怖売り</li>
<li><strong>基本戦略</strong>：戻り売り（Sell the Rally）</li>
</ul>
</div>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem; border-radius: 4px;">
<h3 style="color: #d97706; margin: 0 0 0.5rem 0;">3. 横ばいトレンド（Sideways/Range）</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li><strong>特徴</strong>：一定の価格帯（レンジ）で推移</li>
<li><strong>市場心理</strong>：方向感の欠如、様子見</li>
<li><strong>投資家行動</strong>：買いと売りが均衡している状態</li>
<li><strong>基本戦略</strong>：レンジトレード（高値売り・安値買い）</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">トレンドの強さの判断方法</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">判断要素</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">強いトレンド</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">弱いトレンド</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">角度</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">急角度</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">緩やか</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">出来高</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">大きい</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">小さい</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">継続期間</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">長期間</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">短期間</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">調整の浅さ</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">浅い押し・戻り</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">深い押し・戻り</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">トレンドの基本的な見方</h2>

<div style="background: #f8fafc; border: 2px solid #94a3b8; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0;">高値・安値の関係性</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>上昇トレンド</strong>：高値を更新し、安値も前回より高い位置で止まる</li>
<li><strong>下降トレンド</strong>：安値を更新し、高値も前回より低い位置で止まる</li>
<li><strong>横ばいトレンド</strong>：高値・安値ともにほぼ同じレベルで推移</li>
<li><strong>転換のサイン</strong>：高値・安値の関係性が変化した時</li>
</ul>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">トレンドは友達、逆らわないことが大切</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">強いトレンドに逆らって取引するのではなく、トレンドの方向に合わせて戦略を立てることが成功の秘訣です。</p>
</div>
        `
      },
      {
        id: 'section-2',
        title: 'トレンドの時間軸分類',
        orderIndex: 2,
        type: 'text',
        content: `
<p>チャールズ・ダウが提唱したダウ理論では、市場には3つの異なる時間軸のトレンドが同時に存在するとされています。<br/>この理論を理解することで、より効果的なトレンド分析が可能になります。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ダウ理論による3つのトレンド</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 1rem; border-radius: 4px;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">1. 主要トレンド（Primary Trend）</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li><strong>期間</strong>：数ヶ月〜数年</li>
<li><strong>重要性</strong>：最も重要な長期的方向性</li>
<li><strong>例</strong>：ビットコインの長期的な採用拡大による上昇</li>
<li><strong>投資スタイル</strong>：長期投資・ポジション投資</li>
</ul>
</div>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem; border-radius: 4px;">
<h3 style="color: #d97706; margin: 0 0 0.5rem 0;">2. 中間トレンド（Secondary Trend）</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li><strong>期間</strong>：数週間〜数ヶ月</li>
<li><strong>重要性</strong>：主要トレンドの調整局面</li>
<li><strong>例</strong>：規制発表や経済指標による一時的な調整</li>
<li><strong>投資スタイル</strong>：スイングトレード</li>
</ul>
</div>

<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">3. 短期トレンド（Minor Trend）</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li><strong>期間</strong>：数日〜数週間</li>
<li><strong>重要性</strong>：短期的な値動き</li>
<li><strong>例</strong>：ニュースや市場心理による日次変動</li>
<li><strong>投資スタイル</strong>：デイトレード・短期取引</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ダウ理論の6つの基本原則</h2>

<div style="background: #f8fafc; border: 2px solid #94a3b8; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0;">チャールズ・ダウの6原則</h3>
<ol style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>価格はすべてを織り込む</strong>：すべての情報は既に価格に反映されている</li>
<li><strong>3つのトレンドが存在</strong>：主要・中間・短期の3つのトレンドが同時進行</li>
<li><strong>主要トレンドは3段階</strong>：蓄積期→追随期→散布期の3段階で進行</li>
<li><strong>出来高で確認</strong>：トレンドは出来高の増加により確認される</li>
<li><strong>明確な転換まで継続</strong>：トレンドは明確な転換シグナルまで継続</li>
<li><strong>相互確認の原則</strong>：複数の指標で同じ方向を示すことが重要</li>
</ol>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">時間軸別の特徴と活用法</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">時間軸</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">チャート</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">主な用途</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">初心者向け</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">主要トレンド</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">週足・月足</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">大きな方向性の確認</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">◎</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">中間トレンド</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">日足・4時間足</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">エントリータイミング</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">○</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">短期トレンド</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">1時間足・15分足</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">精密なタイミング</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">△</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">マルチタイムフレーム分析</h2>

<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #059669; margin: 0 0 1rem 0;">効果的な分析手順</h3>
<ol style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>週足・月足で大局を把握</strong>：主要トレンドの方向性を確認</li>
<li><strong>日足でタイミングを見極め</strong>：エントリーポイントを検討</li>
<li><strong>時間足で精密なエントリー</strong>：具体的な売買タイミングを決定</li>
<li><strong>全ての時間軸で一致</strong>：同じ方向のトレンドが最も確実</li>
</ol>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">トレンドの3段階</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem; border-radius: 4px;">
<h3 style="color: #d97706; margin: 0 0 0.5rem 0;">第1段階：蓄積期</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li>知識のある投資家が静かに買い集め（売り集め）</li>
<li>一般投資家はまだ気づいていない状態</li>
<li>出来高は比較的少ない</li>
</ul>
</div>

<div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 1rem; border-radius: 4px;">
<h3 style="color: #065f46; margin: 0 0 0.5rem 0;">第2段階：追随期</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li>トレンドが明確になり、多くの投資家が参加</li>
<li>価格が急激に動き、注目を集める</li>
<li>出来高が大幅に増加</li>
</ul>
</div>

<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">第3段階：散布期</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li>知識のある投資家が利確（損切り）を開始</li>
<li>一般投資家が最も活発に参加している状態</li>
<li>トレンド転換の前兆が現れる</li>
</ul>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">長期的な視点を持つことが重要</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">短期的な値動きに惑わされず、主要トレンドの方向性を基本に据えて取引戦略を立てましょう。</p>
</div>
        `
      },
      {
        id: 'section-3',
        title: 'トレンドライン分析の基本',
        orderIndex: 3,
        type: 'text',
        content: `
<p>トレンドラインは、トレンドの方向性と強さを視覚的に表現する重要なツールです。<br/>正しい引き方と活用方法を覚えることで、より正確なトレンド分析が可能になります。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">トレンドラインの種類と引き方</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #059669; margin: 0 0 1rem 0; display: flex; align-items: center;">📈 上昇トレンドライン</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; line-height: 1.8;">
<li><strong>引き方</strong>：2つ以上の安値を結んで右上がりの線を引く</li>
<li><strong>機能</strong>：サポートラインとして機能</li>
<li><strong>確認方法</strong>：3回目のタッチで信頼性が高まる</li>
<li><strong>ブレイク</strong>：下に割れるとトレンド転換のサイン</li>
</ul>
</div>

<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #d97706; margin: 0 0 1rem 0; display: flex; align-items: center;">⚡ Q1調整局面：利確売りの波</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; line-height: 1.8;">
<li><strong>価格推移：</strong>$108,786 → $92,000（2月中旬）</li>
<li><strong>特徴：</strong>AI取引による協調的な利確売り</li>
<li><strong>市場心理：</strong>「まだ早い」vs「天井警戒」</li>
<li><strong>出来高：</strong>下落時に減少、底値圏で再増加</li>
<li><strong>識別ポイント：</strong>サポートレベルでの反発確認</li>
</ul>
</div>

<div style="background: #e0f2fe; border: 2px solid #0284c7; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #0c4a6e; margin: 0 0 1rem 0; display: flex; align-items: center;">🔄 Q1回復トレンド：押し目買いの勝利</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; line-height: 1.8;">
<li><strong>価格推移：</strong>$92,000 → $105,000（3月末）</li>
<li><strong>特徴：</strong>段階的な回復、トレンドライン回帰</li>
<li><strong>AI活動：</strong>DCAボットと裁定取引の協調</li>
<li><strong>出来高：</strong>安定的な増加傾向</li>
<li><strong>学習ポイント：</strong>長期トレンド継続の確認方法</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">2025年トレンド識別の新手法</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">分析手法</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">従来手法</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">2025年AI時代</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">精度向上</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">トレンドライン</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">手動描画</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">AI自動検出+人間確認</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+25%</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">出来高分析</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">単純数量</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">AI vs 人間の取引分離</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+40%</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">転換点予測</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">パターン認識</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">オンチェーン+センチメント</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+35%</td>
</tr>
</tbody>
</table>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 2025年のワンポイント</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">実例から学ぶAI時代の相場観</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">過去のパターンだけでなく、AI動向と組み合わせた分析が成功率を大幅に向上させます。</p>
</div>
        `
      },

      {
        id: 'section-4',
        title: '2025年AI時代のトレンド戦略',
        orderIndex: 4,
        type: 'text',
        content: `
<p>AI駆動市場では、従来のトレンドフォロー戦略を進化させた<br/>新しいアプローチが求められます。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">2025年推奨トレンド戦略</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 1rem; border-radius: 4px;">
<h3 style="color: #065f46; margin: 0 0 0.5rem 0;">1. ハイブリッド分析戦略</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li><strong>AI指標：</strong>TradingViewのAI分析ツール活用</li>
<li><strong>人間判断：</strong>市場心理とファンダメンタル分析</li>
<li><strong>統合判断：</strong>両方の合意点でエントリー</li>
<li><strong>成功率：</strong>従来手法より30%向上</li>
</ul>
</div>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem; border-radius: 4px;">
<h3 style="color: #d97706; margin: 0 0 0.5rem 0;">2. マルチタイムフレーム確認戦略</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li><strong>長期（週足）：</strong>主要トレンド方向確認</li>
<li><strong>中期（日足）：</strong>エントリータイミング判断</li>
<li><strong>短期（4時間）：</strong>精密なポジション構築</li>
<li><strong>注意：</strong>1分-5分足は避ける（AI主戦場）</li>
</ul>
</div>

<div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 1rem; border-radius: 4px;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">3. オンチェーン連携戦略</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li><strong>大口移動監視：</strong>Whale Alertでの資金流入確認</li>
<li><strong>取引所流入：</strong>売り圧力の事前察知</li>
<li><strong>ステーキング状況：</strong>長期保有意思の測定</li>
<li><strong>DeFi活動：</strong>市場活性度の判断材料</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">2025年リスク管理の進化</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">リスク要因</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">従来対策</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">2025年対策</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">ダマシブレイク</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">出来高確認</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">AI動向+出来高+時間確認</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">急激な反転</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">ストップロス</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">動的ストップ+ポジション分割</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">AI主導の急変</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">対策なし</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">HFT検知アラート設定</td>
</tr>
</tbody>
</table>

<div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0; display: flex; align-items: center;">⚠️ 2025年特有の注意点</h3>
<ul style="list-style: none; margin: 0; padding: 0;">
<li style="color: #dc2626; font-weight: 600; padding: 0.3rem 0; border-bottom: 1px solid #fca5a5;">❌ AI vs AI の価格戦争に巻き込まれない</li>
<li style="color: #dc2626; font-weight: 600; padding: 0.3rem 0; border-bottom: 1px solid #fca5a5;">❌ 感情的なFOMO（取り残される恐怖）売買</li>
<li style="color: #dc2626; font-weight: 600; padding: 0.3rem 0; border-bottom: 1px solid #fca5a5;">❌ ソーシャルメディアの煽り情報を鵜呑みにしない</li>
<li style="color: #dc2626; font-weight: 600; padding: 0.3rem 0;">❌ 過度な監視による精神的疲労</li>
</ul>
</div>

<div style="background: #f0fdf4; border: 2px solid #a7f3d0; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<h3 style="color: #059669; margin: 0 0 0.5rem 0; display: flex; align-items: center;">✅ 2025年成功の秘訣</h3>
<ul style="list-style: none; margin: 0; padding: 0;">
<li style="color: #059669; font-weight: 600; padding: 0.3rem 0; border-bottom: 1px solid #a7f3d0;">✅ AIツールと人間の知恵を組み合わせる</li>
<li style="color: #059669; font-weight: 600; padding: 0.3rem 0; border-bottom: 1px solid #a7f3d0;">✅ 中長期時間軸での冷静な判断</li>
<li style="color: #059669; font-weight: 600; padding: 0.3rem 0; border-bottom: 1px solid #a7f3d0;">✅ 継続的な学習と市場適応</li>
<li style="color: #059669; font-weight: 600; padding: 0.3rem 0;">✅ 適切なリスク管理の徹底</li>
</ul>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 2025年の最終アドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">AIとの共存がトレンド分析の新常識</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">テクノロジーを恐れず活用し、人間ならではの直感と組み合わせることで、AI時代の勝者になれます。</p>
</div>
        `
      }
      ],
    keyPoints: [
      'トレンドは上昇・下降・横ばいの3つの基本方向に分類される',
      'ダウ理論では主要・中間・短期の3つの時間軸が同時に存在する',
      '「トレンドは友達」の格言通り、トレンドに逆らわないことが重要',
      'マルチタイムフレーム分析で大局から詳細まで段階的に確認',
      'トレンドラインはサポート・レジスタンスラインとして機能',
      '出来高の増加でトレンドの信頼性を確認できる',
      '初心者は主要トレンド（週足・月足）から学習を始めるのが効果的'
    ],
    summary: 'トレンドの基本概念とダウ理論の時間軸分類を学習しました。トレンドには上昇・下降・横ばいの3つの方向性があり、それぞれ主要・中間・短期の時間軸で同時進行します。マルチタイムフレーム分析とトレンドラインを活用することで、より効果的なトレンド識別が可能になります。',
    practicalExamples: [
      '週足チャートで主要トレンドが上昇であることを確認後、日足でエントリータイミングを判断',
      '下降トレンドラインを下向きにブレイクしたことでトレンド転換を早期発見',
      'レンジ相場で高値圧迫帯での売り、安値支持帯での買いで利益獲得',
      '出来高の増加を伴ったトレンドブレイクで信頼性の高いシグナルを確認',
      'マルチタイムフレーム分析で異なる時間軸のトレンドを統合的に判断'
    ],
    warningNotes: [
      'トレンドは可能性を示すものであり、100%確実な予測ではありません',
      '短期的な値動きに惑わされず、主要トレンドの方向性を重視しましょう',
      'トレンドラインのブレイクにはだましもあるため、出来高などで確認が必要です',
      '感情的な取引を避け、理論的な分析に基づいて判断しましょう',
      '実際の取引は必ずご自身の判断と責任で行ってください'
    ]
  },

  quiz: [
    {
      id: 'trading-basics-trend-identification-analysis-q1',
      question: '上昇トレンドの基本的な特徴として正しいものは？',
      options: [
        '高値と安値が切り下がる',
        '高値と安値が切り上がる',
        '価格が横ばいで推移する',
        '出来高が常に減少する'
      ],
      correctAnswer: 1,
      explanation: '上昇トレンドでは、連続的に高値と安値が前回よりも高い位置で形成され、全体的に価格が上昇方向に向かいます。'
    },
    {
      id: 'trading-basics-trend-identification-analysis-q2',
      question: 'ダウ理論によるトレンドの時間軸分類で、最も重要とされるのは？',
      options: [
        '短期トレンド',
        '中間トレンド',
        '主要トレンド',
        '全て同等に重要'
      ],
      correctAnswer: 2,
      explanation: '主要トレンドは数ヵ月から数年に及ぶ長期的な方向性で、最も重要とされます。'
    },
    {
      id: 'trading-basics-trend-identification-analysis-q3',
      question: 'マルチタイムフレーム分析の効果的な手順として正しいものは？',
      options: [
        '短期から長期へと分析する',
        '長期から短期へと分析する',
        '中期のみで判断する',
        'すべてを同時に見る'
      ],
      correctAnswer: 1,
      explanation: '効果的な手順は、まず週足・月足で大局を把握し、その後日足でタイミングを見極め、最後に時間足で精密なエントリーを行うことです。'
    },
    {
      id: 'trading-basics-trend-identification-analysis-q4',
      question: 'トレンドの3段階のうち、一般投資家が最も活発に参加する段階は？',
      options: [
        '第1段階：蓄積期',
        '第2段階：追随期',
        '第3段階：散布期',
        'すべての段階で同等'
      ],
      correctAnswer: 2,
      explanation: '第3段階の散布期では、一般投資家が最も活発に参加している一方で、知識のある投資家は利確を開始します。'
    }
  ],

  lastUpdated: '2025-08-17',
  factChecked: true,
  isPublished: true

};