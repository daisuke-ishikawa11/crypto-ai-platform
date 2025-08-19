import { CategoryAssessment } from '@/lib/types/learning';

export const blockchainTechAssessment: CategoryAssessment = {
  id: 'assessment-blockchain-tech',
  categoryId: 'blockchain-tech',
  title: 'ブロックチェーン技術詳解 総合テスト',
  description: 'ブロックチェーンの技術的仕組み、コンセンサスアルゴリズム、開発手法などの深い理解度を確認します',
  difficultyLevel: 'advanced',
  estimatedMinutes: 30,
  passingScore: 80,
  totalPoints: 120,
  questions: [
    {
      id: 'bt-assessment-1',
      questionType: 'multiple_choice',
      question: 'ハッシュ関数の重要な特性で正しくないものは？',
      options: [
        '一方向性（不可逆性）',
        '決定性（同じ入力は同じ出力）',
        '雪崩効果（小さな変更で大きく変わる）',
        '可逆性（逆算可能）'
      ],
      correctAnswer: '3',
      explanation: 'ハッシュ関数は一方向性を持ち、出力から入力を逆算することは計算上困難です。可逆性はハッシュ関数の特性ではありません。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['ハッシュ関数', '暗号学', 'ブロックチェーン基礎']
    },
    {
      id: 'bt-assessment-2',
      questionType: 'multiple_choice',
      question: 'Proof of Work（PoW）における「難易度調整」の目的は？',
      options: [
        'マイナーの参入を制限する',
        'ブロック生成時間を一定に保つ',
        'エネルギー消費を最大化する',
        'ハッシュレートを下げる'
      ],
      correctAnswer: '1',
      explanation: 'PoWの難易度調整は、ネットワークのハッシュレート変動に関わらず、ブロック生成時間を目標時間（ビットコインの場合10分）に維持するために行われます。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['PoW', '難易度調整', 'コンセンサス']
    },
    {
      id: 'bt-assessment-3',
      questionType: 'true_false',
      question: 'Merkle Tree（マークル木）は、大量のデータを効率的に検証するためのデータ構造である。',
      correctAnswer: 'true',
      explanation: 'Merkle Treeは、大量のデータ（取引など）のハッシュを階層的に組織化し、ルートハッシュ一つでデータ全体の整合性を効率的に検証できる構造です。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['Merkle Tree', 'データ構造', 'データ検証']
    },
    {
      id: 'bt-assessment-4',
      questionType: 'multiple_choice',
      question: 'Proof of Stake（PoS）でバリデータが選ばれる基準は？',
      options: [
        '計算能力の高さ',
        'ステークしている暗号通貨の量',
        '地理的な位置',
        '参加年数'
      ],
      correctAnswer: '1',
      explanation: 'PoSでは、ネットワークにステークしている暗号通貨の量に応じて、ブロック生成権を持つバリデータが確率的に選出されます。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['PoS', 'バリデータ', 'ステーキング']
    },
    {
      id: 'bt-assessment-5',
      questionType: 'multiple_choice',
      question: 'スマートコントラクトの実行に必要な「ガス」の概念の目的は？',
      options: [
        '開発者の収入源',
        '無限ループ防止と計算資源の管理',
        'ネットワーク速度の向上',
        '暗号化の強化'
      ],
      correctAnswer: '1',
      explanation: 'ガスは計算資源の使用量を制限し、無限ループなどによるネットワークの悪用を防ぐとともに、計算資源に適切な価格をつける仕組みです。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['ガス', 'スマートコントラクト', '計算資源']
    },
    {
      id: 'bt-assessment-6',
      questionType: 'true_false',
      question: 'Layer 2ソリューションは、メインチェーンの処理能力を拡張するための技術である。',
      correctAnswer: 'true',
      explanation: 'Layer 2は、メインチェーン（Layer 1）のスケーラビリティ問題を解決するため、処理の一部をオフチェーンで行い、その結果をメインチェーンに記録する技術です。',
      points: 10,
      difficultyLevel: 'advanced',
      tags: ['Layer 2', 'スケーラビリティ', 'ブロックチェーン拡張']
    },
    {
      id: 'bt-assessment-7',
      questionType: 'multiple_choice',
      question: 'ゼロ知識証明（Zero-Knowledge Proof）の特徴は？',
      options: [
        '情報を完全に公開する',
        '秘密を明かすことなく知識の保有を証明',
        '計算が非常に簡単',
        '古い暗号技術'
      ],
      correctAnswer: '1',
      explanation: 'ゼロ知識証明は、秘密情報自体を明かすことなく、その情報を知っていることを数学的に証明できる高度な暗号技術です。',
      points: 10,
      difficultyLevel: 'advanced',
      tags: ['ゼロ知識証明', '暗号学', 'プライバシー']
    },
    {
      id: 'bt-assessment-8',
      questionType: 'multiple_choice',
      question: 'コンセンサスアルゴリズムPBFT（Practical Byzantine Fault Tolerance）の特徴は？',
      options: [
        '51%攻撃に完全に脆弱',
        '1/3未満のビザンチン障害に対する耐性',
        'エネルギー消費が非常に大きい',
        '完全に分散化されている'
      ],
      correctAnswer: '1',
      explanation: 'PBFTは、ネットワーク参加者の1/3未満が悪意的または故障している場合でも正常に動作するコンセンサスアルゴリズムです。',
      points: 10,
      difficultyLevel: 'advanced',
      tags: ['PBFT', 'ビザンチン障害', 'コンセンサス']
    },
    {
      id: 'bt-assessment-9',
      questionType: 'true_false',
      question: 'シャーディングは、ブロックチェーンを複数の断片に分けて並列処理することでスケーラビリティを向上させる技術である。',
      correctAnswer: 'true',
      explanation: 'シャーディングは、ブロックチェーンネットワークを複数のシャード（断片）に分割し、各シャードで並列処理を行うことで、全体の処理能力を向上させる技術です。',
      points: 10,
      difficultyLevel: 'advanced',
      tags: ['シャーディング', '並列処理', 'スケーラビリティ']
    },
    {
      id: 'bt-assessment-10',
      questionType: 'multiple_choice',
      question: 'Solidity言語はどのブロックチェーンプラットフォーム向けですか？',
      options: [
        'ビットコイン',
        'イーサリアム',
        'リップル',
        'ライトコイン'
      ],
      correctAnswer: '1',
      explanation: 'Solidityは、イーサリアム仮想マシン（EVM）上で動作するスマートコントラクトを開発するために設計されたプログラミング言語です。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['Solidity', 'イーサリアム', 'プログラミング言語']
    },
    {
      id: 'bt-assessment-11',
      questionType: 'multiple_choice',
      question: 'フォークの種類で「ハードフォーク」の特徴は？',
      options: [
        '後方互換性がある',
        'すべてのノードが同じルールを維持',
        '後方互換性がなく、すべてのノードの更新が必要',
        '一時的な変更のみ'
      ],
      correctAnswer: '2',
      explanation: 'ハードフォークは、プロトコルの根本的な変更により後方互換性がなくなるため、すべてのノードが新しいルールに従うよう更新する必要があります。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['ハードフォーク', '後方互換性', 'プロトコル変更']
    },
    {
      id: 'bt-assessment-12',
      questionType: 'true_false',
      question: 'IPFS（InterPlanetary File System）は、分散型ファイルストレージシステムである。',
      correctAnswer: 'true',
      explanation: 'IPFSは、ファイルを分散的に保存・共有するプロトコルで、中央サーバーに依存せず、コンテンツアドレッシングによってデータの整合性を保証します。',
      points: 10,
      difficultyLevel: 'advanced',
      tags: ['IPFS', '分散型ストレージ', 'コンテンツアドレッシング']
    }
  ],
  isPublished: true,
  createdAt: new Date('2024-01-01T00:00:00Z'),
  updatedAt: new Date('2024-01-01T00:00:00Z')
};