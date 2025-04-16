# 🧠 WizardCoder

## Overview
This template deploys **WizardCoder**, using **Ollama** inside a GPU container on **Nosana**. 

## Features
- 🌐 **API-Based Access**: Ollama-like API served locally on port **11434**.
- ⚡ **Ollama Runtime**: Lightweight deployment and fast startup.
- 🎮 **GPU-Accelerated**: Requires at least **24GB VRAM** (A100 or higher recommended).

---


## Deployment Guide

### **1. Deploy via Nosana Dashboard**
1. Open the [Nosana Dashboard](https://dashboard.nosana.io).
2. Select the **WizardCoder** template.
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
    "model": "wizardcoder",
    "prompt": "Write a Python script to scrape all H1 tags from a webpage using BeautifulSoup",
    "stream": False
}
response=requests.post(
    url="http://127.0.0.1:11434/api/generate",
    json=payload,
)
print(response.json()["response"])

```

#### Response
```python
import requests
from bs4 import BeautifulSoup

url = 'https://example.com' # Replace with the desired URL
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')
h1_tags = soup.find_all('h1')
for h1 in h1_tags:
    print(h1.text) # or do whatever you want to do with the H1 tag content here
```
```text
Here, we first make a GET request to the desired URL using `requests` and then pass the response HTML content to BeautifulSoup's constructor. We then use the `find_all()` method of BeautifulSoup to find all the H1 tags in the page. Finally, we iterate over each tag and print its text or do whatever else you want to do with it.
```



## Parameters and arguments

There are so many arguments that you can give while making POST request to the endpoint, check that out in docs of wizardcoder and ollama.
Some other endpoints are:
 /api/chat

Check it out: [Github](https://github.com/ollama/ollama/blob/main/docs/api.md)
Check it out: [Github](https://www.clarifai.com/blog/wizardcoder-large-language-model-for-code)



