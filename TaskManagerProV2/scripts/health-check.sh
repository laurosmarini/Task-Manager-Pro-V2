#!/bin/bash
# HIVE-OPTIMIZER-DELTA Health Check Script
# Post-deployment verification and monitoring

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
URL=${1:-"http://localhost:4173"}  # Default to preview server
TIMEOUT=10
RETRIES=3

echo -e "${BLUE}🏥 HIVE-OPTIMIZER-DELTA Health Check${NC}"
echo -e "${BLUE}====================================${NC}"

# Function to check URL accessibility
check_url() {
    local url=$1
    local description=$2
    
    echo -e "${YELLOW}🔍 Checking $description...${NC}"
    
    for i in $(seq 1 $RETRIES); do
        if curl -sS --max-time $TIMEOUT -o /dev/null -w "%{http_code}" "$url" | grep -q "200"; then
            echo -e "${GREEN}✅ $description is accessible${NC}"
            return 0
        else
            echo -e "${YELLOW}⚠️  Attempt $i failed, retrying...${NC}"
            sleep 2
        fi
    done
    
    echo -e "${RED}❌ $description is not accessible${NC}"
    return 1
}

# Function to check performance metrics
check_performance() {
    local url=$1
    
    echo -e "${YELLOW}⚡ Checking performance metrics...${NC}"
    
    # Check if lighthouse CLI is available
    if command -v lighthouse &> /dev/null; then
        echo -e "${YELLOW}🔍 Running Lighthouse audit...${NC}"
        lighthouse "$url" --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=/tmp/lighthouse-report.json --chrome-flags="--headless" --quiet
        
        if [ -f "/tmp/lighthouse-report.json" ]; then
            PERFORMANCE=$(node -p "Math.round(JSON.parse(require('fs').readFileSync('/tmp/lighthouse-report.json', 'utf8')).categories.performance.score * 100)")
            ACCESSIBILITY=$(node -p "Math.round(JSON.parse(require('fs').readFileSync('/tmp/lighthouse-report.json', 'utf8')).categories.accessibility.score * 100)")
            BEST_PRACTICES=$(node -p "Math.round(JSON.parse(require('fs').readFileSync('/tmp/lighthouse-report.json', 'utf8')).categories['best-practices'].score * 100)")
            SEO=$(node -p "Math.round(JSON.parse(require('fs').readFileSync('/tmp/lighthouse-report.json', 'utf8')).categories.seo.score * 100)")
            
            echo -e "${BLUE}📊 Lighthouse Scores:${NC}"
            echo -e "  • Performance: ${PERFORMANCE}/100"
            echo -e "  • Accessibility: ${ACCESSIBILITY}/100"
            echo -e "  • Best Practices: ${BEST_PRACTICES}/100"
            echo -e "  • SEO: ${SEO}/100"
            
            # Check if scores meet targets
            if [ $PERFORMANCE -ge 90 ] && [ $ACCESSIBILITY -ge 90 ] && [ $BEST_PRACTICES -ge 90 ] && [ $SEO -ge 90 ]; then
                echo -e "${GREEN}✅ Performance targets met${NC}"
            else
                echo -e "${YELLOW}⚠️  Some performance targets not met${NC}"
            fi
            
            rm -f /tmp/lighthouse-report.json
        fi
    else
        echo -e "${YELLOW}⚠️  Lighthouse not available, skipping performance audit${NC}"
        
        # Basic performance check with curl
        LOAD_TIME=$(curl -o /dev/null -s -w "%{time_total}" "$url")
        echo -e "${BLUE}📊 Basic Performance:${NC}"
        echo -e "  • Page load time: ${LOAD_TIME}s"
        
        if (( $(echo "$LOAD_TIME < 2.0" | bc -l) )); then
            echo -e "${GREEN}✅ Load time is acceptable${NC}"
        else
            echo -e "${YELLOW}⚠️  Load time is slow${NC}"
        fi
    fi
}

# Function to check security headers
check_security() {
    local url=$1
    
    echo -e "${YELLOW}🔒 Checking security headers...${NC}"
    
    HEADERS=$(curl -sI "$url")
    
    # Check for important security headers
    if echo "$HEADERS" | grep -qi "x-content-type-options"; then
        echo -e "${GREEN}✅ X-Content-Type-Options header present${NC}"
    else
        echo -e "${RED}❌ X-Content-Type-Options header missing${NC}"
    fi
    
    if echo "$HEADERS" | grep -qi "x-frame-options"; then
        echo -e "${GREEN}✅ X-Frame-Options header present${NC}"
    else
        echo -e "${RED}❌ X-Frame-Options header missing${NC}"
    fi
    
    if echo "$HEADERS" | grep -qi "content-security-policy"; then
        echo -e "${GREEN}✅ Content-Security-Policy header present${NC}"
    else
        echo -e "${YELLOW}⚠️  Content-Security-Policy header missing${NC}"
    fi
    
    if echo "$HEADERS" | grep -qi "strict-transport-security"; then
        echo -e "${GREEN}✅ HSTS header present${NC}"
    else
        echo -e "${YELLOW}⚠️  HSTS header missing (may be added by hosting platform)${NC}"
    fi
}

# Function to check application routes
check_routes() {
    local base_url=$1
    
    echo -e "${YELLOW}🛣️  Checking application routes...${NC}"
    
    routes=("/" "/tasks" "/notes" "/settings")
    
    for route in "${routes[@]}"; do
        if check_url "$base_url$route" "Route: $route"; then
            continue
        else
            echo -e "${RED}❌ Route $route failed${NC}"
            return 1
        fi
    done
    
    echo -e "${GREEN}✅ All routes are accessible${NC}"
}

# Function to check static assets
check_assets() {
    local base_url=$1
    
    echo -e "${YELLOW}📦 Checking static assets...${NC}"
    
    # Get the main page and extract asset URLs
    MAIN_PAGE=$(curl -sS "$base_url")
    
    # Extract CSS and JS files
    CSS_FILES=$(echo "$MAIN_PAGE" | grep -oP '(?<=href=")[^"]*\.css' | head -5)
    JS_FILES=$(echo "$MAIN_PAGE" | grep -oP '(?<=src=")[^"]*\.js' | head -5)
    
    # Check CSS files
    for css in $CSS_FILES; do
        if [[ $css == /* ]]; then
            css_url="$base_url$css"
        else
            css_url="$css"
        fi
        
        if curl -sS --max-time $TIMEOUT -o /dev/null "$css_url"; then
            echo -e "${GREEN}✅ CSS asset accessible: $(basename $css)${NC}"
        else
            echo -e "${RED}❌ CSS asset failed: $(basename $css)${NC}"
        fi
    done
    
    # Check JS files
    for js in $JS_FILES; do
        if [[ $js == /* ]]; then
            js_url="$base_url$js"
        else
            js_url="$js"
        fi
        
        if curl -sS --max-time $TIMEOUT -o /dev/null "$js_url"; then
            echo -e "${GREEN}✅ JS asset accessible: $(basename $js)${NC}"
        else
            echo -e "${RED}❌ JS asset failed: $(basename $js)${NC}"
        fi
    done
}

# Main health check execution
echo -e "${BLUE}🎯 Target URL: $URL${NC}"
echo ""

# Basic connectivity check
if ! check_url "$URL" "Main application"; then
    echo -e "${RED}💥 Basic connectivity failed. Exiting.${NC}"
    exit 1
fi

# Route checks
check_routes "$URL"

# Asset checks
check_assets "$URL"

# Security checks
check_security "$URL"

# Performance checks
check_performance "$URL"

# Summary
echo ""
echo -e "${BLUE}📋 Health Check Summary${NC}"
echo -e "${BLUE}========================${NC}"
echo -e "${GREEN}✅ Health check completed${NC}"
echo -e "${BLUE}🕐 Check time: $(date)${NC}"

# Exit with success
exit 0