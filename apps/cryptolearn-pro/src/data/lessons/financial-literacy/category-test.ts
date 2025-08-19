import type { CategoryTest } from '@/lib/types/learning';

export const financialLiteracyCategoryTest: CategoryTest = {
  id: 'financial-literacy-test',
  categoryId: 'financial-literacy',
  title: '金融リテラシー総合確認テスト',
  description: '金融リテラシーカテゴリの全25レッスンで学習した内容の理解度を包括的に確認するテストです。投資基礎、資産運用、税制、リスク管理まで、実践的な金融知識の習得度を測定します。',
  estimatedMinutes: 45,
  passingScore: 80,
  certificateEligible: true,
  
  introduction: `
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 20px; margin: 20px 0; color: white;">
      <h2 style="color: #ffffff; margin-bottom: 20px; font-size: 28px;">💎 金融リテラシー総合確認テスト</h2>
      <p style="font-size: 18px; line-height: 1.8; margin-bottom: 15px;">
        このテストは、金融リテラシーカテゴリの全25レッスンで学習した内容の理解度を包括的に確認するものです。
        投資の基礎知識から高度な資産運用戦略まで、実践的な金融知識の習得度を測定します。
      </p>
    </div>

    <div style="background: linear-gradient(145deg, #f3f4f6, #e5e7eb); padding: 25px; border-radius: 15px; margin: 25px 0; border-left: 5px solid #667eea;">
      <h3 style="color: #1f2937; margin-bottom: 20px;">📊 テスト概要</h3>
      
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 20px;">
        <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h4 style="color: #667eea; margin-bottom: 10px;">📋 問題数・形式</h4>
          <p style="font-size: 14px; color: #4b5563; margin-bottom: 8px;"><strong>総問題数：</strong>30問</p>
          <p style="font-size: 14px; color: #4b5563; margin-bottom: 8px;"><strong>出題形式：</strong>選択式・計算問題・シナリオ問題</p>
          <p style="font-size: 14px; color: #4b5563;"><strong>制限時間：</strong>45分</p>
        </div>
        <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h4 style="color: #10b981; margin-bottom: 10px;">🎯 合格基準</h4>
          <p style="font-size: 14px; color: #4b5563; margin-bottom: 8px;"><strong>合格点：</strong>80%以上（24問正解）</p>
          <p style="font-size: 14px; color: #4b5563; margin-bottom: 8px;"><strong>修了証：</strong>合格者に発行</p>
          <p style="font-size: 14px; color: #4b5563;"><strong>再受験：</strong>何度でも可能</p>
        </div>
      </div>
    </div>

    <div style="background: #ffffff; padding: 25px; border-radius: 15px; border: 2px solid #e5e7eb; margin: 25px 0;">
      <h3 style="color: #1f2937; margin-bottom: 20px;">📚 出題範囲</h3>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
        <div style="background: #fef3ff; padding: 15px; border-radius: 8px;">
          <h5 style="color: #7c2d92; margin-bottom: 8px;">投資基礎（30%）</h5>
          <p style="font-size: 12px; color: #6b7280;">投資の基本概念、金融商品、リスクとリターン</p>
        </div>
        <div style="background: #f0fdf4; padding: 15px; border-radius: 8px;">
          <h5 style="color: #166534; margin-bottom: 8px;">資産運用（25%）</h5>
          <p style="font-size: 12px; color: #6b7280;">ポートフォリオ、分散投資、長期投資戦略</p>
        </div>
        <div style="background: #fef7ed; padding: 15px; border-radius: 8px;">
          <h5 style="color: #9a3412; margin-bottom: 8px;">税制・制度（20%）</h5>
          <p style="font-size: 12px; color: #6b7280;">NISA、iDeCo、税制優遇制度</p>
        </div>
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px;">
          <h5 style="color: #1e40af; margin-bottom: 8px;">リスク管理（15%）</h5>
          <p style="font-size: 12px; color: #6b7280;">リスク評価、保険、資産保護</p>
        </div>
        <div style="background: #fdf2f8; padding: 15px; border-radius: 8px;">
          <h5 style="color: #be1264; margin-bottom: 8px;">ライフプラン（10%）</h5>
          <p style="font-size: 12px; color: #6b7280;">人生設計、退職後資産運用、相続</p>
        </div>
      </div>
    </div>

    <div style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); padding: 20px; border-radius: 15px; margin: 20px 0;">
      <h3 style="color: #8b4513; margin-bottom: 15px;">⚠️ 受験前の注意事項</h3>
      <ul style="color: #8b4513; padding-left: 20px; margin: 0;">
        <li style="margin-bottom: 8px;">全25レッスンの学習完了を推奨します</li>
        <li style="margin-bottom: 8px;">電卓機能が利用可能です（計算問題対応）</li>
        <li style="margin-bottom: 8px;">途中保存機能はありません（一度で完了してください）</li>
        <li style="margin-bottom: 8px;">結果は即時表示され、詳細な解説が提供されます</li>
        <li>不合格の場合は弱点分野のレッスン復習を推奨します</li>
      </ul>
    </div>
  `,

  questions: [
    {
      id: 'test-q1',
      type: 'multiple_choice',
      difficulty: 'basic',
      category: '投資基礎',
      question: '複利効果に関する説明として最も適切なものはどれですか？',
      options: [
        '元本にのみ利息が付く仕組み',
        '元本と利息の合計に対して利息が付く仕組み',
        '毎年一定額の利息が付く仕組み',
        '最終年にまとめて利息が付く仕組み'
      ],
      correctAnswer: 1,
      explanation: '複利効果とは、元本だけでなく、それまでに得た利息にも利息が付く仕組みです。時間が経つほど効果が大きくなり、長期投資の重要な要素となります。',
      points: 1
    },
    {
      id: 'test-q2',
      type: 'multiple_choice',
      difficulty: 'intermediate',
      category: '投資基礎',
      question: '年利5%で100万円を10年間複利運用した場合の元利合計に最も近い金額はどれですか？',
      options: [
        '150万円',
        '155万円',
        '163万円',
        '170万円'
      ],
      correctAnswer: 2,
      explanation: '100万円×(1.05)^10≒162.9万円となります。複利計算では(1+利率)の年数乗を用いて計算します。',
      points: 2
    },
    {
      id: 'test-q3',
      type: 'multiple_choice',
      difficulty: 'basic',
      category: '投資基礎',
      question: 'リスクとリターンの関係について正しいものはどれですか？',
      options: [
        'リスクが高いほどリターンは確実に高くなる',
        'リスクが低いほどリターンは確実に高くなる',
        '一般的にリスクが高いほど期待リターンも高い傾向がある',
        'リスクとリターンに関係性はない'
      ],
      correctAnswer: 2,
      explanation: '一般的に、投資におけるリスクと期待リターンには正の相関関係があります。ただし、リスクが高いからといって必ずしもリターンが得られるとは限りません。',
      points: 1
    },
    {
      id: 'test-q4',
      type: 'multiple_choice',
      difficulty: 'intermediate',
      category: '資産運用',
      question: '分散投資の効果として最も適切な説明はどれですか？',
      options: [
        'リターンを最大化することができる',
        'リスクを完全に排除することができる',
        'リスクを低減しながら安定的なリターンを目指すことができる',
        '短期間で大きな利益を得ることができる'
      ],
      correctAnswer: 2,
      explanation: '分散投資の主な効果は、異なる資産に投資することでリスクを分散し、ポートフォリオ全体のリスクを低減することです。リスクを完全に排除はできませんが、安定性を向上させます。',
      points: 2
    },
    {
      id: 'test-q5',
      type: 'multiple_choice',
      difficulty: 'basic',
      category: '資産運用',
      question: 'ドル・コスト平均法の特徴として正しいものはどれですか？',
      options: [
        '価格が安い時に大量購入し、高い時は購入しない',
        '一定期間ごとに一定金額で購入を続ける',
        '価格が上昇トレンドの時のみ購入する',
        '一括で全額投資する'
      ],
      correctAnswer: 1,
      explanation: 'ドル・コスト平均法は、定期的に一定金額で投資を続ける手法です。価格が安い時は多く、高い時は少なく購入することで、平均取得価格を抑える効果があります。',
      points: 1
    },
    {
      id: 'test-q6',
      type: 'multiple_choice',
      difficulty: 'intermediate',
      category: '税制・制度',
      question: '2024年から始まった新NISA制度について正しいものはどれですか？',
      options: [
        '年間投資上限額は240万円で期間は20年間',
        '年間投資上限額は360万円で恒久化された',
        '年間投資上限額は120万円で期間は5年間',
        '年間投資上限額は800万円で期間は無制限'
      ],
      correctAnswer: 1,
      explanation: '2024年から開始された新NISA制度では、年間投資上限額が360万円（つみたて投資枠120万円+成長投資枠240万円）となり、制度が恒久化されました。',
      points: 2
    },
    {
      id: 'test-q7',
      type: 'multiple_choice',
      difficulty: 'intermediate',
      category: '税制・制度',
      question: 'iDeCo（個人型確定拠出年金）の特徴として正しくないものはどれですか？',
      options: [
        '掛金は所得控除の対象となる',
        '運用益は非課税で再投資される',
        '受給時は全額非課税となる',
        '原則60歳まで引き出しできない'
      ],
      correctAnswer: 2,
      explanation: 'iDeCoの受給時は、年金として受け取る場合は公的年金等控除、一時金として受け取る場合は退職所得控除が適用されますが、全額非課税ではありません。',
      points: 2
    },
    {
      id: 'test-q8',
      type: 'multiple_choice',
      difficulty: 'advanced',
      category: '税制・制度',
      question: 'ふるさと納税で年収500万円（給与所得者、配偶者・扶養なし）の場合の寄付上限額の目安はどれですか？',
      options: [
        '約4万円',
        '約6万円',
        '約8万円',
        '約10万円'
      ],
      correctAnswer: 1,
      explanation: '年収500万円の給与所得者（配偶者・扶養なし）の場合、ふるさと納税の寄付上限額は約6万円が目安となります。正確な金額は住民税所得割額等により変動します。',
      points: 3
    },
    {
      id: 'test-q9',
      type: 'multiple_choice',
      difficulty: 'basic',
      category: 'リスク管理',
      question: '投資におけるリスクの種類として適切でないものはどれですか？',
      options: [
        '価格変動リスク',
        '信用リスク',
        '為替リスク',
        '確実性リスク'
      ],
      correctAnswer: 3,
      explanation: '確実性リスクという用語は一般的ではありません。投資の主なリスクには価格変動リスク、信用リスク、為替リスク、流動性リスク、インフレリスクなどがあります。',
      points: 1
    },
    {
      id: 'test-q10',
      type: 'multiple_choice',
      difficulty: 'intermediate',
      category: 'リスク管理',
      question: 'VaR（Value at Risk）について正しい説明はどれですか？',
      options: [
        '一定期間内に発生する最大利益の予測値',
        '一定期間内に一定の確率で発生する最大損失の予測値',
        '投資元本に対する確実な利益率',
        '市場の平均的な変動率'
      ],
      correctAnswer: 1,
      explanation: 'VaR（Value at Risk）は、一定期間内に一定の確率（通常95%や99%）で発生する最大損失額を示すリスク指標です。',
      points: 2
    },
    {
      id: 'test-q11',
      type: 'multiple_choice',
      difficulty: 'advanced',
      category: 'リスク管理',
      question: '生命保険の必要保障額を計算する際の考慮要素として適切でないものはどれですか？',
      options: [
        '遺族の生活費',
        '子供の教育費',
        '住宅ローン残高',
        '本人の趣味・娯楽費'
      ],
      correctAnswer: 3,
      explanation: '生命保険の必要保障額は、被保険者に万が一のことがあった場合に遺族が必要とする資金を基に算出します。本人の趣味・娯楽費は通常含まれません。',
      points: 3
    },
    {
      id: 'test-q12',
      type: 'multiple_choice',
      difficulty: 'intermediate',
      category: '投資基礎',
      question: '株式投資における配当利回りの計算方法として正しいものはどれですか？',
      options: [
        '年間配当金 ÷ 購入時株価 × 100',
        '年間配当金 × 購入時株価 ÷ 100',
        '購入時株価 ÷ 年間配当金 × 100',
        '(現在株価 - 購入時株価) ÷ 購入時株価 × 100'
      ],
      correctAnswer: 0,
      explanation: '配当利回りは「年間配当金 ÷ 株価 × 100」で計算されます。投資元本に対してどの程度の配当収入が得られるかを示す指標です。',
      points: 2
    },
    {
      id: 'test-q13',
      type: 'multiple_choice',
      difficulty: 'basic',
      category: '投資基礎',
      question: '債券投資の特徴として正しいものはどれですか？',
      options: [
        '元本と利息の支払いが約束されているため、株式より一般的にリスクが低い',
        '株式と同等のリスクとリターンを持つ',
        '必ず元本が保証される',
        '金利が上昇すると債券価格も上昇する'
      ],
      correctAnswer: 0,
      explanation: '債券は発行体が元本と利息の支払いを約束しているため、一般的に株式よりもリスクが低いとされます。ただし、信用リスクや金利リスクは存在します。',
      points: 1
    },
    {
      id: 'test-q14',
      type: 'multiple_choice',
      difficulty: 'advanced',
      category: '資産運用',
      question: 'モダンポートフォリオ理論における効率的フロンティアについて正しい説明はどれですか？',
      options: [
        '同じリスクレベルで最大のリターンを得られる資産配分の組み合わせ',
        '最もリスクの低い単一資産への投資',
        '最もリターンの高い単一資産への投資',
        '全資産に均等配分した場合のリスクとリターン'
      ],
      correctAnswer: 0,
      explanation: '効率的フロンティアは、同じリスクレベルで最大のリターンを得られる、または同じリターンで最小のリスクとなる資産配分の組み合わせを示す曲線です。',
      points: 3
    },
    {
      id: 'test-q15',
      type: 'multiple_choice',
      difficulty: 'intermediate',
      category: '資産運用',
      question: 'REITの特徴として正しくないものはどれですか？',
      options: [
        '不動産に間接的に投資できる',
        '比較的少額から不動産投資が可能',
        '証券取引所で売買できる',
        '個人が直接不動産を所有することになる'
      ],
      correctAnswer: 3,
      explanation: 'REITは不動産投資信託であり、投資家は直接不動産を所有するのではなく、REITの受益証券を通じて間接的に不動産に投資します。',
      points: 2
    },
    {
      id: 'test-q16',
      type: 'multiple_choice',
      difficulty: 'advanced',
      category: 'ライフプラン',
      question: '住宅ローンの繰上返済を検討する際の判断基準として最も適切なものはどれですか？',
      options: [
        '手元資金があればすぐに繰上返済すべき',
        '住宅ローン金利と他の投資の期待利回りを比較して判断',
        '繰上返済は絶対にしない方が良い',
        'ローン残高が1,000万円を下回ったら繰上返済'
      ],
      correctAnswer: 1,
      explanation: '繰上返済の判断では、住宅ローン金利と他の投資機会の期待利回りを比較することが重要です。また、緊急時資金の確保も考慮する必要があります。',
      points: 3
    },
    {
      id: 'test-q17',
      type: 'multiple_choice',
      difficulty: 'basic',
      category: 'ライフプラン',
      question: '緊急時資金として推奨される金額の目安はどれですか？',
      options: [
        '月間生活費の1-2ヶ月分',
        '月間生活費の3-6ヶ月分',
        '月間生活費の12ヶ月分',
        '年収の50%相当額'
      ],
      correctAnswer: 1,
      explanation: '緊急時資金は、失業や病気などの際に生活を維持するための資金で、一般的に月間生活費の3-6ヶ月分が推奨されます。',
      points: 1
    },
    {
      id: 'test-q18',
      type: 'multiple_choice',
      difficulty: 'advanced',
      category: 'ライフプラン',
      question: '年金の繰下げ受給について正しいものはどれですか？（2024年現在）',
      options: [
        '65歳から70歳まで繰下げ可能で、最大42%増額',
        '66歳から75歳まで繰下げ可能で、最大84%増額',
        '67歳から80歳まで繰下げ可能で、最大100%増額',
        '繰下げ受給は厚生年金のみ可能'
      ],
      correctAnswer: 1,
      explanation: '2022年4月の制度改正により、年金の繰下げ受給は66歳から75歳まで可能となり、最大84%（月0.7%×120か月）年金額が増額されます。',
      points: 3
    },
    {
      id: 'test-q19',
      type: 'multiple_choice',
      difficulty: 'intermediate',
      category: '税制・制度',
      question: '所得税の累進税率について、課税所得900万円の場合の最高税率はどれですか？',
      options: [
        '23%',
        '33%',
        '40%',
        '45%'
      ],
      correctAnswer: 1,
      explanation: '課税所得900万円の場合、所得税の最高税率は33%です（695万円超900万円以下の税率）。なお、これに加えて住民税10%が課税されます。',
      points: 2
    },
    {
      id: 'test-q20',
      type: 'multiple_choice',
      difficulty: 'advanced',
      category: '投資基礎',
      question: 'インフレ率が年3%の場合、10年後の100万円の実質価値はおよそいくらになりますか？',
      options: [
        '約130万円',
        '約100万円',
        '約77万円',
        '約70万円'
      ],
      correctAnswer: 2,
      explanation: 'インフレ率3%が10年続くと、実質価値は100万円÷(1.03)^10≒74万円となります。インフレは貨幣の購買力を減少させる重要な要因です。',
      points: 3
    },
    {
      id: 'test-q21',
      type: 'scenario',
      difficulty: 'advanced',
      category: '資産運用',
      question: 'Aさん（30歳、年収600万円）が老後資金として月3万円の積立投資を35年間継続する場合を想定してください。年平均リターン5%で運用した場合の元利合計に最も近い金額はどれですか？',
      options: [
        '約2,500万円',
        '約3,300万円',
        '約4,100万円',
        '約5,000万円'
      ],
      correctAnswer: 1,
      explanation: '月3万円を35年間、年利5%で積立投資した場合の元利合計は約3,300万円になります。長期間の複利効果により、元本1,260万円が大きく増加します。',
      points: 3
    },
    {
      id: 'test-q22',
      type: 'scenario',
      difficulty: 'intermediate',
      category: 'リスク管理',
      question: 'Bさん（35歳、妻・子供2人、年収800万円、住宅ローン残高2,500万円）の必要生命保険金額を概算する場合、最も適切な考え方はどれですか？',
      options: [
        '年収の3倍程度（約2,400万円）',
        '住宅ローン残高相当額（約2,500万円）',
        '遺族の生活費・教育費から遺族年金等を差し引いた不足額',
        '貯蓄額と同程度'
      ],
      correctAnswer: 2,
      explanation: '必要生命保険金額は、遺族の将来の生活費・教育費等の必要資金から、遺族年金・貯蓄等の準備済み資金を差し引いて算出するのが適切です。',
      points: 2
    },
    {
      id: 'test-q23',
      type: 'scenario',
      difficulty: 'advanced',
      category: 'ライフプラン',
      question: 'Cさん（50歳）が退職時（60歳）に資産3,000万円を保有し、4%ルールで取り崩す場合の年間取り崩し可能額はいくらですか？',
      options: [
        '100万円',
        '120万円',
        '150万円',
        '200万円'
      ],
      correctAnswer: 1,
      explanation: '4%ルールでは、退職時資産の4%を年間取り崩し可能額とします。3,000万円×4%=120万円となります。',
      points: 3
    },
    {
      id: 'test-q24',
      type: 'multiple_choice',
      difficulty: 'intermediate',
      category: '税制・制度',
      question: '住宅ローン控除（2024年現在）について正しいものはどれですか？',
      options: [
        '控除率1.0%、控除期間10年間',
        '控除率0.7%、控除期間13年間',
        '控除率0.5%、控除期間15年間',
        '控除率1.2%、控除期間10年間'
      ],
      correctAnswer: 1,
      explanation: '現在の住宅ローン控除は、控除率0.7%、控除期間13年間（一部10年間）となっています。2022年の制度改正により控除率が引き下げられました。',
      points: 2
    },
    {
      id: 'test-q25',
      type: 'multiple_choice',
      difficulty: 'basic',
      category: '投資基礎',
      question: '投資信託の信託報酬について正しい説明はどれですか？',
      options: [
        '購入時に一回だけ支払う手数料',
        '売却時に支払う手数料',
        '保有期間中に継続的に差し引かれる手数料',
        '利益が出た場合のみ支払う成功報酬'
      ],
      correctAnswer: 2,
      explanation: '信託報酬は投資信託を保有している間、継続的に差し引かれる手数料です。運用会社や販売会社への報酬として基準価額から日々差し引かれます。',
      points: 1
    },
    {
      id: 'test-q26',
      type: 'multiple_choice',
      difficulty: 'advanced',
      category: '資産運用',
      question: 'ESG投資について正しい説明はどれですか？',
      options: [
        'Environment（環境）のみを重視した投資手法',
        '短期的な利益最大化を目指す投資手法',
        'Environment（環境）、Social（社会）、Governance（企業統治）を考慮した投資手法',
        '新興国のみに投資する手法'
      ],
      correctAnswer: 2,
      explanation: 'ESG投資は、Environment（環境）、Social（社会）、Governance（企業統治）の3つの要素を考慮した投資手法で、持続可能性を重視します。',
      points: 3
    },
    {
      id: 'test-q27',
      type: 'scenario',
      difficulty: 'advanced',
      category: 'ライフプラン',
      question: 'Dさん（相続財産8,000万円、相続人は配偶者と子2人）の相続税の基礎控除額はいくらですか？',
      options: [
        '4,200万円',
        '4,800万円',
        '5,400万円',
        '6,000万円'
      ],
      correctAnswer: 1,
      explanation: '相続税の基礎控除額は「3,000万円+600万円×法定相続人数」で計算します。3,000万円+600万円×3人=4,800万円となります。',
      points: 3
    },
    {
      id: 'test-q28',
      type: 'multiple_choice',
      difficulty: 'intermediate',
      category: 'リスク管理',
      question: '医療保険とがん保険の違いについて正しいものはどれですか？',
      options: [
        '医療保険はがんのみ、がん保険は全疾病が対象',
        '医療保険は全疾病、がん保険はがんに特化した保障',
        '保障内容に違いはない',
        '医療保険は死亡保障、がん保険は医療保障'
      ],
      correctAnswer: 1,
      explanation: '医療保険は疾病やケガによる入院・手術を幅広く保障し、がん保険はがんに特化した保障（診断給付金、治療給付金など）を提供します。',
      points: 2
    },
    {
      id: 'test-q29',
      type: 'scenario',
      difficulty: 'advanced',
      category: '税制・制度',
      question: 'Eさん（年収1,000万円の会社員）がiDeCoに月額2万円拠出した場合の年間節税効果（所得税・住民税合計）はおよそいくらですか？',
      options: [
        '約4.8万円',
        '約7.2万円',
        '約9.6万円',
        '約12万円'
      ],
      correctAnswer: 1,
      explanation: '年収1,000万円の場合の所得税率は23%、住民税は10%なので、年間拠出額24万円×(23%+10%)=約7.9万円の節税効果が期待できます。',
      points: 3
    },
    {
      id: 'test-q30',
      type: 'multiple_choice',
      difficulty: 'advanced',
      category: '投資基礎',
      question: '行動ファイナンスで指摘される「損失回避バイアス」について正しい説明はどれですか？',
      options: [
        '利益を得る喜びよりも損失を回避したい気持ちが強く働く心理',
        '必ず損失を避けることができる投資手法',
        '過去の成功体験にとらわれて同じ行動を繰り返すこと',
        '群衆心理に従って投資判断を行うこと'
      ],
      correctAnswer: 0,
      explanation: '損失回避バイアスは、同じ金額であっても利益を得る喜びよりも損失を被る痛みの方を大きく感じる心理的傾向のことです。これにより非合理的な投資判断をしがちになります。',
      points: 3
    }
  ],

  resultAnalysis: {
    excellent: {
      threshold: 90,
      title: '🏆 金融リテラシーマスター',
      message: `
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 20px; color: white; text-align: center;">
          <h2 style="color: white; margin-bottom: 20px;">🎉 おめでとうございます！</h2>
          <p style="font-size: 18px; line-height: 1.8;">
            あなたは金融リテラシーの全分野において優秀な成績を収めました。
            実践的な投資戦略の実行と、継続的な学習による知識のアップデートを推奨します。
          </p>
        </div>
      `,
      recommendations: [
        '高度な投資戦略の学習を開始',
        '実際の投資実行とポートフォリオ管理',
        '最新の金融制度・税制改正の継続学習',
        '他の専門分野（不動産、事業投資等）への学習拡大'
      ]
    },
    good: {
      threshold: 80,
      title: '✅ 金融リテラシー合格',
      message: `
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 30px; border-radius: 20px; color: white; text-align: center;">
          <h2 style="color: white; margin-bottom: 20px;">🎊 合格おめでとうございます！</h2>
          <p style="font-size: 18px; line-height: 1.8;">
            金融リテラシーの基本をしっかりと理解されています。
            実践的な応用に向けて、弱点分野の補強をお勧めします。
          </p>
        </div>
      `,
      recommendations: [
        '間違えた分野のレッスンを復習',
        '実践的なシミュレーション演習',
        '少額での実際の投資体験開始検討',
        '定期的な知識の見直しと更新'
      ]
    },
    needs_improvement: {
      threshold: 60,
      title: '📚 継続学習推奨',
      message: `
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; border-radius: 20px; color: white; text-align: center;">
          <h2 style="color: white; margin-bottom: 20px;">📈 学習継続を推奨</h2>
          <p style="font-size: 18px; line-height: 1.8;">
            基本的な理解はありますが、より確実な知識の定着が必要です。
            苦手分野を中心に復習を行いましょう。
          </p>
        </div>
      `,
      recommendations: [
        '基礎レッスンの再受講',
        '間違えた問題の詳細な解説確認',
        '用語集での基本概念の確認',
        '段階的な学習計画の立案'
      ]
    },
    insufficient: {
      threshold: 0,
      title: '🔄 基礎からの再学習',
      message: `
        <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 30px; border-radius: 20px; color: white; text-align: center;">
          <h2 style="color: white; margin-bottom: 20px;">📖 基礎学習から開始</h2>
          <p style="font-size: 18px; line-height: 1.8;">
            金融リテラシーの基礎から学習を始めることをお勧めします。
            焦らず、着実に知識を積み上げていきましょう。
          </p>
        </div>
      `,
      recommendations: [
        'レッスン1から順次受講',
        '各レッスンのクイズで理解度確認',
        '用語・概念の確実な理解',
        '学習ペースの調整と継続'
      ]
    }
  },

  certificate: {
    title: '金融リテラシー修了証明書',
    description: 'この証明書は、包括的な金融リテラシー教育プログラムを修了し、実践的な投資知識を習得したことを証明するものです。',
    skills: [
      '投資の基本原則とリスク管理',
      '資産配分とポートフォリオ理論',
      '税制優遇制度の効果的活用',
      'ライフプランニングと資産形成戦略',
      '金融商品の特徴と選択方法'
    ]
  }
};