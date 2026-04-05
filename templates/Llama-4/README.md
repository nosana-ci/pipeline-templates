# Llama 4 Models

Meta's latest Llama 4 collection features mixture-of-experts architecture with multimodal capabilities supporting text and images.

## Available Models

### Scout (16x17B)
- **Architecture**: 16 experts x 17B parameters
- **VRAM Required**: 72 GB
- **Context**: 10M tokens
- **Use Case**: Efficient multimodal tasks with massive context

### Maverick (128x17B)
- **Architecture**: 128 experts x 17B parameters
- **VRAM Required**: 256 GB
- **Context**: 1M tokens
- **Use Case**: Maximum capability multimodal model

## Features

- **OpenAI-compatible API**: Served via Ollama with standard endpoints
- **Automatic Model Download**: Models pulled automatically on startup
- **GPU Accelerated**: Optimized for GPU inference

## Usage

The models are served on port 11434 with OpenAI-compatible endpoints:

- **Chat Completions**: `POST /v1/chat/completions`
- **Generate**: `POST /api/generate`
- **Model Info**: `GET /api/tags`
