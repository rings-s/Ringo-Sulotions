#!/bin/bash

# Production deployment script
echo "🚀 Starting Ringo Solutions production environment..."

# Build production images
echo "📦 Building production images..."
docker-compose --profile prod build

# Start production services
echo "🌐 Starting production services..."
docker-compose --profile prod up -d

echo "✅ Production server is running!"
echo "🌐 Access via Nginx: http://localhost:8080"
echo "🔗 Direct app access: http://localhost:3001"
echo "📊 View logs with: docker-compose logs -f"
echo "🛑 Stop with: docker-compose --profile prod down"