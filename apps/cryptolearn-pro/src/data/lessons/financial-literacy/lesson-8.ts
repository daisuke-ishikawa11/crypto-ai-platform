import type { Lesson } from '../../../types';

export const lesson8: Lesson = {
  id: 'financial-literacy-tax-investing',
  categoryId: 'financial-literacy',
  title: '税務と投資の基本',
  slug: 'tax-investment-basics',
  description: '投資に関わる税制を理解し、税効率の良い投資戦略と節税方法を学んで、実質リターンを最大化する方法を習得します',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 35,
  orderIndex: 8,
  isPublished: true,
  tags: ['金融リテラシー', '投資基礎', '税務', '節税対策'],
  
  content: {
    sections: [
      {
        type: 'text',
        title: '投資における税金の基本',
        content: `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 24px; border-radius: 12px; color: white; margin-bottom: 24px;">
  <h2 style="margin: 0 0 16px 0; font-size: 28px;">投資と税金の重要な関係</h2>
  <p style="margin: 0; font-size: 18px; line-height: 1.6;">投資で得た利益には税金がかかります。税制を理解し、適切な対策を取ることで、手元に残る実質リターンを大幅に改善できます</p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">投資に関わる主な税金</h2>

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 16px 0;">
  <h3 style="color: #495057; margin-top: 0;">💰 投資収益にかかる税金の種類</h3>
  <p style="color: #495057; line-height: 1.8;">
    投資から得られる収益には、<strong>譲渡所得税</strong>（キャピタルゲイン税）と<strong>配当所得税</strong>（インカムゲイン税）があります。
    さらに、投資商品や投資方法により、<strong>税率や計算方法が異なる</strong>ため、
    正確な理解が税効率の良い投資戦略の基礎となります。
  </p>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">日本の投資税制の概要</h3>

<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <tr style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white;">
    <th style="padding: 12px; text-align: left; border: none;">所得の種類</th>
    <th style="padding: 12px; text-align: left; border: none;">対象</th>
    <th style="padding: 12px; text-align: left; border: none;">税率</th>
    <th style="padding: 12px; text-align: left; border: none;">課税方式</th>
  </tr>
  <tr style="background: #f8f9fa;">
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>上場株式譲渡益</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">売却益</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">20.315%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">申告分離課税</td>
  </tr>
  <tr>
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>上場株式配当</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">配当金</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">20.315%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">源泉徴収/申告</td>
  </tr>
  <tr style="background: #f8f9fa;">
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>投資信託分配金</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">分配金</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">20.315%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">源泉徴収</td>
  </tr>
  <tr>
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>暗号資産</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">売却益・交換益</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">15-55%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">総合課税（雑所得）</td>
  </tr>
  <tr style="background: #f8f9fa;">
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>FX取引</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">為替差益</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">20.315%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">申告分離課税</td>
  </tr>
</table>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">税率の内訳（20.315%の場合）</h3>

<div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h4 style="color: #1976d2;">📊 税率20.315%の構成</h4>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 16px;">
    <div style="background: white; padding: 16px; border-radius: 8px; text-align: center;">
      <div style="font-size: 24px; color: #1976d2; font-weight: bold;">15%</div>
      <div style="color: #495057; margin-top: 8px;">所得税</div>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; text-align: center;">
      <div style="font-size: 24px; color: #1976d2; font-weight: bold;">5%</div>
      <div style="color: #495057; margin-top: 8px;">住民税</div>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; text-align: center;">
      <div style="font-size: 24px; color: #1976d2; font-weight: bold;">0.315%</div>
      <div style="color: #495057; margin-top: 8px;">復興特別所得税</div>
    </div>
  </div>
</div>

<div style="background: #fff3e0; padding: 16px; border-left: 4px solid #ff9800; margin: 20px 0;">
  <strong>⚠️ 重要な注意点</strong><br>
  暗号資産の税率は総合課税のため、他の所得と合算されます。
  高所得者の場合、最高税率55%（所得税45%+住民税10%）が適用される可能性があります。
</div>`
      },
      {
        type: 'text',
        title: '特定口座と一般口座',
        content: `<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">証券口座の種類と特徴</h2>

<div style="background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
  <h3 style="color: white; margin-top: 0;">🏦 口座選択で変わる税務処理</h3>
  <p style="color: white; margin: 0;">
    証券口座の種類により、税金の計算や納税方法が大きく異なります。
    自分の投資スタイルと税務知識に合った口座選びが重要です。
  </p>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">証券口座の比較</h3>

<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <tr style="background: #343a40; color: white;">
    <th style="padding: 12px;">口座種類</th>
    <th style="padding: 12px;">源泉徴収</th>
    <th style="padding: 12px;">確定申告</th>
    <th style="padding: 12px;">メリット</th>
    <th style="padding: 12px;">デメリット</th>
  </tr>
  <tr style="background: #f8f9fa;">
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>特定口座<br>（源泉徴収あり）</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">自動</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">不要</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">手間なし、簡単</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">損益通算に制限</td>
  </tr>
  <tr>
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>特定口座<br>（源泉徴収なし）</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">なし</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">必要</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">年間取引報告書作成</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">確定申告必要</td>
  </tr>
  <tr style="background: #f8f9fa;">
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>一般口座</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">なし</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">必要</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">完全な自由度</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">全て自己管理</td>
  </tr>
</table>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">特定口座（源泉徴収あり）の仕組み</h3>

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h4 style="color: #495057;">🔄 自動的な税金処理の流れ</h4>
  
  <div style="background: white; padding: 16px; border-radius: 8px; margin-top: 16px;">
    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap;">
      <div style="text-align: center; padding: 12px;">
        <div style="background: #667eea; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; font-weight: bold;">1</div>
        <div style="color: #495057;">株式売却</div>
      </div>
      <div style="color: #667eea; font-size: 24px;">→</div>
      <div style="text-align: center; padding: 12px;">
        <div style="background: #667eea; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; font-weight: bold;">2</div>
        <div style="color: #495057;">利益計算</div>
      </div>
      <div style="color: #667eea; font-size: 24px;">→</div>
      <div style="text-align: center; padding: 12px;">
        <div style="background: #667eea; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; font-weight: bold;">3</div>
        <div style="color: #495057;">税金徴収</div>
      </div>
      <div style="color: #667eea; font-size: 24px;">→</div>
      <div style="text-align: center; padding: 12px;">
        <div style="background: #667eea; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; font-weight: bold;">4</div>
        <div style="color: #495057;">納税完了</div>
      </div>
    </div>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">口座選択のポイント</h3>

<div style="background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h4 style="color: #2e7d32;">✅ あなたに適した口座は？</h4>
  
  <div style="display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 16px;">
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #4caf50;">
      <h5 style="color: #2e7d32; margin-top: 0;">特定口座（源泉徴収あり）がおすすめの人</h5>
      <ul style="color: #495057; margin: 0;">
        <li>確定申告をしたくない</li>
        <li>投資初心者</li>
        <li>会社員で副業制限がある</li>
        <li>手間を省きたい</li>
      </ul>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #8bc34a;">
      <h5 style="color: #558b2f; margin-top: 0;">特定口座（源泉徴収なし）がおすすめの人</h5>
      <ul style="color: #495057; margin: 0;">
        <li>年間利益が20万円以下</li>
        <li>損益通算を活用したい</li>
        <li>確定申告に慣れている</li>
        <li>所得控除を最大活用したい</li>
      </ul>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #aed581;">
      <h5 style="color: #689f38; margin-top: 0;">一般口座がおすすめの人</h5>
      <ul style="color: #495057; margin: 0;">
        <li>未上場株式を取引する</li>
        <li>特殊な投資商品を扱う</li>
        <li>完全な自己管理を望む</li>
        <li>税務知識が豊富</li>
      </ul>
    </div>
  </div>
</div>`
      },
      {
        type: 'text',
        title: 'NISA制度の活用',
        content: `<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">非課税投資制度の最大活用</h2>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 24px; border-radius: 12px; margin-bottom: 20px;">
  <h3 style="color: white; margin-top: 0;">🌟 NISA（少額投資非課税制度）</h3>
  <p style="color: white; margin: 0;">
    一定額までの投資から得られる利益が非課税になる制度。
    2024年から新NISAが始まり、非課税投資枠が大幅に拡大しました。
  </p>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">新NISA制度の概要（2024年〜）</h3>

<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <tr style="background: linear-gradient(90deg, #4CAF50 0%, #45a049 100%); color: white;">
    <th style="padding: 12px;">項目</th>
    <th style="padding: 12px;">つみたて投資枠</th>
    <th style="padding: 12px;">成長投資枠</th>
  </tr>
  <tr style="background: #f8f9fa;">
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>年間投資枠</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">120万円</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">240万円</td>
  </tr>
  <tr>
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>非課税保有期間</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;" colspan="2">無期限</td>
  </tr>
  <tr style="background: #f8f9fa;">
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>非課税保有限度額</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;" colspan="2">1,800万円（うち成長投資枠1,200万円）</td>
  </tr>
  <tr>
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>投資対象商品</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">投資信託（金融庁指定）</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">上場株式、投資信託等</td>
  </tr>
  <tr style="background: #f8f9fa;">
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>併用</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;" colspan="2">可能（年間360万円まで）</td>
  </tr>
</table>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">NISA活用による節税効果シミュレーション</h3>

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h4 style="color: #495057;">💰 20年間投資した場合の節税額</h4>
  
  <div style="background: white; padding: 16px; border-radius: 8px; margin-top: 16px;">
    <p style="color: #495057; margin: 0 0 16px 0;">
      <strong>前提条件：</strong>年間120万円を20年間投資、年率5%のリターン
    </p>
    
    <table style="width: 100%; border-collapse: collapse;">
      <tr style="background: #e3f2fd;">
        <th style="padding: 12px; border: 1px solid #90caf9;">項目</th>
        <th style="padding: 12px; border: 1px solid #90caf9;">通常口座</th>
        <th style="padding: 12px; border: 1px solid #90caf9;">NISA口座</th>
        <th style="padding: 12px; border: 1px solid #90caf9;">差額</th>
      </tr>
      <tr>
        <td style="padding: 12px; border: 1px solid #dee2e6;">投資元本</td>
        <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">2,400万円</td>
        <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">2,400万円</td>
        <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">-</td>
      </tr>
      <tr style="background: #f5f5f5;">
        <td style="padding: 12px; border: 1px solid #dee2e6;">運用益</td>
        <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">1,707万円</td>
        <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">1,707万円</td>
        <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">-</td>
      </tr>
      <tr>
        <td style="padding: 12px; border: 1px solid #dee2e6;">税金</td>
        <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right; color: #dc3545;">-347万円</td>
        <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right; color: #28a745;">0円</td>
        <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right; color: #28a745; font-weight: bold;">+347万円</td>
      </tr>
      <tr style="background: #e8f5e9;">
        <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>手取り額</strong></td>
        <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;"><strong>3,760万円</strong></td>
        <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;"><strong>4,107万円</strong></td>
        <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right; color: #28a745;"><strong>+347万円</strong></td>
      </tr>
    </table>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">iDeCo（個人型確定拠出年金）との併用</h3>

<div style="background: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h4 style="color: #f57c00;">🏦 老後資金準備の最強コンビネーション</h4>
  
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 16px;">
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <h5 style="color: #e65100; margin-top: 0;">NISA</h5>
      <ul style="color: #495057; margin: 0; font-size: 14px;">
        <li>いつでも引き出し可能</li>
        <li>運用益が非課税</li>
        <li>投資対象が幅広い</li>
        <li>年間360万円まで</li>
      </ul>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <h5 style="color: #e65100; margin-top: 0;">iDeCo</h5>
      <ul style="color: #495057; margin: 0; font-size: 14px;">
        <li>60歳まで引き出し不可</li>
        <li>掛金が所得控除</li>
        <li>運用益も非課税</li>
        <li>年間14.4〜81.6万円</li>
      </ul>
    </div>
  </div>
</div>

<div style="background: #e3f2fd; padding: 16px; border-left: 4px solid #2196f3; margin: 20px 0;">
  <strong>💡 活用のポイント</strong><br>
  まずはNISAの枠を最大限活用し、さらに余裕があればiDeCoも併用することで、
  税制優遇を最大限に活用した資産形成が可能です。
</div>`
      },
      {
        type: 'text',
        title: '損益通算と繰越控除',
        content: `<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">損失を活用した節税戦略</h2>

<div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 24px; border-radius: 12px; margin-bottom: 20px;">
  <h3 style="color: white; margin-top: 0;">📉 損失も賢く活用する</h3>
  <p style="color: white; margin: 0;">
    投資で生じた損失は、他の利益と相殺したり、翌年以降に繰り越したりすることで、
    税負担を軽減できます。これが損益通算と繰越控除の仕組みです。
  </p>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">損益通算の仕組み</h3>

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h4 style="color: #495057;">⚖️ 利益と損失の相殺</h4>
  
  <div style="background: white; padding: 16px; border-radius: 8px; margin-top: 16px;">
    <h5 style="color: #495057; margin-top: 0;">年間取引の例</h5>
    <table style="width: 100%; border-collapse: collapse;">
      <tr style="background: #495057; color: white;">
        <th style="padding: 8px;">取引</th>
        <th style="padding: 8px;">銘柄</th>
        <th style="padding: 8px;">損益</th>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #dee2e6;">売却1</td>
        <td style="padding: 8px; border: 1px solid #dee2e6;">A株式</td>
        <td style="padding: 8px; border: 1px solid #dee2e6; text-align: right; color: #28a745;">+100万円</td>
      </tr>
      <tr style="background: #f8f9fa;">
        <td style="padding: 8px; border: 1px solid #dee2e6;">売却2</td>
        <td style="padding: 8px; border: 1px solid #dee2e6;">B株式</td>
        <td style="padding: 8px; border: 1px solid #dee2e6; text-align: right; color: #dc3545;">-60万円</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #dee2e6;">配当</td>
        <td style="padding: 8px; border: 1px solid #dee2e6;">C株式</td>
        <td style="padding: 8px; border: 1px solid #dee2e6; text-align: right; color: #28a745;">+20万円</td>
      </tr>
      <tr style="background: #e3f2fd;">
        <td style="padding: 8px; border: 1px solid #dee2e6;" colspan="2"><strong>通算所得</strong></td>
        <td style="padding: 8px; border: 1px solid #dee2e6; text-align: right;"><strong>+60万円</strong></td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #dee2e6;" colspan="2">税金（20.315%）</td>
        <td style="padding: 8px; border: 1px solid #dee2e6; text-align: right; color: #dc3545;">-12.2万円</td>
      </tr>
    </table>
    <p style="color: #495057; margin: 16px 0 0 0;">
      損益通算により、100万円の利益に対する税金（20.3万円）ではなく、
      60万円に対する税金（12.2万円）で済み、<strong>8.1万円の節税</strong>になります。
    </p>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">3年間の繰越控除</h3>

<div style="background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h4 style="color: #2e7d32;">📅 損失を3年間持ち越せる</h4>
  
  <table style="width: 100%; margin-top: 16px; border-collapse: collapse;">
    <tr style="background: #2e7d32; color: white;">
      <th style="padding: 8px;">年度</th>
      <th style="padding: 8px;">損益</th>
      <th style="padding: 8px;">繰越損失</th>
      <th style="padding: 8px;">課税所得</th>
      <th style="padding: 8px;">税金</th>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #dee2e6;">1年目</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: right; color: #dc3545;">-200万円</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: right;">200万円</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: right;">0円</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: right;">0円</td>
    </tr>
    <tr style="background: #f4f9f4;">
      <td style="padding: 8px; border: 1px solid #dee2e6;">2年目</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: right; color: #28a745;">+80万円</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: right;">120万円</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: right;">0円</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: right;">0円</td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #dee2e6;">3年目</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: right; color: #28a745;">+150万円</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: right;">0円</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: right;">30万円</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: right;">6.1万円</td>
    </tr>
  </table>
  <p style="color: #2e7d32; margin: 16px 0 0 0;">
    1年目の損失200万円を繰り越すことで、2〜3年目の利益230万円のうち200万円分が相殺され、
    <strong>約40.6万円の節税効果</strong>が得られます。
  </p>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">損益通算の注意点</h3>

<div style="background: #f8d7da; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h4 style="color: #721c24;">⚠️ 通算できない組み合わせ</h4>
  
  <table style="width: 100%; margin-top: 16px; border-collapse: collapse;">
    <tr style="background: #721c24; color: white;">
      <th style="padding: 8px;">所得の種類</th>
      <th style="padding: 8px;">通算可否</th>
      <th style="padding: 8px;">備考</th>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #dee2e6;">上場株式 ⇔ 上場株式</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: center; color: #28a745;">○</td>
      <td style="padding: 8px; border: 1px solid #dee2e6;">同一区分内で通算可能</td>
    </tr>
    <tr style="background: #fef5f5;">
      <td style="padding: 8px; border: 1px solid #dee2e6;">上場株式 ⇔ 配当</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: center; color: #28a745;">○</td>
      <td style="padding: 8px; border: 1px solid #dee2e6;">申告分離課税選択時</td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #dee2e6;">上場株式 ⇔ 暗号資産</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: center; color: #dc3545;">×</td>
      <td style="padding: 8px; border: 1px solid #dee2e6;">課税方式が異なる</td>
    </tr>
    <tr style="background: #fef5f5;">
      <td style="padding: 8px; border: 1px solid #dee2e6;">NISA口座 ⇔ 特定口座</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: center; color: #dc3545;">×</td>
      <td style="padding: 8px; border: 1px solid #dee2e6;">NISA損失は対象外</td>
    </tr>
  </table>
</div>`
      },
      {
        type: 'text',
        title: '暗号資産の税務対策',
        content: `<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">暗号資産投資の税金対策</h2>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 24px; border-radius: 12px; margin-bottom: 20px;">
  <h3 style="color: white; margin-top: 0;">🪙 暗号資産の特殊な税制</h3>
  <p style="color: white; margin: 0;">
    暗号資産は雑所得として総合課税されるため、最高税率55%になる可能性があります。
    適切な税務対策で、手取りを最大化しましょう。
  </p>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">暗号資産の課税タイミング</h3>

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h4 style="color: #495057;">💸 課税が発生する瞬間</h4>
  
  <div style="display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 16px;">
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #dc3545;">
      <h5 style="color: #dc3545; margin-top: 0;">1. 暗号資産を売却した時</h5>
      <p style="color: #495057; margin: 8px 0 0 0;">
        売却価格 - 取得価格 = 所得（利益の場合課税）
      </p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #dc3545;">
      <h5 style="color: #dc3545; margin-top: 0;">2. 暗号資産で商品を購入した時</h5>
      <p style="color: #495057; margin: 8px 0 0 0;">
        商品価格 - 暗号資産の取得価格 = 所得
      </p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #dc3545;">
      <h5 style="color: #dc3545; margin-top: 0;">3. 暗号資産同士を交換した時</h5>
      <p style="color: #495057; margin: 8px 0 0 0;">
        交換時の時価 - 元の暗号資産の取得価格 = 所得
      </p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #28a745;">
      <h5 style="color: #28a745; margin-top: 0;">4. マイニング・ステーキング報酬</h5>
      <p style="color: #495057; margin: 8px 0 0 0;">
        受取時の時価が所得（取得価格は時価となる）
      </p>
    </div>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">暗号資産の税率表</h3>

<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <tr style="background: linear-gradient(90deg, #ff6b6b 0%, #4ecdc4 100%); color: white;">
    <th style="padding: 12px;">課税所得金額</th>
    <th style="padding: 12px;">税率</th>
    <th style="padding: 12px;">控除額</th>
    <th style="padding: 12px;">住民税</th>
    <th style="padding: 12px;">合計税率</th>
  </tr>
  <tr style="background: #f8f9fa;">
    <td style="padding: 12px; border: 1px solid #dee2e6;">195万円以下</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">5%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">0円</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">10%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;"><strong>15%</strong></td>
  </tr>
  <tr>
    <td style="padding: 12px; border: 1px solid #dee2e6;">195万円超330万円以下</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">10%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">97,500円</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">10%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;"><strong>20%</strong></td>
  </tr>
  <tr style="background: #f8f9fa;">
    <td style="padding: 12px; border: 1px solid #dee2e6;">330万円超695万円以下</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">20%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">427,500円</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">10%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;"><strong>30%</strong></td>
  </tr>
  <tr>
    <td style="padding: 12px; border: 1px solid #dee2e6;">695万円超900万円以下</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">23%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">636,000円</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">10%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;"><strong>33%</strong></td>
  </tr>
  <tr style="background: #f8f9fa;">
    <td style="padding: 12px; border: 1px solid #dee2e6;">900万円超1,800万円以下</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">33%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">1,536,000円</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">10%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;"><strong>43%</strong></td>
  </tr>
  <tr>
    <td style="padding: 12px; border: 1px solid #dee2e6;">4,000万円超</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">45%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">4,796,000円</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">10%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center; color: #dc3545;"><strong>55%</strong></td>
  </tr>
</table>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">暗号資産の節税対策</h3>

<div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h4 style="color: #1976d2;">💡 実践的な節税テクニック</h4>
  
  <div style="display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 16px;">
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <h5 style="color: #1976d2; margin-top: 0;">1. 長期保有戦略</h5>
      <p style="color: #495057; margin: 8px 0 0 0;">
        売却しなければ課税されない。将来の税制改正を待つのも一つの戦略。
      </p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <h5 style="color: #1976d2; margin-top: 0;">2. 損益調整</h5>
      <p style="color: #495057; margin: 8px 0 0 0;">
        年末に含み損のある暗号資産を売却し、利益を相殺する。
      </p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <h5 style="color: #1976d2; margin-top: 0;">3. 法人化の検討</h5>
      <p style="color: #495057; margin: 8px 0 0 0;">
        利益が大きい場合、法人税率（約30%）の方が有利になることも。
      </p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <h5 style="color: #1976d2; margin-top: 0;">4. 移動平均法での計算</h5>
      <p style="color: #495057; margin: 8px 0 0 0;">
        取得価格の計算方法を最適化し、税負担を軽減。
      </p>
    </div>
  </div>
</div>

<div style="background: #fff3e0; padding: 16px; border-left: 4px solid #ff9800; margin: 20px 0;">
  <strong>⚠️ 重要な注意</strong><br>
  暗号資産の税制は頻繁に変更される可能性があります。
  大きな取引を行う前に、必ず最新の税制を確認し、税理士等の専門家に相談することをお勧めします。
</div>`
      },
      {
        type: 'text',
        title: '実践的な税務戦略',
        content: `<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">税効率を最大化する投資戦略</h2>

<div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); padding: 24px; border-radius: 12px; margin-bottom: 20px;">
  <h3 style="color: white; margin-top: 0;">🎯 賢い投資家の税務戦略</h3>
  <p style="color: white; margin: 0;">
    投資リターンの最大化は、税引き後のリターンで考えるべきです。
    適切な税務戦略により、実質リターンを10-20%改善することも可能です。
  </p>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">年間税務カレンダー</h3>

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h4 style="color: #495057;">📅 税務を意識した年間スケジュール</h4>
  
  <table style="width: 100%; margin-top: 16px; border-collapse: collapse;">
    <tr style="background: #495057; color: white;">
      <th style="padding: 12px;">時期</th>
      <th style="padding: 12px;">やるべきこと</th>
      <th style="padding: 12px;">ポイント</th>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>1-3月</strong></td>
      <td style="padding: 12px; border: 1px solid #dee2e6;">確定申告準備・提出</td>
      <td style="padding: 12px; border: 1px solid #dee2e6;">前年の損益確定、繰越控除申請</td>
    </tr>
    <tr style="background: #f8f9fa;">
      <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>4-6月</strong></td>
      <td style="padding: 12px; border: 1px solid #dee2e6;">NISA枠の活用開始</td>
      <td style="padding: 12px; border: 1px solid #dee2e6;">早期投資で非課税期間最大化</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>7-9月</strong></td>
      <td style="padding: 12px; border: 1px solid #dee2e6;">ポートフォリオ見直し</td>
      <td style="padding: 12px; border: 1px solid #dee2e6;">含み損益の確認、戦略調整</td>
    </tr>
    <tr style="background: #f8f9fa;">
      <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>10-11月</strong></td>
      <td style="padding: 12px; border: 1px solid #dee2e6;">年末対策準備</td>
      <td style="padding: 12px; border: 1px solid #dee2e6;">損益通算の計画立案</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>12月</strong></td>
      <td style="padding: 12px; border: 1px solid #dee2e6;">損益調整実行</td>
      <td style="padding: 12px; border: 1px solid #dee2e6;">含み損の実現、利益確定</td>
    </tr>
  </table>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">投資商品別の税務戦略</h3>

<div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h4 style="color: #155724;">🎯 商品特性を活かした戦略</h4>
  
  <div style="display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 16px;">
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <h5 style="color: #155724; margin-top: 0;">高配当株式</h5>
      <p style="color: #495057; margin: 0 0 8px 0;"><strong>戦略：</strong>NISA口座で保有</p>
      <p style="color: #495057; margin: 0;">配当金の非課税メリットを最大活用</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <h5 style="color: #155724; margin-top: 0;">成長株</h5>
      <p style="color: #495057; margin: 0 0 8px 0;"><strong>戦略：</strong>長期保有</p>
      <p style="color: #495057; margin: 0;">売却を遅らせて課税を繰り延べ</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <h5 style="color: #155724; margin-top: 0;">債券・REIT</h5>
      <p style="color: #495057; margin: 0 0 8px 0;"><strong>戦略：</strong>特定口座で損益通算</p>
      <p style="color: #495057; margin: 0;">安定収益と税務メリットの両立</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <h5 style="color: #155724; margin-top: 0;">暗号資産</h5>
      <p style="color: #495057; margin: 0 0 8px 0;"><strong>戦略：</strong>少額分散・長期保有</p>
      <p style="color: #495057; margin: 0;">高税率を回避しつつ成長を狙う</p>
    </div>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">税務最適化チェックリスト</h3>

<div style="background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h4 style="color: #2e7d32;">✅ 年末までに確認すべき10項目</h4>
  
  <div style="background: white; padding: 16px; border-radius: 8px; margin-top: 16px;">
    <div style="display: grid; grid-template-columns: 1fr; gap: 8px;">
      <label style="display: flex; align-items: center; color: #495057;">
        <input type="checkbox" style="margin-right: 8px;">
        <span>1. NISA枠を最大限活用したか</span>
      </label>
      <label style="display: flex; align-items: center; color: #495057;">
        <input type="checkbox" style="margin-right: 8px;">
        <span>2. iDeCo掛金を拠出したか</span>
      </label>
      <label style="display: flex; align-items: center; color: #495057;">
        <input type="checkbox" style="margin-right: 8px;">
        <span>3. 含み損の実現を検討したか</span>
      </label>
      <label style="display: flex; align-items: center; color: #495057;">
        <input type="checkbox" style="margin-right: 8px;">
        <span>4. 損益通算の機会を確認したか</span>
      </label>
      <label style="display: flex; align-items: center; color: #495057;">
        <input type="checkbox" style="margin-right: 8px;">
        <span>5. 配当金の受取方法を最適化したか</span>
      </label>
      <label style="display: flex; align-items: center; color: #495057;">
        <input type="checkbox" style="margin-right: 8px;">
        <span>6. 特定口座の源泉徴収設定を確認したか</span>
      </label>
      <label style="display: flex; align-items: center; color: #495057;">
        <input type="checkbox" style="margin-right: 8px;">
        <span>7. 暗号資産の取引記録を整理したか</span>
      </label>
      <label style="display: flex; align-items: center; color: #495057;">
        <input type="checkbox" style="margin-right: 8px;">
        <span>8. 必要経費の領収書を保管したか</span>
      </label>
      <label style="display: flex; align-items: center; color: #495057;">
        <input type="checkbox" style="margin-right: 8px;">
        <span>9. 来年の投資計画を税務面から検討したか</span>
      </label>
      <label style="display: flex; align-items: center; color: #495057;">
        <input type="checkbox" style="margin-right: 8px;">
        <span>10. 必要に応じて税理士に相談したか</span>
      </label>
    </div>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">実質リターンの計算例</h3>

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h4 style="color: #495057;">💰 税務戦略による差額</h4>
  
  <table style="width: 100%; margin-top: 16px; border-collapse: collapse;">
    <tr style="background: #667eea; color: white;">
      <th style="padding: 12px;">項目</th>
      <th style="padding: 12px;">戦略なし</th>
      <th style="padding: 12px;">戦略あり</th>
      <th style="padding: 12px;">差額</th>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #dee2e6;">投資元本</td>
      <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">1,000万円</td>
      <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">1,000万円</td>
      <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">-</td>
    </tr>
    <tr style="background: #f8f9fa;">
      <td style="padding: 12px; border: 1px solid #dee2e6;">運用益（5年）</td>
      <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">500万円</td>
      <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">500万円</td>
      <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">-</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #dee2e6;">税金</td>
      <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right; color: #dc3545;">-102万円</td>
      <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right; color: #dc3545;">-51万円</td>
      <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right; color: #28a745;">+51万円</td>
    </tr>
    <tr style="background: #e3f2fd;">
      <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>手取り</strong></td>
      <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;"><strong>1,398万円</strong></td>
      <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;"><strong>1,449万円</strong></td>
      <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right; color: #28a745;"><strong>+51万円</strong></td>
    </tr>
  </table>
</div>

<div style="background: #e3f2fd; padding: 16px; border-left: 4px solid #2196f3; margin: 20px 0;">
  <strong>📌 まとめ</strong><br>
  税務は投資リターンに直接影響する重要な要素です。
  NISA・iDeCoの活用、損益通算、適切な口座選択など、基本的な税務知識を身につけ、
  実践することで、長期的に大きな差が生まれます。
  複雑な取引や大きな利益が出た場合は、税理士等の専門家への相談も検討しましょう。
</div>`
      }
    ],
    keyPoints: [
      '投資にかかる税金の種類と税率の理解',
      '特定口座と一般口座の違いと選択基準',
      'NISA・iDeCoを活用した非課税投資',
      '損益通算と繰越控除による節税',
      '暗号資産の特殊な税制と対策',
      '年間を通じた税務戦略の実践'
    ],
    summary: 'このレッスンでは、投資における税務の基本から実践的な節税戦略まで包括的に学習しました。税制を理解し、NISA・iDeCoの活用、損益通算、適切な口座選択などを実践することで、実質リターンを大幅に改善できます。税務戦略は投資戦略の重要な一部であることを認識し、継続的に最適化していくことが重要です。',
    practicalExamples: [
      'NISA枠360万円の最大活用',
      '年末の損益通算による税負担軽減',
      '特定口座（源泉徴収あり）での自動税務処理',
      '3年間の繰越控除を活用した節税',
      '暗号資産の長期保有による課税繰り延べ'
    ],
    warningNotes: [
      '税制は頻繁に改正されるため、最新情報の確認が必要です',
      '暗号資産は総合課税のため高税率になる可能性があります',
      'NISA口座の損失は損益通算できません',
      '大きな利益が出た場合は税理士への相談を検討してください',
      '確定申告が必要な場合は期限内に必ず行ってください'
    ]
  },

  quiz: [
    {
      id: 'tax-1',
      question: '上場株式の譲渡益にかかる税率は？',
      options: [
        '10.21%',
        '15.315%',
        '20.315%',
        '23.483%'
      ],
      correctAnswer: 2,
      explanation: '上場株式の譲渡益には20.315%（所得税15%+住民税5%+復興特別所得税0.315%）の税金がかかります。'
    },
    {
      id: 'tax-2',
      question: '新NISAの年間投資上限額（つみたて投資枠+成長投資枠）は？',
      options: [
        '120万円',
        '240万円',
        '360万円',
        '600万円'
      ],
      correctAnswer: 2,
      explanation: '新NISAでは、つみたて投資枠120万円と成長投資枠240万円を合わせて、年間最大360万円まで投資できます。'
    },
    {
      id: 'tax-3',
      question: '株式投資の損失を翌年以降に繰り越せる期間は？',
      options: [
        '1年間',
        '2年間',
        '3年間',
        '5年間'
      ],
      correctAnswer: 2,
      explanation: '上場株式等の譲渡損失は、確定申告により翌年以降3年間繰り越すことができます。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};