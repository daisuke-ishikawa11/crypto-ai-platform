import type { Lesson } from '@/types';

export const lesson23: Lesson = {
  id: 'risk-management-crisis-business-continuity',
  categoryId: 'risk-management',
  title: '危機管理と事業継続計画（BCP）',
  slug: 'crisis-business-continuity',
  description: '金融危機や災害に備える危機管理体制の構築と、事業継続計画（BCP）による投資業務の継続性確保手法を学習します',
  difficultyLevel: 'advanced',
  estimatedMinutes: 25,
  orderIndex: 23,
  
  content: {
    sections: [
      {
        id: 'section-1',
        title: '危機管理の基本フレームワーク',
        orderIndex: 1,
        type: 'text',
        content: `
<p>危機管理とは、予期しない重大な事象が発生した際に、組織の損害を最小化し、迅速な復旧を図るための包括的な管理プロセスです。<br/>投資業界では、市場危機・オペレーショナル危機・レピュテーション危機など多様なリスクに対応する必要があります。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">危機管理の4段階</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">段階</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">目的</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">主要活動</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">予防・軽減</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">危機の発生確率・影響度の削減</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">リスク評価・予防策・早期警戒</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">準備</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">危機対応能力の向上</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">計画策定・訓練・リソース確保</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">対応</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">緊急時の迅速な対処</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">意思決定・実行・コミュニケーション</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">復旧・学習</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">正常状態への回復・改善</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">復旧・検証・改善・知識蓄積</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">危機対策本部の設置と運営</h2>

<div style="background: #dc2626; color: white; padding: 1.5rem; border-radius: 12px; margin: 1.5rem 0;">
<h3 style="margin: 0 0 1rem 0; text-align: center;">🚨 Crisis Management Structure</h3>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-top: 1rem;">
<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px;">
<h4 style="margin: 0 0 0.5rem 0;">統括機能</h4>
<ul style="margin: 0; padding-left: 1rem; font-size: 0.9rem;">
<li>最高責任者（CEO・CRO）</li>
<li>意思決定権限の集約</li>
<li>全体指揮・統制</li>
<li>外部対応・報告</li>
</ul>
</div>
<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px;">
<h4 style="margin: 0 0 0.5rem 0;">実行機能</h4>
<ul style="margin: 0; padding-left: 1rem; font-size: 0.9rem;">
<li>情報収集・分析チーム</li>
<li>対策実行チーム</li>
<li>広報・コミュニケーションチーム</li>
<li>復旧・継続チーム</li>
</ul>
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">危機レベル分類と対応体制</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #dc2626; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">レベル</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">影響度</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">対応体制</th>
</tr>
</thead>
<tbody>
<tr style="background: #fee2e2;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">レベル1（軽微）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">部分的影響・短期間</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">部署レベル対応</td>
</tr>
<tr style="background: #fecaca;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">レベル2（中程度）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">複数部署・中期間</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">経営陣関与</td>
</tr>
<tr style="background: #fca5a5;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">レベル3（重大）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">全社的影響・長期間</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">危機対策本部設置</td>
</tr>
<tr style="background: #f87171;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">レベル4（致命的）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">事業存続の危機</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">全社総動員体制</td>
</tr>
</tbody>
</table>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">平時の準備が危機時の成果を決定</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">危機管理は危機が発生してから始まるものではなく、平時の準備が最も重要です。</p>
</div>
        `
      },
      {
        id: 'section-2',
        title: '投資業界特有の危機シナリオ',
        orderIndex: 2,
        type: 'text',
        content: `
<p>投資業界では、市場要因・オペレーショナル要因・外部環境要因など、多様な危機シナリオに備える必要があります。<br/>各シナリオの特徴を理解し、適切な対応策を準備することが重要です。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">主要な危機シナリオ</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">1. 市場危機</h3>
<p style="margin: 0; color: #374151;"><strong>内容：</strong>急激な市場変動・流動性危機・システミックリスク</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>影響：</strong>大規模損失・資金調達困難・顧客資産の毀損</p>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">2. オペレーショナル危機</h3>
<p style="margin: 0; color: #374151;"><strong>内容：</strong>システム障害・サイバー攻撃・人的ミス・内部不正</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>影響：</strong>業務停止・データ漏洩・取引エラー・顧客信頼失墜</p>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">3. 規制・法的危機</h3>
<p style="margin: 0; color: #374151;"><strong>内容：</strong>規制違反・法的紛争・制裁措置・ライセンス停止</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>影響：</strong>営業停止・罰金・レピュテーション毀損</p>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">4. 外部環境危機</h3>
<p style="margin: 0; color: #374151;"><strong>内容：</strong>自然災害・パンデミック・テロ・地政学リスク</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>影響：</strong>オフィス機能停止・人員不足・サプライチェーン断絶</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">危機発生時の初動対応</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #dc2626; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">時間軸</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">主要アクション</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">責任者</th>
</tr>
</thead>
<tbody>
<tr style="background: #fef2f2;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">15分以内</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">事象確認・初期報告・安全確保</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">現場責任者</td>
</tr>
<tr style="background: #fee2e2;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">1時間以内</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">状況評価・対策本部設置判断</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">経営陣</td>
</tr>
<tr style="background: #fecaca;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">6時間以内</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">対応戦略決定・実行開始</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">危機対策本部</td>
</tr>
<tr style="background: #fca5a5;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">24時間以内</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">外部報告・ステークホルダー対応</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">広報・コンプライアンス</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">過去の金融危機事例と学び</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 1rem;">
<h3 style="color: #d97706; margin: 0 0 0.5rem 0;">リーマンショック（2008年）</h3>
<p style="margin: 0; color: #374151;"><strong>教訓：</strong>流動性確保・カウンターパーティリスク管理・ストレステスト強化</p>
</div>
<div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 1rem;">
<h3 style="color: #d97706; margin: 0 0 0.5rem 0;">コロナ危機（2020年）</h3>
<p style="margin: 0; color: #374151;"><strong>教訓：</strong>リモートワーク対応・サプライチェーン多様化・ESGリスク重視</p>
</div>
<div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 1rem;">
<h3 style="color: #d97706; margin: 0 0 0.5rem 0;">東日本大震災（2011年）</h3>
<p style="margin: 0; color: #374151;"><strong>教訓：</strong>BCPの重要性・データセンター分散・電力確保</p>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">複合的危機への備え</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">現実の危機は複数のシナリオが同時に発生することが多いため、相互作用も考慮した対応策が必要です。</p>
</div>
        `
      },
      {
        id: 'section-3',
        title: '事業継続計画（BCP）の策定と実装',
        orderIndex: 3,
        type: 'text',
        content: `
<p>事業継続計画（BCP: Business Continuity Plan）は、災害や危機が発生した際にも重要な業務を継続し、迅速な復旧を図るための計画です。<br/>投資業界では、顧客資産の保護と市場機能の維持が重要な社会的責務となります。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">BCP策定の基本プロセス</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">Step 1: 事業影響度分析（BIA）</h3>
<p style="margin: 0; color: #374151;">重要業務の特定・影響評価・復旧優先順位の決定</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">Step 2: リスクアセスメント</h3>
<p style="margin: 0; color: #374151;">脅威の特定・発生確率と影響度の評価</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">Step 3: 事業継続戦略策定</h3>
<p style="margin: 0; color: #374151;">代替手段・復旧手順・リソース配分の計画</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">Step 4: 計画文書化・周知</h3>
<p style="margin: 0; color: #374151;">手順書作成・教育訓練・定期見直し</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">投資業務のRTO・RPO設定</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">業務分類</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">RTO（復旧時間目標）</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">RPO（復旧時点目標）</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">取引実行</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">1時間以内</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">15分以内</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">リスク管理</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">2時間以内</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">1時間以内</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">資産管理</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">4時間以内</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">4時間以内</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">顧客サービス</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">8時間以内</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">24時間以内</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">BCP実装のための具体的施策</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0;">
<div style="background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 1rem;">
<h3 style="margin: 0 0 0.5rem 0; color: #047857;">🏢 物理的対策</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9rem;">
<li>代替オフィス・災害対策センター</li>
<li>データセンターの地理的分散</li>
<li>電源・通信回線の冗長化</li>
<li>重要文書・システムのバックアップ</li>
</ul>
</div>
<div style="background: #eff6ff; border: 1px solid #3b82f6; border-radius: 8px; padding: 1rem;">
<h3 style="margin: 0 0 0.5rem 0; color: #1d4ed8;">💻 システム対策</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9rem;">
<li>クラウド活用・システム冗長化</li>
<li>リモートアクセス環境</li>
<li>自動フェイルオーバー機能</li>
<li>データ同期・レプリケーション</li>
</ul>
</div>
<div style="background: #fef7ff; border: 1px solid #a855f7; border-radius: 8px; padding: 1rem;">
<h3 style="margin: 0 0 0.5rem 0; color: #7c3aed;">👥 人的対策</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9rem;">
<li>緊急連絡網・安否確認システム</li>
<li>在宅勤務・モバイルワーク体制</li>
<li>代替要員・スキル多重化</li>
<li>定期的な訓練・教育</li>
</ul>
</div>
<div style="background: #fefce8; border: 1px solid #eab308; border-radius: 8px; padding: 1rem;">
<h3 style="margin: 0 0 0.5rem 0; color: #a16207;">🤝 外部対策</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9rem;">
<li>外部委託先のBCP確認</li>
<li>代替サプライヤー確保</li>
<li>業界団体・当局との連携</li>
<li>緊急時外部サービス契約</li>
</ul>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">定期的な見直しと改善</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">BCPは策定して終わりではなく、定期的な訓練と見直しにより実効性を維持することが重要です。</p>
</div>
        `
      },
      {
        id: 'section-4',
        title: '危機コミュニケーションとレピュテーション管理',
        orderIndex: 4,
        type: 'text',
        content: `
<p>危機発生時のコミュニケーションは、事態の収束とレピュテーション保護において極めて重要な要素です。<br/>適切な情報開示と透明性確保により、ステークホルダーの信頼を維持し、長期的な事業継続を図ることができます。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">危機コミュニケーションの基本原則</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">1. 迅速性（Speed）</h3>
<p style="margin: 0; color: #374151;">情報空白を避け、初期段階での迅速な情報発信</p>
</div>
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">2. 正確性（Accuracy）</h3>
<p style="margin: 0; color: #374151;">確認された事実のみを発信し、憶測や推測を避ける</p>
</div>
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">3. 透明性（Transparency）</h3>
<p style="margin: 0; color: #374151;">隠蔽せず、適切な範囲で情報を開示</p>
</div>
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">4. 共感性（Empathy）</h3>
<p style="margin: 0; color: #374151;">ステークホルダーへの理解と配慮を示す</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ステークホルダー別コミュニケーション戦略</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #7c3aed; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">ステークホルダー</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">主要関心事</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">コミュニケーション方法</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">顧客・投資家</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">資産の安全・投資継続可能性</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">直接通知・専用窓口・ウェブサイト</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">規制当局</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">法令遵守・市場安定への影響</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">正式報告・定期面談</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">従業員</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">雇用安定・安全確保</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">社内通知・説明会・イントラネット</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">メディア・一般公衆</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">事実関係・社会への影響</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">プレスリリース・記者会見・SNS</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">メディア対応とSNS管理</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fffbeb; border: 1px solid #fbbf24; border-radius: 8px; padding: 1rem;">
<h3 style="margin: 0 0 0.5rem 0; color: #d97706;">📺 メディア対応</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9rem;">
<li>専任スポークスパーソンの指名</li>
<li>統一メッセージの作成</li>
<li>記者会見・インタビュー対応</li>
<li>プレスリリースの迅速発行</li>
</ul>
</div>
<div style="background: #f0fdf4; border: 1px solid #22c55e; border-radius: 8px; padding: 1rem;">
<h3 style="margin: 0 0 0.5rem 0; color: #16a34a;">📱 SNS管理</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9rem;">
<li>公式アカウントでの情報発信</li>
<li>誤情報・風評の監視</li>
<li>顧客からの問い合わせ対応</li>
<li>炎上リスクの早期察知</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">レピュテーション回復戦略</h2>

<div style="background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="margin: 0 0 1rem 0; color: #047857;">段階的回復アプローチ</h3>
<ol style="margin: 0; padding-left: 1.5rem; color: #374151;">
<li><strong>即座の対応：</strong>事実確認と初期対応の迅速実行</li>
<li><strong>説明責任：</strong>原因分析と責任の明確化</li>
<li><strong>改善措置：</strong>再発防止策の策定と実行</li>
<li><strong>信頼回復：</strong>継続的なコミュニケーションと実績づくり</li>
<li><strong>長期構築：</strong>企業価値・ブランド価値の再構築</li>
</ol>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">危機時の法的・規制対応</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 1rem;">
<h3 style="color: #1d4ed8; margin: 0 0 0.5rem 0;">規制当局への報告</h3>
<p style="margin: 0; color: #374151;">迅速な初期報告・詳細報告・改善報告の段階的実施</p>
</div>
<div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 1rem;">
<h3 style="color: #1d4ed8; margin: 0 0 0.5rem 0;">法的リスク評価</h3>
<p style="margin: 0; color: #374151;">損害賠償・刑事責任・規制処分の可能性評価</p>
</div>
<div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 1rem;">
<h3 style="color: #1d4ed8; margin: 0 0 0.5rem 0;">証拠保全</h3>
<p style="margin: 0; color: #374151;">関連文書・データ・通信記録の適切な保存</p>
</div>
<div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 1rem;">
<h3 style="color: #1d4ed8; margin: 0 0 0.5rem 0;">法的助言の活用</h3>
<p style="margin: 0; color: #374151;">専門弁護士・コンサルタントとの連携体制</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">危機後の検証と改善</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #059669; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">検証項目</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">評価内容</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">改善アクション</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">対応スピード</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">初動・意思決定・実行の迅速性</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">プロセス改善・権限委譲</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">コミュニケーション</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">情報伝達の正確性・適時性</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">体制強化・ツール改善</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">資源配分</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">人員・予算・システム活用</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">リソース見直し・配分最適化</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">結果・効果</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">損失軽減・復旧達成度</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">戦略修正・能力向上</td>
</tr>
</tbody>
</table>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">危機を成長の機会に</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">適切に管理された危機対応は、組織の結束力と対応能力を向上させ、長期的な競争力強化につながります。</p>
</div>
        `
      }
    ],
    keyPoints: [
      '危機管理は予防・準備・対応・復旧の4段階で体系的にアプローチ',
      '投資業界では市場・オペレーション・規制・外部環境の4つの危機シナリオに対応',
      'BCPでは重要業務のRTO・RPO設定と代替手段の確保が重要',
      '危機コミュニケーションでは迅速性・正確性・透明性・共感性が基本原則',
      'ステークホルダー別に適切なコミュニケーション戦略を策定し実行',
      '規制当局対応と法的リスク管理により適切なコンプライアンスを確保',
      '危機後の検証と改善により組織の危機対応能力を継続的に向上'
    ],
    summary: '危機管理と事業継続計画について包括的に学習しました。危機管理は予防から復旧まで4段階で体系的に対応し、投資業界特有のリスクシナリオを理解することが重要です。BCPでは重要業務のRTO・RPO設定と具体的対策により事業継続性を確保し、危機コミュニケーションでは透明で迅速な情報開示によりレピュテーションを保護します。定期的な訓練と改善により実効性を維持し、危機を組織成長の機会として活用することが成功の鍵となります。',
    practicalExamples: [
      '2008年リーマンショック時の大手証券会社による流動性確保と顧客資産保護対応',
      '2011年東日本大震災における金融機関の72時間以内のBCP発動と代替拠点運用',
      '2020年コロナ危機でのリモートワーク移行と投資業務継続のためのシステム対応',
      'サイバー攻撃による顧客データ漏洩時の24時間以内の初期対応と透明な情報開示',
      'システム障害発生時の危機対策本部設置と6時間以内の代替システム稼働実現'
    ],
    warningNotes: [
      '危機管理計画は策定するだけでなく定期的な訓練と見直しが不可欠です',
      'コミュニケーション不備は危機を拡大させるリスクがあります',
      '法的・規制対応では専門家との連携が重要で自己判断は避けてください',
      'レピュテーション回復には長期間を要するため持続的な取り組みが必要です',
      '危機対応コストとのバランスを考慮した現実的な計画策定が重要です'
    ]
  },

  quiz: [
    {
      id: 'risk-management-23-q1',
      question: '危機管理の4段階として正しい順序は？',
      options: [
        '対応→予防・軽減→準備→復旧・学習',
        '予防・軽減→準備→対応→復旧・学習',
        '準備→予防・軽減→対応→復旧・学習',
        '復旧・学習→準備→対応→予防・軽減'
      ],
      correctAnswer: 1,
      explanation: '危機管理は「予防・軽減→準備→対応→復旧・学習」の順序で実施します。まずリスクを軽減し、対応準備を行い、発生時に迅速対応し、最後に検証・改善を行う循環的プロセスです。'
    },
    {
      id: 'risk-management-23-q2',
      question: 'BCPにおけるRTO（Recovery Time Objective）とは？',
      options: [
        '災害発生からデータ損失許容時間',
        '業務停止から復旧完了までの目標時間',
        '危機対策本部設置までの時間',
        '顧客への初期報告までの時間'
      ],
      correctAnswer: 1,
      explanation: 'RTO（Recovery Time Objective）は業務停止から復旧完了までの目標時間です。RPO（Recovery Point Objective）がデータ損失許容時間を示すのに対し、RTOは業務再開までの時間目標を設定します。'
    },
    {
      id: 'risk-management-23-q3',
      question: '危機コミュニケーションの基本原則に含まれないのは？',
      options: [
        '迅速性（Speed）',
        '正確性（Accuracy）',
        '秘匿性（Confidentiality）',
        '共感性（Empathy）'
      ],
      correctAnswer: 2,
      explanation: '危機コミュニケーションの基本原則は迅速性・正確性・透明性・共感性です。秘匿性ではなく透明性が重要で、適切な範囲での情報開示により信頼回復を図ります。'
    },
    {
      id: 'risk-management-23-q4',
      question: '投資業界の危機シナリオで最も重要な初動対応は？',
      options: [
        'メディア対応の準備',
        '顧客資産の安全確認と保護',
        '株主総会の延期決定',
        '競合他社との情報交換'
      ],
      correctAnswer: 1,
      explanation: '投資業界では顧客資産の安全確認と保護が最も重要な初動対応です。顧客から預かった資産の安全性確保は業界の社会的責務であり、信頼維持の基盤となります。'
    }
  ],
  lastUpdated: '2025-01-21',
  factChecked: true
};