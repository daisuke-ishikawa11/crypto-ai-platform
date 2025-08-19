import type { Lesson } from '../../../types';
export const lesson6: Lesson = {
  id: 'trading-basics-macd-fundamentals',
  slug: 'macd-fundamentals',
  title: 'MACD（移動平均収束拡散法）の基礎',
  description: 'テクニカル分析の重要な指標であるMACDの基本概念、構成要素、実践的な活用方法を学習します。トレンドとモメンタムを同時に分析できるMACDの基本的な読み方とシグナルを習得します。',
  categoryId: 'trading-basics',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 28,
  orderIndex:  6,
  isPublished: true,
  tags: ['MACD', 'オシレーター', 'シグナルライン', 'ヒストグラム', 'ダイバージェンス'],
  
  content: {
    sections: [
      {
        type: 'text',
        content: `
          <h1>MACD（移動平均収束拡散法）の基礎</h1>
          
          <h2>MACDとは</h2>
          <p><strong>MACD（Moving Average Convergence Divergence）</strong>は、1970年代にジェラルド・アペルによって開発されたテクニカル指標です。トレンドフォローとオシレーターの両方の特性を持ち、トレンドの強さと転換点を同時に分析できる強力なツールです。</p>
          
          <h3>MACDの基本概念</h3>
          <div class="macd-basics">
            <h4>主な特徴</h4>
            <ul>
              <li><strong>二重性</strong>：トレンドフォローとオシレーターの機能を併せ持つ</li>
              <li><strong>遅行性の軽減</strong>：移動平均線より早いシグナル提供</li>
              <li><strong>モメンタム測定</strong>：価格変動の勢いを数値化</li>
              <li><strong>ダイバージェンス検出</strong>：価格とモメンタムの乖離を特定</li>
            </ul>
          </div>
          
          <h3>MACDの3つの構成要素</h3>
          <div class="macd-components">
            <h4>1. MACDライン（MACD Line）</h4>
            <ul>
              <li><strong>計算式</strong>：短期EMA（12日）- 長期EMA（26日）</li>
              <li><strong>意味</strong>：短期と長期トレンドの差を表示</li>
              <li><strong>特徴</strong>：プラス圏で上昇トレンド、マイナス圏で下降トレンド</li>
            </ul>
            
            <h4>2. シグナルライン（Signal Line）</h4>
            <ul>
              <li><strong>計算式</strong>：MACDラインの9日EMA</li>
              <li><strong>意味</strong>：MACDの平滑化された値</li>
              <li><strong>用途</strong>：MACDラインとのクロスでシグナル生成</li>
            </ul>
            
            <h4>3. ヒストグラム（Histogram）</h4>
            <ul>
              <li><strong>計算式</strong>：MACDライン - シグナルライン</li>
              <li><strong>意味</strong>：2つのラインの差をバーで表示</li>
              <li><strong>特徴</strong>：ゼロラインを境にプラス・マイナスで表示</li>
            </ul>
          </div>
          
          <h3>標準的な設定</h3>
          <div class="standard-settings">
            <h4>一般的なパラメータ</h4>
            <ul>
              <li><strong>短期EMA</strong>：12日</li>
              <li><strong>長期EMA</strong>：26日</li>
              <li><strong>シグナルライン</strong>：9日</li>
              <li><strong>表記</strong>：MACD(12,26,9)として表示</li>
            </ul>
          </div>
        `
      },
      {
        type: 'text',
        content: `
          <h1>MACDの基本的な読み方</h1>
          
          <h2>ゼロラインとトレンド判定</h2>
          
          <h3>ゼロライン上（プラス圏）の意味</h3>
          <div class="positive-zone">
            <h4>基本的な理解</h4>
            <ul>
              <li><strong>数値の意味</strong>：短期EMA > 長期EMA</li>
              <li><strong>トレンドの方向</strong>：上昇トレンドが優勢</li>
              <li><strong>基本戦略</strong>：押し目買いを基本とする</li>
              <li><strong>市場心理</strong>：買い圧力が売り圧力を上回る状態</li>
            </ul>
          </div>
          
          <h3>ゼロライン下（マイナス圏）の意味</h3>
          <div class="negative-zone">
            <h4>基本的な理解</h4>
            <ul>
              <li><strong>数値の意味</strong>：短期EMA < 長期EMA</li>
              <li><strong>トレンドの方向</strong>：下降トレンドが優勢</li>
              <li><strong>基本戦略</strong>：戻り売りを基本とする</li>
              <li><strong>市場心理</strong>：売り圧力が買い圧力を上回る状態</li>
            </ul>
          </div>
          
          <h2>重要なシグナル：ゼロラインクロス</h2>
          
          <h3>ゴールデンクロス（上向きクロス）</h3>
          <div class="golden-cross">
            <h4>発生条件</h4>
            <p>MACDラインがゼロラインを下から上に突破</p>
            
            <h4>シグナルの意味</h4>
            <ul>
              <li><strong>トレンド転換</strong>：下降トレンドから上昇トレンドへの転換</li>
              <li><strong>シグナル強度</strong>：強い買いシグナル</li>
              <li><strong>継続性</strong>：比較的長期間のトレンド継続が期待</li>
              <li><strong>確認事項</strong>：出来高の増加を伴うことが理想的</li>
            </ul>
          </div>
          
          <h3>デッドクロス（下向きクロス）</h3>
          <div class="dead-cross">
            <h4>発生条件</h4>
            <p>MACDラインがゼロラインを上から下に突破</p>
            
            <h4>シグナルの意味</h4>
            <ul>
              <li><strong>トレンド転換</strong>：上昇トレンドから下降トレンドへの転換</li>
              <li><strong>シグナル強度</strong>：強い売りシグナル</li>
              <li><strong>継続性</strong>：比較的長期間の下落トレンドが期待</li>
              <li><strong>確認事項</strong>：出来高の増加を伴うことが理想的</li>
            </ul>
          </div>
        `
      },
      {
        type: 'example',
        content: `
          <h1>実践例：ビットコインでのMACD活用</h1>
          
          <h2>基本的なMACDシグナルの実例</h2>
          
          <h3>ゼロラインクロス買いシグナルの例</h3>
          <div class="bullish-example">
            <h4>状況設定</h4>
            <ul>
              <li><strong>価格動向</strong>：$40,000から$35,000まで下落後、底値圏で推移</li>
              <li><strong>MACD状況</strong>：MACDラインがゼロラインを下から上に突破</li>
              <li><strong>ヒストグラム</strong>：マイナス圏からプラス圏への転換</li>
              <li><strong>出来高</strong>：突破時に前日比1.5倍の出来高</li>
            </ul>
            
            <h4>エントリー判断</h4>
            <ul>
              <li><strong>エントリー価格</strong>：$36,500（ゼロラインクロス確認後）</li>
              <li><strong>ストップロス</strong>：$34,000（前回安値付近）</li>
              <li><strong>利益目標</strong>：$45,000（前回高値付近）</li>
              <li><strong>リスクリワード比</strong>：1:3.4（理想的な比率）</li>
            </ul>
            
            <h4>結果</h4>
            <p>6週間で$44,500まで上昇し、22%の利益を確保</p>
          </div>
          
          <h3>シグナルラインクロスの例</h3>
          <div class="signal-cross-example">
            <h4>買いシグナル</h4>
            <ul>
              <li><strong>発生条件</strong>：MACDラインがシグナルラインを下から上抜け</li>
              <li><strong>確認方法</strong>：ヒストグラムがマイナスからプラスに転換</li>
              <li><strong>タイミング</strong>：ゼロライン下での発生は早期転換サイン</li>
              <li><strong>注意点</strong>：ゼロラインクロスより早いが、信頼性は劣る</li>
            </ul>
            
            <h4>売りシグナル</h4>
            <ul>
              <li><strong>発生条件</strong>：MACDラインがシグナルラインを上から下抜け</li>
              <li><strong>確認方法</strong>：ヒストグラムがプラスからマイナスに転換</li>
              <li><strong>タイミング</strong>：ゼロライン上での発生は早期転換サイン</li>
              <li><strong>活用法</strong>：利益確定や早期警戒シグナルとして活用</li>
            </ul>
          </div>
          
          <h3>基本的な学習ポイント</h3>
          <div class="learning-points">
            <ul>
              <li><strong>シグナルの強度</strong>：ゼロラインクロス > シグナルラインクロス</li>
              <li><strong>確認の重要性</strong>：ヒストグラムでの裏付け確認</li>
              <li><strong>出来高との組み合わせ</strong>：シグナル発生時の出来高確認</li>
              <li><strong>複数確認</strong>：他のテクニカル指標との組み合わせ</li>
            </ul>
          </div>
        `
      },
      {
        type: 'tip',
        content: `
          <h1>MACD活用のコツとテクニック</h1>
          
          <div class="macd-tips">
            <h2>📊 効果的なシグナル判定方法</h2>
            
            <h3>1. シグナルの強度判定</h3>
            <ul>
              <li><strong>強度順位</strong>：ゼロラインクロス > シグナルラインクロス</li>
              <li><strong>ヒストグラム確認</strong>：拡大・縮小で勢いを判断</li>
              <li><strong>時間軸一致</strong>：上位時間軸での方向性と一致確認</li>
              <li><strong>出来高裏付け</strong>：シグナル発生時の取引量確認</li>
            </ul>
            
            <h3>2. 基本的な設定パラメータ</h3>
            <div class="parameter-settings">
              <h4>取引スタイル別の最適設定</h4>
              <ul>
                <li><strong>短期取引</strong>：(5,13,5) - より敏感なシグナル</li>
                <li><strong>標準設定</strong>：(12,26,9) - バランスの取れた分析</li>
                <li><strong>長期投資</strong>：(19,39,9) - より安定したシグナル</li>
                <li><strong>暗号通貨</strong>：(12,26,9) - 標準設定が最適</li>
              </ul>
            </div>
            
            <h3>3. ダマシ（フェイクシグナル）対策</h3>
            <ul>
              <li><strong>複数指標確認</strong>：RSI、移動平均線との組み合わせ</li>
              <li><strong>出来高確認</strong>：シグナル発生時の取引量チェック</li>
              <li><strong>時間軸統一</strong>：複数時間軸での一致確認</li>
              <li><strong>段階的エントリー</strong>：一度に全てのポジションを取らない</li>
            </ul>
            
            <h3>4. 実践的な活用のコツ</h3>
            <div class="practical-tips">
              <ul>
                <li><strong>忍耐力</strong>：明確なシグナルが出るまで待つ</li>
                <li><strong>確認作業</strong>：複数の根拠が揃ってからエントリー</li>
                <li><strong>リスク管理</strong>：適切なストップロスとポジションサイズ</li>
                <li><strong>継続学習</strong>：成功・失敗事例の分析と改善</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        type: 'text',
        content: `
          <h1>ヒストグラム分析の基礎</h1>
          
          <h2>ヒストグラムの基本概念</h2>
          <p>ヒストグラムは、MACDラインとシグナルラインの差を視覚的に表示する棒グラフです。モメンタムの変化を最も早く捉えることができる重要な指標です。</p>
          
          <h3>プラス領域（山）の意味</h3>
          <div class="positive-histogram">
            <h4>基本的な解釈</h4>
            <ul>
              <li><strong>数値の意味</strong>：MACDライン > シグナルライン</li>
              <li><strong>モメンタム</strong>：上昇圧力が強い状態</li>
              <li><strong>拡大時</strong>：上昇が加速している</li>
              <li><strong>縮小時</strong>：上昇が減速している</li>
            </ul>
          </div>
          
          <h3>マイナス領域（谷）の意味</h3>
          <div class="negative-histogram">
            <h4>基本的な解釈</h4>
            <ul>
              <li><strong>数値の意味</strong>：MACDライン < シグナルライン</li>
              <li><strong>モメンタム</strong>：下降圧力が強い状態</li>
              <li><strong>拡大時</strong>：下降が加速している</li>
              <li><strong>縮小時</strong>：下降が減速している</li>
            </ul>
          </div>
          
          <h2>ヒストグラムによる精密なタイミング分析</h2>
          
          <h3>早期転換シグナルの発見</h3>
          <div class="early-signals">
            <ol>
              <li><strong>ヒストグラムの縮小開始</strong>：現在のトレンド減速の兆候</li>
              <li><strong>ゼロライン接近</strong>：間もなくシグナルクロス発生の予兆</li>
              <li><strong>反対側への拡大</strong>：新しいトレンドの確立</li>
            </ol>
          </div>
          
          <h3>モメンタムの強弱判定</h3>
          <div class="momentum-analysis">
            <h4>ヒストグラムの形状による判断</h4>
            <ul>
              <li><strong>大きな山・谷</strong>：強いモメンタムの継続を示唆</li>
              <li><strong>小さな山・谷</strong>：弱いモメンタム、調整の可能性</li>
              <li><strong>連続する山・谷</strong>：トレンドの持続性を確認</li>
              <li><strong>平坦な推移</strong>：方向性の不明確さを示す</li>
            </ul>
          </div>
        `
      },
      {
        type: 'text',
        content: `
          <h1>MACDダイバージェンス分析の基礎</h1>
          
          <h2>ダイバージェンス（乖離）とは</h2>
          <p>ダイバージェンスとは、価格とMACDの動きが逆方向に進む現象で、トレンド転換の重要な先行指標として機能します。市場の勢いの変化を早期に捉えることができる強力なツールです。</p>
          
          <h2>強気ダイバージェンス（Bullish Divergence）</h2>
          <div class="bullish-divergence">
            <h3>発生条件</h3>
            <ul>
              <li><strong>価格の動き</strong>：より低い安値を記録（下落継続）</li>
              <li><strong>MACDの動き</strong>：より高い安値を記録（上昇転換の兆候）</li>
              <li><strong>ヒストグラム</strong>：より浅い谷を形成（売り圧力の減少）</li>
            </ul>
            
            <h3>基本的な分析手順</h3>
            <ol>
              <li><strong>価格チャートの確認</strong>：安値が切り下がっていることを確認</li>
              <li><strong>MACDの確認</strong>：安値が切り上がっていることを確認</li>
              <li><strong>期間の確認</strong>：十分な期間（2週間以上）で形成されているか</li>
              <li><strong>転換シグナル待ち</strong>：シグナルラインクロスなどの確認シグナルを待つ</li>
            </ol>
            
            <h3>基本的なトレード戦略</h3>
            <ul>
              <li><strong>エントリータイミング</strong>：シグナルクロス上抜け確認後</li>
              <li><strong>ストップロス</strong>：ダイバージェンス起点安値の下</li>
              <li><strong>利益確定</strong>：前回高値や重要な抵抗レベル付近</li>
            </ul>
          </div>
          
          <h2>弱気ダイバージェンス（Bearish Divergence）</h2>
          <div class="bearish-divergence">
            <h3>発生条件</h3>
            <ul>
              <li><strong>価格の動き</strong>：より高い高値を記録（上昇継続）</li>
              <li><strong>MACDの動き</strong>：より低い高値を記録（下降転換の兆候）</li>
              <li><strong>ヒストグラム</strong>：より低い山を形成（買い圧力の減少）</li>
            </ul>
            
            <h3>基本的な分析手順</h3>
            <ol>
              <li><strong>価格チャートの確認</strong>：高値が切り上がっていることを確認</li>
              <li><strong>MACDの確認</strong>：高値が切り下がっていることを確認</li>
              <li><strong>期間の確認</strong>：十分な期間で形成されているか</li>
              <li><strong>転換シグナル待ち</strong>：シグナルラインクロスなどの確認シグナルを待つ</li>
            </ol>
            
            <h3>基本的なトレード戦略</h3>
            <ul>
              <li><strong>エントリータイミング</strong>：シグナルクロス下抜け確認後</li>
              <li><strong>ストップロス</strong>：ダイバージェンス起点高値の上</li>
              <li><strong>利益確定</strong>：前回安値や重要なサポートレベル付近</li>
            </ul>
          </div>
          
          <h2>ダイバージェンス分析のコツ</h2>
          <div class="divergence-tips">
            <h3>有効なダイバージェンスの特徴</h3>
            <ul>
              <li><strong>明確な乖離</strong>：視覚的にはっきりと判別できる</li>
              <li><strong>十分な期間</strong>：2週間以上かけて形成される</li>
              <li><strong>極端なレベル</strong>：ゼロライン付近での発生</li>
              <li><strong>複数ポイント確認</strong>：高値・安値の複数ポイントで確認</li>
            </ul>
            
            <h3>無効なダイバージェンスの特徴</h3>
            <ul>
              <li><strong>微細な差異</strong>：小さな価格差やMACD差</li>
              <li><strong>短期形成</strong>：数日での急激な形成</li>
              <li><strong>不明確な状況</strong>：明確なトレンドが存在しない中での発生</li>
            </ul>
          </div>
        `
      },
      {
        type: 'quiz',
        content: '理解度チェック',
        metadata: {
          questions: [
            {
              question: 'MACDラインがシグナルラインを下から上に抜ける現象は何を意味しますか？',
              options: [
                '売りシグナルの発生',
                '買いシグナルの発生',
                'トレンドの終了',
                '価格の横ばい継続'
              ],
              correctAnswer: '買いシグナルの発生',
              explanation: 'MACDラインがシグナルラインを下から上抜けることは買いシグナルであり、ヒストグラムがマイナスからプラスに転換することでも確認できます。',
            },
      ]
    }
      },
      {
        type: 'text',
        content: `
          <h1>実践的なMACDトレード戦略</h1>
          
          <h2>1. トレンドフォロー戦略（基本アプローチ）</h2>
          
          <h3>上昇トレンド中の活用</h3>
          <div class="uptrend-strategy">
            <h4>基本条件</h4>
            <ul>
              <li><strong>メイン条件</strong>：MACDラインがゼロライン上で推移</li>
              <li><strong>確認事項</strong>：価格が上昇トレンドを継続中</li>
              <li><strong>出来高</strong>：適度な取引量を伴っている</li>
            </ul>
            
            <h4>エントリーポイント</h4>
            <ul>
              <li><strong>タイミング</strong>：ヒストグラムが底値圏から拡大開始</li>
              <li><strong>確認シグナル</strong>：シグナルラインクロス上抜け</li>
              <li><strong>リスク管理</strong>：ゼロライン割れでストップロス</li>
            </ul>
          </div>
          
          <h3>下降トレンド中の活用</h3>
          <div class="downtrend-strategy">
            <h4>基本条件</h4>
            <ul>
              <li><strong>メイン条件</strong>：MACDラインがゼロライン下で推移</li>
              <li><strong>確認事項</strong>：価格が下降トレンドを継続中</li>
              <li><strong>市場環境</strong>：弱気センチメントが支配的</li>
            </ul>
            
            <h4>売りエントリーポイント</h4>
            <ul>
              <li><strong>タイミング</strong>：ヒストグラムが天井圏から拡大開始</li>
              <li><strong>確認シグナル</strong>：シグナルラインクロス下抜け</li>
              <li><strong>リスク管理</strong>：ゼロライン超えでストップロス</li>
            </ul>
          </div>
          
          <h2>2. マルチタイムフレーム戦略（高度なアプローチ）</h2>
          
          <div class="multi-timeframe">
            <h3>時間軸の組み合わせ</h3>
            <ul>
              <li><strong>長期軸（日足）</strong>：メイントレンドの方向性を確認</li>
              <li><strong>中期軸（4時間足）</strong>：エントリーの方向性を決定</li>
              <li><strong>短期軸（1時間足）</strong>：精密なタイミングを調整</li>
            </ul>
            
            <h3>実践的な手順</h3>
            <ol>
              <li><strong>ステップ1：日足MACD確認</strong>
                <ul>
                  <li>ゼロライン上で上昇トレンド確認</li>
                  <li>メイントレンドの方向性を把握</li>
                </ul>
              </li>
              <li><strong>ステップ2：4時間足MACD分析</strong>
                <ul>
                  <li>シグナルクロス上抜けを待つ</li>
                  <li>エントリーのタイミングを特定</li>
                </ul>
              </li>
              <li><strong>ステップ3：1時間足で精密エントリー</strong>
                <ul>
                  <li>ヒストグラム拡大でエントリー実行</li>
                  <li>リスクを最小限に抑えたポジション構築</li>
                </ul>
              </li>
            </ol>
          </div>
        `
      },
      {
        type: 'warning',
        content: `
          <h1>MACD使用時の重要な注意点</h1>
          
          <div class="macd-warnings">
            <h2>🚨 よくある失敗パターンと対策</h2>
            
            <h3>1. レンジ相場でのダマシシグナル</h3>
            <div class="warning-section">
              <h4>問題</h4>
              <p>横ばい相場ではMACDクロスが頻繁に発生し、多くが無効なシグナル</p>
              
              <h4>対策</h4>
              <ul>
                <li><strong>トレンド確認</strong>：事前にトレンドの有無を移動平均線で確認</li>
                <li><strong>サポレジ結合</strong>：サポート・レジスタンスとの組み合わせ</li>
                <li><strong>ヒストグラム重視</strong>：クロスよりもヒストグラムの変化を重視</li>
                <li><strong>出来高確認</strong>：シグナル発生時の取引量を確認</li>
              </ul>
            </div>
            
            <h3>2. 急激な価格変動への遅れ</h3>
            <div class="warning-section">
              <h4>問題</h4>
              <p>重要なニュースやイベントによる急激な価格変動に反応が遅い</p>
              
              <h4>対策</h4>
              <ul>
                <li><strong>ニュース監視</strong>：重要な発表やイベントのスケジュール把握</li>
                <li><strong>短期設定活用</strong>：ボラティリティが高い時期は短期設定を併用</li>
                <li><strong>価格アクション</strong>：ローソク足の動きを同時に監視</li>
                <li><strong>リスク管理</strong>：急変動時はポジションサイズを縮小</li>
              </ul>
            </div>
            
            <h3>3. 設定パラメータの不適合</h3>
            <div class="warning-section">
              <h4>問題</h4>
              <p>標準設定(12,26,9)がすべての市場や時期に最適とは限らない</p>
              
              <h4>対策</h4>
              <ul>
                <li><strong>市場特性理解</strong>：暗号通貨のボラティリティや取引特性を把握</li>
                <li><strong>バックテスト</strong>：過去データで異なる設定の有効性を検証</li>
                <li><strong>複数設定</strong>：異なるパラメータで同時に分析</li>
                <li><strong>定期見直し</strong>：市場環境の変化に応じて調整</li>
              </ul>
            </div>
          </div>
          
          <div class="best-practices">
            <h2>✅ MACD成功のための基本原則</h2>
            <ul>
              <li><strong>単独使用を避ける</strong>：他のテクニカル指標と必ず組み合わせる</li>
              <li><strong>相場環境を考慮</strong>：トレンド相場かレンジ相場かを判断</li>
              <li><strong>適切なリスク管理</strong>：ストップロスとポジションサイズの徹底</li>
              <li><strong>継続的学習</strong>：成功・失敗事例の分析と改善</li>
            </ul>
          </div>
        `
      },
      ],
    keyPoints: [
      'MACDはトレンドフォローとオシレーターの両方の特性を持つ強力な指標',
      'ゼロラインクロスは強いトレンド転換シグナルであり最重要',
      'シグナルラインクロスは早期の売買タイミングを提供',
      'ヒストグラムでモメンタムの強弱と変化を精密に分析可能',
      'ダイバージェンスはトレンド転換の重要な先行指標',
      'マルチタイムフレーム分析で信頼性と精度を大幅向上',
      'レンジ相場ではダマシシグナルが多発するため注意が必要',
      '他のテクニカル指標との組み合わせが効果的で必須',
      '適切なリスク管理と段階的エントリーが成功の鍵',
      '急激な市場変動時はファンダメンタル分析との併用が重要'
    ]
    },

  quiz: [
    {
      id: 'trading-basics-macd-fundamentals-q1',
      question: 'MACDラインがゼロラインを下から上に突破するシグナルの名称は何ですか？',
      options: [
        'デッドクロス',
        'ゴールデンクロス',
        'シグナルクロス',
        'ヒストグラムクロス'
      ],
      correctAnswer: 1,
      explanation: 'MACDラインがゼロラインを下から上に突破するシグナルは「ゴールデンクロス」と呼ばれ、強い買いシグナルとして重要視されます。'
    },
    {
      id: 'trading-basics-macd-fundamentals-q2',
      question: 'ヒストグラムがプラス圏で拡大している場合、何を意味しますか？',
      options: [
        '上昇モメンタムが加速している',
        '下降モメンタムが加速している',
        '相場が横ばいで推移している',
        'ボラティリティが低下している'
      ],
      correctAnswer: 0,
      explanation: 'ヒストグラムがプラス圏で拡大している場合、MACDラインがシグナルラインよりも大きく上回り、上昇モメンタムが加速していることを示します。'
    },
    {
      id: 'trading-basics-macd-fundamentals-q3',
      question: '弱気ダイバージェンスの発生条件として正しいのはどれですか？',
      options: [
        '価格が低い安値を記録し、MACDが高い安値を記録',
        '価格が高い高値を記録し、MACDが低い高値を記録',
        '価格とMACDが同じ方向に動く',
        'ヒストグラムがゼロライン上で推移'
      ],
      correctAnswer: 1,
      explanation: '弱気ダイバージェンスは、価格がより高い高値を更新したにも関わらず、MACDがより低い高値しか記録できない状況で発生し、下落転換の先行指標となります。'
    },
    {
      id: 'trading-basics-macd-fundamentals-q4',
      question: 'MACDの標準的なパラメータ設定は何ですか？',
      options: [
        '(5,13,5)',
        '(12,26,9)',
        '(14,30,7)',
        '(20,50,10)'
      ],
      correctAnswer: 1,
      explanation: 'MACDの標準パラメータは(12,26,9)で、これは12日短期EMA、26日長期EMA、9日シグナルラインを意味し、最も一般的でバランスの取れた設定です。'
    },
    {
      id: 'trading-basics-macd-fundamentals-q5',
      question: 'MACDを使用する際に最も重要な注意点は何ですか？',
      options: [
        'MACDシグナルだけでトレードする',
        '短期設定でのみ使用する',
        '他のテクニカル指標と組み合わせて使用する',
        '出来高を無視して使用する'
      ],
      correctAnswer: 2,
      explanation: 'MACDは強力な指標ですが、単独で使用するのではなく、RSI、移動平均線、サポート・レジスタンス、出来高などの他の指標と組み合わせて使用することが最も重要です。'
    }
  ],
  lastUpdated: '2025-08-17',
  factChecked: true

};