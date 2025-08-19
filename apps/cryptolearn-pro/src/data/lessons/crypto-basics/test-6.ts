import type { CategoryTest } from '@/types';

export const cryptoBasicsTest6: CategoryTest = {
  id: 'crypto-basics-test-6',
  categoryId: 'crypto-basics',
  title: '暗号通貨基礎確認テスト6（レッスン26-30）',
  description: 'メタバース、Web3ゲーム、Layer2ソリューション、暗号通貨の未来の知識を確認するテストです。',
  lessonRange: '26-30',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'crypto-test-6-q1',
      question: 'メタバースで真の所有権を可能にする技術は？',
      options: [
        'VR（仮想現実）技術',
        'NFT（非代替性トークン）',
        'AI（人工知能）',
        '5G通信技術'
      ],
      correctAnswer: 1,
      explanation: 'メタバースでは、NFT技術により仮想世界のアイテムや土地の真の所有権を証明でき、プラットフォームを超えて資産を移動・取引することが可能になります。',
      difficulty: 'beginner',
      category: 'web3-basics'
    },
    {
      id: 'crypto-test-6-q2',
      question: 'The SandboxのLAND総区画数は？',
      options: [
        '90,000区画',
        '100,000区画',
        '166,464区画',
        '200,000区画'
      ],
      correctAnswer: 2,
      explanation: 'The SandboxのLANDは166,464区画に分かれており、各区画が仮想不動産NFTとして売買可能です。2021年には最高$450万で取引された記録があります。',
      difficulty: 'intermediate',
      category: 'market-data'
    },
    {
      id: 'crypto-test-6-q3',
      question: 'Axie Infinityがフィリピンで注目された理由は？',
      options: [
        '政府が公式採用した',
        'プレイヤーが生活収入レベルの収益を得た',
        '無料でプレイできた',
        '日本語対応していた'
      ],
      correctAnswer: 1,
      explanation: 'Axie Infinityはフィリピンで多くのプレイヤーが月収$200-1000レベルの収益を得て、実際の生活収入として機能したことで大きな注目を集めました。',
      difficulty: 'intermediate',
      category: 'market-data'
    },
    {
      id: 'crypto-test-6-q4',
      question: 'Layer 2ソリューションの主な目的は？',
      options: [
        '新しい暗号通貨の作成',
        'メインチェーンのスケーラビリティ向上',
        'セキュリティの完全な置き換え',
        'マイニング効率の改善'
      ],
      correctAnswer: 1,
      explanation: 'Layer 2ソリューションは、メインブロックチェーン（Layer 1）の上に構築されるセカンダリ層で、処理速度向上と手数料削減によりスケーラビリティ問題を解決します。',
      difficulty: 'intermediate',
      category: 'technical-basics'
    },
    {
      id: 'crypto-test-6-q5',
      question: 'Lightning Networkの主な機能は？',
      options: [
        'イーサリアムの高速化',
        'ビットコインの即時決済',
        'NFTの作成',
        'マイニングの効率化'
      ],
      correctAnswer: 1,
      explanation: 'Lightning NetworkはビットコインのLayer 2ソリューションで、ペイメントチャネルを使用してビットコインの即時・低手数料決済を可能にします。',
      difficulty: 'intermediate',
      category: 'technical-basics'
    },
    {
      id: 'crypto-test-6-q6',
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
      id: 'crypto-test-6-q7',
      question: '量子コンピューティングが暗号通貨に与える主要リスクは？',
      options: [
        '取引速度の低下',
        '現行暗号技術の破綻',
        '電力消費の増加',
        'ストレージ容量不足'
      ],
      correctAnswer: 1,
      explanation: '量子コンピューティングは現行の公開鍵暗号（RSA、ECDSAなど）を破綻させる可能性があり、15-20年以内の実用化に備えて量子耐性暗号への移行が必要です。',
      difficulty: 'advanced',
      category: 'security'
    },
    {
      id: 'crypto-test-6-q8',
      question: 'CBDCと民間暗号通貨の将来的関係として最も可能性が高いのは？',
      options: [
        'CBDCが民間暗号通貨を完全駆逐',
        '民間暗号通貨がCBDCを駆逐',
        '両者の共存とそれぞれの特色活用',
        '両方とも消滅'
      ],
      correctAnswer: 2,
      explanation: '将来的にはCBDCと民間暗号通貨が共存し、公的サービスではCBDC、投資や革新的サービスでは民間暗号通貨がそれぞれの特色を活かして使い分けられると予想されます。',
      difficulty: 'advanced',
      category: 'market-analysis'
    },
    {
      id: 'crypto-test-6-q9',
      question: 'Web3経済の「Create-to-Earn」とは？',
      options: [
        'マイニングによる収益',
        'コンテンツ作成による報酬獲得',
        '投資による利益',
        '取引手数料による収益'
      ],
      correctAnswer: 1,
      explanation: 'Create-to-Earnは、Web3経済の新しい収益モデルの一つで、コンテンツ作成活動（アート、動画、記事など）に対して直接報酬を得られる仕組みです。',
      difficulty: 'intermediate',
      category: 'web3-basics'
    },
    {
      id: 'crypto-test-6-q10',
      question: '暗号通貨の大量採用に向けた最大の技術的課題は？',
      options: [
        'セキュリティの弱さ',
        'スケーラビリティと相互運用性',
        '開発者不足',
        'エネルギー消費'
      ],
      correctAnswer: 1,
      explanation: '大量採用への最大の技術的課題は、スケーラビリティ（処理能力拡張）と相互運用性（異なるチェーン間連携）です。Ethereumの15 TPSからVisa レベルの24,000 TPSへの向上が目標です。',
      difficulty: 'advanced',
      category: 'technical-basics'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};