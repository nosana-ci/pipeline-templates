# Command R

Cohere's Command R is a 35B parameter model optimized for conversational interaction and long-context tasks with 128K context window.

## Available Models

### 35B
- **Parameters**: 35 billion
- **VRAM Required**: 24 GB
- **Context**: 128K tokens
- **Use Case**: Conversational AI with retrieval-augmented generation

## Features

- **OpenAI-compatible API**: Served via Ollama with standard endpoints
- **Automatic Model Download**: Models pulled automatically on startup
- **GPU Accelerated**: Optimized for GPU inference

## Usage

The models are served on port 11434 with OpenAI-compatible endpoints:

- **Chat Completions**: `POST /v1/chat/completions`
- **Generate**: `POST /api/generate`
- **Model Info**: `GET /api/tags`
