A high-throughput and memory-efficient inference engine for running Qwen2.5-Omni-7B using vLLM.

## Description

This template provides an OpenAI-compatible API server for Qwen2.5-Omni-7B, optimized for performance using vLLM. Qwen2.5-Omni is an end-to-end multimodal model designed to perceive diverse modalities including text, images, audio, and video, while simultaneously generating text and natural speech responses in a streaming manner.

## Key Features

- **Omni and Novel Architecture**: Features a Thinker-Talker architecture with TMRoPE (Time-aligned Multimodal RoPE) position embedding to synchronize timestamps of video inputs with audio.
- **Real-Time Voice and Video Chat**: Designed for fully real-time interactions, supporting chunked input and immediate output.
- **Natural and Robust Speech Generation**: Surpasses many existing streaming and non-streaming alternatives in speech generation.
- **Strong Performance Across Modalities**: Exhibits exceptional performance across all modalities when benchmarked against similarly sized single-modality models.
- **Excellent End-to-End Speech Instruction Following**: Shows performance in end-to-end speech instruction following that rivals its effectiveness with text inputs.

## Model Details

- **Name**: Qwen2.5-Omni-7B
- **Size**: 7 billion parameters
- **Modalities**: Text, images, audio, and video
- **Output**: Text and natural speech responses

## Usage Tips

- For audio output, the system prompt must be set as: "You are Qwen, a virtual human developed by the Qwen Team, Alibaba Group, capable of perceiving auditory and visual inputs, as well as generating text and speech."
- The model supports both text and audio outputs. Set `enable_audio_output=False` to save GPU memory if audio output is not needed.
- Two voice types are supported: "Chelsie" (female, default) and "Ethan" (male).
- For better performance, consider using Flash-Attention 2 by loading the model with `attn_implementation="flash_attention_2"`.
- The model can batch inputs composed of mixed samples of various types such as text, images, audio, and videos.

## Usage

The API follows the OpenAI API format and can be accessed via HTTP requests to port 9000. The model is served with the name "Qwen2.5-Omni-7B".

## License

This model is licensed under Apache 2.0 License.

## Links

- [Qwen2.5-Omni-7B on Hugging Face](https://huggingface.co/Qwen/Qwen2.5-Omni-7B)
- [vLLM Documentation](https://github.com/vllm-project/vllm) 