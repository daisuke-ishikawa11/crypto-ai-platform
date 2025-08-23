import type { Lesson } from '@/types';

export const lesson5: Lesson = {
  id: 'risk-management-mental-health-trading',
  categoryId: 'risk-management',
  title: 'メンタルヘルスとトレーディング：投資による心理的影響と対策',
  slug: 'mental-health-trading',
  description: '投資・トレーディングが精神的健康に与える影響を理解し、健全な投資ライフスタイルを維持するための実践的対策を学びます',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 30,
  orderIndex: 5,
  content: {
    sections: [
      {
        id: 'section-1',
        title: '投資が精神的健康に与える影響',
        orderIndex: 1,
        type: 'text',
        content: `<strong>投資・トレーディング</strong>は経済的な側面だけでなく、精神的健康に大きな影響を与えます。特に暗号通貨のような変動性の高い資産では、心理的ストレスが深刻化しやすい傾向があります。
<h3>投資による一般的な心理的影響</h3>
<strong>1. ストレス関連症状</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>睡眠障害・不眠症</li>
<li>慢性的な不安感</li>
<li>食欲不振・過食</li>
<li>頭痛・肩こり等の身体症状</li>
</ul>
<strong>2. 感情的不安定性</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>価格変動による気分の激しい変化</li>
<li>イライラ・怒りっぽさの増加</li>
<li>抑うつ的気分</li>
<li>集中力・判断力の低下</li>
</ul>
<strong>3. 社会的関係への影響</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>家族・友人との関係悪化</li>
<li>投資以外の話題への関心低下</li>
<li>社交活動からの撤退</li>
<li>職場でのパフォーマンス低下</li>
</ul>
<strong>4. 依存性・強迫性行動</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>価格チェックの強迫的反復</li>
<li>取引への過度な没頭</li>
<li>ギャンブル的行動の増加</li>
<li>現実逃避としての投資行動</li>
</ul>
<h3>リスク要因の識別</h3>
<strong>高リスク投資家の特徴</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>投資資金が生活に必要な資金</li>
<li>レバレッジを多用する</li>
<li>短期的な価格変動に過度に反応</li>
<li>投資以外の収入源が不安定</li>
<li>社会的支援システムが薄い</li>
</ul>`
      },
      
      {
        type: 'text',
        title: '暗号通貨投資特有の心理的挑戦',
        content: `<h3>暗号通貨市場の特殊性</h3>
<strong>1. 極端な価格変動性</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>1日で資産価値が半減する可能性</li>
<li>「一夜で富豪」と「破産」の両極端</li>
<li>感情のジェットコースター状態</li>
</ul>
<strong>2. 24時間365日の市場</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>休息時間の欠如</li>
<li>価格確認の強迫的行動</li>
<li>睡眠サイクルの乱れ</li>
</ul>
<strong>3. FOMO(見逃すことへの恐れ)文化</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>SNS上の成功談による焦燥感</li>
<li>「次のビットコイン」探しの強迫観念</li>
<li>群集心理による非合理的行動</li>
</ul>
<strong>4. 技術的複雑性によるストレス</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>ウォレット管理の不安</li>
<li>セキュリティ対策への過度な心配</li>
<li>技術的知識不足による恐怖</li>
</ul>
<strong>5. 規制不確実性</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>突然の規制変更への不安</li>
<li>資産の法的地位に関する心配</li>
<li>将来の資産価値への懸念</li>
</ul>
<h3>典型的な心理的症状パターン</h3>
<strong>急上昇時の症状</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>過度の興奮・高揚感</li>
<li>非現実的な楽観視</li>
<li>リスク感覚の麻痺</li>
<li>睡眠不足でも活動的</li>
</ul>
<strong>急下落時の症状</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>パニック・極度の不安</li>
<li>自己嫌悪・後悔の念</li>
<li>社会的引きこもり</li>
<li>身体的症状の出現</li>
</ul>`
      },
      {
        type: 'example',
        title: '実際のケーススタディ',
        content: `<h3>ケース1：過度な没頭による健康悪化</h3>
<strong>状況</strong>: 30代会社員、副業として暗号通貨投資を開始
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>初期投資: 100万円</li>
<li>6ヶ月で500万円に増加</li>
<li>より大きな利益を求めて追加投資継続</li>
</ul>
<strong>心理的変化の経過</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>1-2ヶ月</strong>: 興味深い趣味として楽しむ</li>
<li><strong>3-4ヶ月</strong>: 利益増大で投資時間増加</li>
<li><strong>5-6ヶ月</strong>: 1日中価格チェック、睡眠不足開始</li>
<li><strong>7-8ヶ月</strong>: 仕事への集中力低下、人間関係悪化</li>
<li><strong>9ヶ月</strong>: 暴落で300万円に減少、抑うつ症状出現</li>
</ul>
<strong>学べること</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>成功体験が過度な没頭を招く危険性</li>
<li>段階的な生活バランス悪化のパターン</li>
<li>早期介入の重要性</li>
</ul>
<h3>ケース2：借金投資による極度のストレス</h3>
<strong>状況</strong>: 20代フリーター、暗号通貨で「人生逆転」を図る
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>消費者金融から借入して投資</li>
<li>SNSの成功談を真に受けて高リスク投資</li>
<li>暴落により借金だけが残る</li>
</ul>
<strong>心理的影響</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>極度の不安と絶望感</li>
<li>自殺願望の出現</li>
<li>家族・友人からの孤立</li>
<li>アルコール依存傾向</li>
</ul>
<strong>回復プロセス</strong>:
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>専門カウンセラーへの相談</li>
<li>債務整理の実施</li>
<li>投資から完全撤退</li>
<li>社会復帰支援の活用</li>
</ul>`
      },
      {
        type: 'tip',
        title: 'メンタルヘルス維持のための実践的対策',
        content: `<strong>健全な投資ライフスタイルの構築</strong>
✅ <strong>投資ルールの厳格な設定</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>生活資金は絶対に投資しない</li>
<li>損失許容額を事前に決定</li>
<li>定期的な利益確定ルール</li>
<li>投資時間の制限設定</li>
</ul>
✅ <strong>情報摂取の管理</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>価格チェック回数の制限(1日3回まで等)</li>
<li>SNSの投資関連アカウントのミュート</li>
<li>ニュースアラートの無効化</li>
<li>投資フリーデーの設定</li>
</ul>
✅ <strong>身体的健康の維持</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>定期的な運動習慣</li>
<li>十分な睡眠時間の確保</li>
<li>バランスの良い食事</li>
<li>ストレス発散方法の確立</li>
</ul>
✅ <strong>社会的つながりの維持</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>投資以外の趣味・活動の継続</li>
<li>家族・友人との時間確保</li>
<li>投資話題以外のコミュニケーション</li>
<li>専門職(本業・副業)への集中維持</li>
</ul>
✅ <strong>専門的サポートの活用</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>ファイナンシャルプランナーとの相談</li>
<li>必要に応じてメンタルヘルス専門家への相談</li>
<li>投資クラブ・コミュニティでの健全な情報交換</li>
<li>定期的な自己評価・振り返り</li>
</ul>
✅ <strong>感情管理テクニック</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>マインドフルネス・瞑想の実践</li>
<li>感情日記の記録</li>
<li>深呼吸・リラクゼーション法</li>
<li>認知行動療法的アプローチ</li>
</ul>`
      },
      {
        type: 'text',
        title: '危険信号の早期発見',
        content: `<h3>心理的危険信号チェックリスト</h3>
<strong>行動面の変化</strong>
□ 投資の話ばかりしている
□ 価格を1日10回以上チェックしている  
□ 睡眠時間が6時間以下になっている
□ 食事を忘れることが増えた
□ 投資以外の活動に興味を失った
<strong>感情面の変化</strong>
□ 価格変動で一喜一憂が激しい
□ イライラや不安感が続いている
□ 集中力が明らかに低下している
□ 楽しいと感じることが減った
□ 将来への過度な不安がある
<strong>身体面の変化</strong>
□ 頭痛や肩こりが頻繁
□ 食欲不振または過食
□ めまいや動悸がある
□ 疲れやすくなった
□ 胃腸の調子が悪い
<strong>社会面の変化</strong>
□ 人と会うのが億劫になった
□ 仕事のパフォーマンスが落ちた
□ 家族との会話が減った
□ 投資以外の話題についていけない
□ 約束をキャンセルすることが増えた
<strong>5個以上該当</strong>: 専門家への相談を強く推奨
<strong>3-4個該当</strong>: 投資行動の見直しが必要
<strong>1-2個該当</strong>: 注意深い自己観察を継続`
      },
      {
        type: 'quiz',
        title: '理解度チェック',
        questions: [
          {
            id: 'q1',
            questionType: 'multiple_choice',
            question: '投資による心理的ストレスを軽減するために最も効果的な方法は？',
            options: [
              'より多くの利益を得て経済的不安を解消する',
              '投資情報を常に収集して知識を増やす',
              '生活資金とは別の余剰資金のみで投資する',
              '価格変動を頻繁にチェックしてタイミングを見極める'
            ],
            correctAnswer: '生活資金とは別の余剰資金のみで投資する',
            explanation: '生活に必要な資金を投資に使うことは極度のストレスの原因となります。余剰資金のみでの投資により、精神的余裕を保つことができます。'
          },
          {
            id: 'q2',
            questionType: 'multiple_choice',
            question: 'FOMO(見逃すことへの恐れ)による心理的影響として最も危険なものは？',
            options: [
              '投資機会を慎重に検討すること',
              '他人の成功談に基づく非合理的な投資判断',
              '長期的な投資計画の策定',
              '分散投資による リスク軽減'
            ],
            correctAnswer: '他人の成功談に基づく非合理的な投資判断',
            explanation: 'FOMOは他人の成功を見て焦燥感を感じ、十分な検討なしに投資判断を行う危険性があります。これは大きな損失と心理的ダメージをもたらす可能性があります。'
          },
          {
            id: 'q3',
            questionType: 'true_false',
            question: '価格を頻繁にチェックすることは、市場動向を把握するために必要不可欠である。',
            options: ['正しい', '間違い'],
            correctAnswer: '間違い',
            explanation: '過度な価格チェックは心理的ストレスを増大させ、感情的な投資判断を招く可能性があります。適度な頻度での確認の方が健全です。'
          }
        ]
      },
      {
        type: 'warning',
        title: '専門的サポートが必要な症状',
        content: `<strong>以下の症状が現れた場合は専門家への相談を強く推奨</strong>
🚨 <strong>緊急度の高い症状</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>自殺願望や自傷行為</li>
<li>パニック発作の頻発</li>
<li>幻聴・幻覚などの精神病症状</li>
<li>アルコール・薬物への依存</li>
</ul>
⚠️ <strong>早期介入が必要な症状</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>2週間以上続く抑うつ気分</li>
<li>極度の不安で日常生活に支障</li>
<li>不眠が1週間以上継続</li>
<li>食事が取れない状態</li>
</ul>
📞 <strong>相談窓口</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>精神保健福祉センター</li>
<li>いのちの電話(24時間対応)</li>
<li>かかりつけ医・心療内科</li>
<li>ファイナンシャルプランナー</li>
</ul>
<strong>重要</strong>: 一人で抱え込まず、適切な専門家のサポートを受けることが回復への第一歩です。`
      }
    ],
    keyPoints: [
      '投資は経済面だけでなく精神的健康にも大きな影響を与える',
      '暗号通貨市場特有の高変動性が心理的ストレスを増大させる',
      'FOMO文化や24時間市場が依存的行動を促進する可能性',
      '生活資金と投資資金の明確な分離が基本的な防護策',
      '早期の危険信号発見と適切な対処が重要',
      '専門的サポートを躊躇なく活用することが回復の鍵'
    ],
    summary: 'このレッスンでは、投資・トレーディングが精神的健康に与える影響と対策について学びました。健全な投資ライフスタイルを維持することは、長期的な投資成功と人生の幸福度向上の両方にとって不可欠です。'
  },

  quiz: [
    {
      id: 'risk-management-5-q1',
      question: 'このレッスンの主要なポイントは何ですか？',
      options: [
        'オプション1',
        'オプション2', 
        'オプション3',
        'オプション4'
      ],
      correctAnswer: 1,
      explanation: '詳細な説明がここに入ります。'
    }
  ],
  lastUpdated: '2024-12-09',
  factChecked: true

};