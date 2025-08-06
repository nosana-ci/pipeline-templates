# GPT-OSS Models

High-performance inference API for GPT-OSS language models via Ollama with multiple size options.

## Available Models

### 20B Model
- **Parameters**: 20 billion
- **VRAM Required**: 13 GB
- **Use Case**: Balanced performance for most applications with efficient resource usage

### 120B Model  
- **Parameters**: 120 billion
- **VRAM Required**: 65 GB
- **Use Case**: Maximum performance and capabilities for demanding applications

## Features

- OpenAI-compatible API endpoints via Ollama
- Automatic model downloading and serving
- Health checks for reliability
- Support for streaming and non-streaming responses
- Built on proven Ollama infrastructure

## Usage

The models are served on port 11434 with OpenAI-compatible endpoints:

- **Chat Completions**: `POST /v1/chat/completions`
- **Model Info**: `GET /api/tags`
- **Generate**: `POST /api/generate`

### Example Request

```bash
curl http://your-deployment-url:11434/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-oss:20b",
    "messages": [
      {
        "role": "user",
        "content": "Hello, how are you?"
      }
    ],
    "stream": false
  }'
```

## Model Details

GPT-OSS models are open-source language models optimized for general-purpose text generation and conversation. These models provide excellent performance across a variety of tasks including:

- Conversational AI
- Text generation
- Code assistance
- Question answering
- Creative writing

Both variants are automatically downloaded and served via Ollama, providing a robust and scalable inference platform.