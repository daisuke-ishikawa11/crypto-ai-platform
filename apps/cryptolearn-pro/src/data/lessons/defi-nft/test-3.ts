import { CategoryTest } from '@/lib/types/learning'

export const defiNftTest3: CategoryTest = {
  id: 'defi-nft-test-3',
  categoryId: 'defi-nft',
  title: 'Compound・Aave・フラッシュローン・DeFi保険：確認テスト3（レッスン11-15）',
  description: 'Compound・Aaveプロトコル、フラッシュローン、ステーキング・ガバナンス、DeFi保険、合成資産に関する理解度を確認します',
  difficulty: 'intermediate',
  category: 'defi-nft',
  lessonRange: 'lesson-11-15',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'defi-nft-test-3-q1',
      question: 'CompoundプロトコルにおけるcTokenの主な機能は？',
      options: [
        '取引手数料の支払い',
        '貸出資産の利息蓄積と預金証明',
        'プロトコルのガバナンス投票',
        '流動性マイニング報酬の配布'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：貸出資産の利息蓄積と預金証明</strong></p><p><strong>cToken</strong>は、Compoundプロトコルにおける<strong>預金証明書トークン</strong>です。</p><p><strong>cTokenの仕組み：</strong></p><ul><li><strong>預金時</strong>：供給資産に対してcTokenを受け取り</li><li><strong>利息蓄積</strong>：時間経過とともにcTokenの価値が増加</li><li><strong>引出時</strong>：cTokenを返却して元本+利息を受取</li><li><strong>流動性</strong>：cToken自体も取引・担保利用可能</li></ul><p><strong>例：</strong></p><ul><li>100 DAI預金 → 100 cDAI受取</li><li>1年後：cDAIの価値が1.05 DAIに上昇</li><li>100 cDAI返却 → 105 DAI受取（5%利息）</li></ul><p><strong>応用：</strong>cTokenは他のDeFiプロトコルで担保としても利用可能です。</p>'
    },
    {
      id: 'defi-nft-test-3-q2',
      question: 'Aaveプロトコルの最大の特徴は？',
      options: [
        '固定金利のみの提供',
        'フラッシュローンと変動・安定金利の選択',
        '中央集権的な資産管理',
        'KYC要求による本人確認'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：フラッシュローンと変動・安定金利の選択</strong></p><p><strong>Aave</strong>は、多様な貸付オプションを提供する先進的なDeFiプロトコルです。</p><p><strong>Aaveの主要機能：</strong></p><ul><li><strong>フラッシュローン</strong>：担保不要の瞬間借入・返済</li><li><strong>変動金利</strong>：市場需給に応じた金利変動</li><li><strong>安定金利</strong>：短期固定金利オプション</li><li><strong>aToken</strong>：利息が自動蓄積される預金トークン</li></ul><p><strong>フラッシュローンの活用：</strong></p><ul><li><strong>アービトラージ</strong>：取引所間の価格差利用</li><li><strong>債務借り換え</strong>：より有利な条件への変更</li><li><strong>担保スワップ</strong>：担保資産の種類変更</li><li><strong>清算機会</strong>：効率的な清算実行</li></ul><p><strong>革新性：</strong>従来不可能だった大額無担保取引を1トランザクション内で実現</p>'
    },
    {
      id: 'defi-nft-test-3-q3',
      question: 'フラッシュローンで最も重要な制約は？',
      options: [
        '最大借入額の制限',
        '高い利息率の支払い',
        '同一トランザクション内での借入・返済完了',
        'KYC認証の必要性'
      ],
      correctAnswer: 2,
      explanation: '<p><strong>正解：同一トランザクション内での借入・返済完了</strong></p><p><strong>フラッシュローン</strong>の根本的特徴は<strong>アトミック実行</strong>です。</p><p><strong>アトミック実行の仕組み：</strong></p><ul><li><strong>All or Nothing</strong>：全て成功するか、全て失敗するか</li><li><strong>瞬間完了</strong>：1つのトランザクション内で借入→実行→返済</li><li><strong>返済保証</strong>：返済できない場合は取引全体が失敗</li><li><strong>無担保可能</strong>：返済が技術的に保証されるため</li></ul><p><strong>典型的な実行フロー：</strong></p><ol><li>プールから資金借入</li><li>アービトラージ等の操作実行</li><li>利益確定</li><li>元本＋手数料を返済</li><li>残りが利益として確定</li></ol><p><strong>失敗パターン：</strong>どの段階でも失敗すると、取引全体がロールバックされます</p>'
    },
    {
      id: 'defi-nft-test-3-q4',
      question: 'DeFiにおけるステーキングの主な目的は？',
      options: [
        '価格の安定化のみ',
        'セキュリティ向上とガバナンス参加',
        'トークンの永久ロック',
        '取引手数料の削減'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：セキュリティ向上とガバナンス参加</strong></p><p><strong>DeFiステーキング</strong>は、<strong>プロトコルのセキュリティと分散ガバナンス</strong>を実現する仕組みです。</p><p><strong>ステーキングの目的：</strong></p><ul><li><strong>セキュリティ向上</strong>：悪意的行為への経済的抑制</li><li><strong>ガバナンス参加</strong>：プロトコル決定への関与</li><li><strong>長期コミット</strong>：プロジェクト成功への動機付け</li><li><strong>流動性制御</strong>：市場供給量の調整</li></ul><p><strong>報酬メカニズム：</strong></p><ul><li><strong>ステーキング報酬</strong>：プロトコル収益の分配</li><li><strong>ガバナンス権</strong>：重要決定への投票権</li><li><strong>優先権</strong>：新サービスへの早期アクセス</li><li><strong>手数料割引</strong>：プラットフォーム利用優遇</li></ul><p><strong>リスク：</strong>スラッシング（悪意的行為時の担保没収）もあるため、責任ある参加が重要</p>'
    },
    {
      id: 'defi-nft-test-3-q5',
      question: 'DeFi保険プロトコルの主な保障対象は？',
      options: [
        '価格変動リスクのみ',
        'スマートコントラクトリスクと技術的失敗',
        'ユーザーの操作ミス',
        '規制変更リスク'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：スマートコントラクトリスクと技術的失敗</strong></p><p><strong>DeFi保険</strong>は、<strong>技術的リスク</strong>に対する保護を提供します。</p><p><strong>主要な保障内容：</strong></p><ul><li><strong>スマートコントラクトバグ</strong>：コードの欠陥による損失</li><li><strong>ハッキング攻撃</strong>：外部攻撃による資金流出</li><li><strong>Oracle失敗</strong>：価格データ異常による損失</li><li><strong>ガバナンス攻撃</strong>：悪意的な提案による損害</li></ul><p><strong>DeFi保険の仕組み：</strong></p><ul><li><strong>リスクプール</strong>：保険料の集約・運用</li><li><strong>査定プロセス</strong>：事故時の損害評価</li><li><strong>ステーキング</strong>：保険者による担保提供</li><li><strong>分散決定</strong>：コミュニティによる保険金支払判定</li></ul><p><strong>主要プロトコル：</strong>Nexus Mutual, Cover Protocol, InsurAce等</p>'
    },
    {
      id: 'q6',
      question: 'NFTの「Dynamic Metadata」技術の最も革新的な応用は？',
      options: [
        '価格に応じた画像変更',
        'ゲーム進行に応じた能力変化',
        '季節に応じた見た目変更',
        '所有者に応じたカスタマイゼーション'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：ゲーム進行に応じた能力変化</strong></p><p><strong>Dynamic Metadata</strong>は、NFTの<strong>属性・外観が動的に変化</strong>する技術です。</p><p><strong>ゲーム応用の革新性：</strong></p><ul><li><strong>成長型NFT</strong>：使用に応じて能力向上</li><li><strong>進化システム</strong>：特定条件で外観・性能変化</li><li><strong>実績反映</strong>：達成度に応じた変化</li><li><strong>相互作用</strong>：他NFTとの組み合わせ効果</li></ul><p><strong>技術的実装：</strong></p><ul><li><strong>オフチェーンAPI</strong>：外部データ連携</li><li><strong>Oracle活用</strong>：リアルタイムデータ取得</li><li><strong>スマートコントラクト</strong>：条件分岐処理</li><li><strong>IPFS動的生成</strong>：メタデータの動的作成</li></ul><p><strong>価値創造：</strong></p><ul><li>静的NFTを超えた体験価値</li><li>長期的なエンゲージメント</li><li>ユニークな進化パス</li></ul>'
    },
    {
      id: 'q7',
      question: 'NFTの「Fractional Ownership」（分割所有）の最適な活用場面は？',
      options: [
        '低価格NFTの小口投資',
        '高額NFTへの分散投資',
        '新規NFTの初期販売',
        'NFTの大量保管サービス'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：高額NFTへの分散投資</strong></p><p><strong>Fractional Ownership</strong>は、<strong>高額NFTを分割して投資可能</strong>にする仕組みです。</p><p><strong>最適な活用場面：</strong></p><ul><li><strong>Blue Chip NFT</strong>：CryptoPunks、BAYC等の高額品</li><li><strong>アート作品</strong>：数百万円クラスのデジタルアート</li><li><strong>歴史的NFT</strong>：初期の記念的作品</li><li><strong>ユーティリティNFT</strong>：高額だが価値のある機能的NFT</li></ul><p><strong>メリット：</strong></p><ul><li><strong>参入障壁低減</strong>：少額から高級NFTに投資</li><li><strong>リスク分散</strong>：複数高額NFTに分散投資</li><li><strong>流動性向上</strong>：部分売却が可能</li><li><strong>民主化</strong>：投資機会の平等化</li></ul><p><strong>プラットフォーム例：</strong>Fractional.art, Party Protocol</p>'
    },
    {
      id: 'q8',
      question: 'NFTベースの「Social Token」が最も成功しやすい分野は？',
      options: [
        '匿名インフルエンサー',
        '確立されたクリエイター・アーティスト',
        '新規参入者',
        '企業アカウント'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：確立されたクリエイター・アーティスト</strong></p><p><strong>NFTベースのSocial Token</strong>は、<strong>既存のファンベース</strong>がある創作者が最も成功しやすいです。</p><p><strong>成功要因：</strong></p><ul><li><strong>既存ファンベース</strong>：確立された支持者</li><li><strong>継続的コンテンツ</strong>：定期的な価値提供</li><li><strong>信頼性</strong>：長期活動による信用</li><li><strong>ブランド力</strong>：認知度と影響力</li></ul><p><strong>活用方法：</strong></p><ul><li><strong>限定コンテンツ</strong>：トークン保有者限定</li><li><strong>VIP体験</strong>：特別イベント・交流</li><li><strong>創作過程共有</strong>：制作プロセスの透明化</li><li><strong>コミュニティ運営</strong>：ファン同士の交流促進</li></ul><p><strong>成功事例：</strong></p><ul><li>アーティストの限定作品アクセス権</li><li>ミュージシャンのライブ優先権</li><li>作家の未公開原稿閲覧権</li></ul>'
    },
    {
      id: 'q9',
      question: 'NFTの「Staking」機能で最も持続可能な報酬モデルは？',
      options: [
        '高利回りトークン配布',
        'プラットフォーム収益の分配',
        '新規NFTの無料配布',
        '外部投資からの配当'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：プラットフォーム収益の分配</strong></p><p><strong>持続可能なNFT Staking</strong>は、<strong>実際の収益源</strong>に基づく必要があります。</p><p><strong>持続可能なモデル：</strong></p><ul><li><strong>マーケットプレイス手数料</strong>：取引手数料の一部還元</li><li><strong>ゲーム内収益</strong>：P2Eゲームの収益分配</li><li><strong>ライセンス収益</strong>：商用利用料の配分</li><li><strong>サービス利用料</strong>：プラットフォーム利用料</li></ul><p><strong>持続可能性の要素：</strong></p><ul><li><strong>実体経済との連動</strong>：実際のビジネス収益</li><li><strong>インフレ制御</strong>：トークン供給量管理</li><li><strong>価値創造</strong>：継続的な付加価値</li><li><strong>長期視点</strong>：短期的高利回りの回避</li></ul><p><strong>注意：</strong>高利回りのみを謳うモデルは Ponzi Scheme の可能性があります。</p>'
    },
    {
      id: 'q10',
      question: 'NFTの「Cross-Chain」展開で最も重要な技術的考慮点は？',
      options: [
        '最安のガス代チェーンを選択',
        'メタデータの整合性確保',
        '最も人気のあるチェーンに統一',
        '最新技術のチェーンを採用'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：メタデータの整合性確保</strong></p><p><strong>Cross-Chain NFT</strong>では、<strong>データの整合性</strong>が最重要課題です。</p><p><strong>技術的課題：</strong></p><ul><li><strong>メタデータ同期</strong>：異なるチェーン間での一致</li><li><strong>状態管理</strong>：所有権・属性の統一</li><li><strong>更新伝播</strong>：変更の全チェーン反映</li><li><strong>競合制御</strong>：同時更新の処理</li></ul><p><strong>解決アプローチ：</strong></p><ul><li><strong>Oracle Network</strong>：Chainlinkなどでデータ連携</li><li><strong>Layer Zero</strong>：統一プロトコル活用</li><li><strong>IPFS</strong>：分散ストレージで共通データ</li><li><strong>Bridge Protocol</strong>：安全な移行仕組み</li></ul><p><strong>検証すべき項目：</strong></p><ul><li>データ一貫性</li><li>セキュリティ</li><li>移行コスト</li><li>可逆性</li></ul><p>技術選択よりも、<strong>データ整合性の保証</strong>が優先されます。</p>'
    },
    {
      id: 'q11',
      question: 'NFTの「Utility Decay」（効用減衰）を防ぐ最も効果的な戦略は？',
      options: [
        '定期的な新機能追加',
        '価格の人為的操作',
        'NFT供給量の制限',
        'マーケティング予算の増額'
      ],
      correctAnswer: 0,
      explanation: '<p><strong>正解：定期的な新機能追加</strong></p><p><strong>Utility Decay</strong>は、時間経過とともにNFTの<strong>効用・魅力が減少</strong>する現象です。</p><p><strong>効果的な対策：</strong></p><ul><li><strong>機能拡張</strong>：新たなユーティリティの追加</li><li><strong>エコシステム発展</strong>：利用シーンの拡大</li><li><strong>コミュニティ進化</strong>：新たな価値提案</li><li><strong>外部連携</strong>：パートナーシップ拡大</li></ul><p><strong>具体的施策：</strong></p><ul><li><strong>ゲーム機能追加</strong>：新要素・ステージ</li><li><strong>メタバース対応</strong>：新プラットフォーム連携</li><li><strong>IRL（現実世界）特典</strong>：オフライン価値</li><li><strong>AI機能統合</strong>：最新技術の活用</li></ul><p><strong>成功例：</strong></p><ul><li>BAYCのメタバース展開</li><li>CryptoPunksの文化的地位向上</li><li>Azukiの多面的IP展開</li></ul><p>継続的な<strong>価値創造</strong>が長期成功の鍵です。</p>'
    },
    {
      id: 'q12',
      question: 'NFTエコシステムにおける「Creator Royalty」の将来的な最適解は？',
      options: [
        '完全なロイヤリティ廃止',
        '技術的強制による100%徴収',
        'マーケットプレイス主導の柔軟な仕組み',
        '政府規制による標準化'
      ],
      correctAnswer: 2,
      explanation: '<p><strong>正解：マーケットプレイス主導の柔軟な仕組み</strong></p><p><strong>Creator Royalty</strong>の将来は、<strong>市場ベースの柔軟なアプローチ</strong>が現実的です。</p><p><strong>最適解の要素：</strong></p><ul><li><strong>選択制</strong>：クリエイター・購入者の選択権</li><li><strong>透明性</strong>：ロイヤリティ条件の明示</li><li><strong>差別化</strong>：サービス品質による競争</li><li><strong>イノベーション</strong>：新しい価値創造モデル</li></ul><p><strong>現実的なアプローチ：</strong></p><ul><li><strong>Operator Filter</strong>：ロイヤリティ対応取引所のみ</li><li><strong>Creator Earnings</strong>：初回販売時の収益最大化</li><li><strong>Utility Model</strong>：継続的価値提供</li><li><strong>Community Building</strong>：ファン主導の支援</li></ul><p><strong>市場動向：</strong></p><ul><li>消費者の選択権重視</li><li>プラットフォーム間競争</li><li>技術的解決策の限界</li><li>新しいビジネスモデル探求</li></ul>'
    }
  ]
}