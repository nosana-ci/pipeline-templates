# Qwen 3.8

Qwen3.8-27B is Alibaba's 27-billion-parameter dense model, released in August 2026 under Apache 2.0, with strong coding and agentic results for its size. It accepts text, images and video. This template serves the AWQ 4-bit weights ([cyankiwi/Qwen3.8-27B-AWQ-INT4](https://huggingface.co/cyankiwi/Qwen3.8-27B-AWQ-INT4)) with vLLM, the same setup that runs Qwen 3.8 on the Nosana LLM gateway.

## Variants

### 27B · 32K context
- **Weights**: AWQ 4-bit, about 18 GB
- **Context Length**: 32K tokens
- **Concurrent requests**: 4
- **VRAM Required**: ~22 GB, fits a 24 GB GPU such as the RTX 4090 or 3090

### 27B · 128K context
- **Weights**: AWQ 4-bit, about 18 GB
- **Context Length**: 128K tokens
- **Concurrent requests**: 8
- **VRAM Required**: ~45 GB, for 48 GB GPUs and larger

Both use an FP8 KV cache, and enable tool calling (`qwen3_xml`) and reasoning output (`qwen3`).

## Usage

The model is served on port 8000 with OpenAI-compatible endpoints, under the name `qwen3.8-27b`:

- **Chat Completions**: `POST /v1/chat/completions`
- **Models**: `GET /v1/models`
- **Health**: `GET /health`

### Example Request

```bash
curl https://your-deployment-url/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen3.8-27b",
    "messages": [{"role": "user", "content": "Write a function that reverses a linked list."}],
    "max_tokens": 1024
  }'
```

The context length and concurrency are global variables (`MAX_MODEL_LEN`, `MAX_NUM_SEQS`, `GPU_MEM_UTIL`) at the top of the job definition, so they can be changed before deploying.
