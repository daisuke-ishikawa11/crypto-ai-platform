#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

ENVIRONMENT="${1:-staging}"
BASE_URL="${2:-}"

# Print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Determine base URL based on environment
if [ -z "$BASE_URL" ]; then
    case "$ENVIRONMENT" in
        production)
            BASE_URL="https://crypto-ai-platform.com"
            ;;
        staging)
            BASE_URL="https://staging.crypto-ai-platform.com"
            ;;
        local)
            BASE_URL="http://localhost:3000"
            ;;
        *)
            print_error "Unknown environment: $ENVIRONMENT"
            exit 1
            ;;
    esac
fi

print_status "Running health checks for $ENVIRONMENT environment"
print_status "Base URL: $BASE_URL"

# Initialize counters
TOTAL_CHECKS=0
PASSED_CHECKS=0
FAILED_CHECKS=0

# Function to run a health check
run_check() {
    local name="$1"
    local url="$2"
    local expected_status="${3:-200}"
    local timeout="${4:-10}"
    
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    
    print_status "Checking $name..."
    
    local response
    local http_code
    
    response=$(curl -s -w "%{http_code}" --connect-timeout "$timeout" --max-time "$timeout" "$url" || echo "000")
    http_code="${response: -3}"
    
    if [ "$http_code" = "$expected_status" ]; then
        print_success "$name - OK ($http_code)"
        PASSED_CHECKS=$((PASSED_CHECKS + 1))
        return 0
    else
        print_error "$name - FAILED ($http_code)"
        FAILED_CHECKS=$((FAILED_CHECKS + 1))
        return 1
    fi
}

# Function to check JSON response
check_json_endpoint() {
    local name="$1"
    local url="$2"
    local expected_field="$3"
    local timeout="${4:-10}"
    
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    
    print_status "Checking $name..."
    
    local response
    response=$(curl -s --connect-timeout "$timeout" --max-time "$timeout" "$url" 2>/dev/null || echo "{}")
    
    if command -v jq >/dev/null 2>&1; then
        local field_value
        field_value=$(echo "$response" | jq -r ".$expected_field" 2>/dev/null || echo "null")
        
        if [ "$field_value" != "null" ] && [ "$field_value" != "" ]; then
            print_success "$name - OK ($expected_field: $field_value)"
            PASSED_CHECKS=$((PASSED_CHECKS + 1))
            return 0
        else
            print_error "$name - FAILED (missing $expected_field)"
            FAILED_CHECKS=$((FAILED_CHECKS + 1))
            return 1
        fi
    else
        if echo "$response" | grep -q "$expected_field"; then
            print_success "$name - OK"
            PASSED_CHECKS=$((PASSED_CHECKS + 1))
            return 0
        else
            print_error "$name - FAILED (missing $expected_field)"
            FAILED_CHECKS=$((FAILED_CHECKS + 1))
            return 1
        fi
    fi
}

echo "=================================================="
echo "  Crypto AI Platform Health Check"
echo "=================================================="
echo ""

# Core Application Checks
echo "Core Application Checks:"
echo "------------------------"
run_check "Application Health" "$BASE_URL/api/health"
run_check "Homepage" "$BASE_URL/"
echo ""

# API Endpoint Checks
echo "API Endpoint Checks:"
echo "--------------------"
check_json_endpoint "Dashboard Overview" "$BASE_URL/api/dashboard/overview" "totalUsers"
check_json_endpoint "Market Data" "$BASE_URL/api/market/global" "totalMarketCap"
run_check "Learning Categories" "$BASE_URL/api/learning/categories"
run_check "Learning Lessons" "$BASE_URL/api/learning/lessons"
echo ""

# Authentication Checks (should return proper error codes)
echo "Authentication Checks:"
echo "----------------------"
run_check "Auth Endpoints (Unauthorized)" "$BASE_URL/api/alerts" "401"
echo ""

# Static Asset Checks
echo "Static Asset Checks:"
echo "--------------------"
run_check "Favicon" "$BASE_URL/favicon.ico"
run_check "Manifest" "$BASE_URL/site.webmanifest"
echo ""

# Performance Checks
echo "Performance Checks:"
echo "------------------"
if command -v curl >/dev/null 2>&1; then
    print_status "Measuring response time..."
    
    local start_time
    local end_time
    local response_time
    
    start_time=$(date +%s%N)
    if curl -s --connect-timeout 30 --max-time 30 "$BASE_URL/api/health" >/dev/null; then
        end_time=$(date +%s%N)
        response_time=$(( (end_time - start_time) / 1000000 ))
        
        if [ "$response_time" -lt 1000 ]; then
            print_success "Response time - OK (${response_time}ms)"
            PASSED_CHECKS=$((PASSED_CHECKS + 1))
        elif [ "$response_time" -lt 2000 ]; then
            print_warning "Response time - SLOW (${response_time}ms)"
            PASSED_CHECKS=$((PASSED_CHECKS + 1))
        else
            print_error "Response time - TOO SLOW (${response_time}ms)"
            FAILED_CHECKS=$((FAILED_CHECKS + 1))
        fi
    else
        print_error "Response time - FAILED (no response)"
        FAILED_CHECKS=$((FAILED_CHECKS + 1))
    fi
    
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
fi
echo ""

# Kubernetes Checks (if kubectl is available and we're not checking local)
if command -v kubectl >/dev/null 2>&1 && [ "$ENVIRONMENT" != "local" ]; then
    echo "Kubernetes Checks:"
    echo "------------------"
    
    local namespace="crypto-ai-$ENVIRONMENT"
    
    if kubectl get namespace "$namespace" >/dev/null 2>&1; then
        print_status "Checking Kubernetes resources..."
        
        # Check deployments
        local deployment_status
        deployment_status=$(kubectl get deployment -n "$namespace" -o jsonpath='{.items[0].status.readyReplicas}' 2>/dev/null || echo "0")
        
        if [ "$deployment_status" -gt 0 ]; then
            print_success "Kubernetes Deployment - OK ($deployment_status replicas ready)"
            PASSED_CHECKS=$((PASSED_CHECKS + 1))
        else
            print_error "Kubernetes Deployment - FAILED (no ready replicas)"
            FAILED_CHECKS=$((FAILED_CHECKS + 1))
        fi
        
        # Check services
        local service_count
        service_count=$(kubectl get service -n "$namespace" --no-headers 2>/dev/null | wc -l || echo "0")
        
        if [ "$service_count" -gt 0 ]; then
            print_success "Kubernetes Services - OK ($service_count services)"
            PASSED_CHECKS=$((PASSED_CHECKS + 1))
        else
            print_error "Kubernetes Services - FAILED (no services found)"
            FAILED_CHECKS=$((FAILED_CHECKS + 1))
        fi
        
        TOTAL_CHECKS=$((TOTAL_CHECKS + 2))
        
        # Show pod status
        print_status "Pod Status:"
        kubectl get pods -n "$namespace" 2>/dev/null || print_warning "Could not get pod status"
    else
        print_warning "Kubernetes namespace $namespace not found, skipping K8s checks"
    fi
    echo ""
fi

# SSL Certificate Check (for production/staging)
if [ "$ENVIRONMENT" != "local" ]; then
    echo "SSL Certificate Check:"
    echo "----------------------"
    
    if command -v openssl >/dev/null 2>&1; then
        local hostname
        hostname=$(echo "$BASE_URL" | sed 's|https\?://||' | sed 's|/.*||')
        
        local cert_info
        cert_info=$(echo | openssl s_client -servername "$hostname" -connect "$hostname":443 2>/dev/null | openssl x509 -noout -dates 2>/dev/null || echo "")
        
        if [ -n "$cert_info" ]; then
            local not_after
            not_after=$(echo "$cert_info" | grep "notAfter" | sed 's/notAfter=//')
            
            if [ -n "$not_after" ]; then
                print_success "SSL Certificate - OK (expires: $not_after)"
                PASSED_CHECKS=$((PASSED_CHECKS + 1))
            else
                print_warning "SSL Certificate - Could not parse expiry date"
            fi
        else
            print_error "SSL Certificate - FAILED (could not retrieve certificate)"
            FAILED_CHECKS=$((FAILED_CHECKS + 1))
        fi
        
        TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    else
        print_warning "OpenSSL not available, skipping SSL check"
    fi
    echo ""
fi

# Summary
echo "=================================================="
echo "  Health Check Summary"
echo "=================================================="
echo "Total Checks: $TOTAL_CHECKS"
echo "Passed: $PASSED_CHECKS"
echo "Failed: $FAILED_CHECKS"
echo ""

if [ "$FAILED_CHECKS" -eq 0 ]; then
    print_success "All health checks passed! 🎉"
    exit_code=0
elif [ "$FAILED_CHECKS" -le 2 ]; then
    print_warning "Some health checks failed, but system appears functional"
    exit_code=1
else
    print_error "Multiple health checks failed, system may have issues"
    exit_code=2
fi

echo "Success Rate: $(( PASSED_CHECKS * 100 / TOTAL_CHECKS ))%"
echo ""

if [ "$exit_code" -ne 0 ]; then
    print_status "For detailed logs, check:"
    echo "  - Application logs: kubectl logs -n crypto-ai-$ENVIRONMENT deployment/crypto-ai-$ENVIRONMENT"
    echo "  - Ingress logs: kubectl logs -n ingress-nginx deployment/ingress-nginx-controller"
    echo "  - Events: kubectl get events -n crypto-ai-$ENVIRONMENT --sort-by='.lastTimestamp'"
fi

exit $exit_code