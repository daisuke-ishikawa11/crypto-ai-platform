import { Test } from '../../types'

export const test2: Test = {
  id: 'defi-nft-test-2',
  categoryId: 'defi-nft',
  title: '高度なNFTトレーディングと分析：確認テスト2（レッスン6-10）',
  description: 'NFTの高度な取引戦略、分析手法、評価方法に関する理解度を確認します',
  questions: [
    {
      id: 'q1',
      question: 'NFT分析における「Rarity Score」の計算で最も重要な要素は？',
      options: [
        '価格の高さ',
        '各属性の出現頻度の逆数',
        '作成者の知名度',
        'コミュニティの人気度'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：各属性の出現頻度の逆数</strong></p><p><strong>Rarity Score</strong>は、NFTの希少性を数値化する指標で、各属性の出現頻度に基づいて計算されます。</p><p><strong>計算方法：</strong></p><ul><li>各属性の出現頻度を算出</li><li>1/頻度でスコア化</li><li>全属性のスコアを合計</li><li>コレクション内でランキング</li></ul><p><strong>例：</strong>背景が赤色（1%の出現頻度）の場合：1/0.01 = 100ポイント</p><p><strong>主要ツール：</strong></p><ul><li>Rarity.tools</li><li>Rarity Sniper</li><li>trait sniper</li></ul><p>ただし、希少性と市場価値は必ずしも一致しないことに注意が必要です。</p>'
    },
    {
      id: 'q2',
      question: 'NFTのフリッピング（転売）戦略で「Sweep the Floor」の意味は？',
      options: [
        '最高額で複数購入する',
        '最安値のNFTを大量購入する',
        'ランダムに複数購入する',
        '中間価格帯で購入する'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：最安値のNFTを大量購入する</strong></p><p><strong>「Sweep the Floor」</strong>は、フロアプライス（最安値）付近のNFTを<strong>大量に購入</strong>する戦略です。</p><p><strong>目的：</strong></p><ul><li>フロアプライスの引き上げ</li><li>供給量の減少による価格上昇</li><li>市場操作的な効果</li><li>コミュニティへの強気シグナル</li></ul><p><strong>リスク：</strong></p><ul><li>大量の資金が必要</li><li>流動性リスク</li><li>価格操作の疑い</li><li>単独では効果が限定的</li></ul><p><strong>実行タイミング：</strong></p><ul><li>ポジティブなニュース発表前</li><li>市場全体の回復期</li><li>コミュニティの盛り上がり時</li></ul>'
    },
    {
      id: 'q3',
      question: 'NFTの「Paper Hands」と「Diamond Hands」について正しい説明は？',
      options: [
        'Paper Handsは長期保有、Diamond Handsは短期売買',
        'Paper Handsは短期売買、Diamond Handsは長期保有',
        'Paper Handsは高額取引、Diamond Handsは少額取引',
        'Paper Handsは新規参入、Diamond Handsは経験者'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：Paper Handsは短期売買、Diamond Handsは長期保有</strong></p><p>これらは投資家の<strong>保有期間に対する姿勢</strong>を表現する用語です。</p><p><strong>Paper Hands（紙の手）：</strong></p><ul><li>価格変動で容易に売却する</li><li>短期的な利益を重視</li><li>リスクを避ける傾向</li><li>市場の恐怖に反応しやすい</li></ul><p><strong>Diamond Hands（ダイヤの手）：</strong></p><ul><li>価格変動に関係なく長期保有</li><li>プロジェクトの将来性を信じる</li><li>短期的な損失を受け入れる</li><li>コミュニティの結束力が強い</li></ul><p><strong>市場への影響：</strong></p><ul><li>Diamond Handsが多い → 供給減少 → 価格安定</li><li>Paper Handsが多い → 売り圧力 → 価格下落</li></ul>'
    },
    {
      id: 'q4',
      question: 'NFTの「Wash Trading」を見抜く最も効果的な方法は？',
      options: [
        '価格の急激な上昇を確認する',
        '同じウォレット間での繰り返し取引パターンを調べる',
        'コレクションの人気度を確認する',
        'クリエイターの発言を確認する'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：同じウォレット間での繰り返し取引パターンを調べる</strong></p><p><strong>Wash Trading</strong>は、同一人物が複数のウォレットを使って<strong>人為的に取引量・価格を操作</strong>する不正行為です。</p><p><strong>検出方法：</strong></p><ul><li><strong>取引パターン分析</strong>：同じNFTが短期間で往復</li><li><strong>ウォレット分析</strong>：関連ウォレットの特定</li><li><strong>時間分析</strong>：不自然なタイミング</li><li><strong>価格分析</strong>：不合理な価格設定</li></ul><p><strong>分析ツール：</strong></p><ul><li>CryptoSlam</li><li>Nansen</li><li>DappRadar</li><li>オンチェーン分析</li></ul><p><strong>注意点：</strong>Wash Tradingは多くの法域で違法行為であり、投資判断を誤らせる要因となります。</p>'
    },
    {
      id: 'q5',
      question: 'NFTの「Snipe」戦略について最も正確な説明は？',
      options: [
        '最高額で即座に購入する',
        'ミント時に素早く購入する',
        '相場より安く出品されたNFTを素早く購入する',
        '人気のないNFTを大量購入する'
      ],
      correctAnswer: 2,
      explanation: '<p><strong>正解：相場より安く出品されたNFTを素早く購入する</strong></p><p><strong>Snipe（スナイプ）</strong>は、<strong>市場価格より大幅に安く出品されたNFT</strong>を素早く発見・購入する戦略です。</p><p><strong>発生理由：</strong></p><ul><li>売主の価格設定ミス</li><li>急いでの売却（緊急資金調達）</li><li>相場変動の認識ラグ</li><li>単位間違い（ETH/USD）</li></ul><p><strong>実行方法：</strong></p><ul><li><strong>Bot活用</strong>：自動監視・購入</li><li><strong>通知設定</strong>：Discord/Telegram</li><li><strong>多画面監視</strong>：複数マーケットプレイス</li><li><strong>高速通信</strong>：低レイテンシ環境</li></ul><p><strong>注意：</strong>競争が激しく、成功には技術・資金・運が必要です。</p>'
    },
    {
      id: 'q6',
      question: 'NFTの「Volume」（取引量）分析で最も注意すべき点は？',
      options: [
        '日間取引量のみを確認する',
        'Wash Trading の影響を除外する',
        '最高価格での取引のみを確認する',
        'マーケットプレイス手数料を確認する'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：Wash Trading の影響を除外する</strong></p><p>NFTの<strong>Volume（取引量）</strong>は健全性を示す重要指標ですが、<strong>人為的操作</strong>に注意が必要です。</p><p><strong>健全な取引量の特徴：</strong></p><ul><li>多様なウォレット間取引</li><li>合理的な価格水準</li><li>自然な時間分布</li><li>実際のコミュニティ活動と連動</li></ul><p><strong>疑わしい取引量：</strong></p><ul><li>急激で不自然な増加</li><li>同一ウォレット間の往復</li><li>不合理な価格での取引</li><li>コミュニティ活動との乖離</li></ul><p><strong>分析のポイント：</strong></p><ul><li><strong>Organic Volume</strong>：実際のユーザー間取引</li><li><strong>Unique Traders</strong>：実際の取引参加者数</li><li><strong>Average Sale Price</strong>：健全な価格水準</li></ul>'
    },
    {
      id: 'q7',
      question: 'NFT分析における「Holder Distribution」の理想的な状態は？',
      options: [
        '1人が全体の50%以上を保有',
        '上位10%が全体の90%を保有',
        '比較的分散された保有状況',
        'クリエイターが全体の30%を保有'
      ],
      correctAnswer: 2,
      explanation: '<p><strong>正解：比較的分散された保有状況</strong></p><p><strong>Holder Distribution（保有者分布）</strong>は、NFTコレクションの<strong>健全性と持続性</strong>を示す重要指標です。</p><p><strong>理想的な分布：</strong></p><ul><li>大口保有者（Whales）：10-20%</li><li>中規模保有者：30-40%</li><li>小口保有者：40-50%</li><li>多様なウォレットに分散</li></ul><p><strong>問題のある分布：</strong></p><ul><li><strong>極端な集中</strong>：価格操作リスク</li><li><strong>創設者の大量保有</strong>：ダンプリスク</li><li><strong>Bot保有の疑い</strong>：人為的な需要</li></ul><p><strong>分析ツール：</strong></p><ul><li>NFT Inspect</li><li>Icy Tools</li><li>OpenSea Analytics</li><li>etherscan.io</li></ul>'
    },
    {
      id: 'q8',
      question: 'NFTの「Dead Cat Bounce」現象について正しい説明は？',
      options: [
        '新規NFTの価格が急騰する現象',
        '下落後の一時的な反発で再度下落する現象',
        'NFTが完売後に価格が安定する現象',
        'クリエイターがNFTを買い戻す現象'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：下落後の一時的な反発で再度下落する現象</strong></p><p><strong>Dead Cat Bounce</strong>は、大幅下落後の<strong>一時的な反発</strong>で、その後再び下落トレンドに戻る現象です。</p><p><strong>発生メカニズム：</strong></p><ul><li>oversold状態からの技術的反発</li><li>「底値拾い」の投機的買い</li><li>短期的な需給バランス調整</li><li>心理的サポートレベルでの反発</li></ul><p><strong>見分け方：</strong></p><ul><li><strong>取引量</strong>：反発時の出来高が少ない</li><li><strong>持続性</strong>：数日で再下落</li><li><strong>基本的要因</strong>：改善されていない</li><li><strong>市場センチメント</strong>：根本的に悲観的</li></ul><p><strong>投資戦略：</strong></p><ul><li>反発を売り機会として活用</li><li>真の底値まで待機</li><li>基本的分析を重視</li></ul>'
    },
    {
      id: 'q9',
      question: 'NFTの「Trait Sniper」とは何を指しますか？',
      options: [
        'NFTの作成者を狙撃する行為',
        '特定の属性を持つNFTを狙って購入する戦略',
        'NFTの価格を下落させる行為',
        'NFTのメタデータを改変する行為'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：特定の属性を持つNFTを狙って購入する戦略</strong></p><p><strong>Trait Sniper</strong>は、<strong>特定の希少属性</strong>を持つNFTを戦略的に購入する手法です。</p><p><strong>戦略の要素：</strong></p><ul><li><strong>属性分析</strong>：希少性とトレンド把握</li><li><strong>価格分析</strong>：適正価格の判断</li><li><strong>タイミング</strong>：購入機会の見極め</li><li><strong>組み合わせ</strong>：複数属性の相乗効果</li></ul><p><strong>狙う属性例：</strong></p><ul><li>極めて希少な属性（<1%）</li><li>コミュニティで人気の属性</li><li>将来的に価値が上がりそうな属性</li><li>「Golden」「Legendary」等の特別属性</li></ul><p><strong>分析ツール：</strong></p><ul><li>Rarity.tools</li><li>OpenRarity</li><li>Moby.gg</li></ul><p>成功には市場トレンドと属性価値の深い理解が必要です。</p>'
    },
    {
      id: 'q10',
      question: 'NFTフリッピングにおける「Pump and Dump」の典型的パターンは？',
      options: [
        '段階的な価格上昇と維持',
        '人為的な価格上昇後の急速な売り抜け',
        '価格の自然な変動パターン',
        '長期的な価値向上'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：人為的な価格上昇後の急速な売り抜け</strong></p><p><strong>Pump and Dump</strong>は、<strong>人為的に価格を押し上げて高値で売り抜ける</strong>市場操作です。</p><p><strong>典型的なパターン：</strong></p><ol><li><strong>Accumulation</strong>：密かに大量購入</li><li><strong>Promotion</strong>：誇大宣伝で注目集め</li><li><strong>Pump</strong>：急激な価格上昇</li><li><strong>Distribution</strong>：高値で売り抜け</li><li><strong>Dump</strong>：価格急落</li></ol><p><strong>見分け方：</strong></p><ul><li>根拠のない異常な価格上昇</li><li>組織的なSNS宣伝</li><li>突然の大量取引</li><li>基本的価値との乖離</li></ul><p><strong>対策：</strong></p><ul><li>基本分析の重視</li><li>感情的判断の回避</li><li>異常パターンの認識</li><li>独立した情報収集</li></ul><p><strong>注意：</strong>多くの国で違法行為です。</p>'
    },
    {
      id: 'q11',
      question: 'NFT市場における「FOMO」（Fear of Missing Out）の対策として最も効果的なのは？',
      options: [
        'トレンドに従って即座に購入する',
        '事前に投資計画と予算を設定する',
        'SNSの情報を常時監視する',
        '他の投資家の行動を真似する'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：事前に投資計画と予算を設定する</strong></p><p><strong>FOMO（Fear of Missing Out）</strong>は、<strong>機会損失への恐怖</strong>から非合理的な投資判断を引き起こします。</p><p><strong>効果的なFOMO対策：</strong></p><ul><li><strong>投資予算の事前設定</strong>：月間・年間の上限決定</li><li><strong>リスク許容度の明確化</strong>：損失可能額の設定</li><li><strong>判断基準の標準化</strong>：購入基準のチェックリスト</li><li><strong>冷却期間の設定</strong>：即座の判断を避ける</li></ul><p><strong>心理的対策：</strong></p><ul><li><strong>機会は無限</strong>：次のチャンスがある</li><li><strong>損失回避</strong>：利益より損失回避を重視</li><li><strong>基本分析重視</strong>：感情より論理</li><li><strong>記録の維持</strong>：判断の振り返り</li></ul><p>計画的なアプローチが長期的成功の鍵です。</p>'
    },
    {
      id: 'q12',
      question: 'NFT投資におけるリスク管理で「Position Sizing」について正しいのは？',
      options: [
        '全資金を1つのNFTに集中投資する',
        'ポートフォリオ全体の5-10%を1つのNFTに投資する',
        '借金してでも大きなポジションを取る',
        '価格に関係なく同じ金額を投資する'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：ポートフォリオ全体の5-10%を1つのNFTに投資する</strong></p><p><strong>Position Sizing</strong>は、<strong>リスク管理の根幹</strong>となる投資額の決定方法です。</p><p><strong>推奨する配分：</strong></p><ul><li><strong>単一NFT</strong>：ポートフォリオの5-10%以下</li><li><strong>NFT全体</strong>：総資産の10-20%以下</li><li><strong>投機的投資</strong>：さらに保守的に</li><li><strong>実験的購入</strong>：1-2%程度</li></ul><p><strong>配分の考慮要素：</strong></p><ul><li>リスク許容度</li><li>投資経験</li><li>収入安定性</li><li>NFTの品質・希少性</li><li>市場環境</li></ul><p><strong>避けるべき行為：</strong></p><ul><li>全額投資（All-in）</li><li>借金での投資</li><li>生活費での投資</li><li>感情的なサイジング</li></ul>'
    }
  ]
}