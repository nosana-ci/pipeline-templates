# 🧠 Mixtral8x22B 

## Overview
This template deploys **Mixtral8x22B**, a state-of-the-art large language model developed by Mistral AI, using **Ollama** inside a GPU container on **Nosana**. It utilizes a mixture-of-experts (MoE) architecture, allowing for efficient scaling and improved performance compared to traditional dense models. With its impressive capabilities and open-source nature, Mixtral 8x22B has garnered significant attention in the AI community.s

## Features
- 🌐 **API-Based Access**: Ollama API served locally on port **11434**.
- ⚡ **Ollama Runtime**: Lightweight deployment and fast startup.
- 🎮 **GPU-Accelerated**: Requires at least **300GB VRAM** (Higher recommended).

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

#### Note 
Without quantization this model would require 300GB of vram
but can be used by using bit quantization in 48Gb also.
This model is the instruct model which will require 300GB of vram but you can tweak this template just a change in name from mixtral:8x22b to quantized model you want to use.
---

## **2. Send Requests to the API**

#### 📝 **Text Prompt via cURL**
```bash
curl url:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{
        "model": "mixtral:8x22b",
        "prompt": "Write a poem about the beauty of nature.",
        "stream": false
      }'
```
Here url is determined by user, how he supposed to use it via port forwarding or host it using ngrok.
For me I use ssh : so url is http://127.0.0.1
#### Response that I got
```text
   The sun ascends, a golden hue,
   Painting the sky a vibrant blue.
   The wind whispers through the trees,
   A gentle dance of summer breeze.

   The river flows, a silver thread,
   Reflecting clouds above its bed.
   The flowers bloom, in colors bright,
   A tapestry of pure delight.
```

**Not only this it supports much more api endpoints and parameters check out ollama and Mixtral8x7B docs for different endpoints**



## Parameters and arguments

There are so many arguments that you can give while making POST request to the endpoint, check that out in docs of Mixtral8x22B and ollama.

Check it out: [Github](https://github.com/ollama/ollama/blob/main/docs/api.md)






