import type { Lesson } from '@/lib/types/learning';

export const lesson21: Lesson = {
  id: 'global-economy-investment-opportunities',
  categoryId: 'financial-literacy',
  title: 'グローバル経済と投資機会：世界市場への扉を開く戦略的投資術',
  slug: 'global-economy-investment-opportunities',
  description: '世界経済の構造理解から、国際分散投資の実践方法、地政学リスクの評価まで。グローバル投資で資産を最大化する包括的戦略を学びます。',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 35,
  orderIndex: 21,
  content: {
    sections: [
      {
        id: 'section-1',
        title: 'グローバル経済の基本構造',
        orderIndex: 1,
        type: 'text',
        content: `
<p>世界経済は複雑に絡み合った巨大なシステムです。<br/>この構造を理解することで、真の投資機会を見つけることができます。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">世界経済を動かす4つの力</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="border-left: 4px solid #3b82f6; background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); padding: 1.5rem; border-radius: 8px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af;">1. 先進国経済（米国・欧州・日本）</h3>
<p style="margin: 0; color: #374151; font-weight: 500;">• 成熟した市場、安定した成長<br/>• 技術革新とサービス業が主力<br/>• 世界の60%のGDPを占める</p>
</div>
<div style="border-left: 4px solid #10b981; background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 1.5rem; border-radius: 8px;">
<h3 style="margin: 0 0 0.5rem 0; color: #065f46;">2. 新興国経済（中国・インド・東南アジア）</h3>
<p style="margin: 0; color: #374151; font-weight: 500;">• 高い成長率、人口増加の恩恵<br/>• 製造業からサービス業への転換<br/>• 世界経済の成長エンジン</p>
</div>
<div style="border-left: 4px solid #f59e0b; background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%); padding: 1.5rem; border-radius: 8px;">
<h3 style="margin: 0 0 0.5rem 0; color: #d97706;">3. 資源国経済（豪州・カナダ・中東）</h3>
<p style="margin: 0; color: #374151; font-weight: 500;">• 原油・鉱物・農産物が主力<br/>• 商品価格に経済が左右される<br/>• インフレ対策として注目</p>
</div>
<div style="border-left: 4px solid #8b5cf6; background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%); padding: 1.5rem; border-radius: 8px;">
<h3 style="margin: 0 0 0.5rem 0; color: #7c3aed;">4. 国際金融市場</h3>
<p style="margin: 0; color: #374151; font-weight: 500;">• 資金の流れを決定する中枢<br/>• 為替レート・金利に大きく影響<br/>• 投資機会の創出源</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">地域別GDP成長率の推移（過去10年平均）</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 4px 16px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;">
<thead>
<tr style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white;">
<th style="padding: 16px; border: none; text-align: center; font-size: 1.1em;">地域</th>
<th style="padding: 16px; border: none; text-align: center; font-size: 1.1em;">平均GDP成長率</th>
<th style="padding: 16px; border: none; text-align: center; font-size: 1.1em;">主要投資機会</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 14px; border: none; text-align: center; font-weight: 600;">アジア新興国</td>
<td style="padding: 14px; border: none; text-align: center; color: #059669; font-weight: bold; font-size: 1.1em;">6.8%</td>
<td style="padding: 14px; border: none; text-align: center; color: #374151;">テクノロジー、消費財</td>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 14px; border: none; text-align: center; font-weight: 600;">米国</td>
<td style="padding: 14px; border: none; text-align: center; color: #059669; font-weight: bold; font-size: 1.1em;">2.3%</td>
<td style="padding: 14px; border: none; text-align: center; color: #374151;">IT、ヘルスケア</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 14px; border: none; text-align: center; font-weight: 600;">欧州</td>
<td style="padding: 14px; border: none; text-align: center; color: #d97706; font-weight: bold; font-size: 1.1em;">1.4%</td>
<td style="padding: 14px; border: none; text-align: center; color: #374151;">高級品、再生エネルギー</td>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 14px; border: none; text-align: center; font-weight: 600;">日本</td>
<td style="padding: 14px; border: none; text-align: center; color: #d97706; font-weight: bold; font-size: 1.1em;">1.0%</td>
<td style="padding: 14px; border: none; text-align: center; color: #374151;">製造業、ロボティクス</td>
</tr>
<tr style="background: #e0f2fe;">
<td style="padding: 14px; border: none; text-align: center; font-weight: 600;">資源国</td>
<td style="padding: 14px; border: none; text-align: center; color: #059669; font-weight: bold; font-size: 1.1em;">2.8%</td>
<td style="padding: 14px; border: none; text-align: center; color: #374151;">鉱業、エネルギー</td>
</tr>
</tbody>
</table>

<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-left: 4px solid #2563eb; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">🌍 グローバル投資のポイント</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">世界は一つの巨大な投資の場</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">各地域の特性を理解し、成長の波に乗ることで、日本だけでは得られない投資機会を掴めます。</p>
</div>
        `
      },
      {
        id: 'section-2', 
        title: '国際分散投資の威力',
        orderIndex: 2,
        type: 'text',
        content: `
<p>「世界に分散投資する」ことで、一国の経済危機にも動じない<br/>強固なポートフォリオを構築できます。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">日本集中vs世界分散の比較</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 4px 16px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;">
<thead>
<tr style="background: linear-gradient(135deg, #dc2626 0%, #f87171 100%); color: white;">
<th style="padding: 16px; border: none; text-align: center; width: 25%;">期間</th>
<th style="padding: 16px; border: none; text-align: center; width: 25%;">日本株のみ</th>
<th style="padding: 16px; border: none; text-align: center; width: 25%;">世界分散投資</th>
<th style="padding: 16px; border: none; text-align: center; width: 25%;">差額</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 14px; border: none; text-align: center; font-weight: 600;">過去10年</td>
<td style="padding: 14px; border: none; text-align: center; color: #d97706; font-weight: bold;">+47%</td>
<td style="padding: 14px; border: none; text-align: center; color: #059669; font-weight: bold;">+189%</td>
<td style="padding: 14px; border: none; text-align: center; color: #059669; font-weight: bold;">+142%</td>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 14px; border: none; text-align: center; font-weight: 600;">過去20年</td>
<td style="padding: 14px; border: none; text-align: center; color: #d97706; font-weight: bold;">+14%</td>
<td style="padding: 14px; border: none; text-align: center; color: #059669; font-weight: bold;">+267%</td>
<td style="padding: 14px; border: none; text-align: center; color: #059669; font-weight: bold;">+253%</td>
</tr>
<tr style="background: #f0f9ff;">
<td style="padding: 14px; border: none; text-align: center; font-weight: 600;">過去30年</td>
<td style="padding: 14px; border: none; text-align: center; color: #d97706; font-weight: bold;">+12%</td>
<td style="padding: 14px; border: none; text-align: center; color: #059669; font-weight: bold;">+598%</td>
<td style="padding: 14px; border: none; text-align: center; color: #059669; font-weight: bold;">+586%</td>
</tr>
</tbody>
</table>

<p style="font-size: 0.9em; color: #6b7280; margin: 0.5rem 0;">※日経平均 vs MSCI ACWI指数</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">世界分散投資の4つのメリット</h2>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 2rem 0;">
<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 2px solid #a7f3d0; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #065f46; margin: 0 0 1rem 0; text-align: center; font-size: 1.2em;">🎯 リスク分散効果</h3>
<ul style="list-style: none; margin: 0; padding: 0; color: #374151;">
<li style="padding: 0.4rem 0; border-bottom: 1px solid #a7f3d0; font-weight: 500;">• 一国の危機に左右されない</li>
<li style="padding: 0.4rem 0; border-bottom: 1px solid #a7f3d0; font-weight: 500;">• 通貨リスクも自然に分散</li>
<li style="padding: 0.4rem 0; font-weight: 500;">• 安定したリターンを実現</li>
</ul>
</div>
<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #fbbf24; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #d97706; margin: 0 0 1rem 0; text-align: center; font-size: 1.2em;">📈 成長機会の拡大</h3>
<ul style="list-style: none; margin: 0; padding: 0; color: #374151;">
<li style="padding: 0.4rem 0; border-bottom: 1px solid #fbbf24; font-weight: 500;">• 高成長地域への投資</li>
<li style="padding: 0.4rem 0; border-bottom: 1px solid #fbbf24; font-weight: 500;">• 新興技術への早期参入</li>
<li style="padding: 0.4rem 0; font-weight: 500;">• 多様な産業への投資</li>
</ul>
</div>
<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border: 2px solid #60a5fa; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0; text-align: center; font-size: 1.2em;">🔄 投資タイミングの最適化</h3>
<ul style="list-style: none; margin: 0; padding: 0; color: #374151;">
<li style="padding: 0.4rem 0; border-bottom: 1px solid #60a5fa; font-weight: 500;">• 時差による24時間投資</li>
<li style="padding: 0.4rem 0; border-bottom: 1px solid #60a5fa; font-weight: 500;">• 経済サイクルの違いを活用</li>
<li style="padding: 0.4rem 0; font-weight: 500;">• 常にどこかが成長期</li>
</ul>
</div>
<div style="background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%); border: 2px solid #a78bfa; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #7c3aed; margin: 0 0 1rem 0; text-align: center; font-size: 1.2em;">💰 コスト効率性</h3>
<ul style="list-style: none; margin: 0; padding: 0; color: #374151;">
<li style="padding: 0.4rem 0; border-bottom: 1px solid #a78bfa; font-weight: 500;">• ETFで簡単に世界投資</li>
<li style="padding: 0.4rem 0; border-bottom: 1px solid #a78bfa; font-weight: 500;">• 低コストでの分散投資</li>
<li style="padding: 0.4rem 0; font-weight: 500;">• 少額から世界投資可能</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">理想的な地域配分の例</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 4px 16px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;">
<thead>
<tr style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white;">
<th style="padding: 16px; border: none; text-align: center;">地域</th>
<th style="padding: 16px; border: none; text-align: center;">保守型</th>
<th style="padding: 16px; border: none; text-align: center;">バランス型</th>
<th style="padding: 16px; border: none; text-align: center;">積極型</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: none; text-align: center; font-weight: 600;">先進国（米欧日）</td>
<td style="padding: 12px; border: none; text-align: center; font-size: 1.1em; font-weight: bold; color: #1e40af;">60%</td>
<td style="padding: 12px; border: none; text-align: center; font-size: 1.1em; font-weight: bold; color: #1e40af;">50%</td>
<td style="padding: 12px; border: none; text-align: center; font-size: 1.1em; font-weight: bold; color: #1e40af;">40%</td>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 12px; border: none; text-align: center; font-weight: 600;">新興国</td>
<td style="padding: 12px; border: none; text-align: center; font-size: 1.1em; font-weight: bold; color: #059669;">25%</td>
<td style="padding: 12px; border: none; text-align: center; font-size: 1.1em; font-weight: bold; color: #059669;">35%</td>
<td style="padding: 12px; border: none; text-align: center; font-size: 1.1em; font-weight: bold; color: #059669;">45%</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: none; text-align: center; font-weight: 600;">資源・コモディティ</td>
<td style="padding: 12px; border: none; text-align: center; font-size: 1.1em; font-weight: bold; color: #d97706;">10%</td>
<td style="padding: 12px; border: none; text-align: center; font-size: 1.1em; font-weight: bold; color: #d97706;">10%</td>
<td style="padding: 12px; border: none; text-align: center; font-size: 1.1em; font-weight: bold; color: #d97706;">10%</td>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 12px; border: none; text-align: center; font-weight: 600;">オルタナティブ</td>
<td style="padding: 12px; border: none; text-align: center; font-size: 1.1em; font-weight: bold; color: #7c3aed;">5%</td>
<td style="padding: 12px; border: none; text-align: center; font-size: 1.1em; font-weight: bold; color: #7c3aed;">5%</td>
<td style="padding: 12px; border: none; text-align: center; font-size: 1.1em; font-weight: bold; color: #7c3aed;">5%</td>
</tr>
</tbody>
</table>

<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-left: 4px solid #2563eb; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">🌍 分散投資のコツ</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">「卵を世界中のカゴに分けて入れる」</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">一つの国が不調でも、他の国の好調さでカバー。時間をかければ世界経済全体の成長を取り込めます。</p>
</div>
        `
      },
      {
        id: 'section-3',
        title: '地政学リスクの理解と対策',
        orderIndex: 3,
        type: 'text',
        content: `
<p>国際情勢の変化は投資に大きな影響を与えます。<br/>地政学リスクを理解し、適切に対処する方法を学びましょう。</p>

<h2 style="color: #dc2626; margin: 2rem 0 1rem 0;">主要な地政学リスク</h2>

<div style="display: grid; gap: 1.5rem; margin: 2rem 0;">
<div style="border-left: 4px solid #dc2626; background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%); padding: 1.5rem; border-radius: 8px;">
<h3 style="margin: 0 0 0.5rem 0; color: #dc2626;">🏛️ 政治的リスク</h3>
<p style="margin: 0; color: #374151; font-weight: 500;">• 政権交代による政策変更<br/>• 規制強化・税制変更<br/>• 政治的不安定による市場混乱</p>
</div>
<div style="border-left: 4px solid #d97706; background: linear-gradient(135deg, #fffbeb 0%, #fed7aa 100%); padding: 1.5rem; border-radius: 8px;">
<h3 style="margin: 0 0 0.5rem 0; color: #d97706;">⚔️ 軍事・安全保障リスク</h3>
<p style="margin: 0; color: #374151; font-weight: 500;">• 地域紛争・戦争<br/>• テロ・サイバー攻撃<br/>• 軍事同盟の変化</p>
</div>
<div style="border-left: 4px solid #7c3aed; background: linear-gradient(135deg, #faf5ff 0%, #ddd6fe 100%); padding: 1.5rem; border-radius: 8px;">
<h3 style="margin: 0 0 0.5rem 0; color: #7c3aed;">🌐 経済制裁・貿易戦争</h3>
<p style="margin: 0; color: #374151; font-weight: 500;">• 関税引き上げ・輸出規制<br/>• 金融制裁・資産凍結<br/>• 技術移転制限</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">過去の地政学的事件と市場への影響</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 4px 16px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;">
<thead>
<tr style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white;">
<th style="padding: 16px; border: none; text-align: center; width: 30%;">事件</th>
<th style="padding: 16px; border: none; text-align: center; width: 20%;">発生年</th>
<th style="padding: 16px; border: none; text-align: center; width: 25%;">初期影響</th>
<th style="padding: 16px; border: none; text-align: center; width: 25%;">1年後の回復</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: none; text-align: center; font-weight: 600;">9.11テロ</td>
<td style="padding: 12px; border: none; text-align: center;">2001</td>
<td style="padding: 12px; border: none; text-align: center; color: #dc2626; font-weight: bold;">-11.6%</td>
<td style="padding: 12px; border: none; text-align: center; color: #059669; font-weight: bold;">-11.9%</td>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 12px; border: none; text-align: center; font-weight: 600;">イラク戦争</td>
<td style="padding: 12px; border: none; text-align: center;">2003</td>
<td style="padding: 12px; border: none; text-align: center; color: #dc2626; font-weight: bold;">-2.3%</td>
<td style="padding: 12px; border: none; text-align: center; color: #059669; font-weight: bold;">+26.4%</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: none; text-align: center; font-weight: 600;">Brexit決定</td>
<td style="padding: 12px; border: none; text-align: center;">2016</td>
<td style="padding: 12px; border: none; text-align: center; color: #dc2626; font-weight: bold;">-5.3%</td>
<td style="padding: 12px; border: none; text-align: center; color: #059669; font-weight: bold;">+21.8%</td>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 12px; border: none; text-align: center; font-weight: 600;">米中貿易戦争</td>
<td style="padding: 12px; border: none; text-align: center;">2018</td>
<td style="padding: 12px; border: none; text-align: center; color: #dc2626; font-weight: bold;">-6.2%</td>
<td style="padding: 12px; border: none; text-align: center; color: #059669; font-weight: bold;">+28.7%</td>
</tr>
<tr style="background: #f0f9ff;">
<td style="padding: 12px; border: none; text-align: center; font-weight: 600;">ロシア・ウクライナ</td>
<td style="padding: 12px; border: none; text-align: center;">2022</td>
<td style="padding: 12px; border: none; text-align: center; color: #dc2626; font-weight: bold;">-13.1%</td>
<td style="padding: 12px; border: none; text-align: center; color: #059669; font-weight: bold;">+18.1%</td>
</tr>
</tbody>
</table>

<p style="font-size: 0.9em; color: #6b7280; margin: 0.5rem 0;">※S&P500指数の変化率</p>

<h2 style="color: #059669; margin: 2rem 0 1rem 0;">地政学リスク対策の5原則</h2>

<div style="background: #f0fdf4; border: 2px solid #a7f3d0; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<div style="display: grid; gap: 1.5rem;">
<div style="display: flex; align-items: center;">
<div style="background: #059669; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2em; margin-right: 1rem; flex-shrink: 0;">1</div>
<div>
<h3 style="margin: 0 0 0.3rem 0; color: #065f46;">極度の地域集中を避ける</h3>
<p style="margin: 0; color: #374151;">一つの地域だけでなく、世界中に分散投資することで地政学リスクを軽減</p>
</div>
</div>
<div style="display: flex; align-items: center;">
<div style="background: #059669; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2em; margin-right: 1rem; flex-shrink: 0;">2</div>
<div>
<h3 style="margin: 0 0 0.3rem 0; color: #065f46;">安全資産への一部配分</h3>
<p style="margin: 0; color: #374151;">米国債・金・スイスフランなど「有事の際の逃避先」も保有</p>
</div>
</div>
<div style="display: flex; align-items: center;">
<div style="background: #059669; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2em; margin-right: 1rem; flex-shrink: 0;">3</div>
<div>
<h3 style="margin: 0 0 0.3rem 0; color: #065f46;">感情的な判断を避ける</h3>
<p style="margin: 0; color: #374151;">ニュースに惑わされず、長期的な視点で冷静に判断</p>
</div>
</div>
<div style="display: flex; align-items: center;">
<div style="background: #059669; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2em; margin-right: 1rem; flex-shrink: 0;">4</div>
<div>
<h3 style="margin: 0 0 0.3rem 0; color: #065f46;">定期的なリバランス</h3>
<p style="margin: 0; color: #374151;">地政学的変化に応じて、ポートフォリオを適時調整</p>
</div>
</div>
<div style="display: flex; align-items: center;">
<div style="background: #059669; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2em; margin-right: 1rem; flex-shrink: 0;">5</div>
<div>
<h3 style="margin: 0 0 0.3rem 0; color: #065f46;">情報収集の継続</h3>
<p style="margin: 0; color: #374151;">国際情勢を常に把握し、早期の対応準備を心がける</p>
</div>
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">地政学的危機時の投資行動指針</h2>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
<div style="background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%); border: 2px solid #fca5a5; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0; text-align: center; font-size: 1.2em;">❌ やってはいけないこと</h3>
<ul style="list-style: none; margin: 0; padding: 0; color: #374151;">
<li style="padding: 0.5rem 0; border-bottom: 1px solid #fca5a5; font-weight: 500;">• パニック売りをする</li>
<li style="padding: 0.5rem 0; border-bottom: 1px solid #fca5a5; font-weight: 500;">• 全資産を現金化する</li>
<li style="padding: 0.5rem 0; border-bottom: 1px solid #fca5a5; font-weight: 500;">• 感情的な投資判断</li>
<li style="padding: 0.5rem 0; font-weight: 500;">• 情報に振り回される</li>
</ul>
</div>
<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 2px solid #a7f3d0; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #059669; margin: 0 0 1rem 0; text-align: center; font-size: 1.2em;">✅ すべきこと</h3>
<ul style="list-style: none; margin: 0; padding: 0; color: #374151;">
<li style="padding: 0.5rem 0; border-bottom: 1px solid #a7f3d0; font-weight: 500;">• 冷静に状況を分析する</li>
<li style="padding: 0.5rem 0; border-bottom: 1px solid #a7f3d0; font-weight: 500;">• 長期的視点を維持する</li>
<li style="padding: 0.5rem 0; border-bottom: 1px solid #a7f3d0; font-weight: 500;">• 下落時こそ積立継続</li>
<li style="padding: 0.5rem 0; font-weight: 500;">• 専門家の意見も参考に</li>
</ul>
</div>
</div>

<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-left: 4px solid #2563eb; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">🛡️ 地政学リスク対策の心得</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">「危機こそ投資の好機」</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">歴史的に見ると、地政学的危機は一時的。むしろ下落した優良資産を安く買える絶好のチャンスです。</p>
</div>
        `
      },
      {
        id: 'section-4',
        title: '通貨と為替の投資戦略',
        orderIndex: 4,
        type: 'text',
        content: `
<p>グローバル投資では為替の動きも重要な要素です。<br/>通貨リスクを理解し、適切に活用する方法を学びましょう。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">主要通貨の特徴と投資機会</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 4px 16px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;">
<thead>
<tr style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white;">
<th style="padding: 16px; border: none; text-align: center; width: 15%;">通貨</th>
<th style="padding: 16px; border: none; text-align: center; width: 20%;">特徴</th>
<th style="padding: 16px; border: none; text-align: center; width: 25%;">強くなる要因</th>
<th style="padding: 16px; border: none; text-align: center; width: 25%;">弱くなる要因</th>
<th style="padding: 16px; border: none; text-align: center; width: 15%;">投資戦略</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: none; text-align: center; font-weight: 600; color: #1e40af;">USD<br/>（米ドル）</td>
<td style="padding: 12px; border: none; text-align: center; color: #374151; font-size: 0.9em;">基軸通貨<br/>高い流動性</td>
<td style="padding: 12px; border: none; text-align: center; color: #374151; font-size: 0.9em;">金利上昇<br/>有事の際の逃避</td>
<td style="padding: 12px; border: none; text-align: center; color: #374151; font-size: 0.9em;">金利低下<br/>財政赤字拡大</td>
<td style="padding: 12px; border: none; text-align: center; color: #059669; font-weight: 600;">コア資産</td>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 12px; border: none; text-align: center; font-weight: 600; color: #1e40af;">EUR<br/>（ユーロ）</td>
<td style="padding: 12px; border: none; text-align: center; color: #374151; font-size: 0.9em;">準基軸通貨<br/>経済統合通貨</td>
<td style="padding: 12px; border: none; text-align: center; color: #374151; font-size: 0.9em;">欧州経済回復<br/>金融統合進展</td>
<td style="padding: 12px; border: none; text-align: center; color: #374151; font-size: 0.9em;">政治不安<br/>経済格差拡大</td>
<td style="padding: 12px; border: none; text-align: center; color: #d97706; font-weight: 600;">補完資産</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: none; text-align: center; font-weight: 600; color: #1e40af;">JPY<br/>（日本円）</td>
<td style="padding: 12px; border: none; text-align: center; color: #374151; font-size: 0.9em;">低金利通貨<br/>安全資産</td>
<td style="padding: 12px; border: none; text-align: center; color: #374151; font-size: 0.9em;">有事の円買い<br/>金利正常化</td>
<td style="padding: 12px; border: none; text-align: center; color: #374151; font-size: 0.9em;">超金融緩和<br/>貿易収支悪化</td>
<td style="padding: 12px; border: none; text-align: center; color: #7c3aed; font-weight: 600;">ヘッジ検討</td>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 12px; border: none; text-align: center; font-weight: 600; color: #1e40af;">CNY<br/>（人民元）</td>
<td style="padding: 12px; border: none; text-align: center; color: #374151; font-size: 0.9em;">管理変動相場<br/>新興国通貨</td>
<td style="padding: 12px; border: none; text-align: center; color: #374151; font-size: 0.9em;">中国経済成長<br/>国際化推進</td>
<td style="padding: 12px; border: none; text-align: center; color: #374151; font-size: 0.9em;">米中対立激化<br/>資本規制強化</td>
<td style="padding: 12px; border: none; text-align: center; color: #059669; font-weight: 600;">成長投資</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">為替ヘッジの考え方</h2>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 2px solid #a7f3d0; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #059669; margin: 0 0 1rem 0; text-align: center; font-size: 1.2em;">為替ヘッジあり</h3>
<div style="text-align: center; margin: 1rem 0;">
<div style="background: #059669; color: white; width: 60px; height: 60px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.5em;">🛡️</div>
</div>
<ul style="list-style: none; margin: 0; padding: 0; color: #374151;">
<li style="padding: 0.5rem 0; border-bottom: 1px solid #a7f3d0; font-weight: 500;">✅ 為替リスクを回避</li>
<li style="padding: 0.5rem 0; border-bottom: 1px solid #a7f3d0; font-weight: 500;">✅ 純粋な株価変動のみ</li>
<li style="padding: 0.5rem 0; border-bottom: 1px solid #a7f3d0; font-weight: 500;">❌ ヘッジコストが発生</li>
<li style="padding: 0.5rem 0; font-weight: 500;">❌ 円安恩恵を受けられない</li>
</ul>
<div style="text-align: center; margin-top: 1rem; font-weight: 600; color: #059669;">保守的な投資家向け</div>
</div>
<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #fbbf24; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #d97706; margin: 0 0 1rem 0; text-align: center; font-size: 1.2em;">為替ヘッジなし</h3>
<div style="text-align: center; margin: 1rem 0;">
<div style="background: #d97706; color: white; width: 60px; height: 60px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.5em;">🎯</div>
</div>
<ul style="list-style: none; margin: 0; padding: 0; color: #374151;">
<li style="padding: 0.5rem 0; border-bottom: 1px solid #fbbf24; font-weight: 500;">✅ 円安時の恩恵大</li>
<li style="padding: 0.5rem 0; border-bottom: 1px solid #fbbf24; font-weight: 500;">✅ ヘッジコスト不要</li>
<li style="padding: 0.5rem 0; border-bottom: 1px solid #fbbf24; font-weight: 500;">❌ 為替変動リスク</li>
<li style="padding: 0.5rem 0; font-weight: 500;">❌ 円高時は不利</li>
</ul>
<div style="text-align: center; margin-top: 1rem; font-weight: 600; color: #d97706;">積極的な投資家向け</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">実際の為替影響シミュレーション</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 4px 16px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;">
<thead>
<tr style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white;">
<th style="padding: 16px; border: none; text-align: center;">シナリオ</th>
<th style="padding: 16px; border: none; text-align: center;">株価変動</th>
<th style="padding: 16px; border: none; text-align: center;">為替変動</th>
<th style="padding: 16px; border: none; text-align: center;">ヘッジあり</th>
<th style="padding: 16px; border: none; text-align: center;">ヘッジなし</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: none; text-align: center; font-weight: 600;">好況・円安</td>
<td style="padding: 12px; border: none; text-align: center; color: #059669; font-weight: bold;">+20%</td>
<td style="padding: 12px; border: none; text-align: center; color: #059669; font-weight: bold;">+15%</td>
<td style="padding: 12px; border: none; text-align: center; color: #059669; font-size: 1.1em; font-weight: bold;">+20%</td>
<td style="padding: 12px; border: none; text-align: center; color: #059669; font-size: 1.1em; font-weight: bold;">+38%</td>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 12px; border: none; text-align: center; font-weight: 600;">好況・円高</td>
<td style="padding: 12px; border: none; text-align: center; color: #059669; font-weight: bold;">+20%</td>
<td style="padding: 12px; border: none; text-align: center; color: #dc2626; font-weight: bold;">-10%</td>
<td style="padding: 12px; border: none; text-align: center; color: #059669; font-size: 1.1em; font-weight: bold;">+20%</td>
<td style="padding: 12px; border: none; text-align: center; color: #d97706; font-size: 1.1em; font-weight: bold;">+8%</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: none; text-align: center; font-weight: 600;">不況・円安</td>
<td style="padding: 12px; border: none; text-align: center; color: #dc2626; font-weight: bold;">-15%</td>
<td style="padding: 12px; border: none; text-align: center; color: #059669; font-weight: bold;">+15%</td>
<td style="padding: 12px; border: none; text-align: center; color: #dc2626; font-size: 1.1em; font-weight: bold;">-15%</td>
<td style="padding: 12px; border: none; text-align: center; color: #d97706; font-size: 1.1em; font-weight: bold;">-2%</td>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 12px; border: none; text-align: center; font-weight: 600;">不況・円高</td>
<td style="padding: 12px; border: none; text-align: center; color: #dc2626; font-weight: bold;">-15%</td>
<td style="padding: 12px; border: none; text-align: center; color: #dc2626; font-weight: bold;">-10%</td>
<td style="padding: 12px; border: none; text-align: center; color: #dc2626; font-size: 1.1em; font-weight: bold;">-15%</td>
<td style="padding: 12px; border: none; text-align: center; color: #dc2626; font-size: 1.1em; font-weight: bold;">-23%</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">通貨分散投資の実践方法</h2>

<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border: 2px solid #60a5fa; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<h3 style="color: #1e40af; margin: 0 0 1.5rem 0; text-align: center; font-size: 1.3em;">💰 通貨別投資配分の例</h3>
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">
<div style="text-align: center; background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<div style="background: #1e40af; color: white; width: 50px; height: 50px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-bottom: 0.5rem;">USD</div>
<p style="margin: 0; font-weight: 600; color: #1e40af;">50%</p>
<p style="margin: 0; font-size: 0.9em; color: #6b7280;">米国株・債券</p>
</div>
<div style="text-align: center; background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<div style="background: #059669; color: white; width: 50px; height: 50px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-bottom: 0.5rem;">EUR</div>
<p style="margin: 0; font-weight: 600; color: #059669;">20%</p>
<p style="margin: 0; font-size: 0.9em; color: #6b7280;">欧州株</p>
</div>
<div style="text-align: center; background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<div style="background: #d97706; color: white; width: 50px; height: 50px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-bottom: 0.5rem;">AUD</div>
<p style="margin: 0; font-weight: 600; color: #d97706;">20%</p>
<p style="margin: 0; font-size: 0.9em; color: #6b7280;">豪州・資源</p>
</div>
<div style="text-align: center; background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<div style="background: #7c3aed; color: white; width: 50px; height: 50px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-bottom: 0.5rem;">EM</div>
<p style="margin: 0; font-weight: 600; color: #7c3aed;">10%</p>
<p style="margin: 0; font-size: 0.9em; color: #6b7280;">新興国</p>
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-left: 4px solid #2563eb; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💱 為替投資の心得</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">「為替は投資の調味料」</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">メインは株式投資、為替はそれを美味しくする調味料。適度な分散が資産全体の味を良くします。</p>
</div>
        `
      },
      {
        id: 'section-5',
        title: '実践的なグローバル投資戦略',
        orderIndex: 5,
        type: 'text',
        content: `
<p>理論を実践に移すための具体的な投資戦略を学びます。<br/>初心者でも始められる段階的なアプローチを紹介します。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">グローバル投資の3段階アプローチ</h2>

<div style="display: grid; gap: 2rem; margin: 2rem 0;">
<div style="border: 3px solid #10b981; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 2rem; border-radius: 16px; position: relative;">
<div style="position: absolute; top: -15px; left: 20px; background: #10b981; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 1.1em;">STEP 1</div>
<h3 style="margin: 1rem 0 1rem 0; color: #065f46; font-size: 1.3em;">入門期（投資開始〜1年）</h3>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
<div>
<h4 style="color: #059669; margin: 0 0 0.5rem 0;">投資対象</h4>
<ul style="list-style: none; margin: 0; padding: 0;">
<li style="color: #374151; font-weight: 500; padding: 0.3rem 0;">• 全世界株式インデックス</li>
<li style="color: #374151; font-weight: 500; padding: 0.3rem 0;">• バランスファンド</li>
<li style="color: #374151; font-weight: 500; padding: 0.3rem 0;">• 先進国株式ETF</li>
</ul>
</div>
<div>
<h4 style="color: #059669; margin: 0 0 0.5rem 0;">投資金額</h4>
<ul style="list-style: none; margin: 0; padding: 0;">
<li style="color: #374151; font-weight: 500; padding: 0.3rem 0;">• 月1〜3万円の積立</li>
<li style="color: #374151; font-weight: 500; padding: 0.3rem 0;">• つみたてNISA活用</li>
<li style="color: #374151; font-weight: 500; padding: 0.3rem 0;">• ヘッジありで安全重視</li>
</ul>
</div>
</div>
</div>
<div style="border: 3px solid #f59e0b; background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); padding: 2rem; border-radius: 16px; position: relative;">
<div style="position: absolute; top: -15px; left: 20px; background: #f59e0b; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 1.1em;">STEP 2</div>
<h3 style="margin: 1rem 0 1rem 0; color: #92400e; font-size: 1.3em;">発展期（1年〜5年）</h3>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
<div>
<h4 style="color: #d97706; margin: 0 0 0.5rem 0;">投資対象</h4>
<ul style="list-style: none; margin: 0; padding: 0;">
<li style="color: #374151; font-weight: 500; padding: 0.3rem 0;">• 地域別ETF追加</li>
<li style="color: #374151; font-weight: 500; padding: 0.3rem 0;">• セクター別投資</li>
<li style="color: #374151; font-weight: 500; padding: 0.3rem 0;">• 新興国投資開始</li>
</ul>
</div>
<div>
<h4 style="color: #d97706; margin: 0 0 0.5rem 0;">投資金額</h4>
<ul style="list-style: none; margin: 0; padding: 0;">
<li style="color: #374151; font-weight: 500; padding: 0.3rem 0;">• 月3〜10万円の積立</li>
<li style="color: #374151; font-weight: 500; padding: 0.3rem 0;">• 一般NISA併用</li>
<li style="color: #374151; font-weight: 500; padding: 0.3rem 0;">• ヘッジなしも検討</li>
</ul>
</div>
</div>
</div>
<div style="border: 3px solid #8b5cf6; background: linear-gradient(135deg, #faf5ff 0%, #ede9fe 100%); padding: 2rem; border-radius: 16px; position: relative;">
<div style="position: absolute; top: -15px; left: 20px; background: #8b5cf6; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 1.1em;">STEP 3</div>
<h3 style="margin: 1rem 0 1rem 0; color: #6b21a8; font-size: 1.3em;">上級期（5年以降）</h3>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
<div>
<h4 style="color: #7c3aed; margin: 0 0 0.5rem 0;">投資対象</h4>
<ul style="list-style: none; margin: 0; padding: 0;">
<li style="color: #374151; font-weight: 500; padding: 0.3rem 0;">• 個別株投資</li>
<li style="color: #374151; font-weight: 500; padding: 0.3rem 0;">• REITやコモディティ</li>
<li style="color: #374151; font-weight: 500; padding: 0.3rem 0;">• オルタナティブ投資</li>
</ul>
</div>
<div>
<h4 style="color: #7c3aed; margin: 0 0 0.5rem 0;">投資金額</h4>
<ul style="list-style: none; margin: 0; padding: 0;">
<li style="color: #374151; font-weight: 500; padding: 0.3rem 0;">• 月10万円以上</li>
<li style="color: #374151; font-weight: 500; padding: 0.3rem 0;">• 特定口座活用</li>
<li style="color: #374151; font-weight: 500; padding: 0.3rem 0;">• 戦略的な配分調整</li>
</ul>
</div>
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">おすすめETF・投資信託一覧</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 4px 16px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;">
<thead>
<tr style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white;">
<th style="padding: 16px; border: none; text-align: center; width: 25%;">ファンド名</th>
<th style="padding: 16px; border: none; text-align: center; width: 20%;">投資対象</th>
<th style="padding: 16px; border: none; text-align: center; width: 15%;">信託報酬</th>
<th style="padding: 16px; border: none; text-align: center; width: 20%;">特徴</th>
<th style="padding: 16px; border: none; text-align: center; width: 20%;">推奨度</th>
</tr>
</thead>
<tbody>
<tr style="background: #f0f9ff;">
<td style="padding: 12px; border: none; text-align: center; font-weight: 600; color: #1e40af;">eMAXIS Slim<br/>全世界株式</td>
<td style="padding: 12px; border: none; text-align: center; color: #374151;">全世界</td>
<td style="padding: 12px; border: none; text-align: center; color: #059669; font-weight: bold;">0.1144%</td>
<td style="padding: 12px; border: none; text-align: center; color: #374151; font-size: 0.9em;">低コスト<br/>分散効果大</td>
<td style="padding: 12px; border: none; text-align: center;">
<div style="background: #10b981; color: white; padding: 6px 12px; border-radius: 20px; font-weight: bold; font-size: 0.9em;">★★★★★</div>
</td>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 12px; border: none; text-align: center; font-weight: 600; color: #1e40af;">楽天・VTI</td>
<td style="padding: 12px; border: none; text-align: center; color: #374151;">米国全体</td>
<td style="padding: 12px; border: none; text-align: center; color: #059669; font-weight: bold;">0.162%</td>
<td style="padding: 12px; border: none; text-align: center; color: #374151; font-size: 0.9em;">米国集中<br/>高リターン</td>
<td style="padding: 12px; border: none; text-align: center;">
<div style="background: #10b981; color: white; padding: 6px 12px; border-radius: 20px; font-weight: bold; font-size: 0.9em;">★★★★★</div>
</td>
</tr>
<tr style="background: #f0f9ff;">
<td style="padding: 12px; border: none; text-align: center; font-weight: 600; color: #1e40af;">eMAXIS Slim<br/>新興国株式</td>
<td style="padding: 12px; border: none; text-align: center; color: #374151;">新興国</td>
<td style="padding: 12px; border: none; text-align: center; color: #059669; font-weight: bold;">0.187%</td>
<td style="padding: 12px; border: none; text-align: center; color: #374151; font-size: 0.9em;">高成長期待<br/>ハイリスク</td>
<td style="padding: 12px; border: none; text-align: center;">
<div style="background: #f59e0b; color: white; padding: 6px 12px; border-radius: 20px; font-weight: bold; font-size: 0.9em;">★★★★☆</div>
</td>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 12px; border: none; text-align: center; font-weight: 600; color: #1e40af;">世界経済<br/>インデックス</td>
<td style="padding: 12px; border: none; text-align: center; color: #374151;">全世界</td>
<td style="padding: 12px; border: none; text-align: center; color: #d97706; font-weight: bold;">0.54%</td>
<td style="padding: 12px; border: none; text-align: center; color: #374151; font-size: 0.9em;">バランス型<br/>債券込み</td>
<td style="padding: 12px; border: none; text-align: center;">
<div style="background: #6b7280; color: white; padding: 6px 12px; border-radius: 20px; font-weight: bold; font-size: 0.9em;">★★★☆☆</div>
</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">投資資金別戦略</h2>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 2rem 0;">
<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 2px solid #a7f3d0; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #065f46; margin: 0 0 1rem 0; text-align: center; font-size: 1.2em;">💰 少額投資<br/>（月1〜3万円）</h3>
<ul style="list-style: none; margin: 0; padding: 0; color: #374151;">
<li style="padding: 0.4rem 0; border-bottom: 1px solid #a7f3d0; font-weight: 500;">• つみたてNISA優先</li>
<li style="padding: 0.4rem 0; border-bottom: 1px solid #a7f3d0; font-weight: 500;">• 全世界1本でスタート</li>
<li style="padding: 0.4rem 0; border-bottom: 1px solid #a7f3d0; font-weight: 500;">• 為替ヘッジありで安定</li>
<li style="padding: 0.4rem 0; font-weight: 500;">• 楽天・SBIで低コスト</li>
</ul>
</div>
<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #fbbf24; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #92400e; margin: 0 0 1rem 0; text-align: center; font-size: 1.2em;">💼 中額投資<br/>（月5〜15万円）</h3>
<ul style="list-style: none; margin: 0; padding: 0; color: #374151;">
<li style="padding: 0.4rem 0; border-bottom: 1px solid #fbbf24; font-weight: 500;">• NISA満額＋特定口座</li>
<li style="padding: 0.4rem 0; border-bottom: 1px solid #fbbf24; font-weight: 500;">• 3地域に分散投資</li>
<li style="padding: 0.4rem 0; border-bottom: 1px solid #fbbf24; font-weight: 500;">• ヘッジあり/なし併用</li>
<li style="padding: 0.4rem 0; font-weight: 500;">• 定期的なリバランス</li>
</ul>
</div>
<div style="background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%); border: 2px solid #a78bfa; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #6b21a8; margin: 0 0 1rem 0; text-align: center; font-size: 1.2em;">💎 大額投資<br/>（月20万円以上）</h3>
<ul style="list-style: none; margin: 0; padding: 0; color: #374151;">
<li style="padding: 0.4rem 0; border-bottom: 1px solid #a78bfa; font-weight: 500;">• 複数口座の活用</li>
<li style="padding: 0.4rem 0; border-bottom: 1px solid #a78bfa; font-weight: 500;">• 個別株も組み込み</li>
<li style="padding: 0.4rem 0; border-bottom: 1px solid #a78bfa; font-weight: 500;">• オルタナティブ投資</li>
<li style="padding: 0.4rem 0; font-weight: 500;">• 税効果も重視</li>
</ul>
</div>
</div>

<h2 style="color: #dc2626; margin: 2rem 0 1rem 0;">よくある失敗パターンと対策</h2>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
<div style="background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%); border: 2px solid #fca5a5; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0; text-align: center; font-size: 1.2em;">❌ 失敗パターン</h3>
<ul style="list-style: none; margin: 0; padding: 0; color: #374151;">
<li style="padding: 0.5rem 0; border-bottom: 1px solid #fca5a5; font-weight: 500;">• 高配当株に集中投資</li>
<li style="padding: 0.5rem 0; border-bottom: 1px solid #fca5a5; font-weight: 500;">• 話題の銘柄に飛びつく</li>
<li style="padding: 0.5rem 0; border-bottom: 1px solid #fca5a5; font-weight: 500;">• 短期売買を繰り返す</li>
<li style="padding: 0.5rem 0; font-weight: 500;">• 為替を予想して投資</li>
</ul>
</div>
<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 2px solid #a7f3d0; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #059669; margin: 0 0 1rem 0; text-align: center; font-size: 1.2em;">✅ 成功パターン</h3>
<ul style="list-style: none; margin: 0; padding: 0; color: #374151;">
<li style="padding: 0.5rem 0; border-bottom: 1px solid #a7f3d0; font-weight: 500;">• 長期・分散・積立の徹底</li>
<li style="padding: 0.5rem 0; border-bottom: 1px solid #a7f3d0; font-weight: 500;">• 低コストインデックス中心</li>
<li style="padding: 0.5rem 0; border-bottom: 1px solid #a7f3d0; font-weight: 500;">• 感情に左右されない投資</li>
<li style="padding: 0.5rem 0; font-weight: 500;">• 定期的な見直しと調整</li>
</ul>
</div>
</div>

<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-left: 4px solid #2563eb; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">🚀 グローバル投資成功の秘訣</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">「Think Global, Act Simple」（世界規模で考え、シンプルに行動）</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">複雑な戦略は不要。世界全体の成長に素直に投資するだけで、長期的な成功を掴めます。</p>
</div>
        `
      },
      {
        id: 'section-6',
        title: '未来のグローバル投資展望',
        orderIndex: 6,
        type: 'text',
        content: `
<p>世界経済は常に変化し続けています。<br/>未来のトレンドを理解し、長期的な視点で投資戦略を立てましょう。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">2030年に向けた世界経済の変化</h2>

<div style="display: grid; gap: 1.5rem; margin: 2rem 0;">
<div style="border-left: 4px solid #10b981; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 1.5rem; border-radius: 8px;">
<h3 style="margin: 0 0 0.5rem 0; color: #065f46;">🌱 環境・エネルギー革命</h3>
<p style="margin: 0; color: #374151; font-weight: 500;">• 再生エネルギーへの大規模転換<br/>• ESG投資の主流化<br/>• カーボンニュートラル関連産業の成長</p>
<div style="background: #dcfce7; padding: 0.8rem; border-radius: 6px; margin-top: 0.8rem;">
<p style="margin: 0; color: #065f46; font-weight: 600; font-size: 0.9em;">投資機会：クリーンエネルギー、EV、環境技術株</p>
</div>
</div>
<div style="border-left: 4px solid #3b82f6; background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); padding: 1.5rem; border-radius: 8px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af;">🤖 AI・デジタル革命</h3>
<p style="margin: 0; color: #374151; font-weight: 500;">• AI技術の産業への本格浸透<br/>• デジタル通貨の普及拡大<br/>• IoT・5G・メタバースの成熟</p>
<div style="background: #bfdbfe; padding: 0.8rem; border-radius: 6px; margin-top: 0.8rem;">
<p style="margin: 0; color: #1e40af; font-weight: 600; font-size: 0.9em;">投資機会：AI関連、半導体、デジタルインフラ株</p>
</div>
</div>
<div style="border-left: 4px solid #f59e0b; background: linear-gradient(135deg, #fffbeb 0%, #fed7aa 100%); padding: 1.5rem; border-radius: 8px;">
<h3 style="margin: 0 0 0.5rem 0; color: #d97706;">🏥 医療・ヘルスケア進化</h3>
<p style="margin: 0; color: #374151; font-weight: 500;">• 高齢化社会への対応加速<br/>• 遺伝子治療・個別化医療の普及<br/>• デジタルヘルスの拡大</p>
<div style="background: #fed7aa; padding: 0.8rem; border-radius: 6px; margin-top: 0.8rem;">
<p style="margin: 0; color: #d97706; font-weight: 600; font-size: 0.9em;">投資機会：バイオテック、医療機器、ヘルステック株</p>
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">地域別成長予測（2024-2030年）</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 4px 16px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;">
<thead>
<tr style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white;">
<th style="padding: 16px; border: none; text-align: center; width: 25%;">地域</th>
<th style="padding: 16px; border: none; text-align: center; width: 20%;">平均GDP成長率</th>
<th style="padding: 16px; border: none; text-align: center; width: 30%;">成長ドライバー</th>
<th style="padding: 16px; border: none; text-align: center; width: 25%;">投資魅力度</th>
</tr>
</thead>
<tbody>
<tr style="background: #f0f9ff;">
<td style="padding: 14px; border: none; text-align: center; font-weight: 600;">インド・東南アジア</td>
<td style="padding: 14px; border: none; text-align: center; color: #10b981; font-weight: bold; font-size: 1.2em;">6.5%</td>
<td style="padding: 14px; border: none; text-align: center; color: #374151; font-size: 0.9em;">人口増加、デジタル化、中間層拡大</td>
<td style="padding: 14px; border: none; text-align: center;">
<div style="background: #10b981; color: white; padding: 6px 12px; border-radius: 20px; font-weight: bold;">★★★★★</div>
</td>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 14px; border: none; text-align: center; font-weight: 600;">アフリカ</td>
<td style="padding: 14px; border: none; text-align: center; color: #10b981; font-weight: bold; font-size: 1.2em;">4.1%</td>
<td style="padding: 14px; border: none; text-align: center; color: #374151; font-size: 0.9em;">若年人口、資源開発、都市化</td>
<td style="padding: 14px; border: none; text-align: center;">
<div style="background: #f59e0b; color: white; padding: 6px 12px; border-radius: 20px; font-weight: bold;">★★★★☆</div>
</td>
</tr>
<tr style="background: #f0f9ff;">
<td style="padding: 14px; border: none; text-align: center; font-weight: 600;">中国</td>
<td style="padding: 14px; border: none; text-align: center; color: #f59e0b; font-weight: bold; font-size: 1.2em;">3.8%</td>
<td style="padding: 14px; border: none; text-align: center; color: #374151; font-size: 0.9em;">技術革新、内需拡大、産業高度化</td>
<td style="padding: 14px; border: none; text-align: center;">
<div style="background: #f59e0b; color: white; padding: 6px 12px; border-radius: 20px; font-weight: bold;">★★★☆☆</div>
</td>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 14px; border: none; text-align: center; font-weight: 600;">米国</td>
<td style="padding: 14px; border: none; text-align: center; color: #f59e0b; font-weight: bold; font-size: 1.2em;">2.3%</td>
<td style="padding: 14px; border: none; text-align: center; color: #374151; font-size: 0.9em;">AI革命、エネルギー自給、移民流入</td>
<td style="padding: 14px; border: none; text-align: center;">
<div style="background: #10b981; color: white; padding: 6px 12px; border-radius: 20px; font-weight: bold;">★★★★☆</div>
</td>
</tr>
<tr style="background: #f8f9fa;">
<td style="padding: 14px; border: none; text-align: center; font-weight: 600;">欧州・日本</td>
<td style="padding: 14px; border: none; text-align: center; color: #6b7280; font-weight: bold; font-size: 1.2em;">1.2%</td>
<td style="padding: 14px; border: none; text-align: center; color: #374151; font-size: 0.9em;">高齢化、低成長、生産性向上</td>
<td style="padding: 14px; border: none; text-align: center;">
<div style="background: #6b7280; color: white; padding: 6px 12px; border-radius: 20px; font-weight: bold;">★★★☆☆</div>
</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">次世代投資のテーマと戦略</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin: 2rem 0;">
<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 2px solid #a7f3d0; border-radius: 12px; padding: 2rem;">
<h3 style="color: #065f46; margin: 0 0 1rem 0; text-align: center; font-size: 1.3em;">🌟 成長テーマ投資</h3>
<div style="display: grid; gap: 1rem;">
<div style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
<h4 style="margin: 0 0 0.5rem 0; color: #065f46;">クリーンエネルギー</h4>
<p style="margin: 0; font-size: 0.9em; color: #6b7280;">太陽光、風力、水素エネルギー関連企業</p>
</div>
<div style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
<h4 style="margin: 0 0 0.5rem 0; color: #065f46;">AI・ロボティクス</h4>
<p style="margin: 0; font-size: 0.9em; color: #6b7280;">人工知能、自動化、機械学習技術</p>
</div>
<div style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
<h4 style="margin: 0 0 0.5rem 0; color: #065f46;">宇宙・海洋開発</h4>
<p style="margin: 0; font-size: 0.9em; color: #6b7280;">宇宙産業、深海資源、新フロンティア</p>
</div>
</div>
</div>
<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border: 2px solid #60a5fa; border-radius: 12px; padding: 2rem;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0; text-align: center; font-size: 1.3em;">🛡️ ディフェンシブ投資</h3>
<div style="display: grid; gap: 1rem;">
<div style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
<h4 style="margin: 0 0 0.5rem 0; color: #1e40af;">生活必需品</h4>
<p style="margin: 0; font-size: 0.9em; color: #6b7280;">食品、日用品、医薬品などの安定銘柄</p>
</div>
<div style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
<h4 style="margin: 0 0 0.5rem 0; color: #1e40af;">インフラ・公益</h4>
<p style="margin: 0; font-size: 0.9em; color: #6b7280;">電力、ガス、通信、交通などの基盤産業</p>
</div>
<div style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
<h4 style="margin: 0 0 0.5rem 0; color: #1e40af;">不動産・REIT</h4>
<p style="margin: 0; font-size: 0.9em; color: #6b7280;">世界各地の不動産投資信託</p>
</div>
</div>
</div>
</div>

<h2 style="color: #dc2626; margin: 2rem 0 1rem 0;">注意すべきリスク要因</h2>

<div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<h3 style="color: #dc2626; margin: 0 0 1.5rem 0; text-align: center; font-size: 1.3em;">⚠️ 2030年に向けたリスク</h3>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;">
<div>
<h4 style="color: #dc2626; margin: 0 0 0.5rem 0;">地政学的リスク</h4>
<ul style="list-style: none; margin: 0; padding: 0;">
<li style="color: #374151; font-weight: 500; padding: 0.3rem 0;">• 米中対立の長期化</li>
<li style="color: #374151; font-weight: 500; padding: 0.3rem 0;">• 台湾・中東情勢</li>
<li style="color: #374151; font-weight: 500; padding: 0.3rem 0;">• 新たな経済ブロック形成</li>
</ul>
</div>
<div>
<h4 style="color: #dc2626; margin: 0 0 0.5rem 0;">経済構造変化</h4>
<ul style="list-style: none; margin: 0; padding: 0;">
<li style="color: #374151; font-weight: 500; padding: 0.3rem 0;">• 高齢化・労働力不足</li>
<li style="color: #374151; font-weight: 500; padding: 0.3rem 0;">• AI失業・格差拡大</li>
<li style="color: #374151; font-weight: 500; padding: 0.3rem 0;">• 気候変動の経済影響</li>
</ul>
</div>
</div>
</div>

<h2 style="color: #059669; margin: 2rem 0 1rem 0;">長期投資家への提言</h2>

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 2px solid #a7f3d0; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<div style="text-align: center; margin-bottom: 2rem;">
<div style="background: #059669; color: white; width: 80px; height: 80px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; font-size: 2em;">🌍</div>
</div>
<h3 style="color: #065f46; margin: 0 0 1.5rem 0; text-align: center; font-size: 1.4em;">グローバル投資の5原則</h3>
<div style="display: grid; gap: 1rem;">
<div style="display: flex; align-items: center; background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<div style="background: #059669; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 1rem; flex-shrink: 0;">1</div>
<div>
<h4 style="margin: 0 0 0.2rem 0; color: #065f46;">世界全体の成長を信じる</h4>
<p style="margin: 0; color: #374151; font-size: 0.9em;">短期的な変動に惑わされず、人類の進歩と世界経済の成長を信じて投資</p>
</div>
</div>
<div style="display: flex; align-items: center; background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<div style="background: #059669; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 1rem; flex-shrink: 0;">2</div>
<div>
<h4 style="margin: 0 0 0.2rem 0; color: #065f46;">多様性こそが強さ</h4>
<p style="margin: 0; color: #374151; font-size: 0.9em;">地域・通貨・資産の分散により、一つの要因で全てを失わない堅固な基盤を構築</p>
</div>
</div>
<div style="display: flex; align-items: center; background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<div style="background: #059669; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 1rem; flex-shrink: 0;">3</div>
<div>
<h4 style="margin: 0 0 0.2rem 0; color: #065f46;">時間を味方につける</h4>
<p style="margin: 0; color: #374151; font-size: 0.9em;">長期投資の複利効果と時間の力を最大限に活用し、焦らず着実に資産を育成</p>
</div>
</div>
<div style="display: flex; align-items: center; background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<div style="background: #059669; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 1rem; flex-shrink: 0;">4</div>
<div>
<h4 style="margin: 0 0 0.2rem 0; color: #065f46;">学び続ける姿勢</h4>
<p style="margin: 0; color: #374151; font-size: 0.9em;">世界情勢・技術進歩・投資手法の変化に対応するため、継続的な学習を怠らない</p>
</div>
</div>
<div style="display: flex; align-items: center; background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<div style="background: #059669; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 1rem; flex-shrink: 0;">5</div>
<div>
<h4 style="margin: 0 0 0.2rem 0; color: #065f46;">冷静な判断力を保つ</h4>
<p style="margin: 0; color: #374151; font-size: 0.9em;">市場の熱狂や恐怖に流されず、データと論理に基づいた冷静な投資判断を維持</p>
</div>
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-left: 4px solid #2563eb; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">🔮 未来への投資メッセージ</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">「未来は今日の投資が創る」</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">グローバル投資は単なる資産形成ではなく、世界の発展に参加し、未来を支える行為です。あなたの投資が世界をより良い場所にします。</p>
</div>
        `
      }
    ],
    keyPoints: [
      '世界経済は先進国、新興国、資源国、国際金融市場の4つの力で動いている',
      '日本だけでなく世界に分散投資することで、リスクを抑えながら成長機会を拡大できる',
      '地政学リスクは一時的であり、冷静な対応と適切な分散投資で乗り越えられる',
      '為替変動は投資の「調味料」であり、ヘッジの有無を戦略的に選択する必要がある',
      '段階的なアプローチで投資レベルを上げ、最終的には世界全体の成長を取り込む',
      '未来のメガトレンド（AI、環境、医療）を理解し、長期的視点で投資機会を捉える'
    ],
    summary: 'グローバル投資は世界経済の成長を取り込む最も効果的な資産形成手法です。日本集中投資から世界分散投資への転換により、リスクを抑えながら収益機会を大幅に拡大できます。地政学リスクや為替変動を適切に管理し、段階的なアプローチで投資スキルを向上させることが成功の鍵となります。',
    practicalExamples: [
      '過去30年で日本株は+12%、世界分散投資は+598%の圧倒的な差',
      'つみたてNISAで月33,333円を20年積立すると約1,440万円に成長',
      '地政学的危機は一時的で、1年後にはほぼ全て回復している歴史的事実',
      '為替ヘッジありなしの選択により、リターンに20%以上の差が生じる場合',
      'eMAXIS Slim全世界株式なら信託報酬0.1144%で世界投資が可能'
    ],
    warningNotes: [
      'グローバル投資でも元本割れのリスクは存在します',
      '為替変動により円換算での資産価値が大きく変動する可能性があります',
      '地政学的リスクにより短期間で大きな損失を被る場合があります',
      '投資先の国の規制変更により投資継続が困難になる可能性があります',
      '税制改正により投資のメリットが変化する場合があります',
      'このレッスンは教育目的であり、特定の投資商品を推奨するものではありません'
    ]
  },
  
  quiz: [
    {
      id: 'financial-literacy-21-q1',
      question: '世界経済を動かす4つの力に含まれないものはどれですか？',
      options: [
        '先進国経済（米国・欧州・日本）',
        '新興国経済（中国・インド・東南アジア）',
        '暗号通貨市場（ビットコイン・イーサリアム）',
        '国際金融市場'
      ],
      correctAnswer: 2,
      explanation: '世界経済を動かす4つの力は、先進国経済、新興国経済、資源国経済、国際金融市場です。暗号通貨市場は新しい市場ですが、まだ世界経済全体を動かすほどの規模ではありません。'
    },
    {
      id: 'financial-literacy-21-q2', 
      question: '過去30年間で日本株投資と世界分散投資のリターン差はおよそどれくらいでしたか？',
      options: [
        '約100%の差',
        '約300%の差',
        '約586%の差',
        '約1000%の差'
      ],
      correctAnswer: 2,
      explanation: '過去30年間で日本株（日経平均）は+12%でしたが、世界分散投資（MSCI ACWI）は+598%となり、その差は約586%でした。これは国際分散投資の威力を示す代表例です。'
    },
    {
      id: 'financial-literacy-21-q3',
      question: '地政学的危機が発生した際の正しい投資行動はどれですか？',
      options: [
        'すぐに全ての投資を売却して現金化する',
        '冷静に状況を分析し、長期的視点を維持する',
        'より高いリターンを求めて投機的な投資を増やす',
        '投資を完全にやめて預金のみにする'
      ],
      correctAnswer: 1,
      explanation: '地政学的危機時には冷静な分析と長期的視点が重要です。歴史的に見ると、地政学的危機は一時的で、1年後にはほぼ全て回復しています。パニック売りではなく、むしろ積立投資を継続することが成功につながります。'
    },
    {
      id: 'financial-literacy-21-q4',
      question: '為替ヘッジありの投資商品の特徴として正しいものはどれですか？',
      options: [
        '円安時の恩恵を最大限に享受できる',
        '為替変動リスクを回避できるが、ヘッジコストが発生する',
        '為替変動により大きな利益を狙える',
        '必ず為替ヘッジなしよりも高いリターンが得られる'
      ],
      correctAnswer: 1,
      explanation: '為替ヘッジありの投資商品は為替変動リスクを回避できる反面、ヘッジコストが発生します。円安恩恵は受けられませんが、純粋な株価変動のみを取り込めるため、保守的な投資家に適しています。'
    },
    {
      id: 'financial-literacy-21-q5',
      question: 'グローバル投資初心者が最初に選ぶべき投資商品として最も適切なものはどれですか？',
      options: [
        '個別の外国株を複数選んで投資',
        '新興国債券ファンド',
        '全世界株式インデックスファンド',
        '為替ヘッジなしの米国株ETF'
      ],
      correctAnswer: 2,
      explanation: 'グローバル投資初心者には全世界株式インデックスファンドが最適です。1本で世界全体に分散投資でき、低コストで運用できます。個別株選択や新興国特化は上級者向けで、リスクが高すぎます。'
    }
  ],
  
  lastUpdated: '2025-08-15',
  factChecked: true
};