import type { Lesson } from '@/types';

export const lesson3: Lesson = {
  id: 'risk-management-portfolio-risk-fundamentals',
  categoryId: 'risk-management',
  title: 'ポートフォリオリスク管理の基礎：分散投資とリスク測定',
  slug: 'portfolio-risk-fundamentals',
  description: 'ポートフォリオ理論の基本概念、リスクの種類と測定方法、効果的な分散投資戦略について学びます',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 30,
  orderIndex: 3,
  content: {
    sections: [
      {
        id: 'section-1',
        title: 'ポートフォリオリスク管理とは',
        orderIndex: 1,
        type: 'text',
        content: `
<p><strong>ポートフォリオリスク管理</strong>は、複数の投資対象を組み合わせることでリスクを制御し、リターンを最適化する手法です。<br/>ハリー・マーコウィッツの現代ポートフォリオ理論が基礎となっています。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">リスクの4つの種類</h2>

<div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
<div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0; display: flex; align-items: center;">📊 1. システマティックリスク(市場リスク)</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>市場全体に影響する要因</li>
<li>金利変動、インフレ、政治的変化</li>
<li><strong style="color: #dc2626;">分散投資では完全に除去できない</strong></li>
</ul>
</div>

<div style="background: #fef3c7; border: 2px solid #fbbf24; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #d97706; margin: 0 0 1rem 0; display: flex; align-items: center;">🏢 2. アンシステマティックリスク(個別リスク)</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>特定の資産・企業に固有のリスク</li>
<li>経営方針、競合状況、技術革新</li>
<li><strong style="color: #059669;">分散投資により軽減可能</strong></li>
</ul>
</div>

<div style="background: #e0f2fe; border: 2px solid #0ea5e9; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #0369a1; margin: 0 0 1rem 0; display: flex; align-items: center;">💧 3. 流動性リスク</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>資産の売買困難性</li>
<li>取引コスト増大</li>
<li>価格インパクト</li>
</ul>
</div>

<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #059669; margin: 0 0 1rem 0; display: flex; align-items: center;">🛡️ 4. 信用リスク</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>発行体のデフォルト可能性</li>
<li>格付け変更によるリスク</li>
<li>カウンターパーティリスク</li>
</ul>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">分散投資の効果は限定的</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">分散投資は魔法ではありません。システマティックリスクは除去できないため、適切なリスク管理が必要です。</p>
</div>`
      },
      },
      {
        id: 'section-2',
        title: 'リスク測定指標',
        orderIndex: 2,
        type: 'text',
        content: `
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">主要なリスク測定手法</h2>

<div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
<div style="background: #f8fafc; border: 2px solid #94a3b8; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #475569; margin: 0 0 1rem 0; display: flex; align-items: center;">📈 1. 標準偏差(ボラティリティ)</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>価格変動の大きさを測定</li>
<li>年率換算での表示が一般的</li>
<li><code style="background: #f1f5f9; padding: 0.2rem 0.4rem; border-radius: 4px;">σ = √(Σ(Ri - R̄)²/n-1)</code></li>
</ul>
</div>

<div style="background: #fef7ff; border: 2px solid #c084fc; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #7c3aed; margin: 0 0 1rem 0; display: flex; align-items: center;">⚠️ 2. バリューアットリスク(VaR)</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>一定期間・信頼度での最大予想損失</li>
<li>95%信頼度、1日VaR等で表現</li>
<li><em style="color: #dc2626;">極端な市場状況は捉えきれない</em></li>
</ul>
</div>

<div style="background: #e0f2fe; border: 2px solid #0ea5e9; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #0369a1; margin: 0 0 1rem 0; display: flex; align-items: center;">β 3. ベータ値</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>市場全体との相関度を測定</li>
<li><strong>β>1：</strong>市場より変動大、<strong>β<1：</strong>市場より変動小</li>
<li>CAPM(資本資産価格モデル)で使用</li>
</ul>
</div>

<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #059669; margin: 0 0 1rem 0; display: flex; align-items: center;">📊 4. シャープレシオ</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>リスク調整後リターンの測定</li>
<li><code style="background: #f0fdf4; padding: 0.2rem 0.4rem; border-radius: 4px;">(ポートフォリオリターン - 無リスク金利) / 標準偏差</code></li>
<li><strong style="color: #059669;">効率性の比較に有効</strong></li>
</ul>
</div>

<div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0; display: flex; align-items: center;">📉 5. 最大ドローダウン</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li>過去の最高値からの最大下落率</li>
<li>実際の損失体験を反映</li>
<li><strong style="color: #dc2626;">心理的影響を考慮した指標</strong></li>
</ul>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">複数指標の組み合わせが重要</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">単一の指標だけでなく、複数の指標を組み合わせることで、より正確なリスク評価が可能になります。</p>
</div>`
      },
      {
        id: 'section-3',
        title: '分散効果の実例',
        orderIndex: 3,
        type: 'text',
        content: `
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ケーススタディ：暗号通貨ポートフォリオ</h2>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
<div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0; text-align: center;">単一資産(ビットコインのみ)</h3>
<table style="width: 100%; border-collapse: collapse;">
<tr style="background: #fee2e2;">
<td style="padding: 8px; border: 1px solid #fca5a5; font-weight: 600;">期待リターン</td>
<td style="padding: 8px; border: 1px solid #fca5a5; color: #dc2626; font-weight: bold;">15%</td>
</tr>
<tr>
<td style="padding: 8px; border: 1px solid #fca5a5; font-weight: 600;">標準偏差</td>
<td style="padding: 8px; border: 1px solid #fca5a5; color: #dc2626; font-weight: bold;">80%</td>
</tr>
<tr style="background: #fee2e2;">
<td style="padding: 8px; border: 1px solid #fca5a5; font-weight: 600;">シャープレシオ</td>
<td style="padding: 8px; border: 1px solid #fca5a5; color: #dc2626; font-weight: bold;">0.19</td>
</tr>
</table>
</div>

<div style="background: #f0fdf4; border: 2px solid #a7f3d0; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #059669; margin: 0 0 1rem 0; text-align: center;">分散ポートフォリオ<br/>(BTC:ETH:その他=50:30:20)</h3>
<table style="width: 100%; border-collapse: collapse;">
<tr style="background: #dcfce7;">
<td style="padding: 8px; border: 1px solid #a7f3d0; font-weight: 600;">期待リターン</td>
<td style="padding: 8px; border: 1px solid #a7f3d0; color: #059669; font-weight: bold;">12%</td>
</tr>
<tr>
<td style="padding: 8px; border: 1px solid #a7f3d0; font-weight: 600;">標準偏差</td>
<td style="padding: 8px; border: 1px solid #a7f3d0; color: #059669; font-weight: bold;">60%</td>
</tr>
<tr style="background: #dcfce7;">
<td style="padding: 8px; border: 1px solid #a7f3d0; font-weight: 600;">シャープレシオ</td>
<td style="padding: 8px; border: 1px solid #a7f3d0; color: #059669; font-weight: bold;">0.20</td>
</tr>
</table>
</div>
</div>

<div style="background: #f1f5f9; border: 2px solid #94a3b8; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
<h3 style="color: #475569; margin: 0 0 1rem 0; text-align: center;">📊 分析結果</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8; list-style: none;">
<li style="padding: 0.5rem 0; border-bottom: 1px solid #e5e7eb;">📉 <strong>リターンは3%低下</strong></li>
<li style="padding: 0.5rem 0; border-bottom: 1px solid #e5e7eb;">🛡️ <strong>リスクは20%削減</strong></li>
<li style="padding: 0.5rem 0; color: #059669; font-weight: 600;">✨ <strong>リスク調整後リターンは改善</strong></li>
</ul>
</div>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">相関係数の重要性</h2>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
<div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0; text-align: center;">高相関資産の組み合わせ<br/>(r=0.8)</h3>
<ul style="list-style: none; margin: 0; padding: 0;">
<li style="padding: 0.5rem 0; border-bottom: 1px solid #fca5a5; color: #dc2626;">❌ 分散効果が限定的</li>
<li style="padding: 0.5rem 0; color: #dc2626;">⚠️ 危機時に同時下落のリスク</li>
</ul>
</div>

<div style="background: #f0fdf4; border: 2px solid #a7f3d0; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #059669; margin: 0 0 1rem 0; text-align: center;">低相関資産の組み合わせ<br/>(r=0.3)</h3>
<ul style="list-style: none; margin: 0; padding: 0;">
<li style="padding: 0.5rem 0; border-bottom: 1px solid #a7f3d0; color: #059669;">✅ 高い分散効果</li>
<li style="padding: 0.5rem 0; color: #059669;">📈 安定したリターンの実現</li>
</ul>
</div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">分散投資の本質は「相関の低さ」</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">単に複数の資産を保有するだけでなく、相関係数の低い資産を組み合わせることが分散効果を最大化する鍵です。</p>
</div>`
      },
      {
        id: 'section-4',
        title: '効果的な分散投資戦略',
        orderIndex: 4,
        type: 'text',
        content: `
<p><strong>分散投資の実践方法</strong>を5つの次元で体系的に学びましょう。</p>

<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">5つの分散投資戦略</h2>

<div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
<div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #1e40af; margin: 0 0 1rem 0; display: flex; align-items: center;">🏭 資産クラス分散</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>伝統的資産：</strong>株式、債券、商品、不動産</li>
<li><strong>オルタナティブ：</strong>暗号通貨、現金等</li>
<li><strong>重要：</strong>各資産の特性を理解する</li>
</ul>
</div>

<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #d97706; margin: 0 0 1rem 0; display: flex; align-items: center;">🌍 地理的分散</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>地域分散：</strong>先進国・新興国への投資</li>
<li><strong>為替分散：</strong>通貨分散による為替リスク軽減</li>
<li><strong>政治分散：</strong>地政学的リスクの分散</li>
</ul>
</div>

<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #059669; margin: 0 0 1rem 0; display: flex; align-items: center;">⏰ 時間的分散</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>積立投資：</strong>ドルコスト平均法の活用</li>
<li><strong>リバランス：</strong>定期実行でリスク管理</li>
<li><strong>タイミング回避：</strong>市場タイミングに依存しない投資</li>
</ul>
</div>

<div style="background: #fef7ff; border: 2px solid #c084fc; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #7c3aed; margin: 0 0 1rem 0; display: flex; align-items: center;">🏢 セクター分散</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>業界分散：</strong>異なる業界・テーマへの投資</li>
<li><strong>景気対応：</strong>景気サイクルの影響分散</li>
<li><strong>技術対応：</strong>技術革新リスクの軽減</li>
</ul>
</div>

<div style="background: #f1f5f9; border: 2px solid #94a3b8; border-radius: 8px; padding: 1.5rem;">
<h3 style="color: #475569; margin: 0 0 1rem 0; display: flex; align-items: center;">📊 投資手法分散</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
<li><strong>運用スタイル：</strong>アクティブ・パッシブ運用の併用</li>
<li><strong>手法多様化：</strong>異なる運用スタイルの組み合わせ</li>
<li><strong>ファクター投資：</strong>リスクファクターによる分散</li>
</ul>
</div>
</div>

<div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 1.5rem; margin: 1.5rem 0;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0; text-align: center;">⚠️ 分散投資の注意点</h3>
<ul style="list-style: none; margin: 0; padding: 0; color: #374151; line-height: 1.8;">
<li style="padding: 0.5rem 0; border-bottom: 1px solid #fca5a5;">❌ <strong>過度な分散：</strong>管理が複雑になりパフォーマンスが平均的に</li>
<li style="padding: 0.5rem 0; border-bottom: 1px solid #fca5a5;">❌ <strong>偽の分散：</strong>似たような資産への集中投資</li>
<li style="padding: 0.5rem 0;">❌ <strong>コスト無視：</strong>分散のためのコスト増大を軽視</li>
</ul>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 ワンポイントアドバイス</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">分散投資は「適度」が鍵</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">過度な分散は管理を複雑にし、パフォーマンスを平均化します。適切な分散レベルを見つけることが重要です。</p>
</div>`
        `
      }
    ],
    keyPoints: [
      'ポートフォリオリスク管理は複数資産の組み合わせでリスクを制御',
      'システマティックリスクは分散で除去不可、アンシステマティックリスクは軽減可能',
      '標準偏差、VaR、ベータ等でリスクを定量的に測定',
      'シャープレシオでリスク調整後の効率性を評価',
      '資産クラス・地理・時間・セクター・手法の5次元で分散',
      '相関係数の低い資産組み合わせで高い分散効果を実現'
    ],
    summary: 'ポートフォリオ理論の基礎とリスク管理手法を学びました。効果的な分散投資により、リスクを抑制しながらリターンを最適化することが可能です。適切な分散レベルを保ち、相関係数の低い資産を組み合わせることが成功の鍵です。',
    practicalExamples: [
      '暗号通貨ポートフォリオ：BTC単独より分散投資でシャープレシオが0.19から0.20に改善',
      'リスク測定：標準偏差、VaR、ベータ値などの指標を組み合わせた総合評価',
      '相関係数活用：r=0.8の高相関資産より、r=0.3の低相関資産で高い分散効果',
      '5次元分散：資産クラス・地理・時間・セクター・手法の組み合わせでリスク軽減'
    ],
    warningNotes: [
      '分散投資でもシステマティックリスク（市場リスク）は完全に除去できません',
      '過度な分散は管理を複雑にし、パフォーマンスを平均化する恐れがあります',
      'VaRは極端な市場状況を捉えきれない限界があります',
      '相関係数は市場環境により変化するため、定期的な見直しが必要です'
    ]
  },

  quiz: [
    {
      id: 'risk-management-3-q1',
      question: '分散投資によって軽減できないリスクはどれですか？',
      options: [
        '個別企業の経営リスク',
        '市場全体の下落リスク（システマティックリスク）',
        '特定業界の技術革新リスク',
        '為替変動リスク'
      ],
      correctAnswer: 1,
      explanation: 'システマティックリスク（市場リスク）は分散投資では完全に除去できず、すべての投資に影響します。個別リスクは分散により軽減可能です。'
    },
    {
      id: 'risk-management-3-q2',
      question: 'シャープレシオが高いほど何を意味しますか？',
      options: [
        'リターンが高い',
        'リスクが低い',
        'リスク調整後リターンが優秀',
        'ボラティリティが高い'
      ],
      correctAnswer: 2,
      explanation: 'シャープレシオはリスク1単位当たりのリターンを表し、高いほどリスク調整後の効率性が優秀であることを示します。'
    },
    {
      id: 'risk-management-3-q3',
      question: '効果的な分散投資のために最も重要な要素は？',
      options: [
        '投資する資産の数を多くすること',
        '相関係数の低い資産を組み合わせること',
        '高いリターンの資産のみ選ぶこと',
        '同じ業界の異なる企業に投資すること'
      ],
      correctAnswer: 1,
      explanation: '分散効果を最大化するには相関係数の低い資産を組み合わせることが最も重要です。単に数を増やしても同じような動きをする資産では効果は限定的です。'
    }
  ],
  lastUpdated: '2025-08-21',
  factChecked: true

};