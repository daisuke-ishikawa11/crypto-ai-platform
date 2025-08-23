import type { Lesson } from '@/types';

export const lesson13: Lesson = {
  id: 'risk-management-options-strategies',
  categoryId: 'risk-management',
  title: 'オプション戦略によるリスク管理',
  slug: 'options-strategies',
  description: 'オプション取引を活用したリスクヘッジ手法とポートフォリオ保護戦略を学びます',
  difficultyLevel: 'advanced',
  estimatedMinutes: 25,
  orderIndex: 13,
  content: {
    sections: [
      {
        id: 'section-1',
        title: 'オプション取引の基本',
        orderIndex: 1,
        type: 'text',
        content: `
<p>オプション取引は、決められた期間内に特定の価格で売買する権利を取引する金融商品です。<br/>リスク管理の観点から、既存ポートフォリオの保護に活用できます。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">オプション取引の基本概念</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">オプションの種類</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">権利の内容</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">買い手の利益</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">売り手の利益</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">コールオプション</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">決められた価格で買う権利</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">株価上昇時</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">オプション料受取</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">プットオプション</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">決められた価格で売る権利</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">株価下落時</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">オプション料受取</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">オプションの価値構成要素</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">1. 本質的価値（Intrinsic Value）</h3>
<p style="margin: 0; color: #374151;">現在の株価と権利行使価格の差額</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">2. 時間的価値（Time Value）</h3>
<p style="margin: 0; color: #374151;">満期までの時間価値（時間が経つほど減少）</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">3. ボラティリティ価値</h3>
<p style="margin: 0; color: #374151;">株価の変動性が高いほど価値が上昇</p>
</div>
<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 1rem;">
<h3 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">4. 金利・配当影響</h3>
<p style="margin: 0; color: #374151;">金利水準と配当予想の影響</p>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">オプションは保険と似ている</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">プレミアムを支払って、価格変動リスクから資産を保護できます。</p>
</div>
        `
      },
      {
        id: 'section-2',
        title: 'プロテクティブプット戦略',
        orderIndex: 2,
        type: 'text',
        content: `
<p>プロテクティブプット戦略は、保有株式の下落リスクを限定する代表的なオプション戦略です。<br/>株式を保有しながらプットオプションを購入することで損失を限定できます。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">プロテクティブプット戦略の仕組み</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #059669; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">株価の動き</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">株式の損益</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">プットオプション</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">合計損益</th>
</tr>
</thead>
<tbody>
<tr style="background: #dcfce7;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">大幅上昇</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+大きな利益</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">-オプション料</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: 600;">+大きな利益</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">小幅上昇</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+小さな利益</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">-オプション料</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b; font-weight: 600;">±ゼロ近辺</td>
</tr>
<tr style="background: #fef2f2;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">下落</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">-損失</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+プット利益</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626; font-weight: 600;">-限定的損失</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">実践例：1,000円の株式100株を保護</h2>

<div style="background: #f8fafc; border: 2px solid #94a3b8; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0;">設定条件</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>保有株式：1,000円 × 100株 = 10万円</li>
<li>購入プットオプション：権利行使価格950円</li>
<li>オプション料：30円 × 100株 = 3,000円</li>
<li>満期：3ヶ月後</li>
</ul>
</div>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">満期時株価</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">株式損益</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">プット損益</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">合計損益</th>
</tr>
</thead>
<tbody>
<tr style="background: #dcfce7;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">1,100円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+10,000円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">-3,000円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: 600;">+7,000円</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">1,000円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">0円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">-3,000円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626; font-weight: 600;">-3,000円</td>
</tr>
<tr style="background: #fef2f2;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">800円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">-20,000円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+12,000円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626; font-weight: 600;">-8,000円</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">プロテクティブプットの適用場面</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 1rem;">
<h3 style="color: #059669; margin: 0 0 0.5rem 0;">✅ 適している場面</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151;">
<li>大きな含み益がある株式の保護</li>
<li>決算発表など不確実性の高いイベント前</li>
<li>市場全体の調整局面が予想される時</li>
<li>税務上の理由で売却したくない場合</li>
</ul>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">❌ 適していない場面</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151;">
<li>短期間での小幅な値動きが予想される時</li>
<li>オプション料が割高な時</li>
<li>ボラティリティが低い安定した株式</li>
<li>既に大きな含み損がある株式</li>
</ul>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">保険料的な発想で利用</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">上昇利益は削られますが、大きな下落から資産を守れます。</p>
</div>
        `
      },
      {
        id: 'section-3',
        title: 'カバードコール戦略',
        orderIndex: 3,
        type: 'text',
        content: `
<p>カバードコール戦略は、保有株式に対してコールオプションを売却し、オプション料を受け取る戦略です。<br/>株価上昇の機会を制限する代わりに追加収益を確保します。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">カバードコール戦略の仕組み</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #f59e0b; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">株価の動き</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">株式の損益</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">コールオプション</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">合計損益</th>
</tr>
</thead>
<tbody>
<tr style="background: #fef3c7;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">大幅上昇</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+制限された利益</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+オプション料</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: 600;">+上限付き利益</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">小幅上昇</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+小さな利益</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+オプション料</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: 600;">+最大の利益</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">下落</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">-損失</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+オプション料</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626; font-weight: 600;">-軽減された損失</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">実践例：1,000円の株式100株でコール売り</h2>

<div style="background: #f8fafc; border: 2px solid #94a3b8; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0;">設定条件</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>保有株式：1,000円 × 100株 = 10万円</li>
<li>売却コールオプション：権利行使価格1,050円</li>
<li>受取オプション料：25円 × 100株 = 2,500円</li>
<li>満期：1ヶ月後</li>
</ul>
</div>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">満期時株価</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">株式損益</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">コール損益</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">合計損益</th>
</tr>
</thead>
<tbody>
<tr style="background: #fef3c7;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">1,100円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+5,000円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+2,500円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: 600;">+7,500円（上限）</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">1,000円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">0円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+2,500円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: 600;">+2,500円</td>
</tr>
<tr style="background: #fef2f2;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">900円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">-10,000円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+2,500円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626; font-weight: 600;">-7,500円</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">収益性の比較分析</h2>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
<div style="background: #f0fdf4; border: 2px solid #a7f3d0; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #059669; margin: 0 0 1rem 0; text-align: center;">カバードコールのメリット</h3>
<ul style="list-style: none; margin: 0; padding: 0; color: #059669;">
<li style="padding: 0.5rem 0; border-bottom: 1px solid #a7f3d0;">✅ 追加収入の確保</li>
<li style="padding: 0.5rem 0; border-bottom: 1px solid #a7f3d0;">✅ 下落時の損失軽減</li>
<li style="padding: 0.5rem 0; border-bottom: 1px solid #a7f3d0;">✅ 横ばい相場で最大効果</li>
<li style="padding: 0.5rem 0;">✅ 定期的な収益機会</li>
</ul>
</div>
<div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0; text-align: center;">カバードコールのデメリット</h3>
<ul style="list-style: none; margin: 0; padding: 0; color: #dc2626;">
<li style="padding: 0.5rem 0; border-bottom: 1px solid #fca5a5;">❌ 上昇利益の制限</li>
<li style="padding: 0.5rem 0; border-bottom: 1px solid #fca5a5;">❌ 強制売却の可能性</li>
<li style="padding: 0.5rem 0; border-bottom: 1px solid #fca5a5;">❌ 大幅下落時の損失</li>
<li style="padding: 0.5rem 0;">❌ タイミングの重要性</li>
</ul>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">安定株式に適した戦略</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">大幅な値上がりが期待できない安定株で、定期的な追加収入を狙えます。</p>
</div>
        `
      },
      {
        id: 'section-4',
        title: 'コンビネーション戦略',
        orderIndex: 4,
        type: 'text',
        content: `
<p>複数のオプションを組み合わせることで、より複雑なリスク・リターンプロファイルを作成できます。<br/>代表的なコンビネーション戦略について学びましょう。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ストラドル戦略</h2>

<div style="background: #f8fafc; border: 2px solid #94a3b8; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0;">ロングストラドル（買い）</h3>
<p style="margin: 0 0 1rem 0; color: #374151;">同一権利行使価格のコールとプットを同時購入</p>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>利益：</strong>大きな株価変動時（上昇・下落問わず）</li>
<li><strong>損失：</strong>株価が権利行使価格付近で推移</li>
<li><strong>適用場面：</strong>決算発表などイベント前</li>
</ul>
</div>

<div style="background: #f0f9ff; border: 2px solid #a5b4fc; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #4338ca; margin: 0 0 1rem 0;">ショートストラドル（売り）</h3>
<p style="margin: 0 0 1rem 0; color: #374151;">同一権利行使価格のコールとプットを同時売却</p>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>利益：</strong>株価が権利行使価格付近で安定</li>
<li><strong>損失：</strong>大きな株価変動時</li>
<li><strong>適用場面：</strong>ボラティリティが高い時</li>
</ul>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">スプレッド戦略</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">戦略名</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">構成</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">市場観</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">特徴</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">ブルスプレッド</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">低価格コール買い<br/>高価格コール売り</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">穏やかな上昇</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">利益・損失とも限定</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">ベアスプレッド</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">高価格プット買い<br/>低価格プット売り</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">穏やかな下落</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">利益・損失とも限定</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">バタフライ</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">1:2:1の比率でオプション売買</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">横ばい</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">中央価格で最大利益</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">戦略選択のガイドライン</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 1rem;">
<h3 style="color: #059669; margin: 0 0 0.5rem 0;">市場環境別の戦略選択</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151;">
<li><strong>上昇トレンド：</strong>コールオプション買い、ブルスプレッド</li>
<li><strong>下落トレンド：</strong>プットオプション買い、ベアスプレッド</li>
<li><strong>横ばい相場：</strong>カバードコール、ショートストラドル</li>
<li><strong>高ボラティリティ：</strong>ショートストラドル、バタフライ</li>
</ul>
</div>
<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem;">
<h3 style="color: #d97706; margin: 0 0 0.5rem 0;">リスク管理の重要ポイント</h3>
<ul style="margin: 0; padding-left: 1rem; color: #374151;">
<li>最大損失額を事前に計算</li>
<li>満期日と時間価値の減衰を考慮</li>
<li>ボラティリティ変化の影響を理解</li>
<li>流動性の確保（主要銘柄選択）</li>
</ul>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">シンプルな戦略から開始</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">複雑な戦略ほど取引コストが増加。基本戦略で経験を積みましょう。</p>
</div>
        `
      },
      {
        id: 'section-5',
        title: 'オプション戦略の注意点',
        orderIndex: 5,
        type: 'text',
        content: `
<p>オプション戦略は強力なリスク管理ツールですが、適切に使用しないと予期しない損失を招く可能性があります。<br/>重要な注意点を理解して安全に活用しましょう。</p>

<h2 style="color: #dc2626; margin: 2rem 0 1rem 0;">⚠️ オプション取引の主要リスク</h2>

<div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">1. 時間価値の減衰（タイムディケイ）</h3>
<p style="margin: 0; color: #374151;">満期に近づくほどオプション価値が急激に減少</p>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">2. ボラティリティリスク</h3>
<p style="margin: 0; color: #374151;">予想と異なる変動性でオプション価格が変動</p>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">3. 流動性リスク</h3>
<p style="margin: 0; color: #374151;">取引量が少ないオプションは売却困難</p>
</div>
<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 4px;">
<h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">4. 複雑性リスク</h3>
<p style="margin: 0; color: #374151;">理解不足による予期しない損失</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">コスト分析と損益分岐点</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #1e40af; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">コストの種類</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">内容</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">対策</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">オプション料</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">権利を得るために支払う料金</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">適正価格での取引</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">売買手数料</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">証券会社への手数料</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">手数料の安い業者選択</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">スプレッド</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">買値と売値の差</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">流動性の高い銘柄選択</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: 600;">機会コスト</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">他の投資機会を逃すコスト</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">戦略の定期的見直し</td>
</tr>
</tbody>
</table>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">安全なオプション取引のためのルール</h2>

<div style="background: #f0fdf4; border: 2px solid #a7f3d0; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<h3 style="color: #059669; margin: 0 0 1rem 0;">✅ 基本ルール</h3>
<ul style="list-style: none; margin: 0; padding: 0;">
<li style="color: #059669; font-weight: 600; padding: 0.5rem 0; border-bottom: 1px solid #a7f3d0;">✅ 投資資金の5-10%以内でオプション取引</li>
<li style="color: #059669; font-weight: 600; padding: 0.5rem 0; border-bottom: 1px solid #a7f3d0;">✅ 損失限定戦略から開始</li>
<li style="color: #059669; font-weight: 600; padding: 0.5rem 0; border-bottom: 1px solid #a7f3d0;">✅ 流動性の高い主要銘柄を選択</li>
<li style="color: #059669; font-weight: 600; padding: 0.5rem 0; border-bottom: 1px solid #a7f3d0;">✅ 満期まで十分な時間があるオプション</li>
<li style="color: #059669; font-weight: 600; padding: 0.5rem 0;">✅ デモ取引で十分な練習</li>
</ul>
</div>

<div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0;">❌ 危険な行為</h3>
<ul style="list-style: none; margin: 0; padding: 0;">
<li style="color: #dc2626; font-weight: 600; padding: 0.5rem 0; border-bottom: 1px solid #fca5a5;">❌ 理解していない複雑な戦略</li>
<li style="color: #dc2626; font-weight: 600; padding: 0.5rem 0; border-bottom: 1px solid #fca5a5;">❌ 全資金をオプションに投入</li>
<li style="color: #dc2626; font-weight: 600; padding: 0.5rem 0; border-bottom: 1px solid #fca5a5;">❌ 満期直前のオプション取引</li>
<li style="color: #dc2626; font-weight: 600; padding: 0.5rem 0; border-bottom: 1px solid #fca5a5;">❌ 流動性の低いマイナー銘柄</li>
<li style="color: #dc2626; font-weight: 600; padding: 0.5rem 0;">❌ 感情的な取引判断</li>
</ul>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">税務上の注意点</h2>

<div style="background: #fef7ff; border: 2px solid #c084fc; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #7c3aed; margin: 0 0 1rem 0;">オプション取引の税制</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>オプション取引は申告分離課税（税率20.315%）</li>
<li>損失は3年間の繰越控除が可能</li>
<li>他の金融商品との損益通算が可能</li>
<li>特定口座での源泉徴収選択が有効</li>
</ul>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">少額から段階的に経験を積む</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">オプション取引は高度な金融商品。十分な学習と練習が成功の鍵です。</p>
</div>
        `
      }
    ],
    keyPoints: [
      'オプション取引は株式や債券の価格変動リスクをヘッジする有効なツール',
      'プロテクティブプットは保有株式の下落リスクを限定できる保険的戦略',
      'カバードコールは株式保有で追加収入を得られるが上昇利益を制限',
      'コンビネーション戦略により複雑なリスク・リターンプロファイルを構築可能',
      '時間価値の減衰やボラティリティ変化など特有のリスクを理解する必要',
      '投資資金の5-10%以内で流動性の高い銘柄から開始することが安全',
      'デモ取引での十分な練習と段階的な経験蓄積が成功への道筋'
    ],
    summary: 'オプション戦略を活用したリスク管理手法について詳しく学びました。プロテクティブプットによる下落保護、カバードコールによる追加収入獲得、ストラドルやスプレッドなどのコンビネーション戦略まで、それぞれの仕組みと適用場面を理解しました。オプション取引には時間価値減衰やボラティリティリスクなど特有のリスクがあるため、十分な学習と少額からの段階的な実践が重要です。',
    practicalExamples: [
      '1,000円の株式100株を権利行使価格950円のプットで保護し最大損失を8,000円に限定',
      '保有株式に権利行使価格1,050円のコールを売却し月2,500円の追加収入を獲得',
      'ロングストラドル戦略で決算発表前の大きな株価変動から利益を狙う',
      'ブルスプレッド戦略で穏やかな上昇相場において利益と損失を限定',
      'バタフライ戦略で横ばい相場において中央価格付近での最大利益を追求'
    ],
    warningNotes: [
      'オプション取引は複雑な金融商品であり十分な知識と経験が必要です',
      '時間価値の減衰により満期に近づくほどオプション価値が急激に減少します',
      '投資資金の全額をオプション取引に投入することは避けてください',
      'デモ取引で十分な練習を積んでから実際の取引を開始してください',
      '専門家のアドバイスを受けることをお勧めします'
    ]
  },
  quiz: [
    {
      id: 'risk-management-13-q1',
      question: 'プロテクティブプット戦略の主な目的は何ですか？',
      options: [
        '株価上昇時の利益を最大化する',
        '保有株式の下落リスクを限定する',
        'オプション料を受け取る',
        '取引コストを削減する'
      ],
      correctAnswer: 1,
      explanation: 'プロテクティブプット戦略は、保有株式の下落リスクを限定することが主な目的です。プットオプションを購入することで、株価下落時の損失を権利行使価格まで限定できます。'
    },
    {
      id: 'risk-management-13-q2',
      question: 'カバードコール戦略のメリットは何ですか？',
      options: [
        '株価上昇時の利益が無制限',
        '追加収入を得られる',
        '下落リスクを完全に排除できる',
        '取引手数料が無料'
      ],
      correctAnswer: 1,
      explanation: 'カバードコール戦略の主なメリットは、コールオプションを売却することで追加収入（オプション料）を得られることです。ただし、株価上昇時の利益は制限されます。'
    },
    {
      id: 'risk-management-13-q3',
      question: 'オプション取引における時間価値の減衰（タイムディケイ）とは何ですか？',
      options: [
        'オプション価格が時間とともに上昇すること',
        '満期に近づくほどオプション価値が減少すること',
        '株価変動によりオプション価格が変動すること',
        '金利変動によりオプション価格が変動すること'
      ],
      correctAnswer: 1,
      explanation: '時間価値の減衰（タイムディケイ）とは、満期に近づくほどオプションの時間的価値が減少する現象です。特に満期直前では急激に価値が減少するため注意が必要です。'
    },
    {
      id: 'risk-management-13-q4',
      question: '安全なオプション取引のための基本ルールとして適切でないものは？',
      options: [
        '投資資金の5-10%以内でオプション取引を行う',
        '流動性の高い主要銘柄を選択する',
        '全資金をオプション取引に投入する',
        'デモ取引で十分な練習を積む'
      ],
      correctAnswer: 2,
      explanation: '全資金をオプション取引に投入することは非常に危険です。オプション取引は投資資金の5-10%以内に留めて、適切なリスク管理を行うことが重要です。'
    }
  ],
  lastUpdated: '2025-01-21',
  factChecked: true
};