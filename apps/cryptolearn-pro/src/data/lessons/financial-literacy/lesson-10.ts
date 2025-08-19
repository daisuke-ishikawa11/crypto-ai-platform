import type { Lesson } from '../../../types';

export const lesson10: Lesson = {
  id: 'financial-literacy-products-features',
  categoryId: 'financial-literacy',
  title: '金融商品の種類と特徴',
  slug: 'financial-products-features',
  description: '株式、債券、投資信託、ETF、REIT、デリバティブなど、様々な金融商品の特徴とリスク・リターンを理解し、適切な商品選択ができるようになります',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 50,
  orderIndex: 10,
  isPublished: true,
  tags: ['金融リテラシー', '金融商品', '投資商品', 'ポートフォリオ'],
  
  content: {
    sections: [
      {
        type: 'text',
        title: '伝統的金融商品の基本',
        content: `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 24px; border-radius: 12px; color: white; margin-bottom: 24px;">
  <h2 style="margin: 0 0 16px 0; font-size: 28px;">金融商品の体系的理解</h2>
  <p style="margin: 0; font-size: 18px; opacity: 0.95;">リスク・リターン特性と投資目的に応じた商品選択</p>
</div>

<div style="background: #f8fafc; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 8px;">
  <h3 style="margin-top: 0; color: #334155;">🎯 金融商品の分類と特性</h3>
  <ul style="color: #475569; line-height: 1.8;">
    <li><strong>資産クラス</strong>：株式、債券、不動産、コモディティ、現金等価物</li>
    <li><strong>リスク特性</strong>：価格変動リスク、信用リスク、流動性リスク</li>
    <li><strong>収益源泉</strong>：キャピタルゲイン、インカムゲイン、両方の組み合わせ</li>
    <li><strong>投資期間</strong>：短期（1年未満）、中期（1-5年）、長期（5年超）</li>
  </ul>
</div>

<h3 style="color: #1e293b; margin-top: 32px; margin-bottom: 16px;">1. 株式（エクイティ）</h3>

<div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
  <h4 style="color: #475569; margin-top: 0;">株式投資の特徴とリスク・リターン</h4>
  
  <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
    <thead>
      <tr style="background: #f1f5f9;">
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">種類</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">特徴</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">期待リターン</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">リスクレベル</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">大型株</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">時価総額5000億円以上</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">年率5-7%</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #0891b2;">中</td>
      </tr>
      <tr style="background: #fafafa;">
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">中小型株</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">成長性重視</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">年率8-15%</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #dc2626;">高</td>
      </tr>
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">高配当株</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">配当利回り3%以上</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">年率4-6%</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #059669;">低-中</td>
      </tr>
      <tr style="background: #fafafa;">
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">新興国株</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">高成長・高ボラティリティ</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">年率10-20%</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #dc2626;">最高</td>
      </tr>
    </tbody>
  </table>
</div>

<h3 style="color: #1e293b; margin-top: 32px; margin-bottom: 16px;">2. 債券（固定収益証券）</h3>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin: 20px 0;">
  <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 20px; border-radius: 12px; color: white;">
    <h4 style="margin-top: 0; margin-bottom: 12px;">📈 国債</h4>
    <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
      <li>安全性：最高（ソブリンリスクのみ）</li>
      <li>利回り：0.1-1.5%（日本国債）</li>
      <li>期間：2年、5年、10年、20年、30年、40年</li>
      <li>最低投資額：1万円〜</li>
    </ul>
  </div>
  
  <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 20px; border-radius: 12px; color: white;">
    <h4 style="margin-top: 0; margin-bottom: 12px;">🏢 社債</h4>
    <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
      <li>安全性：企業格付けに依存</li>
      <li>利回り：0.3-5%（格付けによる）</li>
      <li>投資適格債：BBB格以上</li>
      <li>ハイイールド債：BB格以下</li>
    </ul>
  </div>
  
  <div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); padding: 20px; border-radius: 12px; color: white;">
    <h4 style="margin-top: 0; margin-bottom: 12px;">🌍 外国債券</h4>
    <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
      <li>為替リスクあり/なし選択可</li>
      <li>先進国債：米国債2-4%</li>
      <li>新興国債：5-10%</li>
      <li>通貨分散効果</li>
    </ul>
  </div>
</div>

<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; margin: 24px 0;">
  <h4 style="color: #92400e; margin-top: 0;">⚠️ 債券投資の重要な注意点</h4>
  <p style="color: #78350f; margin: 8px 0;">債券価格と金利の逆相関関係を理解することが重要です：</p>
  <ul style="color: #92400e; margin: 8px 0; padding-left: 24px;">
    <li>金利上昇時：債券価格は下落（既存債券の魅力低下）</li>
    <li>金利低下時：債券価格は上昇（既存債券の魅力向上）</li>
    <li>デュレーション：金利感応度の指標（長期債ほど高い）</li>
    <li>信用スプレッド：国債との利回り差が信用リスクを反映</li>
  </ul>
</div>`
      },
      {
        type: 'text',
        title: '投資信託とETF',
        content: `<div style="background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); padding: 24px; border-radius: 12px; color: white; margin-bottom: 24px;">
  <h2 style="margin: 0 0 16px 0; font-size: 28px;">パッケージ型投資商品の活用</h2>
  <p style="margin: 0; font-size: 18px; opacity: 0.95;">分散投資と専門運用のメリットを享受</p>
</div>

<h3 style="color: #1e293b; margin-top: 32px; margin-bottom: 16px;">1. 投資信託（ミューチュアルファンド）</h3>

<div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
  <h4 style="color: #475569; margin-top: 0;">投資信託の種類と特徴比較</h4>
  
  <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
    <thead>
      <tr style="background: #f1f5f9;">
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">種類</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">運用方針</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">手数料</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">特徴</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">インデックス型</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">指数連動</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #059669;">0.1-0.5%</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">低コスト・市場平均</td>
      </tr>
      <tr style="background: #fafafa;">
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">アクティブ型</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">市場超過収益狙い</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #dc2626;">1.0-2.5%</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">高コスト・超過収益狙い</td>
      </tr>
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">バランス型</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">複数資産配分</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #0891b2;">0.5-1.5%</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">自動リバランス</td>
      </tr>
      <tr style="background: #fafafa;">
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">ターゲットデート型</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">年齢連動配分</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #0891b2;">0.5-1.0%</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">自動的にリスク低減</td>
      </tr>
    </tbody>
  </table>
</div>

<h3 style="color: #1e293b; margin-top: 32px; margin-bottom: 16px;">2. ETF（上場投資信託）</h3>

<div style="background: #f8fafc; border-left: 4px solid #ec4899; padding: 20px; margin: 20px 0; border-radius: 8px;">
  <h3 style="margin-top: 0; color: #334155;">📊 ETFの優位性</h3>
  <ul style="color: #475569; line-height: 1.8;">
    <li><strong>リアルタイム取引</strong>：市場時間中いつでも売買可能（投資信託は1日1回）</li>
    <li><strong>低コスト</strong>：経費率0.03-0.20%（インデックス投信より更に低い）</li>
    <li><strong>透明性</strong>：日中の価格変動が確認可能</li>
    <li><strong>税効率</strong>：分配金の再投資で複利効果</li>
    <li><strong>最低投資額</strong>：1口から購入可能（数千円〜）</li>
  </ul>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin: 20px 0;">
  <div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 12px; padding: 20px;">
    <h4 style="color: #1e40af; margin-top: 0;">💹 国内ETF</h4>
    <ul style="color: #1e3a8a; margin: 8px 0; padding-left: 20px;">
      <li>TOPIX連動ETF（1306）</li>
      <li>日経225連動ETF（1321）</li>
      <li>JPX日経400ETF（1599）</li>
      <li>J-REIT ETF（1343）</li>
      <li>金価格連動ETF（1540）</li>
    </ul>
  </div>
  
  <div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 12px; padding: 20px;">
    <h4 style="color: #15803d; margin-top: 0;">🌏 海外ETF</h4>
    <ul style="color: #166534; margin: 8px 0; padding-left: 20px;">
      <li>S&P500（VOO、SPY）</li>
      <li>全世界株式（VT）</li>
      <li>新興国株式（VWO）</li>
      <li>米国債券（AGG、BND）</li>
      <li>高配当株式（VYM、HDV）</li>
    </ul>
  </div>
</div>

<h3 style="color: #1e293b; margin-top: 32px; margin-bottom: 16px;">3. 投資信託 vs ETF 選択ガイド</h3>

<div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
  <table style="width: 100%; border-collapse: collapse;">
    <thead>
      <tr style="background: #f1f5f9;">
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">項目</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">投資信託</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">ETF</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">購入方法</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">金額指定可能</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">口数単位のみ</td>
      </tr>
      <tr style="background: #fafafa;">
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">積立投資</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #059669;">◎ 100円から自動積立</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #0891b2;">△ 手動積立が必要</td>
      </tr>
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">売買手数料</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">ノーロード多数</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">売買手数料必要</td>
      </tr>
      <tr style="background: #fafafa;">
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">分配金再投資</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #059669;">◎ 自動再投資</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #dc2626;">× 手動再投資</td>
      </tr>
    </tbody>
  </table>
</div>`
      },
      {
        type: 'text',
        title: 'REIT（不動産投資信託）',
        content: `<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); padding: 24px; border-radius: 12px; color: white; margin-bottom: 24px;">
  <h2 style="margin: 0 0 16px 0; font-size: 28px;">不動産投資の民主化</h2>
  <p style="margin: 0; font-size: 18px; opacity: 0.95;">少額から不動産投資のメリットを享受</p>
</div>

<h3 style="color: #1e293b; margin-top: 32px; margin-bottom: 16px;">1. J-REITの基本構造</h3>

<div style="background: #f8fafc; border-left: 4px solid #06b6d4; padding: 20px; margin: 20px 0; border-radius: 8px;">
  <h3 style="margin-top: 0; color: #334155;">🏢 REITの仕組み</h3>
  <ul style="color: #475569; line-height: 1.8;">
    <li><strong>投資法人形式</strong>：不動産を保有・運用する特別な法人</li>
    <li><strong>収益分配</strong>：利益の90%以上を分配すれば法人税非課税</li>
    <li><strong>プロ運用</strong>：不動産運用会社が物件選定・管理</li>
    <li><strong>流動性確保</strong>：東証REIT市場で日々売買可能</li>
    <li><strong>少額投資</strong>：数万円から不動産投資が可能</li>
  </ul>
</div>

<h3 style="color: #1e293b; margin-top: 32px; margin-bottom: 16px;">2. REITの種類と特徴</h3>

<div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
  <table style="width: 100%; border-collapse: collapse;">
    <thead>
      <tr style="background: #f1f5f9;">
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">種類</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">投資対象</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">分配金利回り</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">特徴</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">オフィス特化型</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">オフィスビル</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">3-4%</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">景気感応度高</td>
      </tr>
      <tr style="background: #fafafa;">
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">住宅特化型</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">賃貸マンション</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">3.5-4.5%</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">安定性高</td>
      </tr>
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">商業施設型</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">ショッピングセンター</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">4-5%</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">長期契約多</td>
      </tr>
      <tr style="background: #fafafa;">
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">物流施設型</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">物流センター</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">3.5-4%</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">EC成長で需要増</td>
      </tr>
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">ホテル型</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">ホテル・旅館</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">4-6%</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">変動賃料多</td>
      </tr>
      <tr style="background: #fafafa;">
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">総合型</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">複数用途</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">3.5-4.5%</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">分散効果</td>
      </tr>
    </tbody>
  </table>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin: 20px 0;">
  <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 20px; border-radius: 12px; color: white;">
    <h4 style="margin-top: 0; margin-bottom: 12px;">✅ REITのメリット</h4>
    <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
      <li>安定的な分配金収入</li>
      <li>インフレヘッジ効果</li>
      <li>不動産管理の手間なし</li>
      <li>分散投資が容易</li>
      <li>相続時の評価額有利</li>
    </ul>
  </div>
  
  <div style="background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); padding: 20px; border-radius: 12px; color: white;">
    <h4 style="margin-top: 0; margin-bottom: 12px;">⚠️ REITのリスク</h4>
    <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
      <li>金利上昇リスク</li>
      <li>空室リスク</li>
      <li>災害リスク</li>
      <li>価格変動リスク</li>
      <li>分配金減少リスク</li>
    </ul>
  </div>
</div>`
      },
      {
        type: 'text',
        title: 'デリバティブとオルタナティブ投資',
        content: `<div style="background: linear-gradient(135deg, #f43f5e 0%, #ec4899 100%); padding: 24px; border-radius: 12px; color: white; margin-bottom: 24px;">
  <h2 style="margin: 0 0 16px 0; font-size: 28px;">高度な金融商品の理解</h2>
  <p style="margin: 0; font-size: 18px; opacity: 0.95;">リスクヘッジと収益機会の拡大</p>
</div>

<h3 style="color: #1e293b; margin-top: 32px; margin-bottom: 16px;">1. デリバティブ（金融派生商品）</h3>

<div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 12px; padding: 20px; margin: 20px 0;">
  <h4 style="color: #991b1b; margin-top: 0;">🚨 デリバティブ取引の注意</h4>
  <p style="color: #7f1d1d; margin: 8px 0;">デリバティブは高度な金融商品です。十分な知識と経験が必要です：</p>
  <ul style="color: #991b1b; margin: 8px 0; padding-left: 24px;">
    <li>レバレッジ効果により損失が拡大する可能性</li>
    <li>証拠金以上の損失が発生する場合がある</li>
    <li>専門的な知識が必要</li>
    <li>初心者は避けるべき商品</li>
  </ul>
</div>

<div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
  <h4 style="color: #475569; margin-top: 0;">主要デリバティブ商品</h4>
  
  <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
    <thead>
      <tr style="background: #f1f5f9;">
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">商品</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">概要</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">用途</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">リスク</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">先物取引</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">将来の売買約束</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">ヘッジ・投機</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #dc2626;">極高</td>
      </tr>
      <tr style="background: #fafafa;">
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">オプション</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">売買の権利</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">保険・収益追求</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #dc2626;">高</td>
      </tr>
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">CFD</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">差金決済取引</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">短期売買</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #dc2626;">極高</td>
      </tr>
      <tr style="background: #fafafa;">
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">FX</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">外国為替証拠金</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">為替ヘッジ・投機</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #dc2626;">極高</td>
      </tr>
    </tbody>
  </table>
</div>

<h3 style="color: #1e293b; margin-top: 32px; margin-bottom: 16px;">2. オルタナティブ投資</h3>

<div style="background: #f8fafc; border-left: 4px solid #f43f5e; padding: 20px; margin: 20px 0; border-radius: 8px;">
  <h3 style="margin-top: 0; color: #334155;">🎯 伝統的資産以外の投資対象</h3>
  <p style="color: #475569; line-height: 1.8;">株式・債券以外の投資対象で、ポートフォリオの分散効果を高めます：</p>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin: 20px 0;">
  <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 12px; padding: 20px;">
    <h4 style="color: #92400e; margin-top: 0;">🏛️ 実物資産</h4>
    <ul style="color: #78350f; margin: 8px 0; padding-left: 20px;">
      <li>金・プラチナ（現物・ETF）</li>
      <li>不動産（現物・REIT）</li>
      <li>美術品・骨董品</li>
      <li>ワイン・ウイスキー</li>
      <li>クラシックカー</li>
    </ul>
  </div>
  
  <div style="background: #e0e7ff; border: 1px solid #6366f1; border-radius: 12px; padding: 20px;">
    <h4 style="color: #4338ca; margin-top: 0;">💼 プライベート投資</h4>
    <ul style="color: #3730a3; margin: 8px 0; padding-left: 20px;">
      <li>未上場株式（PE）</li>
      <li>ベンチャー投資（VC）</li>
      <li>クラウドファンディング</li>
      <li>ソーシャルレンディング</li>
      <li>私募債・私募REIT</li>
    </ul>
  </div>
  
  <div style="background: #fce7f3; border: 1px solid #ec4899; border-radius: 12px; padding: 20px;">
    <h4 style="color: #be185d; margin-top: 0;">🔄 ヘッジファンド戦略</h4>
    <ul style="color: #9f1239; margin: 8px 0; padding-left: 20px;">
      <li>ロング・ショート</li>
      <li>マーケットニュートラル</li>
      <li>アービトラージ</li>
      <li>イベントドリブン</li>
      <li>グローバルマクロ</li>
    </ul>
  </div>
</div>`
      },
      {
        type: 'text',
        title: '暗号資産と新しい金融商品',
        content: `<div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 24px; border-radius: 12px; color: white; margin-bottom: 24px;">
  <h2 style="margin: 0 0 16px 0; font-size: 28px;">デジタル時代の新金融商品</h2>
  <p style="margin: 0; font-size: 18px; opacity: 0.95;">ブロックチェーン技術が生み出す投資機会</p>
</div>

<h3 style="color: #1e293b; margin-top: 32px; margin-bottom: 16px;">1. 暗号資産（仮想通貨）</h3>

<div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
  <h4 style="color: #475569; margin-top: 0;">主要暗号資産の特徴</h4>
  
  <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
    <thead>
      <tr style="background: #f1f5f9;">
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">名称</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">時価総額順位</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">特徴</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">ボラティリティ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Bitcoin（BTC）</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">1位</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">デジタルゴールド</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #dc2626;">高（50-80%）</td>
      </tr>
      <tr style="background: #fafafa;">
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Ethereum（ETH）</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">2位</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">スマートコントラクト</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #dc2626;">高（60-90%）</td>
      </tr>
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Stablecoin（USDT等）</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">3-5位</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">価格安定型</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #059669;">低（1-3%）</td>
      </tr>
      <tr style="background: #fafafa;">
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">アルトコイン</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">6位以下</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">特定用途特化</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #dc2626;">極高（100%+）</td>
      </tr>
    </tbody>
  </table>
</div>

<h3 style="color: #1e293b; margin-top: 32px; margin-bottom: 16px;">2. DeFi（分散型金融）商品</h3>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin: 20px 0;">
  <div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); padding: 20px; border-radius: 12px; color: white;">
    <h4 style="margin-top: 0; margin-bottom: 12px;">💰 イールドファーミング</h4>
    <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
      <li>流動性提供で報酬獲得</li>
      <li>APY 5-50%（変動大）</li>
      <li>インパーマネントロス有</li>
      <li>スマートコントラクトリスク</li>
    </ul>
  </div>
  
  <div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); padding: 20px; border-radius: 12px; color: white;">
    <h4 style="margin-top: 0; margin-bottom: 12px;">🔐 ステーキング</h4>
    <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
      <li>トークンロックで報酬</li>
      <li>APY 4-20%（安定的）</li>
      <li>ロック期間あり</li>
      <li>スラッシングリスク</li>
    </ul>
  </div>
  
  <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 20px; border-radius: 12px; color: white;">
    <h4 style="margin-top: 0; margin-bottom: 12px;">📊 レンディング</h4>
    <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
      <li>暗号資産の貸付</li>
      <li>APY 2-12%</li>
      <li>カウンターパーティリスク</li>
      <li>プラットフォームリスク</li>
    </ul>
  </div>
</div>

<h3 style="color: #1e293b; margin-top: 32px; margin-bottom: 16px;">3. NFTとトークン化資産</h3>

<div style="background: #f8fafc; border-left: 4px solid #f97316; padding: 20px; margin: 20px 0; border-radius: 8px;">
  <h3 style="margin-top: 0; color: #334155;">🎨 新しい資産クラス</h3>
  <ul style="color: #475569; line-height: 1.8;">
    <li><strong>NFTアート</strong>：デジタルアートの所有権証明（価格変動極大）</li>
    <li><strong>ゲームアセット</strong>：Play-to-Earnゲーム内資産</li>
    <li><strong>メタバース不動産</strong>：仮想空間の土地所有権</li>
    <li><strong>音楽・動画NFT</strong>：クリエイター支援と収益分配</li>
    <li><strong>実物資産トークン</strong>：不動産・美術品の分割所有</li>
  </ul>
</div>

<div style="background: #fee2e2; border: 2px solid #ef4444; border-radius: 12px; padding: 20px; margin: 24px 0;">
  <h4 style="color: #991b1b; margin-top: 0;">⚠️ 暗号資産投資の重要な注意点</h4>
  <ul style="color: #7f1d1d; margin: 8px 0; padding-left: 24px;">
    <li><strong>極めて高いボラティリティ</strong>：1日で20-30%の価格変動は普通</li>
    <li><strong>規制リスク</strong>：各国の規制変更により価格が大きく変動</li>
    <li><strong>技術的リスク</strong>：ハッキング、秘密鍵紛失で資産喪失</li>
    <li><strong>詐欺リスク</strong>：ラグプル、ポンジスキームが多発</li>
    <li><strong>税務の複雑性</strong>：雑所得として総合課税（最大55%）</li>
    <li><strong>投資は余剰資金の5-10%以内に抑える</strong></li>
  </ul>
</div>`
      },
      {
        type: 'text',
        title: 'ポートフォリオ構築の実践',
        content: `<div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 24px; border-radius: 12px; color: white; margin-bottom: 24px;">
  <h2 style="margin: 0 0 16px 0; font-size: 28px;">最適な商品組み合わせの設計</h2>
  <p style="margin: 0; font-size: 18px; opacity: 0.95;">リスク許容度と投資目的に応じた資産配分</p>
</div>

<h3 style="color: #1e293b; margin-top: 32px; margin-bottom: 16px;">1. 年代別モデルポートフォリオ</h3>

<div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
  <h4 style="color: #475569; margin-top: 0;">ライフステージに応じた資産配分</h4>
  
  <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
    <thead>
      <tr style="background: #f1f5f9;">
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">年代</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">株式</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">債券</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">REIT</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">その他</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">20-30代</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #dc2626;">70%</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">10%</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">10%</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">10%</td>
      </tr>
      <tr style="background: #fafafa;">
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">40代</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #f59e0b;">60%</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">20%</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">10%</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">10%</td>
      </tr>
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">50代</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #0891b2;">50%</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">30%</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">15%</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">5%</td>
      </tr>
      <tr style="background: #fafafa;">
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">60代以上</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #059669;">30%</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">50%</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">15%</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">5%</td>
      </tr>
    </tbody>
  </table>
  
  <p style="color: #64748b; margin-top: 16px; font-size: 14px;">
    ※ 「100 - 年齢」ルール：株式比率の目安として年齢を引いた数値を参考にする
  </p>
</div>

<h3 style="color: #1e293b; margin-top: 32px; margin-bottom: 16px;">2. リスク許容度別ポートフォリオ</h3>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin: 20px 0;">
  <div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 12px; padding: 20px;">
    <h4 style="color: #15803d; margin-top: 0;">🛡️ 保守的</h4>
    <ul style="color: #166534; margin: 8px 0; padding-left: 20px;">
      <li>国債：40%</li>
      <li>社債：20%</li>
      <li>高配当株：20%</li>
      <li>REIT：10%</li>
      <li>現金：10%</li>
    </ul>
    <p style="color: #15803d; margin-top: 12px; font-weight: bold;">期待リターン：2-4%</p>
  </div>
  
  <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 20px;">
    <h4 style="color: #92400e; margin-top: 0;">⚖️ バランス型</h4>
    <ul style="color: #78350f; margin: 8px 0; padding-left: 20px;">
      <li>国内株式：30%</li>
      <li>外国株式：20%</li>
      <li>債券：30%</li>
      <li>REIT：15%</li>
      <li>その他：5%</li>
    </ul>
    <p style="color: #92400e; margin-top: 12px; font-weight: bold;">期待リターン：4-7%</p>
  </div>
  
  <div style="background: #fee2e2; border: 2px solid #ef4444; border-radius: 12px; padding: 20px;">
    <h4 style="color: #991b1b; margin-top: 0;">🚀 積極的</h4>
    <ul style="color: #7f1d1d; margin: 8px 0; padding-left: 20px;">
      <li>成長株：40%</li>
      <li>新興国株：20%</li>
      <li>小型株：15%</li>
      <li>暗号資産：10%</li>
      <li>その他：15%</li>
    </ul>
    <p style="color: #991b1b; margin-top: 12px; font-weight: bold;">期待リターン：8-15%</p>
  </div>
</div>

<h3 style="color: #1e293b; margin-top: 32px; margin-bottom: 16px;">3. 実践的な商品選択チェックリスト</h3>

<div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 24px; border-radius: 12px; color: white; margin: 24px 0;">
  <h4 style="margin-top: 0;">📋 投資商品選択の5つのポイント</h4>
  <ol style="margin: 12px 0; padding-left: 24px; line-height: 1.8;">
    <li><strong>投資目的の明確化</strong>：資産形成、老後資金、教育資金など</li>
    <li><strong>投資期間の設定</strong>：短期（1年未満）、中期（1-5年）、長期（5年超）</li>
    <li><strong>リスク許容度の把握</strong>：最大損失許容額を事前に決定</li>
    <li><strong>流動性の確認</strong>：必要時の換金可能性</li>
    <li><strong>コストの比較</strong>：手数料、信託報酬、税金の総合評価</li>
  </ol>
</div>

<div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0; border-radius: 8px;">
  <h3 style="margin-top: 0; color: #334155;">💡 賢明な投資家への道</h3>
  <p style="color: #475569; line-height: 1.8;">金融商品の特性を理解し、自身の状況に最適な組み合わせを構築することが、長期的な資産形成の成功につながります。定期的な見直しと、市場環境の変化に応じた柔軟な対応が重要です。</p>
</div>`
      }
    ],
    keyPoints: [
      '株式・債券・投資信託・ETF・REITなど主要金融商品の特性理解',
      '各商品のリスク・リターン特性と投資適性',
      'デリバティブとオルタナティブ投資の基礎知識',
      '暗号資産・DeFi・NFTなど新しい金融商品の特徴とリスク',
      '年代・リスク許容度に応じたポートフォリオ構築',
      '商品選択の実践的チェックリスト'
    ],
    summary: `このレッスンでは、伝統的な金融商品から最新のデジタル資産まで、幅広い投資商品について包括的に学習しました。

株式、債券、投資信託、ETF、REITといった伝統的商品の特性を理解し、それぞれのメリット・デメリットを把握しました。また、デリバティブやオルタナティブ投資、暗号資産などの高度な商品についても基礎知識を習得しました。

特に重要なのは、各商品のリスク・リターン特性を理解し、自身の投資目的、投資期間、リスク許容度に応じて適切に選択・組み合わせることです。

年代別、リスク許容度別のモデルポートフォリオを参考に、自身に最適な資産配分を設計し、定期的に見直すことが長期的な資産形成の成功につながります。`,
    practicalExamples: [
      '大型株・中小型株・高配当株・新興国株の特性比較表',
      '国債・社債・外国債券の利回りとリスク分析',
      '投資信託とETFの詳細な比較と選択基準',
      'J-REITの種類別特徴と分配金利回り',
      '主要暗号資産のボラティリティとリスク評価',
      '年代別・リスク許容度別モデルポートフォリオ'
    ],
    warningNotes: [
      '本レッスンの内容は教育目的であり、特定の金融商品の推奨ではありません',
      'デリバティブや暗号資産は高リスク商品であり、十分な知識と経験が必要です',
      '投資は自己責任で行い、損失の可能性を常に考慮してください',
      '金融商品の選択前に、必ず最新の目論見書や契約締結前交付書面を確認してください',
      '税制や規制は頻繁に変更されるため、最新情報の確認が必要です'
    ]
  },

  quiz: [
    {
      id: 'financial-literacy-10-q1',
      question: '債券価格と金利の関係について正しいものは？',
      options: [
        '金利が上昇すると債券価格も上昇する',
        '金利が上昇すると債券価格は下落する',
        '金利と債券価格は無関係である',
        '金利が下落すると債券価格も下落する'
      ],
      correctAnswer: 1,
      explanation: '債券価格と金利は逆相関の関係にあります。金利が上昇すると、既存の債券の魅力が相対的に低下するため、債券価格は下落します。'
    },
    {
      id: 'financial-literacy-10-q2',
      question: 'ETFの特徴として正しくないものは？',
      options: [
        '市場時間中にリアルタイムで売買できる',
        '投資信託より一般的に経費率が低い',
        '金額指定での購入が可能',
        '最低投資額が投資信託より低い'
      ],
      correctAnswer: 2,
      explanation: 'ETFは口数単位での購入となり、金額指定での購入はできません。金額指定で購入できるのは投資信託の特徴です。'
    },
    {
      id: 'financial-literacy-10-q3',
      question: 'J-REITの収益分配について正しいものは？',
      options: [
        '利益の50%以上を分配すれば法人税非課税',
        '利益の70%以上を分配すれば法人税非課税',
        '利益の90%以上を分配すれば法人税非課税',
        '分配率に関わらず法人税が課税される'
      ],
      correctAnswer: 2,
      explanation: 'J-REITは利益の90%以上を分配することで法人税が非課税となる仕組みです。これにより高い分配金利回りが実現されています。'
    },
    {
      id: 'financial-literacy-10-q4',
      question: '「100 - 年齢」ルールが示すものは？',
      options: [
        '債券投資の目安比率',
        '株式投資の目安比率',
        'REIT投資の目安比率',
        '現金保有の目安比率'
      ],
      correctAnswer: 1,
      explanation: '「100 - 年齢」ルールは、ポートフォリオにおける株式投資の目安比率を示します。例えば40歳なら60%を株式に配分するという考え方です。'
    },
    {
      id: 'financial-literacy-10-q5',
      question: '暗号資産投資の推奨配分比率として適切なものは？',
      options: [
        'ポートフォリオの30-40%',
        'ポートフォリオの20-30%',
        'ポートフォリオの15-20%',
        'ポートフォリオの5-10%以内'
      ],
      correctAnswer: 3,
      explanation: '暗号資産は極めて高いボラティリティとリスクを持つため、ポートフォリオの5-10%以内に抑えることが推奨されます。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};