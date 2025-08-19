import type { Lesson } from '@/types';

export const lesson1: Lesson = {
  id: 'trading-basics-chart-basics-candlesticks',
  categoryId: 'trading-basics',
  title: 'チャート基礎：ローソク足の読み方',
  slug: 'chart-basics-candlesticks',
  description: 'トレーディングの基本中の基本であるローソク足チャートの読み方を学習します。価格の動きを正確に理解するための必須スキルです。',
  difficultyLevel: 'beginner',
  estimatedMinutes: 20,
  orderIndex: 1,
  
  content: {
    sections: [
      {
        id: 'section-1',
        title: 'ローソク足とは何か',
        orderIndex: 1,
        type: 'text',
        content: `
<p>ローソク足チャートは、18世紀の日本で生まれた価格表示方法です。<br/>4つの価格情報（始値・高値・安値・終値）を1本のローソクで表現し、相場の流れを視覚的に理解できます。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ローソク足の構成要素</h2>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 1.5rem 0;">
<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #059669; margin: 0 0 1rem 0; text-align: center;">陽線（上昇）</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; line-height: 1.8;">
<li><strong>実体</strong>：始値より終値が高い</li>
<li><strong>色</strong>：白色または緑色</li>
<li><strong>意味</strong>：買い圧力が強い</li>
</ul>
</div>
<div style="background: #fef2f2; border: 2px solid #dc2626; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0; text-align: center;">陰線（下降）</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; line-height: 1.8;">
<li><strong>実体</strong>：始値より終値が低い</li>
<li><strong>色</strong>：黒色または赤色</li>
<li><strong>意味</strong>：売り圧力が強い</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">4つの価格の読み方</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">価格</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">読み方</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">意味</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">始値</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">はじめね</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">その期間の最初の取引価格</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">高値</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">たかね</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">その期間の最も高い価格</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">安値</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">やすね</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">その期間の最も安い価格</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">終値</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">おわりね</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">その期間の最後の取引価格</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">実体とヒゲの意味</h2>

<div style="background: #f1f5f9; border: 2px solid #94a3b8; padding: 1.5rem; border-radius: 8px; margin: 1rem 0;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0;">実体（ローソクの太い部分）</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>陽線</strong>：始値から終値までの上昇幅</li>
<li><strong>陰線</strong>：始値から終値までの下降幅</li>
<li><strong>太い実体</strong>：強いトレンド</li>
<li><strong>細い実体</strong>：迷いがある状態</li>
</ul>
</div>

<div style="background: #fefce8; border: 2px solid #eab308; padding: 1.5rem; border-radius: 8px; margin: 1rem 0;">
<h3 style="color: #a16207; margin: 0 0 1rem 0;">ヒゲ（細い線の部分）</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>上ヒゲ</strong>：実体より上の高値までの線</li>
<li><strong>下ヒゲ</strong>：実体より下の安値までの線</li>
<li><strong>長いヒゲ</strong>：その方向に強い動きがあったが押し戻された</li>
<li><strong>短いヒゲ</strong>：価格が安定している</li>
</ul>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">ローソク足は投資家心理の表れです</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">実体の大きさは確信の強さ、ヒゲの長さは迷いの大きさを表します。</p>
</div>
        `
      },
      
      {
        id: 'section-2',
        title: '時間枠の理解',
        orderIndex: 2,
        type: 'text',
        content: `
<p>ローソク足は設定した時間枠によって異なる情報を表示します。<br/>時間枠の選択により、短期の値動きから長期のトレンドまで把握できます。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">主な時間枠とその特徴</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">時間枠</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">1本の期間</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">適用場面</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">難易度</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">1分足</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">1分間</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">超短期取引</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">上級</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">15分足</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">15分間</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">短期取引</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">中級</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">1時間足</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">1時間</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">デイトレード</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">中級</td>
</tr>
<tr style="background: #dcfce7;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">日足</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">1日</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: bold;">基本分析</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">初級</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">週足</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">1週間</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">長期投資</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">初級</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">初心者におすすめの時間枠</h2>

<div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #059669; margin: 0 0 1rem 0; display: flex; align-items: center;">📊 まずは日足から始めよう</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>ノイズが少ない</strong>：短期的な値動きに惑わされない</li>
<li><strong>判断しやすい</strong>：明確なトレンドが見えやすい</li>
<li><strong>時間的余裕</strong>：慌てて判断する必要がない</li>
<li><strong>学習効果</strong>：基本パターンを覚えやすい</li>
</ul>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ローソク足の形状と心理</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 1rem; border-radius: 4px;">
<h3 style="color: #065f46; margin: 0 0 0.5rem 0;">大陽線（長い緑のローソク）</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li><strong>実体が長い</strong>：始値より終値が大幅に高い</li>
<li><strong>投資家心理</strong>：強い買い意欲、楽観的</li>
<li><strong>意味</strong>：上昇トレンドの継続を示唆</li>
</ul>
</div>

<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">大陰線（長い赤のローソク）</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li><strong>実体が長い</strong>：始値より終値が大幅に低い</li>
<li><strong>投資家心理</strong>：強い売り意欲、悲観的</li>
<li><strong>意味</strong>：下降トレンドの継続を示唆</li>
</ul>
</div>

<div style="background: #fefce8; border-left: 4px solid #eab308; padding: 1rem; border-radius: 4px;">
<h3 style="color: #a16207; margin: 0 0 0.5rem 0;">十字線（ドジ）</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li><strong>実体が小さい</strong>：始値と終値がほぼ同じ</li>
<li><strong>投資家心理</strong>：迷い、方向感がない</li>
<li><strong>意味</strong>：トレンド転換の可能性</li>
</ul>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">色と形で瞬時に判断</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">緑は買い圧力、赤は売り圧力。実体が長いほど確信度が高いと覚えましょう。</p>
</div>
        `
      },
      {
        id: 'section-3',
        title: '基本的なローソク足パターン',
        orderIndex: 3,
        type: 'text',
        content: `
<p>ローソク足パターンは、投資家の心理状態を表し、将来の価格動向を予測する手がかりとなります。<br/>まずは基本的なパターンから覚えていきましょう。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">単体のローソク足パターン</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem; border-radius: 4px;">
<h3 style="color: #d97706; margin: 0 0 0.5rem 0;">ハンマー</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li><strong>形状</strong>：実体が小さく、長い下ヒゲ</li>
<li><strong>出現場所</strong>：下降トレンドの終盤（安値圏）</li>
<li><strong>意味</strong>：売り圧力の減少、反転上昇の可能性</li>
<li><strong>売買シグナル</strong>：買いの検討タイミング</li>
</ul>
</div>

<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">吊り人（首吊り線）</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li><strong>形状</strong>：実体が小さく、長い下ヒゲ（ハンマーと同じ形）</li>
<li><strong>出現場所</strong>：上昇トレンドの終盤（高値圏）</li>
<li><strong>意味</strong>：買い圧力の減少、反転下降の可能性</li>
<li><strong>売買シグナル</strong>：売りの検討タイミング</li>
</ul>
</div>

<div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 1rem; border-radius: 4px;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">ドジ（十字線）</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li><strong>形状</strong>：始値と終値がほぼ同じ（実体がほとんどない）</li>
<li><strong>出現場所</strong>：トレンドの途中や転換点</li>
<li><strong>意味</strong>：買いと売りの均衡、迷いの状態</li>
<li><strong>売買シグナル</strong>：トレンド転換の警戒信号</li>
</ul>
</div>

<div style="background: #f3e8ff; border-left: 4px solid #a855f7; padding: 1rem; border-radius: 4px;">
<h3 style="color: #7c2d12; margin: 0 0 0.5rem 0;">流れ星（シューティングスター）</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li><strong>形状</strong>：実体が小さく、長い上ヒゲ</li>
<li><strong>出現場所</strong>：上昇トレンドの終盤（高値圏）</li>
<li><strong>意味</strong>：高値への挑戦失敗、売り圧力の増加</li>
<li><strong>売買シグナル</strong>：売りの検討タイミング</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">複数本の組み合わせパターン</h2>

<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #059669; margin: 0 0 1rem 0;">包み線（エンガルフィング）</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>強気の包み線</strong>：小さな陰線の後に大きな陽線</li>
<li><strong>弱気の包み線</strong>：小さな陽線の後に大きな陰線</li>
<li><strong>特徴</strong>：2本目が1本目を完全に包み込む</li>
<li><strong>意味</strong>：強いトレンド転換の可能性</li>
</ul>
</div>

<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #d97706; margin: 0 0 1rem 0;">明けの明星（モーニングスター）</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>1本目</strong>：長い陰線（下降継続）</li>
<li><strong>2本目</strong>：小さな実体（迷い）</li>
<li><strong>3本目</strong>：長い陽線（上昇転換）</li>
<li><strong>意味</strong>：下降トレンドから上昇トレンドへの転換</li>
</ul>
</div>

<div style="background: #fef2f2; border: 2px solid #dc2626; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0;">宵の明星（イブニングスター）</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>1本目</strong>：長い陽線（上昇継続）</li>
<li><strong>2本目</strong>：小さな実体（迷い）</li>
<li><strong>3本目</strong>：長い陰線（下降転換）</li>
<li><strong>意味</strong>：上昇トレンドから下降トレンドへの転換</li>
</ul>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">パターン分析のコツ</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">確認事項</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">重要度</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">チェックポイント</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">出現場所</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">高</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">高値圏・安値圏・トレンド中</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">出来高</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">高</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">パターン形成時の取引量</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">前後の流れ</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">中</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">直前のトレンドの強さ</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">時間枠</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">中</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">長い時間枠ほど信頼度高</td>
</tr>
</tbody>
</table>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">パターンは「可能性」を示すもの</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">100%当たるパターンはありません。他の分析と組み合わせて総合的に判断しましょう。</p>
</div>
        `
      },
      {
        id: 'section-4',
        title: '実際の市場での活用例',
        orderIndex: 4,
        type: 'text',
        content: `
<p>ローソク足パターンを実際の取引でどのように活用するかを、<br/>具体的な例とともに学習しましょう。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ビットコインチャートでの実例</h2>

<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #059669; margin: 0 0 1rem 0; display: flex; align-items: center;">📈 上昇トレンドでの活用</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>状況</strong>：価格が徐々に上昇している局面</li>
<li><strong>パターン</strong>：押し目で小さなハンマーが出現</li>
<li><strong>判断</strong>：上昇トレンド継続の可能性が高い</li>
<li><strong>行動</strong>：買いエントリーを検討</li>
<li><strong>リスク管理</strong>：ハンマーの安値を下回ったら損切り</li>
</ul>
</div>

<div style="background: #fef2f2; border: 2px solid #dc2626; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0; display: flex; align-items: center;">📉 下降トレンドでの活用</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>状況</strong>：価格が継続的に下落している局面</li>
<li><strong>パターン</strong>：戻り高値で吊り人が出現</li>
<li><strong>判断</strong>：下降トレンド継続の可能性が高い</li>
<li><strong>行動</strong>：売りエントリーまたは買いポジションの利確を検討</li>
<li><strong>リスク管理</strong>：吊り人の高値を上回ったら手仕舞い</li>
</ul>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">エントリーとエグジットのタイミング</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">パターン</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">エントリー</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">ストップロス</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">利確目標</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">ハンマー</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">翌日の始値</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">ハンマーの安値</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">直近高値</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">吊り人</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">翌日の始値</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">吊り人の高値</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">直近安値</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">エンガルフィング</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">包み線完成後</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">包み線の反対端</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">トレンド方向の次の抵抗</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">スター系</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">3本目確定後</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">2本目の反対端</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">パターン高さの2倍</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">出来高との組み合わせ分析</h2>

<div style="background: #fefce8; border: 2px solid #eab308; padding: 1.5rem; border-radius: 8px; margin: 1rem 0;">
<h3 style="color: #a16207; margin: 0 0 1rem 0;">出来高を伴うパターンは信頼度アップ</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>大きな出来高 + ハンマー</strong>：反転上昇の確率が高まる</li>
<li><strong>大きな出来高 + 吊り人</strong>：反転下降の確率が高まる</li>
<li><strong>小さな出来高 + パターン</strong>：だましの可能性が高い</li>
<li><strong>出来高の目安</strong>：過去20日平均の1.5倍以上</li>
</ul>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">よくある失敗パターンと対策</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">❌ パターンだけで判断</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li><strong>問題</strong>：ローソク足パターンのみで売買を決定</li>
<li><strong>対策</strong>：トレンド、サポート・レジスタンス、出来高も確認</li>
</ul>
</div>

<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">❌ 損切りを設定しない</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li><strong>問題</strong>：パターンが外れた時の損失が大きくなる</li>
<li><strong>対策</strong>：エントリー前に必ず損切りラインを決める</li>
</ul>
</div>

<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">❌ 短期足でのパターン重視</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li><strong>問題</strong>：1分足や5分足のパターンは偽シグナルが多い</li>
<li><strong>対策</strong>：日足以上の時間枠でパターンを確認</li>
</ul>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">練習と経験が重要</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">デモトレードでパターンの識別と活用方法を十分に練習してから実際の取引に進みましょう。</p>
</div>
        `
      },
      {
        id: 'section-5',
        title: '学習のステップと練習方法',
        orderIndex: 5,
        type: 'text',
        content: `
<p>ローソク足分析を効果的に身につけるための、<br/>段階的な学習方法と練習のコツをお伝えします。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">学習の4つのステップ</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 1rem; border-radius: 4px;">
<h3 style="color: #065f46; margin: 0 0 0.5rem 0;">STEP1：基本形状の理解</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li><strong>期間</strong>：1-2週間</li>
<li><strong>内容</strong>：陽線・陰線・実体・ヒゲの基本概念</li>
<li><strong>練習</strong>：過去チャートで各要素を識別</li>
<li><strong>目標</strong>：一目で価格の方向性を判断できる</li>
</ul>
</div>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem; border-radius: 4px;">
<h3 style="color: #d97706; margin: 0 0 0.5rem 0;">STEP2：単体パターンの習得</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li><strong>期間</strong>：2-3週間</li>
<li><strong>内容</strong>：ハンマー・吊り人・ドジ・流れ星</li>
<li><strong>練習</strong>：実際のチャートでパターンを探す</li>
<li><strong>目標</strong>：主要パターンを瞬時に認識できる</li>
</ul>
</div>

<div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 1rem; border-radius: 4px;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">STEP3：組み合わせパターンの理解</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li><strong>期間</strong>：3-4週間</li>
<li><strong>内容</strong>：エンガルフィング・スター系パターン</li>
<li><strong>練習</strong>：複数本の関係性を分析</li>
<li><strong>目標</strong>：複雑なパターンも識別できる</li>
</ul>
</div>

<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">STEP4：総合分析の実践</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li><strong>期間</strong>：継続的</li>
<li><strong>内容</strong>：パターン + トレンド + 出来高</li>
<li><strong>練習</strong>：デモトレードで実戦練習</li>
<li><strong>目標</strong>：総合的な市場分析ができる</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">効果的な練習方法</h2>

<div style="background: #f8fafc; border: 2px solid #94a3b8; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0;">日課にしたい練習</h3>
<ol style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>毎日10分のチャート観察</strong>：日足チャートで当日のローソク足を分析</li>
<li><strong>過去チャートの復習</strong>：週に1回、過去1年のチャートを振り返る</li>
<li><strong>パターン日記</strong>：見つけたパターンとその後の展開を記録</li>
<li><strong>仮想取引</strong>：デモトレードでリスクなく実践練習</li>
</ol>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">チャート分析のツールと環境</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">ツール種別</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">初心者向け</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">中級者向け</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">特徴</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">取引所チャート</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">○</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">△</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">無料、基本機能</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">TradingView</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">○</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">○</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">高機能、描画ツール豊富</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">MT5</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">×</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">○</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">プロ仕様、自動売買可能</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">専用アプリ</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">○</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">△</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">スマホ対応、操作簡単</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">よくある初心者の疑問</h2>

<div style="background: #fefce8; border: 2px solid #eab308; padding: 1.5rem; border-radius: 8px; margin: 1rem 0;">
<h3 style="color: #a16207; margin: 0 0 1rem 0;">Q&A形式で解決</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>Q: どの時間枠から始めるべき？</strong><br/>A: 日足から始めて、慣れてから短時間足に挑戦</li>
<li><strong>Q: パターンが見つからない</strong><br/>A: 最初は完璧でなくても類似形状を探す練習から</li>
<li><strong>Q: 外れることが多い</strong><br/>A: パターン単体でなく、他の指標と組み合わせて判断</li>
<li><strong>Q: どれくらいで上達する？</strong><br/>A: 毎日練習すれば3ヶ月で基本パターンは習得可能</li>
</ul>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">継続は力なり</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">短時間でも毎日チャートを見る習慣が、確実にスキルアップにつながります。</p>
</div>
        `
      },

      {
        id: 'section-6',
        title: '安全な取引のための基本的注意点',
        orderIndex: 6,
        type: 'text',
        content: `
<p>暗号通貨取引を始める前に知っておくべき、<br/>基本的なリスク管理と安全な取引のための重要なポイントを確認しましょう。</p>

<h2 style="color: #dc2626; margin: 2rem 0 1rem 0;">⚠️ 取引における基本的なリスク</h2>

<div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0;">暗号通貨特有のリスク</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>価格変動リスク</strong>：価格が大幅に変動する可能性</li>
<li><strong>流動性リスク</strong>：売りたい時に売れない可能性</li>
<li><strong>技術的リスク</strong>：システム障害やハッキングの可能性</li>
<li><strong>規制リスク</strong>：法規制の変更による影響</li>
<li><strong>市場リスク</strong>：24時間取引による予期しない変動</li>
</ul>
</div>

<h2 style="color: #059669; margin: 2rem 0 1rem 0;">✅ 基本的なリスク管理方法</h2>

<div style="background: #f0fdf4; border: 2px solid #a7f3d0; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #059669; margin: 0 0 1rem 0;">初心者が守るべき基本ルール</h3>
<ol style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>余剰資金で取引</strong>：生活費には絶対に手を付けない</li>
<li><strong>小額から開始</strong>：まずは少額で経験を積む</li>
<li><strong>分散投資</strong>：一つの通貨に全資金を投じない</li>
<li><strong>損切りルール</strong>：損失が膨らむ前に撤退する</li>
<li><strong>感情的な判断を避ける</strong>：冷静な分析に基づいて決断</li>
</ol>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">損切りとポジションサイジングの基本</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">項目</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">推奨設定</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">理由</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">損切りライン</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">-5%〜-10%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">大きな損失を避ける</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">1回の取引額</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">全資金の5%以下</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">リスク分散</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">利確目標</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">+10%〜+20%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">利益確定</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">同時保有銘柄</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">3-5銘柄以下</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">管理の簡素化</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">初心者向けの段階的学習プラン</h2>

<div style="background: #f8fafc; border: 2px solid #94a3b8; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0;">学習の進め方</h3>
<ol style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>第1段階（1ヶ月）</strong>：基本用語とローソク足の読み方</li>
<li><strong>第2段階（1ヶ月）</strong>：デモトレードでの実践練習</li>
<li><strong>第3段階（1ヶ月）</strong>：少額実取引での経験積み上げ</li>
<li><strong>第4段階（継続）</strong>：継続的な学習と手法の改善</li>
</ol>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">よくある初心者の失敗と対策</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">❌ 感情的な取引</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li><strong>問題</strong>：恐怖や欲で冷静な判断ができない</li>
<li><strong>対策</strong>：あらかじめルールを決めて機械的に実行</li>
</ul>
</div>

<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">❌ 過剰なレバレッジ</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li><strong>問題</strong>：高いレバレッジで大きな損失</li>
<li><strong>対策</strong>：慣れるまではレバレッジを使わない</li>
</ul>
</div>

<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">❌ 情報に振り回される</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li><strong>問題</strong>：SNSやニュースで売買を決める</li>
<li><strong>対策</strong>：自分の分析に基づいて判断する</li>
</ul>
</div>
</div>

<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<h3 style="color: #d97706; margin: 0 0 0.5rem 0; display: flex; align-items: center;">⚠️ 重要な免責事項</h3>
<p style="margin: 0; color: #374151; font-size: 0.9em;">このレッスンは教育目的であり、投資助言ではありません。暗号通貨取引には高いリスクが伴い、投資金額の全額を失う可能性があります。実際の取引は必ずご自身の判断と責任で行ってください。</p>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 最終アドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">焦らず着実に学習を進めよう</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">暗号通貨取引は一朝一夕で習得できるものではありません。基礎をしっかりと身につけて、段階的にスキルアップしていくことが成功への近道です。</p>
</div>
        `
      },
      ],
    keyPoints: [
      'ローソク足は始値・高値・安値・終値の4つの価格情報を一本で表現する基本的なチャート',
      '陽線は買い圧力、陰線は売り圧力を示し、実体の大きさで勢いの強さがわかる',
      '初心者は日足チャートから始めて、基本パターンを覚えることが重要',
      'ハンマー・吊り人・ドジなどの基本パターンで市場心理を読み取れる',
      'パターン出現場所（高値圏・安値圏）と出来高の確認が信頼度向上のポイント',
      '基本的なリスク管理として損切りルールとポジションサイジングの設定が必須'
    ],
    summary: 'ローソク足チャートの基本的な読み方と活用方法を学習しました。4つの価格情報（始値・高値・安値・終値）から構成されるローソク足は、市場の方向性と投資家心理を理解するための重要なツールです。基本パターンを覚え、適切なリスク管理を行うことで、安全で効果的な市場分析の基礎を築けます。',
    practicalExamples: [
      '日足チャートでハンマーパターンが安値圏に出現し、その後上昇トレンドが継続',
      '高値圏での吊り人パターン後に価格が下落し、利確タイミングとして機能',
      '大陽線の出現で強い買い圧力を確認し、トレンド継続を判断',
      '十字線（ドジ）出現後のトレンド転換を早期に察知',
      '出来高を伴うエンガルフィングパターンで確実性の高いシグナルを確認'
    ],
    warningNotes: [
      '暗号通貨取引には高いリスクが伴い、投資金額の全額を失う可能性があります',
      'ローソク足パターンは可能性を示すものであり、100%当たる保証はありません',
      '必ず他の分析手法と組み合わせて総合的に判断することが重要です',
      '感情的な取引を避け、事前に決めたルールに従って機械的に実行しましょう',
      '実際の取引は必ずご自身の判断と責任で行ってください'
    ]
  },
  
  quiz: [
    {
      id: 'trading-basics-chart-basics-candlesticks-q1',
      question: 'ローソク足の「実体」が表す価格情報として正しいものは？',
      options: [
        '高値と安値の価格差',
        '始値と終値の価格差',
        '始値と高値の価格差', 
        '安値と終値の価格差'
      ],
      correctAnswer: 1,
      explanation: '実体（Body）は始値と終値の価格差を表します。この差が大きいほど、その期間の価格変動が激しかったことを示します。'
    },
    {
      id: 'trading-basics-chart-basics-candlesticks-q2',
      question: '陽線が示す市場の状況として正しいものは？',
      options: [
        '売り圧力が強い',
        '買い圧力が強い',
        '価格が変動しない',
        '取引量が少ない'
      ],
      correctAnswer: 1,
      explanation: '陽線は終値が始値より高いローソク足で、買い圧力が売り圧力を上回っていることを示します。'
    },
    {
      id: 'trading-basics-chart-basics-candlesticks-q3',
      question: '初心者が最初に学習すべき時間枠として最も適切なものは？',
      options: [
        '1分足',
        '15分足',
        '日足',
        '週足'
      ],
      correctAnswer: 2,
      explanation: '日足は短期的なノイズが少なく、明確なトレンドが見やすいため、初心者の学習に最も適した時間枠です。'
    },
    {
      id: 'trading-basics-chart-basics-candlesticks-q4',
      question: 'ハンマーパターンが最も有効とされる出現場所は？',
      options: [
        '上昇トレンドの初期',
        '上昇トレンドの終盤（高値圏）',
        '下降トレンドの終盤（安値圏）',
        'レンジ相場の中央'
      ],
      correctAnswer: 2,
      explanation: 'ハンマーは下降トレンドの終盤（安値圏）に出現した時に、売り圧力の減少と反転上昇の可能性を示す最も信頼性の高いシグナルとなります。'
    },
    {
      id: 'trading-basics-chart-basics-candlesticks-q5',
      question: '基本的なリスク管理として推奨される1回の取引額の目安は？',
      options: [
        '全資金の1%以下',
        '全資金の5%以下',
        '全資金の10%以下',
        '全資金の20%以下'
      ],
      correctAnswer: 1,
      explanation: '全資金の5%以下に抑えることで、大きな損失を回避し、複数回の取引でリスクを分散できます。'
    }
  ],
  
  lastUpdated: '2025-08-17',
  factChecked: true,
  isPublished: true
}; 