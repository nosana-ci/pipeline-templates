# Nanonets-OCR2-3B OCR Inference (VLLM)

High-performance OCR inference API for `nanonets/Nanonets-OCR2-3B` using VLLM.

## Model Overview

### 3B

- **Model**: nanonets/Nanonets-OCR2-3B
- **Parameters**: 3 billion
- **VRAM Required**: 10GB

### 1.5B

- **Model**: nanonets/Nanonets-OCR2-1.5B-exp
- **Parameters**: 1.5 billion
- **VRAM Required**: 8GB

## Features

- OpenAI-compatible API endpoints via VLLM
- Automatic model downloading and serving
- Health checks for reliability
- GPU acceleration for fast inference
- Support for large context windows (up to 30,000 tokens)

## Usage

The model is served on port 8000 with OpenAI-compatible endpoints:

- **Chat Completions**: `POST /v1/chat/completions`

### Example Request

```bash
curl https://your-deployment-url.node.k8s.prd.nos.ci/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "nanonets/Nanonets-OCR2-3B",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "image_url",
            "image_url": {
              "url": "https://i.imgur.com/8w5LtGV.jpeg"
            }
          },
          {
            "type": "text",
            "text": "Extract the car's license plate from the image. Please return the license in plain text."
          }
        ]
      }
    ],
    "temperature": 0.0,
    "max_tokens": 15000
  }'
```

## Model Details

`nanonets/Nanonets-OCR2-3B` is an open-source OCR model optimized for extracting text from images. It is ideal for:

- License plate recognition
- Document OCR
- Text extraction from photos
- Automated data entry

The model is automatically downloaded and served via VLLM, providing a robust and scalable inference platform with GPU acceleration.
