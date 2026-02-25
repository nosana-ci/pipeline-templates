# Phi-3-mini-4k-instruct
Phi-3-mini-4k-instruct instruction-tuned model (3.8B parameters) served via vLLM with an OpenAI-compatible API endpoint on Nosana.

## Overview
The Phi-3-mini-4k-instruct model, developed by Microsoft, is a lightweight, efficient language model optimized for instruction-following tasks. With 3.8 billion parameters and a 4k token context length, it’s ideal for applications like chatbots, task automation, and lightweight inference, especially on resource-constrained environments.

This template deploys the model on Nosana’s decentralized GPU network using vLLM, providing an OpenAI-compatible API for seamless integration into your applications.

## Key Features
- **Efficient Inference**: Powered by vLLM for high-performance inference.
- **OpenAI-Compatible API**: Easily integrate with tools and libraries that support the OpenAI API format.
- **3.8B Parameter Model**: Lightweight model with a 4k token context length.
- **Instruction-Tuned**: Optimized for following user instructions and providing accurate responses.
- **GPU Acceleration**: Designed for GPU deployment on Nosana’s NVIDIA-3090 market.
- **Low Resource Usage**: Suitable for smaller GPUs compared to larger models.

## Configuration
- **Port**: 9000
- **GPU**: Required (minimum 8GB VRAM recommended)
- **Model**: `microsoft/Phi-3-mini-4k-instruct`
- **Context Length**: 4,000 tokens
- **Hugging Face Token**: Required (for accessing the model from Hugging Face)

## Prerequisites
Before deploying, ensure you have the following:
- **Nosana CLI**: Install via `npm install -g @nosana/cli`.
- **Node.js**: Version 18 or higher.
- **Wallet Funds**: At least 0.05 SOL and sufficient NOS tokens (e.g., $0.192/hour for the NVIDIA-3090 market).
- **Hugging Face Token**: Required to access the model. Set it as an environment variable (`HF_TOKEN`) or pass it during deployment.

## Deployment on Nosana
1. **Save the Job Definition**: Use the provided `phi3-mini-4k-instruct-job-definition.json` file (see the [Job Definition](#job-definition) section).
2. **Deploy the Model**:
   ```bash
   npx @nosana/cli job post \
     --file ./phi3-mini-4k-instruct-job-definition.json \
     --market nvidia-3090 \
     --timeout 60
