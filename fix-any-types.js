#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * 大量any型修正スクリプト
 * 1071件のany型をすべて修正するための効率的なツール
 */

// 共通の置換パターン
const replacementPatterns = [
  // 基本的なany型の置換
  { pattern: /: any\b/g, replacement: ': unknown' },
  { pattern: /: any\[\]/g, replacement: ': unknown[]' },
  { pattern: /: any\|/g, replacement: ': unknown|' },
  { pattern: /\| any\b/g, replacement: '| unknown' },
  
  // 関数引数でのany型
  { pattern: /\(([^)]*?):\s*any([^)]*?)\)/g, replacement: '($1: unknown$2)' },
  { pattern: /\(([^)]*?):\s*any\[\]([^)]*?)\)/g, replacement: '($1: unknown[]$2)' },
  
  // オブジェクト型でのany
  { pattern: /Record<string,\s*any>/g, replacement: 'Record<string, unknown>' },
  { pattern: /Record<[^,]+,\s*any>/g, replacement: 'Record<string, unknown>' },
  
  // 一般的なパターン
  { pattern: /data:\s*any/g, replacement: 'data: unknown' },
  { pattern: /params:\s*any/g, replacement: 'params: Record<string, unknown>' },
  { pattern: /config:\s*any/g, replacement: 'config: Record<string, unknown>' },
  { pattern: /options:\s*any/g, replacement: 'options: Record<string, unknown>' },
  { pattern: /props:\s*any/g, replacement: 'props: Record<string, unknown>' },
  { pattern: /event:\s*any/g, replacement: 'event: Event' },
  { pattern: /error:\s*any/g, replacement: 'error: Error | unknown' },
  { pattern: /result:\s*any/g, replacement: 'result: unknown' },
  { pattern: /response:\s*any/g, replacement: 'response: unknown' },
  
  // 特定のDeFiパターン
  { pattern: /portfolio:\s*any/g, replacement: 'portfolio: DeFiPortfolioData' },
  { pattern: /protocols:\s*any\[\]/g, replacement: 'protocols: DeFiProtocolData[]' },
  { pattern: /alert:\s*any/g, replacement: 'alert: DeFiAlertData' },
  { pattern: /optimization:\s*any/g, replacement: 'optimization: DeFiOptimizationData' },
  
  // 関数型でのany
  { pattern: /\(\s*\.\.\.\s*args:\s*any\[\]\s*\)/g, replacement: '(...args: unknown[])' },
  { pattern: /=>\s*any/g, replacement: '=> unknown' },
  
  // Cast patterns
  { pattern: /as\s+any\b/g, replacement: 'as unknown' },
  { pattern: /\(.*?\s+as\s+any\)/g, replacement: '$1 as unknown)' },
];

// 特殊な置換パターン（ファイルタイプ別）
const specialPatterns = {
  api: [
    { pattern: /body:\s*any/g, replacement: 'body: Record<string, unknown>' },
    { pattern: /headers:\s*any/g, replacement: 'headers: Record<string, string>' },
    { pattern: /query:\s*any/g, replacement: 'query: Record<string, string | string[]>' },
  ],
  component: [
    { pattern: /children:\s*any/g, replacement: 'children: React.ReactNode' },
    { pattern: /className:\s*any/g, replacement: 'className?: string' },
    { pattern: /onClick:\s*any/g, replacement: 'onClick: (event: React.MouseEvent) => void' },
    { pattern: /onChange:\s*any/g, replacement: 'onChange: (value: unknown) => void' },
  ],
  test: [
    { pattern: /mock:\s*any/g, replacement: 'mock: jest.Mock' },
    { pattern: /spy:\s*any/g, replacement: 'spy: jest.SpyInstance' },
    { pattern: /expect\(.*?\)\.toBe\(.*?\s+as\s+any\)/g, replacement: 'expect($1).toBe($2 as unknown)' },
  ]
};

// ファイルタイプの判定
function getFileType(filePath) {
  if (filePath.includes('/api/')) return 'api';
  if (filePath.includes('/components/')) return 'component';
  if (filePath.includes('/test') || filePath.includes('.test.') || filePath.includes('.spec.')) return 'test';
  return 'general';
}

// 必要なimportを追加
function addRequiredImports(content, filePath) {
  const fileType = getFileType(filePath);
  let updatedContent = content;
  
  // DeFiタイプが使用されている場合のimport追加
  if (content.includes('DeFiPortfolioData') || content.includes('DeFiProtocolData') || 
      content.includes('DeFiAlertData') || content.includes('DeFiOptimizationData')) {
    if (!content.includes("from '@/types/common'")) {
      const importStatement = `import type { 
  DeFiPortfolioData, 
  DeFiProtocolData, 
  DeFiAlertData, 
  DeFiOptimizationData,
  TypedApiResponse 
} from '@/types/common';\n`;
      
      // existing importsの後に追加
      updatedContent = updatedContent.replace(
        /(import.*?from.*?['"];?\n)/g, 
        `$1${importStatement}`
      );
    }
  }
  
  // Reactタイプが使用されている場合
  if (fileType === 'component' && content.includes('React.')) {
    if (!content.includes("import React") && !content.includes("from 'react'")) {
      updatedContent = "import React from 'react';\n" + updatedContent;
    }
  }
  
  return updatedContent;
}

// ファイル内のany型をすべて修正
function fixAnyTypesInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    const fileType = getFileType(filePath);
    
    // 一般的なパターンを適用
    replacementPatterns.forEach(({ pattern, replacement }) => {
      content = content.replace(pattern, replacement);
    });
    
    // ファイルタイプ固有のパターンを適用
    if (specialPatterns[fileType]) {
      specialPatterns[fileType].forEach(({ pattern, replacement }) => {
        content = content.replace(pattern, replacement);
      });
    }
    
    // 必要なimportを追加
    content = addRequiredImports(content, filePath);
    
    // 変更があった場合のみファイルを書き換え
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error.message);
    return false;
  }
}

// ディレクトリを再帰的に処理
function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  let filesProcessed = 0;
  let filesChanged = 0;
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      // node_modules, .git, distなどをスキップ
      if (!['node_modules', '.git', '.next', 'dist', 'build'].includes(entry.name)) {
        const result = processDirectory(fullPath);
        filesProcessed += result.processed;
        filesChanged += result.changed;
      }
    } else if (entry.name.match(/\.(ts|tsx)$/)) {
      filesProcessed++;
      if (fixAnyTypesInFile(fullPath)) {
        filesChanged++;
        console.log(`✓ Fixed: ${fullPath}`);
      }
    }
  }
  
  return { processed: filesProcessed, changed: filesChanged };
}

// メイン実行
function main() {
  console.log('🚀 大量any型修正スクリプト開始...');
  console.log('1071件のany型をすべて修正します。');
  
  const srcPath = path.join(__dirname, 'src');
  
  if (!fs.existsSync(srcPath)) {
    console.error('src ディレクトリが見つかりません');
    process.exit(1);
  }
  
  // 修正前のカウント
  console.log('\n📊 修正前のany型使用数をカウント中...');
  try {
    const beforeCount = execSync(`find ${srcPath} -name "*.ts" -o -name "*.tsx" | xargs grep -c ": any\\b" | awk -F: '{sum += $2} END {print sum}'`, { encoding: 'utf8' }).trim();
    console.log(`修正前: ${beforeCount} 個のany型を検出`);
  } catch (error) {
    console.log('修正前のカウントに失敗（any型が0個の可能性）');
  }
  
  // ファイル処理実行
  console.log('\n🔧 ファイル処理中...');
  const result = processDirectory(srcPath);
  
  // 修正後のカウント
  console.log('\n📊 修正後のany型使用数をカウント中...');
  try {
    const afterCount = execSync(`find ${srcPath} -name "*.ts" -o -name "*.tsx" | xargs grep -c ": any\\b" | awk -F: '{sum += $2} END {print sum}'`, { encoding: 'utf8' }).trim();
    console.log(`修正後: ${afterCount} 個のany型が残存`);
    
    if (parseInt(afterCount) === 0) {
      console.log('\n🎉 完全勝利！すべてのany型を撲滅しました！');
    } else {
      console.log(`\n⚠️  残り ${afterCount} 個のany型があります。手動で修正が必要です。`);
    }
  } catch (error) {
    console.log('修正後のカウントに失敗（any型が0個になった可能性！）');
  }
  
  console.log(`\n📋 処理結果:`);
  console.log(`- 処理ファイル数: ${result.processed}`);
  console.log(`- 修正ファイル数: ${result.changed}`);
  
  // TypeScriptの型チェック実行
  console.log('\n🔍 TypeScript型チェック実行中...');
  try {
    execSync('npx tsc --noEmit', { stdio: 'inherit' });
    console.log('✅ TypeScript型チェック成功！');
  } catch (error) {
    console.log('❌ TypeScript型チェック失敗。手動での修正が必要です。');
  }
  
  console.log('\n✅ any型修正スクリプト完了！');
}

// CLI実行
if (require.main === module) {
  main();
}

module.exports = { fixAnyTypesInFile, processDirectory };