# Gender Classification

Vision Transformer model for binary gender classification (male/female).

## Specs

- 85.8M parameters
- 92.4% accuracy
- PyTorch/Transformers

## Features

- 85.8M parameter ViT model
- 92.4% accuracy on gender detection
- Classifies images into male/female categories
- Fast inference with minimal resource requirements

## Running the Model

This container provides a REST API endpoint for gender classification:

```bash
# Example API call
curl -X POST \
  http://localhost:9000/predict \
  -H 'Content-Type: application/json' \
  -d '{"image_url": "https://example.com/image.jpg"}'
```

## Hardware Requirements

- GPU with 4GB VRAM (recommended)
- 4GB system RAM

## Requirements

- NVIDIA GPU (recommended for inference)
- 4GB RAM minimum
- PyTorch environment with Transformers library

## Usage

The model can be used for various applications such as user analytics, content personalization, or demographic studies where gender detection is required.

## License

Please refer to the model card on Hugging Face for licensing information 