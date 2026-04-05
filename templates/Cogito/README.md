# Cogito Models

Nous Research's Cogito v1 Preview is a family of hybrid reasoning models that can toggle between standard and extended thinking modes.

## Available Models

### 3B
- **Parameters**: 3 billion
- **VRAM Required**: 4 GB

### 8B
- **Parameters**: 8 billion
- **VRAM Required**: 7 GB

### 14B
- **Parameters**: 14 billion
- **VRAM Required**: 12 GB

### 32B
- **Parameters**: 32 billion
- **VRAM Required**: 24 GB

### 70B
- **Parameters**: 70 billion
- **VRAM Required**: 48 GB
- **Use Case**: Maximum reasoning capability with hybrid thinking

## Features

- **OpenAI-compatible API**: Served via Ollama with standard endpoints
- **Automatic Model Download**: Models pulled automatically on startup
- **GPU Accelerated**: Optimized for GPU inference

## Usage

The models are served on port 11434 with OpenAI-compatible endpoints:

- **Chat Completions**: `POST /v1/chat/completions`
- **Generate**: `POST /api/generate`
- **Model Info**: `GET /api/tags`
