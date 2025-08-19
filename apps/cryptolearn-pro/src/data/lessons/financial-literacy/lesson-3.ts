import type { Lesson } from '@/types';

export const lesson3: Lesson = {
  id: 'financial-literacy-personal-finance',
  categoryId: 'financial-literacy',
  title: '個人財務管理の基本',
  slug: 'personal-finance-basics',
  description: '収支管理、予算作成、貯蓄計画など、投資を始める前に必要な個人財務管理の基礎を学びます',
  difficultyLevel: 'beginner',
  estimatedMinutes: 25,
  orderIndex: 3,
  content: {
    sections: [
      {
        id: 'section-1',
        title: '個人財務管理とは',
        orderIndex: 1,
        type: 'text',
        content: `
<p>個人財務管理は、収入と支出を適切に管理し、将来の目標に向けて資産を形成するための基礎となる活動です。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">財務管理の3つの柱</h2>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 2rem 0;">
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem; text-align: center;">
<h3 style="font-size: 1.5em; margin: 0 0 0.5rem 0;">収支管理</h3>
<p style="font-size: 1.1em; margin: 0.5rem 0;">収入と支出の把握</p>
<p style="font-size: 0.9em; margin: 0;">毎月の現金フロー確認</p>
</div>
<div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem; text-align: center;">
<h3 style="font-size: 1.5em; margin: 0 0 0.5rem 0;">貯蓄計画</h3>
<p style="font-size: 1.1em; margin: 0.5rem 0;">目標設定と実行</p>
<p style="font-size: 0.9em; margin: 0;">緊急資金の確保</p>
</div>
<div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem; text-align: center;">
<h3 style="font-size: 1.5em; margin: 0 0 0.5rem 0;">資産形成</h3>
<p style="font-size: 1.1em; margin: 0.5rem 0;">投資への準備</p>
<p style="font-size: 0.9em; margin: 0;">長期的な成長</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">なぜ個人財務管理が重要なのか</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #3b82f6; color: white;">
<th style="padding: 1rem; text-align: left; border: 1px solid #2563eb;">管理している人</th>
<th style="padding: 1rem; text-align: left; border: 1px solid #2563eb;">管理していない人</th>
</tr>
</thead>
<tbody>
<tr style="background: #eff6ff;">
<td style="padding: 1rem; border: 1px solid #dbeafe;">✅ 毎月の貯蓄ができる</td>
<td style="padding: 1rem; border: 1px solid #dbeafe;">❌ お金が残らない</td>
</tr>
<tr style="background: white;">
<td style="padding: 1rem; border: 1px solid #dbeafe;">✅ 緊急時の備えがある</td>
<td style="padding: 1rem; border: 1px solid #dbeafe;">❌ 急な出費で困る</td>
</tr>
<tr style="background: #eff6ff;">
<td style="padding: 1rem; border: 1px solid #dbeafe;">✅ 目標に向けて前進</td>
<td style="padding: 1rem; border: 1px solid #dbeafe;">❌ 将来が不安</td>
</tr>
<tr style="background: white;">
<td style="padding: 1rem; border: 1px solid #dbeafe;">✅ 投資の余裕がある</td>
<td style="padding: 1rem; border: 1px solid #dbeafe;">❌ 投資どころではない</td>
</tr>
</tbody>
</table>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0;">
<h3 style="color: #d97706; margin: 0 0 0.5rem 0;">💡 重要な統計</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
<li style="margin: 0.5rem 0;">日本人の約35%が「貯蓄ゼロ」という現実（2025年データ）</li>
<li style="margin: 0.5rem 0;">財務管理を実践している人の平均貯蓄額は、そうでない人の3.8倍</li>
<li style="margin: 0.5rem 0;">緊急資金として生活費の3〜6ヶ月分が推奨される</li>
</ul>
</div>
        `
      },
      {
        id: 'section-2',
        title: '収支管理の実践方法',
        orderIndex: 2,
        type: 'text',
        content: `
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">収入と支出の把握</h2>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<h3 style="color: #1f2937; margin: 0 0 1rem 0;">月次収支表の作成例</h3>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
<thead>
<tr style="background: #f3f4f6;">
<th style="padding: 0.75rem; text-align: left; border: 1px solid #d1d5db;">項目</th>
<th style="padding: 0.75rem; text-align: right; border: 1px solid #d1d5db;">金額</th>
<th style="padding: 0.75rem; text-align: right; border: 1px solid #d1d5db;">割合</th>
</tr>
</thead>
<tbody>
<tr style="background: #dcfce7;">
<td style="padding: 0.75rem; border: 1px solid #d1d5db; font-weight: bold;">【収入】</td>
<td style="padding: 0.75rem; text-align: right; border: 1px solid #d1d5db; font-weight: bold;">300,000円</td>
<td style="padding: 0.75rem; text-align: right; border: 1px solid #d1d5db;">100%</td>
</tr>
<tr>
<td style="padding: 0.75rem; border: 1px solid #d1d5db;">給与（手取り）</td>
<td style="padding: 0.75rem; text-align: right; border: 1px solid #d1d5db;">280,000円</td>
<td style="padding: 0.75rem; text-align: right; border: 1px solid #d1d5db;">93.3%</td>
</tr>
<tr>
<td style="padding: 0.75rem; border: 1px solid #d1d5db;">副収入</td>
<td style="padding: 0.75rem; text-align: right; border: 1px solid #d1d5db;">20,000円</td>
<td style="padding: 0.75rem; text-align: right; border: 1px solid #d1d5db;">6.7%</td>
</tr>
<tr style="background: #fee2e2;">
<td style="padding: 0.75rem; border: 1px solid #d1d5db; font-weight: bold;">【支出】</td>
<td style="padding: 0.75rem; text-align: right; border: 1px solid #d1d5db; font-weight: bold;">240,000円</td>
<td style="padding: 0.75rem; text-align: right; border: 1px solid #d1d5db;">80%</td>
</tr>
<tr>
<td style="padding: 0.75rem; border: 1px solid #d1d5db;">住居費</td>
<td style="padding: 0.75rem; text-align: right; border: 1px solid #d1d5db;">80,000円</td>
<td style="padding: 0.75rem; text-align: right; border: 1px solid #d1d5db;">26.7%</td>
</tr>
<tr>
<td style="padding: 0.75rem; border: 1px solid #d1d5db;">食費</td>
<td style="padding: 0.75rem; text-align: right; border: 1px solid #d1d5db;">45,000円</td>
<td style="padding: 0.75rem; text-align: right; border: 1px solid #d1d5db;">15%</td>
</tr>
<tr>
<td style="padding: 0.75rem; border: 1px solid #d1d5db;">光熱費・通信費</td>
<td style="padding: 0.75rem; text-align: right; border: 1px solid #d1d5db;">25,000円</td>
<td style="padding: 0.75rem; text-align: right; border: 1px solid #d1d5db;">8.3%</td>
</tr>
<tr>
<td style="padding: 0.75rem; border: 1px solid #d1d5db;">保険料</td>
<td style="padding: 0.75rem; text-align: right; border: 1px solid #d1d5db;">20,000円</td>
<td style="padding: 0.75rem; text-align: right; border: 1px solid #d1d5db;">6.7%</td>
</tr>
<tr>
<td style="padding: 0.75rem; border: 1px solid #d1d5db;">交際費・娯楽費</td>
<td style="padding: 0.75rem; text-align: right; border: 1px solid #d1d5db;">30,000円</td>
<td style="padding: 0.75rem; text-align: right; border: 1px solid #d1d5db;">10%</td>
</tr>
<tr>
<td style="padding: 0.75rem; border: 1px solid #d1d5db;">その他</td>
<td style="padding: 0.75rem; text-align: right; border: 1px solid #d1d5db;">40,000円</td>
<td style="padding: 0.75rem; text-align: right; border: 1px solid #d1d5db;">13.3%</td>
</tr>
<tr style="background: #dbeafe;">
<td style="padding: 0.75rem; border: 1px solid #d1d5db; font-weight: bold;">【貯蓄】</td>
<td style="padding: 0.75rem; text-align: right; border: 1px solid #d1d5db; font-weight: bold;">60,000円</td>
<td style="padding: 0.75rem; text-align: right; border: 1px solid #d1d5db; font-weight: bold;">20%</td>
</tr>
</tbody>
</table>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">支出削減の優先順位</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
<div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0;">🔴 削減しやすい支出</h3>
<ul style="margin: 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;">外食費（自炊で50%削減可能）</li>
<li style="margin: 0.5rem 0;">サブスクリプション（不要なものを解約）</li>
<li style="margin: 0.5rem 0;">衝動買い（24時間ルール導入）</li>
<li style="margin: 0.5rem 0;">コンビニ利用（スーパー活用）</li>
</ul>
</div>
<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #2563eb; margin: 0 0 1rem 0;">🔵 削減が難しい支出</h3>
<ul style="margin: 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;">住居費（引っ越しコストが高い）</li>
<li style="margin: 0.5rem 0;">保険料（必要な保障は維持）</li>
<li style="margin: 0.5rem 0;">教育費（将来への投資）</li>
<li style="margin: 0.5rem 0;">医療費（健康は最優先）</li>
</ul>
</div>
</div>
        `
      },
      {
        id: 'section-3',
        title: '効果的な貯蓄戦略',
        orderIndex: 3,
        type: 'text',
        content: `
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">先取り貯蓄の威力</h2>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<h3 style="font-size: 1.5em; margin: 0 0 1rem 0; text-align: center;">給料日に自動的に貯蓄する仕組み</h3>
<div style="display: flex; justify-content: space-around; align-items: center; margin: 1.5rem 0;">
<div style="text-align: center;">
<div style="font-size: 2em; font-weight: bold;">①</div>
<p style="margin: 0.5rem 0;">給料受取</p>
</div>
<div style="font-size: 2em;">→</div>
<div style="text-align: center;">
<div style="font-size: 2em; font-weight: bold;">②</div>
<p style="margin: 0.5rem 0;">自動振替</p>
</div>
<div style="font-size: 2em;">→</div>
<div style="text-align: center;">
<div style="font-size: 2em; font-weight: bold;">③</div>
<p style="margin: 0.5rem 0;">貯蓄完了</p>
</div>
</div>
<p style="text-align: center; font-size: 1.1em; margin: 1rem 0 0 0;">残ったお金で生活する習慣が身につく</p>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">目的別貯蓄の配分</h2>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin: 1rem 0;">
<div style="background: #fee2e2; border-radius: 8px; padding: 1rem; text-align: center;">
<h4 style="color: #dc2626; margin: 0 0 0.5rem 0;">緊急資金</h4>
<div style="font-size: 2em; font-weight: bold; color: #dc2626;">30%</div>
<p style="font-size: 0.9em; margin: 0.5rem 0 0 0;">生活費3-6ヶ月分</p>
</div>
<div style="background: #dcfce7; border-radius: 8px; padding: 1rem; text-align: center;">
<h4 style="color: #16a34a; margin: 0 0 0.5rem 0;">短期目標</h4>
<div style="font-size: 2em; font-weight: bold; color: #16a34a;">25%</div>
<p style="font-size: 0.9em; margin: 0.5rem 0 0 0;">1-2年以内の目標</p>
</div>
<div style="background: #dbeafe; border-radius: 8px; padding: 1rem; text-align: center;">
<h4 style="color: #2563eb; margin: 0 0 0.5rem 0;">中期目標</h4>
<div style="font-size: 2em; font-weight: bold; color: #2563eb;">25%</div>
<p style="font-size: 0.9em; margin: 0.5rem 0 0 0;">3-5年の計画</p>
</div>
<div style="background: #f3e8ff; border-radius: 8px; padding: 1rem; text-align: center;">
<h4 style="color: #7c3aed; margin: 0 0 0.5rem 0;">投資資金</h4>
<div style="font-size: 2em; font-weight: bold; color: #7c3aed;">20%</div>
<p style="font-size: 0.9em; margin: 0.5rem 0 0 0;">長期運用</p>
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">貯蓄を加速させるテクニック</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #6366f1; color: white;">
<th style="padding: 1rem; text-align: left;">テクニック</th>
<th style="padding: 1rem; text-align: left;">効果</th>
<th style="padding: 1rem; text-align: center;">実施難易度</th>
</tr>
</thead>
<tbody>
<tr style="background: white;">
<td style="padding: 1rem; border: 1px solid #e5e7eb;">500円玉貯金</td>
<td style="padding: 1rem; border: 1px solid #e5e7eb;">年間3-5万円の貯蓄</td>
<td style="padding: 1rem; text-align: center; border: 1px solid #e5e7eb;">⭐</td>
</tr>
<tr style="background: #f9fafb;">
<td style="padding: 1rem; border: 1px solid #e5e7eb;">つもり貯金</td>
<td style="padding: 1rem; border: 1px solid #e5e7eb;">月1-2万円の節約</td>
<td style="padding: 1rem; text-align: center; border: 1px solid #e5e7eb;">⭐⭐</td>
</tr>
<tr style="background: white;">
<td style="padding: 1rem; border: 1px solid #e5e7eb;">ボーナス全額貯蓄</td>
<td style="padding: 1rem; border: 1px solid #e5e7eb;">年間50万円以上可能</td>
<td style="padding: 1rem; text-align: center; border: 1px solid #e5e7eb;">⭐⭐⭐</td>
</tr>
<tr style="background: #f9fafb;">
<td style="padding: 1rem; border: 1px solid #e5e7eb;">副業収入全額貯蓄</td>
<td style="padding: 1rem; border: 1px solid #e5e7eb;">年間20-100万円</td>
<td style="padding: 1rem; text-align: center; border: 1px solid #e5e7eb;">⭐⭐⭐⭐</td>
</tr>
</tbody>
</table>
        `
      },
      {
        id: 'section-4',
        title: '予算管理の実践',
        orderIndex: 4,
        type: 'text',
        content: `
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">50/30/20ルール</h2>

<div style="background: white; border: 2px solid #3b82f6; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<div style="display: flex; align-items: center; justify-content: space-around; margin: 1.5rem 0;">
<div style="text-align: center;">
<div style="width: 120px; height: 120px; border-radius: 50%; background: #ef4444; display: flex; align-items: center; justify-content: center; color: white; font-size: 2em; font-weight: bold; margin: 0 auto 0.5rem auto;">50%</div>
<h4 style="margin: 0;">必要経費</h4>
<p style="font-size: 0.9em; color: #6b7280; margin: 0.5rem 0 0 0;">住居・食費・光熱費</p>
</div>
<div style="text-align: center;">
<div style="width: 120px; height: 120px; border-radius: 50%; background: #f59e0b; display: flex; align-items: center; justify-content: center; color: white; font-size: 2em; font-weight: bold; margin: 0 auto 0.5rem auto;">30%</div>
<h4 style="margin: 0;">娯楽費</h4>
<p style="font-size: 0.9em; color: #6b7280; margin: 0.5rem 0 0 0;">趣味・外食・旅行</p>
</div>
<div style="text-align: center;">
<div style="width: 120px; height: 120px; border-radius: 50%; background: #10b981; display: flex; align-items: center; justify-content: center; color: white; font-size: 2em; font-weight: bold; margin: 0 auto 0.5rem auto;">20%</div>
<h4 style="margin: 0;">貯蓄・投資</h4>
<p style="font-size: 0.9em; color: #6b7280; margin: 0.5rem 0 0 0;">将来への備え</p>
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">月次予算の立て方</h2>

<div style="background: #f8fafc; border: 2px solid #cbd5e1; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<h3 style="color: #475569; margin: 0 0 1rem 0;">手取り30万円の場合の予算例</h3>

<table style="width: 100%; border-collapse: collapse;">
<thead>
<tr style="background: #e2e8f0;">
<th style="padding: 0.75rem; text-align: left;">カテゴリー</th>
<th style="padding: 0.75rem; text-align: right;">予算額</th>
<th style="padding: 0.75rem; text-align: right;">実際の支出</th>
<th style="padding: 0.75rem; text-align: center;">差額</th>
</tr>
</thead>
<tbody>
<tr>
<td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0;"><strong>【必要経費 50%】</strong></td>
<td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #e2e8f0;"><strong>150,000円</strong></td>
<td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #e2e8f0;"></td>
<td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e2e8f0;"></td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 0.5rem 0.75rem 0.5rem 2rem;">家賃</td>
<td style="padding: 0.5rem 0.75rem; text-align: right;">80,000円</td>
<td style="padding: 0.5rem 0.75rem; text-align: right;">80,000円</td>
<td style="padding: 0.5rem 0.75rem; text-align: center; color: #16a34a;">0円</td>
</tr>
<tr>
<td style="padding: 0.5rem 0.75rem 0.5rem 2rem;">食費</td>
<td style="padding: 0.5rem 0.75rem; text-align: right;">35,000円</td>
<td style="padding: 0.5rem 0.75rem; text-align: right;">38,000円</td>
<td style="padding: 0.5rem 0.75rem; text-align: center; color: #dc2626;">-3,000円</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 0.5rem 0.75rem 0.5rem 2rem;">光熱費</td>
<td style="padding: 0.5rem 0.75rem; text-align: right;">15,000円</td>
<td style="padding: 0.5rem 0.75rem; text-align: right;">14,000円</td>
<td style="padding: 0.5rem 0.75rem; text-align: center; color: #16a34a;">+1,000円</td>
</tr>
<tr>
<td style="padding: 0.5rem 0.75rem 0.5rem 2rem;">通信費</td>
<td style="padding: 0.5rem 0.75rem; text-align: right;">10,000円</td>
<td style="padding: 0.5rem 0.75rem; text-align: right;">10,000円</td>
<td style="padding: 0.5rem 0.75rem; text-align: center; color: #16a34a;">0円</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 0.5rem 0.75rem 0.5rem 2rem;">保険料</td>
<td style="padding: 0.5rem 0.75rem; text-align: right;">10,000円</td>
<td style="padding: 0.5rem 0.75rem; text-align: right;">10,000円</td>
<td style="padding: 0.5rem 0.75rem; text-align: center; color: #16a34a;">0円</td>
</tr>
<tr>
<td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0;"><strong>【娯楽費 30%】</strong></td>
<td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #e2e8f0;"><strong>90,000円</strong></td>
<td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #e2e8f0;"></td>
<td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e2e8f0;"></td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 0.5rem 0.75rem 0.5rem 2rem;">交際費</td>
<td style="padding: 0.5rem 0.75rem; text-align: right;">30,000円</td>
<td style="padding: 0.5rem 0.75rem; text-align: right;">25,000円</td>
<td style="padding: 0.5rem 0.75rem; text-align: center; color: #16a34a;">+5,000円</td>
</tr>
<tr>
<td style="padding: 0.5rem 0.75rem 0.5rem 2rem;">趣味・娯楽</td>
<td style="padding: 0.5rem 0.75rem; text-align: right;">30,000円</td>
<td style="padding: 0.5rem 0.75rem; text-align: right;">35,000円</td>
<td style="padding: 0.5rem 0.75rem; text-align: center; color: #dc2626;">-5,000円</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 0.5rem 0.75rem 0.5rem 2rem;">被服費</td>
<td style="padding: 0.5rem 0.75rem; text-align: right;">15,000円</td>
<td style="padding: 0.5rem 0.75rem; text-align: right;">12,000円</td>
<td style="padding: 0.5rem 0.75rem; text-align: center; color: #16a34a;">+3,000円</td>
</tr>
<tr>
<td style="padding: 0.5rem 0.75rem 0.5rem 2rem;">その他</td>
<td style="padding: 0.5rem 0.75rem; text-align: right;">15,000円</td>
<td style="padding: 0.5rem 0.75rem; text-align: right;">18,000円</td>
<td style="padding: 0.5rem 0.75rem; text-align: center; color: #dc2626;">-3,000円</td>
</tr>
<tr style="background: #dbeafe;">
<td style="padding: 0.75rem;"><strong>【貯蓄・投資 20%】</strong></td>
<td style="padding: 0.75rem; text-align: right;"><strong>60,000円</strong></td>
<td style="padding: 0.75rem; text-align: right;"><strong>60,000円</strong></td>
<td style="padding: 0.75rem; text-align: center; color: #16a34a;"><strong>達成！</strong></td>
</tr>
</tbody>
</table>
</div>
        `
      },
      {
        id: 'section-5',
        title: '投資への準備',
        orderIndex: 5,
        type: 'text',
        content: `
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">投資を始める前のチェックリスト</h2>

<div style="background: white; border: 2px solid #10b981; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<div style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
<div style="display: flex; align-items: center; padding: 1rem; background: #f0fdf4; border-radius: 8px;">
<div style="font-size: 1.5em; margin-right: 1rem;">✅</div>
<div>
<h4 style="margin: 0; color: #16a34a;">緊急資金の確保</h4>
<p style="margin: 0.5rem 0 0 0; color: #6b7280;">生活費の3〜6ヶ月分を確保</p>
</div>
</div>
<div style="display: flex; align-items: center; padding: 1rem; background: #f0fdf4; border-radius: 8px;">
<div style="font-size: 1.5em; margin-right: 1rem;">✅</div>
<div>
<h4 style="margin: 0; color: #16a34a;">高金利債務の返済</h4>
<p style="margin: 0.5rem 0 0 0; color: #6b7280;">クレジットカードのリボ払いなどを完済</p>
</div>
</div>
<div style="display: flex; align-items: center; padding: 1rem; background: #f0fdf4; border-radius: 8px;">
<div style="font-size: 1.5em; margin-right: 1rem;">✅</div>
<div>
<h4 style="margin: 0; color: #16a34a;">安定した収入源</h4>
<p style="margin: 0.5rem 0 0 0; color: #6b7280;">継続的な収入があること</p>
</div>
</div>
<div style="display: flex; align-items: center; padding: 1rem; background: #f0fdf4; border-radius: 8px;">
<div style="font-size: 1.5em; margin-right: 1rem;">✅</div>
<div>
<h4 style="margin: 0; color: #16a34a;">投資の基礎知識</h4>
<p style="margin: 0.5rem 0 0 0; color: #6b7280;">リスクとリターンの理解</p>
</div>
</div>
<div style="display: flex; align-items: center; padding: 1rem; background: #f0fdf4; border-radius: 8px;">
<div style="font-size: 1.5em; margin-right: 1rem;">✅</div>
<div>
<h4 style="margin: 0; color: #16a34a;">余裕資金の確保</h4>
<p style="margin: 0.5rem 0 0 0; color: #6b7280;">なくなっても生活に困らない資金</p>
</div>
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">リスク許容度の把握</h2>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 2rem 0;">
<div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #16a34a; margin: 0 0 1rem 0; text-align: center;">保守的</h3>
<ul style="margin: 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;">元本保証重視</li>
<li style="margin: 0.5rem 0;">定期預金・国債</li>
<li style="margin: 0.5rem 0;">リターン: 0.01-0.3%</li>
<li style="margin: 0.5rem 0;">リスク: 極小</li>
</ul>
</div>
<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #d97706; margin: 0 0 1rem 0; text-align: center;">バランス型</h3>
<ul style="margin: 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;">リスク分散重視</li>
<li style="margin: 0.5rem 0;">新NISA・投資信託・ETF</li>
<li style="margin: 0.5rem 0;">リターン: 3-7%</li>
<li style="margin: 0.5rem 0;">リスク: 中程度</li>
</ul>
</div>
<div style="background: #fee2e2; border: 2px solid #ef4444; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0; text-align: center;">積極的</h3>
<ul style="margin: 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;">高リターン追求</li>
<li style="margin: 0.5rem 0;">個別株・暗号資産</li>
<li style="margin: 0.5rem 0;">リターン: 10%以上</li>
<li style="margin: 0.5rem 0;">リスク: 高</li>
</ul>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">投資資金の作り方</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #4f46e5; color: white;">
<th style="padding: 1rem; text-align: left;">方法</th>
<th style="padding: 1rem; text-align: right;">月額目安</th>
<th style="padding: 1rem; text-align: right;">年間積立額</th>
</tr>
</thead>
<tbody>
<tr style="background: white;">
<td style="padding: 1rem; border: 1px solid #e5e7eb;">固定費の見直し</td>
<td style="padding: 1rem; text-align: right; border: 1px solid #e5e7eb;">10,000円</td>
<td style="padding: 1rem; text-align: right; border: 1px solid #e5e7eb;">120,000円</td>
</tr>
<tr style="background: #f9fafb;">
<td style="padding: 1rem; border: 1px solid #e5e7eb;">ボーナスの一部活用</td>
<td style="padding: 1rem; text-align: right; border: 1px solid #e5e7eb;">20,000円</td>
<td style="padding: 1rem; text-align: right; border: 1px solid #e5e7eb;">240,000円</td>
</tr>
<tr style="background: white;">
<td style="padding: 1rem; border: 1px solid #e5e7eb;">副業収入</td>
<td style="padding: 1rem; text-align: right; border: 1px solid #e5e7eb;">30,000円</td>
<td style="padding: 1rem; text-align: right; border: 1px solid #e5e7eb;">360,000円</td>
</tr>
<tr style="background: #dbeafe;">
<td style="padding: 1rem; border: 1px solid #e5e7eb; font-weight: bold;">合計</td>
<td style="padding: 1rem; text-align: right; border: 1px solid #e5e7eb; font-weight: bold;">60,000円</td>
<td style="padding: 1rem; text-align: right; border: 1px solid #e5e7eb; font-weight: bold;">720,000円</td>
</tr>
</tbody>
</table>
        `
      },
      {
        id: 'section-6',
        title: '個人財務管理の実践と注意点',
        orderIndex: 6,
        type: 'text',
        content: `
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">よくある失敗と対策</h2>

<div style="background: white; border: 2px solid #ef4444; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<table style="width: 100%; border-collapse: collapse;">
<thead>
<tr style="background: #fef2f2;">
<th style="padding: 1rem; text-align: left; color: #dc2626;">よくある失敗</th>
<th style="padding: 1rem; text-align: left; color: #dc2626;">対策</th>
</tr>
</thead>
<tbody>
<tr>
<td style="padding: 1rem; border-bottom: 1px solid #fee2e2;">
<strong>🔴 予算を立てるだけで満足</strong><br/>
<span style="color: #6b7280; font-size: 0.9em;">計画だけで実行しない</span>
</td>
<td style="padding: 1rem; border-bottom: 1px solid #fee2e2;">
毎週の振り返り習慣をつける<br/>
<span style="color: #6b7280; font-size: 0.9em;">スマホアプリで簡単記録</span>
</td>
</tr>
<tr>
<td style="padding: 1rem; border-bottom: 1px solid #fee2e2;">
<strong>🔴 完璧主義で挫折</strong><br/>
<span style="color: #6b7280; font-size: 0.9em;">1円単位まで管理しようとする</span>
</td>
<td style="padding: 1rem; border-bottom: 1px solid #fee2e2;">
大まかな管理から始める<br/>
<span style="color: #6b7280; font-size: 0.9em;">千円単位で十分</span>
</td>
</tr>
<tr>
<td style="padding: 1rem; border-bottom: 1px solid #fee2e2;">
<strong>🔴 緊急資金を投資に回す</strong><br/>
<span style="color: #6b7280; font-size: 0.9em;">高リターンの誘惑に負ける</span>
</td>
<td style="padding: 1rem; border-bottom: 1px solid #fee2e2;">
別口座で完全分離<br/>
<span style="color: #6b7280; font-size: 0.9em;">定期預金で固定化</span>
</td>
</tr>
<tr>
<td style="padding: 1rem;">
<strong>🔴 家族との共有不足</strong><br/>
<span style="color: #6b7280; font-size: 0.9em;">一人で決めて実行</span>
</td>
<td style="padding: 1rem;">
月1回の家族会議<br/>
<span style="color: #6b7280; font-size: 0.9em;">目標と進捗を共有</span>
</td>
</tr>
</tbody>
</table>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">成功への5ステップ</h2>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem;">
<div style="text-align: center; color: white;">
<div style="width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.5rem auto; font-size: 1.5em; font-weight: bold;">1</div>
<p style="margin: 0; font-size: 0.9em;">現状把握</p>
</div>
<div style="text-align: center; color: white;">
<div style="width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.5rem auto; font-size: 1.5em; font-weight: bold;">2</div>
<p style="margin: 0; font-size: 0.9em;">目標設定</p>
</div>
<div style="text-align: center; color: white;">
<div style="width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.5rem auto; font-size: 1.5em; font-weight: bold;">3</div>
<p style="margin: 0; font-size: 0.9em;">計画立案</p>
</div>
<div style="text-align: center; color: white;">
<div style="width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.5rem auto; font-size: 1.5em; font-weight: bold;">4</div>
<p style="margin: 0; font-size: 0.9em;">実行継続</p>
</div>
<div style="text-align: center; color: white;">
<div style="width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.5rem auto; font-size: 1.5em; font-weight: bold;">5</div>
<p style="margin: 0; font-size: 0.9em;">見直し改善</p>
</div>
</div>
</div>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0;">
<h3 style="color: #d97706; margin: 0 0 1rem 0;">⚠️ 重要な注意事項</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
<li style="margin: 0.5rem 0;">本レッスンは一般的な情報提供を目的としており、個別の財務アドバイスではありません</li>
<li style="margin: 0.5rem 0;">具体的な投資判断は、ご自身の状況を踏まえて慎重に行ってください</li>
<li style="margin: 0.5rem 0;">必要に応じて、ファイナンシャルプランナー等の専門家にご相談ください</li>
<li style="margin: 0.5rem 0;">投資は元本割れのリスクがあることを十分理解した上で行ってください</li>
</ul>
</div>

<div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<h3 style="color: #2563eb; margin: 0 0 1rem 0;">📚 まとめ</h3>
<p style="margin: 0.5rem 0;">個人財務管理は投資成功の土台です。以下の点を実践しましょう：</p>
<ul style="margin: 1rem 0 0 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;"><strong>収支の把握：</strong>まず現状を正確に知る</li>
<li style="margin: 0.5rem 0;"><strong>先取り貯蓄：</strong>給料日に自動で貯蓄する仕組みを作る</li>
<li style="margin: 0.5rem 0;"><strong>予算管理：</strong>50/30/20ルールを参考に配分</li>
<li style="margin: 0.5rem 0;"><strong>緊急資金：</strong>生活費3〜6ヶ月分を確保してから投資へ</li>
<li style="margin: 0.5rem 0;"><strong>継続改善：</strong>完璧を求めず、できることから始める</li>
</ul>
</div>
        `
      }
    ],
    keyPoints: [
      '個人財務管理は収支管理・貯蓄計画・資産形成の3つの柱で構成される',
      '先取り貯蓄の仕組みを作ることで、確実に貯蓄を増やせる',
      '50/30/20ルールを活用した予算管理で、バランスの良い家計を実現',
      '投資を始める前に緊急資金の確保と高金利債務の返済が必要',
      '完璧を求めず、できることから始めて継続することが成功の鍵'
    ],
    summary: '個人財務管理は投資を始める前の重要な基礎です。収支を把握し、先取り貯蓄で確実に資産を増やし、適切な予算管理を行うことで、投資への準備が整います。緊急資金を確保し、リスク許容度を理解した上で、余裕資金で投資を始めましょう。',
    practicalExamples: [
      '月収30万円の場合：必要経費15万円、娯楽費9万円、貯蓄6万円の配分',
      '先取り貯蓄：給料日に自動振替で6万円を貯蓄口座へ移動',
      '支出削減：外食を月10回から5回に減らして2万円節約',
      '緊急資金：生活費20万円×6ヶ月＝120万円を目標に積立',
      '新NISA活用：緊急資金確保後、月3万円を新NISA口座で投資開始（年間360万円上限）',
      '2025年現在：主要ネット証券の国内株式売買手数料は無料化完了、投信購入時手数料も無料（ノーロード）が標準'
    ],
    warningNotes: [
      '本レッスンは一般的な情報提供であり、個別の財務アドバイスではありません',
      '具体的な投資判断は自己責任で行ってください',
      '必要に応じてファイナンシャルプランナー等の専門家にご相談ください',
      '投資には元本割れリスクがあることを十分理解してください'
    ]
  },
  quiz: [
    {
      id: 'q1',
      question: '個人財務管理の3つの柱として正しい組み合わせはどれですか？',
      options: [
        '収支管理・貯蓄計画・資産形成',
        '投資・投機・ギャンブル',
        '収入増加・支出削減・借金',
        '預金・保険・年金'
      ],
      correctAnswer: 0,
      explanation: '個人財務管理の基本は、収支管理で現状を把握し、貯蓄計画で資金を蓄え、資産形成で将来に備えることです。'
    },
    {
      id: 'q2',
      question: '50/30/20ルールで、貯蓄・投資に配分する割合は？',
      options: [
        '50%',
        '30%',
        '20%',
        '10%'
      ],
      correctAnswer: 2,
      explanation: '50/30/20ルールでは、必要経費50%、娯楽費30%、貯蓄・投資20%の配分が推奨されています。'
    },
    {
      id: 'q3',
      question: '緊急資金として確保すべき金額の目安は？',
      options: [
        '生活費の1ヶ月分',
        '生活費の3〜6ヶ月分',
        '生活費の12ヶ月分',
        '年収の半分'
      ],
      correctAnswer: 1,
      explanation: '緊急資金は予期せぬ出費や収入減少に備えるため、生活費の3〜6ヶ月分を確保することが推奨されます。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};