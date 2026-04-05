# Mixtral MoE Models

Mistral AI's Mixture of Experts models offering high performance through sparse expert routing.

## Available Models

### 8x7B
- **Architecture**: 8 experts x 7B parameters
- **VRAM Required**: 30 GB
- **Context**: 32K tokens

### 8x22B
- **Architecture**: 8 experts x 22B parameters
- **VRAM Required**: 85 GB
- **Context**: 64K tokens
- **Use Case**: Precise information recall from large documents

## Features

- **OpenAI-compatible API**: Served via Ollama with standard endpoints
- **Automatic Model Download**: Models pulled automatically on startup
- **GPU Accelerated**: Optimized for GPU inference

## Usage

The models are served on port 11434 with OpenAI-compatible endpoints:

- **Chat Completions**: `POST /v1/chat/completions`
- **Generate**: `POST /api/generate`
- **Model Info**: `GET /api/tags`
