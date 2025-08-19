import type { Lesson } from '@/lib/types/learning'

export const lesson19: Lesson = {
  id: 'real-estate-investment-basics',
  categoryId: 'financial-literacy',
  title: '不動産投資の基礎とREITによる間接投資戦略',
  slug: 'real-estate-investment-basics',
  description: '不動産投資の仕組みと種類、直接投資とREIT投資の違い、リスクとリターンの特性を理解し、ポートフォリオへの組み入れ方を学びます。',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 55,
  orderIndex: 19,
  isPublished: true,
  tags: ['金融リテラシー', '不動産投資', 'REIT', '資産運用'],
  
  content: {
    sections: [
      {
        type: 'text',
        title: '不動産投資の基本概念と種類',
        content: `
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 1rem; color: white; margin-bottom: 2rem;">
  <h2 style="margin: 0 0 1rem 0; font-size: 2rem;">不動産投資の世界へようこそ</h2>
  <p style="font-size: 1.1rem; line-height: 1.8;">
    株式や債券とは異なる特性を持つ不動産投資。その魅力とリスク、そして初心者でも始められるREIT投資について体系的に学びましょう。
  </p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">1. 不動産投資の基本理解</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">不動産投資の収益源</h3>
<div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); padding: 1.5rem; border-radius: 0.5rem; margin: 1.5rem 0;">
  <h4 style="color: #064e3b; margin: 0 0 1rem 0;">💰 不動産投資の2つの収益</h4>
  <div style="display: flex; gap: 1rem;">
    <div style="flex: 1; background: rgba(255,255,255,0.9); padding: 1rem; border-radius: 0.5rem;">
      <h5 style="color: #064e3b; margin: 0 0 0.5rem 0;">インカムゲイン（賃料収入）</h5>
      <p style="color: #065f46; margin: 0; font-size: 0.9rem;">
        毎月の安定した家賃収入<br/>
        利回り：年3-10%程度
      </p>
    </div>
    <div style="flex: 1; background: rgba(255,255,255,0.9); padding: 1rem; border-radius: 0.5rem;">
      <h5 style="color: #064e3b; margin: 0 0 0.5rem 0;">キャピタルゲイン（売却益）</h5>
      <p style="color: #065f46; margin: 0; font-size: 0.9rem;">
        物件価値上昇による利益<br/>
        立地・開発による価値向上
      </p>
    </div>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">不動産投資の種類と特徴</h3>
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: linear-gradient(90deg, #4f46e5, #7c3aed); color: white;">
      <th style="padding: 1rem; text-align: left; border: 1px solid #e5e7eb;">投資タイプ</th>
      <th style="padding: 1rem; text-align: left; border: 1px solid #e5e7eb;">最低投資額</th>
      <th style="padding: 1rem; text-align: left; border: 1px solid #e5e7eb;">期待利回り</th>
      <th style="padding: 1rem; text-align: left; border: 1px solid #e5e7eb;">リスク</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #f9fafb;">
      <td style="padding: 1rem; border: 1px solid #e5e7eb;"><strong>実物不動産（区分）</strong></td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">1,000万円～</td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">4-6%</td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">中-高</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem; border: 1px solid #e5e7eb;"><strong>実物不動産（一棟）</strong></td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">5,000万円～</td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">5-8%</td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">高</td>
    </tr>
    <tr style="background: #f9fafb;">
      <td style="padding: 1rem; border: 1px solid #e5e7eb;"><strong>J-REIT</strong></td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">1万円～</td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">3-5%</td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">低-中</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem; border: 1px solid #e5e7eb;"><strong>不動産クラウドファンディング</strong></td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">1万円～</td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">4-7%</td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">中</td>
    </tr>
    <tr style="background: #f9fafb;">
      <td style="padding: 1rem; border: 1px solid #e5e7eb;"><strong>不動産小口化商品</strong></td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">100万円～</td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">3-5%</td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">低-中</td>
    </tr>
  </tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2. 実物不動産投資の仕組み</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">収支計算の基本</h3>
<div style="background: #fef3c7; padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #f59e0b; margin: 1.5rem 0;">
  <h4 style="color: #92400e; margin: 0 0 1rem 0;">📊 実質利回りの計算式</h4>
  <div style="background: white; padding: 1rem; border-radius: 0.5rem; font-family: monospace; color: #451a03;">
    実質利回り = (年間家賃収入 - 年間経費) ÷ (物件価格 + 購入諸費用) × 100
  </div>
  <p style="color: #78350f; margin: 1rem 0 0 0;">
    <strong>注意：</strong>表面利回りと実質利回りの差は通常1-2%。諸経費を考慮しない表面利回りに騙されないこと。
  </p>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">不動産投資の経費内訳</h3>
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: #dc2626; color: white;">
      <th style="padding: 1rem;">経費項目</th>
      <th style="padding: 1rem;">金額/割合</th>
      <th style="padding: 1rem;">頻度</th>
      <th style="padding: 1rem;">備考</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #fee2e2;">
      <td style="padding: 1rem;"><strong>管理費</strong></td>
      <td style="padding: 1rem;">家賃の5-10%</td>
      <td style="padding: 1rem;">毎月</td>
      <td style="padding: 1rem;">管理会社への委託費</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>修繕積立金</strong></td>
      <td style="padding: 1rem;">1-2万円/月</td>
      <td style="padding: 1rem;">毎月</td>
      <td style="padding: 1rem;">区分マンションの場合</td>
    </tr>
    <tr style="background: #fee2e2;">
      <td style="padding: 1rem;"><strong>固定資産税</strong></td>
      <td style="padding: 1rem;">評価額の1.4%</td>
      <td style="padding: 1rem;">年4回</td>
      <td style="padding: 1rem;">都市計画税も加算</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>火災保険</strong></td>
      <td style="padding: 1rem;">2-5万円/年</td>
      <td style="padding: 1rem;">年1回</td>
      <td style="padding: 1rem;">地震保険は別途</td>
    </tr>
    <tr style="background: #fee2e2;">
      <td style="padding: 1rem;"><strong>原状回復費</strong></td>
      <td style="padding: 1rem;">家賃の1-2ヶ月分</td>
      <td style="padding: 1rem;">退去時</td>
      <td style="padding: 1rem;">2-3年に1回程度</td>
    </tr>
  </tbody>
</table>
        `
      },
      {
        type: 'text',
        title: 'REITによる間接投資の仕組み',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">3. J-REIT（不動産投資信託）の理解</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">REITの基本構造</h3>
<div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); padding: 1.5rem; border-radius: 0.5rem; margin: 1.5rem 0;">
  <h4 style="color: #7c2d12; margin: 0 0 1rem 0;">🏢 REITの仕組み</h4>
  <div style="background: rgba(255,255,255,0.9); padding: 1rem; border-radius: 0.5rem;">
    <ol style="margin: 0; padding-left: 1.5rem; color: #7c2d12;">
      <li><strong>投資家から資金調達</strong>：証券市場で投資口を発行</li>
      <li><strong>不動産への投資</strong>：オフィスビル、商業施設、住宅等を取得</li>
      <li><strong>賃料収入の獲得</strong>：テナントからの安定した家賃収入</li>
      <li><strong>配当金の分配</strong>：利益の90%以上を投資家に分配（法人税非課税）</li>
    </ol>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">J-REITの種類と特徴</h3>
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: linear-gradient(90deg, #10b981, #3b82f6); color: white;">
      <th style="padding: 1rem;">REITタイプ</th>
      <th style="padding: 1rem;">投資対象</th>
      <th style="padding: 1rem;">分配金利回り</th>
      <th style="padding: 1rem;">特徴・リスク</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #f0fdf4;">
      <td style="padding: 1rem;"><strong>オフィス特化型</strong></td>
      <td style="padding: 1rem;">オフィスビル</td>
      <td style="padding: 1rem; text-align: center;">3-4%</td>
      <td style="padding: 1rem;">景気敏感・テレワーク影響</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>住宅特化型</strong></td>
      <td style="padding: 1rem;">賃貸マンション</td>
      <td style="padding: 1rem; text-align: center;">3.5-4.5%</td>
      <td style="padding: 1rem;">安定的・人口動態影響</td>
    </tr>
    <tr style="background: #f0fdf4;">
      <td style="padding: 1rem;"><strong>商業施設型</strong></td>
      <td style="padding: 1rem;">ショッピングモール</td>
      <td style="padding: 1rem; text-align: center;">4-5%</td>
      <td style="padding: 1rem;">EC化の影響・立地重要</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>物流施設型</strong></td>
      <td style="padding: 1rem;">物流倉庫</td>
      <td style="padding: 1rem; text-align: center;">3.5-4.5%</td>
      <td style="padding: 1rem;">EC成長で需要増・競争激化</td>
    </tr>
    <tr style="background: #f0fdf4;">
      <td style="padding: 1rem;"><strong>ホテル型</strong></td>
      <td style="padding: 1rem;">ホテル・旅館</td>
      <td style="padding: 1rem; text-align: center;">4-6%</td>
      <td style="padding: 1rem;">高リスク高リターン・観光需要</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>総合型</strong></td>
      <td style="padding: 1rem;">複数タイプ</td>
      <td style="padding: 1rem; text-align: center;">3.5-4.5%</td>
      <td style="padding: 1rem;">分散効果・バランス型</td>
    </tr>
  </tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">4. REITの投資指標</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">重要な評価指標</h3>
<div style="background: #f0f9ff; padding: 1.5rem; border-radius: 0.5rem; border: 2px solid #0284c7; margin: 1.5rem 0;">
  <h4 style="color: #075985; margin: 0 0 1rem 0;">📈 REIT分析の4つの指標</h4>
  
  <div style="background: white; padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.75rem;">
    <h5 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">1. NAV倍率（Net Asset Value）</h5>
    <p style="color: #075985; margin: 0; font-size: 0.9rem;">
      投資口価格 ÷ 1口当たり純資産価値<br/>
      <strong>1倍未満：割安</strong> / 1倍超：割高
    </p>
  </div>
  
  <div style="background: white; padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.75rem;">
    <h5 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">2. FFO（Funds From Operations）</h5>
    <p style="color: #075985; margin: 0; font-size: 0.9rem;">
      純利益 + 減価償却費 - 不動産売却損益<br/>
      <strong>REITの実質的な収益力を示す</strong>
    </p>
  </div>
  
  <div style="background: white; padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.75rem;">
    <h5 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">3. LTV（Loan to Value）</h5>
    <p style="color: #075985; margin: 0; font-size: 0.9rem;">
      有利子負債 ÷ 総資産<br/>
      <strong>40-50%が健全</strong> / 60%超は要注意
    </p>
  </div>
  
  <div style="background: white; padding: 1rem; border-radius: 0.5rem;">
    <h5 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">4. NOI利回り（Net Operating Income）</h5>
    <p style="color: #075985; margin: 0; font-size: 0.9rem;">
      (賃料収入 - 運営費) ÷ 物件取得価格<br/>
      <strong>物件の収益性を評価</strong>
    </p>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">主要J-REITの比較（2024年データ）</h3>
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: linear-gradient(90deg, #8b5cf6, #a855f7); color: white;">
      <th style="padding: 1rem;">銘柄（例）</th>
      <th style="padding: 1rem;">時価総額</th>
      <th style="padding: 1rem;">分配金利回り</th>
      <th style="padding: 1rem;">NAV倍率</th>
      <th style="padding: 1rem;">LTV</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #faf5ff;">
      <td style="padding: 1rem;"><strong>日本ビルファンド</strong></td>
      <td style="padding: 1rem;">1.2兆円</td>
      <td style="padding: 1rem; text-align: center;">3.2%</td>
      <td style="padding: 1rem; text-align: center;">0.95倍</td>
      <td style="padding: 1rem; text-align: center;">42%</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>日本プロロジス</strong></td>
      <td style="padding: 1rem;">8,000億円</td>
      <td style="padding: 1rem; text-align: center;">3.5%</td>
      <td style="padding: 1rem; text-align: center;">1.05倍</td>
      <td style="padding: 1rem; text-align: center;">38%</td>
    </tr>
    <tr style="background: #faf5ff;">
      <td style="padding: 1rem;"><strong>アドバンス・レジデンス</strong></td>
      <td style="padding: 1rem;">5,000億円</td>
      <td style="padding: 1rem; text-align: center;">3.8%</td>
      <td style="padding: 1rem; text-align: center;">1.10倍</td>
      <td style="padding: 1rem; text-align: center;">45%</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>オリックス不動産</strong></td>
      <td style="padding: 1rem;">6,000億円</td>
      <td style="padding: 1rem; text-align: center;">4.0%</td>
      <td style="padding: 1rem; text-align: center;">0.90倍</td>
      <td style="padding: 1rem; text-align: center;">48%</td>
    </tr>
  </tbody>
</table>
        `
      },
      {
        type: 'text',
        title: '実物不動産投資のリスクと対策',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">5. 不動産投資の主要リスク</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">リスクマトリックス</h3>
<div style="background: #fff7ed; padding: 1.5rem; border-radius: 0.5rem; border: 2px solid #ea580c; margin: 1.5rem 0;">
  <h4 style="color: #7c2d12; margin: 0 0 1rem 0;">⚠️ 不動産投資の8大リスク</h4>
  
  <table style="width: 100%; background: white; border-radius: 0.5rem;">
    <thead>
      <tr style="background: #dc2626; color: white;">
        <th style="padding: 0.75rem;">リスク種類</th>
        <th style="padding: 0.75rem;">発生確率</th>
        <th style="padding: 0.75rem;">影響度</th>
        <th style="padding: 0.75rem;">対策</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 0.75rem;"><strong>空室リスク</strong></td>
        <td style="padding: 0.75rem; text-align: center;">高</td>
        <td style="padding: 0.75rem; text-align: center;">★★★★☆</td>
        <td style="padding: 0.75rem;">立地選定・適正家賃</td>
      </tr>
      <tr style="background: #fef2f2;">
        <td style="padding: 0.75rem;"><strong>家賃下落リスク</strong></td>
        <td style="padding: 0.75rem; text-align: center;">中</td>
        <td style="padding: 0.75rem; text-align: center;">★★★☆☆</td>
        <td style="padding: 0.75rem;">メンテナンス・差別化</td>
      </tr>
      <tr>
        <td style="padding: 0.75rem;"><strong>修繕リスク</strong></td>
        <td style="padding: 0.75rem; text-align: center;">確実</td>
        <td style="padding: 0.75rem; text-align: center;">★★★☆☆</td>
        <td style="padding: 0.75rem;">積立金準備・定期点検</td>
      </tr>
      <tr style="background: #fef2f2;">
        <td style="padding: 0.75rem;"><strong>災害リスク</strong></td>
        <td style="padding: 0.75rem; text-align: center;">低</td>
        <td style="padding: 0.75rem; text-align: center;">★★★★★</td>
        <td style="padding: 0.75rem;">保険加入・立地選定</td>
      </tr>
      <tr>
        <td style="padding: 0.75rem;"><strong>金利上昇リスク</strong></td>
        <td style="padding: 0.75rem; text-align: center;">中</td>
        <td style="padding: 0.75rem; text-align: center;">★★★★☆</td>
        <td style="padding: 0.75rem;">固定金利・繰上返済</td>
      </tr>
      <tr style="background: #fef2f2;">
        <td style="padding: 0.75rem;"><strong>流動性リスク</strong></td>
        <td style="padding: 0.75rem; text-align: center;">高</td>
        <td style="padding: 0.75rem; text-align: center;">★★★☆☆</td>
        <td style="padding: 0.75rem;">適正価格・REIT活用</td>
      </tr>
      <tr>
        <td style="padding: 0.75rem;"><strong>管理会社リスク</strong></td>
        <td style="padding: 0.75rem; text-align: center;">低</td>
        <td style="padding: 0.75rem; text-align: center;">★★☆☆☆</td>
        <td style="padding: 0.75rem;">実績確認・複数比較</td>
      </tr>
      <tr style="background: #fef2f2;">
        <td style="padding: 0.75rem;"><strong>人口減少リスク</strong></td>
        <td style="padding: 0.75rem; text-align: center;">地域次第</td>
        <td style="padding: 0.75rem; text-align: center;">★★★★☆</td>
        <td style="padding: 0.75rem;">都心・駅近物件選定</td>
      </tr>
    </tbody>
  </table>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">空室率と立地の関係</h3>
<div style="background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%); padding: 1.5rem; border-radius: 0.5rem; margin: 1.5rem 0;">
  <h4 style="color: #064e3b; margin: 0 0 1rem 0;">📍 立地別の平均空室率（2024年）</h4>
  
  <table style="width: 100%; background: white; border-radius: 0.5rem;">
    <thead>
      <tr style="background: #10b981; color: white;">
        <th style="padding: 0.75rem;">エリア</th>
        <th style="padding: 0.75rem;">空室率</th>
        <th style="padding: 0.75rem;">家賃相場（1R）</th>
        <th style="padding: 0.75rem;">将来性</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 0.75rem;"><strong>都心5区</strong></td>
        <td style="padding: 0.75rem; text-align: center;">3-5%</td>
        <td style="padding: 0.75rem; text-align: center;">10-15万円</td>
        <td style="padding: 0.75rem; text-align: center;">★★★★★</td>
      </tr>
      <tr style="background: #f0fdf4;">
        <td style="padding: 0.75rem;"><strong>23区内</strong></td>
        <td style="padding: 0.75rem; text-align: center;">5-8%</td>
        <td style="padding: 0.75rem; text-align: center;">7-10万円</td>
        <td style="padding: 0.75rem; text-align: center;">★★★★☆</td>
      </tr>
      <tr>
        <td style="padding: 0.75rem;"><strong>首都圏郊外</strong></td>
        <td style="padding: 0.75rem; text-align: center;">8-12%</td>
        <td style="padding: 0.75rem; text-align: center;">5-7万円</td>
        <td style="padding: 0.75rem; text-align: center;">★★★☆☆</td>
      </tr>
      <tr style="background: #f0fdf4;">
        <td style="padding: 0.75rem;"><strong>地方都市</strong></td>
        <td style="padding: 0.75rem; text-align: center;">10-15%</td>
        <td style="padding: 0.75rem; text-align: center;">4-6万円</td>
        <td style="padding: 0.75rem; text-align: center;">★★☆☆☆</td>
      </tr>
      <tr>
        <td style="padding: 0.75rem;"><strong>地方郊外</strong></td>
        <td style="padding: 0.75rem; text-align: center;">15-25%</td>
        <td style="padding: 0.75rem; text-align: center;">3-5万円</td>
        <td style="padding: 0.75rem; text-align: center;">★☆☆☆☆</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">6. 不動産投資ローンの活用</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">レバレッジ効果とリスク</h3>
<div style="background: #fef3c7; padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #f59e0b; margin: 1.5rem 0;">
  <h4 style="color: #92400e; margin: 0 0 1rem 0;">💰 レバレッジのメリット・デメリット</h4>
  
  <div style="display: flex; gap: 1rem;">
    <div style="flex: 1; background: white; padding: 1rem; border-radius: 0.5rem;">
      <h5 style="color: #16a34a; margin: 0 0 0.5rem 0;">✅ メリット</h5>
      <ul style="margin: 0; padding-left: 1.5rem; font-size: 0.9rem;">
        <li>少ない自己資金で投資可能</li>
        <li>収益の拡大効果</li>
        <li>団体信用生命保険付帯</li>
        <li>インフレヘッジ効果</li>
      </ul>
    </div>
    <div style="flex: 1; background: white; padding: 1rem; border-radius: 0.5rem;">
      <h5 style="color: #dc2626; margin: 0 0 0.5rem 0;">❌ デメリット</h5>
      <ul style="margin: 0; padding-left: 1.5rem; font-size: 0.9rem;">
        <li>金利上昇リスク</li>
        <li>空室時の返済負担</li>
        <li>売却時の残債リスク</li>
        <li>信用情報への影響</li>
      </ul>
    </div>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">不動産投資ローンの条件比較</h3>
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: #0284c7; color: white;">
      <th style="padding: 1rem;">金融機関</th>
      <th style="padding: 1rem;">金利水準</th>
      <th style="padding: 1rem;">融資上限</th>
      <th style="padding: 1rem;">審査基準</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #e0f2fe;">
      <td style="padding: 1rem;"><strong>メガバンク</strong></td>
      <td style="padding: 1rem; text-align: center;">0.5-2.0%</td>
      <td style="padding: 1rem; text-align: center;">年収の10-15倍</td>
      <td style="padding: 1rem;">厳格（年収700万円以上）</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>地方銀行</strong></td>
      <td style="padding: 1rem; text-align: center;">1.5-3.0%</td>
      <td style="padding: 1rem; text-align: center;">年収の8-12倍</td>
      <td style="padding: 1rem;">中程度（年収500万円以上）</td>
    </tr>
    <tr style="background: #e0f2fe;">
      <td style="padding: 1rem;"><strong>信用金庫</strong></td>
      <td style="padding: 1rem; text-align: center;">2.0-3.5%</td>
      <td style="padding: 1rem; text-align: center;">年収の7-10倍</td>
      <td style="padding: 1rem;">柔軟（地域密着）</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>ノンバンク</strong></td>
      <td style="padding: 1rem; text-align: center;">3.5-7.0%</td>
      <td style="padding: 1rem; text-align: center;">物件評価次第</td>
      <td style="padding: 1rem;">緩い（スピード重視）</td>
    </tr>
  </tbody>
</table>
        `
      },
      {
        type: 'text',
        title: 'REITと実物不動産の比較分析',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">7. REIT vs 実物不動産の徹底比較</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">投資特性の比較</h3>
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: linear-gradient(90deg, #4f46e5, #7c3aed); color: white;">
      <th style="padding: 1rem;">比較項目</th>
      <th style="padding: 1rem;">J-REIT</th>
      <th style="padding: 1rem;">実物不動産</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #f9fafb;">
      <td style="padding: 1rem;"><strong>最低投資額</strong></td>
      <td style="padding: 1rem; color: #16a34a;">1万円～</td>
      <td style="padding: 1rem; color: #dc2626;">1,000万円～</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>流動性</strong></td>
      <td style="padding: 1rem; color: #16a34a;">高い（即日売却可）</td>
      <td style="padding: 1rem; color: #dc2626;">低い（数ヶ月必要）</td>
    </tr>
    <tr style="background: #f9fafb;">
      <td style="padding: 1rem;"><strong>管理の手間</strong></td>
      <td style="padding: 1rem; color: #16a34a;">なし</td>
      <td style="padding: 1rem; color: #dc2626;">あり（委託可能）</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>分散投資</strong></td>
      <td style="padding: 1rem; color: #16a34a;">自動的に分散</td>
      <td style="padding: 1rem; color: #dc2626;">困難（資金必要）</td>
    </tr>
    <tr style="background: #f9fafb;">
      <td style="padding: 1rem;"><strong>レバレッジ</strong></td>
      <td style="padding: 1rem; color: #ea580c;">信用取引のみ</td>
      <td style="padding: 1rem; color: #16a34a;">ローン活用可</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>税制優遇</strong></td>
      <td style="padding: 1rem; color: #ea580c;">NISA活用可</td>
      <td style="padding: 1rem; color: #16a34a;">減価償却・損益通算</td>
    </tr>
    <tr style="background: #f9fafb;">
      <td style="padding: 1rem;"><strong>価格変動</strong></td>
      <td style="padding: 1rem; color: #dc2626;">日々変動</td>
      <td style="padding: 1rem; color: #16a34a;">緩やか</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>収益安定性</strong></td>
      <td style="padding: 1rem; color: #16a34a;">分配金安定</td>
      <td style="padding: 1rem; color: #ea580c;">空室リスクあり</td>
    </tr>
  </tbody>
</table>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">収益シミュレーション比較（1,000万円投資の場合）</h3>
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 1rem; margin: 1.5rem 0;">
  <h3 style="color: white; margin: 0 0 1.5rem 0;">💰 10年間の収益比較</h3>
  
  <div style="display: flex; gap: 1rem;">
    <div style="flex: 1; background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 0.5rem;">
      <h4 style="color: #4f46e5; margin: 0 0 1rem 0;">J-REIT投資</h4>
      <ul style="margin: 0; padding-left: 1.5rem; font-size: 0.9rem;">
        <li>年間分配金：40万円（4%）</li>
        <li>10年間分配金：400万円</li>
        <li>価格上昇（想定）：20%</li>
        <li><strong style="color: #16a34a;">総収益：600万円</strong></li>
        <li>税引後：約480万円</li>
      </ul>
    </div>
    
    <div style="flex: 1; background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 0.5rem;">
      <h4 style="color: #7c3aed; margin: 0 0 1rem 0;">実物不動産（区分）</h4>
      <ul style="margin: 0; padding-left: 1.5rem; font-size: 0.9rem;">
        <li>年間家賃：60万円（表面6%）</li>
        <li>経費差引後：40万円</li>
        <li>10年間収益：400万円</li>
        <li><strong style="color: #16a34a;">総収益：400万円</strong></li>
        <li>減価償却の節税効果：+α</li>
      </ul>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">8. 不動産投資の税制</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">不動産投資の税金一覧</h3>
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: #dc2626; color: white;">
      <th style="padding: 1rem;">税金の種類</th>
      <th style="padding: 1rem;">課税対象</th>
      <th style="padding: 1rem;">税率</th>
      <th style="padding: 1rem;">節税対策</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #fee2e2;">
      <td style="padding: 1rem;"><strong>不動産取得税</strong></td>
      <td style="padding: 1rem;">購入時一回</td>
      <td style="padding: 1rem;">評価額の3-4%</td>
      <td style="padding: 1rem;">軽減措置活用</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>固定資産税</strong></td>
      <td style="padding: 1rem;">毎年</td>
      <td style="padding: 1rem;">評価額の1.4%</td>
      <td style="padding: 1rem;">小規模宅地特例</td>
    </tr>
    <tr style="background: #fee2e2;">
      <td style="padding: 1rem;"><strong>所得税（家賃）</strong></td>
      <td style="padding: 1rem;">家賃収入</td>
      <td style="padding: 1rem;">5-45%（総合課税）</td>
      <td style="padding: 1rem;">経費計上・減価償却</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>譲渡所得税</strong></td>
      <td style="padding: 1rem;">売却益</td>
      <td style="padding: 1rem;">20-39%</td>
      <td style="padding: 1rem;">5年超保有で軽減</td>
    </tr>
  </tbody>
</table>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">減価償却の活用</h3>
<div style="background: #f0f9ff; padding: 1.5rem; border-radius: 0.5rem; border: 2px solid #0284c7; margin: 1.5rem 0;">
  <h4 style="color: #075985; margin: 0 0 1rem 0;">📊 減価償却による節税効果</h4>
  
  <div style="background: white; padding: 1rem; border-radius: 0.5rem;">
    <h5 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">建物構造別の償却期間</h5>
    <table style="width: 100%; margin-top: 0.5rem;">
      <tr style="background: #e0f2fe;">
        <td style="padding: 0.5rem;"><strong>RC造</strong></td>
        <td style="padding: 0.5rem;">47年（年2.13%）</td>
      </tr>
      <tr>
        <td style="padding: 0.5rem;"><strong>鉄骨造</strong></td>
        <td style="padding: 0.5rem;">34年（年2.94%）</td>
      </tr>
      <tr style="background: #e0f2fe;">
        <td style="padding: 0.5rem;"><strong>木造</strong></td>
        <td style="padding: 0.5rem;">22年（年4.55%）</td>
      </tr>
    </table>
    <p style="color: #075985; margin: 1rem 0 0 0; font-size: 0.9rem;">
      <strong>節税効果例：</strong>建物価格3,000万円（RC造）→ 年間約64万円を経費計上可能
    </p>
  </div>
</div>
        `
      },
      {
        type: 'text',
        title: 'ポートフォリオへの組み入れ戦略',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">9. 不動産のポートフォリオ配分</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">資産配分の最適化</h3>
<div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); padding: 1.5rem; border-radius: 0.5rem; margin: 1.5rem 0;">
  <h4 style="color: #064e3b; margin: 0 0 1rem 0;">🎯 推奨ポートフォリオ配分</h4>
  
  <table style="width: 100%; background: white; border-radius: 0.5rem;">
    <thead>
      <tr style="background: #10b981; color: white;">
        <th style="padding: 0.75rem;">資産規模</th>
        <th style="padding: 0.75rem;">株式</th>
        <th style="padding: 0.75rem;">債券</th>
        <th style="padding: 0.75rem;">REIT</th>
        <th style="padding: 0.75rem;">実物不動産</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 0.75rem;"><strong>～1,000万円</strong></td>
        <td style="padding: 0.75rem; text-align: center;">60%</td>
        <td style="padding: 0.75rem; text-align: center;">20%</td>
        <td style="padding: 0.75rem; text-align: center;">10%</td>
        <td style="padding: 0.75rem; text-align: center;">0%</td>
      </tr>
      <tr style="background: #f0fdf4;">
        <td style="padding: 0.75rem;"><strong>1,000-3,000万円</strong></td>
        <td style="padding: 0.75rem; text-align: center;">50%</td>
        <td style="padding: 0.75rem; text-align: center;">20%</td>
        <td style="padding: 0.75rem; text-align: center;">15%</td>
        <td style="padding: 0.75rem; text-align: center;">5%</td>
      </tr>
      <tr>
        <td style="padding: 0.75rem;"><strong>3,000-5,000万円</strong></td>
        <td style="padding: 0.75rem; text-align: center;">45%</td>
        <td style="padding: 0.75rem; text-align: center;">15%</td>
        <td style="padding: 0.75rem; text-align: center;">10%</td>
        <td style="padding: 0.75rem; text-align: center;">20%</td>
      </tr>
      <tr style="background: #f0fdf4;">
        <td style="padding: 0.75rem;"><strong>5,000万円～</strong></td>
        <td style="padding: 0.75rem; text-align: center;">40%</td>
        <td style="padding: 0.75rem; text-align: center;">15%</td>
        <td style="padding: 0.75rem; text-align: center;">10%</td>
        <td style="padding: 0.75rem; text-align: center;">25%</td>
      </tr>
    </tbody>
  </table>
  
  <p style="color: #064e3b; margin: 1rem 0 0 0; font-size: 0.9rem;">
    ※現金・預金10%は別途確保を推奨
  </p>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">REITインデックスファンドの活用</h3>
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: linear-gradient(90deg, #10b981, #14b8a6); color: white;">
      <th style="padding: 1rem;">ファンド名</th>
      <th style="padding: 1rem;">信託報酬</th>
      <th style="padding: 1rem;">純資産総額</th>
      <th style="padding: 1rem;">特徴</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #f0fdf4;">
      <td style="padding: 1rem;"><strong>eMAXIS Slim国内リート</strong></td>
      <td style="padding: 1rem; text-align: center;">0.187%</td>
      <td style="padding: 1rem; text-align: center;">500億円</td>
      <td style="padding: 1rem;">東証REIT指数連動</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>ニッセイJリート</strong></td>
      <td style="padding: 1rem; text-align: center;">0.275%</td>
      <td style="padding: 1rem; text-align: center;">800億円</td>
      <td style="padding: 1rem;">分配金再投資型</td>
    </tr>
    <tr style="background: #f0fdf4;">
      <td style="padding: 1rem;"><strong>One国内リート</strong></td>
      <td style="padding: 1rem; text-align: center;">0.341%</td>
      <td style="padding: 1rem; text-align: center;">300億円</td>
      <td style="padding: 1rem;">アクティブ運用</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>先進国リートインデックス</strong></td>
      <td style="padding: 1rem; text-align: center;">0.297%</td>
      <td style="padding: 1rem; text-align: center;">600億円</td>
      <td style="padding: 1rem;">グローバル分散</td>
    </tr>
  </tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">10. 実践的な投資判断フロー</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">不動産投資の意思決定チャート</h3>
<div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); padding: 2rem; border-radius: 1rem; margin: 1.5rem 0;">
  <h3 style="color: #7c2d12; margin: 0 0 1.5rem 0;">🔄 投資判断のステップ</h3>
  
  <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 1rem;">
    <h4 style="color: #dc2626; margin: 0 0 0.5rem 0;">Step 1：投資目的の明確化</h4>
    <p style="margin: 0; font-size: 0.9rem;">
      □ 安定収入重視 → REIT or 都心物件<br/>
      □ 節税重視 → 実物不動産（減価償却活用）<br/>
      □ 資産形成重視 → 成長性の高いREIT
    </p>
  </div>
  
  <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 1rem;">
    <h4 style="color: #ea580c; margin: 0 0 0.5rem 0;">Step 2：投資可能額の確認</h4>
    <p style="margin: 0; font-size: 0.9rem;">
      □ ～100万円 → REITインデックス<br/>
      □ 100-500万円 → 個別REIT選定<br/>
      □ 500万円～ → 実物不動産検討可
    </p>
  </div>
  
  <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 1rem;">
    <h4 style="color: #f59e0b; margin: 0 0 0.5rem 0;">Step 3：リスク許容度の評価</h4>
    <p style="margin: 0; font-size: 0.9rem;">
      □ 低リスク → 住宅系REIT<br/>
      □ 中リスク → 総合型REIT or 都心物件<br/>
      □ 高リスク → ホテルREIT or 地方物件
    </p>
  </div>
  
  <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 0.5rem;">
    <h4 style="color: #16a34a; margin: 0 0 0.5rem 0;">Step 4：実行とモニタリング</h4>
    <p style="margin: 0; font-size: 0.9rem;">
      □ 分散投資の実践<br/>
      □ 定期的な見直し（年1-2回）<br/>
      □ 市況変化への対応
    </p>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">初心者向け推奨プラン</h3>
<div style="background: #f3f4f6; padding: 1.5rem; border-radius: 0.5rem; margin: 1.5rem 0;">
  <h4 style="color: #1f2937; margin: 0 0 1rem 0;">🎯 段階的な不動産投資の始め方</h4>
  
  <table style="width: 100%; background: white; border-radius: 0.5rem;">
    <thead>
      <tr style="background: #6b7280; color: white;">
        <th style="padding: 0.75rem;">段階</th>
        <th style="padding: 0.75rem;">投資商品</th>
        <th style="padding: 0.75rem;">投資額</th>
        <th style="padding: 0.75rem;">期間</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 0.75rem;"><strong>第1段階</strong></td>
        <td style="padding: 0.75rem;">REITインデックス（つみたてNISA）</td>
        <td style="padding: 0.75rem;">月1-3万円</td>
        <td style="padding: 0.75rem;">1-2年</td>
      </tr>
      <tr style="background: #f9fafb;">
        <td style="padding: 0.75rem;"><strong>第2段階</strong></td>
        <td style="padding: 0.75rem;">個別REIT銘柄</td>
        <td style="padding: 0.75rem;">50-100万円</td>
        <td style="padding: 0.75rem;">2-3年目</td>
      </tr>
      <tr>
        <td style="padding: 0.75rem;"><strong>第3段階</strong></td>
        <td style="padding: 0.75rem;">不動産クラウドファンディング</td>
        <td style="padding: 0.75rem;">10-50万円</td>
        <td style="padding: 0.75rem;">3-4年目</td>
      </tr>
      <tr style="background: #f9fafb;">
        <td style="padding: 0.75rem;"><strong>第4段階</strong></td>
        <td style="padding: 0.75rem;">実物不動産（区分）</td>
        <td style="padding: 0.75rem;">1,000万円～</td>
        <td style="padding: 0.75rem;">5年目以降</td>
      </tr>
    </tbody>
  </table>
</div>
        `
      },
      {
        type: 'text',
        title: 'まとめと実践チェックリスト',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">実践への道筋</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">不動産投資開始前のチェックリスト</h3>
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 1rem; color: white; margin: 1.5rem 0;">
  <h3 style="margin: 0 0 1.5rem 0;">✅ 投資前の必須確認事項</h3>
  
  <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.75rem;">
    <input type="checkbox" id="check1" style="margin-right: 0.5rem;">
    <label for="check1"><strong>生活防衛資金の確保</strong> - 生活費6ヶ月分以上</label>
  </div>
  
  <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.75rem;">
    <input type="checkbox" id="check2" style="margin-right: 0.5rem;">
    <label for="check2"><strong>投資目的の明確化</strong> - 収入重視か資産形成か</label>
  </div>
  
  <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.75rem;">
    <input type="checkbox" id="check3" style="margin-right: 0.5rem;">
    <label for="check3"><strong>リスク許容度の把握</strong> - 最大損失額の想定</label>
  </div>
  
  <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.75rem;">
    <input type="checkbox" id="check4" style="margin-right: 0.5rem;">
    <label for="check4"><strong>投資期間の設定</strong> - 5年以上の長期投資推奨</label>
  </div>
  
  <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem;">
    <input type="checkbox" id="check5" style="margin-right: 0.5rem;">
    <label for="check5"><strong>税制の理解</strong> - 所得税・固定資産税の把握</label>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">よくある失敗パターンと回避策</h3>
<div style="background: #fef2f2; padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #dc2626; margin: 1.5rem 0;">
  <h4 style="color: #991b1b; margin: 0 0 1rem 0;">⚠️ 不動産投資の5大失敗</h4>
  
  <ol style="color: #7f1d1d; margin: 0; padding-left: 1.5rem;">
    <li><strong>表面利回りだけで判断</strong> → 実質利回りで計算する</li>
    <li><strong>立地を軽視した物件選び</strong> → 駅徒歩10分以内を基準に</li>
    <li><strong>過度なレバレッジ</strong> → 返済比率50%以下を維持</li>
    <li><strong>管理会社の選定ミス</strong> → 実績と評判を必ず確認</li>
    <li><strong>出口戦略の欠如</strong> → 売却時期と方法を事前に計画</li>
  </ol>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">成功のための重要指標</h3>
<div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); padding: 1.5rem; border-radius: 0.5rem; margin: 1.5rem 0;">
  <h4 style="color: #064e3b; margin: 0 0 1rem 0;">📊 モニタリングすべき5つの指標</h4>
  
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
    <div style="background: rgba(255,255,255,0.9); padding: 0.75rem; border-radius: 0.5rem;">
      <strong style="color: #064e3b;">空室率</strong>
      <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: #065f46;">目標：5%以下</p>
    </div>
    <div style="background: rgba(255,255,255,0.9); padding: 0.75rem; border-radius: 0.5rem;">
      <strong style="color: #064e3b;">実質利回り</strong>
      <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: #065f46;">目標：4%以上</p>
    </div>
    <div style="background: rgba(255,255,255,0.9); padding: 0.75rem; border-radius: 0.5rem;">
      <strong style="color: #064e3b;">返済比率</strong>
      <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: #065f46;">目標：50%以下</p>
    </div>
    <div style="background: rgba(255,255,255,0.9); padding: 0.75rem; border-radius: 0.5rem;">
      <strong style="color: #064e3b;">キャッシュフロー</strong>
      <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: #065f46;">目標：黒字維持</p>
    </div>
    <div style="background: rgba(255,255,255,0.9); padding: 0.75rem; border-radius: 0.5rem;">
      <strong style="color: #064e3b;">NAV倍率（REIT）</strong>
      <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: #065f46;">目標：1倍以下で買い</p>
    </div>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">推奨学習リソース</h3>
<div style="background: #f0f9ff; padding: 1.5rem; border-radius: 0.5rem; border: 2px solid #0284c7; margin: 1.5rem 0;">
  <h4 style="color: #075985; margin: 0 0 1rem 0;">📚 さらなる学習のために</h4>
  
  <ul style="color: #075985; margin: 0; padding-left: 1.5rem;">
    <li><strong>書籍</strong>：「はじめての不動産投資」「REIT投資入門」</li>
    <li><strong>セミナー</strong>：不動産投資EXPOなど（無料参加可）</li>
    <li><strong>情報サイト</strong>：JAPAN-REIT.COM（J-REIT情報）</li>
    <li><strong>実践</strong>：少額のREIT投資から開始</li>
    <li><strong>相談</strong>：FPや税理士への相談（初回無料多数）</li>
  </ul>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">最後に：不動産投資の心構え</h3>
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 1rem; color: white; margin: 1.5rem 0;">
  <h3 style="margin: 0 0 1rem 0;">🏆 成功する投資家の3原則</h3>
  
  <div style="display: flex; gap: 1rem;">
    <div style="flex: 1; background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">📖</div>
      <strong>継続的な学習</strong>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">市場動向の把握と知識更新</p>
    </div>
    <div style="flex: 1; background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">⚖️</div>
      <strong>リスク管理</strong>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">分散投資と適切なレバレッジ</p>
    </div>
    <div style="flex: 1; background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">⏳</div>
      <strong>長期視点</strong>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">短期変動に惑わされない</p>
    </div>
  </div>
</div>
        `
      }
    ],
    keyPoints: [
      '不動産投資には実物投資とREIT投資の2つの選択肢があり、それぞれ特性が異なる',
      'REITは少額から始められ流動性が高いが、実物不動産は節税効果とレバレッジが魅力',
      '実質利回りは表面利回りから1-2%低くなることを考慮した投資判断が必要',
      '立地選定が不動産投資の成否を左右する最重要要素',
      'ポートフォリオの10-20%程度の不動産配分が分散効果を高める'
    ],
    summary: `
不動産投資は、株式や債券とは異なる特性を持つ重要な資産クラスです。安定した賃料収入によるインカムゲインと、物件価値上昇によるキャピタルゲインの両方を狙える魅力的な投資対象です。

実物不動産投資は最低でも1,000万円程度の資金が必要で、空室リスクや管理の手間がありますが、レバレッジ効果と節税メリットが大きな魅力です。一方、J-REITは1万円から投資可能で、プロによる運用と高い流動性が特徴ですが、日々の価格変動があります。

初心者はまずREITインデックスファンドから始め、経験を積みながら個別REIT、そして実物不動産へとステップアップすることをお勧めします。重要なのは、表面利回りに惑わされず実質利回りで判断し、立地を最重視することです。
    `,
    practicalExamples: [
      '月3万円のREIT積立投資を10年継続すると、4%の分配金で約420万円の資産形成が可能',
      '都心駅徒歩5分の区分マンション（2,000万円）は空室率3%以下、実質利回り4-5%が期待できる',
      '東証REIT指数は過去20年で年率約6%のトータルリターンを実現',
      'REITと実物不動産を組み合わせることで、流動性と収益性のバランスが取れる',
      '不動産投資ローン活用で、自己資金500万円で2,000万円の物件投資が可能（レバレッジ4倍）'
    ],
    warningNotes: [
      '不動産投資には空室リスク、家賃下落リスク、災害リスクなど様々なリスクが存在',
      '実物不動産は流動性が低く、売却に数ヶ月かかることがある',
      'レバレッジは収益を拡大する反面、損失も拡大する諸刃の剣',
      '新築物件は割高なことが多く、中古物件の方が利回りが高い傾向',
      '不動産投資の判断は自己責任であり、必要に応じて専門家に相談すること'
    ]
  },

  quiz: [
    {
      id: 'real-estate-1',
      question: '不動産投資の収益源として正しい組み合わせはどれですか？',
      options: [
        'インカムゲイン（売却益）とキャピタルゲイン（賃料収入）',
        'インカムゲイン（賃料収入）とキャピタルゲイン（売却益）',
        'インカムゲイン（配当金）とキャピタルゲイン（利息収入）',
        'インカムゲイン（家賃収入）のみ'
      ],
      correctAnswer: 1,
      explanation: '不動産投資の収益源は、インカムゲイン（賃料収入）とキャピタルゲイン（売却益）の2つです。インカムゲインは毎月の安定した家賃収入、キャピタルゲインは物件価値の上昇による売却時の利益を指します。'
    },
    {
      id: 'real-estate-2',
      question: 'J-REITの最大の特徴として適切なものはどれですか？',
      options: [
        '最低投資額が1億円以上必要',
        '利益の90%以上を分配すると法人税が非課税',
        '個人で物件管理が必要',
        '流動性が極めて低い'
      ],
      correctAnswer: 1,
      explanation: 'J-REITは利益の90%以上を投資家に分配することで法人税が非課税となる税制優遇があります。これにより高い分配金利回りが実現できます。また、証券取引所で売買できるため流動性が高く、1万円程度から投資可能です。'
    },
    {
      id: 'real-estate-3',
      question: '実質利回りの計算で考慮すべき経費に含まれないものはどれですか？',
      options: [
        '管理費・修繕積立金',
        '固定資産税・都市計画税',
        '火災保険料',
        '住宅ローンの元本返済額'
      ],
      correctAnswer: 3,
      explanation: '実質利回りの計算では、管理費、修繕積立金、固定資産税、火災保険料などの経費を差し引きますが、住宅ローンの元本返済額は経費ではなく借入金の返済なので含みません。利息部分は経費として計上可能です。'
    },
    {
      id: 'real-estate-4',
      question: '不動産投資で最も重要な要素はどれですか？',
      options: [
        '物件の築年数',
        '物件の立地',
        '表面利回りの高さ',
        '管理会社の規模'
      ],
      correctAnswer: 1,
      explanation: '不動産投資で最も重要なのは「立地」です。立地は後から変更できない要素であり、空室率、家賃水準、資産価値の維持・向上すべてに直結します。駅からの距離、周辺環境、将来性などを総合的に判断する必要があります。'
    },
    {
      id: 'real-estate-5',
      question: 'ポートフォリオにおける不動産（REIT含む）の推奨配分として適切なものはどれですか？',
      options: [
        '0-5%程度',
        '10-20%程度',
        '50-60%程度',
        '80%以上'
      ],
      correctAnswer: 1,
      explanation: '一般的にポートフォリオにおける不動産（REIT含む）の配分は10-20%程度が推奨されます。これにより株式・債券との分散効果を得ながら、安定的な収益を確保できます。ただし、個人の資産規模やリスク許容度により調整が必要です。'
    }
  ],
  
  lastUpdated: '2025-08-15',
  factChecked: true
}