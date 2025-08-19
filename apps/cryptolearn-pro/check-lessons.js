// Check lesson registry
const fs = require('fs');
const path = require('path');

// Read the lesson files directly
const lessonDir = path.join(__dirname, 'src/data/lessons/financial-literacy');
const lessons = [];

for (let i = 1; i <= 25; i++) {
  const fileName = `lesson-${i}.ts`;
  const filePath = path.join(lessonDir, fileName);
  
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
    const orderIndexMatch = content.match(/orderIndex:\s*(\d+)/);
    
    if (titleMatch && orderIndexMatch) {
      lessons.push({
        file: fileName,
        title: titleMatch[1],
        orderIndex: parseInt(orderIndexMatch[1])
      });
    }
  }
}

console.log('Financial Literacy Lessons:');
console.log('===========================');
lessons.sort((a, b) => a.orderIndex - b.orderIndex);
lessons.forEach(lesson => {
  console.log(`Lesson ${lesson.orderIndex}: ${lesson.title}`);
});

// Check file sizes
console.log('\nFile Sizes:');
console.log('===========');
for (let i = 7; i <= 10; i++) {
  const fileName = `lesson-${i}.ts`;
  const filePath = path.join(lessonDir, fileName);
  
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const lines = fs.readFileSync(filePath, 'utf8').split('\n').length;
    console.log(`${fileName}: ${lines} lines, ${Math.round(stats.size / 1024)}KB`);
  }
}