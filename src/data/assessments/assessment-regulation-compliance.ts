import { CategoryAssessment } from '@/lib/types/learning';

export const regulationComplianceAssessment: CategoryAssessment = {
  id: 'assessment-regulation-compliance',
  categoryId: 'regulation-compliance',
  title: '規制・コンプライアンス 総合テスト',
  description: '暗号通貨・デジタル資産に関する世界各国の規制動向と法的要件の理解度を確認します',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 20,
  passingScore: 80,
  totalPoints: 100,
  questions: [
    {
      id: 'rc-assessment-1',
      questionType: 'multiple_choice',
      question: '日本の暗号資産交換業者に求められる主な規制要件は？',
      options: [
        '資本金1000万円以上の確保のみ',
        '金融庁への登録と顧客資産の分別管理',
        '取引量の制限',
        '政府による価格統制'
      ],
      correctAnswer: '1',
      explanation: '日本では金融庁への暗号資産交換業者としての登録が必須で、顧客の法定通貨・暗号資産を自己資産と分別して管理することが義務付けられています。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['日本規制', '金融庁', '分別管理']
    },
    {
      id: 'rc-assessment-2',
      questionType: 'true_false',
      question: 'KYC（Know Your Customer）は、マネーロンダリング防止のために顧客の身元確認を行うプロセスである。',
      correctAnswer: 'true',
      explanation: 'KYCは顧客の身元確認を行うプロセスで、マネーロンダリングやテロ資金供与防止のため、金融機関に義務付けられている重要な規制要件です。',
      points: 10,
      difficultyLevel: 'beginner',
      tags: ['KYC', 'マネーロンダリング防止', '身元確認']
    },
    {
      id: 'rc-assessment-3',
      questionType: 'multiple_choice',
      question: 'MiCA（Markets in Crypto-Assets）規制はどの地域の法律ですか？',
      options: [
        'アメリカ',
        'ヨーロッパ（EU）',
        '日本',
        '中国'
      ],
      correctAnswer: '1',
      explanation: 'MiCAはEU（欧州連合）の暗号資産に関する包括的な規制フレームワークで、2024年から段階的に施行される予定です。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['MiCA', 'EU規制', '暗号資産規制']
    },
    {
      id: 'rc-assessment-4',
      questionType: 'multiple_choice',
      question: 'AML（Anti-Money Laundering）における「疑わしい取引」の報告義務者は？',
      options: [
        '投資家のみ',
        '暗号資産交換業者',
        '政府機関のみ',
        '誰でも'
      ],
      correctAnswer: '1',
      explanation: '暗号資産交換業者は特定事業者として、疑わしい取引を発見した場合にFIU（金融情報機関）への報告義務があります。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['AML', '疑わしい取引', '報告義務']
    },
    {
      id: 'rc-assessment-5',
      questionType: 'true_false',
      question: 'セキュリティトークンは多くの国で証券として規制される傾向にある。',
      correctAnswer: 'true',
      explanation: 'セキュリティトークンは投資契約や証券の性質を持つため、多くの国で既存の証券法の適用対象となり、厳しい規制を受けています。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['セキュリティトークン', '証券規制', 'トークン分類']
    },
    {
      id: 'rc-assessment-6',
      questionType: 'multiple_choice',
      question: 'FATF（金融活動作業部会）のトラベルルールとは？',
      options: [
        '海外旅行時の暗号資産持参制限',
        '一定額以上の暗号資産送金時の顧客情報共有',
        '取引所間の手数料統一',
        '国際送金の時間制限'
      ],
      correctAnswer: '1',
      explanation: 'トラベルルールは、一定額以上の暗号資産送金において、送金者・受取者の情報を金融機関間で共有することを求めるFATFのガイダンスです。',
      points: 10,
      difficultyLevel: 'advanced',
      tags: ['FATF', 'トラベルルール', '国際規制']
    },
    {
      id: 'rc-assessment-7',
      questionType: 'multiple_choice',
      question: 'ステーブルコインに対する規制の主な関心事は？',
      options: [
        '価格の安定性のみ',
        '準備資産の適切な管理と透明性',
        '発行量の制限',
        '利用者数の制限'
      ],
      correctAnswer: '1',
      explanation: 'ステーブルコインの規制では、裏付け資産の適切な管理、準備金の透明性、発行者の信頼性などが主要な関心事となっています。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['ステーブルコイン規制', '準備資産', '透明性']
    },
    {
      id: 'rc-assessment-8',
      questionType: 'true_false',
      question: '日本では暗号資産の法人税計算において、期末時価評価が原則として適用される。',
      correctAnswer: 'true',
      explanation: '日本の法人税法では、暗号資産は期末に時価評価することが原則とされ、含み益も課税所得に算入されます。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['法人税', '期末時価評価', '日本税制']
    },
    {
      id: 'rc-assessment-9',
      questionType: 'multiple_choice',
      question: 'DeFiプロトコルの規制における主要課題は？',
      options: [
        '技術的な複雑さ',
        '分散化による規制対象の特定困難',
        '利用者数の多さ',
        '手数料の高さ'
      ],
      correctAnswer: '1',
      explanation: 'DeFiは分散化されているため、従来の規制フレームワークでは規制対象となる主体の特定が困難で、新しい規制アプローチが必要とされています。',
      points: 10,
      difficultyLevel: 'advanced',
      tags: ['DeFi規制', '分散化', '規制課題']
    },
    {
      id: 'rc-assessment-10',
      questionType: 'multiple_choice',
      question: '暗号資産に対する各国の規制アプローチで最も厳しいのは？',
      options: [
        'サンドボックス規制（実験的許可）',
        '全面禁止',
        '自主規制に依存',
        '規制なし'
      ],
      correctAnswer: '1',
      explanation: '中国のように暗号資産取引を全面禁止する国もあり、これが最も厳しい規制アプローチと言えます。各国の対応は大きく異なっています。',
      points: 10,
      difficultyLevel: 'beginner',
      tags: ['規制アプローチ', '全面禁止', '国際比較']
    }
  ],
  isPublished: true,
  createdAt: new Date('2024-01-01T00:00:00Z'),
  updatedAt: new Date('2024-01-01T00:00:00Z')
};