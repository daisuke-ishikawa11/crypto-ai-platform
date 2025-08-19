import type { Lesson } from '../../../types';

export const lesson21: Lesson = {
  id: 'crypto-basics-21',
  categoryId: 'crypto-basics',
  title: 'Cryptocurrency Taxation Basics - 暗号通貨税務の基礎',
  slug: 'crypto-taxation-basics',
  description: '暗号通貨取引にかかる税務処理の基本、主要国の課税方式、節税対策、記録管理の重要性を学びます。',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 25,
  orderIndex: 21,
  content: {
    sections: [
      {
        id: 'section-1',
        title: '2025年版：暗号通貨税務の基本概念',
        orderIndex: 1,
        type: 'text',
        content: `
<p>暗号通貨の税務処理は従来の投資とは異なる特殊な側面があり、2025年8月現在も多くの投資家が複雑さに直面しています。<br/>
特に、DeFi・NFT・ステーキング・AIエージェント取引の税務処理が新たな課題として浮上しています。</p>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; padding: 2rem; margin: 2rem 0; text-align: center;">
  <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.4em;">💰 2025年暗号通貨税務の現状</h3>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0;">
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🌐 課税対象国数</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">180+ヶ国で課税制度確立</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">📊 税務調査件数</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">前年比+400%（米国）</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🤖 自動追跡技術</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">Chainalysis・CipherTrace活用</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">⚖️ 新カテゴリ</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">DeFi・NFT・AIエージェント</p>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">課税の3つの基本原則（2025年版）</h2>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">📈 1. 実現主義</h3>
    <ul style="margin: 0; line-height: 1.6; color: #f0f0f0; font-size: 0.9em;">
      <li>保有のみでは課税されない</li>
      <li>売却・交換・使用時に課税イベント発生</li>
      <li>含み益には課税されない</li>
      <li>ステーキング報酬は受取時に課税</li>
    </ul>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0; text-align: center;">
      <p style="margin: 0; font-size: 0.85em; font-weight: bold;">2025年: DeFi報酬も同様ルール</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">📊 2. 計算方法</h3>
    <ul style="margin: 0; line-height: 1.6; color: #f0f0f0; font-size: 0.9em;">
      <li><strong>FIFO</strong>: 先入先出法</li>
      <li><strong>LIFO</strong>: 後入先出法</li>
      <li><strong>平均法</strong>: 移動・総平均</li>
      <li><strong>特定指定</strong>: 個別指定</li>
    </ul>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0; text-align: center;">
      <p style="margin: 0; font-size: 0.85em; font-weight: bold;">国により異なる計算方法採用</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🕒 3. 取得価格決定</h3>
    <ul style="margin: 0; line-height: 1.6; color: #f0f0f0; font-size: 0.9em;">
      <li>購入価格 + 手数料</li>
      <li>取引所レート（購入時点）</li>
      <li>複数回購入時の平均化処理</li>
      <li>分岐（フォーク）時の時価評価</li>
    </ul>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0; text-align: center;">
      <p style="margin: 0; font-size: 0.85em; font-weight: bold;">2025年: NFT・AI報酬も時価算定</p>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">2025年版：課税イベントの判定</h2>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
  <div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 16px; padding: 2rem;">
    <h3 style="color: #16a34a; margin: 0 0 1.5rem 0; font-size: 1.4em; text-align: center;">✅ 課税される取引</h3>
    
    <div style="background: white; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="color: #16a34a; margin: 0 0 0.5rem 0;">🔄 基本取引</h4>
      <ul style="margin: 0; color: #374151; line-height: 1.6; font-size: 0.9em;">
        <li>暗号通貨の売却（法定通貨との交換）</li>
        <li>暗号通貨同士の交換（BTC → ETH等）</li>
        <li>商品・サービスの支払いに使用</li>
        <li>マイニング・ステーキング報酬の受取</li>
      </ul>
    </div>

    <div style="background: white; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="color: #16a34a; margin: 0 0 0.5rem 0;">🆕 2025年新カテゴリ</h4>
      <ul style="margin: 0; color: #374151; line-height: 1.6; font-size: 0.9em;">
        <li>エアドロップ・フォーク報酬の受取</li>
        <li>DeFi流動性提供報酬</li>
        <li>NFT売却・ロイヤリティ収入</li>
        <li>AIエージェント取引利益</li>
      </ul>
    </div>
  </div>

  <div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 16px; padding: 2rem;">
    <h3 style="color: #ef4444; margin: 0 0 1.5rem 0; font-size: 1.4em; text-align: center;">❌ 課税されない取引</h3>
    
    <div style="background: white; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="color: #ef4444; margin: 0 0 0.5rem 0;">💰 非課税取引</h4>
      <ul style="margin: 0; color: #374151; line-height: 1.6; font-size: 0.9em;">
        <li>暗号通貨の購入（法定通貨で）</li>
        <li>ウォレット間の移動（自分名義）</li>
        <li>単純な保有（HODLing）</li>
        <li>ギフト（贈与税は別途検討）</li>
      </ul>
    </div>

    <div style="background: white; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="color: #ef4444; margin: 0 0 0.5rem 0;">⚠️ 注意事項</h4>
      <ul style="margin: 0; color: #374151; line-height: 1.6; font-size: 0.9em;">
        <li>国により解釈が異なる場合あり</li>
        <li>ハードフォークは要確認</li>
        <li>贈与税・相続税は別制度</li>
        <li>事業性判定により扱い変化</li>
      </ul>
    </div>
  </div>
</div>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #d97706; display: flex; align-items: center;">🔥 2025年の新たな課税課題</h3>
<ul style="margin: 0.5rem 0 0 1.5rem; color: #374151; line-height: 1.7;">
  <li><strong>DeFi複雑取引</strong>：流動性プール・イールドファーミング・無常損失の税務処理</li>
  <li><strong>NFT・メタバース</strong>：バーチャル資産売買・P2Eゲーム報酬の課税判定</li>
  <li><strong>AIエージェント経済</strong>：自律エージェントの取引利益・損失の帰属問題</li>
  <li><strong>Layer2・サイドチェーン</strong>：クロスチェーン取引の複雑な価格追跡</li>
</ul>
</div>
        `
      },
      {
        id: 'section-2',
        title: '2025年版：主要国の課税方式比較',
        orderIndex: 2,
        type: 'text',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">世界主要国の暗号通貨税制（2025年最新版）</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; padding: 2rem;">
    <h3 style="color: #ffffff; margin: 0 0 1.5rem 0; font-size: 1.4em; text-align: center;">🇯🇵 日本</h3>
    
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="color: #ffffff; margin: 0 0 0.5rem 0;">📊 所得分類（2025年現行）</h4>
      <ul style="margin: 0; padding-left: 1.2rem; color: #f0f0f0; line-height: 1.6; font-size: 0.9em;">
        <li><strong>個人</strong>: 雑所得（総合課税）</li>
        <li><strong>法人</strong>: 事業所得</li>
        <li><strong>税率</strong>: 15-55%（累進税率）</li>
        <li><strong>住民税</strong>: 10%追加</li>
      </ul>
    </div>

    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="color: #ffffff; margin: 0 0 0.5rem 0;">🧮 計算方法</h4>
      <ul style="margin: 0; padding-left: 1.2rem; color: #f0f0f0; line-height: 1.6; font-size: 0.9em;">
        <li>移動平均法または総平均法</li>
        <li>年間取引の総合計算</li>
        <li>20万円以下は申告不要（給与所得者）</li>
        <li>暗号通貨間交換も課税対象</li>
      </ul>
    </div>

    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0; text-align: center;">
      <p style="margin: 0; font-size: 0.85em; font-weight: bold;">2025年: Web3税制検討中・損失繰越不可</p>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 16px; padding: 2rem;">
    <h3 style="color: #ffffff; margin: 0 0 1.5rem 0; font-size: 1.4em; text-align: center;">🇺🇸 アメリカ</h3>
    
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="color: #ffffff; margin: 0 0 0.5rem 0;">📋 分類</h4>
      <ul style="margin: 0; padding-left: 1.2rem; color: #f0f0f0; line-height: 1.6; font-size: 0.9em;">
        <li><strong>キャピタル資産</strong>: 投資目的</li>
        <li><strong>在庫資産</strong>: 事業目的（トレーダー）</li>
        <li><strong>マイニング</strong>: 事業所得扱い</li>
        <li><strong>ステーキング</strong>: 受取時課税</li>
      </ul>
    </div>

    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="color: #ffffff; margin: 0 0 0.5rem 0;">💰 税率（2025年版）</h4>
      <ul style="margin: 0; padding-left: 1.2rem; color: #f0f0f0; line-height: 1.6; font-size: 0.9em;">
        <li><strong>短期</strong>（1年未満）: 10-37%</li>
        <li><strong>長期</strong>（1年以上）: 0%, 15%, 20%</li>
        <li><strong>3.8% NIIT</strong>: 高所得者</li>
        <li>損失の繰越可能（$3,000/年限度）</li>
      </ul>
    </div>

    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0; text-align: center;">
      <p style="margin: 0; font-size: 0.85em; font-weight: bold;">2025年: DeFi規制強化・ETF課税明確化</p>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 16px; padding: 2rem;">
    <h3 style="color: #ffffff; margin: 0 0 1.5rem 0; font-size: 1.4em; text-align: center;">🇩🇪 ドイツ</h3>
    
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="color: #ffffff; margin: 0 0 0.5rem 0;">👤 個人投資家</h4>
      <ul style="margin: 0; padding-left: 1.2rem; color: #f0f0f0; line-height: 1.6; font-size: 0.9em;">
        <li><strong>1年以上保有</strong>: 完全非課税</li>
        <li>1年未満: 私的売買収入</li>
        <li>免税額: 600€/年</li>
        <li>税率: 0-42%（累進）</li>
      </ul>
    </div>

    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="color: #ffffff; margin: 0 0 0.5rem 0;">🏢 事業者</h4>
      <ul style="margin: 0; padding-left: 1.2rem; color: #f0f0f0; line-height: 1.6; font-size: 0.9em;">
        <li>事業所得として課税</li>
        <li>付加価値税（VAT）対象外</li>
        <li>マイニング・ステーキング課税</li>
        <li>経費控除可能</li>
      </ul>
    </div>

    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0; text-align: center;">
      <p style="margin: 0; font-size: 0.85em; font-weight: bold;">2025年: EU随一の投資家優遇税制</p>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 16px; padding: 2rem;">
    <h3 style="color: #ffffff; margin: 0 0 1.5rem 0; font-size: 1.4em; text-align: center;">🇸🇬 シンガポール</h3>
    
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="color: #ffffff; margin: 0 0 0.5rem 0;">👤 個人投資家</h4>
      <ul style="margin: 0; padding-left: 1.2rem; color: #f0f0f0; line-height: 1.6; font-size: 0.9em;">
        <li><strong>キャピタルゲイン税なし</strong></li>
        <li>事業性がある場合のみ課税</li>
        <li>GST（消費税）非課税</li>
        <li>トレード頻度で事業性判定</li>
      </ul>
    </div>

    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="color: #ffffff; margin: 0 0 0.5rem 0;">🏙️ 特徴</h4>
      <ul style="margin: 0; padding-left: 1.2rem; color: #f0f0f0; line-height: 1.6; font-size: 0.9em;">
        <li>世界最高水準の税制優遇</li>
        <li>暗号通貨企業のハブ</li>
        <li>規制サンドボックス充実</li>
        <li>MAS（金融庁）の明確ガイダンス</li>
      </ul>
    </div>

    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0; text-align: center;">
      <p style="margin: 0; font-size: 0.85em; font-weight: bold;">2025年: アジア最大の暗号通貨ハブ</p>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">2025年新興の税制優遇国</h2>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #16a34a; margin: 0 0 1rem 0; text-align: center;">🇵🇹 ポルトガル</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.6; font-size: 0.9em;">
      <li><strong>個人投資家</strong>: 完全非課税</li>
      <li>事業性判定なし（2025年現在）</li>
      <li>EU居住権取得可能</li>
      <li>暗号通貨移住先として人気</li>
    </ul>
  </div>
  
  <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #f59e0b; margin: 0 0 1rem 0; text-align: center;">🇦🇪 UAE</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.6; font-size: 0.9em;">
      <li><strong>個人所得税</strong>: なし</li>
      <li>法人税: 9%（2023年導入）</li>
      <li>暗号通貨ライセンス充実</li>
      <li>ドバイが暗号通貨フリーゾーン</li>
    </ul>
  </div>
  
  <div style="background: #f0f9ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #3b82f6; margin: 0 0 1rem 0; text-align: center;">🇸🇻 エルサルバドル</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.6; font-size: 0.9em;">
      <li><strong>Bitcoin法定通貨</strong></li>
      <li>Bitcoin取引非課税</li>
      <li>暗号通貨関連投資優遇</li>
      <li>居住権プログラム開始</li>
    </ul>
  </div>
</div>

<table style="width: 100%; border-collapse: collapse; margin: 2rem 0; border: 1px solid #e5e7eb;">
  <thead>
    <tr style="background: #f3f4f6;">
      <th style="border: 1px solid #e5e7eb; padding: 1rem; text-align: left; color: #374151;">国・地域</th>
      <th style="border: 1px solid #e5e7eb; padding: 1rem; text-align: left; color: #374151;">個人税率</th>
      <th style="border: 1px solid #e5e7eb; padding: 1rem; text-align: left; color: #374151;">長期保有優遇</th>
      <th style="border: 1px solid #e5e7eb; padding: 1rem; text-align: left; color: #374151;">2025年評価</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #e5e7eb; padding: 1rem; font-weight: 600;">🇯🇵 日本</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem;">15-55%</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem; color: #ef4444;">なし</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem; color: #ef4444;">税制改正検討中</td>
    </tr>
    <tr style="background: #f9fafb;">
      <td style="border: 1px solid #e5e7eb; padding: 1rem; font-weight: 600;">🇺🇸 アメリカ</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem;">0-20%（長期）</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem; color: #059669;">1年で優遇</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem; color: #059669;">ETF承認で制度安定</td>
    </tr>
    <tr>
      <td style="border: 1px solid #e5e7eb; padding: 1rem; font-weight: 600;">🇩🇪 ドイツ</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem;">0%（1年後）</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem; color: #059669;">完全非課税</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem; color: #059669;">EU最優遇</td>
    </tr>
    <tr style="background: #f9fafb;">
      <td style="border: 1px solid #e5e7eb; padding: 1rem; font-weight: 600;">🇸🇬 シンガポール</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem;">0%（投資目的）</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem; color: #059669;">不要</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem; color: #059669;">世界最優遇</td>
    </tr>
    <tr>
      <td style="border: 1px solid #e5e7eb; padding: 1rem; font-weight: 600;">🇵🇹 ポルトガル</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem;">0%</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem; color: #059669;">不要</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem; color: #059669;">隠れた優遇国</td>
    </tr>
  </tbody>
</table>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 2025年税制選択のポイント</h3>
<ul style="margin: 0.5rem 0 0 1.5rem; color: #374151; line-height: 1.7;">
  <li><strong>投資戦略</strong>：長期保有なら ドイツ・ポルトガル、短期ならシンガポール</li>
  <li><strong>移住コスト</strong>：EU圏内移動の自由度・ビザ要件・生活費を総合検討</li>
  <li><strong>規制安定性</strong>：税制変更リスク・政治的安定性・法的確実性</li>
  <li><strong>事業展開</strong>：暗号通貨ビジネスなら UAE・シンガポール・スイス</li>
</ul>
</div>
        `
      },
      {
        id: 'section-3',
        title: '2025年版：記録管理と計算方法',
        orderIndex: 3,
        type: 'text',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年必須：暗号通貨税務記録の管理</h2>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; padding: 2rem;">
    <h3 style="color: #ffffff; margin: 0 0 1.5rem 0; font-size: 1.4em; text-align: center;">📋 基本記録項目</h3>
    
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="color: #ffffff; margin: 0 0 0.5rem 0;">🕒 必須データ</h4>
      <ul style="margin: 0; padding-left: 1.2rem; color: #f0f0f0; line-height: 1.6; font-size: 0.9em;">
        <li><strong>日時</strong>: 取引実行日時（UTC推奨）</li>
        <li><strong>取引種別</strong>: 購入・売却・交換・報酬等</li>
        <li><strong>数量</strong>: 正確な暗号通貨数量</li>
        <li><strong>価格</strong>: 取引時の法定通貨価格</li>
        <li><strong>手数料</strong>: 取引手数料・ガス料金</li>
        <li><strong>取引所</strong>: 利用した取引所・プラットフォーム</li>
      </ul>
    </div>

    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="color: #ffffff; margin: 0 0 0.5rem 0;">🔗 追加トレーサビリティ</h4>
      <ul style="margin: 0; padding-left: 1.2rem; color: #f0f0f0; line-height: 1.6; font-size: 0.9em;">
        <li>ウォレットアドレス</li>
        <li>トランザクションハッシュ</li>
        <li>目的（投資・事業・個人使用）</li>
        <li>対価として受けた商品・サービス</li>
      </ul>
    </div>

    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0; text-align: center;">
      <p style="margin: 0; font-size: 0.85em; font-weight: bold;">2025年: 自動追跡技術で隠蔽困難</p>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 16px; padding: 2rem;">
    <h3 style="color: #ffffff; margin: 0 0 1.5rem 0; font-size: 1.4em; text-align: center;">🆕 2025年新カテゴリ記録</h3>
    
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="color: #ffffff; margin: 0 0 0.5rem 0;">🏦 DeFi専用記録</h4>
      <ul style="margin: 0; padding-left: 1.2rem; color: #f0f0f0; line-height: 1.6; font-size: 0.9em;">
        <li>流動性提供開始・終了時の価格</li>
        <li>報酬トークンの受取時期・価格</li>
        <li>無常損失の詳細計算</li>
        <li>プロトコル間の資産移動履歴</li>
      </ul>
    </div>

    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="color: #ffffff; margin: 0 0 0.5rem 0;">🎨 NFT・メタバース記録</h4>
      <ul style="margin: 0; padding-left: 1.2rem; color: #f0f0f0; line-height: 1.6; font-size: 0.9em;">
        <li>NFT購入・売却・mint履歴</li>
        <li>ロイヤリティ収入の詳細</li>
        <li>P2Eゲーム報酬の時価評価</li>
        <li>バーチャル土地・アイテム取引</li>
      </ul>
    </div>

    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0; text-align: center;">
      <p style="margin: 0; font-size: 0.85em; font-weight: bold;">新領域は特に記録が重要</p>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">2025年最新：税務計算ツール比較</h2>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #16a34a; margin: 0 0 1rem 0; text-align: center;">🌍 国際対応ツール</h3>
    <div style="background: white; border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <h4 style="color: #16a34a; margin: 0 0 0.5rem 0; font-size: 1em;">CoinTracker</h4>
      <p style="margin: 0; font-size: 0.85em; color: #374151;">300+取引所対応・DeFi自動追跡</p>
    </div>
    <div style="background: white; border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <h4 style="color: #16a34a; margin: 0 0 0.5rem 0; font-size: 1em;">Koinly</h4>
      <p style="margin: 0; font-size: 0.85em; color: #374151;">20+国税制・NFT対応・$99-$399/年</p>
    </div>
    <div style="background: white; border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <h4 style="color: #16a34a; margin: 0 0 0.5rem 0; font-size: 1em;">Blockpit</h4>
      <p style="margin: 0; font-size: 0.85em; color: #374151;">欧州特化・ドイツ税制完全対応</p>
    </div>
  </div>
  
  <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #f59e0b; margin: 0 0 1rem 0; text-align: center;">🇯🇵 日本特化ツール</h3>
    <div style="background: white; border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <h4 style="color: #f59e0b; margin: 0 0 0.5rem 0; font-size: 1em;">Cryptact</h4>
      <p style="margin: 0; font-size: 0.85em; color: #374151;">移動平均法・総平均法完全対応</p>
    </div>
    <div style="background: white; border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <h4 style="color: #f59e0b; margin: 0 0 0.5rem 0; font-size: 1em;">Gtax</h4>
      <p style="margin: 0; font-size: 0.85em; color: #374151;">国内取引所完全対応・無料版あり</p>
    </div>
    <div style="background: white; border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <h4 style="color: #f59e0b; margin: 0 0 0.5rem 0; font-size: 1em;">CryptoLinC</h4>
      <p style="margin: 0; font-size: 0.85em; color: #374151;">税理士監修・DeFi対応強化</p>
    </div>
  </div>
  
  <div style="background: #f0f9ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #3b82f6; margin: 0 0 1rem 0; text-align: center;">🆕 2025年新機能</h3>
    <div style="background: white; border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <h4 style="color: #3b82f6; margin: 0 0 0.5rem 0; font-size: 1em;">AI自動分類</h4>
      <p style="margin: 0; font-size: 0.85em; color: #374151;">機械学習で取引目的を自動判定</p>
    </div>
    <div style="background: white; border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <h4 style="color: #3b82f6; margin: 0 0 0.5rem 0; font-size: 1em;">リアルタイム追跡</h4>
      <p style="margin: 0; font-size: 0.85em; color: #374151;">ウォレット連携で自動記録</p>
    </div>
    <div style="background: white; border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <h4 style="color: #3b82f6; margin: 0 0 0.5rem 0; font-size: 1em;">税務当局対応</h4>
      <p style="margin: 0; font-size: 0.85em; color: #374151;">調査対応レポート自動生成</p>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">計算方法の実例（2025年版）</h2>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <h3 style="margin: 0 0 1rem 0; color: #1e40af; text-align: center; font-size: 1.3em;">📊 移動平均法の計算例</h3>
  
  <div style="background: #f8fafc; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
    <h4 style="color: #374151; margin: 0 0 1rem 0;">購入履歴</h4>
    <table style="width: 100%; border-collapse: collapse;">
      <tr style="background: #f3f4f6;">
        <th style="border: 1px solid #e5e7eb; padding: 0.5rem; text-align: left;">日付</th>
        <th style="border: 1px solid #e5e7eb; padding: 0.5rem; text-align: left;">数量</th>
        <th style="border: 1px solid #e5e7eb; padding: 0.5rem; text-align: left;">価格</th>
        <th style="border: 1px solid #e5e7eb; padding: 0.5rem; text-align: left;">累計取得価格</th>
      </tr>
      <tr>
        <td style="border: 1px solid #e5e7eb; padding: 0.5rem;">1月15日</td>
        <td style="border: 1px solid #e5e7eb; padding: 0.5rem;">1 BTC</td>
        <td style="border: 1px solid #e5e7eb; padding: 0.5rem;">¥6,000,000</td>
        <td style="border: 1px solid #e5e7eb; padding: 0.5rem;">¥6,000,000</td>
      </tr>
      <tr style="background: #f9fafb;">
        <td style="border: 1px solid #e5e7eb; padding: 0.5rem;">2月20日</td>
        <td style="border: 1px solid #e5e7eb; padding: 0.5rem;">1 BTC</td>
        <td style="border: 1px solid #e5e7eb; padding: 0.5rem;">¥7,200,000</td>
        <td style="border: 1px solid #e5e7eb; padding: 0.5rem;">¥6,600,000（平均）</td>
      </tr>
    </table>
  </div>

  <div style="background: #dcfce7; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
    <h4 style="color: #16a34a; margin: 0 0 1rem 0;">売却時の計算</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>3月10日:</strong> 1 BTC を ¥9,000,000 で売却<br/>
      <strong>利益:</strong> ¥9,000,000 - ¥6,600,000 = <span style="color: #16a34a; font-weight: bold;">¥2,400,000</span><br/>
      <strong>残り:</strong> 1 BTC（取得価格 ¥6,600,000）
    </p>
  </div>
</div>

<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #dc2626; display: flex; align-items: center;">⚠️ DeFi取引の複雑性（2025年課題）</h3>
<ul style="margin: 0.5rem 0 0 1.5rem; color: #7f1d1d; line-height: 1.7;">
  <li><strong>流動性プール</strong>：開始・終了時の複雑な価格計算・無常損失処理</li>
  <li><strong>イールドファーミング</strong>：複数トークン報酬の時価評価・複利計算</li>
  <li><strong>クロスチェーン</strong>：Layer2・サイドチェーン間の価格・手数料追跡</li>
  <li><strong>自動化戦略</strong>：BOT・スマートコントラクトによる自動売買の記録</li>
</ul>
</div>
        `
      },
      {
        id: 'section-4',
        title: '2025年版：節税対策と注意点',
        orderIndex: 4,
        type: 'text',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年版：合法的な節税戦略</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">📉 1. 損失の活用</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <h4 style="color: #ffffff; margin: 0 0 0.5rem 0;">主な手法</h4>
      <ul style="margin: 0; padding-left: 1.2rem; color: #f0f0f0; line-height: 1.6; font-size: 0.9em;">
        <li><strong>損失確定売り</strong>: 含み損を実現して相殺</li>
        <li><strong>ハーベスティング</strong>: 年末の税務最適化</li>
        <li><strong>損失繰越</strong>: 将来利益との相殺（国による）</li>
      </ul>
    </div>
    <div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 0.5rem; margin: 0.5rem 0; text-align: center;">
      <p style="margin: 0; font-size: 0.8em; font-weight: bold;">⚠️ ウォッシュセール規制に注意</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">⏳ 2. 長期保有戦略</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <h4 style="color: #ffffff; margin: 0 0 0.5rem 0;">メリット</h4>
      <ul style="margin: 0; padding-left: 1.2rem; color: #f0f0f0; line-height: 1.6; font-size: 0.9em;">
        <li>長期キャピタルゲイン税率（米国: 0-20%）</li>
        <li>1年以上保有で非課税（ドイツ）</li>
        <li>短期売買の頻度抑制</li>
      </ul>
    </div>
    <div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 0.5rem; margin: 0.5rem 0; text-align: center;">
      <p style="margin: 0; font-size: 0.8em; font-weight: bold;">2025年: HODLが最も確実な節税</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🌍 3. 管轄権の選択</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <h4 style="color: #ffffff; margin: 0 0 0.5rem 0;">2025年人気移住先</h4>
      <ul style="margin: 0; padding-left: 1.2rem; color: #f0f0f0; line-height: 1.6; font-size: 0.9em;">
        <li><strong>ポルトガル</strong>: 個人投資家非課税</li>
        <li><strong>UAE</strong>: 個人所得税なし</li>
        <li><strong>シンガポール</strong>: 投資目的非課税</li>
      </ul>
    </div>
    <div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 0.5rem; margin: 0.5rem 0; text-align: center;">
      <p style="margin: 0; font-size: 0.8em; font-weight: bold;">移住コストと総合評価必須</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">💰 4. 経費の計上</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <h4 style="color: #ffffff; margin: 0 0 0.5rem 0;">認められる経費</h4>
      <ul style="margin: 0; padding-left: 1.2rem; color: #f0f0f0; line-height: 1.6; font-size: 0.9em;">
        <li>取引手数料・ガス料金</li>
        <li>ハードウェアウォレット</li>
        <li>税務ソフトウェア</li>
        <li>教育・セミナー費用</li>
        <li>専門家相談費用</li>
      </ul>
    </div>
    <div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 0.5rem; margin: 0.5rem 0; text-align: center;">
      <p style="margin: 0; font-size: 0.8em; font-weight: bold;">2025年: DeFiガス代も経費</p>
    </div>
  </div>
</div>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #d97706; display: flex; align-items: center;">💡 2025年新しい節税アプローチ</h3>
<ul style="margin: 0.5rem 0 0 1.5rem; color: #374151; line-height: 1.7;">
  <li><strong>DeFi収益最適化</strong>：ステーキング報酬の受取タイミング調整</li>
  <li><strong>Layer2活用</strong>：高ガス費をDeFiで経費化・低コストチェーン利用</li>
  <li><strong>法人設立</strong>：DAO・Web3法人での税率軽減</li>
  <li><strong>NFT活用</strong>：アート・コレクション投資としての損金算入</li>
</ul>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">⚠️ 危険な行為と罰則リスク</h2>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
  <div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 16px; padding: 2rem;">
    <h3 style="color: #ef4444; margin: 0 0 1.5rem 0; font-size: 1.4em; text-align: center;">🚫 脱税・違法行為</h3>
    
    <div style="background: white; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="color: #ef4444; margin: 0 0 0.5rem 0;">申告漏れ</h4>
      <ul style="margin: 0; color: #374151; line-height: 1.6; font-size: 0.9em;">
        <li>意図的な取引隠し</li>
        <li>海外取引所利用の未申告</li>
        <li>現金化していない利益の未申告</li>
        <li>DeFi・NFT収益の隠蔽</li>
      </ul>
    </div>

    <div style="background: white; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="color: #ef4444; margin: 0 0 0.5rem 0;">記録改ざん</h4>
      <ul style="margin: 0; color: #374151; line-height: 1.6; font-size: 0.9em;">
        <li>取引履歴の偽装</li>
        <li>架空経費の計上</li>
        <li>取得価格の操作</li>
        <li>プライベートキーの隠匿</li>
      </ul>
    </div>
  </div>

  <div style="background: #f0f9ff; border: 2px solid #3b82f6; border-radius: 16px; padding: 2rem;">
    <h3 style="color: #3b82f6; margin: 0 0 1.5rem 0; font-size: 1.4em; text-align: center;">⚖️ 2025年の罰則</h3>
    
    <div style="background: white; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="color: #3b82f6; margin: 0 0 0.5rem 0;">経済制裁</h4>
      <ul style="margin: 0; color: #374151; line-height: 1.6; font-size: 0.9em;">
        <li><strong>追徴課税</strong>: 本税 + 延滞税 + 加算税</li>
        <li><strong>重加算税</strong>: 35-40%</li>
        <li><strong>延滞税</strong>: 年14.6%</li>
        <li><strong>資産凍結</strong>: 銀行・取引所口座</li>
      </ul>
    </div>

    <div style="background: white; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <h4 style="color: #3b82f6; margin: 0 0 0.5rem 0;">刑事罰・社会的制裁</h4>
      <ul style="margin: 0; color: #374151; line-height: 1.6; font-size: 0.9em;">
        <li><strong>刑事告発</strong>: 5年以下の懲役</li>
        <li><strong>信用情報</strong>: ブラックリスト登録</li>
        <li><strong>職業制限</strong>: 金融業界からの排除</li>
        <li><strong>社会的制裁</strong>: 報道・風評被害</li>
      </ul>
    </div>
  </div>
</div>

<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #dc2626; display: flex; align-items: center;">🔍 2025年の税務調査強化</h3>
<ul style="margin: 0.5rem 0 0 1.5rem; color: #7f1d1d; line-height: 1.7;">
  <li><strong>自動追跡技術</strong>：Chainalysis・CipherTraceで全取引監視</li>
  <li><strong>国際情報交換</strong>：CRS・FATCA・税務協定で海外口座把握</li>
  <li><strong>AI分析</strong>：機械学習でリスクの高い納税者を特定</li>
  <li><strong>取引所連携</strong>：KYC情報・取引履歴の自動共有</li>
</ul>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">✅ 適切な対応方針</h2>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; padding: 2rem; margin: 2rem 0; text-align: center;">
  <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.4em;">🛡️ 2025年安全な税務対応</h3>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0;">
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">📋 正確な記録</h4>
      <p style="margin: 0; font-size: 0.9em;">すべての取引を自動追跡・バックアップ</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">👨‍💼 専門家相談</h4>
      <p style="margin: 0; font-size: 0.9em;">暗号通貨税務専門の税理士・会計士</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">⚡ 早期対応</h4>
      <p style="margin: 0; font-size: 0.9em;">申告漏れは自主的に修正申告</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">📚 継続学習</h4>
      <p style="margin: 0; font-size: 0.9em;">税制変更への対応・最新動向把握</p>
    </div>
  </div>
</div>

<table style="width: 100%; border-collapse: collapse; margin: 2rem 0; border: 1px solid #e5e7eb;">
  <thead>
    <tr style="background: #f3f4f6;">
      <th style="border: 1px solid #e5e7eb; padding: 1rem; text-align: left; color: #374151;">対応レベル</th>
      <th style="border: 1px solid #e5e7eb; padding: 1rem; text-align: left; color: #374151;">推奨行動</th>
      <th style="border: 1px solid #e5e7eb; padding: 1rem; text-align: left; color: #374151;">費用目安</th>
      <th style="border: 1px solid #e5e7eb; padding: 1rem; text-align: left; color: #374151;">適用対象</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #e5e7eb; padding: 1rem; font-weight: 600;">基本</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem;">自動計算ツール使用</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem;">$100-500/年</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem;">年間利益$10万以下</td>
    </tr>
    <tr style="background: #f9fafb;">
      <td style="border: 1px solid #e5e7eb; padding: 1rem; font-weight: 600;">中級</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem;">税理士相談 + ツール</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem;">$5,000-15,000/年</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem;">年間利益$10-100万</td>
    </tr>
    <tr>
      <td style="border: 1px solid #e5e7eb; padding: 1rem; font-weight: 600;">上級</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem;">専門チーム + 戦略</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem;">$50,000+/年</td>
      <td style="border: 1px solid #e5e7eb; padding: 1rem;">年間利益$100万+</td>
    </tr>
  </tbody>
</table>

<div style="background: #dcfce7; border-left: 4px solid #16a34a; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #16a34a; display: flex; align-items: center;">🎯 2025年成功のポイント</h3>
<p style="margin: 0.5rem 0 0 0; color: #374151; line-height: 1.6;">暗号通貨税務は複雑ですが、適切な記録管理・ツール活用・専門家サポートにより確実に対応可能です。2025年は税務調査が強化されているため、プロアクティブな対応が成功の鍵となります。節税は合法的手段のみを使用し、長期的な資産形成を重視しましょう。</p>
</div>
        `
      }
    ],
    keyPoints: [
      '暗号通貨取引の多くは課税イベントとなり、正確な記録が必要',
      '国によって課税方式が大きく異なる（雑所得・キャピタルゲイン等）',
      '取引履歴、価格、手数料の詳細な記録管理が重要',
      '合法的な節税対策は存在するが、脱税は重大な法的リスク',
      '複雑な場合は税務専門家への相談が推奨される'
    ],
    summary: '暗号通貨の税務処理は複雑で、多くの取引が課税イベントとなります。国によって課税方式が異なり、日本では雑所得、アメリカではキャピタルゲイン税が適用されます。正確な記録管理が極めて重要で、取引日時、価格、数量、手数料などの詳細な記録が必要です。合法的な節税対策は存在しますが、申告漏れや記録改ざんは重大な法的リスクを伴います。複雑なケースでは税務専門家への相談が推奨されます。',
    practicalExamples: [
      '日本: 年間利益100万円の場合、雑所得として約20-30%の税率',
      'アメリカ: 1年以上保有のBTCなら長期キャピタルゲインで0-20%',
      'ドイツ: 1年以上保有で売却益が完全非課税',
      'DeFi: UniswapでETH/USDCペア提供後の利益確定時に課税'
    ],
    warningNotes: [
      '取引記録の不備は後の税務調査で大きな問題となる',
      '暗号通貨間の交換も多くの国で課税対象',
      'DeFi取引は特に複雑で専門知識が必要',
      '税制は頻繁に変更されるため最新情報の確認が必要',
      '申告漏れは重い罰則と追徴課税のリスクがある'
    ]
  },
  quiz: [
    {
      id: 'crypto-basics-21-q1',
      question: '暗号通貨で課税イベントとなるものは？',
      options: [
        '暗号通貨の購入',
        '暗号通貨の単純保有',
        'BTCをETHに交換',
        '自分のウォレット間での移動'
      ],
      correctAnswer: 2,
      explanation: '暗号通貨同士の交換（BTC → ETH等）は多くの国で課税イベントとなります。売却時点での利益・損失が実現したとみなされ、税務申告の対象となります。'
    },
    {
      id: 'crypto-basics-21-q2',
      question: '日本での個人の暗号通貨利益の所得分類は？',
      options: [
        '給与所得',
        '事業所得',
        '雑所得',
        '配当所得'
      ],
      correctAnswer: 2,
      explanation: '日本では個人の暗号通貨取引による利益は「雑所得」として分類され、総合課税の対象となります。税率は他の所得と合算して15-55%の累進税率が適用されます。'
    },
    {
      id: 'crypto-basics-21-q3',
      question: 'アメリカで長期キャピタルゲイン税が適用される保有期間は？',
      options: [
        '6ヶ月以上',
        '1年以上',
        '2年以上',
        '5年以上'
      ],
      correctAnswer: 1,
      explanation: 'アメリカでは1年以上保有した暗号通貨の売却益に長期キャピタルゲイン税（0%, 15%, 20%）が適用され、通常所得税率より有利になります。'
    },
    {
      id: 'crypto-basics-21-q4',
      question: '暗号通貨税務で必要な記録に含まれないものは？',
      options: [
        '取引日時',
        '取引数量',
        '取引時の価格',
        '将来の価格予想'
      ],
      correctAnswer: 3,
      explanation: '税務記録には取引日時、数量、価格、手数料などの客観的事実が必要ですが、将来の価格予想は主観的で税務上不要な情報です。'
    },
    {
      id: 'crypto-basics-21-q5',
      question: '合法的な節税対策でないものは？',
      options: [
        '損失の確定売りによる利益相殺',
        '長期保有による税率優遇活用',
        '取引履歴の改ざん',
        '必要経費の適切な計上'
      ],
      correctAnswer: 2,
      explanation: '取引履歴の改ざんは違法行為で、重い罰則の対象となります。合法的な節税対策は損失活用、長期保有、必要経費の計上などです。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};