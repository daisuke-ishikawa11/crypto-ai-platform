import type { CategoryTest } from '@/types';

export const cryptoBasicsTest3: CategoryTest = {
  id: 'crypto-basics-test-3',
  categoryId: 'crypto-basics',
  title: '暗号通貨基礎確認テスト3（レッスン11-15）',
  description: 'アルトコイン、イーサリアム、スマートコントラクト、ステーブルコインの知識を確認するテストです。',
  lessonRange: '11-15',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'crypto-test-3-q1',
      question: '2025年8月現在のイーサリアム（ETH）の近似価格は？',
      options: [
        '約$2,000',
        '約$3,500',
        '約$4,791',
        '約$6,000'
      ],
      correctAnswer: 2,
      explanation: '2025年8月現在、イーサリアム（ETH）は約$4,791近くで取引されており、これはビットコインに次ぐ第2位の時価総額を誇っています。',
      difficulty: 'beginner',
      category: 'market-data'
    },
    {
      id: 'crypto-test-3-q2',
      question: 'イーサリアムの最大の革新は何ですか？',
      options: [
        '取引速度の向上',
        'スマートコントラクト機能',
        '手数料の削減',
        '完全な匿名性'
      ],
      correctAnswer: 1,
      explanation: 'イーサリアムの最大の革新はスマートコントラクト機能です。これにより自動実行される契約が可能となり、DeFi、NFT、DAOなど様々なアプリケーションの基盤となっています。',
      difficulty: 'beginner',
      category: 'technical-basics'
    },
    {
      id: 'crypto-test-3-q3',
      question: 'ERC-20トークンとは何ですか？',
      options: [
        'イーサリアムのガス料金',
        'イーサリアム上のトークン標準規格',
        'イーサリアムのマイニング報酬',
        'イーサリアムのウォレットアドレス'
      ],
      correctAnswer: 1,
      explanation: 'ERC-20は「Ethereum Request for Comments 20」の略で、イーサリアムブロックチェーン上で発行されるトークンの標準規格です。この規格により互換性が保たれます。',
      difficulty: 'intermediate',
      category: 'technical-basics'
    },
    {
      id: 'crypto-test-3-q4',
      question: '2025年現在、最大のステーブルコインは？',
      options: [
        'USD Coin (USDC)',
        'Tether (USDT)',
        'DAI',
        'TerraUSD (UST)'
      ],
      correctAnswer: 1,
      explanation: 'Tether (USDT)は2025年現在も時価総額で最大のステーブルコインです。多くの取引所で基軸通貨として使用され、高い流動性を誇っています。',
      difficulty: 'beginner',
      category: 'market-data'
    },
    {
      id: 'crypto-test-3-q5',
      question: 'スマートコントラクトの主な特徴は？',
      options: [
        '人間の判断が必要',
        '自動実行される契約',
        '中央管理者が必要',
        '紙の契約書が必要'
      ],
      correctAnswer: 1,
      explanation: 'スマートコントラクトは事前に設定された条件が満たされると自動的に実行される契約です。人間の介入や中央管理者なしで動作します。',
      difficulty: 'beginner',
      category: 'technical-basics'
    },
    {
      id: 'crypto-test-3-q6',
      question: 'DAI（ダイ）の特徴として正しいのは？',
      options: [
        '米ドルで直接担保されている',
        '暗号資産担保の分散型ステーブルコイン',
        '政府が発行している',
        'アルゴリズムのみで価格維持'
      ],
      correctAnswer: 1,
      explanation: 'DAIはMakerDAOが発行する暗号資産担保型のステーブルコインで、ETHなどの暗号資産を担保とし、完全に分散化されたシステムで運営されています。',
      difficulty: 'intermediate',
      category: 'technical-basics'
    },
    {
      id: 'crypto-test-3-q7',
      question: 'アルトコインの定義は？',
      options: [
        'ビットコイン以外の全ての暗号通貨',
        'イーサリアムのみ',
        '価格が安い暗号通貨',
        '新しく作られた暗号通貨のみ'
      ],
      correctAnswer: 0,
      explanation: 'アルトコイン（Alternative Coin）は「ビットコイン以外の全ての暗号通貨」を指す用語です。イーサリアム、リップル、ライトコインなどが含まれます。',
      difficulty: 'beginner',
      category: 'technical-basics'
    },
    {
      id: 'crypto-test-3-q8',
      question: '2024年9月のイーサリアム「マージ」の意味は？',
      options: [
        '新しい暗号通貨との統合',
        'Proof of WorkからProof of Stakeへの移行',
        '取引手数料の廃止',
        '新しい取引所の開設'
      ],
      correctAnswer: 1,
      explanation: 'イーサリアムの「マージ」は、従来のProof of Work（マイニング）からProof of Stake（ステーキング）への移行を指し、エネルギー消費を99.95%削減しました。',
      difficulty: 'intermediate',
      category: 'technical-basics'
    },
    {
      id: 'crypto-test-3-q9',
      question: 'ガス料金（Gas Fee）とは何ですか？',
      options: [
        'イーサリアムでの取引手数料',
        '暗号通貨の購入価格',
        'マイニング機器の電気代',
        'ウォレットの維持費用'
      ],
      correctAnswer: 0,
      explanation: 'ガス料金はイーサリアムネットワークで取引やスマートコントラクト実行時に支払う手数料です。ネットワークの混雑状況により変動します。',
      difficulty: 'beginner',
      category: 'technical-basics'
    },
    {
      id: 'crypto-test-3-q10',
      question: 'ステーブルコインの主なリスクは？',
      options: [
        '価格が上昇しすぎる',
        '発行体の信用リスクや規制リスク',
        '取引速度が遅すぎる',
        'マイニングができない'
      ],
      correctAnswer: 1,
      explanation: 'ステーブルコインの主なリスクは発行体の経営破綻や規制当局の介入、担保資産の透明性欠如などの信用・規制リスクです。',
      difficulty: 'intermediate',
      category: 'risk-management'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};