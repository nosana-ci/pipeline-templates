# LocalAI Server

High-performance LocalAI server with enterprise-grade open-source models for multiple AI tasks. This template provides an OpenAI-compatible API server that runs entirely on local hardware.

## Key Features
- OpenAI-compatible API endpoints
- Web UI for model management and testing
- Access to 900+ open source AI models
- GPU acceleration support
- Multi-modal capabilities

## Included Models
### Text Generation (Default)
- Mixtral-8x7B-Instruct
  * 8x7B mixture-of-experts architecture
  * Strong reasoning capabilities
  * 32k context window
    
### Image Generation
- SDXL-Turbo
  * Ultra-fast inference
  * 1024x1024 resolution
  * High-quality outputs

### Text-to-Speech
- XTTS v2
  * Multi-lingual support
  * Natural prosody
  * Voice cloning capability

### Speech Recognition
- Whisper Large V3
  * 99 language support
  * Best-in-class accuracy
  * Robust noise handling

## Model Management
- Built-in model browser with 900+ models
- Easy model download through web UI
- Support for custom model imports
- Compatible with GGUF, ONNX formats

### Runtime Model Loading
You can add custom models during runtime on top of the default included models:

1. **Through Web UI**:
   - Navigate to "Models" section in the navbar
   - Browse available models from galleries
   - Click "Install" on desired models

2. **Through API**:
```bash
curl http://localhost:8080/models/apply \
    -H "Content-Type: application/json" \
    -d '{
        "url": "<MODEL_CONFIG_URL>",
        "name": "custom-model-name"
    }'
```

3. **Through Environment Variable**:
You can preload additional models at startup within job definition by adding the `PRELOAD_MODELS` environment variable:
```json
PRELOAD_MODELS='[
  {
    "url": "github:mudler/LocalAI/gallery/gpt4all-j.yaml",
    "name": "custom-gpt4"
  }
]'
```

Note: Custom models must be in GGUF format for compatibility with LocalAI's llama.cpp backend. You can convert other formats to GGUF using tools like:
- llama.cpp's conversion scripts
- HuggingFace's transformers library
- TheBloke's model conversions

## System Requirements
- GPU: NVIDIA GPU required
- VRAM: 24GB recommended
- CUDA: Version 12.x

## API Examples

### Text Generation
```bash
curl http://localhost:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "mixtral-instruct",
    "messages": [
      {
        "role": "system",
        "content": "You are an expert software engineer with deep knowledge of algorithms and system design."
      },
      {
        "role": "user",
        "content": "Write a Python function that implements a binary search algorithm. Include detailed comments explaining the time complexity and how the algorithm works."
      }
    ],
    "temperature": 0.7,
    "top_p": 0.9
  }'
```

### Image Generation
```bash
    curl http://localhost:8080/v1/images/generations \
    -H "Content-Type: application/json" \
    -d '{
        "model": "sdxl-turbo",
        "prompt": "A beautiful landscape"
    }'
```

### Text-to-Speech
```bash
curl http://localhost:8080/v1/audio/speech \
  -H "Content-Type: application/json" \
  -d '{
    "model": "xtts-v2",
    "input": "Hello, this is a test."
  }' \
  --output speech.wav
```

### Speech Recognition
```bash
curl http://localhost:8080/v1/audio/transcriptions \
  -H "Content-Type: multipart/form-data" \
  -F "model=whisper-large" \
  -F "file=@audio.mp3"
```

## Web Interface Features
- Interactive model testing
- Real-time API response viewing
- Model download manager
- System performance monitoring
- API documentation browser

## Additional Resources
- [LocalAI Documentation](https://localai.io/)
- [Model Gallery](https://localai.io/models/)
- [API Reference](https://localai.io/api/)
- [Integrations](https://localai.io/docs/integrations/)
- [Open LLM Leaderboard](https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard)

Tested the job definition in this Job ID: [4a8d6ytFZXXPc4U9WsnPLN3FduWCvBj28Y3SbTfv1MxL](https://dashboard.nosana.com/jobs/4a8d6ytFZXXPc4U9WsnPLN3FduWCvBj28Y3SbTfv1MxL)
## Screenshot/Video
https://pasteboard.co/mtQDvtlashjJ.png