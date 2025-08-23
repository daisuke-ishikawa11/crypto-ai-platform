import type { Lesson } from '@/types';

export const lesson17: Lesson = {
  id: 'risk-management-liquidity-credit-risk',
  categoryId: 'risk-management',
  title: '流動性リスクと信用リスクの統合管理',
  slug: 'liquidity-credit-risk-management',
  description: '流動性リスクと信用リスクの相互関係を理解し、統合的なリスク管理手法を学びます',
  difficultyLevel: 'advanced',
  estimatedMinutes: 35,
  orderIndex: 17,
  content: {
    sections: [
      {
        id: 'section-1',
        title: '流動性リスクの基本概念と分類',
        orderIndex: 1,
        type: 'text',
        content: `
<p>流動性リスクとは、必要な時に適正な価格で資産を現金化できないリスクです。<br/>特に市場環境が悪化した際に顕著に現れ、投資パフォーマンスに深刻な影響を与える可能性があります。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">流動性リスクの2つの側面</h2>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 1.5rem 0;">
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1.5rem; border-radius: 8px;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0;">🏦 資金調達流動性リスク</h3>
<p style="margin: 0; color: #374151;"><strong>定義：</strong>必要な資金を適切なコストで調達できないリスク</p>
<ul style="margin: 0.5rem 0 0 1rem; color: #374151;">
<li>銀行の預金流出リスク</li>
<li>企業の資金繰りリスク</li>
<li>債券の借り換えリスク</li>
<li>信用枠の利用制限</li>
</ul>
</div>
<div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 1.5rem; border-radius: 8px;">
<h3 style="color: #1d4ed8; margin: 0 0 1rem 0;">📈 市場流動性リスク</h3>
<p style="margin: 0; color: #374151;"><strong>定義：</strong>市場で資産を適正価格で売却できないリスク</p>
<ul style="margin: 0.5rem 0 0 1rem; color: #374151;">
<li>売買スプレッドの拡大</li>
<li>取引量の減少</li>
<li>価格のボラティリティ上昇</li>
<li>マーケットメーカー不在</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">流動性の測定指標</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">指標</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">計算方法</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">意味</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">良好水準</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">ビッド・アスク・スプレッド</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">(売値 - 買値) / 中央値 × 100</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">取引コストの大きさ</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">1%以下</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">平均取引量</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">過去30日間の日次平均売買代金</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">市場の厚み</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">保有額の10倍以上</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">価格インパクト</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">大口取引後の価格変動率</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">売買による価格への影響</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">2%以下</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">流動性比率</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">現金化可能資産 / 総資産</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">ポートフォリオの流動性</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">20%以上</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">資産別流動性リスク評価</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #dcfce7; border-left: 4px solid #22c55e; padding: 1rem;">
<h3 style="color: #059669; margin: 0 0 0.5rem 0;">高流動性資産（リスク：低）</h3>
<p style="margin: 0; color: #374151;">現金、主要国国債、大型株ETF、主要通貨ペア</p>
</div>
<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem;">
<h3 style="color: #d97706; margin: 0 0 0.5rem 0;">中流動性資産（リスク：中）</h3>
<p style="margin: 0; color: #374151;">大型個別株、投資適格社債、先進国株式ETF</p>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">低流動性資産（リスク：高）</h3>
<p style="margin: 0; color: #374151;">中小型株、新興国債券、不動産、プライベートエクイティ、暗号資産</p>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">危機時の流動性枯渇</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">平時は流動性が高い資産でも、金融危機時には流動性が急激に低下することがあります。常に最悪シナリオを想定した流動性管理が重要です。</p>
</div>
        `
      },
      {
        id: 'section-2',
        title: '信用リスクの種類と評価手法',
        orderIndex: 2,
        type: 'text',
        content: `
<p>信用リスクとは、取引相手が契約上の義務を履行できないリスクです。<br/>個人投資家にとっても、債券投資や金融機関との取引において重要な考慮要素となります。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">信用リスクの主要分類</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #dc2626; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">リスク種類</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">定義</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">具体例</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">対処法</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">デフォルトリスク</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">元利金の支払い不能</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">企業倒産・国債デフォルト</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">格付け分析・分散投資</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">信用格下げリスク</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">格付け低下による価値毀損</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">BBB→BBへの格下げ</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">財務分析・モニタリング</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">スプレッドリスク</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">信用スプレッド拡大リスク</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">社債利回りの上昇</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">金利ヘッジ・期間分散</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">回収リスク</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">デフォルト時の回収率低下</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">担保価値の下落</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">担保・保証の確認</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">信用格付けと投資判断</h2>

<div style="background: #f8fafc; border: 2px solid #94a3b8; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0; text-align: center;">主要格付機関の格付け体系</h3>
<table style="width: 100%; border-collapse: collapse;">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 8px; border: 1px solid #ddd; text-align: center;">格付レベル</th>
<th style="padding: 8px; border: 1px solid #ddd; text-align: center;">S&P</th>
<th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Moody's</th>
<th style="padding: 8px; border: 1px solid #ddd; text-align: center;">デフォルト率（年率）</th>
<th style="padding: 8px; border: 1px solid #ddd; text-align: center;">投資判断</th>
</tr>
</thead>
<tbody>
<tr style="background: #dcfce7;">
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; font-weight: 600;">投資適格</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center;">AAA〜BBB-</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center;">Aaa〜Baa3</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; color: #059669;">0.01%〜0.20%</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; color: #059669;">安全性重視</td>
</tr>
<tr style="background: #fef3c7;">
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; font-weight: 600;">投機的</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center;">BB+〜B-</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center;">Ba1〜B3</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">0.50%〜5.00%</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">収益性重視</td>
</tr>
<tr style="background: #fef2f2;">
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; font-weight: 600;">高リスク</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center;">CCC以下</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center;">Caa1以下</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; color: #dc2626;">10%以上</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; color: #dc2626;">投資回避推奨</td>
</tr>
</tbody>
</table>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">財務指標による信用分析</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">1. 収益性指標</h3>
<ul style="margin: 0.5rem 0 0 1rem; color: #374151;">
<li><strong>ROE（自己資本利益率）：</strong>15%以上が優良</li>
<li><strong>ROA（総資産利益率）：</strong>5%以上が健全</li>
<li><strong>営業利益率：</strong>業界平均以上が必要</li>
</ul>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">2. 安全性指標</h3>
<ul style="margin: 0.5rem 0 0 1rem; color: #374151;">
<li><strong>自己資本比率：</strong>30%以上が理想</li>
<li><strong>流動比率：</strong>150%以上が健全</li>
<li><strong>インタレスト・カバレッジ：</strong>5倍以上が安全</li>
</ul>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">3. 成長性指標</h3>
<ul style="margin: 0.5rem 0 0 1rem; color: #374151;">
<li><strong>売上高成長率：</strong>継続的な成長が重要</li>
<li><strong>利益成長率：</strong>売上成長を上回る利益成長</li>
<li><strong>フリーキャッシュフロー：</strong>正値の維持</li>
</ul>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">業界特性の考慮</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">財務指標は業界によって大きく異なります。同業他社との比較や業界平均との対比で相対評価することが重要です。</p>
</div>
        `
      },
      {
        id: 'section-3',
        title: '流動性・信用リスクの相互作用',
        orderIndex: 3,
        type: 'text',
        content: `
<p>流動性リスクと信用リスクは独立して発生するものではなく、相互に影響し合って複合的なリスクを形成します。<br/>この相互作用を理解することで、より効果的なリスク管理が可能になります。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">リスクの負の連鎖メカニズム</h2>

<div style="background: #fef2f2; border: 2px solid #dc2626; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0; text-align: center;">負の連鎖：流動性危機→信用危機</h3>
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin: 1rem 0;">
<div style="background: white; padding: 1rem; border-radius: 4px; text-align: center; border-left: 4px solid #dc2626;">
<div style="color: #dc2626; font-size: 1.5rem; font-weight: bold;">①</div>
<div style="font-weight: 600; margin: 0.5rem 0; color: #dc2626;">流動性枯渇</div>
<div style="font-size: 0.9rem; color: #374151;">市場参加者の売り圧力集中</div>
</div>
<div style="background: white; padding: 1rem; border-radius: 4px; text-align: center; border-left: 4px solid #dc2626;">
<div style="color: #dc2626; font-size: 1.5rem; font-weight: bold;">②</div>
<div style="font-weight: 600; margin: 0.5rem 0; color: #dc2626;">価格急落</div>
<div style="font-size: 0.9rem; color: #374151;">強制売却による投げ売り</div>
</div>
<div style="background: white; padding: 1rem; border-radius: 4px; text-align: center; border-left: 4px solid #dc2626;">
<div style="color: #dc2626; font-size: 1.5rem; font-weight: bold;">③</div>
<div style="font-weight: 600; margin: 0.5rem 0; color: #dc2626;">担保価値下落</div>
<div style="font-size: 0.9rem; color: #374151;">借入に必要な担保不足</div>
</div>
<div style="background: white; padding: 1rem; border-radius: 4px; text-align: center; border-left: 4px solid #dc2626;">
<div style="color: #dc2626; font-size: 1.5rem; font-weight: bold;">④</div>
<div style="font-weight: 600; margin: 0.5rem 0; color: #dc2626;">信用収縮</div>
<div style="font-size: 0.9rem; color: #374151;">資金調達困難・破綻リスク</div>
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">危機時の特徴的現象</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #dc2626; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">現象</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">平常時</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">危機時</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">影響</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">相関係数</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">0.3-0.5</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">0.8-0.9</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">分散効果の消失</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">流動性プレミアム</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">0.1-0.3%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">2-5%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">取引コスト急増</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">信用スプレッド</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">1-2%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">5-15%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">資金調達コスト上昇</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">マージンコール頻度</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">月1回程度</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">日次・時間内</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">強制決済リスク</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">システミックリスクの拡散経路</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">1. 直接的拡散</h3>
<p style="margin: 0; color: #374151;"><strong>経路：</strong>取引相手→債権者→関連企業</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>例：</strong>リーマン・ブラザーズ破綻による金融機関連鎖破綻</p>
</div>
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">2. 間接的拡散（市場経由）</h3>
<p style="margin: 0; color: #374151;"><strong>経路：</strong>価格下落→評価損→追加売り→価格下落</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>例：</strong>2020年3月のコロナショック時の全資産同時下落</p>
</div>
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">3. 心理的拡散（パニック）</h3>
<p style="margin: 0; color: #374151;"><strong>経路：</strong>不安増大→予防的売却→流動性枯渇</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>例：</strong>銀行取り付け騒ぎ・ミーム株バブル崩壊</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">早期警戒指標の設定</h2>

<div style="background: #f0fdfa; border: 2px solid #059669; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">
<h3 style="color: #047857; margin: 0 0 1rem 0; text-align: center;">統合的リスク監視ダッシュボード</h3>
<table style="width: 100%; border-collapse: collapse;">
<thead>
<tr style="background: #047857; color: white;">
<th style="padding: 10px; border: 1px solid #ddd; text-align: center;">監視項目</th>
<th style="padding: 10px; border: 1px solid #ddd; text-align: center;">正常</th>
<th style="padding: 10px; border: 1px solid #ddd; text-align: center;">注意</th>
<th style="padding: 10px; border: 1px solid #ddd; text-align: center;">警戒</th>
<th style="padding: 10px; border: 1px solid #ddd; text-align: center;">対応</th>
</tr>
</thead>
<tbody>
<tr>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; font-weight: 600;">VIX指数</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; background: #dcfce7;">15以下</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; background: #fef3c7;">15-25</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; background: #fef2f2;">25超</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center;">ヘッジ比率調整</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; font-weight: 600;">信用スプレッド</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; background: #dcfce7;">200bp以下</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; background: #fef3c7;">200-400bp</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; background: #fef2f2;">400bp超</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center;">信用格付見直し</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; font-weight: 600;">取引量減少率</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; background: #dcfce7;">-20%以下</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; background: #fef3c7;">-20〜-40%</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; background: #fef2f2;">-40%超</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center;">流動性確保強化</td>
</tr>
</tbody>
</table>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">複合リスクへの備え</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">流動性と信用の複合リスクに対しては、単一の対策では不十分です。複数の防御線を用意し、段階的に対応する階層的なリスク管理が重要です。</p>
</div>
        `
      },
      {
        id: 'section-4',
        title: '統合的リスク管理戦略',
        orderIndex: 4,
        type: 'text',
        content: `
<p>流動性リスクと信用リスクを統合的に管理することで、個別対応では実現困難な包括的なリスク軽減効果を得られます。<br/>効果的な統合戦略により、危機時でも安定したポートフォリオ運用を継続できます。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">統合管理の基本原則</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem;">
<h3 style="color: #1e40af; margin: 0 0 0.5rem 0;">1. 多層防御（Defense in Depth）</h3>
<p style="margin: 0; color: #374151;"><strong>コンセプト：</strong>単一障害点の排除、複数の独立した防御線構築</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>実装：</strong>流動性バッファ・信用分散・緊急時プロトコル</p>
</div>
<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem;">
<h3 style="color: #1e40af; margin: 0 0 0.5rem 0;">2. 動的調整（Dynamic Adjustment）</h3>
<p style="margin: 0; color: #374151;"><strong>コンセプト：</strong>市場環境変化に応じたリアルタイム最適化</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>実装：</strong>VIX連動配分・格付変化対応・流動性指標監視</p>
</div>
<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem;">
<h3 style="color: #1e40af; margin: 0 0 0.5rem 0;">3. 相互補完（Mutual Complement）</h3>
<p style="margin: 0; color: #374151;"><strong>コンセプト：</strong>異なるリスク特性を持つ資産の組み合わせ</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>実装：</strong>高流動性・低信用と低流動性・高信用のバランス</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">統合的ポートフォリオ設計</h2>

<div style="background: #f0fdfa; border: 2px solid #059669; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">
<h3 style="color: #047857; margin: 0 0 1rem 0; text-align: center;">リスク統合型ポートフォリオ例（1億円運用）</h3>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
<div style="background: white; padding: 1rem; border-radius: 4px;">
<h4 style="color: #047857; margin: 0 0 0.5rem 0;">コア部分（70%）- 安定重視</h4>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9rem;">
<li>現金・短期国債：20%（即座現金化可能）</li>
<li>AAA格国債ETF：20%（高流動性・高信用）</li>
<li>投資適格社債ETF：15%（分散効果）</li>
<li>大型株ETF：15%（バランス型）</li>
</ul>
</div>
<div style="background: white; padding: 1rem; border-radius: 4px;">
<h4 style="color: #047857; margin: 0 0 0.5rem 0;">サテライト部分（30%）- 収益追求</h4>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9rem;">
<li>個別株式：15%（厳選銘柄・分散）</li>
<li>新興国債券：5%（収益性重視）</li>
<li>REIT：5%（インフレヘッジ）</li>
<li>オルタナティブ：5%（分散効果）</li>
</ul>
</div>
</div>
<div style="background: white; padding: 1rem; margin: 1rem 0; border-radius: 4px; border: 2px solid #047857;">
<p style="margin: 0; color: #047857; font-weight: 600; text-align: center;">期待効果：年率リターン6-8%、最大ドローダウン25%以下、30日流動化率80%以上</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">危機対応プロトコル</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #dc2626; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">危機レベル</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">判断基準</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">対応措置</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">実行期限</th>
</tr>
</thead>
<tbody>
<tr style="background: #fef3c7;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">レベル1<br/>（注意）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">VIX 20超<br/>スプレッド200bp超</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">流動性比率を20%→25%に引上げ<br/>低格付債券の見直し開始</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #d97706;">3営業日</td>
</tr>
<tr style="background: #fed7aa;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">レベル2<br/>（警戒）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">VIX 30超<br/>スプレッド400bp超</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">リスク資産50%→40%に縮小<br/>流動性の低い資産の段階売却</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #ea580c;">1営業日</td>
</tr>
<tr style="background: #fecaca;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">レベル3<br/>（緊急）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">VIX 40超<br/>スプレッド600bp超</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">現金比率50%まで引上げ<br/>投機的格付資産の全売却</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">即座実行</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">継続的改善システム</h2>

<div style="background: #dbeafe; border: 2px solid #2563eb; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0; text-align: center;">PDCA サイクルによる管理高度化</h3>
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin: 1rem 0;">
<div style="background: white; padding: 1rem; border-radius: 4px; text-align: center;">
<div style="color: #2563eb; font-size: 2rem; font-weight: bold;">P</div>
<div style="font-weight: 600; margin: 0.5rem 0; color: #2563eb;">Plan</div>
<ul style="font-size: 0.9rem; color: #374151; text-align: left; margin: 0; padding-left: 1rem;">
<li>リスク許容度設定</li>
<li>配分方針決定</li>
<li>監視指標選定</li>
</ul>
</div>
<div style="background: white; padding: 1rem; border-radius: 4px; text-align: center;">
<div style="color: #2563eb; font-size: 2rem; font-weight: bold;">D</div>
<div style="font-weight: 600; margin: 0.5rem 0; color: #2563eb;">Do</div>
<ul style="font-size: 0.9rem; color: #374151; text-align: left; margin: 0; padding-left: 1rem;">
<li>ポートフォリオ構築</li>
<li>リスク管理実行</li>
<li>定期的モニタリング</li>
</ul>
</div>
<div style="background: white; padding: 1rem; border-radius: 4px; text-align: center;">
<div style="color: #2563eb; font-size: 2rem; font-weight: bold;">C</div>
<div style="font-weight: 600; margin: 0.5rem 0; color: #2563eb;">Check</div>
<ul style="font-size: 0.9rem; color: #374151; text-align: left; margin: 0; padding-left: 1rem;">
<li>パフォーマンス評価</li>
<li>リスク指標検証</li>
<li>想定外事象分析</li>
</ul>
</div>
<div style="background: white; padding: 1rem; border-radius: 4px; text-align: center;">
<div style="color: #2563eb; font-size: 2rem; font-weight: bold;">A</div>
<div style="font-weight: 600; margin: 0.5rem 0; color: #2563eb;">Act</div>
<ul style="font-size: 0.9rem; color: #374151; text-align: left; margin: 0; padding-left: 1rem;">
<li>改善点の実装</li>
<li>新手法の導入</li>
<li>教訓の体系化</li>
</ul>
</div>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">統合管理の真価は危機時に現れる</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">平時には複雑に見える統合管理も、危機時にはシンプルで効果的な防御システムとして機能します。継続的な改善により、さらに強固なリスク管理体制を構築できます。</p>
</div>
        `
      }
    ],
    keyPoints: [
      '流動性リスクには資金調達流動性リスクと市場流動性リスクの2つの側面がある',
      '信用リスクはデフォルト・格下げ・スプレッド・回収の4種類に分類される',
      '流動性リスクと信用リスクは相互作用して負の連鎖を形成し複合的リスクとなる',
      '危機時には相関上昇・スプレッド拡大・流動性枯渇が同時発生する',
      '統合管理では多層防御・動的調整・相互補完の3原則が重要',
      '危機対応プロトコルを事前設定し段階的な対応措置で被害を最小化',
      'PDCAサイクルによる継続改善で統合管理システムの高度化を図る'
    ],
    summary: '流動性リスクと信用リスクの統合管理について包括的に学習しました。流動性リスクの2つの側面と信用リスクの4分類を理解し、これらが相互作用して複合的リスクを形成するメカニズムを把握しました。危機時の特徴的現象とシステミックリスクの拡散経路を踏まえ、多層防御・動的調整・相互補完を基本原則とする統合的リスク管理戦略を構築できます。早期警戒システムと危機対応プロトコルにより段階的対応を行い、PDCAサイクルで継続的に管理システムを改善していくことが、安定した長期投資の実現につながります。',
    practicalExamples: [
      '大手銀行が流動性カバレッジ比率(LCR)130%維持と信用集中度上限20%制限で統合管理を実践した事例',
      '年金基金が危機時流動化可能資産30%確保と格付BBB以上限定で安定運用を20年継続した実例',
      '個人投資家がVIX20超で現金比率25%・40超で50%の段階的調整ルールで2020年危機を乗り切った成功例',
      'ヘッジファンドが信用・流動性統合VaRモデルで最大損失15%に抑制しシャープレシオ2.1を達成した高度事例',
      '地方銀行が取引先企業の財務・流動性一体監視システムで貸倒率を業界平均の半分に削減した先進的取組み'
    ],
    warningNotes: [
      '投資判断は自己責任で行い、本レッスンの内容は教育目的のみで投資勧誘ではありません',
      '流動性と信用の複合リスクは想定以上に深刻化する可能性があります',
      '危機時には通常の相関関係が破綻し予想外の損失が発生する場合があります',
      '統合管理システムも完璧ではなく定期的な見直しと改善が不可欠です',
      '複雑な金融商品や高レバレッジ取引では統合管理がより困難になります'
    ]
  },
  quiz: [
    {
      id: 'risk-management-17-q1',
      question: '流動性リスクの2つの側面のうち「市場流動性リスク」とは何ですか？',
      options: [
        '必要な資金を適切なコストで調達できないリスク',
        '市場で資産を適正価格で売却できないリスク',
        '市場価格が変動するリスク',
        '市場参加者が減少するリスク'
      ],
      correctAnswer: 1,
      explanation: '市場流動性リスクとは、市場で資産を適正価格で売却できないリスクです。売買スプレッドの拡大、取引量の減少、価格ボラティリティの上昇などが典型的な現象です。'
    },
    {
      id: 'risk-management-17-q2',
      question: '信用リスクの種類として適切でないものは？',
      options: [
        'デフォルトリスク（債務不履行リスク）',
        '信用格下げリスク',
        '市場価格変動リスク',
        'スプレッドリスク（信用スプレッド拡大リスク）'
      ],
      correctAnswer: 2,
      explanation: '市場価格変動リスクは市場リスクに分類され、信用リスクではありません。信用リスクには、デフォルトリスク、格下げリスク、スプレッドリスク、回収リスクがあります。'
    },
    {
      id: 'risk-management-17-q3',
      question: '流動性リスクと信用リスクの負の連鎖で最初に発生するのは？',
      options: [
        '信用収縮',
        '担保価値下落',
        '流動性枯渇',
        '強制決済'
      ],
      correctAnswer: 2,
      explanation: '負の連鎖は流動性枯渇から始まります。市場参加者の売り圧力集中→価格急落→担保価値下落→信用収縮という順序で進行します。'
    },
    {
      id: 'risk-management-17-q4',
      question: '統合的リスク管理の基本原則でないものは？',
      options: [
        '多層防御（複数の独立した防御線構築）',
        '動的調整（市場環境変化への適応）',
        '相互補完（異なるリスク特性の組み合わせ）',
        '単一集中（最も効果的な手法への集約）'
      ],
      correctAnswer: 3,
      explanation: '統合的リスク管理では単一集中ではなく分散化が重要です。多層防御・動的調整・相互補完の3つが基本原則で、単一障害点を排除し複数の防御線を構築します。'
    }
  ],
  lastUpdated: '2025-01-21',
  factChecked: true
};