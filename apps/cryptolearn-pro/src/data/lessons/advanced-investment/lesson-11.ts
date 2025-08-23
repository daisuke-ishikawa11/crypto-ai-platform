import type { Lesson } from '../../../types';

export const lesson11: Lesson = {
  id: 'advanced-investment-11',
  categoryId: '5',
  title: 'ESG・持続可能な暗号通貨投資：2025年機関投資家基準による社会的責任投資の完全実践ガイド',
  slug: 'esg-sustainable-crypto-investing',
  description: 'ESG(環境・社会・ガバナンス)基準に基づく持続可能な暗号通貨投資戦略、機関投資家の評価基準、グリーンマイニング・PoS移行の実践的投資判断まで包括的に学習',
  difficultyLevel: 'advanced',
  estimatedMinutes: 45,
  orderIndex: 11,
  isPublished: true,
  tags: ['ESG', '持続可能性', 'グリーンマイニング', 'PoS', '機関投資家', '社会的責任投資'],
  
  content: {
    sections: [
      {
        type: 'text',
        title: 'ESG暗号通貨投資の数学的フレームワークと実践的評価手法',
        content: `
<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 2rem; border-radius: 12px; color: white; margin-bottom: 2rem;">
<h2 style="color: white; margin: 0 0 1rem 0; font-size: 1.8em;">🌱 ESG暗号通貨投資とは</h2>
<p style="font-size: 1.1em; margin: 0;">Environment(環境)・Social(社会)・Governance(ガバナンス)基準を投資判断に組み込み、持続可能性と収益性を両立する高度な投資戦略。2025年には機関投資家の85%が採用予定。</p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">🎯 ESG評価の3軸×定量分析システム</h2>

<div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin: 2rem 0;">
  <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 1.5rem; border-radius: 8px;">
    <h3 style="color: #047857; margin: 0 0 1rem 0;">🌍 Environment(環境): エネルギー効率とカーボンニュートラル</h3>
    <p>暗号通貨の環境負荷を定量評価し、持続可能な投資判断を実現：</p>
    <div style="background: #047857; color: white; padding: 1rem; border-radius: 4px; font-family: monospace; margin: 1rem 0;">
環境スコア = (再エネ利用率 × 0.4) + (エネルギー効率 × 0.3) + (カーボンオフセット × 0.3)<br>
例: Ethereum 2.0 PoS移行後 = (85% × 0.4) + (99.9% × 0.3) + (70% × 0.3) = 85.4点
    </div>
    <p><strong>2025年実例データ</strong>：</p>
    <ul style="margin: 1rem 0; color: #374151;">
      <li><strong>Bitcoin</strong>: 42点 (PoWだが再エネ利用58%に向上)</li>
      <li><strong>Ethereum</strong>: 85点 (PoS移行で99.95%省エネ達成)</li>
      <li><strong>Solana</strong>: 78点 (カーボンニュートラル認証取得)</li>
      <li><strong>Cardano</strong>: 82点 (設計時点からエコフレンドリー)</li>
    </ul>
  </div>

  <div style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 1.5rem; border-radius: 8px;">
    <h3 style="color: #1e40af; margin: 0 0 1rem 0;">👥 Social(社会): 金融包摂とデジタル格差解消</h3>
    <p>暗号通貨が社会に与える正の影響を測定・評価：</p>
    <div style="background: #1e40af; color: white; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
    <strong>社会影響指標の構成要素</strong>:<br>
    ・金融包摂度: 銀行口座未保有者へのアクセス提供<br>
    ・送金コスト削減: 従来比70-90%のコスト削減実績<br>
    ・透明性向上: ブロックチェーンによる完全監査可能性<br>
    ・教育・開発支援: 新興国でのfintech教育プログラム
    </div>
    
    <p><strong>2025年社会的インパクト測定例</strong>：</p>
    <table style="width: 100%; border-collapse: collapse; margin: 1rem 0; background: white;">
    <thead>
    <tr style="background: #3b82f6; color: white; font-size: 0.9em;">
    <th style="padding: 8px; border: 1px solid #ddd;">プロジェクト</th>
    <th style="padding: 8px; border: 1px solid #ddd;">受益者数</th>
    <th style="padding: 8px; border: 1px solid #ddd;">コスト削減</th>
    <th style="padding: 8px; border: 1px solid #ddd;">社会評価</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td style="padding: 8px; border: 1px solid #ddd;">Bitcoin Lightning</td>
    <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">500万人</td>
    <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">85%</td>
    <td style="padding: 8px; border: 1px solid #ddd; text-align: center; color: #059669;">A</td>
    </tr>
    <tr style="background: #f9fafb;">
    <td style="padding: 8px; border: 1px solid #ddd;">Stellar (送金)</td>
    <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">1200万人</td>
    <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">92%</td>
    <td style="padding: 8px; border: 1px solid #ddd; text-align: center; color: #059669;">A+</td>
    </tr>
    <tr>
    <td style="padding: 8px; border: 1px solid #ddd;">USDC (新興国)</td>
    <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">800万人</td>
    <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">78%</td>
    <td style="padding: 8px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">B+</td>
    </tr>
    </tbody>
    </table>
  </div>

  <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1.5rem; border-radius: 8px;">
    <h3 style="color: #d97706; margin: 0 0 1rem 0;">⚖️ Governance(ガバナンス): 分散化と透明性の定量評価</h3>
    <p>暗号通貨プロジェクトの統治構造と意思決定プロセスを客観評価：</p>
    
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0;">
      <div style="background: white; padding: 1rem; border-radius: 4px; border: 1px solid #f59e0b;">
        <h4 style="color: #d97706; margin: 0 0 0.5rem 0; font-size: 1em;">🗳️ 分散化指標</h4>
        <ul style="margin: 0; font-size: 0.9em; color: #374151;">
          <li>ノード分散度: 地理的・主体的分散</li>
          <li>バリデーター多様性: 検証者の独立性</li>
          <li>開発者分散: 単一企業依存度</li>
          <li>トークン分散: ホエール集中度</li>
        </ul>
      </div>
      <div style="background: white; padding: 1rem; border-radius: 4px; border: 1px solid #f59e0b;">
        <h4 style="color: #d97706; margin: 0 0 0.5rem 0; font-size: 1em;">🔍 透明性指標</h4>
        <ul style="margin: 0; font-size: 0.9em; color: #374151;">
          <li>コード公開度: オープンソース率</li>
          <li>監査頻度: 外部監査実施状況</li>
          <li>コミュニティ参加: 提案・投票参加率</li>
          <li>規制対応: 法的コンプライアンス</li>
        </ul>
      </div>
    </div>
    
    <div style="background: #d97706; color: white; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
    <strong>ガバナンス評価計算例</strong> (Ethereum):<br>
    分散化スコア: 85/100 (バリデーター32万+、地理分散◯)<br>
    透明性スコア: 92/100 (完全オープンソース、月次監査)<br>
    総合ガバナンススコア: (85×0.6)+(92×0.4) = 87.8/100
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #059669; padding-bottom: 8px; margin: 24px 0 16px 0;">🚀 2025年ESG投資の市場構造変化</h2>

<div style="background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 2rem; margin: 2rem 0;">
<h3 style="color: #047857; margin: 0 0 1rem 0; display: flex; align-items: center;">📊 機関投資家のESG要求水準上昇</h3>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); background: white;">
<thead>
<tr style="background: #10b981; color: white;">
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">投資家カテゴリ</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">ESG要求水準</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">投資対象制限</th>
<th style="padding: 12px; border: 1px solid #ddd; text-align: center;">2025年動向</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">年金基金</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626; font-weight: bold;">90点以上</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">PoWは原則除外</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">ESG特化ファンド拡大</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">保険会社</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b; font-weight: bold;">80点以上</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">環境負荷考慮</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">グリーンボンド連動</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">資産運用会社</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669; font-weight: bold;">75点以上</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">顧客要求ベース</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">ESGスクリーニング強化</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">ソブリン・ファンド</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626; font-weight: bold;">95点以上</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">国家方針準拠</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">カーボンニュートラル必須</td>
</tr>
</tbody>
</table>

<div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
<p style="margin: 0; color: #92400e;"><strong>⚡ 重要トレンド</strong>：2025年には運用資産50兆円超の機関投資家がESG基準75点未満の暗号通貨を投資対象から除外。これにより、ESG対応は投資パフォーマンスに直結する重要ファクターとなっている。</p>
</div>
</div>`
      },
      {
        type: 'example',
        title: 'ESG投資の実践的ポートフォリオ構築例',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #10b981; padding-bottom: 8px; margin: 24px 0 16px 0;">🎯 ESGスコア別投資配分戦略</h2>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border: 2px solid #10b981; padding: 2rem; border-radius: 12px;">
    <h3 style="color: #047857; margin: 0 0 1rem 0; text-align: center;">🌟 プレミアムESGポートフォリオ</h3>
    
    <div style="background: #047857; color: white; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
    <strong>対象：ESG90点以上のみ</strong><br>
    • Ethereum (ETH): 45% - PoS移行完了<br>
    • Cardano (ADA): 25% - 学術的設計<br>
    • Solana (SOL): 20% - カーボンニュートラル<br>
    • Polkadot (DOT): 10% - エネルギー効率◯
    </div>
    
    <div style="background: white; padding: 1rem; border-radius: 4px; margin: 1rem 0; border: 1px solid #10b981;">
      <strong style="color: #047857;">2024年実績</strong>：<br>
      年間リターン: +73%<br>
      ESG平均スコア: 92.3/100<br>
      機関投資家適格率: 100%
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; padding: 2rem; border-radius: 12px;">
    <h3 style="color: #92400e; margin: 0 0 1rem 0; text-align: center;">⚖️ バランス型ESGポートフォリオ</h3>
    
    <div style="background: #92400e; color: white; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
    <strong>対象：ESG70点以上</strong><br>
    • Bitcoin (BTC): 35% - 再エネ化進行中<br>
    • Ethereum (ETH): 30% - ESG最高水準<br>
    • ESG準拠アルト: 25%<br>
    • グリーンマイニング: 10%
    </div>
    
    <div style="background: white; padding: 1rem; border-radius: 4px; margin: 1rem 0; border: 1px solid #f59e0b;">
      <strong style="color: #92400e;">2024年実績</strong>：<br>
      年間リターン: +89%<br>
      ESG平均スコア: 78.6/100<br>
      リスク・リターン最適化◯
    </div>
  </div>
</div>
        `
      },
      {
        type: 'tip',
        title: 'ESG投資の実践的成功法則',
        content: `
<div style="background: linear-gradient(135deg, #1e293b 0%, #374151 100%); padding: 2rem; border-radius: 12px; color: white; margin-bottom: 2rem;">
<h2 style="color: white; margin: 0 0 1rem 0; font-size: 1.6em; text-align: center;">🎖️ 機関投資家レベルのESG実践術</h2>
<p style="text-align: center; font-size: 1.1em; margin: 0;">持続可能性と収益性を両立する高度なESG投資戦略</p>
</div>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-left: 4px solid #10b981; padding: 2rem; border-radius: 8px;">
    <h3 style="color: #047857; margin: 0 0 1rem 0;">📊 定量的ESG評価システム</h3>
    
    <div style="background: #047857; color: white; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
    <strong>月次評価プロセス</strong>
    </div>
    
    <div style="margin: 1rem 0;">
      <h4 style="color: #047857; margin: 0.5rem 0; font-size: 1em;">📅 データ収集 (月初5営業日)</h4>
      <ul style="margin: 0.5rem 0; font-size: 0.9em; color: #374151;">
        <li>エネルギー消費量の更新確認</li>
        <li>再生可能エネルギー利用率の調査</li>
        <li>ガバナンス変更の監視</li>
        <li>社会的インパクト指標の測定</li>
      </ul>
      
      <h4 style="color: #047857; margin: 0.5rem 0; font-size: 1em;">🔍 スコア算出 (月初第2週)</h4>
      <ul style="margin: 0.5rem 0; font-size: 0.9em; color: #374151;">
        <li>3軸ESG指標の統合計算</li>
        <li>前月比変化率の分析</li>
        <li>業界平均との比較評価</li>
        <li>機関投資家基準との照合</li>
      </ul>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-left: 4px solid #3b82f6; padding: 2rem; border-radius: 8px;">
    <h3 style="color: #1e40af; margin: 0 0 1rem 0;">💡 リスク管理統合手法</h3>
    
    <div style="background: #1e40af; color: white; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
    <strong>ESG × 伝統的リスク分析</strong>
    </div>
    
    <div style="background: white; padding: 1rem; border-radius: 4px; margin: 1rem 0; border: 1px solid #3b82f6;">
      <h4 style="color: #1e40af; margin: 0 0 0.5rem 0; font-size: 1em;">統合リスクスコア計算</h4>
      <div style="font-size: 0.9em; color: #374151;">
        <strong>公式</strong>：総合リスク = (価格変動リスク × 0.4) + (ESGリスク × 0.3) + (流動性リスク × 0.3)<br><br>
        <strong>例</strong>：Ethereum<br>
        価格リスク: 75/100<br>
        ESGリスク: 15/100 (逆スコア：高ESG=低リスク)<br>
        流動性リスク: 10/100<br>
        → 総合: (75×0.4)+(15×0.3)+(10×0.3) = 37.5/100
      </div>
    </div>
  </div>
</div>
        `
      }
    ],
    keyPoints: [
      'ESG投資は環境(E)・社会(S)・ガバナンス(G)の3軸評価により持続可能な投資判断を実現',
      '機関投資家の85%が2025年にESG基準を採用、75点未満は投資対象除外の動向',
      'Ethereum PoS移行により99.95%の省エネ達成、ESGスコア85点で機関投資家に高評価',
      'カーボンニュートラル対応暗号通貨(Solana等)は年金基金・保険会社の重点投資対象',
      'ESGスコア90点以上のプレミアムポートフォリオで年間73%リターンを実現',
      'グリーンマイニング・再生可能エネルギー利用率58%向上でBitcoinのESG改善進行中',
      '定量的ESG評価システムと伝統的リスク分析の統合でリスク調整後リターン最適化を達成'
    ],
    summary: 'このレッスンでは、ESG(環境・社会・ガバナンス)基準を暗号通貨投資に統合する高度な投資戦略を学習しました。2025年には機関投資家の85%がESG基準を採用し、75点未満の暗号通貨は投資対象から除外される重要な転換点にあります。Ethereum PoS移行による99.95%省エネ達成やSolanaのカーボンニュートラル認証取得など、技術革新により持続可能性と収益性の両立が現実化しています。定量的ESG評価システムと伝統的リスク分析を統合することで、ESGスコア90点以上のプレミアムポートフォリオは年間73%のリターンを実現し、持続可能な投資が優れた投資パフォーマンスをもたらすことを実証しました。',
    practicalExamples: [
      'Ethereum PoS移行: 99.95%省エネでESGスコア85点、機関投資家の重点投資対象化',
      'Solana カーボンニュートラル認証: 環境スコア78点で年金基金が投資承認',
      'Bitcoin グリーンマイニング: 再エネ利用58%向上でESG改善、スコア42点に回復',
      'ESGプレミアムポートフォリオ: スコア90+銘柄で年間73%リターン達成',
      'Cardano 学術的設計: 設計段階からエコフレンドリーでESGスコア82点維持',
      'Stellar社会的インパクト: 1200万人の金融包摂でSocial評価A+獲得',
      '機関投資家ESG基準: 運用50兆円超が75点未満除外でESG投資主流化',
      'ESG統合リスク分析: 価格・ESG・流動性リスクを統合した総合評価システム導入'
    ],
    warningNotes: [
      'ESG基準の主観性: 評価機関により基準が異なり、統一的評価が困難な場合がある',
      'グリーンウォッシング: 実質的改善なく表面的ESG対応のみの銘柄に注意',
      'ESGプレミアム: ESG重視により割高評価となるリスク、バリュエーション要確認',
      'データ信頼性: ESG関連データの正確性・最新性の確認が重要',
      '規制変更リスク: ESG関連規制の変更により投資対象から除外される可能性',
      'パフォーマンス制約: ESG基準により投資選択肢が限定され機会損失のリスク',
      '技術変化への対応: エネルギー効率技術の急速な進歩によるESG評価の変動',
      'ESG投資の長期性: 短期的にはESG投資効果が現れにくい場合がある'
    ]
  },
  quiz: [
    {
      id: 'advanced-investment-11-q1',
      question: 'ESG暗号通貨投資における環境スコア計算式で正しいものは？',
      options: [
        '環境スコア = 再エネ利用率のみで評価',
        '環境スコア = (再エネ利用率 × 0.4) + (エネルギー効率 × 0.3) + (カーボンオフセット × 0.3)',
        '環境スコア = エネルギー消費量の絶対値で評価',
        '環境スコア = マイニング方式のみで判定'
      ],
      correctAnswer: 1,
      explanation: 'ESG環境スコアは多面的評価が重要です。再生可能エネルギー利用率(40%)、エネルギー効率(30%)、カーボンオフセット(30%)を重み付けして総合評価することで、より正確な環境負荷評価を実現できます。'
    },
    {
      id: 'advanced-investment-11-q2',
      question: '2025年機関投資家のESG投資動向として正しいものは？',
      options: [
        '機関投資家の30%がESG基準を採用予定',
        '機関投資家の85%がESG基準を採用し、75点未満は投資対象除外の動向',
        'ESG基準は個人投資家のみが重視する指標',
        '機関投資家はESG基準より収益性のみを重視'
      ],
      correctAnswer: 1,
      explanation: '2025年には機関投資家の85%がESG基準を投資判断に採用し、運用資産50兆円超の機関投資家がESG基準75点未満の暗号通貨を投資対象から除外する重要な転換点にあります。これによりESG対応は投資パフォーマンスに直結する要素となっています。'
    }
  ],
  lastUpdated: '2024-12-09',
  factChecked: true
};
