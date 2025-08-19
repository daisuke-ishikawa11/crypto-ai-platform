import type { Lesson } from '../../../types';

export const lesson12: Lesson = {
  id: 'financial-literacy-12',
  categoryId: 'financial-literacy',
  title: '投資心理学と行動経済学の基礎',
  slug: 'investment-psychology-behavioral-economics',
  description: '投資判断に影響を与える心理的バイアスと行動パターンを理解し、より合理的な意思決定を学ぶ',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 50,
  orderIndex: 12,
  isPublished: true,
  tags: ['金融リテラシー', '投資心理学', '行動経済学', '意思決定'],
  
  content: {
    sections: [
      {
        type: 'text',
        title: '代表的な認知バイアスの理解',
        content: `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 1rem; color: white; margin-bottom: 2rem;">
  <h2 style="margin: 0 0 1rem 0; font-size: 2rem;">🧠 投資判断を歪める認知バイアス</h2>
  <p style="margin: 0; font-size: 1.1rem; line-height: 1.6;">人間の脳は効率的な判断のために「ショートカット」を使いますが、これが投資では損失につながることがあります。</p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📊 損失回避バイアス（プロスペクト理論）</h2>

<div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 1.5rem; margin: 2rem 0;">
  <h3 style="margin: 0 0 1rem 0; color: #856404;">損失の心理的インパクト</h3>
  <p style="color: #856404; font-size: 1.1rem;">
    人は同額の利益よりも損失を<strong>約2.5倍</strong>強く感じます。<br>
    例：1万円の損失の苦痛 ≈ 2.5万円の利益の喜び
  </p>
  <ul style="margin: 1rem 0; padding-left: 1.5rem; color: #856404;">
    <li>含み損を抱えた株を売れない（塩漬け）</li>
    <li>少しの利益ですぐに利確してしまう</li>
    <li>損切りラインを守れない</li>
  </ul>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🎯 確証バイアス</h2>

<table style="width: 100%; border-collapse: collapse; margin: 2rem 0;">
  <thead>
    <tr style="background: linear-gradient(90deg, #667eea, #764ba2); color: white;">
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">バイアスの症状</th>
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">投資行動への影響</th>
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">対策</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #f8f9fa;">
      <td style="padding: 1rem; border: 1px solid #ddd;">自分の信念を支持する情報ばかり探す</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">保有銘柄の良いニュースだけを見る</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">反対意見を意図的に探す</td>
    </tr>
    <tr>
      <td style="padding: 1rem; border: 1px solid #ddd;">都合の悪い情報を無視</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">業績悪化の兆候を見逃す</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">客観的な指標を設定</td>
    </tr>
    <tr style="background: #f8f9fa;">
      <td style="padding: 1rem; border: 1px solid #ddd;">結論ありきの分析</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">買いたい理由を後付けで探す</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">投資日記で振り返り</td>
    </tr>
  </tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🔄 アンカリング効果</h2>

<div style="background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%); padding: 2rem; border-radius: 1rem; margin: 2rem 0;">
  <h3 style="margin: 0 0 1rem 0; color: #2c3e50;">最初の情報に引きずられる心理</h3>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
    <div style="background: rgba(255,255,255,0.9); padding: 1rem; border-radius: 0.5rem;">
      <h4 style="color: #2c3e50; margin: 0 0 0.5rem 0;">投資での例</h4>
      <ul style="color: #2c3e50; margin: 0; padding-left: 1.5rem;">
        <li>過去の高値に固執</li>
        <li>購入価格を基準に判断</li>
        <li>最初の目標株価に縛られる</li>
      </ul>
    </div>
    <div style="background: rgba(255,255,255,0.9); padding: 1rem; border-radius: 0.5rem;">
      <h4 style="color: #2c3e50; margin: 0 0 0.5rem 0;">克服方法</h4>
      <ul style="color: #2c3e50; margin: 0; padding-left: 1.5rem;">
        <li>現在の適正価値で判断</li>
        <li>複数の評価軸を持つ</li>
        <li>定期的な見直し</li>
      </ul>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📈 過信バイアス</h2>

<div style="background: #f8d7da; border: 2px solid #dc3545; padding: 1.5rem; border-radius: 0.5rem; margin: 2rem 0;">
  <h3 style="margin: 0 0 1rem 0; color: #721c24;">自己能力の過大評価</h3>
  <p style="color: #721c24;">
    統計：個人投資家の<strong>90%</strong>が自分を「平均以上」と評価
  </p>
  <ul style="margin: 1rem 0; padding-left: 1.5rem; color: #721c24;">
    <li>少ない成功体験で実力と勘違い</li>
    <li>リスク管理の軽視</li>
    <li>レバレッジの過度な使用</li>
    <li>分散投資の軽視</li>
  </ul>
</div>`
      },
      {
        type: 'text',
        title: '群集心理とハーディング現象',
        content: `<div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); padding: 2rem; border-radius: 1rem; color: #2c3e50; margin-bottom: 2rem;">
  <h2 style="margin: 0 0 1rem 0; font-size: 2rem;">👥 集団の影響と市場心理</h2>
  <p style="margin: 0; font-size: 1.1rem; line-height: 1.6;">多数派の行動に追従する心理が、バブルと暴落のサイクルを生み出します。</p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🎢 市場サイクルと投資家心理</h2>

<table style="width: 100%; border-collapse: collapse; margin: 2rem 0;">
  <thead>
    <tr style="background: #17a2b8; color: white;">
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">市場フェーズ</th>
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">投資家の心理</th>
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">典型的な行動</th>
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">正しい対応</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #f8f9fa;">
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>楽観期</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">希望・期待</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">慎重な買い</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">計画的な投資継続</td>
    </tr>
    <tr>
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>興奮期</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">スリル・熱狂</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">積極的な買い増し</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">利益確定の検討</td>
    </tr>
    <tr style="background: #f8f9fa;">
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>陶酔期</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">全能感・確信</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">レバレッジ使用</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">段階的な売却</td>
    </tr>
    <tr>
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>不安期</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">心配・否認</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">様子見</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">リスク管理強化</td>
    </tr>
    <tr style="background: #f8f9fa;">
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>恐慌期</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">パニック・恐怖</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">狼狽売り</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">冷静な判断維持</td>
    </tr>
    <tr>
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>降伏期</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">絶望・諦め</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">全面撤退</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">段階的な買い開始</td>
    </tr>
  </tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🔔 FOMO（Fear of Missing Out）</h2>

<div style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); padding: 2rem; border-radius: 1rem; margin: 2rem 0;">
  <h3 style="margin: 0 0 1rem 0; color: #2c3e50;">機会損失への恐怖</h3>
  <div style="background: rgba(255,255,255,0.9); padding: 1.5rem; border-radius: 0.5rem; margin-top: 1rem;">
    <h4 style="color: #2c3e50; margin: 0 0 1rem 0;">FOMOの症状</h4>
    <ul style="color: #2c3e50; margin: 0; padding-left: 1.5rem;">
      <li>「今買わないと二度とチャンスがない」という焦り</li>
      <li>SNSで他人の利益報告を見て焦る</li>
      <li>話題の銘柄に飛びつく</li>
      <li>十分な調査なしに投資</li>
    </ul>
  </div>
  <div style="background: rgba(255,255,255,0.9); padding: 1.5rem; border-radius: 0.5rem; margin-top: 1rem;">
    <h4 style="color: #2c3e50; margin: 0 0 1rem 0;">対策</h4>
    <ul style="color: #2c3e50; margin: 0; padding-left: 1.5rem;">
      <li>投資計画を事前に立てる</li>
      <li>感情的な決定を避ける「24時間ルール」</li>
      <li>SNSの投資情報を制限</li>
      <li>機会は常に存在することを理解</li>
    </ul>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📰 情報カスケード</h2>

<div style="background: #d1ecf1; border: 2px solid #17a2b8; padding: 1.5rem; border-radius: 0.5rem; margin: 2rem 0;">
  <h3 style="margin: 0 0 1rem 0; color: #0c5460;">情報の連鎖反応</h3>
  <p style="color: #0c5460;">
    個人の合理的判断より、多数の行動を真似る方が安全と感じる心理
  </p>
  <div style="margin-top: 1rem;">
    <h4 style="color: #0c5460; margin: 0 0 0.5rem 0;">具体例：</h4>
    <ul style="color: #0c5460; margin: 0; padding-left: 1.5rem;">
      <li>「みんなが買っているから買う」</li>
      <li>「有名投資家が推奨したから買う」</li>
      <li>「ランキング上位だから投資」</li>
    </ul>
  </div>
</div>`
      },
      {
        type: 'text',
        title: 'メンタルアカウンティングと資金管理',
        content: `<div style="background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%); padding: 2rem; border-radius: 1rem; color: white; margin-bottom: 2rem;">
  <h2 style="margin: 0 0 1rem 0; font-size: 2rem;">💰 心の会計と資金の色分け</h2>
  <p style="margin: 0; font-size: 1.1rem; line-height: 1.6;">同じお金でも、その出所や用途によって異なる価値を感じる心理的傾向を理解します。</p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🏷️ お金の心理的ラベリング</h2>

<table style="width: 100%; border-collapse: collapse; margin: 2rem 0;">
  <thead>
    <tr style="background: #28a745; color: white;">
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">資金の種類</th>
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">心理的価値</th>
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">典型的な行動</th>
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">リスク</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #f8f9fa;">
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>給与・労働収入</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">高い（苦労して稼いだ）</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">慎重に使用</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">過度な保守性</td>
    </tr>
    <tr>
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>ボーナス・臨時収入</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">低い（棚ぼた）</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">浪費しやすい</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">無計画な支出</td>
    </tr>
    <tr style="background: #f8f9fa;">
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>投資利益</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">中間（ハウスマネー）</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">再投資で高リスク</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">ギャンブル化</td>
    </tr>
    <tr>
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>相続・贈与</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">特別（感情的価値）</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">保守的または浪費</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">非合理的判断</td>
    </tr>
  </tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🎰 ハウスマネー効果</h2>

<div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 1.5rem; margin: 2rem 0;">
  <h3 style="margin: 0 0 1rem 0; color: #856404;">利益で得たお金は「あぶく銭」？</h3>
  <p style="color: #856404; font-size: 1.1rem;">
    投資で得た利益を「もともとなかったお金」と考え、リスクの高い投資に回してしまう傾向
  </p>
  <div style="margin-top: 1rem; padding: 1rem; background: rgba(255,255,255,0.5); border-radius: 0.5rem;">
    <h4 style="color: #856404; margin: 0 0 0.5rem 0;">危険な思考パターン</h4>
    <ul style="color: #856404; margin: 0; padding-left: 1.5rem;">
      <li>「利益分なら失ってもいい」</li>
      <li>「元本だけ守れば大丈夫」</li>
      <li>「儲けた金で勝負」</li>
    </ul>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📊 ポートフォリオの心理的分離</h2>

<div style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 2rem; border-radius: 1rem; margin: 2rem 0;">
  <h3 style="margin: 0 0 1rem 0; color: #2c3e50;">口座分けの功罪</h3>
  <table style="width: 100%; margin-top: 1rem;">
    <tr>
      <td style="padding: 0.5rem; color: #2c3e50;"><strong>安全資産口座</strong></td>
      <td style="padding: 0.5rem; color: #2c3e50;">過度に保守的な運用</td>
    </tr>
    <tr>
      <td style="padding: 0.5rem; color: #2c3e50;"><strong>投機口座</strong></td>
      <td style="padding: 0.5rem; color: #2c3e50;">過度にリスクテイク</td>
    </tr>
    <tr>
      <td style="padding: 0.5rem; color: #2c3e50;"><strong>退職金口座</strong></td>
      <td style="padding: 0.5rem; color: #2c3e50;">触れない聖域化</td>
    </tr>
  </table>
  <p style="margin-top: 1rem; color: #2c3e50;">
    ⚠️ 本来は全体で最適化すべきポートフォリオを分断してしまうリスク
  </p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">💡 合理的な資金管理への転換</h2>

<div style="background: #d4edda; border: 2px solid #28a745; padding: 1.5rem; border-radius: 0.5rem; margin: 2rem 0;">
  <h3 style="margin: 0 0 1rem 0; color: #155724;">お金に色はない原則</h3>
  <ol style="color: #155724; margin: 0; padding-left: 1.5rem;">
    <li><strong>統合的管理</strong>：すべての資産を一つのポートフォリオとして管理</li>
    <li><strong>目的別配分</strong>：心理的分離ではなく、目的と期間で配分</li>
    <li><strong>定期的再配分</strong>：感情ではなくルールに基づくリバランス</li>
    <li><strong>記録と振り返り</strong>：判断の根拠を記録し、後で検証</li>
  </ol>
</div>`
      },
      {
        type: 'text',
        title: '感情コントロールと規律の構築',
        content: `<div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 2rem; border-radius: 1rem; color: white; margin-bottom: 2rem;">
  <h2 style="margin: 0 0 1rem 0; font-size: 2rem;">🎯 投資規律とルールベースの意思決定</h2>
  <p style="margin: 0; font-size: 1.1rem; line-height: 1.6;">感情に左右されない投資を実現するための具体的な仕組みづくりを学びます。</p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📋 投資ルールの策定</h2>

<table style="width: 100%; border-collapse: collapse; margin: 2rem 0;">
  <thead>
    <tr style="background: #6c757d; color: white;">
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">ルールカテゴリ</th>
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">具体的内容</th>
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">目的</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #f8f9fa;">
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>エントリールール</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">
        • PER15倍以下<br>
        • 営業利益率10%以上<br>
        • 3年連続増収増益
      </td>
      <td style="padding: 1rem; border: 1px solid #ddd;">衝動買いの防止</td>
    </tr>
    <tr>
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>ポジションサイズ</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">
        • 1銘柄最大5%<br>
        • セクター最大20%<br>
        • 現金比率最低20%
      </td>
      <td style="padding: 1rem; border: 1px solid #ddd;">リスク分散</td>
    </tr>
    <tr style="background: #f8f9fa;">
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>損切りルール</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">
        • 購入価格-8%で損切り<br>
        • 業績下方修正で即売却<br>
        • 投資理由消失で売却
      </td>
      <td style="padding: 1rem; border: 1px solid #ddd;">損失拡大防止</td>
    </tr>
    <tr>
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>利益確定ルール</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">
        • +20%で半分売却<br>
        • +50%で更に半分売却<br>
        • トレイリングストップ
      </td>
      <td style="padding: 1rem; border: 1px solid #ddd;">利益の確保</td>
    </tr>
  </tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🧘 感情管理のテクニック</h2>

<div style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); padding: 2rem; border-radius: 1rem; margin: 2rem 0;">
  <h3 style="margin: 0 0 1rem 0; color: #2c3e50;">投資前のチェックリスト</h3>
  <div style="background: rgba(255,255,255,0.9); padding: 1.5rem; border-radius: 0.5rem; margin-top: 1rem;">
    <ol style="color: #2c3e50; margin: 0; padding-left: 1.5rem;">
      <li><strong>24時間ルール</strong>：重要な投資判断は翌日に再検討</li>
      <li><strong>第三者視点</strong>：「友人にこの投資を勧められるか？」</li>
      <li><strong>最悪シナリオ</strong>：50%下落しても耐えられるか？</li>
      <li><strong>投資理由の明文化</strong>：なぜ今この銘柄なのか？</li>
      <li><strong>exit戦略</strong>：いつ、どうなったら売るか？</li>
    </ol>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📓 投資日記の活用</h2>

<div style="background: #e7f3ff; border: 2px solid #007bff; padding: 1.5rem; border-radius: 0.5rem; margin: 2rem 0;">
  <h3 style="margin: 0 0 1rem 0; color: #004085;">記録すべき項目</h3>
  <table style="width: 100%; margin-top: 1rem;">
    <tr style="background: rgba(255,255,255,0.8);">
      <td style="padding: 0.8rem; border: 1px solid #007bff; color: #004085;"><strong>購入時</strong></td>
      <td style="padding: 0.8rem; border: 1px solid #007bff; color: #004085;">
        • 投資理由<br>
        • 目標株価<br>
        • 想定保有期間<br>
        • その時の感情
      </td>
    </tr>
    <tr style="background: rgba(255,255,255,0.8);">
      <td style="padding: 0.8rem; border: 1px solid #007bff; color: #004085;"><strong>保有中</strong></td>
      <td style="padding: 0.8rem; border: 1px solid #007bff; color: #004085;">
        • 重要ニュースへの反応<br>
        • 追加購入/売却の理由<br>
        • 心理状態の変化
      </td>
    </tr>
    <tr style="background: rgba(255,255,255,0.8);">
      <td style="padding: 0.8rem; border: 1px solid #007bff; color: #004085;"><strong>売却時</strong></td>
      <td style="padding: 0.8rem; border: 1px solid #007bff; color: #004085;">
        • 売却理由<br>
        • 結果の評価<br>
        • 学んだ教訓
      </td>
    </tr>
  </table>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🔄 定期的な振り返り</h2>

<div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 2rem; border-radius: 1rem; color: white; margin: 2rem 0;">
  <h3 style="margin: 0 0 1rem 0;">月次レビューのポイント</h3>
  <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
    <li>ルールを守れたか？守れなかった場合の理由は？</li>
    <li>感情的な判断はなかったか？</li>
    <li>パフォーマンスの要因分析（スキル vs 運）</li>
    <li>改善点の特定と対策</li>
    <li>ルールの見直しが必要か？</li>
  </ul>
</div>`
      },
      {
        type: 'text',
        title: 'システム1とシステム2の活用',
        content: `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 1rem; color: white; margin-bottom: 2rem;">
  <h2 style="margin: 0 0 1rem 0; font-size: 2rem;">🧩 二重過程理論と投資判断</h2>
  <p style="margin: 0; font-size: 1.1rem; line-height: 1.6;">ダニエル・カーネマンの理論を投資に応用し、直感と熟考のバランスを取る方法を学びます。</p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🏃 システム1（速い思考）vs 🐢 システム2（遅い思考）</h2>

<table style="width: 100%; border-collapse: collapse; margin: 2rem 0;">
  <thead>
    <tr style="background: linear-gradient(90deg, #667eea, #764ba2); color: white;">
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">特徴</th>
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">システム1（直感）</th>
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">システム2（分析）</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #f8f9fa;">
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>処理速度</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">高速・自動的</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">低速・意識的</td>
    </tr>
    <tr>
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>努力</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">努力不要</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">努力必要</td>
    </tr>
    <tr style="background: #f8f9fa;">
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>得意分野</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">パターン認識、第一印象</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">論理的推論、計算</td>
    </tr>
    <tr>
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>エラー</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">バイアスの影響大</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">疲労で機能低下</td>
    </tr>
  </tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">⚖️ 投資における適切な使い分け</h2>

<div style="background: #d4edda; border: 2px solid #28a745; padding: 1.5rem; border-radius: 0.5rem; margin: 2rem 0;">
  <h3 style="margin: 0 0 1rem 0; color: #155724;">システム1が有効な場面</h3>
  <ul style="color: #155724; margin: 0; padding-left: 1.5rem;">
    <li>危険信号の察知（何かおかしいという直感）</li>
    <li>経験豊富な分野での判断</li>
    <li>市場の雰囲気の把握</li>
    <li>初期スクリーニング</li>
  </ul>
</div>

<div style="background: #d1ecf1; border: 2px solid #17a2b8; padding: 1.5rem; border-radius: 0.5rem; margin: 2rem 0;">
  <h3 style="margin: 0 0 1rem 0; color: #0c5460;">システム2を使うべき場面</h3>
  <ul style="color: #0c5460; margin: 0; padding-left: 1.5rem;">
    <li>財務分析・バリュエーション</li>
    <li>ポートフォリオ構築</li>
    <li>リスク計算</li>
    <li>投資計画の策定</li>
    <li>重要な投資判断</li>
  </ul>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🛡️ システム2の活性化テクニック</h2>

<div style="background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%); padding: 2rem; border-radius: 1rem; margin: 2rem 0;">
  <h3 style="margin: 0 0 1rem 0; color: #2c3e50;">認知的負荷を下げる工夫</h3>
  <ol style="color: #2c3e50; margin: 0.5rem 0; padding-left: 1.5rem;">
    <li><strong>環境整備</strong>：静かな場所で分析作業</li>
    <li><strong>時間帯選択</strong>：頭が冴えている朝に重要判断</li>
    <li><strong>チェックリスト化</strong>：判断プロセスの標準化</li>
    <li><strong>段階的判断</strong>：大きな決定を小さく分割</li>
    <li><strong>外部化</strong>：紙に書き出して整理</li>
  </ol>
</div>`
      },
      {
        type: 'text',
        title: '実践的な心理的対策',
        content: `<div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 2rem; border-radius: 1rem; color: white; margin-bottom: 2rem;">
  <h2 style="margin: 0 0 1rem 0; font-size: 2rem;">🛠️ 心理的罠を回避する実践テクニック</h2>
  <p style="margin: 0; font-size: 1.1rem; line-height: 1.6;">理論を実践に落とし込み、日々の投資で活用できる具体的な対策を身につけます。</p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">📱 テクノロジーを活用した対策</h2>

<table style="width: 100%; border-collapse: collapse; margin: 2rem 0;">
  <thead>
    <tr style="background: #dc3545; color: white;">
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">ツール・機能</th>
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">防げるバイアス</th>
      <th style="padding: 1rem; text-align: left; border: 2px solid #ddd;">具体的な設定</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #f8f9fa;">
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>自動売買</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">損失回避、感情的判断</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">逆指値、トレイリングストップ</td>
    </tr>
    <tr>
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>アラート機能</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">確証バイアス</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">ネガティブニュースも通知</td>
    </tr>
    <tr style="background: #f8f9fa;">
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>積立投資</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">タイミング判断、FOMO</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">毎月定額自動買付</td>
    </tr>
    <tr>
      <td style="padding: 1rem; border: 1px solid #ddd;"><strong>ポートフォリオ管理</strong></td>
      <td style="padding: 1rem; border: 1px solid #ddd;">メンタルアカウンティング</td>
      <td style="padding: 1rem; border: 1px solid #ddd;">統合管理ツール使用</td>
    </tr>
  </tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🎮 ゲーミフィケーション戦略</h2>

<div style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 2rem; border-radius: 1rem; margin: 2rem 0;">
  <h3 style="margin: 0 0 1rem 0; color: #2c3e50;">投資を「ゲーム」として捉える</h3>
  <div style="background: rgba(255,255,255,0.9); padding: 1.5rem; border-radius: 0.5rem; margin-top: 1rem;">
    <h4 style="color: #2c3e50; margin: 0 0 1rem 0;">ルール例</h4>
    <ul style="color: #2c3e50; margin: 0; padding-left: 1.5rem;">
      <li>「レベル制」：投資額を段階的に増やす</li>
      <li>「実績解除」：特定条件達成でボーナス</li>
      <li>「チャレンジ」：月間目標の設定</li>
      <li>「スコア化」：リスク調整後リターンで評価</li>
    </ul>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🏆 成功事例から学ぶ</h2>

<div style="background: #f8f9fa; border-radius: 0.5rem; padding: 1.5rem; margin: 2rem 0;">
  <h3 style="color: #495057; margin-bottom: 1rem;">著名投資家の心理管理術</h3>
  <table style="width: 100%;">
    <tr>
      <td style="padding: 0.5rem; color: #495057;"><strong>ウォーレン・バフェット</strong></td>
      <td style="padding: 0.5rem; color: #495057;">「市場が恐怖の時に貪欲に、貪欲な時に恐怖を」</td>
    </tr>
    <tr>
      <td style="padding: 0.5rem; color: #495057;"><strong>ピーター・リンチ</strong></td>
      <td style="padding: 0.5rem; color: #495057;">「自分が理解できないものには投資しない」</td>
    </tr>
    <tr>
      <td style="padding: 0.5rem; color: #495057;"><strong>ジョージ・ソロス</strong></td>
      <td style="padding: 0.5rem; color: #495057;">「間違いを認める勇気」</td>
    </tr>
  </table>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🎯 アクションプラン</h2>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 1rem; color: white; margin: 2rem 0;">
  <h3 style="margin: 0 0 1rem 0;">今日から始める5つの習慣</h3>
  <ol style="margin: 0.5rem 0; padding-left: 1.5rem;">
    <li><strong>投資日記</strong>：毎日5分、その日の判断を記録</li>
    <li><strong>ルール明文化</strong>：投資基準を紙に書き出す</li>
    <li><strong>冷却期間</strong>：重要判断は24時間置く</li>
    <li><strong>定期レビュー</strong>：月1回、投資判断を振り返る</li>
    <li><strong>学習継続</strong>：週1冊、投資心理の本を読む</li>
  </ol>
</div>`
      }
    ],
    keyPoints: [
      '損失回避、確証バイアスなど主要な認知バイアスの理解と対策',
      'FOMOや群集心理などの市場心理の把握と克服方法',
      'メンタルアカウンティングの罠と合理的な資金管理',
      'システム1（直感）とシステム2（分析）の適切な使い分け',
      'ルールベースの投資と感情コントロールの実践方法'
    ],
    summary: `このレッスンでは、投資心理学と行動経済学の基礎を学習しました。人間の脳に組み込まれた認知バイアスや感情的な判断パターンを理解することで、より合理的な投資判断が可能になります。ルールベースの投資手法、投資日記の活用、テクノロジーの活用など、具体的な対策を実践することで、心理的な罠を回避し、長期的に成功する投資家への道筋が見えてきます。`,
    practicalExamples: [
      'バブル期の熱狂とその後の暴落における投資家心理の変遷',
      'コロナショック時のパニック売りと冷静な投資家の対応差',
      '仮想通貨ブームにおけるFOMOと適切なリスク管理',
      '個人投資家の典型的な失敗パターンと成功者の違い'
    ],
    warningNotes: [
      '心理学の知識だけでは投資は成功しません。基礎的な金融知識も必要です',
      '完全に感情を排除することは不可能。適切にコントロールすることが重要',
      '過度な自己分析は逆効果。シンプルなルールから始めましょう',
      '投資心理の改善には時間がかかります。焦らず継続的に取り組んでください'
    ]
  },

  quiz: [
    {
      id: 'financial-literacy-12-q1',
      question: '損失回避バイアスによる典型的な投資行動はどれですか？',
      options: [
        '利益が出ている株を長期保有する',
        '損失が出ている株を売れずに塩漬けにする',
        '分散投資を積極的に行う',
        '定期的にリバランスを実施する'
      ],
      correctAnswer: 1,
      explanation: '損失回避バイアスにより、人は損失を確定させることを避け、含み損を抱えた株を売れずに塩漬けにしてしまう傾向があります。'
    },
    {
      id: 'financial-literacy-12-q2',
      question: 'FOMO（Fear of Missing Out）への対策として最も効果的なものは？',
      options: [
        'SNSで投資情報を常にチェックする',
        '話題の銘柄にすぐに投資する',
        '事前に立てた投資計画に従う',
        '他の投資家の動向を常に観察する'
      ],
      correctAnswer: 2,
      explanation: 'FOMOに対する最も効果的な対策は、感情に流されず、事前に立てた投資計画やルールに従うことです。'
    },
    {
      id: 'financial-literacy-12-q3',
      question: 'メンタルアカウンティングの例として適切なものは？',
      options: [
        'すべての資産を統合的に管理する',
        'ボーナスは「あぶく銭」として浪費する',
        '投資の記録を詳細につける',
        'リスクとリターンを計算する'
      ],
      correctAnswer: 1,
      explanation: 'メンタルアカウンティングは、同じお金でも出所によって異なる価値を感じる心理で、ボーナスを「あぶく銭」として浪費するのが典型例です。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};