import type { Lesson } from '../../../lib/types/learning';

export const lesson13: Lesson = {
  id: 'crypto-basics-13',
  categoryId: 'crypto-basics',
  title: 'Market Capitalization and Trading Volume - 時価総額と出来高',
  slug: 'market-cap-and-volume',
  description: '暗号通貨の時価総額と出来高の意味を理解し、市場評価の指標として活用する方法を学びます。',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 15,
  orderIndex: 13,
  content: {
    sections: [
      {
        type: 'text',
        title: '時価総額とは',
        content: `
          時価総額（Market Capitalization）は、暗号通貨の市場での総評価額を表す重要な指標です。
          
          **計算方法：**
          時価総額 = 現在価格 × 流通供給量
          
          **例：ビットコイン**
          - 現在価格: $40,000
          - 流通供給量: 19,500,000 BTC
          - 時価総額: $780,000,000,000（7,800億ドル）
          
          **時価総額の意義：**
          - 市場での相対的な重要度
          - 投資家の信頼度の指標
          - 価格操作の難易度
          - 流動性の目安
        `
      },
      {
        type: 'text',
        title: '時価総額による分類',
        content: `
          **暗号通貨の分類：**
          
          **大型株（Large Cap）**
          - 時価総額: $10億以上
          - 例: Bitcoin (BTC), Ethereum (ETH)
          - 特徴: 安定性が高く、流動性良好
          
          **中型株（Mid Cap）**
          - 時価総額: $1億〜$10億
          - 例: Chainlink (LINK), Polygon (MATIC)
          - 特徴: 成長潜在性とリスクのバランス
          
          **小型株（Small Cap）**
          - 時価総額: $1億未満
          - 例: 新興プロジェクト
          - 特徴: 高い成長潜在性だが高リスク
          
          **マイクロ株（Micro Cap）**
          - 時価総額: $1,000万未満
          - 特徴: 極めて高いリスクと潜在リターン
        `
      },
      {
        type: 'text',
        title: '出来高の重要性',
        content: `
          **出来高（Trading Volume）とは：**
          特定期間内に取引された暗号通貨の総量
          
          **出来高が示すもの：**
          
          1. **流動性**: 高出来高 = 売買しやすい
          2. **関心度**: 市場の注目度
          3. **価格信頼性**: 高出来高での価格変動は信頼性が高い
          4. **トレンド強度**: 出来高と価格変動の相関
          
          **出来高分析のポイント：**
          - 価格上昇 + 高出来高 = 強い上昇トレンド
          - 価格下落 + 高出来高 = 強い下落トレンド
          - 価格変動 + 低出来高 = トレンドの信頼性が低い
        `
      }
    ],
    keyPoints: [
      '時価総額 = 現在価格 × 流通供給量で計算',
      '時価総額により大型株・中型株・小型株に分類',
      '出来高は市場の流動性と関心度を示す',
      '高出来高での価格変動は信頼性が高い',
      '投資判断には両方の指標を総合的に評価'
    ],
    summary: '時価総額と出来高は暗号通貨投資の重要な指標です。時価総額は市場での総評価額を、出来高は市場の活発さを表します。これらを理解することで、より良い投資判断が可能になります。',
    practicalExamples: [
      'Bitcoin: 時価総額1位、最も高い流動性',
      'Ethereum: 時価総額2位、DeFi需要で高出来高',
      'SHIB: 小型株から急成長、出来高急増で話題',
      'CoinMarketCap/CoinGeckoで簡単に確認可能'
    ],
    warningNotes: [
      '時価総額だけで投資判断すべきではない',
      '人工的な出来高操作（ウォッシュトレーディング）に注意',
      '小型株は価格操作されやすい',
      '出来高が極端に少ない銘柄は売却困難',
      '時価総額ランキングは常に変動する'
    ]
  },
  quiz: [
    {
      id: 'crypto-basics-13-q1',
      question: '時価総額の計算方法は？',
      options: [
        '現在価格 ÷ 流通供給量',
        '現在価格 × 流通供給量',
        '最高価格 × 最大供給量',
        '出来高 × 現在価格'
      ],
      correctAnswer: 1,
      explanation: '時価総額は現在価格に流通供給量を掛けることで計算されます。これにより市場での総評価額がわかります。'
    },
    {
      id: 'crypto-basics-13-q2',
      question: '大型株（Large Cap）の時価総額基準は？',
      options: [
        '$1億以上',
        '$10億以上',
        '$100億以上',
        '$1,000億以上'
      ],
      correctAnswer: 1,
      explanation: '一般的に時価総額$10億以上の暗号通貨が大型株として分類され、相対的に安定性が高いとされます。'
    },
    {
      id: 'crypto-basics-13-q3',
      question: '出来高が示すものは？',
      options: [
        '価格の安定性',
        '市場の流動性と関心度',
        '将来の価格予測',
        '投資の安全性'
      ],
      correctAnswer: 1,
      explanation: '出来高は市場の流動性（売買のしやすさ）と投資家の関心度を示す重要な指標です。'
    },
    {
      id: 'crypto-basics-13-q4',
      question: '価格上昇と高出来高が同時に起こることの意味は？',
      options: [
        '弱い上昇トレンド',
        '強い上昇トレンド',
        'トレンドの終了',
        '価格操作の可能性'
      ],
      correctAnswer: 1,
      explanation: '価格上昇と高出来高が同時に起こることは、多くの投資家が参加している強い上昇トレンドを示します。'
    },
    {
      id: 'crypto-basics-13-q5',
      question: '小型株（Small Cap）の特徴は？',
      options: [
        '安定性が高く低リスク',
        '高い成長潜在性だが高リスク',
        '必ず利益が保証されている',
        '価格操作が不可能'
      ],
      correctAnswer: 1,
      explanation: '小型株は高い成長潜在性を持つ一方で、ボラティリティが高く価格操作のリスクもある高リスク投資です。'
    }
  ],
  lastUpdated: '2024-12-09',
  factChecked: true
};