# TinyLLaMA API (via vLLM)

A lightweight, OpenAI-compatible API server running [TinyLlama-1.1B-Chat-v0.3-AWQ](https://huggingface.co/TheBloke/TinyLlama-1.1B-Chat-v0.3-GPTQ) using the blazing-fast [vLLM](https://github.com/vllm-project/vllm) inference engine.  
Deployable on lightweight GPUs (as low as 6GB VRAM), making it ideal for edge deployments, AI assistants, educational tools, and text generation APIs.

---

## Usage 

```python
http://<nosana-host>:9000/generate
import requests

url = "http://localhost:9000/generate"
headers = {
    "Content-Type": "application/json"
}
data={
  "prompt": "You are an expert AI tutor. Answer the following clearly:\n\nWhat is deep learning?\n\nAns>  "temperature": 0.8,
  "max_tokens": 150
}

response = requests.post(url, headers=headers, json=data)

print("Status code:", response.status_code)
print("Response:")
print(response.json())
``` 
Tested response : 
<pre style="white-space: pre-wrap;">
You are an expert AI tutor. Answer the following clearly:
What is deep learning?
Answer:Deep learning is a subset of artificial intelligence that deals with tasks that require the model to process and understand very large amounts of data, such as image classification, text classification, natural language processing, and robotics. Deep learning is based on the idea that the model should be able to learn patterns and relationships from unlabeled data, much like how our brains learn. 
To apply deep learning to specific tasks, researchers develop a neural network that is composed of many interconnected layers of computationally expensive processing units called neurons. These neurons are trained to perform a specific task, such as recognizing images or predicting text. The network can then be fine-tuned to perform specific tasks by feeding
</pre>

```bash
curl http://<nosana-host>:9000/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model": "tinyllama",
    "prompt": "Give me a startup idea involving LLMs.",
    "max_tokens": 60
  }'
```

## Features

- Runs **TinyLLaMA-1.1B-Chat** with ~1.1B parameters  
- **OpenAI-compatible** API (`/generate`)  
- Powered by **vLLM** for fast, parallel inference  
- No external keys required (fully self-hosted)  
- Optimized for deployment via Nosana  

---

## About TinyLLaMA

TinyLLaMA is a 1.1B-parameter language model trained by the TinyLLaMA team. It's trained on a high-quality dataset and tuned for chat-style instruction following. Despite its small size, it's surprisingly capable and perfect for:

- Chatbots  
- Educational assistants  
- Prompt-based tools  
- Lightweight inference services  

Model: [`https://huggingface.co/TheBloke/TinyLlama-1.1B-Chat-v0.3-AWQ`]

---
