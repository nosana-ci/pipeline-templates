# OpenAI Whisper Large v3

State-of-the-art multilingual speech recognition and translation model.

## Overview
Whisper Large v3 is OpenAI's most advanced automatic speech recognition (ASR) model, capable of transcribing and translating speech across 99 languages. It offers significant improvements over previous versions with the same architecture but enhanced performance through training on millions of hours of audio data, including 1 million hours of weakly labeled audio and 4 million hours of pseudo-labeled audio.

## Features
- Support for 99 languages including Cantonese as a new addition
- Both transcription (speech-to-text in same language) and translation (speech-to-English)
- 10-20% error reduction compared to Whisper Large v2
- Accurate timestamp generation at both sentence and word levels
- Temperature fallback for improved performance in challenging scenarios
- Advanced noise robustness and accent handling

## Technical Details
- 1.55B parameter transformer-based architecture
- Improved spectrogram input with 128 Mel frequency bins (upgraded from 80)
- Zero-shot capabilities for domain adaptation
- Generalized performance across datasets and domains
- Compatibility with chunked processing for long-form audio

## Requirements
- GPU: 16GB+ VRAM recommended
- Web interface on port 7860
- PyTorch environment with CUDA support

## GitHub Repository
[https://github.com/openai/whisper](https://github.com/openai/whisper)

Released under the Apache-2.0 license by OpenAI.

## Research Paper
Whisper was introduced in the paper "Robust Speech Recognition via Large-Scale Weak Supervision" (Radford et al., 2022).
[Read the paper on arXiv](https://arxiv.org/abs/2212.04356)

A robust speech recognition service powered by OpenAI's Whisper model.

Unleash the power of speech recognition with Nosana! Effortlessly run your Whisper ASR instance on high-performance GPU-backed nodes, ensuring optimal transcription for your audio processing needs.

## Key Features
- Multilingual transcription
- Translation support
- Language identification
- RESTful API interface
- GPU acceleration support

## Configuration
- Port: 9000
- GPU: Required
- Model: Whisper Base
