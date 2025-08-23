import type { Lesson } from '../../../types';
export const export const lesson16: Lesson = {
  id: 'candlestick-patterns-advanced',
  categoryId: 'trading-basics',
  title: 'ローソク足パターン（応用編）',
  slug: 'candlestick-patterns-advanced',
  description: 'より複雑なローソク足パターンと実戦での活用方法を学びます',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 35,
  orderIndex: 16,
  content: {
    sections: [
      {
        title: 'はじめに',
        content: `
          <p style="margin-bottom: 1rem;">前回の基本編に続き、今回はより高度なローソク足パターンについて学習します。これらのパターンは市場の転換点や継続を示す重要なシグナルとなり、トレーディングの精度向上に役立ちます。</p>
          
          <p style="margin-bottom: 1rem;">複雑なパターンは複数のローソク足の組み合わせで形成され、より信頼性の高いシグナルを提供します。しかし、だましも多いため、他のテクニカル指標との組み合わせが重要になります。</p>
        `
      },
      {
        title: '複数足反転パターン',
        content: `
          <h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">三兵（さんぺい）</h3>
          <p style="margin-bottom: 1rem;">3本の連続する陽線または陰線で形成される継続パターンです。</p>
          
          <div style="background: #f8f9fa; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <h4 style="color: #374151; margin: 0 0 0.5rem 0;">赤三兵（上昇継続）</h4>
            <ul style="margin: 0; padding-left: 1.5rem;">
              <li>3本連続の陽線</li>
              <li>各足の高値が前足を上回る</li>
              <li>実体が長く上ヒゲが短い</li>
              <li>強い買い圧力を示す</li>
            </ul>
          </div>
          
          <div style="background: #f8f9fa; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <h4 style="color: #374151; margin: 0 0 0.5rem 0;">三羽烏（下降継続）</h4>
            <ul style="margin: 0; padding-left: 1.5rem;">
              <li>3本連続の陰線</li>
              <li>各足の安値が前足を下回る</li>
              <li>実体が長く下ヒゲが短い</li>
              <li>強い売り圧力を示す</li>
            </ul>
          </div>
        `
      },
      {
        title: '明けの明星と宵の明星',
        content: `
          <h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">明けの明星パターン</h3>
          <p style="margin-bottom: 1rem;">下降トレンドの底値圏で出現する強力な反転シグナルです。3本のローソク足で構成されます。</p>
          
          <h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">明けの明星(モーニングスター)</h4>
          <div style="background: #f8f9fa; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <ol style="margin: 0; padding-left: 1.5rem;">
              <li><strong>1本目：</strong>大陰線（下降継続を示す）</li>
              <li><strong>2本目：</strong>小さな実体（十字線や小陽線・小陰線）窓開けして出現</li>
              <li><strong>3本目：</strong>大陽線（1本目の実体中央以上まで戻す）</li>
            </ol>
          </div>
          
          <h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">三川明けの明星</h4>
          <p style="margin-bottom: 1rem;">明けの明星の特殊形で、2本目が十字線（同事線）の場合をいいます。より強力な反転シグナルとされています。</p>
          
          <h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">宵の明星(イブニングスター)</h4>
          <div style="background: #f8f9fa; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <ol style="margin: 0; padding-left: 1.5rem;">
              <li><strong>1本目：</strong>大陽線（上昇継続を示す）</li>
              <li><strong>2本目：</strong>小さな実体（十字線や小陽線・小陰線）窓開けして出現</li>
              <li><strong>3本目：</strong>大陰線（1本目の実体中央以下まで下げる）</li>
            </ol>
          </div>
          
          <h4 style="color: #374151; margin: 1rem 0 0.5rem 0;">三川宵の明星</h4>
          <p style="margin-bottom: 1rem;">宵の明星の特殊形で、2本目が十字線の場合です。上昇トレンドの天井圏での強力な売りシグナルとなります。</p>
        `
      },
      {
        title: '包み線とはらみ線',
        content: `
          <h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">包み線（エンガルフィング）</h3>
          <p style="margin-bottom: 1rem;">前のローソク足を完全に包み込む形のパターンで、相場の転換を示唆します。</p>
          
          <div style="background: #f8f9fa; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <h4 style="color: #374151; margin: 0 0 0.5rem 0;">強気の包み線</h4>
            <ul style="margin: 0; padding-left: 1.5rem;">
              <li>下降トレンド中に出現</li>
              <li>1本目：陰線</li>
              <li>2本目：大陽線（前足の実体を完全に包む）</li>
              <li>買い転換のシグナル</li>
            </ul>
          </div>
          
          <div style="background: #f8f9fa; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <h4 style="color: #374151; margin: 0 0 0.5rem 0;">弱気の包み線</h4>
            <ul style="margin: 0; padding-left: 1.5rem;">
              <li>上昇トレンド中に出現</li>
              <li>1本目：陽線</li>
              <li>2本目：大陰線（前足の実体を完全に包む）</li>
              <li>売り転換のシグナル</li>
            </ul>
          </div>
          
          <h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">はらみ線（ハラミ）</h3>
          <p style="margin-bottom: 1rem;">大きなローソク足の後に、その実体内に収まる小さなローソク足が続くパターンです。</p>
          
          <div style="background: #f8f9fa; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <h4 style="color: #374151; margin: 0 0 0.5rem 0;">はらみ線の特徴</h4>
            <ul style="margin: 0; padding-left: 1.5rem;">
              <li>1本目：大きな実体のローソク足</li>
              <li>2本目：1本目の実体内に収まる小さなローソク足</li>
              <li>相場の迷いや転換の可能性を示す</li>
              <li>2本目が十字線の場合は「はらみ十字」と呼ばれ、より強いシグナル</li>
            </ul>
          </div>
        `
      },
      {
        title: '窓（ギャップ）のパターン',
        content: `
          <h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">窓の種類と意味</h3>
          <p style="margin-bottom: 1rem;">窓（ギャップ）は価格が連続せずに跳んで動く現象で、相場の強弱を示す重要なシグナルです。</p>
          
          <div style="background: #f8f9fa; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <h4 style="color: #374151; margin: 0 0 0.5rem 0;">普通の窓</h4>
            <ul style="margin: 0; padding-left: 1.5rem;">
              <li>レンジ相場で出現</li>
              <li>数日内に埋められることが多い</li>
              <li>トレンドの方向性を示すシグナルとしては弱い</li>
            </ul>
          </div>
          
          <div style="background: #f8f9fa; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <h4 style="color: #374151; margin: 0 0 0.5rem 0;">ブレイクアウェイ窓</h4>
            <ul style="margin: 0; padding-left: 1.5rem;">
              <li>新しいトレンドの始まりで出現</li>
              <li>大きな出来高を伴う</li>
              <li>埋められにくく、トレンド継続の強いシグナル</li>
            </ul>
          </div>
          
          <div style="background: #f8f9fa; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <h4 style="color: #374151; margin: 0 0 0.5rem 0;">継続窓（ランナウェイ窓）</h4>
            <ul style="margin: 0; padding-left: 1.5rem;">
              <li>トレンドの中間地点で出現</li>
              <li>強いトレンドの継続を示す</li>
              <li>「測定窓」とも呼ばれ、目標価格の算出に使用</li>
            </ul>
          </div>
          
          <div style="background: #f8f9fa; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <h4 style="color: #374151; margin: 0 0 0.5rem 0;">エクゾースチョン窓</h4>
            <ul style="margin: 0; padding-left: 1.5rem;">
              <li>トレンドの最終段階で出現</li>
              <li>相場の過熱を示す</li>
              <li>間もなく埋められ、トレンド転換の可能性が高い</li>
            </ul>
          </div>
        `
      },
      {
        title: '実践的な活用方法',
        content: `
          <h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">パターンの組み合わせ分析</h3>
          <p style="margin-bottom: 1rem;">単独のパターンだけでなく、複数のパターンや他のテクニカル指標との組み合わせで分析の精度を高めます。</p>
          
          <div style="background: #f8f9fa; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <h4 style="color: #374151; margin: 0 0 0.5rem 0;">確認すべき要素</h4>
            <ul style="margin: 0; padding-left: 1.5rem;">
              <li><strong>出来高：</strong>パターン形成時の出来高増加</li>
              <li><strong>トレンド：</strong>現在のトレンドの方向と強さ</li>
              <li><strong>サポート・レジスタンス：</strong>重要な価格帯での出現</li>
              <li><strong>他の指標：</strong>RSI、MACD等との整合性</li>
            </ul>
          </div>
          
          <h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">エントリータイミング</h3>
          <div style="background: #e3f2fd; padding: 1rem; border-radius: 4px; border-left: 4px solid #2196f3; margin: 1rem 0;">
            <h4 style="color: #1976d2; margin: 0 0 0.5rem 0;">反転パターンの場合</h4>
            <ul style="margin: 0; padding-left: 1.5rem;">
              <li>パターン完成後の次のローソク足でエントリー</li>
              <li>パターンの高値・安値をブレイクした時点</li>
              <li>確認のローソク足を待つ</li>
            </ul>
          </div>
          
          <div style="background: #e8f5e8; padding: 1rem; border-radius: 4px; border-left: 4px solid #4caf50; margin: 1rem 0;">
            <h4 style="color: #2e7d32; margin: 0 0 0.5rem 0;">継続パターンの場合</h4>
            <ul style="margin: 0; padding-left: 1.5rem;">
              <li>押し目・戻りでのエントリー</li>
              <li>ブレイクアウト後の再テストで参入</li>
              <li>窓埋めを狙った逆張り</li>
            </ul>
          </div>
          
          <h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">リスク管理</h3>
          <div style="background: #fff3e0; padding: 1rem; border-radius: 4px; border-left: 4px solid #ff9800; margin: 1rem 0;">
            <h4 style="color: #f57c00; margin: 0 0 0.5rem 0;">ストップロス設定</h4>
            <ul style="margin: 0; padding-left: 1.5rem;">
              <li>反転パターン：パターンの安値・高値の外側</li>
              <li>継続パターン：直近のサポート・レジスタンス</li>
              <li>窓埋めトレード：窓の反対側</li>
            </ul>
          </div>
        `
      }
    ],
    keyPoints: [
      '複数のローソク足から形成されるパターンはより信頼性が高い',
      '明けの明星・宵の明星は強力な反転シグナル',
      '包み線とはらみ線は相場の転換点を示唆',
      '窓のパターンはトレンドの段階を判断できる',
      '出来高や他の指標との組み合わせが重要',
      'エントリータイミングとリスク管理を明確にする'
    ],
    summary: `
      <p style="margin-bottom: 1rem;">応用編のローソク足パターンでは、複数足の組み合わせによるより複雑で信頼性の高いシグナルを学習しました。三兵、明けの明星・宵の明星、包み線・はらみ線、窓のパターンなど、それぞれが相場の異なる局面を示しています。</p>
      
      <p style="margin-bottom: 1rem;">これらのパターンを実際のトレーディングで活用する際は、単独で判断せず、出来高や他のテクニカル指標、サポート・レジスタンスレベルなどを総合的に分析することが重要です。また、適切なエントリータイミングとリスク管理により、パターンの有効性を最大限に活用できます。</p>
    `,
    practicalExamples: [
      '明けの明星パターンでの底値買いエントリー',
      '宵の明星パターンでの天井売りエントリー',
      '包み線パターンでのトレンド転換狙い',
      '継続窓でのトレンドフォロー戦略'
    ],
    warningNotes: [
      'だましのパターンも多いため、他の指標との組み合わせ分析が必須',
      '出来高を伴わないパターンは信頼性が低い',
      '市場環境や時間軸により有効性が変わる',
      '過去の成功にとらわれず、常に相場環境を考慮する'
    ]
  },
  quiz: [
    {
      id: 'q1',
      question: '「赤三兵」パターンの特徴として正しいものは？',
      options: [
        '3本連続の陰線で下降継続を示す',
        '3本連続の陽線で上昇継続を示す',
        '2本の陽線と1本の陰線の組み合わせ',
        '3本の十字線の組み合わせ'
      ],
      correctAnswer: 1,
      explanation: '赤三兵は3本連続の陽線で形成され、強い買い圧力による上昇継続を示すパターンです。'
    },
    {
      id: 'q2',
      question: '明けの明星パターンを構成する3本のローソク足の正しい順序は？',
      options: [
        '大陽線 → 小さな実体 → 大陰線',
        '大陰線 → 小さな実体 → 大陽線',
        '小陰線 → 大陽線 → 小陽線',
        '十字線 → 大陰線 → 大陽線'
      ],
      correctAnswer: 1,
      explanation: '明けの明星は、大陰線 → 小さな実体（窓開け） → 大陽線の順序で形成される反転パターンです。'
    },
    {
      id: 'q3',
      question: '「強気の包み線」パターンが示すシグナルは？',
      options: [
        '下降トレンドの継続',
        '上昇トレンドの継続',
        '下降から上昇への転換',
        'レンジ相場の継続'
      ],
      correctAnswer: 2,
      explanation: '強気の包み線は下降トレンド中に出現し、前足の陰線を大陽線が包み込むことで買い転換を示すパターンです。'
    },
    {
      id: 'q4',
      question: 'ブレイクアウェイ窓の特徴として正しいものは？',
      options: [
        '数日内に埋められることが多い',
        'レンジ相場で出現する',
        '新しいトレンドの始まりで出現し埋められにくい',
        'トレンドの最終段階で出現する'
      ],
      correctAnswer: 2,
      explanation: 'ブレイクアウェイ窓は新しいトレンドの始まりで出現し、大きな出来高を伴って埋められにくい特徴があります。'
    },
    {
      id: 'q5',
      question: 'ローソク足パターンを実践で活用する際の重要なポイントは？',
      options: [
        'パターンのみで判断する',
        '出来高や他の指標との組み合わせ分析',
        '過去の成功例をそのまま適用する',
        'パターンが完成する前にエントリーする'
      ],
      correctAnswer: 1,
      explanation: 'パターンの有効性を高めるには、出来高や他のテクニカル指標、サポート・レジスタンスレベルとの組み合わせ分析が重要です。'
    }
  ]
};