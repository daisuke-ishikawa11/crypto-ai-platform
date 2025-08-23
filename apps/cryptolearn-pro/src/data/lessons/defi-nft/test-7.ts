import { CategoryTest } from '@/lib/types/learning'

export const defiNftTest7: CategoryTest = {
  id: 'defi-nft-test-7',
  categoryId: 'defi-nft',
  title: 'DeFiポートフォリオ管理・規制・未来展望：確認テスト7（レッスン31-35）',
  description: 'ラグプル・詐欺検出、DeFiポートフォリオ管理、税務処理、規制環境、DeFi・NFTの未来展望に関する理解度を確認します',
  difficulty: 'advanced',
  category: 'defi-nft',
  lessonRange: 'lesson-31-35',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'defi-nft-test-7-q1',
      question: 'ラグプル詐欺の最も一般的な識別方法は？',
      options: [
        '高い利回りを約束するプロジェクトを避ける',
        'コントラクトのコード監査と流動性ロック確認',
        '有名人の推奨のみに依存',
        '価格の動きのみで判断'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：コントラクトのコード監査と流動性ロック確認</strong></p><p><strong>ラグプル詐欺</strong>は、開発者が投資者資金を<strong>一方的に引き出す</strong>悪質な詐欺手法です。</p><p><strong>コード監査の重要ポイント：</strong></p><ul><li><strong>所有者権限</strong>：管理者が単独で資金引き出し可能か</li><li><strong>ミント機能</strong>：無制限のトークン発行機能</li><li><strong>ブラックリスト機能</strong>：特定ユーザーの取引禁止</li><li><strong>タイムロック</strong>：重要変更の事前通知機能</li></ul><p><strong>流動性ロック確認：</strong></p><ul><li><strong>ロック期間</strong>：開発者トークンのロック状況</li><li><strong>ベスティングスケジュール</strong>：段階的リリース計画</li><li><strong>マルチシグ</strong>：複数署名によるコントロール</li><li><strong>DAO統制</strong>：コミュニティ統制の存在</li></ul><p><strong>警告サイン：</strong></p><ul><li>無名の開発チーム</li><li>監査されていないコード</li><li>異常に高いAPY</li><li>プロジェクトの明確なロードマップの欠如</li></ul>'
    },
    {
      id: 'defi-nft-test-7-q2',
      question: 'Dynamic NFT における「Chainlink VRF」の最も重要な用途は？',
      options: [
        'NFTの価格を決定する',
        '予測不可能で検証可能なランダム性を提供する',
        'NFTの転送速度を向上させる',
        'NFTのメタデータを暗号化する'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：予測不可能で検証可能なランダム性を提供する</strong></p><p><strong>Chainlink VRF（Verifiable Random Function）</strong>は、<strong>改ざん耐性のある真のランダム性</strong>を提供します。</p><p><strong>Dynamic NFTでの用途：</strong></p><ul><li><strong>進化システム</strong>：ランダムな進化パス・結果</li><li><strong>属性生成</strong>：予測不可能な特性付与</li><li><strong>ゲーム要素</strong>：戦闘結果・報酬抽選</li><li><strong>繁殖システム</strong>：子NFTの特性決定</li></ul><p><strong>VRFの重要性：</strong></p><ul><li><strong>公平性</strong>：誰も結果を事前予測・操作不可</li><li><strong>透明性</strong>：ランダム性の検証可能</li><li><strong>信頼性</strong>：中央集権的操作の排除</li><li><strong>セキュリティ</strong>：暗号学的に安全</li></ul><p><strong>従来手法の問題：</strong></p><ul><li><strong>Block Hash</strong>：マイナーによる操作可能性</li><li><strong>Timestamp</strong>：予測・操作が容易</li><li><strong>Off-chain Random</strong>：中央集権・信頼依存</li></ul><p><strong>実装例：</strong>CyberKongz Evolution, Wolf Game等で採用</p>'
    },
    {
      id: 'defi-nft-test-7-q3',
      question: 'NFT投資における「Conviction Trading」戦略の核心は？',
      options: [
        '短期間での高頻度取引',
        '深い調査に基づく長期確信投資',
        '他人の投資判断に従う',
        'ランダムな投資判断'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：深い調査に基づく長期確信投資</strong></p><p><strong>Conviction Trading</strong>は、<strong>徹底的な研究による確信</strong>に基づく投資アプローチです。</p><p><strong>Conviction投資の要素：</strong></p><ul><li><strong>Deep Research</strong>：プロジェクト・チーム・技術の詳細分析</li><li><strong>Fundamental Analysis</strong>：長期的価値の評価</li><li><strong>Position Sizing</strong>：確信度に応じた投資額決定</li><li><strong>Long-term Hold</strong>：短期変動に動じない保有</li></ul><p><strong>調査領域：</strong></p><ul><li><strong>Team Background</strong>：開発チームの経歴・実績</li><li><strong>Technology Innovation</strong>：技術的革新性・優位性</li><li><strong>Community Strength</strong>：コミュニティの質・活動</li><li><strong>Utility & Roadmap</strong>：実用性・将来計画</li><li><strong>Competitive Position</strong>：競合優位性</li></ul><p><strong>リスク管理：</strong></p><ul><li><strong>適切な分散</strong>：過度の集中回避</li><li><strong>定期的再評価</strong>：前提条件の変化確認</li><li><strong>損切り基準</strong>：基本的条件変化時の対応</li></ul><p><strong>成功例：</strong>初期CryptoPunks, BAYC投資家等</p>'
    },
    {
      id: 'defi-nft-test-7-q4',
      question: '「NFT Financialization」の最も先進的な発展形態は？',
      options: [
        'NFT担保融資',
        'Synthetic NFT Derivatives（NFT合成デリバティブ）',
        'NFT分割所有',
        'NFTマーケットプレイス'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：Synthetic NFT Derivatives（NFT合成デリバティブ）</strong></p><p><strong>Synthetic NFT Derivatives</strong>は、<strong>NFT価格エクスポージャー</strong>を実NFT保有なしで得る金融商品です。</p><p><strong>合成デリバティブの種類：</strong></p><ul><li><strong>NFT Index Funds</strong>：複数NFTの価格指数</li><li><strong>NFT Options</strong>：NFT購入・売却権</li><li><strong>NFT Futures</strong>：将来のNFT価格で契約</li><li><strong>NFT Swaps</strong>：NFT価格変動の交換</li></ul><p><strong>革新性：</strong></p><ul><li><strong>流動性創出</strong>：非流動的資産の流動的取引</li><li><strong>部分エクスポージャー</strong>：全額投資不要</li><li><strong>ヘッジング</strong>：NFT保有者のリスク管理</li><li><strong>価格発見</strong>：より効率的な価格形成</li><li><strong>アクセシビリティ</strong>：高額NFTへの間接投資</li></ul><p><strong>技術的実装：</strong></p><ul><li><strong>Oracle Integration</strong>：正確な価格データ取得</li><li><strong>AMM Design</strong>：合成資産の流動性確保</li><li><strong>Risk Management</strong>：適切な担保・清算システム</li></ul><p><strong>プラットフォーム：</strong>Synthetix, Mirror Protocol等の応用</p>'
    },
    {
      id: 'defi-nft-test-7-q5',
      question: 'Web3における「Soul Bound Token（SBT）」がNFT市場に与える最大の影響は？',
      options: [
        'NFT価格の上昇',
        '非転売可能な実績・認証システムの確立',
        'NFT取引の高速化',
        'NFT作成コストの削減'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：非転売可能な実績・認証システムの確立</strong></p><p><strong>SBT（Soul Bound Token）</strong>は、<strong>転売不可能なトークン</strong>でデジタル身元・実績を表現します。</p><p><strong>SBTの特徴：</strong></p><ul><li><strong>Non-transferable</strong>：転売・移転不可</li><li><strong>Permanent Binding</strong>：特定ウォレットに永久紐付け</li><li><strong>Verifiable Credentials</strong>：検証可能な資格・実績</li><li><strong>Composable Identity</strong>：複数SBTによるデジタル身元</li></ul><p><strong>NFT市場への影響：</strong></p><ul><li><strong>価値の再定義</strong>：転売価値 → 実用・証明価値</li><li><strong>新市場創出</strong>：認証・資格NFT市場</li><li><strong>投機削減</strong>：純粋な実用価値重視</li><li><strong>長期エンゲージメント</strong>：持続的価値提供</li></ul><p><strong>活用例：</strong></p><ul><li><strong>学歴証明</strong>：卒業証書・資格証明</li><li><strong>職歴証明</strong>：就業経験・スキル認証</li><li><strong>参加証明</strong>：イベント・コミュニティ参加</li><li><strong>実績証明</strong>：ゲーム達成・貢献度</li></ul><p><strong>技術実装：</strong>ERC-5192等の非転送トークン規格</p>'
    },
    {
      id: 'q6',
      question: 'AI生成NFTにおける「Provenance」（来歴）証明の最重要課題は？',
      options: [
        '生成速度の向上',
        'AIモデルと生成プロセスの透明性確保',
        '画像品質の向上',
        '生成コストの削減'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：AIモデルと生成プロセスの透明性確保</strong></p><p><strong>AI生成NFT</strong>では、<strong>創作の真正性</strong>と<strong>生成過程の透明性</strong>が重要課題です。</p><p><strong>Provenance課題：</strong></p><ul><li><strong>オリジナリティ</strong>：本当にユニークな生成物か</li><li><strong>創作者特定</strong>：誰が、どのAIで生成したか</li><li><strong>学習データ</strong>：何を学習源としたか</li><li><strong>生成パラメータ</strong>：どの設定・プロンプトで生成か</li></ul><p><strong>透明性確保の方法：</strong></p><ul><li><strong>Model Hash</strong>：使用AIモデルの暗号学的証明</li><li><strong>Generation Log</strong>：生成パラメータ・プロセスの記録</li><li><strong>Training Data Declaration</strong>：学習データの開示</li><li><strong>Timestamp Proof</strong>：生成時点の証明</li></ul><p><strong>技術的解決策：</strong></p><ul><li><strong>Blockchain Logging</strong>：生成過程のオンチェーン記録</li><li><strong>Zero-Knowledge Proofs</strong>：秘匿性保持した証明</li><li><strong>Decentralized Storage</strong>：IPFS等での永続記録</li><li><strong>Cryptographic Signatures</strong>：デジタル署名による認証</li></ul><p><strong>規制動向：</strong>EU AI Act等でAI生成物の表示義務化が進んでいます。</p>'
    },
    {
      id: 'q7',
      question: 'NFTにおける「Composability」の次世代発展として最も期待される技術は？',
      options: [
        'より高速なブロックチェーン',
        'Cross-Chain NFT Interoperability（クロスチェーンNFT相互運用性）',
        'より安いガス代',
        'より美しいUI/UX'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：Cross-Chain NFT Interoperability（クロスチェーンNFT相互運用性）</strong></p><p><strong>Cross-Chain Interoperability</strong>は、<strong>異なるブロックチェーン間</strong>でのNFT利用を可能にする技術です。</p><p><strong>従来Composabilityの限界：</strong></p><ul><li><strong>単一チェーン</strong>：イーサリアム内でのみ相互作用</li><li><strong>スケーラビリティ</strong>：高ガス代・低速度</li><li><strong>エコシステム分離</strong>：各チェーンが独立</li></ul><p><strong>Cross-Chain Interoperabilityの価値：</strong></p><ul><li><strong>Universal NFTs</strong>：どのチェーンでも利用可能</li><li><strong>Multi-Chain dApps</strong>：最適チェーンの組み合わせ</li><li><strong>Liquidity Aggregation</strong>：全チェーンの流動性統合</li><li><strong>Cost Optimization</strong>：用途に応じたチェーン選択</li></ul><p><strong>技術実装：</strong></p><ul><li><strong>Cross-Chain Bridges</strong>：安全な資産移動</li><li><strong>Multi-Chain Standards</strong>：統一されたNFT規格</li><li><strong>Universal Wallets</strong>：複数チェーン対応</li><li><strong>Inter-Chain Communication</strong>：チェーン間メッセージング</li></ul><p><strong>実現例：</strong>LayerZero, Axelar, Wormhole等のプロトコル</p>'
    },
    {
      id: 'q8',
      question: 'NFT市場における「Institutional Adoption」の最大の障害は？',
      options: [
        '技術的複雑性',
        '規制の不確実性とカストディ問題',
        'NFTの価格変動',
        'ユーザーインターフェースの問題'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：規制の不確実性とカストディ問題</strong></p><p><strong>機関投資家</strong>のNFT参入には、<strong>規制遵守とリスク管理</strong>が最重要課題です。</p><p><strong>規制の不確実性：</strong></p><ul><li><strong>法的地位</strong>：NFTの法的定義・分類不明</li><li><strong>税務処理</strong>：会計処理・税務申告の複雑さ</li><li><strong>コンプライアンス</strong>：金融規制適用範囲の不明確</li><li><strong>国際差異</strong>：国・地域による規制の違い</li></ul><p><strong>カストディ問題：</strong></p><ul><li><strong>秘密鍵管理</strong>：企業レベルのセキュリティ要求</li><li><strong>保険・補償</strong>：資産損失時の保護</li><li><strong>監査要件</strong>：内部統制・監査対応</li><li><strong>Multi-Signature</strong>：複数承認プロセス</li></ul><p><strong>解決への取組み：</strong></p><ul><li><strong>Institutional Custody</strong>：Coinbase Custody, BitGo等</li><li><strong>Regulatory Clarity</strong>：業界団体による働きかけ</li><li><strong>Insurance Products</strong>：NFT専用保険商品</li><li><strong>Professional Services</strong>：会計・法律専門サービス</li></ul><p><strong>進展例：</strong>Sony, Nike, Adidas等の大企業参入</p>'
    },
    {
      id: 'q9',
      question: '次世代NFT技術における「Programmable Royalties」の最も革新的な応用は？',
      options: [
        '固定比率のロイヤリティ',
         '動的・条件付きロイヤリティの自動執行',
        'ロイヤリティの完全廃止',
        '政府によるロイヤリティ規制'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：動的・条件付きロイヤリティの自動執行</strong></p><p><strong>Programmable Royalties</strong>は、<strong>スマートコントラクト</strong>による柔軟で自動的なロイヤリティシステムです。</p><p><strong>動的ロイヤリティの特徴：</strong></p><ul><li><strong>Condition-based</strong>：特定条件での自動変更</li><li><strong>Time-dependent</strong>：時間経過による変化</li><li><strong>Performance-linked</strong>：実績・成果との連動</li><li><strong>Multi-stakeholder</strong>：複数関係者への配分</li></ul><p><strong>革新的応用例：</strong></p><ul><li><strong>Declining Royalties</strong>：時間経過で減少（作品の陳腐化考慮）</li><li><strong>Success Bonuses</strong>：高額売却時のボーナス配分</li><li><strong>Community Rewards</strong>：コミュニティ貢献者への分配</li><li><strong>Charitable Donations</strong>：売上の一部を自動寄付</li><li><strong>Reinvestment Fund</strong>：プロジェクト発展への再投資</li></ul><p><strong>技術実装：</strong></p><ul><li><strong>Smart Contract Logic</strong>：複雑な条件分岐処理</li><li><strong>Oracle Integration</strong>：外部データとの連動</li><li><strong>Multi-token Support</strong>：異なる通貨での支払</li><li><strong>Governance Integration</strong>：コミュニティ投票による変更</li></ul>'
    },
    {
      id: 'q10',
      question: 'メタバース経済における「Virtual Real Estate NFT」の価値決定で最も重要な要素は？',
      options: [
        '土地の見た目の美しさ',
        '立地・トラフィック・開発可能性の組み合わせ',
        '土地の購入価格',
        '所有者の知名度'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：立地・トラフィック・開発可能性の組み合わせ</strong></p><p><strong>Virtual Real Estate</strong>の価値は、<strong>現実不動産の価値決定要因</strong>と類似しています。</p><p><strong>立地の重要性：</strong></p><ul><li><strong>中心地近接</strong>：人気エリア・ハブからの距離</li><li><strong>アクセシビリティ</strong>：交通の便・移動の容易さ</li><li><strong>隣接施設</strong>：商業施設・エンタメ・文化施設</li><li><strong>将来計画</strong>：開発予定・インフラ整備</li></ul><p><strong>トラフィックの価値：</strong></p><ul><li><strong>Daily Active Users</strong>：日々の訪問者数</li><li><strong>Dwell Time</strong>：滞在時間・エンゲージメント</li><li><strong>User Quality</strong>：高価値ユーザーの割合</li><li><strong>Growth Trend</strong>：成長トレンド・季節性</li></ul><p><strong>開発可能性：</strong></p><ul><li><strong>建築制限</strong>：建設可能な構造物・サイズ</li><li><strong>用途制限</strong>：商用・住宅・混合利用</li><li><strong>収益機会</strong>：テナント・広告・イベント収入</li><li><strong>技術対応</strong>：新機能・体験への対応</li></ul><p><strong>成功事例：</strong>The Sandbox, Decentraland での高額取引事例</p>'
    },
    {
      id: 'q11',
      question: '「NFT as a Service（NaaS）」モデルの最も革新的な価値提案は？',
      options: [
        'NFT作成の自動化',
        '従来企業の既存ビジネスへのNFT統合支援',
        'NFT取引の高速化',
        'NFT価格の安定化'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：従来企業の既存ビジネスへのNFT統合支援</strong></p><p><strong>NaaS（NFT as a Service）</strong>は、<strong>伝統的企業</strong>のデジタル変革を支援するソリューションです。</p><p><strong>NaaSの価値提案：</strong></p><ul><li><strong>技術的障壁除去</strong>：複雑なブロックチェーン技術の抽象化</li><li><strong>既存システム統合</strong>：ERPやCRMとの連携</li><li><strong>コンプライアンス対応</strong>：規制要件への適合</li><li><strong>スケーラブル実装</strong>：段階的導入・拡張</li></ul><p><strong>活用シーン：</strong></p><ul><li><strong>Loyalty Programs</strong>：ポイントカードのNFT化</li><li><strong>Digital Certificates</strong>：資格・証明書の発行</li><li><strong>Supply Chain</strong>：製品トレーサビリティ</li><li><strong>Event Ticketing</strong>：チケット偽造防止</li><li><strong>Intellectual Property</strong>：著作権・特許管理</li></ul><p><strong>サービス要素：</strong></p><ul><li><strong>White-label Solutions</strong>：ブランド統合型ツール</li><li><strong>API Integration</strong>：既存システムとの接続</li><li><strong>Custody Services</strong>：企業グレードの資産管理</li><li><strong>Analytics & Reporting</strong>：詳細な分析・報告</li></ul><p><strong>プロバイダー例：</strong>Alchemy, Thirdweb, Moralis等</p>'
    },
    {
      id: 'q12',
      question: 'NFT市場の長期的発展において「Sustainability」（持続可能性）を確保する最も重要な要素は？',
      options: [
        '価格上昇の維持',
        '実用価値と社会的価値の創造',
        '投機的取引の促進',
        '新規参入者の継続的確保'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：実用価値と社会的価値の創造</strong></p><p><strong>持続可能なNFT市場</strong>は、<strong>投機を超えた本質的価値</strong>に基づく必要があります。</p><p><strong>実用価値の創造：</strong></p><ul><li><strong>Functional Utility</strong>：実際に使える機能・権利</li><li><strong>Access Rights</strong>：サービス・コミュニティへのアクセス</li><li><strong>Digital Identity</strong>：デジタル世界での身元証明</li><li><strong>Interoperability</strong>：複数プラットフォーム間での利用</li></ul><p><strong>社会的価値の創造：</strong></p><ul><li><strong>Cultural Impact</strong>：文化・芸術への貢献</li><li><strong>Creator Economy</strong>：クリエイター経済の活性化</li><li><strong>Community Building</strong>：コミュニティ形成・維持</li><li><strong>Social Good</strong>：社会課題解決への寄与</li></ul><p><strong>持続性の指標：</strong></p><ul><li><strong>Usage Rate</strong>：投機以外での実際利用</li><li><strong>Creator Income</strong>：クリエイターの継続的収入</li><li><strong>Community Health</strong>：活発なコミュニティ活動</li><li><strong>Innovation Rate</strong>：新しい用途・技術の開発</li></ul><p><strong>成功モデル：</strong>単純な投機市場から、<strong>実用性に基づくエコシステム</strong>への転換が重要です。</p>'
    }
  ]
}