# Deploying Phi-2 on Nosana with vLLM

## Overview
This Nosana template deploys **Phi-2**, a small yet powerful **language model by Microsoft**, using **vLLM**. It provides an **OpenAI-compatible API**, making it easy to integrate into various applications for text generation, educational tools, and research.

## Features
- **Lightweight & Efficient** – Requires only **8GB VRAM**, making it accessible for consumer GPUs.
- **Optimized Serving** – Uses **vLLM** for high-performance inference.
- **OpenAI-Compatible API** – Works seamlessly with existing OpenAI-based applications.
- **Supports Long Context** – Handles up to **4096 tokens per request**.

## Deployment Guide

### **1. Deploy via Nosana Dashboard**
1. **Navigate to the Nosana Dashboard**.
2. **Select the Phi-2 template**.
3. **Deploy the container** with GPU acceleration.
4. **Wait for deployment completion** – the model will be available on port **9000**.

### **2. Access the API**
Once deployed, you can interact with Phi-2 using HTTP requests.

#### **Using cURL**
```bash
curl http://<DEPLOYMENT_IP>:9000/v1/completions \
  -H "Content-Type: application/json" \
  -d '{
        "model": "Phi-2",
        "prompt": "Explain black holes in simple terms.",
        "max_tokens": 200
      }'
```

```python 
import requests

url = "http://<DEPLOYMENT_IP>:9000/v1/completions"
data = {
    "model": "Phi-2",
    "prompt": "Write a short story about AI.",
    "max_tokens": 200
}
response = requests.post(url, json=data)
print(response.json())
```