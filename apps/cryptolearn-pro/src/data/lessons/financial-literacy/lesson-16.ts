import type { Lesson } from '@/lib/types/learning';

export const lesson16: Lesson = {
  id: 'lesson-16',
  categoryId: 'financial-literacy',
  title: '投資詐欺の手口と対策：詐欺師の心理戦と自己防衛戦略',
  slug: 'investment-fraud-prevention',
  description: '投資詐欺の巧妙な手口と心理的操作技術を徹底解析し、実践的な防衛策と被害回復方法を学ぶ',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 45,
  orderIndex: 16,
  isPublished: true,
  tags: ['投資詐欺', 'リスク管理', '消費者保護', '金融犯罪'],
  
  content: {
    sections: [
      {
        type: 'text',
        title: '1. 投資詐欺の現状と被害の実態',
        content: `
<div style="background: linear-gradient(135deg, #ff6b6b, #ff8e53); padding: 32px; border-radius: 16px; margin: 24px 0; color: white; box-shadow: 0 8px 32px rgba(255, 107, 107, 0.3);">
  <h2 style="color: white; margin-bottom: 24px; font-size: 28px; text-align: center;">📚 投資詐欺の深刻な現実</h2>
  <p style="font-size: 18px; line-height: 1.8; margin-bottom: 20px;">
    現代の投資詐欺は、従来の手法を大きく上回る巧妙さと組織性を持っています。金融商品の複雑化、オンライン化の進展、そして心理学的操作技術の洗練により、誰もが被害者になり得る状況が生まれています。
  </p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">💔 投資詐欺被害の深刻な現状</h2>

<div style="background: linear-gradient(135deg, #f093fb, #f5576c); padding: 28px; border-radius: 12px; margin: 20px 0;">
  <h3 style="color: white; margin-bottom: 20px;">📊 被害統計の実態</h3>
  <table style="width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.95); border-radius: 8px; overflow: hidden;">
    <thead>
      <tr style="background: rgba(240,147,251,0.8);">
        <th style="padding: 15px; text-align: left; border-bottom: 2px solid white;">被害項目</th>
        <th style="padding: 15px; text-align: center; border-bottom: 2px solid white;">年間発生件数</th>
        <th style="padding: 15px; text-align: center; border-bottom: 2px solid white;">平均被害額</th>
        <th style="padding: 15px; text-align: left; border-bottom: 2px solid white;">主要被害者層</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold;">金融商品詐欺</td>
        <td style="padding: 12px; text-align: center;">約15,000件</td>
        <td style="padding: 12px; text-align: center;">320万円</td>
        <td style="padding: 12px;">60代以上（68%）</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold;">暗号資産詐欺</td>
        <td style="padding: 12px; text-align: center;">約8,500件</td>
        <td style="padding: 12px; text-align: center;">180万円</td>
        <td style="padding: 12px;">20-40代（72%）</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold;">FX自動売買詐欺</td>
        <td style="padding: 12px; text-align: center;">約12,000件</td>
        <td style="padding: 12px; text-align: center;">280万円</td>
        <td style="padding: 12px;">30-50代（65%）</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold;">未公開株詐欺</td>
        <td style="padding: 12px; text-align: center;">約3,200件</td>
        <td style="padding: 12px; text-align: center;">450万円</td>
        <td style="padding: 12px;">50代以上（78%）</td>
      </tr>
      <tr>
        <td style="padding: 12px; font-weight: bold; background: rgba(255,193,7,0.2);">総計</td>
        <td style="padding: 12px; text-align: center; background: rgba(255,193,7,0.2); font-weight: bold;">約38,700件</td>
        <td style="padding: 12px; text-align: center; background: rgba(255,193,7,0.2); font-weight: bold;">平均270万円</td>
        <td style="padding: 12px; background: rgba(255,193,7,0.2);">全年代に被害拡大</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🧠 詐欺の巧妙化と心理操作の進化</h2>

<div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 24px; border-radius: 12px; margin: 20px 0; color: white;">
  <h3 style="color: white; margin-bottom: 16px;">🎭 現代詐欺の特徴</h3>
  <ul style="list-style: none; padding-left: 0;">
    <li style="margin: 12px 0; padding: 8px 12px; background: rgba(255,255,255,0.1); border-radius: 6px; border-left: 4px solid #ffd700;">
      <strong>🎯 ターゲティング精度の向上</strong><br>
      SNS、検索履歴、購買データを活用した個人の嗜好・弱点の特定
    </li>
    <li style="margin: 12px 0; padding: 8px 12px; background: rgba(255,255,255,0.1); border-radius: 6px; border-left: 4px solid #ffd700;">
      <strong>🎪 演出の洗練化</strong><br>
      豪華なオフィス、著名人の偽証言、偽の成功事例による信頼性演出
    </li>
    <li style="margin: 12px 0; padding: 8px 12px; background: rgba(255,255,255,0.1); border-radius: 6px; border-left: 4px solid #ffd700;">
      <strong>🧬 心理学的操作の高度化</strong><br>
      行動経済学、認知バイアスを悪用した巧妙な誘導技術
    </li>
    <li style="margin: 12px 0; padding: 8px 12px; background: rgba(255,255,255,0.1); border-radius: 6px; border-left: 4px solid #ffd700;">
      <strong>🌐 国際化とデジタル化</strong><br>
      国境を越えた組織的犯罪、追跡困難なデジタル手法の採用
    </li>
  </ul>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">💸 被害の深刻な影響</h2>

<div style="background: linear-gradient(135deg, #fa709a, #fee140); padding: 20px; border-radius: 10px; margin: 16px 0;">
  <p style="margin: 0; font-weight: bold; font-size: 16px; color: #333;">
    💔 <strong>経済的被害</strong>：退職金、教育費、住宅ローン資金の喪失<br>
    😰 <strong>精神的被害</strong>：うつ病、自殺念慮、家族関係の破綻<br>
    🏚️ <strong>社会的被害</strong>：金融システムへの不信、投資意欲の減退<br>
    ⚖️ <strong>法的被害</strong>：被害回復の困難、長期にわたる法的手続き
  </p>
</div>
        `
      },
      {
        type: 'text',
        title: '2. 主要な投資詐欺手口の分析と対策',
        content: `
<div style="background: linear-gradient(135deg, #4ecdc4, #44a08d); padding: 32px; border-radius: 16px; margin: 24px 0; color: white; box-shadow: 0 8px 32px rgba(78, 205, 196, 0.3);">
  <h2 style="color: white; margin-bottom: 24px; font-size: 28px; text-align: center;">🕵️‍♂️ 詐欺手口の完全解剖</h2>
  <p style="font-size: 18px; line-height: 1.8; margin-bottom: 20px;">
    投資詐欺の手口は時代とともに進化していますが、その根底にある心理操作の原理は共通しています。各手口の特徴を理解し、適切な対策を講じることが重要です。
  </p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🎭 手口1：ポンジ・スキーム（出資金詐欺）</h2>

<div style="background: linear-gradient(135deg, #ff9a9e, #fecfef); padding: 28px; border-radius: 12px; margin: 20px 0;">
  <h3 style="color: #333; margin-bottom: 20px;">🔍 手口の詳細分析</h3>
  <table style="width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.9); border-radius: 8px; overflow: hidden;">
    <thead>
      <tr style="background: rgba(255,154,158,0.8);">
        <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 20%;">段階</th>
        <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 40%;">詐欺師の行動</th>
        <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 40%;">被害者の心理</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold; background: rgba(255,193,7,0.1);">🎣 誘引期</td>
        <td style="padding: 12px;">「絶対に儲かる」「限定募集」「高配当保証」などの魅力的な条件を提示</td>
        <td style="padding: 12px;">欲求の刺激、FOMO（見逃し不安）の醸成</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold; background: rgba(255,193,7,0.1);">💰 収穫期</td>
        <td style="padding: 12px;">初期投資者に約束された配当を実際に支払い、成功事例として宣伝</td>
        <td style="padding: 12px;">信頼の構築、追加投資への意欲向上</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold; background: rgba(255,193,7,0.1);">🌊 拡散期</td>
        <td style="padding: 12px;">紹介制度導入、セミナー開催、メディア露出による知名度向上</td>
        <td style="padding: 12px;">社会的証明効果、権威への服従</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold; background: rgba(255,193,7,0.1);">⚡ 破綻期</td>
        <td style="padding: 12px;">新規投資者の減少により配当支払い停止、資金持ち逃げ</td>
        <td style="padding: 12px;">混乱、否認、怒り、絶望</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🎯 手口2：偽の投資ファンド詐欺</h2>

<div style="background: linear-gradient(135deg, #a8edea, #fed6e3); padding: 24px; border-radius: 12px; margin: 20px 0;">
  <h3 style="color: #333; margin-bottom: 16px;">🏛️ 権威性を悪用した詐欺</h3>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
    <div style="background: rgba(255,255,255,0.8); padding: 20px; border-radius: 8px; border-left: 4px solid #28a745;">
      <h4 style="margin-top: 0; color: #28a745;">✅ 詐欺師の演出</h4>
      <ul style="margin: 0; padding-left: 20px;">
        <li>有名証券会社の元社員を装う</li>
        <li>金融庁登録番号を偽造</li>
        <li>豪華なオフィスを一時的に借用</li>
        <li>偽の運用実績データを作成</li>
        <li>著名人との写真を合成</li>
      </ul>
    </div>
    <div style="background: rgba(255,255,255,0.8); padding: 20px; border-radius: 8px; border-left: 4px solid #dc3545;">
      <h4 style="margin-top: 0; color: #dc3545;">🛡️ 見破るポイント</h4>
      <ul style="margin: 0; padding-left: 20px;">
        <li>金融庁の登録業者検索で確認</li>
        <li>運用実績の第三者による監査証明</li>
        <li>契約書面の詳細内容確認</li>
        <li>解約条件の明確性</li>
        <li>リスク説明の十分性</li>
      </ul>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">💎 手口3：暗号資産・仮想通貨詐欺</h2>

<div style="background: linear-gradient(135deg, #ffecd2, #fcb69f); padding: 24px; border-radius: 12px; margin: 20px 0;">
  <h3 style="color: #333; margin-bottom: 16px;">⚡ テクノロジーを悪用した新型詐欺</h3>
  <div style="background: rgba(255,255,255,0.9); padding: 20px; border-radius: 8px; margin: 16px 0;">
    <h4 style="color: #333; margin-bottom: 12px;">🚀 典型的なシナリオ</h4>
    <ol style="padding-left: 20px; line-height: 1.8;">
      <li><strong>SNSでの接触</strong>：恋愛感情を利用したロマンス詐欺の要素も併用</li>
      <li><strong>投資指導の申し出</strong>：「私と同じ方法で簡単に稼げる」</li>
      <li><strong>専用アプリの提供</strong>：偽の取引画面で利益が出ているように見せかける</li>
      <li><strong>追加投資の誘導</strong>：「大きなチャンスが来た」「税金対策」</li>
      <li><strong>出金拒否</strong>：「システム障害」「税金未納」等の理由で出金を阻害</li>
      <li><strong>連絡途絶</strong>：最終的にすべての連絡手段を断つ</li>
    </ol>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📊 手口4：AI・システムトレード詐欺</h2>

<div style="background: linear-gradient(135deg, #d299c2, #fef9d7); padding: 24px; border-radius: 12px; margin: 20px 0;">
  <h3 style="color: #333; margin-bottom: 16px;">🤖 最新技術を悪用した詐欺</h3>
  <table style="width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.9); border-radius: 8px; overflow: hidden;">
    <thead>
      <tr style="background: rgba(210,153,194,0.6);">
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid white;">詐欺の要素</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid white;">詐欺師の主張</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid white;">現実</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 10px; font-weight: bold;">AI技術</td>
        <td style="padding: 10px;">「最先端AIが市場を予測」</td>
        <td style="padding: 10px;">単純なランダム売買または完全な偽装</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 10px; font-weight: bold;">勝率</td>
        <td style="padding: 10px;">「勝率90%以上を実現」</td>
        <td style="padding: 10px;">バックテストの改ざんまたは虚偽データ</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 10px; font-weight: bold;">利用者数</td>
        <td style="padding: 10px;">「10万人が利用中」</td>
        <td style="padding: 10px;">架空の利用者数、偽のレビュー</td>
      </tr>
      <tr>
        <td style="padding: 10px; font-weight: bold;">保証制度</td>
        <td style="padding: 10px;">「損失は全額補償」</td>
        <td style="padding: 10px;">実際の補償は一切なし</td>
      </tr>
    </tbody>
  </table>
</div>
        `
      },
      {
        type: 'text',
        title: '3. 詐欺師の心理操作技術と防御方法',
        content: `
<div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 32px; border-radius: 16px; margin: 24px 0; color: white; box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);">
  <h2 style="color: white; margin-bottom: 24px; font-size: 28px; text-align: center;">🧠 心理戦の解剖学</h2>
  <p style="font-size: 18px; line-height: 1.8; margin-bottom: 20px;">
    詐欺師は高度な心理学的知識を悪用して、被害者の判断力を麻痺させます。これらの技術を理解することで、冷静な判断を保つことができます。
  </p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🎯 認知バイアスの悪用</h2>

<div style="background: linear-gradient(135deg, #ff9a9e, #fecfef); padding: 28px; border-radius: 12px; margin: 20px 0;">
  <h3 style="color: #333; margin-bottom: 20px;">🧬 心理操作の科学</h3>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <div style="background: rgba(255,255,255,0.9); padding: 20px; border-radius: 10px; border-left: 5px solid #e74c3c;">
      <h4 style="margin-top: 0; color: #e74c3c;">💸 損失回避バイアス</h4>
      <p style="margin: 12px 0; font-weight: bold; color: #333;">詐欺師の利用法：</p>
      <ul style="margin: 8px 0; padding-left: 20px; color: #555;">
        <li>「今投資しないと大損する」</li>
        <li>「このチャンスを逃すと後悔する」</li>
        <li>「早く決断しないと募集終了」</li>
      </ul>
      <p style="margin: 12px 0; font-weight: bold; color: #27ae60;">防御策：</p>
      <ul style="margin: 8px 0; padding-left: 20px; color: #555;">
        <li>時間をかけた慎重な検討</li>
        <li>第三者への相談</li>
        <li>リスクの客観的評価</li>
      </ul>
    </div>
    
    <div style="background: rgba(255,255,255,0.9); padding: 20px; border-radius: 10px; border-left: 5px solid #f39c12;">
      <h4 style="margin-top: 0; color: #f39c12;">🏆 権威への服従</h4>
      <p style="margin: 12px 0; font-weight: bold; color: #333;">詐欺師の利用法：</p>
      <ul style="margin: 8px 0; padding-left: 20px; color: #555;">
        <li>著名投資家の名前を騙る</li>
        <li>偽の経歴・実績を演出</li>
        <li>メディア露出の偽装</li>
      </ul>
      <p style="margin: 12px 0; font-weight: bold; color: #27ae60;">防御策：</p>
      <ul style="margin: 8px 0; padding-left: 20px; color: #555;">
        <li>経歴の事実確認</li>
        <li>資格・登録の公的検証</li>
        <li>独立した情報源の確認</li>
      </ul>
    </div>
    
    <div style="background: rgba(255,255,255,0.9); padding: 20px; border-radius: 10px; border-left: 5px solid #9b59b6;">
      <h4 style="margin-top: 0; color: #9b59b6;">👥 社会的証明</h4>
      <p style="margin: 12px 0; font-weight: bold; color: #333;">詐欺師の利用法：</p>
      <ul style="margin: 8px 0; padding-left: 20px; color: #555;">
        <li>「多くの人が参加している」</li>
        <li>偽の成功体験談</li>
        <li>サクラによる推奨</li>
      </ul>
      <p style="margin: 12px 0; font-weight: bold; color: #27ae60;">防御策：</p>
      <ul style="margin: 8px 0; padding-left: 20px; color: #555;">
        <li>証言の真偽確認</li>
        <li>独立した評価の確認</li>
        <li>集団心理への警戒</li>
      </ul>
    </div>
    
    <div style="background: rgba(255,255,255,0.9); padding: 20px; border-radius: 10px; border-left: 5px solid #1abc9c;">
      <h4 style="margin-top: 0; color: #1abc9c;">⏰ 希少性・緊急性</h4>
      <p style="margin: 12px 0; font-weight: bold; color: #333;">詐欺師の利用法：</p>
      <ul style="margin: 8px 0; padding-left: 20px; color: #555;">
        <li>「限定○○名まで」</li>
        <li>「今日中に決めないと」</li>
        <li>「特別にあなただけに」</li>
      </ul>
      <p style="margin: 12px 0; font-weight: bold; color: #27ae60;">防御策：</p>
      <ul style="margin: 8px 0; padding-left: 20px; color: #555;">
        <li>即断即決の回避</li>
        <li>冷却期間の確保</li>
        <li>真の希少性の検証</li>
      </ul>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🎭 感情操作のテクニック</h2>

<div style="background: linear-gradient(135deg, #ffd89b, #19547b); padding: 24px; border-radius: 12px; margin: 20px 0; color: white;">
  <h3 style="color: white; margin-bottom: 16px;">💔 感情を標的にした攻撃</h3>
  <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px; margin: 16px 0;">
    <h4 style="color: #ffd700; margin-bottom: 12px;">🎯 主要な感情操作パターン</h4>
    <table style="width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.9); border-radius: 8px; overflow: hidden; color: #333;">
      <thead>
        <tr style="background: rgba(255,216,155,0.8);">
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid white; width: 25%;">感情</th>
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid white; width: 35%;">操作方法</th>
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid white; width: 40%;">対抗策</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px; font-weight: bold; background: rgba(220,53,69,0.1);">😨 不安・恐怖</td>
          <td style="padding: 10px;">「年金だけでは老後が心配」「インフレで資産が目減り」</td>
          <td style="padding: 10px;">公的データによる現実的な検討、専門家との相談</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px; font-weight: bold; background: rgba(40,167,69,0.1);">💰 欲望・貪欲</td>
          <td style="padding: 10px;">「月利20%保証」「元手100万円が1年で1億円に」</td>
          <td style="padding: 10px;">現実的なリターンの理解、リスク・リターンの関係把握</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px; font-weight: bold; background: rgba(255,193,7,0.1);">😔 孤独・承認欲求</td>
          <td style="padding: 10px;">「あなただけの特別な機会」「仲間として迎え入れたい」</td>
          <td style="padding: 10px;">客観的な判断基準の確立、感情と投資判断の分離</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; background: rgba(23,162,184,0.1);">💘 恋愛感情</td>
          <td style="padding: 10px;">SNSでの長期間の関係構築、将来への甘い約束</td>
          <td style="padding: 10px;">オンライン関係の慎重な評価、金銭の絡む関係への警戒</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🛡️ 心理的防御の強化方法</h2>

<div style="background: linear-gradient(135deg, #a8edea, #fed6e3); padding: 24px; border-radius: 12px; margin: 20px 0;">
  <h3 style="color: #333; margin-bottom: 16px;">🧠 メンタル・セキュリティの構築</h3>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    <div style="background: rgba(255,255,255,0.8); padding: 20px; border-radius: 8px; border-left: 4px solid #28a745;">
      <h4 style="margin-top: 0; color: #28a745;">🔧 日常的な訓練</h4>
      <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
        <li><strong>批判的思考の練習</strong>：情報の出所確認習慣</li>
        <li><strong>感情制御の訓練</strong>：瞑想、深呼吸法の習得</li>
        <li><strong>知識の継続更新</strong>：最新の詐欺手口情報収集</li>
        <li><strong>相談ネットワーク</strong>：信頼できる相談相手の確保</li>
      </ul>
    </div>
    <div style="background: rgba(255,255,255,0.8); padding: 20px; border-radius: 8px; border-left: 4px solid #dc3545;">
      <h4 style="margin-top: 0; color: #dc3545;">⚠️ 危険サインの認識</h4>
      <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
        <li><strong>即断を迫る圧力</strong>：「今すぐ決めて」</li>
        <li><strong>詳細な説明の回避</strong>：「詳しい説明は後で」</li>
        <li><strong>証拠書類の不備</strong>：口約束による勧誘</li>
        <li><strong>連絡先の不明確性</strong>：携帯電話番号のみ</li>
      </ul>
    </div>
  </div>
</div>
        `
      },
      {
        type: 'text',
        title: '4. 実践的な詐欺対策と予防システム',
        content: `
<div style="background: linear-gradient(135deg, #43e97b, #38f9d7); padding: 32px; border-radius: 16px; margin: 24px 0; color: white; box-shadow: 0 8px 32px rgba(67, 233, 123, 0.3);">
  <h2 style="color: white; margin-bottom: 24px; font-size: 28px; text-align: center;">🛡️ 完全防御システム</h2>
  <p style="font-size: 18px; line-height: 1.8; margin-bottom: 20px;">
    投資詐欺から完全に身を守るためには、多層的な防御システムを構築し、日常的に実践することが重要です。ここでは実用的で効果的な対策を体系的に解説します。
  </p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🔍 事前調査・デューデリジェンスの完全ガイド</h2>

<div style="background: linear-gradient(135deg, #f093fb, #f5576c); padding: 28px; border-radius: 12px; margin: 20px 0; color: white;">
  <h3 style="color: white; margin-bottom: 20px;">📋 必須チェックリスト</h3>
  <div style="background: rgba(255,255,255,0.95); padding: 24px; border-radius: 8px; margin: 16px 0; color: #333;">
    <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 6px; overflow: hidden;">
      <thead>
        <tr style="background: linear-gradient(135deg, #f093fb, #f5576c); color: white;">
          <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 25%;">確認項目</th>
          <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 35%;">調査方法</th>
          <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 25%;">確認先</th>
          <th style="padding: 15px; text-align: center; border-bottom: 2px solid white; width: 15%;">重要度</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; font-weight: bold;">🏛️ 業者登録</td>
          <td style="padding: 12px;">金融商品取引業登録番号の確認</td>
          <td style="padding: 12px;">金融庁ウェブサイト</td>
          <td style="padding: 12px; text-align: center; background: rgba(220,53,69,0.1); font-weight: bold;">必須</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; font-weight: bold;">📞 連絡先</td>
          <td style="padding: 12px;">固定電話、住所の実在性確認</td>
          <td style="padding: 12px;">NTT番号案内、Google Maps</td>
          <td style="padding: 12px; text-align: center; background: rgba(220,53,69,0.1); font-weight: bold;">必須</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; font-weight: bold;">👤 代表者</td>
          <td style="padding: 12px;">役員名、経歴の事実確認</td>
          <td style="padding: 12px;">帝国データバンク、官報</td>
          <td style="padding: 12px; text-align: center; background: rgba(255,193,7,0.2); font-weight: bold;">重要</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; font-weight: bold;">📊 運用実績</td>
          <td style="padding: 12px;">第三者による監査報告書確認</td>
          <td style="padding: 12px;">監査法人、信託銀行</td>
          <td style="padding: 12px; text-align: center; background: rgba(255,193,7,0.2); font-weight: bold;">重要</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; font-weight: bold;">💰 分別管理</td>
          <td style="padding: 12px;">顧客資産の分別管理体制確認</td>
          <td style="padding: 12px;">金融庁届出書類</td>
          <td style="padding: 12px; text-align: center; background: rgba(255,193,7,0.2); font-weight: bold;">重要</td>
        </tr>
        <tr>
          <td style="padding: 12px; font-weight: bold;">🏆 評判調査</td>
          <td style="padding: 12px;">インターネット上の評判・口コミ確認</td>
          <td style="padding: 12px;">複数の情報源</td>
          <td style="padding: 12px; text-align: center; background: rgba(40,167,69,0.2); font-weight: bold;">推奨</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📞 相談・通報システムの活用</h2>

<div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 24px; border-radius: 12px; margin: 20px 0; color: white;">
  <h3 style="color: white; margin-bottom: 16px;">🆘 緊急時対応ネットワーク</h3>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px;">
      <h4 style="color: #ffd700; margin-bottom: 12px;">🚨 官公庁相談窓口</h4>
      <ul style="list-style: none; padding-left: 0; margin: 0;">
        <li style="margin: 8px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>消費者ホットライン</strong><br>
          <span style="font-size: 18px; color: #ffd700;">📞 188（いやや）</span>
        </li>
        <li style="margin: 8px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>金融サービス利用者相談室</strong><br>
          <span style="font-size: 16px;">平日 10:00-17:00</span>
        </li>
        <li style="margin: 8px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>証券・金融商品あっせん相談センター</strong><br>
          <span style="font-size: 16px;">📞 0120-64-5005</span>
        </li>
      </ul>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px;">
      <h4 style="color: #ffd700; margin-bottom: 12px;">👥 民間サポート</h4>
      <ul style="list-style: none; padding-left: 0; margin: 0;">
        <li style="margin: 8px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>日本投資者保護基金</strong><br>
          <span style="font-size: 16px;">証券会社破綻時の保護</span>
        </li>
        <li style="margin: 8px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>弁護士会法律相談</strong><br>
          <span style="font-size: 16px;">法的アドバイス</span>
        </li>
        <li style="margin: 8px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>投資詐欺被害者の会</strong><br>
          <span style="font-size: 16px;">被害者同士の情報共有</span>
        </li>
      </ul>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🔐 デジタル・セキュリティ対策</h2>

<div style="background: linear-gradient(135deg, #ffecd2, #fcb69f); padding: 24px; border-radius: 12px; margin: 20px 0;">
  <h3 style="color: #333; margin-bottom: 16px;">💻 オンライン詐欺への対策</h3>
  <div style="background: rgba(255,255,255,0.9); padding: 20px; border-radius: 8px; margin: 16px 0;">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
      <div style="border-left: 4px solid #e74c3c; padding-left: 16px;">
        <h4 style="margin-top: 0; color: #e74c3c;">⚠️ 危険な兆候</h4>
        <ul style="margin: 8px 0; padding-left: 20px; color: #555;">
          <li>SSL証明書のない投資サイト</li>
          <li>異常に高いリターンの約束</li>
          <li>急がせる投資プラットフォーム</li>
          <li>身元不明のSNSからの投資勧誘</li>
          <li>出金制限の多い取引所</li>
        </ul>
      </div>
      <div style="border-left: 4px solid #27ae60; padding-left: 16px;">
        <h4 style="margin-top: 0; color: #27ae60;">✅ 安全対策</h4>
        <ul style="margin: 8px 0; padding-left: 20px; color: #555;">
          <li>二要素認証の必須設定</li>
          <li>強固なパスワードの使用</li>
          <li>公式サイトURLの直接入力</li>
          <li>定期的なアカウント確認</li>
          <li>疑わしいリンクの回避</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📋 投資契約書の徹底チェック</h2>

<div style="background: linear-gradient(135deg, #a8edea, #fed6e3); padding: 24px; border-radius: 12px; margin: 20px 0;">
  <h3 style="color: #333; margin-bottom: 16px;">📄 契約書面の重要ポイント</h3>
  <table style="width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.9); border-radius: 8px; overflow: hidden;">
    <thead>
      <tr style="background: rgba(168,237,234,0.8);">
        <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 25%;">確認項目</th>
        <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 35%;">チェックポイント</th>
        <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 40%;">注意すべき記載</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold;">📊 運用方針</td>
        <td style="padding: 12px;">投資対象・手法の明確性</td>
        <td style="padding: 12px; color: #e74c3c;">「裁量取引」「秘密の手法」等の曖昧な表現</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold;">💰 手数料</td>
        <td style="padding: 12px;">全ての手数料の明示</td>
        <td style="padding: 12px; color: #e74c3c;">「成功報酬のみ」「手数料無料」等</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold;">🔄 解約条件</td>
        <td style="padding: 12px;">解約方法・期間の明確性</td>
        <td style="padding: 12px; color: #e74c3c;">「1年間解約不可」「元本割れ時解約不可」等</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold;">⚖️ 責任の所在</td>
        <td style="padding: 12px;">損失時の責任分担</td>
        <td style="padding: 12px; color: #e74c3c;">「一切の責任を負わない」等の免責条項</td>
      </tr>
      <tr>
        <td style="padding: 12px; font-weight: bold;">🏛️ 紛争解決</td>
        <td style="padding: 12px;">裁判管轄・仲裁機関</td>
        <td style="padding: 12px; color: #e74c3c;">海外の裁判所のみ、不明確な仲裁機関</td>
      </tr>
    </tbody>
  </table>
</div>
        `
      },
      {
        type: 'text',
        title: '5. 被害発生時の緊急対応と回復戦略',
        content: `
<div style="background: linear-gradient(135deg, #ff6b6b, #feca57); padding: 32px; border-radius: 16px; margin: 24px 0; color: white; box-shadow: 0 8px 32px rgba(255, 107, 107, 0.3);">
  <h2 style="color: white; margin-bottom: 24px; font-size: 28px; text-align: center;">🚨 緊急対応マニュアル</h2>
  <p style="font-size: 18px; line-height: 1.8; margin-bottom: 20px;">
    万一、投資詐欺の被害に遭った場合、迅速で適切な対応が被害回復の可能性を高めます。時間が経つほど回復が困難になるため、段階的な緊急対応が重要です。
  </p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">⏰ 初動72時間の緊急対応</h2>

<div style="background: linear-gradient(135deg, #ff9a9e, #fecfef); padding: 28px; border-radius: 12px; margin: 20px 0;">
  <h3 style="color: #333; margin-bottom: 20px;">🏃‍♂️ 黄金の72時間対応</h3>
  <div style="background: rgba(255,255,255,0.95); padding: 24px; border-radius: 8px; margin: 16px 0;">
    <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 6px; overflow: hidden;">
      <thead>
        <tr style="background: linear-gradient(135deg, #ff9a9e, #fecfef); color: white;">
          <th style="padding: 15px; text-align: center; border-bottom: 2px solid white; width: 15%;">時間</th>
          <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 35%;">対応内容</th>
          <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 30%;">連絡先・手続き</th>
          <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 20%;">準備書類</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #eee; background: rgba(220,53,69,0.1);">
          <td style="padding: 12px; text-align: center; font-weight: bold;">即座</td>
          <td style="padding: 12px;">
            <strong>🛑 追加被害の防止</strong><br>
            • 振込・送金の即座停止<br>
            • パスワード・暗証番号変更<br>
            • 詐欺師との連絡遮断
          </td>
          <td style="padding: 12px;">
            • 金融機関への緊急連絡<br>
            • アカウント凍結依頼<br>
            • 通信手段のブロック
          </td>
          <td style="padding: 12px;">
            • 通帳・カード<br>
            • 振込明細<br>
            • 連絡履歴
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #eee; background: rgba(255,193,7,0.1);">
          <td style="padding: 12px; text-align: center; font-weight: bold;">6時間以内</td>
          <td style="padding: 12px;">
            <strong>📞 公的機関への通報</strong><br>
            • 消費生活センターへの相談<br>
            • 警察への被害届提出<br>
            • 金融庁への情報提供
          </td>
          <td style="padding: 12px;">
            • 消費者ホットライン 188<br>
            • 最寄り警察署<br>
            • 金融サービス利用者相談室
          </td>
          <td style="padding: 12px;">
            • 被害状況メモ<br>
            • 契約書類<br>
            • 振込記録
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #eee; background: rgba(40,167,69,0.1);">
          <td style="padding: 12px; text-align: center; font-weight: bold;">24時間以内</td>
          <td style="padding: 12px;">
            <strong>📋 証拠保全・記録作成</strong><br>
            • 全ての通信記録保存<br>
            • 取引履歴の印刷・保存<br>
            • 時系列での被害記録作成
          </td>
          <td style="padding: 12px;">
            • スクリーンショット<br>
            • メール・SNS保存<br>
            • 録音・録画データ整理
          </td>
          <td style="padding: 12px;">
            • デジタル証拠<br>
            • 紙面資料<br>
            • 被害報告書
          </td>
        </tr>
        <tr style="background: rgba(23,162,184,0.1);">
          <td style="padding: 12px; text-align: center; font-weight: bold;">72時間以内</td>
          <td style="padding: 12px;">
            <strong>⚖️ 法的対応の準備</strong><br>
            • 弁護士との初回相談<br>
            • 民事・刑事手続きの検討<br>
            • 被害者の会への参加検討
          </td>
          <td style="padding: 12px;">
            • 弁護士会法律相談<br>
            • 法テラス<br>
            • 被害者支援団体
          </td>
          <td style="padding: 12px;">
            • 全証拠資料<br>
            • 被害届受理証明<br>
            • 相談記録
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">💰 資金回復の戦略と可能性</h2>

<div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 24px; border-radius: 12px; margin: 20px 0; color: white;">
  <h3 style="color: white; margin-bottom: 16px;">💡 回復手段の多角的検討</h3>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px;">
      <h4 style="color: #ffd700; margin-bottom: 12px;">🏦 金融機関経由の回復</h4>
      <ul style="list-style: none; padding-left: 0; margin: 0; line-height: 1.8;">
        <li style="margin: 8px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>✅ 振込組戻し</strong><br>
          <span style="font-size: 14px;">即日対応で高確率回復</span>
        </li>
        <li style="margin: 8px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>🔒 口座凍結申請</strong><br>
          <span style="font-size: 14px;">詐欺口座の資金保全</span>
        </li>
        <li style="margin: 8px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>💳 チャージバック</strong><br>
          <span style="font-size: 14px;">クレジットカード経由の場合</span>
        </li>
      </ul>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px;">
      <h4 style="color: #ffd700; margin-bottom: 12px;">⚖️ 法的手続きによる回復</h4>
      <ul style="list-style: none; padding-left: 0; margin: 0; line-height: 1.8;">
        <li style="margin: 8px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>🏛️ 民事訴訟</strong><br>
          <span style="font-size: 14px;">損害賠償請求</span>
        </li>
        <li style="margin: 8px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>🚔 刑事告発</strong><br>
          <span style="font-size: 14px;">被害回復給付金制度</span>
        </li>
        <li style="margin: 8px 0; padding: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <strong>🤝 集団訴訟</strong><br>
          <span style="font-size: 14px;">被害者の会による共同対応</span>
        </li>
      </ul>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📊 回復可能性の現実的評価</h2>

<div style="background: linear-gradient(135deg, #ffecd2, #fcb69f); padding: 24px; border-radius: 12px; margin: 20px 0;">
  <h3 style="color: #333; margin-bottom: 16px;">📈 回復率の実態データ</h3>
  <table style="width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.9); border-radius: 8px; overflow: hidden;">
    <thead>
      <tr style="background: rgba(255,236,210,0.8);">
        <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 25%;">回復手段</th>
        <th style="padding: 15px; text-align: center; border-bottom: 2px solid white; width: 20%;">回復率</th>
        <th style="padding: 15px; text-align: center; border-bottom: 2px solid white; width: 20%;">所要期間</th>
        <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 35%;">成功条件</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold;">🏃‍♂️ 即日対応</td>
        <td style="padding: 12px; text-align: center; background: rgba(40,167,69,0.2); font-weight: bold;">85-95%</td>
        <td style="padding: 12px; text-align: center;">24時間以内</td>
        <td style="padding: 12px;">振込直後の組戻し、詐欺発覚の即座対応</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold;">🏦 金融機関協力</td>
        <td style="padding: 12px; text-align: center; background: rgba(255,193,7,0.2); font-weight: bold;">40-60%</td>
        <td style="padding: 12px; text-align: center;">1-3ヶ月</td>
        <td style="padding: 12px;">口座凍結成功、詐欺グループ特定</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold;">⚖️ 法的手続き</td>
        <td style="padding: 12px; text-align: center; background: rgba(255,193,7,0.3); font-weight: bold;">15-30%</td>
        <td style="padding: 12px; text-align: center;">6ヶ月-2年</td>
        <td style="padding: 12px;">詐欺師の資産確保、居所特定</td>
      </tr>
      <tr>
        <td style="padding: 12px; font-weight: bold;">🤝 集団訴訟</td>
        <td style="padding: 12px; text-align: center; background: rgba(220,53,69,0.2); font-weight: bold;">5-15%</td>
        <td style="padding: 12px; text-align: center;">1-5年</td>
        <td style="padding: 12px;">大規模詐欺、多数の被害者参加</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">💡 二次被害の防止</h2>

<div style="background: linear-gradient(135deg, #a8edea, #fed6e3); padding: 24px; border-radius: 12px; margin: 20px 0;">
  <h3 style="color: #333; margin-bottom: 16px;">🔄 詐欺の連鎖を断つ</h3>
  <div style="background: rgba(255,255,255,0.9); padding: 20px; border-radius: 8px; margin: 16px 0;">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
      <div style="border-left: 4px solid #e74c3c; padding-left: 16px;">
        <h4 style="margin-top: 0; color: #e74c3c;">⚠️ 二次被害パターン</h4>
        <ul style="margin: 8px 0; padding-left: 20px; color: #555; line-height: 1.6;">
          <li><strong>回復詐欺</strong>：「被害金を取り戻せる」との新たな詐欺</li>
          <li><strong>名簿売却</strong>：個人情報の悪用による追加勧誘</li>
          <li><strong>示談詐欺</strong>：偽の和解提案による追加金銭要求</li>
          <li><strong>調査費詐欺</strong>：「調査費用」名目での金銭要求</li>
        </ul>
      </div>
      <div style="border-left: 4px solid #27ae60; padding-left: 16px;">
        <h4 style="margin-top: 0; color: #27ae60;">✅ 防止対策</h4>
        <ul style="margin: 8px 0; padding-left: 20px; color: #555; line-height: 1.6;">
          <li><strong>公的機関経由</strong>：必ず公的機関を通した相談</li>
          <li><strong>費用前払い拒否</strong>：成功報酬以外の前払い拒否</li>
          <li><strong>身元確認徹底</strong>：弁護士資格等の公的確認</li>
          <li><strong>複数意見聴取</strong>：複数の専門家による意見確認</li>
        </ul>
      </div>
    </div>
  </div>
</div>
        `
      },
      {
        type: 'text',
        title: '6. 継続的な防御力強化と社会的対策',
        content: `
<div style="background: linear-gradient(135deg, #6a11cb, #2575fc); padding: 32px; border-radius: 16px; margin: 24px 0; color: white; box-shadow: 0 8px 32px rgba(106, 17, 203, 0.3);">
  <h2 style="color: white; margin-bottom: 24px; font-size: 28px; text-align: center;">🛡️ 長期防御戦略</h2>
  <p style="font-size: 18px; line-height: 1.8; margin-bottom: 20px;">
    投資詐欺に対する防御は一時的な対策では不十分です。継続的な学習と社会全体での取り組みにより、詐欺被害を根本から減らすことが重要です。
  </p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📚 継続的な金融リテラシー向上</h2>

<div style="background: linear-gradient(135deg, #f093fb, #f5576c); padding: 28px; border-radius: 12px; margin: 20px 0; color: white;">
  <h3 style="color: white; margin-bottom: 20px;">🎓 体系的な学習プログラム</h3>
  <div style="background: rgba(255,255,255,0.95); padding: 24px; border-radius: 8px; margin: 16px 0; color: #333;">
    <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 6px; overflow: hidden;">
      <thead>
        <tr style="background: linear-gradient(135deg, #f093fb, #f5576c); color: white;">
          <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 20%;">学習領域</th>
          <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 30%;">重要スキル</th>
          <th style="padding: 15px; text-align: left; border-bottom: 2px solid white; width: 25%;">学習方法</th>
          <th style="padding: 15px; text-align: center; border-bottom: 2px solid white; width: 25%;">更新頻度</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; font-weight: bold;">📊 投資基礎知識</td>
          <td style="padding: 12px;">
            • リスク・リターンの関係理解<br>
            • 分散投資の原則<br>
            • 適正なリターン水準の把握
          </td>
          <td style="padding: 12px;">
            • 金融庁の投資教育資料<br>
            • 証券会社の投資セミナー<br>
            • 大学の公開講座
          </td>
          <td style="padding: 12px; text-align: center; background: rgba(40,167,69,0.1);">年2回</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; font-weight: bold;">🕵️ 詐欺手口分析</td>
          <td style="padding: 12px;">
            • 最新詐欺事例の把握<br>
            • 心理操作技術の理解<br>
            • 危険サインの早期発見
          </td>
          <td style="padding: 12px;">
            • 消費者庁の注意喚起情報<br>
            • 被害者の会の情報共有<br>
            • 専門書籍・学術論文
          </td>
          <td style="padding: 12px; text-align: center; background: rgba(255,193,7,0.2);">月1回</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; font-weight: bold;">⚖️ 法的知識</td>
          <td style="padding: 12px;">
            • 投資関連法令の基礎<br>
            • 契約書の読み方<br>
            • 被害時の対処法
          </td>
          <td style="padding: 12px;">
            • 弁護士会の法律講座<br>
            • 法テラスの無料相談<br>
            • 法務省の普及啓発資料
          </td>
          <td style="padding: 12px; text-align: center; background: rgba(23,162,184,0.1);">半年1回</td>
        </tr>
        <tr>
          <td style="padding: 12px; font-weight: bold;">💻 デジタル・リテラシー</td>
          <td style="padding: 12px;">
            • セキュリティ対策<br>
            • 偽サイトの見分け方<br>
            • SNS詐欺の識別
          </td>
          <td style="padding: 12px;">
            • サイバーセキュリティ機関<br>
            • 警察のサイバー犯罪対策<br>
            • IT企業の啓発活動
          </td>
          <td style="padding: 12px; text-align: center; background: rgba(220,53,69,0.1);">月1回</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🤝 社会全体での対策強化</h2>

<div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 24px; border-radius: 12px; margin: 20px 0; color: white;">
  <h3 style="color: white; margin-bottom: 16px;">🏛️ 制度改革と社会的取り組み</h3>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px;">
      <h4 style="color: #ffd700; margin-bottom: 12px;">🏛️ 規制・法制度の強化</h4>
      <ul style="list-style: none; padding-left: 0; margin: 0; line-height: 1.8;">
        <li style="margin: 8px 0; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; border-left: 3px solid #ffd700;">
          <strong>💼 業者規制の厳格化</strong><br>
          <span style="font-size: 14px;">登録要件の強化、監督体制の充実</span>
        </li>
        <li style="margin: 8px 0; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; border-left: 3px solid #ffd700;">
          <strong>⚖️ 刑事罰の重罰化</strong><br>
          <span style="font-size: 14px;">詐欺罪の法定刑引き上げ、組織犯罪対策</span>
        </li>
        <li style="margin: 8px 0; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; border-left: 3px solid #ffd700;">
          <strong>🏦 金融機関の責任強化</strong><br>
          <span style="font-size: 14px;">不審取引の監視強化、顧客保護義務</span>
        </li>
        <li style="margin: 8px 0; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; border-left: 3px solid #ffd700;">
          <strong>🌐 国際協力の推進</strong><br>
          <span style="font-size: 14px;">国境を越えた詐欺への共同対処</span>
        </li>
      </ul>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px;">
      <h4 style="color: #ffd700; margin-bottom: 12px;">👥 民間セクターの取り組み</h4>
      <ul style="list-style: none; padding-left: 0; margin: 0; line-height: 1.8;">
        <li style="margin: 8px 0; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; border-left: 3px solid #ffd700;">
          <strong>🤖 AI技術の活用</strong><br>
          <span style="font-size: 14px;">詐欺パターンの自動検知、リアルタイム警告</span>
        </li>
        <li style="margin: 8px 0; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; border-left: 3px solid #ffd700;">
          <strong>📺 メディア啓発の強化</strong><br>
          <span style="font-size: 14px;">継続的な注意喚起、事例紹介</span>
        </li>
        <li style="margin: 8px 0; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; border-left: 3px solid #ffd700;">
          <strong>🎓 教育機関での導入</strong><br>
          <span style="font-size: 14px;">学校教育における金融詐欺対策教育</span>
        </li>
        <li style="margin: 8px 0; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; border-left: 3px solid #ffd700;">
          <strong>👴 高齢者支援の充実</strong><br>
          <span style="font-size: 14px;">地域コミュニティでの見守り体制</span>
        </li>
      </ul>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🔄 個人的な防御システムの構築</h2>

<div style="background: linear-gradient(135deg, #ffecd2, #fcb69f); padding: 24px; border-radius: 12px; margin: 20px 0;">
  <h3 style="color: #333; margin-bottom: 16px;">🏠 パーソナル・セキュリティ体制</h3>
  <div style="background: rgba(255,255,255,0.9); padding: 20px; border-radius: 8px; margin: 16px 0;">
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
      <div style="background: linear-gradient(135deg, #ff9a9e, #fecfef); padding: 16px; border-radius: 8px; color: white;">
        <h4 style="margin-top: 0; margin-bottom: 12px; text-align: center;">🛡️ 日常防御</h4>
        <ul style="list-style: none; padding-left: 0; margin: 0; font-size: 14px;">
          <li style="margin: 6px 0;">✅ 投資判断の24時間ルール</li>
          <li style="margin: 6px 0;">✅ 信頼できる相談者の確保</li>
          <li style="margin: 6px 0;">✅ 定期的な詐欺情報の確認</li>
          <li style="margin: 6px 0;">✅ 感情的判断の回避訓練</li>
        </ul>
      </div>
      <div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 16px; border-radius: 8px; color: white;">
        <h4 style="margin-top: 0; margin-bottom: 12px; text-align: center;">📋 月次点検</h4>
        <ul style="list-style: none; padding-left: 0; margin: 0; font-size: 14px;">
          <li style="margin: 6px 0;">📊 投資ポートフォリオ確認</li>
          <li style="margin: 6px 0;">🔍 取引記録の精査</li>
          <li style="margin: 6px 0;">📞 怪しい連絡の有無確認</li>
          <li style="margin: 6px 0;">🧠 詐欺対策知識の更新</li>
        </ul>
      </div>
      <div style="background: linear-gradient(135deg, #a8edea, #fed6e3); padding: 16px; border-radius: 8px; color: #333;">
        <h4 style="margin-top: 0; margin-bottom: 12px; text-align: center;">🔄 年次見直し</h4>
        <ul style="list-style: none; padding-left: 0; margin: 0; font-size: 14px;">
          <li style="margin: 6px 0;">📈 投資方針の再検討</li>
          <li style="margin: 6px 0;">🎓 金融知識の体系的学習</li>
          <li style="margin: 6px 0;">👥 相談ネットワークの拡充</li>
          <li style="margin: 6px 0;">⚖️ 法制度変更の把握</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🌟 詐欺のない投資環境への貢献</h2>

<div style="background: linear-gradient(135deg, #43e97b, #38f9d7); padding: 24px; border-radius: 12px; margin: 20px 0; color: white;">
  <h3 style="color: white; margin-bottom: 16px;">🤝 社会貢献としての詐欺対策</h3>
  <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px; margin: 16px 0;">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
      <div>
        <h4 style="color: #ffd700; margin-bottom: 12px;">📢 情報共有活動</h4>
        <ul style="list-style: none; padding-left: 0; margin: 0; line-height: 1.6;">
          <li style="margin: 6px 0; padding: 4px 8px; background: rgba(255,255,255,0.1); border-radius: 4px;">
            • 怪しい勧誘情報の通報
          </li>
          <li style="margin: 6px 0; padding: 4px 8px; background: rgba(255,255,255,0.1); border-radius: 4px;">
            • SNSでの注意喚起投稿
          </li>
          <li style="margin: 6px 0; padding: 4px 8px; background: rgba(255,255,255,0.1); border-radius: 4px;">
            • 家族・友人への情報共有
          </li>
          <li style="margin: 6px 0; padding: 4px 8px; background: rgba(255,255,255,0.1); border-radius: 4px;">
            • 地域コミュニティでの啓発
          </li>
        </ul>
      </div>
      <div>
        <h4 style="color: #ffd700; margin-bottom: 12px;">🛡️ 弱者保護活動</h4>
        <ul style="list-style: none; padding-left: 0; margin: 0; line-height: 1.6;">
          <li style="margin: 6px 0; padding: 4px 8px; background: rgba(255,255,255,0.1); border-radius: 4px;">
            • 高齢者への注意喚起
          </li>
          <li style="margin: 6px 0; padding: 4px 8px; background: rgba(255,255,255,0.1); border-radius: 4px;">
            • 投資初心者へのサポート
          </li>
          <li style="margin: 6px 0; padding: 4px 8px; background: rgba(255,255,255,0.1); border-radius: 4px;">
            • 被害者への心理的支援
          </li>
          <li style="margin: 6px 0; padding: 4px 8px; background: rgba(255,255,255,0.1); border-radius: 4px;">
            • 正しい投資教育の普及
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div style="background: linear-gradient(135deg, #ff6b6b, #feca57); padding: 20px; border-radius: 10px; margin: 20px 0; color: white; text-align: center;">
  <h3 style="margin-bottom: 16px;">🎯 最終メッセージ</h3>
  <p style="font-size: 16px; line-height: 1.8; margin-bottom: 16px; font-weight: bold;">
    「投資詐欺の根絶は一人の力では不可能ですが、一人ひとりの意識と行動が積み重なることで、
    詐欺師が活動しにくい健全な投資環境を作り上げることができます。」
  </p>
  <div style="background: rgba(255,255,255,0.2); padding: 12px; border-radius: 6px; margin-top: 16px;">
    <p style="margin: 0; font-size: 14px;">
      💡 <strong>賢明な投資家になることは、自分を守るだけでなく、社会全体を詐欺から守ることにつながります。</strong>
    </p>
  </div>
</div>
        `
      }
    ],
    keyPoints: [
      '投資詐欺被害は年間約38,700件、平均被害額270万円の深刻な社会問題',
      '詐欺師は認知バイアスと感情操作を悪用した高度な心理戦術を使用',
      'ポンジ・スキーム、偽ファンド、暗号資産、AI詐欺などの主要手口を理解',
      '事前調査（業者登録確認、連絡先確認、評判調査）が最も効果的な対策',
      '被害発生時は72時間以内の緊急対応で回復可能性を大幅に向上',
      '継続的な金融リテラシー向上と社会全体での対策強化が根本解決の鍵'
    ],
    summary: '投資詐欺は年々巧妙化し、誰もが被害者になり得る深刻な問題となっています。詐欺師は高度な心理操作技術を使い、認知バイアスや感情を悪用して被害者を騙します。効果的な対策には、事前の徹底した調査、心理的防御の強化、被害発生時の迅速な対応、そして継続的な学習が重要です。個人の防御力向上と社会全体での取り組みにより、詐欺のない健全な投資環境の実現を目指すべきです。',
    practicalExamples: [
      '金融庁登録業者検索システムでの業者確認手順',
      '契約書の重要項目チェックリストの活用方法',
      '消費者ホットライン188番への効果的な相談方法',
      '振込組戻し手続きの具体的な進め方',
      '被害者の会参加による情報共有と共同対応',
      '家族・友人への詐欺防止情報の効果的な伝達方法'
    ],
    warningNotes: [
      '「絶対に儲かる」「元本保証」などの甘い言葉に騙されない',
      '即断即決を迫る投資話は詐欺の可能性が極めて高い',
      '有名人の名前や権威性を悪用した詐欺に十分注意する',
      '一度被害に遭うと二次詐欺のターゲットになりやすい',
      '家族や信頼できる第三者への相談を必ず行う',
      '被害回復には時間と費用がかかり、完全回復は困難な場合が多い'
    ]
  },

  quiz: [
    {
      id: 'financial-literacy-16-q1',
      question: '投資詐欺の被害を防ぐために最も効果的な事前対策は何ですか？',
      options: [
        '高額な投資に限って注意する',
        '金融庁の登録業者検索で業者の実在と正当性を確認する',
        '有名な投資話にのみ参加する',
        '知人の紹介であれば安心して投資する'
      ],
      correctAnswer: 1,
      explanation: '金融庁の登録業者検索システムで業者の登録状況を確認することが最も基本的で効果的な対策です。無登録業者による投資勧誘は違法行為であり、詐欺の可能性が極めて高いためです。'
    },
    {
      id: 'financial-literacy-16-q2',
      question: 'ポンジ・スキームの特徴として正しいものはどれですか？',
      options: [
        '新規投資者の資金で既存投資者に配当を支払う自転車操業',
        '株式や債券への正当な投資による配当',
        '銀行預金の利息を原資とした配当',
        '政府保証による元本と利息の保護'
      ],
      correctAnswer: 0,
      explanation: 'ポンジ・スキームは新規投資者の資金を既存投資者への配当に流用する典型的な出資詐欺です。実際の投資や事業による利益ではなく、新規資金への依存により破綻は必然的です。'
    },
    {
      id: 'financial-literacy-16-q3',
      question: '投資詐欺師が悪用する心理操作技術はどれですか？',
      options: [
        '論理的な投資分析の提示',
        '損失回避バイアスや権威への服従の悪用',
        '公正な契約条件の提示',
        '十分な検討時間の提供'
      ],
      correctAnswer: 1,
      explanation: '詐欺師は「今投資しないと大損する」（損失回避バイアス）や著名投資家の名前を騙る（権威への服従）など、心理学的な弱点を巧妙に悪用して判断力を麻痺させます。'
    },
    {
      id: 'financial-literacy-16-q4',
      question: '投資詐欺の被害に遭った場合、最優先すべき初期対応は何ですか？',
      options: [
        '弁護士への相談',
        '追加被害防止のための振込停止・口座凍結',
        '詐欺師との交渉',
        '被害者の会への参加'
      ],
      correctAnswer: 1,
      explanation: '被害発覚直後の72時間は「黄金の72時間」と呼ばれ、追加被害の防止と資金回復の可能性を高めるため、即座に振込停止や口座凍結などの緊急措置を取ることが最優先です。'
    },
    {
      id: 'financial-literacy-16-q5',
      question: '投資詐欺の二次被害を防ぐために注意すべきことは何ですか？',
      options: [
        '「被害金を取り戻せる」という新たな業者の話を安易に信じる',
        'すべての回復提案を公的機関を通して確認する',
        '調査費用を前払いして専門家に依頼する',
        '示談提案があれば迅速に応じる'
      ],
      correctAnswer: 1,
      explanation: '詐欺被害者は「回復詐欺」のターゲットになりやすく、「被害金を取り戻せる」という新たな詐欺に巻き込まれることがあります。すべての回復提案は公的機関を通して確認することが重要です。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};