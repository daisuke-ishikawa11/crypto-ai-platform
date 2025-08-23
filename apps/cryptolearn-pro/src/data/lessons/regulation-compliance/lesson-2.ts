import type { Lesson } from '../../../types';

export const lesson2: Lesson = {
  id: 'regulation-2',
  categoryId: '7',
  title: '日本の暗号資産法制詳解',
  slug: 'japan-cryptocurrency-legal-framework',
  description: '日本の暗号資産に関する法的枠組み、資金決済法、金商法の詳細を学び、国内事業者の義務を理解します',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 35,
  orderIndex: 2,
  content: {
    sections: [
      {
        type: 'text',
        title: '日本の暗号資産法制の発展',
        content: `
日本は世界に先駆けて暗号資産の法的地位を明確化し、包括的な規制枠組みを構築しました。

<strong>法制度の発展経緯：</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>2014年</strong>: Mt.Gox事件を受けた検討開始</li>
<li><strong>2016年</strong>: 資金決済法改正（暗号通貨の定義）</li>
<li><strong>2017年</strong>: 暗号資産交換業者の登録制開始</li>
<li><strong>2019年</strong>: 金融商品取引法改正（暗号資産デリバティブ規制）</li>
<li><strong>2020年</strong>: 改正資金決済法施行（カストディ業務等）</li>
</ul>

<strong>日本の規制の特徴：</strong>
1. <strong>段階的なアプローチ</strong>: 市場の発展に合わせた規制強化
2. <strong>業界との協調</strong>: 自主規制機関との連携
3. <strong>イノベーション促進</strong>: 過度な規制による萎縮回避
4. <strong>投資家保護重視</strong>: 分別管理、情報開示の徹底
        `
      },
      {
        type: 'text',
        title: '資金決済法における暗号資産規制',
        content: `
資金決済法は暗号資産の基本的な法的枠組みを定めています。

<strong>暗号資産の定義（第2条第5項）:</strong>
1号暗号資産：
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>物品購入・役務提供の対価として使用可能</li>
<li>不特定の者を相手方として売買可能</li>
<li>電子的記録により移転可能</li>
</ul>

2号暗号資産：
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>1号暗号資産と相互に交換可能</li>
<li>上記の要件を満たすもの</li>
</ul>

<strong>暗号資産交換業者の義務（第63条の3〜第63条の22）:</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>登録制</strong>: 金融庁への登録が必要</li>
<li><strong>分別管理</strong>: 顧客資産の適切な管理</li>
<li><strong>情報提供</strong>: リスク説明、手数料開示</li>
<li><strong>帳簿書類の作成・保存</strong></li>
<li><strong>業務改善命令への対応</strong></li>
</ul>

<strong>禁止行為:</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>虚偽説明、誤解を招く表示</li>
<li>適合性原則違反</li>
<li>利益相反取引</li>
<li>業として行う不公正取引</li>
</ul>
        `
      },
      {
        type: 'text',
        title: '金融商品取引法と暗号資産',
        content: `
金融商品取引法（金商法）は暗号資産デリバティブを規制しています。

<strong>暗号資産デリバティブ取引の定義:</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>暗号資産を原資産とする先物取引</li>
<li>暗号資産の価格を指標とするオプション取引</li>
<li>暗号資産に関するスワップ取引</li>
</ul>

<strong>第一種金融商品取引業者の義務:</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li><strong>登録要件</strong>: 資本金、人的構成等</li>
<li><strong>行為規制</strong>: 適合性原則、説明義務</li>
<li><strong>財務規制</strong>: 自己資本規制比率</li>
<li><strong>リスク管理</strong>: 統合的リスク管理</li>
</ul>

<strong>レバレッジ規制:</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>個人投資家：最大2倍</li>
<li>法人投資家：制限なし（但し適合性の確認必要）</li>
</ul>

<strong>ICO・STO規制:</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>発行されるトークンが有価証券に該当するかの判断</li>
<li>投資性、流通性の観点から個別判定</li>
<li>該当する場合は有価証券規制が適用</li>
</ul>
        `
      },
      {
        type: 'text',
        title: '自主規制機関とコンプライアンス',
        content: `
日本では業界団体による自主規制が重要な役割を果たしています。

<strong>日本暗号資産交換業協会（JVCEA）:</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>2018年10月認定自主規制機関に認定</li>
<li>会員事業者への規則策定・監督</li>
<li>投資家保護、業界の健全な発展を目的</li>
</ul>

<strong>主要な自主規制ルール:</strong>
1. <strong>取扱暗号資産の審査</strong>: グリーンリスト制度
2. <strong>広告・勧誘規制</strong>: 過度な勧誘の禁止
3. <strong>内部管理体制</strong>: リスク管理、内部監査
4. <strong>顧客保護</strong>: 分別管理の詳細ルール
5. <strong>システムリスク管理</strong>: セキュリティ対策

<strong>コンプライアンス体制構築のポイント:</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>法令遵守統括責任者の設置</li>
<li>定期的な従業員研修</li>
<li>内部監査機能の確立</li>
<li>インシデント対応体制</li>
<li>継続的なシステム改善</li>
</ul>

<strong>監督・検査体制:</strong>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li>金融庁による定期検査</li>
<li>JVCEAによる自主規制検査</li>
<li>重大事案発生時の特別検査</li>
</ul>
        `
      }
    ],
    keyPoints: [
      '日本は世界最先端の暗号資産法制を整備している',
      '資金決済法により暗号資産交換業者の登録制を採用',
      '金商法により暗号資産デリバティブを規制',
      '自主規制機関JVCEAが業界の健全性確保に重要な役割',
      'レバレッジ取引は個人投資家最大2倍に制限'
    ],
    summary: '日本の暗号資産法制は資金決済法と金商法を柱とし、自主規制機関との連携により投資家保護と業界発展のバランスを取った先進的な制度となっています。',
    practicalExamples: [
      '暗号資産交換業者の登録制により、顧客資産の分別管理が義務化',
      'JVCEAのグリーンリスト制度により、取扱暗号資産の安全性向上',
      '個人投資家のレバレッジ2倍制限により過度なリスクテイクを抑制',
      'ICO規制により投資家保護と資金調達の適正化を両立'
    ],
    warningNotes: [
      '無登録での暗号資産交換業は刑事罰の対象となります',
      '海外事業者でも日本居住者向けサービスは規制対象となる場合があります',
      '法解釈については金融庁ガイドラインや専門家の見解を参照してください',
      '規制内容は定期的に見直されるため、最新情報の確認が重要です'
    ]
  },
  quiz: [
    {
      id: 'regulation-2-q1',
      question: '資金決済法における暗号資産の定義として正しいのはどれですか？',
      options: [
        '電子マネーと同じ扱い',
        '1号・2号暗号資産に分類',
        '有価証券として定義',
        '商品として定義'
      ],
      correctAnswer: 1,
      explanation: '資金決済法では暗号資産を1号暗号資産（決済手段性を有するもの）と2号暗号資産（1号と交換可能なもの）に分類しています。'
    },
    {
      id: 'regulation-2-q2',
      question: '日本の暗号資産デリバティブ取引におけるレバレッジ制限（個人投資家）はどれですか？',
      options: [
        '制限なし',
        '最大2倍',
        '最大5倍',
        '最大25倍'
      ],
      correctAnswer: 1,
      explanation: '金商法により、個人投資家の暗号資産デリバティブ取引のレバレッジは最大2倍に制限されています。'
    },
    {
      id: 'regulation-2-q3',
      question: '日本暗号資産交換業協会（JVCEA）の役割として適切でないものはどれですか？',
      options: [
        '自主規制ルールの策定',
        '会員事業者の監督',
        '暗号資産の価格統制',
        '投資家保護活動'
      ],
      correctAnswer: 2,
      explanation: 'JVCEAは自主規制機関であり、価格統制は行いません。市場メカニズムによる適正な価格形成を重視しています。'
    }
  ],
  lastUpdated: '2024-12-10',
  factChecked: true
};