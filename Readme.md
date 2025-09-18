# 🌍 Language Translation API — Nosana Template

> Deploy a fast, scalable, GPU-powered language translation API on the Nosana Network using Hugging Face's state-of-the-art MarianMT models.

## 🚀 Overview

This Nosana Template enables users to launch a **fully containerized, production-ready translation API** with GPU acceleration. Powered by Hugging Face’s MarianMT models, it provides seamless neural machine translation between dozens of supported languages.

This template is ideal for developers, startups, and researchers who need access to affordable and scalable multilingual NLP inference on Nosana’s decentralized GPU network.

---

![Screenshot 2025-04-11 033920](https://github.com/user-attachments/assets/562093f4-5edc-4eec-b968-d5b0521deb11)


## 🎯 Features

✅ Real-time text translation between 40+ language pairs  
✅ Pre-trained neural translation models from Hugging Face  
✅ RESTful API built with FastAPI for simplicity and speed  
✅ Dockerized for cross-platform and cloud-native deployments  
✅ GPU-accelerated inference via Nosana for high performance

---

## 🔧 API Usage

### 🔁 POST `/translate`

Send a JSON payload to translate text from one language to another.

#### 📥 Request

![Screenshot 2025-04-11 042656](https://github.com/user-attachments/assets/5c4055c0-a284-4beb-a2cf-22f783107a54)


```json
{
  "source_lang": "en",
  "target_lang": "fr",
  "text": "Hello, how are you?"
}
