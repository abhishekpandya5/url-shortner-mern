#!/bin/bash

# URL Shortener Deployment Script

echo "🚀 Starting URL Shortener deployment..."

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
    echo "❌ .env.production file not found!"
    echo "Please create .env.production with your production environment variables."
    echo "See DEPLOYMENT.md for details."
    exit 1
fi

# Build and deploy with Docker Compose
echo "📦 Building and starting containers..."
docker-compose --env-file .env.production up --build -d

# Check if containers are running
echo "🔍 Checking container status..."
docker-compose ps

echo "✅ Deployment complete!"
echo ""
echo "🌐 Your application should be available at:"
echo "   Frontend: http://localhost (or your configured domain)"
echo "   Backend:  http://localhost:5000 (or your configured domain)"
echo ""
echo "📋 To view logs: docker-compose logs -f"
echo "🛑 To stop: docker-compose down"
