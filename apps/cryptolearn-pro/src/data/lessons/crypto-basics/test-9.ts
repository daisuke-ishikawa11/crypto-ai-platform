import type { CategoryTest } from '@/types';

export const cryptoBasicsTest9: CategoryTest = {
  id: 'crypto-basics-test-9',
  categoryId: 'crypto-basics',
  title: '暗号通貨基礎確認テスト9（レッスン41-45）',
  description: '投資戦略、リスク管理、税務、ポートフォリオ管理の実践的知識を確認するテストです。',
  lessonRange: '41-45',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'crypto-test-9-q1',
      question: 'ドルコスト平均法（DCA）の最大の利点は？',
      options: [
        '必ず利益が出る',
        '価格変動リスクを時間分散できる',
        '税金を回避できる',
        '手数料が無料になる'
      ],
      correctAnswer: 1,
      explanation: 'ドルコスト平均法は、定期的に一定額を投資することで、価格が高い時は少なく、安い時は多く購入でき、平均購入単価を平準化してリスクを分散できます。',
      difficulty: 'beginner',
      category: 'investment-strategy'
    },
    {
      id: 'crypto-test-9-q2',
      question: '暗号通貨投資における「HODL」戦略とは？',
      options: [
        '頻繁に売買を繰り返す',
        '長期保有を続ける',
        '他の投資家を避ける',
        '借金をして投資する'
      ],
      correctAnswer: 1,
      explanation: 'HODL（Hold On for Dear Life）は、短期的な価格変動に惑わされず、長期間保有し続ける投資戦略です。2013年のビットコイン掲示板の誤字が語源となっています。',
      difficulty: 'beginner',
      category: 'investment-strategy'
    },
    {
      id: 'crypto-test-9-q3',
      question: '2025年現在の日本の暗号通貨税制の特徴は？',
      options: [
        '完全非課税',
        '雑所得として総合課税（15-55%）',
        '分離課税で20%固定',
        '法人税のみ課税'
      ],
      correctAnswer: 1,
      explanation: '日本では暗号通貨の売却益は雑所得として総合課税され、所得に応じて15-55%の税率が適用されます。2025年現在も分離課税への移行は実現していません。',
      difficulty: 'intermediate',
      category: 'taxation'
    },
    {
      id: 'crypto-test-9-q4',
      question: '暗号通貨ポートフォリオで推奨される最大投資割合は？',
      options: [
        '総資産の50-70%',
        '総資産の20-30%',
        '総資産の5-10%',
        '総資産の90%以上'
      ],
      correctAnswer: 2,
      explanation: '暗号通貨はハイリスク・ハイリターン資産のため、一般的には総ポートフォリオの5-10%程度が推奨されます。リスク許容度により調整可能ですが、過度な集中は避けるべきです。',
      difficulty: 'intermediate',
      category: 'portfolio-management'
    },
    {
      id: 'crypto-test-9-q5',
      question: 'レバレッジ取引の最大リスクは？',
      options: [
        '取引手数料が高くなる',
        '投資元本を超える損失の可能性',
        '取引速度が遅くなる',
        '税率が高くなる'
      ],
      correctAnswer: 1,
      explanation: 'レバレッジ取引では証拠金以上の金額で取引するため、相場が予想と逆に動いた場合、投資元本を超える損失（追証）が発生する可能性があります。',
      difficulty: 'intermediate',
      category: 'risk-management'
    },
    {
      id: 'crypto-test-9-q6',
      question: '「移動平均乖離率」とは何ですか？',
      options: [
        '価格が移動平均線からどの程度離れているかの指標',
        '取引量の増減率',
        '市場全体の変動率',
        '手数料の変動率'
      ],
      correctAnswer: 0,
      explanation: '移動平均乖離率は、現在価格が移動平均線からどの程度離れているかを%で示す指標で、買われすぎ・売られすぎの判断に使用されます。',
      difficulty: 'intermediate',
      category: 'technical-analysis'
    },
    {
      id: 'crypto-test-9-q7',
      question: 'ストップロス注文の目的は？',
      options: [
        '利益を最大化する',
        '損失を限定する',
        '取引手数料を削減する',
        '税金を節約する'
      ],
      correctAnswer: 1,
      explanation: 'ストップロス注文は、価格が予想と逆に動いた場合に、事前に設定した価格で自動的に売却することで損失を限定するリスク管理手法です。',
      difficulty: 'beginner',
      category: 'risk-management'
    },
    {
      id: 'crypto-test-9-q8',
      question: '暗号通貨の「恐怖・貪欲指数」で0に近い値は何を示しますか？',
      options: [
        '中立的な市場',
        '極度の恐怖（買い時のシグナル）',
        '極度の貪欲（売り時のシグナル）',
        '取引停止'
      ],
      correctAnswer: 1,
      explanation: '恐怖・貪欲指数で0に近い値は「極度の恐怖」を示し、多くの投資家が過度に悲観的になっている状態で、逆張り投資の買い時シグナルとして使われます。',
      difficulty: 'advanced',
      category: 'market-sentiment'
    },
    {
      id: 'crypto-test-9-q9',
      question: '暗号通貨税務で「移動平均法」と「総平均法」の違いは？',
      options: [
        '税率の計算方法',
        '損益計算時の取得単価算出方法',
        '申告時期の違い',
        '控除額の計算方法'
      ],
      correctAnswer: 1,
      explanation: '移動平均法は購入都度に平均単価を更新、総平均法は年間の全取得額を全取得数量で割って単価を算出する方法で、どちらも暗号通貨の損益計算で使用可能です。',
      difficulty: 'advanced',
      category: 'taxation'
    },
    {
      id: 'crypto-test-9-q10',
      question: 'リバランシングの目的は？',
      options: [
        '手数料を増やす',
        '目標資産配分を維持しリスクを管理',
        '税金を増やす',
        '取引回数を減らす'
      ],
      correctAnswer: 1,
      explanation: 'リバランシングは、価格変動により崩れた目標資産配分を定期的に調整することで、リスクレベルを維持し、利益確定と損切りを機械的に行う効果があります。',
      difficulty: 'intermediate',
      category: 'portfolio-management'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};