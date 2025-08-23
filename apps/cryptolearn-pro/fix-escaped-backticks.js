#!/usr/bin/env node

const fs = require('fs');

// 特定ファイルの修正
function fixEscapedBackticks(filePath) {
  console.log(`Fixing escaped backticks in: ${filePath}`);
  
  const content = fs.readFileSync(filePath, 'utf8');
  let fixed = content;
  
  // 1. エスケープされたバッククォート \`\`\` を ``` に戻す
  fixed = fixed.replace(/\\`\\`\\`/g, '```');
  
  // 2. 通常の ``` を HTML div に変換
  fixed = fixed.replace(/```[\s\S]*?```/g, (match) => {
    const code = match.replace(/^```[^\n]*\n?/, '').replace(/\n?\s*```$/, '');
    return `<div style="background: #1e293b; color: #f1f5f9; padding: 1rem; border-radius: 4px; font-family: monospace; margin: 1rem 0;">${code.trim()}</div>`;
  });
  
  // ファイルに書き込み
  fs.writeFileSync(filePath, fixed, 'utf8');
  console.log(`✅ Fixed escaped backticks in: ${filePath}`);
}

// 特定のファイルを修正
const filePath = '/mnt/d/crypto-ai-platform/apps/cryptolearn-pro/src/data/lessons/advanced-investment/lesson-13.ts';
fixEscapedBackticks(filePath);