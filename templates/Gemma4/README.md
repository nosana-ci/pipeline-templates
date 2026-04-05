# Gemma 4 Models

Google's Gemma 4 delivers frontier-level performance for reasoning, agentic workflows, coding, and multimodal understanding.

## Available Models

### E2B
- **Parameters**: ~2 billion (efficient)
- **VRAM Required**: 10 GB
- **Multimodal**: Text + Image

### E4B
- **Parameters**: ~4 billion (efficient)
- **VRAM Required**: 12 GB
- **Multimodal**: Text + Image

### 26B
- **Parameters**: 26 billion
- **VRAM Required**: 22 GB
- **Context**: 256K tokens
- **Multimodal**: Text + Image

### 31B
- **Parameters**: 31 billion
- **VRAM Required**: 24 GB
- **Context**: 256K tokens
- **Multimodal**: Text + Image

## Features

- **OpenAI-compatible API**: Served via Ollama with standard endpoints
- **Automatic Model Download**: Models pulled automatically on startup
- **GPU Accelerated**: Optimized for GPU inference

## Usage

The models are served on port 11434 with OpenAI-compatible endpoints:

- **Chat Completions**: `POST /v1/chat/completions`
- **Generate**: `POST /api/generate`
- **Model Info**: `GET /api/tags`
