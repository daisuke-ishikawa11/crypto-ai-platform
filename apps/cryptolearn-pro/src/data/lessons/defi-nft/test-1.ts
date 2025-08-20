import { Test } from '../../types'

export const test1: Test = {
  id: 'defi-nft-test-1',
  categoryId: 'defi-nft',
  title: 'NFT基礎とマーケットプレイス：確認テスト1（レッスン1-5）',
  description: 'NFTの基本概念、作成方法、主要マーケットプレイスに関する理解度を確認します',
  questions: [
    {
      id: 'q1',
      question: 'NFT（Non-Fungible Token）の最も重要な特徴は何ですか？',
      options: [
        'すべて同じ価値を持つ',
        '分割可能である',
        '代替不可能で唯一性がある', 
        '無制限に発行できる'
      ],
      correctAnswer: 2,
      explanation: '<p><strong>正解：代替不可能で唯一性がある</strong></p><p>NFTの本質は「Non-Fungible（代替不可能）」という名称が示す通り、<strong>各トークンが唯一無二の識別可能な特性</strong>を持つことです。</p><p>これにより：</p><ul><li>デジタルアートの真正性証明が可能</li><li>所有権の明確な記録ができる</li><li>希少性の確立ができる</li><li>コレクターズアイテムとしての価値を持つ</li></ul>'
    },
    {
      id: 'q2', 
      question: 'NFTのメタデータが通常保存される場所として最も適切なのは？',
      options: [
        'ブロックチェーン上に直接保存',
        'IPFS（InterPlanetary File System）',
        'NFT作成者のサーバー',
        'マーケットプレイスのデータベース'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：IPFS（InterPlanetary File System）</strong></p><p>NFTのメタデータ（画像、音声、動画など）は通常<strong>IPFS</strong>に保存されます。</p><p><strong>IPFSの利点：</strong></p><ul><li>分散型ストレージで単一障害点がない</li><li>コンテンツのハッシュによる完全性保証</li><li>検閲耐性がある</li><li>永続性が高い</li></ul><p><strong>注意：</strong>ブロックチェーン上への直接保存はコストが高く、中央集権的なサーバーは単一障害点となるリスクがあります。</p>'
    },
    {
      id: 'q3',
      question: 'OpenSeaでNFTを購入する際の「Gas War」を避ける最も効果的な方法は？',
      options: [
        '常に最高額でガス代を設定する',
        'ガス代が安い時間帯を狙う',
        'オファー機能を使用する',
        '複数のウォレットを使い分ける'
      ],
      correctAnswer: 2,
      explanation: '<p><strong>正解：オファー機能を使用する</strong></p><p><strong>オファー機能</strong>を使用することで、「Gas War」（ガス代の競争入札）を避けることができます。</p><p><strong>オファー機能のメリット：</strong></p><ul><li>事前に価格を提示して売主の承諾を待つ</li><li>急いで取引する必要がない</li><li>ガス代を事前に予測できる</li><li>冷静な判断で購入できる</li></ul><p><strong>Gas War</strong>は人気NFTの発売時に発生し、ガス代が通常の10-100倍になることもあります。</p>'
    },
    {
      id: 'q4',
      question: 'NFTのロイヤリティ機能について最も正確な説明は？',
      options: [
        'すべてのNFTに自動的に適用される',
        'ブロックチェーンレベルで強制される',
        'マーケットプレイスごとに実装が異なる',
        '政府によって規制されている'
      ],
      correctAnswer: 2,
      explanation: '<p><strong>正解：マーケットプレイスごとに実装が異なる</strong></p><p>NFTのロイヤリティは<strong>技術的な標準ではなく、各マーケットプレイスの実装</strong>に依存します。</p><p><strong>現在の状況：</strong></p><ul><li>OpenSeaは段階的に廃止</li><li>Magic Edenは実装継続</li><li>LooksRareは部分的実装</li><li>X2Y2は独自システム</li></ul><p><strong>課題：</strong></p><ul><li>標準化されていない</li><li>回避が技術的に可能</li><li>クリエイターの収益に影響</li><li>業界内で議論が継続中</li></ul>'
    },
    {
      id: 'q5',
      question: 'NFTコレクションの「ジェネラティブアート」について最も正確な説明は？',
      options: [
        '手描きで一点ずつ作成されたアート',
        'AIが完全自動で生成したアート',
        'アルゴリズムで組み合わせを生成したアート',
        'コピーされたデジタルアート'
      ],
      correctAnswer: 2,
      explanation: '<p><strong>正解：アルゴリズムで組み合わせを生成したアート</strong></p><p><strong>ジェネラティブアート</strong>は、事前に準備されたパーツをアルゴリズムで組み合わせて大量生成するアート手法です。</p><p><strong>代表例：</strong></p><ul><li>CryptoPunks（10,000体）</li><li>Bored Ape Yacht Club（10,000体）</li><li>Azuki（10,000体）</li></ul><p><strong>特徴：</strong></p><ul><li>大量生産が可能</li><li>希少性の階層化</li><li>コミュニティ形成に適している</li><li>メタデータで特性が定義される</li></ul><p>これにより、一つのコレクションで数千〜数万のユニークなNFTを効率的に作成できます。</p>'
    },
    {
      id: 'q6',
      question: 'NFTマーケットプレイスにおける「Floor Price」の意味として正しいのは？',
      options: [
        'そのコレクションの平均価格',
        'そのコレクションの最高価格',
        'そのコレクションの最低出品価格',
        'そのコレクションの初期発行価格'
      ],
      correctAnswer: 2,
      explanation: '<p><strong>正解：そのコレクションの最低出品価格</strong></p><p><strong>Floor Price（フロアプライス）</strong>は、特定のNFTコレクションで<strong>現在出品されている最も安い価格</strong>です。</p><p><strong>重要な指標：</strong></p><ul><li>コレクションの市場価値の基準</li><li>エントリーレベルの投資額</li><li>コレクションの人気度を反映</li><li>流動性の指標</li></ul><p><strong>注意点：</strong></p><ul><li>売買が成立しなければ実際の価値ではない</li><li>急激な変動がある</li><li>品質の差を考慮しない</li><li>操作される可能性がある</li></ul>'
    },
    {
      id: 'q7',
      question: 'ERC-721とERC-1155の主要な違いは何ですか？',
      options: [
        'ERC-721は代替可能、ERC-1155は代替不可能',
        'ERC-721は単一トークン、ERC-1155は複数トークン対応',
        'ERC-721はイーサリアム専用、ERC-1155は他チェーン対応',
        'ERC-721は無料、ERC-1155は有料'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：ERC-721は単一トークン、ERC-1155は複数トークン対応</strong></p><p><strong>ERC-721：</strong></p><ul><li>単一のNFT標準</li><li>1つのコントラクト＝1つのトークンタイプ</li><li>シンプルで理解しやすい</li><li>多くのNFTで採用</li></ul><p><strong>ERC-1155：</strong></p><ul><li>複数トークン対応</li><li>1つのコントラクトで代替可能・不可能トークンを混在</li><li>ガス効率が良い</li><li>ゲーム業界で人気</li></ul><p><strong>使い分け：</strong></p><ul><li>単純なNFT → ERC-721</li><li>ゲーム・複合的用途 → ERC-1155</li></ul>'
    },
    {
      id: 'q8',
      question: 'NFTマーケットプレイスでの「Lazy Minting」の主な利点は？',
      options: [
        'NFTの品質が向上する',
        '作成時のガス代を節約できる',
        'ロイヤリティが自動設定される',
        'より多くのユーザーに表示される'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：作成時のガス代を節約できる</strong></p><p><strong>Lazy Minting</strong>は、NFTの実際のミント（発行）を<strong>初回販売時まで延期</strong>する仕組みです。</p><p><strong>メリット：</strong></p><ul><li>作成者のガス代負担がゼロ</li><li>売れない場合のリスク回避</li><li>大量作成時のコスト削減</li><li>環境負荷の軽減</li></ul><p><strong>仕組み：</strong></p><ol><li>メタデータとシグネチャのみ準備</li><li>マーケットプレイスに登録</li><li>購入時に実際にミント実行</li><li>購入者がガス代負担</li></ol><p>OpenSea、Rarible等の主要プラットフォームで採用されています。</p>'
    },
    {
      id: 'q9',
      question: 'NFTの「Revealed」と「Unrevealed」の概念について正しい説明は？',
      options: [
        'Revealedは公開済み、Unrevealedは秘密のNFT',
        'Revealedは高価格、Unrevealedは低価格',
        'Revealedは実際の画像表示、Unrevealedはプレースホルダー',
        'Revealedは転売可能、Unrevealedは転売不可'
      ],
      correctAnswer: 2,
      explanation: '<p><strong>正解：Revealedは実際の画像表示、Unrevealedは プレースホルダー</strong></p><p><strong>Reveal</strong>は、NFTの実際のメタデータ（画像など）を公開するプロセスです。</p><p><strong>Unrevealed段階：</strong></p><ul><li>統一されたプレースホルダー画像</li><li>実際の内容は秘匿状態</li><li>購入は「mystery box」状態</li><li>期待感と投機性が高い</li></ul><p><strong>Revealed段階：</strong></p><ul><li>実際の画像・属性が判明</li><li>希少性が確定</li><li>価格差が生まれる</li><li>二次市場が活性化</li></ul><p>多くのプロジェクトが段階的に公開し、コミュニティの関心を維持します。</p>'
    },
    {
      id: 'q10',
      question: 'NFT投資における「Blue Chip」コレクションの特徴として最も適切なのは？',
      options: [
        '最新の技術を使用している',
        '価格が安定している',
        '長期的な価値と強いコミュニティを持つ',
        '政府に認定されている'
      ],
      correctAnswer: 2,
      explanation: '<p><strong>正解：長期的な価値と強いコミュニティを持つ</strong></p><p><strong>Blue Chip NFT</strong>は、従来の株式投資の「優良株」概念をNFT市場に適用したものです。</p><p><strong>特徴：</strong></p><ul><li>確立されたブランド力</li><li>強固なコミュニティ</li><li>長期的な価値保持</li><li>高い流動性</li><li>文化的影響力</li></ul><p><strong>代表例：</strong></p><ul><li>CryptoPunks</li><li>Bored Ape Yacht Club</li><li>Art Blocks Curated</li><li>Azuki</li></ul><p><strong>投資観点：</strong></p><ul><li>比較的安定した価格動向</li><li>長期保有に適している</li><li>参入障壁が高い</li><li>ステータスシンボル的価値</li></ul>'
    },
    {
      id: 'q11',
      question: 'OpenSeaにおける「Collection Offer」と「Item Offer」の違いは？',
      options: [
        'Collection OfferはETH、Item OfferはWETH',
        'Collection Offerはコレクション全体、Item Offerは特定アイテム',
        'Collection Offerは高額、Item Offerは少額',
        'Collection Offerは即座実行、Item Offerは承諾待ち'
      ],
      correctAnswer: 1,
      explanation: '<p><strong>正解：Collection Offerはコレクション全体、Item Offerは特定アイテム</strong></p><p><strong>Collection Offer：</strong></p><ul><li>コレクション内の<strong>任意のアイテム</strong>に対する提案</li><li>売主が所有するアイテムから選択して売却可能</li><li>Floor Price付近での購入に有効</li><li>WETHで実行</li></ul><p><strong>Item Offer：</strong></p><ul><li><strong>特定のアイテム</strong>に対する提案</li><li>そのアイテムの所有者のみが承諾可能</li><li>希少性の高いアイテムに適用</li><li>WETHで実行</li></ul><p><strong>戦略的使い分け：</strong></p><ul><li>一般的購入 → Collection Offer</li><li>特定アイテム狙い → Item Offer</li></ul>'
    },
    {
      id: 'q12',
      question: 'NFTの「Utility」として最も一般的でないものは？',
      options: [
        'コミュニティへの参加権',
        '将来のエアドロップ権利',
        'NFTの自動価格上昇保証',
        '限定イベントへのアクセス権'
      ],
      correctAnswer: 2,
      explanation: '<p><strong>正解：NFTの自動価格上昇保証</strong></p><p><strong>価格上昇保証は不可能</strong>であり、このような約束をするプロジェクトは詐欺の可能性が高いです。</p><p><strong>一般的なNFT Utility：</strong></p><ul><li><strong>コミュニティ参加権</strong>：Discord等での専用チャンネル</li><li><strong>エアドロップ権利</strong>：トークンや新NFTの無料配布</li><li><strong>限定イベント</strong>：オフラインミートアップ、コンサート</li><li><strong>ゲーム内アイテム</strong>：Play-to-Earnゲーム</li><li><strong>コマーシャルライト</strong>：商用利用許可</li><li><strong>ガバナンス権</strong>：プロジェクト方針への投票</li></ul><p><strong>注意：</strong>Utilityの価値は主観的であり、実際に提供されるかは運営次第です。</p>'
    }
  ]
}