import type { Lesson } from '@/lib/types/learning';

export const lesson25: Lesson = {
  id: 'lesson-25',
  categoryId: 'financial-literacy',
  title: '退職後の資産運用：豊かなセカンドライフを実現する包括的戦略',
  slug: 'retirement-asset-management',
  description: '退職後の資産運用戦略を包括的に学習。年金制度、退職金活用、インフレ対策、医療費準備、相続対策まで、豊かなセカンドライフを実現するための実践的アプローチを習得します。',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 45,
  orderIndex: 25,
  content: {
    sections: [
      {
        title: '退職後資産運用の基礎戦略',
        content: `
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 20px; margin: 20px 0; color: white;">
            <h3 style="color: #ffffff; margin-bottom: 20px; font-size: 24px;">🏖️ セカンドライフ資産運用の本質</h3>
            <p style="font-size: 18px; line-height: 1.8; margin-bottom: 15px;">
              退職後の資産運用は現役時代とは全く異なるアプローチが必要です。安定した収入源の確保、インフレリスクへの対応、流動性の維持、そして段階的な資産取り崩しが主要なテーマとなります。
            </p>
          </div>

          <div style="background: linear-gradient(145deg, #f3f4f6, #e5e7eb); padding: 25px; border-radius: 15px; margin: 25px 0; border-left: 5px solid #667eea;">
            <h4 style="color: #1f2937; margin-bottom: 20px;">💡 退職後運用の4原則</h4>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 20px;">
              <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h5 style="color: #667eea; margin-bottom: 10px;">🔒 元本保全重視</h5>
                <p style="font-size: 14px; color: #4b5563;">資産の減少を最小限に抑制</p>
              </div>
              <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h5 style="color: #667eea; margin-bottom: 10px;">💰 安定収益確保</h5>
                <p style="font-size: 14px; color: #4b5563;">定期的なキャッシュフローの創出</p>
              </div>
              <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h5 style="color: #667eea; margin-bottom: 10px;">🛡️ インフレ対策</h5>
                <p style="font-size: 14px; color: #4b5563;">購買力の維持と向上</p>
              </div>
              <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h5 style="color: #667eea; margin-bottom: 10px;">🌊 流動性確保</h5>
                <p style="font-size: 14px; color: #4b5563;">必要時の迅速な現金化</p>
              </div>
            </div>
          </div>

          <div style="background: #ffffff; padding: 25px; border-radius: 15px; border: 2px solid #e5e7eb; margin: 25px 0;">
            <h4 style="color: #1f2937; margin-bottom: 20px;">📊 退職後資産配分の目安</h4>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <thead>
                <tr style="background: linear-gradient(135deg, #667eea, #764ba2); color: white;">
                  <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">退職後年数</th>
                  <th style="padding: 15px; text-align: center; border: 1px solid #ddd;">現金・預金</th>
                  <th style="padding: 15px; text-align: center; border: 1px solid #ddd;">債券</th>
                  <th style="padding: 15px; text-align: center; border: 1px solid #ddd;">株式</th>
                  <th style="padding: 15px; text-align: center; border: 1px solid #ddd;">その他</th>
                </tr>
              </thead>
              <tbody>
                <tr style="background: #f8fafc;">
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">退職直後（1-5年）</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">30%</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">40%</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">25%</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">5%</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">中期（6-15年）</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">25%</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">35%</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">30%</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">10%</td>
                </tr>
                <tr style="background: #f8fafc;">
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">長期（16年以上）</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">35%</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">45%</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">15%</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">5%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); padding: 20px; border-radius: 15px; margin: 20px 0;">
            <h4 style="color: #8b4513; margin-bottom: 15px;">⚠️ 退職後運用の注意点</h4>
            <ul style="color: #8b4513; padding-left: 20px;">
              <li style="margin-bottom: 8px;">リスク許容度の低下を考慮した保守的運用</li>
              <li style="margin-bottom: 8px;">医療費・介護費用の突発的支出への備え</li>
              <li style="margin-bottom: 8px;">相続対策を含む長期的な資産承継計画</li>
              <li>税制優遇制度の最大限活用と税効率の最適化</li>
            </ul>
          </div>
        `
      },
      {
        title: '公的年金・企業年金の最適活用',
        content: `
          <div style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 30px; border-radius: 20px; margin: 20px 0; color: #2d3748;">
            <h3 style="color: #2d3748; margin-bottom: 20px; font-size: 24px;">🏛️ 年金制度の戦略的活用</h3>
            <p style="font-size: 18px; line-height: 1.8; margin-bottom: 15px;">
              日本の年金制度は3層構造となっており、それぞれの特徴を理解して最適な受給戦略を立てることで、退職後の安定収入を最大化することができます。
            </p>
          </div>

          <div style="background: #ffffff; padding: 25px; border-radius: 15px; border: 2px solid #e5e7eb; margin: 25px 0;">
            <h4 style="color: #1f2937; margin-bottom: 20px;">🏗️ 日本の年金制度構造</h4>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <thead>
                <tr style="background: linear-gradient(135deg, #a8edea, #fed6e3); color: #2d3748;">
                  <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">階層</th>
                  <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">制度名</th>
                  <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">対象者</th>
                  <th style="padding: 15px; text-align: center; border: 1px solid #ddd;">受給年齢</th>
                </tr>
              </thead>
              <tbody>
                <tr style="background: #f8fafc;">
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">1階部分</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">国民年金（基礎年金）</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">20歳以上60歳未満の全国民</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">原則65歳</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">2階部分</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">厚生年金</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">厚生年金適用事業所の従業員</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">原則65歳</td>
                </tr>
                <tr style="background: #f8fafc;">
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">3階部分</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">企業年金・個人年金</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">企業・個人の任意加入</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">制度により異なる</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="background: linear-gradient(145deg, #f3f4f6, #e5e7eb); padding: 25px; border-radius: 15px; margin: 25px 0; border-left: 5px solid #a8edea;">
            <h4 style="color: #1f2937; margin-bottom: 20px;">📈 年金受給戦略の選択肢</h4>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 20px;">
              <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h5 style="color: #2dd4bf; margin-bottom: 10px;">⏰ 繰上げ受給</h5>
                <p style="font-size: 14px; color: #4b5563; margin-bottom: 10px;">60歳～64歳で受給開始</p>
                <p style="font-size: 12px; color: #ef4444;">年金額は減額（最大30%減）</p>
              </div>
              <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h5 style="color: #3b82f6; margin-bottom: 10px;">⭐ 標準受給</h5>
                <p style="font-size: 14px; color: #4b5563; margin-bottom: 10px;">65歳で受給開始</p>
                <p style="font-size: 12px; color: #10b981;">満額受給</p>
              </div>
              <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h5 style="color: #8b5cf6; margin-bottom: 10px;">📈 繰下げ受給</h5>
                <p style="font-size: 14px; color: #4b5563; margin-bottom: 10px;">66歳～75歳で受給開始</p>
                <p style="font-size: 12px; color: #10b981;">年金額は増額（最大84%増）</p>
              </div>
            </div>
          </div>

          <div style="background: #ffffff; padding: 25px; border-radius: 15px; border: 2px solid #e5e7eb; margin: 25px 0;">
            <h4 style="color: #1f2937; margin-bottom: 20px;">💰 企業年金制度の種類と特徴</h4>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <thead>
                <tr style="background: linear-gradient(135deg, #667eea, #764ba2); color: white;">
                  <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">制度名</th>
                  <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">特徴</th>
                  <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">受給方法</th>
                  <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">税制</th>
                </tr>
              </thead>
              <tbody>
                <tr style="background: #f8fafc;">
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">確定給付企業年金（DB）</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">給付額が事前に確定</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">終身年金・有期年金</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">受給時課税</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">確定拠出年金（DC）</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">拠出額が確定、運用は自己責任</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">年金・一時金</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">運用益非課税</td>
                </tr>
                <tr style="background: #f8fafc;">
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">厚生年金基金</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">厚生年金の代行部分＋上乗部分</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">終身年金中心</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">受給時課税</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); padding: 20px; border-radius: 15px; margin: 20px 0;">
            <h4 style="color: #8b4513; margin-bottom: 15px;">🎯 年金最適化のポイント</h4>
            <ul style="color: #8b4513; padding-left: 20px;">
              <li style="margin-bottom: 8px;">健康状態と平均余命を考慮した受給時期の判断</li>
              <li style="margin-bottom: 8px;">他の収入源とのバランスを考慮した税務最適化</li>
              <li style="margin-bottom: 8px;">配偶者の年金受給権との組み合わせ戦略</li>
              <li>在職老齢年金制度による減額リスクの回避</li>
            </ul>
          </div>
        `
      },
      {
        title: 'インフレ対策と実物資産投資',
        content: `
          <div style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); padding: 30px; border-radius: 20px; margin: 20px 0; color: #2d3748;">
            <h3 style="color: #2d3748; margin-bottom: 20px; font-size: 24px;">🛡️ インフレから資産を守る戦略</h3>
            <p style="font-size: 18px; line-height: 1.8; margin-bottom: 15px;">
              退職後の長期間にわたって、インフレーションは固定収入の実質的な価値を削減する重要なリスクです。インフレ耐性のある資産への分散投資により、購買力の維持・向上を図ります。
            </p>
          </div>

          <div style="background: #ffffff; padding: 25px; border-radius: 15px; border: 2px solid #e5e7eb; margin: 25px 0;">
            <h4 style="color: #1f2937; margin-bottom: 20px;">📊 インフレ率と資産価値の関係</h4>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <thead>
                <tr style="background: linear-gradient(135deg, #ff9a9e, #fecfef); color: #2d3748;">
                  <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">期間</th>
                  <th style="padding: 15px; text-align: center; border: 1px solid #ddd;">年率2%インフレ</th>
                  <th style="padding: 15px; text-align: center; border: 1px solid #ddd;">年率3%インフレ</th>
                  <th style="padding: 15px; text-align: center; border: 1px solid #ddd;">購買力維持に必要なリターン</th>
                </tr>
              </thead>
              <tbody>
                <tr style="background: #f8fafc;">
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">10年後</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">82.0%</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">74.4%</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">2-3%以上</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">20年後</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">67.3%</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">55.4%</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">2-3%以上</td>
                </tr>
                <tr style="background: #f8fafc;">
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">30年後</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">55.2%</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">41.2%</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">2-3%以上</td>
                </tr>
              </tbody>
            </table>
            <p style="font-size: 12px; color: #6b7280; margin-top: 10px; font-style: italic;">
              ※数値は現在の購買力を100%とした場合の相対的な価値
            </p>
          </div>

          <div style="background: linear-gradient(145deg, #f3f4f6, #e5e7eb); padding: 25px; border-radius: 15px; margin: 25px 0; border-left: 5px solid #ff9a9e;">
            <h4 style="color: #1f2937; margin-bottom: 20px;">🏠 インフレヘッジ資産の特徴</h4>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 20px;">
              <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h5 style="color: #ef4444; margin-bottom: 10px;">🏘️ 不動産（REIT含む）</h5>
                <p style="font-size: 14px; color: #4b5563; margin-bottom: 10px;">
                  <strong>メリット：</strong>賃料収入がインフレに連動、実物資産価値の維持
                </p>
                <p style="font-size: 12px; color: #6b7280;">
                  <strong>留意点：</strong>流動性リスク、管理コスト、地域リスク
                </p>
              </div>
              <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h5 style="color: #f59e0b; margin-bottom: 10px;">🥇 コモディティ</h5>
                <p style="font-size: 14px; color: #4b5563; margin-bottom: 10px;">
                  <strong>メリット：</strong>金・原油など実物資産、インフレ先行指標
                </p>
                <p style="font-size: 12px; color: #6b7280;">
                  <strong>留意点：</strong>価格変動が大きい、収益配当なし
                </p>
              </div>
              <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h5 style="color: #10b981; margin-bottom: 10px;">📈 インフレ連動債</h5>
                <p style="font-size: 14px; color: #4b5563; margin-bottom: 10px;">
                  <strong>メリット：</strong>元本・利息がインフレ率に連動、国債の安全性
                </p>
                <p style="font-size: 12px; color: #6b7280;">
                  <strong>留意点：</strong>デフレ時は元本減価、流動性やや低い
                </p>
              </div>
              <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h5 style="color: #3b82f6; margin-bottom: 10px;">🏢 株式（配当株）</h5>
                <p style="font-size: 14px; color: #4b5563; margin-bottom: 10px;">
                  <strong>メリット：</strong>企業業績連動、配当成長期待、流動性高
                </p>
                <p style="font-size: 12px; color: #6b7280;">
                  <strong>留意点：</strong>短期変動リスク、景気サイクル影響
                </p>
              </div>
            </div>
          </div>

          <div style="background: #ffffff; padding: 25px; border-radius: 15px; border: 2px solid #e5e7eb; margin: 25px 0;">
            <h4 style="color: #1f2937; margin-bottom: 20px;">🎯 退職後インフレ対策ポートフォリオ例</h4>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <thead>
                <tr style="background: linear-gradient(135deg, #667eea, #764ba2); color: white;">
                  <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">資産クラス</th>
                  <th style="padding: 15px; text-align: center; border: 1px solid #ddd;">保守型</th>
                  <th style="padding: 15px; text-align: center; border: 1px solid #ddd;">バランス型</th>
                  <th style="padding: 15px; text-align: center; border: 1px solid #ddd;">期待リターン</th>
                </tr>
              </thead>
              <tbody>
                <tr style="background: #f8fafc;">
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">現金・短期債</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">30%</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">20%</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">0.1-0.5%</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">インフレ連動債</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">25%</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">20%</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">2-4%</td>
                </tr>
                <tr style="background: #f8fafc;">
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">高配当株式・株式型</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">20%</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">30%</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">4-7%</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">REIT・不動産</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">15%</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">20%</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">3-6%</td>
                </tr>
                <tr style="background: #f8fafc;">
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">コモディティ・金</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">10%</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">10%</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">3-5%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); padding: 20px; border-radius: 15px; margin: 20px 0;">
            <h4 style="color: #8b4513; margin-bottom: 15px;">📚 インフレ対策の実践ポイント</h4>
            <ul style="color: #8b4513; padding-left: 20px;">
              <li style="margin-bottom: 8px;">長期的視点に立った資産配分の継続的見直し</li>
              <li style="margin-bottom: 8px;">各資産クラスのリバランス（年1-2回程度）</li>
              <li style="margin-bottom: 8px;">コスト効率の高いETF・インデックスファンドの活用</li>
              <li>税制優遇制度（NISA・iDeCo等）との組み合わせによる節税効果の最大化</li>
            </ul>
          </div>
        `
      },
      {
        title: '医療・介護費用の資金計画',
        content: `
          <div style="background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%); padding: 30px; border-radius: 20px; margin: 20px 0; color: #2d3748;">
            <h3 style="color: #2d3748; margin-bottom: 20px; font-size: 24px;">🏥 医療・介護費用への準備戦略</h3>
            <p style="font-size: 18px; line-height: 1.8; margin-bottom: 15px;">
              高齢期における医療費・介護費用は予測が困難で、かつ家計に大きな負担をもたらす可能性があります。公的制度の理解と民間保険、専用積立資金による多層的な備えが重要です。
            </p>
          </div>

          <div style="background: #ffffff; padding: 25px; border-radius: 15px; border: 2px solid #e5e7eb; margin: 25px 0;">
            <h4 style="color: #1f2937; margin-bottom: 20px;">💰 高齢期の医療・介護費用の実態</h4>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <thead>
                <tr style="background: linear-gradient(135deg, #a1c4fd, #c2e9fb); color: #2d3748;">
                  <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">費用項目</th>
                  <th style="padding: 15px; text-align: center; border: 1px solid #ddd;">月額平均</th>
                  <th style="padding: 15px; text-align: center; border: 1px solid #ddd;">年額目安</th>
                  <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">備考</th>
                </tr>
              </thead>
              <tbody>
                <tr style="background: #f8fafc;">
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">医療費（75歳以上）</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">7-15万円</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">84-180万円</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">慢性疾患・入院含む</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">介護費用（要介護3）</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">15-25万円</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">180-300万円</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">施設・在宅サービス</td>
                </tr>
                <tr style="background: #f8fafc;">
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">有料老人ホーム</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">20-40万円</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">240-480万円</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">入居金別途必要</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">在宅介護（家族対応）</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">8-15万円</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">96-180万円</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">家族負担・機会損失含む</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="background: linear-gradient(145deg, #f3f4f6, #e5e7eb); padding: 25px; border-radius: 15px; margin: 25px 0; border-left: 5px solid #a1c4fd;">
            <h4 style="color: #1f2937; margin-bottom: 20px;">🛡️ 公的制度とカバー範囲</h4>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 20px;">
              <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h5 style="color: #3b82f6; margin-bottom: 10px;">🏥 医療保険制度</h5>
                <p style="font-size: 14px; color: #4b5563; margin-bottom: 8px;">
                  <strong>75歳以上：</strong>後期高齢者医療制度（窓口負担1-3割）
                </p>
                <p style="font-size: 14px; color: #4b5563; margin-bottom: 8px;">
                  <strong>高額療養費：</strong>月額上限8.7-25.2万円（所得により変動）
                </p>
                <p style="font-size: 12px; color: #6b7280;">
                  対象外：差額ベッド代、先進医療、美容目的等
                </p>
              </div>
              <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h5 style="color: #10b981; margin-bottom: 10px;">👥 介護保険制度</h5>
                <p style="font-size: 14px; color: #4b5563; margin-bottom: 8px;">
                  <strong>65歳以上：</strong>要介護認定に基づくサービス（自己負担1-3割）
                </p>
                <p style="font-size: 14px; color: #4b5563; margin-bottom: 8px;">
                  <strong>支給限度額：</strong>月額5-36万円（要介護度により変動）
                </p>
                <p style="font-size: 12px; color: #6b7280;">
                  対象外：日常生活援助の範囲外、住宅改修限度超過分
                </p>
              </div>
            </div>
          </div>

          <div style="background: #ffffff; padding: 25px; border-radius: 15px; border: 2px solid #e5e7eb; margin: 25px 0;">
            <h4 style="color: #1f2937; margin-bottom: 20px;">💡 資金準備の3層構造</h4>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <thead>
                <tr style="background: linear-gradient(135deg, #667eea, #764ba2); color: white;">
                  <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">層</th>
                  <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">手段</th>
                  <th style="padding: 15px; text-align: center; border: 1px solid #ddd;">目標額</th>
                  <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">特徴</th>
                </tr>
              </thead>
              <tbody>
                <tr style="background: #f8fafc;">
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">第1層：緊急対応</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">現金・普通預金</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">200-300万円</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">即座に利用可能</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">第2層：中期対応</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">定期預金・国債</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">500-800万円</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">元本保証・中流動性</td>
                </tr>
                <tr style="background: #f8fafc;">
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">第3層：民間保険</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">医療・介護保険</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">実費給付</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">長期安心・掛け捨て</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="background: linear-gradient(135deg, #ffd89b 0%, #19547b 100%); padding: 20px; border-radius: 15px; margin: 20px 0;">
            <h4 style="color: white; margin-bottom: 15px;">🎯 実践的な準備戦略</h4>
            <ul style="color: white; padding-left: 20px;">
              <li style="margin-bottom: 8px;">60歳までに医療・介護資金として1,000万円の確保目標</li>
              <li style="margin-bottom: 8px;">健康維持による医療費削減（定期検診・予防医療の重視）</li>
              <li style="margin-bottom: 8px;">民間医療・介護保険の加入タイミングの最適化</li>
              <li>住宅のバリアフリー化による介護予防と費用削減</li>
            </ul>
          </div>
        `
      },
      {
        title: '相続・事業承継対策の基本',
        content: `
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 20px; margin: 20px 0; color: white;">
            <h3 style="color: #ffffff; margin-bottom: 20px; font-size: 24px;">👨‍👩‍👧‍👦 円滑な資産承継の計画</h3>
            <p style="font-size: 18px; line-height: 1.8; margin-bottom: 15px;">
              相続対策は単なる節税対策ではなく、家族の絆を深め、次世代への円滑な資産移転を実現する包括的な取り組みです。早期の計画立案と定期的な見直しが成功の鍵となります。
            </p>
          </div>

          <div style="background: #ffffff; padding: 25px; border-radius: 15px; border: 2px solid #e5e7eb; margin: 25px 0;">
            <h4 style="color: #1f2937; margin-bottom: 20px;">📊 相続税の基本仕組み</h4>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <thead>
                <tr style="background: linear-gradient(135deg, #667eea, #764ba2); color: white;">
                  <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">相続財産額</th>
                  <th style="padding: 15px; text-align: center; border: 1px solid #ddd;">基礎控除額</th>
                  <th style="padding: 15px; text-align: center; border: 1px solid #ddd;">課税対象額</th>
                  <th style="padding: 15px; text-align: center; border: 1px solid #ddd;">相続税率</th>
                </tr>
              </thead>
              <tbody>
                <tr style="background: #f8fafc;">
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">5,000万円</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">4,200万円*</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">800万円</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">10-15%</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">1億円</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">4,200万円*</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">5,800万円</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">20-30%</td>
                </tr>
                <tr style="background: #f8fafc;">
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">2億円</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">4,200万円*</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">1億5,800万円</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">40-45%</td>
                </tr>
              </tbody>
            </table>
            <p style="font-size: 12px; color: #6b7280; margin-top: 10px; font-style: italic;">
              *配偶者・子2人の場合の基礎控除額（3,000万円＋600万円×3人）
            </p>
          </div>

          <div style="background: linear-gradient(145deg, #f3f4f6, #e5e7eb); padding: 25px; border-radius: 15px; margin: 25px 0; border-left: 5px solid #667eea;">
            <h4 style="color: #1f2937; margin-bottom: 20px;">🎯 相続対策の3原則</h4>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 20px;">
              <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h5 style="color: #3b82f6; margin-bottom: 10px;">🔄 分割対策</h5>
                <p style="font-size: 14px; color: #4b5563; margin-bottom: 10px;">
                  相続人間の公平性を保ち、争いを防ぐ資産分割計画
                </p>
                <p style="font-size: 12px; color: #6b7280;">
                  遺言書作成、家族信託、事前協議等
                </p>
              </div>
              <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h5 style="color: #10b981; margin-bottom: 10px;">💰 納税対策</h5>
                <p style="font-size: 14px; color: #4b5563; margin-bottom: 10px;">
                  相続税納税資金の確保と流動性の確保
                </p>
                <p style="font-size: 12px; color: #6b7280;">
                  生命保険活用、現金準備、延納・物納検討
                </p>
              </div>
              <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h5 style="color: #8b5cf6; margin-bottom: 10px;">📉 節税対策</h5>
                <p style="font-size: 14px; color: #4b5563; margin-bottom: 10px;">
                  適法な方法による相続税負担の軽減
                </p>
                <p style="font-size: 12px; color: #6b7280;">
                  贈与活用、不動産活用、各種特例適用
                </p>
              </div>
            </div>
          </div>

          <div style="background: #ffffff; padding: 25px; border-radius: 15px; border: 2px solid #e5e7eb; margin: 25px 0;">
            <h4 style="color: #1f2937; margin-bottom: 20px;">💝 生前贈与の活用戦略</h4>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <thead>
                <tr style="background: linear-gradient(135deg, #a1c4fd, #c2e9fb); color: #2d3748;">
                  <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">贈与制度</th>
                  <th style="padding: 15px; text-align: center; border: 1px solid #ddd;">非課税枠</th>
                  <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">対象・条件</th>
                  <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">節税効果</th>
                </tr>
              </thead>
              <tbody>
                <tr style="background: #f8fafc;">
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">暦年贈与</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">年110万円</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">年間・受贈者一人当たり</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">長期継続で大きな効果</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">相続時精算課税</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">2,500万円</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">60歳以上から20歳以上の子・孫</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">値上がり期待資産に有効</td>
                </tr>
                <tr style="background: #f8fafc;">
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">住宅取得資金</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">最大1,000万円</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">住宅新築・購入・改築</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">一括大額贈与可能</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">教育資金一括贈与</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">1,500万円</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">30歳未満の子・孫の教育費</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">信託活用・領収書提出要</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%); padding: 20px; border-radius: 15px; margin: 20px 0;">
            <h4 style="color: #1f2937; margin-bottom: 15px;">📋 相続対策のスケジュール例</h4>
            <ul style="color: #1f2937; padding-left: 20px;">
              <li style="margin-bottom: 8px;"><strong>50歳代：</strong>資産状況把握、遺言書作成、生命保険見直し</li>
              <li style="margin-bottom: 8px;"><strong>60歳代：</strong>本格的贈与開始、不動産活用検討、家族信託設定</li>
              <li style="margin-bottom: 8px;"><strong>70歳代：</strong>贈与ペース調整、納税資金確保、専門家相談強化</li>
              <li><strong>80歳以上：</strong>最終調整、相続人との協議、後見制度検討</li>
            </ul>
          </div>
        `
      },
      {
        title: '退職後資産運用の実践計画',
        content: `
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 20px; margin: 20px 0; color: white;">
            <h3 style="color: #ffffff; margin-bottom: 20px; font-size: 24px;">🎯 豊かなセカンドライフ実現のロードマップ</h3>
            <p style="font-size: 18px; line-height: 1.8; margin-bottom: 15px;">
              退職後の資産運用は、これまでの学習を総合して実践的な計画に落とし込む段階です。個人の状況に応じたカスタマイズと、継続的な見直しプロセスが成功の鍵となります。
            </p>
          </div>

          <div style="background: #ffffff; padding: 25px; border-radius: 15px; border: 2px solid #e5e7eb; margin: 25px 0;">
            <h4 style="color: #1f2937; margin-bottom: 20px;">📋 退職準備チェックリスト</h4>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <thead>
                <tr style="background: linear-gradient(135deg, #667eea, #764ba2); color: white;">
                  <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">分野</th>
                  <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">チェック項目</th>
                  <th style="padding: 15px; text-align: center; border: 1px solid #ddd;">実施時期</th>
                  <th style="padding: 15px; text-align: center; border: 1px solid #ddd;">重要度</th>
                </tr>
              </thead>
              <tbody>
                <tr style="background: #f8fafc;">
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">資産状況</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">総資産・負債の棚卸し</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">退職5年前</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">★★★</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">年金</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">受給額試算・受給開始時期検討</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">退職3年前</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">★★★</td>
                </tr>
                <tr style="background: #f8fafc;">
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">医療・介護</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">専用資金準備・保険見直し</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">退職5年前</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">★★★</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">住居</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">住宅ローン完済・住み替え検討</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">退職時まで</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">★★</td>
                </tr>
                <tr style="background: #f8fafc;">
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">相続</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">遺言書作成・家族協議</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">退職後早期</td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">★★</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="background: linear-gradient(145deg, #f3f4f6, #e5e7eb); padding: 25px; border-radius: 15px; margin: 25px 0; border-left: 5px solid #667eea;">
            <h4 style="color: #1f2937; margin-bottom: 20px;">💡 資産取り崩し戦略（4%ルール応用）</h4>
            
            <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px;">
              <h5 style="color: #667eea; margin-bottom: 15px;">基本的な取り崩しルール</h5>
              <ul style="color: #4b5563; padding-left: 20px;">
                <li style="margin-bottom: 8px;"><strong>初年度：</strong>退職時資産の4%を年間生活費として設定</li>
                <li style="margin-bottom: 8px;"><strong>次年度以降：</strong>前年の取り崩し額をインフレ率で調整</li>
                <li style="margin-bottom: 8px;"><strong>市場悪化時：</strong>取り崩し率を3.5%まで減額調整</li>
                <li><strong>市場好調時：</strong>取り崩し率を4.5%まで増額可能</li>
              </ul>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h5 style="color: #667eea; margin-bottom: 15px;">実践例：退職時資産3,000万円の場合</h5>
              <p style="font-size: 14px; color: #4b5563; margin-bottom: 10px;">
                <strong>年間取り崩し目安：</strong>120万円（月10万円）
              </p>
              <p style="font-size: 14px; color: #4b5563; margin-bottom: 10px;">
                <strong>年金受給後：</strong>年金+取り崩しで月20-25万円の生活水準
              </p>
              <p style="font-size: 12px; color: #6b7280;">
                ※実際の取り崩しは市場環境と家計状況に応じて柔軟に調整
              </p>
            </div>
          </div>

          <div style="background: #ffffff; padding: 25px; border-radius: 15px; border: 2px solid #e5e7eb; margin: 25px 0;">
            <h4 style="color: #1f2937; margin-bottom: 20px;">📊 退職後ライフステージ別運用戦略</h4>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <thead>
                <tr style="background: linear-gradient(135deg, #a8edea, #fed6e3); color: #2d3748;">
                  <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">ステージ</th>
                  <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">主な特徴</th>
                  <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">運用方針</th>
                  <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">注意点</th>
                </tr>
              </thead>
              <tbody>
                <tr style="background: #f8fafc;">
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">アクティブ期<br>（65-74歳）</td>
                  <td style="padding: 12px; border: 1px solid #ddd; font-size: 14px;">健康で活動的、趣味・旅行等にも支出</td>
                  <td style="padding: 12px; border: 1px solid #ddd; font-size: 14px;">バランス重視（株式30%、債券40%）</td>
                  <td style="padding: 12px; border: 1px solid #ddd; font-size: 14px;">インフレ対策重視</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">セミアクティブ期<br>（75-84歳）</td>
                  <td style="padding: 12px; border: 1px solid #ddd; font-size: 14px;">活動はやや制限、医療費増加傾向</td>
                  <td style="padding: 12px; border: 1px solid #ddd; font-size: 14px;">安定重視（株式20%、債券50%）</td>
                  <td style="padding: 12px; border: 1px solid #ddd; font-size: 14px;">流動性確保が重要</td>
                </tr>
                <tr style="background: #f8fafc;">
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">ケア期<br>（85歳以上）</td>
                  <td style="padding: 12px; border: 1px solid #ddd; font-size: 14px;">介護必要度上昇、相続対策本格化</td>
                  <td style="padding: 12px; border: 1px solid #ddd; font-size: 14px;">元本保全（現金40%、債券40%）</td>
                  <td style="padding: 12px; border: 1px solid #ddd; font-size: 14px;">家族信託等の検討</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%); padding: 20px; border-radius: 15px; margin: 20px 0;">
            <h4 style="color: #1f2937; margin-bottom: 15px;">🎯 成功する退職後資産運用のポイント</h4>
            <ul style="color: #1f2937; padding-left: 20px;">
              <li style="margin-bottom: 8px;"><strong>計画性：</strong>退職5年前からの段階的準備と資産配分調整</li>
              <li style="margin-bottom: 8px;"><strong>柔軟性：</strong>市場環境と健康状態に応じた戦略見直し</li>
              <li style="margin-bottom: 8px;"><strong>専門性：</strong>税理士・FPとの定期的な相談体制構築</li>
              <li style="margin-bottom: 8px;"><strong>家族性：</strong>配偶者・子供との情報共有と協議</li>
              <li><strong>継続性：</strong>年1回の資産状況・戦略見直しルーチン確立</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); padding: 20px; border-radius: 15px; margin: 20px 0;">
            <h4 style="color: #8b4513; margin-bottom: 15px;">⚠️ 退職後運用で避けるべき失敗パターン</h4>
            <ul style="color: #8b4513; padding-left: 20px;">
              <li style="margin-bottom: 8px;">退職金の一括運用による過度なリスクテイク</li>
              <li style="margin-bottom: 8px;">インフレを考慮しない全額現金・預金保有</li>
              <li style="margin-bottom: 8px;">複雑な金融商品への過度な投資</li>
              <li style="margin-bottom: 8px;">年金受給タイミングの戦略性を欠いた判断</li>
              <li>医療・介護費用への備えが不十分な資産配分</li>
            </ul>
          </div>
        `
      }
    ],
    keyPoints: [
      '退職後は元本保全と安定収益を重視した保守的な資産配分に移行する',
      '公的年金の受給戦略（繰上げ・繰下げ）を個人の状況に応じて最適化する',
      'インフレリスクに対してREIT・インフレ連動債・高配当株式で対策を講じる',
      '医療・介護費用として1,000万円程度の専用資金を3層構造で準備する',
      '相続対策は分割・納税・節税の3原則に基づいて早期から計画的に実施する',
      '退職後の資産取り崩しは4%ルールを参考に市場環境に応じて柔軟に調整する'
    ],
    summary: '退職後の資産運用は現役時代とは異なる保守的なアプローチが必要です。年金制度の最適活用、インフレ対策、医療・介護費用の準備、相続対策を包括的に考慮した戦略的な資産配分と取り崩し計画により、豊かなセカンドライフを実現することができます。重要なのは退職前からの計画的な準備と、ライフステージの変化に応じた継続的な見直しです。',
    practicalExamples: [
      '退職時資産5,000万円のケースにおける4%ルール適用による年間200万円の取り崩し計画',
      '年金繰下げ受給（70歳開始）による年金額42%増と投資資産取り崩し期間延長の比較検討',
      '医療・介護資金1,000万円を現金300万円・定期預金500万円・民間保険200万円の3層で準備',
      'インフレ対策として総資産の30%をREIT・インフレ連動債・高配当株式に配分するポートフォリオ',
      '年間110万円の暦年贈与を夫婦で20年継続し、4,400万円の相続財産圧縮を実現'
    ],
    warningNotes: [
      '退職金の一括投資は避け、段階的な投資（ドル・コスト平均法）を心がけること',
      '医療・介護費用は予測困難なため、余裕を持った資金準備が重要',
      '相続対策における贈与は税法改正リスクを考慮し、専門家との相談を継続すること',
      '年金制度・税制は変更される可能性があり、最新情報の把握と戦略見直しが必要',
      '投資判断に関する情報提供であり、個別の投資推奨ではありません',
      '具体的な税務・法務相談は税理士・弁護士等の専門家にご相談ください'
    ]
  },
  quiz: [
    {
      id: 'quiz-25-1',
      question: '退職後の資産運用における4原則として最も重要な組み合わせはどれですか？',
      options: [
        '高リターン追求・積極投資・短期売買・レバレッジ活用',
        '元本保全重視・安定収益確保・インフレ対策・流動性確保',
        '成長株投資・新興市場投資・仮想通貨投資・FX取引',
        '不動産投資・事業投資・海外投資・商品投資'
      ],
      correctAnswer: 1,
      explanation: '退職後の資産運用は元本保全重視・安定収益確保・インフレ対策・流動性確保の4原則が基本となります。現役時代の積極的な運用とは異なり、リスクを抑えた保守的なアプローチが重要です。'
    },
    {
      id: 'quiz-25-2',
      question: '年金の繰下げ受給に関する説明として正しいものはどれですか？',
      options: [
        '66歳から75歳まで繰下げ可能で、最大84%年金額が増額される',
        '65歳から70歳まで繰下げ可能で、最大42%年金額が増額される',
        '67歳から80歳まで繰下げ可能で、最大100%年金額が増額される',
        '繰下げ受給は厚生年金のみ可能で、国民年金は対象外'
      ],
      correctAnswer: 0,
      explanation: '2022年4月の制度改正により、年金の繰下げ受給は66歳から75歳まで可能となり、最大84%（月0.7%×120か月）年金額が増額されます。長寿・健康であれば有効な戦略です。'
    },
    {
      id: 'quiz-25-3',
      question: 'インフレ率年3%が30年継続した場合の購買力への影響として正しいものはどれですか？',
      options: [
        '現在の100万円の価値が30年後には約120万円相当になる',
        '現在の100万円の価値が30年後には約70万円相当になる',
        '現在の100万円の価値が30年後には約41万円相当になる',
        'インフレの影響は軽微で、購買力はほぼ変わらない'
      ],
      correctAnswer: 2,
      explanation: '年3%のインフレが30年継続すると、現在の価値は約41.2%まで減少します（1÷1.03^30≒0.412）。これは購買力が半分以下になることを意味し、インフレ対策の重要性を示しています。'
    },
    {
      id: 'quiz-25-4',
      question: '高齢期の医療・介護費用準備における3層構造として最も適切な組み合わせはどれですか？',
      options: [
        '株式投資・債券投資・不動産投資による分散投資',
        '国内投資・海外投資・新興国投資による地域分散',
        '現金・普通預金（緊急対応）・定期預金・国債（中期対応）・民間保険（長期対応）',
        '生命保険・医療保険・介護保険による保険商品の組み合わせ'
      ],
      correctAnswer: 2,
      explanation: '医療・介護費用は即座に必要になる可能性があるため、流動性の異なる3層構造での準備が効果的です。緊急時の現金、中期的な定期預金・国債、長期的な民間保険の組み合わせが適切です。'
    },
    {
      id: 'quiz-25-5',
      question: '退職後の資産取り崩し戦略「4%ルール」の実践として最も適切な方法はどれですか？',
      options: [
        '退職時資産の4%を毎年固定的に取り崩し続ける',
        '初年度に資産の4%を設定し、翌年以降はインフレ率で調整、市場環境に応じて3.5-4.5%の範囲で柔軟に変動させる',
        '資産が増加した年は8%、減少した年は0%取り崩す',
        '年金受給開始までは0%、受給開始後は8%取り崩す'
      ],
      correctAnswer: 1,
      explanation: '4%ルールは初年度に退職時資産の4%を設定し、その後はインフレ調整を行いつつ、市場環境に応じて3.5-4.5%の範囲で柔軟に調整することが実践的で持続可能な方法です。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};