import type { Lesson } from '../../../types';

export const lesson11: Lesson = {
  id: 'financial-literacy-11',
  categoryId: 'financial-literacy',
  title: '個人財務管理とキャッシュフロー分析',
  slug: 'personal-finance-cashflow',
  description: '個人の財務状況を体系的に把握し、効果的なキャッシュフロー管理と家計改善を実現する実践的レッスン',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 50,
  orderIndex: 11,
  isPublished: true,
  tags: ['金融リテラシー', '家計管理', 'キャッシュフロー', '資産形成'],
  
  content: {
    sections: [
      {
        type: 'text',
        title: '家計の財務諸表作成',
        content: `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 1rem; color: white; margin-bottom: 2rem;">
  <h2 style="margin: 0 0 1rem 0; font-size: 2rem;">💰 個人版バランスシート（貸借対照表）の作成</h2>
  <p style="margin: 0; font-size: 1.1rem; line-height: 1.6;">企業会計の手法を個人の家計に応用し、財務状況を可視化します。</p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📊 資産の部の整理</h2>

<table style="width: 100%; border-collapse: collapse; margin: 2rem 0;">
  <thead>
    <tr style="background: linear-gradient(90deg, #667eea, #764ba2); color: white;">
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">資産カテゴリー</th>
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">項目例</th>
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">評価方法</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #f8f9fa;">
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>流動資産</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">現金、普通預金、定期預金（1年以内）</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">額面金額</td>
    </tr>
    <tr>
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>金融資産</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">株式、投資信託、債券、暗号資産</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">時価評価</td>
    </tr>
    <tr style="background: #f8f9fa;">
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>固定資産</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">不動産、自動車、貴金属</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">時価または取得価額</td>
    </tr>
    <tr>
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>その他資産</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">保険解約返戻金、貸付金</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">現在価値</td>
    </tr>
  </tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">💳 負債の部の整理</h2>

<div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 1.5rem; margin: 2rem 0;">
  <h3 style="margin: 0 0 1rem 0; color: #856404;">負債の分類と管理</h3>
  <ul style="margin: 0; padding-left: 1.5rem; color: #856404;">
    <li><strong>短期負債</strong>：クレジットカード残高、消費者金融（1年以内返済）</li>
    <li><strong>長期負債</strong>：住宅ローン、自動車ローン、教育ローン</li>
    <li><strong>その他負債</strong>：未払い税金、保証債務</li>
  </ul>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📈 純資産の算出</h2>

<div style="background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%); padding: 2rem; border-radius: 1rem; margin: 2rem 0;">
  <h3 style="margin: 0 0 1rem 0; color: #2c3e50;">純資産 = 総資産 - 総負債</h3>
  <p style="margin: 0.5rem 0; color: #2c3e50; font-size: 1.1rem;">
    純資産は「本当の財産」を表します。<br>
    目標：年齢×年収×0.1 以上の純資産を目指す（例：40歳、年収600万円なら2,400万円）
  </p>
</div>`
      },
      {
        type: 'text',
        title: 'キャッシュフロー計算書の作成',
        content: `<div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); padding: 2rem; border-radius: 1rem; color: #2c3e50; margin-bottom: 2rem;">
  <h2 style="margin: 0 0 1rem 0; font-size: 2rem;">💸 月次キャッシュフロー分析</h2>
  <p style="margin: 0; font-size: 1.1rem; line-height: 1.6;">収入と支出の流れを把握し、貯蓄余力を最大化します。</p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📥 収入（キャッシュイン）の分類</h2>

<table style="width: 100%; border-collapse: collapse; margin: 2rem 0;">
  <thead>
    <tr style="background: #28a745; color: white;">
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">収入カテゴリー</th>
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">内訳</th>
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">管理ポイント</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #f8f9fa;">
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>給与収入</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">基本給、残業代、賞与</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">手取り額で計算</td>
    </tr>
    <tr>
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>事業収入</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">副業、フリーランス収入</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">税金・経費を考慮</td>
    </tr>
    <tr style="background: #f8f9fa;">
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>投資収入</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">配当金、利子、家賃収入</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">源泉徴収後の金額</td>
    </tr>
    <tr>
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>その他収入</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">還付金、臨時収入</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">一時的収入として区別</td>
    </tr>
  </tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📤 支出（キャッシュアウト）の分類</h2>

<table style="width: 100%; border-collapse: collapse; margin: 2rem 0;">
  <thead>
    <tr style="background: #dc3545; color: white;">
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">支出カテゴリー</th>
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">内訳</th>
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">削減可能性</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #f8f9fa;">
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>固定費</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">家賃、ローン返済、保険料</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">中長期で見直し</td>
    </tr>
    <tr>
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>変動費</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">食費、光熱費、交通費</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">即座に削減可能</td>
    </tr>
    <tr style="background: #f8f9fa;">
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>準固定費</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">通信費、サブスク、習い事</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">定期的に見直し</td>
    </tr>
    <tr>
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>特別支出</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">冠婚葬祭、医療費、修繕費</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">予備費で対応</td>
    </tr>
  </tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🎯 フリーキャッシュフローの算出</h2>

<div style="background: #d4edda; border: 2px solid #28a745; padding: 1.5rem; border-radius: 0.5rem; margin: 2rem 0;">
  <h3 style="margin: 0 0 1rem 0; color: #155724;">月次フリーキャッシュフロー = 総収入 - 総支出</h3>
  <p style="margin: 0.5rem 0; color: #155724;">目標貯蓄率：</p>
  <ul style="margin: 0.5rem 0; padding-left: 1.5rem; color: #155724;">
    <li>20代：手取りの15-20%</li>
    <li>30代：手取りの20-25%</li>
    <li>40代：手取りの25-30%</li>
    <li>50代：手取りの30%以上</li>
  </ul>
</div>`
      },
      {
        type: 'text',
        title: '家計改善の実践テクニック',
        content: `<div style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); padding: 2rem; border-radius: 1rem; color: #2c3e50; margin-bottom: 2rem;">
  <h2 style="margin: 0 0 1rem 0; font-size: 2rem;">🔧 支出最適化の具体的手法</h2>
  <p style="margin: 0; font-size: 1.1rem; line-height: 1.6;">無理のない範囲で支出を削減し、投資余力を生み出します。</p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">💡 固定費削減の優先順位</h2>

<div style="background: #f8f9fa; border-radius: 0.5rem; padding: 1.5rem; margin: 2rem 0;">
  <h3 style="color: #495057; margin-bottom: 1rem;">1. 住居費の最適化（目標：手取りの25%以下）</h3>
  <ul style="color: #495057;">
    <li>家賃交渉・引っ越しの検討</li>
    <li>住宅ローンの借り換え検討</li>
    <li>固定資産税の軽減措置確認</li>
  </ul>
</div>

<div style="background: #f8f9fa; border-radius: 0.5rem; padding: 1.5rem; margin: 2rem 0;">
  <h3 style="color: #495057; margin-bottom: 1rem;">2. 保険の見直し（目標：手取りの5-7%）</h3>
  <ul style="color: #495057;">
    <li>重複保障の解消</li>
    <li>公的保障でカバーされる部分の確認</li>
    <li>ネット保険への切り替え検討</li>
  </ul>
</div>

<div style="background: #f8f9fa; border-radius: 0.5rem; padding: 1.5rem; margin: 2rem 0;">
  <h3 style="color: #495057; margin-bottom: 1rem;">3. 通信費の削減（目標：世帯で1万円以下）</h3>
  <ul style="color: #495057;">
    <li>格安SIMへの移行</li>
    <li>不要なオプション解約</li>
    <li>家族割・セット割の活用</li>
  </ul>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📊 変動費コントロールの技法</h2>

<table style="width: 100%; border-collapse: collapse; margin: 2rem 0;">
  <thead>
    <tr style="background: #6c757d; color: white;">
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">項目</th>
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">削減手法</th>
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">期待削減率</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #f8f9fa;">
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>食費</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">まとめ買い、自炊推進、食材ロス削減</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">20-30%</td>
    </tr>
    <tr>
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>光熱費</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">電力会社切り替え、省エネ家電導入</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">15-20%</td>
    </tr>
    <tr style="background: #f8f9fa;">
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>交際費</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">予算設定、キャッシュレス還元活用</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">10-15%</td>
    </tr>
    <tr>
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>娯楽費</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">サブスク見直し、無料サービス活用</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">30-40%</td>
    </tr>
  </tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🎯 貯蓄の自動化システム</h2>

<div style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 2rem; border-radius: 1rem; margin: 2rem 0;">
  <h3 style="margin: 0 0 1rem 0; color: #2c3e50;">先取り貯蓄の仕組み化</h3>
  <ol style="margin: 0.5rem 0; color: #2c3e50;">
    <li><strong>給与振込口座</strong>から自動振替設定</li>
    <li><strong>目的別口座</strong>の開設（緊急資金、投資資金、特定目的）</li>
    <li><strong>積立投資</strong>の自動設定（つみたてNISA、iDeCo）</li>
    <li><strong>残高</strong>で生活費をやりくり</li>
  </ol>
</div>`
      },
      {
        type: 'text',
        title: '財務目標設定と達成戦略',
        content: `<div style="background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%); padding: 2rem; border-radius: 1rem; color: white; margin-bottom: 2rem;">
  <h2 style="margin: 0 0 1rem 0; font-size: 2rem;">🎯 SMART目標による財務計画</h2>
  <p style="margin: 0; font-size: 1.1rem; line-height: 1.6;">具体的で測定可能な財務目標を設定し、着実に達成します。</p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📅 短期・中期・長期目標の設定</h2>

<table style="width: 100%; border-collapse: collapse; margin: 2rem 0;">
  <thead>
    <tr style="background: linear-gradient(90deg, #667eea, #764ba2); color: white;">
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">期間</th>
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">目標例</th>
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">必要資金</th>
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">達成戦略</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #f8f9fa;">
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>短期<br>(1年以内)</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">緊急予備資金<br>旅行資金</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">生活費6ヶ月分<br>30-50万円</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">普通預金<br>定期預金</td>
    </tr>
    <tr>
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>中期<br>(1-5年)</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">住宅頭金<br>自動車購入</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">300-500万円<br>200-400万円</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">つみたてNISA<br>個人向け国債</td>
    </tr>
    <tr style="background: #f8f9fa;">
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>長期<br>(5年以上)</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">教育資金<br>老後資金</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">1000万円以上<br>2000万円以上</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">iDeCo<br>投資信託</td>
    </tr>
  </tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">💰 目標達成のための積立計算</h2>

<div style="background: #e7f3ff; border: 2px solid #007bff; padding: 1.5rem; border-radius: 0.5rem; margin: 2rem 0;">
  <h3 style="margin: 0 0 1rem 0; color: #004085;">必要積立額の計算式</h3>
  <p style="margin: 0.5rem 0; color: #004085; font-family: monospace; font-size: 1.1rem;">
    月額積立額 = 目標金額 ÷ (積立期間(月) + 運用収益率による複利効果)
  </p>
  <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #007bff;">
    <p style="margin: 0.5rem 0; color: #004085;"><strong>例：5年後に300万円を貯める場合</strong></p>
    <ul style="margin: 0.5rem 0; padding-left: 1.5rem; color: #004085;">
      <li>運用なし（預金のみ）：月5万円</li>
      <li>年率3%運用：月4.6万円</li>
      <li>年率5%運用：月4.4万円</li>
    </ul>
  </div>
</div>`
      },
      {
        type: 'text',
        title: '家計診断ツールの活用',
        content: `<div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 2rem; border-radius: 1rem; color: white; margin-bottom: 2rem;">
  <h2 style="margin: 0 0 1rem 0; font-size: 2rem;">📱 デジタルツールで家計を見える化</h2>
  <p style="margin: 0; font-size: 1.1rem; line-height: 1.6;">最新のアプリやツールを活用して、効率的に家計管理を行います。</p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🛠️ 家計管理アプリの選び方</h2>

<table style="width: 100%; border-collapse: collapse; margin: 2rem 0;">
  <thead>
    <tr style="background: #17a2b8; color: white;">
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">機能</th>
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">重要度</th>
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">確認ポイント</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #f8f9fa;">
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>口座連携</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">★★★</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">銀行・クレジットカード対応状況</td>
    </tr>
    <tr>
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>自動仕訳</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">★★★</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">AIによる精度、カスタマイズ性</td>
    </tr>
    <tr style="background: #f8f9fa;">
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>予算管理</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">★★☆</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">カテゴリ別設定、アラート機能</td>
    </tr>
    <tr>
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>レポート機能</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">★★☆</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">グラフ表示、期間比較機能</td>
    </tr>
  </tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📊 エクセルでの家計簿作成</h2>

<div style="background: #f8f9fa; border-radius: 0.5rem; padding: 1.5rem; margin: 2rem 0;">
  <h3 style="color: #495057; margin-bottom: 1rem;">基本シート構成</h3>
  <ol style="color: #495057;">
    <li><strong>収支記録シート</strong>：日々の収入・支出を記録</li>
    <li><strong>月次集計シート</strong>：カテゴリ別に自動集計</li>
    <li><strong>年間推移シート</strong>：月別推移をグラフ化</li>
    <li><strong>資産管理シート</strong>：資産・負債の推移を記録</li>
  </ol>
  <div style="margin-top: 1rem; padding: 1rem; background: #e9ecef; border-radius: 0.25rem;">
    <p style="margin: 0; color: #495057;"><strong>便利な関数：</strong>SUMIF、VLOOKUP、ピボットテーブル</p>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🔍 財務健全性の指標</h2>

<div style="background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%); padding: 2rem; border-radius: 1rem; margin: 2rem 0;">
  <h3 style="margin: 0 0 1rem 0; color: #2c3e50;">健全な家計の目安</h3>
  <table style="width: 100%; margin-top: 1rem;">
    <tr>
      <td style="padding: 0.5rem; color: #2c3e50;"><strong>貯蓄率</strong></td>
      <td style="padding: 0.5rem; color: #2c3e50;">手取りの20%以上</td>
    </tr>
    <tr>
      <td style="padding: 0.5rem; color: #2c3e50;"><strong>流動性比率</strong></td>
      <td style="padding: 0.5rem; color: #2c3e50;">流動資産÷月間支出 = 6以上</td>
    </tr>
    <tr>
      <td style="padding: 0.5rem; color: #2c3e50;"><strong>負債比率</strong></td>
      <td style="padding: 0.5rem; color: #2c3e50;">総負債÷総資産 = 30%以下</td>
    </tr>
    <tr>
      <td style="padding: 0.5rem; color: #2c3e50;"><strong>住居費率</strong></td>
      <td style="padding: 0.5rem; color: #2c3e50;">住居費÷手取り = 25%以下</td>
    </tr>
  </table>
</div>`
      },
      {
        type: 'text',
        title: '実践的な改善アクションプラン',
        content: `<div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 2rem; border-radius: 1rem; color: white; margin-bottom: 2rem;">
  <h2 style="margin: 0 0 1rem 0; font-size: 2rem;">🚀 今すぐ始める家計改善30日チャレンジ</h2>
  <p style="margin: 0; font-size: 1.1rem; line-height: 1.6;">段階的に家計を改善し、持続可能な資産形成を実現します。</p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📅 第1週：現状把握フェーズ</h2>

<div style="background: #d1ecf1; border: 2px solid #17a2b8; padding: 1.5rem; border-radius: 0.5rem; margin: 2rem 0;">
  <h3 style="margin: 0 0 1rem 0; color: #0c5460;">Day 1-7のアクション</h3>
  <ul style="margin: 0; padding-left: 1.5rem; color: #0c5460;">
    <li><strong>Day 1-2</strong>：全ての銀行口座・クレジットカード明細を収集</li>
    <li><strong>Day 3-4</strong>：過去3ヶ月の支出をカテゴリ分類</li>
    <li><strong>Day 5-6</strong>：資産・負債の棚卸し実施</li>
    <li><strong>Day 7</strong>：現状の純資産とキャッシュフロー算出</li>
  </ul>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📅 第2週：分析・計画フェーズ</h2>

<div style="background: #d4edda; border: 2px solid #28a745; padding: 1.5rem; border-radius: 0.5rem; margin: 2rem 0;">
  <h3 style="margin: 0 0 1rem 0; color: #155724;">Day 8-14のアクション</h3>
  <ul style="margin: 0; padding-left: 1.5rem; color: #155724;">
    <li><strong>Day 8-9</strong>：支出の無駄を特定（サブスク、保険、通信費）</li>
    <li><strong>Day 10-11</strong>：削減可能額の試算と優先順位付け</li>
    <li><strong>Day 12-13</strong>：財務目標の設定（SMART原則）</li>
    <li><strong>Day 14</strong>：改善計画書の作成</li>
  </ul>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📅 第3週：実行フェーズ</h2>

<div style="background: #fff3cd; border: 2px solid #ffc107; padding: 1.5rem; border-radius: 0.5rem; margin: 2rem 0;">
  <h3 style="margin: 0 0 1rem 0; color: #856404;">Day 15-21のアクション</h3>
  <ul style="margin: 0; padding-left: 1.5rem; color: #856404;">
    <li><strong>Day 15-16</strong>：不要なサブスクリプション解約</li>
    <li><strong>Day 17-18</strong>：固定費の見直し交渉（保険、通信）</li>
    <li><strong>Day 19-20</strong>：自動積立の設定（先取り貯蓄）</li>
    <li><strong>Day 21</strong>：家計管理アプリの導入・設定</li>
  </ul>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📅 第4週：定着・改善フェーズ</h2>

<div style="background: #f8d7da; border: 2px solid #dc3545; padding: 1.5rem; border-radius: 0.5rem; margin: 2rem 0;">
  <h3 style="margin: 0 0 1rem 0; color: #721c24;">Day 22-30のアクション</h3>
  <ul style="margin: 0; padding-left: 1.5rem; color: #721c24;">
    <li><strong>Day 22-24</strong>：新ルーチンの実践と微調整</li>
    <li><strong>Day 25-27</strong>：週次レビューの習慣化</li>
    <li><strong>Day 28-29</strong>：月次決算の実施</li>
    <li><strong>Day 30</strong>：成果測定と次月計画策定</li>
  </ul>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🎯 期待される成果</h2>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 1rem; color: white; margin: 2rem 0;">
  <h3 style="margin: 0 0 1rem 0;">30日後の変化</h3>
  <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
    <li>月間支出の10-20%削減</li>
    <li>貯蓄率5-10%向上</li>
    <li>財務状況の完全な可視化</li>
    <li>持続可能な家計管理システムの確立</li>
    <li>投資余力の創出（月3-5万円）</li>
  </ul>
</div>`
      }
    ],
    keyPoints: [
      '個人版バランスシートとキャッシュフロー計算書の作成方法',
      '固定費・変動費の最適化による支出削減テクニック',
      'SMART原則に基づく財務目標の設定と達成戦略',
      'デジタルツールを活用した効率的な家計管理',
      '30日間の実践的改善プログラムによる成果創出'
    ],
    summary: `このレッスンでは、個人財務管理とキャッシュフロー分析の実践的な手法を学習しました。企業会計の手法を個人の家計に応用し、バランスシートとキャッシュフロー計算書を作成することで、財務状況を正確に把握できます。支出の最適化、目標設定、デジタルツールの活用により、持続可能な資産形成の基盤を構築できます。30日間の改善プログラムを実践することで、具体的な成果を得ることができるでしょう。`,
    practicalExamples: [
      '35歳会社員の家計改善事例：固定費削減で月5万円の投資余力創出',
      '子育て世帯の教育資金準備：18年間で1500万円の積立計画',
      'FIRE達成者の支出管理：生活費を手取りの50%に抑制',
      'フリーランスの収支管理：変動収入に対応する予算設計'
    ],
    warningNotes: [
      '家計改善は家族の理解と協力が不可欠です',
      '極端な節約は長続きしません。無理のない範囲で実施してください',
      '投資商品の勧誘には十分注意し、必要に応じて専門家に相談してください',
      '個人情報を扱うアプリは、セキュリティを十分確認してから利用してください'
    ]
  },

  quiz: [
    {
      id: 'financial-literacy-11-q1',
      question: '個人の純資産を計算する正しい式はどれですか？',
      options: [
        '総収入 - 総支出',
        '総資産 - 総負債',
        '流動資産 - 固定負債',
        '金融資産 - 生活費'
      ],
      correctAnswer: 1,
      explanation: '純資産は「総資産 - 総負債」で計算されます。これは個人の本当の財産を表す重要な指標です。'
    },
    {
      id: 'financial-literacy-11-q2',
      question: '健全な家計の貯蓄率の目安として適切なものはどれですか？',
      options: [
        '手取りの5%以上',
        '手取りの10%以上',
        '手取りの20%以上',
        '手取りの40%以上'
      ],
      correctAnswer: 2,
      explanation: '健全な家計では、手取りの20%以上を貯蓄に回すことが推奨されます。年代により15-30%の幅がありますが、20%は一般的な目標値です。'
    },
    {
      id: 'financial-literacy-11-q3',
      question: '固定費削減の優先順位として最も効果的なものはどれですか？',
      options: [
        '食費の節約',
        '住居費の最適化',
        '交際費の削減',
        '娯楽費のカット'
      ],
      correctAnswer: 1,
      explanation: '住居費は家計に占める割合が最も大きい固定費であり、その最適化（目標：手取りの25%以下）は家計改善に最も効果的です。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};