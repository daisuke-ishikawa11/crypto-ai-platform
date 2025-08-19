import { CategoryAssessment } from '@/lib/types/learning';

export const tradingBasicsAssessment: CategoryAssessment = {
  id: 'assessment-trading-basics',
  categoryId: 'trading-basics',
  title: 'トレーディング基礎 総合テスト',
  description: 'チャート分析、テクニカル指標、リスク管理など暗号通貨トレーディングの基本知識の総合的な理解度を確認します',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 30,
  passingScore: 80,
  totalPoints: 140,
  questions: [
    {
      id: 'tb-assessment-1',
      questionType: 'multiple_choice',
      question: 'ローソク足チャートで上昇トレンドを示すローソク足は？',
      options: [
        '陰線（赤いローソク足）',
        '陽線（緑のローソク足）',
        '十字線',
        'すべて同じ'
      ],
      correctAnswer: '1',
      explanation: '陽線は始値より終値が高いことを示し、その期間中に価格が上昇したことを表します。連続する陽線は上昇トレンドの兆候となります。',
      points: 10,
      difficultyLevel: 'beginner',
      tags: ['ローソク足', 'チャート分析', '陽線']
    },
    {
      id: 'tb-assessment-2',
      questionType: 'multiple_choice',
      question: '移動平均線の主な役割は？',
      options: [
        '正確な価格予測',
        '価格のトレンドを滑らかに表示',
        '取引量を示す',
        '利益を保証する'
      ],
      correctAnswer: '1',
      explanation: '移動平均線は一定期間の平均価格を線で結んだもので、価格の短期的な変動を平滑化してトレンドを見やすくする役割があります。',
      points: 10,
      difficultyLevel: 'beginner',
      tags: ['移動平均線', 'トレンド分析', 'テクニカル指標']
    },
    {
      id: 'tb-assessment-3',
      questionType: 'true_false',
      question: 'サポートラインは価格が下落を止める傾向がある水準を示している。',
      correctAnswer: 'true',
      explanation: 'サポートライン（支持線）は、過去にそのレベルで価格の下落が止まったことが多い水準で、買い圧力が強くなりやすいポイントです。',
      points: 10,
      difficultyLevel: 'beginner',
      tags: ['サポートライン', 'テクニカル分析', '支持線']
    },
    {
      id: 'tb-assessment-4',
      questionType: 'multiple_choice',
      question: 'RSI（相対力指数）が70を超えた場合の一般的な判断は？',
      options: [
        '買いシグナル',
        '売りシグナル（買われすぎ）',
        'トレンド継続',
        '何も意味しない'
      ],
      correctAnswer: '1',
      explanation: 'RSIが70を超えると一般的に「買われすぎ」と判断され、価格調整（下落）の可能性が高まるため、売りシグナルとして捉えられます。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['RSI', '買われすぎ', 'オシレーター']
    },
    {
      id: 'tb-assessment-5',
      questionType: 'multiple_choice',
      question: '損切り（ストップロス）の主な目的は？',
      options: [
        '利益を最大化すること',
        '損失を限定すること',
        '取引回数を増やすこと',
        '手数料を節約すること'
      ],
      correctAnswer: '1',
      explanation: '損切りは予想に反して価格が動いた時に、損失を一定範囲内に限定するためのリスク管理手法です。大きな損失を防ぐために必須の技術です。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['損切り', 'リスク管理', 'ストップロス']
    },
    {
      id: 'tb-assessment-6',
      questionType: 'true_false',
      question: 'ボラティリティが高い相場では、損切り幅を通常より狭く設定すべきである。',
      correctAnswer: 'false',
      explanation: 'ボラティリティが高い相場では価格変動が激しいため、損切り幅を広めに設定しないと、一時的な価格変動で不要な損切りが頻発する可能性があります。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['ボラティリティ', '損切り幅', 'リスク管理']
    },
    {
      id: 'tb-assessment-7',
      questionType: 'multiple_choice',
      question: 'MACD指標で強い買いシグナルとされるのは？',
      options: [
        'MACDラインがシグナルラインを下抜け',
        'MACDラインがシグナルラインを上抜け',
        'MACDが0ラインより下にある',
        'ヒストグラムが減少'
      ],
      correctAnswer: '1',
      explanation: 'MACDラインがシグナルラインを下から上に抜ける「ゴールデンクロス」は、強い買いシグナルとして広く知られています。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['MACD', 'ゴールデンクロス', '買いシグナル']
    },
    {
      id: 'tb-assessment-8',
      questionType: 'multiple_choice',
      question: 'ポジションサイジングで最も重要な考え方は？',
      options: [
        '利益を最大化するため大きなポジションを取る',
        'リスク許容度に応じて適切な取引量を決める',
        '常に同じ金額で取引する',
        '相場の調子が良い時だけ大きく取引'
      ],
      correctAnswer: '1',
      explanation: 'ポジションサイジングは自分のリスク許容度と資金管理計画に基づいて決めるべきです。1回の取引で資金の2-3%以上のリスクを取らないのが一般的です。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['ポジションサイジング', '資金管理', 'リスク許容度']
    },
    {
      id: 'tb-assessment-9',
      questionType: 'true_false',
      question: 'ファンダメンタル分析よりもテクニカル分析の方が常に優れている。',
      correctAnswer: 'false',
      explanation: 'どちらも重要な分析手法で、投資期間や市場状況によって有効性が変わります。短期取引ではテクニカル、長期投資ではファンダメンタルが重視される傾向があります。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['テクニカル分析', 'ファンダメンタル分析', '分析手法']
    },
    {
      id: 'tb-assessment-10',
      questionType: 'multiple_choice',
      question: 'スキャルピングトレードの特徴は？',
      options: [
        '数日から数週間のポジション保有',
        '数分から数時間の超短期取引',
        '1年以上の長期投資',
        '月に1-2回の取引頻度'
      ],
      correctAnswer: '1',
      explanation: 'スキャルピングは数秒から数分の極めて短い時間でポジションを保有し、小さな利益を積み重ねる取引手法です。高頻度取引と高い集中力が必要です。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['スキャルピング', '短期取引', '取引手法']
    },
    {
      id: 'tb-assessment-11',
      questionType: 'multiple_choice',
      question: '逆張りトレードで重要な要素は？',
      options: [
        'トレンドの継続を期待する',
        '価格の反転ポイントを見極める',
        '常に多数派に従う',
        '高値で買って低値で売る'
      ],
      correctAnswer: '1',
      explanation: '逆張りは価格の反転を狙う手法で、適切な反転ポイント（サポート・レジスタンス、オーバーソールド等）を見極める技術が重要です。',
      points: 10,
      difficultyLevel: 'advanced',
      tags: ['逆張り', '価格反転', 'トレード手法']
    },
    {
      id: 'tb-assessment-12',
      questionType: 'true_false',
      question: 'レバレッジ取引は利益も損失も拡大するため、十分な知識と経験が必要である。',
      correctAnswer: 'true',
      explanation: 'レバレッジは資金効率を高める一方で、損失も同じ倍率で拡大します。初心者は現物取引で経験を積んでからレバレッジ取引に挑戦すべきです。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['レバレッジ', 'リスク管理', '証拠金取引']
    },
    {
      id: 'tb-assessment-13',
      questionType: 'multiple_choice',
      question: 'トレーディングで最も避けるべき心理状態は？',
      options: [
        '冷静な判断',
        'FOMO（見逃すことへの恐怖）',
        '慎重な分析',
        '計画的な取引'
      ],
      correctAnswer: '1',
      explanation: 'FOMO（Fear of Missing Out）は感情的な取引判断を招き、高値掴みや計画性のない取引の原因となります。冷静な判断が最も重要です。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['FOMO', '投資心理', '感情コントロール']
    },
    {
      id: 'tb-assessment-14',
      questionType: 'multiple_choice',
      question: 'バックテストの目的は？',
      options: [
        '未来の価格を正確に予測する',
        '過去のデータで戦略の有効性を検証する',
        '必ず利益が出ることを証明する',
        '他人の手法をコピーする'
      ],
      correctAnswer: '1',
      explanation: 'バックテストは過去のデータを使って取引戦略の有効性を統計的に検証する手法です。未来を保証するものではありませんが、戦略改善の重要なツールです。',
      points: 10,
      difficultyLevel: 'advanced',
      tags: ['バックテスト', '戦略検証', '統計分析']
    }
  ],
  isPublished: true,
  createdAt: new Date('2024-01-01T00:00:00Z'),
  updatedAt: new Date('2024-01-01T00:00:00Z')
};