import type { CategoryTest } from '@/types';

export const cryptoBasicsTest5: CategoryTest = {
  id: 'crypto-basics-test-5',
  categoryId: 'crypto-basics',
  title: '暗号通貨基礎確認テスト5（レッスン21-25）',
  description: 'NFT、Web3、メタバース、DAO（分散型自律組織）の知識を確認する包括的テストです。',
  lessonRange: '21-25',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'crypto-test-5-q1',
      question: 'NFT（Non-Fungible Token）の最大の特徴は？',
      options: [
        '分割して取引できる',
        '代替不可能でユニークな価値',
        '価格が常に一定',
        '匿名で取引される'
      ],
      correctAnswer: 1,
      explanation: 'NFTの最大の特徴は「Non-Fungible（代替不可能）」、つまり他のトークンと交換できないユニークな価値を持つことです。デジタルアートや収集品の所有権を証明します。',
      difficulty: 'beginner',
      category: 'nft-basics'
    },
    {
      id: 'crypto-test-5-q2',
      question: '2025年現在、最大のNFTマーケットプレイスは？',
      options: [
        'Rarible',
        'Foundation',
        'OpenSea',
        'SuperRare'
      ],
      correctAnswer: 2,
      explanation: 'OpenSeaは2025年現在も最大のNFTマーケットプレイスで、月間取引量が他のプラットフォームを大きく上回っています。',
      difficulty: 'beginner',
      category: 'market-data'
    },
    {
      id: 'crypto-test-5-q3',
      question: 'Web3の核となる概念は？',
      options: [
        '中央集権的なインターネット',
        '分散型でユーザーがデータを所有',
        '政府による完全管理',
        'AI による自動制御'
      ],
      correctAnswer: 1,
      explanation: 'Web3の核となる概念は、中央集権的なプラットフォームに依存せず、ユーザーが自分のデータとデジタル資産を所有・管理できる分散型インターネットです。',
      difficulty: 'beginner',
      category: 'web3-basics'
    },
    {
      id: 'crypto-test-5-q4',
      question: 'メタバース経済で重要な役割を果たすのは？',
      options: [
        '現金のみ',
        '従来の銀行システム',
        '暗号通貨とNFT',
        '政府発行の通貨のみ'
      ],
      correctAnswer: 2,
      explanation: 'メタバース経済では、バーチャル空間でのアイテム購入、土地売買、サービス提供などに暗号通貨とNFTが重要な役割を果たします。',
      difficulty: 'intermediate',
      category: 'web3-basics'
    },
    {
      id: 'crypto-test-5-q5',
      question: 'DAO（分散型自律組織）の主な特徴は？',
      options: [
        'CEO による中央集権的管理',
        'ガバナンストークンによる民主的運営',
        '政府による直接管理',
        '銀行による資金管理'
      ],
      correctAnswer: 1,
      explanation: 'DAOはガバナンストークンを持つメンバーが投票により意思決定を行い、スマートコントラクトによって自動実行される分散型の組織運営が特徴です。',
      difficulty: 'intermediate',
      category: 'dao-basics'
    },
    {
      id: 'crypto-test-5-q6',
      question: 'MakerDAOの主な機能は？',
      options: [
        'NFTの作成',
        'DAIステーブルコインの発行・管理',
        'ゲーム開発',
        '音楽配信'
      ],
      correctAnswer: 1,
      explanation: 'MakerDAOはDAIステーブルコインの発行・管理を行う分散型組織で、暗号資産を担保としてDAIを生成し、価格安定性を維持しています。',
      difficulty: 'intermediate',
      category: 'dao-basics'
    },
    {
      id: 'crypto-test-5-q7',
      question: 'プレイ・トゥ・アーン（Play-to-Earn）ゲームの革新性は？',
      options: [
        '無料でプレイできる',
        'ゲームプレイで実際の収益を得られる',
        'グラフィックが美しい',
        'シングルプレイヤーのみ'
      ],
      correctAnswer: 1,
      explanation: 'プレイ・トゥ・アーンゲームは、ゲーム内アイテムがNFTとして実際の価値を持ち、プレイヤーがゲームを楽しみながら実際の収益を得られる革新的なモデルです。',
      difficulty: 'intermediate',
      category: 'web3-basics'
    },
    {
      id: 'crypto-test-5-q8',
      question: '2025年現在のメタバース土地価格のトレンドは？',
      options: [
        '急激な上昇継続',
        '初期バブルから安定化傾向',
        '完全に価値がゼロ',
        '政府により価格統制'
      ],
      correctAnswer: 1,
      explanation: '2025年現在、メタバース土地価格は2021-2022年の初期バブルから落ち着き、実用性や収益性を重視した合理的な価格形成に向かっています。',
      difficulty: 'advanced',
      category: 'market-data'
    },
    {
      id: 'crypto-test-5-q9',
      question: 'DAOのガバナンス攻撃として最も注意すべきは？',
      options: [
        'ハードウェア故障',
        'フラッシュローン攻撃による投票権操作',
        'インターネット回線の不安定',
        '自然災害'
      ],
      correctAnswer: 1,
      explanation: 'フラッシュローン攻撃は、一時的に大量のガバナンストークンを借り入れて投票権を操作し、悪意のある提案を可決させる新しい攻撃手法です。',
      difficulty: 'advanced',
      category: 'security'
    },
    {
      id: 'crypto-test-5-q10',
      question: 'Web3における「自己主権アイデンティティ」とは？',
      options: [
        '政府が発行するデジタルID',
        'ユーザーが完全に管理する分散型ID',
        '企業が管理するアカウント',
        '銀行口座と連動するID'
      ],
      correctAnswer: 1,
      explanation: '自己主権アイデンティティは、中央管理者に依存せず、ユーザー自身が完全に管理・制御できる分散型アイデンティティシステムです。',
      difficulty: 'advanced',
      category: 'web3-basics'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};