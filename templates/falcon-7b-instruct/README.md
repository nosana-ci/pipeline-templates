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
- Exposes the OpenAI-compatible API at `http://localhost:9000/generate`.

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