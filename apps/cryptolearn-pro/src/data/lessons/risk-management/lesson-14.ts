import type { Lesson } from '@/types';

export const lesson14: Lesson = {
  id: 'risk-management-behavioral-finance',
  categoryId: 'risk-management',
  title: '行動ファイナンスとリスク認知',
  slug: 'behavioral-finance',
  description: '投資判断に影響する心理的バイアスと認知の歪みを理解し、合理的な投資行動を身につけます',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 20,
  orderIndex: 14,
  content: {
    sections: [
      {
        id: 'section-1',
        title: '行動ファイナンスの基本概念',
        orderIndex: 1,
        type: 'text',
        content: `
<p>行動ファイナンスとは、心理学と経済学を組み合わせた学問分野です。<br/>投資家の実際の行動が必ずしも合理的でないことを前提に、心理的要因がどのように投資判断に影響するかを研究します。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">従来の金融理論vs行動ファイナンス</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">項目</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">従来の金融理論</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">行動ファイナンス</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">投資家の性質</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">完全に合理的</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">感情的・非合理的</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">情報処理</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">すべての情報を正確に処理</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">認知バイアスの影響</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">市場効率性</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">常に効率的</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">非効率性が存在</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">リスク認識</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">正確なリスク評価</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">歪んだリスク認知</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">行動ファイナンスの主要概念</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">1. 認知バイアス（Cognitive Bias）</h3>
<p style="margin: 0; color: #374151;">論理的思考から逸脱する系統的な判断エラー</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">2. ヒューリスティック（Heuristic）</h3>
<p style="margin: 0; color: #374151;">複雑な判断を簡単にするための思考の近道</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">3. 感情的要因</h3>
<p style="margin: 0; color: #374151;">恐怖・欲望・後悔などが投資判断に与える影響</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">4. 社会的影響</h3>
<p style="margin: 0; color: #374151;">他人の行動や意見に影響される傾向</p>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">バイアスを知ることが第一歩</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">完全に排除することはできませんが、認識することで影響を軽減できます。</p>
</div>
        `
      },
      {
        id: 'section-2',
        title: '代表的な認知バイアス',
        orderIndex: 2,
        type: 'text',
        content: `
<p>投資判断に影響を与える代表的な認知バイアスを理解することで、より客観的な投資判断が可能になります。<br/>以下の主要なバイアスについて詳しく見ていきましょう。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">主要な認知バイアス一覧</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">1. 確証バイアス（Confirmation Bias）</h3>
<p style="margin: 0; color: #374151;"><strong>内容：</strong>自分の信念を支持する情報のみを集める傾向</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>投資への影響：</strong>保有銘柄の好材料のみに注目し、悪材料を無視</p>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">2. アンカリング効果</h3>
<p style="margin: 0; color: #374151;"><strong>内容：</strong>最初に得た情報に過度に依存する傾向</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>投資への影響：</strong>株式の購入価格に固執し、損切りができない</p>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">3. 損失回避（Loss Aversion）</h3>
<p style="margin: 0; color: #374151;"><strong>内容：</strong>同じ金額でも損失の方を利益より重く感じる傾向</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>投資への影響：</strong>リスクを過度に恐れ、保守的すぎる投資</p>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">4. 過信バイアス（Overconfidence）</h3>
<p style="margin: 0; color: #374151;"><strong>内容：</strong>自分の能力や判断力を過信する傾向</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>投資への影響：</strong>過度な集中投資や頻繁な売買</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">バイアスの具体例と対策</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #dc2626; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">バイアス</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">典型的な行動</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">対策</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">ホームバイアス</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">国内株式のみに投資</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">国際分散投資</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">近視眼的損失回避</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">短期的な損失を過度に気にする</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">長期視点での評価</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">代表性ヒューリスティック</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">短期のパフォーマンスで判断</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">統計的な長期データ重視</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">利用可能性ヒューリスティック</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">印象的な出来事で判断</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">データに基づく冷静な分析</td>
</tr>
</tbody>
</table>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">システマティックな投資ルール</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">感情に左右されない自動的な投資ルールを作成することが効果的です。</p>
</div>
        `
      },
      {
        id: 'section-3',
        title: 'リスク認知の歪みと対処法',
        orderIndex: 3,
        type: 'text',
        content: `
<p>投資家は実際のリスクと異なる認知を持つことが多く、これが投資判断に大きな影響を与えます。<br/>リスク認知の歪みを理解し、より正確なリスク評価を行えるようになりましょう。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">リスク認知の歪みのパターン</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">1. 確率の過大評価・過小評価</h3>
<p style="margin: 0; color: #374151;"><strong>現象：</strong>低確率の極端な事象を過大評価し、高確率の普通の事象を過小評価</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>例：</strong>宝くじを買う（低確率高リターン）一方で保険に入らない</p>
</div>
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">2. フレーミング効果</h3>
<p style="margin: 0; color: #374151;"><strong>現象：</strong>同じ情報でも表現方法によりリスク認知が変わる</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>例：</strong>「成功率90%」vs「失敗率10%」で印象が異なる</p>
</div>
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">3. 時間選好の歪み</h3>
<p style="margin: 0; color: #374151;"><strong>現象：</strong>将来のリスクを過度に割り引く現在バイアス</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>例：</strong>老後資金の不足リスクを軽視する</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">リスク認知を改善する方法</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #059669; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">改善手法</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">具体的方法</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">効果</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">数値化・定量化</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">VaR、シャープレシオなど指標活用</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">客観的リスク評価</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">シナリオ分析</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">ベース・楽観・悲観の3ケース</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">幅広い視点でのリスク認識</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">過去データ分析</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">長期統計データの活用</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">感情に惑わされない判断</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">外部意見の活用</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">専門家・第三者の視点</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">バイアスの軽減</td>
</tr>
</tbody>
</table>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">完璧は求めず、改善を目指す</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">バイアスを完全になくすことは不可能。少しずつ改善していく姿勢が重要です。</p>
</div>
        `
      },
      {
        id: 'section-4',
        title: '投資における感情管理',
        orderIndex: 4,
        type: 'text',
        content: `
<p>投資で成功するためには、技術的な知識だけでなく、感情のコントロールも重要です。<br/>恐怖や欲望に振り回されずに、一貫した投資行動を取れるようになりましょう。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">投資における主要な感情</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0;">
<div style="background: #dc2626; color: white; border-radius: 8px; padding: 1.5rem;">
<h3 style="margin: 0 0 1rem 0; text-align: center;">📉 恐怖（Fear）</h3>
<ul style="margin: 0; padding-left: 1rem;">
<li>損失への恐れ</li>
<li>暴落時のパニック</li>
<li>機会を逃す恐怖（FOMO）</li>
<li>将来への不安</li>
</ul>
</div>
<div style="background: #059669; color: white; border-radius: 8px; padding: 1.5rem;">
<h3 style="margin: 0 0 1rem 0; text-align: center;">📈 欲望（Greed）</h3>
<ul style="margin: 0; padding-left: 1rem;">
<li>短期間での大きな利益欲求</li>
<li>リスクの過小評価</li>
<li>利益確定の先延ばし</li>
<li>過度な楽観主義</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">感情管理の具体的手法</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">手法</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">具体的方法</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">効果</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">ルール化</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">明確な売買基準の設定</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">感情的判断の防止</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">自動化</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">定期積立・リバランス自動化</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">機械的な実行</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">分散化</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">時間・銘柄・地域の分散</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">リスクと感情負荷の軽減</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">記録</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">投資日記・感情記録</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">パターンの認識と改善</td>
</tr>
</tbody>
</table>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">感情は敵ではなく、理解すべき対象</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">感情を抑制するのではなく、理解して上手に付き合うことが重要です。</p>
</div>
        `
      }
    ],
    keyPoints: [
      '行動ファイナンスは投資家の心理的バイアスや非合理的行動を研究する学問分野',
      '確証バイアス・アンカリング効果・損失回避などの認知バイアスが投資判断に大きく影響',
      'リスク認知は実際のリスクと異なることが多く、数値化や客観的分析が重要',
      '恐怖・欲望・後悔・怒りなどの感情が投資パフォーマンスに悪影響を与える可能性',
      '投資前チェックリストや定期的なレビューで感情的判断を防げる',
      'システマティックな投資手法（自動積立・リバランス）で感情の影響を最小化',
      '小さな習慣から始めて長期的に合理的投資行動を身につけることが成功の鍵'
    ],
    summary: '行動ファイナンスとリスク認知について詳しく学習しました。投資家は確証バイアス、アンカリング効果、損失回避などの認知バイアスに影響され、しばしば非合理的な判断を行います。また、恐怖や欲望などの感情も投資成果に大きく影響します。これらの影響を軽減するためには、投資前チェックリスト、定期的なレビュー、システマティックな投資手法の採用が有効です。完璧を目指すのではなく、小さな習慣から始めて継続的に合理的な投資行動を身につけることが長期的な投資成功につながります。',
    practicalExamples: [
      '確証バイアスを避けるため保有銘柄の好材料だけでなく悪材料も定期的にチェック',
      'アンカリング効果による損切りの遅れを防ぐため購入前に損切りラインを設定',
      'パニック売りを避けるため下落時の行動ルール（20%下落時は投資を増やす）を事前決定',
      '感情的判断を防ぐため毎月定額での自動積立投資を設定',
      '投資日記をつけて自分の感情パターンと投資成果の関係性を分析'
    ],
    warningNotes: [
      '認知バイアスを完全に排除することは不可能であることを理解してください',
      '他人の投資成功に影響されて感情的な判断をしないよう注意が必要です',
      '投資コミュニティの情報は参考程度に留め、最終判断は自分で行ってください',
      'システマティックな投資も市場環境の変化に応じて見直しが必要です',
      '心理的負担が大きい場合は専門家への相談も検討してください'
    ]
  },
  quiz: [
    {
      id: 'risk-management-14-q1',
      question: '確証バイアス（Confirmation Bias）とは何ですか？',
      options: [
        '損失よりも利益を重視する傾向',
        '自分の信念を支持する情報のみを集める傾向',
        '最初に得た情報に過度に依存する傾向',
        '自分の能力を過信する傾向'
      ],
      correctAnswer: 1,
      explanation: '確証バイアスとは、自分の信念や仮説を支持する情報のみを集め、反対する情報を無視する傾向です。投資では保有銘柄の好材料のみに注目し、悪材料を見落とすリスクがあります。'
    },
    {
      id: 'risk-management-14-q2',
      question: '損失回避（Loss Aversion）の特徴として正しいのは？',
      options: [
        '損失よりも利益を重視する傾向',
        '同じ金額でも損失の方を利益より重く感じる傾向',
        '将来の損失を過度に心配する傾向',
        '損失を完全に避けようとする傾向'
      ],
      correctAnswer: 1,
      explanation: '損失回避とは、同じ金額であっても損失の痛みを利益の喜びよりも約2倍強く感じる心理的傾向です。これにより投資家は必要以上にリスクを恐れ、保守的すぎる投資行動を取ることがあります。'
    },
    {
      id: 'risk-management-14-q3',
      question: '投資における感情管理として適切でない方法は？',
      options: [
        '投資前チェックリストの作成',
        '定期積立による投資の自動化',
        '感情的になった時の即座の売買',
        '投資日記による感情記録'
      ],
      correctAnswer: 2,
      explanation: '感情的になった時の即座の売買は最も避けるべき行動です。感情が高ぶっている時は判断が歪みやすいため、一定の冷却期間を設けて冷静になってから判断することが重要です。'
    },
    {
      id: 'risk-management-14-q4',
      question: '合理的な投資行動の習慣化で最も重要なことは？',
      options: [
        '完璧な投資戦略を最初から構築する',
        '小さな習慣から始めて継続する',
        '他の成功投資家を完全に模倣する',
        '市場の動きを予測する能力を身につける'
      ],
      correctAnswer: 1,
      explanation: '合理的投資行動の習慣化では、完璧を目指すよりも小さな習慣から始めて継続することが最も重要です。例えば毎月の定額積立から始めて、徐々により高度な投資手法を身につけていくアプローチが効果的です。'
    }
  ],
  lastUpdated: '2025-01-21',
  factChecked: true
};