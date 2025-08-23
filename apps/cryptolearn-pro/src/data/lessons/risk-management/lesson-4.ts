import type { Lesson } from '@/types';

export const lesson4: Lesson = {
  id: 'risk-management-stress-testing',
  categoryId: 'risk-management',
  title: 'ストレステストとシナリオ分析：極端な市場状況への備え',
  slug: 'stress-testing-scenario-analysis',
  description: 'ポートフォリオのストレステスト手法、シナリオ分析の実践方法、危機時の投資戦略について学びます',
  difficultyLevel: 'advanced',
  estimatedMinutes: 35,
  orderIndex: 4,
  isPublished: true,
  tags: ['ストレステスト', 'シナリオ分析', 'リスク管理', '危機管理'],
  
  content: {
    sections: [
      {
        type: 'quiz',
        title: 'ストレステストとは',
        content: `<strong>ストレステスト</strong>は、極端な市場状況下でのポートフォリオの損失を予測・評価する手法です。通常の市場変動を超えた「テール・リスク」に対する備えを検証することが目的です。
<h3>ストレステストの種類</h3>
<strong>1. ヒストリカル・シナリオ・テスト</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>過去の金融危機データを使用</li>
<li>実際に発生した市場変動を適用</li>
<li>2008年金融危機、新型コロナショック等</li>
</ul>
<strong>2. ハイポセティカル・シナリオ・テスト</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>仮想的な極端シナリオを想定</li>
<li>将来起こりうる状況の模擬</li>
<li>より創造的で前向きなアプローチ</li>
</ul>
<strong>3. モンテカルロ・シミュレーション</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>確率的手法による多数シナリオ生成</li>
<li>統計的分布に基づく分析</li>
<li>より包括的なリスク評価</li>
</ul>
<strong>4. センシティビティ分析</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>特定パラメータ変化の影響測定</li>
<li>金利、株価、為替等の変動影響</li>
<li>単一要因の感度分析</li>
</ul>`
      },
      
      {
        type: 'text',
        title: '暗号通貨特有のストレステスト',
        content: `<h3>暗号通貨市場の特殊性</h3>
<strong>1. 極度の価格変動性</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>1日で50%以上の変動もあり得る</li>
<li>従来のVaRモデルでは捕捉困難</li>
<li>より保守的な想定が必要</li>
</ul>
<strong>2. 相関関係の不安定性</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>危機時に相関係数が急上昇</li>
<li>分散効果の突然の消失</li>
<li>アルトコインのビットコイン依存</li>
</ul>
<strong>3. 流動性の急激な悪化</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>市場クラッシュ時の取引停止</li>
<li>スプレッド拡大とスリッページ</li>
<li>機関投資家の一斉退避</li>
</ul>
<strong>4. 規制リスクの影響</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>突然の規制発表による急落</li>
<li>取引所の営業停止リスク</li>
<li>国家レベルでの禁止措置</li>
</ul>
<h3>暗号通貨ストレステスト・シナリオ</h3>
<strong>シナリオA: 規制クラッシュ</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>主要国での暗号通貨取引禁止</li>
<li>BTC -70%, アルトコイン -85%</li>
<li>流動性完全枯渇状態</li>
</ul>
<strong>シナリオB: 技術的問題</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>主要ブロックチェーンの重大バグ</li>
<li>ハードフォーク分裂騒動</li>
<li>セキュリティ事故による信頼失墜</li>
</ul>
<strong>シナリオC: マクロ経済ショック</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>世界的金融危機再来</li>
<li>機関投資家の暗号通貨売却</li>
<li>リスクオフによる全面安</li>
</ul>`
      },
      {
        type: 'example',
        title: '実践的ストレステスト例',
        content: `<h3>ケーススタディ: 分散ポートフォリオのストレステスト</h3>
<strong>初期ポートフォリオ(100万円)</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>BTC: 40万円</li>
<li>ETH: 20万円  </li>
<li>アルトコイン: 20万円</li>
<li>ステーブルコイン: 10万円</li>
<li>株式ETF: 10万円</li>
</ul>
<h4>シナリオ1: 2018年クリプト・ウィンター再来</h4>
<strong>想定変動率</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>BTC: -85%</li>
<li>ETH: -95%</li>
<li>アルトコイン: -98%</li>
<li>ステーブルコイン: 0%</li>
<li>株式ETF: -20%</li>
</ul>
<strong>結果</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>BTC: 40万円 → 6万円</li>
<li>ETH: 20万円 → 1万円</li>
<li>アルトコイン: 20万円 → 0.4万円</li>
<li>ステーブルコイン: 10万円 → 10万円</li>
<li>株式ETF: 10万円 → 8万円</li>
<li><strong>総額: 100万円 → 25.4万円 (-74.6%)</strong></li>
</ul>
<h4>シナリオ2: 段階的規制強化</h4>
<strong>想定変動率</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>BTC: -50% (デジタルゴールドとして生き残り)</li>
<li>ETH: -70% (規制対応で価値維持)</li>
<li>アルトコイン: -90% (大部分が市場退出)</li>
<li>ステーブルコイン: -20% (規制対応コスト)</li>
<li>株式ETF: +5% (暗号通貨資金の流入)</li>
</ul>
<strong>結果</strong>: 
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>総額: 100万円 → 43.5万円 (-56.5%)</strong></li>
</ul>`
      },
      {
        type: 'tip',
        title: 'ストレステスト実践ガイド',
        content: `<strong>効果的なストレステストの実施方法</strong>
✅ <strong>定期的な実施</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>月次または四半期での定期実行</li>
<li>ポートフォリオ変更後の即座な実施</li>
<li>市場環境変化時の臨時実施</li>
</ul>
✅ <strong>複数シナリオの設定</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>楽観・中立・悲観の3シナリオ</li>
<li>確率的重み付けによる期待値算出</li>
<li>ブラックスワン・イベントの考慮</li>
</ul>
✅ <strong>動的な相関関係モデル</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>平常時と危機時の相関差を考慮</li>
<li>資産間の連動性変化を反映</li>
<li>時間軸による相関変動の分析</li>
</ul>
✅ <strong>流動性制約の組み込み</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>売却不可能期間の想定</li>
<li>取引コストとスリッページの考慮</li>
<li>市場インパクトの反映</li>
</ul>
✅ <strong>継続的なモデル改善</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>実際の結果とテスト結果の比較</li>
<li>パラメータの定期的見直し</li>
<li>新しいリスク要因の追加</li>
</ul>
✅ <strong>アクションプランの準備</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>各シナリオでの具体的対応策</li>
<li>損切りルールの事前設定</li>
<li>緊急時の連絡・実行体制</li>
</ul>`
      },
      {
        type: 'text',
        title: 'シナリオ分析の実践',
        content: `<h3>効果的なシナリオ作成法</h3>
<strong>1. マクロ経済要因</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>金利動向(上昇・下降・急変)</li>
<li>インフレ率変動</li>
<li>通貨政策変更</li>
<li>地政学的リスク</li>
</ul>
<strong>2. 暗号通貨固有要因</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>規制環境変化</li>
<li>技術的進歩・問題</li>
<li>機関投資家の動向</li>
<li>ESG投資基準の影響</li>
</ul>
<strong>3. 市場構造要因</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>取引所の統廃合</li>
<li>新しい金融商品の登場</li>
<li>DeFiエコシステムの変化</li>
<li>ステーブルコインの安定性</li>
</ul>
<h3>リスク軽減策の検討</h3>
<strong>ポジション調整</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>リスク資産比率の引き下げ</li>
<li>ヘッジポジションの構築</li>
<li>相関の低い資産への分散</li>
</ul>
<strong>流動性確保</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>現金・現金同等物の増加</li>
<li>すぐに売却可能な資産の保有</li>
<li>複数取引所での分散保管</li>
</ul>
<strong>保険・デリバティブ活用</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>プット・オプションの購入</li>
<li>暗号通貨保険の検討</li>
<li>先物・スワップでのヘッジ</li>
</ul>`
      },
      {
        type: 'quiz',
        title: '理解度チェック',
        questions: [
          {
            id: 'q1',
            questionType: 'multiple_choice',
            question: 'ストレステストの主要な目的は何ですか？',
            options: [
              '平常時のポートフォリオ収益を最大化する',
              '極端な市場状況でのポートフォリオ損失を予測する',
              '最適な資産配分を決定する',
              '取引コストを最小化する'
            ],
            correctAnswer: '極端な市場状況でのポートフォリオ損失を予測する',
            explanation: 'ストレステストは、通常の市場変動を超えた極端な状況での潜在的損失を事前に把握し、適切な対策を講じることが目的です。'
          },
          {
            id: 'q2',
            questionType: 'multiple_choice',
            question: '暗号通貨市場のストレステストで特に注意すべき点は？',
            options: [
              '価格変動が小さいため保守的な想定は不要',
              '相関関係が常に安定している',
              '危機時に相関係数が急上昇し分散効果が消失する可能性',
              '流動性は常に十分に確保されている'
            ],
            correctAnswer: '危機時に相関係数が急上昇し分散効果が消失する可能性',
            explanation: '暗号通貨市場では危機時に資産間の相関が急激に高まり、分散投資の効果が失われることがあるため、この点を考慮したストレステストが重要です。'
          },
          {
            id: 'q3',
            questionType: 'true_false',
            question: 'モンテカルロ・シミュレーションは過去の実際のデータのみを使用する手法である。',
            options: ['正しい', '間違い'],
            correctAnswer: '間違い',
            explanation: 'モンテカルロ・シミュレーションは統計的分布に基づいて多数の仮想的なシナリオを生成する手法で、過去データに限定されません。'
          }
        ]
      },
      {
        type: 'warning',
        title: 'ストレステスト実施時の注意点',
        content: `<strong>ストレステスト実施における重要な留意事項</strong>
⚠️ <strong>モデルの限界を理解</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>想定外の事象は捕捉できない</li>
<li>過去データに基づく制約</li>
<li>市場構造変化への対応遅れ</li>
</ul>
⚠️ <strong>過度な楽観視を避ける</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>"今回は違う"という思考の危険性</li>
<li>相関関係の急変可能性</li>
<li>ブラックスワン・イベントの存在</li>
</ul>
⚠️ <strong>実行可能性を重視</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>理論的なシナリオと現実のギャップ</li>
<li>緊急時の判断力・実行力制約</li>
<li>市場参加者の行動変化</li>
</ul>
⚠️ <strong>継続的な見直しが必須</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>市場環境の変化に対応</li>
<li>新しいリスク要因の出現</li>
<li>テスト結果の検証・改善</li>
</ul>
<strong>重要</strong>: ストレステストは絶対的な予測ツールではなく、リスク管理の一助として活用すること`
      }
    ],
    keyPoints: [
      'ストレステストは極端な市場状況での損失を予測する重要なリスク管理手法',
      'ヒストリカル・ハイポセティカル・モンテカルロ等の多様な手法を使い分け',
      '暗号通貨市場では価格変動性と相関不安定性を特に考慮',
      '複数シナリオの設定と定期的な実施が効果的',
      '流動性制約や取引コストも含めた現実的なモデル構築が必要',
      'テスト結果に基づく具体的なアクションプランの準備が重要'
    ],
    summary: 'このレッスンでは、ストレステストとシナリオ分析の手法を学びました。極端な市場状況に備えることで、ポートフォリオの潜在的リスクを事前に把握し、適切な対策を講じることができます。'
  },

  quiz: [
    {
      id: 'risk-management-4-q1',
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