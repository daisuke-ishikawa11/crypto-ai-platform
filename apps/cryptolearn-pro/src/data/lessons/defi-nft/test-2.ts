import type { CategoryTest } from '@/lib/types/learning';

export const defiNftTest2: CategoryTest = {
  id: 'defi-nft-test-2',
  categoryId: 'defi-nft',
  title: 'DeFi・NFT確認テスト2（レッスン6-10）',
  description: '流動性プール、イールドファーミング、レンディングプロトコルに関する理解度を確認する包括的テストです。',
  lessonRange: '6-10',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'defi-nft-test-2-q1',
      question: '流動性プール（Liquidity Pool）の主な目的は何ですか？',
      options: [
        'トークンを保管するため',
        'DEXでの取引を可能にするため',
        'ステーキング報酬を得るため',
        'NFTを作成するため'
      ],
      correctAnswer: 1,
      explanation: '流動性プールは、DEXでの取引を可能にするために異なるトークンペアを保管し、トレーダーがいつでも取引できる流動性を提供します。',
      difficulty: 'intermediate',
      category: 'defi-basics'
    },
    {
      id: 'defi-nft-test-2-q2',
      question: 'イールドファーミング（Yield Farming）とは何ですか？',
      options: [
        'NFTを作成すること',
        '流動性を提供して報酬を獲得すること',
        'トークンをマイニングすること',
        '取引手数料を支払うこと'
      ],
      correctAnswer: 1,
      explanation: 'イールドファーミングは、DeFiプロトコルに流動性を提供することで、取引手数料やガバナンストークンなどの報酬を獲得する戦略です。',
      difficulty: 'intermediate',
      category: 'defi-basics'
    },
    {
      id: 'defi-nft-test-2-q3',
      question: 'インパーマネントロス（Impermanent Loss）が発生する条件は？',
      options: [
        'トークンの価格が一定の場合',
        'プール内のトークン価格比率が変化した場合',
        '取引手数料が高い場合',
        'ガス代が上昇した場合'
      ],
      correctAnswer: 1,
      explanation: 'インパーマネントロスは、流動性プール内のトークンの価格比率が変化した時に、単純保有と比較して発生する機会損失です。',
      difficulty: 'intermediate',
      category: 'defi-basics'
    },
    {
      id: 'defi-nft-test-2-q4',
      question: 'DeFiレンディングプロトコルの主な機能は？',
      options: [
        'NFTの作成',
        '暗号資産の貸し借り',
        'トークンのスワップ',
        'ガバナンス投票'
      ],
      correctAnswer: 1,
      explanation: 'DeFiレンディングプロトコルは、ユーザーが暗号資産を預けて利息を得たり、担保を提供して借り入れを行ったりできる機能を提供します。',
      difficulty: 'intermediate',
      category: 'defi-basics'
    },
    {
      id: 'defi-nft-test-2-q5',
      question: '担保（Collateral）の主な役割は何ですか？',
      options: [
        '取引手数料の支払い',
        '借り入れのリスク軽減',
        'ガバナンス権の獲得',
        'ステーキング報酬の増加'
      ],
      correctAnswer: 1,
      explanation: '担保は、借り入れ時に貸し手のリスクを軽減するために提供される資産で、借り手が返済できない場合の保証として機能します。',
      difficulty: 'intermediate',
      category: 'defi-basics'
    }
  ],
  lastUpdated: '2025-08-20',
  factChecked: true
};