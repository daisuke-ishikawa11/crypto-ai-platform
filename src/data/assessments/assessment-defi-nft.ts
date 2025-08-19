import { CategoryAssessment } from '@/lib/types/learning';

export const defiNftAssessment: CategoryAssessment = {
  id: 'assessment-defi-nft',
  categoryId: 'defi-nft',
  title: 'DeFi・NFT入門 総合テスト',
  description: '分散型金融（DeFi）とNFTの仕組み、活用方法、リスクなどの総合的な理解度を確認します',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 25,
  passingScore: 80,
  totalPoints: 120,
  questions: [
    {
      id: 'dn-assessment-1',
      questionType: 'multiple_choice',
      question: 'DeFi（分散型金融）の最大の特徴は？',
      options: [
        '銀行が管理している',
        '中央機関なしで金融サービスを提供',
        '政府が規制している',
        '手数料が必ず安い'
      ],
      correctAnswer: '1',
      explanation: 'DeFiは中央集権的な金融機関を介さず、スマートコントラクトによって自動化された金融サービスを提供することが最大の特徴です。',
      points: 10,
      difficultyLevel: 'beginner',
      tags: ['DeFi', '分散型金融', 'スマートコントラクト']
    },
    {
      id: 'dn-assessment-2',
      questionType: 'multiple_choice',
      question: 'イールドファーミングとは何ですか？',
      options: [
        '農業に投資すること',
        'DeFiプロトコルに流動性を提供して報酬を得ること',
        '暗号通貨をマイニングすること',
        'NFTを作成すること'
      ],
      correctAnswer: '1',
      explanation: 'イールドファーミングは、DeFiプロトコルに暗号通貨を預けて流動性を提供し、その対価として利息やトークンを受け取る投資手法です。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['イールドファーミング', '流動性提供', 'DeFiプロトコル']
    },
    {
      id: 'dn-assessment-3',
      questionType: 'true_false',
      question: 'AMM（自動マーケットメーカー）では、注文板なしで取引が可能である。',
      correctAnswer: 'true',
      explanation: 'AMMは流動性プールと数学的なアルゴリズムを使用して価格を決定し、従来の注文板取引所のような売買注文なしで取引を実現します。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['AMM', '流動性プール', '分散型取引所']
    },
    {
      id: 'dn-assessment-4',
      questionType: 'multiple_choice',
      question: 'NFTの「非代替性」とはどういう意味ですか？',
      options: [
        '価値がないということ',
        '他のものと交換できないということ',
        'それぞれが固有で一意であること',
        '物理的に存在しないこと'
      ],
      correctAnswer: '2',
      explanation: '非代替性とは、それぞれのNFTが固有の特性や価値を持ち、他のNFTと1:1で交換することができないという意味です。',
      points: 10,
      difficultyLevel: 'beginner',
      tags: ['NFT', '非代替性', 'デジタル資産']
    },
    {
      id: 'dn-assessment-5',
      questionType: 'multiple_choice',
      question: 'スマートコントラクトの利点として正しくないものは？',
      options: [
        '自動実行される',
        '透明性が高い',
        '中央機関が不要',
        'バグが絶対に発生しない'
      ],
      correctAnswer: '3',
      explanation: 'スマートコントラクトにもプログラミングのバグが発生する可能性があります。実際に多くのDeFiプロジェクトでバグによる資金流出事件が発生しています。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['スマートコントラクト', 'バグリスク', 'セキュリティ']
    },
    {
      id: 'dn-assessment-6',
      questionType: 'true_false',
      question: 'ラグプル（Rug Pull）とは、開発者が流動性を引き出して逃げる詐欺行為のことである。',
      correctAnswer: 'true',
      explanation: 'ラグプルは、プロジェクトの開発者が投資家の資金を集めた後に、流動性を全て引き出して逃げる詐欺行為で、DeFi分野で多発しています。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['ラグプル', 'DeFi詐欺', 'セキュリティリスク']
    },
    {
      id: 'dn-assessment-7',
      questionType: 'multiple_choice',
      question: 'DEX（分散型取引所）の主な利点は？',
      options: [
        'カスタマーサポートが充実',
        '非保管型で秘密鍵を自分で管理',
        '政府が保証している',
        '手数料が必ず安い'
      ],
      correctAnswer: '1',
      explanation: 'DEXは非保管型（Non-custodial）で、ユーザーが秘密鍵を自分で管理できるため、取引所のハッキングリスクから資金を守ることができます。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['DEX', '非保管型', '秘密鍵管理']
    },
    {
      id: 'dn-assessment-8',
      questionType: 'multiple_choice',
      question: 'インパーマネントロス（Impermanent Loss）が発生する条件は？',
      options: [
        '流動性提供をしている期間中に価格比率が変動した時',
        '取引量が少ない時',
        'ガス代が高い時',
        'スマートコントラクトにバグがある時'
      ],
      correctAnswer: '0',
      explanation: 'インパーマネントロスは、流動性提供したトークンペアの価格比率が、提供時と比較して変動した際に発生する機会損失のことです。',
      points: 10,
      difficultyLevel: 'advanced',
      tags: ['インパーマネントロス', '流動性提供', 'DeFiリスク']
    },
    {
      id: 'dn-assessment-9',
      questionType: 'true_false',
      question: 'ガバナストークンを保有すると、そのプロトコルの運営方針について投票権を得られる。',
      correctAnswer: 'true',
      explanation: 'ガバナストークンは、DeFiプロトコルの運営方針、パラメータ変更、新機能追加などの意思決定に参加できる投票権を与えるトークンです。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['ガバナストークン', 'DAO', 'プロトコル運営']
    },
    {
      id: 'dn-assessment-10',
      questionType: 'multiple_choice',
      question: 'NFTマーケットプレイスで注意すべき点は？',
      options: [
        'すべてのNFTは必ず価値が上がる',
        '著作権侵害や偽物NFTの存在',
        'ガス代は無料である',
        '政府が価格を保証している'
      ],
      correctAnswer: '1',
      explanation: 'NFTマーケットプレイスでは著作権を無断使用した偽物や、有名アーティストの作品を勝手にNFT化したものが出品されている場合があり、注意が必要です。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['NFTマーケットプレイス', '著作権', '偽物リスク']
    },
    {
      id: 'dn-assessment-11',
      questionType: 'multiple_choice',
      question: 'レンディングプロトコルで重要なリスク指標は？',
      options: [
        'ボーナス報酬の大きさ',
        '担保率（Collateral Ratio）',
        '開発チームの知名度',
        'ユーザー数の多さ'
      ],
      correctAnswer: '1',
      explanation: '担保率は借入に対する担保の比率で、この数値が低すぎると清算リスクが高まります。適切な担保率の維持が重要です。',
      points: 10,
      difficultyLevel: 'advanced',
      tags: ['レンディング', '担保率', '清算リスク']
    },
    {
      id: 'dn-assessment-12',
      questionType: 'true_false',
      question: 'DeFiプロトコルは完全に分散化されており、開発者の影響を受けることはない。',
      correctAnswer: 'false',
      explanation: '多くのDeFiプロトコルは段階的な分散化を進めており、初期段階では開発者が管理権限を持っている場合があります。完全な分散化には時間がかかります。',
      points: 10,
      difficultyLevel: 'advanced',
      tags: ['DeFi分散化', '開発者リスク', 'プロトコル管理']
    }
  ],
  isPublished: true,
  createdAt: new Date('2024-01-01T00:00:00Z'),
  updatedAt: new Date('2024-01-01T00:00:00Z')
};