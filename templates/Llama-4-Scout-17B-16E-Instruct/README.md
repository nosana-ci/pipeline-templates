## Overview

This template deploys **Meta’s Llama 4 Scout**, an advanced open-source multimodal AI model, using **vLLM**. It provides an **OpenAI-compatible API**, facilitating seamless integration into AI-powered applications such as chatbots, virtual assistants, or content generators.

## Features

- **State-of-the-Art Multimodal Model**: Llama 4 Scout is part of Meta’s latest generation of AI models. The Llama 4 collection of models are natively multimodal AI models that enable text and multimodal experiences. These models leverage a mixture-of-experts architecture to offer industry-leading performance in text and image understanding. ([more information](https://huggingface.co/meta-llama/Llama-4-Maverick-17B-128E-Instruct#model-information))
- **OpenAI-Compatible API**: Offers an API on port **9000** that adheres to OpenAI standards for straightforward HTTP integration.
- **Efficient Inference**: Utilizes vLLM to deliver high throughput and low latency.
- **Optimized for GPU Acceleration**: Designed to run efficiently on a single **NVIDIA H100 GPU** with at least **48GB VRAM**.

## Deployment Guide

### **1. Deploy via Nosana Dashboard**

1. **Access the Nosana Dashboard**.
2. **Select the Llama 4 Scout template**.
3. **Deploy the container with your preferred GPU settings**.

### **2. Access the API**

After deployment, the Llama 4 Scout model will be accessible at port **9000**.

### **3. Send Requests to the API**

#### **Using cURL**

```bash
curl http://<DEPLOYMENT_IP>:9000/v1/completions \
  -H "Content-Type: application/json" \
  -d '{
        "model": "llama-4-scout",
        "prompt": "Write a short poem about AI.",
        "max_tokens": 100
      }'
```

#### **Using Python**

```python
import openai

client = openai.Client(
    base_url="http://<DEPLOYMENT_IP>:9000/v1"
)

response = client.chat.completions.create(
    model="llama-4-scout",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Write a short poem about AI."}
    ],
    max_tokens=100
)
print(response.choices[0].message.content)
```

**Note**: Replace `<DEPLOYMENT_IP>` with the actual IP address of your deployment. Ensure that the server is running and accessible at `http://<DEPLOYMENT_IP>:9000` before making API requests.

## Requirements

- **Hardware**: NVIDIA H100 GPU with at least 48GB VRAM.
- **Software**: vLLM framework for efficient model serving.
- **Access**: Hugging Face access token may be required to download the model weights.

By following this guide, you can deploy and interact with Meta's Llama 4 Scout model efficiently, leveraging its advanced multimodal capabilities for your AI applications.
