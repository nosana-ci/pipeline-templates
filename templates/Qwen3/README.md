# Qwen 3 Coder

Qwen3-Coder is Alibaba's open-source coding model family, built for agentic coding, repository-scale understanding and tool use. It is served here with Ollama and takes text in and gives text out. The 30B variant is a Mixture-of-Experts model: 30B parameters in total, about 3.3B active per token. That makes it fast for its size while keeping strong code generation and function-calling ability.

## Available Models

### 30B Coder (`qwen3-coder:30b`)

- **Model Size**: 19 GB
- **Architecture**: MoE, 30B total / ~3.3B active parameters
- **Context Length**: 256K tokens
- **Modalities**: Text
- **VRAM Required**: ~23 GB
- **Use Case**: Code generation, code review, agentic coding workflows and tool calling

## Features

- **Agentic Coding**: Tuned for multistep coding tasks, browser use and tool use
- **Long Context**: 256K-token native context for repository-scale understanding
- **Native Function Calling**: Built-in support for tool use in agent frameworks
- **Efficient MoE Architecture**: Only ~3.3B parameters active per token, for high-throughput inference
- **OpenAI-compatible API**: Served via Ollama with standard endpoints
- **Automatic Model Download**: The model is pulled automatically on startup

## Usage

The model is served on port 11434 with OpenAI-compatible endpoints:

- **Chat Completions**: `POST /v1/chat/completions`
- **Generate**: `POST /api/generate`
- **Model Info**: `GET /api/tags`

### Example Request

```bash
curl https://<your-deployment-url>/api/chat \
  -d '{
    "model": "qwen3-coder:30b",
    "messages": [{"role": "user", "content": "Write a Python function that checks if a string is a palindrome."}]
  }'
```
