// レッスン一覧のテスト
const fs = require('fs');
const path = require('path');

// lesson-registry.tsを読み込む
const registryPath = path.join(__dirname, 'src/data/lessons/lesson-registry.ts');
const registryContent = fs.readFileSync(registryPath, 'utf8');

// カテゴリごとのレッスン数をカウント
const categories = [
  'financial-literacy',
  'crypto-basics', 
  'trading-basics',
  'defi-nft',
  'advanced-investment',
  'risk-management',
  'regulation-compliance',
  'blockchain-tech'
];

console.log('=== レッスン登録状況の確認 ===\n');

let totalCount = 0;
categories.forEach(cat => {
  const regex = new RegExp(`categoryId: '${cat}'`, 'g');
  const matches = registryContent.match(regex);
  const count = matches ? matches.length : 0;
  totalCount += count;
  console.log(`${cat}: ${count} レッスン`);
});

console.log(`\n合計: ${totalCount} レッスン`);

// レジストリの配列が正しく閉じているか確認
const arrayEnd = registryContent.indexOf('\n]');
if (arrayEnd !== -1) {
  console.log('\n✅ レジストリ配列は正しく閉じています');
} else {
  console.log('\n❌ レジストリ配列が正しく閉じていません');
}

// エクスポートが正しいか確認
if (registryContent.includes('export const lessonRegistry')) {
  console.log('✅ レジストリは正しくエクスポートされています');
} else {
  console.log('❌ レジストリのエクスポートに問題があります');
}

if (registryContent.includes('export function getLessonsByCategory')) {
  console.log('✅ getLessonsByCategoryが定義されています');
} else {
  console.log('❌ getLessonsByCategoryが定義されていません');
}

console.log('\n=== テスト完了 ===');