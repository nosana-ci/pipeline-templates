# DeepSeek R1 Llama Models

High-performance inference API for DeepSeek R1 Llama language models with multiple size options.

## Available Models

### 8B Model
- **Parameters**: 8 billion
- **VRAM Required**: 16 GB
- **Use Case**: Balanced performance for most applications

### 70B AWQ Model
- **Parameters**: 70 billion (with AWQ quantization)
- **VRAM Required**: 40 GB
- **Use Case**: High-performance applications with reduced memory footprint

## Features

- OpenAI-compatible API endpoints
- Automatic model serving via vLLM
- Health checks for reliability
- Support for streaming and non-streaming responses
- AWQ quantization for efficient large model serving

## Usage

The models are served on port 9000 with OpenAI-compatible endpoints:

- **Chat Completions**: `POST /v1/chat/completions`
- **Model Info**: `GET /v1/models`

## Model Details

The Llama variants use the DeepSeek R1 distilled models optimized for inference performance. The 70B model includes AWQ quantization for efficient serving while maintaining high quality outputs.