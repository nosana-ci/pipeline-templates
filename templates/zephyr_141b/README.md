# 🧠 Zephyr:141B

## Overview
This template deploys **Zephyr:141B**, using **Ollama** inside a GPU container on **Nosana**. Zephyr is a series of language models that are trained to act as helpful assistants. Zephyr 141B-A35B is the latest model in the series, and is a fine-tuned version of Mixtral 8x22b. zephyr:141b: A Mixture of Experts (MoE) model with 141B total parameters and 35B active parameters.

## Features
- 🌐 **API-Based Access**: ollama-like API served locally on port **11434**.
- ⚡ **Ollama Runtime**: Lightweight deployment and fast startup.
- 🎮 **GPU-Accelerated**: Requires at least **24GB VRAM** (A100 or higher recommended).

---


## Deployment Guide

### **1. Deploy via Nosana Dashboard**
1. Open the [Nosana Dashboard](https://dashboard.nosana.io).
2. Select the **zephyr_141b-ollama** template.
3. Click deploy. **Yep that's it!!** 
---

## Usage Guide

Once the deployment is active, the model can be accessed via:
1. Default it runs on the port 11434 (default port of ollama)
2. You can change it and tweak a template expose=PORT that you want. 

---


#### Demo with python request
```bash
curl http://localhost:11434/api/chat -d '{
  "model": "zephyr:141b",
  "messages": [
    { "role": "user", "content": "Tell me a fun fact about space!" }
  ],"stream":false
}'
```

### Response 
```text
One fascinating and amusing fact about space is that there's an asteroid named after the iconic rock band, The Beatles. Discovered in 1984 by Edward Bowell at Anderson Mesa Station of Lowell Observatory, Asteroid 8749 Beatles was officially designated as such on January 5th, 2001 to commemorate their significant contribution to popular music and culture worldwide.
```



## Parameters and arguments

There are so many arguments that you can give while making POST request to the endpoint, check that out in docs of Zephyr:141B and ollama.

Check it out: [Github](https://github.com/ollama/ollama/blob/main/docs/api.md)
Check it out: [Github](https://ollama.com/library/zephyr:141b)




