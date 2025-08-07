const fs = require('fs');
const path = require('path');

const apiRoutes = [
  'src/app/api/ai/prediction/route.ts',
  'src/app/api/dashboard/overview/route.ts',
  'src/app/api/explainable-ai/analyze/route.ts',
  'src/app/api/learning/achievements/route.ts',
  'src/app/api/learning/lessons/route.ts',
  'src/app/api/learning/lessons/[slug]/route.ts',
  'src/app/api/learning/recommendations/route.ts',
  'src/app/api/market/analysis/route.ts',
  'src/app/api/market/binance/route.ts',
  'src/app/api/market/coinmarketcap/route.ts',
  'src/app/api/market/global/route.ts',
  'src/app/api/market/realtime/route.ts',
  'src/app/api/monitoring/metrics/route.ts',
  'src/app/api/monitoring/performance/route.ts',
  'src/app/api/plans/change/route.ts',
  'src/app/api/risk/analysis/route.ts',
  'src/app/api/security/monitor/route.ts',
  'src/app/api/stripe/checkout/route.ts',
  'src/app/api/stripe/invoices/route.ts',
  'src/app/api/stripe/invoices/[id]/route.ts',
  'src/app/api/stripe/test-cards/route.ts',
  'src/app/api/stripe/webhook/route.ts',
  'src/app/api/subscriptions/route.ts',
  'src/app/api/usage/[userId]/route.ts',
  'src/app/api/alerts/recent/route.ts',
  'src/app/api/alerts/route.ts',
  'src/app/api/learning/categories/route.ts',
  'src/app/api/ai/chat/route.ts',
  'src/app/api/ai/analyze/route.ts',
  'src/app/api/ab-testing/tests/route.ts',
  'src/app/api/health/route.ts',
  'src/app/api/learning/seed/route.ts'
];

console.log('🔧 API routes dynamic export configuration...');

apiRoutes.forEach(routePath => {
  try {
    const fullPath = path.join(__dirname, routePath);
    
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // dynamic exportが既に存在するかチェック
      if (!content.includes('export const dynamic')) {
        // importの後、最初のexport function前に挿入
        const lines = content.split('\n');
        const insertIndex = lines.findIndex(line => 
          line.startsWith('export async function') || 
          line.startsWith('export function') ||
          line.includes('export') && line.includes('function')
        );
        
        if (insertIndex !== -1) {
          lines.splice(insertIndex, 0, '', 'export const dynamic = \'force-dynamic\'', '');
          const newContent = lines.join('\n');
          fs.writeFileSync(fullPath, newContent);
          console.log(`✅ Updated: ${routePath}`);
        }
      } else {
        console.log(`⚠️ Already configured: ${routePath}`);
      }
    }
  } catch (error) {
    console.log(`❌ Error processing ${routePath}:`, error.message);
  }
});

console.log('🎯 API routes configuration completed!');