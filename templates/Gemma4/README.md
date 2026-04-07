# Gemma 4 Models

Google's Gemma 4 multimodal models via Ollama — handling text and image input with text output. Gemma 4 features configurable thinking modes, variable image resolution, and native function-calling support.

## Available Models

### E2B (Edge 2B)
- **Parameters**: 2.3B effective (5.1B with embeddings)
- **Model Size**: 7.2 GB
- **Context Length**: 128K tokens
- **Modalities**: Text, Image
- **VRAM Required**: ~10 GB
- **Use Case**: Efficient on-device inference for lightweight applications

### E4B (Edge 4B)
- **Parameters**: 4.5B effective (8B with embeddings)
- **Model Size**: 9.6 GB
- **Context Length**: 128K tokens
- **Modalities**: Text, Image
- **VRAM Required**: ~12 GB
- **Use Case**: Balanced edge deployment with strong reasoning capabilities

### 26B (Mixture of Experts)
- **Parameters**: 25.2B total (3.8B active, 8 active / 128 total experts + 1 shared)
- **Model Size**: 18 GB
- **Context Length**: 256K tokens
- **Modalities**: Text, Image
- **VRAM Required**: ~21 GB
- **Use Case**: Frontier intelligence with efficient MoE architecture

### 31B (Dense)
- **Parameters**: 30.7B
- **Model Size**: 20 GB
- **Context Length**: 256K tokens
- **Modalities**: Text, Image
- **VRAM Required**: ~24 GB
- **Use Case**: Maximum performance for demanding workloads

## Features

- **Multimodal**: Processes text and images with variable aspect ratio and resolution support
- **Configurable Thinking**: Enable/disable reasoning mode via `<|think|>` token
- **Native Function Calling**: Built-in support for autonomous agent workflows
- **OpenAI-compatible API**: Served via Ollama with standard endpoints
- **Automatic Model Download**: Models pulled automatically on startup

## Usage

The models are served on port 11434 with OpenAI-compatible endpoints:

- **Chat Completions**: `POST /v1/chat/completions`
- **Generate**: `POST /api/generate`
- **Model Info**: `GET /api/tags`

### Example Request

```bash
curl http://your-deployment-url:11434/api/chat \
  -d '{
    "model": "gemma4:e4b",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

## Benchmarks

| Benchmark | 31B Dense | 26B A4B MoE | E4B | E2B |
|-----------|-----------|-------------|-----|-----|
| MMLU Pro | 85.2% | 82.6% | 69.4% | 60.0% |
| AIME 2026 | 89.2% | 88.3% | 42.5% | 37.5% |
| LiveCodeBench v6 | 80.0% | 77.1% | 52.0% | 44.0% |
| GPQA Diamond | 84.3% | 82.3% | 58.6% | 43.4% |
| MMMU Pro (Vision) | 76.9% | 73.8% | 52.6% | 44.2% |
| MATH-Vision | 85.6% | 82.4% | 59.5% | 52.4% |
