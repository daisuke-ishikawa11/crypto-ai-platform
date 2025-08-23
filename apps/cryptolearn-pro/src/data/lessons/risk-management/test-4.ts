import type { CategoryTest } from '@/types';

export const riskManagementTest4: CategoryTest = {
  id: 'risk-management-test-4',
  categoryId: 'risk-management',
  title: 'リスク管理・投資心理学確認テスト4（レッスン16-20）',
  description: 'メンタルヘルス管理、危機管理、緊急時対応、ESG投資の確認テストです。',
  lessonRange: '16-20',
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'risk-test-4-q1',
      question: '投資における「メンタルヘルス管理」で重要な要素は？',
      options: [
        '投資結果のみに集中する',
        '適度な運動・睡眠・栄養と投資以外の時間確保',
        '24時間相場を監視し続ける',
        '大きな利益のみを追求する'
      ],
      correctAnswer: 1,
      explanation: '投資によるストレス管理には、適度な運動・十分な睡眠・バランスの取れた栄養摂取と、投資以外の趣味や家族との時間を確保することが重要です。',
      difficulty: 'beginner',
      category: 'mental-health'
    },
    {
      id: 'risk-test-4-q2',
      question: 'ドローダウン（資産の一時的下落）への心理的対処法は？',
      options: [
        'すぐに投資をやめる',
        '事前に想定したシナリオであることを確認し、長期視点を維持',
        '借金をして追加投資',
        '全て売却して現金にする'
      ],
      correctAnswer: 1,
      explanation: 'ドローダウンは投資では避けられません。事前に想定したシナリオの範囲内であれば、長期投資計画を維持し、感情的な判断を避けることが重要です。',
      difficulty: 'intermediate',
      category: 'drawdown-management'
    },
    {
      id: 'risk-test-4-q3',
      question: '危機管理において「緊急時資金」の推奨額は？',
      options: [
        '生活費の1ヶ月分',
        '生活費の3-6ヶ月分',
        '生活費の10年分',
        '緊急時資金は不要'
      ],
      correctAnswer: 1,
      explanation: '緊急時資金は、失業や病気などの予期しない事態に備え、生活費の3-6ヶ月分を投資資金とは別に現金で確保することが推奨されています。',
      difficulty: 'beginner',
      category: 'emergency-fund'
    },
    {
      id: 'risk-test-4-q4',
      question: '金融危機時の投資家心理で最も危険な行動は？',
      options: [
        '冷静な分析を継続',
        'パニック売りによる損失確定と絶望的な追加投資',
        '計画的なリバランス',
        '専門家への相談'
      ],
      correctAnswer: 1,
      explanation: '金融危機時は恐怖によるパニック売りで大損失を確定させ、その後の絶望から「一発逆転」を狙う無謀な追加投資を行う心理的パターンが最も危険です。',
      difficulty: 'intermediate',
      category: 'crisis-psychology'
    },
    {
      id: 'risk-test-4-q5',
      question: '2025年のESG投資におけるリスク評価の重要要素は？',
      options: [
        '短期利益のみ',
        '環境・社会・ガバナンスリスクの長期影響',
        '株価変動のみ',
        '流動性のみ'
      ],
      correctAnswer: 1,
      explanation: 'ESG投資では環境規制、社会情勢変化、企業統治の問題が長期的な企業価値に与える影響を評価し、持続可能性リスクを考慮した投資判断が必要です。',
      difficulty: 'intermediate',
      category: 'esg-risks'
    },
    {
      id: 'risk-test-4-q6',
      question: '投資ストレスが健康に与える深刻な影響として正しいものは？',
      options: [
        '健康への影響は一切ない',
        '睡眠障害・高血圧・うつ状態・免疫力低下',
        '健康が必ず改善する',
        '運動能力が向上する'
      ],
      correctAnswer: 1,
      explanation: '過度な投資ストレスは睡眠障害、高血圧、うつ状態、免疫力低下などの深刻な健康問題を引き起こし、判断力低下により更なる投資損失につながる悪循環を生みます。',
      difficulty: 'beginner',
      category: 'stress-health-impact'
    },
    {
      id: 'risk-test-4-q7',
      question: '家計における投資資金の適切な上限は？',
      options: [
        '全資産を投資に回す',
        '生活費・緊急資金確保後の余剰資金のみ',
        '借金をしてでも投資',
        '収入の90%以上'
      ],
      correctAnswer: 1,
      explanation: '投資は必要な生活費と緊急時資金を確保した後の余剰資金で行うべきです。生活に必要な資金まで投資に回すと、急な現金需要時に不利な条件で売却する可能性があります。',
      difficulty: 'beginner',
      category: 'investment-budget'
    },
    {
      id: 'risk-test-4-q8',
      question: '市場暴落時の「逆張り投資」で重要な判断基準は？',
      options: [
        '感情的に「安いから買う」',
        '企業の基本的価値（ファンダメンタルズ）分析',
        '他人の推奨に従う',
        '価格の安さのみ'
      ],
      correctAnswer: 1,
      explanation: '市場暴落時の逆張り投資では、単純な価格の安さではなく、企業の本質的価値（売上、利益、財務健全性など）と現在価格の乖離を冷静に分析することが重要です。',
      difficulty: 'intermediate',
      category: 'contrarian-investing'
    },
    {
      id: 'risk-test-4-q9',
      question: 'ESG投資において「グリーンウォッシュ」の問題は？',
      options: [
        '環境に配慮した洗剤の推奨',
        '実態を伴わない表面的な環境配慮アピールで投資家を誤導',
        '緑色の商品のみ投資',
        '洗濯方法の改善'
      ],
      correctAnswer: 1,
      explanation: 'グリーンウォッシュは、実際の環境配慮が不十分にも関わらず表面的なアピールで投資家や消費者を誤導する行為で、ESG投資の際は実質的な取り組み内容を精査する必要があります。',
      difficulty: 'intermediate',
      category: 'greenwashing-risk'
    },
    {
      id: 'risk-test-4-q10',
      question: '投資における長期的な成功のための「4つの柱」として最も適切なものは？',
      options: [
        '運・勘・コネ・資金',
        'リスク管理・分散投資・規律・継続学習',
        '短期売買・レバレッジ・投機・感情',
        '他人任せ・一攫千金・借金投資・無計画'
      ],
      correctAnswer: 1,
      explanation: '長期投資成功には、適切なリスク管理、真の分散投資、感情に左右されない規律ある投資実行、市場変化に対応する継続的学習の4つの柱が不可欠です。',
      difficulty: 'intermediate',
      category: 'long-term-success-factors'
    }
  ],
  lastUpdated: '2025-08-21',
  factChecked: true
};