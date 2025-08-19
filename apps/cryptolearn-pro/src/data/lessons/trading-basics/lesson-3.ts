import type { Lesson } from '../../../types';
export const lesson3: Lesson = {
  id: 'trading-basics-support-resistance-fundamentals',
  slug: 'support-resistance-fundamentals',
  title: 'サポート・レジスタンスの基礎',
  description: '取引における最も重要な概念の一つ、サポート（支持線）とレジスタンス（抵抗線）の基本原理を学習します。価格の反発ポイントを見つけて効果的なトレード戦略を構築する方法を習得します。',
  categoryId: 'trading-basics',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 25,
  orderIndex: 3,
  isPublished: true,
  
  content: {
    sections: [
      {
        type: 'text',
        content: `
          <h1>サポート・レジスタンスの基礎知識</h1>
          
          <h2>サポート・レジスタンスとは</h2>
          <p><strong>サポート（支持線）</strong>と<strong>レジスタンス（抵抗線）</strong>は、テクニカル分析における最も重要な概念の一つです。これらは価格が反発しやすい重要な価格帯を示し、将来の価格動向を予測する上で欠かせない要素です。</p>
          
          <h3>市場参加者の心理</h3>
          <ul>
            <li><strong>買い手の集中</strong>：特定の価格帯で多くの投資家が「買いたい」と考える</li>
            <li><strong>売り手の集中</strong>：特定の価格帯で多くの投資家が「売りたい」と考える</li>
            <li><strong>記憶効果</strong>：過去に重要だった価格レベルは再び注目される</li>
            <li><strong>心理的価格</strong>：キリの良い数字（例：$50,000、$100など）は意識されやすい</li>
          </ul>
          
          <h3>基本概念の定義</h3>
          <div class="concept-box">
            <h4>サポートライン（支持線）</h4>
            <p><strong>定義</strong>：価格の下落を支えるとされる価格帯</p>
            <p><strong>特徴</strong>：この価格帯で買い注文が増加し、価格の下落が止まりやすい</p>
            <p><strong>市場心理</strong>：「この価格なら安い」と考える投資家が多い</p>
            
            <h4>レジスタンスライン（抵抗線）</h4>
            <p><strong>定義</strong>：価格の上昇を阻むとされる価格帯</p>
            <p><strong>特徴</strong>：この価格帯で売り注文が増加し、価格の上昇が止まりやすい</p>
            <p><strong>市場心理</strong>：「この価格なら高い」と考える投資家が多い</p>
          </div>
        `
      },
      {
        type: 'text',
        content: `
          <h1>サポート・レジスタンスの識別方法</h1>
          
          <h2>1. 水平ライン分析</h2>
          <h3>基本的な識別手法</h3>
          <ul>
            <li><strong>過去の高値・安値</strong>：複数回反発している価格レベルを特定</li>
            <li><strong>心理的価格</strong>：キリの良い数字（$50,000、$100等）は意識されやすい</li>
            <li><strong>出来高の確認</strong>：そのレベルでの取引量が多いほど重要度が高い</li>
            <li><strong>時間軸の考慮</strong>：長期間有効だったレベルほど信頼性が高い</li>
          </ul>
          
          <h3>識別の基本手順</h3>
          <ol>
            <li><strong>チャートの確認</strong>：日足、週足で重要な高値・安値を探す</li>
            <li><strong>反発回数の確認</strong>：同じレベルで2回以上反発していることを確認</li>
            <li><strong>出来高の確認</strong>：反発時に出来高が伴っているかを確認</li>
            <li><strong>時間軸の統一</strong>：複数の時間軸で同じレベルが意識されているかを確認</li>
          </ol>
          
          <h2>2. 動的レベル分析</h2>
          <h3>トレンドライン分析</h3>
          <div class="trend-analysis">
            <h4>動的サポート・レジスタンス</h4>
            <ul>
              <li><strong>上昇トレンドライン</strong>：連続する安値を結んだ線、動的サポートとして機能</li>
              <li><strong>下降トレンドライン</strong>：連続する高値を結んだ線、動的レジスタンスとして機能</li>
              <li><strong>チャネルライン</strong>：トレンドラインと平行な線、価格の上下限を示す</li>
            </ul>
          </div>
          
          <h3>移動平均線の活用</h3>
          <ul>
            <li><strong>20日移動平均線</strong>：短期的なサポート・レジスタンスレベル</li>
            <li><strong>50日移動平均線</strong>：中期的なトレンドの方向性を示す</li>
            <li><strong>200日移動平均線</strong>：長期的な強力なサポート・レジスタンス</li>
            <li><strong>出来高加重平均価格（VWAP）</strong>：その日の平均取引価格として機能</li>
          </ul>
        `
      },
      {
        type: 'example',
        content: `
          <h1>実践例：ビットコインのサポート・レジスタンス分析</h1>
          
          <h2>重要な価格レベルの実例分析</h2>
          
          <h3>サポートレベルの例：$50,000</h3>
          <div class="case-study">
            <h4>識別の根拠</h4>
            <ul>
              <li><strong>心理的価格</strong>：$50,000はキリの良い数字で投資家に意識されやすい</li>
              <li><strong>歴史的重要性</strong>：過去にこのレベルで何度も反発している</li>
              <li><strong>出来高の集中</strong>：この価格帯で大量の取引が発生</li>
              <li><strong>市場参加者の関心</strong>：多くのトレーダーがこのレベルを注視</li>
            </ul>
          </div>
          
          <h3>レジスタンスレベルの例：$70,000</h3>
          <div class="resistance-analysis">
            <h4>識別の根拠</h4>
            <ul>
              <li><strong>前回高値</strong>：過去にこのレベルで上昇が阻まれた履歴</li>
              <li><strong>心理的売り圧力</strong>：多くの投資家が利益確定を考える価格</li>
              <li><strong>供給量増加</strong>：この価格で売りたい投資家が多い</li>
              <li><strong>テクニカル指標との一致</strong>：移動平均線やフィボナッチレベルと重なる</li>
            </ul>
          </div>
          
          <h3>実践的なトレード戦略</h3>
          <div class="strategy-box">
            <h4>サポートでの買い戦略</h4>
            <ol>
              <li><strong>サポート付近での買いエントリー</strong>
                <ul>
                  <li>リスクリワード比：1:3〜1:4を目指す</li>
                  <li>ストップロス：サポートレベルを明確に下抜けた地点</li>
                  <li>利益目標：次のレジスタンスレベル手前</li>
                </ul>
              </li>
              <li><strong>レジスタンスブレイク戦略</strong>
                <ul>
                  <li>ブレイクの確認：出来高を伴った明確な突破</li>
                  <li>再テスト待ち：一度上昇後の下落で再びサポートとして機能するか確認</li>
                  <li>段階的エントリー：リスクを分散してポジションを構築</li>
                </ul>
              </li>
            </ol>
          </div>
          
          <h3>基本的な注意事項</h3>
          <ul>
            <li><strong>ダマシ（フェイクアウト）</strong>：一時的な突破は元のレベルに戻ることがある</li>
            <li><strong>確認の重要性</strong>：単独のシグナルではなく、複数の根拠を組み合わせる</li>
            <li><strong>リスク管理</strong>：適切なストップロスとポジションサイズの設定</li>
          </ul>
        `
      },
      {
        type: 'tip',
        content: `
          <h1>プロのテクニックとコツ</h1>
          
          <div class="pro-tips">
            <h2>📊 効果的な識別テクニック</h2>
            <ol>
              <li><strong>複数時間軸での確認</strong>：日足、週足、月足で同じレベルが機能しているか確認</li>
              <li><strong>出来高分析の重要性</strong>：サポート・レジスタンスでの取引量を確認</li>
              <li><strong>心理的価格の活用</strong>：$10,000、$50,000などキリの良い数字は特に注目</li>
              <li><strong>フィボナッチとの組み合わせ</strong>：フィボナッチリトレースメントレベルとの重なりを確認</li>
            </ol>
            
            <h2>⚡ 効率的な分析手法</h2>
            <ul>
              <li><strong>水平線の引き方</strong>：ローソク足の高値・安値ではなく、実体部分を基準にする</li>
              <li><strong>時間の考慮</strong>：古いレベルほど信頼性が高く、最近のレベルほど注目度が高い</li>
              <li><strong>市場の流れを読む</strong>：強いトレンド中はサポート・レジスタンスが破られやすい</li>
              <li><strong>ゾーンで考える</strong>：ピンポイントではなく、価格帯として考える</li>
            </ul>
            
            <div class="warning-box">
              <h3>⚠️ よくある間違い</h3>
              <ul>
                <li><strong>単純なタッチでの判断</strong>：一度触れただけでは反発とは言えない</li>
                <li><strong>時間軸の無視</strong>：短時間足だけでの判断は信頼性が低い</li>
                <li><strong>ダマシへの無防備</strong>：一時的な突破や下抜けに動揺される</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        type: 'text',
        content: `
          <h1>ロールリバーサル（役割転換）の基礎</h1>
          
          <h2>ロールリバーサルとは</h2>
          <p>ロールリバーサルとは、サポートがレジスタンスに、またはレジスタンスがサポートに「役割転換」する現象です。これは市場参加者の心理変化によって起こる重要な概念で、トレード戦略において非常に有効なツールとなります。</p>
          
          <h3>サポート→レジスタンス転換</h3>
          <div class="role-reversal-analysis">
            <h4>ブレイクダウン後の現象</h4>
            <ul>
              <li><strong>元サポートライン → 新レジスタンスライン</strong></li>
              <li><strong>心理的変化</strong>：「ここで買えばよかった」という後悔が売り圧力を生む</li>
              <li><strong>損切りの集中</strong>：元の買いポジションが損切りされる</li>
              <li><strong>新たな売り参入</strong>：下落トレンドの確認で新規売りが増加</li>
            </ul>
          </div>
          
          <h3>レジスタンス→サポート転換</h3>
          <div class="role-reversal-analysis">
            <h4>ブレイクアウト後の現象</h4>
            <ul>
              <li><strong>元レジスタンスライン → 新サポートライン</strong></li>
              <li><strong>買い意欲の増加</strong>：「もう一度この価格で買いたい」という需要</li>
              <li><strong>利益確定の抑制</strong>：上昇トレンド継続への期待</li>
              <li><strong>新規買いの参入</strong>：押し目買いの絶好のチャンス</li>
            </ul>
          </div>
          
          <h2>ロールリバーサルの活用法</h2>
          <h3>確認シグナル</h3>
          <ol>
            <li><strong>明確なブレイクの確認</strong>：出来高を伴った力強い突破</li>
            <li><strong>再テストの観察</strong>：元のレベルに戻ってきた時の反応を確認</li>
            <li><strong>ローソク足パターン</strong>：反発を示すパターンの形成</li>
            <li><strong>時間の経過</strong>：一定時間が経過してからの再テスト</li>
          </ol>
          
          <h3>実践的なトレード戦略</h3>
          <div class="practical-strategy">
            <h4>エントリータイミング</h4>
            <ul>
              <li><strong>再テスト確認</strong>：元のレベルでの反発を待つ</li>
              <li><strong>複数時間軸一致</strong>：上位足でもロールリバーサルが確認できる</li>
              <li><strong>出来高の確認</strong>：反発時に適度な出来高があること</li>
            </ul>
            
            <h4>リスク管理</h4>
            <ul>
              <li><strong>ストップロス設定</strong>：新しい役割が機能しなかった場合の損切り</li>
              <li><strong>段階的利確</strong>：複数の利益確定ポイントの設定</li>
              <li><strong>適切なポジションサイズ</strong>：リスクを限定した取引量</li>
            </ul>
          </div>
        `
      },
      {
        type: 'text',
        content: `
          <h1>コンフルエンス（重複レベル）分析</h1>
          
          <h2>複合レベルの重要性</h2>
          <p>複数のサポート・レジスタンスレベルが同じ価格帯に重なる現象を「コンフルエンス」と呼びます。これらの重複レベルは単独のレベルよりも強力で、より確実性の高いトレード機会を提供します。</p>
          
          <h3>重要な重複レベル</h3>
          <div class="confluence-analysis">
            <h4>代表的な組み合わせ</h4>
            <ol>
              <li><strong>水平線 + 移動平均線</strong>：過去の高値・安値と移動平均線の交点</li>
              <li><strong>移動平均線 + フィボナッチ</strong>：複数のテクニカル指標の合致点</li>
              <li><strong>心理的価格 + 過去の高値・安値</strong>：市場の注目度が最も高い価格帯</li>
              <li><strong>出来高プロファイル + 水平線</strong>：取引量と価格レベルの重複</li>
            </ol>
          </div>
          
          <h3>重要性の判断基準</h3>
          <div class="importance-calculation">
            <h4>重要度の評価方法</h4>
            <ul>
              <li><strong>重複の数</strong>：多くのレベルが重なるほど重要度が高い</li>
              <li><strong>時間軸の一致</strong>：複数の時間軸で確認できるレベル</li>
              <li><strong>過去の反発回数</strong>：そのレベルでの過去の成功実績</li>
              <li><strong>出来高の確認</strong>：そのレベルでの取引量の多さ</li>
            </ul>
          </div>
          
          <h2>実践的な活用法</h2>
          <h3>エントリー戦略</h3>
          <div class="practical-entry-strategy">
            <ol>
              <li><strong>重複レベルの特定</strong>：複数の指標が重なる価格帯を見つける</li>
              <li><strong>時間軸の確認</strong>：上位時間軸でも同じレベルが機能するか確認</li>
              <li><strong>反発の待機</strong>：実際にそのレベルで反発するまで待つ</li>
              <li><strong>段階的エントリー</strong>：リスクを分散してポジションを構築</li>
            </ol>
          </div>
          
          <h3>優先順位の付け方</h3>
          <div class="priority-system">
            <h4>重要度の順位付け</h4>
            <ol>
              <li><strong>重複レベルの数</strong>：3つ以上の指標が重なるレベルを最優先</li>
              <li><strong>過去の実績</strong>：そのレベルでの過去の反発成功率</li>
              <li><strong>時間軸の重要性</strong>：上位時間軸ほど重要度が高い</li>
              <li><strong>出来高の多さ</strong>：取引量が多いレベルほど信頼性が高い</li>
              <li><strong>最新性</strong>：最近形成されたレベルほど注目度が高い</li>
            </ol>
          </div>
        `
      },
      {
        type: 'warning',
        content: `
          <h1>失敗パターンと対策</h1>
          
          <div class="failure-patterns">
            <h2>🚨 よくある失敗パターン</h2>
            
            <h3>1. ダマシ（フェイクブレイクアウト）</h3>
            <div class="warning-section">
              <h4>症状</h4>
              <p>一時的にサポートやレジスタンスを突破するも、すぐに元のレベルに戻ってしまう</p>
              
              <h4>2025年対策</h4>
              <ul>
                <li><strong>機械学習確認</strong>：96%精度のLSTM/CNNモデルで真偽判定</li>
                <li><strong>オンチェーン検証</strong>：実際の資金移動を確認</li>
                <li><strong>Guardian Zones活用</strong>：自動ダマシ検出システム</li>
                <li><strong>複合確認</strong>：テクニカル + ファンダメンタル + センチメント</li>
              </ul>
            </div>
            
            <h3>2. AI速度競争の罠</h3>
            <div class="warning-section">
              <h4>症状</h4>
              <p>HFTと競争しようとして性急なエントリー、成功率大幅低下</p>
              
              <h4>2025年対策</h4>
              <ul>
                <li><strong>確認優先主義</strong>：スピードより精度を重視</li>
                <li><strong>段階的エントリー</strong>：部分ポジションで様子見</li>
                <li><strong>AI助力活用</strong>：Guardian ZonesやBias Depth Heatmap活用</li>
                <li><strong>人間の判断</strong>：最終決定は人間が行う</li>
              </ul>
            </div>
            
            <h3>3. AI過信による盲信</h3>
            <div class="warning-section">
              <h4>症状</h4>
              <p>96%精度を過信し、残り4%のリスクを軽視</p>
              
              <h4>2025年対策</h4>
              <ul>
                <li><strong>適切なリスク管理</strong>：2xATR動的ストップロス</li>
                <li><strong>複数シナリオ準備</strong>：AI予測失敗時の対応策</li>
                <li><strong>ポジションサイジング</strong>：リアルタイム市場リスク計算</li>
                <li><strong>人間の直感</strong>：AI分析 + 人間の経験の融合</li>
              </ul>
            </div>
          </div>
          
          <div class="best-practices-2025">
            <h2>✅ 2025年のベストプラクティス</h2>
            <ul>
              <li><strong>ハイブリッドアプローチ</strong>：AI分析65%向上 + 人間判断</li>
              <li><strong>動的リスク管理</strong>：市場状況に応じたリアルタイム調整</li>
              <li><strong>多層確認システム</strong>：テクニカル + オンチェーン + AI分析</li>
              <li><strong>継続学習</strong>：戦略寿命11ヶ月を考慮した定期更新</li>
            </ul>
          </div>
        `
      }
      ],
    keyPoints: [
      'サポート・レジスタンスは価格が反発しやすい重要な価格帯',
      '水平ライン、トレンドライン、移動平均線などで識別できる',
      '過去の高値・安値や心理的価格が重要なレベルとなる',
      '出来高を伴った反発ほど信頼性が高い',
      'ロールリバーサルでサポートとレジスタンスが役割転換する',
      '複数のレベルが重なるコンフルエンスは特に強力',
      'ダマシ（フェイクブレイクアウト）に注意が必要',
      '複数時間軸での確認が信頼性を高める',
      '適切なリスク管理とストップロスが重要',
      '継続的な学習と改善が成功の鍵'
    ],
    summary: 'サポート・レジスタンスはテクニカル分析の基礎中の基礎で、価格が反発しやすい重要な価格帯を識別する手法です。水平ライン、動的レベル、ロールリバーサル、コンフルエンスなどの概念を理解し、適切なリスク管理と組み合わせることで、効果的なトレーディング戦略を構築できます。'
    },

  quiz: [
    {
      id: 'trading-basics-support-resistance-fundamentals-q1',
      question: 'サポートラインの基本的な定義として最も適切なのはどれですか？',
      options: [
        '価格の上昇を阻む価格帯',
        '価格の下落を支える価格帯',
        '常に突破される価格帯',
        '出来高と関係のない価格帯'
      ],
      correctAnswer: 1,
      explanation: 'サポートラインは価格の下落を支える価格帯で、このレベルで買い注文が増加し、価格の下落が止まりやすい特徴があります。'
    },
    {
      id: 'trading-basics-support-resistance-fundamentals-q2',
      question: 'ロールリバーサル（役割転換）とは何を意味しますか？',
      options: [
        'サポートとレジスタンスが永続的に機能すること',
        'サポートがレジスタンスに、レジスタンスがサポートに役割転換すること',
        'サポートとレジスタンスが消滅すること',
        '新しいサポート・レジスタンスが発生すること'
      ],
      correctAnswer: 1,
      explanation: 'ロールリバーサルは、サポートが破られるとレジスタンスに、レジスタンスが破られるとサポートに役割転換する現象で、市場参加者の心理変化によって起こります。'
    },
    {
      id: 'trading-basics-support-resistance-fundamentals-q3',
      question: 'コンフルエンス（重複レベル）の特徴として最も適切なのはどれですか？',
      options: [
        '単独のレベルよりも弱いことが多い',
        '複数の指標が重なることでより強力になる',
        '常に突破される',
        '時間軸とは関係がない'
      ],
      correctAnswer: 1,
      explanation: 'コンフルエンスは複数のサポート・レジスタンスレベルが同じ価格帯に重なる現象で、単独のレベルよりも強力で、より確実性の高いトレード機会を提供します。'
    },
    {
      id: 'trading-basics-support-resistance-fundamentals-q4',
      question: 'サポート・レジスタンスの信頼性を高めるために最も重要な要因は何ですか？',
      options: [
        'チャートの色合い',
        '出来高を伴った反発の実績',
        '価格の絶対値',
        '取引時間の長さ'
      ],
      correctAnswer: 1,
      explanation: 'サポート・レジスタンスの信頼性は、そのレベルで過去に何度出来高を伴って反発したかの実績によって決まります。反発回数が多く、出来高を伴っているほど信頼性が高くなります。'
    },
    {
      id: 'trading-basics-support-resistance-fundamentals-q5',
      question: 'サポート・レジスタンス分析で最も重要な原則は何ですか？',
      options: [
        '一度触れたらすぐにエントリーする',
        '短時間足だけで判断する',
        '複数の根拠を組み合わせて慰重に判断する',
        '出来高を無視して価格だけで判断する'
      ],
      correctAnswer: 2,
      explanation: 'サポート・レジスタンス分析では、単一の指標に依存せず、複数の時間軸での確認、出来高の確認、他のテクニカル指標との組み合わせなど、複数の根拠を組み合わせて慰重に判断することが最も重要です。'
    }
  ],
  lastUpdated: '2025-08-17',
  factChecked: true

};