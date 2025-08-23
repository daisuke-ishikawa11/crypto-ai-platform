import type { CategoryTest } from '@/types';

export const riskManagementTest5: CategoryTest = {
  id: 'risk-management-test-5',
  categoryId: 'risk-management',
  title: 'リスク管理・投資心理学確認テスト5（レッスン21-25）',
  description: 'AI投資リスク、長期戦略、暴落対策、技術リスク、総合戦略の確認テストです。',
  lessonRange: '21-25',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'risk-test-5-q1',
      question: '2025年のAI投資支援ツール活用時の最大のリスクは？',
      options: [
        'コストが高い',
        '過度の依存による判断力低下と説明責任の曖昧化',
        '処理速度が遅い',
        'データ量が少ない'
      ],
      correctAnswer: 1,
      explanation: 'AI投資ツールへの過度な依存は、自分自身の投資判断力を低下させ、損失発生時の原因分析や改善策検討を困難にするリスクがあります。',
      difficulty: 'advanced',
      category: 'ai-investment-risks'
    },
    {
      id: 'risk-test-5-q2',
      question: 'HODL戦略のリスク管理上の注意点は？',
      options: [
        'リスクは一切ない',
        '長期間の含み損に耐える精神力とリバランス戦略が必要',
        '短期売買より必ず良い結果になる',
        '何も考えずに放置すればよい'
      ],
      correctAnswer: 1,
      explanation: 'HODL戦略では数年にわたる含み損の期間もあるため、精神的な耐久力と、定期的なリバランス、投資継続のための生活資金確保が重要です。',
      difficulty: 'intermediate',
      category: 'long-term-strategy'
    },
    {
      id: 'risk-test-5-q3',
      question: '2025年現在の暗号通貨市場で最も効果的なリスク管理手法は？',
      options: [
        '単一銘柄への集中投資',
        'ドルコスト平均法＋分散投資＋定期リバランス',
        '高頻度取引のみ',
        '感情に基づく判断'
      ],
      correctAnswer: 1,
      explanation: 'ボラティリティの高い暗号通貨市場では、ドルコスト平均法による時間分散、複数銘柄への分散投資、定期的なリバランスを組み合わせた戦略が最も効果的です。',
      difficulty: 'intermediate',
      category: 'crypto-risk-management'
    },
    {
      id: 'risk-test-5-q4',
      question: '暗号通貨投資での「逆張り投資」のリスクは？',
      options: [
        '必ず利益が出る',
        'ナイフキャッチ（さらなる下落）リスクと精神的負担',
        '手数料がかからない',
        'リスクは一切ない'
      ],
      correctAnswer: 1,
      explanation: '逆張り投資では「底値」と思った価格からさらに下落する「ナイフキャッチ」リスクがあり、含み損の拡大や精神的な負担増大に注意が必要です。',
      difficulty: 'intermediate',
      category: 'investment-strategy-risks'
    },
    {
      id: 'risk-test-5-q5',
      question: '2025年の量子コンピューティングリスクへの対策は？',
      options: [
        '完全に無視する',
        '量子耐性暗号通貨への段階的移行準備',
        '従来技術のみ使用',
        '投資をすべて中止'
      ],
      correctAnswer: 1,
      explanation: '量子コンピューティングによる暗号技術の脅威に備え、量子耐性暗号を採用した暗号通貨への段階的移行や、関連技術への分散投資が考慮されています。',
      difficulty: 'advanced',
      category: 'technological-risks'
    },
    {
      id: 'risk-test-5-q6',
      question: 'クリプト投資における「FOMO」の対策は？',
      options: [
        '感情に従って即座に行動する',
        '計画的な投資戦略と冷静な判断期間の確保',
        '他人の投資判断をそのまま真似る',
        'SNSの情報にすぐ反応する'
      ],
      correctAnswer: 1,
      explanation: 'FOMO（Fear of Missing Out）対策には、事前に決めた投資戦略の遵守、感情的になった時の判断保留期間の設定、SNSから距離を置くことが有効です。',
      difficulty: 'intermediate',
      category: 'emotional-control'
    },
    {
      id: 'risk-test-5-q7',
      question: '投資における「プロスペクト理論」の実践的示唆は？',
      options: [
        '人間の行動は常に合理的',
        '利益確定は早く、損切りは遅い傾向を自覚し対策する',
        '感情を完全に信頼する',
        '他人と同じ行動を取る'
      ],
      correctAnswer: 1,
      explanation: 'プロスペクト理論によると、人間は利益は確実に確保したがり（利益確定を急ぐ）、損失は避けようとする（損切りを先延ばし）傾向があります。この認知バイアスを自覚した投資判断が必要です。',
      difficulty: 'advanced',
      category: 'behavioral-finance-application'
    },
    {
      id: 'risk-test-5-q8',
      question: 'マーケットタイミングを狙う投資の最大の問題点は？',
      options: [
        '必ず成功する',
        '人間の心理的バイアスと予測の困難性',
        '手数料が安い',
        'リスクがない'
      ],
      correctAnswer: 1,
      explanation: 'マーケットタイミングを完璧に予測することは不可能で、恐怖や欲望による感情的判断、確証バイアスなどが合理的判断を阻害します。',
      difficulty: 'intermediate',
      category: 'market-timing-risks'
    },
    {
      id: 'risk-test-5-q9',
      question: '2025年の「ブラックスワン」イベントリスクへの対処法は？',
      options: [
        'そのような事象は起こらないと信じる',
        '分散投資・適度なキャッシュポジション・リスクシナリオ準備',
        '全て暗号通貨に集中投資',
        '借金を増やして投資拡大'
      ],
      correctAnswer: 1,
      explanation: 'ブラックスワンイベント（予測困難で影響大な事象）への対処には、真の分散投資、適度な現金保有、複数のリスクシナリオ準備が必要です。',
      difficulty: 'advanced',
      category: 'black-swan-preparation'
    },
    {
      id: 'risk-test-5-q10',
      question: 'リスク管理の「5つの原則」として最も適切な組み合わせは？',
      options: [
        '楽観・集中・感情・短期・借金',
        'リスクの認識・分散・測定・制御・継続改善',
        '投機・賭博・直感・他人任せ・無計画',
        '高リスクのみ・集中投資・感情重視・短期志向・借金活用'
      ],
      correctAnswer: 1,
      explanation: '効果的なリスク管理には、リスクの認識と受容、分散投資による軽減、VaRなどによる測定、ストップロスなどの制御、市場変化に応じた継続的改善が必要です。',
      difficulty: 'advanced',
      category: 'risk-management-principles'
    }
  ],
  lastUpdated: '2025-08-21',
  factChecked: true
};