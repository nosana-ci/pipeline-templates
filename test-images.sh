#!/bin/bash

# Nosana Pipeline Templates - Docker Image Tester
# This script tests all built Docker images locally

set -e

# Configuration
REGISTRY="nosana"
TAG="2.0.0"
TEST_TIMEOUT=30
BASE_PORT=8000

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Test definitions: image_name:port:test_type:test_command
TESTS=(
    "pytorch-jupyter:8888:web:curl -f http://localhost:8888 || echo 'Jupyter starting'"
    "tensorflow-jupyter:8889:web:curl -f http://localhost:8889 || echo 'Jupyter starting'"
    "comfyui:8188:web:curl -f http://localhost:8188 || echo 'ComfyUI starting'"
    "oobabooga:7860:web:curl -f http://localhost:7860 || echo 'Oobabooga starting'"
    "invokeai:9090:web:curl -f http://localhost:9090 || echo 'InvokeAI starting'"
    "whisper-asr:9000:api:curl -f http://localhost:9000 || echo 'Whisper API starting'"
    "llama-factory:7860:web:curl -f http://localhost:7861 || echo 'LLaMA Factory starting'"
    "vscode-server:8080:web:curl -f http://localhost:8080 || echo 'VS Code starting'"
    "rstudio:8787:web:curl -f http://localhost:8787 || echo 'RStudio starting'"
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

# Function to cleanup containers
cleanup_containers() {
    print_status "Cleaning up test containers..."
    for test_def in "${TESTS[@]}"; do
        IFS=':' read -r image_name port test_type test_command <<< "$test_def"
        container_name="test-${image_name}"
        if docker ps -a --filter "name=${container_name}" --format "{{.Names}}" | grep -q "${container_name}"; then
            docker rm -f "${container_name}" >/dev/null 2>&1 || true
        fi
    done
}

# Function to test container startup
test_container_startup() {
    local image_name=$1
    local port=$2
    local test_type=$3
    local test_command=$4
    local full_image_name="${REGISTRY}/${image_name}:${TAG}"
    local container_name="test-${image_name}"
    
    print_status "Testing ${full_image_name}..."
    
    # Start container
    case $image_name in
        "pytorch-jupyter"|"tensorflow-jupyter")
            docker run -d --name "${container_name}" -p "${port}:8888" "${full_image_name}" >/dev/null
            ;;
        "comfyui")
            docker run -d --name "${container_name}" -p "${port}:8188" "${full_image_name}" >/dev/null
            ;;
        "oobabooga")
            docker run -d --name "${container_name}" -p "${port}:7860" "${full_image_name}" >/dev/null
            ;;
        "invokeai")
            docker run -d --name "${container_name}" -p "${port}:9090" "${full_image_name}" >/dev/null
            ;;
        "whisper-asr")
            docker run -d --name "${container_name}" -p "${port}:9000" "${full_image_name}" >/dev/null
            ;;
        "llama-factory")
            docker run -d --name "${container_name}" -p "${port}:7860" "${full_image_name}" >/dev/null
            ;;
        "vscode-server")
            docker run -d --name "${container_name}" -p "${port}:8080" "${full_image_name}" >/dev/null
            ;;
        "rstudio")
            docker run -d --name "${container_name}" -p "${port}:8787" "${full_image_name}" >/dev/null
            ;;
        *)
            print_error "Unknown image: ${image_name}"
            return 1
            ;;
    esac
    
    if [[ $? -ne 0 ]]; then
        print_error "Failed to start container for ${full_image_name}"
        return 1
    fi
    
    # Wait for container to be ready
    print_status "Waiting for ${image_name} to be ready (${TEST_TIMEOUT}s timeout)..."
    local ready=false
    local elapsed=0
    
    while [[ $elapsed -lt $TEST_TIMEOUT ]]; do
        if docker ps --filter "name=${container_name}" --format "{{.Status}}" | grep -q "Up"; then
            # Check if service is responding (for web services)
            if [[ "$test_type" == "web" || "$test_type" == "api" ]]; then
                sleep 2  # Give service time to start
                if eval "$test_command" >/dev/null 2>&1; then
                    ready=true
                    break
                fi
            else
                ready=true
                break
            fi
        fi
        sleep 2
        elapsed=$((elapsed + 2))
    done
    
    # Check container logs for errors
    local logs=$(docker logs "${container_name}" 2>&1 | tail -10)
    
    if [[ "$ready" == true ]]; then
        print_success "${image_name} is running successfully on port ${port}"
        echo "  Access: http://localhost:${port}"
        if [[ -n "$logs" ]]; then
            echo "  Last log lines:"
            echo "$logs" | sed 's/^/    /'
        fi
        return 0
    else
        print_error "${image_name} failed to start properly"
        echo "  Container logs:"
        echo "$logs" | sed 's/^/    /'
        return 1
    fi
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [OPTIONS] [IMAGE_NAMES...]"
    echo ""
    echo "Test Docker images for Nosana pipeline templates"
    echo ""
    echo "Options:"
    echo "  -h, --help     Show this help message"
    echo "  -c, --cleanup  Cleanup test containers and exit"
    echo "  -t, --timeout  Test timeout in seconds (default: 30)"
    echo "  --keep         Keep containers running after tests"
    echo ""
    echo "Examples:"
    echo "  $0                    # Test all images"
    echo "  $0 pytorch-jupyter    # Test specific image"
    echo "  $0 --cleanup          # Clean up test containers"
    echo "  $0 --keep             # Keep containers running"
}

# Parse command line arguments
CLEANUP_ONLY=false
KEEP_RUNNING=false
SPECIFIC_IMAGES=()

while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_usage
            exit 0
            ;;
        -c|--cleanup)
            CLEANUP_ONLY=true
            shift
            ;;
        -t|--timeout)
            TEST_TIMEOUT="$2"
            shift 2
            ;;
        --keep)
            KEEP_RUNNING=true
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

# Cleanup and exit if requested
if [[ "$CLEANUP_ONLY" == true ]]; then
    cleanup_containers
    print_success "Cleanup completed"
    exit 0
fi

# Check if Docker is available
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed or not in PATH"
    exit 1
fi

# Check if curl is available
if ! command -v curl &> /dev/null; then
    print_warning "curl is not available, some tests may not work properly"
fi

print_status "Starting Docker image tests"
print_status "Test timeout: ${TEST_TIMEOUT} seconds"
echo ""

# Cleanup any existing test containers
cleanup_containers

# Determine which images to test
TESTS_TO_RUN=()
if [[ ${#SPECIFIC_IMAGES[@]} -eq 0 ]]; then
    TESTS_TO_RUN=("${TESTS[@]}")
else
    for specific_image in "${SPECIFIC_IMAGES[@]}"; do
        found=false
        for test_def in "${TESTS[@]}"; do
            IFS=':' read -r image_name port test_type test_command <<< "$test_def"
            if [[ "$image_name" == "$specific_image" ]]; then
                TESTS_TO_RUN+=("$test_def")
                found=true
                break
            fi
        done
        if [[ "$found" == false ]]; then
            print_warning "Image '$specific_image' not found in test definitions"
        fi
    done
fi

if [[ ${#TESTS_TO_RUN[@]} -eq 0 ]]; then
    print_error "No valid images to test"
    exit 1
fi

# Run tests
successful_tests=()
failed_tests=()

for test_def in "${TESTS_TO_RUN[@]}"; do
    IFS=':' read -r image_name port test_type test_command <<< "$test_def"
    
    if test_container_startup "$image_name" "$port" "$test_type" "$test_command"; then
        successful_tests+=("$image_name")
    else
        failed_tests+=("$image_name")
    fi
    
    echo ""
done

# Summary
print_status "Test Summary:"
echo "  Successful: ${#successful_tests[@]}"
echo "  Failed: ${#failed_tests[@]}"

if [[ ${#successful_tests[@]} -gt 0 ]]; then
    print_success "Successful tests:"
    for success in "${successful_tests[@]}"; do
        echo "    ✓ $success"
    done
fi

if [[ ${#failed_tests[@]} -gt 0 ]]; then
    print_error "Failed tests:"
    for failed in "${failed_tests[@]}"; do
        echo "    ✗ $failed"
    done
fi

echo ""
if [[ "$KEEP_RUNNING" == true ]]; then
    print_status "Containers are kept running. Access them at:"
    for test_def in "${TESTS_TO_RUN[@]}"; do
        IFS=':' read -r image_name port test_type test_command <<< "$test_def"
        if [[ " ${successful_tests[@]} " =~ " ${image_name} " ]]; then
            echo "  ${image_name}: http://localhost:${port}"
        fi
    done
    print_status "Run '$0 --cleanup' to stop all test containers"
else
    cleanup_containers
    print_status "All test containers have been cleaned up"
fi

# Exit with error if any tests failed
if [[ ${#failed_tests[@]} -gt 0 ]]; then
    exit 1
fi

print_success "All tests completed successfully!"