#!/usr/bin/env node

const http = require('http');

async function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function simpleLayoutCheck() {
  console.log('🔍 Layout Verification Test Starting...\n');
  
  try {
    console.log('📡 Fetching HTML from http://localhost:3001...');
    const html = await fetchHTML('http://localhost:3001');
    
    console.log(`✅ サーバー接続: PASS`);
    console.log(`✅ HTML サイズ: ${(html.length / 1024).toFixed(1)}KB\n`);
    
    // レイアウト関連のクラスをチェック（最新の設定値）
    const checks = [
      { name: 'ヘッダー余白 (py-8)', test: html.includes('py-8') },
      { name: 'カスタムタイトルクラス (hero-main-title)', test: html.includes('hero-main-title') },
      { name: 'タイトルサイズ (text-2xl)', test: html.includes('text-2xl') },
      { name: 'タイトルサイズ (md:text-3xl)', test: html.includes('md:text-3xl') },
      { name: 'ヒーロー上部余白 (pt-40)', test: html.includes('pt-40') },
      { name: 'モバイルメニュー位置 (top-28)', test: html.includes('top-28') },
      { name: 'ログインリンク', test: html.includes('/auth/login') },
      { name: '登録リンク', test: html.includes('/auth/register') },
      { name: 'タイトル文字「AIと始める」', test: html.includes('AIと始める') },
      { name: 'タイトル文字「投資総合」', test: html.includes('投資総合') },
      { name: 'タイトル文字「プラットフォーム」', test: html.includes('プラットフォーム') },
      { name: 'ヘッダー要素', test: html.includes('<header') },
      { name: 'セクション要素', test: html.includes('<section') },
      { name: 'フッター要素', test: html.includes('<footer') }
    ];
    
    let passCount = 0;
    
    checks.forEach(check => {
      if (check.test) {
        console.log(`✅ ${check.name}: PASS`);
        passCount++;
      } else {
        console.log(`❌ ${check.name}: FAIL`);
      }
    });
    
    console.log(`\n📊 テスト結果: ${passCount}/${checks.length} PASSED`);
    console.log(`📈 成功率: ${((passCount / checks.length) * 100).toFixed(1)}%\n`);
    
    if (passCount === checks.length) {
      console.log('🎉 すべてのレイアウトテストが成功しました！');
      console.log('✨ preview.htmlと同じレイアウト設定が適用されています。');
    } else if (passCount >= checks.length * 0.8) {
      console.log('⚡ ほとんどのテストが成功しています！');
      console.log('🔧 いくつかの細かい調整が必要かもしれません。');
    } else {
      console.log('⚠️  重要な問題が検出されました。');
      console.log('🛠️  レイアウト設定を確認してください。');
    }
    
    // 詳細情報を表示
    console.log('\n📄 詳細情報:');
    console.log(`- CSSクラス数: ${(html.match(/class="/g) || []).length}`);
    console.log(`- Tailwind CSS利用確認: ${html.includes('tailwind') ? 'あり' : 'なし'}`);
    console.log(`- React要素確認: ${html.includes('react') ? 'あり' : 'なし'}`);
    
  } catch (error) {
    console.error('❌ テスト実行エラー:', error.message);
    console.log('💡 以下を確認してください:');
    console.log('   1. 開発サーバーが http://localhost:3001 で起動している');
    console.log('   2. ファイアウォール設定');
    console.log('   3. ポート3001が他のプロセスに使用されていない');
  }
}

simpleLayoutCheck();