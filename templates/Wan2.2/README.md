# Wan 2.2 Text-to-Video

Powerful text-to-video generation using Wan 2.2 model via ComfyUI interface.

## Available Models

### Wan 2.2 Flux FP8
- **VRAM Required**: 28 GB+
- **Use Case**: High-quality text-to-video generation
- **Models**: 
  - Wan 2.2 T2V 14B FP8 (low noise and high noise variants)
  - Wan 2.1 VAE
  - UMT5 XXL FP8 text encoder

## Features

- **Text-to-Video Generation**: Create videos from text prompts
- **Node-Based Interface**: ComfyUI visual workflow editor
- **Web UI**: Access via port 8188
- **Pre-loaded Models**: Models automatically downloaded from HuggingFace
- **FP8 Optimization**: Efficient FP8 quantization for faster inference
- **API Support**: RESTful API for automation

## Usage

1. Access the ComfyUI web interface at port 8188
2. Create or load workflows using the node editor
3. Configure text-to-video generation parameters
4. Queue and execute video generation tasks

## Model Details

The template includes:
- **Diffusion Models**: Wan 2.2 T2V 14B FP8 scaled models (low and high noise variants)
- **VAE**: Wan 2.1 VAE for encoding/decoding
- **Text Encoder**: UMT5 XXL FP8 for text understanding

All models are automatically downloaded from the Comfy-Org HuggingFace repositories.