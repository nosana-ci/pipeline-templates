# 🧠 Mixtral8x22B 

## Overview
This template deploys **Mixtral8x22B**, a state-of-the-art large language model developed by Mistral AI, using **Ollama** inside a GPU container on **Nosana**. It utilizes a mixture-of-experts (MoE) architecture, allowing for efficient scaling and improved performance compared to traditional dense models. With its impressive capabilities and open-source nature, Mixtral 8x22B has garnered significant attention in the AI community.s

## Features
- 🌐 **API-Based Access**: Ollama API served locally on port **11434**.
- ⚡ **Ollama Runtime**: Lightweight deployment and fast startup.
- 🎮 **GPU-Accelerated**: Requires at least **24GB VRAM** (Higher recommended).

---

## Deployment Guide

### **1. Deploy via Nosana Dashboard**
1. Open the [Nosana Dashboard](https://dashboard.nosana.io).
2. Select the **Mixtral8x22B** template.
3. Click deploy. **Yep that's it!!** 
---

## Usage Guide

Once the deployment is active, the model can be accessed via:
1. Default it runs on the port 11434 (default port of ollama)
2. You can change it and tweak a template expose=PORT that you want. 

---

## **2. Send Requests to the API**

#### 📝 **Text Prompt via cURL**
```python
import requests

payload= {
    "model": "mixtral:8x22b",
    "prompt": "Write a beautiful poem conveying a deep message, it should be short.",
    "stream": False
}
response=requests.post(
    url="http://127.0.0.1:11434/api/generate",
    json=payload,
)
print(response.json()["response"])
```
Here url is determined by user, how he supposed to use it via port forwarding or host it using ngrok.
For me I use ssh : so url is http://127.0.0.1
#### Response that I got
```text
 In the heart of twilight's gentle hush,
A whisper sings, both soft and lush,
"Within each dawn, there lies a dusk,
In every seed, the strength to thrust."

From fleeting stars and fading bloom,
The silent truth does sweetly loom,
Embrace life's dance of light and shade,
For in its end, your joy is made
```

**Not only this it supports much more api endpoints and parameters check out ollama and Mixtral8x22B docs for different endpoints**


## Parameters and arguments

There are so many arguments that you can give while making POST request to the endpoint, check that out in docs of Mixtral8x22B and ollama.

Check it out: [Github](https://github.com/ollama/ollama/blob/main/docs/api.md)






