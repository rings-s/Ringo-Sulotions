# Ringo Solutions - Docker Deployment Guide

This guide covers deploying Ringo Solutions using Docker for better reliability and consistency.

## 🚀 Quick Start

### Option 1: Using Docker Compose (Recommended)

```bash
# Development
./scripts/dev.sh
# or
docker-compose --profile dev up --build

# Production
./scripts/prod.sh
# or
docker-compose --profile prod up -d --build
```

### Option 2: Using Docker directly

```bash
# Build and run production container
./scripts/deploy.sh
# or manually:
docker build --target production -t ringo-solutions:latest .
docker run -d --name ringo-solutions -p 3000:3000 ringo-solutions:latest
```

## 📁 Project Structure

```
├── Dockerfile              # Multi-stage Docker build
├── docker-compose.yml      # Development and production services
├── nginx.conf              # Nginx reverse proxy configuration
├── scripts/
│   ├── dev.sh              # Development startup script
│   ├── prod.sh             # Production deployment script
│   └── deploy.sh           # Single container deployment
└── .dockerignore           # Docker build context exclusions
```

## 🛠 Configuration

### Environment Variables

- `NODE_ENV`: Set to 'production' for production builds
- `PORT`: Server port (default: 3000)

### Docker Services

#### Development (`ringo-dev`)
- Hot reload enabled
- Source code mounted as volume
- Runs on port 5173

#### Production (`ringo-prod`)
- Optimized production build
- Runs on port 3000
- Non-root user for security
- Health checks enabled

#### Nginx (`nginx`)
- Reverse proxy
- Static file caching
- Security headers
- Rate limiting
- Runs on ports 80/443

## 🔧 Commands

### Development
```bash
# Start development server
npm run dev

# Start with Docker
docker-compose --profile dev up
```

### Production
```bash
# Build production version
npm run build

# Start production server locally
node build/index.js

# Deploy with Docker
docker-compose --profile prod up -d
```

### Docker Management
```bash
# Build image
docker build -t ringo-solutions .

# Run container
docker run -p 3000:3000 ringo-solutions

# View logs
docker logs ringo-solutions

# Stop container
docker stop ringo-solutions

# Remove container
docker rm ringo-solutions
```

## 🚀 Deployment Options

### 1. VPS/Dedicated Server
```bash
git clone <repository>
cd ringo-solutions
./scripts/prod.sh
```

### 2. Cloud Platforms

#### DigitalOcean App Platform
- Use the Dockerfile for container deployment
- Set environment variables in the dashboard

#### AWS ECS/Fargate
- Build and push to ECR
- Use the provided task definition template

#### Google Cloud Run
```bash
gcloud builds submit --tag gcr.io/PROJECT-ID/ringo-solutions
gcloud run deploy --image gcr.io/PROJECT-ID/ringo-solutions --platform managed
```

#### Azure Container Instances
```bash
az acr build --registry myregistry --image ringo-solutions .
az container create --resource-group myResourceGroup --name ringo-solutions --image myregistry.azurecr.io/ringo-solutions:latest
```

### 3. Kubernetes
Use the provided Kubernetes manifests in the `k8s/` directory:
```bash
kubectl apply -f k8s/
```

## 🔒 Security Features

- Non-root container user
- Security headers via Nginx
- Rate limiting
- Health checks
- Minimal attack surface (Alpine Linux)

## 📊 Monitoring

### Health Checks
- Built-in HTTP health endpoint
- Docker health checks configured
- Ready for external monitoring systems

### Logs
```bash
# View application logs
docker logs ringo-solutions

# Follow logs
docker logs -f ringo-solutions

# With docker-compose
docker-compose logs -f ringo-prod
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Check what's using the port
   lsof -i :3000
   # or use a different port
   PORT=3001 node build/index.js
   ```

2. **Build failures**
   ```bash
   # Clear Docker cache
   docker builder prune -a
   # Rebuild without cache
   docker build --no-cache -t ringo-solutions .
   ```

3. **Permission issues**
   - Ensure Docker is running
   - Add user to docker group: `sudo usermod -aG docker $USER`

### Performance Optimization

- Use nginx for static file serving
- Enable gzip compression (configured in nginx.conf)
- Set appropriate cache headers
- Use CDN for static assets

## 📈 Scaling

### Horizontal Scaling
```bash
# Scale with docker-compose
docker-compose --profile prod up -d --scale ringo-prod=3

# Load balance with nginx upstream
# (See nginx.conf for configuration)
```

### Resource Limits
```yaml
# In docker-compose.yml
services:
  ringo-prod:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
```

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build and deploy
        run: |
          docker build -t ringo-solutions .
          docker run -d --name ringo-solutions -p 3000:3000 ringo-solutions
```

## 📞 Support

For deployment issues or questions:
- Email: junni9619@gmail.com
- Check the logs: `docker logs ringo-solutions`
- Review health status: `docker inspect ringo-solutions`