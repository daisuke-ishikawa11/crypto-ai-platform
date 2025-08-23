import type { CategoryTest } from '@/types';

export const advancedInvestmentTest5: CategoryTest = {
  id: 'advanced-investment-test-5',
  categoryId: 'advanced-investment',
  title: '高度な投資戦略確認テスト5（レッスン21-25）',
  description: 'オルタナティブ投資、REIT、コモディティ、プライベートエクイティ、ヘッジファンド戦略の知識を確認する包括的テストです。',
  lessonRange: '21-25',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'advanced-investment-test-5-q1',
      question: 'REITs（不動産投資信託）の最大の利点は何ですか？',
      options: [
        '不動産の直接所有',
        '少額投資可能性と高い流動性',
        '完全なリスクフリー投資',
        '税制上の完全な免除'
      ],
      correctAnswer: 1,
      explanation: 'REITsの最大の利点は、少額の資金で多様な不動産に投資でき、株式市場で売買できる高い流動性を持つことです。直接的な不動産投資の障壁を大幅に下げています。',
      difficulty: 'advanced',
      category: 'reits'
    },
    {
      id: 'advanced-investment-test-5-q2',
      question: 'コモディティ投資の主なリスクとして正しくないものはどれですか？',
      options: [
        '価格ボラティリティ',
        '保管コスト',
        '期限構造リスク',
        '高すぎる流動性'
      ],
      correctAnswer: 3,
      explanation: 'コモディティ投資の主なリスクには価格の高いボラティリティ、物理的保管コスト、先物カーブの期限構造リスクがあります。流動性の高さはリスクではなく、むしろ一部のコモディティでは流動性不足が問題となります。',
      difficulty: 'advanced',
      category: 'commodities'
    },
    {
      id: 'advanced-investment-test-5-q3',
      question: 'プライベートエクイティ投資の一般的な特徴は何ですか？',
      options: [
        '高い流動性と短期投資',
        '長期投資、低流動性、高リターン期待',
        '完全に安全な投資',
        '小口投資家向けの商品'
      ],
      correctAnswer: 1,
      explanation: 'プライベートエクイティ投資は通常5-10年の長期投資期間、低い流動性を特徴とし、その代わりに高いリターンを期待する投資形態です。機関投資家や富裕層向けの投資商品です。',
      difficulty: 'advanced',
      category: 'private-equity'
    },
    {
      id: 'advanced-investment-test-5-q4',
      question: 'ヘッジファンドの典型的な「2-20」手数料構造とは何ですか？',
      options: [
        '管理手数料2%、成功報酬20%',
        '管理手数料20%、成功報酬2%',
        '最低投資額2万ドル、期間20年',
        '年間リターン2%、リスク20%'
      ],
      correctAnswer: 0,
      explanation: 'ヘッジファンドの「2-20」構造は、運用資産に対する年間2%の管理手数料と、利益に対する20%の成功報酬を指します。この構造により、ファンドマネージャーの利益が投資家の成功と連動します。',
      difficulty: 'advanced',
      category: 'hedge-funds'
    },
    {
      id: 'advanced-investment-test-5-q5',
      question: 'オルタナティブ投資が伝統的投資と比較した場合の主な特徴は何ですか？',
      options: [
        '低いリスクと安定したリターン',
        '高い流動性と透明性',
        '低い相関性と分散効果',
        '規制が厳しく安全性が高い'
      ],
      correctAnswer: 2,
      explanation: 'オルタナティブ投資の主な魅力は、伝統的な株式・債券投資との相関性が低く、ポートフォリオの分散効果を高められることです。ただし、一般的に流動性は低く、高いリスクを伴います。',
      difficulty: 'advanced',
      category: 'alternative-investments'
    }
  ],
  lastUpdated: '2025-08-20',
  factChecked: true
};