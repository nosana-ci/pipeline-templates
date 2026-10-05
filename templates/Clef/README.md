# Clef

Clef is a family of multimodal decision models from Cloudflare. Instead of generating text, a decision model takes a `state` and a schema of typed questions and returns decisions with probabilities, scoring every option of every question in a single non-autoregressive forward pass. Served through Ollama, this template deploys `clef:27b` or the smaller, faster `clef-flash:9b`.

## Included Models

### Clef 27B
- **Model Tag**: `clef:27b`
- **Model Size**: 18 GB
- **Base Model**: Fine-tuned from Qwen3.8-27B
- **Context Length**: 256K tokens
- **Modalities**: Text, Image
- **VRAM Required**: ~23 GB (about 22 GB in use once loaded)
- **Use Case**: Highest-accuracy routing, policy checks, and document decisions

### Clef Flash 9B
- **Model Tag**: `clef-flash:9b`
- **Model Size**: 11 GB
- **Base Model**: Fine-tuned from Qwen3.5-9B
- **Context Length**: 256K tokens
- **Modalities**: Text, Image
- **VRAM Required**: ~16 GB (about 13 GB in use once loaded)
- **Use Case**: Latency-critical decisions such as gating agent steps and model routing

## Highlights

- **Typed decisions**: `choice`, `noul` (true/false), and `score` questions, each returned with probabilities
- **One forward pass**: Up to 64 named questions per request, scored jointly
- **Multimodal**: Decide over text, JSON, or images such as screenshots, receipts, forms, and photos
- **Fast**: Cloudflare reports a median latency of 209.3 ms for Clef and 38.8 ms for Clef Flash
- **Apache 2.0 license**
- **Automatic Model Download**: The model is pulled automatically on startup

## Usage

The model is served on port 11434. Decision models do not generate text, so `/v1/chat/completions` returns `400 does not support chat`; use Ollama's System One endpoint instead:

- **Decisions**: `POST /v1/systemone`
- **Model Info**: `GET /api/tags`

Clef requires Ollama 0.35.1 or later, which is the version this template runs.

### Request Fields

| Field | Description |
|-------|-------------|
| `model` | `clef:27b` or `clef-flash:9b`, matching the deployed variant. The full tag is required |
| `state` | The text to judge. A string, or a JSON object or array for structured input |
| `images` | Optional. Base64-encoded PNG, JPEG, or WebP images shared by all questions. URLs and data URLs are not supported |
| `questions` | 1 to 64 named questions. Answers come back in the same order |
| `keep_alive` | Optional. How long the model stays loaded after the request |

### Question Types

| Type | `criteria` | Answer fields |
|------|------------|---------------|
| `choice` | An object mapping each option to a description (`null` lets the option name describe itself). 2 to 26 options | `choice`, `probabilities`, `confidence` |
| `noul` | Optional. `{"true": "...", "false": "..."}` to describe each side | `noul`, the probability that the answer is true |
| `score` | An array of level descriptions, lowest first. 2 to 26 levels | `score`, `legend`, `probabilities`, `confidence` |

`confidence` runs from 0 to 1 and shows how concentrated the probabilities are; it is not the chance that the answer is right.

### Example Request

```bash
curl http://your-deployment-url:11434/v1/systemone \
  -d '{
    "model": "clef:27b",
    "state": "I was charged twice. Please refund the extra payment.",
    "questions": {
      "team": {
        "type": "choice",
        "instructions": "Which team should handle this ticket?",
        "criteria": {
          "billing": "Payments and refunds",
          "technical": "Bugs and integrations",
          "other": "None of the above"
        }
      },
      "refund": {
        "type": "noul",
        "instructions": "Does the customer explicitly ask for a refund?"
      },
      "urgency": {
        "type": "score",
        "instructions": "How urgent is this ticket?",
        "criteria": ["Routine", "Soon", "Urgent"]
      }
    }
  }'
```

### Example Response

```json
{
  "model": "clef:27b",
  "answers": {
    "team": {
      "type": "choice",
      "choice": "billing",
      "probabilities": {"billing": 0.981, "technical": 0.013, "other": 0.006},
      "confidence": 0.924
    },
    "refund": {"type": "noul", "noul": 0.996},
    "urgency": {
      "type": "score",
      "score": 0.704,
      "legend": {"0": "Routine", "1": "Soon", "2": "Urgent"},
      "probabilities": {"0": 0.451, "1": 0.353, "2": 0.196},
      "confidence": 0.071
    }
  },
  "usage": {"input_tokens": 328, "output_tokens": 0}
}
```

For the Clef Flash variant, set `"model": "clef-flash:9b"`. The untagged names `clef` and `clef-flash` are not pulled by this template and return `404 model not found`.

See the Ollama library pages for [Clef](https://ollama.com/library/clef) and [Clef Flash](https://ollama.com/library/clef-flash) for more examples and benchmarks.
