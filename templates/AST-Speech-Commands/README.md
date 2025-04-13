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

## Usage

### Python Example
```python
import requests
import json

def classify_audio(audio_file_path):
    url = "http://localhost:9000/predict"
    
    with open(audio_file_path, "rb") as f:
        files = {"file": f}
        response = requests.post(url, files=files)
    
    return response.json()

# Example usage
result = classify_audio("path_to_audio.wav")
print(result)
```

### cURL Example
```bash
curl -X POST http://localhost:9000/predict \
  -F "file=@path_to_audio.wav"
```

## Supported Commands
The model can classify audio into 35 different speech commands including:
- "yes", "no", "up", "down", "left", "right"
- "on", "off", "stop", "go"
- "zero", "one", "two", "three", "four", "five"
- "six", "seven", "eight", "nine"
- And more...

## Performance
- Accuracy: 98.12% on Speech Commands v2 test set
- Inference Time: ~100ms on GPU
- Memory Usage: ~8GB VRAM

## References
- [Hugging Face Model Card](https://huggingface.co/MIT/ast-finetuned-speech-commands-v2)
- [Original Paper](https://arxiv.org/abs/2104.01778)
- [GitHub Repository](https://github.com/YuanGongND/ast)

## License
BSD-3-Clause License

## Citation
```bibtex
@article{gong2021ast,
  title={AST: Audio Spectrogram Transformer},
  author={Gong, Yuan and Chung, Yu-An and Glass, James},
  journal={arXiv preprint arXiv:2104.01778},
  year={2021}
}
``` 