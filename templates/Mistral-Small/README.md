# Mistral Small Models

Mistral Small sets a new benchmark in the small LLM category, balancing performance and efficiency.

## Available Models

### 22B
- **Parameters**: 22 billion
- **VRAM Required**: 16 GB
- **Context**: 128K tokens

### 24B
- **Parameters**: 24 billion
- **VRAM Required**: 18 GB
- **Context**: 32K tokens
- **Use Case**: Latest Mistral Small with improved capabilities

## Features

- **OpenAI-compatible API**: Served via Ollama with standard endpoints
- **Automatic Model Download**: Models pulled automatically on startup
- **GPU Accelerated**: Optimized for GPU inference

## Usage

The models are served on port 11434 with OpenAI-compatible endpoints:

- **Chat Completions**: `POST /v1/chat/completions`
- **Generate**: `POST /api/generate`
- **Model Info**: `GET /api/tags`
