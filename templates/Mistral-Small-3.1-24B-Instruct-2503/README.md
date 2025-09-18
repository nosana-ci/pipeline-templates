# Mistral-Small-3.1-24B-Instruct-2503 Deployment on Nosana

## Overview

This template facilitates the deployment of **Mistral-Small-3.1-24B-Instruct-2503**, a 24-billion-parameter language model fine-tuned for instruction-following tasks, as an API using **vLLM** on the **Nosana** platform. The deployment provides an **OpenAI-compatible API**, enabling seamless integration into applications requiring advanced text and vision generation capabilities.

## Features

- **Instruction-Following**: Optimized to effectively follow instructions, enhancing language generation and understanding capabilities.
- **Multimodal Support**: Incorporates state-of-the-art vision understanding, allowing for both text and image inputs.
- **Extended Context Window**: Capable of handling contexts up to 128k tokens without compromising performance.
- **API Accessibility**: Exposes an OpenAI-compatible API on port **9000**.
- **Efficient Serving**: Utilizes **vLLM** for optimized inference performance.
- **GPU Acceleration**: Requires a **minimum of 24GB VRAM** for deployment (A100 recommended).

## Deployment Guide

### **1. Deploy via Nosana Dashboard**

1. **Go to Nosana Dashboard**.
2. **Select the Mistral-Small-3.1-24B-Instruct-2503 template**.
3. **Deploy the container**.

### **2. Access the API**

Once deployed, the model will be accessible via HTTP on port **9000**.

### **3. Send Requests to the API**

#### **Using cURL**

```bash
curl http://<DEPLOYMENT_IP>:9000/v1/completions \
  -H "Content-Type: application/json" \
  -d '{
        "model": "Mistral-Small-3.1-24B-Instruct-2503",
        "prompt": "Once upon a time",
        "max_tokens": 100
      }'
```

#### **Using Python Requests**

```python
import requests

url = "http://<DEPLOYMENT_IP>:9000/v1/completions"
data = {
    "model": "Mistral-Small-3.1-24B-Instruct-2503",
    "prompt": "Tell me a joke",
    "max_tokens": 50
}
response = requests.post(url, json=data)
print(response.json())
```

### **4. System Requirements**

- **GPU**: At least **24GB VRAM** (for smoother performance, **A100** or better recommended).
- **Port**: Ensure that port **9000** is exposed for API access.

## Nosana Job Run Template

Below is the Nosana job run template for deploying Mistral-Small-3.1-24B-Instruct-2503:
You can copy and paste this in JSON input at https://dashboard.nosana.com/jobs/create too.

```json
{
  "ops": [
    {
      "id": "Mistral-Small-3.1-24B-Instruct-2503",
      "args": {
        "cmd": [
          "bash -c 'apt update && apt install -y git && pip install transformers huggingface_hub && python3 -m vllm.entrypoints.openai.api_server --model mistralai/Mistral-Small-3.1-24B-Instruct-2503 --port 9000'"
        ],
        "gpu": true,
        "image": "vllm/vllm-openai:latest",
        "expose": 9000,
        "resources": [
          {
            "url": "https://huggingface.co/mistralai/Mistral-Small-3.1-24B-Instruct-2503",
            "type": "S3",
            "target": "/models/mistral-small-3.1-24b-instruct-2503",
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
      "required_vram": 24
    }
  },
  "type": "container",
  "version": "0.1"
}
```

**Note**: The Mistral-Small-3.1-24B-Instruct-2503 model does not include moderation mechanisms. Use with caution in environments requiring moderated outputs.
