# Qwen 3.5 Models

High-performance inference API for Qwen 3.5 language models served via vLLM with OpenAI-compatible endpoints.

## Available Models

### 0.8B Model
- **Parameters**: 0.8 billion
- **VRAM Required**: ~4 GB
- **Use Case**: Lightweight applications, testing, development

### 4B Model
- **Parameters**: 4 billion
- **VRAM Required**: ~12 GB
- **Use Case**: Good balance of speed and quality for general tasks

### 9B Model
- **Parameters**: 9 billion
- **VRAM Required**: ~22 GB
- **Use Case**: Strong general performance for most applications

### 27B Model
- **Parameters**: 27 billion
- **VRAM Required**: ~58 GB
- **Use Case**: Highest quality dense model, requires high-end GPU

### 27B AWQ 4-bit Model
- **Parameters**: 27 billion (AWQ 4-bit quantized)
- **VRAM Required**: ~20 GB
- **Use Case**: Near full-model quality with significantly reduced VRAM footprint

## Features

- OpenAI-compatible API endpoints
- Automatic model serving via vLLM
- Health checks for reliability
- Support for streaming and non-streaming responses
- Tool calling support via `qwen3_coder` parser
- Reasoning/thinking mode via `qwen3` parser
- AWQ quantization option for efficient 27B serving

## Usage

The models are served on port 9000 with OpenAI-compatible endpoints:

- **Chat Completions**: `POST /v1/chat/completions`
- **Model Info**: `GET /v1/models`

## Model Details

Qwen 3.5 is the latest generation of Qwen models from Alibaba, featuring dense models from 0.8B to 27B parameters. All models support 256K context length (limited by VRAM in practice) and 201 languages. The `--language-model-only` flag is used to run text-only inference, as the base models are multimodal.
