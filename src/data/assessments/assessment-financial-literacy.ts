import { CategoryAssessment } from '@/lib/types/learning';

export const financialLiteracyAssessment: CategoryAssessment = {
  id: 'assessment-financial-literacy',
  categoryId: 'financial-literacy',
  title: '投資基礎・金融リテラシー 総合テスト',
  description: '投資の基本概念、金融商品の理解、詐欺対策などの総合的な理解度を確認します',
  difficultyLevel: 'beginner',
  estimatedMinutes: 25,
  passingScore: 80,
  totalPoints: 130,
  questions: [
    {
      id: 'fl-assessment-1',
      questionType: 'multiple_choice',
      question: '投資とギャンブルの最も根本的な違いは何ですか？',
      options: [
        'リスクの大きさ',
        '分析可能性と長期的視点',
        '利益の大きさ',
        '参加の難易度'
      ],
      correctAnswer: '1',
      explanation: '投資は分析・調査に基づいて判断でき、長期的な視点で資産形成を目指します。ギャンブルは主に運に依存し、短期的な結果を求める点が根本的に異なります。',
      points: 10,
      difficultyLevel: 'beginner',
      tags: ['投資基本概念', 'ギャンブルとの違い']
    },
    {
      id: 'fl-assessment-2',
      questionType: 'multiple_choice',
      question: '複利効果を最大化するために最も重要な要素は？',
      options: [
        '高いリターンを追求する',
        '時間を味方につける（長期投資）',
        '頻繁に売買する',
        '複雑な金融商品を選ぶ'
      ],
      correctAnswer: '1',
      explanation: '複利効果は時間の経過とともに雪だるま式に効果が拡大するため、長期投資が最も重要です。時間が複利効果の最大の味方となります。',
      points: 10,
      difficultyLevel: 'beginner',
      tags: ['複利効果', '長期投資']
    },
    {
      id: 'fl-assessment-3',
      questionType: 'true_false',
      question: '「元本保証で年利20%」という投資商品は安全で魅力的な投資である。',
      correctAnswer: 'false',
      explanation: '元本保証で高い利回りを約束する投資商品は詐欺の可能性が非常に高いです。リスクとリターンは比例するため、このような商品は疑うべきです。',
      points: 10,
      difficultyLevel: 'beginner',
      tags: ['投資詐欺', 'リスクとリターン']
    },
    {
      id: 'fl-assessment-4',
      questionType: 'multiple_choice',
      question: '分散投資の主な目的は何ですか？',
      options: [
        'より多くの利益を得るため',
        'リスクを軽減するため',
        '投資を複雑にするため',
        '手数料を多く支払うため'
      ],
      correctAnswer: '1',
      explanation: '分散投資の主目的はリスクの軽減です。「卵を一つのカゴに盛るな」という格言通り、投資対象を分散することで全体のリスクを下げることができます。',
      points: 10,
      difficultyLevel: 'beginner',
      tags: ['分散投資', 'リスク管理']
    },
    {
      id: 'fl-assessment-5',
      questionType: 'multiple_choice',
      question: '投資を始める前に必ず確保すべきものは？',
      options: [
        '高額な投資資金',
        '緊急時資金（生活費6ヶ月分程度）',
        '複数の投資商品の知識',
        '投資の成功体験'
      ],
      correctAnswer: '1',
      explanation: '投資を始める前には、まず緊急時に備えた生活資金（6ヶ月分程度）を確保することが最優先です。これにより、投資資金を急に引き出す必要性を避けられます。',
      points: 10,
      difficultyLevel: 'beginner',
      tags: ['緊急資金', '投資準備']
    },
    {
      id: 'fl-assessment-6',
      questionType: 'true_false',
      question: 'インフレ率が2%の場合、預金金利が0.1%では実質的に資産価値は目減りしている。',
      correctAnswer: 'true',
      explanation: 'インフレ率2%に対して預金金利0.1%では、実質金利は-1.9%となり、資産の購買力は年間約1.9%ずつ減少していることになります。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['インフレ', '実質金利', '資産価値']
    },
    {
      id: 'fl-assessment-7',
      questionType: 'multiple_choice',
      question: 'リスク許容度を決める際に最も重要な要因は？',
      options: [
        '年収の高さ',
        '投資期間と生活状況',
        '他人の投資成功例',
        '最近の市場動向'
      ],
      correctAnswer: '1',
      explanation: 'リスク許容度は主に投資期間（いつまでに必要か）と現在の生活状況（家族構成、収入の安定性など）によって決まります。個人の状況に合わせた判断が重要です。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['リスク許容度', '投資計画']
    },
    {
      id: 'fl-assessment-8',
      questionType: 'multiple_choice',
      question: 'ドルコスト平均法の最大のメリットは？',
      options: [
        '必ず利益が出る',
        '価格変動リスクを軽減する',
        '手数料を安くする',
        '短期間で大きな利益を得る'
      ],
      correctAnswer: '1',
      explanation: 'ドルコスト平均法は、定期的に一定額を投資することで、価格が高い時は少なく、安い時は多く購入でき、平均購入価格を安定させる効果があります。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['ドルコスト平均法', '投資手法']
    },
    {
      id: 'fl-assessment-9',
      questionType: 'true_false',
      question: '投資詐欺の多くは、「限定的な機会」「急いで決断を求める」「高い利回りの保証」という特徴がある。',
      correctAnswer: 'true',
      explanation: 'これらは典型的な投資詐欺の手口です。正当な投資には必ずリスクがあり、冷静に判断する時間を奪おうとする行為は詐欺の可能性が高いです。',
      points: 10,
      difficultyLevel: 'beginner',
      tags: ['投資詐欺', '詐欺対策']
    },
    {
      id: 'fl-assessment-10',
      questionType: 'multiple_choice',
      question: '資産配分（アセットアロケーション）を決める際の基本的な考え方は？',
      options: [
        '最も利益が期待できる資産にすべて投資',
        '年齢と投資目標に応じてバランスを決める',
        'とりあえず均等に配分する',
        '専門家の真似をする'
      ],
      correctAnswer: '1',
      explanation: 'アセットアロケーションは、投資家の年齢、リスク許容度、投資目標（期間・金額）に応じて決めるのが基本です。一般的に若い時はリスク資産、高齢になるほど安全資産の比率を高めます。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['アセットアロケーション', 'ポートフォリオ']
    },
    {
      id: 'fl-assessment-11',
      questionType: 'multiple_choice',
      question: '投資における最も重要な心構えは？',
      options: [
        '短期的な利益を狙う',
        '他人の投資手法を完全に真似する',
        '自分で学習し続ける姿勢',
        '一度決めた投資を絶対に変更しない'
      ],
      correctAnswer: '2',
      explanation: '投資で成功するには継続的な学習が不可欠です。市場環境は常に変化するため、新しい知識を身につけ、自分の投資判断能力を向上させ続けることが最も重要です。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['投資心理', '継続学習']
    },
    {
      id: 'fl-assessment-12',
      questionType: 'true_false',
      question: '金融商品の手数料は投資成果に大きな影響を与えるため、必ず確認すべきである。',
      correctAnswer: 'true',
      explanation: '手数料は長期投資において複利的にマイナス効果を与えます。年間1%の手数料の差でも、30年間では大きな差となるため、手数料の確認と比較は必須です。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['手数料', '投資コスト']
    },
    {
      id: 'fl-assessment-13',
      questionType: 'multiple_choice',
      question: '投資判断で最も避けるべき行動は？',
      options: [
        '十分な情報収集',
        '感情的な売買判断',
        '専門家への相談',
        'リスク管理の実践'
      ],
      correctAnswer: '1',
      explanation: '感情的な判断（恐怖や欲に基づく売買）は投資で失敗する最大の原因です。冷静で論理的な判断を心がけ、事前に決めた投資計画に従うことが重要です。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['投資心理', '感情コントロール']
    }
  ],
  isPublished: true,
  createdAt: new Date('2024-01-01T00:00:00Z'),
  updatedAt: new Date('2024-01-01T00:00:00Z')
};