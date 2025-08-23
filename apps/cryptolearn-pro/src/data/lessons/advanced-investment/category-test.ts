import type { CategoryTest } from '@/types';

export const advancedInvestmentCategoryTest: CategoryTest = {
  id: 'advanced-investment-category-test',
  categoryId: 'advanced-investment',
  title: '高度な投資戦略カテゴリー総合確認テスト',
  description: '60レッスン全範囲の高度な投資戦略知識を包括的に確認する最終テストです。2025年最新手法対応・25問で合格者には修了証を発行します。',
  lessonRange: '1-60',
  passingScore: 85,
  timeLimit: 50,
  questions: [
    {
      id: 'advanced-investment-category-q1',
      question: 'ハリー・マーコウィッツの現代ポートフォリオ理論（MPT）で、効率的フロンティアが表すものは何ですか？',
      options: [
        '各リスクレベルにおける最大リターンを提供する投資組合せ',
        '最小リスクを持つ投資組合せ',
        '最大リターンを持つ投資組合せ',
        'リスクフリー資産の組合せ'
      ],
      correctAnswer: 0,
      explanation: '効率的フロンティアは、各リスクレベルにおいて最大のリターンを提供する投資組合せを示す曲線です。これらの組合せは数学的に最適化されており、同じリスクレベルでより高いリターンを得ることはできません。',
      difficulty: 'advanced',
      category: 'portfolio-theory'
    },
    {
      id: 'advanced-investment-category-q2',
      question: 'シャープレシオ（Sharpe Ratio）を計算する際の分母に使用される指標は何ですか？',
      options: [
        '標準偏差（リスク）',
        '平均リターン',
        'ベータ値',
        '相関係数'
      ],
      correctAnswer: 0,
      explanation: 'シャープレシオは (ポートフォリオリターン - リスクフリーレート) / 標準偏差 で計算されます。標準偏差がリスクの指標として分母に使用され、リスク1単位あたりの超過リターンを測定します。',
      difficulty: 'advanced',
      category: 'performance-measurement'
    },
    {
      id: 'advanced-investment-category-q3',
      question: 'オプション取引において、デルタ（Delta）が表すものは何ですか？',
      options: [
        '時間減価の影響',
        '原資産価格変化に対するオプション価格の変化率',
        'ボラティリティの変化の影響',
        '金利変化の影響'
      ],
      correctAnswer: 1,
      explanation: 'デルタは原資産価格が1単位変化したときのオプション価格の変化量を表します。コールオプションは0～1、プットオプションは-1～0の値を取り、ヘッジ比率としても使用されます。',
      difficulty: 'advanced',
      category: 'derivatives'
    },
    {
      id: 'advanced-investment-category-q4',
      question: 'VaR（Value at Risk）の1%、1日VaRが1000万円の場合、この意味は何ですか？',
      options: [
        '1日で1000万円の利益が99%の確率で得られる',
        '1日で1000万円以上の損失が発生する確率が1%である',
        '1日で1000万円の損失が確実に発生する',
        '100日のうち1日は1000万円の損失が発生する'
      ],
      correctAnswer: 1,
      explanation: '1%、1日VaRが1000万円とは、統計的に1%の確率で1日に1000万円以上の損失が発生することを意味します。言い換えると、99%の確率で損失は1000万円以内に収まるということです。',
      difficulty: 'advanced',
      category: 'risk-management'
    },
    {
      id: 'advanced-investment-category-q5',
      question: 'ペアトレード（Pairs Trading）戦略の基本原理は何ですか？',
      options: [
        '相関性の高い2つの銘柄の価格差の収束を狙う',
        '2つの銘柄を同時に買う',
        '2つの銘柄を同時に売る',
        '相関性の低い2つの銘柄を組み合わせる'
      ],
      correctAnswer: 0,
      explanation: 'ペアトレードは、歴史的に相関性の高い2つの銘柄間の価格差（スプレッド）が一時的に拡大した際に、割高な銘柄を売り、割安な銘柄を買って、価格差の収束から利益を得る戦略です。',
      difficulty: 'advanced',
      category: 'trading-strategies'
    },
    {
      id: 'advanced-investment-category-q6',
      question: 'REITs（不動産投資信託）の最大の利点は何ですか？',
      options: [
        '不動産を直接所有できる',
        '少額から不動産投資が可能で流動性が高い',
        '完全にリスクフリーである',
        '税制上の優遇が一切ない'
      ],
      correctAnswer: 1,
      explanation: 'REITsの最大の利点は、少額の資金で多様な不動産に投資でき、株式と同様に証券取引所で売買できる高い流動性を持つことです。直接的な不動産投資に比べて管理負担も軽減されます。',
      difficulty: 'advanced',
      category: 'alternative-investments'
    },
    {
      id: 'advanced-investment-category-q7',
      question: 'アルファ（Alpha）とベータ（Beta）の違いは何ですか？',
      options: [
        'アルファはリスク、ベータはリターン',
        'アルファは絶対リターン、ベータは相対リターン',
        'アルファは市場超過リターン、ベータは市場感応度',
        'アルファとベータは同じ意味'
      ],
      correctAnswer: 2,
      explanation: 'アルファは市場（ベンチマーク）に対する超過リターンを表し、ファンドマネージャーの運用能力を示します。ベータは市場全体の動きに対する感応度を表し、1より大きいと市場より大きく変動します。',
      difficulty: 'advanced',
      category: 'performance-analysis'
    },
    {
      id: 'advanced-investment-category-q8',
      question: 'モンテカルロシミュレーションの投資分析における主な用途は何ですか？',
      options: [
        '過去のリターンを正確に再現する',
        '確実な将来のリターンを予測する',
        '多様な市場シナリオでのポートフォリオ性能を評価する',
        '単一の最適解を見つける'
      ],
      correctAnswer: 2,
      explanation: 'モンテカルロシミュレーションは、ランダムな変数を使用して数千通りの市場シナリオを生成し、各シナリオでのポートフォリオ性能を評価することで、リスク評価や資産配分の意思決定を支援します。',
      difficulty: 'advanced',
      category: 'quantitative-analysis'
    },
    {
      id: 'advanced-investment-category-q9',
      question: 'ヘッジファンドの「2-20」手数料構造とは何ですか？',
      options: [
        '管理手数料2%、成功報酬20%',
        '管理手数料20%、成功報酬2%',
        '最低投資額2万ドル、ロックアップ期間20ヶ月',
        '投資期間2年、利回り20%'
      ],
      correctAnswer: 0,
      explanation: 'ヘッジファンドの典型的な手数料構造で、運用資産に対して年間2%の管理手数料と、利益に対して20%の成功報酬を徴収します。この構造により、ファンドマネージャーの利益が投資家の利益と連動します。',
      difficulty: 'advanced',
      category: 'hedge-funds'
    },
    {
      id: 'advanced-investment-category-q10',
      question: 'ブラック-ショールズモデルでオプション価格に影響を与えない要素はどれですか？',
      options: [
        '原資産の現在価格',
        '行使価格',
        'リスクフリーレート',
        '投資家の投資経験'
      ],
      correctAnswer: 3,
      explanation: 'ブラック-ショールズモデルは、原資産価格、行使価格、満期までの時間、リスクフリーレート、ボラティリティの5つの変数でオプション価格を計算します。投資家の個人的特性は価格決定に影響しません。',
      difficulty: 'advanced',
      category: 'option-pricing'
    },
    {
      id: 'advanced-investment-category-q11',
      question: 'コモディティ投資の主なリスクは何ですか？',
      options: [
        '政治的安定のみ',
        '価格ボラティリティ、保管コスト、期限構造リスク',
        '流動性が高すぎること',
        '利息収入がないこと'
      ],
      correctAnswer: 1,
      explanation: 'コモディティ投資の主なリスクには、価格の高いボラティリティ、物理的保管コスト、先物カーブの形状による期限構造リスク（コンタンゴ/バックワーデーション）、天候や政治的要因の影響があります。',
      difficulty: 'advanced',
      category: 'commodities'
    },
    {
      id: 'advanced-investment-category-q12',
      question: 'ストレステストの主な目的は何ですか？',
      options: [
        '通常の市場条件での性能を測定する',
        '極端な市場条件下でのポートフォリオの脆弱性を評価する',
        '過去のリターンを分析する',
        '最適な資産配分を決定する'
      ],
      correctAnswer: 1,
      explanation: 'ストレステストは、金融危機、市場暴落、政治的危機などの極端な市場条件下でポートフォリオがどの程度の損失を被る可能性があるかを評価し、潜在的な脆弱性を特定する手法です。',
      difficulty: 'advanced',
      category: 'stress-testing'
    },
    {
      id: 'advanced-investment-category-q13',
      question: 'インデックス投資の最大の利点は何ですか？',
      options: [
        '市場を上回るリターンが保証される',
        '低コスト、分散投資、シンプルさ',
        '完全にリスクフリーである',
        '短期的な利益が大きい'
      ],
      correctAnswer: 1,
      explanation: 'インデックス投資の主な利点は、低い管理コスト、自動的な分散投資効果、理解しやすいシンプルな投資手法であることです。長期的には多くのアクティブファンドを上回る成果を示しています。',
      difficulty: 'advanced',
      category: 'passive-investing'
    },
    {
      id: 'advanced-investment-category-q14',
      question: 'アービトラージ取引の基本原理は何ですか？',
      options: [
        '高リスク高リターンを狙う',
        '同一資産の価格差を利用してリスクフリー利益を得る',
        '長期投資を行う',
        '投機的取引を行う'
      ],
      correctAnswer: 1,
      explanation: 'アービトラージは、同一または類似の金融商品が異なる市場で異なる価格で取引されている際の価格差を利用して、理論的にリスクフリーの利益を得る取引戦略です。',
      difficulty: 'advanced',
      category: 'arbitrage'
    },
    {
      id: 'advanced-investment-category-q15',
      question: 'プライベートエクイティ投資の特徴として正しいものはどれですか？',
      options: [
        '高い流動性と短期投資',
        '長期投資、低流動性、高いリターン期待',
        '完全に安全な投資',
        '少額から投資可能'
      ],
      correctAnswer: 1,
      explanation: 'プライベートエクイティ投資は、非上場企業への投資で、一般的に5-10年の長期投資期間、低い流動性、高いリスクを伴いますが、その代わりに高いリターンを期待できる投資形態です。',
      difficulty: 'advanced',
      category: 'private-equity'
    },
    {
      id: 'advanced-investment-category-q16',
      question: 'ファクター投資（Factor Investing）における代表的なファクターに含まれないものはどれですか？',
      options: [
        'バリュー（Value）',
        'モメンタム（Momentum）',
        'サイズ（Size）',
        'ラッキー（Lucky）'
      ],
      correctAnswer: 3,
      explanation: 'ファクター投資で一般的に認識されているファクターには、バリュー、モメンタム、サイズ、クオリティ、低ボラティリティなどがあります。「ラッキー」は学術的に認められたファクターではありません。',
      difficulty: 'advanced',
      category: 'factor-investing'
    },
    {
      id: 'advanced-investment-category-q17',
      question: 'ポートフォリオのリバランスを行う主な理由は何ですか？',
      options: [
        '取引コストを増やすため',
        '目標とする資産配分を維持するため',
        'すべての資産を売却するため',
        '税金を増やすため'
      ],
      correctAnswer: 1,
      explanation: 'リバランスは、市場の動きにより変化した資産配分を、当初設定した目標配分に戻すプロセスです。これにより、意図したリスクレベルを維持し、規律ある投資を継続できます。',
      difficulty: 'advanced',
      category: 'portfolio-management'
    },
    {
      id: 'advanced-investment-category-q18',
      question: 'ESG投資の3つの要素「E、S、G」が表すものは何ですか？',
      options: [
        'Economy, Society, Government',
        'Environmental, Social, Governance',
        'Equity, Stocks, Government bonds',
        'Emerging, Stable, Growth'
      ],
      correctAnswer: 1,
      explanation: 'ESGは Environmental（環境）、Social（社会）、Governance（企業統治）の3つの要素を表し、企業の持続可能性と社会的責任を評価する投資アプローチの基準として使用されます。',
      difficulty: 'advanced',
      category: 'sustainable-investing'
    },
    {
      id: 'advanced-investment-category-q19',
      question: 'レバレッジ効果の正しい説明はどれですか？',
      options: [
        '借入によりリスクとリターンの両方を拡大する効果',
        'リスクを減らす効果',
        '確実に利益を増やす効果',
        '税金を減らす効果'
      ],
      correctAnswer: 0,
      explanation: 'レバレッジ効果は、借入資金を使用することで投資規模を拡大し、利益が出た場合はより大きなリターンを、損失が出た場合はより大きな損失をもたらす効果です。リスクとリターンの両方が拡大されます。',
      difficulty: 'advanced',
      category: 'leverage'
    },
    {
      id: 'advanced-investment-category-q20',
      question: 'カバードコール戦略の目的は何ですか？',
      options: [
        '無制限の利益を狙う',
        '保有株式のインカムゲインを向上させる',
        '株価の大幅な上昇を狙う',
        '株式を空売りする'
      ],
      correctAnswer: 1,
      explanation: 'カバードコール戦略は、保有株式に対してコールオプションを売ることで、オプションプレミアムを受け取り、配当に加えてインカムゲインを向上させる保守的な戦略です。',
      difficulty: 'advanced',
      category: 'options-strategies'
    },
    {
      id: 'advanced-investment-category-q21',
      question: 'ドルコスト平均法（Dollar Cost Averaging）の主な利点は何ですか？',
      options: [
        '必ず利益が出ることが保証される',
        '価格変動リスクを時間分散により軽減する',
        '一回で最大利益を得られる',
        '市場タイミングを完璧に読む必要がある'
      ],
      correctAnswer: 1,
      explanation: 'ドルコスト平均法は、定期的に一定額を投資することで、価格が高い時は少ない口数を、価格が安い時は多い口数を購入し、平均購入単価を平準化して価格変動リスクを軽減する手法です。',
      difficulty: 'advanced',
      category: 'investment-strategies'
    },
    {
      id: 'advanced-investment-category-q22',
      question: 'クォンツ運用（Quantitative Investment）の特徴は何ですか？',
      options: [
        '感覚的な判断に基づく',
        '数理モデルとデータ分析に基づく系統的な運用',
        '少数の銘柄に集中投資',
        '短期的な市場の噂に基づく'
      ],
      correctAnswer: 1,
      explanation: 'クォンツ運用は、統計学、数学、コンピュータサイエンスを活用して、大量のデータを分析し、数理モデルに基づいて系統的に投資判断を行う運用手法です。',
      difficulty: 'advanced',
      category: 'quantitative-investing'
    },
    {
      id: 'advanced-investment-category-q23',
      question: 'スマートベータ戦略とは何ですか？',
      options: [
        '人工知能を使った投資',
        '時価総額加重以外の指標で構築されたインデックス投資',
        'ベータ値を1.0にする投資',
        'アルファ値を最大化する投資'
      ],
      correctAnswer: 1,
      explanation: 'スマートベータ戦略は、従来の時価総額加重インデックスではなく、バリュー、クオリティ、モメンタムなどのファクターや特定のルールに基づいて構築されたインデックスに投資する戦略です。',
      difficulty: 'advanced',
      category: 'smart-beta'
    },
    {
      id: 'advanced-investment-category-q24',
      question: 'ロング・ショート戦略の基本的な考え方は何ですか？',
      options: [
        '全て現金で保有する',
        '割安株をロング、割高株をショートして市場中立を保つ',
        '全て借入で投資する',
        'ランダムに売買する'
      ],
      correctAnswer: 1,
      explanation: 'ロング・ショート戦略は、割安と判断される株式を買い（ロング）、割高と判断される株式を空売り（ショート）することで、市場全体の動きに左右されずに相対的な価格差から利益を狙う戦略です。',
      difficulty: 'advanced',
      category: 'long-short'
    },
    {
      id: 'advanced-investment-category-q25',
      question: 'オルタナティブ投資の代表例に含まれないものはどれですか？',
      options: [
        'ヘッジファンド',
        'プライベートエクイティ',
        '大型株インデックスファンド',
        'コモディティ'
      ],
      correctAnswer: 2,
      explanation: 'オルタナティブ投資は、株式・債券以外の投資手段を指し、ヘッジファンド、プライベートエクイティ、不動産、コモディティなどが含まれます。大型株インデックスファンドは伝統的な株式投資に分類されます。',
      difficulty: 'advanced',
      category: 'alternative-investments'
    }
  ],
  lastUpdated: '2025-08-20',
  factChecked: true
};