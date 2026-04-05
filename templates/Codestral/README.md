# Codestral

Mistral AI's first dedicated code model, a 22B parameter model designed for code generation and understanding.

## Available Models

### 22B
- **Parameters**: 22 billion
- **VRAM Required**: 16 GB
- **Context**: 32K tokens
- **Use Case**: Dedicated code generation and completion

## Features

- **OpenAI-compatible API**: Served via Ollama with standard endpoints
- **Automatic Model Download**: Models pulled automatically on startup
- **GPU Accelerated**: Optimized for GPU inference

## Usage

The models are served on port 11434 with OpenAI-compatible endpoints:

- **Chat Completions**: `POST /v1/chat/completions`
- **Generate**: `POST /api/generate`
- **Model Info**: `GET /api/tags`
