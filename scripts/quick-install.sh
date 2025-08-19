#!/bin/bash

# 🚀 Quick Install Script for Crypto AI Platform
# WSL2 Optimized

set -e

echo "🔄 Starting quick dependency installation..."

# Clean install
rm -rf node_modules package-lock.json 2>/dev/null || true
npm cache clean --force

# Apply WSL2 optimizations
npm config set fetch-retries 5
npm config set maxsockets 2

# Install all dependencies
echo "📦 Installing all dependencies..."
npm install --verbose

echo "✅ Installation completed!"
echo "🚀 Run 'npm run dev' to start development server"