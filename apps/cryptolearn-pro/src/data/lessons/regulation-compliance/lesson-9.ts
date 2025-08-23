import type { Lesson } from '../../../types';

export const lesson9: Lesson = {
  id: 'regulation-9',
  categoryId: '7',
  title: 'ステーブルコイン規制の現状',
  slug: 'stablecoin-regulations',
  description: 'ステーブルコインの仕組み、規制上の課題、各国の対応状況、システミックリスクへの対処方法を詳しく学習します',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 30,
  orderIndex: 9,
  content: {
    sections: [
      {
        type: 'text',
        title: 'ステーブルコインの基本概念',
        content: `
ステーブルコインは価格安定性を目的とした暗号資産で、デジタル経済の重要なインフラとして急速に普及しています。

<strong>ステーブルコインの分類:</strong>
1. <strong>法定通貨担保型</strong>
   - 法定通貨（USD、EUR等）を担保
   - 1:1の価値連動を目指す
   - 例：USDC、Tether（USDT）

2. <strong>暗号資産担保型</strong>
   - 他の暗号資産を担保として発行
   - 価格変動リスクに対する過担保
   - 例：DAI、sUSD

3. <strong>アルゴリズム型</strong>
   - プログラムによる自動価格調整
   - 担保資産を持たない設計
   - 例：Terra USD（UST、破綻）

4. <strong>ハイブリッド型</strong>
   - 複数の仕組みを組み合わせ
   - リスク分散と安定性向上
   - 例：Frax、Reserve

<strong>ステーブルコインの用途:</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>デジタル決済・送金</li>
<li>DeFiプロトコルでの基軸通貨</li>
<li>価値保存手段</li>
<li>国際間送金の効率化</li>
</ul>
        `
      },
      {
        type: 'text',
        title: '規制上の懸念とシステミックリスク',
        content: `
ステーブルコインの急速な普及により、金融システムへの影響が懸念されています。

<strong>主要な規制懸念:</strong>
1. <strong>システミックリスク</strong>
   - 大量償還による市場混乱
   - 準備資産の流動性不足
   - 金融システムへの波及効果

2. <strong>消費者・投資家保護</strong>
   - 準備資産の透明性不足
   - 発行体の信用リスク
   - 償還保証の不確実性

3. <strong>金融政策への影響</strong>
   - 中央銀行の政策伝達阻害
   - 通貨代替（Dollarization）
   - 金融仲介機能への影響

4. <strong>AML/CFT上のリスク</strong>
   - 匿名性による不正利用
   - クロスボーダー取引の追跡困難
   - 制裁回避のリスク

<strong>2022年Terra Luna/UST崩壊の教訓:</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>アルゴリズム型の脆弱性露呈</li>
<li>市場信頼失墜による連鎖反応</li>
<li>規制強化の必要性が明確化</li>
<li>400億ドル規模の市場消失</li>
</ul>
        `
      },
      {
        type: 'text',
        title: '各国の規制対応状況',
        content: `
<strong>米国の規制アプローチ:</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>大統領令（2022年3月）</strong>: 包括的な検討指示</li>
<li><strong>財務省報告書</strong>: ステーブルコインの銀行類似規制</li>
<li><strong>Fed副議長発言</strong>: 準備銀行での規制必要性</li>
<li><strong>議会法案</strong>: STABLE Act等の立法動向</li>
</ul>

<strong>欧州連合（MiCA規則）:</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>電子マネートークン（EMT）</strong>: 法定通貨参照型</li>
<li><strong>資産参照トークン（ART）</strong>: バスケット参照型</li>
<li><strong>厳格な準備資産要件</strong>: 適格資産への投資義務</li>
<li><strong>発行上限設定</strong>: システミックリスク抑制</li>
</ul>

<strong>日本の対応:</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>金融審議会での議論</strong>: ステーブルコインの制度設計</li>
<li><strong>改正資金決済法</strong>: 電子決済手段の新設</li>
<li><strong>発行・仲介業者規制</strong>: 登録制の導入</li>
<li><strong>利用者保護措置</strong>: 適切な管理体制義務</li>
</ul>

<strong>その他主要国:</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>イギリス</strong>: HM Treasury規制案公表</li>
<li><strong>シンガポール</strong>: MAS包括的ガイドライン</li>
<li><strong>カナダ</strong>: 銀行法改正による規制</li>
<li><strong>オーストラリア</strong>: AUSTRAC報告書</li>
</ul>
        `
      },
      {
        type: 'text',
        title: '実務対応とコンプライアンス',
        content: `
ステーブルコイン事業者には包括的なコンプライアンス体制が求められます。

<strong>発行体の義務:</strong>
1. <strong>準備資産管理</strong>
   - 適格資産への限定投資
   - 分別管理の徹底
   - 定期的な監査・証明
   - 流動性確保計画

2. <strong>情報開示義務</strong>
   - 準備資産の詳細公表
   - 月次・四半期報告
   - 償還メカニズムの説明
   - リスク要因の開示

3. <strong>ガバナンス体制</strong>
   - 独立取締役の選任
   - リスク管理委員会設置
   - 内部監査機能強化
   - 継続性計画策定

<strong>技術面のコンプライアンス:</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>スマートコントラクト監査</strong></li>
<li><strong>セキュリティ監査の実施</strong></li>
<li><strong>アップグレード可能性の管理</strong></li>
<li><strong>オラクルリスクの軽減</strong></li>
</ul>

<strong>クロスボーダー対応:</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>各国規制の調整</li>
<li>税務コンプライアンス</li>
<li>制裁リスト照合</li>
<li>現地法人設立検討</li>
</ul>
        `
      }
    ],
    keyPoints: [
      'ステーブルコインは価格安定性を目指すが多様な仕組みが存在',
      '大規模ステーブルコインはシステミックリスクとして規制対象',
      '各国で準備資産管理や情報開示の厳格な要件が導入中',
      'Terra Luna/UST崩壊は規制強化の重要な転機となった',
      '発行体には銀行類似の厳格なコンプライアンス体制が必要'
    ],
    summary: 'ステーブルコインは金融システムの重要インフラとなりつつありますが、システミックリスクの観点から各国で厳格な規制が導入されています。',
    practicalExamples: [
      'USDC: 準備資産の透明性確保による信頼性向上',
      'Tether: 準備資産の構成開示による透明性改善',
      'DAI: 分散型ガバナンスによる信頼性確保',
      '日本のJPYC: 国内法準拠による合法的なステーブルコイン'
    ],
    warningNotes: [
      'ステーブルコインでも価格変動や償還リスクが存在します',
      '規制違反は事業停止や刑事責任を招く可能性があります',
      'アルゴリズム型ステーブルコインには特に高いリスクがあります',
      '国際的なステーブルコイン利用は複数国の法律が適用される場合があります'
    ]
  },
  quiz: [
    {
      id: 'regulation-9-q1',
      question: 'ステーブルコインの分類として正しくないものはどれですか？',
      options: [
        '法定通貨担保型',
        '暗号資産担保型',
        'プルーフ・オブ・ワーク型',
        'アルゴリズム型'
      ],
      correctAnswer: 2,
      explanation: 'プルーフ・オブ・ワークはコンセンサスアルゴリズムであり、ステーブルコインの分類ではありません。'
    },
    {
      id: 'regulation-9-q2',
      question: 'Terra Luna/UST崩壊が示した主要な教訓はどれですか？',
      options: [
        'すべてのステーブルコインは危険',
        'アルゴリズム型の脆弱性',
        'DeFi自体の問題',
        '規制は不要'
      ],
      correctAnswer: 1,
      explanation: 'Terra Luna/UST事件はアルゴリズム型ステーブルコインの根本的な脆弱性を露呈し、規制強化の必要性を示しました。'
    },
    {
      id: 'regulation-9-q3',
      question: 'ステーブルコイン規制で最も重視される要素はどれですか？',
      options: [
        'マイニング効率',
        '準備資産の管理',
        'トランザクション速度',
        'ガス料金の安さ'
      ],
      correctAnswer: 1,
      explanation: '準備資産の適切な管理と透明性がステーブルコイン規制の核心的要素です。'
    }
  ],
  lastUpdated: '2024-12-10',
  factChecked: true
};