# Llama 3.1 Deployment on Nosana

## Overview
This template deploys **Meta’s Llama 3.1**, one of the most advanced open-source large language models, using **vLLM**. It provides an **OpenAI-compatible API**, making it easy to integrate into AI-powered applications such as chatbots, assistants, or code generators.

## Features
- **Cutting-edge LLM**: Llama 3.1 is part of Meta’s new generation of language models, known for its high performance on reasoning and conversation tasks.
- **API-Accessible**: Offers an OpenAI-compatible API on port **9000** for simple HTTP integration.
- **Fast Inference**: Powered by vLLM for high throughput and low latency.
- **GPU Optimized**: Requires a **minimum of 48GB VRAM** (A100 80GB or better recommended for full 70B model).

## Deployment Guide

### **1. Deploy via Nosana Dashboard**
1. **Go to the Nosana Dashboard**.
2. **Select the Llama 3.1 template**.
3. **Deploy the container with your preferred GPU settings**.

### **2. Access the API**
After deployment, the Llama 3.1 model will be reachable at port **9000**.

### **3. Send Requests to the API**

#### **Using cURL**
```bash
curl http://<DEPLOYMENT_IP>:9000/v1/completions \
  -H "Content-Type: application/json" \
  -d '{
        "model": "llama-3.1",
        "prompt": "Write a short poem about AI.",
        "max_tokens": 100
      }'
