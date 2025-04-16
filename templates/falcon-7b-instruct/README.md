# 🚀 Falcon-7B-Instruct API Deployment on Nosana

This project deploys the **Falcon-7B-Instruct** model (`tiiuae/falcon-7b-instruct`) using **vLLM** and serves it via an **OpenAI-compatible API** on **Nosana**. It's optimized for text generation and instruction-following tasks with low-latency performance and GPU acceleration.

## 🔧 Requirements

- **Nosana Runner**
- GPU with at least **16 GB VRAM**
- Docker installed and authenticated (if testing locally)
- Internet access for model download

---

## 📦 Template Overview

This Nosana template launches a container that:
- Pulls the official `vllm/vllm-openai` Docker image.
- Runs the Falcon 7B Instruct model via `vLLM`.
- Exposes the OpenAI-compatible API at `http://localhost:9000/generate` or `http://localhost:9000/v1/chat/completions` and many more can check out [OpenAI-compatible-API](https://platform.openai.com/docs/api-reference).
---

## 🧠 Model Details

- **Model Name**: `tiiuae/falcon-7b-instruct`
- **Engine**: vLLM
- **API**: OpenAI-compatible (`/v1/chat/completions`)
- **Precision**: FP16 (automatic with vLLM)
- **GPU Usage**: Optimized with paged KV cache and Flash Attention

---

```python
import requests

url = "http://localhost:9000/generate"
headers = {
    "Content-Type": "application/json"
}
data={
  "prompt": "Tell me some cool fact about giraffe that hardly anyone knows.",
  "temperature": 0.8,
  "max_tokens": 150
}
response = requests.post(url, headers=headers, json=data)

print("Status code:", response.status_code)
print("Response:")
print(response.json())
```

**Response I got:** 
<pre>
Giraffes are the only other living animal with two thumbs! Their thumbs are on the tips of their forefingers.They can lift up to 15 lbs! They can also move their thumbs backwards and forwards like a piano.They also have a special soft spot on their thumb that serves as a pouch for their loin cloth! Do you think so? Here are 20 more incredible facts about this beautiful, strange, and playful mammal.Giraffes have hair on their bodies, but their upper body is covered in a long, slender coat of hair called the mane.
</pre>



```python
import requests



url = "http://localhost:9000/v1/chat/completions"
headers = {
    "Content-Type": "application/json"
}
payload = {
    "model": "tiiuae/falcon-7b-instruct",
    "messages": [
        {"role": "user", "content": "Explain the concept of deep learning in simple terms."}
    ],
    "max_tokens": 200,
    "temperature": 0.7
}

response = requests.post(url, headers=headers, json=payload)

print("Status code:", response.status_code)
print("Response:")
print(response.json())
```

**Response:**
Status code: 200
Response:
```json
{'id': "chatcmpl-ebd7c89867b641cab27061c56e97b982", 'object': 'chat.completion', 'created': 1743926842, 'model': 'tiiuae/falcon-7b-instruct', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'reasoning_content': None, 'content': " Deep learning is a type of machine learning that uses multiple layers of artificial neurons to learn from data. In simple terms, it is a network of neurons that learn and adapt to new data. Each layer of neurons takes the previous layer's output and adds some new information. This allows the model to create and learn complex patterns in the data. By using multiple layers and neurons, deep learning can learn complex tasks such as image recognition, natural language processing, and machine vision.\nUser ", 'tool_calls': []}, 'logprobs': None, 'finish_reason': 'stop', 'stop_reason': None}], 'usage': {'prompt_tokens': 18, 'total_tokens': 117, 'completion_tokens': 99, 'prompt_tokens_details': None}, 'prompt_logprobs': None}
```
