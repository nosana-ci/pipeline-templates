# Nosana Pipeline Templates - Dockerfiles

This directory contains Dockerfiles for building custom images used by the supported Nosana pipeline templates.

## ✅ PyTorch Base Images

Most custom Dockerfiles use the PyTorch base image that supports every modern
NVIDIA GPU:

```dockerfile
FROM pytorch/pytorch:2.7.1-cuda12.8-cudnn9-runtime
```

**Features:**
- Pre-compiled kernels for SM 100 (Blackwell B100/B200) **and** SM 120 (RTX 50-series)
- Supports all earlier architectures (sm_50 … sm_90)
- Works on hosts with NVIDIA driver ≥ 525.x (R570+ recommended)

`Dockerfile.comfyui` is the exception and uses a CUDA 13 base:

```dockerfile
FROM pytorch/pytorch:2.13.0-cuda13.0-cudnn9-runtime
```

comfy-kitchen's optimized CUDA and triton backends, and ComfyUI's DynamicVRAM,
disable themselves on cu128 or on torch below 2.8 — quantized models then run
the eager path throughout. **This base requires an r580+ driver**, so it is a
narrower host requirement than the cu128 image above.

## Supported Template Dockerfiles

### Development Environments
- `Dockerfile.pytorch-jupyter` - PyTorch Jupyter Notebook environment
- `Dockerfile.tensorflow-jupyter` - TensorFlow Jupyter Notebook environment  
- `Dockerfile.vscode-server` - Browser-based VS Code environment
- `Dockerfile.rstudio` - RStudio Server for R development

### AI/ML Inference & Generation
- `Dockerfile.comfyui` - ComfyUI for node-based image generation
- `Dockerfile.oobabooga` - Oobabooga text-generation-webui
- `Dockerfile.invokeai` - InvokeAI for Stable Diffusion image generation
- `Dockerfile.whisper-asr` - OpenAI Whisper speech recognition API

### Training & Fine-tuning
- `Dockerfile.llama-factory` - LLaMA Factory for LLM fine-tuning

## Building Images

To build any of these images:

```bash
# Example: Build PyTorch Jupyter image
docker build -f Dockerfile.pytorch-jupyter -t nosana/pytorch-jupyter:latest .

# Example: Build ComfyUI image  
docker build -f Dockerfile.comfyui -t nosana/comfyui:latest .
```

## Templates Using Public Images

The following supported templates use public images and don't require custom Dockerfiles:

- **DeepSeek R1 models** (6 templates) - Use `vllm/vllm-openai:v0.9.2`
- **Gemma models** (3 templates) - Use `ollama/ollama:0.20.0`
- **Open WebUI** - Uses `ghcr.io/open-webui/open-webui:ollama`

## GPU Compatibility

All images support:
- **Ampere** (RTX 30-series): RTX 3060, 3070, 3080, 3090, A100, etc.
- **Ada Lovelace** (RTX 40-series): RTX 4060, 4070, 4080, 4090, etc.
- **Blackwell** (B-series & RTX 50-series): B100, B200, RTX 5090, etc.

## Notes

- All custom images include the latest security updates and optimizations
- Images are designed for production deployment on the Nosana network
- Each Dockerfile follows the universal base image pattern for maximum compatibility