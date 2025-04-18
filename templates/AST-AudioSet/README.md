# MIT Audio Spectrogram Transformer

State-of-the-art audio classification model using transformer architecture to classify sounds into AudioSet categories.

## Overview
The Audio Spectrogram Transformer (AST) is a novel approach to audio classification that treats audio spectrograms as images and applies vision transformer techniques. Developed by researchers at MIT, this model achieves exceptional performance across various audio classification tasks by converting audio into spectrogram images and processing them with a transformer-based architecture.

## Features
- Classification into 527 AudioSet sound categories
- Handles a wide range of environmental sounds, music, human sounds, and more
- Applies vision transformer architecture to audio spectrograms
- State-of-the-art performance on audio classification benchmarks
- Adapts proven vision transformer techniques to audio domain
- Fine-tuned on the large-scale AudioSet dataset

## Technical Details
- 86.6M parameter model size (F32 precision)
- Model type: Audio Spectrogram Transformer
- 10x10 patch size configuration
- 0.4593 mAP (mean Average Precision) score
- Can process audio of various lengths
- Converts inputs to 16kHz mono format before processing
- Outputs probability scores for detected sound classes

## Requirements
- GPU: 8GB+ VRAM recommended
- Web interface on port 7860
- PyTorch environment with CUDA support

## GitHub Repository
[https://github.com/YuanGongND/ast](https://github.com/YuanGongND/ast)

Released under BSD-3-Clause license by MIT.

## Use Cases
- Environmental sound recognition
- Acoustic scene classification
- Sound event detection
- Audio content analysis
- Music genre classification
- Industrial sound monitoring 