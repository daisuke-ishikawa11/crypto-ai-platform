import type { Lesson } from '@/lib/types/learning'

export const lesson20: Lesson = {
  id: 'esg-sustainable-investing',
  categoryId: 'financial-literacy',
  title: 'ESG投資と持続可能な投資戦略の実践',
  slug: 'esg-sustainable-investing',
  description: 'ESG投資の基本概念から実践的な投資戦略まで、持続可能性と収益性を両立する投資手法を学び、責任ある投資家としてのアプローチを身につけます。',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 50,
  orderIndex: 20,
  isPublished: true,
  tags: ['金融リテラシー', 'ESG投資', '持続可能性', '責任投資'],
  
  content: {
    sections: [
      {
        type: 'text',
        title: 'ESG投資の基本概念と背景',
        content: `
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 1rem; color: white; margin-bottom: 2rem;">
  <h2 style="margin: 0 0 1rem 0; font-size: 2rem;">ESG投資の時代へ</h2>
  <p style="font-size: 1.1rem; line-height: 1.8;">
    世界的に注目されるESG投資。環境・社会・ガバナンスを重視した投資は、もはや特別なものではなく、現代投資家の必須知識となっています。
  </p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">1. ESGとは何か</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">ESGの3つの要素</h3>
<div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); padding: 1.5rem; border-radius: 0.5rem; margin: 1.5rem 0;">
  <h4 style="color: #064e3b; margin: 0 0 1rem 0;">🌱 ESGの構成要素</h4>
  
  <div style="display: flex; gap: 1rem;">
    <div style="flex: 1; background: rgba(255,255,255,0.9); padding: 1rem; border-radius: 0.5rem;">
      <h5 style="color: #064e3b; margin: 0 0 0.5rem 0; text-align: center;">🌍 Environment（環境）</h5>
      <ul style="color: #065f46; margin: 0; padding-left: 1rem; font-size: 0.9rem;">
        <li>気候変動対策</li>
        <li>再生可能エネルギー</li>
        <li>廃棄物削減</li>
        <li>生物多様性保護</li>
        <li>資源効率性</li>
      </ul>
    </div>
    
    <div style="flex: 1; background: rgba(255,255,255,0.9); padding: 1rem; border-radius: 0.5rem;">
      <h5 style="color: #064e3b; margin: 0 0 0.5rem 0; text-align: center;">🤝 Social（社会）</h5>
      <ul style="color: #065f46; margin: 0; padding-left: 1rem; font-size: 0.9rem;">
        <li>労働者の権利</li>
        <li>人権尊重</li>
        <li>地域社会貢献</li>
        <li>製品・サービス品質</li>
        <li>多様性・平等性</li>
      </ul>
    </div>
    
    <div style="flex: 1; background: rgba(255,255,255,0.9); padding: 1rem; border-radius: 0.5rem;">
      <h5 style="color: #064e3b; margin: 0 0 0.5rem 0; text-align: center;">🏛️ Governance（ガバナンス）</h5>
      <ul style="color: #065f46; margin: 0; padding-left: 1rem; font-size: 0.9rem;">
        <li>透明性・開示</li>
        <li>取締役会の独立性</li>
        <li>リスク管理</li>
        <li>倫理・コンプライアンス</li>
        <li>株主権利の尊重</li>
      </ul>
    </div>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">ESG投資の歴史的発展</h3>
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: linear-gradient(90deg, #4f46e5, #7c3aed); color: white;">
      <th style="padding: 1rem; text-align: left; border: 1px solid #e5e7eb;">時期</th>
      <th style="padding: 1rem; text-align: left; border: 1px solid #e5e7eb;">発展段階</th>
      <th style="padding: 1rem; text-align: left; border: 1px solid #e5e7eb;">主な特徴</th>
      <th style="padding: 1rem; text-align: left; border: 1px solid #e5e7eb;">背景・きっかけ</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #f9fafb;">
      <td style="padding: 1rem; border: 1px solid #e5e7eb;"><strong>1960-70年代</strong></td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">社会的責任投資（SRI）</td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">特定業界の排除</td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">ベトナム戦争、公民権運動</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem; border: 1px solid #e5e7eb;"><strong>1980-90年代</strong></td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">環境・社会スクリーニング</td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">ポジティブ・ネガティブスクリーン</td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">環境問題の深刻化</td>
    </tr>
    <tr style="background: #f9fafb;">
      <td style="padding: 1rem; border: 1px solid #e5e7eb;"><strong>2000年代</strong></td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">ESG統合</td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">財務分析にESG要素組み込み</td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">ESG概念の確立</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem; border: 1px solid #e5e7eb;"><strong>2010年代～</strong></td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">主流化・制度化</td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">規制強化、標準化</td>
      <td style="padding: 1rem; border: 1px solid #e5e7eb;">気候変動、SDGs</td>
    </tr>
  </tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2. ESG投資の現在地</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">世界のESG投資規模</h3>
<div style="background: #fef3c7; padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #f59e0b; margin: 1.5rem 0;">
  <h4 style="color: #92400e; margin: 0 0 1rem 0;">📊 ESG投資の急成長</h4>
  <div style="background: white; padding: 1rem; border-radius: 0.5rem;">
    <table style="width: 100%; margin: 0;">
      <tr style="background: #fef3c7;">
        <td style="padding: 0.5rem; font-weight: bold;">2018年</td>
        <td style="padding: 0.5rem;">31兆ドル</td>
        <td style="padding: 0.5rem;">全投資の約33%</td>
      </tr>
      <tr>
        <td style="padding: 0.5rem; font-weight: bold;">2020年</td>
        <td style="padding: 0.5rem;">35兆ドル</td>
        <td style="padding: 0.5rem;">全投資の約36%</td>
      </tr>
      <tr style="background: #fef3c7;">
        <td style="padding: 0.5rem; font-weight: bold;">2022年</td>
        <td style="padding: 0.5rem;">30兆ドル</td>
        <td style="padding: 0.5rem;">全投資の約34%</td>
      </tr>
      <tr>
        <td style="padding: 0.5rem; font-weight: bold;"><strong>2024年予測</strong></td>
        <td style="padding: 0.5rem; color: #16a34a;"><strong>53兆ドル</strong></td>
        <td style="padding: 0.5rem; color: #16a34a;"><strong>全投資の約50%</strong></td>
      </tr>
    </table>
  </div>
  <p style="color: #78350f; margin: 1rem 0 0 0; font-size: 0.9rem;">
    <strong>注目：</strong>2022年の一時的減少は市場全体の低迷によるもの。ESG投資への関心は継続的に高まっている。
  </p>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">地域別ESG投資の特徴</h3>
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: linear-gradient(90deg, #10b981, #3b82f6); color: white;">
      <th style="padding: 1rem;">地域</th>
      <th style="padding: 1rem;">投資規模</th>
      <th style="padding: 1rem;">主な特徴</th>
      <th style="padding: 1rem;">重点分野</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #f0fdf4;">
      <td style="padding: 1rem;"><strong>欧州</strong></td>
      <td style="padding: 1rem;">12.0兆ドル</td>
      <td style="padding: 1rem;">規制主導、統合重視</td>
      <td style="padding: 1rem;">気候変動、人権</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>米国</strong></td>
      <td style="padding: 1rem;">8.4兆ドル</td>
      <td style="padding: 1rem;">市場主導、収益重視</td>
      <td style="padding: 1rem;">ガバナンス、テクノロジー</td>
    </tr>
    <tr style="background: #f0fdf4;">
      <td style="padding: 1rem;"><strong>カナダ</strong></td>
      <td style="padding: 1rem;">3.8兆ドル</td>
      <td style="padding: 1rem;">年金基金中心</td>
      <td style="padding: 1rem;">環境、先住民権利</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>アジア太平洋</strong></td>
      <td style="padding: 1rem;">2.3兆ドル</td>
      <td style="padding: 1rem;">急成長中、多様性</td>
      <td style="padding: 1rem;">社会課題、ガバナンス</td>
    </tr>
    <tr style="background: #f0fdf4;">
      <td style="padding: 1rem;"><strong>日本</strong></td>
      <td style="padding: 1rem;">2.9兆ドル</td>
      <td style="padding: 1rem;">制度投資家主導</td>
      <td style="padding: 1rem;">コーポレートガバナンス</td>
    </tr>
  </tbody>
</table>
        `
      },
      {
        type: 'text',
        title: 'ESG投資の手法とアプローチ',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">3. ESG投資の主要戦略</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">7つのESG投資アプローチ</h3>
<div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); padding: 1.5rem; border-radius: 0.5rem; margin: 1.5rem 0;">
  <h4 style="color: #7c2d12; margin: 0 0 1rem 0;">🎯 ESG投資戦略の分類</h4>
  
  <div style="background: rgba(255,255,255,0.95); padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.75rem;">
    <h5 style="color: #dc2626; margin: 0 0 0.5rem 0;">1. ネガティブスクリーニング</h5>
    <p style="color: #7c2d12; margin: 0; font-size: 0.9rem;">
      特定の業界・企業を除外する手法。最も一般的なESG投資手法（武器、タバコ、化石燃料など）
    </p>
  </div>
  
  <div style="background: rgba(255,255,255,0.95); padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.75rem;">
    <h5 style="color: #ea580c; margin: 0 0 0.5rem 0;">2. ポジティブスクリーニング</h5>
    <p style="color: #7c2d12; margin: 0; font-size: 0.9rem;">
      ESG評価の高い企業を積極的に選定。各業界内での優良企業を選別
    </p>
  </div>
  
  <div style="background: rgba(255,255,255,0.95); padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.75rem;">
    <h5 style="color: #f59e0b; margin: 0 0 0.5rem 0;">3. 国際規範スクリーニング</h5>
    <p style="color: #7c2d12; margin: 0; font-size: 0.9rem;">
      国際的な基準（国連グローバル・コンパクトなど）に基づく選別
    </p>
  </div>
  
  <div style="background: rgba(255,255,255,0.95); padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.75rem;">
    <h5 style="color: #16a34a; margin: 0 0 0.5rem 0;">4. ESG統合</h5>
    <p style="color: #7c2d12; margin: 0; font-size: 0.9rem;">
      従来の財務分析にESG要因を体系的に組み込む手法
    </p>
  </div>
  
  <div style="background: rgba(255,255,255,0.95); padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.75rem;">
    <h5 style="color: #3b82f6; margin: 0 0 0.5rem 0;">5. サステナビリティテーマ投資</h5>
    <p style="color: #7c2d12; margin: 0; font-size: 0.9rem;">
      特定のテーマ（再生可能エネルギー、水資源など）に焦点を当てた投資
    </p>
  </div>
  
  <div style="background: rgba(255,255,255,0.95); padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.75rem;">
    <h5 style="color: #8b5cf6; margin: 0 0 0.5rem 0;">6. インパクト投資</h5>
    <p style="color: #7c2d12; margin: 0; font-size: 0.9rem;">
      財務リターンと並行して、測定可能な社会・環境インパクトを追求
    </p>
  </div>
  
  <div style="background: rgba(255,255,255,0.95); padding: 1rem; border-radius: 0.5rem;">
    <h5 style="color: #ec4899; margin: 0 0 0.5rem 0;">7. 株主エンゲージメント</h5>
    <p style="color: #7c2d12; margin: 0; font-size: 0.9rem;">
      投資先企業との対話・議決権行使を通じたESG改善の働きかけ
    </p>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">ESG評価機関と指標</h3>
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: #dc2626; color: white;">
      <th style="padding: 1rem;">評価機関</th>
      <th style="padding: 1rem;">特徴</th>
      <th style="padding: 1rem;">評価スケール</th>
      <th style="padding: 1rem;">強み・弱み</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #fee2e2;">
      <td style="padding: 1rem;"><strong>MSCI ESG</strong></td>
      <td style="padding: 1rem;">最大手、包括的評価</td>
      <td style="padding: 1rem;">AAA〜CCC（7段階）</td>
      <td style="padding: 1rem;">網羅性高い/業界偏重</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>Sustainalytics</strong></td>
      <td style="padding: 1rem;">リスクベースアプローチ</td>
      <td style="padding: 1rem;">0-100点（リスクスコア）</td>
      <td style="padding: 1rem;">リスク重視/定量化困難</td>
    </tr>
    <tr style="background: #fee2e2;">
      <td style="padding: 1rem;"><strong>Refinitiv</strong></td>
      <td style="padding: 1rem;">データ重視、透明性高</td>
      <td style="padding: 1rem;">0-100点</td>
      <td style="padding: 1rem;">データ豊富/解釈複雑</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>S&P Global</strong></td>
      <td style="padding: 1rem;">信用格付けとの連携</td>
      <td style="padding: 1rem;">0-100点</td>
      <td style="padding: 1rem;">信用分析強み/歴史浅い</td>
    </tr>
    <tr style="background: #fee2e2;">
      <td style="padding: 1rem;"><strong>CDP</strong></td>
      <td style="padding: 1rem;">環境開示専門</td>
      <td style="padding: 1rem;">A〜D-（8段階）</td>
      <td style="padding: 1rem;">環境特化/範囲限定的</td>
    </tr>
  </tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">4. 具体的なESG投資商品</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">日本のESG投資信託（例）</h3>
<div style="background: #f0f9ff; padding: 1.5rem; border-radius: 0.5rem; border: 2px solid #0284c7; margin: 1.5rem 0;">
  <h4 style="color: #075985; margin: 0 0 1rem 0;">🏛️ 主要ESGファンド一覧</h4>
  
  <table style="width: 100%; background: white; border-radius: 0.5rem;">
    <thead>
      <tr style="background: #0284c7; color: white;">
        <th style="padding: 0.75rem;">ファンド名</th>
        <th style="padding: 0.75rem;">運用会社</th>
        <th style="padding: 0.75rem;">純資産総額</th>
        <th style="padding: 0.75rem;">信託報酬</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 0.75rem;"><strong>eMAXIS Slim全世界株式（除く日本）</strong></td>
        <td style="padding: 0.75rem;">三菱UFJ国際</td>
        <td style="padding: 0.75rem;">3,000億円</td>
        <td style="padding: 0.75rem;">0.05775%</td>
      </tr>
      <tr style="background: #e0f2fe;">
        <td style="padding: 0.75rem;"><strong>SBI・V・S&P500インデックス</strong></td>
        <td style="padding: 0.75rem;">SBI</td>
        <td style="padding: 0.75rem;">1,500億円</td>
        <td style="padding: 0.75rem;">0.0938%</td>
      </tr>
      <tr>
        <td style="padding: 0.75rem;"><strong>ニッセイSDGs日本株ファンド</strong></td>
        <td style="padding: 0.75rem;">ニッセイ</td>
        <td style="padding: 0.75rem;">800億円</td>
        <td style="padding: 0.75rem;">1.045%</td>
      </tr>
      <tr style="background: #e0f2fe;">
        <td style="padding: 0.75rem;"><strong>野村ESG10種</strong></td>
        <td style="padding: 0.75rem;">野村</td>
        <td style="padding: 0.75rem;">600億円</td>
        <td style="padding: 0.75rem;">0.55%</td>
      </tr>
      <tr>
        <td style="padding: 0.75rem;"><strong>大和住銀DC海外株式ESG</strong></td>
        <td style="padding: 0.75rem;">三井住友DS</td>
        <td style="padding: 0.75rem;">400億円</td>
        <td style="padding: 0.75rem;">1.65%</td>
      </tr>
    </tbody>
  </table>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">ESG ETFの選択肢</h3>
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: linear-gradient(90deg, #8b5cf6, #a855f7); color: white;">
      <th style="padding: 1rem;">ETF名（コード）</th>
      <th style="padding: 1rem;">対象指数</th>
      <th style="padding: 1rem;">経費率</th>
      <th style="padding: 1rem;">特徴</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #faf5ff;">
      <td style="padding: 1rem;"><strong>iShares MSCI KLD 400 Social ETF（DSI）</strong></td>
      <td style="padding: 1rem;">MSCI KLD 400 Social Index</td>
      <td style="padding: 1rem;">0.25%</td>
      <td style="padding: 1rem;">米国ESG大手</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>Vanguard ESG U.S. Stock ETF（ESGV）</strong></td>
      <td style="padding: 1rem;">FTSE US All Cap Choice Index</td>
      <td style="padding: 1rem;">0.12%</td>
      <td style="padding: 1rem;">低コストESG</td>
    </tr>
    <tr style="background: #faf5ff;">
      <td style="padding: 1rem;"><strong>iShares MSCI ACWI ESG（SUSL）</strong></td>
      <td style="padding: 1rem;">MSCI ACWI ESG Focus Index</td>
      <td style="padding: 1rem;">0.20%</td>
      <td style="padding: 1rem;">グローバルESG</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>NEXT FUNDS 日経225ESG（2631）</strong></td>
      <td style="padding: 1rem;">日経225 ESG指数</td>
      <td style="padding: 1rem;">0.308%</td>
      <td style="padding: 1rem;">日本市場</td>
    </tr>
  </tbody>
</table>
        `
      },
      {
        type: 'text',
        title: 'ESG投資の収益性とパフォーマンス分析',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">5. ESG投資のパフォーマンス実績</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">長期パフォーマンスの比較</h3>
<div style="background: #fff7ed; padding: 1.5rem; border-radius: 0.5rem; border: 2px solid #ea580c; margin: 1.5rem 0;">
  <h4 style="color: #7c2d12; margin: 0 0 1rem 0;">📈 ESG vs 一般投資の収益比較</h4>
  
  <table style="width: 100%; background: white; border-radius: 0.5rem;">
    <thead>
      <tr style="background: #ea580c; color: white;">
        <th style="padding: 0.75rem;">期間</th>
        <th style="padding: 0.75rem;">MSCI World ESG</th>
        <th style="padding: 0.75rem;">MSCI World</th>
        <th style="padding: 0.75rem;">超過収益</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 0.75rem;"><strong>1年</strong></td>
        <td style="padding: 0.75rem; text-align: center;">12.5%</td>
        <td style="padding: 0.75rem; text-align: center;">11.8%</td>
        <td style="padding: 0.75rem; text-align: center; color: #16a34a;">+0.7%</td>
      </tr>
      <tr style="background: #fff7ed;">
        <td style="padding: 0.75rem;"><strong>3年</strong></td>
        <td style="padding: 0.75rem; text-align: center;">8.9%</td>
        <td style="padding: 0.75rem; text-align: center;">8.2%</td>
        <td style="padding: 0.75rem; text-align: center; color: #16a34a;">+0.7%</td>
      </tr>
      <tr>
        <td style="padding: 0.75rem;"><strong>5年</strong></td>
        <td style="padding: 0.75rem; text-align: center;">10.1%</td>
        <td style="padding: 0.75rem; text-align: center;">9.6%</td>
        <td style="padding: 0.75rem; text-align: center; color: #16a34a;">+0.5%</td>
      </tr>
      <tr style="background: #fff7ed;">
        <td style="padding: 0.75rem;"><strong>10年</strong></td>
        <td style="padding: 0.75rem; text-align: center;">9.8%</td>
        <td style="padding: 0.75rem; text-align: center;">9.5%</td>
        <td style="padding: 0.75rem; text-align: center; color: #16a34a;">+0.3%</td>
      </tr>
    </tbody>
  </table>
  
  <p style="color: #7c2d12; margin: 1rem 0 0 0; font-size: 0.9rem;">
    <strong>注目：</strong>ESG投資は一般投資と同等以上のリターンを実現しつつ、リスクが低い傾向
  </p>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">リスク調整後リターンの分析</h3>
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: linear-gradient(90deg, #10b981, #14b8a6); color: white;">
      <th style="padding: 1rem;">指標</th>
      <th style="padding: 1rem;">ESG投資</th>
      <th style="padding: 1rem;">一般投資</th>
      <th style="padding: 1rem;">ESGの優位性</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #f0fdf4;">
      <td style="padding: 1rem;"><strong>年間リターン</strong></td>
      <td style="padding: 1rem; text-align: center;">9.8%</td>
      <td style="padding: 1rem; text-align: center;">9.5%</td>
      <td style="padding: 1rem; text-align: center; color: #16a34a;">+0.3%</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>ボラティリティ</strong></td>
      <td style="padding: 1rem; text-align: center;">14.2%</td>
      <td style="padding: 1rem; text-align: center;">15.1%</td>
      <td style="padding: 1rem; text-align: center; color: #16a34a;">-0.9%</td>
    </tr>
    <tr style="background: #f0fdf4;">
      <td style="padding: 1rem;"><strong>シャープレシオ</strong></td>
      <td style="padding: 1rem; text-align: center;">0.69</td>
      <td style="padding: 1rem; text-align: center;">0.63</td>
      <td style="padding: 1rem; text-align: center; color: #16a34a;">+0.06</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>最大ドローダウン</strong></td>
      <td style="padding: 1rem; text-align: center;">-32.1%</td>
      <td style="padding: 1rem; text-align: center;">-34.7%</td>
      <td style="padding: 1rem; text-align: center; color: #16a34a;">+2.6%</td>
    </tr>
  </tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">6. ESG投資が注目される理由</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">財務パフォーマンスへの影響要因</h3>
<div style="background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%); padding: 1.5rem; border-radius: 0.5rem; margin: 1.5rem 0;">
  <h4 style="color: #064e3b; margin: 0 0 1rem 0;">💡 ESG要因が企業価値に与える影響</h4>
  
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
    <div style="background: rgba(255,255,255,0.9); padding: 1rem; border-radius: 0.5rem;">
      <h5 style="color: #064e3b; margin: 0 0 0.5rem 0;">🌍 環境要因</h5>
      <ul style="color: #065f46; margin: 0; padding-left: 1rem; font-size: 0.85rem;">
        <li>エネルギー効率による原価削減</li>
        <li>炭素税リスクの回避</li>
        <li>資源価格変動への対応力</li>
        <li>規制リスクの最小化</li>
      </ul>
    </div>
    
    <div style="background: rgba(255,255,255,0.9); padding: 1rem; border-radius: 0.5rem;">
      <h5 style="color: #064e3b; margin: 0 0 0.5rem 0;">🤝 社会要因</h5>
      <ul style="color: #065f46; margin: 0; padding-left: 1rem; font-size: 0.85rem;">
        <li>従業員満足度と生産性向上</li>
        <li>ブランド価値の向上</li>
        <li>顧客ロイヤルティの強化</li>
        <li>人材獲得・定着の優位性</li>
      </ul>
    </div>
    
    <div style="background: rgba(255,255,255,0.9); padding: 1rem; border-radius: 0.5rem;">
      <h5 style="color: #064e3b; margin: 0 0 0.5rem 0;">🏛️ ガバナンス要因</h5>
      <ul style="color: #065f46; margin: 0; padding-left: 1rem; font-size: 0.85rem;">
        <li>透明性による投資家信頼獲得</li>
        <li>リスク管理の高度化</li>
        <li>不正・汚職リスクの軽減</li>
        <li>長期戦略の明確化</li>
      </ul>
    </div>
    
    <div style="background: rgba(255,255,255,0.9); padding: 1rem; border-radius: 0.5rem;">
      <h5 style="color: #064e3b; margin: 0 0 0.5rem 0;">📊 統合効果</h5>
      <ul style="color: #065f46; margin: 0; padding-left: 1rem; font-size: 0.85rem;">
        <li>資本コストの低下</li>
        <li>バリュエーション向上</li>
        <li>長期持続成長性</li>
        <li>危機耐性の強化</li>
      </ul>
    </div>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">投資家・資金の流入要因</h3>
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: #7c3aed; color: white;">
      <th style="padding: 1rem;">投資家タイプ</th>
      <th style="padding: 1rem;">ESG投資への動機</th>
      <th style="padding: 1rem;">影響規模</th>
      <th style="padding: 1rem;">今後の見通し</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #faf5ff;">
      <td style="padding: 1rem;"><strong>年金基金</strong></td>
      <td style="padding: 1rem;">受益者の長期利益</td>
      <td style="padding: 1rem;">15兆ドル+</td>
      <td style="padding: 1rem; color: #16a34a;">拡大継続</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>保険会社</strong></td>
      <td style="padding: 1rem;">長期負債との整合性</td>
      <td style="padding: 1rem;">10兆ドル+</td>
      <td style="padding: 1rem; color: #16a34a;">着実な成長</td>
    </tr>
    <tr style="background: #faf5ff;">
      <td style="padding: 1rem;"><strong>個人投資家</strong></td>
      <td style="padding: 1rem;">価値観との一致</td>
      <td style="padding: 1rem;">5兆ドル+</td>
      <td style="padding: 1rem; color: #16a34a;">急成長</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>ソブリンファンド</strong></td>
      <td style="padding: 1rem;">国家的責任・リスク管理</td>
      <td style="padding: 1rem;">3兆ドル+</td>
      <td style="padding: 1rem; color: #16a34a;">政策支援</td>
    </tr>
    <tr style="background: #faf5ff;">
      <td style="padding: 1rem;"><strong>ファミリーオフィス</strong></td>
      <td style="padding: 1rem;">次世代への遺産継承</td>
      <td style="padding: 1rem;">1兆ドル+</td>
      <td style="padding: 1rem; color: #16a34a;">高い関心</td>
    </tr>
  </tbody>
</table>
        `
      },
      {
        type: 'text',
        title: 'グリーンウォッシングとESG投資の課題',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">7. ESG投資の課題と注意点</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">グリーンウォッシングの実態</h3>
<div style="background: #fef2f2; padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #dc2626; margin: 1.5rem 0;">
  <h4 style="color: #991b1b; margin: 0 0 1rem 0;">⚠️ グリーンウォッシングの手法</h4>
  
  <div style="background: white; padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.75rem;">
    <h5 style="color: #dc2626; margin: 0 0 0.5rem 0;">1. 選択的開示</h5>
    <p style="color: #7f1d1d; margin: 0; font-size: 0.9rem;">
      有利な情報のみを強調し、不利な情報を隠蔽・軽視する手法
    </p>
  </div>
  
  <div style="background: white; padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.75rem;">
    <h5 style="color: #dc2626; margin: 0 0 0.5rem 0;">2. 曖昧な表現</h5>
    <p style="color: #7f1d1d; margin: 0; font-size: 0.9rem;">
      「環境配慮」「持続可能」など具体性を欠く表現で消費者を誤導
    </p>
  </div>
  
  <div style="background: white; padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.75rem;">
    <h5 style="color: #dc2626; margin: 0 0 0.5rem 0;">3. 些細な改善の誇大宣伝</h5>
    <p style="color: #7f1d1d; margin: 0; font-size: 0.9rem;">
      小さな環境改善を大々的にアピールし、本質的問題から注意を逸らす
    </p>
  </div>
  
  <div style="background: white; padding: 1rem; border-radius: 0.5rem;">
    <h5 style="color: #dc2626; margin: 0 0 0.5rem 0;">4. 根拠のない主張</h5>
    <p style="color: #7f1d1d; margin: 0; font-size: 0.9rem;">
      第三者機関の認証や具体的データの裏付けなく環境効果を主張
    </p>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">グリーンウォッシング回避のチェックポイント</h3>
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: #dc2626; color: white;">
      <th style="padding: 1rem;">確認項目</th>
      <th style="padding: 1rem;">良い例</th>
      <th style="padding: 1rem;">悪い例</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #fee2e2;">
      <td style="padding: 1rem;"><strong>具体的な目標設定</strong></td>
      <td style="padding: 1rem; color: #16a34a;">「2030年までにCO2を50%削減」</td>
      <td style="padding: 1rem; color: #dc2626;">「環境負荷を削減します」</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>進捗の測定・報告</strong></td>
      <td style="padding: 1rem; color: #16a34a;">年次ESG報告書で定量開示</td>
      <td style="padding: 1rem; color: #dc2626;">定性的な説明のみ</td>
    </tr>
    <tr style="background: #fee2e2;">
      <td style="padding: 1rem;"><strong>第三者認証</strong></td>
      <td style="padding: 1rem; color: #16a34a;">SBTi認証、GRI基準準拠</td>
      <td style="padding: 1rem; color: #dc2626;">自社基準のみ</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>包括的な取り組み</strong></td>
      <td style="padding: 1rem; color: #16a34a;">バリューチェーン全体を対象</td>
      <td style="padding: 1rem; color: #dc2626;">一部の事業のみ</td>
    </tr>
  </tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">8. ESG評価の課題と限界</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">評価機関間の格差問題</h3>
<div style="background: #fef3c7; padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #f59e0b; margin: 1.5rem 0;">
  <h4 style="color: #92400e; margin: 0 0 1rem 0;">📊 ESG評価の不一致例</h4>
  
  <table style="width: 100%; background: white; border-radius: 0.5rem;">
    <thead>
      <tr style="background: #f59e0b; color: white;">
        <th style="padding: 0.75rem;">企業例</th>
        <th style="padding: 0.75rem;">MSCI</th>
        <th style="padding: 0.75rem;">Sustainalytics</th>
        <th style="padding: 0.75rem;">S&P Global</th>
        <th style="padding: 0.75rem;">評価の幅</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 0.75rem;"><strong>Tesla</strong></td>
        <td style="padding: 0.75rem; text-align: center;">A</td>
        <td style="padding: 0.75rem; text-align: center;">High Risk</td>
        <td style="padding: 0.75rem; text-align: center;">B+</td>
        <td style="padding: 0.75rem; color: #dc2626;">大きな差</td>
      </tr>
      <tr style="background: #fef3c7;">
        <td style="padding: 0.75rem;"><strong>ExxonMobil</strong></td>
        <td style="padding: 0.75rem; text-align: center;">BBB</td>
        <td style="padding: 0.75rem; text-align: center;">High Risk</td>
        <td style="padding: 0.75rem; text-align: center;">C-</td>
        <td style="padding: 0.75rem; color: #dc2626;">中程度の差</td>
      </tr>
      <tr>
        <td style="padding: 0.75rem;"><strong>Apple</strong></td>
        <td style="padding: 0.75rem; text-align: center;">AA</td>
        <td style="padding: 0.75rem; text-align: center;">Medium Risk</td>
        <td style="padding: 0.75rem; text-align: center;">A</td>
        <td style="padding: 0.75rem; color: #16a34a;">小さな差</td>
      </tr>
    </tbody>
  </table>
  
  <p style="color: #78350f; margin: 1rem 0 0 0; font-size: 0.9rem;">
    <strong>原因：</strong>評価手法、重点項目、データソースの違いが評価格差を生む
  </p>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">ESG投資の構造的課題</h3>
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: #991b1b; color: white;">
      <th style="padding: 1rem;">課題分野</th>
      <th style="padding: 1rem;">具体的問題</th>
      <th style="padding: 1rem;">対応策</th>
      <th style="padding: 1rem;">進展状況</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #fef2f2;">
      <td style="padding: 1rem;"><strong>データの質</strong></td>
      <td style="padding: 1rem;">不完全・不正確な開示</td>
      <td style="padding: 1rem;">開示義務化・標準化</td>
      <td style="padding: 1rem; color: #ea580c;">進行中</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>評価の主観性</strong></td>
      <td style="padding: 1rem;">評価機関による格差</td>
      <td style="padding: 1rem;">評価手法の統一化</td>
      <td style="padding: 1rem; color: #dc2626;">課題継続</td>
    </tr>
    <tr style="background: #fef2f2;">
      <td style="padding: 1rem;"><strong>短期志向</strong></td>
      <td style="padding: 1rem;">四半期業績への圧力</td>
      <td style="padding: 1rem;">長期指標の重視</td>
      <td style="padding: 1rem; color: #ea580c;">改善傾向</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>地域・文化差</strong></td>
      <td style="padding: 1rem;">欧米基準の偏重</td>
      <td style="padding: 1rem;">地域特性の反映</td>
      <td style="padding: 1rem; color: #dc2626;">初期段階</td>
    </tr>
  </tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">9. 規制動向と制度化の進展</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">主要国・地域のESG規制</h3>
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 1rem; margin: 1.5rem 0;">
  <h3 style="color: white; margin: 0 0 1.5rem 0;">🌍 世界のESG規制動向</h3>
  
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
    <div style="background: rgba(255,255,255,0.95); padding: 1rem; border-radius: 0.5rem;">
      <h4 style="color: #4f46e5; margin: 0 0 0.75rem 0;">🇪🇺 欧州（EU）</h4>
      <ul style="margin: 0; padding-left: 1rem; font-size: 0.9rem;">
        <li><strong>SFDR</strong>：金融商品の持続可能性開示</li>
        <li><strong>CSRD</strong>：企業サステナビリティ報告指令</li>
        <li><strong>EUタクソノミー</strong>：持続可能活動の分類</li>
        <li><strong>NFRD</strong>：非財務情報開示指令</li>
      </ul>
    </div>
    
    <div style="background: rgba(255,255,255,0.95); padding: 1rem; border-radius: 0.5rem;">
      <h4 style="color: #7c3aed; margin: 0 0 0.75rem 0;">🇺🇸 米国</h4>
      <ul style="margin: 0; padding-left: 1rem; font-size: 0.9rem;">
        <li><strong>SEC規則</strong>：気候変動開示義務化検討</li>
        <li><strong>DOL規則</strong>：年金運用でのESG考慮</li>
        <li><strong>州レベル</strong>：カリフォルニア州等で先行</li>
        <li><strong>TCFD</strong>：気候関連財務情報開示</li>
      </ul>
    </div>
    
    <div style="background: rgba(255,255,255,0.95); padding: 1rem; border-radius: 0.5rem;">
      <h4 style="color: #8b5cf6; margin: 0 0 0.75rem 0;">🇯🇵 日本</h4>
      <ul style="margin: 0; padding-left: 1rem; font-size: 0.9rem;">
        <li><strong>コーポレートガバナンス・コード</strong></li>
        <li><strong>スチュワードシップ・コード</strong></li>
        <li><strong>TCFD提言</strong>への対応推進</li>
        <li><strong>ESG債券ガイドライン</strong></li>
      </ul>
    </div>
    
    <div style="background: rgba(255,255,255,0.95); padding: 1rem; border-radius: 0.5rem;">
      <h4 style="color: #ec4899; margin: 0 0 0.75rem 0;">🌏 アジア他</h4>
      <ul style="margin: 0; padding-left: 1rem; font-size: 0.9rem;">
        <li><strong>中国</strong>：グリーン分類・強制開示</li>
        <li><strong>韓国</strong>：K-タクソノミー</li>
        <li><strong>シンガポール</strong>：TCFD対応義務化</li>
        <li><strong>香港</strong>：ESG報告ガイド</li>
      </ul>
    </div>
  </div>
</div>
        `
      },
      {
        type: 'text',
        title: '実践的ESG投資戦略と個人投資家向けアプローチ',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">10. 個人投資家のためのESG投資実践法</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">ステップ別ESG投資の始め方</h3>
<div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); padding: 2rem; border-radius: 1rem; margin: 1.5rem 0;">
  <h3 style="color: #7c2d12; margin: 0 0 1.5rem 0;">🚀 ESG投資スタートガイド</h3>
  
  <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 1rem;">
    <h4 style="color: #dc2626; margin: 0 0 0.75rem 0;">Step 1：価値観の明確化</h4>
    <ul style="margin: 0; padding-left: 1.5rem; font-size: 0.9rem;">
      <li>重視するESG要素の特定（環境・社会・ガバナンスの優先順位）</li>
      <li>除外したい業界・企業の決定（武器、タバコ、化石燃料等）</li>
      <li>投資を通じて実現したい社会的インパクトの明確化</li>
    </ul>
  </div>
  
  <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 1rem;">
    <h4 style="color: #ea580c; margin: 0 0 0.75rem 0;">Step 2：投資商品の選定</h4>
    <ul style="margin: 0; padding-left: 1.5rem; font-size: 0.9rem;">
      <li>ESGインデックスファンドから開始（低コスト・分散）</li>
      <li>個別ESG投資信託の検討（テーマ特化型等）</li>
      <li>ESG ETFの活用（流動性・透明性）</li>
    </ul>
  </div>
  
  <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 1rem;">
    <h4 style="color: #f59e0b; margin: 0 0 0.75rem 0;">Step 3：ポートフォリオ構築</h4>
    <ul style="margin: 0; padding-left: 1.5rem; font-size: 0.9rem;">
      <li>全体の20-50%をESG投資に配分（リスク許容度に応じ）</li>
      <li>地域・セクター・テーマによる分散</li>
      <li>従来投資との適切なバランス維持</li>
    </ul>
  </div>
  
  <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 0.5rem;">
    <h4 style="color: #16a34a; margin: 0 0 0.75rem 0;">Step 4：継続的なモニタリング</h4>
    <ul style="margin: 0; padding-left: 1.5rem; font-size: 0.9rem;">
      <li>ESG評価の変化を定期チェック（年2回程度）</li>
      <li>投資先企業のESG取り組み状況確認</li>
      <li>グリーンウォッシングのリスク評価</li>
    </ul>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">投資予算別推奨戦略</h3>
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: linear-gradient(90deg, #10b981, #14b8a6); color: white;">
      <th style="padding: 1rem;">投資予算</th>
      <th style="padding: 1rem;">推奨アプローチ</th>
      <th style="padding: 1rem;">具体的商品例</th>
      <th style="padding: 1rem;">期待される効果</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #f0fdf4;">
      <td style="padding: 1rem;"><strong>月1-3万円</strong></td>
      <td style="padding: 1rem;">ESGインデックス積立</td>
      <td style="padding: 1rem;">eMAXIS Slim全世界株式</td>
      <td style="padding: 1rem;">基本的な分散とESG効果</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>月3-10万円</strong></td>
      <td style="padding: 1rem;">複数ESGファンド組み合わせ</td>
      <td style="padding: 1rem;">地域・テーマ別ESGファンド</td>
      <td style="padding: 1rem;">専門性の高いESG投資</td>
    </tr>
    <tr style="background: #f0fdf4;">
      <td style="padding: 1rem;"><strong>まとまった資金</strong></td>
      <td style="padding: 1rem;">個別ESG株式投資</td>
      <td style="padding: 1rem;">ESG評価高企業の直接投資</td>
      <td style="padding: 1rem;">株主としてのエンゲージメント</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>資産家レベル</strong></td>
      <td style="padding: 1rem;">インパクト投資・直接投資</td>
      <td style="padding: 1rem;">グリーンボンド、再エネファンド</td>
      <td style="padding: 1rem;">直接的な社会インパクト創出</td>
    </tr>
  </tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">11. ESG投資の将来展望</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">技術進歩とESG投資</h3>
<div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); padding: 1.5rem; border-radius: 0.5rem; margin: 1.5rem 0;">
  <h4 style="color: #064e3b; margin: 0 0 1rem 0;">🔬 イノベーションがもたらす変化</h4>
  
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
    <div style="background: rgba(255,255,255,0.9); padding: 1rem; border-radius: 0.5rem;">
      <h5 style="color: #064e3b; margin: 0 0 0.5rem 0;">💡 AI・ビッグデータ活用</h5>
      <ul style="color: #065f46; margin: 0; padding-left: 1rem; font-size: 0.85rem;">
        <li>衛星データによる環境モニタリング</li>
        <li>自然言語処理でのESG情報分析</li>
        <li>リアルタイムESG評価の実現</li>
        <li>予測分析による将来リスク評価</li>
      </ul>
    </div>
    
    <div style="background: rgba(255,255,255,0.9); padding: 1rem; border-radius: 0.5rem;">
      <h5 style="color: #064e3b; margin: 0 0 0.5rem 0;">⛓️ ブロックチェーン活用</h5>
      <ul style="color: #065f46; margin: 0; padding-left: 1rem; font-size: 0.85rem;">
        <li>サプライチェーンの透明性向上</li>
        <li>カーボンクレジットの取引基盤</li>
        <li>ESGデータの改ざん防止</li>
        <li>インパクト測定の信頼性向上</li>
      </ul>
    </div>
    
    <div style="background: rgba(255,255,255,0.9); padding: 1rem; border-radius: 0.5rem;">
      <h5 style="color: #064e3b; margin: 0 0 0.5rem 0;">🌐 IoT・センサー技術</h5>
      <ul style="color: #065f46; margin: 0; padding-left: 1rem; font-size: 0.85rem;">
        <li>リアルタイム環境データ収集</li>
        <li>エネルギー使用量の精密測定</li>
        <li>職場環境の客観的評価</li>
        <li>製品ライフサイクルの追跡</li>
      </ul>
    </div>
    
    <div style="background: rgba(255,255,255,0.9); padding: 1rem; border-radius: 0.5rem;">
      <h5 style="color: #064e3b; margin: 0 0 0.5rem 0;">🤖 自動化・効率化</h5>
      <ul style="color: #065f46; margin: 0; padding-left: 1rem; font-size: 0.85rem;">
        <li>ESGスコア算出の自動化</li>
        <li>ポートフォリオ最適化の高度化</li>
        <li>レポート作成の効率化</li>
        <li>投資判断支援システム</li>
      </ul>
    </div>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">2030年に向けた予測</h3>
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: linear-gradient(90deg, #8b5cf6, #ec4899); color: white;">
      <th style="padding: 1rem;">領域</th>
      <th style="padding: 1rem;">現状（2024年）</th>
      <th style="padding: 1rem;">2030年予測</th>
      <th style="padding: 1rem;">変化の要因</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #faf5ff;">
      <td style="padding: 1rem;"><strong>市場規模</strong></td>
      <td style="padding: 1rem;">53兆ドル</td>
      <td style="padding: 1rem; color: #16a34a;">140兆ドル</td>
      <td style="padding: 1rem;">規制強化・投資家需要</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>データ品質</strong></td>
      <td style="padding: 1rem;">標準化途上</td>
      <td style="padding: 1rem; color: #16a34a;">高度に標準化</td>
      <td style="padding: 1rem;">技術進歩・規制統一</td>
    </tr>
    <tr style="background: #faf5ff;">
      <td style="padding: 1rem;"><strong>評価精度</strong></td>
      <td style="padding: 1rem;">機関間で格差</td>
      <td style="padding: 1rem; color: #16a34a;">収束・高精度化</td>
      <td style="padding: 1rem;">AI活用・データ豊富化</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 1rem;"><strong>個人参加</strong></td>
      <td style="padding: 1rem;">限定的</td>
      <td style="padding: 1rem; color: #16a34a;">主流化</td>
      <td style="padding: 1rem;">商品多様化・教育普及</td>
    </tr>
    <tr style="background: #faf5ff;">
      <td style="padding: 1rem;"><strong>インパクト測定</strong></td>
      <td style="padding: 1rem;">定性中心</td>
      <td style="padding: 1rem; color: #16a34a;">定量・リアルタイム</td>
      <td style="padding: 1rem;">測定技術・基準統一</td>
    </tr>
  </tbody>
</table>
        `
      },
      {
        type: 'text',
        title: 'まとめと実践チェックリスト',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">実践への道筋</h2>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">ESG投資開始前のチェックリスト</h3>
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 1rem; color: white; margin: 1.5rem 0;">
  <h3 style="margin: 0 0 1.5rem 0;">✅ ESG投資準備チェック</h3>
  
  <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.75rem;">
    <input type="checkbox" id="esg1" style="margin-right: 0.5rem;">
    <label for="esg1"><strong>価値観の整理</strong> - 重視するESG要素の明確化</label>
  </div>
  
  <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.75rem;">
    <input type="checkbox" id="esg2" style="margin-right: 0.5rem;">
    <label for="esg2"><strong>投資目標の設定</strong> - 収益性と社会性のバランス決定</label>
  </div>
  
  <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.75rem;">
    <input type="checkbox" id="esg3" style="margin-right: 0.5rem;">
    <label for="esg3"><strong>商品理解</strong> - ESGファンドの評価方法習得</label>
  </div>
  
  <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.75rem;">
    <input type="checkbox" id="esg4" style="margin-right: 0.5rem;">
    <label for="esg4"><strong>グリーンウォッシング対策</strong> - 見分ける知識の習得</label>
  </div>
  
  <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem;">
    <input type="checkbox" id="esg5" style="margin-right: 0.5rem;">
    <label for="esg5"><strong>長期視点</strong> - 短期の成果に惑わされない覚悟</label>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">ESG投資の成功要因</h3>
<div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); padding: 1.5rem; border-radius: 0.5rem; margin: 1.5rem 0;">
  <h4 style="color: #064e3b; margin: 0 0 1rem 0;">🎯 成功のための重要ポイント</h4>
  
  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem;">
    <div style="background: rgba(255,255,255,0.9); padding: 1rem; border-radius: 0.5rem; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔍</div>
      <strong style="color: #064e3b;">調査・検証</strong>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.85rem; color: #065f46;">表面的な情報に惑わされない</p>
    </div>
    
    <div style="background: rgba(255,255,255,0.9); padding: 1rem; border-radius: 0.5rem; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">⚖️</div>
      <strong style="color: #064e3b;">バランス重視</strong>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.85rem; color: #065f46;">収益性と社会性の両立</p>
    </div>
    
    <div style="background: rgba(255,255,255,0.9); padding: 1rem; border-radius: 0.5rem; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">📈</div>
      <strong style="color: #064e3b;">継続的改善</strong>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.85rem; color: #065f46;">定期的な見直しと調整</p>
    </div>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">よくある失敗パターンと対策</h3>
<div style="background: #fef2f2; padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #dc2626; margin: 1.5rem 0;">
  <h4 style="color: #991b1b; margin: 0 0 1rem 0;">⚠️ ESG投資の注意すべき落とし穴</h4>
  
  <ol style="color: #7f1d1d; margin: 0; padding-left: 1.5rem;">
    <li><strong>感情的な投資判断</strong> → データに基づく冷静な分析を心がける</li>
    <li><strong>グリーンウォッシングに騙される</strong> → 第三者評価と実績を確認</li>
    <li><strong>コスト無視のESG信仰</strong> → 手数料と期待リターンのバランス検討</li>
    <li><strong>過度の集中投資</strong> → ESGでも分散投資の原則は有効</li>
    <li><strong>短期的成果への焦り</strong> → ESGの効果は長期で現れることを理解</li>
  </ol>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">ESG投資の学習リソース</h3>
<div style="background: #f0f9ff; padding: 1.5rem; border-radius: 0.5rem; border: 2px solid #0284c7; margin: 1.5rem 0;">
  <h4 style="color: #075985; margin: 0 0 1rem 0;">📚 さらなる学習のために</h4>
  
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
    <div style="background: white; padding: 1rem; border-radius: 0.5rem;">
      <h5 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">📖 推奨書籍</h5>
      <ul style="color: #075985; margin: 0; padding-left: 1rem; font-size: 0.9rem;">
        <li>「ESG投資の正体」</li>
        <li>「持続可能な投資」</li>
        <li>「責任投資原則」</li>
      </ul>
    </div>
    
    <div style="background: white; padding: 1rem; border-radius: 0.5rem;">
      <h5 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">🌐 情報源</h5>
      <ul style="color: #075985; margin: 0; padding-left: 1rem; font-size: 0.9rem;">
        <li>PRI（責任投資原則）</li>
        <li>GSIA（持続可能投資連合）</li>
        <li>各ESG評価機関サイト</li>
      </ul>
    </div>
    
    <div style="background: white; padding: 1rem; border-radius: 0.5rem;">
      <h5 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">🎓 資格・セミナー</h5>
      <ul style="color: #075985; margin: 0; padding-left: 1rem; font-size: 0.9rem;">
        <li>CFA ESG投資コース</li>
        <li>サステナブルファイナンス検定</li>
        <li>各証券会社のESGセミナー</li>
      </ul>
    </div>
    
    <div style="background: white; padding: 1rem; border-radius: 0.5rem;">
      <h5 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">💼 実践機会</h5>
      <ul style="color: #075985; margin: 0; padding-left: 1rem; font-size: 0.9rem;">
        <li>ESGファンドでの少額投資</li>
        <li>企業のESG報告書読解</li>
        <li>株主総会への参加</li>
      </ul>
    </div>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">ESG投資家としての行動指針</h3>
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 1rem; color: white; margin: 1.5rem 0;">
  <h3 style="margin: 0 0 1rem 0;">🌱 責任ある投資家としての心構え</h3>
  
  <div style="display: flex; gap: 1rem;">
    <div style="flex: 1; background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem;">
      <h4 style="margin: 0 0 0.5rem 0; text-align: center;">🎯 目的意識</h4>
      <p style="margin: 0; font-size: 0.9rem; text-align: center;">
        投資を通じて<br/>より良い社会を<br/>実現する意識
      </p>
    </div>
    
    <div style="flex: 1; background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem;">
      <h4 style="margin: 0 0 0.5rem 0; text-align: center;">🔬 学習姿勢</h4>
      <p style="margin: 0; font-size: 0.9rem; text-align: center;">
        ESGの進化に<br/>合わせた継続的<br/>知識アップデート
      </p>
    </div>
    
    <div style="flex: 1; background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem;">
      <h4 style="margin: 0 0 0.5rem 0; text-align: center;">⏰ 長期視点</h4>
      <p style="margin: 0; font-size: 0.9rem; text-align: center;">
        短期の変動に<br/>惑わされない<br/>持続的な投資
      </p>
    </div>
  </div>
</div>
        `
      }
    ],
    keyPoints: [
      'ESG投資は環境・社会・ガバナンス要因を投資判断に組み込む責任投資アプローチ',
      '長期的には一般投資と同等以上のリターンを実現しつつ、リスクが低い傾向',
      'グリーンウォッシングに注意し、第三者評価と具体的データに基づく判断が重要',
      '個人投資家はESGインデックスファンドから始め、段階的に専門性を高めることが推奨',
      'ESG投資の成功には価値観の明確化、継続学習、長期視点が不可欠'
    ],
    summary: `
ESG投資は、環境・社会・ガバナンス要因を投資判断に統合する投資アプローチとして、世界的に主流化が進んでいます。53兆ドル規模に成長したESG投資市場は、2030年には140兆ドルに達すると予測されています。

研究によると、ESG投資は長期的に一般投資と同等以上のリターンを実現しながら、リスクが低い傾向があることが示されています。これは、ESG要因が企業の持続可能性と長期的な競争力に直結するためです。

しかし、ESG投資にはグリーンウォッシング、評価機関間の格差、データの質といった課題も存在します。個人投資家は、ESGインデックスファンドから始め、価値観を明確化し、継続的な学習を通じて段階的に専門性を高めることが成功の鍵となります。
    `,
    practicalExamples: [
      'eMAXIS Slim全世界株式で月3万円のESG積立投資を行うと、20年で約1,970万円の資産形成が可能（年6%想定）',
      'MSCIワールドESG指数は過去10年で年率9.8%のリターンを実現（一般指数は9.5%）',
      'ESG評価AAA企業の株価は、CCC企業と比べて年間約2-3%のアウトパフォーマンス',
      'ESG債券（グリーンボンド）市場は年間5,000億ドル規模まで成長',
      '企業のESG取り組み改善により、資本コストが平均40ベーシスポイント低下'
    ],
    warningNotes: [
      'ESG評価機関によって同一企業の評価が大きく異なることがある',
      'グリーンウォッシングのリスクがあるため、具体的データと第三者認証の確認が必要',
      'ESG投資でも分散投資の原則は有効、特定のテーマへの過度の集中は避ける',
      '短期的にはESG投資がアンダーパフォームする可能性もある',
      '投資判断は自己責任であり、ESGスコアのみで投資判断を下すのは危険'
    ]
  },

  quiz: [
    {
      id: 'esg-1',
      question: 'ESGの3つの要素として正しい組み合わせはどれですか？',
      options: [
        'Economy（経済）、Social（社会）、Governance（ガバナンス）',
        'Environment（環境）、Social（社会）、Governance（ガバナンス）',
        'Environment（環境）、Sustainability（持続可能性）、Growth（成長）',
        'Ethics（倫理）、Social（社会）、Green（環境）'
      ],
      correctAnswer: 1,
      explanation: 'ESGは、Environment（環境）、Social（社会）、Governance（ガバナンス）の3つの要素からなります。これらの非財務要因を投資判断に統合することで、長期的な持続可能性と収益性の両立を目指します。'
    },
    {
      id: 'esg-2',
      question: 'ESG投資の長期パフォーマンスに関する記述として最も適切なものはどれですか？',
      options: [
        '一般投資より常に高いリターンを実現する',
        '一般投資と同等以上のリターンでリスクが低い傾向',
        '社会貢献のため収益性は犠牲になる',
        'リターンは低いが安全性が極めて高い'
      ],
      correctAnswer: 1,
      explanation: '多くの研究により、ESG投資は長期的に一般投資と同等以上のリターンを実現しながら、ボラティリティが低く、最大ドローダウンも小さい傾向があることが示されています。これは「リスク調整後リターン」の向上を意味します。'
    },
    {
      id: 'esg-3',
      question: 'グリーンウォッシングを見分けるために最も重要なポイントはどれですか？',
      options: [
        '企業の広告やパンフレットの内容',
        '株価の上昇トレンド',
        '具体的データと第三者認証の有無',
        'ESG関連の賞の受賞歴'
      ],
      correctAnswer: 2,
      explanation: 'グリーンウォッシングを避けるには、具体的な数値目標、進捗データ、第三者機関による認証（SBTi、GRI基準等）の有無を確認することが最も重要です。曖昧な表現や根拠のない主張に惑わされないことが重要です。'
    },
    {
      id: 'esg-4',
      question: '個人投資家がESG投資を始める際の推奨アプローチはどれですか？',
      options: [
        '個別ESG株式から開始',
        'ESGインデックスファンドから開始',
        'インパクト投資から開始',
        '全資産をESG投資に集中'
      ],
      correctAnswer: 1,
      explanation: '個人投資家にはESGインデックスファンドから始めることが推奨されます。低コスト、分散効果、透明性が高く、ESG投資の基本を学びながら段階的に専門性を高めることができます。'
    },
    {
      id: 'esg-5',
      question: 'ESG投資市場の将来予測として最も適切なものはどれですか？',
      options: [
        '一時的なブームで縮小傾向',
        '2030年に140兆ドル規模に成長予測',
        '規制により成長が止まる',
        '先進国のみで普及'
      ],
      correctAnswer: 1,
      explanation: '世界のESG投資市場は2024年の約53兆ドルから2030年には140兆ドル規模に成長すると予測されています。これは規制強化、投資家需要の高まり、技術進歩による評価精度向上が背景にあります。'
    }
  ],
  
  lastUpdated: '2025-08-15',
  factChecked: true
}