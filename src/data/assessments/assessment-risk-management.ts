import { CategoryAssessment } from '@/lib/types/learning';

export const riskManagementAssessment: CategoryAssessment = {
  id: 'assessment-risk-management',
  categoryId: 'risk-management',
  title: 'リスク管理・投資心理学 総合テスト',
  description: '投資におけるリスク管理手法と感情に左右されない投資判断のための心理学的理解度を確認します',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 25,
  passingScore: 80,
  totalPoints: 120,
  questions: [
    {
      id: 'rm-assessment-1',
      questionType: 'multiple_choice',
      question: '損失回避バイアスとは何ですか？',
      options: [
        '常に安全な投資を選ぶこと',
        '利益よりも損失の方を過大に重視する心理',
        '損失を完全に避けること',
        '高リスク投資を避けること'
      ],
      correctAnswer: '1',
      explanation: '損失回避バイアスは、同じ金額でも損失の心理的な痛みが利益の喜びよりも2倍程度大きく感じる現象で、非合理的な投資判断の原因となります。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['損失回避', '認知バイアス', '投資心理学']
    },
    {
      id: 'rm-assessment-2',
      questionType: 'multiple_choice',
      question: 'リスク管理で最も基本的な原則は？',
      options: [
        '高リターンを狙う',
        '分散投資によるリスク分散',
        '一つの投資に集中する',
        '他人の真似をする'
      ],
      correctAnswer: '1',
      explanation: '「卵を一つのカゴに盛るな」という格言通り、分散投資によってリスクを分散させることが、リスク管理の最も基本的で重要な原則です。',
      points: 10,
      difficultyLevel: 'beginner',
      tags: ['分散投資', 'リスク分散', '基本原則']
    },
    {
      id: 'rm-assessment-3',
      questionType: 'true_false',
      question: '確証バイアスは、自分の投資判断を裏付ける情報ばかりを集める傾向である。',
      correctAnswer: 'true',
      explanation: '確証バイアスは、自分の既存の信念や判断を支持する情報ばかりを探し、反対する情報を無視したり軽視したりする認知バイアスです。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['確証バイアス', '認知バイアス', '情報収集']
    },
    {
      id: 'rm-assessment-4',
      questionType: 'multiple_choice',
      question: '「2%ルール」とは何ですか？',
      options: [
        '年間リターンの目標値',
        '1回の取引で資金の2%以上のリスクを取らない',
        '月2回だけ取引する',
        '2%の手数料まで許容する'
      ],
      correctAnswer: '1',
      explanation: '2%ルールは、1回の取引で総資金の2%以上の損失リスクを負わないという資金管理の基本ルールで、長期的な資金保全のために重要です。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['2%ルール', '資金管理', 'ポジションサイジング']
    },
    {
      id: 'rm-assessment-5',
      questionType: 'multiple_choice',
      question: 'アンカリング効果の投資における影響は？',
      options: [
        '最初に見た価格に判断が引っ張られる',
        '常に安全な投資を選ぶ',
        '他人の意見に従う',
        '感情的にならない'
      ],
      correctAnswer: '0',
      explanation: 'アンカリング効果は、最初に提示された情報（アンカー）に後の判断が過度に影響される現象で、購入価格や過去の高値などが判断を歪めることがあります。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['アンカリング効果', '認知バイアス', '価格判断']
    },
    {
      id: 'rm-assessment-6',
      questionType: 'true_false',
      question: 'ストレステストは、極端な市場状況下でのポートフォリオの損失を予測するために行われる。',
      correctAnswer: 'true',
      explanation: 'ストレステストは、金融危機や市場暴落などの極端な状況を想定して、ポートフォリオがどの程度の損失を被る可能性があるかを事前に評価する手法です。',
      points: 10,
      difficultyLevel: 'advanced',
      tags: ['ストレステスト', 'リスク評価', '極端事象']
    },
    {
      id: 'rm-assessment-7',
      questionType: 'multiple_choice',
      question: '群集心理が投資に与える悪影響は？',
      options: [
        '情報収集が楽になる',
        'バブルや暴落の原因となる',
        '手数料が安くなる',
        '常に正しい判断ができる'
      ],
      correctAnswer: '1',
      explanation: '群集心理により投資家が一方向に偏ると、合理性を欠いた価格形成が起こり、バブルの形成や暴落の原因となることがあります。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['群集心理', 'バブル', '市場心理']
    },
    {
      id: 'rm-assessment-8',
      questionType: 'multiple_choice',
      question: 'ドローダウンとは何を示す指標ですか？',
      options: [
        '年間の平均リターン',
        '過去の最高値からの下落幅',
        '取引回数',
        '手数料の総額'
      ],
      correctAnswer: '1',
      explanation: 'ドローダウンは、ポートフォリオの過去の最高値から現在までの下落幅（率）を示し、投資戦略やファンドのリスク評価に使用される重要な指標です。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['ドローダウン', 'リスク指標', 'パフォーマンス評価']
    },
    {
      id: 'rm-assessment-9',
      questionType: 'true_false',
      question: '過信バイアスは、自分の投資能力を過大評価することで過度なリスクを取る原因となる。',
      correctAnswer: 'true',
      explanation: '過信バイアスは自分の能力や判断力を過大評価する心理で、これにより適切なリスク管理を怠り、過度なリスクを取ってしまう危険があります。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['過信バイアス', '認知バイアス', '過度なリスク']
    },
    {
      id: 'rm-assessment-10',
      questionType: 'multiple_choice',
      question: '相関係数が1.0に近い資産同士を組み合わせた場合の効果は？',
      options: [
        'リスク分散効果が高い',
        'リスク分散効果が低い',
        'リターンが必ず上がる',
        '手数料が安くなる'
      ],
      correctAnswer: '1',
      explanation: '相関係数が1.0に近い場合、資産価格が同じ方向に動く傾向が強いため、分散投資によるリスク軽減効果は期待できません。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['相関係数', '分散投資効果', 'ポートフォリオ理論']
    },
    {
      id: 'rm-assessment-11',
      questionType: 'multiple_choice',
      question: 'FOMO（Fear of Missing Out）が投資に与える影響は？',
      options: [
        '冷静な判断ができる',
        '機会損失を恐れて衝動的な投資をする',
        '長期投資ができる',
        'リスク管理が向上する'
      ],
      correctAnswer: '1',
      explanation: 'FOMOは「取り残される恐怖」により、十分な検討なしに流行りの投資に飛びつく心理で、高値掴みや不適切な投資判断の原因となります。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['FOMO', '投資心理', '衝動的判断']
    },
    {
      id: 'rm-assessment-12',
      questionType: 'true_false',
      question: 'リスクパリティ戦略では、各資産のリスク寄与度を均等にするように配分する。',
      correctAnswer: 'true',
      explanation: 'リスクパリティ戦略は、金額ベースではなく各資産のリスク寄与度（ボラティリティ等）を均等化することで、より効率的なリスク分散を目指す手法です。',
      points: 10,
      difficultyLevel: 'advanced',
      tags: ['リスクパリティ', '資産配分', '高度な分散投資']
    }
  ],
  isPublished: true,
  createdAt: new Date('2024-01-01T00:00:00Z'),
  updatedAt: new Date('2024-01-01T00:00:00Z')
};