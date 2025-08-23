import type { Lesson } from '@/types';

export const lesson9: Lesson = {
  id: 'risk-management-investment-lifecycle',
  categoryId: 'risk-management',
  title: '投資ライフサイクルとリスク管理：ライフステージ別投資戦略',
  slug: 'investment-lifecycle-risk-management',
  description: '人生の各段階に応じた最適なリスク管理戦略と投資アプローチを学び、長期的な資産形成を実現する方法を習得します',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 35,
  orderIndex: 9,
  content: {
    sections: [
      {
        id: 'section-1',
        title: '投資ライフサイクルの基本理論',
        orderIndex: 1,
        type: 'text',
        content: `
<p>投資ライフサイクルとは、<strong>人生の各段階に応じて投資戦略とリスク管理を調整するアプローチ</strong>です。年齢、収入、家族構成、人生目標の変化に合わせて最適な投資配分を決定します。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ライフサイクル投資理論の核心原則</h2>

<div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
<div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 1.5rem; border-radius: 4px;">
<h3 style="color: #0c4a6e; margin: 0 0 1rem 0;">📈 時間価値の活用</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>若いほど長期投資期間を活用できる</li>
<li>複利効果の最大化が可能</li>
<li>短期的な市場変動を乗り越える時間的余裕</li>
<li>リスク資産への配分を高めることが可能</li>
</ul>
</div>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1.5rem; border-radius: 4px;">
<h3 style="color: #d97706; margin: 0 0 1rem 0;">💰 人的資本の考慮</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>将来の労働収入も資産の一部として考慮</li>
<li>若年層は人的資本が豊富</li>
<li>年齢とともに人的資本は金融資産に転換</li>
<li>職業の安定性も投資戦略に影響</li>
</ul>
</div>

<div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 1.5rem; border-radius: 4px;">
<h3 style="color: #059669; margin: 0 0 1rem 0;">🎯 目標の変化</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>若年期：資産形成・成長重視</li>
<li>中年期：教育費・住宅購入などの中期目標</li>
<li>高年期：退職準備・資産保全</li>
<li>各段階で適切なリスク・リターンバランス</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">従来の年齢ベース配分ルール</h2>

<div style="background: #f8fafc; border: 2px solid #94a3b8; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0;">📊 「100 - 年齢」ルール</h3>
<p style="font-weight: 600; margin: 0 0 1rem 0; color: #374151;">株式投資比率 = 100 - 現在の年齢</p>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 10px; border: 1px solid #ddd; text-align: center;">年齢</th>
<th style="padding: 10px; border: 1px solid #ddd; text-align: center;">株式比率（従来ルール）</th>
<th style="padding: 10px; border: 1px solid #ddd; text-align: center;">債券比率</th>
<th style="padding: 10px; border: 1px solid #ddd; text-align: center;">特徴</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 10px; border: 1px solid #ddd; text-align: center;">25歳</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: 600;">75%</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center;">25%</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center;">積極的成長重視</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center;">40歳</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; color: #f59e0b; font-weight: 600;">60%</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center;">40%</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center;">バランス型</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 10px; border: 1px solid #ddd; text-align: center;">55歳</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; color: #f59e0b; font-weight: 600;">45%</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center;">55%</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center;">安定性重視</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center;">70歳</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; color: #dc2626; font-weight: 600;">30%</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center;">70%</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center;">保守的運用</td>
</tr>
</tbody>
</table>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">現代版ライフサイクル投資の進化</h2>

<div style="background: #f0f9ff; border: 2px solid #0ea5e9; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #0c4a6e; margin: 0 0 1rem 0;">🔄 修正された「120 - 年齢」ルール</h3>

<p style="margin: 0 0 1rem 0; color: #374151;">長寿化・低金利環境を考慮した現代版</p>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0;">
<div>
<h4 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">従来ルールとの比較</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.6;">
<li>40歳：60% → <strong style="color: #059669;">80%</strong></li>
<li>50歳：50% → <strong style="color: #059669;">70%</strong></li>
<li>60歳：40% → <strong style="color: #059669;">60%</strong></li>
</ul>
</div>
<div>
<h4 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">修正理由</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.6;">
<li>平均寿命の延長（85歳超）</li>
<li>低金利での債券魅力低下</li>
<li>インフレリスクへの対応</li>
</ul>
</div>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">年齢だけでなく個人の状況も考慮</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">年齢ベースのルールは出発点。個人の収入安定性、家族構成、リスク許容度も重要な要素です。</p>
</div>
        `
      },
      {
        id: 'section-2',
        title: 'ライフステージ別投資戦略',
        orderIndex: 2,
        type: 'text',
        content: `
<p>人生の各段階では、<strong>収入パターン、支出の必要性、リスク許容度</strong>が大きく異なります。それぞれのステージに最適化された投資戦略を理解しましょう。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">5つの主要ライフステージ</h2>

<div style="display: grid; gap: 2rem; margin: 2rem 0;">

<div style="background: #e0f2fe; border: 3px solid #0284c7; border-radius: 12px; padding: 2rem;">
<h3 style="color: #0c4a6e; margin: 0 0 1.5rem 0; text-align: center; font-size: 1.3em;">🌱 若年期 (20-30代前半)</h3>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
<div>
<h4 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">特徴・状況</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>収入は低いが上昇期待</li>
<li>支出は比較的少ない</li>
<li>時間的余裕が最大</li>
<li>人的資本が豊富</li>
</ul>
</div>
<div>
<h4 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">投資戦略</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>株式：80-90%</li>
<li>債券：5-10%</li>
<li>現金：5-10%</li>
<li>暗号通貨：5-15%（リスク許容度次第）</li>
</ul>
</div>
</div>

<div style="background: #f0f9ff; border: 1px solid #0ea5e9; padding: 1rem; border-radius: 6px;">
<h4 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">重点ポイント</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.6;">
<li>積立投資の習慣化</li>
<li>投資知識の学習</li>
<li>緊急資金の確保（生活費3-6ヶ月分）</li>
<li>新しい投資商品への挑戦</li>
</ul>
</div>
</div>

<div style="background: #fef3c7; border: 3px solid #f59e0b; border-radius: 12px; padding: 2rem;">
<h3 style="color: #d97706; margin: 0 0 1.5rem 0; text-align: center; font-size: 1.3em;">🏃 成長期 (30-40代)</h3>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
<div>
<h4 style="color: #d97706; margin: 0 0 0.5rem 0;">特徴・状況</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>収入のピーク開始</li>
<li>結婚・出産で支出増加</li>
<li>住宅購入の検討時期</li>
<li>教育費の準備開始</li>
</ul>
</div>
<div>
<h4 style="color: #d97706; margin: 0 0 0.5rem 0;">投資戦略</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>株式：70-80%</li>
<li>債券：15-20%</li>
<li>現金：5-10%</li>
<li>暗号通貨：5-10%</li>
</ul>
</div>
</div>

<div style="background: #fef7e0; border: 1px solid #f59e0b; padding: 1rem; border-radius: 6px;">
<h4 style="color: #d97706; margin: 0 0 0.5rem 0;">重点ポイント</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.6;">
<li>目的別の投資口座分離（教育費・住宅・退職）</li>
<li>生命保険・医療保険の充実</li>
<li>税制優遇制度の活用（NISA、iDeCo）</li>
<li>中期的な目標設定と計画</li>
</ul>
</div>
</div>

<div style="background: #f0fdf4; border: 3px solid #22c55e; border-radius: 12px; padding: 2rem;">
<h3 style="color: #059669; margin: 0 0 1.5rem 0; text-align: center; font-size: 1.3em;">🎯 安定期 (40-50代)</h3>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
<div>
<h4 style="color: #059669; margin: 0 0 0.5rem 0;">特徴・状況</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>収入がピークに達する</li>
<li>教育費の支払い時期</li>
<li>住宅ローンの返済途中</li>
<li>退職準備への意識</li>
</ul>
</div>
<div>
<h4 style="color: #059669; margin: 0 0 0.5rem 0;">投資戦略</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>株式：60-70%</li>
<li>債券：25-30%</li>
<li>現金：5-10%</li>
<li>暗号通貨：3-7%</li>
</ul>
</div>
</div>

<div style="background: #e8f5e8; border: 1px solid #22c55e; padding: 1rem; border-radius: 6px;">
<h4 style="color: #059669; margin: 0 0 0.5rem 0;">重点ポイント</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.6;">
<li>退職後の生活費試算</li>
<li>投資ポートフォリオの見直し</li>
<li>資産保全の意識向上</li>
<li>リスク管理の強化</li>
</ul>
</div>
</div>

<div style="background: #fef2f2; border: 3px solid #dc2626; border-radius: 12px; padding: 2rem;">
<h3 style="color: #dc2626; margin: 0 0 1.5rem 0; text-align: center; font-size: 1.3em;">🛡️ 移行期 (50-65歳)</h3>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
<div>
<h4 style="color: #dc2626; margin: 0 0 0.5rem 0;">特徴・状況</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>教育費負担の軽減</li>
<li>退職が現実的な視野</li>
<li>健康リスクの増加</li>
<li>相続対策の検討</li>
</ul>
</div>
<div>
<h4 style="color: #dc2626; margin: 0 0 0.5rem 0;">投資戦略</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>株式：40-60%</li>
<li>債券：35-50%</li>
<li>現金：5-15%</li>
<li>暗号通貨：2-5%</li>
</ul>
</div>
</div>

<div style="background: #fee2e2; border: 1px solid #dc2626; padding: 1rem; border-radius: 6px;">
<h4 style="color: #dc2626; margin: 0 0 0.5rem 0;">重点ポイント</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.6;">
<li>リスク資産の段階的縮小</li>
<li>安定収入源の確保</li>
<li>医療費・介護費の準備</li>
<li>税務・相続の専門家相談</li>
</ul>
</div>
</div>

<div style="background: #f8fafc; border: 3px solid #64748b; border-radius: 12px; padding: 2rem;">
<h3 style="color: #64748b; margin: 0 0 1.5rem 0; text-align: center; font-size: 1.3em;">🌙 退職期 (65歳以降)</h3>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
<div>
<h4 style="color: #64748b; margin: 0 0 0.5rem 0;">特徴・状況</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>労働収入の停止・減少</li>
<li>資産取り崩しフェーズ</li>
<li>医療・介護費の増加</li>
<li>余命を考慮した運用</li>
</ul>
</div>
<div>
<h4 style="color: #64748b; margin: 0 0 0.5rem 0;">投資戦略</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>株式：20-40%</li>
<li>債券：50-70%</li>
<li>現金：10-20%</li>
<li>暗号通貨：0-3%</li>
</ul>
</div>
</div>

<div style="background: #f1f5f9; border: 1px solid #64748b; padding: 1rem; border-radius: 6px;">
<h4 style="color: #64748b; margin: 0 0 0.5rem 0;">重点ポイント</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.6;">
<li>安全性重視の運用</li>
<li>定期的な取り崩しルール</li>
<li>インフレリスクへの一定の備え</li>
<li>相続対策の実行</li>
</ul>
</div>
</div>

</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">段階的な調整が重要</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">ライフステージの変化は徐々に起こります。急激な配分変更ではなく、段階的な調整を心がけましょう。</p>
</div>
        `
      },
      {
        id: 'section-3',
        title: '現代の課題と対策',
        orderIndex: 3,
        type: 'text',
        content: `
<p>従来のライフサイクル投資理論は、<strong>現代の特殊な環境や新しい課題</strong>に対応する必要があります。長寿化、低金利、暗号通貨の台頭などを考慮した戦略を学びましょう。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">現代の投資環境の変化</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 1rem; border-radius: 4px;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0; display: flex; align-items: center;">📈 長寿社会の影響</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>平均寿命：男性81歳、女性87歳（2024年）</li>
<li>退職後生活期間の長期化（20-30年）</li>
<li>より長期的な資産運用が必要</li>
<li>医療・介護費用の増大</li>
</ul>
</div>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem; border-radius: 4px;">
<h3 style="color: #d97706; margin: 0 0 0.5rem 0; display: flex; align-items: center;">💰 低金利環境の長期化</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>日本の10年国債利回り：1%前後</li>
<li>従来の債券投資の魅力低下</li>
<li>リスク資産への配分増加の必要性</li>
<li>インフレリスクへの対応</li>
</ul>
</div>

<div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 1rem; border-radius: 4px;">
<h3 style="color: #059669; margin: 0 0 0.5rem 0; display: flex; align-items: center;">🔄 働き方の多様化</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>フリーランス・副業の増加</li>
<li>収入の不安定化・多様化</li>
<li>従来の退職概念の変化</li>
<li>段階的リタイアメントの増加</li>
</ul>
</div>

<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0; display: flex; align-items: center;">🪙 新しい資産クラス</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>暗号通貨の投資対象化</li>
<li>高いボラティリティと成長可能性</li>
<li>従来理論への統合の課題</li>
<li>規制・税制の不確実性</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">修正されたライフサイクル戦略</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">年代</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">従来の株式比率</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">修正版株式比率</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">暗号通貨比率</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">主な変更理由</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">20-30代</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">75%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: 600;">85%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #7c3aed;">10-15%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">時間的余裕の活用</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">30-40代</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">60%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: 600;">75%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #7c3aed;">5-10%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">低金利対応</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">40-50代</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">50%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b; font-weight: 600;">65%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #7c3aed;">3-7%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">長寿化対応</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">50-65歳</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">40%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b; font-weight: 600;">50%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #7c3aed;">2-5%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">退職準備期間延長</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">65歳以降</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">30%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626; font-weight: 600;">35%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #7c3aed;">0-3%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">長期退職期間対応</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">暗号通貨をライフサイクルに組み込む考え方</h2>

<div style="background: #fef7ff; border: 2px solid #c084fc; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #7c3aed; margin: 0 0 1rem 0;">🪙 年代別暗号通貨投資アプローチ</h3>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0;">
<div>
<h4 style="color: #7c3aed; margin: 0 0 0.5rem 0;">若年層（20-30代）のアプローチ</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>比較的高い配分（10-15%）も検討可</li>
<li>学習投資としての価値</li>
<li>長期的な成長可能性への投資</li>
<li>定期積立によるボラティリティ分散</li>
</ul>
</div>
<div>
<h4 style="color: #7c3aed; margin: 0 0 0.5rem 0;">中高年層（40代以降）のアプローチ</h4>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>限定的な配分（2-7%）に抑制</li>
<li>主要通貨（BTC/ETH）中心</li>
<li>他の資産との相関性を考慮</li>
<li>定期的な利益確定も検討</li>
</ul>
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">個人の状況に応じた調整要因</h2>

<div style="background: #f8fafc; border: 2px solid #94a3b8; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0;">📊 標準配分からの調整ファクター</h3>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 10px; border: 1px solid #ddd; text-align: left;">調整要因</th>
<th style="padding: 10px; border: 1px solid #ddd; text-align: center;">リスク資産比率への影響</th>
<th style="padding: 10px; border: 1px solid #ddd; text-align: left;">具体的な調整</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 10px; border: 1px solid #ddd;">収入の安定性高</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; color: #059669;">+5-10%</td>
<td style="padding: 10px; border: 1px solid #ddd;">公務員、大企業正社員</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #ddd;">収入の不安定性高</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; color: #dc2626;">-5-10%</td>
<td style="padding: 10px; border: 1px solid #ddd;">フリーランス、自営業</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 10px; border: 1px solid #ddd;">扶養家族多</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; color: #dc2626;">-5-15%</td>
<td style="padding: 10px; border: 1px solid #ddd;">子ども複数、高齢親の介護</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #ddd;">健康状態良好</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; color: #059669;">+3-5%</td>
<td style="padding: 10px; border: 1px solid #ddd;">長寿の家系、健康的生活</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 10px; border: 1px solid #ddd;">投資経験豊富</td>
<td style="padding: 10px; border: 1px solid #ddd; text-align: center; color: #059669;">+5-10%</td>
<td style="padding: 10px; border: 1px solid #ddd;">市場下落を経験済み</td>
</tr>
</tbody>
</table>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">定期的な見直しと柔軟な調整</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">ライフステージの変化は予測困難です。年1回の見直しと状況変化時の柔軟な対応が重要です。</p>
</div>
        `
      },
      {
        id: 'section-4',
        title: '実践的なライフサイクル投資の管理',
        orderIndex: 4,
        type: 'text',
        content: `
<p>理論を実際の投資に活かすために、<strong>具体的な管理方法と実践のポイント</strong>を学びましょう。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ライフサイクル投資の実践ステップ</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem; border-radius: 4px;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0; display: flex; align-items: center;">📊 STEP 1: 現状分析</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>年齢・ライフステージの確認</li>
<li>収入・支出・資産の棚卸し</li>
<li>将来の人生設計・目標設定</li>
<li>リスク許容度の測定</li>
</ul>
</div>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem; border-radius: 4px;">
<h3 style="color: #d97706; margin: 0 0 0.5rem 0; display: flex; align-items: center;">📊 STEP 2: 目標配分決定</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>基本配分の算出（年齢ベースルール）</li>
<li>個人要因による調整</li>
<li>暗号通貨配分の検討</li>
<li>リバランス頻度の設定</li>
</ul>
</div>

<div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 1rem; border-radius: 4px;">
<h3 style="color: #059669; margin: 0 0 0.5rem 0; display: flex; align-items: center;">📊 STEP 3: 投資実行</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>投資口座の開設・整理</li>
<li>目標配分に基づく投資実行</li>
<li>自動積立の設定</li>
<li>税制優遇制度の活用</li>
</ul>
</div>

<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0; display: flex; align-items: center;">📊 STEP 4: 継続管理</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>定期的なポートフォリオ確認</li>
<li>ライフイベントに応じた調整</li>
<li>リバランスの実行</li>
<li>年次見直しの実施</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">実例：35歳会社員のポートフォリオ設計</h2>

<div style="background: #f8fafc; border: 2px solid #94a3b8; border-radius: 8px; padding: 2rem; margin: 1rem 0;">
<h3 style="color: #1e40af; margin: 0 0 1.5rem 0; text-align: center;">💼 ケーススタディ</h3>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;">
<div>
<h4 style="color: #374151; margin: 0 0 1rem 0;">プロフィール</h4>
<ul style="list-style: none; margin: 0; padding: 0; background: #f8fafc; border-radius: 4px; padding: 1rem;">
<li style="padding: 0.3rem 0; border-bottom: 1px solid #e5e7eb;"><strong>年齢：</strong> 35歳</li>
<li style="padding: 0.3rem 0; border-bottom: 1px solid #e5e7eb;"><strong>家族：</strong> 配偶者、子1人（5歳）</li>
<li style="padding: 0.3rem 0; border-bottom: 1px solid #e5e7eb;"><strong>年収：</strong> 600万円（安定）</li>
<li style="padding: 0.3rem 0; border-bottom: 1px solid #e5e7eb;"><strong>資産：</strong> 400万円</li>
<li style="padding: 0.3rem 0;"><strong>目標：</strong> 教育費・退職準備</li>
</ul>
</div>

<div>
<h4 style="color: #374151; margin: 0 0 1rem 0;">投資戦略</h4>
<div style="margin-bottom: 1rem;">
<h5 style="color: #374151; margin: 0 0 0.5rem 0;">基本配分（120-35=85%）</h5>
<ul style="list-style: none; margin: 0; padding: 0;">
<li style="padding: 0.3rem; background: #e0f2fe; margin: 0.2rem 0; border-radius: 4px; border-left: 4px solid #0284c7;"><strong>株式：80%</strong></li>
<li style="padding: 0.3rem; background: #fef3c7; margin: 0.2rem 0; border-radius: 4px; border-left: 4px solid #f59e0b;"><strong>債券：15%</strong></li>
<li style="padding: 0.3rem; background: #fef7ff; margin: 0.2rem 0; border-radius: 4px; border-left: 4px solid #c084fc;"><strong>現金：5%</strong></li>
</ul>
</div>
<div>
<h5 style="color: #374151; margin: 0 0 0.5rem 0;">修正配分</h5>
<ul style="list-style: none; margin: 0; padding: 0;">
<li style="padding: 0.3rem; background: #e0f2fe; margin: 0.2rem 0; border-radius: 4px; border-left: 4px solid #0284c7;"><strong>株式：70%</strong> (子育て考慮-10%)</li>
<li style="padding: 0.3rem; background: #fef3c7; margin: 0.2rem 0; border-radius: 4px; border-left: 4px solid #f59e0b;"><strong>債券：20%</strong></li>
<li style="padding: 0.3rem; background: #f0fdf4; margin: 0.2rem 0; border-radius: 4px; border-left: 4px solid #22c55e;"><strong>現金：5%</strong></li>
<li style="padding: 0.3rem; background: #fef7ff; margin: 0.2rem 0; border-radius: 4px; border-left: 4px solid #c084fc;"><strong>暗号通貨：5%</strong></li>
</ul>
</div>
</div>
</div>

<div style="background: #dbeafe; border: 1px solid #3b82f6; padding: 1rem; border-radius: 6px; margin-top: 1.5rem;">
<h4 style="color: #1e40af; margin: 0 0 0.5rem 0;">具体的配分と商品選択</h4>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
<div>
<h5 style="color: #1e40af; margin: 0 0 0.5rem 0;">株式（280万円）</h5>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li>全世界株式インデックス：40%（160万円）</li>
<li>国内株式インデックス：20%（80万円）</li>
<li>新興国株式：10%（40万円）</li>
</ul>
</div>
<div>
<h5 style="color: #1e40af; margin: 0 0 0.5rem 0;">その他資産（120万円）</h5>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
<li>国内債券ETF：80万円</li>
<li>普通預金：20万円</li>
<li>BTC/ETH：20万円</li>
</ul>
</div>
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">リバランシング戦略</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">リバランス手法</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">頻度</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">トリガー</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">メリット・デメリット</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">時間ベース</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">年1-2回</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">定期実行</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">○機械的・△タイミング無視</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">乖離ベース</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">不定期</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">目標から±5%乖離</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">○効率的・△判断必要</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">ハイブリッド</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">四半期チェック</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">時間+乖離の組合せ</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">○バランス・△複雑</td>
</tr>
</tbody>
</table>

<h2 style="color: #dc2626; margin: 2rem 0 1rem 0;">⚠️ 注意すべき落とし穴</h2>

<div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong style="color: #dc2626;">機械的すぎる適用</strong>：個人の状況を無視した画一的な配分</li>
<li><strong style="color: #dc2626;">頻繁な変更</strong>：市場変動に反応した過度な配分変更</li>
<li><strong style="color: #dc2626;">税務への配慮不足</strong>：売却による譲渡所得税の影響を無視</li>
<li><strong style="color: #dc2626;">コスト無視</strong>：リバランスに伴う取引コストの軽視</li>
<li><strong style="color: #dc2626;">暗号通貨の過大評価</strong>：新しい資産クラスへの過度な期待</li>
</ul>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">継続性が最も重要</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">完璧な戦略より、継続できる戦略を選ぶことが成功への道です。定期的な見直しと柔軟な調整で長期的な成果を目指しましょう。</p>
</div>
        `
      }
    ],
    keyPoints: [
      '投資ライフサイクル理論は年齢と人生段階に応じてリスクとリターンのバランスを調整する',
      '現代では「120-年齢」ルールが長寿化と低金利環境に対応した修正版として推奨される',
      '若年期は積極的な成長投資、中年期はバランス型、高年期は保守的運用が基本',
      '暗号通貨は年齢が若いほど配分を高めに、高年齢では慎重な配分を心がける',
      '個人の収入安定性、家族構成、健康状態により標準配分からの調整が必要',
      '定期的なリバランスと年次見直しで戦略を維持・調整することが重要',
      '機械的適用ではなく個人の状況に応じた柔軟な運用が成功の鍵'
    ],
    summary: '投資ライフサイクル戦略は、人生の各段階に最適化されたリスク管理アプローチです。年齢に応じた基本配分に個人の状況を加味して調整し、定期的な見直しとリバランスを行うことで、長期的な資産形成を実現できます。現代の環境変化を踏まえた戦略修正も重要です。',
    practicalExamples: [
      '35歳会社員：基本配分株式80%から家族責任を考慮して70%に調整、暗号通貨5%配分',
      '25歳独身：株式85%、暗号通貨15%の積極配分で長期成長を重視',
      '55歳管理職：退職準備期として株式50%、債券40%、現金10%の安定重視',
      '年次リバランス：目標配分から5%以上乖離した際に売買調整を実行',
      '収入安定な公務員：標準配分より株式比率を10%増加、リスクテイク能力活用'
    ],
    warningNotes: [
      '年齢ベースルールは目安であり、個人の状況により大幅な調整が必要な場合があります',
      '市場環境の短期的変動に過度に反応した配分変更は避けるべきです',
      'リバランス時の税務影響（譲渡所得税）を事前に検討することが重要です',
      '暗号通貨の配分は実験的であり、規制や技術的リスクを十分に考慮してください',
      'このレッスンは教育目的であり、個別の投資助言ではありません'
    ]
  },
  
  quiz: [
    {
      id: 'risk-management-9-q1',
      question: '現代版の修正されたライフサイクル配分ルールはどれですか？',
      options: [
        '100 - 年齢 = 株式比率',
        '110 - 年齢 = 株式比率',
        '120 - 年齢 = 株式比率',
        '90 - 年齢 = 株式比率'
      ],
      correctAnswer: 2,
      explanation: '現代では長寿化と低金利環境を考慮して「120-年齢」ルールが推奨されています。これにより従来より株式比率を高めに設定し、長期的なインフレリスクに対応します。'
    },
    {
      id: 'risk-management-9-q2',
      question: '40代投資家のライフステージ特有のリスク要因として最も適切なものは？',
      options: [
        '収入が低く投資余力がない',
        '教育費負担と住宅ローン返済の重複',
        '退職後の生活費不足',
        '相続税対策の必要性'
      ],
      correctAnswer: 1,
      explanation: '40代は教育費の支払い時期と住宅ローンの返済が重複する時期であり、これらの支出負担を考慮したリスク管理が必要です。収入はピークを迎える一方で、大きな支出責任も抱える特徴的な時期です。'
    },
    {
      id: 'risk-management-9-q3',
      question: '暗号通貨のライフサイクル投資での位置づけとして最も適切なものは？',
      options: [
        'すべての年代で一律10%配分',
        '年齢が若いほど配分を高く、高齢になるほど配分を低く',
        '年齢に関係なく配分しない',
        '退職期にのみ配分する'
      ],
      correctAnswer: 1,
      explanation: '暗号通貨は高ボラティリティ資産のため、時間的余裕のある若年層で配分を高め（10-15%）、リスク許容度の低下する高年齢層では配分を抑制（0-3%）することが適切です。'
    },
    {
      id: 'risk-management-9-q4',
      question: 'リバランシング戦略として最も実践的なアプローチは？',
      options: [
        '毎月必ず実行する時間ベース',
        '目標配分から1%乖離で即座に調整',
        '年1回の定期チェック+5%乖離時の随時調整',
        'リバランスは一切行わない'
      ],
      correctAnswer: 2,
      explanation: '実践的なリバランス戦略は、年1回の定期チェックに加えて目標配分から5%程度乖離した場合の随時調整を組み合わせたハイブリッド方式です。これにより効率性と管理の容易さを両立できます。'
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
      id: 'risk-management-9-q1',
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