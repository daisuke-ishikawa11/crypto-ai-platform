const fs = require('fs');
const path = require('path');

function replaceImportsInDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      replaceImportsInDirectory(filePath);
    } else if (file.endsWith('.ts') && !file.endsWith('.d.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // 間違った型定義のインポートを修正
      const oldImport = "import type { Lesson } from '../../../lib/types/learning';";
      const newImport = "import type { Lesson } from '../../../types';";
      
      if (content.includes(oldImport)) {
        content = content.replace(oldImport, newImport);
        fs.writeFileSync(filePath, content);
        console.log(`Fixed: ${filePath}`);
      }
    }
  });
}

console.log('Fixing lesson imports...');
replaceImportsInDirectory('./src/data/lessons');
console.log('Done!');