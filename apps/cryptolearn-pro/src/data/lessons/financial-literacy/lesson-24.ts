import type { Lesson } from '@/lib/types/learning';

export const lesson24: Lesson = {
  id: 'investment-risk-management',
  categoryId: 'financial-literacy',
  title: '投資におけるリスク管理：包括的リスクマネジメント戦略の構築',
  slug: 'investment-risk-management',
  description: '投資リスクの体系的な分類と特徴、科学的なリスク測定・評価手法、そして効果的なリスク管理戦略の設計・運用について、理論と実践を融合させて学習します。',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 45,
  orderIndex: 24,
  isPublished: true,
  tags: ['リスク管理', '投資戦略', 'ポートフォリオ理論', 'リスク評価'],
  
  content: {
    sections: [
      {
        type: 'text',
        title: '投資リスクの本質と体系的理解',
        content: `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 15px; margin: 1.5rem 0; color: white;">
          <h3 style="color: #fff; margin-bottom: 1rem;">⚡ リスクとリターンの不可分な関係</h3>
          <p style="font-size: 1.1em; line-height: 1.6;">投資におけるリスク管理は、単なる損失回避ではなく、リスクとリターンの最適なバランスを追求する戦略的活動です。すべての投資にはリスクが伴い、このリスクを適切に理解・測定・管理することで、長期的な投資成功を実現できます。</p>
        </div>

        <h3 style="color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 0.5rem;">📊 投資リスクの包括的分類体系</h3>
        
        <div style="background: #f8f9fa; border-left: 5px solid #17a2b8; padding: 1.5rem; margin: 1rem 0;">
          <h4 style="color: #17a2b8;">主要リスクカテゴリーと特性分析</h4>
          <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
            <thead style="background: linear-gradient(135deg, #17a2b8 0%, #20c997 100%); color: white;">
              <tr>
                <th style="padding: 15px; text-align: left;">リスクカテゴリー</th>
                <th style="padding: 15px; text-align: left;">具体的リスク</th>
                <th style="padding: 15px; text-align: left;">影響度</th>
                <th style="padding: 15px; text-align: left;">管理手法</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">市場リスク</td>
                <td style="padding: 12px;">価格変動、金利変動、為替変動</td>
                <td style="padding: 12px; color: #e74c3c; font-weight: bold;">高</td>
                <td style="padding: 12px;">分散投資、ヘッジング</td>
              </tr>
              <tr style="background: #f8f9fa; border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">信用リスク</td>
                <td style="padding: 12px;">債務不履行、格付け変更</td>
                <td style="padding: 12px; color: #f39c12; font-weight: bold;">中高</td>
                <td style="padding: 12px;">信用分析、発行体分散</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">流動性リスク</td>
                <td style="padding: 12px;">売買困難、価格インパクト</td>
                <td style="padding: 12px; color: #f39c12; font-weight: bold;">中</td>
                <td style="padding: 12px;">流動性確保、期間分散</td>
              </tr>
              <tr style="background: #f8f9fa; border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">システミックリスク</td>
                <td style="padding: 12px;">市場全体の崩壊、金融危機</td>
                <td style="padding: 12px; color: #e74c3c; font-weight: bold;">極高</td>
                <td style="padding: 12px;">資産クラス分散、現金保有</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold;">インフレリスク</td>
                <td style="padding: 12px;">購買力の減少、実質リターン低下</td>
                <td style="padding: 12px; color: #17a2b8; font-weight: bold;">中長期高</td>
                <td style="padding: 12px;">実物資産、物価連動債</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 1.5rem; border-radius: 10px; margin: 1rem 0; color: white;">
          <h4 style="margin-bottom: 1rem;">🎯 現代的リスク管理の基本原則</h4>
          <ul style="list-style: none; padding: 0;">
            <li style="margin: 0.5rem 0; padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.3);">✓ リスクの完全回避ではなく、最適化を目指す</li>
            <li style="margin: 0.5rem 0; padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.3);">✓ 定量化可能なリスクと不可能なリスクの区別</li>
            <li style="margin: 0.5rem 0; padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.3);">✓ 時間軸による影響度の変化を考慮</li>
            <li style="margin: 0.5rem 0; padding: 0.5rem 0;">✓ 動的な管理プロセスの構築</li>
          </ul>
        </div>

        <h3 style="color: #2c3e50; border-bottom: 3px solid #e74c3c; padding-bottom: 0.5rem;">🔬 リスク測定・評価の科学的手法</h3>
        <p style="font-size: 1.05em; line-height: 1.7; color: #2c3e50;">効果的なリスク管理の前提として、リスクの正確な測定と評価が不可欠です。統計学的手法、確率論的アプローチ、シミュレーション技術などを活用し、リスクを定量化することで、客観的で合理的な投資判断が可能になります。</p>`
      },
      {
        type: 'text',
        title: 'ポートフォリオ理論に基づく分散投資戦略',
        content: `<div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 2rem; border-radius: 15px; margin: 1.5rem 0; color: white;">
          <h3 style="color: #fff; margin-bottom: 1rem;">🎨 モダンポートフォリオ理論の実践応用</h3>
          <p style="font-size: 1.1em; line-height: 1.6;">ハリー・マーコウィッツが提唱したモダンポートフォリオ理論は、リスク管理の根幹をなす概念です。相関関係の低い資産を組み合わせることで、個別資産のリスクよりも低いポートフォリオリスクを実現し、効率的フロンティアに沿った最適な投資配分を構築できます。</p>
        </div>

        <h3 style="color: #2c3e50; border-bottom: 3px solid #f39c12; padding-bottom: 0.5rem;">📈 効率的フロンティアと最適配分</h3>
        
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
          <h4 style="color: #856404; margin-bottom: 1rem;">リスク・リターン最適化の実践的アプローチ</h4>
          <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
            <thead style="background: linear-gradient(135deg, #fdcb6e 0%, #e17055 100%); color: white;">
              <tr>
                <th style="padding: 15px; text-align: left;">リスクレベル</th>
                <th style="padding: 15px; text-align: left;">期待リターン</th>
                <th style="padding: 15px; text-align: left;">標準偏差</th>
                <th style="padding: 15px; text-align: left;">推奨配分例</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold; color: #27ae60;">保守的</td>
                <td style="padding: 12px; color: #27ae60;">4-6%</td>
                <td style="padding: 12px; color: #27ae60;">8-12%</td>
                <td style="padding: 12px;">債券70%、株式20%、現金10%</td>
              </tr>
              <tr style="background: #f8f9fa; border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold; color: #3498db;">バランス</td>
                <td style="padding: 12px; color: #3498db;">6-8%</td>
                <td style="padding: 12px; color: #3498db;">12-16%</td>
                <td style="padding: 12px;">債券50%、株式40%、現金10%</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold; color: #f39c12;">成長重視</td>
                <td style="padding: 12px; color: #f39c12;">8-10%</td>
                <td style="padding: 12px; color: #f39c12;">16-20%</td>
                <td style="padding: 12px;">債券30%、株式60%、現金10%</td>
              </tr>
              <tr style="background: #f8f9fa;">
                <td style="padding: 12px; font-weight: bold; color: #e74c3c;">積極的</td>
                <td style="padding: 12px; color: #e74c3c;">10-12%</td>
                <td style="padding: 12px; color: #e74c3c;">20-25%</td>
                <td style="padding: 12px;">債券10%、株式80%、現金10%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 1.5rem; border-radius: 12px; margin: 1rem 0;">
          <h4 style="color: #2c3e50; margin-bottom: 1rem;">🌍 多次元分散戦略の実装</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
            <div style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h5 style="color: #e74c3c; margin-bottom: 0.5rem;">🏭 資産クラス分散</h5>
              <p style="font-size: 0.9em;">株式、債券、不動産、商品など異なる資産クラスへの配分</p>
            </div>
            <div style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h5 style="color: #27ae60; margin-bottom: 0.5rem;">🌐 地域分散</h5>
              <p style="font-size: 0.9em;">先進国、新興国、国内市場への地理的分散投資</p>
            </div>
            <div style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h5 style="color: #3498db; margin-bottom: 0.5rem;">🏢 セクター分散</h5>
              <p style="font-size: 0.9em;">技術、ヘルスケア、金融など業種間での分散</p>
            </div>
            <div style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h5 style="color: #9b59b6; margin-bottom: 0.5rem;">⏰ 時間分散</h5>
              <p style="font-size: 0.9em;">ドルコスト平均法による時間軸での分散投資</p>
            </div>
          </div>
        </div>

        <h3 style="color: #2c3e50; border-bottom: 3px solid #9b59b6; padding-bottom: 0.5rem;">🔄 動的リバランシングシステム</h3>
        <div style="background: #f8f9fa; border-left: 5px solid #6f42c1; padding: 1.5rem; margin: 1rem 0;">
          <h4 style="color: #6f42c1;">戦略的・戦術的リバランシング</h4>
          <p style="font-size: 1.05em; line-height: 1.7; color: #2c3e50;">市場の変動により、当初設定した資産配分比率は時間とともに乖離します。定期的なリバランシングにより、目標配分を維持し、リスクレベルを適切にコントロールすることが重要です。リバランシングには固定期間方式、閾値方式、複合方式があり、コストと効果のバランスを考慮して最適な方法を選択します。</p>
        </div>`
      },
      {
        type: 'text',
        title: 'VaRとストレステスト：高度なリスク測定技術',
        content: `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 15px; margin: 1.5rem 0; color: white;">
          <h3 style="color: #fff; margin-bottom: 1rem;">📊 定量的リスク評価の最前線</h3>
          <p style="font-size: 1.1em; line-height: 1.6;">VaR（Value at Risk）は、特定の信頼水準と期間における最大予想損失額を示す指標です。この技術により、ポートフォリオのリスクを数値化し、客観的な基準でリスク管理を行うことが可能になります。さらに、ストレステストにより極端な市場状況下でのパフォーマンスを評価できます。</p>
        </div>

        <h3 style="color: #2c3e50; border-bottom: 3px solid #e74c3c; padding-bottom: 0.5rem;">🎯 VaR計算手法の実践的応用</h3>
        
        <div style="background: #f8f9fa; border-left: 5px solid #28a745; padding: 1.5rem; margin: 1rem 0;">
          <h4 style="color: #28a745;">主要VaR計算モデルの比較分析</h4>
          <table style="width: 100%; border-collapse: collapse; margin: 1rem 0; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <thead style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white;">
              <tr>
                <th style="padding: 15px; text-align: left;">手法</th>
                <th style="padding: 15px; text-align: left;">計算方法</th>
                <th style="padding: 15px; text-align: left;">適用場面</th>
                <th style="padding: 15px; text-align: left;">メリット・デメリット</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">パラメトリック法</td>
                <td style="padding: 12px;">正規分布仮定による解析解</td>
                <td style="padding: 12px;">標準的ポートフォリオ</td>
                <td style="padding: 12px;">簡単・高速／分布仮定に依存</td>
              </tr>
              <tr style="background: #f8f9fa; border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">ヒストリカル法</td>
                <td style="padding: 12px;">過去データの分位点</td>
                <td style="padding: 12px;">複雑な非線形ポートフォリオ</td>
                <td style="padding: 12px;">分布仮定不要／データ依存性高</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">モンテカルロ法</td>
                <td style="padding: 12px;">確率シミュレーション</td>
                <td style="padding: 12px;">デリバティブ含有ポートフォリオ</td>
                <td style="padding: 12px;">柔軟性高／計算負荷大</td>
              </tr>
              <tr style="background: #f8f9fa;">
                <td style="padding: 12px; font-weight: bold;">極値理論</td>
                <td style="padding: 12px;">テール部分の特別扱い</td>
                <td style="padding: 12px;">リスク資産中心ポートフォリオ</td>
                <td style="padding: 12px;">テールリスク精密／複雑な計算</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); padding: 1.5rem; border-radius: 12px; margin: 1rem 0;">
          <h4 style="color: #2c3e50; margin-bottom: 1rem;">🌪️ ストレステストシナリオ設計</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
            <div style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h5 style="color: #e74c3c; margin-bottom: 1rem;">📉 市場ショックシナリオ</h5>
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="padding: 0.5rem 0; border-bottom: 1px solid #f1f1f1;">• 株価30%下落</li>
                <li style="padding: 0.5rem 0; border-bottom: 1px solid #f1f1f1;">• 金利200bp上昇</li>
                <li style="padding: 0.5rem 0; border-bottom: 1px solid #f1f1f1;">• 為替20%変動</li>
                <li style="padding: 0.5rem 0;">• 信用スプレッド拡大</li>
              </ul>
            </div>
            <div style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h5 style="color: #27ae60; margin-bottom: 1rem;">🏛️ システミックリスクシナリオ</h5>
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="padding: 0.5rem 0; border-bottom: 1px solid #f1f1f1;">• 金融危機再来</li>
                <li style="padding: 0.5rem 0; border-bottom: 1px solid #f1f1f1;">• パンデミック影響</li>
                <li style="padding: 0.5rem 0; border-bottom: 1px solid #f1f1f1;">• 地政学リスク</li>
                <li style="padding: 0.5rem 0;">• 規制変更リスク</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 style="color: #2c3e50; border-bottom: 3px solid #17a2b8; padding-bottom: 0.5rem;">⚠️ VaRの限界と補完手法</h3>
        <p style="font-size: 1.05em; line-height: 1.7; color: #2c3e50;">VaRは有用な指標ですが、テールリスクの過小評価、非正規分布への対応不足、市場の非連続的変動への対応困難などの限界があります。これらを補完するため、ES（Expected Shortfall）、最大ドローダウン、条件付きVaRなどの指標を併用し、多面的なリスク評価を行うことが重要です。</p>`
      },
      {
        type: 'text',
        title: 'ヘッジング戦略と金融派生商品の活用',
        content: `<div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 2rem; border-radius: 15px; margin: 1.5rem 0; color: white;">
          <h3 style="color: #fff; margin-bottom: 1rem;">🛡️ デリバティブを活用したリスクヘッジ</h3>
          <p style="font-size: 1.1em; line-height: 1.6;">金融派生商品（デリバティブ）は、適切に使用すればポートフォリオリスクを効果的に軽減する強力なツールです。オプション、先物、スワップなどの特性を理解し、コストと効果のバランスを考慮したヘッジ戦略を構築することで、市場変動に対する耐性を向上させることができます。</p>
        </div>

        <h3 style="color: #2c3e50; border-bottom: 3px solid #f39c12; padding-bottom: 0.5rem;">⚡ 主要ヘッジング手法の戦略的選択</h3>
        
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
          <h4 style="color: #856404; margin-bottom: 1rem;">ヘッジング商品の特性比較と活用戦略</h4>
          <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <thead style="background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%); color: white;">
              <tr>
                <th style="padding: 15px; text-align: left;">デリバティブ種類</th>
                <th style="padding: 15px; text-align: left;">ヘッジ対象リスク</th>
                <th style="padding: 15px; text-align: left;">コスト特性</th>
                <th style="padding: 15px; text-align: left;">適用場面</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">プットオプション</td>
                <td style="padding: 12px;">株価下落リスク</td>
                <td style="padding: 12px; color: #e74c3c;">プレミアム必要</td>
                <td style="padding: 12px;">保険的ヘッジ、部分的保護</td>
              </tr>
              <tr style="background: #f8f9fa; border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">先物売り</td>
                <td style="padding: 12px;">市場全体の下落</td>
                <td style="padding: 12px; color: #27ae60;">証拠金のみ</td>
                <td style="padding: 12px;">完全ヘッジ、短期保護</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">金利スワップ</td>
                <td style="padding: 12px;">金利変動リスク</td>
                <td style="padding: 12px; color: #3498db;">スプレッドコスト</td>
                <td style="padding: 12px;">債券ポートフォリオ、長期</td>
              </tr>
              <tr style="background: #f8f9fa; border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">通貨ヘッジ</td>
                <td style="padding: 12px;">為替変動リスク</td>
                <td style="padding: 12px; color: #f39c12;">フォワード利回り差</td>
                <td style="padding: 12px;">外国資産投資、貿易決済</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold;">VIXオプション</td>
                <td style="padding: 12px;">ボラティリティリスク</td>
                <td style="padding: 12px; color: #e74c3c;">高コンタンゴ</td>
                <td style="padding: 12px;">市場危機時保護、短期</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 1.5rem; border-radius: 12px; margin: 1rem 0;">
          <h4 style="color: #2c3e50; margin-bottom: 1rem;">🎯 ヘッジ効果の測定と最適化</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
            <div style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 3px 6px rgba(0,0,0,0.1);">
              <h5 style="color: #e74c3c; margin-bottom: 1rem; display: flex; align-items: center;">
                <span style="background: #e74c3c; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 0.5rem; font-size: 0.8em;">β</span>
                ベータヘッジ
              </h5>
              <p style="font-size: 0.9em; line-height: 1.6;">ポートフォリオのベータ値に基づいてヘッジ比率を決定し、市場リスクを中性化する手法</p>
            </div>
            <div style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 3px 6px rgba(0,0,0,0.1);">
              <h5 style="color: #27ae60; margin-bottom: 1rem; display: flex; align-items: center;">
                <span style="background: #27ae60; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 0.5rem; font-size: 0.8em;">Δ</span>
                デルタヘッジ
              </h5>
              <p style="font-size: 0.9em; line-height: 1.6;">オプションのデルタ値を活用した精密なリスク調整により、価格感応度を制御</p>
            </div>
            <div style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 3px 6px rgba(0,0,0,0.1);">
              <h5 style="color: #3498db; margin-bottom: 1rem; display: flex; align-items: center;">
                <span style="background: #3498db; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 0.5rem; font-size: 0.8em;">%</span>
                比例ヘッジ
              </h5>
              <p style="font-size: 0.9em; line-height: 1.6;">ポートフォリオ価値の一定割合をヘッジすることで、コストと効果のバランスを調整</p>
            </div>
          </div>
        </div>

        <h3 style="color: #2c3e50; border-bottom: 3px solid #9b59b6; padding-bottom: 0.5rem;">💰 ヘッジコスト管理と効果測定</h3>
        <div style="background: #f8f9fa; border-left: 5px solid #6f42c1; padding: 1.5rem; margin: 1rem 0;">
          <p style="font-size: 1.05em; line-height: 1.7; color: #2c3e50; margin-bottom: 1rem;">ヘッジング戦略の成功は、コストと効果の適切なバランスにあります。過度なヘッジングは収益性を損ない、不十分なヘッジングはリスク管理の目的を達成できません。ヘッジ比率の最適化、タイミングの選択、ロールオーバー戦略により、効率的なリスク管理を実現します。</p>
          <div style="background: white; padding: 1rem; border-radius: 8px; border-left: 4px solid #6f42c1;">
            <h5 style="color: #6f42c1; margin-bottom: 0.5rem;">📊 ヘッジ効果の定量評価</h5>
            <p style="font-size: 0.95em; color: #6c757d;">シャープレシオの改善、最大ドローダウンの削減、VaR値の変化などの指標を用いて、ヘッジング戦略の有効性を継続的に監視・評価します。</p>
          </div>
        </div>`
      },
      {
        type: 'text',
        title: '行動ファイナンス的リスク管理とバイアス対策',
        content: `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 15px; margin: 1.5rem 0; color: white;">
          <h3 style="color: #fff; margin-bottom: 1rem;">🧠 投資家心理とリスク認知の科学</h3>
          <p style="font-size: 1.1em; line-height: 1.6;">投資におけるリスク管理は、定量的手法だけでなく、投資家の心理的側面も考慮する必要があります。行動ファイナンス理論に基づき、認知バイアスやヒューリスティック（経験則）がリスク判断に与える影響を理解し、合理的な意思決定プロセスを構築することが重要です。</p>
        </div>

        <h3 style="color: #2c3e50; border-bottom: 3px solid #e74c3c; padding-bottom: 0.5rem;">🎭 主要認知バイアスとその対策</h3>
        
        <div style="background: #f8f9fa; border-left: 5px solid #e74c3c; padding: 1.5rem; margin: 1rem 0;">
          <h4 style="color: #e74c3c;">投資判断を歪める心理的罠</h4>
          <table style="width: 100%; border-collapse: collapse; margin: 1rem 0; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
            <thead style="background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); color: white;">
              <tr>
                <th style="padding: 15px; text-align: left;">認知バイアス</th>
                <th style="padding: 15px; text-align: left;">リスク管理への影響</th>
                <th style="padding: 15px; text-align: left;">対策手法</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">損失回避バイアス</td>
                <td style="padding: 12px;">過度なリスク回避、機会損失</td>
                <td style="padding: 12px;">目標ベース投資、段階的エクスポージャー</td>
              </tr>
              <tr style="background: #f8f9fa; border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">過信バイアス</td>
                <td style="padding: 12px;">リスクの過小評価、過大投資</td>
                <td style="padding: 12px;">第三者評価、悪魔の代弁者手法</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">確認バイアス</td>
                <td style="padding: 12px;">都合の良い情報のみ収集、盲点拡大</td>
                <td style="padding: 12px;">反対意見の積極的収集、多角的分析</td>
              </tr>
              <tr style="background: #f8f9fa; border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">アンカリング効果</td>
                <td style="padding: 12px;">過去価格への固執、判断の硬直化</td>
                <td style="padding: 12px;">複数基準点の設定、定期的基準見直し</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">群集心理</td>
                <td style="padding: 12px;">市場の熱狂・恐怖に追従、逆張り失敗</td>
                <td style="padding: 12px;">逆張り指標活用、独立判断プロセス</td>
              </tr>
              <tr style="background: #f8f9fa;">
                <td style="padding: 12px; font-weight: bold;">現状維持バイアス</td>
                <td style="padding: 12px;">必要な調整の先送り、機会逸失</td>
                <td style="padding: 12px;">定期見直しスケジュール、自動化</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); padding: 1.5rem; border-radius: 12px; margin: 1rem 0;">
          <h4 style="color: #2c3e50; margin-bottom: 1rem;">🎯 合理的意思決定プロセスの構築</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">
            <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
              <h5 style="color: #e74c3c; margin-bottom: 1rem; font-size: 1.1em;">📋 構造化意思決定フレーム</h5>
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="padding: 0.7rem 0; border-bottom: 1px solid #f1f1f1; display: flex; align-items: center;">
                  <span style="background: #e74c3c; color: white; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 0.5rem; font-size: 0.7em;">1</span>
                  目標の明確化と定量化
                </li>
                <li style="padding: 0.7rem 0; border-bottom: 1px solid #f1f1f1; display: flex; align-items: center;">
                  <span style="background: #e74c3c; color: white; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 0.5rem; font-size: 0.7em;">2</span>
                  制約条件の整理と確認
                </li>
                <li style="padding: 0.7rem 0; border-bottom: 1px solid #f1f1f1; display: flex; align-items: center;">
                  <span style="background: #e74c3c; color: white; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 0.5rem; font-size: 0.7em;">3</span>
                  選択肢の網羅的列挙
                </li>
                <li style="padding: 0.7rem 0; display: flex; align-items: center;">
                  <span style="background: #e74c3c; color: white; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 0.5rem; font-size: 0.7em;">4</span>
                  客観的評価基準による比較
                </li>
              </ul>
            </div>
            <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
              <h5 style="color: #27ae60; margin-bottom: 1rem; font-size: 1.1em;">🤖 システム化による感情制御</h5>
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="padding: 0.7rem 0; border-bottom: 1px solid #f1f1f1; display: flex; align-items: center;">
                  <span style="color: #17a2b8; margin-right: 0.5rem;">★</span>
                  自動リバランシング設定
                </li>
                <li style="padding: 0.7rem 0; border-bottom: 1px solid #f1f1f1; display: flex; align-items: center;">
                  <span style="color: #17a2b8; margin-right: 0.5rem;">★</span>
                  損切りルールの事前設定
                </li>
                <li style="padding: 0.7rem 0; border-bottom: 1px solid #f1f1f1; display: flex; align-items: center;">
                  <span style="color: #17a2b8; margin-right: 0.5rem;">★</span>
                  定期投資の自動化
                </li>
                <li style="padding: 0.7rem 0; display: flex; align-items: center;">
                  <span style="color: #17a2b8; margin-right: 0.5rem;">★</span>
                  投資日記による振り返り
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h3 style="color: #2c3e50; border-bottom: 3px solid #f39c12; padding-bottom: 0.5rem;">🧘 メンタルヘルス管理とストレス対策</h3>
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
          <p style="font-size: 1.05em; line-height: 1.7; color: #2c3e50; margin-bottom: 1rem;">投資におけるストレス管理は、長期的な成功のために不可欠です。市場の変動による心理的負担を軽減し、冷静な判断力を維持するために、適切な情報収集頻度の設定、分散投資によるリスク軽減、専門家との相談など、包括的なサポート体制を構築することが重要です。</p>
          <div style="background: white; padding: 1rem; border-radius: 8px; border-left: 4px solid #f39c12;">
            <h5 style="color: #856404; margin-bottom: 0.5rem;">🌈 投資ストレス軽減の実践的手法</h5>
            <p style="font-size: 0.95em; color: #6c757d;">適度な運動、十分な睡眠、バランスの取れた食事などの基本的な健康管理と、投資以外の趣味や社会活動への参加により、投資に過度に依存しない心理的安定を確保します。</p>
          </div>
        </div>`
      },
      {
        type: 'text',
        title: '総合的リスク管理システムの構築と運用',
        content: `<div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 2rem; border-radius: 15px; margin: 1.5rem 0; color: white;">
          <h3 style="color: #fff; margin-bottom: 1rem;">🏗️ 統合的リスクマネジメント体制の確立</h3>
          <p style="font-size: 1.1em; line-height: 1.6;">効果的なリスク管理は、個別の手法を統合したシステマティックなアプローチによって実現されます。リスク方針の策定、測定・監視体制の構築、対応プロセスの明文化、定期的な見直しサイクルの確立により、包括的で持続可能なリスク管理システムを構築します。</p>
        </div>

        <h3 style="color: #2c3e50; border-bottom: 3px solid #28a745; padding-bottom: 0.5rem;">🎯 リスク管理方針とガバナンス体制</h3>
        
        <div style="background: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
          <h4 style="color: #155724; margin-bottom: 1rem;">組織的リスク管理フレームワーク</h4>
          <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <thead style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white;">
              <tr>
                <th style="padding: 15px; text-align: left;">管理レベル</th>
                <th style="padding: 15px; text-align: left;">主要責任</th>
                <th style="padding: 15px; text-align: left;">実施項目</th>
                <th style="padding: 15px; text-align: left;">報告頻度</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">戦略レベル</td>
                <td style="padding: 12px;">投資方針・リスク限度の設定</td>
                <td style="padding: 12px;">資産配分決定、リスク予算配分</td>
                <td style="padding: 12px;">年次・重大事象時</td>
              </tr>
              <tr style="background: #f8f9fa; border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">戦術レベル</td>
                <td style="padding: 12px;">リスク測定・監視・報告</td>
                <td style="padding: 12px;">VaR計算、ストレステスト実施</td>
                <td style="padding: 12px;">月次・四半期</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">運用レベル</td>
                <td style="padding: 12px;">日常的リスク管理・対応</td>
                <td style="padding: 12px;">ポジション管理、限度額監視</td>
                <td style="padding: 12px;">日次・週次</td>
              </tr>
              <tr style="background: #f8f9fa;">
                <td style="padding: 12px; font-weight: bold;">監査レベル</td>
                <td style="padding: 12px;">独立検証・プロセス評価</td>
                <td style="padding: 12px;">リスク管理体制監査、改善提案</td>
                <td style="padding: 12px;">年次・特別時</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 1.5rem; border-radius: 12px; margin: 1rem 0;">
          <h4 style="color: #2c3e50; margin-bottom: 1rem;">📊 包括的リスク監視ダッシュボード</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1.5rem;">
            <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
              <h5 style="color: #e74c3c; margin-bottom: 1rem; font-size: 1.1em;">🔥 リアルタイム警告システム</h5>
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="padding: 0.7rem 0; border-bottom: 1px solid #f1f1f1; display: flex; align-items: center;">
                  <span style="color: #e74c3c; margin-right: 0.5rem;">🚨</span>
                  VaR限度額超過アラート
                </li>
                <li style="padding: 0.7rem 0; border-bottom: 1px solid #f1f1f1; display: flex; align-items: center;">
                  <span style="color: #f39c12; margin-right: 0.5rem;">⚠️</span>
                  集中度限度額接近警告
                </li>
                <li style="padding: 0.7rem 0; border-bottom: 1px solid #f1f1f1; display: flex; align-items: center;">
                  <span style="color: #17a2b8; margin-right: 0.5rem;">📊</span>
                  相関関係急変検知
                </li>
                <li style="padding: 0.7rem 0; display: flex; align-items: center;">
                  <span style="color: #6f42c1; margin-right: 0.5rem;">🔄</span>
                  リバランシング必要通知
                </li>
              </ul>
            </div>
            <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
              <h5 style="color: #27ae60; margin-bottom: 1rem; font-size: 1.1em;">📈 パフォーマンス分析機能</h5>
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="padding: 0.7rem 0; border-bottom: 1px solid #f1f1f1; display: flex; align-items: center;">
                  <span style="color: #28a745; margin-right: 0.5rem;">✓</span>
                  リスク調整後リターン計算
                </li>
                <li style="padding: 0.7rem 0; border-bottom: 1px solid #f1f1f1; display: flex; align-items: center;">
                  <span style="color: #28a745; margin-right: 0.5rem;">✓</span>
                  ベンチマーク対比分析
                </li>
                <li style="padding: 0.7rem 0; border-bottom: 1px solid #f1f1f1; display: flex; align-items: center;">
                  <span style="color: #28a745; margin-right: 0.5rem;">✓</span>
                  アトリビューション分析
                </li>
                <li style="padding: 0.7rem 0; display: flex; align-items: center;">
                  <span style="color: #28a745; margin-right: 0.5rem;">✓</span>
                  リスク寄与度分解
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h3 style="color: #2c3e50; border-bottom: 3px solid #17a2b8; padding-bottom: 0.5rem;">🔄 継続的改善プロセス</h3>
        <div style="background: #d1ecf1; border: 1px solid #bee5eb; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
          <p style="font-size: 1.05em; line-height: 1.7; color: #2c3e50; margin-bottom: 1rem;">リスク管理システムの有効性は、継続的な評価と改善によって維持されます。市場環境の変化、新しいリスク要因の出現、測定技術の進歩などに対応するため、定期的なシステム見直し、プロセス改善、人材育成を通じて、リスク管理能力の向上を図ります。</p>
          <div style="background: white; padding: 1rem; border-radius: 8px; border-left: 4px solid #17a2b8;">
            <h5 style="color: #0c5460; margin-bottom: 0.5rem;">🎯 リスク管理成熟度の向上</h5>
            <p style="font-size: 0.95em; color: #6c757d;">初期の基本的リスク管理から、高度な予測分析、機械学習を活用した動的リスク管理まで、組織の成熟度に応じて段階的にシステムを発展させていきます。</p>
          </div>
        </div>

        <div style="background: #f8f9fa; border-left: 5px solid #6f42c1; padding: 1.5rem; margin: 1rem 0;">
          <h4 style="color: #6f42c1;">🏆 成功するリスク管理の特徴</h4>
          <ul style="list-style: none; padding: 0;">
            <li style="margin: 0.8rem 0; padding: 0.8rem; background: white; border-radius: 5px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"><strong>🎯 明確な目標設定：</strong>定量的で測定可能なリスク目標とKPIの設定</li>
            <li style="margin: 0.8rem 0; padding: 0.8rem; background: white; border-radius: 5px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"><strong>🔄 プロセスの体系化：</strong>標準化された手順と責任の明確化</li>
            <li style="margin: 0.8rem 0; padding: 0.8rem; background: white; border-radius: 5px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"><strong>🤝 組織的な取り組み：</strong>全体最適の視点とステークホルダーとの連携</li>
            <li style="margin: 0.8rem 0; padding: 0.8rem; background: white; border-radius: 5px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"><strong>📚 継続的な学習：</strong>新しい手法の導入と経験からの学習</li>
          </ul>
        </div>`
      }
    ],
    keyPoints: [
      '投資リスクの体系的分類と各リスクの特性・影響度・管理手法の理解',
      'VaRやストレステストなど定量的リスク測定技術の実践的活用',
      'モダンポートフォリオ理論に基づく分散投資とリバランシング戦略',
      'デリバティブを活用したヘッジング戦略の設計と最適化',
      '行動ファイナンス理論に基づく認知バイアス対策と合理的意思決定',
      '包括的リスク管理システムの構築と継続的改善プロセスの確立'
    ],
    summary: 'このレッスンでは、投資における包括的なリスク管理について学習しました。市場リスク、信用リスク、流動性リスクなど各種リスクの特性と管理手法、VaRやストレステストによる定量的評価、ポートフォリオ理論に基づく分散投資戦略、デリバティブを活用したヘッジング手法、行動ファイナンス的アプローチによるバイアス対策、そして統合的リスク管理システムの構築方法を習得しました。これらの知識と技術により、リスクを適切に管理しながら長期的な投資成功を実現できます。',
    practicalExamples: [
      '個人投資家向けVaR計算とリスク限度額設定による自己管理システム',
      'ETFとオプションを組み合わせた低コストヘッジ戦略の実装',
      '認知バイアス対策として自動リバランシング機能付きロボアドバイザー活用',
      '家計レベルでの包括的リスク管理：投資・保険・緊急資金の統合管理'
    ],
    warningNotes: [
      'リスク管理は完全なリスク回避ではなく、リスクとリターンの最適化が目的',
      '過度なヘッジングは収益機会を制限し、コスト負担により全体パフォーマンスを悪化させる可能性',
      'VaRなどの定量的指標は有用だが限界があり、定性的判断との組み合わせが重要',
      '市場環境の急変時にはリスク管理手法自体が機能しない場合があることを認識',
      '個人の投資判断においても専門家との相談や継続的な学習が不可欠'
    ]
  },

  quiz: [
    {
      id: 'financial-literacy-24-q1',
      question: '投資リスクの分類において、市場全体の崩壊や金融危機などによるリスクは何と呼ばれますか？',
      options: [
        '市場リスク',
        'システミックリスク',
        '信用リスク',
        '流動性リスク'
      ],
      correctAnswer: 1,
      explanation: 'システミックリスクは市場全体や金融システム全体に影響を与えるリスクで、分散投資では軽減できない特徴があります。金融危機、パンデミック、戦争などがこれに該当し、現金保有や資産クラス分散などで対処します。'
    },
    {
      id: 'financial-literacy-24-q2',
      question: 'VaR（Value at Risk）について正しい説明はどれですか？',
      options: [
        '必ず発生する損失額を示す指標',
        '特定の信頼水準と期間における最大予想損失額',
        '投資の期待リターンを示す指標',
        'ポートフォリオの時価総額'
      ],
      correctAnswer: 1,
      explanation: 'VaRは「特定の信頼水準（例：95%）と期間（例：1日）における最大予想損失額」を示す指標です。例えば「95%信頼水準、1日VaR = 100万円」は「95%の確率で1日の損失は100万円以下」という意味です。'
    },
    {
      id: 'financial-literacy-24-q3',
      question: 'ヘッジング戦略について最も適切でない説明はどれですか？',
      options: [
        'リスクを完全に排除することが目的である',
        'デリバティブを活用してリスクを軽減する手法',
        'コストと効果のバランスを考慮する必要がある',
        'プットオプションや先物売りなどの手法がある'
      ],
      correctAnswer: 0,
      explanation: 'ヘッジングの目的はリスクの完全排除ではなく、適切なレベルまでのリスク軽減です。完全なヘッジングは高コストとなり、収益機会も制限します。リスクとリターンのバランスを考慮した最適なヘッジ比率の設定が重要です。'
    },
    {
      id: 'financial-literacy-24-q4',
      question: '行動ファイナンスの観点で、投資家が損失を過度に嫌う傾向は何と呼ばれますか？',
      options: [
        '過信バイアス',
        '損失回避バイアス',
        '確認バイアス',
        'アンカリング効果'
      ],
      correctAnswer: 1,
      explanation: '損失回避バイアスは、同じ金額でも損失による苦痛が利得による喜びよりも大きく感じられる心理的傾向です。これにより投資家は過度にリスクを回避し、機会損失を招く可能性があります。目標ベース投資などで対策できます。'
    },
    {
      id: 'financial-literacy-24-q5',
      question: '効果的な分散投資を行うために最も重要な要素は何ですか？',
      options: [
        '投資する銘柄数を可能な限り多くする',
        '相関関係の低い資産を組み合わせる',
        '全て同じ金額で投資する',
        '国内資産のみに投資する'
      ],
      correctAnswer: 1,
      explanation: '効果的な分散投資には、相関関係の低い資産の組み合わせが最も重要です。相関の低い資産を組み合わせることで、一つの資産が下落しても他の資産が上昇し、ポートフォリオ全体のリスクを個別資産のリスクより低く抑えることができます。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true

};