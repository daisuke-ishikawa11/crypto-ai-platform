import type { Lesson } from '../../../types';
export const export const lesson20: Lesson = {
  id: 'trading-basics-comprehensive-practice',
  slug: 'comprehensive-practice',
  title: '総合実践：基本テクニカル分析の組み合わせ',
  description: '学習した基本的なテクニカル分析手法を組み合わせて、実際の取引での実践的な活用方法と判断手順を学習します。',
  categoryId: 'trading-basics',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 35,
  orderIndex: 20,
  isPublished: true,
  tags: ['総合実践', '基本分析', '組み合わせ手法', '実践応用', '判断手順'],
  
  content: {
    sections: [
      {
        type: 'text',
        content: `
          <h1>基本テクニカル分析の統合実践</h1>
          
          <h2>学習してきた基本手法の復習</h2>
          <p>これまで学習した<strong>基本的なテクニカル分析手法</strong>を組み合わせて、より確実性の高い分析を行う方法を学びます。複数の指標を組み合わせることで、<strong>単独指標の弱点を補い</strong>、より安定した取引判断ができるようになります。</p>
          
          <h3>学習済みの基本手法</h3>
          <div class="basic-methods-review">
            <h4>基本的なトレンド分析</h4>
            <ol>
              <li><strong>移動平均線</strong>: トレンド方向の基本的な確認</li>
              <li><strong>サポート・レジスタンス</strong>: 重要価格レベルの識別</li>
              <li><strong>トレンドライン</strong>: 価格の方向性確認</li>
            </ol>
            
            <h4>基本的なオシレーター</h4>
            <ol>
              <li><strong>RSI</strong>: 買われすぎ・売られすぎの基本判定</li>
              <li><strong>MACD</strong>: トレンド転換の基本シグナル</li>
              <li><strong>ストキャスティクス</strong>: 短期的な売買タイミング</li>
            </ol>
            
            <h4>基本的なボラティリティ指標</h4>
            <ol>
              <li><strong>ボリンジャーバンド</strong>: 価格レンジとブレイクアウト</li>
              <li><strong>ATR</strong>: リスク管理とボラティリティ測定</li>
              <li><strong>出来高分析</strong>: 価格動向の信頼性確認</li>
            </ol>
          </div>
          
          <h3>組み合わせ分析の基本原則</h3>
          <div class="combination-principles">
            <h4>補完性の原則</h4>
            <ul>
              <li><strong>異なる種類の指標を組み合わせ</strong>: トレンド系＋オシレーター系</li>
              <li><strong>時間軸の違いを活用</strong>: 短期・中期・長期の組み合わせ</li>
              <li><strong>確認の重複</strong>: 複数指標での同方向シグナル</li>
              <li><strong>弱点の補完</strong>: 一つの指標の弱点を他で補う</li>
            </ul>
            
            <h4>実用性の原則</h4>
            <ul>
              <li><strong>シンプルさ維持</strong>: 3-4個程度の指標に限定</li>
              <li><strong>理解できる範囲</strong>: 使用する指標を完全に理解</li>
              <li><strong>継続可能性</strong>: 毎回同じ手順で分析</li>
              <li><strong>記録・検証</strong>: 結果の記録と改善</li>
            </ul>
          </div>
        `
      },
      {
        type: 'text',
        content: `<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">基本的な組み合わせパターン</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">パターン1: トレンド確認型</h3>
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">基本構成</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>主軸</strong>: 移動平均線(20日・50日)</li>
<li><strong>確認</strong>: MACD</li>
<li><strong>タイミング</strong>: RSI</li>
<li><strong>リスク管理</strong>: ATR</li>
</ul>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">分析手順</h4>
<ol style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>トレンド確認</strong>: 20日MA > 50日MA で上昇トレンド</li>
<li><strong>モメンタム確認</strong>: MACDが正値でシグナル線上抜け</li>
<li><strong>エントリータイミング</strong>: RSI 30-70域での押し目</li>
<li><strong>ストップロス</strong>: ATR 2倍での設定</li>
</ol>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">適用場面</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>明確なトレンド相場</strong></li>
<li><strong>中期的な方向感が明確</strong></li>
<li><strong>リスクを抑えた順張り取引</strong></li>
</ul>

<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">パターン2: レンジブレイク型</h3>
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">基本構成</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>レンジ識別</strong>: サポート・レジスタンス</li>
<li><strong>ブレイク確認</strong>: ボリンジャーバンド</li>
<li><strong>強度確認</strong>: 出来高</li>
<li><strong>継続性</strong>: RSI</li>
</ul>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">分析手順</h4>
<ol style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>レンジ確認</strong>: 明確なサポート・レジスタンス形成</li>
<li><strong>ブレイク待機</strong>: ボリンジャーバンド上下限突破</li>
<li><strong>出来高確認</strong>: 平均出来高の150%以上</li>
<li><strong>継続確認</strong>: RSI極値でない(20-80域)</li>
</ol>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">適用場面</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>レンジ相場からの脱出局面</strong></li>
<li><strong>重要価格レベルでの攻防</strong></li>
<li><strong>新しいトレンドの始まり</strong></li>
</ul>

<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">パターン3: 逆張り型</h3>
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">基本構成</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>過熱確認</strong>: RSI・ストキャスティクス</li>
<li><strong>サポート確認</strong>: 重要価格レベル</li>
<li><strong>反転確認</strong>: ローソク足パターン</li>
<li><strong>リスク管理</strong>: 厳格なストップロス</li>
</ul>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">分析手順</h4>
<ol style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>過熱確認</strong>: RSI 70以上(買われすぎ)または30以下(売られすぎ)</li>
<li><strong>価格レベル</strong>: 重要なサポート・レジスタンス到達</li>
<li><strong>反転兆候</strong>: ピンバー・十字線等の反転パターン</li>
<li><strong>早期損切り</strong>: サポート・レジスタンス明確突破で損切り</li>
</ol>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">適用場面</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>オーバーシュート後の調整</strong></li>
<li><strong>重要価格レベルでの反発狙い</strong></li>
<li><strong>短期的な利益確定</strong></li>
</ul>`
      },
      {
        type: 'example',
        content: `<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">実践例：ビットコイン分析（2025年1月想定）</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">ケース1: トレンド確認型の実践</h3>
<div style="background: #f8f9fa; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<strong>市場状況</strong>: ビットコイン $85,000付近で推移<br>
<strong>分析日</strong>: 2025年1月15日（想定）
</div>

<div style="background: #e8f5e8; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<strong>ステップ1: トレンド確認</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>20日移動平均</strong>: $82,000（上昇傾向）</li>
<li><strong>50日移動平均</strong>: $78,000（上昇継続）</li>
<li><strong>判定</strong>: 上昇トレンド継続中（20日MA > 50日MA）</li>
</ul>
</div>

<div style="background: #e3f2fd; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<strong>ステップ2: MACD確認</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>MACD線</strong>: +1,200（正値）</li>
<li><strong>シグナル線</strong>: +800（上抜け継続）</li>
<li><strong>ヒストグラム</strong>: 拡大中（モメンタム強化）</li>
<li><strong>判定</strong>: 上昇モメンタム継続</li>
</ul>
</div>

<div style="background: #fff3e0; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<strong>ステップ3: RSI確認</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>RSI</strong>: 45（中立域）</li>
<li><strong>前日</strong>: 55（過熱感なし）</li>
<li><strong>判定</strong>: エントリー可能域内</li>
</ul>
</div>

<div style="background: #fce4ec; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<strong>ステップ4: ATRリスク管理</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>ATR</strong>: $2,500</li>
<li><strong>エントリー</strong>: $85,000</li>
<li><strong>ストップロス</strong>: $80,000（2×ATR = $5,000下）</li>
<li><strong>利確目標</strong>: $92,500（1.5:1 リスクリワード）</li>
</ul>
</div>

<div style="background: #e0f2f1; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<strong>結果</strong>: すべての指標が同方向→買いエントリー実行
</div>

<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">ケース2: レンジブレイク型の実践</h3>
<div style="background: #f8f9fa; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<strong>市場状況</strong>: 2週間の$80,000-$90,000レンジ相場
</div>

<div style="background: #e8f5e8; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<strong>ステップ1: レンジ確認</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>レジスタンス</strong>: $90,000（3回反発）</li>
<li><strong>サポート</strong>: $80,000（4回支持）</li>
<li><strong>期間</strong>: 14日間継続</li>
<li><strong>判定</strong>: 明確なレンジ形成</li>
</ul>
</div>

<div style="background: #e3f2fd; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<strong>ステップ2: ブレイク監視</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>現在価格</strong>: $89,500</li>
<li><strong>ボリンジャーバンド上限</strong>: $89,800</li>
<li><strong>監視</strong>: $90,000突破 + ボリンジャー突破</li>
</ul>
</div>

<div style="background: #fff3e0; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<strong>ステップ3: 出来高確認</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>$90,000突破時</strong>: 出来高230%増加</li>
<li><strong>平均出来高</strong>: 100,000 BTC/日</li>
<li><strong>突破時出来高</strong>: 230,000 BTC/日</li>
<li><strong>判定</strong>: 強い突破と判定</li>
</ul>
</div>

<div style="background: #fce4ec; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<strong>ステップ4: 継続性確認</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>RSI</strong>: 65（適度な強さ）</li>
<li><strong>MACD</strong>: 上昇転換</li>
<li><strong>判定</strong>: ブレイクアウト継続期待</li>
</ul>
</div>

<div style="background: #e0f2f1; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<strong>実行</strong>: $90,200でブレイクアウト買い<br>
<strong>ストップロス</strong>: $88,000（レンジ内復帰で損切り）<br>
<strong>利確</strong>: $100,000（レンジ幅相当の上昇目標）
</div>

<div style="background: #f3e5f5; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<strong>学習ポイント</strong>: 複数指標の一致により、単独判断より確実性の高い取引が可能
</div>`
      },
      {
        type: 'tip',
        content: `<div style="background: #e8f5e8; padding: 1rem; border-radius: 4px; border-left: 4px solid #4caf50; margin: 1rem 0;">
<strong>組み合わせ分析活用のコツ</strong>
<h4 style="color: #2e7d32; margin: 0 0 0.5rem 0;">1. 段階的確認</h4>
<ul style="margin: 0; padding-left: 1.5rem;">
<li>大きな時間軸から小さな時間軸へ順次確認</li>
<li>長期トレンド確認→中期モメンタム→短期タイミング</li>
<li>矛盾するシグナルがある場合は見送り</li>
</ul>

<h4 style="color: #2e7d32; margin: 1rem 0 0.5rem 0;">2. 優先順位設定</h4>
<ul style="margin: 0; padding-left: 1.5rem;">
<li>メイン指標(トレンド系)を最重視</li>
<li>サブ指標(オシレーター)でタイミング調整</li>
<li>出来高で信頼性確認</li>
</ul>

<h4 style="color: #2e7d32; margin: 1rem 0 0.5rem 0;">3. 実践的活用</h4>
<p style="margin: 0;">最初は2-3個の指標から始めて、慣れてから追加する！</p>
</div>`
      },
      {
        type: 'text',
        content: `<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">実際の取引手順</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">分析から実行までの基本フロー</h3>
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">事前準備段階</h4>
<ol style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>市場環境確認</strong>: 全体的な市場トレンド・重要イベント</li>
<li><strong>時間軸設定</strong>: 取引スタイルに応じた時間軸選択</li>
<li><strong>資金管理</strong>: リスク許容額・ポジションサイズの事前決定</li>
<li><strong>指標設定</strong>: 使用する指標とパラメーターの確認</li>
</ol>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">分析実行段階</h4>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">ステップ1: 大局観の把握</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>週足・日足</strong>: 長期トレンドの方向性</li>
<li><strong>主要サポレジ</strong>: 重要価格レベルの確認</li>
<li><strong>市場センチメント</strong>: 全体的な強弱感</li>
</ul>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">ステップ2: 具体的分析</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>選択した組み合わせパターン</strong>での分析実行</li>
<li><strong>各指標の個別確認</strong></li>
<li><strong>シグナルの一致度</strong>確認</li>
</ul>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">ステップ3: エントリー判断</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>すべての条件クリア</strong>: エントリー実行</li>
<li><strong>一部条件未達</strong>: 見送りまたは様子見</li>
<li><strong>矛盾シグナル</strong>: エントリー見送り</li>
</ul>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">実行・管理段階</h4>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">エントリー実行</h4>
<ol style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>成行・指値</strong>: 市場状況に応じた注文方法選択</li>
<li><strong>同時注文</strong>: ストップロス・利確注文の同時設定</li>
<li><strong>記録</strong>: エントリー理由・根拠の記録</li>
</ol>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">ポジション管理</h4>
<ol style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>進捗監視</strong>: 想定通りの展開かを定期確認</li>
<li><strong>ストップ調整</strong>: 有利な方向への利確確保</li>
<li><strong>部分利確</strong>: 目標到達時の段階的利確</li>
<li><strong>損切り実行</strong>: ストップロス到達時の機械的実行</li>
</ol>

<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">結果検証と改善</h3>
<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">取引後の振り返り</h4>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">成功取引の分析</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>成功要因</strong>: どの分析が的中したか</li>
<li><strong>タイミング</strong>: エントリー・エグジットの妥当性</li>
<li><strong>改善点</strong>: より良くできた部分</li>
</ul>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">失敗取引の分析</h4>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>失敗原因</strong>: どの分析が外れたか</li>
<li><strong>教訓</strong>: 次回への活かし方</li>
<li><strong>ルール見直し</strong>: 必要に応じた手法修正</li>
</ul>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">継続的改善</h4>
<ol style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>取引記録</strong>: 詳細な記録の継続</li>
<li><strong>月次見直し</strong>: 成績・手法の定期評価</li>
<li><strong>スキル向上</strong>: 新しい手法の段階的追加</li>
<li><strong>メンタル管理</strong>: 感情制御の継続的改善</li>
</ol>`
      },
      {
        type: 'text',
        content: `<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">よくある失敗パターンと対策</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">典型的な失敗パターン</h3>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">パターン1: 指標の過度な依存</h4>
<div style="margin: 1rem 0;">
<strong>症状</strong>: 1つの指標のシグナルで即座にエントリー<br>
<strong>リスク</strong>: ダマシに引っかかりやすい<br>
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>必ず2-3個の指標で確認</li>
<li>異なる種類の指標組み合わせ</li>
<li>時間軸の異なる確認</li>
</ul>
</div>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">パターン2: 分析の複雑化</h4>
<div style="margin: 1rem 0;">
<strong>症状</strong>: 多数の指標を同時使用<br>
<strong>リスク</strong>: 分析に時間がかかり、機会損失<br>
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>指標は3-4個に限定</li>
<li>明確な優先順位設定</li>
<li>シンプルなルール作成</li>
</ul>
</div>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">パターン3: 確認の怠慢</h4>
<div style="margin: 1rem 0;">
<strong>症状</strong>: 急いでエントリーして後で後悔<br>
<strong>リスク</strong>: 計画的でない取引による損失<br>
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>事前チェックリスト作成</li>
<li>機械的な手順遵守</li>
<li>急がない意識</li>
</ul>
</div>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">パターン4: 結果への固執</h4>
<div style="margin: 1rem 0;">
<strong>症状</strong>: 1回の成功で慢心、1回の失敗で手法変更<br>
<strong>リスク</strong>: 一貫性のない取引<br>
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>長期的視点での評価</li>
<li>統計的な成績管理</li>
<li>感情と結果の分離</li>
</ul>
</div>

<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">実践的な対策法</h3>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">事前準備の徹底</h4>
<ol style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>取引計画書</strong>: エントリー・エグジット条件の明文化</li>
<li><strong>チェックリスト</strong>: 分析手順の標準化</li>
<li><strong>資金管理ルール</strong>: リスク管理の事前設定</li>
</ol>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">実行時の規律</h4>
<ol style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>機械的実行</strong>: 感情を排除した計画通りの実行</li>
<li><strong>記録の徹底</strong>: 全取引の詳細記録</li>
<li><strong>冷静な判断</strong>: 急がず慌てず確実に</li>
</ol>

<h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">継続的改善</h4>
<ol style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>定期評価</strong>: 月次・四半期での成績評価</li>
<li><strong>手法改善</strong>: データに基づく手法改善</li>
<li><strong>学習継続</strong>: 新しい知識の段階的習得</li>
</ol>`
      },
      {
        type: 'text',
        content: `
          <h1>理解度チェック</h1>
          <p>このセクションでは、複数指標の組み合わせ分析について理解を深めてください。20日MA > 50日MA、MACD正値でシグナル線上抜け、RSI 45の場合、すべて上昇方向を示しているため買いエントリーが適切です。</p>
          
          <h3>重要なポイント</h3>
          <div class="understanding-check">
            <ul>
              <li><strong>複数確認</strong>：単独指標ではなく複数指標での方向性一致を確認</li>
              <li><strong>補完関係</strong>：トレンド系とオシレーター系の組み合わせで弱点補完</li>
              <li><strong>段階的確認</strong>：大きな時間軸から小さな時間軸へ順次確認</li>
              <li><strong>機械的実行</strong>：分析結果に基づく感情を排除した実行</li>
            </ul>
          </div>
        `
      },
      {
        type: 'warning',
        content: `<div style="background: #fff3e0; padding: 1rem; border-radius: 4px; border-left: 4px solid #ff9800; margin: 1rem 0;">
<strong>組み合わせ分析実践時の注意点</strong>
<h4 style="color: #f57c00; margin: 0 0 0.5rem 0;">1. 分析麻痺症候群</h4>
<div style="margin-bottom: 1rem;">
<strong>問題</strong>: 多数の指標で分析が複雑化し、決断できない<br>
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>使用指標を3-4個に限定</li>
<li>明確な優先順位設定</li>
<li>シンプルな判断基準の設定</li>
<li>時間制限を設けた分析</li>
</ul>
</div>

<h4 style="color: #f57c00; margin: 0 0 0.5rem 0;">2. 矛盾シグナルの処理</h4>
<div style="margin-bottom: 1rem;">
<strong>問題</strong>: 指標間で相反するシグナルが出現<br>
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>メイン指標の重視</li>
<li>矛盾時は見送りルール</li>
<li>上位時間軸での確認</li>
<li>より多くの一致する指標優先</li>
</ul>
</div>

<h4 style="color: #f57c00; margin: 0 0 0.5rem 0;">3. 過度な最適化</h4>
<div style="margin-bottom: 1rem;">
<strong>問題</strong>: 過去データに合わせすぎた手法<br>
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>汎用性のある基本手法使用</li>
<li>定期的な手法見直し</li>
<li>複数期間での検証</li>
<li>シンプルなルール維持</li>
</ul>
</div>

<h4 style="color: #f57c00; margin: 0 0 0.5rem 0;">4. 感情的判断の混入</h4>
<div style="margin-bottom: 1rem;">
<strong>問題</strong>: 分析結果を感情で覆す<br>
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>事前計画の厳守</li>
<li>機械的な実行</li>
<li>感情日記の記録</li>
<li>冷静期間の設定</li>
</ul>
</div>

<p style="margin: 1rem 0; font-weight: bold;">成功の秘訣: 組み合わせ分析は技術の習得よりも、継続的で規律正しい実行が重要です。シンプルなルールを一貫して適用することが長期成功の鍵です。</p>
</div>`
      }
    ],
    keyPoints: [
      '複数のテクニカル指標を組み合わせることで単独指標の弱点を補完',
      'トレンド系、オシレーター系、ボラティリティ系の異なる種類を組み合わせ',
      '3-4個程度の指標に限定してシンプルで理解しやすい分析を実行',
      'トレンド確認型、レンジブレイク型、逆張り型の基本パターンを習得',
      '大きな時間軸から小さな時間軸へ段階的な確認で精度向上',
      '事前計画と機械的実行で感情的判断を排除',
      '取引記録と定期的な振り返りで継続的改善を実現',
      'シンプルなルールの一貫した適用が長期成功の基盤'
    ]
  },

  quiz: [
    {
      id: 'trading-basics-comprehensive-practice-q1',
      question: '20日MA > 50日MA、MACD正値でシグナル線上抜け、RSI 45の場合、適切な判断は？',
      options: [
        '指標が矛盾しているので見送り',
        'すべて上昇方向なので買いエントリー',
        'RSIが中立なので様子見',
        '売りエントリー'
      ],
      correctAnswer: 1,
      explanation: 'すべての指標が上昇方向を示している（移動平均線の順行配列、MACD上昇転換、RSI中立域）ため、買いエントリーが適切です。'
    },
    {
      id: 'trading-basics-comprehensive-practice-q2',
      question: '組み合わせ分析で最も重要な原則は？',
      options: [
        'できるだけ多くの指標を使用する',
        '異なる種類の指標を組み合わせて補完する',
        '最新の指標のみを使用する',
        '同じ種類の指標を複数使用する'
      ],
      correctAnswer: 1,
      explanation: '組み合わせ分析では、トレンド系、オシレーター系、ボラティリティ系など異なる種類の指標を組み合わせて、各指標の弱点を補完することが最も重要です。'
    },
    {
      id: 'trading-basics-comprehensive-practice-q3',
      question: 'レンジブレイク型分析で重要な確認要素は？',
      options: [
        '価格のブレイクアウトのみ',
        'ブレイクアウト + 出来高増加 + 継続性確認',
        'RSIの数値のみ',
        '移動平均線の位置のみ'
      ],
      correctAnswer: 1,
      explanation: 'レンジブレイク型では、価格のブレイクアウト、出来高の増加、そして継続性（RSI等での確認）の3要素すべてを確認することが重要です。'
    },
    {
      id: 'trading-basics-comprehensive-practice-q4',
      question: '指標間で矛盾するシグナルが出た場合の対処法は？',
      options: [
        'より多くの指標を追加する',
        'メイン指標を重視するか見送る',
        '最新のシグナルを優先する',
        '感情で判断する'
      ],
      correctAnswer: 1,
      explanation: '指標間で矛盾が生じた場合は、メイン指標（通常はトレンド系）を重視するか、不確実性が高いため取引を見送ることが適切です。'
    },
    {
      id: 'trading-basics-comprehensive-practice-q5',
      question: '組み合わせ分析の成功で最も重要な要素は？',
      options: [
        '複雑な分析手法の使用',
        'シンプルなルールの継続的実行',
        '直感的な判断',
        '頻繁な手法変更'
      ],
      correctAnswer: 1,
      explanation: '組み合わせ分析の成功には、複雑さよりもシンプルで理解しやすいルールを継続的かつ規律正しく実行することが最も重要です。'
    }
  ],
  lastUpdated: '2025-08-17',
  factChecked: true
};