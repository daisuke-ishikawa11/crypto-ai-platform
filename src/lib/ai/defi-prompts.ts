// 📚 DeFi Prompts & Knowledge Base
// Curated prompts, protocol data, and educational content for AI responses

export interface ProtocolKnowledge {
  name: string;
  category: 'lending' | 'dex' | 'yield_farming' | 'derivatives' | 'insurance' | 'bridge';
  description: string;
  key_features: string[];
  risks: string[];
  typical_apy_range: [number, number];
  min_investment: number;
  supported_chains: string[];
  audit_status: 'audited' | 'partially_audited' | 'unaudited';
  governance_token?: string;
  founded_year: number;
  tvl_category: 'small' | 'medium' | 'large' | 'mega';
}

export interface RiskAssessmentTemplate {
  category: string;
  factors: Array<{
    factor: string;
    weight: number; // 0-1
    description: string;
    evaluation_criteria: string[];
  }>;
  scoring_method: string;
  disclaimer: string;
}

export interface EducationalContent {
  topic: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  content: string;
  examples: string[];
  common_mistakes: string[];
  related_topics: string[];
}

// Protocol Knowledge Base
export const PROTOCOL_KNOWLEDGE: Record<string, ProtocolKnowledge> = {
  'aave': {
    name: 'Aave',
    category: 'lending',
    description: 'Decentralized lending protocol supporting collateralized borrowing and lending across multiple chains',
    key_features: [
      'Flash loans without collateral',
      'Variable and stable interest rates',
      'Credit delegation',
      'Governance through AAVE token',
      'Safety module for protocol insurance'
    ],
    risks: [
      'Smart contract risk',
      'Liquidation risk',
      'Interest rate volatility',
      'Governance attacks',
      'Oracle manipulation'
    ],
    typical_apy_range: [2, 15],
    min_investment: 10,
    supported_chains: ['Ethereum', 'Polygon', 'Avalanche', 'Arbitrum', 'Optimism'],
    audit_status: 'audited',
    governance_token: 'AAVE',
    founded_year: 2020,
    tvl_category: 'mega'
  },
  'compound': {
    name: 'Compound',
    category: 'lending',
    description: 'Algorithmic money market protocol enabling lending and borrowing of crypto assets',
    key_features: [
      'Algorithmic interest rates',
      'Collateral-backed borrowing',
      'Governance through COMP token',
      'Composable cTokens',
      'Automatic compounding'
    ],
    risks: [
      'Smart contract vulnerabilities',
      'Liquidation cascades',
      'Governance centralization',
      'Oracle failures',
      'Market manipulation'
    ],
    typical_apy_range: [1, 12],
    min_investment: 1,
    supported_chains: ['Ethereum'],
    audit_status: 'audited',
    governance_token: 'COMP',
    founded_year: 2018,
    tvl_category: 'large'
  },
  'uniswap': {
    name: 'Uniswap V3',
    category: 'dex',
    description: 'Concentrated liquidity automated market maker with customizable fee tiers',
    key_features: [
      'Concentrated liquidity positions',
      'Multiple fee tiers (0.01%, 0.05%, 0.3%, 1%)',
      'Capital efficiency improvements',
      'NFT-based LP positions',
      'Governance through UNI token'
    ],
    risks: [
      'Impermanent loss',
      'Smart contract risk',
      'MEV extraction',
      'Liquidity fragmentation',
      'Price manipulation'
    ],
    typical_apy_range: [5, 50],
    min_investment: 50,
    supported_chains: ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'Base'],
    audit_status: 'audited',
    governance_token: 'UNI',
    founded_year: 2020,
    tvl_category: 'mega'
  },
  'curve': {
    name: 'Curve Finance',
    category: 'dex',
    description: 'Specialized AMM for stablecoins and similar assets with low slippage',
    key_features: [
      'Optimized for stablecoin trading',
      'Low slippage for similar assets',
      'Gauge-based liquidity incentives',
      'Vote-escrowed tokenomics (veCRV)',
      'Cross-chain deployments'
    ],
    risks: [
      'Smart contract complexity',
      'Depeg risk for stablecoins',
      'Governance centralization',
      'Liquidity migration',
      'Technical risk from upgrades'
    ],
    typical_apy_range: [3, 25],
    min_investment: 100,
    supported_chains: ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'Fantom'],
    audit_status: 'audited',
    governance_token: 'CRV',
    founded_year: 2020,
    tvl_category: 'mega'
  },
  'yearn': {
    name: 'Yearn Finance',
    category: 'yield_farming',
    description: 'Yield optimization protocol automatically moving funds between DeFi protocols',
    key_features: [
      'Automated yield farming strategies',
      'Professional strategy development',
      'Gas cost optimization',
      'Vault-based architecture',
      'Community-driven governance'
    ],
    risks: [
      'Strategy risk',
      'Smart contract complexity',
      'Dependency on external protocols',
      'Slashing risk',
      'Strategy migration risk'
    ],
    typical_apy_range: [4, 20],
    min_investment: 25,
    supported_chains: ['Ethereum', 'Fantom', 'Arbitrum'],
    audit_status: 'audited',
    governance_token: 'YFI',
    founded_year: 2020,
    tvl_category: 'large'
  }
};

// System Prompts for Different Use Cases
export const DEFI_SYSTEM_PROMPTS = {
  ADVISOR: `あなたは経験豊富なDeFi投資アドバイザーです。以下の専門知識を持っています：

専門分野：
- スマートコントラクト分析とリスク評価
- 利回り農業とステーキング戦略
- DEXの流動性提供とインパーマネントロス計算
- レンディングプロトコルの運用最適化
- クロスチェーンDeFi戦略
- ガス最適化とトランザクション戦略

重要な原則：
1. 常にリスクを最初に明確に説明する
2. 具体的で実行可能なアドバイスを提供する
3. 不確実性がある場合は明確に述べる
4. 規制リスクと税務への影響を考慮する
5. 詐欺プロジェクトやラグプルの可能性を警告する
6. 投資額は失っても良い範囲内に限定することを強調
7. 分散投資の重要性を常に強調する
8. 最新の市場状況を踏まえたアドバイスを提供する

回答形式：
- 簡潔で分かりやすい日本語
- リスクレベルの明示（低/中/高）
- 具体的なアクションステップ
- 関連プロトコルの客観的比較
- フォローアップ質問の提案
- 必須の免責事項

決して行ってはいけないこと：
- 特定の投資を確実に利益が出ると保証する
- 規制や税務に関する法的助言を提供する
- 個人的な財務状況について具体的な金額を推奨する
- 未監査や高リスクプロトコルを無条件で推奨する`,

  RISK_ASSESSMENT: `あなたはDeFi投資のリスク管理専門家です。以下の観点から包括的なリスク評価を行います：

リスク評価フレームワーク：
1. スマートコントラクトリスク
   - コード監査状況
   - 脆弱性の履歴
   - 開発チームの信頼性
   - アップグレード可能性

2. 流動性リスク
   - TVLの安定性
   - 出金制限の可能性
   - DEPEGリスク
   - 流動性枯渇の可能性

3. 市場リスク
   - ボラティリティ
   - インパーマネントロス
   - 価格操作の可能性
   - 相関リスク

4. 運用リスク
   - ガバナンス集中化
   - キーマンリスク
   - 運営継続性
   - 技術的な複雑さ

5. 規制リスク
   - 法的不確実性
   - 規制変更の影響
   - 地域的な制限
   - 税務の複雑さ

各リスクを1-10のスケールで評価し、総合的なリスクスコアを算出してください。
リスクが高い場合は、具体的な軽減策も提案してください。`,

  YIELD_OPTIMIZATION: `あなたはDeFi収益最適化の専門家です。現代ポートフォリオ理論とDeFi特有の要因を組み合わせて最適戦略を提案します：

最適化の考慮要素：
1. リスク調整後リターン
   - シャープレシオの最大化
   - ボラティリティの管理
   - 最大ドローダウンの制限

2. 流動性要件
   - 投資期間の制約
   - 出金手数料の最適化
   - ロックアップ期間の考慮

3. ガス効率性
   - トランザクション頻度の最適化
   - バッチ処理の機会
   - L2ソリューションの活用

4. 分散化要因
   - プロトコルリスクの分散
   - チェーン分散
   - 戦略の多様化

5. 税効率性
   - 実現損益のタイミング
   - ステーキング報酬の扱い
   - クロスチェーン取引の影響

最適化提案には以下を含めてください：
- 推奨配分比率
- 期待リターンと信頼区間
- リスク指標（VaR、最大ドローダウン等）
- リバランス頻度
- 出口戦略`,

  PROTOCOL_ANALYSIS: `あなたはDeFiプロトコルの詳細分析専門家です。以下の包括的フレームワークで分析を行います：

技術分析：
1. アーキテクチャ評価
   - スマートコントラクトの設計
   - セキュリティモデル
   - スケーラビリティ
   - 相互運用性

2. トークノミクス分析
   - インセンティブメカニズム
   - トークンの価値獲得
   - インフレ/デフレ要因
   - ガバナンス構造

経済分析：
1. ビジネスモデル
   - 収益源の多様性
   - 持続可能性
   - 競合優位性
   - 成長戦略

2. 市場ポジション
   - TVLトレンド
   - ユーザー獲得・維持
   - 市場シェア
   - ネットワーク効果

リスク分析：
1. 技術リスク
   - バグ・脆弱性
   - Oracle依存
   - 流動性リスク
   - 合成資産リスク

2. 事業リスク
   - 規制環境
   - 競合状況
   - チーム・ガバナンス
   - 経済的攻撃耐性

SWOTマトリックスと投資推奨事項を提供してください。`,

  MARKET_ANALYSIS: `あなたはDeFi市場の専門アナリストです。マクロ・ミクロ両面から市場を分析します：

マクロ経済分析：
1. 金融市場環境
   - 金利動向
   - インフレ/デフレ圧力
   - 法定通貨の動向
   - 地政学リスク

2. 暗号通貨市場全体
   - ビットコイン・イーサリアムトレンド
   - 市場サイクルの段階
   - 機関投資家の動向
   - 規制環境の変化

DeFi特有の分析：
1. セクター動向
   - TVLの流入・流出パターン
   - 新興プロトコルの動向
   - 収益率トレンド
   - チェーン間の競争

2. 技術発展
   - L2ソリューションの普及
   - 新しいプリミティブの登場
   - 相互運用性の向上
   - MEV対策技術

3. ユーザー行動
   - 流動性マイニングトレンド
   - ガバナンス参加率
   - クロスチェーン活動
   - リスク選好度の変化

市場センチメント指標、テクニカル分析、ファンダメンタル分析を組み合わせた包括的な市場見通しを提供してください。`
};

// Risk Assessment Templates
export const RISK_ASSESSMENT_TEMPLATES: Record<string, RiskAssessmentTemplate> = {
  LENDING_PROTOCOL: {
    category: 'Lending Protocol',
    factors: [
      {
        factor: 'Smart Contract Security',
        weight: 0.25,
        description: 'コードの品質、監査状況、バグの履歴',
        evaluation_criteria: [
          'フォーマル監査の実施状況',
          'バグバウンティプログラムの有無',
          '過去のエクスプロイト履歴',
          'コードの複雑さとテスト状況'
        ]
      },
      {
        factor: 'Liquidation Risk',
        weight: 0.20,
        description: '清算メカニズムの効率性と安定性',
        evaluation_criteria: [
          '清算閾値の適切さ',
          'Oracle価格フィードの信頼性',
          '清算プロセスの効率性',
          'システミック清算リスク'
        ]
      },
      {
        factor: 'Governance Risk',
        weight: 0.15,
        description: 'ガバナンス構造と意思決定プロセス',
        evaluation_criteria: [
          'トークン分布の集中度',
          '提案・投票プロセスの透明性',
          'タイムロックの実装状況',
          '緊急停止メカニズム'
        ]
      },
      {
        factor: 'Liquidity Risk',
        weight: 0.20,
        description: '流動性の安定性と利用可能性',
        evaluation_criteria: [
          'TVLの変動性',
          '利用率の適切な範囲',
          '大口出金への対応能力',
          '市場ストレス時の流動性維持'
        ]
      },
      {
        factor: 'Interest Rate Risk',
        weight: 0.20,
        description: '金利モデルの安定性と予測可能性',
        evaluation_criteria: [
          '金利アルゴリズムの妥当性',
          '金利変動の範囲と頻度',
          'ボラティリティへの対応',
          '長期的な持続可能性'
        ]
      }
    ],
    scoring_method: '各要因を1-10で評価し、重み付け平均を計算。7以上：低リスク、4-7：中リスク、4未満：高リスク',
    disclaimer: 'この評価は教育目的のみです。投資決定前に独自の調査を行ってください。DeFiプロトコルには常に資金損失のリスクが伴います。'
  },
  DEX_PROTOCOL: {
    category: 'DEX Protocol',
    factors: [
      {
        factor: 'Impermanent Loss Risk',
        weight: 0.30,
        description: 'インパーマネントロスの大きさと頻度',
        evaluation_criteria: [
          '資産ペアの相関性',
          '価格ボラティリティ',
          '手数料による補償効果',
          'リバランシング頻度'
        ]
      },
      {
        factor: 'Smart Contract Security',
        weight: 0.25,
        description: 'AMM設計とセキュリティ実装',
        evaluation_criteria: [
          'AMM数式の経済的安全性',
          'フラッシュローン攻撃耐性',
          'MEV保護メカニズム',
          '監査とコード品質'
        ]
      },
      {
        factor: 'Liquidity Depth',
        weight: 0.20,
        description: '流動性の深さと安定性',
        evaluation_criteria: [
          'プール内TVLの大きさ',
          '流動性提供者の多様性',
          'インセンティブの持続性',
          'スリッページ耐性'
        ]
      },
      {
        factor: 'Fee Structure',
        weight: 0.15,
        description: '手数料体系の競争力と合理性',
        evaluation_criteria: [
          '手数料率の市場競争力',
          '手数料分配の透明性',
          'プロトコル収益の持続性',
          'LPへの適切な報酬分配'
        ]
      },
      {
        factor: 'MEV Risk',
        weight: 0.10,
        description: 'MEV抽出による損失リスク',
        evaluation_criteria: [
          'サンドイッチ攻撃への脆弱性',
          'フロントランニング対策',
          'スリッページ保護機能',
          '順序付け公平性'
        ]
      }
    ],
    scoring_method: '各要因を1-10で評価し、重み付け平均を計算。7以上：低リスク、4-7：中リスク、4未満：高リスク',
    disclaimer: 'DEX使用には常にインパーマネントロスとスマートコントラクトリスクが伴います。流動性提供前にリスクを十分理解してください。'
  }
};

// Educational Content Library
export const EDUCATIONAL_CONTENT: Record<string, EducationalContent> = {
  IMPERMANENT_LOSS_BASICS: {
    topic: 'インパーマネントロスの基礎',
    level: 'beginner',
    content: `インパーマネントロス（IL）は、AMM型DEXで流動性提供時に発生する機会損失です。

発生メカニズム：
1. 流動性プールに2つの資産を預ける
2. 片方の資産価格が相対的に変化
3. AMM機能により自動的にリバランス
4. 単純保有と比較して価値が減少

計算式：
IL = (2×√(価格比率)) / (1 + 価格比率) - 1

例：ETH/USDTプールでETH価格が2倍になった場合
IL = (2×√2) / (1 + 2) - 1 ≈ -5.7%

軽減策：
- 相関性の高い資産ペア選択
- 手数料収入による補償効果活用
- 短期間での戦略実行
- ステーブルコインペアの優先`,
    examples: [
      'ETH/USDT: ETH価格50%上昇時のIL = 2.0%',
      'BTC/ETH: 両資産の価格変動が相殺される場合のIL = 0.1%以下',
      'DAI/USDC: ステーブル同士のペアでのIL = ほぼ0%'
    ],
    common_mistakes: [
      '価格変動の大きいペアでの長期運用',
      '手数料収入を考慮しない計算',
      '出金タイミングの最適化不足',
      '複数プールでのリスク分散不足'
    ],
    related_topics: ['AMM仕組み', '流動性マイニング', 'DEXトレーディング', 'リスク管理']
  },
  YIELD_FARMING_STRATEGIES: {
    topic: 'イールドファーミング戦略',
    level: 'intermediate',
    content: `イールドファーミングは複数のDeFiプロトコルを組み合わせて最大リターンを追求する戦略です。

基本戦略：
1. 単純流動性提供
   - DEXでのLP提供
   - 手数料収入＋トークン報酬

2. レンディング＋借入
   - 担保提供で借入実行
   - 借入資産でさらに運用

3. ステーキング
   - プロトコルトークンのステーキング
   - 議決権行使による追加報酬

4. 複合戦略
   - 複数プロトコル組み合わせ
   - 自動複利機能活用

リスク管理：
- ポジション分散（プロトコル・チェーン）
- 定期的なリバランス
- 出口戦略の事前設定
- 税務効率の考慮`,
    examples: [
      'Curve + Convex戦略：ステーブルコインLPをConvexでブースト',
      'Aave + Compound レンディング戦略：金利差を活用した裁定取引',
      'Uniswap V3 集中流動性：狭いレンジでの高効率運用'
    ],
    common_mistakes: [
      'ガス代を考慮しない小額運用',
      '複数プロトコルリスクの軽視',
      '税務上の複雑さの無視',
      '市場変動時の対応策不備'
    ],
    related_topics: ['リスク管理', 'ガス最適化', '税務戦略', 'ポートフォリオ管理']
  },
  SMART_CONTRACT_RISKS: {
    topic: 'スマートコントラクトリスク',
    level: 'advanced',
    content: `スマートコントラクトリスクは、コードの脆弱性や設計ミスによって発生する資金損失リスクです。

主要リスクカテゴリ：

1. コードバグリスク
   - ロジックエラー
   - 境界条件の考慮不足
   - 再帰攻撃脆弱性
   - オーバーフロー/アンダーフロー

2. 経済的攻撃リスク
   - フラッシュローン攻撃
   - Oracle操作攻撃
   - ガバナンス攻撃
   - MEV攻撃

3. アップグレードリスク
   - プロキシコントラクト
   - 管理者権限の濫用
   - アップグレードの透明性
   - 分散化レベル

リスク評価手法：
1. コード監査レポート確認
2. TVLと運用期間の評価
3. バグバウンティプログラム
4. 開発チームの信頼性
5. 分散化レベルの測定

保護策：
- 複数の監査済みプロトコル使用
- 資金の分散投資
- 保険プロトコルの活用
- 段階的な投資実行`,
    examples: [
      '2021年Poly Network攻撃：6億ドル超の損失',
      '2022年Ronin Bridge攻撃：6.2億ドルの盗難',
      '2020年bZx攻撃：フラッシュローンによる価格操作'
    ],
    common_mistakes: [
      '監査レポートの内容を読まない',
      '新しいプロトコルへの大量資金投入',
      '保険オプションの軽視',
      'リスクの集中（単一プロトコル依存）'
    ],
    related_topics: ['セキュリティ監査', '保険プロトコル', 'リスク分散', 'プロトコル選択']
  }
};

// Prompt Templates for Specific Queries
export const PROMPT_TEMPLATES = {
  PROTOCOL_COMPARISON: (protocols: string[], criteria: string[]) => `
以下のDeFiプロトコルを客観的に比較分析してください：

比較対象プロトコル：
${protocols.map(p => `- ${p}`).join('\n')}

比較観点：
${criteria.map(c => `- ${c}`).join('\n')}

各プロトコルについて以下を評価してください：
1. 技術的優位性と特徴
2. セキュリティ・監査状況
3. 収益性（APY、手数料構造）
4. 流動性とTVL状況
5. ガバナンスと分散化レベル
6. ユーザーエクスペリエンス
7. 将来性とロードマップ

最後に、異なる投資家プロファイルに対する推奨を提供してください：
- 保守的投資家（低リスク・安定収益重視）
- バランス型投資家（リスク・リターンバランス）
- 積極的投資家（高リターン追求）
`,

  RISK_ANALYSIS: (protocol: string, amount: number, timeframe: string) => `
${protocol}プロトコルでの${amount.toLocaleString()}ドル、${timeframe}期間の投資について包括的リスク分析を実施してください。

分析項目：
1. プロトコル固有リスク
   - スマートコントラクトセキュリティ
   - 流動性リスク
   - ガバナンスリスク
   - 技術的リスク

2. 市場リスク
   - 価格ボラティリティ
   - インパーマネントロス（該当する場合）
   - 相関リスク
   - 流動性枯渇リスク

3. 運用リスク
   - ガス費用変動
   - 機会損失
   - 税務複雑さ
   - 出金制限

4. マクロリスク
   - 規制環境変化
   - 市場全体の下落
   - ブラックスワンイベント
   - 技術的障害

各リスクレベルを1-10で評価し、総合リスクスコアを算出してください。
また、リスク軽減策も具体的に提示してください。
`,

  YIELD_OPTIMIZATION: (portfolio: unknown, preferences: { riskTolerance?: string; investmentHorizon?: string; liquidityNeed?: string } ) => `
以下のポートフォリオと投資家プロファイルに基づいて、最適な収益戦略を提案してください：

現在のポートフォリオ：
${JSON.stringify(portfolio, null, 2)}

投資家プロファイル：
- リスク許容度: ${String(preferences?.riskTolerance ?? '')}
- 投資期間: ${String(preferences?.investmentHorizon ?? '')}
- 流動性ニーズ: ${String(preferences?.liquidityNeed ?? '中程度')}

最適化目標：
1. リスク調整後リターンの最大化
2. 分散化によるリスク軽減
3. ガス効率性の向上
4. 税務効率の考慮

提案には以下を含めてください：
- 推奨プロトコルと配分比率
- 期待APYと信頼区間
- リスク指標（VaR、最大ドローダウン）
- 実行手順とタイミング
- モニタリングポイント
- 出口戦略

各推奨について、理由と根拠を明確に説明してください。
`,

  MARKET_OUTLOOK: (timeframe: string, focus_areas: string[]) => `
${timeframe}の期間でDeFi市場の見通しを分析してください：

分析フォーカス：
${focus_areas.map(area => `- ${area}`).join('\n')}

分析フレームワーク：
1. マクロ経済環境
   - 金融政策の影響
   - インフレ・金利動向
   - 地政学リスク
   - 規制環境変化

2. 暗号通貨市場全体
   - ビットコイン・イーサリアムトレンド
   - 市場サイクルの段階分析
   - 機関投資家動向
   - 採用・普及状況

3. DeFi固有要因
   - TVL流入・流出トレンド
   - プロトコル間競争
   - 技術革新の影響
   - ユーザー行動変化

4. セクター別展望
   - レンディング市場
   - DEX・AMM進化
   - 新興カテゴリー
   - クロスチェーン展開

結論として、投資戦略への具体的示唆を提供してください。
`
};

// Response format templates
export const RESPONSE_FORMATS = {
  STRUCTURED_ANALYSIS: {
    sections: ['概要', 'リスク評価', '収益性分析', '推奨事項', '注意点'],
    format: 'markdown',
    include_disclaimer: true
  },
  QUICK_ADVICE: {
    sections: ['直接回答', '主要リスク', '次のステップ'],
    format: 'plain',
    include_disclaimer: true
  },
  COMPARISON_TABLE: {
    sections: ['比較表', '総合評価', '推奨ランキング'],
    format: 'table + text',
    include_disclaimer: true
  }
};

// Standard disclaimers
export const DISCLAIMERS = {
  INVESTMENT_ADVICE: '本情報は教育目的のみであり、投資助言ではありません。投資決定前に必ず独自の調査を行い、専門家にご相談ください。DeFi投資には高いリスクが伴い、投資額の全額を失う可能性があります。',
  
  RISK_WARNING: 'DeFiプロトコルにはスマートコントラクトリスク、流動性リスク、市場リスク等の様々なリスクが存在します。投資は余裕資金の範囲内で行い、リスクを十分理解した上でご判断ください。',
  
  TAX_NOTICE: '暗号通貨・DeFi取引には複雑な税務上の影響があります。税務処理については必ず税理士等の専門家にご相談ください。',
  
  REGULATORY: '規制環境は急速に変化しており、今後DeFiの利用が制限される可能性があります。最新の規制情報を常に確認してください。'
};

const DeFiPrompts = {
  PROTOCOL_KNOWLEDGE,
  DEFI_SYSTEM_PROMPTS,
  RISK_ASSESSMENT_TEMPLATES,
  EDUCATIONAL_CONTENT,
  PROMPT_TEMPLATES,
  RESPONSE_FORMATS,
  DISCLAIMERS
};

export default DeFiPrompts;
