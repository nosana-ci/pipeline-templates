# Qwen Models

Alibaba's open-weight Qwen models, one variant per GPU size: the newest Qwen that fits each.

## Variants

### Qwen 3.5 9B
- **Engine**: Ollama, `qwen3.5:9b` (6.6 GB)
- **Context Length**: 256K tokens
- **Modalities**: Text, Image
- **VRAM Required**: ~9 GB, for 10 GB GPUs and up

### Qwen 3.8 27B
Qwen3.8-27B is a 27-billion-parameter dense model, released in August 2026 under Apache 2.0, with strong coding and agentic results for its size.

- **Engine**: Ollama, `qwen3.8:27b` (4-bit, 18 GB)
- **Context**: Ollama sizes it to the free GPU memory
- **Modalities**: Text, Image
- **VRAM Required**: ~23 GB, fits a 24 GB GPU such as the RTX 4090 or 3090

### Qwen 3.8 27B · vLLM · 32K context
- **Engine**: vLLM, AWQ 4-bit weights ([cyankiwi/Qwen3.8-27B-AWQ-INT4](https://huggingface.co/cyankiwi/Qwen3.8-27B-AWQ-INT4)), about 19 GB loaded
- **Context**: 32K tokens, 4 concurrent requests
- **VRAM Required**: ~28 GB, for 32 GB GPUs such as the RTX 5090

### Qwen 3.8 27B · vLLM · 128K context
- **Engine**: vLLM, the same AWQ 4-bit weights
- **Context**: 128K tokens, 8 concurrent requests
- **VRAM Required**: ~45 GB, for 48 GB GPUs and up

The vLLM variants are the setup that serves Qwen 3.8 on the Nosana LLM gateway: FP8 KV cache, tool calling (`qwen3_xml`) and reasoning output (`qwen3`), served as `qwen3.8-27b` on port 8000. Their context length and concurrency are global variables (`MAX_MODEL_LEN`, `MAX_NUM_SEQS`, `GPU_MEM_UTIL`) at the top of the job definition. In vLLM the AWQ weights alone take about 19 GB, too much of a 24 GB card to leave room for the cache, so 24 GB cards use the Ollama variant.

## Usage

The Ollama variants serve on port 11434 and the vLLM variants on port 8000, both with an OpenAI-compatible `POST /v1/chat/completions`.

```bash
curl https://your-deployment-url/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen3.8:27b",
    "messages": [{"role": "user", "content": "Write a function that reverses a linked list."}],
    "max_tokens": 1024
  }'
```

For the vLLM variants, use `"model": "qwen3.8-27b"`.
