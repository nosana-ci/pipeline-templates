# 🧠 MiniCPM-V 

## Overview
This template deploys **MiniCPM-V**, a powerful multimodal (vision + language) open-source model, using **Ollama** inside a GPU container on **Nosana**. It supports both **text-only** and **image+text** inputs for flexible AI interaction.

## Features
- 📷 **Multimodal Inference**: Supports vision-language tasks (OCR, Image QA, captioning).
- 🌐 **API-Based Access**: OpenAI-like API served locally on port **11434**.
- ⚡ **Ollama Runtime**: Lightweight deployment and fast startup.
- 🎮 **GPU-Accelerated**: Requires at least **24GB VRAM** (A100 or higher recommended).

---

## Deployment Guide

### **1. Deploy via Nosana Dashboard**
1. Open the [Nosana Dashboard](https://dashboard.nosana.io).
2. Select the **minicpm-v** template.
3. Click deploy. **Yep that's it!!** 
---

## Usage Guide

Once the deployment is active, the model can be accessed via:
1. Default it runs on the port 11434 (default port of ollama)
2. You can change it and tweak a template expose=PORT that you want. 

---

## **2. Send Requests to the API**

#### 📝 **Text Prompt via cURL**
```bash
curl http://<DEPLOYMENT_IP>:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{
        "model": "minicpm-v",
        "prompt": "Explain the theory of relativity",
        "stream": false
      }'
```

**Not only this it supports much more api endpoints and parameters check out ollama and minicpm-v docs for different endpoints**

## Demo that I tried on my remote GPU (24GB VRAM)

### I hosted ollama on it and use port forwarding

```python 
import requests

import base64
import requests

# Step 1: Load and encode image to base64
with open("./input.jpg", "rb") as image_file:
    encoded_image = base64.b64encode(image_file.read()).decode("utf-8")

# Step 2: Build the payload
payload = {
    "model": "minicpm-v",
    "prompt": "Describe this image ?",
    "images": [encoded_image],
    "stream": False
}

# Step 3: Send the request to your Ollama server
response = requests.post(
    "http://127.0.0.1:11434/api/generate",
    json=payload
)

# Step 4: Print the response
print(response.json()["response"])

```
#### Input Image was as below
<img src="./input.jpg">

#### Response
```text
This image captures a striking contrast between nature and the ethereal, with a vivid blue bird as its centerpiece. The bird's plumage is iridescent under what appears to be bright sunlight, suggesting it might have been digitally altered or enhanced for visual effect. Its pose on the branch suggests alertness, possibly indicating that this photo was taken during daylight hours when birds are typically active.

The cherry blossoms provide a soft contrast with their delicate pink and white hues against the clear blue sky backdrop. This could signify springtime, which is often associated with renewal and beauty in nature. The image's composition uses negative space effectively to draw attention to the bird while still providing context through the surrounding flowers and sky.

It should be noted that this description focuses on what appears visually evident without speculating about potential human intervention or artistic intention beyond what can be directly observed from the photograph itself.
```


#### Demo with bash

```bash
curl http://127.0.0.1:11434/api/generate -H "Content-Type:application/json" -d '{
    "model": "minicpm-v",
    "prompt": "Tell me a joke !! It should be very funny?",                                                                             
    "stream": false,
    "language":"English"
  }'
```

#### Response that I got
```text
Sure, here's one for you: Why did the chicken cross the playground? To get to the other slide! Hope that made your day a little brighter. Have fun and stay safe out there! 😊"
```

## Parameters and arguments

There are so many arguments that you can give while making POST request to the endpoint, check that out in docs of minicpm-v and ollama.







