#!/bin/bash
# =============================================================================
# 🚀 CRYPTO AI PLATFORM - STAGING ENVIRONMENT STARTUP SCRIPT
# =============================================================================
# Comprehensive staging environment startup with health checks and monitoring
# Includes performance optimization, system validation, and error handling
# WSL2 compatible with real-time status monitoring
# =============================================================================

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LOG_FILE="$PROJECT_DIR/logs/staging-startup.log"
COMPOSE_FILE="$PROJECT_DIR/docker-compose.staging.yml"
HEALTH_CHECK_TIMEOUT=300  # 5 minutes
STARTUP_TIMEOUT=600       # 10 minutes

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# Logging function
log() {
    local level=$1
    shift
    local message="$*"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    # Create logs directory if it doesn't exist
    mkdir -p "$(dirname "$LOG_FILE")"
    
    case $level in
        INFO)
            echo -e "${GREEN}[INFO]${NC} $message"
            echo "[$timestamp] [INFO] $message" >> "$LOG_FILE"
            ;;
        WARN)
            echo -e "${YELLOW}[WARN]${NC} $message"
            echo "[$timestamp] [WARN] $message" >> "$LOG_FILE"
            ;;
        ERROR)
            echo -e "${RED}[ERROR]${NC} $message"
            echo "[$timestamp] [ERROR] $message" >> "$LOG_FILE"
            ;;
        SUCCESS)
            echo -e "${GREEN}[SUCCESS]${NC} $message"
            echo "[$timestamp] [SUCCESS] $message" >> "$LOG_FILE"
            ;;
        DEBUG)
            echo -e "${BLUE}[DEBUG]${NC} $message"
            echo "[$timestamp] [DEBUG] $message" >> "$LOG_FILE"
            ;;
    esac
}

# Print banner
print_banner() {
    echo -e "${PURPLE}"
    cat << "EOF"
    ╔══════════════════════════════════════════════════════╗
    ║           🚀 CRYPTO AI PLATFORM                      ║
    ║          Staging Environment Startup                 ║
    ║                                                      ║
    ║  🐳 Docker Hybrid Environment                        ║
    ║  📊 Real-time Monitoring                             ║
    ║  ⚡ Performance Optimized                            ║
    ║  🔒 Security Hardened                                ║
    ╚══════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}"
}

# System requirements check
check_system_requirements() {
    log INFO "Checking system requirements..."
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        log ERROR "Docker is not installed or not in PATH"
        exit 1
    fi
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        log ERROR "Docker Compose is not installed or not in PATH"
        exit 1
    fi
    
    # Check Docker daemon
    if ! docker info &> /dev/null; then
        log ERROR "Docker daemon is not running"
        exit 1
    fi
    
    # Check available memory
    local available_memory=$(free -m | grep '^Mem:' | awk '{print $7}')
    if [[ $available_memory -lt 4096 ]]; then
        log WARN "Available memory is less than 4GB ($available_memory MB). Performance may be impacted."
    fi
    
    # Check disk space
    local available_space=$(df "$PROJECT_DIR" | tail -1 | awk '{print $4}')
    if [[ $available_space -lt 10485760 ]]; then  # 10GB in KB
        log WARN "Available disk space is less than 10GB. Consider freeing up space."
    fi
    
    log SUCCESS "System requirements check completed"
}

# Environment preparation
prepare_environment() {
    log INFO "Preparing staging environment..."
    
    # Create necessary directories
    mkdir -p "$PROJECT_DIR/logs"
    mkdir -p "$PROJECT_DIR/monitoring/rules"
    mkdir -p "$PROJECT_DIR/monitoring/grafana/dashboards"
    mkdir -p "$PROJECT_DIR/monitoring/grafana/datasources"
    
    # Set proper permissions
    chmod -R 755 "$PROJECT_DIR/scripts"
    
    # Check if .env.local exists, create from example if not
    if [[ ! -f "$PROJECT_DIR/.env.local" ]]; then
        log WARN ".env.local not found, creating from env.example"
        cp "$PROJECT_DIR/env.example" "$PROJECT_DIR/.env.local"
        log INFO "Please configure .env.local with your actual values"
    fi
    
    log SUCCESS "Environment preparation completed"
}

# Docker cleanup
cleanup_previous_containers() {
    log INFO "Cleaning up previous containers..."
    
    # Stop existing staging containers
    if docker-compose -f "$COMPOSE_FILE" ps -q &> /dev/null; then
        docker-compose -f "$COMPOSE_FILE" down --remove-orphans
    fi
    
    # Remove unused networks and volumes (optional)
    if [[ "${CLEAN:-false}" == "true" ]]; then
        log INFO "Performing deep cleanup..."
        docker network prune -f || true
        docker volume prune -f || true
        docker system prune -f || true
    fi
    
    log SUCCESS "Cleanup completed"
}

# Build and start services
start_services() {
    log INFO "Starting staging services..."
    
    # Pull latest images
    log INFO "Pulling latest images..."
    docker-compose -f "$COMPOSE_FILE" pull
    
    # Build application
    log INFO "Building application..."
    docker-compose -f "$COMPOSE_FILE" build --no-cache app-staging
    
    # Start core services first (database, cache)
    log INFO "Starting core services..."
    docker-compose -f "$COMPOSE_FILE" up -d postgres-staging redis-staging
    
    # Wait for core services to be healthy
    wait_for_service "postgres-staging" 60
    wait_for_service "redis-staging" 30
    
    # Start application
    log INFO "Starting application..."
    docker-compose -f "$COMPOSE_FILE" up -d app-staging
    
    # Wait for application to be healthy
    wait_for_service "app-staging" 120
    
    # Start monitoring stack
    log INFO "Starting monitoring stack..."
    docker-compose -f "$COMPOSE_FILE" up -d prometheus-staging grafana-staging node-exporter-staging
    
    # Start exporters
    log INFO "Starting metric exporters..."
    docker-compose -f "$COMPOSE_FILE" up -d postgres-exporter redis-exporter
    
    # Start load balancer
    log INFO "Starting load balancer..."
    docker-compose -f "$COMPOSE_FILE" up -d nginx-staging
    
    # Start alerting
    log INFO "Starting alerting..."
    docker-compose -f "$COMPOSE_FILE" up -d alertmanager
    
    log SUCCESS "All services started successfully"
}

# Wait for service to be healthy
wait_for_service() {
    local service_name=$1
    local timeout=${2:-60}
    local counter=0
    
    log INFO "Waiting for $service_name to be healthy (timeout: ${timeout}s)..."
    
    while [[ $counter -lt $timeout ]]; do
        if docker-compose -f "$COMPOSE_FILE" ps "$service_name" | grep -q "healthy"; then
            log SUCCESS "$service_name is healthy"
            return 0
        elif docker-compose -f "$COMPOSE_FILE" ps "$service_name" | grep -q "unhealthy"; then
            log ERROR "$service_name is unhealthy"
            docker-compose -f "$COMPOSE_FILE" logs --tail=20 "$service_name"
            return 1
        fi
        
        sleep 5
        counter=$((counter + 5))
        echo -n "."
    done
    
    echo
    log ERROR "$service_name failed to become healthy within ${timeout}s"
    docker-compose -f "$COMPOSE_FILE" logs --tail=20 "$service_name"
    return 1
}

# Perform comprehensive health checks
perform_health_checks() {
    log INFO "Performing comprehensive health checks..."
    
    local failed_checks=0
    
    # Application health check
    if curl -f http://localhost:3000/api/health &> /dev/null; then
        log SUCCESS "✅ Application health check passed"
    else
        log ERROR "❌ Application health check failed"
        failed_checks=$((failed_checks + 1))
    fi
    
    # Database connectivity
    if docker exec crypto-ai-postgres-staging pg_isready -U postgres &> /dev/null; then
        log SUCCESS "✅ Database connectivity check passed"
    else
        log ERROR "❌ Database connectivity check failed"
        failed_checks=$((failed_checks + 1))
    fi
    
    # Redis connectivity
    if docker exec crypto-ai-redis-staging redis-cli ping | grep -q "PONG"; then
        log SUCCESS "✅ Redis connectivity check passed"
    else
        log ERROR "❌ Redis connectivity check failed"
        failed_checks=$((failed_checks + 1))
    fi
    
    # Prometheus health
    if curl -f http://localhost:9090/-/healthy &> /dev/null; then
        log SUCCESS "✅ Prometheus health check passed"
    else
        log ERROR "❌ Prometheus health check failed"
        failed_checks=$((failed_checks + 1))
    fi
    
    # Grafana health
    if curl -f http://localhost:3001/api/health &> /dev/null; then
        log SUCCESS "✅ Grafana health check passed"
    else
        log ERROR "❌ Grafana health check failed"
        failed_checks=$((failed_checks + 1))
    fi
    
    # Nginx health
    if curl -f http://localhost:8080/nginx-health &> /dev/null; then
        log SUCCESS "✅ Nginx health check passed"
    else
        log ERROR "❌ Nginx health check failed"
        failed_checks=$((failed_checks + 1))
    fi
    
    if [[ $failed_checks -eq 0 ]]; then
        log SUCCESS "All health checks passed! 🎉"
        return 0
    else
        log ERROR "$failed_checks health check(s) failed"
        return 1
    fi
}

# Display service information
show_service_info() {
    log INFO "Service Information:"
    
    cat << EOF

🌐 Application Services:
   • Main Application:    http://localhost:3000
   • API Health Check:    http://localhost:3000/api/health
   • API Metrics:         http://localhost:3000/api/metrics

📊 Monitoring Dashboard:
   • Grafana:            http://localhost:3001 (admin/admin123_staging)
   • Prometheus:         http://localhost:9090
   • Alertmanager:       http://localhost:9093

🔧 Infrastructure:
   • Nginx Status:       http://localhost:8080/nginx-status
   • Nginx Health:       http://localhost:8080/nginx-health

📈 Metric Exporters:
   • Node Exporter:      http://localhost:9100/metrics
   • Postgres Exporter:  http://localhost:9187/metrics
   • Redis Exporter:     http://localhost:9121/metrics

💾 Direct Database Access:
   • PostgreSQL:         localhost:5433 (postgres/staging_password_secure_123)
   • Redis:              localhost:6380

📋 Management Commands:
   • View Logs:          docker-compose -f docker-compose.staging.yml logs -f [service]
   • Scale App:          docker-compose -f docker-compose.staging.yml up -d --scale app-staging=3
   • Stop Services:      docker-compose -f docker-compose.staging.yml down
   • Restart Service:    docker-compose -f docker-compose.staging.yml restart [service]

EOF
}

# Performance monitoring
start_performance_monitoring() {
    log INFO "Starting performance monitoring..."
    
    # Create monitoring script
    cat > "$PROJECT_DIR/scripts/monitor-performance.sh" << 'EOF'
#!/bin/bash
# Real-time performance monitoring

while true; do
    echo "========== $(date) =========="
    echo "🐳 Container Status:"
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"
    
    echo -e "\n💾 System Resources:"
    echo "Memory: $(free -h | grep '^Mem:' | awk '{print $3 "/" $2 " (" $3/$2*100 "%)"})"
    echo "Disk: $(df -h / | tail -1 | awk '{print $3 "/" $2 " (" $5 ")"}')"
    echo "Load: $(uptime | awk -F'load average:' '{print $2}')"
    
    echo -e "\n🌐 Application Health:"
    curl -s http://localhost:3000/api/health | jq -r '.status // "Error"' 2>/dev/null || echo "Health check failed"
    
    echo "================================"
    sleep 30
done
EOF
    
    chmod +x "$PROJECT_DIR/scripts/monitor-performance.sh"
    log SUCCESS "Performance monitoring script created at scripts/monitor-performance.sh"
    log INFO "Run './scripts/monitor-performance.sh' for real-time monitoring"
}

# Main execution
main() {
    local start_time=$(date +%s)
    
    print_banner
    log INFO "Starting Crypto AI Platform staging environment..."
    
    # Parse arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --clean)
                CLEAN=true
                shift
                ;;
            --no-health-check)
                SKIP_HEALTH_CHECK=true
                shift
                ;;
            --help)
                cat << EOF
Usage: $0 [OPTIONS]

Options:
    --clean              Perform deep cleanup before starting
    --no-health-check    Skip health checks after startup
    --help               Show this help message

Environment Variables:
    LOG_LEVEL           Set logging level (INFO, WARN, ERROR, DEBUG)
    COMPOSE_FILE        Override compose file path

Examples:
    $0                   # Start with default settings
    $0 --clean           # Clean start
    $0 --no-health-check # Quick start without health checks

EOF
                exit 0
                ;;
            *)
                log ERROR "Unknown option: $1"
                log INFO "Use --help for usage information"
                exit 1
                ;;
        esac
    done
    
    # Execute startup sequence
    check_system_requirements
    prepare_environment
    cleanup_previous_containers
    start_services
    
    # Perform health checks unless skipped
    if [[ "${SKIP_HEALTH_CHECK:-false}" != "true" ]]; then
        sleep 10  # Give services time to stabilize
        perform_health_checks
    fi
    
    start_performance_monitoring
    show_service_info
    
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    
    log SUCCESS "🎉 Staging environment started successfully in ${duration} seconds!"
    log INFO "Logs are available at: $LOG_FILE"
    log INFO "Use 'docker-compose -f $COMPOSE_FILE logs -f' to view live logs"
}

# Trap signals for graceful shutdown
trap 'log ERROR "Startup interrupted"; exit 1' INT TERM

# Run main function with all arguments
main "$@"