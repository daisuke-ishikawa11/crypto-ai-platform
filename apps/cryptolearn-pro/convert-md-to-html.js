#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// HTMLテンプレート関数
function convertMarkdownToHtml(content) {
  let htmlContent = content;
  
  // 1. コードブロック (```) を HTML div に変換 (multiline対応)
  htmlContent = htmlContent.replace(/```[\s\S]*?```/g, (match) => {
    const code = match.replace(/^```\s*\n?/, '').replace(/\n?\s*```$/, '');
    return `<div style="background: #1e293b; color: #f1f5f9; padding: 1rem; border-radius: 4px; font-family: monospace; margin: 1rem 0;">${code.trim()}</div>`;
  });
  
  // 2. ## 見出し を h2 に変換
  htmlContent = htmlContent.replace(/^##\s+(.+)$/gm, '<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">$1</h2>');
  
  // 3. ### 見出し を h3 に変換
  htmlContent = htmlContent.replace(/^###\s+(.+)$/gm, '<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">$1</h3>');
  
  // 4. **太字** を <strong> に変換
  htmlContent = htmlContent.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  // 5. リスト項目の処理（複数の連続するリスト項目をまとめて<ul>で囲む）
  const lines = htmlContent.split('\n');
  const processedLines = [];
  let inList = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isListItem = /^-\s+(.+)$/.test(line);
    
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
  
  return processedLines.join('\n');
}

// ファイル処理関数
function processFile(filePath) {
  try {
    console.log(`Processing: ${filePath}`);
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // content: の後のテンプレートリテラル内容を検索・変換
    const updated = content.replace(
      /(content:\s*`)([\s\S]*?)(`)/g,
      (match, prefix, contentBody, suffix) => {
        // マークダウン形式が含まれているかチェック
        if (contentBody.includes('##') || contentBody.includes('**') || contentBody.includes('```') || contentBody.includes('\n- ')) {
          const convertedContent = convertMarkdownToHtml(contentBody);
          return prefix + convertedContent + suffix;
        }
        return match;
      }
    );
    
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

// ディレクトリを再帰的に処理
function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  let updatedCount = 0;
  
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      updatedCount += processDirectory(fullPath);
    } else if (file.startsWith('lesson-') && file.endsWith('.ts')) {
      if (processFile(fullPath)) {
        updatedCount++;
      }
    }
  }
  
  return updatedCount;
}

// メイン実行
const lessonsDir = path.join(__dirname, 'src/data/lessons');

if (!fs.existsSync(lessonsDir)) {
  console.error('❌ Lessons directory not found:', lessonsDir);
  process.exit(1);
}

console.log('🚀 Starting markdown to HTML conversion...');
console.log('📁 Target directory:', lessonsDir);

const updatedCount = processDirectory(lessonsDir);

console.log('\n📊 Conversion Summary:');
console.log(`✅ Files updated: ${updatedCount}`);
console.log('🎉 Conversion completed!');