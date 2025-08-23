import type { Lesson } from '../../../types';
export const lesson14: Lesson = {
  id: 'trading-basics-adx-fundamentals',
  slug: 'adx-fundamentals',
  title: 'ADX(平均方向性指数)の基礎',
  description: 'J.ウェルズ・ワイルダーが開発したADXの基本的な仕組みを理解し、トレンドの強さを数値化する基本的な方法とトレンド相場とレンジ相場の基本的な判定方法を学習します。',
  categoryId: 'trading-basics',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 26,
  orderIndex: 14,
  isPublished: true,
  tags: ['ADX', '平均方向性指数', 'トレンド強度', 'DI+', 'DI-', 'ワイルダー'],
  
  content: {
    sections: [
      {
        type: 'text',
        content: `
          <h1>ADX(平均方向性指数)の基礎知識</h1>
          
          <h2>ADX(平均方向性指数)とは</h2>
          <p><strong>ADX(Average Directional Index)</strong>は、J.ウェルズ・ワイルダーによって開発された、<strong>トレンドの強さを測定する</strong>指標です。価格の方向性ではなく、<strong>トレンドの強度</strong>に焦点を当てており、トレンド相場とレンジ相場の判別、そしてトレンドの継続性を評価するために使用されます。</p>
          
          <h3>ADXシステムの構成要素</h3>
          <div class="adx-components">
            <h4>3つの指標から構成</h4>
            <ol>
              <li><strong>+DI(Plus Directional Indicator)</strong>: 上昇の力</li>
              <li><strong>-DI(Minus Directional Indicator)</strong>: 下降の力</li>
              <li><strong>ADX</strong>: トレンドの強さ(0-100の範囲)</li>
            </ol>
          </div>
          
          <h3>基本的な計算方法</h3>
          <div class="calculation-steps">
            <h4>True Range(TR)の計算</h4>
            <p><strong>TR = MAX[(High-Low), |High-前日Close|, |Low-前日Close|]</strong></p>
            
            <h4>Directional Movement(DM)の計算</h4>
            <ul>
              <li><strong>+DM = 当日High - 前日High(前日Low - 当日Low > 当日High - 前日Highの場合は0)</strong></li>
              <li><strong>-DM = 前日Low - 当日Low(当日High - 前日High > 前日Low - 当日Lowの場合は0)</strong></li>
            </ul>
            
            <h4>DI指標の計算</h4>
            <ul>
              <li><strong>+DI = (+DM14の平滑移動平均 ÷ TR14の平滑移動平均) × 100</strong></li>
              <li><strong>-DI = (-DM14の平滑移動平均 ÷ TR14の平滑移動平均) × 100</strong></li>
            </ul>
            
            <h4>ADXの計算</h4>
            <ul>
              <li><strong>DX = |+DI - -DI| ÷ (+DI + -DI) × 100</strong></li>
              <li><strong>ADX = DXの14期間平滑移動平均</strong></li>
            </ul>
            
            <h4>標準設定</h4>
            <ul>
              <li><strong>期間</strong>: 14期間(標準)</li>
              <li><strong>短期</strong>: 10期間(より敏感)</li>
              <li><strong>長期</strong>: 21期間(より安定)</li>
            </ul>
          </div>
          
          <h3>ADXレベルの解釈</h3>
          <div class="adx-interpretation">
            <h4>トレンド強度の判定</h4>
            <ul>
              <li><strong>0-20</strong>: 弱いトレンドまたはレンジ相場</li>
              <li><strong>20-25</strong>: 新しいトレンドの始まり可能性</li>
              <li><strong>25-40</strong>: 強いトレンド</li>
              <li><strong>40-50</strong>: 非常に強いトレンド</li>
              <li><strong>50+</strong>: 極めて強いトレンド(反転リスクも増大)</li>
            </ul>
            
            <h4>市場状況の判定</h4>
            <ul>
              <li><strong>ADX上昇中</strong>: トレンド強化継続</li>
              <li><strong>ADX下降中</strong>: トレンド弱化、レンジ移行可能性</li>
              <li><strong>ADX横ばい</strong>: 現状維持、方向感なし</li>
            </ul>
          </div>
        `
      },
      {
        type: 'text',
        content: `# ADXの基本的な活用法
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">トレンド強度の判定</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">強いトレンド(ADX 25以上)</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>条件</strong>: ADXが25を上回り、上昇継続</li>
<li><strong>戦略</strong>: トレンドフォロー戦略採用</li>
<li><strong>エントリー</strong>: DI線の方向に順張り</li>
<li><strong>保有</strong>: ADXが25以上の間は基本保持</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">弱いトレンド・レンジ(ADX 20以下)</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>条件</strong>: ADXが20を下回り、横ばいまたは下降</li>
<li><strong>戦略</strong>: レンジ戦略または静観</li>
<li><strong>エントリー</strong>: 逆張りまたはブレイクアウト待ち</li>
<li><strong>注意</strong>: トレンドフォローは避ける</li>
</ul>
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">DI線による方向判定</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">+DI > -DI(上昇トレンド)</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>意味</strong>: 上昇の力が下降の力を上回る</li>
<li><strong>条件</strong>: +DIが-DIを上から推移</li>
<li><strong>戦略</strong>: 買いポジション優先</li>
<li><strong>確認</strong>: ADX 25以上で信頼性向上</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">-DI > +DI(下降トレンド)</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>意味</strong>: 下降の力が上昇の力を上回る</li>
<li><strong>条件</strong>: -DIが+DIを上から推移</li>
<li><strong>戦略</strong>: 売りポジション優先</li>
<li><strong>確認</strong>: ADX 25以上で信頼性向上</li>
</ul>
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">DI線のクロスオーバー</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">+DI/-DIゴールデンクロス</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>発生</strong>: +DIが-DIを下から上抜け</li>
<li><strong>意味</strong>: 上昇トレンドの開始可能性</li>
<li><strong>確認</strong>: ADX上昇同伴で信頼性向上</li>
<li><strong>エントリー</strong>: クロス確認後の買いポジション</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">+DI/-DIデッドクロス</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>発生</strong>: +DIが-DIを上から下抜け</li>
<li><strong>意味</strong>: 下降トレンドの開始可能性</li>
<li><strong>確認</strong>: ADX上昇同伴で信頼性向上</li>
<li><strong>エントリー</strong>: クロス確認後の売りポジション</li>
</ul>
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ADXトレンドの活用</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">ADX上昇局面</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>意味</strong>: トレンド強化継続中</li>
<li><strong>戦略</strong>: 既存トレンド方向への追随</li>
<li><strong>ポジション</strong>: トレンド方向で積極的保有</li>
<li><strong>注意</strong>: 50超えでの反転可能性</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">ADX下降局面  </h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>意味</strong>: トレンド弱化、終了可能性</li>
<li><strong>戦略</strong>: ポジション縮小・利確検討</li>
<li><strong>新規</strong>: 新規エントリーは慎重に</li>
<li><strong>準備</strong>: レンジ戦略への切り替え準備</li>
</ul>`
      },
      {
        type: 'example',
        content: `<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">実際のトレード例：ビットコイン分析</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">2024年春季のADX活用例</h3>
<strong>3月上旬：強いトレンド発生の確認</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>価格状況</strong>: $60,000から急上昇開始</li>
<li><strong>ADX</strong>: 15→35への急上昇(トレンド強化)</li>
<li><strong>DI状況</strong>: +DI=40、-DI=15(明確な上昇優勢)</li>
<li><strong>シグナル</strong>: ADX25突破 + DI線優勢確認</li>
<li><strong>戦略</strong>: $62,000での追加買いエントリー</li>
<li><strong>結果</strong>: 2週間で$73,000まで18%上昇</li>
</ul>
<strong>4月中旬：トレンド継続の確認</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>価格状況</strong>: $70,000台での高値圏推移</li>
<li><strong>ADX</strong>: 45で高水準維持(強いトレンド継続)</li>
<li><strong>調整</strong>: 一時的な3%調整発生</li>
<li><strong>判断</strong>: ADX高水準のためトレンド継続期待</li>
<li><strong>戦略</strong>: 調整での押し目買い実行</li>
<li><strong>保有</strong>: ADX25以上のため基本ホールド継続</li>
<li><strong>結果</strong>: 10日後に新高値$75,000更新</li>
</ul>
<strong>5月：トレンド終了の早期察知</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>価格状況</strong>: $75,000で高値圏停滞</li>
<li><strong>ADX</strong>: 50→35への下降開始(トレンド弱化)</li>
<li><strong>DI変化</strong>: +DI/-DI差の縮小確認</li>
<li><strong>警戒</strong>: トレンド終了の可能性示唆</li>
<li><strong>戦略</strong>: ADX35割れで段階的利確開始</li>
<li><strong>結果</strong>: その後2週間で$65,000まで13%調整</li>
</ul>
<strong>学習ポイント</strong>: ADXは方向性ではなく強度を示すため、DI線との組み合わせが必須`
      },
      {
        type: 'tip',
        content: `<strong>ADX活用のコツ</strong>
1. <strong>ADXとDI線の組み合わせ</strong>:
   - ADX単独では方向性不明
   - 必ずDI線で方向性確認
   - 両者の一致でシグナル信頼性向上
2. <strong>段階的な判定</strong>:
   - ADX20: トレンド可能性の芽生え,
   - ADX25: トレンド確定の基準,
   - ADX40: 極めて強いトレンド,
   - ADX50+: 反転リスクも考慮
3. <strong>時間軸の活用</strong>: 長期時間軸でのADX分析で大局的トレンド把握！`
      },
      {
        type: 'text',
        content: `# 実践的なADX戦略
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">トレンドフォロー戦略</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">基本的なトレンド判定手法</h3>
1. <strong>ADX確認</strong>: ADXが25以上で上昇中
2. <strong>方向確認</strong>: DI線の優勢方向確認
3. <strong>エントリー</strong>: 優勢DI方向への順張り
4. <strong>保有</strong>: ADX25以上維持中のポジション継続
5. <strong>エグジット</strong>: ADX25割れまたはDI線逆転
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">段階的エントリー戦略</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>第1段階</strong>: ADX20突破での試し玉</li>
<li><strong>第2段階</strong>: ADX25確定での本格エントリー</li>
<li><strong>第3段階</strong>: ADX30超での追加ポジション</li>
<li><strong>利確</strong>: ADX40以上での段階的利確</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">リスク管理</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>ストップロス</strong>: DI線逆転で損切り</li>
<li><strong>ポジションサイズ</strong>: ADXレベルに応じた調整</li>
<li><strong>保有期間</strong>: ADX推移に応じた柔軟対応</li>
</ul>
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">レンジブレイクアウト戦略</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">レンジ相場の確認</h3>
1. <strong>ADX状態</strong>: ADX20以下で横ばい推移
2. <strong>価格確認</strong>: 明確なレンジ形成確認
3. <strong>ブレイク準備</strong>: レンジ上下限での待機
4. <strong>ADX変化</strong>: ADX上昇開始の確認
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">ブレイクアウトエントリー</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>価格ブレイク</strong>: レンジ上下限の明確突破</li>
<li><strong>ADX確認</strong>: ADX上昇開始の同時確認</li>
<li><strong>DI確認</strong>: ブレイク方向のDI優勢確認</li>
<li><strong>エントリー</strong>: 3条件揃い後のエントリー</li>
</ul>
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">複合戦略の活用</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">ADX + 移動平均線</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>トレンド</strong>: 移動平均線で大方向確認</li>
<li><strong>強度</strong>: ADXでトレンド強度確認</li>
<li><strong>エントリー</strong>: 両者一致でのエントリー</li>
<li><strong>フィルター</strong>: ADX弱い時の取引回避</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">ADX + RSI</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>過熱感</strong>: RSIで買われすぎ・売られすぎ確認</li>
<li><strong>継続性</strong>: ADXでトレンド継続性確認</li>
<li><strong>タイミング</strong>: RSI調整 + ADX継続での追加</li>
<li><strong>警戒</strong>: 両指標極値での反転注意</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">ADX + ボリンジャーバンド</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>ブレイク</strong>: バンド突破 + ADX上昇</li>
<li><strong>継続</strong>: バンド外推移 + ADX維持</li>
<li><strong>反転</strong>: バンド内復帰 + ADX下降</li>
<li><strong>確認</strong>: 価格・モメンタム両面での判定</li>
</ul>`
      },
      {
        type: 'text',
        content: `# ADXの高度な活用法
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">マルチタイムフレーム分析</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">時間軸別の活用</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>長期軸(週足)</strong>: 大局的トレンド強度確認</li>
<li><strong>中期軸(日足)</strong>: メイントレンド・戦略決定</li>
<li><strong>短期軸(4時間足)</strong>: エントリータイミング調整</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">統合判断手法</h3>
1. <strong>週足</strong>: 大局的トレンド方向とADX確認
2. <strong>日足</strong>: 中期的なトレンド強度評価
3. <strong>4時間足</strong>: 具体的なエントリーポイント
4. <strong>一致</strong>: 複数時間軸でのADX・DI一致
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">ADXパターン分析</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">ADXの上昇パターン</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>急上昇</strong>: 短期間でのADX急上昇(強いトレンド開始)</li>
<li><strong>緩上昇</strong>: 徐々のADX上昇(トレンド育成中)</li>
<li><strong>継続</strong>: 高水準でのADX維持(トレンド継続)</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">ADXの下降パターン  </h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>急下降</strong>: 短期間でのADX急下降(トレンド終了)</li>
<li><strong>緩下降</strong>: 徐々のADX下降(トレンド弱化)</li>
<li><strong>低位</strong>: 低水準でのADX維持(レンジ継続)</li>
</ul>
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">市場特性への適応</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">暗号通貨市場での調整</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>標準期間</strong>: 14期間(基本)</li>
<li><strong>高ボラ調整</strong>: 10期間(より敏感)</li>
<li><strong>安定重視</strong>: 21期間(ノイズ除去)</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">ADX閾値の調整</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>標準</strong>: 25(トレンド確定)</li>
<li><strong>敏感</strong>: 20(早期確認)</li>
<li><strong>厳格</strong>: 30(強いトレンドのみ)</li>
</ul>
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">季節性・サイクル分析</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">暗号通貨の季節パターン</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>Q1</strong>: 年始ラリー期(ADX上昇期待)</li>
<li><strong>Q2</strong>: 調整期(ADX下降傾向)</li>
<li><strong>Q3</strong>: 夏枯れ期(ADX低位推移)</li>
<li><strong>Q4</strong>: 年末ラリー期(ADX上昇期待)</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">サイクルとの組み合わせ</h3>
1. <strong>4年サイクル</strong>: 半減期サイクルとADX分析
2. <strong>年間サイクル</strong>: 季節性とADXトレンド
3. <strong>月間サイクル</strong>: 月末月初効果の考慮
4. <strong>統合</strong>: 複数サイクルでの総合判断
<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">実践的な改善ポイント</h2>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">バックテスト検証</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>期間</strong>: 過去2-3年のデータ検証</li>
<li><strong>パラメーター</strong>: 最適期間・閾値の検証</li>
<li><strong>成績</strong>: 勝率・リスクリワード比分析</li>
<li><strong>改善</strong>: 結果に基づく手法調整</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">リアルタイム監視</h3>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>アラート</strong>: ADX25突破・割れアラート設定</li>
<li><strong>DI監視</strong>: DI線クロスの自動通知</li>
<li><strong>複合</strong>: 他指標との組み合わせ通知</li>
<li><strong>管理</strong>: シグナル品質の継続評価</li>
</ul>`
      },
      {
        type: 'text',
        content: `
          <h1>理解度チェック</h1>
          <p>このセクションでは、ADX(平均方向性指数)の基本概念について理解を深めてください。ADXが30、+DIが35、-DIが20の場合、これは強い上昇トレンドが継続中であると判断できます。</p>
          
          <h3>重要なポイント</h3>
          <div class="understanding-check">
            <ul>
              <li><strong>ADX30の意味</strong>：ADX30は25-40の範囲で強いトレンドを示す</li>
              <li><strong>DI線の比較</strong>：+DI(35) > -DI(20)で上昇方向が優勢</li>
              <li><strong>総合判断</strong>：強いトレンド強度 + 上昇優勢 = 強い上昇トレンド</li>
              <li><strong>トレンド継続</strong>：この状況では上昇トレンド継続を期待</li>
            </ul>
          </div>
        `
      },
      {
        type: 'warning',
        content: `<strong>ADX使用時の注意点</strong>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">1. 方向性の誤認リスク</h3>
<strong>問題</strong>: ADX単独での方向性判断は不可能
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>必ずDI線との組み合わせ使用</li>
<li>+DI/-DIの優劣関係確認</li>
<li>価格チャートとの整合性確認</li>
<li>他の方向性指標との併用</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">2. 遅行指標の限界</h3>
<strong>問題</strong>: ADXはトレンド確定後のシグナル
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>早期シグナルへの過度な期待回避</li>
<li>トレンド初期段階での慎重判断</li>
<li>他の先行指標との組み合わせ</li>
<li>リスク管理の徹底</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">3. 極値での反転リスク</h3>
<strong>問題</strong>: ADX50超での反転可能性増大
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>高ADX値での利確検討</li>
<li>ポジションサイズの段階的縮小</li>
<li>反転シグナルへの注意深い監視</li>
<li>利益確定ルールの事前設定</li>
</ul>
<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">4. レンジ相場での誤用</h3>
<strong>問題</strong>: ADX低位時のトレンドフォロー適用
<strong>対策</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>ADX20以下での戦略変更</li>
<li>レンジ戦略への適切な切り替え</li>
<li>ブレイクアウト待機姿勢</li>
<li>無駄な売買の回避</li>
</ul>
<strong>成功の秘訣</strong>: ADXは「いつトレンドフォローを行うべきか」を教えてくれる重要な指標です。相場環境の正確な把握が成功の鍵となります。`
      },
      ],
    keyPoints: [
      'ADXはトレンドの方向性ではなく強度を測定する指標',
      'ADX25以上で強いトレンド、20以下でレンジ相場と判定',
      '+DI/-DIの優劣関係でトレンド方向を確認',
      'DI線のクロスオーバーでトレンド転換のシグナル',
      'ADX上昇中はトレンド強化、下降中はトレンド弱化',
      'ADX50超では極めて強いトレンドだが反転リスクも増大',
      'レンジ相場(ADX20以下)ではトレンドフォローを避ける',
      '他のテクニカル指標との組み合わせで精度向上'
    ]
    },

  quiz: [
    {
      id: 'trading-basics-adx-fundamentals-q1',
      question: 'ADXが30、+DIが35、-DIが20の場合、どのような状況と判断できますか？',
      options: [
        '弱い上昇トレンドが継続中',
        '強い上昇トレンドが継続中',
        'レンジ相場で方向感なし',
        '下降トレンドが始まっている'
      ],
      correctAnswer: 1,
      explanation: 'ADX30は強いトレンドを示し、+DI(35) > -DI(20)で上昇方向が優勢なため、強い上昇トレンドが継続中と判断できます。'
    },
    {
      id: 'trading-basics-adx-fundamentals-q2',
      question: 'ADXの基本的な機能として最も適切なのはどれですか？',
      options: [
        '価格の方向性を決定する',
        'トレンドの強さを測定する',
        '未来の価格を予測する',
        '出来高を分析する'
      ],
      correctAnswer: 1,
      explanation: 'ADXの基本的な機能はトレンドの強さを測定することで、価格の方向性ではなくトレンドの強度に焦点を当てた指標です。'
    },
    {
      id: 'trading-basics-adx-fundamentals-q3',
      question: 'ADXで一般的に強いトレンドと判断される数値はどれですか？',
      options: [
        '15以上',
        '20以上',
        '25以上',
        '30以上'
      ],
      correctAnswer: 2,
      explanation: 'ADX25以上で強いトレンドと判断されます。20以下はレンジ相場、25以上でトレンド相場として判定されるのが一般的です。'
    },
    {
      id: 'trading-basics-adx-fundamentals-q4',
      question: 'ADXシステムを構成する3つの指標の組み合わせとして正しいのはどれですか？',
      options: [
        'ADX、RSI、MACD',
        'ADX、+DI、-DI',
        'ADX、移動平均線、ボリンジャーバンド',
        'ADX、ストキャスティクス、CCI'
      ],
      correctAnswer: 1,
      explanation: 'ADXシステムは、ADX(トレンドの強さ)、+DI(上昇の力)、-DI(下降の力)の3つの指標から構成されます。'
    },
    {
      id: 'trading-basics-adx-fundamentals-q5',
      question: 'ADXを使用する際の最も重要な注意点は何ですか？',
      options: [
        'ADX単独で方向性を判断できる',
        'ADX単独では方向性が分からず、DI線との組み合わせが必須',
        'ADXは短期取引のみに有効',
        'ADX50以上では使用できない'
      ],
      correctAnswer: 1,
      explanation: 'ADX使用時の最重要注意点は、ADX単独では価格の方向性が分からず、必ず+DIと-DIの組み合わせでトレンド方向を確認する必要があることです。'
    }
  ],
  lastUpdated: '2025-08-17',
  factChecked: true

};