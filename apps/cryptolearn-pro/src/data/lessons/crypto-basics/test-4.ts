import type { CategoryTest } from '@/types';

export const cryptoBasicsTest4: CategoryTest = {
  id: 'crypto-basics-test-4',
  categoryId: 'crypto-basics',
  title: '暗号通貨基礎確認テスト4（レッスン16-20）',
  description: 'DeFi、マイニング、ステーキング、規制の基礎知識を確認する包括的テストです。',
  lessonRange: '16-20',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'crypto-test-4-q1',
      question: 'DeFi（分散型金融）の最大の特徴は？',
      options: [
        '中央銀行による管理',
        '中間者なしの金融サービス',
        '政府による保証',
        '固定金利のみ提供'
      ],
      correctAnswer: 1,
      explanation: 'DeFiの最大の特徴は、銀行などの中間者を介さず、スマートコントラクトにより自動化された金融サービスを提供することです。',
      difficulty: 'beginner',
      category: 'defi-basics'
    },
    {
      id: 'crypto-test-4-q2',
      question: '2025年現在のDeFiのTVL（Total Value Locked）は約いくらですか？',
      options: [
        '約$50億',
        '約$100億',
        '約$200億',
        '約$500億'
      ],
      correctAnswer: 2,
      explanation: '2025年8月現在、DeFiの総預かり資産（TVL）は約$200億を超えており、従来の金融システムに匹敵する規模に成長しています。',
      difficulty: 'intermediate',
      category: 'market-data'
    },
    {
      id: 'crypto-test-4-q3',
      question: 'ビットコインマイニングの役割は？',
      options: [
        '新しいビットコインの作成のみ',
        '取引の検証とネットワークの安全性確保',
        '価格の安定化',
        'ウォレットの管理'
      ],
      correctAnswer: 1,
      explanation: 'ビットコインマイニングは新しいビットコインを作成するだけでなく、取引の検証とブロックチェーンの安全性確保という重要な役割を担っています。',
      difficulty: 'beginner',
      category: 'technical-basics'
    },
    {
      id: 'crypto-test-4-q4',
      question: 'Proof of Stake（PoS）の主な利点は？',
      options: [
        '高い計算処理能力が必要',
        'エネルギー消費が少ない',
        'マイニング機器が必要',
        '中央管理者が存在'
      ],
      correctAnswer: 1,
      explanation: 'Proof of Stakeの主な利点は、Proof of Workと比較してエネルギー消費が大幅に少ないことです。イーサリアムは99.95%のエネルギー削減を実現しました。',
      difficulty: 'intermediate',
      category: 'technical-basics'
    },
    {
      id: 'crypto-test-4-q5',
      question: 'ステーキング報酬の一般的な年利は？',
      options: [
        '1-3%',
        '4-12%',
        '20-30%',
        '50%以上'
      ],
      correctAnswer: 1,
      explanation: 'ステーキング報酬は一般的に年利4-12%程度です。イーサリアムで約4-7%、ソラナやカルダノで5-12%程度が相場となっています。',
      difficulty: 'intermediate',
      category: 'investment-strategy'
    },
    {
      id: 'crypto-test-4-q6',
      question: '2025年現在の日本の暗号通貨規制の特徴は？',
      options: [
        '完全に禁止されている',
        '世界で最も厳格で透明性が高い',
        '規制が存在しない',
        '個人利用のみ許可'
      ],
      correctAnswer: 1,
      explanation: '日本は世界で最も厳格で透明性の高い暗号通貨規制を整備しており、金融庁による業者登録制度やステーブルコイン規制など包括的な法制度を構築しています。',
      difficulty: 'intermediate',
      category: 'regulation'
    },
    {
      id: 'crypto-test-4-q7',
      question: '流動性マイニング（Liquidity Mining）とは？',
      options: [
        'ビットコインをマイニングする',
        'DEXに流動性を提供して報酬を得る',
        'NFTを作成する',
        '取引所で売買する'
      ],
      correctAnswer: 1,
      explanation: '流動性マイニングは、分散型取引所（DEX）に通貨ペアを預けて流動性を提供し、その対価としてトークン報酬を得る仕組みです。',
      difficulty: 'intermediate',
      category: 'defi-basics'
    },
    {
      id: 'crypto-test-4-q8',
      question: 'インパーマネントロス（Impermanent Loss）とは？',
      options: [
        '取引手数料による損失',
        '流動性提供時の価格変動による損失',
        'ハッキングによる資産紛失',
        '税金による目減り'
      ],
      correctAnswer: 1,
      explanation: 'インパーマネントロスは、DEXで流動性を提供している間に、預けた通貨の価格比率が変動することで生じる機会損失です。',
      difficulty: 'advanced',
      category: 'risk-management'
    },
    {
      id: 'crypto-test-4-q9',
      question: '2024年4月のビットコイン半減期の影響は？',
      options: [
        '取引速度が半分になった',
        'マイニング報酬が6.25から3.125BTCに半減',
        '価格が半分になった',
        '手数料が半分になった'
      ],
      correctAnswer: 1,
      explanation: '2024年4月の半減期により、ビットコインのマイニング報酬は6.25 BTCから3.125 BTCに半減し、新規供給が減少して希少性が高まりました。',
      difficulty: 'intermediate',
      category: 'technical-basics'
    },
    {
      id: 'crypto-test-4-q10',
      question: 'CAISP（暗号通貨仲介サービス業者）ライセンスの導入時期は？',
      options: [
        '2024年1月',
        '2025年3月',
        '2025年8月',
        '2026年予定'
      ],
      correctAnswer: 1,
      explanation: '日本では2025年3月に新たにCAISP（暗号通貨仲介サービス業者）ライセンスが導入され、より幅広い暗号通貨関連サービスの法的枠組みが整備されました。',
      difficulty: 'advanced',
      category: 'regulation'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};