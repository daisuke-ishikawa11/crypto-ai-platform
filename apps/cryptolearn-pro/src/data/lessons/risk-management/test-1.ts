import type { CategoryTest } from '@/types';

export const riskManagementTest1: CategoryTest = {
  id: 'risk-management-test-1',
  categoryId: 'risk-management',
  title: 'リスク管理・投資心理学確認テスト1（レッスン1-5）',
  description: '投資心理学の基礎、認知バイアス、感情制御、リスク許容度の確認テストです。',
  lessonRange: '1-5',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'risk-test-1-q1',
      question: '行動ファイナンスにおける「損失回避バイアス」の特徴は？',
      options: [
        '利益を得る喜びと損失を被る痛みが同じ',
        '損失を被る痛みが利益を得る喜びの約2倍強い',
        '損失を完全に無視する',
        '利益のみを重視する'
      ],
      correctAnswer: 1,
      explanation: 'プロスペクト理論により、人間は同額の利益を得る喜びより損失を被る痛みを約2-2.5倍強く感じることが実証されており、これが非合理な投資判断の原因となります。',
      difficulty: 'intermediate',
      category: 'behavioral-finance'
    },
    {
      id: 'risk-test-1-q2',
      question: '投資心理学における「アンカリング効果」とは？',
      options: [
        '船の錨を使った投資手法',
        '最初に得た情報に判断が引きずられる認知バイアス',
        '固定金利での投資',
        '長期保有戦略'
      ],
      correctAnswer: 1,
      explanation: 'アンカリング効果は、最初に提示された情報（購入価格など）が基準となり、その後の判断に過度な影響を与える認知バイアスです。客観的な分析を阻害する要因となります。',
      difficulty: 'intermediate',
      category: 'behavioral-finance'
    },
    {
      id: 'risk-test-1-q3',
      question: '恐怖と欲望が投資判断に与える最大の悪影響は？',
      options: [
        '取引手数料が増加する',
        '高値買い・安値売りによる損失拡大',
        '投資期間が短くなる',
        '情報収集が増える'
      ],
      correctAnswer: 1,
      explanation: '恐怖により下落時に慌てて売却し、欲望により上昇時に飛びつき買いすることで「高値買い・安値売り」という最悪のパターンに陥りやすくなります。',
      difficulty: 'beginner',
      category: 'emotional-control'
    },
    {
      id: 'risk-test-1-q4',
      question: 'リスク許容度を決定する主要要因は？',
      options: [
        '年齢と投資期間のみ',
        '年齢・投資期間・収入安定性・家族構成・投資経験',
        '資産額のみ',
        '運の良さのみ'
      ],
      correctAnswer: 1,
      explanation: 'リスク許容度は年齢、投資期間、収入の安定性、家族構成、投資経験、金融知識、心理的耐性など複数の要因を総合的に考慮して決定します。',
      difficulty: 'intermediate',
      category: 'risk-assessment'
    },
    {
      id: 'risk-test-1-q5',
      question: '投資における感情制御の最も効果的な方法は？',
      options: [
        '直感に100%従う',
        '事前の投資ルール設定と機械的な実行',
        'SNSの意見に従う',
        '他人と同じ行動を取る'
      ],
      correctAnswer: 1,
      explanation: '感情制御には、冷静な時に投資ルールを明文化し、感情的になった時でも機械的にルールを実行する仕組みを作ることが最も効果的です。',
      difficulty: 'intermediate',
      category: 'emotional-control'
    },
    {
      id: 'risk-test-1-q6',
      question: '「確証バイアス」が投資に与える悪影響は？',
      options: [
        '情報収集量が増える',
        '自分の予想に合う情報のみ収集し、客観的判断を阻害',
        '取引頻度が減る',
        '手数料が安くなる'
      ],
      correctAnswer: 1,
      explanation: '確証バイアスにより、自分の投資判断を正当化する情報のみを集め、反証となる重要な情報を無視してしまい、合理的な投資判断が困難になります。',
      difficulty: 'intermediate',
      category: 'cognitive-bias'
    },
    {
      id: 'risk-test-1-q7',
      question: 'FOMO（Fear of Missing Out）による投資行動の問題点は？',
      options: [
        '慎重な投資判断ができる',
        '感情的で根拠のない投資判断により損失リスクが増大',
        '必ず利益が出る',
        'リスク管理が向上する'
      ],
      correctAnswer: 1,
      explanation: 'FOMOは「機会を逃したくない恐怖」により、十分な調査や計画なしに感情的な投資判断を行い、高値掴みや不適切なタイミングでの投資につながりやすくなります。',
      difficulty: 'beginner',
      category: 'emotional-control'
    },
    {
      id: 'risk-test-1-q8',
      question: '投資心理学で重要な「損切り」ができない心理的理由は？',
      options: [
        '手数料がもったいない',
        '損失確定により「失敗認定」を避けたい心理',
        '税金の関係',
        '時間がない'
      ],
      correctAnswer: 1,
      explanation: '損切りは自分の判断ミスを認めることになるため、人間は心理的に損失確定を避け、「いつか戻る」という希望的観測にすがりがちです。',
      difficulty: 'intermediate',
      category: 'loss-realization'
    },
    {
      id: 'risk-test-1-q9',
      question: '投資における「過信バイアス」の典型例は？',
      options: [
        '慎重すぎる投資判断',
        '自分の投資能力を過大評価し、過度なリスクを取る',
        '投資を避ける',
        '他人の意見のみを重視'
      ],
      correctAnswer: 1,
      explanation: '過信バイアスにより、少しの成功体験から自分の投資能力を過大評価し、十分な調査なしに高リスク投資や集中投資を行いがちになります。',
      difficulty: 'intermediate',
      category: 'cognitive-bias'
    },
    {
      id: 'risk-test-1-q10',
      question: '20代投資家と60代投資家で異なるべきリスク許容度の主要因は？',
      options: [
        '投資資金額のみ',
        '投資期間の長さと人生設計の違い',
        '居住地域の違い',
        '趣味の違い'
      ],
      correctAnswer: 1,
      explanation: '20代は30-40年の長期投資期間があるため高リスク高リターン戦略が可能ですが、60代は退職後の資産保全が重要なため低リスク戦略が適しています。',
      difficulty: 'beginner',
      category: 'age-based-risk-management'
    }
  ],
  lastUpdated: '2025-08-21',
  factChecked: true
};