import type { CategoryTest } from '@/types';

export const cryptoBasicsTest8: CategoryTest = {
  id: 'crypto-basics-test-8',
  categoryId: 'crypto-basics',
  title: '暗号通貨基礎確認テスト8（レッスン36-40）',
  description: '機関投資家参入、グローバル動向、技術革新、社会実装の知識を確認するテストです。',
  lessonRange: '36-40',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'crypto-test-8-q1',
      question: '2025年現在のビットコインETF累積資金流入額は約いくらですか？',
      options: [
        '約500億ドル',
        '約800億ドル',
        '約1,200億ドル',
        '約2,000億ドル'
      ],
      correctAnswer: 2,
      explanation: '2024年1月のビットコインETF承認開始から2025年8月まで、累計約1,200億ドルの資金が流入し、機関投資家の本格的参入を実現しました。',
      difficulty: 'intermediate',
      category: 'institutional-adoption'
    },
    {
      id: 'crypto-test-8-q2',
      question: 'MicroStrategyのビットコイン投資戦略の特徴は？',
      options: [
        '短期トレーディング',
        '長期保有（HODL）戦略',
        '定期的な売却',
        'デリバティブ取引'
      ],
      correctAnswer: 1,
      explanation: 'MicroStrategyは2020年からビットコインを企業の主要資産として長期保有（HODL）する戦略を採用し、現在約$15億相当のビットコインを保有しています。',
      difficulty: 'intermediate',
      category: 'institutional-adoption'
    },
    {
      id: 'crypto-test-8-q3',
      question: 'エルサルバドルがビットコインを法定通貨にした年は？',
      options: [
        '2020年',
        '2021年',
        '2022年',
        '2023年'
      ],
      correctAnswer: 1,
      explanation: 'エルサルバドルは2021年9月にビットコインを世界初の法定通貨として採用し、国家レベルでの暗号通貨導入の先駆けとなりました。',
      difficulty: 'beginner',
      category: 'global-adoption'
    },
    {
      id: 'crypto-test-8-q4',
      question: 'イーサリアム2.0の主要アップグレードは何ですか？',
      options: [
        'Proof of Workの強化',
        'Proof of Stakeへの移行とシャーディング',
        '手数料の完全廃止',
        '中央集権化の導入'
      ],
      correctAnswer: 1,
      explanation: 'イーサリアム2.0は、Proof of Stakeへの移行（完了）とシャーディングによるスケーラビリティ向上が主要なアップグレードです。',
      difficulty: 'intermediate',
      category: 'technical-innovation'
    },
    {
      id: 'crypto-test-8-q5',
      question: '2025年現在のグローバル暗号通貨市場規模は約いくらですか？',
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
      id: 'crypto-test-8-q6',
      question: 'PolygonやArbitrumなどのLayer 2ソリューションの主目的は？',
      options: [
        '新しい暗号通貨の発行',
        'イーサリアムの手数料削減と高速化',
        'ビットコインの機能拡張',
        'NFTの自動生成'
      ],
      correctAnswer: 1,
      explanation: 'PolygonやArbitrumなどのLayer 2ソリューションは、イーサリアムのスケーラビリティ問題を解決し、手数料削減と取引高速化を実現します。',
      difficulty: 'intermediate',
      category: 'technical-innovation'
    },
    {
      id: 'crypto-test-8-q7',
      question: 'クロスチェーンブリッジの主な機能は？',
      options: [
        'マイニング効率の向上',
        '異なるブロックチェーン間での資産移動',
        'ウォレットのセキュリティ強化',
        '取引手数料の統一'
      ],
      correctAnswer: 1,
      explanation: 'クロスチェーンブリッジは、ビットコイン、イーサリアム、ソラナなど異なるブロックチェーン間で暗号通貨やNFTを移動できる技術です。',
      difficulty: 'advanced',
      category: 'technical-innovation'
    },
    {
      id: 'crypto-test-8-q8',
      question: '機関投資家の暗号通貨投資における主な理由は？',
      options: [
        '短期的な利益獲得',
        'ポートフォリオ分散とインフレヘッジ',
        '規制回避',
        '技術的興味'
      ],
      correctAnswer: 1,
      explanation: '機関投資家は、ポートフォリオの分散化、インフレーションヘッジ、デジタル資産への長期的な価値投資として暗号通貨を採用しています。',
      difficulty: 'intermediate',
      category: 'institutional-adoption'
    },
    {
      id: 'crypto-test-8-q9',
      question: 'ステーブルコインの規制で日本が世界初となった取り組みは？',
      options: [
        '完全な利用禁止',
        '包括的なステーブルコイン規制法の制定',
        '無制限な発行許可',
        '税制優遇措置'
      ],
      correctAnswer: 1,
      explanation: '日本は2023年6月に世界初の包括的なステーブルコイン規制法を施行し、発行体の登録制や準備金要件などを明確化しました。',
      difficulty: 'advanced',
      category: 'regulation'
    },
    {
      id: 'crypto-test-8-q10',
      question: '暗号通貨の社会実装における「金融包摂」の意味は？',
      options: [
        '暗号通貨の価格安定',
        '銀行サービスにアクセスできない人々への金融サービス提供',
        '政府による完全な管理',
        '取引手数料の統一'
      ],
      correctAnswer: 1,
      explanation: '金融包摂とは、従来の銀行システムにアクセスできない世界約14億人の人々に、暗号通貨とスマートフォンを通じて金融サービスを提供することです。',
      difficulty: 'intermediate',
      category: 'social-impact'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};