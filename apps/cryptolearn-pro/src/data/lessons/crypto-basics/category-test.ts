import type { CategoryTest } from '@/types';

export const cryptoBasicsCategoryTest: CategoryTest = {
  id: 'crypto-basics-category-test',
  categoryId: 'crypto-basics',
  title: '暗号通貨基礎カテゴリー総合確認テスト',
  description: '50レッスン全範囲の暗号通貨基礎知識を包括的に確認する最終テストです。2025年8月最新データ対応・25問で合格者には修了証を発行します。',
  lessonRange: '1-50',
  passingScore: 85,
  timeLimit: 50,
  questions: [
    {
      id: 'crypto-category-q1',
      question: '2025年8月14日にビットコインが記録した史上最高値はいくらですか？',
      options: [
        '$100,000',
        '$124,496',
        '$150,000',
        '$200,000'
      ],
      correctAnswer: 1,
      explanation: '2025年8月14日にビットコインは史上最高値$124,496を記録し、前回の最高値を約69%上回る歴史的水準に達しました。',
      difficulty: 'beginner',
      category: 'market-data'
    },
    {
      id: 'crypto-category-q2',
      question: 'ビットコインの供給量上限は何BTCですか？',
      options: [
        '1,800万BTC',
        '2,100万BTC',
        '2,500万BTC',
        '無制限'
      ],
      correctAnswer: 1,
      explanation: 'ビットコインの供給量上限は2,100万BTCと厳格に設定されており、これが希少性と価値保存特性を実現する基盤となっています。',
      difficulty: 'beginner',
      category: 'technical-basics'
    },
    {
      id: 'crypto-category-q3',
      question: 'イーサリアムの最大の革新は何ですか？',
      options: [
        '取引速度の向上',
        'スマートコントラクト機能',
        '手数料の削減',
        '完全な匿名性'
      ],
      correctAnswer: 1,
      explanation: 'イーサリアムの最大の革新はスマートコントラクト機能で、これによりDeFi、NFT、DAOなど様々な分散型アプリケーションが実現されました。',
      difficulty: 'beginner',
      category: 'technical-basics'
    },
    {
      id: 'crypto-category-q4',
      question: 'ハードウェアウォレットの最大の利点は？',
      options: [
        '取引手数料が無料',
        '秘密鍵をオフラインで安全に保管',
        '取引速度が最も速い',
        'すべての暗号通貨に対応'
      ],
      correctAnswer: 1,
      explanation: 'ハードウェアウォレットは秘密鍵をインターネットから完全に切り離されたオフライン環境で保管し、最高レベルのセキュリティを提供します。',
      difficulty: 'beginner',
      category: 'security'
    },
    {
      id: 'crypto-category-q5',
      question: 'DeFi（分散型金融）の最大の特徴は？',
      options: [
        '中央銀行による管理',
        '中間者なしの金融サービス',
        '政府による保証',
        '固定金利のみ提供'
      ],
      correctAnswer: 1,
      explanation: 'DeFiは銀行などの中間者を介さず、スマートコントラクトにより自動化された透明で効率的な金融サービスを提供します。',
      difficulty: 'beginner',
      category: 'defi-basics'
    },
    {
      id: 'crypto-category-q6',
      question: 'NFT（Non-Fungible Token）の最大の特徴は？',
      options: [
        '分割して取引できる',
        '代替不可能でユニークな価値',
        '価格が常に一定',
        '匿名で取引される'
      ],
      correctAnswer: 1,
      explanation: 'NFTは「Non-Fungible（代替不可能）」の通り、他のトークンと交換できないユニークな価値を持ち、デジタル資産の所有権を証明します。',
      difficulty: 'beginner',
      category: 'nft-basics'
    },
    {
      id: 'crypto-category-q7',
      question: 'メタバースで真の所有権を可能にする技術は？',
      options: [
        'VR（仮想現実）技術',
        'NFT（非代替性トークン）',
        'AI（人工知能）',
        '5G通信技術'
      ],
      correctAnswer: 1,
      explanation: 'メタバースではNFT技術により、仮想世界のアイテムや土地の真の所有権を証明し、プラットフォームを超えた資産移動が可能になります。',
      difficulty: 'intermediate',
      category: 'web3-basics'
    },
    {
      id: 'crypto-category-q8',
      question: '2024年4月のビットコイン半減期後のブロック報酬は？',
      options: [
        '12.5 BTC',
        '6.25 BTC',
        '3.125 BTC',
        '1.5625 BTC'
      ],
      correctAnswer: 2,
      explanation: '2024年4月の半減期により、ビットコインのブロック報酬は6.25 BTCから3.125 BTCに半減し、新規供給が減少して希少性が高まりました。',
      difficulty: 'intermediate',
      category: 'technical-basics'
    },
    {
      id: 'crypto-category-q9',
      question: 'イーサリアムのProof of Stake移行によるエネルギー削減率は？',
      options: [
        '約50%',
        '約80%',
        '約99.95%',
        '約30%'
      ],
      correctAnswer: 2,
      explanation: 'イーサリアムは2022年のProof of Stakeへの移行により、エネルギー消費を99.95%削減し、環境問題への大きな解決策となりました。',
      difficulty: 'intermediate',
      category: 'environmental-impact'
    },
    {
      id: 'crypto-category-q10',
      question: '2025年3月に日本で導入された新ライセンスは？',
      options: [
        'VASP（仮想資産サービス業者）',
        'CAISP（暗号通貨仲介サービス業者）',
        'DASP（デジタル資産サービス業者）',
        'FASP（金融暗号サービス業者）'
      ],
      correctAnswer: 1,
      explanation: '2025年3月に日本では新たにCAISP（暗号通貨仲介サービス業者）ライセンスが導入され、暗号通貨関連サービスの法的枠組みが拡充されました。',
      difficulty: 'advanced',
      category: 'regulation'
    },
    {
      id: 'crypto-category-q11',
      question: 'MakerDAOの主な機能は？',
      options: [
        'NFTの作成',
        'DAIステーブルコインの発行・管理',
        'ゲーム開発',
        '音楽配信'
      ],
      correctAnswer: 1,
      explanation: 'MakerDAOはDAIステーブルコインの発行・管理を行う分散型組織で、暗号資産を担保としてDAIを生成し価格安定性を維持しています。',
      difficulty: 'intermediate',
      category: 'dao-basics'
    },
    {
      id: 'crypto-category-q12',
      question: 'Lightning Networkの主な機能は？',
      options: [
        'イーサリアムの高速化',
        'ビットコインの即時決済',
        'NFTの作成',
        'マイニングの効率化'
      ],
      correctAnswer: 1,
      explanation: 'Lightning NetworkはビットコインのLayer 2ソリューションで、ペイメントチャネルを使用してビットコインの即時・低手数料決済を実現します。',
      difficulty: 'intermediate',
      category: 'technical-basics'
    },
    {
      id: 'crypto-category-q13',
      question: '2025年現在のビットコインETF累積資金流入額は約いくらですか？',
      options: [
        '約500億ドル',
        '約800億ドル',
        '約1,200億ドル',
        '約2,000億ドル'
      ],
      correctAnswer: 2,
      explanation: '2024年1月のETF承認開始から2025年8月まで、ビットコインETFには累計約1,200億ドルの資金が流入し、機関投資家の本格参入を実現しました。',
      difficulty: 'intermediate',
      category: 'institutional-adoption'
    },
    {
      id: 'crypto-category-q14',
      question: 'ドルコスト平均法（DCA）の主な利点は？',
      options: [
        '必ず利益が出る',
        '価格変動リスクを時間分散できる',
        '税金を回避できる',
        '手数料が無料になる'
      ],
      correctAnswer: 1,
      explanation: 'ドルコスト平均法は定期的な投資により、価格が高い時は少なく、安い時は多く購入し、平均購入単価を平準化してリスクを分散します。',
      difficulty: 'intermediate',
      category: 'investment-strategy'
    },
    {
      id: 'crypto-category-q15',
      question: '2025年現在の日本の暗号通貨税制の特徴は？',
      options: [
        '完全非課税',
        '雑所得として総合課税（15-55%）',
        '分離課税で20%固定',
        '法人税のみ課税'
      ],
      correctAnswer: 1,
      explanation: '日本では暗号通貨の売却益は雑所得として総合課税され、所得に応じて15-55%の税率が適用されます。分離課税への移行は2025年現在も実現していません。',
      difficulty: 'intermediate',
      category: 'taxation'
    },
    {
      id: 'crypto-category-q16',
      question: 'KYC（Know Your Customer）の主な目的は？',
      options: [
        '取引手数料の削減',
        'マネーロンダリング防止と顧客身元確認',
        '取引速度の向上',
        '税金の免除'
      ],
      correctAnswer: 1,
      explanation: 'KYCは、マネーロンダリングやテロ資金供与を防止するため、顧客の身元確認と取引の正当性を検証する重要な手続きです。',
      difficulty: 'beginner',
      category: 'compliance'
    },
    {
      id: 'crypto-category-q17',
      question: '量子コンピューティングが暗号通貨に与える主要リスクは？',
      options: [
        '取引速度の低下',
        '現行暗号技術の破綻',
        '電力消費の増加',
        'ストレージ容量不足'
      ],
      correctAnswer: 1,
      explanation: '量子コンピューティングは現行の公開鍵暗号を破綻させる可能性があり、15-20年以内の実用化に備えて量子耐性暗号への移行が必要です。',
      difficulty: 'advanced',
      category: 'security'
    },
    {
      id: 'crypto-category-q18',
      question: '2030年の暗号通貨楽観シナリオでの市場規模予測は？',
      options: [
        '$10-20兆',
        '$30-40兆',
        '$50-100兆',
        '$200兆以上'
      ],
      correctAnswer: 2,
      explanation: '2030年の楽観シナリオでは、暗号通貨市場規模は$50-100兆に達し、日常決済の30-50%がデジタル通貨になると予測されています。',
      difficulty: 'advanced',
      category: 'market-analysis'
    },
    {
      id: 'crypto-category-q19',
      question: 'レバレッジ取引の最大リスクは？',
      options: [
        '取引手数料が高くなる',
        '投資元本を超える損失の可能性',
        '取引速度が遅くなる',
        '税率が高くなる'
      ],
      correctAnswer: 1,
      explanation: 'レバレッジ取引では証拠金以上の金額で取引するため、相場が予想と逆に動いた場合、投資元本を超える損失（追証）が発生する可能性があります。',
      difficulty: 'intermediate',
      category: 'risk-management'
    },
    {
      id: 'crypto-category-q20',
      question: '2025年8月現在のグローバル暗号通貨市場規模は約いくらですか？',
      options: [
        '約2兆ドル',
        '約3兆ドル',
        '約4.11兆ドル',
        '約6兆ドル'
      ],
      correctAnswer: 2,
      explanation: '2025年8月現在、グローバル暗号通貨市場規模は約4.11兆ドル（617兆円）に達し、多くの国のGDPを上回る規模となっています。',
      difficulty: 'intermediate',
      category: 'market-data'
    },
    {
      id: 'crypto-category-q21',
      question: '2025年版AI投資戦略で最も重要な要素は？',
      options: [
        '短期的な利益最大化',
        'AI感情制御と規律維持',
        '高頻度取引のみ',
        '完全な自動化'
      ],
      correctAnswer: 1,
      explanation: '2025年のAI投資戦略では、投資心理・感情制御技術とAIによる規律維持が最重要要素となり、人間の認知バイアスを排除した合理的判断を実現します。',
      difficulty: 'advanced',
      category: 'investment-psychology'
    },
    {
      id: 'crypto-category-q22',
      question: '2025年のセキュリティ脅威で最も深刻な新興リスクは？',
      options: [
        'パスワード攻撃',
        'AI生成ディープフェイク詐欺',
        '従来のフィッシング',
        'USBマルウェア'
      ],
      correctAnswer: 1,
      explanation: '2025年ではAI生成ディープフェイク技術による本人なりすまし詐欺が最も深刻で、リアルタイム音声・映像偽造により従来の本人確認手法が無効化されています。',
      difficulty: 'advanced',
      category: 'security-threats'
    },
    {
      id: 'crypto-category-q23',
      question: '暗号通貨の将来にとって最も重要な要因は？',
      options: [
        '価格の上昇のみ',
        '技術革新、規制整備、社会実装のバランス',
        '政府による完全管理',
        '投機的取引の拡大'
      ],
      correctAnswer: 1,
      explanation: '暗号通貨の健全な発展には、技術的革新の継続、適切な規制環境の整備、実用的な社会実装の3つのバランスが最も重要です。',
      difficulty: 'advanced',
      category: 'future-outlook'
    },
    {
      id: 'crypto-category-q24',
      question: '2025年のスマート投資戦略で重要なSMART目標の「S」は何を意味しますか？',
      options: [
        'Simple（シンプル）',
        'Specific（具体的）',
        'Speed（迅速）',
        'Safe（安全）'
      ],
      correctAnswer: 1,
      explanation: 'SMART目標の「S」はSpecific（具体的）を意味し、「暗号通貨で稼ぎたい」ではなく「5年で住宅購入頭金3,000万円をAI投資戦略で準備」など明確な目標設定が必要です。',
      difficulty: 'intermediate',
      category: 'investment-strategy'
    },
    {
      id: 'crypto-category-q25',
      question: '2025年のESG投資において暗号通貨が抱える主要課題は？',
      options: [
        '取引速度の問題',
        '環境負荷とエネルギー消費問題',
        '手数料の高さ',
        '技術的複雑性'
      ],
      correctAnswer: 1,
      explanation: 'ESG（環境・社会・ガバナンス）投資において、特にビットコインのProof of Workによる高いエネルギー消費が環境面での主要課題となっています。',
      difficulty: 'intermediate',
      category: 'sustainable-investing'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};