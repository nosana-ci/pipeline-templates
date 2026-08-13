# Muse Glimmer

Muse Glimmer is a 30-billion-parameter causal language model with a dedicated perception encoder, distilled from Muse Spark and built for autonomous agentic tasks on consumer hardware. It combines multi-step reasoning, tool use, multimodal understanding and failure recovery in a single model. Served through Ollama, this template deploys `muse-glimmer:30b` with an OpenAI-compatible API.

## Included Model

### 30B
- **Model Tag**: `muse-glimmer:30b` (27.9B parameters, Q4_K_M)
- **Model Size**: 18.2 GB
- **Context Length**: 128K tokens
- **Modalities**: Text, Image
- **VRAM Required**: ~18 GB at 32K context (24 GB-class GPUs and up)
- **Use Case**: Agentic workflows, tool calling, coding assistants, screenshot and document understanding

NVIDIA support for this architecture landed in Ollama 0.32.8, so the image is pinned above the 0.32.6 used by the other templates; 0.32.9 also carries a fix in the function-calling parser. The `30b-mlx` tag is an Apple Silicon build and is not applicable to Nosana GPU nodes.

## Highlights

- **End-to-end agentic task completion**: strong results on DeepSearch QA, MCP-Atlas, 𝛕3-Bench and SWE-Bench
- **Reliable tool use**: precise function-call schemas across extended workflows
- **Multi-step reasoning**: coherent plans over long horizons
- **Failure recovery**: diagnoses failed or unexpected tool results and retries instead of halting
- **Multimodal input**: interleaved text and images through a dedicated perception encoder
- **Scaffold compatibility**: works with OpenClaw, Hermes Agent and similar orchestration patterns
- **Controllable effort**: selectable reasoning strengths to trade quality against speed
- **Multilingual**: trained on data from more than 100 languages
- **Automatic model download**: the model is pulled automatically on startup

## Benchmarks

Reported by Meta, compared with Gemma4-31B and Qwen3.6-27B (thinking mode):

| Category | Benchmark | Muse Glimmer-30B | Gemma4-31B | Qwen3.6-27B |
| --- | --- | --- | --- | --- |
| General Agentic | MCP Atlas (Public) | 75.5 | 54.2 | 62.5 |
| | DeepSearch QA | 74.6 | 61.7 | 71.1 |
| | 𝛕3-Banking | 23.5 | 15.1 | 16.7 |
| | WildClawBench | 47.6 | 37.6 | 43.2 |
| | GDPVal-AA v2 | 953 | 811 | 1141 |
| | Gaia2 | 43.3 | 36.4 | 40.0 |
| | SkillsBench (with skills) | 44.3 | 32.4 | 46.6 |
| | OSWorld-Verified | 65.9 | 58.5 | 75.6 |
| Agentic Coding | SWE-Bench Pro | 51.2 | 36.9 | 50.2 |
| | SWE-Bench Verified | 76.0 | 66.6 | 77.2 |
| | TerminalBench 2.1 (with terminus2) | 51.7 | 43.4 | 60.7 |
| | SciCode | 43.6 | 43.4 | 39.8 |
| Multimodal | Charxiv Reasoning | 78.8 | 77.7 | 78.4 |
| | ScreenSpot Pro | 75.4 | 75.9 | 76.1 |
| | OmniDocBench v1.5 | 75.8 | 72.5 | 77.8 |
| | MMMU Pro | 74 | 73 | 75 |
| General Reasoning | IFBench | 77.0 | 76.0 | 70.8 |
| | AIME 2026 | 94.7 | 89.2 | 94.1 |
| | GPQA Diamond (AA) | 83.5 | 85.7 | 84.2 |
| | HLE Text (AA) | 22.0 | 23.6 | 23.1 |
| | AA-LCR | 80.0 | 68.3 | 73.3 |
| | Beam128K | 65.1 | 58.2 | 63.0 |

## Usage

The model is served on port 11434 with OpenAI-compatible endpoints:

- **Chat Completions**: `POST /v1/chat/completions`
- **Generate**: `POST /api/generate`
- **Model Info**: `GET /api/tags`

### Example Request

```bash
curl http://your-deployment-url:11434/api/chat \
  -d '{
    "model": "muse-glimmer:30b",
    "messages": [{"role": "user", "content": "Plan and run a three-step research task."}]
  }'
```
