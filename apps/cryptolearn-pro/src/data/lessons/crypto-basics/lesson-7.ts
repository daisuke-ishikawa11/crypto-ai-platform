import type { Lesson } from '../../../types';

export const lesson7: Lesson = {
  id: 'crypto-basics-7',
  categoryId: 'crypto-basics',
  title: 'Hot vs Cold Storage - セキュリティ重要性',
  slug: 'hot-vs-cold-storage',
  description: 'ホットストレージとコールドストレージの違い、それぞれの利点と欠点、適切な使い分けを学びます。',
  difficultyLevel: 'beginner',
  estimatedMinutes: 18,
  orderIndex: 7,
  content: {
    sections: [
      {
        id: 'section-1',
        title: 'ホットストレージとコールドストレージの基本概念',
        orderIndex: 1,
        type: 'text',
        content: `
<p>暗号通貨の保管方法は、インターネット接続の有無により「ホットストレージ」と「コールドストレージ」に分類されます。<br/>
それぞれの特徴を理解し、適切な使い分けがセキュリティの鍵となります。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">ストレージ方式の基本理解</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%); color: white; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.3em; display: flex; align-items: center;">🔥 ホットストレージ</h3>
    <p style="margin: 0 0 1rem 0; line-height: 1.6; font-size: 0.95em;">インターネットに接続されている状態で暗号通貨を保管</p>
    <ul style="margin: 0; padding-left: 1.5rem; line-height: 1.8;">
      <li>インターネット常時接続</li>
      <li>即座のアクセス・取引が可能</li>
      <li>高い利便性</li>
      <li>オンライン攻撃のリスクあり</li>
    </ul>
  </div>
  
  <div style="background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%); color: white; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.3em; display: flex; align-items: center;">❄️ コールドストレージ</h3>
    <p style="margin: 0 0 1rem 0; line-height: 1.6; font-size: 0.95em;">インターネットから完全に切り離された環境で保管</p>
    <ul style="margin: 0; padding-left: 1.5rem; line-height: 1.8;">
      <li>インターネット接続なし</li>
      <li>オフライン環境での保管</li>
      <li>最高レベルのセキュリティ</li>
      <li>アクセスに時間と手間が必要</li>
    </ul>
  </div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 基本原則</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">財布と金庫の使い分けと同じ考え方</p>
<ul style="margin: 0.5rem 0 0 1.5rem; color: #374151;">
  <li><strong>ホットストレージ = 財布</strong>（日常使い・少額）</li>
  <li><strong>コールドストレージ = 金庫</strong>（長期保管・大額）</li>
</ul>
</div>
        `
      },
      {
        id: 'section-2',
        type: 'text',
        title: 'ホットストレージの種類と特徴',
        orderIndex: 2,
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">ホットストレージの4つの主要タイプ</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em; display: flex; align-items: center;">🌐 ウェブウォレット</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0 0 0.5rem 0; font-weight: bold;">代表例:</p>
      <p style="margin: 0; font-size: 0.9em;">MyEtherWallet, MyCrypto</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0 0 0.5rem 0; font-weight: bold; color: #90EE90;">✓ メリット:</p>
      <ul style="margin: 0; padding-left: 1rem; font-size: 0.9em;">
        <li>どこからでもアクセス</li>
        <li>簡単セットアップ</li>
      </ul>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0 0 0.5rem 0; font-weight: bold; color: #FFB6C1;">✗ デメリット:</p>
      <ul style="margin: 0; padding-left: 1rem; font-size: 0.9em;">
        <li>フィッシング攻撃</li>
        <li>サーバーダウンリスク</li>
      </ul>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em; display: flex; align-items: center;">💻 デスクトップウォレット</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0 0 0.5rem 0; font-weight: bold;">代表例:</p>
      <p style="margin: 0; font-size: 0.9em;">Electrum, Exodus, Atomic Wallet</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0 0 0.5rem 0; font-weight: bold; color: #90EE90;">✓ メリット:</p>
      <ul style="margin: 0; padding-left: 1rem; font-size: 0.9em;">
        <li>フル機能</li>
        <li>プライベート鍵をローカル保存</li>
      </ul>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0 0 0.5rem 0; font-weight: bold; color: #FFB6C1;">✗ デメリット:</p>
      <ul style="margin: 0; padding-left: 1rem; font-size: 0.9em;">
        <li>マルウェア</li>
        <li>コンピュータクラッシュリスク</li>
      </ul>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em; display: flex; align-items: center;">📱 モバイルウォレット</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0 0 0.5rem 0; font-weight: bold;">代表例:</p>
      <p style="margin: 0; font-size: 0.9em;">Trust Wallet, Coinbase Wallet, MetaMask Mobile</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0 0 0.5rem 0; font-weight: bold; color: #90EE90;">✓ メリット:</p>
      <ul style="margin: 0; padding-left: 1rem; font-size: 0.9em;">
        <li>携帯性</li>
        <li>QRコードスキャン</li>
        <li>外出先利用</li>
      </ul>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0 0 0.5rem 0; font-weight: bold; color: #FFB6C1;">✗ デメリット:</p>
      <ul style="margin: 0; padding-left: 1rem; font-size: 0.9em;">
        <li>スマホ紛失・盗難</li>
        <li>アプリの脆弱性</li>
      </ul>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em; display: flex; align-items: center;">🏛️ 取引所ウォレット</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0 0 0.5rem 0; font-weight: bold;">代表例:</p>
      <p style="margin: 0; font-size: 0.9em;">Coinbase, Binance, Kraken</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0 0 0.5rem 0; font-weight: bold; color: #90EE90;">✓ メリット:</p>
      <ul style="margin: 0; padding-left: 1rem; font-size: 0.9em;">
        <li>取引との統合</li>
        <li>ユーザビリティ</li>
      </ul>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0 0 0.5rem 0; font-weight: bold; color: #FFB6C1;">✗ デメリット:</p>
      <ul style="margin: 0; padding-left: 1rem; font-size: 0.9em;">
        <li>カウンターパーティリスク</li>
        <li>ハッキング標的</li>
      </ul>
    </div>
  </div>
</div>

<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #dc2626; display: flex; align-items: center;">⚠️ ホットストレージの主要リスク</h3>
<ul style="margin: 0.5rem 0 0 1.5rem; color: #7f1d1d;">
  <li>ハッキング・マルウェア感染</li>
  <li>フィッシング詐欺による資金流出</li>
  <li>内部不正・システム障害</li>
  <li>規制による凍結リスク</li>
</ul>
</div>
        `
      },
      {
        id: 'section-3',
        type: 'text',
        title: 'コールドストレージの種類と実装',
        orderIndex: 3,
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">コールドストレージの4つの実装方法</h2>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; padding: 2rem; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);">
    <h3 style="color: #ffffff; margin: 0 0 1.5rem 0; font-size: 1.4em; text-align: center;">🔐 ハードウェアウォレット</h3>
    
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0 0 0.5rem 0; font-weight: bold;">代表例:</p>
      <p style="margin: 0; font-size: 0.9em;">Ledger Nano S/X, Trezor One/Model T</p>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0 0 0.5rem 0; font-weight: bold; color: #90EE90;">技術的仕組み:</p>
      <ul style="margin: 0; padding-left: 1rem; font-size: 0.9em; line-height: 1.6;">
        <li>秘密鍵が専用チップ内で生成・保存</li>
        <li>取引署名もデバイス内で実行</li>
        <li>PINコード・パスフレーズで保護</li>
        <li>物理的ボタンでの取引確認</li>
      </ul>
    </div>
    
    <div style="background: rgba(255,255,255,0.15); border-radius: 8px; padding: 1rem; margin: 1rem 0; text-align: center;">
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">⭐ 最も推奨される方法</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9em;">使いやすさとセキュリティの両立</p>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 16px; padding: 2rem; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);">
    <h3 style="color: #ffffff; margin: 0 0 1.5rem 0; font-size: 1.4em; text-align: center;">📄 ペーパーウォレット</h3>
    
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0 0 0.5rem 0; font-weight: bold;">基本概念:</p>
      <p style="margin: 0; font-size: 0.9em;">秘密鍵・公開鍵を紙に印刷し完全なオフライン保管</p>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0 0 0.5rem 0; font-weight: bold; color: #FFE4B5;">実装手順:</p>
      <ol style="margin: 0; padding-left: 1.2rem; font-size: 0.9em; line-height: 1.6;">
        <li>オフライン環境でキー生成</li>
        <li>印刷(レーザープリンター推奨)</li>
        <li>複数コピーを異なる場所で保管</li>
        <li>生成に使ったPC・プリンターの完全初期化</li>
      </ol>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 16px; padding: 2rem; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);">
    <h3 style="color: #ffffff; margin: 0 0 1.5rem 0; font-size: 1.4em; text-align: center;">💻 エアギャップコンピュータ</h3>
    
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0 0 0.5rem 0; font-weight: bold;">特徴:</p>
      <ul style="margin: 0; padding-left: 1rem; font-size: 0.9em; line-height: 1.6;">
        <li>ネットワーク接続を物理的に切断</li>
        <li>専用オフラインPC使用</li>
      </ul>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0; text-align: center;">
      <p style="margin: 0; font-weight: bold;">🏢 企業・大口投資家向け</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9em;">最高レベルのセキュリティ</p>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 16px; padding: 2rem; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);">
    <h3 style="color: #ffffff; margin: 0 0 1.5rem 0; font-size: 1.4em; text-align: center;">🔗 マルチシグコールドストレージ</h3>
    
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0 0 0.5rem 0; font-weight: bold;">仕組み:</p>
      <p style="margin: 0; font-size: 0.9em;">複数の署名が必要な設定</p>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0 0 0.5rem 0; font-weight: bold; color: #FFE4B5;">構成例:</p>
      <ul style="margin: 0; padding-left: 1rem; font-size: 0.9em; line-height: 1.6;">
        <li>2-of-3 (3つの鍵のうち2つで署名)</li>
        <li>3-of-5 (5つの鍵のうち3つで署名)</li>
      </ul>
    </div>
    
    <div style="background: rgba(255,255,255,0.15); border-radius: 8px; padding: 1rem; margin: 1rem 0; text-align: center;">
      <p style="margin: 0; font-weight: bold;">🛡️ 単一点障害を防止</p>
    </div>
  </div>
</div>
        `
      },
      {
        id: 'section-4',
        type: 'text',
        title: 'セキュリティ戦略の構築',
        orderIndex: 4,
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">階層化セキュリティアプローチ</h2>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%); color: white; border-radius: 12px; padding: 2rem; text-align: center; box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.4em;">📱 Tier 1: 日常使い</h3>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 2em; font-weight: bold;">5-10%</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9em;">総資産に対する割合</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0 0 0.5rem 0; font-weight: bold;">保管方法:</p>
      <p style="margin: 0; font-size: 0.9em;">モバイル・デスクトップウォレット</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0 0 0.5rem 0; font-weight: bold;">金額目安:</p>
      <p style="margin: 0; font-size: 0.9em;">数千円～数万円程度</p>
    </div>
    <p style="margin: 1rem 0 0 0; font-size: 0.9em; font-style: italic;">即座のアクセスが必要な資金</p>
  </div>

  <div style="background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%); color: white; border-radius: 12px; padding: 2rem; text-align: center; box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.4em;">🔐 Tier 2: 中期保管</h3>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 2em; font-weight: bold;">20-30%</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9em;">総資産に対する割合</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0 0 0.5rem 0; font-weight: bold;">保管方法:</p>
      <p style="margin: 0; font-size: 0.9em;">ハードウェアウォレット</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0 0 0.5rem 0; font-weight: bold;">金額目安:</p>
      <p style="margin: 0; font-size: 0.9em;">数十万円～数百万円程度</p>
    </div>
    <p style="margin: 1rem 0 0 0; font-size: 0.9em; font-style: italic;">定期的にアクセスする資金</p>
  </div>

  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 2rem; text-align: center; box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.4em;">🏰 Tier 3: 長期保管</h3>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 2em; font-weight: bold;">60-70%</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9em;">総資産に対する割合</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0 0 0.5rem 0; font-weight: bold;">保管方法:</p>
      <p style="margin: 0; font-size: 0.9em;">マルチシグコールドストレージ</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0 0 0.5rem 0; font-weight: bold;">対象:</p>
      <p style="margin: 0; font-size: 0.9em;">大部分の資産</p>
    </div>
    <p style="margin: 1rem 0 0 0; font-size: 0.9em; font-style: italic;">年単位で動かさない資金</p>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">セキュリティベストプラクティス</h2>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="border: 2px solid #667eea; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #667eea; margin: 0 0 1rem 0; text-align: center;">🌍 分散保管</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.7;">
      <li>単一のウォレットに全資産を保管しない</li>
      <li>地理的分散(複数の場所)</li>
      <li>技術的分散(異なるタイプのウォレット)</li>
    </ul>
  </div>
  
  <div style="border: 2px solid #4ecdc4; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #4ecdc4; margin: 0 0 1rem 0; text-align: center;">📅 定期的な見直し</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.7;">
      <li><strong>月次:</strong> セキュリティ設定の確認</li>
      <li><strong>四半期:</strong> バックアップの健全性テスト</li>
      <li><strong>半年:</strong> 資産配分の再調整</li>
    </ul>
  </div>
  
  <div style="border: 2px solid #f093fb; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #f093fb; margin: 0 0 1rem 0; text-align: center;">📋 継承計画</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.7;">
      <li>家族・相続人への説明</li>
      <li>緊急アクセス手順の文書化</li>
      <li>法的な遺言書への記載</li>
    </ul>
  </div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 階層化戦略の重要性</h3>
<p style="margin: 0.5rem 0 0 0; color: #374151; line-height: 1.6;">リスクと利便性のバランスを取りながら、全資産を適切に分散することで、セキュリティインシデント発生時の被害を最小限に抑えることができます。</p>
</div>
        `
      }
    ],
    keyPoints: [
      'ホットストレージは利便性重視、コールドストレージはセキュリティ重視',
      '全資産をホットストレージで保管するのは危険',
      'ハードウェアウォレットは最も実用的なコールドストレージ',
      '資産額に応じて3層の保管戦略を構築',
      'バックアップと復旧テストを定期実行',
      '継承計画の策定が長期投資には必須'
    ],
    summary: 'ホットストレージとコールドストレージは利便性とセキュリティのトレードオフがあります。日常使いの小額はホット、大部分の資産はコールドで保管する階層化戦略により、セキュリティと利便性を両立できます。',
    practicalExamples: [
      '推奨配分: 日常使い10% (Hot) + 定期利用30% (Hardware) + 長期保管60% (Multi-sig Cold)',
      'ハードウェアウォレット価格: Ledger Nano S Plus ¥10,000, Trezor Model T ¥25,000',
      'セキュリティ事故例: 2022年Ronin Bridge ハック $650M、全てホットウォレット',
      '企業事例: MicroStrategy社は大部分をマルチシグコールドストレージで保管'
    ],
    warningNotes: [
      'ハードウェアウォレットも完璧ではない(物理的紛失·故障リスク)',
      'ペーパーウォレット作成時の環境汚染(キーロガー等)に注意',
      'コールドストレージから頻繁に出し入れするとセキュリティ意味が薄れる',
      '偽のハードウェアウォレットが出回っている',
      'バックアップなしでのコールドストレージ利用は危険',
      '中古のハードウェアウォレットは絶対に使用しない'
    ]
  },
  quiz: [
    {
      id: 'crypto-basics-7-q1',
      question: 'コールドストレージの最大の利点は？',
      options: [
        '取引が速い',
        '使いやすい',
        'オンライン攻撃から完全に保護',
        'コストが安い'
      ],
      correctAnswer: 2,
      explanation: 'コールドストレージはインターネットから切り離されているため、ハッキングやオンライン攻撃から完全に保護されます。'
    },
    {
      id: 'crypto-basics-7-q2',
      question: '資産の保管戦略で推奨される配分は？',
      options: [
        '100%ホットストレージ',
        '100%コールドストレージ',
        '大部分をコールド、少額をホット',
        '50%ずつ均等配分'
      ],
      correctAnswer: 2,
      explanation: '大部分の資産はコールドストレージで安全に保管し、日常使いの少額のみホットストレージで利便性を確保するのが推奨されます。'
    },
    {
      id: 'crypto-basics-7-q3',
      question: 'ハードウェアウォレットが安全な理由は？',
      options: [
        'インターネットに常時接続している',
        '秘密鍵がデバイス内で生成·保存される',
        '政府が保護している',
        '銀行が管理している'
      ],
      correctAnswer: 1,
      explanation: 'ハードウェアウォレットは秘密鍵をデバイス内で生成·保存し、取引署名もデバイス内で行うため、秘密鍵が外部に流出しません。'
    },
    {
      id: 'crypto-basics-7-q4',
      question: 'ペーパーウォレット作成時に最も重要な注意点は？',
      options: [
        'カラーで印刷する',
        'オフライン環境で作成する',
        '高価な紙を使う',
        '複雑なデザインにする'
      ],
      correctAnswer: 1,
      explanation: 'ペーパーウォレットはオフライン環境で作成し、使用したPCやプリンターを完全初期化することで、秘密鍵の漏洩を防ぎます。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};