import type { CategoryTest } from '@/types';

export const cryptoBasicsTest2: CategoryTest = {
  id: 'crypto-basics-test-2',
  categoryId: 'crypto-basics',
  title: '暗号通貨基礎確認テスト2（レッスン6-10）',
  description: 'ウォレット管理、取引所選択、投資戦略の基礎知識を確認する包括的テストです。',
  lessonRange: '6-10',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'crypto-test-2-q1',
      question: 'ハードウェアウォレットの最大の利点は何ですか？',
      options: [
        '取引手数料が無料',
        '秘密鍵をオフラインで安全に保管',
        '取引速度が最も速い',
        'すべての暗号通貨に対応'
      ],
      correctAnswer: 1,
      explanation: 'ハードウェアウォレットの最大の利点は、秘密鍵をインターネットから完全に切り離されたオフライン環境で保管できることです。これによりハッキングやマルウェアから保護されます。',
      difficulty: 'beginner',
      category: 'security'
    },
    {
      id: 'crypto-test-2-q2',
      question: '2025年現在、日本で最も厳格な本人確認を実施している取引所の特徴は？',
      options: [
        'メールアドレスのみで登録可能',
        '銀行と同等のKYC（本人確認）手続き',
        '匿名での取引が可能',
        'VPN使用が必須'
      ],
      correctAnswer: 1,
      explanation: '日本の暗号通貨取引所は金融庁の厳格な規制により、銀行と同等の本人確認（KYC）手続きが義務付けられています。これにより高いセキュリティと信頼性を実現しています。',
      difficulty: 'intermediate',
      category: 'regulation'
    },
    {
      id: 'crypto-test-2-q3',
      question: 'コールドウォレットとホットウォレットの主な違いは？',
      options: [
        '保管できる通貨の種類',
        'インターネット接続の有無',
        '取引手数料の高低',
        'デバイスの大きさ'
      ],
      correctAnswer: 1,
      explanation: 'コールドウォレットはインターネットから切り離されたオフライン保管、ホットウォレットはインターネットに接続されたオンライン保管が主な違いです。',
      difficulty: 'beginner',
      category: 'security'
    },
    {
      id: 'crypto-test-2-q4',
      question: '2025年8月現在、ビットコインの1日平均取引量は約いくらですか？',
      options: [
        '約100億ドル',
        '約300億ドル',
        '約800億ドル',
        '約2,000億ドル'
      ],
      correctAnswer: 2,
      explanation: '2025年8月現在、ビットコインの1日平均取引量は約800億ドルに達し、これは多くの国の株式市場を上回る規模となっています。',
      difficulty: 'intermediate',
      category: 'market-data'
    },
    {
      id: 'crypto-test-2-q5',
      question: 'ドルコスト平均法（DCA）の主な利点は？',
      options: [
        '必ず利益が出る',
        '価格変動リスクを分散できる',
        '取引手数料が無料になる',
        '税金を回避できる'
      ],
      correctAnswer: 1,
      explanation: 'ドルコスト平均法は定期的に一定額を投資することで、価格が高い時は少なく、安い時は多く購入でき、平均購入単価を平準化してリスクを分散できます。',
      difficulty: 'intermediate',
      category: 'investment-strategy'
    },
    {
      id: 'crypto-test-2-q6',
      question: '取引所の「流動性」が高いことの意味は？',
      options: [
        '取引手数料が安い',
        '売買注文が成立しやすい',
        'セキュリティが高い',
        '対応通貨が多い'
      ],
      correctAnswer: 1,
      explanation: '流動性が高いとは、多くの売買注文があり、希望価格で迅速に取引が成立しやすい状態を指します。これにより価格の安定性も向上します。',
      difficulty: 'intermediate',
      category: 'trading-basics'
    },
    {
      id: 'crypto-test-2-q7',
      question: 'シードフレーズ（リカバリーフレーズ）の適切な管理方法は？',
      options: [
        'スマートフォンのメモ帳に保存',
        '紙に書いて複数箇所に分散保管',
        'クラウドストレージに暗号化保存',
        'メールで自分に送信'
      ],
      correctAnswer: 1,
      explanation: 'シードフレーズは紙に手書きで記録し、火災や盗難に備えて複数の安全な場所に分散して保管するのが最も安全な方法です。',
      difficulty: 'beginner',
      category: 'security'
    },
    {
      id: 'crypto-test-2-q8',
      question: '2025年現在の日本の暗号通貨税制の特徴は？',
      options: [
        '完全非課税',
        '雑所得として総合課税',
        '分離課税で20%固定',
        '法人税のみ課税'
      ],
      correctAnswer: 1,
      explanation: '日本では暗号通貨の売却益は雑所得として総合課税され、所得に応じて15-55%の税率が適用されます。2025年現在も分離課税への移行は実現していません。',
      difficulty: 'intermediate',
      category: 'regulation'
    },
    {
      id: 'crypto-test-2-q9',
      question: 'レバレッジ取引の最大リスクは？',
      options: [
        '取引手数料が高くなる',
        '投資元本を超える損失の可能性',
        '取引速度が遅くなる',
        '税率が高くなる'
      ],
      correctAnswer: 1,
      explanation: 'レバレッジ取引では証拠金以上の金額で取引するため、相場が予想と逆に動いた場合、投資元本を超える損失（追証）が発生する可能性があります。',
      difficulty: 'advanced',
      category: 'risk-management'
    },
    {
      id: 'crypto-test-2-q10',
      question: '暗号通貨投資における「HODL」戦略とは？',
      options: [
        '頻繁に売買を繰り返す',
        '長期保有を続ける',
        '他の投資家を避ける',
        '借金をして投資する'
      ],
      correctAnswer: 1,
      explanation: 'HODL（Hold On for Dear Life）は、短期的な価格変動に惑わされず、長期間保有し続ける投資戦略です。2013年のビットコイン掲示板の誤字が語源となっています。',
      difficulty: 'beginner',
      category: 'investment-strategy'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};