import type { Lesson } from '../../../types';
export const export const lesson19: Lesson = {
  id: 'trading-basics-portfolio-fundamentals',
  slug: 'portfolio-fundamentals',
  title: 'ポートフォリオの基礎',
  description: '投資におけるポートフォリオの基本概念を理解し、基本的な分散投資・資産配分・リバランシングの基礎知識と実践的な運用方法を学習します。',
  categoryId: 'trading-basics',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 28,
  orderIndex: 19,
  isPublished: true,
  tags: ['ポートフォリオ', '分散投資', '資産配分', 'リバランシング', 'リスク分散'],
  
  content: {
    sections: [
      {
        type: 'text',
        content: `
          <h1>ポートフォリオの基礎知識</h1>
          
          <h2>ポートフォリオとは</h2>
          <p><strong>ポートフォリオ</strong>とは、複数の投資対象を組み合わせた投資の組み合わせ・集合体のことです。「すべての卵を一つのかごに盛ってはいけない」という格言通り、<strong>分散投資によってリスクを分散</strong>し、安定したリターンを目指すのが基本的な考え方です。</p>
          
          <h3>ポートフォリオの基本目的</h3>
          <div class="portfolio-basics">
            <h4>主要な目的</h4>
            <ol>
              <li><strong>リスク分散</strong>: 一つの資産の損失を他の資産でカバー</li>
              <li><strong>安定性確保</strong>: 価格変動の影響を抑制</li>
              <li><strong>機会拡大</strong>: 複数の成長機会を同時に取得</li>
              <li><strong>継続性</strong>: 長期的な資産成長の基盤作り</li>
            </ol>
            
            <h4>分散投資の基本原則</h4>
            <ul>
              <li><strong>異なる動きをする資産の組み合わせ</strong>: 相関の低い資産を選択</li>
              <li><strong>適切な比率での配分</strong>: 一つの資産に過度に集中しない</li>
              <li><strong>定期的な見直し</strong>: 市場環境に応じた配分調整</li>
              <li><strong>長期的な視点</strong>: 短期の変動に惑わされない運用</li>
            </ul>
          </div>
          
          <h3>基本的なリスクの種類</h3>
          <div class="risk-types">
            <h4>個別リスク</h4>
            <ul>
              <li><strong>企業固有リスク</strong>: 個別銘柄特有の要因</li>
              <li><strong>技術リスク</strong>: プロジェクト特有の技術的課題</li>
              <li><strong>運営リスク</strong>: 開発チーム・経営陣の問題</li>
              <li><strong>流動性リスク</strong>: 売買の困難さ</li>
            </ul>
            
            <h4>市場リスク（システマティックリスク）</h4>
            <ul>
              <li><strong>市場全体リスク</strong>: 暗号通貨市場全体の変動</li>
              <li><strong>規制リスク</strong>: 政府・規制当局の政策変更</li>
              <li><strong>マクロ経済リスク</strong>: 経済全体の動向</li>
              <li><strong>技術的リスク</strong>: ブロックチェーン技術全体の課題</li>
            </ul>
          </div>
        `
      },
      {
        type: 'text',
        content: `<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">基本的な資産配分方法</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">等分配分（均等配分）</h3>
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">最もシンプルな配分方法</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>基本</strong>: すべての資産を同じ比率で保有</li>
<li><strong>例</strong>: 4つの暗号通貨をそれぞれ25%ずつ</li>
<li><strong>利点</strong>: 計算が簡単、初心者にも理解しやすい</li>
<li><strong>欠点</strong>: 各資産のリスク特性を考慮しない</li>
</ul>
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">実践例</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>資金</strong>: $10,000</li>
<li><strong>対象</strong>: BTC、ETH、BNB、ADA</li>
<li><strong>配分</strong>: 各$2,500(25%ずつ)</li>
<li><strong>メリット</strong>: 管理が簡単、定期的な調整も分かりやすい</li>
</ul>

<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">時価総額比例配分</h3>
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">市場規模に応じた配分</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>基本</strong>: 各暗号通貨の時価総額に比例した配分</li>
<li><strong>例</strong>: BTCが市場の50%なら、ポートフォリオも50%</li>
<li><strong>利点</strong>: 市場の評価を反映した自然な配分</li>
<li><strong>更新</strong>: 時価総額変化に応じた定期調整</li>
</ul>
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">実践例(2025年データ)</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>BTC</strong>: 時価総額60% → ポートフォリオ60%</li>
<li><strong>ETH</strong>: 時価総額25% → ポートフォリオ25%</li>
<li><strong>その他</strong>: 時価総額15% → ポートフォリオ15%</li>
<li><strong>特徴</strong>: 市場主導の自然な重み付け</li>
</ul>

<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">リスクベース配分</h3>
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">リスクレベルに応じた配分</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>低リスク重視</strong>: 安定した資産の比率を高く</li>
<li><strong>中リスク</strong>: バランス型の配分</li>
<li><strong>高リスク許容</strong>: 成長性重視の配分</li>
</ul>
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">実践的な配分例</h4>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">保守的ポートフォリオ</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>BTC</strong>: 70%(最も安定)</li>
<li><strong>ETH</strong>: 20%(第2位の安定性)</li>
<li><strong>その他</strong>: 10%(少額の成長狙い)</li>
</ul>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">バランス型ポートフォリオ</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>BTC</strong>: 50%(コア資産)</li>
<li><strong>ETH</strong>: 30%(成長性とのバランス)</li>
<li><strong>アルトコイン</strong>: 20%(多様化)</li>
</ul>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">積極的ポートフォリオ</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>BTC</strong>: 40%(安定性確保)</li>
<li><strong>ETH</strong>: 30%(成長期待)</li>
<li><strong>新興アルト</strong>: 30%(高成長狙い)</li>
</ul>`
      },
      {
        type: 'example',
        content: `<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">実際のポートフォリオ例：暗号通貨分散投資</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">2025年の実践的ポートフォリオ例</h3>

<div style="background: #f8f9fa; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<strong>初心者向けシンプルポートフォリオ</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>資金</strong>: $5,000</li>
<li><strong>BTC</strong>: $2,500(50% - 安定性重視)</li>
<li><strong>ETH</strong>: $1,500(30% - 成長性期待)</li>
<li><strong>その他</strong>: $1,000(20% - 学習・分散目的)</li>
<li><strong>特徴</strong>: 管理しやすく、リスクも適度</li>
</ul>
</div>

<div style="background: #fff3e0; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<strong>中級者向けバランスポートフォリオ</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>資金</strong>: $20,000</li>
<li><strong>BTC</strong>: $8,000(40% - コア資産)</li>
<li><strong>ETH</strong>: $6,000(30% - 第2のコア)</li>
<li><strong>レイヤー1</strong>: $4,000(20% - SOL、ADA等)</li>
<li><strong>その他</strong>: $2,000(10% - DeFi、NFT関連)</li>
<li><strong>特徴</strong>: 分散が効いた安定性重視</li>
</ul>
</div>

<div style="background: #e8f5e8; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<strong>上級者向け戦略的ポートフォリオ</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>資金</strong>: $100,000</li>
<li><strong>コア資産(70%)</strong>: BTC $40,000、ETH $30,000</li>
<li><strong>成長資産(20%)</strong>: 新興レイヤー1・レイヤー2 $20,000</li>
<li><strong>投機資産(10%)</strong>: 新しいトレンド・テーマ $10,000</li>
<li><strong>特徴</strong>: リスク管理と成長機会のバランス</li>
</ul>
</div>

<div style="background: #e3f2fd; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<strong>リバランシング実例</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>初期</strong>: BTC 50%、ETH 30%、その他 20%</li>
<li><strong>3ヶ月後</strong>: ETH急騰でBTC 40%、ETH 45%、その他 15%</li>
<li><strong>調整</strong>: ETHを一部売却してBTCとその他を買い増し</li>
<li><strong>調整後</strong>: BTC 50%、ETH 30%、その他 20%に復帰</li>
<li><strong>学習ポイント</strong>: 定期的な配分調整で目標比率を維持</li>
</ul>
</div>`
      },
      {
        type: 'tip',
        content: `<div style="background: #e8f5e8; padding: 1rem; border-radius: 4px; border-left: 4px solid #4caf50; margin: 1rem 0;">
<strong>ポートフォリオ基礎活用のコツ</strong>
<h4 style="color: #2e7d32; margin: 0 0 0.5rem 0;">1. 実用的な配分管理</h4>
<ul style="margin: 0; padding-left: 1.5rem;">
<li>データ期間: 1-2年程度の市場データを参考</li>
<li>見直し頻度: 月次または四半期ごとの配分確認</li>
<li>記録管理: 配分変更の理由と結果を記録</li>
</ul>

<h4 style="color: #2e7d32; margin: 1rem 0 0.5rem 0;">2. 基本的なルール設定</h4>
<ul style="margin: 0; padding-left: 1.5rem;">
<li>最小配分: 5%以上(極端な集中を避ける)</li>
<li>最大配分: 50%以下(リスクの過度な集中を防ぐ)</li>
<li>相関確認: 似た動きをする資産の重複を避ける</li>
</ul>

<h4 style="color: #2e7d32; margin: 1rem 0 0.5rem 0;">3. 継続的な学習</h4>
<p style="margin: 0;">実際の結果を確認し、基本的な配分方法を少しずつ改善！</p>
</div>`
      },
      {
        type: 'text',
        content: `<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">基本的なパフォーマンス測定</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">基本的なリターン指標</h3>
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">単純リターン</h4>
<div style="background: #f8f9fa; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<strong>計算式</strong>: (期末価値 - 期初価値) ÷ 期初価値 × 100
</div>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">実例</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>期初</strong>: $10,000</li>
<li><strong>期末</strong>: $12,000</li>
<li><strong>リターン</strong>: ($12,000 - $10,000) ÷ $10,000 = 20%</li>
</ul>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">年率リターン</h4>
<div style="background: #f8f9fa; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<strong>計算式</strong>: ((期末価値 ÷ 期初価値)^(1/年数) - 1) × 100
</div>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">実例</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>期初</strong>: $10,000</li>
<li><strong>2年後</strong>: $14,400</li>
<li><strong>年率</strong>: (($14,400 ÷ $10,000)^(1/2) - 1) = 20%/年</li>
</ul>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">基本的なリスク測定</h4>
<div style="background: #f8f9fa; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<strong>ボラティリティ(標準偏差)</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>意味</strong>: リターンのばらつき度合い</li>
<li><strong>計算</strong>: 月次リターンの標準偏差</li>
<li><strong>解釈</strong>: 高いほどリスクが大きい</li>
</ul>
</div>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">最大ドローダウン</h4>
<div style="background: #f8f9fa; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<strong>計算式</strong>: (ピーク価値 - 最低価値) ÷ ピーク価値
</div>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">実例</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>ピーク</strong>: $15,000</li>
<li><strong>最低</strong>: $12,000</li>
<li><strong>ドローダウン</strong>: ($15,000 - $12,000) ÷ $15,000 = 20%</li>
</ul>

<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">基本的なリバランシング</h3>
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">リバランシングとは</h4>
<p style="margin-bottom: 1rem;"><strong>定義</strong>: 目標配分と実際の配分が乖離した際に、売買により目標配分に戻すこと</p>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">リバランシングの判断基準</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>閾値</strong>: 目標から5%以上の乖離</li>
<li><strong>時間</strong>: 3ヶ月または6ヶ月ごとの定期見直し</li>
<li><strong>イベント</strong>: 大きな市場変動後の緊急調整</li>
</ul>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">実践手順</h4>
<ol style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>現在配分の確認</strong>: 各資産の現在の比率を計算</li>
<li><strong>乖離度の測定</strong>: 目標配分からの差を確認</li>
<li><strong>調整必要性</strong>: 閾値を超えているかを判定</li>
<li><strong>売買の実行</strong>: 過大部分を売却、過少部分を購入</li>
<li><strong>結果の確認</strong>: 目標配分への回帰を確認</li>
</ol>

<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">継続的な改善</h3>
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">月次確認項目</h4>
<ol style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>パフォーマンス</strong>: 全体の損益状況</li>
<li><strong>配分状況</strong>: 目標からの乖離度</li>
<li><strong>個別資産</strong>: 各資産の動向</li>
<li><strong>市場環境</strong>: 全体的な市場の変化</li>
</ol>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">記録の重要性</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>取引記録</strong>: いつ、何を、なぜ売買したか</li>
<li><strong>パフォーマンス記録</strong>: 月次・四半期の成績</li>
<li><strong>学習記録</strong>: 成功・失敗から得た教訓</li>
<li><strong>改善記録</strong>: 戦略の修正内容と理由</li>
</ul>`
      },
      {
        type: 'text',
        content: `<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">実践的なポートフォリオ戦略</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">初心者向け基本戦略</h3>
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">3つの通貨で始める</h4>
<ol style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>BTC</strong>: 50%(最も安定したコア資産)</li>
<li><strong>ETH</strong>: 30%(成長性とのバランス)</li>
<li><strong>アルトコイン1つ</strong>: 20%(学習目的)</li>
</ol>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">運用のポイント</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>少額から開始</strong>: $1,000-$5,000で慣れる</li>
<li><strong>定期投資</strong>: 毎月一定額を投資</li>
<li><strong>感情制御</strong>: 日々の価格変動に一喜一憂しない</li>
<li><strong>学習重視</strong>: まずは基本的な知識習得を優先</li>
</ul>

<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">中級者向けバランス戦略</h3>
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">5-7通貨での分散</h4>
<ol style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>メジャー通貨</strong>: BTC、ETH(60-70%)</li>
<li><strong>レイヤー1</strong>: SOL、ADA、AVAX等(20-25%)</li>
<li><strong>特定テーマ</strong>: DeFi、NFT等(10-15%)</li>
</ol>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">管理手法</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>月次リバランス</strong>: 目標配分の維持</li>
<li><strong>段階的参入</strong>: 一度に全額投資せず時間分散</li>
<li><strong>利確ルール</strong>: 一定利益での部分利確</li>
<li><strong>損切りルール</strong>: 個別銘柄の損切り基準設定</li>
</ul>

<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">上級者向け戦略的配分</h3>
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">複合アプローチ</h4>
<div style="margin: 1rem 0;">
<strong>1. コア-サテライト戦略</strong>:<br>
- コア(70%): BTC、ETHの安定配分<br>
- サテライト(30%): テーマ別・成長狙い<br><br>

<strong>2. リスク階層配分</strong>:<br>
- 低リスク(50%): 主要通貨<br>
- 中リスク(30%): 中堅アルトコイン<br>
- 高リスク(20%): 新興・テーマ通貨
</div>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">高度な管理</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>相関分析</strong>: 通貨間の相関を考慮した配分</li>
<li><strong>ボラティリティ調整</strong>: リスクレベルに応じた配分</li>
<li><strong>マクロ分析</strong>: 経済環境を考慮した戦略調整</li>
<li><strong>税務最適化</strong>: 税務効率を考慮した売買</li>
</ul>

<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">長期投資とのバランス</h3>
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">投資期間の使い分け</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>長期保有(50%)</strong>: 5年以上の保有を前提</li>
<li><strong>中期保有(30%)</strong>: 1-3年の保有期間</li>
<li><strong>短期取引(20%)</strong>: 3ヶ月-1年の機動的運用</li>
</ul>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">時間分散の重要性</h4>
<ol style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>ドルコスト平均</strong>: 定期的な一定額投資</li>
<li><strong>段階的参入</strong>: 大口投資の時間分散</li>
<li><strong>利確の分散</strong>: 一度に全てを売らない</li>
<li><strong>再投資</strong>: 利益の一部を再投資に回す</li>
</ol>`
      },
      {
        type: 'text',
        content: `
          <h1>理解度チェック</h1>
          <p>このセクションでは、ポートフォリオの基本概念について理解を深めてください。$10,000の資金でBTC50%、ETH30%、その他20%の配分の場合、BTCに$5,000、ETHに$3,000、その他に$2,000を配分します。</p>
          
          <h3>重要なポイント</h3>
          <div class="understanding-check">
            <ul>
              <li><strong>基本配分</strong>：資金に各資産の目標比率を乗じて計算</li>
              <li><strong>分散投資</strong>：リスクを分散し、安定したリターンを目指す</li>
              <li><strong>定期見直し</strong>：市場環境に応じた配分調整が重要</li>
              <li><strong>長期視点</strong>：短期の変動に惑わされない運用</li>
            </ul>
          </div>
        `
      },
      {
        type: 'warning',
        content: `<div style="background: #fff3e0; padding: 1rem; border-radius: 4px; border-left: 4px solid #ff9800; margin: 1rem 0;">
<strong>ポートフォリオ管理時の注意点</strong>
<h4 style="color: #f57c00; margin: 0 0 0.5rem 0;">1. 過度な複雑化</h4>
<div style="margin-bottom: 1rem;">
<strong>問題</strong>: 多数の通貨への分散で管理が複雑化<br>
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>初心者は3-5通貨程度に限定</li>
<li>理解できる範囲での投資</li>
<li>シンプルな配分ルールの採用</li>
<li>段階的な通貨数増加</li>
</ul>
</div>

<h4 style="color: #f57c00; margin: 0 0 0.5rem 0;">2. 感情的な判断</h4>
<div style="margin-bottom: 1rem;">
<strong>問題</strong>: 価格変動に影響された非合理的な配分変更<br>
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>事前に決めたルールの遵守</li>
<li>定期的な見直しスケジュール</li>
<li>感情と論理の分離</li>
<li>冷静な期間での判断</li>
</ul>
</div>

<h4 style="color: #f57c00; margin: 0 0 0.5rem 0;">3. リバランシングの怠慢</h4>
<div style="margin-bottom: 1rem;">
<strong>問題</strong>: 配分乖離の放置による偏った投資<br>
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>定期的な配分確認</li>
<li>明確な閾値設定</li>
<li>自動リバランシング検討</li>
<li>記録による意識向上</li>
</ul>
</div>

<h4 style="color: #f57c00; margin: 0 0 0.5rem 0;">4. 手数料の軽視</h4>
<div style="margin-bottom: 1rem;">
<strong>問題</strong>: 頻繁な売買による手数料負担増大<br>
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>リバランシング頻度の最適化</li>
<li>閾値設定による無駄な取引回避</li>
<li>手数料を考慮した配分調整</li>
<li>長期視点での運用</li>
</ul>
</div>

<p style="margin: 1rem 0; font-weight: bold;">成功の秘訣: ポートフォリオ管理は技術よりも継続性が重要です。シンプルなルールを一貫して実行し続けることが、長期的な成功への鍵です。</p>
</div>`
      }
    ],
    keyPoints: [
      'ポートフォリオは複数の投資対象を組み合わせてリスクを分散する手法',
      '等分配分、時価総額比例配分、リスクベース配分の3つが基本的な配分方法',
      '分散投資により個別リスクを軽減し、安定したリターンを目指す',
      'リバランシングで目標配分を維持し、運用効率を高める',
      '基本的なリターン測定と最大ドローダウンでパフォーマンス評価',
      '初心者は3-5通貨、上級者は戦略的な階層配分を活用',
      '定期的な見直しと記録管理で継続的な改善を実現',
      'シンプルなルールの一貫した実行が長期成功の鍵'
    ]
  },

  quiz: [
    {
      id: 'trading-basics-portfolio-fundamentals-q1',
      question: '$10,000の資金でBTC50%、ETH30%、その他20%の配分の場合、各資産への配分額は？',
      options: [
        'BTC$4,000、ETH$3,000、その他$3,000',
        'BTC$5,000、ETH$3,000、その他$2,000',
        'BTC$6,000、ETH$2,000、その他$2,000',
        'BTC$3,333、ETH$3,333、その他$3,334'
      ],
      correctAnswer: 1,
      explanation: '資金$10,000に各配分比率を乗じて、BTC$5,000(50%)、ETH$3,000(30%)、その他$2,000(20%)となります。'
    },
    {
      id: 'trading-basics-portfolio-fundamentals-q2',
      question: 'ポートフォリオの基本的な目的として最も重要なものは？',
      options: [
        '短期的な利益の最大化',
        'リスクの分散と安定性の確保',
        '取引回数の増加',
        '最新トレンドへの集中投資'
      ],
      correctAnswer: 1,
      explanation: 'ポートフォリオの基本目的は、分散投資によりリスクを分散し、安定したリターンを目指すことです。'
    },
    {
      id: 'trading-basics-portfolio-fundamentals-q3',
      question: 'リバランシングを行う基本的な判断基準は？',
      options: [
        '毎日価格をチェックして調整',
        '目標配分から5%以上乖離した場合',
        '利益が出たらすぐに調整',
        '損失が出たら即座に調整'
      ],
      correctAnswer: 1,
      explanation: 'リバランシングは通常、目標配分から5%以上乖離した場合や、定期的な見直し時(3-6ヶ月ごと)に実行します。'
    },
    {
      id: 'trading-basics-portfolio-fundamentals-q4',
      question: '初心者向けのポートフォリオとして最も適切な配分は？',
      options: [
        '10種類の通貨に均等配分',
        'BTC50%、ETH30%、アルトコイン20%',
        '100%アルトコイン投資',
        '毎日配分を変更'
      ],
      correctAnswer: 1,
      explanation: '初心者にはBTC50%、ETH30%、アルトコイン20%のような、安定資産中心でシンプルな配分が適しています。'
    },
    {
      id: 'trading-basics-portfolio-fundamentals-q5',
      question: 'ポートフォリオ管理で最も重要な原則は？',
      options: [
        '複雑な分析手法の使用',
        'シンプルなルールの継続的実行',
        '頻繁な配分変更',
        '最新情報への即座の反応'
      ],
      correctAnswer: 1,
      explanation: 'ポートフォリオ管理では、シンプルで理解しやすいルールを継続的に実行することが最も重要です。'
    }
  ],
  lastUpdated: '2025-08-17',
  factChecked: true
};