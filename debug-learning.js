const { execSync } = require('child_process');

// Simple Node.js script to test LearningService
console.log('Testing LearningService...');

try {
  // Try to import and create LearningService
  const result = execSync(`cd /mnt/d/crypto-ai-platform && node -e "
    const { LearningService } = require('./src/lib/services/learning.service.ts');
    const service = new LearningService();
    console.log('LearningService created successfully');
    console.log('Available methods:', Object.getOwnPropertyNames(LearningService.prototype));
  "`, { encoding: 'utf8', stdio: 'pipe' });
  
  console.log('✅ Success:', result);
} catch (error) {
  console.error('❌ Error Details:');
  console.error('stdout:', error.stdout);
  console.error('stderr:', error.stderr);
  console.error('status:', error.status);
}