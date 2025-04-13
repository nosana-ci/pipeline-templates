# Microsoft Phi-4 Multimodal

A lightweight open multimodal foundation model supporting text, image, and audio inputs with 128K token context.

## Overview
Phi-4-multimodal-instruct is a versatile AI model that can process and understand multiple types of input: text, images, and audio. It stands out for its efficiency in resource-constrained environments while delivering high-quality performance across a range of multimodal tasks.

## Features
- Unified multimodal architecture handling text, images, and audio in the same neural network
- Support for 24 languages in text modality
- Audio processing for 8 languages (English, Chinese, German, French, Italian, Japanese, Spanish, Portuguese)
- Vision capabilities optimized for English
- Advanced speech recognition outperforming specialized models like WhisperV3
- State-of-the-art speech translation capabilities
- First open-source model for speech summarization
- Strong performance in OCR, chart/table understanding, and visual question answering
- Function and tool calling support
- 128K token context length for handling long inputs

## Technical Achievements
- Ranks #1 on Hugging Face OpenASR leaderboard with 6.14% WER
- Surpasses expert ASR model WhisperV3 and speech translation model SeamlessM4T-v2-Large
- Close to GPT-4o performance on speech summarization tasks
- 5.57B parameters (BF16 precision)

## Requirements
- GPU: 32GB+ VRAM recommended
- Web interface on port 7860
- PyTorch environment with CUDA support
- Python 3.10+ with necessary libraries

## GitHub Repository
[https://github.com/microsoft/Phi-4-examples](https://github.com/microsoft/Phi-4-examples)

Released under MIT license by Microsoft.

## Research Papers
- [Phi-4 Technical Report](https://arxiv.org/abs/2407.13833)
- [Phi-4 Multimodal Technical Report](https://arxiv.org/abs/2503.01743) 