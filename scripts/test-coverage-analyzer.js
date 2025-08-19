#!/usr/bin/env node
// 📊 Test Coverage Analyzer
// Analyzes test coverage across the codebase manually

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  sourceDirectories: ['src/lib', 'src/components'],
  testDirectories: ['tests/unit', 'tests/integration', 'tests/e2e'],
  excludePatterns: [
    '*.d.ts',
    'index.ts',
    '*.stories.tsx',
    '*.spec.tsx',
    '__tests__',
    '.next',
    'node_modules'
  ]
};

class TestCoverageAnalyzer {
  constructor() {
    this.sourceFiles = new Map();
    this.testFiles = new Map();
    this.coverageStats = {
      totalFiles: 0,
      testedFiles: 0,
      untested: [],
      partiallyTested: [],
      wellTested: [],
      totalLines: 0,
      testedLines: 0
    };
  }

  // Find all source files
  findSourceFiles() {
    console.log('🔍 Scanning source files...');
    
    for (const dir of config.sourceDirectories) {
      this.scanDirectory(path.join(process.cwd(), dir), (filePath, content) => {
        const relativePath = path.relative(process.cwd(), filePath);
        
        if (this.shouldIncludeFile(filePath)) {
          const lines = content.split('\n').length;
          const functions = this.extractFunctions(content);
          const complexity = this.calculateComplexity(content);
          
          this.sourceFiles.set(relativePath, {
            path: relativePath,
            content,
            lines,
            functions,
            complexity,
            hasTests: false,
            testFiles: [],
            coverage: 0
          });
          
          this.coverageStats.totalFiles++;
          this.coverageStats.totalLines += lines;
        }
      });
    }
    
    console.log(`📄 Found ${this.sourceFiles.size} source files`);
  }

  // Find all test files
  findTestFiles() {
    console.log('🧪 Scanning test files...');
    
    for (const dir of config.testDirectories) {
      const testDir = path.join(process.cwd(), dir);
      if (fs.existsSync(testDir)) {
        this.scanDirectory(testDir, (filePath, content) => {
          const relativePath = path.relative(process.cwd(), filePath);
          
          if (filePath.includes('.test.') || filePath.includes('.spec.')) {
            const testedModules = this.extractTestedModules(content);
            const testCases = this.extractTestCases(content);
            
            this.testFiles.set(relativePath, {
              path: relativePath,
              content,
              testedModules,
              testCases: testCases.length,
              quality: this.assessTestQuality(content)
            });
          }
        });
      }
    }
    
    console.log(`🧪 Found ${this.testFiles.size} test files`);
  }

  // Calculate coverage by matching tests to source files
  calculateCoverage() {
    console.log('📊 Calculating coverage...');
    
    // Match test files to source files
    for (const [testPath, testData] of this.testFiles) {
      for (const modulePath of testData.testedModules) {
        let matchedSource = null;
        
        // Try to find matching source file
        for (const [sourcePath, sourceData] of this.sourceFiles) {
          if (this.isModuleMatch(sourcePath, modulePath)) {
            matchedSource = sourcePath;
            break;
          }
        }
        
        if (matchedSource) {
          const sourceData = this.sourceFiles.get(matchedSource);
          sourceData.hasTests = true;
          sourceData.testFiles.push(testPath);
          
          // Calculate coverage based on test quality and quantity
          const coverage = Math.min(100, 
            (testData.testCases * 15) + 
            (testData.quality * 20) + 
            (sourceData.functions.length > 0 ? 30 : 0)
          );
          
          sourceData.coverage = Math.max(sourceData.coverage, coverage);
        }
      }
    }

    // Categorize files by coverage
    for (const [filePath, fileData] of this.sourceFiles) {
      if (fileData.coverage === 0) {
        this.coverageStats.untested.push(fileData);
      } else if (fileData.coverage < 70) {
        this.coverageStats.partiallyTested.push(fileData);
      } else {
        this.coverageStats.wellTested.push(fileData);
        this.coverageStats.testedFiles++;
        this.coverageStats.testedLines += fileData.lines;
      }
    }
  }

  // Generate comprehensive report
  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 CRYPTO AI PLATFORM - TEST COVERAGE REPORT');
    console.log('='.repeat(60));
    
    const overallCoverage = (this.coverageStats.testedFiles / this.coverageStats.totalFiles) * 100;
    const lineCoverage = (this.coverageStats.testedLines / this.coverageStats.totalLines) * 100;
    
    console.log(`\n📈 OVERALL STATISTICS:`);
    console.log(`   Total Files: ${this.coverageStats.totalFiles}`);
    console.log(`   Tested Files: ${this.coverageStats.testedFiles}`);
    console.log(`   File Coverage: ${overallCoverage.toFixed(1)}%`);
    console.log(`   Line Coverage: ${lineCoverage.toFixed(1)}%`);
    console.log(`   Total Lines: ${this.coverageStats.totalLines.toLocaleString()}`);
    
    // Coverage by category
    console.log(`\n📋 COVERAGE BREAKDOWN:`);
    console.log(`   ✅ Well Tested (70%+): ${this.coverageStats.wellTested.length} files`);
    console.log(`   ⚠️  Partially Tested: ${this.coverageStats.partiallyTested.length} files`);
    console.log(`   ❌ Not Tested: ${this.coverageStats.untested.length} files`);
    
    // Coverage by directory
    this.generateDirectoryCoverage();
    
    // Critical untested files
    this.identifyCriticalGaps();
    
    // Recommendations
    this.generateRecommendations();
    
    // Detailed file listing
    if (process.argv.includes('--detailed')) {
      this.generateDetailedReport();
    }
    
    return {
      overallCoverage: overallCoverage.toFixed(1),
      lineCoverage: lineCoverage.toFixed(1),
      totalFiles: this.coverageStats.totalFiles,
      testedFiles: this.coverageStats.testedFiles,
      wellTested: this.coverageStats.wellTested.length,
      partiallyTested: this.coverageStats.partiallyTested.length,
      untested: this.coverageStats.untested.length
    };
  }

  generateDirectoryCoverage() {
    console.log(`\n📁 COVERAGE BY DIRECTORY:`);
    
    const dirStats = new Map();
    
    for (const [filePath, fileData] of this.sourceFiles) {
      const dir = path.dirname(filePath);
      
      if (!dirStats.has(dir)) {
        dirStats.set(dir, { total: 0, tested: 0, coverage: 0 });
      }
      
      const stats = dirStats.get(dir);
      stats.total++;
      if (fileData.coverage > 0) stats.tested++;
    }
    
    for (const [dir, stats] of dirStats) {
      const coverage = (stats.tested / stats.total) * 100;
      const status = coverage >= 80 ? '✅' : coverage >= 50 ? '⚠️' : '❌';
      console.log(`   ${status} ${dir}: ${coverage.toFixed(1)}% (${stats.tested}/${stats.total})`);
    }
  }

  identifyCriticalGaps() {
    console.log(`\n🚨 CRITICAL COVERAGE GAPS:`);
    
    const criticalFiles = this.coverageStats.untested
      .filter(file => 
        file.complexity > 5 || 
        file.functions.length > 3 ||
        file.path.includes('security') ||
        file.path.includes('auth') ||
        file.path.includes('payment')
      )
      .sort((a, b) => b.complexity - a.complexity)
      .slice(0, 10);
    
    if (criticalFiles.length === 0) {
      console.log('   🎉 No critical coverage gaps found!');
    } else {
      criticalFiles.forEach((file, index) => {
        console.log(`   ${index + 1}. ${file.path}`);
        console.log(`      Complexity: ${file.complexity}, Functions: ${file.functions.length}`);
      });
    }
  }

  generateRecommendations() {
    console.log(`\n💡 RECOMMENDATIONS:`);
    
    const overallCoverage = (this.coverageStats.testedFiles / this.coverageStats.totalFiles) * 100;
    
    if (overallCoverage < 60) {
      console.log('   🔴 URGENT: Coverage is below 60%. Prioritize testing critical components.');
    } else if (overallCoverage < 80) {
      console.log('   🟡 MODERATE: Coverage is decent but should aim for 80%+.');
    } else {
      console.log('   🟢 GOOD: Coverage is above 80%. Focus on maintaining quality.');
    }
    
    console.log('\n   Priority Actions:');
    console.log('   1. Add tests for security and authentication modules');
    console.log('   2. Implement integration tests for API endpoints');
    console.log('   3. Add E2E tests for critical user flows');
    console.log('   4. Set up automated coverage reporting in CI/CD');
    console.log('   5. Establish coverage thresholds to prevent regression');
  }

  generateDetailedReport() {
    console.log(`\n📄 DETAILED FILE REPORT:`);
    
    console.log(`\n❌ UNTESTED FILES (${this.coverageStats.untested.length}):`);
    this.coverageStats.untested.slice(0, 20).forEach(file => {
      console.log(`   • ${file.path} (${file.lines} lines, ${file.functions.length} functions)`);
    });
    
    console.log(`\n⚠️  PARTIALLY TESTED FILES (${this.coverageStats.partiallyTested.length}):`);
    this.coverageStats.partiallyTested.slice(0, 10).forEach(file => {
      console.log(`   • ${file.path} - ${file.coverage}% coverage`);
    });
    
    console.log(`\n✅ WELL TESTED FILES (${this.coverageStats.wellTested.length}):`);
    this.coverageStats.wellTested.slice(0, 10).forEach(file => {
      console.log(`   • ${file.path} - ${file.coverage}% coverage`);
    });
  }

  // Helper methods
  scanDirectory(dirPath, callback) {
    if (!fs.existsSync(dirPath)) return;
    
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        this.scanDirectory(itemPath, callback);
      } else if (stat.isFile() && (item.endsWith('.ts') || item.endsWith('.tsx'))) {
        const content = fs.readFileSync(itemPath, 'utf-8');
        callback(itemPath, content);
      }
    }
  }

  shouldIncludeFile(filePath) {
    const fileName = path.basename(filePath);
    return !config.excludePatterns.some(pattern => 
      pattern.startsWith('*') 
        ? fileName.endsWith(pattern.substring(1))
        : fileName.includes(pattern)
    );
  }

  extractFunctions(content) {
    const functionRegex = /(?:function\s+|const\s+\w+\s*=\s*(?:async\s+)?(?:\([^)]*\)\s*=>|\w+)|class\s+\w+|export\s+(?:async\s+)?function)/g;
    return (content.match(functionRegex) || []).map(match => match.trim());
  }

  calculateComplexity(content) {
    const complexityIndicators = [
      /if\s*\(/g, /else\s*{/g, /for\s*\(/g, /while\s*\(/g, /catch\s*\(/g,
      /switch\s*\(/g, /case\s+/g, /&&|\|\|/g, /\?\s*:/g
    ];
    
    let complexity = 1; // Base complexity
    for (const regex of complexityIndicators) {
      const matches = content.match(regex);
      if (matches) complexity += matches.length;
    }
    
    return complexity;
  }

  extractTestedModules(content) {
    const importRegex = /from\s+['"]([^'"]+)['"]/g;
    const modules = [];
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
      if (match[1].startsWith('@/') || match[1].startsWith('./') || match[1].startsWith('../')) {
        modules.push(match[1]);
      }
    }
    
    return modules;
  }

  extractTestCases(content) {
    const testRegex = /(?:it|test|describe)\s*\(\s*['"`]([^'"`]+)['"`]/g;
    const testCases = [];
    let match;
    
    while ((match = testRegex.exec(content)) !== null) {
      testCases.push(match[1]);
    }
    
    return testCases;
  }

  assessTestQuality(content) {
    let quality = 0;
    
    // Check for different types of tests
    if (content.includes('expect(')) quality += 1;
    if (content.includes('mock') || content.includes('jest.fn')) quality += 1;
    if (content.includes('beforeEach') || content.includes('afterEach')) quality += 1;
    if (content.includes('async') && content.includes('await')) quality += 1;
    if (content.includes('toThrow') || content.includes('rejects')) quality += 1;
    
    return Math.min(quality, 5);
  }

  isModuleMatch(sourcePath, modulePath) {
    const normalizedModule = modulePath
      .replace(/^@\//, 'src/')
      .replace(/^\.\//, '')
      .replace(/^\.\.\//, '');
    
    return sourcePath.includes(normalizedModule) ||
           normalizedModule.includes(path.basename(sourcePath, path.extname(sourcePath)));
  }

  // Main execution method
  async run() {
    console.log('🚀 Starting Test Coverage Analysis...\n');
    
    this.findSourceFiles();
    this.findTestFiles();
    this.calculateCoverage();
    
    const summary = this.generateReport();
    
    // Save report to file
    const reportPath = path.join(process.cwd(), 'test-coverage-report.json');
    fs.writeFileSync(reportPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      summary,
      details: {
        sourceFiles: Array.from(this.sourceFiles.entries()),
        testFiles: Array.from(this.testFiles.entries()),
        coverageStats: this.coverageStats
      }
    }, null, 2));
    
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
    console.log('\n✨ Analysis complete!');
    
    return summary;
  }
}

// Run the analyzer if called directly
if (require.main === module) {
  const analyzer = new TestCoverageAnalyzer();
  analyzer.run().catch(console.error);
}

module.exports = TestCoverageAnalyzer;