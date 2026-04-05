# Llama 3.3

Meta's Llama 3.3 70B delivers 405B-equivalent performance in a more efficient 70B model with 128K context.

## Available Models

### 70B
- **Parameters**: 70 billion
- **VRAM Required**: 48 GB
- **Use Case**: State-of-the-art performance with improved efficiency over Llama 3.1 405B

## Features

- **OpenAI-compatible API**: Served via Ollama with standard endpoints
- **Automatic Model Download**: Models pulled automatically on startup
- **GPU Accelerated**: Optimized for GPU inference

## Usage

The models are served on port 11434 with OpenAI-compatible endpoints:

- **Chat Completions**: `POST /v1/chat/completions`
- **Generate**: `POST /api/generate`
- **Model Info**: `GET /api/tags`
