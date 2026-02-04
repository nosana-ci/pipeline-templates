# GLM-4.7-Flash

High-performance inference API for GLM-4.7-Flash language models via Ollama with multiple size options.

## Available Models

### 30B Model
- **Parameters**: 30 billion MoE
- **VRAM Required**: 19 GB
- **Use Case**: Balanced performance for most applications with efficient resource usage, strongest in the 30B class.

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
curl http://your-deployment-url:11434/api/chat \
  -d '{
    "model": "glm-4.7-flash",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

## Model Details

GLM-4.7-Flash is a 30B-A3B MoE model, optimized for general-purpose text generation and conversation. These models provide excellent performance across a variety of tasks including:

- Conversational AI
- Text generation
- Code assistance
- Question answering
- Creative writing

Both variants are automatically downloaded and served via Ollama, providing a robust and scalable inference platform.

## Benchmarks

| Benchmark            | GLM-4.7-Flash | Qwen3-30B-A3B-Thinking-2507 | GPT-OSS-20B |
|----------------------|---------------|-----------------------------|-------------|
| AIME 25              | 91.6          | 85.0                        | 91.7        |
| GPQA                 | 75.2          | 73.4                        | 71.5        |
| LCB v6               | 64.0          | 66.0                        | 61.0        |
| HLE                  | 14.4          | 9.8                         | 10.9        |
| SWE-bench Verified   | 59.2          | 22.0                        | 34.0        |
| τ²-Bench             | 79.5          | 49.0                        | 47.7        |
| BrowseComp           | 42.8          | 2.29                        | 28.3        |
