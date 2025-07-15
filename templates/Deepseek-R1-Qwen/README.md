# DeepSeek R1 Qwen Models

High-performance inference API for DeepSeek R1 Qwen language models with multiple size options.

## Available Models

### 1.5B Model
- **Parameters**: 1.5 billion
- **VRAM Required**: 4 GB
- **Use Case**: Lightweight applications, testing, development

### 7B Model  
- **Parameters**: 7 billion
- **VRAM Required**: 14 GB
- **Use Case**: Balanced performance for most applications

### 14B Model
- **Parameters**: 14 billion  
- **VRAM Required**: 28 GB
- **Use Case**: High-performance applications requiring best quality

## Features

- OpenAI-compatible API endpoints
- Automatic model serving via vLLM
- Health checks for reliability
- Support for streaming and non-streaming responses

## Usage

The models are served on port 9000 with OpenAI-compatible endpoints:

- **Chat Completions**: `POST /v1/chat/completions`
- **Model Info**: `GET /v1/models`

## Model Details

All variants use the DeepSeek R1 distilled models optimized for inference performance while maintaining high quality outputs.