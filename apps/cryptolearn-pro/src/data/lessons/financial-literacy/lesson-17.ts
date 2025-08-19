import type { Lesson } from '@/lib/types/learning';

export const lesson17: Lesson = {
  id: 'lesson-17',
  categoryId: 'financial-literacy',
  title: '税務戦略と節税最適化：賢い資産運用のための税務設計',
  slug: 'tax-strategies-and-optimization',
  description: '投資と資産運用における効果的な税務戦略を学び、合法的節税手法と税制優遇制度の最大活用法を習得する',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 50,
  orderIndex: 17,
  isPublished: true,
  tags: ['税務戦略', '節税対策', 'NISA・iDeCo', '資産運用'],
  
  content: {
    sections: [
      {
        type: 'text',
        title: '1. 税務戦略の基本理念と設計原則',
        content: `
<div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 32px; border-radius: 16px; margin: 24px 0; color: white; box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);">
  <h2 style="color: white; margin-bottom: 24px; font-size: 28px; text-align: center;">📚 賢い税務戦略の基礎</h2>
  <p style="font-size: 18px; line-height: 1.8; margin-bottom: 20px;">
    効果的な税務戦略は、単なる節税テクニックではありません。長期的な資産形成目標と税制を理解し、合法的かつ倫理的な範囲内で税負担を最適化する総合的なアプローチです。
  </p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">💡 税務戦略の基本原則</h2>

<div style="background: linear-gradient(135deg, #f093fb, #f5576c); padding: 28px; border-radius: 12px; margin: 20px 0;">
  <h3 style="color: white; margin-bottom: 20px;">🎯 戦略設計の5つの柱</h3>
  <div style="background: rgba(255,255,255,0.95); padding: 24px; border-radius: 8px; margin: 16px 0; color: #333;">
    <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 6px; overflow: hidden;">
      <thead>
        <tr style="background: linear-gradient(135deg, #f093fb, #f5576c); color: white;">
          <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 20%;">原則</th>
          <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 35%;">概要</th>
          <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 25%;">重要ポイント</th>
          <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 20%;">効果</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; font-weight: bold;">🕐 時間軸最適化</td>
          <td style="padding: 12px;">短期・中期・長期の税務影響を考慮した戦略設計</td>
          <td style="padding: 12px;">将来の税制変更リスクも織り込む</td>
          <td style="padding: 12px; background: rgba(40,167,69,0.1); font-weight: bold;">高</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; font-weight: bold;">⚖️ 合法性確保</td>
          <td style="padding: 12px;">税法に完全準拠した範囲内での最適化</td>
          <td style="padding: 12px;">グレーゾーンは避ける</td>
          <td style="padding: 12px; background: rgba(220,53,69,0.1); font-weight: bold;">必須</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; font-weight: bold;">💰 コスト効果分析</td>
          <td style="padding: 12px;">節税効果と実行コストの詳細比較</td>
          <td style="padding: 12px;">手数料・管理費用も含めて計算</td>
          <td style="padding: 12px; background: rgba(255,193,7,0.2); font-weight: bold;">重要</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; font-weight: bold;">📊 リスク管理</td>
          <td style="padding: 12px;">税務リスクと投資リスクの両面管理</td>
          <td style="padding: 12px;">過度な節税は投資リスクを高める場合も</td>
          <td style="padding: 12px; background: rgba(255,193,7,0.2); font-weight: bold;">重要</td>
        </tr>
        <tr>
          <td style="padding: 12px; font-weight: bold;">🔄 柔軟性確保</td>
          <td style="padding: 12px;">環境変化に応じた戦略修正の可能性</td>
          <td style="padding: 12px;">固定化しすぎない戦略構築</td>
          <td style="padding: 12px; background: rgba(23,162,184,0.1); font-weight: bold;">普通</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🎯 税制優遇制度の全体像</h2>

<div style="background: linear-gradient(135deg, #4ecdc4, #44a08d); padding: 24px; border-radius: 12px; margin: 20px 0; color: white;">
  <h3 style="color: white; margin-bottom: 16px;">🏛️ 日本の主要な税制優遇制度</h3>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px;">
      <h4 style="color: #ffd700; margin-bottom: 12px;">📈 投資関連制度</h4>
      <ul style="list-style: none; padding-left: 0; margin: 0; line-height: 1.8;">
        <li style="margin: 8px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>NISA（一般・つみたて）</strong><br>
          <span style="font-size: 14px;">投資利益の完全非課税</span>
        </li>
        <li style="margin: 8px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>ジュニアNISA</strong><br>
          <span style="font-size: 14px;">子供の教育資金形成</span>
        </li>
        <li style="margin: 8px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>iDeCo（個人型確定拠出年金）</strong><br>
          <span style="font-size: 14px;">拠出・運用・受取で三重優遇</span>
        </li>
      </ul>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px;">
      <h4 style="color: #ffd700; margin-bottom: 12px;">💼 事業・所得関連</h4>
      <ul style="list-style: none; padding-left: 0; margin: 0; line-height: 1.8;">
        <li style="margin: 8px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>小規模企業共済</strong><br>
          <span style="font-size: 14px;">個人事業主・経営者向け</span>
        </li>
        <li style="margin: 8px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>ふるさと納税</strong><br>
          <span style="font-size: 14px;">実質負担2,000円で寄付</span>
        </li>
        <li style="margin: 8px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>生命保険料控除</strong><br>
          <span style="font-size: 14px;">保険料の一部控除</span>
        </li>
      </ul>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📊 税負担の実態分析</h2>

<div style="background: linear-gradient(135deg, #ffecd2, #fcb69f); padding: 24px; border-radius: 12px; margin: 20px 0;">
  <h3 style="color: #333; margin-bottom: 16px;">💰 所得階層別税負担の現実</h3>
  <table style="width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.9); border-radius: 8px; overflow: hidden;">
    <thead>
      <tr style="background: rgba(255,236,210,0.8);">
        <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 20%;">年収レンジ</th>
        <th style="padding: 15px; text-align: center; border-bottom: 2px solid white; width: 15%;">所得税率</th>
        <th style="padding: 15px; text-align: center; border-bottom: 2px solid white; width: 15%;">住民税率</th>
        <th style="padding: 15px; text-align: center; border-bottom: 2px solid white; width: 20%;">実効税負担率</th>
        <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 30%;">主要な節税対策</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold;">300-400万円</td>
        <td style="padding: 12px; text-align: center;">5%</td>
        <td style="padding: 12px; text-align: center;">10%</td>
        <td style="padding: 12px; text-align: center; background: rgba(40,167,69,0.1);">約12%</td>
        <td style="padding: 12px;">iDeCo、ふるさと納税</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold;">400-600万円</td>
        <td style="padding: 12px; text-align: center;">10%</td>
        <td style="padding: 12px; text-align: center;">10%</td>
        <td style="padding: 12px; text-align: center; background: rgba(255,193,7,0.2);">約16%</td>
        <td style="padding: 12px;">NISA、iDeCo、生命保険</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold;">600-900万円</td>
        <td style="padding: 12px; text-align: center;">20%</td>
        <td style="padding: 12px; text-align: center;">10%</td>
        <td style="padding: 12px; text-align: center; background: rgba(255,193,7,0.3);">約24%</td>
        <td style="padding: 12px;">全制度活用、不動産投資</td>
      </tr>
      <tr>
        <td style="padding: 12px; font-weight: bold;">1,000万円以上</td>
        <td style="padding: 12px; text-align: center;">33-45%</td>
        <td style="padding: 12px; text-align: center;">10%</td>
        <td style="padding: 12px; text-align: center; background: rgba(220,53,69,0.2);">約35-43%</td>
        <td style="padding: 12px;">法人設立、分散投資、海外投資</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">⚖️ 合法性と倫理性の境界線</h2>

<div style="background: linear-gradient(135deg, #a8edea, #fed6e3); padding: 20px; border-radius: 10px; margin: 16px 0;">
  <h3 style="color: #333; margin-bottom: 16px;">🚨 税務コンプライアンスの重要性</h3>
  <div style="background: rgba(255,255,255,0.9); padding: 16px; border-radius: 6px;">
    <p style="margin: 0; font-weight: bold; font-size: 16px; color: #333;">
      ✅ <strong>適法な節税</strong>：税法の趣旨に沿った制度活用<br>
      ⚠️ <strong>租税回避</strong>：法的にはグレーだが倫理的に問題のある手法<br>
      ❌ <strong>脱税</strong>：違法行為であり重い刑事罰の対象<br><br>
      💡 <strong>基本方針</strong>：「疑わしい場合は保守的に判断」「専門家に相談」が鉄則
    </p>
  </div>
</div>
        `
      },
      {
        type: 'text',
        title: '2. NISA・iDeCoの活用戦略と最適化',
        content: `
<div style="background: linear-gradient(135deg, #43e97b, #38f9d7); padding: 32px; border-radius: 16px; margin: 24px 0; color: white; box-shadow: 0 8px 32px rgba(67, 233, 123, 0.3);">
  <h2 style="color: white; margin-bottom: 24px; font-size: 28px; text-align: center;">🏆 制度活用の戦略設計</h2>
  <p style="font-size: 18px; line-height: 1.8; margin-bottom: 20px;">
    NISA・iDeCoは日本の個人投資家にとって最も重要な税制優遇制度です。それぞれの特徴を理解し、個人の状況に応じた最適な活用戦略を構築しましょう。
  </p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📈 NISA制度の完全活用法</h2>

<div style="background: linear-gradient(135deg, #ff9a9e, #fecfef); padding: 28px; border-radius: 12px; margin: 20px 0;">
  <h3 style="color: #333; margin-bottom: 20px;">🎯 NISA制度の詳細比較</h3>
  <div style="background: rgba(255,255,255,0.95); padding: 24px; border-radius: 8px; margin: 16px 0;">
    <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 6px; overflow: hidden;">
      <thead>
        <tr style="background: linear-gradient(135deg, #ff9a9e, #fecfef); color: white;">
          <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 20%;">種類</th>
          <th style="padding: 15px; text-align: center; border-bottom: 2px solid white; width: 15%;">年間投資枠</th>
          <th style="padding: 15px; text-align: center; border-bottom: 2px solid white; width: 15%;">非課税期間</th>
          <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 25%;">対象商品</th>
          <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 25%;">最適な活用方法</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; font-weight: bold;">一般NISA</td>
          <td style="padding: 12px; text-align: center; background: rgba(40,167,69,0.1);">120万円</td>
          <td style="padding: 12px; text-align: center;">5年間</td>
          <td style="padding: 12px;">株式、投資信託、ETF、REIT等</td>
          <td style="padding: 12px;">アクティブ投資、高配当株式</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; font-weight: bold;">つみたてNISA</td>
          <td style="padding: 12px; text-align: center; background: rgba(255,193,7,0.2);">40万円</td>
          <td style="padding: 12px; text-align: center;">20年間</td>
          <td style="padding: 12px;">金融庁指定の投資信託・ETF</td>
          <td style="padding: 12px;">長期積立投資、初心者向け</td>
        </tr>
        <tr>
          <td style="padding: 12px; font-weight: bold; background: rgba(255,193,7,0.1);">新NISA（2024年〜）</td>
          <td style="padding: 12px; text-align: center; background: rgba(255,193,7,0.1);">最大360万円</td>
          <td style="padding: 12px; text-align: center; background: rgba(255,193,7,0.1);">恒久化</td>
          <td style="padding: 12px; background: rgba(255,193,7,0.1);">成長投資枠240万円＋積立投資枠120万円</td>
          <td style="padding: 12px; background: rgba(255,193,7,0.1);">両方の利点を統合活用</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">💼 iDeCo（個人型確定拠出年金）の戦略的活用</h2>

<div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 24px; border-radius: 12px; margin: 20px 0; color: white;">
  <h3 style="color: white; margin-bottom: 16px;">🎖️ iDeCoの三重税務メリット</h3>
  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin: 20px 0;">
    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px;">
      <h4 style="color: #ffd700; margin-bottom: 12px; text-align: center;">💰 拠出時</h4>
      <ul style="list-style: none; padding-left: 0; margin: 0; font-size: 14px; line-height: 1.6;">
        <li style="margin: 6px 0; padding: 4px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>所得控除</strong><br>
          拠出額全額が課税所得から控除
        </li>
        <li style="margin: 6px 0; padding: 4px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>節税効果</strong><br>
          税率×拠出額分の税額軽減
        </li>
      </ul>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px;">
      <h4 style="color: #ffd700; margin-bottom: 12px; text-align: center;">📈 運用時</h4>
      <ul style="list-style: none; padding-left: 0; margin: 0; font-size: 14px; line-height: 1.6;">
        <li style="margin: 6px 0; padding: 4px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>運用益非課税</strong><br>
          配当・売却益に課税なし
        </li>
        <li style="margin: 6px 0; padding: 4px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>複利効果最大化</strong><br>
          税引き前運用で資産成長加速
        </li>
      </ul>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px;">
      <h4 style="color: #ffd700; margin-bottom: 12px; text-align: center;">🎁 受給時</h4>
      <ul style="list-style: none; padding-left: 0; margin: 0; font-size: 14px; line-height: 1.6;">
        <li style="margin: 6px 0; padding: 4px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>退職所得控除</strong><br>
          一括受給時の大幅減税
        </li>
        <li style="margin: 6px 0; padding: 4px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>年金所得控除</strong><br>
          年金受給時の控除適用
        </li>
      </ul>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📊 職業別iDeCo活用シミュレーション</h2>

<div style="background: linear-gradient(135deg, #ffd89b, #19547b); padding: 24px; border-radius: 12px; margin: 20px 0; color: white;">
  <h3 style="color: white; margin-bottom: 16px;">👥 属性別最適戦略</h3>
  <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px; margin: 16px 0;">
    <table style="width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.9); border-radius: 8px; overflow: hidden; color: #333;">
      <thead>
        <tr style="background: rgba(255,216,155,0.8);">
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid white; width: 20%;">職業・立場</th>
          <th style="padding: 12px; text-align: center; border-bottom: 2px solid white; width: 15%;">拠出上限</th>
          <th style="padding: 12px; text-align: center; border-bottom: 2px solid white; width: 20%;">年間節税効果</th>
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid white; width: 45%;">推奨戦略</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px; font-weight: bold;">会社員（企業年金なし）</td>
          <td style="padding: 10px; text-align: center;">23,000円/月</td>
          <td style="padding: 10px; text-align: center; background: rgba(40,167,69,0.1);">5.5-12万円</td>
          <td style="padding: 10px;">満額拠出、バランス型ファンド中心</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px; font-weight: bold;">会社員（企業年金あり）</td>
          <td style="padding: 10px; text-align: center;">12,000円/月</td>
          <td style="padding: 10px; text-align: center; background: rgba(255,193,7,0.2);">2.9-6.2万円</td>
          <td style="padding: 10px;">NISA併用、リスク資産重点配分</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px; font-weight: bold;">公務員</td>
          <td style="padding: 10px; text-align: center;">12,000円/月</td>
          <td style="padding: 10px; text-align: center; background: rgba(255,193,7,0.2);">2.9-6.2万円</td>
          <td style="padding: 10px;">安定志向、国内外株式中心</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold;">自営業・フリーランス</td>
          <td style="padding: 10px; text-align: center;">68,000円/月</td>
          <td style="padding: 10px; text-align: center; background: rgba(40,167,69,0.2);">16-35万円</td>
          <td style="padding: 10px;">満額拠出最優先、小規模企業共済併用</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🎯 制度活用の優先順位</h2>

<div style="background: linear-gradient(135deg, #a8edea, #fed6e3); padding: 24px; border-radius: 12px; margin: 20px 0;">
  <h3 style="color: #333; margin-bottom: 16px;">📋 投資余力別活用ガイド</h3>
  <div style="background: rgba(255,255,255,0.9); padding: 20px; border-radius: 8px; margin: 16px 0;">
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
      <div style="background: linear-gradient(135deg, #ff9a9e, #fecfef); padding: 16px; border-radius: 8px; color: white;">
        <h4 style="margin-top: 0; margin-bottom: 12px; text-align: center;">💰 年間50万円以下</h4>
        <ol style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
          <li>iDeCo最優先（節税効果大）</li>
          <li>つみたてNISA（残額全額）</li>
          <li>一般的な投資信託</li>
        </ol>
      </div>
      <div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 16px; border-radius: 8px; color: white;">
        <h4 style="margin-top: 0; margin-bottom: 12px; text-align: center;">💰 年間50-200万円</h4>
        <ol style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
          <li>iDeCo満額拠出</li>
          <li>新NISA活用（成長投資枠含む）</li>
          <li>ふるさと納税</li>
          <li>個別株投資・その他</li>
        </ol>
      </div>
      <div style="background: linear-gradient(135deg, #a8edea, #fed6e3); padding: 16px; border-radius: 8px; color: #333;">
        <h4 style="margin-top: 0; margin-bottom: 12px; text-align: center;">💰 年間200万円以上</h4>
        <ol style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
          <li>全制度フル活用</li>
          <li>不動産投資検討</li>
          <li>法人設立検討</li>
          <li>海外投資・保険活用</li>
        </ol>
      </div>
    </div>
  </div>
</div>
        `
      },
      {
        type: 'text',
        title: '3. 投資商品別税務最適化戦略',
        content: `
<div style="background: linear-gradient(135deg, #ff6b6b, #feca57); padding: 32px; border-radius: 16px; margin: 24px 0; color: white; box-shadow: 0 8px 32px rgba(255, 107, 107, 0.3);">
  <h2 style="color: white; margin-bottom: 24px; font-size: 28px; text-align: center;">📊 商品特性を活かした税務設計</h2>
  <p style="font-size: 18px; line-height: 1.8; margin-bottom: 20px;">
    投資商品ごとに課税方式や税務上の特性が異なります。これらの違いを理解し、税務効率を最大化する商品配置と売買戦略を構築することが重要です。
  </p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📈 株式投資の税務戦略</h2>

<div style="background: linear-gradient(135deg, #4ecdc4, #44a08d); padding: 28px; border-radius: 12px; margin: 20px 0; color: white;">
  <h3 style="color: white; margin-bottom: 20px;">🎯 株式課税の基本構造</h3>
  <div style="background: rgba(255,255,255,0.95); padding: 24px; border-radius: 8px; margin: 16px 0; color: #333;">
    <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 6px; overflow: hidden;">
      <thead>
        <tr style="background: linear-gradient(135deg, #4ecdc4, #44a08d); color: white;">
          <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 20%;">税目</th>
          <th style="padding: 15px; text-align: center; border-bottom: 2px solid white; width: 15%;">税率</th>
          <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 30%;">課税対象</th>
          <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 35%;">最適化ポイント</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; font-weight: bold;">譲渡所得税</td>
          <td style="padding: 12px; text-align: center; background: rgba(255,193,7,0.2);">20.315%</td>
          <td style="padding: 12px;">株式売却による利益</td>
          <td style="padding: 12px;">損益通算の活用、NISA枠での取引</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; font-weight: bold;">配当所得税</td>
          <td style="padding: 12px; text-align: center; background: rgba(255,193,7,0.2);">20.315%</td>
          <td style="padding: 12px;">配当金・分配金</td>
          <td style="padding: 12px;">配当控除との選択、高配当株のNISA活用</td>
        </tr>
        <tr>
          <td style="padding: 12px; font-weight: bold;">外国税額控除</td>
          <td style="padding: 12px; text-align: center; background: rgba(40,167,69,0.1);">控除</td>
          <td style="padding: 12px;">外国株式・海外ETFの源泉税</td>
          <td style="padding: 12px;">特定口座での自動適用確認</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🏗️ 投資信託・ETFの税務効率</h2>

<div style="background: linear-gradient(135deg, #f093fb, #f5576c); padding: 24px; border-radius: 12px; margin: 20px 0; color: white;">
  <h3 style="color: white; margin-bottom: 16px;">🔄 分配方式による税務影響の違い</h3>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px;">
      <h4 style="color: #ffd700; margin-bottom: 12px;">📊 分配型ファンド</h4>
      <div style="background: rgba(255,255,255,0.9); padding: 12px; border-radius: 6px; color: #333; margin: 10px 0;">
        <p style="margin: 0; font-size: 14px; line-height: 1.6;">
          <strong>メリット：</strong><br>
          • 定期的なキャッシュフロー<br>
          • 配当控除の適用可能性<br><br>
          <strong>デメリット：</strong><br>
          • 分配金への課税<br>
          • 複利効果の減少<br>
          • 税務効率の悪化
        </p>
      </div>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px;">
      <h4 style="color: #ffd700; margin-bottom: 12px;">📈 無分配型ファンド</h4>
      <div style="background: rgba(255,255,255,0.9); padding: 12px; border-radius: 6px; color: #333; margin: 10px 0;">
        <p style="margin: 0; font-size: 14px; line-height: 1.6;">
          <strong>メリット：</strong><br>
          • 複利効果の最大化<br>
          • 売却時まで課税繰り延べ<br>
          • 税務効率が良い<br><br>
          <strong>デメリット：</strong><br>
          • キャッシュフローなし<br>
          • 配当控除適用不可
        </p>
      </div>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🏠 不動産投資の税務戦略</h2>

<div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 24px; border-radius: 12px; margin: 20px 0; color: white;">
  <h3 style="color: white; margin-bottom: 16px;">🏘️ 不動産投資の複雑な税務構造</h3>
  <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px; margin: 16px 0;">
    <table style="width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.9); border-radius: 8px; overflow: hidden; color: #333;">
      <thead>
        <tr style="background: rgba(102,126,234,0.8); color: white;">
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid white; width: 25%;">所得・支出項目</th>
          <th style="padding: 12px; text-align: center; border-bottom: 2px solid white; width: 20%;">税務上の扱い</th>
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid white; width: 55%;">最適化ポイント</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px; font-weight: bold;">家賃収入</td>
          <td style="padding: 10px; text-align: center; background: rgba(255,193,7,0.2);">不動産所得</td>
          <td style="padding: 10px;">必要経費の最大化、青色申告による65万円控除</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px; font-weight: bold;">減価償却費</td>
          <td style="padding: 10px; text-align: center; background: rgba(40,167,69,0.1);">必要経費</td>
          <td style="padding: 10px;">建物部分の適正評価、償却方法の選択</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px; font-weight: bold;">ローン利息</td>
          <td style="padding: 10px; text-align: center; background: rgba(40,167,69,0.1);">必要経費</td>
          <td style="padding: 10px;">土地・建物の利息按分、元本返済は経費不算入</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold;">売却益</td>
          <td style="padding: 10px; text-align: center; background: rgba(255,193,7,0.3);">譲渡所得</td>
          <td style="padding: 10px;">所有期間5年超で長期譲渡所得（税率軽減）</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">💎 暗号資産投資の税務留意点</h2>

<div style="background: linear-gradient(135deg, #ffd89b, #19547b); padding: 24px; border-radius: 12px; margin: 20px 0; color: white;">
  <h3 style="color: white; margin-bottom: 16px;">⚡ 暗号資産の特殊な課税方式</h3>
  <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px; margin: 16px 0;">
    <div style="background: rgba(255,255,255,0.9); padding: 16px; border-radius: 6px; color: #333;">
      <h4 style="color: #333; margin-bottom: 12px;">🚨 重要な税務上の注意点</h4>
      <ul style="margin: 8px 0; padding-left: 20px; line-height: 1.8;">
        <li><strong>雑所得として総合課税</strong>：最高税率55%（住民税込み）の可能性</li>
        <li><strong>暗号資産同士の交換も課税対象</strong>：ビットコイン→イーサリアムも売却扱い</li>
        <li><strong>DeFiの複雑な税務処理</strong>：ステーキング、イールドファーミング等</li>
        <li><strong>損益通算の制限</strong>：他の所得との通算原則不可</li>
        <li><strong>記録保持の重要性</strong>：取引履歴の詳細な記録が必須</li>
      </ul>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🎯 商品別最適配置戦略</h2>

<div style="background: linear-gradient(135deg, #a8edea, #fed6e3); padding: 24px; border-radius: 12px; margin: 20px 0;">
  <h3 style="color: #333; margin-bottom: 16px;">🏛️ 口座・制度別商品配置の最適化</h3>
  <table style="width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.9); border-radius: 8px; overflow: hidden;">
    <thead>
      <tr style="background: rgba(168,237,234,0.8);">
        <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 20%;">口座・制度</th>
        <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 40%;">最適商品</th>
        <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 40%;">理由・効果</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold;">NISA口座</td>
        <td style="padding: 12px;">高配当株式、分配型投信、REITやUTF</td>
        <td style="padding: 12px;">配当・分配金の税負担を完全回避</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold;">iDeCo口座</td>
        <td style="padding: 12px;">海外株式インデックス、バランスファンド</td>
        <td style="padding: 12px;">長期運用に適し、外国税額控除の恩恵</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold;">特定口座</td>
        <td style="padding: 12px;">無分配型インデックス、個別株式</td>
        <td style="padding: 12px;">損益通算を活用、売却タイミング調整可</td>
      </tr>
      <tr>
        <td style="padding: 12px; font-weight: bold;">一般口座</td>
        <td style="padding: 12px;">短期売買、暗号資産</td>
        <td style="padding: 12px;">確定申告が必要だが細かな調整が可能</td>
      </tr>
    </tbody>
  </table>
</div>
        `
      },
      {
        type: 'text',
        title: '4. 所得控除・税額控除の戦略的活用',
        content: `
<div style="background: linear-gradient(135deg, #6a11cb, #2575fc); padding: 32px; border-radius: 16px; margin: 24px 0; color: white; box-shadow: 0 8px 32px rgba(106, 17, 203, 0.3);">
  <h2 style="color: white; margin-bottom: 24px; font-size: 28px; text-align: center;">🎯 控除制度の完全活用</h2>
  <p style="font-size: 18px; line-height: 1.8; margin-bottom: 20px;">
    所得控除と税額控除を最大限活用することで、同じ収入でも税負担を大幅に軽減できます。各種控除の特徴を理解し、戦略的に組み合わせることが重要です。
  </p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">💰 ふるさと納税の最適化戦略</h2>

<div style="background: linear-gradient(135deg, #ff9a9e, #fecfef); padding: 28px; border-radius: 12px; margin: 20px 0;">
  <h3 style="color: #333; margin-bottom: 20px;">🏞️ ふるさと納税の仕組みと限度額</h3>
  <div style="background: rgba(255,255,255,0.95); padding: 24px; border-radius: 8px; margin: 16px 0;">
    <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 6px; overflow: hidden;">
      <thead>
        <tr style="background: linear-gradient(135deg, #ff9a9e, #fecfef); color: white;">
          <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 20%;">年収</th>
          <th style="padding: 15px; text-align: center; border-bottom: 2px solid white; width: 20%;">寄付上限額</th>
          <th style="padding: 15px; text-align: center; border-bottom: 2px solid white; width: 20%;">実質負担額</th>
          <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 40%;">最適活用法</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; font-weight: bold;">300万円</td>
          <td style="padding: 12px; text-align: center; background: rgba(40,167,69,0.1);">約28,000円</td>
          <td style="padding: 12px; text-align: center;">2,000円</td>
          <td style="padding: 12px;">日用品・食品中心、年末調整で申告</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; font-weight: bold;">500万円</td>
          <td style="padding: 12px; text-align: center; background: rgba(40,167,69,0.2);">約61,000円</td>
          <td style="padding: 12px; text-align: center;">2,000円</td>
          <td style="padding: 12px;">高額返礼品狙い、ワンストップ特例活用</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; font-weight: bold;">800万円</td>
          <td style="padding: 12px; text-align: center; background: rgba(40,167,69,0.3);">約129,000円</td>
          <td style="padding: 12px; text-align: center;">2,000円</td>
          <td style="padding: 12px;">分散寄付、地域支援と返礼品のバランス</td>
        </tr>
        <tr>
          <td style="padding: 12px; font-weight: bold;">1,200万円</td>
          <td style="padding: 12px; text-align: center; background: rgba(40,167,69,0.4);">約340,000円</td>
          <td style="padding: 12px; text-align: center;">2,000円</td>
          <td style="padding: 12px;">確定申告必須、高額品・体験型重視</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🏥 医療費控除・セルフメディケーション税制</h2>

<div style="background: linear-gradient(135deg, #4ecdc4, #44a08d); padding: 24px; border-radius: 12px; margin: 20px 0; color: white;">
  <h3 style="color: white; margin-bottom: 16px;">⚕️ 医療関連控除の選択と活用</h3>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px;">
      <h4 style="color: #ffd700; margin-bottom: 12px;">🏥 医療費控除（従来型）</h4>
      <div style="background: rgba(255,255,255,0.9); padding: 12px; border-radius: 6px; color: #333;">
        <p style="margin: 0; font-size: 14px; line-height: 1.6;">
          <strong>適用条件：</strong><br>
          年間医療費が10万円超（所得200万円以下なら所得×5%）<br><br>
          <strong>対象範囲：</strong><br>
          • 治療費・薬代<br>
          • 通院交通費<br>
          • 介護保険サービス<br>
          • 歯科矯正（子供）<br><br>
          <strong>控除額：</strong><br>
          （医療費－保険金等）－10万円
        </p>
      </div>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px;">
      <h4 style="color: #ffd700; margin-bottom: 12px;">💊 セルフメディケーション税制</h4>
      <div style="background: rgba(255,255,255,0.9); padding: 12px; border-radius: 6px; color: #333;">
        <p style="margin: 0; font-size: 14px; line-height: 1.6;">
          <strong>適用条件：</strong><br>
          スイッチOTC医薬品が年間12,000円超<br><br>
          <strong>対象商品：</strong><br>
          • 解熱鎮痛薬<br>
          • 胃腸薬<br>
          • 風邪薬<br>
          • 鼻炎薬等<br><br>
          <strong>控除額：</strong><br>
          （対象薬品費用－12,000円）<br>
          ※上限88,000円
        </p>
      </div>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🏠 住宅ローン控除の最適活用</h2>

<div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 24px; border-radius: 12px; margin: 20px 0; color: white;">
  <h3 style="color: white; margin-bottom: 16px;">🏘️ 住宅ローン控除の戦略的活用</h3>
  <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px; margin: 16px 0;">
    <table style="width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.9); border-radius: 8px; overflow: hidden; color: #333;">
      <thead>
        <tr style="background: rgba(102,126,234,0.8); color: white;">
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid white; width: 25%;">住宅種別</th>
          <th style="padding: 12px; text-align: center; border-bottom: 2px solid white; width: 20%;">借入限度額</th>
          <th style="padding: 12px; text-align: center; border-bottom: 2px solid white; width: 20%;">控除率</th>
          <th style="padding: 12px; text-align: center; border-bottom: 2px solid white; width: 20%;">最大控除額</th>
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid white; width: 15%;">期間</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px; font-weight: bold;">認定住宅（新築）</td>
          <td style="padding: 10px; text-align: center;">5,000万円</td>
          <td style="padding: 10px; text-align: center;">0.7%</td>
          <td style="padding: 10px; text-align: center; background: rgba(40,167,69,0.2);">35万円/年</td>
          <td style="padding: 10px;">13年</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px; font-weight: bold;">ZEH水準省エネ住宅</td>
          <td style="padding: 10px; text-align: center;">4,500万円</td>
          <td style="padding: 10px; text-align: center;">0.7%</td>
          <td style="padding: 10px; text-align: center; background: rgba(255,193,7,0.2);">31.5万円/年</td>
          <td style="padding: 10px;">13年</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px; font-weight: bold;">省エネ基準適合住宅</td>
          <td style="padding: 10px; text-align: center;">4,000万円</td>
          <td style="padding: 10px; text-align: center;">0.7%</td>
          <td style="padding: 10px; text-align: center; background: rgba(255,193,7,0.3);">28万円/年</td>
          <td style="padding: 10px;">13年</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold;">その他の住宅</td>
          <td style="padding: 10px; text-align: center;">3,000万円</td>
          <td style="padding: 10px; text-align: center;">0.7%</td>
          <td style="padding: 10px; text-align: center; background: rgba(255,193,7,0.4);">21万円/年</td>
          <td style="padding: 10px;">13年</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🎓 教育費の税務最適化</h2>

<div style="background: linear-gradient(135deg, #ffd89b, #19547b); padding: 24px; border-radius: 12px; margin: 20px 0; color: white;">
  <h3 style="color: white; margin-bottom: 16px;">📚 教育関連の税制優遇策</h3>
  <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px; margin: 16px 0;">
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
      <div style="background: rgba(255,255,255,0.9); padding: 16px; border-radius: 8px; color: #333;">
        <h4 style="margin-top: 0; margin-bottom: 12px; color: #333;">🎯 ジュニアNISA</h4>
        <ul style="margin: 0; padding-left: 16px; font-size: 14px; line-height: 1.6;">
          <li>年額80万円まで非課税</li>
          <li>18歳まで払出し制限</li>
          <li>2023年で新規投資終了</li>
          <li>教育資金準備に最適</li>
        </ul>
      </div>
      <div style="background: rgba(255,255,255,0.9); padding: 16px; border-radius: 8px; color: #333;">
        <h4 style="margin-top: 0; margin-bottom: 12px; color: #333;">🎓 教育資金贈与</h4>
        <ul style="margin: 0; padding-left: 16px; font-size: 14px; line-height: 1.6;">
          <li>1,500万円まで非課税</li>
          <li>学校等払い限定</li>
          <li>30歳で精算</li>
          <li>祖父母からの贈与に有効</li>
        </ul>
      </div>
      <div style="background: rgba(255,255,255,0.9); padding: 16px; border-radius: 8px; color: #333;">
        <h4 style="margin-top: 0; margin-bottom: 12px; color: #333;">💰 学資保険</h4>
        <ul style="margin: 0; padding-left: 16px; font-size: 14px; line-height: 1.6;">
          <li>生命保険料控除適用</li>
          <li>満期保険金への課税</li>
          <li>低金利で魅力減少</li>
          <li>つみたてNISAとの比較要</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📊 控除活用の年収別戦略</h2>

<div style="background: linear-gradient(135deg, #a8edea, #fed6e3); padding: 24px; border-radius: 12px; margin: 20px 0;">
  <h3 style="color: #333; margin-bottom: 16px;">💡 効果的な控除組み合わせパターン</h3>
  <table style="width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.9); border-radius: 8px; overflow: hidden;">
    <thead>
      <tr style="background: rgba(168,237,234,0.8);">
        <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 15%;">年収層</th>
        <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 35%;">優先活用控除</th>
        <th style="padding: 15px; text-align: center; border-bottom: 2px solid white; width: 20%;">節税効果</th>
        <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 30%;">注意点</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold;">300-500万円</td>
        <td style="padding: 12px;">iDeCo、ふるさと納税、医療費控除</td>
        <td style="padding: 12px; text-align: center; background: rgba(40,167,69,0.1);">年5-15万円</td>
        <td style="padding: 12px;">基本的な制度の確実な活用</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold;">500-800万円</td>
        <td style="padding: 12px;">NISA、iDeCo満額、住宅ローン控除</td>
        <td style="padding: 12px; text-align: center; background: rgba(255,193,7,0.2);">年20-40万円</td>
        <td style="padding: 12px;">住宅購入タイミングとの調整</td>
      </tr>
      <tr>
        <td style="padding: 12px; font-weight: bold;">800万円以上</td>
        <td style="padding: 12px;">全制度活用、小規模企業共済検討</td>
        <td style="padding: 12px; text-align: center; background: rgba(40,167,69,0.2);">年50万円以上</td>
        <td style="padding: 12px;">法人化も含めた総合戦略</td>
      </tr>
    </tbody>
  </table>
</div>
        `
      },
      {
        type: 'text',
        title: '5. 法人設立による税務メリット',
        content: `
<div style="background: linear-gradient(135deg, #ff6b6b, #ff8e53); padding: 32px; border-radius: 16px; margin: 24px 0; color: white; box-shadow: 0 8px 32px rgba(255, 107, 107, 0.3);">
  <h2 style="color: white; margin-bottom: 24px; font-size: 28px; text-align: center;">🏢 法人化の戦略的判断</h2>
  <p style="font-size: 18px; line-height: 1.8; margin-bottom: 20px;">
    一定以上の収入がある場合、法人設立により大幅な節税効果を得られる可能性があります。ただし、設立・維持コストや事務負担も考慮した総合的な判断が必要です。
  </p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">⚖️ 個人事業vs法人の税負担比較</h2>

<div style="background: linear-gradient(135deg, #f093fb, #f5576c); padding: 28px; border-radius: 12px; margin: 20px 0;">
  <h3 style="color: white; margin-bottom: 20px;">💰 収入別税負担シミュレーション</h3>
  <div style="background: rgba(255,255,255,0.95); padding: 24px; border-radius: 8px; margin: 16px 0; color: #333;">
    <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 6px; overflow: hidden;">
      <thead>
        <tr style="background: linear-gradient(135deg, #f093fb, #f5576c); color: white;">
          <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 20%;">年収</th>
          <th style="padding: 15px; text-align: center; border-bottom: 2px solid white; width: 20%;">個人事業税負担</th>
          <th style="padding: 15px; text-align: center; border-bottom: 2px solid white; width: 20%;">法人税負担</th>
          <th style="padding: 15px; text-align: center; border-bottom: 2px solid white; width: 20%;">節税効果</th>
          <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 20%;">法人化判定</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; font-weight: bold;">500万円</td>
          <td style="padding: 12px; text-align: center;">約90万円</td>
          <td style="padding: 12px; text-align: center;">約85万円</td>
          <td style="padding: 12px; text-align: center; background: rgba(40,167,69,0.1);">5万円</td>
          <td style="padding: 12px; color: #dc3545; font-weight: bold;">時期尚早</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; font-weight: bold;">800万円</td>
          <td style="padding: 12px; text-align: center;">約200万円</td>
          <td style="padding: 12px; text-align: center;">約160万円</td>
          <td style="padding: 12px; text-align: center; background: rgba(255,193,7,0.2);">40万円</td>
          <td style="padding: 12px; color: #ffc107; font-weight: bold;">検討価値有</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; font-weight: bold;">1,200万円</td>
          <td style="padding: 12px; text-align: center;">約400万円</td>
          <td style="padding: 12px; text-align: center;">約280万円</td>
          <td style="padding: 12px; text-align: center; background: rgba(40,167,69,0.2);">120万円</td>
          <td style="padding: 12px; color: #28a745; font-weight: bold;">設立推奨</td>
        </tr>
        <tr>
          <td style="padding: 12px; font-weight: bold;">2,000万円</td>
          <td style="padding: 12px; text-align: center;">約800万円</td>
          <td style="padding: 12px; text-align: center;">約480万円</td>
          <td style="padding: 12px; text-align: center; background: rgba(40,167,69,0.3);">320万円</td>
          <td style="padding: 12px; color: #28a745; font-weight: bold;">必須</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🎯 法人化のメリット・デメリット分析</h2>

<div style="background: linear-gradient(135deg, #4ecdc4, #44a08d); padding: 24px; border-radius: 12px; margin: 20px 0; color: white;">
  <h3 style="color: white; margin-bottom: 16px;">⚖️ 総合的な判断要素</h3>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px;">
      <h4 style="color: #ffd700; margin-bottom: 12px;">✅ 法人化のメリット</h4>
      <ul style="list-style: none; padding-left: 0; margin: 0; line-height: 1.8; font-size: 14px;">
        <li style="margin: 6px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>📉 税負担軽減</strong><br>
          法人税率23.2%vs個人の最高55%
        </li>
        <li style="margin: 6px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>💰 役員報酬による所得分散</strong><br>
          給与所得控除の活用
        </li>
        <li style="margin: 6px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>💼 経費認定範囲拡大</strong><br>
          家族への給与、福利厚生費
        </li>
        <li style="margin: 6px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>🛡️ 社会的信用向上</strong><br>
          取引先拡大、資金調達有利
        </li>
        <li style="margin: 6px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>🔄 欠損金繰越</strong><br>
          最大10年間の損失繰越可能
        </li>
      </ul>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px;">
      <h4 style="color: #ffd700; margin-bottom: 12px;">❌ 法人化のデメリット</h4>
      <ul style="list-style: none; padding-left: 0; margin: 0; line-height: 1.8; font-size: 14px;">
        <li style="margin: 6px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>💸 設立・維持費用</strong><br>
          設立25万円、税理士費用年30-50万円
        </li>
        <li style="margin: 6px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>📋 事務負担増加</strong><br>
          法人税申告、帳簿管理の複雑化
        </li>
        <li style="margin: 6px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>💰 赤字でも税負担</strong><br>
          法人住民税均等割7万円/年
        </li>
        <li style="margin: 6px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>🔒 社会保険料負担</strong><br>
          厚生年金・健康保険の事業主負担
        </li>
        <li style="margin: 6px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>⏰ 決算期の制約</strong><br>
          事業年度固定、自由度の減少
        </li>
      </ul>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🏗️ 法人の種類と選択基準</h2>

<div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 24px; border-radius: 12px; margin: 20px 0; color: white;">
  <h3 style="color: white; margin-bottom: 16px;">🏢 法人形態の比較検討</h3>
  <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px; margin: 16px 0;">
    <table style="width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.9); border-radius: 8px; overflow: hidden; color: #333;">
      <thead>
        <tr style="background: rgba(102,126,234,0.8); color: white;">
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid white; width: 20%;">法人種別</th>
          <th style="padding: 12px; text-align: center; border-bottom: 2px solid white; width: 15%;">設立費用</th>
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid white; width: 25%;">特徴</th>
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid white; width: 25%;">メリット</th>
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid white; width: 15%;">適用場面</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px; font-weight: bold;">株式会社</td>
          <td style="padding: 10px; text-align: center;">約25万円</td>
          <td style="padding: 10px;">最も一般的、資本金1円～</td>
          <td style="padding: 10px;">社会的信用高い、資金調達有利</td>
          <td style="padding: 10px;">本格事業</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px; font-weight: bold;">合同会社</td>
          <td style="padding: 10px; text-align: center;">約10万円</td>
          <td style="padding: 10px;">LLC、意思決定迅速</td>
          <td style="padding: 10px;">設立費用安い、運営シンプル</td>
          <td style="padding: 10px;">個人事業延長</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold;">一般社団法人</td>
          <td style="padding: 10px; text-align: center;">約11万円</td>
          <td style="padding: 10px;">非営利、社員2名以上必要</td>
          <td style="padding: 10px;">公益性高い、特定業務に有利</td>
          <td style="padding: 10px;">特殊事業</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">💼 役員報酬の最適化戦略</h2>

<div style="background: linear-gradient(135deg, #ffd89b, #19547b); padding: 24px; border-radius: 12px; margin: 20px 0; color: white;">
  <h3 style="color: white; margin-bottom: 16px;">💰 役員報酬額の決定ポイント</h3>
  <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px; margin: 16px 0;">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
      <div style="background: rgba(255,255,255,0.9); padding: 16px; border-radius: 8px; color: #333;">
        <h4 style="margin-top: 0; margin-bottom: 12px; color: #333;">📊 最適報酬額の考え方</h4>
        <ul style="margin: 8px 0; padding-left: 16px; font-size: 14px; line-height: 1.6;">
          <li><strong>給与所得控除の活用</strong><br>
            年収850万円まで控除額大きい</li>
          <li><strong>社会保険料上限の考慮</strong><br>
            標準報酬月額の上限活用</li>
          <li><strong>法人・個人税率のバランス</strong><br>
            全体税負担最小化を目指す</li>
          <li><strong>事業継続性の確保</strong><br>
            法人のキャッシュフロー維持</li>
        </ul>
      </div>
      <div style="background: rgba(255,255,255,0.9); padding: 16px; border-radius: 8px; color: #333;">
        <h4 style="margin-top: 0; margin-bottom: 12px; color: #333;">⚠️ 留意すべき規制</h4>
        <ul style="margin: 8px 0; padding-left: 16px; font-size: 14px; line-height: 1.6;">
          <li><strong>定期同額給与の原則</strong><br>
            事業年度中は原則変更不可</li>
          <li><strong>不相当に高額な報酬</strong><br>
            損金算入否認リスク</li>
          <li><strong>実質一人会社の制約</strong><br>
            働き方改革法の影響</li>
          <li><strong>賞与・退職金の活用</strong><br>
            税務上の取り扱い確認</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📊 法人化シミュレーション実例</h2>

<div style="background: linear-gradient(135deg, #a8edea, #fed6e3); padding: 24px; border-radius: 12px; margin: 20px 0;">
  <h3 style="color: #333; margin-bottom: 16px;">💡 年収1000万円のケーススタディ</h3>
  <table style="width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.9); border-radius: 8px; overflow: hidden;">
    <thead>
      <tr style="background: rgba(168,237,234,0.8);">
        <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 25%;">項目</th>
        <th style="padding: 15px; text-align: center; border-bottom: 2px solid white; width: 25%;">個人事業</th>
        <th style="padding: 15px; text-align: center; border-bottom: 2px solid white; width: 25%;">法人化</th>
        <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 25%;">差額・効果</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold;">売上</td>
        <td style="padding: 12px; text-align: center;">1,000万円</td>
        <td style="padding: 12px; text-align: center;">1,000万円</td>
        <td style="padding: 12px;">同額</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold;">経費</td>
        <td style="padding: 12px; text-align: center;">200万円</td>
        <td style="padding: 12px; text-align: center;">250万円</td>
        <td style="padding: 12px; color: #28a745;">経費拡大 +50万円</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold;">所得/利益</td>
        <td style="padding: 12px; text-align: center;">800万円</td>
        <td style="padding: 12px; text-align: center;">750万円</td>
        <td style="padding: 12px;">法人利益750万円</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold;">税負担</td>
        <td style="padding: 12px; text-align: center;">240万円</td>
        <td style="padding: 12px; text-align: center;">180万円</td>
        <td style="padding: 12px; color: #28a745; font-weight: bold;">節税効果 60万円</td>
      </tr>
      <tr>
        <td style="padding: 12px; font-weight: bold;">実効手取り</td>
        <td style="padding: 12px; text-align: center;">560万円</td>
        <td style="padding: 12px; text-align: center;">600万円</td>
        <td style="padding: 12px; color: #28a745; font-weight: bold;">増加 40万円</td>
      </tr>
    </tbody>
  </table>
</div>
        `
      },
      {
        type: 'text',
        title: '6. 税務リスク管理と将来への備え',
        content: `
<div style="background: linear-gradient(135deg, #6a11cb, #2575fc); padding: 32px; border-radius: 16px; margin: 24px 0; color: white; box-shadow: 0 8px 32px rgba(106, 17, 203, 0.3);">
  <h2 style="color: white; margin-bottom: 24px; font-size: 28px; text-align: center;">⚖️ 持続可能な税務戦略</h2>
  <p style="font-size: 18px; line-height: 1.8; margin-bottom: 20px;">
    税務戦略は短期的な節税効果だけでなく、長期的なリスク管理と将来の税制変更への対応を考慮した持続可能な設計が重要です。適正な記録管理と専門家との連携により、安心して実行できる体制を構築しましょう。
  </p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🚨 税務調査対策と記録管理</h2>

<div style="background: linear-gradient(135deg, #ff9a9e, #fecfef); padding: 28px; border-radius: 12px; margin: 20px 0;">
  <h3 style="color: #333; margin-bottom: 20px;">📋 税務調査の実態と対策</h3>
  <div style="background: rgba(255,255,255,0.95); padding: 24px; border-radius: 8px; margin: 16px 0;">
    <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 6px; overflow: hidden;">
      <thead>
        <tr style="background: linear-gradient(135deg, #ff9a9e, #fecfef); color: white;">
          <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 20%;">調査対象</th>
          <th style="padding: 15px; text-align: center; border-bottom: 2px solid white; width: 15%;">選定確率</th>
          <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 30%;">重点チェック項目</th>
          <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 35%;">対策ポイント</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; font-weight: bold;">個人事業主</td>
          <td style="padding: 12px; text-align: center; background: rgba(40,167,69,0.1);">約1%</td>
          <td style="padding: 12px;">売上除外、架空経費、家事関連費</td>
          <td style="padding: 12px;">売上の記録完備、経費の合理性説明準備</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; font-weight: bold;">法人</td>
          <td style="padding: 12px; text-align: center; background: rgba(255,193,7,0.2);">約3%</td>
          <td style="padding: 12px;">役員報酬、交際費、寄付金、外注費</td>
          <td style="padding: 12px;">取締役会議事録、契約書類の整備</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; font-weight: bold;">暗号資産投資家</td>
          <td style="padding: 12px; text-align: center; background: rgba(220,53,69,0.2);">調査強化中</td>
          <td style="padding: 12px;">取引履歴、DeFi取引、海外取引所</td>
          <td style="padding: 12px;">全取引の詳細記録、計算根拠の明確化</td>
        </tr>
        <tr>
          <td style="padding: 12px; font-weight: bold;">高額所得者</td>
          <td style="padding: 12px; text-align: center; background: rgba(220,53,69,0.3);">約10%</td>
          <td style="padding: 12px;">所得隠し、海外資産、名義借り</td>
          <td style="padding: 12px;">資産・取引の透明性確保、適正申告</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📊 税制改正への対応戦略</h2>

<div style="background: linear-gradient(135deg, #4ecdc4, #44a08d); padding: 24px; border-radius: 12px; margin: 20px 0; color: white;">
  <h3 style="color: white; margin-bottom: 16px;">🔄 近年の主要税制改正と影響</h3>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px;">
      <h4 style="color: #ffd700; margin-bottom: 12px;">📈 拡充・新設制度</h4>
      <ul style="list-style: none; padding-left: 0; margin: 0; line-height: 1.8; font-size: 14px;">
        <li style="margin: 6px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>新NISA制度（2024年）</strong><br>
          投資枠大幅拡大、恒久化
        </li>
        <li style="margin: 6px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>iDeCo改革</strong><br>
          加入可能年齢拡大、受給開始時期選択
        </li>
        <li style="margin: 6px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>住宅ローン控除延長</strong><br>
          2025年まで延長、省エネ住宅優遇
        </li>
      </ul>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px;">
      <h4 style="color: #ffd700; margin-bottom: 12px;">📉 縮小・廃止制度</h4>
      <ul style="list-style: none; padding-left: 0; margin: 0; line-height: 1.8; font-size: 14px;">
        <li style="margin: 6px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>ジュニアNISA廃止</strong><br>
          2023年で新規投資終了
        </li>
        <li style="margin: 6px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>暗号資産課税強化</strong><br>
          取引記録義務化、報告制度拡充
        </li>
        <li style="margin: 6px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>給与所得控除見直し</strong><br>
          高所得者の控除上限引き下げ
        </li>
      </ul>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🔮 将来の税制変更予測と対策</h2>

<div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 24px; border-radius: 12px; margin: 20px 0; color: white;">
  <h3 style="color: white; margin-bottom: 16px;">🎯 予想される税制改正と備え</h3>
  <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px; margin: 16px 0;">
    <table style="width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.9); border-radius: 8px; overflow: hidden; color: #333;">
      <thead>
        <tr style="background: rgba(102,126,234,0.8); color: white;">
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid white; width: 25%;">予想される改正</th>
          <th style="padding: 12px; text-align: center; border-bottom: 2px solid white; width: 15%;">実現可能性</th>
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid white; width: 30%;">影響</th>
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid white; width: 30%;">事前対策</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px; font-weight: bold;">金融所得課税強化</td>
          <td style="padding: 10px; text-align: center; background: rgba(255,193,7,0.2);">中</td>
          <td style="padding: 10px;">20.315%→25-30%への税率引き上げ</td>
          <td style="padding: 10px;">NISA枠の最大活用、早期利確</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px; font-weight: bold;">暗号資産の申告分離課税</td>
          <td style="padding: 10px; text-align: center; background: rgba(40,167,69,0.1);">低</td>
          <td style="padding: 10px;">税負担軽減、損益通算可能化</td>
          <td style="padding: 10px;">取引記録の完全整備、様子見</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px; font-weight: bold;">相続税基礎控除引き下げ</td>
          <td style="padding: 10px; text-align: center; background: rgba(255,193,7,0.3);">高</td>
          <td style="padding: 10px;">課税対象者拡大、税負担増</td>
          <td style="padding: 10px;">生前贈与、遺言書作成、保険活用</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold;">退職金課税見直し</td>
          <td style="padding: 10px; text-align: center; background: rgba(255,193,7,0.2);">中</td>
          <td style="padding: 10px;">退職所得控除の縮小・廃止</td>
          <td style="padding: 10px;">iDeCo拠出時期の調整検討</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">💡 専門家との連携体制</h2>

<div style="background: linear-gradient(135deg, #ffd89b, #19547b); padding: 24px; border-radius: 12px; margin: 20px 0; color: white;">
  <h3 style="color: white; margin-bottom: 16px;">🤝 税務専門家の効果的活用法</h3>
  <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px; margin: 16px 0;">
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
      <div style="background: rgba(255,255,255,0.9); padding: 16px; border-radius: 8px; color: #333;">
        <h4 style="margin-top: 0; margin-bottom: 12px; color: #333; text-align: center;">👨‍💼 税理士</h4>
        <ul style="margin: 0; padding-left: 16px; font-size: 14px; line-height: 1.6;">
          <li><strong>役割</strong><br>
            申告書作成、税務相談、調査立会</li>
          <li><strong>選定基準</strong><br>
            専門分野、料金体系、相性</li>
          <li><strong>費用目安</strong><br>
            個人：10-30万円/年<br>
            法人：30-100万円/年</li>
        </ul>
      </div>
      <div style="background: rgba(255,255,255,0.9); padding: 16px; border-radius: 8px; color: #333;">
        <h4 style="margin-top: 0; margin-bottom: 12px; color: #333; text-align: center;">🎯 FP</h4>
        <ul style="margin: 0; padding-left: 16px; font-size: 14px; line-height: 1.6;">
          <li><strong>役割</strong><br>
            総合的な資産設計、制度活用提案</li>
          <li><strong>選定基準</strong><br>
            CFP・1級FP資格、実務経験</li>
          <li><strong>費用目安</strong><br>
            相談：5,000-20,000円/時間<br>
            顧問：10-50万円/年</li>
        </ul>
      </div>
      <div style="background: rgba(255,255,255,0.9); padding: 16px; border-radius: 8px; color: #333;">
        <h4 style="margin-top: 0; margin-bottom: 12px; color: #333; text-align: center;">⚖️ 弁護士</h4>
        <ul style="margin: 0; padding-left: 16px; font-size: 14px; line-height: 1.6;">
          <li><strong>役割</strong><br>
            税務争訟、不服申立、予防法務</li>
          <li><strong>選定基準</strong><br>
            税務専門性、実績、解決力</li>
          <li><strong>費用目安</strong><br>
            相談：10,000-50,000円/時間<br>
            案件：50-500万円</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📋 税務戦略の定期見直しプロセス</h2>

<div style="background: linear-gradient(135deg, #a8edea, #fed6e3); padding: 24px; border-radius: 12px; margin: 20px 0;">
  <h3 style="color: #333; margin-bottom: 16px;">🔄 継続的改善サイクル</h3>
  <div style="background: rgba(255,255,255,0.9); padding: 20px; border-radius: 8px; margin: 16px 0;">
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px;">
      <div style="background: linear-gradient(135deg, #ff9a9e, #fecfef); padding: 16px; border-radius: 8px; color: white; text-align: center;">
        <h4 style="margin-top: 0; margin-bottom: 12px;">🗓️ 四半期</h4>
        <ul style="list-style: none; padding-left: 0; margin: 0; font-size: 14px;">
          <li>予定納税額確認</li>
          <li>控除適用状況チェック</li>
          <li>税制改正情報収集</li>
        </ul>
      </div>
      <div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 16px; border-radius: 8px; color: white; text-align: center;">
        <h4 style="margin-top: 0; margin-bottom: 12px;">📅 半年</h4>
        <ul style="list-style: none; padding-left: 0; margin: 0; font-size: 14px;">
          <li>投資実績の評価</li>
          <li>制度活用状況見直し</li>
          <li>節税効果の測定</li>
        </ul>
      </div>
      <div style="background: linear-gradient(135deg, #4ecdc4, #44a08d); padding: 16px; border-radius: 8px; color: white; text-align: center;">
        <h4 style="margin-top: 0; margin-bottom: 12px;">📊 年次</h4>
        <ul style="list-style: none; padding-left: 0; margin: 0; font-size: 14px;">
          <li>税務戦略全体見直し</li>
          <li>専門家との戦略会議</li>
          <li>次年度計画策定</li>
        </ul>
      </div>
      <div style="background: linear-gradient(135deg, #a8edea, #fed6e3); padding: 16px; border-radius: 8px; color: #333; text-align: center;">
        <h4 style="margin-top: 0; margin-bottom: 12px;">🎯 臨時</h4>
        <ul style="list-style: none; padding-left: 0; margin: 0; font-size: 14px;">
          <li>大きな収入変動時</li>
          <li>税制改正発表時</li>
          <li>ライフイベント発生時</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div style="background: linear-gradient(135deg, #6a11cb, #2575fc); padding: 20px; border-radius: 10px; margin: 20px 0; color: white; text-align: center;">
  <h3 style="margin-bottom: 16px;">🎯 税務戦略成功の鍵</h3>
  <p style="font-size: 16px; line-height: 1.8; margin-bottom: 16px; font-weight: bold;">
    「最も重要なのは、短期的な節税効果に偏らず、長期的な資産形成目標と整合した
    持続可能な税務戦略を構築することです。」
  </p>
  <div style="background: rgba(255,255,255,0.2); padding: 12px; border-radius: 6px; margin-top: 16px;">
    <p style="margin: 0; font-size: 14px;">
      💡 <strong>継続的な学習と専門家との連携により、変化する税制環境に適応し続けることが成功への道筋となります。</strong>
    </p>
  </div>
</div>
        `
      }
    ],
    keyPoints: [
      '税務戦略は合法性確保・時間軸最適化・コスト効果分析の三原則を基盤とする',
      'NISA・iDeCoの税制優遇制度を最大限活用し、年収に応じた最適な組み合わせを選択',
      '投資商品の特性を理解し、口座・制度別の最適配置で税務効率を最大化',
      'ふるさと納税・医療費控除・住宅ローン控除等の各種控除制度を戦略的に活用',
      '年収800万円超なら法人設立を検討、役員報酬最適化で大幅な税負担軽減を実現',
      '税制改正への対応と専門家連携により持続可能な税務戦略を継続的に改善'
    ],
    summary: '効果的な税務戦略は、単なる節税テクニックではなく、長期的な資産形成目標と整合した総合的なアプローチです。NISA・iDeCoなどの制度を最大活用し、投資商品の特性に応じた最適配置を行い、各種控除制度を組み合わせることで税負担を大幅に軽減できます。高所得者は法人設立も視野に入れ、税制改正に対応しながら持続可能な戦略を構築することが重要です。',
    practicalExamples: [
      'NISA・iDeCo・ふるさと納税の年収別最適活用シミュレーション',
      '投資信託の分配型vs無分配型による税務効果の違い',
      '法人化による年収1000万円の具体的節税シミュレーション',
      '住宅ローン控除と投資制度の並行活用戦略',
      '暗号資産投資における詳細な取引記録管理方法',
      '税務調査対策のための書類整備と記録管理システム'
    ],
    warningNotes: [
      'グレーゾーンの節税手法は避け、常に合法性を最優先に判断する',
      '節税効果と実行コストを必ず比較検討し、総合的な判断を行う',
      '税制改正により優遇制度が変更・廃止される可能性を考慮する',
      '法人設立は維持コストと事務負担も含めた慎重な検討が必要',
      '暗号資産投資では取引記録の詳細な管理と適正な申告が必須',
      '専門的な判断が必要な場合は必ず税理士等の専門家に相談する'
    ]
  },

  quiz: [
    {
      id: 'financial-literacy-17-q1',
      question: 'NISA制度について正しい説明はどれですか？',
      options: [
        '新NISAでは旧制度と異なり、つみたて投資枠と成長投資枠を同時に利用できる',
        '新NISAはつみたて投資枠120万円+成長投資枠240万円で年間360万円まで投資可能',
        'NISA口座での損失は特定口座の利益と損益通算できる',
        '配当金は自動的にNISA口座で非課税となる'
      ],
      correctAnswer: 1,
      explanation: '2024年から始まった新NISA制度では、つみたて投資枠120万円と成長投資枠240万円の合計360万円まで年間投資可能です。恒久化されており、生涯投資限度額は1,800万円です。'
    },
    {
      id: 'financial-literacy-17-q2',
      question: 'iDeCoの税務メリットとして正しくないものはどれですか？',
      options: [
        '拠出時に全額所得控除が適用される',
        '運用中の利益は非課税で複利運用できる',
        '受給時は退職所得控除または年金所得控除が適用される',
        '60歳前でもいつでも自由に引き出すことができる'
      ],
      correctAnswer: 3,
      explanation: 'iDeCoは原則60歳まで引き出すことができない制度です。これにより強制的な長期投資となり、老後資金の確実な形成を促進する仕組みとなっています。'
    },
    {
      id: 'financial-literacy-17-q3',
      question: '法人設立による税務メリットとして正しいものはどれですか？',
      options: [
        '設立費用は全額必要経費として即座に計上できる',
        '個人の所得税率と比較して法人税率の方が一律に低い',
        '役員報酬により所得分散し給与所得控除を活用できる',
        '赤字の場合でも法人住民税の負担はない'
      ],
      correctAnswer: 2,
      explanation: '法人設立により役員報酬として所得を分散し、給与所得控除（年収850万円まで控除額が大きい）を活用できることが主要なメリットの一つです。'
    },
    {
      id: 'financial-literacy-17-q4',
      question: 'ふるさと納税の仕組みについて正しい説明はどれですか？',
      options: [
        '寄付金額の全額が所得税・住民税から控除される',
        '年収に関係なく一律50万円まで寄付が可能',
        '実質自己負担2,000円で寄付額から2,000円を除いた全額が控除される',
        '返礼品の価値は所得として課税される'
      ],
      correctAnswer: 2,
      explanation: 'ふるさと納税は実質自己負担2,000円で、寄付額から2,000円を差し引いた金額が所得税・住民税から控除される仕組みです。控除上限額は年収や家族構成により決まります。'
    },
    {
      id: 'financial-literacy-17-q5',
      question: '投資商品の税務最適化について正しいものはどれですか？',
      options: [
        '分配型投資信託は複利効果の観点から税務効率が良い',
        'NISA口座では配当利回りの高い商品を優先的に配置すべき',
        '暗号資産の利益は申告分離課税で他所得との損益通算が可能',
        '外国株式の配当には必ず外国税額控除が適用される'
      ],
      correctAnswer: 1,
      explanation: 'NISA口座では配当・分配金が非課税となるため、高配当株式や分配型REITなど、本来課税される配当性収入の多い商品を配置することで税務効率を最大化できます。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};