import { CategoryTest } from '@/lib/types/learning'

export const defiNftTest4: CategoryTest = {
  id: 'defi-nft-test-4',
  categoryId: 'defi-nft',
  title: 'クロスチェーンDeFi・Layer2・NFT基礎：確認テスト4（レッスン16-20）',
  description: 'クロスチェーンDeFi、Layer2ソリューション、NFT基礎概念、NFT規格・メタデータ、NFTマーケットプレイスに関する理解度を確認します',
  difficulty: 'intermediate',
  category: 'defi-nft',
  lessonRange: 'lesson-16-20',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'defi-nft-test-4-q1',
      question: 'クロスチェーンDeFiの最大のリスクは？',
      options: [
        '高いガス代',
        '取引速度の低下',
        'ブリッジプロトコルのセキュリティリスク',
        'ユーザーインターフェースの複雑さ'
      ],
      correctAnswer: 2,
      explanation: '<p><strong>正解：ブリッジプロトコルのセキュリティリスク</strong></p><p><strong>クロスチェーンDeFi</strong>では、<strong>異なるブロックチェーン間の資産移動</strong>が最大のリスクポイントです。</p><p><strong>ブリッジリスクの要因：</strong></p><ul><li><strong>技術的複雑さ</strong>：複数チェーンの状態検証の困難</li><li><strong>中央集権的要素</strong>：多くのブリッジが信頼できる第三者に依存</li><li><strong>大額資金プール</strong>：攻撃者にとって魅力的なターゲット</li><li><strong>新しい技術</strong>：十分にテストされていない場合がある</li></ul><p><strong>実際の被害事例：</strong></p><ul><li><strong>Ronin Bridge</strong>（2022年）：$600M流出</li><li><strong>Wormhole</strong>（2022年）：$320M被害</li><li><strong>Poly Network</strong>（2021年）：$600M攻撃</li></ul><p><strong>リスク軽減策：</strong></p><ul><li><strong>複数検証者</strong>：分散型バリデーションシステム</li><li><strong>時間遅延</strong>：大額移動時の待機時間</li><li><strong>保険プロトコル</strong>：ブリッジ専用保険</li><li><strong>監査</strong>：定期的なセキュリティ監査</li></ul>'
    },
    {
      id: 'defi-nft-test-4-q2',
      question: 'Layer2ソリューションの主な利点は？',
      options: [
        'セキュリティの向上のみ',
        'スケーラビリティ向上と手数料削減',
        '完全に新しいブロックチェーンの作成',
        'プライバシーの完全な保護'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：スケーラビリティ向上と手数料削減</strong></p><p><strong>Layer2</strong>は、<strong>メインチェーンの負荷軽減</strong>により性能向上を図るソリューションです。</p><p><strong>主要な利点：</strong></p><ul><li><strong>高速処理</strong>：秒間数千〜数万トランザクション</li><li><strong>低手数料</strong>：メインチェーンの1/100以下</li><li><strong>セキュリティ継承</strong>：メインチェーンのセキュリティを活用</li><li><strong>互換性</strong>：既存のdAppsとの連携</li></ul><p><strong>主要なLayer2技術：</strong></p><ul><li><strong>Optimistic Rollups</strong>：Arbitrum、Optimism</li><li><strong>ZK-Rollups</strong>：Polygon zkEVM、zkSync</li><li><strong>State Channels</strong>：Lightning Network</li><li><strong>Plasma</strong>：Polygon（旧Matic）</li></ul><p><strong>トレードオフ：</strong></p><ul><li>若干の複雑さ増加</li><li>資金引き出し時の遅延（一部）</li><li>新技術のリスク</li></ul><p><strong>用途：</strong>DeFi、NFT、ゲーム等で広く採用されています</p>'
    },
    {
      id: 'defi-nft-test-4-q3',
      question: 'NFT（Non-Fungible Token）の最も重要な特徴は？',
      options: [
        '高い投資収益率',
        '代替不可能性（ユニーク性）',
        '低い取引手数料',
        '高速な取引処理'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：代替不可能性（ユニーク性）</strong></p><p><strong>NFT</strong>の根本的価値は<strong>「Non-Fungible（代替不可能）」</strong>という特性です。</p><p><strong>代替可能 vs 代替不可能：</strong></p><ul><li><strong>Fungible（代替可能）</strong>：1 ETH = 1 ETH（同等価値）</li><li><strong>Non-Fungible（代替不可能）</strong>：各NFTが固有のID・属性を持つ</li></ul><p><strong>ユニーク性の実現：</strong></p><ul><li><strong>トークンID</strong>：各NFTに固有の識別番号</li><li><strong>メタデータ</strong>：画像、属性、説明等の固有情報</li><li><strong>所有権記録</strong>：ブロックチェーン上での明確な所有権</li><li><strong>移転履歴</strong>：完全な取引履歴の追跡</li></ul><p><strong>活用分野：</strong></p><ul><li><strong>デジタルアート</strong>：アーティスト作品の証明</li><li><strong>コレクティブル</strong>：デジタル収集品</li><li><strong>ゲームアイテム</strong>：キャラクター・装備品</li><li><strong>証明書</strong>：資格・実績の証明</li></ul>'
    },
    {
      id: 'q4',
      question: 'Aave プロトコルの「Flash Loan」の最も重要な特徴は？',
      options: [
        '無担保で借入が可能',
        '1つのトランザクション内で借入と返済が完結する',
        '利息が他のプロトコルより安い',
        '借入限度額が無制限'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：1つのトランザクション内で借入と返済が完結する</strong></p><p><strong>Flash Loan</strong>は、<strong>同一トランザクション内</strong>での借入・返済を前提とした革新的な金融ツールです。</p><p><strong>Flash Loanの特徴：</strong></p><ul><li><strong>無担保借入</strong>：担保不要（返済保証のため）</li><li><strong>瞬間実行</strong>：1つのトランザクション内で完結</li><li><strong>大額借入</strong>：プール流動性の範囲内で上限なし</li><li><strong>自動キャンセル</strong>：返済できない場合は取引自体が失敗</li></ul><p><strong>活用例：</strong></p><ul><li><strong>アービトラージ</strong>：取引所間価格差の活用</li><li><strong>債務リファイナンス</strong>：より有利な条件への借り換え</li><li><strong>担保スワップ</strong>：担保資産の種類変更</li><li><strong>清算機会</strong>：効率的な清算実行</li></ul><p><strong>技術革新：</strong>従来不可能だった大額無担保取引を実現しました。</p>'
    },
    {
      id: 'q5',
      question: 'DeFiにおける「Total Value Locked（TVL）」指標の最適な解釈は？',
      options: [
        'プロトコルの利益額',
        'プロトコルに預けられた資産の総価値',
        'プロトコルの時価総額',
        'プロトコルのユーザー数'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：プロトコルに預けられた資産の総価値</strong></p><p><strong>TVL（Total Value Locked）</strong>は、DeFiプロトコルの<strong>規模と人気を示す</strong>重要指標です。</p><p><strong>TVLの意味：</strong></p><ul><li><strong>流動性の総額</strong>：プロトコル内にロックされた資産</li><li><strong>信頼度の指標</strong>：ユーザーの信頼度を反映</li><li><strong>市場シェア</strong>：DeFi市場での地位</li><li><strong>収益ポテンシャル</strong>：手数料収入の基盤</li></ul><p><strong>計算方法：</strong></p><ul><li>預金プール内の全資産を USD 換算</li><li>複数プール・チェーンの合計</li><li>リアルタイム価格での更新</li></ul><p><strong>注意点：</strong></p><ul><li>価格変動によるTVL変動</li><li>二重カウント（複数プロトコル利用）</li><li>流動性の質（利用可能性）は別評価</li></ul><p><strong>分析ツール：</strong>DeFiPulse, DefiLlama, Dune Analytics</p>'
    },
    {
      id: 'q6',
      question: 'DeFiプロトコルの「Governance Token」で最も重要な機能は？',
      options: [
        '高い投資利回りの提供',
        'プロトコルのパラメータ決定権',
        'VIP機能へのアクセス権',
        '優先的な新サービス利用権'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：プロトコルのパラメータ決定権</strong></p><p><strong>Governance Token</strong>の最重要機能は、<strong>プロトコルの方針決定</strong>への参加です。</p><p><strong>ガバナンス対象：</strong></p><ul><li><strong>金利モデル</strong>：貸付・借入金利の設定</li><li><strong>担保比率</strong>：最低担保要求の変更</li><li><strong>新資産追加</strong>：対応通貨の拡大</li><li><strong>手数料構造</strong>：プロトコル手数料の設定</li><li><strong>セキュリティパラメータ</strong>：リスク管理設定</li></ul><p><strong>意思決定プロセス：</strong></p><ol><li><strong>提案</strong>：コミュニティメンバーが提案</li><li><strong>議論</strong>：フォーラムでの検討</li><li><strong>投票</strong>：トークン保有量に応じた投票</li><li><strong>実行</strong>：可決時の自動実行</li></ol><p><strong>価値の源泉：</strong>プロトコルの成功による<strong>ガバナンス権の価値向上</strong>が本質的価値です。</p>'
    },
    {
      id: 'q7',
      question: 'MakerDAO における「DAI」ステーブルコインの価格安定メカニズムは？',
      options: [
        '法定通貨の銀行預金による裏付け',
        '中央銀行による金利調整',
        'ETH等の暗号資産担保による過担保発行',
        '政府による価格保証'
      ],
      correctAnswer: 2,
      explanation: '<p><strong>正解：ETH等の暗号資産担保による過担保発行</strong></p><p><strong>DAI</strong>は、<strong>分散型・暗号資産担保型</strong>ステーブルコインです。</p><p><strong>価格安定メカニズム：</strong></p><ul><li><strong>過担保システム</strong>：1ドル分のDAIに対し1.5ドル以上のETH担保</li><li><strong>自動清算</strong>：担保不足時の強制決済</li><li><strong>Stability Fee</strong>：借入金利による需給調整</li><li><strong>DAI Savings Rate</strong>：保有インセンティブ</li></ul><p><strong>安定化の仕組み：</strong></p><ul><li><strong>DAI > $1</strong> → Stability Fee下げ → 発行増加 → 価格下落</li><li><strong>DAI < $1</strong> → Stability Fee上げ → 発行減少 → 価格上昇</li></ul><p><strong>完全分散型の利点：</strong></p><ul><li>単一障害点なし</li><li>検閲耐性</li><li>透明性の確保</li><li>プログラマブル通貨</li></ul><p><strong>リスク：</strong>担保資産の価格変動リスクは存在します。</p>'
    },
    {
      id: 'q8',
      question: 'DeFi プロトコルにおける「Impermanent Loss」が最も発生しやすい状況は？',
      options: [
        '両方の資産価格が同じ割合で上昇',
        '片方の資産価格が大幅に変動',
        '両方の資産価格が安定',
        '取引手数料が高い時'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：片方の資産価格が大幅に変動</strong></p><p><strong>Impermanent Loss</strong>は、流動性提供時に発生する<strong>機会損失</strong>です。</p><p><strong>発生メカニズム：</strong></p><ul><li><strong>AMM（自動マーケットメーカー）</strong>の価格調整機能</li><li><strong>アービトラージ</strong>による資産比率の自動調整</li><li><strong>価格変動</strong>時の資産保有量変化</li></ul><p><strong>具体例（ETH/DAI プール）：</strong></p><ol><li>ETH $2000, DAI $1 時点で 1 ETH + 2000 DAI を提供</li><li>ETH価格が $4000 に上昇</li><li>アービトラージにより 0.707 ETH + 2828 DAI に変化</li><li>単純保有なら $6000、プール参加なら約 $5656</li><li>差額 $344 が Impermanent Loss</li></ol><p><strong>軽減策：</strong></p><ul><li>相関性の高い資産ペア選択</li><li>手数料収入との比較検討</li><li>価格変動の少ない期間での参加</li></ul>'
    },
    {
      id: 'q9',
      question: 'Uniswap V3 の「Concentrated Liquidity」の主な利点は？',
      options: [
        '無制限の価格範囲での流動性提供',
        '特定価格帯に集中した効率的な流動性提供',
        '自動的なリバランシング機能',
        'インパーマネントロスの完全排除'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：特定価格帯に集中した効率的な流動性提供</strong></p><p><strong>Concentrated Liquidity</strong>は、Uniswap V3 の革新的機能で<strong>資本効率を大幅改善</strong>します。</p><p><strong>従来(V2) vs V3：</strong></p><ul><li><strong>V2</strong>：0〜∞の全価格範囲に一様分布</li><li><strong>V3</strong>：指定価格範囲に集中配置</li></ul><p><strong>利点：</strong></p><ul><li><strong>資本効率向上</strong>：同じ流動性でより多くの手数料獲得</li><li><strong>カスタマイズ</strong>：戦略に応じた価格範囲設定</li><li><strong>高収益可能性</strong>：効率的な流動性活用</li><li><strong>スリッページ改善</strong>：価格インパクト軽減</li></ul><p><strong>戦略例：</strong></p><ul><li><strong>ステーブルペア</strong>：$0.99-$1.01の狭い範囲</li><li><strong>相関ペア</strong>：ETH/BTC等の予想範囲</li><li><strong>アクティブ管理</strong>：市況に応じた範囲調整</li></ul><p><strong>注意点：</strong>価格が範囲外に出ると流動性提供が停止します。</p>'
    },
    {
      id: 'q10',
      question: 'DeFi における「Yield Farming」の最適戦略として重要でないのは？',
      options: [
        'APY（年間収益率）の比較分析',
        'スマートコントラクトリスクの評価',
        'Impermanent Loss の計算',
        'SNSでの人気度チェック'
      ],
      correctAnswer: 3,
      explanation: '<p><strong>正解：SNSでの人気度チェック</strong></p><p><strong>Yield Farming</strong>の成功には、<strong>定量的・技術的分析</strong>が不可欠です。</p><p><strong>重要な分析要素：</strong></p><ul><li><strong>APY分析</strong>：実質的な収益率計算</li><li><strong>リスク評価</strong>：スマートコントラクト監査状況</li><li><strong>IL計算</strong>：価格変動による機会損失評価</li><li><strong>手数料構造</strong>：ガス代・プロトコル手数料</li></ul><p><strong>総合的リスク管理：</strong></p><ul><li><strong>技術的リスク</strong>：バグ・ハッキング可能性</li><li><strong>市場リスク</strong>：価格変動・流動性リスク</li><li><strong>規制リスク</strong>：法的環境変化</li><li><strong>運用リスク</strong>：プロトコルガバナンス</li></ul><p><strong>注意：</strong>SNSの人気は<strong>感情的判断</strong>を引き起こし、適切なリスク評価を阻害する可能性があります。<strong>データ駆動</strong>のアプローチが重要です。</p>'
    },
    {
      id: 'q11',
      question: 'DeFi プロトコルの「Oracle」が最も重要な役割を果たすのは？',
      options: [
        'ユーザー認証',
        '外部価格データの提供',
        'トランザクションの高速化',
        'ガス代の最適化'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：外部価格データの提供</strong></p><p><strong>Oracle</strong>は、ブロックチェーン外部の情報を<strong>安全にオンチェーンに提供</strong>する重要インフラです。</p><p><strong>DeFiでのOracle活用：</strong></p><ul><li><strong>価格フィード</strong>：担保・借入資産の時価評価</li><li><strong>清算判定</strong>：担保不足の自動検知</li><li><strong>金利算出</strong>：市場連動金利の計算</li><li><strong>リスク管理</strong>：ポートフォリオ価値評価</li></ul><p><strong>主要なOracle：</strong></p><ul><li><strong>Chainlink</strong>：最も利用されるPrice Feed</li><li><strong>Band Protocol</strong>：高速・低コストのデータ提供</li><li><strong>Tellor</strong>：分散型Oracleネットワーク</li><li><strong>Pyth Network</strong>：高頻度取引向け</li></ul><p><strong>Oracle Problem：</strong></p><ul><li>データ品質の信頼性</li><li>価格操作への耐性</li><li>単一障害点リスク</li><li>レイテンシーの最小化</li></ul>'
    },
    {
      id: 'q12',
      question: 'DeFi の「Composability」（組み合わせ可能性）の最大の価値は？',
      options: [
        '取引手数料の削減',
        '異なるプロトコルを組み合わせた新しい金融商品の創造',
        'より高速なトランザクション処理',
        'ユーザーインターフェースの統一'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：異なるプロトコルを組み合わせた新しい金融商品の創造</strong></p><p><strong>Composability</strong>は、DeFiの<strong>「マネーレゴ」</strong>とも呼ばれる革新的特徴です。</p><p><strong>組み合わせ例：</strong></p><ul><li><strong>Compound + Uniswap</strong>：借入→スワップ→再投資</li><li><strong>MakerDAO + Aave</strong>：DAI発行→他プロトコルで運用</li><li><strong>Yearn + Curve</strong>：自動最適化されたステーブルコイン運用</li><li><strong>Flash Loan + DEX</strong>：無担保アービトラージ</li></ul><p><strong>イノベーションの源泉：</strong></p><ul><li><strong>無限の組み合わせ</strong>：プロトコル数の増加とともに指数的拡大</li><li><strong>相互運用性</strong>：標準的なインターフェース</li><li><strong>オープンソース</strong>：誰でも構築・改良可能</li><li><strong>許可不要</strong>：中央機関の承認不要</li></ul><p><strong>新商品例：</strong>Leveraged Yield Farming, Self-Repaying Loans, Automated Portfolio Rebalancing</p><p>従来金融では不可能だった<strong>革新的金融商品</strong>の創造が可能になります。</p>'
    }
  ]
}