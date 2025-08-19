import { CategoryAssessment } from '@/lib/types/learning';

export const cryptoBasicsAssessment: CategoryAssessment = {
  id: 'assessment-crypto-basics',
  categoryId: 'crypto-basics',
  title: '暗号通貨の基礎 総合テスト',
  description: 'ビットコイン、ブロックチェーン、ウォレット、セキュリティなど暗号通貨に関する基本知識の総合的な理解度を確認します',
  difficultyLevel: 'beginner',
  estimatedMinutes: 30,
  passingScore: 80,
  totalPoints: 150,
  questions: [
    {
      id: 'cb-assessment-1',
      questionType: 'multiple_choice',
      question: 'ビットコインが世界初の暗号通貨として画期的だった理由は？',
      options: [
        'デジタルで送金できること',
        '二重支払い問題を解決したこと',
        '匿名で取引できること',
        '価格が上昇し続けること'
      ],
      correctAnswer: '1',
      explanation: 'ビットコインの最大の革新は、中央機関なしに二重支払い問題を解決したことです。これにより、デジタル通貨において初めて信頼できる価値の移転が可能になりました。',
      points: 10,
      difficultyLevel: 'beginner',
      tags: ['ビットコイン', '二重支払い問題', '歴史']
    },
    {
      id: 'cb-assessment-2',
      questionType: 'multiple_choice',
      question: 'ブロックチェーンの基本的な仕組みで正しいのは？',
      options: [
        'すべての取引は一つのサーバーで管理される',
        '取引データをブロックに記録し、チェーン状に連結する',
        '中央銀行が発行と管理を行う',
        'パスワードで保護されたデータベース'
      ],
      correctAnswer: '1',
      explanation: 'ブロックチェーンは取引データをブロックに記録し、それらを暗号学的にチェーン状に連結することで、改ざん困難な分散台帳を実現しています。',
      points: 10,
      difficultyLevel: 'beginner',
      tags: ['ブロックチェーン', '分散台帳', '基本構造']
    },
    {
      id: 'cb-assessment-3',
      questionType: 'true_false',
      question: 'プライベートキーを失うと、そのウォレットの暗号通貨は永久に失われる。',
      correctAnswer: 'true',
      explanation: 'プライベートキーは暗号通貨の所有権を証明する唯一の方法です。失うと誰もその暗号通貨にアクセスできなくなるため、安全な保管が極めて重要です。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['プライベートキー', 'ウォレット', 'セキュリティ']
    },
    {
      id: 'cb-assessment-4',
      questionType: 'multiple_choice',
      question: 'マイニング（採掘）の主な目的は？',
      options: [
        '新しい暗号通貨を作ること',
        '取引の承認とブロックチェーンの維持',
        'ハッカーからネットワークを守ること',
        '価格を安定させること'
      ],
      correctAnswer: '1',
      explanation: 'マイニングは取引の検証・承認とブロックチェーンの維持が主目的です。マイナーは計算資源を提供してネットワークのセキュリティと分散性を保っています。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['マイニング', 'PoW', 'ネットワーク維持']
    },
    {
      id: 'cb-assessment-5',
      questionType: 'multiple_choice',
      question: 'ホットウォレットとコールドウォレットの違いは？',
      options: [
        '温度の違い',
        'インターネット接続の有無',
        '暗号通貨の種類の違い',
        '手数料の違い'
      ],
      correctAnswer: '1',
      explanation: 'ホットウォレットはインターネットに接続されており便利ですが、コールドウォレットは完全にオフラインのため高セキュリティです。用途に応じて使い分けることが重要です。',
      points: 10,
      difficultyLevel: 'beginner',
      tags: ['ウォレット', 'ホットウォレット', 'コールドウォレット']
    },
    {
      id: 'cb-assessment-6',
      questionType: 'true_false',
      question: '暗号通貨の取引は一度確認されると取り消すことができない。',
      correctAnswer: 'true',
      explanation: 'ブロックチェーンに記録された取引は不可逆的です。これが暗号通貨の信頼性の源泉ですが、送金ミスなどは取り消せないため十分な注意が必要です。',
      points: 10,
      difficultyLevel: 'beginner',
      tags: ['取引の不可逆性', 'ブロックチェーン特性']
    },
    {
      id: 'cb-assessment-7',
      questionType: 'multiple_choice',
      question: 'アルトコイン（オルトコイン）とは何ですか？',
      options: [
        'ビットコインと同じもの',
        'ビットコイン以外の暗号通貨の総称',
        '偽物の暗号通貨',
        '取引所でのみ使える通貨'
      ],
      correctAnswer: '1',
      explanation: 'アルトコインは"Alternative Coin"の略で、ビットコイン以外の暗号通貨の総称です。イーサリアム、リップル、ライトコインなど多数存在します。',
      points: 10,
      difficultyLevel: 'beginner',
      tags: ['アルトコイン', '暗号通貨種類']
    },
    {
      id: 'cb-assessment-8',
      questionType: 'multiple_choice',
      question: 'スマートコントラクトの特徴で正しいのは？',
      options: [
        '人間が毎回実行する必要がある',
        '条件を満たすと自動で実行される',
        'ビットコインでのみ利用可能',
        '法的拘束力がない'
      ],
      correctAnswer: '1',
      explanation: 'スマートコントラクトは予め設定された条件を満たすと自動で実行されるプログラムです。イーサリアムなどのプラットフォームで幅広く活用されています。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['スマートコントラクト', 'イーサリアム', '自動実行']
    },
    {
      id: 'cb-assessment-9',
      questionType: 'true_false',
      question: '暗号通貨の価格はボラティリティ（価格変動）が大きいため、リスク管理が重要である。',
      correctAnswer: 'true',
      explanation: '暗号通貨は新興資産クラスであり、価格変動が非常に大きいのが特徴です。投資する際は余剰資金での投資とリスク管理が不可欠です。',
      points: 10,
      difficultyLevel: 'beginner',
      tags: ['ボラティリティ', 'リスク管理', '価格変動']
    },
    {
      id: 'cb-assessment-10',
      questionType: 'multiple_choice',
      question: 'DeFi（分散型金融）の基本概念として正しいのは？',
      options: [
        '中央銀行が管理する金融システム',
        '従来の銀行を完全に置き換えるもの',
        'ブロックチェーン上で動作する金融サービス',
        '政府が規制する新しい金融制度'
      ],
      correctAnswer: '2',
      explanation: 'DeFiは中央機関に依存せず、ブロックチェーン上のスマートコントラクトで動作する金融サービスです。従来の金融仲介者なしに様々な金融サービスを提供します。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['DeFi', '分散型金融', 'スマートコントラクト']
    },
    {
      id: 'cb-assessment-11',
      questionType: 'multiple_choice',
      question: '暗号通貨取引所の選び方で最も重要な要素は？',
      options: [
        '取引手数料の安さのみ',
        'セキュリティと規制遵守の状況',
        '取り扱い通貨数の多さ',
        'インターフェースのデザイン'
      ],
      correctAnswer: '1',
      explanation: '取引所選択では、まずセキュリティ体制と規制遵守状況が最重要です。資金の安全性が確保されていない取引所は、どんなに他の条件が良くても避けるべきです。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['取引所', 'セキュリティ', 'リスク管理']
    },
    {
      id: 'cb-assessment-12',
      questionType: 'true_false',
      question: 'ステーキングは暗号通貨を保有するだけで報酬を得られる仕組みである。',
      correctAnswer: 'true',
      explanation: 'ステーキングはプルーフ・オブ・ステーク（PoS）システムにおいて、暗号通貨を保有・ロックすることでネットワーク維持に貢献し、その対価として報酬を得る仕組みです。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['ステーキング', 'PoS', '報酬システム']
    },
    {
      id: 'cb-assessment-13',
      questionType: 'multiple_choice',
      question: 'NFT（非代替性トークン）の特徴として正しいのは？',
      options: [
        'すべて同じ価値を持つ',
        'それぞれが一意で代替不可能',
        'ビットコインと同じもの',
        '物理的な物品のみを表現'
      ],
      correctAnswer: '1',
      explanation: 'NFTは非代替性トークンで、それぞれが一意の属性を持ち代替不可能です。デジタルアート、ゲームアイテム、証明書など様々な用途で活用されています。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['NFT', '非代替性', 'デジタル資産']
    },
    {
      id: 'cb-assessment-14',
      questionType: 'multiple_choice',
      question: 'フィッシング詐欺から身を守る最も重要な対策は？',
      options: [
        '高額な暗号通貨を購入しない',
        '公式サイトのURLを必ず確認する',
        '取引を頻繁に行わない',
        '人気のある暗号通貨のみ購入'
      ],
      correctAnswer: '1',
      explanation: 'フィッシング詐欺対策では、常に公式サイトのURLを確認し、怪しいリンクをクリックしないことが最重要です。二要素認証の設定も併せて実施すべきです。',
      points: 10,
      difficultyLevel: 'intermediate',
      tags: ['フィッシング詐欺', 'セキュリティ対策', 'URL確認']
    },
    {
      id: 'cb-assessment-15',
      questionType: 'true_false',
      question: '暗号通貨の送金には銀行の営業時間は関係なく、24時間365日いつでも可能である。',
      correctAnswer: 'true',
      explanation: '暗号通貨ネットワークは24時間365日稼働しており、世界中どこにでも時間制限なく送金が可能です。これは従来の銀行システムにはない大きな利点です。',
      points: 10,
      difficultyLevel: 'beginner',
      tags: ['24時間送金', 'グローバル送金', 'システム稼働']
    }
  ],
  isPublished: true,
  createdAt: new Date('2024-01-01T00:00:00Z'),
  updatedAt: new Date('2024-01-01T00:00:00Z')
};