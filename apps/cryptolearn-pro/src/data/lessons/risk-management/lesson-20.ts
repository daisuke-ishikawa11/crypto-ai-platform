import type { Lesson } from '@/types';

export const lesson20: Lesson = {
  id: 'risk-management-emerging-technology-risks',
  categoryId: 'risk-management',
  title: '新興リスクとテクノロジーリスク',
  slug: 'emerging-technology-risks',
  description: '急速に変化するテクノロジー環境における新たなリスクを理解し、適応的なリスク管理手法を身につけます',
  difficultyLevel: 'advanced',
  estimatedMinutes: 25,
  orderIndex: 20,
  content: {
    sections: [
      {
        id: 'section-1',
        title: '新興リスクの特徴と分類',
        orderIndex: 1,
        type: 'text',
        content: `
<p>新興リスクとは、従来のリスク管理フレームワークでは十分に対処できない新たなリスクです。<br/>特にデジタル化・AI・グローバル化が進む現代において、これらのリスクへの対応が重要になっています。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">新興リスクの主な特徴</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">特徴</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">説明</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">例</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">急速な変化</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">技術進歩により短期間で大きく変化</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">AI・量子コンピュータ</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">予測困難性</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">過去データからの予測が困難</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">パンデミック・地政学リスク</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">相互関連性</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">複数のリスクが複雑に関連</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">サプライチェーン・サイバー</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">非線形影響</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">小さな変化が大きな影響を与える</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">システミックリスク</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">新興リスクの分類</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">1. テクノロジーリスク</h3>
<p style="margin: 0; color: #374151;">AI・ML、サイバーセキュリティ、量子コンピュータなど</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">2. 環境・気候リスク</h3>
<p style="margin: 0; color: #374151;">気候変動、環境規制、ESG投資への影響</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">3. 地政学リスク</h3>
<p style="margin: 0; color: #374151;">貿易戦争、制裁、国際関係の変化</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">4. 社会構造リスク</h3>
<p style="margin: 0; color: #374151;">人口動態変化、格差拡大、社会不安</p>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">シナリオプランニングの活用</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">新興リスクには複数のシナリオを想定した対応戦略が効果的です。</p>
</div>
        `
      },
      {
        id: 'section-2',
        title: 'AI・MLリスクとその管理',
        orderIndex: 2,
        type: 'text',
        content: `
<p>人工知能（AI）と機械学習（ML）の普及により、新たなリスクが生まれています。<br/>これらのリスクを理解し、適切に管理することで、技術の恩恵を享受しつつリスクを最小化できます。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">AI・MLリスクの種類</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">1. アルゴリズムバイアス</h3>
<p style="margin: 0; color: #374151;"><strong>リスク：</strong>学習データの偏りによる不公平な判断</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>影響：</strong>投資判断の歪み、ESG評価への悪影響</p>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">2. モデル過学習</h3>
<p style="margin: 0; color: #374151;"><strong>リスク：</strong>過去データに過度に適応し、新しい状況で機能しない</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>影響：</strong>市場変動時の予測精度低下</p>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">3. ブラックボックス問題</h3>
<p style="margin: 0; color: #374151;"><strong>リスク：</strong>判断根拠が不明で説明責任を果たせない</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>影響：</strong>規制当局への説明困難、投資家不信</p>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">4. データ品質リスク</h3>
<p style="margin: 0; color: #374151;"><strong>リスク：</strong>不正確・不完全なデータによる誤判断</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>影響：</strong>投資判断ミス、システミックリスク</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">AI・MLリスク管理の実践手法</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #059669; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">管理手法</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">具体的方法</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">効果</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">モデル検証</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">バックテスト・クロスバリデーション</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">予測精度の客観評価</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">説明可能AI（XAI）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">LIME・SHAP等による解釈</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">判断根拠の可視化</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">データガバナンス</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">品質管理・バイアス検出</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">データ品質の向上</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">ヒューマン・イン・ザ・ループ</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">人間による最終判断・監視</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">アルゴリズムの暴走防止</td>
</tr>
</tbody>
</table>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">段階的導入とモニタリング</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">AI・MLシステムは段階的に導入し、継続的なモニタリングを行うことが重要です。</p>
</div>
        `
      },
      {
        id: 'section-3',
        title: 'サイバーセキュリティリスク管理',
        orderIndex: 3,
        type: 'text',
        content: `
<p>デジタル化の進展により、サイバーセキュリティリスクは金融機関にとって最重要課題の一つとなっています。<br/>包括的なサイバーセキュリティ戦略により、デジタル資産とシステムを保護しましょう。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">サイバーセキュリティリスクの分類</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0;">
<div style="background: #dc2626; color: white; border-radius: 8px; padding: 1.5rem;">
<h3 style="margin: 0 0 1rem 0; text-align: center;">🔴 外部脅威</h3>
<ul style="margin: 0; padding-left: 1rem;">
<li>マルウェア・ランサムウェア</li>
<li>DDoS攻撃</li>
<li>フィッシング詐欺</li>
<li>APT（高度持続的脅威）</li>
</ul>
</div>
<div style="background: #dc2626; color: white; border-radius: 8px; padding: 1.5rem;">
<h3 style="margin: 0 0 1rem 0; text-align: center;">🔴 内部脅威</h3>
<ul style="margin: 0; padding-left: 1rem;">
<li>内部関係者による不正</li>
<li>人為的ミス</li>
<li>権限管理不備</li>
<li>データ漏洩</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">サイバーセキュリティフレームワーク</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">段階</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">目的</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">主要施策</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">識別（Identify）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">資産・リスクの把握</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">資産台帳・リスク評価</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">防護（Protect）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">予防的対策</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">ファイアウォール・暗号化</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">検知（Detect）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">異常の早期発見</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">SOC・SIEM・監視</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">対応（Respond）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">インシデント対応</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">CSIRT・インシデント対応計画</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">復旧（Recover）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">事業継続・復旧</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">BCP・バックアップ・復旧計画</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">実践的なサイバーセキュリティ対策</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">1. ゼロトラスト・セキュリティ</h3>
<p style="margin: 0; color: #374151;">「信頼せず、常に検証する」原則に基づく包括的セキュリティモデル</p>
</div>
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">2. セキュリティ意識向上</h3>
<p style="margin: 0; color: #374151;">定期的な教育・訓練による人的セキュリティリスクの軽減</p>
</div>
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">3. サプライチェーンセキュリティ</h3>
<p style="margin: 0; color: #374151;">第三者リスクを含むサプライチェーン全体のセキュリティ管理</p>
</div>
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">4. クラウドセキュリティ</h3>
<p style="margin: 0; color: #374151;">クラウド環境固有のセキュリティリスクへの対応</p>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">レジリエンス重視のアプローチ</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">完全な防御は不可能。攻撃を前提とした復旧力（レジリエンス）の向上が重要です。</p>
</div>
        `
      },
      {
        id: 'section-4',
        title: '適応的リスク管理戦略',
        orderIndex: 4,
        type: 'text',
        content: `
<p>急速に変化する環境において、従来の静的なリスク管理では限界があります。<br/>適応的なリスク管理戦略により、変化に対応できる柔軟なリスク管理体制を構築しましょう。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">適応的リスク管理の原則</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 1rem;">
<h3 style="color: #047857; margin: 0 0 0.5rem 0;">1. 継続的学習と改善</h3>
<p style="margin: 0; color: #374151;">環境変化に応じてリスク管理手法を継続的に改善</p>
</div>
<div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 1rem;">
<h3 style="color: #047857; margin: 0 0 0.5rem 0;">2. ダイバーシティとレジリエンス</h3>
<p style="margin: 0; color: #374151;">多様性を重視し、システムの復元力を向上</p>
</div>
<div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 1rem;">
<h3 style="color: #047857; margin: 0 0 0.5rem 0;">3. 早期警戒システム</h3>
<p style="margin: 0; color: #374151;">変化の兆候を早期に検知する仕組みの構築</p>
</div>
<div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 1rem;">
<h3 style="color: #047857; margin: 0 0 0.5rem 0;">4. アジャイルな対応体制</h3>
<p style="margin: 0; color: #374151;">迅速な意思決定と実行が可能な組織体制</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">実装のためのフレームワーク</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #10b981; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">段階</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">活動内容</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">成果物</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">環境監視</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">トレンド分析・弱いシグナル検知</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">環境変化レポート</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">シナリオ策定</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">複数シナリオ・影響評価</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">シナリオプラン</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">戦略適応</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">リスク戦略の調整・更新</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">適応型リスク戦略</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">実行・評価</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">実装・効果測定・フィードバック</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">パフォーマンス指標</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">新興リスクへの実践的対応策</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fffbeb; border: 1px solid #fbbf24; border-radius: 8px; padding: 1rem;">
<h3 style="margin: 0 0 0.5rem 0; color: #d97706;">⚡ 短期対応</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151;">
<li>緊急対応チームの設置</li>
<li>情報収集体制の強化</li>
<li>ステークホルダー通信</li>
<li>リスク許容度の見直し</li>
</ul>
</div>
<div style="background: #f0f9ff; border: 1px solid #60a5fa; border-radius: 8px; padding: 1rem;">
<h3 style="margin: 0 0 0.5rem 0; color: #2563eb;">🔄 長期対応</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151;">
<li>組織文化の変革</li>
<li>スキル・能力の開発</li>
<li>システム・プロセス改善</li>
<li>戦略的パートナーシップ</li>
</ul>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">学習する組織の構築</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">新興リスクに対応するため、組織全体が学習し続ける文化を作ることが重要です。</p>
</div>
        `
      }
    ],
    keyPoints: [
      '新興リスクは急速な変化・予測困難性・相互関連性・非線形影響が特徴',
      'AIやMLによるアルゴリズムバイアス・過学習・ブラックボックス問題への対応が重要',
      'サイバーセキュリティは識別・防護・検知・対応・復旧の5段階で体系的に管理',
      'ゼロトラストセキュリティとレジリエンス重視のアプローチが効果的',
      '適応的リスク管理では継続的学習・多様性・早期警戒・アジャイル対応が原則',
      '環境監視からシナリオ策定・戦略適応・実行評価の循環的プロセス',
      '新興リスクには短期的緊急対応と長期的組織変革の両面からアプローチ'
    ],
    summary: '新興リスクとテクノロジーリスクについて包括的に学習しました。新興リスクは従来のフレームワークでは対処が困難な特徴を持ち、特にAI・MLリスクとサイバーセキュリティリスクが重要な課題となっています。AIリスクでは説明可能性やデータ品質管理が、サイバーセキュリティではゼロトラストモデルとレジリエンス向上が重要です。適応的リスク管理戦略により、変化する環境に対応できる柔軟で学習する組織を構築することが、新興リスクを効果的に管理する鍵となります。',
    practicalExamples: [
      'AI投資アルゴリズムにSHAP値を導入して判断根拠を可視化し透明性を向上',
      'サイバーセキュリティでSOCを設置し24時間体制でネットワーク監視を実施',
      '地政学リスクに対し複数の供給先確保とサプライチェーン多元化戦略を採用',
      '新興技術動向を追跡するため外部専門家とのアドバイザリー委員会を設置',
      'パンデミック等の外部ショックに備えた事業継続計画とストレステストを実施'
    ],
    warningNotes: [
      '新興リスクは完全な予測が困難なため過度な楽観は禁物です',
      'AI・MLシステムのブラックボックス化により説明責任の問題が生じる可能性があります',
      'サイバー攻撃は巧妙化しており完全な防御は不可能であることを認識してください',
      '新しい技術やソリューションにもリスクが伴うため慎重な導入検討が必要です',
      '組織文化の変革には時間がかかるため長期的視点での取り組みが重要です'
    ]
  },
  quiz: [
    {
      id: 'risk-management-20-q1',
      question: '新興リスクの主な特徴として適切でないものは？',
      options: [
        '急速な変化により短期間で大きく変化する',
        '過去データからの予測が比較的容易である',
        '複数のリスクが複雑に相互関連している',
        '小さな変化が大きな影響を与えることがある'
      ],
      correctAnswer: 1,
      explanation: '新興リスクは従来の予測手法では対処が困難で、過去データからの予測が困難であることが特徴の一つです。技術進歩や環境変化により、これまでにない新たなリスクパターンが生まれるため、従来の統計的手法だけでは限界があります。'
    },
    {
      id: 'risk-management-20-q2',
      question: 'AI・MLリスクの管理で最も重要なのは？',
      options: [
        'アルゴリズムの高度化を最優先する',
        '説明可能性（XAI）とヒューマン・イン・ザ・ループの導入',
        '処理速度の向上に集中する',
        '学習データの量を最大化する'
      ],
      correctAnswer: 1,
      explanation: 'AI・MLリスク管理では、判断根拠の説明可能性（XAI）と人間による最終的な監視・判断（ヒューマン・イン・ザ・ループ）が最も重要です。これによりアルゴリズムの暴走を防ぎ、規制要求への対応も可能になります。'
    },
    {
      id: 'risk-management-20-q3',
      question: 'サイバーセキュリティフレームワークの正しい順序は？',
      options: [
        '防護→検知→識別→対応→復旧',
        '識別→防護→検知→対応→復旧',
        '検知→識別→防護→復旧→対応',
        '対応→復旧→識別→防護→検知'
      ],
      correctAnswer: 1,
      explanation: 'サイバーセキュリティフレームワークは「識別（Identify）→防護（Protect）→検知（Detect）→対応（Respond）→復旧（Recover）」の順序で実施します。まず資産とリスクを把握し、予防策を講じ、異常を検知し、インシデント対応を行い、最後に復旧するという論理的な流れです。'
    },
    {
      id: 'risk-management-20-q4',
      question: '適応的リスク管理で最も重要な原則は？',
      options: [
        '一度決めたルールは変更しない',
        '継続的学習と環境変化への対応',
        '過去の経験のみに依存する',
        'コストを最小化することを最優先する'
      ],
      correctAnswer: 1,
      explanation: '適応的リスク管理では継続的学習と環境変化への対応が最も重要です。変化する環境に対応するため、常に学習し改善を続け、新たな情報や環境変化に基づいてリスク管理手法を柔軟に適応させることが成功の鍵となります。'
    }
  ],
  lastUpdated: '2025-01-21',
  factChecked: true
};