import type { CategoryTest } from '@/types';

export const riskManagementCategoryTest: CategoryTest = {
  id: 'risk-management-category-test',
  categoryId: 'risk-management',
  title: 'リスク管理・投資心理学カテゴリー総合確認テスト',
  description: '25レッスン全範囲のリスク管理と投資心理学知識を包括的に確認する最終テストです。2025年8月最新データ対応・25問で合格者には修了証を発行します。',
  lessonRange: '1-25',
  passingScore: 85,
  timeLimit: 50,
  questions: [
    {
      id: 'risk-category-q1',
      question: '分散投資におけるリスク削減の理論的根拠は何ですか？',
      options: [
        '投資金額の分散により元本保証される',
        '相関の低い資産の組み合わせでポートフォリオリスクを削減',
        '手数料が安くなるため',
        'すべての投資が同じ値動きをする'
      ],
      correctAnswer: 1,
      explanation: '分散投資では相関の低い資産を組み合わせることで、個別資産のリスクが互いに相殺され、ポートフォリオ全体のリスクが個別資産の平均リスクより低くなります。',
      difficulty: 'intermediate',
      category: 'portfolio-theory'
    },
    {
      id: 'risk-category-q2',
      question: 'VaR（バリュー・アット・リスク）の95%信頼区間が-5%の場合、どう解釈すべきですか？',
      options: [
        '95%の確率で5%以上の利益が出る',
        '95%の確率で損失は5%以下に留まる',
        '5%の確率で大きな利益が出る',
        '常に5%の損失が発生する'
      ],
      correctAnswer: 1,
      explanation: 'VaR95%が-5%の場合、正常な市場状況（95%の確率）では最大損失が5%以下に抑えられることを意味します。残り5%の確率でそれを超える損失が発生する可能性があります。',
      difficulty: 'intermediate',
      category: 'risk-measurement'
    },
    {
      id: 'risk-category-q3',
      question: '行動ファイナンスにおける「損失回避バイアス」の特徴は？',
      options: [
        '利益を得る喜びと損失を被る痛みが同じ',
        '損失を被る痛みが利益を得る喜びの約2倍強い',
        '損失を完全に無視する',
        '利益のみを重視する'
      ],
      correctAnswer: 1,
      explanation: 'プロスペクト理論により、人間は同額の利益を得る喜びより損失を被る痛みを約2-2.5倍強く感じることが実証されており、これが非合理な投資判断の原因となります。',
      difficulty: 'intermediate',
      category: 'behavioral-finance'
    },
    {
      id: 'risk-category-q4',
      question: 'レバレッジ取引でロスカット水準50%に設定した場合の意味は？',
      options: [
        '利益が50%出たら自動決済',
        '証拠金の50%の損失で強制決済',
        '50%の確率で取引が実行される',
        '手数料が50%割引される'
      ],
      correctAnswer: 1,
      explanation: 'ロスカット水準50%は、証拠金維持率が50%を下回った時点で、さらなる損失拡大を防ぐため強制的にポジションが決済される安全装置です。',
      difficulty: 'beginner',
      category: 'leverage-risk'
    },
    {
      id: 'risk-category-q5',
      question: '2025年現在の暗号通貨市場で最も効果的なリスク管理手法は？',
      options: [
        '単一銘柄への集中投資',
        'ドルコスト平均法＋分散投資＋定期リバランス',
        '高頻度取引のみ',
        '感情に基づく判断'
      ],
      correctAnswer: 1,
      explanation: 'ボラティリティの高い暗号通貨市場では、ドルコスト平均法による時間分散、複数銘柄への分散投資、定期的なリバランスを組み合わせた戦略が最も効果的です。',
      difficulty: 'intermediate',
      category: 'crypto-risk-management'
    },
    {
      id: 'risk-category-q6',
      question: 'ストレステストにおける「最悪シナリオ」として適切なものは？',
      options: [
        '通常の10%下落のみを想定',
        '過去最大級の暴落（50-80%下落）を想定',
        '価格変動なしを想定',
        '必ず利益が出る前提で計算'
      ],
      correctAnswer: 1,
      explanation: 'ストレステストでは2018年のような暴落（80%以上下落）やコロナショック、リーマンショックレベルの極端な市況悪化を想定し、ポートフォリオの耐久性を検証します。',
      difficulty: 'intermediate',
      category: 'stress-testing'
    },
    {
      id: 'risk-category-q7',
      question: 'ポートフォリオの相関係数が1.0に近い場合の問題点は？',
      options: [
        '分散効果が得られず、リスク削減効果が限定的',
        '取引手数料が高くなる',
        '税金が多くかかる',
        '特に問題はない'
      ],
      correctAnswer: 0,
      explanation: '相関係数が1.0に近いということは資産が同じような値動きをすることを意味し、分散投資の効果が得られません。真の分散には相関の低い資産の組み合わせが必要です。',
      difficulty: 'intermediate',
      category: 'portfolio-theory'
    },
    {
      id: 'risk-category-q8',
      question: '投資心理学における「アンカリング効果」とは？',
      options: [
        '船の錨を使った投資手法',
        '最初に得た情報に判断が引きずられる認知バイアス',
        '固定金利での投資',
        '長期保有戦略'
      ],
      correctAnswer: 1,
      explanation: 'アンカリング効果は、最初に提示された情報（購入価格など）が基準となり、その後の判断に過度な影響を与える認知バイアスです。客観的な分析を阻害する要因となります。',
      difficulty: 'intermediate',
      category: 'behavioral-finance'
    },
    {
      id: 'risk-category-q9',
      question: 'HODL戦略のリスク管理上の注意点は？',
      options: [
        'リスクは一切ない',
        '長期間の含み損に耐える精神力とリバランス戦略が必要',
        '短期売買より必ず良い結果になる',
        '何も考えずに放置すればよい'
      ],
      correctAnswer: 1,
      explanation: 'HODL戦略では数年にわたる含み損の期間もあるため、精神的な耐久力と、定期的なリバランス、投資継続のための生活資金確保が重要です。',
      difficulty: 'intermediate',
      category: 'long-term-strategy'
    },
    {
      id: 'risk-category-q10',
      question: '2025年のAI投資支援ツール活用時の最大のリスクは？',
      options: [
        'コストが高い',
        '過度の依存による判断力低下と説明責任の曖昧化',
        '処理速度が遅い',
        'データ量が少ない'
      ],
      correctAnswer: 1,
      explanation: 'AI投資ツールへの過度な依存は、自分自身の投資判断力を低下させ、損失発生時の原因分析や改善策検討を困難にするリスクがあります。',
      difficulty: 'advanced',
      category: 'ai-investment-risks'
    },
    {
      id: 'risk-category-q11',
      question: '投資における「メンタルヘルス管理」で重要な要素は？',
      options: [
        '投資結果のみに集中する',
        '適度な運動・睡眠・栄養と投資以外の時間確保',
        '24時間相場を監視し続ける',
        '大きな利益のみを追求する'
      ],
      correctAnswer: 1,
      explanation: '投資によるストレス管理には、適度な運動・十分な睡眠・バランスの取れた栄養摂取と、投資以外の趣味や家族との時間を確保することが重要です。',
      difficulty: 'beginner',
      category: 'mental-health'
    },
    {
      id: 'risk-category-q12',
      question: 'ポートフォリオの「最適化」において重視すべき指標は？',
      options: [
        '期待利益のみ',
        'シャープレシオ（リスクあたりリターン）',
        '投資銘柄数のみ',
        '手数料の安さのみ'
      ],
      correctAnswer: 1,
      explanation: 'シャープレシオ（期待リターン-リスクフリーレート）÷標準偏差は、取るリスクに対してどれだけ効率的にリターンを得られるかを示す重要な指標です。',
      difficulty: 'intermediate',
      category: 'portfolio-optimization'
    },
    {
      id: 'risk-category-q13',
      question: '暗号通貨投資での「逆張り投資」のリスクは？',
      options: [
        '必ず利益が出る',
        'ナイフキャッチ（さらなる下落）リスクと精神的負担',
        '手数料がかからない',
        'リスクは一切ない'
      ],
      correctAnswer: 1,
      explanation: '逆張り投資では「底値」と思った価格からさらに下落する「ナイフキャッチ」リスクがあり、含み損の拡大や精神的な負担増大に注意が必要です。',
      difficulty: 'intermediate',
      category: 'investment-strategy-risks'
    },
    {
      id: 'risk-category-q14',
      question: '危機管理において「緊急時資金」の推奨額は？',
      options: [
        '生活費の1ヶ月分',
        '生活費の3-6ヶ月分',
        '生活費の10年分',
        '緊急時資金は不要'
      ],
      correctAnswer: 1,
      explanation: '緊急時資金は、失業や病気などの予期しない事態に備え、生活費の3-6ヶ月分を投資資金とは別に現金で確保することが推奨されています。',
      difficulty: 'beginner',
      category: 'emergency-fund'
    },
    {
      id: 'risk-category-q15',
      question: 'リスク許容度を決定する主要要因は？',
      options: [
        '年齢と投資期間のみ',
        '年齢・投資期間・収入安定性・家族構成・投資経験',
        '資産額のみ',
        '運の良さのみ'
      ],
      correctAnswer: 1,
      explanation: 'リスク許容度は年齢、投資期間、収入の安定性、家族構成、投資経験、金融知識、心理的耐性など複数の要因を総合的に考慮して決定します。',
      difficulty: 'intermediate',
      category: 'risk-assessment'
    },
    {
      id: 'risk-category-q16',
      question: 'マーケットタイミングを狙う投資の最大の問題点は？',
      options: [
        '必ず成功する',
        '人間の心理的バイアスと予測の困難性',
        '手数料が安い',
        'リスクがない'
      ],
      correctAnswer: 1,
      explanation: 'マーケットタイミングを完璧に予測することは不可能で、恐怖や欲望による感情的判断、確証バイアスなどが合理的判断を阻害します。',
      difficulty: 'intermediate',
      category: 'market-timing-risks'
    },
    {
      id: 'risk-category-q17',
      question: '投資詐欺の典型的な手口として当てはまるものは？',
      options: [
        '詳細なリスク説明と過去のデータ開示',
        '「必ず儲かる」「元本保証」「高利回り確約」',
        '長期投資の推奨',
        '少額投資の勧め'
      ],
      correctAnswer: 1,
      explanation: '投資詐欺では「必ず儲かる」「元本保証」「異常に高い利回り確約」などの甘い言葉で勧誘します。真の投資にはリスクが伴うため、これらの謳い文句は危険信号です。',
      difficulty: 'beginner',
      category: 'fraud-prevention'
    },
    {
      id: 'risk-category-q18',
      question: '2025年のESG投資におけるリスク評価の重要要素は？',
      options: [
        '短期利益のみ',
        '環境・社会・ガバナンスリスクの長期影響',
        '株価変動のみ',
        '流動性のみ'
      ],
      correctAnswer: 1,
      explanation: 'ESG投資では環境規制、社会情勢変化、企業統治の問題が長期的な企業価値に与える影響を評価し、持続可能性リスクを考慮した投資判断が必要です。',
      difficulty: 'intermediate',
      category: 'esg-risks'
    },
    {
      id: 'risk-category-q19',
      question: 'レバレッジETFの主要リスクは？',
      options: [
        '手数料が安い',
        '複利効果による長期的な価値減少（ベータ・スリッページ）',
        '必ず利益が出る',
        'リスクがない'
      ],
      correctAnswer: 1,
      explanation: 'レバレッジETFは日次リバランシングにより、相場のボラティリティが高い期間では複利効果で元の指数の動きから大きく乖離する「ベータ・スリッページ」が発生します。',
      difficulty: 'advanced',
      category: 'leveraged-products-risk'
    },
    {
      id: 'risk-category-q20',
      question: 'クリプト投資における「FOMO」の対策は？',
      options: [
        '感情に従って即座に行動する',
        '計画的な投資戦略と冷静な判断期間の確保',
        '他人の投資判断をそのまま真似る',
        'SNSの情報にすぐ反応する'
      ],
      correctAnswer: 1,
      explanation: 'FOMO（Fear of Missing Out）対策には、事前に決めた投資戦略の遵守、感情的になった時の判断保留期間の設定、SNSから距離を置くことが有効です。',
      difficulty: 'intermediate',
      category: 'emotional-control'
    },
    {
      id: 'risk-category-q21',
      question: '分散投資において「真の分散」を実現するためには？',
      options: [
        '同じ業界の株を複数購入',
        '地域・業界・資産クラス・時間を分散',
        '1つの暗号通貨のみ',
        '知人の推薦銘柄のみ'
      ],
      correctAnswer: 1,
      explanation: '真の分散投資には、地理的分散（先進国・新興国）、業界分散、資産クラス分散（株・債券・暗号通貨・商品）、時間分散が必要です。',
      difficulty: 'intermediate',
      category: 'diversification-strategy'
    },
    {
      id: 'risk-category-q22',
      question: 'ドローダウン（資産の一時的下落）への心理的対処法は？',
      options: [
        'すぐに投資をやめる',
        '事前に想定したシナリオであることを確認し、長期視点を維持',
        '借金をして追加投資',
        '全て売却して現金にする'
      ],
      correctAnswer: 1,
      explanation: 'ドローダウンは投資では避けられません。事前に想定したシナリオの範囲内であれば、長期投資計画を維持し、感情的な判断を避けることが重要です。',
      difficulty: 'intermediate',
      category: 'drawdown-management'
    },
    {
      id: 'risk-category-q23',
      question: '2025年の量子コンピューティングリスクへの対策は？',
      options: [
        '完全に無視する',
        '量子耐性暗号通貨への段階的移行準備',
        '従来技術のみ使用',
        '投資をすべて中止'
      ],
      correctAnswer: 1,
      explanation: '量子コンピューティングによる暗号技術の脅威に備え、量子耐性暗号を採用した暗号通貨への段階的移行や、関連技術への分散投資が考慮されています。',
      difficulty: 'advanced',
      category: 'technological-risks'
    },
    {
      id: 'risk-category-q24',
      question: '投資における「プロスペクト理論」の実践的示唆は？',
      options: [
        '人間の行動は常に合理的',
        '利益確定は早く、損切りは遅い傾向を自覚し対策する',
        '感情を完全に信頼する',
        '他人と同じ行動を取る'
      ],
      correctAnswer: 1,
      explanation: 'プロスペクト理論によると、人間は利益は確実に確保したがり（利益確定を急ぐ）、損失は避けようとする（損切りを先延ばし）傾向があります。この認知バイアスを自覚した投資判断が必要です。',
      difficulty: 'advanced',
      category: 'behavioral-finance-application'
    },
    {
      id: 'risk-category-q25',
      question: '長期投資成功のための「4つの柱」として最も適切なものは？',
      options: [
        '運・勘・コネ・資金',
        'リスク管理・分散投資・規律・継続学習',
        '短期売買・レバレッジ・投機・感情',
        '他人任せ・一攫千金・借金投資・無計画'
      ],
      correctAnswer: 1,
      explanation: '長期投資成功には、適切なリスク管理、真の分散投資、感情に左右されない規律ある投資実行、市場変化に対応する継続的学習の4つの柱が不可欠です。',
      difficulty: 'intermediate',
      category: 'long-term-success-factors'
    }
  ],
  lastUpdated: '2025-08-21',
  factChecked: true
};