import type { Lesson } from '../../../types';
export const lesson17: Lesson = {
  id: 'trading-basics-composite-analysis-fundamentals',
  slug: 'composite-analysis-fundamentals',
  title: '複合テクニカル分析の基礎',
  description: '複数のテクニカル指標を組み合わせた基本的な分析手法を理解し、指標の基本的な相互補完関係と統合判断の基礎を学習します。',
  categoryId: 'trading-basics',
  difficultyLevel: 'advanced',
  estimatedMinutes: 30,
  orderIndex: 17,
  isPublished: true,
  tags: ['複合分析', 'テクニカル指標', '統合判断', '相互補完', '高精度戦略'],
  
  content: {
    sections: [
      {
        type: 'text',
        content: `
          <h1>複合テクニカル分析の基礎知識</h1>
          
          <h2>複合テクニカル分析とは</h2>
          <p><strong>複合テクニカル分析</strong>は、複数のテクニカル指標や分析手法を組み合わせて、<strong>単一指標の限界を補完し合い</strong>、より信頼性の高い売買判定を行う基本的な分析手法です。各指標の特性を理解し、適切に組み合わせることで、ダマシシグナルの減少と精度の向上を目指します。</p>
          
          <h3>複合分析の基本的な必要性</h3>
          <div class="necessity-explanation">
            <h4>単一指標の限界</h4>
            <ol>
              <li><strong>ダマシシグナル</strong>: 単独使用時の誤シグナル多発</li>
              <li><strong>市場環境依存</strong>: 特定環境でのみ有効</li>
              <li><strong>タイミングズレ</strong>: 最適なエントリータイミングの特定困難</li>
              <li><strong>情報不足</strong>: 一側面のみの情報で判断</li>
            </ol>
            
            <h4>複合分析の基本的な利点</h4>
            <ol>
              <li><strong>信頼性向上</strong>: 複数確認での精度向上</li>
              <li><strong>補完効果</strong>: 各指標の弱点相互補完</li>
              <li><strong>環境適応</strong>: 様々な市場環境への対応</li>
              <li><strong>リスク軽減</strong>: 総合判断でのリスク軽減</li>
            </ol>
          </div>
          
          <h3>基本的な指標分類と特性理解</h3>
          <div class="indicator-classification">
            <h4>トレンド系指標</h4>
            <ul>
              <li><strong>移動平均線</strong>: トレンド方向・強度</li>
              <li><strong>MACD</strong>: トレンド転換・モメンタム</li>
              <li><strong>ADX</strong>: トレンド強度測定</li>
              <li><strong>一目均衡表</strong>: 総合的トレンド分析</li>
            </ul>
            
            <h4>オシレーター系指標</h4>
            <ul>
              <li><strong>RSI</strong>: 買われすぎ・売られすぎ</li>
              <li><strong>ストキャスティクス</strong>: 短期反転シグナル</li>
              <li><strong>ウィリアムズ%R</strong>: 極値反転</li>
              <li><strong>CCI</strong>: 統計的乖離度</li>
            </ul>
            
            <h4>ボラティリティ指標</h4>
            <ul>
              <li><strong>ボリンジャーバンド</strong>: 価格レンジ・ブレイクアウト</li>
              <li><strong>ATR</strong>: リスク管理・ポジションサイズ</li>
              <li><strong>エンベロープ</strong>: 価格乖離・回帰</li>
            </ul>
            
            <h4>出来高指標</h4>
            <ul>
              <li><strong>出来高</strong>: 動きの確実性</li>
              <li><strong>OBV</strong>: 資金フロー</li>
              <li><strong>A/D線</strong>: 蓄積・分散</li>
            </ul>
          </div>
        `
      },
      {
        type: 'text',
        content: `# 効果的な指標組み合わせ戦略
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">トレンドフォロー複合戦略</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">基本構成</h3>
1. <strong>トレンド確認</strong>: 移動平均線(20日・50日)
2. <strong>強度測定</strong>: ADX(14期間)
3. <strong>エントリー</strong>: MACD(12,26,9)
4. <strong>確認</strong>: 出来高分析
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">判定条件</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>買いシグナル</strong>: </li>
</ul>
  - 価格 > 20MA > 50MA
  - ADX > 25(強いトレンド)
  - MACDゴールデンクロス
  - 出来高増加
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>売りシグナル</strong>:</li>
</ul>
  - 価格 < 20MA < 50MA  
  - ADX > 25(強いトレンド)
  - MACDデッドクロス
  - 出来高増加
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">エグジット条件</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>ADX < 20(トレンド弱化)</li>
<li>MACD逆クロス</li>
<li>移動平均線逆転</li>
</ul>
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">逆張り複合戦略</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">基本構成</h3>
1. <strong>過熱確認</strong>: RSI(14期間)
2. <strong>極値確認</strong>: ウィリアムズ%R(14期間)  
3. <strong>価格位置</strong>: ボリンジャーバンド(20,2)
4. <strong>反転確認</strong>: ローソク足パターン
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">判定条件</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>買いシグナル</strong>:</li>
</ul>
  - RSI < 30(売られすぎ)
  - %R < -80(極度売られすぎ)
  - 価格 < 下部バンド
  - ハンマー等の反転パターン
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>売りシグナル</strong>:</li>
</ul>
  - RSI > 70(買われすぎ)
  - %R > -20(極度買われすぎ)
  - 価格 > 上部バンド
  - 流れ星等の反転パターン
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">エグジット条件</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>RSI中央値(50)回帰</li>
<li>ボリンジャーバンド中央線タッチ</li>
</ul>
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ブレイクアウト複合戦略</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">基本構成</h3>
1. <strong>レンジ確認</strong>: ボリンジャーバンド収束
2. <strong>エネルギー</strong>: ATR低位での収束
3. <strong>ブレイク</strong>: 出来高急増での突破
4. <strong>継続確認</strong>: ADX上昇開始
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">判定条件</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>準備段階</strong>:</li>
</ul>
  - バンド幅縮小(過去20日最小)
  - ATR低位安定
  - 出来高減少
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>ブレイクシグナル</strong>:</li>
</ul>
  - バンド明確突破
  - 出来高2倍以上
  - ADX上昇開始
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">エグジット条件</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>ATR極値到達</li>
<li>ADX下降転換</li>
<li>ボリンジャーバンド反対側接触</li>
</ul>`
      },
      {
        type: 'example',
        content: `<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">実際のトレード例：イーサリアム複合分析</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">2024年秋季のトレンドフォロー複合戦略</h3>
<strong>9月上旬：多重確認によるトレンド開始確認</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>価格状況</strong>: $2,400でのレンジブレイク期待</li>
<li><strong>移動平均</strong>: 価格$2,450 > 20MA$2,420 > 50MA$2,380</li>
<li><strong>ADX</strong>: 18→28への急上昇(トレンド強化確認)</li>
<li><strong>MACD</strong>: ゼロライン上抜け＋ゴールデンクロス</li>
<li><strong>出来高</strong>: 平均の180%に増加</li>
<li><strong>統合判断</strong>: 全4指標が買いシグナル一致</li>
<li><strong>エントリー</strong>: $2,465での買いポジション</li>
<li><strong>結果</strong>: 3週間で$2,850まで16%上昇</li>
</ul>
<strong>10月中旬：逆張り複合戦略での底値拾い</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>価格状況</strong>: $2,850から$2,550への調整局面</li>
<li><strong>RSI</strong>: 28まで低下(明確な売られすぎ)</li>
<li><strong>%R</strong>: -92の極値(極度売られすぎ)</li>
<li><strong>ボリンジャー</strong>: 下部バンド-2σを下抜け</li>
<li><strong>ローソク足</strong>: $2,540でハンマー形成</li>
<li><strong>統合判断</strong>: 4指標全てが強い買いシグナル</li>
<li><strong>エントリー</strong>: ハンマー確認後$2,560で買い</li>
<li><strong>結果</strong>: 10日間で$2,780まで9%反発</li>
</ul>
<strong>11月：ブレイクアウト複合戦略での大相場捕捉</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>準備段階</strong>: $2,750-$2,850の狭いレンジ1ヶ月継続</li>
<li><strong>バンド幅</strong>: 過去30日で最小レベルまで収束</li>
<li><strong>ATR</strong>: $45まで低下(エネルギー蓄積)</li>
<li><strong>ブレイク</strong>: $2,860上抜けと同時に出来高急増</li>
<li><strong>ADX</strong>: 15→35への急上昇確認</li>
<li><strong>エントリー</strong>: ブレイク確認後$2,875で買い</li>
<li><strong>結果</strong>: 2週間で$3,200まで11%上昇</li>
</ul>
<strong>学習ポイント</strong>: 複数指標の一致確認により、ダマシシグナルを大幅に減少`
      },
      {
        type: 'tip',
        content: `<strong>複合分析活用のコツ</strong>
1. <strong>指標の役割分担</strong>:
   - メイン判断: 1-2個の主要指標,
   - 確認用: 2-3個の補助指標,
   - 各指標の得意分野を活用
2. <strong>段階的判断</strong>:
   - 第1段階: 大局的環境確認,
   - 第2段階: エントリー条件成立,
   - 第3段階: タイミング調整,
3. <strong>矛盾時の対処</strong>: 指標間で矛盾がある場合は静観し、無理なエントリーは避ける！`
      },
      {
        type: 'text',
        content: `# 高度な複合分析システム
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">階層型分析システム</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">第1層：市場環境分析</h3>
1. <strong>大局トレンド</strong>: 週足・月足での長期方向
2. <strong>ボラティリティ</strong>: ATR・VIXでの市場状況
3. <strong>セクター分析</strong>: BTC・ETH・アルト相関
4. <strong>ファンダメンタル</strong>: 重要イベント・ニュース
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">第2層：戦略選択分析</h3>
1. <strong>トレンド強度</strong>: ADX・移動平均線傾き
2. <strong>レンジ判定</strong>: ボリンジャーバンド・エンベロープ
3. <strong>モメンタム</strong>: MACD・ROC傾向
4. <strong>戦略決定</strong>: トレンドフォロー vs 逆張り
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">第3層：エントリー分析</h3>
1. <strong>精密タイミング</strong>: 短期オシレーター
2. <strong>価格位置</strong>: サポート・レジスタンス
3. <strong>出来高確認</strong>: 動きの信頼性
4. <strong>リスクリワード</strong>: 損益比率計算
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">動的ウェイト調整システム</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">市場環境別重み付け</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>強いトレンド市場</strong>:</li>
</ul>
  - トレンド系指標: 70%,
  - オシレーター系: 20%,
  - その他: 10%,
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>レンジ市場</strong>:</li>
</ul>
  - オシレーター系: 60%,
  - サポレジ: 25%,
  - トレンド系: 15%,
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>高ボラティリティ市場</strong>:</li>
</ul>
  - ATR・ボラティリティ系: 50%,
  - 出来高系: 30%,
  - その他: 20%,
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">指標信頼度の動的調整</h3>
1. <strong>過去成績</strong>: 各指標の過去3ヶ月成績
2. <strong>市場適合</strong>: 現在環境での有効性
3. <strong>相関度</strong>: 他指標との相関関係
4. <strong>ウェイト</strong>: 実績に基づく重み調整
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">機械学習的アプローチ</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">指標スコアリング</h3>
1. <strong>個別スコア</strong>: 各指標の-100〜+100スコア
2. <strong>重み付け</strong>: 環境別ウェイト適用
3. <strong>総合スコア</strong>: 加重平均での統合判断
4. <strong>閾値判定</strong>: ±50以上でシグナル確定
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">実例計算</h3>
<strong>計算例: </strong>,
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>RSI(30): -80点 × 0.3 = -24点</li>
<li>MACD: +60点 × 0.4 = +24点,</li>
<li>ADX: +40点 × 0.2 = +8点,</li>
<li>出来高: +70点 × 0.1 = +7点,</li>
<li><strong>総合スコア: +15点 → やや買い優勢</strong>,</li>
</ul>
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">バックテスト最適化</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">複合戦略の検証</h3>
1. <strong>単一期間</strong>: 過去1年での成績検証
2. <strong>複数期間</strong>: 異なる市場環境での検証
3. <strong>ウォークフォワード</strong>: 期間を移動しながら検証
4. <strong>モンテカルロ</strong>: ランダムエントリーとの比較
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">最適化項目</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>指標パラメーター</strong>: 期間・閾値調整</li>
<li><strong>ウェイト配分</strong>: 各指標の重み最適化</li>
<li><strong>エントリー条件</strong>: 必要一致指標数</li>
<li><strong>エグジット条件</strong>: 利確・損切り条件</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">過最適化回避</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>アウトオブサンプル</strong>: 未使用データでの検証</li>
<li><strong>ロバストネス</strong>: パラメーター変化への安定性</li>
<li><strong>複雑度制限</strong>: 過度な複雑化回避</li>
<li><strong>実用性</strong>: 実際の取引での実行可能性</li>
</ul>`
      },
      {
        type: 'text',
        content: `# 実践的な複合戦略実装
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">日次分析ルーチン</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">朝の市場分析(9: 00),</h3>
1. <strong>環境確認</strong>: 
   - 前日NY・欧州市場動向
   - 重要ニュース・指標発表
   - BTC・主要アルト全体動向
2. <strong>技術分析</strong>:
   - 各時間軸でのトレンド確認
   - 重要サポート・レジスタンス更新
   - 主要指標の状況確認
3. <strong>戦略設定</strong>:
   - 当日の基本戦略決定
   - 注目銘柄・価格レベル設定
   - リスク許容度設定
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">トレード中監視(取引時間中)</h3>
1. <strong>リアルタイム監視</strong>:
   - 設定レベルへの価格接近
   - 複合指標シグナル発生
   - 出来高・ニュース変化
2. <strong>エントリー判定</strong>:
   - 複合シグナル一致確認
   - リスクリワード比計算
   - ポジションサイズ決定
3. <strong>ポジション管理</strong>:
   - ストップロス・利確レベル設定
   - トレーリングストップ調整
   - 追加・決済判断
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">夜の振り返り(21: 00),</h3>
1. <strong>結果分析</strong>:
   - 当日取引の成果確認
   - 判断プロセスの検証
   - 改善点の抽出
2. <strong>翌日準備</strong>:
   - 重要イベント確認
   - 注目価格レベル設定
   - 戦略アップデート
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">リスク管理統合</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">複合指標でのリスク制御</h3>
1. <strong>エントリーリスク</strong>:
   - 指標一致度でのポジションサイズ調整
   - 不一致時のエントリー回避
   - 段階的エントリー実行
2. <strong>保有リスク</strong>:
   - 複数指標での継続判断
   - 矛盾発生時の早期エグジット
   - 相関低下時の分散調整
3. <strong>市場リスク</strong>:
   - ボラティリティ変化への対応
   - 流動性低下時の対処
   - システミックリスクの監視
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">ポートフォリオレベル管理</h3>
1. <strong>分散効果</strong>:
   - 異なる戦略の組み合わせ
   - 相関の低い銘柄選択
   - 時間分散でのリスク軽減
2. <strong>全体最適化</strong>:
   - 個別最適 vs 全体最適
   - リスク予算の配分
   - 相互影響の考慮
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">継続改善システム</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">定期見直し(月次)</h3>
1. <strong>成績評価</strong>:
   - 各戦略の成績分析
   - 指標別貢献度評価
   - 市場環境別成績確認
2. <strong>調整実施</strong>:
   - パラメーター微調整
   - ウェイト再配分
   - 新指標の追加検討
3. <strong>システム更新</strong>:
   - 新しい市場環境への適応
   - 技術進歩の取り込み
   - 規制変化への対応
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">学習プロセス</h3>
1. <strong>失敗分析</strong>:
   - 損失取引の原因分析
   - 判断プロセスの問題点
   - システム的欠陥の識別
2. <strong>成功要因</strong>:
   - 利益取引の成功要因
   - 再現可能な要素抽出
   - ベストプラクティス化
3. <strong>知識蓄積</strong>:
   - パターンライブラリ構築
   - 経験則のデータベース化
   - 暗黙知の形式知化`
      },
      {
        type: 'text',
        content: `
          <h1>理解度チェック</h1>
          <p>このセクションでは、複合テクニカル分析の基本概念について理解を深めてください。トレンドフォロー複合戦略で、価格>20MA>50MA、ADX>25、MACDゴールデンクロスが揃った場合、これは強い買いシグナルとして買いポジションを取るのが適切です。</p>
          
          <h3>重要なポイント</h3>
          <div class="understanding-check">
            <ul>
              <li><strong>多重確認</strong>：全ての条件が買い方向で一致</li>
              <li><strong>トレンド確認</strong>：移動平均線で明確な上昇トレンド</li>
              <li><strong>強度確認</strong>：ADX25以上でトレンド強化</li>
              <li><strong>モメンタム確認</strong>：MACDゴールデンクロスで上昇加速</li>
            </ul>
          </div>
        `
      },
      {
        type: 'warning',
        content: `<strong>複合分析使用時の注意点</strong>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">1. 過度な複雑化リスク</h3>
<strong>問題</strong>: 指標を多用しすぎて判断不能
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>3-4個以内での指標制限</li>
<li>役割の明確な分担</li>
<li>シンプルな判定ルール</li>
<li>定期的な指標見直し</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">2. 矛盾シグナルの処理</h3>
<strong>問題</strong>: 指標間での判断矛盾
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>主要指標の優先順位設定</li>
<li>矛盾時の静観ルール</li>
<li>部分的一致での段階エントリー</li>
<li>矛盾原因の分析</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">3. カーブフィッティング</h3>
<strong>問題</strong>: 過去データへの過度な最適化
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>アウトオブサンプル検証</li>
<li>複数期間での検証</li>
<li>シンプルなルール優先</li>
<li>実用性重視の設計</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">4. 指標の陳腐化</h3>
<strong>問題</strong>: 市場環境変化による指標無効化
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>定期的な成績評価</li>
<li>新しい指標の検討</li>
<li>動的ウェイト調整</li>
<li>市場適応性の確保</li>
</ul>
<strong>成功の秘訣</strong>: 複合分析は「より多く」ではなく「より適切に」組み合わせることが重要です。各指標の特性を理解し、相互補完関係を構築しましょう。`
      },
      ],
    keyPoints: [
      '複合分析は単一指標の限界を補完し、より高精度な判断を実現',
      'トレンド系・オシレーター系・ボラティリティ系の異なる性質指標を組み合わせ',
      '階層型分析で市場環境→戦略選択→エントリータイミングを段階的判断',
      '動的ウェイト調整により市場環境に応じた指標重要度を変更',
      '指標間の矛盾時は静観し、無理なエントリーを避ける',
      'バックテスト最適化で過去検証を行うが過最適化は回避',
      '定期的な見直しと改善により市場環境変化に適応',
      'リスク管理を統合し、複合指標によるポジション管理を実施'
    ]
    },

  quiz: [
    {
      id: 'trading-basics-composite-analysis-fundamentals-q1',
      question: 'トレンドフォロー複合戦略で、価格>20MA>50MA、ADX>25、MACDゴールデンクロスが揃った場合、最も適切な判断は何ですか？',
      options: [
        '売りシグナルとして売りポジション',
        '買いシグナルとして買いポジション',
        '中立的なので様子見',
        '逆張りでの売りエントリー'
      ],
      correctAnswer: 1,
      explanation: '全ての条件が買い方向で一致しており、トレンドフォロー戦略では強い買いシグナルとして判断し、買いポジションを取るのが適切です。'
    },
    {
      id: 'trading-basics-composite-analysis-fundamentals-q2',
      question: '複合テクニカル分析の基本的な利点として最も適切なのはどれですか？',
      options: [
        '単一指標よりも早いシグナルを得られる',
        '単一指標の限界を補完し、信頼性を向上させる',
        'すべての市場環境で100%の精度を実現する',
        '指標を多く使うほど精度が上がる'
      ],
      correctAnswer: 1,
      explanation: '複合テクニカル分析の基本的な利点は、各指標の弱点を相互に補完し合い、単一指標では得られない信頼性の高い分析を実現することです。'
    },
    {
      id: 'trading-basics-composite-analysis-fundamentals-q3',
      question: '指標の組み合わせで避けるべき組み合わせはどれですか？',
      options: [
        'トレンド系 + オシレーター系',
        '短期指標 + 長期指標',
        'RSI + ストキャスティクス(同系統指標)',
        '価格指標 + 出来高指標'
      ],
      correctAnswer: 2,
      explanation: 'RSIとストキャスティクスはどちらもオシレーター系指標で、類似した情報を提供するため、補完効果が低く、組み合わせとしては非効率です。'
    },
    {
      id: 'trading-basics-composite-analysis-fundamentals-q4',
      question: '効果的な指標の補完関係を確立するための基本原則として正しいのはどれですか？',
      options: [
        '同じ性質の指標を多数使用する',
        '異なる性質・時間・情報源の指標を組み合わせる',
        'すべての指標を同じ期間設定で使用する',
        '5個以上の指標を同時に使用する'
      ],
      correctAnswer: 1,
      explanation: '効果的な補完関係を確立するためには、異なる性質(トレンド系とオシレーター系)、異なる時間(短期と長期)、異なる情報源(価格と出来高)の指標を組み合わせることが重要です。'
    },
    {
      id: 'trading-basics-composite-analysis-fundamentals-q5',
      question: '複合テクニカル分析で最も重要な注意点は何ですか？',
      options: [
        'できるだけ多くの指標を使用する',
        '単一指標のみで判断する',
        '指標間で矛盾がある場合は静観し、無理なエントリーを避ける',
        '常に同じ指標の組み合わせを使用する'
      ],
      correctAnswer: 2,
      explanation: '複合テクニカル分析で最も重要な注意点は、指標間で矛盾がある場合は静観し、無理なエントリーを避けることです。これによりリスクを軽減できます。'
    }
  ],
  lastUpdated: '2025-08-17',
  factChecked: true

};