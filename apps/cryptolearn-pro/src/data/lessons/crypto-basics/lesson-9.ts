import type { Lesson } from '../../../types';

export const lesson9: Lesson = {
  id: 'crypto-basics-9',
  categoryId: 'crypto-basics',
  title: 'How to Buy Your First Cryptocurrency - 初回購入ガイド',
  slug: 'buy-first-cryptocurrency',
  description: '暗号通貨の初回購入プロセス、必要な準備、ステップバイステップガイド、注意点を詳しく解説します。',
  difficultyLevel: 'beginner',
  estimatedMinutes: 26,
  orderIndex: 9,
  content: {
    sections: [
      {
        id: 'section-1',
        title: '購入前の準備',
        orderIndex: 1,
        type: 'text',
        content: `
<p>暗号通貨への初回投資は、適切な準備とリスク管理が成功の鍵となります。<br/>
2025年現在、暗号通貨市場は成熟化が進み、初心者でも安全にアクセスできる環境が整っています。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年版：暗号通貨投資の事前準備</h2>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem;">
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #fef2f2; border-radius: 8px; border-left: 4px solid #dc2626;">
      <div style="background: #dc2626; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">📋</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #dc2626;">本人確認書類（KYC）</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">日本の仮想通貨交換業者では法律により本人確認が必須</p>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; margin: 0.5rem 0;">
          <div style="background: white; padding: 0.5rem; border-radius: 4px; font-size: 0.85em;">・運転免許証</div>
          <div style="background: white; padding: 0.5rem; border-radius: 4px; font-size: 0.85em;">・マイナンバーカード</div>
          <div style="background: white; padding: 0.5rem; border-radius: 4px; font-size: 0.85em;">・パスポート</div>
          <div style="background: white; padding: 0.5rem; border-radius: 4px; font-size: 0.85em;">・健康保険証</div>
        </div>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
      <div style="background: #3b82f6; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">💰</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #2563eb;">投資額決定（最重要原則）</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">暗号通貨投資の黄金ルール：「失っても生活に影響しない余裕資金のみ」</p>
        <table style="width: 100%; margin: 0.5rem 0; font-size: 0.85em;">
          <tr><td style="background: #dbeafe; padding: 0.3rem; border-radius: 4px; font-weight: bold;">初回推奨額</td><td style="padding: 0.3rem;">1-5万円程度</td></tr>
          <tr><td style="background: #dbeafe; padding: 0.3rem; border-radius: 4px; font-weight: bold;">総投資額上限</td><td style="padding: 0.3rem;">可処分所得の5-10%以下</td></tr>
          <tr><td style="background: #dbeafe; padding: 0.3rem; border-radius: 4px; font-weight: bold;">生活費の分離</td><td style="padding: 0.3rem;">生活費・緊急資金とは完全分離</td></tr>
        </table>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #16a34a;">
      <div style="background: #16a34a; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">🔐</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #16a34a;">セキュリティ基礎知識の習得</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">投資開始前に必須のセキュリティ知識を身につける</p>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; margin: 0.5rem 0;">
          <div style="background: white; padding: 0.5rem; border-radius: 4px; font-size: 0.85em;">・2FA認証設定</div>
          <div style="background: white; padding: 0.5rem; border-radius: 4px; font-size: 0.85em;">・フィッシング詐欺対策</div>
          <div style="background: white; padding: 0.5rem; border-radius: 4px; font-size: 0.85em;">・ウォレット管理</div>
          <div style="background: white; padding: 0.5rem; border-radius: 4px; font-size: 0.85em;">・秘密鍵の重要性</div>
        </div>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #fdf4ff; border-radius: 8px; border-left: 4px solid #a855f7;">
      <div style="background: #a855f7; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">🏦</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #9333ea;">銀行口座の準備</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">取引所との入出金用に、手数料の安い銀行口座を準備</p>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; margin: 0.5rem 0;">
          <div style="background: white; padding: 0.5rem; border-radius: 4px; font-size: 0.85em;">・ネット銀行推奨</div>
          <div style="background: white; padding: 0.5rem; border-radius: 4px; font-size: 0.85em;">・24時間振込対応</div>
        </div>
      </div>
    </div>
    
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年日本の取引所選択ガイド</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white;">
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">取引所</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">特徴</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">入金手数料</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">初心者おすすめ度</th>
</tr>
</thead>
<tbody>
<tr style="background: #dcfce7;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">bitFlyer</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">国内最大手、UI優秀</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">銀行振込: 330円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #16a34a; font-weight: bold;">★★★★★</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">Coincheck</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">アプリ使いやすい</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">銀行振込: 770円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #16a34a; font-weight: bold;">★★★★☆</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">GMOコイン</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">手数料安い</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">銀行振込: 無料</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #16a34a; font-weight: bold;">★★★★★</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">bitbank</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">取引手数料最安</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">銀行振込: 無料</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">★★★☆☆</td>
</tr>
</tbody>
</table>

<div style="background: #fee2e2; border-left: 4px solid #ef4444; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #dc2626; display: flex; align-items: center;">⚡ 暗号通貨投資の大前提</h3>
<p style="margin: 0; font-weight: 700; color: #dc2626; font-size: 1.2em; text-align: center;">"Never invest more than you can afford to lose"</p>
<p style="margin: 0.5rem 0 0 0; color: #374151; text-align: center;">失っても生活に困らない金額のみ投資する。これは世界共通の投資原則です。</p>
</div>
        `
      },
      {
        id: 'section-2',
        title: 'ステップバイステップ購入ガイド',
        orderIndex: 2,
        type: 'text',
        content: `
<p>暗号通貨の購入は複雑に見えますが、5つのステップに分けることで安全かつ確実に実行できます。<br/>
2025年現在の最新環境に対応した具体的な手順を解説します。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">5ステップで完了する購入プロセス（2025年版）</h2>

<div style="display: grid; grid-template-columns: 1fr; gap: 2rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; padding: 2rem; position: relative;">
    <div style="position: absolute; top: -15px; left: 30px; background: #fbbf24; color: #92400e; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2em;">1</div>
    <h3 style="color: #ffffff; margin: 0 0 1.5rem 0; font-size: 1.4em; padding-left: 2rem;">取引所の選択と口座開設</h3>
    
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0;">
      <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
        <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">bitFlyer</h4>
        <p style="margin: 0; font-size: 0.9em;">日本最大手、使いやすい</p>
      </div>
      <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
        <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">Coincheck</h4>
        <p style="margin: 0; font-size: 0.9em;">多様なサービス、アプリ優秀</p>
      </div>
      <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
        <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">GMOコイン</h4>
        <p style="margin: 0; font-size: 0.9em;">手数料安い、多機能</p>
      </div>
      <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
        <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">bitbank</h4>
        <p style="margin: 0; font-size: 0.9em;">取引手数料安い、中級者向け</p>
      </div>
    </div>
    
    <div style="background: rgba(255,255,255,0.15); border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
      <p style="margin: 0 0 0.5rem 0; font-weight: bold; color: #90EE90;">口座開設手順:</p>
      <ol style="margin: 0; padding-left: 1.2rem; line-height: 1.8;">
        <li>公式サイトへアクセス（必ずブックマーク）</li>
        <li>メールアドレス・パスワード設定</li>
        <li>SMS認証</li>
        <li>本人確認書類のアップロード</li>
        <li>住所確認（郵送またはオンライン）</li>
        <li>審査完了（1-3日）</li>
      </ol>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 16px; padding: 2rem; position: relative;">
    <div style="position: absolute; top: -15px; left: 30px; background: #fbbf24; color: #92400e; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2em;">2</div>
    <h3 style="color: #ffffff; margin: 0 0 1.5rem 0; font-size: 1.4em; padding-left: 2rem;">セキュリティ設定</h3>
    
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
      <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
        <h4 style="margin: 0 0 0.5rem 0; color: #90EE90;">✓ 2FAの有効化</h4>
        <p style="margin: 0; font-size: 0.9em;">Google Authenticatorを推奨</p>
      </div>
      <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
        <h4 style="margin: 0 0 0.5rem 0; color: #90EE90;">✓ ログイン通知</h4>
        <p style="margin: 0; font-size: 0.9em;">不正アクセス検知</p>
      </div>
      <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
        <h4 style="margin: 0 0 0.5rem 0; color: #90EE90;">✓ 出金パスワード</h4>
        <p style="margin: 0; font-size: 0.9em;">別途設定で二重保護</p>
      </div>
      <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
        <h4 style="margin: 0 0 0.5rem 0; color: #90EE90;">✓ IP制限設定</h4>
        <p style="margin: 0; font-size: 0.9em;">固定IPがある場合</p>
      </div>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 16px; padding: 2rem; position: relative;">
    <div style="position: absolute; top: -15px; left: 30px; background: #fbbf24; color: #92400e; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2em;">3</div>
    <h3 style="color: #ffffff; margin: 0 0 1.5rem 0; font-size: 1.4em; padding-left: 2rem;">入金方法の選択</h3>
    
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
      <div style="background: rgba(255,255,255,0.15); border: 2px solid #90EE90; border-radius: 8px; padding: 1rem;">
        <h4 style="margin: 0 0 0.5rem 0; color: #90EE90;">🏆 銀行振込（推奨）</h4>
        <p style="margin: 0; font-size: 0.9em;">手数料: 220-770円</p>
        <p style="margin: 0; font-size: 0.9em;">時間: 営業時間内1時間</p>
        <p style="margin: 0.5rem 0 0 0; font-weight: bold; color: #90EE90;">安全で低コスト</p>
      </div>
      
      <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
        <h4 style="margin: 0 0 0.5rem 0; color: #FFB6C1;">⚡ クレジットカード</h4>
        <p style="margin: 0; font-size: 0.9em;">手数料: 3-5%</p>
        <p style="margin: 0; font-size: 0.9em;">時間: 即時</p>
        <p style="margin: 0.5rem 0 0 0; font-weight: bold; color: #FFB6C1;">高額手数料に注意</p>
      </div>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 16px; padding: 2rem; position: relative;">
    <div style="position: absolute; top: -15px; left: 30px; background: #fbbf24; color: #92400e; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2em;">4</div>
    <h3 style="color: #ffffff; margin: 0 0 1.5rem 0; font-size: 1.4em; padding-left: 2rem;">初回購入の実行</h3>
    
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
      <div style="background: rgba(255,255,255,0.15); border: 2px solid #fbbf24; border-radius: 8px; padding: 1rem; text-align: center;">
        <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">₿ Bitcoin (BTC)</h4>
        <p style="margin: 0; font-size: 0.9em;">最も安定、認知度が高い</p>
        <p style="margin: 0.5rem 0 0 0; font-weight: bold;">初心者に最適</p>
      </div>
      
      <div style="background: rgba(255,255,255,0.15); border: 2px solid #a855f7; border-radius: 8px; padding: 1rem; text-align: center;">
        <h4 style="margin: 0 0 0.5rem 0; color: #a855f7;">Ξ Ethereum (ETH)</h4>
        <p style="margin: 0; font-size: 0.9em;">第二の暗号通貨、機能性高い</p>
        <p style="margin: 0.5rem 0 0 0; font-weight: bold;">次のステップに最適</p>
      </div>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); color: white; border-radius: 16px; padding: 2rem; position: relative;">
    <div style="position: absolute; top: -15px; left: 30px; background: #fbbf24; color: #92400e; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2em;">5</div>
    <h3 style="color: #ffffff; margin: 0 0 1.5rem 0; font-size: 1.4em; padding-left: 2rem;">ウォレットへの移動</h3>
    
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1.5rem; text-align: center;">
      <p style="margin: 0; font-size: 1.2em; font-weight: bold;">重要: 取引所は一時的な保管場所</p>
      <p style="margin: 1rem 0 0 0; font-size: 1em;">購入後は速やかに自己管理ウォレットへ移動</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9em; font-style: italic;">"Not your keys, not your crypto"</p>
    </div>
  </div>
</div>
        `
      },
      {
        id: 'section-3',
        title: '購入方法別の比較',
        orderIndex: 3,
        type: 'text',
        content: `
<p>暗号通貨購入時の入金方法選択は、手数料とセキュリティのバランスが重要です。<br/>
2025年現在の各入金方法の特徴を詳しく比較し、最適な選択をサポートします。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年版：入金方法の詳細比較</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white;">
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">入金方法</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">手数料</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">処理時間</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">セキュリティ</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">推奨度</th>
</tr>
</thead>
<tbody>
<tr style="background: #e6ffed; border: 2px solid #16a34a;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">🏛️ 銀行振込</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">220-770円</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">営業時間内1時間</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #16a34a; font-weight: bold;">高い</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">⭐⭐⭐⭐⭐</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">💨 クイック入金</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">770円程度</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">即時反映</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #16a34a; font-weight: bold;">高い</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">⭐⭐⭐⭐☆</td>
</tr>
<tr style="background: #fef2f2;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">💳 クレジットカード</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #ef4444; font-weight: bold;">3-5%</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">即時</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">中</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">⭐⭐☆☆☆</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">🏪 コンビニ入金</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">770円程度</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">即時-1時間</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #16a34a; font-weight: bold;">高い</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">⭐⭐⭐☆☆</td>
</tr>
</tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">ドルコスト平均法（DCA）</h2>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; padding: 2rem; margin: 2rem 0;">
  <h3 style="color: #ffffff; margin: 0 0 1.5rem 0; font-size: 1.4em; text-align: center;">📈 初心者に最適な購入戦略</h3>
  
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;">
    <div style="background: rgba(255,255,255,0.1); border-radius: 12px; padding: 1.5rem;">
      <h4 style="margin: 0 0 1rem 0; color: #fbbf24; font-size: 1.2em;">🎯 DCAの特徴</h4>
      <ul style="margin: 0; padding-left: 1rem; line-height: 1.8;">
        <li>毎月固定額を継続購入</li>
        <li>価格変動リスクを分散</li>
        <li>感情的な判断を避ける</li>
        <li>長期的な成長に最適</li>
      </ul>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); border-radius: 12px; padding: 1.5rem;">
      <h4 style="margin: 0 0 1rem 0; color: #90EE90; font-size: 1.2em;">💡 実例: 月1万円のDCA</h4>
      <div style="background: rgba(255,255,255,0.15); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
        <p style="margin: 0; font-size: 0.9em;">BTC価格 $30,000時: 0.000333 BTC購入</p>
      </div>
      <div style="background: rgba(255,255,255,0.15); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
        <p style="margin: 0; font-size: 0.9em;">BTC価格 $60,000時: 0.000167 BTC購入</p>
      </div>
      <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
        <p style="margin: 0; font-weight: bold;">平均取得価格: $40,000相当</p>
      </div>
    </div>
  </div>
</div>

<div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 なぜDCAが効果的なのか？</h3>
<p style="margin: 0.5rem 0 0 0; color: #374151; line-height: 1.6;">暗号通貨市場は変動が激しく、最適な購入タイミングを予測することは困難です。DCAにより、高値掴みのリスクを軽減し、長期的に平均的な価格で購入できます。</p>
</div>
        `
      },
      {
        id: 'section-4',
        title: 'よくある失敗と対策',
        orderIndex: 4,
        type: 'text',
        content: `
<p>初心者が暗号通貨投資で犯しやすい失敗には共通パターンがあります。<br/>
2025年現在の最新詐欺手法も含め、事前に対策を知ることで被害を防げます。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年版：初心者が陥りやすい失敗と対策</h2>

<div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin: 2rem 0;">
  <div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #dc2626; margin: 0 0 1rem 0; display: flex; align-items: center;">😰 FOMO (Fear of Missing Out)</h3>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
      <div>
        <p style="margin: 0 0 0.5rem 0; font-weight: bold; color: #dc2626;">問題:</p>
        <ul style="margin: 0; padding-left: 1rem; color: #374151;">
          <li>急激な価格上昇を見て慌てて大量購入</li>
          <li>感情的な判断による高値掴み</li>
        </ul>
      </div>
      <div>
        <p style="margin: 0 0 0.5rem 0; font-weight: bold; color: #16a34a;">対策:</p>
        <ul style="margin: 0; padding-left: 1rem; color: #374151;">
          <li>投資計画を事前に決めて守る</li>
          <li>冷静な判断力を保つ</li>
        </ul>
      </div>
    </div>
  </div>

  <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #d97706; margin: 0 0 1rem 0; display: flex; align-items: center;">📉 パニック売り</h3>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
      <div>
        <p style="margin: 0 0 0.5rem 0; font-weight: bold; color: #d97706;">問題:</p>
        <ul style="margin: 0; padding-left: 1rem; color: #374151;">
          <li>価格下落時の恐怖による売却</li>
          <li>短期的な変動に過度に反応</li>
        </ul>
      </div>
      <div>
        <p style="margin: 0 0 0.5rem 0; font-weight: bold; color: #16a34a;">対策:</p>
        <ul style="margin: 0; padding-left: 1rem; color: #374151;">
          <li>長期視点の維持</li>
          <li>投資額を生活に影響しない範囲に制限</li>
        </ul>
      </div>
    </div>
  </div>

  <div style="background: #f0f9ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #2563eb; margin: 0 0 1rem 0; display: flex; align-items: center;">🏛️ 取引所での長期保管</h3>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
      <div>
        <p style="margin: 0 0 0.5rem 0; font-weight: bold; color: #2563eb;">問題:</p>
        <ul style="margin: 0; padding-left: 1rem; color: #374151;">
          <li>ハッキングや破綻リスク</li>
          <li>第三者による資産管理</li>
        </ul>
      </div>
      <div>
        <p style="margin: 0 0 0.5rem 0; font-weight: bold; color: #16a34a;">対策:</p>
        <ul style="margin: 0; padding-left: 1rem; color: #374151;">
          <li>購入後は速やかにウォレットへ移動</li>
          <li>「Not your keys, not your crypto」を実践</li>
        </ul>
      </div>
    </div>
  </div>

  <div style="background: #fdf4ff; border: 2px solid #a855f7; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #9333ea; margin: 0 0 1rem 0; display: flex; align-items: center;">🎣 2025年急増：AI生成フィッシング詐欺</h3>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
      <div>
        <p style="margin: 0 0 0.5rem 0; font-weight: bold; color: #9333ea;">問題:</p>
        <ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
          <li>ChatGPT等AIで作られた精巧な偽サイト</li>
          <li>完璧な日本語の詐欺メール</li>
          <li>有名人の偽動画・偽音声広告</li>
          <li>SNSでの偽アカウント大量発生</li>
        </ul>
      </div>
      <div>
        <p style="margin: 0 0 0.5rem 0; font-weight: bold; color: #16a34a;">対策:</p>
        <ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
          <li>URLを1文字単位で必ず確認</li>
          <li>公式サイトのブックマーク利用必須</li>
          <li>「急いで」は詐欺のサイン</li>
          <li>Google検索で公式サイト再確認</li>
        </ul>
      </div>
    </div>
    <div style="background: #c084fc; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
      <p style="margin: 0; font-weight: bold; color: white; text-align: center;">2025年の新手口：deepfake技術を使った有名人の偽推奨動画に要注意</p>
    </div>
  </div>

  <div style="background: #f0fdf4; border: 2px solid #16a34a; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #16a34a; margin: 0 0 1rem 0; display: flex; align-items: center;">📋 税務処理の無視</h3>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
      <div>
        <p style="margin: 0 0 0.5rem 0; font-weight: bold; color: #16a34a;">問題:</p>
        <ul style="margin: 0; padding-left: 1rem; color: #374151;">
          <li>売却益は雑所得として申告が必要</li>
          <li>追徴課税のリスク</li>
        </ul>
      </div>
      <div>
        <p style="margin: 0 0 0.5rem 0; font-weight: bold; color: #16a34a;">対策:</p>
        <ul style="margin: 0; padding-left: 1rem; color: #374151;">
          <li>取引記録の保存</li>
          <li>年間20万円超は必ず申告</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">成功のための投資原則</h2>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem; text-align: center;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0;">💰 資金管理</h3>
    <p style="margin: 0; line-height: 1.6;">投資は余裕資金で行い、生活費とは明確に分離する</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem; text-align: center;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0;">🎯 分散投資</h3>
    <p style="margin: 0; line-height: 1.6;">単一通貨でなく複数の暗号通貨でリスクを分散</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem; text-align: center;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0;">⏰ 長期視点</h3>
    <p style="margin: 0; line-height: 1.6;">短期的な変動に惑わされず長期的な成長を見据える</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 12px; padding: 1.5rem; text-align: center;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0;">🧠 感情制御</h3>
    <p style="margin: 0; line-height: 1.6;">感情的な取引を避け、計画に基づいた行動を取る</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); color: white; border-radius: 12px; padding: 1.5rem; text-align: center;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0;">📚 継続学習</h3>
    <p style="margin: 0; line-height: 1.6;">暗号通貨や投資について継続的に学習を続ける</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #a855f7 0%, #e879f9 100%); color: white; border-radius: 12px; padding: 1.5rem; text-align: center;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0;">🔍 情報収集</h3>
    <p style="margin: 0; line-height: 1.6;">公式情報源を重視し、複数の情報源で確認</p>
  </div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">🎯 成功への近道</h3>
<p style="margin: 0.5rem 0 0 0; color: #374151; line-height: 1.6;">暗号通貨投資の成功は、一夜にして大きな利益を得ることではなく、適切なリスク管理のもとで長期的に資産を増やすことです。焦らず、着実に学習しながら投資経験を積んでいきましょう。</p>
</div>
        `
      },
      {
        id: 'section-5',
        title: '2025年日本の税務・法的側面（重要）',
        orderIndex: 5,
        type: 'text',
        content: `
<p>暗号通貨投資では購入時だけでなく、保有・売却・税務処理まで総合的に理解することが重要です。<br/>
2025年現在の日本の法的枠組みと税務ルールを正確に把握しましょう。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年版：日本の暗号資産税制</h2>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem;">
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #fef2f2; border-radius: 8px; border-left: 4px solid #dc2626;">
      <div style="background: #dc2626; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">💰</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #dc2626;">雑所得としての扱い</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">暗号資産の売却益は原則として雑所得。総合課税で最高税率55%（所得税45%+住民税10%）</p>
        <div style="background: white; padding: 1rem; border-radius: 8px; margin: 0.5rem 0;">
          <table style="width: 100%; font-size: 0.85em;">
            <tr><td style="font-weight: bold; padding: 0.2rem;">年間利益</td><td style="padding: 0.2rem;">税率目安</td></tr>
            <tr><td style="padding: 0.2rem;">20万円以下</td><td style="padding: 0.2rem; color: #16a34a;">申告不要（給与所得者）</td></tr>
            <tr><td style="padding: 0.2rem;">195万円以下</td><td style="padding: 0.2rem;">15%（所得税5%+住民税10%）</td></tr>
            <tr><td style="padding: 0.2rem;">330万円以下</td><td style="padding: 0.2rem;">25%（所得税15%+住民税10%）</td></tr>
            <tr><td style="padding: 0.2rem;">695万円以下</td><td style="padding: 0.2rem;">30%（所得税20%+住民税10%）</td></tr>
            <tr><td style="padding: 0.2rem;">900万円以上</td><td style="padding: 0.2rem; color: #dc2626;">55%（所得税45%+住民税10%）</td></tr>
          </table>
        </div>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
      <div style="background: #3b82f6; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">📋</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #2563eb;">課税対象となる取引</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">保有しているだけでは課税されないが、以下の場合に課税対象となる</p>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; margin: 0.5rem 0;">
          <div style="background: white; padding: 0.5rem; border-radius: 4px; font-size: 0.85em;">・日本円への売却</div>
          <div style="background: white; padding: 0.5rem; border-radius: 4px; font-size: 0.85em;">・他の暗号資産との交換</div>
          <div style="background: white; padding: 0.5rem; border-radius: 4px; font-size: 0.85em;">・商品・サービスの購入</div>
          <div style="background: white; padding: 0.5rem; border-radius: 4px; font-size: 0.85em;">・ステーキング報酬の受領</div>
        </div>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #16a34a;">
      <div style="background: #16a34a; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">🧮</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #16a34a;">損益計算方法（移動平均法）</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">2025年現在、個人は移動平均法が原則。総平均法も選択可能</p>
        <div style="background: white; padding: 1rem; border-radius: 8px; margin: 0.5rem 0; font-size: 0.85em;">
          <p style="margin: 0; font-weight: bold; color: #16a34a;">移動平均法の計算例：</p>
          <p style="margin: 0.5rem 0 0 0;">1月: 1 BTC を500万円で購入 → 平均取得価格 500万円</p>
          <p style="margin: 0;">3月: 1 BTC を700万円で購入 → 平均取得価格 600万円</p>
          <p style="margin: 0;">5月: 1 BTC を800万円で売却 → 売却益 200万円（800万円 - 600万円）</p>
        </div>
      </div>
    </div>
    
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年の法的環境と規制</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white;">
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">項目</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">2025年現在の状況</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">投資家への影響</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">ステーブルコイン</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">電子決済手段として規制</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">USDC、USDTの取引制限あり</td>
</tr>
<tr style="background: #dcfce7;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">DeFi参加</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #16a34a;">基本的に自由</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">ただし税務処理は複雑</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">NFT取引</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #16a34a;">非暗号資産として扱い</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">アート作品と同様の税務処理</td>
</tr>
<tr style="background: #fef3c7;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">海外取引所</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #f59e0b;">金融庁警告あり</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">利用は自己責任、税務申告必要</td>
</tr>
</tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">確定申告の実践的手順</h2>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem; text-align: center;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0;">📊 記録管理</h3>
    <ul style="margin: 0; padding-left: 1rem; text-align: left; font-size: 0.9em; line-height: 1.6;">
      <li>全取引の日時・価格・数量記録</li>
      <li>取引所からのCSVダウンロード</li>
      <li>DeFi取引もブロックチェーン記録</li>
    </ul>
  </div>
  
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem; text-align: center;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0;">🧮 計算ツール</h3>
    <ul style="margin: 0; padding-left: 1rem; text-align: left; font-size: 0.9em; line-height: 1.6;">
      <li>Cryptact（推奨）</li>
      <li>Gtax</li>
      <li>CoinPost計算ツール</li>
      <li>税理士への依頼も検討</li>
    </ul>
  </div>
  
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem; text-align: center;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0;">📋 申告書作成</h3>
    <ul style="margin: 0; padding-left: 1rem; text-align: left; font-size: 0.9em; line-height: 1.6;">
      <li>確定申告書B使用</li>
      <li>雑所得の「その他」に記入</li>
      <li>計算明細書の添付</li>
      <li>3月15日までに提出</li>
    </ul>
  </div>
</div>

<div style="background: #fee2e2; border-left: 4px solid #ef4444; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #dc2626; display: flex; align-items: center;">⚠️ 2025年の重要な注意点</h3>
<ul style="margin: 0.5rem 0 0 1.5rem; color: #374151;">
  <li><strong>税務調査の強化：</strong> 国税庁が暗号資産取引の監視を強化</li>
  <li><strong>取引所からの情報提供：</strong> 年間100万円超の取引は税務署に報告</li>
  <li><strong>ブロックチェーン分析：</strong> 取引の追跡技術が向上</li>
  <li><strong>無申告加算税：</strong> 基本税額の最大20%の追加課税</li>
</ul>
</div>

<div style="background: #dcfce7; border-left: 4px solid #16a34a; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #16a34a; display: flex; align-items: center;">✅ 推奨される税務対策</h3>
<ul style="margin: 0.5rem 0 0 1.5rem; color: #374151;">
  <li><strong>取引記録の自動化：</strong> API連携で取引履歴を自動取得</li>
  <li><strong>定期的な損益確認：</strong> 月次で税務上の損益を把握</li>
  <li><strong>年末調整：</strong> 12月に利益確定・損失確定を検討</li>
  <li><strong>専門家への相談：</strong> 年間500万円超なら税理士推奨</li>
</ul>
</div>
        `
      }
    ],
    keyPoints: [
      '失っても生活に影響しない金額のみ投資する',
      '信頼できる取引所を選んで口座開設',
      '2FAなどセキュリティ設定を必ず行う',
      'Bitcoin·Ethereumから始めるのが無難',
      'ドルコスト平均法で感情的な判断を避ける',
      '購入後は速やかに自己管理ウォレットへ移動'
    ],
    summary: '初回の暗号通貨購入は、適切な準備と段階的なアプローチが重要です。信頼できる取引所での口座開設、セキュリティ設定、少額からの開始、そして継続的な学習により、安全で効果的な投資を始められます。',
    practicalExamples: [
      '2025年版初回購入例: GMOコインで1万円分のBitcoinを銀行振込（手数料無料）で購入、即日ハードウェアウォレットに移動',
      'DCA実践例: 毎月25日に住信SBIネット銀行から自動振込設定でbitbankに2万円入金、BTC70%・ETH30%で定期購入',
      '2025年セキュリティ例: Yubikey使用＋認証アプリ＋IP制限＋出金アドレス事前登録＋Ledger Nano X保管',
      '税務計算例: Cryptactで自動計算、2024年度350万円の売却益→約100万円の税額（所得税70万円＋住民税30万円）',
      '失敗回避例: AI生成の偽Coinbase広告を見抜く→URLが coinbase-japan.com ではなく coinbase-jp.net だった',
      'ハードウェアウォレット例: 100万円以上の保有→Ledger Nano Xを公式サイトで購入、秘密鍵を3箇所に分散保管'
    ],
    warningNotes: [
      '暗号通貨投資は元本割れリスクが高い',
      'レバレッジ取引は初心者には危険すぎる',
      '「必ず儲かる」という勧誘は詐欺',
      '他人に秘密鍵やパスワードを教えない',
      '急激な価格変動に心理的に左右されやすい',
      '税務処理を怠ると追徴課税のリスク'
    ]
  },
  quiz: [
    {
      id: 'crypto-basics-9-q1',
      question: '2025年現在、暗号通貨投資の最も重要な原則は何ですか？',
      options: [
        '借金してでも早く始める',
        '失っても生活に影響しない余裕資金のみ投資',
        '全財産の50%を投資する',
        '他人にお金を預けて投資してもらう'
      ],
      correctAnswer: 1,
      explanation: '「Never invest more than you can afford to lose」は世界共通の投資原則です。暗号通貨は特に高リスクのため、失っても生活に困らない余裕資金のみで投資することが極めて重要です。'
    },
    {
      id: 'crypto-basics-9-q2',
      question: '2025年版の初心者向け暗号通貨購入戦略として最適なものは？',
      options: [
        '価格が上がっているときに一括購入',
        'ドルコスト平均法（定期積立）で分散購入',
        'レバレッジ取引で短期利益を狙う',
        'インフルエンサーの推奨に従って購入'
      ],
      correctAnswer: 1,
      explanation: 'ドルコスト平均法（DCA）は価格変動リスクを分散し、感情的な判断（FOMO、パニック売り）を避けられるため、2025年でも初心者に最適な戦略です。毎月一定額を継続購入することで平均取得価格を安定させられます。'
    },
    {
      id: 'crypto-basics-9-q3',
      question: '2025年現在、日本で暗号通貨を購入した後の資産管理で重要なことは？',
      options: [
        '取引所に預けたまま放置する',
        'できるだけ早く自己管理ウォレットに移動する',
        '毎日トレードして利益を狙う',
        'SNSで投資状況を公開する'
      ],
      correctAnswer: 1,
      explanation: '「Not your keys, not your crypto」の原則に従い、購入後は速やかに自己管理ウォレット（ハードウェアウォレット推奨）へ移動することが重要です。取引所のハッキングや破綻リスクを避けるため、長期保有分は必ず自分で管理しましょう。'
    },
    {
      id: 'crypto-basics-9-q4',
      question: '2025年現在、取引所のセキュリティ設定で最も推奨される2FA方法は？',
      options: [
        'SMS（ショートメッセージ）認証',
        'メール認証のみ',
        '認証アプリ（Google Authenticator、Authy等）',
        '2FA設定なし'
      ],
      correctAnswer: 2,
      explanation: '2025年現在、SIMスワップ攻撃が急増しているため、SMS認証は危険です。Google AuthenticatorやAuthy等の認証アプリが最も安全です。さらにハードウェアキー（YubiKey等）があれば完璧です。'
    },
    {
      id: 'crypto-basics-9-q5',
      question: '2025年現在、初回の暗号通貨購入で最も手数料が安い日本の取引所は？',
      options: [
        'Coincheck（銀行振込770円）',
        'bitFlyer（銀行振込330円）',
        'GMOコイン（銀行振込無料）',
        'どれも手数料は同じ'
      ],
      correctAnswer: 2,
      explanation: '2025年現在、GMOコインは銀行振込手数料が無料のため、初心者にとって最もコストパフォーマンスが良い選択肢です。ただし、使いやすさやサポートも考慮して総合的に判断することが重要です。'
    },
    {
      id: 'crypto-basics-9-q6',
      question: '暗号通貨取引の税務処理について、2025年現在の正しい理解は？',
      options: [
        '暗号通貨の利益には税金がかからない',
        '年間20万円超の利益がある場合は確定申告が必要',
        '取引所が自動的に税金を計算してくれる',
        '海外取引所なら申告不要'
      ],
      correctAnswer: 1,
      explanation: '日本では暗号通貨の売買益は雑所得として扱われ、年間20万円を超える利益がある場合は確定申告が必要です。取引記録の保存と適切な申告を怠ると追徴課税のリスクがあります。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};