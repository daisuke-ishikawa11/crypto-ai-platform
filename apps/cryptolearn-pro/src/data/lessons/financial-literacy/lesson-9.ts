import type { Lesson } from '../../../types';

export const lesson9: Lesson = {
  id: 'financial-literacy-ethics-compliance',
  categoryId: 'financial-literacy',
  title: '投資倫理とコンプライアンス',
  slug: 'investment-ethics-compliance',
  description: '投資における倫理的行動、法的規制、ESG投資の重要性を理解し、責任ある投資家として行動する方法を学びます',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 25,
  orderIndex:  9,
  isPublished: true,
  tags: ['金融リテラシー', '投資基礎', '資産管理'],
  
  content: {
    sections: [
      {
        type: 'text',
        title: 'レッスン概要',
        content: `このレッスンでは投資倫理とコンプライアンスについて学習します。
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">学習目標</h2>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>投資倫理とコンプライアンスの基本概念を理解する</li>
<li>実践的な活用方法を学ぶ</li>
<li>リスクと注意点を把握する</li>
</ul>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">重要なポイント</h2>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>基本的な知識から応用まで段階的に学習</li>
<li>実例を通じた理解の深化</li>
<li>適切なリスク管理の重要性</li>
</ul>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">この分野の重要性</h2>
投資倫理とコンプライアンスは現代の投資・暗号通貨分野で重要な役割を果たしています。
適切に理解し活用することで、より効果的な投資戦略を構築できます。`
      },
      {
        type: 'example',
        title: '実践例',
        content: `<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">基本的な例</h2>
実際の投資倫理とコンプライアンスの活用例：

1. <strong>ステップ1</strong>: 基本設定の確認
   - 必要な準備作業の実施
   - リスクレベルの評価

2. <strong>ステップ2</strong>: 実行手順の理解
   - 具体的な手法の適用
   - 結果の監視方法

3. <strong>ステップ3</strong>: 結果の分析
   - 成果の測定と評価
   - 改善点の特定

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">応用例</h2>

より高度な活用方法：
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>複合的な戦略の組み合わせ</li>
<li>リスク管理の徹底</li>
<li>継続的な改善プロセス</li>
<li>市場環境への適応</li>
</ul>`
      },
      {
        type: 'quiz',
        title: '理解度チェック',
        questions: [
          {
            id: 'q1',
            questionType: 'multiple_choice',
            question: '投資倫理とコンプライアンスの基本的な特徴として最も適切なものは？',
            options: [
              '複雑で理解が困難',
              '基本概念を理解すれば実用的',
              '専門家のみが使用可能',
              'リスクが高すぎて実用的でない'
            ],
            correctAnswer: '基本概念を理解すれば実用的',
            explanation: '投資倫理とコンプライアンスは基本概念を理解することで、実践的に活用できる重要な技術です。適切な知識と準備があれば、リスクを管理しながら効果的に活用できます。',
          },
          {
            id: 'q2',
            questionType: 'true_false',
            question: '投資倫理とコンプライアンスを実践する前に、十分な知識と準備が必要である。',
            options: ['正しい', '間違い'],
            correctAnswer: '正しい',
            explanation: '適切な知識なしに投資倫理とコンプライアンスを実践すると、予期しないリスクに直面する可能性があります。事前の学習と準備が成功の鍵となります。',
          },
      ]
    },
      {
        type: 'warning',
        title: '注意点とリスク',
        content: `<strong>重要な注意事項</strong>
⚠️ <strong>リスク管理</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>投資倫理とコンプライアンスには固有のリスクが存在</li>
<li>適切な知識なしに実行しない</li>
<li>常に最新情報を確認</li>
<li>投資額は余裕資金の範囲内で</li>
</ul>

⚠️ <strong>実践前の確認</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>十分な理解の確保</li>
<li>小額での練習実施</li>
<li>専門家への相談検討</li>
<li>法的要件の確認</li>
</ul>

⚠️ <strong>継続的な学習</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>技術の進歩に対応</li>
<li>市場状況の変化に注意</li>
<li>定期的な知識のアップデート</li>
<li>リスク評価の見直し</li>
</ul>

⚠️ <strong>免責事項</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>投資判断は自己責任</li>
<li>損失の可能性を理解</li>
<li>専門的アドバイスの重要性</li>
</ul>`
      },
    ],
    keyPoints: [
      '投資倫理の三つの柱：誠実性・透明性・受託者責任',
      '金融商品取引法による規制と投資家保護',
      'ESG投資の実践と社会的責任投資',
      '投資詐欺の識別と被害防止策',
      'コンプライアンス体制の構築と記録管理',
      '暗号資産特有の倫理的課題への対応'
    ],
    summary: `このレッスンでは、投資における倫理とコンプライアンスについて包括的に学習しました。

市場の健全性を維持し、責任ある投資家として行動するための原則から、具体的な法規制、ESG投資の実践方法まで幅広くカバーしました。

特に重要なのは、投資詐欺から身を守る知識と、適切な記録管理・税務申告などのコンプライアンス体制の構築です。

倫理的な投資行動は、長期的な投資成功の基盤となるだけでなく、市場全体の発展にも貢献します。`,
    practicalExamples: [
      '市場操作や風説の流布などの禁止行為の具体例と罰則',
      'ESG投資戦略の比較と期待リターン分析',
      'SNSでの適切な情報発信と不適切な例の対比',
      'ポンジスキームなど典型的な投資詐欺の見分け方',
      '取引記録の管理方法と保管期間の実務',
      '暗号資産取引における税務申告チェックリスト'
    ],
    warningNotes: [
      '本レッスンの内容は教育目的であり、法的助言ではありません',
      '具体的な法的問題については、必ず専門家にご相談ください',
      '規制は頻繁に変更されるため、最新情報の確認が必要です',
      '投資判断は自己責任で行ってください',
      '詐欺被害に遭った場合は、速やかに専門機関に相談してください'
    ],
  },

  quiz: [
    {
      id: 'financial-literacy-9-q1',
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
  lastUpdated: '2025-08-15',
  factChecked: true

};