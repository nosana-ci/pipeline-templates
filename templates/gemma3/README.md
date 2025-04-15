# Gemma 3 API Server

This template runs the Gemma 3 model using `vllm.entrypoints.openai.api_server` with OpenAI-compatible API endpoints.

## What it does

- Loads the Gemma 3 model from a Docker image.
- Serves the model via HTTP on port `9000`.
- Uses GPU acceleration.

## Parameters

- **Model**: `docker.io/docker/gemma3`
- **Served Name**: `Gemma-3`
- **Port**: `9000`
- **Max Tokens**: `34000`

## Requirements

- GPU with at least 60GB VRAM (e.g., A100 80GB or higher)
- Docker runtime