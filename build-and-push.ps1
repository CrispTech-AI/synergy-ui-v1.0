# =============================================================================
# Synergy UI - Build and Push to GitHub Container Registry (PowerShell)
# =============================================================================

param(
    [string]$Registry = "ghcr.io",
    [string]$ImageName = "crisptech-ai/synergy-ui",
    [string]$Tag = "main",
    [switch]$Force
)

Write-Host "🔨 Building Synergy UI Docker image..." -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "Dockerfile")) {
    Write-Host "❌ Dockerfile not found. Make sure you're in the synergy-ui-v1.0 directory." -ForegroundColor Red
    exit 1
}

# Check if Docker is available
try {
    docker --version | Out-Null
    Write-Host "✅ Docker found" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not installed or not running." -ForegroundColor Red
    exit 1
}

# Check if logged in to GitHub Container Registry
try {
    $dockerInfo = docker info 2>$null
    if ($dockerInfo -notmatch "Username:") {
        Write-Host "🔐 Logging in to GitHub Container Registry..." -ForegroundColor Yellow
        Write-Host "You'll need a GitHub Personal Access Token with 'write:packages' scope" -ForegroundColor Yellow
        Write-Host "Create one at: https://github.com/settings/tokens" -ForegroundColor Yellow
        Write-Host ""
        
        $username = Read-Host "Enter your GitHub username"
        $token = Read-Host "Enter your GitHub Personal Access Token" -AsSecureString
        $tokenPlain = [System.Runtime.InteropServices.Marshal]::PtrToStringAutoLoad([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($token))
        
        $tokenPlain | docker login $Registry -u $username --password-stdin
        Write-Host "✅ Successfully logged in to GitHub Container Registry" -ForegroundColor Green
    } else {
        Write-Host "✅ Already logged in to Docker registry" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Failed to check Docker login status" -ForegroundColor Red
    exit 1
}

# Get current git hash for build arg
try {
    $gitHash = git rev-parse --short HEAD 2>$null
    if ($LASTEXITCODE -ne 0) {
        $gitHash = "dev-build"
        Write-Host "⚠️  Not in a git repository, using dev-build hash" -ForegroundColor Yellow
    }
} catch {
    $gitHash = "dev-build"
    Write-Host "⚠️  Git not available, using dev-build hash" -ForegroundColor Yellow
}

# Build the Docker image
Write-Host "🏗️  Building Docker image..." -ForegroundColor Blue
try {
    $buildArgs = @(
        "--platform", "linux/amd64,linux/arm64",
        "--tag", "$Registry/$ImageName:$Tag",
        "--tag", "$Registry/$ImageName:latest",
        "--build-arg", "BUILD_HASH=$gitHash",
        "--build-arg", "USE_CUDA=false",
        "--build-arg", "USE_OLLAMA=false",
        "--build-arg", "USE_SLIM=false"
    )
    
    docker build @buildArgs .
    Write-Host "✅ Docker image built successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to build Docker image" -ForegroundColor Red
    exit 1
}

# Push the image
Write-Host "📤 Pushing Docker image to GitHub Container Registry..." -ForegroundColor Blue
try {
    docker push "$Registry/$ImageName:$Tag"
    docker push "$Registry/$ImageName:latest"
    Write-Host "✅ Docker image pushed successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to push Docker image" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎉 Successfully pushed Synergy UI to GitHub Container Registry!" -ForegroundColor Green
Write-Host "Image: $Registry/$ImageName:$Tag" -ForegroundColor Cyan
Write-Host ""
Write-Host "You can now use this image in your docker-compose.yml:" -ForegroundColor Yellow
Write-Host "image: $Registry/$ImageName:$Tag" -ForegroundColor Cyan
Write-Host ""
Write-Host "To test locally:" -ForegroundColor Yellow
Write-Host "docker run -p 3000:8080 $Registry/$ImageName:$Tag" -ForegroundColor Cyan
