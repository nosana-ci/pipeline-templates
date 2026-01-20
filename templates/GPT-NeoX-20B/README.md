# GPT-NeoX-20B Deployment on Nosana

## Overview
This template deploys **GPT-NeoX-20B**, a powerful open-source language model, as an API using **vLLM**. It provides an **OpenAI-compatible API**, allowing seamless integration into applications requiring advanced text generation capabilities.

## Features
- **Powerful LLM**: GPT-NeoX-20B is an alternative to GPT-3, capable of high-quality text generation.
- **API-Accessible**: Exposes an OpenAI-compatible API on port **9000**.
- **Efficient Serving**: Uses vLLM for optimized inference performance.
- **GPU Acceleration**: Requires a **minimum of 24GB VRAM** for deployment (A100 recommended).

## Deployment Guide

### **1. Deploy via Nosana Dashboard**
1. **Go to Nosana Dashboard**.
2. **Select the GPT-NeoX-20B template**.
4. **Deploy the container**.

### **2. Access the API**
Once deployed, the model will be accessible via HTTP on port **9000**.

### **3. Send Requests to the API**

#### **Using cURL**
```bash
curl http://<DEPLOYMENT_IP>:9000/v1/completions \  
  -H "Content-Type: application/json" \  
  -d '{
        "model": "GPT-NeoX-20B",
        "prompt": "Once upon a time",
        "max_tokens": 100
      }'
```

```python
import requests

url = "http://<DEPLOYMENT_IP>:9000/v1/completions"
data = {
    "model": "GPT-NeoX-20B",
    "prompt": "Tell me a joke",
    "max_tokens": 50
}
response = requests.post(url, json=data)
print(response.json())
```

### **4. System requirements**

GPU: at least 24GB VRAM (for smoother performance 32GBA or 100 or better recommended)
Port: 9000 (exposed for API access)
