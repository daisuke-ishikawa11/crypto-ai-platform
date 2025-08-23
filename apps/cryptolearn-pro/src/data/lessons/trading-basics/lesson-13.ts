import type { Lesson } from '../../../types';
export const lesson13: Lesson = {
  id: 'trading-basics-cci-fundamentals',
  slug: 'cci-fundamentals',
  title: 'CCI(商品チャネル指数)の基礎',
  description: 'ドナルド・ランバートが開発したCCIの基本的な仕組みを理解し、統計的な平均からの価格乖離を測定する基本的な方法と±100ラインでの基本的な売買判定を学習します。',
  categoryId: 'trading-basics',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 23,
  orderIndex: 13,
  isPublished: true,
  tags: ['CCI', '商品チャネル指数', 'サイクル', '極値', 'トレンド'],
  
  content: {
    sections: [
      {
        type: 'text',
        content: `
          <h1>CCI(商品チャネル指数)の基礎知識</h1>
          
          <h2>CCI(商品チャネル指数)とは</h2>
          <p><strong>CCI(Commodity Channel Index)</strong>は、ドナルド・ランバートが1980年に開発したテクニカル指標で、<strong>価格が統計的な平均からどれだけ乖離しているか</strong>を測定します。元々は商品(コモディティ)のサイクリカルな動きを分析するために作られましたが、現在では株式、FX、暗号通貨など幅広い市場で活用されています。</p>
          
          <h3>基本的な計算方法</h3>
          <div class="calculation-formula">
            <h4>計算式</h4>
            <p><strong>CCI = (Typical Price - SMA) ÷ (0.015 × Mean Deviation)</strong></p>
            
            <h4>構成要素</h4>
            <ol>
              <li><strong>Typical Price = (High + Low + Close) ÷ 3</strong></li>
              <li><strong>SMA = Typical Priceの単純移動平均(通常20期間)</strong></li>
              <li><strong>Mean Deviation = |Typical Price - SMA|の平均</strong></li>
              <li><strong>0.015 = 統計的定数(約75%のデータが±100内に収まるよう調整)</strong></li>
            </ol>
            
            <h4>標準設定</h4>
            <ul>
              <li><strong>期間</strong>: 20期間(標準)</li>
              <li><strong>短期</strong>: 14期間(より敏感)</li>
              <li><strong>長期</strong>: 30期間(より安定)</li>
              <li><strong>定数</strong>: 0.015(固定値)</li>
            </ul>
          </div>
          
          <h3>CCIの特徴と他指標との違い</h3>
          <div class="comparison-features">
            <h4>独特な特徴</h4>
            <ul>
              <li><strong>無制限レンジ</strong>: ±100を大きく超える値も取る</li>
              <li><strong>統計的根拠</strong>: 標準偏差に基づく客観的計算</li>
              <li><strong>サイクル分析</strong>: 周期性のあるパターンの検出</li>
              <li><strong>ブレイクアウト</strong>: 極値突破での強いシグナル</li>
            </ul>
            
            <h4>他のオシレーターとの比較</h4>
            <ul>
              <li><strong>RSI/ストキャスティクス</strong>: 0-100%の固定レンジ</li>
              <li><strong>CCI</strong>: 無制限レンジ、より大きな値動きを表現</li>
              <li><strong>感度</strong>: CCIは価格変動により敏感</li>
              <li><strong>用途</strong>: サイクル分析とトレンド継続性の判定</li>
            </ul>
          </div>
          
          <h3>基本的な解釈</h3>
          <div class="interpretation-levels">
            <h4>レベル別の意味</h4>
            <ul>
              <li><strong>+200以上</strong>: 極度の買われすぎ、強いトレンド</li>
              <li><strong>+100～+200</strong>: 買われすぎ圏</li>
              <li><strong>-100～+100</strong>: 通常圏(約75%の時間)</li>
              <li><strong>-100～-200</strong>: 売られすぎ圏</li>
              <li><strong>-200以下</strong>: 極度の売られすぎ、強いトレンド</li>
            </ul>
            
            <h4>市場状況の判定</h4>
            <ul>
              <li><strong>±100内</strong>: レンジ相場、逆張り有効</li>
              <li><strong>±100超</strong>: トレンド相場、順張り有効</li>
              <li><strong>±200超</strong>: 極端相場、継続性注意</li>
            </ul>
          </div>
        `
      },
      {
        type: 'text',
        content: `# CCIの基本的な売買シグナル
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">逆張りシグナル(レンジ相場向け)</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">買いシグナル</h3>
1. <strong>-100下抜け</strong>: CCIが-100を上から下抜け
2. <strong>底値確認</strong>: -100～-200圏での底値形成
3. <strong>-100回復</strong>: CCIが-100を下から上抜け
4. <strong>エントリー</strong>: 回復確認後の買いポジション
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">売りシグナル</h3>
1. <strong>+100上抜け</strong>: CCIが+100を下から上抜け
2. <strong>天井確認</strong>: +100～+200圏での天井形成
3. <strong>+100割れ</strong>: CCIが+100を上から下割れ
4. <strong>エントリー</strong>: 割れ確認後の売りポジション
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">順張りシグナル(トレンド相場向け)</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">強い上昇トレンド</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>+100突破</strong>: CCIが+100を勢いよく突破</li>
<li><strong>+100維持</strong>: +100以上での継続的推移</li>
<li><strong>押し目</strong>: 一時的な+100割れから再上抜け</li>
<li><strong>戦略</strong>: 上昇トレンド継続での買い保持</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">強い下降トレンド</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>-100突破</strong>: CCIが-100を勢いよく突破</li>
<li><strong>-100維持</strong>: -100以下での継続的推移</li>
<li><strong>戻り</strong>: 一時的な-100回復から再下抜け</li>
<li><strong>戦略</strong>: 下降トレンド継続での売り保持</li>
</ul>
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ゼロライン分析</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">ゼロラインクロス</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>上向きクロス</strong>: CCIが0を下から上抜け(買いシグナル)</li>
<li><strong>下向きクロス</strong>: CCIが0を上から下抜け(売りシグナル)</li>
<li><strong>中期的方向性</strong>: ゼロライン上下で基本スタンス決定</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">ゼロライン付近での動き</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>上側推移</strong>: 基本的に強気相場</li>
<li><strong>下側推移</strong>: 基本的に弱気相場</li>
<li><strong>頻繁なクロス</strong>: レンジ相場、ダマシ多発注意</li>
</ul>`
      },
      {
        type: 'example',
        content: `<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">実際のトレード例：イーサリアム分析</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">2024年冬季のCCI活用例</h3>
<strong>1月上旬：レンジ相場での逆張り戦略</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>価格状況</strong>: $2,200-$2,500のレンジ相場継続</li>
<li><strong>CCI状況</strong>: +120到達後、+100割れで売りシグナル</li>
<li><strong>確認</strong>: 価格$2,480でレジスタンス反発同時発生</li>
<li><strong>戦略</strong>: $2,470での売りエントリー</li>
<li><strong>利確</strong>: CCI -80到達で$2,240付近利確</li>
<li><strong>結果</strong>: 5日間で10%の利益確保</li>
</ul>
<strong>2月中旬：強いトレンドでの順張り戦略</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>価格状況</strong>: $2,300から上昇開始</li>
<li><strong>CCI突破</strong>: +100を勢いよく突破、+150まで上昇</li>
<li><strong>継続確認</strong>: +100以上で1週間継続推移</li>
<li><strong>戦略</strong>: +100回復時での押し目買い追加</li>
<li><strong>保持</strong>: CCI +100維持中はポジション継続</li>
<li><strong>結果</strong>: 3週間で$2,850まで24%上昇</li>
</ul>
<strong>3月：極値からの反転シグナル</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>価格状況</strong>: $2,900で高値圏推移</li>
<li><strong>CCI極値</strong>: +220の極値到達(過去6ヶ月最高)</li>
<li><strong>警戒信号</strong>: 極値からの反転可能性示唆</li>
<li><strong>確認</strong>: +100割れと出来高減少同時発生</li>
<li><strong>戦略</strong>: $2,850での段階的利確実行</li>
<li><strong>結果</strong>: その後10日間で$2,550まで11%調整</li>
</ul>
<strong>学習ポイント</strong>: CCIの±100ライン突破方向で戦略を切り替えることが重要`
      },
      {
        type: 'tip',
        content: `<strong>CCI活用のコツ</strong>
1. <strong>相場環境の判定</strong>:
   - ±100内推移: レンジ相場として逆張り戦略,
   - ±100超推移: トレンド相場として順張り戦略,
   - 戦略の切り替えタイミングを重視
2. <strong>極値の活用</strong>:
   - ±200超: 極端な状況、反転可能性高い,
   - 継続期間: 長期極値ほど反転の可能性増大,
   - 他指標: RSI、ストキャスティクスとの同時確認,
3. <strong>時間軸の選択</strong>: 日足以上での中長期分析に特に有効！`
      },
      {
        type: 'text',
        content: `# 実践的なCCI戦略
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">レンジ相場戦略</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">基本的な逆張り手法</h3>
1. <strong>環境確認</strong>: 明確なレンジ相場の存在確認
2. <strong>CCI監視</strong>: ±100ラインへの接近確認
3. <strong>極値確認</strong>: ±100～±200圏での極値形成
4. <strong>反転確認</strong>: ±100ライン復帰確認
5. <strong>エントリー</strong>: 復帰確認後の逆張りエントリー
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">リスク管理</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>ストップロス</strong>: ±200突破で損切り(トレンド転換)</li>
<li><strong>利確</strong>: 反対側の±100ライン接近</li>
<li><strong>ポジションサイズ</strong>: 全資金の3-5%</li>
</ul>
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">トレンドフォロー戦略</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">強いトレンド継続戦略</h3>
1. <strong>ブレイクアウト</strong>: ±100ラインの勢いよい突破確認
2. <strong>継続確認</strong>: ±100以上または以下での推移継続
3. <strong>押し目・戻り</strong>: 一時的な±100ライン接触
4. <strong>追加エントリー</strong>: ライン再突破での追加ポジション
5. <strong>保有継続</strong>: ±100ライン維持中のポジション保持
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">エグジット判定</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>ライン割れ</strong>: ±100ライン明確な逆抜け</li>
<li><strong>極値到達</strong>: ±200以上での反転可能性</li>
<li><strong>ダイバージェンス</strong>: 価格とCCIの乖離発生</li>
</ul>
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ダイバージェンス戦略</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">強気ダイバージェンス</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>価格</strong>: より低い安値を記録</li>
<li><strong>CCI</strong>: より高い安値を記録(改善)</li>
<li><strong>確認</strong>: その後のゼロライン上抜け</li>
<li><strong>エントリー</strong>: ダイバージェンス + 確認シグナル</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">弱気ダイバージェンス</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>価格</strong>: より高い高値を記録</li>
<li><strong>CCI</strong>: より低い高値を記録(悪化)</li>
<li><strong>確認</strong>: その後のゼロライン下抜け</li>
<li><strong>エントリー</strong>: ダイバージェンス + 確認シグナル</li>
</ul>
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">マルチタイムフレーム戦略</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">時間軸の活用</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>長期軸(週足)</strong>: メイントレンド・大きなサイクル確認</li>
<li><strong>中期軸(日足)</strong>: エントリー方向・タイミング決定</li>
<li><strong>短期軸(4時間足)</strong>: 精密なエントリーポイント調整</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">実践手順</h3>
1. <strong>週足</strong>: 大局的なサイクルとトレンド確認
2. <strong>日足</strong>: CCIの基本戦略(レンジ/トレンド)決定
3. <strong>4時間足</strong>: 具体的なエントリータイミング
4. <strong>統合判断</strong>: 複数時間軸での方向性一致確認`
      },
      {
        type: 'text',
        content: `# CCIの高度な活用法
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">サイクル分析</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">周期性の発見</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>ピーク間隔</strong>: +100以上のピーク間の期間測定</li>
<li><strong>ボトム間隔</strong>: -100以下のボトム間の期間測定</li>
<li><strong>サイクル長</strong>: 平均的な周期期間の算出</li>
<li><strong>予測</strong>: 次回転換時期の予測</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">サイクルの活用</h3>
1. <strong>時間要素</strong>: サイクル終期での転換期待
2. <strong>価格要素</strong>: 極値での反転可能性増大
3. <strong>複合判断</strong>: 時間 + 価格での高精度予測
4. <strong>戦略調整</strong>: サイクル段階に応じた戦略変更
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">複数通貨での活用</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">相関分析</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>主要通貨</strong>: BTC、ETHのCCI同調性確認</li>
<li><strong>アルトコイン</strong>: 主要通貨との関係性分析</li>
<li><strong>逆相関</strong>: USD建て vs BTC建ての関係</li>
<li><strong>確認</strong>: 複数通貨での同時シグナル</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">ポートフォリオ戦略</h3>
1. <strong>分散エントリー</strong>: 複数通貨での時間差エントリー
2. <strong>リスク分散</strong>: CCIレベル別のポジション配分
3. <strong>相互確認</strong>: 主導通貨での先行確認
4. <strong>総合判断</strong>: 市場全体のCCIトレンド把握
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">パラメーター最適化</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">期間設定の調整</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>14期間</strong>: より敏感、短期取引向け</li>
<li><strong>20期間</strong>: 標準設定、バランス型</li>
<li><strong>30期間</strong>: より安定、長期分析向け</li>
<li><strong>動的調整</strong>: 市場ボラティリティに応じた変更</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">閾値レベルの調整</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>標準</strong>: ±100ライン</li>
<li><strong>敏感</strong>: ±75ライン(シグナル増加)</li>
<li><strong>保守</strong>: ±125ライン(シグナル厳選)</li>
<li><strong>極値</strong>: ±200ライン(極端相場判定)</li>
</ul>
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">実践的な改善方法</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">市場特性への適応</h3>
1. <strong>ボラティリティ</strong>: 高ボラ時の閾値調整
2. <strong>流動性</strong>: 低流動性時の慎重判断
3. <strong>時間帯</strong>: アクティブ時間での精度向上
4. <strong>イベント</strong>: 重要発表時の取引調整
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">継続的改善</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>バックテスト</strong>: 過去データでの検証実施</li>
<li><strong>最適化</strong>: パラメーター調整の効果測定</li>
<li><strong>記録</strong>: CCIパターンと結果の記録保持</li>
<li><strong>学習</strong>: 新しいパターンの発見と活用</li>
</ul>
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">CCIと他指標の組み合わせ</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">CCI + 移動平均線</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>トレンド</strong>: 移動平均で大方向確認</li>
<li><strong>タイミング</strong>: CCIで精密エントリー</li>
<li><strong>フィルター</strong>: トレンド方向のシグナル採用</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">CCI + ボリンジャーバンド</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>価格位置</strong>: バンド内位置とCCIレベル</li>
<li><strong>ブレイク</strong>: バンド突破 + CCI極値</li>
<li><strong>確認</strong>: 両指標での同時シグナル</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">CCI + RSI</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>強度確認</strong>: 両指標での買われすぎ・売られすぎ</li>
<li><strong>ダイバージェンス</strong>: 2指標での同時ダイバージェンス</li>
<li><strong>信頼性</strong>: 複数確認での精度向上</li>
</ul>`
      },
      {
        type: 'text',
        content: `
          <h1>理解度チェック</h1>
          <p>このセクションでは、CCI(商品チャネル指数)の基本概念について理解を深めてください。CCIが+150を示している場合、これは強いトレンドなので上昇継続を期待した買い保持戦略が適切です。</p>
          
          <h3>重要なポイント</h3>
          <div class="understanding-check">
            <ul>
              <li><strong>+100超の意味</strong>：CCIが+100を超えると強い上昇トレンドを示す</li>
              <li><strong>順張り戦略</strong>：+100以上では順張り戦略でトレンド継続を期待</li>
              <li><strong>戦略切り替え</strong>：±100ラインを基準とした戦略の使い分け</li>
              <li><strong>継続性</strong>：強いトレンド中は継続を前提とした判断が重要</li>
            </ul>
          </div>
        `
      },
      {
        type: 'warning',
        content: `<strong>CCI使用時の注意点</strong>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">1. 戦略の混同リスク</h3>
<strong>問題</strong>: レンジ相場とトレンド相場での戦略混同
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>±100ライン位置での戦略明確化</li>
<li>相場環境の事前確認徹底</li>
<li>戦略切り替えタイミングの習得</li>
<li>一貫性のある手法適用</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">2. 極値での早期反転期待</h3>
<strong>問題</strong>: ±200超での性急な逆張りエントリー
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>極値継続の可能性考慮</li>
<li>明確な反転シグナル待ち</li>
<li>ポジションサイズの適切な管理</li>
<li>段階的なエントリー・エグジット</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">3. ダマシシグナルの頻発</h3>
<strong>問題</strong>: 短期時間軸でのノイズ多発
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>長期時間軸での確認併用</li>
<li>他のテクニカル指標との組み合わせ</li>
<li>出来高・価格アクションでの確認</li>
<li>経済指標発表時の取引回避</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">4. サイクル分析の過信</h3>
<strong>問題</strong>: 過去のサイクルパターンへの過度な依存
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>市場環境変化への適応</li>
<li>ファンダメンタル要因の考慮</li>
<li>柔軟な戦略調整</li>
<li>リスク管理の徹底</li>
</ul>
<strong>成功の秘訣</strong>: CCIは相場環境に応じた戦略の使い分けが最も重要です。±100ラインを基準とした明確な戦略切り替えを心がけましょう。`
      },
      ],
    keyPoints: [
      'CCIは価格の統計的平均からの乖離度を測定する無制限レンジの指標',
      '±100ライン内はレンジ相場、超えた場合はトレンド相場として戦略変更',
      '±200を超える極値は強いトレンドまたは反転の可能性を示す',
      'ゼロラインクロスは中期的な方向転換のシグナル',
      'サイクリカルな動きの分析に特に優れた指標',
      'ダイバージェンス分析でトレンド転換の早期発見',
      '他のテクニカル指標との組み合わせで精度向上',
      '相場環境に応じた戦略の使い分けが成功の鍵'
    ]
    },

  quiz: [
    {
      id: 'trading-basics-cci-fundamentals-q1',
      question: 'CCIが+150を示している場合、どのような戦略が適切ですか？',
      options: [
        '買われすぎなので即座に売りエントリー',
        '強いトレンドなので上昇継続を期待した買い保持',
        '中立的な状況なので様子見',
        'レンジ相場なので逆張り戦略'
      ],
      correctAnswer: 1,
      explanation: 'CCIが+100を超えて+150にある場合は強い上昇トレンドを示しており、+100以上では順張り戦略でトレンド継続を期待するのが適切です。'
    },
    {
      id: 'trading-basics-cci-fundamentals-q2',
      question: 'CCIの基本的な計算式に含まれるTypical Priceの正しい定義はどれですか？',
      options: [
        'Typical Price = (High + Close) ÷ 2',
        'Typical Price = (High + Low + Close) ÷ 3',
        'Typical Price = (Open + Close) ÷ 2',
        'Typical Price = Close'
      ],
      correctAnswer: 1,
      explanation: 'CCI計算のTypical Priceは、高値、安値、終値の3つの価格を平均した値で、(High + Low + Close) ÷ 3で計算されます。'
    },
    {
      id: 'trading-basics-cci-fundamentals-q3',
      question: 'CCIで一般的に使用される標準期間設定はどれですか？',
      options: [
        '14期間',
        '20期間',
        '25期間',
        '30期間'
      ],
      correctAnswer: 1,
      explanation: 'CCIの標準期間設定は20期間で、この設定で約75%のデータが±100内に収まるように調整されています。'
    },
    {
      id: 'trading-basics-cci-fundamentals-q4',
      question: 'CCIが±100ライン内で推移している場合、どのような相場環境と戦略が適切ですか？',
      options: [
        'トレンド相場、順張り戦略',
        'レンジ相場、逆張り戦略',
        '極端相場、様子見',
        '不明な相場、取引回避'
      ],
      correctAnswer: 1,
      explanation: 'CCIが±100ライン内で推移している場合はレンジ相場と判断し、逆張り戦略が有効です。±100を超えた場合にトレンド相場と判断します。'
    },
    {
      id: 'trading-basics-cci-fundamentals-q5',
      question: 'CCIを使用する際の最も重要な注意点は何ですか？',
      options: [
        '常に逆張りでエントリーする',
        '±200を超えたら即座に逆張りする',
        '±100ラインを基準とした戦略の使い分け',
        '一つの時間軸のみで判断する'
      ],
      correctAnswer: 2,
      explanation: 'CCI使用時の最も重要な注意点は、±100ラインを基準とした戦略の使い分けです。ライン内では逆張り、ラインを超えたら順張り戦略に切り替えることが成功の鍵です。'
    }
  ],
  lastUpdated: '2025-08-17',
  factChecked: true

};