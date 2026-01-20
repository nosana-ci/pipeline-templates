# Whisper ASR Webservice

A powerful **speech recognition** service powered by OpenAI's Whisper model, designed for **high-performance transcription, translation, and language detection**.

## 🚀 Features
- **Multilingual Transcription**: Supports multiple languages with high accuracy.
- **Speech-to-Text Translation**: Convert spoken language into English text.
- **Language Identification**: Detects the spoken language automatically.
- **GPU Acceleration**: Optimized for **fast inference** using GPU compute.
- **REST API**: Easily integrate with applications via a simple API.

## 🛠️ Deployment Configuration
- **Port**: `9000`
- **GPU Required**: ✅ Yes
- **Model**: Whisper `large` *(can be changed via `ASR_MODEL` env variable)*

## 📌 Usage Example
Once deployed, you can send audio files for transcription via API:

```bash
curl -X POST "http://<your-nosana-node>:9000/asr" \
     -H "Content-Type: application/json" \
     -d '{"audio_url": "https://example.com/audio.mp3"}'
