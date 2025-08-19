// Simple debug script to test lesson loading
const fs = require('fs');

console.log('=== DEBUGGING LESSON LOADING ===');

// 1. Check if lesson-1.ts file exists
const lessonPath = './src/data/lessons/crypto-basics/lesson-1.ts';
console.log('1. Lesson file exists:', fs.existsSync(lessonPath));

// 2. Check lesson registry for what-is-cryptocurrency
const registryPath = './src/data/lessons/lesson-registry.ts';
const registryContent = fs.readFileSync(registryPath, 'utf8');

// Look for what-is-cryptocurrency in the registry
const hasSlug = registryContent.includes("slug: 'what-is-cryptocurrency'");
console.log('2. Registry has what-is-cryptocurrency:', hasSlug);

// 3. Look for the dynamic import in loadLesson function
const hasCryptoBasicsImport = registryContent.includes("import('./crypto-basics/lesson-1')");
console.log('3. Registry has crypto-basics import:', hasCryptoBasicsImport);

// 4. Check the exact structure of lesson-1 export
const lesson1Content = fs.readFileSync(lessonPath, 'utf8');
const hasLesson1Export = lesson1Content.includes('export const lesson1');
console.log('4. Lesson file has lesson1 export:', hasLesson1Export);

// 5. Check import path in lesson-1
const hasTypeImport = lesson1Content.includes("import type { Lesson } from '@/types'");
console.log('5. Lesson file has correct type import:', hasTypeImport);

console.log('\n=== DETAILED ANALYSIS ===');

// Extract lesson registry entry for what-is-cryptocurrency
const slugMatch = registryContent.match(/\{[^}]*slug: 'what-is-cryptocurrency'[^}]*\}/s);
if (slugMatch) {
  console.log('6. Registry entry found:');
  console.log(slugMatch[0]);
} else {
  console.log('6. Registry entry NOT found');
}

// Check if lesson structure matches expected interface
const sectionMatch = lesson1Content.match(/sections:\s*\[/);
console.log('7. Lesson has sections array:', !!sectionMatch);

const quizMatch = lesson1Content.match(/quiz:\s*\[/);
console.log('8. Lesson has quiz array:', !!quizMatch);