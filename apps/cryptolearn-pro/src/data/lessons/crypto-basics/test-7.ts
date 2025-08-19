import type { CategoryTest } from '@/types';

export const cryptoBasicsTest7: CategoryTest = {
  id: 'crypto-basics-test-7',
  categoryId: 'crypto-basics',
  title: '暗号通貨基礎確認テスト7（レッスン31-35）',
  description: '環境問題、セキュリティ強化、規制動向、エンタープライズ応用の知識を確認するテストです。',
  lessonRange: '31-35',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'crypto-test-7-q1',
      question: 'イーサリアムのProof of Stake移行によるエネルギー削減率は？',
      options: [
        '約50%',
        '約80%',
        '約99.95%',
        '約30%'
      ],
      correctAnswer: 2,
      explanation: 'イーサリアムは2022年9月の「マージ」でProof of WorkからProof of Stakeに移行し、エネルギー消費を99.95%削減しました。これは環境問題への大きな解決策となっています。',
      difficulty: 'intermediate',
      category: 'environmental-impact'
    },
    {
      id: 'crypto-test-7-q2',
      question: '2025年現在のビットコインマイニングにおける再生可能エネルギー使用率は？',
      options: [
        '約25%',
        '約45%',
        '約67%',
        '約90%'
      ],
      correctAnswer: 2,
      explanation: '2025年現在、ビットコインマイニングにおける再生可能エネルギーの使用率は約67%に達し、環境負荷の大幅な改善が実現されています。',
      difficulty: 'intermediate',
      category: 'environmental-impact'
    },
    {
      id: 'crypto-test-7-q3',
      question: 'ビットコインネットワークの51%攻撃に必要な推定コストは？',
      options: [
        '約10億ドル/日',
        '約400億ドル/日',
        '約100億ドル/日',
        '約1兆ドル/日'
      ],
      correctAnswer: 1,
      explanation: '2025年現在、ビットコインネットワークに対する51%攻撃には約400億ドル/日のコストが必要とされ、これが経済的な攻撃抑制力となり世界最高レベルのセキュリティを実現しています。',
      difficulty: 'advanced',
      category: 'security'
    },
    {
      id: 'crypto-test-7-q4',
      question: 'マルチシグウォレットの「2-of-3」設定の意味は？',
      options: [
        '2つのアドレスで3つの通貨を管理',
        '3つの秘密鍵のうち2つで署名すれば送金可能',
        '2回確認すれば3倍の額を送金可能',
        '3日間で2回まで送金可能'
      ],
      correctAnswer: 1,
      explanation: 'マルチシグウォレットの「2-of-3」設定は、3つの秘密鍵のうち2つの署名があれば取引が実行される仕組みで、セキュリティと利便性のバランスを取った設定です。',
      difficulty: 'intermediate',
      category: 'security'
    },
    {
      id: 'crypto-test-7-q5',
      question: '2025年3月に日本で導入された新ライセンスは？',
      options: [
        'VASP（仮想資産サービス業者）',
        'CAISP（暗号通貨仲介サービス業者）',
        'DASP（デジタル資産サービス業者）',
        'FASP（金融暗号サービス業者）'
      ],
      correctAnswer: 1,
      explanation: '2025年3月に日本では新たにCAISP（暗号通貨仲介サービス業者）ライセンスが導入され、より幅広い暗号通貨関連サービスの法的枠組みが整備されました。',
      difficulty: 'advanced',
      category: 'regulation'
    },
    {
      id: 'crypto-test-7-q6',
      question: 'ハードウェアウォレットの主要メーカーはどこですか？',
      options: [
        'Apple、Google',
        'Ledger、Trezor',
        'Samsung、Sony',
        'Microsoft、Amazon'
      ],
      correctAnswer: 1,
      explanation: 'ハードウェアウォレットの主要メーカーはLedger（フランス）とTrezor（チェコ）で、世界中で数百万台の販売実績があり、最高レベルのセキュリティを提供しています。',
      difficulty: 'beginner',
      category: 'security'
    },
    {
      id: 'crypto-test-7-q7',
      question: 'エンタープライズ向け暗号通貨ソリューションの主な特徴は？',
      options: [
        '完全な匿名性',
        'コンプライアンス機能と監査証跡',
        '無制限の取引',
        '政府による保証'
      ],
      correctAnswer: 1,
      explanation: 'エンタープライズ向けソリューションは、規制遵守のためのコンプライアンス機能、詳細な監査証跡、KYC/AML統合などが重要な特徴となっています。',
      difficulty: 'intermediate',
      category: 'enterprise-solutions'
    },
    {
      id: 'crypto-test-7-q8',
      question: 'カーボンオフセットクレジットのトークン化の利点は？',
      options: [
        '価格が固定される',
        '透明性と流動性の向上',
        '政府による保証',
        '税金が免除される'
      ],
      correctAnswer: 1,
      explanation: 'カーボンオフセットクレジットのトークン化により、取引の透明性が向上し、グローバルな流動性市場が形成され、環境貢献の真正性を確保できます。',
      difficulty: 'advanced',
      category: 'environmental-impact'
    },
    {
      id: 'crypto-test-7-q9',
      question: 'ゼロ知識証明の主な用途は？',
      options: [
        '取引速度の向上',
        'プライバシー保護と検証',
        '手数料の削減',
        'マイニング効率化'
      ],
      correctAnswer: 1,
      explanation: 'ゼロ知識証明は、秘密情報を開示することなく、その情報の正当性を証明できる技術で、プライバシーを保護しながら透明性を確保できます。',
      difficulty: 'advanced',
      category: 'privacy-technology'
    },
    {
      id: 'crypto-test-7-q10',
      question: '企業の暗号通貨導入における最大の課題は？',
      options: [
        '技術的複雑さ',
        '規制遵守とリスク管理',
        '導入コスト',
        '従業員の抵抗'
      ],
      correctAnswer: 1,
      explanation: '企業の暗号通貨導入では、変化する規制への対応、AML/KYC要件の遵守、市場リスクの管理などが最大の課題となっています。',
      difficulty: 'intermediate',
      category: 'enterprise-solutions'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};