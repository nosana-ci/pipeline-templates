# Nosana Pipeline Templates - Makefile
# Easy commands for building and managing Docker images

# Configuration
REGISTRY := nosana
TAG := latest
SCRIPT := ./build-images.sh

# Default target
.PHONY: help
help: ## Show this help message
	@echo "Nosana Pipeline Templates - Docker Image Builder"
	@echo ""
	@echo "Usage:"
	@echo "  make <target>"
	@echo ""
	@echo "Targets:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.PHONY: build
build: ## Build all Docker images
	$(SCRIPT)

.PHONY: build-parallel
build-parallel: ## Build all Docker images in parallel
	$(SCRIPT) --parallel

.PHONY: list
list: ## List available images
	$(SCRIPT) --list

.PHONY: push
push: ## Build and push all images to registry
	$(SCRIPT) --push

.PHONY: clean
clean: ## Remove all built images
	@echo "Removing all $(REGISTRY) images..."
	@docker images $(REGISTRY)/* --format "table {{.Repository}}:{{.Tag}}" | tail -n +2 | xargs -r docker rmi -f

.PHONY: pytorch
pytorch: ## Build PyTorch Jupyter image only
	$(SCRIPT) pytorch-jupyter

.PHONY: tensorflow
tensorflow: ## Build TensorFlow Jupyter image only
	$(SCRIPT) tensorflow-jupyter

.PHONY: comfyui
comfyui: ## Build ComfyUI image only
	$(SCRIPT) comfyui

.PHONY: oobabooga
oobabooga: ## Build Oobabooga image only
	$(SCRIPT) oobabooga

.PHONY: invokeai
invokeai: ## Build InvokeAI image only
	$(SCRIPT) invokeai

.PHONY: whisper
whisper: ## Build Whisper ASR image only
	$(SCRIPT) whisper-asr

.PHONY: llama-factory
llama-factory: ## Build LLaMA Factory image only
	$(SCRIPT) llama-factory

.PHONY: vscode
vscode: ## Build VS Code Server image only
	$(SCRIPT) vscode-server

.PHONY: rstudio
rstudio: ## Build RStudio Server image only
	$(SCRIPT) rstudio

.PHONY: dev
dev: pytorch tensorflow vscode ## Build development environment images

.PHONY: ai
ai: comfyui oobabooga invokeai whisper llama-factory ## Build AI/ML images

.PHONY: test
test: ## Test all built images (basic smoke test)
	@echo "Testing built images..."
	@docker images $(REGISTRY)/* --format "{{.Repository}}:{{.Tag}}" | while read image; do \
		echo "Testing $$image..."; \
		docker run --rm $$image --version 2>/dev/null || \
		docker run --rm $$image --help 2>/dev/null || \
		docker run --rm $$image echo "Image $$image is working" || \
		echo "Could not test $$image - may require special startup"; \
	done

.PHONY: size
size: ## Show image sizes
	@echo "Docker image sizes:"
	@docker images $(REGISTRY)/* --format "table {{.Repository}}:{{.Tag}}\t{{.Size}}" | sort

.PHONY: validate
validate: ## Validate Dockerfiles
	@echo "Validating Dockerfiles..."
	@for dockerfile in dockerfiles/Dockerfile.*; do \
		echo "Validating $$dockerfile..."; \
		docker run --rm -i hadolint/hadolint < "$$dockerfile" || true; \
	done

# Custom registry and tag
.PHONY: build-custom
build-custom: ## Build with custom registry and tag (usage: make build-custom REGISTRY=myregistry TAG=v1.0.0)
	$(SCRIPT) -r $(REGISTRY) -t $(TAG)

.PHONY: push-custom
push-custom: ## Build and push with custom registry and tag
	$(SCRIPT) -r $(REGISTRY) -t $(TAG) --push