# TinyLLaMA API (via vLLM)

A lightweight, OpenAI-compatible API server running [TinyLLaMA-1.1B-Chat](https://huggingface.co/TinyLlama/TinyLlama-1.1B-Chat-v1.0) using the blazing-fast [vLLM](https://github.com/vllm-project/vllm) inference engine.  
Deployable on lightweight GPUs (as low as 6GB VRAM), making it ideal for edge deployments, AI assistants, educational tools, and text generation APIs.

---

## Usage 
```bash
curl http://<nosana-host>:9000/v1/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "tinyllama",
    "prompt": "Give me a startup idea involving LLMs.",
    "max_tokens": 60
  }'
```
```python
http://<nosana-host>:9000/v1/completions
In body :
{
  "model": "tinyllama",
  "prompt": "Write a short inspirational quote.",
  "max_tokens": 50,
  "temperature": 0.7
}
```


## Features

- Runs **TinyLLaMA-1.1B-Chat** with ~1.1B parameters  
- **OpenAI-compatible** API (`/v1/completions`)  
- Powered by **vLLM** for fast, parallel inference  
- No external keys required (fully self-hosted)  
- Optimized for deployment via Nosana  

---

## About TinyLLaMA

TinyLLaMA is a 1.1B-parameter language model trained by the TinyLLaMA team. It's trained on a high-quality dataset and tuned for chat-style instruction following. Despite its small size, it's surprisingly capable and perfect for:

- Chatbots  
- Educational assistants  
- Prompt-based tools  
- Lightweight inference services  

Model: [`TinyLlama/TinyLlama-1.1B-Chat-v1.0`](https://huggingface.co/TinyLlama/TinyLlama-1.1B-Chat-v1.0)

---
