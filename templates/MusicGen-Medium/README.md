# Meta MusicGen Medium

Text-to-music generation model capable of creating high-quality music samples from text descriptions.

## Overview
MusicGen Medium is a 1.5B parameter text-to-music model developed by Meta AI that generates music based on text prompts. Part of the AudioCraft family of generative audio models, it's capable of producing high-fidelity music samples conditioned on textual descriptions.

## Features
- Generate music from text descriptions
- 32kHz audio quality with rich instrumentation
- 1.5B parameters (medium size variant)
- Single-stage autoregressive Transformer architecture
- Generate up to 30 seconds of music
- Control music style, mood, genre, and instruments through prompts
- No need for separate semantic representations

## Technical Details
- Built on the EnCodec tokenizer with 4 codebooks sampled at 50Hz
- Generates all 4 codebooks in one parallel pass
- Only 50 autoregressive steps per second of audio
- Trained on licensed music data with vocals removed
- Can produce various musical styles and genres

## Performance
- Strong results on objective metrics:
  - Frechet Audio Distance: 5.14
  - KLD: 1.38
  - Text Consistency: 0.28

## Requirements
- GPU: 16GB+ VRAM recommended
- Web interface on port 7860
- PyTorch environment with CUDA support

## GitHub Repository
[https://github.com/facebookresearch/audiocraft](https://github.com/facebookresearch/audiocraft)

Released under CC-BY-NC-4.0 license by Meta AI.

## Research Paper
MusicGen was introduced in the paper "Simple and Controllable Music Generation" (Copet et al., 2023).
[Read the paper on arXiv](https://arxiv.org/abs/2306.05284) 