# Qwen 3.8

Qwen3.8-27B is Alibaba's 27-billion-parameter dense model, released in August 2026 under Apache 2.0, with strong coding and agentic results for its size. It accepts text, images and video.

## Variants

### 27B Model (Ollama)
- **Model Tag**: `qwen3.8:27b` (4-bit, 18 GB)
- **VRAM Required**: ~23 GB, fits a 24 GB GPU such as the RTX 4090 or 3090
- **Context**: Ollama sizes it to the free GPU memory
- **API**: port 11434, OpenAI-compatible (`/v1/chat/completions`) and Ollama endpoints

### 27B · vLLM · 32K context
- **Weights**: AWQ 4-bit ([cyankiwi/Qwen3.8-27B-AWQ-INT4](https://huggingface.co/cyankiwi/Qwen3.8-27B-AWQ-INT4)), about 19 GB loaded
- **Context**: 32K tokens, 4 concurrent requests
- **VRAM Required**: ~28 GB, for 32 GB GPUs such as the RTX 5090

### 27B · vLLM · 128K context
- **Weights**: the same AWQ 4-bit
- **Context**: 128K tokens, 8 concurrent requests
- **VRAM Required**: ~45 GB, for 48 GB GPUs and larger

The vLLM variants are the setup that serves Qwen 3.8 on the Nosana LLM gateway: FP8 KV cache, tool calling (`qwen3_xml`) and reasoning output (`qwen3`), served as `qwen3.8-27b` on port 8000. In vLLM the AWQ weights alone take about 19 GB, which leaves too little of a 24 GB card for the cache; use the Ollama variant there.

## Example Request (vLLM)

```bash
curl https://your-deployment-url/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen3.8-27b",
    "messages": [{"role": "user", "content": "Write a function that reverses a linked list."}],
    "max_tokens": 1024
  }'
```

The vLLM context length and concurrency are global variables (`MAX_MODEL_LEN`, `MAX_NUM_SEQS`, `GPU_MEM_UTIL`) at the top of the job definition.
