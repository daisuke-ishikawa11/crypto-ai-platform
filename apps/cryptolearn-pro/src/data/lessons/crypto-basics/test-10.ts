import type { CategoryTest } from '@/types';

export const cryptoBasicsTest10: CategoryTest = {
  id: 'crypto-basics-test-10',
  categoryId: 'crypto-basics',
  title: '暗号通貨基礎確認テスト10（レッスン46-50）',
  description: '法的考慮事項、コンプライアンス、倫理的投資、総合理解の最終確認テストです。',
  lessonRange: '46-50',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'crypto-test-10-q1',
      question: 'KYC（Know Your Customer）の主な目的は？',
      options: [
        '取引手数料の削減',
        'マネーロンダリング防止と顧客身元確認',
        '取引速度の向上',
        '税金の免除'
      ],
      correctAnswer: 1,
      explanation: 'KYC（顧客確認）は、マネーロンダリングやテロ資金供与を防止するため、顧客の身元確認と取引の正当性を検証する手続きです。',
      difficulty: 'beginner',
      category: 'compliance'
    },
    {
      id: 'crypto-test-10-q2',
      question: 'AML（Anti-Money Laundering）対策で重要な監視項目は？',
      options: [
        '取引の頻度のみ',
        '異常な取引パターンと高額取引',
        '使用するウォレットの種類',
        '投資の利益率'
      ],
      correctAnswer: 1,
      explanation: 'AML対策では、通常と異なる取引パターン、高額取引、複数の小口取引、疑わしい送金先などを監視し、不正資金の流れを検知します。',
      difficulty: 'intermediate',
      category: 'compliance'
    },
    {
      id: 'crypto-test-10-q3',
      question: '暗号通貨における「トラベルルール」とは？',
      options: [
        '海外旅行時の持ち込み制限',
        '一定額以上の送金時に送金者情報を共有する規則',
        '取引所間の手数料統一ルール',
        '暗号通貨の国際輸送規則'
      ],
      correctAnswer: 1,
      explanation: 'トラベルルールは、一定額以上の暗号通貨送金時に、送金者と受取者の情報を取引所間で共有することを義務付ける国際的な規則です。',
      difficulty: 'advanced',
      category: 'compliance'
    },
    {
      id: 'crypto-test-10-q4',
      question: 'ESG投資における暗号通貨の主な課題は？',
      options: [
        '取引速度が遅い',
        '環境負荷とエネルギー消費',
        '手数料が高い',
        '技術が複雑'
      ],
      correctAnswer: 1,
      explanation: 'ESG（環境・社会・ガバナンス）投資において、特にビットコインのProof of Workによる高いエネルギー消費が環境面での主要な課題となっています。',
      difficulty: 'intermediate',
      category: 'sustainable-investing'
    },
    {
      id: 'crypto-test-10-q5',
      question: '法定通貨と暗号通貨の法的地位の主な違いは？',
      options: [
        '法定通貨は政府保証、暗号通貨は技術保証',
        '取引時間の制限',
        '手数料の有無',
        '使用可能な地域'
      ],
      correctAnswer: 0,
      explanation: '法定通貨は政府や中央銀行による価値保証がありますが、暗号通貨は分散型技術とコミュニティの信頼に基づく価値保証となっています。',
      difficulty: 'intermediate',
      category: 'legal-framework'
    },
    {
      id: 'crypto-test-10-q6',
      question: 'カーボンニュートラルな暗号通貨の代表例は？',
      options: [
        'ビットコイン',
        'イーサリアム（PoS移行後）',
        'ライトコイン',
        'ビットコインキャッシュ'
      ],
      correctAnswer: 1,
      explanation: 'イーサリアムは2022年のProof of Stakeへの移行により、エネルギー消費を99.95%削減し、カーボンニュートラルな暗号通貨の代表例となっています。',
      difficulty: 'intermediate',
      category: 'sustainable-investing'
    },
    {
      id: 'crypto-test-10-q7',
      question: '暗号通貨業界で「サンドボックス制度」の目的は？',
      options: [
        'セキュリティテストの実施',
        '規制環境下での革新的サービスの実証実験',
        'マイニングの効率化',
        'ウォレットの安全性向上'
      ],
      correctAnswer: 1,
      explanation: 'サンドボックス制度は、既存の規制を一時的に緩和して、革新的な金融サービスの実証実験を可能にし、イノベーションと消費者保護のバランスを図る制度です。',
      difficulty: 'advanced',
      category: 'regulatory-innovation'
    },
    {
      id: 'crypto-test-10-q8',
      question: '分散型金融（DeFi）のコンプライアンス課題は？',
      options: [
        '取引速度が遅い',
        '匿名性により規制当局の監視が困難',
        '手数料が高すぎる',
        'ユーザーインターフェースが複雑'
      ],
      correctAnswer: 1,
      explanation: 'DeFiは分散型で匿名性が高いため、KYC/AMLの実施や規制当局による監視が困難で、コンプライアンス対応が大きな課題となっています。',
      difficulty: 'advanced',
      category: 'compliance'
    },
    {
      id: 'crypto-test-10-q9',
      question: '暗号通貨投資の倫理的考慮事項として重要なのは？',
      options: [
        '最大利益の追求のみ',
        '環境・社会への影響とガバナンスの透明性',
        '技術的複雑さの回避',
        '政府政策への完全依存'
      ],
      correctAnswer: 1,
      explanation: '倫理的な暗号通貨投資では、環境負荷、社会への正負の影響、プロジェクトのガバナンス透明性、長期的な持続可能性を総合的に考慮することが重要です。',
      difficulty: 'advanced',
      category: 'ethical-investing'
    },
    {
      id: 'crypto-test-10-q10',
      question: '暗号通貨の将来にとって最も重要な要因は？',
      options: [
        '価格の上昇のみ',
        '技術革新、規制整備、社会実装のバランス',
        '政府による完全管理',
        '投機的取引の拡大'
      ],
      correctAnswer: 1,
      explanation: '暗号通貨の健全な発展には、技術的革新の継続、適切な規制環境の整備、実用的な社会実装の3つのバランスが最も重要です。',
      difficulty: 'advanced',
      category: 'future-outlook'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};