#!/bin/bash
# =============================================================================
# 🚀 MINIMAL STAGING ENVIRONMENT STARTUP
# =============================================================================

set -e

echo "🐳 Starting Docker services..."
docker-compose -f docker-compose.simple.yml up -d postgres-staging redis-staging

echo "⏳ Waiting for services to be healthy..."
sleep 10

echo "📊 Checking service status..."
docker-compose -f docker-compose.simple.yml ps

echo "🔄 Starting Next.js application..."
npm run dev &
APP_PID=$!

echo "⏳ Waiting for application to start..."
sleep 15

echo "🏥 Testing health endpoint..."
for i in {1..5}; do
    if curl -f http://localhost:3000/api/health >/dev/null 2>&1; then
        echo "✅ Application is healthy!"
        break
    fi
    echo "⏳ Waiting... (attempt $i/5)"
    sleep 5
done

echo ""
echo "🌐 Application Services:"
echo "   • Main Application:    http://localhost:3000"
echo "   • API Health Check:    http://localhost:3000/api/health"
echo "   • API Metrics:         http://localhost:3000/api/metrics"
echo ""
echo "💾 Direct Database Access:"
echo "   • PostgreSQL:         localhost:5433 (postgres/staging_password_secure_123)"
echo "   • Redis:              localhost:6380"
echo ""
echo "📋 Management Commands:"
echo "   • Stop Application:   kill $APP_PID"
echo "   • Stop Docker:        docker-compose -f docker-compose.simple.yml down"
echo ""

# Keep the script running
wait $APP_PID