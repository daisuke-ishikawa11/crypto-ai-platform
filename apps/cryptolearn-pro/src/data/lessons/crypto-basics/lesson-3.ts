import type { Lesson } from '@/types';

export const lesson3: Lesson = {
  id: 'crypto-basics-3',
  categoryId: 'crypto-basics',
  title: 'How Blockchain Works - ブロックチェーンの仕組み',
  slug: 'how-blockchain-works',
  description: 'ブロックチェーン技術の基本構造、動作原理、2025年現在の進歩と実装状況を詳しく解説します。',
  difficultyLevel: 'beginner',
  estimatedMinutes: 25,
  orderIndex: 3,
  content: {
    sections: [
      {
        id: 'section-1',
        title: 'ブロックチェーンの基本構造',
        orderIndex: 1,
        type: 'text',
        content: `
<p>ブロックチェーンは、取引データを「ブロック」という単位でまとめ、それらを暗号技術で「チェーン」状に連結した分散型台帳システムです。<br/>
「デジタル版の分散型会計帳簿」として、世界中のコンピューターで同じ記録を共有・管理しています。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">ブロックの構成要素（2025年版）</h2>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem;">
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
      <div style="background: #3b82f6; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">🔐</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #1e40af;">ハッシュ値</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">ブロックの固有識別子（SHA-256）。このブロックの「指紋」のような役割</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
      <div style="background: #f59e0b; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">🔗</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #d97706;">前のブロックのハッシュ</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">チェーン構造を形成する「鎖の輪」。これにより改ざんが検知される</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #16a34a;">
      <div style="background: #16a34a; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">🌳</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #16a34a;">マークルルート</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">ブロック内全取引のハッシュツリー。効率的な検証を可能にする</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #fdf4ff; border-radius: 8px; border-left: 4px solid #a855f7;">
      <div style="background: #a855f7; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">⏰</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #9333ea;">タイムスタンプ</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">ブロック生成時刻。時系列順序を保証し、不正な時間操作を防ぐ</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #fef2f2; border-radius: 8px; border-left: 4px solid #ef4444;">
      <div style="background: #ef4444; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">🔢</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #dc2626;">ナンス（Nonce）</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">マイニングで使用される数値。正解を見つけるまで何兆回も試行</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #f8fafc; border-radius: 8px; border-left: 4px solid #64748b;">
      <div style="background: #64748b; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">💳</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #475569;">取引データ</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">実際の送金情報。送信者、受信者、金額などの詳細データ</p>
      </div>
    </div>
    
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">チェーン構造の革新的特徴</h2>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🔗 相互連結</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">各ブロックは前のブロックを暗号学的に参照し、不変のチェーンを形成</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🛡️ 改ざん検知</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">一つでも改ざんすると全チェーンが無効になり、即座に検知される</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🌱 ジェネシスブロック</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">最初のブロックは「創世記ブロック」として特別な位置づけ</p>
  </div>
</div>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">💡 2025年現在の進歩</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">ブロックチェーン技術の実装拡大</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">2025年現在、ブロックチェーン技術は金融だけでなく、サプライチェーン、医療記録、不動産登記、投票システムなど様々な分野で実用化が進んでいます。</p>
</div>
        `
      },
      {
        id: 'section-2',
        title: '分散型ネットワークの革命',
        orderIndex: 2,
        type: 'text',
        content: `
<p>ブロックチェーンの真の革新性は、中央管理者なしで信頼できるシステムを実現したことです。<br/>
世界中の数千のコンピューターが協力して、単一の組織や政府に依存しないシステムを構築しています。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">中央集権 vs 分散型の決定的違い</h2>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
<div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #dc2626; margin: 0 0 1rem 0; text-align: center;">🏦 中央集権システム</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
<li><strong>単一管理者：</strong> 銀行、政府が全てを制御</li>
<li><strong>単一障害点：</strong> サーバー障害でシステム停止</li>
<li><strong>信頼依存：</strong> 管理者を信頼する必要がある</li>
<li><strong>検閲リスク：</strong> 取引停止・凍結の可能性</li>
<li><strong>運用時間：</strong> 営業時間内のみ</li>
</ul>
<div style="background: #fca5a5; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong style="color: #991b1b;">問題：</strong> 一点集中の脆弱性
</div>
</div>

<div style="background: #dcfce7; border: 2px solid #a7f3d0; border-radius: 12px; padding: 1.5rem;">
<h3 style="color: #16a34a; margin: 0 0 1rem 0; text-align: center;">🌐 分散型ブロックチェーン</h3>
<ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
<li><strong>多元管理：</strong> 世界中の数千ノードが協力</li>
<li><strong>無障害点：</strong> 一部停止でもシステム継続</li>
<li><strong>数学的信頼：</strong> 暗号学による技術的保証</li>
<li><strong>検閲耐性：</strong> 政府でも停止困難</li>
<li><strong>運用時間：</strong> 24時間365日無停止</li>
</ul>
<div style="background: #86efac; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong style="color: #14532d;">解決：</strong> 真の分散化と自立性
</div>
</div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年現在のノード構成</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white;">
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">ノードタイプ</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">数量（2025年）</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">主な役割</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">特徴</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">フルノード</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">約18,000台</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">全データ保存・検証</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">システムの骨格を支える</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">マイニングノード</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">約100,000台</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">新ブロック生成</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">セキュリティを提供</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">軽量ノード</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">数百万台</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">部分データ検証</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">モバイルアプリ用</td>
</tr>
<tr style="background: #dcfce7; font-weight: bold;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">合計</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">数百万台</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">完全分散化</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">世界最大のコンピューターネットワーク</td>
</tr>
</tbody>
</table>

<div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">🌍 グローバルネットワークの実情</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">世界180ヵ国以上で稼働</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">ビットコインネットワークは2025年現在、世界180ヵ国以上に分散した数百万台のコンピューターで構成され、人類史上最大の分散型システムとなっています。</p>
</div>
        `
      },
      {
        id: 'section-3',
        title: 'ハッシュ関数と暗号学的セキュリティ',
        orderIndex: 3,
        type: 'text',
        content: `
<p>ハッシュ関数はブロックチェーンのセキュリティの根幹を成す技術です。<br/>
一方向の数学的関数であり、入力データから一意の「指紋」を生成し、データの整合性を保証します。</p>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">SHA-256ハッシュ関数の5つの特徴</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🔒 固定長出力</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">入力データのサイズに関係なく、常に256ビット（64文字）のハッシュを出力</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🔄 決定的性</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">同じ入力は必ず同じハッシュを出力。再現性が保証される</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">⚡ 雪崩効果</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">入力のわずかな変化で出力ハッシュが完全に変わる。改ざん検知の基盤</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🚫 不可逆性</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">ハッシュから元のデータを逆算することは計算上不可能。セキュリティの核心</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🏃‍♂️ 計算効率性</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">高速な計算処理が可能。大量データの検証でも実用的な処理時間を実現</p>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">実際のハッシュ例：雪崩効果の体験</h2>

<div style="background: #f8fafc; border: 2px solid #94a3b8; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
  <h3 style="color: #1e40af; margin: 0 0 1rem 0; text-align: center;">ハッシュ値の比較例</h3>
  
  <div style="display: grid; grid-template-columns: 1fr; gap: 1rem; margin-top: 1rem;">
    <div style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 1rem; border-radius: 4px;">
      <p style="margin: 0; font-family: monospace; font-size: 0.9em; color: #1e40af;"><strong>入力:</strong> "Hello"</p>
      <p style="margin: 0.5rem 0 0 0; font-family: monospace; font-size: 0.85em; color: #374151;"><strong>出力:</strong> 2cf24dba4f21d4288094c68b9b80e2861e1b27b9c14ff9a5b07eb4fb68f9ca8b</p>
    </div>
    
    <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem; border-radius: 4px;">
      <p style="margin: 0; font-family: monospace; font-size: 0.9em; color: #d97706;"><strong>入力:</strong> "Hello!" <em>(たった1文字の追加)</em></p>
      <p style="margin: 0.5rem 0 0 0; font-family: monospace; font-size: 0.85em; color: #374151;"><strong>出力:</strong> 334d016f755cd6dc58c53a86e183882f8ec14f52fb05345887c8a5edd42c87b7</p>
    </div>
    
    <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 1rem; border-radius: 4px;">
      <p style="margin: 0; font-family: monospace; font-size: 0.9em; color: #dc2626;"><strong>入力:</strong> "hello" <em>(大文字を小文字に)</em></p>
      <p style="margin: 0.5rem 0 0 0; font-family: monospace; font-size: 0.85em; color: #374151;"><strong>出力:</strong> aaa9402664f1a41f40ebbc52c9993eb66aeb366602958fdfaa283b71e64db123</p>
    </div>
  </div>
  
  <div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
    <p style="margin: 0; color: #16a34a; font-weight: bold; text-align: center;">わずか1文字の変化で、ハッシュ値が完全に異なる！</p>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">ブロックチェーンセキュリティへの4つの応用</h2>

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem;">
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
      <div style="background: #3b82f6; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">1</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #1e40af;">ブロック間連結で改ざん防止</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">各ブロックのハッシュを次のブロックに含め、チェーン構造で改ざんを検知</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
      <div style="background: #f59e0b; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">2</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #d97706;">取引整合性検証</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">マークルツリーでブロック内全取引の整合性を効率的に検証</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #16a34a;">
      <div style="background: #16a34a; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">3</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #16a34a;">マイニング計算証明</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">Proof of Workで特定のパターンのハッシュを見つける計算作業を証明</p>
      </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #fdf4ff; border-radius: 8px; border-left: 4px solid #a855f7;">
      <div style="background: #a855f7; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">4</div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0; color: #9333ea;">デジタル署名認証</h4>
        <p style="margin: 0; color: #374151; font-size: 0.95em;">公開鍵暗号と組み合わせて、取引の正当性と本人認証を実現</p>
      </div>
    </div>
    
  </div>
</div>

<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #7c3aed; display: flex; align-items: center;">🔬 2025年の暗号学的進歩</h3>
<p style="margin: 0; font-weight: 500; color: #7c3aed;">量子耐性暗号の研究進展</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">将来の量子コンピューターへの対応として、SHA-256よりも強力な量子耐性ハッシュ関数の研究が進んでおり、2030年代には新世代の暗号技術への移行が予想されています。</p>
</div>
        `
      },
      {
        id: 'section-4',
        title: 'コンセンサスメカニズムと合意形成',
        orderIndex: 4,
        type: 'text',
        content: `
<p>コンセンサスメカニズムは、分散型ネットワークでの「合意形成」の仕組みです。<br/>
中央管理者がいない環境で、世界中の参加者が「正しい状態」について合意するためのルールです。</p>

<div style="background: #fef7ff; border-left: 4px solid #a855f7; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #7c3aed; display: flex; align-items: center;">🤔 なぜコンセンサスが必要？</h3>
<p style="margin: 0; font-weight: 500; color: #7c3aed;">「二重支払い問題」の解決</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">デジタルの世界では、同じお金を同時に複数の場所で使おうとする「二重支払い」が可能です。コンセンサスメカニズムはこの問題を技術的に解決します。</p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">Proof of Work（PoW）：ビットコインの方式</h2>

<div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
  <h3 style="color: #059669; margin: 0 0 1rem 0; text-align: center;">⛏️ 計算力による合意形成</h3>
  
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 1rem;">
    <div style="background: white; border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #16a34a;">仕組み</h4>
      <ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
        <li>計算問題を最初に解いたマイナーが勝利</li>
        <li>新ブロックの生成権と報酬を獲得</li>
        <li>他のノードが検証して承認</li>
      </ul>
    </div>
    
    <div style="background: white; border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #16a34a;">2025年の実態</h4>
      <ul style="margin: 0; padding-left: 1rem; color: #374151; font-size: 0.9em;">
        <li>ネットワーク計算力：750 EH/s</li>
        <li>1日の電力消費：約150 TWh/年</li>
        <li>51%攻撃コスト：約400億ドル/日</li>
      </ul>
    </div>
  </div>
</div>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: linear-gradient(90deg, #16a34a 0%, #15803d 100%); color: white;">
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">項目</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">メリット</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center; font-size: 1.1em;">デメリット</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">セキュリティ</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">16年間の実証済み、攻撃成功例なし</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">高い電力消費（年間150 TWh）</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">分散化</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">真の分散化、単一障害点なし</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">処理速度の制限（7 TPS）</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-align: center;">検閲耐性</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">政府や企業による停止が困難</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">スケーラビリティ問題</td>
</tr>
</tbody>
</table>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">他のコンセンサスメカニズム（2025年版）</h2>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🏆 Proof of Stake</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">保有量に基づく合意。イーサリアム2.0で採用、電力消費が99.95%減少</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">📈 Delegated PoS</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">代表者による効率的処理。EOS、Tronなどで実装、高速処理が可能</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; padding: 1.5rem;">
    <h3 style="color: #ffffff; margin: 0 0 1rem 0; font-size: 1.2em;">🏢 Proof of Authority</h3>
    <p style="margin: 0; line-height: 1.6; font-size: 0.95em;">許可制ネットワーク。企業向けブロックチェーンで幅広く利用</p>
  </div>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">2025年のコンセンサスメカニズム比較</h2>

<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<thead>
<tr style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white;">
<th style="padding: 15px; border: 1px solid #ddd; text-align: center;">メカニズム</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center;">代表例</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center;">電力効率</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center;">TPS</th>
<th style="padding: 15px; border: 1px solid #ddd; text-align: center;">特徴</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: bold;">PoW</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">ビットコイン</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #dc2626;">低（150 TWh/年）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">7</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">最高セキュリティ</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: bold;">PoS</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">イーサリアム</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">高（PoWの1/2000）</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">15</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">環境適合性</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: bold;">DPoS</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">EOS, Tron</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">高</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">4,000+</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">高速処理</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: bold;">PoA</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">VeChain</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #059669;">高</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">10,000+</td>
<td style="padding: 12px; border: 1px solid #ddd; text-align: center;">企業向け</td>
</tr>
</tbody>
</table>

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
<h3 style="margin: 0 0 0.5rem 0; color: #1e40af; display: flex; align-items: center;">🔮 将来のコンセンサス技術</h3>
<p style="margin: 0; font-weight: 500; color: #1e40af;">量子耐性とハイブリッドモデル</p>
<p style="margin: 0.5rem 0 0 0; color: #374151;">2025年現在、量子コンピューターの脅威に対応した量子耐性コンセンサスアルゴリズムや、PoWとPoSを組み合わせたハイブリッドモデルの研究が進んでいます。</p>
</div>
        `
      }
    ],
    keyPoints: [
      'ブロックチェーンはハッシュ関数で暗号学的に連結されたブロックの不変連鎖',
      '分散型ネットワーク（世界180ヵ国数百万台）により単一障害点を完全排除',
      'SHA-256ハッシュ関数の雪崩効果で改ざんを即座検知・防止',
      'コンセンサスメカニズム（PoW/PoS等）で中央管理者なしの合意形成',
      '数学的証明による透明性と不変性を技術的に保証',
      '2025年現在、金融からサプライチェーンまで様々な分野で実用化が進展'
    ],
    summary: 'ブロックチェーンは、SHA-256ハッシュ関数と世界最大の分散型ネットワークを活用した革新的な台帳技術です。コンセンサスメカニズムにより中央管理者なしで全参加者が同じ状態に合意し、改ざん不可能で透明性の高いシステムを実現。2025年現在、金融だけでなく医療、サプライチェーン、不動産など様々な分野で実用化が進んでいます。',
    practicalExamples: [
      'ビットコインネットワーク（2025年）: 10分間隔で約1.5MBブロック生成、世界18,000フルノード、攻撃コスト1日400億ドル',
      'イーサリアム PoS移行後: 12秒ブロック時間、900,000バリデーター、年間電力消費99.95%削減',
      '企業ブロックチェーン: JPモルガンのJPMコイン、1日5,000億ドル決済、従来比95%コスト削減',
      'サプライチェーン実装: ウォルマート食品追跡、2.2秒で汚染源特定（従来は6日18時間）',
      'NFT・デジタル所有権: OpenSeaで累計取引額800億ドル、デジタルアート市場を革新'
    ],
    warningNotes: [
      'ブロックチェーンの不可逆性：一度記録されたデータは削除・修正が基本的に不可能',
      '秘密鍵管理の重要性：プライベートキーを失うと資産に永久アクセス不可（年間推定40万BTC喪失）',
      '51%攻撃リスク：理論上は改ざん可能だが、ビットコインの場合1日400億ドルのコストで実質不可能',
      'スケーラビリティの制約：ビットコインは7TPS、イーサリアムは15TPSと従来決済システムより低速',
      'エネルギー消費問題：PoWネットワークは年間150TWh消費（アルゼンチン1国分）',
      'この情報は教育目的のみであり、投資助言ではありません。暗号資産投資は元本喪失リスクを含む高リスク投資です。'
    ]
  },
  quiz: [
    {
      id: 'crypto-basics-3-q1',
      question: '2025年現在、ビットコインネットワークの51%攻撃に必要な推定コストは？',
      options: [
        '1日約4億ドル',
        '1日約40億ドル',
        '1日約400億ドル',
        '1日約4,000億ドル'
      ],
      correctAnswer: 2,
      explanation: '2025年現在、ビットコインの計算力は750 EH/sに達し、51%攻撃には1日約400億ドルのコストが必要で、経済的に実質不可能です。'
    },
    {
      id: 'crypto-basics-3-q2',
      question: 'SHA-256ハッシュ関数の「雪崩効果」とは何ですか？',
      options: [
        '大量のデータを高速処理すること',
        '入力のわずかな変化で出力が大きく変化すること',
        'ハッシュ値のサイズが固定されること',
        'マイニング難易度が自動調整されること'
      ],
      correctAnswer: 1,
      explanation: '雪崩効果により、入力データの1文字でも変わると、出力ハッシュが完全に異なるものになり、改ざんの検知が可能になります。'
    },
    {
      id: 'crypto-basics-3-q3',
      question: 'イーサリアムのPoS移行（The Merge）による電力消費削減率は？',
      options: [
        '約50%',
        '約90%',
        '約99%',
        '約99.95%'
      ],
      correctAnswer: 3,
      explanation: 'イーサリアムは2022年9月のPoS移行により、電力消費を99.95%削減し、環境に優しいブロックチェーンを実現しました。'
    },
    {
      id: 'crypto-basics-3-q4',
      question: '2025年現在、世界中のビットコインフルノードの推定数は？',
      options: [
        '約1,800台',
        '約18,000台',
        '約180,000台',
        '約1,800,000台'
      ],
      correctAnswer: 1,
      explanation: '2025年現在、世界180ヵ国以上に分散した約18,000台のフルノードが、ビットコインネットワークの分散化と安全性を支えています。'
    },
    {
      id: 'crypto-basics-3-q5',
      question: 'コンセンサスメカニズムが解決する根本的な問題は？',
      options: [
        'トランザクション手数料の高騰',
        '二重支払い（Double Spending）問題',
        'ブロック生成時間の遅延',
        'ユーザーインターフェースの複雑さ'
      ],
      correctAnswer: 1,
      explanation: 'コンセンサスメカニズムは、デジタル環境で同じ通貨を複数回使用する「二重支払い問題」を技術的に解決しています。'
    },
    {
      id: 'crypto-basics-3-q6',
      question: 'Proof of Work以外のコンセンサスメカニズムで、企業向けブロックチェーンでよく使用されるのは？',
      options: [
        'Proof of Stake (PoS)',
        'Delegated Proof of Stake (DPoS)',
        'Proof of Authority (PoA)',
        'Proof of History (PoH)'
      ],
      correctAnswer: 2,
      explanation: 'Proof of Authority (PoA)は、許可された信頼できる機関が検証を行うため、企業やコンソーシアム向けのブロックチェーンで広く採用されています。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};