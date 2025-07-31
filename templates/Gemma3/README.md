# Gemma 3 Models

Google's Gemma 3 instruction-tuned language models with quantization optimization via Ollama.

## Available Models

### 4B IT QAT
- **Parameters**: 4 billion
- **VRAM Required**: 4 GB
- **Use Case**: Lightweight applications with good performance

### 12B IT QAT  
- **Parameters**: 12 billion
- **VRAM Required**: 9 GB
- **Use Case**: Balanced performance for most applications

### 27B IT QAT
- **Parameters**: 27 billion
- **VRAM Required**: 18 GB
- **Use Case**: High-performance applications requiring best quality

## Features

- **Instruction Tuned**: Optimized for following instructions and conversation
- **Quantized (QAT)**: Quantization-aware training for efficient inference
- **OpenAI-compatible API**: Served via Ollama with standard endpoints
- **Automatic Model Download**: Models pulled automatically on startup

## Usage

The models are served on port 11434 with OpenAI-compatible endpoints:

- **Chat Completions**: `POST /v1/chat/completions`
- **Generate**: `POST /api/generate`
- **Model Info**: `GET /api/tags`

## Model Details

All variants use quantization-aware training (QAT) to maintain high quality while reducing memory requirements. The models are optimized for instruction following and conversational AI tasks.