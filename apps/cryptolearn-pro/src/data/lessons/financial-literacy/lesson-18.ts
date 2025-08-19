import type { Lesson } from '@/lib/types/learning'

export const lesson18: Lesson = {
  id: 'insurance-investment-separation',
  categoryId: 'financial-literacy',
  title: '保険と投資の本質的な違いと活用戦略',
  slug: 'insurance-investment-separation',
  description: '保険の本来の役割と投資商品との違いを理解し、適切なリスク管理と資産形成の両立を実現する戦略を学びます。',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 50,
  orderIndex: 18,
  isPublished: true,
  tags: ['金融リテラシー', '保険', 'リスク管理', '投資戦略'],
  
  content: {
    sections: [
      {
        type: 'text',
        title: '保険と投資の本質的な違い',
        content: `
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 1rem; color: white; margin-bottom: 2rem;">
  <h2 style="margin: 0 0 1rem 0; font-size: 2rem;">保険と投資の正しい理解</h2>
  <p style="font-size: 1.1rem; line-height: 1.8;">
    多くの人が混同しやすい保険と投資。その本質的な違いを理解することが、健全な財務計画の第一歩です。
  </p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">1. 保険の本来の役割</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">リスク移転の仕組み</h3>
保険は本質的に「リスク管理ツール」です：

<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: linear-gradient(90deg, #4f46e5, #7c3aed); color: white;">
      <th style="padding: 1rem; text-align: left; border: 1px solid #e5e7eb;">保険の種類</th>
      <th style="padding: 1rem; text-align: left; border: 1px solid #e5e7eb;">守るリスク</th>
      <th style="padding: 1rem; text-align: left; border: 1px solid #e5e7eb;">本来の目的</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #f9fafb;">
      <td style="padding: 1rem; border: 1px solid #e5e7eb;"><strong>生命保険</strong></td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">死亡リスク</td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">遺族の生活保障</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem; border: 1px solid #e5e7eb;"><strong>医療保険</strong></td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">病気・ケガのリスク</td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">医療費の補填</td>
    </tr>
    <tr style="background: #f9fafb;">
      <td style="padding: 1rem; border: 1px solid #e5e7eb;"><strong>火災保険</strong></td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">財産損失リスク</td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">資産の保護</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem; border: 1px solid #e5e7eb;"><strong>自動車保険</strong></td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">事故リスク</td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">賠償責任の補償</td>
    </tr>
  </tbody>
</table>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">保険の経済的価値</h3>
<div style="background: #fef3c7; padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #f59e0b; margin: 1.5rem 0;">
  <h4 style="color: #92400e; margin: 0 0 0.5rem 0;">💡 重要な理解</h4>
  <p style="color: #78350f; margin: 0;">
    保険は「期待値マイナスの商品」です。保険会社の運営費と利益が含まれるため、統計的には加入者全体の保険料総額＞支払保険金総額となります。しかし、個人にとっては「耐えられない損失」から守る価値があります。
  </p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2. 投資の本質と目的</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">資産成長のメカニズム</h3>
投資は「資産を増やすツール」です：

<div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); padding: 1.5rem; border-radius: 0.5rem; margin: 1.5rem 0;">
  <h4 style="color: #064e3b; margin: 0 0 1rem 0;">投資の3つの原動力</h4>
  <ul style="color: #064e3b; margin: 0; padding-left: 1.5rem;">
    <li><strong>経済成長</strong>：企業の利益成長による株価上昇</li>
    <li><strong>配当・利息</strong>：保有資産からの定期的収入</li>
    <li><strong>複利効果</strong>：再投資による指数関数的成長</li>
  </ul>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">投資と投機の違い</h3>
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: linear-gradient(90deg, #10b981, #3b82f6); color: white;">
      <th style="padding: 1rem; text-align: left; border: 1px solid #e5e7eb;">項目</th>
      <th style="padding: 1rem; text-align: left; border: 1px solid #e5e7eb;">投資</th>
      <th style="padding: 1rem; text-align: left; border: 1px solid #e5e7eb;">投機</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #f0fdf4;">
      <td style="padding: 1rem; border: 1px solid #e5e7eb;"><strong>時間軸</strong></td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">長期（5年以上）</td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">短期（1年未満）</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem; border: 1px solid #e5e7eb;"><strong>根拠</strong></td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">ファンダメンタルズ分析</td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">価格変動・市場心理</td>
    </tr>
    <tr style="background: #f0fdf4;">
      <td style="padding: 1rem; border: 1px solid #e5e7eb;"><strong>リスク</strong></td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">計算可能・分散可能</td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">高い・予測困難</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem; border: 1px solid #e5e7eb;"><strong>期待リターン</strong></td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">年率5-10%</td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">不確定（-100%～+∞）</td>
    </tr>
  </tbody>
</table>
        `
      },
      {
        type: 'text',
        title: '保険商品に含まれる投資要素の分析',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">3. 貯蓄型保険の実態</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">終身保険・養老保険の構造</h3>
<div style="background: #fff7ed; padding: 1.5rem; border-radius: 0.5rem; border: 2px solid #ea580c; margin: 1.5rem 0;">
  <h4 style="color: #7c2d12; margin: 0 0 1rem 0;">⚠️ 貯蓄型保険の内訳</h4>
  <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
    <div style="flex: 1; background: white; padding: 1rem; border-radius: 0.5rem;">
      <strong style="color: #dc2626;">保障部分（30-40%）</strong>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">純粋な死亡保障コスト</p>
    </div>
    <div style="flex: 1; background: white; padding: 1rem; border-radius: 0.5rem;">
      <strong style="color: #ea580c;">運営費（20-30%）</strong>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">保険会社の経費・利益</p>
    </div>
    <div style="flex: 1; background: white; padding: 1rem; border-radius: 0.5rem;">
      <strong style="color: #16a34a;">運用部分（30-50%）</strong>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">実際に運用される部分</p>
    </div>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">実質利回りの計算例</h3>
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: #dc2626; color: white;">
      <th style="padding: 1rem; text-align: left;">保険商品例</th>
      <th style="padding: 1rem; text-align: center;">月額保険料</th>
      <th style="padding: 1rem; text-align: center;">払込総額（30年）</th>
      <th style="padding: 1rem; text-align: center;">解約返戻金</th>
      <th style="padding: 1rem; text-align: center;">実質利回り</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #fee2e2;">
      <td style="padding: 1rem;">終身保険A</td>
      <td style="padding: 1rem; text-align: center;">30,000円</td>
      <td style="padding: 1rem; text-align: center;">1,080万円</td>
      <td style="padding: 1rem; text-align: center;">1,150万円</td>
      <td style="padding: 1rem; text-align: center; color: #dc2626;"><strong>0.4%/年</strong></td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;">養老保険B</td>
      <td style="padding: 1rem; text-align: center;">25,000円</td>
      <td style="padding: 1rem; text-align: center;">900万円</td>
      <td style="padding: 1rem; text-align: center;">950万円</td>
      <td style="padding: 1rem; text-align: center; color: #dc2626;"><strong>0.35%/年</strong></td>
    </tr>
    <tr style="background: #dcfce7;">
      <td style="padding: 1rem;"><strong>同額の積立投資</strong></td>
      <td style="padding: 1rem; text-align: center;">30,000円</td>
      <td style="padding: 1rem; text-align: center;">1,080万円</td>
      <td style="padding: 1rem; text-align: center;">2,490万円</td>
      <td style="padding: 1rem; text-align: center; color: #16a34a;"><strong>6%/年想定</strong></td>
    </tr>
  </tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">4. 変額保険・外貨建て保険の問題点</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">隠れたコスト構造</h3>
<div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); padding: 1.5rem; border-radius: 0.5rem; margin: 1.5rem 0;">
  <h4 style="color: #7c2d12; margin: 0 0 1rem 0;">🚨 変額保険の手数料構造</h4>
  <ul style="color: #7c2d12; margin: 0; padding-left: 1.5rem;">
    <li><strong>初期費用</strong>：契約時に5-10%が即座に控除</li>
    <li><strong>保険関係費</strong>：年間2-3%の運営費</li>
    <li><strong>運用関係費</strong>：年間1-2%の信託報酬</li>
    <li><strong>解約控除</strong>：早期解約時に10-20%のペナルティ</li>
    <li><strong>合計コスト</strong>：年間3-5%以上（投資信託の3-5倍）</li>
  </ul>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">外貨建て保険の追加リスク</h3>
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: #991b1b; color: white;">
      <th style="padding: 1rem;">リスク要因</th>
      <th style="padding: 1rem;">影響度</th>
      <th style="padding: 1rem;">具体例</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #fef2f2;">
      <td style="padding: 1rem;"><strong>為替リスク</strong></td>
      <td style="padding: 1rem; text-align: center;">★★★★★</td>
      <td style="padding: 1rem;">1ドル120円→100円で-17%の損失</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>為替手数料</strong></td>
      <td style="padding: 1rem; text-align: center;">★★★☆☆</td>
      <td style="padding: 1rem;">往復で2-4%の手数料</td>
    </tr>
    <tr style="background: #fef2f2;">
      <td style="padding: 1rem;"><strong>金利リスク</strong></td>
      <td style="padding: 1rem; text-align: center;">★★★★☆</td>
      <td style="padding: 1rem;">米国金利上昇で債券価格下落</td>
    </tr>
  </tbody>
</table>
        `
      },
      {
        type: 'text',
        title: '適切な保険活用と投資戦略',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">5. 必要保障額の科学的計算</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">ライフステージ別必要保障額</h3>
<div style="background: #f0f9ff; padding: 1.5rem; border-radius: 0.5rem; border: 2px solid #0284c7; margin: 1.5rem 0;">
  <h4 style="color: #075985; margin: 0 0 1rem 0;">📊 必要保障額の計算式</h4>
  <div style="background: white; padding: 1rem; border-radius: 0.5rem; font-family: monospace;">
    必要保障額 = (遺族の生活費 × 必要年数) + 教育費 + 住居費 - (遺族年金 + 預貯金 + 配偶者収入)
  </div>
</div>

<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: linear-gradient(90deg, #0891b2, #06b6d4); color: white;">
      <th style="padding: 1rem;">ライフステージ</th>
      <th style="padding: 1rem;">必要保障額の目安</th>
      <th style="padding: 1rem;">推奨保険</th>
      <th style="padding: 1rem;">見直しポイント</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #f0f9ff;">
      <td style="padding: 1rem;"><strong>独身期</strong></td>
      <td style="padding: 1rem;">300-500万円</td>
      <td style="padding: 1rem;">医療保険中心</td>
      <td style="padding: 1rem;">就職・転職時</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>新婚期</strong></td>
      <td style="padding: 1rem;">1,000-2,000万円</td>
      <td style="padding: 1rem;">定期保険追加</td>
      <td style="padding: 1rem;">結婚時</td>
    </tr>
    <tr style="background: #f0f9ff;">
      <td style="padding: 1rem;"><strong>子育て期</strong></td>
      <td style="padding: 1rem;">3,000-5,000万円</td>
      <td style="padding: 1rem;">定期保険増額</td>
      <td style="padding: 1rem;">出産時</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>子供独立後</strong></td>
      <td style="padding: 1rem;">500-1,000万円</td>
      <td style="padding: 1rem;">保障額減額</td>
      <td style="padding: 1rem;">子供の独立時</td>
    </tr>
    <tr style="background: #f0f9ff;">
      <td style="padding: 1rem;"><strong>退職後</strong></td>
      <td style="padding: 1rem;">葬儀費用程度</td>
      <td style="padding: 1rem;">医療保険中心</td>
      <td style="padding: 1rem;">退職時</td>
    </tr>
  </tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">6. 効率的な投資戦略の構築</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">コア・サテライト戦略</h3>
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 1rem; color: white; margin: 1.5rem 0;">
  <h3 style="margin: 0 0 1rem 0;">ポートフォリオの最適配分</h3>
  
  <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
    <div style="flex: 2; background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem;">
      <h4 style="margin: 0 0 0.5rem 0;">🏛️ コア資産（70-80%）</h4>
      <ul style="margin: 0; padding-left: 1.5rem;">
        <li>全世界株式インデックス</li>
        <li>先進国債券インデックス</li>
        <li>REIT（不動産投資信託）</li>
      </ul>
    </div>
    <div style="flex: 1; background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem;">
      <h4 style="margin: 0 0 0.5rem 0;">🚀 サテライト資産（20-30%）</h4>
      <ul style="margin: 0; padding-left: 1.5rem;">
        <li>新興国株式</li>
        <li>個別株</li>
        <li>暗号資産（5%以内）</li>
      </ul>
    </div>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">年代別資産配分の目安</h3>
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: linear-gradient(90deg, #8b5cf6, #a855f7); color: white;">
      <th style="padding: 1rem;">年代</th>
      <th style="padding: 1rem;">株式</th>
      <th style="padding: 1rem;">債券</th>
      <th style="padding: 1rem;">REIT</th>
      <th style="padding: 1rem;">現金</th>
      <th style="padding: 1rem;">リスク許容度</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #faf5ff;">
      <td style="padding: 1rem;"><strong>20-30代</strong></td>
      <td style="padding: 1rem; text-align: center;">70%</td>
      <td style="padding: 1rem; text-align: center;">10%</td>
      <td style="padding: 1rem; text-align: center;">10%</td>
      <td style="padding: 1rem; text-align: center;">10%</td>
      <td style="padding: 1rem; text-align: center;">高</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>40代</strong></td>
      <td style="padding: 1rem; text-align: center;">60%</td>
      <td style="padding: 1rem; text-align: center;">20%</td>
      <td style="padding: 1rem; text-align: center;">10%</td>
      <td style="padding: 1rem; text-align: center;">10%</td>
      <td style="padding: 1rem; text-align: center;">中-高</td>
    </tr>
    <tr style="background: #faf5ff;">
      <td style="padding: 1rem;"><strong>50代</strong></td>
      <td style="padding: 1rem; text-align: center;">50%</td>
      <td style="padding: 1rem; text-align: center;">30%</td>
      <td style="padding: 1rem; text-align: center;">10%</td>
      <td style="padding: 1rem; text-align: center;">10%</td>
      <td style="padding: 1rem; text-align: center;">中</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>60代以降</strong></td>
      <td style="padding: 1rem; text-align: center;">30%</td>
      <td style="padding: 1rem; text-align: center;">40%</td>
      <td style="padding: 1rem; text-align: center;">10%</td>
      <td style="padding: 1rem; text-align: center;">20%</td>
      <td style="padding: 1rem; text-align: center;">低</td>
    </tr>
  </tbody>
</table>
        `
      },
      {
        type: 'text', 
        title: '実践的な保険見直しチェックリスト',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">7. 既存保険の見直し方法</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">保険証券チェックポイント</h3>
<div style="background: #fef3c7; padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #f59e0b; margin: 1.5rem 0;">
  <h4 style="color: #92400e; margin: 0 0 1rem 0;">📋 保険見直しの5ステップ</h4>
  <ol style="color: #78350f; margin: 0; padding-left: 1.5rem;">
    <li><strong>保険証券の収集</strong>：全ての保険証券を一箇所に集める</li>
    <li><strong>保障内容の把握</strong>：死亡保障額、入院給付金等を整理</li>
    <li><strong>保険料の確認</strong>：月額・年額の支払い総額を計算</li>
    <li><strong>必要保障額の再計算</strong>：現在のライフステージに合わせて計算</li>
    <li><strong>過不足の調整</strong>：解約・減額・新規加入の検討</li>
  </ol>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">見直しタイミングと削減可能性</h3>
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: #dc2626; color: white;">
      <th style="padding: 1rem;">保険タイプ</th>
      <th style="padding: 1rem;">削減可能性</th>
      <th style="padding: 1rem;">代替手段</th>
      <th style="padding: 1rem;">年間削減額目安</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #fee2e2;">
      <td style="padding: 1rem;"><strong>貯蓄型生命保険</strong></td>
      <td style="padding: 1rem; text-align: center;">★★★★★</td>
      <td style="padding: 1rem;">定期保険＋投資信託</td>
      <td style="padding: 1rem; text-align: center;">20-40万円</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>医療保険（過剰保障）</strong></td>
      <td style="padding: 1rem; text-align: center;">★★★★☆</td>
      <td style="padding: 1rem;">公的保険＋貯蓄</td>
      <td style="padding: 1rem; text-align: center;">5-10万円</td>
    </tr>
    <tr style="background: #fee2e2;">
      <td style="padding: 1rem;"><strong>がん保険（重複）</strong></td>
      <td style="padding: 1rem; text-align: center;">★★★☆☆</td>
      <td style="padding: 1rem;">1本に統合</td>
      <td style="padding: 1rem; text-align: center;">3-5万円</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>学資保険</strong></td>
      <td style="padding: 1rem; text-align: center;">★★★★★</td>
      <td style="padding: 1rem;">つみたてNISA</td>
      <td style="padding: 1rem; text-align: center;">10-20万円</td>
    </tr>
  </tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">8. 投資商品の選択基準</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">低コスト投資商品の比較</h3>
<div style="background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%); padding: 1.5rem; border-radius: 0.5rem; margin: 1.5rem 0;">
  <h4 style="color: #064e3b; margin: 0 0 1rem 0;">💰 コストが運用成績に与える影響（30年間）</h4>
  <table style="width: 100%; background: white; border-radius: 0.5rem; overflow: hidden;">
    <thead>
      <tr style="background: #10b981; color: white;">
        <th style="padding: 0.75rem;">信託報酬</th>
        <th style="padding: 0.75rem;">月3万円積立</th>
        <th style="padding: 0.75rem;">最終資産額</th>
        <th style="padding: 0.75rem;">コスト総額</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 0.75rem; text-align: center;"><strong>0.1%</strong></td>
        <td style="padding: 0.75rem; text-align: center;">1,080万円</td>
        <td style="padding: 0.75rem; text-align: center;">2,470万円</td>
        <td style="padding: 0.75rem; text-align: center;">20万円</td>
      </tr>
      <tr style="background: #f0fdf4;">
        <td style="padding: 0.75rem; text-align: center;"><strong>0.5%</strong></td>
        <td style="padding: 0.75rem; text-align: center;">1,080万円</td>
        <td style="padding: 0.75rem; text-align: center;">2,350万円</td>
        <td style="padding: 0.75rem; text-align: center;">120万円</td>
      </tr>
      <tr>
        <td style="padding: 0.75rem; text-align: center;"><strong>1.5%</strong></td>
        <td style="padding: 0.75rem; text-align: center;">1,080万円</td>
        <td style="padding: 0.75rem; text-align: center;">2,050万円</td>
        <td style="padding: 0.75rem; text-align: center;">420万円</td>
      </tr>
    </tbody>
  </table>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">推奨投資商品リスト</h3>
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: linear-gradient(90deg, #10b981, #14b8a6); color: white;">
      <th style="padding: 1rem;">商品カテゴリー</th>
      <th style="padding: 1rem;">具体例</th>
      <th style="padding: 1rem;">信託報酬</th>
      <th style="padding: 1rem;">特徴</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #f0fdf4;">
      <td style="padding: 1rem;"><strong>全世界株式</strong></td>
      <td style="padding: 1rem;">eMAXIS Slim全世界株式</td>
      <td style="padding: 1rem; text-align: center;">0.05775%</td>
      <td style="padding: 1rem;">分散投資の基本</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>先進国株式</strong></td>
      <td style="padding: 1rem;">SBI・V・S&P500</td>
      <td style="padding: 1rem; text-align: center;">0.0938%</td>
      <td style="padding: 1rem;">米国市場重視</td>
    </tr>
    <tr style="background: #f0fdf4;">
      <td style="padding: 1rem;"><strong>バランス型</strong></td>
      <td style="padding: 1rem;">eMAXIS Slimバランス</td>
      <td style="padding: 1rem; text-align: center;">0.143%</td>
      <td style="padding: 1rem;">株式・債券分散</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>債券</strong></td>
      <td style="padding: 1rem;">先進国債券インデックス</td>
      <td style="padding: 1rem; text-align: center;">0.154%</td>
      <td style="padding: 1rem;">安定性重視</td>
    </tr>
  </tbody>
</table>
        `
      },
      {
        type: 'text',
        title: '税制優遇制度の活用戦略',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">9. 税制優遇制度の最大活用</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">NISA・iDeCo活用優先順位</h3>
<div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); padding: 2rem; border-radius: 1rem; margin: 1.5rem 0;">
  <h3 style="color: #7c2d12; margin: 0 0 1.5rem 0;">🎯 税制優遇制度の活用順序</h3>
  
  <div style="background: rgba(255,255,255,0.9); padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
    <h4 style="color: #dc2626; margin: 0 0 0.5rem 0;">第1優先：つみたてNISA（新NISA）</h4>
    <ul style="margin: 0; padding-left: 1.5rem; color: #7c2d12;">
      <li>年間投資枠：120万円（成長投資枠と合わせて360万円）</li>
      <li>非課税期間：無期限</li>
      <li>総枠：1,800万円</li>
      <li>メリット：いつでも引き出し可能</li>
    </ul>
  </div>
  
  <div style="background: rgba(255,255,255,0.9); padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
    <h4 style="color: #ea580c; margin: 0 0 0.5rem 0;">第2優先：iDeCo</h4>
    <ul style="margin: 0; padding-left: 1.5rem; color: #7c2d12;">
      <li>年間拠出限度額：14.4-81.6万円（職業による）</li>
      <li>税制メリット：掛金全額所得控除</li>
      <li>デメリット：60歳まで引き出し不可</li>
    </ul>
  </div>
  
  <div style="background: rgba(255,255,255,0.9); padding: 1rem; border-radius: 0.5rem;">
    <h4 style="color: #f59e0b; margin: 0 0 0.5rem 0;">第3優先：特定口座</h4>
    <ul style="margin: 0; padding-left: 1.5rem; color: #7c2d12;">
      <li>投資上限：なし</li>
      <li>柔軟性：最高</li>
      <li>税率：20.315%（申告分離課税）</li>
    </ul>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">職業別iDeCo拠出限度額</h3>
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: #0284c7; color: white;">
      <th style="padding: 1rem;">職業区分</th>
      <th style="padding: 1rem;">月額上限</th>
      <th style="padding: 1rem;">年額上限</th>
      <th style="padding: 1rem;">節税効果（年収500万円）</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #e0f2fe;">
      <td style="padding: 1rem;"><strong>自営業者</strong></td>
      <td style="padding: 1rem; text-align: center;">68,000円</td>
      <td style="padding: 1rem; text-align: center;">816,000円</td>
      <td style="padding: 1rem; text-align: center;">約16万円/年</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>会社員（企業年金なし）</strong></td>
      <td style="padding: 1rem; text-align: center;">23,000円</td>
      <td style="padding: 1rem; text-align: center;">276,000円</td>
      <td style="padding: 1rem; text-align: center;">約5.5万円/年</td>
    </tr>
    <tr style="background: #e0f2fe;">
      <td style="padding: 1rem;"><strong>会社員（企業型DC加入）</strong></td>
      <td style="padding: 1rem; text-align: center;">20,000円</td>
      <td style="padding: 1rem; text-align: center;">240,000円</td>
      <td style="padding: 1rem; text-align: center;">約4.8万円/年</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>公務員</strong></td>
      <td style="padding: 1rem; text-align: center;">12,000円</td>
      <td style="padding: 1rem; text-align: center;">144,000円</td>
      <td style="padding: 1rem; text-align: center;">約2.9万円/年</td>
    </tr>
  </tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">10. 実践シミュレーション</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">30歳会社員のケーススタディ</h3>
<div style="background: #f3f4f6; padding: 1.5rem; border-radius: 0.5rem; margin: 1.5rem 0;">
  <h4 style="color: #1f2937; margin: 0 0 1rem 0;">👤 モデルケース：田中さん（30歳・既婚・子供1人）</h4>
  
  <div style="display: flex; gap: 1rem;">
    <div style="flex: 1; background: white; padding: 1rem; border-radius: 0.5rem;">
      <h5 style="color: #dc2626; margin: 0 0 0.5rem 0;">❌ Before（見直し前）</h5>
      <ul style="margin: 0; padding-left: 1.5rem; font-size: 0.9rem;">
        <li>終身保険：月3万円</li>
        <li>医療保険：月8,000円</li>
        <li>学資保険：月2万円</li>
        <li>がん保険：月3,000円</li>
        <li><strong>合計：月6.1万円</strong></li>
      </ul>
    </div>
    
    <div style="flex: 1; background: white; padding: 1rem; border-radius: 0.5rem;">
      <h5 style="color: #16a34a; margin: 0 0 0.5rem 0;">✅ After（見直し後）</h5>
      <ul style="margin: 0; padding-left: 1.5rem; font-size: 0.9rem;">
        <li>定期保険：月2,000円</li>
        <li>医療保険：月3,000円</li>
        <li>つみたてNISA：月3.3万円</li>
        <li>iDeCo：月2.3万円</li>
        <li><strong>合計：月6.1万円</strong></li>
      </ul>
    </div>
  </div>
  
  <div style="background: #10b981; color: white; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem;">
    <strong>30年後の資産差：約3,500万円（見直し後が多い）</strong>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">年代別最適配分モデル</h3>
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: linear-gradient(90deg, #8b5cf6, #ec4899); color: white;">
      <th style="padding: 1rem;">項目</th>
      <th style="padding: 1rem;">20代</th>
      <th style="padding: 1rem;">30代</th>
      <th style="padding: 1rem;">40代</th>
      <th style="padding: 1rem;">50代</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #faf5ff;">
      <td style="padding: 1rem;"><strong>保険料割合</strong></td>
      <td style="padding: 1rem; text-align: center;">5%</td>
      <td style="padding: 1rem; text-align: center;">10%</td>
      <td style="padding: 1rem; text-align: center;">10%</td>
      <td style="padding: 1rem; text-align: center;">5%</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>投資割合</strong></td>
      <td style="padding: 1rem; text-align: center;">25%</td>
      <td style="padding: 1rem; text-align: center;">20%</td>
      <td style="padding: 1rem; text-align: center;">25%</td>
      <td style="padding: 1rem; text-align: center;">30%</td>
    </tr>
    <tr style="background: #faf5ff;">
      <td style="padding: 1rem;"><strong>緊急資金</strong></td>
      <td style="padding: 1rem; text-align: center;">生活費3ヶ月</td>
      <td style="padding: 1rem; text-align: center;">生活費6ヶ月</td>
      <td style="padding: 1rem; text-align: center;">生活費6ヶ月</td>
      <td style="padding: 1rem; text-align: center;">生活費1年</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>主な目標</strong></td>
      <td style="padding: 1rem; text-align: center;">資産形成開始</td>
      <td style="padding: 1rem; text-align: center;">教育資金準備</td>
      <td style="padding: 1rem; text-align: center;">老後資金加速</td>
      <td style="padding: 1rem; text-align: center;">退職準備</td>
    </tr>
  </tbody>
</table>
        `
      },
      {
        type: 'text',
        title: 'まとめと実践ステップ',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">実践への道筋</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">今すぐできる5つのアクション</h3>
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 1rem; color: white; margin: 1.5rem 0;">
  <h3 style="margin: 0 0 1.5rem 0;">🚀 実践チェックリスト</h3>
  
  <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.75rem;">
    <input type="checkbox" id="step1" style="margin-right: 0.5rem;">
    <label for="step1"><strong>Step 1：保険証券の整理</strong> - 全ての保険証券を一覧化する</label>
  </div>
  
  <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.75rem;">
    <input type="checkbox" id="step2" style="margin-right: 0.5rem;">
    <label for="step2"><strong>Step 2：必要保障額の計算</strong> - ライフプランに基づいて算出</label>
  </div>
  
  <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.75rem;">
    <input type="checkbox" id="step3" style="margin-right: 0.5rem;">
    <label for="step3"><strong>Step 3：NISA口座開設</strong> - まだの場合は即座に手続き</label>
  </div>
  
  <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.75rem;">
    <input type="checkbox" id="step4" style="margin-right: 0.5rem;">
    <label for="step4"><strong>Step 4：投資商品の選定</strong> - 低コストインデックスファンド中心</label>
  </div>
  
  <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem;">
    <input type="checkbox" id="step5" style="margin-right: 0.5rem;">
    <label for="step5"><strong>Step 5：自動積立設定</strong> - 給料日直後に自動引き落とし</label>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">よくある間違いと対策</h3>
<div style="background: #fef2f2; padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #dc2626; margin: 1.5rem 0;">
  <h4 style="color: #991b1b; margin: 0 0 1rem 0;">⚠️ 避けるべき5つの落とし穴</h4>
  <ol style="color: #7f1d1d; margin: 0; padding-left: 1.5rem;">
    <li><strong>「保険で運用」という幻想</strong> → 保険と投資は完全分離</li>
    <li><strong>過剰な医療保険</strong> → 高額療養費制度を理解する</li>
    <li><strong>短期的な損益に一喜一憂</strong> → 長期投資の原則を守る</li>
    <li><strong>手数料の軽視</strong> → 年0.5%の差が30年で420万円の差に</li>
    <li><strong>集中投資のリスク</strong> → 分散投資の徹底</li>
  </ol>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">成功への重要ポイント</h3>
<div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); padding: 1.5rem; border-radius: 0.5rem; margin: 1.5rem 0;">
  <h4 style="color: #064e3b; margin: 0 0 1rem 0;">✨ 資産形成成功の3原則</h4>
  <div style="display: flex; gap: 1rem;">
    <div style="flex: 1; background: rgba(255,255,255,0.9); padding: 1rem; border-radius: 0.5rem; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">⏰</div>
      <strong style="color: #064e3b;">時間を味方に</strong>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; color: #065f46;">複利効果は時間とともに加速</p>
    </div>
    <div style="flex: 1; background: rgba(255,255,255,0.9); padding: 1rem; border-radius: 0.5rem; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">💰</div>
      <strong style="color: #064e3b;">コストを最小に</strong>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; color: #065f46;">手数料1%の差が大きな差に</p>
    </div>
    <div style="flex: 1; background: rgba(255,255,255,0.9); padding: 1rem; border-radius: 0.5rem; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎯</div>
      <strong style="color: #064e3b;">継続を力に</strong>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; color: #065f46;">毎月の積立が未来を作る</p>
    </div>
  </div>
</div>
        `
      }
    ],
    keyPoints: [
      '保険は「リスク管理」、投資は「資産形成」という本質的な違いを理解する',
      '貯蓄型保険の実質利回りは年0.3-0.5%程度と極めて低い',
      '必要保障額は定期保険で確保し、余剰資金は投資に回すのが合理的',
      'NISA・iDeCoなどの税制優遇制度を最大限活用する',
      '手数料が長期運用成績に与える影響は甚大（30年で数百万円の差）'
    ],
    summary: `
保険と投資を適切に使い分けることは、効率的な資産形成の基盤となります。保険は「起きる確率は低いが、起きたら耐えられない損失」に備えるリスク管理ツールであり、投資は長期的な資産成長を目指すツールです。

貯蓄型保険や変額保険は、保険と投資を混在させた結果、どちらの機能も中途半端になり、高コストで非効率な商品となっています。必要な保障は掛け捨ての定期保険で確保し、資産形成は低コストのインデックス投資で行うことで、同じ支出でも30年後には数千万円の差が生まれます。

今すぐ保険の見直しを行い、NISA口座を開設して、月1万円からでも投資を始めることが、将来の経済的自由への第一歩となります。
    `,
    practicalExamples: [
      '30歳会社員が月6万円の保険料を「定期保険1万円＋投資5万円」に変更すると30年後に3,500万円の差',
      '終身保険（月3万円）をやめて、つみたてNISAで同額投資すれば、30年後に1,400万円多い資産形成が可能',
      '医療保険を見直し、高額療養費制度を活用することで、年間10万円の保険料削減',
      '学資保険（利回り0.3%）をつみたてNISA（期待利回り6%）に変更で、18年後に2倍の教育資金',
      'iDeCoで年27.6万円拠出すると、年収500万円なら年5.5万円の節税効果'
    ],
    warningNotes: [
      '保険の解約時は解約返戻金の確認と、新規保険の加入可否を事前に確認',
      '持病がある場合は、既存の医療保険を安易に解約しない',
      '投資にはリスクがあり、元本保証はないことを理解する',
      '生活防衛資金（生活費6ヶ月分）を確保してから投資を開始',
      '投資判断は自己責任であり、必要に応じて専門家に相談'
    ]
  },

  quiz: [
    {
      id: 'insurance-investment-1',
      question: '保険と投資の本質的な違いとして最も適切な説明はどれですか？',
      options: [
        '保険は資産を増やすツール、投資はリスク管理ツール',
        '保険はリスク管理ツール、投資は資産形成ツール',
        '保険も投資も同じ金融商品で違いはない',
        '保険の方が投資より確実にお金が増える'
      ],
      correctAnswer: 1,
      explanation: '保険の本質は「リスク移転」であり、起きる確率は低いが起きたら耐えられない損失から身を守るツールです。一方、投資は経済成長や企業利益を通じて資産を増やすツールです。この違いを理解することが適切な金融商品選択の基礎となります。'
    },
    {
      id: 'insurance-investment-2',
      question: '30歳の会社員が月3万円を30年間運用する場合、終身保険（実質利回り0.4%）と投資信託（期待利回り6%）では最終的な資産額にどの程度の差が生じますか？',
      options: [
        '約100万円（投資信託が多い）',
        '約500万円（投資信託が多い）',
        '約1,400万円（投資信託が多い）',
        'ほとんど差はない'
      ],
      correctAnswer: 2,
      explanation: '終身保険（利回り0.4%）では30年後に約1,150万円、投資信託（利回り6%）では約2,490万円となり、差額は約1,340万円になります。わずかな利回りの差が、長期では大きな資産差を生む複利効果の威力を示しています。'
    },
    {
      id: 'insurance-investment-3',
      question: '変額保険や外貨建て保険の問題点として適切でないものはどれですか？',
      options: [
        '初期費用や保険関係費など、年間3-5%以上の高いコスト',
        '為替リスクによる元本割れの可能性',
        '早期解約時の大きなペナルティ',
        '元本保証があり安全性が高い'
      ],
      correctAnswer: 3,
      explanation: '変額保険や外貨建て保険には元本保証はありません。むしろ高いコスト構造、為替リスク、解約控除などにより、投資信託の直接購入と比べて著しく不利な条件となっています。これらの商品は避け、保険と投資は分けて考えるべきです。'
    },
    {
      id: 'insurance-investment-4', 
      question: '子育て世帯（子供2人）の必要死亡保障額の目安として最も適切なものはどれですか？',
      options: [
        '500万円程度',
        '1,000万円程度',
        '3,000-5,000万円程度',
        '1億円以上'
      ],
      correctAnswer: 2,
      explanation: '子育て世帯の必要保障額は、遺族の生活費、教育費、住居費から遺族年金や配偶者収入を差し引いて計算します。一般的に3,000-5,000万円程度が目安となりますが、この額は定期保険なら月数千円で確保でき、残りの資金を投資に回すことが合理的です。'
    },
    {
      id: 'insurance-investment-5',
      question: '税制優遇制度の活用優先順位として最も適切なものはどれですか？',
      options: [
        '特定口座 → iDeCo → NISA',
        'iDeCo → NISA → 特定口座',
        'NISA → iDeCo → 特定口座',
        '保険 → NISA → iDeCo'
      ],
      correctAnswer: 2,
      explanation: 'まずNISA（特に新NISA）を優先すべきです。非課税期間が無期限で、いつでも引き出し可能な柔軟性があります。次にiDeCoは所得控除のメリットが大きいですが、60歳まで引き出せない制約があります。これらの枠を使い切ってから特定口座を利用するのが最も税効率的です。'
    }
  ],
  
  lastUpdated: '2025-08-15',
  factChecked: true
}