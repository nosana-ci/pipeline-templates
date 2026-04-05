# Phi 4

Microsoft's Phi-4 is a 14B parameter state-of-the-art open model built with synthetic datasets and academic materials, excelling at reasoning tasks.

## Available Models

### 14B
- **Parameters**: 14 billion
- **VRAM Required**: 12 GB
- **Use Case**: Strong reasoning in a compact model

## Features

- **OpenAI-compatible API**: Served via Ollama with standard endpoints
- **Automatic Model Download**: Models pulled automatically on startup
- **GPU Accelerated**: Optimized for GPU inference

## Usage

The models are served on port 11434 with OpenAI-compatible endpoints:

- **Chat Completions**: `POST /v1/chat/completions`
- **Generate**: `POST /api/generate`
- **Model Info**: `GET /api/tags`
