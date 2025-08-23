import type { Lesson } from '../../../types';

export const lesson22: Lesson = {
  id: 'trading-basics-rsi-macd-bollinger-fundamentals-applications',
  slug: 'rsi-macd-bollinger-fundamentals-applications',
  title: 'RSI・MACD・ボリンジャーバンドの基礎から応用',
  description: '代表的なテクニカル指標であるRSI、MACD、ボリンジャーバンドの基本的な仕組みから始めて、実践的な組み合わせ手法まで段階的に学習します。',
  categoryId: 'trading-basics',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 40,
  orderIndex: 22,
  isPublished: true,
  tags: ['RSI', 'MACD', 'ボリンジャーバンド', '組み合わせ分析', '実践応用'],
  
  content: {
    sections: [
      {
        type: 'text',
        content: `
          <h1>代表的テクニカル指標の基礎から応用</h1>
          
          <h2>3つの重要指標の概要</h2>
          <p>このレッスンでは、テクニカル分析で最も重要な<strong>RSI（相対力指数）</strong>、<strong>MACD（移動平均収束拡散）</strong>、<strong>ボリンジャーバンド</strong>について、基本的な理解から実践的な組み合わせ活用法まで学習します。これらの指標を適切に組み合わせることで、<strong>より確実性の高い取引判断</strong>が可能になります。</p>
          
          <h3>各指標の基本的な役割</h3>
          <div class="indicators-overview">
            <h4>RSI（相対力指数）</h4>
            <ul>
              <li><strong>分類</strong>: オシレーター系指標</li>
              <li><strong>目的</strong>: 買われすぎ・売られすぎの判定</li>
              <li><strong>範囲</strong>: 0-100の値で表示</li>
              <li><strong>開発者</strong>: J.ウェルズ・ワイルダー(1978年)</li>
            </ul>
            
            <h4>MACD（移動平均収束拡散）</h4>
            <ul>
              <li><strong>分類</strong>: トレンド系・モメンタム系指標</li>
              <li><strong>目的</strong>: トレンド転換とモメンタム測定</li>
              <li><strong>構成</strong>: MACD線、シグナル線、ヒストグラム</li>
              <li><strong>開発者</strong>: ジェラルド・アペル(1960年代)</li>
            </ul>
            
            <h4>ボリンジャーバンド</h4>
            <ul>
              <li><strong>分類</strong>: ボラティリティ系指標</li>
              <li><strong>目的</strong>: 価格レンジとブレイクアウト判定</li>
              <li><strong>構成</strong>: 中央線(移動平均)と上下2本のバンド</li>
              <li><strong>開発者</strong>: ジョン・ボリンジャー(1980年代)</li>
            </ul>
          </div>
          
          <h3>指標の基本的な分類と補完関係</h3>
          <div class="indicator-classification">
            <h4>異なる観点での市場分析</h4>
            <ul>
              <li><strong>RSI</strong>: 過熱感（心理的側面）</li>
              <li><strong>MACD</strong>: 勢い（モメンタム側面）</li>
              <li><strong>ボリンジャーバンド</strong>: 変動幅（統計的側面）</li>
            </ul>
            
            <h4>組み合わせの利点</h4>
            <ul>
              <li><strong>多角的分析</strong>: 異なる角度からの市場確認</li>
              <li><strong>精度向上</strong>: 単独指標の弱点を補完</li>
              <li><strong>ダマシ回避</strong>: 複数確認による信頼性向上</li>
              <li><strong>タイミング改善</strong>: エントリー・エグジットの最適化</li>
            </ul>
          </div>
        `
      },
      {
        type: 'text',
        content: `# RSI（相対力指数）の基礎から応用
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">RSIの基本的な仕組み</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">計算の基礎概念</h3>
<strong>RSI = 100 - (100 ÷ (1 + RS))</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>RS = 上昇日の平均上昇幅 ÷ 下落日の平均下落幅</strong></li>
<li><strong>期間設定</strong>: 14日間（標準）</li>
<li><strong>範囲</strong>: 0-100の値</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">基本的な解釈</h3>
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">数値による判定</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>RSI 70以上</strong>: 買われすぎ圏（売り検討）</li>
<li><strong>RSI 30以下</strong>: 売られすぎ圏（買い検討）</li>
<li><strong>RSI 50周辺</strong>: 中立圏（様子見）</li>
<li><strong>RSI 50上抜け</strong>: 強気転換の兆候</li>
</ul>
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">トレンド環境での調整</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>強い上昇相場</strong>: 40-80レンジで推移</li>
<li><strong>強い下降相場</strong>: 20-60レンジで推移</li>
<li><strong>レンジ相場</strong>: 30-70レンジが有効</li>
</ul>
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">RSIの実践的活用法（基礎から応用）</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">ダイバージェンス分析（基礎編）</h3>
<strong>基本的なダイバージェンス</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>弱気ダイバージェンス</strong>: 価格高値更新、RSI高値未更新</li>
<li><strong>強気ダイバージェンス</strong>: 価格安値更新、RSI安値未更新</li>
<li><strong>確認方法</strong>: 2つ以上の山・谷での比較</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">実践例（2025年想定）</h3>
<strong>BTC弱気ダイバージェンス例</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>第1峰</strong>: $98,000（RSI 85）</li>
<li><strong>第2峰</strong>: $102,000（RSI 78）</li>
<li><strong>判定</strong>: 価格上昇もRSI低下→売り圧力増加の兆候</li>
<li><strong>戦略</strong>: 第2峰付近での売りエントリー検討</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">隠れダイバージェンス（応用編）</h3>
<strong>トレンド継続パターン</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>強気隠れダイバージェンス</strong>: 上昇トレンド中の調整局面</li>
</ul>
  - 価格: より高い安値形成
  - RSI: より低い安値形成
  - 意味: 上昇トレンド継続の強いシグナル
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">多期間RSI分析（応用）</h3>
<strong>時間軸別RSI確認</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>長期(日足)</strong>: 大局的なトレンド確認</li>
<li><strong>中期(4時間足)</strong>: エントリータイミング</li>
<li><strong>短期(1時間足)</strong>: 精密なエントリーポイント</li>
</ul>
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">統合判断例</h4>
1. <strong>日足RSI</strong>: 60（中立上寄り）
2. <strong>4時間足RSI</strong>: 45（中立下寄り）
3. <strong>1時間足RSI</strong>: 35（売られすぎ接近）
4. <strong>総合判断</strong>: 短期反発狙いの買いエントリー`
      },
      {
        type: 'text',
        content: `# MACD（移動平均収束拡散）の基礎から応用
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">MACDの基本構造と計算</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">3つの構成要素</h3>
1. <strong>MACD線</strong>: 12期間EMA - 26期間EMA
2. <strong>シグナル線</strong>: MACD線の9期間EMA
3. <strong>ヒストグラム</strong>: MACD線 - シグナル線
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">基本的なシグナル</h3>
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">ゴールデンクロス・デッドクロス</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>ゴールデンクロス</strong>: MACD線がシグナル線を上抜け</li>
<li><strong>デッドクロス</strong>: MACD線がシグナル線を下抜け</li>
<li><strong>ゼロライン</strong>: 強気・弱気の境界線</li>
</ul>
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">ヒストグラムの読み方</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>拡大</strong>: モメンタム増加</li>
<li><strong>縮小</strong>: モメンタム減少</li>
<li><strong>ゼロクロス</strong>: 売買シグナル</li>
</ul>
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">MACDの実践的活用法（基礎から応用）</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">基本的な売買シグナル</h3>
<strong>買いシグナル</strong>
1. <strong>MACD線 > シグナル線</strong>（ゴールデンクロス）
2. <strong>ヒストグラム > 0</strong>（上昇モメンタム）
3. <strong>MACD線 > 0</strong>（強気環境）
<strong>売りシグナル</strong>
1. <strong>MACD線 < シグナル線</strong>（デッドクロス）
2. <strong>ヒストグラム < 0</strong>（下降モメンタム）
3. <strong>MACD線 < 0</strong>（弱気環境）
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">MACDダイバージェンス（応用）</h3>
<strong>4つのダイバージェンス</strong>
1. <strong>弱気ダイバージェンス</strong>: 価格上昇、MACD低下
2. <strong>強気ダイバージェンス</strong>: 価格下落、MACD上昇
3. <strong>弱気隠れダイバージェンス</strong>: 下降トレンド継続シグナル
4. <strong>強気隠れダイバージェンス</strong>: 上昇トレンド継続シグナル
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">実践例：イーサリアム分析（2025年2月想定）</h3>
<strong>MACDゴールデンクロス戦略</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>価格</strong>: $3,200</li>
<li><strong>MACD線</strong>: -$80 → +$20（上昇転換）</li>
<li><strong>シグナル線</strong>: -$50（まだ負値）</li>
<li><strong>クロス</strong>: $3,250でゴールデンクロス発生</li>
<li><strong>エントリー</strong>: $3,260での買い</li>
<li><strong>ストップ</strong>: $3,100（直近安値）</li>
<li><strong>利確</strong>: $3,500（1.5:1リスクリワード）</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">ヒストグラム活用戦略（応用）</h3>
<strong>モメンタム転換早期察知</strong>
1. <strong>ヒストグラム縮小</strong>: 現トレンドの勢い減退
2. <strong>ゼロライン接近</strong>: 転換点近づく
3. <strong>ゼロクロス</strong>: 明確な転換シグナル
4. <strong>拡大開始</strong>: 新トレンドの勢い増加
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">MACD設定値の使い分け（応用）</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">短期取引用設定</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>MACD</strong>: 5, 13, 3（より敏感）</li>
<li><strong>用途</strong>: デイトレード・スキャルピング</li>
<li><strong>特徴</strong>: 早いシグナル、ダマシ増加</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">長期投資用設定</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>MACD</strong>: 19, 39, 9（より安定）</li>
<li><strong>用途</strong>: スイングトレード・ポジション取引</li>
<li><strong>特徴</strong>: 遅いシグナル、精度向上</li>
</ul>`
      },
      {
        type: 'text',
        content: `# ボリンジャーバンドの基礎から応用
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ボリンジャーバンドの基本構造</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">3本のラインの構成</h3>
1. <strong>中央線</strong>: 20期間の単純移動平均線
2. <strong>上バンド</strong>: 中央線 + (標準偏差 × 2)
3. <strong>下バンド</strong>: 中央線 - (標準偏差 × 2)
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">統計的な意味</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>68%</strong>: 価格が±1σバンド内に収まる確率</li>
<li><strong>95%</strong>: 価格が±2σバンド内に収まる確率</li>
<li><strong>99.7%</strong>: 価格が±3σバンド内に収まる確率</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">バンドの状態とその意味</h3>
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">スクイーズ（収縮）</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>特徴</strong>: 上下バンドが狭まる</li>
<li><strong>意味</strong>: ボラティリティ低下、ブレイクアウト前兆</li>
<li><strong>戦略</strong>: ブレイクアウト待機</li>
</ul>
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">エクスパンション（拡張）</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>特徴</strong>: 上下バンドが広がる</li>
<li><strong>意味</strong>: ボラティリティ拡大、強いトレンド</li>
<li><strong>戦略</strong>: トレンドフォロー</li>
</ul>
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ボリンジャーバンドの実践的活用法</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">バンドウォーク戦略（基礎から応用）</h3>
<strong>上バンドウォーク（強い上昇）</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>現象</strong>: 価格が上バンド沿いで推移</li>
<li><strong>意味</strong>: 非常に強い上昇トレンド</li>
<li><strong>戦略</strong>: 押し目買い継続</li>
<li><strong>注意</strong>: 天井での反転リスク</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">実践例：ソラナ上バンドウォーク（2025年3月想定）</h3>
<strong>ブレイクアウト → バンドウォーク</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>スクイーズ期</strong>: $180-$190で2週間推移</li>
<li><strong>ブレイクアウト</strong>: $195で上バンド突破</li>
<li><strong>バンドウォーク</strong>: $195→$220→$250へ連続上昇</li>
<li><strong>戦略</strong>: $200、$225、$245での段階的利確</li>
<li><strong>学習</strong>: スクイーズ後のブレイクアウトは継続しやすい</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">ボリンジャーバンド逆張り戦略（基礎）</h3>
<strong>基本的な逆張りルール</strong>
1. <strong>下バンドタッチ</strong>: 売られすぎ、反発狙い
2. <strong>上バンドタッチ</strong>: 買われすぎ、反落狙い
3. <strong>中央線回帰</strong>: バンド端から中央線への戻り
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">%Bオシレーター活用（応用）</h3>
<strong>計算式</strong>: %B = (価格 - 下バンド) ÷ (上バンド - 下バンド)
<strong>数値の意味</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>%B > 1</strong>: 上バンド上抜け（非常に強い）</li>
<li><strong>%B = 0.8</strong>: 上バンド近傍（買われすぎ）</li>
<li><strong>%B = 0.5</strong>: 中央線上（中立）</li>
<li><strong>%B = 0.2</strong>: 下バンド近傍（売られすぎ）</li>
<li><strong>%B < 0</strong>: 下バンド下抜け（非常に弱い）</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">バンド幅オシレーター（応用）</h3>
<strong>計算式</strong>: バンド幅 = (上バンド - 下バンド) ÷ 中央線
<strong>活用法</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>極小値</strong>: ブレイクアウト前兆</li>
<li><strong>極大値</strong>: トレンド終了、調整入り</li>
<li><strong>収縮→拡張</strong>: 新しいトレンド開始</li>
</ul>
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">複数時間軸でのボリンジャーバンド（応用）</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">マルチタイムフレーム戦略</h3>
<strong>上位時間軸（日足）</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>方向性</strong>: 大局的なトレンド確認</li>
<li><strong>バンド位置</strong>: 全体の強弱判定</li>
</ul>
<strong>下位時間軸（1時間足）</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>タイミング</strong>: 精密なエントリーポイント</li>
<li><strong>細かな動き</strong>: バンド内での位置確認</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">統合判断例</h3>
1. <strong>日足</strong>: 上バンド付近で推移（強気環境）
2. <strong>4時間足</strong>: 中央線サポート確認（調整後）
3. <strong>1時間足</strong>: 下バンド反発（エントリータイミング）
4. <strong>戦略</strong>: 短期反発を大局的強気で狙う`
      },
      {
        type: 'example',
        content: `<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">3指標組み合わせ実践例：ビットコイン総合分析</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">2025年4月の統合分析例（想定）</h3>
<strong>市場状況</strong>: $95,000付近でのレンジからブレイクアウト狙い

<strong>RSI分析（14日設定）</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>現在値</strong>: RSI 45（中立下寄り）</li>
<li><strong>前週</strong>: RSI 35から回復中</li>
<li><strong>ダイバージェンス</strong>: なし（価格とRSI同方向）</li>
<li><strong>判定</strong>: 売られすぎからの回復過程</li>
</ul>

<strong>MACD分析（12,26,9設定）</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>MACD線</strong>: -$800（負値だが上昇中）</li>
<li><strong>シグナル線</strong>: -$1,200</li>
<li><strong>ヒストグラム</strong>: 3日連続拡大</li>
<li><strong>状況</strong>: ゴールデンクロス接近</li>
<li><strong>判定</strong>: モメンタム転換の兆候</li>
</ul>

<strong>ボリンジャーバンド分析（20,2設定）</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>価格位置</strong>: 中央線($94,000)付近</li>
<li><strong>バンド幅</strong>: 過去2週間で最小（スクイーズ）</li>
<li><strong>%B</strong>: 0.5（中央線上）</li>
<li><strong>判定</strong>: ブレイクアウト待機状態</li>
</ul>

<strong>統合判断とエントリー戦略</strong>
1. <strong>環境認識</strong>: 全指標が中立〜弱気から回復傾向
2. <strong>シナリオ</strong>: $96,000上抜けでのブレイクアウト狙い
3. <strong>エントリー条件</strong>:
   - RSI 50上抜け
   - MACDゴールデンクロス
   - ボリンジャー上バンド突破
4. <strong>実行</strong>:
   - <strong>エントリー</strong>: $96,200
   - <strong>ストップ</strong>: $93,500（下バンド割れ）
   - <strong>利確</strong>: $100,000（4:1リスクリワード）

<strong>結果と学習ポイント</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>2日後</strong>: 条件成立で$96,150エントリー</li>
<li><strong>1週間後</strong>: $99,500到達、部分利確</li>
<li><strong>2週間後</strong>: $101,200でフル利確</li>
<li><strong>成功要因</strong>: 3指標の同時転換確認</li>
<li><strong>学習</strong>: 複数確認により精度向上、ダマシ回避</li>
</ul>

<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">ケース2: レンジ相場での逆張り戦略</h3>
<strong>イーサリアム$3,000-$3,400レンジ（2025年5月想定）</strong>

<strong>統合逆張りシグナル</strong>
1. <strong>価格</strong>: $3,050（レンジ下限付近）
2. <strong>RSI</strong>: 28（売られすぎ圏）
3. <strong>MACD</strong>: 下降から平行移動に変化
4. <strong>ボリンジャー</strong>: 下バンドタッチ後反発

<strong>エントリー実行</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>条件</strong>: 3指標すべてで反発兆候確認</li>
<li><strong>エントリー</strong>: $3,080</li>
<li><strong>ストップ</strong>: $2,950（レンジ下抜け）</li>
<li><strong>利確</strong>: $3,300（レンジ上限）</li>
</ul>

<strong>結果</strong>: 5日で$3,280到達、85%の目標達成

<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">ケース3: ダイバージェンス活用の高度戦略</h3>
<strong>アルトコイン天井察知（2025年6月想定）</strong>

<strong>複合ダイバージェンス分析</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>価格</strong>: 新高値$150更新</li>
<li><strong>RSIダイバージェンス</strong>: 前回高値より低下</li>
<li><strong>MACDダイバージェンス</strong>: ヒストグラム縮小</li>
<li><strong>ボリンジャー</strong>: 上バンド上抜けも勢い不足</li>
</ul>

<strong>統合判断</strong>: 強い天井形成シグナル
<strong>戦略</strong>: $145での段階的売却
<strong>結果</strong>: 2週間で$120まで下落、20%の下落回避
<strong>学習</strong>: 複数ダイバージェンスは強力な反転シグナル`
      },
      {
        type: 'tip',
        content: `<strong>3指標組み合わせ活用のコツ</strong>
1. <strong>段階的確認</strong>:
   - 最初に大局観（ボリンジャーバンド環境）
   - 次にモメンタム（MACD転換点）
   - 最後にタイミング（RSI過熱度）
2. <strong>矛盾シグナルの処理</strong>:
   - 3つのうち2つ以上が同方向なら実行
   - 1つだけ逆向きなら様子見
   - 全て矛盾なら取引見送り
3. <strong>時間軸の使い分け</strong>: 長期環境確認→短期タイミング調整で精度最大化！`
      },
      {
        type: 'text',
        content: `# 高度な組み合わせ戦略
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">3指標統合システム</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">レベル1: 基本的な一致確認</h3>
<strong>すべて同方向シグナル</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>RSI</strong>: 明確な買われすぎ・売られすぎ</li>
<li><strong>MACD</strong>: ゴールデンクロス・デッドクロス</li>
<li><strong>ボリンジャー</strong>: バンド突破・タッチ反発</li>
<li><strong>信頼度</strong>: 高（80%以上）</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">レベル2: 部分一致での慎重判断</h3>
<strong>2つ一致、1つ中立</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>実行</strong>: 小さなポジションでテスト</li>
<li><strong>確認</strong>: 追加シグナル待ち</li>
<li><strong>調整</strong>: 中立指標の転換で追加</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">レベル3: 矛盾シグナルでの見送り</h3>
<strong>指標間で相反するシグナル</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>原則</strong>: 取引見送り</li>
<li><strong>例外</strong>: 重要サポレジでの確認</li>
<li><strong>待機</strong>: 一致するまで様子見</li>
</ul>
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">市場環境別の使い分け</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">トレンド相場での活用</h3>
<strong>上昇トレンド中</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>RSI</strong>: 40-80レンジで判断</li>
<li><strong>MACD</strong>: ゼロライン上での押し目</li>
<li><strong>ボリンジャー</strong>: 中央線サポート確認</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">レンジ相場での活用</h3>
<strong>明確なレンジ形成時</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>RSI</strong>: 30-70の標準レンジ</li>
<li><strong>MACD</strong>: ゼロライン近辺での振動</li>
<li><strong>ボリンジャー</strong>: バンド端での反転狙い</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">ブレイクアウト相場での活用</h3>
<strong>レンジ脱出時</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>RSI</strong>: 50突破での勢い確認</li>
<li><strong>MACD</strong>: 急激な拡大</li>
<li><strong>ボリンジャー</strong>: スクイーズからの拡張</li>
</ul>
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">リスク管理との統合</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">指標一致度によるポジションサイズ</h3>
<strong>3つ一致</strong>: 標準ポジション（2-3%リスク）
<strong>2つ一致</strong>: 半分ポジション（1-1.5%リスク）
<strong>1つのみ</strong>: 見送りまたは極小ポジション
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">ストップロス設定の多重確認</h3>
1. <strong>RSI</strong>: 極値からの戻り
2. <strong>MACD</strong>: クロス無効化
3. <strong>ボリンジャー</strong>: バンド逆側到達
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">利確レベルの段階設定</h3>
<strong>第1利確</strong>: 1つ目の指標目標到達
<strong>第2利確</strong>: 2つ目の指標目標到達
<strong>最終利確</strong>: 3つ目の指標または反転シグナル
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">継続的な改善方法</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">成績記録による最適化</h3>
1. <strong>指標別成績</strong>: 各指標の単独成績
2. <strong>組み合わせ成績</strong>: 2つ・3つ一致時の成績
3. <strong>環境別成績</strong>: 市場環境別の有効性
4. <strong>改善</strong>: データに基づく調整
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">パラメーター調整</h3>
<strong>RSI期間</strong>: 14日 → 市場に応じて9-21日
<strong>MACD設定</strong>: (12,26,9) → 取引スタイルに応じて調整
<strong>ボリンジャー</strong>: (20,2) → ボラティリティに応じて調整
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">新指標の段階的追加</h3>
1. <strong>基本3指標の習得</strong>
2. <strong>出来高分析の追加</strong>
3. <strong>フィボナッチの組み合わせ</strong>
4. <strong style="color: #1f2937; font-weight: 600;">より高度な指標の段階的学習</strong>
      },
      {
        type: 'text',
        content: `
          <h1>理解度チェック</h1>
          <p>このセクションでは、RSI、MACD、ボリンジャーバンドの組み合わせ分析について理解を深めてください。RSI 35、MACDゴールデンクロス、ボリンジャーバンド下バンド反発の場合、すべて買いシグナルを示しているため、買いエントリーが適切です。</p>
          
          <h3>重要なポイント</h3>
          <div class="understanding-check">
            <ul>
              <li><strong>多角的分析</strong>：異なる角度からの市場確認で精度向上</li>
              <li><strong>指標の補完</strong>：各指標の弱点を他の指標で補完</li>
              <li><strong>段階的確認</strong>：環境認識→モメンタム→タイミングの順序</li>
              <li><strong>一致度重視</strong>：指標一致数に応じたポジションサイズ調整</li>
            </ul>
          </div>
        `
      },
      {
        type: 'warning',
        content: `<strong>3指標組み合わせ時の注意点</strong>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">1. 分析の複雑化</h3>
<strong>問題</strong>: 多数の指標で判断が困難になる
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>明確な優先順位設定</li>
<li>シンプルな判断基準作成</li>
<li>段階的な学習と適用</li>
<li>記録による継続的改善</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">2. 過度な最適化</h3>
<strong>問題</strong>: 過去データに合わせすぎた設定
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>標準設定での基本習得</li>
<li>段階的なパラメーター調整</li>
<li>複数期間での検証</li>
<li>実際の市場での検証</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">3. 矛盾シグナルの誤処理</h3>
<strong>問題</strong>: 相反するシグナルでの無理な取引
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>明確な一致基準設定</li>
<li>矛盾時の見送りルール</li>
<li>部分一致での慎重な判断</li>
<li>追加確認の徹底</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">4. 感情的判断の混入</h3>
<strong>問題</strong>: 分析結果を感情で覆す
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>機械的な基準適用</li>
<li>事前ルールの厳守</li>
<li>結果記録による客観視</li>
<li>継続的な自己改善</li>
</ul>
<strong>成功の秘訣</strong>: 複数指標の組み合わせは技術習得より、継続的で規律正しい適用が重要です。基本を確実に身につけてから段階的に高度な手法を取り入れることが成功の鍵です。`
      }
    ],
    keyPoints: [
      'RSI、MACD、ボリンジャーバンドは異なる角度で市場を分析する重要指標',
      'RSIは買われすぎ・売られすぎ、MACDはモメンタム転換、ボリンジャーバンドはボラティリティを測定',
      '3指標の同時確認で単独指標のダマシを大幅に減少',
      'ダイバージェンス分析で価格とモメンタムの乖離を早期察知',
      'バンドウォークとスクイーズでトレンドとブレイクアウトを予測',
      '指標一致度に応じたポジションサイズとリスク管理の調整',
      '市場環境（トレンド・レンジ・ブレイクアウト）に応じた使い分けが重要',
      '継続的な記録と改善により長期的な成功を実現'
    ]
  },

  quiz: [
    {
      id: 'trading-basics-rsi-macd-bollinger-fundamentals-applications-q1',
      question: 'RSI 35、MACDゴールデンクロス、ボリンジャーバンド下バンド反発の場合、適切な判断は？',
      options: [
        '指標が矛盾しているので見送り',
        'すべて買いシグナルなので買いエントリー',
        'RSIが低いので売りエントリー',
        'MACDのみを重視して判断'
      ],
      correctAnswer: 1,
      explanation: 'RSI 35は売られすぎからの反発、MACDゴールデンクロスは上昇転換、ボリンジャーバンド下バンド反発は反発シグナルで、すべて買い方向を示しているため買いエントリーが適切です。'
    },
    {
      id: 'trading-basics-rsi-macd-bollinger-fundamentals-applications-q2',
      question: 'ボリンジャーバンドのスクイーズ状態が示すものは？',
      options: [
        '強いトレンドの継続',
        'ボラティリティ低下とブレイクアウト前兆',
        '相場の終了',
        '取引量の増加'
      ],
      correctAnswer: 1,
      explanation: 'ボリンジャーバンドのスクイーズ（収縮）は、ボラティリティの低下を示し、エネルギー蓄積によるブレイクアウトの前兆となることが多いです。'
    },
    {
      id: 'trading-basics-rsi-macd-bollinger-fundamentals-applications-q3',
      question: 'MACDダイバージェンスの最も信頼性の高い確認方法は？',
      options: [
        '1回の山・谷での確認',
        '2つ以上の山・谷での価格とMACDの逆行確認',
        'MACD線のみでの判断',
        'シグナル線のみでの判断'
      ],
      correctAnswer: 1,
      explanation: 'MACDダイバージェンスは、2つ以上の山や谷で価格とMACDが逆方向に動いていることを確認することで、信頼性の高いシグナルとなります。'
    },
    {
      id: 'trading-basics-rsi-macd-bollinger-fundamentals-applications-q4',
      question: '3指標が矛盾するシグナルを示した場合の対処法は？',
      options: [
        '最も新しいシグナルを採用',
        '取引を見送るか、一致するまで待機',
        '感情で判断する',
        'ランダムに選択'
      ],
      correctAnswer: 1,
      explanation: '指標間で矛盾するシグナルが出た場合は、不確実性が高いため取引を見送るか、指標が一致するまで待機することが適切です。'
    },
    {
      id: 'trading-basics-rsi-macd-bollinger-fundamentals-applications-q5',
      question: '3指標組み合わせ分析で最も重要な原則は？',
      options: [
        '複雑な設定の使用',
        '異なる角度からの市場分析で補完効果を得る',
        '最新の指標のみ使用',
        '直感的な判断'
      ],
      correctAnswer: 1,
      explanation: '3指標組み合わせの最重要原則は、RSI（心理面）、MACD（モメンタム）、ボリンジャーバンド（統計面）という異なる角度から市場を分析し、各指標の弱点を補完することです。'
    }
  ],
  lastUpdated: '2025-08-17',
  factChecked: true
};