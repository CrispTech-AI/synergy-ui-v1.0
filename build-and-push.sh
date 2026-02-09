#!/bin/bash

# =============================================================================
# Synergy UI - Build and Push to GitHub Container Registry
# =============================================================================

set -e

# Configuration
REGISTRY="ghcr.io"
IMAGE_NAME="crisptech-ai/synergy-ui"
TAG="main"

echo "🔨 Building Synergy UI Docker image..."
echo "=================================="

# Check if we're in the right directory
if [ ! -f "Dockerfile" ]; then
    echo "❌ Dockerfile not found. Make sure you're in the synergy-ui-v1.0 directory."
    exit 1
fi

# Check if logged in to GitHub Container Registry
if ! docker info | grep -q "Username: ${GITHUB_USER:-$USER}"; then
    echo "🔐 Logging in to GitHub Container Registry..."
    echo "You'll need a GitHub Personal Access Token with 'write:packages' scope"
    echo "Create one at: https://github.com/settings/tokens"
    echo ""
    read -p "Enter your GitHub username: " GITHUB_USERNAME
    read -s -p "Enter your GitHub Personal Access Token: " GITHUB_TOKEN
    echo ""
    
    echo $GITHUB_TOKEN | docker login $REGISTRY -u $GITHUB_USERNAME --password-stdin
fi

# Build the Docker image
echo "🏗️  Building Docker image..."
docker build \
    --platform linux/amd64,linux/arm64 \
    --tag $REGISTRY/$IMAGE_NAME:$TAG \
    --tag $REGISTRY/$IMAGE_NAME:latest \
    --build-arg BUILD_HASH=$(git rev-parse --short HEAD) \
    --build-arg USE_CUDA=false \
    --build-arg USE_OLLAMA=false \
    --build-arg USE_SLIM=false \
    .

# Push the image
echo "📤 Pushing Docker image to GitHub Container Registry..."
docker push $REGISTRY/$IMAGE_NAME:$TAG
docker push $REGISTRY/$IMAGE_NAME:latest

echo ""
echo "✅ Successfully pushed Synergy UI to GitHub Container Registry!"
echo "Image: $REGISTRY/$IMAGE_NAME:$TAG"
echo ""
echo "You can now use this image in your docker-compose.yml:"
echo "image: $REGISTRY/$IMAGE_NAME:$TAG"
echo ""
echo "To test locally:"
echo "docker run -p 3000:8080 $REGISTRY/$IMAGE_NAME:$TAG"
