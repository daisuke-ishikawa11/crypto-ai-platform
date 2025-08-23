import type { CategoryTest } from '@/types';

export const advancedInvestmentTest6: CategoryTest = {
  id: 'advanced-investment-test-6',
  categoryId: 'advanced-investment',
  title: '高度な投資戦略確認テスト6（レッスン26-30）',
  description: 'インフラ投資、商品先物、アート投資、ワイン投資、暗号通貨オルタナティブの知識を確認する包括的テストです。',
  lessonRange: '26-30',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'advanced-investment-test-6-q1',
      question: 'インフラ投資の主な特徴は何ですか？',
      options: [
        '短期的な高リターン',
        '長期安定収益と社会的インパクト',
        '高い流動性',
        'リスクフリー投資'
      ],
      correctAnswer: 1,
      explanation: 'インフラ投資は道路、橋梁、発電所、通信設備などへの長期投資で、安定した収益と社会的インパクトを提供しますが、流動性は低く、長期間の資金拘束が必要です。',
      difficulty: 'advanced',
      category: 'infrastructure'
    },
    {
      id: 'advanced-investment-test-6-q2',
      question: 'コンタンゴ（Contango）状態の商品先物市場では何が起こりますか？',
      options: [
        '先物価格が現物価格より安い',
        '先物価格が現物価格より高い',
        '先物価格と現物価格が同じ',
        '価格変動がない'
      ],
      correctAnswer: 1,
      explanation: 'コンタンゴ状態では、遠い限月の先物価格が現物価格より高くなります。これは保管コスト、金利、利便性利回りなどの要因によるもので、先物投資家にとってはロールオーバー損失の原因となります。',
      difficulty: 'advanced',
      category: 'commodity-futures'
    },
    {
      id: 'advanced-investment-test-6-q3',
      question: 'アート投資の主なリスクは何ですか？',
      options: [
        '価格の透明性と流動性の問題',
        '政府による価格統制',
        '完全に安全な投資',
        '税制上の不利'
      ],
      correctAnswer: 0,
      explanation: 'アート投資の主なリスクは、価格の不透明性、限定的な流動性、鑑定の困難さ、保管・保険コストなどです。市場価格の把握が困難で、売却時期を選べない場合があります。',
      difficulty: 'advanced',
      category: 'art-investment'
    },
    {
      id: 'advanced-investment-test-6-q4',
      question: 'ワイン投資において最も重要な要素は何ですか？',
      options: [
        '短期的な価格変動',
        'ヴィンテージ、生産者、保存状態',
        '流通業者の選択のみ',
        '政府の政策'
      ],
      correctAnswer: 1,
      explanation: 'ワイン投資では、ヴィンテージ（年份）、生産者の評判、保存状態（プロヴェナンス）が価値を決定する最重要要素です。これらが投資用ワインの品質と市場価値を左右します。',
      difficulty: 'advanced',
      category: 'wine-investment'
    },
    {
      id: 'advanced-investment-test-6-q5',
      question: '暗号通貨のオルタナティブ投資として正しくないものはどれですか？',
      options: [
        'NFTアート投資',
        'ゲーミングトークン',
        'DeFiイールドファーミング',
        '銀行預金'
      ],
      correctAnswer: 3,
      explanation: '銀行預金は伝統的な安全資産であり、暗号通貨のオルタナティブ投資ではありません。NFT、ゲーミングトークン、DeFiイールドファーミングは全て暗号通貨エコシステム内のオルタナティブ投資です。',
      difficulty: 'advanced',
      category: 'crypto-alternatives'
    }
  ],
  lastUpdated: '2025-08-20',
  factChecked: true
};