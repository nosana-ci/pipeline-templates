A robust speech recognition service powered by OpenAI's Whisper model.

Unleash the power of speech recognition with Nosana! Effortlessly run your Whisper ASR instance on high-performance GPU-backed nodes, ensuring optimal transcription for your audio processing needs.

## Key Features
- Multilingual transcription in around 100 languages
- Translation of spoken audio into English text
- Automatic language identification
- Long-form audio, processed in 30 second chunks
- Web UI for uploading or recording audio, with a Gradio API for automation
- GPU acceleration support

## Configuration
- Port: 7860
- GPU: Required
- VRAM: 5 GB
- Model: [Whisper large-v3](https://huggingface.co/openai/whisper-large-v3) (about 1.5B parameters, MIT license)
- Image: `registry.hf.space/openai-whisper:latest`, the container of OpenAI's [Whisper Space](https://huggingface.co/spaces/openai/whisper)

## Usage
1. Open the service URL.
2. Upload an audio file or record from your microphone.
3. Choose **transcribe** to get text in the spoken language, or **translate** to get English text.
4. Submit and copy the result from the output box.

## Notes
- The image uses the `latest` tag, so the model and interface follow whatever OpenAI's Space currently runs.
