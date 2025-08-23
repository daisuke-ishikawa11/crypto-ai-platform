import type { Lesson } from '@/types';

export const lesson8: Lesson = {
  id: 'risk-management-interest-rate-inflation-risk',
  categoryId: 'risk-management',
  title: '金利リスクとインフレリスク：経済環境変化への対策',
  slug: 'interest-rate-inflation-risk',
  description: '金利変動とインフレーションが投資に与える影響を理解し、経済環境の変化に対応するリスク管理手法を学習します',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 30,
  orderIndex: 8,
  content: {
    sections: [
      {
        id: 'section-1',
        title: '金利リスクの理解と影響',
        orderIndex: 1,
        type: 'text',
        content: `
<p>金利リスクとは、<strong>市場金利の変動により投資商品の価値が影響を受けるリスク</strong>です。これは債券投資だけでなく、株式や不動産投資にも大きな影響を与えます。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">金利リスクの基本メカニズム</h2>

<div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
<div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 1.5rem; border-radius: 4px;">
<h3 style="color: #0c4a6e; margin: 0 0 1rem 0;">💹 債券への影響</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>金利上昇時：既存債券の価格は下落</li>
<li>金利下降時：既存債券の価格は上昇</li>
<li>長期債券ほど金利変動の影響が大きい</li>
<li>満期まで保有すれば元本は保証される</li>
</ul>
</div>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1.5rem; border-radius: 4px;">
<h3 style="color: #d97706; margin: 0 0 1rem 0;">📈 株式への影響</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>金利上昇時：企業の資金調達コスト増加</li>
<li>配当利回りの相対的魅力が低下</li>
<li>成長株は特に金利上昇に敏感</li>
<li>金融株は金利上昇で収益改善期待</li>
</ul>
</div>

<div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 1.5rem; border-radius: 4px;">
<h3 style="color: #059669; margin: 0 0 1rem 0;">🏠 不動産への影響</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>住宅ローン金利の上昇</li>
<li>不動産投資の利回り要求水準上昇</li>
<li>建設・開発コストの増加</li>
<li>REITの価格下落圧力</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">金利変動が投資収益に与える実際の影響</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">債券種類</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">残存年数</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">金利1%上昇時の価格変動</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">金利1%下降時の価格変動</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">短期国債</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">2年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">-1.8%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+1.8%</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">中期国債</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">5年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">-4.2%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+4.2%</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">長期国債</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">10年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">-7.5%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+7.5%</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">超長期債</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">30年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">-15.2%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+15.2%</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">暗号通貨と金利リスクの関係</h2>

<div style="background: #fef7ff; border: 2px solid #c084fc; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #7c3aed; margin: 0 0 1rem 0;">🪙 暗号通貨特有の金利感応度</h3>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
<div>
<h4 style="color: #7c3aed; margin: 0 0 0.5rem 0;">高金利環境での影響</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>無利息資産としての魅力低下</li>
<li>リスク回避姿勢の強まり</li>
<li>機関投資家の資金流出</li>
<li>レバレッジポジション解消圧力</li>
</ul>
</div>
<div>
<h4 style="color: #7c3aed; margin: 0 0 0.5rem 0;">低金利環境での影響</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>代替投資先としての注目</li>
<li>リスク許容度の拡大</li>
<li>流動性増加による価格上昇</li>
<li>インフレヘッジ需要の増加</li>
</ul>
</div>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">金利変動は避けられない</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">金利は経済の体温計。変動は自然なことですが、その影響を理解して対策を講じることが重要です。</p>
</div>
        `
      },
      {
        id: 'section-2',
        title: 'インフレリスクと購買力の保護',
        orderIndex: 2,
        type: 'text',
        content: `
<p>インフレリスクとは、<strong>物価上昇により実質的な購買力が低下するリスク</strong>です。特に長期投資では、名目上の利益が出ても実質的には価値が減少する可能性があります。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">インフレが投資に与える影響</h2>

<div style="background: #f8fafc; border: 2px solid #94a3b8; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0;">実質リターンの計算例</h3>
<p style="font-weight: 600; margin: 0 0 1rem 0; color: #374151;">年間インフレ率3%の環境での投資成果</p>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 10px; border: 1px solid #ddd; text-align: left;">投資商品</th>
<th style="padding: 10px; border: 1px solid #ddd; text-align: center;">名目リターン</th>
<th style="padding: 10px; border: 1px solid #ddd; text-align: center;">実質リターン</th>
<th style="padding: 10px; border: 1px solid #ddd; text-align: center;">評価</th>
</tr>
</thead>
<tbody>
<tr style="background: #fef2f2;">
<td style="padding: 10px; border: 1px solid #ddd;">銀行預金</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center;">0.1%</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; color: #dc2626; font-weight: 600;">-2.9%</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; color: #dc2626;">購買力減少</td>
</tr>
<tr style="background: #fef3c7;">
<td style="padding: 10px; border: 1px solid #ddd;">国債</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center;">1.5%</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; color: #f59e0b; font-weight: 600;">-1.5%</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">わずかに減少</td>
</tr>
<tr style="background: #f0fdf4;">
<td style="padding: 10px; border: 1px solid #ddd;">株式投資</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center;">7.0%</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: 600;">+4.0%</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; color: #059669;">購買力増加</td>
</tr>
<tr style="background: #e0f2fe;">
<td style="padding: 10px; border: 1px solid #ddd;">不動産</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center;">5.5%</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; color: #0284c7; font-weight: 600;">+2.5%</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; color: #0284c7;">適度な保護</td>
</tr>
</tbody>
</table>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">インフレ対応力の高い投資商品</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 1rem; border-radius: 4px;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0; display: flex; align-items: center;">🏭 株式（特に価格転嫁力の高い企業）</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>商品・サービス価格をインフレに合わせて調整可能</li>
<li>ブランド力や独占的地位を持つ企業</li>
<li>インフラ、公益事業、必需品関連</li>
</ul>
</div>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem; border-radius: 4px;">
<h3 style="color: #d97706; margin: 0 0 0.5rem 0; display: flex; align-items: center;">🏠 不動産・REIT</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>家賃や不動産価格の調整可能性</li>
<li>物理的な資産としての価値</li>
<li>インフレ連動型の賃貸契約</li>
</ul>
</div>

<div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 1rem; border-radius: 4px;">
<h3 style="color: #059669; margin: 0 0 0.5rem 0; display: flex; align-items: center;">🥇 コモディティ</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>金、銀などの貴金属</li>
<li>原油、天然ガスなどエネルギー</li>
<li>農産物、工業原料</li>
</ul>
</div>

<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0; display: flex; align-items: center;">🪙 暗号通貨（論議あり）</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>供給量が制限されたビットコイン</li>
<li>「デジタルゴールド」としての位置づけ</li>
<li>ただし、歴史が浅く実証データ不足</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">過去のインフレ期における資産クラス別パフォーマンス</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #dc2626; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">期間</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">インフレ率</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">株式</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">債券</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">不動産</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">金</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">1970年代</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">7.1%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+5.9%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">-4.2%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+8.8%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+13.4%</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">2008-2022</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">2.1%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+10.5%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+3.3%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+6.2%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+7.8%</td>
</tr>
<tr style="background: #fef2f2;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">2021-2023</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">5.4%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">+2.1%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">-8.9%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+8.1%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">-2.3%</td>
</tr>
</tbody>
</table>

<p style="font-size: 0.9em; color: #6b7280; margin: 0.5rem 0;">※数値は年平均実質リターン</p>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">インフレ対策は長期的な視点が重要</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">短期的には予測困難ですが、長期的には実物資産や成長力のある企業への投資が購買力を守ります。</p>
</div>
        `
      },
      {
        id: 'section-3',
        title: '金利・インフレリスクの測定と対策',
        orderIndex: 3,
        type: 'text',
        content: `
<p>金利・インフレリスクを適切に管理するには、<strong>リスクの測定方法と具体的な対策</strong>を理解することが重要です。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">金利リスクの測定指標</h2>

<div style="background: #f0f9ff; border: 2px solid #0ea5e9; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #0c4a6e; margin: 0 0 1rem 0;">📊 デュレーション（Duration）</h3>

<p style="margin: 0 0 1rem 0; color: #374151;">債券の金利感応度を測る代表的指標</p>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
<thead>
<tr style="background: #0c4a6e; color: white;">
<th style="padding: 10px; border: 1px solid #ddd; text-align: left;">デュレーション年数</th>
<th style="padding: 10px; border: 1px solid #ddd; text-align: center;">金利1%上昇時の価格変動</th>
<th style="padding: 10px; border: 1px solid #ddd; text-align: center;">リスクレベル</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 10px; border: 1px solid #ddd;">2年</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">-2.0%</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; color: #059669;">低</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #ddd;">5年</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">-5.0%</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">中</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 10px; border: 1px solid #ddd;">10年</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; color: #dc2626;">-10.0%</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; color: #dc2626;">高</td>
</tr>
</tbody>
</table>

<p style="font-size: 1.1em; font-weight: 600; margin: 1rem 0; color: #0c4a6e; text-align: center;">
価格変動率 ≈ -デュレーション × 金利変動幅
</p>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">金利・インフレリスク対策の実践手法</h2>

<div style="display: grid; gap: 2rem; margin: 2rem 0;">

<div style="background: #e0f2fe; border: 3px solid #0284c7; border-radius: 12px; padding: 2rem;">
<h3 style="color: #0c4a6e; margin: 0 0 1.5rem 0; text-align: center; font-size: 1.3em;">🛡️ 金利リスク対策</h3>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
<div>
<h4 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">債券ラダー戦略</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>異なる満期の債券に分散投資</li>
<li>定期的に満期到来で再投資機会</li>
<li>金利変動の影響を平準化</li>
</ul>
</div>
<div>
<h4 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">デュレーション調整</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>金利上昇局面では短期化</li>
<li>金利下降局面では長期化</li>
<li>ポートフォリオ全体での調整</li>
</ul>
</div>
</div>

<div style="background: #f0f9ff; border: 1px solid #0ea5e9; padding: 1rem; border-radius: 6px; margin-top: 1rem;">
<h4 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">具体的商品例</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.6;">
<li>変動金利債券、インフレ連動債</li>
<li>短期債券ETF、フローティングレートETF</li>
<li>金融株（金利上昇で収益改善期待）</li>
</ul>
</div>
</div>

<div style="background: #fef3c7; border: 3px solid #f59e0b; border-radius: 12px; padding: 2rem;">
<h3 style="color: #d97706; margin: 0 0 1.5rem 0; text-align: center; font-size: 1.3em;">🛡️ インフレリスク対策</h3>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
<div>
<h4 style="color: #d97706; margin: 0 0 0.5rem 0;">実物資産投資</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>不動産、REIT投資</li>
<li>コモディティファンド</li>
<li>インフラ投資</li>
</ul>
</div>
<div>
<h4 style="color: #d97706; margin: 0 0 0.5rem 0;">価格転嫁力企業</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>ブランド力の高い消費財</li>
<li>独占的地位の企業</li>
<li>必需品関連サービス</li>
</ul>
</div>
</div>

<div style="background: #fef7e0; border: 1px solid #f59e0b; padding: 1rem; border-radius: 6px; margin-top: 1rem;">
<h4 style="color: #d97706; margin: 0 0 0.5rem 0;">具体的商品例</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.6;">
<li>TIPS（インフレ連動国債）</li>
<li>コモディティETF、不動産投資信託</li>
<li>インフレ耐性の高い株式（公益、消費財、エネルギー）</li>
</ul>
</div>
</div>

</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">暗号通貨を含むポートフォリオでのリスク管理</h2>

<div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0; display: flex; align-items: center;">⚠️ 暗号通貨の金利・インフレ感応度</h3>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
<div>
<h4 style="color: #dc2626; margin: 0 0 0.5rem 0;">高金利環境での課題</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>無利息資産の相対的不利</li>
<li>機関投資家の資金流出</li>
<li>ボラティリティの拡大</li>
</ul>
</div>
<div>
<h4 style="color: #dc2626; margin: 0 0 0.5rem 0;">インフレヘッジ機能の限界</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>歴史的データの不足</li>
<li>高いボラティリティ</li>
<li>規制リスクの存在</li>
</ul>
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">統合的なリスク管理アプローチ</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">経済環境</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">推奨戦略</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">資産配分例</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">暗号通貨比率</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">低金利・低インフレ</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">成長重視</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">株式70%, 債券20%, その他10%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">10-15%</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">金利上昇局面</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">短期債券・金融株</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">株式50%, 短期債30%, その他20%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">5-8%</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">高インフレ</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">実物資産重視</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">株式40%, REIT20%, コモディティ15%, その他25%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">3-5%</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">スタグフレーション</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">防御的配分</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">株式30%, 現金30%, 金20%, その他20%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">2-3%</td>
</tr>
</tbody>
</table>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">経済環境に応じた柔軟な対応</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">金利・インフレ環境は変化するため、定期的なポートフォリオ見直しと調整が重要です。</p>
</div>
        `
      },
      {
        id: 'section-4',
        title: '実践的なリスクヘッジ戦略',
        orderIndex: 4,
        type: 'text',
        content: `
<p>理論を実際の投資に活かすために、<strong>具体的なヘッジ戦略と実践方法</strong>を学びましょう。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">段階的ヘッジアプローチ</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem; border-radius: 4px;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0; display: flex; align-items: center;">📊 レベル1：基本的分散投資</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>異なる満期の債券への分散</li>
<li>複数の資産クラスでの分散</li>
<li>地理的分散（国内・海外）</li>
<li>時間分散（ドルコスト平均法）</li>
</ul>
</div>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem; border-radius: 4px;">
<h3 style="color: #d97706; margin: 0 0 0.5rem 0; display: flex; align-items: center;">📊 レベル2：積極的リバランス</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>金利動向に応じたデュレーション調整</li>
<li>インフレ指標に基づく資産配分変更</li>
<li>定期的な利益確定と損失カット</li>
<li>市場サイクルに応じた戦術的配分</li>
</ul>
</div>

<div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 1rem; border-radius: 4px;">
<h3 style="color: #059669; margin: 0 0 0.5rem 0; display: flex; align-items: center;">📊 レベル3：高度なヘッジ戦略</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>金利デリバティブの活用</li>
<li>インフレスワップ契約</li>
<li>通貨ヘッジ付き海外投資</li>
<li>オプション戦略によるリスク制限</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">実践的ポートフォリオ構築例</h2>

<div style="background: #f8fafc; border: 2px solid #94a3b8; border-radius: 8px; padding: 2rem; margin: 1rem 0;">
<h3 style="color: #1e40af; margin: 0 0 1.5rem 0; text-align: center;">💼 ケーススタディ：40代投資家の戦略</h3>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
<div>
<h4 style="color: #374151; margin: 0 0 1rem 0;">基本情報</h4>
<ul style="list-style: none; margin: 0; padding: 0; background: #f8fafc; border-radius: 4px; padding: 1rem;">
<li style="padding: 0.3rem 0; border-bottom: 1px solid #e5e7eb;"><strong>年齢：</strong> 45歳</li>
<li style="padding: 0.3rem 0; border-bottom: 1px solid #e5e7eb;"><strong>年収：</strong> 800万円</li>
<li style="padding: 0.3rem 0; border-bottom: 1px solid #e5e7eb;"><strong>投資資金：</strong> 1,000万円</li>
<li style="padding: 0.3rem 0; border-bottom: 1px solid #e5e7eb;"><strong>投資期間：</strong> 20年</li>
<li style="padding: 0.3rem 0;"><strong>リスク許容度：</strong> 中程度</li>
</ul>
</div>

<div>
<h4 style="color: #374151; margin: 0 0 1rem 0;">対策済みポートフォリオ</h4>
<ul style="list-style: none; margin: 0; padding: 0;">
<li style="padding: 0.5rem; background: #e0f2fe; margin: 0.3rem 0; border-radius: 4px; border-left: 4px solid #0284c7;"><strong>株式：50%</strong> (内20%はインフレ耐性企業)</li>
<li style="padding: 0.5rem; background: #fef3c7; margin: 0.3rem 0; border-radius: 4px; border-left: 4px solid #f59e0b;"><strong>債券：25%</strong> (短中期債券+TIPS)</li>
<li style="padding: 0.5rem; background: #f0fdf4; margin: 0.3rem 0; border-radius: 4px; border-left: 4px solid #22c55e;"><strong>REIT：10%</strong> (インフレヘッジ)</li>
<li style="padding: 0.5rem; background: #fef2f2; margin: 0.3rem 0; border-radius: 4px; border-left: 4px solid #dc2626;"><strong>コモディティ：5%</strong></li>
<li style="padding: 0.5rem; background: #fef7ff; margin: 0.3rem 0; border-radius: 4px; border-left: 4px solid #c084fc;"><strong>暗号通貨：5%</strong></li>
<li style="padding: 0.5rem; background: #f1f5f9; margin: 0.3rem 0; border-radius: 4px; border-left: 4px solid #64748b;"><strong>現金：5%</strong></li>
</ul>
</div>
</div>

<div style="background: #dbeafe; border: 1px solid #3b82f6; padding: 1rem; border-radius: 6px; margin-top: 1.5rem;">
<h4 style="color: #1e40af; margin: 0 0 0.5rem 0;">想定シナリオ別対応</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>金利上昇時：</strong>債券部分を短期化、金融株への配分増加</li>
<li><strong>インフレ加速時：</strong>REIT・コモディティ比率を10%→15%に増加</li>
<li><strong>市場急落時：</strong>現金部分で押し目買い、暗号通貨は一時的に縮小</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">モニタリング指標と調整トリガー</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">指標</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">監視方法</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">調整トリガー</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">推奨対応</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">10年国債利回り</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">週次チェック</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">±1%変動</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">債券デュレーション調整</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">消費者物価指数</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">月次チェック</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">前年比±2%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">実物資産比率調整</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">ポートフォリオ配分</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">月次チェック</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">目標から±5%乖離</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">リバランス実行</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">実質リターン</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">四半期チェック</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">目標から-3%乖離</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">戦略全体の見直し</td>
</tr>
</tbody>
</table>

<h2 style="color: #dc2626; margin: 2rem 0 1rem 0;">⚠️ 暗号通貨投資での特別な注意点</h2>

<div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong style="color: #dc2626;">金利感応度の高さ</strong>：金利上昇局面では特に慎重な管理が必要</li>
<li><strong style="color: #dc2626;">インフレヘッジ機能の不確実性</strong>：過度な期待は禁物</li>
<li><strong style="color: #dc2626;">流動性リスク</strong>：市場ストレス時の急激な流動性低下</li>
<li><strong style="color: #dc2626;">規制リスク</strong>：金融政策変更に伴う規制強化の可能性</li>
</ul>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">継続的な学習と調整が成功の鍵</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">金利・インフレ環境は刻々と変化します。最新の経済指標をフォローし、柔軟にポートフォリオを調整することが重要です。</p>
</div>
        `
      }
    ],
    keyPoints: [
      '金利リスクは債券だけでなく株式や不動産投資にも大きな影響を与える',
      'インフレリスクは長期投資の実質リターンを大きく左下させる可能性がある',
      'デュレーション管理により債券ポートフォリオの金利リスクを制御できる',
      '実物資産や価格転嫁力の高い企業への投資でインフレリスクに対抗する',
      '暗号通貨は金利上昇に敏感で、インフレヘッジ機能は未確立である',
      '経済環境の変化に応じた動的なポートフォリオ調整が重要',
      '定期的なモニタリングと客観的指標に基づく調整トリガーの設定が有効'
    ],
    summary: '金利リスクとインフレリスクは投資成果に大きな影響を与える重要な要因です。金利変動による債券価格への影響、インフレによる購買力低下のメカニズムを理解し、適切な対策を講じることで、経済環境の変化に対応できる堅固なポートフォリオを構築できます。',
    practicalExamples: [
      '10年債券で金利1%上昇時に約7.5%の価格下落（デュレーション効果）',
      'インフレ率3%環境では銀行預金0.1%の実質リターンは-2.9%',
      '1970年代高インフレ期に金が年13.4%上昇、債券は-4.2%下落',
      '債券ラダー戦略：2年、5年、10年債券に分散し金利変動リスクを平準化',
      '40代投資家：インフレ耐性企業20%、TIPS組み入れでインフレ対策を強化'
    ],
    warningNotes: [
      '金利・インフレの予測は専門家でも困難であり、完全なヘッジは不可能です',
      '暗号通貨のインフレヘッジ機能は理論的であり、実証データは限定的です',
      '過度なヘッジは収益機会の逸失につながる可能性があります',
      '経済環境の急変時には想定を超える損失が発生する可能性があります',
      'このレッスンの情報は教育目的であり、個別の投資助言ではありません'
    ]
  },
  
  quiz: [
    {
      id: 'risk-management-8-q1',
      question: '金利が1%上昇した場合、デュレーション5年の債券価格はどの程度変動しますか？',
      options: [
        '約+5%上昇',
        '約-5%下落',
        '約+1%上昇',
        '変動しない'
      ],
      correctAnswer: 1,
      explanation: 'デュレーション5年の債券は、金利が1%上昇すると価格が約5%下落します。これは「価格変動率≈-デュレーション×金利変動幅」の公式により算出されます。'
    },
    {
      id: 'risk-management-8-q2',
      question: 'インフレ率3%の環境で、年0.1%の銀行預金の実質リターンはいくらですか？',
      options: [
        '+0.1%',
        '+3.1%',
        '-2.9%',
        '0%'
      ],
      correctAnswer: 2,
      explanation: '実質リターン = 名目リターン - インフレ率 = 0.1% - 3% = -2.9%となります。インフレが預金金利を上回ると実質的な購買力は減少します。'
    },
    {
      id: 'risk-management-8-q3',
      question: 'インフレリスクに対して最も効果的な投資対象はどれですか？',
      options: [
        '長期国債',
        '銀行預金',
        '価格転嫁力の高い企業株式',
        '現金'
      ],
      correctAnswer: 2,
      explanation: '価格転嫁力の高い企業株式は、インフレ時に商品・サービス価格を調整できるため、インフレリスクに対して最も効果的です。債券や現金は固定収益のためインフレに弱い特性があります。'
    },
    {
      id: 'risk-management-8-q4',
      question: '金利上昇局面で推奨される債券投資戦略はどれですか？',
      options: [
        '長期債券への集中投資',
        'デュレーションの短期化',
        '債券投資の完全停止',
        '外国債券への切り替え'
      ],
      correctAnswer: 1,
      explanation: '金利上昇局面では、デュレーション（金利感応度）を短期化することで価格下落リスクを抑制できます。短期債券や変動金利債券への配分を増やすことが有効な戦略です。'
    }
  ],
  
  lastUpdated: '2025-08-21',
  factChecked: true
<h3>学習目標</h3>
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
      id: 'risk-management-8-q1',
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