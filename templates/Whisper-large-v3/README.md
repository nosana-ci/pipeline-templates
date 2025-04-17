# Whisper Large V3

OpenAI's state-of-the-art speech recognition model for automatic speech recognition (ASR) and speech translation with improved multilingual capabilities.

## Key Features
- 1.5B parameter transformer-based model
- Supports 99 languages with improved performance
- 10-20% reduction in errors compared to previous versions
- Cantonese support (new in V3)
- Advanced timestamp capabilities

## Configuration
- Port: 9000
- GPU: Required (10GB+ VRAM)
- Model: openai/whisper-large-v3
- API: RESTful webservice

## Usage

```python
import requests

# Transcribe audio file
url = "http://localhost:9000/asr"
files = {"audio_file": open("audio.mp3", "rb")}
data = {"task": "transcribe", "return_timestamps": True}
response = requests.post(url, files=files, data=data)
```

## Performance
Whisper Large V3 shows improved performance across a wide variety of languages, with 10-20% reduction in errors compared to the previous Large V2 model. It uses 128 Mel frequency bins for spectrogram input (compared to 80 in previous versions), providing better audio feature representation.

## Additional Information
For more details on the Whisper model capabilities and limitations, visit the [Hugging Face model page](https://huggingface.co/openai/whisper-large-v3) or the [OpenAI Whisper GitHub repository](https://github.com/openai/whisper). 