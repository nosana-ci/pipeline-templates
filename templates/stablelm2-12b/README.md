# 🧠 Stablelm2_12b

## Overview
This template deploys **Stablelm2_12b**, using **Ollama** inside a GPU container on **Nosana**.
Stable LM 2 is a state-of-the-art 1.6B and 12B parameter language model trained on multilingual data in English, Spanish, German, Italian, French, Portuguese, and Dutch.

## Features
- 🌐 **API-Based Access**: ollama-like API served locally on port **11434**.
- ⚡ **Ollama Runtime**: Lightweight deployment and fast startup.
- 🎮 **GPU-Accelerated**: Requires at least **24GB VRAM** (A100 or higher recommended).

---


## Deployment Guide

### **1. Deploy via Nosana Dashboard**
1. Open the [Nosana Dashboard](https://dashboard.nosana.io).
2. Select the **Stablelm2_12b** template.
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
    "model": "stablelm2:12b",
    "prompt": "You are a time traveler from the future who has just arrived in the year 2025. What major events from the future will shape the next 20 years?",
    "stream": False
}
response=requests.post(
    url="http://127.0.0.1:11434/api/generate",
    json=payload,
)
print(response.json()["response"])
```

### Response 
```text
To help you understand the significant events that will shape the next several years starting from the year 205, I'll provide an overview of key advancements and trends spanning various fields.

1. Climate Change & Sustainability: As concerns about climate change intensify, efforts to combat its effects will continue to dominate global discussions in the coming decades. Governments worldwide may collaborate on initiatives such as renewable energy development, carbon capture technology, and increased environmental protection measures.
   - Notable events:
     * International agreements (e.g., 2050 Climate Change Agreement) aiming for a net-zero greenhouse gas emissions goal by mid-century
     * Technological advancements in clean energy sources like solar, wind, and hydrogen power
     * Major investments in sustainable transportation infrastructure, such as electric vehicles and improved public transit systems

2. Space Exploration & Colonization: With growing interest in space exploration, private companies and governments will further advance their efforts to explore new planets and establish human settlements beyond Earth.
   - Notable events:
     * Continued development of reusable rockets (e.g., SpaceX's Starship)
     * Human missions to Mars – with plans for long-term habitation on the Red Planet
     * Expansion of the International Space Station and further investment in space infrastructure

3. Technological Advancements: Rapid advancements in technology will continue, leading to significant changes across various industries.
   - Notable events:
     * The widespread adoption of 5G networks – providing faster internet speeds and enhancing connectivity for billions of devices
     * Emergence of advanced AI systems that can autonomously learn, adapt, and improve themselves
     * Increased use of augmented reality (AR) and virtual reality (VR) technology in entertainment, education, and healthcare industries

4. Healthcare Innovations: Scientific discoveries will revolutionize the field of medicine, leading to improved patient care and longer lifespans.
   - Notable events:
     * Development of personalized gene therapies – tailored treatments for specific genetic conditions
     * Advancements in CRISPR-Cas9 technology enabling precise DNA editing
     * Expansion of telemedicine services, allowing remote diagnosis and treatment

5. Cybersecurity: As the world becomes more digitally connected, cybersecurity threats will grow increasingly sophisticated.
   - Notable events:
     * Adoption of advanced AI-driven threat detection systems to protect against cyber attacks
     * Emergence of decentralized blockchain networks to ensure secure digital transactions
     * Implementation of robust data privacy laws and increased public awareness regarding personal information security

6. Social Changes & Demographics: The global population will continue to grow, leading to shifts in economic power dynamics.
   - Notable events:
     * Increasing adoption of flexible work arrangements as remote work becomes more common
     * Expansion of digital nomadism – a lifestyle that emphasizes mobility and location-independent careers
     * Rise of the "silver economy," with an aging population seeking innovative healthcare solutions, financial planning services, and accessible housing

These are just some major events from the future that will shape the next several years. As we move forward in time, unforeseen challenges may arise or existing trends may accelerate, but these areas provide a glimpse into the key developments set to transform our world in the coming decades.
```





## Parameters and arguments

There are so many arguments that you can give while making POST request to the endpoint, check that out in docs of stablelm2 and ollama.
Some other endpoints are:
/api/chat
and many more. 

Check it out: [Github](https://github.com/ollama/ollama/blob/main/docs/api.md)





