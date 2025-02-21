A high-throughput and memory-efficient inference engine for running DeepSeek's R1-Qwen-7B model using vLLM.

## Description

This template provides an OpenAI-compatible API server for the R1-Qwen-7B model, optimized for performance using vLLM. This model is based on Qwen2.5-Math-7B and fine-tuned with DeepSeek-R1 samples, offering a balanced trade-off between performance and resource requirements.

## Usage Recommendations (from DeepSeek)

We recommend adhering to the following configurations when utilizing the DeepSeek-R1 series models, including benchmarking, to achieve the expected performance:

- Set the temperature within the range of 0.5-0.7 (0.6 is recommended) to prevent endless repetitions or incoherent outputs.
- Avoid adding a system prompt; all instructions should be contained within the user prompt.
- For mathematical problems, it is advisable to include a directive in your prompt such as: "Please reason step by step, and put your final answer within \boxed{}."
- When evaluating model performance, it is recommended to conduct multiple tests and average the results.

## Model Details

- **Name**: R1-Qwen-7B
- **Base Model**: Qwen2.5-Math-7B
- **Size**: 7 billion parameters

## Usage

The API follows the OpenAI API format and can be accessed via HTTP requests to port 9000. The model is served with the name "R1-Qwen-7B".

## License

This model is derived from Qwen-2.5 series and is licensed under Apache 2.0 License. The model has been fine-tuned with 800k samples curated with DeepSeek-R1. The model weights and code are available for commercial use.

## Links

- [DeepSeek R1 GitHub Repository](https://github.com/deepseek-ai/DeepSeek-R1)
- [vLLM Documentation](https://github.com/vllm-project/vllm) 