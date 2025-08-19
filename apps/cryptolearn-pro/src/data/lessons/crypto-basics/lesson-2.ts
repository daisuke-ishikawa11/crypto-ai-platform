import type { Lesson } from '@/types';

export const lesson2: Lesson = {
  id: 'crypto-basics-2',
  categoryId: 'crypto-basics',
  title: 'Bitcoin: Digital Gold - ビットコインの革命',
  slug: 'bitcoin-digital-gold',
  description: 'ビットコインの誕生背景、革新性、「デジタルゴールド」と呼ばれる理由を深く理解し、2025年の史上最高値更新の意義を学びます。',
  difficultyLevel: 'beginner',
  estimatedMinutes: 22,
  orderIndex: 2,
  content: {
    sections: [
      {
        id: 'section-1',
        title: 'ビットコインの誕生と革命',
        orderIndex: 1,
        type: 'text',
        content: `
<p>2008年10月31日、「サトシ・ナカモト」という謎の人物がビットコインのホワイトペーパーを発表しました。<br/>
これは金融システムに対する根本的な挑戦状であり、人類史上初の分散型デジタル通貨の誕生でした。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2008年金融危機が生んだ革命</h2>

<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #dc2626; display: flex; align-items: center;">💥 リーマンショックの衝撃</h3>
<p style="margin: 0; font-weight: 500; color: #dc2626;">2008年9月15日リーマン・ブラザーズ破綻</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">世界規模の金融危機により、中央集権型金融システムの脆弱性が露呈しました。</p>
</div>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white;">
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">問題点</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">従来システムの限界</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">ビットコインの解決策</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">中央集権リスク</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">銀行破綻で預金者が損失</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">分散型ネットワークで単一障害点を排除</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">通貨発行権の濫用</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">量的緩和による価値希薄化</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">供給量上限2,100万BTCで希少性保証</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">国際送金の制約</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">手数料3-5%、時間2-5営業日</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">手数料0.1%未満、時間10分-1時間</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">金融包摂の欠如</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">14億人が銀行口座なし</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">インターネットさえあれば参加可能</td>
</tr>
</tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">サトシ・ナカモトの革新的洞察</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🔒 二重支払い問題の解決</h3>
    <p style="margin: 0; line-height: 1.6;">暗号学的証明により「デジタル希少性」を世界で初めて実現</p>
  </div>
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">⚔️ ビザンチン将軍問題の克服</h3>
    <p style="margin: 0; line-height: 1.6;">分散環境での合意形成を経済的インセンティブで解決</p>
  </div>
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🛡️ トラストレスシステム</h3>
    <p style="margin: 0; line-height: 1.6;">数学と暗号学により人間や機関への信頼を不要に</p>
  </div>
  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🚫 検閲耐性</h3>
    <p style="margin: 0; line-height: 1.6;">政府や金融機関による取引停止・凍結を技術的に防止</p>
  </div>
</div>

<div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">📜 ホワイトペーパーの核心メッセージ</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af; font-style: italic;">"Bitcoin: A Peer-to-Peer Electronic Cash System"</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">「信頼に基づく金融機関を通じた電子決済は十分に機能しているが、依然として固有の弱点を持つ信頼ベースのモデルの欠点に悩まされている。完全に不可逆的な取引は不可能である。」</p>
</div>
        `
      },
      {
        id: 'section-2',
        title: 'なぜ「デジタルゴールド」なのか',
        orderIndex: 2,
        type: 'text',
        content: `
<p>ビットコインが「デジタルゴールド」と呼ばれるのは偶然ではありません。<br/>
金が数千年にわたって価値保存手段として機能してきた特性を、デジタル世界で実現したからです。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">金 vs ビットコイン 徹底比較</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: linear-gradient(90deg, #f59e0b 0%, #d97706 100%); color: white;">
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">特性</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">🏆 金</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">₿ ビットコイン</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">希少性</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">限定的な埋蔵量</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">2,100万BTC上限（厳密）</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">耐久性</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">腐食しない</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">デジタル不変性</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">分割可能性</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">物理的制限あり</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">1億分の1まで分割可能</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">携帯性</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">重く運搬困難</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">デジタルで瞬時移転</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">検証可能性</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">専門技術必要</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">数学的証明</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">価値保存歴史</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">数千年の実績</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">16年の実績（2009年〜）</td>
</tr>
<tr style="background: #dcfce7; font-weight: bold;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">2025年時価総額</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">約2,400兆円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">約617兆円</td>
</tr>
</tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">ビットコインが金を上回る革新的特性</h2>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">⏰ 24時間365日取引可能</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">金市場の営業時間制限なし、世界中でいつでも取引</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">⚡ 瞬時のグローバル移転</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">物理的な輸送や保管コスト不要、数分で世界中に送金</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">💻 プログラム可能なお金</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">スマートコントラクトとの組み合わせで自動化可能</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🔍 完全な分割可能性</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">1 Satoshi（0.00000001 BTC）まで分割、少額決済も対応</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🧮 数学的証明</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">偽造や品質の不確実性なし、暗号学的に保証</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🛡️ 没収耐性</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">適切な管理下では政府でも強制収用困難</p>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">「デジタルゴールド」としての進化段階</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white;">
<th style="padding: 15px; border: 1px solid #ddd; text-align: center;">段階</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center;">期間</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center;">特徴</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center;">主な用途</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: bold;">実験段階</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">2009-2012</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">概念実証、技術者中心</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">P2P決済実験</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: bold;">投機段階</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">2013-2017</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">価格急騰、一般認知拡大</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">投機的取引</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: bold;">制度化段階</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">2018-2023</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">規制整備、企業参入</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">価値保存手段</td>
</tr>
<tr style="background: #dcfce7; font-weight: bold;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">成熟段階</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">2024-現在</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">ETF承認、史上最高値更新</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">機関投資家ポートフォリオ資産</td>
</tr>
</tbody>
</table>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 2025年の重要トレンド</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">ビットコイン史上最高値124,496ドル達成</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">2025年8月14日に記録された史上最高値は、デジタルゴールドとしての地位を確立し、金の時価総額の約25%に到達する勢いを示しています。</p>
</div>
        `
      },
      {
        id: 'section-3',
        title: 'ビットコインの技術的特徴と2025年の進歩',
        orderIndex: 3,
        type: 'text',
        content: `
<p>ビットコインの技術仕様は、16年間の運用実績により世界最高レベルのセキュリティを実現しています。<br/>
2025年現在の技術的進歩と最新データを詳しく見てみましょう。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">主要技術仕様（2025年更新版）</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white;">
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">項目</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">仕様</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">説明</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">ブロック生成時間</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">約10分</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">新しいブロックが作られる一定間隔</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">最大供給量</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">21,000,000 BTC</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">発行される総量の絶対上限</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">半減期</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">約4年ごと</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">マイニング報酬が半分になる周期</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">最小単位</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">1 Satoshi</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">0.00000001 BTC（1億分の1）</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">コンセンサス</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">Proof of Work</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">計算力による合意形成方式</td>
</tr>
<tr style="background: #dcfce7; font-weight: bold;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">現在の報酬</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">3.125 BTC/ブロック</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">2024年4月半減期後の報酬</td>
</tr>
</tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年セキュリティ最新データ</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%); color: white;">
<th style="padding: 15px; border: 1px solid #ddd; text-align: center;">セキュリティ要素</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center;">2025年8月現在</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center;">保護機能</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">ハッシュ関数</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">SHA-256</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">改ざん検知・防止</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">ネットワーク計算力</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">約750 EH/s</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">世界最大級のセキュリティ</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">フルノード数</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">約18,000台</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">分散化による冗長性</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">51%攻撃コスト</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">約400億ドル/日</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">攻撃への経済的抑制</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">稼働時間</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">99.99%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">16年間でダウンタイム数時間のみ</td>
</tr>
</tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">取引プロセスの詳細フロー</h2>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem;">
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
      <div style="background: #3b82f6; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">1</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #1e40af;">取引作成</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">ユーザーがウォレットで送金情報を入力</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
      <div style="background: #f59e0b; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">2</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #d97706;">デジタル署名</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">秘密鍵で取引に暗号学的署名を付与</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #16a34a;">
      <div style="background: #16a34a; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">3</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #16a34a;">ネットワーク配信</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">P2Pネットワークを通じて世界中のノードに伝播</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #fdf4ff; border-radius: 8px; border-left: 4px solid #a855f7;">
      <div style="background: #a855f7; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">4</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #9333ea;">検証プロセス</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">ノードが残高・署名・形式の正当性を確認</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #fef2f2; border-radius: 8px; border-left: 4px solid #ef4444;">
      <div style="background: #ef4444; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">5</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #dc2626;">メモリプール</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">有効な取引が未処理プールに蓄積</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #f8fafc; border-radius: 8px; border-left: 4px solid #64748b;">
      <div style="background: #64748b; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">6</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #475569;">マイニング・ブロック生成</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">マイナーが手数料の高い取引を優先的にブロックに含め、約10分間隔でチェーンに追加</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #ecfdf5; border-radius: 8px; border-left: 4px solid #22c55e;">
      <div style="background: #22c55e; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">7</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #15803d;">承認数確認</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">6承認（約1時間）で取引が事実上不可逆となる</p>
      </div>
    </div>
    
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年マイニング経済モデル</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #1e40af; margin: 0 0 1rem 0; display: flex; align-items: center;">💰 収益構造</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>ブロック報酬：</strong> 3.125 BTC（2024年4月半減期後）</li>
      <li><strong>取引手数料：</strong> 0.001-0.01 BTC（混雑度による）</li>
      <li><strong>次回半減期：</strong> 2028年頃（報酬1.5625 BTCに）</li>
    </ul>
  </div>
  
  <div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #059669; margin: 0 0 1rem 0; display: flex; align-items: center;">⚙️ 自動調整機能</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>難易度調整：</strong> 2,016ブロック（約2週間）ごと</li>
      <li><strong>目標時間：</strong> 10分間隔を自動維持</li>
      <li><strong>調整範囲：</strong> 前期間の75%-400%で制限</li>
    </ul>
  </div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">🔧 技術的堅牢性</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">16年間の連続稼働実績</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">ビットコインネットワークは2009年以来、99.99%の稼働率を維持し、ハッキングや改ざんが一度も発生していない世界最高レベルのセキュリティシステムです。</p>
</div>
        `
      },
      {
        id: 'section-4',
        title: '2025年の史上最高値更新と機関投資家革命',
        orderIndex: 4,
        type: 'text',
        content: `
<p>2024年のETF承認に続き、2025年8月にビットコインは史上最高値124,496ドルを記録しました。<br/>
これは機関投資家の本格的参入により、ビットコインが真の主流資産として確立されたことを示しています。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年8月の歴史的達成</h2>

<div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
  <div style="text-align: center;">
    <h3 style="margin: 0 0 1rem 0; color: #059669; font-size: 2em;">🚀 史上最高値達成</h3>
    <div style="background: white; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 3em; font-weight: bold; color: #059669;">$124,496</p>
      <p style="margin: 0.5rem 0 0 0; color: #374151; font-size: 1.2em;">2025年8月14日記録</p>
    </div>
    <p style="margin: 0; color: #374151;">前回の最高値$73,737（2021年11月）を約69%上回る歴史的水準</p>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">承認されたビットコインETF一覧</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white;">
<th style="padding: 15px; border: 1px solid #ddd; text-align: center;">ETFシンボル</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center;">運用会社</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center;">2025年8月残高</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center;">特徴</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: bold;">IBIT</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">BlackRock</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">約420億ドル</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">世界最大の資産運用会社</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: bold;">FBTC</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">Fidelity</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">約280億ドル</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">伝統的な投資信託大手</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: bold;">ARKB</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">ARK 21Shares</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">約85億ドル</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">革新的技術投資に特化</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: bold;">GBTC</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">Grayscale</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">約195億ドル</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">信託から変換された先駆者</td>
</tr>
<tr style="background: #dcfce7; font-weight: bold;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">合計</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">全11ファンド</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">約1,200億ドル</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">機関投資家の本格参入</td>
</tr>
</tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年市場への革命的影響</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">💼 機関投資家の大量参入</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">年金基金・保険会社・大学基金がポートフォリオに正式組み入れ</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">📈 価格安定性向上</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">大規模な資金流入により日次変動率が約60%減少</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">✅ 規制承認</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">SECによる正式な資産クラス認定で制度的地位確立</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🌐 アクセス民主化</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">従来の証券口座でビットコイン投資が日常的に</p>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">ETF資金流入の驚異的データ</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: linear-gradient(90deg, #059669 0%, #047857 100%); color: white;">
<th style="padding: 15px; border: 1px solid #ddd; text-align: center;">期間</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center;">月間流入額</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center;">累積残高</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center;">市場インパクト</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">2024年1月</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">460億ドル</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">460億ドル</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">価格40%上昇</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">2024年上半期</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">320億ドル</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">780億ドル</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">史上最高値更新</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">2024年下半期</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">280億ドル</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">1,060億ドル</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">機関投資家本格参入</td>
</tr>
<tr style="background: #dcfce7; font-weight: bold;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">2025年1-8月</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">140億ドル</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">1,200億ドル</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">史上最高値124,496ドル達成</td>
</tr>
</tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">企業の戦略的ビットコイン保有状況</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: linear-gradient(90deg, #f59e0b 0%, #d97706 100%); color: white;">
<th style="padding: 15px; border: 1px solid #ddd; text-align: center;">企業</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center;">保有量（BTC）</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center;">2025年8月評価額</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center;">戦略的位置づけ</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: bold;">MicroStrategy</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">約226,500</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">約282億ドル</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">主要資産として積極保有</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: bold;">Tesla</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">約40,000</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">約50億ドル</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">資産多様化・インフレヘッジ</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: bold;">Marathon Digital</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">約26,200</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">約33億ドル</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">マイニング収益の長期保有</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: bold;">Block (Square)</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">約8,027</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">約10億ドル</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">決済サービス強化</td>
</tr>
</tbody>
</table>

<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #7c3aed; display: flex; align-items: center;">🌍 長期的パラダイムシフト</h3>
<p style="margin: 0; font-weight: 500; color: #7c3aed;">ビットコインの制度的採用完了</p>
<ul style="margin: 0.5rem 0 0 0; padding-left: 1.5rem; color: #374151;">
  <li>世代間資産移転（68兆ドル）がデジタル資産に流入開始</li>
  <li>新興国でのビットコイン準備資産化が加速</li>
  <li>ライトニングネットワークによる日常決済インフラ完成</li>
  <li>DeFiエコシステムでビットコインが基軸資産として確立</li>
</ul>
</div>
        `
      }
    ],
    keyPoints: [
      'ビットコインは2008年金融危機への回答として誕生した革命的分散型デジタル通貨',
      '供給量上限2,100万BTCにより絶対的希少性を保持し、インフレ耐性を実現',
      '金と同様の価値保存特性を持つ「デジタルゴールド」として16年間の実績を構築',
      '分散型ネットワークにより政府の介入を防止、99.99%の稼働率を維持',
      '2025年8月に史上最高値124,496ドルを記録、ETF経由で約1,200億ドルの資金流入',
      'Proof of Workにより世界最高レベルのセキュリティ（750 EH/s）を確保'
    ],
    summary: 'ビットコインは2008年金融危機を背景に誕生した史上初の分散型デジタル通貨です。供給量上限と希少性により「デジタルゴールド」と呼ばれ、2024年のETF承認と2025年8月の史上最高値124,496ドル達成により機関投資家の参入が本格化し、新たな主流資産クラスとして確立されました。16年間の連続稼働実績と世界最高レベルのセキュリティにより、価値保存手段としての地位を不動のものにしています。',
    practicalExamples: [
      '価格推移: 2009年$0.01 → 2021年$73,737 → 2025年8月$124,496（史上最高値）',
      '時価総額: 約617兆円（2025年8月現在、金の時価総額約2,400兆円の約25%）',
      'ETF資金流入: 2024年1月開始から2025年8月まで累計約1,200億ドル',
      '企業保有例: MicroStrategy約226,500BTC（約282億ドル）、Tesla約40,000BTC保有',
      'セキュリティ実績: 16年間稼働率99.99%、ハッキング・改ざん被害ゼロ',
      'ネットワーク規模: 計算力750 EH/s、51%攻撃コスト約400億ドル/日'
    ],
    warningNotes: [
      '価格変動リスク: 2025年でも日次変動10-20%の可能性があり、投資は余剰資金で行う',
      'マイニングエネルギー: 電力消費が大きく、環境問題の議論が継続中',
      '規制リスク: 各国政府の規制変更により価格が大きく影響を受ける可能性',
      '取引不可逆性: 誤送金や詐欺被害の場合、資産回復が技術的に不可能',
      '秘密鍵管理: セルフカストディでは紛失・盗難により永久にアクセス不可',
      '技術リスク: 量子コンピューターの発達により将来的に暗号が破られる可能性',
      '税務複雑性: 暗号通貨の税務処理が複雑で、適切な申告が必要'
    ]
  },
  quiz: [
    {
      id: 'crypto-basics-2-q1',
      question: '2025年8月にビットコインが記録した史上最高値はいくらですか？',
      options: [
        '$73,737',
        '$100,000',
        '$124,496',
        '$150,000'
      ],
      correctAnswer: 2,
      explanation: '2025年8月14日にビットコインは史上最高値$124,496を記録しました。これは前回の最高値$73,737（2021年11月）を約69%上回る歴史的水準です。'
    },
    {
      id: 'crypto-basics-2-q2',
      question: 'ビットコインが「デジタルゴールド」と呼ばれる最も重要な理由は？',
      options: [
        '金色に見えるから',
        '政府が発行しているから',
        '供給量上限による希少性と価値保存特性',
        '物理的に金でできているから'
      ],
      correctAnswer: 2,
      explanation: 'ビットコインは2,100万BTC という供給量上限があり、金と同様の希少性と価値保存特性を持つため「デジタルゴールド」と呼ばれています。16年間の稼働実績がこの特性を証明しています。'
    },
    {
      id: 'crypto-basics-2-q3',
      question: '2025年現在、ビットコインETFの累積資金流入額は約いくらですか？',
      options: [
        '約200億ドル',
        '約600億ドル',
        '約1,200億ドル',
        '約2,000億ドル'
      ],
      correctAnswer: 2,
      explanation: '2024年1月のETF承認開始から2025年8月まで、ビットコインETFには累計約1,200億ドルの資金が流入しており、機関投資家の本格的参入を示しています。'
    },
    {
      id: 'crypto-basics-2-q4',
      question: '2025年現在のビットコインネットワークの計算力は約どれくらいですか？',
      options: [
        '約100 EH/s',
        '約300 EH/s',
        '約750 EH/s',
        '約1,000 EH/s'
      ],
      correctAnswer: 2,
      explanation: '2025年8月現在、ビットコインネットワークの計算力は約750 EH/s（エクサハッシュ/秒）に達しており、これは世界最大級のセキュリティレベルを提供しています。'
    },
    {
      id: 'crypto-basics-2-q5',
      question: '2024年4月の半減期後、現在のブロック報酬は何BTCですか？',
      options: [
        '6.25 BTC',
        '3.125 BTC',
        '1.5625 BTC',
        '12.5 BTC'
      ],
      correctAnswer: 1,
      explanation: '2024年4月の半減期により、ビットコインのブロック報酬は6.25 BTCから3.125 BTCに半減しました。次回の半減期は2028年頃で、その時は1.5625 BTCになる予定です。'
    },
    {
      id: 'crypto-basics-2-q6',
      question: 'ビットコインの技術的堅牢性を示す最も重要な指標は？',
      options: [
        '価格の高さ',
        '16年間99.99%の稼働率とハッキング被害ゼロ',
        'マイニング企業の数',
        '取引手数料の安さ'
      ],
      correctAnswer: 1,
      explanation: 'ビットコインは2009年以来16年間、99.99%の稼働率を維持し、ネットワークレベルでのハッキングや改ざんが一度も発生していません。これが世界最高レベルのセキュリティシステムである証拠です。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};