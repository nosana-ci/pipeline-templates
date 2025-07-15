#!/bin/bash

# Nosana Pipeline Templates - Docker Image Builder
# This script builds all custom Docker images for supported templates

set -e  # Exit on any error

# Configuration
REGISTRY="nosana"
TAG="2.0.0"
DOCKERFILES_DIR="./dockerfiles"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Image definitions: dockerfile_name:image_name:description
IMAGES=(
    "pytorch-jupyter:pytorch-jupyter:PyTorch Jupyter Notebook environment"
    "tensorflow-jupyter:tensorflow-jupyter:TensorFlow Jupyter Notebook environment"
    "comfyui:comfyui:ComfyUI node-based image generation"
    "whisper-asr:whisper-asr:OpenAI Whisper speech recognition API"
    "vscode-server:vscode-server:Browser-based VS Code environment"
    "rstudio:rstudio:RStudio Server for R development"
)

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to build a single image
build_image() {
    local dockerfile_name=$1
    local image_name=$2
    local description=$3
    local full_image_name="${REGISTRY}/${image_name}:${TAG}"
    
    print_status "Building ${full_image_name} - ${description}"
    
    if docker build -f "${DOCKERFILES_DIR}/Dockerfile.${dockerfile_name}" -t "${full_image_name}" .; then
        print_success "Built ${full_image_name}"
        return 0
    else
        print_error "Failed to build ${full_image_name}"
        return 1
    fi
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [OPTIONS] [IMAGE_NAMES...]"
    echo ""
    echo "Build Docker images for Nosana pipeline templates"
    echo ""
    echo "Options:"
    echo "  -h, --help     Show this help message"
    echo "  -l, --list     List available images"
    echo "  -r, --registry Registry prefix (default: nosana)"
    echo "  -t, --tag      Image tag (default: 2.0.0)"
    echo "  --push         Push images to registry after building"
    echo "  --parallel     Build images in parallel (experimental)"
    echo ""
    echo "Examples:"
    echo "  $0                          # Build all images"
    echo "  $0 pytorch-jupyter comfyui  # Build specific images"
    echo "  $0 -r myregistry -t v1.0.0  # Custom registry and tag"
    echo "  $0 --push                   # Build and push all images"
}

# Function to list available images
list_images() {
    echo "Available images:"
    echo ""
    for image_def in "${IMAGES[@]}"; do
        IFS=':' read -r dockerfile_name image_name description <<< "$image_def"
        echo "  ${image_name} - ${description}"
    done
}

# Function to push image
push_image() {
    local image_name=$1
    local full_image_name="${REGISTRY}/${image_name}:${TAG}"
    
    print_status "Pushing ${full_image_name}"
    
    if docker push "${full_image_name}"; then
        print_success "Pushed ${full_image_name}"
        return 0
    else
        print_error "Failed to push ${full_image_name}"
        return 1
    fi
}

# Parse command line arguments
PUSH=false
PARALLEL=false
SPECIFIC_IMAGES=()

while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_usage
            exit 0
            ;;
        -l|--list)
            list_images
            exit 0
            ;;
        -r|--registry)
            REGISTRY="$2"
            shift 2
            ;;
        -t|--tag)
            TAG="$2"
            shift 2
            ;;
        --push)
            PUSH=true
            shift
            ;;
        --parallel)
            PARALLEL=true
            shift
            ;;
        -*)
            print_error "Unknown option $1"
            show_usage
            exit 1
            ;;
        *)
            SPECIFIC_IMAGES+=("$1")
            shift
            ;;
    esac
done

# Check if Docker is available
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed or not in PATH"
    exit 1
fi

# Check if we're in the right directory
if [[ ! -d "$DOCKERFILES_DIR" ]]; then
    print_error "Dockerfiles directory not found. Please run this script from the pipeline-templates root directory."
    exit 1
fi

print_status "Starting Docker image build process"
print_status "Registry: ${REGISTRY}"
print_status "Tag: ${TAG}"
echo ""

# Determine which images to build
IMAGES_TO_BUILD=()
if [[ ${#SPECIFIC_IMAGES[@]} -eq 0 ]]; then
    # Build all images
    IMAGES_TO_BUILD=("${IMAGES[@]}")
else
    # Build specific images
    for specific_image in "${SPECIFIC_IMAGES[@]}"; do
        found=false
        for image_def in "${IMAGES[@]}"; do
            IFS=':' read -r dockerfile_name image_name description <<< "$image_def"
            if [[ "$image_name" == "$specific_image" ]]; then
                IMAGES_TO_BUILD+=("$image_def")
                found=true
                break
            fi
        done
        if [[ "$found" == false ]]; then
            print_warning "Image '$specific_image' not found. Use --list to see available images."
        fi
    done
fi

if [[ ${#IMAGES_TO_BUILD[@]} -eq 0 ]]; then
    print_error "No valid images to build"
    exit 1
fi

# Build images
failed_builds=()
successful_builds=()

if [[ "$PARALLEL" == true ]]; then
    print_status "Building images in parallel..."
    pids=()
    
    for image_def in "${IMAGES_TO_BUILD[@]}"; do
        IFS=':' read -r dockerfile_name image_name description <<< "$image_def"
        build_image "$dockerfile_name" "$image_name" "$description" &
        pids+=($!)
    done
    
    # Wait for all builds to complete
    for pid in "${pids[@]}"; do
        if wait "$pid"; then
            successful_builds+=("$pid")
        else
            failed_builds+=("$pid")
        fi
    done
else
    print_status "Building images sequentially..."
    
    for image_def in "${IMAGES_TO_BUILD[@]}"; do
        IFS=':' read -r dockerfile_name image_name description <<< "$image_def"
        if build_image "$dockerfile_name" "$image_name" "$description"; then
            successful_builds+=("$image_name")
            
            # Push if requested
            if [[ "$PUSH" == true ]]; then
                push_image "$image_name"
            fi
        else
            failed_builds+=("$image_name")
        fi
    done
fi

# Summary
echo ""
print_status "Build Summary:"
echo "  Successful: ${#successful_builds[@]}"
echo "  Failed: ${#failed_builds[@]}"

if [[ ${#failed_builds[@]} -gt 0 ]]; then
    print_error "Failed builds:"
    for failed in "${failed_builds[@]}"; do
        echo "    - $failed"
    done
    exit 1
else
    print_success "All images built successfully!"
    
    if [[ "$PUSH" == true ]]; then
        print_success "All images pushed successfully!"
    fi
fi

# Show next steps
echo ""
print_status "Next steps:"
echo "  - Test images: docker run --rm -it ${REGISTRY}/pytorch-jupyter:${TAG}"
echo "  - Push to registry: $0 --push"
echo "  - List built images: docker images | grep ${REGISTRY}"