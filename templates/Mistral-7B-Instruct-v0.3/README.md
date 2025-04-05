**A high-throughput and memory-efficient inference engine for running Mistral-7B-v3 using vLLM.**

## Description

This template provides an OpenAI-compatible API server for the **Mistral-7B-v3** model, optimized for performance using **vLLM**. This version leverages the strengths of Mistral's dense transformer architecture, providing efficient and high-quality responses for various general-purpose language tasks.

## Usage Recommendations

To get optimal performance and reliability from **Mistral-7B-v3**, we suggest the following guidelines:

- Use a temperature between **0.5 and 0.7** (default: **0.6**) to balance creativity and coherence.
- While Mistral does not require specific prompting formats, using **clear and concise** instructions yields better results.
- For structured outputs (e.g., code or math), consider specifying formatting expectations in the prompt.
- Perform multiple runs and average outputs when benchmarking or evaluating consistency.

## Model Details

- **Name**: Mistral-7B-v3
- **Base Model**: Mistral (Dense Transformer)
- **Size**: 7 billion parameters
- **Architecture**: Decoder-only, optimized for performance and scalability

## Usage

The API follows the **OpenAI API format** and can be accessed via HTTP requests to **port 9000**. The model is served under the name `"Mistral-7B-v3"`.

Example OpenAI-style request:

```json
{
  "model": "Mistral-7B-v3",
  "messages": [{"role": "user", "content": "Explain quantum entanglement in simple terms."}],
  "temperature": 0.6
}
```

## License

The **Mistral-7B-v3** model is open-weight and licensed under the **Apache 2.0 License**, allowing for commercial use. Refer to the official Mistral documentation for further usage details and licensing terms.

## Links

- [Mistral AI GitHub Repository](https://github.com/mistralai)
- [vLLM Documentation](https://github.com/vllm-project/vllm)

