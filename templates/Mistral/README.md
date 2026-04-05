# Mistral 7B

Mistral AI's foundational 7B model with 32K context window, supporting both instruction-following and text completion.

## Available Models

### 7B
- **Parameters**: 7 billion
- **VRAM Required**: 6 GB
- **Use Case**: Efficient general-purpose language model

## Features

- **OpenAI-compatible API**: Served via Ollama with standard endpoints
- **Automatic Model Download**: Models pulled automatically on startup
- **GPU Accelerated**: Optimized for GPU inference

## Usage

The models are served on port 11434 with OpenAI-compatible endpoints:

- **Chat Completions**: `POST /v1/chat/completions`
- **Generate**: `POST /api/generate`
- **Model Info**: `GET /api/tags`
