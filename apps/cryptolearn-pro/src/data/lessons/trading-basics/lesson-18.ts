import type { Lesson } from '../../../types';
export const export const lesson18: Lesson = {
  id: 'trading-basics-risk-management-fundamentals',
  slug: 'risk-management-fundamentals',
  title: 'リスク管理の基礎',
  description: '取引における基本的なリスク管理手法を理解し、損失限定・資金管理・ポジションサイジングの基本原則と実践的な適用方法を学習します。',
  categoryId: 'trading-basics',
  difficultyLevel: 'advanced',
  estimatedMinutes: 32,
  orderIndex: 18,
  isPublished: true,
  tags: ['リスク管理', 'VaR', 'ポートフォリオ理論', 'ヘッジング', 'ストレステスト'],
  
  content: {
    sections: [
      {
        type: 'text',
        content: `
          <h1>リスク管理の基礎知識</h1>
          
          <h2>リスク管理とは</h2>
          <p><strong>リスク管理</strong>は、取引における損失を制限し、資金を保護するための基本的な手法です。成功する投資家とそうでない投資家を分ける最も重要な要素の一つで、<strong>損失限定・資金管理・ポジションサイジング</strong>の3つの柱から構成されます。</p>
          
          <h3>リスク管理の基本的な目的</h3>
          <div class="risk-management-purposes">
            <h4>主要な目的</h4>
            <ol>
              <li><strong>資金保護</strong>: 大きな損失から投資資金を守る</li>
              <li><strong>継続性確保</strong>: 市場に留まり続けるための基盤作り</li>
              <li><strong>感情制御</strong>: 冷静な判断を維持するための仕組み</li>
              <li><strong>利益最大化</strong>: リスクを制御してリターンを最大化</li>
            </ol>
            
            <h4>リスク管理の基本原則</h4>
            <ul>
              <li><strong>1%ルール</strong>: 1回の取引で資金の1-2%以上リスクを取らない</li>
              <li><strong>事前設定</strong>: エントリー前にストップロスと利確目標を決める</li>
              <li><strong>一貫性</strong>: すべての取引で同じルールを適用</li>
              <li><strong>客観性</strong>: 感情に左右されない機械的な実行</li>
            </ul>
          </div>
          
          <h3>基本的なリスクの種類</h3>
          <div class="risk-types">
            <h4>市場リスク</h4>
            <ul>
              <li><strong>価格変動リスク</strong>: 価格の上下動による損失</li>
              <li><strong>ボラティリティリスク</strong>: 急激な価格変動</li>
              <li><strong>流動性リスク</strong>: 売買困難による損失拡大</li>
              <li><strong>ギャップリスク</strong>: 窓開けによる想定外の損失</li>
            </ul>
            
            <h4>運用リスク</h4>
            <ul>
              <li><strong>過度集中リスク</strong>: 一銘柄への過度な集中</li>
              <li><strong>レバレッジリスク</strong>: 借入による損失拡大</li>
              <li><strong>心理的リスク</strong>: 感情による判断ミス</li>
              <li><strong>技術的リスク</strong>: システム・通信の障害</li>
            </ul>
          </div>
        `
      },
      {
        type: 'text',
        content: `<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">基本的な損失制御手法</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">ストップロス（損切り）</h3>
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">ストップロスの基本</h4>
<p style="margin-bottom: 1rem;"><strong>ストップロス</strong>は、損失が拡大する前に自動的にポジションを決済する、リスク管理の最も基本的で重要な手法です。</p>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">ストップロス設定の方法</h4>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">金額ベース</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>固定金額</strong>: 1回の取引で失ってもよい金額を設定</li>
<li><strong>例</strong>: $100の損失で必ず損切り</li>
<li><strong>利点</strong>: 計算が簡単、資金管理しやすい</li>
<li><strong>注意</strong>: 市場の状況を考慮しない</li>
</ul>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">パーセンテージベース</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>固定比率</strong>: 投資金額の一定比率で設定</li>
<li><strong>例</strong>: エントリー価格から3%下で損切り</li>
<li><strong>利点</strong>: ポジションサイズに比例した損失制御</li>
<li><strong>計算</strong>: $50,000でエントリー → 3%なら$48,500で損切り</li>
</ul>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">テクニカルベース</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>サポート・レジスタンス</strong>: 重要価格レベルの突破で損切り</li>
<li><strong>移動平均線</strong>: 重要移動平均線の割れで損切り</li>
<li><strong>ATR</strong>: 平均的な値動きの倍数で設定</li>
<li><strong>利点</strong>: 市場の動きに合理的な根拠</li>
</ul>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">基本的なストップロス戦略</h4>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">初期ストップロス</h4>
<ol style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>エントリー時</strong>: 必ず同時にストップロス注文を設定</li>
<li><strong>価格設定</strong>: エントリー理由が崩れる価格レベル</li>
<li><strong>金額確認</strong>: 許容損失額を超えないことを確認</li>
<li><strong>注文種類</strong>: 成行・指値・逆指値の選択</li>
</ol>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">トレーリングストップ</h4>
<ol style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>基本概念</strong>: 利益が出ている間、ストップロスを有利な方向に移動</li>
<li><strong>移動方法</strong>: 一定の値幅または比率で自動調整</li>
<li><strong>利点</strong>: 利益確保と更なる利益追求の両立</li>
<li><strong>注意点</strong>: 過度に近すぎるとノイズで決済される</li>
</ol>

<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">利益確定（利確）戦略</h3>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">基本的な利確手法</h4>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">リスクリワード比での設定</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>1:2比率</strong>: リスク$100に対して利益$200を目標</li>
<li><strong>1:3比率</strong>: より大きな利益を狙う比率</li>
<li><strong>計算例</strong>: $50,000エントリー、$47,000ストップ → $56,000利確</li>
</ul>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">段階的利確</h4>
<ol style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>第1利確</strong>: ポジションの1/3を早めに利確</li>
<li><strong>第2利確</strong>: ポジションの1/3を中間目標で利確</li>
<li><strong>第3利確</strong>: 残り1/3をトレンド終了まで保持</li>
<li><strong>メリット</strong>: 利益確保と大きな利益追求の両立</li>
</ol>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">テクニカル分析での利確</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>レジスタンスレベル</strong>: 重要な抵抗線手前で利確</li>
<li><strong>フィボナッチ</strong>: 重要な戻し水準での利確</li>
<li><strong>移動平均線</strong>: 重要な移動平均線での利確</li>
<li><strong>チャートパターン</strong>: 目標価格の達成で利確</li>
</ul>`
      },
      {
        type: 'example',
        content: `<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">実際の適用例：ビットコイン取引での基本的リスク管理</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">2024年春の実例</h3>
<div style="background: #f8f9fa; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<strong>取引設定</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>資金</strong>: $10,000(取引用資金)</li>
<li><strong>リスク許容</strong>: 1回の取引で$200まで(2%ルール)</li>
<li><strong>通貨</strong>: ビットコイン(BTC)</li>
<li><strong>エントリー価格</strong>: $60,000</li>
</ul>
</div>

<div style="background: #fff3e0; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<strong>ストップロス設定</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>設定価格</strong>: $58,000(3.33%下)</li>
<li><strong>損失額</strong>: $2,000÷10=$200(ポジションサイズ調整)</li>
<li><strong>ポジションサイズ</strong>: 0.1BTC($6,000分)</li>
<li><strong>実際リスク</strong>: $200(目標通り)</li>
</ul>
</div>

<div style="background: #e8f5e8; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<strong>利確戦略</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>第1利確</strong>: $64,000(1:2リスクリワード)</li>
<li><strong>第2利確</strong>: $68,000(1:4リスクリワード)</li>
<li><strong>最終利確</strong>: トレンドライン割れまで保持</li>
</ul>
</div>

<div style="background: #e3f2fd; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<strong>実際の結果</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>経過1</strong>: $61,000まで上昇、第1利確で0.03BTC決済</li>
<li><strong>経過2</strong>: $66,000まで上昇、第2利確で0.04BTC決済</li>
<li><strong>経過3</strong>: $72,000でトレンドライン割れ、残り0.03BTC決済</li>
<li><strong>最終損益</strong>: $600の利益(6%リターン、リスク$200)</li>
</ul>
</div>

<p style="margin: 1rem 0;"><strong>学習ポイント</strong>: 基本的なリスク管理ルールの一貫した適用により、小さなリスクで安定した利益を実現</p>`
      },
      {
        type: 'tip',
        content: `<div style="background: #e8f5e8; padding: 1rem; border-radius: 4px; border-left: 4px solid #4caf50; margin: 1rem 0;">
<strong>リスク管理活用のコツ</strong>
<h4 style="color: #2e7d32; margin: 0 0 0.5rem 0;">1. 基本ルールの徹底</h4>
<ul style="margin: 0; padding-left: 1.5rem;">
<li>2%ルール: 1回の取引で資金の2%以上リスクを取らない</li>
<li>事前設定: エントリー前に必ずストップロスと利確を決める</li>
<li>一貫性: すべての取引で同じルールを適用</li>
</ul>

<h4 style="color: #2e7d32; margin: 1rem 0 0.5rem 0;">2. 感情制御</h4>
<ul style="margin: 0; padding-left: 1.5rem;">
<li>機械的実行: 設定したルール通りに機械的に実行</li>
<li>損切り躊躇の克服: 小さな損失で大きな損失を防ぐ</li>
<li>利確の我慢: 目標に達したら欲張らずに利確</li>
</ul>

<h4 style="color: #2e7d32; margin: 1rem 0 0.5rem 0;">3. 継続的改善</h4>
<p style="margin: 0;">取引記録をつけて定期的にルールを見直し、市場環境に合わせて調整！</p>
</div>`
      },
      {
        type: 'text',
        content: `<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">基本的なポジションサイジング</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">ポジションサイズの決定方法</h3>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">固定金額法</h4>
<p style="margin-bottom: 1rem;"><strong>毎回同じ金額でポジションを取る最もシンプルな方法</strong></p>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>例</strong>: 毎回$1,000分のポジション</li>
<li><strong>利点</strong>: 計算が簡単、一貫性がある</li>
<li><strong>欠点</strong>: リスクレベルが価格によって変動</li>
</ul>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">固定比率法</h4>
<p style="margin-bottom: 1rem;"><strong>資金の一定比率でポジションを取る方法</strong></p>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>例</strong>: 常に資金の10%でポジション</li>
<li><strong>計算</strong>: $10,000資金なら$1,000分のポジション</li>
<li><strong>利点</strong>: 資金の増減に連動</li>
<li><strong>注意</strong>: ボラティリティを考慮しない</li>
</ul>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">リスクベース法（推奨）</h4>
<p style="margin-bottom: 1rem;"><strong>許容損失額からポジションサイズを逆算する方法</strong></p>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">計算式</h4>
<div style="background: #f8f9fa; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<strong>ポジションサイズ = 許容損失額 ÷ (エントリー価格 - ストップロス価格)</strong>
</div>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">実例計算</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>資金</strong>: $10,000</li>
<li><strong>リスク</strong>: 2%($200)</li>
<li><strong>エントリー</strong>: $50,000</li>
<li><strong>ストップロス</strong>: $48,000</li>
<li><strong>価格差</strong>: $2,000</li>
<li><strong>ポジションサイズ</strong>: $200 ÷ $2,000 = 0.1BTC</li>
</ul>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">リスク分散の基本</h4>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">銘柄分散</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>集中回避</strong>: 1銘柄に資金の20%以上投資しない</li>
<li><strong>相関確認</strong>: 似た動きをする銘柄への重複投資回避</li>
<li><strong>時間分散</strong>: 一度にすべて投資せず、時期を分ける</li>
</ul>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">戦略分散</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>トレンドフォロー</strong>: 上昇トレンドに乗る戦略</li>
<li><strong>逆張り</strong>: 売られすぎからの反発を狙う戦略</li>
<li><strong>レンジ取引</strong>: 価格帯での往復を狙う戦略</li>
<li><strong>組み合わせ</strong>: 複数戦略でリスク分散</li>
</ul>

<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">資金管理の実践</h3>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">基本的な資金配分</h4>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">3分割法</h4>
<ol style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>投資資金</strong>: 60%(積極的運用)</li>
<li><strong>安全資金</strong>: 30%(安全資産・現金)</li>
<li><strong>緊急資金</strong>: 10%(生活費・緊急時)</li>
</ol>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">投資資金の細分化</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>短期取引</strong>: 40%(1日-1週間)</li>
<li><strong>中期保有</strong>: 40%(1週間-3ヶ月)</li>
<li><strong>長期投資</strong>: 20%(3ヶ月以上)</li>
</ul>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">レバレッジの基本的な考え方</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>初心者</strong>: レバレッジ使用しない(1倍)</li>
<li><strong>中級者</strong>: 最大2-3倍まで</li>
<li><strong>上級者</strong>: 5倍まで(十分な経験後)</li>
<li><strong>絶対禁止</strong>: 10倍を超える高レバレッジ</li>
</ul>`
      },
      {
        type: 'text',
        content: `
          <h1>理解度チェック</h1>
          <p>このセクションでは、リスク管理の基本概念について理解を深めてください。資金$10,000で2%ルールを適用し、エントリー$50,000、ストップロス$48,000の場合、適切なポジションサイズは0.1BTCになります。</p>
          
          <h3>重要なポイント</h3>
          <div class="understanding-check">
            <ul>
              <li><strong>計算方法</strong>：許容損失額($200) ÷ 価格差($2,000) = 0.1BTC</li>
              <li><strong>2%ルール</strong>：1回の取引で資金の2%以上リスクを取らない</li>
              <li><strong>事前設定</strong>：エントリー前にストップロスと利確目標を決める</li>
              <li><strong>一貫性</strong>：すべての取引で同じルールを適用</li>
            </ul>
          </div>
        `
      },
      {
        type: 'warning',
        content: `<div style="background: #fff3e0; padding: 1rem; border-radius: 4px; border-left: 4px solid #ff9800; margin: 1rem 0;">
<strong>リスク管理実践時の注意点</strong>
<h4 style="color: #f57c00; margin: 0 0 0.5rem 0;">1. 感情的な判断の排除</h4>
<div style="margin-bottom: 1rem;">
<strong>問題</strong>: 損切りへの躊躇、利確への焦り<br>
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>機械的なルール適用</li>
<li>事前に設定した価格での自動執行</li>
<li>感情を排除した客観的判断</li>
<li>取引日記による振り返り</li>
</ul>
</div>

<h4 style="color: #f57c00; margin: 0 0 0.5rem 0;">2. ルール違反の危険性</h4>
<div style="margin-bottom: 1rem;">
<strong>問題</strong>: 一度の大きな利益で調子に乗る<br>
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>基本ルールの一貫した適用</li>
<li>利益が出ても慢心しない</li>
<li>損失時こそルール遵守</li>
<li>定期的なルール見直し</li>
</ul>
</div>

<h4 style="color: #f57c00; margin: 0 0 0.5rem 0;">3. 過度なリスク回避</h4>
<div style="margin-bottom: 1rem;">
<strong>問題</strong>: リスクを取らなすぎて機会損失<br>
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>適切なリスクレベルの維持</li>
<li>2%ルールの範囲内でのリスク</li>
<li>機会損失も損失と認識</li>
<li>バランスの取れたアプローチ</li>
</ul>
</div>

<h4 style="color: #f57c00; margin: 0 0 0.5rem 0;">4. 複雑化の回避</h4>
<div style="margin-bottom: 1rem;">
<strong>問題</strong>: 複雑すぎるルールで混乱<br>
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>シンプルで理解しやすいルール</li>
<li>基本原則の徹底</li>
<li>段階的なスキル向上</li>
<li>実行可能性を重視</li>
</ul>
</div>

<p style="margin: 1rem 0; font-weight: bold;">成功の秘訣: リスク管理は技術ではなく習慣です。シンプルなルールを一貫して実行し続けることが、長期的な成功への最短路です。</p>
</div>`
      },
      ],
    keyPoints: [
      'リスク管理は損失制限・資金管理・ポジションサイジングの3つの柱から構成',
      '2%ルール: 1回の取引で資金の2%以上リスクを取らない',
      'ストップロスは損失拡大防止の最も基本的で重要な手法',
      'リスクリワード比で利益目標を設定し、段階的利確で利益確保',
      'ポジションサイズは許容損失額から逆算して決定',
      '銘柄分散・戦略分散・時間分散でリスクを分散',
      '基本ルールの一貫した適用と感情的判断の排除',
      'シンプルで理解しやすいルールの継続的実行が成功の鍵'
    ]
    },

  quiz: [
    {
      id: 'trading-basics-risk-management-fundamentals-q1',
      question: '資金$10,000で2%ルールを適用し、エントリー$50,000、ストップロス$48,000の場合、適切なポジションサイズは？',
      options: [
        '0.05BTC',
        '0.1BTC',
        '0.2BTC',
        '0.3BTC'
      ],
      correctAnswer: 1,
      explanation: '許容損失額$200(2%)÷価格差$2,000=0.1BTCが適切なポジションサイズです。'
    },
    {
      id: 'trading-basics-risk-management-fundamentals-q2',
      question: 'リスク管理で最も基本的で重要な手法は何ですか？',
      options: [
        '利益確定',
        'ストップロス（損切り）',
        'ポジション追加',
        'レバレッジ使用'
      ],
      correctAnswer: 1,
      explanation: 'ストップロス（損切り）は損失拡大を防ぐ最も基本的で重要なリスク管理手法です。'
    },
    {
      id: 'trading-basics-risk-management-fundamentals-q3',
      question: '2%ルールとは何を意味しますか？',
      options: [
        '利益を2%で確定する',
        '1回の取引で資金の2%以上リスクを取らない',
        '2%の手数料を支払う',
        '2%のレバレッジを使用する'
      ],
      correctAnswer: 1,
      explanation: '2%ルールは1回の取引で総資金の2%以上の損失リスクを取らないという基本的なリスク管理原則です。'
    },
    {
      id: 'trading-basics-risk-management-fundamentals-q4',
      question: 'リスクリワード比1:2とは何を意味しますか？',
      options: [
        'リスク$100に対して利益$50を目標',
        'リスク$100に対して利益$200を目標',
        'リスク$200に対して利益$100を目標',
        'リスクと利益が同額'
      ],
      correctAnswer: 1,
      explanation: 'リスクリワード比1:2は、リスク$100に対して利益$200を目標とする比率で、リスクの2倍の利益を狙います。'
    },
    {
      id: 'trading-basics-risk-management-fundamentals-q5',
      question: 'リスク管理で最も重要な原則は何ですか？',
      options: [
        '高いリターンを追求する',
        '基本ルールの一貫した適用',
        '複雑な手法を使用する',
        '感情に基づく判断'
      ],
      correctAnswer: 1,
      explanation: 'リスク管理で最も重要なのは、シンプルな基本ルールをすべての取引で一貫して適用し続けることです。'
    }
  ],
  lastUpdated: '2025-08-17',
  factChecked: true

};