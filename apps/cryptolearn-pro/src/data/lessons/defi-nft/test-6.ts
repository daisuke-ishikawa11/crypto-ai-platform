import { Test } from '../../types'

export const test6: Test = {
  id: 'defi-nft-test-6',
  categoryId: 'defi-nft',
  title: 'NFTファイナンスとGameFi：確認テスト6（レッスン26-30）',
  description: 'NFTファイナンス、GameFi、Play-to-Earnエコシステムに関する理解度を確認します',
  questions: [
    {
      id: 'q1',
      question: 'NFT担保融資における「Loan-to-Value（LTV）」比率の適切な設定で最も重要な考慮要素は？',
      options: [
        'NFTの初期購入価格',
        'NFTの流動性とボラティリティ',
        'クリエイターの知名度',
        '貸付プラットフォームの人気度'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：NFTの流動性とボラティリティ</strong></p><p><strong>LTV（Loan-to-Value）</strong>比率は、<strong>リスク管理の核心</strong>となる指標です。</p><p><strong>流動性の重要性：</strong></p><ul><li><strong>売却可能性</strong>：デフォルト時の担保処分の容易さ</li><li><strong>価格発見</strong>：適正な市場価格の存在</li><li><strong>取引コスト</strong>：売却時の手数料・スリッページ</li><li><strong>時間要素</strong>：売却完了までの期間</li></ul><p><strong>ボラティリティの影響：</strong></p><ul><li><strong>価格変動リスク</strong>：担保価値の急激な変化</li><li><strong>清算閾値</strong>：適切なバッファーの必要性</li><li><strong>リスクプレミアム</strong>：変動率に応じた金利調整</li></ul><p><strong>実際の設定例：</strong></p><ul><li><strong>Blue Chip NFT</strong>：40-50% LTV（流動性高・ボラティリティ中）</li><li><strong>中級NFT</strong>：20-30% LTV（流動性中・ボラティリティ高）</li><li><strong>新興NFT</strong>：10-20% LTV（流動性低・ボラティリティ極高）</li></ul>'
    },
    {
      id: 'q2',
      question: 'GameFiにおける「Play-to-Earn」の持続可能性を保つ最も重要な要素は？',
      options: [
        '新規プレイヤーの継続的な参入',
        'ゲーム内経済とゲームプレイの楽しさの両立',
        '高いトークン報酬率の維持',
        'NFT価格の継続的な上昇'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：ゲーム内経済とゲームプレイの楽しさの両立</strong></p><p><strong>持続可能なP2E</strong>は、<strong>内在価値</strong>に基づく必要があります。</p><p><strong>楽しさの重要性：</strong></p><ul><li><strong>プレイ動機</strong>：報酬以外の参加理由</li><li><strong>継続性</strong>：経済的下落期でも継続参加</li><li><strong>口コミ効果</strong>：自然な拡散による成長</li><li><strong>コミュニティ形成</strong>：強固なプレイヤーベース</li></ul><p><strong>経済設計の要素：</strong></p><ul><li><strong>Token Sink</strong>：トークンの消費機会創出</li><li><strong>Value Creation</strong>：ゲーム内活動による価値生成</li><li><strong>Balanced Economy</strong>：インフレ・デフレの制御</li><li><strong>Multiple Revenue Streams</strong>：多様な収益源</li></ul><p><strong>失敗パターン：</strong></p><ul><li>報酬のみに依存→新規参入停止で崩壊</li><li>ゲーム性軽視→飽きられて離脱</li><li>短期最適化→長期持続性の欠如</li></ul><p><strong>成功事例：</strong>Axie Infinity の初期成功は楽しいゲームプレイとバランスの取れた経済の組み合わせでした。</p>'
    },
    {
      id: 'q3',
      question: 'NFTの「Fractionalization」（分割化）において最も複雑な技術的課題は？',
      options: [
        '初期価格の設定',
        '分割されたシェアの議決権と意思決定メカニズム',
        'プラットフォーム手数料の設定',
        '税務処理の複雑さ'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：分割されたシェアの議決権と意思決定メカニズム</strong></p><p><strong>NFT Fractionalization</strong>では、<strong>分散所有による意思決定</strong>が最大の課題です。</p><p><strong>議決権の複雑さ：</strong></p><ul><li><strong>売却決定</strong>：何％の合意で売却可能か</li><li><strong>価格決定</strong>：売却価格の決定メカニズム</li><li><strong>利用権</strong>：NFTの展示・貸出・商用利用権</li><li><strong>分割比率変更</strong>：追加分割・統合の可否</li></ul><p><strong>技術的実装の課題：</strong></p><ul><li><strong>Voting Mechanism</strong>：投票システムの設計</li><li><strong>Quorum Requirements</strong>：最低参加率の設定</li><li><strong>Time Lock</strong>：重要決定の待機期間</li><li><strong>Exit Rights</strong>：少数派の権利保護</li></ul><p><strong>解決アプローチ：</strong></p><ul><li><strong>Buyout Clause</strong>：一定価格での強制売却権</li><li><strong>Shotgun Clause</strong>：相互買取オプション</li><li><strong>Weighted Voting</strong>：保有比率による重み付け</li><li><strong>Delegation</strong>：専門家への委任制度</li></ul>'
    },
    {
      id: 'q4',
      question: 'GameFiの「Scholarship」システムで最も重要な要素は？',
      options: [
        '高い報酬分配率',
        '透明で公平な収益分配メカニズム',
        'NFTの無料貸出',
        '参加者数の制限'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：透明で公平な収益分配メカニズム</strong></p><p><strong>Scholarship システム</strong>は、NFT貸出による<strong>相互利益モデル</strong>です。</p><p><strong>システム参加者：</strong></p><ul><li><strong>Scholar（借用者）</strong>：NFTを借りてゲームプレイ</li><li><strong>Manager（貸出者）</strong>：NFTを保有・貸出</li><li><strong>Guild（仲介者）</strong>：マッチング・管理</li></ul><p><strong>公平分配の重要性：</strong></p><ul><li><strong>持続的参加</strong>：全員が納得する分配比率</li><li><strong>信頼関係</strong>：透明性による信頼構築</li><li><strong>パフォーマンス連動</strong>：努力に応じた報酬</li><li><strong>リスク分担</strong>：損失時の負担分担</li></ul><p><strong>一般的分配モデル：</strong></p><ul><li><strong>Scholar</strong>：40-60%（プレイ報酬）</li><li><strong>Manager</strong>：30-40%（NFT提供）</li><li><strong>Guild</strong>：10-20%（管理・サポート）</li></ul><p><strong>成功要因：</strong></p><ul><li>明確な契約条件</li><li>自動分配システム</li><li>パフォーマンス追跡</li><li>紛争解決メカニズム</li></ul>'
    },
    {
      id: 'q5',
      question: 'NFT Lending プロトコルにおける「Dutch Auction」清算の主な利点は？',
      options: [
        '清算価格が必ず最高値になる',
        '時間とともに価格が下がり、適正価格で迅速に清算される',
        '借入者が清算を回避できる',
        'ガス代が最も安くなる'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：時間とともに価格が下がり、適正価格で迅速に清算される</strong></p><p><strong>Dutch Auction</strong>は、<strong>効率的価格発見</strong>と<strong>迅速清算</strong>を両立させる仕組みです。</p><p><strong>Dutch Auctionの仕組み：</strong></p><ol><li><strong>高値開始</strong>：フロアプライス以上で開始</li><li><strong>時間減価</strong>：一定時間ごとに価格下落</li><li><strong>購入実行</strong>：誰かが現在価格で購入</li><li><strong>即座完了</strong>：購入時点で清算完了</li></ol><p><strong>利点：</strong></p><ul><li><strong>迅速性</strong>：長期間の売れ残りを防止</li><li><strong>適正価格</strong>：市場の真の需要を反映</li><li><strong>MEV耐性</strong>：Front-runningの利益削減</li><li><strong>予測可能性</strong>：価格減少が予測可能</li></ul><p><strong>従来手法との比較：</strong></p><ul><li><strong>固定価格</strong>：売れ残りリスク大</li><li><strong>English Auction</strong>：時間がかかる</li><li><strong>Dutch Auction</strong>：効率的・迅速</li></ul><p><strong>実装例：</strong>PWN、NFTfi等のプロトコルで採用されています。</p>'
    },
    {
      id: 'q6',
      question: 'GameFi における「Token Economy」設計で最も避けるべき構造は？',
      options: [
        '複数トークンシステム',
        'ステーキング機能の実装',
        '新規プレイヤー依存の Ponzi 構造',
        'NFTとトークンの組み合わせ'
      ],
      correctAnswer: 2,
      explanation: '<p><strong>正解：新規プレイヤー依存の Ponzi 構造</strong></p><p><strong>Ponzi構造</strong>は、新規参加者の資金で既存参加者に報酬を支払う<strong>持続不可能</strong>なモデルです。</p><p><strong>危険な構造の特徴：</strong></p><ul><li><strong>新規依存</strong>：新規プレイヤーの参入金で既存報酬を支払</li><li><strong>無制限発行</strong>：裏付けのないトークン発行</li><li><strong>高利回り約束</strong>：現実的でない報酬率</li><li><strong>価値創造なし</strong>：実際の付加価値なし</li></ul><p><strong>持続可能な設計原則：</strong></p><ul><li><strong>Value Creation</strong>：ゲーム自体が価値を生成</li><li><strong>Token Sink</strong>：トークンの消費機会</li><li><strong>Real Utility</strong>：トークンの実用性</li><li><strong>External Revenue</strong>：外部収益源の確保</li></ul><p><strong>健全な収益源：</strong></p><ul><li><strong>NFT取引手数料</strong>：マーケットプレイス収益</li><li><strong>ゲーム内課金</strong>：アイテム購入・アップグレード</li><li><strong>広告・スポンサー</strong>：企業との提携</li><li><strong>ライセンシング</strong>：IP・キャラクターの商用利用</li></ul><p><strong>警告サイン：</strong>「確実に稼げる」「高利回り保証」等の謳い文句は危険です。</p>'
    },
    {
      id: 'q7',
      question: 'NFT レンタルシステムで「ERC-4907」規格の最大の革新は？',
      options: [
        'レンタル料金の自動徴収',
        '利用者と所有者の権利を技術的に分離',
        'レンタル期間の自動延長',
        'マルチチェーン対応'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：利用者と所有者の権利を技術的に分離</strong></p><p><strong>ERC-4907</strong>は、NFTに<strong>「利用権」</strong>の概念を導入する革新的規格です。</p><p><strong>権利分離の仕組み：</strong></p><ul><li><strong>Owner（所有者）</strong>：NFTの最終的な所有権</li><li><strong>User（利用者）</strong>：一時的な利用権</li><li><strong>自動期限</strong>：指定期間後に利用権自動失効</li><li><strong>技術保証</strong>：スマートコントラクトによる強制</li></ul><p><strong>従来の課題解決：</strong></p><ul><li><strong>信頼問題</strong>：返却されない可能性</li><li><strong>手動管理</strong>：期限管理の人的負担</li><li><strong>紛争リスク</strong>：返却拒否・紛失</li><li><strong>利用証明</strong>：利用権の第三者証明</li></ul><p><strong>応用例：</strong></p><ul><li><strong>ゲーム内NFT</strong>：一時的な装備貸出</li><li><strong>メタバース土地</strong>：期間限定利用権</li><li><strong>音楽・動画NFT</strong>：視聴権の時限付与</li><li><strong>アートNFT</strong>：展示権の貸出</li></ul><p>この技術により、<strong>安全で効率的なNFTレンタルエコシステム</strong>が実現可能になります。</p>'
    },
    {
      id: 'q8',
      question: 'Play-to-Earn における「Grinding Economy」の最適なバランス設計は？',
      options: [
        '時間投入量に比例した線形報酬',
        'スキルと時間の両方を評価する報酬システム',
        '完全にランダムな報酬分配',
        '上級者のみが稼げるシステム'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：スキルと時間の両方を評価する報酬システム</strong></p><p><strong>バランス設計</strong>は、P2Eの<strong>健全性と持続性</strong>の鍵です。</p><p><strong>時間のみの問題点：</strong></p><ul><li><strong>Bot問題</strong>：自動化による不正取得</li><li><strong>労働化</strong>：ゲームが単純作業に</li><li><strong>報酬インフレ</strong>：無制限の時間投入</li><li><strong>楽しさ欠如</strong>：機械的な繰り返し</li></ul><p><strong>スキル重視の利点：</strong></p><ul><li><strong>Bot耐性</strong>：複雑な判断が必要</li><li><strong>差別化</strong>：プレイヤーの技術向上動機</li><li><strong>競争要素</strong>：ゲーム性の向上</li><li><strong>報酬制限</strong>：自然な報酬上限</li></ul><p><strong>理想的な組み合わせ：</strong></p><ul><li><strong>基本報酬</strong>：最低限の時間投入報酬</li><li><strong>スキルボーナス</strong>：優秀な成績への追加報酬</li><li><strong>イベント報酬</strong>：特別な達成への報酬</li><li><strong>ランダム要素</strong>：適度な運の要素</li></ul><p><strong>実装例：</strong>Axie Infinityの Arena（PvP）とAdventure（PvE）の組み合わせ</p>'
    },
    {
      id: 'q9',
      question: 'NFT-backed DeFi において「Price Oracle」設計で最も困難な課題は？',
      options: [
        'リアルタイム価格更新',
        '流動性の低いNFTの適正価格算出',
        'ガス代の最適化',
        'マルチチェーン対応'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：流動性の低いNFTの適正価格算出</strong></p><p><strong>NFT Price Oracle</strong>は、<strong>非代替性と低流動性</strong>により従来の価格算出が困難です。</p><p><strong>NFT価格算出の困難さ：</strong></p><ul><li><strong>取引頻度</strong>：暗号通貨と比較して極めて低い</li><li><strong>価格発見</strong>：最後の取引が古い・特殊事情</li><li><strong>個別性</strong>：同一コレクションでも大幅な価格差</li><li><strong>操作可能性</strong>：少数取引での価格操作</li></ul><p><strong>価格算出手法：</strong></p><ul><li><strong>Floor Price</strong>：最低出品価格（流動性考慮）</li><li><strong>TWAP</strong>：時間加重平均価格</li><li><strong>Trait-based Pricing</strong>：属性別価格モデル</li><li><strong>Machine Learning</strong>：AI価格予測モデル</li><li><strong>Appraisal DAO</strong>：専門家による評価</li></ul><p><strong>実装アプローチ：</strong></p><ul><li><strong>複数手法併用</strong>：異なる手法の組み合わせ</li><li><strong>保守的評価</strong>：安全マージンの確保</li><li><strong>更新頻度調整</strong>：コストと精度のバランス</li><li><strong>異常値検出</strong>：操作的価格の排除</li></ul>'
    },
    {
      id: 'q10',
      question: 'GameFi プロジェクトの「Token Vesting」で最も重要な設計原則は？',
      options: [
        'チーム配分を最大化する',
        'コミュニティと開発チームの利益を長期的に一致させる',
        'トークン価格を短期で最大化する',
        'ベスティング期間を最短にする'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：コミュニティと開発チームの利益を長期的に一致させる</strong></p><p><strong>Token Vesting</strong>は、<strong>長期的成功</strong>へのインセンティブ設計です。</p><p><strong>適切なVestingの目的：</strong></p><ul><li><strong>利益一致</strong>：全ステークホルダーの長期利益統合</li><li><strong>コミット保証</strong>：チームの長期コミットメント</li><li><strong>売り圧力軽減</strong>：急激なダンピング防止</li><li><strong>信頼構築</strong>：透明で公平な分配</li></ul><p><strong>設計要素：</strong></p><ul><li><strong>Cliff Period</strong>：初期ロック期間（通常6-12ヶ月）</li><li><strong>Vesting Duration</strong>：段階的解除期間（2-4年）</li><li><strong>Performance Milestone</strong>：達成目標との連動</li><li><strong>Early Termination</strong>：離脱時の条件</li></ul><p><strong>ステークホルダー配分例：</strong></p><ul><li><strong>Team & Advisors</strong>：15-25%（長期Vesting）</li><li><strong>Community & Players</strong>：40-60%（段階的配布）</li><li><strong>Ecosystem Development</strong>：10-20%（用途別Vesting）</li><li><strong>Private/Public Sale</strong>：10-25%（投資家保護）</li></ul><p><strong>成功指標：</strong>プロジェクトの長期的価値向上とコミュニティ満足度</p>'
    },
    {
      id: 'q11',
      question: 'NFT Perpetual（無期限契約）取引の最も革新的な特徴は？',
      options: [
        'レバレッジ取引の提供',
        'NFT価格への直接的なショート・ロングポジション',
        '24時間取引可能',
        '低い取引手数料'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：NFT価格への直接的なショート・ロングポジション</strong></p><p><strong>NFT Perpetual</strong>は、<strong>非流動的資産の流動的取引</strong>を可能にする革新です。</p><p><strong>革新性：</strong></p><ul><li><strong>ショート取引</strong>：NFT価格下落での利益獲得</li><li><strong>流動性創出</strong>：実際のNFT売買不要</li><li><strong>価格発見</strong>：より効率的な価格形成</li><li><strong>ヘッジ機能</strong>：NFT保有者のリスク管理</li></ul><p><strong>仕組み：</strong></p><ul><li><strong>Index Trading</strong>：NFTコレクション指数での取引</li><li><strong>Oracle Price</strong>：複数ソースからの価格取得</li><li><strong>Funding Rate</strong>：ロング・ショートの需給調整</li><li><strong>Settlement</strong>：現物決済または現金決済</li></ul><p><strong>活用例：</strong></p><ul><li><strong>Speculation</strong>：NFT価格の方向性予測</li><li><strong>Hedging</strong>：NFT保有者の価格下落ヘッジ</li><li><strong>Arbitrage</strong>：現物とPerp間の裁定取引</li><li><strong>Market Making</strong>：流動性提供による収益</li></ul><p><strong>プラットフォーム例：</strong>nftperp.xyz, Tribe3等が先駆的実装</p>'
    },
    {
      id: 'q12',
      question: 'GameFi における「NFT Utility Decay」を防ぐ最も効果的な戦略は？',
      options: [
        'NFT価格の人為的維持',
        '継続的なゲームコンテンツとメカニクスの進化',
        'NFT供給量の制限',
        '高額な取引手数料設定'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：継続的なゲームコンテンツとメカニクスの進化</strong></p><p><strong>Utility Decay</strong>は、時間経過によるNFTの<strong>実用価値低下</strong>現象です。</p><p><strong>Decay発生要因：</strong></p><ul><li><strong>ゲーム進化</strong>：新システムで旧NFTが陳腐化</li><li><strong>パワークリープ</strong>：より強力なアイテムの登場</li><li><strong>メタ変化</strong>：ゲームバランス調整による価値変動</li><li><strong>飽和状態</strong>：同種アイテムの過剰供給</li></ul><p><strong>継続的進化の手法：</strong></p><ul><li><strong>Upgradability</strong>：既存NFTの強化・進化システム</li><li><strong>Cross-game Utility</strong>：複数ゲーム間での利用</li><li><strong>Seasonal Content</strong>：定期的な新コンテンツ</li><li><strong>Backward Compatibility</strong>：旧NFTの新システム対応</li></ul><p><strong>成功事例：</strong></p><ul><li><strong>CryptoKitties</strong>：繁殖システムによる継続価値</li><li><strong>Axie Infinity</strong>：Land・Breeding等の機能拡張</li><li><strong>The Sandbox</strong>：創作ツールによるユーザー生成価値</li></ul><p><strong>設計原則：</strong>NFTを<strong>静的資産でなく動的資産</strong>として設計することが重要です。</p>'
    }
  ]
}