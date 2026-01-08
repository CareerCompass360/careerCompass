#!/bin/bash

echo "🧪 Career Compass - System Verification"
echo "========================================"
echo ""

# Check Node.js
echo "📦 Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js installed: $NODE_VERSION"
else
    echo "❌ Node.js not found!"
    exit 1
fi

echo ""

# Check npm
echo "📦 Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✅ npm installed: $NPM_VERSION"
else
    echo "❌ npm not found!"
    exit 1
fi

echo ""

# Check .env file
echo "🔑 Checking environment variables..."
if [ -f .env ]; then
    echo "✅ .env file exists"
    
    if grep -q "DATABASE_URL" .env; then
        echo "✅ DATABASE_URL configured"
    else
        echo "❌ DATABASE_URL missing in .env"
    fi
    
    if grep -q "NEXT_PUBLIC_STACK_PROJECT_ID" .env; then
        echo "✅ Stack Auth keys configured"
    else
        echo "❌ Stack Auth keys missing in .env"
    fi
else
    echo "❌ .env file not found!"
fi

echo ""

# Check node_modules
echo "📚 Checking dependencies..."
if [ -d node_modules ]; then
    echo "✅ node_modules exists"
else
    echo "⚠️  node_modules not found. Run: npm install"
fi

echo ""

# Check Prisma Client
echo "🗄️  Checking Prisma Client..."
if [ -d src/generated/prisma ]; then
    echo "✅ Prisma Client generated"
else
    echo "⚠️  Prisma Client not found. Run: npx prisma generate"
fi

echo ""

# Check migrations
echo "🔄 Checking database migrations..."
if [ -d prisma/migrations ]; then
    MIGRATION_COUNT=$(ls -1 prisma/migrations | wc -l)
    echo "✅ $MIGRATION_COUNT migration(s) found"
else
    echo "⚠️  No migrations found. Run: npx prisma migrate dev"
fi

echo ""

# Test database connection
echo "🔌 Testing database connection..."
if npx prisma db pull --preview-feature 2>/dev/null; then
    echo "✅ Database connection successful"
else
    echo "⚠️  Could not connect to database"
fi

echo ""
echo "========================================"
echo "✨ Verification complete!"
echo ""
echo "To start the app:"
echo "  npm run dev"
echo ""
echo "To view database:"
echo "  npx prisma studio"
