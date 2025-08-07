#!/usr/bin/env node

const http = require('http');
const { JSDOM } = require('jsdom');

async function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function verifyLayout() {
  console.log('🔍 Layout Verification Test Starting...\n');
  
  try {
    const html = await fetchHTML('http://localhost:3000');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Test 1: ヘッダーの余白チェック
    const headerContainer = document.querySelector('header .container');
    if (headerContainer) {
      const hasCorrectPadding = headerContainer.className.includes('py-6');
      console.log(`✅ ヘッダー余白 (py-6): ${hasCorrectPadding ? 'PASS' : 'FAIL'}`);
      if (!hasCorrectPadding) {
        console.log(`   実際のクラス: ${headerContainer.className}`);
      }
    } else {
      console.log('❌ ヘッダーコンテナが見つかりません');
    }
    
    // Test 2: メインタイトルのサイズチェック
    const mainTitle = document.querySelector('h1');
    if (mainTitle) {
      const hasCorrectSizes = mainTitle.className.includes('text-4xl') && 
                             mainTitle.className.includes('md:text-5xl') && 
                             mainTitle.className.includes('lg:text-6xl');
      console.log(`✅ メインタイトルサイズ: ${hasCorrectSizes ? 'PASS' : 'FAIL'}`);
      if (!hasCorrectSizes) {
        console.log(`   実際のクラス: ${mainTitle.className}`);
      }
      
      // タイトルの内容もチェック
      const titleText = mainTitle.textContent;
      const hasCorrectContent = titleText.includes('AIと始める') && 
                               titleText.includes('投資総合') && 
                               titleText.includes('プラットフォーム');
      console.log(`✅ メインタイトル内容: ${hasCorrectContent ? 'PASS' : 'FAIL'}`);
    } else {
      console.log('❌ メインタイトル(h1)が見つかりません');
    }
    
    // Test 3: ナビゲーションボタンチェック
    const loginButton = document.querySelector('a[href="/auth/login"]');
    const registerButton = document.querySelector('a[href="/auth/register"]');
    console.log(`✅ ログインボタン: ${loginButton && loginButton.textContent.includes('ログイン') ? 'PASS' : 'FAIL'}`);
    console.log(`✅ 登録ボタン: ${registerButton && registerButton.textContent.includes('無料で始める') ? 'PASS' : 'FAIL'}`);
    
    // Test 4: ヒーローセクションチェック
    const heroSection = document.querySelector('section');
    if (heroSection) {
      const hasCorrectTopPadding = heroSection.className.includes('pt-36');
      console.log(`✅ ヒーローセクション上部余白 (pt-36): ${hasCorrectTopPadding ? 'PASS' : 'FAIL'}`);
    } else {
      console.log('❌ ヒーローセクションが見つかりません');
    }
    
    // Test 5: モバイルメニューの位置チェック
    const mobileMenu = document.querySelector('[id="mobile-menu"], .lg\\:hidden.fixed');
    if (mobileMenu) {
      const hasCorrectPosition = mobileMenu.className.includes('top-24');
      console.log(`✅ モバイルメニュー位置 (top-24): ${hasCorrectPosition ? 'PASS' : 'FAIL'}`);
    } else {
      console.log('⚠️  モバイルメニューが見つかりません（非表示状態の可能性）');
    }
    
    // Test 6: 全体的なレイアウト構造チェック
    const hasHeader = !!document.querySelector('header');
    const hasMain = !!document.querySelector('main, section');
    const hasFooter = !!document.querySelector('footer');
    console.log(`✅ 基本構造 - Header: ${hasHeader ? 'PASS' : 'FAIL'}`);
    console.log(`✅ 基本構造 - Main/Section: ${hasMain ? 'PASS' : 'FAIL'}`);
    console.log(`✅ 基本構造 - Footer: ${hasFooter ? 'PASS' : 'FAIL'}`);
    
    console.log('\n🎉 Layout Verification Complete!');
    
    // サマリー
    const checks = [
      headerContainer?.className.includes('py-6'),
      mainTitle?.className.includes('text-4xl'),
      !!loginButton,
      !!registerButton,
      heroSection?.className.includes('pt-36'),
      hasHeader,
      hasMain
    ];
    
    const passCount = checks.filter(Boolean).length;
    const totalCount = checks.length;
    
    console.log(`\n📊 テスト結果: ${passCount}/${totalCount} PASSED`);
    
    if (passCount === totalCount) {
      console.log('🎯 すべてのレイアウトテストが成功しました！');
    } else {
      console.log('⚠️  一部のテストが失敗しました。上記の詳細を確認してください。');
    }
    
  } catch (error) {
    console.error('❌ テスト実行エラー:', error.message);
    console.log('💡 サーバーが http://localhost:3000 で起動していることを確認してください');
  }
}

// JSDOM がない場合の代替実装
if (typeof require === 'undefined' || !require.resolve) {
  console.log('⚠️  JSDOMが利用できません。シンプルなHTTPチェックを実行します...\n');
  
  async function simpleCheck() {
    try {
      const html = await fetchHTML('http://localhost:3000');
      
      console.log('✅ サーバー接続: PASS');
      console.log(`✅ HTML サイズ: ${(html.length / 1024).toFixed(1)}KB`);
      console.log(`✅ py-6 クラス存在: ${html.includes('py-6') ? 'PASS' : 'FAIL'}`);
      console.log(`✅ text-4xl クラス存在: ${html.includes('text-4xl') ? 'PASS' : 'FAIL'}`);
      console.log(`✅ ログインリンク存在: ${html.includes('/auth/login') ? 'PASS' : 'FAIL'}`);
      console.log(`✅ 登録リンク存在: ${html.includes('/auth/register') ? 'PASS' : 'FAIL'}`);
      console.log(`✅ タイトル文字列存在: ${html.includes('AIと始める') ? 'PASS' : 'FAIL'}`);
      
    } catch (error) {
      console.error('❌ 接続エラー:', error.message);
    }
  }
  
  simpleCheck();
} else {
  verifyLayout();
}