# Qwen 3.6

Qwen 3.6 delivers substantial upgrades in agentic coding and thinking preservation over previous Qwen models. Served through Ollama, this template deploys the default open-weight `qwen3.6:35b-a3b` model with support for text and image input.

## Included Model

### 35B A3B
- **Model Tag**: `qwen3.6:35b-a3b`
- **Model Size**: 24 GB
- **Context Length**: 256K tokens
- **Modalities**: Text, Image
- **VRAM Required**: ~26 GB
- **Use Case**: Advanced coding, repository-level reasoning, and multimodal assistant workflows

## Highlights

- **Agentic Coding**: Improved frontend workflows and repository-scale reasoning
- **Thinking Preservation**: Better retention of reasoning context across historical messages
- **Multimodal**: Accepts both text and image inputs
- **Tool Ready**: Designed for tool use and coding assistants
- **OpenAI-compatible API**: Exposed through standard Ollama endpoints
- **Automatic Model Download**: The model is pulled automatically on startup

## Usage

The model is served on port 11434 with OpenAI-compatible endpoints:

- **Chat Completions**: `POST /v1/chat/completions`
- **Generate**: `POST /api/generate`
- **Model Info**: `GET /api/tags`

### Example Request

```bash
curl http://your-deployment-url:11434/api/chat \
  -d '{
    "model": "qwen3.6:35b-a3b",
    "messages": [{"role": "user", "content": "Help me review this repository."}]
  }'
```
