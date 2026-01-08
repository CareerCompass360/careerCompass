#!/bin/bash

echo "🚀 Career Compass - Quick Setup Script"
echo "======================================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  No .env file found!"
    echo "📝 Creating .env from .env.example..."
    cp .env.example .env
    echo "✅ .env file created!"
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env and add your:"
    echo "   - NeonDB DATABASE_URL"
    echo "   - Stack Auth API keys"
    echo ""
    echo "Press Enter after you've updated .env file..."
    read
else
    echo "✅ .env file found!"
fi

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔨 Generating Prisma Client..."
npx prisma generate

echo ""
echo "🗄️  Running database migrations..."
npx prisma migrate dev --name init

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎉 You can now run: npm run dev"
echo ""
echo "📚 For detailed instructions, see SETUP.md"
