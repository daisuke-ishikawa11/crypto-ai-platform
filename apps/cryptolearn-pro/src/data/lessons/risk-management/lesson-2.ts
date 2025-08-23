import type { Lesson } from '@/types';

export const lesson2: Lesson = {
  id: 'risk-management-cognitive-bias-deep-dive',
  categoryId: 'risk-management',
  title: '認知バイアスの深掘り：投資判断を歪める心理的罠',
  slug: 'cognitive-bias-deep-dive',
  description: '投資判断に大きな影響を与える代表的な認知バイアスを詳しく学び、それぞれの対策方法を習得します',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 30,
  orderIndex: 2,
  content: {
    sections: [
      {
        id: 'section-1',
        title: '認知バイアスの理論的背景',
        orderIndex: 1,
        type: 'text',
        content: `
<p>認知バイアスは、<strong>人間の思考や判断における系統的な偏り</strong>のことで、進化の過程で獲得した脳の効率的な情報処理メカニズムから生まれます。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">なぜ認知バイアスが存在するのか？</h2>

<div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
<div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 1.5rem; border-radius: 4px;">
<h3 style="color: #0c4a6e; margin: 0 0 1rem 0;">🏡 進化的適応</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>限られた時間での迅速な判断が生存に有利だった</li>
<li>「近道思考（ヒューリスティクス）」として発達</li>
<li>複雑な情報を単純化して処理する能力</li>
</ul>
</div>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1.5rem; border-radius: 4px;">
<h3 style="color: #d97706; margin: 0 0 1rem 0;">⚡ エネルギー効率</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>脳は全身エネルギーの約20%を消費する高コスト器官</li>
<li>すべての情報を完璧に分析することは非効率</li>
<li>パターン認識による素早い判断を優先</li>
</ul>
</div>

<div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 1.5rem; border-radius: 4px;">
<h3 style="color: #059669; margin: 0 0 1rem 0;">👥 社会性の影響</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>集団での協調行動が生存に有利</li>
<li>他者の行動に合わせる傾向が進化</li>
<li>同調圧力への敏感性</li>
</ul>
</div>
</div>

<h2 style="color: #dc2626; margin: 2rem 0 1rem 0;">投資における認知バイアスの問題点</h2>

<p>しかし、現代の複雑な金融市場では、これらの「生存に有利だった」思考パターンが逆に不利に働くことが多くなります：</p>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #dc2626; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">生存に有利だった本能</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">投資では不利になる理由</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">短期的思考</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">長期投資の必要性</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">群れに従う本能</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">独立した判断の重要性</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">リスク回避</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">適切なリスクテイクの必要性</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">パターン認識</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">データに基づく分析の重要性</td>
</tr>
</tbody>
</table>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">バイアスは「敵」ではなく「特性」</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">認知バイアスは人間の本能的な思考パターンです。完全に排除することはできませんが、理解して上手に付き合うことが大切です。</p>
</div>
認知バイアスは、<strong>人間の思考や判断における系統的な偏り</strong>のことで、進化の過程で獲得した脳の効率的な情報処理メカニズムから生まれます。

<strong>なぜ認知バイアスが存在するのか？</strong>

• <strong>進化的適応：</strong>
  - 限られた時間での迅速な判断が生存に有利だった
  - 「近道思考（ヒューリスティクス）」として発達
  - 複雑な情報を単純化して処理する能力

• <strong>エネルギー効率：</strong>
  - 脳は全身エネルギーの約20%を消費する高コスト器官
  - すべての情報を完璧に分析することは非効率
  - パターン認識による素早い判断を優先

• <strong>社会性の影響：</strong>
  - 集団での協調行動が生存に有利
  - 他者の行動に合わせる傾向が進化
  - 同調圧力への敏感性

<strong>投資における認知バイアスの問題点：</strong>

しかし、現代の複雑な金融市場では、これらの「生存に有利だった」思考パターンが逆に不利に働くことが多くなります：

<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>短期的思考 vs 長期投資の必要性</li>
<li>群れに従う本能 vs 独立した判断の重要性</li>
<li>リスク回避 vs 適切なリスクテイクの必要性</li>
<li>パターン認識 vs データに基づく分析の重要性</li>
</ul>
        `
      },
      {
        id: 'section-2',
        title: '代表的な認知バイアス詳説',
        orderIndex: 2,
        type: 'text',
        content: `
<p>投資判断に特に大きな影響を与える認知バイアスを詳しく見ていきましょう。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">投資に特に危険な5つのバイアス</h2>

<div style="display: grid; gap: 2rem; margin: 1.5rem 0;">
<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #d97706; margin: 0 0 1rem 0; display: flex; align-items: center;">🔍 1. 確証バイアス（Confirmation Bias）</h3>
<p style="margin: 0 0 1rem 0; color: #374151; font-weight: 500;"><em>定義：</em> 自分の先入観や信念を支持する情報ばかりを集め、反証となる情報を無視する僾向</p>

<div style="background: #fffbeb; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<p style="margin: 0 0 0.5rem 0; color: #d97706; font-weight: 600;">投資での具体例：</p>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>ビットコインを保有 → ビットコインのポジティブニュースのみ読む</li>
<li>特定企業の株を保有 → その企業の好材料のみに注目</li>
<li>「今年は上昇相場」と信じる → 楽観的な予測記事のみ収集</li>
</ul>
</div>

<div style="background: #dcfce7; padding: 1rem; border-radius: 4px;">
<p style="margin: 0 0 0.5rem 0; color: #059669; font-weight: 600;">対策：</p>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>デビル・アドボケート法：</strong> 投資前に必ず反対意見を探し、検討する</li>
<li><strong>情報源の多様化：</strong> 異なる視点のメディア・アナリストをフォロー</li>
<li><strong>プレモルテム分析：</strong> 「この投資が失敗する理由」を事前に考える</li>
</ul>
</div>
</div>

<div style="background: #e0f2fe; border: 2px solid #0284c7; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #0c4a6e; margin: 0 0 1rem 0; display: flex; align-items: center;">⚓ 2. アンカリング効果（Anchoring Bias）</h3>
<p style="margin: 0 0 1rem 0; color: #374151; font-weight: 500;"><em>定義：</em> 最初に提示された数値や情報が「錦（アンカー）」となり、その後の判断に過度な影響を与える現象</p>

<div style="background: #f0f9ff; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<p style="margin: 0 0 0.5rem 0; color: #0c4a6e; font-weight: 600;">投資での具体例：</p>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>株価10,000円で購入 → 8,000円でも「10,000円で買ったから損切りしたくない」</li>
<li>IPO価格に固執 → 「公開価格より安いから割安」という思考</li>
<li>過去の最高値への固執 → 「前回は20,000円まで上がったから今回も」</li>
</ul>
</div>

<div style="background: #dcfce7; padding: 1rem; border-radius: 4px;">
<p style="margin: 0 0 0.5rem 0; color: #059669; font-weight: 600;">対策：</p>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>複数基準での評価：</strong> PER、PBR、DCFなど複数の指標で判断</li>
<li><strong>定期的な見直し：</strong> 購入価格を忘れ、現在価値のみで判断</li>
<li><strong>相対評価の活用：</strong> 他の投資機会と比較して判断</li>
</ul>
</div>
</div>

<div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0; display: flex; align-items: center;">😢 3. 損失回避バイアス（Loss Aversion）</h3>
<p style="margin: 0 0 1rem 0; color: #374151; font-weight: 500;"><em>定義：</em> 同額でも利益を得る喜びよりも損失を被る痛みを約2-2.5倍強く感じる心理的傾向</p>

<div style="background: #fef2f2; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<p style="margin: 0 0 0.5rem 0; color: #dc2626; font-weight: 600;">投資での具体例：</p>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>含み損銀柄の塩漬け → 損失確定を避けたい心理</li>
<li>含み益銀柄の早期売却 → 利益を確実に確保したい心理</li>
<li>レバレッジの過度な回避 → 損失可能性を過大評価</li>
</ul>
</div>

<div style="background: #dcfce7; padding: 1rem; border-radius: 4px;">
<p style="margin: 0 0 0.5rem 0; color: #059669; font-weight: 600;">対策：</p>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>機械的な損切りルール：</strong> 購入時に損切り水準を決定</li>
<li><strong>リスク・リワード比の明確化：</strong> 期待値で判断する習慣</li>
<li><strong>成功事例の可視化：</strong> 適切な損切りが全体パフォーマンスに与えた効果を記録</li>
</ul>
</div>
</div>

<div style="background: #f0fdf4; border: 2px solid #a7f3d0; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #059669; margin: 0 0 1rem 0; display: flex; align-items: center;">😎 4. 過信バイアス（Overconfidence Bias）</h3>
<p style="margin: 0 0 1rem 0; color: #374151; font-weight: 500;"><em>定義：</em> 自分の能力、知識、判断の正確性を実際以上に高く評価する傾向</p>

<div style="background: #f0fdf4; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<p style="margin: 0 0 0.5rem 0; color: #059669; font-weight: 600;">投資での具体例：</p>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>数回の成功で「投資の才能がある」と思い込む</li>
<li>市場分析能力を過大評価し、過度な集中投資</li>
<li>情報収集・分析時間の不足</li>
</ul>
</div>

<div style="background: #dcfce7; padding: 1rem; border-radius: 4px;">
<p style="margin: 0 0 0.5rem 0; color: #059669; font-weight: 600;">対策：</p>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>統計的思考：</strong> 成功・失敗を確率的に捉える</li>
<li><strong>外部評価の活用：</strong> 第三者による投資成果の客観評価</li>
<li><strong>継続的な学習：</strong> 「知らないことを知る」謙虚な姿勢</li>
</ul>
</div>
</div>

<div style="background: #f5f3ff; border: 2px solid #c084fc; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #7c3aed; margin: 0 0 1rem 0; display: flex; align-items: center;">🐑 5. 群集心理（Herding Behavior）</h3>
<p style="margin: 0 0 1rem 0; color: #374151; font-weight: 500;"><em>定義：</em> 他の投資家と同じ行動を取ることで安心感を得ようとする心理的僾向</p>

<div style="background: #f5f3ff; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<p style="margin: 0 0 0.5rem 0; color: #7c3aed; font-weight: 600;">投資での具体例：</p>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>「みんなが買っているから」という理由での投資</li>
<li>SNSでの話題株への飛びつき</li>
<li>暴落時のパニック売りへの同調</li>
</ul>
</div>

<div style="background: #dcfce7; padding: 1rem; border-radius: 4px;">
<p style="margin: 0 0 0.5rem 0; color: #059669; font-weight: 600;">対策：</p>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>独立した判断基準：</strong> 自分なりの投資哲学・基準の確立</li>
<li><strong>逆張り思考の検討：</strong> 「なぜ市場は間違っているか」を考える</li>
<li><strong>群衆心理指標の活用：</strong> VIX指数、出来高などで市場心理を客観視</li>
</ul>
</div>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">バイアス対策は「予防」が最善</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">バイアスの影響を受けた後で修正するより、事前のルール設定とシステム的なアプローチが効果的です。</p>
</div>
投資判断に特に大きな影響を与える認知バイアスを詳しく見ていきましょう。

<strong>1. 確証バイアス（Confirmation Bias）</strong>

*定義：* 自分の先入観や信念を支持する情報ばかりを集め、反証となる情報を無視する傾向

*投資での具体例：*
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>ビットコインを保有 → ビットコインのポジティブニュースのみ読む</li>
<li>特定企業の株を保有 → その企業の好材料のみに注目</li>
<li>「今年は上昇相場」と信じる → 楽観的な予測記事のみ収集</li>
</ul>

*対策：*
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>デビル・アドボケート法：</strong> 投資前に必ず反対意見を探し、検討する</li>
<li><strong>情報源の多様化：</strong> 異なる視点のメディア・アナリストをフォロー</li>
<li><strong>プレモルテム分析：</strong> 「この投資が失敗する理由」を事前に考える</li>
</ul>

<strong>2. アンカリング効果（Anchoring Bias）</strong>

*定義：* 最初に提示された数値や情報が「錨（アンカー）」となり、その後の判断に過度な影響を与える現象

*投資での具体例：*
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>株価10,000円で購入 → 8,000円でも「10,000円で買ったから損切りしたくない」</li>
<li>IPO価格に固執 → 「公開価格より安いから割安」という思考</li>
<li>過去の最高値への固執 → 「前回は20,000円まで上がったから今回も」</li>
</ul>

*対策：*
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>複数基準での評価：</strong> PER、PBR、DCFなど複数の指標で判断</li>
<li><strong>定期的な見直し：</strong> 購入価格を忘れ、現在価値のみで判断</li>
<li><strong>相対評価の活用：</strong> 他の投資機会と比較して判断</li>
</ul>

<strong>3. 損失回避バイアス（Loss Aversion）</strong>

*定義：* 同額でも利益を得る喜びより損失を被る痛みを約2-2.5倍強く感じる心理的傾向

*投資での具体例：*
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>含み損銘柄の塩漬け → 損失確定を避けたい心理</li>
<li>含み益銘柄の早期売却 → 利益を確実に確保したい心理</li>
<li>レバレッジの過度な回避 → 損失可能性を過大評価</li>
</ul>

*対策：*
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>機械的な損切りルール：</strong> 購入時に損切り水準を決定</li>
<li><strong>リスク・リワード比の明確化：</strong> 期待値で判断する習慣</li>
<li><strong>成功事例の可視化：</strong> 適切な損切りが全体パフォーマンスに与えた効果を記録</li>
</ul>

<strong>4. 過信バイアス（Overconfidence Bias）</strong>

*定義：* 自分の能力、知識、判断の正確性を実際以上に高く評価する傾向

*投資での具体例：*
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>数回の成功で「投資の才能がある」と思い込む</li>
<li>市場分析能力を過大評価し、過度な集中投資</li>
<li>情報収集・分析時間の不足</li>
</ul>

*対策：*
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>統計的思考：</strong> 成功・失敗を確率的に捉える</li>
<li><strong>外部評価の活用：</strong> 第三者による投資成果の客観評価</li>
<li><strong>継続的な学習：</strong> 「知らないことを知る」謙虚な姿勢</li>
</ul>

<strong>5. 群集心理（Herding Behavior）</strong>

*定義：* 他の投資家と同じ行動を取ることで安心感を得ようとする心理的傾向

*投資での具体例：*
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>「みんなが買っているから」という理由での投資</li>
<li>SNSでの話題株への飛びつき</li>
<li>暴落時のパニック売りへの同調</li>
</ul>

*対策：*
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>独立した判断基準：</strong> 自分なりの投資哲学・基準の確立</li>
<li><strong>逆張り思考の検討：</strong> 「なぜ市場は間違っているか」を考える</li>
<li><strong>群衆心理指標の活用：</strong> VIX指数、出来高などで市場心理を客観視</li>
</ul>
        `
      },
      {
        id: 'section-3',
        title: '実践的なバイアス対策フレームワーク',
        orderIndex: 3,
        type: 'text',
        content: `
<p>認知バイアスを完全に排除することは不可能ですが、その影響を最小限に抑える実践的な方法があります。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">DECIDE フレームワーク</h2>

<p>投資判断時に以下の6ステップを必ず実行する：</p>

<div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
<div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0; display: flex; align-items: center;">🎯 D - Define（問題の明確化）</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>何を決めようとしているのか明確にする</li>
<li>投資目的、期間、リスク許容度の再確認</li>
<li>意思決定の背景・理由を文書化</li>
</ul>
</div>

<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #d97706; margin: 0 0 1rem 0; display: flex; align-items: center;">📊 E - Establish（判断基準の設定）</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>成功・失敗の判断基準を事前に設定</li>
<li>定量的な指標（期待リターン、許容損失額など）</li>
<li>定性的な指標（企業のビジョン、業界の将来性など）</li>
</ul>
</div>

<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #059669; margin: 0 0 1rem 0; display: flex; align-items: center;">🔍 C - Consider（選択肢の検討）</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>複数の投資選択肢を比較検討</li>
<li>投資しないという選択肢も含める</li>
<li>各選択肢のメリット・デメリットを整理</li>
</ul>
</div>

<div style="background: #fef7ff; border: 2px solid #c084fc; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #7c3aed; margin: 0 0 1rem 0; display: flex; align-items: center;">✨ I - Identify（最良選択の特定）</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>設定した基準に基づいて客観的に評価</li>
<li>感情的な好み・嫌いを排除</li>
<li>期待値計算による定量的比較</li>
</ul>
</div>

<div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0; display: flex; align-items: center;">🛠️ D - Develop（実行計画の策定）</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>具体的な投資実行計画の策定</li>
<li>エントリー・エグジット戦略の明確化</li>
<li>リスク管理・モニタリング計画</li>
</ul>
</div>

<div style="background: #f1f5f9; border: 2px solid #94a3b8; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #475569; margin: 0 0 1rem 0; display: flex; align-items: center;">📊 E - Evaluate（評価・改善）</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>定期的な投資成果の評価</li>
<li>判断プロセスの振り返り</li>
<li>改善点の特定と次回への活用</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">感情制御テクニック</h2>

<div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
<div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 1.5rem; border-radius: 4px;">
<h3 style="color: #0c4a6e; margin: 0 0 1rem 0;">1. 10-10-10 ルール</h3>
<p style="margin: 0 0 1rem 0; color: #374151;">投資判断前に以下を考える：</p>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>10分後にどう感じるか？</li>
<li>10ヶ月後にどう感じるか？</li>
<li>10年後にどう感じるか？</li>
</ul>
</div>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1.5rem; border-radius: 4px;">
<h3 style="color: #d97706; margin: 0 0 1rem 0;">2. プレモルテム分析</h3>
<p style="margin: 0; color: #374151;">投資実行前に「この投資が失敗する理由」を徹底的に考える</p>
</div>

<div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 1.5rem; border-radius: 4px;">
<h3 style="color: #059669; margin: 0 0 1rem 0;">3. 時間的距離の確保</h3>
<p style="margin: 0; color: #374151;">重要な投資判断では24-48時間のクールダウンタイムを設ける</p>
</div>

<div style="background: #fef7ff; border-left: 4px solid #c084fc; padding: 1.5rem; border-radius: 4px;">
<h3 style="color: #7c3aed; margin: 0 0 1rem 0;">4. 外部視点の導入</h3>
<p style="margin: 0; color: #374151;">「もし友人がこの投資について相談してきたら、何とアドバイスするか？」を考える</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">継続的改善のための記録システム</h2>

<div style="background: #f8fafc; border: 2px solid #94a3b8; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #475569; margin: 0 0 1rem 0;">投資ジャーナルの作成</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>投資判断の理由と根拠</li>
<li>その時の感情状態・市場環境</li>
<li>結果とその分析</li>
<li>学んだ教訓と改善点</li>
</ul>
</div>

<div style="background: #fef7ff; border: 2px solid #c084fc; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #7c3aed; margin: 0 0 1rem 0;">バイアス・チェックリスト</h3>
<p style="margin: 0 0 1rem 0; color: #374151;">投資判断前に以下を自問：</p>
<ul style="list-style: none; margin: 0; padding: 0;">
<li style="padding: 0.5rem 0; border-bottom: 1px solid #e5e7eb; color: #374151;"><input type="checkbox" style="margin-right: 0.5rem;"> 確証バイアス：反対意見も検討したか？</li>
<li style="padding: 0.5rem 0; border-bottom: 1px solid #e5e7eb; color: #374151;"><input type="checkbox" style="margin-right: 0.5rem;"> アンカリング：過去の価格に固執していないか？</li>
<li style="padding: 0.5rem 0; border-bottom: 1px solid #e5e7eb; color: #374151;"><input type="checkbox" style="margin-right: 0.5rem;"> 損失回避：感情的に損切りを避けていないか？</li>
<li style="padding: 0.5rem 0; border-bottom: 1px solid #e5e7eb; color: #374151;"><input type="checkbox" style="margin-right: 0.5rem;"> 過信：自分の判断を過信していないか？</li>
<li style="padding: 0.5rem 0; color: #374151;"><input type="checkbox" style="margin-right: 0.5rem;"> 群集心理：他人の行動に流されていないか？</li>
</ul>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">フレームワークは習慣化が鍵</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">最初は時間がかかっても、DECIDEフレームワークを習慣化することで、より良い投資判断ができるようになります。</p>
</div>
認知バイアスを完全に排除することは不可能ですが、その影響を最小限に抑える実践的な方法があります。

<strong>DECIDE フレームワーク</strong>

投資判断時に以下の6ステップを必ず実行する：

<strong>D - Define（問題の明確化）</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>何を決めようとしているのか明確にする</li>
<li>投資目的、期間、リスク許容度の再確認</li>
<li>意思決定の背景・理由を文書化</li>
</ul>

<strong>E - Establish（判断基準の設定）</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>成功・失敗の判断基準を事前に設定</li>
<li>定量的な指標（期待リターン、許容損失額など）</li>
<li>定性的な指標（企業のビジョン、業界の将来性など）</li>
</ul>

<strong>C - Consider（選択肢の検討）</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>複数の投資選択肢を比較検討</li>
<li>投資しないという選択肢も含める</li>
<li>各選択肢のメリット・デメリットを整理</li>
</ul>

<strong>I - Identify（最良選択の特定）</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>設定した基準に基づいて客観的に評価</li>
<li>感情的な好み・嫌いを排除</li>
<li>期待値計算による定量的比較</li>
</ul>

<strong>D - Develop（実行計画の策定）</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>具体的な投資実行計画の策定</li>
<li>エントリー・エグジット戦略の明確化</li>
<li>リスク管理・モニタリング計画</li>
</ul>

<strong>E - Evaluate（評価・改善）</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>定期的な投資成果の評価</li>
<li>判断プロセスの振り返り</li>
<li>改善点の特定と次回への活用</li>
</ul>

<strong>感情制御テクニック</strong>

<strong>1. 10-10-10 ルール</strong>
投資判断前に以下を考える：
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>10分後にどう感じるか？</li>
<li>10ヶ月後にどう感じるか？</li>
<li>10年後にどう感じるか？</li>
</ul>

<strong>2. プレモルテム分析</strong>
投資実行前に「この投資が失敗する理由」を徹底的に考える

<strong>3. 時間的距離の確保</strong>
重要な投資判断では24-48時間のクールダウンタイムを設ける

<strong>4. 外部視点の導入</strong>
「もし友人がこの投資について相談してきたら、何とアドバイスするか？」を考える

<strong>継続的改善のための記録システム</strong>

<strong>投資ジャーナルの作成</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>投資判断の理由と根拠</li>
<li>その時の感情状態・市場環境</li>
<li>結果とその分析</li>
<li>学んだ教訓と改善点</li>
</ul>

<strong>バイアス・チェックリスト</strong>
投資判断前に以下を自問：
□ 確証バイアス：反対意見も検討したか？
□ アンカリング：過去の価格に固執していないか？
□ 損失回避：感情的に損切りを避けていないか？
□ 過信：自分の判断を過信していないか？
□ 群集心理：他人の行動に流されていないか？
        `
      },
      {
        id: 'section-4',
        title: '2025年の投資環境における新たなバイアス',
        orderIndex: 4,
        type: 'text',
        content: `
<p>デジタル時代の投資環境では、従来の認知バイアスに加えて新しいタイプのバイアスも出現しています。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">2025年の投資環境で注意すべき5つの新バイアス</h2>

<div style="display: grid; gap: 2rem; margin: 1.5rem 0;">
<div style="background: #f0f9ff; border: 2px solid #0ea5e9; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #0369a1; margin: 0 0 1rem 0; display: flex; align-items: center;">🤖 AI・アルゴリズムバイアス</h3>
<div style="background: #f0f9ff; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<p style="margin: 0 0 0.5rem 0; color: #0369a1; font-weight: 600;">特徴：</p>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>AI投資ツールの推奨を無批判に受け入れる</li>
<li>アルゴリズムの判断プロセスを理解せずに依存</li>
<li>技術への過度な信頼</li>
</ul>
</div>
<div style="background: #dcfce7; padding: 1rem; border-radius: 4px;">
<p style="margin: 0 0 0.5rem 0; color: #059669; font-weight: 600;">対策：</p>
<p style="margin: 0; color: #374151;">AIツールは判断補助として活用し、最終決定は自分で行う</p>
</div>
</div>

<div style="background: #fef7ff; border: 2px solid #c084fc; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #7c3aed; margin: 0 0 1rem 0; display: flex; align-items: center;">📱 ソーシャルメディアバイアス</h3>
<div style="background: #fef7ff; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<p style="margin: 0 0 0.5rem 0; color: #7c3aed; font-weight: 600;">特徴：</p>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>SNSでの投資情報の過信</li>
<li>インフルエンサーの意見への盲従</li>
<li>リアルタイム情報への過度な反応</li>
</ul>
</div>
<div style="background: #dcfce7; padding: 1rem; border-radius: 4px;">
<p style="margin: 0 0 0.5rem 0; color: #059669; font-weight: 600;">対策：</p>
<p style="margin: 0; color: #374151;">情報源の信頼性を検証し、複数の視点から情報を収集</p>
</div>
</div>

<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #d97706; margin: 0 0 1rem 0; display: flex; align-items: center;">⏱️ 短期主義バイアス</h3>
<div style="background: #fffbeb; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<p style="margin: 0 0 0.5rem 0; color: #d97706; font-weight: 600;">特徴：</p>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>即座に結果を求める現代文化の影響</li>
<li>日々の価格変動への過度な注目</li>
<li>長期投資戦略の軽視</li>
</ul>
</div>
<div style="background: #dcfce7; padding: 1rem; border-radius: 4px;">
<p style="margin: 0 0 0.5rem 0; color: #059669; font-weight: 600;">対策：</p>
<p style="margin: 0; color: #374151;">投資目標と時間軸を明確にし、短期的な雑音を無視</p>
</div>
</div>

<div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0; display: flex; align-items: center;">📊 情報過多バイアス</h3>
<div style="background: #fef2f2; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<p style="margin: 0 0 0.5rem 0; color: #dc2626; font-weight: 600;">特徴：</p>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>過度な情報収集による分析麻痺</li>
<li>本質的でない情報への注力</li>
<li>情報の質より量を重視する僾向</li>
</ul>
</div>
<div style="background: #dcfce7; padding: 1rem; border-radius: 4px;">
<p style="margin: 0 0 0.5rem 0; color: #059669; font-weight: 600;">対策：</p>
<p style="margin: 0; color: #374151;">投資判断に必要な核心情報を絞り込み、情報収集時間を制限</p>
</div>
</div>

<div style="background: #f0fdf4; border: 2px solid #a7f3d0; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #059669; margin: 0 0 1rem 0; display: flex; align-items: center;">😱 FOMO 2.0（Fear of Missing Out）</h3>
<div style="background: #f0fdf4; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<p style="margin: 0 0 0.5rem 0; color: #059669; font-weight: 600;">特徴：</p>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>暗号通貨ブームなどでの機会損失への恐怖</li>
<li>他人の成功談への過度な反応</li>
<li>トレンドへの盲目的な追従</li>
</ul>
</div>
<div style="background: #dcfce7; padding: 1rem; border-radius: 4px;">
<p style="margin: 0 0 0.5rem 0; color: #059669; font-weight: 600;">対策：</p>
<p style="margin: 0; color: #374151;">自分の投資方針を堅持し、市場の熱狂に流されない規律を保つ</p>
</div>
</div>
</div>

<div style="background: #fff7ed; border: 2px solid #fb923c; border-radius: 8px; padding: 1.5rem; margin: 1.5rem 0;">
<h3 style="color: #ea580c; margin: 0 0 1rem 0; text-align: center;">⚙️ 2025年バイアス対策総合戦略</h3>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
<div style="background: #fef7ff; padding: 1rem; border-radius: 4px;">
<h4 style="color: #7c3aed; margin: 0 0 0.5rem 0;">デジタルリテラシー向上</h4>
<p style="margin: 0; color: #374151; font-size: 0.9em;">AIツールやSNS情報の正しい評価方法を学ぶ</p>
</div>
<div style="background: #f0f9ff; padding: 1rem; border-radius: 4px;">
<h4 style="color: #0369a1; margin: 0 0 0.5rem 0;">批判的思考力養成</h4>
<p style="margin: 0; color: #374151; font-size: 0.9em;">情報を鵜呑みにせず、疑問を持つ習慣を身につける</p>
</div>
</div>
</div>

<p>これらの新しいバイアスに対処するためには、従来の対策に加えて、デジタルリテラシーの向上と批判的思考力の養成が重要です。</p>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">新時代のバイアスにも基本は同じ</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">技術が進歩しても、人間の基本的な心理は変わりません。理解し、準備し、規律を守ることが最良の対策です。</p>
</div>
デジタル時代の投資環境では、従来の認知バイアスに加えて新しいタイプのバイアスも出現しています。

<strong>AI・アルゴリズムバイアス</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>AI投資ツールの推奨を無批判に受け入れる</li>
<li>アルゴリズムの判断プロセスを理解せずに依存</li>
<li>技術への過度な信頼</li>
</ul>

*対策：* AIツールは判断補助として活用し、最終決定は自分で行う

<strong>ソーシャルメディアバイアス</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>SNSでの投資情報の過信</li>
<li>インフルエンサーの意見への盲従</li>
<li>リアルタイム情報への過度な反応</li>
</ul>

*対策：* 情報源の信頼性を検証し、複数の視点から情報を収集

<strong>短期主義バイアス</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>即座に結果を求める現代文化の影響</li>
<li>日々の価格変動への過度な注目</li>
<li>長期投資戦略の軽視</li>
</ul>

*対策：* 投資目標と時間軸を明確にし、短期的な雑音を無視

<strong>情報過多バイアス</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>過度な情報収集による分析麻痺</li>
<li>本質的でない情報への注力</li>
<li>情報の質より量を重視する傾向</li>
</ul>

*対策：* 投資判断に必要な核心情報を絞り込み、情報収集時間を制限

<strong>FOMO 2.0（Fear of Missing Out）</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>暗号通貨ブームなどでの機会損失への恐怖</li>
<li>他人の成功談への過度な反応</li>
<li>トレンドへの盲目的な追従</li>
</ul>

*対策：* 自分の投資方針を堅持し、市場の熱狂に流されない規律を保つ

これらの新しいバイアスに対処するためには、従来の対策に加えて、デジタルリテラシーの向上と批判的思考力の養成が重要です。
        `
      }
    ],
    keyPoints: [
      '認知バイアスは進化の過程で獲得した思考パターンであり、完全に排除することは不可能',
      '確証バイアス、アンカリング効果、損失回避バイアスが投資判断に特に大きな影響を与える',
      'DECIDEフレームワークを使用した体系的な投資判断プロセスが効果的',
      '10-10-10ルールやプレモルテム分析などの感情制御テクニックが有用',
      '2025年の投資環境では、AI・ソーシャルメディア関連の新しいバイアスにも注意が必要',
      '投資ジャーナルによる継続的な自己分析と改善が重要'
    ],
    summary: '認知バイアスの理論的背景から実践的な対策まで総合的に学習しました。DECIDEフレームワークや感情制御テクニックを活用し、投資ジャーナルによる継続的改善を通じて、より客観的で合理的な投資判断ができるようになります。',
    practicalExamples: [
      '確証バイアス対策：投資前に「この投資が失敗する3つの理由」を必ず書き出す',
      'アンカリング回避：購入価格を忘れ、現在の情報のみで売買判断を行う',
      '損失回避対策：購入時に機械的な損切りライン（-10%など）を設定し厳守する',
      'DECIDE活用：重要な投資判断では6ステップを必ず実行し記録を残す'
    ],
    warningNotes: [
      '認知バイアスを知っていても、実際の場面では感情が優先されることがあります',
      '「自分はバイアスに影響されない」と思うこと自体が過信バイアスです',
      'バイアス対策に時間をかけすぎて、投資機会を逃すリスクもあります',
      'デジタル時代の新しいバイアスにも常に注意を払う必要があります'
    ]
  },
  quiz: [
    {
      id: 'risk-2-q1',
      question: 'アンカリング効果を回避するための最も効果的な方法は？',
      options: [
        '購入価格を常に意識して判断する',
        '購入価格を忘れ、現在の情報のみで判断する',
        '最初の印象を重視して判断する',
        '他人の意見を優先して判断する'
      ],
      correctAnswer: 1,
      explanation: 'アンカリング効果を回避するには、購入価格などの過去の情報に固執せず、現在利用可能な情報のみに基づいて判断することが重要です。'
    },
    {
      id: 'risk-2-q2',
      question: 'DECIDEフレームワークの6つのステップに含まれないものは？',
      options: [
        'Define（問題の明確化）',
        'Consider（選択肢の検討）',
        'Ignore（否定的情報の無視）',
        'Evaluate（評価・改善）'
      ],
      correctAnswer: 2,
      explanation: 'DECIDEフレームワークは Define, Establish, Consider, Identify, Develop, Evaluate の6ステップで構成され、否定的情報を無視することは含まれません。'
    },
    {
      id: 'risk-2-q3',
      question: '2025年の投資環境で注意すべき新しいバイアスは？',
      options: [
        'AI・アルゴリズムへの過度な依存',
        'ソーシャルメディア情報の過信',
        '情報過多による分析麻痺',
        'すべて該当する'
      ],
      correctAnswer: 3,
      explanation: 'デジタル時代の投資環境では、AI依存、SNS過信、情報過多など複数の新しいバイアスに注意が必要です。'
    }
  ],
  lastUpdated: '2025-08-21',
  factChecked: true
};