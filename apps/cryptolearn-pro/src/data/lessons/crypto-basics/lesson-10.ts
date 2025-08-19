import type { Lesson } from '../../../types';

export const lesson10: Lesson = {
  id: 'crypto-basics-10',
  categoryId: 'crypto-basics',
  title: 'Reading Price Charts - チャート基礎',
  slug: 'reading-price-charts',
  description: '2025年最新のチャート分析手法で暗号通貨価格の動きを読み解く。AI時代の高頻度取引に対応したローソク足とトレンド分析を学びます。',
  difficultyLevel: 'beginner',
  estimatedMinutes: 28,
  orderIndex: 10,
  content: {
    sections: [
      {
        id: 'section-1',
        title: '価格チャートの基本',
        orderIndex: 1,
        type: 'text',
        content: `
<p>価格チャートは、暗号通貨の価格変動を時系列で視覚的に表現したグラフです。<br/>
2025年現在、AI取引・機関投資家の参入により市場構造が変化していますが、基本的なチャート読解力はより重要になっています。</p>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; padding: 2rem; margin: 2rem 0; text-align: center;">
  <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.4em;">🔮 2025年のチャート分析環境</h3>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0;">
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🤖 AI取引の影響</h4>
      <p style="margin: 0; font-size: 0.9em;">アルゴリズム取引が市場の70%+を占める</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🏛️ 機関投資家参入</h4>
      <p style="margin: 0; font-size: 0.9em;">BlackRock、MicroStrategy等の大量保有</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">📱 リアルタイム分析</h4>
      <p style="margin: 0; font-size: 0.9em;">TradingView、CoinGecko等の高度ツール</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">💰 ETF承認効果</h4>
      <p style="margin: 0; font-size: 0.9em;">Bitcoin ETFにより従来の金融分析も適用</p>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">チャートの構成要素</h2>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem; text-align: center;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">📊 X軸（水平）</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">時間軸を表示</p>
    <ul style="margin: 1rem 0 0 0; padding-left: 1rem; text-align: left; font-size: 0.9em;">
      <li>分足</li>
      <li>時間足</li>
      <li>日足</li>
      <li>週足・月足</li>
    </ul>
  </div>
  
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem; text-align: center;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">💰 Y軸（垂直）</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">価格軸を表示</p>
    <ul style="margin: 1rem 0 0 0; padding-left: 1rem; text-align: left; font-size: 0.9em;">
      <li>USD価格</li>
      <li>BTC価格</li>
      <li>ETH価格</li>
      <li>JPY価格</li>
    </ul>
  </div>
  
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem; text-align: center;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">📈 出来高</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">取引量を表示</p>
    <ul style="margin: 1rem 0 0 0; padding-left: 1rem; text-align: left; font-size: 0.9em;">
      <li>バーチャート形式</li>
      <li>通常は下部に配置</li>
      <li>価格の信頼性指標</li>
    </ul>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">2025年版：チャートタイプと活用場面</h2>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #2d3748; margin: 0 0 1rem 0; text-align: center;">📈 ラインチャート</h3>
    <div style="background: #dbeafe; border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; font-weight: bold; color: #1e40af;">特徴:</p>
      <ul style="margin: 0.5rem 0 0 1rem; color: #374151; font-size: 0.9em;">
        <li>最もシンプル</li>
        <li>終値のみを線で結ぶ</li>
        <li>長期トレンド把握に最適</li>
        <li><strong>2025年用途:</strong> マクロ経済分析</li>
      </ul>
    </div>
    <div style="background: #22c55e; color: white; border-radius: 8px; padding: 0.5rem; margin: 0.5rem 0; text-align: center; font-size: 0.85em;">
      機関投資家の長期分析で使用
    </div>
  </div>
  
  <div style="background: #f8fafc; border: 2px solid #16a34a; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #16a34a; margin: 0 0 1rem 0; text-align: center;">🕯️ ローソク足チャート</h3>
    <div style="background: #dcfce7; border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; font-weight: bold; color: #16a34a;">特徴:</p>
      <ul style="margin: 0.5rem 0 0 1rem; color: #374151; font-size: 0.9em;">
        <li>最も情報量が多い</li>
        <li>始値・高値・安値・終値</li>
        <li>詳細な価格分析が可能</li>
      </ul>
    </div>
    <div style="background: #22c55e; color: white; border-radius: 8px; padding: 0.5rem; margin: 0.5rem 0; text-align: center;">
      <strong>2025年最重要チャート</strong>
    </div>
    <div style="background: #3b82f6; color: white; border-radius: 8px; padding: 0.5rem; margin: 0.5rem 0; text-align: center; font-size: 0.85em;">
      TradingView・CoinGeckoで標準
    </div>
  </div>
  
  <div style="background: #f8fafc; border: 2px solid #f59e0b; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #f59e0b; margin: 0 0 1rem 0; text-align: center;">📊 バーチャート</h3>
    <div style="background: #fef3c7; border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; font-weight: bold; color: #d97706;">特徴:</p>
      <ul style="margin: 0.5rem 0 0 1rem; color: #374151; font-size: 0.9em;">
        <li>高値・安値・終値表示</li>
        <li>ローソク足と同等情報</li>
        <li>視覚的に見づらい</li>
        <li><strong>2025年:</strong> 欧米投資家に人気</li>
      </ul>
    </div>
    <div style="background: #f59e0b; color: white; border-radius: 8px; padding: 0.5rem; margin: 0.5rem 0; text-align: center; font-size: 0.85em;">
      Bloomberg、Reuters等で使用
    </div>
  </div>
</div>

<div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 2025年チャート選択戦略</h3>
<p style="margin: 0.5rem 0 0 0; color: #374151; line-height: 1.6;">初心者にはローソク足チャートがおすすめです。AI時代でも人間の視覚的パターン認識は有効で、プロの95%がローソク足を使用しています。</p>
<div style="background: #dbeafe; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
  <p style="margin: 0; font-weight: bold; color: #1e40af;">2025年の推奨学習順序:</p>
  <ol style="margin: 0.5rem 0 0 1rem; color: #374151; font-size: 0.9em;">
    <li>ローソク足の基本パターン習得</li>
    <li>TradingViewでの実践練習</li>
    <li>AI分析ツールとの組み合わせ</li>
    <li>機関投資家動向との照合</li>
  </ol>
</div>
</div>
        `
      },
      {
        id: 'section-2',
        title: 'ローソク足の読み方',
        orderIndex: 2,
        type: 'text',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">ローソク足の構造</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; padding: 2rem;">
    <h3 style="color: #ffffff; margin: 0 0 1.5rem 0; font-size: 1.4em; text-align: center;">📦 実体（胴体部分）</h3>
    
    <div style="background: rgba(255,255,255,0.15); border: 2px solid #22c55e; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="margin: 0 0 0.5rem 0; color: #90EE90;">🟢 陽線（上昇）</h4>
      <p style="margin: 0; font-size: 0.9em;">終値 > 始値</p>
      <p style="margin: 0; font-size: 0.9em;">通常は緑色または白色</p>
    </div>
    
    <div style="background: rgba(255,255,255,0.15); border: 2px solid #ef4444; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="margin: 0 0 0.5rem 0; color: #FFB6C1;">🔴 陰線（下落）</h4>
      <p style="margin: 0; font-size: 0.9em;">終値 < 始値</p>
      <p style="margin: 0; font-size: 0.9em;">通常は赤色または黒色</p>
    </div>
    
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem; text-align: center;">
      <p style="margin: 0; font-weight: bold;">実体の長さ = 始値と終値の差</p>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 16px; padding: 2rem;">
    <h3 style="color: #ffffff; margin: 0 0 1.5rem 0; font-size: 1.4em; text-align: center;">📏 ヒゲ（線部分）</h3>
    
    <div style="background: rgba(255,255,255,0.15); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">⬆️ 上ヒゲ</h4>
      <p style="margin: 0; font-size: 0.9em;">実体上端から高値まで</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.8em; font-style: italic;">上昇圧力の強さを示す</p>
    </div>
    
    <div style="background: rgba(255,255,255,0.15); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">⬇️ 下ヒゲ</h4>
      <p style="margin: 0; font-size: 0.9em;">実体下端から安値まで</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.8em; font-style: italic;">下落圧力の強さを示す</p>
    </div>
    
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem; text-align: center;">
      <p style="margin: 0; font-weight: bold;">ヒゲの長さ = 価格の変動幅</p>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">2025年版：AI時代のローソク足パターン</h2>

<div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; margin: 2rem 0;">
  <div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 12px; padding: 1rem; text-align: center;">
    <h4 style="color: #16a34a; margin: 0 0 0.5rem 0; font-size: 1em;">📈 大陽線</h4>
    <div style="background: #22c55e; height: 40px; width: 60%; margin: 0.5rem auto; border-radius: 4px;"></div>
    <p style="margin: 0.5rem 0 0 0; font-size: 0.8em; color: #374151;">強い上昇圧力</p>
    <p style="margin: 0; font-size: 0.8em; color: #16a34a; font-weight: bold;">買いサイン</p>
  </div>

  <div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 12px; padding: 1rem; text-align: center;">
    <h4 style="color: #ef4444; margin: 0 0 0.5rem 0; font-size: 1em;">📉 大陰線</h4>
    <div style="background: #ef4444; height: 40px; width: 60%; margin: 0.5rem auto; border-radius: 4px;"></div>
    <p style="margin: 0.5rem 0 0 0; font-size: 0.8em; color: #374151;">強い下落圧力</p>
    <p style="margin: 0; font-size: 0.8em; color: #ef4444; font-weight: bold;">売りサイン</p>
  </div>

  <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 1rem; text-align: center;">
    <h4 style="color: #f59e0b; margin: 0 0 0.5rem 0; font-size: 1em;">➕ 十字線</h4>
    <div style="background: #f59e0b; height: 2px; width: 60%; margin: 18px auto; border-radius: 4px; position: relative;">
      <div style="background: #f59e0b; width: 2px; height: 20px; position: absolute; left: 50%; top: -9px; transform: translateX(-50%);"></div>
    </div>
    <p style="margin: 0.5rem 0 0 0; font-size: 0.8em; color: #374151;">市場の迷い</p>
    <p style="margin: 0; font-size: 0.8em; color: #f59e0b; font-weight: bold;">転換サイン</p>
  </div>

  <div style="background: #fdf4ff; border: 2px solid #a855f7; border-radius: 12px; padding: 1rem; text-align: center;">
    <h4 style="color: #a855f7; margin: 0 0 0.5rem 0; font-size: 1em;">📌 上影陰線</h4>
    <div style="background: #a855f7; height: 25px; width: 50%; margin: 0.5rem auto; border-radius: 4px; position: relative;">
      <div style="background: #a855f7; width: 2px; height: 15px; position: absolute; left: 50%; top: -15px; transform: translateX(-50%);"></div>
    </div>
    <p style="margin: 0.5rem 0 0 0; font-size: 0.8em; color: #374151;">上昇試すも失敗</p>
    <p style="margin: 0; font-size: 0.8em; color: #a855f7; font-weight: bold;">売り圧力強</p>
  </div>

  <div style="background: #ecfdf5; border: 2px solid #10b981; border-radius: 12px; padding: 1rem; text-align: center;">
    <h4 style="color: #10b981; margin: 0 0 0.5rem 0; font-size: 1em;">📍 下影陽線</h4>
    <div style="background: #10b981; height: 25px; width: 50%; margin: 0.5rem auto; border-radius: 4px; position: relative;">
      <div style="background: #10b981; width: 2px; height: 15px; position: absolute; left: 50%; bottom: -15px; transform: translateX(-50%);"></div>
    </div>
    <p style="margin: 0.5rem 0 0 0; font-size: 0.8em; color: #374151;">下落後に回復</p>
    <p style="margin: 0; font-size: 0.8em; color: #10b981; font-weight: bold;">買い圧力強</p>
  </div>
</div>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <h3 style="margin: 0 0 1rem 0; color: #2d3748; text-align: center;">🤖 2025年のAI時代におけるローソク足分析</h3>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
    <div style="background: #f0fdf4; border-radius: 8px; padding: 1rem; border-left: 4px solid #16a34a;">
      <h4 style="margin: 0 0 0.5rem 0; color: #16a34a;">✅ 人間の優位性</h4>
      <ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
        <li>視覚パターン認識</li>
        <li>市場心理の理解</li>
        <li>柔軟な状況判断</li>
        <li>ファンダメンタル組み合わせ</li>
      </ul>
    </div>
    <div style="background: #fef2f2; border-radius: 8px; padding: 1rem; border-left: 4px solid #ef4444;">
      <h4 style="margin: 0 0 0.5rem 0; color: #ef4444;">🚨 AIの影響</h4>
      <ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
        <li>短期的パターンの無効化</li>
        <li>高頻度取引によるノイズ</li>
        <li>ライトニングクラッシュ</li>
        <li>伝統的指標の遅れ</li>
      </ul>
    </div>
  </div>
  <div style="background: #dbeafe; border-radius: 8px; padding: 1rem; margin: 1rem 0; text-align: center;">
    <p style="margin: 0; font-weight: bold; color: #1e40af;">重要：2025年はローソク足パターンを出来高・マクロ環境・オンチェーン指標と組み合わせることが不可欠</p>
  </div>
</div>
        `
      },
      {
        id: 'section-3',
        title: 'トレンドの識別',
        orderIndex: 3,
        type: 'text',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年版：トレンドの基本概念と最新市場環境</h2>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; border-radius: 16px; padding: 2rem; text-align: center;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.3em;">🐂 上昇トレンド</h3>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-weight: bold; font-size: 1.1em;">Bull Market</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9em;">2024-2025の特徴：ETF承認、機関参入</p>
    </div>
    <ul style="margin: 0; padding-left: 1rem; line-height: 1.8; font-size: 0.9em; text-align: left;">
      <li>高値と安値が切り上がる</li>
      <li>買い圧力が売り圧力を上回る</li>
      <li>長期的な価格上昇</li>
      <li><strong>2025年特徴:</strong> 機関的買いが支え</li>
    </ul>
    <div style="background: rgba(255,255,255,0.15); border-radius: 8px; padding: 0.5rem; margin: 1rem 0; font-size: 0.85em;">
      例：BTC $40K→$70K (2024-2025)
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; border-radius: 16px; padding: 2rem; text-align: center;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.3em;">🐻 下降トレンド</h3>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-weight: bold; font-size: 1.1em;">Bear Market</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9em;">2022-2023の例：FTX破綻、規制懸念</p>
    </div>
    <ul style="margin: 0; padding-left: 1rem; line-height: 1.8; font-size: 0.9em; text-align: left;">
      <li>高値と安値が切り下がる</li>
      <li>売り圧力が買い圧力を上回る</li>
      <li>長期的な価格下落</li>
      <li><strong>2025年特徴:</strong> 機関の逆造で復活速い</li>
    </ul>
    <div style="background: rgba(255,255,255,0.15); border-radius: 8px; padding: 0.5rem; margin: 1rem 0; font-size: 0.85em;">
      過去例：BTC $69K→$15K (2022)
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%); color: white; border-radius: 16px; padding: 2rem; text-align: center;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.3em;">📊 横ばいトレンド</h3>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-weight: bold; font-size: 1.1em;">Range Market</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9em;">2025年特徴：AIが価格維持</p>
    </div>
    <ul style="margin: 0; padding-left: 1rem; line-height: 1.8; font-size: 0.9em; text-align: left;">
      <li>一定の価格帯での上下動</li>
      <li>明確な方向性がない</li>
      <li>様子見ムードが強い</li>
      <li><strong>2025年:</strong> アルゴ取引が範囲維持</li>
    </ul>
    <div style="background: rgba(255,255,255,0.15); border-radius: 8px; padding: 0.5rem; margin: 1rem 0; font-size: 0.85em;">
      例：BTC $60K-$70Kレンジ (2025年前半)
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">トレンドライン分析</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin: 2rem 0;">
  <div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 16px; padding: 2rem;">
    <h3 style="color: #16a34a; margin: 0 0 1.5rem 0; font-size: 1.4em; text-align: center;">📈 上昇トレンドライン</h3>
    
    <div style="background: rgba(34, 197, 94, 0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="margin: 0 0 0.5rem 0; color: #16a34a;">特徴:</h4>
      <ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
        <li>安値同士を結んだ上昇する直線</li>
        <li>サポートライン（支持線）として機能</li>
      </ul>
    </div>
    
    <div style="background: #fef2f2; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="margin: 0 0 0.5rem 0; color: #ef4444;">重要ポイント:</h4>
      <p style="margin: 0; color: #374151; font-size: 0.9em;">ラインを下回ると上昇トレンド終了の可能性</p>
    </div>
  </div>

  <div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 16px; padding: 2rem;">
    <h3 style="color: #ef4444; margin: 0 0 1.5rem 0; font-size: 1.4em; text-align: center;">📉 下降トレンドライン</h3>
    
    <div style="background: rgba(239, 68, 68, 0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="margin: 0 0 0.5rem 0; color: #ef4444;">特徴:</h4>
      <ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
        <li>高値同士を結んだ下降する直線</li>
        <li>レジスタンスライン（抵抗線）として機能</li>
      </ul>
    </div>
    
    <div style="background: #dcfce7; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="margin: 0 0 0.5rem 0; color: #16a34a;">重要ポイント:</h4>
      <p style="margin: 0; color: #374151; font-size: 0.9em;">ラインを上回ると下降トレンド終了の可能性</p>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">サポート・レジスタンス</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; border-radius: 16px; padding: 2rem;">
    <h3 style="color: #ffffff; margin: 0 0 1.5rem 0; font-size: 1.4em; text-align: center;">🛡️ サポートライン</h3>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-weight: bold; font-size: 1.1em;">支持線</p>
    </div>
    
    <ul style="margin: 1rem 0 0 0; padding-left: 1rem; line-height: 1.8; font-size: 0.9em;">
      <li>価格の下落を支える水準</li>
      <li>過去の安値付近に形成</li>
      <li>買い注文が集中する価格帯</li>
    </ul>
    
    <div style="background: rgba(255,255,255,0.15); border-radius: 8px; padding: 1rem; margin: 1rem 0; text-align: center;">
      <p style="margin: 0; font-size: 0.9em; font-style: italic;">「この価格より下では買いたい」</p>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; border-radius: 16px; padding: 2rem;">
    <h3 style="color: #ffffff; margin: 0 0 1.5rem 0; font-size: 1.4em; text-align: center;">🚧 レジスタンスライン</h3>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-weight: bold; font-size: 1.1em;">抵抗線</p>
    </div>
    
    <ul style="margin: 1rem 0 0 0; padding-left: 1rem; line-height: 1.8; font-size: 0.9em;">
      <li>価格の上昇を阻む水準</li>
      <li>過去の高値付近に形成</li>
      <li>売り注文が集中する価格帯</li>
    </ul>
    
    <div style="background: rgba(255,255,255,0.15); border-radius: 8px; padding: 1rem; margin: 1rem 0; text-align: center;">
      <p style="margin: 0; font-size: 0.9em; font-style: italic;">「この価格まで上がれば売りたい」</p>
    </div>
  </div>
</div>

<div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 サポート・レジスタンスの活用法</h3>
<ul style="margin: 0.5rem 0 0 1.5rem; color: #374151; line-height: 1.7;">
  <li><strong>エントリーポイント:</strong> サポート付近での買い、レジスタンス付近での売り</li>
  <li><strong>損切りライン:</strong> サポート・レジスタンス突破時の損切り設定</li>
  <li><strong>利確ポイント:</strong> 次のレジスタンス・サポートでの利益確定</li>
</ul>
</div>
        `
      },
      {
        id: 'section-4',
        title: '出来高分析の基礎',
        orderIndex: 4,
        type: 'text',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年版：出来高分析の重要性とAI時代の特徴</h2>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; padding: 2rem; margin: 2rem 0; text-align: center;">
  <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.4em;">📊 2025年：出来高は価格変動の「信頼性」を判断する重要な指標</h3>
  <p style="margin: 0; font-size: 1.1em; line-height: 1.6;">価格だけでなく、どれだけの取引量があったかが、その価格変動の意味を決める</p>
  <div style="background: rgba(255,255,255,0.15); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
    <p style="margin: 0; font-weight: bold; font-size: 1em;">AI時代の特徴：マイクロ秒単位の高頻度取引で出来高の意味が変化</p>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">出来高と価格の関係パターン</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #16a34a; margin: 0 0 1rem 0; display: flex; align-items: center;">📈📊 価格上昇 + 出来高増加</h3>
    <div style="background: rgba(34, 197, 94, 0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; font-weight: bold; color: #16a34a;">結果: 強い上昇シグナル</p>
    </div>
    <ul style="margin: 0.5rem 0 0 1rem; color: #374151; font-size: 0.9em; line-height: 1.6;">
      <li>多くの投資家が買いに参加</li>
      <li>トレンドの継続性が高い</li>
      <li>次のステージへの期待</li>
    </ul>
  </div>

  <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #f59e0b; margin: 0 0 1rem 0; display: flex; align-items: center;">📈📉 価格上昇 + 出来高減少</h3>
    <div style="background: rgba(245, 158, 11, 0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; font-weight: bold; color: #f59e0b;">結果: 弱い上昇シグナル</p>
    </div>
    <ul style="margin: 0.5rem 0 0 1rem; color: #374151; font-size: 0.9em; line-height: 1.6;">
      <li>限られた参加者のみの動き</li>
      <li>トレンド継続性に疑問</li>
      <li>反転の可能性あり</li>
    </ul>
  </div>

  <div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ef4444; margin: 0 0 1rem 0; display: flex; align-items: center;">📉📊 価格下落 + 出来高増加</h3>
    <div style="background: rgba(239, 68, 68, 0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; font-weight: bold; color: #ef4444;">結果: 強い下落シグナル</p>
    </div>
    <ul style="margin: 0.5rem 0 0 1rem; color: #374151; font-size: 0.9em; line-height: 1.6;">
      <li>パニック売りの可能性</li>
      <li>さらなる下落の危険性</li>
      <li>市場の恐怖心理</li>
    </ul>
  </div>

  <div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #22c55e; margin: 0 0 1rem 0; display: flex; align-items: center;">📉📉 価格下落 + 出来高減少</h3>
    <div style="background: rgba(34, 197, 94, 0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; font-weight: bold; color: #22c55e;">結果: 弱い下落シグナル</p>
    </div>
    <ul style="margin: 0.5rem 0 0 1rem; color: #374151; font-size: 0.9em; line-height: 1.6;">
      <li>売り圧力の枯渇</li>
      <li>反発の可能性</li>
      <li>底値圏の兆候</li>
    </ul>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">2025年版：特殊な出来高パターンと最新事例</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; border-radius: 16px; padding: 2rem;">
    <h3 style="color: #ffffff; margin: 0 0 1.5rem 0; font-size: 1.4em; text-align: center;">💥 クライマックス</h3>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-weight: bold; font-size: 1.1em;">パニック売り</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9em;">最新例：2022年Terra LUNAクラッシュ</p>
    </div>
    
    <ul style="margin: 1rem 0 0 0; padding-left: 1rem; line-height: 1.8; font-size: 0.9em;">
      <li>急激な価格下落（-90%以上）</li>
      <li>異常な出来高増加（平常の10-50倍）</li>
      <li>投資家の恐怖による大量売り</li>
      <li><strong>2025年特徴:</strong> レバレッジ清算連鎖</li>
    </ul>
    
    <div style="background: rgba(255,255,255,0.15); border-radius: 8px; padding: 1rem; margin: 1rem 0; text-align: center;">
      <p style="margin: 0; font-size: 0.9em; font-weight: bold;">底値の可能性を示唆（但し、AIの介入で復活も速い）</p>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; border-radius: 16px; padding: 2rem;">
    <h3 style="color: #ffffff; margin: 0 0 1.5rem 0; font-size: 1.4em; text-align: center;">📤 ディストリビューション</h3>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-weight: bold; font-size: 1.1em;">大口の売り抜け</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9em;">例：Mt.Gox BTC売却（2024年）</p>
    </div>
    
    <ul style="margin: 1rem 0 0 0; padding-left: 1rem; line-height: 1.8; font-size: 0.9em;">
      <li>価格横ばい（上下5%以内）</li>
      <li>高い出来高（平常の2-5倍）</li>
      <li>機関投資家の売り抜けの可能性</li>
      <li><strong>2025年特徴:</strong> オンチェーンデータで追跡可能</li>
    </ul>
    
    <div style="background: rgba(255,255,255,0.15); border-radius: 8px; padding: 1rem; margin: 1rem 0; text-align: center;">
      <p style="margin: 0; font-size: 0.9em; font-weight: bold;">その後の下落を示唆（但し、ETFの需要で吸収される場合も）</p>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">2025年版：実践的なチャート分析のコツと最新ツール</h2>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: #f8fafc; border: 2px solid #3b82f6; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #3b82f6; margin: 0 0 1rem 0; text-align: center;">⏰ 2025年版：複数時間軸分析</h3>
    <ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em; line-height: 1.7;">
      <li><strong>1分足:</strong> スキャルピング（AI主導）</li>
      <li><strong>時間足:</strong> 短期の動き</li>
      <li><strong>日足:</strong> 中期トレンド</li>
      <li><strong>週足:</strong> 長期トレンド（機関重視）</li>
    </ul>
    <div style="background: #dbeafe; border-radius: 8px; padding: 0.5rem; margin: 0.5rem 0; text-align: center; font-size: 0.8em;">
      TradingViewで同時表示推奨
    </div>
  </div>
  
  <div style="background: #f8fafc; border: 2px solid #16a34a; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #16a34a; margin: 0 0 1rem 0; text-align: center;">📍 2025年重要価格レベル</h3>
    <ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em; line-height: 1.7;">
      <li>過去の高値・安値（$69K ATH）</li>
      <li>心理的節目（$50K, $75K, $100K）</li>
      <li>移動平均線（MA20, MA50, MA200）</li>
      <li><strong>ETF価格:</strong> IBIT, FBTCのナビ</li>
      <li><strong>オンチェーン指標:</strong> MVRV, SOPR</li>
    </ul>
    <div style="background: #dcfce7; border-radius: 8px; padding: 0.5rem; margin: 0.5rem 0; text-align: center; font-size: 0.8em;">
      Glassnode, CryptoQuantでオンチェーンデータ確認
    </div>
  </div>
  
  <div style="background: #f8fafc; border: 2px solid #f59e0b; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #f59e0b; margin: 0 0 1rem 0; text-align: center;">🧠 2025年市場心理理解</h3>
    <ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em; line-height: 1.7;">
      <li>FOMO（ETF承認でブースト）</li>
      <li>FUD（規制懸念、ハッキング）</li>
      <li>群衆心理（X/Twitterの影響）</li>
      <li><strong>新要素:</strong> AIボットの情報操作</li>
      <li><strong>機関心理:</strong> ESG投資との連動</li>
    </ul>
    <div style="background: #fef3c7; border-radius: 8px; padding: 0.5rem; margin: 0.5rem 0; text-align: center; font-size: 0.8em;">
      Fear & Greed Index, Social Sentimentで測定
    </div>
  </div>
</div>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <h3 style="margin: 0 0 1rem 0; color: #dc2626; text-align: center;">⚠️ 2025年版：チャート分析の限界と新しいリスク</h3>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
    <div style="background: #fef2f2; border-radius: 8px; padding: 1rem; border-left: 4px solid #ef4444;">
      <h4 style="margin: 0 0 0.5rem 0; color: #dc2626;">📊 伝統的な限界</h4>
      <ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
        <li>過去データに基づく分析</li>
        <li>ブラックスワンイベントの予測不可</li>
        <li>ニュースや規制による無効化</li>
        <li>感情的判断の罠</li>
      </ul>
    </div>
    <div style="background: #fdf4ff; border-radius: 8px; padding: 1rem; border-left: 4px solid #a855f7;">
      <h4 style="margin: 0 0 0.5rem 0; color: #9333ea;">🤖 2025年の新リスク</h4>
      <ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
        <li>AIアルゴがパターンを先取り</li>
        <li>ライトニングクラッシュ（瞬間的急落）</li>
        <li>フェイクニュースのAI生成</li>
        <li>オンチェーン指標との乱離</li>
      </ul>
    </div>
  </div>
  <div style="background: #dbeafe; border-radius: 8px; padding: 1rem; margin: 1rem 0; text-align: center;">
    <p style="margin: 0; font-weight: bold; color: #1e40af;">重要：2025年はチャート分析とファンダメンタル分析、オンチェーン指標の組み合わせが必須</p>
  </div>
</div>
        `
      }
    ],
    keyPoints: [
      'ローソク足は始値·高値·安値·終値の4つの価格情報を表示',
      'トレンドは高値·安値の切り上がり/切り下がりで判断',
      'サポート·レジスタンスは重要な売買判断ポイント',
      '出来高は価格変動の信頼性を測る指標',
      '複数の時間軸でトレンドを確認することが重要',
      'チャート分析は確実な予測ツールではなく参考情報'
    ],
    summary: '価格チャートの読み方をマスターすることで、暗号通貨の価格動向をより深く理解できます。ローソク足の基本パターン、トレンドの識別、出来高分析を組み合わせることで、より良い投資判断の基礎を築くことができます。',
    practicalExamples: [
      '2025年BTCチャート実例: $69K ATHから$65K-75Kレンジでのコンソリデーション、ETF承認後の大出来高',
      '2024年ETFローンチ: 機関投資家の大量買いでTradingView上のローソク足パターンが明確に変化',
      'AIアルゴ取引の影響: 1秒間で数百本のローソク足が形成されるマイクロ構造変化',
      'オンチェーン分析例: GlassnodeでMVRV指標が2.5以上でバブル照合、SOPRが1.0以下で底値圧圈判定',
      '2025年リアルタイム例: TradingViewでBTC/USD 4時間足+Whale Alertで大口移動監視+Fear&Greed Indexで市場心理把握',
      '機関投資家動向: MicroStrategyのBTC買い発表後のローソク足パターン変化をBloombergターミナルで確認'
    ],
    warningNotes: [
      '2025年のAI主導市場では伝統的チャートパターンが無効化される場合がある',
      'ライトニングクラッシュ（瞬間的急落）によりストップロスが機能しないリスク',
      'フェイクニュースやAI生成情報による市場操作の危険性',
      '機関投資家の大口取引が個人投資家のチャート分析を無意味化する可能性',
      '短期的なスキャルピングはアルゴリズムに対して不利で危険',
      'オンチェーンデータやファンダメンタル分析との組み合わせなしの単純チャート分析は非常に危険'
    ]
  },
  quiz: [
    {
      id: 'crypto-basics-10-q1',
      question: 'ローソク足の実体部分が表すのは？',
      options: [
        '高値と安値',
        '始値と終値',
        '出来高',
        '時間'
      ],
      correctAnswer: 1,
      explanation: 'ローソク足の実体(胴体部分)は始値と終値の間を表し、その色で上昇(陽線)か下落(陰線)かを示します。'
    },
    {
      id: 'crypto-basics-10-q2',
      question: '上昇トレンドの特徴は？',
      options: [
        '高値と安値が切り下がる',
        '高値と安値が切り上がる',
        '価格が横ばい',
        '出来高が常に少ない'
      ],
      correctAnswer: 1,
      explanation: '上昇トレンドでは、連続する高値と安値がそれぞれ前回よりも高い水準で形成される「切り上がり」パターンが特徴です。'
    },
    {
      id: 'crypto-basics-10-q3',
      question: '価格上昇時に出来高も増加している場合の意味は？',
      options: [
        '弱い上昇シグナル',
        '強い上昇シグナル',
        '下落の前兆',
        '意味はない'
      ],
      correctAnswer: 1,
      explanation: '価格上昇と出来高増加が同時に起こる場合、多くの投資家が買いに参加しており、強い上昇シグナルと判断されます。'
    },
    {
      id: 'crypto-basics-10-q4',
      question: 'サポートライン(支持線)の役割は？',
      options: [
        '価格の上昇を阻む',
        '価格の下落を支える',
        '出来高を調整する',
        '時間を表示する'
      ],
      correctAnswer: 1,
      explanation: 'サポートラインは価格の下落を支える水準で、この付近では買い注文が集中し、価格の下落が止まりやすくなります。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};