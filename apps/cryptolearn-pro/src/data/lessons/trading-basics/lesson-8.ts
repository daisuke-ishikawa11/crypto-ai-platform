import type { Lesson } from '../../../types';
export const lesson8: Lesson = {
  id: 'trading-basics-ichimoku-fundamentals',
  slug: 'ichimoku-fundamentals',
  title: '一目均衡表の基礎',
  description: '日本発祥の総合的テクニカル指標である一目均衡表の基本構成要素を学習します。雲・転換線・基準線・先行スパン・遅行スパンの基本概念と読み方を習得します。',
  categoryId: 'trading-basics',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 30,
  orderIndex:  8,
  isPublished: true,
  tags: ['一目均衡表', '雲', '転換線', '基準線', '先行スパン'],
  
  content: {
    sections: [
      {
        type: 'text',
        content: `
          <h1>一目均衡表の基礎知識</h1>
          
          <h2>一目均衡表とは</h2>
          <p><strong>一目均衡表（Ichimoku Kinko Hyo）</strong>は、1936年に細田悟一（一目山人）によって開発された日本発祥のテクニカル分析手法です。「<strong>一目で相場の均衡状態を把握する</strong>」ことを目的とし、時間・価格・波動の三要素を統合的に分析する非常に包括的な指標です。</p>
          
          <h3>一目均衡表の基本哲学</h3>
          <div class="ichimoku-philosophy">
            <h4>基本理念</h4>
            <ul>
              <li><strong>時間論</strong>：相場には一定の時間サイクルが存在</li>
              <li><strong>価格論</strong>：価格の値幅には規則性がある</li>
              <li><strong>波動論</strong>：相場は波動的に変動する</li>
              <li><strong>総合判断</strong>：3つの要素を組み合わせた分析</li>
            </ul>
          </div>
          
          <h3>他指標との違い</h3>
          <div class="differences">
            <ul>
              <li><strong>包括性</strong>：単一指標で多角的分析が可能</li>
              <li><strong>先行性</strong>：未来の抵抗・支持レベルを予測</li>
              <li><strong>日本的発想</strong>：東洋的な相場観に基づく理論</li>
              <li><strong>実践性</strong>：長期間の実取引での検証済み</li>
            </ul>
          </div>
          
          <h2>一目均衡表の5つの構成要素</h2>
          
          <h3>1. 転換線（Tenkan-sen）</h3>
          <div class="tenkan-sen">
            <ul>
              <li><strong>計算式</strong>：（9期間の最高値 + 最低値） ÷ 2</li>
              <li><strong>期間</strong>：9日（短期）</li>
              <li><strong>意味</strong>：短期的な相場の方向性</li>
              <li><strong>機能</strong>：短期サポート・レジスタンス</li>
            </ul>
          </div>
          
          <h3>2. 基準線（Kijun-sen）</h3>
          <div class="kijun-sen">
            <ul>
              <li><strong>計算式</strong>：（26期間の最高値 + 最低値） ÷ 2</li>
              <li><strong>期間</strong>：26日（中期）</li>
              <li><strong>意味</strong>：中期的な相場の方向性</li>
              <li><strong>機能</strong>：中期サポート・レジスタンス</li>
            </ul>
          </div>
          
          <h3>3. 先行スパン1（Senkou Span A）</h3>
          <div class="senkou-span-a">
            <ul>
              <li><strong>計算式</strong>：（転換線 + 基準線） ÷ 2を26期間先行</li>
              <li><strong>表示</strong>：26日未来に描画</li>
              <li><strong>意味</strong>：未来の抵抗・支持レベル</li>
              <li><strong>機能</strong>：雲の上端または下端</li>
            </ul>
          </div>
          
          <h3>4. 先行スパン2（Senkou Span B）</h3>
          <div class="senkou-span-b">
            <ul>
              <li><strong>計算式</strong>：（52期間の最高値 + 最低値） ÷ 2を26期間先行</li>
              <li><strong>表示</strong>：26日未来に描画</li>
              <li><strong>意味</strong>：より長期的な未来レベル</li>
              <li><strong>機能</strong>：雲の上端または下端</li>
            </ul>
          </div>
          
          <h3>5. 遅行スパン（Chikou Span）</h3>
          <div class="chikou-span">
            <ul>
              <li><strong>計算式</strong>：当日の終値を26期間過去に描画</li>
              <li><strong>表示</strong>：26日過去に描画</li>
              <li><strong>意味</strong>：現在価格と過去価格の比較</li>
              <li><strong>機能</strong>：トレンド強度の確認</li>
            </ul>
          </div>
        `
      },
      {
        type: 'text',
        content: `
          <h1>雲（Kumo）の分析</h1>
          
          <h2>雲とは</h2>
          <p><strong>雲（Kumo）</strong>は、先行スパン1と先行スパン2に囲まれた領域で、一目均衡表の最も重要な要素です。雲は<strong>未来のサポート・レジスタンスエリア</strong>を示し、相場の方向性と強さを判定する強力なツールです。</p>
          
          <h2>雲の色と意味</h2>
          <h3>上昇雲（陽の雲）</h3>
          <div class="bullish-cloud">
            <ul>
              <li><strong>条件</strong>：先行スパン1 > 先行スパン2</li>
              <li><strong>色</strong>：緑色（または白色）</li>
              <li><strong>意味</strong>：強気の未来サポートエリア</li>
              <li><strong>戦略</strong>：雲上限での押し目買いを検討</li>
            </ul>
          </div>
          
          <h3>下降雲（陰の雲）</h3>
          <div class="bearish-cloud">
            <ul>
              <li><strong>条件</strong>：先行スパン1 < 先行スパン2</li>
              <li><strong>色</strong>：赤色（または灰色）</li>
              <li><strong>意味</strong>：弱気の未来レジスタンスエリア</li>
              <li><strong>戦略</strong>：雲下限での戻り売りを検討</li>
            </ul>
          </div>
          
          <h2>雲の厚さと信頼性</h2>
          <h3>厚い雲</h3>
          <div class="thick-cloud">
            <ul>
              <li><strong>特徴</strong>：先行スパン1と2の差が大きい</li>
              <li><strong>意味</strong>：強力なサポート・レジスタンス</li>
              <li><strong>効果</strong>：価格の雲抜けが困難</li>
              <li><strong>戦略</strong>：雲での反発を重視</li>
            </ul>
          </div>
          
          <h3>薄い雲</h3>
          <div class="thin-cloud">
            <ul>
              <li><strong>特徴</strong>：先行スパン1と2の差が小さい</li>
              <li><strong>意味</strong>：弱いサポート・レジスタンス</li>
              <li><strong>効果</strong>：価格の雲抜けが容易</li>
              <li><strong>戦略</strong>：ブレイクアウトの可能性を考慮</li>
            </ul>
          </div>
          
          <h2>価格と雲の位置関係</h2>
          <h3>雲上（Above Cloud）</h3>
          <div class="above-cloud">
            <ul>
              <li><strong>状況</strong>：価格が雲の上で推移</li>
              <li><strong>意味</strong>：強気相場、上昇トレンド</li>
              <li><strong>雲の機能</strong>：サポートエリア</li>
              <li><strong>戦略</strong>：基本的に買いスタンス</li>
            </ul>
          </div>
          
          <h3>雲中（Inside Cloud）</h3>
          <div class="inside-cloud">
            <ul>
              <li><strong>状況</strong>：価格が雲の中で推移</li>
              <li><strong>意味</strong>：方向感の欠如、均衡状態</li>
              <li><strong>雲の機能</strong>：混合シグナル</li>
              <li><strong>戦略</strong>：雲抜けの方向を待つ</li>
            </ul>
          </div>
          
          <h3>雲下（Below Cloud）</h3>
          <div class="below-cloud">
            <ul>
              <li><strong>状況</strong>：価格が雲の下で推移</li>
              <li><strong>意味</strong>：弱気相場、下降トレンド</li>
              <li><strong>雲の機能</strong>：レジスタンスエリア</li>
              <li><strong>戦略</strong>：基本的に売りスタンス</li>
            </ul>
          </div>
        `
      },
      {
        type: 'example',
        content: `
          <h1>実践例：ビットコインの一目均衡表分析</h1>
          
          <h2>基本的な雲分析の実例</h2>
          
          <h3>雲上抜けブレイクアウトの例</h3>
          <div class="cloud-breakout-example">
            <h4>状況設定</h4>
            <ul>
              <li><strong>価格動向</strong>：$45,000付近で厚い雲を上抜け</li>
              <li><strong>雲状態</strong>：上昇雲（緑色）への転換</li>
              <li><strong>転換線・基準線</strong>：両方が上向きに転換</li>
              <li><strong>出来高</strong>：ブレイク時に大幅増加</li>
            </ul>
            
            <h4>基本的なエントリー戦略</h4>
            <ul>
              <li><strong>エントリー</strong>：$45,500（雲上抜け確認後）</li>
              <li><strong>ストップロス</strong>：$43,000（雲上限付近）</li>
              <li><strong>利益目標</strong>：$50,000（次の重要レベル）</li>
              <li><strong>リスクリワード比</strong>：1：1.8（適切な比率）</li>
            </ul>
          </div>
          
          <h3>雲サポートでの押し目買いの例</h3>
          <div class="cloud-support-example">
            <h4>状況設定</h4>
            <ul>
              <li><strong>価格動向</strong>：$48,000から雲上限まで調整</li>
              <li><strong>雲状態</strong>：厚い上昇雲がサポート機能</li>
              <li><strong>遅行スパン</strong>：過去価格を上回って推移</li>
              <li><strong>全体的トレンド</strong>：上昇トレンドが継続中</li>
            </ul>
            
            <h4>実践的なエントリー戦略</h4>
            <ul>
              <li><strong>エントリー</strong>：$46,200（雲タッチ後の反発確認）</li>
              <li><strong>ストップロス</strong>：$44,500（雲下限明確割れ）</li>
              <li><strong>利益目標</strong>：$52,000（前回高値付近）</li>
              <li><strong>リスク管理</strong>：段階的利益確定で利益保護</li>
            </ul>
          </div>
          
          <h3>基本的な学習ポイント</h3>
          <div class="learning-points">
            <ul>
              <li><strong>統合的分析</strong>：複数要素の組み合わせで高精度な分析が可能</li>
              <li><strong>未来予測</strong>：雲による未来サポート・レジスタンスの予測</li>
              <li><strong>リスク管理</strong>：明確なストップロス設定と適切な利益目標</li>
              <li><strong>必要な確認</strong>：他のテクニカル指標との組み合わせ</li>
            </ul>
          </div>
        `
      },
      {
        type: 'tip',
        content: `
          <h1>一目均衡表活用のコツとテクニック</h1>
          
          <div class="ichimoku-tips">
            <h2>📊 優先順位の理解</h2>
            <ol>
              <li><strong>雲の位置関係</strong>：最も重要な要素、基本的な相場判断の出発点</li>
              <li><strong>転換線・基準線</strong>：短中期トレンドの方向性を確認</li>
              <li><strong>遅行スパン</strong>：トレンドの強度と継続性を判定</li>
              <li><strong>複数シグナルの一致</strong>：信頼性の高い分析のために重要</li>
            </ol>
            
            <h2>⏰ 時間軸の選択</h2>
            <ul>
              <li><strong>デイトレード</strong>：1時間足・4時間足で短期的な動きを捉捉</li>
              <li><strong>スイングトレード</strong>：日足・週足で中期トレンドを把握</li>
              <li><strong>長期投資</strong>：週足・月足で大きな流れを判断</li>
            </ul>
            
            <h2>🔧 実践的な活用方法</h2>
            <ul>
              <li><strong>基本から開始</strong>：雲と価格の位置関係から習得</li>
              <li><strong>段階的学習</strong>：一度にすべての要素を理解しようとせず、段階的に学習</li>
              <li><strong>組み合わせ分析</strong>：他のテクニカル指標との組み合わせで精度向上</li>
              <li><strong>暗号通貨対応</strong>：ボラティリティに応じた調整を検討</li>
            </ul>
          </div>
        `
      },
      {
        type: 'text',
        content: `
          <h1>転換線・基準線の分析</h1>
          
          <h2>転換線と基準線の基本機能</h2>
          <h3>転換線(9日線)</h3>
          <ul>
            <li><strong>短期トレンド</strong>: 9日間の価格動向を表示</li>
            <li><strong>感度</strong>: 価格変化に敏感な反応</li>
            <li><strong>機能</strong>: 短期的なサポート・レジスタンス</li>
            <li><strong>活用</strong>: エントリータイミングの精密化</li>
          </ul>
          
          <h3>基準線(26日線)</h3>
          <ul>
            <li><strong>中期トレンド</strong>: 26日間の価格動向を表示</li>
            <li><strong>安定性</strong>: より安定した方向性を示す</li>
            <li><strong>機能</strong>: 中期的なサポート・レジスタンス</li>
            <li><strong>活用</strong>: メイントレンドの確認</li>
          </ul>
          
          <h2>クロスオーバー分析</h2>
          <h3>ゴールデンクロス(買いシグナル)</h3>
          <ul>
            <li><strong>発生</strong>: 転換線が基準線を下から上抜け</li>
            <li><strong>条件</strong>: 価格が雲上で発生すると信頼性向上</li>
            <li><strong>確認</strong>: 遅行スパンが過去価格を上回る</li>
            <li><strong>戦略</strong>: 確認後の買いエントリー</li>
          </ul>
          
          <h3>デッドクロス(売りシグナル)</h3>
          <ul>
            <li><strong>発生</strong>: 転換線が基準線を上から下抜け</li>
            <li><strong>条件</strong>: 価格が雲下で発生すると信頼性向上</li>
            <li><strong>確認</strong>: 遅行スパンが過去価格を下回る</li>
            <li><strong>戦略</strong>: 確認後の売りエントリー</li>
          </ul>
          
          <h2>価格との位置関係</h2>
          <h3>価格が両線の上</h3>
          <ul>
            <li><strong>意味</strong>: 短期・中期ともに強気</li>
            <li><strong>戦略</strong>: 強気スタンス維持</li>
            <li><strong>注意</strong>: 両線タッチでの押し目買い検討</li>
          </ul>
          
          <h3>価格が両線の下</h3>
          <ul>
            <li><strong>意味</strong>: 短期・中期ともに弱気</li>
            <li><strong>戦略</strong>: 弱気スタンス維持</li>
            <li><strong>注意</strong>: 両線タッチでの戻り売り検討</li>
          </ul>
          
          <h3>価格が両線の間</h3>
          <ul>
            <li><strong>意味</strong>: 短期・中期で方向性が異なる</li>
            <li><strong>戦略</strong>: 明確なブレイクまで待機</li>
            <li><strong>注意</strong>: だまし抜けの可能性あり</li>
          </ul>
          
          <h2>線の傾きとトレンド強度</h2>
          <h3>両線が上向き</h3>
          <ul>
            <li><strong>意味</strong>: 明確な上昇トレンド</li>
            <li><strong>強度</strong>: 傾きが急ほど強いトレンド</li>
            <li><strong>戦略</strong>: トレンドフォロー重視</li>
          </ul>
          
          <h3>両線が下向き</h3>
          <ul>
            <li><strong>意味</strong>: 明確な下降トレンド</li>
            <li><strong>強度</strong>: 傾きが急ほど強いトレンド</li>
            <li><strong>戦略</strong>: 戻り売り中心</li>
          </ul>
          
          <h3>線が水平または交差</h3>
          <ul>
            <li><strong>意味</strong>: トレンドの不明確性</li>
            <li><strong>状況</strong>: レンジまたは転換期</li>
            <li><strong>戦略</strong>: 明確な方向性まで待機</li>
          </ul>`
      },
      {
        type: 'text',
        content: `
          <h1>遅行スパンの活用法</h1>
          
          <h2>遅行スパンの基本概念</h2>
          <p><strong>遅行スパン</strong>は、現在の終値を26期間過去にプロットした線で、<strong>現在価格と過去価格の比較</strong>により、トレンドの強さと持続性を判定します。一目均衡表の中で最も重要度が高い要素の一つです。</p>
          
          <h2>遅行スパンによる分析</h2>
          <h3>過去価格との関係</h3>
          
          <h4>遅行スパンが過去価格の上</h4>
          <ul>
            <li><strong>意味</strong>: 現在価格 > 26日前の価格</li>
            <li><strong>トレンド</strong>: 上昇トレンド継続</li>
            <li><strong>市場心理</strong>: 強気の継続</li>
            <li><strong>戦略</strong>: 買いスタンス維持</li>
          </ul>
          
          <h4>遅行スパンが過去価格の下</h4>
          <ul>
            <li><strong>意味</strong>: 現在価格 < 26日前の価格</li>
            <li><strong>トレンド</strong>: 下降トレンド継続</li>
            <li><strong>市場心理</strong>: 弱気の継続</li>
            <li><strong>戦略</strong>: 売りスタンス維持</li>
          </ul>
          
          <h3>過去価格帯との相互作用</h3>
          
          <h4>抵抗帯として機能</h4>
          <ul>
            <li><strong>状況</strong>: 遅行スパンが過去の密集価格帯に到達</li>
            <li><strong>効果</strong>: その価格帯が現在価格の抵抗となる</li>
            <li><strong>活用</strong>: サポート・レジスタンスレベルの予測</li>
          </ul>
          
          <h4>空白地帯の通過</h4>
          <ul>
            <li><strong>状況</strong>: 遅行スパンが過去の空白地帯を通過</li>
            <li><strong>効果</strong>: 現在価格の抵抗が少ない</li>
            <li><strong>活用</strong>: トレンド継続の確認</li>
          </ul>
          
          <h2>実践的な活用方法</h2>
          <h3>エントリーシグナル</h3>
          <ol>
            <li><strong>遅行スパンの過去価格上抜け</strong>: 買いエントリー検討</li>
            <li><strong>遅行スパンの過去価格下抜け</strong>: 売りエントリー検討</li>
            <li><strong>他要素との確認</strong>: 雲・転換線・基準線との組み合わせ</li>
          </ol>
          
          <h3>トレンド継続の確認</h3>
          <ul>
            <li><strong>上昇継続</strong>: 遅行スパンが過去価格を持続的に上回る</li>
            <li><strong>下降継続</strong>: 遅行スパンが過去価格を持続的に下回る</li>
            <li><strong>転換警戒</strong>: 遅行スパンの過去価格への接近</li>
          </ul>
          
          <h3>利確・損切りの判断</h3>
          <ul>
            <li><strong>利確タイミング</strong>: 遅行スパンが過去価格に接近</li>
            <li><strong>損切り基準</strong>: 遅行スパンの明確な反対側突破</li>
            <li><strong>ポジション調整</strong>: 遅行スパンの動きに応じた段階的調整</li>
          </ul>
        `
      },
      {
        type: 'text',
        content: `
          <h1>理解度チェック</h1>
          <p>このセクションでは、一目均衡表の基本概念について理解を深めてください。一目均衡表で「雲」と呼ばれる領域は先行スパン1と先行スパン2によって形成され、未来のサポート・レジスタンスエリアを示します。</p>
          
          <h3>重要なポイント</h3>
          <div class="understanding-check">
            <ul>
              <li><strong>雲の形成</strong>：先行スパン1と先行スパン2によって形成</li>
              <li><strong>雲の意味</strong>：未来のサポート・レジスタンスエリアを示す</li>
              <li><strong>雲の色</strong>：上昇雲（緑）と下降雲（赤）に分類</li>
              <li><strong>雲の厚さ</strong>：厚い雲ほど強いサポート・レジスタンス</li>
            </ul>
          </div>
        `
      },
      {
        type: 'text',
        content: `
          <h1>一目均衡表の総合的な売買シグナル</h1>
          
          <h2>三役好転(強い買いシグナル)</h2>
          <h3>発生条件(3つすべて満たす)</h3>
          <ol>
            <li><strong>転換線が基準線を上抜け</strong></li>
            <li><strong>遅行スパンが26日前の価格を上抜け</strong></li>
            <li><strong>価格が雲を上抜け</strong></li>
          </ol>
          
          <h3>シグナルの信頼性</h3>
          <ul>
            <li><strong>最強の買いシグナル</strong>: 一目均衡表の最高評価</li>
            <li><strong>成功確率</strong>: 歴史的に高い的中率</li>
            <li><strong>継続性</strong>: 中長期的なトレンド継続期待</li>
          </ul>
          
          <h3>実践戦略</h3>
          <ul>
            <li><strong>エントリー</strong>: 3条件揃った確認後</li>
            <li><strong>ポジションサイズ</strong>: 通常より大きめに設定可能</li>
            <li><strong>利確</strong>: 段階的利確で利益最大化</li>
            <li><strong>損切り</strong>: 雲割れまたは基準線割れ</li>
          </ul>
          
          <h2>三役逆転(強い売りシグナル)</h2>
          <h3>発生条件(3つすべて満たす)</h3>
          <ol>
            <li><strong>転換線が基準線を下抜け</strong></li>
            <li><strong>遅行スパンが26日前の価格を下抜け</strong></li>
            <li><strong>価格が雲を下抜け</strong></li>
          </ol>
          
          <h3>実践戦略</h3>
          <ul>
            <li><strong>エントリー</strong>: 3条件揃った確認後の売り</li>
            <li><strong>ストップロス</strong>: 雲上抜けまたは基準線上抜け</li>
            <li><strong>利確</strong>: 段階的利確で利益確保</li>
          </ul>
          
          <h2>部分的シグナル</h2>
          <h3>2つの条件が揃う場合</h3>
          <ul>
            <li><strong>中程度の信頼性</strong>: 1つのシグナルより強い</li>
            <li><strong>戦略</strong>: 慎重なエントリー、小さめポジション</li>
            <li><strong>確認</strong>: 残り1つの条件達成を待つ</li>
          </ul>
          
          <h3>1つの条件のみ</h3>
          <ul>
            <li><strong>低い信頼性</strong>: 単独では取引根拠として弱い</li>
            <li><strong>活用</strong>: 他のテクニカル分析との組み合わせ</li>
            <li><strong>注意</strong>: だまし抜けの可能性を考慮</li>
          </ul>
          
          <h2>複合的な分析手法</h2>
          <h3>時間軸の組み合わせ</h3>
          <ul>
            <li><strong>長期軸</strong>: 週足・月足でメイントレンド確認</li>
            <li><strong>中期軸</strong>: 日足でエントリータイミング判定</li>
            <li><strong>短期軸</strong>: 4時間足・1時間足で精密調整</li>
          </ul>
          
          <h3>他指標との組み合わせ</h3>
          <ul>
            <li><strong>RSI</strong>: 買われすぎ・売られすぎの確認</li>
            <li><strong>MACD</strong>: モメンタムの確認</li>
            <li><strong>出来高</strong>: シグナルの信頼性向上</li>
            <li><strong>ファンダメンタル</strong>: 長期方向性との整合性</li>
          </ul>
        `
      },
      {
        type: 'warning',
        content: `**一目均衡表使用時の注意点**
### 1. 複雑性による混乱
**問題**: 5つの要素が多すぎて判断に迷う
**対策**:
- 最初は雲と価格位置から開始
- 段階的に他要素を追加習得
- 優先順位を明確にして分析
### 2. 急激な市場変動への対応
**問題**: 大きなニュースによる急変動で指標が機能しない
**対策**:
- ファンダメンタル分析との併用
- ストップロス設定の徹底
- ポジションサイズの適切な管理
### 3. レンジ相場での効果限定
**問題**: 横ばい相場では多くのだましシグナル
**対策**:
- 明確なトレンド発生まで待機
- 雲の厚さと形状を重視
- 他のレンジ向け指標と組み合わせ
### 4. パラメーター固定の限界
**問題**: 9-26-52の設定が全市場に最適とは限らない
**対策**:
- 市場特性に応じた微調整検討
- バックテストでの検証
- 複数設定での比較分析
### 5. 学習コストの高さ
**重要**: 一目均衡表は習得に時間がかかる
**推奨アプローチ**: 基本概念から段階的に学習
**避けるべき**: 不完全な理解での実取引
**成功の秘訣**: 一目均衡表は強力ですが、総合的な理解と経験の蓄積が不可欠です。`
      },
      ],
    keyPoints: [
      '一目均衡表は時間・価格・波動を統合的に分析する包括的指標',
      '雲は先行スパン1と2で形成され、未来のサポート・レジスタンスエリアを示す',
      '転換線（9日）と基準線（26日）は短中期トレンドの方向性を表示',
      '上昇雲（緑）と下降雲（赤）で相場の基本的な方向性を判断',
      '価格と雲の位置関係（雲上・雲中・雲下）が基本的な相場判断',
      '遅行スパンは現在価格と26日前価格の比較でトレンド強度を測定',
      '雲の厚さは抵抗・支持レベルの強さを表し、厚いほど突破困難',
      '複数要素の組み合わせで分析精度が向上する包括的分析手法',
      '段階的学習が重要で、雲と価格位置から始めて徐々に習得'
    ]
    },

  quiz: [
    {
      id: 'trading-basics-ichimoku-fundamentals-q1',
      question: '一目均衡表の5つの構成要素に含まれないのはどれですか？',
      options: [
        '転換線（Tenkan-sen）',
        '基準線（Kijun-sen）',
        '移動平均線（Moving Average）',
        '遅行スパン（Chikou Span）'
      ],
      correctAnswer: 2,
      explanation: '一目均衡表の5つの構成要素は転換線、基準線、先行スパン1、2、遅行スパンです。移動平均線は別のテクニカル指標です。'
    },
    {
      id: 'trading-basics-ichimoku-fundamentals-q2',
      question: '一目均衡表の「雲」は何によって形成されますか？',
      options: [
        '転換線と基準線',
        '先行スパン1と先行スパン2',
        '基準線と遅行スパン',
        '転換線と遅行スパン'
      ],
      correctAnswer: 1,
      explanation: '雲（Kumo）は先行スパン1と先行スパン2によって形成される領域で、未来のサポート・レジスタンスエリアを示します。'
    },
    {
      id: 'trading-basics-ichimoku-fundamentals-q3',
      question: '上昇雲（陽の雲）が形成される条件は何ですか？',
      options: [
        '先行スパン1 < 先行スパン2',
        '先行スパン1 > 先行スパン2',
        '先行スパン1 = 先行スパン2',
        '転換線 > 基準線'
      ],
      correctAnswer: 1,
      explanation: '上昇雲（陽の雲）は先行スパン1が先行スパン2より大きい時に形成され、強気の未来サポートエリアを意味します。'
    },
    {
      id: 'trading-basics-ichimoku-fundamentals-q4',
      question: '転換線の計算期間と基準線の計算期間の組み合わせとして正しいのはどれですか？',
      options: [
        '転換線：5日、基準線：20日',
        '転換線：9日、基準線：26日',
        '転換線：14日、基準線：28日',
        '転換線：12日、基準線：24日'
      ],
      correctAnswer: 1,
      explanation: '転換線は9日間の最高値と最低値の中間値、基準線は26日間の最高値と最低値の中間値で計算されます。'
    },
    {
      id: 'trading-basics-ichimoku-fundamentals-q5',
      question: '遅行スパンの主な機能は何ですか？',
      options: [
        '未来の価格を予測する',
        '現在価格と過去価格を比較してトレンド強度を確認する',
        '出来高を分析する',
        '移動平均線を計算する'
      ],
      correctAnswer: 1,
      explanation: '遅行スパンは現在の終値を26期間過去に描画し、現在価格と過去価格を比較することでトレンドの強度と継続性を判定します。'
    }
  ],
  lastUpdated: '2025-08-17',
  factChecked: true

};