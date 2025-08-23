#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// すべてのマークダウン要素をHTMLに変換する関数
function convertAllMarkdownToHtml(content) {
  // content: の後のテンプレートリテラル内容を検索・変換
  return content.replace(
    /(content:\s*`)([\s\S]*?)(`[,}])/g,
    (match, prefix, contentBody, suffix) => {
      let htmlContent = contentBody;
      
      // 1. エスケープされたバッククォートを普通のバッククォートに戻す
      htmlContent = htmlContent.replace(/\\`/g, '`');
      
      // 2. ``` のコードブロックを HTML div に変換 (複数行対応)
      htmlContent = htmlContent.replace(/```[\s\S]*?```/g, (match) => {
        const code = match.replace(/^```[^\n]*\n?/, '').replace(/\n?\s*```$/, '');
        return `<div style="background: #1e293b; color: #f1f5f9; padding: 1rem; border-radius: 4px; font-family: monospace; margin: 1rem 0;">${code.trim()}</div>`;
      });
      
      // 3. ## 見出しを h2 に変換
      htmlContent = htmlContent.replace(/^##\s+(.+)$/gm, '<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">$1</h2>');
      
      // 4. ### 見出しを h3 に変換
      htmlContent = htmlContent.replace(/^###\s+(.+)$/gm, '<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">$1</h3>');
      
      // 5. **太字** を <strong> に変換
      htmlContent = htmlContent.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      
      // 6. リスト項目の処理
      const lines = htmlContent.split('\n');
      const processedLines = [];
      let inList = false;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const isListItem = /^-\s+(.+)$/.test(line) && !line.includes('<li>');
        
        if (isListItem && !inList) {
          // リストの開始
          processedLines.push('<ul style="margin: 1rem 0; padding-left: 1.5rem;">');
          processedLines.push(line.replace(/^-\s+(.+)$/, '<li>$1</li>'));
          inList = true;
        } else if (isListItem && inList) {
          // リストの継続
          processedLines.push(line.replace(/^-\s+(.+)$/, '<li>$1</li>'));
        } else if (!isListItem && inList) {
          // リストの終了
          processedLines.push('</ul>');
          processedLines.push(line);
          inList = false;
        } else {
          // 通常の行
          processedLines.push(line);
        }
      }
      
      // 最後がリストで終わる場合の処理
      if (inList) {
        processedLines.push('</ul>');
      }
      
      htmlContent = processedLines.join('\n');
      
      return prefix + htmlContent + suffix;
    }
  );
}

// ファイル処理関数
function processFile(filePath) {
  try {
    console.log(`Processing: ${filePath}`);
    
    const content = fs.readFileSync(filePath, 'utf8');
    const updated = convertAllMarkdownToHtml(content);
    
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

// 問題のあるファイルのリスト
const problematicFiles = [
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

console.log('🚀 Starting comprehensive markdown to HTML fix...');
console.log(`📁 Processing ${problematicFiles.length} problematic files...`);

let updatedCount = 0;
for (const filePath of problematicFiles) {
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
console.log('🎉 Comprehensive fix completed!');