# MIT AST Speech Commands v2

Audio Spectrogram Transformer (AST) model fine-tuned on Speech Commands v2 dataset for keyword spotting and audio classification. This model achieves state-of-the-art accuracy of 98.12% on the Speech Commands v2 benchmark.

## Key Features
- High-accuracy keyword spotting (98.12% accuracy)
- Audio classification using transformer architecture
- Support for 35 different speech commands
- Efficient inference with 8GB VRAM requirement
- REST API endpoint for easy integration

## Technical Details
- Model: MIT/ast-finetuned-speech-commands-v2
- Architecture: Audio Spectrogram Transformer
- Base Paper: [AST: Audio Spectrogram Transformer](https://arxiv.org/abs/2104.01778)
- Dataset: Google Speech Commands v2
- Model Size: 85.4M parameters
- Input: Audio spectrograms
- Output: Speech command classifications

## Configuration
- Port: 9000
- GPU: Required (8GB+ VRAM)
- Framework: PyTorch
- API: REST endpoint

## Performance
- Accuracy: 98.12% on Speech Commands v2 test set
- Inference Time: ~100ms on GPU
- Memory Usage: ~8GB VRAM

## License
BSD-3-Clause License