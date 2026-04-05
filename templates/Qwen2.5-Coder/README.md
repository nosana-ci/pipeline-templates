# Qwen 2.5 Coder Models

Alibaba's code-specific Qwen 2.5 models with improvements in code generation, reasoning, and fixing. The 32B flagship competes with GPT-4o on coding tasks.

## Available Models

### 3B
- **Parameters**: 3 billion
- **VRAM Required**: 3 GB

### 7B
- **Parameters**: 7 billion
- **VRAM Required**: 6 GB

### 14B
- **Parameters**: 14 billion
- **VRAM Required**: 12 GB

### 32B
- **Parameters**: 32 billion
- **VRAM Required**: 24 GB
- **Use Case**: Flagship code model competing with GPT-4o

## Features

- **OpenAI-compatible API**: Served via Ollama with standard endpoints
- **Automatic Model Download**: Models pulled automatically on startup
- **GPU Accelerated**: Optimized for GPU inference

## Usage

The models are served on port 11434 with OpenAI-compatible endpoints:

- **Chat Completions**: `POST /v1/chat/completions`
- **Generate**: `POST /api/generate`
- **Model Info**: `GET /api/tags`
