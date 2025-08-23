import type { Lesson } from '@/types';
export const lesson18: Lesson = {
  id: 'risk-management-operational-risk',
  categoryId: 'risk-management',
  title: 'オペレーショナルリスクの管理と対策',
  slug: 'operational-risk-management',
  description: 'システム障害・人的ミス・不正行為などのオペレーショナルリスクの識別・評価・管理手法を学びます',
  difficultyLevel: 'advanced',
  estimatedMinutes: 25,
  orderIndex: 18,
  content: {
    sections: [
      {
        id: 'section-1',
        title: 'オペレーショナルリスクの定義と分類',
        orderIndex: 1,
        type: 'text',
        content: `
<p>オペレーショナルリスクとは、不適切または機能しない内部プロセス・人・システムまたは外部事象から生じる損失のリスクです。<br/>市場リスクや信用リスクとは異なり、事業運営の過程で発生するリスクとして、あらゆる組織が直面する重要な課題です。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">オペレーショナルリスクの4つの主要要因</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 1.5rem 0;">
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1.5rem; border-radius: 8px;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0;">👥 人的要因</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151;">
<li>操作ミス・入力エラー</li>
<li>不正行為・内部不正</li>
<li>コンプライアンス違反</li>
<li>キーパーソンリスク</li>
<li>スキル不足・教育不備</li>
</ul>
</div>
<div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 1.5rem; border-radius: 8px;">
<h3 style="color: #1d4ed8; margin: 0 0 1rem 0;">💻 システム要因</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151;">
<li>システム障害・停止</li>
<li>データ破損・消失</li>
<li>サイバー攻撃</li>
<li>システム老朽化</li>
<li>バックアップ機能不全</li>
</ul>
</div>
<div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 1.5rem; border-radius: 8px;">
<h3 style="color: #16a34a; margin: 0 0 1rem 0;">⚙️ プロセス要因</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151;">
<li>業務手順の不備</li>
<li>承認プロセスの欠陥</li>
<li>文書化不足</li>
<li>業務の標準化不備</li>
<li>チェック機能の不全</li>
</ul>
</div>
<div style="background: #fefce8; border-left: 4px solid #eab308; padding: 1.5rem; border-radius: 8px;">
<h3 style="color: #a16207; margin: 0 0 1rem 0;">🌪️ 外部要因</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151;">
<li>自然災害・事故</li>
<li>テロ・犯罪</li>
<li>規制変更</li>
<li>ベンダーリスク</li>
<li>インフラ障害</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">投資業界におけるオペレーショナルリスクの特徴</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">業務分野</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">主要リスク</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">影響度</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">取引執行</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">誤発注・価格誤入力</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">高</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">資産管理</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">評価ミス・計算エラー</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">中</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">顧客サービス</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">情報漏洩・誤送信</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">高</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">法務・コンプライアンス</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">規制違反・法的責任</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">高</td>
</tr>
</tbody>
</table>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">オペレーショナルリスクは予防が最重要</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">発生してからの対応よりも、事前の予防策とリスク軽減が効果的で費用対効果も高くなります。</p>
</div>
        `
      },
      {
        id: 'section-2',
        title: 'リスク識別と評価手法',
        orderIndex: 2,
        type: 'text',
        content: `
<p>オペレーショナルリスクの効果的な管理には、まず適切な識別と評価が必要です。<br/>体系的なアプローチにより、潜在的なリスクを漏れなく把握し、適切な優先順位付けを行います。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">リスク識別の主要手法</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem; border-radius: 4px;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">1. プロセスマッピング</h3>
<p style="margin: 0; color: #374151;"><strong>手法：</strong>業務プロセス全体を可視化し、各段階でのリスクポイントを特定</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>効果：</strong>業務フロー全体の理解と潜在リスクの網羅的把握</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem; border-radius: 4px;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">2. FMEA（Failure Mode and Effect Analysis）</h3>
<p style="margin: 0; color: #374151;"><strong>手法：</strong>故障モードと影響分析による系統的なリスク分析</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>効果：</strong>発生可能性・影響度・検出可能性の3軸での評価</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem; border-radius: 4px;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">3. 根本原因分析（RCA）</h3>
<p style="margin: 0; color: #374151;"><strong>手法：</strong>過去の事故・障害の根本原因を深堀り分析</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>効果：</strong>再発防止と類似リスクの事前特定</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem; border-radius: 4px;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">4. シナリオ分析</h3>
<p style="margin: 0; color: #374151;"><strong>手法：</strong>様々な想定シナリオに基づくリスク影響分析</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;"><strong>効果：</strong>極端事象や複合災害への備え</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">リスク評価マトリックス</h2>

<div style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0; text-align: center;">発生頻度 × 影響度マトリックス</h3>
<table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 8px; border: 1px solid #ddd; text-align: center;">影響度 \ 頻度</th>
<th style="padding: 8px; border: 1px solid #ddd; text-align: center;">稀（1年に1回未満）</th>
<th style="padding: 8px; border: 1px solid #ddd; text-align: center;">低（月1回程度）</th>
<th style="padding: 8px; border: 1px solid #ddd; text-align: center;">中（週1回程度）</th>
<th style="padding: 8px; border: 1px solid #ddd; text-align: center;">高（日1回程度）</th>
</tr>
</thead>
<tbody>
<tr>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; font-weight: 600; background: #1e40af; color: white;">軽微</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; background: #dcfce7; color: #166534;">低</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; background: #dcfce7; color: #166534;">低</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; background: #fef3c7; color: #92400e;">中</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; background: #fef3c7; color: #92400e;">中</td>
</tr>
<tr>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; font-weight: 600; background: #1e40af; color: white;">中程度</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; background: #dcfce7; color: #166534;">低</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; background: #fef3c7; color: #92400e;">中</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; background: #fef3c7; color: #92400e;">中</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; background: #fee2e2; color: #991b1b;">高</td>
</tr>
<tr>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; font-weight: 600; background: #1e40af; color: white;">重大</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; background: #fef3c7; color: #92400e;">中</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; background: #fef3c7; color: #92400e;">中</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; background: #fee2e2; color: #991b1b;">高</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; background: #fee2e2; color: #991b1b;">高</td>
</tr>
<tr>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; font-weight: 600; background: #1e40af; color: white;">致命的</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; background: #fee2e2; color: #991b1b;">高</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; background: #fee2e2; color: #991b1b;">高</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; background: #fee2e2; color: #991b1b;">高</td>
<td style="padding: 8px; border: 1px solid #ddd; text-align: center; background: #fee2e2; color: #991b1b;">高</td>
</tr>
</tbody>
</table>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">定量的評価手法</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 1.5rem 0;">
<div style="background: #fef7ff; border: 2px solid #a855f7; padding: 1.5rem; border-radius: 8px;">
<h3 style="color: #7c3aed; margin: 0 0 1rem 0;">📊 AMA（Advanced Measurement Approach）</h3>
<p style="margin: 0; color: #374151; font-size: 0.95rem;"><strong>計算式：</strong></p>
<p style="margin: 0.5rem 0; color: #374151; font-size: 0.9rem; font-family: monospace; background: white; padding: 0.5rem; border-radius: 4px;">OpRisk Capital = 期待損失 + 非期待損失</p>
<p style="margin: 0.5rem 0 0 0; color: #374151; font-size: 0.9rem;"><strong>特徴：</strong>内部損失データ・外部データ・シナリオ分析・業務環境を統合</p>
</div>
<div style="background: #f0fdf4; border: 2px solid #22c55e; padding: 1.5rem; border-radius: 8px;">
<h3 style="color: #16a34a; margin: 0 0 1rem 0;">🎯 KRI（Key Risk Indicators）</h3>
<p style="margin: 0; color: #374151; font-size: 0.95rem;"><strong>指標例：</strong></p>
<ul style="margin: 0.5rem 0 0 1rem; color: #374151; font-size: 0.9rem;">
<li>システム停止時間</li>
<li>取引エラー率</li>
<li>従業員離職率</li>
<li>サイバー攻撃検知数</li>
</ul>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">定性評価と定量評価の組み合わせ</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">数値化困難なリスクもあるため、定量評価と定性評価を適切に組み合わせることが重要です。</p>
</div>
        `
      },
      {
        id: 'section-3',
        title: 'リスク軽減策と内部統制',
        orderIndex: 3,
        type: 'text',
        content: `
<p>識別・評価されたオペレーショナルリスクに対して、適切な軽減策と内部統制の構築が重要です。<br/>予防・検出・対応の3つの段階で多層防御を構築し、リスクの発生を防止・最小化します。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">リスク軽減の4つのアプローチ</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 1.5rem 0;">
<div style="background: #dcfce7; border-left: 4px solid #22c55e; padding: 1.5rem; border-radius: 8px;">
<h3 style="color: #166534; margin: 0 0 1rem 0;">🛡️ リスク回避（Avoid）</h3>
<p style="margin: 0; color: #374151; font-weight: 600;">リスク源を除去または業務から除外</p>
<ul style="margin: 0.5rem 0 0 1rem; color: #374151; font-size: 0.9rem;">
<li>高リスク業務の中止・外部委託</li>
<li>危険なシステムの廃止</li>
<li>リスクの高い地域からの撤退</li>
<li>問題のある取引先との関係解消</li>
</ul>
</div>
<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1.5rem; border-radius: 8px;">
<h3 style="color: #92400e; margin: 0 0 1rem 0;">🔒 リスク軽減（Mitigate）</h3>
<p style="margin: 0; color: #374151; font-weight: 600;">発生確率または影響度を削減</p>
<ul style="margin: 0.5rem 0 0 1rem; color: #374151; font-size: 0.9rem;">
<li>業務プロセスの改善</li>
<li>システムの冗長化・バックアップ</li>
<li>教育・研修の強化</li>
<li>チェック機能の追加</li>
</ul>
</div>
<div style="background: #e0e7ff; border-left: 4px solid #6366f1; padding: 1.5rem; border-radius: 8px;">
<h3 style="color: #4338ca; margin: 0 0 1rem 0;">🔄 リスク移転（Transfer）</h3>
<p style="margin: 0; color: #374151; font-weight: 600;">第三者にリスクを移転</p>
<ul style="margin: 0.5rem 0 0 1rem; color: #374151; font-size: 0.9rem;">
<li>保険の活用</li>
<li>アウトソーシング</li>
<li>デリバティブによるヘッジ</li>
<li>契約条項による責任分担</li>
</ul>
</div>
<div style="background: #fce7f3; border-left: 4px solid #ec4899; padding: 1.5rem; border-radius: 8px;">
<h3 style="color: #be185d; margin: 0 0 1rem 0;">⚖️ リスク受容（Accept）</h3>
<p style="margin: 0; color: #374151; font-weight: 600;">リスクを認識した上で保有</p>
<ul style="margin: 0.5rem 0 0 1rem; color: #374151; font-size: 0.9rem;">
<li>低リスクの許容</li>
<li>コストと効果のバランス考慮</li>
<li>継続的なモニタリング</li>
<li>緊急時対応計画の準備</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">内部統制の三線防御モデル</h2>

<div style="background: #1e40af; color: white; padding: 1.5rem; border-radius: 12px; margin: 1.5rem 0;">
<h3 style="margin: 0 0 1rem 0; text-align: center;">🏰 Three Lines of Defense</h3>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem;">
<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; text-align: center;">
<h4 style="margin: 0 0 0.5rem 0;">第一線防御</h4>
<p style="margin: 0; font-size: 0.9rem; font-weight: 600;">事業部門・現場</p>
<ul style="margin: 0.5rem 0 0 1rem; font-size: 0.8rem; text-align: left;">
<li>日常的なリスク管理</li>
<li>業務プロセス統制</li>
<li>現場での予防・検出</li>
</ul>
</div>
<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; text-align: center;">
<h4 style="margin: 0 0 0.5rem 0;">第二線防御</h4>
<p style="margin: 0; font-size: 0.9rem; font-weight: 600;">リスク管理部門</p>
<ul style="margin: 0.5rem 0 0 1rem; font-size: 0.8rem; text-align: left;">
<li>リスク管理方針策定</li>
<li>モニタリング・報告</li>
<li>コンプライアンス確保</li>
</ul>
</div>
<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; text-align: center;">
<h4 style="margin: 0 0 0.5rem 0;">第三線防御</h4>
<p style="margin: 0; font-size: 0.9rem; font-weight: 600;">内部監査</p>
<ul style="margin: 0.5rem 0 0 1rem; font-size: 0.8rem; text-align: left;">
<li>独立した評価・検証</li>
<li>統制の有効性確認</li>
<li>改善提案・勧告</li>
</ul>
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">具体的な統制手法</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #059669; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">統制種類</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">具体的手法</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">効果・目的</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">予防統制</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">職務分離・承認権限設定・システムアクセス制御</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">リスク発生の防止</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">発見統制</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">照合・突合・例外レポート・定期監査</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">異常の早期発見</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">修正統制</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">エラー訂正手順・緊急時対応・復旧計画</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">影響の最小化・迅速回復</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">全般統制</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">組織・人事・システム・物理セキュリティ</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">統制環境の整備</td>
</tr>
</tbody>
</table>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">統制の費用対効果を考慮</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">完璧な統制を目指すのではなく、リスクレベルに応じた合理的な統制レベルを設定することが重要です。</p>
</div>
        `
      },
      {
        id: 'section-4',
        title: '危機管理と事業継続計画（BCP）',
        orderIndex: 4,
        type: 'text',
        content: `
<p>オペレーショナルリスクが顕在化した際の迅速な対応と事業継続を確保するため、事前の準備と計画が重要です。<br/>危機管理体制の整備と事業継続計画（BCP）の策定により、レジリエントな組織を構築します。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">危機管理体制の基本構成</h2>

<div style="background: #dc2626; color: white; padding: 1.5rem; border-radius: 12px; margin: 1.5rem 0;">
<h3 style="margin: 0 0 1rem 0; text-align: center;">🚨 Crisis Management Structure</h3>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-top: 1rem;">
<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px;">
<h4 style="margin: 0 0 0.5rem 0;">危機対策本部</h4>
<ul style="margin: 0; padding-left: 1rem; font-size: 0.9rem;">
<li>最高責任者（CEO等）</li>
<li>各部門責任者</li>
<li>リスク管理責任者</li>
<li>外部専門家（必要時）</li>
</ul>
</div>
<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px;">
<h4 style="margin: 0 0 0.5rem 0;">機能別チーム</h4>
<ul style="margin: 0; padding-left: 1rem; font-size: 0.9rem;">
<li>情報収集・分析チーム</li>
<li>対応策実行チーム</li>
<li>広報・コミュニケーションチーム</li>
<li>復旧・事業継続チーム</li>
</ul>
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">事業継続計画（BCP）の策定プロセス</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem; border-radius: 4px;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">Step 1: 事業影響度分析（BIA）</h3>
<p style="margin: 0; color: #374151;"><strong>目的：</strong>重要業務の特定と影響度・復旧優先度の評価</p>
<div style="margin: 0.5rem 0 0 0; color: #374151; font-size: 0.9rem;">
<strong>分析項目：</strong>RTO（目標復旧時間）・RPO（目標復旧時点）・最大許容停止時間
</div>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem; border-radius: 4px;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">Step 2: リスク評価と脅威分析</h3>
<p style="margin: 0; color: #374151;"><strong>目的：</strong>事業継続を脅かすリスクシナリオの特定</p>
<div style="margin: 0.5rem 0 0 0; color: #374151; font-size: 0.9rem;">
<strong>対象：</strong>自然災害・システム障害・パンデミック・テロ・サイバー攻撃
</div>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem; border-radius: 4px;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">Step 3: 事業継続戦略の策定</h3>
<p style="margin: 0; color: #374151;"><strong>目的：</strong>各リスクシナリオに対する具体的対応策の決定</p>
<div style="margin: 0.5rem 0 0 0; color: #374151; font-size: 0.9rem;">
<strong>内容：</strong>代替拠点・バックアップシステム・要員確保・サプライヤー代替
</div>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem; border-radius: 4px;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">Step 4: 計画の文書化と周知</h3>
<p style="margin: 0; color: #374151;"><strong>目的：</strong>対応手順の明確化と組織全体への浸透</p>
<div style="margin: 0.5rem 0 0 0; color: #374151; font-size: 0.9rem;">
<strong>成果物：</strong>BCP文書・緊急連絡網・復旧手順書・教育訓練計画
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">緊急時対応の段階別アクション</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #dc2626; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">段階</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">時間軸</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">主要アクション</th>
</tr>
</thead>
<tbody>
<tr style="background: #fef2f2;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">初期対応</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">0-1時間</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">状況確認・安全確保・緊急連絡・対策本部設置</td>
</tr>
<tr style="background: #fee2e2;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">応急対応</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">1-24時間</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">被害評価・緊急復旧・代替手段実行・情報開示</td>
</tr>
<tr style="background: #fecaca;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">復旧対応</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">1-7日</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">本格復旧・業務再開・影響軽減・ステークホルダー対応</td>
</tr>
<tr style="background: #fca5a5;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">正常化</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">1週間以降</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">完全復旧・振り返り・改善策実施・計画見直し</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">BCPの有効性確保</h2>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1.5rem 0;">
<div style="background: #ecfccb; border: 2px solid #84cc16; padding: 1rem; border-radius: 8px; text-align: center;">
<h3 style="color: #365314; margin: 0 0 0.5rem 0;">🏋️ 訓練・演習</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9rem; text-align: left;">
<li>定期的なBCP訓練</li>
<li>シナリオベース演習</li>
<li>部門別・全社演習</li>
<li>外部機関との連携訓練</li>
</ul>
</div>
<div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 1rem; border-radius: 8px; text-align: center;">
<h3 style="color: #92400e; margin: 0 0 0.5rem 0;">🔄 定期見直し</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9rem; text-align: left;">
<li>年次見直し・更新</li>
<li>事業環境変化への対応</li>
<li>新たなリスクへの対策</li>
<li>訓練結果の反映</li>
</ul>
</div>
<div style="background: #dbeafe; border: 2px solid #3b82f6; padding: 1rem; border-radius: 8px; text-align: center;">
<h3 style="color: #1e40af; margin: 0 0 0.5rem 0;">📊 効果測定</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9rem; text-align: left;">
<li>復旧時間の測定</li>
<li>損失額の算定</li>
<li>顧客満足度調査</li>
<li>ステークホルダー評価</li>
</ul>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">BCPは「生きた文書」として維持</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">策定して終わりではなく、定期的な見直しと訓練を通じて実効性を確保し続けることが成功の鍵です。</p>
</div>
        `
      }
    ],
    keyPoints: [
      'オペレーショナルリスクは人・システム・プロセス・外部事象の4つの要因から発生する',
      'プロセスマッピング・FMEA・根本原因分析により体系的なリスク識別が可能',
      '発生頻度×影響度マトリックスとKRIによる定量・定性評価の組み合わせが重要',
      '回避・軽減・移転・受容の4つのアプローチでリスクに応じた適切な対策を選択',
      '三線防御モデルによる多層的な内部統制システムの構築が効果的',
      '事業継続計画（BCP）は事業影響度分析から始まる体系的アプローチで策定',
      '定期的な訓練・見直しによりBCPの実効性を継続的に確保することが重要'
    ],
    summary: 'このレッスンでは、オペレーショナルリスクの定義・分類から、識別・評価手法、軽減策と内部統制、そして危機管理・事業継続計画まで包括的に学習しました。オペレーショナルリスクの管理には体系的なアプローチと継続的な改善が不可欠です。',
    practicalExamples: [
      '2008年リーマンショック：バックオフィスシステムの混乱により決済処理が遅延し、追加の流動性リスクが発生',
      '2011年東日本大震災：事前のBCP策定により72時間以内に代替拠点での業務継続を実現した金融機関',
      'みずほ銀行システム障害（2021年）：ATM・振込システムの不具合で約4,000件の取引に影響、原因は保守作業のミス',
      'コロナ禍での在宅勤務移行：サイバーセキュリティ強化と業務プロセス見直しで業務継続を確保',
      '仮想通貨取引所のハッキング事件：マルチシグ・コールドウォレット等の技術的統制により顧客資産を保護'
    ],
    warningNotes: [
      '投資判断は自己責任で行い、本レッスンの内容は教育目的のみで投資勧誘ではありません',
      'オペレーショナルリスク管理には完璧はなく、継続的な改善が必要です',
      'BCP策定時は想定シナリオの妥当性を専門家と十分検討してください',
      '統制の過度な厳格化により業務効率が損なわれるリスクも考慮が必要です',
      '緊急時の意思決定権限と責任範囲を事前に明確化しておくことが重要です'
    ]
  },
  quiz: [
    {
      id: 'risk-management-18-q1',
      question: 'オペレーショナルリスクの4つの主要要因に含まれないのは？',
      options: [
        '人的要因',
        '市場要因', 
        'システム要因',
        'プロセス要因'
      ],
      correctAnswer: 1,
      explanation: 'オペレーショナルリスクの主要要因は、人的要因・システム要因・プロセス要因・外部要因の4つです。市場要因はマーケットリスクに分類されます。'
    },
    {
      id: 'risk-management-18-q2',
      question: '三線防御モデルの第二線防御を担うのは？',
      options: [
        '事業部門・現場',
        'リスク管理部門',
        '内部監査',
        '外部監査'
      ],
      correctAnswer: 1,
      explanation: '三線防御モデルでは、第一線防御が事業部門・現場、第二線防御がリスク管理部門・コンプライアンス部門、第三線防御が内部監査となります。'
    },
    {
      id: 'risk-management-18-q3',
      question: '事業継続計画（BCP）策定の最初のステップは？',
      options: [
        'リスク評価と脅威分析',
        '事業影響度分析（BIA）',
        '事業継続戦略の策定',
        '計画の文書化と周知'
      ],
      correctAnswer: 1,
      explanation: 'BCP策定では最初に事業影響度分析（BIA）を行い、重要業務の特定とRTO・RPOの設定を行います。これがその後のリスク評価や戦略策定の基盤となります。'
    },
    {
      id: 'risk-management-18-q4',
      question: 'オペレーショナルリスクの軽減策として適切でないのは？',
      options: [
        '業務プロセスの改善による予防',
        '保険加入によるリスク移転',
        '市場ポジションの拡大',
        'システムの冗長化'
      ],
      correctAnswer: 2,
      explanation: '市場ポジションの拡大は投資戦略の問題であり、オペレーショナルリスクの軽減策ではありません。適切な軽減策は予防・軽減・移転・受容の4つのアプローチです。'
    }
  ],
  lastUpdated: '2025-01-21',
  factChecked: true
};