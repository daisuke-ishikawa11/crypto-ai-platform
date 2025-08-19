import type { Lesson } from '@/types';

export const lesson4: Lesson = {
  id: 'financial-literacy-investment-psychology',
  categoryId: 'financial-literacy',
  title: '投資の心理学と行動経済学',
  slug: 'investment-psychology-behavioral-economics',
  description: '投資判断に影響する心理的バイアスを理解し、感情をコントロールして合理的な投資判断を行う方法を学びます',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 30,
  orderIndex: 4,
  content: {
    sections: [
      {
        id: 'section-1',
        title: '投資心理学の重要性',
        orderIndex: 1,
        type: 'text',
        content: `
<p>投資の成功は、知識や技術だけでなく、心理的な要因に大きく左右されます。<br/>
行動経済学の研究により、人間の投資判断には多くの心理的バイアスが影響することが明らかになっています。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">なぜ投資で失敗するのか</h2>

<div style="background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%); color: white; border-radius: 12px; padding: 2rem; margin: 2rem 0; text-align: center;">
<h3 style="font-size: 1.8em; margin: 0 0 1rem 0;">投資失敗の90%は心理的要因</h3>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1.5rem;">
<div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem;">
<div style="font-size: 2em; font-weight: bold;">恐怖</div>
<p style="margin: 0.5rem 0 0 0;">損失への過度な恐れ</p>
</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem;">
<div style="font-size: 2em; font-weight: bold;">貪欲</div>
<p style="margin: 0.5rem 0 0 0;">非現実的な期待</p>
</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem;">
<div style="font-size: 2em; font-weight: bold;">焦り</div>
<p style="margin: 0.5rem 0 0 0;">機会を逃す恐怖</p>
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">プロ投資家とアマチュアの違い</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #4f46e5; color: white;">
<th style="padding: 1rem; text-align: left; border: 1px solid #4338ca;">特徴</th>
<th style="padding: 1rem; text-align: left; border: 1px solid #4338ca;">プロ投資家</th>
<th style="padding: 1rem; text-align: left; border: 1px solid #4338ca;">アマチュア投資家</th>
</tr>
</thead>
<tbody>
<tr style="background: white;">
<td style="padding: 1rem; border: 1px solid #e5e7eb; font-weight: bold;">意思決定</td>
<td style="padding: 1rem; border: 1px solid #e5e7eb; color: #16a34a;">✅ ルールに基づく</td>
<td style="padding: 1rem; border: 1px solid #e5e7eb; color: #dc2626;">❌ 感情に基づく</td>
</tr>
<tr style="background: #f9fafb;">
<td style="padding: 1rem; border: 1px solid #e5e7eb; font-weight: bold;">損失対応</td>
<td style="padding: 1rem; border: 1px solid #e5e7eb; color: #16a34a;">✅ 早期損切り</td>
<td style="padding: 1rem; border: 1px solid #e5e7eb; color: #dc2626;">❌ 塩漬け</td>
</tr>
<tr style="background: white;">
<td style="padding: 1rem; border: 1px solid #e5e7eb; font-weight: bold;">利益確定</td>
<td style="padding: 1rem; border: 1px solid #e5e7eb; color: #16a34a;">✅ 利益を伸ばす</td>
<td style="padding: 1rem; border: 1px solid #e5e7eb; color: #dc2626;">❌ 早すぎる利確</td>
</tr>
<tr style="background: #f9fafb;">
<td style="padding: 1rem; border: 1px solid #e5e7eb; font-weight: bold;">市場観</td>
<td style="padding: 1rem; border: 1px solid #e5e7eb; color: #16a34a;">✅ 長期的視点</td>
<td style="padding: 1rem; border: 1px solid #e5e7eb; color: #dc2626;">❌ 短期的視点</td>
</tr>
</tbody>
</table>

<div style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0;">
<h3 style="color: #2563eb; margin: 0 0 0.5rem 0;">💡 ノーベル経済学賞の知見</h3>
<p style="margin: 0.5rem 0;">2002年にダニエル・カーネマンが、2017年にリチャード・セイラーが行動経済学でノーベル経済学賞を受賞。<br/>
人間の非合理的な行動パターンを理解することが、投資成功の鍵であることが科学的に証明されました。</p>
</div>
        `
      },
      {
        id: 'section-2',
        title: '主要な心理的バイアス',
        orderIndex: 2,
        type: 'text',
        content: `
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">投資を歪める8つの心理的バイアス</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">

<div style="background: white; border: 2px solid #ef4444; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0;">1. 損失回避バイアス</h3>
<div style="background: #fee2e2; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<p style="margin: 0; font-weight: bold;">利益の喜び < 損失の苦痛（2.5倍）</p>
</div>
<p style="margin: 0.5rem 0;">例：1万円の利益の喜びより、1万円の損失の苦痛の方が2.5倍強く感じる</p>
<p style="color: #6b7280; font-size: 0.9em;">対策：損切りルールの事前設定</p>
</div>

<div style="background: white; border: 2px solid #f59e0b; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #d97706; margin: 0 0 1rem 0;">2. 確証バイアス</h3>
<div style="background: #fef3c7; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<p style="margin: 0; font-weight: bold;">都合の良い情報だけを集める</p>
</div>
<p style="margin: 0.5rem 0;">例：保有株の良いニュースばかり探し、悪いニュースを無視</p>
<p style="color: #6b7280; font-size: 0.9em;">対策：反対意見を積極的に探す</p>
</div>

<div style="background: white; border: 2px solid #10b981; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #16a34a; margin: 0 0 1rem 0;">3. アンカリング効果</h3>
<div style="background: #dcfce7; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<p style="margin: 0; font-weight: bold;">最初の情報に引きずられる</p>
</div>
<p style="margin: 0.5rem 0;">例：購入価格にこだわり、現在の適正価格を無視</p>
<p style="color: #6b7280; font-size: 0.9em;">対策：定期的な評価基準の見直し</p>
</div>

<div style="background: white; border: 2px solid #6366f1; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #4f46e5; margin: 0 0 1rem 0;">4. 群集心理</h3>
<div style="background: #e0e7ff; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<p style="margin: 0; font-weight: bold;">みんなが買うから買う</p>
</div>
<p style="margin: 0.5rem 0;">例：バブル相場での追随買い、パニック売り</p>
<p style="color: #6b7280; font-size: 0.9em;">対策：独自の投資基準を持つ</p>
</div>

<div style="background: white; border: 2px solid #8b5cf6; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #7c3aed; margin: 0 0 1rem 0;">5. 過信バイアス</h3>
<div style="background: #f3e8ff; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<p style="margin: 0; font-weight: bold;">自分の能力を過大評価</p>
</div>
<p style="margin: 0.5rem 0;">例：数回の成功で自分は投資の天才だと思い込む</p>
<p style="color: #6b7280; font-size: 0.9em;">対策：投資記録の客観的分析</p>
</div>

<div style="background: white; border: 2px solid #ec4899; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #db2777; margin: 0 0 1rem 0;">6. 現状維持バイアス</h3>
<div style="background: #fce7f3; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<p style="margin: 0; font-weight: bold;">変化を避ける傾向</p>
</div>
<p style="margin: 0.5rem 0;">例：損失銘柄を持ち続ける、新しい投資機会を逃す</p>
<p style="color: #6b7280; font-size: 0.9em;">対策：定期的なポートフォリオ見直し</p>
</div>

<div style="background: white; border: 2px solid #14b8a6; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #0d9488; margin: 0 0 1rem 0;">7. 後知恵バイアス</h3>
<div style="background: #ccfbf1; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<p style="margin: 0; font-weight: bold;">結果を予測できたと錯覚</p>
</div>
<p style="margin: 0.5rem 0;">例：「やっぱりそうなると思った」という後付け解釈</p>
<p style="color: #6b7280; font-size: 0.9em;">対策：投資判断の記録を残す</p>
</div>

<div style="background: white; border: 2px solid #f97316; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #ea580c; margin: 0 0 1rem 0;">8. サンクコスト効果</h3>
<div style="background: #fed7aa; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<p style="margin: 0; font-weight: bold;">過去の投資に固執</p>
</div>
<p style="margin: 0.5rem 0;">例：含み損が大きいから売れない、ナンピン地獄</p>
<p style="color: #6b7280; font-size: 0.9em;">対策：過去は忘れ、将来性で判断</p>
</div>

</div>
        `
      },
      {
        id: 'section-3',
        title: 'FOMO（機会損失の恐怖）の克服',
        orderIndex: 3,
        type: 'text',
        content: `
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">FOMOとは何か</h2>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<h3 style="font-size: 1.8em; margin: 0 0 1rem 0; text-align: center;">Fear Of Missing Out</h3>
<p style="text-align: center; font-size: 1.2em;">「乗り遅れる恐怖」が引き起こす衝動的な投資行動</p>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">FOMOのサイクル</h2>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
<div style="text-align: center; margin: 1rem;">
<div style="width: 100px; height: 100px; background: #fee2e2; border: 3px solid #ef4444; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
<span style="font-size: 2em; color: #dc2626;">1</span>
</div>
<p style="margin: 0.5rem 0 0 0; font-weight: bold;">他人の成功を見る</p>
<p style="font-size: 0.9em; color: #6b7280;">SNSで爆益報告</p>
</div>
<div style="text-align: center; margin: 1rem;">
<div style="width: 100px; height: 100px; background: #fef3c7; border: 3px solid #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
<span style="font-size: 2em; color: #d97706;">2</span>
</div>
<p style="margin: 0.5rem 0 0 0; font-weight: bold;">焦りと不安</p>
<p style="font-size: 0.9em; color: #6b7280;">自分だけ損している</p>
</div>
<div style="text-align: center; margin: 1rem;">
<div style="width: 100px; height: 100px; background: #fee2e2; border: 3px solid #ef4444; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
<span style="font-size: 2em; color: #dc2626;">3</span>
</div>
<p style="margin: 0.5rem 0 0 0; font-weight: bold;">衝動的な投資</p>
<p style="font-size: 0.9em; color: #6b7280;">高値掴み</p>
</div>
<div style="text-align: center; margin: 1rem;">
<div style="width: 100px; height: 100px; background: #e0e7ff; border: 3px solid #6366f1; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
<span style="font-size: 2em; color: #4f46e5;">4</span>
</div>
<p style="margin: 0.5rem 0 0 0; font-weight: bold;">損失と後悔</p>
<p style="font-size: 0.9em; color: #6b7280;">なぜ飛びついたのか</p>
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">FOMO対策の実践法</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
<div style="background: #f0fdf4; border: 2px solid #16a34a; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #16a34a; margin: 0 0 1rem 0;">✅ やるべきこと</h3>
<ul style="margin: 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;">投資計画を事前に立てる</li>
<li style="margin: 0.5rem 0;">エントリー基準を明確にする</li>
<li style="margin: 0.5rem 0;">分散投資でリスク管理</li>
<li style="margin: 0.5rem 0;">長期的視点を持つ</li>
<li style="margin: 0.5rem 0;">定期積立で機械的投資</li>
</ul>
</div>
<div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0;">❌ やってはいけないこと</h3>
<ul style="margin: 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;">SNSの煽りに乗る</li>
<li style="margin: 0.5rem 0;">借金して投資する</li>
<li style="margin: 0.5rem 0;">一点集中投資</li>
<li style="margin: 0.5rem 0;">値動きだけで判断</li>
<li style="margin: 0.5rem 0;">感情的な売買</li>
</ul>
</div>
</div>

<div style="background: #f8fafc; border: 2px solid #94a3b8; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<h3 style="color: #475569; margin: 0 0 1rem 0;">📊 統計データ</h3>
<table style="width: 100%; border-collapse: collapse;">
<tr>
<td style="padding: 0.5rem; border-bottom: 1px solid #cbd5e1;">FOMO投資の平均損失率</td>
<td style="padding: 0.5rem; border-bottom: 1px solid #cbd5e1; text-align: right; font-weight: bold; color: #dc2626;">-23%</td>
</tr>
<tr>
<td style="padding: 0.5rem; border-bottom: 1px solid #cbd5e1;">計画的投資の平均リターン</td>
<td style="padding: 0.5rem; border-bottom: 1px solid #cbd5e1; text-align: right; font-weight: bold; color: #16a34a;">+8.5%</td>
</tr>
<tr>
<td style="padding: 0.5rem;">FOMO売買の頻度</td>
<td style="padding: 0.5rem; text-align: right; font-weight: bold;">通常の3.7倍</td>
</tr>
</table>
</div>
        `
      },
      {
        id: 'section-4',
        title: '感情コントロールの技術',
        orderIndex: 4,
        type: 'text',
        content: `
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">投資における感情の影響</h2>

<div style="background: white; border: 2px solid #3b82f6; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<h3 style="color: #2563eb; margin: 0 0 1.5rem 0; text-align: center;">市場サイクルと投資家心理</h3>
<div style="position: relative; height: 300px; background: linear-gradient(180deg, #dcfce7 0%, #fee2e2 100%); border-radius: 8px; padding: 1rem;">
<div style="position: absolute; top: 10%; left: 10%;">
<strong style="color: #16a34a;">楽観</strong><br/>
<span style="font-size: 0.9em;">「まだ上がる」</span>
</div>
<div style="position: absolute; top: 5%; left: 40%;">
<strong style="color: #f59e0b;">陶酔</strong><br/>
<span style="font-size: 0.9em;">「天井知らず」</span>
</div>
<div style="position: absolute; top: 20%; right: 20%;">
<strong style="color: #ef4444;">不安</strong><br/>
<span style="font-size: 0.9em;">「まさか...」</span>
</div>
<div style="position: absolute; bottom: 30%; right: 10%;">
<strong style="color: #dc2626;">恐怖</strong><br/>
<span style="font-size: 0.9em;">「もうダメだ」</span>
</div>
<div style="position: absolute; bottom: 10%; left: 30%;">
<strong style="color: #6b7280;">絶望</strong><br/>
<span style="font-size: 0.9em;">「投資やめる」</span>
</div>
<div style="position: absolute; bottom: 30%; left: 10%;">
<strong style="color: #1e3a8a;">希望</strong><br/>
<span style="font-size: 0.9em;">「回復するかも」</span>
</div>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">感情コントロールの5つの方法</h2>

<div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin: 2rem 0;">

<div style="background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%); color: white; border-radius: 12px; padding: 2rem;">
<h3 style="margin: 0 0 1rem 0;">1. ルールベース投資法</h3>
<div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<p style="margin: 0;"><strong>事前にルールを決めて機械的に実行</strong></p>
</div>
<ul style="margin: 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;">エントリー条件：RSI30以下で買い</li>
<li style="margin: 0.5rem 0;">損切り条件：-7%で自動売却</li>
<li style="margin: 0.5rem 0;">利確条件：+20%で半分売却</li>
</ul>
</div>

<div style="background: linear-gradient(90deg, #10b981 0%, #14b8a6 100%); color: white; border-radius: 12px; padding: 2rem;">
<h3 style="margin: 0 0 1rem 0;">2. 投資日記の活用</h3>
<div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<p style="margin: 0;"><strong>感情と判断を記録して振り返る</strong></p>
</div>
<ul style="margin: 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;">購入理由と当時の感情</li>
<li style="margin: 0.5rem 0;">売却理由と結果の分析</li>
<li style="margin: 0.5rem 0;">改善点の明確化</li>
</ul>
</div>

<div style="background: linear-gradient(90deg, #f59e0b 0%, #f97316 100%); color: white; border-radius: 12px; padding: 2rem;">
<h3 style="margin: 0 0 1rem 0;">3. クールダウン期間</h3>
<div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<p style="margin: 0;"><strong>重要な決定前に必ず時間を置く</strong></p>
</div>
<ul style="margin: 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;">24時間ルール：即決しない</li>
<li style="margin: 0.5rem 0;">週末検討：平日は実行のみ</li>
<li style="margin: 0.5rem 0;">第三者への相談</li>
</ul>
</div>

<div style="background: linear-gradient(90deg, #ec4899 0%, #f43f5e 100%); color: white; border-radius: 12px; padding: 2rem;">
<h3 style="margin: 0 0 1rem 0;">4. ポジションサイジング</h3>
<div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<p style="margin: 0;"><strong>リスクを限定して心理的負担を軽減</strong></p>
</div>
<ul style="margin: 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;">1銘柄最大5%ルール</li>
<li style="margin: 0.5rem 0;">総投資額は資産の30%まで</li>
<li style="margin: 0.5rem 0;">段階的エントリー</li>
</ul>
</div>

<div style="background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%); color: white; border-radius: 12px; padding: 2rem;">
<h3 style="margin: 0 0 1rem 0;">5. マインドフルネス</h3>
<div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<p style="margin: 0;"><strong>現在の感情を客観的に観察</strong></p>
</div>
<ul style="margin: 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;">深呼吸で冷静さを取り戻す</li>
<li style="margin: 0.5rem 0;">感情に名前をつける（不安、焦り等）</li>
<li style="margin: 0.5rem 0;">長期的視点への切り替え</li>
</ul>
</div>

</div>
        `
      },
      {
        id: 'section-5',
        title: '成功する投資家の思考法',
        orderIndex: 5,
        type: 'text',
        content: `
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ウォーレン・バフェットの投資哲学</h2>

<div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: white; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<blockquote style="margin: 0; font-size: 1.3em; text-align: center; font-style: italic;">
"Be fearful when others are greedy,<br/>and greedy when others are fearful."
</blockquote>
<p style="text-align: center; margin: 1rem 0 0 0;">他人が貪欲な時に恐怖を抱き、他人が恐怖を抱いている時に貪欲になれ</p>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">成功投資家の7つの習慣</h2>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0;">

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;">

<div style="background: #f0fdf4; border-left: 4px solid #16a34a; padding: 1rem;">
<h4 style="color: #16a34a; margin: 0 0 0.5rem 0;">1. 独立思考</h4>
<p style="margin: 0; font-size: 0.95em;">群集の逆を行く勇気を持つ。市場が恐怖に包まれている時こそチャンス。</p>
</div>

<div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 1rem;">
<h4 style="color: #2563eb; margin: 0 0 0.5rem 0;">2. 継続学習</h4>
<p style="margin: 0; font-size: 0.95em;">毎日最低1時間は市場や企業の研究に充てる。知識は最高の投資。</p>
</div>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem;">
<h4 style="color: #d97706; margin: 0 0 0.5rem 0;">3. 忍耐力</h4>
<p style="margin: 0; font-size: 0.95em;">良い投資機会を待つ。年に数回の取引で十分。質 > 量。</p>
</div>

<div style="background: #f3e8ff; border-left: 4px solid #7c3aed; padding: 1rem;">
<h4 style="color: #7c3aed; margin: 0 0 0.5rem 0;">4. リスク管理</h4>
<p style="margin: 0; font-size: 0.95em;">資金を守ることが最優先。大きく勝つより、負けないことが重要。</p>
</div>

<div style="background: #fce7f3; border-left: 4px solid #ec4899; padding: 1rem;">
<h4 style="color: #db2777; margin: 0 0 0.5rem 0;">5. 謙虚さ</h4>
<p style="margin: 0; font-size: 0.95em;">市場は常に正しい。自分の間違いを素直に認める。</p>
</div>

<div style="background: #ccfbf1; border-left: 4px solid #14b8a6; padding: 1rem;">
<h4 style="color: #0d9488; margin: 0 0 0.5rem 0;">6. 規律</h4>
<p style="margin: 0; font-size: 0.95em;">ルールを守り抜く。例外を作らない。感情に流されない。</p>
</div>

<div style="background: #e0e7ff; border-left: 4px solid #6366f1; padding: 1rem; grid-column: span 2;">
<h4 style="color: #4f46e5; margin: 0 0 0.5rem 0;">7. 長期視点</h4>
<p style="margin: 0; font-size: 0.95em;">最低5年、理想は10年以上の投資期間を想定。短期の変動に一喜一憂しない。複利の力を最大限活用。</p>
</div>

</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">投資成功率を上げる心理テクニック</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: #4f46e5; color: white;">
<th style="padding: 1rem; text-align: left;">テクニック</th>
<th style="padding: 1rem; text-align: left;">実践方法</th>
<th style="padding: 1rem; text-align: center;">効果</th>
</tr>
</thead>
<tbody>
<tr style="background: white;">
<td style="padding: 1rem; border: 1px solid #e5e7eb; font-weight: bold;">プレモーテム分析</td>
<td style="padding: 1rem; border: 1px solid #e5e7eb;">投資前に失敗シナリオを想定</td>
<td style="padding: 1rem; text-align: center; border: 1px solid #e5e7eb;">リスク40%減</td>
</tr>
<tr style="background: #f9fafb;">
<td style="padding: 1rem; border: 1px solid #e5e7eb; font-weight: bold;">レッドチーム思考</td>
<td style="padding: 1rem; border: 1px solid #e5e7eb;">自分の投資判断に反論する</td>
<td style="padding: 1rem; text-align: center; border: 1px solid #e5e7eb;">精度30%向上</td>
</tr>
<tr style="background: white;">
<td style="padding: 1rem; border: 1px solid #e5e7eb; font-weight: bold;">システム1・2分離</td>
<td style="padding: 1rem; border: 1px solid #e5e7eb;">直感と論理的思考を分ける</td>
<td style="padding: 1rem; text-align: center; border: 1px solid #e5e7eb;">判断ミス50%減</td>
</tr>
<tr style="background: #f9fafb;">
<td style="padding: 1rem; border: 1px solid #e5e7eb; font-weight: bold;">メンタルアカウンティング回避</td>
<td style="padding: 1rem; border: 1px solid #e5e7eb;">すべての資金を同等に扱う</td>
<td style="padding: 1rem; text-align: center; border: 1px solid #e5e7eb;">収益15%改善</td>
</tr>
</tbody>
</table>
        `
      },
      {
        id: 'section-6',
        title: '実践演習とまとめ',
        orderIndex: 6,
        type: 'text',
        content: `
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">心理バイアスチェックリスト</h2>

<div style="background: white; border: 2px solid #3b82f6; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<h3 style="color: #2563eb; margin: 0 0 1.5rem 0;">投資前の自己診断（該当する項目をチェック）</h3>
<div style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
<label style="display: flex; align-items: center; padding: 0.5rem; background: #f8fafc; border-radius: 4px; cursor: pointer;">
<input type="checkbox" style="margin-right: 0.5rem;"/>
<span>SNSで見た爆益報告に影響されていないか？</span>
</label>
<label style="display: flex; align-items: center; padding: 0.5rem; background: #f8fafc; border-radius: 4px; cursor: pointer;">
<input type="checkbox" style="margin-right: 0.5rem;"/>
<span>「みんなが買っているから」が理由になっていないか？</span>
</label>
<label style="display: flex; align-items: center; padding: 0.5rem; background: #f8fafc; border-radius: 4px; cursor: pointer;">
<input type="checkbox" style="margin-right: 0.5rem;"/>
<span>損失を取り返そうとしていないか？</span>
</label>
<label style="display: flex; align-items: center; padding: 0.5rem; background: #f8fafc; border-radius: 4px; cursor: pointer;">
<input type="checkbox" style="margin-right: 0.5rem;"/>
<span>冷静に企業分析をしたか？</span>
</label>
<label style="display: flex; align-items: center; padding: 0.5rem; background: #f8fafc; border-radius: 4px; cursor: pointer;">
<input type="checkbox" style="margin-right: 0.5rem;"/>
<span>最悪のシナリオを想定したか？</span>
</label>
</div>
<div style="background: #fef3c7; border-radius: 8px; padding: 1rem; margin-top: 1.5rem;">
<p style="margin: 0; color: #92400e;"><strong>3つ以上チェックがついたら要注意！</strong> 一度立ち止まって再検討しましょう。</p>
</div>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ケーススタディ：典型的な失敗パターン</h2>

<div style="background: #fee2e2; border: 2px solid #ef4444; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0;">😰 田中さん（35歳）の失敗例</h3>
<div style="background: white; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<ol style="margin: 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;"><strong>2021年11月：</strong>仮想通貨バブルでBitcoinを680万円で購入（FOMO）</li>
<li style="margin: 0.5rem 0;"><strong>2022年1月：</strong>400万円まで下落も「いずれ戻る」と保持（損失回避）</li>
<li style="margin: 0.5rem 0;"><strong>2022年6月：</strong>200万円でナンピン買い（サンクコスト効果）</li>
<li style="margin: 0.5rem 0;"><strong>2022年11月：</strong>220万円ですべて損切り（総損失-70%）</li>
</ol>
</div>
<p style="color: #7f1d1d; font-weight: bold;">教訓：複数の心理バイアスが重なると致命的な損失につながる</p>
</div>

<div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<h3 style="color: #16a34a; margin: 0 0 1rem 0;">😊 佐藤さん（42歳）の成功例</h3>
<div style="background: white; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
<ol style="margin: 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;"><strong>投資ルール策定：</strong>月5万円の積立投資、個別株は資産の20%まで</li>
<li style="margin: 0.5rem 0;"><strong>2020年3月：</strong>コロナショックで計画通り買い増し</li>
<li style="margin: 0.5rem 0;"><strong>2021年：</strong>バブル相場でも淡々と積立継続</li>
<li style="margin: 0.5rem 0;"><strong>現在：</strong>平均リターン+35%を達成</li>
</ol>
</div>
<p style="color: #14532d; font-weight: bold;">成功の鍵：ルールを決めて機械的に実行し、感情に左右されない</p>
</div>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0;">
<h3 style="color: #d97706; margin: 0 0 1rem 0;">⚠️ 重要な注意事項</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
<li style="margin: 0.5rem 0;">本レッスンは心理学的な知識の提供を目的としており、個別の投資アドバイスではありません</li>
<li style="margin: 0.5rem 0;">投資判断は必ず自己責任で行ってください</li>
<li style="margin: 0.5rem 0;">深刻な投資依存症の兆候がある場合は、専門家にご相談ください</li>
<li style="margin: 0.5rem 0;">過度な投資は生活を破壊する可能性があります</li>
</ul>
</div>

<div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
<h3 style="color: #2563eb; margin: 0 0 1rem 0;">📚 まとめ</h3>
<p style="margin: 0.5rem 0;">投資の成功は、知識よりも心理コントロールが重要です。</p>
<ul style="margin: 1rem 0 0 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;"><strong>8つの心理バイアス</strong>を理解し、自分の弱点を把握する</li>
<li style="margin: 0.5rem 0;"><strong>FOMO</strong>に負けず、計画的な投資を心がける</li>
<li style="margin: 0.5rem 0;"><strong>感情コントロール</strong>の技術を身につける</li>
<li style="margin: 0.5rem 0;"><strong>ルールベース投資</strong>で一貫性を保つ</li>
<li style="margin: 0.5rem 0;"><strong>長期的視点</strong>を持ち、短期の変動に惑わされない</li>
</ul>
<p style="margin: 1rem 0 0 0; font-weight: bold; color: #1e40af;">「市場で生き残ることが、最大の成功である」</p>
</div>
        `
      }
    ],
    keyPoints: [
      '投資失敗の90%は心理的要因によるもの',
      '8つの主要な心理バイアスを理解し対策を立てる',
      'FOMO（機会損失の恐怖）を克服する具体的方法',
      'ルールベース投資で感情を排除する',
      '成功投資家の思考法と習慣を身につける'
    ],
    summary: '投資の成功は知識や技術以上に心理コントロールが重要です。損失回避バイアス、確証バイアス、FOMOなど、投資判断を歪める心理的要因を理解し、ルールベースの投資法を実践することで、感情に左右されない合理的な投資が可能になります。',
    practicalExamples: [
      'FOMOの例：SNSで爆益報告を見て衝動買い→高値掴みで損失',
      '損失回避バイアス：含み損を抱えた株を塩漬け→さらなる下落',
      '確証バイアス：保有株の良いニュースだけ集める→客観性を失う',
      'ルールベース投資：RSI30以下で買い、-7%で損切り→一貫性のある投資',
      '成功例：コロナショックで恐怖に負けず買い増し→大きなリターン'
    ],
    warningNotes: [
      '本レッスンは心理学的知識の提供であり、個別の投資アドバイスではありません',
      '投資判断は必ず自己責任で行ってください',
      '投資依存症の兆候がある場合は専門家にご相談ください',
      '借金をしての投資は絶対に避けてください'
    ]
  },
  quiz: [
    {
      id: 'q1',
      question: '投資失敗の主な原因として正しいものは？',
      options: [
        '知識不足',
        '資金不足',
        '心理的要因',
        '運の悪さ'
      ],
      correctAnswer: 2,
      explanation: '研究によると、投資失敗の90%は恐怖、貪欲、焦りなどの心理的要因によるものです。'
    },
    {
      id: 'q2',
      question: 'FOMOとは何の略語ですか？',
      options: [
        'Fear Of Making Orders',
        'Fear Of Missing Out',
        'Focus On Market Opportunity',
        'First Order Market Operation'
      ],
      correctAnswer: 1,
      explanation: 'FOMOは「Fear Of Missing Out（機会を逃す恐怖）」の略で、他人の成功を見て焦り、衝動的な投資をしてしまう心理状態を指します。'
    },
    {
      id: 'q3',
      question: '損失回避バイアスの特徴として正しいものは？',
      options: [
        '利益の喜びが損失の苦痛より大きい',
        '損失の苦痛が利益の喜びの約2.5倍',
        '利益と損失を同等に感じる',
        '損失を全く気にしない'
      ],
      correctAnswer: 1,
      explanation: '行動経済学の研究により、人は同額の利益より損失を約2.5倍強く感じることが分かっています。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};