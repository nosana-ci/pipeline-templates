# Qwen 3 Models

Alibaba's Qwen 3 features both dense and mixture-of-experts models with strong coding, math, and general capabilities.

## Available Models

### 0.6B
- **Parameters**: 0.6 billion
- **VRAM Required**: 2 GB

### 1.7B
- **Parameters**: 1.7 billion
- **VRAM Required**: 3 GB

### 4B
- **Parameters**: 4 billion
- **VRAM Required**: 4 GB
- **Context**: 256K tokens

### 8B
- **Parameters**: 8 billion
- **VRAM Required**: 7 GB

### 14B
- **Parameters**: 14 billion
- **VRAM Required**: 12 GB

### 30B (MoE)
- **Parameters**: 30 billion (MoE)
- **VRAM Required**: 22 GB
- **Context**: 256K tokens

### 32B
- **Parameters**: 32 billion (dense)
- **VRAM Required**: 24 GB

### 235B (MoE)
- **Parameters**: 235 billion (MoE flagship)
- **VRAM Required**: 150 GB
- **Context**: 256K tokens

## Features

- **OpenAI-compatible API**: Served via Ollama with standard endpoints
- **Automatic Model Download**: Models pulled automatically on startup
- **GPU Accelerated**: Optimized for GPU inference

## Usage

The models are served on port 11434 with OpenAI-compatible endpoints:

- **Chat Completions**: `POST /v1/chat/completions`
- **Generate**: `POST /api/generate`
- **Model Info**: `GET /api/tags`
