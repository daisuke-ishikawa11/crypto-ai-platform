import { Test } from '../../types'

export const categoryTest: Test = {
  id: 'defi-nft-category-test',
  categoryId: 'defi-nft',
  title: 'DeFi・NFT総合テスト',
  description: 'DeFi・NFTカテゴリ全35レッスンの包括的な理解度を確認する総合テストです',
  questions: [
    {
      id: 'q1',
      question: 'NFTの最も根本的な価値提案は何ですか？',
      options: [
        '高い投資収益率の提供',
        'デジタル資産の所有権と真正性の証明',
        '取引手数料の削減',
        'より速い決済システム'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：デジタル資産の所有権と真正性の証明</strong></p><p>NFT（Non-Fungible Token）の<strong>核心的価値</strong>は、デジタル世界における<strong>唯一性と所有権の確立</strong>です。</p><p><strong>根本的価値：</strong></p><ul><li><strong>Digital Scarcity</strong>：デジタル世界での希少性創出</li><li><strong>Provenance</strong>：作品の来歴・真正性証明</li><li><strong>Ownership Rights</strong>：明確な所有権の記録</li><li><strong>Transferability</strong>：所有権の安全な移転</li></ul><p>投資収益や技術的優位性は副次的効果であり、<strong>デジタル所有権の革新</strong>がNFTの本質的価値です。</p>'
    },
    {
      id: 'q2',
      question: 'DeFi（分散型金融）が従来の金融システムに対して持つ最大の優位性は？',
      options: [
        '必ず高い利回りが得られる',
        '中央管理者なしでの透明で検閲耐性のある金融サービス',
        '取引コストが常に安い',
        'より簡単な操作方法'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：中央管理者なしでの透明で検閲耐性のある金融サービス</strong></p><p>DeFiの<strong>革新的価値</strong>は、<strong>信頼できる第三者を必要としない</strong>金融システムの実現です。</p><p><strong>DeFiの優位性：</strong></p><ul><li><strong>Decentralization</strong>：中央集権的統制の排除</li><li><strong>Transparency</strong>：すべての取引が公開・検証可能</li><li><strong>Censorship Resistance</strong>：第三者による取引停止ができない</li><li><strong>Permissionless</strong>：許可不要でのアクセス</li><li><strong>Programmability</strong>：スマートコントラクトによる自動化</li></ul><p>高利回りやコストは市況により変動し、操作の複雑さも存在しますが、<strong>分散化による自由と透明性</strong>が最大の価値です。</p>'
    },
    {
      id: 'q3',
      question: 'NFTマーケットプレイスで「Floor Price」が重要な理由は？',
      options: [
        '最高値での売却を保証する',
        'コレクションの最低価格水準と流動性を示す指標',
        '政府が定めた公正価格',
        'NFT作成者の希望価格'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：コレクションの最低価格水準と流動性を示す指標</strong></p><p><strong>Floor Price</strong>は、NFTコレクションの<strong>市場価値と健全性</strong>を判断する重要指標です。</p><p><strong>Floor Priceの意味：</strong></p><ul><li><strong>Entry Point</strong>：そのコレクションへの最低投資額</li><li><strong>Market Health</strong>：コレクションの需給状況</li><li><strong>Liquidity Indicator</strong>：売買の活発さ</li><li><strong>Trend Analysis</strong>：価格動向の把握</li></ul><p>Floor Priceの動向により、コミュニティの強さ、将来性、投資リスク等を評価できます。</p>'
    },
    {
      id: 'q4',
      question: 'Uniswap等のAMM（Automated Market Maker）の「Impermanent Loss」が発生する主な原因は？',
      options: [
        'ガス代の変動',
        '流動性プールの資産価格比率変化',
        'トランザクションの失敗',
        'プラットフォーム手数料'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：流動性プールの資産価格比率変化</strong></p><p><strong>Impermanent Loss</strong>は、AMM特有の<strong>価格変動による機会損失</strong>です。</p><p><strong>発生メカニズム：</strong></p><ul><li><strong>価格変動</strong>：プール内資産の相対価格変化</li><li><strong>アービトラージ</strong>：価格調整による資産比率変化</li><li><strong>保有量変化</strong>：単純保有との収益差</li></ul><p><strong>例：</strong>ETH/USDCプールで、ETH価格上昇時にETH保有量が減少し、単純ETH保有より収益が少なくなる現象です。手数料収入がこの損失を補填することもあります。</p>'
    },
    {
      id: 'q5',
      question: 'NFTの「Utility」として最も持続可能性が高いのは？',
      options: [
        '一度きりのイベント参加権',
        '継続的な価値提供とコミュニティ運営',
        '高額転売の保証',
        '政府認定の価値保証'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：継続的な価値提供とコミュニティ運営</strong></p><p><strong>持続可能なNFT Utility</strong>は、<strong>長期的な価値創造</strong>に基づく必要があります。</p><p><strong>持続的Utilityの要素：</strong></p><ul><li><strong>Evolving Benefits</strong>：時代に合わせた特典進化</li><li><strong>Community Engagement</strong>：活発なコミュニティ活動</li><li><strong>Real-world Value</strong>：現実世界での価値提供</li><li><strong>Network Effects</strong>：参加者増加による価値向上</li></ul><p>一時的特典や価格保証は持続不可能であり、<strong>継続的な価値創造とコミュニティ運営</strong>が長期成功の鍵です。</p>'
    },
    {
      id: 'q6',
      question: 'DeFiプロトコルの「TVL（Total Value Locked）」から読み取れる最も重要な情報は？',
      options: [
        'プロトコルの利益率',
        'プロトコルへの信頼度と資金規模',
        'トークンの価格',
        '開発チームの技術力'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：プロトコルへの信頼度と資金規模</strong></p><p><strong>TVL</strong>は、DeFiプロトコルの<strong>市場での地位と信頼性</strong>を示す重要指標です。</p><p><strong>TVLが示すもの：</strong></p><ul><li><strong>User Trust</strong>：ユーザーの信頼度</li><li><strong>Market Position</strong>：市場での競争地位</li><li><strong>Liquidity Depth</strong>：流動性の厚さ</li><li><strong>Revenue Potential</strong>：手数料収入の基盤</li></ul><p>高TVLは多くのユーザーが資金を預けている証拠であり、プロトコルの健全性と将来性の指標となります。</p>'
    },
    {
      id: 'q7',
      question: 'Play-to-Earnゲームの持続可能性で最も重要な要素は？',
      options: [
        '高額な初期報酬',
        'ゲームの楽しさと健全な経済設計の両立',
        '著名人の推薦',
        '最新の技術使用'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：ゲームの楽しさと健全な経済設計の両立</strong></p><p><strong>持続可能なP2E</strong>には、<strong>内在価値</strong>に基づく設計が必要です。</p><p><strong>持続性の要素：</strong></p><ul><li><strong>Intrinsic Fun</strong>：報酬以外でも楽しめるゲーム性</li><li><strong>Balanced Economy</strong>：トークンの需給バランス</li><li><strong>Value Creation</strong>：ゲーム活動による実際の価値生成</li><li><strong>Long-term Incentives</strong>：長期参加への動機</li></ul><p>高報酬のみに依存したモデルは新規参入停止で崩壊し、<strong>楽しさと経済の両立</strong>が成功の鍵です。</p>'
    },
    {
      id: 'q8',
      question: 'DeFiにおける「Flash Loan」の最も革新的な点は？',
      options: [
        '金利が安いこと',
        '1つのトランザクション内で借入・返済が完結すること',
        '借入限度額が高いこと',
        '申込手続きが簡単なこと'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：1つのトランザクション内で借入・返済が完結すること</strong></p><p><strong>Flash Loan</strong>は、<strong>同一トランザクション内完結</strong>という革新的概念です。</p><p><strong>革新性：</strong></p><ul><li><strong>Uncollateralized</strong>：担保不要（返済保証のため）</li><li><strong>Atomic Execution</strong>：原子的実行（全部成功or失敗）</li><li><strong>Instant Settlement</strong>：瞬間決済</li><li><strong>Capital Efficiency</strong>：資本効率の最大化</li></ul><p>従来不可能だった大額無担保借入を可能にし、アービトラージ、清算、refinancing等の新しい金融戦略を実現しました。</p>'
    },
    {
      id: 'q9',
      question: 'NFTの「Royalty（ロイヤリティ）」システムの現在の最大の課題は？',
      options: [
        'ロイヤリティ率が低すぎること',
        '技術的強制力がなく、マーケットプレイス依存であること',
        'ロイヤリティ率が高すぎること',
        '計算方法が複雑すぎること'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：技術的強制力がなく、マーケットプレイス依存であること</strong></p><p><strong>NFTロイヤリティ</strong>は、<strong>技術標準化の欠如</strong>により実効性に課題があります。</p><p><strong>現在の問題：</strong></p><ul><li><strong>No Technical Enforcement</strong>：ブロックチェーンレベルでの強制不可</li><li><strong>Marketplace Dependent</strong>：各プラットフォームの任意実装</li><li><strong>Easy Circumvention</strong>：技術的回避が容易</li><li><strong>Inconsistent Implementation</strong>：統一されていない実装</li></ul><p>OpenSeaの段階的廃止等により、クリエイター収益確保の新しいモデル構築が課題となっています。</p>'
    },
    {
      id: 'q10',
      question: 'DeFiプロトコルの「Governance」で最も重要な原則は？',
      options: [
        '開発チームが全決定権を持つ',
        'トークン保有者による分散的意思決定',
        '政府機関による監督',
        '最大投資家による管理'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：トークン保有者による分散的意思決定</strong></p><p><strong>DeFi Governance</strong>の核心は、<strong>コミュニティによる分散的統治</strong>です。</p><p><strong>Governance原則：</strong></p><ul><li><strong>Decentralized Decision Making</strong>：分散的意思決定</li><li><strong>Token-based Voting</strong>：トークン保有量に応じた投票権</li><li><strong>Transparent Process</strong>：透明な意思決定プロセス</li><li><strong>Community Participation</strong>：コミュニティの積極参加</li></ul><p>中央集権的統制を排除し、ステークホルダー全員が参加できる<strong>民主的ガバナンス</strong>がDeFiの価値提案です。</p>'
    },
    {
      id: 'q11',
      question: 'NFT投資における「DYOR（Do Your Own Research）」で最も重要な調査項目は？',
      options: [
        'NFTの見た目の美しさ',
        'プロジェクトチーム、技術、コミュニティの総合評価',
        'SNSでの話題性',
        '有名人の推薦'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：プロジェクトチーム、技術、コミュニティの総合評価</strong></p><p><strong>包括的なDYOR</strong>は、<strong>ファンダメンタル分析</strong>に基づく必要があります。</p><p><strong>重要調査項目：</strong></p><ul><li><strong>Team Background</strong>：開発チームの経歴・実績</li><li><strong>Technology Innovation</strong>：技術的優位性・独自性</li><li><strong>Community Health</strong>：コミュニティの質・活動度</li><li><strong>Utility & Roadmap</strong>：実用性・将来計画</li><li><strong>Tokenomics</strong>：トークン経済学の健全性</li></ul><p>見た目や一時的な話題性ではなく、<strong>長期的価値の源泉</strong>を評価することが重要です。</p>'
    },
    {
      id: 'q12',
      question: 'Cross-Chain NFTの最も困難な技術的課題は？',
      options: [
        '取引速度の向上',
        '異なるブロックチェーン間でのメタデータ整合性確保',
        'ガス代の削減',
        'ユーザーインターフェースの統一'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：異なるブロックチェーン間でのメタデータ整合性確保</strong></p><p><strong>Cross-Chain NFT</strong>では、<strong>データ一貫性</strong>が最重要課題です。</p><p><strong>技術的課題：</strong></p><ul><li><strong>Metadata Synchronization</strong>：メタデータの同期</li><li><strong>State Management</strong>：状態管理の統一</li><li><strong>Ownership Verification</strong>：所有権の検証</li><li><strong>Update Propagation</strong>：変更の伝播</li></ul><p>複数チェーン間でのNFT状態管理は、単純な価格データと異なり、複雑なメタデータ構造の整合性維持が必要です。</p>'
    },
    {
      id: 'q13',
      question: 'DeFi Yield Farmingの最適戦略で最も重要でない要素は？',
      options: [
        'APY（年間収益率）の分析',
        'SNSでの人気度',
        'スマートコントラクトリスクの評価',
        'Impermanent Lossの計算'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：SNSでの人気度</strong></p><p><strong>効果的なYield Farming</strong>には、<strong>定量的・技術的分析</strong>が必要です。</p><p><strong>重要な分析要素：</strong></p><ul><li><strong>Risk-Adjusted Returns</strong>：リスク調整済みリターン</li><li><strong>Smart Contract Security</strong>：技術的安全性</li><li><strong>Tokenomics Analysis</strong>：トークン経済学</li><li><strong>Liquidity Analysis</strong>：流動性リスク評価</li></ul><p>SNSの人気は感情的判断を引き起こし、適切なリスク評価を阻害する可能性があります。<strong>データ駆動</strong>のアプローチが重要です。</p>'
    },
    {
      id: 'q14',
      question: 'NFT市場における「Wash Trading」の見分け方として最も効果的なのは？',
      options: [
        '価格の急上昇',
        '同一ウォレット間での繰り返し取引パターン',
        'コレクションの人気度',
        'メディア露出の多さ'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：同一ウォレット間での繰り返し取引パターン</strong></p><p><strong>Wash Trading</strong>は、<strong>人為的な取引量操作</strong>であり、パターン分析で検出可能です。</p><p><strong>検出方法：</strong></p><ul><li><strong>Transaction Pattern Analysis</strong>：取引パターンの分析</li><li><strong>Wallet Relationship Mapping</strong>：ウォレット関連性の調査</li><li><strong>Timing Analysis</strong>：不自然な取引タイミング</li><li><strong>Price Rationality</strong>：不合理な価格設定</li></ul><p>オンチェーンデータの分析により、健全な取引と人為的操作を区別することが可能です。</p>'
    },
    {
      id: 'q15',
      question: 'メタバースにおけるVirtual Real Estate NFTの価値決定で最も重要な要因は？',
      options: [
        '土地の見た目',
        '立地・トラフィック・開発可能性',
        '購入価格',
        '所有者の知名度'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：立地・トラフィック・開発可能性</strong></p><p><strong>Virtual Real Estate</strong>の価値は、<strong>現実不動産の価値要因</strong>と類似しています。</p><p><strong>価値決定要因：</strong></p><ul><li><strong>Location Premium</strong>：中心地・人気エリア近接</li><li><strong>Traffic Volume</strong>：訪問者数・利用頻度</li><li><strong>Development Potential</strong>：建築・収益化可能性</li><li><strong>Network Effects</strong>：周辺環境・インフラ</li></ul><p>メタバースにおいても「Location, Location, Location」の不動産原則が適用され、<strong>実用性と収益性</strong>が価値の源泉です。</p>'
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
      explanation: '<p><strong>正解：規制の不確実性とカストディ問題</strong></p><p><strong>機関投資家参入</strong>には、<strong>規制遵守とリスク管理</strong>体制が不可欠です。</p><p><strong>参入障害：</strong></p><ul><li><strong>Regulatory Uncertainty</strong>：法的地位の不明確</li><li><strong>Custody Solutions</strong>：企業グレードの資産管理</li><li><strong>Compliance Requirements</strong>：コンプライアンス要件</li><li><strong>Risk Management</strong>：機関投資家レベルのリスク管理</li><li><strong>Audit & Reporting</strong>：監査・報告体制</li></ul><p>技術の成熟とともに、<strong>制度的インフラ</strong>の整備が機関参入の鍵となります。</p>'
    }
  ]
}