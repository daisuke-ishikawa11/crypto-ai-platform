import type { CategoryTest } from '@/types';

export const cryptoBasicsTest1: CategoryTest = {
  id: 'crypto-basics-test-1',
  categoryId: 'crypto-basics',
  title: '暗号通貨基礎確認テスト1（レッスン1-5）',
  description: 'ビットコイン、ブロックチェーン、キー管理の基礎知識を確認する包括的テストです。',
  lessonRange: '1-5',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'crypto-test-1-q1',
      question: '2025年8月14日にビットコインが記録した史上最高値はいくらですか？',
      options: [
        '$100,000',
        '$124,496',
        '$150,000',
        '$180,000'
      ],
      correctAnswer: 1,
      explanation: '2025年8月14日にビットコインは史上最高値$124,496を記録しました。これは前回の最高値を約69%上回る歴史的水準で、機関投資家の本格参入を示しています。',
      difficulty: 'beginner',
      category: 'market-data'
    },
    {
      id: 'crypto-test-1-q2',
      question: 'ビットコインの供給量上限は何BTCですか？',
      options: [
        '1,800万BTC',
        '2,100万BTC',
        '2,500万BTC',
        '無制限'
      ],
      correctAnswer: 1,
      explanation: 'ビットコインの供給量上限は2,100万BTCと厳格に設定されており、これが希少性と価値保存特性を実現する「デジタルゴールド」としての基盤となっています。',
      difficulty: 'beginner',
      category: 'technical-basics'
    },
    {
      id: 'crypto-test-1-q3',
      question: 'ブロックチェーンでブロックが生成される平均間隔は？',
      options: [
        '約1分',
        '約5分',
        '約10分',
        '約30分'
      ],
      correctAnswer: 2,
      explanation: 'ビットコインのブロックチェーンでは、約10分間隔で新しいブロックが生成されるよう難易度調整機能により自動制御されています。',
      difficulty: 'beginner',
      category: 'technical-basics'
    },
    {
      id: 'crypto-test-1-q4',
      question: '2025年現在のビットコインETF累積資金流入額は約いくらですか？',
      options: [
        '約500億ドル',
        '約800億ドル',
        '約1,200億ドル',
        '約2,000億ドル'
      ],
      correctAnswer: 2,
      explanation: '2024年1月のETF承認開始から2025年8月まで、ビットコインETFには累計約1,200億ドルの資金が流入し、機関投資家の本格的参入を実現しました。',
      difficulty: 'intermediate',
      category: 'market-data'
    },
    {
      id: 'crypto-test-1-q5',
      question: 'ブロックチェーンの「改ざん耐性」を実現する主要技術は？',
      options: [
        'デジタル署名のみ',
        'ハッシュ関数とチェーン構造',
        'パスワード暗号化',
        'インターネット接続'
      ],
      correctAnswer: 1,
      explanation: 'SHA-256ハッシュ関数による各ブロックの固有識別子と、前のブロックのハッシュを含むチェーン構造により、一つでも改ざんされると後続の全ブロックに影響が及び検知される仕組みです。',
      difficulty: 'intermediate',
      category: 'technical-basics'
    },
    {
      id: 'crypto-test-1-q6',
      question: '秘密鍵を紛失した場合、暗号通貨はどうなりますか？',
      options: [
        '銀行に申請すれば復旧可能',
        '政府機関に依頼すれば回復できる',
        '永続的にアクセス不可となる',
        '24時間後に自動復旧する'
      ],
      correctAnswer: 2,
      explanation: '暗号通貨では秘密鍵が資産の唯一のアクセス手段であり、紛失すると技術的に回復不可能です。これが分散型システムの特徴である一方、慎重な鍵管理が必要な理由です。',
      difficulty: 'intermediate',
      category: 'security'
    },
    {
      id: 'crypto-test-1-q7',
      question: '2024年4月の半減期後、現在のビットコインのブロック報酬は？',
      options: [
        '12.5 BTC',
        '6.25 BTC', 
        '3.125 BTC',
        '1.5625 BTC'
      ],
      correctAnswer: 2,
      explanation: '2024年4月の半減期により、ビットコインのブロック報酬は6.25 BTCから3.125 BTCに半減しました。これにより新規供給が減少し、希少性が増しています。',
      difficulty: 'intermediate',
      category: 'technical-basics'
    },
    {
      id: 'crypto-test-1-q8',
      question: 'ビットコインアドレスの「チェックサム」機能の目的は？',
      options: [
        '送金の高速化',
        '手数料の削減',
        '入力ミスの検出・防止',
        'プライバシーの強化'
      ],
      correctAnswer: 2,
      explanation: 'チェックサム機能により、アドレスの入力ミスや文字化けを検出して誤送金を防止します。特にBech32形式では強力なエラー検出機能が実装されています。',
      difficulty: 'intermediate',
      category: 'security'
    },
    {
      id: 'crypto-test-1-q9',
      question: '2025年現在、日本で金融庁に登録されている暗号通貨交換業者は何社ですか？',
      options: [
        '25社',
        '32社',
        '40社',
        '50社'
      ],
      correctAnswer: 1,
      explanation: '2025年8月現在、日本の金融庁（FSA）に登録されている暗号通貨交換業者は32社です。また、2025年3月には新たにCAISP（暗号通貨仲介サービス業者）ライセンスも導入されました。',
      difficulty: 'intermediate',
      category: 'regulation'
    },
    {
      id: 'crypto-test-1-q10',
      question: 'ビットコインネットワークの「51%攻撃」に必要な推定コストは？',
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
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};