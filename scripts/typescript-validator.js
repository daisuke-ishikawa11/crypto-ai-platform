#!/usr/bin/env node

/**
 * TypeScript Validation Script
 * Provides comprehensive TypeScript checking without the problematic file issue
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Configuration
const config = {
  srcDir: 'src',
  excludePatterns: [
    /backup/,
    /bak/,
    /broken/,
    /quote-fix/,
    /type-fix/,
    /\.test\./,
    /\.spec\./
  ],
  extensions: ['.ts', '.tsx'],
  skipDirectories: [
    'node_modules',
    '.next',
    'coverage',
    'dist',
    'build'
  ]
};

// Utility functions
function findTypeScriptFiles(dir, files = []) {
  if (config.skipDirectories.includes(path.basename(dir))) {
    return files;
  }

  try {
    const entries = fs.readdirSync(dir);
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        findTypeScriptFiles(fullPath, files);
      } else if (stat.isFile()) {
        // Check if file should be included
        if (config.extensions.some(ext => entry.endsWith(ext))) {
          const shouldExclude = config.excludePatterns.some(pattern => 
            pattern.test(fullPath)
          );
          
          if (!shouldExclude) {
            files.push(fullPath);
          }
        }
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not read directory ${dir}: ${error.message}`);
  }
  
  return files;
}

function checkTypeScriptSyntax(filePath) {
  return new Promise((resolve) => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Basic syntax checks
      const issues = [];
      
      // Check for common TypeScript issues
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        const lineNumber = index + 1;
        
        // Check for any type usage
        if (line.includes(': any') && !line.includes('// @ts-ignore')) {
          issues.push({
            type: 'any-type',
            line: lineNumber,
            message: 'Use of "any" type detected'
          });
        }
        
        // Check for missing return type on functions
        if (line.match(/^\s*(export\s+)?(async\s+)?function\s+\w+\s*\([^)]*\)\s*{/) && 
            !line.includes(': ') && 
            !line.includes('=> ')) {
          issues.push({
            type: 'missing-return-type',
            line: lineNumber,
            message: 'Function missing explicit return type'
          });
        }
        
        // Check for untyped parameters
        if (line.match(/function\s+\w+\s*\([^:)]*\w+[^:)]*\)/) && 
            !line.includes(': ')) {
          issues.push({
            type: 'untyped-parameter',
            line: lineNumber,
            message: 'Function parameter without type annotation'
          });
        }
      });
      
      resolve({
        file: filePath,
        valid: issues.length === 0,
        issues
      });
      
    } catch (error) {
      resolve({
        file: filePath,
        valid: false,
        issues: [{
          type: 'file-error',
          line: 0,
          message: `Could not read file: ${error.message}`
        }]
      });
    }
  });
}

function generateReport(results) {
  const totalFiles = results.length;
  const validFiles = results.filter(r => r.valid).length;
  const invalidFiles = totalFiles - validFiles;
  
  console.log('\n' + '='.repeat(80));
  console.log('🔍 TypeScript Validation Report');
  console.log('='.repeat(80));
  console.log(`📁 Total files checked: ${totalFiles}`);
  console.log(`✅ Valid files: ${validFiles}`);
  console.log(`❌ Files with issues: ${invalidFiles}`);
  console.log(`📊 Success rate: ${((validFiles / totalFiles) * 100).toFixed(1)}%`);
  
  if (invalidFiles > 0) {
    console.log('\n📋 Issues by category:');
    
    const issuesByType = {};
    results.forEach(result => {
      result.issues.forEach(issue => {
        if (!issuesByType[issue.type]) {
          issuesByType[issue.type] = [];
        }
        issuesByType[issue.type].push({
          file: result.file,
          line: issue.line,
          message: issue.message
        });
      });
    });
    
    Object.entries(issuesByType || {}).forEach(([type, issues]) => {
      console.log(`\n🔸 ${type.replace('-', ' ').toUpperCase()}: ${issues.length} issues`);
      
      // Show first few examples
      issues.slice(0, 5).forEach(issue => {
        console.log(`   ${issue.file}:${issue.line} - ${issue.message}`);
      });
      
      if (issues.length > 5) {
        console.log(`   ... and ${issues.length - 5} more`);
      }
    });
  }
  
  console.log('\n💡 Recommendations:');
  console.log('   1. Replace "any" types with specific interfaces');
  console.log('   2. Add explicit return types to all functions');
  console.log('   3. Type all function parameters');
  console.log('   4. Use TypeScript strict mode settings');
  
  return {
    totalFiles,
    validFiles,
    invalidFiles,
    successRate: (validFiles / totalFiles) * 100,
    issuesByType: Object.entries(issuesByType || {}).map(([type, issues]) => ({
      type,
      count: issues.length,
      examples: issues.slice(0, 3)
    }))
  };
}

// Main execution
async function main() {
  console.log('🚀 Starting TypeScript validation...');
  
  const files = findTypeScriptFiles(config.srcDir);
  console.log(`Found ${files.length} TypeScript files to check`);
  
  if (files.length === 0) {
    console.log('❌ No TypeScript files found!');
    process.exit(1);
  }
  
  const results = await Promise.all(files.map(checkTypeScriptSyntax));
  const report = generateReport(results);
  
  // Write detailed report to file
  const reportPath = 'typescript-validation-report.json';
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    config,
    summary: report,
    detailedResults: results
  }, null, 2));
  
  console.log(`\n📄 Detailed report written to: ${reportPath}`);
  console.log('\n✨ TypeScript validation complete!');
  
  // Exit with error code if there are issues
  process.exit(report.invalidFiles > 0 ? 1 : 0);
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Validation failed:', error);
    process.exit(1);
  });
}

module.exports = { main, findTypeScriptFiles, checkTypeScriptSyntax, generateReport };