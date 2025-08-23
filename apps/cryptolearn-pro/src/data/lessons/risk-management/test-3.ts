import type { CategoryTest } from '@/types';

export const riskManagementTest3: CategoryTest = {
  id: 'risk-management-test-3',
  categoryId: 'risk-management',
  title: 'リスク管理・投資心理学確認テスト3（レッスン11-15）',
  description: 'VaR、ストレステスト、レバレッジリスク、投資詐欺対策の確認テストです。',
  lessonRange: '11-15',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'risk-test-3-q1',
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
      id: 'risk-test-3-q2',
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
      id: 'risk-test-3-q3',
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
      id: 'risk-test-3-q4',
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
      id: 'risk-test-3-q5',
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
      id: 'risk-test-3-q6',
      question: 'ポンツィスキームの特徴として正しいものは？',
      options: [
        '実際の事業による利益を配当',
        '新規投資家の資金で既存投資家に配当を支払う',
        '政府認可の正式な投資制度',
        '必ず成功する投資手法'
      ],
      correctAnswer: 1,
      explanation: 'ポンツィスキームは実際の利益ではなく、新規参加者の投資資金を既存参加者への配当に回すネズミ講の一種で、最終的に必ず破綻します。',
      difficulty: 'intermediate',
      category: 'ponzi-scheme'
    },
    {
      id: 'risk-test-3-q7',
      question: 'ストレステストで想定すべき「テールリスク」とは？',
      options: [
        '通常想定される小さなリスク',
        '発生確率は低いが影響が極めて大きいリスク',
        '手数料のリスク',
        '取引時間のリスク'
      ],
      correctAnswer: 1,
      explanation: 'テールリスクは正規分布の端（テール）に位置する、発生確率は低いものの発生時の影響が極めて大きいリスクで、リーマンショックやコロナショックなどが該当します。',
      difficulty: 'advanced',
      category: 'tail-risk'
    },
    {
      id: 'risk-test-3-q8',
      question: '「最大ドローダウン」が示す重要な情報は？',
      options: [
        '最大利益の大きさ',
        '過去の最大累積損失の大きさ',
        '投資期間の長さ',
        '手数料の高さ'
      ],
      correctAnswer: 1,
      explanation: '最大ドローダウンは、過去の最高値から最安値までの最大累積損失を示し、そのポートフォリオや投資戦略が経験した最悪期の損失規模を把握できます。',
      difficulty: 'intermediate',
      category: 'drawdown-analysis'
    },
    {
      id: 'risk-test-3-q9',
      question: '高利回り投資商品の見極めで重要な質問は？',
      options: [
        '「どうやってそんな高利回りを実現しているか」',
        '「いくら利益が出るか」のみ',
        '「誰が勧めているか」のみ',
        '「人気があるか」のみ'
      ],
      correctAnswer: 0,
      explanation: '異常に高い利回りを謳う商品には必ず裏があります。「なぜそんな高利回りが可能なのか」「どこにリスクが隠れているか」を徹底的に調べることが詐欺回避の鍵です。',
      difficulty: 'intermediate',
      category: 'investment-due-diligence'
    },
    {
      id: 'risk-test-3-q10',
      question: 'ストレステストの結果、想定を超える損失が予測された場合の対応は？',
      options: [
        '何もしない',
        'ポジションサイズ削減や分散強化でリスク調整',
        '投資をすべて中止',
        '更にリスクを取る'
      ],
      correctAnswer: 1,
      explanation: 'ストレステストで許容範囲を超える損失が予測される場合、ポジションサイズの縮小、より分散の効いた資産配分への変更、ヘッジ手法の導入などでリスクを適切に調整します。',
      difficulty: 'intermediate',
      category: 'risk-adjustment'
    }
  ],
  lastUpdated: '2025-08-21',
  factChecked: true
};