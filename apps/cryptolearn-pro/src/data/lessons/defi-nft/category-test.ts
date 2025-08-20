import type { CategoryTest } from '@/lib/types/learning';

export const defiNftCategoryTest: CategoryTest = {
  id: 'defi-nft-category-test',
  categoryId: 'defi-nft',
  title: 'DeFi・NFT入門カテゴリー総合確認テスト',
  description: 'DeFi・NFT入門カテゴリの全35レッスンで学習した内容の理解度を包括的に確認するテストです。分散型金融からNFT、Web3.0まで、次世代ブロックチェーンアプリケーションの実践的知識の習得度を測定します。',
  estimatedMinutes: 40,
  passingScore: 85,
  certificateEligible: true,
  
  introduction: `
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 20px; margin: 20px 0; color: white;">
      <h2 style="color: #ffffff; margin-bottom: 20px; font-size: 28px;">🚀 DeFi・NFT入門総合確認テスト</h2>
      <p style="font-size: 18px; line-height: 1.8; margin-bottom: 15px;">
        このテストは、DeFi・NFT入門カテゴリの全35レッスンで学習した内容の理解度を包括的に確認するものです。
        分散型金融（DeFi）の基礎からNFT、Web3.0アプリケーションまで、次世代ブロックチェーン技術の実践的知識を測定します。
      </p>
    </div>

    <div style="background: linear-gradient(145deg, #f3f4f6, #e5e7eb); padding: 25px; border-radius: 15px; margin: 25px 0; border-left: 5px solid #667eea;">
      <h3 style="color: #1f2937; margin-bottom: 20px;">📊 テスト概要</h3>
      
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 20px;">
        <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h4 style="color: #667eea; margin-bottom: 10px;">📋 問題数・形式</h4>
          <p style="font-size: 14px; color: #4b5563; margin-bottom: 8px;"><strong>総問題数：</strong>25問</p>
          <p style="font-size: 14px; color: #4b5563; margin-bottom: 8px;"><strong>出題形式：</strong>選択式・シナリオ問題・実践応用</p>
          <p style="font-size: 14px; color: #4b5563;"><strong>制限時間：</strong>40分</p>
        </div>
        <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h4 style="color: #10b981; margin-bottom: 10px;">🎯 合格基準</h4>
          <p style="font-size: 14px; color: #4b5563; margin-bottom: 8px;"><strong>合格点：</strong>85%以上（22問正解）</p>
          <p style="font-size: 14px; color: #4b5563; margin-bottom: 8px;"><strong>修了証：</strong>合格者に発行</p>
          <p style="font-size: 14px; color: #4b5563;"><strong>再受験：</strong>何度でも可能</p>
        </div>
      </div>
    </div>

    <div style="background: #ffffff; padding: 25px; border-radius: 15px; border: 2px solid #e5e7eb; margin: 25px 0;">
      <h3 style="color: #1f2937; margin-bottom: 20px;">📚 出題範囲</h3>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
        <div style="background: #f0fdf4; padding: 15px; border-radius: 8px;">
          <h5 style="color: #166534; margin-bottom: 8px;">DeFi基礎（35%）</h5>
          <p style="font-size: 12px; color: #6b7280;">AMM、流動性、レンディング、DEX</p>
        </div>
        <div style="background: #fef3ff; padding: 15px; border-radius: 8px;">
          <h5 style="color: #7c2d92; margin-bottom: 8px;">NFT応用（30%）</h5>
          <p style="font-size: 12px; color: #6b7280;">所有権、メタデータ、マーケットプレイス</p>
        </div>
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px;">
          <h5 style="color: #1e40af; margin-bottom: 8px;">Web3・GameFi（25%）</h5>
          <p style="font-size: 12px; color: #6b7280;">P2E、メタバース、DAO</p>
        </div>
        <div style="background: #fef7ed; padding: 15px; border-radius: 8px;">
          <h5 style="color: #9a3412; margin-bottom: 8px;">実践応用（10%）</h5>
          <p style="font-size: 12px; color: #6b7280;">投資戦略、リスク管理</p>
        </div>
      </div>
    </div>

    <div style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); padding: 20px; border-radius: 15px; margin: 20px 0;">
      <h3 style="color: #8b4513; margin-bottom: 15px;">⚠️ 受験前の注意事項</h3>
      <ul style="color: #8b4513; padding-left: 20px; margin: 0;">
        <li style="margin-bottom: 8px;">全35レッスンの学習完了を推奨します</li>
        <li style="margin-bottom: 8px;">DeFi・NFTの基本概念理解を前提とします</li>
        <li style="margin-bottom: 8px;">実際の投資助言ではありません</li>
        <li style="margin-bottom: 8px;">結果は即時表示され、詳細な解説が提供されます</li>
        <li>不合格の場合は弱点分野のレッスン復習を推奨します</li>
      </ul>
    </div>
  `,

  questions: [
    {
      id: 'defi-nft-test-q1',
      type: 'multiple_choice',
      difficulty: 'basic',
      category: 'NFT基礎',
      question: 'NFTの最も根本的な価値提案は何ですか？',
      options: [
        '高い投資収益率の提供',
        'デジタル資産の所有権と真正性の証明',
        '取引手数料の削減',
        'より速い決済システム'
      ],
      correctAnswer: 1,
      explanation: 'NFT（Non-Fungible Token）の核心的価値は、デジタル世界における唯一性と所有権の確立です。投資収益や技術的優位性は副次的効果であり、デジタル所有権の革新がNFTの本質的価値となります。',
      points: 1
    },
    {
      id: 'defi-nft-test-q2',
      type: 'multiple_choice',
      difficulty: 'basic',
      category: 'DeFi基礎',
      question: 'DeFi（分散型金融）が従来の金融システムに対して持つ最大の優位性は？',
      options: [
        '必ず高い利回りが得られる',
        '中央管理者なしでの透明で検閲耐性のある金融サービス',
        '取引コストが常に安い',
        'より簡単な操作方法'
      ],
      correctAnswer: 1,
      explanation: 'DeFiの革新的価値は、信頼できる第三者を必要としない金融システムの実現です。分散化、透明性、検閲耐性、許可不要アクセス、プログラマビリティが核心的価値となります。',
      points: 1
    },
    {
      id: 'defi-nft-test-q3',
      type: 'multiple_choice',
      difficulty: 'basic',
      category: 'NFT基礎',
      question: 'NFTマーケットプレイスで「Floor Price」が重要な理由は？',
      options: [
        '最高値での売却を保証する',
        'コレクションの最低価格水準と流動性を示す指標',
        '政府が定めた公正価格',
        'NFT作成者の希望価格'
      ],
      correctAnswer: 1,
      explanation: 'Floor Priceは、NFTコレクションの市場価値と健全性を判断する重要指標です。コレクションへの最低投資額、需給状況、売買活発さ、価格動向を示します。',
      points: 1
    },
    {
      id: 'defi-nft-test-q4',
      type: 'multiple_choice',
      difficulty: 'intermediate',
      category: 'DeFi基礎',
      question: 'Uniswap等のAMM（Automated Market Maker）の「Impermanent Loss」が発生する主な原因は？',
      options: [
        'ガス代の変動',
        '流動性プールの資産価格比率変化',
        'トランザクションの失敗',
        'プラットフォーム手数料'
      ],
      correctAnswer: 1,
      explanation: 'Impermanent Lossは、AMM特有の価格変動による機会損失です。プール内資産の相対価格変化により、アービトラージが発生し、単純保有との収益差が生まれます。',
      points: 2
    },
    {
      id: 'defi-nft-test-q5',
      type: 'multiple_choice',
      difficulty: 'intermediate',
      category: 'NFT基礎',
      question: 'NFTの「Utility」として最も持続可能性が高いのは？',
      options: [
        '一度きりのイベント参加権',
        '継続的な価値提供とコミュニティ運営',
        '高額転売の保証',
        '政府認定の価値保証'
      ],
      correctAnswer: 1,
      explanation: '持続可能なNFT Utilityは、長期的な価値創造に基づく必要があります。時代に合わせた特典進化、活発なコミュニティ活動、現実世界での価値提供が重要です。',
      points: 2
    },
    {
      id: 'defi-nft-test-q6',
      type: 'multiple_choice',
      difficulty: 'basic',
      category: 'DeFi基礎',
      question: 'DeFiプロトコルの「TVL（Total Value Locked）」から読み取れる最も重要な情報は？',
      options: [
        'プロトコルの利益率',
        'プロトコルへの信頼度と資金規模',
        'トークンの価格',
        '開発チームの技術力'
      ],
      correctAnswer: 1,
      explanation: 'TVLは、DeFiプロトコルの市場での地位と信頼性を示す重要指標です。ユーザーの信頼度、市場での競争地位、流動性の厚さ、手数料収入の基盤を示します。',
      points: 1
    },
    {
      id: 'defi-nft-test-q7',
      type: 'multiple_choice',
      difficulty: 'intermediate',
      category: 'Web3・GameFi',
      question: 'Play-to-Earnゲームの持続可能性で最も重要な要素は？',
      options: [
        '高額な初期報酬',
        'ゲームの楽しさと健全な経済設計の両立',
        '著名人の推薦',
        '最新の技術使用'
      ],
      correctAnswer: 1,
      explanation: '持続可能なP2Eには、内在価値に基づく設計が必要です。報酬以外でも楽しめるゲーム性、トークンの需給バランス、実際の価値生成、長期参加への動機が重要です。',
      points: 2
    },
    {
      id: 'defi-nft-test-q8',
      type: 'multiple_choice',
      difficulty: 'advanced',
      category: 'DeFi応用',
      question: 'DeFiにおける「Flash Loan」の最も革新的な点は？',
      options: [
        '金利が安いこと',
        '1つのトランザクション内で借入・返済が完結すること',
        '借入限度額が高いこと',
        '申込手続きが簡単なこと'
      ],
      correctAnswer: 1,
      explanation: 'Flash Loanは、同一トランザクション内完結という革新的概念です。担保不要、原子的実行、瞬間決済、資本効率の最大化を実現し、アービトラージ等の新しい金融戦略を可能にしました。',
      points: 3
    },
    {
      id: 'defi-nft-test-q9',
      type: 'multiple_choice',
      difficulty: 'intermediate',
      category: 'NFT応用',
      question: 'NFTの「Royalty（ロイヤリティ）」システムの現在の最大の課題は？',
      options: [
        'ロイヤリティ率が低すぎること',
        '技術的強制力がなく、マーケットプレイス依存であること',
        'ロイヤリティ率が高すぎること',
        '計算方法が複雑すぎること'
      ],
      correctAnswer: 1,
      explanation: 'NFTロイヤリティは技術標準化の欠如により実効性に課題があります。ブロックチェーンレベルでの強制力がなく、各マーケットプレイスの任意実装に依存しているため、技術的回避が容易な状況です。',
      points: 2
    },
    {
      id: 'defi-nft-test-q10',
      type: 'multiple_choice',
      difficulty: 'intermediate',
      category: 'DeFi応用',
      question: 'DeFiプロトコルの「Governance」で最も重要な原則は？',
      options: [
        '開発チームが全決定権を持つ',
        'トークン保有者による分散的意思決定',
        '政府機関による監督',
        '最大投資家による管理'
      ],
      correctAnswer: 1,
      explanation: 'DeFi Governanceの核心は、コミュニティによる分散的統治です。トークン保有量に応じた投票権、透明な意思決定プロセス、ステークホルダー全員の参加が民主的ガバナンスを実現します。',
      points: 2
    },
    {
      id: 'defi-nft-test-q11',
      type: 'multiple_choice',
      difficulty: 'intermediate',
      category: '実践応用',
      question: 'NFT投資における「DYOR（Do Your Own Research）」で最も重要な調査項目は？',
      options: [
        'NFTの見た目の美しさ',
        'プロジェクトチーム、技術、コミュニティの総合評価',
        'SNSでの話題性',
        '有名人の推薦'
      ],
      correctAnswer: 1,
      explanation: '包括的なDYORはファンダメンタル分析に基づく必要があります。開発チームの経歴・実績、技術的優位性、コミュニティの質、実用性・将来計画、トークン経済学の健全性を評価することが重要です。',
      points: 2
    },
    {
      id: 'defi-nft-test-q12',
      type: 'multiple_choice',
      difficulty: 'advanced',
      category: 'NFT応用',
      question: 'Cross-Chain NFTの最も困難な技術的課題は？',
      options: [
        '取引速度の向上',
        '異なるブロックチェーン間でのメタデータ整合性確保',
        'ガス代の削減',
        'ユーザーインターフェースの統一'
      ],
      correctAnswer: 1,
      explanation: 'Cross-Chain NFTではデータ一貫性が最重要課題です。メタデータの同期、状態管理の統一、所有権の検証、変更の伝播など、複数チェーン間でのNFT状態管理には複雑なメタデータ構造の整合性維持が必要です。',
      points: 3
    },
    {
      id: 'defi-nft-test-q13',
      type: 'multiple_choice',
      difficulty: 'intermediate',
      category: 'DeFi応用',
      question: 'DeFi Yield Farmingの最適戦略で最も重要でない要素は？',
      options: [
        'APY（年間収益率）の分析',
        'SNSでの人気度',
        'スマートコントラクトリスクの評価',
        'Impermanent Lossの計算'
      ],
      correctAnswer: 1,
      explanation: '効果的なYield Farmingには定量的・技術的分析が必要です。リスク調整済みリターン、技術的安全性、トークン経済学、流動性リスク評価が重要であり、SNSの人気は感情的判断を引き起こす可能性があります。',
      points: 2
    },
    {
      id: 'defi-nft-test-q14',
      type: 'multiple_choice',
      difficulty: 'advanced',
      category: 'NFT応用',
      question: 'NFT市場における「Wash Trading」の見分け方として最も効果的なのは？',
      options: [
        '価格の急上昇',
        '同一ウォレット間での繰り返し取引パターン',
        'コレクションの人気度',
        'メディア露出の多さ'
      ],
      correctAnswer: 1,
      explanation: 'Wash Tradingは人為的な取引量操作であり、パターン分析で検出可能です。取引パターンの分析、ウォレット関連性の調査、不自然な取引タイミング、不合理な価格設定など、オンチェーンデータ分析で健全な取引と操作を区別できます。',
      points: 3
    },
    {
      id: 'defi-nft-test-q15',
      type: 'multiple_choice',
      difficulty: 'intermediate',
      category: 'Web3・GameFi',
      question: 'メタバースにおけるVirtual Real Estate NFTの価値決定で最も重要な要因は？',
      options: [
        '土地の見た目',
        '立地・トラフィック・開発可能性',
        '購入価格',
        '所有者の知名度'
      ],
      correctAnswer: 1,
      explanation: 'Virtual Real Estateの価値は現実不動産の価値要因と類似しています。中心地・人気エリア近接、訪問者数・利用頻度、建築・収益化可能性、周辺環境・インフラが重要で、「Location, Location, Location」の原則が適用されます。',
      points: 2
    },
    {
      id: 'q16',
      question: 'DeFi・NFT分野の長期的発展で最も重要な要素は？',
      options: [
        '価格の継続的上昇',
        '実用価値と社会的価値の創造',
        '投機的取引の拡大',
        '政府による価格保証'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：実用価値と社会的価値の創造</strong></p><p><strong>持続可能な発展</strong>には、<strong>投機を超えた本質的価値</strong>が必要です。</p><p><strong>長期価値の要素：</strong></p><ul><li><strong>Real-world Utility</strong>：現実世界での実用性</li><li><strong>Social Impact</strong>：社会問題解決への貢献</li><li><strong>Economic Value Creation</strong>：新しい経済価値の創出</li><li><strong>Technology Innovation</strong>：革新的技術の発展</li><li><strong>Adoption & Integration</strong>：既存システムとの統合</li></ul><p>単純な価格上昇や投機に依存したモデルは持続不可能であり、<strong>実用性と社会価値に基づくエコシステム</strong>の構築が重要です。</p>'
    },
    {
      id: 'q17',
      question: 'AI生成NFTにおける「Provenance」証明の最大の課題は？',
      options: [
        '生成速度',
        'AIモデルと生成プロセスの透明性確保',
        '画像品質',
        '生成コスト'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：AIモデルと生成プロセスの透明性確保</strong></p><p><strong>AI生成NFT</strong>では、<strong>創作の真正性</strong>と<strong>透明性</strong>が重要課題です。</p><p><strong>Provenance課題：</strong></p><ul><li><strong>Model Transparency</strong>：使用AIモデルの開示</li><li><strong>Training Data Ethics</strong>：学習データの適法性</li><li><strong>Generation Process</strong>：生成過程の記録・証明</li><li><strong>Uniqueness Verification</strong>：真の独自性の確認</li></ul><p>技術の発展とともに、<strong>AI生成物の透明性と責任</strong>に関する新しい標準が必要になっています。</p>'
    },
    {
      id: 'q18',
      question: 'GameFiにおける「Token Economy」で最も避けるべき構造は？',
      options: [
        '複数トークンシステム',
        '新規プレイヤー依存のPonzi構造',
        'ステーキング機能',
        'NFTとの組み合わせ'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：新規プレイヤー依存のPonzi構造</strong></p><p><strong>Ponzi構造</strong>は、<strong>新規参加資金で既存報酬を賄う</strong>持続不可能なモデルです。</p><p><strong>危険な構造：</strong></p><ul><li><strong>New Player Dependency</strong>：新規参入金依存</li><li><strong>Unsustainable Rewards</strong>：継続不可能な高報酬</li><li><strong>No Value Creation</strong>：実際の価値創造なし</li><li><strong>Pyramid Structure</strong>：ピラミッド型報酬構造</li></ul><p>健全なGameFi経済は、<strong>ゲーム自体の価値創造</strong>と<strong>外部収益源</strong>に基づく必要があります。</p>'
    },
    {
      id: 'q19',
      question: 'DeFiにおける「MEV（Maximal Extractable Value）」の対策として最も効果的なのは？',
      options: [
        'ガス代の引き上げ',
        'Private Mempoolの利用',
        '取引量の制限',
        '特定時間での取引禁止'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：Private Mempoolの利用</strong></p><p><strong>MEV攻撃</strong>は、<strong>取引の事前可視性</strong>を悪用するため、プライベート実行が効果的対策です。</p><p><strong>MEV対策：</strong></p><ul><li><strong>Private Mempool</strong>：取引の事前隠蔽</li><li><strong>Commit-Reveal Schemes</strong>：2段階実行方式</li><li><strong>MEV-resistant AMMs</strong>：MEV耐性のあるAMM設計</li><li><strong>Flashbots Protect</strong>：MEV保護サービス</li></ul><p>根本的解決には、<strong>取引順序操作の不可能化</strong>または<strong>MEV利益の公平分配</strong>が必要です。</p>'
    },
    {
      id: 'q20',
      question: 'NFT・DeFi分野での「Institutional Adoption」（機関投資家参入）の最大の障害は？',
      options: [
        '技術的複雑性',
        '規制の不確実性とカストディ問題',
        '価格変動',
        'UI/UXの問題'
      ],
      correctAnswer: 1,
      explanation: '機関投資家参入には、規制遵守とリスク管理体制が不可欠です。規制の不確実性とカストディ問題が最大の障害となっており、技術の成熟とともに制度的インフラの整備が機関参入の鍵となります。'
    },
    {
      id: 'defi-nft-test-q21',
      type: 'multiple_choice',
      difficulty: 'intermediate',
      category: 'DeFi応用',
      question: 'Curve Finance等のステーブルコイン特化AMM（StableSwap）の最大の技術的特徴は？',
      options: [
        '完全な固定価格での取引',
        '低スリッページを実現する特殊なボンディングカーブ',
        '無制限のレバレッジ提供',
        '政府による価格保証'
      ],
      correctAnswer: 1,
      explanation: 'StableSwapは、ステーブルコイン間の低スリッページ取引を実現する特殊なボンディングカーブを採用しています。通常のConstant Product Formula（x*y=k）とConstant Sum Formula（x+y=k）を組み合わせ、価格が1:1に近い時は低スリッページ、大きく乖離した時は流動性を確保する設計となっています。',
      points: 2
    },
    {
      id: 'defi-nft-test-q22',
      type: 'scenario',
      difficulty: 'advanced',
      category: '実践応用',
      question: 'あなたが10ETHでUniswap V3のETH/USDC流動性を提供し、価格レンジを3,000-4,000 USDCに設定している場合、ETH価格が2,500 USDCに下落した時の状況は？',
      options: [
        '通常通り手数料を獲得し続ける',
        'ポジションが価格レンジ外となり、手数料獲得停止',
        '自動的に価格レンジが調整される',
        'ETHが自動的に売却される'
      ],
      correctAnswer: 1,
      explanation: 'Uniswap V3では、設定した価格レンジ外に価格が移動すると、流動性提供が停止し手数料獲得もストップします。ETH価格が2,500 USDCと設定レンジ（3,000-4,000 USDC）を下回るため、ポジションは非アクティブ状態となります。価格がレンジ内に戻るまで手数料は発生せず、能動的な管理が必要となります。',
      points: 3
    },
    {
      id: 'defi-nft-test-q23',
      type: 'multiple_choice',
      difficulty: 'advanced',
      category: 'Web3・GameFi',
      question: 'Axie Infinity等のPlay-to-Earnゲームが2022年に大幅な経済モデル調整を行った主な理由は？',
      options: [
        '技術的な不具合',
        '新規プレイヤー流入停止による報酬の持続不可能性',
        'ゲーム内容の飽き',
        '競合ゲームの出現'
      ],
      correctAnswer: 1,
      explanation: 'Axie Infinityの経済モデルは新規プレイヤーの継続的な流入と投資に依存していました。2022年にクリプト市場の冷え込みとともに新規参入が減少し、既存プレイヤーへの報酬支払いが持続不可能となりました。これにより、ゲーム内報酬の大幅削減と経済モデルの根本的見直しが必要となったのです。',
      points: 3
    },
    {
      id: 'defi-nft-test-q24',
      type: 'scenario',
      difficulty: 'advanced',
      category: '実践応用',
      question: '100万円の資金でDeFi投資を行う場合、最もリスク管理された分散戦略は？',
      options: [
        '全額を最も利回りの高いプロトコルに投資',
        '大手プロトコル70%、新興30%の分散、各プロトコル20%上限設定',
        '1つのプロトコルのみに集中投資',
        'すべて同じ金額で10プロトコルに分散'
      ],
      correctAnswer: 1,
      explanation: '効果的なDeFi投資には、①実績のある大手プロトコル（Uniswap、Aave等）への重点配分（70%）、②高収益の新興プロトコルへの限定的投資（30%）、③単一プロトコルリスクを避ける上限設定（20%）が重要です。過度な分散は管理コストを増加させ、集中投資はスマートコントラクトリスクを増大させます。',
      points: 3
    },
    {
      id: 'defi-nft-test-q25',
      type: 'multiple_choice',
      difficulty: 'advanced',
      category: '将来展望',
      question: 'DeFi・NFT分野の次の重要な技術革新として最も期待されているのは？',
      options: [
        '取引速度の向上のみ',
        'クロスチェーン相互運用性とZero-Knowledge技術の統合',
        '中央集権的管理への回帰',
        '従来の金融システムとの完全分離'
      ],
      correctAnswer: 1,
      explanation: '次世代DeFi・NFTの革新は、①クロスチェーン相互運用性（異なるブロックチェーン間のシームレスな連携）、②Zero-Knowledge技術（プライバシー保護と拡張性の両立）、③これらの統合による新しいユーザー体験の実現です。単一の改善ではなく、技術の融合により従来の限界を突破することが期待されています。',
      points: 3
    }
  ],

  resultAnalysis: {
    excellent: {
      threshold: 95,
      title: '🏆 DeFi・NFTエキスパート',
      message: `
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 20px; color: white; text-align: center;">
          <h2 style="color: white; margin-bottom: 20px;">🎉 おめでとうございます！</h2>
          <p style="font-size: 18px; line-height: 1.8;">
            あなたはDeFi・NFT分野において卓越した理解力を示しました。
            実際のプロトコル運用や投資実践への準備が整っています。
          </p>
        </div>
      `,
      recommendations: [
        '実際のDeFiプロトコルでの小額投資実践',
        '新興プロトコルの早期参加とリスク評価',
        'NFTプロジェクトの将来性評価スキル向上',
        'Web3分野での専門性をさらに深化'
      ]
    },
    good: {
      threshold: 85,
      title: '✅ DeFi・NFT基礎マスター',
      message: `
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 30px; border-radius: 20px; color: white; text-align: center;">
          <h2 style="color: white; margin-bottom: 20px;">🎊 合格おめでとうございます！</h2>
          <p style="font-size: 18px; line-height: 1.8;">
            DeFi・NFTの基礎知識をしっかりと理解されています。
            実践的な応用に向けて、さらなるスキル向上をお勧めします。
          </p>
        </div>
      `,
      recommendations: [
        '間違えた分野のレッスンを復習',
        'テストネットでのDeFi操作練習',
        'NFTマーケットプレイスの体験学習',
        '最新のプロトコル動向の継続学習'
      ]
    },
    needs_improvement: {
      threshold: 70,
      title: '📚 継続学習推奨',
      message: `
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; border-radius: 20px; color: white; text-align: center;">
          <h2 style="color: white; margin-bottom: 20px;">📈 学習継続を推奨</h2>
          <p style="font-size: 18px; line-height: 1.8;">
            基本的な理解はありますが、より確実な知識の定着が必要です。
            DeFi・NFTの実践的理解を深めましょう。
          </p>
        </div>
      `,
      recommendations: [
        'DeFi・NFT基礎レッスンの再受講',
        '間違えた問題の詳細な解説確認',
        '用語集での基本概念の確認',
        'シミュレーターでの操作練習'
      ]
    },
    insufficient: {
      threshold: 0,
      title: '🔄 基礎からの再学習',
      message: `
        <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 30px; border-radius: 20px; color: white; text-align: center;">
          <h2 style="color: white; margin-bottom: 20px;">📖 基礎学習から開始</h2>
          <p style="font-size: 18px; line-height: 1.8;">
            DeFi・NFTの基礎から学習を始めることをお勧めします。
            焦らず、着実に知識を積み上げていきましょう。
          </p>
        </div>
      `,
      recommendations: [
        'レッスン1から順次受講',
        '各レッスンのクイズで理解度確認',
        'DeFi・NFT用語の確実な理解',
        '基礎概念の反復学習'
      ]
    }
  },

  certificate: {
    title: 'DeFi・NFT入門修了証明書',
    description: 'この証明書は、包括的なDeFi・NFT教育プログラムを修了し、分散型金融とNFTの実践的知識を習得したことを証明するものです。',
    skills: [
      '分散型金融（DeFi）の基本概念と仕組み',
      'NFTの技術的特徴と活用方法',
      'AMM、流動性提供、レンディングの理解',
      'Web3.0とGameFiの基礎知識',
      'リスク管理と投資戦略の基本'
    ]
  },

  lastUpdated: '2025-08-20',
  factChecked: true
}