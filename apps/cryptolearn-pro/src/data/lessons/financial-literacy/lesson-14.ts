import type { Lesson } from '@/lib/types/learning';

export const lesson14: Lesson = {
  id: 'fl-compound-interest-strategy',
  categoryId: 'financial-literacy',
  title: '複利の力と長期投資戦略',
  slug: 'compound-interest-long-term-investment',
  description: '複利効果の数学的原理、長期投資の威力、ドルコスト平均法、FIREムーブメントまで包括的に学習',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 45,
  orderIndex: 14,
  isPublished: true,
  tags: ['複利', '長期投資', 'FIRE', 'ドルコスト平均法', '資産形成'],
  
  content: {
    sections: [
      {
        type: 'text',
        title: '複利効果の数学的原理と威力',
        content: `
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 1rem; margin-bottom: 2rem;">
            <h2 style="color: white; margin-bottom: 1rem;">アインシュタインが「人類最大の発明」と呼んだ複利</h2>
            <p style="color: rgba(255,255,255,0.95); line-height: 1.8;">
              複利は「利息に利息がつく」現象であり、時間の経過とともに指数関数的に資産を増大させます。この数学的原理を理解し活用することが、長期的な富の創造の鍵となります。
            </p>
          </div>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">複利計算の基本公式</h3>
          
          <div style="background: linear-gradient(to right, #f093fb 0%, #f5576c 100%); padding: 1.5rem; border-radius: 0.8rem; margin: 1.5rem 0;">
            <h4 style="color: white; margin-bottom: 1rem;">複利の数式</h4>
            <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 0.5rem;">
              <p style="color: #2c3e50; font-weight: bold; margin-bottom: 1rem;">将来価値の計算式：</p>
              <code style="display: block; background: #f4f4f4; padding: 1rem; border-radius: 0.3rem; color: #e74c3c; font-size: 1.2rem;">
                FV = PV × (1 + r)^n
              </code>
              <ul style="list-style-type: none; padding-left: 0; margin-top: 1rem;">
                <li style="margin: 0.5rem 0;">📊 <strong>FV</strong>: 将来価値（Future Value）</li>
                <li style="margin: 0.5rem 0;">💰 <strong>PV</strong>: 現在価値（Present Value）</li>
                <li style="margin: 0.5rem 0;">📈 <strong>r</strong>: 年利率（Interest Rate）</li>
                <li style="margin: 0.5rem 0;">⏱️ <strong>n</strong>: 運用年数（Number of Years）</li>
              </ul>
            </div>
          </div>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">複利と単利の比較：驚異的な差</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 0.8rem; overflow: hidden;">
            <thead>
              <tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                <th style="padding: 1.2rem; color: white; text-align: left;">運用期間</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">単利（年5%）</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">複利（年5%）</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">差額</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">複利効果率</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background: rgba(102, 126, 234, 0.05);">
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);">10年</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">150万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); font-weight: bold; color: #27ae60;">163万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">13万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #3498db;">8.7%</td>
              </tr>
              <tr>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);">20年</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">200万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); font-weight: bold; color: #27ae60;">265万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">65万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #3498db;">32.5%</td>
              </tr>
              <tr style="background: rgba(102, 126, 234, 0.05);">
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);">30年</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">250万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); font-weight: bold; color: #27ae60;">432万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">182万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #3498db;">72.8%</td>
              </tr>
              <tr>
                <td style="padding: 1rem;">40年</td>
                <td style="padding: 1rem; text-align: center;">300万円</td>
                <td style="padding: 1rem; text-align: center; font-weight: bold; color: #27ae60;">704万円</td>
                <td style="padding: 1rem; text-align: center; color: #e74c3c; font-weight: bold;">404万円</td>
                <td style="padding: 1rem; text-align: center; color: #3498db; font-weight: bold;">134.7%</td>
              </tr>
            </tbody>
          </table>
          <p style="font-size: 0.9rem; color: #7f8c8d; margin-top: 0.5rem;">※初期投資100万円の場合の計算例</p>

          <div style="background: #e8f8f5; border-left: 4px solid #27ae60; padding: 1.5rem; margin: 2rem 0;">
            <h4 style="color: #27ae60; margin-bottom: 0.8rem;">💡 72の法則：資産倍増期間の簡易計算</h4>
            <p style="color: #2c3e50; line-height: 1.8;">
              <strong>72 ÷ 年利率 = 資産が2倍になる年数</strong><br>
              例：年利7%の場合、72 ÷ 7 = 約10年で資産が倍増します。<br>
              この法則を使えば、複利効果を直感的に理解できます。
            </p>
          </div>
        `
      },
      {
        type: 'text',
        title: 'ドルコスト平均法と積立投資の威力',
        content: `
          <div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); padding: 2rem; border-radius: 1rem; margin-bottom: 2rem;">
            <h2 style="color: white; margin-bottom: 1rem;">時間分散によるリスク軽減と複利効果の最大化</h2>
            <p style="color: rgba(255,255,255,0.95); line-height: 1.8;">
              ドルコスト平均法は、定期的に一定額を投資することで、価格変動リスクを平準化し、長期的に安定したリターンを追求する投資手法です。
            </p>
          </div>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">積立投資シミュレーション</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 0.8rem; overflow: hidden;">
            <thead>
              <tr style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">
                <th style="padding: 1.2rem; color: white; text-align: left;">毎月積立額</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">10年後</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">20年後</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">30年後</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">元本との差</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background: rgba(250, 112, 154, 0.05);">
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>1万円</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">155万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">411万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); font-weight: bold; color: #27ae60;">832万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #e74c3c;">+472万円</td>
              </tr>
              <tr>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>3万円</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">465万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">1,233万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); font-weight: bold; color: #27ae60;">2,497万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #e74c3c;">+1,417万円</td>
              </tr>
              <tr style="background: rgba(250, 112, 154, 0.05);">
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>5万円</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">776万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">2,055万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); font-weight: bold; color: #27ae60;">4,161万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); color: #e74c3c;">+2,361万円</td>
              </tr>
              <tr>
                <td style="padding: 1rem;"><strong>10万円</strong></td>
                <td style="padding: 1rem; text-align: center;">1,552万円</td>
                <td style="padding: 1rem; text-align: center;">4,110万円</td>
                <td style="padding: 1rem; text-align: center; font-weight: bold; color: #27ae60;">8,322万円</td>
                <td style="padding: 1rem; text-align: center; color: #e74c3c; font-weight: bold;">+4,722万円</td>
              </tr>
            </tbody>
          </table>
          <p style="font-size: 0.9rem; color: #7f8c8d; margin-top: 0.5rem;">※年利5%で計算、税金・手数料は考慮せず</p>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">ドルコスト平均法のメリット</h3>
          
          <div style="background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%); padding: 1.5rem; border-radius: 0.8rem; margin: 1.5rem 0;">
            <h4 style="color: white; margin-bottom: 1rem;">価格変動を味方につける投資法</h4>
            <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 0.5rem;">
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                <div style="background: #e8f5e9; padding: 1rem; border-radius: 0.5rem;">
                  <h5 style="color: #27ae60; margin-bottom: 0.5rem;">✅ 高値掴みリスク軽減</h5>
                  <p style="font-size: 0.9rem; line-height: 1.6;">定期購入により購入価格が平均化され、一括投資のタイミングリスクを回避</p>
                </div>
                <div style="background: #e3f2fd; padding: 1rem; border-radius: 0.5rem;">
                  <h5 style="color: #2196f3; margin-bottom: 0.5rem;">✅ 下落局面でのメリット</h5>
                  <p style="font-size: 0.9rem; line-height: 1.6;">価格下落時により多くの口数を購入でき、将来の上昇時に大きなリターン</p>
                </div>
                <div style="background: #fff3e0; padding: 1rem; border-radius: 0.5rem;">
                  <h5 style="color: #ff9800; margin-bottom: 0.5rem;">✅ 心理的負担の軽減</h5>
                  <p style="font-size: 0.9rem; line-height: 1.6;">機械的な投資により感情的な判断を排除し、継続しやすい</p>
                </div>
                <div style="background: #f3e5f5; padding: 1rem; border-radius: 0.5rem;">
                  <h5 style="color: #9c27b0; margin-bottom: 0.5rem;">✅ 少額から開始可能</h5>
                  <p style="font-size: 0.9rem; line-height: 1.6;">月1万円からでも長期的には大きな資産形成が可能</p>
                </div>
              </div>
            </div>
          </div>
        `
      },
      {
        type: 'text',
        title: '長期投資における時間軸の重要性',
        content: `
          <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 2rem; border-radius: 1rem; margin-bottom: 2rem;">
            <h2 style="color: white; margin-bottom: 1rem;">時間こそが最大の資産</h2>
            <p style="color: rgba(255,255,255,0.95); line-height: 1.8;">
              投資において「時間」は、リスクを軽減し、複利効果を最大化する最も重要な要素です。早期に始めることの価値は計り知れません。
            </p>
          </div>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">開始年齢による資産形成の差</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 0.8rem; overflow: hidden;">
            <thead>
              <tr style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                <th style="padding: 1.2rem; color: white; text-align: left;">開始年齢</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">月間積立額</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">積立期間</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">65歳時の資産</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">投資元本</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background: rgba(240, 147, 251, 0.05);">
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>25歳</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">2万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">40年</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); font-weight: bold; color: #27ae60;">3,055万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">960万円</td>
              </tr>
              <tr>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>35歳</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">2万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">30年</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); font-weight: bold; color: #f39c12;">1,665万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">720万円</td>
              </tr>
              <tr style="background: rgba(240, 147, 251, 0.05);">
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>45歳</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">2万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">20年</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); font-weight: bold; color: #e74c3c;">822万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">480万円</td>
              </tr>
              <tr>
                <td style="padding: 1rem;"><strong>同等額達成に必要な月額</strong></td>
                <td style="padding: 1rem; text-align: center;">---</td>
                <td style="padding: 1rem; text-align: center;">---</td>
                <td style="padding: 1rem; text-align: center;">3,055万円目標</td>
                <td style="padding: 1rem; text-align: center;">---</td>
              </tr>
              <tr style="background: #ffebee;">
                <td style="padding: 1rem;">35歳開始の場合</td>
                <td style="padding: 1rem; text-align: center; color: #e74c3c; font-weight: bold;">3.7万円</td>
                <td style="padding: 1rem; text-align: center;">30年</td>
                <td style="padding: 1rem; text-align: center;">3,055万円</td>
                <td style="padding: 1rem; text-align: center;">1,332万円</td>
              </tr>
              <tr style="background: #ffebee;">
                <td style="padding: 1rem;">45歳開始の場合</td>
                <td style="padding: 1rem; text-align: center; color: #e74c3c; font-weight: bold;">7.4万円</td>
                <td style="padding: 1rem; text-align: center;">20年</td>
                <td style="padding: 1rem; text-align: center;">3,055万円</td>
                <td style="padding: 1rem; text-align: center;">1,776万円</td>
              </tr>
            </tbody>
          </table>
          <p style="font-size: 0.9rem; color: #7f8c8d; margin-top: 0.5rem;">※年利5%で計算</p>

          <div style="background: #fef5e7; border-left: 4px solid #f39c12; padding: 1.5rem; margin: 2rem 0;">
            <h4 style="color: #f39c12; margin-bottom: 0.8rem;">⚠️ 時間の価値を理解する</h4>
            <p style="color: #2c3e50; line-height: 1.8;">
              25歳から月2万円投資する人と、45歳から月7.4万円投資する人は、65歳時点で同じ資産額になります。しかし、総投資額は25歳開始が960万円、45歳開始が1,776万円と約2倍の差があります。これが「時間の価値」です。
            </p>
          </div>
        `
      },
      {
        type: 'text',
        title: 'FIREムーブメントと4%ルール',
        content: `
          <div style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 2rem; border-radius: 1rem; margin-bottom: 2rem;">
            <h2 style="color: #2c3e50; margin-bottom: 1rem;">Financial Independence, Retire Early</h2>
            <p style="color: #34495e; line-height: 1.8;">
              FIREは経済的自立と早期リタイアを目指すライフスタイルです。複利の力を最大限活用し、支出の最適化と高い貯蓄率により、従来の定年を待たずに経済的自由を実現します。
            </p>
          </div>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">FIREの種類と必要資産</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 0.8rem; overflow: hidden;">
            <thead>
              <tr style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);">
                <th style="padding: 1.2rem; color: #2c3e50; text-align: left;">FIREタイプ</th>
                <th style="padding: 1.2rem; color: #2c3e50; text-align: center;">年間生活費</th>
                <th style="padding: 1.2rem; color: #2c3e50; text-align: center;">必要資産（25倍）</th>
                <th style="padding: 1.2rem; color: #2c3e50; text-align: center;">特徴</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background: rgba(168, 237, 234, 0.1);">
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>Lean FIRE</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">200万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); font-weight: bold;">5,000万円</td>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);">質素な生活、ミニマリスト</td>
              </tr>
              <tr>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>Regular FIRE</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">400万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); font-weight: bold;">1億円</td>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);">平均的な生活水準維持</td>
              </tr>
              <tr style="background: rgba(168, 237, 234, 0.1);">
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>Fat FIRE</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">600万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); font-weight: bold;">1.5億円</td>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);">豊かな生活、旅行等も充実</td>
              </tr>
              <tr>
                <td style="padding: 1rem;"><strong>Barista FIRE</strong></td>
                <td style="padding: 1rem; text-align: center;">300万円</td>
                <td style="padding: 1rem; text-align: center; font-weight: bold;">3,750万円+副収入</td>
                <td style="padding: 1rem;">セミリタイア、パートタイム勤務</td>
              </tr>
            </tbody>
          </table>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">4%ルールの理論と実践</h3>
          
          <div style="background: linear-gradient(to right, #ff6e7f 0%, #bfe9ff 100%); padding: 1.5rem; border-radius: 0.8rem; margin: 1.5rem 0;">
            <h4 style="color: white; margin-bottom: 1rem;">Trinity Studyに基づく安全な取り崩し率</h4>
            <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 0.5rem;">
              <p style="color: #2c3e50; font-weight: bold; margin-bottom: 1rem;">4%ルールの計算式：</p>
              <code style="display: block; background: #f4f4f4; padding: 1rem; border-radius: 0.3rem; color: #e74c3c;">
                必要資産 = 年間生活費 × 25
              </code>
              <div style="margin-top: 1.5rem; padding: 1rem; background: #e8f5e9; border-radius: 0.5rem;">
                <h5 style="color: #27ae60; margin-bottom: 0.8rem;">📊 成功確率（株式60%・債券40%）</h5>
                <ul style="list-style-type: none; padding-left: 0;">
                  <li style="margin: 0.5rem 0;">• 30年間: <strong>96%</strong>の成功率</li>
                  <li style="margin: 0.5rem 0;">• 40年間: <strong>87%</strong>の成功率</li>
                  <li style="margin: 0.5rem 0;">• 50年間: <strong>82%</strong>の成功率</li>
                </ul>
              </div>
            </div>
          </div>

          <div style="background: #e8f8f5; border-left: 4px solid #16a085; padding: 1.5rem; margin: 2rem 0;">
            <h4 style="color: #16a085; margin-bottom: 0.8rem;">🎯 FIRE達成への道筋</h4>
            <ol style="padding-left: 1.5rem;">
              <li style="margin: 0.8rem 0;"><strong>貯蓄率の向上</strong>: 収入の50%以上を投資に回す</li>
              <li style="margin: 0.8rem 0;"><strong>支出の最適化</strong>: 本当に必要なものだけに支出</li>
              <li style="margin: 0.8rem 0;"><strong>収入源の多様化</strong>: 副業・投資収入の確立</li>
              <li style="margin: 0.8rem 0;"><strong>税制優遇の活用</strong>: NISA、iDeCo等の最大活用</li>
              <li style="margin: 0.8rem 0;"><strong>健康への投資</strong>: 医療費削減と生活の質向上</li>
            </ol>
          </div>
        `
      },
      {
        type: 'text',
        title: '複利効果を最大化する投資戦略',
        content: `
          <div style="background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%); padding: 2rem; border-radius: 1rem; margin-bottom: 2rem;">
            <h2 style="color: white; margin-bottom: 1rem;">再投資と配当成長戦略</h2>
            <p style="color: rgba(255,255,255,0.95); line-height: 1.8;">
              複利効果を最大化するには、配当や利息を再投資し、成長する資産に継続的に投資することが重要です。時間、規律、そして忍耐が成功の鍵となります。
            </p>
          </div>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">配当再投資の威力</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 0.8rem; overflow: hidden;">
            <thead>
              <tr style="background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%);">
                <th style="padding: 1.2rem; color: white; text-align: left;">投資戦略</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">初期投資</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">10年後</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">20年後</th>
                <th style="padding: 1.2rem; color: white; text-align: center;">30年後</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background: rgba(255, 107, 107, 0.05);">
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>配当受取（消費）</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">100万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">146万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">213万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">311万円</td>
              </tr>
              <tr>
                <td style="padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);"><strong>配当再投資</strong></td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">100万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">179万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">320万円</td>
                <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); font-weight: bold; color: #27ae60;">574万円</td>
              </tr>
              <tr style="background: rgba(255, 107, 107, 0.05);">
                <td style="padding: 1rem;"><strong>差額</strong></td>
                <td style="padding: 1rem; text-align: center;">---</td>
                <td style="padding: 1rem; text-align: center; color: #e74c3c;">+33万円</td>
                <td style="padding: 1rem; text-align: center; color: #e74c3c;">+107万円</td>
                <td style="padding: 1rem; text-align: center; color: #e74c3c; font-weight: bold;">+263万円</td>
              </tr>
            </tbody>
          </table>
          <p style="font-size: 0.9rem; color: #7f8c8d; margin-top: 0.5rem;">※株価成長率4%、配当利回り3%で計算</p>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">複利効果を阻害する要因と対策</h3>
          
          <div style="background: linear-gradient(to right, #fc4a1a 0%, #f7b733 100%); padding: 1.5rem; border-radius: 0.8rem; margin: 1.5rem 0;">
            <h4 style="color: white; margin-bottom: 1rem;">避けるべき落とし穴</h4>
            <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 0.5rem;">
              <div style="display: grid; gap: 1rem;">
                <div style="background: #ffebee; padding: 1rem; border-radius: 0.5rem; border-left: 4px solid #e74c3c;">
                  <h5 style="color: #e74c3c; margin-bottom: 0.5rem;">❌ 高額な手数料</h5>
                  <p style="font-size: 0.9rem;">年1%の手数料差が30年で資産を20%以上減少させる</p>
                  <p style="font-size: 0.9rem; color: #27ae60; margin-top: 0.5rem;"><strong>対策:</strong> 低コストインデックスファンド活用（手数料0.2%以下）</p>
                </div>
                <div style="background: #fff3e0; padding: 1rem; border-radius: 0.5rem; border-left: 4px solid #ff9800;">
                  <h5 style="color: #ff9800; margin-bottom: 0.5rem;">❌ 頻繁な売買</h5>
                  <p style="font-size: 0.9rem;">売買コストと機会損失により複利効果が大幅に減少</p>
                  <p style="font-size: 0.9rem; color: #27ae60; margin-top: 0.5rem;"><strong>対策:</strong> バイ&ホールド戦略の徹底</p>
                </div>
                <div style="background: #e3f2fd; padding: 1rem; border-radius: 0.5rem; border-left: 4px solid #2196f3;">
                  <h5 style="color: #2196f3; margin-bottom: 0.5rem;">❌ インフレーション</h5>
                  <p style="font-size: 0.9rem;">実質リターンを蝕む見えない敵</p>
                  <p style="font-size: 0.9rem; color: #27ae60; margin-top: 0.5rem;"><strong>対策:</strong> 実質リターン重視、株式比率の維持</p>
                </div>
                <div style="background: #f3e5f5; padding: 1rem; border-radius: 0.5rem; border-left: 4px solid #9c27b0;">
                  <h5 style="color: #9c27b0; margin-bottom: 0.5rem;">❌ 税金の影響</h5>
                  <p style="font-size: 0.9rem;">頻繁な売買による税金負担で複利効果が減少</p>
                  <p style="font-size: 0.9rem; color: #27ae60; margin-top: 0.5rem;"><strong>対策:</strong> NISA、iDeCo等の税制優遇制度活用</p>
                </div>
              </div>
            </div>
          </div>
        `
      },
      {
        type: 'text',
        title: '実践的な長期投資プラン',
        content: `
          <div style="background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); padding: 2rem; border-radius: 1rem; margin-bottom: 2rem;">
            <h2 style="color: white; margin-bottom: 1rem;">年代別投資戦略ガイド</h2>
            <p style="color: rgba(255,255,255,0.95); line-height: 1.8;">
              ライフステージに応じた最適な投資戦略を実践することで、複利効果を最大限に活用しながら、リスクを適切に管理できます。
            </p>
          </div>

          <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">年代別推奨ポートフォリオ</h3>
          
          <div style="background: #f8f9fa; padding: 2rem; border-radius: 0.8rem;">
            <div style="display: grid; gap: 1.5rem;">
              <div style="background: white; padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #3498db;">
                <h4 style="color: #3498db; margin-bottom: 0.8rem;">👨‍🎓 20代：積極成長期</h4>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.8rem;">
                  <span><strong>株式:</strong> 80-90%</span>
                  <span><strong>債券:</strong> 10-20%</span>
                  <span><strong>現金:</strong> 3-6ヶ月分</span>
                </div>
                <p style="font-size: 0.9rem; line-height: 1.6;">時間を味方に積極的なリスクテイク。毎月の積立を習慣化し、市場の変動を気にせず継続投資。</p>
              </div>

              <div style="background: white; padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #27ae60;">
                <h4 style="color: #27ae60; margin-bottom: 0.8rem;">👨‍💼 30-40代：資産形成期</h4>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.8rem;">
                  <span><strong>株式:</strong> 70-80%</span>
                  <span><strong>債券:</strong> 20-30%</span>
                  <span><strong>現金:</strong> 6-12ヶ月分</span>
                </div>
                <p style="font-size: 0.9rem; line-height: 1.6;">収入ピークを活かした積極投資。教育費等を考慮しつつ、長期目標に向けて着実に資産形成。</p>
              </div>

              <div style="background: white; padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #f39c12;">
                <h4 style="color: #f39c12; margin-bottom: 0.8rem;">👨‍🦳 50代：安定移行期</h4>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.8rem;">
                  <span><strong>株式:</strong> 60-70%</span>
                  <span><strong>債券:</strong> 30-40%</span>
                  <span><strong>現金:</strong> 1-2年分</span>
                </div>
                <p style="font-size: 0.9rem; line-height: 1.6;">リタイアメントを意識したリスク調整。配当重視の安定銘柄へのシフトを開始。</p>
              </div>

              <div style="background: white; padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #e74c3c;">
                <h4 style="color: #e74c3c; margin-bottom: 0.8rem;">👴 60代以降：資産保全期</h4>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.8rem;">
                  <span><strong>株式:</strong> 40-50%</span>
                  <span><strong>債券:</strong> 40-50%</span>
                  <span><strong>現金:</strong> 2-3年分</span>
                </div>
                <p style="font-size: 0.9rem; line-height: 1.6;">資産保全と取り崩しの両立。インフレ対策として一定の株式比率を維持。</p>
              </div>
            </div>
          </div>

          <div style="background: #e8f8f5; border-left: 4px solid #16a085; padding: 1.5rem; margin: 2rem 0;">
            <h4 style="color: #16a085; margin-bottom: 0.8rem;">🎯 長期投資成功の10原則</h4>
            <ol style="padding-left: 1.5rem;">
              <li style="margin: 0.5rem 0;">早期に始める - 時間こそが最大の資産</li>
              <li style="margin: 0.5rem 0;">継続する - 市場の変動に一喜一憂しない</li>
              <li style="margin: 0.5rem 0;">分散投資 - リスクを適切に管理</li>
              <li style="margin: 0.5rem 0;">低コスト - 手数料は複利の敵</li>
              <li style="margin: 0.5rem 0;">再投資 - 配当・利息は全て再投資</li>
              <li style="margin: 0.5rem 0;">定期見直し - 年1回のリバランス</li>
              <li style="margin: 0.5rem 0;">感情制御 - 恐怖と欲望に負けない</li>
              <li style="margin: 0.5rem 0;">学習継続 - 金融知識のアップデート</li>
              <li style="margin: 0.5rem 0;">目標設定 - 明確な目標と計画</li>
              <li style="margin: 0.5rem 0;">忍耐 - 複利は時間とともに加速する</li>
            </ol>
          </div>
        `
      }
    ],
    keyPoints: [
      '複利効果は時間の経過とともに指数関数的に資産を増大させる',
      'ドルコスト平均法により価格変動リスクを軽減しながら資産形成',
      '投資開始時期が早いほど必要な積立額は少なくて済む',
      'FIREムーブメントと4%ルールによる経済的自立の実現',
      '配当再投資により複利効果を最大化',
      '年代に応じた適切なポートフォリオ調整が重要'
    ],
    summary: `
      複利は「人類最大の発明」と呼ばれるほど強力な資産形成の原理です。
      時間を味方につけ、ドルコスト平均法による規律ある積立投資を継続することで、
      誰でも長期的な富の創造が可能です。FIREムーブメントが示すように、
      適切な貯蓄率と投資戦略により、従来の定年を待たずに経済的自由を実現できます。
      重要なのは、早期に始め、継続し、複利効果を阻害する要因を排除することです。
    `,
    practicalExamples: [
      '25歳から月2万円の積立で、65歳時に3,000万円以上の資産形成',
      '配当再投資により30年で元本の5.7倍の資産を実現',
      '年収400万円でも貯蓄率50%でFIRE達成可能',
      'インデックスファンドで手数料を0.2%以下に抑えて複利効果最大化',
      '72の法則を使った簡易的な資産倍増期間の計算'
    ],
    warningNotes: [
      '高額な手数料は複利効果を大きく損なう最大の敵',
      '頻繁な売買は税金と手数料により長期リターンを低下させる',
      'インフレーションを考慮した実質リターンで計画することが重要',
      '市場の短期的変動に惑わされず長期視点を維持する必要がある',
      '過度なリスクテイクは資産を失い複利効果を失う危険がある'
    ]
  },
  
  quiz: [
    {
      id: 'compound-interest-q1',
      question: '100万円を年利5%で30年間運用した場合、複利効果により最終的にいくらになりますか？',
      options: [
        '250万円（単利計算）',
        '332万円',
        '432万円',
        '550万円'
      ],
      correctAnswer: 2,
      explanation: '複利計算式 FV = PV × (1 + r)^n により、100万円 × (1.05)^30 = 432万円となります。単利では250万円なので、複利効果により182万円も多く増えることになります。'
    },
    {
      id: 'compound-interest-q2',
      question: '72の法則において、年利6%で運用した場合、資産が2倍になるまでの期間は？',
      options: [
        '6年',
        '8年',
        '12年',
        '18年'
      ],
      correctAnswer: 2,
      explanation: '72の法則では、72 ÷ 年利率 = 資産倍増年数となります。72 ÷ 6 = 12年で資産が2倍になります。'
    },
    {
      id: 'compound-interest-q3',
      question: 'FIREの4%ルールにおいて、年間生活費が400万円の場合、必要な資産額は？',
      options: [
        '4,000万円',
        '6,000万円',
        '8,000万円',
        '1億円'
      ],
      correctAnswer: 3,
      explanation: '4%ルールでは、必要資産 = 年間生活費 × 25となります。400万円 × 25 = 1億円が必要です。これにより年4%の取り崩しで資産を維持できます。'
    },
    {
      id: 'compound-interest-q4',
      question: 'ドルコスト平均法の最大のメリットは何ですか？',
      options: [
        '必ず利益が出る',
        '税金が安くなる',
        '購入価格を平均化してリスクを軽減',
        '配当金が多くもらえる'
      ],
      correctAnswer: 2,
      explanation: 'ドルコスト平均法は定期的に一定額を投資することで、高値でも安値でも購入し、平均購入価格を平準化します。これにより一括投資のタイミングリスクを回避できます。'
    },
    {
      id: 'compound-interest-q5',
      question: '配当再投資と配当受取（消費）で30年後の資産額の差が最も大きくなる理由は？',
      options: [
        '税金が安くなるから',
        '配当金が増えるから',
        '複利効果が働くから',
        '手数料が安くなるから'
      ],
      correctAnswer: 2,
      explanation: '配当を再投資することで、その配当からも新たな配当が生まれ、複利効果が働きます。30年という長期間では、この複利効果により資産額に大きな差が生まれます。'
    }
  ],
  
  lastUpdated: '2025-08-15',
  factChecked: true
};