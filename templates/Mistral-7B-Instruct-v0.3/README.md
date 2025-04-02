# Mistral-7B-Instruct-v0.3 Deployment on Nosana

## Overview

This template facilitates the deployment of **Mistral-7B-Instruct-v0.3**, a 7.3-billion-parameter language model fine-tuned for instruction-following tasks, as an API using **vLLM** on the **Nosana** platform. The deployment provides an **OpenAI-compatible API**, enabling seamless integration into applications requiring advanced text generation capabilities.

## Features

- **Instruction-Following**: Optimized to effectively follow instructions, enhancing language generation and understanding capabilities.
- **Extended Vocabulary**: Supports a vocabulary of 32,768 tokens for improved text generation.
- **Function Calling**: Capable of function calling, allowing for dynamic interactions.
- **API Accessibility**: Exposes an OpenAI-compatible API on port **9000**.
- **Efficient Serving**: Utilizes **vLLM** for optimized inference performance.
- **GPU Acceleration**: Requires a **minimum of 16GB VRAM** for deployment (A100 recommended).

## Deployment Guide

### **1. Deploy via Nosana Dashboard**

1. **Go to Nosana Dashboard**.
2. **Select the Mistral-7B-Instruct-v0.3 template**.
3. **Deploy the container**.

### **2. Access the API**

Once deployed, the model will be accessible via HTTP on port **9000**.

### **3. Send Requests to the API**

#### **Using cURL**

```bash
curl http://<DEPLOYMENT_IP>:9000/v1/completions \
  -H "Content-Type: application/json" \
  -d '{
        "model": "Mistral-7B-Instruct-v0.3",
        "prompt": "Once upon a time",
        "max_tokens": 100
      }'
```

#### **Using Python Requests**

```python
import requests

url = "http://<DEPLOYMENT_IP>:9000/v1/completions"
data = {
    "model": "Mistral-7B-Instruct-v0.3",
    "prompt": "Tell me a joke",
    "max_tokens": 50
}
response = requests.post(url, json=data)
print(response.json())
```

### **4. System Requirements**

- **GPU**: At least **16GB VRAM** (for smoother performance, **32GB VRAM** or **A100** or better recommended).
- **Port**: Ensure that port **9000** is exposed for API access.

## Nosana Job Run Template

Below is the Nosana job run template for deploying Mistral-7B-Instruct-v0.3:
You can copy and paste this in json input at https://dashboard.nosana.com/jobs/create too.

```json
{
  "ops": [
    {
      "id": "Mistral-7B-Instruct-v0.3",
      "args": {
        "cmd": [
          "bash -c 'apt update && apt install -y git && pip install transformers huggingface_hub && python3 -m vllm.entrypoints.openai.api_server --model mistralai/Mistral-7B-Instruct-v0.3 --port 9000'"
        ],
        "gpu": true,
        "image": "vllm/vllm-openai:latest",
        "expose": 9000,
        "resources": [
          {
            "url": "https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.3",
            "type": "S3",
            "target": "/models/mistral-7b-instruct-v0.3",
            "allowWrite": false
          }
        ]
      },
      "type": "container/run"
    }
  ],
  "meta": {
    "trigger": "dashboard",
    "system_requirements": {
      "required_vram": 16
    }
  },
  "type": "container",
  "version": "0.1"
}
```

**Note**: The Mistral-7B-Instruct-v0.3 model does not include moderation mechanisms. Use with caution in environments requiring moderated outputs.
