# Gemma 2 Models

Google's Gemma 2 high-performing and efficient models via Ollama.

## Available Models

### 2B
- **Parameters**: 2 billion
- **VRAM Required**: 3 GB

### 9B
- **Parameters**: 9 billion
- **VRAM Required**: 7 GB

### 27B
- **Parameters**: 27 billion
- **VRAM Required**: 20 GB
- **Use Case**: Highest quality in the Gemma 2 family

## Features

- **OpenAI-compatible API**: Served via Ollama with standard endpoints
- **Automatic Model Download**: Models pulled automatically on startup
- **GPU Accelerated**: Optimized for GPU inference

## Usage

The models are served on port 11434 with OpenAI-compatible endpoints:

- **Chat Completions**: `POST /v1/chat/completions`
- **Generate**: `POST /api/generate`
- **Model Info**: `GET /api/tags`
