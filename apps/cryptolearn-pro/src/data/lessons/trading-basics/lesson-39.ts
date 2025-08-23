import type { Lesson } from '../../../types';

export const lesson39: Lesson = {
  id: 'trading-basics-derivatives-fundamentals-applications',
  slug: 'derivatives-fundamentals-applications',
  title: 'デリバティブ取引の基礎から応用：先物・オプション・スワップの活用戦略',
  description: 'デリバティブ取引の基本概念から始めて、先物・オプション・スワップの仕組み、実践的な投資戦略まで段階的に学習します。',
  categoryId: 'trading-basics',
  difficultyLevel: 'advanced',
  estimatedMinutes: 50,
  orderIndex: 39,
  isPublished: true,
  tags: ['デリバティブ', '先物取引', 'オプション', '実践応用'],
  
  content: {
    sections: [
      {
        type: 'text',
        content: `
          <h1>デリバティブ取引の基本理解</h1>
          
          <h2>デリバティブとは何か（基礎）</h2>
          <p><strong>デリバティブ（Derivatives）</strong>とは、株式・債券・暗号資産などの原資産（Underlying Asset）から派生した金融商品のことです。暗号資産市場においては、<strong>価格変動リスクの管理</strong>や<strong>投資機会の拡大</strong>、<strong>レバレッジ効果</strong>を活用した戦略的な投資が可能になります。</p>
          
          <h3>デリバティブの基本分類</h3>
          <div class="derivatives-types">
            <h4>先物取引（Futures）</h4>
            <ul>
              <li><strong>定義</strong>: 将来の特定日時に、事前に決められた価格で売買する契約</li>
              <li><strong>特徴</strong>: 標準化された契約、取引所で取引</li>
              <li><strong>暗号資産例</strong>: Bitcoin先物、Ethereum先物</li>
              <li><strong>用途</strong>: ヘッジ、投機、裁定取引</li>
            </ul>
            
            <h4>オプション取引（Options）</h4>
            <ul>
              <li><strong>定義</strong>: 将来の特定日時に、特定価格で売買する権利の取引</li>
              <li><strong>特徴</strong>: 権利であって義務ではない</li>
              <li><strong>種類</strong>: コール（買う権利）、プット（売る権利）</li>
              <li><strong>用途</strong>: リスクヘッジ、収益機会創出</li>
            </ul>
            
            <h4>スワップ取引（Swaps）</h4>
            <ul>
              <li><strong>定義</strong>: 一定期間にわたって、異なる条件での支払いを交換</li>
              <li><strong>特徴</strong>: 相対取引、カスタマイズ可能</li>
              <li><strong>暗号資産例</strong>: 金利スワップ、通貨スワップ</li>
              <li><strong>用途</strong>: 金利リスク・為替リスクのヘッジ</li>
            </ul>
          </div>
          
          <h3>デリバティブ取引の意義</h3>
          <div class="derivatives-significance">
            <h4>投資戦略における価値</h4>
            <ul>
              <li><strong>リスク管理</strong>: 価格下落リスクの軽減</li>
              <li><strong>収益機会</strong>: 上昇・下落両方向での利益追求</li>
              <li><strong>資本効率</strong>: 少ない資金で大きなポジション</li>
              <li><strong>ポートフォリオ最適化</strong>: 流動性とリスクの最適配分</li>
            </ul>
            
            <h4>暗号資産市場での特徴</h4>
            <ul>
              <li><strong>高ボラティリティ</strong>: デリバティブの効果的活用</li>
              <li><strong>24時間取引</strong>: 継続的なリスク管理</li>
              <li><strong>グローバル市場</strong>: 地域を超えた投資機会</li>
              <li><strong>新興市場</strong>: 商品の多様化・革新的機能</li>
            </ul>
          </div>
        `
      },
      {
        type: 'text',
        content: `<h1>先物取引の基礎から応用</h1>

<h2>暗号資産先物の基本仕組み（基礎）</h2>
<h3>先物契約の構成要素</h3>
<strong>Bitcoin先物を例とした基本構造</strong>

<h4>契約仕様（基礎）</h4>
<ul>
<li><strong>契約サイズ</strong>: 1契約 = 1 BTC（CME先物の場合）</li>
<li><strong>最小価格変動</strong>: $25（1ティック）</li>
<li><strong>限月</strong>: 3月・6月・9月・12月</li>
<li><strong>最終取引日</strong>: 限月第3金曜日</li>
<li><strong>決済方法</strong>: 現金決済（実物受渡しなし）</li>
</ul>

<h4>証拠金システム（基礎）</h4>
<ul>
<li><strong>初期証拠金</strong>: 契約価値の5-20%</li>
<li><strong>維持証拠金</strong>: 初期証拠金の80%程度</li>
<li><strong>追証（マージンコール）</strong>: 維持証拠金割れ時の追加入金</li>
<li><strong>強制決済</strong>: 証拠金不足時の自動清算</li>
</ul>

<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">主要な先物取引所と商品（応用）</h3>
<h3>2025年の主要先物市場</h3>

<h4>CME（Chicago Mercantile Exchange）</h4>
<strong>機関投資家向け標準</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>Bitcoin先物</strong>: 最も流動性の高い機関向け商品</li>
<li><strong>Ethereum先物</strong>: 2021年開始、急速に流動性向上</li>
<li><strong>最小契約</strong>: 1 BTC、50 ETH</li>
<li><strong>特徴</strong>: 厳格な規制、高い信頼性</li>
</ul>

<h4>Binance Futures</h4>
<strong>世界最大の暗号資産先物市場</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>取引量</strong>: 日次$500億以上（2025年1月）</li>
<li><strong>商品</strong>: 100種類以上の暗号資産先物</li>
<li><strong>レバレッジ</strong>: 最大125倍</li>
<li><strong>特徴</strong>: 高流動性、多様な商品</li>
</ul>

<h4>ByBit、OKX、Deribit</h4>
<strong>専門デリバティブ取引所</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>ByBit</strong>: アジア系、UIの分かりやすさ</li>
<li><strong>OKX</strong>: 多様な商品、高い技術力</li>
<li><strong>Deribit</strong>: オプション特化、機関投資家利用多数</li>
</ul>

<h2>先物取引の実践戦略</h2>

<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">ヘッジ戦略（応用）</h3>
<h3>現物保有リスクの軽減</h3>
<h4>完全ヘッジ戦略</h4>
<strong>シナリオ</strong>: 10 Bitcoin保有、価格下落リスクを軽減

<strong>ヘッジの実行</strong>
1. <strong>現物保有</strong>: 10 BTC（$95,000×10 = $950,000相当）
2. <strong>先物売り</strong>: 10枚のBitcoin先物を売建
3. <strong>価格下落時</strong>: 現物損失を先物利益で相殺
4. <strong>価格上昇時</strong>: 現物利益を先物損失で一部相殺

<strong>ヘッジ効果の計算</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>10%下落時</strong>: 現物損失$95,000、先物利益約$95,000</li>
<li><strong>10%上昇時</strong>: 現物利益$95,000、先物損失約$95,000</li>
<li><strong>結果</strong>: 価格変動リスクをほぼ完全に排除</li>
</ul>

<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">投機戦略（応用）</h3>
<h3>方向性予測による収益追求</h3>
<h4>強気ポジション構築</h4>
<strong>市場分析に基づく投機例</strong>

<strong>2025年3月想定シナリオ</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>現在価格</strong>: Bitcoin $88,000</li>
<li><strong>予測</strong>: 3ヶ月後$110,000到達</li>
<li><strong>根拠</strong>: ETF流入継続、金融緩和期待</li>
</ul>

<strong>先物戦略の実行</strong>
1. <strong>資金</strong>: $100,000の投資資金
2. <strong>レバレッジ</strong>: 5倍（証拠金20%）
3. <strong>ポジション</strong>: $500,000相当のBitcoin先物買い
4. <strong>ポジション数</strong>: 約5.7契約

<strong>損益シミュレーション</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>目標達成時</strong>: $110,000到達で25%上昇→利益$125,000</li>
<li><strong>10%下落時</strong>: $79,200で損失$50,000（ストップロス）</li>
<li><strong>リスクリターン</strong>: リワード2.5倍、リスク50%</li>
</ul>

<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">ベーシス取引（高度戦略）</h3>
<h3>現物・先物価格差の活用</h3>
<h4>順サヤ（コンタンゴ）時の戦略</h4>
<strong>価格関係</strong>: 先物価格 > 現物価格

<strong>アービトラージ戦略</strong>
1. <strong>現物買い</strong>: Bitcoin現物を購入
2. <strong>先物売り</strong>: 同じ数量の先物を売建
3. <strong>保有</strong>: 限月まで両ポジション保持
4. <strong>収益</strong>: 先物と現物の価格差が収益</div>`
      },
      {
        type: 'example',
        content: `<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">実践例：デリバティブ取引戦略の実行</h2>

<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">ケース1: Bitcoin先物を使ったヘッジ戦略（2025年2月想定）</h3>
<strong>状況</strong>: 50 Bitcoin保有、価格下落リスクを50%軽減したい
<strong>現在価格</strong>: Bitcoin $92,000

<strong>ヘッジ設計</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>現物保有</strong>: 50 BTC（$4,600,000相当）</li>
<li><strong>ヘッジ比率</strong>: 50%（半分のリスクを軽減）</li>
<li><strong>先物売り</strong>: 25枚のBitcoin先物（Binance Futures）</li>
<li><strong>証拠金</strong>: $460,000（10%証拠金率）</li>
</ul>

<strong>実行プロセス</strong>:
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">1週間後：10%下落発生</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>現物価値</strong>: $4,600,000 → $4,140,000（▲$460,000）</li>
<li><strong>先物利益</strong>: 25 BTC × $9,200 = $230,000</li>
<li><strong>実質損失</strong>: $460,000 - $230,000 = $230,000（50%軽減）</li>
</ul>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">1ヶ月後：5%回復</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>現物価値</strong>: $4,140,000 → $4,347,000（+$207,000）</li>
<li><strong>先物損失</strong>: 25 BTC × $4,600 = ▲$115,000</li>
<li><strong>実質利益</strong>: $207,000 - $115,000 = $92,000</li>
</ul>

<strong>ヘッジ効果評価</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>ボラティリティ</strong>: 50%軽減（目標達成）</li>
<li><strong>コスト</strong>: 先物手数料$2,000</li>
<li><strong>純効果</strong>: リスク軽減効果 - コスト = 高い有効性</li>
</ul>

<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">ケース2: Ethereum先物での投機戦略</h3>
<strong>投資額</strong>: $50,000
<strong>戦略</strong>: 強気相場での方向性ベット
<strong>予測期間</strong>: 2ヶ月

<strong>市場分析</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>現在価格</strong>: Ethereum $6,200</li>
<li><strong>目標価格</strong>: $8,500（37%上昇期待）</li>
<li><strong>根拠</strong>: Layer 2拡大、DeFi回復、ETF承認期待</li>
</ul>

<strong>レバレッジ戦略</strong>:
<div style="background: #1e293b; color: #f1f5f9; padding: 1rem; border-radius: 4px; font-family: monospace; margin: 1rem 0;">
投資金額: $50,000
レバレッジ: 4倍
ポジション価値: $200,000
契約数: 32.3 ETH先物 (Binance)
証拠金率: 25%
</div>

<strong>シナリオ分析</strong>:
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">楽観シナリオ（+37%上昇）</h4>
- <strong>価格</strong>: $6,200 → $8,500
- <strong>利益</strong>: $200,000 × 37% = $74,000
- <strong>ROI</strong>: 148%（2ヶ月）

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">中立シナリオ（+10%上昇）</h4>  
- <strong>価格</strong>: $6,200 → $6,820
- <strong>利益</strong>: $200,000 × 10% = $20,000
- <strong>ROI</strong>: 40%（2ヶ月）

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">悲観シナリオ（-15%下落）</h4>
- <strong>価格</strong>: $6,200 → $5,270
- <strong>損失</strong>: $200,000 × 15% = $30,000
- <strong>ROI</strong>: -60%

<strong>リスク管理</strong>:
- <strong>ストップロス</strong>: -12%（$60,000以下で損切り）
- <strong>利確</strong>: +25%で50%利確、+35%で残り利確
- <strong>最大損失</strong>: $30,000（投資額の60%）

<h3 style="color: #374151; margin: 1rem 0 0.5rem 0;">ケース3: オプション戦略の活用</h3>
<strong>戦略</strong>: Bitcoin Covered Call（現物保有 + コール売り）
<strong>目的</strong>: 保有現物から追加収益を獲得

<strong>ポジション構成</strong>:
- <strong>現物保有</strong>: 10 Bitcoin（$920,000、$92,000/BTC）
- <strong>コール売り</strong>: 行使価格$105,000、期限30日
- <strong>受取プレミアム</strong>: $15,000（1.5 BTC分）

<strong>戦略の狙い</strong>:
1. <strong>プレミアム収益</strong>: 確実に$15,000の収入
2. <strong>上限利益</strong>: 価格が$105,000まで上昇時の利益確保
3. <strong>下落保護</strong>: プレミアムによる小幅な下落耐性

<strong>結果シナリオ</strong>:
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">シナリオA: 価格$98,000で期限到来</h4>
- <strong>現物損益</strong>: ▲$40,000（価格下落）
- <strong>オプション利益</strong>: $15,000（プレミアム）
- <strong>総損益</strong>: ▲$25,000（損失軽減効果）

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">シナリオB: 価格$108,000で期限到来</h4>
- <strong>現物損益</strong>: $160,000（価格上昇）
- <strong>オプション損失</strong>: ▲$45,000（$108,000-$105,000）×10
- <strong>総損益</strong>: $130,000（上昇利益の一部放棄）

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">シナリオC: 価格$103,000で期限到来</h4>
- <strong>現物損益</strong>: $110,000（価格上昇）
- <strong>オプション利益</strong>: $15,000（プレミアム）
- <strong>総損益</strong>: $125,000（理想的結果）

<h3 style="color: #374151; margin: 1rem 0 0.5rem 0;">ケース4: 先物スプレッド取引</h3>
<strong>戦略</strong>: Calendar Spread（異なる限月の価格差活用）
<strong>対象</strong>: Bitcoin先物（3月限・6月限）

<strong>市場状況</strong>:
- <strong>3月限</strong>: $92,000
- <strong>6月限</strong>: $94,500
- <strong>価格差</strong>: $2,500（年率約11%）
- <strong>分析</strong>: 価格差が過大、収束期待

<strong>スプレッド戦略</strong>:
<div style="background: #1e293b; color: #f1f5f9; padding: 1rem; border-radius: 4px; font-family: monospace; margin: 1rem 0;">
ポジション:
- 3月限: 10契約買い（$920,000）
- 6月限: 10契約売り（$945,000）
- 初期収支: $25,000の受取
証拠金: $184,000（価格差証拠金適用）
</div>

<strong>収益シナリオ</strong>:
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">価格差縮小（$2,500→$1,000）</h4>
- <strong>3月限変動</strong>: 価格変動の影響受ける
- <strong>6月限変動</strong>: 価格変動の影響受ける
- <strong>スプレッド利益</strong>: $1,500×10契約 = $15,000
- <strong>総利益</strong>: $15,000（価格変動リスク軽減）

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">価格差拡大（$2,500→$3,500）</h4>
- <strong>スプレッド損失</strong>: $1,000×10契約 = $10,000
- <strong>リスク</strong>: 限定的損失

<strong>戦略評価</strong>:
- <strong>リスク</strong>: 低い（価格変動リスク軽減）
- <strong>リターン</strong>: 中程度（年率8-15%）
- <strong>適用場面</strong>: レンジ相場、低ボラティリティ期

<h3 style="color: #374151; margin: 1rem 0 0.5rem 0;">ケース5: 複合デリバティブ戦略</h3>
<strong>戦略</strong>: Synthetic Long Position（合成ロングポジション）
<strong>目的</strong>: 現物購入と同等効果を少ない資金で実現

<strong>戦略構成</strong>:
<div style="background: #1e293b; color: #f1f5f9; padding: 1rem; border-radius: 4px; font-family: monospace; margin: 1rem 0;">
ポジション:
1. コール買い: 行使価格$92,000、期限60日
2. プット売り: 行使価格$92,000、期限60日
投資額: $8,000（プレミアム支払い）
効果: 10 Bitcoin相当のロングポジション
</div>

<strong>現物購入との比較</strong>:
- <strong>現物購入</strong>: $920,000必要
- <strong>合成ポジション</strong>: $8,000で同等効果
- <strong>資本効率</strong>: 115倍の効率性

<strong>リスク・リターン</strong>:
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">価格上昇時（$92,000→$105,000）</h4>
- <strong>現物</strong>: $130,000利益
- <strong>合成</strong>: $130,000利益（ほぼ同等）
- <strong>ROI</strong>: 現物14% vs 合成1,625%

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">価格下落時（$92,000→$80,000）</h4>
- <strong>現物</strong>: $120,000損失
- <strong>合成</strong>: $120,000損失
- <strong>重要</strong>: 損失額は同じだが投資額比率では大きな違い

<strong>戦略の意義</strong>:
- <strong>資本効率</strong>: 同じ効果を少ない資金で実現
- <strong>機会創出</strong>: 余剰資金の他用途活用
- <strong>リスク</strong>: レバレッジ効果による高いリスク</div>`
      },
      {
        type: 'quiz',
        content: {
          question: 'デリバティブ取引の主要な目的として適切でないものはどれですか？',
          options: [
            'リスクヘッジ',
            '投機・収益追求',
            '資本効率の向上',
            '必ず利益を保証すること'
          ],
          correctAnswer: 3,
          explanation: 'デリバティブは利益を保証するものではありません。主な目的はリスク管理、投機、資本効率向上です。'
        }
      }
    ],
    quiz: [
      {
        question: '完全ヘッジ戦略の目的は何ですか？',
        options: [
          '利益を最大化すること',
          '価格変動リスクを排除すること',
          'レバレッジ効果を高めること',
          '取引回数を増やすること'
        ],
        correctAnswer: 1,
        explanation: '完全ヘッジは保有資産の価格変動リスクを相殺し、価格変動による損失を防ぐことが主目的です。'
      },
      {
        question: 'コンタンゴ状態で利益を得る戦略として正しいものはどれですか？',
        options: [
          '現物売り・先物買い',
          '現物買い・先物売り',
          '現物と先物の両方買い',
          '現物と先物の両方売り'
        ],
        correctAnswer: 1,
        explanation: 'コンタンゴ（先物価格>現物価格）時は、現物買い・先物売りで価格差が収束時に利益を得られます。'
      },
      {
        question: 'オプションのプレミアムに最も影響を与える要因は何ですか？',
        options: [
          '取引所の手数料',
          '原資産の価格変動率（ボラティリティ）',
          '投資家の年齢',
          '取引時間帯'
        ],
        correctAnswer: 1,
        explanation: 'オプションプレミアムは原資産のボラティリティに大きく影響され、ボラティリティが高いほどプレミアムも高くなります。'
      }
    ]
  }
}

export default lesson39
      {
        type: 'tip',
        content: `<strong>デリバティブ取引成功のコツ</strong>
1. <strong>段階的学習</strong>:
   - まず基本的な先物取引から開始
   - 小額での実践経験を積む
   - 理解度に応じて複雑な戦略に進歩
2. <strong>リスク管理重視</strong>:
   - ポジションサイズの適切な管理
   - ストップロスの設定と遵守
   - 証拠金管理の徹底
3. <strong>目的の明確化</strong>: ヘッジ目的か投機目的かを明確にし、それに適した戦略を選択することが重要！`
      },
      {
        type: 'text',
        content: `<h1>オプション取引の基礎から応用</h1>

<h2>オプションの基本概念（基礎）</h2>
<h3>コール・プットオプションの仕組み</h3>
<h4>コールオプション（買う権利）</h4>
<strong>基本構造</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>権利</strong>: 特定価格で原資産を購入する権利</li>
<li><strong>義務</strong>: なし（権利行使は任意）</li>
<li><strong>利益</strong>: 原資産価格上昇時に無制限</li>
<li><strong>損失</strong>: 支払ったプレミアムに限定</li>
</ul>

<strong>実例</strong>: Bitcoin $95,000コール、期間30日
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>プレミアム</strong>: $3,000</li>
<li><strong>損益分岐点</strong>: $98,000（行使価格+プレミアム）</li>
<li><strong>最大損失</strong>: $3,000（プレミアム）</li>
<li><strong>利益</strong>: $98,000超の上昇分すべて</li>
</ul>

<h4>プットオプション（売る権利）</h4>
<strong>基本構造</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>権利</strong>: 特定価格で原資産を売却する権利</li>
<li><strong>義務</strong>: なし（権利行使は任意）</li>
<li><strong>利益</strong>: 原資産価格下落時（行使価格まで）</li>
<li><strong>損失</strong>: 支払ったプレミアムに限定</li>
</ul>

<strong>実例</strong>: Bitcoin $90,000プット、期間30日
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>プレミアム</strong>: $2,500</li>
<li><strong>損益分岐点</strong>: $87,500（行使価格-プレミアム）</li>
<li><strong>最大損失</strong>: $2,500（プレミアム）</li>
<li><strong>最大利益</strong>: $87,500（価格がゼロになった場合）</li>
</ul>

<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">オプション価格決定要因（応用）</h3>
<h3>プレミアムを構成する要素</h3>
<h4>本質価値（Intrinsic Value）</h4>
<strong>計算方法</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>コール</strong>: max(現在価格 - 行使価格, 0)</li>
<li><strong>プット</strong>: max(行使価格 - 現在価格, 0)</li>
</ul>

<strong>例</strong>: Bitcoin価格$92,000、行使価格$90,000のコール
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>本質価値</strong>: $92,000 - $90,000 = $2,000</li>
<li><strong>意味</strong>: 即座に行使した場合の利益</li>
</ul>

<h4>時間価値（Time Value）</h4>
<strong>特徴</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>時間減価</strong>: 満期に近づくにつれて減少</li>
<li><strong>ボラティリティ</strong>: 高いほど時間価値も高い</li>
<li><strong>金利</strong>: 金利上昇でコール価値増加、プット価値減少</li>
</ul>

<strong>計算</strong>: 時間価値 = オプション価格 - 本質価値

<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">基本的なオプション戦略（応用）</h3>
<h3>単純戦略</h3>
<h4>Long Call（コール買い）</h4>
<strong>適用場面</strong>: 強気相場、大幅上昇期待
\`\`\`
戦略: Bitcoin $95,000コール購入
プレミアム: $4,000
期間: 45日
最大利益: 無制限（$99,000超で利益）
最大損失: $4,000
\`\`\`

<h4>Long Put（プット買い）</h4>
<strong>適用場面</strong>: 弱気相場、大幅下落期待
\`\`\`
戦略: Bitcoin $90,000プット購入
プレミアム: $3,500
期間: 45日
最大利益: $86,500（価格ゼロ時）
最大損失: $3,500
\`\`\`

<h3>高度な組み合わせ戦略</h3>
<h4>Straddle（ストラドル）</h4>
<strong>戦略</strong>: 同一行使価格のコール・プット同時購入
<strong>適用</strong>: 大きな価格変動期待、方向性不明

\`\`\`
構成:
- Bitcoin $92,000コール購入: $3,000
- Bitcoin $92,000プット購入: $3,000
総コスト: $6,000

利益条件:
- 上昇: $98,000超（$92,000 + $6,000）
- 下落: $86,000未満（$92,000 - $6,000）
\`\`\`

<h4>Iron Condor（アイアンコンドル）</h4>
<strong>戦略</strong>: レンジ相場での収益追求
<strong>構成</strong>: 4つのオプションの組み合わせ

\`\`\`
Bitcoin価格$92,000の場合:
1. $85,000プット売り: +$1,000
2. $88,000プット買い: -$2,000
3. $96,000コール売り: +$2,000
4. $99,000コール買い: -$1,000
純受取: $0（実際は小幅の利益）

利益ゾーン: $88,000-$96,000
最大利益: レンジ内での収益
最大損失: 限定的
\`\`\`

## スワップ取引の理解と活用

<h3 style="color: #374151; margin: 1rem 0 0.5rem 0;">金利スワップの基本（基礎）</h3>
<h3>暗号資産レンディングでの活用</h3>
<h4>基本構造</h4>
<strong>固定・変動金利の交換</strong>
- <strong>支払い</strong>: 固定金利（年率5%）
- <strong>受取り</strong>: 変動金利（現在年率3.5%）
- <strong>期間</strong>: 1年間
- <strong>元本</strong>: 100 Bitcoin相当

<strong>活用目的</strong>
- <strong>金利リスクヘッジ</strong>: 変動金利リスクの固定化
- <strong>収益最適化</strong>: 金利差による利益追求
- <strong>流動性管理</strong>: キャッシュフロー安定化

<h3 style="color: #374151; margin: 1rem 0 0.5rem 0;">クロス通貨スワップ（応用）</h3>
<h3>異なる暗号資産間の交換</h3>
<h4>Bitcoin-Ethereum スワップ例</h4>
\`\`\`
契約条件:
- Bitcoin支払い: 10 BTC @ $92,000 = $920,000
- Ethereum受取り: 148.4 ETH @ $6,200 = $920,080
- 期間: 6ヶ月
- 金利: BTC年率2.5% vs ETH年率4.0%

定期支払い:
- BTC金利支払い: 年率2.5%
- ETH金利受取り: 年率4.0%
- 金利差収益: 年率1.5%
\`\`\`

<strong>リスクと機会</strong>
- <strong>為替リスク</strong>: BTC/ETH比率変動
- <strong>金利リスク</strong>: 各通貨の金利変動
- <strong>流動性リスク</strong>: 中途解約の困難性

## デリバティブのリスク管理

<h3 style="color: #374151; margin: 1rem 0 0.5rem 0;">レバレッジリスクの管理</h3>
<h3>適切なポジションサイズ</h3>
<h4>リスク許容度に基づく設計</h4>
<strong>投資資金$100,000の場合</strong>
\`\`\`
保守的戦略:
- デリバティブ配分: 20%（$20,000）
- レバレッジ: 2-3倍まで
- 最大損失許容: 5%（$5,000）

積極的戦略:
- デリバティブ配分: 40%（$40,000）
- レバレッジ: 5-7倍まで
- 最大損失許容: 15%（$15,000）
\`\`\`

<h3 style="color: #374151; margin: 1rem 0 0.5rem 0;">流動性リスクの管理</h3>
<h3>取引所・商品選択</h3>
<h4>流動性チェック項目</h4>
<strong>取引前確認事項</strong>
- <strong>スプレッド</strong>: bid-ask スプレッドの確認
- <strong>出来高</strong>: 日次取引量の十分性
- <strong>オープンインタレスト</strong>: 建玉残高の安定性
- <strong>取引時間</strong>: 24時間取引の対応状況

<h3 style="color: #374151; margin: 1rem 0 0.5rem 0;">モデルリスクの理解</h3>
<h3>理論価格と実際価格の乖離</h3>
<h4>価格モデルの限界</h4>
<strong>Black-Scholesモデルの前提</strong>
- <strong>一定ボラティリティ</strong>: 実際は時間変動
- <strong>正規分布</strong>: 実際はファットテール分布
- <strong>無リスク金利</strong>: 実際は信用リスクあり
- <strong>継続取引</strong>: 実際は流動性の問題あり

<strong>対策</strong>
- <strong>複数モデル</strong>: 異なるモデルでの価格比較
- <strong>市場価格重視</strong>: 理論価格との乖離確認
- <strong>リスク管理</strong>: モデル限界の認識と対応`
      },
      {
        type: 'text',
        content: `
          <h1>理解度チェック</h1>
          <p>このセクションでは、デリバティブ取引の理解について確認してください。先物・オプション・スワップそれぞれの特徴を理解し、適切なリスク管理のもとで投資戦略に活用することが重要です。</p>
          
          <h3>重要なポイント</h3>
          <div class="understanding-check">
            <ul>
              <li><strong>基本理解</strong>：先物・オプション・スワップの基本的な仕組みと特徴</li>
              <li><strong>戦略活用</strong>：ヘッジ・投機・収益機会創出での適切な活用</li>
              <li><strong>リスク管理</strong>：レバレッジ・流動性・モデルリスクの適切な管理</li>
              <li><strong>実践応用</strong>：市場状況に応じた戦略選択と実行</li>
            </ul>
          </div>
        `
      },
      {
        type: 'warning',
        content: `<strong>デリバティブ取引の注意点</strong>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">1. レバレッジリスク</h3>
<strong>問題</strong>: 高いレバレッジによる急速な資金減少
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>投資資金に応じた適切なポジションサイズ</li>
<li>ストップロスの設定と厳格な実行</li>
<li>証拠金管理の徹底</li>
<li>市場状況に応じたレバレッジ調整</li>
</ul>

<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">2. 流動性リスク</h3>
<strong>問題</strong>: 取引したい時に取引できない、不利な価格での約定
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>十分な流動性のある商品・取引所選択</li>
<li>ビッド・アスクスプレッドの事前確認</li>
<li>大口取引時の分割執行</li>
<li>緊急時の決済方法の事前準備</li>
</ul>

<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">3. 複雑性による誤解</h3>
<strong>問題</strong>: 商品の仕組みを十分理解せずに取引
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>基本的な商品から段階的に学習</li>
<li>デモトレードでの十分な練習</li>
<li>小額での実践経験の蓄積</li>
<li>専門書籍・セミナーでの継続学習</li>
</ul>

<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">4. 時間価値の減価</h3>
<strong>問題</strong>: オプションの時間価値減少による損失
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>時間減価（タイムディケイ）の理解</li>
<li>適切な期間設定</li>
<li>ボラティリティ変化の考慮</li>
<li>早期利確・損切りの判断</li>
</ul>

<strong>成功の秘訣</strong>: デリバティブは強力な投資ツールですが、高いリスクも伴います。基本的な仕組みを十分理解し、適切なリスク管理のもとで段階的に活用することが長期成功の鍵です。`
      }
    ],
    keyPoints: [
      'デリバティブは原資産から派生した金融商品でヘッジ・投機・収益機会創出に活用',
      '先物取引は将来の売買契約で標準化された商品、高いレバレッジ効果',
      'オプション取引は売買の権利でリスク限定・機会無制限の特徴',
      'スワップ取引は異なる条件での支払い交換で長期的なリスク管理に活用',
      'ヘッジ戦略により現物保有リスクを軽減、投機戦略で収益機会を拡大',
      'レバレッジ・流動性・モデルリスクなど複数のリスク要因の適切な管理が必要',
      '段階的学習と小額実践により経験を積むことが重要',
      'リスク管理を最優先に市場状況に応じた戦略選択が成功の鍵'
    ]
  },

  quiz: [
    {
      id: 'trading-basics-derivatives-fundamentals-applications-q1',
      question: '先物取引の最も重要な特徴は？',
      options: [
        '必ず利益が出ること',
        '将来の特定日時・価格での売買義務',
        '取引コストが無料',
        '価格変動リスクがないこと'
      ],
      correctAnswer: 1,
      explanation: '先物取引は将来の特定日時に事前に決められた価格で売買する義務を負う契約で、この標準化された義務が最も重要な特徴です。'
    },
    {
      id: 'trading-basics-derivatives-fundamentals-applications-q2',
      question: 'コールオプション購入の損益構造は？',
      options: [
        '利益無制限・損失無制限',
        '利益無制限・損失はプレミアムに限定',
        '利益限定・損失無制限',
        '利益限定・損失限定'
      ],
      correctAnswer: 1,
      explanation: 'コールオプション購入は、原資産価格上昇時の利益は無制限ですが、損失は支払ったプレミアムに限定されます。'
    },
    {
      id: 'trading-basics-derivatives-fundamentals-applications-q3',
      question: 'ヘッジ戦略の主要目的は？',
      options: [
        '利益の最大化',
        '既存ポジションのリスク軽減',
        '取引コストの削減',
        '取引頻度の増加'
      ],
      correctAnswer: 1,
      explanation: 'ヘッジ戦略の主要目的は、保有している現物などの既存ポジションの価格変動リスクを軽減することです。'
    },
    {
      id: 'trading-basics-derivatives-fundamentals-applications-q4',
      question: 'オプションの時間価値について正しい説明は？',
      options: [
        '満期まで一定に保たれる',
        '満期に近づくにつれて減少する',
        '価格変動とは無関係',
        '満期時に最大となる'
      ],
      correctAnswer: 1,
      explanation: 'オプションの時間価値は満期に近づくにつれて減少し、満期時にはゼロになります。これを時間減価（タイムディケイ）と言います。'
    },
    {
      id: 'trading-basics-derivatives-fundamentals-applications-q5',
      question: 'デリバティブ取引で最も重要なリスク管理は？',
      options: [
        '最大利益の追求',
        '適切なポジションサイズとレバレッジ管理',
        '取引回数の最大化',
        '手数料の最小化'
      ],
      correctAnswer: 1,
      explanation: 'デリバティブ取引では高いレバレッジ効果があるため、適切なポジションサイズの管理とレバレッジ制御が最も重要なリスク管理です。'
    }
  ],
  lastUpdated: '2025-08-17',
  factChecked: true
};