# 🧠 QWQ-32B

## Overview
This template deploys **QWQ-32B**, a powerful reasoning model of the Qwen series, using **Ollama** inside a GPU container on **Nosana**.  Compared with conventional instruction-tuned models, QwQ, which is capable of thinking and reasoning, can achieve significantly enhanced performance in downstream tasks, especially hard problems. QwQ-32B is the medium-sized reasoning model, which is capable of achieving competitive performance against state-of-the-art reasoning models, e.g., DeepSeek-R1, o1-mini.

## Features
- 🌐 **API-Based Access**: ollama-like API served locally on port **11434**.
- ⚡ **Ollama Runtime**: Lightweight deployment and fast startup.
- 🎮 **GPU-Accelerated**: Requires at least **24GB VRAM** (A100 or higher recommended).

---

## Deployment Guide

### **1. Deploy via Nosana Dashboard**
1. Open the [Nosana Dashboard](https://dashboard.nosana.io).
2. Select the **QWQ-32B** template.
3. Click deploy. **Yep that's it!!** 
---

## Usage Guide

Once the deployment is active, the model can be accessed via:
1. Default it runs on the port 11434 (default port of ollama)
2. You can change it and tweak a template expose=PORT that you want. 

---


#### Demo with interactive shell

```text
>>> tell me a lame joke 
```

#### Response that I got
```text
<think>

Okay, the user asked for a lame joke. They probably want something cheesy or pun-based. Let me think of a classic setup that's a bit 
predictable.

Maybe something with a play on words. Animals are always a good theme. How about a chicken crossing the road? Wait, that's too common. Let me 
twist it. Maybe another animal. A sheep? Or a cow?

Wait, here's an old one: Why don't skeletons fight each other? They don't have the guts. Hmm, that's a bit dark maybe. Alternatively, a 
computer joke? Why do programmers prefer dark mode? Because light attracts bugs. That's okay but not super lame.

Oh, here's a classic: What do you call fake spaghetti? An impasta! That's a pun, a bit cheesy. Or a cow with no legs... wait, I told a cat joke 
before. Maybe legs? Wait, the user might have heard that before. Let me check the prior message. The previous joke was the cat with no legs. So 
maybe a different angle. 

How about a shoe joke? Why did the scarecrow win an award? Because he was outstanding in his field. Wait, that's better. But maybe too good. 
The user wants lame. Maybe something like: What do you call a fake noodle? An impasta. Yeah, that's pretty lame. Let me go with that. Or maybe 
the classic "I'm afraid for the calendar" joke. 

Wait, let me think again. The user asked for a "lame" joke, so it should be intentionally bad. Maybe a pun that's a bit forced. Let me go with 
the impasta one. It's a pun but not too clever. Yeah, that should work. Alright, I'll present that with a smiley to keep it light.
</think>

Sure! Here's a classic lame one:  

Why don’t skeletons fight each other?  
…Because they don’t have the *guts*!  

*Ba-dum-tss* 😄
```

## Parameters and arguments

There are so many arguments that you can give while making POST request to the endpoint, check that out in docs of QWQ-32B and ollama.

Check it out: [Github](https://github.com/ollama/ollama/blob/main/docs/api.md)


