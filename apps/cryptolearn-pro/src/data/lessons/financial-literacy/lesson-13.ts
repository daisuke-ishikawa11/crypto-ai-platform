import type { Lesson } from '@/lib/types/learning';

export const lesson13: Lesson = {
  id: 'fl-international-diversification',
  categoryId: 'financial-literacy',
  title: '国際分散投資とグローバル市場',
  slug: 'international-diversification-global-markets',
  description: '国際分散投資の理論と実践、為替リスク管理、グローバル市場へのアクセス方法を学習',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 45,
  orderIndex: 13,
  isPublished: true,
  tags: ['国際投資', '分散投資', '為替', 'ETF', 'グローバル市場'],
  
  content: {
    sections: [
      {
        type: 'text',
        title: '国際分散投資の理論と必要性',
        content: `
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 1rem; margin-bottom: 2rem;">
            <h2 style="color: white; margin-bottom: 1rem;">ホームカントリーバイアスとその克服</h2>
            <p style="color: rgba(255,255,255,0.95); line-height: 1.8;">
              多くの投資家は自国の市場に投資を集中させる傾向があります。これを「ホームカントリーバイアス」と呼びます。しかし、真のリスク分散と成長機会の獲得には、国境を越えた投資が不可欠です。
            </p>
          </div>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">国際分散投資の数学的根拠</h3>
          
          <div style="background: linear-gradient(to right, #f093fb 0%, #f5576c 100%); padding: 1.5rem; border-radius: 0.8rem; margin: 1.5rem 0;">
            <h4 style="color: white; margin-bottom: 1rem;">相関係数と分散効果</h4>
            <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 0.5rem;">
              <p style="color: #2c3e50; font-weight: bold; margin-bottom: 1rem;">ポートフォリオの分散計算式：</p>
              <code style="display: block; background: #f4f4f4; padding: 1rem; border-radius: 0.3rem; color: #e74c3c;">
                σ²p = Σ(wi²σi²) + ΣΣ(wiwjσiσjρij)
              </code>
              <ul style="list-style-type: none; padding-left: 0; margin-top: 1rem;">
                <li style="margin: 0.5rem 0;">📊 <strong>σ²p</strong>: ポートフォリオ全体の分散</li>
                <li style="margin: 0.5rem 0;">📈 <strong>wi</strong>: 資産iの投資比率</li>
                <li style="margin: 0.5rem 0;">📉 <strong>ρij</strong>: 資産i,j間の相関係数</li>
                <li style="margin: 0.5rem 0;">💡 相関が低いほど分散効果が高い</li>
              </ul>
            </div>
          </div>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">地域別リターンの歴史的パフォーマンス</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 0.8rem; overflow: hidden;">
            <thead>
              <tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                <th style="padding: 1.2rem; color: white; text-align: left;">地域/市場</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">10年平均リターン</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">ボラティリティ</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">シャープレシオ</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background: rgba(102, 126, 234, 0.05);">
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);">米国株式（S&P 500）</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); font-weight: bold; color: #27ae60;">12.8%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">16.2%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #3498db;">0.79</td>
              </tr>
              <tr>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);">欧州株式（STOXX 600）</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); font-weight: bold; color: #27ae60;">7.3%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">18.5%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #3498db;">0.39</td>
              </tr>
              <tr style="background: rgba(102, 126, 234, 0.05);">
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);">日本株式（TOPIX）</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); font-weight: bold; color: #27ae60;">8.5%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">17.8%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #3498db;">0.48</td>
              </tr>
              <tr>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);">新興国株式（MSCI EM）</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); font-weight: bold; color: #27ae60;">5.8%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">22.4%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #3498db;">0.26</td>
              </tr>
              <tr style="background: rgba(102, 126, 234, 0.05);">
                <td style="padding: 1rem;">国際分散ポートフォリオ</td>
                <td style="padding: 1rem; text-align: center; font-weight: bold; color: #27ae60;">9.2%</td>
                <td style="padding: 1rem; text-align: center; color: #e74c3c;">14.1%</td>
                <td style="padding: 1rem; text-align: center; color: #3498db; font-weight: bold;">0.65</td>
              </tr>
            </tbody>
          </table>

          <div style="background: #e8f8f5; border-left: 4px solid #27ae60; padding: 1.5rem; margin: 2rem 0;">
            <h4 style="color: #27ae60; margin-bottom: 0.8rem;">💡 重要な洞察</h4>
            <p style="color: #2c3e50; line-height: 1.8;">
              国際分散ポートフォリオは、個別市場よりも低いボラティリティで安定したリターンを実現しています。これは異なる市場間の相関が完全ではないことによる分散効果の結果です。
            </p>
          </div>
        `
      },
      {
        type: 'text',
        title: '為替リスクの理解と管理戦略',
        content: `
          <div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); padding: 2rem; border-radius: 1rem; margin-bottom: 2rem;">
            <h2 style="color: white; margin-bottom: 1rem;">為替変動が投資リターンに与える影響</h2>
            <p style="color: rgba(255,255,255,0.95); line-height: 1.8;">
              国際投資において、為替変動は投資リターンの重要な構成要素です。適切な為替リスク管理により、ポートフォリオの安定性を高めることができます。
            </p>
          </div>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">為替リターンの計算方法</h3>
          
          <div style="background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%); padding: 1.5rem; border-radius: 0.8rem; margin: 1.5rem 0;">
            <h4 style="color: white; margin-bottom: 1rem;">トータルリターンの分解</h4>
            <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 0.5rem;">
              <p style="color: #2c3e50; font-weight: bold; margin-bottom: 1rem;">円建て投資家の米国株投資の例：</p>
              <ul style="list-style-type: none; padding-left: 0;">
                <li style="margin: 1rem 0; padding: 1rem; background: #f8f9fa; border-radius: 0.5rem;">
                  <strong style="color: #3498db;">現地通貨リターン</strong>: +15%（S&P 500の上昇）
                </li>
                <li style="margin: 1rem 0; padding: 1rem; background: #f8f9fa; border-radius: 0.5rem;">
                  <strong style="color: #e74c3c;">為替リターン</strong>: -5%（円高ドル安）
                </li>
                <li style="margin: 1rem 0; padding: 1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 0.5rem;">
                  <strong>円建てトータルリターン</strong>: 1.15 × 0.95 - 1 = +9.25%
                </li>
              </ul>
            </div>
          </div>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">為替ヘッジ戦略の比較</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 0.8rem; overflow: hidden;">
            <thead>
              <tr style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">
                <th style="padding: 1.2rem; color: white; text-align: left;">ヘッジ戦略</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">メリット</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">デメリット</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">適用場面</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background: rgba(250, 112, 154, 0.05);">
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1); font-weight: bold;">フルヘッジ</td>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);">
                  <span style="color: #27ae60;">✓</span> 為替リスク完全排除<br>
                  <span style="color: #27ae60;">✓</span> リターン予測性向上
                </td>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);">
                  <span style="color: #e74c3c;">✗</span> ヘッジコスト高い<br>
                  <span style="color: #e74c3c;">✗</span> 円安メリット享受不可
                </td>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);">短期投資、債券投資</td>
              </tr>
              <tr>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1); font-weight: bold;">部分ヘッジ（50%）</td>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);">
                  <span style="color: #27ae60;">✓</span> リスクとリターンのバランス<br>
                  <span style="color: #27ae60;">✓</span> コスト効率的
                </td>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);">
                  <span style="color: #e74c3c;">✗</span> 管理が複雑<br>
                  <span style="color: #e74c3c;">✗</span> 完全な保護なし
                </td>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);">中期投資、バランス型</td>
              </tr>
              <tr style="background: rgba(250, 112, 154, 0.05);">
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1); font-weight: bold;">ノーヘッジ</td>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);">
                  <span style="color: #27ae60;">✓</span> ヘッジコストゼロ<br>
                  <span style="color: #27ae60;">✓</span> 円安時の恩恵最大
                </td>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);">
                  <span style="color: #e74c3c;">✗</span> 為替リスク全面負担<br>
                  <span style="color: #e74c3c;">✗</span> ボラティリティ高い
                </td>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);">長期投資、株式中心</td>
              </tr>
              <tr>
                <td style="padding: 1rem; font-weight: bold;">ダイナミックヘッジ</td>
                <td style="padding: 1rem;">
                  <span style="color: #27ae60;">✓</span> 市場状況に応じて調整<br>
                  <span style="color: #27ae60;">✓</span> 機動的な対応
                </td>
                <td style="padding: 1rem;">
                  <span style="color: #e74c3c;">✗</span> 専門知識必要<br>
                  <span style="color: #e74c3c;">✗</span> 取引コスト増加
                </td>
                <td style="padding: 1rem;">機関投資家、アクティブ運用</td>
              </tr>
            </tbody>
          </table>

          <div style="background: #fef5e7; border-left: 4px solid #f39c12; padding: 1.5rem; margin: 2rem 0;">
            <h4 style="color: #f39c12; margin-bottom: 0.8rem;">⚠️ 為替ヘッジのコスト要因</h4>
            <ul style="list-style-type: none; padding-left: 0;">
              <li style="margin: 0.8rem 0;">📊 <strong>金利差</strong>: 日本と投資先国の金利差がヘッジコストの主要因</li>
              <li style="margin: 0.8rem 0;">💰 <strong>取引コスト</strong>: 為替予約やオプションの売買スプレッド</li>
              <li style="margin: 0.8rem 0;">📈 <strong>ロールオーバーコスト</strong>: ヘッジ期限到来時の更新コスト</li>
            </ul>
          </div>
        `
      },
      {
        type: 'text',
        title: 'ETFと投資信託を活用した国際投資',
        content: `
          <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 2rem; border-radius: 1rem; margin-bottom: 2rem;">
            <h2 style="color: white; margin-bottom: 1rem;">グローバル投資へのアクセス手段</h2>
            <p style="color: rgba(255,255,255,0.95); line-height: 1.8;">
              ETFと投資信託は、個人投資家が簡単に国際分散投資を実現できる優れたツールです。それぞれの特徴を理解し、目的に応じて使い分けることが重要です。
            </p>
          </div>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">主要な国際ETFの比較</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 0.8rem; overflow: hidden;">
            <thead>
              <tr style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                <th style="padding: 1.2rem; color: white; text-align: left;">ETF名称</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">投資対象</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">経費率</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">純資産総額</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">特徴</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background: rgba(240, 147, 251, 0.05);">
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1); font-weight: bold;">VT（全世界株式）</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">全世界約9,000銘柄</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #27ae60; font-weight: bold;">0.07%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">30兆円</td>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);">究極の分散投資</td>
              </tr>
              <tr>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1); font-weight: bold;">VTI（米国全体）</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">米国株式4,000銘柄</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #27ae60; font-weight: bold;">0.03%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">150兆円</td>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);">米国市場全体</td>
              </tr>
              <tr style="background: rgba(240, 147, 251, 0.05);">
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1); font-weight: bold;">VEA（先進国株式）</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">先進国（除く米国）</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #27ae60; font-weight: bold;">0.05%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">12兆円</td>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);">欧州・日本中心</td>
              </tr>
              <tr>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1); font-weight: bold;">VWO（新興国株式）</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">新興国市場</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #f39c12; font-weight: bold;">0.08%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">10兆円</td>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);">中国・インド含む</td>
              </tr>
              <tr style="background: rgba(240, 147, 251, 0.05);">
                <td style="padding: 1rem; font-weight: bold;">AGG（グローバル債券）</td>
                <td style="padding: 1rem; text-align: center;">世界債券市場</td>
                <td style="padding: 1rem; text-align: center; color: #27ae60; font-weight: bold;">0.03%</td>
                <td style="padding: 1rem; text-align: center;">11兆円</td>
                <td style="padding: 1rem;">安定性重視</td>
              </tr>
            </tbody>
          </table>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">国別ETFによる戦術的アロケーション</h3>
          
          <div style="background: linear-gradient(to right, #667eea 0%, #764ba2 100%); padding: 1.5rem; border-radius: 0.8rem; margin: 1.5rem 0;">
            <h4 style="color: white; margin-bottom: 1rem;">主要国・地域別ETFの活用</h4>
            <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 0.5rem;">
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                <div style="background: #f8f9fa; padding: 1rem; border-radius: 0.5rem;">
                  <h5 style="color: #3498db; margin-bottom: 0.5rem;">🇺🇸 米国</h5>
                  <p style="font-size: 0.9rem; line-height: 1.6;">SPY, VOO（S&P500）<br>QQQ（ナスダック100）<br>DIA（ダウ30）</p>
                </div>
                <div style="background: #f8f9fa; padding: 1rem; border-radius: 0.5rem;">
                  <h5 style="color: #3498db; margin-bottom: 0.5rem;">🇪🇺 欧州</h5>
                  <p style="font-size: 0.9rem; line-height: 1.6;">VGK（欧州全体）<br>EZU（ユーロ圏）<br>EWU（英国）</p>
                </div>
                <div style="background: #f8f9fa; padding: 1rem; border-radius: 0.5rem;">
                  <h5 style="color: #3498db; margin-bottom: 0.5rem;">🇯🇵 日本</h5>
                  <p style="font-size: 0.9rem; line-height: 1.6;">EWJ（日本株式）<br>DXJ（為替ヘッジ付）<br>1306（TOPIX ETF）</p>
                </div>
                <div style="background: #f8f9fa; padding: 1rem; border-radius: 0.5rem;">
                  <h5 style="color: #3498db; margin-bottom: 0.5rem;">🌏 アジア新興国</h5>
                  <p style="font-size: 0.9rem; line-height: 1.6;">ASHR（中国A株）<br>INDA（インド）<br>EWT（台湾）</p>
                </div>
              </div>
            </div>
          </div>

          <div style="background: #e8f5e9; border-left: 4px solid #4caf50; padding: 1.5rem; margin: 2rem 0;">
            <h4 style="color: #4caf50; margin-bottom: 0.8rem;">✅ ETF選択のチェックポイント</h4>
            <ul style="list-style-type: none; padding-left: 0;">
              <li style="margin: 0.8rem 0;">💡 <strong>経費率</strong>: 年間0.1%以下が理想的</li>
              <li style="margin: 0.8rem 0;">📊 <strong>流動性</strong>: 日次売買高1億円以上</li>
              <li style="margin: 0.8rem 0;">🏢 <strong>運用会社</strong>: Vanguard、BlackRock、State Street等の大手</li>
              <li style="margin: 0.8rem 0;">💰 <strong>純資産総額</strong>: 最低100億円以上</li>
              <li style="margin: 0.8rem 0;">📈 <strong>トラッキングエラー</strong>: ベンチマークとの乖離0.2%以内</li>
            </ul>
          </div>
        `
      },
      {
        type: 'text',
        title: '新興国市場への投資機会とリスク',
        content: `
          <div style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 2rem; border-radius: 1rem; margin-bottom: 2rem;">
            <h2 style="color: #2c3e50; margin-bottom: 1rem;">成長の源泉：新興国市場の魅力</h2>
            <p style="color: #34495e; line-height: 1.8;">
              新興国市場は高い経済成長率と人口ボーナスを背景に、長期的な投資機会を提供します。しかし、同時に固有のリスクも存在するため、慎重な分析が必要です。
            </p>
          </div>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">新興国の成長ドライバー分析</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 0.8rem; overflow: hidden;">
            <thead>
              <tr style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);">
                <th style="padding: 1.2rem; color: #2c3e50; text-align: left;">国/地域</th>
                <th style="padding: 1.2rem; color: #2c3e50; text-align: center;">GDP成長率</th>
                <th style="padding: 1.2rem; color: #2c3e50; text-align: center;">人口（億人）</th>
                <th style="padding: 1.2rem; color: #2c3e50; text-align: center;">主要セクター</th>
                <th style="padding: 1.2rem; color: #2c3e50; text-align: center;">投資魅力度</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background: rgba(168, 237, 234, 0.1);">
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>🇮🇳 インド</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #27ae60; font-weight: bold;">6.8%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">14.2</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">IT、製造業、消費</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">
                  <span style="color: #f39c12;">★★★★☆</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>🇨🇳 中国</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #27ae60; font-weight: bold;">5.2%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">14.1</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">テック、EV、消費</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">
                  <span style="color: #f39c12;">★★★☆☆</span>
                </td>
              </tr>
              <tr style="background: rgba(168, 237, 234, 0.1);">
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>🇻🇳 ベトナム</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #27ae60; font-weight: bold;">6.5%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">0.98</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">製造業、輸出</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">
                  <span style="color: #f39c12;">★★★★☆</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>🇧🇷 ブラジル</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #f39c12; font-weight: bold;">3.1%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">2.15</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">資源、農業</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">
                  <span style="color: #f39c12;">★★★☆☆</span>
                </td>
              </tr>
              <tr style="background: rgba(168, 237, 234, 0.1);">
                <td style="padding: 1rem;"><strong>🇮🇩 インドネシア</strong></td>
                <td style="padding: 1rem; text-align: center; color: #27ae60; font-weight: bold;">5.1%</td>
                <td style="padding: 1rem; text-align: center;">2.74</td>
                <td style="padding: 1rem; text-align: center;">資源、消費</td>
                <td style="padding: 1rem; text-align: center;">
                  <span style="color: #f39c12;">★★★☆☆</span>
                </td>
              </tr>
            </tbody>
          </table>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">新興国投資のリスクマトリックス</h3>
          
          <div style="background: linear-gradient(to right, #ff6e7f 0%, #bfe9ff 100%); padding: 1.5rem; border-radius: 0.8rem; margin: 1.5rem 0;">
            <h4 style="color: white; margin-bottom: 1rem;">リスク要因の評価基準</h4>
            <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 0.5rem;">
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;">
                <div style="background: #ffebee; padding: 1rem; border-radius: 0.5rem; border-left: 4px solid #e74c3c;">
                  <h5 style="color: #e74c3c; margin-bottom: 0.8rem;">政治・規制リスク</h5>
                  <ul style="list-style-type: none; padding-left: 0; font-size: 0.9rem;">
                    <li style="margin: 0.5rem 0;">• 政権交代による政策変更</li>
                    <li style="margin: 0.5rem 0;">• 外資規制の強化</li>
                    <li style="margin: 0.5rem 0;">• 国有化リスク</li>
                    <li style="margin: 0.5rem 0;">• 法制度の未整備</li>
                  </ul>
                </div>
                <div style="background: #fff3e0; padding: 1rem; border-radius: 0.5rem; border-left: 4px solid #ff9800;">
                  <h5 style="color: #ff9800; margin-bottom: 0.8rem;">経済・金融リスク</h5>
                  <ul style="list-style-type: none; padding-left: 0; font-size: 0.9rem;">
                    <li style="margin: 0.5rem 0;">• 通貨の急激な変動</li>
                    <li style="margin: 0.5rem 0;">• インフレーション</li>
                    <li style="margin: 0.5rem 0;">• 資本規制</li>
                    <li style="margin: 0.5rem 0;">• 流動性不足</li>
                  </ul>
                </div>
                <div style="background: #e3f2fd; padding: 1rem; border-radius: 0.5rem; border-left: 4px solid #2196f3;">
                  <h5 style="color: #2196f3; margin-bottom: 0.8rem;">市場構造リスク</h5>
                  <ul style="list-style-type: none; padding-left: 0; font-size: 0.9rem;">
                    <li style="margin: 0.5rem 0;">• 情報開示の不透明性</li>
                    <li style="margin: 0.5rem 0;">• コーポレートガバナンス</li>
                    <li style="margin: 0.5rem 0;">• 市場操作の可能性</li>
                    <li style="margin: 0.5rem 0;">• 決済システムの脆弱性</li>
                  </ul>
                </div>
                <div style="background: #f3e5f5; padding: 1rem; border-radius: 0.5rem; border-left: 4px solid #9c27b0;">
                  <h5 style="color: #9c27b0; margin-bottom: 0.8rem;">地政学リスク</h5>
                  <ul style="list-style-type: none; padding-left: 0; font-size: 0.9rem;">
                    <li style="margin: 0.5rem 0;">• 国際関係の緊張</li>
                    <li style="margin: 0.5rem 0;">• 経済制裁の影響</li>
                    <li style="margin: 0.5rem 0;">• 地域紛争</li>
                    <li style="margin: 0.5rem 0;">• テロ・治安リスク</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div style="background: #fef5e7; border-left: 4px solid #f39c12; padding: 1.5rem; margin: 2rem 0;">
            <h4 style="color: #f39c12; margin-bottom: 0.8rem;">💡 新興国投資の成功戦略</h4>
            <ol style="padding-left: 1.5rem;">
              <li style="margin: 0.8rem 0;"><strong>段階的アプローチ</strong>: 総資産の5-15%から開始し、経験を積みながら増額</li>
              <li style="margin: 0.8rem 0;"><strong>分散投資の徹底</strong>: 単一国への集中を避け、複数の新興国に分散</li>
              <li style="margin: 0.8rem 0;"><strong>長期視点の維持</strong>: 短期的な変動に動揺せず、5-10年の投資期間を想定</li>
              <li style="margin: 0.8rem 0;"><strong>定期的なリバランス</strong>: 四半期ごとにポートフォリオを見直し</li>
            </ol>
          </div>
        `
      },
      {
        type: 'text',
        title: 'カントリーリスクと地政学的要因',
        content: `
          <div style="background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%); padding: 2rem; border-radius: 1rem; margin-bottom: 2rem;">
            <h2 style="color: white; margin-bottom: 1rem;">地政学リスクの評価と管理</h2>
            <p style="color: rgba(255,255,255,0.95); line-height: 1.8;">
              国際投資において、地政学的リスクの理解と適切な管理は不可欠です。各国の政治・経済状況を継続的にモニタリングし、リスクに応じた投資配分を行うことが重要です。
            </p>
          </div>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">カントリーリスクの定量評価</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 0.8rem; overflow: hidden;">
            <thead>
              <tr style="background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%);">
                <th style="padding: 1.2rem; color: white; text-align: left;">評価項目</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">ウェイト</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">評価指標</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">リスクレベル</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background: rgba(255, 107, 107, 0.05);">
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>政治的安定性</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">25%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">政権安定度、民主主義指数</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">
                  <span style="background: #e74c3c; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem;">高</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>経済ファンダメンタルズ</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">30%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">GDP成長率、インフレ率、財政収支</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">
                  <span style="background: #f39c12; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem;">中</span>
                </td>
              </tr>
              <tr style="background: rgba(255, 107, 107, 0.05);">
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>外貨準備・対外債務</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">20%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">外貨準備高、債務/GDP比率</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">
                  <span style="background: #f39c12; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem;">中</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>法制度・規制環境</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">15%</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">法の支配、腐敗認識指数</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">
                  <span style="background: #e74c3c; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem;">高</span>
                </td>
              </tr>
              <tr style="background: rgba(255, 107, 107, 0.05);">
                <td style="padding: 1rem;"><strong>信用格付け</strong></td>
                <td style="padding: 1rem; text-align: center;">10%</td>
                <td style="padding: 1rem; text-align: center;">S&P、Moody's、Fitch格付け</td>
                <td style="padding: 1rem; text-align: center;">
                  <span style="background: #27ae60; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem;">低</span>
                </td>
              </tr>
            </tbody>
          </table>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">地政学的ホットスポットと投資への影響</h3>
          
          <div style="background: linear-gradient(to right, #fc4a1a 0%, #f7b733 100%); padding: 1.5rem; border-radius: 0.8rem; margin: 1.5rem 0;">
            <h4 style="color: white; margin-bottom: 1rem;">2024年注目の地政学リスク</h4>
            <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 0.5rem;">
              <div style="margin-bottom: 1.5rem; padding: 1rem; background: #ffebee; border-radius: 0.5rem;">
                <h5 style="color: #c62828; margin-bottom: 0.8rem;">🌏 アジア太平洋地域</h5>
                <ul style="list-style-type: none; padding-left: 0;">
                  <li style="margin: 0.5rem 0;">🔴 <strong>台湾海峡情勢</strong>: 半導体サプライチェーンへの影響大</li>
                  <li style="margin: 0.5rem 0;">🟡 <strong>南シナ海問題</strong>: 海上輸送ルートのリスク</li>
                  <li style="margin: 0.5rem 0;">🟡 <strong>朝鮮半島</strong>: 定期的な緊張の高まり</li>
                </ul>
              </div>
              
              <div style="margin-bottom: 1.5rem; padding: 1rem; background: #fff3e0; border-radius: 0.5rem;">
                <h5 style="color: #e65100; margin-bottom: 0.8rem;">🌍 中東・アフリカ</h5>
                <ul style="list-style-type: none; padding-left: 0;">
                  <li style="margin: 0.5rem 0;">🔴 <strong>中東情勢</strong>: エネルギー価格への直接的影響</li>
                  <li style="margin: 0.5rem 0;">🟡 <strong>イラン核問題</strong>: 制裁と石油供給への影響</li>
                  <li style="margin: 0.5rem 0;">🟢 <strong>アフリカ資源国</strong>: 政情不安定も機会あり</li>
                </ul>
              </div>
              
              <div style="padding: 1rem; background: #e8f5e9; border-radius: 0.5rem;">
                <h5 style="color: #2e7d32; margin-bottom: 0.8rem;">🌎 欧州・米州</h5>
                <ul style="list-style-type: none; padding-left: 0;">
                  <li style="margin: 0.5rem 0;">🔴 <strong>ウクライナ情勢</strong>: エネルギー・食糧価格への影響継続</li>
                  <li style="margin: 0.5rem 0;">🟡 <strong>米中対立</strong>: テクノロジー分断の深化</li>
                  <li style="margin: 0.5rem 0;">🟢 <strong>EU統合深化</strong>: 規制統一による投資機会</li>
                </ul>
              </div>
            </div>
          </div>

          <div style="background: #e8f8f5; border-left: 4px solid #16a085; padding: 1.5rem; margin: 2rem 0;">
            <h4 style="color: #16a085; margin-bottom: 0.8rem;">🛡️ 地政学リスクへの対応戦略</h4>
            <div style="background: white; padding: 1.5rem; border-radius: 0.5rem; margin-top: 1rem;">
              <h5 style="color: #2c3e50; margin-bottom: 1rem;">リスクヘッジの具体的手法</h5>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 0.8rem; border-bottom: 1px solid #ecf0f1;"><strong>地域分散</strong></td>
                  <td style="padding: 0.8rem; border-bottom: 1px solid #ecf0f1;">最低5カ国以上、3地域以上への分散</td>
                </tr>
                <tr>
                  <td style="padding: 0.8rem; border-bottom: 1px solid #ecf0f1;"><strong>セクター分散</strong></td>
                  <td style="padding: 0.8rem; border-bottom: 1px solid #ecf0f1;">防衛関連株、金、必需品セクターの組み入れ</td>
                </tr>
                <tr>
                  <td style="padding: 0.8rem; border-bottom: 1px solid #ecf0f1;"><strong>通貨分散</strong></td>
                  <td style="padding: 0.8rem; border-bottom: 1px solid #ecf0f1;">ドル、ユーロ、円、スイスフランへの分散</td>
                </tr>
                <tr>
                  <td style="padding: 0.8rem;"><strong>オプション活用</strong></td>
                  <td style="padding: 0.8rem;">プットオプションによる下落リスクヘッジ</td>
                </tr>
              </table>
            </div>
          </div>
        `
      },
      {
        type: 'text',
        title: '実践的な国際投資プランニング',
        content: `
          <div style="background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); padding: 2rem; border-radius: 1rem; margin-bottom: 2rem;">
            <h2 style="color: white; margin-bottom: 1rem;">グローバルポートフォリオの構築</h2>
            <p style="color: rgba(255,255,255,0.95); line-height: 1.8;">
              理論を実践に移すための具体的なステップと、投資家のプロファイルに応じた最適な国際投資戦略を解説します。
            </p>
          </div>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">投資家タイプ別モデルポートフォリオ</h3>
          
          <div style="background: linear-gradient(to right, #11998e 0%, #38ef7d 100%); padding: 1.5rem; border-radius: 0.8rem; margin: 1.5rem 0;">
            <h4 style="color: white; margin-bottom: 1rem;">保守的投資家（リスク許容度：低）</h4>
            <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 0.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <span style="font-weight: bold; color: #2c3e50;">期待リターン: 4-6%/年</span>
                <span style="font-weight: bold; color: #e74c3c;">標準偏差: 5-8%</span>
              </div>
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="background: #f8f9fa;">
                  <td style="padding: 0.8rem; border: 1px solid #dee2e6;"><strong>国内債券</strong></td>
                  <td style="padding: 0.8rem; border: 1px solid #dee2e6; text-align: right; color: #2c3e50; font-weight: bold;">40%</td>
                </tr>
                <tr>
                  <td style="padding: 0.8rem; border: 1px solid #dee2e6;"><strong>先進国債券（ヘッジ付）</strong></td>
                  <td style="padding: 0.8rem; border: 1px solid #dee2e6; text-align: right; color: #2c3e50; font-weight: bold;">20%</td>
                </tr>
                <tr style="background: #f8f9fa;">
                  <td style="padding: 0.8rem; border: 1px solid #dee2e6;"><strong>国内株式</strong></td>
                  <td style="padding: 0.8rem; border: 1px solid #dee2e6; text-align: right; color: #2c3e50; font-weight: bold;">20%</td>
                </tr>
                <tr>
                  <td style="padding: 0.8rem; border: 1px solid #dee2e6;"><strong>先進国株式</strong></td>
                  <td style="padding: 0.8rem; border: 1px solid #dee2e6; text-align: right; color: #2c3e50; font-weight: bold;">15%</td>
                </tr>
                <tr style="background: #f8f9fa;">
                  <td style="padding: 0.8rem; border: 1px solid #dee2e6;"><strong>現金・短期金融資産</strong></td>
                  <td style="padding: 0.8rem; border: 1px solid #dee2e6; text-align: right; color: #2c3e50; font-weight: bold;">5%</td>
                </tr>
              </table>
            </div>
          </div>

          <div style="background: linear-gradient(to right, #f2994a 0%, #f2c94c 100%); padding: 1.5rem; border-radius: 0.8rem; margin: 1.5rem 0;">
            <h4 style="color: white; margin-bottom: 1rem;">バランス型投資家（リスク許容度：中）</h4>
            <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 0.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <span style="font-weight: bold; color: #2c3e50;">期待リターン: 6-9%/年</span>
                <span style="font-weight: bold; color: #e74c3c;">標準偏差: 10-15%</span>
              </div>
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="background: #fff9e6;">
                  <td style="padding: 0.8rem; border: 1px solid #ffd54f;"><strong>国内株式</strong></td>
                  <td style="padding: 0.8rem; border: 1px solid #ffd54f; text-align: right; color: #2c3e50; font-weight: bold;">25%</td>
                </tr>
                <tr>
                  <td style="padding: 0.8rem; border: 1px solid #ffd54f;"><strong>先進国株式</strong></td>
                  <td style="padding: 0.8rem; border: 1px solid #ffd54f; text-align: right; color: #2c3e50; font-weight: bold;">30%</td>
                </tr>
                <tr style="background: #fff9e6;">
                  <td style="padding: 0.8rem; border: 1px solid #ffd54f;"><strong>新興国株式</strong></td>
                  <td style="padding: 0.8rem; border: 1px solid #ffd54f; text-align: right; color: #2c3e50; font-weight: bold;">10%</td>
                </tr>
                <tr>
                  <td style="padding: 0.8rem; border: 1px solid #ffd54f;"><strong>国内債券</strong></td>
                  <td style="padding: 0.8rem; border: 1px solid #ffd54f; text-align: right; color: #2c3e50; font-weight: bold;">20%</td>
                </tr>
                <tr style="background: #fff9e6;">
                  <td style="padding: 0.8rem; border: 1px solid #ffd54f;"><strong>先進国債券</strong></td>
                  <td style="padding: 0.8rem; border: 1px solid #ffd54f; text-align: right; color: #2c3e50; font-weight: bold;">10%</td>
                </tr>
                <tr>
                  <td style="padding: 0.8rem; border: 1px solid #ffd54f;"><strong>オルタナティブ（REIT等）</strong></td>
                  <td style="padding: 0.8rem; border: 1px solid #ffd54f; text-align: right; color: #2c3e50; font-weight: bold;">5%</td>
                </tr>
              </table>
            </div>
          </div>

          <div style="background: linear-gradient(to right, #eb3349 0%, #f45c43 100%); padding: 1.5rem; border-radius: 0.8rem; margin: 1.5rem 0;">
            <h4 style="color: white; margin-bottom: 1rem;">積極的投資家（リスク許容度：高）</h4>
            <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 0.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <span style="font-weight: bold; color: #2c3e50;">期待リターン: 9-12%/年</span>
                <span style="font-weight: bold; color: #e74c3c;">標準偏差: 15-25%</span>
              </div>
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="background: #ffebee;">
                  <td style="padding: 0.8rem; border: 1px solid #ffcdd2;"><strong>先進国株式</strong></td>
                  <td style="padding: 0.8rem; border: 1px solid #ffcdd2; text-align: right; color: #2c3e50; font-weight: bold;">40%</td>
                </tr>
                <tr>
                  <td style="padding: 0.8rem; border: 1px solid #ffcdd2;"><strong>新興国株式</strong></td>
                  <td style="padding: 0.8rem; border: 1px solid #ffcdd2; text-align: right; color: #2c3e50; font-weight: bold;">25%</td>
                </tr>
                <tr style="background: #ffebee;">
                  <td style="padding: 0.8rem; border: 1px solid #ffcdd2;"><strong>国内株式</strong></td>
                  <td style="padding: 0.8rem; border: 1px solid #ffcdd2; text-align: right; color: #2c3e50; font-weight: bold;">20%</td>
                </tr>
                <tr>
                  <td style="padding: 0.8rem; border: 1px solid #ffcdd2;"><strong>暗号資産</strong></td>
                  <td style="padding: 0.8rem; border: 1px solid #ffcdd2; text-align: right; color: #2c3e50; font-weight: bold;">5%</td>
                </tr>
                <tr style="background: #ffebee;">
                  <td style="padding: 0.8rem; border: 1px solid #ffcdd2;"><strong>コモディティ</strong></td>
                  <td style="padding: 0.8rem; border: 1px solid #ffcdd2; text-align: right; color: #2c3e50; font-weight: bold;">5%</td>
                </tr>
                <tr>
                  <td style="padding: 0.8rem; border: 1px solid #ffcdd2;"><strong>債券・現金</strong></td>
                  <td style="padding: 0.8rem; border: 1px solid #ffcdd2; text-align: right; color: #2c3e50; font-weight: bold;">5%</td>
                </tr>
              </table>
            </div>
          </div>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">国際投資の実行ステップ</h3>
          
          <div style="background: #f8f9fa; padding: 2rem; border-radius: 0.8rem;">
            <div style="display: grid; gap: 1.5rem;">
              <div style="background: white; padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #3498db;">
                <h4 style="color: #3498db; margin-bottom: 0.8rem;">📋 ステップ1: 投資目標の明確化</h4>
                <ul style="list-style-type: none; padding-left: 0;">
                  <li style="margin: 0.5rem 0;">✓ 投資期間の設定（短期・中期・長期）</li>
                  <li style="margin: 0.5rem 0;">✓ 目標リターンの設定</li>
                  <li style="margin: 0.5rem 0;">✓ リスク許容度の自己評価</li>
                  <li style="margin: 0.5rem 0;">✓ 投資可能額の確認</li>
                </ul>
              </div>

              <div style="background: white; padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #27ae60;">
                <h4 style="color: #27ae60; margin-bottom: 0.8rem;">🔍 ステップ2: 市場調査と分析</h4>
                <ul style="list-style-type: none; padding-left: 0;">
                  <li style="margin: 0.5rem 0;">✓ 各国・地域の経済状況調査</li>
                  <li style="margin: 0.5rem 0;">✓ セクター別成長性分析</li>
                  <li style="margin: 0.5rem 0;">✓ 為替動向の確認</li>
                  <li style="margin: 0.5rem 0;">✓ 地政学リスクの評価</li>
                </ul>
              </div>

              <div style="background: white; padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #f39c12;">
                <h4 style="color: #f39c12; margin-bottom: 0.8rem;">🛠️ ステップ3: 投資手段の選択</h4>
                <ul style="list-style-type: none; padding-left: 0;">
                  <li style="margin: 0.5rem 0;">✓ ETFか投資信託か個別株か</li>
                  <li style="margin: 0.5rem 0;">✓ 為替ヘッジの有無決定</li>
                  <li style="margin: 0.5rem 0;">✓ 証券会社・取引口座の選定</li>
                  <li style="margin: 0.5rem 0;">✓ 手数料・税金の確認</li>
                </ul>
              </div>

              <div style="background: white; padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #e74c3c;">
                <h4 style="color: #e74c3c; margin-bottom: 0.8rem;">💼 ステップ4: ポートフォリオ構築</h4>
                <ul style="list-style-type: none; padding-left: 0;">
                  <li style="margin: 0.5rem 0;">✓ アセットアロケーション決定</li>
                  <li style="margin: 0.5rem 0;">✓ 段階的な投資実行（ドルコスト平均法）</li>
                  <li style="margin: 0.5rem 0;">✓ 初期ポジションの構築</li>
                  <li style="margin: 0.5rem 0;">✓ リスク管理ルールの設定</li>
                </ul>
              </div>

              <div style="background: white; padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #9b59b6;">
                <h4 style="color: #9b59b6; margin-bottom: 0.8rem;">📊 ステップ5: 継続的な管理</h4>
                <ul style="list-style-type: none; padding-left: 0;">
                  <li style="margin: 0.5rem 0;">✓ 定期的なパフォーマンス評価</li>
                  <li style="margin: 0.5rem 0;">✓ リバランスの実施（年1-2回）</li>
                  <li style="margin: 0.5rem 0;">✓ 市場環境変化への対応</li>
                  <li style="margin: 0.5rem 0;">✓ 税務申告の準備</li>
                </ul>
              </div>
            </div>
          </div>

          <div style="background: #e8f8f5; border-left: 4px solid #16a085; padding: 1.5rem; margin: 2rem 0;">
            <h4 style="color: #16a085; margin-bottom: 0.8rem;">🎯 成功のための重要ポイント</h4>
            <ol style="padding-left: 1.5rem;">
              <li style="margin: 0.8rem 0;"><strong>長期的視点の維持</strong>: 短期的な市場変動に惑わされない</li>
              <li style="margin: 0.8rem 0;"><strong>継続的な学習</strong>: 国際情勢と市場動向を常にアップデート</li>
              <li style="margin: 0.8rem 0;"><strong>感情的な判断の回避</strong>: ルールに基づいた規律ある投資</li>
              <li style="margin: 0.8rem 0;"><strong>分散の徹底</strong>: 「卵を一つのカゴに盛るな」の原則</li>
              <li style="margin: 0.8rem 0;"><strong>コスト意識</strong>: 手数料・税金を含めたトータルリターンで評価</li>
            </ol>
          </div>
        `
      }
    ],
    keyPoints: [
      '国際分散投資による相関の低い資産の組み合わせでリスクを低減',
      '為替リスクの理解とヘッジ戦略の適切な選択',
      'ETFを活用した低コストでの国際投資の実現',
      '新興国市場の成長機会とリスクの適切な評価',
      'カントリーリスクと地政学的要因の継続的モニタリング',
      '投資家プロファイルに応じた最適なポートフォリオ構築'
    ],
    summary: `
      国際分散投資は、ホームカントリーバイアスを克服し、真のリスク分散と成長機会を獲得するための重要な戦略です。
      為替リスクの適切な管理、ETFを活用した効率的な投資、新興国市場への段階的なアプローチ、
      そして地政学的リスクの継続的な評価により、長期的に安定したリターンを追求できます。
      投資家自身のリスク許容度と投資目標に応じたポートフォリオ構築が成功の鍵となります。
    `,
    practicalExamples: [
      '日本の投資家が米国ETF（VTI）に投資し、円安により為替差益を獲得',
      '新興国債券ファンドへの投資で高利回りを実現しつつリスクを管理',
      '地政学リスク高まり時にゴールドETFでヘッジを実施',
      'ドルコスト平均法による国際株式の積立投資で長期資産形成',
      'リバランスにより新興国株式の利益確定と先進国債券への配分調整'
    ],
    warningNotes: [
      '為替リスクは投資リターンを大きく左右する可能性があります',
      '新興国投資は高リターンが期待できる反面、高いボラティリティを伴います',
      '地政学的リスクは予測困難で、急激な市場変動を引き起こす可能性があります',
      '過度な分散は管理コストの増加とパフォーマンスの希薄化を招く恐れがあります',
      '税制や規制の違いにより、想定外のコストが発生する場合があります'
    ]
  },
  
  quiz: [
    {
      id: 'intl-diversification-q1',
      question: '国際分散投資において、異なる国の資産間の相関係数が低いことがもたらす最大のメリットは何ですか？',
      options: [
        '為替差益が必ず得られる',
        'ポートフォリオ全体のリスクが低減される',
        '新興国への投資が安全になる',
        '投資コストが削減される'
      ],
      correctAnswer: 1,
      explanation: '相関係数が低い資産を組み合わせることで、一つの市場が下落しても他の市場がそれを補い、ポートフォリオ全体のボラティリティ（リスク）を低減できます。これが国際分散投資の数学的根拠です。'
    },
    {
      id: 'intl-diversification-q2',
      question: '円建て投資家が米国株に投資した場合、現地通貨リターンが+10%、円高ドル安が3%進行した時の円建てトータルリターンは？',
      options: [
        '約13%',
        '約7%',
        '約6.7%',
        '約10%'
      ],
      correctAnswer: 2,
      explanation: '円建てトータルリターン = (1 + 0.10) × (1 - 0.03) - 1 = 1.10 × 0.97 - 1 = 1.067 - 1 = 0.067 = 約6.7%。現地通貨リターンから為替変動の影響を受けます。'
    },
    {
      id: 'intl-diversification-q3',
      question: '為替ヘッジを行う際の主要なコスト要因として最も重要なものは？',
      options: [
        '証券会社の手数料',
        '日本と投資先国の金利差',
        '為替レートの変動幅',
        'ETFの経費率'
      ],
      correctAnswer: 1,
      explanation: '為替ヘッジコストの主要因は両国の金利差です。一般的に、日本の金利が投資先国より低い場合、その金利差分がヘッジコストとして発生します。'
    },
    {
      id: 'intl-diversification-q4',
      question: '新興国投資において最も注意すべきリスクの組み合わせは？',
      options: [
        '為替リスクと流動性リスク',
        '信用リスクと金利リスク',
        '政治リスクとインフレリスク',
        'すべて同等に重要'
      ],
      correctAnswer: 2,
      explanation: '新興国では政治的不安定性による急激な政策変更リスクと、高いインフレーションによる通貨価値下落リスクが特に顕著です。これらは投資価値を大きく毀損する可能性があります。'
    },
    {
      id: 'intl-diversification-q5',
      question: 'VT（全世界株式ETF）の最大の利点は何ですか？',
      options: [
        '最も高いリターンが期待できる',
        '為替リスクがない',
        '一つのETFで究極の地域分散が実現できる',
        '新興国への投資比率が高い'
      ],
      correctAnswer: 2,
      explanation: 'VTは約9,000銘柄の全世界株式に投資するETFで、一つの商品で先進国から新興国まで時価総額加重で分散投資ができます。これにより個別の地域選択リスクを回避できます。'
    }
  ],
  
  lastUpdated: '2025-08-15',
  factChecked: true
};