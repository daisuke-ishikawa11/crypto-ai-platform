import { CategoryAssessment } from '@/lib/types/learning';

export const advancedInvestmentAssessment: CategoryAssessment = {
  id: 'assessment-advanced-investment',
  categoryId: 'advanced-investment',
  title: '高度な投資戦略 総合テスト',
  description: 'ポートフォリオ管理、自動取引、税務知識、高度な分析手法などの上級者向け投資戦略の理解度を確認します',
  difficultyLevel: 'advanced',
  estimatedMinutes: 35,
  passingScore: 80,
  totalPoints: 150,
  questions: [
    {
      id: 'ai-assessment-1',
      questionType: 'multiple_choice',
      question: '効率的フロンティア理論において、最適なポートフォリオの条件は？',
      options: [
        '最も高いリターンを持つ',
        '最も低いリスクを持つ',
        '同じリスクレベルで最大リターンを提供',
        '最も多くの銘柄を含む'
      ],
      correctAnswer: '2',
      explanation: '効率的フロンティアでは、同じリスクレベルにおいて最大のリターンを提供する、または同じリターンレベルで最小のリスクを持つポートフォリオが最適とされます。',
      points: 10,
      difficultyLevel: 'advanced',
      tags: ['効率的フロンティア', 'ポートフォリオ理論', 'リスクリターン']
    },
    {
      id: 'ai-assessment-2',
      questionType: 'multiple_choice',
      question: 'シャープレシオの計算式で正しいのは？',
      options: [
        '（ポートフォリオリターン - リスクフリーレート）÷ 標準偏差',
        'ポートフォリオリターン ÷ リスクフリーレート',
        '標準偏差 ÷ ポートフォリオリターン',
        'ポートフォリオリターン × 標準偏差'
      ],
      correctAnswer: '0',
      explanation: 'シャープレシオは超過リターン（ポートフォリオリターン - リスクフリーレート）をリスク（標準偏差）で割った値で、リスク調整後リターンを測定します。',
      points: 10,
      difficultyLevel: 'advanced',
      tags: ['シャープレシオ', 'リスク調整後リターン', 'ポートフォリオ評価']
    },
    {
      id: 'ai-assessment-3',
      questionType: 'true_false',
      question: 'ドルコスト平均法は、ボラティリティが高い資産ほど効果的である。',
      correctAnswer: 'true',
      explanation: 'ドルコスト平均法は価格変動が大きいほど、平均購入価格を平準化する効果が高まるため、ボラティリティの高い資産で特に有効です。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['ドルコスト平均法', 'ボラティリティ', '投資手法']
    },
    {
      id: 'ai-assessment-4',
      questionType: 'multiple_choice',
      question: 'リバランシングを行う主な目的は？',
      options: [
        '取引回数を増やす',
        'リスク水準を目標レベルに維持',
        '手数料を多く支払う',
        '最新の投資商品に乗り換える'
      ],
      correctAnswer: '1',
      explanation: 'リバランシングは、市場変動により変化したポートフォリオの資産配分を元の目標配分に戻し、意図したリスク水準を維持する目的で行います。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['リバランシング', 'アセットアロケーション', 'リスク管理']
    },
    {
      id: 'ai-assessment-5',
      questionType: 'multiple_choice',
      question: 'アルゴリズム取引（Algo Trading）の主な利点は？',
      options: [
        '必ず利益が出る',
        '感情の影響を排除し一貫した執行',
        '人間よりも安い',
        '規制がない'
      ],
      correctAnswer: '1',
      explanation: 'アルゴリズム取引は事前に設定したルールに基づいて自動実行されるため、人間の感情による判断ミスを排除し、一貫性のある取引戦略の実行が可能です。',
      points: 10,
      difficultyLevel: 'advanced',
      tags: ['アルゴリズム取引', '自動売買', '感情排除']
    },
    {
      id: 'ai-assessment-6',
      questionType: 'true_false',
      question: '日本では暗号通貨の売却益は雑所得として総合課税の対象となる。',
      correctAnswer: 'true',
      explanation: '日本の税制では、暗号通貨の売却益は雑所得として扱われ、他の所得と合算して総合課税（累進課税）が適用されます。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['暗号通貨税制', '雑所得', '総合課税']
    },
    {
      id: 'ai-assessment-7',
      questionType: 'multiple_choice',
      question: 'VaR（Value at Risk）が示すのは？',
      options: [
        '期待リターン',
        '一定期間・信頼水準での最大損失額',
        '平均的な利益',
        '取引手数料'
      ],
      correctAnswer: '1',
      explanation: 'VaRは、一定の期間と信頼水準（例：95%）において発生しうる最大損失額を統計的に推定するリスク管理指標です。',
      points: 10,
      difficultyLevel: 'advanced',
      tags: ['VaR', 'リスク管理', '統計的指標']
    },
    {
      id: 'ai-assessment-8',
      questionType: 'multiple_choice',
      question: 'ヘッジファンドでよく使われる「ロング・ショート戦略」とは？',
      options: [
        '長期投資と短期投資を組み合わせる',
        '買いポジションと売りポジションを同時に保有',
        '高額商品と低額商品を取引する',
        '国内と海外の両方に投資する'
      ],
      correctAnswer: '1',
      explanation: 'ロング・ショート戦略は、上昇期待銘柄を買い（ロング）、下落期待銘柄を売る（ショート）ポジションを同時に保有し、市場中立的な収益を狙う戦略です。',
      points: 10,
      difficultyLevel: 'advanced',
      tags: ['ロングショート戦略', 'ヘッジファンド', 'マーケットニュートラル']
    },
    {
      id: 'ai-assessment-9',
      questionType: 'true_false',
      question: 'ブラックスワン事象は統計的に予測可能な極端なイベントである。',
      correctAnswer: 'false',
      explanation: 'ブラックスワン事象は予測困難で稀だが極めて大きな影響を与える事象です。統計的には予測困難であるからこそ「ブラックスワン」と呼ばれます。',
      points: 10,
      difficultyLevel: 'advanced',
      tags: ['ブラックスワン', '予測困難イベント', 'リスク管理']
    },
    {
      id: 'ai-assessment-10',
      questionType: 'multiple_choice',
      question: 'オプション取引でプット・コール・パリティが示すのは？',
      options: [
        'プットとコールの価格は常に同じ',
        'プットとコールの価格関係の理論値',
        'どちらのオプションも利益が出ない',
        '行使価格が同じなら価格も同じ'
      ],
      correctAnswer: '1',
      explanation: 'プット・コール・パリティは、同じ満期日・行使価格のプットオプションとコールオプションの価格関係を示す理論で、裁定機会の発見に活用されます。',
      points: 10,
      difficultyLevel: 'advanced',
      tags: ['オプション', 'プットコールパリティ', '裁定理論']
    },
    {
      id: 'ai-assessment-11',
      questionType: 'multiple_choice',
      question: '量的取引戦略（Quantitative Strategy）の基礎となるのは？',
      options: [
        'ファンダメンタル分析のみ',
        '統計・数学モデルとデータ分析',
        '感情的判断',
        '他人の意見'
      ],
      correctAnswer: '1',
      explanation: '量的取引戦略は大量の過去データを統計・数学的手法で分析し、パターンや規則性を発見して体系化した取引戦略です。',
      points: 10,
      difficultyLevel: 'advanced',
      tags: ['クオンツ戦略', '統計分析', 'データドリブン']
    },
    {
      id: 'ai-assessment-12',
      questionType: 'true_false',
      question: 'ファクター投資では、バリュー、グロース、モメンタムなどの特定の要因に基づいて投資を行う。',
      correctAnswer: 'true',
      explanation: 'ファクター投資は、バリュー（割安性）、グロース（成長性）、モメンタム（勢い）、クオリティ（品質）などの特定ファクターが長期的に超過リターンをもたらすという考えに基づく投資手法です。',
      points: 10,
      difficultyLevel: 'advanced',
      tags: ['ファクター投資', 'スマートベータ', '超過リターン']
    },
    {
      id: 'ai-assessment-13',
      questionType: 'multiple_choice',
      question: '機関投資家が使用するTWAP注文の目的は？',
      options: [
        '最高価格で約定させる',
        '一定期間の平均価格で約定させる',
        '最低価格で約定させる',
        '瞬時に全量約定させる'
      ],
      correctAnswer: '1',
      explanation: 'TWAP（Time Weighted Average Price）注文は、指定期間中に注文を分割執行し、時間加重平均価格での約定を目指す機関投資家向けの執行戦略です。',
      points: 10,
      difficultyLevel: 'advanced',
      tags: ['TWAP', '執行戦略', '機関投資家']
    },
    {
      id: 'ai-assessment-14',
      questionType: 'multiple_choice',
      question: 'ESG投資における最大の課題は？',
      options: [
        'リターンが必ず低くなる',
        'ESG評価基準の標準化不足',
        '投資先が限定される',
        '手数料が高い'
      ],
      correctAnswer: '1',
      explanation: 'ESG投資では、評価機関ごとに評価基準や手法が異なるため、同じ企業でもESGスコアが大きく異なる場合があり、標準化が重要な課題となっています。',
      points: 10,
      difficultyLevel: 'advanced',
      tags: ['ESG投資', '評価基準', '標準化']
    },
    {
      id: 'ai-assessment-15',
      questionType: 'true_false',
      question: '暗号通貨のステーキング報酬は、日本では受取時点で雑所得として課税される。',
      correctAnswer: 'true',
      explanation: '日本では、ステーキング報酬を受け取った時点で、その時価が雑所得として課税対象となります。さらに売却時には売却益に対しても課税されます。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['ステーキング税制', '雑所得', '暗号通貨課税']
    }
  ],
  isPublished: true,
  createdAt: new Date('2024-01-01T00:00:00Z'),
  updatedAt: new Date('2024-01-01T00:00:00Z')
};