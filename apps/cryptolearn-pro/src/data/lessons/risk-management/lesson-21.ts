import type { Lesson } from '@/types';

export const lesson21: Lesson = {
  id: 'risk-management-stress-scenario-analysis',
  categoryId: 'risk-management',
  title: 'ストレステストとシナリオ分析',
  slug: 'stress-scenario-analysis',
  description: '極端な市場状況での耐性を測定するストレステストと、将来起こりうる様々なシナリオを分析する手法を習得します',
  difficultyLevel: 'advanced',
  estimatedMinutes: 30,
  orderIndex: 21,
  content: {
    sections: [
      {
        id: 'section-1',
        title: 'ストレステストの基本概念',
        orderIndex: 1,
        type: 'text',
        content: `
<p>ストレステストとは、極端だが起こりうる市場状況において、ポートフォリオがどの程度の損失を被る可能性があるかを分析する手法です。<br/>通常の市場環境では見えないリスクを発見し、危機に対する備えを強化することが目的です。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ストレステストの種類</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">種類</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">特徴</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">適用場面</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">感度分析</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">一つのリスク要因を変化させて影響を測定</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">金利・為替の変動影響</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">ヒストリカルテスト</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">過去の危機時データを適用</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">リーマンショック・コロナ危機</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">仮想シナリオテスト</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">想定される将来の極端事象</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">地政学リスク・技術変革</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">モンテカルロシミュレーション</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">確率的手法による多数回シミュレーション</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">複合的リスク評価</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ストレステストの実施プロセス</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">1. 目的と対象の明確化</h3>
<p style="margin: 0; color: #374151;">テストの目的・測定対象・期間を明確に定義</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">2. ストレスシナリオの設計</h3>
<p style="margin: 0; color: #374151;">極端だが現実的なシナリオを複数設計</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">3. 影響度の算出</h3>
<p style="margin: 0; color: #374151;">各シナリオ下でのポートフォリオへの影響を定量化</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">4. 結果の分析と対策立案</h3>
<p style="margin: 0; color: #374151;">結果を分析し、必要な改善策を検討</p>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">定期的な実施とアップデート</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">ストレステストは一度実施すれば終わりではなく、定期的に見直しが必要です。</p>
</div>
        `
      },
      {
        id: 'section-2',
        title: 'シナリオ分析の設計と実践',
        orderIndex: 2,
        type: 'text',
        content: `
<p>シナリオ分析は、将来起こりうる様々な状況を想定し、それぞれにおけるポートフォリオのパフォーマンスを評価する手法です。<br/>不確実性の高い環境において、より堅牢な投資戦略を構築するために重要です。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">効果的なシナリオ設計の原則</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">1. 多様性の確保</h3>
<p style="margin: 0; color: #374151;"><strong>原則：</strong>楽観・悲観・ベースケースの3つ以上</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>目的：</strong>幅広い可能性をカバーし、偏りを防ぐ</p>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">2. 現実性の維持</h3>
<p style="margin: 0; color: #374151;"><strong>原則：</strong>極端すぎず、起こりうる範囲で設定</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>目的：</strong>実用性のある分析結果を得る</p>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">3. 一貫性の確保</h3>
<p style="margin: 0; color: #374151;"><strong>原則：</strong>各変数間の論理的な整合性を維持</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>目的：</strong>矛盾のない分析フレームワーク</p>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">4. 動的要素の考慮</h3>
<p style="margin: 0; color: #374151;"><strong>原則：</strong>時間経過による変化も組み込む</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>目的：</strong>長期的視点での評価</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">代表的なシナリオパターン</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #059669; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">シナリオ</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">主要要因</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">株式市場</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">債券市場</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">経済成長加速</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">GDP成長・企業収益向上</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">上昇</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">下落</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">景気後退</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">GDP縮小・失業率上昇</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">下落</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">上昇</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">インフレ高進</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">物価上昇・金利上昇</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">混合</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">下落</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">地政学危機</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">紛争・制裁・貿易摩擦</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">下落</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">混合</td>
</tr>
</tbody>
</table>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">確率の付与と意思決定への活用</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">各シナリオに主観的確率を付与し、期待リターンの計算に活用しましょう。</p>
</div>
        `
      },
      {
        id: 'section-3',
        title: '実践的な分析手法と指標',
        orderIndex: 3,
        type: 'text',
        content: `
<p>ストレステストとシナリオ分析の結果を適切に評価し、投資判断に活用するためには、適切な指標と分析手法を理解することが重要です。<br/>定量的な分析により、客観的で説得力のあるリスク評価が可能になります。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">主要な評価指標</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">1. 最大損失額（Maximum Loss）</h3>
<p style="margin: 0; color: #374151;">各シナリオ下での最大予想損失額を算出し、資本に対する比率で評価</p>
</div>
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">2. 損失頻度（Loss Frequency）</h3>
<p style="margin: 0; color: #374151;">一定額以上の損失が発生するシナリオの数や確率</p>
</div>
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">3. 回復期間（Recovery Time）</h3>
<p style="margin: 0; color: #374151;">損失発生後、元の水準まで回復するのに要する期間</p>
</div>
<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1rem;">
<h3 style="color: #7c3aed; margin: 0 0 0.5rem 0;">4. リスク調整リターン</h3>
<p style="margin: 0; color: #374151;">各シナリオでのリスクを考慮した収益性指標</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">分析手法の比較</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">手法</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">利点</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">注意点</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">適用場面</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">単一要因分析</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">シンプル・理解しやすい</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">相互作用を無視</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">初期検討</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">複数要因分析</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">現実的・包括的</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">複雑・計算負荷大</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">詳細分析</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">確率論的手法</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">統計的根拠・幅広い分析</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">前提条件への依存</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">高度な分析</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">ヒストリカル手法</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">実績データ・信頼性高</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">過去に依存・新しいリスク無視</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">ベンチマーク</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">実装のステップ</h2>

<div style="background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="margin: 0 0 1rem 0; color: #047857;">実践的な実装手順</h3>
<ol style="margin: 0; padding-left: 1.5rem; color: #374151;">
<li><strong>データ収集・整理：</strong>過去の市場データ・ポートフォリオデータの準備</li>
<li><strong>モデル構築：</strong>リスク要因とポートフォリオ価値の関係をモデル化</li>
<li><strong>シナリオ設定：</strong>ベース・楽観・悲観・極端シナリオの設計</li>
<li><strong>計算実行：</strong>各シナリオでのポートフォリオ価値変動を算出</li>
<li><strong>結果分析：</strong>損失分布・リスク指標・感度の分析</li>
<li><strong>報告・共有：</strong>結果の可視化と関係者への報告</li>
<li><strong>アクションプラン：</strong>必要な対策の策定と実行</li>
</ol>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">継続的改善とモデル更新</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">市場環境の変化に応じて、定期的にモデルとシナリオを見直すことが重要です。</p>
</div>
        `
      },
      {
        id: 'section-4',
        title: '結果の解釈と意思決定への活用',
        orderIndex: 4,
        type: 'text',
        content: `
<p>ストレステストとシナリオ分析の結果を正しく解釈し、実際の投資判断に活用することで、より堅牢なリスク管理が可能になります。<br/>結果の読み方と活用方法を身につけ、実践的なリスク管理を実現しましょう。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">結果解釈の重要ポイント</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 1rem;">
<h3 style="color: #047857; margin: 0 0 0.5rem 0;">1. 絶対損失と相対影響</h3>
<p style="margin: 0; color: #374151;">金額ベースの損失だけでなく、元本に対する比率で評価</p>
</div>
<div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 1rem;">
<h3 style="color: #047857; margin: 0 0 0.5rem 0;">2. 発生可能性の考慮</h3>
<p style="margin: 0; color: #374151;">極端なケースだけでなく、中程度リスクの累積も重要</p>
</div>
<div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 1rem;">
<h3 style="color: #047857; margin: 0 0 0.5rem 0;">3. 時系列的変化</h3>
<p style="margin: 0; color: #374151;">瞬間的影響だけでなく、継続期間・回復パターンも分析</p>
</div>
<div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 1rem;">
<h3 style="color: #047857; margin: 0 0 0.5rem 0;">4. 相関とコンテージョン</h3>
<p style="margin: 0; color: #374151;">危機時の相関上昇や伝播効果を考慮</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">意思決定への活用法</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #10b981; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">活用場面</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">具体的方法</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">期待効果</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">ポートフォリオ構築</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">リスク予算の配分・資産配分の調整</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">下方リスクの制御</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">ヘッジ戦略</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">オプション・先物によるヘッジ比率決定</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">損失の限定</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">資本配賦</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">リスク資本の戦略別配分</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">効率的なリスクテイク</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">早期警戒</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">トリガー指標の設定</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">プロアクティブな対応</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">コミュニケーションとガバナンス</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fffbeb; border: 1px solid #fbbf24; border-radius: 8px; padding: 1rem;">
<h3 style="margin: 0 0 0.5rem 0; color: #d97706;">📊 効果的な報告</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151;">
<li>視覚的なダッシュボード</li>
<li>要点を絞った要約</li>
<li>アクションプランの明示</li>
<li>定期的な更新頻度</li>
</ul>
</div>
<div style="background: #f0f9ff; border: 1px solid #60a5fa; border-radius: 8px; padding: 1rem;">
<h3 style="margin: 0 0 0.5rem 0; color: #2563eb;">🏛️ ガバナンス体制</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151;">
<li>リスク委員会での議論</li>
<li>経営陣への定期報告</li>
<li>外部監査・検証</li>
<li>規制当局への対応</li>
</ul>
</div>
</div>

<div style="background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="margin: 0 0 1rem 0; color: #047857;">🎯 成功のためのベストプラクティス</h3>
<ol style="margin: 0; padding-left: 1.5rem; color: #374151;">
<li><strong>経営陣の関与：</strong>トップのコミットメントと定期的な関与</li>
<li><strong>現業との連携：</strong>運用担当者との密接な協力</li>
<li><strong>継続的改善：</strong>結果の検証と手法の改善</li>
<li><strong>文書化：</strong>プロセス・前提条件の明確な記録</li>
<li><strong>訓練・教育：</strong>関係者のスキル向上</li>
</ol>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">バランスの取れた活用</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">ストレステストの結果に過度に反応せず、他の分析手法とバランス良く活用することが重要です。</p>
</div>
        `
      }
    ],
    keyPoints: [
      'ストレステストは極端な市場状況での損失可能性を分析する重要な手法',
      'シナリオ分析では多様性・現実性・一貫性・動的要素を考慮した設計が重要',
      '最大損失額・損失頻度・回復期間・リスク調整リターンが主要な評価指標',
      '単一要因から複数要因・確率論的・ヒストリカル手法まで用途に応じて選択',
      '結果解釈では絶対・相対損失・発生可能性・時系列変化・相関を総合評価',
      'ポートフォリオ構築・ヘッジ戦略・資本配賦・早期警戒に活用',
      '効果的な報告・ガバナンス体制・継続的改善により実効性を向上'
    ],
    summary: 'ストレステストとシナリオ分析について包括的に学習しました。ストレステストは極端だが起こりうる市場状況での損失を測定し、シナリオ分析は多様な将来状況を想定した評価を行います。効果的な実施には適切な指標選択と分析手法の組み合わせが重要で、結果を正しく解釈してポートフォリオ管理・ヘッジ戦略・リスク資本配賦に活用することで、より堅牢なリスク管理が実現できます。継続的な改善とガバナンス体制の整備により、実践的なリスク管理ツールとして機能します。',
    practicalExamples: [
      'リーマンショック時のデータを使って保有株式ポートフォリオの損失をシミュレーション',
      '金利3%上昇シナリオで債券ポートフォリオの価格変動と期間を分析',
      'パンデミック・地政学リスク・インフレ高進の3シナリオでバランス型ファンドを評価',
      'VaRの5%を超える損失発生時のアラート設定と自動ヘッジ実行システム構築',
      'モンテカルロ手法で10,000回シミュレーションし損失分布と確率を算出'
    ],
    warningNotes: [
      'ストレステストは将来の確実な予測ではなく可能性の分析であることを理解してください',
      '過去データに基づく分析は新しいタイプのリスクを見落とす可能性があります',
      'シナリオ設定に主観が入るため複数の視点で検証することが重要です',
      '結果を過度に重視し過度に保守的になるリスクもあります',
      'モデルの限界を理解し他の分析手法と組み合わせて使用してください'
    ]
  },
  quiz: [
    {
      id: 'risk-management-21-q1',
      question: 'ストレステストの主要な目的として最も適切なのは？',
      options: [
        '通常時のポートフォリオパフォーマンスを評価する',
        '極端な市場状況での損失可能性を分析する',
        '過去のリターンを正確に再現する',
        '将来の市場動向を予測する'
      ],
      correctAnswer: 1,
      explanation: 'ストレステストの主要な目的は、極端だが起こりうる市場状況において、ポートフォリオがどの程度の損失を被る可能性があるかを分析することです。通常の市場環境では見えないリスクを発見し、危機への備えを強化するために実施します。'
    },
    {
      id: 'risk-management-21-q2',
      question: '効果的なシナリオ設計で最も重要でないのは？',
      options: [
        '楽観・悲観・ベースケースなど多様なシナリオの設定',
        '極端すぎず現実的な範囲での設定',
        '各変数間の論理的な整合性の維持',
        '過去の実績データとの完全な一致'
      ],
      correctAnswer: 3,
      explanation: 'シナリオ分析では将来の不確実性を扱うため、過去の実績データとの完全な一致は重要ではありません。むしろ多様性・現実性・一貫性を保ちながら、将来起こりうる様々な状況を想定することが重要です。'
    },
    {
      id: 'risk-management-21-q3',
      question: 'ストレステスト結果の活用として適切でないのは？',
      options: [
        'ポートフォリオの資産配分調整',
        'ヘッジ戦略のヘッジ比率決定',
        '短期的な市場タイミング投資判断',
        'リスク資本の戦略別配分'
      ],
      correctAnswer: 2,
      explanation: 'ストレステストは極端な状況での損失分析を目的とするため、短期的な市場タイミングの投資判断には適していません。むしろポートフォリオ構築・ヘッジ戦略・資本配賦など、中長期的なリスク管理判断に活用すべきツールです。'
    },
    {
      id: 'risk-management-21-q4',
      question: 'シナリオ分析の実装で最も重要なのは？',
      options: [
        '最も複雑なモデルを使用する',
        '過去データのみに依存する',
        '定期的な見直しと継続的改善',
        '一度設定したら変更しない'
      ],
      correctAnswer: 2,
      explanation: 'シナリオ分析では市場環境の変化に応じて定期的にモデルとシナリオを見直し、継続的に改善することが最も重要です。静的な分析では変化する環境に対応できず、実効性のあるリスク管理ツールとして機能しません。'
    }
  ],
  lastUpdated: '2025-01-21',
  factChecked: true
};