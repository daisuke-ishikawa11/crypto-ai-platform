import type { Lesson } from '../../../types';

export const lesson6: Lesson = {
  id: 'financial-literacy-portfolio-principles',
  categoryId: 'financial-literacy',
  title: '投資ポートフォリオの基本原則',
  slug: 'portfolio-principles',
  description: '効果的なポートフォリオ構築の理論と実践を学び、リスクとリターンのバランスを最適化する方法を習得します',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 35,
  orderIndex: 6,
  isPublished: true,
  tags: ['金融リテラシー', '投資基礎', '資産管理', 'ポートフォリオ理論'],
  
  content: {
    sections: [
      {
        type: 'text',
        title: 'ポートフォリオとは何か',
        content: `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 24px; border-radius: 12px; color: white; margin-bottom: 24px;">
  <h2 style="margin: 0 0 16px 0; font-size: 28px;">投資ポートフォリオの本質</h2>
  <p style="margin: 0; font-size: 18px; line-height: 1.6;">複数の資産を組み合わせることで、リスクを分散しながら安定したリターンを追求する投資戦略の中核</p>
</div>

<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">ポートフォリオの基本概念</h2>

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 16px 0;">
  <h3 style="color: #495057; margin-top: 0;">📊 ポートフォリオとは</h3>
  <p style="color: #495057; line-height: 1.8;">
    投資ポートフォリオは、個人や機関が保有する<strong>金融資産の組み合わせ</strong>を指します。
    株式、債券、不動産、暗号通貨など、様々な資産クラスを戦略的に組み合わせることで、
    <strong>リスクとリターンのバランス</strong>を最適化します。
  </p>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">なぜポートフォリオが重要なのか</h3>

<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <tr style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white;">
    <th style="padding: 12px; text-align: left; border: none;">重要性</th>
    <th style="padding: 12px; text-align: left; border: none;">説明</th>
    <th style="padding: 12px; text-align: left; border: none;">効果</th>
  </tr>
  <tr style="background: #f8f9fa;">
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>リスク分散</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">複数の資産に投資することで個別リスクを軽減</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">大損失の回避</td>
  </tr>
  <tr>
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>収益の安定化</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">異なる値動きの資産を組み合わせる</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">収益の変動を抑制</td>
  </tr>
  <tr style="background: #f8f9fa;">
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>機会の最大化</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">様々な成長機会を捉える</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">長期的な資産成長</td>
  </tr>
  <tr>
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>目標の達成</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">個人の投資目標に合わせて調整</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">計画的な資産形成</td>
  </tr>
</table>

<div style="background: #e3f2fd; padding: 16px; border-left: 4px solid #2196f3; margin: 20px 0;">
  <strong>💡 重要な洞察</strong><br>
  「すべての卵を一つのかごに入れるな」という格言は、投資においても真理です。
  ポートフォリオ理論は、この古い知恵を数学的・科学的に体系化したものです。
</div>`
      },
      {
        type: 'text',
        title: '現代ポートフォリオ理論（MPT）',
        content: `<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">ハリー・マーコウィッツの革新</h2>

<div style="background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
  <h3 style="color: white; margin-top: 0;">🏆 ノーベル経済学賞受賞理論</h3>
  <p style="color: white; margin: 0;">
    1952年にハリー・マーコウィッツが提唱した現代ポートフォリオ理論（Modern Portfolio Theory）は、
    リスクとリターンの関係を数学的に分析し、最適な資産配分を導き出す画期的な理論です。
  </p>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">効率的フロンティア</h3>

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h4 style="color: #495057;">📈 効率的フロンティアの概念</h4>
  <div style="background: white; padding: 16px; border-radius: 8px; margin-top: 12px;">
    <pre style="color: #495057; font-family: monospace;">
    リターン
    ↑
    │     ╱◆ 効率的フロンティア
    │   ╱ ╱
    │  ╱ ╱  ◇ 個別資産
    │ ╱ ╱   ◇
    │╱ ╱    ◇
    └─────────────→ リスク
    </pre>
  </div>
  <p style="color: #495057; margin-top: 12px;">
    同じリスクレベルで最大のリターンを提供する、または同じリターンで最小のリスクを持つ
    ポートフォリオの集合を表します。
  </p>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">相関係数の重要性</h3>

<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <tr style="background: #343a40; color: white;">
    <th style="padding: 12px; text-align: left;">相関係数</th>
    <th style="padding: 12px; text-align: left;">関係性</th>
    <th style="padding: 12px; text-align: left;">ポートフォリオへの影響</th>
  </tr>
  <tr style="background: #f8f9fa;">
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>+1.0</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">完全な正の相関</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">リスク分散効果なし</td>
  </tr>
  <tr>
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>0 〜 +1.0</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">弱い正の相関</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">部分的なリスク分散</td>
  </tr>
  <tr style="background: #f8f9fa;">
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>0</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">無相関</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">独立した値動き</td>
  </tr>
  <tr>
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>0 〜 -1.0</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">負の相関</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">優れたリスク分散</td>
  </tr>
  <tr style="background: #f8f9fa;">
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>-1.0</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">完全な負の相関</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">理論上リスクゼロ可能</td>
  </tr>
</table>

<div style="background: #fff3e0; padding: 16px; border-left: 4px solid #ff9800; margin: 20px 0;">
  <strong>🎯 実践のポイント</strong><br>
  相関係数が低い、または負の相関を持つ資産を組み合わせることで、
  ポートフォリオ全体のリスクを個別資産のリスクの合計よりも小さくできます。
</div>`
      },
      {
        type: 'text',
        title: '資産配分戦略',
        content: `<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">戦略的アセットアロケーション</h2>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 24px; border-radius: 12px; margin-bottom: 20px;">
  <h3 style="color: white; margin-top: 0;">🎯 資産配分の黄金比率</h3>
  <p style="color: white; margin: 0;">
    年齢、リスク許容度、投資目標に応じて最適な資産配分を決定する戦略的アプローチ
  </p>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">年齢別推奨配分モデル</h3>

<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <tr style="background: linear-gradient(90deg, #4CAF50 0%, #45a049 100%); color: white;">
    <th style="padding: 12px;">年齢層</th>
    <th style="padding: 12px;">株式</th>
    <th style="padding: 12px;">債券</th>
    <th style="padding: 12px;">代替資産</th>
    <th style="padding: 12px;">現金</th>
  </tr>
  <tr style="background: #f8f9fa;">
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>20-30代</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">70-80%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">10-15%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">5-10%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">5%</td>
  </tr>
  <tr>
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>30-40代</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">60-70%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">20-25%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">5-10%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">5-10%</td>
  </tr>
  <tr style="background: #f8f9fa;">
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>40-50代</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">50-60%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">30-35%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">5-10%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">5-10%</td>
  </tr>
  <tr>
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>50-60代</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">40-50%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">40-45%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">5%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">10%</td>
  </tr>
  <tr style="background: #f8f9fa;">
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>60代以上</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">30-40%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">50-55%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">0-5%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">10-15%</td>
  </tr>
</table>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">100マイナス年齢ルール</h3>

<div style="background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h4 style="color: #2e7d32;">📐 シンプルな配分公式</h4>
  <div style="background: white; padding: 16px; border-radius: 8px; margin-top: 12px;">
    <p style="font-size: 18px; color: #1b5e20; text-align: center; margin: 0;">
      <strong>株式の割合 = 100 - 年齢</strong>
    </p>
  </div>
  <p style="color: #2e7d32; margin-top: 16px;">
    例：35歳の場合<br>
    • 株式：65%（100 - 35）<br>
    • 債券・その他：35%<br><br>
    ※これは基本的な目安であり、個人のリスク許容度により調整が必要です
  </p>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">コア・サテライト戦略</h3>

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h4 style="color: #495057;">🎯 コア・サテライト構成</h4>
  
  <div style="display: flex; gap: 20px; margin-top: 16px;">
    <div style="flex: 1; background: #e3f2fd; padding: 16px; border-radius: 8px;">
      <h5 style="color: #1976d2; margin-top: 0;">コア（70-80%）</h5>
      <ul style="color: #495057; margin: 0;">
        <li>インデックスファンド</li>
        <li>ETF</li>
        <li>優良株式</li>
        <li>国債</li>
      </ul>
    </div>
    <div style="flex: 1; background: #fff3e0; padding: 16px; border-radius: 8px;">
      <h5 style="color: #f57c00; margin-top: 0;">サテライト（20-30%）</h5>
      <ul style="color: #495057; margin: 0;">
        <li>成長株</li>
        <li>新興市場</li>
        <li>暗号通貨</li>
        <li>コモディティ</li>
      </ul>
    </div>
  </div>
</div>`
      },
      {
        type: 'text',
        title: 'リバランシングの技術',
        content: `<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">ポートフォリオの調整と最適化</h2>

<div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 24px; border-radius: 12px; margin-bottom: 20px;">
  <h3 style="color: white; margin-top: 0;">⚖️ リバランシングの重要性</h3>
  <p style="color: white; margin: 0;">
    市場の変動により崩れた資産配分を定期的に調整し、目標配分を維持する重要な管理手法
  </p>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">リバランシングのタイミング</h3>

<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <tr style="background: #6c757d; color: white;">
    <th style="padding: 12px;">手法</th>
    <th style="padding: 12px;">実施時期</th>
    <th style="padding: 12px;">メリット</th>
    <th style="padding: 12px;">デメリット</th>
  </tr>
  <tr style="background: #f8f9fa;">
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>定期的</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">年1-2回</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">感情を排除、計画的</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">市場機会を逃す可能性</td>
  </tr>
  <tr>
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>閾値基準</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">±5%以上乖離時</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">効率的、コスト最小化</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">頻繁な監視が必要</td>
  </tr>
  <tr style="background: #f8f9fa;">
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>複合型</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">年次＋閾値</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">バランスが良い</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">やや複雑</td>
  </tr>
</table>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">リバランシング実例</h3>

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h4 style="color: #495057;">📊 実際のリバランシング例</h4>
  
  <table style="width: 100%; margin-top: 16px; border-collapse: collapse;">
    <tr style="background: #495057; color: white;">
      <th style="padding: 8px;">資産クラス</th>
      <th style="padding: 8px;">目標配分</th>
      <th style="padding: 8px;">現在配分</th>
      <th style="padding: 8px;">乖離</th>
      <th style="padding: 8px;">必要な行動</th>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #dee2e6;">国内株式</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: center;">30%</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: center; color: #dc3545;">35%</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: center; color: #dc3545;">+5%</td>
      <td style="padding: 8px; border: 1px solid #dee2e6;">売却</td>
    </tr>
    <tr style="background: #f8f9fa;">
      <td style="padding: 8px; border: 1px solid #dee2e6;">海外株式</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: center;">30%</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: center; color: #28a745;">28%</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: center; color: #28a745;">-2%</td>
      <td style="padding: 8px; border: 1px solid #dee2e6;">購入</td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #dee2e6;">債券</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: center;">30%</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: center; color: #28a745;">25%</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: center; color: #28a745;">-5%</td>
      <td style="padding: 8px; border: 1px solid #dee2e6;">購入</td>
    </tr>
    <tr style="background: #f8f9fa;">
      <td style="padding: 8px; border: 1px solid #dee2e6;">暗号通貨</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: center;">5%</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: center; color: #dc3545;">8%</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: center; color: #dc3545;">+3%</td>
      <td style="padding: 8px; border: 1px solid #dee2e6;">売却</td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #dee2e6;">現金</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: center;">5%</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: center;">4%</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: center;">-1%</td>
      <td style="padding: 8px; border: 1px solid #dee2e6;">保持</td>
    </tr>
  </table>
</div>

<div style="background: #e3f2fd; padding: 16px; border-left: 4px solid #2196f3; margin: 20px 0;">
  <strong>💡 リバランシングの心理的効果</strong><br>
  リバランシングは「高く売って安く買う」を自動的に実践する仕組みです。
  感情に左右されずに投資の基本原則を実行できます。
</div>`
      },
      {
        type: 'text',
        title: '暗号通貨のポートフォリオ組み込み',
        content: `<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">デジタル資産の戦略的配分</h2>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 24px; border-radius: 12px; margin-bottom: 20px;">
  <h3 style="color: white; margin-top: 0;">🪙 暗号通貨の位置づけ</h3>
  <p style="color: white; margin: 0;">
    高リスク・高リターンの代替資産として、伝統的ポートフォリオに新たな次元を追加
  </p>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">暗号通貨の配分ガイドライン</h3>

<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <tr style="background: linear-gradient(90deg, #ff6b6b 0%, #4ecdc4 100%); color: white;">
    <th style="padding: 12px;">投資家タイプ</th>
    <th style="padding: 12px;">推奨配分</th>
    <th style="padding: 12px;">構成例</th>
    <th style="padding: 12px;">リスクレベル</th>
  </tr>
  <tr style="background: #f8f9fa;">
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>保守的</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">0-3%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">BTC 100%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">低</td>
  </tr>
  <tr>
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>穏健派</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">3-5%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">BTC 70%, ETH 30%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">中</td>
  </tr>
  <tr style="background: #f8f9fa;">
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>積極的</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">5-10%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">BTC 50%, ETH 30%, アルト 20%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">高</td>
  </tr>
  <tr>
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>アグレッシブ</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">10-20%</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">多様な暗号資産</td>
    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">非常に高</td>
  </tr>
</table>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">暗号通貨ポートフォリオの内訳例</h3>

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h4 style="color: #495057;">🎯 バランス型暗号通貨配分（総資産の5%を暗号通貨とした場合）</h4>
  
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 16px;">
    <div style="background: #fff3cd; padding: 16px; border-radius: 8px;">
      <h5 style="color: #856404; margin-top: 0;">ビットコイン（50%）</h5>
      <p style="color: #856404; margin: 0;">
        • デジタルゴールド<br>
        • 最も流動性が高い<br>
        • 機関投資家の採用
      </p>
    </div>
    <div style="background: #cce5ff; padding: 16px; border-radius: 8px;">
      <h5 style="color: #004085; margin-top: 0;">イーサリアム（30%）</h5>
      <p style="color: #004085; margin: 0;">
        • スマートコントラクト基盤<br>
        • DeFiエコシステム<br>
        • NFT市場の中心
      </p>
    </div>
    <div style="background: #d4edda; padding: 16px; border-radius: 8px;">
      <h5 style="color: #155724; margin-top: 0;">大型アルトコイン（15%）</h5>
      <p style="color: #155724; margin: 0;">
        • BNB, SOL, ADA等<br>
        • 特定用途に特化<br>
        • 成長ポテンシャル
      </p>
    </div>
    <div style="background: #f8d7da; padding: 16px; border-radius: 8px;">
      <h5 style="color: #721c24; margin-top: 0;">ステーブルコイン（5%）</h5>
      <p style="color: #721c24; margin: 0;">
        • 価格安定性<br>
        • 利回り獲得可能<br>
        • 緊急時の避難先
      </p>
    </div>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">伝統的資産との相関性</h3>

<div style="background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h4 style="color: #2e7d32;">📈 相関係数の変化（2020-2024）</h4>
  
  <table style="width: 100%; margin-top: 16px; border-collapse: collapse;">
    <tr style="background: #2e7d32; color: white;">
      <th style="padding: 8px;">資産ペア</th>
      <th style="padding: 8px;">2020年</th>
      <th style="padding: 8px;">2024年</th>
      <th style="padding: 8px;">トレンド</th>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #dee2e6;">BTC vs S&P500</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: center;">0.15</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: center;">0.45</td>
      <td style="padding: 8px; border: 1px solid #dee2e6;">相関性上昇↑</td>
    </tr>
    <tr style="background: #f8f9fa;">
      <td style="padding: 8px; border: 1px solid #dee2e6;">BTC vs Gold</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: center;">0.10</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: center;">0.25</td>
      <td style="padding: 8px; border: 1px solid #dee2e6;">微増↑</td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #dee2e6;">ETH vs NASDAQ</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: center;">0.20</td>
      <td style="padding: 8px; border: 1px solid #dee2e6; text-align: center;">0.55</td>
      <td style="padding: 8px; border: 1px solid #dee2e6;">大幅上昇↑↑</td>
    </tr>
  </table>
</div>

<div style="background: #fff3e0; padding: 16px; border-left: 4px solid #ff9800; margin: 20px 0;">
  <strong>⚠️ 重要な注意点</strong><br>
  暗号通貨は依然として高ボラティリティ資産です。投資額は失っても生活に影響しない範囲に限定し、
  定期的な見直しとリバランシングを行うことが重要です。
</div>`
      },
      {
        type: 'text',
        title: '実践と継続的改善',
        content: `<h2 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 8px; margin: 24px 0 16px 0;">ポートフォリオ管理の実践</h2>

<div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); padding: 24px; border-radius: 12px; margin-bottom: 20px;">
  <h3 style="color: white; margin-top: 0;">🎯 成功への実践ステップ</h3>
  <p style="color: white; margin: 0;">
    理論を実践に移し、継続的な改善を通じて長期的な投資成功を実現する
  </p>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">ポートフォリオ構築の実践ステップ</h3>

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h4 style="color: #495057;">📋 段階的実施プラン</h4>
  
  <div style="margin-top: 16px;">
    <div style="background: white; padding: 16px; border-left: 4px solid #007bff; margin-bottom: 12px;">
      <h5 style="color: #007bff; margin-top: 0;">ステップ1：自己分析（1-2週間）</h5>
      <ul style="color: #495057; margin: 0;">
        <li>投資目標の明確化（退職、教育、住宅等）</li>
        <li>リスク許容度の評価</li>
        <li>投資期間の設定</li>
        <li>月々の投資可能額の算出</li>
      </ul>
    </div>
    
    <div style="background: white; padding: 16px; border-left: 4px solid #28a745; margin-bottom: 12px;">
      <h5 style="color: #28a745; margin-top: 0;">ステップ2：資産配分決定（1週間）</h5>
      <ul style="color: #495057; margin: 0;">
        <li>目標配分の設定</li>
        <li>投資商品の選定</li>
        <li>証券会社・取引所の選択</li>
        <li>コスト構造の理解</li>
      </ul>
    </div>
    
    <div style="background: white; padding: 16px; border-left: 4px solid #ffc107; margin-bottom: 12px;">
      <h5 style="color: #f57c00; margin-top: 0;">ステップ3：段階的投資開始（3-6ヶ月）</h5>
      <ul style="color: #495057; margin: 0;">
        <li>少額でのテスト投資</li>
        <li>ドルコスト平均法の活用</li>
        <li>市場の動きを観察</li>
        <li>感情のコントロール練習</li>
      </ul>
    </div>
    
    <div style="background: white; padding: 16px; border-left: 4px solid #dc3545; margin-bottom: 12px;">
      <h5 style="color: #dc3545; margin-top: 0;">ステップ4：本格運用（継続）</h5>
      <ul style="color: #495057; margin: 0;">
        <li>目標配分への移行</li>
        <li>定期的なモニタリング</li>
        <li>リバランシングの実施</li>
        <li>戦略の見直しと改善</li>
      </ul>
    </div>
  </div>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">パフォーマンス評価指標</h3>

<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <tr style="background: #343a40; color: white;">
    <th style="padding: 12px;">指標</th>
    <th style="padding: 12px;">計算方法</th>
    <th style="padding: 12px;">評価基準</th>
    <th style="padding: 12px;">使用目的</th>
  </tr>
  <tr style="background: #f8f9fa;">
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>総リターン</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">（終値-始値+配当）/始値</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">ベンチマーク比較</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">全体評価</td>
  </tr>
  <tr>
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>シャープレシオ</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">（リターン-無リスク金利）/標準偏差</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">>1.0が良好</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">リスク調整後評価</td>
  </tr>
  <tr style="background: #f8f9fa;">
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>最大ドローダウン</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">ピークからの最大下落率</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;"><-20%は要注意</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">リスク評価</td>
  </tr>
  <tr>
    <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>勝率</strong></td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">プラスリターン期間/全期間</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">>60%が理想</td>
    <td style="padding: 12px; border: 1px solid #dee2e6;">安定性評価</td>
  </tr>
</table>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">よくある失敗と対策</h3>

<div style="background: #f8d7da; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h4 style="color: #721c24;">⚠️ 避けるべき落とし穴</h4>
  
  <table style="width: 100%; margin-top: 16px; border-collapse: collapse;">
    <tr style="background: #721c24; color: white;">
      <th style="padding: 8px;">失敗パターン</th>
      <th style="padding: 8px;">結果</th>
      <th style="padding: 8px;">対策</th>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #dee2e6;">過度な集中投資</td>
      <td style="padding: 8px; border: 1px solid #dee2e6;">大損失リスク</td>
      <td style="padding: 8px; border: 1px solid #dee2e6;">分散投資の徹底</td>
    </tr>
    <tr style="background: #f8f9fa;">
      <td style="padding: 8px; border: 1px solid #dee2e6;">感情的な売買</td>
      <td style="padding: 8px; border: 1px solid #dee2e6;">買い高売り安</td>
      <td style="padding: 8px; border: 1px solid #dee2e6;">ルールベース投資</td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #dee2e6;">リバランシング怠慢</td>
      <td style="padding: 8px; border: 1px solid #dee2e6;">リスク増大</td>
      <td style="padding: 8px; border: 1px solid #dee2e6;">定期的な見直し</td>
    </tr>
    <tr style="background: #f8f9fa;">
      <td style="padding: 8px; border: 1px solid #dee2e6;">コスト軽視</td>
      <td style="padding: 8px; border: 1px solid #dee2e6;">収益性低下</td>
      <td style="padding: 8px; border: 1px solid #dee2e6;">手数料の最小化</td>
    </tr>
  </table>
</div>

<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 20px;">成功するポートフォリオの特徴</h3>

<div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h4 style="color: #155724;">✅ 優れたポートフォリオの共通点</h4>
  
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 16px;">
    <div style="background: white; padding: 12px; border-radius: 8px;">
      <strong style="color: #155724;">明確な目標</strong>
      <p style="color: #495057; margin: 8px 0 0 0;">具体的で測定可能な投資目標</p>
    </div>
    <div style="background: white; padding: 12px; border-radius: 8px;">
      <strong style="color: #155724;">適切な分散</strong>
      <p style="color: #495057; margin: 8px 0 0 0;">リスクを効果的に分散</p>
    </div>
    <div style="background: white; padding: 12px; border-radius: 8px;">
      <strong style="color: #155724;">低コスト</strong>
      <p style="color: #495057; margin: 8px 0 0 0;">手数料と税金の最小化</p>
    </div>
    <div style="background: white; padding: 12px; border-radius: 8px;">
      <strong style="color: #155724;">規律ある運用</strong>
      <p style="color: #495057; margin: 8px 0 0 0;">感情を排除した運用</p>
    </div>
    <div style="background: white; padding: 12px; border-radius: 8px;">
      <strong style="color: #155724;">長期視点</strong>
      <p style="color: #495057; margin: 8px 0 0 0;">短期変動に動揺しない</p>
    </div>
    <div style="background: white; padding: 12px; border-radius: 8px;">
      <strong style="color: #155724;">継続的改善</strong>
      <p style="color: #495057; margin: 8px 0 0 0;">定期的な見直しと調整</p>
    </div>
  </div>
</div>

<div style="background: #e3f2fd; padding: 16px; border-left: 4px solid #2196f3; margin: 20px 0;">
  <strong>📌 最後に</strong><br>
  ポートフォリオ構築は一度きりの作業ではなく、継続的なプロセスです。
  市場環境、個人の状況、投資目標の変化に応じて、柔軟に調整していくことが重要です。
  焦らず着実に、長期的な視点で取り組むことが成功への道です。
</div>`
      }
    ],
    keyPoints: [
      'ポートフォリオの基本概念と現代ポートフォリオ理論の理解',
      '効率的フロンティアと相関係数の重要性',
      '年齢とリスク許容度に応じた資産配分戦略',
      'リバランシングの重要性と実施方法',
      '暗号通貨を含む多様な資産クラスの組み合わせ',
      '継続的なモニタリングと改善の必要性'
    ],
    summary: 'このレッスンでは、投資ポートフォリオの基本原則について包括的に学習しました。現代ポートフォリオ理論から実践的な資産配分戦略、リバランシング技術、暗号通貨の組み込み方まで、効果的なポートフォリオ構築に必要な知識を習得しました。重要なのは、理論を理解した上で、個人の状況に合わせて柔軟に適用し、継続的に改善していくことです。',
    practicalExamples: [
      '年齢別の推奨資産配分モデルの適用',
      '100マイナス年齢ルールを使った簡易配分',
      'コア・サテライト戦略による安定性と成長性の両立',
      '四半期ごとのリバランシング実施',
      '暗号通貨を総資産の5%に限定した組み込み'
    ],
    warningNotes: [
      '投資判断は自己責任で行い、専門家への相談も検討してください',
      '過度な集中投資は避け、適切な分散を心がけてください',
      '暗号通貨は高リスク資産であることを認識してください',
      'リバランシングにかかるコストも考慮に入れてください',
      '市場環境の変化に応じて戦略の見直しが必要です'
    ]
  },

  quiz: [
    {
      id: 'portfolio-1',
      question: '現代ポートフォリオ理論（MPT）の提唱者は誰ですか？',
      options: [
        'ウォーレン・バフェット',
        'ハリー・マーコウィッツ',
        'ベンジャミン・グレアム',
        'ジョン・ボーグル'
      ],
      correctAnswer: 1,
      explanation: 'ハリー・マーコウィッツは1952年に現代ポートフォリオ理論を提唱し、後にノーベル経済学賞を受賞しました。'
    },
    {
      id: 'portfolio-2',
      question: '相関係数が-1.0の場合、2つの資産の関係はどのようなものですか？',
      options: [
        '完全に同じ動きをする',
        '全く関係がない',
        '完全に逆の動きをする',
        '部分的に似た動きをする'
      ],
      correctAnswer: 2,
      explanation: '相関係数が-1.0の場合、2つの資産は完全に逆の動きをします。理論上、この組み合わせでリスクをゼロにすることが可能です。'
    },
    {
      id: 'portfolio-3',
      question: '「100マイナス年齢ルール」で40歳の人の推奨株式配分は？',
      options: [
        '40%',
        '50%',
        '60%',
        '70%'
      ],
      correctAnswer: 2,
      explanation: '100 - 40 = 60%が株式への推奨配分となります。残りの40%は債券などの安定資産に配分します。'
    }
  ],
  lastUpdated: '2025-08-15',
  factChecked: true
};