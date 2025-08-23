import { CategoryTest } from '@/lib/types/learning'

export const defiNftTest5: CategoryTest = {
  id: 'defi-nft-test-5',
  categoryId: 'defi-nft',
  title: 'NFT作成・評価・ゲーミング活用：確認テスト5（レッスン21-25）',
  description: 'NFT作成・ミント、NFT評価手法、ゲーミング・ユーティリティNFT、NFT取引戦略、フラクショナルNFTに関する理解度を確認します',
  difficulty: 'intermediate',
  category: 'defi-nft',
  lessonRange: 'lesson-21-25',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'defi-nft-test-5-q1',
      question: 'NFT作成時に最も重要な技術的考慮事項は？',
      options: [
        '画像の高解像度',
        'メタデータの適切な設計と保存',
        '作品の商用利用可能性',
        'クリエイターの知名度'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：メタデータの適切な設計と保存</strong></p><p><strong>メタデータ</strong>はNFTの<strong>実际のコンテンツや属性情報</strong>を含む重要な要素です。</p><p><strong>メタデータの主要要素：</strong></p><ul><li><strong>作品名</strong>：NFTのタイトル</li><li><strong>説明</strong>：作品の詳細情報</li><li><strong>画像URL</strong>：実際のコンテンツへのリンク</li><li><strong>属性・特性</strong>：ユニークな特徴やレア度</li></ul><p><strong>保存方法の選択：</strong></p><ul><li><strong>IPFS</strong>：分散ストレージ（推奨）</li><li><strong>Arweave</strong>：永続的保存</li><li><strong>中央集権サーバー</strong>：リスクあり</li><li><strong>オンチェーン</strong>：コスト高だが最安全</li></ul><p><strong>メタデータのリスク：</strong></p><ul><li>リンク切れ：中央集権サーバーの関閉</li><li>変更不可：ブロックチェーン上では修正不可</li><li>標準化：JSONスキーマの一貫性</li></ul>'
    },
    {
      id: 'q2',
      question: 'DeFi プロトコルの「Governance Attack」で最も危険な攻撃シナリオは？',
      options: [
        'ガバナンストークンの価格操作',
        '大量のトークンを借りて悪意のある提案を可決する',
        'ガバナンスフォーラムの乗っ取り',
        'ガバナンストークンの偽造'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：大量のトークンを借りて悪意のある提案を可決する</strong></p><p><strong>Governance Attack</strong>は、<strong>一時的なトークン獲得</strong>でガバナンスを乗っ取る攻撃です。</p><p><strong>攻撃の流れ：</strong></p><ol><li><strong>Flash Loan</strong>で大量ガバナンストークン借入</li><li><strong>悪意的提案</strong>の提出・即座の投票</li><li><strong>提案可決</strong>：資金流出等の有害な変更</li><li><strong>利益獲得</strong>：プロトコルから資金抽出</li><li><strong>返済完了</strong>：Flash Loanの返済</li></ol><p><strong>実際の事例：</strong></p><ul><li><strong>Beanstalk DAO</strong>（2022年）：$182M被害</li><li><strong>Build Finance DAO</strong>（2021年）：ガバナンス攻撃成功</li></ul><p><strong>対策：</strong></p><ul><li><strong>Time Lock</strong>：提案から実行まで時間遅延</li><li><strong>Minimum Holding Period</strong>：最低保有期間要求</li><li><strong>Quorum要件</strong>：より多くの参加者要求</li><li><strong>複数段階承認</strong>：段階的な承認プロセス</li></ul>'
    },
    {
      id: 'q3',
      question: 'DeFi における「Reentrancy Attack」の防止策として最も効果的なのは？',
      options: [
        'ガス制限を厳しくする',
        'Checks-Effects-Interactions パターンの適用',
        '取引手数料を高く設定する',
        '外部契約との相互作用を禁止する'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：Checks-Effects-Interactions パターンの適用</strong></p><p><strong>Reentrancy Attack</strong>は、スマートコントラクトの<strong>再帰呼び出し</strong>を悪用した攻撃です。</p><p><strong>攻撃メカニズム：</strong></p><ol><li>攻撃者がコントラクト呼び出し</li><li>コントラクトが攻撃者に資金送信</li><li>送信時に攻撃者のコードが実行</li><li>攻撃者が同じ関数を再度呼び出し</li><li>状態更新前に複数回実行→資金流出</li></ol><p><strong>Checks-Effects-Interactions パターン：</strong></p><ul><li><strong>Checks</strong>：条件の確認（残高等）</li><li><strong>Effects</strong>：状態の更新（残高減算）</li><li><strong>Interactions</strong>：外部呼び出し（送金実行）</li></ul><p><strong>その他の対策：</strong></p><ul><li><strong>Reentrancy Guard</strong>：実行中フラグで制御</li><li><strong>Pull Payment</strong>：受取人が資金引出</li><li><strong>Low-level Call制限</strong>：安全な送金方法使用</li></ul><p><strong>歴史的事例：</strong>The DAO事件（2016年）がReentrancy攻撃の代表例です。</p>'
    },
    {
      id: 'q4',
      question: 'DeFi プロトコルの「Economic Security」において最も重要な要素は？',
      options: [
        'トークン価格の安定性',
        '攻撃コストが獲得可能利益を上回ること',
        'ガバナンストークンの広範囲な分散',
        'プロトコル収益の最大化'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：攻撃コストが獲得可能利益を上回ること</strong></p><p><strong>Economic Security</strong>は、<strong>経済的インセンティブ</strong>によってプロトコルを保護する仕組みです。</p><p><strong>基本原理：</strong></p><ul><li><strong>攻撃コスト > 攻撃利益</strong></li><li>合理的な攻撃者は攻撃を実行しない</li><li>経済的均衡による安全性確保</li></ul><p><strong>コスト要素：</strong></p><ul><li><strong>担保コスト</strong>：攻撃に必要な資金調達</li><li><strong>機会コスト</strong>：正当な利用での収益放棄</li><li><strong>流動性コスト</strong>：大量資金移動の価格インパクト</li><li><strong>レピュテーション</strong>：攻撃発覚時の信用失墜</li></ul><p><strong>利益要素：</strong></p><ul><li><strong>プロトコル内資金</strong>：獲得可能な最大金額</li><li><strong>MEV機会</strong>：取引順序操作による利益</li><li><strong>短期的利益</strong>：攻撃による即座の収益</li></ul><p><strong>設計原則：</strong>プロトコル設計時に攻撃の経済的合理性を排除することが重要です。</p>'
    },
    {
      id: 'q5',
      question: '「Slashing」メカニズムが最も効果的に機能するのは？',
      options: [
        '悪意的行為に対する経済的ペナルティとして',
        'ガバナンス投票の重み付けとして',
        '利益分配の調整として',
        'ネットワーク手数料の算出として'
      ],
      correctAnswer: 0,
      explanation: '<p><strong>正解：悪意的行為に対する経済的ペナルティとして</strong></p><p><strong>Slashing</strong>は、<strong>担保没収による行動規制</strong>メカニズムです。</p><p><strong>Slashingの仕組み：</strong></p><ul><li><strong>事前担保</strong>：参加者は資金をロック</li><li><strong>行動監視</strong>：プロトコルルールの遵守確認</li><li><strong>違反検知</strong>：悪意的・不正行為の特定</li><li><strong>担保没収</strong>：違反者の担保を部分・全額没収</li></ul><p><strong>効果的な適用例：</strong></p><ul><li><strong>PoS（Proof of Stake）</strong>：不正ブロック提案の防止</li><li><strong>Oracle</strong>：虚偽データ提供の抑制</li><li><strong>Liquidity Mining</strong>：プール放棄の防止</li><li><strong>Insurance Protocol</strong>：不正クレーム防止</li></ul><p><strong>設計要件：</strong></p><ul><li><strong>明確なルール</strong>：何が違反かの定義</li><li><strong>公平な判定</strong>：恣意的でない検証</li><li><strong>適切な罰則</strong>：過度でない適正な没収</li><li><strong>異議申し立て</strong>：誤判定の救済措置</li></ul>'
    },
    {
      id: 'q6',
      question: 'DeFi における「Price Oracle Manipulation」の最も効果的な対策は？',
      options: [
        '単一の信頼できるOracleを使用',
        '複数のOracleから価格を取得し、異常値を除外',
        '価格更新頻度を下げる',
        '中央集権的な価格決定機関を設置'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：複数のOracleから価格を取得し、異常値を除外</strong></p><p><strong>Oracle Manipulation</strong>は、価格データの操作によるプロトコル攻撃です。</p><p><strong>攻撃手法：</strong></p><ul><li><strong>Flash Loan攻撃</strong>：一時的な大量取引で価格操作</li><li><strong>Oracle遅延攻撃</strong>：価格更新の時間差悪用</li><li><strong>単一Oracle攻撃</strong>：特定Oracleのデータ操作</li><li><strong>循環参照攻撃</strong>：相互参照による価格歪み</li></ul><p><strong>効果的対策：</strong></p><ul><li><strong>複数Oracle使用</strong>：Chainlink, Band, Pyth等の組み合わせ</li><li><strong>Price Aggregation</strong>：中央値・加重平均の活用</li><li><strong>Circuit Breaker</strong>：異常変動時の自動停止</li><li><strong>TWAP（Time-Weighted Average Price）</strong>：時間平均価格</li><li><strong>Deviation Threshold</strong>：変動閾値による検証</li></ul><p><strong>実装例：</strong></p><ul><li>3つのOracleから取得→中央値採用</li><li>30%以上の価格乖離時は取引停止</li><li>過去1時間の平均価格を基準値として利用</li></ul>'
    },
    {
      id: 'q7',
      question: 'DeFi の「Liquidity Mining」でポンジースキーム化を避ける設計として重要なのは？',
      options: [
        '高いAPY（年率）の維持',
        '実際の収益源に基づいた持続可能な報酬設計',
        '参加者数の制限',
        'トークン価格の人為的操作'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：実際の収益源に基づいた持続可能な報酬設計</strong></p><p><strong>持続可能なLiquidity Mining</strong>は、<strong>実体経済価値</strong>に基づく必要があります。</p><p><strong>健全な報酬源：</strong></p><ul><li><strong>取引手数料</strong>：実際のDEX利用による収益</li><li><strong>貸付利息</strong>：借入需要による利息収入</li><li><strong>プロトコル収益</strong>：サービス提供による実収益</li><li><strong>外部収益</strong>：提携・投資等による収入</li></ul><p><strong>危険なパターン：</strong></p><ul><li><strong>無制限発行</strong>：原資なしのトークン発行</li><li><strong>新規参入依存</strong>：新規資金で既存報酬を賄う</li><li><strong>価格操作依存</strong>：人為的価格維持が前提</li><li><strong>短期高利回り</strong>：継続不可能な報酬率</li></ul><p><strong>持続性の指標：</strong></p><ul><li><strong>Revenue/Reward比率</strong>：収益と報酬の比較</li><li><strong>Token Emission Rate</strong>：適切な発行速度</li><li><strong>Value Accrual</strong>：プロトコルへの価値還元</li><li><strong>User Retention</strong>：報酬終了後の参加継続</li></ul>'
    },
    {
      id: 'q8',
      question: 'DeFi プロトコルの「Admin Key」リスクを軽減する最も効果的な方法は？',
      options: [
        'Admin Keyを完全に廃止する',
        'Multisig + Time Lock の組み合わせ',
        'Admin Keyを暗号化して保存する',
        '単一の信頼できる管理者に委託する'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：Multisig + Time Lock の組み合わせ</strong></p><p><strong>Admin Key</strong>は、プロトコル管理に必要だが、<strong>中央集権リスク</strong>の源泉でもあります。</p><p><strong>Admin Key リスク：</strong></p><ul><li><strong>単一障害点</strong>：管理者の判断ミス・悪意</li><li><strong>Rug Pull</strong>：管理者による資金持ち逃げ</li><li><strong>外部圧力</strong>：政府・ハッカーによる強要</li><li><strong>技術的攻撃</strong>：秘密鍵の盗難</li></ul><p><strong>Multisig による軽減：</strong></p><ul><li><strong>分散統制</strong>：複数人による意思決定</li><li><strong>閾値設定</strong>：N人中M人の合意が必要</li><li><strong>単独行動防止</strong>：単一人物での実行不可</li></ul><p><strong>Time Lock による保護：</strong></p><ul><li><strong>予告期間</strong>：変更実行まで48時間等の遅延</li><li><strong>コミュニティ確認</strong>：ユーザーの退避時間確保</li><li><strong>緊急停止</strong>：問題発見時の対応時間</li></ul><p><strong>最終目標：</strong>段階的な<strong>完全分散化</strong>（Admin Key廃止）</p>'
    },
    {
      id: 'q9',
      question: 'DeFi の「Sandwich Attack」を個人ユーザーが回避する最も実用的な方法は？',
      options: [
        '高額のガス代を支払う',
        'Private Mempoolサービスの利用',
        '小額の取引のみ行う',
        '取引を夜間のみに限定する'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：Private Mempoolサービスの利用</strong></p><p><strong>Sandwich Attack</strong>は、ユーザーの取引を<strong>前後で挟んで</strong>利益を抽出する攻撃です。</p><p><strong>攻撃の仕組み：</strong></p><ol><li>大口取引をMempool（待機中取引）で発見</li><li>高いガス代で事前購入（Front-run）</li><li>ユーザー取引実行（価格上昇）</li><li>即座に売却実行（Back-run）</li><li>価格差が攻撃者の利益に</li></ol><p><strong>Private Mempoolの利点：</strong></p><ul><li><strong>取引隠蔽</strong>：他者から見えない状態で実行</li><li><strong>MEV保護</strong>：Front-runningの防止</li><li><strong>確実執行</strong>：失敗リスクの軽減</li></ul><p><strong>主要サービス：</strong></p><ul><li><strong>Flashbots Protect</strong>：無料のMEV保護</li><li><strong>1inch Fusion</strong>：MEV収益の還元</li><li><strong>CowSwap</strong>：CoW（Coincidence of Wants）活用</li><li><strong>mistX</strong>：プライベート取引プール</li></ul><p>高ガス代や取引制限よりも、<strong>根本的解決</strong>が可能です。</p>'
    },
    {
      id: 'q10',
      question: 'DeFi における「Liquidity Bootstrapping Pool（LBP）」の主要な目的は？',
      options: [
        '最大限の資金調達',
        '価格発見と公平な初期分配',
        'ガバナンストークンの集中化',
        '高い初期価格の維持'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：価格発見と公平な初期分配</strong></p><p><strong>LBP（Liquidity Bootstrapping Pool）</strong>は、<strong>公平な価格発見メカニズム</strong>です。</p><p><strong>LBPの仕組み：</strong></p><ul><li><strong>重み比率変更</strong>：時間とともに自動調整（例：95/5 → 50/50）</li><li><strong>価格下落圧力</strong>：売り圧力により適正価格へ</li><li><strong>FOMO抑制</strong>：初期高価格により投機を抑制</li><li><strong>段階的分散</strong>：時間をかけた段階的な分配</li></ul><p><strong>従来ICOとの比較：</strong></p><ul><li><strong>ICO</strong>：固定価格→不公平、Bot優位</li><li><strong>LBP</strong>：動的価格→公平、自然な価格発見</li></ul><p><strong>利点：</strong></p><ul><li><strong>価格操作耐性</strong>：大口による操作が困難</li><li><strong>Bot対策</strong>：高初期価格でBot利益を削減</li><li><strong>公平分散</strong>：真のユーザーへの分配促進</li><li><strong>流動性確保</strong>：初期流動性の確保</li></ul><p><strong>成功事例：</strong>Balancer上で多くのプロジェクトが採用し、健全な価格発見を実現しています。</p>'
    },
    {
      id: 'q11',
      question: 'DeFi プロトコルの「Bug Bounty」プログラムで最も重要な要素は？',
      options: [
        '高額な報奨金設定',
        'セキュリティ専門家との継続的なコミュニケーション',
        '匿名での報告受付',
        '発見されたバグの即座公開'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：セキュリティ専門家との継続的なコミュニケーション</strong></p><p><strong>Bug Bounty</strong>プログラムの成功には、<strong>建設的な関係構築</strong>が最重要です。</p><p><strong>効果的なBug Bountyの要素：</strong></p><ul><li><strong>迅速な対応</strong>：報告に対する速やかな初期回答</li><li><strong>専門的議論</strong>：技術的詳細の建設的な検討</li><li><strong>透明性</strong>：判定プロセスの明確化</li><li><strong>継続性</strong>：長期的な関係維持</li></ul><p><strong>コミュニケーションの価値：</strong></p><ul><li><strong>Deep Dive</strong>：表面的でない詳細分析</li><li><strong>False Positive削減</strong>：無効報告の事前排除</li><li><strong>教育効果</strong>：双方向の学習機会</li><li><strong>Trust Building</strong>：信頼関係による質向上</li></ul><p><strong>成功プログラム例：</strong></p><ul><li><strong>Immunefi</strong>：$100M+の累積報酬</li><li><strong>Code4rena</strong>：競争的監査プラットフォーム</li><li><strong>Sherlock</strong>：継続的セキュリティ監査</li></ul><p>単純な報奨金額より、<strong>エコシステム全体</strong>の安全性向上が目標です。</p>'
    },
    {
      id: 'q12',
      question: 'DeFi における「Cross-Chain Bridge」の最も根本的なセキュリティ課題は？',
      options: [
        'ガス代の高騰',
        '取引速度の低下',
        'Trusted Third Partyへの依存',
        'ユーザーインターフェースの複雑さ'
      ],
      correctAnswer: 2,
      explanation: '<p><strong>正解：Trusted Third Partyへの依存</strong></p><p><strong>Cross-Chain Bridge</strong>は、異なるブロックチェーン間の資産移動を可能にしますが、<strong>信頼の問題</strong>が存在します。</p><p><strong>根本的課題：</strong></p><ul><li><strong>Multi-Chain Verification</strong>：複数チェーンの状態確認の困難</li><li><strong>Custodial Risk</strong>：Bridge運営者による資金管理</li><li><strong>Oracle Dependency</strong>：外部データソースへの依存</li><li><strong>Governance Risk</strong>：Bridge設定変更による影響</li></ul><p><strong>攻撃事例：</strong></p><ul><li><strong>Ronin Bridge</strong>（2022年）：$600M流出</li><li><strong>Wormhole</strong>（2022年）：$320M被害</li><li><strong>Poly Network</strong>（2021年）：$600M攻撃</li></ul><p><strong>リスク軽減アプローチ：</strong></p><ul><li><strong>Optimistic Verification</strong>：楽観的検証+異議申立期間</li><li><strong>ZK Proof</strong>：ゼロ知識証明による検証</li><li><strong>Multi-Validator</strong>：複数検証者による合意</li><li><strong>Insurance</strong>：Bridge保険による補償</li></ul><p>完全な<strong>Trust-minimized Bridge</strong>の実現が技術的な挑戦です。</p>'
    }
  ]
}