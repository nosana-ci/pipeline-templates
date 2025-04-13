# OpenAI Whisper Large V3 Turbo

A high-performance, optimized version of Whisper Large V3 for automatic speech recognition (ASR) and speech translation. This model is designed for faster inference while maintaining high accuracy across 99 languages.

## Key Features
- Optimized for faster inference (reduced decoding layers)
- Supports 99 languages for speech recognition
- Speech-to-text and speech translation capabilities
- High accuracy with minimal quality degradation
- Efficient memory usage
- Real-time transcription support

## Technical Specifications
- Model: openai/whisper-large-v3-turbo
- Base Model: Whisper Large V3
- Parameters: 809M (optimized from 1550M)
- Context Length: 30 seconds
- Supported Tasks:
  - Speech Recognition
  - Speech Translation
  - Language Detection
  - Timestamp Generation

## Requirements
- GPU with 16GB+ VRAM
- Python 3.8+
- Transformers library
- PyTorch
- Hugging Face token

## Usage

### Basic Speech Recognition
```python
from transformers import pipeline

# Initialize the pipeline
pipe = pipeline(
    "automatic-speech-recognition",
    model="openai/whisper-large-v3-turbo",
    device="cuda"
)

# Transcribe audio
result = pipe("audio.mp3")
print(result["text"])
```

### Speech Translation
```python
# Translate to English
result = pipe(
    "audio.mp3",
    task="translate",
    language="french"  # Specify source language
)
print(result["text"])
```

### With Timestamps
```python
# Get word-level timestamps
result = pipe(
    "audio.mp3",
    return_timestamps="word"
)
print(result["chunks"])
```

## API Endpoints

### Transcription
- Endpoint: `/transcribe`
- Method: POST
- Input: Audio file (mp3, wav, m4a)
- Output: JSON with transcription text

### Translation
- Endpoint: `/translate`
- Method: POST
- Input: Audio file + target language
- Output: JSON with translated text

## Performance Optimization
- Uses chunked processing for long audio files
- Implements efficient memory management
- Supports batch processing
- Optimized for GPU acceleration

## Limitations
- Maximum audio length: 30 seconds per chunk
- Quality may slightly degrade compared to full V3 model
- Requires GPU for optimal performance

## References
- [Hugging Face Model Card](https://huggingface.co/openai/whisper-large-v3-turbo)
- [GitHub Repository](https://github.com/openai/whisper)
- [Research Paper](https://arxiv.org/abs/2212.04356)

## License
MIT License

## Citation
```bibtex
@misc{radford2022whisper,
  doi = {10.48550/ARXIV.2212.04356},
  url = {https://arxiv.org/abs/2212.04356},
  author = {Radford, Alec and Kim, Jong Wook and Xu, Tao and Brockman, Greg and McLeavey, Christine and Sutskever, Ilya},
  title = {Robust Speech Recognition via Large-Scale Weak Supervision},
  publisher = {arXiv},
  year = {2022},
  copyright = {arXiv.org perpetual, non-exclusive license}
}
``` 