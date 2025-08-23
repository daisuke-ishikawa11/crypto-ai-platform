import type { CategoryTest } from '@/lib/types/learning';

export const defiNftTest1: CategoryTest = {
  id: 'defi-nft-test-1',
  categoryId: 'defi-nft',
  title: 'DeFi・NFT基礎確認テスト1（レッスン1-5）',
  description: 'DeFi入門とNFT基礎概念に関する理解度を確認する包括的テストです。',
  lessonRange: '1-5',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'defi-nft-test-1-q1',
      question: 'DeFi（分散型金融）の最大の特徴は何ですか？',
      options: [
        '中央集権的な管理',
        '中間者なしの金融サービス',
        '政府による保証',
        '固定金利の提供'
      ],
      correctAnswer: 1,
      explanation: 'DeFiの最大の特徴は、銀行などの中間者を介さずにスマートコントラクトにより自動化された金融サービスを提供することです。',
      difficulty: 'beginner',
      category: 'defi-basics'
    },
    {
      id: 'defi-nft-test-1-q2',
      question: 'AMM（Automated Market Maker）の基本的な仕組みは？',
      options: [
        '中央集権的な注文マッチング',
        '流動性プールと数学公式による価格決定',
        '手動での価格設定',
        '政府による価格統制'
      ],
      correctAnswer: 1,
      explanation: 'AMMは流動性プールと数学公式（Constant Product Formula等）を使用して自動的に価格を決定し、中央集権的な介入なしに取引を可能にします。',
      difficulty: 'beginner',
      category: 'defi-basics'
    },
    {
      id: 'defi-nft-test-1-q3',
      question: '分散型取引所（DEX）の主な利点は？',
      options: [
        '政府による規制',
        '中央管理者による保護',
        '検閲耐性とユーザー資産の自己管理',
        '固定の取引手数料'
      ],
      correctAnswer: 2,
      explanation: 'DEXの主な利点は、検閲耐性があり、ユーザーが自分の資産を完全に管理できることです。中央集権的な取引所と異なり、第三者のリスクを回避できます。',
      difficulty: 'beginner',
      category: 'defi-basics'
    },
    {
      id: 'defi-nft-test-1-q4',
      question: '従来の金融とDeFiの最も重要な違いは？',
      options: [
        '取引速度の違い',
        '手数料の高低',
        '許可不要アクセスと透明性',
        '使用できる通貨の種類'
      ],
      correctAnswer: 2,
      explanation: '従来の金融システムとDeFiの最も重要な違いは、DeFiでは誰でも許可なくアクセスでき、全ての取引が透明で検証可能であることです。',
      difficulty: 'beginner',
      category: 'defi-basics'
    },
    {
      id: 'defi-nft-test-1-q5',
      question: 'NFT（Non-Fungible Token）の最も重要な特徴は？',
      options: [
        'すべて同じ価値を持つ',
        '分割可能である',
        '代替不可能で唯一性がある',
        '無制限に発行できる'
      ],
      correctAnswer: 2,
      explanation: 'NFTの本質は「Non-Fungible（代替不可能）」という名称が示す通り、各トークンが唯一無二の識別可能な特性を持つことです。これによりデジタル資産の所有権と真正性を証明できます。',
      difficulty: 'beginner',
      category: 'nft-basics'
    }
  ],
  lastUpdated: '2025-08-20',
  factChecked: true
};