#!/bin/bash

# Development startup script
echo "🚀 Starting Ringo Solutions development environment..."

# Build and start development container
docker-compose --profile dev up --build

echo "✅ Development server is running at http://localhost:5173"