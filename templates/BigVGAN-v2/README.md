# NVIDIA BigVGAN v2

Universal neural vocoder that generates high-quality audio from mel spectrograms with 44kHz sampling rate.

## Overview
BigVGAN v2 is an advanced neural vocoder developed by NVIDIA Research that converts mel spectrograms into high-fidelity audio waveforms. This model represents the state-of-the-art in waveform generation, capable of producing audio with exceptional quality across multiple domains including speech, environmental sounds, and musical instruments.

## Features
- 44kHz high-fidelity audio generation
- 128 mel frequency bands for detailed spectral representation
- 512x upsampling ratio for efficient processing
- Custom CUDA kernel for 1.5-3x faster inference
- Anti-aliased activation for improved audio quality
- Multi-scale sub-band CQT discriminator
- Multi-scale mel spectrogram loss for better training
- Support for diverse audio types (speech, environmental sounds, instruments)

## Technical Details
- 122M parameter model size
- Trained on large-scale compilation of diverse audio datasets
- 5M training steps
- MIT license for research and commercial use
- Fused upsampling + activation kernel for accelerated inference
- Improved discriminator and loss functions over previous versions

## Requirements
- GPU: 16GB+ VRAM recommended
- Web interface on port 7860
- PyTorch environment with CUDA support
- CUDA 12.1 compatible system for custom inference kernel

## GitHub Repository
[https://github.com/NVIDIA/BigVGAN](https://github.com/NVIDIA/BigVGAN)

Released under MIT license by NVIDIA Research.

## Research Paper
BigVGAN was introduced in the paper "BigVGAN: A Universal Neural Vocoder with Large-Scale Training"
[Read the paper on arXiv](https://arxiv.org/abs/2206.04658)

## Model Variants
The BigVGAN v2 family includes models with different configurations:
- 44kHz sampling rate with 128/256/512x upsampling ratios
- 24kHz sampling rate with 100 mel bands
- 22kHz sampling rate with 80 mel bands
- Base models with reduced parameter count (14M) 