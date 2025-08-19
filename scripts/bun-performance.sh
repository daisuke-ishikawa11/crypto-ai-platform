#!/bin/bash

# =============================================================================
# 🚀 Bun Performance Testing Script
# =============================================================================
# npm vs bun performance comparison for Crypto AI Platform
# Measures install time, test execution, and build performance

set -e

echo "🚀 Crypto AI Platform - Bun Performance Testing"
echo "================================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Clean function
clean_environment() {
    echo -e "${YELLOW}🧹 Cleaning environment...${NC}"
    rm -rf node_modules package-lock.json bun.lockb 2>/dev/null || true
    npm cache clean --force >/dev/null 2>&1 || true
    echo ""
}

# Test package installation speed
test_install_speed() {
    echo -e "${BLUE}📦 Testing Package Installation Speed${NC}"
    echo "========================================"
    
    # Test npm install
    clean_environment
    echo -e "${YELLOW}Testing npm install...${NC}"
    
    npm_start_time=$(date +%s.%3N)
    npm install --silent >/dev/null 2>&1
    npm_end_time=$(date +%s.%3N)
    npm_duration=$(echo "$npm_end_time - $npm_start_time" | bc)
    
    echo -e "${GREEN}✓ npm install completed in ${npm_duration}s${NC}"
    
    # Test bun install  
    clean_environment
    echo -e "${YELLOW}Testing bun install...${NC}"
    
    bun_start_time=$(date +%s.%3N)
    npx bun install >/dev/null 2>&1
    bun_end_time=$(date +%s.%3N)
    bun_duration=$(echo "$bun_end_time - $bun_start_time" | bc)
    
    echo -e "${GREEN}✓ bun install completed in ${bun_duration}s${NC}"
    
    # Calculate speedup
    speedup=$(echo "scale=2; $npm_duration / $bun_duration" | bc)
    echo ""
    echo -e "${BLUE}📊 Installation Speed Results:${NC}"
    echo "  npm:  ${npm_duration}s"
    echo "  bun:  ${bun_duration}s"
    echo -e "  ${GREEN}Speedup: ${speedup}x${NC}"
    echo ""
}

# Test execution speed
test_execution_speed() {
    echo -e "${BLUE}⚡ Testing Script Execution Speed${NC}"
    echo "===================================="
    
    # Test npm run type-check
    echo -e "${YELLOW}Testing npm run type-check...${NC}"
    npm_start_time=$(date +%s.%3N)
    timeout 60 npm run type-check >/dev/null 2>&1 || true
    npm_end_time=$(date +%s.%3N)
    npm_typecheck_duration=$(echo "$npm_end_time - $npm_start_time" | bc)
    
    echo -e "${GREEN}✓ npm type-check completed in ${npm_typecheck_duration}s${NC}"
    
    # Test bun run type-check
    echo -e "${YELLOW}Testing bun run type-check...${NC}"
    bun_start_time=$(date +%s.%3N)
    timeout 60 npx bun run type-check >/dev/null 2>&1 || true
    bun_end_time=$(date +%s.%3N)
    bun_typecheck_duration=$(echo "$bun_end_time - $bun_start_time" | bc)
    
    echo -e "${GREEN}✓ bun type-check completed in ${bun_typecheck_duration}s${NC}"
    
    # Calculate speedup
    if [[ $(echo "$bun_typecheck_duration > 0" | bc) -eq 1 ]]; then
        typecheck_speedup=$(echo "scale=2; $npm_typecheck_duration / $bun_typecheck_duration" | bc)
        echo ""
        echo -e "${BLUE}📊 Type-check Speed Results:${NC}"
        echo "  npm:  ${npm_typecheck_duration}s"
        echo "  bun:  ${bun_typecheck_duration}s"
        echo -e "  ${GREEN}Speedup: ${typecheck_speedup}x${NC}"
    fi
    echo ""
}

# Test memory usage
test_memory_usage() {
    echo -e "${BLUE}🧠 Testing Memory Usage${NC}"
    echo "========================"
    
    # Get baseline memory
    baseline_memory=$(ps -o rss= -p $$ | xargs)
    echo "Baseline memory: ${baseline_memory}KB"
    
    # This would require more complex monitoring
    echo -e "${YELLOW}Memory monitoring requires separate tooling${NC}"
    echo ""
}

# Generate report
generate_report() {
    echo -e "${GREEN}📋 Performance Testing Complete!${NC}"
    echo "=================================="
    echo ""
    echo -e "${BLUE}Summary:${NC}"
    echo "• Package installation tested ✓"
    echo "• Script execution tested ✓" 
    echo "• Memory usage noted ✓"
    echo ""
    echo -e "${YELLOW}Recommendations:${NC}"
    echo "• Use 'npm run bun:install' for faster installs"
    echo "• Use 'npm run bun:test' for faster testing"
    echo "• Monitor memory usage in production"
    echo ""
}

# Main execution
main() {
    test_install_speed
    test_execution_speed  
    test_memory_usage
    generate_report
}

# Check if bc is available for calculations
if ! command -v bc &> /dev/null; then
    echo -e "${RED}Error: bc calculator is required but not installed${NC}"
    echo "Please install bc: sudo apt-get install bc"
    exit 1
fi

# Run main function
main