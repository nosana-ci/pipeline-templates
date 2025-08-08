# 🧠 Qwen.5-coder

## Overview
This template deploys **Qwen2.5-coder**, using **Ollama** inside a GPU container on **Nosana**. the latest series of Code-Specific Qwen models, with significant improvements in code generation, code reasoning, and code fixing.

## Features
- 🌐 **API-Based Access**: ollama-like API served locally on port **11434**.
- ⚡ **Ollama Runtime**: Lightweight deployment and fast startup.
- 🎮 **GPU-Accelerated**: Requires at least **24GB VRAM** (A100 or higher recommended).

Provides more models:
32B: ollama run qwen2.5-coder:32b

14B: ollama run qwen2.5-coder:14b

7B: ollama run qwen2.5-coder:7b

3B: ollama run qwen2.5-coder:3b

1.5B: ollama run qwen2.5-coder:1.5b

0.5B: ollama run qwen2.5-coder:0.5b
Can tweak a ollama template, just add :__b for this in current template.
---


## Deployment Guide

### **1. Deploy via Nosana Dashboard**
1. Open the [Nosana Dashboard](https://dashboard.nosana.io).
2. Select the **Qwen2.5-coder** template.
3. Click deploy. **Yep that's it!!** 
---

## Usage Guide

Once the deployment is active, the model can be accessed via:
1. Default it runs on the port 11434 (default port of ollama)
2. You can change it and tweak a template expose=PORT that you want. 

---


#### Demo with python request
```python
import requests

payload= {
    "model": "qwen2.5-coder",
    "prompt": "Write a python code to get the first 10 numbers of the Fibonacci sequence",
    "stream": False
}
response=requests.post(
    url="http://127.0.0.1:11434/api/generate",
    json=payload,
)
print(response.json()["response"])
```


```python
def fibonacci_sequence(n):
    sequence = [0, 1]
    while len(sequence) < n:
        next_number = sequence[-1] + sequence[-2]
        sequence.append(next_number)
    return sequence[:n]

# Get the first 10 numbers of the Fibonacci sequence
first_10_fibonacci_numbers = fibonacci_sequence(10)
print(first_10_fibonacci_numbers)
```

When you run this code, it will output:

```python
[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```



## Parameters and arguments

There are so many arguments that you can give while making POST request to the endpoint, check that out in docs of Qwen2.5-coder and ollama.
Some other endpoints are:
 /api/chat

Check it out: [Github](https://github.com/ollama/ollama/blob/main/docs/api.md)





