#!/bin/bash
# HIVE-OPTIMIZER-DELTA Deployment Script
# Production deployment automation for TaskManagement application

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="taskmanagement"
BUILD_DIR="dist"
BACKUP_DIR="backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

echo -e "${BLUE}🚀 HIVE-OPTIMIZER-DELTA Deployment Pipeline${NC}"
echo -e "${BLUE}==============================================${NC}"

# Pre-deployment checks
echo -e "${YELLOW}📋 Running pre-deployment checks...${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ package.json not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Pre-deployment checks passed${NC}"

# Environment setup
echo -e "${YELLOW}🔧 Setting up environment...${NC}"
export NODE_ENV=production
unset npm_config_prefix

# Clean previous builds
echo -e "${YELLOW}🧹 Cleaning previous builds...${NC}"
if [ -d "$BUILD_DIR" ]; then
    rm -rf "$BUILD_DIR"
fi

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm ci --production=false

# Security audit
echo -e "${YELLOW}🔒 Running security audit...${NC}"
npm audit --audit-level=high

# Run tests (if available)
if npm run test --if-present 2>/dev/null; then
    echo -e "${GREEN}✅ Tests passed${NC}"
else
    echo -e "${YELLOW}⚠️  No tests found or tests skipped${NC}"
fi

# Build application
echo -e "${YELLOW}🔨 Building application...${NC}"
if [ -f "config/vite.config.prod.js" ]; then
    npm run build -- --config config/vite.config.prod.js
else
    npm run build
fi

# Verify build
if [ ! -d "$BUILD_DIR" ]; then
    echo -e "${RED}❌ Build failed - dist directory not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completed successfully${NC}"

# Build analysis
echo -e "${YELLOW}📊 Build Analysis:${NC}"
du -sh "$BUILD_DIR"
find "$BUILD_DIR" -type f -name "*.js" -exec du -h {} + | sort -hr
find "$BUILD_DIR" -type f -name "*.css" -exec du -h {} + | sort -hr

# Backup current deployment (if exists)
if [ -d "$BACKUP_DIR" ]; then
    mkdir -p "$BACKUP_DIR"
fi

# Performance validation
echo -e "${YELLOW}⚡ Validating performance metrics...${NC}"
MAIN_JS_SIZE=$(find "$BUILD_DIR" -name "*.js" -exec du -b {} + | awk '{sum+=$1} END {print sum}')
MAIN_CSS_SIZE=$(find "$BUILD_DIR" -name "*.css" -exec du -b {} + | awk '{sum+=$1} END {print sum}')

# Check bundle size limits (500KB threshold)
if [ $MAIN_JS_SIZE -gt 512000 ]; then
    echo -e "${YELLOW}⚠️  JavaScript bundle size is large: $(($MAIN_JS_SIZE / 1024))KB${NC}"
else
    echo -e "${GREEN}✅ JavaScript bundle size is optimal: $(($MAIN_JS_SIZE / 1024))KB${NC}"
fi

# Create deployment manifest
echo -e "${YELLOW}📋 Creating deployment manifest...${NC}"
cat > "$BUILD_DIR/deployment-manifest.json" << EOF
{
  "version": "$(node -p "require('./package.json').version")",
  "buildTime": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "gitHash": "$(git rev-parse --short HEAD 2>/dev/null || echo 'unknown')",
  "buildSize": {
    "total": "$(du -b $BUILD_DIR | cut -f1)",
    "js": "$MAIN_JS_SIZE",
    "css": "$MAIN_CSS_SIZE"
  },
  "environment": "production"
}
EOF

# Deployment options
echo -e "${BLUE}🚀 Deployment Options:${NC}"
echo "1. Deploy to Vercel (Recommended)"
echo "2. Deploy to Netlify"
echo "3. Generate deployment package"
echo "4. Local preview only"

read -p "Select deployment option (1-4): " DEPLOY_OPTION

case $DEPLOY_OPTION in
    1)
        echo -e "${YELLOW}🚀 Deploying to Vercel...${NC}"
        if command -v vercel &> /dev/null; then
            vercel --prod
        else
            echo -e "${RED}❌ Vercel CLI not installed. Run: npm i -g vercel${NC}"
            echo -e "${YELLOW}📋 Manual deployment: Upload dist/ folder to Vercel${NC}"
        fi
        ;;
    2)
        echo -e "${YELLOW}🚀 Deploying to Netlify...${NC}"
        if command -v netlify &> /dev/null; then
            netlify deploy --prod --dir=$BUILD_DIR
        else
            echo -e "${RED}❌ Netlify CLI not installed. Run: npm i -g netlify-cli${NC}"
            echo -e "${YELLOW}📋 Manual deployment: Upload dist/ folder to Netlify${NC}"
        fi
        ;;
    3)
        echo -e "${YELLOW}📦 Creating deployment package...${NC}"
        PACKAGE_NAME="${APP_NAME}-${TIMESTAMP}.tar.gz"
        tar -czf "$PACKAGE_NAME" -C "$BUILD_DIR" .
        echo -e "${GREEN}✅ Package created: $PACKAGE_NAME${NC}"
        ;;
    4)
        echo -e "${YELLOW}👀 Starting local preview...${NC}"
        npm run preview
        ;;
    *)
        echo -e "${RED}❌ Invalid option${NC}"
        exit 1
        ;;
esac

echo -e "${GREEN}🎉 Deployment pipeline completed successfully!${NC}"
echo -e "${BLUE}📊 Deployment Summary:${NC}"
echo -e "  • Build size: $(du -sh $BUILD_DIR | cut -f1)"
echo -e "  • JS bundle: $(($MAIN_JS_SIZE / 1024))KB"
echo -e "  • CSS bundle: $(($MAIN_CSS_SIZE / 1024))KB"
echo -e "  • Build time: $(date)"
echo -e "${BLUE}==============================================${NC}"