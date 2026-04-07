# Qwen 3.5 Models

Qwen 3.5 is a family of open-source multimodal models from Alibaba that delivers exceptional utility and performance. Served via Ollama, it handles text and image input with text output. Qwen 3.5 features unified vision-language understanding, configurable thinking modes, native function-calling support, and coverage of 201 languages.

## Available Models

### 9B
- **Model Size**: 6.6 GB
- **Context Length**: 256K tokens
- **Modalities**: Text, Image
- **VRAM Required**: ~10 GB
- **Use Case**: Balanced default model with strong reasoning and multimodal capabilities

### 27B
- **Model Size**: 17 GB
- **Context Length**: 256K tokens
- **Modalities**: Text, Image
- **VRAM Required**: ~20 GB
- **Use Case**: High-quality inference for complex reasoning, coding, and agent tasks

### 35B
- **Model Size**: 24 GB
- **Context Length**: 256K tokens
- **Modalities**: Text, Image
- **VRAM Required**: ~28 GB
- **Use Case**: Maximum performance for demanding workloads and frontier benchmarks

## Features

- **Multimodal**: Processes text and images with unified vision-language foundation
- **Configurable Thinking**: Enable/disable reasoning mode for step-by-step problem solving
- **Native Function Calling**: Built-in support for tool use and autonomous agent workflows
- **201 Language Support**: Inclusive worldwide deployment with nuanced cultural understanding
- **Efficient Hybrid Architecture**: Gated Delta Networks with sparse MoE for high-throughput inference
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
    "model": "qwen3.5:9b",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

## Benchmarks (Qwen3.5-397B-A17B flagship reference)

| Benchmark | Score |
|-----------|-------|
| MMLU-Pro | 87.8% |
| GPQA | 88.4% |
| LiveCodeBench v6 | 83.6% |
| AIME 2026 | 91.3% |
| IFEval | 92.6% |
| SWE-bench Verified | 76.2% |
| MMMU (Vision) | 85.0% |
| MathVision | 88.6% |
