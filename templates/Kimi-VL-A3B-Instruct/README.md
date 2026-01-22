A high-throughput and memory-efficient inference engine for running Kimi VL model using vLLM.

## Description

This template provides an OpenAI-compatible API server for the Kimi VL A3B Instruct model, optimized for performance using vLLM.
It is an efficient open-source Mixture-of-Experts (MoE) vision-language model (VLM) that offers advanced multimodal reasoning, long-context understanding, and strong agent capabilities—all while activating only 2.8B parameters in its language decoder (Kimi-VL-A3B).
Kimi-VL demonstrates strong performance across challenging domains: as a general-purpose VLM, Kimi-VL excels in multi-turn agent interaction tasks (e.g.,OSWorld), achieving state-of-the-art results comparable to flagship models. Furthermore, it exhibits remarkable capabilities across diverse challenging vision language tasks, including college-level image and video comprehension, optical character recognition (OCR), mathematical reasoning, multi-image understanding, and etc.

In comparative evaluations, it effectively competes with cutting-edge efficient VLMs such as GPT-4o-mini, Qwen2.5-VL-7B, and Gemma-3-12B-IT, while surpassing GPT-4o in several specialized domains.

Kimi-VL also advances the pareto frontiers of multimodal models in processing long contexts and perceiving clearly: Equipped with a 128K extended context window, Kimi-VL can processes long and diverse inputs, achieving impressive scores of 64.5 on LongVideoBench, and 35.1 on MMLongBench-Doc; Its native-resolution vision encoder, MoonViT, further allows it to see and understand ultra-high-resolution visual inputs, achieving 83.2 on InfoVQA and 34.5 on ScreenSpot-Pro, while maintaining lower computational cost with common visual inputs and general tasks.
## Usage Recommendations (from Moonshot AI)

We recommend adhering to the following configurations when utilizing the Kimi VL series models, including benchmarking, to achieve the expected performance:

- For Instruct models, it is recommended to use Temperature = 0.2

## Model Details

- **Name**: Kimi VL A3B Instruct
- **Base Model**: Kimi VL 
- **Size**: 16 B Total Params,	3B Activated Params

## Usage

The API follows the OpenAI API format and can be accessed via HTTP requests to port 9000. The model is served with the name "Kimi VL A3B Instruct".

## License

MIT license

## Links

- [Kimi VL GitHub Repository](https://github.com/MoonshotAI/Kimi-VL)
- [vLLM Documentation](https://github.com/vllm-project/vllm) 