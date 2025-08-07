/**
 * Phase 4 外部API統合の統合テスト
 * 
 * このテストファイルは、Phase 4で実装された外部API統合機能を
 * 包括的にテストします。
 */

// Node.js環境でのHTTPリクエストのため
const fetch = require('node-fetch');

// テスト用のベースURL
const BASE_URL = 'http://localhost:3001';

// API エンドポイントの定数
const API_ENDPOINTS = {
  // 新しいAPIエンドポイント
  market: {
    global: '/api/market/global',
    binance: '/api/market/binance',
    coinmarketcap: '/api/market/coinmarketcap',
    realtime: '/api/market/realtime',
    analysis: '/api/market/analysis'
  },
  portfolio: {
    optimize: '/api/portfolio/optimize'
  },
  risk: {
    analysis: '/api/risk/analysis'
  },
  // 既存のAPIエンドポイント
  ai: {
    chat: '/api/ai/chat',
    prediction: '/api/ai/prediction'
  },
  explainableAi: {
    analyze: '/api/explainable-ai/analyze'
  },
  health: '/api/health'
};

// テスト用のダミーデータ
const TEST_DATA = {
  chat: {
    message: 'Bitcoin価格について教えて',
    context: 'general'
  },
  prediction: {
    symbol: 'BTC',
    timeframe: '1h',
    indicators: ['RSI', 'MACD', 'BB']
  },
  portfolio: {
    assets: [
      { symbol: 'BTC', allocation: 0.4 },
      { symbol: 'ETH', allocation: 0.3 },
      { symbol: 'ADA', allocation: 0.3 }
    ],
    riskTolerance: 'medium',
    timeHorizon: '1year'
  },
  risk: {
    portfolio: [
      { symbol: 'BTC', amount: 1000 },
      { symbol: 'ETH', amount: 2000 }
    ],
    analysisType: 'comprehensive'
  }
};

// HTTPリクエストを送信するヘルパー関数
async function sendRequest(endpoint, method = 'GET', data = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  if (data && method !== 'GET') {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const responseData = await response.json();
    
    return {
      status: response.status,
      ok: response.ok,
      data: responseData,
      headers: response.headers
    };
  } catch (error) {
    return {
      status: 500,
      ok: false,
      error: error.message
    };
  }
}

// APIレスポンス時間を測定するヘルパー関数
async function measureResponseTime(endpoint, method = 'GET', data = null) {
  const startTime = Date.now();
  const response = await sendRequest(endpoint, method, data);
  const endTime = Date.now();
  
  return {
    ...response,
    responseTime: endTime - startTime
  };
}

// 統合テストの実行
async function runIntegrationTests() {
  console.log('🚀 Phase 4 外部API統合の統合テスト開始');
  console.log('=' .repeat(60));
  
  const results = {
    passed: 0,
    failed: 0,
    errors: [],
    performance: {},
    details: []
  };

  // 1. 新しく作成されたAPIエンドポイントの動作確認
  console.log('\n📋 1. 新しいAPIエンドポイントのテスト');
  console.log('-'.repeat(40));

  // 1.1 グローバル市場データ取得
  try {
    console.log('🔍 /api/market/global をテスト中...');
    const globalResult = await measureResponseTime(API_ENDPOINTS.market.global);
    
    if (globalResult.ok) {
      console.log('✅ グローバル市場データ取得: 成功');
      console.log(`   レスポンス時間: ${globalResult.responseTime}ms`);
      results.passed++;
      results.performance['market_global'] = globalResult.responseTime;
    } else {
      console.log('❌ グローバル市場データ取得: 失敗');
      console.log(`   エラー: ${globalResult.data?.error || globalResult.error}`);
      results.failed++;
      results.errors.push({
        endpoint: '/api/market/global',
        error: globalResult.data?.error || globalResult.error
      });
    }
  } catch (error) {
    console.log('❌ グローバル市場データ取得: 例外発生');
    console.log(`   エラー: ${error.message}`);
    results.failed++;
    results.errors.push({
      endpoint: '/api/market/global',
      error: error.message
    });
  }

  // 1.2 Binance API統合
  try {
    console.log('🔍 /api/market/binance をテスト中...');
    const binanceResult = await measureResponseTime(API_ENDPOINTS.market.binance);
    
    if (binanceResult.ok) {
      console.log('✅ Binance API統合: 成功');
      console.log(`   レスポンス時間: ${binanceResult.responseTime}ms`);
      results.passed++;
      results.performance['market_binance'] = binanceResult.responseTime;
    } else {
      console.log('❌ Binance API統合: 失敗');
      console.log(`   エラー: ${binanceResult.data?.error || binanceResult.error}`);
      results.failed++;
      results.errors.push({
        endpoint: '/api/market/binance',
        error: binanceResult.data?.error || binanceResult.error
      });
    }
  } catch (error) {
    console.log('❌ Binance API統合: 例外発生');
    console.log(`   エラー: ${error.message}`);
    results.failed++;
    results.errors.push({
      endpoint: '/api/market/binance',
      error: error.message
    });
  }

  // 1.3 CoinMarketCap API統合
  try {
    console.log('🔍 /api/market/coinmarketcap をテスト中...');
    const cmcResult = await measureResponseTime(API_ENDPOINTS.market.coinmarketcap);
    
    if (cmcResult.ok) {
      console.log('✅ CoinMarketCap API統合: 成功');
      console.log(`   レスポンス時間: ${cmcResult.responseTime}ms`);
      results.passed++;
      results.performance['market_coinmarketcap'] = cmcResult.responseTime;
    } else {
      console.log('❌ CoinMarketCap API統合: 失敗');
      console.log(`   エラー: ${cmcResult.data?.error || cmcResult.error}`);
      results.failed++;
      results.errors.push({
        endpoint: '/api/market/coinmarketcap',
        error: cmcResult.data?.error || cmcResult.error
      });
    }
  } catch (error) {
    console.log('❌ CoinMarketCap API統合: 例外発生');
    console.log(`   エラー: ${error.message}`);
    results.failed++;
    results.errors.push({
      endpoint: '/api/market/coinmarketcap',
      error: error.message
    });
  }

  // 1.4 リアルタイムデータ接続
  try {
    console.log('🔍 /api/market/realtime をテスト中...');
    const realtimeResult = await measureResponseTime(API_ENDPOINTS.market.realtime);
    
    if (realtimeResult.ok) {
      console.log('✅ リアルタイムデータ接続: 成功');
      console.log(`   レスポンス時間: ${realtimeResult.responseTime}ms`);
      results.passed++;
      results.performance['market_realtime'] = realtimeResult.responseTime;
    } else {
      console.log('❌ リアルタイムデータ接続: 失敗');
      console.log(`   エラー: ${realtimeResult.data?.error || realtimeResult.error}`);
      results.failed++;
      results.errors.push({
        endpoint: '/api/market/realtime',
        error: realtimeResult.data?.error || realtimeResult.error
      });
    }
  } catch (error) {
    console.log('❌ リアルタイムデータ接続: 例外発生');
    console.log(`   エラー: ${error.message}`);
    results.failed++;
    results.errors.push({
      endpoint: '/api/market/realtime',
      error: error.message
    });
  }

  // 1.5 ポートフォリオ最適化
  try {
    console.log('🔍 /api/portfolio/optimize をテスト中...');
    const optimizeResult = await measureResponseTime(
      API_ENDPOINTS.portfolio.optimize,
      'POST',
      TEST_DATA.portfolio
    );
    
    if (optimizeResult.ok) {
      console.log('✅ ポートフォリオ最適化: 成功');
      console.log(`   レスポンス時間: ${optimizeResult.responseTime}ms`);
      results.passed++;
      results.performance['portfolio_optimize'] = optimizeResult.responseTime;
    } else {
      console.log('❌ ポートフォリオ最適化: 失敗');
      console.log(`   エラー: ${optimizeResult.data?.error || optimizeResult.error}`);
      results.failed++;
      results.errors.push({
        endpoint: '/api/portfolio/optimize',
        error: optimizeResult.data?.error || optimizeResult.error
      });
    }
  } catch (error) {
    console.log('❌ ポートフォリオ最適化: 例外発生');
    console.log(`   エラー: ${error.message}`);
    results.failed++;
    results.errors.push({
      endpoint: '/api/portfolio/optimize',
      error: error.message
    });
  }

  // 1.6 リスク分析
  try {
    console.log('🔍 /api/risk/analysis をテスト中...');
    const riskResult = await measureResponseTime(
      API_ENDPOINTS.risk.analysis,
      'POST',
      TEST_DATA.risk
    );
    
    if (riskResult.ok) {
      console.log('✅ リスク分析: 成功');
      console.log(`   レスポンス時間: ${riskResult.responseTime}ms`);
      results.passed++;
      results.performance['risk_analysis'] = riskResult.responseTime;
    } else {
      console.log('❌ リスク分析: 失敗');
      console.log(`   エラー: ${riskResult.data?.error || riskResult.error}`);
      results.failed++;
      results.errors.push({
        endpoint: '/api/risk/analysis',
        error: riskResult.data?.error || riskResult.error
      });
    }
  } catch (error) {
    console.log('❌ リスク分析: 例外発生');
    console.log(`   エラー: ${error.message}`);
    results.failed++;
    results.errors.push({
      endpoint: '/api/risk/analysis',
      error: error.message
    });
  }

  // 2. 既存のAPIエンドポイントの互換性確認
  console.log('\n📋 2. 既存APIエンドポイントの互換性確認');
  console.log('-'.repeat(40));

  // 2.1 AI チャット機能
  try {
    console.log('🔍 /api/ai/chat をテスト中...');
    const chatResult = await measureResponseTime(
      API_ENDPOINTS.ai.chat,
      'POST',
      TEST_DATA.chat
    );
    
    if (chatResult.ok) {
      console.log('✅ AI チャット機能: 成功');
      console.log(`   レスポンス時間: ${chatResult.responseTime}ms`);
      results.passed++;
      results.performance['ai_chat'] = chatResult.responseTime;
    } else {
      console.log('❌ AI チャット機能: 失敗');
      console.log(`   エラー: ${chatResult.data?.error || chatResult.error}`);
      results.failed++;
      results.errors.push({
        endpoint: '/api/ai/chat',
        error: chatResult.data?.error || chatResult.error
      });
    }
  } catch (error) {
    console.log('❌ AI チャット機能: 例外発生');
    console.log(`   エラー: ${error.message}`);
    results.failed++;
    results.errors.push({
      endpoint: '/api/ai/chat',
      error: error.message
    });
  }

  // 2.2 AI 価格予測
  try {
    console.log('🔍 /api/ai/prediction をテスト中...');
    const predictionResult = await measureResponseTime(
      API_ENDPOINTS.ai.prediction,
      'POST',
      TEST_DATA.prediction
    );
    
    if (predictionResult.ok) {
      console.log('✅ AI 価格予測: 成功');
      console.log(`   レスポンス時間: ${predictionResult.responseTime}ms`);
      results.passed++;
      results.performance['ai_prediction'] = predictionResult.responseTime;
    } else {
      console.log('❌ AI 価格予測: 失敗');
      console.log(`   エラー: ${predictionResult.data?.error || predictionResult.error}`);
      results.failed++;
      results.errors.push({
        endpoint: '/api/ai/prediction',
        error: predictionResult.data?.error || predictionResult.error
      });
    }
  } catch (error) {
    console.log('❌ AI 価格予測: 例外発生');
    console.log(`   エラー: ${error.message}`);
    results.failed++;
    results.errors.push({
      endpoint: '/api/ai/prediction',
      error: error.message
    });
  }

  // 2.3 ヘルスチェック
  try {
    console.log('🔍 /api/health をテスト中...');
    const healthResult = await measureResponseTime(API_ENDPOINTS.health);
    
    if (healthResult.ok) {
      console.log('✅ ヘルスチェック: 成功');
      console.log(`   レスポンス時間: ${healthResult.responseTime}ms`);
      results.passed++;
      results.performance['health'] = healthResult.responseTime;
    } else {
      console.log('❌ ヘルスチェック: 失敗');
      console.log(`   エラー: ${healthResult.data?.error || healthResult.error}`);
      results.failed++;
      results.errors.push({
        endpoint: '/api/health',
        error: healthResult.data?.error || healthResult.error
      });
    }
  } catch (error) {
    console.log('❌ ヘルスチェック: 例外発生');
    console.log(`   エラー: ${error.message}`);
    results.failed++;
    results.errors.push({
      endpoint: '/api/health',
      error: error.message
    });
  }

  // 3. エラーハンドリングの検証
  console.log('\n📋 3. エラーハンドリングの検証');
  console.log('-'.repeat(40));

  // 3.1 不正なリクエストの処理
  try {
    console.log('🔍 不正なリクエストをテスト中...');
    const invalidResult = await sendRequest('/api/invalid-endpoint');
    
    if (invalidResult.status === 404) {
      console.log('✅ 不正なリクエストの処理: 成功 (404を返す)');
      results.passed++;
    } else {
      console.log('❌ 不正なリクエストの処理: 失敗');
      console.log(`   期待値: 404, 実際の値: ${invalidResult.status}`);
      results.failed++;
      results.errors.push({
        endpoint: '/api/invalid-endpoint',
        error: `Expected 404, got ${invalidResult.status}`
      });
    }
  } catch (error) {
    console.log('❌ 不正なリクエストの処理: 例外発生');
    console.log(`   エラー: ${error.message}`);
    results.failed++;
    results.errors.push({
      endpoint: '/api/invalid-endpoint',
      error: error.message
    });
  }

  // 3.2 不正なデータでのPOSTリクエスト
  try {
    console.log('🔍 不正なデータでのPOSTリクエストをテスト中...');
    const invalidPostResult = await sendRequest(
      API_ENDPOINTS.portfolio.optimize,
      'POST',
      { invalid: 'data' }
    );
    
    if (invalidPostResult.status === 400) {
      console.log('✅ 不正なデータでのPOSTリクエスト: 成功 (400を返す)');
      results.passed++;
    } else {
      console.log('❌ 不正なデータでのPOSTリクエスト: 失敗');
      console.log(`   期待値: 400, 実際の値: ${invalidPostResult.status}`);
      results.failed++;
      results.errors.push({
        endpoint: '/api/portfolio/optimize',
        error: `Expected 400, got ${invalidPostResult.status}`
      });
    }
  } catch (error) {
    console.log('❌ 不正なデータでのPOSTリクエスト: 例外発生');
    console.log(`   エラー: ${error.message}`);
    results.failed++;
    results.errors.push({
      endpoint: '/api/portfolio/optimize',
      error: error.message
    });
  }

  // 4. パフォーマンステスト
  console.log('\n📋 4. パフォーマンステストの評価');
  console.log('-'.repeat(40));

  let performanceIssues = 0;
  const PERFORMANCE_THRESHOLD = 5000; // 5秒

  Object.entries(results.performance).forEach(([endpoint, responseTime]) => {
    if (responseTime > PERFORMANCE_THRESHOLD) {
      console.log(`⚠️  ${endpoint}: ${responseTime}ms (基準値 ${PERFORMANCE_THRESHOLD}ms を超過)`);
      performanceIssues++;
    } else {
      console.log(`✅ ${endpoint}: ${responseTime}ms`);
    }
  });

  if (performanceIssues === 0) {
    console.log('✅ すべてのエンドポイントが性能基準を満たしています');
  } else {
    console.log(`⚠️  ${performanceIssues}個のエンドポイントが性能基準を超過しています`);
  }

  // 5. 結果のサマリー
  console.log('\n📊 テスト結果サマリー');
  console.log('=' .repeat(60));
  console.log(`✅ 成功: ${results.passed}`);
  console.log(`❌ 失敗: ${results.failed}`);
  console.log(`⚠️  性能問題: ${performanceIssues}`);
  console.log(`📈 成功率: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%`);

  // エラーの詳細表示
  if (results.errors.length > 0) {
    console.log('\n🔍 エラー詳細:');
    results.errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error.endpoint}: ${error.error}`);
    });
  }

  console.log('\n🎯 統合テスト完了');
  
  return results;
}

// メイン実行関数
async function main() {
  try {
    // サーバーが起動しているかチェック
    console.log('🔍 開発サーバーの状態をチェック中...');
    const healthCheck = await sendRequest('/api/health');
    
    if (healthCheck.status === 0 || healthCheck.error) {
      console.log('❌ 開発サーバーが起動していません');
      console.log('   次のコマンドでサーバーを起動してください:');
      console.log('   npm run dev');
      return;
    }

    if (healthCheck.status === 503) {
      console.log('⚠️  開発サーバーは起動していますが、一部のサービスが利用できません');
      console.log('   データベースまたは環境変数の設定を確認してください');
      console.log('   テストを続行します...');
    } else {
      console.log('✅ 開発サーバーが起動しています');
    }
    
    // 統合テストを実行
    const results = await runIntegrationTests();
    
    // 結果をファイルに保存
    const fs = require('fs');
    const path = require('path');
    
    const reportPath = path.join(__dirname, 'integration-test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    
    console.log(`\n📄 詳細レポートを保存しました: ${reportPath}`);
    
  } catch (error) {
    console.error('❌ テスト実行中にエラーが発生しました:', error);
  }
}

// Node.jsから直接実行された場合
if (require.main === module) {
  main();
}

module.exports = {
  runIntegrationTests,
  sendRequest,
  measureResponseTime,
  TEST_DATA,
  API_ENDPOINTS
};