# Llama 3.1 Models

Meta's Llama 3.1 is a state-of-the-art open model available in 8B, 70B, and 405B parameter sizes with 128K context window.

## Available Models

### 8B
- **Parameters**: 8 billion
- **VRAM Required**: 6 GB
- **Use Case**: Fast inference for most tasks

### 70B
- **Parameters**: 70 billion
- **VRAM Required**: 48 GB
- **Use Case**: High-performance reasoning and generation

### 405B
- **Parameters**: 405 billion
- **VRAM Required**: 256 GB
- **Use Case**: Flagship model rivaling top AI systems

## Features

- **OpenAI-compatible API**: Served via Ollama with standard endpoints
- **Automatic Model Download**: Models pulled automatically on startup
- **GPU Accelerated**: Optimized for GPU inference

## Usage

The models are served on port 11434 with OpenAI-compatible endpoints:

- **Chat Completions**: `POST /v1/chat/completions`
- **Generate**: `POST /api/generate`
- **Model Info**: `GET /api/tags`
