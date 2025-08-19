const fs = require('fs');

// lesson-registry.tsを読み込む
let content = fs.readFileSync('./lesson-registry.ts', 'utf8');

// JSONフォーマットをTypeScriptオブジェクトリテラル形式に変換
// ダブルクォートをシングルクォートに変換（値部分のみ）
content = content.replace(/"difficultyLevel": "(beginner|intermediate|advanced)"/g, "difficultyLevel: '$1'");
content = content.replace(/"(id|categoryId|title|slug|description|lastUpdated)": "([^"]*)"/g, "$1: '$2'");
content = content.replace(/"(estimatedMinutes|orderIndex|quizCount)": (\d+)/g, "$1: $2");
content = content.replace(/"(isPublished|factChecked)": (true|false)/g, "$1: $2");

// オブジェクトのプロパティ名からクォートを削除
content = content.replace(/"(\w+)":/g, "$1:");

// ファイルに書き戻す
fs.writeFileSync('./lesson-registry.ts', content);
console.log('Fixed registry format');