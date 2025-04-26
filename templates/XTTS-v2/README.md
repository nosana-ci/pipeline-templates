# Coqui XTTS-v2

Multilingual voice cloning text-to-speech with just a 6-second reference audio.

## Overview
XTTS-v2 is a powerful text-to-speech synthesis model that can clone voices and generate speech in multiple languages. The model requires only a short 6-second audio clip to capture and reproduce a voice's characteristics, making it ideal for creating personalized speech outputs without extensive training data.

## Features
- Support for 17 languages: English, Spanish, French, German, Italian, Portuguese, Polish, Turkish, Russian, Dutch, Czech, Arabic, Chinese, Japanese, Hungarian, Korean, and Hindi
- Cross-language voice cloning (clone a voice in one language and use it in another)
- High-quality 24kHz audio output
- Emotion and style transfer through voice cloning
- Multiple speaker references and interpolation between speakers
- Excellent prosody and naturalness

## Technical Details
- Built on Coqui's TTS framework
- Improved speaker conditioning architecture over XTTS-v1
- Better stability and audio quality
- Support for fine-tuning on custom voices

## Requirements
- GPU: 10GB+ VRAM recommended
- Web interface on port 7860
- PyTorch environment with CUDA support


Released under Coqui Public Model License by Coqui.ai.
