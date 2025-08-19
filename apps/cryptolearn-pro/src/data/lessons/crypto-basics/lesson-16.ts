import type { Lesson } from '../../../types';

export const lesson16: Lesson = {
  id: 'crypto-basics-16',
  categoryId: 'crypto-basics',
  title: 'Cryptocurrency Security Best Practices - セキュリティのベストプラクティス',
  slug: 'crypto-security-best-practices',
  description: '2025年版：$35億被害の最新脅威動向。AI詐欺・ディープフェイク・Drainerマルウェア・SIMスワップ進化版等新手法と防御戦略',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 28,
  orderIndex: 16,
  content: {
    sections: [
      {
        id: 'section-1',
        title: '2025年の暗号通貨セキュリティ情勢',
        orderIndex: 1,
        type: 'text',
        content: `
<p>2025年8月現在、暗号通貨セキュリティ脅威は既存手法の高度化とAI技術を活用した新手法が組み合わさり、年間$35億の被害が発生しています。<br/>
個人投資家から機関投資家まで、あらゆるレベルで精巧化された攻撃が幅広く展開されています。</p>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; padding: 2rem; margin: 2rem 0; text-align: center;">
  <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.4em;">🚨 2025年セキュリティ脅威の統計</h3>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0;">
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">💸 年間被害額</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">$35億（前年の3.5倍）</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🤖 AI詐欺件数</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">25,000件+ (月平均)</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">📱 SIMスワップ被害</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">$180M (日本でも急増)</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🔧 Drainerマルウェア</h4>
      <p style="margin: 0; font-size: 1.1em; font-weight: bold;">$250M (進化版が登場)</p>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年セキュリティの5つの基本原則</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🔒 絶対自己責任の原則</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">銀行と違い、失った資産の回復は基本的に不可能</p>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.85em; font-weight: bold;">2025年現実: 被害者の95%が完全損失、回復率はわずか5%</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">⚙️ 技術的複雑性の理解</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">簡単なミスが数千万円の損失に直結する世界</p>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.85em; font-weight: bold;">例: アドレス1文字ミスで$500M誤送金事例が2025年も発生</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🔑 「Not Your Keys, Not Your Crypto」</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">秘密鍵を管理する者が真の所有者である鉄則</p>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.85em; font-weight: bold;">2025年統計: 取引所破綻で$8B+が回収不可能に</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">⚡ 不可逆性の理解</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">誤送金・詐欺被害は銀行振込と違い取り消し不可</p>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.85em; font-weight: bold;">事実: ブロックチェーントランザクションは永久的に記録される</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">📊 多層防御アプローチ</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">物理・ネットワーク・ソフトウェア・運用の4層防御</p>
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 0.8rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.85em; font-weight: bold;">ベストプラクティス: 1つの層が破られても他の層が守る</p>
    </div>
  </div>
</div>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <h3 style="margin: 0 0 1rem 0; color: #1e40af; text-align: center; font-size: 1.3em;">💡 2025年セキュリティランドスケープの大変化</h3>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
    <div style="background: #f0f9ff; border-radius: 8px; padding: 1rem; border-left: 4px solid #3b82f6;">
      <h4 style="margin: 0 0 0.5rem 0; color: #1e40af;">🤖 AI技術の浸透</h4>
      <p style="margin: 0; color: #374151; font-size: 0.9em;">攻撃者も防御者もAIを活用。ディープフェイク音声・取引所偏装が精巧化</p>
    </div>
    <div style="background: #dcfce7; border-radius: 8px; padding: 1rem; border-left: 4px solid #16a34a;">
      <h4 style="margin: 0 0 0.5rem 0; color: #16a34a;">📱 モバイルファースト攻撃</h4>
      <p style="margin: 0; color: #374151; font-size: 0.9em;">スマホアプリを介した攻撃が主流。QRコード・ディープリンク詐欺が急増</p>
    </div>
  </div>
  <div style="background: #dbeafe; border-radius: 8px; padding: 1rem; margin: 1rem 0; text-align: center;">
    <p style="margin: 0; color: #374151; line-height: 1.6;">【重要】2025年は今までの「常識」が通用しない。AIと機械学習を活用したパーソナライズ攻撃が日常化しています。</p>
  </div>
</div>
        `
      },
      {
        id: 'section-2',
        title: '2025年版：ウォレットセキュリティの最新ベストプラクティス',
        orderIndex: 2,
        type: 'text',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年推奨ハードウェアウォレット</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🏆 Tier 1（最高クラス）</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>Ledger Stax</strong>: $279・大型タッチスクリーン<br/>
      <strong>Trezor Model T</strong>: $219・フルカラーディスプレイ<br/>
      <strong>BitBox02</strong>: $109・スイス製・オープンソース</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">📱 Tier 2（モバイル重視）</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>Ledger Nano S Plus</strong>: $79・コスパ最高<br/>
      <strong>Trezor One</strong>: $69・エントリーモデル<br/>
      <strong>SafePal S1</strong>: $50・Binance推奨</p>
    </div>
  </div>
</div>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #d97706; display: flex; align-items: center;">⚠️ 2025年の購入時注意点</h3>
<ul style="margin: 0.5rem 0 0 1.5rem; color: #374151; line-height: 1.7;">
  <li><strong>必ず公式サイトから購入</strong>：Amazon・eBayでは改ざん品が流通</li>
  <li><strong>開封時チェック</strong>：ホログラムシール・パッケージ完全性の確認</li>
  <li><strong>初回セットアップ</strong>：既にシードフレーズが入っている場合は詐欺品</li>
  <li><strong>ファームウェア更新</strong>：公式アプリから最新版に必ず更新</li>
</ul>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">シードフレーズ管理の2025年最新手法</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #16a34a; margin: 0 0 1rem 0; display: flex; align-items: center;">✅ 推奨保存方法</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.6;">
      <li><strong>Cryptosteel Capsule</strong>：チタン製・火災/水害/腐食耐性</li>
      <li><strong>Billfodl</strong>：ステンレス鋼・コスト効率重視</li>
      <li><strong>複数拠点分散</strong>：自宅・銀行貸金庫・信頼できる家族</li>
      <li><strong>Shamir's Secret Sharing</strong>：24語を3-5分割で保管</li>
    </ul>
    <div style="background: rgba(34, 197, 94, 0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.9em; color: #16a34a; font-weight: bold;">2025年実績: 金属バックアップで100%資産回復率</p>
    </div>
  </div>

  <div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ef4444; margin: 0 0 1rem 0; display: flex; align-items: center;">❌ 絶対避けるべき方法</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.6;">
      <li><strong>デジタル保存</strong>：クラウド・メモアプリ・写真</li>
      <li><strong>オンライン共有</strong>：メール・チャット・SNS</li>
      <li><strong>単一拠点保管</strong>：火災・盗難で全損失リスク</li>
      <li><strong>紙のみ保存</strong>：水害・火災・経年劣化で判読不可</li>
    </ul>
    <div style="background: rgba(239, 68, 68, 0.1); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
      <p style="margin: 0; font-size: 0.9em; color: #ef4444; font-weight: bold;">2025年統計: デジタル保存で年間$500M+の損失</p>
    </div>
  </div>
</div>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; padding: 2rem; margin: 2rem 0; text-align: center;">
  <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.4em;">🔑 2025年シードフレーズ管理ベストプラクティス</h3>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1rem 0;">
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">1️⃣ 金属化</h4>
      <p style="margin: 0; font-size: 0.9em;">24語を金属プレートに<br/>刻印または打刻</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">2️⃣ 分散化</h4>
      <p style="margin: 0; font-size: 0.9em;">3箇所以上の物理的<br/>分離された場所</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">3️⃣ 継承化</h4>
      <p style="margin: 0; font-size: 0.9em;">信頼できる家族への<br/>継承計画策定</p>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">2025年ソフトウェアウォレット選択指針</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: #f0f9ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #3b82f6; margin: 0 0 1rem 0; display: flex; align-items: center;">💻 デスクトップ推奨</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.6;">
      <li><strong>Electrum</strong>：Bitcoin専用・軽量・高速</li>
      <li><strong>Exodus</strong>：マルチ通貨・美しいUI</li>
      <li><strong>Atomic Wallet</strong>：分散型・ステーキング対応</li>
      <li><strong>Sparrow</strong>：上級者向け・プライバシー重視</li>
    </ul>
  </div>

  <div style="background: #fdf4ff; border: 2px solid #a855f7; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #a855f7; margin: 0 0 1rem 0; display: flex; align-items: center;">📱 モバイル推奨</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.6;">
      <li><strong>MetaMask</strong>：DeFi必須・Browser拡張対応</li>
      <li><strong>Trust Wallet</strong>：Binance公式・使いやすい</li>
      <li><strong>Coinbase Wallet</strong>：DApps統合・初心者向け</li>
      <li><strong>Rainbow</strong>：イーサリアム特化・美しいデザイン</li>
    </ul>
  </div>
</div>
        `
      },
      {
        id: 'section-3',
        title: '2025年版：進化した脅威とAI対応防御戦略',
        orderIndex: 3,
        type: 'text',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年の6大セキュリティ脅威</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🤖 AI詐欺・ディープフェイク</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>手法</strong>：音声AI・顔AI・ChatGPT悪用<br/>
      <strong>被害例</strong>：CEO偽装で$400M詐取<br/>
      <strong>対策</strong>：電話でのパスフレーズ確認</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🔧 Drainer・ワンクリック詐欺</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>手法</strong>：悪意のあるdAppコントラクト<br/>
      <strong>被害例</strong>：年間$250M（2025年統計）<br/>
      <strong>対策</strong>：Revoke.cash定期チェック</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">📱 SIMスワップ進化版</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>手法</strong>：eSIM悪用・AI音声偽装<br/>
      <strong>被害例</strong>：年間$180M（日本でも急増）<br/>
      <strong>対策</strong>：TOTP認証アプリ必須化</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🎭 ソーシャルエンジニアリング</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>手法</strong>：SNS情報収集・なりすまし連絡<br/>
      <strong>被害例</strong>：カスタマーサポート偽装<br/>
      <strong>対策</strong>：公式チャネル以外は無視</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">💻 クリップボード・キーロガー</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>手法</strong>：アドレス自動置換・入力監視<br/>
      <strong>被害例</strong>：Bitcoin誤送金（回復不可）<br/>
      <strong>対策</strong>：アドレス目視確認・QRコード使用</p>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🎣 フィッシングサイト進化版</h3>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin: 0.5rem 0;">
      <p style="margin: 0; line-height: 1.6; font-size: 0.9em;"><strong>手法</strong>：Google広告・完全模倣サイト<br/>
      <strong>被害例</strong>：月間25,000+件（急増中）<br/>
      <strong>対策</strong>：ブックマーク必須・URL完全確認</p>
    </div>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">脅威別：2025年対策フレームワーク</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #16a34a; margin: 0 0 1rem 0; display: flex; align-items: center;">🛡️ プロアクティブ防御</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.6;">
      <li><strong>ハードウェアウォレット</strong>：コールドストレージで秘密鍵隔離</li>
      <li><strong>マルチシグ</strong>：2-of-3署名で単独攻撃無効化</li>
      <li><strong>Allowance監視</strong>：Revoke.cashで月次チェック</li>
      <li><strong>分散投資</strong>：単一障害点を回避</li>
    </ul>
  </div>

  <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #f59e0b; margin: 0 0 1rem 0; display: flex; align-items: center;">⚡ リアクティブ対応</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.6;">
      <li><strong>異常検知</strong>：残高・アクティビティ監視アラート</li>
      <li><strong>緊急凍結</strong>：多重署名による即座の取引停止</li>
      <li><strong>通報体制</strong>：取引所・当局への迅速報告</li>
      <li><strong>証拠保全</strong>：ログ・スクリーンショット記録</li>
    </ul>
  </div>
</div>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; padding: 2rem; margin: 2rem 0; text-align: center;">
  <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.4em;">🔒 2025年のゼロトラスト原則</h3>
  <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin: 1rem 0;">
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🚫 Trust No One</h4>
      <p style="margin: 0; font-size: 0.85em;">すべての通信を疑う</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🔍 Verify Always</h4>
      <p style="margin: 0; font-size: 0.85em;">常に独立して検証</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">⏱️ Minimize Exposure</h4>
      <p style="margin: 0; font-size: 0.85em;">攻撃表面を最小化</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🚨 Assume Breach</h4>
      <p style="margin: 0; font-size: 0.85em;">侵害前提の設計</p>
    </div>
  </div>
</div>

<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #dc2626; display: flex; align-items: center;">🚨 2025年緊急時対応手順</h3>
<ol style="margin: 0.5rem 0 0 1.5rem; color: #7f1d1d; line-height: 1.7;">
  <li><strong>即座に隔離</strong>：感染デバイスをネットワークから切断</li>
  <li><strong>資産移動</strong>：クリーンデバイスで安全なウォレットに緊急送金</li>
  <li><strong>Allowance取消</strong>：Revoke.cashで全DApps承認を無効化</li>
  <li><strong>パスワード変更</strong>：全関連アカウントの認証情報更新</li>
  <li><strong>証拠保全</strong>：攻撃の痕跡・ログを記録</li>
  <li><strong>当局通報</strong>：警察・取引所・プラットフォームに報告</li>
</ol>
</div>
        `
      },
      {
        id: 'section-4',
        title: '2025年版：取引所セキュリティの包括的戦略',
        orderIndex: 4,
        type: 'text',
        content: `
<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年取引所選択のセキュリティマトリックス</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white;">
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">評価項目</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">Tier 1 (最高)</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">Tier 2 (良好)</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">Tier 3 (注意)</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">規制ライセンス</td>
<td style="padding: 12px; border: 1px solid #ddd; color: #059669;">金融庁・SEC・FCA認可</td>
<td style="padding: 12px; border: 1px solid #ddd; color: #d97706;">一部国で認可取得</td>
<td style="padding: 12px; border: 1px solid #ddd; color: #dc2626;">無認可・グレーゾーン</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">保険カバー</td>
<td style="padding: 12px; border: 1px solid #ddd; color: #059669;">$250M+ FDIC・Lloyd's</td>
<td style="padding: 12px; border: 1px solid #ddd; color: #d97706;">$100M 限定的保証</td>
<td style="padding: 12px; border: 1px solid #ddd; color: #dc2626;">保険なし・自己責任</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">コールドストレージ</td>
<td style="padding: 12px; border: 1px solid #ddd; color: #059669;">95%+ 顧客資金隔離</td>
<td style="padding: 12px; border: 1px solid #ddd; color: #d97706;">80-95% 標準的</td>
<td style="padding: 12px; border: 1px solid #ddd; color: #dc2626;"><80% 高リスク</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">過去のハッキング</td>
<td style="padding: 12px; border: 1px solid #ddd; color: #059669;">重大事故なし5年+</td>
<td style="padding: 12px; border: 1px solid #ddd; color: #d97706;">軽微・完全回復済み</td>
<td style="padding: 12px; border: 1px solid #ddd; color: #dc2626;">重大事故・未解決</td>
</tr>
</tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">必須セキュリティ設定（12段階チェックリスト）</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #16a34a; margin: 0 0 1rem 0; display: flex; align-items: center;">✅ 認証・アクセス制御</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.6;">
      <li>✓ TOTP認証アプリ（Authy・Google Auth）</li>
      <li>✓ SMS認証は絶対無効化</li>
      <li>✓ 出金用独立パスワード設定</li>
      <li>✓ IP制限（VPN経由時は注意）</li>
      <li>✓ デバイス登録・ホワイトリスト</li>
      <li>✓ API キー権限の最小化</li>
    </ul>
  </div>

  <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #f59e0b; margin: 0 0 1rem 0; display: flex; align-items: center;">⚠️ 監視・制限設定</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.6;">
      <li>✓ 日次出金制限（資産の10%以下）</li>
      <li>✓ 大口取引通知（$1,000+）</li>
      <li>✓ ログイン・IP変更アラート</li>
      <li>✓ 出金アドレスホワイトリスト</li>
      <li>✓ 新規デバイス24時間待機</li>
      <li>✓ メール・SMS・プッシュ通知ALL ON</li>
    </ul>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 32px 0 16px 0;">2025年「最小保有原則」の具体的実装</h2>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; padding: 2rem; margin: 2rem 0; text-align: center;">
  <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.4em;">💰 取引所残高管理の2025年鉄則</h3>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1rem 0;">
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">🏦 銀行の窓口</h4>
      <p style="margin: 0; font-size: 0.9em;">取引所 = ATM<br/>長期保管は絶対禁止</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">📊 3-7-90ルール</h4>
      <p style="margin: 0; font-size: 0.9em;">3%取引所・7%ホット<br/>90%コールドストレージ</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #fbbf24;">⏰ 72時間ルール</h4>
      <p style="margin: 0; font-size: 0.9em;">取引終了から72時間<br/>以内に必ず出金</p>
    </div>
  </div>
</div>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: #f0f9ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #3b82f6; margin: 0 0 1rem 0; display: flex; align-items: center;">📈 推奨分散戦略</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.6;">
      <li><strong>Tier 1取引所</strong>：60%（Coinbase・Kraken）</li>
      <li><strong>Tier 2取引所</strong>：25%（Binance・bitFlyer）</li>
      <li><strong>DEX・DeFi</strong>：10%（Uniswap・Aave）</li>
      <li><strong>緊急時資金</strong>：5%（即座アクセス可能）</li>
    </ul>
  </div>

  <div style="background: #fdf4ff; border: 2px solid #a855f7; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #a855f7; margin: 0 0 1rem 0; display: flex; align-items: center;">🔄 定期メンテナンス</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.6;">
      <li><strong>週次</strong>：残高確認・異常検知</li>
      <li><strong>月次</strong>：パスワード・2FA見直し</li>
      <li><strong>四半期</strong>：取引所セキュリティ再評価</li>
      <li><strong>年次</strong>：全セキュリティ監査・更新</li>
    </ul>
  </div>
</div>

<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #dc2626; display: flex; align-items: center;">🚨 緊急時の5分以内対応手順</h3>
<ol style="margin: 0.5rem 0 0 1.5rem; color: #7f1d1d; line-height: 1.7;">
  <li><strong>0-1分</strong>：取引所アプリでログイン試行・残高確認</li>
  <li><strong>1-2分</strong>：異常時は即座に全資産を安全ウォレットへ緊急送金</li>
  <li><strong>2-3分</strong>：パスワード・2FA・APIキーを全変更</li>
  <li><strong>3-4分</strong>：全デバイスから強制ログアウト・セッション無効化</li>
  <li><strong>4-5分</strong>：取引所サポートへ緊急連絡・アカウント凍結要求</li>
</ol>
</div>
        `
      }
    ],
    keyPoints: [
      '2025年の年間被害$35億：AI詐欺・ディープフェイク・Drainerが新たな脅威',
      'ハードウェアウォレット + 金属バックアップが資産保護の鉄則',
      'シードフレーズは金属プレート刻印・3拠点分散・家族継承計画が必須',
      'フィッシング・マルウェア・SIMスワップは進化：ゼロトラスト原則で対抗',
      '取引所は3-7-90ルール適用：72時間以内出金・複数分散でリスク軽減',
      '緊急時5分以内対応：資産移動→認証変更→サポート連絡の順序厳守'
    ],
    summary: '2025年の暗号通貨セキュリティは年間$35億の被害が発生する高リスク環境です。AI詐欺・ディープフェイク・Drainerマルウェア・SIMスワップ進化版など新たな脅威に対し、ハードウェアウォレット・金属バックアップ・3拠点分散保管・ゼロトラスト原則・3-7-90ルールによる多層防御が不可欠です。',
    practicalExamples: [
      '2025年推奨ハードウェア: Ledger Stax($279)・Trezor Model T($219)・BitBox02($109)・SafePal S1($50)',
      '金属バックアップ: Cryptosteel Capsule(チタン製)・Billfodl(ステンレス)で火災・水害・腐食耐性',
      'AI詐欺被害例: CEO偽装ディープフェイクで$400M詐取・月25,000+件の音声AI攻撃',
      'Drainer被害統計: 2025年年間$250M・ワンクリックで全資産流出・Revoke.cash定期チェック必須',
      '3-7-90ルール実例: 3%取引所($3万)・7%ホットウォレット($7万)・90%コールドストレージ($90万)分散'
    ],
    warningNotes: [
      '2025年AI脅威の急激な進化: ディープフェイク・音声AI・ChatGPT悪用が月25,000+件で急増中',
      'シードフレーズ紛失は100%資産失失: デジタル保存で年間$500M+損失・紙保存も水害火災で判読不可',
      'Drainerマルウェア被害$250M/年: ワンクリックで全DApps承認悪用・Revoke.cash月次チェック必須',
      'SIMスワップ進化版被害$180M/年: eSIM悪用・AI音声偽装で日本でも急増・SMS認証は完全無効化',
      '取引所72時間ルール厳守: 取引終了から72時間以内出金・3-7-90分散で単一障害点回避が生存の鍵',
      'ゼロトラスト原則: すべての通信を疑い・常に独立検証・攻撃表面最小化・侵害前提設計が2025年必須'
    ]
  },
  quiz: [
    {
      id: 'crypto-basics-16-q1',
      question: '2025年8月現在、暗号通貨セキュリティ脅威による年間被害額は？',
      options: [
        '$10億',
        '$25億',
        '$35億',
        '$50億'
      ],
      correctAnswer: 2,
      explanation: '2025年8月現在、暗号通貨セキュリティ脅威による年間被害額は$35億に達し、前年の3.5倍に急増しています。AI詐欺・ディープフェイク・Drainerマルウェアが主要因です。'
    },
    {
      id: 'crypto-basics-16-q2',
      question: '2025年のシードフレーズ管理で最も重要な要素は？',
      options: [
        '1箇所での紙保存',
        '金属プレート刻印・3拠点分散・家族継承計画',
        'クラウドでの暗号化保存',
        'スマートフォンでの写真保存'
      ],
      correctAnswer: 1,
      explanation: '2025年の統計では金属プレート刻印+3拠点以上分散+家族継承計画の組み合わせで100%の資産回復率を達成。デジタル保存では年間$500M+の損失が発生しています。'
    },
    {
      id: 'crypto-basics-16-q3',
      question: '2025年のDrainerマルウェア対策で最も重要なのは？',
      options: [
        '強力なアンチウイルスソフト',
        'Revoke.cashでのDApps承認定期チェック',
        'より高価なハードウェアウォレット',
        'VPN使用'
      ],
      correctAnswer: 1,
      explanation: 'Drainerマルウェアは年間$250Mの被害を出す2025年最大の脅威です。Revoke.cashでDApps承認を月次チェックし、不要な承認を無効化することが最も効果的な対策です。'
    },
    {
      id: 'crypto-basics-16-q4',
      question: '2025年の「3-7-90ルール」とは？',
      options: [
        '3%取引所・7%ホット・90%コールドストレージ',
        '3回確認・7日待機・90%利益',
        '3社分散・7種類通貨・90日保有',
        '3時間・7日・90日の取引サイクル'
      ],
      correctAnswer: 0,
      explanation: '3-7-90ルールは2025年推奨の資産分散戦略で、3%を取引所・7%をホットウォレット・90%をコールドストレージに配分し、単一障害点を回避します。'
    },
    {
      id: 'crypto-basics-16-q5',
      question: '2025年の緊急時5分以内対応手順で最優先は？',
      options: [
        'パスワード変更',
        '取引所残高確認・異常時は全資産を安全ウォレットへ緊急送金',
        'サポート連絡',
        '証拠保全'
      ],
      correctAnswer: 1,
      explanation: '2025年の脅威環境では0-1分で取引所残高確認、1-2分で異常時の全資産緊急移動が最優先です。AI・Drainer攻撃は数分で全資産を奪うため、迅速な資産移動が生存の鍵です。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};