#!/bin/bash

# Full deployment script with health checks
echo "🚀 Deploying Ringo Solutions..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Build the application
echo "📦 Building application..."
docker build --target production -t ringo-solutions:latest .

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

# Check if port 3001 is available, otherwise use 3002
PORT=3001
if netstat -tlnp | grep -q ":${PORT}"; then
    PORT=3002
fi

# Run production container
echo "🌐 Starting production container on port ${PORT}..."
docker run -d \
    --name ringo-solutions \
    --restart unless-stopped \
    -p ${PORT}:3000 \
    -e PORT=3000 \
    ringo-solutions:latest

# Wait for container to start
echo "⏳ Waiting for application to start..."
sleep 5

# Check if container is running
if docker ps | grep -q "ringo-solutions"; then
    echo "✅ Application is running!"
    echo "🌐 Access your application at: http://localhost:${PORT}"
    echo "📊 Check logs with: docker logs ringo-solutions"
    echo "🛑 Stop with: docker stop ringo-solutions"
    exit 0
else
    echo "❌ Application failed to start"
    echo "📊 Container logs:"
    docker logs ringo-solutions
    exit 1
fi