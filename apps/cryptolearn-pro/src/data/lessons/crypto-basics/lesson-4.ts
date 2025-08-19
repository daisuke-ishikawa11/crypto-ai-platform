import type { Lesson } from '@/types';

export const lesson4: Lesson = {
  id: 'crypto-basics-4',
  categoryId: 'crypto-basics',
  title: 'Cryptocurrency vs Traditional Money - 従来通貨との違い',
  slug: 'cryptocurrency-vs-traditional-money',
  description: '暗号通貨と法定通貨の根本的違い、それぞれの長所と短所を詳細に比較分析します。',
  difficultyLevel: 'beginner',
  estimatedMinutes: 16,
  orderIndex: 4,
  content: {
    sections: [
      {
        id: 'section-1',
        title: '法定通貨（フィアット通貨）の本質と2025年の現状',
        orderIndex: 1,
        type: 'text',
        content: `
<p>法定通貨（フィアット通貨）は、政府や中央銀行が発行し、法的な強制力によって価値を保証する通貨システムです。<br/>
「フィアット」はラテン語で「そうあれ」を意味し、政府の宣言により価値が決定されることを表します。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">法定通貨の5つの基本特徴</h2>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem;">
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #fef2f2; border-radius: 8px; border-left: 4px solid #dc2626;">
      <div style="background: #dc2626; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">⚖️</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #dc2626;">法的強制力</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">国家が法律により価値を保証。「法定支払手段」として債務決済が法的に強制</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
      <div style="background: #f59e0b; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">🏦</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #d97706;">中央集権管理</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">中央銀行が供給量・金利・政策を独占的にコントロール。単一の管理機関が存在</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #16a34a;">
      <div style="background: #16a34a; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">📈</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #16a34a;">インフレ政策</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">経済成長促進のため年2-4%のインフレを目標とし、意図的に通貨価値を減少させる</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #fdf4ff; border-radius: 8px; border-left: 4px solid #a855f7;">
      <div style="background: #a855f7; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">💵</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #9333ea;">物理・デジタル形態</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">紙幣・硬貨とデジタル形態で並存。銀行預金の90%以上はデジタル形態</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
      <div style="background: #3b82f6; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">🛡️</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #1e40af;">規制フレームワーク</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">確立された法的枠組み、預金保険、消費者保護制度が整備済み</p>
      </div>
    </div>
    
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年現在の法定通貨システムの利点</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">📊 価格安定性</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">日常的な価格変動が小さく、給与・契約・計画が立てやすい。インフレ目標2-4%で安定</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🌍 広範な受容性</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">世界中でほぼ100%の商店・サービスで利用可能。既存の経済システムに完全統合</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🛡️ 政府保護</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">預金保険（日本1,000万円）、チャージバック制度、詐欺防止など包括的な保護</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🏗️ 成熟インフラ</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">ATM、POS、オンライン決済など数十年かけて構築された包括的決済インフラ</p>
  </div>
</div>

<div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 2025年の法定通貨進化</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">中央銀行デジタル通貨（CBDC）の実用化</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">中国のデジタル人民元、欧州のデジタルユーロ試験運用など、法定通貨のデジタル化が加速。現金とデジタルの利点を組み合わせた新しい通貨形態が登場しています。</p>
</div>
        `
      },
      {
        id: 'section-2',
        title: '通貨発行システムの革命的相違点',
        orderIndex: 2,
        type: 'text',
        content: `
<p>法定通貨と暗号通貨の最も重要な違いは、通貨の発行・管理システムにあります。<br/>
これは単なる技術的差異ではなく、経済哲学の根本的違いを表しています。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">法定通貨 vs 暗号通貨：発行システム比較</h2>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
<div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0; text-align: center;">🏦 法定通貨システム</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
<li><strong>中央銀行独占：</strong> FRB、ECB、日銀による独占的発行権</li>
<li><strong>政治的判断：</strong> 経済状況・政治圧力による供給量調整</li>
<li><strong>量的緩和（QE）：</strong> 危機時の大量通貨供給</li>
<li><strong>信用創造：</strong> 銀行による預金の9倍貸出（部分準備制度）</li>
<li><strong>債務連動：</strong> 政府債務と表裏一体の関係</li>
</ul>
<div style="background: #fca5a5; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong style="color: #991b1b;">特徴：</strong> 人間の判断による柔軟性と主観性
</div>
</div>

<div style="background: #dcfce7; border: 2px solid #a7f3d0; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #16a34a; margin: 0 0 1rem 0; text-align: center;">₿ 暗号通貨システム</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
<li><strong>プログラム規則：</strong> 事前にコードで定義された不変ルール</li>
<li><strong>数学的決定：</strong> アルゴリズムによる自動的供給調整</li>
<li><strong>予測可能性：</strong> 人間の判断による変更不可</li>
<li><strong>分散管理：</strong> 世界中のノードによる共同管理</li>
<li><strong>独立性：</strong> 政府債務・政治から完全独立</li>
</ul>
<div style="background: #86efac; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong style="color: #14532d;">特徴：</strong> アルゴリズムによる客観性と予測可能性
</div>
</div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年現在の供給量データ比較</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white;">
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">通貨</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">供給上限</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">2025年増加率</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">発行機関</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">USD（米ドル）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">無制限</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">2-8%（QE時はさらに高い）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">連邦準備制度（FRB）</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">EUR（ユーロ）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">無制限</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">2-4%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">欧州中央銀行（ECB）</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">JPY（日本円）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">無制限</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">1-3%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">日本銀行（BOJ）</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">CNY（人民元）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">無制限</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">4-8%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">中国人民銀行（PBoC）</td>
</tr>
<tr style="background: #dcfce7; font-weight: bold;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">BTC（ビットコイン）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">2,100万枚</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">1.7% → 0%（2140年）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">分散型ネットワーク</td>
</tr>
</tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">量的緩和（QE）政策の実際の影響</h2>

<div style="background: #fef7ff; border: 2px solid #c084fc; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
  <h3 style="color: #7c3aed; margin: 0 0 1rem 0; text-align: center;">📊 2008-2025年の通貨供給量増大</h3>
  
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem;">
    <div style="background: white; border-radius: 8px; padding: 1rem; text-align: center;">
      <h4 style="margin: 0 0 0.5rem 0; color: #7c3aed;">USD（M2）</h4>
      <p style="margin: 0; font-size: 1.2em; font-weight: bold; color: #dc2626;">+280%</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9em; color: #374151;">8兆 → 30兆ドル</p>
    </div>
    
    <div style="background: white; border-radius: 8px; padding: 1rem; text-align: center;">
      <h4 style="margin: 0 0 0.5rem 0; color: #7c3aed;">EUR（M2）</h4>
      <p style="margin: 0; font-size: 1.2em; font-weight: bold; color: #dc2626;">+190%</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9em; color: #374151;">8兆 → 23兆ユーロ</p>
    </div>
    
    <div style="background: white; border-radius: 8px; padding: 1rem; text-align: center;">
      <h4 style="margin: 0 0 0.5rem 0; color: #7c3aed;">JPY（M2）</h4>
      <p style="margin: 0; font-size: 1.2em; font-weight: bold; color: #dc2626;">+120%</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9em; color: #374151;">800兆 → 1,760兆円</p>
    </div>
  </div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">⚡ 暗号通貨の予測可能性</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">アルゴリズムによる透明性</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">ビットコインの場合、2025年現在約1,970万枚が発行済み。残り130万枚は2140年まで段階的に発行され、その後は永続的に2,100万枚で固定されます。この予測可能性が「デジタルゴールド」としての価値の根拠となっています。</p>
</div>
        `
      },
      {
        id: 'section-3',
        title: '取引システムの決定的違い（2025年版）',
        orderIndex: 3,
        type: 'text',
        content: `
<p>法定通貨と暗号通貨の取引システムは、中介者の有無という根本的な違いがあります。<br/>
この違いがコスト、速度、アクセシビリティのすべてに影響します。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">伝統的銀行システム vs P2P直接取引</h2>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
<div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0; text-align: center;">🏦 伝統的銀行システム</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
<li><strong>仲介者必須：</strong> 銀行、クレジットカード会社、SWIFT</li>
<li><strong>営業時間制限：</strong> 平日9-17時、土日休み</li>
<li><strong>国際送金：</strong> 3-5日、複数銀行経由</li>
<li><strong>KYC/AML：</strong> 身元確認、取引監視、報告義務</li>
<li><strong>可逆取引：</strong> チャージバック、退止手続き</li>
</ul>
<div style="background: #fca5a5; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong style="color: #991b1b;">特徴：</strong> 中介者依存と保護システム
</div>
</div>

<div style="background: #dcfce7; border: 2px solid #a7f3d0; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #16a34a; margin: 0 0 1rem 0; text-align: center;">₿ P2P直接取引</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
<li><strong>仲介者不要：</strong> ウォレットからウォレットへ直接</li>
<li><strong>24/7稼働：</strong> 年中無休、世界共通</li>
<li><strong>国際送金：</strong> 10分-1時間、国境なし</li>
<li><strong>疑似匿名：</strong> アドレスベース、選択的開示</li>
<li><strong>不可逆取引：</strong> ファイナリティ、紛争解決不要</li>
</ul>
<div style="background: #86efac; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong style="color: #14532d;">特徴：</strong> 自己責任と直接所有
</div>
</div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年送金コスト比較（$1,000送金の場合）</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white;">
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">送金手段</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">手数料</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">所要時間</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">利用時間</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">国内銀行送金</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">$0-5</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">即時-1日</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">平日9-17時</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">国際電信送金</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">$25-75</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">3-5営業日</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">平日9-17時</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">Western Union</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">$15-50</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">数分-数時間</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">店舗営業時間</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">PayPal国際送金</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">$12-35</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">数分-数時間</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">24時間</td>
</tr>
<tr style="background: #dcfce7; font-weight: bold;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">Bitcoin</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">$2-15</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">10分-1時間</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">24/7/365</td>
</tr>
<tr style="background: #dcfce7;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">Lightning Network</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">$0.01未満</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">数秒</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">24/7/365</td>
</tr>
<tr style="background: #dcfce7;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">Ethereum</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">$3-25</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">1-15分</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">24/7/365</td>
</tr>
</tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">金融包摂（Financial Inclusion）へのインパクト</h2>

<div style="background: #fef7ff; border: 2px solid #c084fc; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
  <h3 style="color: #7c3aed; margin: 0 0 1rem 0; text-align: center;">🌍 グローバルアクセシビリティーの革命</h3>
  
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-top: 1rem;">
    <div style="background: white; border-radius: 8px; padding: 1.5rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #dc2626;">伝統的銀行システム</h4>
      <ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
        <li>銀行口座なし：世界17億人</li>
        <li>最低残高要求：$50-500</li>
        <li>必須書類：身分証明書、住所証明</li>
        <li>利用料：維持手数料、ATM手数料</li>
      </ul>
    </div>
    
    <div style="background: white; border-radius: 8px; padding: 1.5rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #16a34a;">暗号通貨システム</h4>
      <ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
        <li>アクセス：スマートフォンのみ必要</li>
        <li>最低金額：制限なし（$0.01から）</li>
        <li>必須書類：なし（セルフカスタディ）</li>
        <li>基本料金：無料（ネットワーク手数料のみ）</li>
      </ul>
    </div>
  </div>
</div>

<div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">📱 2025年のスマートフォン普及率</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">モバイルファーストの金融革命</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">世界のスマートフォン普及率は78%に達し、アフリカや南米では銀行サービスを飛び越えて暗号通貨が金融インフラとして機能しています。</p>
</div>
        `
      },
      {
        id: 'section-4',
        title: '価値保存機能と長期投資性能（2025年版）',
        orderIndex: 4,
        type: 'text',
        content: `
<p>通貨の「価値保存機能」は、長期的な購買力を維持する能力です。<br/>
2025年現在、インフレーションと量的緩和政策がこの機能に大きな影響を与えています。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">インフレーションの残酷な現実（1971-2025）</h2>

<div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
  <h3 style="color: #dc2626; margin: 0 0 1rem 0; text-align: center;">📉 法定通貨の購買力減少</h3>
  
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem;">
    <div style="background: white; border-radius: 8px; padding: 1rem; text-align: center;">
      <h4 style="margin: 0 0 0.5rem 0; color: #dc2626;">USD vs 金</h4>
      <p style="margin: 0; font-size: 1.3em; font-weight: bold; color: #dc2626;">-98%</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9em; color: #374151;">1971年から</p>
    </div>
    
    <div style="background: white; border-radius: 8px; padding: 1rem; text-align: center;">
      <h4 style="margin: 0 0 0.5rem 0; color: #dc2626;">JPY vs 米</h4>
      <p style="margin: 0; font-size: 1.3em; font-weight: bold; color: #dc2626;">-88%</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9em; color: #374151;">1990年から</p>
    </div>
    
    <div style="background: white; border-radius: 8px; padding: 1rem; text-align: center;">
      <h4 style="margin: 0 0 0.5rem 0; color: #dc2626;">EUR vs 不動産</h4>
      <p style="margin: 0; font-size: 1.3em; font-weight: bold; color: #dc2626;">-75%</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9em; color: #374151;">1999年から</p>
    </div>
  </div>
  
  <div style="background: #fca5a5; padding: 1rem; border-radius: 8px; margin: 1rem 0; text-align: center;">
    <strong style="color: #991b1b;">結論：</strong> 法定通貨での貯蓄は長期的に購買力を失う
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年投資パフォーマンス比較（年化リターン）</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: linear-gradient(90deg, #16a34a 0%, #15803d 100%); color: white;">
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">資産クラス</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">2013-2024年</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">2020-2024年</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">リスクレベル</th>
</tr>
</thead>
<tbody>
<tr style="background: #dcfce7; font-weight: bold;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">Bitcoin（BTC）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+145%/年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+52%/年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">非常に高</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">Ethereum（ETH）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+89%/年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+28%/年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">非常に高</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">NASDAQ100</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+18%/年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+15%/年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">中程度</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">S&P500</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+12%/年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+11%/年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">中程度</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">金（ゴールド）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+6%/年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+8%/年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">低</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">不動産REIT</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+7%/年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">+5%/年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">中程度</td>
</tr>
<tr style="background: #fef2f2;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">現金貯蓄（USD）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">-3%/年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">-6%/年</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">極低</td>
</tr>
</tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">暗号通貨の「デジタルゴールド」特性</h2>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🔒 プログラムされた希少性</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">人間の判断で変更不可。数学的に保証された供給上限</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🌍 グローバルアクセス</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">国境や政治情勢に左右されない世界共通の価値貯蔵手段</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">⚡ 24/7流動性</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">取引所で年中無休で売買可能。伝統的な金より流動性が高い</p>
  </div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">📊 2025年のマクロ経済環境</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">インフレーションへの対応策</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">主要中央銀行は2025年もインフレーション対策で金利を調整中。個人投資家は「インフレーションヘッジ」として暗号通貨、金、不動産などのハードアセットへの分散投資を検討しています。</p>
</div>
        `
      }
    ],
    keyPoints: [
      '法定通貨は中央銀行管理、暗号通貨は分散型アルゴリズムで管理',
      '法定通貨は無制限供給（QE政策）、ビットコインは2,100万枚の絶対上限',
      '暗号通貨は24/7グローバル取引、国際送金が銀行より95%安く高速',
      '法定通貨は短期安定性、暗号通貨は長期価値保存機能（デジタルゴールド）',
      '金融包摂：銀行口座なし世界17億人がスマートフォンで暗号通貨アクセス可能',
      '2025年現在、両システムは競争関係から相互補完関係へ進化中'
    ],
    summary: '法定通貨と暗号通貨は管理システム、供給メカニズム、価値保存機能が根本的に異なります。2025年現在、法定通貨は短期的安定性と幅広い受容性、暗号通貨は長期的価値保存とグローバルアクセシビリティを提供。両者は相互補完的な存在として新しい金融エコシステムを形成しています。',
    practicalExamples: [
      '国際送金革命：銀行経由3-5日・手数料3-5% vs ビットコイン10分-1時間・手数料0.1-1%',
      'インフレーションヘッジ：2025年現在、現金貯蓄年間-3%の実質损失 vs ビットコイン+50-100%の年化リターン',
      '金融包摂革命：世界17億人の銀行口座なし人口がスマートフォンで暗号通貨銀行サービス利用可能',
      'ハイパーインフレ対応：アルゼンチン（インフレ率100%+）、トルコ（リラ安）でビットコイン需要急増',
      'CBDC実用化：中国デジタル人民元の流通量が1日1兆人民元を超え、法定通貨のデジタル化が加速'
    ],
    warningNotes: [
      '暗号通貨のボラティリティ：1日で20-50%の価格変動が可能、投資は余裕資金で行う',
      '規制リスク：各国政府の規制変更で取引所アクセスや使用が制限される可能性',
      'セルフカスタディリスク：秘密鍵を紛失すると資産に永久アクセス不可（年間推定40万BTC喪失）',
      '日常決済適用：法定通貨の方が価格安定性と受容性で優位',
      '税務複雑性：暗号通貨は売買ごとに损益計算が必要、税務専門家の相談推奨',
      'この情報は教育目的のみであり、投資助言ではありません。暗号資産投資は元本喪失リスクを含む高リスク投資です。'
    ]
  },
  quiz: [
    {
      id: 'crypto-basics-4-q1',
      question: '2025年現在、$1,000の国際送金で最も手数料が安いのは？',
      options: [
        '国際電信送金（$25-75）',
        'Lightning Network（$0.01未満）',
        'PayPal国際送金（$12-35）',
        'Western Union（$15-50）'
      ],
      correctAnswer: 1,
      explanation: 'Lightning Networkはビットコインのセカンドレイヤーソリューションで、数秒で$0.01未満の手数料で国際送金が可能です。'
    },
    {
      id: 'crypto-basics-4-q2',
      question: '2008-2025年の期間で、米ドルの通貨供給量（M2）はどの程度増加しましたか？',
      options: [
        '約+80%',
        '約+180%',
        '約+280%',
        '約+380%'
      ],
      correctAnswer: 2,
      explanation: '2008年の金融危機後、米連邦準備制度の量的緩和政策により、ドル供給量は8兆ドルから約30兆ドルへ、280%増加しました。'
    },
    {
      id: 'crypto-basics-4-q3',
      question: '法定通貨と暗号通貨の管理システムの最大の違いは？',
      options: [
        '中央集権管理 vs 分散型アルゴリズム管理',
        '物理的形態 vs デジタル形態',
        '高手数料 vs 低手数料',
        '遅い処理速度 vs 高速処理'
      ],
      correctAnswer: 0,
      explanation: '法定通貨は中央銀行が一元的に管理し、暗号通貨は世界中のノードがアルゴリズムに従って分散管理するという根本的違いがあります。'
    },
    {
      id: 'crypto-basics-4-q4',
      question: 'ビットコインが「デジタルゴールド」と呼ばれる理由は？',
      options: [
        '物理的な金より高価だから',
        '投資リターンが高いから',
        '供給上限があり希少性がプログラムされているから',
        '銀行が採用しているから'
      ],
      correctAnswer: 2,
      explanation: 'ビットコインは2,100万枚の絶対的供給上限がコードで固定されており、金と同様に希少性とインフレ耐性を持つためです。'
    },
    {
      id: 'crypto-basics-4-q5',
      question: '2025年現在、世界で銀行口座を持たない人の数は約何人ですか？',
      options: [
        '約170万人',
        '約1,700万人',
        '約1億5,000万人',
        '約17億人'
      ],
      correctAnswer: 3,
      explanation: '世界には約17億人の銀行口座を持たない人がおり、スマートフォンさえあれば暗号通貨で金融サービスにアクセスできます。'
    },
    {
      id: 'crypto-basics-4-q6',
      question: '1971年から現在まで、米ドルの金に対する購買力はどの程度減少しましたか？',
      options: [
        '約-50%',
        '約-75%',
        '約-90%',
        '約-98%'
      ],
      correctAnswer: 3,
      explanation: '1971年のニクソンショック（金本位制廃止）以降、ドルは金に対して約98%の購買力を失い、インフレーションの累積的影響を示しています。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};