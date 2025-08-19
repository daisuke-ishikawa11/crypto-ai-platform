import type { Lesson } from '@/lib/types/learning';

export const lesson23: Lesson = {
  id: 'life-stage-investment-strategies',
  categoryId: 'financial-literacy',
  title: 'ライフステージ別投資戦略：人生設計と資産形成の最適化ガイド',
  slug: 'life-stage-investment-strategies',
  description: '人生の各段階に応じた投資目標の設定、リスク許容度の評価、資産配分の最適化について、年齢・収入・家族構成・キャリアステージを考慮した具体的な戦略を学習します。',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 40,
  orderIndex: 23,
  isPublished: true,
  tags: ['ライフプランニング', '資産配分', '投資戦略', 'リスク管理'],
  
  content: {
    sections: [
      {
        type: 'text',
        title: 'ライフステージ投資の基本理念と戦略的フレームワーク',
        content: `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 15px; margin: 1.5rem 0; color: white;">
          <h3 style="color: #fff; margin-bottom: 1rem;">🎯 人生設計と投資戦略の統合的アプローチ</h3>
          <p style="font-size: 1.1em; line-height: 1.6;">ライフステージ別投資戦略は、個人の人生における各段階の特性と目標に応じて、最適な投資アプローチを構築する体系的な手法です。年齢、収入、家族構成、リスク許容度の変化を考慮し、長期的な資産形成と人生設計の調和を実現します。</p>
        </div>

        <h3 style="color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 0.5rem;">📊 ライフサイクル理論の実践的応用</h3>
        
        <div style="background: #f8f9fa; border-left: 5px solid #17a2b8; padding: 1.5rem; margin: 1rem 0;">
          <h4 style="color: #17a2b8;">投資行動の心理的・経済的基盤</h4>
          <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
            <thead style="background: linear-gradient(135deg, #17a2b8 0%, #20c997 100%); color: white;">
              <tr>
                <th style="padding: 15px; text-align: left;">ライフステージ要素</th>
                <th style="padding: 15px; text-align: left;">特徴</th>
                <th style="padding: 15px; text-align: left;">投資行動への影響</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">時間軸（投資期間）</td>
                <td style="padding: 12px;">若年期は長期、高年期は短期</td>
                <td style="padding: 12px;">複利効果の活用度、リスク耐性の決定要因</td>
              </tr>
              <tr style="background: #f8f9fa; border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">人的資本</td>
                <td style="padding: 12px;">将来の労働収入の現在価値</td>
                <td style="padding: 12px;">債券的性質、投資リスクの調整機能</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">負債・責任</td>
                <td style="padding: 12px;">住宅ローン、教育費、介護費用</td>
                <td style="padding: 12px;">流動性需要、安全性重視への転換</td>
              </tr>
              <tr style="background: #f8f9fa;">
                <td style="padding: 12px; font-weight: bold;">リスク許容度</td>
                <td style="padding: 12px;">年齢・責任に応じた変動</td>
                <td style="padding: 12px;">株式・債券の配分比率決定</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 1.5rem; border-radius: 10px; margin: 1rem 0; color: white;">
          <h4 style="margin-bottom: 1rem;">🎨 投資戦略の個別最適化原則</h4>
          <ul style="list-style: none; padding: 0;">
            <li style="margin: 0.5rem 0; padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.3);">✓ パーソナライズド・アセット・アロケーション</li>
            <li style="margin: 0.5rem 0; padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.3);">✓ 動的リバランシング戦略</li>
            <li style="margin: 0.5rem 0; padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.3);">✓ ライフイベント対応の柔軟性確保</li>
            <li style="margin: 0.5rem 0; padding: 0.5rem 0;">✓ 税務最適化との統合アプローチ</li>
          </ul>
        </div>

        <h3 style="color: #2c3e50; border-bottom: 3px solid #e74c3c; padding-bottom: 0.5rem;">🔄 グライドパス戦略の設計と運用</h3>
        <p style="font-size: 1.05em; line-height: 1.7; color: #2c3e50;">グライドパス（Glide Path）は、年齢の上昇とともに投資ポートフォリオの構成を段階的に調整する戦略です。一般的に「100 - 年齢 = 株式比率(%)」の法則が知られていますが、現代の長寿化社会では、より洗練されたアプローチが求められています。</p>`
      },
      {
        type: 'text',
        title: '20代・30代：資産形成基盤期の投資戦略',
        content: `<div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 2rem; border-radius: 15px; margin: 1.5rem 0; color: white;">
          <h3 style="color: #fff; margin-bottom: 1rem;">🚀 成長重視の積極的投資アプローチ</h3>
          <p style="font-size: 1.1em; line-height: 1.6;">20代・30代は人的資本が豊富で投資期間が長いため、高いリスクを取って高いリターンを追求することが合理的です。この期間の投資戦略は、将来の資産形成の基盤を築く最も重要な段階として位置づけられます。</p>
        </div>

        <h3 style="color: #2c3e50; border-bottom: 3px solid #f39c12; padding-bottom: 0.5rem;">💰 最適資産配分と投資商品選択</h3>
        
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
          <h4 style="color: #856404; margin-bottom: 1rem;">若年層向け戦略的ポートフォリオ構成</h4>
          <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
            <thead style="background: linear-gradient(135deg, #fdcb6e 0%, #e17055 100%); color: white;">
              <tr>
                <th style="padding: 15px; text-align: left;">年齢層</th>
                <th style="padding: 15px; text-align: left;">リスク資産（株式等）</th>
                <th style="padding: 15px; text-align: left;">安全資産（債券等）</th>
                <th style="padding: 15px; text-align: left;">オルタナティブ</th>
                <th style="padding: 15px; text-align: left;">現金・流動性</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">20代前半</td>
                <td style="padding: 12px; color: #e74c3c; font-weight: bold;">80-85%</td>
                <td style="padding: 12px; color: #3498db;">5-10%</td>
                <td style="padding: 12px; color: #9b59b6;">5-10%</td>
                <td style="padding: 12px; color: #27ae60;">5-10%</td>
              </tr>
              <tr style="background: #f8f9fa; border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">20代後半</td>
                <td style="padding: 12px; color: #e74c3c; font-weight: bold;">75-80%</td>
                <td style="padding: 12px; color: #3498db;">10-15%</td>
                <td style="padding: 12px; color: #9b59b6;">5-10%</td>
                <td style="padding: 12px; color: #27ae60;">5-10%</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">30代前半</td>
                <td style="padding: 12px; color: #e74c3c; font-weight: bold;">70-75%</td>
                <td style="padding: 12px; color: #3498db;">15-20%</td>
                <td style="padding: 12px; color: #9b59b6;">5-10%</td>
                <td style="padding: 12px; color: #27ae60;">5-15%</td>
              </tr>
              <tr style="background: #f8f9fa;">
                <td style="padding: 12px; font-weight: bold;">30代後半</td>
                <td style="padding: 12px; color: #e74c3c; font-weight: bold;">65-70%</td>
                <td style="padding: 12px; color: #3498db;">20-25%</td>
                <td style="padding: 12px; color: #9b59b6;">5-10%</td>
                <td style="padding: 12px; color: #27ae60;">5-15%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 1.5rem; border-radius: 12px; margin: 1rem 0;">
          <h4 style="color: #2c3e50; margin-bottom: 1rem;">🎯 具体的投資戦略の実践</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
            <div style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h5 style="color: #e74c3c; margin-bottom: 0.5rem;">🏗️ コア・サテライト戦略</h5>
              <p style="font-size: 0.9em;"><strong>コア（60-70%）：</strong>インデックスファンド、ETF<br><strong>サテライト（30-40%）：</strong>個別株、セクターファンド、新興市場</p>
            </div>
            <div style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h5 style="color: #27ae60; margin-bottom: 0.5rem;">📈 ドルコスト平均法</h5>
              <p style="font-size: 0.9em;">定期定額投資により、価格変動リスクを軽減し、長期的な複利効果を最大化</p>
            </div>
            <div style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h5 style="color: #3498db; margin-bottom: 0.5rem;">🌍 国際分散投資</h5>
              <p style="font-size: 0.9em;">先進国：60%、新興国：20%、国内：20%の地域分散でカントリーリスクを軽減</p>
            </div>
          </div>
        </div>

        <h3 style="color: #2c3e50; border-bottom: 3px solid #9b59b6; padding-bottom: 0.5rem;">💡 キャリア初期特有の考慮事項</h3>
        <div style="background: #f8f9fa; border-left: 5px solid #6f42c1; padding: 1.5rem; margin: 1rem 0;">
          <h4 style="color: #6f42c1;">人的資本の効果的活用</h4>
          <ul style="list-style: none; padding: 0;">
            <li style="margin: 0.8rem 0; padding: 0.8rem; background: white; border-radius: 5px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"><strong>📚 スキル投資優先：</strong>資格取得、教育投資による人的資本の増大が最高のROI</li>
            <li style="margin: 0.8rem 0; padding: 0.8rem; background: white; border-radius: 5px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"><strong>🏠 住宅購入タイミング：</strong>投資vs自宅購入の機会費用分析</li>
            <li style="margin: 0.8rem 0; padding: 0.8rem; background: white; border-radius: 5px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"><strong>👨‍👩‍👧‍👦 家族計画との調整：</strong>結婚、出産に伴う支出増加の予測と対策</li>
            <li style="margin: 0.8rem 0; padding: 0.8rem; background: white; border-radius: 5px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"><strong>🚨 緊急時資金確保：</strong>生活費3-6ヶ月分の流動性資産の維持</li>
          </ul>
        </div>`
      },
      {
        type: 'text',
        title: '40代・50代：資産充実期の安定成長戦略',
        content: `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 15px; margin: 1.5rem 0; color: white;">
          <h3 style="color: #fff; margin-bottom: 1rem;">⚖️ バランス重視の成熟投資アプローチ</h3>
          <p style="font-size: 1.1em; line-height: 1.6;">40代・50代は収入が最も高い時期であり、同時に教育費や住宅ローンなどの支出も最大となる段階です。この期間は積極的な資産形成と堅実な資産保全のバランスを取りながら、退職後の生活資金確保を本格化させる重要な時期です。</p>
        </div>

        <h3 style="color: #2c3e50; border-bottom: 3px solid #e74c3c; padding-bottom: 0.5rem;">🎯 中年期特有の投資課題と対策</h3>
        
        <div style="background: #f8f9fa; border-left: 5px solid #28a745; padding: 1.5rem; margin: 1rem 0;">
          <h4 style="color: #28a745;">多重責任下での資産運用最適化</h4>
          <table style="width: 100%; border-collapse: collapse; margin: 1rem 0; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <thead style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white;">
              <tr>
                <th style="padding: 15px; text-align: left;">責任・支出項目</th>
                <th style="padding: 15px; text-align: left;">平均的な時期</th>
                <th style="padding: 15px; text-align: left;">投資戦略への影響</th>
                <th style="padding: 15px; text-align: left;">対応策</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">教育費（大学等）</td>
                <td style="padding: 12px;">45-55歳頃</td>
                <td style="padding: 12px;">流動性需要の増加</td>
                <td style="padding: 12px;">教育資金の事前準備、奨学金制度活用</td>
              </tr>
              <tr style="background: #f8f9fa; border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">住宅ローン</td>
                <td style="padding: 12px;">40-60歳頃まで</td>
                <td style="padding: 12px;">固定費負担、レバレッジ効果</td>
                <td style="padding: 12px;">繰上返済vs投資の最適化</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">親の介護費用</td>
                <td style="padding: 12px;">50-65歳頃</td>
                <td style="padding: 12px;">予期しない支出増加</td>
                <td style="padding: 12px;">介護保険、緊急時資金の拡充</td>
              </tr>
              <tr style="background: #f8f9fa;">
                <td style="padding: 12px; font-weight: bold;">健康管理費用</td>
                <td style="padding: 12px;">45歳以降増加</td>
                <td style="padding: 12px;">医療・健康関連支出増</td>
                <td style="padding: 12px;">健康投資、医療保険の見直し</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); padding: 1.5rem; border-radius: 12px; margin: 1rem 0;">
          <h4 style="color: #2c3e50; margin-bottom: 1rem;">📊 中年期推奨ポートフォリオ構成</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1rem;">
            <div style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h5 style="color: #e74c3c; margin-bottom: 1rem;">40代の資産配分</h5>
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="padding: 0.5rem 0; border-bottom: 1px solid #f1f1f1;">📈 株式（国内外）: 50-60%</li>
                <li style="padding: 0.5rem 0; border-bottom: 1px solid #f1f1f1;">🏛️ 債券（国内外）: 25-35%</li>
                <li style="padding: 0.5rem 0; border-bottom: 1px solid #f1f1f1;">🏢 REIT・不動産: 5-10%</li>
                <li style="padding: 0.5rem 0;">💰 現金・預金: 10-20%</li>
              </ul>
            </div>
            <div style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h5 style="color: #27ae60; margin-bottom: 1rem;">50代の資産配分</h5>
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="padding: 0.5rem 0; border-bottom: 1px solid #f1f1f1;">📈 株式（国内外）: 40-50%</li>
                <li style="padding: 0.5rem 0; border-bottom: 1px solid #f1f1f1;">🏛️ 債券（国内外）: 35-45%</li>
                <li style="padding: 0.5rem 0; border-bottom: 1px solid #f1f1f1;">🏢 REIT・不動産: 5-10%</li>
                <li style="padding: 0.5rem 0;">💰 現金・預金: 15-25%</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 style="color: #2c3e50; border-bottom: 3px solid #17a2b8; padding-bottom: 0.5rem;">🎓 退職準備期への移行戦略</h3>
        <p style="font-size: 1.05em; line-height: 1.7; color: #2c3e50;">50代後半からは、退職後の生活設計を本格化させる必要があります。公的年金、企業年金、個人年金、退職金などの制度を総合的に活用し、退職後のインカムフローを設計することが重要です。この時期の投資戦略は、成長性よりも安定性と流動性を重視したものに段階的にシフトしていきます。</p>`
      },
      {
        type: 'text',
        title: '60代以降：資産保全期の安定運用戦略',
        content: `<div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 2rem; border-radius: 15px; margin: 1.5rem 0; color: white;">
          <h3 style="color: #fff; margin-bottom: 1rem;">🛡️ 資産保全と安定収入の確保</h3>
          <p style="font-size: 1.1em; line-height: 1.6;">60代以降は退職により勤労収入が減少し、これまで蓄積した資産からの収入が生活の中心となります。この段階では元本の保全を最優先としながら、インフレに対応できる適度な成長性も確保する、保守的かつ戦略的な運用が求められます。</p>
        </div>

        <h3 style="color: #2c3e50; border-bottom: 3px solid #f39c12; padding-bottom: 0.5rem;">💡 高齢期投資の基本原則</h3>
        
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
          <h4 style="color: #856404; margin-bottom: 1rem;">安全性・流動性・収益性のバランス最適化</h4>
          <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <thead style="background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%); color: white;">
              <tr>
                <th style="padding: 15px; text-align: left;">投資原則</th>
                <th style="padding: 15px; text-align: left;">重要度</th>
                <th style="padding: 15px; text-align: left;">具体的手法</th>
                <th style="padding: 15px; text-align: left;">注意点</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">元本保全</td>
                <td style="padding: 12px; color: #e74c3c; font-weight: bold;">最高</td>
                <td style="padding: 12px;">国債、優良社債、元本保証商品</td>
                <td style="padding: 12px;">インフレリスクとのバランス</td>
              </tr>
              <tr style="background: #f8f9fa; border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">安定収入確保</td>
                <td style="padding: 12px; color: #f39c12; font-weight: bold;">高</td>
                <td style="padding: 12px;">配当株、分配型ファンド、REIT</td>
                <td style="padding: 12px;">分配利回りの持続可能性</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">流動性確保</td>
                <td style="padding: 12px; color: #f39c12; font-weight: bold;">高</td>
                <td style="padding: 12px;">普通預金、MMF、短期債券</td>
                <td style="padding: 12px;">緊急時・医療費への対応</td>
              </tr>
              <tr style="background: #f8f9fa;">
                <td style="padding: 12px; font-weight: bold;">インフレ対応</td>
                <td style="padding: 12px; color: #17a2b8; font-weight: bold;">中</td>
                <td style="padding: 12px;">物価連動債、株式の一部保有</td>
                <td style="padding: 12px;">過度なリスクテイクの回避</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 1.5rem; border-radius: 12px; margin: 1rem 0;">
          <h4 style="color: #2c3e50; margin-bottom: 1rem;">🏛️ 退職後の収入源多角化戦略</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
            <div style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 3px 6px rgba(0,0,0,0.1);">
              <h5 style="color: #e74c3c; margin-bottom: 1rem; display: flex; align-items: center;">
                <span style="background: #e74c3c; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 0.5rem; font-size: 0.8em;">1</span>
                公的年金
              </h5>
              <p style="font-size: 0.9em; line-height: 1.6;">国民年金・厚生年金を基盤とした確実な収入源。受給開始時期の最適化により受給額を調整</p>
            </div>
            <div style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 3px 6px rgba(0,0,0,0.1);">
              <h5 style="color: #27ae60; margin-bottom: 1rem; display: flex; align-items: center;">
                <span style="background: #27ae60; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 0.5rem; font-size: 0.8em;">2</span>
                企業年金・退職金
              </h5>
              <p style="font-size: 0.9em; line-height: 1.6;">確定給付年金、確定拠出年金、退職一時金の効率的な受給方法の選択</p>
            </div>
            <div style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 3px 6px rgba(0,0,0,0.1);">
              <h5 style="color: #3498db; margin-bottom: 1rem; display: flex; align-items: center;">
                <span style="background: #3498db; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 0.5rem; font-size: 0.8em;">3</span>
                投資資産収入
              </h5>
              <p style="font-size: 0.9em; line-height: 1.6;">配当・分配金収入、債券利息、不動産賃料などの資産所得の安定確保</p>
            </div>
            <div style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 3px 6px rgba(0,0,0,0.1);">
              <h5 style="color: #9b59b6; margin-bottom: 1rem; display: flex; align-items: center;">
                <span style="background: #9b59b6; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 0.5rem; font-size: 0.8em;">4</span>
                その他収入
              </h5>
              <p style="font-size: 0.9em; line-height: 1.6;">パートタイム勤務、個人事業、コンサルティング等による追加収入の確保</p>
            </div>
          </div>
        </div>

        <h3 style="color: #2c3e50; border-bottom: 3px solid #9b59b6; padding-bottom: 0.5rem;">⚕️ 長寿リスクとヘルスケア費用対策</h3>
        <div style="background: #f8f9fa; border-left: 5px solid #6f42c1; padding: 1.5rem; margin: 1rem 0;">
          <p style="font-size: 1.05em; line-height: 1.7; color: #2c3e50; margin-bottom: 1rem;">日本人の平均寿命延伸により、90歳、100歳まで生きることを前提とした資産設計が必要です。長期にわたる生活費確保と、高齢期に増大する医療・介護費用への備えを両立させる戦略が求められます。</p>
          <div style="background: white; padding: 1rem; border-radius: 8px; border-left: 4px solid #6f42c1;">
            <h5 style="color: #6f42c1; margin-bottom: 0.5rem;">🏥 ヘルスケア費用の計画的準備</h5>
            <p style="font-size: 0.95em; color: #6c757d;">医療費・介護費用は個人差が大きいため、保険と自己資金の適切な組み合わせにより、予測困難なリスクに対する包括的な備えを構築することが重要です。</p>
          </div>
        </div>`
      },
      {
        type: 'text',
        title: 'ライフイベント対応と戦略的調整',
        content: `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 15px; margin: 1.5rem 0; color: white;">
          <h3 style="color: #fff; margin-bottom: 1rem;">🎭 人生の転機における投資戦略の柔軟な適応</h3>
          <p style="font-size: 1.1em; line-height: 1.6;">人生には予期しない出来事や重要な節目が訪れます。結婚、離婚、出産、転職、疾病、相続など、これらのライフイベントは投資戦略に大きな影響を与えるため、状況に応じた迅速かつ適切な戦略調整が必要です。</p>
        </div>

        <h3 style="color: #2c3e50; border-bottom: 3px solid #e74c3c; padding-bottom: 0.5rem;">👨‍👩‍👧‍👦 主要ライフイベント別対応戦略</h3>
        
        <div style="background: #f8f9fa; border-left: 5px solid #e74c3c; padding: 1.5rem; margin: 1rem 0;">
          <h4 style="color: #e74c3c;">イベント・ドリブン投資戦略調整</h4>
          <table style="width: 100%; border-collapse: collapse; margin: 1rem 0; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
            <thead style="background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); color: white;">
              <tr>
                <th style="padding: 15px; text-align: left;">ライフイベント</th>
                <th style="padding: 15px; text-align: left;">投資戦略への影響</th>
                <th style="padding: 15px; text-align: left;">推奨対応策</th>
                <th style="padding: 15px; text-align: left;">調整期間</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">結婚</td>
                <td style="padding: 12px;">リスク許容度・目標の統合</td>
                <td style="padding: 12px;">家計統合、共同投資計画策定</td>
                <td style="padding: 12px;">3-6ヶ月</td>
              </tr>
              <tr style="background: #f8f9fa; border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">出産・育児</td>
                <td style="padding: 12px;">教育資金需要、収入減少</td>
                <td style="padding: 12px;">流動性資産増加、学資保険検討</td>
                <td style="padding: 12px;">1年程度</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">住宅購入</td>
                <td style="padding: 12px;">大きな資金拠出、ローン負担</td>
                <td style="padding: 12px;">頭金確保、返済vs投資の最適化</td>
                <td style="padding: 12px;">6ヶ月-1年</td>
              </tr>
              <tr style="background: #f8f9fa; border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">転職・独立</td>
                <td style="padding: 12px;">収入不安定化、制度変更</td>
                <td style="padding: 12px;">緊急時資金拡充、リスク資産減少</td>
                <td style="padding: 12px;">3-6ヶ月</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">疾病・障害</td>
                <td style="padding: 12px;">医療費増加、収入能力低下</td>
                <td style="padding: 12px;">保険金活用、安全資産へシフト</td>
                <td style="padding: 12px;">即座に対応</td>
              </tr>
              <tr style="background: #f8f9fa;">
                <td style="padding: 12px; font-weight: bold;">相続発生</td>
                <td style="padding: 12px;">資産増加、税務対応必要</td>
                <td style="padding: 12px;">相続税対策、資産再配分</td>
                <td style="padding: 12px;">6ヶ月-1年</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); padding: 1.5rem; border-radius: 12px; margin: 1rem 0;">
          <h4 style="color: #2c3e50; margin-bottom: 1rem;">🔄 動的資産配分の実践手法</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">
            <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
              <h5 style="color: #e74c3c; margin-bottom: 1rem; font-size: 1.1em;">📋 定期的見直しプロセス</h5>
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="padding: 0.7rem 0; border-bottom: 1px solid #f1f1f1; display: flex; align-items: center;">
                  <span style="background: #e74c3c; color: white; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 0.5rem; font-size: 0.7em;">1</span>
                  年1回の包括的レビュー
                </li>
                <li style="padding: 0.7rem 0; border-bottom: 1px solid #f1f1f1; display: flex; align-items: center;">
                  <span style="background: #e74c3c; color: white; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 0.5rem; font-size: 0.7em;">2</span>
                  ライフイベント発生時の即座対応
                </li>
                <li style="padding: 0.7rem 0; border-bottom: 1px solid #f1f1f1; display: flex; align-items: center;">
                  <span style="background: #e74c3c; color: white; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 0.5rem; font-size: 0.7em;">3</span>
                  市場環境激変時の緊急調整
                </li>
                <li style="padding: 0.7rem 0; display: flex; align-items: center;">
                  <span style="background: #e74c3c; color: white; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 0.5rem; font-size: 0.7em;">4</span>
                  目標達成状況の定量評価
                </li>
              </ul>
            </div>
            <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
              <h5 style="color: #27ae60; margin-bottom: 1rem; font-size: 1.1em;">⚡ 迅速対応の準備体制</h5>
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="padding: 0.7rem 0; border-bottom: 1px solid #f1f1f1; display: flex; align-items: center;">
                  <span style="color: #17a2b8; margin-right: 0.5rem;">★</span>
                  緊急時資金の常時確保
                </li>
                <li style="padding: 0.7rem 0; border-bottom: 1px solid #f1f1f1; display: flex; align-items: center;">
                  <span style="color: #17a2b8; margin-right: 0.5rem;">★</span>
                  流動性の高い資産の一定比率維持
                </li>
                <li style="padding: 0.7rem 0; border-bottom: 1px solid #f1f1f1; display: flex; align-items: center;">
                  <span style="color: #17a2b8; margin-right: 0.5rem;">★</span>
                  専門家との相談体制構築
                </li>
                <li style="padding: 0.7rem 0; display: flex; align-items: center;">
                  <span style="color: #17a2b8; margin-right: 0.5rem;">★</span>
                  各種書類・手続きの事前準備
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h3 style="color: #2c3e50; border-bottom: 3px solid #f39c12; padding-bottom: 0.5rem;">📈 パフォーマンス評価と改善サイクル</h3>
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
          <p style="font-size: 1.05em; line-height: 1.7; color: #2c3e50; margin-bottom: 1rem;">ライフステージ別投資戦略の成功には、定期的な成果測定と戦略改善が不可欠です。絶対リターンだけでなく、ライフステージ目標の達成度、リスク調整後リターン、ベンチマークとの比較など、多面的な評価指標を用いて投資戦略の有効性を検証します。</p>
          <div style="background: white; padding: 1rem; border-radius: 8px; border-left: 4px solid #f39c12;">
            <h5 style="color: #856404; margin-bottom: 0.5rem;">📊 総合的パフォーマンス評価</h5>
            <p style="font-size: 0.95em; color: #6c757d;">財務的成果とライフプラン実現度の両面から投資戦略を評価し、必要に応じて目標設定や資産配分の見直しを行うことで、長期的な成功を確保します。</p>
          </div>
        </div>`
      },
      {
        type: 'text',
        title: '税務最適化と相続・承継計画との統合',
        content: `<div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 2rem; border-radius: 15px; margin: 1.5rem 0; color: white;">
          <h3 style="color: #fff; margin-bottom: 1rem;">💼 統合的ウェルスマネジメントの実現</h3>
          <p style="font-size: 1.1em; line-height: 1.6;">ライフステージ別投資戦略の最終的な成功は、税務効率性と世代間承継の観点を含む総合的な資産管理によって決まります。現行税制の理解と将来の制度変更への対応、そして次世代への円滑な資産承継を視野に入れた包括的な戦略が求められます。</p>
        </div>

        <h3 style="color: #2c3e50; border-bottom: 3px solid #28a745; padding-bottom: 0.5rem;">💰 税制優遇制度の戦略的活用</h3>
        
        <div style="background: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
          <h4 style="color: #155724; margin-bottom: 1rem;">ライフステージ別税制優遇制度の最大活用</h4>
          <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <thead style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white;">
              <tr>
                <th style="padding: 15px; text-align: left;">制度名</th>
                <th style="padding: 15px; text-align: left;">対象ライフステージ</th>
                <th style="padding: 15px; text-align: left;">税制メリット</th>
                <th style="padding: 15px; text-align: left;">活用戦略</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">NISA・つみたてNISA</td>
                <td style="padding: 12px;">20-60代（全世代）</td>
                <td style="padding: 12px;">運用益非課税</td>
                <td style="padding: 12px;">若年期は成長株、高年期は配当株中心</td>
              </tr>
              <tr style="background: #f8f9fa; border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">iDeCo（個人型確定拠出年金）</td>
                <td style="padding: 12px;">20-65歳</td>
                <td style="padding: 12px;">掛金所得控除、運用益非課税</td>
                <td style="padding: 12px;">高所得期に掛金最大化</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">小規模企業共済</td>
                <td style="padding: 12px;">自営業者（30-60代）</td>
                <td style="padding: 12px;">掛金全額所得控除</td>
                <td style="padding: 12px;">事業所得の平準化効果活用</td>
              </tr>
              <tr style="background: #f8f9fa; border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">ジュニアNISA</td>
                <td style="padding: 12px;">子育て世代（30-50代）</td>
                <td style="padding: 12px;">子供の運用益非課税</td>
                <td style="padding: 12px;">教育資金の長期運用</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold;">生命保険料控除</td>
                <td style="padding: 12px;">30-60代</td>
                <td style="padding: 12px;">保険料の所得控除</td>
                <td style="padding: 12px;">保障と節税の両立</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 1.5rem; border-radius: 12px; margin: 1rem 0;">
          <h4 style="color: #2c3e50; margin-bottom: 1rem;">🏛️ 相続・事業承継計画との連携</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1.5rem;">
            <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
              <h5 style="color: #e74c3c; margin-bottom: 1rem; font-size: 1.1em;">👨‍👩‍👧‍👦 家族資産の最適化</h5>
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="padding: 0.7rem 0; border-bottom: 1px solid #f1f1f1; display: flex; align-items: center;">
                  <span style="color: #28a745; margin-right: 0.5rem;">✓</span>
                  贈与税の基礎控除活用（年110万円）
                </li>
                <li style="padding: 0.7rem 0; border-bottom: 1px solid #f1f1f1; display: flex; align-items: center;">
                  <span style="color: #28a745; margin-right: 0.5rem;">✓</span>
                  教育資金一括贈与の特例活用
                </li>
                <li style="padding: 0.7rem 0; border-bottom: 1px solid #f1f1f1; display: flex; align-items: center;">
                  <span style="color: #28a745; margin-right: 0.5rem;">✓</span>
                  結婚・子育て資金贈与の特例
                </li>
                <li style="padding: 0.7rem 0; display: flex; align-items: center;">
                  <span style="color: #28a745; margin-right: 0.5rem;">✓</span>
                  家族信託の活用検討
                </li>
              </ul>
            </div>
            <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
              <h5 style="color: #27ae60; margin-bottom: 1rem; font-size: 1.1em;">🏢 事業資産の承継戦略</h5>
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="padding: 0.7rem 0; border-bottom: 1px solid #f1f1f1; display: flex; align-items: center;">
                  <span style="color: #17a2b8; margin-right: 0.5rem;">★</span>
                  事業承継税制の適用検討
                </li>
                <li style="padding: 0.7rem 0; border-bottom: 1px solid #f1f1f1; display: flex; align-items: center;">
                  <span style="color: #17a2b8; margin-right: 0.5rem;">★</span>
                  持株会社・資産管理会社の活用
                </li>
                <li style="padding: 0.7rem 0; border-bottom: 1px solid #f1f1f1; display: flex; align-items: center;">
                  <span style="color: #17a2b8; margin-right: 0.5rem;">★</span>
                  MBO・EBOによる第三者承継
                </li>
                <li style="padding: 0.7rem 0; display: flex; align-items: center;">
                  <span style="color: #17a2b8; margin-right: 0.5rem;">★</span>
                  M&Aによる企業価値最大化
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h3 style="color: #2c3e50; border-bottom: 3px solid #17a2b8; padding-bottom: 0.5rem;">🔮 将来の制度変更への対応戦略</h3>
        <div style="background: #d1ecf1; border: 1px solid #bee5eb; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
          <p style="font-size: 1.05em; line-height: 1.7; color: #2c3e50; margin-bottom: 1rem;">少子高齢化の進展により、年金制度、税制、社会保障制度の見直しが継続的に行われています。これらの制度変更がライフステージ別投資戦略に与える影響を予測し、柔軟に対応できる戦略設計が重要です。</p>
          <div style="background: white; padding: 1rem; border-radius: 8px; border-left: 4px solid #17a2b8;">
            <h5 style="color: #0c5460; margin-bottom: 0.5rem;">📈 長期トレンドへの適応力確保</h5>
            <p style="font-size: 0.95em; color: #6c757d;">制度変更リスクを軽減するため、特定の制度に過度に依存せず、複数の選択肢を確保した多様な投資戦略を構築し、変化に対応できる柔軟性を維持することが重要です。</p>
          </div>
        </div>

        <div style="background: #f8f9fa; border-left: 5px solid #6f42c1; padding: 1.5rem; margin: 1rem 0;">
          <h4 style="color: #6f42c1;">🎯 成功する投資家の共通特性</h4>
          <ul style="list-style: none; padding: 0;">
            <li style="margin: 0.8rem 0; padding: 0.8rem; background: white; border-radius: 5px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"><strong>📊 データドリブンな意思決定：</strong>感情ではなく客観的データに基づいた投資判断</li>
            <li style="margin: 0.8rem 0; padding: 0.8rem; background: white; border-radius: 5px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"><strong>⏰ 長期視点の維持：</strong>短期的な市場変動に惑わされない一貫した戦略</li>
            <li style="margin: 0.8rem 0; padding: 0.8rem; background: white; border-radius: 5px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"><strong>🔄 継続的学習姿勢：</strong>市場環境変化への適応と知識のアップデート</li>
            <li style="margin: 0.8rem 0; padding: 0.8rem; background: white; border-radius: 5px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"><strong>🤝 専門家との協働：</strong>必要に応じた専門家の知見活用</li>
          </ul>
        </div>`
      }
    ],
    keyPoints: [
      'ライフステージごとの特性と制約を考慮した最適な資産配分の重要性',
      '時間軸と人的資本を活用した段階的リスクテイク戦略の実践',
      '主要ライフイベントに対応する柔軟な投資戦略調整システムの構築',
      '税制優遇制度の戦略的活用による投資効率の最大化',
      '相続・承継計画と統合した包括的ウェルスマネジメントの実現',
      '制度変更や市場環境変化に対応できる適応性の確保'
    ],
    summary: 'このレッスンでは、人生の各段階に応じた最適な投資戦略について包括的に学習しました。20代・30代の積極的成長戦略から、40代・50代のバランス重視アプローチ、そして60代以降の資産保全戦略まで、年齢・収入・家族構成・キャリアステージに応じた具体的な資産配分と投資手法を習得しました。さらに、ライフイベント対応の柔軟性確保、税務最適化、相続計画との統合など、総合的なウェルスマネジメント実現に必要な知識と実践手法を身につけることができました。',
    practicalExamples: [
      '20代独身会社員の月5万円積立投資プランと資産配分の最適化',
      '30代共働き夫婦の教育資金準備と住宅購入タイミングの調整',
      '50代管理職の退職準備資金形成とリスク軽減戦略の実践',
      '60代退職者の年金補完と医療・介護費用準備の包括プラン'
    ],
    warningNotes: [
      'ライフステージの変化に応じた定期的な戦略見直しが不可欠',
      '個人の状況は千差万別であり、画一的な戦略は危険',
      '税制や社会保障制度の変更が投資戦略に与える影響を常時監視',
      '緊急時資金の確保を最優先とし、投資はあくまで余裕資金で実行',
      '専門的判断が必要な場合は迷わずファイナンシャルプランナーに相談'
    ]
  },

  quiz: [
    {
      id: 'financial-literacy-23-q1',
      question: '20代の投資戦略として最も適切でないものはどれですか？',
      options: [
        '株式比率を80%以上とする積極的な資産配分',
        '安全性を最優先とした預金中心の運用',
        'ドルコスト平均法による定期積立投資',
        '国際分散投資によるリスク軽減'
      ],
      correctAnswer: 1,
      explanation: '20代は投資期間が長く、人的資本が豊富なため、安全性を最優先とした保守的な運用は機会損失となります。この時期は高いリスクを取って高いリターンを追求することが合理的です。'
    },
    {
      id: 'financial-literacy-23-q2',
      question: '40代・50代の投資戦略で最も重要な考慮事項は何ですか？',
      options: [
        '最高リターンの追求',
        '教育費・住宅ローンなど多重責任とのバランス',
        '投機的な短期取引による利益確保',
        '流動性の完全な無視'
      ],
      correctAnswer: 1,
      explanation: '40代・50代は収入が最も高い時期ですが、同時に教育費や住宅ローンなどの支出も最大となります。この多重責任とのバランスを取りながら、積極的な資産形成と堅実な資産保全を両立させることが重要です。'
    },
    {
      id: 'financial-literacy-23-q3',
      question: '60代以降の投資戦略の最優先原則は何ですか？',
      options: [
        'ハイリスク・ハイリターン投資による資産増大',
        '元本保全を最優先とした安全な運用',
        '短期的な市場動向に基づく頻繁な売買',
        'すべての資産を現金で保有'
      ],
      correctAnswer: 1,
      explanation: '60代以降は勤労収入が減少し、蓄積した資産からの収入が生活の中心となるため、元本保全を最優先としながら、インフレに対応できる適度な成長性も確保する保守的な運用が求められます。'
    },
    {
      id: 'financial-literacy-23-q4',
      question: 'ライフイベント（結婚、出産、住宅購入など）が発生した際の適切な対応は？',
      options: [
        '投資戦略を一切変更せず、従来通りを維持する',
        'すぐに全ての投資を現金化する',
        '状況に応じて投資戦略を柔軟に調整する',
        'より高いリスクを取って短期間で資産を増やす'
      ],
      correctAnswer: 2,
      explanation: 'ライフイベントは投資戦略に大きな影響を与えるため、状況に応じた迅速かつ適切な戦略調整が必要です。収入変化、支出増加、リスク許容度の変化を考慮した柔軟な対応が成功の鍵となります。'
    },
    {
      id: 'financial-literacy-23-q5',
      question: '税制優遇制度を活用した投資戦略で最も効果的なアプローチは？',
      options: [
        '一つの制度のみに集中投資する',
        '複数の制度を組み合わせて活用する',
        '税制優遇は無視してリターンのみを重視する',
        '制度の詳細を理解せずに利用する'
      ],
      correctAnswer: 1,
      explanation: 'NISA、iDeCo、小規模企業共済など、複数の税制優遇制度をライフステージに応じて組み合わせることで、税務効率を最大化できます。各制度の特性を理解し、戦略的に活用することが重要です。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true

};