import type { Lesson } from '@/lib/types/learning';

export const lesson15: Lesson = {
  id: 'fl-inflation-investment-impact',
  categoryId: 'financial-literacy',
  title: 'インフレーションと投資への影響',
  slug: 'inflation-impact-on-investments',
  description: 'インフレのメカニズム、実質リターンの重要性、インフレヘッジ資産、中央銀行政策の影響を包括的に学習',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 50,
  orderIndex: 15,
  isPublished: true,
  tags: ['インフレーション', '実質リターン', '金融政策', 'インフレヘッジ', '購買力'],
  
  content: {
    sections: [
      {
        type: 'text',
        title: 'インフレーションの本質と測定方法',
        content: `
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 1rem; margin-bottom: 2rem;">
            <h2 style="color: white; margin-bottom: 1rem;">静かなる富の侵食者：インフレーション</h2>
            <p style="color: rgba(255,255,255,0.95); line-height: 1.8;">
              インフレーションは物価の持続的な上昇を意味し、貨幣の購買力を徐々に低下させます。見えない税金とも呼ばれ、適切な対策なしには資産の実質価値を大きく毀損する可能性があります。
            </p>
          </div>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">インフレーション率の計算と影響</h3>
          
          <div style="background: linear-gradient(to right, #f093fb 0%, #f5576c 100%); padding: 1.5rem; border-radius: 0.8rem; margin: 1.5rem 0;">
            <h4 style="color: white; margin-bottom: 1rem;">購買力の推移シミュレーション</h4>
            <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 0.5rem;">
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background: #f4f4f4;">
                    <th style="padding: 0.8rem; text-align: left;">インフレ率</th>
                    <th style="padding: 0.8rem; text-align: center;">10年後</th>
                    <th style="padding: 0.8rem; text-align: center;">20年後</th>
                    <th style="padding: 0.8rem; text-align: center;">30年後</th>
                    <th style="padding: 0.8rem; text-align: center;">購買力半減期間</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="padding: 0.8rem; border-top: 1px solid #ddd;"><strong>2%</strong>（先進国目標）</td>
                    <td style="padding: 0.8rem; text-align: center; border-top: 1px solid #ddd;">82万円</td>
                    <td style="padding: 0.8rem; text-align: center; border-top: 1px solid #ddd;">67万円</td>
                    <td style="padding: 0.8rem; text-align: center; border-top: 1px solid #ddd;">55万円</td>
                    <td style="padding: 0.8rem; text-align: center; border-top: 1px solid #ddd; color: #3498db;">36年</td>
                  </tr>
                  <tr style="background: rgba(240, 147, 251, 0.05);">
                    <td style="padding: 0.8rem;"><strong>3%</strong>（歴史的平均）</td>
                    <td style="padding: 0.8rem; text-align: center;">74万円</td>
                    <td style="padding: 0.8rem; text-align: center;">55万円</td>
                    <td style="padding: 0.8rem; text-align: center;">41万円</td>
                    <td style="padding: 0.8rem; text-align: center; color: #f39c12;">24年</td>
                  </tr>
                  <tr>
                    <td style="padding: 0.8rem;"><strong>5%</strong>（高インフレ）</td>
                    <td style="padding: 0.8rem; text-align: center;">61万円</td>
                    <td style="padding: 0.8rem; text-align: center;">38万円</td>
                    <td style="padding: 0.8rem; text-align: center;">23万円</td>
                    <td style="padding: 0.8rem; text-align: center; color: #e74c3c;">14年</td>
                  </tr>
                  <tr style="background: rgba(240, 147, 251, 0.05);">
                    <td style="padding: 0.8rem;"><strong>10%</strong>（ハイパーインフレ）</td>
                    <td style="padding: 0.8rem; text-align: center;">39万円</td>
                    <td style="padding: 0.8rem; text-align: center;">15万円</td>
                    <td style="padding: 0.8rem; text-align: center; color: #e74c3c;">5.7万円</td>
                    <td style="padding: 0.8rem; text-align: center; color: #e74c3c; font-weight: bold;">7年</td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size: 0.9rem; color: #7f8c8d; margin-top: 1rem;">※100万円の実質購買力の推移</p>
            </div>
          </div>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">主要なインフレ指標</h3>
          
          <div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); padding: 1.5rem; border-radius: 0.8rem; margin: 1.5rem 0;">
            <h4 style="color: white; margin-bottom: 1rem;">経済指標の理解</h4>
            <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 0.5rem;">
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                <div style="background: #e8f5e9; padding: 1rem; border-radius: 0.5rem;">
                  <h5 style="color: #27ae60; margin-bottom: 0.5rem;">📊 CPI（消費者物価指数）</h5>
                  <p style="font-size: 0.9rem; line-height: 1.6;">
                    一般消費者が購入する商品・サービスの価格変動を測定。最も一般的なインフレ指標。
                  </p>
                </div>
                <div style="background: #e3f2fd; padding: 1rem; border-radius: 0.5rem;">
                  <h5 style="color: #2196f3; margin-bottom: 0.5rem;">📈 コアCPI</h5>
                  <p style="font-size: 0.9rem; line-height: 1.6;">
                    変動の激しい食品・エネルギーを除外。基調的なインフレ傾向を把握。
                  </p>
                </div>
                <div style="background: #fff3e0; padding: 1rem; border-radius: 0.5rem;">
                  <h5 style="color: #ff9800; margin-bottom: 0.5rem;">🏭 PPI（生産者物価指数）</h5>
                  <p style="font-size: 0.9rem; line-height: 1.6;">
                    生産者レベルの価格変動。将来のCPIを予測する先行指標。
                  </p>
                </div>
                <div style="background: #f3e5f5; padding: 1rem; border-radius: 0.5rem;">
                  <h5 style="color: #9c27b0; margin-bottom: 0.5rem;">🏢 GDPデフレーター</h5>
                  <p style="font-size: 0.9rem; line-height: 1.6;">
                    経済全体の物価水準。最も包括的なインフレ指標。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style="background: #e8f8f5; border-left: 4px solid #27ae60; padding: 1.5rem; margin: 2rem 0;">
            <h4 style="color: #27ae60; margin-bottom: 0.8rem;">💡 ルール・オブ・70</h4>
            <p style="color: #2c3e50; line-height: 1.8;">
              <strong>70 ÷ インフレ率 = 物価が2倍になる年数</strong><br>
              例：インフレ率3%の場合、70 ÷ 3 = 約23年で物価が倍増<br>
              これは購買力が半減することを意味します。
            </p>
          </div>
        `
      },
      {
        type: 'text',
        title: '実質リターンvs名目リターン',
        content: `
          <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 2rem; border-radius: 1rem; margin-bottom: 2rem;">
            <h2 style="color: white; margin-bottom: 1rem;">見かけの利益と真の利益</h2>
            <p style="color: rgba(255,255,255,0.95); line-height: 1.8;">
              名目リターンがプラスでも、インフレ率を下回れば実質的には資産価値が減少しています。投資判断において実質リターンの理解は不可欠です。
            </p>
          </div>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">実質リターンの計算式</h3>
          
          <div style="background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%); padding: 1.5rem; border-radius: 0.8rem; margin: 1.5rem 0;">
            <h4 style="color: white; margin-bottom: 1rem;">フィッシャー方程式</h4>
            <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 0.5rem;">
              <p style="color: #2c3e50; font-weight: bold; margin-bottom: 1rem;">正確な計算式：</p>
              <code style="display: block; background: #f4f4f4; padding: 1rem; border-radius: 0.3rem; color: #e74c3c; font-size: 1.1rem;">
                実質リターン = (1 + 名目リターン) ÷ (1 + インフレ率) - 1
              </code>
              <p style="margin-top: 1rem; color: #7f8c8d;">簡易式：実質リターン ≈ 名目リターン - インフレ率</p>
            </div>
          </div>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">各資産クラスの実質リターン比較</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 0.8rem; overflow: hidden;">
            <thead>
              <tr style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                <th style="padding: 1.2rem; color: white; text-align: left;">資産クラス</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">名目リターン</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">インフレ率</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">実質リターン</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">30年後の実質価値</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background: rgba(240, 147, 251, 0.05);">
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>現金（預金）</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">0.01%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">2%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #e74c3c; font-weight: bold;">-1.99%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #e74c3c;">55万円</td>
              </tr>
              <tr>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>国債（10年）</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">3%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">2%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #f39c12;">1%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">135万円</td>
              </tr>
              <tr style="background: rgba(240, 147, 251, 0.05);">
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>株式</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">8%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">2%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #27ae60; font-weight: bold;">5.88%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #27ae60;">560万円</td>
              </tr>
              <tr>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>不動産（REIT）</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">6%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">2%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #27ae60;">3.92%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">315万円</td>
              </tr>
              <tr style="background: rgba(240, 147, 251, 0.05);">
                <td style="padding: 1rem;"><strong>金（ゴールド）</strong></td>
                <td style="padding: 1rem; text-align: center;">5%</td>
                <td style="padding: 1rem; text-align: center;">2%</td>
                <td style="padding: 1rem; text-align: center; color: #27ae60;">2.94%</td>
                <td style="padding: 1rem; text-align: center;">238万円</td>
              </tr>
            </tbody>
          </table>
          <p style="font-size: 0.9rem; color: #7f8c8d; margin-top: 0.5rem;">※100万円を30年間運用した場合の実質価値</p>

          <div style="background: #fef5e7; border-left: 4px solid #f39c12; padding: 1.5rem; margin: 2rem 0;">
            <h4 style="color: #f39c12; margin-bottom: 0.8rem;">⚠️ 隠れた資産減少の罠</h4>
            <p style="color: #2c3e50; line-height: 1.8;">
              銀行預金の金利0.01%は、インフレ率2%の環境下では年間約2%ずつ実質価値が減少します。30年後には購買力が約45%も失われることになります。
            </p>
          </div>
        `
      },
      {
        type: 'text',
        title: 'インフレヘッジ資産の活用',
        content: `
          <div style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 2rem; border-radius: 1rem; margin-bottom: 2rem;">
            <h2 style="color: #2c3e50; margin-bottom: 1rem;">インフレから資産を守る防御戦略</h2>
            <p style="color: #34495e; line-height: 1.8;">
              インフレヘッジ資産は、物価上昇に連動して価値が上昇する傾向があり、購買力の維持に有効です。適切な配分により、ポートフォリオ全体のインフレ耐性を高められます。
            </p>
          </div>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">主要なインフレヘッジ資産</h3>
          
          <div style="background: linear-gradient(to right, #ff6e7f 0%, #bfe9ff 100%); padding: 1.5rem; border-radius: 0.8rem; margin: 1.5rem 0;">
            <h4 style="color: white; margin-bottom: 1rem;">資産別インフレ対応力</h4>
            <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 0.5rem;">
              <div style="display: grid; gap: 1.5rem;">
                <div style="background: #fff9c4; padding: 1rem; border-radius: 0.5rem; border-left: 4px solid #fbc02d;">
                  <h5 style="color: #f57c00; margin-bottom: 0.8rem;">🥇 金（ゴールド）</h5>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span><strong>インフレヘッジ力:</strong></span>
                    <span style="color: #f39c12;">★★★★☆</span>
                  </div>
                  <p style="font-size: 0.9rem; line-height: 1.6;">
                    歴史的に通貨価値下落時の避難先。中央銀行の金融緩和時に特に有効。
                  </p>
                  <p style="font-size: 0.85rem; color: #7f8c8d; margin-top: 0.5rem;">
                    デメリット: 配当・利息なし、保管コスト
                  </p>
                </div>

                <div style="background: #e8f5e9; padding: 1rem; border-radius: 0.5rem; border-left: 4px solid #4caf50;">
                  <h5 style="color: #2e7d32; margin-bottom: 0.8rem;">🏠 不動産（現物・REIT）</h5>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span><strong>インフレヘッジ力:</strong></span>
                    <span style="color: #27ae60;">★★★★★</span>
                  </div>
                  <p style="font-size: 0.9rem; line-height: 1.6;">
                    賃料収入がインフレに連動。実物資産として価値保全。
                  </p>
                  <p style="font-size: 0.85rem; color: #7f8c8d; margin-top: 0.5rem;">
                    デメリット: 流動性低い、管理コスト
                  </p>
                </div>

                <div style="background: #e3f2fd; padding: 1rem; border-radius: 0.5rem; border-left: 4px solid #1976d2;">
                  <h5 style="color: #0d47a1; margin-bottom: 0.8rem;">📊 物価連動債（TIPS）</h5>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span><strong>インフレヘッジ力:</strong></span>
                    <span style="color: #3498db;">★★★★★</span>
                  </div>
                  <p style="font-size: 0.9rem; line-height: 1.6;">
                    元本がCPIに連動して調整。確実なインフレ保護。
                  </p>
                  <p style="font-size: 0.85rem; color: #7f8c8d; margin-top: 0.5rem;">
                    デメリット: 実質利回り低い、デフレ時不利
                  </p>
                </div>

                <div style="background: #f3e5f5; padding: 1rem; border-radius: 0.5rem; border-left: 4px solid #7b1fa2;">
                  <h5 style="color: #4a148c; margin-bottom: 0.8rem;">🛢️ コモディティ</h5>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span><strong>インフレヘッジ力:</strong></span>
                    <span style="color: #9c27b0;">★★★☆☆</span>
                  </div>
                  <p style="font-size: 0.9rem; line-height: 1.6;">
                    原材料価格上昇がインフレの原因。エネルギー・農産物が有効。
                  </p>
                  <p style="font-size: 0.85rem; color: #7f8c8d; margin-top: 0.5rem;">
                    デメリット: ボラティリティ高い、保管難
                  </p>
                </div>

                <div style="background: #ffebee; padding: 1rem; border-radius: 0.5rem; border-left: 4px solid #c62828;">
                  <h5 style="color: #b71c1c; margin-bottom: 0.8rem;">💎 暗号資産</h5>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span><strong>インフレヘッジ力:</strong></span>
                    <span style="color: #e74c3c;">★★☆☆☆</span>
                  </div>
                  <p style="font-size: 0.9rem; line-height: 1.6;">
                    供給量制限（ビットコイン）、デジタルゴールドの概念。
                  </p>
                  <p style="font-size: 0.85rem; color: #7f8c8d; margin-top: 0.5rem;">
                    デメリット: 極端な価格変動、規制リスク
                  </p>
                </div>
              </div>
            </div>
          </div>
        `
      },
      {
        type: 'text',
        title: '中央銀行政策とインフレサイクル',
        content: `
          <div style="background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%); padding: 2rem; border-radius: 1rem; margin-bottom: 2rem;">
            <h2 style="color: white; margin-bottom: 1rem;">金融政策の理解と投資戦略</h2>
            <p style="color: rgba(255,255,255,0.95); line-height: 1.8;">
              中央銀行の金融政策はインフレ率と金利を通じて、あらゆる資産価格に影響を与えます。政策サイクルの理解は、適切な資産配分の決定に不可欠です。
            </p>
          </div>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">金融政策サイクルと資産パフォーマンス</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 0.8rem; overflow: hidden;">
            <thead>
              <tr style="background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%);">
                <th style="padding: 1.2rem; color: white; text-align: left;">政策フェーズ</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">金利動向</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">好調な資産</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">不調な資産</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background: rgba(255, 107, 107, 0.05);">
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>金融緩和期</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">↓ 低下</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #27ae60;">株式、不動産、金</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #e74c3c;">現金、短期債券</td>
              </tr>
              <tr>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>景気回復期</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">→ 安定</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #27ae60;">株式、コモディティ</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #e74c3c;">長期債券</td>
              </tr>
              <tr style="background: rgba(255, 107, 107, 0.05);">
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>金融引締期</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">↑ 上昇</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #27ae60;">現金、短期債券</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #e74c3c;">株式、不動産、長期債券</td>
              </tr>
              <tr>
                <td style="padding: 1rem;"><strong>景気後退期</strong></td>
                <td style="padding: 1rem; text-align: center;">↓ 低下へ</td>
                <td style="padding: 1rem; text-align: center; color: #27ae60;">長期債券、金</td>
                <td style="padding: 1rem; text-align: center; color: #e74c3c;">株式、コモディティ</td>
              </tr>
            </tbody>
          </table>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">インフレ期待と実質金利</h3>
          
          <div style="background: linear-gradient(to right, #fc4a1a 0%, #f7b733 100%); padding: 1.5rem; border-radius: 0.8rem; margin: 1.5rem 0;">
            <h4 style="color: white; margin-bottom: 1rem;">実質金利の重要性</h4>
            <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 0.5rem;">
              <p style="color: #2c3e50; font-weight: bold; margin-bottom: 1rem;">実質金利 = 名目金利 - 期待インフレ率</p>
              <div style="background: #f8f9fa; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
                <h5 style="color: #2c3e50; margin-bottom: 0.8rem;">実質金利環境別の投資戦略</h5>
                <ul style="list-style-type: none; padding-left: 0;">
                  <li style="margin: 0.8rem 0; padding: 0.8rem; background: #e8f5e9; border-radius: 0.3rem;">
                    <strong style="color: #27ae60;">マイナス実質金利</strong>: 借入有利、現物資産選好、株式・不動産優位
                  </li>
                  <li style="margin: 0.8rem 0; padding: 0.8rem; background: #ffebee; border-radius: 0.3rem;">
                    <strong style="color: #e74c3c;">プラス実質金利</strong>: 貯蓄有利、債券魅力的、株式バリュエーション低下
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div style="background: #e8f8f5; border-left: 4px solid #16a085; padding: 1.5rem; margin: 2rem 0;">
            <h4 style="color: #16a085; margin-bottom: 0.8rem;">🎯 インフレ局面別の最適戦略</h4>
            <ul style="list-style-type: none; padding-left: 0;">
              <li style="margin: 0.8rem 0;">📈 <strong>低インフレ期（0-2%）</strong>: 成長株重視、長期債券保有</li>
              <li style="margin: 0.8rem 0;">⚠️ <strong>適正インフレ期（2-4%）</strong>: バランス型、配当株選好</li>
              <li style="margin: 0.8rem 0;">🔥 <strong>高インフレ期（4%超）</strong>: 実物資産、変動金利商品</li>
              <li style="margin: 0.8rem 0;">💸 <strong>デフレ期（マイナス）</strong>: 現金・国債最強、借入回避</li>
            </ul>
          </div>
        `
      },
      {
        type: 'text',
        title: 'インフレ時代の投資戦略',
        content: `
          <div style="background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); padding: 2rem; border-radius: 1rem; margin-bottom: 2rem;">
            <h2 style="color: white; margin-bottom: 1rem;">インフレ環境での資産形成戦略</h2>
            <p style="color: rgba(255,255,255,0.95); line-height: 1.8;">
              インフレは避けられない経済現象です。適切な対策により、インフレを味方につけ、実質的な資産成長を実現することが可能です。
            </p>
          </div>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">インフレ対応ポートフォリオの構築</h3>
          
          <div style="background: #f8f9fa; padding: 2rem; border-radius: 0.8rem;">
            <h4 style="color: #2c3e50; margin-bottom: 1.5rem;">インフレシナリオ別推奨配分</h4>
            
            <div style="background: white; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 1rem; border-left: 4px solid #3498db;">
              <h5 style="color: #3498db; margin-bottom: 0.8rem;">🌤️ 低インフレ環境（0-2%）</h5>
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin-bottom: 0.8rem;">
                <span><strong>株式:</strong> 60%</span>
                <span><strong>債券:</strong> 30%</span>
                <span><strong>金:</strong> 5%</span>
                <span><strong>現金:</strong> 5%</span>
              </div>
              <p style="font-size: 0.9rem; color: #7f8c8d;">成長重視、伝統的資産中心</p>
            </div>

            <div style="background: white; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 1rem; border-left: 4px solid #f39c12;">
              <h5 style="color: #f39c12; margin-bottom: 0.8rem;">⚡ 中インフレ環境（2-4%）</h5>
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin-bottom: 0.8rem;">
                <span><strong>株式:</strong> 50%</span>
                <span><strong>不動産:</strong> 20%</span>
                <span><strong>TIPS:</strong> 15%</span>
                <span><strong>金:</strong> 10%</span>
                <span><strong>現金:</strong> 5%</span>
              </div>
              <p style="font-size: 0.9rem; color: #7f8c8d;">実物資産増加、インフレ連動商品追加</p>
            </div>

            <div style="background: white; padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #e74c3c;">
              <h5 style="color: #e74c3c; margin-bottom: 0.8rem;">🔥 高インフレ環境（4%超）</h5>
              <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.5rem; margin-bottom: 0.8rem;">
                <span><strong>不動産:</strong> 30%</span>
                <span><strong>株式:</strong> 25%</span>
                <span><strong>金:</strong> 20%</span>
                <span><strong>TIPS:</strong> 15%</span>
                <span><strong>コモディティ:</strong> 10%</span>
              </div>
              <p style="font-size: 0.9rem; color: #7f8c8d;">実物資産中心、購買力保護最優先</p>
            </div>
          </div>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">実践的なアクションプラン</h3>
          
          <div style="background: linear-gradient(to right, #11998e 0%, #38ef7d 100%); padding: 1.5rem; border-radius: 0.8rem; margin: 1.5rem 0;">
            <h4 style="color: white; margin-bottom: 1rem;">インフレ対策チェックリスト</h4>
            <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 0.5rem;">
              <div style="display: grid; gap: 0.8rem;">
                <label style="display: flex; align-items: center; padding: 0.8rem; background: #f8f9fa; border-radius: 0.3rem;">
                  <input type="checkbox" style="margin-right: 0.8rem;">
                  <span>固定金利借入を変動金利に借り換え検討</span>
                </label>
                <label style="display: flex; align-items: center; padding: 0.8rem; background: #f8f9fa; border-radius: 0.3rem;">
                  <input type="checkbox" style="margin-right: 0.8rem;">
                  <span>現金比率を最小限に削減（緊急資金除く）</span>
                </label>
                <label style="display: flex; align-items: center; padding: 0.8rem; background: #f8f9fa; border-radius: 0.3rem;">
                  <input type="checkbox" style="margin-right: 0.8rem;">
                  <span>配当成長株の比率を増加</span>
                </label>
                <label style="display: flex; align-items: center; padding: 0.8rem; background: #f8f9fa; border-radius: 0.3rem;">
                  <input type="checkbox" style="margin-right: 0.8rem;">
                  <span>不動産投資（REIT含む）を検討</span>
                </label>
                <label style="display: flex; align-items: center; padding: 0.8rem; background: #f8f9fa; border-radius: 0.3rem;">
                  <input type="checkbox" style="margin-right: 0.8rem;">
                  <span>金を総資産の5-10%保有</span>
                </label>
                <label style="display: flex; align-items: center; padding: 0.8rem; background: #f8f9fa; border-radius: 0.3rem;">
                  <input type="checkbox" style="margin-right: 0.8rem;">
                  <span>長期固定金利債券の削減</span>
                </label>
                <label style="display: flex; align-items: center; padding: 0.8rem; background: #f8f9fa; border-radius: 0.3rem;">
                  <input type="checkbox" style="margin-right: 0.8rem;">
                  <span>スキルアップによる収入増加</span>
                </label>
              </div>
            </div>
          </div>

          <div style="background: #e8f8f5; border-left: 4px solid #16a085; padding: 1.5rem; margin: 2rem 0;">
            <h4 style="color: #16a085; margin-bottom: 0.8rem;">🎯 インフレ時代を生き抜く10の原則</h4>
            <ol style="padding-left: 1.5rem;">
              <li style="margin: 0.5rem 0;">実質リターンで考える習慣をつける</li>
              <li style="margin: 0.5rem 0;">現金は「確実に減る資産」と認識する</li>
              <li style="margin: 0.5rem 0;">借金はインフレで実質負担が減少する</li>
              <li style="margin: 0.5rem 0;">収入源を複数持ち、インフレ調整を確保</li>
              <li style="margin: 0.5rem 0;">実物資産への配分を増やす</li>
              <li style="margin: 0.5rem 0;">固定費用の長期契約を活用</li>
              <li style="margin: 0.5rem 0;">価格転嫁力のある企業に投資</li>
              <li style="margin: 0.5rem 0;">中央銀行の政策動向を注視</li>
              <li style="margin: 0.5rem 0;">グローバル分散でリスク軽減</li>
              <li style="margin: 0.5rem 0;">定期的なポートフォリオ見直し</li>
            </ol>
          </div>
        `
      },
      {
        type: 'text',
        title: '歴史から学ぶインフレーション',
        content: `
          <div style="background: linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%); padding: 2rem; border-radius: 1rem; margin-bottom: 2rem;">
            <h2 style="color: white; margin-bottom: 1rem;">過去のインフレ危機と教訓</h2>
            <p style="color: rgba(255,255,255,0.95); line-height: 1.8;">
              歴史は繰り返します。過去のインフレ期から学ぶことで、将来の危機に備えることができます。
            </p>
          </div>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">歴史的インフレーション事例</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 0.8rem; overflow: hidden;">
            <thead>
              <tr style="background: linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%);">
                <th style="padding: 1.2rem; color: white; text-align: left;">時期・国</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">最高インフレ率</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">原因</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">勝者の資産</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background: rgba(252, 74, 26, 0.05);">
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>1970年代 米国</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #e74c3c;">14.8%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">オイルショック</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">金、不動産、石油株</td>
              </tr>
              <tr>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>1923年 ドイツ</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #e74c3c; font-weight: bold;">29,500%/月</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">戦後賠償・紙幣乱発</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">外貨、実物資産</td>
              </tr>
              <tr style="background: rgba(252, 74, 26, 0.05);">
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>1989年 アルゼンチン</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #e74c3c;">4,923%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">財政赤字</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">ドル、不動産</td>
              </tr>
              <tr>
                <td style="padding: 1rem;"><strong>2008年 ジンバブエ</strong></td>
                <td style="padding: 1rem; text-align: center; color: #e74c3c; font-weight: bold;">2.3億%</td>
                <td style="padding: 1rem; text-align: center;">経済崩壊</td>
                <td style="padding: 1rem; text-align: center;">外貨、金</td>
              </tr>
            </tbody>
          </table>

          <div style="background: #fef5e7; border-left: 4px solid #f39c12; padding: 1.5rem; margin: 2rem 0;">
            <h4 style="color: #f39c12; margin-bottom: 0.8rem;">📚 歴史からの教訓</h4>
            <ul style="list-style-type: none; padding-left: 0;">
              <li style="margin: 0.8rem 0;">🔸 紙幣は最終的に価値を失う可能性がある</li>
              <li style="margin: 0.8rem 0;">🔸 実物資産は最強のインフレヘッジ</li>
              <li style="margin: 0.8rem 0;">🔸 外貨分散は通貨危機への保険</li>
              <li style="margin: 0.8rem 0;">🔸 借金はハイパーインフレで実質消滅</li>
              <li style="margin: 0.8rem 0;">🔸 早期の対策が資産保全の鍵</li>
            </ul>
          </div>
        `
      }
    ],
    keyPoints: [
      'インフレーションは購買力を徐々に侵食する「見えない税金」',
      '実質リターン（名目リターン - インフレ率）での投資判断が重要',
      '金、不動産、物価連動債などのインフレヘッジ資産の活用',
      '中央銀行の金融政策サイクルに応じた資産配分の調整',
      'インフレ環境では実物資産と変動金利商品が有利',
      '歴史的にハイパーインフレでは実物資産と外貨が資産保全に有効'
    ],
    summary: `
      インフレーションは避けられない経済現象であり、適切な理解と対策なしには資産の実質価値が大きく毀損されます。
      名目リターンではなく実質リターンで投資判断を行い、インフレヘッジ資産を適切に組み入れることが重要です。
      中央銀行の政策サイクルを理解し、インフレ局面に応じた資産配分を行うことで、
      購買力を維持しながら実質的な資産成長を実現できます。
      歴史が示すように、実物資産への配分と通貨分散が長期的な資産保全の鍵となります。
    `,
    practicalExamples: [
      '年2%のインフレで30年後には購買力が45%減少',
      '1970年代の米国では金が10倍、不動産が3倍に上昇',
      '物価連動債（TIPS）により確実なインフレヘッジを実現',
      'REITを通じた少額からの不動産投資でインフレ対策',
      '実質金利がマイナスの環境では借入による投資が有利'
    ],
    warningNotes: [
      '現金や普通預金は確実に実質価値が減少する資産',
      '長期固定金利債券はインフレ上昇時に大きな損失リスク',
      '暗号資産のインフレヘッジ効果は未検証で高リスク',
      'ハイパーインフレでは通常の投資理論が通用しない',
      '過度なレバレッジはインフレ予想が外れた際に致命的'
    ]
  },
  
  quiz: [
    {
      id: 'inflation-q1',
      question: '年率3%のインフレが続いた場合、購買力が半減するまでの期間は約何年ですか？',
      options: [
        '12年',
        '18年',
        '24年',
        '36年'
      ],
      correctAnswer: 2,
      explanation: 'ルール・オブ・70により、70 ÷ 3 = 約23-24年で購買力が半減します。これは物価が2倍になることと同義です。'
    },
    {
      id: 'inflation-q2',
      question: '名目リターン8%、インフレ率3%の場合、実質リターンは約何%ですか？',
      options: [
        '5%',
        '4.85%',
        '11%',
        '2.67%'
      ],
      correctAnswer: 1,
      explanation: 'フィッシャー方程式により、(1.08 ÷ 1.03) - 1 = 0.0485 = 約4.85%。簡易計算の8% - 3% = 5%も実用上は十分です。'
    },
    {
      id: 'inflation-q3',
      question: '最も効果的なインフレヘッジ資産の組み合わせは？',
      options: [
        '現金と長期国債',
        '不動産と物価連動債',
        '定期預金と社債',
        '仮想通貨のみ'
      ],
      correctAnswer: 1,
      explanation: '不動産は賃料がインフレ連動し、物価連動債は元本がCPIに連動して調整されるため、確実なインフレヘッジとなります。'
    },
    {
      id: 'inflation-q4',
      question: '実質金利がマイナスの環境で最も有利な行動は？',
      options: [
        '現金を多く保有する',
        '固定金利で借入して実物資産に投資',
        '長期債券を購入する',
        '定期預金に預ける'
      ],
      correctAnswer: 1,
      explanation: '実質金利がマイナスの場合、借入の実質負担が減少し、実物資産の価値が上昇しやすいため、レバレッジを活用した実物資産投資が有利です。'
    },
    {
      id: 'inflation-q5',
      question: '中央銀行が金融引き締めを行う際、最も不利になる資産は？',
      options: [
        '短期国債',
        '現金',
        '長期債券と成長株',
        '金（ゴールド）'
      ],
      correctAnswer: 2,
      explanation: '金利上昇により長期債券の価格は大きく下落し、成長株のバリュエーションも金利上昇により低下するため、両資産が最も不利になります。'
    }
  ],
  
  lastUpdated: '2025-08-15',
  factChecked: true
};