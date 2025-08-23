#!/usr/bin/env node

const fs = require('fs');

// 特定ファイルの修正
function fixFile(filePath) {
  console.log(`Fixing: ${filePath}`);
  
  const content = fs.readFileSync(filePath, 'utf8');
  let fixed = content;
  
  // 1. ``` のコードブロックを HTML div に変換
  fixed = fixed.replace(/```[\s\S]*?```/g, (match) => {
    const code = match.replace(/^```[^\n]*\n?/, '').replace(/\n?\s*```$/, '');
    return `<div style="background: #1e293b; color: #f1f5f9; padding: 1rem; border-radius: 4px; font-family: monospace; margin: 1rem 0;">${code.trim()}</div>`;
  });
  
  // 2. **太字** を <strong> に変換
  fixed = fixed.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  // 3. - リスト項目をHTMLに変換（必要な場合）
  // ここでは既存のHTMLリストは維持し、markdownのリストのみ変換
  const lines = fixed.split('\n');
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
  
  fixed = processedLines.join('\n');
  
  // ファイルに書き込み
  fs.writeFileSync(filePath, fixed, 'utf8');
  console.log(`✅ Fixed: ${filePath}`);
}

// 特定のファイルを修正
const filePath = '/mnt/d/crypto-ai-platform/apps/cryptolearn-pro/src/data/lessons/advanced-investment/lesson-13.ts';
fixFile(filePath);