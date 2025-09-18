# Description
This template provides an OpenAI-compatible API server for the Mistral AI's Codestral-22B-v0.1 model, optimized for performance using vLLM.

## Key Features
- High-performance inference with vLLM
- OpenAI-compatible API
- Supports 52 major programming languages
- Instruction-tuned for better responses
- Optimized for GPU acceleration

## Model Details

- **Name**: codestral-22B-v0.1
- **Base Model**: mistralai/codestral-22B-v0.1
- **Size**: 22 billion parameters
- **Context Length**: 128,000 tokens

## Configuration
- Port: 9000
- GPU: Required (20GB VRAM)
- Hugging Face token: Required

## Usage
You can directly write prompts on the mistral-chat interface:

```sh
Write me a function that computes fibonacci in Rust
```

## License
The model is available under the [Mistral AI Non-Production License](https://mistral.ai/static/licenses/MNPL-0.1.md).