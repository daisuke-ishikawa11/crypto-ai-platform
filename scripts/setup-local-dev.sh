#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Check if required tools are installed
check_requirements() {
    print_status "Checking requirements..."
    
    local requirements=(
        "node:Node.js"
        "npm:NPM"
        "docker:Docker"
        "docker-compose:Docker Compose"
        "git:Git"
    )
    
    for requirement in "${requirements[@]}"; do
        local cmd="${requirement%%:*}"
        local name="${requirement##*:}"
        
        if ! command -v "$cmd" &> /dev/null; then
            print_error "$name is not installed. Please install it and try again."
            exit 1
        fi
    done
    
    print_success "All requirements satisfied"
}

# Setup environment variables
setup_environment() {
    print_status "Setting up environment variables..."
    
    if [ ! -f ".env.local" ]; then
        if [ -f "env.example" ]; then
            cp env.example .env.local
            print_success "Created .env.local from env.example"
            print_warning "Please update .env.local with your actual values"
        else
            print_error "env.example file not found"
            exit 1
        fi
    else
        print_warning ".env.local already exists"
    fi
}

# Install dependencies
install_dependencies() {
    print_status "Installing Node.js dependencies..."
    
    if [ -f "package-lock.json" ]; then
        npm ci
    else
        npm install
    fi
    
    print_success "Dependencies installed"
}

# Setup database
setup_database() {
    print_status "Setting up development database..."
    
    # Start PostgreSQL container
    docker-compose -f docker-compose.dev.yml up -d postgres-dev
    
    # Wait for PostgreSQL to be ready
    print_status "Waiting for PostgreSQL to be ready..."
    timeout=60
    while ! docker-compose -f docker-compose.dev.yml exec -T postgres-dev pg_isready -U postgres > /dev/null 2>&1; do
        sleep 1
        timeout=$((timeout - 1))
        if [ $timeout -eq 0 ]; then
            print_error "PostgreSQL did not start within 60 seconds"
            exit 1
        fi
    done
    
    print_success "PostgreSQL is ready"
    
    # Run migrations
    if command -v supabase &> /dev/null; then
        print_status "Running Supabase migrations..."
        supabase db push --db-url postgresql://postgres:development123@localhost:5432/crypto_ai_platform_dev
        print_success "Migrations completed"
    else
        print_warning "Supabase CLI not found, skipping migrations"
    fi
}

# Setup Redis
setup_redis() {
    print_status "Starting Redis..."
    
    docker-compose -f docker-compose.dev.yml up -d redis-dev
    
    # Wait for Redis to be ready
    timeout=30
    while ! docker-compose -f docker-compose.dev.yml exec -T redis-dev redis-cli ping > /dev/null 2>&1; do
        sleep 1
        timeout=$((timeout - 1))
        if [ $timeout -eq 0 ]; then
            print_error "Redis did not start within 30 seconds"
            exit 1
        fi
    done
    
    print_success "Redis is ready"
}

# Seed database
seed_database() {
    print_status "Seeding database with sample data..."
    
    if [ -f "scripts/seed-database.ts" ]; then
        npm run db:seed
        print_success "Database seeded"
    else
        print_warning "Seed script not found, skipping database seeding"
    fi
}

# Run tests
run_tests() {
    print_status "Running tests to verify setup..."
    
    # Run unit tests
    npm run test:unit -- --passWithNoTests
    
    print_success "Tests passed"
}

# Start development server
start_dev_server() {
    print_status "Starting development server..."
    
    print_success "Development environment is ready!"
    echo ""
    echo "Available services:"
    echo "  - Application: http://localhost:3000"
    echo "  - Database: postgresql://postgres:development123@localhost:5432/crypto_ai_platform_dev"
    echo "  - Redis: redis://localhost:6379"
    echo "  - PgAdmin: http://localhost:5050 (admin@crypto-ai-platform.com / admin123)"
    echo "  - MailHog: http://localhost:8025"
    echo ""
    echo "To start the development server:"
    echo "  npm run dev"
    echo ""
    echo "To stop all services:"
    echo "  docker-compose -f docker-compose.dev.yml down"
}

# Main setup function
main() {
    echo "============================================="
    echo "  Crypto AI Platform - Development Setup"
    echo "============================================="
    echo ""
    
    check_requirements
    setup_environment
    install_dependencies
    setup_database
    setup_redis
    seed_database
    run_tests
    start_dev_server
}

# Handle script arguments
case "${1:-}" in
    --help|-h)
        echo "Usage: $0 [OPTIONS]"
        echo ""
        echo "Options:"
        echo "  --help, -h     Show this help message"
        echo "  --skip-deps    Skip dependency installation"
        echo "  --skip-db      Skip database setup"
        echo "  --skip-tests   Skip running tests"
        echo ""
        exit 0
        ;;
    --skip-deps)
        SKIP_DEPS=true
        ;;
    --skip-db)
        SKIP_DB=true
        ;;
    --skip-tests)
        SKIP_TESTS=true
        ;;
esac

# Trap cleanup function
cleanup() {
    print_status "Cleaning up..."
    docker-compose -f docker-compose.dev.yml down > /dev/null 2>&1 || true
}

trap cleanup EXIT

# Run main function
main

exit 0