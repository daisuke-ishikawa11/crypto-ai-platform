#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// ファイル内の ``` パターンを修正する関数
function fixCodeBlocks(content) {
  // content: の後のテンプレートリテラル内容を検索・変換
  const updated = content.replace(
    /(content:\s*`)([\s\S]*?)(`)/g,
    (match, prefix, contentBody, suffix) => {
      // ``` が含まれているかチェック
      if (contentBody.includes('```')) {
        console.log('   - Found code blocks, converting...');
        
        // ``` で囲まれたコードブロックを HTML div に変換
        const convertedContent = contentBody.replace(/```[\s\S]*?```/g, (match) => {
          const code = match.replace(/^```\s*\n?/, '').replace(/\n?\s*```$/, '');
          return `<div style="background: #1e293b; color: #f1f5f9; padding: 1rem; border-radius: 4px; font-family: monospace; margin: 1rem 0;">${code.trim()}</div>`;
        });
        
        return prefix + convertedContent + suffix;
      }
      return match;
    }
  );
  
  return updated;
}

// ファイル処理関数
function processFile(filePath) {
  try {
    console.log(`Processing: ${filePath}`);
    
    const content = fs.readFileSync(filePath, 'utf8');
    const updated = fixCodeBlocks(content);
    
    // ファイルに変更があった場合のみ書き込み
    if (updated !== content) {
      fs.writeFileSync(filePath, updated, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
      return true;
    } else {
      console.log(`⏭️  No changes needed: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// ``` を含むファイルだけを処理
const filesToFix = [
  '/mnt/d/crypto-ai-platform/apps/cryptolearn-pro/src/data/lessons/trading-basics/lesson-39.ts',
  '/mnt/d/crypto-ai-platform/apps/cryptolearn-pro/src/data/lessons/trading-basics/lesson-38.ts',
  '/mnt/d/crypto-ai-platform/apps/cryptolearn-pro/src/data/lessons/trading-basics/lesson-30.ts',
  '/mnt/d/crypto-ai-platform/apps/cryptolearn-pro/src/data/lessons/trading-basics/lesson-29.ts',
  '/mnt/d/crypto-ai-platform/apps/cryptolearn-pro/src/data/lessons/trading-basics/lesson-28.ts',
  '/mnt/d/crypto-ai-platform/apps/cryptolearn-pro/src/data/lessons/trading-basics/lesson-27.ts',
  '/mnt/d/crypto-ai-platform/apps/cryptolearn-pro/src/data/lessons/advanced-investment/lesson-32.ts',
  '/mnt/d/crypto-ai-platform/apps/cryptolearn-pro/src/data/lessons/advanced-investment/lesson-26.ts',
  '/mnt/d/crypto-ai-platform/apps/cryptolearn-pro/src/data/lessons/advanced-investment/lesson-21.ts',
  '/mnt/d/crypto-ai-platform/apps/cryptolearn-pro/src/data/lessons/advanced-investment/lesson-13.ts'
];

console.log('🚀 Starting code block fix...');
console.log(`📁 Processing ${filesToFix.length} files with code blocks...`);

let updatedCount = 0;
for (const filePath of filesToFix) {
  if (fs.existsSync(filePath)) {
    if (processFile(filePath)) {
      updatedCount++;
    }
  } else {
    console.log(`⚠️  File not found: ${filePath}`);
  }
}

console.log('\n📊 Fix Summary:');
console.log(`✅ Files updated: ${updatedCount}`);
console.log('🎉 Code block fix completed!');